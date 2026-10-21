export interface Env { CONTACT_ENABLED?:string; CONTACT_TO?:string; CONTACT_FROM?:string; RESEND_API_KEY?:string; TURNSTILE_SECRET_KEY?:string; SITE_ORIGIN?:string }
const reply=(status:number,error?:string)=>new Response(JSON.stringify(error?{ok:false,error}:{ok:true}),{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
export async function onRequest({request,env}:{request:Request;env:Env}):Promise<Response>{
 if(request.method!=='POST')return new Response('Method not allowed',{status:405,headers:{Allow:'POST'}});
 if(env.CONTACT_ENABLED!=='true'||!env.CONTACT_TO||!env.CONTACT_FROM||!env.RESEND_API_KEY||!env.TURNSTILE_SECRET_KEY||!env.SITE_ORIGIN)return reply(503,'not_configured');
 if(request.headers.get('Origin')!==env.SITE_ORIGIN)return reply(403,'origin');
 if(!request.headers.get('Content-Type')?.startsWith('application/json'))return reply(415,'content_type');
 if(Number(request.headers.get('Content-Length'))>20000)return reply(413,'too_large');
 try{
  // Bound streamed input even when Content-Length is absent or forged.
  const reader=request.body?.getReader();if(!reader)return reply(400,'body');let length=0;const chunks:Uint8Array[]=[];
  while(true){const part=await reader.read();if(part.done)break;length+=part.value.length;if(length>20000){await reader.cancel();return reply(413,'too_large');}chunks.push(part.value);}
  const bytes=new Uint8Array(length);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}
  let data;try{data=JSON.parse(new TextDecoder().decode(bytes));}catch{return reply(400,'json');}
  if(!data||typeof data!=='object')return reply(400,'body');
  const {email,message,token,website,language}=data;
  if(website)return reply(400,'spam');
  if(typeof email!=='string'||email.length>254||! /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||typeof message!=='string'||message.trim().length<10||message.length>5000||typeof token!=='string'||token.length<1||token.length>2048)return reply(400,'validation');
  const verification=await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({secret:env.TURNSTILE_SECRET_KEY,response:token,remoteip:request.headers.get('CF-Connecting-IP')||undefined}),signal:AbortSignal.timeout(10000)});
  const challenge=await verification.json() as {success?:boolean;hostname?:string;action?:string};
  if(!verification.ok||!challenge.success||challenge.hostname!==new URL(env.SITE_ORIGIN).hostname||challenge.action!=='contact')return reply(403,'challenge');
  const delivery=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${env.RESEND_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({from:env.CONTACT_FROM,to:[env.CONTACT_TO],reply_to:email,subject:`Website inquiry (${language==='en'?'EN':'RU'})`,text:`Reply to: ${email}\n\n${message.trim()}`}),signal:AbortSignal.timeout(10000)});
  const result=await delivery.json() as {id?:string};
  if(!delivery.ok||!result.id)return reply(502,'delivery');
  return reply(200);
 }catch{return reply(502,'upstream');}
}

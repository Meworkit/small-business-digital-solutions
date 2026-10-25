import {createServer,loadEnv} from 'vite';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import React from 'react';
import {renderToString} from 'react-dom/server';
const env=loadEnv('production',process.cwd(),'VITE_');
const origin=(env.VITE_SITE_URL||'https://small-business-digital-solutions.pages.dev').replace(/\/$/,'');
if(new URL(origin).protocol!=='https:')throw new Error('VITE_SITE_URL must be an HTTPS origin');
if(new URL(origin).origin!==origin)throw new Error('VITE_SITE_URL must be an origin without a path');
if(origin==='https://example.com')console.warn('Set VITE_SITE_URL before public deployment. Preview is marked noindex.');
const server=await createServer({server:{middlewareMode:true,hmr:false,ws:false},appType:'custom',mode:'production'});
const escape=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
try{
const {default:App,translations}=await server.ssrLoadModule('/src/App.tsx');
const template=await readFile('dist/index.html','utf8');
for(const lang of ['ru','en']){
 const t=translations[lang];const head=`<title>${escape(t.title)}</title><meta name="description" content="${escape(t.description)}"/><link rel="canonical" href="${origin}/${lang}/"/><link rel="alternate" hreflang="ru" href="${origin}/ru/"/><link rel="alternate" hreflang="en" href="${origin}/en/"/><link rel="alternate" hreflang="x-default" href="${origin}/ru/"/><meta property="og:type" content="website"/><meta property="og:title" content="${escape(t.title)}"/><meta property="og:description" content="${escape(t.description)}"/><meta property="og:url" content="${origin}/${lang}/"/><meta property="og:locale" content="${lang==='ru'?'ru_RU':'en_CA'}"/><meta property="og:locale:alternate" content="${lang==='ru'?'en_CA':'ru_RU'}"/><meta property="og:image" content="${origin}/og-${lang}.png"/><meta property="og:image:alt" content="${escape(t.title)}"/><meta name="twitter:card" content="summary_large_image"/><meta name="twitter:title" content="${escape(t.title)}"/>${origin==='https://example.com'?'<meta name="robots" content="noindex,nofollow"/>':''}`;
 const html=template.replace('lang="ru"',`lang="${lang}"`).replace(/<title>.*?<\/title>/,head).replace('<div id="root"></div>',`<div id="root">${renderToString(React.createElement(App,{lang}))}</div>`);
 await mkdir(`dist/${lang}`,{recursive:true});await writeFile(`dist/${lang}/index.html`,html);

}
await writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${['ru','en'].map(lang=>`<url><loc>${origin}/${lang}/</loc><xhtml:link rel="alternate" hreflang="ru" href="${origin}/ru/"/><xhtml:link rel="alternate" hreflang="en" href="${origin}/en/"/></url>`).join('')}</urlset>`);
await writeFile('dist/robots.txt',`User-agent: *\n${origin==='https://example.com'?'Disallow: /':'Allow: /'}\nSitemap: ${origin}/sitemap.xml\n`);
}finally{await server.close();}

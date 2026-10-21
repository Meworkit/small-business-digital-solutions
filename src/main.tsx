import { hydrateRoot, createRoot } from 'react-dom/client';
import App, {translations, type Lang} from './App';
const lang:Lang=location.pathname.startsWith('/en')?'en':'ru';
document.documentElement.lang=lang;
document.title=translations[lang].title;
const root=document.getElementById('root')!;
if(root.hasChildNodes())hydrateRoot(root,<App lang={lang}/>);else createRoot(root).render(<App lang={lang}/>);

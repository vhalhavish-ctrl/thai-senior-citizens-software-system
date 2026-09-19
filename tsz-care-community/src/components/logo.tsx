import {HeartHandshake} from './icons';
export function Logo({compact=false}:{compact?:boolean}){return <a className="logo" href="/"><span className="logoMark"><HeartHandshake size={24}/></span>{!compact&&<span><b>TSZ</b><small>Care Community</small></span>}</a>}

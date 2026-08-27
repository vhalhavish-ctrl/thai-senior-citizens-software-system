import { mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const SOURCE_URL = 'https://thai-senior-citizens-software-system-fd4xzqgs8.vercel.app/';
const SOURCE_DEPLOYMENT_ID = 'dpl_7g183HhfepRKR6kDfBL29hgEgcnV';
const OLD_REF = 'bigoboqntynuiyqfxjgz';
const NEW_REF = 'ohwewoqfhxucnwtslybf';
const NEW_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9od2V3b3FmaHh1Y253dHNseWJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc4MDUzNzEsImV4cCI6MjEwMzM4MTM3MX0.Dui-Ep9gl3qgtWI6Eu5dn9Vf8PVEpMKIis2xQzUGtZk';
const OLD_HOST = `${OLD_REF}.supabase.co`;
const NEW_HOST = `${NEW_REF}.supabase.co`;

const response = await fetch(SOURCE_URL, {
  redirect: 'follow',
  headers: { 'user-agent': 's02-recovery-build/1.1' },
});
if (!response.ok) throw new Error(`Source artifact fetch failed: ${response.status} ${response.statusText}`);
let html = await response.text();
if (!html.includes('<title>Thai Senior Care V2</title>')) {
  throw new Error('Source fingerprint mismatch: expected Thai Senior Care V2 title');
}
if (!html.includes(`https://${OLD_HOST}`)) {
  throw new Error(`Source fingerprint mismatch: expected legacy Supabase host ${OLD_HOST}`);
}
const sourceSha256 = createHash('sha256').update(html).digest('hex');

html = html
  .replaceAll(`https://${OLD_HOST}`, `https://${NEW_HOST}`)
  .replaceAll(`wss://${OLD_HOST}`, `wss://${NEW_HOST}`);

const bridge = String.raw`<script id="s02-backend-bridge">
(()=>{
  const OLD_REF=${JSON.stringify(OLD_REF)};
  const NEW_REF=${JSON.stringify(NEW_REF)};
  const OLD_HOST=OLD_REF+'.supabase.co';
  const NEW_HOST=NEW_REF+'.supabase.co';
  const NEW_KEY=${JSON.stringify(NEW_ANON_KEY)};
  const rewriteUrl=(raw)=>{
    let s=String(raw)
      .replace('https://'+OLD_HOST,'https://'+NEW_HOST)
      .replace('wss://'+OLD_HOST,'wss://'+NEW_HOST);
    try{
      const u=new URL(s,location.href);
      if(u.hostname===NEW_HOST && u.searchParams.has('apikey')) u.searchParams.set('apikey',NEW_KEY);
      return u.toString();
    }catch{return s}
  };

  try{
    const k='sb-'+OLD_REF+'-auth-token';
    const raw=localStorage.getItem(k);
    if(raw){
      const obj=JSON.parse(raw);
      const token=obj&&obj.access_token;
      if(token&&token.split('.').length>1){
        const seg=token.split('.')[1].replace(/-/g,'+').replace(/_/g,'/');
        const payload=JSON.parse(atob(seg.padEnd(Math.ceil(seg.length/4)*4,'=')));
        if(String(payload.iss||'').includes(OLD_REF)) localStorage.removeItem(k);
      }
    }
  }catch{}

  const nativeFetch=window.fetch.bind(window);
  window.fetch=async(input,init={})=>{
    const req=input instanceof Request?input:null;
    const originalUrl=req?req.url:String(input);
    const url=rewriteUrl(originalUrl);
    const headers=new Headers(init.headers||(req?req.headers:undefined));
    if(url.includes(NEW_HOST)){
      const oldApiKey=headers.get('apikey');
      const auth=headers.get('authorization');
      if(oldApiKey){
        headers.set('apikey',NEW_KEY);
        if(auth===('Bearer '+oldApiKey)) headers.set('authorization','Bearer '+NEW_KEY);
      }
    }
    if(!req) return nativeFetch(url,{...init,headers});
    const method=(init.method||req.method||'GET').toUpperCase();
    const opts={
      method,
      headers,
      mode:req.mode,
      credentials:req.credentials,
      cache:req.cache,
      redirect:req.redirect,
      referrer:req.referrer,
      referrerPolicy:req.referrerPolicy,
      integrity:req.integrity,
      keepalive:req.keepalive,
      signal:init.signal||req.signal,
    };
    if(method!=='GET'&&method!=='HEAD'){
      opts.body=init.body!==undefined?init.body:await req.clone().arrayBuffer();
    }
    return nativeFetch(url,opts);
  };

  const NativeWS=window.WebSocket;
  function PatchedWebSocket(url,protocols){
    const rewritten=rewriteUrl(url);
    return protocols===undefined?new NativeWS(rewritten):new NativeWS(rewritten,protocols);
  }
  PatchedWebSocket.prototype=NativeWS.prototype;
  Object.defineProperties(PatchedWebSocket,{
    CONNECTING:{value:NativeWS.CONNECTING},OPEN:{value:NativeWS.OPEN},
    CLOSING:{value:NativeWS.CLOSING},CLOSED:{value:NativeWS.CLOSED}
  });
  window.WebSocket=PatchedWebSocket;

  window.__S02_RECOVERY_BRIDGE__={targetRef:NEW_REF,sourceRef:OLD_REF,active:true};
})();
</script>`;

if (!html.includes('</head>')) throw new Error('Recovered HTML has no </head> insertion point');
html = html.replace('</head>', `${bridge}</head>`);

await mkdir('dist', { recursive: true });
await writeFile('dist/index.html', html, 'utf8');
await writeFile('dist/recovery-meta.json', JSON.stringify({
  recoveredAt: new Date().toISOString(),
  sourceUrl: SOURCE_URL,
  sourceDeploymentId: SOURCE_DEPLOYMENT_ID,
  sourceSha256,
  sourceRef: OLD_REF,
  targetRef: NEW_REF,
  strategy: 'build-time immutable production artifact recovery + runtime Supabase transport bridge',
}, null, 2));
console.log(`Recovered Thai Senior Care V2 artifact ${sourceSha256.slice(0,12)}… -> ${NEW_REF}`);

import { mkdir, rm, copyFile, readFile, writeFile } from 'node:fs/promises';

const PROJECT = process.env.VERCEL_PROJECT_ID || process.env.ROUTER_PROJECT_ID || '';
const IDS = {
  management: 'prj_Mf2eYrSpBNQ9Pn1svgtELtMr3Vom',
  safezone: 'prj_bpzzhlZJLApCib6KR4HS9zGSnFQa',
  ecostory: 'prj_XcpGijNhvbc9Tl1Su7IQWbxzUxlN',
  eldercare: 'prj_boVLYc2g9QZVMO8fokTjsmDOsHxy',
  liquidglassSmoke: 'prj_78hUGSrQ8zSz4QmS1GBy6CmCypJa',
  deploySmoke: 'prj_I9GtJ75zuWQqmYbDFFLvlKbF5toA',
  performance: 'prj_bBdPmrVwrziN6QZFPXR8021FQVc6',
};

const TARGETS = {
  safezone: 'https://uxooqjhhzlxwhnrypnhl.supabase.co/functions/v1/safezone-v3-web-source',
  performance: 'https://uxooqjhhzlxwhnrypnhl.supabase.co/functions/v1/performance-assessment-ui-source',
  eldercare: 'https://eldercare-center-operating-system-30oog38bu.vercel.app',
};

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const redirectPage = (title, product, target, note) => `<!doctype html><html lang="th"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><meta http-equiv="refresh" content="1;url=${esc(target)}"><style>*{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;padding:22px;background:linear-gradient(135deg,#eef3f4,#d7dee0);font-family:system-ui,"Noto Sans Thai",sans-serif;color:#17242d}.card{width:min(680px,100%);background:#ffffffd9;border:1px solid #fff;border-radius:24px;padding:28px;box-shadow:0 22px 60px #17324724;backdrop-filter:blur(18px)}.ey{font-size:11px;letter-spacing:.14em;font-weight:900;color:#61717b}.ok{padding:10px;border-radius:12px;background:#e1f3eb;color:#176344}.btn{display:block;margin-top:16px;padding:12px;border-radius:12px;text-align:center;background:#183b49;color:#fff;text-decoration:none;font-weight:900}.muted{color:#65737c;line-height:1.6}</style></head><body><main class="card"><div class="ey">WEAREZERO · RECOVERY ROUTER</div><h1>${esc(product)}</h1><div class="ok">Application identity verified by Vercel Project ID.</div><p class="muted">${esc(note)}</p><p class="muted">กำลังเปิดระบบที่ถูกต้อง… หากไม่เปลี่ยนหน้าอัตโนมัติ ให้กดปุ่มด้านล่าง</p><a class="btn" href="${esc(target)}">Open ${esc(product)}</a></main><script>setTimeout(()=>location.replace(${JSON.stringify(target)}),250)</script></body></html>`;
const smokePage = (name, purpose) => `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(name)} — TEST ONLY</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#171b1e;color:#eee;font-family:system-ui}.c{max-width:680px;padding:28px;border:1px solid #555;border-radius:20px;background:#242a2e}.tag{display:inline-block;padding:6px 9px;border-radius:999px;background:#f0b229;color:#241900;font-weight:900}.m{color:#aeb8bd}</style></head><body><main class="c"><span class="tag">TEST ONLY</span><h1>${esc(name)}</h1><p class="m">${esc(purpose)}</p><p>This project is intentionally isolated from production application identity. It must not be presented as a live elderly-care system.</p></main></body></html>`;

async function clean(){ await rm('dist',{recursive:true,force:true}); await mkdir('dist',{recursive:true}); }
async function management(){ for (const f of ['index.html','styles.css','app.js']) await copyFile(f,`dist/${f}`); }
async function ecostory(){ await copyFile('apps/ecostory/index.html','dist/index.html'); }
async function html(s){ await writeFile('dist/index.html',s,'utf8'); }

await clean();
switch(PROJECT){
  case IDS.management:
    await management();
    break;
  case IDS.safezone:
    await html(redirectPage('THE SAFE ZONE V3','THE SAFE ZONE V3',TARGETS.safezone,'Recovery interface backed by the active SafeZone database and two-way synchronization services.'));
    break;
  case IDS.performance:
    await html(redirectPage('THESAFEZONE Performance Assessment','THESAFEZONE Performance Assessment',TARGETS.performance,'Authenticated branch-isolated assessment, dossiers, criteria governance, two-way sync and audit.'));
    break;
  case IDS.eldercare:
    await html(redirectPage('ElderCare Center OS','ElderCare Center Operating System',TARGETS.eldercare,'Pinned to a verified known-good ElderCare deployment while source recovery remains documented.'));
    break;
  case IDS.ecostory:
    await ecostory();
    break;
  case IDS.liquidglassSmoke:
    await html(smokePage('ElderCare Liquid Glass Smoke','Visual / UI smoke-test project. No production data or production identity.'));
    break;
  case IDS.deploySmoke:
    await html(smokePage('ElderCare Deploy Contract Smoke','Deployment contract smoke-test project. No production data or production identity.'));
    break;
  default:
    throw new Error(`UNMAPPED_VERCEL_PROJECT_ID: ${PROJECT || '(missing)'}. Refusing to deploy the wrong application.`);
}

const out = await readFile('dist/index.html','utf8');
console.log(`Project router built ${PROJECT}; title fingerprint: ${(out.match(/<title>([^<]+)/i)||[])[1]||'unknown'}`);

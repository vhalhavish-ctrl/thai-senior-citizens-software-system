import type {Metadata} from 'next';
import './globals.css';import './notices.css';
export const metadata:Metadata={title:{default:'TSZ Care Community',template:'%s | TSZ Care Community'},description:'ศูนย์กลางความรู้ ข่าวสาร เอกสาร และการสื่อสารส่วนตัวสำหรับสมาชิกธุรกิจดูแลผู้สูงอายุและผู้มีภาวะพึ่งพิง',openGraph:{title:'TSZ Care Community',description:'Care knowledge. Connected people. Better lives.',type:'website'},robots:{index:true,follow:true}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="th"><body>{children}</body></html>}

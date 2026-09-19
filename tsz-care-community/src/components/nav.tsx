'use client';
import {useState} from 'react';import {Logo} from './logo';import {Menu,X} from './icons';
export function Nav(){const [open,setOpen]=useState(false);return <header className="navWrap"><nav className="nav glass"><Logo/><button className="iconBtn mobile" onClick={()=>setOpen(!open)} aria-label="เมนู">{open?<X/>:<Menu/>}</button><div className={`navLinks ${open?'open':''}`}><a href="#services">บริการ</a><a href="#knowledge">คลังความรู้</a><a href="#about">เกี่ยวกับเรา</a><a href="/login" className="btn secondary">เข้าสู่ระบบ</a><a href="/register" className="btn primary">สมัครสมาชิก <Arrow/></a></div></nav></header>}
function Arrow(){return <span aria-hidden>→</span>}

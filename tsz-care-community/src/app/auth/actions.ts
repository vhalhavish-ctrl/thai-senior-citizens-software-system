'use server';
import {redirect} from 'next/navigation';
import {createClient} from '@/lib/supabase/server';
export async function login(formData:FormData){const supabase=await createClient();const email=String(formData.get('email')||'');const password=String(formData.get('password')||'');const {error}=await supabase.auth.signInWithPassword({email,password});if(error) redirect('/login?error='+encodeURIComponent(error.message));redirect('/dashboard')}
export async function signup(formData:FormData){const supabase=await createClient();const full_name=String(formData.get('full_name')||'');const phone=String(formData.get('phone')||'');const email=String(formData.get('email')||'');const password=String(formData.get('password')||'');const {error}=await supabase.auth.signUp({email,password,options:{data:{full_name,phone}}});if(error) redirect('/register?error='+encodeURIComponent(error.message));redirect('/login?registered=1')}

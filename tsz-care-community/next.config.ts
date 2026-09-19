import type { NextConfig } from 'next';
const config: NextConfig = {reactStrictMode:true,images:{remotePatterns:[{protocol:'https',hostname:'images.unsplash.com'}]},headers:async()=>[{source:'/:path*',headers:[{key:'X-Content-Type-Options',value:'nosniff'},{key:'Referrer-Policy',value:'strict-origin-when-cross-origin'},{key:'Permissions-Policy',value:'camera=(self), microphone=(self), geolocation=()'}]}]};
export default config;

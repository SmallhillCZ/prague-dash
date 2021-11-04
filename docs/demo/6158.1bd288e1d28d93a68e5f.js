"use strict";(self.webpackChunkprague_dash=self.webpackChunkprague_dash||[]).push([[6158],{6158:(S,b,h)=>{h.r(b),h.d(b,{HttpWeb:()=>F});var c=h(8239),C=h(8384);const j=function(){var n=(0,c.Z)(function*(r){return new Promise((t,e)=>{const s=new FileReader;s.onload=()=>{const o=s.result,u=o.substr(o.indexOf(",")+1);t(u)},s.onerror=o=>e(o),s.readAsDataURL(r)})});return function(t){return n.apply(this,arguments)}}(),k=n=>encodeURIComponent(n).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),v=n=>n.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent),g=()=>{const n=[],r={};if(!document.cookie)return n;const t=document.cookie.split(";")||[];for(const s of t){let[o,u]=s.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");o=v(o).trim(),u=v(u).trim(),r[o]=u}const e=Object.entries(r);for(const[s,o]of e)n.push({key:s,value:o});return n},x=(n,r={})=>{const t=Object.assign({method:n.method||"GET",headers:n.headers},r),s=((n={})=>{const r=Object.keys(n);return Object.keys(n).map(s=>s.toLocaleLowerCase()).reduce((s,o,u)=>(s[o]=n[r[u]],s),{})})(n.headers)["content-type"]||"";if(s.includes("application/x-www-form-urlencoded")){const o=new URLSearchParams;for(const[u,a]of Object.entries(n.data||{}))o.set(u,a);t.body=o.toString()}else if(s.includes("multipart/form-data")){const o=new FormData;if(n.data instanceof FormData)n.data.forEach((a,i)=>{o.append(i,a)});else for(let a of Object.keys(n.data))o.append(a,n.data[a]);t.body=o;const u=new Headers(t.headers);u.delete("content-type"),t.headers=u}else(s.includes("application/json")||"object"==typeof n.data)&&(t.body=JSON.stringify(n.data));return t},f=function(){var n=(0,c.Z)(function*(r){const t=x(r,r.webFetchExtra),e=((n,r=!0)=>n?Object.entries(n).reduce((e,s)=>{const[o,u]=s;let a,i;return Array.isArray(u)?(i="",u.forEach(l=>{a=r?encodeURIComponent(l):l,i+=`${o}=${a}&`}),i.slice(0,-1)):(a=r?encodeURIComponent(u):u,i=`${o}=${a}`),`${e}&${i}`},"").substr(1):null)(r.params,r.shouldEncodeUrlParams),s=e?`${r.url}?${e}`:r.url,o=yield fetch(s,t),u=o.headers.get("content-type")||"";let i,{responseType:a="text"}=o.ok?r:{};switch(u.includes("application/json")&&(a="json"),a){case"arraybuffer":case"blob":const d=yield o.blob();i=yield j(d);break;case"json":i=yield o.json();break;case"document":case"text":default:i=yield o.text()}const l={};return o.headers.forEach((d,m)=>{l[m]=d}),{data:i,headers:l,status:o.status,url:o.url}});return function(t){return n.apply(this,arguments)}}(),A=function(){var n=(0,c.Z)(function*(r){return f(Object.assign(Object.assign({},r),{method:"GET"}))});return function(t){return n.apply(this,arguments)}}(),I=function(){var n=(0,c.Z)(function*(r){return f(Object.assign(Object.assign({},r),{method:"POST"}))});return function(t){return n.apply(this,arguments)}}(),P=function(){var n=(0,c.Z)(function*(r){return f(Object.assign(Object.assign({},r),{method:"PUT"}))});return function(t){return n.apply(this,arguments)}}(),R=function(){var n=(0,c.Z)(function*(r){return f(Object.assign(Object.assign({},r),{method:"PATCH"}))});return function(t){return n.apply(this,arguments)}}(),D=function(){var n=(0,c.Z)(function*(r){return f(Object.assign(Object.assign({},r),{method:"DELETE"}))});return function(t){return n.apply(this,arguments)}}();class F extends C.Uw{constructor(){var r;super(),r=this,this.request=function(){var t=(0,c.Z)(function*(e){return f(e)});return function(e){return t.apply(this,arguments)}}(),this.get=function(){var t=(0,c.Z)(function*(e){return A(e)});return function(e){return t.apply(this,arguments)}}(),this.post=function(){var t=(0,c.Z)(function*(e){return I(e)});return function(e){return t.apply(this,arguments)}}(),this.put=function(){var t=(0,c.Z)(function*(e){return P(e)});return function(e){return t.apply(this,arguments)}}(),this.patch=function(){var t=(0,c.Z)(function*(e){return R(e)});return function(e){return t.apply(this,arguments)}}(),this.del=function(){var t=(0,c.Z)(function*(e){return D(e)});return function(e){return t.apply(this,arguments)}}(),this.getCookiesMap=(0,c.Z)(function*(){const t=g(),e={};for(const s of t)e[s.key]=s.value;return e}),this.getCookies=function(){var t=(0,c.Z)(function*(e){return{cookies:g()}});return function(e){return t.apply(this,arguments)}}(),this.setCookie=function(){var t=(0,c.Z)(function*(e){const{key:s,value:o,expires:u="",path:a=""}=e;((n,r,t={})=>{const e=k(n),s=k(r),o=`; expires=${(t.expires||"").replace("expires=","")}`,u=(t.path||"/").replace("path=","");document.cookie=`${e}=${s||""}${o}; path=${u}`})(s,o,{expires:u,path:a})});return function(e){return t.apply(this,arguments)}}(),this.getCookie=function(){var t=(0,c.Z)(function*(e){return(n=>{const r=g();for(const t of r)if(t.key===n)return t;return{key:n,value:""}})(e.key)});return function(e){return t.apply(this,arguments)}}(),this.deleteCookie=function(){var t=(0,c.Z)(function*(e){document.cookie=`${e.key}=; Max-Age=0`});return function(e){return t.apply(this,arguments)}}(),this.clearCookies=function(){var t=(0,c.Z)(function*(e){return(()=>{const n=document.cookie.split(";")||[];for(const r of n)document.cookie=r.replace(/^ +/,"").replace(/=.*/,`=;expires=${(new Date).toUTCString()};path=/`)})()});return function(e){return t.apply(this,arguments)}}(),this.uploadFile=function(){var t=(0,c.Z)(function*(e){const s=new FormData;s.append(e.name,e.blob||"undefined");const o=Object.assign(Object.assign({},e),{body:s,method:"POST"});return r.post(o)});return function(e){return t.apply(this,arguments)}}(),this.downloadFile=function(){var t=(0,c.Z)(function*(e){const s=x(e,e.webFetchExtra),o=yield fetch(e.url,s);let u;if(null==e?void 0:e.progress)if(null==o?void 0:o.body){const a=o.body.getReader();let i=0,l=[];const d=o.headers.get("content-type"),m=parseInt(o.headers.get("content-length")||"0",10);for(;;){const{done:p,value:y}=yield a.read();if(p)break;l.push(y),i+=(null==y?void 0:y.length)||0,r.notifyListeners("progress",{type:"DOWNLOAD",url:e.url,bytes:i,contentLength:m})}let O=new Uint8Array(i),_=0;for(const p of l)void 0!==p&&(O.set(p,_),_+=p.length);u=new Blob([O.buffer],{type:d||void 0})}else u=new Blob;else u=yield o.blob();return{blob:u}});return function(e){return t.apply(this,arguments)}}()}}}}]);
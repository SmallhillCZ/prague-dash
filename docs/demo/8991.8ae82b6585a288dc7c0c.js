"use strict";(self.webpackChunkpraguedash_app=self.webpackChunkpraguedash_app||[]).push([[8991],{8991:(V,m,h)=>{h.r(m),h.d(m,{startTapClick:()=>M});var u=h(2377);const M=n=>{let i,o,E,d,s=10*-v,r=0;const P=n.getBoolean("animated",!0)&&n.getBoolean("rippleEffect",!0),p=new WeakMap,A=t=>{s=(0,u.o)(t),R(t)},D=()=>{clearTimeout(d),d=void 0,o&&(b(!1),o=void 0)},g=t=>{o||void 0!==i&&null!==i.parentElement||(i=void 0,S(_(t),t))},R=t=>{S(void 0,t)},S=(t,e)=>{if(t&&t===o)return;clearTimeout(d),d=void 0;const{x:l,y:a}=(0,u.p)(e);if(o){if(p.has(o))throw new Error("internal error");o.classList.contains(f)||w(o,l,a),b(!0)}if(t){const I=p.get(t);I&&(clearTimeout(I),p.delete(t));const F=T(t)?0:y;t.classList.remove(f),d=setTimeout(()=>{w(t,l,a),d=void 0},F)}o=t},w=(t,e,l)=>{r=Date.now(),t.classList.add(f);const a=P&&k(t);a&&a.addRipple&&(C(),E=a.addRipple(e,l))},C=()=>{void 0!==E&&(E.then(t=>t()),E=void 0)},b=t=>{C();const e=o;if(!e)return;const l=L-Date.now()+r;if(t&&l>0&&!T(e)){const a=setTimeout(()=>{e.classList.remove(f),p.delete(e)},L);p.set(e,a)}else e.classList.remove(f)},c=document;c.addEventListener("ionScrollStart",t=>{i=t.target,D()}),c.addEventListener("ionScrollEnd",()=>{i=void 0}),c.addEventListener("ionGestureCaptured",D),c.addEventListener("touchstart",t=>{s=(0,u.o)(t),g(t)},!0),c.addEventListener("touchcancel",A,!0),c.addEventListener("touchend",A,!0),c.addEventListener("mousedown",t=>{const e=(0,u.o)(t)-v;s<e&&g(t)},!0),c.addEventListener("mouseup",t=>{const e=(0,u.o)(t)-v;s<e&&R(t)},!0)},_=n=>{if(!n.composedPath)return n.target.closest(".ion-activatable");{const s=n.composedPath();for(let r=0;r<s.length-2;r++){const i=s[r];if(i.classList&&i.classList.contains("ion-activatable"))return i}}},T=n=>n.classList.contains("ion-activatable-instant"),k=n=>{if(n.shadowRoot){const s=n.shadowRoot.querySelector("ion-ripple-effect");if(s)return s}return n.querySelector("ion-ripple-effect")},f="ion-activated",y=200,L=200,v=2500}}]);
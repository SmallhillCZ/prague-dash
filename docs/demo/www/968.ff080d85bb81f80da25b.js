"use strict";(self.webpackChunkprague_dash=self.webpackChunkprague_dash||[]).push([[968],{968:(g,u,n)=>{n.r(u),n.d(u,{StorageWeb:()=>c});var r=n(8239),p=n(8384);class c extends p.Uw{constructor(){super(...arguments),this.group="CapacitorStorage"}configure({group:e}){var t=this;return(0,r.Z)(function*(){"string"==typeof e&&(t.group=e)})()}get(e){var t=this;return(0,r.Z)(function*(){return{value:t.impl.getItem(t.applyPrefix(e.key))}})()}set(e){var t=this;return(0,r.Z)(function*(){t.impl.setItem(t.applyPrefix(e.key),e.value)})()}remove(e){var t=this;return(0,r.Z)(function*(){t.impl.removeItem(t.applyPrefix(e.key))})()}keys(){var e=this;return(0,r.Z)(function*(){return{keys:e.rawKeys().map(s=>s.substring(e.prefix.length))}})()}clear(){var e=this;return(0,r.Z)(function*(){for(const t of e.rawKeys())e.impl.removeItem(t)})()}migrate(){var e=this;return(0,r.Z)(function*(){var t;const s=[],i=[],l="_cap_",f=Object.keys(e.impl).filter(o=>0===o.indexOf(l));for(const o of f){const a=o.substring(l.length),h=null!==(t=e.impl.getItem(o))&&void 0!==t?t:"",{value:m}=yield e.get({key:a});"string"==typeof m?i.push(a):(yield e.set({key:a,value:h}),s.push(a))}return{migrated:s,existing:i}})()}removeOld(){var e=this;return(0,r.Z)(function*(){const s=Object.keys(e.impl).filter(i=>0===i.indexOf("_cap_"));for(const i of s)e.impl.removeItem(i)})()}get impl(){return window.localStorage}get prefix(){return"NativeStorage"===this.group?"":`${this.group}.`}rawKeys(){return Object.keys(this.impl).filter(e=>0===e.indexOf(this.prefix))}applyPrefix(e){return this.prefix+e}}}}]);
"use strict";(self.webpackChunkpraguedash_app=self.webpackChunkpraguedash_app||[]).push([[968],{968:(_,u,n)=>{n.r(u),n.d(u,{StorageWeb:()=>c});var r=n(8239),p=n(8384);class c extends p.Uw{constructor(){super(...arguments),this.group="CapacitorStorage"}configure({group:e}){var t=this;return(0,r.Z)(function*(){"string"==typeof e&&(t.group=e)})()}get(e){var t=this;return(0,r.Z)(function*(){return{value:t.impl.getItem(t.applyPrefix(e.key))}})()}set(e){var t=this;return(0,r.Z)(function*(){t.impl.setItem(t.applyPrefix(e.key),e.value)})()}remove(e){var t=this;return(0,r.Z)(function*(){t.impl.removeItem(t.applyPrefix(e.key))})()}keys(){var e=this;return(0,r.Z)(function*(){return{keys:e.rawKeys().map(s=>s.substring(e.prefix.length))}})()}clear(){var e=this;return(0,r.Z)(function*(){for(const t of e.rawKeys())e.impl.removeItem(t)})()}migrate(){var e=this;return(0,r.Z)(function*(){var t;const s=[],i=[],l="_cap_",f=Object.keys(e.impl).filter(a=>0===a.indexOf(l));for(const a of f){const o=a.substring(l.length),h=null!==(t=e.impl.getItem(a))&&void 0!==t?t:"",{value:m}=yield e.get({key:o});"string"==typeof m?i.push(o):(yield e.set({key:o,value:h}),s.push(o))}return{migrated:s,existing:i}})()}removeOld(){var e=this;return(0,r.Z)(function*(){const s=Object.keys(e.impl).filter(i=>0===i.indexOf("_cap_"));for(const i of s)e.impl.removeItem(i)})()}get impl(){return window.localStorage}get prefix(){return"NativeStorage"===this.group?"":`${this.group}.`}rawKeys(){return Object.keys(this.impl).filter(e=>0===e.indexOf(this.prefix))}applyPrefix(e){return this.prefix+e}}}}]);
"use strict";(self.webpackChunkprague_dash=self.webpackChunkprague_dash||[]).push([[1033],{1033:(h,s,t)=>{t.r(s),t.d(s,{ion_img:()=>e});var i=t(9533),n=t(7639);let e=class{constructor(o){(0,i.r)(this,o),this.ionImgWillLoad=(0,i.e)(this,"ionImgWillLoad",7),this.ionImgDidLoad=(0,i.e)(this,"ionImgDidLoad",7),this.ionError=(0,i.e)(this,"ionError",7),this.onLoad=()=>{this.ionImgDidLoad.emit()},this.onError=()=>{this.ionError.emit()}}srcChanged(){this.addIO()}componentDidLoad(){this.addIO()}addIO(){void 0!==this.src&&("undefined"!=typeof window&&"IntersectionObserver"in window&&"IntersectionObserverEntry"in window&&"isIntersecting"in window.IntersectionObserverEntry.prototype?(this.removeIO(),this.io=new IntersectionObserver(o=>{o[o.length-1].isIntersecting&&(this.load(),this.removeIO())}),this.io.observe(this.el)):setTimeout(()=>this.load(),200))}load(){this.loadError=this.onError,this.loadSrc=this.src,this.ionImgWillLoad.emit()}removeIO(){this.io&&(this.io.disconnect(),this.io=void 0)}render(){return(0,i.h)(i.H,{class:(0,n.b)(this)},(0,i.h)("img",{decoding:"async",src:this.loadSrc,alt:this.alt,onLoad:this.onLoad,onError:this.loadError,part:"image"}))}get el(){return(0,i.i)(this)}static get watchers(){return{src:["srcChanged"]}}};e.style=":host{display:block;-o-object-fit:contain;object-fit:contain}img{display:block;width:100%;height:100%;-o-object-fit:inherit;object-fit:inherit;-o-object-position:inherit;object-position:inherit}"}}]);
"use strict";(self.webpackChunkpraguedash_app=self.webpackChunkpraguedash_app||[]).push([[3087],{5931:(x,c,e)=>{e.r(c),e.d(c,{ion_infinite_scroll:()=>d,ion_infinite_scroll_content:()=>h});var a=e(8239),n=e(3150),s=e(7585),p=e(6575);const d=class{constructor(i){(0,n.r)(this,i),this.ionInfinite=(0,n.e)(this,"ionInfinite",7),this.thrPx=0,this.thrPc=0,this.didFire=!1,this.isBusy=!1,this.isLoading=!1,this.threshold="15%",this.disabled=!1,this.position="bottom",this.onScroll=()=>{const t=this.scrollEl;if(!t||!this.canStart())return 1;const l=this.el.offsetHeight;if(0===l)return 2;const o=t.scrollTop,f=t.offsetHeight,g=0!==this.thrPc?f*this.thrPc:this.thrPx;if(("bottom"===this.position?t.scrollHeight-l-o-g-f:o-l-g)<0){if(!this.didFire)return this.isLoading=!0,this.didFire=!0,this.ionInfinite.emit(),3}else this.didFire=!1;return 4}}thresholdChanged(){const i=this.threshold;i.lastIndexOf("%")>-1?(this.thrPx=0,this.thrPc=parseFloat(i)/100):(this.thrPx=parseFloat(i),this.thrPc=0)}disabledChanged(){const i=this.disabled;i&&(this.isLoading=!1,this.isBusy=!1),this.enableScrollEvents(!i)}connectedCallback(){var i=this;return(0,a.Z)(function*(){const t=i.el.closest("ion-content");t?(i.scrollEl=yield t.getScrollElement(),i.thresholdChanged(),i.disabledChanged(),"top"===i.position&&(0,n.c)(()=>{i.scrollEl&&(i.scrollEl.scrollTop=i.scrollEl.scrollHeight-i.scrollEl.clientHeight)})):console.error("<ion-infinite-scroll> must be used inside an <ion-content>")})()}disconnectedCallback(){this.enableScrollEvents(!1),this.scrollEl=void 0}complete(){var i=this;return(0,a.Z)(function*(){const t=i.scrollEl;if(i.isLoading&&t&&(i.isLoading=!1,"top"===i.position)){i.isBusy=!0;const l=t.scrollHeight-t.scrollTop;requestAnimationFrame(()=>{(0,n.f)(()=>{const r=t.scrollHeight-l;requestAnimationFrame(()=>{(0,n.c)(()=>{t.scrollTop=r,i.isBusy=!1})})})})}})()}canStart(){return!(this.disabled||this.isBusy||!this.scrollEl||this.isLoading)}enableScrollEvents(i){this.scrollEl&&(i?this.scrollEl.addEventListener("scroll",this.onScroll):this.scrollEl.removeEventListener("scroll",this.onScroll))}render(){const i=(0,s.b)(this);return(0,n.h)(n.H,{class:{[i]:!0,"infinite-scroll-loading":this.isLoading,"infinite-scroll-enabled":!this.disabled}})}get el(){return(0,n.i)(this)}static get watchers(){return{threshold:["thresholdChanged"],disabled:["disabledChanged"]}}};d.style="ion-infinite-scroll{display:none;width:100%}.infinite-scroll-enabled{display:block}";const h=class{constructor(i){(0,n.r)(this,i)}componentDidLoad(){if(void 0===this.loadingSpinner){const i=(0,s.b)(this);this.loadingSpinner=s.c.get("infiniteLoadingSpinner",s.c.get("spinner","ios"===i?"lines":"crescent"))}}render(){const i=(0,s.b)(this);return(0,n.h)(n.H,{class:{[i]:!0,[`infinite-scroll-content-${i}`]:!0}},(0,n.h)("div",{class:"infinite-loading"},this.loadingSpinner&&(0,n.h)("div",{class:"infinite-loading-spinner"},(0,n.h)("ion-spinner",{name:this.loadingSpinner})),this.loadingText&&(0,n.h)("div",{class:"infinite-loading-text",innerHTML:(0,p.s)(this.loadingText)})))}};h.style={ios:"ion-infinite-scroll-content{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center;min-height:84px;text-align:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.infinite-loading{margin-left:0;margin-right:0;margin-top:0;margin-bottom:32px;display:none;width:100%}.infinite-loading-text{margin-left:32px;margin-right:32px;margin-top:4px;margin-bottom:0}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.infinite-loading-text{margin-left:unset;margin-right:unset;-webkit-margin-start:32px;margin-inline-start:32px;-webkit-margin-end:32px;margin-inline-end:32px}}.infinite-scroll-loading ion-infinite-scroll-content>.infinite-loading{display:block}.infinite-scroll-content-ios .infinite-loading-text{color:var(--ion-color-step-600, #666666)}.infinite-scroll-content-ios .infinite-loading-spinner .spinner-lines-ios line,.infinite-scroll-content-ios .infinite-loading-spinner .spinner-lines-small-ios line,.infinite-scroll-content-ios .infinite-loading-spinner .spinner-crescent circle{stroke:var(--ion-color-step-600, #666666)}.infinite-scroll-content-ios .infinite-loading-spinner .spinner-bubbles circle,.infinite-scroll-content-ios .infinite-loading-spinner .spinner-circles circle,.infinite-scroll-content-ios .infinite-loading-spinner .spinner-dots circle{fill:var(--ion-color-step-600, #666666)}",md:"ion-infinite-scroll-content{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center;min-height:84px;text-align:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.infinite-loading{margin-left:0;margin-right:0;margin-top:0;margin-bottom:32px;display:none;width:100%}.infinite-loading-text{margin-left:32px;margin-right:32px;margin-top:4px;margin-bottom:0}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.infinite-loading-text{margin-left:unset;margin-right:unset;-webkit-margin-start:32px;margin-inline-start:32px;-webkit-margin-end:32px;margin-inline-end:32px}}.infinite-scroll-loading ion-infinite-scroll-content>.infinite-loading{display:block}.infinite-scroll-content-md .infinite-loading-text{color:var(--ion-color-step-600, #666666)}.infinite-scroll-content-md .infinite-loading-spinner .spinner-lines-md line,.infinite-scroll-content-md .infinite-loading-spinner .spinner-lines-small-md line,.infinite-scroll-content-md .infinite-loading-spinner .spinner-crescent circle{stroke:var(--ion-color-step-600, #666666)}.infinite-scroll-content-md .infinite-loading-spinner .spinner-bubbles circle,.infinite-scroll-content-md .infinite-loading-spinner .spinner-circles circle,.infinite-scroll-content-md .infinite-loading-spinner .spinner-dots circle{fill:var(--ion-color-step-600, #666666)}"}}}]);
"use strict";(self.webpackChunkprague_dash=self.webpackChunkprague_dash||[]).push([[7820],{7820:(I,p,r)=>{r.r(p),r.d(p,{CardDetailModule:()=>F});var u=r(8583),l=r(6270),m=r(8239),f=r(739),h=r(8002),v=r(5435),C=r(9794),t=r(639),y=r(4379),d=r(3083);let g=(()=>{class n{constructor(e,o,a){this.componentFactoryResolver=e,this.viewContainerRef=o,this.cards=a}ngOnInit(){}ngOnChanges(){this.renderCard(this.card)}renderCard(e){const o=this.cards.find(c=>c.type===e.type);if(!o||!o.detailComponent)return;this.viewContainerRef.clear();const a=this.componentFactoryResolver.resolveComponentFactory(o.detailComponent);this.viewContainerRef.createComponent(a).instance.card=e}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(t._Vd),t.Y36(t.s_b),t.Y36(C.g))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-card-detail-content"]],inputs:{card:"card"},features:[t.TTD],decls:0,vars:0,template:function(e,o){},styles:[""]}),n})();function T(n,i){1&n&&(t.TgZ(0,"ion-button",4),t._UZ(1,"ion-icon",5),t.qZA())}function D(n,i){if(1&n&&t._UZ(0,"app-card-detail-content",6),2&n){const e=t.oxw();t.Q6J("card",e.card)}}const Z=[{path:"",component:(()=>{class n{constructor(e,o,a){this.route=e,this.dashboardService=o,this.cardTypes=a}ngOnInit(){const e=this.route.params.pipe((0,h.U)(a=>a.id));(0,f.aj)([e,this.dashboardService.dashboard]).pipe((0,v.h)(a=>!!a[1])).subscribe(([a,s])=>this.loadCard(a,s))}loadCard(e,o){var a=this;return(0,m.Z)(function*(){a.card=null==o?void 0:o.cards.find(s=>s.id===e),a.cardType=a.cardTypes.find(s=>{var c;return s.type===(null===(c=a.card)||void 0===c?void 0:c.type)})})()}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(l.gz),t.Y36(y.s),t.Y36(C.g))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-card-detail"]],decls:10,vars:3,consts:[["defaultHref","/"],["slot","primary"],["routerLink","settings",4,"ngIf"],[3,"card",4,"ngIf"],["routerLink","settings"],["name","settings-outline"],[3,"card"]],template:function(e,o){1&e&&(t.TgZ(0,"ion-header"),t.TgZ(1,"ion-toolbar"),t.TgZ(2,"ion-buttons"),t._UZ(3,"ion-back-button",0),t.qZA(),t.TgZ(4,"ion-title"),t._uU(5),t.qZA(),t.TgZ(6,"ion-buttons",1),t.YNc(7,T,2,0,"ion-button",2),t.qZA(),t.qZA(),t.qZA(),t.TgZ(8,"ion-content"),t.YNc(9,D,1,1,"app-card-detail-content",3),t.qZA()),2&e&&(t.xp6(5),t.hij(" ",(null==o.cardType||null==o.cardType.title?null:o.cardType.title.cs)||"Detail karty"," "),t.xp6(2),t.Q6J("ngIf",null==o.cardType?null:o.cardType.settingsComponent),t.xp6(2),t.Q6J("ngIf",o.card))},directives:[d.Gu,d.sr,d.Sm,d.oU,d.cs,d.wd,u.O5,d.W2,d.YG,l.rH,d.YI,d.gu,g],styles:[""]}),n})()}];let Y=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[[l.Bz.forChild(Z)],l.Bz]}),n})();var A=r(4466),R=r(1528);let F=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[[u.ez,Y,A.m,R.m]]}),n})()}}]);
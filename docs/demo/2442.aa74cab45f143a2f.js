"use strict";(self.webpackChunkprague_dash=self.webpackChunkprague_dash||[]).push([[2442],{2442:(O,a,e)=>{e.r(a),e.d(a,{createSwipeBackGesture:()=>E});var h=e(6499),_=e(1363);e(2733);const E=(c,g,D,M,m)=>{const r=c.ownerDocument.defaultView;return(0,_.createGesture)({el:c,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:t=>t.startX<=50&&g(),onStart:D,onMove:t=>{M(t.deltaX/r.innerWidth)},onEnd:t=>{const s=r.innerWidth,n=t.deltaX/s,o=t.velocityX,u=o>=0&&(o>.2||t.deltaX>s/2),i=(u?1-n:n)*s;let l=0;if(i>5){const C=i/Math.abs(o);l=Math.min(C,540)}m(u,n<=0?.01:(0,h.d)(0,n,.9999),l)}})}}}]);
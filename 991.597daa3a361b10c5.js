"use strict";(self.webpackChunkmini_project=self.webpackChunkmini_project||[]).push([[991],{991:(b,u,r)=>{r.r(u),r.d(u,{ResultsModule:()=>v});var i=r(6814),m=r(5438),e=r(4946),a=r(4670),c=r(95),d=r(707),p=r(6804);function g(s,o){if(1&s){const t=e.EpF();e.TgZ(0,"p-toggleButton",9),e.NdJ("ngModelChange",function(l){const R=e.CHM(t).$implicit;return e.KtG(R.selected=l)}),e.qZA()}if(2&s){const t=o.$implicit,n=e.oxw().$implicit;e.ekj("correct-answer",t.name===n.correct_answer)("wrong-answer",t.selected&&t.name!==n.correct_answer),e.s9C("onLabel",t.name),e.s9C("offLabel",t.name),e.Q6J("ngModel",t.selected)("disabled",!0)}}function f(s,o){if(1&s&&(e.TgZ(0,"div")(1,"span"),e._uU(2),e.qZA(),e.TgZ(3,"div",7),e.YNc(4,g,1,8,"p-toggleButton",8),e.qZA()()),2&s){const t=o.$implicit,n=o.index;e.xp6(2),e.AsE(" ",n+1,". ",t.question," "),e.xp6(2),e.Q6J("ngForOf",t.all_shuffled_answers)}}function h(s,o){if(1&s&&(e.TgZ(0,"div",10)(1,"span",11),e._uU(2),e.qZA()()),2&s){const t=e.oxw();e.xp6(1),e.ekj("fail-quiz",t.correctAnswers<2)("pass-quiz",2==t.correctAnswers||3==t.correctAnswers)("success-quiz",t.correctAnswers>3),e.xp6(1),e.hij("You scored ",t.correctAnswers," out of 5")}}let w=(()=>{var s;class o{constructor(n){this.router=n,this.displayedResults=[],this.correctAnswers=0,this.destroyed$=new m.t(0)}ngOnInit(){this.displayedResults=JSON.parse(sessionStorage.getItem("questionsWithSelectedAnswers")),this.correctAnswers=0,this.displayedResults&&this.displayedResults.forEach(n=>{n.all_shuffled_answers?.forEach(l=>{!0===l.selected&&l.name===n.correct_answer&&(this.correctAnswers+=1)})})}ngOnDestroy(){this.destroyed$.next(!0),this.destroyed$.complete()}createNewQuiz(){this.router.navigate(["Quiz"])}}return(s=o).\u0275fac=function(n){return new(n||s)(e.Y36(a.F0))},s.\u0275cmp=e.Xpm({type:s,selectors:[["app-results"]],decls:8,vars:2,consts:[[1,"main-container","mt-10","py-5"],[1,"text-3xl","mb-10","text-center"],[1,"results-field","mb-10","text-center"],[4,"ngFor","ngForOf"],["class","score-field text-center mb-6",4,"ngIf"],[1,"new-quiz-button-field","text-center"],["label","Create a new quiz",1,"new-quiz-button",3,"click"],[1,"mt-2","mb-6"],["class","mr-2 answer-button",3,"correct-answer","wrong-answer","onLabel","offLabel","ngModel","disabled","ngModelChange",4,"ngFor","ngForOf"],[1,"mr-2","answer-button",3,"onLabel","offLabel","ngModel","disabled","ngModelChange"],[1,"score-field","text-center","mb-6"],[1,"text-l","font-semibold","py-1","px-20","rounded-md"]],template:function(n,l){1&n&&(e.TgZ(0,"div",0)(1,"h2",1),e._uU(2,"RESULTS"),e.qZA(),e.TgZ(3,"div",2),e.YNc(4,f,5,3,"div",3),e.qZA(),e.YNc(5,h,3,7,"div",4),e.TgZ(6,"div",5)(7,"p-button",6),e.NdJ("click",function(){return l.createNewQuiz()}),e.qZA()()()),2&n&&(e.xp6(4),e.Q6J("ngForOf",l.displayedResults),e.xp6(1),e.Q6J("ngIf",l.displayedResults&&l.displayedResults.length>0))},dependencies:[i.sg,i.O5,c.JJ,c.On,d.zx,p.CO]}),o})(),v=(()=>{var s;class o{}return(s=o).\u0275fac=function(n){return new(n||s)},s.\u0275mod=e.oAB({type:s}),s.\u0275inj=e.cJS({imports:[i.ez,a.Bz.forChild([{path:"",component:w}]),c.u5,d.hJ,p.KZ]}),o})()}}]);
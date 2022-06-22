!function(e){"use strict"
;var t=function(){},i=function(e){var i,n
;if(e&&e.aborted)this.promise=Promise.reject(e.reason),
this.resolve=t,this.reject=t;else if(this.promise=new Promise((function(e,t){
i=e,n=t})),e){var o=e.subscribe((function(e){n(e)
}));this.resolve=function(e){o(),i(e)
},this.reject=function(e){o(),n(e)}
}else this.resolve=i,this.reject=n}
;const n=setTimeout,o=clearTimeout,r={
now:function(){return Date.now()},
setTimeout:"undefined"==typeof window?setTimeout:function(){
return n.apply(window,arguments)},
clearTimeout:"undefined"==typeof window?clearTimeout:function(){
return o.apply(window,arguments)}}
;e.CustomPromise=i,e.delay=function(e,t,i){
return new Promise((function(n,o){
if(t&&t.aborted)o(t.reason);else{
var s,u=i||r,c=u.setTimeout((function(){s&&s(),n()
}),e);t&&(s=t.subscribe((function(e){
u.clearTimeout(c),o(e)})))}}))
},Object.defineProperty(e,"__esModule",{value:!0})
}({});

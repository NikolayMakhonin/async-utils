!function(t){"use strict";function e(t,e){
var n="function"==typeof Symbol&&t[Symbol.iterator]
;if(!n)return t;var r,i,o=n.call(t),s=[];try{
for(;(void 0===e||e-- >0)&&!(r=o.next()).done;)s.push(r.value)
}catch(t){i={error:t}}finally{try{
r&&!r.done&&(n=o.return)&&n.call(o)}finally{
if(i)throw i.error}}return s}function n(t){
return null!=t&&"object"==typeof t&&"function"==typeof t.then
}function r(t,e,n){try{var r=e?e(t):t
;n._resolve(r)}catch(t){n._reject(t)}}
function i(t,e,n){e||n._reject(t);try{var r=e(t)
;n._resolve(r)}catch(t){n._reject(t)}}
var o=function(){},s=function(){function t(t){
this.status="pending",this.value=void 0,
this.reason=void 0,this._handlers=null
;var e=this._resolve,n=this._reject,r=this._resolveAsync,i=this._rejectAsync,o=this
;this._resolve=function(t){e.call(o,t)
},this._reject=function(t){n.call(o,t)
},this._resolveAsync=function(t){r.call(o,t)
},this._rejectAsync=function(t){i.call(o,t)
},t(this._resolve,this._reject)}
return t.prototype._resolve=function(t){
"pending"===this.status&&(this.status="fulfilled",
this._resolveAsync(t))
},t.prototype._resolveAsync=function(t){
n(t)?t.then(this._resolveAsync,this._rejectAsync):this._resolveSync(t)
},t.prototype._resolveSync=function(t){
var n=this._handlers;if(this.value=t,null!=n){
this._handlers=null
;for(var i=0,o=n.length;i<o;i++){var s=e(n[i],3)
;r(t,s[0],s[2])}}
},t.prototype._reject=function(t){
"pending"===this.status&&this._rejectAsync(t)
},t.prototype._rejectAsync=function(t){
this.status="rejected",n(t)?t.then(this._rejectAsync,this._rejectAsync):this._rejectSync(t)
},t.prototype._rejectSync=function(t){
var n=this._handlers;if(this.reason=t,null!=n){
this._handlers=null
;for(var r=0,o=n.length;r<o;r++){var s=e(n[r],3)
;i(t,s[1],s[2])}}},t.prototype.then=function(e,n){
var s=new t(o)
;return"pending"===this.status?(null==this._handlers&&(this._handlers=[]),
this._handlers.push([e,n,s])):"fulfilled"===this.status?r(this.value,e,s):i(this.reason,n,s),
s},t.prototype.catch=function(t){
return this.then(void 0,t)
},t.prototype.finally=function(t){
var e=t&&function(e){return t(),e
},n=t&&function(e){throw t(),e}
;return this.then(e,n)},t.resolve=function(e){
var n=new t(o);return n._resolve(e),n
},t.reject=function(e){var n=new t(o)
;return n._reject(e),n
},Object.defineProperty(t.prototype,Symbol.toStringTag,{
get:function(){return"Promise"},enumerable:!1,
configurable:!0}),t}()
;var c=function(){},u=function(t){var e,n
;if(t&&t.aborted)this.promise=s.reject(t.reason),
this.resolve=c,this.reject=c;else if(this.promise=new Promise((function(t,r){
e=t,n=function(e){!function(t,e){t(function(t){
return{then:function(e,n){n(t)}}}(e))}(t,e)}
})),t){var r=t.subscribe((function(t){n(t)}))
;this.resolve=function(t){r(),e(t)
},this.reject=function(t){r(),n(t)}
}else this.resolve=e,this.reject=n}
;const l=setTimeout,h=clearTimeout,a={
now:function(){return Date.now()},
setTimeout:"undefined"==typeof window?setTimeout:function(){
return l.apply(window,arguments)},
clearTimeout:"undefined"==typeof window?clearTimeout:function(){
return h.apply(window,arguments)}}
;t.CustomPromise=u,t.delay=function(t,e,n){
return new Promise((function(r,i){
if(e&&e.aborted)i(e.reason);else{
var o,s=n||a,c=s.setTimeout((function(){o&&o(),r()
}),t);e&&(o=e.subscribe((function(t){
s.clearTimeout(c),i(t)})))}}))
},Object.defineProperty(t,"__esModule",{value:!0})
}({});

!function(e){"use strict";function t(e,t){
var n="function"==typeof Symbol&&e[Symbol.iterator]
;if(!n)return e;var r,s,i=n.call(e),o=[];try{
for(;(void 0===t||t-- >0)&&!(r=i.next()).done;)o.push(r.value)
}catch(e){s={error:e}}finally{try{
r&&!r.done&&(n=i.return)&&n.call(i)}finally{
if(s)throw s.error}}return o}function n(e){
return null!=e&&"object"==typeof e&&"function"==typeof e.then
}function r(e,t,n){try{var r=t?t(e):e;n.resolve(r)
}catch(e){n.reject(e)}}var s=function(){
function e(e){var t=this
;this.status="pending",this.value=void 0,this.reason=void 0,
this._handlers=null
;var n=this.resolve,r=this.reject,s=this._resolveAsync,i=this._rejectAsync
;this.resolve=function(e){n.call(t,e)
},this.reject=function(e){r.call(t,e)
},this._resolveAsync=function(e){s.call(t,e)
},this._rejectAsync=function(e){i.call(t,e)
},e&&e(this.resolve,this.reject)}
return e.prototype.resolve=function(e){
"pending"===this.status&&(this.status="fulfilled",
this._resolveAsync(e))
},e.prototype._resolveAsync=function(e){
n(e)?e.then(this._resolveAsync,this._rejectAsync):this._resolve(e)
},e.prototype._resolve=function(e){
var n=this._handlers
;if(this._handlers=null,this.value=e,n)for(var s=0,i=n.length;s<i;s++){
var o=t(n[s],3);r(e,o[0],o[2])}
},e.prototype.reject=function(e){
"pending"===this.status&&(this.status="rejected",
this._rejectAsync(e))
},e.prototype._rejectAsync=function(e){
n(e)?e.then(this._resolveAsync,this._rejectAsync):this._resolve(e)
},e.prototype._reject=function(e){
var n=this._handlers
;if(this._handlers=null,this.reason=e,n)for(var s=0,i=n.length;s<i;s++){
var o=t(n[s],3);r(e,o[1],o[2])}
},e.prototype.then=function(t,n){var s=new e
;return"pending"===this.status?this._handlers.push([t,n,s]):"fulfilled"===this.status?function(e,t,n){
try{var r=t?t(e):e;n.resolve(r)}catch(e){
n.reject(e)}}(this.value,t,s):r(this.value,n,s),s
},e.prototype.catch=function(e){
return this.then(void 0,e)},e.resolve=function(t){
var n=new e;return n.resolve(t),n
},e.reject=function(t){var n=new e
;return n.reject(t),n},e}();global.Promise=s
;var i=function(){},o=function(e){var t,n
;if(e&&e.aborted)this.promise=Promise.reject(e.reason),
this.resolve=i,this.reject=i;else if(this.promise=new Promise((function(e,r){
t=e,n=r})),e){var r=e.subscribe((function(e){n(e)
}));this.resolve=function(e){r(),t(e)
},this.reject=function(e){r(),n(e)}
}else this.resolve=t,this.reject=n}
;const c=setTimeout,u=clearTimeout,l={
now:function(){return Date.now()},
setTimeout:"undefined"==typeof window?setTimeout:function(){
return c.apply(window,arguments)},
clearTimeout:"undefined"==typeof window?clearTimeout:function(){
return u.apply(window,arguments)}}
;e.CustomPromise=o,e.PromiseFast=s,e.delay=function(e,t,n){
return new Promise((function(r,s){
if(t&&t.aborted)s(t.reason);else{
var i,o=n||l,c=o.setTimeout((function(){i&&i(),r()
}),e);t&&(i=t.subscribe((function(e){
o.clearTimeout(c),s(e)})))}}))
},Object.defineProperty(e,"__esModule",{value:!0})
}({});

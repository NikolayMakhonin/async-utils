!function(t){"use strict";const e=new class{
constructor(){this._nowUnique=0}now(){
return Math.max(this._nowUnique,Date.now())}
nowUnique(){const t=this.now()+1
;return this._nowUnique=t,t}setTimeout(t,e){
return setTimeout(t,e)}clearTimeout(t){
clearTimeout(t)}};function n(t,e,n,r){
return new(n||(n=Promise))(function(o,i){
function u(t){try{a(r.next(t))}catch(t){i(t)}}
function s(t){try{a(r.throw(t))}catch(t){i(t)}}
function a(t){var e
;t.done?o(t.value):(e=t.value,e instanceof n?e:new n(function(t){
t(e)})).then(u,s)}a((r=r.apply(t,e||[])).next())})
}function r(t,e){var n,r,o,i={label:0,
sent:function(){if(1&o[0])throw o[1];return o[1]},
trys:[],ops:[]
},u=Object.create(("function"==typeof Iterator?Iterator:Object).prototype)
;return u.next=s(0),
u.throw=s(1),u.return=s(2),"function"==typeof Symbol&&(u[Symbol.iterator]=function(){
return this}),u;function s(s){return function(a){
return function(s){
if(n)throw new TypeError("Generator is already executing.")
;for(;u&&(u=0,s[0]&&(i=0)),i;)try{
if(n=1,r&&(o=2&s[0]?r.return:s[0]?r.throw||((o=r.return)&&o.call(r),
0):r.next)&&!(o=o.call(r,s[1])).done)return o
;switch(r=0,o&&(s=[2&s[0],o.value]),s[0]){case 0:
case 1:o=s;break;case 4:return i.label++,{
value:s[1],done:!1};case 5:i.label++,r=s[1],s=[0]
;continue;case 7:s=i.ops.pop(),i.trys.pop()
;continue;default:
if(!(o=i.trys,(o=o.length>0&&o[o.length-1])||6!==s[0]&&2!==s[0])){
i=0;continue}
if(3===s[0]&&(!o||s[1]>o[0]&&s[1]<o[3])){
i.label=s[1];break}if(6===s[0]&&i.label<o[1]){
i.label=o[1],o=s;break}if(o&&i.label<o[2]){
i.label=o[2],i.ops.push(s);break}
o[2]&&i.ops.pop(),i.trys.pop();continue}
s=e.call(t,i)}catch(t){s=[6,t],r=0}finally{n=o=0}
if(5&s[0])throw s[1];return{
value:s[0]?s[1]:void 0,done:!0}}([s,a])}}}
function o(t,e){
var n="function"==typeof Symbol&&t[Symbol.iterator]
;if(!n)return t;var r,o,i=n.call(t),u=[];try{
for(;(void 0===e||e-- >0)&&!(r=i.next()).done;)u.push(r.value)
}catch(t){o={error:t}}finally{try{
r&&!r.done&&(n=i.return)&&n.call(i)}finally{
if(o)throw o.error}}return u}function i(t){
return null!=t&&"object"==typeof t&&"function"==typeof t.then
}
"function"==typeof SuppressedError&&SuppressedError
;var u,s=[];function a(t){
s.push(t),u||(u=function(){
return n(this,void 0,void 0,function(){var t
;return r(this,function(e){switch(e.label){case 0:
return s.length>0?[4,0]:[3,2];case 1:
return e.sent(),t=s,s=[],t.forEach(function(t){
try{t()}catch(t){
console.error("Unhandled promise rejection",t)}
}),[3,0];case 2:return u=null,[2]}})})}())}
function l(t,e){var n,r;e||(e=Promise)
;var o=new e(function(t,e){n=t,r=e
}),u=t.length,s=[];return t.forEach(function(t,e){
i(t)?t.then(function(t){s[e]=t,0===--u&&n(s)
},r):(s[e]=t,0===--u&&n(s))}),o}function c(t,e){
var n;e||(e=Promise);var r=new e(function(t,e){n=t
}),o=t.length,u=[];return t.forEach(function(t,e){
i(t)?t.then(function(t){u[e]={status:"fulfilled",
value:t},0===--o&&n(u)},function(t){u[e]={
status:"rejected",reason:t},0===--o&&n(u)
}):(u[e]={status:"fulfilled",value:t
},0===--o&&n(u))}),r}function f(t,e){var n,r
;e||(e=Promise);var o=new e(function(t,e){n=t,r=e
}),u=t.length,s=[];return t.forEach(function(t,e){
i(t)?t.then(n,function(t){
s[e]=t,0===--u&&r(new AggregateError(s))}):n(t)
}),o}function h(t,e){var n,r;e||(e=Promise)
;var o=new e(function(t,e){n=t,r=e})
;return t.forEach(function(t){
i(t)?t.then(n,r):n(t)}),o}function v(t,e,n){
a(function(){try{var r=e?e(t):t;n._resolve(r)
}catch(t){n._reject(t)}})}function d(t,e,n){
a(function(){if(e)try{var r=e(t);n._resolve(r)
}catch(t){n._reject(t)}else n._reject(t)})}
var b=function(){},p=function(){function t(t){
this.status="pending",this.value=void 0,
this.reason=void 0,this._handlers=null
;var e=this._resolve,n=this._reject,r=this._resolveAsync,o=this._rejectAsync,i=this
;this._resolve=function(t){e.call(i,t)
},this._reject=function(t){n.call(i,t)
},this._resolveAsync=function(t){r.call(i,t)
},this._rejectAsync=function(t){o.call(i,t)
},t(this._resolve,this._reject)}
return t.prototype._resolve=function(t){
"pending"===this.status&&(this.status="fulfilled",
this._resolveAsync(t))
},t.prototype._resolveAsync=function(t){
i(t)?t.then(this._resolveAsync,this._rejectAsync):this._resolveSync(t)
},t.prototype._resolveSync=function(t){
var e=this._handlers;if(this.value=t,null!=e){
this._handlers=null
;for(var n=0,r=e.length;n<r;n++){var i=o(e[n],3)
;v(t,i[0],i[2])}}
},t.prototype._reject=function(t){
"pending"===this.status&&this._rejectAsync(t)
},t.prototype._rejectAsync=function(t){
this.status="rejected",i(t)?t.then(this._rejectAsync,this._rejectAsync):this._rejectSync(t)
},t.prototype._rejectSync=function(t){
var e=this._handlers;if(this.reason=t,null!=e){
this._handlers=null
;for(var n=0,r=e.length;n<r;n++){var i=o(e[n],3)
;d(t,i[1],i[2])}}},t.prototype.then=function(e,n){
var r=new t(b)
;return"pending"===this.status?(null==this._handlers&&(this._handlers=[]),
this._handlers.push([e,n,r])):"fulfilled"===this.status?v(this.value,e,r):d(this.reason,n,r),
r},t.prototype.catch=function(t){
return this.then(void 0,t)
},t.prototype.finally=function(e){
var n=e&&function(n){var r=e()
;return i(r)?r.then(function(){return n
}):t.resolve(n)},r=e&&function(n){var r=e()
;return i(r)?r.then(function(){return t.reject(n)
}):t.reject(n)};return this.then(n,r)
},t.resolve=function(e){var n=new t(b)
;return n._resolve(e),n},t.reject=function(e){
var n=new t(b);return n._reject(e),n
},Object.defineProperty(t.prototype,Symbol.toStringTag,{
get:function(){return"Promise"},enumerable:!1,
configurable:!0
}),Object.defineProperty(t,Symbol.species,{
get:function(){return t},enumerable:!1,
configurable:!0}),t.all=function(e){return l(e,t)
},t.allSettled=function(e){return c(e,t)
},t.any=function(e){return f(e,t)
},t.race=function(e){return h(e,t)},t}()
;function y(t){return{then:function(e,n){n(t)}}}
function m(t,e){t(y(e))}function w(t){
return Promise.resolve(y(t))}
var g=function(){},_=function(){function t(t){
var e,n,r=this
;if(this._status="pending",t&&t.aborted)this.promise=p.reject(t.reason),
this.resolve=g,
this.reject=g;else if(this.promise=new Promise(function(t){
e=t,n=function(e){m(t,e)}}),t){
var o=t.subscribe(function(t){n(t)})
;this.resolve=function(t){o(),e(t)
},this.reject=function(t){o(),n(t)}
}else this.resolve=e,this.reject=n
;this.promise.then(function(){r._status="resolved"
},function(){r._status="rejected"})}
return Object.defineProperty(t.prototype,"state",{
get:function(){return this._status},enumerable:!1,
configurable:!0}),t}();function j(t,n,r){
if(!Number.isFinite(t))throw new TypeError("milliseconds must be a finite number: "+t)
;return new Promise(function(o){
if(n&&n.aborted)m(o,n.reason);else{
var i,u=r||e,s=u.setTimeout(function(){i&&i(),o()
},t);n&&(i=n.subscribe(function(t){
u.clearTimeout(s),m(o,t)}))}})}
class k extends Error{constructor(t,e){
super(t),Object.setPrototypeOf(this,k.prototype),
this.reason=e,this.name="AbortError",
this._internal=!1}}const E=()=>{};class P{
constructor(){
this.aborted=!1,this.reason=void 0,this._callbacks=void 0
}subscribe(t){var e
;if(null===(e=this._callbacks)||void 0===e?void 0:e.has(t))throw new Error("Already subscribed: "+t)
;return this.aborted?(t.call(this,this.reason),
E):(this._callbacks||(this._callbacks=new Set),
this._callbacks.add(t),()=>{var e
;null===(e=this._callbacks)||void 0===e||e.delete(t)
})}abort(t){var e
;this.aborted=!0,this.reason=t,null===(e=this._callbacks)||void 0===e||e.forEach(t=>{
t.call(this,this.reason)}),this._callbacks=void 0}
throwIfAborted(){if(this.aborted)throw this.reason
}}class S{constructor(){this.signal=new P}
abort(t){
this.signal.aborted||(void 0===t&&((t=new k("Aborted with no reason",t))._internal=!0),
this.signal.abort(t))}}function T(){
for(var t,e,n=[],r=0;r<arguments.length;r++)n[r]=arguments[r]
;function o(e){t.abort(e)}
for(var i=0;i<n.length;i++){var u=n[i];if(u){
if(u.aborted)return u
;e?(t||(t=new S,e.subscribe(o)),u.subscribe(o)):e=u
}}return t?t.signal:e||(new S).signal}
function A(t,e){return e?t.then(function(t){
var n=e();return i(n)?n.then(function(){return t
}):t},function(t){var n=e();if(!i(n))throw t
;return n.then(function(){throw t})}):t}
function V(t,e,n){function r(t){if(!n)return e(t)
;try{var r=e(t)
;return i(r)?A(r,n):i(o=n())?o.then(function(){
return r}):r}catch(t){var o;if(!i(o=n()))throw t
;return o.then(function(){throw t})}}
var o=t?t():void 0;return i(o)?o.then(r):r(o)}
function M(t,e){return e?function(){try{
var n=t.apply(this,arguments)
;return i(n)?A(n,e):(e(),n)}catch(t){throw e(),t}
}:t}function x(t){
if(t)return new Promise(function(e,n){
t.subscribe(function(t){n(t)})})}function O(t){
var e=new S;return t.then(function(){e.abort()
},function(){e.abort()}),e.signal}
var I=function(t){
void 0===t&&(t={}),this.value=t.value,this.loading=t.loading||!1,
this.hasValue=t.hasValue||!1,
this.error=t.error,this.hasError=t.hasError||!1}
;function F(t){return void 0===t&&(t={}),new I(t)}
var C=function(){function t(){
this._lockPromise=null}
return t.prototype.lock=function(t){
return n(this,void 0,void 0,function(){
var e,n,o=this;return r(this,function(r){
switch(r.label){case 0:
return this._lockPromise?[4,this._lockPromise]:[3,2]
;case 1:r.sent(),r.label=2;case 2:
return i(e=t())&&(n=e.then(function(){
o._lockPromise===n&&(o._lockPromise=null)
},function(){
o._lockPromise===n&&(o._lockPromise=null)
}),this._lockPromise=n),[2,e]}})})},t
}(),U=function(){}
;var q="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{}
;function L(t){var e=new Promise(function(t){
setImmediate(t)}),n=i(t)?t:t?x(t):null
;return n?Promise.race([e,n]):e}(function(t){
if(!t.setImmediate){
var e,n,r,o,i,u=1,s={},a=!1,l=t.document,c=Object.getPrototypeOf&&Object.getPrototypeOf(t)
;c=c&&c.setTimeout?c:t,
"[object process]"==={}.toString.call(t.process)?e=function(t){
process.nextTick(function(){h(t)})}:!function(){
if(t.postMessage&&!t.importScripts){
var e=!0,n=t.onmessage
;return t.onmessage=function(){e=!1
},t.postMessage("","*"),t.onmessage=n,e}
}()?t.MessageChannel?((r=new MessageChannel).port1.onmessage=function(t){
h(t.data)},e=function(t){r.port2.postMessage(t)
}):l&&"onreadystatechange"in l.createElement("script")?(n=l.documentElement,
e=function(t){var e=l.createElement("script")
;e.onreadystatechange=function(){
h(t),e.onreadystatechange=null,n.removeChild(e),
e=null},n.appendChild(e)}):e=function(t){
setTimeout(h,0,t)
}:(o="setImmediate$"+Math.random()+"$",i=function(e){
e.source===t&&"string"==typeof e.data&&0===e.data.indexOf(o)&&h(+e.data.slice(o.length))
},
t.addEventListener?t.addEventListener("message",i,!1):t.attachEvent("onmessage",i),
e=function(e){t.postMessage(o+e,"*")
}),c.setImmediate=function(t){
"function"!=typeof t&&(t=new Function(""+t))
;for(var n=new Array(arguments.length-1),r=0;r<n.length;r++)n[r]=arguments[r+1]
;var o={callback:t,args:n};return s[u]=o,e(u),u++
},c.clearImmediate=f}function f(t){delete s[t]}
function h(t){if(a)setTimeout(h,0,t);else{
var e=s[t];if(e){a=!0;try{!function(t){
var e=t.callback,n=t.args;switch(n.length){case 0:
e();break;case 1:e(n[0]);break;case 2:e(n[0],n[1])
;break;case 3:e(n[0],n[1],n[2]);break;default:
e.apply(void 0,n)}}(e)}finally{f(t),a=!1}}}}
})("undefined"==typeof self?q:self),
t.CustomPromise=_,t.EMPTY_FUNC=U,t.Locker=C,
t.ValueState=I,t.abortSignalToPromise=x,
t.asyncToValueState=function(t,e){
return n(this,void 0,void 0,function(){
var n,o,u,s,a;return r(this,function(r){
switch(r.label){case 0:
n="function"==typeof e?e:function(t){e=t(e)
},r.label=1;case 1:
return r.trys.push([1,5,,6]),n(function(t){
return(o=t||F()).loading=!0,o
}),i(u="function"==typeof t?t():t)?[4,u]:[3,3]
;case 2:return s=r.sent(),[3,4];case 3:
s=u,r.label=4;case 4:
return n(s instanceof I?function(t){
return(o=t||F()).value=s.value,o.hasValue=s.hasValue,
o.error=s.error,o.hasError=s.hasError,
o.loading=s.loading,o}:function(t){
return(o=t||F()).value=s,o.hasValue=!0,o.error=null,
o.hasError=!1,o.loading=!1,o}),[3,6];case 5:
return a=r.sent(),n(function(t){
return(o=t||F()).error=a,o.hasError=!0,o.loading=!1,
o}),[3,6];case 6:return[2,o]}})})
},t.combineAbortSignals=T,t.createValueState=F,
t.delay=j,t.fixAsyncStackTrace=function(t){var e
;return n(this,void 0,void 0,function(){var n,o
;return r(this,function(r){switch(r.label){case 0:
n=new Error,r.label=1;case 1:
return r.trys.push([1,3,,4]),[4,t()];case 2:
return[2,r.sent()];case 3:
throw(o=r.sent())instanceof Error&&(o.stack=(o.stack?o.stack+"\n":"")+(null===(e=n.stack)||void 0===e?void 0:e.substring(n.stack.indexOf("\n")))),
o;case 4:return[2]}})})
},t.funcToAbortable=function(t,e){
return n(this,void 0,void 0,function(){
function n(t){o.reject(t)}var o,i
;return r(this,function(r){switch(r.label){case 0:
if(!t)return[2,e()]
;if(t.aborted)return[2,w(t.reason)]
;o=new _,i=t.subscribe(n),r.label=1;case 1:
return r.trys.push([1,,3,4]),[4,e(o.promise)]
;case 2:return[2,r.sent()];case 3:return i(),[7]
;case 4:return[2]}})})
},t.isPromiseLike=i,t.promiseAll=l,t.promiseAllSettled=c,t.promiseAny=f,
t.promiseFinally=A,
t.promiseRace=h,t.promiseRejected=w,t.promiseToAbortSignal=O,
t.promiseToAbortable=function(t,e){
return t?new Promise(function(n){var r,o
;t&&t.aborted?m(n,t.reason):(e.then(function(t){
r&&r(),n(t)}).catch(i),t&&(r=t.subscribe(i)))
;function i(t){o||(o=!0,r&&r(),m(n,t))}}):e
},t.rejectAsResolve=m,t.resolveValueStatesFunc=function(t,e){
var n=function(t){for(var e=F({value:[],
hasValue:!0}),n=0;n<t.length;n++){var r=t[n]
;r instanceof I?(e.hasValue&&(e.hasValue=r.hasValue),
e.loading||(e.loading=r.loading),
e.hasError||(e.hasError=r.hasError),e.error||(e.error=r.error),
e.value[n]=r.value):(e.value[n]=void 0,
e.hasValue=!1)}return e}(t);if(n.hasValue)try{
n.value=e.apply(void 0,n.value)}catch(t){
n.value=void 0,n.hasValue=!1,n.error=t,
n.hasError=!0}else n.value=void 0;return n
},t.runWithFinally=V,t.toFuncWithAbortSignal=function(t,e,n){
return t&&e?M(n,t.subscribe(e)):n
},t.toFuncWithFinally=M,t.toThrottled=function(t){
var o=t.throttleTimeDefault,i=t.throttleTimeMax,u=t.func,s=t.skipFirst,a=t.abortSignal,l=t.timeController
;null==l&&(l=e)
;var c=null,f=null,h=null,v=null,d=!0,b=null,p=null,y=null,m=null
;function w(){var t=l.now(),e=t+b
;null==v&&(v=t),null!=p&&(e=Math.min(e,v+p)),h=e,
null!=f&&h<=f&&(c.abort(),c=null,f=null)}
function g(t,e){!function(t,e){
var n,r=null!==(n=null!=t?t:o)&&void 0!==n?n:0
;b=null==b?r:Math.min(b,r),p=null==e?null!=i?i:null:!1===e?null:e
}(t,e),w()}var _=null;function k(t){
return n(this,void 0,void 0,function(){var e,n,o
;return r(this,function(r){switch(r.label){case 0:
r.trys.push([0,,11,12]),r.label=1;case 1:r.label=2
;case 2:
return null==t||t.throwIfAborted(),e=l.now(),f=function(t){
if(null==b)return null
;var e=null!=h?h:0,n=null==p?null:null==v?t+p:t+Math.max(0,p-(t-v))
;return null!=n&&(e=Math.min(e,n)),e
}(e),null==f||f<=l.now()?[3,4]:(c=new S,n=T(c.signal,t),
[4,j(f-e,n,l).catch(U)]);case 3:
return r.sent(),[3,2];case 4:
if(null==f)return[3,10]
;if(f=null,b=null,h=null,d&&(d=!1,s))return v=l.now(),w(),
[3,1];r.label=5;case 5:
return r.trys.push([5,7,8,9]),[4,u(y,{
abortSignal:t})];case 6:return m=r.sent(),[3,9]
;case 7:
throw o=r.sent(),void 0===E&&console.error("[toThrottled]",o),o
;case 8:return v=l.now(),w(),[7];case 9:
return[3,1];case 10:return[3,12];case 11:
return _=null,[7];case 12:return[2,m]}})})}
function E(t){return _||(_=k(t)),_}
return function(t,e){
return n(this,void 0,void 0,function(){var n,o,u
;return r(this,function(r){
return o=(n=null!=e?e:{}).throttleTime,u=n.throttleTimeMax,
!1===t||!1===o?(b=null,
p=null!=i?i:null,[2,null!=_?_:m]):(null!=t&&(y=t),g(o,u),
[2,E(a)])})})}},t.toValueState=function(t){
return F({value:t,hasValue:!0})
},t.toValueStateError=function(t){return F({
error:t,hasError:!0})
},t.useAbortController=function(t){var e=new S
;return V(null,function(){return t(e.signal)
},function(){e.abort()})
},t.waitMicrotasks=L,t.waitTimeControllerMock=function(t,e,o){
return n(this,void 0,void 0,function(){
var n,u,s,a,l,c;return r(this,function(r){
switch(r.label){case 0:
i(e)?u=O(n=e):(n=null,u=e),s=null==(null==o?void 0:o.timeout)?null:t.now()+o.timeout,
r.label=1;case 1:
if(null==(null==o?void 0:o.awaitsPerIteration))return[3,6]
;a=0,l=o.awaitsPerIteration,r.label=2;case 2:
return a<l?[4,Promise.resolve().then(U)]:[3,5]
;case 3:
if(r.sent(),null==u?void 0:u.aborted)return[3,5]
;r.label=4;case 4:return a++,[3,2];case 5:
return[3,8];case 6:return[4,L(u)];case 7:
r.sent(),r.label=8;case 8:
return(null==u?void 0:u.aborted)||null!=s&&t.now()>=s?[3,9]:null!=(c=t.nextQueuedTime)||n?((null==c||null!=s&&c>s)&&(c=s),
null!=c&&t.setTime(c),[3,1]):[3,9];case 9:
return[2,null!=n?n:void 0]}})})
},Object.defineProperty(t,"__esModule",{value:!0})
}({});

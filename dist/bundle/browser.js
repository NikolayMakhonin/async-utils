!function(e){"use strict";const t=new class{
constructor(){this._nowUnique=0}now(){
return Math.max(this._nowUnique,Date.now())}
nowUnique(){const e=this.now()+1
;return this._nowUnique=e,e}setTimeout(e,t){
return setTimeout(e,t)}clearTimeout(e){
clearTimeout(e)}};function n(e,t,n,r){
return new(n||(n=Promise))(function(o,i){
function u(e){try{a(r.next(e))}catch(e){i(e)}}
function s(e){try{a(r.throw(e))}catch(e){i(e)}}
function a(e){var t
;e.done?o(e.value):(t=e.value,t instanceof n?t:new n(function(e){
e(t)})).then(u,s)}a((r=r.apply(e,t||[])).next())})
}function r(e,t){var n,r,o,i={label:0,
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
s=t.call(e,i)}catch(e){s=[6,e],r=0}finally{n=o=0}
if(5&s[0])throw s[1];return{
value:s[0]?s[1]:void 0,done:!0}}([s,a])}}}
function o(e,t){
var n="function"==typeof Symbol&&e[Symbol.iterator]
;if(!n)return e;var r,o,i=n.call(e),u=[];try{
for(;(void 0===t||t-- >0)&&!(r=i.next()).done;)u.push(r.value)
}catch(e){o={error:e}}finally{try{
r&&!r.done&&(n=i.return)&&n.call(i)}finally{
if(o)throw o.error}}return u}function i(e){
return null!=e&&"object"==typeof e&&"function"==typeof e.then
}
"function"==typeof SuppressedError&&SuppressedError
;var u,s=[];function a(e){
s.push(e),u||(u=function(){
return n(this,void 0,void 0,function(){var e
;return r(this,function(t){switch(t.label){case 0:
return s.length>0?[4,0]:[3,2];case 1:
return t.sent(),e=s,s=[],e.forEach(function(e){
try{e()}catch(e){
console.error("Unhandled promise rejection",e)}
}),[3,0];case 2:return u=null,[2]}})})}())}
function l(e,t){var n,r;t||(t=Promise)
;var o=new t(function(e,t){n=e,r=t
}),u=e.length,s=[];return e.forEach(function(e,t){
i(e)?e.then(function(e){s[t]=e,0===--u&&n(s)
},r):(s[t]=e,0===--u&&n(s))}),o}function c(e,t){
var n;t||(t=Promise);var r=new t(function(e,t){n=e
}),o=e.length,u=[];return e.forEach(function(e,t){
i(e)?e.then(function(e){u[t]={status:"fulfilled",
value:e},0===--o&&n(u)},function(e){u[t]={
status:"rejected",reason:e},0===--o&&n(u)
}):(u[t]={status:"fulfilled",value:e
},0===--o&&n(u))}),r}function f(e,t){var n,r
;t||(t=Promise);var o=new t(function(e,t){n=e,r=t
}),u=e.length,s=[];return e.forEach(function(e,t){
i(e)?e.then(n,function(e){
s[t]=e,0===--u&&r(new AggregateError(s))}):n(e)
}),o}function h(e,t){var n,r;t||(t=Promise)
;var o=new t(function(e,t){n=e,r=t})
;return e.forEach(function(e){
i(e)?e.then(n,r):n(e)}),o}function v(e,t,n){
a(function(){try{var r=t?t(e):e;n._resolve(r)
}catch(e){n._reject(e)}})}function d(e,t,n){
a(function(){if(t)try{var r=t(e);n._resolve(r)
}catch(e){n._reject(e)}else n._reject(e)})}
var b=function(){},p=function(){function e(e){
this.status="pending",this.value=void 0,
this.reason=void 0,this._handlers=null
;var t=this._resolve,n=this._reject,r=this._resolveAsync,o=this._rejectAsync,i=this
;this._resolve=function(e){t.call(i,e)
},this._reject=function(e){n.call(i,e)
},this._resolveAsync=function(e){r.call(i,e)
},this._rejectAsync=function(e){o.call(i,e)
},e(this._resolve,this._reject)}
return e.prototype._resolve=function(e){
"pending"===this.status&&(this.status="fulfilled",
this._resolveAsync(e))
},e.prototype._resolveAsync=function(e){
i(e)?e.then(this._resolveAsync,this._rejectAsync):this._resolveSync(e)
},e.prototype._resolveSync=function(e){
var t=this._handlers;if(this.value=e,null!=t){
this._handlers=null
;for(var n=0,r=t.length;n<r;n++){var i=o(t[n],3)
;v(e,i[0],i[2])}}
},e.prototype._reject=function(e){
"pending"===this.status&&this._rejectAsync(e)
},e.prototype._rejectAsync=function(e){
this.status="rejected",i(e)?e.then(this._rejectAsync,this._rejectAsync):this._rejectSync(e)
},e.prototype._rejectSync=function(e){
var t=this._handlers;if(this.reason=e,null!=t){
this._handlers=null
;for(var n=0,r=t.length;n<r;n++){var i=o(t[n],3)
;d(e,i[1],i[2])}}},e.prototype.then=function(t,n){
var r=new e(b)
;return"pending"===this.status?(null==this._handlers&&(this._handlers=[]),
this._handlers.push([t,n,r])):"fulfilled"===this.status?v(this.value,t,r):d(this.reason,n,r),
r},e.prototype.catch=function(e){
return this.then(void 0,e)
},e.prototype.finally=function(t){
var n=t&&function(n){var r=t()
;return i(r)?r.then(function(){return n
}):e.resolve(n)},r=t&&function(n){var r=t()
;return i(r)?r.then(function(){return e.reject(n)
}):e.reject(n)};return this.then(n,r)
},e.resolve=function(t){var n=new e(b)
;return n._resolve(t),n},e.reject=function(t){
var n=new e(b);return n._reject(t),n
},Object.defineProperty(e.prototype,Symbol.toStringTag,{
get:function(){return"Promise"},enumerable:!1,
configurable:!0
}),Object.defineProperty(e,Symbol.species,{
get:function(){return e},enumerable:!1,
configurable:!0}),e.all=function(t){return l(t,e)
},e.allSettled=function(t){return c(t,e)
},e.any=function(t){return f(t,e)
},e.race=function(t){return h(t,e)},e}()
;function m(e){return{then:function(t,n){n(e)}}}
function y(e,t){e(m(t))}function w(e){
return Promise.resolve(m(e))}
var g=function(){},_=function(){function e(e){
var t,n,r=this
;if(this._status="pending",e&&e.aborted)this.promise=p.reject(e.reason),
this.resolve=g,
this.reject=g;else if(this.promise=new Promise(function(e){
t=e,n=function(t){y(e,t)}}),e){
var o=e.subscribe(function(e){n(e)})
;this.resolve=function(e){o(),t(e)
},this.reject=function(e){o(),n(e)}
}else this.resolve=t,this.reject=n
;this.promise.then(function(){r._status="resolved"
},function(){r._status="rejected"})}
return Object.defineProperty(e.prototype,"state",{
get:function(){return this._status},enumerable:!1,
configurable:!0}),e}();function j(e,n,r){
if(!Number.isFinite(e))throw new TypeError("milliseconds must be a finite number: "+e)
;return new Promise(function(o){
if(n&&n.aborted)y(o,n.reason);else{
var i,u=r||t,s=u.setTimeout(function(){i&&i(),o()
},e);n&&(i=n.subscribe(function(e){
u.clearTimeout(s),y(o,e)}))}})}
class k extends Error{constructor(e,t){
super(e),Object.setPrototypeOf(this,k.prototype),
this.reason=t,this.name="AbortError",
this._internal=!1}}const P=()=>{};class E{
constructor(){
this.aborted=!1,this.reason=void 0,this._callbacks=void 0
}subscribe(e){var t
;if(null===(t=this._callbacks)||void 0===t?void 0:t.has(e))throw new Error("Already subscribed: "+e)
;return this.aborted?(e.call(this,this.reason),
P):(this._callbacks||(this._callbacks=new Set),
this._callbacks.add(e),()=>{var t
;null===(t=this._callbacks)||void 0===t||t.delete(e)
})}abort(e){var t
;this.aborted=!0,this.reason=e,null===(t=this._callbacks)||void 0===t||t.forEach(e=>{
e.call(this,this.reason)}),this._callbacks=void 0}
throwIfAborted(){if(this.aborted)throw this.reason
}}class T{constructor(){this.signal=new E}
abort(e){
this.signal.aborted||(void 0===e&&((e=new k("Aborted with no reason",e))._internal=!0),
this.signal.abort(e))}}function S(){
for(var e,t,n=[],r=0;r<arguments.length;r++)n[r]=arguments[r]
;function o(t){e.abort(t)}
for(var i=0;i<n.length;i++){var u=n[i];if(u){
if(u.aborted)return u
;t?(e||(e=new T,t.subscribe(o)),u.subscribe(o)):t=u
}}return e?e.signal:t||(new T).signal}
function A(e,t){return t?e.then(function(e){
var n=t();return i(n)?n.then(function(){return e
}):e},function(e){var n=t();if(!i(n))throw e
;return n.then(function(){throw e})}):e}
function V(e,t,n){function r(e){if(!n)return t(e)
;try{var r=t(e)
;return i(r)?A(r,n):i(o=n())?o.then(function(){
return r}):r}catch(e){var o;if(!i(o=n()))throw e
;return o.then(function(){throw e})}}
var o=e?e():void 0;return i(o)?o.then(r):r(o)}
function M(e,t){return t?function(){try{
var n=e.apply(this,arguments)
;return i(n)?A(n,t):(t(),n)}catch(e){throw t(),e}
}:e}function x(e,t){
if(e)return new Promise(function(n,r){
e.subscribe(function(e){
(null==t?void 0:t.dontThrow)?n():r(e)})})}
function O(e){var t=new T
;return e.then(function(){t.abort()},function(){
t.abort()}),t.signal}var I=function(e){
void 0===e&&(e={}),this.value=e.value,this.loading=e.loading||!1,
this.hasValue=e.hasValue||!1,
this.error=e.error,this.hasError=e.hasError||!1}
;function F(e){return void 0===e&&(e={}),new I(e)}
var C=function(){function e(){
this._lockPromise=null}
return e.prototype.lock=function(e){
return n(this,void 0,void 0,function(){
var t,n,o=this;return r(this,function(r){
switch(r.label){case 0:
return this._lockPromise?[4,this._lockPromise]:[3,2]
;case 1:r.sent(),r.label=2;case 2:
return i(t=e())&&(n=t.then(function(){
o._lockPromise===n&&(o._lockPromise=null)
},function(){
o._lockPromise===n&&(o._lockPromise=null)
}),this._lockPromise=n),[2,t]}})})},e
}(),U=function(){}
;var L="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{}
;function q(e){var t=new Promise(function(e){
setImmediate(e)}),n=i(e)?e:e?x(e):null
;return n?Promise.race([t,n]):t}(function(e){
if(!e.setImmediate){
var t,n,r,o,i,u=1,s={},a=!1,l=e.document,c=Object.getPrototypeOf&&Object.getPrototypeOf(e)
;c=c&&c.setTimeout?c:e,
"[object process]"==={}.toString.call(e.process)?t=function(e){
process.nextTick(function(){h(e)})}:!function(){
if(e.postMessage&&!e.importScripts){
var t=!0,n=e.onmessage
;return e.onmessage=function(){t=!1
},e.postMessage("","*"),e.onmessage=n,t}
}()?e.MessageChannel?((r=new MessageChannel).port1.onmessage=function(e){
h(e.data)},t=function(e){r.port2.postMessage(e)
}):l&&"onreadystatechange"in l.createElement("script")?(n=l.documentElement,
t=function(e){var t=l.createElement("script")
;t.onreadystatechange=function(){
h(e),t.onreadystatechange=null,n.removeChild(t),
t=null},n.appendChild(t)}):t=function(e){
setTimeout(h,0,e)
}:(o="setImmediate$"+Math.random()+"$",i=function(t){
t.source===e&&"string"==typeof t.data&&0===t.data.indexOf(o)&&h(+t.data.slice(o.length))
},
e.addEventListener?e.addEventListener("message",i,!1):e.attachEvent("onmessage",i),
t=function(t){e.postMessage(o+t,"*")
}),c.setImmediate=function(e){
"function"!=typeof e&&(e=new Function(""+e))
;for(var n=new Array(arguments.length-1),r=0;r<n.length;r++)n[r]=arguments[r+1]
;var o={callback:e,args:n};return s[u]=o,t(u),u++
},c.clearImmediate=f}function f(e){delete s[e]}
function h(e){if(a)setTimeout(h,0,e);else{
var t=s[e];if(t){a=!0;try{!function(e){
var t=e.callback,n=e.args;switch(n.length){case 0:
t();break;case 1:t(n[0]);break;case 2:t(n[0],n[1])
;break;case 3:t(n[0],n[1],n[2]);break;default:
t.apply(void 0,n)}}(t)}finally{f(e),a=!1}}}}
})("undefined"==typeof self?L:self),
e.CustomPromise=_,e.EMPTY_FUNC=U,e.Locker=C,
e.ValueState=I,e.abortSignalToPromise=x,
e.asyncToValueState=function(e,t){
return n(this,void 0,void 0,function(){
var n,o,u,s,a;return r(this,function(r){
switch(r.label){case 0:
n="function"==typeof t?t:function(e){t=e(t)
},r.label=1;case 1:
return r.trys.push([1,5,,6]),n(function(e){
return(o=e||F()).loading=!0,o
}),i(u="function"==typeof e?e():e)?[4,u]:[3,3]
;case 2:return s=r.sent(),[3,4];case 3:
s=u,r.label=4;case 4:
return n(s instanceof I?function(e){
return(o=e||F()).value=s.value,o.hasValue=s.hasValue,
o.error=s.error,o.hasError=s.hasError,
o.loading=s.loading,o}:function(e){
return(o=e||F()).value=s,o.hasValue=!0,o.error=null,
o.hasError=!1,o.loading=!1,o}),[3,6];case 5:
return a=r.sent(),n(function(e){
return(o=e||F()).error=a,o.hasError=!0,o.loading=!1,
o}),[3,6];case 6:return[2,o]}})})
},e.combineAbortSignals=S,e.createValueState=F,
e.delay=j,e.fixAsyncStackTrace=function(e){var t
;return n(this,void 0,void 0,function(){var n,o
;return r(this,function(r){switch(r.label){case 0:
n=new Error,r.label=1;case 1:
return r.trys.push([1,3,,4]),[4,e()];case 2:
return[2,r.sent()];case 3:
throw(o=r.sent())instanceof Error&&(o.stack=(o.stack?o.stack+"\n":"")+(null===(t=n.stack)||void 0===t?void 0:t.substring(n.stack.indexOf("\n")))),
o;case 4:return[2]}})})
},e.funcToAbortable=function(e,t){
return n(this,void 0,void 0,function(){
function n(e){o.reject(e)}var o,i
;return r(this,function(r){switch(r.label){case 0:
if(!e)return[2,t()]
;if(e.aborted)return[2,w(e.reason)]
;o=new _,i=e.subscribe(n),r.label=1;case 1:
return r.trys.push([1,,3,4]),[4,t(o.promise)]
;case 2:return[2,r.sent()];case 3:return i(),[7]
;case 4:return[2]}})})
},e.isPromiseLike=i,e.promiseAll=l,e.promiseAllSettled=c,e.promiseAny=f,
e.promiseFinally=A,
e.promiseLikeToPromise=function(e){
return e instanceof Promise?e:i(e)?new Promise(function(t,n){
e.then(t,n)}):e
},e.promiseRace=h,e.promiseRejected=w,e.promiseToAbortSignal=O,e.promiseToAbortable=function(e,t){
return e?new Promise(function(n){var r,o
;e&&e.aborted?y(n,e.reason):(t.then(function(e){
r&&r(),n(e)}).catch(i),e&&(r=e.subscribe(i)))
;function i(e){o||(o=!0,r&&r(),y(n,e))}}):t
},e.rejectAsResolve=y,e.resolveValueStatesFunc=function(e,t){
var n=function(e){for(var t=F({value:[],
hasValue:!0}),n=0;n<e.length;n++){var r=e[n]
;r instanceof I?(t.hasValue&&(t.hasValue=r.hasValue),
t.loading||(t.loading=r.loading),
t.hasError||(t.hasError=r.hasError),t.error||(t.error=r.error),
t.value[n]=r.value):(t.value[n]=void 0,
t.hasValue=!1)}return t}(e);if(n.hasValue)try{
n.value=t.apply(void 0,n.value)}catch(e){
n.value=void 0,n.hasValue=!1,n.error=e,
n.hasError=!0}else n.value=void 0;return n
},e.runWithFinally=V,e.toFuncWithAbortSignal=function(e,t,n){
return e&&t?M(n,e.subscribe(t)):n
},e.toFuncWithFinally=M,e.toThrottled=function(e){
var o=e.throttleTimeDefault,i=e.throttleTimeMax,u=e.func,s=e.skipFirst,a=e.abortSignal,l=e.timeController
;null==l&&(l=t)
;var c=null,f=null,h=null,v=null,d=!0,b=null,p=null,m=null,y=null
;function w(){var e=l.now(),t=e+b
;null==v&&(v=e),null!=p&&(t=Math.min(t,v+p)),h=t,
null!=f&&h<=f&&(c.abort(),c=null,f=null)}
function g(e,t){!function(e,t){
var n,r=null!==(n=null!=e?e:o)&&void 0!==n?n:0
;b=null==b?r:Math.min(b,r),p=null==t?null!=i?i:null:!1===t?null:t
}(e,t),w()}var _=null;function k(e){
return n(this,void 0,void 0,function(){var t,n,o
;return r(this,function(r){switch(r.label){case 0:
r.trys.push([0,,11,12]),r.label=1;case 1:r.label=2
;case 2:
return null==e||e.throwIfAborted(),t=l.now(),f=function(e){
if(null==b)return null
;var t=null!=h?h:0,n=null==p?null:null==v?e+p:e+Math.max(0,p-(e-v))
;return null!=n&&(t=Math.min(t,n)),t
}(t),null==f||f<=l.now()?[3,4]:(c=new T,n=S(c.signal,e),
[4,j(f-t,n,l).catch(U)]);case 3:
return r.sent(),[3,2];case 4:
if(null==f)return[3,10]
;if(f=null,b=null,h=null,d&&(d=!1,s))return v=l.now(),w(),
[3,1];r.label=5;case 5:
return r.trys.push([5,7,8,9]),[4,u(m,{
abortSignal:e})];case 6:return y=r.sent(),[3,9]
;case 7:
throw o=r.sent(),void 0===P&&console.error("[toThrottled]",o),o
;case 8:return v=l.now(),w(),[7];case 9:
return[3,1];case 10:return[3,12];case 11:
return _=null,[7];case 12:return[2,y]}})})}
function P(e){return _||(_=k(e)),_}
return function(e,t){
return n(this,void 0,void 0,function(){var n,o,u
;return r(this,function(r){
return o=(n=null!=t?t:{}).throttleTime,u=n.throttleTimeMax,
!1===e||!1===o?(b=null,
p=null!=i?i:null,[2,null!=_?_:y]):(null!=e&&(m=e),g(o,u),
[2,P(a)])})})}},e.toValueState=function(e){
return F({value:e,hasValue:!0})
},e.toValueStateError=function(e){return F({
error:e,hasError:!0})
},e.useAbortController=function(e){var t=new T
;return V(null,function(){return e(t.signal)
},function(){t.abort()})
},e.waitMicrotasks=q,e.waitTimeControllerMock=function(e,t,o){
return n(this,void 0,void 0,function(){
var n,u,s,a,l,c;return r(this,function(r){
switch(r.label){case 0:
i(t)?u=O(n=t):(n=null,u=t),s=null==(null==o?void 0:o.timeout)?null:e.now()+o.timeout,
r.label=1;case 1:
if(null==(null==o?void 0:o.awaitsPerIteration))return[3,6]
;a=0,l=o.awaitsPerIteration,r.label=2;case 2:
return a<l?[4,Promise.resolve().then(U)]:[3,5]
;case 3:
if(r.sent(),null==u?void 0:u.aborted)return[3,5]
;r.label=4;case 4:return a++,[3,2];case 5:
return[3,8];case 6:return[4,q(u).catch(U)];case 7:
r.sent(),r.label=8;case 8:
return(null==u?void 0:u.aborted)||null!=s&&e.now()>=s?[3,9]:null!=(c=e.nextQueuedTime)||n?((null==c||null!=s&&c>s)&&(c=s),
null!=c&&e.setTime(c),[3,1]):[3,9];case 9:
return[2,null!=n?n:void 0]}})})
},Object.defineProperty(e,"__esModule",{value:!0})
}({});

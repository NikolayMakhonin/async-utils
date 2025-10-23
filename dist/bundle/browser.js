!function(t){"use strict";const e=new class{
constructor(){this._nowUnique=0}now(){
return Math.max(this._nowUnique,Date.now())}
nowUnique(){const t=this.now()+1
;return this._nowUnique=t,t}setTimeout(t,e){
return setTimeout(t,e)}clearTimeout(t){
clearTimeout(t)}};function n(t,e,n,r){
return new(n||(n=Promise))(function(o,i){
function s(t){try{a(r.next(t))}catch(t){i(t)}}
function u(t){try{a(r.throw(t))}catch(t){i(t)}}
function a(t){var e
;t.done?o(t.value):(e=t.value,e instanceof n?e:new n(function(t){
t(e)})).then(s,u)}a((r=r.apply(t,e||[])).next())})
}function r(t,e){var n,r,o,i={label:0,
sent:function(){if(1&o[0])throw o[1];return o[1]},
trys:[],ops:[]
},s=Object.create(("function"==typeof Iterator?Iterator:Object).prototype)
;return s.next=u(0),
s.throw=u(1),s.return=u(2),"function"==typeof Symbol&&(s[Symbol.iterator]=function(){
return this}),s;function u(u){return function(a){
return function(u){
if(n)throw new TypeError("Generator is already executing.")
;for(;s&&(s=0,u[0]&&(i=0)),i;)try{
if(n=1,r&&(o=2&u[0]?r.return:u[0]?r.throw||((o=r.return)&&o.call(r),
0):r.next)&&!(o=o.call(r,u[1])).done)return o
;switch(r=0,o&&(u=[2&u[0],o.value]),u[0]){case 0:
case 1:o=u;break;case 4:return i.label++,{
value:u[1],done:!1};case 5:i.label++,r=u[1],u=[0]
;continue;case 7:u=i.ops.pop(),i.trys.pop()
;continue;default:
if(!(o=i.trys,(o=o.length>0&&o[o.length-1])||6!==u[0]&&2!==u[0])){
i=0;continue}
if(3===u[0]&&(!o||u[1]>o[0]&&u[1]<o[3])){
i.label=u[1];break}if(6===u[0]&&i.label<o[1]){
i.label=o[1],o=u;break}if(o&&i.label<o[2]){
i.label=o[2],i.ops.push(u);break}
o[2]&&i.ops.pop(),i.trys.pop();continue}
u=e.call(t,i)}catch(t){u=[6,t],r=0}finally{n=o=0}
if(5&u[0])throw u[1];return{
value:u[0]?u[1]:void 0,done:!0}}([u,a])}}}
function o(t,e){
var n="function"==typeof Symbol&&t[Symbol.iterator]
;if(!n)return t;var r,o,i=n.call(t),s=[];try{
for(;(void 0===e||e-- >0)&&!(r=i.next()).done;)s.push(r.value)
}catch(t){o={error:t}}finally{try{
r&&!r.done&&(n=i.return)&&n.call(i)}finally{
if(o)throw o.error}}return s}function i(t){
return null!=t&&"object"==typeof t&&"function"==typeof t.then
}
"function"==typeof SuppressedError&&SuppressedError
;var s,u=[];function a(t){
u.push(t),s||(s=function(){
return n(this,void 0,void 0,function(){var t
;return r(this,function(e){switch(e.label){case 0:
return u.length>0?[4,0]:[3,2];case 1:
return e.sent(),t=u,u=[],t.forEach(function(t){
try{t()}catch(t){
console.error("Unhandled promise rejection",t)}
}),[3,0];case 2:return s=null,[2]}})})}())}
function c(t,e){var n,r;e||(e=Promise)
;var o=new e(function(t,e){n=t,r=e
}),s=t.length,u=[];return t.forEach(function(t,e){
i(t)?t.then(function(t){u[e]=t,0===--s&&n(u)
},r):(u[e]=t,0===--s&&n(u))}),o}function l(t,e){
var n;e||(e=Promise);var r=new e(function(t,e){n=t
}),o=t.length,s=[];return t.forEach(function(t,e){
i(t)?t.then(function(t){s[e]={status:"fulfilled",
value:t},0===--o&&n(s)},function(t){s[e]={
status:"rejected",reason:t},0===--o&&n(s)
}):(s[e]={status:"fulfilled",value:t
},0===--o&&n(s))}),r}function h(t,e){var n,r
;e||(e=Promise);var o=new e(function(t,e){n=t,r=e
}),s=t.length,u=[];return t.forEach(function(t,e){
i(t)?t.then(n,function(t){
u[e]=t,0===--s&&r(new AggregateError(u))}):n(t)
}),o}function f(t,e){var n,r;e||(e=Promise)
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
configurable:!0}),t.all=function(e){return c(e,t)
},t.allSettled=function(e){return l(e,t)
},t.any=function(e){return h(e,t)
},t.race=function(e){return f(e,t)},t}()
;function y(t){return{then:function(e,n){n(t)}}}
function _(t,e){t(y(e))}function w(t){
return Promise.resolve(y(t))}
var g=function(){},m=function(){function t(t){
var e,n,r=this
;if(this._status="pending",t&&t.aborted)this.promise=p.reject(t.reason),
this.resolve=g,
this.reject=g;else if(this.promise=new Promise(function(t){
e=t,n=function(e){_(t,e)}}),t){
var o=t.subscribe(function(t){n(t)})
;this.resolve=function(t){o(),e(t)
},this.reject=function(t){o(),n(t)}
}else this.resolve=e,this.reject=n
;this.promise.then(function(){r._status="resolved"
},function(){r._status="rejected"})}
return Object.defineProperty(t.prototype,"state",{
get:function(){return this._status},enumerable:!1,
configurable:!0}),t}();class j extends Error{
constructor(t,e){
super(t),Object.setPrototypeOf(this,j.prototype),this.reason=e,
this.name="AbortError",this._internal=!1}}
const E=()=>{};class A{constructor(){
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
}}class S{constructor(){this.signal=new A}
abort(t){
this.signal.aborted||(void 0===t&&((t=new j("Aborted with no reason",t))._internal=!0),
this.signal.abort(t))}}function k(t,e){
return e?t.then(function(t){var n=e()
;return i(n)?n.then(function(){return t}):t
},function(t){var n=e();if(!i(n))throw t
;return n.then(function(){throw t})}):t}
function V(t,e,n){function r(t){if(!n)return e(t)
;try{var r=e(t)
;return i(r)?k(r,n):i(o=n())?o.then(function(){
return r}):r}catch(t){var o;if(!i(o=n()))throw t
;return o.then(function(){throw t})}}
var o=t?t():void 0;return i(o)?o.then(r):r(o)}
function P(t,e){return e?function(){try{
var n=t.apply(this,arguments)
;return i(n)?k(n,e):(e(),n)}catch(t){throw e(),t}
}:t}var T=function(t){
void 0===t&&(t={}),this.value=t.value,this.loading=t.loading||!1,
this.hasValue=t.hasValue||!1,
this.error=t.error,this.hasError=t.hasError||!1}
;function x(t){return void 0===t&&(t={}),new T(t)}
t.CustomPromise=m,t.ValueState=T,
t.asyncToValueState=function(t,e){
return n(this,void 0,void 0,function(){
var n,o,s,u,a;return r(this,function(r){
switch(r.label){case 0:
n="function"==typeof e?e:function(t){e=t(e)
},r.label=1;case 1:
return r.trys.push([1,5,,6]),n(function(t){
return(o=t||x()).loading=!0,o
}),i(s="function"==typeof t?t():t)?[4,s]:[3,3]
;case 2:return u=r.sent(),[3,4];case 3:
u=s,r.label=4;case 4:
return n(u instanceof T?function(t){
return(o=t||x()).value=u.value,o.hasValue=u.hasValue,
o.error=u.error,o.hasError=u.hasError,
o.loading=u.loading,o}:function(t){
return(o=t||x()).value=u,o.hasValue=!0,o.error=null,
o.hasError=!1,o.loading=!1,o}),[3,6];case 5:
return a=r.sent(),n(function(t){
return(o=t||x()).error=a,o.hasError=!0,o.loading=!1,
o}),[3,6];case 6:return[2,o]}})})
},t.combineAbortSignals=function(){
for(var t,e,n=[],r=0;r<arguments.length;r++)n[r]=arguments[r]
;function o(e){t.abort(e)}
for(var i=0;i<n.length;i++){var s=n[i];if(s){
if(s.aborted)return s
;e?(t||(t=new S,e.subscribe(o)),s.subscribe(o)):e=s
}}return t?t.signal:e||(new S).signal
},t.createValueState=x,t.delay=function(t,n,r){
if(!Number.isFinite(t))throw new TypeError("milliseconds must be a finite number: "+t)
;return new Promise(function(o){
if(n&&n.aborted)_(o,n.reason);else{
var i,s=r||e,u=s.setTimeout(function(){i&&i(),o()
},t);n&&(i=n.subscribe(function(t){
s.clearTimeout(u),_(o,t)}))}})
},t.fixAsyncStackTrace=function(t){var e
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
;o=new m,i=t.subscribe(n),r.label=1;case 1:
return r.trys.push([1,,3,4]),[4,e(o.promise)]
;case 2:return[2,r.sent()];case 3:return i(),[7]
;case 4:return[2]}})})
},t.isPromiseLike=i,t.promiseAll=c,t.promiseAllSettled=l,t.promiseAny=h,
t.promiseFinally=k,
t.promiseRace=f,t.promiseRejected=w,t.promiseToAbortable=function(t,e){
return t?new Promise(function(n){var r,o
;t&&t.aborted?_(n,t.reason):(e.then(function(t){
r&&r(),n(t)}).catch(i),t&&(r=t.subscribe(i)))
;function i(t){o||(o=!0,r&&r(),_(n,t))}}):e
},t.rejectAsResolve=_,t.resolveValueStatesFunc=function(t,e){
var n=function(t){for(var e=x({value:[],
hasValue:!0}),n=0;n<t.length;n++){var r=t[n]
;r instanceof T?(e.hasValue&&(e.hasValue=r.hasValue),
e.loading||(e.loading=r.loading),
e.hasError||(e.hasError=r.hasError),e.error||(e.error=r.error),
e.value[n]=r.value):(e.value[n]=void 0,
e.hasValue=!1)}return e}(t);if(n.hasValue)try{
n.value=e.apply(void 0,n.value)}catch(t){
n.value=void 0,n.hasValue=!1,n.error=t,
n.hasError=!0}else n.value=void 0;return n
},t.runWithFinally=V,t.toFuncWithAbortSignal=function(t,e,n){
return t&&e?P(n,t.subscribe(e)):n
},t.toFuncWithFinally=P,t.toValueState=function(t){
return x({value:t,hasValue:!0})
},t.toValueStateError=function(t){return x({
error:t,hasError:!0})
},t.useAbortController=function(t){var e=new S
;return V(null,function(){return t(e.signal)
},function(){e.abort()})
},Object.defineProperty(t,"__esModule",{value:!0})
}({});

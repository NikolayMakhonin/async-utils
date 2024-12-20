!function(t){"use strict"
;const e=setTimeout,n=clearTimeout,r={
now:function(){return Date.now()},
setTimeout:"undefined"==typeof window?setTimeout:function(){
return e.apply(window,arguments)},
clearTimeout:"undefined"==typeof window?clearTimeout:function(){
return n.apply(window,arguments)}}
;function o(t,e,n,r){
return new(n||(n=Promise))((function(o,i){
function s(t){try{a(r.next(t))}catch(t){i(t)}}
function u(t){try{a(r.throw(t))}catch(t){i(t)}}
function a(t){var e
;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){
t(e)}))).then(s,u)}a((r=r.apply(t,e||[])).next())
}))}function i(t,e){var n,r,o,i,s={label:0,
sent:function(){if(1&o[0])throw o[1];return o[1]},
trys:[],ops:[]};return i={next:u(0),throw:u(1),
return:u(2)
},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){
return this}),i;function u(i){return function(u){
return function(i){
if(n)throw new TypeError("Generator is already executing.")
;for(;s;)try{
if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),
0):r.next)&&!(o=o.call(r,i[1])).done)return o
;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:
case 1:o=i;break;case 4:return s.label++,{
value:i[1],done:!1};case 5:s.label++,r=i[1],i=[0]
;continue;case 7:i=s.ops.pop(),s.trys.pop()
;continue;default:
if(!(o=s.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){
s=0;continue}
if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){
s.label=i[1];break}if(6===i[0]&&s.label<o[1]){
s.label=o[1],o=i;break}if(o&&s.label<o[2]){
s.label=o[2],s.ops.push(i);break}
o[2]&&s.ops.pop(),s.trys.pop();continue}
i=e.call(t,s)}catch(t){i=[6,t],r=0}finally{n=o=0}
if(5&i[0])throw i[1];return{
value:i[0]?i[1]:void 0,done:!0}}([i,u])}}}
function s(t,e){
var n="function"==typeof Symbol&&t[Symbol.iterator]
;if(!n)return t;var r,o,i=n.call(t),s=[];try{
for(;(void 0===e||e-- >0)&&!(r=i.next()).done;)s.push(r.value)
}catch(t){o={error:t}}finally{try{
r&&!r.done&&(n=i.return)&&n.call(i)}finally{
if(o)throw o.error}}return s}function u(t){
return null!=t&&"object"==typeof t&&"function"==typeof t.then
}var a,c=[];function l(t){
c.push(t),a||(a=function(){
return o(this,void 0,void 0,(function(){var t
;return i(this,(function(e){switch(e.label){
case 0:return c.length>0?[4,0]:[3,2];case 1:
return e.sent(),t=c,c=[],t.forEach((function(t){
try{t()}catch(t){
console.error("Unhandled promise rejection",t)}
})),[3,0];case 2:return a=null,[2]}}))}))}())}
function f(t,e){var n,r;e||(e=Promise)
;var o=new e((function(t,e){n=t,r=e
})),i=t.length,s=[]
;return t.forEach((function(t,e){
u(t)?t.then((function(t){s[e]=t,0==--i&&n(s)
}),r):(s[e]=t,0==--i&&n(s))})),o}function h(t,e){
var n;e||(e=Promise);var r=new e((function(t,e){
n=t})),o=t.length,i=[]
;return t.forEach((function(t,e){
u(t)?t.then((function(t){i[e]={status:"fulfilled",
value:t},0==--o&&n(i)}),(function(t){i[e]={
status:"rejected",reason:t},0==--o&&n(i)
})):(i[e]={status:"fulfilled",value:t
},0==--o&&n(i))})),r}function v(t,e){var n,r
;e||(e=Promise);var o=new e((function(t,e){n=t,r=e
})),i=t.length,s=[]
;return t.forEach((function(t,e){
u(t)?t.then(n,(function(t){
s[e]=t,0==--i&&r(new AggregateError(s))})):n(t)
})),o}function d(t,e){var n,r;e||(e=Promise)
;var o=new e((function(t,e){n=t,r=e}))
;return t.forEach((function(t){
u(t)?t.then(n,r):n(t)})),o}function b(t,e,n){
l((function(){try{var r=e?e(t):t;n._resolve(r)
}catch(t){n._reject(t)}}))}function p(t,e,n){
l((function(){if(e)try{var r=e(t);n._resolve(r)
}catch(t){n._reject(t)}else n._reject(t)}))}
var y=function(){},w=function(){function t(t){
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
u(t)?t.then(this._resolveAsync,this._rejectAsync):this._resolveSync(t)
},t.prototype._resolveSync=function(t){
var e=this._handlers;if(this.value=t,null!=e){
this._handlers=null
;for(var n=0,r=e.length;n<r;n++){var o=s(e[n],3)
;b(t,o[0],o[2])}}
},t.prototype._reject=function(t){
"pending"===this.status&&this._rejectAsync(t)
},t.prototype._rejectAsync=function(t){
this.status="rejected",u(t)?t.then(this._rejectAsync,this._rejectAsync):this._rejectSync(t)
},t.prototype._rejectSync=function(t){
var e=this._handlers;if(this.reason=t,null!=e){
this._handlers=null
;for(var n=0,r=e.length;n<r;n++){var o=s(e[n],3)
;p(t,o[1],o[2])}}},t.prototype.then=function(e,n){
var r=new t(y)
;return"pending"===this.status?(null==this._handlers&&(this._handlers=[]),
this._handlers.push([e,n,r])):"fulfilled"===this.status?b(this.value,e,r):p(this.reason,n,r),
r},t.prototype.catch=function(t){
return this.then(void 0,t)
},t.prototype.finally=function(e){
var n=e&&function(n){var r=e()
;return u(r)?r.then((function(){return n
})):t.resolve(n)},r=e&&function(n){var r=e()
;return u(r)?r.then((function(){return t.reject(n)
})):t.reject(n)};return this.then(n,r)
},t.resolve=function(e){var n=new t(y)
;return n._resolve(e),n},t.reject=function(e){
var n=new t(y);return n._reject(e),n
},Object.defineProperty(t.prototype,Symbol.toStringTag,{
get:function(){return"Promise"},enumerable:!1,
configurable:!0
}),Object.defineProperty(t,Symbol.species,{
get:function(){return t},enumerable:!1,
configurable:!0}),t.all=function(e){return f(e,t)
},t.allSettled=function(e){return h(e,t)
},t.any=function(e){return v(e,t)
},t.race=function(e){return d(e,t)},t}()
;function _(t){return{then:function(e,n){n(t)}}}
function m(t,e){t(_(e))}function g(t){
return Promise.resolve(_(t))}
var j=function(){},A=function(){function t(t){
var e,n,r=this
;if(this._status="pending",t&&t.aborted)this.promise=w.reject(t.reason),
this.resolve=j,
this.reject=j;else if(this.promise=new Promise((function(t){
e=t,n=function(e){m(t,e)}})),t){
var o=t.subscribe((function(t){n(t)}))
;this.resolve=function(t){o(),e(t)
},this.reject=function(t){o(),n(t)}
}else this.resolve=e,this.reject=n
;this.promise.then((function(){
r._status="resolved"}),(function(){
r._status="rejected"}))}
return Object.defineProperty(t.prototype,"state",{
get:function(){return this._status},enumerable:!1,
configurable:!0}),t}();class E extends Error{
constructor(t,e){
super(t),Object.setPrototypeOf(this,E.prototype),this.reason=e,
this.name="AbortError",this._internal=!1}}
const S=()=>{};class k{constructor(){
this.aborted=!1,this.reason=void 0,this._callbacks=void 0
}subscribe(t){var e
;if(null===(e=this._callbacks)||void 0===e?void 0:e.has(t))throw new Error("Already subscribed: "+t)
;return this.aborted?(t.call(this,this.reason),
S):(this._callbacks||(this._callbacks=new Set),
this._callbacks.add(t),()=>{var e
;null===(e=this._callbacks)||void 0===e||e.delete(t)
})}abort(t){var e
;this.aborted=!0,this.reason=t,null===(e=this._callbacks)||void 0===e||e.forEach((t=>{
t.call(this,this.reason)})),this._callbacks=void 0
}throwIfAborted(){
if(this.aborted)throw this.reason}}class V{
constructor(){this.signal=new k}abort(t){
this.signal.aborted||(void 0===t&&((t=new E("Aborted with no reason",t))._internal=!0),
this.signal.abort(t))}}function P(t,e){
return e?t.then((function(t){var n=e()
;return u(n)?n.then((function(){return t})):t
}),(function(t){var n=e();if(!u(n))throw t
;return n.then((function(){throw t}))})):t}
function T(t,e,n){function r(t){if(!n)return e(t)
;try{var r=e(t)
;return u(r)?P(r,n):u(o=n())?o.then((function(){
return r})):r}catch(t){var o;if(!u(o=n()))throw t
;return o.then((function(){throw t}))}}
var o=t?t():void 0;return u(o)?o.then(r):r(o)}
function x(t,e){return e?function(){try{
var n=t.apply(this,arguments)
;return u(n)?P(n,e):(e(),n)}catch(t){throw e(),t}
}:t}var F=function(t){
void 0===t&&(t={}),this.value=t.value,this.loading=t.loading||!1,
this.hasValue=t.hasValue||!1,
this.error=t.error,this.hasError=t.hasError||!1}
;function O(t){return void 0===t&&(t={}),new F(t)}
t.CustomPromise=A,t.ValueState=F,
t.asyncToValueState=function(t,e){
return o(this,void 0,void 0,(function(){
var n,r,o,s,a;return i(this,(function(i){
switch(i.label){case 0:
n="function"==typeof e?e:function(t){e=t(e)
},i.label=1;case 1:
return i.trys.push([1,5,,6]),n((function(t){
return(r=t||O()).loading=!0,r
})),u(o="function"==typeof t?t():t)?[4,o]:[3,3]
;case 2:return s=i.sent(),[3,4];case 3:
s=o,i.label=4;case 4:
return n(s instanceof F?function(t){
return(r=t||O()).value=s.value,r.hasValue=s.hasValue,
r.error=s.error,r.hasError=s.hasError,
r.loading=s.loading,r}:function(t){
return(r=t||O()).value=s,r.hasValue=!0,r.error=null,
r.hasError=!1,r.loading=!1,r}),[3,6];case 5:
return a=i.sent(),console.error(a),n((function(t){
return(r=t||O()).error=a,r.hasError=!0,
r.loading=!1,r})),[3,6];case 6:return[2,r]}}))}))
},t.combineAbortSignals=function(){
for(var t,e,n=[],r=0;r<arguments.length;r++)n[r]=arguments[r]
;function o(e){t.abort(e)}
for(var i=0;i<n.length;i++){var s=n[i];if(s){
if(s.aborted)return s
;e?(t||(t=new V,e.subscribe(o)),s.subscribe(o)):e=s
}}return t?t.signal:e||(new V).signal
},t.createValueState=O,t.delay=function(t,e,n){
if(!Number.isFinite(t))throw new TypeError("milliseconds must be a finite number: "+t)
;return new Promise((function(o){
if(e&&e.aborted)m(o,e.reason);else{
var i,s=n||r,u=s.setTimeout((function(){i&&i(),o()
}),t);e&&(i=e.subscribe((function(t){
s.clearTimeout(u),m(o,t)})))}}))
},t.fixAsyncStackTrace=function(t){var e
;return o(this,void 0,void 0,(function(){var n,r
;return i(this,(function(o){switch(o.label){
case 0:n=new Error,o.label=1;case 1:
return o.trys.push([1,3,,4]),[4,t()];case 2:
return[2,o.sent()];case 3:
throw(r=o.sent())instanceof Error&&(r.stack=(r.stack?r.stack+"\n":"")+(null===(e=n.stack)||void 0===e?void 0:e.substring(n.stack.indexOf("\n")))),
r;case 4:return[2]}}))}))
},t.funcToAbortable=function(t,e){
return o(this,void 0,void 0,(function(){
function n(t){r.reject(t)}var r,o
;return i(this,(function(i){switch(i.label){
case 0:if(!t)return[2,e()]
;if(t.aborted)return[2,g(t.reason)]
;r=new A,o=t.subscribe(n),i.label=1;case 1:
return i.trys.push([1,,3,4]),[4,e(r.promise)]
;case 2:return[2,i.sent()];case 3:return o(),[7]
;case 4:return[2]}}))}))
},t.isPromiseLike=u,t.promiseAll=f,t.promiseAllSettled=h,
t.promiseAny=v,t.promiseFinally=P,
t.promiseRace=d,t.promiseRejected=g,t.promiseToAbortable=function(t,e){
return t?new Promise((function(n){var r,o
;t&&t.aborted?m(n,t.reason):(e.then((function(t){
r&&r(),n(t)})).catch(i),t&&(r=t.subscribe(i)))
;function i(t){o||(o=!0,r&&r(),m(n,t))}})):e
},t.rejectAsResolve=m,t.resolveValueStatesFunc=function(t,e){
var n=function(t){for(var e=O({value:[],
hasValue:!0}),n=0;n<t.length;n++){var r=t[n]
;r instanceof F?(e.hasValue&&(e.hasValue=r.hasValue),
e.loading||(e.loading=r.loading),
e.hasError||(e.hasError=r.hasError),e.error||(e.error=r.error),
e.value[n]=r.value):(e.value[n]=void 0,
e.hasValue=!1)}return e}(t);if(n.hasValue)try{
n.value=e.apply(void 0,n.value)}catch(t){
console.error(t),n.value=void 0,n.hasValue=!1,
n.error=t,n.hasError=!0}else n.value=void 0
;return n
},t.runWithFinally=T,t.toFuncWithAbortSignal=function(t,e,n){
return t&&e?x(n,t.subscribe(e)):n
},t.toFuncWithFinally=x,t.toValueState=function(t){
return O({value:t,hasValue:!0})
},t.toValueStateError=function(t){return O({
error:t,hasError:!0})
},t.useAbortController=function(t){var e=new V
;return T(null,(function(){return t(e.signal)
}),(function(){e.abort()}))
},Object.defineProperty(t,"__esModule",{value:!0})
}({});

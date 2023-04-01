!function(t){"use strict"
;const e=setTimeout,r=clearTimeout,n={
now:function(){return Date.now()},
setTimeout:"undefined"==typeof window?setTimeout:function(){
return e.apply(window,arguments)},
clearTimeout:"undefined"==typeof window?clearTimeout:function(){
return r.apply(window,arguments)}}
;function o(t,e,r,n){
return new(r||(r=Promise))((function(o,i){
function s(t){try{u(n.next(t))}catch(t){i(t)}}
function a(t){try{u(n.throw(t))}catch(t){i(t)}}
function u(t){var e
;t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){
t(e)}))).then(s,a)}u((n=n.apply(t,e||[])).next())
}))}function i(t,e){var r,n,o,i,s={label:0,
sent:function(){if(1&o[0])throw o[1];return o[1]},
trys:[],ops:[]};return i={next:a(0),throw:a(1),
return:a(2)
},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){
return this}),i;function a(i){return function(a){
return function(i){
if(r)throw new TypeError("Generator is already executing.")
;for(;s;)try{
if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),
0):n.next)&&!(o=o.call(n,i[1])).done)return o
;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:
case 1:o=i;break;case 4:return s.label++,{
value:i[1],done:!1};case 5:s.label++,n=i[1],i=[0]
;continue;case 7:i=s.ops.pop(),s.trys.pop()
;continue;default:
if(!(o=s.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){
s=0;continue}
if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){
s.label=i[1];break}if(6===i[0]&&s.label<o[1]){
s.label=o[1],o=i;break}if(o&&s.label<o[2]){
s.label=o[2],s.ops.push(i);break}
o[2]&&s.ops.pop(),s.trys.pop();continue}
i=e.call(t,s)}catch(t){i=[6,t],n=0}finally{r=o=0}
if(5&i[0])throw i[1];return{
value:i[0]?i[1]:void 0,done:!0}}([i,a])}}}
function s(t,e){
var r="function"==typeof Symbol&&t[Symbol.iterator]
;if(!r)return t;var n,o,i=r.call(t),s=[];try{
for(;(void 0===e||e-- >0)&&!(n=i.next()).done;)s.push(n.value)
}catch(t){o={error:t}}finally{try{
n&&!n.done&&(r=i.return)&&r.call(i)}finally{
if(o)throw o.error}}return s}function a(t){
return null!=t&&"object"==typeof t&&"function"==typeof t.then
}function u(t,e,r){try{var n=e?e(t):t
;r._resolve(n)}catch(t){r._reject(t)}}
function c(t,e,r){e||r._reject(t);try{var n=e(t)
;r._resolve(n)}catch(t){r._reject(t)}}
var l=function(){},h=function(){function t(t){
this.status="pending",this.value=void 0,
this.reason=void 0,this._handlers=null
;var e=this._resolve,r=this._reject,n=this._resolveAsync,o=this._rejectAsync,i=this
;this._resolve=function(t){e.call(i,t)
},this._reject=function(t){r.call(i,t)
},this._resolveAsync=function(t){n.call(i,t)
},this._rejectAsync=function(t){o.call(i,t)
},t(this._resolve,this._reject)}
return t.prototype._resolve=function(t){
"pending"===this.status&&(this.status="fulfilled",
this._resolveAsync(t))
},t.prototype._resolveAsync=function(t){
a(t)?t.then(this._resolveAsync,this._rejectAsync):this._resolveSync(t)
},t.prototype._resolveSync=function(t){
var e=this._handlers;if(this.value=t,null!=e){
this._handlers=null
;for(var r=0,n=e.length;r<n;r++){var o=s(e[r],3)
;u(t,o[0],o[2])}}
},t.prototype._reject=function(t){
"pending"===this.status&&this._rejectAsync(t)
},t.prototype._rejectAsync=function(t){
this.status="rejected",a(t)?t.then(this._rejectAsync,this._rejectAsync):this._rejectSync(t)
},t.prototype._rejectSync=function(t){
var e=this._handlers;if(this.reason=t,null!=e){
this._handlers=null
;for(var r=0,n=e.length;r<n;r++){var o=s(e[r],3)
;c(t,o[1],o[2])}}},t.prototype.then=function(e,r){
var n=new t(l)
;return"pending"===this.status?(null==this._handlers&&(this._handlers=[]),
this._handlers.push([e,r,n])):"fulfilled"===this.status?u(this.value,e,n):c(this.reason,r,n),
n},t.prototype.catch=function(t){
return this.then(void 0,t)
},t.prototype.finally=function(t){
var e=t&&function(e){return t(),e
},r=t&&function(e){throw t(),e}
;return this.then(e,r)},t.resolve=function(e){
var r=new t(l);return r._resolve(e),r
},t.reject=function(e){var r=new t(l)
;return r._reject(e),r
},Object.defineProperty(t.prototype,Symbol.toStringTag,{
get:function(){return"Promise"},enumerable:!1,
configurable:!0}),t}();function f(t){return{
then:function(e,r){r(t)}}}function v(t,e){t(f(e))}
function d(t){return Promise.resolve(f(t))}
var b=function(){},y=function(){function t(t){
var e,r,n=this
;if(this._status="pending",t&&t.aborted)this.promise=h.reject(t.reason),
this.resolve=b,
this.reject=b;else if(this.promise=new Promise((function(t){
e=t,r=function(e){v(t,e)}})),t){
var o=t.subscribe((function(t){r(t)}))
;this.resolve=function(t){o(),e(t)
},this.reject=function(t){o(),r(t)}
}else this.resolve=e,this.reject=r
;this.promise.then((function(){
n._status="resolved"}),(function(){
n._status="rejected"}))}
return Object.defineProperty(t.prototype,"state",{
get:function(){return this._status},enumerable:!1,
configurable:!0}),t}();class p extends Error{
constructor(t,e){
super(t),Object.setPrototypeOf(this,p.prototype),this.reason=e,
this.name="AbortError",this._internal=!1}}
const _=()=>{};class w{constructor(){
this.aborted=!1,this.reason=void 0,this._callbacks=void 0
}subscribe(t){var e
;if(null===(e=this._callbacks)||void 0===e?void 0:e.has(t))throw new Error("Already subscribed: "+t)
;return this.aborted?(t.call(this,this.reason),
_):(this._callbacks||(this._callbacks=new Set),
this._callbacks.add(t),()=>{var e
;null===(e=this._callbacks)||void 0===e||e.delete(t)
})}abort(t){var e
;this.aborted=!0,this.reason=t,null===(e=this._callbacks)||void 0===e||e.forEach((t=>{
t.call(this,this.reason)})),this._callbacks=void 0
}throwIfAborted(){
if(this.aborted)throw this.reason}}class g{
constructor(){this.signal=new w}abort(t){
this.signal.aborted||(void 0===t&&((t=new p("Aborted with no reason",t))._internal=!0),
this.signal.abort(t))}}function m(t,e){
return e?t.then((function(t){return e(),t
}),(function(t){throw e(),t})):t}function j(t,e){
return e?function(){try{
var r=t.apply(this,arguments);return a(r)?m(r,e):r
}finally{e()}}:t}var A=function(t){
void 0===t&&(t={}),this.value=t.value,this.loading=t.loading||!1,
this.hasValue=t.hasValue||!1,
this.error=t.error,this.hasError=t.hasError||!1}
;function S(t){return void 0===t&&(t={}),new A(t)}
t.CustomPromise=y,t.ValueState=A,
t.asyncToValueState=function(t,e){
return o(this,void 0,void 0,(function(){var r,n,o
;return i(this,(function(i){switch(i.label){
case 0:e||(e=S()),i.label=1;case 1:
return i.trys.push([1,5,,6]),e.loading=!0,r="function"==typeof t?t():t,
n=void 0,a(r)?[4,r]:[3,3];case 2:
return n=i.sent(),[3,4];case 3:n=r,i.label=4
;case 4:
return n instanceof A?(e.value=n.value,e.hasValue=n.hasValue,e.error=n.error,
e.hasError=n.hasError,
e.loading=n.loading):(e.value=n,e.hasValue=!0,e.error=null,
e.hasError=!1,e.loading=!1),[3,6];case 5:
return o=i.sent(),console.error(o),e.error=o,
e.hasError=!0,e.loading=!1,[3,6];case 6:
return[2,e]}}))}))
},t.combineAbortSignals=function(){
for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e]
;var r=new g;function n(t){r.abort(t)}
for(var o=0;o<t.length;o++){var i=t[o];if(i){
if(i.aborted){n.call(i);break}i.subscribe(n)}}
return r.signal
},t.createValueState=S,t.delay=function(t,e,r){
return new Promise((function(o){
if(e&&e.aborted)v(o,e.reason);else{
var i,s=r||n,a=s.setTimeout((function(){i&&i(),o()
}),t);e&&(i=e.subscribe((function(t){
s.clearTimeout(a),v(o,t)})))}}))
},t.fixAsyncStackTrace=function(t){
return o(this,void 0,void 0,(function(){var e,r
;return i(this,(function(n){switch(n.label){
case 0:e=new Error,n.label=1;case 1:
return n.trys.push([1,3,,4]),[4,t()];case 2:
return[2,n.sent()];case 3:
throw(r=n.sent()).stack+="\n"+e.stack.substring(e.stack.indexOf("\n")),
r;case 4:return[2]}}))}))
},t.funcToAbortable=function(t,e){
return o(this,void 0,void 0,(function(){
function r(t){n.reject(t)}var n,o
;return i(this,(function(i){switch(i.label){
case 0:if(!t)return[2,e()]
;if(t.aborted)return[2,d(t.reason)]
;n=new y,o=t.subscribe(r),i.label=1;case 1:
return i.trys.push([1,,3,4]),[4,e(n.promise)]
;case 2:return[2,i.sent()];case 3:return o(),[7]
;case 4:return[2]}}))}))
},t.isPromiseLike=a,t.promiseFinally=m,t.promiseRejected=d,
t.promiseToAbortable=function(t,e){
return new Promise((function(r){var n,o
;t&&t.aborted?v(r,t.reason):(e.then((function(t){
n&&n(),r(t)})).catch(i),t&&(n=t.subscribe(i)))
;function i(t){o||(o=!0,n&&n(),v(r,t))}}))
},t.rejectAsResolve=v,t.resolveValueStatesFunc=function(t,e){
var r=function(t){for(var e=S({value:[],
hasValue:!0}),r=0;r<t.length;r++){var n=t[r]
;n instanceof A?(e.hasValue&&(e.hasValue=n.hasValue),
e.loading||(e.loading=n.loading),
e.hasError||(e.hasError=n.hasError),e.error||(e.error=n.error),
e.value[r]=n.value):(e.value[r]=void 0,
e.hasValue=!1)}return e}(t);if(r.hasValue)try{
r.value=e.apply(void 0,r.value)}catch(t){
console.error(t),r.value=void 0,r.hasValue=!1,
r.error=t,r.hasError=!0}else r.value=void 0
;return r
},t.toFuncWithAbortSignal=function(t,e,r){
return t&&e?j(r,t.subscribe(e)):r
},t.toFuncWithFinally=j,t.toValueState=function(t){
return S({value:t,hasValue:!0})
},t.toValueStateError=function(t){return S({
error:t,hasError:!0})
},t.useAbortController=function(t){var e=new g
;return j(t,(function(){e.abort()}))(e.signal)
},Object.defineProperty(t,"__esModule",{value:!0})
}({});

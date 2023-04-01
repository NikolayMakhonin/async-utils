!function(t){"use strict"
;const e=setTimeout,n=clearTimeout,r={
now:function(){return Date.now()},
setTimeout:"undefined"==typeof window?setTimeout:function(){
return e.apply(window,arguments)},
clearTimeout:"undefined"==typeof window?clearTimeout:function(){
return n.apply(window,arguments)}}
;function o(t,e,n,r){
return new(n||(n=Promise))((function(o,i){
function s(t){try{u(r.next(t))}catch(t){i(t)}}
function c(t){try{u(r.throw(t))}catch(t){i(t)}}
function u(t){var e
;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){
t(e)}))).then(s,c)}u((r=r.apply(t,e||[])).next())
}))}function i(t,e){var n,r,o,i,s={label:0,
sent:function(){if(1&o[0])throw o[1];return o[1]},
trys:[],ops:[]};return i={next:c(0),throw:c(1),
return:c(2)
},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){
return this}),i;function c(i){return function(c){
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
value:i[0]?i[1]:void 0,done:!0}}([i,c])}}}
function s(t,e){
var n="function"==typeof Symbol&&t[Symbol.iterator]
;if(!n)return t;var r,o,i=n.call(t),s=[];try{
for(;(void 0===e||e-- >0)&&!(r=i.next()).done;)s.push(r.value)
}catch(t){o={error:t}}finally{try{
r&&!r.done&&(n=i.return)&&n.call(i)}finally{
if(o)throw o.error}}return s}function c(t){
return null!=t&&"object"==typeof t&&"function"==typeof t.then
}function u(t,e,n){try{var r=e?e(t):t
;n._resolve(r)}catch(t){n._reject(t)}}
function a(t,e,n){e||n._reject(t);try{var r=e(t)
;n._resolve(r)}catch(t){n._reject(t)}}
var l=function(){},h=function(){function t(t){
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
c(t)?t.then(this._resolveAsync,this._rejectAsync):this._resolveSync(t)
},t.prototype._resolveSync=function(t){
var e=this._handlers;if(this.value=t,null!=e){
this._handlers=null
;for(var n=0,r=e.length;n<r;n++){var o=s(e[n],3)
;u(t,o[0],o[2])}}
},t.prototype._reject=function(t){
"pending"===this.status&&this._rejectAsync(t)
},t.prototype._rejectAsync=function(t){
this.status="rejected",c(t)?t.then(this._rejectAsync,this._rejectAsync):this._rejectSync(t)
},t.prototype._rejectSync=function(t){
var e=this._handlers;if(this.reason=t,null!=e){
this._handlers=null
;for(var n=0,r=e.length;n<r;n++){var o=s(e[n],3)
;a(t,o[1],o[2])}}},t.prototype.then=function(e,n){
var r=new t(l)
;return"pending"===this.status?(null==this._handlers&&(this._handlers=[]),
this._handlers.push([e,n,r])):"fulfilled"===this.status?u(this.value,e,r):a(this.reason,n,r),
r},t.prototype.catch=function(t){
return this.then(void 0,t)
},t.prototype.finally=function(t){
var e=t&&function(e){return t(),e
},n=t&&function(e){throw t(),e}
;return this.then(e,n)},t.resolve=function(e){
var n=new t(l);return n._resolve(e),n
},t.reject=function(e){var n=new t(l)
;return n._reject(e),n
},Object.defineProperty(t.prototype,Symbol.toStringTag,{
get:function(){return"Promise"},enumerable:!1,
configurable:!0}),t}();function f(t){return{
then:function(e,n){n(t)}}}function b(t,e){t(f(e))}
function v(t){return Promise.resolve(f(t))}
var d=function(){},p=function(){function t(t){
var e,n,r=this
;if(this._status="pending",t&&t.aborted)this.promise=h.reject(t.reason),
this.resolve=d,
this.reject=d;else if(this.promise=new Promise((function(t){
e=t,n=function(e){b(t,e)}})),t){
var o=t.subscribe((function(t){n(t)}))
;this.resolve=function(t){o(),e(t)
},this.reject=function(t){o(),n(t)}
}else this.resolve=e,this.reject=n
;this.promise.then((function(){
r._status="resolved"}),(function(){
r._status="rejected"}))}
return Object.defineProperty(t.prototype,"state",{
get:function(){return this._status},enumerable:!1,
configurable:!0}),t}();class y extends Error{
constructor(t,e){
super(t),Object.setPrototypeOf(this,y.prototype),this.reason=e,
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
if(this.aborted)throw this.reason}}class m{
constructor(){this.signal=new w}abort(t){
this.signal.aborted||(void 0===t&&((t=new y("Aborted with no reason",t))._internal=!0),
this.signal.abort(t))}}function j(t,e){
return e?t.then((function(t){return e(),t
}),(function(t){throw e(),t})):t}function g(t,e){
return e?function(){try{
var n=t.apply(this,arguments);return c(n)?j(n,e):n
}finally{e()}}:t}
t.CustomPromise=p,t.combineAbortSignals=function(){
for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e]
;var n=new m;function r(t){n.abort(t)}
for(var o=0;o<t.length;o++){var i=t[o];if(i){
if(i.aborted){r.call(i);break}i.subscribe(r)}}
return n.signal},t.delay=function(t,e,n){
return new Promise((function(o){
if(e&&e.aborted)b(o,e.reason);else{
var i,s=n||r,c=s.setTimeout((function(){i&&i(),o()
}),t);e&&(i=e.subscribe((function(t){
s.clearTimeout(c),b(o,t)})))}}))
},t.fixAsyncStackTrace=function(t){
return o(this,void 0,void 0,(function(){var e,n
;return i(this,(function(r){switch(r.label){
case 0:e=new Error,r.label=1;case 1:
return r.trys.push([1,3,,4]),[4,t()];case 2:
return[2,r.sent()];case 3:
throw(n=r.sent()).stack+="\n"+e.stack.substring(e.stack.indexOf("\n")),
n;case 4:return[2]}}))}))
},t.funcToAbortable=function(t,e){
return o(this,void 0,void 0,(function(){
function n(t){r.reject(t)}var r,o
;return i(this,(function(i){switch(i.label){
case 0:if(!t)return[2,e()]
;if(t.aborted)return[2,v(t.reason)]
;r=new p,o=t.subscribe(n),i.label=1;case 1:
return i.trys.push([1,,3,4]),[4,e(r.promise)]
;case 2:return[2,i.sent()];case 3:return o(),[7]
;case 4:return[2]}}))}))
},t.isPromiseLike=c,t.promiseFinally=j,t.promiseRejected=v,
t.promiseToAbortable=function(t,e){
return new Promise((function(n){var r,o
;t&&t.aborted?b(n,t.reason):(e.then((function(t){
r&&r(),n(t)})).catch(i),t&&(r=t.subscribe(i)))
;function i(t){o||(o=!0,r&&r(),b(n,t))}}))
},t.rejectAsResolve=b,t.toFuncWithAbortSignal=function(t,e,n){
return t&&e?g(n,t.subscribe(e)):n
},t.toFuncWithFinally=g,t.useAbortController=function(t){
var e=new m;return g(t,(function(){e.abort()
}))(e.signal)
},Object.defineProperty(t,"__esModule",{value:!0})
}({});

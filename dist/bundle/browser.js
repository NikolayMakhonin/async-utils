!function(t){"use strict"
;const e=setTimeout,r=clearTimeout,n={
now:function(){return Date.now()},
setTimeout:"undefined"==typeof window?setTimeout:function(){
return e.apply(window,arguments)},
clearTimeout:"undefined"==typeof window?clearTimeout:function(){
return r.apply(window,arguments)}}
;function o(t,e,r,n){
return new(r||(r=Promise))((function(o,i){
function s(t){try{l(n.next(t))}catch(t){i(t)}}
function a(t){try{l(n.throw(t))}catch(t){i(t)}}
function l(t){var e
;t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){
t(e)}))).then(s,a)}l((n=n.apply(t,e||[])).next())
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
}function l(t,e,r){try{var n=e?e(t):t
;r._resolve(n)}catch(t){r._reject(t)}}
function c(t,e,r){e||r._reject(t);try{var n=e(t)
;r._resolve(n)}catch(t){r._reject(t)}}
var u=function(){},h=function(){function t(t){
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
;l(t,o[0],o[2])}}
},t.prototype._reject=function(t){
"pending"===this.status&&this._rejectAsync(t)
},t.prototype._rejectAsync=function(t){
this.status="rejected",a(t)?t.then(this._rejectAsync,this._rejectAsync):this._rejectSync(t)
},t.prototype._rejectSync=function(t){
var e=this._handlers;if(this.reason=t,null!=e){
this._handlers=null
;for(var r=0,n=e.length;r<n;r++){var o=s(e[r],3)
;c(t,o[1],o[2])}}},t.prototype.then=function(e,r){
var n=new t(u)
;return"pending"===this.status?(null==this._handlers&&(this._handlers=[]),
this._handlers.push([e,r,n])):"fulfilled"===this.status?l(this.value,e,n):c(this.reason,r,n),
n},t.prototype.catch=function(t){
return this.then(void 0,t)
},t.prototype.finally=function(t){
var e=t&&function(e){return t(),e
},r=t&&function(e){throw t(),e}
;return this.then(e,r)},t.resolve=function(e){
var r=new t(u);return r._resolve(e),r
},t.reject=function(e){var r=new t(u)
;return r._reject(e),r
},Object.defineProperty(t.prototype,Symbol.toStringTag,{
get:function(){return"Promise"},enumerable:!1,
configurable:!0}),t}();function f(t){return{
then:function(e,r){r(t)}}}function b(t,e){t(f(e))}
var v=function(){},d=function(t){var e,r
;if(t&&t.aborted)this.promise=h.reject(t.reason),
this.resolve=v,this.reject=v;else if(this.promise=new Promise((function(t,n){
e=t,r=function(e){b(t,e)}})),t){
var n=t.subscribe((function(t){r(t)}))
;this.resolve=function(t){n(),e(t)
},this.reject=function(t){n(),r(t)}
}else this.resolve=e,this.reject=r},p={},_={},y={}
;Object.defineProperty(y,"__esModule",{value:!0})
;class w extends Error{constructor(t,e){
super(t),Object.setPrototypeOf(this,w.prototype),
this.reason=e,this.name="AbortError",
this._internal=!1}}
y.AbortError=w,Object.defineProperty(_,"__esModule",{
value:!0});var m=y
;_.toAbortController=function(t,e){
return t.signal.subscribe((t=>{
t instanceof m.AbortError&&t._internal&&(t=t.reason),
e.abort(t)})),e
},_.toAbortControllerFast=function(t,e){
return t.signal.addEventListener("abort",(function(){
e.abort(this.reason)})),e
},_.toAbortSignal=function(t,e){
return t.subscribe((t=>{e.abort(t)})),e.signal
},_.toAbortSignalFast=function(t,e){
return t.addEventListener("abort",(function(t){
e.abort(t)})),e.signal};var g={},A={}
;Object.defineProperty(A,"__esModule",{value:!0})
;const j=()=>{};A.AbortSignalFast=class{
constructor(){
this.aborted=!1,this.reason=void 0,this._callbacks=void 0
}subscribe(t){var e
;if(null===(e=this._callbacks)||void 0===e?void 0:e.has(t))throw new Error("Already subscribed: "+t)
;return this.aborted?(t.call(this,this.reason),
j):(this._callbacks||(this._callbacks=new Set),
this._callbacks.add(t),()=>{var e
;null===(e=this._callbacks)||void 0===e||e.delete(t)
})}abort(t){var e
;this.aborted=!0,this.reason=t,null===(e=this._callbacks)||void 0===e||e.forEach((t=>{
t.call(this,this.reason)})),this._callbacks=void 0
}throwIfAborted(){
if(this.aborted)throw this.reason}
},Object.defineProperty(g,"__esModule",{value:!0})
;var P=A,k=y;g.AbortControllerFast=class{
constructor(){this.signal=new P.AbortSignalFast}
abort(t){
this.signal.aborted||(void 0===t&&((t=new k.AbortError("Aborted with no reason",t))._internal=!0),
this.signal.abort(t))}
},Object.defineProperty(p,"__esModule",{value:!0})
;var S=_,E=g,x=y
;p.toAbortController=S.toAbortController,p.toAbortControllerFast=S.toAbortControllerFast,
p.toAbortSignal=S.toAbortSignal,
p.toAbortSignalFast=S.toAbortSignalFast
;var O=p.AbortControllerFast=E.AbortControllerFast
;function T(t,e){
return new Promise((function(r,n){var o,i
;t&&t.aborted?n(t.reason):(e.then((function(t){
o&&o(),r(t)})).catch(s),t&&(o=t.subscribe(s)))
;function s(t){i||(i=!0,o&&o(),n(t))}}))}
p.AbortError=x.AbortError;var C=function(){
function t(t){
if(this.maxSize=0,this._available=0,this._stack=[],this._tickPromise=new d,
!t)throw new Error("maxSize should be > 0")
;this.maxSize=t,this._available=t}
return Object.defineProperty(t.prototype,"size",{
get:function(){return this._stack.length},
enumerable:!1,configurable:!0
}),Object.defineProperty(t.prototype,"available",{
get:function(){return this._available},
enumerable:!1,configurable:!0
}),t.prototype.get=function(){
var t=this._available-1;if(t>=0){
if(this._available--,t>=this._stack.length)return null
;var e=this._stack[t]
;return this._stack.length=t,e}return null
},t.prototype.release=function(t){
if(this._stack.length>=this.maxSize)return!1
;if(this._stack.push(t),this._available=Math.min(this.maxSize,this._available+1),
this._tickPromise){var e=this._tickPromise
;this._tickPromise=null,e.resolve()}return!0
},t.prototype.tick=function(t){
if(!(this._available>0))return this._tickPromise||(this._tickPromise=new d),
T(t,this._tickPromise.promise)},t}()
;function F(t,e){
return o(this,void 0,void 0,(function(){
return i(this,(function(e){switch(e.label){case 0:
return t.available<=0?[4,t.tick()]:[3,2];case 1:
return e.sent(),[3,0];case 2:return[2,t.get()]}}))
}))}
t.CustomPromise=d,t.ObjectPool=C,t.combineAbortSignals=function(){
for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e]
;var r=new O;function n(t){r.abort(t)}
for(var o=0;o<t.length;o++){var i=t[o];if(i){
if(i.aborted){n.call(i);break}i.subscribe(n)}}
return r.signal},t.delay=function(t,e,r){
return new Promise((function(o,i){
if(e&&e.aborted)i(e.reason);else{
var s,a=r||n,l=a.setTimeout((function(){s&&s(),o()
}),t);e&&(s=e.subscribe((function(t){
a.clearTimeout(l),i(t)})))}}))
},t.funcToAbortable=function(t,e){
return o(this,void 0,void 0,(function(){
function r(t){n.reject(t)}var n,o
;return i(this,(function(i){switch(i.label){
case 0:if(!t)return[2,e()]
;if(t.aborted)return[2,Promise.reject(t.reason)]
;n=new d,o=t.subscribe(r),i.label=1;case 1:
return i.trys.push([1,,3,4]),[4,e(n.promise)]
;case 2:return[2,i.sent()];case 3:return o(),[7]
;case 4:return[2]}}))}))
},t.isPromiseLike=a,t.objectPoolAllocate=function(t,e,r){
for(var n=[],o=0;t.size<t.available&&(null==r||t.size+o<r);){
if(null!=t.get())throw new Error("Unexpected behavior")
;var i=e();a(i)?(o++,n.push(i.then((function(e){
t.release(e)})).catch((function(e){
throw t.release(null),e})))):t.release(i)}
if(n.length)return Promise.all(n)
},t.objectPoolUsing=function(t,e,r,n){
return o(this,void 0,void 0,(function(){var o
;return i(this,(function(i){switch(i.label){
case 0:return[4,F(t)];case 1:
return null!=(o=i.sent())?[3,3]:[4,e()];case 2:
o=i.sent(),i.label=3;case 3:
return i.trys.push([3,,5,6]),[4,r(o,n)];case 4:
return[2,i.sent()];case 5:return t.release(o),[7]
;case 6:return[2]}}))}))
},t.objectPoolWait=F,t.promiseRejected=function(t){
return Promise.resolve(f(t))
},t.promiseToAbortable=T,t.rejectAsResolve=b,t.useAbortController=function(t){
return o(this,void 0,void 0,(function(){var e
;return i(this,(function(r){switch(r.label){
case 0:e=new O,r.label=1;case 1:
return r.trys.push([1,,3,4]),[4,t(e.signal)]
;case 2:return[2,r.sent()];case 3:
return e.abort(),[7];case 4:return[2]}}))}))
},Object.defineProperty(t,"__esModule",{value:!0})
}({});

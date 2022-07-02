!function(t){"use strict"
;const e=setTimeout,r=clearTimeout,n={
now:function(){return Date.now()},
setTimeout:"undefined"==typeof window?setTimeout:function(){
return e.apply(window,arguments)},
clearTimeout:"undefined"==typeof window?clearTimeout:function(){
return r.apply(window,arguments)}}
;function o(t,e,r,n){
return new(r||(r=Promise))((function(o,i){
function s(t){try{c(n.next(t))}catch(t){i(t)}}
function a(t){try{c(n.throw(t))}catch(t){i(t)}}
function c(t){var e
;t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){
t(e)}))).then(s,a)}c((n=n.apply(t,e||[])).next())
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
}function c(t,e,r){try{var n=e?e(t):t
;r._resolve(n)}catch(t){r._reject(t)}}
function l(t,e,r){e||r._reject(t);try{var n=e(t)
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
;c(t,o[0],o[2])}}
},t.prototype._reject=function(t){
"pending"===this.status&&this._rejectAsync(t)
},t.prototype._rejectAsync=function(t){
this.status="rejected",a(t)?t.then(this._rejectAsync,this._rejectAsync):this._rejectSync(t)
},t.prototype._rejectSync=function(t){
var e=this._handlers;if(this.reason=t,null!=e){
this._handlers=null
;for(var r=0,n=e.length;r<n;r++){var o=s(e[r],3)
;l(t,o[1],o[2])}}},t.prototype.then=function(e,r){
var n=new t(u)
;return"pending"===this.status?(null==this._handlers&&(this._handlers=[]),
this._handlers.push([e,r,n])):"fulfilled"===this.status?c(this.value,e,n):l(this.reason,r,n),
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
var p=function(){},d=function(t){var e,r
;if(t&&t.aborted)this.promise=h.reject(t.reason),
this.resolve=p,this.reject=p;else if(this.promise=new Promise((function(t,n){
e=t,r=function(e){b(t,e)}})),t){
var n=t.subscribe((function(t){r(t)}))
;this.resolve=function(t){n(),e(t)
},this.reject=function(t){n(),r(t)}
}else this.resolve=e,this.reject=r},v={},_={},y={}
;Object.defineProperty(y,"__esModule",{value:!0})
;class j extends Error{constructor(t,e){
super(t),Object.setPrototypeOf(this,j.prototype),
this.reason=e,this.name="AbortError",
this._internal=!1}}
y.AbortError=j,Object.defineProperty(_,"__esModule",{
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
e.abort(t)})),e.signal};var g={},w={}
;Object.defineProperty(w,"__esModule",{value:!0})
;const A=()=>{};w.AbortSignalFast=class{
constructor(){
this.aborted=!1,this.reason=void 0,this._callbacks=void 0
}subscribe(t){var e
;if(null===(e=this._callbacks)||void 0===e?void 0:e.has(t))throw new Error("Already subscribed: "+t)
;return this.aborted?(t.call(this,this.reason),
A):(this._callbacks||(this._callbacks=new Set),
this._callbacks.add(t),()=>{var e
;null===(e=this._callbacks)||void 0===e||e.delete(t)
})}abort(t){var e
;this.aborted=!0,this.reason=t,null===(e=this._callbacks)||void 0===e||e.forEach((t=>{
t.call(this,this.reason)})),this._callbacks=void 0
}throwIfAborted(){
if(this.aborted)throw this.reason}
},Object.defineProperty(g,"__esModule",{value:!0})
;var P=w,O=y;g.AbortControllerFast=class{
constructor(){this.signal=new P.AbortSignalFast}
abort(t){
this.signal.aborted||(void 0===t&&((t=new O.AbortError("Aborted with no reason",t))._internal=!0),
this.signal.abort(t))}
},Object.defineProperty(v,"__esModule",{value:!0})
;var S=_,k=g,z=y
;v.toAbortController=S.toAbortController,v.toAbortControllerFast=S.toAbortControllerFast,
v.toAbortSignal=S.toAbortSignal,
v.toAbortSignalFast=S.toAbortSignalFast
;var x=v.AbortControllerFast=k.AbortControllerFast
;function E(t,e){
return new Promise((function(r,n){var o,i
;t&&t.aborted?n(t.reason):(e.then((function(t){
o&&o(),r(t)})).catch(s),t&&(o=t.subscribe(s)))
;function s(t){i||(i=!0,o&&o(),n(t))}}))}
v.AbortError=z.AbortError;var C=function(){
function t(t){
if(this.maxSize=0,this._size=0,this._tickPromise=new d,!t)throw new Error("maxSize should be > 0")
;this.maxSize=t,this._size=t}
return Object.defineProperty(t.prototype,"size",{
get:function(){return this._size},enumerable:!1,
configurable:!0
}),Object.defineProperty(t.prototype,"holdAvailable",{
get:function(){return this._size},enumerable:!1,
configurable:!0}),t.prototype.hold=function(t){
var e=this._size
;return t>e&&(t=e),t>0&&(this._size=e-t),t
},Object.defineProperty(t.prototype,"maxReleaseCount",{
get:function(){return this.maxSize-this._size},
enumerable:!1,configurable:!0
}),t.prototype.release=function(t){
var e=this._size,r=this.maxSize-e
;if(t>r&&(t=r),t>0&&(this._size=e+t,this._tickPromise)){
var n=this._tickPromise
;this._tickPromise=null,n.resolve()}return t
},t.prototype.tick=function(t){
return this._tickPromise||(this._tickPromise=new d),
E(t,this._tickPromise.promise)
},t.prototype.holdWait=function(t,e){
return o(this,void 0,void 0,(function(){var r,n
;return i(this,(function(o){switch(o.label){
case 0:
if(t>this.maxSize)throw new Error("holdCount (".concat(t," > maxSize (").concat(this.maxSize,"))"))
;r=0,o.label=1;case 1:
o.trys.push([1,5,,6]),o.label=2;case 2:
return(r+=this.hold(t-r))===t?[2]:[4,this.tick(e)]
;case 3:return o.sent(),[3,2];case 4:return[3,6]
;case 5:throw n=o.sent(),this.release(r),n;case 6:
return[2]}}))}))},t}(),T=function(){function t(){
this._objects=[]}
return Object.defineProperty(t.prototype,"objects",{
get:function(){return this._objects},
enumerable:!1,configurable:!0
}),Object.defineProperty(t.prototype,"size",{
get:function(){return this._objects.length},
enumerable:!1,configurable:!0
}),t.prototype.get=function(){
var t=this._objects.length-1;if(t>=0){
var e=this._objects[t]
;return this._objects.length=t,e}return null
},t.prototype.release=function(t){
if(null==t)throw new Error("object should not be null")
;this._objects.push(t)},t}(),F=function(){
function t(t){
var e=t.maxSize,r=t.pool,n=t.availableObjects,o=t.holdObjects,i=t.destroy,s=t.create
;this._pool=r||new C(e),
this._availableObjects=n||new T,this._holdObjects=!0===o?new Set:o||null,
this._create=s,this._destroy=i}
return Object.defineProperty(t.prototype,"available",{
get:function(){return this._pool.size},
enumerable:!1,configurable:!0
}),Object.defineProperty(t.prototype,"maxSize",{
get:function(){return this._pool.maxSize},
enumerable:!1,configurable:!0
}),Object.defineProperty(t.prototype,"availableObjects",{
get:function(){
return this._availableObjects.objects},
enumerable:!1,configurable:!0
}),Object.defineProperty(t.prototype,"holdObjects",{
get:function(){return this._holdObjects},
enumerable:!1,configurable:!0
}),t.prototype.get=function(){
var t=this._availableObjects.get()
;return null!=t&&this._holdObjects&&this._holdObjects.add(t),
t},t.prototype.release=function(t){
return null!=t&&this._holdObjects&&this._holdObjects.delete(t),
this._pool.maxReleaseCount>0&&(null!=t&&this._availableObjects.release(t),
this._pool.release(1),!0)
},t.prototype.tick=function(t){
return this._pool.tick()
},t.prototype.getWait=function(t){
return o(this,void 0,void 0,(function(){
return i(this,(function(e){switch(e.label){case 0:
return[4,this._pool.holdWait(1,t)];case 1:
return e.sent(),[2,this.get()]}}))}))
},t.prototype.use=function(t,e){
return o(this,void 0,void 0,(function(){var r
;return i(this,(function(n){switch(n.label){
case 0:return[4,this.getWait(e)];case 1:
return null==(r=n.sent())&&this._create?[4,this._create()]:[3,3]
;case 2:
r=n.sent(),this._holdObjects&&this._holdObjects.add(r),n.label=3
;case 3:return n.trys.push([3,,5,8]),[4,t(r,e)]
;case 4:return[2,n.sent()];case 5:
return this.release(r)||!this._destroy?[3,7]:[4,this._destroy(r)]
;case 6:n.sent(),n.label=7;case 7:return[7]
;case 8:return[2]}}))}))
},t.prototype.allocate=function(t){var e=this
;if(!this._create)throw new Error("You should specify create function in the constructor")
;var r=[],n=this._pool.size-this._availableObjects.size
;if(null!=t&&t<n&&(n=t),n<0)throw new Error("Unexpected behavior: tryHoldCount < 0")
;for(var o=this._pool.hold(n),i=0;i<o;i++){
var s=this._create()
;a(s)?r.push(s.then((function(t){e.release(t)
})).catch((function(t){throw e.release(null),t
}))):this.release(s)}
if(r.length)return Promise.all(r)},t}()
;t.CustomPromise=d,t.ObjectPool=F,t.Pool=C,
t.StackPool=T,t.combineAbortSignals=function(){
for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e]
;var r=new x;function n(t){r.abort(t)}
for(var o=0;o<t.length;o++){var i=t[o];if(i){
if(i.aborted){n.call(i);break}i.subscribe(n)}}
return r.signal},t.delay=function(t,e,r){
return new Promise((function(o,i){
if(e&&e.aborted)i(e.reason);else{
var s,a=r||n,c=a.setTimeout((function(){s&&s(),o()
}),t);e&&(s=e.subscribe((function(t){
a.clearTimeout(c),i(t)})))}}))
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
},t.isPromiseLike=a,t.promiseRejected=function(t){
return Promise.resolve(f(t))
},t.promiseToAbortable=E,t.rejectAsResolve=b,t.useAbortController=function(t){
return o(this,void 0,void 0,(function(){var e
;return i(this,(function(r){switch(r.label){
case 0:e=new x,r.label=1;case 1:
return r.trys.push([1,,3,4]),[4,t(e.signal)]
;case 2:return[2,r.sent()];case 3:
return e.abort(),[7];case 4:return[2]}}))}))
},Object.defineProperty(t,"__esModule",{value:!0})
}({});

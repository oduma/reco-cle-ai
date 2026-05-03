var aC=Object.defineProperty,lC=Object.defineProperties;var cC=Object.getOwnPropertyDescriptors;var Vh=Object.getOwnPropertySymbols;var dC=Object.prototype.hasOwnProperty,uC=Object.prototype.propertyIsEnumerable;var Bh=(t,n,e)=>n in t?aC(t,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[n]=e,D=(t,n)=>{for(var e in n||={})dC.call(n,e)&&Bh(t,e,n[e]);if(Vh)for(var e of Vh(n))uC.call(n,e)&&Bh(t,e,n[e]);return t},J=(t,n)=>lC(t,cC(n));var He=null,Os=!1,cd=1,fC=null,Ne=Symbol("SIGNAL");function O(t){let n=He;return He=t,n}function Vs(){return He}var si={version:0,lastCleanEpoch:0,dirty:!1,producers:void 0,producersTail:void 0,consumers:void 0,consumersTail:void 0,recomputing:!1,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,kind:"unknown",producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function ai(t){if(Os)throw new Error("");if(He===null)return;He.consumerOnSignalRead(t);let n=He.producersTail;if(n!==void 0&&n.producer===t)return;let e,i=He.recomputing;if(i&&(e=n!==void 0?n.nextProducer:He.producers,e!==void 0&&e.producer===t)){He.producersTail=e,e.lastReadVersion=t.version;return}let r=t.consumersTail;if(r!==void 0&&r.consumer===He&&(!i||hC(r,He)))return;let o=Ji(He),s={producer:t,consumer:He,nextProducer:e,prevConsumer:r,lastReadVersion:t.version,nextConsumer:void 0};He.producersTail=s,n!==void 0?n.nextProducer=s:He.producers=s,o&&zh(t,s)}function jh(){cd++}function Bs(t){if(!(Ji(t)&&!t.dirty)&&!(!t.dirty&&t.lastCleanEpoch===cd)){if(!t.producerMustRecompute(t)&&!Ki(t)){Ls(t);return}t.producerRecomputeValue(t),Ls(t)}}function dd(t){if(t.consumers===void 0)return;let n=Os;Os=!0;try{for(let e=t.consumers;e!==void 0;e=e.nextConsumer){let i=e.consumer;i.dirty||pC(i)}}finally{Os=n}}function ud(){return He?.consumerAllowSignalWrites!==!1}function pC(t){t.dirty=!0,dd(t),t.consumerMarkedDirty?.(t)}function Ls(t){t.dirty=!1,t.lastCleanEpoch=cd}function Dn(t){return t&&Hh(t),O(t)}function Hh(t){t.producersTail=void 0,t.recomputing=!0}function li(t,n){O(n),t&&Uh(t)}function Uh(t){t.recomputing=!1;let n=t.producersTail,e=n!==void 0?n.nextProducer:t.producers;if(e!==void 0){if(Ji(t))do e=fd(e);while(e!==void 0);n!==void 0?n.nextProducer=void 0:t.producers=void 0}}function Ki(t){for(let n=t.producers;n!==void 0;n=n.nextProducer){let e=n.producer,i=n.lastReadVersion;if(i!==e.version||(Bs(e),i!==e.version))return!0}return!1}function Cn(t){if(Ji(t)){let n=t.producers;for(;n!==void 0;)n=fd(n)}t.producers=void 0,t.producersTail=void 0,t.consumers=void 0,t.consumersTail=void 0}function zh(t,n){let e=t.consumersTail,i=Ji(t);if(e!==void 0?(n.nextConsumer=e.nextConsumer,e.nextConsumer=n):(n.nextConsumer=void 0,t.consumers=n),n.prevConsumer=e,t.consumersTail=n,!i)for(let r=t.producers;r!==void 0;r=r.nextProducer)zh(r.producer,r)}function fd(t){let n=t.producer,e=t.nextProducer,i=t.nextConsumer,r=t.prevConsumer;if(t.nextConsumer=void 0,t.prevConsumer=void 0,i!==void 0?i.prevConsumer=r:n.consumersTail=r,r!==void 0)r.nextConsumer=i;else if(n.consumers=i,!Ji(n)){let o=n.producers;for(;o!==void 0;)o=fd(o)}return e}function Ji(t){return t.consumerIsAlwaysLive||t.consumers!==void 0}function js(t){fC?.(t)}function hC(t,n){let e=n.producersTail;if(e!==void 0){let i=n.producers;do{if(i===t)return!0;if(i===e)break;i=i.nextProducer}while(i!==void 0)}return!1}function Hs(t,n){return Object.is(t,n)}function ro(t,n){let e=Object.create(mC);e.computation=t,n!==void 0&&(e.equal=n);let i=()=>{if(Bs(e),ai(e),e.value===io)throw e.error;return e.value};return i[Ne]=e,js(e),i}var Fs=Symbol("UNSET"),Ps=Symbol("COMPUTING"),io=Symbol("ERRORED"),mC=J(D({},si),{value:Fs,dirty:!0,error:null,equal:Hs,kind:"computed",producerMustRecompute(t){return t.value===Fs||t.value===Ps},producerRecomputeValue(t){if(t.value===Ps)throw new Error("");let n=t.value;t.value=Ps;let e=Dn(t),i,r=!1;try{i=t.computation(),O(null),r=n!==Fs&&n!==io&&i!==io&&t.equal(n,i)}catch(o){i=io,t.error=o}finally{li(t,e)}if(r){t.value=n;return}t.value=i,t.version++}});function gC(){throw new Error}var $h=gC;function Gh(t){$h(t)}function pd(t){$h=t}var vC=null;function hd(t,n){let e=Object.create(oo);e.value=t,n!==void 0&&(e.equal=n);let i=()=>Wh(e);return i[Ne]=e,js(e),[i,s=>er(e,s),s=>md(e,s)]}function Wh(t){return ai(t),t.value}function er(t,n){ud()||Gh(t),t.equal(t.value,n)||(t.value=n,yC(t))}function md(t,n){ud()||Gh(t),er(t,n(t.value))}var oo=J(D({},si),{equal:Hs,value:void 0,kind:"signal"});function yC(t){t.version++,jh(),dd(t),vC?.(t)}var gd=J(D({},si),{consumerIsAlwaysLive:!0,consumerAllowSignalWrites:!0,dirty:!0,kind:"effect"});function vd(t){if(t.dirty=!1,t.version>0&&!Ki(t))return;t.version++;let n=Dn(t);try{t.cleanup(),t.fn()}finally{li(t,n)}}function Z(t){return typeof t=="function"}function tr(t){let e=t(i=>{Error.call(i),i.stack=new Error().stack});return e.prototype=Object.create(Error.prototype),e.prototype.constructor=e,e}var Us=tr(t=>function(e){t(this),this.message=e?`${e.length} errors occurred during unsubscription:
${e.map((i,r)=>`${r+1}) ${i.toString()}`).join(`
  `)}`:"",this.name="UnsubscriptionError",this.errors=e});function ci(t,n){if(t){let e=t.indexOf(n);0<=e&&t.splice(e,1)}}var ye=class t{constructor(n){this.initialTeardown=n,this.closed=!1,this._parentage=null,this._finalizers=null}unsubscribe(){let n;if(!this.closed){this.closed=!0;let{_parentage:e}=this;if(e)if(this._parentage=null,Array.isArray(e))for(let o of e)o.remove(this);else e.remove(this);let{initialTeardown:i}=this;if(Z(i))try{i()}catch(o){n=o instanceof Us?o.errors:[o]}let{_finalizers:r}=this;if(r){this._finalizers=null;for(let o of r)try{qh(o)}catch(s){n=n??[],s instanceof Us?n=[...n,...s.errors]:n.push(s)}}if(n)throw new Us(n)}}add(n){var e;if(n&&n!==this)if(this.closed)qh(n);else{if(n instanceof t){if(n.closed||n._hasParent(this))return;n._addParent(this)}(this._finalizers=(e=this._finalizers)!==null&&e!==void 0?e:[]).push(n)}}_hasParent(n){let{_parentage:e}=this;return e===n||Array.isArray(e)&&e.includes(n)}_addParent(n){let{_parentage:e}=this;this._parentage=Array.isArray(e)?(e.push(n),e):e?[e,n]:n}_removeParent(n){let{_parentage:e}=this;e===n?this._parentage=null:Array.isArray(e)&&ci(e,n)}remove(n){let{_finalizers:e}=this;e&&ci(e,n),n instanceof t&&n._removeParent(this)}};ye.EMPTY=(()=>{let t=new ye;return t.closed=!0,t})();var yd=ye.EMPTY;function zs(t){return t instanceof ye||t&&"closed"in t&&Z(t.remove)&&Z(t.add)&&Z(t.unsubscribe)}function qh(t){Z(t)?t():t.unsubscribe()}var Mt={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1};var nr={setTimeout(t,n,...e){let{delegate:i}=nr;return i?.setTimeout?i.setTimeout(t,n,...e):setTimeout(t,n,...e)},clearTimeout(t){let{delegate:n}=nr;return(n?.clearTimeout||clearTimeout)(t)},delegate:void 0};function $s(t){nr.setTimeout(()=>{let{onUnhandledError:n}=Mt;if(n)n(t);else throw t})}function so(){}var Yh=_d("C",void 0,void 0);function Zh(t){return _d("E",void 0,t)}function Qh(t){return _d("N",t,void 0)}function _d(t,n,e){return{kind:t,value:n,error:e}}var di=null;function ir(t){if(Mt.useDeprecatedSynchronousErrorHandling){let n=!di;if(n&&(di={errorThrown:!1,error:null}),t(),n){let{errorThrown:e,error:i}=di;if(di=null,e)throw i}}else t()}function Xh(t){Mt.useDeprecatedSynchronousErrorHandling&&di&&(di.errorThrown=!0,di.error=t)}var ui=class extends ye{constructor(n){super(),this.isStopped=!1,n?(this.destination=n,zs(n)&&n.add(this)):this.destination=DC}static create(n,e,i){return new St(n,e,i)}next(n){this.isStopped?Dd(Qh(n),this):this._next(n)}error(n){this.isStopped?Dd(Zh(n),this):(this.isStopped=!0,this._error(n))}complete(){this.isStopped?Dd(Yh,this):(this.isStopped=!0,this._complete())}unsubscribe(){this.closed||(this.isStopped=!0,super.unsubscribe(),this.destination=null)}_next(n){this.destination.next(n)}_error(n){try{this.destination.error(n)}finally{this.unsubscribe()}}_complete(){try{this.destination.complete()}finally{this.unsubscribe()}}},_C=Function.prototype.bind;function bd(t,n){return _C.call(t,n)}var Cd=class{constructor(n){this.partialObserver=n}next(n){let{partialObserver:e}=this;if(e.next)try{e.next(n)}catch(i){Gs(i)}}error(n){let{partialObserver:e}=this;if(e.error)try{e.error(n)}catch(i){Gs(i)}else Gs(n)}complete(){let{partialObserver:n}=this;if(n.complete)try{n.complete()}catch(e){Gs(e)}}},St=class extends ui{constructor(n,e,i){super();let r;if(Z(n)||!n)r={next:n??void 0,error:e??void 0,complete:i??void 0};else{let o;this&&Mt.useDeprecatedNextContext?(o=Object.create(n),o.unsubscribe=()=>this.unsubscribe(),r={next:n.next&&bd(n.next,o),error:n.error&&bd(n.error,o),complete:n.complete&&bd(n.complete,o)}):r=n}this.destination=new Cd(r)}};function Gs(t){Mt.useDeprecatedSynchronousErrorHandling?Xh(t):$s(t)}function bC(t){throw t}function Dd(t,n){let{onStoppedNotification:e}=Mt;e&&nr.setTimeout(()=>e(t,n))}var DC={closed:!0,next:so,error:bC,complete:so};var rr=typeof Symbol=="function"&&Symbol.observable||"@@observable";function ct(t){return t}function Kh(t){return t.length===0?ct:t.length===1?t[0]:function(e){return t.reduce((i,r)=>r(i),e)}}var X=(()=>{class t{constructor(e){e&&(this._subscribe=e)}lift(e){let i=new t;return i.source=this,i.operator=e,i}subscribe(e,i,r){let o=EC(e)?e:new St(e,i,r);return ir(()=>{let{operator:s,source:a}=this;o.add(s?s.call(o,a):a?this._subscribe(o):this._trySubscribe(o))}),o}_trySubscribe(e){try{return this._subscribe(e)}catch(i){e.error(i)}}forEach(e,i){return i=Jh(i),new i((r,o)=>{let s=new St({next:a=>{try{e(a)}catch(l){o(l),s.unsubscribe()}},error:o,complete:r});this.subscribe(s)})}_subscribe(e){var i;return(i=this.source)===null||i===void 0?void 0:i.subscribe(e)}[rr](){return this}pipe(...e){return Kh(e)(this)}toPromise(e){return e=Jh(e),new e((i,r)=>{let o;this.subscribe(s=>o=s,s=>r(s),()=>i(o))})}}return t.create=n=>new t(n),t})();function Jh(t){var n;return(n=t??Mt.Promise)!==null&&n!==void 0?n:Promise}function CC(t){return t&&Z(t.next)&&Z(t.error)&&Z(t.complete)}function EC(t){return t&&t instanceof ui||CC(t)&&zs(t)}function wC(t){return Z(t?.lift)}function ee(t){return n=>{if(wC(n))return n.lift(function(e){try{return t(e,this)}catch(i){this.error(i)}});throw new TypeError("Unable to lift unknown Observable type")}}function te(t,n,e,i,r){return new Ed(t,n,e,i,r)}var Ed=class extends ui{constructor(n,e,i,r,o,s){super(n),this.onFinalize=o,this.shouldUnsubscribe=s,this._next=e?function(a){try{e(a)}catch(l){n.error(l)}}:super._next,this._error=r?function(a){try{r(a)}catch(l){n.error(l)}finally{this.unsubscribe()}}:super._error,this._complete=i?function(){try{i()}catch(a){n.error(a)}finally{this.unsubscribe()}}:super._complete}unsubscribe(){var n;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){let{closed:e}=this;super.unsubscribe(),!e&&((n=this.onFinalize)===null||n===void 0||n.call(this))}}};var em=tr(t=>function(){t(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"});var E=(()=>{class t extends X{constructor(){super(),this.closed=!1,this.currentObservers=null,this.observers=[],this.isStopped=!1,this.hasError=!1,this.thrownError=null}lift(e){let i=new Ws(this,this);return i.operator=e,i}_throwIfClosed(){if(this.closed)throw new em}next(e){ir(()=>{if(this._throwIfClosed(),!this.isStopped){this.currentObservers||(this.currentObservers=Array.from(this.observers));for(let i of this.currentObservers)i.next(e)}})}error(e){ir(()=>{if(this._throwIfClosed(),!this.isStopped){this.hasError=this.isStopped=!0,this.thrownError=e;let{observers:i}=this;for(;i.length;)i.shift().error(e)}})}complete(){ir(()=>{if(this._throwIfClosed(),!this.isStopped){this.isStopped=!0;let{observers:e}=this;for(;e.length;)e.shift().complete()}})}unsubscribe(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null}get observed(){var e;return((e=this.observers)===null||e===void 0?void 0:e.length)>0}_trySubscribe(e){return this._throwIfClosed(),super._trySubscribe(e)}_subscribe(e){return this._throwIfClosed(),this._checkFinalizedStatuses(e),this._innerSubscribe(e)}_innerSubscribe(e){let{hasError:i,isStopped:r,observers:o}=this;return i||r?yd:(this.currentObservers=null,o.push(e),new ye(()=>{this.currentObservers=null,ci(o,e)}))}_checkFinalizedStatuses(e){let{hasError:i,thrownError:r,isStopped:o}=this;i?e.error(r):o&&e.complete()}asObservable(){let e=new X;return e.source=this,e}}return t.create=(n,e)=>new Ws(n,e),t})(),Ws=class extends E{constructor(n,e){super(),this.destination=n,this.source=e}next(n){var e,i;(i=(e=this.destination)===null||e===void 0?void 0:e.next)===null||i===void 0||i.call(e,n)}error(n){var e,i;(i=(e=this.destination)===null||e===void 0?void 0:e.error)===null||i===void 0||i.call(e,n)}complete(){var n,e;(e=(n=this.destination)===null||n===void 0?void 0:n.complete)===null||e===void 0||e.call(n)}_subscribe(n){var e,i;return(i=(e=this.source)===null||e===void 0?void 0:e.subscribe(n))!==null&&i!==void 0?i:yd}};var fi=class extends E{constructor(n){super(),this._value=n}get value(){return this.getValue()}_subscribe(n){let e=super._subscribe(n);return!e.closed&&n.next(this._value),e}getValue(){let{hasError:n,thrownError:e,_value:i}=this;if(n)throw e;return this._throwIfClosed(),i}next(n){super.next(this._value=n)}};var ao={now(){return(ao.delegate||Date).now()},delegate:void 0};var En=class extends E{constructor(n=1/0,e=1/0,i=ao){super(),this._bufferSize=n,this._windowTime=e,this._timestampProvider=i,this._buffer=[],this._infiniteTimeWindow=!0,this._infiniteTimeWindow=e===1/0,this._bufferSize=Math.max(1,n),this._windowTime=Math.max(1,e)}next(n){let{isStopped:e,_buffer:i,_infiniteTimeWindow:r,_timestampProvider:o,_windowTime:s}=this;e||(i.push(n),!r&&i.push(o.now()+s)),this._trimBuffer(),super.next(n)}_subscribe(n){this._throwIfClosed(),this._trimBuffer();let e=this._innerSubscribe(n),{_infiniteTimeWindow:i,_buffer:r}=this,o=r.slice();for(let s=0;s<o.length&&!n.closed;s+=i?1:2)n.next(o[s]);return this._checkFinalizedStatuses(n),e}_trimBuffer(){let{_bufferSize:n,_timestampProvider:e,_buffer:i,_infiniteTimeWindow:r}=this,o=(r?1:2)*n;if(n<1/0&&o<i.length&&i.splice(0,i.length-o),!r){let s=e.now(),a=0;for(let l=1;l<i.length&&i[l]<=s;l+=2)a=l;a&&i.splice(0,a+1)}}};var qs=class extends ye{constructor(n,e){super()}schedule(n,e=0){return this}};var lo={setInterval(t,n,...e){let{delegate:i}=lo;return i?.setInterval?i.setInterval(t,n,...e):setInterval(t,n,...e)},clearInterval(t){let{delegate:n}=lo;return(n?.clearInterval||clearInterval)(t)},delegate:void 0};var Ys=class extends qs{constructor(n,e){super(n,e),this.scheduler=n,this.work=e,this.pending=!1}schedule(n,e=0){var i;if(this.closed)return this;this.state=n;let r=this.id,o=this.scheduler;return r!=null&&(this.id=this.recycleAsyncId(o,r,e)),this.pending=!0,this.delay=e,this.id=(i=this.id)!==null&&i!==void 0?i:this.requestAsyncId(o,this.id,e),this}requestAsyncId(n,e,i=0){return lo.setInterval(n.flush.bind(n,this),i)}recycleAsyncId(n,e,i=0){if(i!=null&&this.delay===i&&this.pending===!1)return e;e!=null&&lo.clearInterval(e)}execute(n,e){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;let i=this._execute(n,e);if(i)return i;this.pending===!1&&this.id!=null&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))}_execute(n,e){let i=!1,r;try{this.work(n)}catch(o){i=!0,r=o||new Error("Scheduled action threw falsy error")}if(i)return this.unsubscribe(),r}unsubscribe(){if(!this.closed){let{id:n,scheduler:e}=this,{actions:i}=e;this.work=this.state=this.scheduler=null,this.pending=!1,ci(i,this),n!=null&&(this.id=this.recycleAsyncId(e,n,null)),this.delay=null,super.unsubscribe()}}};var or=class t{constructor(n,e=t.now){this.schedulerActionCtor=n,this.now=e}schedule(n,e=0,i){return new this.schedulerActionCtor(this,n).schedule(i,e)}};or.now=ao.now;var Zs=class extends or{constructor(n,e=or.now){super(n,e),this.actions=[],this._active=!1}flush(n){let{actions:e}=this;if(this._active){e.push(n);return}let i;this._active=!0;do if(i=n.execute(n.state,n.delay))break;while(n=e.shift());if(this._active=!1,i){for(;n=e.shift();)n.unsubscribe();throw i}}};var co=new Zs(Ys),tm=co;var pi=new X(t=>t.complete());function Qs(t){return t&&Z(t.schedule)}function wd(t){return t[t.length-1]}function Xs(t){return Z(wd(t))?t.pop():void 0}function Yt(t){return Qs(wd(t))?t.pop():void 0}function nm(t,n){return typeof wd(t)=="number"?t.pop():n}function rm(t,n,e,i){function r(o){return o instanceof e?o:new e(function(s){s(o)})}return new(e||(e=Promise))(function(o,s){function a(d){try{c(i.next(d))}catch(f){s(f)}}function l(d){try{c(i.throw(d))}catch(f){s(f)}}function c(d){d.done?o(d.value):r(d.value).then(a,l)}c((i=i.apply(t,n||[])).next())})}function im(t){var n=typeof Symbol=="function"&&Symbol.iterator,e=n&&t[n],i=0;if(e)return e.call(t);if(t&&typeof t.length=="number")return{next:function(){return t&&i>=t.length&&(t=void 0),{value:t&&t[i++],done:!t}}};throw new TypeError(n?"Object is not iterable.":"Symbol.iterator is not defined.")}function hi(t){return this instanceof hi?(this.v=t,this):new hi(t)}function om(t,n,e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var i=e.apply(t,n||[]),r,o=[];return r=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),a("next"),a("throw"),a("return",s),r[Symbol.asyncIterator]=function(){return this},r;function s(p){return function(m){return Promise.resolve(m).then(p,f)}}function a(p,m){i[p]&&(r[p]=function(C){return new Promise(function(x,M){o.push([p,C,x,M])>1||l(p,C)})},m&&(r[p]=m(r[p])))}function l(p,m){try{c(i[p](m))}catch(C){h(o[0][3],C)}}function c(p){p.value instanceof hi?Promise.resolve(p.value.v).then(d,f):h(o[0][2],p)}function d(p){l("next",p)}function f(p){l("throw",p)}function h(p,m){p(m),o.shift(),o.length&&l(o[0][0],o[0][1])}}function sm(t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var n=t[Symbol.asyncIterator],e;return n?n.call(t):(t=typeof im=="function"?im(t):t[Symbol.iterator](),e={},i("next"),i("throw"),i("return"),e[Symbol.asyncIterator]=function(){return this},e);function i(o){e[o]=t[o]&&function(s){return new Promise(function(a,l){s=t[o](s),r(a,l,s.done,s.value)})}}function r(o,s,a,l){Promise.resolve(l).then(function(c){o({value:c,done:a})},s)}}var Ks=t=>t&&typeof t.length=="number"&&typeof t!="function";function Js(t){return Z(t?.then)}function ea(t){return Z(t[rr])}function ta(t){return Symbol.asyncIterator&&Z(t?.[Symbol.asyncIterator])}function na(t){return new TypeError(`You provided ${t!==null&&typeof t=="object"?"an invalid object":`'${t}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)}function xC(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var ia=xC();function ra(t){return Z(t?.[ia])}function oa(t){return om(this,arguments,function*(){let e=t.getReader();try{for(;;){let{value:i,done:r}=yield hi(e.read());if(r)return yield hi(void 0);yield yield hi(i)}}finally{e.releaseLock()}})}function sa(t){return Z(t?.getReader)}function de(t){if(t instanceof X)return t;if(t!=null){if(ea(t))return IC(t);if(Ks(t))return MC(t);if(Js(t))return SC(t);if(ta(t))return am(t);if(ra(t))return TC(t);if(sa(t))return AC(t)}throw na(t)}function IC(t){return new X(n=>{let e=t[rr]();if(Z(e.subscribe))return e.subscribe(n);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function MC(t){return new X(n=>{for(let e=0;e<t.length&&!n.closed;e++)n.next(t[e]);n.complete()})}function SC(t){return new X(n=>{t.then(e=>{n.closed||(n.next(e),n.complete())},e=>n.error(e)).then(null,$s)})}function TC(t){return new X(n=>{for(let e of t)if(n.next(e),n.closed)return;n.complete()})}function am(t){return new X(n=>{kC(t,n).catch(e=>n.error(e))})}function AC(t){return am(oa(t))}function kC(t,n){var e,i,r,o;return rm(this,void 0,void 0,function*(){try{for(e=sm(t);i=yield e.next(),!i.done;){let s=i.value;if(n.next(s),n.closed)return}}catch(s){r={error:s}}finally{try{i&&!i.done&&(o=e.return)&&(yield o.call(e))}finally{if(r)throw r.error}}n.complete()})}function Ke(t,n,e,i=0,r=!1){let o=n.schedule(function(){e(),r?t.add(this.schedule(null,i)):this.unsubscribe()},i);if(t.add(o),!r)return o}function aa(t,n=0){return ee((e,i)=>{e.subscribe(te(i,r=>Ke(i,t,()=>i.next(r),n),()=>Ke(i,t,()=>i.complete(),n),r=>Ke(i,t,()=>i.error(r),n)))})}function la(t,n=0){return ee((e,i)=>{i.add(t.schedule(()=>e.subscribe(i),n))})}function lm(t,n){return de(t).pipe(la(n),aa(n))}function cm(t,n){return de(t).pipe(la(n),aa(n))}function dm(t,n){return new X(e=>{let i=0;return n.schedule(function(){i===t.length?e.complete():(e.next(t[i++]),e.closed||this.schedule())})})}function um(t,n){return new X(e=>{let i;return Ke(e,n,()=>{i=t[ia](),Ke(e,n,()=>{let r,o;try{({value:r,done:o}=i.next())}catch(s){e.error(s);return}o?e.complete():e.next(r)},0,!0)}),()=>Z(i?.return)&&i.return()})}function ca(t,n){if(!t)throw new Error("Iterable cannot be null");return new X(e=>{Ke(e,n,()=>{let i=t[Symbol.asyncIterator]();Ke(e,n,()=>{i.next().then(r=>{r.done?e.complete():e.next(r.value)})},0,!0)})})}function fm(t,n){return ca(oa(t),n)}function pm(t,n){if(t!=null){if(ea(t))return lm(t,n);if(Ks(t))return dm(t,n);if(Js(t))return cm(t,n);if(ta(t))return ca(t,n);if(ra(t))return um(t,n);if(sa(t))return fm(t,n)}throw na(t)}function pt(t,n){return n?pm(t,n):de(t)}function Ue(...t){let n=Yt(t);return pt(t,n)}function uo(t,n){let e=Z(t)?t:()=>t,i=r=>r.error(e());return new X(n?r=>n.schedule(i,0,r):i)}var hm=tr(t=>function(){t(this),this.name="EmptyError",this.message="no elements in sequence"});function xd(t,n){let e=typeof n=="object";return new Promise((i,r)=>{let o=new St({next:s=>{i(s),o.unsubscribe()},error:r,complete:()=>{e?i(n.defaultValue):r(new hm)}});t.subscribe(o)})}function mm(t){return t instanceof Date&&!isNaN(t)}function _e(t,n){return ee((e,i)=>{let r=0;e.subscribe(te(i,o=>{i.next(t.call(n,o,r++))}))})}var{isArray:RC}=Array;function NC(t,n){return RC(n)?t(...n):t(n)}function da(t){return _e(n=>NC(t,n))}var{isArray:OC}=Array,{getPrototypeOf:FC,prototype:PC,keys:LC}=Object;function ua(t){if(t.length===1){let n=t[0];if(OC(n))return{args:n,keys:null};if(VC(n)){let e=LC(n);return{args:e.map(i=>n[i]),keys:e}}}return{args:t,keys:null}}function VC(t){return t&&typeof t=="object"&&FC(t)===PC}function fa(t,n){return t.reduce((e,i,r)=>(e[i]=n[r],e),{})}function Id(...t){let n=Yt(t),e=Xs(t),{args:i,keys:r}=ua(t);if(i.length===0)return pt([],n);let o=new X(BC(i,n,r?s=>fa(r,s):ct));return e?o.pipe(da(e)):o}function BC(t,n,e=ct){return i=>{gm(n,()=>{let{length:r}=t,o=new Array(r),s=r,a=r;for(let l=0;l<r;l++)gm(n,()=>{let c=pt(t[l],n),d=!1;c.subscribe(te(i,f=>{o[l]=f,d||(d=!0,a--),a||i.next(e(o.slice()))},()=>{--s||i.complete()}))},i)},i)}}function gm(t,n,e){t?Ke(e,t,n):n()}function vm(t,n,e,i,r,o,s,a){let l=[],c=0,d=0,f=!1,h=()=>{f&&!l.length&&!c&&n.complete()},p=C=>c<i?m(C):l.push(C),m=C=>{o&&n.next(C),c++;let x=!1;de(e(C,d++)).subscribe(te(n,M=>{r?.(M),o?p(M):n.next(M)},()=>{x=!0},void 0,()=>{if(x)try{for(c--;l.length&&c<i;){let M=l.shift();s?Ke(n,s,()=>m(M)):m(M)}h()}catch(M){n.error(M)}}))};return t.subscribe(te(n,p,()=>{f=!0,h()})),()=>{a?.()}}function sr(t,n,e=1/0){return Z(n)?sr((i,r)=>_e((o,s)=>n(i,o,r,s))(de(t(i,r))),e):(typeof n=="number"&&(e=n),ee((i,r)=>vm(i,r,t,e)))}function pa(t=1/0){return sr(ct,t)}function ym(){return pa(1)}function ar(...t){return ym()(pt(t,Yt(t)))}function fo(t){return new X(n=>{de(t()).subscribe(n)})}function po(...t){let n=Xs(t),{args:e,keys:i}=ua(t),r=new X(o=>{let{length:s}=e;if(!s){o.complete();return}let a=new Array(s),l=s,c=s;for(let d=0;d<s;d++){let f=!1;de(e[d]).subscribe(te(o,h=>{f||(f=!0,c--),a[d]=h},()=>l--,void 0,()=>{(!l||!f)&&(c||o.next(i?fa(i,a):a),o.complete())}))}});return n?r.pipe(da(n)):r}function mi(t=0,n,e=tm){let i=-1;return n!=null&&(Qs(n)?e=n:i=n),new X(r=>{let o=mm(t)?+t-e.now():t;o<0&&(o=0);let s=0;return e.schedule(function(){r.closed||(r.next(s++),0<=i?this.schedule(void 0,i):r.complete())},o)})}function ho(...t){let n=Yt(t),e=nm(t,1/0),i=t;return i.length?i.length===1?de(i[0]):pa(e)(pt(i,n)):pi}function Ve(t,n){return ee((e,i)=>{let r=0;e.subscribe(te(i,o=>t.call(n,o,r++)&&i.next(o)))})}function _m(t){return ee((n,e)=>{let i=!1,r=null,o=null,s=!1,a=()=>{if(o?.unsubscribe(),o=null,i){i=!1;let c=r;r=null,e.next(c)}s&&e.complete()},l=()=>{o=null,s&&e.complete()};n.subscribe(te(e,c=>{i=!0,r=c,o||de(t(c)).subscribe(o=te(e,a,l))},()=>{s=!0,(!i||!o||o.closed)&&e.complete()}))})}function ha(t,n=co){return _m(()=>mi(t,n))}function ma(t){return ee((n,e)=>{let i=null,r=!1,o;i=n.subscribe(te(e,void 0,void 0,s=>{o=de(t(s,ma(t)(n))),i?(i.unsubscribe(),i=null,o.subscribe(e)):r=!0})),r&&(i.unsubscribe(),i=null,o.subscribe(e))})}function Md(t,n){return Z(n)?sr(t,n,1):sr(t,1)}function Sd(t,n=co){return ee((e,i)=>{let r=null,o=null,s=null,a=()=>{if(r){r.unsubscribe(),r=null;let c=o;o=null,i.next(c)}};function l(){let c=s+t,d=n.now();if(d<c){r=this.schedule(void 0,c-d),i.add(r);return}a()}e.subscribe(te(i,c=>{o=c,s=n.now(),r||(r=n.schedule(l,t),i.add(r))},()=>{a(),i.complete()},void 0,()=>{o=r=null}))})}function Tt(t){return t<=0?()=>pi:ee((n,e)=>{let i=0;n.subscribe(te(e,r=>{++i<=t&&(e.next(r),t<=i&&e.complete())}))})}function ga(t,n=ct){return t=t??jC,ee((e,i)=>{let r,o=!0;e.subscribe(te(i,s=>{let a=n(s);(o||!t(r,a))&&(o=!1,r=a,i.next(s))}))})}function jC(t,n){return t===n}function mo(t){return ee((n,e)=>{try{n.subscribe(e)}finally{e.add(t)}})}function va(){return ee((t,n)=>{let e,i=!1;t.subscribe(te(n,r=>{let o=e;e=r,i&&n.next([o,r]),i=!0}))})}function Td(t=1/0){let n;t&&typeof t=="object"?n=t:n={count:t};let{count:e=1/0,delay:i,resetOnSuccess:r=!1}=n;return e<=0?ct:ee((o,s)=>{let a=0,l,c=()=>{let d=!1;l=o.subscribe(te(s,f=>{r&&(a=0),s.next(f)},void 0,f=>{if(a++<e){let h=()=>{l?(l.unsubscribe(),l=null,c()):d=!0};if(i!=null){let p=typeof i=="number"?mi(i):de(i(f,a)),m=te(s,()=>{m.unsubscribe(),h()},()=>{s.complete()});p.subscribe(m)}else h()}else s.error(f)})),d&&(l.unsubscribe(),l=null,c())};c()})}function go(t={}){let{connector:n=()=>new E,resetOnError:e=!0,resetOnComplete:i=!0,resetOnRefCountZero:r=!0}=t;return o=>{let s,a,l,c=0,d=!1,f=!1,h=()=>{a?.unsubscribe(),a=void 0},p=()=>{h(),s=l=void 0,d=f=!1},m=()=>{let C=s;p(),C?.unsubscribe()};return ee((C,x)=>{c++,!f&&!d&&h();let M=l=l??n();x.add(()=>{c--,c===0&&!f&&!d&&(a=Ad(m,r))}),M.subscribe(x),!s&&c>0&&(s=new St({next:ve=>M.next(ve),error:ve=>{f=!0,h(),a=Ad(p,e,ve),M.error(ve)},complete:()=>{d=!0,h(),a=Ad(p,i),M.complete()}}),de(C).subscribe(s))})(o)}}function Ad(t,n,...e){if(n===!0){t();return}if(n===!1)return;let i=new St({next:()=>{i.unsubscribe(),t()}});return de(n(...e)).subscribe(i)}function ya(t,n,e){let i,r=!1;return t&&typeof t=="object"?{bufferSize:i=1/0,windowTime:n=1/0,refCount:r=!1,scheduler:e}=t:i=t??1/0,go({connector:()=>new En(i,n,e),resetOnError:!0,resetOnComplete:!1,resetOnRefCountZero:r})}function vo(t){return Ve((n,e)=>t<=e)}function Zt(...t){let n=Yt(t);return ee((e,i)=>{(n?ar(t,e,n):ar(t,e)).subscribe(i)})}function _a(t,n){return ee((e,i)=>{let r=null,o=0,s=!1,a=()=>s&&!r&&i.complete();e.subscribe(te(i,l=>{r?.unsubscribe();let c=0,d=o++;de(t(l,d)).subscribe(r=te(i,f=>i.next(n?n(l,f,d,c++):f),()=>{r=null,a()}))},()=>{s=!0,a()}))})}function Se(t){return ee((n,e)=>{de(t).subscribe(te(e,()=>e.complete(),so)),!e.closed&&n.subscribe(e)})}function yo(t,n,e){let i=Z(t)||n||e?{next:t,error:n,complete:e}:t;return i?ee((r,o)=>{var s;(s=i.subscribe)===null||s===void 0||s.call(i);let a=!0;r.subscribe(te(o,l=>{var c;(c=i.next)===null||c===void 0||c.call(i,l),o.next(l)},()=>{var l;a=!1,(l=i.complete)===null||l===void 0||l.call(i),o.complete()},l=>{var c;a=!1,(c=i.error)===null||c===void 0||c.call(i,l),o.error(l)},()=>{var l,c;a&&((l=i.unsubscribe)===null||l===void 0||l.call(i)),(c=i.finalize)===null||c===void 0||c.call(i)}))}):ct}var kd;function ba(){return kd}function Qt(t){let n=kd;return kd=t,n}var bm=Symbol("NotFound");function lr(t){return t===bm||t?.name==="\u0275NotFound"}function Dm(t){let n=O(null);try{return t()}finally{O(n)}}var Ma="https://angular.dev/best-practices/security#preventing-cross-site-scripting-xss",A=class extends Error{code;constructor(n,e){super(dr(n,e)),this.code=n}};function HC(t){return`NG0${Math.abs(t)}`}function dr(t,n){return`${HC(t)}${n?": "+n:""}`}var Mn=globalThis;function ue(t){for(let n in t)if(t[n]===ue)return n;throw Error("")}function Im(t,n){for(let e in n)n.hasOwnProperty(e)&&!t.hasOwnProperty(e)&&(t[e]=n[e])}function Sa(t){if(typeof t=="string")return t;if(Array.isArray(t))return`[${t.map(Sa).join(", ")}]`;if(t==null)return""+t;let n=t.overriddenName||t.name;if(n)return`${n}`;let e=t.toString();if(e==null)return""+e;let i=e.indexOf(`
`);return i>=0?e.slice(0,i):e}function Ta(t,n){return t?n?`${t} ${n}`:t:n||""}var UC=ue({__forward_ref__:ue});function ht(t){return t.__forward_ref__=ht,t}function Oe(t){return $d(t)?t():t}function $d(t){return typeof t=="function"&&t.hasOwnProperty(UC)&&t.__forward_ref__===ht}function _(t){return{token:t.token,providedIn:t.providedIn||null,factory:t.factory,value:void 0}}function z(t){return{providers:t.providers||[],imports:t.imports||[]}}function Aa(t){return zC(t,ka)}function zC(t,n){return t.hasOwnProperty(n)&&t[n]||null}function $C(t){let n=t?.[ka]??null;return n||null}function Nd(t){return t&&t.hasOwnProperty(Ca)?t[Ca]:null}var ka=ue({\u0275prov:ue}),Ca=ue({\u0275inj:ue}),y=class{_desc;ngMetadataName="InjectionToken";\u0275prov;constructor(n,e){this._desc=n,this.\u0275prov=void 0,typeof e=="number"?this.__NG_ELEMENT_ID__=e:e!==void 0&&(this.\u0275prov=_({token:this,providedIn:e.providedIn||"root",factory:e.factory}))}get multi(){return this}toString(){return`InjectionToken ${this._desc}`}};function Gd(t){return t&&!!t.\u0275providers}var Wd=ue({\u0275cmp:ue}),qd=ue({\u0275dir:ue}),Yd=ue({\u0275pipe:ue});var bo=ue({\u0275fac:ue}),bi=ue({__NG_ELEMENT_ID__:ue}),Cm=ue({__NG_ENV_ID__:ue});function Sn(t){return Zd(t,"@Component"),t[Wd]||null}function Ra(t){return Zd(t,"@Directive"),t[qd]||null}function Mm(t){return Zd(t,"@Pipe"),t[Yd]||null}function Zd(t,n){if(t==null)throw new A(-919,!1)}function Di(t){return typeof t=="string"?t:t==null?"":String(t)}var Sm=ue({ngErrorCode:ue}),GC=ue({ngErrorMessage:ue}),WC=ue({ngTokenPath:ue});function Qd(t,n){return Tm("",-200,n)}function Na(t,n){throw new A(-201,!1)}function Tm(t,n,e){let i=new A(n,t);return i[Sm]=n,i[GC]=t,e&&(i[WC]=e),i}function qC(t){return t[Sm]}var Od;function Am(){return Od}function We(t){let n=Od;return Od=t,n}function Xd(t,n,e){let i=Aa(t);if(i&&i.providedIn=="root")return i.value===void 0?i.value=i.factory():i.value;if(e&8)return null;if(n!==void 0)return n;Na(t,"")}var YC={},gi=YC,ZC="__NG_DI_FLAG__",Fd=class{injector;constructor(n){this.injector=n}retrieve(n,e){let i=vi(e)||0;try{return this.injector.get(n,i&8?null:gi,i)}catch(r){if(lr(r))return r;throw r}}};function QC(t,n=0){let e=ba();if(e===void 0)throw new A(-203,!1);if(e===null)return Xd(t,void 0,n);{let i=XC(n),r=e.retrieve(t,i);if(lr(r)){if(i.optional)return null;throw r}return r}}function I(t,n=0){return(Am()||QC)(Oe(t),n)}function u(t,n){return I(t,vi(n))}function vi(t){return typeof t>"u"||typeof t=="number"?t:0|(t.optional&&8)|(t.host&&1)|(t.self&&2)|(t.skipSelf&&4)}function XC(t){return{optional:!!(t&8),host:!!(t&1),self:!!(t&2),skipSelf:!!(t&4)}}function Pd(t){let n=[];for(let e=0;e<t.length;e++){let i=Oe(t[e]);if(Array.isArray(i)){if(i.length===0)throw new A(900,!1);let r,o=0;for(let s=0;s<i.length;s++){let a=i[s],l=KC(a);typeof l=="number"?l===-1?r=a.token:o|=l:r=a}n.push(I(r,o))}else n.push(I(i))}return n}function KC(t){return t[ZC]}function wn(t,n){let e=t.hasOwnProperty(bo);return e?t[bo]:null}function km(t,n,e){if(t.length!==n.length)return!1;for(let i=0;i<t.length;i++){let r=t[i],o=n[i];if(e&&(r=e(r),o=e(o)),o!==r)return!1}return!0}function Rm(t){return t.flat(Number.POSITIVE_INFINITY)}function Oa(t,n){t.forEach(e=>Array.isArray(e)?Oa(e,n):n(e))}function Kd(t,n,e){n>=t.length?t.push(e):t.splice(n,0,e)}function xo(t,n){return n>=t.length-1?t.pop():t.splice(n,1)[0]}function Nm(t,n){let e=[];for(let i=0;i<t;i++)e.push(n);return e}function Om(t,n,e,i){let r=t.length;if(r==n)t.push(e,i);else if(r===1)t.push(i,t[0]),t[0]=e;else{for(r--,t.push(t[r-1],t[r]);r>n;){let o=r-2;t[r]=t[o],r--}t[n]=e,t[n+1]=i}}function Fa(t,n,e){let i=ur(t,n);return i>=0?t[i|1]=e:(i=~i,Om(t,i,n,e)),i}function Pa(t,n){let e=ur(t,n);if(e>=0)return t[e|1]}function ur(t,n){return JC(t,n,1)}function JC(t,n,e){let i=0,r=t.length>>e;for(;r!==i;){let o=i+(r-i>>1),s=t[o<<e];if(n===s)return o<<e;s>n?r=o:i=o+1}return~(r<<e)}var At={},ze=[],Ci=new y(""),Jd=new y("",-1),eu=new y(""),Do=class{get(n,e=gi){if(e===gi){let r=Tm("",-201);throw r.name="\u0275NotFound",r}return e}};function Ei(t){return{\u0275providers:t}}function Fm(t){return Ei([{provide:Ci,multi:!0,useValue:t}])}function Pm(...t){return{\u0275providers:tu(!0,t),\u0275fromNgModule:!0}}function tu(t,...n){let e=[],i=new Set,r,o=s=>{e.push(s)};return Oa(n,s=>{let a=s;Ea(a,o,[],i)&&(r||=[],r.push(a))}),r!==void 0&&Lm(r,o),e}function Lm(t,n){for(let e=0;e<t.length;e++){let{ngModule:i,providers:r}=t[e];nu(r,o=>{n(o,i)})}}function Ea(t,n,e,i){if(t=Oe(t),!t)return!1;let r=null,o=Nd(t),s=!o&&Sn(t);if(!o&&!s){let l=t.ngModule;if(o=Nd(l),o)r=l;else return!1}else{if(s&&!s.standalone)return!1;r=t}let a=i.has(r);if(s){if(a)return!1;if(i.add(r),s.dependencies){let l=typeof s.dependencies=="function"?s.dependencies():s.dependencies;for(let c of l)Ea(c,n,e,i)}}else if(o){if(o.imports!=null&&!a){i.add(r);let c;Oa(o.imports,d=>{Ea(d,n,e,i)&&(c||=[],c.push(d))}),c!==void 0&&Lm(c,n)}if(!a){let c=wn(r)||(()=>new r);n({provide:r,useFactory:c,deps:ze},r),n({provide:eu,useValue:r,multi:!0},r),n({provide:Ci,useValue:()=>I(r),multi:!0},r)}let l=o.providers;if(l!=null&&!a){let c=t;nu(l,d=>{n(d,c)})}}else return!1;return r!==t&&t.providers!==void 0}function nu(t,n){for(let e of t)Gd(e)&&(e=e.\u0275providers),Array.isArray(e)?nu(e,n):n(e)}var eE=ue({provide:String,useValue:ue});function Vm(t){return t!==null&&typeof t=="object"&&eE in t}function tE(t){return!!(t&&t.useExisting)}function nE(t){return!!(t&&t.useFactory)}function yi(t){return typeof t=="function"}function Bm(t){return!!t.useClass}var Io=new y(""),Da={},Em={},Rd;function fr(){return Rd===void 0&&(Rd=new Do),Rd}var we=class{},_i=class extends we{parent;source;scopes;records=new Map;_ngOnDestroyHooks=new Set;_onDestroyHooks=[];get destroyed(){return this._destroyed}_destroyed=!1;injectorDefTypes;constructor(n,e,i,r){super(),this.parent=e,this.source=i,this.scopes=r,Vd(n,s=>this.processProvider(s)),this.records.set(Jd,cr(void 0,this)),r.has("environment")&&this.records.set(we,cr(void 0,this));let o=this.records.get(Io);o!=null&&typeof o.value=="string"&&this.scopes.add(o.value),this.injectorDefTypes=new Set(this.get(eu,ze,{self:!0}))}retrieve(n,e){let i=vi(e)||0;try{return this.get(n,gi,i)}catch(r){if(lr(r))return r;throw r}}destroy(){_o(this),this._destroyed=!0;let n=O(null);try{for(let i of this._ngOnDestroyHooks)i.ngOnDestroy();let e=this._onDestroyHooks;this._onDestroyHooks=[];for(let i of e)i()}finally{this.records.clear(),this._ngOnDestroyHooks.clear(),this.injectorDefTypes.clear(),O(n)}}onDestroy(n){return _o(this),this._onDestroyHooks.push(n),()=>this.removeOnDestroy(n)}runInContext(n){_o(this);let e=Qt(this),i=We(void 0),r;try{return n()}finally{Qt(e),We(i)}}get(n,e=gi,i){if(_o(this),n.hasOwnProperty(Cm))return n[Cm](this);let r=vi(i),o,s=Qt(this),a=We(void 0);try{if(!(r&4)){let c=this.records.get(n);if(c===void 0){let d=aE(n)&&Aa(n);d&&this.injectableDefInScope(d)?c=cr(Ld(n),Da):c=null,this.records.set(n,c)}if(c!=null)return this.hydrate(n,c,r)}let l=r&2?fr():this.parent;return e=r&8&&e===gi?null:e,l.get(n,e)}catch(l){let c=qC(l);throw c===-200||c===-201?new A(c,null):l}finally{We(a),Qt(s)}}resolveInjectorInitializers(){let n=O(null),e=Qt(this),i=We(void 0),r;try{let o=this.get(Ci,ze,{self:!0});for(let s of o)s()}finally{Qt(e),We(i),O(n)}}toString(){return"R3Injector[...]"}processProvider(n){n=Oe(n);let e=yi(n)?n:Oe(n&&n.provide),i=rE(n);if(!yi(n)&&n.multi===!0){let r=this.records.get(e);r||(r=cr(void 0,Da,!0),r.factory=()=>Pd(r.multi),this.records.set(e,r)),e=n,r.multi.push(n)}this.records.set(e,i)}hydrate(n,e,i){let r=O(null);try{if(e.value===Em)throw Qd("");return e.value===Da&&(e.value=Em,e.value=e.factory(void 0,i)),typeof e.value=="object"&&e.value&&sE(e.value)&&this._ngOnDestroyHooks.add(e.value),e.value}finally{O(r)}}injectableDefInScope(n){if(!n.providedIn)return!1;let e=Oe(n.providedIn);return typeof e=="string"?e==="any"||this.scopes.has(e):this.injectorDefTypes.has(e)}removeOnDestroy(n){let e=this._onDestroyHooks.indexOf(n);e!==-1&&this._onDestroyHooks.splice(e,1)}};function Ld(t){let n=Aa(t),e=n!==null?n.factory:wn(t);if(e!==null)return e;if(t instanceof y)throw new A(-204,!1);if(t instanceof Function)return iE(t);throw new A(-204,!1)}function iE(t){if(t.length>0)throw new A(-204,!1);let e=$C(t);return e!==null?()=>e.factory(t):()=>new t}function rE(t){if(Vm(t))return cr(void 0,t.useValue);{let n=iu(t);return cr(n,Da)}}function iu(t,n,e){let i;if(yi(t)){let r=Oe(t);return wn(r)||Ld(r)}else if(Vm(t))i=()=>Oe(t.useValue);else if(nE(t))i=()=>t.useFactory(...Pd(t.deps||[]));else if(tE(t))i=(r,o)=>I(Oe(t.useExisting),o!==void 0&&o&8?8:void 0);else{let r=Oe(t&&(t.useClass||t.provide));if(oE(t))i=()=>new r(...Pd(t.deps));else return wn(r)||Ld(r)}return i}function _o(t){if(t.destroyed)throw new A(-205,!1)}function cr(t,n,e=!1){return{factory:t,value:n,multi:e?[]:void 0}}function oE(t){return!!t.deps}function sE(t){return t!==null&&typeof t=="object"&&typeof t.ngOnDestroy=="function"}function aE(t){return typeof t=="function"||typeof t=="object"&&t.ngMetadataName==="InjectionToken"}function Vd(t,n){for(let e of t)Array.isArray(e)?Vd(e,n):e&&Gd(e)?Vd(e.\u0275providers,n):n(e)}function pr(t,n){let e;t instanceof _i?(_o(t),e=t):e=new Fd(t);let i,r=Qt(e),o=We(void 0);try{return n()}finally{Qt(r),We(o)}}function jm(){return Am()!==void 0||ba()!=null}var kt=0,N=1,j=2,Fe=3,mt=4,qe=5,wi=6,hr=7,xe=8,on=9,Rt=10,me=11,mr=12,ru=13,xi=14,Ye=15,Tn=16,Ii=17,Kt=18,sn=19,ou=20,rn=21,La=22,xn=23,dt=24,Mi=25,An=26,be=27,Hm=1,su=6,kn=7,Mo=8,Si=9,Ee=10;function an(t){return Array.isArray(t)&&typeof t[Hm]=="object"}function Nt(t){return Array.isArray(t)&&t[Hm]===!0}function au(t){return(t.flags&4)!==0}function ln(t){return t.componentOffset>-1}function gr(t){return(t.flags&1)===1}function Ot(t){return!!t.template}function vr(t){return(t[j]&512)!==0}function Ti(t){return(t[j]&256)===256}var lu="svg",Um="math";function gt(t){for(;Array.isArray(t);)t=t[kt];return t}function cu(t,n){return gt(n[t])}function Ft(t,n){return gt(n[t.index])}function Va(t,n){return t.data[n]}function du(t,n){return t[n]}function uu(t,n,e,i){e>=t.data.length&&(t.data[e]=null,t.blueprint[e]=null),n[e]=i}function vt(t,n){let e=n[t];return an(e)?e:e[kt]}function zm(t){return(t[j]&4)===4}function Ba(t){return(t[j]&128)===128}function $m(t){return Nt(t[Fe])}function yt(t,n){return n==null?null:t[n]}function fu(t){t[Ii]=0}function pu(t){t[j]&1024||(t[j]|=1024,Ba(t)&&Ai(t))}function Gm(t,n){for(;t>0;)n=n[xi],t--;return n}function So(t){return!!(t[j]&9216||t[dt]?.dirty)}function ja(t){t[Rt].changeDetectionScheduler?.notify(8),t[j]&64&&(t[j]|=1024),So(t)&&Ai(t)}function Ai(t){t[Rt].changeDetectionScheduler?.notify(0);let n=In(t);for(;n!==null&&!(n[j]&8192||(n[j]|=8192,!Ba(n)));)n=In(n)}function hu(t,n){if(Ti(t))throw new A(911,!1);t[rn]===null&&(t[rn]=[]),t[rn].push(n)}function Wm(t,n){if(t[rn]===null)return;let e=t[rn].indexOf(n);e!==-1&&t[rn].splice(e,1)}function In(t){let n=t[Fe];return Nt(n)?n[Fe]:n}function mu(t){return t[hr]??=[]}function gu(t){return t.cleanup??=[]}function qm(t,n,e,i){let r=mu(n);r.push(e),t.firstCreatePass&&gu(t).push(i,r.length-1)}var Y={lFrame:sg(null),bindingsEnabled:!0,skipHydrationRootTNode:null};var Bd=!1;function Ym(){return Y.lFrame.elementDepthCount}function Zm(){Y.lFrame.elementDepthCount++}function vu(){Y.lFrame.elementDepthCount--}function Ha(){return Y.bindingsEnabled}function yu(){return Y.skipHydrationRootTNode!==null}function _u(t){return Y.skipHydrationRootTNode===t}function bu(){Y.skipHydrationRootTNode=null}function U(){return Y.lFrame.lView}function De(){return Y.lFrame.tView}function Ze(t){return Y.lFrame.contextLView=t,t[xe]}function Qe(t){return Y.lFrame.contextLView=null,t}function Be(){let t=Du();for(;t!==null&&t.type===64;)t=t.parent;return t}function Du(){return Y.lFrame.currentTNode}function Qm(){let t=Y.lFrame,n=t.currentTNode;return t.isParent?n:n.parent}function yr(t,n){let e=Y.lFrame;e.currentTNode=t,e.isParent=n}function Cu(){return Y.lFrame.isParent}function Eu(){Y.lFrame.isParent=!1}function Xm(){return Y.lFrame.contextLView}function wu(){return Bd}function Co(t){let n=Bd;return Bd=t,n}function Km(){let t=Y.lFrame,n=t.bindingRootIndex;return n===-1&&(n=t.bindingRootIndex=t.tView.bindingStartIndex),n}function Jm(){return Y.lFrame.bindingIndex}function eg(t){return Y.lFrame.bindingIndex=t}function ki(){return Y.lFrame.bindingIndex++}function Ua(t){let n=Y.lFrame,e=n.bindingIndex;return n.bindingIndex=n.bindingIndex+t,e}function tg(){return Y.lFrame.inI18n}function ng(t,n){let e=Y.lFrame;e.bindingIndex=e.bindingRootIndex=t,za(n)}function ig(){return Y.lFrame.currentDirectiveIndex}function za(t){Y.lFrame.currentDirectiveIndex=t}function rg(t){let n=Y.lFrame.currentDirectiveIndex;return n===-1?null:t[n]}function $a(){return Y.lFrame.currentQueryIndex}function To(t){Y.lFrame.currentQueryIndex=t}function lE(t){let n=t[N];return n.type===2?n.declTNode:n.type===1?t[qe]:null}function xu(t,n,e){if(e&4){let r=n,o=t;for(;r=r.parent,r===null&&!(e&1);)if(r=lE(o),r===null||(o=o[xi],r.type&10))break;if(r===null)return!1;n=r,t=o}let i=Y.lFrame=og();return i.currentTNode=n,i.lView=t,!0}function Ga(t){let n=og(),e=t[N];Y.lFrame=n,n.currentTNode=e.firstChild,n.lView=t,n.tView=e,n.contextLView=t,n.bindingIndex=e.bindingStartIndex,n.inI18n=!1}function og(){let t=Y.lFrame,n=t===null?null:t.child;return n===null?sg(t):n}function sg(t){let n={currentTNode:null,isParent:!0,lView:null,tView:null,selectedIndex:-1,contextLView:null,elementDepthCount:0,currentNamespace:null,currentDirectiveIndex:-1,bindingRootIndex:-1,bindingIndex:-1,currentQueryIndex:0,parent:t,child:null,inI18n:!1};return t!==null&&(t.child=n),n}function ag(){let t=Y.lFrame;return Y.lFrame=t.parent,t.currentTNode=null,t.lView=null,t}var Iu=ag;function Wa(){let t=ag();t.isParent=!0,t.tView=null,t.selectedIndex=-1,t.contextLView=null,t.elementDepthCount=0,t.currentDirectiveIndex=-1,t.currentNamespace=null,t.bindingRootIndex=-1,t.bindingIndex=-1,t.currentQueryIndex=0}function lg(t){return(Y.lFrame.contextLView=Gm(t,Y.lFrame.contextLView))[xe]}function Jt(){return Y.lFrame.selectedIndex}function Rn(t){Y.lFrame.selectedIndex=t}function qa(){let t=Y.lFrame;return Va(t.tView,t.selectedIndex)}function Ao(){Y.lFrame.currentNamespace=lu}function Ya(){cE()}function cE(){Y.lFrame.currentNamespace=null}function cg(){return Y.lFrame.currentNamespace}var dg=!0;function Za(){return dg}function ko(t){dg=t}function jd(t,n=null,e=null,i){let r=ug(t,n,e,i);return r.resolveInjectorInitializers(),r}function ug(t,n=null,e=null,i,r=new Set){let o=[e||ze,Pm(t)],s;return new _i(o,n||fr(),s||null,r)}var P=class t{static THROW_IF_NOT_FOUND=gi;static NULL=new Do;static create(n,e){if(Array.isArray(n))return jd({name:""},e,n,"");{let i=n.name??"";return jd({name:i},n.parent,n.providers,i)}}static \u0275prov=_({token:t,providedIn:"any",factory:()=>I(Jd)});static __NG_ELEMENT_ID__=-1},k=new y(""),Pt=(()=>{class t{static __NG_ELEMENT_ID__=dE;static __NG_ENV_ID__=e=>e}return t})(),wa=class extends Pt{_lView;constructor(n){super(),this._lView=n}get destroyed(){return Ti(this._lView)}onDestroy(n){let e=this._lView;return hu(e,n),()=>Wm(e,n)}};function dE(){return new wa(U())}var fg=!1,pg=new y(""),Ri=(()=>{class t{taskId=0;pendingTasks=new Set;destroyed=!1;pendingTask=new fi(!1);debugTaskTracker=u(pg,{optional:!0});get hasPendingTasks(){return this.destroyed?!1:this.pendingTask.value}get hasPendingTasksObservable(){return this.destroyed?new X(e=>{e.next(!1),e.complete()}):this.pendingTask}add(){!this.hasPendingTasks&&!this.destroyed&&this.pendingTask.next(!0);let e=this.taskId++;return this.pendingTasks.add(e),this.debugTaskTracker?.add(e),e}has(e){return this.pendingTasks.has(e)}remove(e){this.pendingTasks.delete(e),this.debugTaskTracker?.remove(e),this.pendingTasks.size===0&&this.hasPendingTasks&&this.pendingTask.next(!1)}ngOnDestroy(){this.pendingTasks.clear(),this.hasPendingTasks&&this.pendingTask.next(!1),this.destroyed=!0,this.pendingTask.unsubscribe()}static \u0275prov=_({token:t,providedIn:"root",factory:()=>new t})}return t})(),Hd=class extends E{__isAsync;destroyRef=void 0;pendingTasks=void 0;constructor(n=!1){super(),this.__isAsync=n,jm()&&(this.destroyRef=u(Pt,{optional:!0})??void 0,this.pendingTasks=u(Ri,{optional:!0})??void 0)}emit(n){let e=O(null);try{super.next(n)}finally{O(e)}}subscribe(n,e,i){let r=n,o=e||(()=>null),s=i;if(n&&typeof n=="object"){let l=n;r=l.next?.bind(l),o=l.error?.bind(l),s=l.complete?.bind(l)}this.__isAsync&&(o=this.wrapInTimeout(o),r&&(r=this.wrapInTimeout(r)),s&&(s=this.wrapInTimeout(s)));let a=super.subscribe({next:r,error:o,complete:s});return n instanceof ye&&n.add(a),a}wrapInTimeout(n){return e=>{let i=this.pendingTasks?.add();setTimeout(()=>{try{n(e)}finally{i!==void 0&&this.pendingTasks?.remove(i)}})}}},le=Hd;function xa(...t){}function Mu(t){let n,e;function i(){t=xa;try{e!==void 0&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(e),n!==void 0&&clearTimeout(n)}catch{}}return n=setTimeout(()=>{t(),i()}),typeof requestAnimationFrame=="function"&&(e=requestAnimationFrame(()=>{t(),i()})),()=>i()}function hg(t){return queueMicrotask(()=>t()),()=>{t=xa}}var Su="isAngularZone",Eo=Su+"_ID",uE=0,S=class t{hasPendingMacrotasks=!1;hasPendingMicrotasks=!1;isStable=!0;onUnstable=new le(!1);onMicrotaskEmpty=new le(!1);onStable=new le(!1);onError=new le(!1);constructor(n){let{enableLongStackTrace:e=!1,shouldCoalesceEventChangeDetection:i=!1,shouldCoalesceRunChangeDetection:r=!1,scheduleInRootZone:o=fg}=n;if(typeof Zone>"u")throw new A(908,!1);Zone.assertZonePatched();let s=this;s._nesting=0,s._outer=s._inner=Zone.current,Zone.TaskTrackingZoneSpec&&(s._inner=s._inner.fork(new Zone.TaskTrackingZoneSpec)),e&&Zone.longStackTraceZoneSpec&&(s._inner=s._inner.fork(Zone.longStackTraceZoneSpec)),s.shouldCoalesceEventChangeDetection=!r&&i,s.shouldCoalesceRunChangeDetection=r,s.callbackScheduled=!1,s.scheduleInRootZone=o,hE(s)}static isInAngularZone(){return typeof Zone<"u"&&Zone.current.get(Su)===!0}static assertInAngularZone(){if(!t.isInAngularZone())throw new A(909,!1)}static assertNotInAngularZone(){if(t.isInAngularZone())throw new A(909,!1)}run(n,e,i){return this._inner.run(n,e,i)}runTask(n,e,i,r){let o=this._inner,s=o.scheduleEventTask("NgZoneEvent: "+r,n,fE,xa,xa);try{return o.runTask(s,e,i)}finally{o.cancelTask(s)}}runGuarded(n,e,i){return this._inner.runGuarded(n,e,i)}runOutsideAngular(n){return this._outer.run(n)}},fE={};function Tu(t){if(t._nesting==0&&!t.hasPendingMicrotasks&&!t.isStable)try{t._nesting++,t.onMicrotaskEmpty.emit(null)}finally{if(t._nesting--,!t.hasPendingMicrotasks)try{t.runOutsideAngular(()=>t.onStable.emit(null))}finally{t.isStable=!0}}}function pE(t){if(t.isCheckStableRunning||t.callbackScheduled)return;t.callbackScheduled=!0;function n(){Mu(()=>{t.callbackScheduled=!1,Ud(t),t.isCheckStableRunning=!0,Tu(t),t.isCheckStableRunning=!1})}t.scheduleInRootZone?Zone.root.run(()=>{n()}):t._outer.run(()=>{n()}),Ud(t)}function hE(t){let n=()=>{pE(t)},e=uE++;t._inner=t._inner.fork({name:"angular",properties:{[Su]:!0,[Eo]:e,[Eo+e]:!0},onInvokeTask:(i,r,o,s,a,l)=>{if(mE(l))return i.invokeTask(o,s,a,l);try{return wm(t),i.invokeTask(o,s,a,l)}finally{(t.shouldCoalesceEventChangeDetection&&s.type==="eventTask"||t.shouldCoalesceRunChangeDetection)&&n(),xm(t)}},onInvoke:(i,r,o,s,a,l,c)=>{try{return wm(t),i.invoke(o,s,a,l,c)}finally{t.shouldCoalesceRunChangeDetection&&!t.callbackScheduled&&!gE(l)&&n(),xm(t)}},onHasTask:(i,r,o,s)=>{i.hasTask(o,s),r===o&&(s.change=="microTask"?(t._hasPendingMicrotasks=s.microTask,Ud(t),Tu(t)):s.change=="macroTask"&&(t.hasPendingMacrotasks=s.macroTask))},onHandleError:(i,r,o,s)=>(i.handleError(o,s),t.runOutsideAngular(()=>t.onError.emit(s)),!1)})}function Ud(t){t._hasPendingMicrotasks||(t.shouldCoalesceEventChangeDetection||t.shouldCoalesceRunChangeDetection)&&t.callbackScheduled===!0?t.hasPendingMicrotasks=!0:t.hasPendingMicrotasks=!1}function wm(t){t._nesting++,t.isStable&&(t.isStable=!1,t.onUnstable.emit(null))}function xm(t){t._nesting--,Tu(t)}var wo=class{hasPendingMicrotasks=!1;hasPendingMacrotasks=!1;isStable=!0;onUnstable=new le;onMicrotaskEmpty=new le;onStable=new le;onError=new le;run(n,e,i){return n.apply(e,i)}runGuarded(n,e,i){return n.apply(e,i)}runOutsideAngular(n){return n()}runTask(n,e,i,r){return n.apply(e,i)}};function mE(t){return mg(t,"__ignore_ng_zone__")}function gE(t){return mg(t,"__scheduler_tick__")}function mg(t,n){return!Array.isArray(t)||t.length!==1?!1:t[0]?.data?.[n]===!0}var Je=class{_console=console;handleError(n){this._console.error("ERROR",n)}},cn=new y("",{factory:()=>{let t=u(S),n=u(we),e;return i=>{t.runOutsideAngular(()=>{n.destroyed&&!e?setTimeout(()=>{throw i}):(e??=n.get(Je),e.handleError(i))})}}}),gg={provide:Ci,useValue:()=>{let t=u(Je,{optional:!0})},multi:!0},vE=new y("",{factory:()=>{let t=u(k).defaultView;if(!t)return;let n=u(cn),e=o=>{n(o.reason),o.preventDefault()},i=o=>{o.error?n(o.error):n(new Error(o.message,{cause:o})),o.preventDefault()},r=()=>{t.addEventListener("unhandledrejection",e),t.addEventListener("error",i)};typeof Zone<"u"?Zone.root.run(r):r(),u(Pt).onDestroy(()=>{t.removeEventListener("error",i),t.removeEventListener("unhandledrejection",e)})}});function Au(){return Ei([Fm(()=>{u(vE)})])}function L(t,n){let[e,i,r]=hd(t,n?.equal),o=e,s=o[Ne];return o.set=i,o.update=r,o.asReadonly=vg.bind(o),o}function vg(){let t=this[Ne];if(t.readonlyFn===void 0){let n=()=>this();n[Ne]=t,t.readonlyFn=n}return t.readonlyFn}var _r=(()=>{class t{view;node;constructor(e,i){this.view=e,this.node=i}static __NG_ELEMENT_ID__=yE}return t})();function yE(){return new _r(U(),Be())}var Xt=class{},Ro=new y("",{factory:()=>!0});var ku=new y(""),Qa=(()=>{class t{internalPendingTasks=u(Ri);scheduler=u(Xt);errorHandler=u(cn);add(){let e=this.internalPendingTasks.add();return()=>{this.internalPendingTasks.has(e)&&(this.scheduler.notify(11),this.internalPendingTasks.remove(e))}}run(e){let i=this.add();e().catch(this.errorHandler).finally(i)}static \u0275prov=_({token:t,providedIn:"root",factory:()=>new t})}return t})(),Xa=(()=>{class t{static \u0275prov=_({token:t,providedIn:"root",factory:()=>new zd})}return t})(),zd=class{dirtyEffectCount=0;queues=new Map;add(n){this.enqueue(n),this.schedule(n)}schedule(n){n.dirty&&this.dirtyEffectCount++}remove(n){let e=n.zone,i=this.queues.get(e);i.has(n)&&(i.delete(n),n.dirty&&this.dirtyEffectCount--)}enqueue(n){let e=n.zone;this.queues.has(e)||this.queues.set(e,new Set);let i=this.queues.get(e);i.has(n)||i.add(n)}flush(){for(;this.dirtyEffectCount>0;){let n=!1;for(let[e,i]of this.queues)e===null?n||=this.flushQueue(i):n||=e.run(()=>this.flushQueue(i));n||(this.dirtyEffectCount=0)}}flushQueue(n){let e=!1;for(let i of n)i.dirty&&(this.dirtyEffectCount--,e=!0,i.run());return e}},Ia=class{[Ne];constructor(n){this[Ne]=n}destroy(){this[Ne].destroy()}};function Nn(t,n){let e=n?.injector??u(P),i=n?.manualCleanup!==!0?e.get(Pt):null,r,o=e.get(_r,null,{optional:!0}),s=e.get(Xt);return o!==null?(r=DE(o.view,s,t),i instanceof wa&&i._lView===o.view&&(i=null)):r=CE(t,e.get(Xa),s),r.injector=e,i!==null&&(r.onDestroyFns=[i.onDestroy(()=>r.destroy())]),new Ia(r)}var yg=J(D({},gd),{cleanupFns:void 0,zone:null,onDestroyFns:null,run(){let t=Co(!1);try{vd(this)}finally{Co(t)}},cleanup(){if(!this.cleanupFns?.length)return;let t=O(null);try{for(;this.cleanupFns.length;)this.cleanupFns.pop()()}finally{this.cleanupFns=[],O(t)}}}),_E=J(D({},yg),{consumerMarkedDirty(){this.scheduler.schedule(this),this.notifier.notify(12)},destroy(){if(Cn(this),this.onDestroyFns!==null)for(let t of this.onDestroyFns)t();this.cleanup(),this.scheduler.remove(this)}}),bE=J(D({},yg),{consumerMarkedDirty(){this.view[j]|=8192,Ai(this.view),this.notifier.notify(13)},destroy(){if(Cn(this),this.onDestroyFns!==null)for(let t of this.onDestroyFns)t();this.cleanup(),this.view[xn]?.delete(this)}});function DE(t,n,e){let i=Object.create(bE);return i.view=t,i.zone=typeof Zone<"u"?Zone.current:null,i.notifier=n,i.fn=_g(i,e),t[xn]??=new Set,t[xn].add(i),i.consumerMarkedDirty(i),i}function CE(t,n,e){let i=Object.create(_E);return i.fn=_g(i,t),i.scheduler=n,i.notifier=e,i.zone=typeof Zone<"u"?Zone.current:null,i.scheduler.add(i),i.notifier.notify(12),i}function _g(t,n){return()=>{n(e=>(t.cleanupFns??=[]).push(e))}}function zo(t){return{toString:t}.toString()}function kE(t){return typeof t=="function"}function Jg(t,n,e,i){n!==null?n.applyValueToInputSignal(n,i):t[e]=i}var al=class{previousValue;currentValue;firstChange;constructor(n,e,i){this.previousValue=n,this.currentValue=e,this.firstChange=i}isFirstChange(){return this.firstChange}},_t=(()=>{let t=()=>ev;return t.ngInherit=!0,t})();function ev(t){return t.type.prototype.ngOnChanges&&(t.setInput=NE),RE}function RE(){let t=nv(this),n=t?.current;if(n){let e=t.previous;if(e===At)t.previous=n;else for(let i in n)e[i]=n[i];t.current=null,this.ngOnChanges(n)}}function NE(t,n,e,i,r){let o=this.declaredInputs[i],s=nv(t)||OE(t,{previous:At,current:null}),a=s.current||(s.current={}),l=s.previous,c=l[o];a[o]=new al(c&&c.currentValue,e,l===At),Jg(t,n,r,e)}var tv="__ngSimpleChanges__";function nv(t){return t[tv]||null}function OE(t,n){return t[tv]=n}var bg=[];var ce=function(t,n=null,e){for(let i=0;i<bg.length;i++){let r=bg[i];r(t,n,e)}},oe=(function(t){return t[t.TemplateCreateStart=0]="TemplateCreateStart",t[t.TemplateCreateEnd=1]="TemplateCreateEnd",t[t.TemplateUpdateStart=2]="TemplateUpdateStart",t[t.TemplateUpdateEnd=3]="TemplateUpdateEnd",t[t.LifecycleHookStart=4]="LifecycleHookStart",t[t.LifecycleHookEnd=5]="LifecycleHookEnd",t[t.OutputStart=6]="OutputStart",t[t.OutputEnd=7]="OutputEnd",t[t.BootstrapApplicationStart=8]="BootstrapApplicationStart",t[t.BootstrapApplicationEnd=9]="BootstrapApplicationEnd",t[t.BootstrapComponentStart=10]="BootstrapComponentStart",t[t.BootstrapComponentEnd=11]="BootstrapComponentEnd",t[t.ChangeDetectionStart=12]="ChangeDetectionStart",t[t.ChangeDetectionEnd=13]="ChangeDetectionEnd",t[t.ChangeDetectionSyncStart=14]="ChangeDetectionSyncStart",t[t.ChangeDetectionSyncEnd=15]="ChangeDetectionSyncEnd",t[t.AfterRenderHooksStart=16]="AfterRenderHooksStart",t[t.AfterRenderHooksEnd=17]="AfterRenderHooksEnd",t[t.ComponentStart=18]="ComponentStart",t[t.ComponentEnd=19]="ComponentEnd",t[t.DeferBlockStateStart=20]="DeferBlockStateStart",t[t.DeferBlockStateEnd=21]="DeferBlockStateEnd",t[t.DynamicComponentStart=22]="DynamicComponentStart",t[t.DynamicComponentEnd=23]="DynamicComponentEnd",t[t.HostBindingsUpdateStart=24]="HostBindingsUpdateStart",t[t.HostBindingsUpdateEnd=25]="HostBindingsUpdateEnd",t})(oe||{});function FE(t,n,e){let{ngOnChanges:i,ngOnInit:r,ngDoCheck:o}=n.type.prototype;if(i){let s=ev(n);(e.preOrderHooks??=[]).push(t,s),(e.preOrderCheckHooks??=[]).push(t,s)}r&&(e.preOrderHooks??=[]).push(0-t,r),o&&((e.preOrderHooks??=[]).push(t,o),(e.preOrderCheckHooks??=[]).push(t,o))}function iv(t,n){for(let e=n.directiveStart,i=n.directiveEnd;e<i;e++){let o=t.data[e].type.prototype,{ngAfterContentInit:s,ngAfterContentChecked:a,ngAfterViewInit:l,ngAfterViewChecked:c,ngOnDestroy:d}=o;s&&(t.contentHooks??=[]).push(-e,s),a&&((t.contentHooks??=[]).push(e,a),(t.contentCheckHooks??=[]).push(e,a)),l&&(t.viewHooks??=[]).push(-e,l),c&&((t.viewHooks??=[]).push(e,c),(t.viewCheckHooks??=[]).push(e,c)),d!=null&&(t.destroyHooks??=[]).push(e,d)}}function nl(t,n,e){rv(t,n,3,e)}function il(t,n,e,i){(t[j]&3)===e&&rv(t,n,e,i)}function Ru(t,n){let e=t[j];(e&3)===n&&(e&=16383,e+=1,t[j]=e)}function rv(t,n,e,i){let r=i!==void 0?t[Ii]&65535:0,o=i??-1,s=n.length-1,a=0;for(let l=r;l<s;l++)if(typeof n[l+1]=="number"){if(a=n[l],i!=null&&a>=i)break}else n[l]<0&&(t[Ii]+=65536),(a<o||o==-1)&&(PE(t,e,n,l),t[Ii]=(t[Ii]&4294901760)+l+2),l++}function Dg(t,n){ce(oe.LifecycleHookStart,t,n);let e=O(null);try{n.call(t)}finally{O(e),ce(oe.LifecycleHookEnd,t,n)}}function PE(t,n,e,i){let r=e[i]<0,o=e[i+1],s=r?-e[i]:e[i],a=t[s];r?t[j]>>14<t[Ii]>>16&&(t[j]&3)===n&&(t[j]+=16384,Dg(a,o)):Dg(a,o)}var Dr=-1,Oi=class{factory;name;injectImpl;resolving=!1;canSeeViewProviders;multi;componentProviders;index;providerFactory;constructor(n,e,i,r){this.factory=n,this.name=r,this.canSeeViewProviders=e,this.injectImpl=i}};function LE(t){return(t.flags&8)!==0}function VE(t){return(t.flags&16)!==0}function BE(t,n,e){let i=0;for(;i<e.length;){let r=e[i];if(typeof r=="number"){if(r!==0)break;i++;let o=e[i++],s=e[i++],a=e[i++];t.setAttribute(n,s,a,o)}else{let o=r,s=e[++i];jE(o)?t.setProperty(n,o,s):t.setAttribute(n,o,s),i++}}return i}function ov(t){return t===3||t===4||t===6}function jE(t){return t.charCodeAt(0)===64}function Cr(t,n){if(!(n===null||n.length===0))if(t===null||t.length===0)t=n.slice();else{let e=-1;for(let i=0;i<n.length;i++){let r=n[i];typeof r=="number"?e=r:e===0||(e===-1||e===2?Cg(t,e,r,null,n[++i]):Cg(t,e,r,null,null))}}return t}function Cg(t,n,e,i,r){let o=0,s=t.length;if(n===-1)s=-1;else for(;o<t.length;){let a=t[o++];if(typeof a=="number"){if(a===n){s=-1;break}else if(a>n){s=o-1;break}}}for(;o<t.length;){let a=t[o];if(typeof a=="number")break;if(a===e){r!==null&&(t[o+1]=r);return}o++,r!==null&&o++}s!==-1&&(t.splice(s,0,n),o=s+1),t.splice(o++,0,e),r!==null&&t.splice(o++,0,r)}function sv(t){return t!==Dr}function ll(t){return t&32767}function HE(t){return t>>16}function cl(t,n){let e=HE(t),i=n;for(;e>0;)i=i[xi],e--;return i}var Uu=!0;function dl(t){let n=Uu;return Uu=t,n}var UE=256,av=UE-1,lv=5,zE=0,en={};function $E(t,n,e){let i;typeof e=="string"?i=e.charCodeAt(0)||0:e.hasOwnProperty(bi)&&(i=e[bi]),i==null&&(i=e[bi]=zE++);let r=i&av,o=1<<r;n.data[t+(r>>lv)]|=o}function ul(t,n){let e=cv(t,n);if(e!==-1)return e;let i=n[N];i.firstCreatePass&&(t.injectorIndex=n.length,Nu(i.data,t),Nu(n,null),Nu(i.blueprint,null));let r=Sf(t,n),o=t.injectorIndex;if(sv(r)){let s=ll(r),a=cl(r,n),l=a[N].data;for(let c=0;c<8;c++)n[o+c]=a[s+c]|l[s+c]}return n[o+8]=r,o}function Nu(t,n){t.push(0,0,0,0,0,0,0,0,n)}function cv(t,n){return t.injectorIndex===-1||t.parent&&t.parent.injectorIndex===t.injectorIndex||n[t.injectorIndex+8]===null?-1:t.injectorIndex}function Sf(t,n){if(t.parent&&t.parent.injectorIndex!==-1)return t.parent.injectorIndex;let e=0,i=null,r=n;for(;r!==null;){if(i=hv(r),i===null)return Dr;if(e++,r=r[xi],i.injectorIndex!==-1)return i.injectorIndex|e<<16}return Dr}function zu(t,n,e){$E(t,n,e)}function GE(t,n){if(n==="class")return t.classes;if(n==="style")return t.styles;let e=t.attrs;if(e){let i=e.length,r=0;for(;r<i;){let o=e[r];if(ov(o))break;if(o===0)r=r+2;else if(typeof o=="number")for(r++;r<i&&typeof e[r]=="string";)r++;else{if(o===n)return e[r+1];r=r+2}}}return null}function dv(t,n,e){if(e&8||t!==void 0)return t;Na(n,"NodeInjector")}function uv(t,n,e,i){if(e&8&&i===void 0&&(i=null),(e&3)===0){let r=t[on],o=We(void 0);try{return r?r.get(n,i,e&8):Xd(n,i,e&8)}finally{We(o)}}return dv(i,n,e)}function fv(t,n,e,i=0,r){if(t!==null){if(n[j]&2048&&!(i&2)){let s=ZE(t,n,e,i,en);if(s!==en)return s}let o=pv(t,n,e,i,en);if(o!==en)return o}return uv(n,e,i,r)}function pv(t,n,e,i,r){let o=qE(e);if(typeof o=="function"){if(!xu(n,t,i))return i&1?dv(r,e,i):uv(n,e,i,r);try{let s;if(s=o(i),s==null&&!(i&8))Na(e);else return s}finally{Iu()}}else if(typeof o=="number"){let s=null,a=cv(t,n),l=Dr,c=i&1?n[Ye][qe]:null;for((a===-1||i&4)&&(l=a===-1?Sf(t,n):n[a+8],l===Dr||!wg(i,!1)?a=-1:(s=n[N],a=ll(l),n=cl(l,n)));a!==-1;){let d=n[N];if(Eg(o,a,d.data)){let f=WE(a,n,e,s,i,c);if(f!==en)return f}l=n[a+8],l!==Dr&&wg(i,n[N].data[a+8]===c)&&Eg(o,a,n)?(s=d,a=ll(l),n=cl(l,n)):a=-1}}return r}function WE(t,n,e,i,r,o){let s=n[N],a=s.data[t+8],l=i==null?ln(a)&&Uu:i!=s&&(a.type&3)!==0,c=r&1&&o===a,d=rl(a,s,e,l,c);return d!==null?Po(n,s,d,a,r):en}function rl(t,n,e,i,r){let o=t.providerIndexes,s=n.data,a=o&1048575,l=t.directiveStart,c=t.directiveEnd,d=o>>20,f=i?a:a+d,h=r?a+d:c;for(let p=f;p<h;p++){let m=s[p];if(p<l&&e===m||p>=l&&m.type===e)return p}if(r){let p=s[l];if(p&&Ot(p)&&p.type===e)return l}return null}function Po(t,n,e,i,r){let o=t[e],s=n.data;if(o instanceof Oi){let a=o;if(a.resolving)throw Qd("");let l=dl(a.canSeeViewProviders);a.resolving=!0;let c=s[e].type||s[e],d,f=a.injectImpl?We(a.injectImpl):null,h=xu(t,i,0);try{o=t[e]=a.factory(void 0,r,s,t,i),n.firstCreatePass&&e>=i.directiveStart&&FE(e,s[e],n)}finally{f!==null&&We(f),dl(l),a.resolving=!1,Iu()}}return o}function qE(t){if(typeof t=="string")return t.charCodeAt(0)||0;let n=t.hasOwnProperty(bi)?t[bi]:void 0;return typeof n=="number"?n>=0?n&av:YE:n}function Eg(t,n,e){let i=1<<t;return!!(e[n+(t>>lv)]&i)}function wg(t,n){return!(t&2)&&!(t&1&&n)}var Ni=class{_tNode;_lView;constructor(n,e){this._tNode=n,this._lView=e}get(n,e,i){return fv(this._tNode,this._lView,n,vi(i),e)}};function YE(){return new Ni(Be(),U())}function bt(t){return zo(()=>{let n=t.prototype.constructor,e=n[bo]||$u(n),i=Object.prototype,r=Object.getPrototypeOf(t.prototype).constructor;for(;r&&r!==i;){let o=r[bo]||$u(r);if(o&&o!==e)return o;r=Object.getPrototypeOf(r)}return o=>new o})}function $u(t){return $d(t)?()=>{let n=$u(Oe(t));return n&&n()}:wn(t)}function ZE(t,n,e,i,r){let o=t,s=n;for(;o!==null&&s!==null&&s[j]&2048&&!vr(s);){let a=pv(o,s,e,i|2,en);if(a!==en)return a;let l=o.parent;if(!l){let c=s[ou];if(c){let d=c.get(e,en,i&-5);if(d!==en)return d}l=hv(s),s=s[xi]}o=l}return r}function hv(t){let n=t[N],e=n.type;return e===2?n.declTNode:e===1?t[qe]:null}function Tf(t){return GE(Be(),t)}function QE(){return Mr(Be(),U())}function Mr(t,n){return new V(Ft(t,n))}var V=(()=>{class t{nativeElement;constructor(e){this.nativeElement=e}static __NG_ELEMENT_ID__=QE}return t})();function mv(t){return t instanceof V?t.nativeElement:t}function XE(){return this._results[Symbol.iterator]()}var fl=class{_emitDistinctChangesOnly;dirty=!0;_onDirty=void 0;_results=[];_changesDetected=!1;_changes=void 0;length=0;first=void 0;last=void 0;get changes(){return this._changes??=new E}constructor(n=!1){this._emitDistinctChangesOnly=n}get(n){return this._results[n]}map(n){return this._results.map(n)}filter(n){return this._results.filter(n)}find(n){return this._results.find(n)}reduce(n,e){return this._results.reduce(n,e)}forEach(n){this._results.forEach(n)}some(n){return this._results.some(n)}toArray(){return this._results.slice()}toString(){return this._results.toString()}reset(n,e){this.dirty=!1;let i=Rm(n);(this._changesDetected=!km(this._results,i,e))&&(this._results=i,this.length=i.length,this.last=i[this.length-1],this.first=i[0])}notifyOnChanges(){this._changes!==void 0&&(this._changesDetected||!this._emitDistinctChangesOnly)&&this._changes.next(this)}onDirty(n){this._onDirty=n}setDirty(){this.dirty=!0,this._onDirty?.()}destroy(){this._changes!==void 0&&(this._changes.complete(),this._changes.unsubscribe())}[Symbol.iterator]=XE};function gv(t){return(t.flags&128)===128}var Af=(function(t){return t[t.OnPush=0]="OnPush",t[t.Eager=1]="Eager",t[t.Default=1]="Default",t})(Af||{}),vv=new Map,KE=0;function JE(){return KE++}function e0(t){vv.set(t[sn],t)}function Gu(t){vv.delete(t[sn])}var xg="__ngContext__";function Er(t,n){an(n)?(t[xg]=n[sn],e0(n)):t[xg]=n}function yv(t){return bv(t[mr])}function _v(t){return bv(t[mt])}function bv(t){for(;t!==null&&!Nt(t);)t=t[mt];return t}var Wu;function kf(t){Wu=t}function Dv(){if(Wu!==void 0)return Wu;if(typeof document<"u")return document;throw new A(210,!1)}var Pn=new y("",{factory:()=>t0}),t0="ng";var Dl=new y(""),Li=new y("",{providedIn:"platform",factory:()=>"unknown"}),$o=new y(""),Vi=new y("",{factory:()=>u(k).body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce")||null});var Cv="r";var Ev="di";var wv=!1,xv=new y("",{factory:()=>wv});var n0=(t,n,e,i)=>{};function i0(t,n,e,i){n0(t,n,e,i)}function Cl(t){return(t.flags&32)===32}var r0=()=>null;function Iv(t,n,e=!1){return r0(t,n,e)}function Mv(t,n){let e=t.contentQueries;if(e!==null){let i=O(null);try{for(let r=0;r<e.length;r+=2){let o=e[r],s=e[r+1];if(s!==-1){let a=t.data[s];To(o),a.contentQueries(2,n[s],s)}}}finally{O(i)}}}function qu(t,n,e){To(0);let i=O(null);try{n(t,e)}finally{O(i)}}function Rf(t,n,e){if(au(n)){let i=O(null);try{let r=n.directiveStart,o=n.directiveEnd;for(let s=r;s<o;s++){let a=t.data[s];if(a.contentQueries){let l=e[s];a.contentQueries(1,l,s)}}}finally{O(i)}}}var Bt=(function(t){return t[t.Emulated=0]="Emulated",t[t.None=2]="None",t[t.ShadowDom=3]="ShadowDom",t[t.ExperimentalIsolatedShadowDom=4]="ExperimentalIsolatedShadowDom",t})(Bt||{});var Ka;function o0(){if(Ka===void 0&&(Ka=null,Mn.trustedTypes))try{Ka=Mn.trustedTypes.createPolicy("angular",{createHTML:t=>t,createScript:t=>t,createScriptURL:t=>t})}catch{}return Ka}function El(t){return o0()?.createHTML(t)||t}var Ja;function s0(){if(Ja===void 0&&(Ja=null,Mn.trustedTypes))try{Ja=Mn.trustedTypes.createPolicy("angular#unsafe-bypass",{createHTML:t=>t,createScript:t=>t,createScriptURL:t=>t})}catch{}return Ja}function Ig(t){return s0()?.createHTML(t)||t}var dn=class{changingThisBreaksApplicationSecurity;constructor(n){this.changingThisBreaksApplicationSecurity=n}toString(){return`SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${Ma})`}},Yu=class extends dn{getTypeName(){return"HTML"}},Zu=class extends dn{getTypeName(){return"Style"}},Qu=class extends dn{getTypeName(){return"Script"}},Xu=class extends dn{getTypeName(){return"URL"}},Ku=class extends dn{getTypeName(){return"ResourceURL"}};function Ht(t){return t instanceof dn?t.changingThisBreaksApplicationSecurity:t}function un(t,n){let e=Sv(t);if(e!=null&&e!==n){if(e==="ResourceURL"&&n==="URL")return!0;throw new Error(`Required a safe ${n}, got a ${e} (see ${Ma})`)}return e===n}function Sv(t){return t instanceof dn&&t.getTypeName()||null}function Nf(t){return new Yu(t)}function Of(t){return new Zu(t)}function Ff(t){return new Qu(t)}function Pf(t){return new Xu(t)}function Lf(t){return new Ku(t)}function a0(t){let n=new ef(t);return l0()?new Ju(n):n}var Ju=class{inertDocumentHelper;constructor(n){this.inertDocumentHelper=n}getInertBodyElement(n){n="<body><remove></remove>"+n;try{let e=new window.DOMParser().parseFromString(El(n),"text/html").body;return e===null?this.inertDocumentHelper.getInertBodyElement(n):(e.firstChild?.remove(),e)}catch{return null}}},ef=class{defaultDoc;inertDocument;constructor(n){this.defaultDoc=n,this.inertDocument=this.defaultDoc.implementation.createHTMLDocument("sanitization-inert")}getInertBodyElement(n){let e=this.inertDocument.createElement("template");return e.innerHTML=El(n),e}};function l0(){try{return!!new window.DOMParser().parseFromString(El(""),"text/html")}catch{return!1}}var c0=/^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;function Go(t){return t=String(t),t.match(c0)?t:"unsafe:"+t}function fn(t){let n={};for(let e of t.split(","))n[e]=!0;return n}function Wo(...t){let n={};for(let e of t)for(let i in e)e.hasOwnProperty(i)&&(n[i]=!0);return n}var Tv=fn("area,br,col,hr,img,wbr"),Av=fn("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),kv=fn("rp,rt"),d0=Wo(kv,Av),u0=Wo(Av,fn("address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul")),f0=Wo(kv,fn("a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video")),Mg=Wo(Tv,u0,f0,d0),Rv=fn("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),p0=fn("abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"),h0=fn("aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"),m0=Wo(Rv,p0,h0),g0=fn("script,style,template");var tf=class{sanitizedSomething=!1;buf=[];sanitizeChildren(n){let e=n.firstChild,i=!0,r=[];for(;e;){if(e.nodeType===Node.ELEMENT_NODE?i=this.startElement(e):e.nodeType===Node.TEXT_NODE?this.chars(e.nodeValue):this.sanitizedSomething=!0,i&&e.firstChild){r.push(e),e=_0(e);continue}for(;e;){e.nodeType===Node.ELEMENT_NODE&&this.endElement(e);let o=y0(e);if(o){e=o;break}e=r.pop()}}return this.buf.join("")}startElement(n){let e=Sg(n).toLowerCase();if(!Mg.hasOwnProperty(e))return this.sanitizedSomething=!0,!g0.hasOwnProperty(e);this.buf.push("<"),this.buf.push(e);let i=n.attributes;for(let r=0;r<i.length;r++){let o=i.item(r),s=o.name,a=s.toLowerCase();if(!m0.hasOwnProperty(a)){this.sanitizedSomething=!0;continue}let l=o.value;Rv[a]&&(l=Go(l)),this.buf.push(" ",s,'="',Tg(l),'"')}return this.buf.push(">"),!0}endElement(n){let e=Sg(n).toLowerCase();Mg.hasOwnProperty(e)&&!Tv.hasOwnProperty(e)&&(this.buf.push("</"),this.buf.push(e),this.buf.push(">"))}chars(n){this.buf.push(Tg(n))}};function v0(t,n){return(t.compareDocumentPosition(n)&Node.DOCUMENT_POSITION_CONTAINED_BY)!==Node.DOCUMENT_POSITION_CONTAINED_BY}function y0(t){let n=t.nextSibling;if(n&&t!==n.previousSibling)throw Nv(n);return n}function _0(t){let n=t.firstChild;if(n&&v0(t,n))throw Nv(n);return n}function Sg(t){let n=t.nodeName;return typeof n=="string"?n:"FORM"}function Nv(t){return new Error(`Failed to sanitize html because the element is clobbered: ${t.outerHTML}`)}var b0=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,D0=/([^\#-~ |!])/g;function Tg(t){return t.replace(/&/g,"&amp;").replace(b0,function(n){let e=n.charCodeAt(0),i=n.charCodeAt(1);return"&#"+((e-55296)*1024+(i-56320)+65536)+";"}).replace(D0,function(n){return"&#"+n.charCodeAt(0)+";"}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}var el;function wl(t,n){let e=null;try{el=el||a0(t);let i=n?String(n):"";e=el.getInertBodyElement(i);let r=5,o=i;do{if(r===0)throw new Error("Failed to sanitize html because the input is unstable");r--,i=o,o=e.innerHTML,e=el.getInertBodyElement(i)}while(i!==o);let a=new tf().sanitizeChildren(Ag(e)||e);return El(a)}finally{if(e){let i=Ag(e)||e;for(;i.firstChild;)i.firstChild.remove()}}}function Ag(t){return"content"in t&&C0(t)?t.content:null}function C0(t){return t.nodeType===Node.ELEMENT_NODE&&t.nodeName==="TEMPLATE"}var E0=/^>|^->|<!--|-->|--!>|<!-$/g,w0=/(<|>)/g,x0="\u200B$1\u200B";function I0(t){return t.replace(E0,n=>n.replace(w0,x0))}function M0(t,n){return t.createText(n)}function S0(t,n,e){t.setValue(n,e)}function T0(t,n){return t.createComment(I0(n))}function Ov(t,n,e){return t.createElement(n,e)}function pl(t,n,e,i,r){t.insertBefore(n,e,i,r)}function Fv(t,n,e){t.appendChild(n,e)}function kg(t,n,e,i,r){i!==null?pl(t,n,e,i,r):Fv(t,n,e)}function Pv(t,n,e,i){t.removeChild(null,n,e,i)}function A0(t,n,e){t.setAttribute(n,"style",e)}function k0(t,n,e){e===""?t.removeAttribute(n,"class"):t.setAttribute(n,"class",e)}function Lv(t,n,e){let{mergedAttrs:i,classes:r,styles:o}=e;i!==null&&BE(t,n,i),r!==null&&k0(t,n,r),o!==null&&A0(t,n,o)}var Pe=(function(t){return t[t.NONE=0]="NONE",t[t.HTML=1]="HTML",t[t.STYLE=2]="STYLE",t[t.SCRIPT=3]="SCRIPT",t[t.URL=4]="URL",t[t.RESOURCE_URL=5]="RESOURCE_URL",t})(Pe||{});function Vf(t){let n=Vv();return n?Ig(n.sanitize(Pe.HTML,t)||""):un(t,"HTML")?Ig(Ht(t)):wl(Dv(),Di(t))}function xl(t){let n=Vv();return n?n.sanitize(Pe.URL,t)||"":un(t,"URL")?Ht(t):Go(Di(t))}function Vv(){let t=U();return t&&t[Rt].sanitizer}function R0(t,n,e){let i=t.length;for(;;){let r=t.indexOf(n,e);if(r===-1)return r;if(r===0||t.charCodeAt(r-1)<=32){let o=n.length;if(r+o===i||t.charCodeAt(r+o)<=32)return r}e=r+1}}var Bv="ng-template";function N0(t,n,e,i){let r=0;if(i){for(;r<n.length&&typeof n[r]=="string";r+=2)if(n[r]==="class"&&R0(n[r+1].toLowerCase(),e,0)!==-1)return!0}else if(Bf(t))return!1;if(r=n.indexOf(1,r),r>-1){let o;for(;++r<n.length&&typeof(o=n[r])=="string";)if(o.toLowerCase()===e)return!0}return!1}function Bf(t){return t.type===4&&t.value!==Bv}function O0(t,n,e){let i=t.type===4&&!e?Bv:t.value;return n===i}function F0(t,n,e){let i=4,r=t.attrs,o=r!==null?V0(r):0,s=!1;for(let a=0;a<n.length;a++){let l=n[a];if(typeof l=="number"){if(!s&&!Lt(i)&&!Lt(l))return!1;if(s&&Lt(l))continue;s=!1,i=l|i&1;continue}if(!s)if(i&4){if(i=2|i&1,l!==""&&!O0(t,l,e)||l===""&&n.length===1){if(Lt(i))return!1;s=!0}}else if(i&8){if(r===null||!N0(t,r,l,e)){if(Lt(i))return!1;s=!0}}else{let c=n[++a],d=P0(l,r,Bf(t),e);if(d===-1){if(Lt(i))return!1;s=!0;continue}if(c!==""){let f;if(d>o?f="":f=r[d+1].toLowerCase(),i&2&&c!==f){if(Lt(i))return!1;s=!0}}}}return Lt(i)||s}function Lt(t){return(t&1)===0}function P0(t,n,e,i){if(n===null)return-1;let r=0;if(i||!e){let o=!1;for(;r<n.length;){let s=n[r];if(s===t)return r;if(s===3||s===6)o=!0;else if(s===1||s===2){let a=n[++r];for(;typeof a=="string";)a=n[++r];continue}else{if(s===4)break;if(s===0){r+=4;continue}}r+=o?1:2}return-1}else return B0(n,t)}function jv(t,n,e=!1){for(let i=0;i<n.length;i++)if(F0(t,n[i],e))return!0;return!1}function L0(t){let n=t.attrs;if(n!=null){let e=n.indexOf(5);if((e&1)===0)return n[e+1]}return null}function V0(t){for(let n=0;n<t.length;n++){let e=t[n];if(ov(e))return n}return t.length}function B0(t,n){let e=t.indexOf(4);if(e>-1)for(e++;e<t.length;){let i=t[e];if(typeof i=="number")return-1;if(i===n)return e;e++}return-1}function j0(t,n){e:for(let e=0;e<n.length;e++){let i=n[e];if(t.length===i.length){for(let r=0;r<t.length;r++)if(t[r]!==i[r])continue e;return!0}}return!1}function Rg(t,n){return t?":not("+n.trim()+")":n}function H0(t){let n=t[0],e=1,i=2,r="",o=!1;for(;e<t.length;){let s=t[e];if(typeof s=="string")if(i&2){let a=t[++e];r+="["+s+(a.length>0?'="'+a+'"':"")+"]"}else i&8?r+="."+s:i&4&&(r+=" "+s);else r!==""&&!Lt(s)&&(n+=Rg(o,r),r=""),i=s,o=o||!Lt(i);e++}return r!==""&&(n+=Rg(o,r)),n}function U0(t){return t.map(H0).join(",")}function z0(t){let n=[],e=[],i=1,r=2;for(;i<t.length;){let o=t[i];if(typeof o=="string")r===2?o!==""&&n.push(o,t[++i]):r===8&&e.push(o);else{if(!Lt(r))break;r=o}i++}return e.length&&n.push(1,...e),n}var et={};function jf(t,n,e,i,r,o,s,a,l,c,d){let f=be+i,h=f+r,p=$0(f,h),m=typeof c=="function"?c():c;return p[N]={type:t,blueprint:p,template:e,queries:null,viewQuery:a,declTNode:n,data:p.slice().fill(null,f),bindingStartIndex:f,expandoStartIndex:h,hostBindingOpCodes:null,firstCreatePass:!0,firstUpdatePass:!0,staticViewQueries:!1,staticContentQueries:!1,preOrderHooks:null,preOrderCheckHooks:null,contentHooks:null,contentCheckHooks:null,viewHooks:null,viewCheckHooks:null,destroyHooks:null,cleanup:null,contentQueries:null,components:null,directiveRegistry:typeof o=="function"?o():o,pipeRegistry:typeof s=="function"?s():s,firstChild:null,schemas:l,consts:m,incompleteFirstPass:!1,ssrId:d}}function $0(t,n){let e=[];for(let i=0;i<n;i++)e.push(i<t?null:et);return e}function G0(t){let n=t.tView;return n===null||n.incompleteFirstPass?t.tView=jf(1,null,t.template,t.decls,t.vars,t.directiveDefs,t.pipeDefs,t.viewQuery,t.schemas,t.consts,t.id):n}function Hf(t,n,e,i,r,o,s,a,l,c,d){let f=n.blueprint.slice();return f[kt]=r,f[j]=i|4|128|8|64|1024,(c!==null||t&&t[j]&2048)&&(f[j]|=2048),fu(f),f[Fe]=f[xi]=t,f[xe]=e,f[Rt]=s||t&&t[Rt],f[me]=a||t&&t[me],f[on]=l||t&&t[on]||null,f[qe]=o,f[sn]=JE(),f[wi]=d,f[ou]=c,f[Ye]=n.type==2?t[Ye]:f,f}function W0(t,n,e){let i=Ft(n,t),r=G0(e),o=t[Rt].rendererFactory,s=Uf(t,Hf(t,r,null,Hv(e),i,n,null,o.createRenderer(i,e),null,null,null));return t[n.index]=s}function Hv(t){let n=16;return t.signals?n=4096:t.onPush&&(n=64),n}function Uv(t,n,e,i){if(e===0)return-1;let r=n.length;for(let o=0;o<e;o++)n.push(i),t.blueprint.push(i),t.data.push(null);return r}function Uf(t,n){return t[mr]?t[ru][mt]=n:t[mr]=n,t[ru]=n,n}function b(t=1){zv(De(),U(),Jt()+t,!1)}function zv(t,n,e,i){if(!i)if((n[j]&3)===3){let o=t.preOrderCheckHooks;o!==null&&nl(n,o,e)}else{let o=t.preOrderHooks;o!==null&&il(n,o,0,e)}Rn(e)}var Il=(function(t){return t[t.None=0]="None",t[t.SignalBased=1]="SignalBased",t[t.HasDecoratorInputTransform=2]="HasDecoratorInputTransform",t})(Il||{});function nf(t,n,e,i){let r=O(null);try{let[o,s,a]=t.inputs[e],l=null;(s&Il.SignalBased)!==0&&(l=n[o][Ne]),l!==null&&l.transformFn!==void 0?i=l.transformFn(i):a!==null&&(i=a.call(n,i)),t.setInput!==null?t.setInput(n,l,i,e,o):Jg(n,l,o,i)}finally{O(r)}}var tn=(function(t){return t[t.Important=1]="Important",t[t.DashCase=2]="DashCase",t})(tn||{}),q0;function zf(t,n){return q0(t,n)}var AV=typeof document<"u"&&typeof document?.documentElement?.getAnimations=="function";var rf=new WeakMap,No=new WeakSet;function Y0(t,n){let e=rf.get(t);if(!e||e.length===0)return;let i=n.parentNode,r=n.previousSibling;for(let o=e.length-1;o>=0;o--){let s=e[o],a=s.parentNode;s===n?(e.splice(o,1),No.add(s),s.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}}))):(r&&s===r||a&&i&&a!==i)&&(e.splice(o,1),s.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}})),s.parentNode?.removeChild(s))}}function Z0(t,n){let e=rf.get(t);e?e.includes(n)||e.push(n):rf.set(t,[n])}var Fi=new Set,Ml=(function(t){return t[t.CHANGE_DETECTION=0]="CHANGE_DETECTION",t[t.AFTER_NEXT_RENDER=1]="AFTER_NEXT_RENDER",t})(Ml||{}),Ut=new y(""),Ng=new Set;function Bi(t){Ng.has(t)||(Ng.add(t),performance?.mark?.("mark_feature_usage",{detail:{feature:t}}))}var Sl=(()=>{class t{impl=null;execute(){this.impl?.execute()}static \u0275prov=_({token:t,providedIn:"root",factory:()=>new t})}return t})(),$f=[0,1,2,3],Gf=(()=>{class t{ngZone=u(S);scheduler=u(Xt);errorHandler=u(Je,{optional:!0});sequences=new Set;deferredRegistrations=new Set;executing=!1;constructor(){u(Ut,{optional:!0})}execute(){let e=this.sequences.size>0;e&&ce(oe.AfterRenderHooksStart),this.executing=!0;for(let i of $f)for(let r of this.sequences)if(!(r.erroredOrDestroyed||!r.hooks[i]))try{r.pipelinedValue=this.ngZone.runOutsideAngular(()=>this.maybeTrace(()=>{let o=r.hooks[i];return o(r.pipelinedValue)},r.snapshot))}catch(o){r.erroredOrDestroyed=!0,this.errorHandler?.handleError(o)}this.executing=!1;for(let i of this.sequences)i.afterRun(),i.once&&(this.sequences.delete(i),i.destroy());for(let i of this.deferredRegistrations)this.sequences.add(i);this.deferredRegistrations.size>0&&this.scheduler.notify(7),this.deferredRegistrations.clear(),e&&ce(oe.AfterRenderHooksEnd)}register(e){let{view:i}=e;i!==void 0?((i[Mi]??=[]).push(e),Ai(i),i[j]|=8192):this.executing?this.deferredRegistrations.add(e):this.addSequence(e)}addSequence(e){this.sequences.add(e),this.scheduler.notify(7)}unregister(e){this.executing&&this.sequences.has(e)?(e.erroredOrDestroyed=!0,e.pipelinedValue=void 0,e.once=!0):(this.sequences.delete(e),this.deferredRegistrations.delete(e))}maybeTrace(e,i){return i?i.run(Ml.AFTER_NEXT_RENDER,e):e()}static \u0275prov=_({token:t,providedIn:"root",factory:()=>new t})}return t})(),Lo=class{impl;hooks;view;once;snapshot;erroredOrDestroyed=!1;pipelinedValue=void 0;unregisterOnDestroy;constructor(n,e,i,r,o,s=null){this.impl=n,this.hooks=e,this.view=i,this.once=r,this.snapshot=s,this.unregisterOnDestroy=o?.onDestroy(()=>this.destroy())}afterRun(){this.erroredOrDestroyed=!1,this.pipelinedValue=void 0,this.snapshot?.dispose(),this.snapshot=null}destroy(){this.impl.unregister(this),this.unregisterOnDestroy?.();let n=this.view?.[Mi];n&&(this.view[Mi]=n.filter(e=>e!==this))}};function $e(t,n){let e=n?.injector??u(P);return Bi("NgAfterNextRender"),X0(t,e,n,!0)}function Q0(t){return t instanceof Function?[void 0,void 0,t,void 0]:[t.earlyRead,t.write,t.mixedReadWrite,t.read]}function X0(t,n,e,i){let r=n.get(Sl);r.impl??=n.get(Gf);let o=n.get(Ut,null,{optional:!0}),s=e?.manualCleanup!==!0?n.get(Pt):null,a=n.get(_r,null,{optional:!0}),l=new Lo(r.impl,Q0(t),a?.view,i,s,o?.snapshot(null));return r.impl.register(l),l}var $v=new y("",{factory:()=>({queue:new Set,isScheduled:!1,scheduler:null,injector:u(we)})});function Gv(t,n,e){let i=t.get($v);if(Array.isArray(n))for(let r of n)i.queue.add(r),e?.detachedLeaveAnimationFns?.push(r);else i.queue.add(n),e?.detachedLeaveAnimationFns?.push(n);i.scheduler&&i.scheduler(t)}function K0(t,n){let e=t.get($v);if(n.detachedLeaveAnimationFns){for(let i of n.detachedLeaveAnimationFns)e.queue.delete(i);n.detachedLeaveAnimationFns=void 0}}function J0(t,n){for(let[e,i]of n)Gv(t,i.animateFns)}function Og(t,n,e,i){let r=t?.[An]?.enter;n!==null&&r&&r.has(e.index)&&J0(i,r)}function br(t,n,e,i,r,o,s,a){if(r!=null){let l,c=!1;Nt(r)?l=r:an(r)&&(c=!0,r=r[kt]);let d=gt(r);t===0&&i!==null?(Og(a,i,o,e),s==null?Fv(n,i,d):pl(n,i,d,s||null,!0)):t===1&&i!==null?(Og(a,i,o,e),pl(n,i,d,s||null,!0),Y0(o,d)):t===2?(a?.[An]?.leave?.has(o.index)&&Z0(o,d),No.delete(d),Fg(a,o,e,f=>{if(No.has(d)){No.delete(d);return}Pv(n,d,c,f)})):t===3&&(No.delete(d),Fg(a,o,e,()=>{n.destroyNode(d)})),l!=null&&dw(n,t,e,l,o,i,s)}}function ew(t,n){Wv(t,n),n[kt]=null,n[qe]=null}function tw(t,n,e,i,r,o){i[kt]=r,i[qe]=n,Al(t,i,e,1,r,o)}function Wv(t,n){n[Rt].changeDetectionScheduler?.notify(9),Al(t,n,n[me],2,null,null)}function nw(t){let n=t[mr];if(!n)return Ou(t[N],t);for(;n;){let e=null;if(an(n))e=n[mr];else{let i=n[Ee];i&&(e=i)}if(!e){for(;n&&!n[mt]&&n!==t;)an(n)&&Ou(n[N],n),n=n[Fe];n===null&&(n=t),an(n)&&Ou(n[N],n),e=n&&n[mt]}n=e}}function Wf(t,n){let e=t[Si],i=e.indexOf(n);e.splice(i,1)}function Tl(t,n){if(Ti(n))return;let e=n[me];e.destroyNode&&Al(t,n,e,3,null,null),nw(n)}function Ou(t,n){if(Ti(n))return;let e=O(null);try{n[j]&=-129,n[j]|=256,n[dt]&&Cn(n[dt]),ow(t,n),rw(t,n),n[N].type===1&&n[me].destroy();let i=n[Tn];if(i!==null&&Nt(n[Fe])){i!==n[Fe]&&Wf(i,n);let r=n[Kt];r!==null&&r.detachView(t)}Gu(n)}finally{O(e)}}function Fg(t,n,e,i){let r=t?.[An];if(r==null||r.leave==null||!r.leave.has(n.index))return i(!1);t&&Fi.add(t[sn]),Gv(e,()=>{if(r.leave&&r.leave.has(n.index)){let s=r.leave.get(n.index),a=[];if(s){for(let l=0;l<s.animateFns.length;l++){let c=s.animateFns[l],{promise:d}=c();a.push(d)}r.detachedLeaveAnimationFns=void 0}r.running=Promise.allSettled(a),iw(t,i)}else t&&Fi.delete(t[sn]),i(!1)},r)}function iw(t,n){let e=t[An]?.running;if(e){e.then(()=>{t[An].running=void 0,Fi.delete(t[sn]),n(!0)});return}n(!1)}function rw(t,n){let e=t.cleanup,i=n[hr];if(e!==null)for(let s=0;s<e.length-1;s+=2)if(typeof e[s]=="string"){let a=e[s+3];a>=0?i[a]():i[-a].unsubscribe(),s+=2}else{let a=i[e[s+1]];e[s].call(a)}i!==null&&(n[hr]=null);let r=n[rn];if(r!==null){n[rn]=null;for(let s=0;s<r.length;s++){let a=r[s];a()}}let o=n[xn];if(o!==null){n[xn]=null;for(let s of o)s.destroy()}}function ow(t,n){let e;if(t!=null&&(e=t.destroyHooks)!=null)for(let i=0;i<e.length;i+=2){let r=n[e[i]];if(!(r instanceof Oi)){let o=e[i+1];if(Array.isArray(o))for(let s=0;s<o.length;s+=2){let a=r[o[s]],l=o[s+1];ce(oe.LifecycleHookStart,a,l);try{l.call(a)}finally{ce(oe.LifecycleHookEnd,a,l)}}else{ce(oe.LifecycleHookStart,r,o);try{o.call(r)}finally{ce(oe.LifecycleHookEnd,r,o)}}}}}function qv(t,n,e){return sw(t,n.parent,e)}function sw(t,n,e){let i=n;for(;i!==null&&i.type&168;)n=i,i=n.parent;if(i===null)return e[kt];if(ln(i)){let{encapsulation:r}=t.data[i.directiveStart+i.componentOffset];if(r===Bt.None||r===Bt.Emulated)return null}return Ft(i,e)}function Yv(t,n,e){return lw(t,n,e)}function aw(t,n,e){return t.type&40?Ft(t,e):null}var lw=aw,Pg;function qf(t,n,e,i){let r=qv(t,i,n),o=n[me],s=i.parent||n[qe],a=Yv(s,i,n);if(r!=null)if(Array.isArray(e))for(let l=0;l<e.length;l++)kg(o,r,e[l],a,!1);else kg(o,r,e,a,!1);Pg!==void 0&&Pg(o,i,n,e,r)}function Oo(t,n){if(n!==null){let e=n.type;if(e&3)return Ft(n,t);if(e&4)return of(-1,t[n.index]);if(e&8){let i=n.child;if(i!==null)return Oo(t,i);{let r=t[n.index];return Nt(r)?of(-1,r):gt(r)}}else{if(e&128)return Oo(t,n.next);if(e&32)return zf(n,t)()||gt(t[n.index]);{let i=Zv(t,n);if(i!==null){if(Array.isArray(i))return i[0];let r=In(t[Ye]);return Oo(r,i)}else return Oo(t,n.next)}}}return null}function Zv(t,n){if(n!==null){let i=t[Ye][qe],r=n.projection;return i.projection[r]}return null}function of(t,n){let e=Ee+t+1;if(e<n.length){let i=n[e],r=i[N].firstChild;if(r!==null)return Oo(i,r)}return n[kn]}function Yf(t,n,e,i,r,o,s){for(;e!=null;){let a=i[on];if(e.type===128){e=e.next;continue}let l=i[e.index],c=e.type;if(s&&n===0&&(l&&Er(gt(l),i),e.flags|=2),!Cl(e))if(c&8)Yf(t,n,e.child,i,r,o,!1),br(n,t,a,r,l,e,o,i);else if(c&32){let d=zf(e,i),f;for(;f=d();)br(n,t,a,r,f,e,o,i);br(n,t,a,r,l,e,o,i)}else c&16?Qv(t,n,i,e,r,o):br(n,t,a,r,l,e,o,i);e=s?e.projectionNext:e.next}}function Al(t,n,e,i,r,o){Yf(e,i,t.firstChild,n,r,o,!1)}function cw(t,n,e){let i=n[me],r=qv(t,e,n),o=e.parent||n[qe],s=Yv(o,e,n);Qv(i,0,n,e,r,s)}function Qv(t,n,e,i,r,o){let s=e[Ye],l=s[qe].projection[i.projection];if(Array.isArray(l))for(let c=0;c<l.length;c++){let d=l[c];br(n,t,e[on],r,d,i,o,e)}else{let c=l,d=s[Fe];gv(i)&&(c.flags|=128),Yf(t,n,c,d,r,o,!0)}}function dw(t,n,e,i,r,o,s){let a=i[kn],l=gt(i);a!==l&&br(n,t,e,o,a,r,s);for(let c=Ee;c<i.length;c++){let d=i[c];Al(d[N],d,t,n,o,a)}}function uw(t,n,e,i,r){if(n)r?t.addClass(e,i):t.removeClass(e,i);else{let o=i.indexOf("-")===-1?void 0:tn.DashCase;r==null?t.removeStyle(e,i,o):(typeof r=="string"&&r.endsWith("!important")&&(r=r.slice(0,-10),o|=tn.Important),t.setStyle(e,i,r,o))}}function Xv(t,n,e,i,r){let o=Jt(),s=i&2;try{Rn(-1),s&&n.length>be&&zv(t,n,be,!1);let a=s?oe.TemplateUpdateStart:oe.TemplateCreateStart;ce(a,r,e),e(i,r)}finally{Rn(o);let a=s?oe.TemplateUpdateEnd:oe.TemplateCreateEnd;ce(a,r,e)}}function kl(t,n,e){yw(t,n,e),(e.flags&64)===64&&_w(t,n,e)}function qo(t,n,e=Ft){let i=n.localNames;if(i!==null){let r=n.index+1;for(let o=0;o<i.length;o+=2){let s=i[o+1],a=s===-1?e(n,t):t[s];t[r++]=a}}}function fw(t,n,e,i){let o=i.get(xv,wv)||e===Bt.ShadowDom||e===Bt.ExperimentalIsolatedShadowDom,s=t.selectRootElement(n,o);return pw(s),s}function pw(t){hw(t)}var hw=()=>null;function mw(t){return t==="class"?"className":t==="for"?"htmlFor":t==="formaction"?"formAction":t==="innerHtml"?"innerHTML":t==="readonly"?"readOnly":t==="tabindex"?"tabIndex":t}function gw(t,n,e,i,r,o){let s=n[N];if(Kf(t,s,n,e,i)){ln(t)&&vw(n,t.index);return}t.type&3&&(e=mw(e)),Kv(t,n,e,i,r,o)}function Kv(t,n,e,i,r,o){if(t.type&3){let s=Ft(t,n);i=o!=null?o(i,t.value||"",e):i,r.setProperty(s,e,i)}else t.type&12}function vw(t,n){let e=vt(n,t);e[j]&16||(e[j]|=64)}function yw(t,n,e){let i=e.directiveStart,r=e.directiveEnd;ln(e)&&W0(n,e,t.data[i+e.componentOffset]),t.firstCreatePass||ul(e,n);let o=e.initialInputs;for(let s=i;s<r;s++){let a=t.data[s],l=Po(n,t,s,e);if(Er(l,n),o!==null&&Ew(n,s-i,l,a,e,o),Ot(a)){let c=vt(e.index,n);c[xe]=Po(n,t,s,e)}}}function _w(t,n,e){let i=e.directiveStart,r=e.directiveEnd,o=e.index,s=ig();try{Rn(o);for(let a=i;a<r;a++){let l=t.data[a],c=n[a];za(a),(l.hostBindings!==null||l.hostVars!==0||l.hostAttrs!==null)&&bw(l,c)}}finally{Rn(-1),za(s)}}function bw(t,n){t.hostBindings!==null&&t.hostBindings(1,n)}function Zf(t,n){let e=t.directiveRegistry,i=null;if(e)for(let r=0;r<e.length;r++){let o=e[r];jv(n,o.selectors,!1)&&(i??=[],Ot(o)?i.unshift(o):i.push(o))}return i}function Dw(t,n,e,i,r,o){let s=Ft(t,n);Cw(n[me],s,o,t.value,e,i,r)}function Cw(t,n,e,i,r,o,s){if(o==null)t.removeAttribute(n,r,e);else{let a=s==null?Di(o):s(o,i||"",r);t.setAttribute(n,r,a,e)}}function Ew(t,n,e,i,r,o){let s=o[n];if(s!==null)for(let a=0;a<s.length;a+=2){let l=s[a],c=s[a+1];nf(i,e,l,c)}}function Qf(t,n,e,i,r){let o=be+e,s=n[N],a=r(s,n,t,i,e);n[o]=a,yr(t,!0);let l=t.type===2;return l?(Lv(n[me],a,t),(Ym()===0||gr(t))&&Er(a,n),Zm()):Er(a,n),Za()&&(!l||!Cl(t))&&qf(s,n,a,t),t}function Xf(t){let n=t;return Cu()?Eu():(n=n.parent,yr(n,!1)),n}function ww(t,n){let e=t[on];if(!e)return;let i;try{i=e.get(cn,null)}catch{i=null}i?.(n)}function Kf(t,n,e,i,r){let o=t.inputs?.[i],s=t.hostDirectiveInputs?.[i],a=!1;if(s)for(let l=0;l<s.length;l+=2){let c=s[l],d=s[l+1],f=n.data[c];nf(f,e[c],d,r),a=!0}if(o)for(let l of o){let c=e[l],d=n.data[l];nf(d,c,i,r),a=!0}return a}function xw(t,n){let e=vt(n,t),i=e[N];Iw(i,e);let r=e[kt];r!==null&&e[wi]===null&&(e[wi]=Iv(r,e[on])),ce(oe.ComponentStart);try{Jf(i,e,e[xe])}finally{ce(oe.ComponentEnd,e[xe])}}function Iw(t,n){for(let e=n.length;e<t.blueprint.length;e++)n.push(t.blueprint[e])}function Jf(t,n,e){Ga(n);try{let i=t.viewQuery;i!==null&&qu(1,i,e);let r=t.template;r!==null&&Xv(t,n,r,1,e),t.firstCreatePass&&(t.firstCreatePass=!1),n[Kt]?.finishViewCreation(t),t.staticContentQueries&&Mv(t,n),t.staticViewQueries&&qu(2,t.viewQuery,e);let o=t.components;o!==null&&Mw(n,o)}catch(i){throw t.firstCreatePass&&(t.incompleteFirstPass=!0,t.firstCreatePass=!1),i}finally{n[j]&=-5,Wa()}}function Mw(t,n){for(let e=0;e<n.length;e++)xw(t,n[e])}function Yo(t,n,e,i){let r=O(null);try{let o=n.tView,a=t[j]&4096?4096:16,l=Hf(t,o,e,a,null,n,null,null,i?.injector??null,i?.embeddedViewInjector??null,i?.dehydratedView??null),c=t[n.index];l[Tn]=c;let d=t[Kt];return d!==null&&(l[Kt]=d.createEmbeddedView(o)),Jf(o,l,e),l}finally{O(r)}}function wr(t,n){return!n||n.firstChild===null||gv(t)}function Vo(t,n,e,i,r=!1){for(;e!==null;){if(e.type===128){e=r?e.projectionNext:e.next;continue}let o=n[e.index];o!==null&&i.push(gt(o)),Nt(o)&&Jv(o,i);let s=e.type;if(s&8)Vo(t,n,e.child,i);else if(s&32){let a=zf(e,n),l;for(;l=a();)i.push(l)}else if(s&16){let a=Zv(n,e);if(Array.isArray(a))i.push(...a);else{let l=In(n[Ye]);Vo(l[N],l,a,i,!0)}}e=r?e.projectionNext:e.next}return i}function Jv(t,n){for(let e=Ee;e<t.length;e++){let i=t[e],r=i[N].firstChild;r!==null&&Vo(i[N],i,r,n)}t[kn]!==t[kt]&&n.push(t[kn])}function ey(t){if(t[Mi]!==null){for(let n of t[Mi])n.impl.addSequence(n);t[Mi].length=0}}var ty=[];function Sw(t){return t[dt]??Tw(t)}function Tw(t){let n=ty.pop()??Object.create(kw);return n.lView=t,n}function Aw(t){t.lView[dt]!==t&&(t.lView=null,ty.push(t))}var kw=J(D({},si),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:t=>{Ai(t.lView)},consumerOnSignalRead(){this.lView[dt]=this}});function Rw(t){let n=t[dt]??Object.create(Nw);return n.lView=t,n}var Nw=J(D({},si),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:t=>{let n=In(t.lView);for(;n&&!ny(n[N]);)n=In(n);n&&pu(n)},consumerOnSignalRead(){this.lView[dt]=this}});function ny(t){return t.type!==2}function iy(t){if(t[xn]===null)return;let n=!0;for(;n;){let e=!1;for(let i of t[xn])i.dirty&&(e=!0,i.zone===null||Zone.current===i.zone?i.run():i.zone.run(()=>i.run()));n=e&&!!(t[j]&8192)}}var Ow=100;function ry(t,n=0){let i=t[Rt].rendererFactory,r=!1;r||i.begin?.();try{Fw(t,n)}finally{r||i.end?.()}}function Fw(t,n){let e=wu();try{Co(!0),sf(t,n);let i=0;for(;So(t);){if(i===Ow)throw new A(103,!1);i++,sf(t,1)}}finally{Co(e)}}function Pw(t,n,e,i){if(Ti(n))return;let r=n[j],o=!1,s=!1;Ga(n);let a=!0,l=null,c=null;o||(ny(t)?(c=Sw(n),l=Dn(c)):Vs()===null?(a=!1,c=Rw(n),l=Dn(c)):n[dt]&&(Cn(n[dt]),n[dt]=null));try{fu(n),eg(t.bindingStartIndex),e!==null&&Xv(t,n,e,2,i);let d=(r&3)===3;if(!o)if(d){let p=t.preOrderCheckHooks;p!==null&&nl(n,p,null)}else{let p=t.preOrderHooks;p!==null&&il(n,p,0,null),Ru(n,0)}if(s||Lw(n),iy(n),oy(n,0),t.contentQueries!==null&&Mv(t,n),!o)if(d){let p=t.contentCheckHooks;p!==null&&nl(n,p)}else{let p=t.contentHooks;p!==null&&il(n,p,1),Ru(n,1)}Bw(t,n);let f=t.components;f!==null&&ay(n,f,0);let h=t.viewQuery;if(h!==null&&qu(2,h,i),!o)if(d){let p=t.viewCheckHooks;p!==null&&nl(n,p)}else{let p=t.viewHooks;p!==null&&il(n,p,2),Ru(n,2)}if(t.firstUpdatePass===!0&&(t.firstUpdatePass=!1),n[La]){for(let p of n[La])p();n[La]=null}o||(ey(n),n[j]&=-73)}catch(d){throw o||Ai(n),d}finally{c!==null&&(li(c,l),a&&Aw(c)),Wa()}}function oy(t,n){for(let e=yv(t);e!==null;e=_v(e))for(let i=Ee;i<e.length;i++){let r=e[i];sy(r,n)}}function Lw(t){for(let n=yv(t);n!==null;n=_v(n)){if(!(n[j]&2))continue;let e=n[Si];for(let i=0;i<e.length;i++){let r=e[i];pu(r)}}}function Vw(t,n,e){ce(oe.ComponentStart);let i=vt(n,t);try{sy(i,e)}finally{ce(oe.ComponentEnd,i[xe])}}function sy(t,n){Ba(t)&&sf(t,n)}function sf(t,n){let i=t[N],r=t[j],o=t[dt],s=!!(n===0&&r&16);if(s||=!!(r&64&&n===0),s||=!!(r&1024),s||=!!(o?.dirty&&Ki(o)),s||=!1,o&&(o.dirty=!1),t[j]&=-9217,s)Pw(i,t,i.template,t[xe]);else if(r&8192){let a=O(null);try{iy(t),oy(t,1);let l=i.components;l!==null&&ay(t,l,1),ey(t)}finally{O(a)}}}function ay(t,n,e){for(let i=0;i<n.length;i++)Vw(t,n[i],e)}function Bw(t,n){let e=t.hostBindingOpCodes;if(e!==null)try{for(let i=0;i<e.length;i++){let r=e[i];if(r<0)Rn(~r);else{let o=r,s=e[++i],a=e[++i];ng(s,o);let l=n[o];ce(oe.HostBindingsUpdateStart,l);try{a(2,l)}finally{ce(oe.HostBindingsUpdateEnd,l)}}}}finally{Rn(-1)}}function ep(t,n){let e=wu()?64:1088;for(t[Rt].changeDetectionScheduler?.notify(n);t;){t[j]|=e;let i=In(t);if(vr(t)&&!i)return t;t=i}return null}function ly(t,n,e,i){return[t,!0,0,n,null,i,null,e,null,null]}function cy(t,n){let e=Ee+n;if(e<t.length)return t[e]}function Zo(t,n,e,i=!0){let r=n[N];if(jw(r,n,t,e),i){let s=of(e,t),a=n[me],l=a.parentNode(t[kn]);l!==null&&tw(r,t[qe],a,n,l,s)}let o=n[wi];o!==null&&o.firstChild!==null&&(o.firstChild=null)}function dy(t,n){let e=Bo(t,n);return e!==void 0&&Tl(e[N],e),e}function Bo(t,n){if(t.length<=Ee)return;let e=Ee+n,i=t[e];if(i){let r=i[Tn];r!==null&&r!==t&&Wf(r,i),n>0&&(t[e-1][mt]=i[mt]);let o=xo(t,Ee+n);ew(i[N],i);let s=o[Kt];s!==null&&s.detachView(o[N]),i[Fe]=null,i[mt]=null,i[j]&=-129}return i}function jw(t,n,e,i){let r=Ee+i,o=e.length;i>0&&(e[r-1][mt]=n),i<o-Ee?(n[mt]=e[r],Kd(e,Ee+i,n)):(e.push(n),n[mt]=null),n[Fe]=e;let s=n[Tn];s!==null&&e!==s&&uy(s,n);let a=n[Kt];a!==null&&a.insertView(t),ja(n),n[j]|=128}function uy(t,n){let e=t[Si],i=n[Fe];if(an(i))t[j]|=2;else{let r=i[Fe][Ye];n[Ye]!==r&&(t[j]|=2)}e===null?t[Si]=[n]:e.push(n)}var On=class{_lView;_cdRefInjectingView;_appRef=null;_attachedToViewContainer=!1;exhaustive;get rootNodes(){let n=this._lView,e=n[N];return Vo(e,n,e.firstChild,[])}constructor(n,e){this._lView=n,this._cdRefInjectingView=e}get context(){return this._lView[xe]}set context(n){this._lView[xe]=n}get destroyed(){return Ti(this._lView)}destroy(){if(this._appRef)this._appRef.detachView(this);else if(this._attachedToViewContainer){let n=this._lView[Fe];if(Nt(n)){let e=n[Mo],i=e?e.indexOf(this):-1;i>-1&&(Bo(n,i),xo(e,i))}this._attachedToViewContainer=!1}Tl(this._lView[N],this._lView)}onDestroy(n){hu(this._lView,n)}markForCheck(){ep(this._cdRefInjectingView||this._lView,4)}detach(){this._lView[j]&=-129}reattach(){ja(this._lView),this._lView[j]|=128}detectChanges(){this._lView[j]|=1024,ry(this._lView)}checkNoChanges(){}attachToViewContainerRef(){if(this._appRef)throw new A(902,!1);this._attachedToViewContainer=!0}detachFromAppRef(){this._appRef=null;let n=vr(this._lView),e=this._lView[Tn];e!==null&&!n&&Wf(e,this._lView),Wv(this._lView[N],this._lView)}attachToAppRef(n){if(this._attachedToViewContainer)throw new A(902,!1);this._appRef=n;let e=vr(this._lView),i=this._lView[Tn];i!==null&&!e&&uy(i,this._lView),ja(this._lView)}};var ut=(()=>{class t{_declarationLView;_declarationTContainer;elementRef;static __NG_ELEMENT_ID__=Hw;constructor(e,i,r){this._declarationLView=e,this._declarationTContainer=i,this.elementRef=r}get ssrId(){return this._declarationTContainer.tView?.ssrId||null}createEmbeddedView(e,i){return this.createEmbeddedViewImpl(e,i)}createEmbeddedViewImpl(e,i,r){let o=Yo(this._declarationLView,this._declarationTContainer,e,{embeddedViewInjector:i,dehydratedView:r});return new On(o)}}return t})();function Hw(){return Rl(Be(),U())}function Rl(t,n){return t.type&4?new ut(n,t,Mr(t,n)):null}function Sr(t,n,e,i,r){let o=t.data[n];if(o===null)o=Uw(t,n,e,i,r),tg()&&(o.flags|=32);else if(o.type&64){o.type=e,o.value=i,o.attrs=r;let s=Qm();o.injectorIndex=s===null?-1:s.injectorIndex}return yr(o,!0),o}function Uw(t,n,e,i,r){let o=Du(),s=Cu(),a=s?o:o&&o.parent,l=t.data[n]=$w(t,a,e,n,i,r);return zw(t,l,o,s),l}function zw(t,n,e,i){t.firstChild===null&&(t.firstChild=n),e!==null&&(i?e.child==null&&n.parent!==null&&(e.child=n):e.next===null&&(e.next=n,n.prev=e))}function $w(t,n,e,i,r,o){let s=n?n.injectorIndex:-1,a=0;return yu()&&(a|=128),{type:e,index:i,insertBeforeIndex:null,injectorIndex:s,directiveStart:-1,directiveEnd:-1,directiveStylingLast:-1,componentOffset:-1,controlDirectiveIndex:-1,customControlIndex:-1,propertyBindings:null,flags:a,providerIndexes:0,value:r,attrs:o,mergedAttrs:null,localNames:null,initialInputs:null,inputs:null,hostDirectiveInputs:null,outputs:null,hostDirectiveOutputs:null,directiveToIndex:null,tView:null,next:null,prev:null,projectionNext:null,child:null,parent:n,projection:null,styles:null,stylesWithoutHost:null,residualStyles:void 0,classes:null,classesWithoutHost:null,residualClasses:void 0,classBindings:0,styleBindings:0}}function Gw(t){let n=t[su]??[],i=t[Fe][me],r=[];for(let o of n)o.data[Ev]!==void 0?r.push(o):Ww(o,i);t[su]=r}function Ww(t,n){let e=0,i=t.firstChild;if(i){let r=t.data[Cv];for(;e<r;){let o=i.nextSibling;Pv(n,i,!1),i=o,e++}}}var qw=()=>null,Yw=()=>null;function hl(t,n){return qw(t,n)}function fy(t,n,e){return Yw(t,n,e)}var py=class{},Nl=class{},af=class{resolveComponentFactory(n){throw new A(917,!1)}},Ol=class{static NULL=new af},Te=class{},Ae=(()=>{class t{destroyNode=null;static __NG_ELEMENT_ID__=()=>Zw()}return t})();function Zw(){let t=U(),n=Be(),e=vt(n.index,t);return(an(e)?e:t)[me]}var hy=(()=>{class t{static \u0275prov=_({token:t,providedIn:"root",factory:()=>null})}return t})();var ol={},lf=class{injector;parentInjector;constructor(n,e){this.injector=n,this.parentInjector=e}get(n,e,i){let r=this.injector.get(n,ol,i);return r!==ol||e===ol?r:this.parentInjector.get(n,e,i)}};function ml(t,n,e){let i=e?t.styles:null,r=e?t.classes:null,o=0;if(n!==null)for(let s=0;s<n.length;s++){let a=n[s];if(typeof a=="number")o=a;else if(o==1)r=Ta(r,a);else if(o==2){let l=a,c=n[++s];i=Ta(i,l+": "+c+";")}}e?t.styles=i:t.stylesWithoutHost=i,e?t.classes=r:t.classesWithoutHost=r}function W(t,n=0){let e=U();if(e===null)return I(t,n);let i=Be();return fv(i,e,Oe(t),n)}function my(t,n,e,i,r){let o=i===null?null:{"":-1},s=r(t,e);if(s!==null){let a=s,l=null,c=null;for(let d of s)if(d.resolveHostDirectives!==null){[a,l,c]=d.resolveHostDirectives(s);break}Kw(t,n,e,a,o,l,c)}o!==null&&i!==null&&Qw(e,i,o)}function Qw(t,n,e){let i=t.localNames=[];for(let r=0;r<n.length;r+=2){let o=e[n[r+1]];if(o==null)throw new A(-301,!1);i.push(n[r],o)}}function Xw(t,n,e){n.componentOffset=e,(t.components??=[]).push(n.index)}function Kw(t,n,e,i,r,o,s){let a=i.length,l=null;for(let h=0;h<a;h++){let p=i[h];l===null&&Ot(p)&&(l=p,Xw(t,e,h)),zu(ul(e,n),t,p.type)}rx(e,t.data.length,a),l?.viewProvidersResolver&&l.viewProvidersResolver(l);for(let h=0;h<a;h++){let p=i[h];p.providersResolver&&p.providersResolver(p)}let c=!1,d=!1,f=Uv(t,n,a,null);a>0&&(e.directiveToIndex=new Map);for(let h=0;h<a;h++){let p=i[h];if(e.mergedAttrs=Cr(e.mergedAttrs,p.hostAttrs),ex(t,e,n,f,p),ix(f,p,r),s!==null&&s.has(p)){let[C,x]=s.get(p);e.directiveToIndex.set(p.type,[f,C+e.directiveStart,x+e.directiveStart])}else(o===null||!o.has(p))&&e.directiveToIndex.set(p.type,f);p.contentQueries!==null&&(e.flags|=4),(p.hostBindings!==null||p.hostAttrs!==null||p.hostVars!==0)&&(e.flags|=64);let m=p.type.prototype;!c&&(m.ngOnChanges||m.ngOnInit||m.ngDoCheck)&&((t.preOrderHooks??=[]).push(e.index),c=!0),!d&&(m.ngOnChanges||m.ngDoCheck)&&((t.preOrderCheckHooks??=[]).push(e.index),d=!0),f++}Jw(t,e,o)}function Jw(t,n,e){for(let i=n.directiveStart;i<n.directiveEnd;i++){let r=t.data[i];if(e===null||!e.has(r))Lg(0,n,r,i),Lg(1,n,r,i),Bg(n,i,!1);else{let o=e.get(r);Vg(0,n,o,i),Vg(1,n,o,i),Bg(n,i,!0)}}}function Lg(t,n,e,i){let r=t===0?e.inputs:e.outputs;for(let o in r)if(r.hasOwnProperty(o)){let s;t===0?s=n.inputs??={}:s=n.outputs??={},s[o]??=[],s[o].push(i),gy(n,o)}}function Vg(t,n,e,i){let r=t===0?e.inputs:e.outputs;for(let o in r)if(r.hasOwnProperty(o)){let s=r[o],a;t===0?a=n.hostDirectiveInputs??={}:a=n.hostDirectiveOutputs??={},a[s]??=[],a[s].push(i,o),gy(n,s)}}function gy(t,n){n==="class"?t.flags|=8:n==="style"&&(t.flags|=16)}function Bg(t,n,e){let{attrs:i,inputs:r,hostDirectiveInputs:o}=t;if(i===null||!e&&r===null||e&&o===null||Bf(t)){t.initialInputs??=[],t.initialInputs.push(null);return}let s=null,a=0;for(;a<i.length;){let l=i[a];if(l===0){a+=4;continue}else if(l===5){a+=2;continue}else if(typeof l=="number")break;if(!e&&r.hasOwnProperty(l)){let c=r[l];for(let d of c)if(d===n){s??=[],s.push(l,i[a+1]);break}}else if(e&&o.hasOwnProperty(l)){let c=o[l];for(let d=0;d<c.length;d+=2)if(c[d]===n){s??=[],s.push(c[d+1],i[a+1]);break}}a+=2}t.initialInputs??=[],t.initialInputs.push(s)}function ex(t,n,e,i,r){t.data[i]=r;let o=r.factory||(r.factory=wn(r.type,!0)),s=new Oi(o,Ot(r),W,null);t.blueprint[i]=s,e[i]=s,tx(t,n,i,Uv(t,e,r.hostVars,et),r)}function tx(t,n,e,i,r){let o=r.hostBindings;if(o){let s=t.hostBindingOpCodes;s===null&&(s=t.hostBindingOpCodes=[]);let a=~n.index;nx(s)!=a&&s.push(a),s.push(e,i,o)}}function nx(t){let n=t.length;for(;n>0;){let e=t[--n];if(typeof e=="number"&&e<0)return e}return 0}function ix(t,n,e){if(e){if(n.exportAs)for(let i=0;i<n.exportAs.length;i++)e[n.exportAs[i]]=t;Ot(n)&&(e[""]=t)}}function rx(t,n,e){t.flags|=1,t.directiveStart=n,t.directiveEnd=n+e,t.providerIndexes=n}function tp(t,n,e,i,r,o,s,a){let l=n[N],c=l.consts,d=yt(c,s),f=Sr(l,t,e,i,d);return o&&my(l,n,f,yt(c,a),r),f.mergedAttrs=Cr(f.mergedAttrs,f.attrs),f.attrs!==null&&ml(f,f.attrs,!1),f.mergedAttrs!==null&&ml(f,f.mergedAttrs,!0),l.queries!==null&&l.queries.elementStart(l,f),f}function np(t,n){iv(t,n),au(n)&&t.queries.elementEnd(n)}function ox(t,n,e,i,r,o){let s=n.consts,a=yt(s,r),l=Sr(n,t,e,i,a);if(l.mergedAttrs=Cr(l.mergedAttrs,l.attrs),o!=null){let c=yt(s,o);l.localNames=[];for(let d=0;d<c.length;d+=2)l.localNames.push(c[d],-1)}return l.attrs!==null&&ml(l,l.attrs,!1),l.mergedAttrs!==null&&ml(l,l.mergedAttrs,!0),n.queries!==null&&n.queries.elementStart(n,l),l}function sx(t,n,e){return t[n]=e}function jt(t,n,e){if(e===et)return!1;let i=t[n];return Object.is(i,e)?!1:(t[n]=e,!0)}function ax(t,n,e,i){let r=jt(t,n,e);return jt(t,n+1,i)||r}function sl(t,n,e){return function i(r){let o=ln(t)?vt(t.index,n):n;ep(o,5);let s=n[xe],a=jg(n,s,e,r),l=i.__ngNextListenerFn__;for(;l;)a=jg(n,s,l,r)&&a,l=l.__ngNextListenerFn__;return a}}function jg(t,n,e,i){let r=O(null);try{return ce(oe.OutputStart,n,e),e(i)!==!1}catch(o){return ww(t,o),!1}finally{ce(oe.OutputEnd,n,e),O(r)}}function vy(t,n,e,i,r,o,s,a){let l=gr(t),c=!1,d=null;if(!i&&l&&(d=cx(n,e,o,t.index)),d!==null){let f=d.__ngLastListenerFn__||d;f.__ngNextListenerFn__=s,d.__ngLastListenerFn__=s,c=!0}else{let f=Ft(t,e),h=i?i(f):f;i0(e,h,o,a);let p=r.listen(h,o,a);if(!lx(o)){let m=i?C=>i(gt(C[t.index])):t.index;yy(m,n,e,o,a,p,!1)}}return c}function lx(t){return t.startsWith("animation")||t.startsWith("transition")}function cx(t,n,e,i){let r=t.cleanup;if(r!=null)for(let o=0;o<r.length-1;o+=2){let s=r[o];if(s===e&&r[o+1]===i){let a=n[hr],l=r[o+2];return a&&a.length>l?a[l]:null}typeof s=="string"&&(o+=2)}return null}function yy(t,n,e,i,r,o,s){let a=n.firstCreatePass?gu(n):null,l=mu(e),c=l.length;l.push(r,o),a&&a.push(i,t,c,(c+1)*(s?-1:1))}function Hg(t,n,e,i,r,o){let s=n[e],a=n[N],c=a.data[e].outputs[i],f=s[c].subscribe(o);yy(t.index,a,n,r,o,f,!0)}var cf=Symbol("BINDING");function _y(t){return t.debugInfo?.className||t.type.name||null}var df=class extends Ol{ngModule;constructor(n){super(),this.ngModule=n}resolveComponentFactory(n){let e=Sn(n);return new xr(e,this.ngModule)}};function dx(t){return Object.keys(t).map(n=>{let[e,i,r]=t[n],o={propName:e,templateName:n,isSignal:(i&Il.SignalBased)!==0};return r&&(o.transform=r),o})}function ux(t){return Object.keys(t).map(n=>({propName:t[n],templateName:n}))}function fx(t,n,e){let i=n instanceof we?n:n?.injector;return i&&t.getStandaloneInjector!==null&&(i=t.getStandaloneInjector(i)||i),i?new lf(e,i):e}function px(t){let n=t.get(Te,null);if(n===null)throw new A(407,!1);let e=t.get(hy,null),i=t.get(Xt,null),r=t.get(Ut,null,{optional:!0});return{rendererFactory:n,sanitizer:e,changeDetectionScheduler:i,ngReflect:!1,tracingService:r}}function hx(t,n){let e=by(t);return Ov(n,e,e==="svg"?lu:e==="math"?Um:null)}function by(t){return(t.selectors[0][0]||"div").toLowerCase()}var xr=class extends Nl{componentDef;ngModule;selector;componentType;ngContentSelectors;isBoundToModule;cachedInputs=null;cachedOutputs=null;get inputs(){return this.cachedInputs??=dx(this.componentDef.inputs),this.cachedInputs}get outputs(){return this.cachedOutputs??=ux(this.componentDef.outputs),this.cachedOutputs}constructor(n,e){super(),this.componentDef=n,this.ngModule=e,this.componentType=n.type,this.selector=U0(n.selectors),this.ngContentSelectors=n.ngContentSelectors??[],this.isBoundToModule=!!e}create(n,e,i,r,o,s){ce(oe.DynamicComponentStart);let a=O(null);try{let l=this.componentDef,c=fx(l,r||this.ngModule,n),d=px(c),f=d.tracingService;return f&&f.componentCreate?f.componentCreate(_y(l),()=>this.createComponentRef(d,c,e,i,o,s)):this.createComponentRef(d,c,e,i,o,s)}finally{O(a)}}createComponentRef(n,e,i,r,o,s){let a=this.componentDef,l=mx(r,a,s,o),c=n.rendererFactory.createRenderer(null,a),d=r?fw(c,r,a.encapsulation,e):hx(a,c),f=s?.some(Ug)||o?.some(m=>typeof m!="function"&&m.bindings.some(Ug)),h=Hf(null,l,null,512|Hv(a),null,null,n,c,e,null,Iv(d,e,!0));h[be]=d,Ga(h);let p=null;try{let m=tp(be,h,2,"#host",()=>l.directiveRegistry,!0,0);Lv(c,d,m),Er(d,h),kl(l,h,m),Rf(l,m,h),np(l,m),i!==void 0&&vx(m,this.ngContentSelectors,i),p=vt(m.index,h),h[xe]=p[xe],Jf(l,h,null)}catch(m){throw p!==null&&Gu(p),Gu(h),m}finally{ce(oe.DynamicComponentEnd),Wa()}return new gl(this.componentType,h,!!f)}};function mx(t,n,e,i){let r=t?["ng-version","21.2.10"]:z0(n.selectors[0]),o=null,s=null,a=0;if(e)for(let d of e)a+=d[cf].requiredVars,d.create&&(d.targetIdx=0,(o??=[]).push(d)),d.update&&(d.targetIdx=0,(s??=[]).push(d));if(i)for(let d=0;d<i.length;d++){let f=i[d];if(typeof f!="function")for(let h of f.bindings){a+=h[cf].requiredVars;let p=d+1;h.create&&(h.targetIdx=p,(o??=[]).push(h)),h.update&&(h.targetIdx=p,(s??=[]).push(h))}}let l=[n];if(i)for(let d of i){let f=typeof d=="function"?d:d.type,h=Ra(f);l.push(h)}return jf(0,null,gx(o,s),1,a,l,null,null,null,[r],null)}function gx(t,n){return!t&&!n?null:e=>{if(e&1&&t)for(let i of t)i.create();if(e&2&&n)for(let i of n)i.update()}}function Ug(t){let n=t[cf].kind;return n==="input"||n==="twoWay"}var gl=class extends py{_rootLView;_hasInputBindings;instance;hostView;changeDetectorRef;componentType;location;previousInputValues=null;_tNode;constructor(n,e,i){super(),this._rootLView=e,this._hasInputBindings=i,this._tNode=Va(e[N],be),this.location=Mr(this._tNode,e),this.instance=vt(this._tNode.index,e)[xe],this.hostView=this.changeDetectorRef=new On(e,void 0),this.componentType=n}setInput(n,e){this._hasInputBindings;let i=this._tNode;if(this.previousInputValues??=new Map,this.previousInputValues.has(n)&&Object.is(this.previousInputValues.get(n),e))return;let r=this._rootLView,o=Kf(i,r[N],r,n,e);this.previousInputValues.set(n,e);let s=vt(i.index,r);ep(s,1)}get injector(){return new Ni(this._tNode,this._rootLView)}destroy(){this.hostView.destroy()}onDestroy(n){this.hostView.onDestroy(n)}};function vx(t,n,e){let i=t.projection=[];for(let r=0;r<n.length;r++){let o=e[r];i.push(o!=null&&o.length?Array.from(o):null)}}var Dt=(()=>{class t{static __NG_ELEMENT_ID__=yx}return t})();function yx(){let t=Be();return Dy(t,U())}var uf=class t extends Dt{_lContainer;_hostTNode;_hostLView;constructor(n,e,i){super(),this._lContainer=n,this._hostTNode=e,this._hostLView=i}get element(){return Mr(this._hostTNode,this._hostLView)}get injector(){return new Ni(this._hostTNode,this._hostLView)}get parentInjector(){let n=Sf(this._hostTNode,this._hostLView);if(sv(n)){let e=cl(n,this._hostLView),i=ll(n),r=e[N].data[i+8];return new Ni(r,e)}else return new Ni(null,this._hostLView)}clear(){for(;this.length>0;)this.remove(this.length-1)}get(n){let e=zg(this._lContainer);return e!==null&&e[n]||null}get length(){return this._lContainer.length-Ee}createEmbeddedView(n,e,i){let r,o;typeof i=="number"?r=i:i!=null&&(r=i.index,o=i.injector);let s=hl(this._lContainer,n.ssrId),a=n.createEmbeddedViewImpl(e||{},o,s);return this.insertImpl(a,r,wr(this._hostTNode,s)),a}createComponent(n,e,i,r,o,s,a){let l=n&&!kE(n),c;if(l)c=e;else{let x=e||{};c=x.index,i=x.injector,r=x.projectableNodes,o=x.environmentInjector||x.ngModuleRef,s=x.directives,a=x.bindings}let d=l?n:new xr(Sn(n)),f=i||this.parentInjector;if(!o&&d.ngModule==null){let M=(l?f:this.parentInjector).get(we,null);M&&(o=M)}let h=Sn(d.componentType??{}),p=hl(this._lContainer,h?.id??null),m=p?.firstChild??null,C=d.create(f,r,m,o,s,a);return this.insertImpl(C.hostView,c,wr(this._hostTNode,p)),C}insert(n,e){return this.insertImpl(n,e,!0)}insertImpl(n,e,i){let r=n._lView;if($m(r)){let a=this.indexOf(n);if(a!==-1)this.detach(a);else{let l=r[Fe],c=new t(l,l[qe],l[Fe]);c.detach(c.indexOf(n))}}let o=this._adjustIndex(e),s=this._lContainer;return Zo(s,r,o,i),n.attachToViewContainerRef(),Kd(Fu(s),o,n),n}move(n,e){return this.insert(n,e)}indexOf(n){let e=zg(this._lContainer);return e!==null?e.indexOf(n):-1}remove(n){let e=this._adjustIndex(n,-1),i=Bo(this._lContainer,e);i&&(xo(Fu(this._lContainer),e),Tl(i[N],i))}detach(n){let e=this._adjustIndex(n,-1),i=Bo(this._lContainer,e);return i&&xo(Fu(this._lContainer),e)!=null?new On(i):null}_adjustIndex(n,e=0){return n??this.length+e}};function zg(t){return t[Mo]}function Fu(t){return t[Mo]||(t[Mo]=[])}function Dy(t,n){let e,i=n[t.index];return Nt(i)?e=i:(e=ly(i,n,null,t),n[t.index]=e,Uf(n,e)),bx(e,n,t,i),new uf(e,t,n)}function _x(t,n){let e=t[me],i=e.createComment(""),r=Ft(n,t),o=e.parentNode(r);return pl(e,o,i,e.nextSibling(r),!1),i}var bx=Ex,Dx=()=>!1;function Cx(t,n,e){return Dx(t,n,e)}function Ex(t,n,e,i){if(t[kn])return;let r;e.type&8?r=gt(i):r=_x(n,e),t[kn]=r}var ff=class t{queryList;matches=null;constructor(n){this.queryList=n}clone(){return new t(this.queryList)}setDirty(){this.queryList.setDirty()}},pf=class t{queries;constructor(n=[]){this.queries=n}createEmbeddedView(n){let e=n.queries;if(e!==null){let i=n.contentQueries!==null?n.contentQueries[0]:e.length,r=[];for(let o=0;o<i;o++){let s=e.getByIndex(o),a=this.queries[s.indexInDeclarationView];r.push(a.clone())}return new t(r)}return null}insertView(n){this.dirtyQueriesWithMatches(n)}detachView(n){this.dirtyQueriesWithMatches(n)}finishViewCreation(n){this.dirtyQueriesWithMatches(n)}dirtyQueriesWithMatches(n){for(let e=0;e<this.queries.length;e++)rp(n,e).matches!==null&&this.queries[e].setDirty()}},vl=class{flags;read;predicate;constructor(n,e,i=null){this.flags=e,this.read=i,typeof n=="string"?this.predicate=Sx(n):this.predicate=n}},hf=class t{queries;constructor(n=[]){this.queries=n}elementStart(n,e){for(let i=0;i<this.queries.length;i++)this.queries[i].elementStart(n,e)}elementEnd(n){for(let e=0;e<this.queries.length;e++)this.queries[e].elementEnd(n)}embeddedTView(n){let e=null;for(let i=0;i<this.length;i++){let r=e!==null?e.length:0,o=this.getByIndex(i).embeddedTView(n,r);o&&(o.indexInDeclarationView=i,e!==null?e.push(o):e=[o])}return e!==null?new t(e):null}template(n,e){for(let i=0;i<this.queries.length;i++)this.queries[i].template(n,e)}getByIndex(n){return this.queries[n]}get length(){return this.queries.length}track(n){this.queries.push(n)}},mf=class t{metadata;matches=null;indexInDeclarationView=-1;crossesNgTemplate=!1;_declarationNodeIndex;_appliesToNextNode=!0;constructor(n,e=-1){this.metadata=n,this._declarationNodeIndex=e}elementStart(n,e){this.isApplyingToNode(e)&&this.matchTNode(n,e)}elementEnd(n){this._declarationNodeIndex===n.index&&(this._appliesToNextNode=!1)}template(n,e){this.elementStart(n,e)}embeddedTView(n,e){return this.isApplyingToNode(n)?(this.crossesNgTemplate=!0,this.addMatch(-n.index,e),new t(this.metadata)):null}isApplyingToNode(n){if(this._appliesToNextNode&&(this.metadata.flags&1)!==1){let e=this._declarationNodeIndex,i=n.parent;for(;i!==null&&i.type&8&&i.index!==e;)i=i.parent;return e===(i!==null?i.index:-1)}return this._appliesToNextNode}matchTNode(n,e){let i=this.metadata.predicate;if(Array.isArray(i))for(let r=0;r<i.length;r++){let o=i[r];this.matchTNodeWithReadOption(n,e,wx(e,o)),this.matchTNodeWithReadOption(n,e,rl(e,n,o,!1,!1))}else i===ut?e.type&4&&this.matchTNodeWithReadOption(n,e,-1):this.matchTNodeWithReadOption(n,e,rl(e,n,i,!1,!1))}matchTNodeWithReadOption(n,e,i){if(i!==null){let r=this.metadata.read;if(r!==null)if(r===V||r===Dt||r===ut&&e.type&4)this.addMatch(e.index,-2);else{let o=rl(e,n,r,!1,!1);o!==null&&this.addMatch(e.index,o)}else this.addMatch(e.index,i)}}addMatch(n,e){this.matches===null?this.matches=[n,e]:this.matches.push(n,e)}};function wx(t,n){let e=t.localNames;if(e!==null){for(let i=0;i<e.length;i+=2)if(e[i]===n)return e[i+1]}return null}function xx(t,n){return t.type&11?Mr(t,n):t.type&4?Rl(t,n):null}function Ix(t,n,e,i){return e===-1?xx(n,t):e===-2?Mx(t,n,i):Po(t,t[N],e,n)}function Mx(t,n,e){if(e===V)return Mr(n,t);if(e===ut)return Rl(n,t);if(e===Dt)return Dy(n,t)}function Cy(t,n,e,i){let r=n[Kt].queries[i];if(r.matches===null){let o=t.data,s=e.matches,a=[];for(let l=0;s!==null&&l<s.length;l+=2){let c=s[l];if(c<0)a.push(null);else{let d=o[c];a.push(Ix(n,d,s[l+1],e.metadata.read))}}r.matches=a}return r.matches}function gf(t,n,e,i){let r=t.queries.getByIndex(e),o=r.matches;if(o!==null){let s=Cy(t,n,r,e);for(let a=0;a<o.length;a+=2){let l=o[a];if(l>0)i.push(s[a/2]);else{let c=o[a+1],d=n[-l];for(let f=Ee;f<d.length;f++){let h=d[f];h[Tn]===h[Fe]&&gf(h[N],h,c,i)}if(d[Si]!==null){let f=d[Si];for(let h=0;h<f.length;h++){let p=f[h];gf(p[N],p,c,i)}}}}}return i}function ip(t,n){return t[Kt].queries[n].queryList}function Ey(t,n,e){let i=new fl((e&4)===4);return qm(t,n,i,i.destroy),(n[Kt]??=new pf).queries.push(new ff(i))-1}function wy(t,n,e){let i=De();return i.firstCreatePass&&(Iy(i,new vl(t,n,e),-1),(n&2)===2&&(i.staticViewQueries=!0)),Ey(i,U(),n)}function xy(t,n,e,i){let r=De();if(r.firstCreatePass){let o=Be();Iy(r,new vl(n,e,i),o.index),Tx(r,t),(e&2)===2&&(r.staticContentQueries=!0)}return Ey(r,U(),e)}function Sx(t){return t.split(",").map(n=>n.trim())}function Iy(t,n,e){t.queries===null&&(t.queries=new hf),t.queries.track(new mf(n,e))}function Tx(t,n){let e=t.contentQueries||(t.contentQueries=[]),i=e.length?e[e.length-1]:-1;n!==i&&e.push(t.queries.length-1,n)}function rp(t,n){return t.queries.getByIndex(n)}function My(t,n){let e=t[N],i=rp(e,n);return i.crossesNgTemplate?gf(e,t,n,[]):Cy(e,t,i,n)}function Sy(t,n,e){let i,r=ro(()=>{i._dirtyCounter();let o=Ax(i,t);if(n&&o===void 0)throw new A(-951,!1);return o});return i=r[Ne],i._dirtyCounter=L(0),i._flatValue=void 0,r}function op(t){return Sy(!0,!1,t)}function sp(t){return Sy(!0,!0,t)}function Ty(t,n){let e=t[Ne];e._lView=U(),e._queryIndex=n,e._queryList=ip(e._lView,n),e._queryList.onDirty(()=>e._dirtyCounter.update(i=>i+1))}function Ax(t,n){let e=t._lView,i=t._queryIndex;if(e===void 0||i===void 0||e[j]&4)return n?void 0:ze;let r=ip(e,i),o=My(e,i);return r.reset(o,mv),n?r.first:r._changesDetected||t._flatValue===void 0?t._flatValue=r.toArray():t._flatValue}var Fn=class{};var jo=class extends Fn{injector;componentFactoryResolver=new df(this);instance=null;constructor(n){super();let e=new _i([...n.providers,{provide:Fn,useValue:this},{provide:Ol,useValue:this.componentFactoryResolver}],n.parent||fr(),n.debugName,new Set(["environment"]));this.injector=e,n.runEnvironmentInitializers&&e.resolveInjectorInitializers()}destroy(){this.injector.destroy()}onDestroy(n){this.injector.onDestroy(n)}};function Ay(t,n,e=null){return new jo({providers:t,parent:n,debugName:e,runEnvironmentInitializers:!0}).injector}var kx=(()=>{class t{_injector;cachedInjectors=new Map;constructor(e){this._injector=e}getOrCreateStandaloneInjector(e){if(!e.standalone)return null;if(!this.cachedInjectors.has(e)){let i=tu(!1,e.type),r=i.length>0?Ay([i],this._injector,""):null;this.cachedInjectors.set(e,r)}return this.cachedInjectors.get(e)}ngOnDestroy(){try{for(let e of this.cachedInjectors.values())e!==null&&e.destroy()}finally{this.cachedInjectors.clear()}}static \u0275prov=_({token:t,providedIn:"environment",factory:()=>new t(I(we))})}return t})();function H(t){return zo(()=>{let n=ky(t),e=J(D({},n),{decls:t.decls,vars:t.vars,template:t.template,consts:t.consts||null,ngContentSelectors:t.ngContentSelectors,onPush:t.changeDetection===Af.OnPush,directiveDefs:null,pipeDefs:null,dependencies:n.standalone&&t.dependencies||null,getStandaloneInjector:n.standalone?r=>r.get(kx).getOrCreateStandaloneInjector(e):null,getExternalStyles:null,signals:t.signals??!1,data:t.data||{},encapsulation:t.encapsulation||Bt.Emulated,styles:t.styles||ze,_:null,schemas:t.schemas||null,tView:null,id:""});n.standalone&&Bi("NgStandalone"),Ry(e);let i=t.dependencies;return e.directiveDefs=$g(i,Rx),e.pipeDefs=$g(i,Mm),e.id=Fx(e),e})}function Rx(t){return Sn(t)||Ra(t)}function q(t){return zo(()=>({type:t.type,bootstrap:t.bootstrap||ze,declarations:t.declarations||ze,imports:t.imports||ze,exports:t.exports||ze,transitiveCompileScopes:null,schemas:t.schemas||null,id:t.id||null}))}function Nx(t,n){if(t==null)return At;let e={};for(let i in t)if(t.hasOwnProperty(i)){let r=t[i],o,s,a,l;Array.isArray(r)?(a=r[0],o=r[1],s=r[2]??o,l=r[3]||null):(o=r,s=r,a=Il.None,l=null),e[o]=[i,a,l],n[o]=s}return e}function Ox(t){if(t==null)return At;let n={};for(let e in t)t.hasOwnProperty(e)&&(n[t[e]]=e);return n}function F(t){return zo(()=>{let n=ky(t);return Ry(n),n})}function Fl(t){return{type:t.type,name:t.name,factory:null,pure:t.pure!==!1,standalone:t.standalone??!0,onDestroy:t.type.prototype.ngOnDestroy||null}}function ky(t){let n={};return{type:t.type,providersResolver:null,viewProvidersResolver:null,factory:null,hostBindings:t.hostBindings||null,hostVars:t.hostVars||0,hostAttrs:t.hostAttrs||null,contentQueries:t.contentQueries||null,declaredInputs:n,inputConfig:t.inputs||At,exportAs:t.exportAs||null,standalone:t.standalone??!0,signals:t.signals===!0,selectors:t.selectors||ze,viewQuery:t.viewQuery||null,features:t.features||null,setInput:null,resolveHostDirectives:null,hostDirectives:null,controlDef:null,inputs:Nx(t.inputs,n),outputs:Ox(t.outputs),debugInfo:null}}function Ry(t){t.features?.forEach(n=>n(t))}function $g(t,n){return t?()=>{let e=typeof t=="function"?t():t,i=[];for(let r of e){let o=n(r);o!==null&&i.push(o)}return i}:null}function Fx(t){let n=0,e=typeof t.consts=="function"?"":t.consts,i=[t.selectors,t.ngContentSelectors,t.hostVars,t.hostAttrs,e,t.vars,t.decls,t.encapsulation,t.standalone,t.signals,t.exportAs,JSON.stringify(t.inputs),JSON.stringify(t.outputs),Object.getOwnPropertyNames(t.type.prototype),!!t.contentQueries,!!t.viewQuery];for(let o of i.join("|"))n=Math.imul(31,n)+o.charCodeAt(0)<<0;return n+=2147483648,"c"+n}function ap(t){let n=e=>{let i=Array.isArray(t);e.hostDirectives===null?(e.resolveHostDirectives=Px,e.hostDirectives=i?t.map(vf):[t]):i?e.hostDirectives.unshift(...t.map(vf)):e.hostDirectives.unshift(t)};return n.ngInherit=!0,n}function Px(t){let n=[],e=!1,i=null,r=null;for(let o=0;o<t.length;o++){let s=t[o];if(s.hostDirectives!==null){let a=n.length;i??=new Map,r??=new Map,Ny(s,n,i),r.set(s,[a,n.length-1])}o===0&&Ot(s)&&(e=!0,n.push(s))}for(let o=e?1:0;o<t.length;o++)n.push(t[o]);return[n,i,r]}function Ny(t,n,e){if(t.hostDirectives!==null)for(let i of t.hostDirectives)if(typeof i=="function"){let r=i();for(let o of r)Gg(vf(o),n,e)}else Gg(i,n,e)}function Gg(t,n,e){let i=Ra(t.directive);Lx(i.declaredInputs,t.inputs),Ny(i,n,e),e.set(i,t),n.push(i)}function vf(t){return typeof t=="function"?{directive:Oe(t),inputs:At,outputs:At}:{directive:Oe(t.directive),inputs:Wg(t.inputs),outputs:Wg(t.outputs)}}function Wg(t){if(t===void 0||t.length===0)return At;let n={};for(let e=0;e<t.length;e+=2)n[t[e]]=t[e+1];return n}function Lx(t,n){for(let e in n)if(n.hasOwnProperty(e)){let i=n[e],r=t[e];t[i]=r}}function Vx(t){return Object.getPrototypeOf(t.prototype).constructor}function pe(t){let n=Vx(t.type),e=!0,i=[t];for(;n;){let r;if(Ot(t))r=n.\u0275cmp||n.\u0275dir;else{if(n.\u0275cmp)throw new A(903,!1);r=n.\u0275dir}if(r){if(e){i.push(r);let s=t;s.inputs=Pu(t.inputs),s.declaredInputs=Pu(t.declaredInputs),s.outputs=Pu(t.outputs);let a=r.hostBindings;a&&zx(t,a);let l=r.viewQuery,c=r.contentQueries;if(l&&Hx(t,l),c&&Ux(t,c),Bx(t,r),Im(t.outputs,r.outputs),Ot(r)&&r.data.animation){let d=t.data;d.animation=(d.animation||[]).concat(r.data.animation)}}let o=r.features;if(o)for(let s=0;s<o.length;s++){let a=o[s];a&&a.ngInherit&&a(t),a===pe&&(e=!1)}}n=Object.getPrototypeOf(n)}jx(i)}function Bx(t,n){for(let e in n.inputs){if(!n.inputs.hasOwnProperty(e)||t.inputs.hasOwnProperty(e))continue;let i=n.inputs[e];i!==void 0&&(t.inputs[e]=i,t.declaredInputs[e]=n.declaredInputs[e])}}function jx(t){let n=0,e=null;for(let i=t.length-1;i>=0;i--){let r=t[i];r.hostVars=n+=r.hostVars,r.hostAttrs=Cr(r.hostAttrs,e=Cr(e,r.hostAttrs))}}function Pu(t){return t===At?{}:t===ze?[]:t}function Hx(t,n){let e=t.viewQuery;e?t.viewQuery=(i,r)=>{n(i,r),e(i,r)}:t.viewQuery=n}function Ux(t,n){let e=t.contentQueries;e?t.contentQueries=(i,r,o)=>{n(i,r,o),e(i,r,o)}:t.contentQueries=n}function zx(t,n){let e=t.hostBindings;e?t.hostBindings=(i,r)=>{n(i,r),e(i,r)}:t.hostBindings=n}function Oy(t,n,e,i,r,o,s,a){if(e.firstCreatePass){t.mergedAttrs=Cr(t.mergedAttrs,t.attrs);let d=t.tView=jf(2,t,r,o,s,e.directiveRegistry,e.pipeRegistry,null,e.schemas,e.consts,null);e.queries!==null&&(e.queries.template(e,t),d.queries=e.queries.embeddedTView(t))}a&&(t.flags|=a),yr(t,!1);let l=Gx(e,n,t,i);Za()&&qf(e,n,l,t),Er(l,n);let c=ly(l,n,l,t);n[i+be]=c,Uf(n,c),Cx(c,t,n)}function $x(t,n,e,i,r,o,s,a,l,c,d){let f=e+be,h;return n.firstCreatePass?(h=Sr(n,f,4,s||null,a||null),Ha()&&my(n,t,h,yt(n.consts,c),Zf),iv(n,h)):h=n.data[f],Oy(h,t,n,e,i,r,o,l),gr(h)&&kl(n,t,h),c!=null&&qo(t,h,d),h}function Ho(t,n,e,i,r,o,s,a,l,c,d){let f=e+be,h;if(n.firstCreatePass){if(h=Sr(n,f,4,s||null,a||null),c!=null){let p=yt(n.consts,c);h.localNames=[];for(let m=0;m<p.length;m+=2)h.localNames.push(p[m],-1)}}else h=n.data[f];return Oy(h,t,n,e,i,r,o,l),c!=null&&qo(t,h,d),h}function tt(t,n,e,i,r,o,s,a){let l=U(),c=De(),d=yt(c.consts,o);return $x(l,c,t,n,e,i,r,d,void 0,s,a),tt}var Gx=Wx;function Wx(t,n,e,i){return ko(!0),n[me].createComment("")}function Pl(t){return typeof t=="function"&&t[Ne]!==void 0}var lp=new y("");function Tr(t){return!!t&&typeof t.then=="function"}function cp(t){return!!t&&typeof t.subscribe=="function"}var Fy=new y("");var dp=(()=>{class t{resolve;reject;initialized=!1;done=!1;donePromise=new Promise((e,i)=>{this.resolve=e,this.reject=i});appInits=u(Fy,{optional:!0})??[];injector=u(P);constructor(){}runInitializers(){if(this.initialized)return;let e=[];for(let r of this.appInits){let o=pr(this.injector,r);if(Tr(o))e.push(o);else if(cp(o)){let s=new Promise((a,l)=>{o.subscribe({complete:a,error:l})});e.push(s)}}let i=()=>{this.done=!0,this.resolve()};Promise.all(e).then(()=>{i()}).catch(r=>{this.reject(r)}),e.length===0&&i(),this.initialized=!0}static \u0275fac=function(i){return new(i||t)};static \u0275prov=_({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),Py=new y("");function Ly(){pd(()=>{let t="";throw new A(600,t)})}function Vy(t){return t.isBoundToModule}var qx=10;var zt=(()=>{class t{_runningTick=!1;_destroyed=!1;_destroyListeners=[];_views=[];internalErrorHandler=u(cn);afterRenderManager=u(Sl);zonelessEnabled=u(Ro);rootEffectScheduler=u(Xa);dirtyFlags=0;tracingSnapshot=null;allTestViews=new Set;autoDetectTestViews=new Set;includeAllTestViews=!1;afterTick=new E;get allViews(){return[...(this.includeAllTestViews?this.allTestViews:this.autoDetectTestViews).keys(),...this._views]}get destroyed(){return this._destroyed}componentTypes=[];components=[];internalPendingTask=u(Ri);get isStable(){return this.internalPendingTask.hasPendingTasksObservable.pipe(_e(e=>!e))}constructor(){u(Ut,{optional:!0})}whenStable(){let e;return new Promise(i=>{e=this.isStable.subscribe({next:r=>{r&&i()}})}).finally(()=>{e.unsubscribe()})}_injector=u(we);_rendererFactory=null;get injector(){return this._injector}bootstrap(e,i){return this.bootstrapImpl(e,i)}bootstrapImpl(e,i,r=P.NULL){return this._injector.get(S).run(()=>{ce(oe.BootstrapComponentStart);let s=e instanceof Nl;if(!this._injector.get(dp).done){let m="";throw new A(405,m)}let l;s?l=e:l=this._injector.get(Ol).resolveComponentFactory(e),this.componentTypes.push(l.componentType);let c=Vy(l)?void 0:this._injector.get(Fn),d=i||l.selector,f=l.create(r,[],d,c),h=f.location.nativeElement,p=f.injector.get(lp,null);return p?.registerApplication(h),f.onDestroy(()=>{this.detachView(f.hostView),Fo(this.components,f),p?.unregisterApplication(h)}),this._loadComponent(f),ce(oe.BootstrapComponentEnd,f),f})}tick(){this.zonelessEnabled||(this.dirtyFlags|=1),this._tick()}_tick(){ce(oe.ChangeDetectionStart),this.tracingSnapshot!==null?this.tracingSnapshot.run(Ml.CHANGE_DETECTION,this.tickImpl):this.tickImpl()}tickImpl=()=>{if(this._runningTick)throw ce(oe.ChangeDetectionEnd),new A(101,!1);let e=O(null);try{this._runningTick=!0,this.synchronize()}finally{this._runningTick=!1,this.tracingSnapshot?.dispose(),this.tracingSnapshot=null,O(e),this.afterTick.next(),ce(oe.ChangeDetectionEnd)}};synchronize(){this._rendererFactory===null&&!this._injector.destroyed&&(this._rendererFactory=this._injector.get(Te,null,{optional:!0}));let e=0;for(;this.dirtyFlags!==0&&e++<qx;){ce(oe.ChangeDetectionSyncStart);try{this.synchronizeOnce()}finally{ce(oe.ChangeDetectionSyncEnd)}}}synchronizeOnce(){this.dirtyFlags&16&&(this.dirtyFlags&=-17,this.rootEffectScheduler.flush());let e=!1;if(this.dirtyFlags&7){let i=!!(this.dirtyFlags&1);this.dirtyFlags&=-8,this.dirtyFlags|=8;for(let{_lView:r}of this.allViews){if(!i&&!So(r))continue;let o=i&&!this.zonelessEnabled?0:1;ry(r,o),e=!0}if(this.dirtyFlags&=-5,this.syncDirtyFlagsWithViews(),this.dirtyFlags&23)return}e||(this._rendererFactory?.begin?.(),this._rendererFactory?.end?.()),this.dirtyFlags&8&&(this.dirtyFlags&=-9,this.afterRenderManager.execute()),this.syncDirtyFlagsWithViews()}syncDirtyFlagsWithViews(){if(this.allViews.some(({_lView:e})=>So(e))){this.dirtyFlags|=2;return}else this.dirtyFlags&=-8}attachView(e){let i=e;this._views.push(i),i.attachToAppRef(this)}detachView(e){let i=e;Fo(this._views,i),i.detachFromAppRef()}_loadComponent(e){this.attachView(e.hostView);try{this.tick()}catch(r){this.internalErrorHandler(r)}this.components.push(e),this._injector.get(Py,[]).forEach(r=>r(e))}ngOnDestroy(){if(!this._destroyed)try{this._destroyListeners.forEach(e=>e()),this._views.slice().forEach(e=>e.destroy())}finally{this._destroyed=!0,this._views=[],this._destroyListeners=[]}}onDestroy(e){return this._destroyListeners.push(e),()=>Fo(this._destroyListeners,e)}destroy(){if(this._destroyed)throw new A(406,!1);let e=this._injector;e.destroy&&!e.destroyed&&e.destroy()}get viewCount(){return this._views.length}static \u0275fac=function(i){return new(i||t)};static \u0275prov=_({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function Fo(t,n){let e=t.indexOf(n);e>-1&&t.splice(e,1)}function K(t,n,e,i){let r=U(),o=ki();if(jt(r,o,n)){let s=De(),a=qa();Dw(a,r,t,n,e,i)}return K}var yf=class{destroy(n){}updateValue(n,e){}swap(n,e){let i=Math.min(n,e),r=Math.max(n,e),o=this.detach(r);if(r-i>1){let s=this.detach(i);this.attach(i,o),this.attach(r,s)}else this.attach(i,o)}move(n,e){this.attach(e,this.detach(n))}};function Lu(t,n,e,i,r){return t===e&&Object.is(n,i)?1:Object.is(r(t,n),r(e,i))?-1:0}function Yx(t,n,e,i){let r,o,s=0,a=t.length-1,l=void 0;if(Array.isArray(n)){O(i);let c=n.length-1;for(O(null);s<=a&&s<=c;){let d=t.at(s),f=n[s],h=Lu(s,d,s,f,e);if(h!==0){h<0&&t.updateValue(s,f),s++;continue}let p=t.at(a),m=n[c],C=Lu(a,p,c,m,e);if(C!==0){C<0&&t.updateValue(a,m),a--,c--;continue}let x=e(s,d),M=e(a,p),ve=e(s,f);if(Object.is(ve,M)){let lt=e(c,m);Object.is(lt,x)?(t.swap(s,a),t.updateValue(a,m),c--,a--):t.move(a,s),t.updateValue(s,f),s++;continue}if(r??=new yl,o??=Yg(t,s,a,e),_f(t,r,s,ve))t.updateValue(s,f),s++,a++;else if(o.has(ve))r.set(x,t.detach(s)),a--;else{let lt=t.create(s,n[s]);t.attach(s,lt),s++,a++}}for(;s<=c;)qg(t,r,e,s,n[s]),s++}else if(n!=null){O(i);let c=n[Symbol.iterator]();O(null);let d=c.next();for(;!d.done&&s<=a;){let f=t.at(s),h=d.value,p=Lu(s,f,s,h,e);if(p!==0)p<0&&t.updateValue(s,h),s++,d=c.next();else{r??=new yl,o??=Yg(t,s,a,e);let m=e(s,h);if(_f(t,r,s,m))t.updateValue(s,h),s++,a++,d=c.next();else if(!o.has(m))t.attach(s,t.create(s,h)),s++,a++,d=c.next();else{let C=e(s,f);r.set(C,t.detach(s)),a--}}}for(;!d.done;)qg(t,r,e,t.length,d.value),d=c.next()}for(;s<=a;)t.destroy(t.detach(a--));r?.forEach(c=>{t.destroy(c)})}function _f(t,n,e,i){return n!==void 0&&n.has(i)?(t.attach(e,n.get(i)),n.delete(i),!0):!1}function qg(t,n,e,i,r){if(_f(t,n,i,e(i,r)))t.updateValue(i,r);else{let o=t.create(i,r);t.attach(i,o)}}function Yg(t,n,e,i){let r=new Set;for(let o=n;o<=e;o++)r.add(i(o,t.at(o)));return r}var yl=class{kvMap=new Map;_vMap=void 0;has(n){return this.kvMap.has(n)}delete(n){if(!this.has(n))return!1;let e=this.kvMap.get(n);return this._vMap!==void 0&&this._vMap.has(e)?(this.kvMap.set(n,this._vMap.get(e)),this._vMap.delete(e)):this.kvMap.delete(n),!0}get(n){return this.kvMap.get(n)}set(n,e){if(this.kvMap.has(n)){let i=this.kvMap.get(n);this._vMap===void 0&&(this._vMap=new Map);let r=this._vMap;for(;r.has(i);)i=r.get(i);r.set(i,e)}else this.kvMap.set(n,e)}forEach(n){for(let[e,i]of this.kvMap)if(n(i,e),this._vMap!==void 0){let r=this._vMap;for(;r.has(i);)i=r.get(i),n(i,e)}}};function $(t,n,e,i,r,o,s,a){Bi("NgControlFlow");let l=U(),c=De(),d=yt(c.consts,o);return Ho(l,c,t,n,e,i,r,d,256,s,a),up}function up(t,n,e,i,r,o,s,a){Bi("NgControlFlow");let l=U(),c=De(),d=yt(c.consts,o);return Ho(l,c,t,n,e,i,r,d,512,s,a),up}function G(t,n){Bi("NgControlFlow");let e=U(),i=ki(),r=e[i]!==et?e[i]:-1,o=r!==-1?_l(e,be+r):void 0,s=0;if(jt(e,i,t)){let a=O(null);try{if(o!==void 0&&dy(o,s),t!==-1){let l=be+t,c=_l(e,l),d=Ef(e[N],l),f=fy(c,d,e),h=Yo(e,d,n,{dehydratedView:f});Zo(c,h,s,wr(d,f))}}finally{O(a)}}else if(o!==void 0){let a=cy(o,s);a!==void 0&&(a[xe]=n)}}var bf=class{lContainer;$implicit;$index;constructor(n,e,i){this.lContainer=n,this.$implicit=e,this.$index=i}get $count(){return this.lContainer.length-Ee}};function fp(t){return t}var Df=class{hasEmptyBlock;trackByFn;liveCollection;constructor(n,e,i){this.hasEmptyBlock=n,this.trackByFn=e,this.liveCollection=i}};function Ln(t,n,e,i,r,o,s,a,l,c,d,f,h){Bi("NgControlFlow");let p=U(),m=De(),C=l!==void 0,x=U(),M=a?s.bind(x[Ye][xe]):s,ve=new Df(C,M);x[be+t]=ve,Ho(p,m,t+1,n,e,i,r,yt(m.consts,o),256),C&&Ho(p,m,t+2,l,c,d,f,yt(m.consts,h),512)}var Cf=class extends yf{lContainer;hostLView;templateTNode;operationsCounter=void 0;needsIndexUpdate=!1;constructor(n,e,i){super(),this.lContainer=n,this.hostLView=e,this.templateTNode=i}get length(){return this.lContainer.length-Ee}at(n){return this.getLView(n)[xe].$implicit}attach(n,e){let i=e[wi];this.needsIndexUpdate||=n!==this.length,Zo(this.lContainer,e,n,wr(this.templateTNode,i)),Zx(this.lContainer,n)}detach(n){return this.needsIndexUpdate||=n!==this.length-1,Qx(this.lContainer,n),Xx(this.lContainer,n)}create(n,e){let i=hl(this.lContainer,this.templateTNode.tView.ssrId);return Yo(this.hostLView,this.templateTNode,new bf(this.lContainer,e,n),{dehydratedView:i})}destroy(n){Tl(n[N],n)}updateValue(n,e){this.getLView(n)[xe].$implicit=e}reset(){this.needsIndexUpdate=!1}updateIndexes(){if(this.needsIndexUpdate)for(let n=0;n<this.length;n++)this.getLView(n)[xe].$index=n}getLView(n){return Kx(this.lContainer,n)}};function Vn(t){let n=O(null),e=Jt();try{let i=U(),r=i[N],o=i[e],s=e+1,a=_l(i,s);if(o.liveCollection===void 0){let c=Ef(r,s);o.liveCollection=new Cf(a,i,c)}else o.liveCollection.reset();let l=o.liveCollection;if(Yx(l,t,o.trackByFn,n),l.updateIndexes(),o.hasEmptyBlock){let c=ki(),d=l.length===0;if(jt(i,c,d)){let f=e+2,h=_l(i,f);if(d){let p=Ef(r,f),m=fy(h,p,i),C=Yo(i,p,void 0,{dehydratedView:m});Zo(h,C,0,wr(p,m))}else r.firstUpdatePass&&Gw(h),dy(h,0)}}}finally{O(n)}}function _l(t,n){return t[n]}function Zx(t,n){if(t.length<=Ee)return;let e=Ee+n,i=t[e],r=i?i[An]:void 0;if(i&&r&&r.detachedLeaveAnimationFns&&r.detachedLeaveAnimationFns.length>0){let o=i[on];K0(o,r),Fi.delete(i[sn]),r.detachedLeaveAnimationFns=void 0}}function Qx(t,n){if(t.length<=Ee)return;let e=Ee+n,i=t[e],r=i?i[An]:void 0;r&&r.leave&&r.leave.size>0&&(r.detachedLeaveAnimationFns=[])}function Xx(t,n){return Bo(t,n)}function Kx(t,n){return cy(t,n)}function Ef(t,n){return Va(t,n)}function ne(t,n,e){let i=U(),r=ki();if(jt(i,r,n)){let o=De(),s=qa();gw(s,i,t,n,i[me],e)}return ne}function wf(t,n,e,i,r){Kf(n,t,e,r?"class":"style",i)}function g(t,n,e,i){let r=U(),o=r[N],s=t+be,a=o.firstCreatePass?tp(s,r,2,n,Zf,Ha(),e,i):o.data[s];if(ln(a)){let l=r[Rt].tracingService;if(l&&l.componentCreate){let c=o.data[a.directiveStart+a.componentOffset];return l.componentCreate(_y(c),()=>(Zg(t,n,r,a,i),g))}}return Zg(t,n,r,a,i),g}function Zg(t,n,e,i,r){if(Qf(i,e,t,n,By),gr(i)){let o=e[N];kl(o,e,i),Rf(o,i,e)}r!=null&&qo(e,i)}function v(){let t=De(),n=Be(),e=Xf(n);return t.firstCreatePass&&np(t,e),_u(e)&&bu(),vu(),e.classesWithoutHost!=null&&LE(e)&&wf(t,e,U(),e.classesWithoutHost,!0),e.stylesWithoutHost!=null&&VE(e)&&wf(t,e,U(),e.stylesWithoutHost,!1),v}function ie(t,n,e,i){return g(t,n,e,i),v(),ie}function Ct(t,n,e,i){let r=U(),o=r[N],s=t+be,a=o.firstCreatePass?ox(s,o,2,n,e,i):o.data[s];return Qf(a,r,t,n,By),i!=null&&qo(r,a),Ct}function $t(){let t=Be(),n=Xf(t);return _u(n)&&bu(),vu(),$t}function nt(t,n,e,i){return Ct(t,n,e,i),$t(),nt}var By=(t,n,e,i,r)=>(ko(!0),Ov(n[me],i,cg()));function pp(t,n,e){let i=U(),r=i[N],o=t+be,s=r.firstCreatePass?tp(o,i,8,"ng-container",Zf,Ha(),n,e):r.data[o];if(Qf(s,i,t,"ng-container",Jx),gr(s)){let a=i[N];kl(a,i,s),Rf(a,s,i)}return e!=null&&qo(i,s),pp}function hp(){let t=De(),n=Be(),e=Xf(n);return t.firstCreatePass&&np(t,e),hp}function Ar(t,n,e){return pp(t,n,e),hp(),Ar}var Jx=(t,n,e,i,r)=>(ko(!0),T0(n[me],""));function it(){return U()}function pn(t,n,e){let i=U(),r=ki();if(jt(i,r,n)){let o=De(),s=qa();Kv(s,i,t,n,i[me],e)}return pn}var Qo="en-US";var eI=Qo;function jy(t){typeof t=="string"&&(eI=t.toLowerCase().replace(/_/g,"-"))}function Q(t,n,e){let i=U(),r=De(),o=Be();return tI(r,i,i[me],o,t,n,e),Q}function Ll(t,n,e){let i=U(),r=De(),o=Be();return(o.type&3||e)&&vy(o,r,i,e,i[me],t,n,sl(o,i,n)),Ll}function tI(t,n,e,i,r,o,s){let a=!0,l=null;if((i.type&3||s)&&(l??=sl(i,n,o),vy(i,t,n,s,e,r,o,l)&&(a=!1)),a){let c=i.outputs?.[r],d=i.hostDirectiveOutputs?.[r];if(d&&d.length)for(let f=0;f<d.length;f+=2){let h=d[f],p=d[f+1];l??=sl(i,n,o),Hg(i,n,h,p,r,l)}if(c&&c.length)for(let f of c)l??=sl(i,n,o),Hg(i,n,f,r,r,l)}}function T(t=1){return lg(t)}function nI(t,n){let e=null,i=L0(t);for(let r=0;r<n.length;r++){let o=n[r];if(o==="*"){e=r;continue}if(i===null?jv(t,o,!0):j0(i,o))return r}return e}function rt(t){let n=U()[Ye][qe];if(!n.projection){let e=t?t.length:1,i=n.projection=Nm(e,null),r=i.slice(),o=n.child;for(;o!==null;){if(o.type!==128){let s=t?nI(o,t):0;s!==null&&(r[s]?r[s].projectionNext=o:i[s]=o,r[s]=o)}o=o.next}}}function ge(t,n=0,e,i,r,o){let s=U(),a=De(),l=i?t+1:null;l!==null&&Ho(s,a,l,i,r,o,null,e);let c=Sr(a,be+t,16,null,e||null);c.projection===null&&(c.projection=n),Eu();let f=!s[wi]||yu();s[Ye][qe].projection[c.projection]===null&&l!==null?iI(s,a,l):f&&!Cl(c)&&cw(a,s,c)}function iI(t,n,e){let i=be+e,r=n.data[i],o=t[i],s=hl(o,r.tView.ssrId),a=Yo(t,r,void 0,{dehydratedView:s});Zo(o,a,0,wr(r,s))}function kr(t,n,e,i){return xy(t,n,e,i),kr}function je(t,n,e){return wy(t,n,e),je}function se(t){let n=U(),e=De(),i=$a();To(i+1);let r=rp(e,i);if(t.dirty&&zm(n)===((r.metadata.flags&2)===2)){if(r.matches===null)t.reset([]);else{let o=My(n,i);t.reset(o,mv),t.notifyOnChanges()}return!0}return!1}function ae(){return ip(U(),$a())}function Vl(t,n,e,i,r){return Ty(n,xy(t,e,i,r)),Vl}function Bl(t,n,e,i){return Ty(t,wy(n,e,i)),Bl}function jl(t=1){To($a()+t)}function Bn(t){let n=Xm();return du(n,be+t)}function tl(t,n){return t<<17|n<<2}function Pi(t){return t>>17&32767}function rI(t){return(t&2)==2}function oI(t,n){return t&131071|n<<17}function xf(t){return t|2}function Ir(t){return(t&131068)>>2}function Vu(t,n){return t&-131069|n<<2}function sI(t){return(t&1)===1}function If(t){return t|1}function aI(t,n,e,i,r,o){let s=o?n.classBindings:n.styleBindings,a=Pi(s),l=Ir(s);t[i]=e;let c=!1,d;if(Array.isArray(e)){let f=e;d=f[1],(d===null||ur(f,d)>0)&&(c=!0)}else d=e;if(r)if(l!==0){let h=Pi(t[a+1]);t[i+1]=tl(h,a),h!==0&&(t[h+1]=Vu(t[h+1],i)),t[a+1]=oI(t[a+1],i)}else t[i+1]=tl(a,0),a!==0&&(t[a+1]=Vu(t[a+1],i)),a=i;else t[i+1]=tl(l,0),a===0?a=i:t[l+1]=Vu(t[l+1],i),l=i;c&&(t[i+1]=xf(t[i+1])),Qg(t,d,i,!0),Qg(t,d,i,!1),lI(n,d,t,i,o),s=tl(a,l),o?n.classBindings=s:n.styleBindings=s}function lI(t,n,e,i,r){let o=r?t.residualClasses:t.residualStyles;o!=null&&typeof n=="string"&&ur(o,n)>=0&&(e[i+1]=If(e[i+1]))}function Qg(t,n,e,i){let r=t[e+1],o=n===null,s=i?Pi(r):Ir(r),a=!1;for(;s!==0&&(a===!1||o);){let l=t[s],c=t[s+1];cI(l,n)&&(a=!0,t[s+1]=i?If(c):xf(c)),s=i?Pi(c):Ir(c)}a&&(t[e+1]=i?xf(r):If(r))}function cI(t,n){return t===null||n==null||(Array.isArray(t)?t[1]:t)===n?!0:Array.isArray(t)&&typeof n=="string"?ur(t,n)>=0:!1}var Vt={textEnd:0,key:0,keyEnd:0,value:0,valueEnd:0};function dI(t){return t.substring(Vt.key,Vt.keyEnd)}function uI(t){return fI(t),Hy(t,Uy(t,0,Vt.textEnd))}function Hy(t,n){let e=Vt.textEnd;return e===n?-1:(n=Vt.keyEnd=pI(t,Vt.key=n,e),Uy(t,n,e))}function fI(t){Vt.key=0,Vt.keyEnd=0,Vt.value=0,Vt.valueEnd=0,Vt.textEnd=t.length}function Uy(t,n,e){for(;n<e&&t.charCodeAt(n)<=32;)n++;return n}function pI(t,n,e){for(;n<e&&t.charCodeAt(n)>32;)n++;return n}function Gt(t,n,e){return zy(t,n,e,!1),Gt}function B(t,n){return zy(t,n,null,!0),B}function hn(t){mI(DI,hI,t,!0)}function hI(t,n){for(let e=uI(n);e>=0;e=Hy(n,e))Fa(t,dI(n),!0)}function zy(t,n,e,i){let r=U(),o=De(),s=Ua(2);if(o.firstUpdatePass&&Gy(o,t,s,i),n!==et&&jt(r,s,n)){let a=o.data[Jt()];Wy(o,a,r,r[me],t,r[s+1]=EI(n,e),i,s)}}function mI(t,n,e,i){let r=De(),o=Ua(2);r.firstUpdatePass&&Gy(r,null,o,i);let s=U();if(e!==et&&jt(s,o,e)){let a=r.data[Jt()];if(qy(a,i)&&!$y(r,o)){let l=i?a.classesWithoutHost:a.stylesWithoutHost;l!==null&&(e=Ta(l,e||"")),wf(r,a,s,e,i)}else CI(r,a,s,s[me],s[o+1],s[o+1]=bI(t,n,e),i,o)}}function $y(t,n){return n>=t.expandoStartIndex}function Gy(t,n,e,i){let r=t.data;if(r[e+1]===null){let o=r[Jt()],s=$y(t,e);qy(o,i)&&n===null&&!s&&(n=!1),n=gI(r,o,n,i),aI(r,o,n,e,s,i)}}function gI(t,n,e,i){let r=rg(t),o=i?n.residualClasses:n.residualStyles;if(r===null)(i?n.classBindings:n.styleBindings)===0&&(e=Bu(null,t,n,e,i),e=Uo(e,n.attrs,i),o=null);else{let s=n.directiveStylingLast;if(s===-1||t[s]!==r)if(e=Bu(r,t,n,e,i),o===null){let l=vI(t,n,i);l!==void 0&&Array.isArray(l)&&(l=Bu(null,t,n,l[1],i),l=Uo(l,n.attrs,i),yI(t,n,i,l))}else o=_I(t,n,i)}return o!==void 0&&(i?n.residualClasses=o:n.residualStyles=o),e}function vI(t,n,e){let i=e?n.classBindings:n.styleBindings;if(Ir(i)!==0)return t[Pi(i)]}function yI(t,n,e,i){let r=e?n.classBindings:n.styleBindings;t[Pi(r)]=i}function _I(t,n,e){let i,r=n.directiveEnd;for(let o=1+n.directiveStylingLast;o<r;o++){let s=t[o].hostAttrs;i=Uo(i,s,e)}return Uo(i,n.attrs,e)}function Bu(t,n,e,i,r){let o=null,s=e.directiveEnd,a=e.directiveStylingLast;for(a===-1?a=e.directiveStart:a++;a<s&&(o=n[a],i=Uo(i,o.hostAttrs,r),o!==t);)a++;return t!==null&&(e.directiveStylingLast=a),i}function Uo(t,n,e){let i=e?1:2,r=-1;if(n!==null)for(let o=0;o<n.length;o++){let s=n[o];typeof s=="number"?r=s:r===i&&(Array.isArray(t)||(t=t===void 0?[]:["",t]),Fa(t,s,e?!0:n[++o]))}return t===void 0?null:t}function bI(t,n,e){if(e==null||e==="")return ze;let i=[],r=Ht(e);if(Array.isArray(r))for(let o=0;o<r.length;o++)t(i,r[o],!0);else if(r instanceof Set)for(let o of r)t(i,o,!0);else if(typeof r=="object")for(let o in r)r.hasOwnProperty(o)&&t(i,o,r[o]);else typeof r=="string"&&n(i,r);return i}function DI(t,n,e){let i=String(n);i!==""&&!i.includes(" ")&&Fa(t,i,e)}function CI(t,n,e,i,r,o,s,a){r===et&&(r=ze);let l=0,c=0,d=0<r.length?r[0]:null,f=0<o.length?o[0]:null;for(;d!==null||f!==null;){let h=l<r.length?r[l+1]:void 0,p=c<o.length?o[c+1]:void 0,m=null,C;d===f?(l+=2,c+=2,h!==p&&(m=f,C=p)):f===null||d!==null&&d<f?(l+=2,m=d):(c+=2,m=f,C=p),m!==null&&Wy(t,n,e,i,m,C,s,a),d=l<r.length?r[l]:null,f=c<o.length?o[c]:null}}function Wy(t,n,e,i,r,o,s,a){if(!(n.type&3))return;let l=t.data,c=l[a+1],d=sI(c)?Xg(l,n,e,r,Ir(c),s):void 0;if(!bl(d)){bl(o)||rI(c)&&(o=Xg(l,null,e,r,a,s));let f=cu(Jt(),e);uw(i,s,f,r,o)}}function Xg(t,n,e,i,r,o){let s=n===null,a;for(;r>0;){let l=t[r],c=Array.isArray(l),d=c?l[1]:l,f=d===null,h=e[r+1];h===et&&(h=f?ze:void 0);let p=f?Pa(h,i):d===i?h:void 0;if(c&&!bl(p)&&(p=Pa(l,i)),bl(p)&&(a=p,s))return a;let m=t[r+1];r=s?Pi(m):Ir(m)}if(n!==null){let l=o?n.residualClasses:n.residualStyles;l!=null&&(a=Pa(l,i))}return a}function bl(t){return t!==void 0}function EI(t,n){return t==null||t===""||(typeof n=="string"?t=t+n:typeof t=="object"&&(t=Sa(Ht(t)))),t}function qy(t,n){return(t.flags&(n?8:16))!==0}function w(t,n=""){let e=U(),i=De(),r=t+be,o=i.firstCreatePass?Sr(i,r,1,n,null):i.data[r],s=wI(i,e,o,n);e[r]=s,Za()&&qf(i,e,s,o),yr(o,!1)}var wI=(t,n,e,i)=>(ko(!0),M0(n[me],i));function xI(t,n,e,i=""){return jt(t,ki(),e)?n+Di(e)+i:et}function II(t,n,e,i,r,o=""){let s=Jm(),a=ax(t,s,e,r);return Ua(2),a?n+Di(e)+i+Di(r)+o:et}function fe(t){return nn("",t),fe}function nn(t,n,e){let i=U(),r=xI(i,t,n,e);return r!==et&&Yy(i,Jt(),r),nn}function Hl(t,n,e,i,r){let o=U(),s=II(o,t,n,e,i,r);return s!==et&&Yy(o,Jt(),s),Hl}function Yy(t,n,e){let i=cu(n,t);S0(t[me],i,e)}function Kg(t,n,e){let i=De();i.firstCreatePass&&Zy(n,i.data,i.blueprint,Ot(t),e)}function Zy(t,n,e,i,r){if(t=Oe(t),Array.isArray(t))for(let o=0;o<t.length;o++)Zy(t[o],n,e,i,r);else{let o=De(),s=U(),a=Be(),l=yi(t)?t:Oe(t.provide),c=iu(t),d=a.providerIndexes&1048575,f=a.directiveStart,h=a.providerIndexes>>20;if(yi(t)||!t.multi){let p=new Oi(c,r,W,null),m=Hu(l,n,r?d:d+h,f);m===-1?(zu(ul(a,s),o,l),ju(o,t,n.length),n.push(l),a.directiveStart++,a.directiveEnd++,r&&(a.providerIndexes+=1048576),e.push(p),s.push(p)):(e[m]=p,s[m]=p)}else{let p=Hu(l,n,d+h,f),m=Hu(l,n,d,d+h),C=p>=0&&e[p],x=m>=0&&e[m];if(r&&!x||!r&&!C){zu(ul(a,s),o,l);let M=TI(r?SI:MI,e.length,r,i,c,t);!r&&x&&(e[m].providerFactory=M),ju(o,t,n.length,0),n.push(l),a.directiveStart++,a.directiveEnd++,r&&(a.providerIndexes+=1048576),e.push(M),s.push(M)}else{let M=Qy(e[r?m:p],c,!r&&i);ju(o,t,p>-1?p:m,M)}!r&&i&&x&&e[m].componentProviders++}}}function ju(t,n,e,i){let r=yi(n),o=Bm(n);if(r||o){let l=(o?Oe(n.useClass):n).prototype.ngOnDestroy;if(l){let c=t.destroyHooks||(t.destroyHooks=[]);if(!r&&n.multi){let d=c.indexOf(e);d===-1?c.push(e,[i,l]):c[d+1].push(i,l)}else c.push(e,l)}}}function Qy(t,n,e){return e&&t.componentProviders++,t.multi.push(n)-1}function Hu(t,n,e,i){for(let r=e;r<i;r++)if(n[r]===t)return r;return-1}function MI(t,n,e,i,r){return Mf(this.multi,[])}function SI(t,n,e,i,r){let o=this.multi,s;if(this.providerFactory){let a=this.providerFactory.componentProviders,l=Po(i,i[N],this.providerFactory.index,r);s=l.slice(0,a),Mf(o,s);for(let c=a;c<l.length;c++)s.push(l[c])}else s=[],Mf(o,s);return s}function Mf(t,n){for(let e=0;e<t.length;e++){let i=t[e];n.push(i())}return n}function TI(t,n,e,i,r,o){let s=new Oi(t,e,W,null);return s.multi=[],s.index=n,s.componentProviders=0,Qy(s,r,i&&!e),s}function Xe(t,n){return e=>{e.providersResolver=(i,r)=>Kg(i,r?r(t):t,!1),n&&(e.viewProvidersResolver=(i,r)=>Kg(i,r?r(n):n,!0))}}function AI(t,n){let e=t[n];return e===et?void 0:e}function kI(t,n,e,i,r,o){let s=n+e;return jt(t,s,r)?sx(t,s+1,o?i.call(o,r):i(r)):AI(t,s+1)}function mp(t,n){let e=De(),i,r=t+be;e.firstCreatePass?(i=RI(n,e.pipeRegistry),e.data[r]=i,i.onDestroy&&(e.destroyHooks??=[]).push(r,i.onDestroy)):i=e.data[r];let o=i.factory||(i.factory=wn(i.type,!0)),s,a=We(W);try{let l=dl(!1),c=o();return dl(l),uu(e,U(),r,c),c}finally{We(a)}}function RI(t,n){if(n)for(let e=n.length-1;e>=0;e--){let i=n[e];if(t===i.name)return i}}function gp(t,n,e){let i=t+be,r=U(),o=du(r,i);return NI(r,i)?kI(r,Km(),n,o.transform,e,o):o.transform(e)}function NI(t,n){return t[N].data[n].pure}function Xo(t,n){return Rl(t,n)}var Xy=(()=>{class t{applicationErrorHandler=u(cn);appRef=u(zt);taskService=u(Ri);ngZone=u(S);zonelessEnabled=u(Ro);tracing=u(Ut,{optional:!0});zoneIsDefined=typeof Zone<"u"&&!!Zone.root.run;schedulerTickApplyArgs=[{data:{__scheduler_tick__:!0}}];subscriptions=new ye;angularZoneId=this.zoneIsDefined?this.ngZone._inner?.get(Eo):null;scheduleInRootZone=!this.zonelessEnabled&&this.zoneIsDefined&&(u(ku,{optional:!0})??!1);cancelScheduledCallback=null;useMicrotaskScheduler=!1;runningTick=!1;pendingRenderTaskId=null;constructor(){this.subscriptions.add(this.appRef.afterTick.subscribe(()=>{let e=this.taskService.add();if(!this.runningTick&&(this.cleanup(),!this.zonelessEnabled||this.appRef.includeAllTestViews)){this.taskService.remove(e);return}this.switchToMicrotaskScheduler(),this.taskService.remove(e)})),this.subscriptions.add(this.ngZone.onUnstable.subscribe(()=>{this.runningTick||this.cleanup()}))}switchToMicrotaskScheduler(){this.ngZone.runOutsideAngular(()=>{let e=this.taskService.add();this.useMicrotaskScheduler=!0,queueMicrotask(()=>{this.useMicrotaskScheduler=!1,this.taskService.remove(e)})})}notify(e){if(!this.zonelessEnabled&&e===5)return;switch(e){case 0:{this.appRef.dirtyFlags|=2;break}case 3:case 2:case 4:case 5:case 1:{this.appRef.dirtyFlags|=4;break}case 6:{this.appRef.dirtyFlags|=2;break}case 12:{this.appRef.dirtyFlags|=16;break}case 13:{this.appRef.dirtyFlags|=2;break}case 11:break;default:this.appRef.dirtyFlags|=8}if(this.appRef.tracingSnapshot=this.tracing?.snapshot(this.appRef.tracingSnapshot)??null,!this.shouldScheduleTick())return;let i=this.useMicrotaskScheduler?hg:Mu;this.pendingRenderTaskId=this.taskService.add(),this.scheduleInRootZone?this.cancelScheduledCallback=Zone.root.run(()=>i(()=>this.tick())):this.cancelScheduledCallback=this.ngZone.runOutsideAngular(()=>i(()=>this.tick()))}shouldScheduleTick(){return!(this.appRef.destroyed||this.pendingRenderTaskId!==null||this.runningTick||this.appRef._runningTick||!this.zonelessEnabled&&this.zoneIsDefined&&Zone.current.get(Eo+this.angularZoneId))}tick(){if(this.runningTick||this.appRef.destroyed)return;if(this.appRef.dirtyFlags===0){this.cleanup();return}!this.zonelessEnabled&&this.appRef.dirtyFlags&7&&(this.appRef.dirtyFlags|=1);let e=this.taskService.add();try{this.ngZone.run(()=>{this.runningTick=!0,this.appRef._tick()},void 0,this.schedulerTickApplyArgs)}catch(i){this.applicationErrorHandler(i)}finally{this.taskService.remove(e),this.cleanup()}}ngOnDestroy(){this.subscriptions.unsubscribe(),this.cleanup()}cleanup(){if(this.runningTick=!1,this.cancelScheduledCallback?.(),this.cancelScheduledCallback=null,this.pendingRenderTaskId!==null){let e=this.pendingRenderTaskId;this.pendingRenderTaskId=null,this.taskService.remove(e)}}static \u0275fac=function(i){return new(i||t)};static \u0275prov=_({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function Ky(){return[{provide:Xt,useExisting:Xy},{provide:S,useClass:wo},{provide:Ro,useValue:!0}]}function OI(){return typeof $localize<"u"&&$localize.locale||Qo}var Ul=new y("",{factory:()=>u(Ul,{optional:!0,skipSelf:!0})||OI()});function Et(t){return Dm(t)}function ke(t,n){return ro(t,n?.equal)}var i_=Symbol("InputSignalNode#UNSET"),YI=J(D({},oo),{transformFn:void 0,applyValueToInputSignal(t,n){er(t,n)}});function r_(t,n){let e=Object.create(YI);e.value=t,e.transformFn=n?.transform;function i(){if(ai(e),e.value===i_){let r=null;throw new A(-950,r)}return e.value}return i[Ne]=e,i}var Rr=class{attributeName;constructor(n){this.attributeName=n}__NG_ELEMENT_ID__=()=>Tf(this.attributeName);toString(){return`HostAttributeToken ${this.attributeName}`}};function Jy(t,n){return r_(t,n)}function ZI(t){return r_(i_,t)}var jn=(Jy.required=ZI,Jy);function e_(t,n){return op(n)}function QI(t,n){return sp(n)}var es=(e_.required=QI,e_);function t_(t,n){return op(n)}function XI(t,n){return sp(n)}var o_=(t_.required=XI,t_);var yp=new y(""),KI=new y("");function Ko(t){return!t.moduleRef}function JI(t){let n=Ko(t)?t.r3Injector:t.moduleRef.injector,e=n.get(S);return e.run(()=>{Ko(t)?t.r3Injector.resolveInjectorInitializers():t.moduleRef.resolveInjectorInitializers();let i=n.get(cn),r;if(e.runOutsideAngular(()=>{r=e.onError.subscribe({next:i})}),Ko(t)){let o=()=>n.destroy(),s=t.platformInjector.get(yp);s.add(o),n.onDestroy(()=>{r.unsubscribe(),s.delete(o)})}else{let o=()=>t.moduleRef.destroy(),s=t.platformInjector.get(yp);s.add(o),t.moduleRef.onDestroy(()=>{Fo(t.allPlatformModules,t.moduleRef),r.unsubscribe(),s.delete(o)})}return tM(i,e,()=>{let o=n.get(Ri),s=o.add(),a=n.get(dp);return a.runInitializers(),a.donePromise.then(()=>{let l=n.get(Ul,Qo);if(jy(l||Qo),!n.get(KI,!0))return Ko(t)?n.get(zt):(t.allPlatformModules.push(t.moduleRef),t.moduleRef);if(Ko(t)){let d=n.get(zt);return t.rootComponent!==void 0&&d.bootstrap(t.rootComponent),d}else return eM?.(t.moduleRef,t.allPlatformModules),t.moduleRef}).finally(()=>{o.remove(s)})})})}var eM;function tM(t,n,e){try{let i=e();return Tr(i)?i.catch(r=>{throw n.runOutsideAngular(()=>t(r)),r}):i}catch(i){throw n.runOutsideAngular(()=>t(i)),i}}var zl=null;function nM(t=[],n){return P.create({name:n,providers:[{provide:Io,useValue:"platform"},{provide:yp,useValue:new Set([()=>zl=null])},...t]})}function iM(t=[]){if(zl)return zl;let n=nM(t);return zl=n,Ly(),rM(n),n}function rM(t){let n=t.get(Dl,null);pr(t,()=>{n?.forEach(e=>e())})}var oM=1e4;var zz=oM-1e3;var ot=(()=>{class t{static __NG_ELEMENT_ID__=sM}return t})();function sM(t){return aM(Be(),U(),(t&16)===16)}function aM(t,n,e){if(ln(t)&&!e){let i=vt(t.index,n);return new On(i,i)}else if(t.type&175){let i=n[Ye];return new On(i,n)}return null}function s_(t){let{rootComponent:n,appProviders:e,platformProviders:i,platformRef:r}=t;ce(oe.BootstrapApplicationStart);try{let o=r?.injector??iM(i),s=[Ky(),gg,...e||[]],a=new jo({providers:s,parent:o,debugName:"",runEnvironmentInitializers:!1});return JI({r3Injector:a.injector,platformInjector:o,rootComponent:n})}catch(o){return Promise.reject(o)}finally{ce(oe.BootstrapApplicationEnd)}}function he(t){return typeof t=="boolean"?t:t!=null&&t!=="false"}function Nr(t,n=NaN){return!isNaN(parseFloat(t))&&!isNaN(Number(t))?Number(t):n}var vp=Symbol("NOT_SET"),a_=new Set,lM=J(D({},oo),{kind:"afterRenderEffectPhase",consumerIsAlwaysLive:!0,consumerAllowSignalWrites:!0,value:vp,cleanup:null,consumerMarkedDirty(){if(this.sequence.impl.executing){if(this.sequence.lastPhase===null||this.sequence.lastPhase<this.phase)return;this.sequence.erroredOrDestroyed=!0}this.sequence.scheduler.notify(7)},phaseFn(t){if(this.sequence.lastPhase=this.phase,!this.dirty)return this.signal;if(this.dirty=!1,this.value!==vp&&!Ki(this))return this.signal;try{for(let r of this.cleanup??a_)r()}finally{this.cleanup?.clear()}let n=[];t!==void 0&&n.push(t),n.push(this.registerCleanupFn);let e=Dn(this),i;try{i=this.userFn.apply(null,n)}finally{li(this,e)}return(this.value===vp||!this.equal(this.value,i))&&(this.value=i,this.version++),this.signal}}),_p=class extends Lo{scheduler;lastPhase=null;nodes=[void 0,void 0,void 0,void 0];onDestroyFns=null;constructor(n,e,i,r,o,s=null){super(n,[void 0,void 0,void 0,void 0],i,!1,o.get(Pt),s),this.scheduler=r;for(let a of $f){let l=e[a];if(l===void 0)continue;let c=Object.create(lM);c.sequence=this,c.phase=a,c.userFn=l,c.dirty=!0,c.signal=()=>(ai(c),c.value),c.signal[Ne]=c,c.registerCleanupFn=d=>(c.cleanup??=new Set).add(d),this.nodes[a]=c,this.hooks[a]=d=>c.phaseFn(d)}}afterRun(){super.afterRun(),this.lastPhase=null}destroy(){if(this.onDestroyFns!==null)for(let n of this.onDestroyFns)n();super.destroy();for(let n of this.nodes)if(n)try{for(let e of n.cleanup??a_)e()}finally{Cn(n)}}};function l_(t,n){let e=n?.injector??u(P),i=e.get(Xt),r=e.get(Sl),o=e.get(Ut,null,{optional:!0});r.impl??=e.get(Gf);let s=t;typeof s=="function"&&(s={mixedReadWrite:t});let a=e.get(_r,null,{optional:!0}),l=new _p(r.impl,[s.earlyRead,s.write,s.mixedReadWrite,s.read],a?.view,i,e,o?.snapshot(null));return r.impl.register(l),l}function $l(t,n){let e=Sn(t),i=n.elementInjector||fr();return new xr(e).create(i,n.projectableNodes,n.hostElement,n.environmentInjector,n.directives,n.bindings)}var c_=null;function wt(){return c_}function bp(t){c_??=t}var ts=class{},Or=(()=>{class t{historyGo(e){throw new Error("")}static \u0275fac=function(i){return new(i||t)};static \u0275prov=_({token:t,factory:()=>u(d_),providedIn:"platform"})}return t})();var d_=(()=>{class t extends Or{_location;_history;_doc=u(k);constructor(){super(),this._location=window.location,this._history=window.history}getBaseHrefFromDOM(){return wt().getBaseHref(this._doc)}onPopState(e){let i=wt().getGlobalEventTarget(this._doc,"window");return i.addEventListener("popstate",e,!1),()=>i.removeEventListener("popstate",e)}onHashChange(e){let i=wt().getGlobalEventTarget(this._doc,"window");return i.addEventListener("hashchange",e,!1),()=>i.removeEventListener("hashchange",e)}get href(){return this._location.href}get protocol(){return this._location.protocol}get hostname(){return this._location.hostname}get port(){return this._location.port}get pathname(){return this._location.pathname}get search(){return this._location.search}get hash(){return this._location.hash}set pathname(e){this._location.pathname=e}pushState(e,i,r){this._history.pushState(e,i,r)}replaceState(e,i,r){this._history.replaceState(e,i,r)}forward(){this._history.forward()}back(){this._history.back()}historyGo(e=0){this._history.go(e)}getState(){return this._history.state}static \u0275fac=function(i){return new(i||t)};static \u0275prov=_({token:t,factory:()=>new t,providedIn:"platform"})}return t})();function p_(t,n){return t?n?t.endsWith("/")?n.startsWith("/")?t+n.slice(1):t+n:n.startsWith("/")?t+n:`${t}/${n}`:t:n}function u_(t){let n=t.search(/#|\?|$/);return t[n-1]==="/"?t.slice(0,n-1)+t.slice(n):t}function Hn(t){return t&&t[0]!=="?"?`?${t}`:t}var Gl=(()=>{class t{historyGo(e){throw new Error("")}static \u0275fac=function(i){return new(i||t)};static \u0275prov=_({token:t,factory:()=>u(dM),providedIn:"root"})}return t})(),cM=new y(""),dM=(()=>{class t extends Gl{_platformLocation;_baseHref;_removeListenerFns=[];constructor(e,i){super(),this._platformLocation=e,this._baseHref=i??this._platformLocation.getBaseHrefFromDOM()??u(k).location?.origin??""}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(e){this._removeListenerFns.push(this._platformLocation.onPopState(e),this._platformLocation.onHashChange(e))}getBaseHref(){return this._baseHref}prepareExternalUrl(e){return p_(this._baseHref,e)}path(e=!1){let i=this._platformLocation.pathname+Hn(this._platformLocation.search),r=this._platformLocation.hash;return r&&e?`${i}${r}`:i}pushState(e,i,r,o){let s=this.prepareExternalUrl(r+Hn(o));this._platformLocation.pushState(e,i,s)}replaceState(e,i,r,o){let s=this.prepareExternalUrl(r+Hn(o));this._platformLocation.replaceState(e,i,s)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(e=0){this._platformLocation.historyGo?.(e)}static \u0275fac=function(i){return new(i||t)(I(Or),I(cM,8))};static \u0275prov=_({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Wl=(()=>{class t{_subject=new E;_basePath;_locationStrategy;_urlChangeListeners=[];_urlChangeSubscription=null;constructor(e){this._locationStrategy=e;let i=this._locationStrategy.getBaseHref();this._basePath=pM(u_(f_(i))),this._locationStrategy.onPopState(r=>{this._subject.next({url:this.path(!0),pop:!0,state:r.state,type:r.type})})}ngOnDestroy(){this._urlChangeSubscription?.unsubscribe(),this._urlChangeListeners=[]}path(e=!1){return this.normalize(this._locationStrategy.path(e))}getState(){return this._locationStrategy.getState()}isCurrentPathEqualTo(e,i=""){return this.path()==this.normalize(e+Hn(i))}normalize(e){return t.stripTrailingSlash(fM(this._basePath,f_(e)))}prepareExternalUrl(e){return e&&e[0]!=="/"&&(e="/"+e),this._locationStrategy.prepareExternalUrl(e)}go(e,i="",r=null){this._locationStrategy.pushState(r,"",e,i),this._notifyUrlChangeListeners(this.prepareExternalUrl(e+Hn(i)),r)}replaceState(e,i="",r=null){this._locationStrategy.replaceState(r,"",e,i),this._notifyUrlChangeListeners(this.prepareExternalUrl(e+Hn(i)),r)}forward(){this._locationStrategy.forward()}back(){this._locationStrategy.back()}historyGo(e=0){this._locationStrategy.historyGo?.(e)}onUrlChange(e){return this._urlChangeListeners.push(e),this._urlChangeSubscription??=this.subscribe(i=>{this._notifyUrlChangeListeners(i.url,i.state)}),()=>{let i=this._urlChangeListeners.indexOf(e);this._urlChangeListeners.splice(i,1),this._urlChangeListeners.length===0&&(this._urlChangeSubscription?.unsubscribe(),this._urlChangeSubscription=null)}}_notifyUrlChangeListeners(e="",i){this._urlChangeListeners.forEach(r=>r(e,i))}subscribe(e,i,r){return this._subject.subscribe({next:e,error:i??void 0,complete:r??void 0})}static normalizeQueryParams=Hn;static joinWithSlash=p_;static stripTrailingSlash=u_;static \u0275fac=function(i){return new(i||t)(I(Gl))};static \u0275prov=_({token:t,factory:()=>uM(),providedIn:"root"})}return t})();function uM(){return new Wl(I(Gl))}function fM(t,n){if(!t||!n.startsWith(t))return n;let e=n.substring(t.length);return e===""||["/",";","?","#"].includes(e[0])?e:n}function f_(t){return t.replace(/\/index.html$/,"")}function pM(t){if(new RegExp("^(https?:)?//").test(t)){let[,e]=t.split(/\/\/[^\/]+/);return e}return t}var ns=(()=>{class t{_viewContainerRef;_viewRef=null;ngTemplateOutletContext=null;ngTemplateOutlet=null;ngTemplateOutletInjector=null;injector=u(P);constructor(e){this._viewContainerRef=e}ngOnChanges(e){if(this._shouldRecreateView(e)){let i=this._viewContainerRef;if(this._viewRef&&i.remove(i.indexOf(this._viewRef)),!this.ngTemplateOutlet){this._viewRef=null;return}let r=this._createContextForwardProxy();this._viewRef=i.createEmbeddedView(this.ngTemplateOutlet,r,{injector:this._getInjector()})}}_getInjector(){return this.ngTemplateOutletInjector==="outlet"?this.injector:this.ngTemplateOutletInjector??void 0}_shouldRecreateView(e){return!!e.ngTemplateOutlet||!!e.ngTemplateOutletInjector}_createContextForwardProxy(){return new Proxy({},{set:(e,i,r)=>this.ngTemplateOutletContext?Reflect.set(this.ngTemplateOutletContext,i,r):!1,get:(e,i,r)=>{if(this.ngTemplateOutletContext)return Reflect.get(this.ngTemplateOutletContext,i,r)}})}static \u0275fac=function(i){return new(i||t)(W(Dt))};static \u0275dir=F({type:t,selectors:[["","ngTemplateOutlet",""]],inputs:{ngTemplateOutletContext:"ngTemplateOutletContext",ngTemplateOutlet:"ngTemplateOutlet",ngTemplateOutletInjector:"ngTemplateOutletInjector"},features:[_t]})}return t})();function is(t,n){n=encodeURIComponent(n);for(let e of t.split(";")){let i=e.indexOf("="),[r,o]=i==-1?[e,""]:[e.slice(0,i),e.slice(i+1)];if(r.trim()===n)return decodeURIComponent(o)}return null}var ji=class{};var Dp="browser";function h_(t){return t===Dp}var rs=class{_doc;constructor(n){this._doc=n}manager},ql=(()=>{class t extends rs{constructor(e){super(e)}supports(e){return!0}addEventListener(e,i,r,o){return e.addEventListener(i,r,o),()=>this.removeEventListener(e,i,r,o)}removeEventListener(e,i,r,o){return e.removeEventListener(i,r,o)}static \u0275fac=function(i){return new(i||t)(I(k))};static \u0275prov=_({token:t,factory:t.\u0275fac})}return t})(),Ql=new y(""),xp=(()=>{class t{_zone;_plugins;_eventNameToPlugin=new Map;constructor(e,i){this._zone=i,e.forEach(s=>{s.manager=this});let r=e.filter(s=>!(s instanceof ql));this._plugins=r.slice().reverse();let o=e.find(s=>s instanceof ql);o&&this._plugins.push(o)}addEventListener(e,i,r,o){return this._findPluginFor(i).addEventListener(e,i,r,o)}getZone(){return this._zone}_findPluginFor(e){let i=this._eventNameToPlugin.get(e);if(i)return i;if(i=this._plugins.find(o=>o.supports(e)),!i)throw new A(5101,!1);return this._eventNameToPlugin.set(e,i),i}static \u0275fac=function(i){return new(i||t)(I(Ql),I(S))};static \u0275prov=_({token:t,factory:t.\u0275fac})}return t})(),Cp="ng-app-id";function m_(t){for(let n of t)n.remove()}function g_(t,n){let e=n.createElement("style");return e.textContent=t,e}function vM(t,n,e,i){let r=t.head?.querySelectorAll(`style[${Cp}="${n}"],link[${Cp}="${n}"]`);if(r)for(let o of r)o.removeAttribute(Cp),o instanceof HTMLLinkElement?i.set(o.href.slice(o.href.lastIndexOf("/")+1),{usage:0,elements:[o]}):o.textContent&&e.set(o.textContent,{usage:0,elements:[o]})}function wp(t,n){let e=n.createElement("link");return e.setAttribute("rel","stylesheet"),e.setAttribute("href",t),e}var Ip=(()=>{class t{doc;appId;nonce;inline=new Map;external=new Map;hosts=new Set;constructor(e,i,r,o={}){this.doc=e,this.appId=i,this.nonce=r,vM(e,i,this.inline,this.external),this.hosts.add(e.head)}addStyles(e,i){for(let r of e)this.addUsage(r,this.inline,g_);i?.forEach(r=>this.addUsage(r,this.external,wp))}removeStyles(e,i){for(let r of e)this.removeUsage(r,this.inline);i?.forEach(r=>this.removeUsage(r,this.external))}addUsage(e,i,r){let o=i.get(e);o?o.usage++:i.set(e,{usage:1,elements:[...this.hosts].map(s=>this.addElement(s,r(e,this.doc)))})}removeUsage(e,i){let r=i.get(e);r&&(r.usage--,r.usage<=0&&(m_(r.elements),i.delete(e)))}ngOnDestroy(){for(let[,{elements:e}]of[...this.inline,...this.external])m_(e);this.hosts.clear()}addHost(e){this.hosts.add(e);for(let[i,{elements:r}]of this.inline)r.push(this.addElement(e,g_(i,this.doc)));for(let[i,{elements:r}]of this.external)r.push(this.addElement(e,wp(i,this.doc)))}removeHost(e){this.hosts.delete(e)}addElement(e,i){return this.nonce&&i.setAttribute("nonce",this.nonce),e.appendChild(i)}static \u0275fac=function(i){return new(i||t)(I(k),I(Pn),I(Vi,8),I(Li))};static \u0275prov=_({token:t,factory:t.\u0275fac})}return t})(),Ep={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",math:"http://www.w3.org/1998/Math/MathML"},Mp=/%COMP%/g;var y_="%COMP%",yM=`_nghost-${y_}`,_M=`_ngcontent-${y_}`,bM=!0,DM=new y("",{factory:()=>bM});function CM(t){return _M.replace(Mp,t)}function EM(t){return yM.replace(Mp,t)}function __(t,n){return n.map(e=>e.replace(Mp,t))}var Sp=(()=>{class t{eventManager;sharedStylesHost;appId;removeStylesOnCompDestroy;doc;ngZone;nonce;tracingService;rendererByCompId=new Map;defaultRenderer;constructor(e,i,r,o,s,a,l=null,c=null){this.eventManager=e,this.sharedStylesHost=i,this.appId=r,this.removeStylesOnCompDestroy=o,this.doc=s,this.ngZone=a,this.nonce=l,this.tracingService=c,this.defaultRenderer=new os(e,s,a,this.tracingService)}createRenderer(e,i){if(!e||!i)return this.defaultRenderer;let r=this.getOrCreateRenderer(e,i);return r instanceof Zl?r.applyToHost(e):r instanceof ss&&r.applyStyles(),r}getOrCreateRenderer(e,i){let r=this.rendererByCompId,o=r.get(i.id);if(!o){let s=this.doc,a=this.ngZone,l=this.eventManager,c=this.sharedStylesHost,d=this.removeStylesOnCompDestroy,f=this.tracingService;switch(i.encapsulation){case Bt.Emulated:o=new Zl(l,c,i,this.appId,d,s,a,f);break;case Bt.ShadowDom:return new Yl(l,e,i,s,a,this.nonce,f,c);case Bt.ExperimentalIsolatedShadowDom:return new Yl(l,e,i,s,a,this.nonce,f);default:o=new ss(l,c,i,d,s,a,f);break}r.set(i.id,o)}return o}ngOnDestroy(){this.rendererByCompId.clear()}componentReplaced(e){this.rendererByCompId.delete(e)}static \u0275fac=function(i){return new(i||t)(I(xp),I(Ip),I(Pn),I(DM),I(k),I(S),I(Vi),I(Ut,8))};static \u0275prov=_({token:t,factory:t.\u0275fac})}return t})(),os=class{eventManager;doc;ngZone;tracingService;data=Object.create(null);throwOnSyntheticProps=!0;constructor(n,e,i,r){this.eventManager=n,this.doc=e,this.ngZone=i,this.tracingService=r}destroy(){}destroyNode=null;createElement(n,e){return e?this.doc.createElementNS(Ep[e]||e,n):this.doc.createElement(n)}createComment(n){return this.doc.createComment(n)}createText(n){return this.doc.createTextNode(n)}appendChild(n,e){(v_(n)?n.content:n).appendChild(e)}insertBefore(n,e,i){n&&(v_(n)?n.content:n).insertBefore(e,i)}removeChild(n,e){e.remove()}selectRootElement(n,e){let i=typeof n=="string"?this.doc.querySelector(n):n;if(!i)throw new A(-5104,!1);return e||(i.textContent=""),i}parentNode(n){return n.parentNode}nextSibling(n){return n.nextSibling}setAttribute(n,e,i,r){if(r){e=r+":"+e;let o=Ep[r];o?n.setAttributeNS(o,e,i):n.setAttribute(e,i)}else n.setAttribute(e,i)}removeAttribute(n,e,i){if(i){let r=Ep[i];r?n.removeAttributeNS(r,e):n.removeAttribute(`${i}:${e}`)}else n.removeAttribute(e)}addClass(n,e){n.classList.add(e)}removeClass(n,e){n.classList.remove(e)}setStyle(n,e,i,r){r&(tn.DashCase|tn.Important)?n.style.setProperty(e,i,r&tn.Important?"important":""):n.style[e]=i}removeStyle(n,e,i){i&tn.DashCase?n.style.removeProperty(e):n.style[e]=""}setProperty(n,e,i){n!=null&&(n[e]=i)}setValue(n,e){n.nodeValue=e}listen(n,e,i,r){if(typeof n=="string"&&(n=wt().getGlobalEventTarget(this.doc,n),!n))throw new A(5102,!1);let o=this.decoratePreventDefault(i);return this.tracingService?.wrapEventListener&&(o=this.tracingService.wrapEventListener(n,e,o)),this.eventManager.addEventListener(n,e,o,r)}decoratePreventDefault(n){return e=>{if(e==="__ngUnwrap__")return n;n(e)===!1&&e.preventDefault()}}};function v_(t){return t.tagName==="TEMPLATE"&&t.content!==void 0}var Yl=class extends os{hostEl;sharedStylesHost;shadowRoot;constructor(n,e,i,r,o,s,a,l){super(n,r,o,a),this.hostEl=e,this.sharedStylesHost=l,this.shadowRoot=e.attachShadow({mode:"open"}),this.sharedStylesHost&&this.sharedStylesHost.addHost(this.shadowRoot);let c=i.styles;c=__(i.id,c);for(let f of c){let h=document.createElement("style");s&&h.setAttribute("nonce",s),h.textContent=f,this.shadowRoot.appendChild(h)}let d=i.getExternalStyles?.();if(d)for(let f of d){let h=wp(f,r);s&&h.setAttribute("nonce",s),this.shadowRoot.appendChild(h)}}nodeOrShadowRoot(n){return n===this.hostEl?this.shadowRoot:n}appendChild(n,e){return super.appendChild(this.nodeOrShadowRoot(n),e)}insertBefore(n,e,i){return super.insertBefore(this.nodeOrShadowRoot(n),e,i)}removeChild(n,e){return super.removeChild(null,e)}parentNode(n){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(n)))}destroy(){this.sharedStylesHost&&this.sharedStylesHost.removeHost(this.shadowRoot)}},ss=class extends os{sharedStylesHost;removeStylesOnCompDestroy;styles;styleUrls;constructor(n,e,i,r,o,s,a,l){super(n,o,s,a),this.sharedStylesHost=e,this.removeStylesOnCompDestroy=r;let c=i.styles;this.styles=l?__(l,c):c,this.styleUrls=i.getExternalStyles?.(l)}applyStyles(){this.sharedStylesHost.addStyles(this.styles,this.styleUrls)}destroy(){this.removeStylesOnCompDestroy&&Fi.size===0&&this.sharedStylesHost.removeStyles(this.styles,this.styleUrls)}},Zl=class extends ss{contentAttr;hostAttr;constructor(n,e,i,r,o,s,a,l){let c=r+"-"+i.id;super(n,e,i,o,s,a,l,c),this.contentAttr=CM(c),this.hostAttr=EM(c)}applyToHost(n){this.applyStyles(),this.setAttribute(n,this.hostAttr,"")}createElement(n,e){let i=super.createElement(n,e);return super.setAttribute(i,this.contentAttr,""),i}};var Xl=class t extends ts{supportsDOMEvents=!0;static makeCurrent(){bp(new t)}onAndCancel(n,e,i,r){return n.addEventListener(e,i,r),()=>{n.removeEventListener(e,i,r)}}dispatchEvent(n,e){n.dispatchEvent(e)}remove(n){n.remove()}createElement(n,e){return e=e||this.getDefaultDocument(),e.createElement(n)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(n){return n.nodeType===Node.ELEMENT_NODE}isShadowRoot(n){return n instanceof DocumentFragment}getGlobalEventTarget(n,e){return e==="window"?window:e==="document"?n:e==="body"?n.body:null}getBaseHref(n){let e=wM();return e==null?null:xM(e)}resetBaseElement(){as=null}getUserAgent(){return window.navigator.userAgent}getCookie(n){return is(document.cookie,n)}},as=null;function wM(){return as=as||document.head.querySelector("base"),as?as.getAttribute("href"):null}function xM(t){return new URL(t,document.baseURI).pathname}var IM=(()=>{class t{build(){return new XMLHttpRequest}static \u0275fac=function(i){return new(i||t)};static \u0275prov=_({token:t,factory:t.\u0275fac})}return t})(),b_=["alt","control","meta","shift"],MM={"\b":"Backspace","	":"Tab","\x7F":"Delete","\x1B":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},SM={alt:t=>t.altKey,control:t=>t.ctrlKey,meta:t=>t.metaKey,shift:t=>t.shiftKey},D_=(()=>{class t extends rs{constructor(e){super(e)}supports(e){return t.parseEventName(e)!=null}addEventListener(e,i,r,o){let s=t.parseEventName(i),a=t.eventCallback(s.fullKey,r,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>wt().onAndCancel(e,s.domEventName,a,o))}static parseEventName(e){let i=e.toLowerCase().split("."),r=i.shift();if(i.length===0||!(r==="keydown"||r==="keyup"))return null;let o=t._normalizeKey(i.pop()),s="",a=i.indexOf("code");if(a>-1&&(i.splice(a,1),s="code."),b_.forEach(c=>{let d=i.indexOf(c);d>-1&&(i.splice(d,1),s+=c+".")}),s+=o,i.length!=0||o.length===0)return null;let l={};return l.domEventName=r,l.fullKey=s,l}static matchEventFullKeyCode(e,i){let r=MM[e.key]||e.key,o="";return i.indexOf("code.")>-1&&(r=e.code,o="code."),r==null||!r?!1:(r=r.toLowerCase(),r===" "?r="space":r==="."&&(r="dot"),b_.forEach(s=>{if(s!==r){let a=SM[s];a(e)&&(o+=s+".")}}),o+=r,o===i)}static eventCallback(e,i,r){return o=>{t.matchEventFullKeyCode(o,e)&&r.runGuarded(()=>i(o))}}static _normalizeKey(e){return e==="esc"?"escape":e}static \u0275fac=function(i){return new(i||t)(I(k))};static \u0275prov=_({token:t,factory:t.\u0275fac})}return t})();async function Tp(t,n,e){let i=D({rootComponent:t},TM(n,e));return s_(i)}function TM(t,n){return{platformRef:n?.platformRef,appProviders:[...OM,...t?.providers??[]],platformProviders:NM}}function AM(){Xl.makeCurrent()}function kM(){return new Je}function RM(){return kf(document),document}var NM=[{provide:Li,useValue:Dp},{provide:Dl,useValue:AM,multi:!0},{provide:k,useFactory:RM}];var OM=[{provide:Io,useValue:"root"},{provide:Je,useFactory:kM},{provide:Ql,useClass:ql,multi:!0},{provide:Ql,useClass:D_,multi:!0},Sp,Ip,xp,{provide:Te,useExisting:Sp},{provide:ji,useClass:IM},[]];var Un=class t{headers;normalizedNames=new Map;lazyInit;lazyUpdate=null;constructor(n){n?typeof n=="string"?this.lazyInit=()=>{this.headers=new Map,n.split(`
`).forEach(e=>{let i=e.indexOf(":");if(i>0){let r=e.slice(0,i),o=e.slice(i+1).trim();this.addHeaderEntry(r,o)}})}:typeof Headers<"u"&&n instanceof Headers?(this.headers=new Map,n.forEach((e,i)=>{this.addHeaderEntry(i,e)})):this.lazyInit=()=>{this.headers=new Map,Object.entries(n).forEach(([e,i])=>{this.setHeaderEntries(e,i)})}:this.headers=new Map}has(n){return this.init(),this.headers.has(n.toLowerCase())}get(n){this.init();let e=this.headers.get(n.toLowerCase());return e&&e.length>0?e[0]:null}keys(){return this.init(),Array.from(this.normalizedNames.values())}getAll(n){return this.init(),this.headers.get(n.toLowerCase())||null}append(n,e){return this.clone({name:n,value:e,op:"a"})}set(n,e){return this.clone({name:n,value:e,op:"s"})}delete(n,e){return this.clone({name:n,value:e,op:"d"})}maybeSetNormalizedName(n,e){this.normalizedNames.has(e)||this.normalizedNames.set(e,n)}init(){this.lazyInit&&(this.lazyInit instanceof t?this.copyFrom(this.lazyInit):this.lazyInit(),this.lazyInit=null,this.lazyUpdate&&(this.lazyUpdate.forEach(n=>this.applyUpdate(n)),this.lazyUpdate=null))}copyFrom(n){n.init(),Array.from(n.headers.keys()).forEach(e=>{this.headers.set(e,n.headers.get(e)),this.normalizedNames.set(e,n.normalizedNames.get(e))})}clone(n){let e=new t;return e.lazyInit=this.lazyInit&&this.lazyInit instanceof t?this.lazyInit:this,e.lazyUpdate=(this.lazyUpdate||[]).concat([n]),e}applyUpdate(n){let e=n.name.toLowerCase();switch(n.op){case"a":case"s":let i=n.value;if(typeof i=="string"&&(i=[i]),i.length===0)return;this.maybeSetNormalizedName(n.name,e);let r=(n.op==="a"?this.headers.get(e):void 0)||[];r.push(...i),this.headers.set(e,r);break;case"d":let o=n.value;if(!o)this.headers.delete(e),this.normalizedNames.delete(e);else{let s=this.headers.get(e);if(!s)return;s=s.filter(a=>o.indexOf(a)===-1),s.length===0?(this.headers.delete(e),this.normalizedNames.delete(e)):this.headers.set(e,s)}break}}addHeaderEntry(n,e){let i=n.toLowerCase();this.maybeSetNormalizedName(n,i),this.headers.has(i)?this.headers.get(i).push(e):this.headers.set(i,[e])}setHeaderEntries(n,e){let i=(Array.isArray(e)?e:[e]).map(o=>o.toString()),r=n.toLowerCase();this.headers.set(r,i),this.maybeSetNormalizedName(n,r)}forEach(n){this.init(),Array.from(this.normalizedNames.keys()).forEach(e=>n(this.normalizedNames.get(e),this.headers.get(e)))}};var Jl=class{map=new Map;set(n,e){return this.map.set(n,e),this}get(n){return this.map.has(n)||this.map.set(n,n.defaultValue()),this.map.get(n)}delete(n){return this.map.delete(n),this}has(n){return this.map.has(n)}keys(){return this.map.keys()}},ec=class{encodeKey(n){return C_(n)}encodeValue(n){return C_(n)}decodeKey(n){return decodeURIComponent(n)}decodeValue(n){return decodeURIComponent(n)}};function FM(t,n){let e=new Map;return t.length>0&&t.replace(/^\?/,"").split("&").forEach(r=>{let o=r.indexOf("="),[s,a]=o==-1?[n.decodeKey(r),""]:[n.decodeKey(r.slice(0,o)),n.decodeValue(r.slice(o+1))],l=e.get(s)||[];l.push(a),e.set(s,l)}),e}var PM=/%(\d[a-f0-9])/gi,LM={40:"@","3A":":",24:"$","2C":",","3B":";","3D":"=","3F":"?","2F":"/"};function C_(t){return encodeURIComponent(t).replace(PM,(n,e)=>LM[e]??n)}function Kl(t){return`${t}`}var mn=class t{map;encoder;updates=null;cloneFrom=null;constructor(n={}){if(this.encoder=n.encoder||new ec,n.fromString){if(n.fromObject)throw new A(2805,!1);this.map=FM(n.fromString,this.encoder)}else n.fromObject?(this.map=new Map,Object.keys(n.fromObject).forEach(e=>{let i=n.fromObject[e],r=Array.isArray(i)?i.map(Kl):[Kl(i)];this.map.set(e,r)})):this.map=null}has(n){return this.init(),this.map.has(n)}get(n){this.init();let e=this.map.get(n);return e?e[0]:null}getAll(n){return this.init(),this.map.get(n)||null}keys(){return this.init(),Array.from(this.map.keys())}append(n,e){return this.clone({param:n,value:e,op:"a"})}appendAll(n){let e=[];return Object.keys(n).forEach(i=>{let r=n[i];Array.isArray(r)?r.forEach(o=>{e.push({param:i,value:o,op:"a"})}):e.push({param:i,value:r,op:"a"})}),this.clone(e)}set(n,e){return this.clone({param:n,value:e,op:"s"})}delete(n,e){return this.clone({param:n,value:e,op:"d"})}toString(){return this.init(),this.keys().map(n=>{let e=this.encoder.encodeKey(n);return this.map.get(n).map(i=>e+"="+this.encoder.encodeValue(i)).join("&")}).filter(n=>n!=="").join("&")}clone(n){let e=new t({encoder:this.encoder});return e.cloneFrom=this.cloneFrom||this,e.updates=(this.updates||[]).concat(n),e}init(){this.map===null&&(this.map=new Map),this.cloneFrom!==null&&(this.cloneFrom.init(),this.cloneFrom.keys().forEach(n=>this.map.set(n,this.cloneFrom.map.get(n))),this.updates.forEach(n=>{switch(n.op){case"a":case"s":let e=(n.op==="a"?this.map.get(n.param):void 0)||[];e.push(Kl(n.value)),this.map.set(n.param,e);break;case"d":if(n.value!==void 0){let i=this.map.get(n.param)||[],r=i.indexOf(Kl(n.value));r!==-1&&i.splice(r,1),i.length>0?this.map.set(n.param,i):this.map.delete(n.param)}else{this.map.delete(n.param);break}}}),this.cloneFrom=this.updates=null)}};function VM(t){switch(t){case"DELETE":case"GET":case"HEAD":case"OPTIONS":case"JSONP":return!1;default:return!0}}function E_(t){return typeof ArrayBuffer<"u"&&t instanceof ArrayBuffer}function w_(t){return typeof Blob<"u"&&t instanceof Blob}function x_(t){return typeof FormData<"u"&&t instanceof FormData}function BM(t){return typeof URLSearchParams<"u"&&t instanceof URLSearchParams}var I_="Content-Type",M_="Accept",S_="text/plain",T_="application/json",jM=`${T_}, ${S_}, */*`,Fr=class t{url;body=null;headers;context;reportProgress=!1;withCredentials=!1;credentials;keepalive=!1;cache;priority;mode;redirect;referrer;integrity;referrerPolicy;responseType="json";method;params;urlWithParams;transferCache;timeout;constructor(n,e,i,r){this.url=e,this.method=n.toUpperCase();let o;if(VM(this.method)||r?(this.body=i!==void 0?i:null,o=r):o=i,o){if(this.reportProgress=!!o.reportProgress,this.withCredentials=!!o.withCredentials,this.keepalive=!!o.keepalive,o.responseType&&(this.responseType=o.responseType),o.headers&&(this.headers=o.headers),o.context&&(this.context=o.context),o.params&&(this.params=o.params),o.priority&&(this.priority=o.priority),o.cache&&(this.cache=o.cache),o.credentials&&(this.credentials=o.credentials),typeof o.timeout=="number"){if(o.timeout<1||!Number.isInteger(o.timeout))throw new A(2822,"");this.timeout=o.timeout}o.mode&&(this.mode=o.mode),o.redirect&&(this.redirect=o.redirect),o.integrity&&(this.integrity=o.integrity),o.referrer&&(this.referrer=o.referrer),o.referrerPolicy&&(this.referrerPolicy=o.referrerPolicy),this.transferCache=o.transferCache}if(this.headers??=new Un,this.context??=new Jl,!this.params)this.params=new mn,this.urlWithParams=e;else{let s=this.params.toString();if(s.length===0)this.urlWithParams=e;else{let a=e.indexOf("?"),l=a===-1?"?":a<e.length-1?"&":"";this.urlWithParams=e+l+s}}}serializeBody(){return this.body===null?null:typeof this.body=="string"||E_(this.body)||w_(this.body)||x_(this.body)||BM(this.body)?this.body:this.body instanceof mn?this.body.toString():typeof this.body=="object"||typeof this.body=="boolean"||Array.isArray(this.body)?JSON.stringify(this.body):this.body.toString()}detectContentTypeHeader(){return this.body===null||x_(this.body)?null:w_(this.body)?this.body.type||null:E_(this.body)?null:typeof this.body=="string"?S_:this.body instanceof mn?"application/x-www-form-urlencoded;charset=UTF-8":typeof this.body=="object"||typeof this.body=="number"||typeof this.body=="boolean"?T_:null}clone(n={}){let e=n.method||this.method,i=n.url||this.url,r=n.responseType||this.responseType,o=n.keepalive??this.keepalive,s=n.priority||this.priority,a=n.cache||this.cache,l=n.mode||this.mode,c=n.redirect||this.redirect,d=n.credentials||this.credentials,f=n.referrer||this.referrer,h=n.integrity||this.integrity,p=n.referrerPolicy||this.referrerPolicy,m=n.transferCache??this.transferCache,C=n.timeout??this.timeout,x=n.body!==void 0?n.body:this.body,M=n.withCredentials??this.withCredentials,ve=n.reportProgress??this.reportProgress,lt=n.headers||this.headers,Le=n.params||this.params,to=n.context??this.context;return n.setHeaders!==void 0&&(lt=Object.keys(n.setHeaders).reduce((no,oi)=>no.set(oi,n.setHeaders[oi]),lt)),n.setParams&&(Le=Object.keys(n.setParams).reduce((no,oi)=>no.set(oi,n.setParams[oi]),Le)),new t(e,i,x,{params:Le,headers:lt,context:to,reportProgress:ve,responseType:r,withCredentials:M,transferCache:m,keepalive:o,cache:a,priority:s,timeout:C,mode:l,redirect:c,credentials:d,referrer:f,integrity:h,referrerPolicy:p})}},Hi=(function(t){return t[t.Sent=0]="Sent",t[t.UploadProgress=1]="UploadProgress",t[t.ResponseHeader=2]="ResponseHeader",t[t.DownloadProgress=3]="DownloadProgress",t[t.Response=4]="Response",t[t.User=5]="User",t})(Hi||{}),Lr=class{headers;status;statusText;url;ok;type;redirected;responseType;constructor(n,e=200,i="OK"){this.headers=n.headers||new Un,this.status=n.status!==void 0?n.status:e,this.statusText=n.statusText||i,this.url=n.url||null,this.redirected=n.redirected,this.responseType=n.responseType,this.ok=this.status>=200&&this.status<300}},tc=class t extends Lr{constructor(n={}){super(n)}type=Hi.ResponseHeader;clone(n={}){return new t({headers:n.headers||this.headers,status:n.status!==void 0?n.status:this.status,statusText:n.statusText||this.statusText,url:n.url||this.url||void 0})}},ls=class t extends Lr{body;constructor(n={}){super(n),this.body=n.body!==void 0?n.body:null}type=Hi.Response;clone(n={}){return new t({body:n.body!==void 0?n.body:this.body,headers:n.headers||this.headers,status:n.status!==void 0?n.status:this.status,statusText:n.statusText||this.statusText,url:n.url||this.url||void 0,redirected:n.redirected??this.redirected,responseType:n.responseType??this.responseType})}},Pr=class extends Lr{name="HttpErrorResponse";message;error;ok=!1;constructor(n){super(n,0,"Unknown Error"),this.status>=200&&this.status<300?this.message=`Http failure during parsing for ${n.url||"(unknown url)"}`:this.message=`Http failure response for ${n.url||"(unknown url)"}: ${n.status} ${n.statusText}`,this.error=n.error||null}},HM=200,UM=204;var zM=new y("");var $M=/^\)\]\}',?\n/;var kp=(()=>{class t{xhrFactory;tracingService=u(Ut,{optional:!0});constructor(e){this.xhrFactory=e}maybePropagateTrace(e){return this.tracingService?.propagate?this.tracingService.propagate(e):e}handle(e){if(e.method==="JSONP")throw new A(-2800,!1);let i=this.xhrFactory;return Ue(null).pipe(_a(()=>new X(o=>{let s=i.build();if(s.open(e.method,e.urlWithParams),e.withCredentials&&(s.withCredentials=!0),e.headers.forEach((x,M)=>s.setRequestHeader(x,M.join(","))),e.headers.has(M_)||s.setRequestHeader(M_,jM),!e.headers.has(I_)){let x=e.detectContentTypeHeader();x!==null&&s.setRequestHeader(I_,x)}if(e.timeout&&(s.timeout=e.timeout),e.responseType){let x=e.responseType.toLowerCase();s.responseType=x!=="json"?x:"text"}let a=e.serializeBody(),l=null,c=()=>{if(l!==null)return l;let x=s.statusText||"OK",M=new Un(s.getAllResponseHeaders()),ve=s.responseURL||e.url;return l=new tc({headers:M,status:s.status,statusText:x,url:ve}),l},d=this.maybePropagateTrace(()=>{let{headers:x,status:M,statusText:ve,url:lt}=c(),Le=null;M!==UM&&(Le=typeof s.response>"u"?s.responseText:s.response),M===0&&(M=Le?HM:0);let to=M>=200&&M<300;if(e.responseType==="json"&&typeof Le=="string"){let no=Le;Le=Le.replace($M,"");try{Le=Le!==""?JSON.parse(Le):null}catch(oi){Le=no,to&&(to=!1,Le={error:oi,text:Le})}}to?(o.next(new ls({body:Le,headers:x,status:M,statusText:ve,url:lt||void 0})),o.complete()):o.error(new Pr({error:Le,headers:x,status:M,statusText:ve,url:lt||void 0}))}),f=this.maybePropagateTrace(x=>{let{url:M}=c(),ve=new Pr({error:x,status:s.status||0,statusText:s.statusText||"Unknown Error",url:M||void 0});o.error(ve)}),h=f;e.timeout&&(h=this.maybePropagateTrace(x=>{let{url:M}=c(),ve=new Pr({error:new DOMException("Request timed out","TimeoutError"),status:s.status||0,statusText:s.statusText||"Request timeout",url:M||void 0});o.error(ve)}));let p=!1,m=this.maybePropagateTrace(x=>{p||(o.next(c()),p=!0);let M={type:Hi.DownloadProgress,loaded:x.loaded};x.lengthComputable&&(M.total=x.total),e.responseType==="text"&&s.responseText&&(M.partialText=s.responseText),o.next(M)}),C=this.maybePropagateTrace(x=>{let M={type:Hi.UploadProgress,loaded:x.loaded};x.lengthComputable&&(M.total=x.total),o.next(M)});return s.addEventListener("load",d),s.addEventListener("error",f),s.addEventListener("timeout",h),s.addEventListener("abort",f),e.reportProgress&&(s.addEventListener("progress",m),a!==null&&s.upload&&s.upload.addEventListener("progress",C)),s.send(a),o.next({type:Hi.Sent}),()=>{s.removeEventListener("error",f),s.removeEventListener("abort",f),s.removeEventListener("load",d),s.removeEventListener("timeout",h),e.reportProgress&&(s.removeEventListener("progress",m),a!==null&&s.upload&&s.upload.removeEventListener("progress",C)),s.readyState!==s.DONE&&s.abort()}})))}static \u0275fac=function(i){return new(i||t)(I(ji))};static \u0275prov=_({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function GM(t,n){return n(t)}function WM(t,n,e){return(i,r)=>pr(e,()=>n(i,o=>t(o,r)))}var A_=new y("",{factory:()=>[]}),k_=new y(""),R_=new y("",{factory:()=>!0});var Rp=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275prov=_({token:t,factory:function(i){let r=null;return i?r=new(i||t):r=I(kp),r},providedIn:"root"})}return t})();var nc=(()=>{class t{backend;injector;chain=null;pendingTasks=u(Qa);contributeToStability=u(R_);constructor(e,i){this.backend=e,this.injector=i}handle(e){if(this.chain===null){let i=Array.from(new Set([...this.injector.get(A_),...this.injector.get(k_,[])]));this.chain=i.reduceRight((r,o)=>WM(r,o,this.injector),GM)}if(this.contributeToStability){let i=this.pendingTasks.add();return this.chain(e,r=>this.backend.handle(r)).pipe(mo(i))}else return this.chain(e,i=>this.backend.handle(i))}static \u0275fac=function(i){return new(i||t)(I(Rp),I(we))};static \u0275prov=_({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),Np=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275prov=_({token:t,factory:function(i){let r=null;return i?r=new(i||t):r=I(nc),r},providedIn:"root"})}return t})();function Ap(t,n){return{body:n,headers:t.headers,context:t.context,observe:t.observe,params:t.params,reportProgress:t.reportProgress,responseType:t.responseType,withCredentials:t.withCredentials,credentials:t.credentials,transferCache:t.transferCache,timeout:t.timeout,keepalive:t.keepalive,priority:t.priority,cache:t.cache,mode:t.mode,redirect:t.redirect,integrity:t.integrity,referrer:t.referrer,referrerPolicy:t.referrerPolicy}}var xt=(()=>{class t{handler;constructor(e){this.handler=e}request(e,i,r={}){let o;if(e instanceof Fr)o=e;else{let l;r.headers instanceof Un?l=r.headers:l=new Un(r.headers);let c;r.params&&(r.params instanceof mn?c=r.params:c=new mn({fromObject:r.params})),o=new Fr(e,i,r.body!==void 0?r.body:null,{headers:l,context:r.context,params:c,reportProgress:r.reportProgress,responseType:r.responseType||"json",withCredentials:r.withCredentials,transferCache:r.transferCache,keepalive:r.keepalive,priority:r.priority,cache:r.cache,mode:r.mode,redirect:r.redirect,credentials:r.credentials,referrer:r.referrer,referrerPolicy:r.referrerPolicy,integrity:r.integrity,timeout:r.timeout})}let s=Ue(o).pipe(Md(l=>this.handler.handle(l)));if(e instanceof Fr||r.observe==="events")return s;let a=s.pipe(Ve(l=>l instanceof ls));switch(r.observe||"body"){case"body":switch(o.responseType){case"arraybuffer":return a.pipe(_e(l=>{if(l.body!==null&&!(l.body instanceof ArrayBuffer))throw new A(2806,!1);return l.body}));case"blob":return a.pipe(_e(l=>{if(l.body!==null&&!(l.body instanceof Blob))throw new A(2807,!1);return l.body}));case"text":return a.pipe(_e(l=>{if(l.body!==null&&typeof l.body!="string")throw new A(2808,!1);return l.body}));default:return a.pipe(_e(l=>l.body))}case"response":return a;default:throw new A(2809,!1)}}delete(e,i={}){return this.request("DELETE",e,i)}get(e,i={}){return this.request("GET",e,i)}head(e,i={}){return this.request("HEAD",e,i)}jsonp(e,i){return this.request("JSONP",e,{params:new mn().append(i,"JSONP_CALLBACK"),observe:"body",responseType:"json"})}options(e,i={}){return this.request("OPTIONS",e,i)}patch(e,i,r={}){return this.request("PATCH",e,Ap(r,i))}post(e,i,r={}){return this.request("POST",e,Ap(r,i))}put(e,i,r={}){return this.request("PUT",e,Ap(r,i))}static \u0275fac=function(i){return new(i||t)(I(Np))};static \u0275prov=_({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var qM=new y("",{factory:()=>!0}),YM="XSRF-TOKEN",ZM=new y("",{factory:()=>YM}),QM="X-XSRF-TOKEN",XM=new y("",{factory:()=>QM}),KM=(()=>{class t{cookieName=u(ZM);doc=u(k);lastCookieString="";lastToken=null;parseCount=0;getToken(){let e=this.doc.cookie||"";return e!==this.lastCookieString&&(this.parseCount++,this.lastToken=is(e,this.cookieName),this.lastCookieString=e),this.lastToken}static \u0275fac=function(i){return new(i||t)};static \u0275prov=_({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),N_=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275prov=_({token:t,factory:function(i){let r=null;return i?r=new(i||t):r=I(KM),r},providedIn:"root"})}return t})();function JM(t,n){if(!u(qM)||t.method==="GET"||t.method==="HEAD")return n(t);try{let r=u(Or).href,{origin:o}=new URL(r),{origin:s}=new URL(t.url,o);if(o!==s)return n(t)}catch{return n(t)}let e=u(N_).getToken(),i=u(XM);return e!=null&&!t.headers.has(i)&&(t=t.clone({headers:t.headers.set(i,e)})),n(t)}function Op(...t){let n=[xt,nc,{provide:Np,useExisting:nc},{provide:Rp,useFactory:()=>u(zM,{optional:!0})??u(kp)},{provide:A_,useValue:JM,multi:!0}];for(let e of t)n.push(...e.\u0275providers);return Ei(n)}var Ui=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275prov=_({token:t,factory:function(i){let r=null;return i?r=new(i||t):r=I(eS),r},providedIn:"root"})}return t})(),eS=(()=>{class t extends Ui{_doc;constructor(e){super(),this._doc=e}sanitize(e,i){if(i==null)return null;switch(e){case Pe.NONE:return i;case Pe.HTML:return un(i,"HTML")?Ht(i):wl(this._doc,String(i)).toString();case Pe.STYLE:return un(i,"Style")?Ht(i):i;case Pe.SCRIPT:if(un(i,"Script"))return Ht(i);throw new A(5200,!1);case Pe.URL:return un(i,"URL")?Ht(i):Go(String(i));case Pe.RESOURCE_URL:if(un(i,"ResourceURL"))return Ht(i);throw new A(5201,!1);default:throw new A(5202,!1)}}bypassSecurityTrustHtml(e){return Nf(e)}bypassSecurityTrustStyle(e){return Of(e)}bypassSecurityTrustScript(e){return Ff(e)}bypassSecurityTrustUrl(e){return Pf(e)}bypassSecurityTrustResourceUrl(e){return Lf(e)}static \u0275fac=function(i){return new(i||t)(I(k))};static \u0275prov=_({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var F_={providers:[Au(),Op()]};function ds(t){return t.buttons===0||t.detail===0}function us(t){let n=t.touches&&t.touches[0]||t.changedTouches&&t.changedTouches[0];return!!n&&n.identifier===-1&&(n.radiusX==null||n.radiusX===1)&&(n.radiusY==null||n.radiusY===1)}var Fp;function P_(){if(Fp==null){let t=typeof document<"u"?document.head:null;Fp=!!(t&&(t.createShadowRoot||t.attachShadow))}return Fp}function Pp(t){if(P_()){let n=t.getRootNode?t.getRootNode():null;if(typeof ShadowRoot<"u"&&ShadowRoot&&n instanceof ShadowRoot)return n}return null}function fs(){let t=typeof document<"u"&&document?document.activeElement:null;for(;t&&t.shadowRoot;){let n=t.shadowRoot.activeElement;if(n===t)break;t=n}return t}function st(t){return t.composedPath?t.composedPath()[0]:t.target}var Lp;try{Lp=typeof Intl<"u"&&Intl.v8BreakIterator}catch{Lp=!1}var re=(()=>{class t{_platformId=u(Li);isBrowser=this._platformId?h_(this._platformId):typeof document=="object"&&!!document;EDGE=this.isBrowser&&/(edge)/i.test(navigator.userAgent);TRIDENT=this.isBrowser&&/(msie|trident)/i.test(navigator.userAgent);BLINK=this.isBrowser&&!!(window.chrome||Lp)&&typeof CSS<"u"&&!this.EDGE&&!this.TRIDENT;WEBKIT=this.isBrowser&&/AppleWebKit/i.test(navigator.userAgent)&&!this.BLINK&&!this.EDGE&&!this.TRIDENT;IOS=this.isBrowser&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!("MSStream"in window);FIREFOX=this.isBrowser&&/(firefox|minefield)/i.test(navigator.userAgent);ANDROID=this.isBrowser&&/android/i.test(navigator.userAgent)&&!this.TRIDENT;SAFARI=this.isBrowser&&/safari/i.test(navigator.userAgent)&&this.WEBKIT;constructor(){}static \u0275fac=function(i){return new(i||t)};static \u0275prov=_({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var ps;function L_(){if(ps==null&&typeof window<"u")try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:()=>ps=!0}))}finally{ps=ps||!1}return ps}function Vr(t){return L_()?t:!!t.capture}function gn(t,n=0){return V_(t)?Number(t):arguments.length===2?n:0}function V_(t){return!isNaN(parseFloat(t))&&!isNaN(Number(t))}function ft(t){return t instanceof V?t.nativeElement:t}var B_=new y("cdk-input-modality-detector-options"),j_={ignoreKeys:[18,17,224,91,16]},H_=650,Vp={passive:!0,capture:!0},U_=(()=>{class t{_platform=u(re);_listenerCleanups;modalityDetected;modalityChanged;get mostRecentModality(){return this._modality.value}_mostRecentTarget=null;_modality=new fi(null);_options;_lastTouchMs=0;_onKeydown=e=>{this._options?.ignoreKeys?.some(i=>i===e.keyCode)||(this._modality.next("keyboard"),this._mostRecentTarget=st(e))};_onMousedown=e=>{Date.now()-this._lastTouchMs<H_||(this._modality.next(ds(e)?"keyboard":"mouse"),this._mostRecentTarget=st(e))};_onTouchstart=e=>{if(us(e)){this._modality.next("keyboard");return}this._lastTouchMs=Date.now(),this._modality.next("touch"),this._mostRecentTarget=st(e)};constructor(){let e=u(S),i=u(k),r=u(B_,{optional:!0});if(this._options=D(D({},j_),r),this.modalityDetected=this._modality.pipe(vo(1)),this.modalityChanged=this.modalityDetected.pipe(ga()),this._platform.isBrowser){let o=u(Te).createRenderer(null,null);this._listenerCleanups=e.runOutsideAngular(()=>[o.listen(i,"keydown",this._onKeydown,Vp),o.listen(i,"mousedown",this._onMousedown,Vp),o.listen(i,"touchstart",this._onTouchstart,Vp)])}}ngOnDestroy(){this._modality.complete(),this._listenerCleanups?.forEach(e=>e())}static \u0275fac=function(i){return new(i||t)};static \u0275prov=_({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),hs=(function(t){return t[t.IMMEDIATE=0]="IMMEDIATE",t[t.EVENTUAL=1]="EVENTUAL",t})(hs||{}),z_=new y("cdk-focus-monitor-default-options"),ic=Vr({passive:!0,capture:!0}),vn=(()=>{class t{_ngZone=u(S);_platform=u(re);_inputModalityDetector=u(U_);_origin=null;_lastFocusOrigin=null;_windowFocused=!1;_windowFocusTimeoutId;_originTimeoutId;_originFromTouchInteraction=!1;_elementInfo=new Map;_monitoredElementCount=0;_rootNodeFocusListenerCount=new Map;_detectionMode;_windowFocusListener=()=>{this._windowFocused=!0,this._windowFocusTimeoutId=setTimeout(()=>this._windowFocused=!1)};_document=u(k);_stopInputModalityDetector=new E;constructor(){let e=u(z_,{optional:!0});this._detectionMode=e?.detectionMode||hs.IMMEDIATE}_rootNodeFocusAndBlurListener=e=>{let i=st(e);for(let r=i;r;r=r.parentElement)e.type==="focus"?this._onFocus(e,r):this._onBlur(e,r)};monitor(e,i=!1){let r=ft(e);if(!this._platform.isBrowser||r.nodeType!==1)return Ue();let o=Pp(r)||this._document,s=this._elementInfo.get(r);if(s)return i&&(s.checkChildren=!0),s.subject;let a={checkChildren:i,subject:new E,rootNode:o};return this._elementInfo.set(r,a),this._registerGlobalListeners(a),a.subject}stopMonitoring(e){let i=ft(e),r=this._elementInfo.get(i);r&&(r.subject.complete(),this._setClasses(i),this._elementInfo.delete(i),this._removeGlobalListeners(r))}focusVia(e,i,r){let o=ft(e),s=this._document.activeElement;o===s?this._getClosestElementsInfo(o).forEach(([a,l])=>this._originChanged(a,i,l)):(this._setOrigin(i),typeof o.focus=="function"&&o.focus(r))}ngOnDestroy(){this._elementInfo.forEach((e,i)=>this.stopMonitoring(i))}_getWindow(){return this._document.defaultView||window}_getFocusOrigin(e){return this._origin?this._originFromTouchInteraction?this._shouldBeAttributedToTouch(e)?"touch":"program":this._origin:this._windowFocused&&this._lastFocusOrigin?this._lastFocusOrigin:e&&this._isLastInteractionFromInputLabel(e)?"mouse":"program"}_shouldBeAttributedToTouch(e){return this._detectionMode===hs.EVENTUAL||!!e?.contains(this._inputModalityDetector._mostRecentTarget)}_setClasses(e,i){e.classList.toggle("cdk-focused",!!i),e.classList.toggle("cdk-touch-focused",i==="touch"),e.classList.toggle("cdk-keyboard-focused",i==="keyboard"),e.classList.toggle("cdk-mouse-focused",i==="mouse"),e.classList.toggle("cdk-program-focused",i==="program")}_setOrigin(e,i=!1){this._ngZone.runOutsideAngular(()=>{if(this._origin=e,this._originFromTouchInteraction=e==="touch"&&i,this._detectionMode===hs.IMMEDIATE){clearTimeout(this._originTimeoutId);let r=this._originFromTouchInteraction?H_:1;this._originTimeoutId=setTimeout(()=>this._origin=null,r)}})}_onFocus(e,i){let r=this._elementInfo.get(i),o=st(e);!r||!r.checkChildren&&i!==o||this._originChanged(i,this._getFocusOrigin(o),r)}_onBlur(e,i){let r=this._elementInfo.get(i);!r||r.checkChildren&&e.relatedTarget instanceof Node&&i.contains(e.relatedTarget)||(this._setClasses(i),this._emitOrigin(r,null))}_emitOrigin(e,i){e.subject.observers.length&&this._ngZone.run(()=>e.subject.next(i))}_registerGlobalListeners(e){if(!this._platform.isBrowser)return;let i=e.rootNode,r=this._rootNodeFocusListenerCount.get(i)||0;r||this._ngZone.runOutsideAngular(()=>{i.addEventListener("focus",this._rootNodeFocusAndBlurListener,ic),i.addEventListener("blur",this._rootNodeFocusAndBlurListener,ic)}),this._rootNodeFocusListenerCount.set(i,r+1),++this._monitoredElementCount===1&&(this._ngZone.runOutsideAngular(()=>{this._getWindow().addEventListener("focus",this._windowFocusListener)}),this._inputModalityDetector.modalityDetected.pipe(Se(this._stopInputModalityDetector)).subscribe(o=>{this._setOrigin(o,!0)}))}_removeGlobalListeners(e){let i=e.rootNode;if(this._rootNodeFocusListenerCount.has(i)){let r=this._rootNodeFocusListenerCount.get(i);r>1?this._rootNodeFocusListenerCount.set(i,r-1):(i.removeEventListener("focus",this._rootNodeFocusAndBlurListener,ic),i.removeEventListener("blur",this._rootNodeFocusAndBlurListener,ic),this._rootNodeFocusListenerCount.delete(i))}--this._monitoredElementCount||(this._getWindow().removeEventListener("focus",this._windowFocusListener),this._stopInputModalityDetector.next(),clearTimeout(this._windowFocusTimeoutId),clearTimeout(this._originTimeoutId))}_originChanged(e,i,r){this._setClasses(e,i),this._emitOrigin(r,i),this._lastFocusOrigin=i}_getClosestElementsInfo(e){let i=[];return this._elementInfo.forEach((r,o)=>{(o===e||r.checkChildren&&o.contains(e))&&i.push([o,r])}),i}_isLastInteractionFromInputLabel(e){let{_mostRecentTarget:i,mostRecentModality:r}=this._inputModalityDetector;if(r!=="mouse"||!i||i===e||e.nodeName!=="INPUT"&&e.nodeName!=="TEXTAREA"||e.disabled)return!1;let o=e.labels;if(o){for(let s=0;s<o.length;s++)if(o[s].contains(i))return!0}return!1}static \u0275fac=function(i){return new(i||t)};static \u0275prov=_({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var rc=new WeakMap,Ge=(()=>{class t{_appRef;_injector=u(P);_environmentInjector=u(we);load(e){let i=this._appRef=this._appRef||this._injector.get(zt),r=rc.get(i);r||(r={loaders:new Set,refs:[]},rc.set(i,r),i.onDestroy(()=>{rc.get(i)?.refs.forEach(o=>o.destroy()),rc.delete(i)})),r.loaders.has(e)||(r.loaders.add(e),r.refs.push($l(e,{environmentInjector:this._environmentInjector})))}static \u0275fac=function(i){return new(i||t)};static \u0275prov=_({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var sc=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275cmp=H({type:t,selectors:[["ng-component"]],exportAs:["cdkVisuallyHidden"],decls:0,vars:0,template:function(i,r){},styles:[`.cdk-visually-hidden {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  white-space: nowrap;
  outline: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  left: 0;
}
[dir=rtl] .cdk-visually-hidden {
  left: auto;
  right: 0;
}
`],encapsulation:2,changeDetection:0})}return t})(),oc;function tS(){if(oc===void 0&&(oc=null,typeof window<"u")){let t=window;t.trustedTypes!==void 0&&(oc=t.trustedTypes.createPolicy("angular#components",{createHTML:n=>n}))}return oc}function zi(t){return tS()?.createHTML(t)||t}function $_(t,n,e){let i=e.sanitize(Pe.HTML,n);t.innerHTML=zi(i||"")}function Br(t){return Array.isArray(t)?t:[t]}var G_=new Set,$i,jr=(()=>{class t{_platform=u(re);_nonce=u(Vi,{optional:!0});_matchMedia;constructor(){this._matchMedia=this._platform.isBrowser&&window.matchMedia?window.matchMedia.bind(window):iS}matchMedia(e){return(this._platform.WEBKIT||this._platform.BLINK)&&nS(e,this._nonce),this._matchMedia(e)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=_({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function nS(t,n){if(!G_.has(t))try{$i||($i=document.createElement("style"),n&&$i.setAttribute("nonce",n),$i.setAttribute("type","text/css"),document.head.appendChild($i)),$i.sheet&&($i.sheet.insertRule(`@media ${t} {body{ }}`,0),G_.add(t))}catch(e){console.error(e)}}function iS(t){return{matches:t==="all"||t==="",media:t,addListener:()=>{},removeListener:()=>{}}}var ms=(()=>{class t{_mediaMatcher=u(jr);_zone=u(S);_queries=new Map;_destroySubject=new E;constructor(){}ngOnDestroy(){this._destroySubject.next(),this._destroySubject.complete()}isMatched(e){return W_(Br(e)).some(r=>this._registerQuery(r).mql.matches)}observe(e){let r=W_(Br(e)).map(s=>this._registerQuery(s).observable),o=Id(r);return o=ar(o.pipe(Tt(1)),o.pipe(vo(1),Sd(0))),o.pipe(_e(s=>{let a={matches:!1,breakpoints:{}};return s.forEach(({matches:l,query:c})=>{a.matches=a.matches||l,a.breakpoints[c]=l}),a}))}_registerQuery(e){if(this._queries.has(e))return this._queries.get(e);let i=this._mediaMatcher.matchMedia(e),o={observable:new X(s=>{let a=l=>this._zone.run(()=>s.next(l));return i.addListener(a),()=>{i.removeListener(a)}}).pipe(Zt(i),_e(({matches:s})=>({query:e,matches:s})),Se(this._destroySubject)),mql:i};return this._queries.set(e,o),o}static \u0275fac=function(i){return new(i||t)};static \u0275prov=_({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function W_(t){return t.map(n=>n.split(",")).reduce((n,e)=>n.concat(e)).map(n=>n.trim())}var rS=(()=>{class t{create(e){return typeof MutationObserver>"u"?null:new MutationObserver(e)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=_({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var ac=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=q({type:t});static \u0275inj=z({providers:[rS]})}return t})();var Hp=(()=>{class t{_platform=u(re);constructor(){}isDisabled(e){return e.hasAttribute("disabled")}isVisible(e){return sS(e)&&getComputedStyle(e).visibility==="visible"}isTabbable(e){if(!this._platform.isBrowser)return!1;let i=oS(hS(e));if(i&&(q_(i)===-1||!this.isVisible(i)))return!1;let r=e.nodeName.toLowerCase(),o=q_(e);return e.hasAttribute("contenteditable")?o!==-1:r==="iframe"||r==="object"||this._platform.WEBKIT&&this._platform.IOS&&!fS(e)?!1:r==="audio"?e.hasAttribute("controls")?o!==-1:!1:r==="video"?o===-1?!1:o!==null?!0:this._platform.FIREFOX||e.hasAttribute("controls"):e.tabIndex>=0}isFocusable(e,i){return pS(e)&&!this.isDisabled(e)&&(i?.ignoreVisibility||this.isVisible(e))}static \u0275fac=function(i){return new(i||t)};static \u0275prov=_({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function oS(t){try{return t.frameElement}catch{return null}}function sS(t){return!!(t.offsetWidth||t.offsetHeight||typeof t.getClientRects=="function"&&t.getClientRects().length)}function aS(t){let n=t.nodeName.toLowerCase();return n==="input"||n==="select"||n==="button"||n==="textarea"}function lS(t){return dS(t)&&t.type=="hidden"}function cS(t){return uS(t)&&t.hasAttribute("href")}function dS(t){return t.nodeName.toLowerCase()=="input"}function uS(t){return t.nodeName.toLowerCase()=="a"}function Q_(t){if(!t.hasAttribute("tabindex")||t.tabIndex===void 0)return!1;let n=t.getAttribute("tabindex");return!!(n&&!isNaN(parseInt(n,10)))}function q_(t){if(!Q_(t))return null;let n=parseInt(t.getAttribute("tabindex")||"",10);return isNaN(n)?-1:n}function fS(t){let n=t.nodeName.toLowerCase(),e=n==="input"&&t.type;return e==="text"||e==="password"||n==="select"||n==="textarea"}function pS(t){return lS(t)?!1:aS(t)||cS(t)||t.hasAttribute("contenteditable")||Q_(t)}function hS(t){return t.ownerDocument&&t.ownerDocument.defaultView||window}var jp=class{_element;_checker;_ngZone;_document;_injector;_startAnchor=null;_endAnchor=null;_hasAttached=!1;startAnchorListener=()=>this.focusLastTabbableElement();endAnchorListener=()=>this.focusFirstTabbableElement();get enabled(){return this._enabled}set enabled(n){this._enabled=n,this._startAnchor&&this._endAnchor&&(this._toggleAnchorTabIndex(n,this._startAnchor),this._toggleAnchorTabIndex(n,this._endAnchor))}_enabled=!0;constructor(n,e,i,r,o=!1,s){this._element=n,this._checker=e,this._ngZone=i,this._document=r,this._injector=s,o||this.attachAnchors()}destroy(){let n=this._startAnchor,e=this._endAnchor;n&&(n.removeEventListener("focus",this.startAnchorListener),n.remove()),e&&(e.removeEventListener("focus",this.endAnchorListener),e.remove()),this._startAnchor=this._endAnchor=null,this._hasAttached=!1}attachAnchors(){return this._hasAttached?!0:(this._ngZone.runOutsideAngular(()=>{this._startAnchor||(this._startAnchor=this._createAnchor(),this._startAnchor.addEventListener("focus",this.startAnchorListener)),this._endAnchor||(this._endAnchor=this._createAnchor(),this._endAnchor.addEventListener("focus",this.endAnchorListener))}),this._element.parentNode&&(this._element.parentNode.insertBefore(this._startAnchor,this._element),this._element.parentNode.insertBefore(this._endAnchor,this._element.nextSibling),this._hasAttached=!0),this._hasAttached)}focusInitialElementWhenReady(n){return new Promise(e=>{this._executeOnStable(()=>e(this.focusInitialElement(n)))})}focusFirstTabbableElementWhenReady(n){return new Promise(e=>{this._executeOnStable(()=>e(this.focusFirstTabbableElement(n)))})}focusLastTabbableElementWhenReady(n){return new Promise(e=>{this._executeOnStable(()=>e(this.focusLastTabbableElement(n)))})}_getRegionBoundary(n){let e=this._element.querySelectorAll(`[cdk-focus-region-${n}], [cdkFocusRegion${n}], [cdk-focus-${n}]`);return n=="start"?e.length?e[0]:this._getFirstTabbableElement(this._element):e.length?e[e.length-1]:this._getLastTabbableElement(this._element)}focusInitialElement(n){let e=this._element.querySelector("[cdk-focus-initial], [cdkFocusInitial]");if(e){if(!this._checker.isFocusable(e)){let i=this._getFirstTabbableElement(e);return i?.focus(n),!!i}return e.focus(n),!0}return this.focusFirstTabbableElement(n)}focusFirstTabbableElement(n){let e=this._getRegionBoundary("start");return e&&e.focus(n),!!e}focusLastTabbableElement(n){let e=this._getRegionBoundary("end");return e&&e.focus(n),!!e}hasAttached(){return this._hasAttached}_getFirstTabbableElement(n){if(this._checker.isFocusable(n)&&this._checker.isTabbable(n))return n;let e=n.children;for(let i=0;i<e.length;i++){let r=e[i].nodeType===this._document.ELEMENT_NODE?this._getFirstTabbableElement(e[i]):null;if(r)return r}return null}_getLastTabbableElement(n){if(this._checker.isFocusable(n)&&this._checker.isTabbable(n))return n;let e=n.children;for(let i=e.length-1;i>=0;i--){let r=e[i].nodeType===this._document.ELEMENT_NODE?this._getLastTabbableElement(e[i]):null;if(r)return r}return null}_createAnchor(){let n=this._document.createElement("div");return this._toggleAnchorTabIndex(this._enabled,n),n.classList.add("cdk-visually-hidden"),n.classList.add("cdk-focus-trap-anchor"),n.setAttribute("aria-hidden","true"),n}_toggleAnchorTabIndex(n,e){n?e.setAttribute("tabindex","0"):e.removeAttribute("tabindex")}toggleAnchors(n){this._startAnchor&&this._endAnchor&&(this._toggleAnchorTabIndex(n,this._startAnchor),this._toggleAnchorTabIndex(n,this._endAnchor))}_executeOnStable(n){this._injector?$e(n,{injector:this._injector}):setTimeout(n)}},Up=(()=>{class t{_checker=u(Hp);_ngZone=u(S);_document=u(k);_injector=u(P);constructor(){u(Ge).load(sc)}create(e,i=!1){return new jp(e,this._checker,this._ngZone,this._document,i,this._injector)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=_({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var X_=new y("liveAnnouncerElement",{providedIn:"root",factory:()=>null}),K_=new y("LIVE_ANNOUNCER_DEFAULT_OPTIONS"),mS=0,zp=(()=>{class t{_ngZone=u(S);_defaultOptions=u(K_,{optional:!0});_liveElement;_document=u(k);_sanitizer=u(Ui);_previousTimeout;_currentPromise;_currentResolve;constructor(){let e=u(X_,{optional:!0});this._liveElement=e||this._createLiveElement()}announce(e,...i){let r=this._defaultOptions,o,s;return i.length===1&&typeof i[0]=="number"?s=i[0]:[o,s]=i,this.clear(),clearTimeout(this._previousTimeout),o||(o=r&&r.politeness?r.politeness:"polite"),s==null&&r&&(s=r.duration),this._liveElement.setAttribute("aria-live",o),this._liveElement.id&&this._exposeAnnouncerToModals(this._liveElement.id),this._ngZone.runOutsideAngular(()=>(this._currentPromise||(this._currentPromise=new Promise(a=>this._currentResolve=a)),clearTimeout(this._previousTimeout),this._previousTimeout=setTimeout(()=>{!e||typeof e=="string"?this._liveElement.textContent=e:$_(this._liveElement,e,this._sanitizer),typeof s=="number"&&(this._previousTimeout=setTimeout(()=>this.clear(),s)),this._currentResolve?.(),this._currentPromise=this._currentResolve=void 0},100),this._currentPromise))}clear(){this._liveElement&&(this._liveElement.textContent="")}ngOnDestroy(){clearTimeout(this._previousTimeout),this._liveElement?.remove(),this._liveElement=null,this._currentResolve?.(),this._currentPromise=this._currentResolve=void 0}_createLiveElement(){let e="cdk-live-announcer-element",i=this._document.getElementsByClassName(e),r=this._document.createElement("div");for(let o=0;o<i.length;o++)i[o].remove();return r.classList.add(e),r.classList.add("cdk-visually-hidden"),r.setAttribute("aria-atomic","true"),r.setAttribute("aria-live","polite"),r.id=`cdk-live-announcer-${mS++}`,this._document.body.appendChild(r),r}_exposeAnnouncerToModals(e){let i=this._document.querySelectorAll('body > .cdk-overlay-container [aria-modal="true"]');for(let r=0;r<i.length;r++){let o=i[r],s=o.getAttribute("aria-owns");s?s.indexOf(e)===-1&&o.setAttribute("aria-owns",s+" "+e):o.setAttribute("aria-owns",e)}}static \u0275fac=function(i){return new(i||t)};static \u0275prov=_({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var zn=(function(t){return t[t.NONE=0]="NONE",t[t.BLACK_ON_WHITE=1]="BLACK_ON_WHITE",t[t.WHITE_ON_BLACK=2]="WHITE_ON_BLACK",t})(zn||{}),Y_="cdk-high-contrast-black-on-white",Z_="cdk-high-contrast-white-on-black",Bp="cdk-high-contrast-active",J_=(()=>{class t{_platform=u(re);_hasCheckedHighContrastMode=!1;_document=u(k);_breakpointSubscription;constructor(){this._breakpointSubscription=u(ms).observe("(forced-colors: active)").subscribe(()=>{this._hasCheckedHighContrastMode&&(this._hasCheckedHighContrastMode=!1,this._applyBodyHighContrastModeCssClasses())})}getHighContrastMode(){if(!this._platform.isBrowser)return zn.NONE;let e=this._document.createElement("div");e.style.backgroundColor="rgb(1,2,3)",e.style.position="absolute",this._document.body.appendChild(e);let i=this._document.defaultView||window,r=i&&i.getComputedStyle?i.getComputedStyle(e):null,o=(r&&r.backgroundColor||"").replace(/ /g,"");switch(e.remove(),o){case"rgb(0,0,0)":case"rgb(45,50,54)":case"rgb(32,32,32)":return zn.WHITE_ON_BLACK;case"rgb(255,255,255)":case"rgb(255,250,239)":return zn.BLACK_ON_WHITE}return zn.NONE}ngOnDestroy(){this._breakpointSubscription.unsubscribe()}_applyBodyHighContrastModeCssClasses(){if(!this._hasCheckedHighContrastMode&&this._platform.isBrowser&&this._document.body){let e=this._document.body.classList;e.remove(Bp,Y_,Z_),this._hasCheckedHighContrastMode=!0;let i=this.getHighContrastMode();i===zn.BLACK_ON_WHITE?e.add(Bp,Y_):i===zn.WHITE_ON_BLACK&&e.add(Bp,Z_)}}static \u0275fac=function(i){return new(i||t)};static \u0275prov=_({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),gs=(()=>{class t{constructor(){u(J_)._applyBodyHighContrastModeCssClasses()}static \u0275fac=function(i){return new(i||t)};static \u0275mod=q({type:t});static \u0275inj=z({imports:[ac]})}return t})();function $n(t,...n){return n.length?n.some(e=>t[e]):t.altKey||t.shiftKey||t.ctrlKey||t.metaKey}var $p={},Re=class t{_appId=u(Pn);static _infix=`a${Math.floor(Math.random()*1e5).toString()}`;getId(n,e=!1){return this._appId!=="ng"&&(n+=this._appId),$p.hasOwnProperty(n)||($p[n]=0),`${n}${e?t._infix+"-":""}${$p[n]++}`}static \u0275fac=function(e){return new(e||t)};static \u0275prov=_({token:t,factory:t.\u0275fac,providedIn:"root"})};var tb=" ";function gS(t,n,e){let i=cc(t,n);e=e.trim(),!i.some(r=>r.trim()===e)&&(i.push(e),t.setAttribute(n,i.join(tb)))}function vS(t,n,e){let i=cc(t,n);e=e.trim();let r=i.filter(o=>o!==e);r.length?t.setAttribute(n,r.join(tb)):t.removeAttribute(n)}function cc(t,n){return t.getAttribute(n)?.match(/\S+/g)??[]}var nb="cdk-describedby-message",lc="cdk-describedby-host",Wp=0,ib=(()=>{class t{_platform=u(re);_document=u(k);_messageRegistry=new Map;_messagesContainer=null;_id=`${Wp++}`;constructor(){u(Ge).load(sc),this._id=u(Pn)+"-"+Wp++}describe(e,i,r){if(!this._canBeDescribed(e,i))return;let o=Gp(i,r);typeof i!="string"?(eb(i,this._id),this._messageRegistry.set(o,{messageElement:i,referenceCount:0})):this._messageRegistry.has(o)||this._createMessageElement(i,r),this._isElementDescribedByMessage(e,o)||this._addMessageReference(e,o)}removeDescription(e,i,r){if(!i||!this._isElementNode(e))return;let o=Gp(i,r);if(this._isElementDescribedByMessage(e,o)&&this._removeMessageReference(e,o),typeof i=="string"){let s=this._messageRegistry.get(o);s&&s.referenceCount===0&&this._deleteMessageElement(o)}this._messagesContainer?.childNodes.length===0&&(this._messagesContainer.remove(),this._messagesContainer=null)}ngOnDestroy(){let e=this._document.querySelectorAll(`[${lc}="${this._id}"]`);for(let i=0;i<e.length;i++)this._removeCdkDescribedByReferenceIds(e[i]),e[i].removeAttribute(lc);this._messagesContainer?.remove(),this._messagesContainer=null,this._messageRegistry.clear()}_createMessageElement(e,i){let r=this._document.createElement("div");eb(r,this._id),r.textContent=e,i&&r.setAttribute("role",i),this._createMessagesContainer(),this._messagesContainer.appendChild(r),this._messageRegistry.set(Gp(e,i),{messageElement:r,referenceCount:0})}_deleteMessageElement(e){this._messageRegistry.get(e)?.messageElement?.remove(),this._messageRegistry.delete(e)}_createMessagesContainer(){if(this._messagesContainer)return;let e="cdk-describedby-message-container",i=this._document.querySelectorAll(`.${e}[platform="server"]`);for(let o=0;o<i.length;o++)i[o].remove();let r=this._document.createElement("div");r.style.visibility="hidden",r.classList.add(e),r.classList.add("cdk-visually-hidden"),this._platform.isBrowser||r.setAttribute("platform","server"),this._document.body.appendChild(r),this._messagesContainer=r}_removeCdkDescribedByReferenceIds(e){let i=cc(e,"aria-describedby").filter(r=>r.indexOf(nb)!=0);e.setAttribute("aria-describedby",i.join(" "))}_addMessageReference(e,i){let r=this._messageRegistry.get(i);gS(e,"aria-describedby",r.messageElement.id),e.setAttribute(lc,this._id),r.referenceCount++}_removeMessageReference(e,i){let r=this._messageRegistry.get(i);r.referenceCount--,vS(e,"aria-describedby",r.messageElement.id),e.removeAttribute(lc)}_isElementDescribedByMessage(e,i){let r=cc(e,"aria-describedby"),o=this._messageRegistry.get(i),s=o&&o.messageElement.id;return!!s&&r.indexOf(s)!=-1}_canBeDescribed(e,i){if(!this._isElementNode(e))return!1;if(i&&typeof i=="object")return!0;let r=i==null?"":`${i}`.trim(),o=e.getAttribute("aria-label");return r?!o||o.trim()!==r:!1}_isElementNode(e){return e.nodeType===this._document.ELEMENT_NODE}static \u0275fac=function(i){return new(i||t)};static \u0275prov=_({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function Gp(t,n){return typeof t=="string"?`${n||""}/${t}`:t}function eb(t,n){t.id||(t.id=`${nb}-${n}-${Wp++}`)}var Wt=(function(t){return t[t.NORMAL=0]="NORMAL",t[t.NEGATED=1]="NEGATED",t[t.INVERTED=2]="INVERTED",t})(Wt||{}),dc,Gi;function uc(){if(Gi==null){if(typeof document!="object"||!document||typeof Element!="function"||!Element)return Gi=!1,Gi;if(document.documentElement?.style&&"scrollBehavior"in document.documentElement.style)Gi=!0;else{let t=Element.prototype.scrollTo;t?Gi=!/\{\s*\[native code\]\s*\}/.test(t.toString()):Gi=!1}}return Gi}function Hr(){if(typeof document!="object"||!document)return Wt.NORMAL;if(dc==null){let t=document.createElement("div"),n=t.style;t.dir="rtl",n.width="1px",n.overflow="auto",n.visibility="hidden",n.pointerEvents="none",n.position="absolute";let e=document.createElement("div"),i=e.style;i.width="2px",i.height="1px",t.appendChild(e),document.body.appendChild(t),dc=Wt.NORMAL,t.scrollLeft===0&&(t.scrollLeft=1,dc=t.scrollLeft===0?Wt.NEGATED:Wt.INVERTED),t.remove()}return dc}function qp(){return typeof __karma__<"u"&&!!__karma__||typeof jasmine<"u"&&!!jasmine||typeof jest<"u"&&!!jest||typeof Mocha<"u"&&!!Mocha}var Ur,rb=["color","button","checkbox","date","datetime-local","email","file","hidden","image","month","number","password","radio","range","reset","search","submit","tel","text","time","url","week"];function Yp(){if(Ur)return Ur;if(typeof document!="object"||!document)return Ur=new Set(rb),Ur;let t=document.createElement("input");return Ur=new Set(rb.filter(n=>(t.setAttribute("type",n),t.type===n))),Ur}var ob={XSmall:"(max-width: 599.98px)",Small:"(min-width: 600px) and (max-width: 959.98px)",Medium:"(min-width: 960px) and (max-width: 1279.98px)",Large:"(min-width: 1280px) and (max-width: 1919.98px)",XLarge:"(min-width: 1920px)",Handset:"(max-width: 599.98px) and (orientation: portrait), (max-width: 959.98px) and (orientation: landscape)",Tablet:"(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait), (min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)",Web:"(min-width: 840px) and (orientation: portrait), (min-width: 1280px) and (orientation: landscape)",HandsetPortrait:"(max-width: 599.98px) and (orientation: portrait)",TabletPortrait:"(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait)",WebPortrait:"(min-width: 840px) and (orientation: portrait)",HandsetLandscape:"(max-width: 959.98px) and (orientation: landscape)",TabletLandscape:"(min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)",WebLandscape:"(min-width: 1280px) and (orientation: landscape)"};var yS=new y("MATERIAL_ANIMATIONS"),sb=null;function Zp(){return u(yS,{optional:!0})?.animationsDisabled||u($o,{optional:!0})==="NoopAnimations"?"di-disabled":(sb??=u(jr).matchMedia("(prefers-reduced-motion)").matches,sb?"reduced-motion":"enabled")}function Ie(){return Zp()!=="enabled"}function Me(t){return t==null?"":typeof t=="string"?t:`${t}px`}function yn(t){return t!=null&&`${t}`!="false"}var It=(function(t){return t[t.FADING_IN=0]="FADING_IN",t[t.VISIBLE=1]="VISIBLE",t[t.FADING_OUT=2]="FADING_OUT",t[t.HIDDEN=3]="HIDDEN",t})(It||{}),Qp=class{_renderer;element;config;_animationForciblyDisabledThroughCss;state=It.HIDDEN;constructor(n,e,i,r=!1){this._renderer=n,this.element=e,this.config=i,this._animationForciblyDisabledThroughCss=r}fadeOut(){this._renderer.fadeOutRipple(this)}},ab=Vr({passive:!0,capture:!0}),Xp=class{_events=new Map;addHandler(n,e,i,r){let o=this._events.get(e);if(o){let s=o.get(i);s?s.add(r):o.set(i,new Set([r]))}else this._events.set(e,new Map([[i,new Set([r])]])),n.runOutsideAngular(()=>{document.addEventListener(e,this._delegateEventHandler,ab)})}removeHandler(n,e,i){let r=this._events.get(n);if(!r)return;let o=r.get(e);o&&(o.delete(i),o.size===0&&r.delete(e),r.size===0&&(this._events.delete(n),document.removeEventListener(n,this._delegateEventHandler,ab)))}_delegateEventHandler=n=>{let e=st(n);e&&this._events.get(n.type)?.forEach((i,r)=>{(r===e||r.contains(e))&&i.forEach(o=>o.handleEvent(n))})}},vs={enterDuration:225,exitDuration:150},_S=800,lb=Vr({passive:!0,capture:!0}),cb=["mousedown","touchstart"],db=["mouseup","mouseleave","touchend","touchcancel"],bS=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275cmp=H({type:t,selectors:[["ng-component"]],hostAttrs:["mat-ripple-style-loader",""],decls:0,vars:0,template:function(i,r){},styles:[`.mat-ripple {
  overflow: hidden;
  position: relative;
}
.mat-ripple:not(:empty) {
  transform: translateZ(0);
}

.mat-ripple.mat-ripple-unbounded {
  overflow: visible;
}

.mat-ripple-element {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  transition: opacity, transform 0ms cubic-bezier(0, 0, 0.2, 1);
  transform: scale3d(0, 0, 0);
  background-color: var(--mat-ripple-color, color-mix(in srgb, var(--mat-sys-on-surface) 10%, transparent));
}
@media (forced-colors: active) {
  .mat-ripple-element {
    display: none;
  }
}
.cdk-drag-preview .mat-ripple-element, .cdk-drag-placeholder .mat-ripple-element {
  display: none;
}
`],encapsulation:2,changeDetection:0})}return t})(),ys=class t{_target;_ngZone;_platform;_containerElement;_triggerElement=null;_isPointerDown=!1;_activeRipples=new Map;_mostRecentTransientRipple=null;_lastTouchStartEvent;_pointerUpEventsRegistered=!1;_containerRect=null;static _eventManager=new Xp;constructor(n,e,i,r,o){this._target=n,this._ngZone=e,this._platform=r,r.isBrowser&&(this._containerElement=ft(i)),o&&o.get(Ge).load(bS)}fadeInRipple(n,e,i={}){let r=this._containerRect=this._containerRect||this._containerElement.getBoundingClientRect(),o=D(D({},vs),i.animation);i.centered&&(n=r.left+r.width/2,e=r.top+r.height/2);let s=i.radius||DS(n,e,r),a=n-r.left,l=e-r.top,c=o.enterDuration,d=document.createElement("div");d.classList.add("mat-ripple-element"),d.style.left=`${a-s}px`,d.style.top=`${l-s}px`,d.style.height=`${s*2}px`,d.style.width=`${s*2}px`,i.color!=null&&(d.style.backgroundColor=i.color),d.style.transitionDuration=`${c}ms`,this._containerElement.appendChild(d);let f=window.getComputedStyle(d),h=f.transitionProperty,p=f.transitionDuration,m=h==="none"||p==="0s"||p==="0s, 0s"||r.width===0&&r.height===0,C=new Qp(this,d,i,m);d.style.transform="scale3d(1, 1, 1)",C.state=It.FADING_IN,i.persistent||(this._mostRecentTransientRipple=C);let x=null;return!m&&(c||o.exitDuration)&&this._ngZone.runOutsideAngular(()=>{let M=()=>{x&&(x.fallbackTimer=null),clearTimeout(lt),this._finishRippleTransition(C)},ve=()=>this._destroyRipple(C),lt=setTimeout(ve,c+100);d.addEventListener("transitionend",M),d.addEventListener("transitioncancel",ve),x={onTransitionEnd:M,onTransitionCancel:ve,fallbackTimer:lt}}),this._activeRipples.set(C,x),(m||!c)&&this._finishRippleTransition(C),C}fadeOutRipple(n){if(n.state===It.FADING_OUT||n.state===It.HIDDEN)return;let e=n.element,i=D(D({},vs),n.config.animation);e.style.transitionDuration=`${i.exitDuration}ms`,e.style.opacity="0",n.state=It.FADING_OUT,(n._animationForciblyDisabledThroughCss||!i.exitDuration)&&this._finishRippleTransition(n)}fadeOutAll(){this._getActiveRipples().forEach(n=>n.fadeOut())}fadeOutAllNonPersistent(){this._getActiveRipples().forEach(n=>{n.config.persistent||n.fadeOut()})}setupTriggerEvents(n){let e=ft(n);!this._platform.isBrowser||!e||e===this._triggerElement||(this._removeTriggerEvents(),this._triggerElement=e,cb.forEach(i=>{t._eventManager.addHandler(this._ngZone,i,e,this)}))}handleEvent(n){n.type==="mousedown"?this._onMousedown(n):n.type==="touchstart"?this._onTouchStart(n):this._onPointerUp(),this._pointerUpEventsRegistered||(this._ngZone.runOutsideAngular(()=>{db.forEach(e=>{this._triggerElement.addEventListener(e,this,lb)})}),this._pointerUpEventsRegistered=!0)}_finishRippleTransition(n){n.state===It.FADING_IN?this._startFadeOutTransition(n):n.state===It.FADING_OUT&&this._destroyRipple(n)}_startFadeOutTransition(n){let e=n===this._mostRecentTransientRipple,{persistent:i}=n.config;n.state=It.VISIBLE,!i&&(!e||!this._isPointerDown)&&n.fadeOut()}_destroyRipple(n){let e=this._activeRipples.get(n)??null;this._activeRipples.delete(n),this._activeRipples.size||(this._containerRect=null),n===this._mostRecentTransientRipple&&(this._mostRecentTransientRipple=null),n.state=It.HIDDEN,e!==null&&(n.element.removeEventListener("transitionend",e.onTransitionEnd),n.element.removeEventListener("transitioncancel",e.onTransitionCancel),e.fallbackTimer!==null&&clearTimeout(e.fallbackTimer)),n.element.remove()}_onMousedown(n){let e=ds(n),i=this._lastTouchStartEvent&&Date.now()<this._lastTouchStartEvent+_S;!this._target.rippleDisabled&&!e&&!i&&(this._isPointerDown=!0,this.fadeInRipple(n.clientX,n.clientY,this._target.rippleConfig))}_onTouchStart(n){if(!this._target.rippleDisabled&&!us(n)){this._lastTouchStartEvent=Date.now(),this._isPointerDown=!0;let e=n.changedTouches;if(e)for(let i=0;i<e.length;i++)this.fadeInRipple(e[i].clientX,e[i].clientY,this._target.rippleConfig)}}_onPointerUp(){this._isPointerDown&&(this._isPointerDown=!1,this._getActiveRipples().forEach(n=>{let e=n.state===It.VISIBLE||n.config.terminateOnPointerUp&&n.state===It.FADING_IN;!n.config.persistent&&e&&n.fadeOut()}))}_getActiveRipples(){return Array.from(this._activeRipples.keys())}_removeTriggerEvents(){let n=this._triggerElement;n&&(cb.forEach(e=>t._eventManager.removeHandler(e,n,this)),this._pointerUpEventsRegistered&&(db.forEach(e=>n.removeEventListener(e,this,lb)),this._pointerUpEventsRegistered=!1))}};function DS(t,n,e){let i=Math.max(Math.abs(t-e.left),Math.abs(t-e.right)),r=Math.max(Math.abs(n-e.top),Math.abs(n-e.bottom));return Math.sqrt(i*i+r*r)}var Kp=new y("mat-ripple-global-options"),ub=(()=>{class t{_elementRef=u(V);_animationsDisabled=Ie();color;unbounded=!1;centered=!1;radius=0;animation;get disabled(){return this._disabled}set disabled(e){e&&this.fadeOutAllNonPersistent(),this._disabled=e,this._setupTriggerEventsIfEnabled()}_disabled=!1;get trigger(){return this._trigger||this._elementRef.nativeElement}set trigger(e){this._trigger=e,this._setupTriggerEventsIfEnabled()}_trigger;_rippleRenderer;_globalOptions;_isInitialized=!1;constructor(){let e=u(S),i=u(re),r=u(Kp,{optional:!0}),o=u(P);this._globalOptions=r||{},this._rippleRenderer=new ys(this,e,this._elementRef,i,o)}ngOnInit(){this._isInitialized=!0,this._setupTriggerEventsIfEnabled()}ngOnDestroy(){this._rippleRenderer._removeTriggerEvents()}fadeOutAll(){this._rippleRenderer.fadeOutAll()}fadeOutAllNonPersistent(){this._rippleRenderer.fadeOutAllNonPersistent()}get rippleConfig(){return{centered:this.centered,radius:this.radius,color:this.color,animation:D(D(D({},this._globalOptions.animation),this._animationsDisabled?{enterDuration:0,exitDuration:0}:{}),this.animation),terminateOnPointerUp:this._globalOptions.terminateOnPointerUp}}get rippleDisabled(){return this.disabled||!!this._globalOptions.disabled}_setupTriggerEventsIfEnabled(){!this.disabled&&this._isInitialized&&this._rippleRenderer.setupTriggerEvents(this.trigger)}launch(e,i=0,r){return typeof e=="number"?this._rippleRenderer.fadeInRipple(e,i,D(D({},this.rippleConfig),r)):this._rippleRenderer.fadeInRipple(0,0,D(D({},this.rippleConfig),e))}static \u0275fac=function(i){return new(i||t)};static \u0275dir=F({type:t,selectors:[["","mat-ripple",""],["","matRipple",""]],hostAttrs:[1,"mat-ripple"],hostVars:2,hostBindings:function(i,r){i&2&&B("mat-ripple-unbounded",r.unbounded)},inputs:{color:[0,"matRippleColor","color"],unbounded:[0,"matRippleUnbounded","unbounded"],centered:[0,"matRippleCentered","centered"],radius:[0,"matRippleRadius","radius"],animation:[0,"matRippleAnimation","animation"],disabled:[0,"matRippleDisabled","disabled"],trigger:[0,"matRippleTrigger","trigger"]},exportAs:["matRipple"]})}return t})();var CS={capture:!0},ES=["focus","mousedown","mouseenter","touchstart"],Jp="mat-ripple-loader-uninitialized",eh="mat-ripple-loader-class-name",fb="mat-ripple-loader-centered",fc="mat-ripple-loader-disabled",pb=(()=>{class t{_document=u(k);_animationsDisabled=Ie();_globalRippleOptions=u(Kp,{optional:!0});_platform=u(re);_ngZone=u(S);_injector=u(P);_eventCleanups;_hosts=new Map;constructor(){let e=u(Te).createRenderer(null,null);this._eventCleanups=this._ngZone.runOutsideAngular(()=>ES.map(i=>e.listen(this._document,i,this._onInteraction,CS)))}ngOnDestroy(){let e=this._hosts.keys();for(let i of e)this.destroyRipple(i);this._eventCleanups.forEach(i=>i())}configureRipple(e,i){e.setAttribute(Jp,this._globalRippleOptions?.namespace??""),(i.className||!e.hasAttribute(eh))&&e.setAttribute(eh,i.className||""),i.centered&&e.setAttribute(fb,""),i.disabled&&e.setAttribute(fc,"")}setDisabled(e,i){let r=this._hosts.get(e);r?(r.target.rippleDisabled=i,!i&&!r.hasSetUpEvents&&(r.hasSetUpEvents=!0,r.renderer.setupTriggerEvents(e))):i?e.setAttribute(fc,""):e.removeAttribute(fc)}_onInteraction=e=>{let i=st(e);if(i instanceof HTMLElement){let r=i.closest(`[${Jp}="${this._globalRippleOptions?.namespace??""}"]`);r&&this._createRipple(r)}};_createRipple(e){if(!this._document||this._hosts.has(e))return;e.querySelector(".mat-ripple")?.remove();let i=this._document.createElement("span");i.classList.add("mat-ripple",e.getAttribute(eh)),e.append(i);let r=this._globalRippleOptions,o=this._animationsDisabled?0:r?.animation?.enterDuration??vs.enterDuration,s=this._animationsDisabled?0:r?.animation?.exitDuration??vs.exitDuration,a={rippleDisabled:this._animationsDisabled||r?.disabled||e.hasAttribute(fc),rippleConfig:{centered:e.hasAttribute(fb),terminateOnPointerUp:r?.terminateOnPointerUp,animation:{enterDuration:o,exitDuration:s}}},l=new ys(a,this._ngZone,i,this._platform,this._injector),c=!a.rippleDisabled;c&&l.setupTriggerEvents(e),this._hosts.set(e,{target:a,renderer:l,hasSetUpEvents:c}),e.removeAttribute(Jp)}destroyRipple(e){let i=this._hosts.get(e);i&&(i.renderer._removeTriggerEvents(),this._hosts.delete(e))}static \u0275fac=function(i){return new(i||t)};static \u0275prov=_({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var pc=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275cmp=H({type:t,selectors:[["structural-styles"]],decls:0,vars:0,template:function(i,r){},styles:[`.mat-focus-indicator {
  position: relative;
}
.mat-focus-indicator::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  box-sizing: border-box;
  pointer-events: none;
  display: var(--mat-focus-indicator-display, none);
  border-width: var(--mat-focus-indicator-border-width, 3px);
  border-style: var(--mat-focus-indicator-border-style, solid);
  border-color: var(--mat-focus-indicator-border-color, transparent);
  border-radius: var(--mat-focus-indicator-border-radius, 4px);
}
.mat-focus-indicator:focus-visible::before {
  content: "";
}

@media (forced-colors: active) {
  html {
    --mat-focus-indicator-display: block;
  }
}
`],encapsulation:2,changeDetection:0})}return t})();var wS=["mat-icon-button",""],xS=["*"],IS=new y("MAT_BUTTON_CONFIG");function hb(t){return t==null?void 0:Nr(t)}var hc=(()=>{class t{_elementRef=u(V);_ngZone=u(S);_animationsDisabled=Ie();_config=u(IS,{optional:!0});_focusMonitor=u(vn);_cleanupClick;_renderer=u(Ae);_rippleLoader=u(pb);_isAnchor;_isFab=!1;color;get disableRipple(){return this._disableRipple}set disableRipple(e){this._disableRipple=e,this._updateRippleDisabled()}_disableRipple=!1;get disabled(){return this._disabled}set disabled(e){this._disabled=e,this._updateRippleDisabled()}_disabled=!1;ariaDisabled;disabledInteractive;tabIndex;set _tabindex(e){this.tabIndex=e}constructor(){u(Ge).load(pc);let e=this._elementRef.nativeElement;this._isAnchor=e.tagName==="A",this.disabledInteractive=this._config?.disabledInteractive??!1,this.color=this._config?.color??null,this._rippleLoader?.configureRipple(e,{className:"mat-mdc-button-ripple"})}ngAfterViewInit(){this._focusMonitor.monitor(this._elementRef,!0),this._isAnchor&&this._setupAsAnchor()}ngOnDestroy(){this._cleanupClick?.(),this._focusMonitor.stopMonitoring(this._elementRef),this._rippleLoader?.destroyRipple(this._elementRef.nativeElement)}focus(e="program",i){e?this._focusMonitor.focusVia(this._elementRef.nativeElement,e,i):this._elementRef.nativeElement.focus(i)}_getAriaDisabled(){return this.ariaDisabled!=null?this.ariaDisabled:this._isAnchor?this.disabled||null:this.disabled&&this.disabledInteractive?!0:null}_getDisabledAttribute(){return this.disabledInteractive||!this.disabled?null:!0}_updateRippleDisabled(){this._rippleLoader?.setDisabled(this._elementRef.nativeElement,this.disableRipple||this.disabled)}_getTabIndex(){return this._isAnchor?this.disabled&&!this.disabledInteractive?-1:this.tabIndex:this.tabIndex}_setupAsAnchor(){this._cleanupClick=this._ngZone.runOutsideAngular(()=>this._renderer.listen(this._elementRef.nativeElement,"click",e=>{this.disabled&&(e.preventDefault(),e.stopImmediatePropagation())}))}static \u0275fac=function(i){return new(i||t)};static \u0275dir=F({type:t,hostAttrs:[1,"mat-mdc-button-base"],hostVars:13,hostBindings:function(i,r){i&2&&(K("disabled",r._getDisabledAttribute())("aria-disabled",r._getAriaDisabled())("tabindex",r._getTabIndex()),hn(r.color?"mat-"+r.color:""),B("mat-mdc-button-disabled",r.disabled)("mat-mdc-button-disabled-interactive",r.disabledInteractive)("mat-unthemed",!r.color)("_mat-animation-noopable",r._animationsDisabled))},inputs:{color:"color",disableRipple:[2,"disableRipple","disableRipple",he],disabled:[2,"disabled","disabled",he],ariaDisabled:[2,"aria-disabled","ariaDisabled",he],disabledInteractive:[2,"disabledInteractive","disabledInteractive",he],tabIndex:[2,"tabIndex","tabIndex",hb],_tabindex:[2,"tabindex","_tabindex",hb]}})}return t})(),Wi=(()=>{class t extends hc{constructor(){super(),this._rippleLoader.configureRipple(this._elementRef.nativeElement,{centered:!0})}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=H({type:t,selectors:[["button","mat-icon-button",""],["a","mat-icon-button",""],["button","matIconButton",""],["a","matIconButton",""]],hostAttrs:[1,"mdc-icon-button","mat-mdc-icon-button"],exportAs:["matButton","matAnchor"],features:[pe],attrs:wS,ngContentSelectors:xS,decls:4,vars:0,consts:[[1,"mat-mdc-button-persistent-ripple","mdc-icon-button__ripple"],[1,"mat-focus-indicator"],[1,"mat-mdc-button-touch-target"]],template:function(i,r){i&1&&(rt(),nt(0,"span",0),ge(1),nt(2,"span",1)(3,"span",2))},styles:[`.mat-mdc-icon-button {
  -webkit-user-select: none;
  user-select: none;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  border: none;
  outline: none;
  background-color: transparent;
  fill: currentColor;
  text-decoration: none;
  cursor: pointer;
  z-index: 0;
  overflow: visible;
  border-radius: var(--mat-icon-button-container-shape, var(--mat-sys-corner-full, 50%));
  flex-shrink: 0;
  text-align: center;
  width: var(--mat-icon-button-state-layer-size, 40px);
  height: var(--mat-icon-button-state-layer-size, 40px);
  padding: calc(calc(var(--mat-icon-button-state-layer-size, 40px) - var(--mat-icon-button-icon-size, 24px)) / 2);
  font-size: var(--mat-icon-button-icon-size, 24px);
  color: var(--mat-icon-button-icon-color, var(--mat-sys-on-surface-variant));
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-icon-button .mat-mdc-button-ripple,
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple,
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  border-radius: inherit;
}
.mat-mdc-icon-button .mat-mdc-button-ripple {
  overflow: hidden;
}
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {
  content: "";
  opacity: 0;
}
.mat-mdc-icon-button .mdc-button__label,
.mat-mdc-icon-button .mat-icon {
  z-index: 1;
  position: relative;
}
.mat-mdc-icon-button .mat-focus-indicator {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: inherit;
}
.mat-mdc-icon-button:focus-visible > .mat-focus-indicator::before {
  content: "";
  border-radius: inherit;
}
.mat-mdc-icon-button .mat-ripple-element {
  background-color: var(--mat-icon-button-ripple-color, color-mix(in srgb, var(--mat-sys-on-surface-variant) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-icon-button-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-icon-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-icon-button-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-icon-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-icon-button-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-icon-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-icon-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-icon-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-icon-button-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-icon-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-icon-button-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-icon-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-icon-button-touch-target-size, 48px);
  display: var(--mat-icon-button-touch-target-display, block);
  left: 50%;
  width: var(--mat-icon-button-touch-target-size, 48px);
  transform: translate(-50%, -50%);
}
.mat-mdc-icon-button._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-mdc-icon-button[disabled], .mat-mdc-icon-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-icon-button-disabled-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-icon-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-icon-button img,
.mat-mdc-icon-button svg {
  width: var(--mat-icon-button-icon-size, 24px);
  height: var(--mat-icon-button-icon-size, 24px);
  vertical-align: baseline;
}
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple {
  border-radius: var(--mat-icon-button-container-shape, var(--mat-sys-corner-full, 50%));
}
.mat-mdc-icon-button[hidden] {
  display: none;
}
.mat-mdc-icon-button.mat-unthemed:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-primary:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-accent:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-warn:not(.mdc-ripple-upgraded):focus::before {
  background: transparent;
  opacity: 1;
}
`,`@media (forced-colors: active) {
  .mat-mdc-button:not(.mdc-button--outlined),
  .mat-mdc-unelevated-button:not(.mdc-button--outlined),
  .mat-mdc-raised-button:not(.mdc-button--outlined),
  .mat-mdc-outlined-button:not(.mdc-button--outlined),
  .mat-mdc-button-base.mat-tonal-button,
  .mat-mdc-icon-button.mat-mdc-icon-button,
  .mat-mdc-outlined-button .mdc-button__ripple {
    outline: solid 1px;
  }
}
`],encapsulation:2,changeDetection:0})}return t})();var MS=new y("cdk-dir-doc",{providedIn:"root",factory:()=>u(k)}),SS=/^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;function mb(t){let n=t?.toLowerCase()||"";return n==="auto"&&typeof navigator<"u"&&navigator?.language?SS.test(navigator.language)?"rtl":"ltr":n==="rtl"?"rtl":"ltr"}var at=(()=>{class t{get value(){return this.valueSignal()}valueSignal=L("ltr");change=new le;constructor(){let e=u(MS,{optional:!0});if(e){let i=e.body?e.body.dir:null,r=e.documentElement?e.documentElement.dir:null;this.valueSignal.set(mb(i||r||"ltr"))}}ngOnDestroy(){this.change.complete()}static \u0275fac=function(i){return new(i||t)};static \u0275prov=_({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Ce=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=q({type:t});static \u0275inj=z({})}return t})();var mc=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=q({type:t});static \u0275inj=z({imports:[Ce]})}return t})();var TS=["matButton",""],vb=[[["",8,"material-icons",3,"iconPositionEnd",""],["mat-icon",3,"iconPositionEnd",""],["","matButtonIcon","",3,"iconPositionEnd",""]],"*",[["","iconPositionEnd","",8,"material-icons"],["mat-icon","iconPositionEnd",""],["","matButtonIcon","","iconPositionEnd",""]]],yb=[".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd]), [matButtonIcon]:not([iconPositionEnd])","*",".material-icons[iconPositionEnd], mat-icon[iconPositionEnd], [matButtonIcon][iconPositionEnd]"],AS=["mat-fab",""];var gb=new Map([["text",["mat-mdc-button"]],["filled",["mdc-button--unelevated","mat-mdc-unelevated-button"]],["elevated",["mdc-button--raised","mat-mdc-raised-button"]],["outlined",["mdc-button--outlined","mat-mdc-outlined-button"]],["tonal",["mat-tonal-button"]]]),zr=(()=>{class t extends hc{get appearance(){return this._appearance}set appearance(e){this.setAppearance(e||this._config?.defaultAppearance||"text")}_appearance=null;constructor(){super();let e=kS(this._elementRef.nativeElement);e&&this.setAppearance(e)}setAppearance(e){if(e===this._appearance)return;let i=this._elementRef.nativeElement.classList,r=this._appearance?gb.get(this._appearance):null,o=gb.get(e);r&&i.remove(...r),i.add(...o),this._appearance=e}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=H({type:t,selectors:[["button","matButton",""],["a","matButton",""],["button","mat-button",""],["button","mat-raised-button",""],["button","mat-flat-button",""],["button","mat-stroked-button",""],["a","mat-button",""],["a","mat-raised-button",""],["a","mat-flat-button",""],["a","mat-stroked-button",""]],hostAttrs:[1,"mdc-button"],inputs:{appearance:[0,"matButton","appearance"]},exportAs:["matButton","matAnchor"],features:[pe],attrs:TS,ngContentSelectors:yb,decls:7,vars:4,consts:[[1,"mat-mdc-button-persistent-ripple"],[1,"mdc-button__label"],[1,"mat-focus-indicator"],[1,"mat-mdc-button-touch-target"]],template:function(i,r){i&1&&(rt(vb),nt(0,"span",0),ge(1),Ct(2,"span",1),ge(3,1),$t(),ge(4,2),nt(5,"span",2)(6,"span",3)),i&2&&B("mdc-button__ripple",!r._isFab)("mdc-fab__ripple",r._isFab)},styles:[`.mat-mdc-button-base {
  text-decoration: none;
}
.mat-mdc-button-base .mat-icon {
  min-height: fit-content;
  flex-shrink: 0;
}
@media (hover: none) {
  .mat-mdc-button-base:hover > span.mat-mdc-button-persistent-ripple::before {
    opacity: 0;
  }
}

.mdc-button {
  -webkit-user-select: none;
  user-select: none;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-width: 64px;
  border: none;
  outline: none;
  line-height: inherit;
  -webkit-appearance: none;
  overflow: visible;
  vertical-align: middle;
  background: transparent;
  padding: 0 8px;
}
.mdc-button::-moz-focus-inner {
  padding: 0;
  border: 0;
}
.mdc-button:active {
  outline: none;
}
.mdc-button:hover {
  cursor: pointer;
}
.mdc-button:disabled {
  cursor: default;
  pointer-events: none;
}
.mdc-button[hidden] {
  display: none;
}
.mdc-button .mdc-button__label {
  position: relative;
}

.mat-mdc-button {
  padding: 0 var(--mat-button-text-horizontal-padding, 12px);
  height: var(--mat-button-text-container-height, 40px);
  font-family: var(--mat-button-text-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-text-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-text-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-text-label-text-transform);
  font-weight: var(--mat-button-text-label-text-weight, var(--mat-sys-label-large-weight));
}
.mat-mdc-button, .mat-mdc-button .mdc-button__ripple {
  border-radius: var(--mat-button-text-container-shape, var(--mat-sys-corner-full));
}
.mat-mdc-button:not(:disabled) {
  color: var(--mat-button-text-label-text-color, var(--mat-sys-primary));
}
.mat-mdc-button[disabled], .mat-mdc-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-text-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-button:has(.material-icons, mat-icon, [matButtonIcon]) {
  padding: 0 var(--mat-button-text-with-icon-horizontal-padding, 16px);
}
.mat-mdc-button > .mat-icon {
  margin-right: var(--mat-button-text-icon-spacing, 8px);
  margin-left: var(--mat-button-text-icon-offset, -4px);
}
[dir=rtl] .mat-mdc-button > .mat-icon {
  margin-right: var(--mat-button-text-icon-offset, -4px);
  margin-left: var(--mat-button-text-icon-spacing, 8px);
}
.mat-mdc-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-text-icon-offset, -4px);
  margin-left: var(--mat-button-text-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-text-icon-spacing, 8px);
  margin-left: var(--mat-button-text-icon-offset, -4px);
}
.mat-mdc-button .mat-ripple-element {
  background-color: var(--mat-button-text-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-text-state-layer-color, var(--mat-sys-primary));
}
.mat-mdc-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-text-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-text-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-text-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-text-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-text-touch-target-size, 48px);
  display: var(--mat-button-text-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}

.mat-mdc-unelevated-button {
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  height: var(--mat-button-filled-container-height, 40px);
  font-family: var(--mat-button-filled-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-filled-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-filled-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-filled-label-text-transform);
  font-weight: var(--mat-button-filled-label-text-weight, var(--mat-sys-label-large-weight));
  padding: 0 var(--mat-button-filled-horizontal-padding, 24px);
}
.mat-mdc-unelevated-button > .mat-icon {
  margin-right: var(--mat-button-filled-icon-spacing, 8px);
  margin-left: var(--mat-button-filled-icon-offset, -8px);
}
[dir=rtl] .mat-mdc-unelevated-button > .mat-icon {
  margin-right: var(--mat-button-filled-icon-offset, -8px);
  margin-left: var(--mat-button-filled-icon-spacing, 8px);
}
.mat-mdc-unelevated-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-filled-icon-offset, -8px);
  margin-left: var(--mat-button-filled-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-unelevated-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-filled-icon-spacing, 8px);
  margin-left: var(--mat-button-filled-icon-offset, -8px);
}
.mat-mdc-unelevated-button .mat-ripple-element {
  background-color: var(--mat-button-filled-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-filled-state-layer-color, var(--mat-sys-on-primary));
}
.mat-mdc-unelevated-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-filled-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-unelevated-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-filled-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-unelevated-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-unelevated-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-unelevated-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-filled-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-unelevated-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-filled-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-unelevated-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-filled-touch-target-size, 48px);
  display: var(--mat-button-filled-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}
.mat-mdc-unelevated-button:not(:disabled) {
  color: var(--mat-button-filled-label-text-color, var(--mat-sys-on-primary));
  background-color: var(--mat-button-filled-container-color, var(--mat-sys-primary));
}
.mat-mdc-unelevated-button, .mat-mdc-unelevated-button .mdc-button__ripple {
  border-radius: var(--mat-button-filled-container-shape, var(--mat-sys-corner-full));
}
.mat-mdc-unelevated-button[disabled], .mat-mdc-unelevated-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-filled-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-button-filled-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-unelevated-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-mdc-raised-button {
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--mat-button-protected-container-elevation-shadow, var(--mat-sys-level1));
  height: var(--mat-button-protected-container-height, 40px);
  font-family: var(--mat-button-protected-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-protected-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-protected-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-protected-label-text-transform);
  font-weight: var(--mat-button-protected-label-text-weight, var(--mat-sys-label-large-weight));
  padding: 0 var(--mat-button-protected-horizontal-padding, 24px);
}
.mat-mdc-raised-button > .mat-icon {
  margin-right: var(--mat-button-protected-icon-spacing, 8px);
  margin-left: var(--mat-button-protected-icon-offset, -8px);
}
[dir=rtl] .mat-mdc-raised-button > .mat-icon {
  margin-right: var(--mat-button-protected-icon-offset, -8px);
  margin-left: var(--mat-button-protected-icon-spacing, 8px);
}
.mat-mdc-raised-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-protected-icon-offset, -8px);
  margin-left: var(--mat-button-protected-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-raised-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-protected-icon-spacing, 8px);
  margin-left: var(--mat-button-protected-icon-offset, -8px);
}
.mat-mdc-raised-button .mat-ripple-element {
  background-color: var(--mat-button-protected-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-protected-state-layer-color, var(--mat-sys-primary));
}
.mat-mdc-raised-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-protected-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-raised-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-protected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-raised-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-raised-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-raised-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-protected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-raised-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-protected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-raised-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-protected-touch-target-size, 48px);
  display: var(--mat-button-protected-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}
.mat-mdc-raised-button:not(:disabled) {
  color: var(--mat-button-protected-label-text-color, var(--mat-sys-primary));
  background-color: var(--mat-button-protected-container-color, var(--mat-sys-surface));
}
.mat-mdc-raised-button, .mat-mdc-raised-button .mdc-button__ripple {
  border-radius: var(--mat-button-protected-container-shape, var(--mat-sys-corner-full));
}
@media (hover: hover) {
  .mat-mdc-raised-button:hover {
    box-shadow: var(--mat-button-protected-hover-container-elevation-shadow, var(--mat-sys-level2));
  }
}
.mat-mdc-raised-button:focus {
  box-shadow: var(--mat-button-protected-focus-container-elevation-shadow, var(--mat-sys-level1));
}
.mat-mdc-raised-button:active, .mat-mdc-raised-button:focus:active {
  box-shadow: var(--mat-button-protected-pressed-container-elevation-shadow, var(--mat-sys-level1));
}
.mat-mdc-raised-button[disabled], .mat-mdc-raised-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-protected-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-button-protected-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-raised-button[disabled].mat-mdc-button-disabled, .mat-mdc-raised-button.mat-mdc-button-disabled.mat-mdc-button-disabled {
  box-shadow: var(--mat-button-protected-disabled-container-elevation-shadow, var(--mat-sys-level0));
}
.mat-mdc-raised-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-mdc-outlined-button {
  border-style: solid;
  transition: border 280ms cubic-bezier(0.4, 0, 0.2, 1);
  height: var(--mat-button-outlined-container-height, 40px);
  font-family: var(--mat-button-outlined-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-outlined-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-outlined-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-outlined-label-text-transform);
  font-weight: var(--mat-button-outlined-label-text-weight, var(--mat-sys-label-large-weight));
  border-radius: var(--mat-button-outlined-container-shape, var(--mat-sys-corner-full));
  border-width: var(--mat-button-outlined-outline-width, 1px);
  padding: 0 var(--mat-button-outlined-horizontal-padding, 24px);
}
.mat-mdc-outlined-button > .mat-icon {
  margin-right: var(--mat-button-outlined-icon-spacing, 8px);
  margin-left: var(--mat-button-outlined-icon-offset, -8px);
}
[dir=rtl] .mat-mdc-outlined-button > .mat-icon {
  margin-right: var(--mat-button-outlined-icon-offset, -8px);
  margin-left: var(--mat-button-outlined-icon-spacing, 8px);
}
.mat-mdc-outlined-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-outlined-icon-offset, -8px);
  margin-left: var(--mat-button-outlined-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-outlined-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-outlined-icon-spacing, 8px);
  margin-left: var(--mat-button-outlined-icon-offset, -8px);
}
.mat-mdc-outlined-button .mat-ripple-element {
  background-color: var(--mat-button-outlined-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-outlined-state-layer-color, var(--mat-sys-primary));
}
.mat-mdc-outlined-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-outlined-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-outlined-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-outlined-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-outlined-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-outlined-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-outlined-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-outlined-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-outlined-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-outlined-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-outlined-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-outlined-touch-target-size, 48px);
  display: var(--mat-button-outlined-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}
.mat-mdc-outlined-button:not(:disabled) {
  color: var(--mat-button-outlined-label-text-color, var(--mat-sys-primary));
  border-color: var(--mat-button-outlined-outline-color, var(--mat-sys-outline));
}
.mat-mdc-outlined-button[disabled], .mat-mdc-outlined-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-outlined-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  border-color: var(--mat-button-outlined-disabled-outline-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-outlined-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-tonal-button {
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  height: var(--mat-button-tonal-container-height, 40px);
  font-family: var(--mat-button-tonal-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-tonal-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-tonal-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-tonal-label-text-transform);
  font-weight: var(--mat-button-tonal-label-text-weight, var(--mat-sys-label-large-weight));
  padding: 0 var(--mat-button-tonal-horizontal-padding, 24px);
}
.mat-tonal-button:not(:disabled) {
  color: var(--mat-button-tonal-label-text-color, var(--mat-sys-on-secondary-container));
  background-color: var(--mat-button-tonal-container-color, var(--mat-sys-secondary-container));
}
.mat-tonal-button, .mat-tonal-button .mdc-button__ripple {
  border-radius: var(--mat-button-tonal-container-shape, var(--mat-sys-corner-full));
}
.mat-tonal-button[disabled], .mat-tonal-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-tonal-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-button-tonal-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-tonal-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-tonal-button > .mat-icon {
  margin-right: var(--mat-button-tonal-icon-spacing, 8px);
  margin-left: var(--mat-button-tonal-icon-offset, -8px);
}
[dir=rtl] .mat-tonal-button > .mat-icon {
  margin-right: var(--mat-button-tonal-icon-offset, -8px);
  margin-left: var(--mat-button-tonal-icon-spacing, 8px);
}
.mat-tonal-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-tonal-icon-offset, -8px);
  margin-left: var(--mat-button-tonal-icon-spacing, 8px);
}
[dir=rtl] .mat-tonal-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-tonal-icon-spacing, 8px);
  margin-left: var(--mat-button-tonal-icon-offset, -8px);
}
.mat-tonal-button .mat-ripple-element {
  background-color: var(--mat-button-tonal-ripple-color, color-mix(in srgb, var(--mat-sys-on-secondary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-tonal-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-tonal-state-layer-color, var(--mat-sys-on-secondary-container));
}
.mat-tonal-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-tonal-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-tonal-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-tonal-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-tonal-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-tonal-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-tonal-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-tonal-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-tonal-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-tonal-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-tonal-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-tonal-touch-target-size, 48px);
  display: var(--mat-button-tonal-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}

.mat-mdc-button,
.mat-mdc-unelevated-button,
.mat-mdc-raised-button,
.mat-mdc-outlined-button,
.mat-tonal-button {
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-button .mat-mdc-button-ripple,
.mat-mdc-button .mat-mdc-button-persistent-ripple,
.mat-mdc-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-unelevated-button .mat-mdc-button-ripple,
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple,
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-raised-button .mat-mdc-button-ripple,
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple,
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-outlined-button .mat-mdc-button-ripple,
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple,
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before,
.mat-tonal-button .mat-mdc-button-ripple,
.mat-tonal-button .mat-mdc-button-persistent-ripple,
.mat-tonal-button .mat-mdc-button-persistent-ripple::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  border-radius: inherit;
}
.mat-mdc-button .mat-mdc-button-ripple,
.mat-mdc-unelevated-button .mat-mdc-button-ripple,
.mat-mdc-raised-button .mat-mdc-button-ripple,
.mat-mdc-outlined-button .mat-mdc-button-ripple,
.mat-tonal-button .mat-mdc-button-ripple {
  overflow: hidden;
}
.mat-mdc-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before,
.mat-tonal-button .mat-mdc-button-persistent-ripple::before {
  content: "";
  opacity: 0;
}
.mat-mdc-button .mdc-button__label,
.mat-mdc-button .mat-icon,
.mat-mdc-unelevated-button .mdc-button__label,
.mat-mdc-unelevated-button .mat-icon,
.mat-mdc-raised-button .mdc-button__label,
.mat-mdc-raised-button .mat-icon,
.mat-mdc-outlined-button .mdc-button__label,
.mat-mdc-outlined-button .mat-icon,
.mat-tonal-button .mdc-button__label,
.mat-tonal-button .mat-icon {
  z-index: 1;
  position: relative;
}
.mat-mdc-button .mat-focus-indicator,
.mat-mdc-unelevated-button .mat-focus-indicator,
.mat-mdc-raised-button .mat-focus-indicator,
.mat-mdc-outlined-button .mat-focus-indicator,
.mat-tonal-button .mat-focus-indicator {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: inherit;
}
.mat-mdc-button:focus-visible > .mat-focus-indicator::before,
.mat-mdc-unelevated-button:focus-visible > .mat-focus-indicator::before,
.mat-mdc-raised-button:focus-visible > .mat-focus-indicator::before,
.mat-mdc-outlined-button:focus-visible > .mat-focus-indicator::before,
.mat-tonal-button:focus-visible > .mat-focus-indicator::before {
  content: "";
  border-radius: inherit;
}
.mat-mdc-button._mat-animation-noopable,
.mat-mdc-unelevated-button._mat-animation-noopable,
.mat-mdc-raised-button._mat-animation-noopable,
.mat-mdc-outlined-button._mat-animation-noopable,
.mat-tonal-button._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-mdc-button > .mat-icon,
.mat-mdc-unelevated-button > .mat-icon,
.mat-mdc-raised-button > .mat-icon,
.mat-mdc-outlined-button > .mat-icon,
.mat-tonal-button > .mat-icon {
  display: inline-block;
  position: relative;
  vertical-align: top;
  font-size: 1.125rem;
  height: 1.125rem;
  width: 1.125rem;
}

.mat-mdc-outlined-button .mat-mdc-button-ripple,
.mat-mdc-outlined-button .mdc-button__ripple {
  top: -1px;
  left: -1px;
  bottom: -1px;
  right: -1px;
}

.mat-mdc-unelevated-button .mat-focus-indicator::before,
.mat-tonal-button .mat-focus-indicator::before,
.mat-mdc-raised-button .mat-focus-indicator::before {
  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px) * -1);
}

.mat-mdc-outlined-button .mat-focus-indicator::before {
  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 3px) * -1);
}
`,`@media (forced-colors: active) {
  .mat-mdc-button:not(.mdc-button--outlined),
  .mat-mdc-unelevated-button:not(.mdc-button--outlined),
  .mat-mdc-raised-button:not(.mdc-button--outlined),
  .mat-mdc-outlined-button:not(.mdc-button--outlined),
  .mat-mdc-button-base.mat-tonal-button,
  .mat-mdc-icon-button.mat-mdc-icon-button,
  .mat-mdc-outlined-button .mdc-button__ripple {
    outline: solid 1px;
  }
}
`],encapsulation:2,changeDetection:0})}return t})();function kS(t){return t.hasAttribute("mat-raised-button")?"elevated":t.hasAttribute("mat-stroked-button")?"outlined":t.hasAttribute("mat-flat-button")?"filled":t.hasAttribute("mat-button")?"text":null}var RS=new y("mat-mdc-fab-default-options",{providedIn:"root",factory:()=>th}),th={color:"accent"},_b=(()=>{class t extends hc{_options=u(RS,{optional:!0});_isFab=!0;extended=!1;constructor(){super(),this._options=this._options||th,this.color=this._options.color||th.color}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=H({type:t,selectors:[["button","mat-fab",""],["a","mat-fab",""],["button","matFab",""],["a","matFab",""]],hostAttrs:[1,"mdc-fab","mat-mdc-fab-base","mat-mdc-fab"],hostVars:4,hostBindings:function(i,r){i&2&&B("mdc-fab--extended",r.extended)("mat-mdc-extended-fab",r.extended)},inputs:{extended:[2,"extended","extended",he]},exportAs:["matButton","matAnchor"],features:[pe],attrs:AS,ngContentSelectors:yb,decls:7,vars:4,consts:[[1,"mat-mdc-button-persistent-ripple"],[1,"mdc-button__label"],[1,"mat-focus-indicator"],[1,"mat-mdc-button-touch-target"]],template:function(i,r){i&1&&(rt(vb),nt(0,"span",0),ge(1),Ct(2,"span",1),ge(3,1),$t(),ge(4,2),nt(5,"span",2)(6,"span",3)),i&2&&B("mdc-button__ripple",!r._isFab)("mdc-fab__ripple",r._isFab)},styles:[`.mat-mdc-fab-base {
  -webkit-user-select: none;
  user-select: none;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 56px;
  height: 56px;
  padding: 0;
  border: none;
  fill: currentColor;
  text-decoration: none;
  cursor: pointer;
  -moz-appearance: none;
  -webkit-appearance: none;
  overflow: visible;
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1), opacity 15ms linear 30ms, transform 270ms 0ms cubic-bezier(0, 0, 0.2, 1);
  flex-shrink: 0;
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-fab-base .mat-mdc-button-ripple,
.mat-mdc-fab-base .mat-mdc-button-persistent-ripple,
.mat-mdc-fab-base .mat-mdc-button-persistent-ripple::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  border-radius: inherit;
}
.mat-mdc-fab-base .mat-mdc-button-ripple {
  overflow: hidden;
}
.mat-mdc-fab-base .mat-mdc-button-persistent-ripple::before {
  content: "";
  opacity: 0;
}
.mat-mdc-fab-base .mdc-button__label,
.mat-mdc-fab-base .mat-icon {
  z-index: 1;
  position: relative;
}
.mat-mdc-fab-base .mat-focus-indicator {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
}
.mat-mdc-fab-base:focus-visible > .mat-focus-indicator::before {
  content: "";
}
.mat-mdc-fab-base._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-mdc-fab-base::before {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border: 1px solid transparent;
  border-radius: inherit;
  content: "";
  pointer-events: none;
}
.mat-mdc-fab-base[hidden] {
  display: none;
}
.mat-mdc-fab-base::-moz-focus-inner {
  padding: 0;
  border: 0;
}
.mat-mdc-fab-base:active, .mat-mdc-fab-base:focus {
  outline: none;
}
.mat-mdc-fab-base:hover {
  cursor: pointer;
}
.mat-mdc-fab-base > svg {
  width: 100%;
}
.mat-mdc-fab-base .mat-icon, .mat-mdc-fab-base .material-icons {
  transition: transform 180ms 90ms cubic-bezier(0, 0, 0.2, 1);
  fill: currentColor;
  will-change: transform;
}
.mat-mdc-fab-base .mat-focus-indicator::before {
  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px) * -1);
}
.mat-mdc-fab-base[disabled], .mat-mdc-fab-base.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
}
.mat-mdc-fab-base[disabled], .mat-mdc-fab-base[disabled]:focus, .mat-mdc-fab-base.mat-mdc-button-disabled, .mat-mdc-fab-base.mat-mdc-button-disabled:focus {
  box-shadow: none;
}
.mat-mdc-fab-base.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-mdc-fab {
  background-color: var(--mat-fab-container-color, var(--mat-sys-primary-container));
  border-radius: var(--mat-fab-container-shape, var(--mat-sys-corner-large));
  color: var(--mat-fab-foreground-color, var(--mat-sys-on-primary-container, inherit));
  box-shadow: var(--mat-fab-container-elevation-shadow, var(--mat-sys-level3));
}
@media (hover: hover) {
  .mat-mdc-fab:hover {
    box-shadow: var(--mat-fab-hover-container-elevation-shadow, var(--mat-sys-level4));
  }
}
.mat-mdc-fab:focus {
  box-shadow: var(--mat-fab-focus-container-elevation-shadow, var(--mat-sys-level3));
}
.mat-mdc-fab:active, .mat-mdc-fab:focus:active {
  box-shadow: var(--mat-fab-pressed-container-elevation-shadow, var(--mat-sys-level3));
}
.mat-mdc-fab[disabled], .mat-mdc-fab.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-fab-disabled-state-foreground-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-fab-disabled-state-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-fab.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-fab .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-fab-touch-target-size, 48px);
  display: var(--mat-fab-touch-target-display, block);
  left: 50%;
  width: var(--mat-fab-touch-target-size, 48px);
  transform: translate(-50%, -50%);
}
.mat-mdc-fab .mat-ripple-element {
  background-color: var(--mat-fab-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-fab .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-fab-state-layer-color, var(--mat-sys-on-primary-container));
}
.mat-mdc-fab.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-fab-disabled-state-layer-color);
}
.mat-mdc-fab:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-fab-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-fab.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-fab.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-fab.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-fab-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-fab:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-fab-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}

.mat-mdc-mini-fab {
  width: 40px;
  height: 40px;
  background-color: var(--mat-fab-small-container-color, var(--mat-sys-primary-container));
  border-radius: var(--mat-fab-small-container-shape, var(--mat-sys-corner-medium));
  color: var(--mat-fab-small-foreground-color, var(--mat-sys-on-primary-container, inherit));
  box-shadow: var(--mat-fab-small-container-elevation-shadow, var(--mat-sys-level3));
}
@media (hover: hover) {
  .mat-mdc-mini-fab:hover {
    box-shadow: var(--mat-fab-small-hover-container-elevation-shadow, var(--mat-sys-level4));
  }
}
.mat-mdc-mini-fab:focus {
  box-shadow: var(--mat-fab-small-focus-container-elevation-shadow, var(--mat-sys-level3));
}
.mat-mdc-mini-fab:active, .mat-mdc-mini-fab:focus:active {
  box-shadow: var(--mat-fab-small-pressed-container-elevation-shadow, var(--mat-sys-level3));
}
.mat-mdc-mini-fab[disabled], .mat-mdc-mini-fab.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-fab-small-disabled-state-foreground-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-fab-small-disabled-state-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-mini-fab.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-mini-fab .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-fab-small-touch-target-size, 48px);
  display: var(--mat-fab-small-touch-target-display);
  left: 50%;
  width: var(--mat-fab-small-touch-target-size, 48px);
  transform: translate(-50%, -50%);
}
.mat-mdc-mini-fab .mat-ripple-element {
  background-color: var(--mat-fab-small-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-mini-fab .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-fab-small-state-layer-color, var(--mat-sys-on-primary-container));
}
.mat-mdc-mini-fab.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-fab-small-disabled-state-layer-color);
}
.mat-mdc-mini-fab:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-fab-small-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-mini-fab.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-mini-fab.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-mini-fab.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-fab-small-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-mini-fab:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-fab-small-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}

.mat-mdc-extended-fab {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  padding-left: 20px;
  padding-right: 20px;
  width: auto;
  max-width: 100%;
  line-height: normal;
  box-shadow: var(--mat-fab-extended-container-elevation-shadow, var(--mat-sys-level3));
  height: var(--mat-fab-extended-container-height, 56px);
  border-radius: var(--mat-fab-extended-container-shape, var(--mat-sys-corner-large));
  font-family: var(--mat-fab-extended-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-fab-extended-label-text-size, var(--mat-sys-label-large-size));
  font-weight: var(--mat-fab-extended-label-text-weight, var(--mat-sys-label-large-weight));
  letter-spacing: var(--mat-fab-extended-label-text-tracking, var(--mat-sys-label-large-tracking));
}
@media (hover: hover) {
  .mat-mdc-extended-fab:hover {
    box-shadow: var(--mat-fab-extended-hover-container-elevation-shadow, var(--mat-sys-level4));
  }
}
.mat-mdc-extended-fab:focus {
  box-shadow: var(--mat-fab-extended-focus-container-elevation-shadow, var(--mat-sys-level3));
}
.mat-mdc-extended-fab:active, .mat-mdc-extended-fab:focus:active {
  box-shadow: var(--mat-fab-extended-pressed-container-elevation-shadow, var(--mat-sys-level3));
}
.mat-mdc-extended-fab[disabled], .mat-mdc-extended-fab.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
}
.mat-mdc-extended-fab[disabled], .mat-mdc-extended-fab[disabled]:focus, .mat-mdc-extended-fab.mat-mdc-button-disabled, .mat-mdc-extended-fab.mat-mdc-button-disabled:focus {
  box-shadow: none;
}
.mat-mdc-extended-fab.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
[dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .mat-icon, [dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .material-icons,
.mat-mdc-extended-fab > .mat-icon,
.mat-mdc-extended-fab > .material-icons {
  margin-left: -8px;
  margin-right: 12px;
}
.mat-mdc-extended-fab .mdc-button__label + .mat-icon,
.mat-mdc-extended-fab .mdc-button__label + .material-icons, [dir=rtl] .mat-mdc-extended-fab > .mat-icon, [dir=rtl] .mat-mdc-extended-fab > .material-icons {
  margin-left: 12px;
  margin-right: -8px;
}
.mat-mdc-extended-fab .mat-mdc-button-touch-target {
  width: 100%;
}
`],encapsulation:2,changeDetection:0})}return t})();var _n=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=q({type:t});static \u0275inj=z({imports:[mc,Ce]})}return t})();var _s=class{_multiple;_emitChanges;compareWith;_selection=new Set;_deselectedToEmit=[];_selectedToEmit=[];_selected=null;get selected(){return this._selected||(this._selected=Array.from(this._selection.values())),this._selected}changed=new E;constructor(n=!1,e,i=!0,r){this._multiple=n,this._emitChanges=i,this.compareWith=r,e&&e.length&&(n?e.forEach(o=>this._markSelected(o)):this._markSelected(e[0]),this._selectedToEmit.length=0)}select(...n){this._verifyValueAssignment(n),n.forEach(i=>this._markSelected(i));let e=this._hasQueuedChanges();return this._emitChangeEvent(),e}deselect(...n){this._verifyValueAssignment(n),n.forEach(i=>this._unmarkSelected(i));let e=this._hasQueuedChanges();return this._emitChangeEvent(),e}setSelection(...n){this._verifyValueAssignment(n);let e=this.selected,i=new Set(n.map(o=>this._getConcreteValue(o)));n.forEach(o=>this._markSelected(o)),e.filter(o=>!i.has(this._getConcreteValue(o,i))).forEach(o=>this._unmarkSelected(o));let r=this._hasQueuedChanges();return this._emitChangeEvent(),r}toggle(n){return this.isSelected(n)?this.deselect(n):this.select(n)}clear(n=!0){this._unmarkAll();let e=this._hasQueuedChanges();return n&&this._emitChangeEvent(),e}isSelected(n){return this._selection.has(this._getConcreteValue(n))}isEmpty(){return this._selection.size===0}hasValue(){return!this.isEmpty()}sort(n){this._multiple&&this.selected&&this._selected.sort(n)}isMultipleSelection(){return this._multiple}_emitChangeEvent(){this._selected=null,(this._selectedToEmit.length||this._deselectedToEmit.length)&&(this.changed.next({source:this,added:this._selectedToEmit,removed:this._deselectedToEmit}),this._deselectedToEmit=[],this._selectedToEmit=[])}_markSelected(n){n=this._getConcreteValue(n),this.isSelected(n)||(this._multiple||this._unmarkAll(),this.isSelected(n)||this._selection.add(n),this._emitChanges&&this._selectedToEmit.push(n))}_unmarkSelected(n){n=this._getConcreteValue(n),this.isSelected(n)&&(this._selection.delete(n),this._emitChanges&&this._deselectedToEmit.push(n))}_unmarkAll(){this.isEmpty()||this._selection.forEach(n=>this._unmarkSelected(n))}_verifyValueAssignment(n){n.length>1&&this._multiple}_hasQueuedChanges(){return!!(this._deselectedToEmit.length||this._selectedToEmit.length)}_getConcreteValue(n,e){if(this.compareWith){e=e??this._selection;for(let i of e)if(this.compareWith(n,i))return i;return n}else return n}};var Mb=(()=>{class t{_renderer;_elementRef;onChange=e=>{};onTouched=()=>{};constructor(e,i){this._renderer=e,this._elementRef=i}setProperty(e,i){this._renderer.setProperty(this._elementRef.nativeElement,e,i)}registerOnTouched(e){this.onTouched=e}registerOnChange(e){this.onChange=e}setDisabledState(e){this.setProperty("disabled",e)}static \u0275fac=function(i){return new(i||t)(W(Ae),W(V))};static \u0275dir=F({type:t})}return t})(),NS=(()=>{class t extends Mb{static \u0275fac=(()=>{let e;return function(r){return(e||(e=bt(t)))(r||t)}})();static \u0275dir=F({type:t,features:[pe]})}return t})(),Mc=new y("");var OS={provide:Mc,useExisting:ht(()=>Sc),multi:!0};function FS(){let t=wt()?wt().getUserAgent():"";return/android (\d+)/.test(t.toLowerCase())}var PS=new y(""),Sc=(()=>{class t extends Mb{_compositionMode;_composing=!1;constructor(e,i,r){super(e,i),this._compositionMode=r,this._compositionMode==null&&(this._compositionMode=!FS())}writeValue(e){let i=e??"";this.setProperty("value",i)}_handleInput(e){(!this._compositionMode||this._compositionMode&&!this._composing)&&this.onChange(e)}_compositionStart(){this._composing=!0}_compositionEnd(e){this._composing=!1,this._compositionMode&&this.onChange(e)}static \u0275fac=function(i){return new(i||t)(W(Ae),W(V),W(PS,8))};static \u0275dir=F({type:t,selectors:[["input","formControlName","",3,"type","checkbox"],["textarea","formControlName",""],["input","formControl","",3,"type","checkbox"],["textarea","formControl",""],["input","ngModel","",3,"type","checkbox"],["textarea","ngModel",""],["","ngDefaultControl",""]],hostBindings:function(i,r){i&1&&Q("input",function(s){return r._handleInput(s.target.value)})("blur",function(){return r.onTouched()})("compositionstart",function(){return r._compositionStart()})("compositionend",function(s){return r._compositionEnd(s.target.value)})},standalone:!1,features:[Xe([OS]),pe]})}return t})();function sh(t){return t==null||ah(t)===0}function ah(t){return t==null?null:Array.isArray(t)||typeof t=="string"?t.length:t instanceof Set?t.size:null}var lh=new y(""),ch=new y(""),LS=/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,_c=class{static min(n){return VS(n)}static max(n){return BS(n)}static required(n){return jS(n)}static requiredTrue(n){return HS(n)}static email(n){return US(n)}static minLength(n){return zS(n)}static maxLength(n){return $S(n)}static pattern(n){return GS(n)}static nullValidator(n){return Sb()}static compose(n){return Ob(n)}static composeAsync(n){return Fb(n)}};function VS(t){return n=>{if(n.value==null||t==null)return null;let e=parseFloat(n.value);return!isNaN(e)&&e<t?{min:{min:t,actual:n.value}}:null}}function BS(t){return n=>{if(n.value==null||t==null)return null;let e=parseFloat(n.value);return!isNaN(e)&&e>t?{max:{max:t,actual:n.value}}:null}}function jS(t){return sh(t.value)?{required:!0}:null}function HS(t){return t.value===!0?null:{required:!0}}function US(t){return sh(t.value)||LS.test(t.value)?null:{email:!0}}function zS(t){return n=>{let e=n.value?.length??ah(n.value);return e===null||e===0?null:e<t?{minlength:{requiredLength:t,actualLength:e}}:null}}function $S(t){return n=>{let e=n.value?.length??ah(n.value);return e!==null&&e>t?{maxlength:{requiredLength:t,actualLength:e}}:null}}function GS(t){if(!t)return Sb;let n,e;return typeof t=="string"?(e="",t.charAt(0)!=="^"&&(e+="^"),e+=t,t.charAt(t.length-1)!=="$"&&(e+="$"),n=new RegExp(e)):(e=t.toString(),n=t),i=>{if(sh(i.value))return null;let r=i.value;return n.test(r)?null:{pattern:{requiredPattern:e,actualValue:r}}}}function Sb(t){return null}function Tb(t){return t!=null}function Ab(t){return Tr(t)?pt(t):t}function kb(t){let n={};return t.forEach(e=>{n=e!=null?D(D({},n),e):n}),Object.keys(n).length===0?null:n}function Rb(t,n){return n.map(e=>e(t))}function WS(t){return!t.validate}function Nb(t){return t.map(n=>WS(n)?n:e=>n.validate(e))}function Ob(t){if(!t)return null;let n=t.filter(Tb);return n.length==0?null:function(e){return kb(Rb(e,n))}}function dh(t){return t!=null?Ob(Nb(t)):null}function Fb(t){if(!t)return null;let n=t.filter(Tb);return n.length==0?null:function(e){let i=Rb(e,n).map(Ab);return po(i).pipe(_e(kb))}}function uh(t){return t!=null?Fb(Nb(t)):null}function bb(t,n){return t===null?[n]:Array.isArray(t)?[...t,n]:[t,n]}function Pb(t){return t._rawValidators}function Lb(t){return t._rawAsyncValidators}function nh(t){return t?Array.isArray(t)?t:[t]:[]}function bc(t,n){return Array.isArray(t)?t.includes(n):t===n}function Db(t,n){let e=nh(n);return nh(t).forEach(r=>{bc(e,r)||e.push(r)}),e}function Cb(t,n){return nh(n).filter(e=>!bc(t,e))}var Dc=class{get value(){return this.control?this.control.value:null}get valid(){return this.control?this.control.valid:null}get invalid(){return this.control?this.control.invalid:null}get pending(){return this.control?this.control.pending:null}get disabled(){return this.control?this.control.disabled:null}get enabled(){return this.control?this.control.enabled:null}get errors(){return this.control?this.control.errors:null}get pristine(){return this.control?this.control.pristine:null}get dirty(){return this.control?this.control.dirty:null}get touched(){return this.control?this.control.touched:null}get status(){return this.control?this.control.status:null}get untouched(){return this.control?this.control.untouched:null}get statusChanges(){return this.control?this.control.statusChanges:null}get valueChanges(){return this.control?this.control.valueChanges:null}get path(){return null}_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators=[];_rawAsyncValidators=[];_setValidators(n){this._rawValidators=n||[],this._composedValidatorFn=dh(this._rawValidators)}_setAsyncValidators(n){this._rawAsyncValidators=n||[],this._composedAsyncValidatorFn=uh(this._rawAsyncValidators)}get validator(){return this._composedValidatorFn||null}get asyncValidator(){return this._composedAsyncValidatorFn||null}_onDestroyCallbacks=[];_registerOnDestroy(n){this._onDestroyCallbacks.push(n)}_invokeOnDestroyCallbacks(){this._onDestroyCallbacks.forEach(n=>n()),this._onDestroyCallbacks=[]}reset(n=void 0){this.control?.reset(n)}hasError(n,e){return this.control?this.control.hasError(n,e):!1}getError(n,e){return this.control?this.control.getError(n,e):null}},Gn=class extends Dc{name;get formDirective(){return null}get path(){return null}},qi=class extends Dc{_parent=null;name=null;valueAccessor=null},Cc=class{_cd;constructor(n){this._cd=n}get isTouched(){return this._cd?.control?._touched?.(),!!this._cd?.control?.touched}get isUntouched(){return!!this._cd?.control?.untouched}get isPristine(){return this._cd?.control?._pristine?.(),!!this._cd?.control?.pristine}get isDirty(){return!!this._cd?.control?.dirty}get isValid(){return this._cd?.control?._status?.(),!!this._cd?.control?.valid}get isInvalid(){return!!this._cd?.control?.invalid}get isPending(){return!!this._cd?.control?.pending}get isSubmitted(){return this._cd?._submitted?.(),!!this._cd?.submitted}};var Vb=(()=>{class t extends Cc{constructor(e){super(e)}static \u0275fac=function(i){return new(i||t)(W(qi,2))};static \u0275dir=F({type:t,selectors:[["","formControlName",""],["","ngModel",""],["","formControl",""]],hostVars:14,hostBindings:function(i,r){i&2&&B("ng-untouched",r.isUntouched)("ng-touched",r.isTouched)("ng-pristine",r.isPristine)("ng-dirty",r.isDirty)("ng-valid",r.isValid)("ng-invalid",r.isInvalid)("ng-pending",r.isPending)},standalone:!1,features:[pe]})}return t})(),Bb=(()=>{class t extends Cc{constructor(e){super(e)}static \u0275fac=function(i){return new(i||t)(W(Gn,10))};static \u0275dir=F({type:t,selectors:[["","formGroupName",""],["","formArrayName",""],["","ngModelGroup",""],["","formGroup",""],["","formArray",""],["form",3,"ngNoForm",""],["","ngForm",""]],hostVars:16,hostBindings:function(i,r){i&2&&B("ng-untouched",r.isUntouched)("ng-touched",r.isTouched)("ng-pristine",r.isPristine)("ng-dirty",r.isDirty)("ng-valid",r.isValid)("ng-invalid",r.isInvalid)("ng-pending",r.isPending)("ng-submitted",r.isSubmitted)},standalone:!1,features:[pe]})}return t})();var bs="VALID",vc="INVALID",$r="PENDING",Ds="DISABLED",Wn=class{},Ec=class extends Wn{value;source;constructor(n,e){super(),this.value=n,this.source=e}},Es=class extends Wn{pristine;source;constructor(n,e){super(),this.pristine=n,this.source=e}},ws=class extends Wn{touched;source;constructor(n,e){super(),this.touched=n,this.source=e}},Gr=class extends Wn{status;source;constructor(n,e){super(),this.status=n,this.source=e}},wc=class extends Wn{source;constructor(n){super(),this.source=n}},xs=class extends Wn{source;constructor(n){super(),this.source=n}};function fh(t){return(Tc(t)?t.validators:t)||null}function qS(t){return Array.isArray(t)?dh(t):t||null}function ph(t,n){return(Tc(n)?n.asyncValidators:t)||null}function YS(t){return Array.isArray(t)?uh(t):t||null}function Tc(t){return t!=null&&!Array.isArray(t)&&typeof t=="object"}function jb(t,n,e){let i=t.controls;if(!(n?Object.keys(i):i).length)throw new A(1e3,"");if(!i[e])throw new A(1001,"")}function Hb(t,n,e){t._forEachChild((i,r)=>{if(e[r]===void 0)throw new A(-1002,"")})}var Wr=class{_pendingDirty=!1;_hasOwnPendingAsyncValidator=null;_pendingTouched=!1;_onCollectionChange=()=>{};_updateOn;_parent=null;_asyncValidationSubscription;_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators;_rawAsyncValidators;value;constructor(n,e){this._assignValidators(n),this._assignAsyncValidators(e)}get validator(){return this._composedValidatorFn}set validator(n){this._rawValidators=this._composedValidatorFn=n}get asyncValidator(){return this._composedAsyncValidatorFn}set asyncValidator(n){this._rawAsyncValidators=this._composedAsyncValidatorFn=n}get parent(){return this._parent}get status(){return Et(this.statusReactive)}set status(n){Et(()=>this.statusReactive.set(n))}_status=ke(()=>this.statusReactive());statusReactive=L(void 0);get valid(){return this.status===bs}get invalid(){return this.status===vc}get pending(){return this.status===$r}get disabled(){return this.status===Ds}get enabled(){return this.status!==Ds}errors;get pristine(){return Et(this.pristineReactive)}set pristine(n){Et(()=>this.pristineReactive.set(n))}_pristine=ke(()=>this.pristineReactive());pristineReactive=L(!0);get dirty(){return!this.pristine}get touched(){return Et(this.touchedReactive)}set touched(n){Et(()=>this.touchedReactive.set(n))}_touched=ke(()=>this.touchedReactive());touchedReactive=L(!1);get untouched(){return!this.touched}_events=new E;events=this._events.asObservable();valueChanges;statusChanges;get updateOn(){return this._updateOn?this._updateOn:this.parent?this.parent.updateOn:"change"}setValidators(n){this._assignValidators(n)}setAsyncValidators(n){this._assignAsyncValidators(n)}addValidators(n){this.setValidators(Db(n,this._rawValidators))}addAsyncValidators(n){this.setAsyncValidators(Db(n,this._rawAsyncValidators))}removeValidators(n){this.setValidators(Cb(n,this._rawValidators))}removeAsyncValidators(n){this.setAsyncValidators(Cb(n,this._rawAsyncValidators))}hasValidator(n){return bc(this._rawValidators,n)}hasAsyncValidator(n){return bc(this._rawAsyncValidators,n)}clearValidators(){this.validator=null}clearAsyncValidators(){this.asyncValidator=null}markAsTouched(n={}){let e=this.touched===!1;this.touched=!0;let i=n.sourceControl??this;n.onlySelf||this._parent?.markAsTouched(J(D({},n),{sourceControl:i})),e&&n.emitEvent!==!1&&this._events.next(new ws(!0,i))}markAllAsDirty(n={}){this.markAsDirty({onlySelf:!0,emitEvent:n.emitEvent,sourceControl:this}),this._forEachChild(e=>e.markAllAsDirty(n))}markAllAsTouched(n={}){this.markAsTouched({onlySelf:!0,emitEvent:n.emitEvent,sourceControl:this}),this._forEachChild(e=>e.markAllAsTouched(n))}markAsUntouched(n={}){let e=this.touched===!0;this.touched=!1,this._pendingTouched=!1;let i=n.sourceControl??this;this._forEachChild(r=>{r.markAsUntouched({onlySelf:!0,emitEvent:n.emitEvent,sourceControl:i})}),n.onlySelf||this._parent?._updateTouched(n,i),e&&n.emitEvent!==!1&&this._events.next(new ws(!1,i))}markAsDirty(n={}){let e=this.pristine===!0;this.pristine=!1;let i=n.sourceControl??this;n.onlySelf||this._parent?.markAsDirty(J(D({},n),{sourceControl:i})),e&&n.emitEvent!==!1&&this._events.next(new Es(!1,i))}markAsPristine(n={}){let e=this.pristine===!1;this.pristine=!0,this._pendingDirty=!1;let i=n.sourceControl??this;this._forEachChild(r=>{r.markAsPristine({onlySelf:!0,emitEvent:n.emitEvent})}),n.onlySelf||this._parent?._updatePristine(n,i),e&&n.emitEvent!==!1&&this._events.next(new Es(!0,i))}markAsPending(n={}){this.status=$r;let e=n.sourceControl??this;n.emitEvent!==!1&&(this._events.next(new Gr(this.status,e)),this.statusChanges.emit(this.status)),n.onlySelf||this._parent?.markAsPending(J(D({},n),{sourceControl:e}))}disable(n={}){let e=this._parentMarkedDirty(n.onlySelf);this.status=Ds,this.errors=null,this._forEachChild(r=>{r.disable(J(D({},n),{onlySelf:!0}))}),this._updateValue();let i=n.sourceControl??this;n.emitEvent!==!1&&(this._events.next(new Ec(this.value,i)),this._events.next(new Gr(this.status,i)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._updateAncestors(J(D({},n),{skipPristineCheck:e}),this),this._onDisabledChange.forEach(r=>r(!0))}enable(n={}){let e=this._parentMarkedDirty(n.onlySelf);this.status=bs,this._forEachChild(i=>{i.enable(J(D({},n),{onlySelf:!0}))}),this.updateValueAndValidity({onlySelf:!0,emitEvent:n.emitEvent}),this._updateAncestors(J(D({},n),{skipPristineCheck:e}),this),this._onDisabledChange.forEach(i=>i(!1))}_updateAncestors(n,e){n.onlySelf||(this._parent?.updateValueAndValidity(n),n.skipPristineCheck||this._parent?._updatePristine({},e),this._parent?._updateTouched({},e))}setParent(n){this._parent=n}getRawValue(){return this.value}updateValueAndValidity(n={}){if(this._setInitialStatus(),this._updateValue(),this.enabled){let i=this._cancelExistingSubscription();this.errors=this._runValidator(),this.status=this._calculateStatus(),(this.status===bs||this.status===$r)&&this._runAsyncValidator(i,n.emitEvent)}let e=n.sourceControl??this;n.emitEvent!==!1&&(this._events.next(new Ec(this.value,e)),this._events.next(new Gr(this.status,e)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),n.onlySelf||this._parent?.updateValueAndValidity(J(D({},n),{sourceControl:e}))}_updateTreeValidity(n={emitEvent:!0}){this._forEachChild(e=>e._updateTreeValidity(n)),this.updateValueAndValidity({onlySelf:!0,emitEvent:n.emitEvent})}_setInitialStatus(){this.status=this._allControlsDisabled()?Ds:bs}_runValidator(){return this.validator?this.validator(this):null}_runAsyncValidator(n,e){if(this.asyncValidator){this.status=$r,this._hasOwnPendingAsyncValidator={emitEvent:e!==!1,shouldHaveEmitted:n!==!1};let i=Ab(this.asyncValidator(this));this._asyncValidationSubscription=i.subscribe(r=>{this._hasOwnPendingAsyncValidator=null,this.setErrors(r,{emitEvent:e,shouldHaveEmitted:n})})}}_cancelExistingSubscription(){if(this._asyncValidationSubscription){this._asyncValidationSubscription.unsubscribe();let n=(this._hasOwnPendingAsyncValidator?.emitEvent||this._hasOwnPendingAsyncValidator?.shouldHaveEmitted)??!1;return this._hasOwnPendingAsyncValidator=null,n}return!1}setErrors(n,e={}){this.errors=n,this._updateControlsErrors(e.emitEvent!==!1,this,e.shouldHaveEmitted)}get(n){let e=n;return e==null||(Array.isArray(e)||(e=e.split(".")),e.length===0)?null:e.reduce((i,r)=>i&&i._find(r),this)}getError(n,e){let i=e?this.get(e):this;return i?.errors?i.errors[n]:null}hasError(n,e){return!!this.getError(n,e)}get root(){let n=this;for(;n._parent;)n=n._parent;return n}_updateControlsErrors(n,e,i){this.status=this._calculateStatus(),n&&this.statusChanges.emit(this.status),(n||i)&&this._events.next(new Gr(this.status,e)),this._parent&&this._parent._updateControlsErrors(n,e,i)}_initObservables(){this.valueChanges=new le,this.statusChanges=new le}_calculateStatus(){return this._allControlsDisabled()?Ds:this.errors?vc:this._hasOwnPendingAsyncValidator||this._anyControlsHaveStatus($r)?$r:this._anyControlsHaveStatus(vc)?vc:bs}_anyControlsHaveStatus(n){return this._anyControls(e=>e.status===n)}_anyControlsDirty(){return this._anyControls(n=>n.dirty)}_anyControlsTouched(){return this._anyControls(n=>n.touched)}_updatePristine(n,e){let i=!this._anyControlsDirty(),r=this.pristine!==i;this.pristine=i,n.onlySelf||this._parent?._updatePristine(n,e),r&&this._events.next(new Es(this.pristine,e))}_updateTouched(n={},e){this.touched=this._anyControlsTouched(),this._events.next(new ws(this.touched,e)),n.onlySelf||this._parent?._updateTouched(n,e)}_onDisabledChange=[];_registerOnCollectionChange(n){this._onCollectionChange=n}_setUpdateStrategy(n){Tc(n)&&n.updateOn!=null&&(this._updateOn=n.updateOn)}_parentMarkedDirty(n){return!n&&!!this._parent?.dirty&&!this._parent._anyControlsDirty()}_find(n){return null}_assignValidators(n){this._rawValidators=Array.isArray(n)?n.slice():n,this._composedValidatorFn=qS(this._rawValidators)}_assignAsyncValidators(n){this._rawAsyncValidators=Array.isArray(n)?n.slice():n,this._composedAsyncValidatorFn=YS(this._rawAsyncValidators)}},qr=class extends Wr{constructor(n,e,i){super(fh(e),ph(i,e)),this.controls=n,this._initObservables(),this._setUpdateStrategy(e),this._setUpControls(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator})}controls;registerControl(n,e){return this.controls[n]?this.controls[n]:(this.controls[n]=e,e.setParent(this),e._registerOnCollectionChange(this._onCollectionChange),e)}addControl(n,e,i={}){this.registerControl(n,e),this.updateValueAndValidity({emitEvent:i.emitEvent}),this._onCollectionChange()}removeControl(n,e={}){this.controls[n]&&this.controls[n]._registerOnCollectionChange(()=>{}),delete this.controls[n],this.updateValueAndValidity({emitEvent:e.emitEvent}),this._onCollectionChange()}setControl(n,e,i={}){this.controls[n]&&this.controls[n]._registerOnCollectionChange(()=>{}),delete this.controls[n],e&&this.registerControl(n,e),this.updateValueAndValidity({emitEvent:i.emitEvent}),this._onCollectionChange()}contains(n){return this.controls.hasOwnProperty(n)&&this.controls[n].enabled}setValue(n,e={}){Hb(this,!0,n),Object.keys(n).forEach(i=>{jb(this,!0,i),this.controls[i].setValue(n[i],{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e)}patchValue(n,e={}){n!=null&&(Object.keys(n).forEach(i=>{let r=this.controls[i];r&&r.patchValue(n[i],{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e))}reset(n={},e={}){this._forEachChild((i,r)=>{i.reset(n?n[r]:null,J(D({},e),{onlySelf:!0}))}),this._updatePristine(e,this),this._updateTouched(e,this),this.updateValueAndValidity(e),e?.emitEvent!==!1&&this._events.next(new xs(this))}getRawValue(){return this._reduceChildren({},(n,e,i)=>(n[i]=e.getRawValue(),n))}_syncPendingControls(){let n=this._reduceChildren(!1,(e,i)=>i._syncPendingControls()?!0:e);return n&&this.updateValueAndValidity({onlySelf:!0}),n}_forEachChild(n){Object.keys(this.controls).forEach(e=>{let i=this.controls[e];i&&n(i,e)})}_setUpControls(){this._forEachChild(n=>{n.setParent(this),n._registerOnCollectionChange(this._onCollectionChange)})}_updateValue(){this.value=this._reduceValue()}_anyControls(n){for(let[e,i]of Object.entries(this.controls))if(this.contains(e)&&n(i))return!0;return!1}_reduceValue(){let n={};return this._reduceChildren(n,(e,i,r)=>((i.enabled||this.disabled)&&(e[r]=i.value),e))}_reduceChildren(n,e){let i=n;return this._forEachChild((r,o)=>{i=e(i,r,o)}),i}_allControlsDisabled(){for(let n of Object.keys(this.controls))if(this.controls[n].enabled)return!1;return Object.keys(this.controls).length>0||this.disabled}_find(n){return this.controls.hasOwnProperty(n)?this.controls[n]:null}};var ih=class extends qr{};var hh=new y("",{factory:()=>mh}),mh="always";function ZS(t,n){return[...n.path,t]}function rh(t,n,e=mh){gh(t,n),n.valueAccessor.writeValue(t.value),(t.disabled||e==="always")&&n.valueAccessor.setDisabledState?.(t.disabled),XS(t,n),JS(t,n),KS(t,n),QS(t,n)}function Eb(t,n,e=!0){let i=()=>{};n?.valueAccessor?.registerOnChange(i),n?.valueAccessor?.registerOnTouched(i),Ic(t,n),t&&(n._invokeOnDestroyCallbacks(),t._registerOnCollectionChange(()=>{}))}function xc(t,n){t.forEach(e=>{e.registerOnValidatorChange&&e.registerOnValidatorChange(n)})}function QS(t,n){if(n.valueAccessor.setDisabledState){let e=i=>{n.valueAccessor.setDisabledState(i)};t.registerOnDisabledChange(e),n._registerOnDestroy(()=>{t._unregisterOnDisabledChange(e)})}}function gh(t,n){let e=Pb(t);n.validator!==null?t.setValidators(bb(e,n.validator)):typeof e=="function"&&t.setValidators([e]);let i=Lb(t);n.asyncValidator!==null?t.setAsyncValidators(bb(i,n.asyncValidator)):typeof i=="function"&&t.setAsyncValidators([i]);let r=()=>t.updateValueAndValidity();xc(n._rawValidators,r),xc(n._rawAsyncValidators,r)}function Ic(t,n){let e=!1;if(t!==null){if(n.validator!==null){let r=Pb(t);if(Array.isArray(r)&&r.length>0){let o=r.filter(s=>s!==n.validator);o.length!==r.length&&(e=!0,t.setValidators(o))}}if(n.asyncValidator!==null){let r=Lb(t);if(Array.isArray(r)&&r.length>0){let o=r.filter(s=>s!==n.asyncValidator);o.length!==r.length&&(e=!0,t.setAsyncValidators(o))}}}let i=()=>{};return xc(n._rawValidators,i),xc(n._rawAsyncValidators,i),e}function XS(t,n){n.valueAccessor.registerOnChange(e=>{t._pendingValue=e,t._pendingChange=!0,t._pendingDirty=!0,t.updateOn==="change"&&Ub(t,n)})}function KS(t,n){n.valueAccessor.registerOnTouched(()=>{t._pendingTouched=!0,t.updateOn==="blur"&&t._pendingChange&&Ub(t,n),t.updateOn!=="submit"&&t.markAsTouched()})}function Ub(t,n){t._pendingDirty&&t.markAsDirty(),t.setValue(t._pendingValue,{emitModelToViewChange:!1}),n.viewToModelUpdate(t._pendingValue),t._pendingChange=!1}function JS(t,n){let e=(i,r)=>{n.valueAccessor.writeValue(i),r&&n.viewToModelUpdate(i)};t.registerOnChange(e),n._registerOnDestroy(()=>{t._unregisterOnChange(e)})}function zb(t,n){t==null,gh(t,n)}function eT(t,n){return Ic(t,n)}function tT(t,n){if(!t.hasOwnProperty("model"))return!1;let e=t.model;return e.isFirstChange()?!0:!Object.is(n,e.currentValue)}function nT(t){return Object.getPrototypeOf(t.constructor)===NS}function $b(t,n){t._syncPendingControls(),n.forEach(e=>{let i=e.control;i.updateOn==="submit"&&i._pendingChange&&(e.viewToModelUpdate(i._pendingValue),i._pendingChange=!1)})}function iT(t,n){if(!n)return null;Array.isArray(n);let e,i,r;return n.forEach(o=>{o.constructor===Sc?e=o:nT(o)?i=o:r=o}),r||i||e||null}function rT(t,n){let e=t.indexOf(n);e>-1&&t.splice(e,1)}var oT={provide:Gn,useExisting:ht(()=>vh)},Cs=Promise.resolve(),vh=(()=>{class t extends Gn{callSetDisabledState;get submitted(){return Et(this.submittedReactive)}_submitted=ke(()=>this.submittedReactive());submittedReactive=L(!1);_directives=new Set;form;ngSubmit=new le;options;constructor(e,i,r){super(),this.callSetDisabledState=r,this.form=new qr({},dh(e),uh(i))}ngAfterViewInit(){this._setUpdateStrategy()}get formDirective(){return this}get control(){return this.form}get path(){return[]}get controls(){return this.form.controls}addControl(e){Cs.then(()=>{let i=this._findContainer(e.path);e.control=i.registerControl(e.name,e.control),rh(e.control,e,this.callSetDisabledState),e.control.updateValueAndValidity({emitEvent:!1}),this._directives.add(e)})}getControl(e){return this.form.get(e.path)}removeControl(e){Cs.then(()=>{this._findContainer(e.path)?.removeControl(e.name),this._directives.delete(e)})}addFormGroup(e){Cs.then(()=>{let i=this._findContainer(e.path),r=new qr({});zb(r,e),i.registerControl(e.name,r),r.updateValueAndValidity({emitEvent:!1})})}removeFormGroup(e){Cs.then(()=>{this._findContainer(e.path)?.removeControl?.(e.name)})}getFormGroup(e){return this.form.get(e.path)}updateModel(e,i){Cs.then(()=>{this.form.get(e.path).setValue(i)})}setValue(e){this.control.setValue(e)}onSubmit(e){return this.submittedReactive.set(!0),$b(this.form,this._directives),this.ngSubmit.emit(e),this.form._events.next(new wc(this.control)),e?.target?.method==="dialog"}onReset(){this.resetForm()}resetForm(e=void 0){this.form.reset(e),this.submittedReactive.set(!1)}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.form._updateOn=this.options.updateOn)}_findContainer(e){return e.pop(),e.length?this.form.get(e):this.form}static \u0275fac=function(i){return new(i||t)(W(lh,10),W(ch,10),W(hh,8))};static \u0275dir=F({type:t,selectors:[["form",3,"ngNoForm","",3,"formGroup","",3,"formArray",""],["ng-form"],["","ngForm",""]],hostBindings:function(i,r){i&1&&Q("submit",function(s){return r.onSubmit(s)})("reset",function(){return r.onReset()})},inputs:{options:[0,"ngFormOptions","options"]},outputs:{ngSubmit:"ngSubmit"},exportAs:["ngForm"],standalone:!1,features:[Xe([oT]),pe]})}return t})();function wb(t,n){let e=t.indexOf(n);e>-1&&t.splice(e,1)}function xb(t){return typeof t=="object"&&t!==null&&Object.keys(t).length===2&&"value"in t&&"disabled"in t}var yc=class extends Wr{defaultValue=null;_onChange=[];_pendingValue;_pendingChange=!1;constructor(n=null,e,i){super(fh(e),ph(i,e)),this._applyFormState(n),this._setUpdateStrategy(e),this._initObservables(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator}),Tc(e)&&(e.nonNullable||e.initialValueIsDefault)&&(xb(n)?this.defaultValue=n.value:this.defaultValue=n)}setValue(n,e={}){this.value=this._pendingValue=n,this._onChange.length&&e.emitModelToViewChange!==!1&&this._onChange.forEach(i=>i(this.value,e.emitViewToModelChange!==!1)),this.updateValueAndValidity(e)}patchValue(n,e={}){this.setValue(n,e)}reset(n=this.defaultValue,e={}){this._applyFormState(n),this.markAsPristine(e),this.markAsUntouched(e),this.setValue(this.value,e),e.overwriteDefaultValue&&(this.defaultValue=this.value),this._pendingChange=!1,e?.emitEvent!==!1&&this._events.next(new xs(this))}_updateValue(){}_anyControls(n){return!1}_allControlsDisabled(){return this.disabled}registerOnChange(n){this._onChange.push(n)}_unregisterOnChange(n){wb(this._onChange,n)}registerOnDisabledChange(n){this._onDisabledChange.push(n)}_unregisterOnDisabledChange(n){wb(this._onDisabledChange,n)}_forEachChild(n){}_syncPendingControls(){return this.updateOn==="submit"&&(this._pendingDirty&&this.markAsDirty(),this._pendingTouched&&this.markAsTouched(),this._pendingChange)?(this.setValue(this._pendingValue,{onlySelf:!0,emitModelToViewChange:!1}),!0):!1}_applyFormState(n){xb(n)?(this.value=this._pendingValue=n.value,n.disabled?this.disable({onlySelf:!0,emitEvent:!1}):this.enable({onlySelf:!0,emitEvent:!1})):this.value=this._pendingValue=n}};var sT=t=>t instanceof yc;var Gb=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=F({type:t,selectors:[["form",3,"ngNoForm","",3,"ngNativeValidate",""]],hostAttrs:["novalidate",""],standalone:!1})}return t})();var oh=class extends Wr{constructor(n,e,i){super(fh(e),ph(i,e)),this.controls=n,this._initObservables(),this._setUpdateStrategy(e),this._setUpControls(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator})}controls;at(n){return this.controls[this._adjustIndex(n)]}push(n,e={}){Array.isArray(n)?n.forEach(i=>{this.controls.push(i),this._registerControl(i)}):(this.controls.push(n),this._registerControl(n)),this.updateValueAndValidity({emitEvent:e.emitEvent}),this._onCollectionChange()}insert(n,e,i={}){this.controls.splice(n,0,e),this._registerControl(e),this.updateValueAndValidity({emitEvent:i.emitEvent})}removeAt(n,e={}){let i=this._adjustIndex(n);i<0&&(i=0),this.controls[i]&&this.controls[i]._registerOnCollectionChange(()=>{}),this.controls.splice(i,1),this.updateValueAndValidity({emitEvent:e.emitEvent})}setControl(n,e,i={}){let r=this._adjustIndex(n);r<0&&(r=0),this.controls[r]&&this.controls[r]._registerOnCollectionChange(()=>{}),this.controls.splice(r,1),e&&(this.controls.splice(r,0,e),this._registerControl(e)),this.updateValueAndValidity({emitEvent:i.emitEvent}),this._onCollectionChange()}get length(){return this.controls.length}setValue(n,e={}){Hb(this,!1,n),n.forEach((i,r)=>{jb(this,!1,r),this.at(r).setValue(i,{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e)}patchValue(n,e={}){n!=null&&(n.forEach((i,r)=>{this.at(r)&&this.at(r).patchValue(i,{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e))}reset(n=[],e={}){this._forEachChild((i,r)=>{i.reset(n[r],J(D({},e),{onlySelf:!0}))}),this._updatePristine(e,this),this._updateTouched(e,this),this.updateValueAndValidity(e),e?.emitEvent!==!1&&this._events.next(new xs(this))}getRawValue(){return this.controls.map(n=>n.getRawValue())}clear(n={}){this.controls.length<1||(this._forEachChild(e=>e._registerOnCollectionChange(()=>{})),this.controls.splice(0),this.updateValueAndValidity({emitEvent:n.emitEvent}))}_adjustIndex(n){return n<0?n+this.length:n}_syncPendingControls(){let n=this.controls.reduce((e,i)=>i._syncPendingControls()?!0:e,!1);return n&&this.updateValueAndValidity({onlySelf:!0}),n}_forEachChild(n){this.controls.forEach((e,i)=>{n(e,i)})}_updateValue(){this.value=this.controls.filter(n=>n.enabled||this.disabled).map(n=>n.value)}_anyControls(n){return this.controls.some(e=>e.enabled&&n(e))}_setUpControls(){this._forEachChild(n=>this._registerControl(n))}_allControlsDisabled(){for(let n of this.controls)if(n.enabled)return!1;return this.controls.length>0||this.disabled}_registerControl(n){n.setParent(this),n._registerOnCollectionChange(this._onCollectionChange)}_find(n){return this.at(n)??null}};var aT=(()=>{class t extends Gn{callSetDisabledState;get submitted(){return Et(this._submittedReactive)}set submitted(e){this._submittedReactive.set(e)}_submitted=ke(()=>this._submittedReactive());_submittedReactive=L(!1);_oldForm;_onCollectionChange=()=>this._updateDomValue();directives=[];constructor(e,i,r){super(),this.callSetDisabledState=r,this._setValidators(e),this._setAsyncValidators(i)}ngOnChanges(e){this.onChanges(e)}ngOnDestroy(){this.onDestroy()}onChanges(e){this._checkFormPresent(),e.hasOwnProperty("form")&&(this._updateValidators(),this._updateDomValue(),this._updateRegistrations(),this._oldForm=this.form)}onDestroy(){this.form&&(Ic(this.form,this),this.form._onCollectionChange===this._onCollectionChange&&this.form._registerOnCollectionChange(()=>{}))}get formDirective(){return this}get path(){return[]}addControl(e){let i=this.form.get(e.path);return rh(i,e,this.callSetDisabledState),i.updateValueAndValidity({emitEvent:!1}),this.directives.push(e),i}getControl(e){return this.form.get(e.path)}removeControl(e){Eb(e.control||null,e,!1),rT(this.directives,e)}addFormGroup(e){this._setUpFormContainer(e)}removeFormGroup(e){this._cleanUpFormContainer(e)}getFormGroup(e){return this.form.get(e.path)}getFormArray(e){return this.form.get(e.path)}addFormArray(e){this._setUpFormContainer(e)}removeFormArray(e){this._cleanUpFormContainer(e)}updateModel(e,i){this.form.get(e.path).setValue(i)}onReset(){this.resetForm()}resetForm(e=void 0,i={}){this.form.reset(e,i),this._submittedReactive.set(!1)}onSubmit(e){return this.submitted=!0,$b(this.form,this.directives),this.ngSubmit.emit(e),this.form._events.next(new wc(this.control)),e?.target?.method==="dialog"}_updateDomValue(){this.directives.forEach(e=>{let i=e.control,r=this.form.get(e.path);i!==r&&(Eb(i||null,e),sT(r)&&(rh(r,e,this.callSetDisabledState),e.control=r))}),this.form._updateTreeValidity({emitEvent:!1})}_setUpFormContainer(e){let i=this.form.get(e.path);zb(i,e),i.updateValueAndValidity({emitEvent:!1})}_cleanUpFormContainer(e){let i=this.form?.get(e.path);i&&eT(i,e)&&i.updateValueAndValidity({emitEvent:!1})}_updateRegistrations(){this.form._registerOnCollectionChange(this._onCollectionChange),this._oldForm?._registerOnCollectionChange(()=>{})}_updateValidators(){gh(this.form,this),this._oldForm&&Ic(this._oldForm,this)}_checkFormPresent(){this.form}static \u0275fac=function(i){return new(i||t)(W(lh,10),W(ch,10),W(hh,8))};static \u0275dir=F({type:t,features:[pe,_t]})}return t})();var Wb=new y("");var lT={provide:qi,useExisting:ht(()=>yh)},yh=(()=>{class t extends qi{_ngModelWarningConfig;_added=!1;viewModel;control;name=null;set isDisabled(e){}model;update=new le;static _ngModelWarningSentOnce=!1;_ngModelWarningSent=!1;constructor(e,i,r,o,s){super(),this._ngModelWarningConfig=s,this._parent=e,this._setValidators(i),this._setAsyncValidators(r),this.valueAccessor=iT(this,o)}ngOnChanges(e){this._added||this._setUpControl(),tT(e,this.viewModel)&&(this.viewModel=this.model,this.formDirective.updateModel(this,this.model))}ngOnDestroy(){this.formDirective?.removeControl(this)}viewToModelUpdate(e){this.viewModel=e,this.update.emit(e)}get path(){return ZS(this.name==null?this.name:this.name.toString(),this._parent)}get formDirective(){return this._parent?this._parent.formDirective:null}_setUpControl(){this.control=this.formDirective.addControl(this),this._added=!0}static \u0275fac=function(i){return new(i||t)(W(Gn,13),W(lh,10),W(ch,10),W(Mc,10),W(Wb,8))};static \u0275dir=F({type:t,selectors:[["","formControlName",""]],inputs:{name:[0,"formControlName","name"],isDisabled:[0,"disabled","isDisabled"],model:[0,"ngModel","model"]},outputs:{update:"ngModelChange"},standalone:!1,features:[Xe([lT]),pe,_t]})}return t})();var cT={provide:Gn,useExisting:ht(()=>Is)},Is=(()=>{class t extends aT{form=null;ngSubmit=new le;get control(){return this.form}static \u0275fac=(()=>{let e;return function(r){return(e||(e=bt(t)))(r||t)}})();static \u0275dir=F({type:t,selectors:[["","formGroup",""]],hostBindings:function(i,r){i&1&&Q("submit",function(s){return r.onSubmit(s)})("reset",function(){return r.onReset()})},inputs:{form:[0,"formGroup","form"]},outputs:{ngSubmit:"ngSubmit"},exportAs:["ngForm"],standalone:!1,features:[Xe([cT]),pe]})}return t})();var dT=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=q({type:t});static \u0275inj=z({})}return t})();function Ib(t){return!!t&&(t.asyncValidators!==void 0||t.validators!==void 0||t.updateOn!==void 0)}var qb=(()=>{class t{useNonNullable=!1;get nonNullable(){let e=new t;return e.useNonNullable=!0,e}group(e,i=null){let r=this._reduceControls(e),o={};return Ib(i)?o=i:i!==null&&(o.validators=i.validator,o.asyncValidators=i.asyncValidator),new qr(r,o)}record(e,i=null){let r=this._reduceControls(e);return new ih(r,i)}control(e,i,r){let o={};return this.useNonNullable?(Ib(i)?o=i:(o.validators=i,o.asyncValidators=r),new yc(e,J(D({},o),{nonNullable:!0}))):new yc(e,i,r)}array(e,i,r){let o=e.map(s=>this._createControl(s));return new oh(o,i,r)}_reduceControls(e){let i={};return Object.keys(e).forEach(r=>{i[r]=this._createControl(e[r])}),i}_createControl(e){if(e instanceof yc)return e;if(e instanceof Wr)return e;if(Array.isArray(e)){let i=e[0],r=e.length>1?e[1]:null,o=e.length>2?e[2]:null;return this.control(i,r,o)}else return this.control(e)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=_({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Yb=(()=>{class t{static withConfig(e){return{ngModule:t,providers:[{provide:Wb,useValue:e.warnOnNgModelWithFormControl??"always"},{provide:hh,useValue:e.callSetDisabledState??mh}]}}static \u0275fac=function(i){return new(i||t)};static \u0275mod=q({type:t});static \u0275inj=z({imports:[dT]})}return t})();var Zb=(()=>{class t{_animationsDisabled=Ie();state="unchecked";disabled=!1;appearance="full";constructor(){}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=H({type:t,selectors:[["mat-pseudo-checkbox"]],hostAttrs:[1,"mat-pseudo-checkbox"],hostVars:12,hostBindings:function(i,r){i&2&&B("mat-pseudo-checkbox-indeterminate",r.state==="indeterminate")("mat-pseudo-checkbox-checked",r.state==="checked")("mat-pseudo-checkbox-disabled",r.disabled)("mat-pseudo-checkbox-minimal",r.appearance==="minimal")("mat-pseudo-checkbox-full",r.appearance==="full")("_mat-animation-noopable",r._animationsDisabled)},inputs:{state:"state",disabled:"disabled",appearance:"appearance"},decls:0,vars:0,template:function(i,r){},styles:[`.mat-pseudo-checkbox {
  border-radius: 2px;
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  box-sizing: border-box;
  position: relative;
  flex-shrink: 0;
  transition: border-color 90ms cubic-bezier(0, 0, 0.2, 0.1), background-color 90ms cubic-bezier(0, 0, 0.2, 0.1);
}
.mat-pseudo-checkbox::after {
  position: absolute;
  opacity: 0;
  content: "";
  border-bottom: 2px solid currentColor;
  transition: opacity 90ms cubic-bezier(0, 0, 0.2, 0.1);
}
.mat-pseudo-checkbox._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-pseudo-checkbox._mat-animation-noopable::after {
  transition: none;
}

.mat-pseudo-checkbox-disabled {
  cursor: default;
}

.mat-pseudo-checkbox-indeterminate::after {
  left: 1px;
  opacity: 1;
  border-radius: 2px;
}

.mat-pseudo-checkbox-checked::after {
  left: 1px;
  border-left: 2px solid currentColor;
  transform: rotate(-45deg);
  opacity: 1;
  box-sizing: content-box;
}

.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked::after, .mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate::after {
  color: var(--mat-pseudo-checkbox-minimal-selected-checkmark-color, var(--mat-sys-primary));
}
.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled::after, .mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled::after {
  color: var(--mat-pseudo-checkbox-minimal-disabled-selected-checkmark-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}

.mat-pseudo-checkbox-full {
  border-color: var(--mat-pseudo-checkbox-full-unselected-icon-color, var(--mat-sys-on-surface-variant));
  border-width: 2px;
  border-style: solid;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-disabled {
  border-color: var(--mat-pseudo-checkbox-full-disabled-unselected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate {
  background-color: var(--mat-pseudo-checkbox-full-selected-icon-color, var(--mat-sys-primary));
  border-color: transparent;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked::after, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate::after {
  color: var(--mat-pseudo-checkbox-full-selected-checkmark-color, var(--mat-sys-on-primary));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled {
  background-color: var(--mat-pseudo-checkbox-full-disabled-selected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled::after, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled::after {
  color: var(--mat-pseudo-checkbox-full-disabled-selected-checkmark-color, var(--mat-sys-surface));
}

.mat-pseudo-checkbox {
  width: 18px;
  height: 18px;
}

.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked::after {
  width: 14px;
  height: 6px;
  transform-origin: center;
  top: -4.2426406871px;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate::after {
  top: 8px;
  width: 16px;
}

.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked::after {
  width: 10px;
  height: 4px;
  transform-origin: center;
  top: -2.8284271247px;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate::after {
  top: 6px;
  width: 12px;
}
`],encapsulation:2,changeDetection:0})}return t})();var yT=["button"],_T=["*"];function bT(t,n){if(t&1&&(g(0,"div",2),ie(1,"mat-pseudo-checkbox",6),v()),t&2){let e=T();b(),ne("disabled",e.disabled)}}var Qb=new y("MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS",{providedIn:"root",factory:()=>({hideSingleSelectionIndicator:!1,hideMultipleSelectionIndicator:!1,disabledInteractive:!1})}),Xb=new y("MatButtonToggleGroup"),DT={provide:Mc,useExisting:ht(()=>_h),multi:!0},Ac=class{source;value;constructor(n,e){this.source=n,this.value=e}},_h=(()=>{class t{_changeDetector=u(ot);_dir=u(at,{optional:!0});_multiple=!1;_disabled=!1;_disabledInteractive=!1;_selectionModel;_rawValue;_controlValueAccessorChangeFn=()=>{};_onTouched=()=>{};_buttonToggles;appearance;get name(){return this._name}set name(e){this._name=e,this._markButtonsForCheck()}_name=u(Re).getId("mat-button-toggle-group-");vertical=!1;get value(){let e=this._selectionModel?this._selectionModel.selected:[];return this.multiple?e.map(i=>i.value):e[0]?e[0].value:void 0}set value(e){this._setSelectionByValue(e),this.valueChange.emit(this.value)}valueChange=new le;get selected(){let e=this._selectionModel?this._selectionModel.selected:[];return this.multiple?e:e[0]||null}get multiple(){return this._multiple}set multiple(e){this._multiple=e,this._markButtonsForCheck()}get disabled(){return this._disabled}set disabled(e){this._disabled=e,this._markButtonsForCheck()}get disabledInteractive(){return this._disabledInteractive}set disabledInteractive(e){this._disabledInteractive=e,this._markButtonsForCheck()}get dir(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}change=new le;get hideSingleSelectionIndicator(){return this._hideSingleSelectionIndicator}set hideSingleSelectionIndicator(e){this._hideSingleSelectionIndicator=e,this._markButtonsForCheck()}_hideSingleSelectionIndicator;get hideMultipleSelectionIndicator(){return this._hideMultipleSelectionIndicator}set hideMultipleSelectionIndicator(e){this._hideMultipleSelectionIndicator=e,this._markButtonsForCheck()}_hideMultipleSelectionIndicator;constructor(){let e=u(Qb,{optional:!0});this.appearance=e&&e.appearance?e.appearance:"standard",this._hideSingleSelectionIndicator=e?.hideSingleSelectionIndicator??!1,this._hideMultipleSelectionIndicator=e?.hideMultipleSelectionIndicator??!1}ngOnInit(){this._selectionModel=new _s(this.multiple,void 0,!1)}ngAfterContentInit(){this._selectionModel.select(...this._buttonToggles.filter(e=>e.checked)),this.multiple||this._initializeTabIndex()}writeValue(e){this.value=e,this._changeDetector.markForCheck()}registerOnChange(e){this._controlValueAccessorChangeFn=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this.disabled=e}_keydown(e){if(this.multiple||this.disabled||$n(e))return;let r=e.target.id,o=this._buttonToggles.toArray().findIndex(a=>a.buttonId===r),s=null;switch(e.keyCode){case 32:case 13:s=this._buttonToggles.get(o)||null;break;case 38:s=this._getNextButton(o,-1);break;case 37:s=this._getNextButton(o,this.dir==="ltr"?-1:1);break;case 40:s=this._getNextButton(o,1);break;case 39:s=this._getNextButton(o,this.dir==="ltr"?1:-1);break;default:return}s&&(e.preventDefault(),s._onButtonClick(),s.focus())}_emitChangeEvent(e){let i=new Ac(e,this.value);this._rawValue=i.value,this._controlValueAccessorChangeFn(i.value),this.change.emit(i)}_syncButtonToggle(e,i,r=!1,o=!1){!this.multiple&&this.selected&&!e.checked&&(this.selected.checked=!1),this._selectionModel?i?this._selectionModel.select(e):this._selectionModel.deselect(e):o=!0,o?Promise.resolve().then(()=>this._updateModelValue(e,r)):this._updateModelValue(e,r)}_isSelected(e){return this._selectionModel&&this._selectionModel.isSelected(e)}_isPrechecked(e){return typeof this._rawValue>"u"?!1:this.multiple&&Array.isArray(this._rawValue)?this._rawValue.some(i=>e.value!=null&&i===e.value):e.value===this._rawValue}_initializeTabIndex(){if(this._buttonToggles.forEach(e=>{e.tabIndex=-1}),this.selected)this.selected.tabIndex=0;else for(let e=0;e<this._buttonToggles.length;e++){let i=this._buttonToggles.get(e);if(!i.disabled){i.tabIndex=0;break}}}_getNextButton(e,i){let r=this._buttonToggles;for(let o=1;o<=r.length;o++){let s=(e+i*o+r.length)%r.length,a=r.get(s);if(a&&!a.disabled)return a}return null}_setSelectionByValue(e){if(this._rawValue=e,!this._buttonToggles)return;let i=this._buttonToggles.toArray();if(this.multiple&&e?(Array.isArray(e),this._clearSelection(),e.forEach(r=>this._selectValue(r,i))):(this._clearSelection(),this._selectValue(e,i)),!this.multiple&&i.every(r=>r.tabIndex===-1)){for(let r of i)if(!r.disabled){r.tabIndex=0;break}}}_clearSelection(){this._selectionModel.clear(),this._buttonToggles.forEach(e=>{e.checked=!1,this.multiple||(e.tabIndex=-1)})}_selectValue(e,i){for(let r of i)if(r.value===e){r.checked=!0,this._selectionModel.select(r),this.multiple||(r.tabIndex=0);break}}_updateModelValue(e,i){i&&this._emitChangeEvent(e),this.valueChange.emit(this.value)}_markButtonsForCheck(){this._buttonToggles?.forEach(e=>e._markForCheck())}static \u0275fac=function(i){return new(i||t)};static \u0275dir=F({type:t,selectors:[["mat-button-toggle-group"]],contentQueries:function(i,r,o){if(i&1&&kr(o,kc,5),i&2){let s;se(s=ae())&&(r._buttonToggles=s)}},hostAttrs:[1,"mat-button-toggle-group"],hostVars:6,hostBindings:function(i,r){i&1&&Q("keydown",function(s){return r._keydown(s)}),i&2&&(K("role",r.multiple?"group":"radiogroup")("aria-disabled",r.disabled),B("mat-button-toggle-vertical",r.vertical)("mat-button-toggle-group-appearance-standard",r.appearance==="standard"))},inputs:{appearance:"appearance",name:"name",vertical:[2,"vertical","vertical",he],value:"value",multiple:[2,"multiple","multiple",he],disabled:[2,"disabled","disabled",he],disabledInteractive:[2,"disabledInteractive","disabledInteractive",he],hideSingleSelectionIndicator:[2,"hideSingleSelectionIndicator","hideSingleSelectionIndicator",he],hideMultipleSelectionIndicator:[2,"hideMultipleSelectionIndicator","hideMultipleSelectionIndicator",he]},outputs:{valueChange:"valueChange",change:"change"},exportAs:["matButtonToggleGroup"],features:[Xe([DT,{provide:Xb,useExisting:t}])]})}return t})(),kc=(()=>{class t{_changeDetectorRef=u(ot);_elementRef=u(V);_focusMonitor=u(vn);_idGenerator=u(Re);_animationDisabled=Ie();_checked=!1;ariaLabel;ariaLabelledby=null;_buttonElement;buttonToggleGroup;get buttonId(){return`${this.id}-button`}id;name;value;get tabIndex(){return this._tabIndex()}set tabIndex(e){this._tabIndex.set(e)}_tabIndex;disableRipple=!1;get appearance(){return this.buttonToggleGroup?this.buttonToggleGroup.appearance:this._appearance}set appearance(e){this._appearance=e}_appearance;get checked(){return this.buttonToggleGroup?this.buttonToggleGroup._isSelected(this):this._checked}set checked(e){e!==this._checked&&(this._checked=e,this.buttonToggleGroup&&this.buttonToggleGroup._syncButtonToggle(this,this._checked),this._changeDetectorRef.markForCheck())}get disabled(){return this._disabled||this.buttonToggleGroup&&this.buttonToggleGroup.disabled}set disabled(e){this._disabled=e}_disabled=!1;get disabledInteractive(){return this._disabledInteractive||this.buttonToggleGroup!==null&&this.buttonToggleGroup.disabledInteractive}set disabledInteractive(e){this._disabledInteractive=e}_disabledInteractive;change=new le;constructor(){u(Ge).load(pc);let e=u(Xb,{optional:!0}),i=u(new Rr("tabindex"),{optional:!0})||"",r=u(Qb,{optional:!0});this._tabIndex=L(parseInt(i)||0),this.buttonToggleGroup=e,this._appearance=r&&r.appearance?r.appearance:"standard",this._disabledInteractive=r?.disabledInteractive??!1}ngOnInit(){let e=this.buttonToggleGroup;this.id=this.id||this._idGenerator.getId("mat-button-toggle-"),e&&(e._isPrechecked(this)?this.checked=!0:e._isSelected(this)!==this._checked&&e._syncButtonToggle(this,this._checked))}ngAfterViewInit(){this._animationDisabled||this._elementRef.nativeElement.classList.add("mat-button-toggle-animations-enabled"),this._focusMonitor.monitor(this._elementRef,!0)}ngOnDestroy(){let e=this.buttonToggleGroup;this._focusMonitor.stopMonitoring(this._elementRef),e&&e._isSelected(this)&&e._syncButtonToggle(this,!1,!1,!0)}focus(e){this._buttonElement.nativeElement.focus(e)}_onButtonClick(){if(this.disabled)return;let e=this.isSingleSelector()?!0:!this._checked;if(e!==this._checked&&(this._checked=e,this.buttonToggleGroup&&(this.buttonToggleGroup._syncButtonToggle(this,this._checked,!0),this.buttonToggleGroup._onTouched())),this.isSingleSelector()){let i=this.buttonToggleGroup._buttonToggles.find(r=>r.tabIndex===0);i&&(i.tabIndex=-1),this.tabIndex=0}this.change.emit(new Ac(this,this.value))}_markForCheck(){this._changeDetectorRef.markForCheck()}_getButtonName(){return this.isSingleSelector()?this.buttonToggleGroup.name:this.name||null}isSingleSelector(){return this.buttonToggleGroup&&!this.buttonToggleGroup.multiple}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=H({type:t,selectors:[["mat-button-toggle"]],viewQuery:function(i,r){if(i&1&&je(yT,5),i&2){let o;se(o=ae())&&(r._buttonElement=o.first)}},hostAttrs:["role","presentation",1,"mat-button-toggle"],hostVars:14,hostBindings:function(i,r){i&1&&Q("focus",function(){return r.focus()}),i&2&&(K("aria-label",null)("aria-labelledby",null)("id",r.id)("name",null),B("mat-button-toggle-standalone",!r.buttonToggleGroup)("mat-button-toggle-checked",r.checked)("mat-button-toggle-disabled",r.disabled)("mat-button-toggle-disabled-interactive",r.disabledInteractive)("mat-button-toggle-appearance-standard",r.appearance==="standard"))},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],id:"id",name:"name",value:"value",tabIndex:"tabIndex",disableRipple:[2,"disableRipple","disableRipple",he],appearance:"appearance",checked:[2,"checked","checked",he],disabled:[2,"disabled","disabled",he],disabledInteractive:[2,"disabledInteractive","disabledInteractive",he]},outputs:{change:"change"},exportAs:["matButtonToggle"],ngContentSelectors:_T,decls:7,vars:13,consts:[["button",""],["type","button",1,"mat-button-toggle-button","mat-focus-indicator",3,"click","id","disabled"],[1,"mat-button-toggle-checkbox-wrapper"],[1,"mat-button-toggle-label-content"],[1,"mat-button-toggle-focus-overlay"],["matRipple","",1,"mat-button-toggle-ripple",3,"matRippleTrigger","matRippleDisabled"],["state","checked","aria-hidden","true","appearance","minimal",3,"disabled"]],template:function(i,r){if(i&1&&(rt(),g(0,"button",1,0),Q("click",function(){return r._onButtonClick()}),$(2,bT,2,1,"div",2),g(3,"span",3),ge(4),v()(),ie(5,"span",4)(6,"span",5)),i&2){let o=Bn(1);ne("id",r.buttonId)("disabled",r.disabled&&!r.disabledInteractive||null),K("role",r.isSingleSelector()?"radio":"button")("tabindex",r.disabled&&!r.disabledInteractive?-1:r.tabIndex)("aria-pressed",r.isSingleSelector()?null:r.checked)("aria-checked",r.isSingleSelector()?r.checked:null)("name",r._getButtonName())("aria-label",r.ariaLabel)("aria-labelledby",r.ariaLabelledby)("aria-disabled",r.disabled&&r.disabledInteractive?"true":null),b(2),G(r.buttonToggleGroup&&(!r.buttonToggleGroup.multiple&&!r.buttonToggleGroup.hideSingleSelectionIndicator||r.buttonToggleGroup.multiple&&!r.buttonToggleGroup.hideMultipleSelectionIndicator)?2:-1),b(4),ne("matRippleTrigger",o)("matRippleDisabled",r.disableRipple||r.disabled)}},dependencies:[ub,Zb],styles:[`.mat-button-toggle-standalone,
.mat-button-toggle-group {
  position: relative;
  display: inline-flex;
  flex-direction: row;
  white-space: nowrap;
  overflow: hidden;
  -webkit-tap-highlight-color: transparent;
  border-radius: var(--mat-button-toggle-legacy-shape);
  transform: translateZ(0);
}
.mat-button-toggle-standalone:not([class*=mat-elevation-z]),
.mat-button-toggle-group:not([class*=mat-elevation-z]) {
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}
@media (forced-colors: active) {
  .mat-button-toggle-standalone,
  .mat-button-toggle-group {
    outline: solid 1px;
  }
}

.mat-button-toggle-standalone.mat-button-toggle-appearance-standard,
.mat-button-toggle-group-appearance-standard {
  border-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
  border: solid 1px var(--mat-button-toggle-divider-color, var(--mat-sys-outline));
}
.mat-button-toggle-standalone.mat-button-toggle-appearance-standard .mat-pseudo-checkbox,
.mat-button-toggle-group-appearance-standard .mat-pseudo-checkbox {
  --mat-pseudo-checkbox-minimal-selected-checkmark-color: var(--mat-button-toggle-selected-state-text-color, var(--mat-sys-on-secondary-container));
}
.mat-button-toggle-standalone.mat-button-toggle-appearance-standard:not([class*=mat-elevation-z]),
.mat-button-toggle-group-appearance-standard:not([class*=mat-elevation-z]) {
  box-shadow: none;
}
@media (forced-colors: active) {
  .mat-button-toggle-standalone.mat-button-toggle-appearance-standard,
  .mat-button-toggle-group-appearance-standard {
    outline: 0;
  }
}

.mat-button-toggle-vertical {
  flex-direction: column;
}
.mat-button-toggle-vertical .mat-button-toggle-label-content {
  display: block;
}

.mat-button-toggle {
  white-space: nowrap;
  position: relative;
  color: var(--mat-button-toggle-legacy-text-color);
  font-family: var(--mat-button-toggle-legacy-label-text-font);
  font-size: var(--mat-button-toggle-legacy-label-text-size);
  line-height: var(--mat-button-toggle-legacy-label-text-line-height);
  font-weight: var(--mat-button-toggle-legacy-label-text-weight);
  letter-spacing: var(--mat-button-toggle-legacy-label-text-tracking);
  --mat-pseudo-checkbox-minimal-selected-checkmark-color: var(--mat-button-toggle-legacy-selected-state-text-color);
}
.mat-button-toggle.cdk-keyboard-focused .mat-button-toggle-focus-overlay {
  opacity: var(--mat-button-toggle-legacy-focus-state-layer-opacity);
}
.mat-button-toggle .mat-icon svg {
  vertical-align: top;
}

.mat-button-toggle-checkbox-wrapper {
  display: inline-block;
  justify-content: flex-start;
  align-items: center;
  width: 0;
  height: 18px;
  line-height: 18px;
  overflow: hidden;
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translate3d(0, -50%, 0);
}
[dir=rtl] .mat-button-toggle-checkbox-wrapper {
  left: auto;
  right: 16px;
}
.mat-button-toggle-appearance-standard .mat-button-toggle-checkbox-wrapper {
  left: 12px;
}
[dir=rtl] .mat-button-toggle-appearance-standard .mat-button-toggle-checkbox-wrapper {
  left: auto;
  right: 12px;
}
.mat-button-toggle-checked .mat-button-toggle-checkbox-wrapper {
  width: 18px;
}
.mat-button-toggle-animations-enabled .mat-button-toggle-checkbox-wrapper {
  transition: width 150ms 45ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-button-toggle-vertical .mat-button-toggle-checkbox-wrapper {
  transition: none;
}

.mat-button-toggle-checked {
  color: var(--mat-button-toggle-legacy-selected-state-text-color);
  background-color: var(--mat-button-toggle-legacy-selected-state-background-color);
}

.mat-button-toggle-disabled {
  pointer-events: none;
  color: var(--mat-button-toggle-legacy-disabled-state-text-color);
  background-color: var(--mat-button-toggle-legacy-disabled-state-background-color);
  --mat-pseudo-checkbox-minimal-disabled-selected-checkmark-color: var(--mat-button-toggle-legacy-disabled-state-text-color);
}
.mat-button-toggle-disabled.mat-button-toggle-checked {
  background-color: var(--mat-button-toggle-legacy-disabled-selected-state-background-color);
}

.mat-button-toggle-disabled-interactive {
  pointer-events: auto;
}

.mat-button-toggle-appearance-standard {
  color: var(--mat-button-toggle-text-color, var(--mat-sys-on-surface));
  background-color: var(--mat-button-toggle-background-color, transparent);
  font-family: var(--mat-button-toggle-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-toggle-label-text-size, var(--mat-sys-label-large-size));
  line-height: var(--mat-button-toggle-label-text-line-height, var(--mat-sys-label-large-line-height));
  font-weight: var(--mat-button-toggle-label-text-weight, var(--mat-sys-label-large-weight));
  letter-spacing: var(--mat-button-toggle-label-text-tracking, var(--mat-sys-label-large-tracking));
}
.mat-button-toggle-group-appearance-standard .mat-button-toggle-appearance-standard + .mat-button-toggle-appearance-standard {
  border-left: solid 1px var(--mat-button-toggle-divider-color, var(--mat-sys-outline));
}
[dir=rtl] .mat-button-toggle-group-appearance-standard .mat-button-toggle-appearance-standard + .mat-button-toggle-appearance-standard {
  border-left: none;
  border-right: solid 1px var(--mat-button-toggle-divider-color, var(--mat-sys-outline));
}
.mat-button-toggle-group-appearance-standard.mat-button-toggle-vertical .mat-button-toggle-appearance-standard + .mat-button-toggle-appearance-standard {
  border-left: none;
  border-right: none;
  border-top: solid 1px var(--mat-button-toggle-divider-color, var(--mat-sys-outline));
}
.mat-button-toggle-appearance-standard.mat-button-toggle-checked {
  color: var(--mat-button-toggle-selected-state-text-color, var(--mat-sys-on-secondary-container));
  background-color: var(--mat-button-toggle-selected-state-background-color, var(--mat-sys-secondary-container));
}
.mat-button-toggle-appearance-standard.mat-button-toggle-disabled {
  color: var(--mat-button-toggle-disabled-state-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-button-toggle-disabled-state-background-color, transparent);
}
.mat-button-toggle-appearance-standard.mat-button-toggle-disabled .mat-pseudo-checkbox {
  --mat-pseudo-checkbox-minimal-disabled-selected-checkmark-color: var(--mat-button-toggle-disabled-selected-state-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-button-toggle-appearance-standard.mat-button-toggle-disabled.mat-button-toggle-checked {
  color: var(--mat-button-toggle-disabled-selected-state-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-button-toggle-disabled-selected-state-background-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-button-toggle-appearance-standard .mat-button-toggle-focus-overlay {
  background-color: var(--mat-button-toggle-state-layer-color, var(--mat-sys-on-surface));
}
.mat-button-toggle-appearance-standard:hover .mat-button-toggle-focus-overlay {
  opacity: var(--mat-button-toggle-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-button-toggle-appearance-standard.cdk-keyboard-focused .mat-button-toggle-focus-overlay {
  opacity: var(--mat-button-toggle-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
@media (hover: none) {
  .mat-button-toggle-appearance-standard:hover .mat-button-toggle-focus-overlay {
    display: none;
  }
}

.mat-button-toggle-label-content {
  -webkit-user-select: none;
  user-select: none;
  display: inline-block;
  padding: 0 16px;
  line-height: var(--mat-button-toggle-legacy-height);
  position: relative;
}
.mat-button-toggle-appearance-standard .mat-button-toggle-label-content {
  padding: 0 12px;
  line-height: var(--mat-button-toggle-height, 40px);
}

.mat-button-toggle-label-content > * {
  vertical-align: middle;
}

.mat-button-toggle-focus-overlay {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: inherit;
  pointer-events: none;
  opacity: 0;
  background-color: var(--mat-button-toggle-legacy-state-layer-color);
}

@media (forced-colors: active) {
  .mat-button-toggle-checked .mat-button-toggle-focus-overlay {
    border-bottom: solid 500px;
    opacity: 0.5;
    height: 0;
  }
  .mat-button-toggle-checked:hover .mat-button-toggle-focus-overlay {
    opacity: 0.6;
  }
  .mat-button-toggle-checked.mat-button-toggle-appearance-standard .mat-button-toggle-focus-overlay {
    border-bottom: solid 500px;
  }
}
.mat-button-toggle .mat-button-toggle-ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
}

.mat-button-toggle-button {
  border: 0;
  background: none;
  color: inherit;
  padding: 0;
  margin: 0;
  font: inherit;
  outline: none;
  width: 100%;
  cursor: pointer;
}
.mat-button-toggle-animations-enabled .mat-button-toggle-button {
  transition: padding 150ms 45ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-button-toggle-vertical .mat-button-toggle-button {
  transition: none;
}
.mat-button-toggle-disabled .mat-button-toggle-button {
  cursor: default;
}
.mat-button-toggle-button::-moz-focus-inner {
  border: 0;
}
.mat-button-toggle-checked .mat-button-toggle-button:has(.mat-button-toggle-checkbox-wrapper) {
  padding-left: 30px;
}
[dir=rtl] .mat-button-toggle-checked .mat-button-toggle-button:has(.mat-button-toggle-checkbox-wrapper) {
  padding-left: 0;
  padding-right: 30px;
}

.mat-button-toggle-standalone.mat-button-toggle-appearance-standard {
  --mat-focus-indicator-border-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
}

.mat-button-toggle-group-appearance-standard:not(.mat-button-toggle-vertical) .mat-button-toggle:last-of-type .mat-button-toggle-button::before {
  border-top-right-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
  border-bottom-right-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
}
.mat-button-toggle-group-appearance-standard:not(.mat-button-toggle-vertical) .mat-button-toggle:first-of-type .mat-button-toggle-button::before {
  border-top-left-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
  border-bottom-left-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
}

.mat-button-toggle-group-appearance-standard.mat-button-toggle-vertical .mat-button-toggle:last-of-type .mat-button-toggle-button::before {
  border-bottom-right-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
  border-bottom-left-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
}
.mat-button-toggle-group-appearance-standard.mat-button-toggle-vertical .mat-button-toggle:first-of-type .mat-button-toggle-button::before {
  border-top-right-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
  border-top-left-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
}
`],encapsulation:2,changeDetection:0})}return t})(),Kb=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=q({type:t});static \u0275inj=z({imports:[mc,kc,Ce]})}return t})();var ET=20,Yi=(()=>{class t{_ngZone=u(S);_platform=u(re);_renderer=u(Te).createRenderer(null,null);_cleanupGlobalListener;constructor(){}_scrolled=new E;_scrolledCount=0;scrollContainers=new Map;register(e){this.scrollContainers.has(e)||this.scrollContainers.set(e,e.elementScrolled().subscribe(()=>this._scrolled.next(e)))}deregister(e){let i=this.scrollContainers.get(e);i&&(i.unsubscribe(),this.scrollContainers.delete(e))}scrolled(e=ET){return this._platform.isBrowser?new X(i=>{this._cleanupGlobalListener||(this._cleanupGlobalListener=this._ngZone.runOutsideAngular(()=>this._renderer.listen("document","scroll",()=>this._scrolled.next())));let r=e>0?this._scrolled.pipe(ha(e)).subscribe(i):this._scrolled.subscribe(i);return this._scrolledCount++,()=>{r.unsubscribe(),this._scrolledCount--,this._scrolledCount||(this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0)}}):Ue()}ngOnDestroy(){this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0,this.scrollContainers.forEach((e,i)=>this.deregister(i)),this._scrolled.complete()}ancestorScrolled(e,i){let r=this.getAncestorScrollContainers(e);return this.scrolled(i).pipe(Ve(o=>!o||r.indexOf(o)>-1))}getAncestorScrollContainers(e){let i=[];return this.scrollContainers.forEach((r,o)=>{this._scrollableContainsElement(o,e)&&i.push(o)}),i}_scrollableContainsElement(e,i){let r=ft(i),o=e.getElementRef().nativeElement;do if(r==o)return!0;while(r=r.parentElement);return!1}static \u0275fac=function(i){return new(i||t)};static \u0275prov=_({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),bh=(()=>{class t{elementRef=u(V);scrollDispatcher=u(Yi);ngZone=u(S);dir=u(at,{optional:!0});_scrollElement=this.elementRef.nativeElement;_destroyed=new E;_renderer=u(Ae);_cleanupScroll;_elementScrolled=new E;constructor(){}ngOnInit(){this._cleanupScroll=this.ngZone.runOutsideAngular(()=>this._renderer.listen(this._scrollElement,"scroll",e=>this._elementScrolled.next(e))),this.scrollDispatcher.register(this)}ngOnDestroy(){this._cleanupScroll?.(),this._elementScrolled.complete(),this.scrollDispatcher.deregister(this),this._destroyed.next(),this._destroyed.complete()}elementScrolled(){return this._elementScrolled}getElementRef(){return this.elementRef}scrollTo(e){let i=this.elementRef.nativeElement,r=this.dir&&this.dir.value=="rtl";e.left==null&&(e.left=r?e.end:e.start),e.right==null&&(e.right=r?e.start:e.end),e.bottom!=null&&(e.top=i.scrollHeight-i.clientHeight-e.bottom),r&&Hr()!=Wt.NORMAL?(e.left!=null&&(e.right=i.scrollWidth-i.clientWidth-e.left),Hr()==Wt.INVERTED?e.left=e.right:Hr()==Wt.NEGATED&&(e.left=e.right?-e.right:e.right)):e.right!=null&&(e.left=i.scrollWidth-i.clientWidth-e.right),this._applyScrollToOptions(e)}_applyScrollToOptions(e){let i=this.elementRef.nativeElement;uc()?i.scrollTo(e):(e.top!=null&&(i.scrollTop=e.top),e.left!=null&&(i.scrollLeft=e.left))}measureScrollOffset(e){let i="left",r="right",o=this.elementRef.nativeElement;if(e=="top")return o.scrollTop;if(e=="bottom")return o.scrollHeight-o.clientHeight-o.scrollTop;let s=this.dir&&this.dir.value=="rtl";return e=="start"?e=s?r:i:e=="end"&&(e=s?i:r),s&&Hr()==Wt.INVERTED?e==i?o.scrollWidth-o.clientWidth-o.scrollLeft:o.scrollLeft:s&&Hr()==Wt.NEGATED?e==i?o.scrollLeft+o.scrollWidth-o.clientWidth:-o.scrollLeft:e==i?o.scrollLeft:o.scrollWidth-o.clientWidth-o.scrollLeft}static \u0275fac=function(i){return new(i||t)};static \u0275dir=F({type:t,selectors:[["","cdk-scrollable",""],["","cdkScrollable",""]]})}return t})(),wT=20,Yr=(()=>{class t{_platform=u(re);_listeners;_viewportSize=null;_change=new E;_document=u(k);constructor(){let e=u(S),i=u(Te).createRenderer(null,null);e.runOutsideAngular(()=>{if(this._platform.isBrowser){let r=o=>this._change.next(o);this._listeners=[i.listen("window","resize",r),i.listen("window","orientationchange",r)]}this.change().subscribe(()=>this._viewportSize=null)})}ngOnDestroy(){this._listeners?.forEach(e=>e()),this._change.complete()}getViewportSize(){this._viewportSize||this._updateViewportSize();let e={width:this._viewportSize.width,height:this._viewportSize.height};return this._platform.isBrowser||(this._viewportSize=null),e}getViewportRect(){let e=this.getViewportScrollPosition(),{width:i,height:r}=this.getViewportSize();return{top:e.top,left:e.left,bottom:e.top+r,right:e.left+i,height:r,width:i}}getViewportScrollPosition(){if(!this._platform.isBrowser)return{top:0,left:0};let e=this._document,i=this._getWindow(),r=e.documentElement,o=r.getBoundingClientRect(),s=-o.top||e.body?.scrollTop||i.scrollY||r.scrollTop||0,a=-o.left||e.body?.scrollLeft||i.scrollX||r.scrollLeft||0;return{top:s,left:a}}change(e=wT){return e>0?this._change.pipe(ha(e)):this._change}_getWindow(){return this._document.defaultView||window}_updateViewportSize(){let e=this._getWindow();this._viewportSize=this._platform.isBrowser?{width:e.innerWidth,height:e.innerHeight}:{width:0,height:0}}static \u0275fac=function(i){return new(i||t)};static \u0275prov=_({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Ms=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=q({type:t});static \u0275inj=z({})}return t})(),Dh=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=q({type:t});static \u0275inj=z({imports:[Ce,Ms,Ce,Ms]})}return t})();var Ss=class{_attachedHost=null;attach(n){return this._attachedHost=n,n.attach(this)}detach(){let n=this._attachedHost;n!=null&&(this._attachedHost=null,n.detach())}get isAttached(){return this._attachedHost!=null}setAttachedHost(n){this._attachedHost=n}},qt=class extends Ss{component;viewContainerRef;injector;projectableNodes;bindings;constructor(n,e,i,r,o){super(),this.component=n,this.viewContainerRef=e,this.injector=i,this.projectableNodes=r,this.bindings=o||null}},qn=class extends Ss{templateRef;viewContainerRef;context;injector;constructor(n,e,i,r){super(),this.templateRef=n,this.viewContainerRef=e,this.context=i,this.injector=r}get origin(){return this.templateRef.elementRef}attach(n,e=this.context){return this.context=e,super.attach(n)}detach(){return this.context=void 0,super.detach()}},Ch=class extends Ss{element;constructor(n){super(),this.element=n instanceof V?n.nativeElement:n}},Yn=class{_attachedPortal=null;_disposeFn=null;_isDisposed=!1;hasAttached(){return!!this._attachedPortal}attach(n){if(n instanceof qt)return this._attachedPortal=n,this.attachComponentPortal(n);if(n instanceof qn)return this._attachedPortal=n,this.attachTemplatePortal(n);if(this.attachDomPortal&&n instanceof Ch)return this._attachedPortal=n,this.attachDomPortal(n)}attachDomPortal=null;detach(){this._attachedPortal&&(this._attachedPortal.setAttachedHost(null),this._attachedPortal=null),this._invokeDisposeFn()}dispose(){this.hasAttached()&&this.detach(),this._invokeDisposeFn(),this._isDisposed=!0}setDisposeFn(n){this._disposeFn=n}_invokeDisposeFn(){this._disposeFn&&(this._disposeFn(),this._disposeFn=null)}},Rc=class extends Yn{outletElement;_appRef;_defaultInjector;constructor(n,e,i){super(),this.outletElement=n,this._appRef=e,this._defaultInjector=i}attachComponentPortal(n){let e;if(n.viewContainerRef){let i=n.injector||n.viewContainerRef.injector,r=i.get(Fn,null,{optional:!0})||void 0;e=n.viewContainerRef.createComponent(n.component,{index:n.viewContainerRef.length,injector:i,ngModuleRef:r,projectableNodes:n.projectableNodes||void 0,bindings:n.bindings||void 0}),this.setDisposeFn(()=>e.destroy())}else{let i=this._appRef,r=n.injector||this._defaultInjector||P.NULL,o=r.get(we,i.injector);e=$l(n.component,{elementInjector:r,environmentInjector:o,projectableNodes:n.projectableNodes||void 0,bindings:n.bindings||void 0}),i.attachView(e.hostView),this.setDisposeFn(()=>{i.viewCount>0&&i.detachView(e.hostView),e.destroy()})}return this.outletElement.appendChild(this._getComponentRootNode(e)),this._attachedPortal=n,e}attachTemplatePortal(n){let e=n.viewContainerRef,i=e.createEmbeddedView(n.templateRef,n.context,{injector:n.injector});return i.rootNodes.forEach(r=>this.outletElement.appendChild(r)),i.detectChanges(),this.setDisposeFn(()=>{let r=e.indexOf(i);r!==-1&&e.remove(r)}),this._attachedPortal=n,i}attachDomPortal=n=>{let e=n.element;e.parentNode;let i=this.outletElement.ownerDocument.createComment("dom-portal");e.parentNode.insertBefore(i,e),this.outletElement.appendChild(e),this._attachedPortal=n,super.setDisposeFn(()=>{i.parentNode&&i.parentNode.replaceChild(e,i)})};dispose(){super.dispose(),this.outletElement.remove()}_getComponentRootNode(n){return n.hostView.rootNodes[0]}};var Zn=(()=>{class t extends Yn{_moduleRef=u(Fn,{optional:!0});_document=u(k);_viewContainerRef=u(Dt);_isInitialized=!1;_attachedRef=null;constructor(){super()}get portal(){return this._attachedPortal}set portal(e){this.hasAttached()&&!e&&!this._isInitialized||(this.hasAttached()&&super.detach(),e&&super.attach(e),this._attachedPortal=e||null)}attached=new le;get attachedRef(){return this._attachedRef}ngOnInit(){this._isInitialized=!0}ngOnDestroy(){super.dispose(),this._attachedRef=this._attachedPortal=null}attachComponentPortal(e){e.setAttachedHost(this);let i=e.viewContainerRef!=null?e.viewContainerRef:this._viewContainerRef,r=i.createComponent(e.component,{index:i.length,injector:e.injector||i.injector,projectableNodes:e.projectableNodes||void 0,ngModuleRef:this._moduleRef||void 0,bindings:e.bindings||void 0});return i!==this._viewContainerRef&&this._getRootNode().appendChild(r.hostView.rootNodes[0]),super.setDisposeFn(()=>r.destroy()),this._attachedPortal=e,this._attachedRef=r,this.attached.emit(r),r}attachTemplatePortal(e){e.setAttachedHost(this);let i=this._viewContainerRef.createEmbeddedView(e.templateRef,e.context,{injector:e.injector});return super.setDisposeFn(()=>this._viewContainerRef.clear()),this._attachedPortal=e,this._attachedRef=i,this.attached.emit(i),i}attachDomPortal=e=>{let i=e.element;i.parentNode;let r=this._document.createComment("dom-portal");e.setAttachedHost(this),i.parentNode.insertBefore(r,i),this._getRootNode().appendChild(i),this._attachedPortal=e,super.setDisposeFn(()=>{r.parentNode&&r.parentNode.replaceChild(i,r)})};_getRootNode(){let e=this._viewContainerRef.element.nativeElement;return e.nodeType===e.ELEMENT_NODE?e:e.parentNode}static \u0275fac=function(i){return new(i||t)};static \u0275dir=F({type:t,selectors:[["","cdkPortalOutlet",""]],inputs:{portal:[0,"cdkPortalOutlet","portal"]},outputs:{attached:"attached"},exportAs:["cdkPortalOutlet"],features:[pe]})}return t})(),Qn=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=q({type:t});static \u0275inj=z({})}return t})();var Jb=uc();function Qr(t){return new Nc(t.get(Yr),t.get(k))}var Nc=class{_viewportRuler;_previousHTMLStyles={top:"",left:""};_previousScrollPosition;_isEnabled=!1;_document;constructor(n,e){this._viewportRuler=n,this._document=e}attach(){}enable(){if(this._canBeEnabled()){let n=this._document.documentElement;this._previousScrollPosition=this._viewportRuler.getViewportScrollPosition(),this._previousHTMLStyles.left=n.style.left||"",this._previousHTMLStyles.top=n.style.top||"",n.style.left=Me(-this._previousScrollPosition.left),n.style.top=Me(-this._previousScrollPosition.top),n.classList.add("cdk-global-scrollblock"),this._isEnabled=!0}}disable(){if(this._isEnabled){let n=this._document.documentElement,e=this._document.body,i=n.style,r=e.style,o=i.scrollBehavior||"",s=r.scrollBehavior||"";this._isEnabled=!1,i.left=this._previousHTMLStyles.left,i.top=this._previousHTMLStyles.top,n.classList.remove("cdk-global-scrollblock"),Jb&&(i.scrollBehavior=r.scrollBehavior="auto"),window.scroll(this._previousScrollPosition.left,this._previousScrollPosition.top),Jb&&(i.scrollBehavior=o,r.scrollBehavior=s)}}_canBeEnabled(){if(this._document.documentElement.classList.contains("cdk-global-scrollblock")||this._isEnabled)return!1;let e=this._document.documentElement,i=this._viewportRuler.getViewportSize();return e.scrollHeight>i.height||e.scrollWidth>i.width}};function sD(t,n){return new Oc(t.get(Yi),t.get(S),t.get(Yr),n)}var Oc=class{_scrollDispatcher;_ngZone;_viewportRuler;_config;_scrollSubscription=null;_overlayRef;_initialScrollPosition;constructor(n,e,i,r){this._scrollDispatcher=n,this._ngZone=e,this._viewportRuler=i,this._config=r}attach(n){this._overlayRef,this._overlayRef=n}enable(){if(this._scrollSubscription)return;let n=this._scrollDispatcher.scrolled(0).pipe(Ve(e=>!e||!this._overlayRef.overlayElement.contains(e.getElementRef().nativeElement)));this._config&&this._config.threshold&&this._config.threshold>1?(this._initialScrollPosition=this._viewportRuler.getViewportScrollPosition().top,this._scrollSubscription=n.subscribe(()=>{let e=this._viewportRuler.getViewportScrollPosition().top;Math.abs(e-this._initialScrollPosition)>this._config.threshold?this._detach():this._overlayRef.updatePosition()})):this._scrollSubscription=n.subscribe(this._detach)}disable(){this._scrollSubscription&&(this._scrollSubscription.unsubscribe(),this._scrollSubscription=null)}detach(){this.disable(),this._overlayRef=null}_detach=()=>{this.disable(),this._overlayRef.hasAttached()&&this._ngZone.run(()=>this._overlayRef.detach())}};var Ts=class{enable(){}disable(){}attach(){}};function Eh(t,n){return n.some(e=>{let i=t.bottom<e.top,r=t.top>e.bottom,o=t.right<e.left,s=t.left>e.right;return i||r||o||s})}function eD(t,n){return n.some(e=>{let i=t.top<e.top,r=t.bottom>e.bottom,o=t.left<e.left,s=t.right>e.right;return i||r||o||s})}function Bc(t,n){return new Fc(t.get(Yi),t.get(Yr),t.get(S),n)}var Fc=class{_scrollDispatcher;_viewportRuler;_ngZone;_config;_scrollSubscription=null;_overlayRef;constructor(n,e,i,r){this._scrollDispatcher=n,this._viewportRuler=e,this._ngZone=i,this._config=r}attach(n){this._overlayRef,this._overlayRef=n}enable(){if(!this._scrollSubscription){let n=this._config?this._config.scrollThrottle:0;this._scrollSubscription=this._scrollDispatcher.scrolled(n).subscribe(()=>{if(this._overlayRef.updatePosition(),this._config&&this._config.autoClose){let e=this._overlayRef.overlayElement.getBoundingClientRect(),{width:i,height:r}=this._viewportRuler.getViewportSize();Eh(e,[{width:i,height:r,bottom:r,right:i,top:0,left:0}])&&(this.disable(),this._ngZone.run(()=>this._overlayRef.detach()))}})}}disable(){this._scrollSubscription&&(this._scrollSubscription.unsubscribe(),this._scrollSubscription=null)}detach(){this.disable(),this._overlayRef=null}},aD=(()=>{class t{_injector=u(P);constructor(){}noop=()=>new Ts;close=e=>sD(this._injector,e);block=()=>Qr(this._injector);reposition=e=>Bc(this._injector,e);static \u0275fac=function(i){return new(i||t)};static \u0275prov=_({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),Xn=class{positionStrategy;scrollStrategy=new Ts;panelClass="";hasBackdrop=!1;backdropClass="cdk-overlay-dark-backdrop";disableAnimations;width;height;minWidth;minHeight;maxWidth;maxHeight;direction;disposeOnNavigation=!1;usePopover;eventPredicate;constructor(n){if(n){let e=Object.keys(n);for(let i of e)n[i]!==void 0&&(this[i]=n[i])}}};var Pc=class{connectionPair;scrollableViewProperties;constructor(n,e){this.connectionPair=n,this.scrollableViewProperties=e}};var lD=(()=>{class t{_attachedOverlays=[];_document=u(k);_isAttached=!1;constructor(){}ngOnDestroy(){this.detach()}add(e){this.remove(e),this._attachedOverlays.push(e)}remove(e){let i=this._attachedOverlays.indexOf(e);i>-1&&this._attachedOverlays.splice(i,1),this._attachedOverlays.length===0&&this.detach()}canReceiveEvent(e,i,r){return r.observers.length<1?!1:e.eventPredicate?e.eventPredicate(i):!0}static \u0275fac=function(i){return new(i||t)};static \u0275prov=_({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),cD=(()=>{class t extends lD{_ngZone=u(S);_renderer=u(Te).createRenderer(null,null);_cleanupKeydown;add(e){super.add(e),this._isAttached||(this._ngZone.runOutsideAngular(()=>{this._cleanupKeydown=this._renderer.listen("body","keydown",this._keydownListener)}),this._isAttached=!0)}detach(){this._isAttached&&(this._cleanupKeydown?.(),this._isAttached=!1)}_keydownListener=e=>{let i=this._attachedOverlays;for(let r=i.length-1;r>-1;r--){let o=i[r];if(this.canReceiveEvent(o,e,o._keydownEvents)){this._ngZone.run(()=>o._keydownEvents.next(e));break}}};static \u0275fac=(()=>{let e;return function(r){return(e||(e=bt(t)))(r||t)}})();static \u0275prov=_({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),dD=(()=>{class t extends lD{_platform=u(re);_ngZone=u(S);_renderer=u(Te).createRenderer(null,null);_cursorOriginalValue;_cursorStyleIsSet=!1;_pointerDownEventTarget=null;_cleanups;add(e){if(super.add(e),!this._isAttached){let i=this._document.body,r={capture:!0},o=this._renderer;this._cleanups=this._ngZone.runOutsideAngular(()=>[o.listen(i,"pointerdown",this._pointerDownListener,r),o.listen(i,"click",this._clickListener,r),o.listen(i,"auxclick",this._clickListener,r),o.listen(i,"contextmenu",this._clickListener,r)]),this._platform.IOS&&!this._cursorStyleIsSet&&(this._cursorOriginalValue=i.style.cursor,i.style.cursor="pointer",this._cursorStyleIsSet=!0),this._isAttached=!0}}detach(){this._isAttached&&(this._cleanups?.forEach(e=>e()),this._cleanups=void 0,this._platform.IOS&&this._cursorStyleIsSet&&(this._document.body.style.cursor=this._cursorOriginalValue,this._cursorStyleIsSet=!1),this._isAttached=!1)}_pointerDownListener=e=>{this._pointerDownEventTarget=st(e)};_clickListener=e=>{let i=st(e),r=e.type==="click"&&this._pointerDownEventTarget?this._pointerDownEventTarget:i;this._pointerDownEventTarget=null;let o=this._attachedOverlays.slice();for(let s=o.length-1;s>-1;s--){let a=o[s],l=a._outsidePointerEvents;if(!(!a.hasAttached()||!this.canReceiveEvent(a,e,l))){if(tD(a.overlayElement,i)||tD(a.overlayElement,r))break;this._ngZone?this._ngZone.run(()=>l.next(e)):l.next(e)}}};static \u0275fac=(()=>{let e;return function(r){return(e||(e=bt(t)))(r||t)}})();static \u0275prov=_({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function tD(t,n){let e=typeof ShadowRoot<"u"&&ShadowRoot,i=n;for(;i;){if(i===t)return!0;i=e&&i instanceof ShadowRoot?i.host:i.parentNode}return!1}var uD=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275cmp=H({type:t,selectors:[["ng-component"]],hostAttrs:["cdk-overlay-style-loader",""],decls:0,vars:0,template:function(i,r){},styles:[`.cdk-overlay-container, .cdk-global-overlay-wrapper {
  pointer-events: none;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

.cdk-overlay-container {
  position: fixed;
}
@layer cdk-overlay {
  .cdk-overlay-container {
    z-index: 1000;
  }
}
.cdk-overlay-container:empty {
  display: none;
}

.cdk-global-overlay-wrapper {
  display: flex;
  position: absolute;
}
@layer cdk-overlay {
  .cdk-global-overlay-wrapper {
    z-index: 1000;
  }
}

.cdk-overlay-pane {
  position: absolute;
  pointer-events: auto;
  box-sizing: border-box;
  display: flex;
  max-width: 100%;
  max-height: 100%;
}
@layer cdk-overlay {
  .cdk-overlay-pane {
    z-index: 1000;
  }
}

.cdk-overlay-backdrop {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: auto;
  -webkit-tap-highlight-color: transparent;
  opacity: 0;
  touch-action: manipulation;
}
@layer cdk-overlay {
  .cdk-overlay-backdrop {
    z-index: 1000;
    transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1);
  }
}
@media (prefers-reduced-motion) {
  .cdk-overlay-backdrop {
    transition-duration: 1ms;
  }
}

.cdk-overlay-backdrop-showing {
  opacity: 1;
}
@media (forced-colors: active) {
  .cdk-overlay-backdrop-showing {
    opacity: 0.6;
  }
}

@layer cdk-overlay {
  .cdk-overlay-dark-backdrop {
    background: rgba(0, 0, 0, 0.32);
  }
}

.cdk-overlay-transparent-backdrop {
  transition: visibility 1ms linear, opacity 1ms linear;
  visibility: hidden;
  opacity: 1;
}
.cdk-overlay-transparent-backdrop.cdk-overlay-backdrop-showing, .cdk-high-contrast-active .cdk-overlay-transparent-backdrop {
  opacity: 0;
  visibility: visible;
}

.cdk-overlay-backdrop-noop-animation {
  transition: none;
}

.cdk-overlay-connected-position-bounding-box {
  position: absolute;
  display: flex;
  flex-direction: column;
  min-width: 1px;
  min-height: 1px;
}
@layer cdk-overlay {
  .cdk-overlay-connected-position-bounding-box {
    z-index: 1000;
  }
}

.cdk-global-scrollblock {
  position: fixed;
  width: 100%;
  overflow-y: scroll;
}

.cdk-overlay-popover {
  background: none;
  border: none;
  padding: 0;
  outline: 0;
  overflow: visible;
  position: fixed;
  pointer-events: none;
  white-space: normal;
  color: inherit;
  text-decoration: none;
  width: 100%;
  height: 100%;
  inset: auto;
  top: 0;
  left: 0;
}
.cdk-overlay-popover::backdrop {
  display: none;
}
.cdk-overlay-popover .cdk-overlay-backdrop {
  position: fixed;
  z-index: auto;
}
`],encapsulation:2,changeDetection:0})}return t})(),jc=(()=>{class t{_platform=u(re);_containerElement;_document=u(k);_styleLoader=u(Ge);constructor(){}ngOnDestroy(){this._containerElement?.remove()}getContainerElement(){return this._loadStyles(),this._containerElement||this._createContainer(),this._containerElement}_createContainer(){let e="cdk-overlay-container";if(this._platform.isBrowser||qp()){let r=this._document.querySelectorAll(`.${e}[platform="server"], .${e}[platform="test"]`);for(let o=0;o<r.length;o++)r[o].remove()}let i=this._document.createElement("div");i.classList.add(e),qp()?i.setAttribute("platform","test"):this._platform.isBrowser||i.setAttribute("platform","server"),this._document.body.appendChild(i),this._containerElement=i}_loadStyles(){this._styleLoader.load(uD)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=_({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),wh=class{_renderer;_ngZone;element;_cleanupClick;_cleanupTransitionEnd;_fallbackTimeout;constructor(n,e,i,r){this._renderer=e,this._ngZone=i,this.element=n.createElement("div"),this.element.classList.add("cdk-overlay-backdrop"),this._cleanupClick=e.listen(this.element,"click",r)}detach(){this._ngZone.runOutsideAngular(()=>{let n=this.element;clearTimeout(this._fallbackTimeout),this._cleanupTransitionEnd?.(),this._cleanupTransitionEnd=this._renderer.listen(n,"transitionend",this.dispose),this._fallbackTimeout=setTimeout(this.dispose,500),n.style.pointerEvents="none",n.classList.remove("cdk-overlay-backdrop-showing")})}dispose=()=>{clearTimeout(this._fallbackTimeout),this._cleanupClick?.(),this._cleanupTransitionEnd?.(),this._cleanupClick=this._cleanupTransitionEnd=this._fallbackTimeout=void 0,this.element.remove()}};function xh(t){return t&&t.nodeType===1}var Zr=class{_portalOutlet;_host;_pane;_config;_ngZone;_keyboardDispatcher;_document;_location;_outsideClickDispatcher;_animationsDisabled;_injector;_renderer;_backdropClick=new E;_attachments=new E;_detachments=new E;_positionStrategy;_scrollStrategy;_locationChanges=ye.EMPTY;_backdropRef=null;_detachContentMutationObserver;_detachContentAfterRenderRef;_disposed=!1;_previousHostParent;_keydownEvents=new E;_outsidePointerEvents=new E;_afterNextRenderRef;constructor(n,e,i,r,o,s,a,l,c,d=!1,f,h){this._portalOutlet=n,this._host=e,this._pane=i,this._config=r,this._ngZone=o,this._keyboardDispatcher=s,this._document=a,this._location=l,this._outsideClickDispatcher=c,this._animationsDisabled=d,this._injector=f,this._renderer=h,r.scrollStrategy&&(this._scrollStrategy=r.scrollStrategy,this._scrollStrategy.attach(this)),this._positionStrategy=r.positionStrategy}get overlayElement(){return this._pane}get backdropElement(){return this._backdropRef?.element||null}get hostElement(){return this._host}get eventPredicate(){return this._config?.eventPredicate||null}attach(n){if(this._disposed)return null;this._attachHost();let e=this._portalOutlet.attach(n);return this._positionStrategy?.attach(this),this._updateStackingOrder(),this._updateElementSize(),this._updateElementDirection(),this._scrollStrategy&&this._scrollStrategy.enable(),this._afterNextRenderRef?.destroy(),this._afterNextRenderRef=$e(()=>{this.hasAttached()&&this.updatePosition()},{injector:this._injector}),this._togglePointerEvents(!0),this._config.hasBackdrop&&this._attachBackdrop(),this._config.panelClass&&this._toggleClasses(this._pane,this._config.panelClass,!0),this._attachments.next(),this._completeDetachContent(),this._keyboardDispatcher.add(this),this._config.disposeOnNavigation&&(this._locationChanges=this._location.subscribe(()=>this.dispose())),this._outsideClickDispatcher.add(this),typeof e?.onDestroy=="function"&&e.onDestroy(()=>{this.hasAttached()&&this._ngZone.runOutsideAngular(()=>Promise.resolve().then(()=>this.detach()))}),e}detach(){if(!this.hasAttached())return;this.detachBackdrop(),this._togglePointerEvents(!1),this._positionStrategy&&this._positionStrategy.detach&&this._positionStrategy.detach(),this._scrollStrategy&&this._scrollStrategy.disable();let n=this._portalOutlet.detach();return this._detachments.next(),this._completeDetachContent(),this._keyboardDispatcher.remove(this),this._detachContentWhenEmpty(),this._locationChanges.unsubscribe(),this._outsideClickDispatcher.remove(this),n}dispose(){if(this._disposed)return;let n=this.hasAttached();this._positionStrategy&&this._positionStrategy.dispose(),this._disposeScrollStrategy(),this._backdropRef?.dispose(),this._locationChanges.unsubscribe(),this._keyboardDispatcher.remove(this),this._portalOutlet.dispose(),this._attachments.complete(),this._backdropClick.complete(),this._keydownEvents.complete(),this._outsidePointerEvents.complete(),this._outsideClickDispatcher.remove(this),this._host?.remove(),this._afterNextRenderRef?.destroy(),this._previousHostParent=this._pane=this._host=this._backdropRef=null,n&&this._detachments.next(),this._detachments.complete(),this._completeDetachContent(),this._disposed=!0}hasAttached(){return this._portalOutlet.hasAttached()}backdropClick(){return this._backdropClick}attachments(){return this._attachments}detachments(){return this._detachments}keydownEvents(){return this._keydownEvents}outsidePointerEvents(){return this._outsidePointerEvents}getConfig(){return this._config}updatePosition(){this._positionStrategy&&this._positionStrategy.apply()}updatePositionStrategy(n){n!==this._positionStrategy&&(this._positionStrategy&&this._positionStrategy.dispose(),this._positionStrategy=n,this.hasAttached()&&(n.attach(this),this.updatePosition()))}updateSize(n){this._config=D(D({},this._config),n),this._updateElementSize()}setDirection(n){this._config=J(D({},this._config),{direction:n}),this._updateElementDirection()}addPanelClass(n){this._pane&&this._toggleClasses(this._pane,n,!0)}removePanelClass(n){this._pane&&this._toggleClasses(this._pane,n,!1)}getDirection(){let n=this._config.direction;return n?typeof n=="string"?n:n.value:"ltr"}updateScrollStrategy(n){n!==this._scrollStrategy&&(this._disposeScrollStrategy(),this._scrollStrategy=n,this.hasAttached()&&(n.attach(this),n.enable()))}_updateElementDirection(){this._host.setAttribute("dir",this.getDirection())}_updateElementSize(){if(!this._pane)return;let n=this._pane.style;n.width=Me(this._config.width),n.height=Me(this._config.height),n.minWidth=Me(this._config.minWidth),n.minHeight=Me(this._config.minHeight),n.maxWidth=Me(this._config.maxWidth),n.maxHeight=Me(this._config.maxHeight)}_togglePointerEvents(n){this._pane.style.pointerEvents=n?"":"none"}_attachHost(){if(!this._host.parentElement){let n=this._config.usePopover?this._positionStrategy?.getPopoverInsertionPoint?.():null;xh(n)?n.after(this._host):n?.type==="parent"?n.element.appendChild(this._host):this._previousHostParent?.appendChild(this._host)}if(this._config.usePopover)try{this._host.showPopover()}catch{}}_attachBackdrop(){let n="cdk-overlay-backdrop-showing";this._backdropRef?.dispose(),this._backdropRef=new wh(this._document,this._renderer,this._ngZone,e=>{this._backdropClick.next(e)}),this._animationsDisabled&&this._backdropRef.element.classList.add("cdk-overlay-backdrop-noop-animation"),this._config.backdropClass&&this._toggleClasses(this._backdropRef.element,this._config.backdropClass,!0),this._config.usePopover?this._host.prepend(this._backdropRef.element):this._host.parentElement.insertBefore(this._backdropRef.element,this._host),!this._animationsDisabled&&typeof requestAnimationFrame<"u"?this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>this._backdropRef?.element.classList.add(n))}):this._backdropRef.element.classList.add(n)}_updateStackingOrder(){!this._config.usePopover&&this._host.nextSibling&&this._host.parentNode.appendChild(this._host)}detachBackdrop(){this._animationsDisabled?(this._backdropRef?.dispose(),this._backdropRef=null):this._backdropRef?.detach()}_toggleClasses(n,e,i){let r=Br(e||[]).filter(o=>!!o);r.length&&(i?n.classList.add(...r):n.classList.remove(...r))}_detachContentWhenEmpty(){let n=!1;try{this._detachContentAfterRenderRef=$e(()=>{n=!0,this._detachContent()},{injector:this._injector})}catch(e){if(n)throw e;this._detachContent()}globalThis.MutationObserver&&this._pane&&(this._detachContentMutationObserver||=new globalThis.MutationObserver(()=>{this._detachContent()}),this._detachContentMutationObserver.observe(this._pane,{childList:!0}))}_detachContent(){(!this._pane||!this._host||this._pane.children.length===0)&&(this._pane&&this._config.panelClass&&this._toggleClasses(this._pane,this._config.panelClass,!1),this._host&&this._host.parentElement&&(this._previousHostParent=this._host.parentElement,this._host.remove()),this._completeDetachContent())}_completeDetachContent(){this._detachContentAfterRenderRef?.destroy(),this._detachContentAfterRenderRef=void 0,this._detachContentMutationObserver?.disconnect()}_disposeScrollStrategy(){let n=this._scrollStrategy;n?.disable(),n?.detach?.()}},nD="cdk-overlay-connected-position-bounding-box",IT=/([A-Za-z%]+)$/;function Hc(t,n){return new Lc(n,t.get(Yr),t.get(k),t.get(re),t.get(jc))}var Lc=class{_viewportRuler;_document;_platform;_overlayContainer;_overlayRef;_isInitialRender=!1;_lastBoundingBoxSize={width:0,height:0};_isPushed=!1;_canPush=!0;_growAfterOpen=!1;_hasFlexibleDimensions=!0;_positionLocked=!1;_originRect;_overlayRect;_viewportRect;_containerRect;_viewportMargin=0;_scrollables=[];_preferredPositions=[];_origin;_pane;_isDisposed=!1;_boundingBox=null;_lastPosition=null;_lastScrollVisibility=null;_positionChanges=new E;_resizeSubscription=ye.EMPTY;_offsetX=0;_offsetY=0;_transformOriginSelector;_appliedPanelClasses=[];_previousPushAmount=null;_popoverLocation="global";positionChanges=this._positionChanges;get positions(){return this._preferredPositions}constructor(n,e,i,r,o){this._viewportRuler=e,this._document=i,this._platform=r,this._overlayContainer=o,this.setOrigin(n)}attach(n){this._overlayRef&&this._overlayRef,this._validatePositions(),n.hostElement.classList.add(nD),this._overlayRef=n,this._boundingBox=n.hostElement,this._pane=n.overlayElement,this._isDisposed=!1,this._isInitialRender=!0,this._lastPosition=null,this._resizeSubscription.unsubscribe(),this._resizeSubscription=this._viewportRuler.change().subscribe(()=>{this._isInitialRender=!0,this.apply()})}apply(){if(this._isDisposed||!this._platform.isBrowser)return;if(!this._isInitialRender&&this._positionLocked&&this._lastPosition){this.reapplyLastPosition();return}this._clearPanelClasses(),this._resetOverlayElementStyles(),this._resetBoundingBoxStyles(),this._viewportRect=this._getNarrowedViewportRect(),this._originRect=this._getOriginRect(),this._overlayRect=this._pane.getBoundingClientRect(),this._containerRect=this._getContainerRect();let n=this._originRect,e=this._overlayRect,i=this._viewportRect,r=this._containerRect,o=[],s;for(let a of this._preferredPositions){let l=this._getOriginPoint(n,r,a),c=this._getOverlayPoint(l,e,a),d=this._getOverlayFit(c,e,i,a);if(d.isCompletelyWithinViewport){this._isPushed=!1,this._applyPosition(a,l);return}if(this._canFitWithFlexibleDimensions(d,c,i)){o.push({position:a,origin:l,overlayRect:e,boundingBoxRect:this._calculateBoundingBoxRect(l,a)});continue}(!s||s.overlayFit.visibleArea<d.visibleArea)&&(s={overlayFit:d,overlayPoint:c,originPoint:l,position:a,overlayRect:e})}if(o.length){let a=null,l=-1;for(let c of o){let d=c.boundingBoxRect.width*c.boundingBoxRect.height*(c.position.weight||1);d>l&&(l=d,a=c)}this._isPushed=!1,this._applyPosition(a.position,a.origin);return}if(this._canPush){this._isPushed=!0,this._applyPosition(s.position,s.originPoint);return}this._applyPosition(s.position,s.originPoint)}detach(){this._clearPanelClasses(),this._lastPosition=null,this._previousPushAmount=null,this._resizeSubscription.unsubscribe()}dispose(){this._isDisposed||(this._boundingBox&&Zi(this._boundingBox.style,{top:"",left:"",right:"",bottom:"",height:"",width:"",alignItems:"",justifyContent:""}),this._pane&&this._resetOverlayElementStyles(),this._overlayRef&&this._overlayRef.hostElement.classList.remove(nD),this.detach(),this._positionChanges.complete(),this._overlayRef=this._boundingBox=null,this._isDisposed=!0)}reapplyLastPosition(){if(this._isDisposed||!this._platform.isBrowser)return;let n=this._lastPosition;n?(this._originRect=this._getOriginRect(),this._overlayRect=this._pane.getBoundingClientRect(),this._viewportRect=this._getNarrowedViewportRect(),this._containerRect=this._getContainerRect(),this._applyPosition(n,this._getOriginPoint(this._originRect,this._containerRect,n))):this.apply()}withScrollableContainers(n){return this._scrollables=n,this}withPositions(n){return this._preferredPositions=n,n.indexOf(this._lastPosition)===-1&&(this._lastPosition=null),this._validatePositions(),this}withViewportMargin(n){return this._viewportMargin=n,this}withFlexibleDimensions(n=!0){return this._hasFlexibleDimensions=n,this}withGrowAfterOpen(n=!0){return this._growAfterOpen=n,this}withPush(n=!0){return this._canPush=n,this}withLockedPosition(n=!0){return this._positionLocked=n,this}setOrigin(n){return this._origin=n,this}withDefaultOffsetX(n){return this._offsetX=n,this}withDefaultOffsetY(n){return this._offsetY=n,this}withTransformOriginOn(n){return this._transformOriginSelector=n,this}withPopoverLocation(n){return this._popoverLocation=n,this}getPopoverInsertionPoint(){return this._popoverLocation==="global"?null:this._popoverLocation!=="inline"?this._popoverLocation:this._origin instanceof V?this._origin.nativeElement:xh(this._origin)?this._origin:null}_getOriginPoint(n,e,i){let r;if(i.originX=="center")r=n.left+n.width/2;else{let s=this._isRtl()?n.right:n.left,a=this._isRtl()?n.left:n.right;r=i.originX=="start"?s:a}e.left<0&&(r-=e.left);let o;return i.originY=="center"?o=n.top+n.height/2:o=i.originY=="top"?n.top:n.bottom,e.top<0&&(o-=e.top),{x:r,y:o}}_getOverlayPoint(n,e,i){let r;i.overlayX=="center"?r=-e.width/2:i.overlayX==="start"?r=this._isRtl()?-e.width:0:r=this._isRtl()?0:-e.width;let o;return i.overlayY=="center"?o=-e.height/2:o=i.overlayY=="top"?0:-e.height,{x:n.x+r,y:n.y+o}}_getOverlayFit(n,e,i,r){let o=rD(e),{x:s,y:a}=n,l=this._getOffset(r,"x"),c=this._getOffset(r,"y");l&&(s+=l),c&&(a+=c);let d=0-s,f=s+o.width-i.width,h=0-a,p=a+o.height-i.height,m=this._subtractOverflows(o.width,d,f),C=this._subtractOverflows(o.height,h,p),x=m*C;return{visibleArea:x,isCompletelyWithinViewport:o.width*o.height===x,fitsInViewportVertically:C===o.height,fitsInViewportHorizontally:m==o.width}}_canFitWithFlexibleDimensions(n,e,i){if(this._hasFlexibleDimensions){let r=i.bottom-e.y,o=i.right-e.x,s=iD(this._overlayRef.getConfig().minHeight),a=iD(this._overlayRef.getConfig().minWidth),l=n.fitsInViewportVertically||s!=null&&s<=r,c=n.fitsInViewportHorizontally||a!=null&&a<=o;return l&&c}return!1}_pushOverlayOnScreen(n,e,i){if(this._previousPushAmount&&this._positionLocked)return{x:n.x+this._previousPushAmount.x,y:n.y+this._previousPushAmount.y};let r=rD(e),o=this._viewportRect,s=Math.max(n.x+r.width-o.width,0),a=Math.max(n.y+r.height-o.height,0),l=Math.max(o.top-i.top-n.y,0),c=Math.max(o.left-i.left-n.x,0),d=0,f=0;return r.width<=o.width?d=c||-s:d=n.x<this._getViewportMarginStart()?o.left-i.left-n.x:0,r.height<=o.height?f=l||-a:f=n.y<this._getViewportMarginTop()?o.top-i.top-n.y:0,this._previousPushAmount={x:d,y:f},{x:n.x+d,y:n.y+f}}_applyPosition(n,e){if(this._setTransformOrigin(n),this._setOverlayElementStyles(e,n),this._setBoundingBoxStyles(e,n),n.panelClass&&this._addPanelClasses(n.panelClass),this._positionChanges.observers.length){let i=this._getScrollVisibility();if(n!==this._lastPosition||!this._lastScrollVisibility||!MT(this._lastScrollVisibility,i)){let r=new Pc(n,i);this._positionChanges.next(r)}this._lastScrollVisibility=i}this._lastPosition=n,this._isInitialRender=!1}_setTransformOrigin(n){if(!this._transformOriginSelector)return;let e=this._boundingBox.querySelectorAll(this._transformOriginSelector),i,r=n.overlayY;n.overlayX==="center"?i="center":this._isRtl()?i=n.overlayX==="start"?"right":"left":i=n.overlayX==="start"?"left":"right";for(let o=0;o<e.length;o++)e[o].style.transformOrigin=`${i} ${r}`}_calculateBoundingBoxRect(n,e){let i=this._viewportRect,r=this._isRtl(),o,s,a;if(e.overlayY==="top")s=n.y,o=i.height-s+this._getViewportMarginBottom();else if(e.overlayY==="bottom")a=i.height-n.y+this._getViewportMarginTop()+this._getViewportMarginBottom(),o=i.height-a+this._getViewportMarginTop();else{let p=Math.min(i.bottom-n.y+i.top,n.y),m=this._lastBoundingBoxSize.height;o=p*2,s=n.y-p,o>m&&!this._isInitialRender&&!this._growAfterOpen&&(s=n.y-m/2)}let l=e.overlayX==="start"&&!r||e.overlayX==="end"&&r,c=e.overlayX==="end"&&!r||e.overlayX==="start"&&r,d,f,h;if(c)h=i.width-n.x+this._getViewportMarginStart()+this._getViewportMarginEnd(),d=n.x-this._getViewportMarginStart();else if(l)f=n.x,d=i.right-n.x-this._getViewportMarginEnd();else{let p=Math.min(i.right-n.x+i.left,n.x),m=this._lastBoundingBoxSize.width;d=p*2,f=n.x-p,d>m&&!this._isInitialRender&&!this._growAfterOpen&&(f=n.x-m/2)}return{top:s,left:f,bottom:a,right:h,width:d,height:o}}_setBoundingBoxStyles(n,e){let i=this._calculateBoundingBoxRect(n,e);!this._isInitialRender&&!this._growAfterOpen&&(i.height=Math.min(i.height,this._lastBoundingBoxSize.height),i.width=Math.min(i.width,this._lastBoundingBoxSize.width));let r={};if(this._hasExactPosition())r.top=r.left="0",r.bottom=r.right="auto",r.maxHeight=r.maxWidth="",r.width=r.height="100%";else{let o=this._overlayRef.getConfig().maxHeight,s=this._overlayRef.getConfig().maxWidth;r.width=Me(i.width),r.height=Me(i.height),r.top=Me(i.top)||"auto",r.bottom=Me(i.bottom)||"auto",r.left=Me(i.left)||"auto",r.right=Me(i.right)||"auto",e.overlayX==="center"?r.alignItems="center":r.alignItems=e.overlayX==="end"?"flex-end":"flex-start",e.overlayY==="center"?r.justifyContent="center":r.justifyContent=e.overlayY==="bottom"?"flex-end":"flex-start",o&&(r.maxHeight=Me(o)),s&&(r.maxWidth=Me(s))}this._lastBoundingBoxSize=i,Zi(this._boundingBox.style,r)}_resetBoundingBoxStyles(){Zi(this._boundingBox.style,{top:"0",left:"0",right:"0",bottom:"0",height:"",width:"",alignItems:"",justifyContent:""})}_resetOverlayElementStyles(){Zi(this._pane.style,{top:"",left:"",bottom:"",right:"",position:"",transform:""})}_setOverlayElementStyles(n,e){let i={},r=this._hasExactPosition(),o=this._hasFlexibleDimensions,s=this._overlayRef.getConfig();if(r){let d=this._viewportRuler.getViewportScrollPosition();Zi(i,this._getExactOverlayY(e,n,d)),Zi(i,this._getExactOverlayX(e,n,d))}else i.position="static";let a="",l=this._getOffset(e,"x"),c=this._getOffset(e,"y");l&&(a+=`translateX(${l}px) `),c&&(a+=`translateY(${c}px)`),i.transform=a.trim(),s.maxHeight&&(r?i.maxHeight=Me(s.maxHeight):o&&(i.maxHeight="")),s.maxWidth&&(r?i.maxWidth=Me(s.maxWidth):o&&(i.maxWidth="")),Zi(this._pane.style,i)}_getExactOverlayY(n,e,i){let r={top:"",bottom:""},o=this._getOverlayPoint(e,this._overlayRect,n);if(this._isPushed&&(o=this._pushOverlayOnScreen(o,this._overlayRect,i)),n.overlayY==="bottom"){let s=this._document.documentElement.clientHeight;r.bottom=`${s-(o.y+this._overlayRect.height)}px`}else r.top=Me(o.y);return r}_getExactOverlayX(n,e,i){let r={left:"",right:""},o=this._getOverlayPoint(e,this._overlayRect,n);this._isPushed&&(o=this._pushOverlayOnScreen(o,this._overlayRect,i));let s;if(this._isRtl()?s=n.overlayX==="end"?"left":"right":s=n.overlayX==="end"?"right":"left",s==="right"){let a=this._document.documentElement.clientWidth;r.right=`${a-(o.x+this._overlayRect.width)}px`}else r.left=Me(o.x);return r}_getScrollVisibility(){let n=this._getOriginRect(),e=this._pane.getBoundingClientRect(),i=this._scrollables.map(r=>r.getElementRef().nativeElement.getBoundingClientRect());return{isOriginClipped:eD(n,i),isOriginOutsideView:Eh(n,i),isOverlayClipped:eD(e,i),isOverlayOutsideView:Eh(e,i)}}_subtractOverflows(n,...e){return e.reduce((i,r)=>i-Math.max(r,0),n)}_getNarrowedViewportRect(){let n=this._document.documentElement.clientWidth,e=this._document.documentElement.clientHeight,i=this._viewportRuler.getViewportScrollPosition();return{top:i.top+this._getViewportMarginTop(),left:i.left+this._getViewportMarginStart(),right:i.left+n-this._getViewportMarginEnd(),bottom:i.top+e-this._getViewportMarginBottom(),width:n-this._getViewportMarginStart()-this._getViewportMarginEnd(),height:e-this._getViewportMarginTop()-this._getViewportMarginBottom()}}_isRtl(){return this._overlayRef.getDirection()==="rtl"}_hasExactPosition(){return!this._hasFlexibleDimensions||this._isPushed}_getOffset(n,e){return e==="x"?n.offsetX==null?this._offsetX:n.offsetX:n.offsetY==null?this._offsetY:n.offsetY}_validatePositions(){}_addPanelClasses(n){this._pane&&Br(n).forEach(e=>{e!==""&&this._appliedPanelClasses.indexOf(e)===-1&&(this._appliedPanelClasses.push(e),this._pane.classList.add(e))})}_clearPanelClasses(){this._pane&&(this._appliedPanelClasses.forEach(n=>{this._pane.classList.remove(n)}),this._appliedPanelClasses=[])}_getViewportMarginStart(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.start??0}_getViewportMarginEnd(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.end??0}_getViewportMarginTop(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.top??0}_getViewportMarginBottom(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.bottom??0}_getOriginRect(){let n=this._origin;if(n instanceof V)return n.nativeElement.getBoundingClientRect();if(n instanceof Element)return n.getBoundingClientRect();let e=n.width||0,i=n.height||0;return{top:n.y,bottom:n.y+i,left:n.x,right:n.x+e,height:i,width:e}}_getContainerRect(){let n=this._overlayRef.getConfig().usePopover&&this._popoverLocation!=="global",e=this._overlayContainer.getContainerElement();n&&(e.style.display="block");let i=e.getBoundingClientRect();return n&&(e.style.display=""),i}};function Zi(t,n){for(let e in n)n.hasOwnProperty(e)&&(t[e]=n[e]);return t}function iD(t){if(typeof t!="number"&&t!=null){let[n,e]=t.split(IT);return!e||e==="px"?parseFloat(n):null}return t||null}function rD(t){return{top:Math.floor(t.top),right:Math.floor(t.right),bottom:Math.floor(t.bottom),left:Math.floor(t.left),width:Math.floor(t.width),height:Math.floor(t.height)}}function MT(t,n){return t===n?!0:t.isOriginClipped===n.isOriginClipped&&t.isOriginOutsideView===n.isOriginOutsideView&&t.isOverlayClipped===n.isOverlayClipped&&t.isOverlayOutsideView===n.isOverlayOutsideView}var oD="cdk-global-overlay-wrapper";function Kn(t){return new Vc}var Vc=class{_overlayRef;_cssPosition="static";_topOffset="";_bottomOffset="";_alignItems="";_xPosition="";_xOffset="";_width="";_height="";_isDisposed=!1;attach(n){let e=n.getConfig();this._overlayRef=n,this._width&&!e.width&&n.updateSize({width:this._width}),this._height&&!e.height&&n.updateSize({height:this._height}),n.hostElement.classList.add(oD),this._isDisposed=!1}top(n=""){return this._bottomOffset="",this._topOffset=n,this._alignItems="flex-start",this}left(n=""){return this._xOffset=n,this._xPosition="left",this}bottom(n=""){return this._topOffset="",this._bottomOffset=n,this._alignItems="flex-end",this}right(n=""){return this._xOffset=n,this._xPosition="right",this}start(n=""){return this._xOffset=n,this._xPosition="start",this}end(n=""){return this._xOffset=n,this._xPosition="end",this}width(n=""){return this._overlayRef?this._overlayRef.updateSize({width:n}):this._width=n,this}height(n=""){return this._overlayRef?this._overlayRef.updateSize({height:n}):this._height=n,this}centerHorizontally(n=""){return this.left(n),this._xPosition="center",this}centerVertically(n=""){return this.top(n),this._alignItems="center",this}apply(){if(!this._overlayRef||!this._overlayRef.hasAttached())return;let n=this._overlayRef.overlayElement.style,e=this._overlayRef.hostElement.style,i=this._overlayRef.getConfig(),{width:r,height:o,maxWidth:s,maxHeight:a}=i,l=(r==="100%"||r==="100vw")&&(!s||s==="100%"||s==="100vw"),c=(o==="100%"||o==="100vh")&&(!a||a==="100%"||a==="100vh"),d=this._xPosition,f=this._xOffset,h=this._overlayRef.getConfig().direction==="rtl",p="",m="",C="";l?C="flex-start":d==="center"?(C="center",h?m=f:p=f):h?d==="left"||d==="end"?(C="flex-end",p=f):(d==="right"||d==="start")&&(C="flex-start",m=f):d==="left"||d==="start"?(C="flex-start",p=f):(d==="right"||d==="end")&&(C="flex-end",m=f),n.position=this._cssPosition,n.marginLeft=l?"0":p,n.marginTop=c?"0":this._topOffset,n.marginBottom=this._bottomOffset,n.marginRight=l?"0":m,e.justifyContent=C,e.alignItems=c?"flex-start":this._alignItems}dispose(){if(this._isDisposed||!this._overlayRef)return;let n=this._overlayRef.overlayElement.style,e=this._overlayRef.hostElement,i=e.style;e.classList.remove(oD),i.justifyContent=i.alignItems=n.marginTop=n.marginBottom=n.marginLeft=n.marginRight=n.position="",this._overlayRef=null,this._isDisposed=!0}},fD=(()=>{class t{_injector=u(P);constructor(){}global(){return Kn()}flexibleConnectedTo(e){return Hc(this._injector,e)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=_({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),pD=new y("OVERLAY_DEFAULT_CONFIG");function Jn(t,n){t.get(Ge).load(uD);let e=t.get(jc),i=t.get(k),r=t.get(Re),o=t.get(zt),s=t.get(at),a=t.get(Ae,null,{optional:!0})||t.get(Te).createRenderer(null,null),l=new Xn(n),c=t.get(pD,null,{optional:!0})?.usePopover??!0;l.direction=l.direction||s.value,"showPopover"in i.body?l.usePopover=n?.usePopover??c:l.usePopover=!1;let d=i.createElement("div"),f=i.createElement("div");d.id=r.getId("cdk-overlay-"),d.classList.add("cdk-overlay-pane"),f.appendChild(d),l.usePopover&&(f.setAttribute("popover","manual"),f.classList.add("cdk-overlay-popover"));let h=l.usePopover?l.positionStrategy?.getPopoverInsertionPoint?.():null;return xh(h)?h.after(f):h?.type==="parent"?h.element.appendChild(f):e.getContainerElement().appendChild(f),new Zr(new Rc(d,o,t),f,d,l,t.get(S),t.get(cD),i,t.get(Wl),t.get(dD),n?.disableAnimations??t.get($o,null,{optional:!0})==="NoopAnimations",t.get(we),a)}var hD=(()=>{class t{scrollStrategies=u(aD);_positionBuilder=u(fD);_injector=u(P);constructor(){}create(e){return Jn(this._injector,e)}position(){return this._positionBuilder}static \u0275fac=function(i){return new(i||t)};static \u0275prov=_({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var ei=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=q({type:t});static \u0275inj=z({providers:[hD],imports:[Ce,Qn,Dh,Dh]})}return t})();function ST(t,n){}var ti=class{viewContainerRef;injector;id;role="dialog";panelClass="";hasBackdrop=!0;backdropClass="";disableClose=!1;closePredicate;width="";height="";minWidth;minHeight;maxWidth;maxHeight;positionStrategy;data=null;direction;ariaDescribedBy=null;ariaLabelledBy=null;ariaLabel=null;ariaModal=!1;autoFocus="first-tabbable";restoreFocus=!0;scrollStrategy;closeOnNavigation=!0;closeOnDestroy=!0;closeOnOverlayDetachments=!0;disableAnimations=!1;providers;container;templateContext};var Mh=(()=>{class t extends Yn{_elementRef=u(V);_focusTrapFactory=u(Up);_config;_interactivityChecker=u(Hp);_ngZone=u(S);_focusMonitor=u(vn);_renderer=u(Ae);_changeDetectorRef=u(ot);_injector=u(P);_platform=u(re);_document=u(k);_portalOutlet;_focusTrapped=new E;_focusTrap=null;_elementFocusedBeforeDialogWasOpened=null;_closeInteractionType=null;_ariaLabelledByQueue=[];_isDestroyed=!1;constructor(){super(),this._config=u(ti,{optional:!0})||new ti,this._config.ariaLabelledBy&&this._ariaLabelledByQueue.push(this._config.ariaLabelledBy)}_addAriaLabelledBy(e){this._ariaLabelledByQueue.push(e),this._changeDetectorRef.markForCheck()}_removeAriaLabelledBy(e){let i=this._ariaLabelledByQueue.indexOf(e);i>-1&&(this._ariaLabelledByQueue.splice(i,1),this._changeDetectorRef.markForCheck())}_contentAttached(){this._initializeFocusTrap(),this._captureInitialFocus()}_captureInitialFocus(){this._trapFocus()}ngOnDestroy(){this._focusTrapped.complete(),this._isDestroyed=!0,this._restoreFocus()}attachComponentPortal(e){this._portalOutlet.hasAttached();let i=this._portalOutlet.attachComponentPortal(e);return this._contentAttached(),i}attachTemplatePortal(e){this._portalOutlet.hasAttached();let i=this._portalOutlet.attachTemplatePortal(e);return this._contentAttached(),i}attachDomPortal=e=>{this._portalOutlet.hasAttached();let i=this._portalOutlet.attachDomPortal(e);return this._contentAttached(),i};_recaptureFocus(){this._containsFocus()||this._trapFocus()}_forceFocus(e,i){this._interactivityChecker.isFocusable(e)||(e.tabIndex=-1,this._ngZone.runOutsideAngular(()=>{let r=()=>{o(),s(),e.removeAttribute("tabindex")},o=this._renderer.listen(e,"blur",r),s=this._renderer.listen(e,"mousedown",r)})),e.focus(i)}_focusByCssSelector(e,i){let r=this._elementRef.nativeElement.querySelector(e);r&&this._forceFocus(r,i)}_trapFocus(e){this._isDestroyed||$e(()=>{let i=this._elementRef.nativeElement;switch(this._config.autoFocus){case!1:case"dialog":this._containsFocus()||i.focus(e);break;case!0:case"first-tabbable":this._focusTrap?.focusInitialElement(e)||this._focusDialogContainer(e);break;case"first-heading":this._focusByCssSelector('h1, h2, h3, h4, h5, h6, [role="heading"]',e);break;default:this._focusByCssSelector(this._config.autoFocus,e);break}this._focusTrapped.next()},{injector:this._injector})}_restoreFocus(){let e=this._config.restoreFocus,i=null;if(typeof e=="string"?i=this._document.querySelector(e):typeof e=="boolean"?i=e?this._elementFocusedBeforeDialogWasOpened:null:e&&(i=e),this._config.restoreFocus&&i&&typeof i.focus=="function"){let r=fs(),o=this._elementRef.nativeElement;(!r||r===this._document.body||r===o||o.contains(r))&&(this._focusMonitor?(this._focusMonitor.focusVia(i,this._closeInteractionType),this._closeInteractionType=null):i.focus())}this._focusTrap&&this._focusTrap.destroy()}_focusDialogContainer(e){this._elementRef.nativeElement.focus?.(e)}_containsFocus(){let e=this._elementRef.nativeElement,i=fs();return e===i||e.contains(i)}_initializeFocusTrap(){this._platform.isBrowser&&(this._focusTrap=this._focusTrapFactory.create(this._elementRef.nativeElement),this._document&&(this._elementFocusedBeforeDialogWasOpened=fs()))}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=H({type:t,selectors:[["cdk-dialog-container"]],viewQuery:function(i,r){if(i&1&&je(Zn,7),i&2){let o;se(o=ae())&&(r._portalOutlet=o.first)}},hostAttrs:["tabindex","-1",1,"cdk-dialog-container"],hostVars:6,hostBindings:function(i,r){i&2&&K("id",r._config.id||null)("role",r._config.role)("aria-modal",r._config.ariaModal)("aria-labelledby",r._config.ariaLabel?null:r._ariaLabelledByQueue[0])("aria-label",r._config.ariaLabel)("aria-describedby",r._config.ariaDescribedBy||null)},features:[pe],decls:1,vars:0,consts:[["cdkPortalOutlet",""]],template:function(i,r){i&1&&tt(0,ST,0,0,"ng-template",0)},dependencies:[Zn],styles:[`.cdk-dialog-container {
  display: block;
  width: 100%;
  height: 100%;
  min-height: inherit;
  max-height: inherit;
}
`],encapsulation:2})}return t})(),As=class{overlayRef;config;componentInstance=null;componentRef=null;containerInstance;disableClose;closed=new E;backdropClick;keydownEvents;outsidePointerEvents;id;_detachSubscription;constructor(n,e){this.overlayRef=n,this.config=e,this.disableClose=e.disableClose,this.backdropClick=n.backdropClick(),this.keydownEvents=n.keydownEvents(),this.outsidePointerEvents=n.outsidePointerEvents(),this.id=e.id,this.keydownEvents.subscribe(i=>{i.keyCode===27&&!this.disableClose&&!$n(i)&&(i.preventDefault(),this.close(void 0,{focusOrigin:"keyboard"}))}),this.backdropClick.subscribe(()=>{!this.disableClose&&this._canClose()?this.close(void 0,{focusOrigin:"mouse"}):this.containerInstance._recaptureFocus?.()}),this._detachSubscription=n.detachments().subscribe(()=>{e.closeOnOverlayDetachments!==!1&&this.close()})}close(n,e){if(this._canClose(n)){let i=this.closed;this.containerInstance._closeInteractionType=e?.focusOrigin||"program",this._detachSubscription.unsubscribe(),this.overlayRef.dispose(),i.next(n),i.complete(),this.componentInstance=this.containerInstance=null}}updatePosition(){return this.overlayRef.updatePosition(),this}updateSize(n="",e=""){return this.overlayRef.updateSize({width:n,height:e}),this}addPanelClass(n){return this.overlayRef.addPanelClass(n),this}removePanelClass(n){return this.overlayRef.removePanelClass(n),this}_canClose(n){let e=this.config;return!!this.containerInstance&&(!e.closePredicate||e.closePredicate(n,e,this.componentInstance))}},TT=new y("DialogScrollStrategy",{providedIn:"root",factory:()=>{let t=u(P);return()=>Qr(t)}}),AT=new y("DialogData"),kT=new y("DefaultDialogConfig");function RT(t){let n=L(t),e=new le;return{valueSignal:n,get value(){return n()},change:e,ngOnDestroy(){e.complete()}}}var Sh=(()=>{class t{_injector=u(P);_defaultOptions=u(kT,{optional:!0});_parentDialog=u(t,{optional:!0,skipSelf:!0});_overlayContainer=u(jc);_idGenerator=u(Re);_openDialogsAtThisLevel=[];_afterAllClosedAtThisLevel=new E;_afterOpenedAtThisLevel=new E;_ariaHiddenElements=new Map;_scrollStrategy=u(TT);get openDialogs(){return this._parentDialog?this._parentDialog.openDialogs:this._openDialogsAtThisLevel}get afterOpened(){return this._parentDialog?this._parentDialog.afterOpened:this._afterOpenedAtThisLevel}afterAllClosed=fo(()=>this.openDialogs.length?this._getAfterAllClosed():this._getAfterAllClosed().pipe(Zt(void 0)));constructor(){}open(e,i){let r=this._defaultOptions||new ti;i=D(D({},r),i),i.id=i.id||this._idGenerator.getId("cdk-dialog-"),i.id&&this.getDialogById(i.id);let o=this._getOverlayConfig(i),s=Jn(this._injector,o),a=new As(s,i),l=this._attachContainer(s,a,i);if(a.containerInstance=l,!this.openDialogs.length){let c=this._overlayContainer.getContainerElement();l._focusTrapped?l._focusTrapped.pipe(Tt(1)).subscribe(()=>{this._hideNonDialogContentFromAssistiveTechnology(c)}):this._hideNonDialogContentFromAssistiveTechnology(c)}return this._attachDialogContent(e,a,l,i),this.openDialogs.push(a),a.closed.subscribe(()=>this._removeOpenDialog(a,!0)),this.afterOpened.next(a),a}closeAll(){Ih(this.openDialogs,e=>e.close())}getDialogById(e){return this.openDialogs.find(i=>i.id===e)}ngOnDestroy(){Ih(this._openDialogsAtThisLevel,e=>{e.config.closeOnDestroy===!1&&this._removeOpenDialog(e,!1)}),Ih(this._openDialogsAtThisLevel,e=>e.close()),this._afterAllClosedAtThisLevel.complete(),this._afterOpenedAtThisLevel.complete(),this._openDialogsAtThisLevel=[]}_getOverlayConfig(e){let i=new Xn({positionStrategy:e.positionStrategy||Kn().centerHorizontally().centerVertically(),scrollStrategy:e.scrollStrategy||this._scrollStrategy(),panelClass:e.panelClass,hasBackdrop:e.hasBackdrop,direction:e.direction,minWidth:e.minWidth,minHeight:e.minHeight,maxWidth:e.maxWidth,maxHeight:e.maxHeight,width:e.width,height:e.height,disposeOnNavigation:e.closeOnNavigation,disableAnimations:e.disableAnimations});return e.backdropClass&&(i.backdropClass=e.backdropClass),i}_attachContainer(e,i,r){let o=r.injector||r.viewContainerRef?.injector,s=[{provide:ti,useValue:r},{provide:As,useValue:i},{provide:Zr,useValue:e}],a;r.container?typeof r.container=="function"?a=r.container:(a=r.container.type,s.push(...r.container.providers(r))):a=Mh;let l=new qt(a,r.viewContainerRef,P.create({parent:o||this._injector,providers:s}));return e.attach(l).instance}_attachDialogContent(e,i,r,o){if(e instanceof ut){let s=this._createInjector(o,i,r,void 0),a={$implicit:o.data,dialogRef:i};o.templateContext&&(a=D(D({},a),typeof o.templateContext=="function"?o.templateContext():o.templateContext)),r.attachTemplatePortal(new qn(e,null,a,s))}else{let s=this._createInjector(o,i,r,this._injector),a=r.attachComponentPortal(new qt(e,o.viewContainerRef,s));i.componentRef=a,i.componentInstance=a.instance}}_createInjector(e,i,r,o){let s=e.injector||e.viewContainerRef?.injector,a=[{provide:AT,useValue:e.data},{provide:As,useValue:i}];return e.providers&&(typeof e.providers=="function"?a.push(...e.providers(i,e,r)):a.push(...e.providers)),e.direction&&(!s||!s.get(at,null,{optional:!0}))&&a.push({provide:at,useValue:RT(e.direction)}),P.create({parent:s||o,providers:a})}_removeOpenDialog(e,i){let r=this.openDialogs.indexOf(e);r>-1&&(this.openDialogs.splice(r,1),this.openDialogs.length||(this._ariaHiddenElements.forEach((o,s)=>{o?s.setAttribute("aria-hidden",o):s.removeAttribute("aria-hidden")}),this._ariaHiddenElements.clear(),i&&this._getAfterAllClosed().next()))}_hideNonDialogContentFromAssistiveTechnology(e){if(e.parentElement){let i=e.parentElement.children;for(let r=i.length-1;r>-1;r--){let o=i[r];o!==e&&o.nodeName!=="SCRIPT"&&o.nodeName!=="STYLE"&&!o.hasAttribute("aria-live")&&!o.hasAttribute("popover")&&(this._ariaHiddenElements.set(o,o.getAttribute("aria-hidden")),o.setAttribute("aria-hidden","true"))}}}_getAfterAllClosed(){let e=this._parentDialog;return e?e._getAfterAllClosed():this._afterAllClosedAtThisLevel}static \u0275fac=function(i){return new(i||t)};static \u0275prov=_({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function Ih(t,n){let e=t.length;for(;e--;)n(t[e])}var mD=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=q({type:t});static \u0275inj=z({providers:[Sh],imports:[ei,Qn,gs,Qn]})}return t})();function NT(t,n){}var $c=class{viewContainerRef;injector;id;role="dialog";panelClass="";hasBackdrop=!0;backdropClass="";disableClose=!1;closePredicate;width="";height="";minWidth;minHeight;maxWidth;maxHeight;position;data=null;direction;ariaDescribedBy=null;ariaLabelledBy=null;ariaLabel=null;ariaModal=!1;autoFocus="first-tabbable";restoreFocus=!0;delayFocusTrap=!0;scrollStrategy;closeOnNavigation=!0;enterAnimationDuration;exitAnimationDuration},Th="mdc-dialog--open",gD="mdc-dialog--opening",vD="mdc-dialog--closing",OT=150,FT=75,PT=(()=>{class t extends Mh{_animationStateChanged=new le;_animationsEnabled=!Ie();_actionSectionCount=0;_hostElement=this._elementRef.nativeElement;_enterAnimationDuration=this._animationsEnabled?_D(this._config.enterAnimationDuration)??OT:0;_exitAnimationDuration=this._animationsEnabled?_D(this._config.exitAnimationDuration)??FT:0;_animationTimer=null;_contentAttached(){super._contentAttached(),this._startOpenAnimation()}_startOpenAnimation(){this._animationStateChanged.emit({state:"opening",totalTime:this._enterAnimationDuration}),this._animationsEnabled?(this._hostElement.style.setProperty(yD,`${this._enterAnimationDuration}ms`),this._requestAnimationFrame(()=>this._hostElement.classList.add(gD,Th)),this._waitForAnimationToComplete(this._enterAnimationDuration,this._finishDialogOpen)):(this._hostElement.classList.add(Th),Promise.resolve().then(()=>this._finishDialogOpen()))}_startExitAnimation(){this._animationStateChanged.emit({state:"closing",totalTime:this._exitAnimationDuration}),this._hostElement.classList.remove(Th),this._animationsEnabled?(this._hostElement.style.setProperty(yD,`${this._exitAnimationDuration}ms`),this._requestAnimationFrame(()=>this._hostElement.classList.add(vD)),this._waitForAnimationToComplete(this._exitAnimationDuration,this._finishDialogClose)):Promise.resolve().then(()=>this._finishDialogClose())}_updateActionSectionCount(e){this._actionSectionCount+=e,this._changeDetectorRef.markForCheck()}_finishDialogOpen=()=>{this._clearAnimationClasses(),this._openAnimationDone(this._enterAnimationDuration)};_finishDialogClose=()=>{this._clearAnimationClasses(),this._animationStateChanged.emit({state:"closed",totalTime:this._exitAnimationDuration})};_clearAnimationClasses(){this._hostElement.classList.remove(gD,vD)}_waitForAnimationToComplete(e,i){this._animationTimer!==null&&clearTimeout(this._animationTimer),this._animationTimer=setTimeout(i,e)}_requestAnimationFrame(e){this._ngZone.runOutsideAngular(()=>{typeof requestAnimationFrame=="function"?requestAnimationFrame(e):e()})}_captureInitialFocus(){this._config.delayFocusTrap||this._trapFocus()}_openAnimationDone(e){this._config.delayFocusTrap&&this._trapFocus(),this._animationStateChanged.next({state:"opened",totalTime:e})}ngOnDestroy(){super.ngOnDestroy(),this._animationTimer!==null&&clearTimeout(this._animationTimer)}attachComponentPortal(e){let i=super.attachComponentPortal(e);return i.location.nativeElement.classList.add("mat-mdc-dialog-component-host"),i}static \u0275fac=(()=>{let e;return function(r){return(e||(e=bt(t)))(r||t)}})();static \u0275cmp=H({type:t,selectors:[["mat-dialog-container"]],hostAttrs:["tabindex","-1",1,"mat-mdc-dialog-container","mdc-dialog"],hostVars:10,hostBindings:function(i,r){i&2&&(pn("id",r._config.id),K("aria-modal",r._config.ariaModal)("role",r._config.role)("aria-labelledby",r._config.ariaLabel?null:r._ariaLabelledByQueue[0])("aria-label",r._config.ariaLabel)("aria-describedby",r._config.ariaDescribedBy||null),B("_mat-animation-noopable",!r._animationsEnabled)("mat-mdc-dialog-container-with-actions",r._actionSectionCount>0))},features:[pe],decls:3,vars:0,consts:[[1,"mat-mdc-dialog-inner-container","mdc-dialog__container"],[1,"mat-mdc-dialog-surface","mdc-dialog__surface"],["cdkPortalOutlet",""]],template:function(i,r){i&1&&(g(0,"div",0)(1,"div",1),tt(2,NT,0,0,"ng-template",2),v()())},dependencies:[Zn],styles:[`.mat-mdc-dialog-container {
  width: 100%;
  height: 100%;
  display: block;
  box-sizing: border-box;
  max-height: inherit;
  min-height: inherit;
  min-width: inherit;
  max-width: inherit;
  outline: 0;
}

.cdk-overlay-pane.mat-mdc-dialog-panel {
  max-width: var(--mat-dialog-container-max-width, 560px);
  min-width: var(--mat-dialog-container-min-width, 280px);
}
@media (max-width: 599px) {
  .cdk-overlay-pane.mat-mdc-dialog-panel {
    max-width: var(--mat-dialog-container-small-max-width, calc(100vw - 32px));
  }
}

.mat-mdc-dialog-inner-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  box-sizing: border-box;
  height: 100%;
  opacity: 0;
  transition: opacity linear var(--mat-dialog-transition-duration, 0ms);
  max-height: inherit;
  min-height: inherit;
  min-width: inherit;
  max-width: inherit;
}
.mdc-dialog--closing .mat-mdc-dialog-inner-container {
  transition: opacity 75ms linear;
  transform: none;
}
.mdc-dialog--open .mat-mdc-dialog-inner-container {
  opacity: 1;
}
._mat-animation-noopable .mat-mdc-dialog-inner-container {
  transition: none;
}

.mat-mdc-dialog-surface {
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: auto;
  outline: 0;
  transform: scale(0.8);
  transition: transform var(--mat-dialog-transition-duration, 0ms) cubic-bezier(0, 0, 0.2, 1);
  max-height: inherit;
  min-height: inherit;
  min-width: inherit;
  max-width: inherit;
  box-shadow: var(--mat-dialog-container-elevation-shadow, none);
  border-radius: var(--mat-dialog-container-shape, var(--mat-sys-corner-extra-large, 4px));
  background-color: var(--mat-dialog-container-color, var(--mat-sys-surface, white));
}
[dir=rtl] .mat-mdc-dialog-surface {
  text-align: right;
}
.mdc-dialog--open .mat-mdc-dialog-surface, .mdc-dialog--closing .mat-mdc-dialog-surface {
  transform: none;
}
._mat-animation-noopable .mat-mdc-dialog-surface {
  transition: none;
}
.mat-mdc-dialog-surface::before {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border: 2px solid transparent;
  border-radius: inherit;
  content: "";
  pointer-events: none;
}

.mat-mdc-dialog-title {
  display: block;
  position: relative;
  flex-shrink: 0;
  box-sizing: border-box;
  margin: 0 0 1px;
  padding: var(--mat-dialog-headline-padding, 6px 24px 13px);
}
.mat-mdc-dialog-title::before {
  display: inline-block;
  width: 0;
  height: 40px;
  content: "";
  vertical-align: 0;
}
[dir=rtl] .mat-mdc-dialog-title {
  text-align: right;
}
.mat-mdc-dialog-container .mat-mdc-dialog-title {
  color: var(--mat-dialog-subhead-color, var(--mat-sys-on-surface, rgba(0, 0, 0, 0.87)));
  font-family: var(--mat-dialog-subhead-font, var(--mat-sys-headline-small-font, inherit));
  line-height: var(--mat-dialog-subhead-line-height, var(--mat-sys-headline-small-line-height, 1.5rem));
  font-size: var(--mat-dialog-subhead-size, var(--mat-sys-headline-small-size, 1rem));
  font-weight: var(--mat-dialog-subhead-weight, var(--mat-sys-headline-small-weight, 400));
  letter-spacing: var(--mat-dialog-subhead-tracking, var(--mat-sys-headline-small-tracking, 0.03125em));
}

.mat-mdc-dialog-content {
  display: block;
  flex-grow: 1;
  box-sizing: border-box;
  margin: 0;
  overflow: auto;
  max-height: 65vh;
}
.mat-mdc-dialog-content > :first-child {
  margin-top: 0;
}
.mat-mdc-dialog-content > :last-child {
  margin-bottom: 0;
}
.mat-mdc-dialog-container .mat-mdc-dialog-content {
  color: var(--mat-dialog-supporting-text-color, var(--mat-sys-on-surface-variant, rgba(0, 0, 0, 0.6)));
  font-family: var(--mat-dialog-supporting-text-font, var(--mat-sys-body-medium-font, inherit));
  line-height: var(--mat-dialog-supporting-text-line-height, var(--mat-sys-body-medium-line-height, 1.5rem));
  font-size: var(--mat-dialog-supporting-text-size, var(--mat-sys-body-medium-size, 1rem));
  font-weight: var(--mat-dialog-supporting-text-weight, var(--mat-sys-body-medium-weight, 400));
  letter-spacing: var(--mat-dialog-supporting-text-tracking, var(--mat-sys-body-medium-tracking, 0.03125em));
}
.mat-mdc-dialog-container .mat-mdc-dialog-content {
  padding: var(--mat-dialog-content-padding, 20px 24px);
}
.mat-mdc-dialog-container-with-actions .mat-mdc-dialog-content {
  padding: var(--mat-dialog-with-actions-content-padding, 20px 24px 0);
}
.mat-mdc-dialog-container .mat-mdc-dialog-title + .mat-mdc-dialog-content {
  padding-top: 0;
}

.mat-mdc-dialog-actions {
  display: flex;
  position: relative;
  flex-shrink: 0;
  flex-wrap: wrap;
  align-items: center;
  box-sizing: border-box;
  min-height: 52px;
  margin: 0;
  border-top: 1px solid transparent;
  padding: var(--mat-dialog-actions-padding, 16px 24px);
  justify-content: var(--mat-dialog-actions-alignment, flex-end);
}
@media (forced-colors: active) {
  .mat-mdc-dialog-actions {
    border-top-color: CanvasText;
  }
}
.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-start, .mat-mdc-dialog-actions[align=start] {
  justify-content: start;
}
.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-center, .mat-mdc-dialog-actions[align=center] {
  justify-content: center;
}
.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-end, .mat-mdc-dialog-actions[align=end] {
  justify-content: flex-end;
}
.mat-mdc-dialog-actions .mat-button-base + .mat-button-base,
.mat-mdc-dialog-actions .mat-mdc-button-base + .mat-mdc-button-base {
  margin-left: 8px;
}
[dir=rtl] .mat-mdc-dialog-actions .mat-button-base + .mat-button-base,
[dir=rtl] .mat-mdc-dialog-actions .mat-mdc-button-base + .mat-mdc-button-base {
  margin-left: 0;
  margin-right: 8px;
}

.mat-mdc-dialog-component-host {
  display: contents;
}
`],encapsulation:2})}return t})(),yD="--mat-dialog-transition-duration";function _D(t){return t==null?null:typeof t=="number"?t:t.endsWith("ms")?gn(t.substring(0,t.length-2)):t.endsWith("s")?gn(t.substring(0,t.length-1))*1e3:t==="0"?0:null}var zc=(function(t){return t[t.OPEN=0]="OPEN",t[t.CLOSING=1]="CLOSING",t[t.CLOSED=2]="CLOSED",t})(zc||{}),Xr=class{_ref;_config;_containerInstance;componentInstance;componentRef=null;disableClose;id;_afterOpened=new En(1);_beforeClosed=new En(1);_result;_closeFallbackTimeout;_state=zc.OPEN;_closeInteractionType;constructor(n,e,i){this._ref=n,this._config=e,this._containerInstance=i,this.disableClose=e.disableClose,this.id=n.id,n.addPanelClass("mat-mdc-dialog-panel"),i._animationStateChanged.pipe(Ve(r=>r.state==="opened"),Tt(1)).subscribe(()=>{this._afterOpened.next(),this._afterOpened.complete()}),i._animationStateChanged.pipe(Ve(r=>r.state==="closed"),Tt(1)).subscribe(()=>{clearTimeout(this._closeFallbackTimeout),this._finishDialogClose()}),n.overlayRef.detachments().subscribe(()=>{this._beforeClosed.next(this._result),this._beforeClosed.complete(),this._finishDialogClose()}),ho(this.backdropClick(),this.keydownEvents().pipe(Ve(r=>r.keyCode===27&&!this.disableClose&&!$n(r)))).subscribe(r=>{this.disableClose||(r.preventDefault(),LT(this,r.type==="keydown"?"keyboard":"mouse"))})}close(n){let e=this._config.closePredicate;e&&!e(n,this._config,this.componentInstance)||(this._result=n,this._containerInstance._animationStateChanged.pipe(Ve(i=>i.state==="closing"),Tt(1)).subscribe(i=>{this._beforeClosed.next(n),this._beforeClosed.complete(),this._ref.overlayRef.detachBackdrop(),this._closeFallbackTimeout=setTimeout(()=>this._finishDialogClose(),i.totalTime+100)}),this._state=zc.CLOSING,this._containerInstance._startExitAnimation())}afterOpened(){return this._afterOpened}afterClosed(){return this._ref.closed}beforeClosed(){return this._beforeClosed}backdropClick(){return this._ref.backdropClick}keydownEvents(){return this._ref.keydownEvents}updatePosition(n){let e=this._ref.config.positionStrategy;return n&&(n.left||n.right)?n.left?e.left(n.left):e.right(n.right):e.centerHorizontally(),n&&(n.top||n.bottom)?n.top?e.top(n.top):e.bottom(n.bottom):e.centerVertically(),this._ref.updatePosition(),this}updateSize(n="",e=""){return this._ref.updateSize(n,e),this}addPanelClass(n){return this._ref.addPanelClass(n),this}removePanelClass(n){return this._ref.removePanelClass(n),this}getState(){return this._state}_finishDialogClose(){this._state=zc.CLOSED,this._ref.close(this._result,{focusOrigin:this._closeInteractionType}),this.componentInstance=null}};function LT(t,n,e){return t._closeInteractionType=n,t.close(e)}var VT=new y("MatMdcDialogData"),BT=new y("mat-mdc-dialog-default-options"),jT=new y("mat-mdc-dialog-scroll-strategy",{providedIn:"root",factory:()=>{let t=u(P);return()=>Qr(t)}}),Gc=(()=>{class t{_defaultOptions=u(BT,{optional:!0});_scrollStrategy=u(jT);_parentDialog=u(t,{optional:!0,skipSelf:!0});_idGenerator=u(Re);_injector=u(P);_dialog=u(Sh);_animationsDisabled=Ie();_openDialogsAtThisLevel=[];_afterAllClosedAtThisLevel=new E;_afterOpenedAtThisLevel=new E;dialogConfigClass=$c;_dialogRefConstructor;_dialogContainerType;_dialogDataToken;get openDialogs(){return this._parentDialog?this._parentDialog.openDialogs:this._openDialogsAtThisLevel}get afterOpened(){return this._parentDialog?this._parentDialog.afterOpened:this._afterOpenedAtThisLevel}_getAfterAllClosed(){let e=this._parentDialog;return e?e._getAfterAllClosed():this._afterAllClosedAtThisLevel}afterAllClosed=fo(()=>this.openDialogs.length?this._getAfterAllClosed():this._getAfterAllClosed().pipe(Zt(void 0)));constructor(){this._dialogRefConstructor=Xr,this._dialogContainerType=PT,this._dialogDataToken=VT}open(e,i){let r;i=D(D({},this._defaultOptions||new $c),i),i.id=i.id||this._idGenerator.getId("mat-mdc-dialog-"),i.scrollStrategy=i.scrollStrategy||this._scrollStrategy();let o=this._dialog.open(e,J(D({},i),{positionStrategy:Kn(this._injector).centerHorizontally().centerVertically(),disableClose:!0,closePredicate:void 0,closeOnDestroy:!1,closeOnOverlayDetachments:!1,disableAnimations:this._animationsDisabled||i.enterAnimationDuration?.toLocaleString()==="0"||i.exitAnimationDuration?.toString()==="0",container:{type:this._dialogContainerType,providers:()=>[{provide:this.dialogConfigClass,useValue:i},{provide:ti,useValue:i}]},templateContext:()=>({dialogRef:r}),providers:(s,a,l)=>(r=new this._dialogRefConstructor(s,i,l),r.updatePosition(i?.position),[{provide:this._dialogContainerType,useValue:l},{provide:this._dialogDataToken,useValue:a.data},{provide:this._dialogRefConstructor,useValue:r}])}));return r.componentRef=o.componentRef,r.componentInstance=o.componentInstance,this.openDialogs.push(r),this.afterOpened.next(r),r.afterClosed().subscribe(()=>{let s=this.openDialogs.indexOf(r);s>-1&&(this.openDialogs.splice(s,1),this.openDialogs.length||this._getAfterAllClosed().next())}),r}closeAll(){this._closeDialogs(this.openDialogs)}getDialogById(e){return this.openDialogs.find(i=>i.id===e)}ngOnDestroy(){this._closeDialogs(this._openDialogsAtThisLevel),this._afterAllClosedAtThisLevel.complete(),this._afterOpenedAtThisLevel.complete()}_closeDialogs(e){let i=e.length;for(;i--;)e[i].close()}static \u0275fac=function(i){return new(i||t)};static \u0275prov=_({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var bD=(()=>{class t{_dialogRef=u(Xr,{optional:!0});_elementRef=u(V);_dialog=u(Gc);constructor(){}ngOnInit(){this._dialogRef||(this._dialogRef=HT(this._elementRef,this._dialog.openDialogs)),this._dialogRef&&Promise.resolve().then(()=>{this._onAdd()})}ngOnDestroy(){this._dialogRef?._containerInstance&&Promise.resolve().then(()=>{this._onRemove()})}static \u0275fac=function(i){return new(i||t)};static \u0275dir=F({type:t})}return t})(),DD=(()=>{class t extends bD{id=u(Re).getId("mat-mdc-dialog-title-");_onAdd(){this._dialogRef._containerInstance?._addAriaLabelledBy?.(this.id)}_onRemove(){this._dialogRef?._containerInstance?._removeAriaLabelledBy?.(this.id)}static \u0275fac=(()=>{let e;return function(r){return(e||(e=bt(t)))(r||t)}})();static \u0275dir=F({type:t,selectors:[["","mat-dialog-title",""],["","matDialogTitle",""]],hostAttrs:[1,"mat-mdc-dialog-title","mdc-dialog__title"],hostVars:1,hostBindings:function(i,r){i&2&&pn("id",r.id)},inputs:{id:"id"},exportAs:["matDialogTitle"],features:[pe]})}return t})(),CD=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=F({type:t,selectors:[["","mat-dialog-content",""],["mat-dialog-content"],["","matDialogContent",""]],hostAttrs:[1,"mat-mdc-dialog-content","mdc-dialog__content"],features:[ap([bh])]})}return t})(),ED=(()=>{class t extends bD{align;_onAdd(){this._dialogRef._containerInstance?._updateActionSectionCount?.(1)}_onRemove(){this._dialogRef._containerInstance?._updateActionSectionCount?.(-1)}static \u0275fac=(()=>{let e;return function(r){return(e||(e=bt(t)))(r||t)}})();static \u0275dir=F({type:t,selectors:[["","mat-dialog-actions",""],["mat-dialog-actions"],["","matDialogActions",""]],hostAttrs:[1,"mat-mdc-dialog-actions","mdc-dialog__actions"],hostVars:6,hostBindings:function(i,r){i&2&&B("mat-mdc-dialog-actions-align-start",r.align==="start")("mat-mdc-dialog-actions-align-center",r.align==="center")("mat-mdc-dialog-actions-align-end",r.align==="end")},inputs:{align:"align"},features:[pe]})}return t})();function HT(t,n){let e=t.nativeElement.parentElement;for(;e&&!e.classList.contains("mat-mdc-dialog-container");)e=e.parentElement;return e?n.find(i=>i.id===e.id):null}var Wc=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=q({type:t});static \u0275inj=z({providers:[Gc],imports:[mD,ei,Qn,Ce]})}return t})();var Ah=class{_box;_destroyed=new E;_resizeSubject=new E;_resizeObserver;_elementObservables=new Map;constructor(n){this._box=n,typeof ResizeObserver<"u"&&(this._resizeObserver=new ResizeObserver(e=>this._resizeSubject.next(e)))}observe(n){return this._elementObservables.has(n)||this._elementObservables.set(n,new X(e=>{let i=this._resizeSubject.subscribe(e);return this._resizeObserver?.observe(n,{box:this._box}),()=>{this._resizeObserver?.unobserve(n),i.unsubscribe(),this._elementObservables.delete(n)}}).pipe(Ve(e=>e.some(i=>i.target===n)),ya({bufferSize:1,refCount:!0}),Se(this._destroyed))),this._elementObservables.get(n)}destroy(){this._destroyed.next(),this._destroyed.complete(),this._resizeSubject.complete(),this._elementObservables.clear()}},xD=(()=>{class t{_cleanupErrorListener;_observers=new Map;_ngZone=u(S);constructor(){typeof ResizeObserver<"u"}ngOnDestroy(){for(let[,e]of this._observers)e.destroy();this._observers.clear(),this._cleanupErrorListener?.()}observe(e,i){let r=i?.box||"content-box";return this._observers.has(r)||this._observers.set(r,new Ah(r)),this._observers.get(r).observe(e)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=_({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var UT=["notch"],zT=["matFormFieldNotchedOutline",""],$T=["*"],ID=["iconPrefixContainer"],MD=["textPrefixContainer"],SD=["iconSuffixContainer"],TD=["textSuffixContainer"],GT=["textField"],WT=["*",[["mat-label"]],[["","matPrefix",""],["","matIconPrefix",""]],[["","matTextPrefix",""]],[["","matTextSuffix",""]],[["","matSuffix",""],["","matIconSuffix",""]],[["mat-error"],["","matError",""]],[["mat-hint",3,"align","end"]],[["mat-hint","align","end"]]],qT=["*","mat-label","[matPrefix], [matIconPrefix]","[matTextPrefix]","[matTextSuffix]","[matSuffix], [matIconSuffix]","mat-error, [matError]","mat-hint:not([align='end'])","mat-hint[align='end']"];function YT(t,n){t&1&&ie(0,"span",21)}function ZT(t,n){if(t&1&&(g(0,"label",20),ge(1,1),$(2,YT,1,0,"span",21),v()),t&2){let e=T(2);ne("floating",e._shouldLabelFloat())("monitorResize",e._hasOutline())("id",e._labelId),K("for",e._control.disableAutomaticLabeling?null:e._control.id),b(2),G(!e.hideRequiredMarker&&e._control.required?2:-1)}}function QT(t,n){if(t&1&&$(0,ZT,3,5,"label",20),t&2){let e=T();G(e._hasFloatingLabel()?0:-1)}}function XT(t,n){t&1&&ie(0,"div",7)}function KT(t,n){}function JT(t,n){if(t&1&&tt(0,KT,0,0,"ng-template",13),t&2){T(2);let e=Bn(1);ne("ngTemplateOutlet",e)}}function eA(t,n){if(t&1&&(g(0,"div",9),$(1,JT,1,1,null,13),v()),t&2){let e=T();ne("matFormFieldNotchedOutlineOpen",e._shouldLabelFloat()),b(),G(e._forceDisplayInfixLabel()?-1:1)}}function tA(t,n){t&1&&(g(0,"div",10,2),ge(2,2),v())}function nA(t,n){t&1&&(g(0,"div",11,3),ge(2,3),v())}function iA(t,n){}function rA(t,n){if(t&1&&tt(0,iA,0,0,"ng-template",13),t&2){T();let e=Bn(1);ne("ngTemplateOutlet",e)}}function oA(t,n){t&1&&(g(0,"div",14,4),ge(2,4),v())}function sA(t,n){t&1&&(g(0,"div",15,5),ge(2,5),v())}function aA(t,n){t&1&&ie(0,"div",16)}function lA(t,n){t&1&&(g(0,"div",18),ge(1,6),v())}function cA(t,n){if(t&1&&(g(0,"mat-hint",22),w(1),v()),t&2){let e=T(2);ne("id",e._hintLabelId),b(),fe(e.hintLabel)}}function dA(t,n){if(t&1&&(g(0,"div",19),$(1,cA,2,2,"mat-hint",22),ge(2,7),ie(3,"div",23),ge(4,8),v()),t&2){let e=T();b(),G(e.hintLabel?1:-1)}}var Qi=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=F({type:t,selectors:[["mat-label"]]})}return t})(),uA=new y("MatError");var ks=(()=>{class t{align="start";id=u(Re).getId("mat-mdc-hint-");static \u0275fac=function(i){return new(i||t)};static \u0275dir=F({type:t,selectors:[["mat-hint"]],hostAttrs:[1,"mat-mdc-form-field-hint","mat-mdc-form-field-bottom-align"],hostVars:4,hostBindings:function(i,r){i&2&&(pn("id",r.id),K("align",null),B("mat-mdc-form-field-hint-end",r.align==="end"))},inputs:{align:"align",id:"id"}})}return t})(),fA=new y("MatPrefix");var PD=new y("MatSuffix"),kh=(()=>{class t{set _isTextSelector(e){this._isText=!0}_isText=!1;static \u0275fac=function(i){return new(i||t)};static \u0275dir=F({type:t,selectors:[["","matSuffix",""],["","matIconSuffix",""],["","matTextSuffix",""]],inputs:{_isTextSelector:[0,"matTextSuffix","_isTextSelector"]},features:[Xe([{provide:PD,useExisting:t}])]})}return t})(),LD=new y("FloatingLabelParent"),AD=(()=>{class t{_elementRef=u(V);get floating(){return this._floating}set floating(e){this._floating=e,this.monitorResize&&this._handleResize()}_floating=!1;get monitorResize(){return this._monitorResize}set monitorResize(e){this._monitorResize=e,this._monitorResize?this._subscribeToResize():this._resizeSubscription.unsubscribe()}_monitorResize=!1;_resizeObserver=u(xD);_ngZone=u(S);_parent=u(LD);_resizeSubscription=new ye;constructor(){}ngOnDestroy(){this._resizeSubscription.unsubscribe()}getWidth(){return pA(this._elementRef.nativeElement)}get element(){return this._elementRef.nativeElement}_handleResize(){setTimeout(()=>this._parent._handleLabelResized())}_subscribeToResize(){this._resizeSubscription.unsubscribe(),this._ngZone.runOutsideAngular(()=>{this._resizeSubscription=this._resizeObserver.observe(this._elementRef.nativeElement,{box:"border-box"}).subscribe(()=>this._handleResize())})}static \u0275fac=function(i){return new(i||t)};static \u0275dir=F({type:t,selectors:[["label","matFormFieldFloatingLabel",""]],hostAttrs:[1,"mdc-floating-label","mat-mdc-floating-label"],hostVars:2,hostBindings:function(i,r){i&2&&B("mdc-floating-label--float-above",r.floating)},inputs:{floating:"floating",monitorResize:"monitorResize"}})}return t})();function pA(t){let n=t;if(n.offsetParent!==null)return n.scrollWidth;let e=n.cloneNode(!0);e.style.setProperty("position","absolute"),e.style.setProperty("transform","translate(-9999px, -9999px)"),document.documentElement.appendChild(e);let i=e.scrollWidth;return e.remove(),i}var kD="mdc-line-ripple--active",qc="mdc-line-ripple--deactivating",RD=(()=>{class t{_elementRef=u(V);_cleanupTransitionEnd;constructor(){let e=u(S),i=u(Ae);e.runOutsideAngular(()=>{this._cleanupTransitionEnd=i.listen(this._elementRef.nativeElement,"transitionend",this._handleTransitionEnd)})}activate(){let e=this._elementRef.nativeElement.classList;e.remove(qc),e.add(kD)}deactivate(){this._elementRef.nativeElement.classList.add(qc)}_handleTransitionEnd=e=>{let i=this._elementRef.nativeElement.classList,r=i.contains(qc);e.propertyName==="opacity"&&r&&i.remove(kD,qc)};ngOnDestroy(){this._cleanupTransitionEnd()}static \u0275fac=function(i){return new(i||t)};static \u0275dir=F({type:t,selectors:[["div","matFormFieldLineRipple",""]],hostAttrs:[1,"mdc-line-ripple"]})}return t})(),ND=(()=>{class t{_elementRef=u(V);_ngZone=u(S);open=!1;_notch;ngAfterViewInit(){let e=this._elementRef.nativeElement,i=e.querySelector(".mdc-floating-label");i?(e.classList.add("mdc-notched-outline--upgraded"),typeof requestAnimationFrame=="function"&&(i.style.transitionDuration="0s",this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>i.style.transitionDuration="")}))):e.classList.add("mdc-notched-outline--no-label")}_setNotchWidth(e){let i=this._notch.nativeElement;!this.open||!e?i.style.width="":i.style.width=`calc(${e}px * var(--mat-mdc-form-field-floating-label-scale, 0.75) + 9px)`}_setMaxWidth(e){this._notch.nativeElement.style.setProperty("--mat-form-field-notch-max-width",`calc(100% - ${e}px)`)}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=H({type:t,selectors:[["div","matFormFieldNotchedOutline",""]],viewQuery:function(i,r){if(i&1&&je(UT,5),i&2){let o;se(o=ae())&&(r._notch=o.first)}},hostAttrs:[1,"mdc-notched-outline"],hostVars:2,hostBindings:function(i,r){i&2&&B("mdc-notched-outline--notched",r.open)},inputs:{open:[0,"matFormFieldNotchedOutlineOpen","open"]},attrs:zT,ngContentSelectors:$T,decls:5,vars:0,consts:[["notch",""],[1,"mat-mdc-notch-piece","mdc-notched-outline__leading"],[1,"mat-mdc-notch-piece","mdc-notched-outline__notch"],[1,"mat-mdc-notch-piece","mdc-notched-outline__trailing"]],template:function(i,r){i&1&&(rt(),nt(0,"div",1),Ct(1,"div",2,0),ge(3),$t(),nt(4,"div",3))},encapsulation:2,changeDetection:0})}return t})(),Rh=(()=>{class t{value=null;stateChanges;id;placeholder;ngControl=null;focused=!1;empty=!1;shouldLabelFloat=!1;required=!1;disabled=!1;errorState=!1;controlType;autofilled;userAriaDescribedBy;disableAutomaticLabeling;describedByIds;static \u0275fac=function(i){return new(i||t)};static \u0275dir=F({type:t})}return t})();var Nh=new y("MatFormField"),hA=new y("MAT_FORM_FIELD_DEFAULT_OPTIONS"),OD="fill",mA="auto",FD="fixed",gA="translateY(-50%)",Kr=(()=>{class t{_elementRef=u(V);_changeDetectorRef=u(ot);_platform=u(re);_idGenerator=u(Re);_ngZone=u(S);_defaults=u(hA,{optional:!0});_currentDirection;_textField;_iconPrefixContainer;_textPrefixContainer;_iconSuffixContainer;_textSuffixContainer;_floatingLabel;_notchedOutline;_lineRipple;_iconPrefixContainerSignal=es("iconPrefixContainer");_textPrefixContainerSignal=es("textPrefixContainer");_iconSuffixContainerSignal=es("iconSuffixContainer");_textSuffixContainerSignal=es("textSuffixContainer");_prefixSuffixContainers=ke(()=>[this._iconPrefixContainerSignal(),this._textPrefixContainerSignal(),this._iconSuffixContainerSignal(),this._textSuffixContainerSignal()].map(e=>e?.nativeElement).filter(e=>e!==void 0));_formFieldControl;_prefixChildren;_suffixChildren;_errorChildren;_hintChildren;_labelChild=o_(Qi);get hideRequiredMarker(){return this._hideRequiredMarker}set hideRequiredMarker(e){this._hideRequiredMarker=yn(e)}_hideRequiredMarker=!1;color="primary";get floatLabel(){return this._floatLabel||this._defaults?.floatLabel||mA}set floatLabel(e){e!==this._floatLabel&&(this._floatLabel=e,this._changeDetectorRef.markForCheck())}_floatLabel;get appearance(){return this._appearanceSignal()}set appearance(e){let i=e||this._defaults?.appearance||OD;this._appearanceSignal.set(i)}_appearanceSignal=L(OD);get subscriptSizing(){return this._subscriptSizing||this._defaults?.subscriptSizing||FD}set subscriptSizing(e){this._subscriptSizing=e||this._defaults?.subscriptSizing||FD}_subscriptSizing=null;get hintLabel(){return this._hintLabel}set hintLabel(e){this._hintLabel=e,this._processHints()}_hintLabel="";_hasIconPrefix=!1;_hasTextPrefix=!1;_hasIconSuffix=!1;_hasTextSuffix=!1;_labelId=this._idGenerator.getId("mat-mdc-form-field-label-");_hintLabelId=this._idGenerator.getId("mat-mdc-hint-");_describedByIds;get _control(){return this._explicitFormFieldControl||this._formFieldControl}set _control(e){this._explicitFormFieldControl=e}_destroyed=new E;_isFocused=null;_explicitFormFieldControl;_previousControl=null;_previousControlValidatorFn=null;_stateChanges;_valueChanges;_describedByChanges;_outlineLabelOffsetResizeObserver=null;_animationsDisabled=Ie();constructor(){let e=this._defaults,i=u(at);e&&(e.appearance&&(this.appearance=e.appearance),this._hideRequiredMarker=!!e?.hideRequiredMarker,e.color&&(this.color=e.color)),Nn(()=>this._currentDirection=i.valueSignal()),this._syncOutlineLabelOffset()}ngAfterViewInit(){this._updateFocusState(),this._animationsDisabled||this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{this._elementRef.nativeElement.classList.add("mat-form-field-animations-enabled")},300)}),this._changeDetectorRef.detectChanges()}ngAfterContentInit(){this._assertFormFieldControl(),this._initializeSubscript(),this._initializePrefixAndSuffix()}ngAfterContentChecked(){this._assertFormFieldControl(),this._control!==this._previousControl&&(this._initializeControl(this._previousControl),this._control.ngControl&&this._control.ngControl.control&&(this._previousControlValidatorFn=this._control.ngControl.control.validator),this._previousControl=this._control),this._control.ngControl&&this._control.ngControl.control&&this._control.ngControl.control.validator!==this._previousControlValidatorFn&&this._changeDetectorRef.markForCheck()}ngOnDestroy(){this._outlineLabelOffsetResizeObserver?.disconnect(),this._stateChanges?.unsubscribe(),this._valueChanges?.unsubscribe(),this._describedByChanges?.unsubscribe(),this._destroyed.next(),this._destroyed.complete()}getLabelId=ke(()=>this._hasFloatingLabel()?this._labelId:null);getConnectedOverlayOrigin(){return this._textField||this._elementRef}_animateAndLockLabel(){this._hasFloatingLabel()&&(this.floatLabel="always")}_initializeControl(e){let i=this._control,r="mat-mdc-form-field-type-";e&&this._elementRef.nativeElement.classList.remove(r+e.controlType),i.controlType&&this._elementRef.nativeElement.classList.add(r+i.controlType),this._stateChanges?.unsubscribe(),this._stateChanges=i.stateChanges.subscribe(()=>{this._updateFocusState(),this._changeDetectorRef.markForCheck()}),this._describedByChanges?.unsubscribe(),this._describedByChanges=i.stateChanges.pipe(Zt([void 0,void 0]),_e(()=>[i.errorState,i.userAriaDescribedBy]),va(),Ve(([[o,s],[a,l]])=>o!==a||s!==l)).subscribe(()=>this._syncDescribedByIds()),this._valueChanges?.unsubscribe(),i.ngControl&&i.ngControl.valueChanges&&(this._valueChanges=i.ngControl.valueChanges.pipe(Se(this._destroyed)).subscribe(()=>this._changeDetectorRef.markForCheck()))}_checkPrefixAndSuffixTypes(){this._hasIconPrefix=!!this._prefixChildren.find(e=>!e._isText),this._hasTextPrefix=!!this._prefixChildren.find(e=>e._isText),this._hasIconSuffix=!!this._suffixChildren.find(e=>!e._isText),this._hasTextSuffix=!!this._suffixChildren.find(e=>e._isText)}_initializePrefixAndSuffix(){this._checkPrefixAndSuffixTypes(),ho(this._prefixChildren.changes,this._suffixChildren.changes).subscribe(()=>{this._checkPrefixAndSuffixTypes(),this._changeDetectorRef.markForCheck()})}_initializeSubscript(){this._hintChildren.changes.subscribe(()=>{this._processHints(),this._changeDetectorRef.markForCheck()}),this._errorChildren.changes.subscribe(()=>{this._syncDescribedByIds(),this._changeDetectorRef.markForCheck()}),this._validateHints(),this._syncDescribedByIds()}_assertFormFieldControl(){this._control}_updateFocusState(){let e=this._control.focused;e&&!this._isFocused?(this._isFocused=!0,this._lineRipple?.activate()):!e&&(this._isFocused||this._isFocused===null)&&(this._isFocused=!1,this._lineRipple?.deactivate()),this._elementRef.nativeElement.classList.toggle("mat-focused",e),this._textField?.nativeElement.classList.toggle("mdc-text-field--focused",e)}_syncOutlineLabelOffset(){l_({earlyRead:()=>{if(this._appearanceSignal()!=="outline")return this._outlineLabelOffsetResizeObserver?.disconnect(),null;if(globalThis.ResizeObserver){this._outlineLabelOffsetResizeObserver||=new globalThis.ResizeObserver(()=>{this._writeOutlinedLabelStyles(this._getOutlinedLabelOffset())});for(let e of this._prefixSuffixContainers())this._outlineLabelOffsetResizeObserver.observe(e,{box:"border-box"})}return this._getOutlinedLabelOffset()},write:e=>this._writeOutlinedLabelStyles(e())})}_shouldAlwaysFloat(){return this.floatLabel==="always"}_hasOutline(){return this.appearance==="outline"}_forceDisplayInfixLabel(){return!this._platform.isBrowser&&this._prefixChildren.length&&!this._shouldLabelFloat()}_hasFloatingLabel=ke(()=>!!this._labelChild());_shouldLabelFloat(){return this._hasFloatingLabel()?this._control.shouldLabelFloat||this._shouldAlwaysFloat():!1}_shouldForward(e){let i=this._control?this._control.ngControl:null;return i&&i[e]}_getSubscriptMessageType(){return this._errorChildren&&this._errorChildren.length>0&&this._control.errorState?"error":"hint"}_handleLabelResized(){this._refreshOutlineNotchWidth()}_refreshOutlineNotchWidth(){!this._hasOutline()||!this._floatingLabel||!this._shouldLabelFloat()?this._notchedOutline?._setNotchWidth(0):this._notchedOutline?._setNotchWidth(this._floatingLabel.getWidth())}_processHints(){this._validateHints(),this._syncDescribedByIds()}_validateHints(){this._hintChildren}_syncDescribedByIds(){if(this._control){let e=[];if(this._control.userAriaDescribedBy&&typeof this._control.userAriaDescribedBy=="string"&&e.push(...this._control.userAriaDescribedBy.split(" ")),this._getSubscriptMessageType()==="hint"){let o=this._hintChildren?this._hintChildren.find(a=>a.align==="start"):null,s=this._hintChildren?this._hintChildren.find(a=>a.align==="end"):null;o?e.push(o.id):this._hintLabel&&e.push(this._hintLabelId),s&&e.push(s.id)}else this._errorChildren&&e.push(...this._errorChildren.map(o=>o.id));let i=this._control.describedByIds,r;if(i){let o=this._describedByIds||e;r=e.concat(i.filter(s=>s&&!o.includes(s)))}else r=e;this._control.setDescribedByIds(r),this._describedByIds=e}}_getOutlinedLabelOffset(){if(!this._hasOutline()||!this._floatingLabel)return null;if(!this._iconPrefixContainer&&!this._textPrefixContainer)return["",null];if(!this._isAttachedToDom())return null;let e=this._iconPrefixContainer?.nativeElement,i=this._textPrefixContainer?.nativeElement,r=this._iconSuffixContainer?.nativeElement,o=this._textSuffixContainer?.nativeElement,s=e?.getBoundingClientRect().width??0,a=i?.getBoundingClientRect().width??0,l=r?.getBoundingClientRect().width??0,c=o?.getBoundingClientRect().width??0,d=this._currentDirection==="rtl"?"-1":"1",f=`${s+a}px`,p=`calc(${d} * (${f} + var(--mat-mdc-form-field-label-offset-x, 0px)))`,m=`var(--mat-mdc-form-field-label-transform, ${gA} translateX(${p}))`,C=s+a+l+c;return[m,C]}_writeOutlinedLabelStyles(e){if(e!==null){let[i,r]=e;this._floatingLabel&&(this._floatingLabel.element.style.transform=i),r!==null&&this._notchedOutline?._setMaxWidth(r)}}_isAttachedToDom(){let e=this._elementRef.nativeElement;if(e.getRootNode){let i=e.getRootNode();return i&&i!==e}return document.documentElement.contains(e)}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=H({type:t,selectors:[["mat-form-field"]],contentQueries:function(i,r,o){if(i&1&&(Vl(o,r._labelChild,Qi,5),kr(o,Rh,5)(o,fA,5)(o,PD,5)(o,uA,5)(o,ks,5)),i&2){jl();let s;se(s=ae())&&(r._formFieldControl=s.first),se(s=ae())&&(r._prefixChildren=s),se(s=ae())&&(r._suffixChildren=s),se(s=ae())&&(r._errorChildren=s),se(s=ae())&&(r._hintChildren=s)}},viewQuery:function(i,r){if(i&1&&(Bl(r._iconPrefixContainerSignal,ID,5)(r._textPrefixContainerSignal,MD,5)(r._iconSuffixContainerSignal,SD,5)(r._textSuffixContainerSignal,TD,5),je(GT,5)(ID,5)(MD,5)(SD,5)(TD,5)(AD,5)(ND,5)(RD,5)),i&2){jl(4);let o;se(o=ae())&&(r._textField=o.first),se(o=ae())&&(r._iconPrefixContainer=o.first),se(o=ae())&&(r._textPrefixContainer=o.first),se(o=ae())&&(r._iconSuffixContainer=o.first),se(o=ae())&&(r._textSuffixContainer=o.first),se(o=ae())&&(r._floatingLabel=o.first),se(o=ae())&&(r._notchedOutline=o.first),se(o=ae())&&(r._lineRipple=o.first)}},hostAttrs:[1,"mat-mdc-form-field"],hostVars:38,hostBindings:function(i,r){i&2&&B("mat-mdc-form-field-label-always-float",r._shouldAlwaysFloat())("mat-mdc-form-field-has-icon-prefix",r._hasIconPrefix)("mat-mdc-form-field-has-icon-suffix",r._hasIconSuffix)("mat-form-field-invalid",r._control.errorState)("mat-form-field-disabled",r._control.disabled)("mat-form-field-autofilled",r._control.autofilled)("mat-form-field-appearance-fill",r.appearance=="fill")("mat-form-field-appearance-outline",r.appearance=="outline")("mat-form-field-hide-placeholder",r._hasFloatingLabel()&&!r._shouldLabelFloat())("mat-primary",r.color!=="accent"&&r.color!=="warn")("mat-accent",r.color==="accent")("mat-warn",r.color==="warn")("ng-untouched",r._shouldForward("untouched"))("ng-touched",r._shouldForward("touched"))("ng-pristine",r._shouldForward("pristine"))("ng-dirty",r._shouldForward("dirty"))("ng-valid",r._shouldForward("valid"))("ng-invalid",r._shouldForward("invalid"))("ng-pending",r._shouldForward("pending"))},inputs:{hideRequiredMarker:"hideRequiredMarker",color:"color",floatLabel:"floatLabel",appearance:"appearance",subscriptSizing:"subscriptSizing",hintLabel:"hintLabel"},exportAs:["matFormField"],features:[Xe([{provide:Nh,useExisting:t},{provide:LD,useExisting:t}])],ngContentSelectors:qT,decls:18,vars:21,consts:[["labelTemplate",""],["textField",""],["iconPrefixContainer",""],["textPrefixContainer",""],["textSuffixContainer",""],["iconSuffixContainer",""],[1,"mat-mdc-text-field-wrapper","mdc-text-field",3,"click"],[1,"mat-mdc-form-field-focus-overlay"],[1,"mat-mdc-form-field-flex"],["matFormFieldNotchedOutline","",3,"matFormFieldNotchedOutlineOpen"],[1,"mat-mdc-form-field-icon-prefix"],[1,"mat-mdc-form-field-text-prefix"],[1,"mat-mdc-form-field-infix"],[3,"ngTemplateOutlet"],[1,"mat-mdc-form-field-text-suffix"],[1,"mat-mdc-form-field-icon-suffix"],["matFormFieldLineRipple",""],["aria-atomic","true","aria-live","polite",1,"mat-mdc-form-field-subscript-wrapper","mat-mdc-form-field-bottom-align"],[1,"mat-mdc-form-field-error-wrapper"],[1,"mat-mdc-form-field-hint-wrapper"],["matFormFieldFloatingLabel","",3,"floating","monitorResize","id"],["aria-hidden","true",1,"mat-mdc-form-field-required-marker","mdc-floating-label--required"],[3,"id"],[1,"mat-mdc-form-field-hint-spacer"]],template:function(i,r){if(i&1&&(rt(WT),tt(0,QT,1,1,"ng-template",null,0,Xo),g(2,"div",6,1),Q("click",function(s){return r._control.onContainerClick(s)}),$(4,XT,1,0,"div",7),g(5,"div",8),$(6,eA,2,2,"div",9),$(7,tA,3,0,"div",10),$(8,nA,3,0,"div",11),g(9,"div",12),$(10,rA,1,1,null,13),ge(11),v(),$(12,oA,3,0,"div",14),$(13,sA,3,0,"div",15),v(),$(14,aA,1,0,"div",16),v(),g(15,"div",17),$(16,lA,2,0,"div",18)(17,dA,5,1,"div",19),v()),i&2){let o;b(2),B("mdc-text-field--filled",!r._hasOutline())("mdc-text-field--outlined",r._hasOutline())("mdc-text-field--no-label",!r._hasFloatingLabel())("mdc-text-field--disabled",r._control.disabled)("mdc-text-field--invalid",r._control.errorState),b(2),G(!r._hasOutline()&&!r._control.disabled?4:-1),b(2),G(r._hasOutline()?6:-1),b(),G(r._hasIconPrefix?7:-1),b(),G(r._hasTextPrefix?8:-1),b(2),G(!r._hasOutline()||r._forceDisplayInfixLabel()?10:-1),b(2),G(r._hasTextSuffix?12:-1),b(),G(r._hasIconSuffix?13:-1),b(),G(r._hasOutline()?-1:14),b(),B("mat-mdc-form-field-subscript-dynamic-size",r.subscriptSizing==="dynamic");let s=r._getSubscriptMessageType();b(),G((o=s)==="error"?16:o==="hint"?17:-1)}},dependencies:[AD,ND,ns,RD,ks],styles:[`.mdc-text-field {
  display: inline-flex;
  align-items: baseline;
  padding: 0 16px;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  will-change: opacity, transform, color;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.mdc-text-field__input {
  width: 100%;
  min-width: 0;
  border: none;
  border-radius: 0;
  background: none;
  padding: 0;
  -moz-appearance: none;
  -webkit-appearance: none;
  height: 28px;
}
.mdc-text-field__input::-webkit-calendar-picker-indicator, .mdc-text-field__input::-webkit-search-cancel-button {
  display: none;
}
.mdc-text-field__input::-ms-clear {
  display: none;
}
.mdc-text-field__input:focus {
  outline: none;
}
.mdc-text-field__input:invalid {
  box-shadow: none;
}
.mdc-text-field__input::placeholder {
  opacity: 0;
}
.mdc-text-field__input::-moz-placeholder {
  opacity: 0;
}
.mdc-text-field__input::-webkit-input-placeholder {
  opacity: 0;
}
.mdc-text-field__input:-ms-input-placeholder {
  opacity: 0;
}
.mdc-text-field--no-label .mdc-text-field__input::placeholder, .mdc-text-field--focused .mdc-text-field__input::placeholder {
  opacity: 1;
}
.mdc-text-field--no-label .mdc-text-field__input::-moz-placeholder, .mdc-text-field--focused .mdc-text-field__input::-moz-placeholder {
  opacity: 1;
}
.mdc-text-field--no-label .mdc-text-field__input::-webkit-input-placeholder, .mdc-text-field--focused .mdc-text-field__input::-webkit-input-placeholder {
  opacity: 1;
}
.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder, .mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder {
  opacity: 1;
}
.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::placeholder {
  opacity: 0;
}
.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::-moz-placeholder {
  opacity: 0;
}
.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::-webkit-input-placeholder {
  opacity: 0;
}
.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive:-ms-input-placeholder {
  opacity: 0;
}
.mdc-text-field--outlined .mdc-text-field__input, .mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__input {
  height: 100%;
}
.mdc-text-field--outlined .mdc-text-field__input {
  display: flex;
  border: none !important;
  background-color: transparent;
}
.mdc-text-field--disabled .mdc-text-field__input {
  pointer-events: auto;
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input {
  color: var(--mat-form-field-filled-input-text-color, var(--mat-sys-on-surface));
  caret-color: var(--mat-form-field-filled-caret-color, var(--mat-sys-primary));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder {
  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::-moz-placeholder {
  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::-webkit-input-placeholder {
  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder {
  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input {
  color: var(--mat-form-field-outlined-input-text-color, var(--mat-sys-on-surface));
  caret-color: var(--mat-form-field-outlined-caret-color, var(--mat-sys-primary));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder {
  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::-moz-placeholder {
  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::-webkit-input-placeholder {
  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder {
  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input {
  caret-color: var(--mat-form-field-filled-error-caret-color, var(--mat-sys-error));
}
.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input {
  caret-color: var(--mat-form-field-outlined-error-caret-color, var(--mat-sys-error));
}
.mdc-text-field--filled.mdc-text-field--disabled .mdc-text-field__input {
  color: var(--mat-form-field-filled-disabled-input-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--outlined.mdc-text-field--disabled .mdc-text-field__input {
  color: var(--mat-form-field-outlined-disabled-input-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mdc-text-field--disabled .mdc-text-field__input {
    background-color: Window;
  }
}

.mdc-text-field--filled {
  height: 56px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  border-top-left-radius: var(--mat-form-field-filled-container-shape, var(--mat-sys-corner-extra-small));
  border-top-right-radius: var(--mat-form-field-filled-container-shape, var(--mat-sys-corner-extra-small));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) {
  background-color: var(--mat-form-field-filled-container-color, var(--mat-sys-surface-variant));
}
.mdc-text-field--filled.mdc-text-field--disabled {
  background-color: var(--mat-form-field-filled-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 4%, transparent));
}

.mdc-text-field--outlined {
  height: 56px;
  overflow: visible;
  padding-right: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)));
  padding-left: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)) + 4px);
}
[dir=rtl] .mdc-text-field--outlined {
  padding-right: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)) + 4px);
  padding-left: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)));
}

.mdc-floating-label {
  position: absolute;
  left: 0;
  transform-origin: left top;
  line-height: 1.15rem;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: text;
  overflow: hidden;
  will-change: transform;
}
[dir=rtl] .mdc-floating-label {
  right: 0;
  left: auto;
  transform-origin: right top;
  text-align: right;
}
.mdc-text-field .mdc-floating-label {
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}
.mdc-notched-outline .mdc-floating-label {
  display: inline-block;
  position: relative;
  max-width: 100%;
}
.mdc-text-field--outlined .mdc-floating-label {
  left: 4px;
  right: auto;
}
[dir=rtl] .mdc-text-field--outlined .mdc-floating-label {
  left: auto;
  right: 4px;
}
.mdc-text-field--filled .mdc-floating-label {
  left: 16px;
  right: auto;
}
[dir=rtl] .mdc-text-field--filled .mdc-floating-label {
  left: auto;
  right: 16px;
}
.mdc-text-field--disabled .mdc-floating-label {
  cursor: default;
}
@media (forced-colors: active) {
  .mdc-text-field--disabled .mdc-floating-label {
    z-index: 1;
  }
}
.mdc-text-field--filled.mdc-text-field--no-label .mdc-floating-label {
  display: none;
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-floating-label {
  color: var(--mat-form-field-filled-label-text-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label {
  color: var(--mat-form-field-filled-focus-label-text-color, var(--mat-sys-primary));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label {
  color: var(--mat-form-field-filled-hover-label-text-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled.mdc-text-field--disabled .mdc-floating-label {
  color: var(--mat-form-field-filled-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-floating-label {
  color: var(--mat-form-field-filled-error-label-text-color, var(--mat-sys-error));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mdc-floating-label {
  color: var(--mat-form-field-filled-error-focus-label-text-color, var(--mat-sys-error));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--disabled):hover .mdc-floating-label {
  color: var(--mat-form-field-filled-error-hover-label-text-color, var(--mat-sys-on-error-container));
}
.mdc-text-field--filled .mdc-floating-label {
  font-family: var(--mat-form-field-filled-label-text-font, var(--mat-sys-body-large-font));
  font-size: var(--mat-form-field-filled-label-text-size, var(--mat-sys-body-large-size));
  font-weight: var(--mat-form-field-filled-label-text-weight, var(--mat-sys-body-large-weight));
  letter-spacing: var(--mat-form-field-filled-label-text-tracking, var(--mat-sys-body-large-tracking));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-floating-label {
  color: var(--mat-form-field-outlined-label-text-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label {
  color: var(--mat-form-field-outlined-focus-label-text-color, var(--mat-sys-primary));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label {
  color: var(--mat-form-field-outlined-hover-label-text-color, var(--mat-sys-on-surface));
}
.mdc-text-field--outlined.mdc-text-field--disabled .mdc-floating-label {
  color: var(--mat-form-field-outlined-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-floating-label {
  color: var(--mat-form-field-outlined-error-label-text-color, var(--mat-sys-error));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mdc-floating-label {
  color: var(--mat-form-field-outlined-error-focus-label-text-color, var(--mat-sys-error));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--disabled):hover .mdc-floating-label {
  color: var(--mat-form-field-outlined-error-hover-label-text-color, var(--mat-sys-on-error-container));
}
.mdc-text-field--outlined .mdc-floating-label {
  font-family: var(--mat-form-field-outlined-label-text-font, var(--mat-sys-body-large-font));
  font-size: var(--mat-form-field-outlined-label-text-size, var(--mat-sys-body-large-size));
  font-weight: var(--mat-form-field-outlined-label-text-weight, var(--mat-sys-body-large-weight));
  letter-spacing: var(--mat-form-field-outlined-label-text-tracking, var(--mat-sys-body-large-tracking));
}

.mdc-floating-label--float-above {
  cursor: auto;
  transform: translateY(-106%) scale(0.75);
}
.mdc-text-field--filled .mdc-floating-label--float-above {
  transform: translateY(-106%) scale(0.75);
}
.mdc-text-field--outlined .mdc-floating-label--float-above {
  transform: translateY(-37.25px) scale(1);
  font-size: 0.75rem;
}
.mdc-notched-outline .mdc-floating-label--float-above {
  text-overflow: clip;
}
.mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  max-width: 133.3333333333%;
}
.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above, .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  transform: translateY(-34.75px) scale(0.75);
}
.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above, .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  font-size: 1rem;
}

.mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)::after {
  margin-left: 1px;
  margin-right: 0;
  content: "*";
}
[dir=rtl] .mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)::after {
  margin-left: 0;
  margin-right: 1px;
}

.mdc-notched-outline {
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  height: 100%;
  text-align: left;
  pointer-events: none;
}
[dir=rtl] .mdc-notched-outline {
  text-align: right;
}
.mdc-text-field--outlined .mdc-notched-outline {
  z-index: 1;
}

.mat-mdc-notch-piece {
  box-sizing: border-box;
  height: 100%;
  pointer-events: none;
  border: none;
  border-top: 1px solid;
  border-bottom: 1px solid;
}
.mdc-text-field--focused .mat-mdc-notch-piece {
  border-width: 2px;
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-outline-color, var(--mat-sys-outline));
  border-width: var(--mat-form-field-outlined-outline-width, 1px);
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-hover-outline-color, var(--mat-sys-on-surface));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-focus-outline-color, var(--mat-sys-primary));
}
.mdc-text-field--outlined.mdc-text-field--disabled .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-disabled-outline-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-error-outline-color, var(--mat-sys-error));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--focused):hover .mdc-notched-outline .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-error-hover-outline-color, var(--mat-sys-on-error-container));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-error-focus-outline-color, var(--mat-sys-error));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline .mat-mdc-notch-piece {
  border-width: var(--mat-form-field-outlined-focus-outline-width, 2px);
}

.mdc-notched-outline__leading {
  border-left: 1px solid;
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
  border-bottom-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
}
.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading {
  width: max(12px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)));
}
[dir=rtl] .mdc-notched-outline__leading {
  border-left: none;
  border-right: 1px solid;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
  border-top-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
  border-bottom-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
}

.mdc-notched-outline__trailing {
  flex-grow: 1;
  border-left: none;
  border-right: 1px solid;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
  border-bottom-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
}
[dir=rtl] .mdc-notched-outline__trailing {
  border-left: 1px solid;
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
  border-bottom-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
}

.mdc-notched-outline__notch {
  flex: 0 0 auto;
  width: auto;
}
.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__notch {
  max-width: min(var(--mat-form-field-notch-max-width, 100%), calc(100% - max(12px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small))) * 2));
}
.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {
  max-width: min(100%, calc(100% - max(12px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small))) * 2));
}
.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-top: 1px;
}
.mdc-text-field--focused.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-top: 2px;
}
.mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-left: 0;
  padding-right: 8px;
  border-top: none;
}
[dir=rtl] .mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-left: 8px;
  padding-right: 0;
}
.mdc-notched-outline--no-label .mdc-notched-outline__notch {
  display: none;
}

.mdc-line-ripple::before, .mdc-line-ripple::after {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-bottom-style: solid;
  content: "";
}
.mdc-line-ripple::before {
  z-index: 1;
  border-bottom-width: var(--mat-form-field-filled-active-indicator-height, 1px);
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-active-indicator-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-hover-active-indicator-color, var(--mat-sys-on-surface));
}
.mdc-text-field--filled.mdc-text-field--disabled .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-disabled-active-indicator-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-error-active-indicator-color, var(--mat-sys-error));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--focused):hover .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-error-hover-active-indicator-color, var(--mat-sys-on-error-container));
}
.mdc-line-ripple::after {
  transform: scaleX(0);
  opacity: 0;
  z-index: 2;
}
.mdc-text-field--filled .mdc-line-ripple::after {
  border-bottom-width: var(--mat-form-field-filled-focus-active-indicator-height, 2px);
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::after {
  border-bottom-color: var(--mat-form-field-filled-focus-active-indicator-color, var(--mat-sys-primary));
}
.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::after {
  border-bottom-color: var(--mat-form-field-filled-error-focus-active-indicator-color, var(--mat-sys-error));
}

.mdc-line-ripple--active::after {
  transform: scaleX(1);
  opacity: 1;
}

.mdc-line-ripple--deactivating::after {
  opacity: 0;
}

.mdc-text-field--disabled {
  pointer-events: none;
}

.mat-mdc-form-field-textarea-control {
  vertical-align: middle;
  resize: vertical;
  box-sizing: border-box;
  height: auto;
  margin: 0;
  padding: 0;
  border: none;
  overflow: auto;
}

.mat-mdc-form-field-input-control.mat-mdc-form-field-input-control {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font: inherit;
  letter-spacing: inherit;
  text-decoration: inherit;
  text-transform: inherit;
  border: none;
}

.mat-mdc-form-field .mat-mdc-floating-label.mdc-floating-label {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  line-height: normal;
  pointer-events: all;
  will-change: auto;
}

.mat-mdc-form-field:not(.mat-form-field-disabled) .mat-mdc-floating-label.mdc-floating-label {
  cursor: inherit;
}

.mdc-text-field--no-label:not(.mdc-text-field--textarea) .mat-mdc-form-field-input-control.mdc-text-field__input,
.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control {
  height: auto;
}

.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control.mdc-text-field__input[type=color] {
  height: 23px;
}

.mat-mdc-text-field-wrapper {
  height: auto;
  flex: auto;
  will-change: auto;
}

.mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper {
  padding-left: 0;
  --mat-mdc-form-field-label-offset-x: -16px;
}

.mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper {
  padding-right: 0;
}

[dir=rtl] .mat-mdc-text-field-wrapper {
  padding-left: 16px;
  padding-right: 16px;
}
[dir=rtl] .mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper {
  padding-left: 0;
}
[dir=rtl] .mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper {
  padding-right: 0;
}

.mat-form-field-disabled .mdc-text-field__input::placeholder {
  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-disabled .mdc-text-field__input::-moz-placeholder {
  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-disabled .mdc-text-field__input::-webkit-input-placeholder {
  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-disabled .mdc-text-field__input:-ms-input-placeholder {
  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}

.mat-mdc-form-field-label-always-float .mdc-text-field__input::placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
  opacity: 1;
}

.mat-mdc-text-field-wrapper .mat-mdc-form-field-infix .mat-mdc-floating-label {
  left: auto;
  right: auto;
}

.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-text-field__input {
  display: inline-block;
}

.mat-mdc-form-field .mat-mdc-text-field-wrapper.mdc-text-field .mdc-notched-outline__notch {
  padding-top: 0;
}

.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch {
  border-left: 1px solid transparent;
}

[dir=rtl] .mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch {
  border-left: none;
  border-right: 1px solid transparent;
}

.mat-mdc-form-field-infix {
  min-height: var(--mat-form-field-container-height, 56px);
  padding-top: var(--mat-form-field-filled-with-label-container-padding-top, 24px);
  padding-bottom: var(--mat-form-field-filled-with-label-container-padding-bottom, 8px);
}
.mdc-text-field--outlined .mat-mdc-form-field-infix, .mdc-text-field--no-label .mat-mdc-form-field-infix {
  padding-top: var(--mat-form-field-container-vertical-padding, 16px);
  padding-bottom: var(--mat-form-field-container-vertical-padding, 16px);
}

.mat-mdc-text-field-wrapper .mat-mdc-form-field-flex .mat-mdc-floating-label {
  top: calc(var(--mat-form-field-container-height, 56px) / 2);
}

.mdc-text-field--filled .mat-mdc-floating-label {
  display: var(--mat-form-field-filled-label-display, block);
}

.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  --mat-mdc-form-field-label-transform: translateY(calc(calc(6.75px + var(--mat-form-field-container-height, 56px) / 2) * -1))
    scale(var(--mat-mdc-form-field-floating-label-scale, 0.75));
  transform: var(--mat-mdc-form-field-label-transform);
}

@keyframes _mat-form-field-subscript-animation {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.mat-mdc-form-field-subscript-wrapper {
  box-sizing: border-box;
  width: 100%;
  position: relative;
}

.mat-mdc-form-field-hint-wrapper,
.mat-mdc-form-field-error-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 0 16px;
  opacity: 1;
  transform: translateY(0);
  animation: _mat-form-field-subscript-animation 0ms cubic-bezier(0.55, 0, 0.55, 0.2);
}

.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-hint-wrapper,
.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-error-wrapper {
  position: static;
}

.mat-mdc-form-field-bottom-align::before {
  content: "";
  display: inline-block;
  height: 16px;
}

.mat-mdc-form-field-bottom-align.mat-mdc-form-field-subscript-dynamic-size::before {
  content: unset;
}

.mat-mdc-form-field-hint-end {
  order: 1;
}

.mat-mdc-form-field-hint-wrapper {
  display: flex;
}

.mat-mdc-form-field-hint-spacer {
  flex: 1 0 1em;
}

.mat-mdc-form-field-error {
  display: block;
  color: var(--mat-form-field-error-text-color, var(--mat-sys-error));
}

.mat-mdc-form-field-subscript-wrapper,
.mat-mdc-form-field-bottom-align::before {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--mat-form-field-subscript-text-font, var(--mat-sys-body-small-font));
  line-height: var(--mat-form-field-subscript-text-line-height, var(--mat-sys-body-small-line-height));
  font-size: var(--mat-form-field-subscript-text-size, var(--mat-sys-body-small-size));
  letter-spacing: var(--mat-form-field-subscript-text-tracking, var(--mat-sys-body-small-tracking));
  font-weight: var(--mat-form-field-subscript-text-weight, var(--mat-sys-body-small-weight));
}

.mat-mdc-form-field-focus-overlay {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  opacity: 0;
  pointer-events: none;
  background-color: var(--mat-form-field-state-layer-color, var(--mat-sys-on-surface));
}
.mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-focus-overlay {
  opacity: var(--mat-form-field-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-form-field.mat-focused .mat-mdc-form-field-focus-overlay {
  opacity: var(--mat-form-field-focus-state-layer-opacity, 0);
}

select.mat-mdc-form-field-input-control {
  -moz-appearance: none;
  -webkit-appearance: none;
  background-color: transparent;
  display: inline-flex;
  box-sizing: border-box;
}
select.mat-mdc-form-field-input-control:not(:disabled) {
  cursor: pointer;
}
select.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option {
  color: var(--mat-form-field-select-option-text-color, var(--mat-sys-neutral10));
}
select.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option:disabled {
  color: var(--mat-form-field-select-disabled-option-text-color, color-mix(in srgb, var(--mat-sys-neutral10) 38%, transparent));
}

.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after {
  content: "";
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid;
  position: absolute;
  right: 0;
  top: 50%;
  margin-top: -2.5px;
  pointer-events: none;
  color: var(--mat-form-field-enabled-select-arrow-color, var(--mat-sys-on-surface-variant));
}
[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after {
  right: auto;
  left: 0;
}
.mat-mdc-form-field-type-mat-native-select.mat-focused .mat-mdc-form-field-infix::after {
  color: var(--mat-form-field-focus-select-arrow-color, var(--mat-sys-primary));
}
.mat-mdc-form-field-type-mat-native-select.mat-form-field-disabled .mat-mdc-form-field-infix::after {
  color: var(--mat-form-field-disabled-select-arrow-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control {
  padding-right: 15px;
}
[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control {
  padding-right: 0;
  padding-left: 15px;
}

@media (forced-colors: active) {
  .mat-form-field-appearance-fill .mat-mdc-text-field-wrapper {
    outline: solid 1px;
  }
}
@media (forced-colors: active) {
  .mat-form-field-appearance-fill.mat-form-field-disabled .mat-mdc-text-field-wrapper {
    outline-color: GrayText;
  }
}

@media (forced-colors: active) {
  .mat-form-field-appearance-fill.mat-focused .mat-mdc-text-field-wrapper {
    outline: dashed 3px;
  }
}

@media (forced-colors: active) {
  .mat-mdc-form-field.mat-focused .mdc-notched-outline {
    border: dashed 3px;
  }
}

.mat-mdc-form-field-input-control[type=date], .mat-mdc-form-field-input-control[type=datetime], .mat-mdc-form-field-input-control[type=datetime-local], .mat-mdc-form-field-input-control[type=month], .mat-mdc-form-field-input-control[type=week], .mat-mdc-form-field-input-control[type=time] {
  line-height: 1;
}
.mat-mdc-form-field-input-control::-webkit-datetime-edit {
  line-height: 1;
  padding: 0;
  margin-bottom: -2px;
}

.mat-mdc-form-field {
  --mat-mdc-form-field-floating-label-scale: 0.75;
  display: inline-flex;
  flex-direction: column;
  min-width: 0;
  text-align: left;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--mat-form-field-container-text-font, var(--mat-sys-body-large-font));
  line-height: var(--mat-form-field-container-text-line-height, var(--mat-sys-body-large-line-height));
  font-size: var(--mat-form-field-container-text-size, var(--mat-sys-body-large-size));
  letter-spacing: var(--mat-form-field-container-text-tracking, var(--mat-sys-body-large-tracking));
  font-weight: var(--mat-form-field-container-text-weight, var(--mat-sys-body-large-weight));
}
.mat-mdc-form-field .mdc-text-field--outlined .mdc-floating-label--float-above {
  font-size: calc(var(--mat-form-field-outlined-label-text-populated-size) * var(--mat-mdc-form-field-floating-label-scale));
}
.mat-mdc-form-field .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  font-size: var(--mat-form-field-outlined-label-text-populated-size);
}
[dir=rtl] .mat-mdc-form-field {
  text-align: right;
}

.mat-mdc-form-field-flex {
  display: inline-flex;
  align-items: baseline;
  box-sizing: border-box;
  width: 100%;
}

.mat-mdc-text-field-wrapper {
  width: 100%;
  z-index: 0;
}

.mat-mdc-form-field-icon-prefix,
.mat-mdc-form-field-icon-suffix {
  align-self: center;
  line-height: 0;
  pointer-events: auto;
  position: relative;
  z-index: 1;
}
.mat-mdc-form-field-icon-prefix > .mat-icon,
.mat-mdc-form-field-icon-suffix > .mat-icon {
  padding: 0 12px;
  box-sizing: content-box;
}

.mat-mdc-form-field-icon-prefix {
  color: var(--mat-form-field-leading-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-form-field-disabled .mat-mdc-form-field-icon-prefix {
  color: var(--mat-form-field-disabled-leading-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}

.mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-trailing-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-form-field-disabled .mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-disabled-trailing-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-invalid .mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-error-trailing-icon-color, var(--mat-sys-error));
}
.mat-form-field-invalid:not(.mat-focused):not(.mat-form-field-disabled) .mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-error-hover-trailing-icon-color, var(--mat-sys-on-error-container));
}
.mat-form-field-invalid.mat-focused .mat-mdc-text-field-wrapper .mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-error-focus-trailing-icon-color, var(--mat-sys-error));
}

.mat-mdc-form-field-icon-prefix,
[dir=rtl] .mat-mdc-form-field-icon-suffix {
  padding: 0 4px 0 0;
}

.mat-mdc-form-field-icon-suffix,
[dir=rtl] .mat-mdc-form-field-icon-prefix {
  padding: 0 0 0 4px;
}

.mat-mdc-form-field-subscript-wrapper .mat-icon,
.mat-mdc-form-field label .mat-icon {
  width: 1em;
  height: 1em;
  font-size: inherit;
}

.mat-mdc-form-field-infix {
  flex: auto;
  min-width: 0;
  width: 180px;
  position: relative;
  box-sizing: border-box;
}
.mat-mdc-form-field-infix:has(textarea[cols]) {
  width: auto;
}

.mat-mdc-form-field .mdc-notched-outline__notch {
  margin-left: -1px;
  -webkit-clip-path: inset(-9em -999em -9em 1px);
  clip-path: inset(-9em -999em -9em 1px);
}
[dir=rtl] .mat-mdc-form-field .mdc-notched-outline__notch {
  margin-left: 0;
  margin-right: -1px;
  -webkit-clip-path: inset(-9em 1px -9em -999em);
  clip-path: inset(-9em 1px -9em -999em);
}

.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-floating-label {
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input {
  transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::-moz-placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::-webkit-input-placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input:-ms-input-placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::-moz-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::-moz-placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::-webkit-input-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::-webkit-input-placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field--filled:not(.mdc-ripple-upgraded):focus .mdc-text-field__ripple::before {
  transition-duration: 75ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-line-ripple::after {
  transition: transform 180ms cubic-bezier(0.4, 0, 0.2, 1), opacity 180ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mat-mdc-form-field-hint-wrapper,
.mat-mdc-form-field.mat-form-field-animations-enabled .mat-mdc-form-field-error-wrapper {
  animation-duration: 300ms;
}

.mdc-notched-outline .mdc-floating-label {
  max-width: calc(100% + 1px);
}

.mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  max-width: calc(133.3333333333% + 1px);
}
`],encapsulation:2,changeDetection:0})}return t})();var Xi=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=q({type:t});static \u0275inj=z({imports:[ac,Kr,Ce]})}return t})();function BD(t){return Error(`Unable to find icon with the name "${t}"`)}function vA(){return Error("Could not find HttpClient for use with Angular Material icons. Please add provideHttpClient() to your providers.")}function jD(t){return Error(`The URL provided to MatIconRegistry was not trusted as a resource URL via Angular's DomSanitizer. Attempted URL was "${t}".`)}function HD(t){return Error(`The literal provided to MatIconRegistry was not trusted as safe HTML by Angular's DomSanitizer. Attempted literal was "${t}".`)}var bn=class{url;svgText;options;svgElement=null;constructor(n,e,i){this.url=n,this.svgText=e,this.options=i}},zD=(()=>{class t{_httpClient;_sanitizer;_errorHandler;_document;_svgIconConfigs=new Map;_iconSetConfigs=new Map;_cachedIconsByUrl=new Map;_inProgressUrlFetches=new Map;_fontCssClassesByAlias=new Map;_resolvers=[];_defaultFontSetClass=["material-icons","mat-ligature-font"];constructor(e,i,r,o){this._httpClient=e,this._sanitizer=i,this._errorHandler=o,this._document=r}addSvgIcon(e,i,r){return this.addSvgIconInNamespace("",e,i,r)}addSvgIconLiteral(e,i,r){return this.addSvgIconLiteralInNamespace("",e,i,r)}addSvgIconInNamespace(e,i,r,o){return this._addSvgIconConfig(e,i,new bn(r,null,o))}addSvgIconResolver(e){return this._resolvers.push(e),this}addSvgIconLiteralInNamespace(e,i,r,o){let s=this._sanitizer.sanitize(Pe.HTML,r);if(!s)throw HD(r);let a=zi(s);return this._addSvgIconConfig(e,i,new bn("",a,o))}addSvgIconSet(e,i){return this.addSvgIconSetInNamespace("",e,i)}addSvgIconSetLiteral(e,i){return this.addSvgIconSetLiteralInNamespace("",e,i)}addSvgIconSetInNamespace(e,i,r){return this._addSvgIconSetConfig(e,new bn(i,null,r))}addSvgIconSetLiteralInNamespace(e,i,r){let o=this._sanitizer.sanitize(Pe.HTML,i);if(!o)throw HD(i);let s=zi(o);return this._addSvgIconSetConfig(e,new bn("",s,r))}registerFontClassAlias(e,i=e){return this._fontCssClassesByAlias.set(e,i),this}classNameForFontAlias(e){return this._fontCssClassesByAlias.get(e)||e}setDefaultFontSetClass(...e){return this._defaultFontSetClass=e,this}getDefaultFontSetClass(){return this._defaultFontSetClass}getSvgIconFromUrl(e){let i=this._sanitizer.sanitize(Pe.RESOURCE_URL,e);if(!i)throw jD(e);let r=this._cachedIconsByUrl.get(i);return r?Ue(Yc(r)):this._loadSvgIconFromConfig(new bn(e,null)).pipe(yo(o=>this._cachedIconsByUrl.set(i,o)),_e(o=>Yc(o)))}getNamedSvgIcon(e,i=""){let r=UD(i,e),o=this._svgIconConfigs.get(r);if(o)return this._getSvgFromConfig(o);if(o=this._getIconConfigFromResolvers(i,e),o)return this._svgIconConfigs.set(r,o),this._getSvgFromConfig(o);let s=this._iconSetConfigs.get(i);return s?this._getSvgFromIconSetConfigs(e,s):uo(BD(r))}ngOnDestroy(){this._resolvers=[],this._svgIconConfigs.clear(),this._iconSetConfigs.clear(),this._cachedIconsByUrl.clear()}_getSvgFromConfig(e){return e.svgText?Ue(Yc(this._svgElementFromConfig(e))):this._loadSvgIconFromConfig(e).pipe(_e(i=>Yc(i)))}_getSvgFromIconSetConfigs(e,i){let r=this._extractIconWithNameFromAnySet(e,i);if(r)return Ue(r);let o=i.filter(s=>!s.svgText).map(s=>this._loadSvgIconSetFromConfig(s).pipe(ma(a=>{let c=`Loading icon set URL: ${this._sanitizer.sanitize(Pe.RESOURCE_URL,s.url)} failed: ${a.message}`;return this._errorHandler.handleError(new Error(c)),Ue(null)})));return po(o).pipe(_e(()=>{let s=this._extractIconWithNameFromAnySet(e,i);if(!s)throw BD(e);return s}))}_extractIconWithNameFromAnySet(e,i){for(let r=i.length-1;r>=0;r--){let o=i[r];if(o.svgText&&o.svgText.toString().indexOf(e)>-1){let s=this._svgElementFromConfig(o),a=this._extractSvgIconFromSet(s,e,o.options);if(a)return a}}return null}_loadSvgIconFromConfig(e){return this._fetchIcon(e).pipe(yo(i=>e.svgText=i),_e(()=>this._svgElementFromConfig(e)))}_loadSvgIconSetFromConfig(e){return e.svgText?Ue(null):this._fetchIcon(e).pipe(yo(i=>e.svgText=i))}_extractSvgIconFromSet(e,i,r){let o=e.querySelector(`[id="${i}"]`);if(!o)return null;let s=o.cloneNode(!0);if(s.removeAttribute("id"),s.nodeName.toLowerCase()==="svg")return this._setSvgAttributes(s,r);if(s.nodeName.toLowerCase()==="symbol")return this._setSvgAttributes(this._toSvgElement(s),r);let a=this._svgElementFromString(zi("<svg></svg>"));return a.appendChild(s),this._setSvgAttributes(a,r)}_svgElementFromString(e){let i=this._document.createElement("DIV");i.innerHTML=e;let r=i.querySelector("svg");if(!r)throw Error("<svg> tag not found");return r}_toSvgElement(e){let i=this._svgElementFromString(zi("<svg></svg>")),r=e.attributes;for(let o=0;o<r.length;o++){let{name:s,value:a}=r[o];s!=="id"&&i.setAttribute(s,a)}for(let o=0;o<e.childNodes.length;o++)e.childNodes[o].nodeType===this._document.ELEMENT_NODE&&i.appendChild(e.childNodes[o].cloneNode(!0));return i}_setSvgAttributes(e,i){return e.setAttribute("fit",""),e.setAttribute("height","100%"),e.setAttribute("width","100%"),e.setAttribute("preserveAspectRatio","xMidYMid meet"),e.setAttribute("focusable","false"),i&&i.viewBox&&e.setAttribute("viewBox",i.viewBox),e}_fetchIcon(e){let{url:i,options:r}=e,o=r?.withCredentials??!1;if(!this._httpClient)throw vA();if(i==null)throw Error(`Cannot fetch icon from URL "${i}".`);let s=this._sanitizer.sanitize(Pe.RESOURCE_URL,i);if(!s)throw jD(i);let a=this._inProgressUrlFetches.get(s);if(a)return a;let l=this._httpClient.get(s,{responseType:"text",withCredentials:o}).pipe(_e(c=>zi(c)),mo(()=>this._inProgressUrlFetches.delete(s)),go());return this._inProgressUrlFetches.set(s,l),l}_addSvgIconConfig(e,i,r){return this._svgIconConfigs.set(UD(e,i),r),this}_addSvgIconSetConfig(e,i){let r=this._iconSetConfigs.get(e);return r?r.push(i):this._iconSetConfigs.set(e,[i]),this}_svgElementFromConfig(e){if(!e.svgElement){let i=this._svgElementFromString(e.svgText);this._setSvgAttributes(i,e.options),e.svgElement=i}return e.svgElement}_getIconConfigFromResolvers(e,i){for(let r=0;r<this._resolvers.length;r++){let o=this._resolvers[r](i,e);if(o)return yA(o)?new bn(o.url,null,o.options):new bn(o,null)}}static \u0275fac=function(i){return new(i||t)(I(xt,8),I(Ui),I(k,8),I(Je))};static \u0275prov=_({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function Yc(t){return t.cloneNode(!0)}function UD(t,n){return t+":"+n}function yA(t){return!!(t.url&&t.options)}var _A=["*"],bA=new y("MAT_ICON_DEFAULT_OPTIONS"),DA=new y("mat-icon-location",{providedIn:"root",factory:()=>{let t=u(k),n=t?t.location:null;return{getPathname:()=>n?n.pathname+n.search:""}}}),$D=["clip-path","color-profile","src","cursor","fill","filter","marker","marker-start","marker-mid","marker-end","mask","stroke"],CA=$D.map(t=>`[${t}]`).join(", "),EA=/^url\(['"]?#(.*?)['"]?\)$/,ni=(()=>{class t{_elementRef=u(V);_iconRegistry=u(zD);_location=u(DA);_errorHandler=u(Je);_defaultColor;get color(){return this._color||this._defaultColor}set color(e){this._color=e}_color;inline=!1;get svgIcon(){return this._svgIcon}set svgIcon(e){e!==this._svgIcon&&(e?this._updateSvgIcon(e):this._svgIcon&&this._clearSvgElement(),this._svgIcon=e)}_svgIcon;get fontSet(){return this._fontSet}set fontSet(e){let i=this._cleanupFontValue(e);i!==this._fontSet&&(this._fontSet=i,this._updateFontIconClasses())}_fontSet;get fontIcon(){return this._fontIcon}set fontIcon(e){let i=this._cleanupFontValue(e);i!==this._fontIcon&&(this._fontIcon=i,this._updateFontIconClasses())}_fontIcon;_previousFontSetClass=[];_previousFontIconClass;_svgName=null;_svgNamespace=null;_previousPath;_elementsWithExternalReferences;_currentIconFetch=ye.EMPTY;constructor(){let e=u(new Rr("aria-hidden"),{optional:!0}),i=u(bA,{optional:!0});i&&(i.color&&(this.color=this._defaultColor=i.color),i.fontSet&&(this.fontSet=i.fontSet)),e||this._elementRef.nativeElement.setAttribute("aria-hidden","true")}_splitIconName(e){if(!e)return["",""];let i=e.split(":");switch(i.length){case 1:return["",i[0]];case 2:return i;default:throw Error(`Invalid icon name: "${e}"`)}}ngOnInit(){this._updateFontIconClasses()}ngAfterViewChecked(){let e=this._elementsWithExternalReferences;if(e&&e.size){let i=this._location.getPathname();i!==this._previousPath&&(this._previousPath=i,this._prependPathToReferences(i))}}ngOnDestroy(){this._currentIconFetch.unsubscribe(),this._elementsWithExternalReferences&&this._elementsWithExternalReferences.clear()}_usingFontIcon(){return!this.svgIcon}_setSvgElement(e){this._clearSvgElement();let i=this._location.getPathname();this._previousPath=i,this._cacheChildrenWithExternalReferences(e),this._prependPathToReferences(i),this._elementRef.nativeElement.appendChild(e)}_clearSvgElement(){let e=this._elementRef.nativeElement,i=e.childNodes.length;for(this._elementsWithExternalReferences&&this._elementsWithExternalReferences.clear();i--;){let r=e.childNodes[i];(r.nodeType!==1||r.nodeName.toLowerCase()==="svg")&&r.remove()}}_updateFontIconClasses(){if(!this._usingFontIcon())return;let e=this._elementRef.nativeElement,i=(this.fontSet?this._iconRegistry.classNameForFontAlias(this.fontSet).split(/ +/):this._iconRegistry.getDefaultFontSetClass()).filter(r=>r.length>0);this._previousFontSetClass.forEach(r=>e.classList.remove(r)),i.forEach(r=>e.classList.add(r)),this._previousFontSetClass=i,this.fontIcon!==this._previousFontIconClass&&!i.includes("mat-ligature-font")&&(this._previousFontIconClass&&e.classList.remove(this._previousFontIconClass),this.fontIcon&&e.classList.add(this.fontIcon),this._previousFontIconClass=this.fontIcon)}_cleanupFontValue(e){return typeof e=="string"?e.trim().split(" ")[0]:e}_prependPathToReferences(e){let i=this._elementsWithExternalReferences;i&&i.forEach((r,o)=>{r.forEach(s=>{o.setAttribute(s.name,`url('${e}#${s.value}')`)})})}_cacheChildrenWithExternalReferences(e){let i=e.querySelectorAll(CA),r=this._elementsWithExternalReferences=this._elementsWithExternalReferences||new Map;for(let o=0;o<i.length;o++)$D.forEach(s=>{let a=i[o],l=a.getAttribute(s),c=l?l.match(EA):null;if(c){let d=r.get(a);d||(d=[],r.set(a,d)),d.push({name:s,value:c[1]})}})}_updateSvgIcon(e){if(this._svgNamespace=null,this._svgName=null,this._currentIconFetch.unsubscribe(),e){let[i,r]=this._splitIconName(e);i&&(this._svgNamespace=i),r&&(this._svgName=r),this._currentIconFetch=this._iconRegistry.getNamedSvgIcon(r,i).pipe(Tt(1)).subscribe(o=>this._setSvgElement(o),o=>{let s=`Error retrieving icon ${i}:${r}! ${o.message}`;this._errorHandler.handleError(new Error(s))})}}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=H({type:t,selectors:[["mat-icon"]],hostAttrs:["role","img",1,"mat-icon","notranslate"],hostVars:10,hostBindings:function(i,r){i&2&&(K("data-mat-icon-type",r._usingFontIcon()?"font":"svg")("data-mat-icon-name",r._svgName||r.fontIcon)("data-mat-icon-namespace",r._svgNamespace||r.fontSet)("fontIcon",r._usingFontIcon()?r.fontIcon:null),hn(r.color?"mat-"+r.color:""),B("mat-icon-inline",r.inline)("mat-icon-no-color",r.color!=="primary"&&r.color!=="accent"&&r.color!=="warn"))},inputs:{color:"color",inline:[2,"inline","inline",he],svgIcon:"svgIcon",fontSet:"fontSet",fontIcon:"fontIcon"},exportAs:["matIcon"],ngContentSelectors:_A,decls:1,vars:0,template:function(i,r){i&1&&(rt(),ge(0))},styles:[`mat-icon, mat-icon.mat-primary, mat-icon.mat-accent, mat-icon.mat-warn {
  color: var(--mat-icon-color, inherit);
}

.mat-icon {
  -webkit-user-select: none;
  user-select: none;
  background-repeat: no-repeat;
  display: inline-block;
  fill: currentColor;
  height: 24px;
  width: 24px;
  overflow: hidden;
}
.mat-icon.mat-icon-inline {
  font-size: inherit;
  height: inherit;
  line-height: inherit;
  width: inherit;
}
.mat-icon.mat-ligature-font[fontIcon]::before {
  content: attr(fontIcon);
}

[dir=rtl] .mat-icon-rtl-mirror {
  transform: scale(-1, 1);
}

.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon,
.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon {
  display: block;
}
.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button .mat-icon,
.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button .mat-icon {
  margin: auto;
}
`],encapsulation:2,changeDetection:0})}return t})(),ii=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=q({type:t});static \u0275inj=z({imports:[Ce]})}return t})();var wA=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275cmp=H({type:t,selectors:[["ng-component"]],hostAttrs:["cdk-text-field-style-loader",""],decls:0,vars:0,template:function(i,r){},styles:[`textarea.cdk-textarea-autosize {
  resize: none;
}

textarea.cdk-textarea-autosize-measuring {
  padding: 2px 0 !important;
  box-sizing: content-box !important;
  height: auto !important;
  overflow: hidden !important;
}

textarea.cdk-textarea-autosize-measuring-firefox {
  padding: 2px 0 !important;
  box-sizing: content-box !important;
  height: 0 !important;
}

@keyframes cdk-text-field-autofill-start { /*!*/ }
@keyframes cdk-text-field-autofill-end { /*!*/ }
.cdk-text-field-autofill-monitored:-webkit-autofill {
  animation: cdk-text-field-autofill-start 0s 1ms;
}

.cdk-text-field-autofill-monitored:not(:-webkit-autofill) {
  animation: cdk-text-field-autofill-end 0s 1ms;
}
`],encapsulation:2,changeDetection:0})}return t})(),xA={passive:!0},GD=(()=>{class t{_platform=u(re);_ngZone=u(S);_renderer=u(Te).createRenderer(null,null);_styleLoader=u(Ge);_monitoredElements=new Map;constructor(){}monitor(e){if(!this._platform.isBrowser)return pi;this._styleLoader.load(wA);let i=ft(e),r=this._monitoredElements.get(i);if(r)return r.subject;let o=new E,s="cdk-text-field-autofilled",a=c=>{c.animationName==="cdk-text-field-autofill-start"&&!i.classList.contains(s)?(i.classList.add(s),this._ngZone.run(()=>o.next({target:c.target,isAutofilled:!0}))):c.animationName==="cdk-text-field-autofill-end"&&i.classList.contains(s)&&(i.classList.remove(s),this._ngZone.run(()=>o.next({target:c.target,isAutofilled:!1})))},l=this._ngZone.runOutsideAngular(()=>(i.classList.add("cdk-text-field-autofill-monitored"),this._renderer.listen(i,"animationstart",a,xA)));return this._monitoredElements.set(i,{subject:o,unlisten:l}),o}stopMonitoring(e){let i=ft(e),r=this._monitoredElements.get(i);r&&(r.unlisten(),r.subject.complete(),i.classList.remove("cdk-text-field-autofill-monitored"),i.classList.remove("cdk-text-field-autofilled"),this._monitoredElements.delete(i))}ngOnDestroy(){this._monitoredElements.forEach((e,i)=>this.stopMonitoring(i))}static \u0275fac=function(i){return new(i||t)};static \u0275prov=_({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var WD=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=q({type:t});static \u0275inj=z({})}return t})();var qD=new y("MAT_INPUT_VALUE_ACCESSOR");var YD=(()=>{class t{isErrorState(e,i){return!!(e&&e.invalid&&(e.touched||i&&i.submitted))}static \u0275fac=function(i){return new(i||t)};static \u0275prov=_({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Qc=class{_defaultMatcher;ngControl;_parentFormGroup;_parentForm;_stateChanges;errorState=!1;matcher;constructor(n,e,i,r,o){this._defaultMatcher=n,this.ngControl=e,this._parentFormGroup=i,this._parentForm=r,this._stateChanges=o}updateErrorState(){let n=this.errorState,e=this._parentFormGroup||this._parentForm,i=this.matcher||this._defaultMatcher,r=this.ngControl?this.ngControl.control:null,o=i?.isErrorState(r,e)??!1;o!==n&&(this.errorState=o,this._stateChanges.next())}};var IA=["button","checkbox","file","hidden","image","radio","range","reset","submit"],MA=new y("MAT_INPUT_CONFIG"),Xc=(()=>{class t{_elementRef=u(V);_platform=u(re);ngControl=u(qi,{optional:!0,self:!0});_autofillMonitor=u(GD);_ngZone=u(S);_formField=u(Nh,{optional:!0});_renderer=u(Ae);_uid=u(Re).getId("mat-input-");_previousNativeValue;_inputValueAccessor;_signalBasedValueAccessor;_previousPlaceholder=null;_errorStateTracker;_config=u(MA,{optional:!0});_cleanupIosKeyup;_cleanupWebkitWheel;_isServer=!1;_isNativeSelect=!1;_isTextarea=!1;_isInFormField=!1;focused=!1;stateChanges=new E;controlType="mat-input";autofilled=!1;get disabled(){return this._disabled}set disabled(e){this._disabled=yn(e),this.focused&&(this.focused=!1,this.stateChanges.next())}_disabled=!1;get id(){return this._id}set id(e){this._id=e||this._uid}_id;placeholder;name;get required(){return this._required??this.ngControl?.control?.hasValidator(_c.required)??!1}set required(e){this._required=yn(e)}_required;get type(){return this._type}set type(e){this._type=e||"text",this._validateType(),!this._isTextarea&&Yp().has(this._type)&&(this._elementRef.nativeElement.type=this._type)}_type="text";get errorStateMatcher(){return this._errorStateTracker.matcher}set errorStateMatcher(e){this._errorStateTracker.matcher=e}userAriaDescribedBy;get value(){return this._signalBasedValueAccessor?this._signalBasedValueAccessor.value():this._inputValueAccessor.value}set value(e){e!==this.value&&(this._signalBasedValueAccessor?this._signalBasedValueAccessor.value.set(e):this._inputValueAccessor.value=e,this.stateChanges.next())}get readonly(){return this._readonly}set readonly(e){this._readonly=yn(e)}_readonly=!1;disabledInteractive;get errorState(){return this._errorStateTracker.errorState}set errorState(e){this._errorStateTracker.errorState=e}_neverEmptyInputTypes=["date","datetime","datetime-local","month","time","week"].filter(e=>Yp().has(e));constructor(){let e=u(vh,{optional:!0}),i=u(Is,{optional:!0}),r=u(YD),o=u(qD,{optional:!0,self:!0}),s=this._elementRef.nativeElement,a=s.nodeName.toLowerCase();o?Pl(o.value)?this._signalBasedValueAccessor=o:this._inputValueAccessor=o:this._inputValueAccessor=s,this._previousNativeValue=this.value,this.id=this.id,this._platform.IOS&&this._ngZone.runOutsideAngular(()=>{this._cleanupIosKeyup=this._renderer.listen(s,"keyup",this._iOSKeyupListener)}),this._errorStateTracker=new Qc(r,this.ngControl,i,e,this.stateChanges),this._isServer=!this._platform.isBrowser,this._isNativeSelect=a==="select",this._isTextarea=a==="textarea",this._isInFormField=!!this._formField,this.disabledInteractive=this._config?.disabledInteractive||!1,this._isNativeSelect&&(this.controlType=s.multiple?"mat-native-select-multiple":"mat-native-select"),this._signalBasedValueAccessor&&Nn(()=>{this._signalBasedValueAccessor.value(),this.stateChanges.next()})}ngAfterViewInit(){this._platform.isBrowser&&this._autofillMonitor.monitor(this._elementRef.nativeElement).subscribe(e=>{this.autofilled=e.isAutofilled,this.stateChanges.next()})}ngOnChanges(){this.stateChanges.next()}ngOnDestroy(){this.stateChanges.complete(),this._platform.isBrowser&&this._autofillMonitor.stopMonitoring(this._elementRef.nativeElement),this._cleanupIosKeyup?.(),this._cleanupWebkitWheel?.()}ngDoCheck(){this.ngControl&&(this.updateErrorState(),this.ngControl.disabled!==null&&this.ngControl.disabled!==this.disabled&&(this.disabled=this.ngControl.disabled,this.stateChanges.next())),this._dirtyCheckNativeValue(),this._dirtyCheckPlaceholder()}focus(e){this._elementRef.nativeElement.focus(e)}updateErrorState(){this._errorStateTracker.updateErrorState()}_focusChanged(e){if(e!==this.focused){if(!this._isNativeSelect&&e&&this.disabled&&this.disabledInteractive){let i=this._elementRef.nativeElement;i.type==="number"?(i.type="text",i.setSelectionRange(0,0),i.type="number"):i.setSelectionRange(0,0)}this.focused=e,this.stateChanges.next()}}_onInput(){}_dirtyCheckNativeValue(){let e=this._elementRef.nativeElement.value;this._previousNativeValue!==e&&(this._previousNativeValue=e,this.stateChanges.next())}_dirtyCheckPlaceholder(){let e=this._getPlaceholder();if(e!==this._previousPlaceholder){let i=this._elementRef.nativeElement;this._previousPlaceholder=e,e?i.setAttribute("placeholder",e):i.removeAttribute("placeholder")}}_getPlaceholder(){return this.placeholder||null}_validateType(){IA.indexOf(this._type)>-1}_isNeverEmpty(){return this._neverEmptyInputTypes.indexOf(this._type)>-1}_isBadInput(){let e=this._elementRef.nativeElement.validity;return e&&e.badInput}get empty(){return!this._isNeverEmpty()&&!this._elementRef.nativeElement.value&&!this._isBadInput()&&!this.autofilled}get shouldLabelFloat(){if(this._isNativeSelect){let e=this._elementRef.nativeElement,i=e.options[0];return this.focused||e.multiple||!this.empty||!!(e.selectedIndex>-1&&i&&i.label)}else return this.focused&&!this.disabled||!this.empty}get describedByIds(){return this._elementRef.nativeElement.getAttribute("aria-describedby")?.split(" ")||[]}setDescribedByIds(e){let i=this._elementRef.nativeElement;e.length?i.setAttribute("aria-describedby",e.join(" ")):i.removeAttribute("aria-describedby")}onContainerClick(){this.focused||this.focus()}_isInlineSelect(){let e=this._elementRef.nativeElement;return this._isNativeSelect&&(e.multiple||e.size>1)}_iOSKeyupListener=e=>{let i=e.target;!i.value&&i.selectionStart===0&&i.selectionEnd===0&&(i.setSelectionRange(1,1),i.setSelectionRange(0,0))};_getReadonlyAttribute(){return this._isNativeSelect?null:this.readonly||this.disabled&&this.disabledInteractive?"true":null}static \u0275fac=function(i){return new(i||t)};static \u0275dir=F({type:t,selectors:[["input","matInput",""],["textarea","matInput",""],["select","matNativeControl",""],["input","matNativeControl",""],["textarea","matNativeControl",""]],hostAttrs:[1,"mat-mdc-input-element"],hostVars:21,hostBindings:function(i,r){i&1&&Q("focus",function(){return r._focusChanged(!0)})("blur",function(){return r._focusChanged(!1)})("input",function(){return r._onInput()}),i&2&&(pn("id",r.id)("disabled",r.disabled&&!r.disabledInteractive)("required",r.required),K("name",r.name||null)("readonly",r._getReadonlyAttribute())("aria-disabled",r.disabled&&r.disabledInteractive?"true":null)("aria-invalid",r.empty&&r.required?null:r.errorState)("aria-required",r.required)("id",r.id),B("mat-input-server",r._isServer)("mat-mdc-form-field-textarea-control",r._isInFormField&&r._isTextarea)("mat-mdc-form-field-input-control",r._isInFormField)("mat-mdc-input-disabled-interactive",r.disabledInteractive)("mdc-text-field__input",r._isInFormField)("mat-mdc-native-select-inline",r._isInlineSelect()))},inputs:{disabled:"disabled",id:"id",placeholder:"placeholder",name:"name",required:"required",type:"type",errorStateMatcher:"errorStateMatcher",userAriaDescribedBy:[0,"aria-describedby","userAriaDescribedBy"],value:"value",readonly:"readonly",disabledInteractive:[2,"disabledInteractive","disabledInteractive",he]},exportAs:["matInput"],features:[Xe([{provide:Rh,useExisting:t}]),_t]})}return t})(),Kc=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=q({type:t});static \u0275inj=z({imports:[Xi,Xi,WD,Ce]})}return t})();var SA=["tooltip"],TA=20;var AA=new y("mat-tooltip-scroll-strategy",{providedIn:"root",factory:()=>{let t=u(P);return()=>Bc(t,{scrollThrottle:TA})}}),kA=new y("mat-tooltip-default-options",{providedIn:"root",factory:()=>({showDelay:0,hideDelay:0,touchendHideDelay:1500})});var QD="tooltip-panel",RA={passive:!0},NA=8,OA=8,FA=24,PA=200,Rs=(()=>{class t{_elementRef=u(V);_ngZone=u(S);_platform=u(re);_ariaDescriber=u(ib);_focusMonitor=u(vn);_dir=u(at);_injector=u(P);_viewContainerRef=u(Dt);_mediaMatcher=u(jr);_document=u(k);_renderer=u(Ae);_animationsDisabled=Ie();_defaultOptions=u(kA,{optional:!0});_overlayRef=null;_tooltipInstance=null;_overlayPanelClass;_portal;_position="below";_positionAtOrigin=!1;_disabled=!1;_tooltipClass;_viewInitialized=!1;_pointerExitEventsInitialized=!1;_tooltipComponent=XD;_viewportMargin=8;_currentPosition;_cssClassPrefix="mat-mdc";_ariaDescriptionPending=!1;_dirSubscribed=!1;get position(){return this._position}set position(e){e!==this._position&&(this._position=e,this._overlayRef&&(this._updatePosition(this._overlayRef),this._tooltipInstance?.show(0),this._overlayRef.updatePosition()))}get positionAtOrigin(){return this._positionAtOrigin}set positionAtOrigin(e){this._positionAtOrigin=yn(e),this._detach(),this._overlayRef=null}get disabled(){return this._disabled}set disabled(e){let i=yn(e);this._disabled!==i&&(this._disabled=i,i?this.hide(0):this._setupPointerEnterEventsIfNeeded(),this._syncAriaDescription(this.message))}get showDelay(){return this._showDelay}set showDelay(e){this._showDelay=gn(e)}_showDelay;get hideDelay(){return this._hideDelay}set hideDelay(e){this._hideDelay=gn(e),this._tooltipInstance&&(this._tooltipInstance._mouseLeaveHideDelay=this._hideDelay)}_hideDelay;touchGestures="auto";get message(){return this._message}set message(e){let i=this._message;this._message=e!=null?String(e).trim():"",!this._message&&this._isTooltipVisible()?this.hide(0):(this._setupPointerEnterEventsIfNeeded(),this._updateTooltipMessage()),this._syncAriaDescription(i)}_message="";get tooltipClass(){return this._tooltipClass}set tooltipClass(e){this._tooltipClass=e,this._tooltipInstance&&this._setTooltipClass(this._tooltipClass)}_eventCleanups=[];_touchstartTimeout=null;_destroyed=new E;_isDestroyed=!1;constructor(){let e=this._defaultOptions;e&&(this._showDelay=e.showDelay,this._hideDelay=e.hideDelay,e.position&&(this.position=e.position),e.positionAtOrigin&&(this.positionAtOrigin=e.positionAtOrigin),e.touchGestures&&(this.touchGestures=e.touchGestures),e.tooltipClass&&(this.tooltipClass=e.tooltipClass)),this._viewportMargin=NA}ngAfterViewInit(){this._viewInitialized=!0,this._setupPointerEnterEventsIfNeeded(),this._focusMonitor.monitor(this._elementRef).pipe(Se(this._destroyed)).subscribe(e=>{e?e==="keyboard"&&this._ngZone.run(()=>this.show()):this._ngZone.run(()=>this.hide(0))})}ngOnDestroy(){let e=this._elementRef.nativeElement;this._touchstartTimeout&&clearTimeout(this._touchstartTimeout),this._overlayRef&&(this._overlayRef.dispose(),this._tooltipInstance=null),this._eventCleanups.forEach(i=>i()),this._eventCleanups.length=0,this._destroyed.next(),this._destroyed.complete(),this._isDestroyed=!0,this._ariaDescriber.removeDescription(e,this.message,"tooltip"),this._focusMonitor.stopMonitoring(e)}show(e=this.showDelay,i){if(this.disabled||!this.message||this._isTooltipVisible()){this._tooltipInstance?._cancelPendingAnimations();return}let r=this._createOverlay(i);this._detach(),this._portal=this._portal||new qt(this._tooltipComponent,this._viewContainerRef);let o=this._tooltipInstance=r.attach(this._portal).instance;o._triggerElement=this._elementRef.nativeElement,o._mouseLeaveHideDelay=this._hideDelay,o.afterHidden().pipe(Se(this._destroyed)).subscribe(()=>this._detach()),this._setTooltipClass(this._tooltipClass),this._updateTooltipMessage(),o.show(e)}hide(e=this.hideDelay){let i=this._tooltipInstance;i&&(i.isVisible()?i.hide(e):(i._cancelPendingAnimations(),this._detach()))}toggle(e){this._isTooltipVisible()?this.hide():this.show(void 0,e)}_isTooltipVisible(){return!!this._tooltipInstance&&this._tooltipInstance.isVisible()}_createOverlay(e){if(this._overlayRef){let s=this._overlayRef.getConfig().positionStrategy;if((!this.positionAtOrigin||!e)&&s._origin instanceof V)return this._overlayRef;this._detach()}let i=this._injector.get(Yi).getAncestorScrollContainers(this._elementRef),r=`${this._cssClassPrefix}-${QD}`,o=Hc(this._injector,this.positionAtOrigin?e||this._elementRef:this._elementRef).withTransformOriginOn(`.${this._cssClassPrefix}-tooltip`).withFlexibleDimensions(!1).withViewportMargin(this._viewportMargin).withScrollableContainers(i).withPopoverLocation("global");return o.positionChanges.pipe(Se(this._destroyed)).subscribe(s=>{this._updateCurrentPositionClass(s.connectionPair),this._tooltipInstance&&s.scrollableViewProperties.isOverlayClipped&&this._tooltipInstance.isVisible()&&this._ngZone.run(()=>this.hide(0))}),this._overlayRef=Jn(this._injector,{direction:this._dir,positionStrategy:o,panelClass:this._overlayPanelClass?[...this._overlayPanelClass,r]:r,scrollStrategy:this._injector.get(AA)(),disableAnimations:this._animationsDisabled,eventPredicate:this._overlayEventPredicate}),this._updatePosition(this._overlayRef),this._overlayRef.detachments().pipe(Se(this._destroyed)).subscribe(()=>this._detach()),this._overlayRef.outsidePointerEvents().pipe(Se(this._destroyed)).subscribe(()=>this._tooltipInstance?._handleBodyInteraction()),this._overlayRef.keydownEvents().pipe(Se(this._destroyed)).subscribe(s=>{s.preventDefault(),s.stopPropagation(),this._ngZone.run(()=>this.hide(0))}),this._defaultOptions?.disableTooltipInteractivity&&this._overlayRef.addPanelClass(`${this._cssClassPrefix}-tooltip-panel-non-interactive`),this._dirSubscribed||(this._dirSubscribed=!0,this._dir.change.pipe(Se(this._destroyed)).subscribe(()=>{this._overlayRef&&this._updatePosition(this._overlayRef)})),this._overlayRef}_detach(){this._overlayRef&&this._overlayRef.hasAttached()&&this._overlayRef.detach(),this._tooltipInstance=null}_updatePosition(e){let i=e.getConfig().positionStrategy,r=this._getOrigin(),o=this._getOverlayPosition();i.withPositions([this._addOffset(D(D({},r.main),o.main)),this._addOffset(D(D({},r.fallback),o.fallback))])}_addOffset(e){let i=OA,r=!this._dir||this._dir.value=="ltr";return e.originY==="top"?e.offsetY=-i:e.originY==="bottom"?e.offsetY=i:e.originX==="start"?e.offsetX=r?-i:i:e.originX==="end"&&(e.offsetX=r?i:-i),e}_getOrigin(){let e=!this._dir||this._dir.value=="ltr",i=this.position,r;i=="above"||i=="below"?r={originX:"center",originY:i=="above"?"top":"bottom"}:i=="before"||i=="left"&&e||i=="right"&&!e?r={originX:"start",originY:"center"}:(i=="after"||i=="right"&&e||i=="left"&&!e)&&(r={originX:"end",originY:"center"});let{x:o,y:s}=this._invertPosition(r.originX,r.originY);return{main:r,fallback:{originX:o,originY:s}}}_getOverlayPosition(){let e=!this._dir||this._dir.value=="ltr",i=this.position,r;i=="above"?r={overlayX:"center",overlayY:"bottom"}:i=="below"?r={overlayX:"center",overlayY:"top"}:i=="before"||i=="left"&&e||i=="right"&&!e?r={overlayX:"end",overlayY:"center"}:(i=="after"||i=="right"&&e||i=="left"&&!e)&&(r={overlayX:"start",overlayY:"center"});let{x:o,y:s}=this._invertPosition(r.overlayX,r.overlayY);return{main:r,fallback:{overlayX:o,overlayY:s}}}_updateTooltipMessage(){this._tooltipInstance&&(this._tooltipInstance.message=this.message,this._tooltipInstance._markForCheck(),$e(()=>{this._tooltipInstance&&this._overlayRef.updatePosition()},{injector:this._injector}))}_setTooltipClass(e){this._tooltipInstance&&(this._tooltipInstance.tooltipClass=e instanceof Set?Array.from(e):e,this._tooltipInstance._markForCheck())}_invertPosition(e,i){return this.position==="above"||this.position==="below"?i==="top"?i="bottom":i==="bottom"&&(i="top"):e==="end"?e="start":e==="start"&&(e="end"),{x:e,y:i}}_updateCurrentPositionClass(e){let{overlayY:i,originX:r,originY:o}=e,s;if(i==="center"?this._dir&&this._dir.value==="rtl"?s=r==="end"?"left":"right":s=r==="start"?"left":"right":s=i==="bottom"&&o==="top"?"above":"below",s!==this._currentPosition){let a=this._overlayRef;if(a){let l=`${this._cssClassPrefix}-${QD}-`;a.removePanelClass(l+this._currentPosition),a.addPanelClass(l+s)}this._currentPosition=s}}_setupPointerEnterEventsIfNeeded(){this._disabled||!this.message||!this._viewInitialized||this._eventCleanups.length||(this._isTouchPlatform()?this.touchGestures!=="off"&&(this._disableNativeGesturesIfNecessary(),this._addListener("touchstart",e=>{let i=e.targetTouches?.[0],r=i?{x:i.clientX,y:i.clientY}:void 0;this._setupPointerExitEventsIfNeeded(),this._touchstartTimeout&&clearTimeout(this._touchstartTimeout);let o=500;this._touchstartTimeout=setTimeout(()=>{this._touchstartTimeout=null,this.show(void 0,r)},this._defaultOptions?.touchLongPressShowDelay??o)})):this._addListener("mouseenter",e=>{this._setupPointerExitEventsIfNeeded();let i;e.x!==void 0&&e.y!==void 0&&(i=e),this.show(void 0,i)}))}_setupPointerExitEventsIfNeeded(){if(!this._pointerExitEventsInitialized){if(this._pointerExitEventsInitialized=!0,!this._isTouchPlatform())this._addListener("mouseleave",e=>{let i=e.relatedTarget;(!i||!this._overlayRef?.overlayElement.contains(i))&&this.hide()}),this._addListener("wheel",e=>{if(this._isTooltipVisible()){let i=this._document.elementFromPoint(e.clientX,e.clientY),r=this._elementRef.nativeElement;i!==r&&!r.contains(i)&&this.hide()}});else if(this.touchGestures!=="off"){this._disableNativeGesturesIfNecessary();let e=()=>{this._touchstartTimeout&&clearTimeout(this._touchstartTimeout),this.hide(this._defaultOptions?.touchendHideDelay)};this._addListener("touchend",e),this._addListener("touchcancel",e)}}}_addListener(e,i){this._eventCleanups.push(this._renderer.listen(this._elementRef.nativeElement,e,i,RA))}_isTouchPlatform(){let e=this._defaultOptions?.detectHoverCapability;return typeof e=="function"?!e():this._platform.IOS||this._platform.ANDROID?!0:this._platform.isBrowser?!!e&&this._mediaMatcher.matchMedia("(any-hover: none)").matches:!1}_disableNativeGesturesIfNecessary(){let e=this.touchGestures;if(e!=="off"){let i=this._elementRef.nativeElement,r=i.style;(e==="on"||i.nodeName!=="INPUT"&&i.nodeName!=="TEXTAREA")&&(r.userSelect=r.msUserSelect=r.webkitUserSelect=r.MozUserSelect="none"),(e==="on"||!i.draggable)&&(r.webkitUserDrag="none"),r.touchAction="none",r.webkitTapHighlightColor="transparent"}}_syncAriaDescription(e){this._ariaDescriptionPending||(this._ariaDescriptionPending=!0,this._ariaDescriber.removeDescription(this._elementRef.nativeElement,e,"tooltip"),this._isDestroyed||$e({write:()=>{this._ariaDescriptionPending=!1,this.message&&!this.disabled&&this._ariaDescriber.describe(this._elementRef.nativeElement,this.message,"tooltip")}},{injector:this._injector}))}_overlayEventPredicate=e=>e.type==="keydown"?this._isTooltipVisible()&&e.keyCode===27&&!$n(e):!0;static \u0275fac=function(i){return new(i||t)};static \u0275dir=F({type:t,selectors:[["","matTooltip",""]],hostAttrs:[1,"mat-mdc-tooltip-trigger"],hostVars:2,hostBindings:function(i,r){i&2&&B("mat-mdc-tooltip-disabled",r.disabled)},inputs:{position:[0,"matTooltipPosition","position"],positionAtOrigin:[0,"matTooltipPositionAtOrigin","positionAtOrigin"],disabled:[0,"matTooltipDisabled","disabled"],showDelay:[0,"matTooltipShowDelay","showDelay"],hideDelay:[0,"matTooltipHideDelay","hideDelay"],touchGestures:[0,"matTooltipTouchGestures","touchGestures"],message:[0,"matTooltip","message"],tooltipClass:[0,"matTooltipClass","tooltipClass"]},exportAs:["matTooltip"]})}return t})(),XD=(()=>{class t{_changeDetectorRef=u(ot);_elementRef=u(V);_isMultiline=!1;message;tooltipClass;_showTimeoutId;_hideTimeoutId;_triggerElement;_mouseLeaveHideDelay;_animationsDisabled=Ie();_tooltip;_closeOnInteraction=!1;_isVisible=!1;_onHide=new E;_showAnimation="mat-mdc-tooltip-show";_hideAnimation="mat-mdc-tooltip-hide";constructor(){}show(e){this._hideTimeoutId!=null&&clearTimeout(this._hideTimeoutId),this._showTimeoutId=setTimeout(()=>{this._toggleVisibility(!0),this._showTimeoutId=void 0},e)}hide(e){this._showTimeoutId!=null&&clearTimeout(this._showTimeoutId),this._hideTimeoutId=setTimeout(()=>{this._toggleVisibility(!1),this._hideTimeoutId=void 0},e)}afterHidden(){return this._onHide}isVisible(){return this._isVisible}ngOnDestroy(){this._cancelPendingAnimations(),this._onHide.complete(),this._triggerElement=null}_handleBodyInteraction(){this._closeOnInteraction&&this.hide(0)}_markForCheck(){this._changeDetectorRef.markForCheck()}_handleMouseLeave({relatedTarget:e}){(!e||!this._triggerElement.contains(e))&&(this.isVisible()?this.hide(this._mouseLeaveHideDelay):this._finalizeAnimation(!1))}_onShow(){this._isMultiline=this._isTooltipMultiline(),this._markForCheck()}_isTooltipMultiline(){let e=this._elementRef.nativeElement.getBoundingClientRect();return e.height>FA&&e.width>=PA}_handleAnimationEnd({animationName:e}){(e===this._showAnimation||e===this._hideAnimation)&&this._finalizeAnimation(e===this._showAnimation)}_cancelPendingAnimations(){this._showTimeoutId!=null&&clearTimeout(this._showTimeoutId),this._hideTimeoutId!=null&&clearTimeout(this._hideTimeoutId),this._showTimeoutId=this._hideTimeoutId=void 0}_finalizeAnimation(e){e?this._closeOnInteraction=!0:this.isVisible()||this._onHide.next()}_toggleVisibility(e){let i=this._tooltip.nativeElement,r=this._showAnimation,o=this._hideAnimation;if(i.classList.remove(e?o:r),i.classList.add(e?r:o),this._isVisible!==e&&(this._isVisible=e,this._changeDetectorRef.markForCheck()),e&&!this._animationsDisabled&&typeof getComputedStyle=="function"){let s=getComputedStyle(i);(s.getPropertyValue("animation-duration")==="0s"||s.getPropertyValue("animation-name")==="none")&&(this._animationsDisabled=!0)}e&&this._onShow(),this._animationsDisabled&&(i.classList.add("_mat-animation-noopable"),this._finalizeAnimation(e))}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=H({type:t,selectors:[["mat-tooltip-component"]],viewQuery:function(i,r){if(i&1&&je(SA,7),i&2){let o;se(o=ae())&&(r._tooltip=o.first)}},hostAttrs:["aria-hidden","true"],hostBindings:function(i,r){i&1&&Q("mouseleave",function(s){return r._handleMouseLeave(s)})},decls:4,vars:5,consts:[["tooltip",""],[1,"mdc-tooltip","mat-mdc-tooltip",3,"animationend"],[1,"mat-mdc-tooltip-surface","mdc-tooltip__surface"]],template:function(i,r){i&1&&(Ct(0,"div",1,0),Ll("animationend",function(s){return r._handleAnimationEnd(s)}),Ct(2,"div",2),w(3),$t()()),i&2&&(hn(r.tooltipClass),B("mdc-tooltip--multiline",r._isMultiline),b(3),fe(r.message))},styles:[`.mat-mdc-tooltip {
  position: relative;
  transform: scale(0);
  display: inline-flex;
}
.mat-mdc-tooltip::before {
  content: "";
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  position: absolute;
}
.mat-mdc-tooltip-panel-below .mat-mdc-tooltip::before {
  top: -8px;
}
.mat-mdc-tooltip-panel-above .mat-mdc-tooltip::before {
  bottom: -8px;
}
.mat-mdc-tooltip-panel-right .mat-mdc-tooltip::before {
  left: -8px;
}
.mat-mdc-tooltip-panel-left .mat-mdc-tooltip::before {
  right: -8px;
}
.mat-mdc-tooltip._mat-animation-noopable {
  animation: none;
  transform: scale(1);
}

.mat-mdc-tooltip-surface {
  word-break: normal;
  overflow-wrap: anywhere;
  padding: 4px 8px;
  min-width: 40px;
  max-width: 200px;
  min-height: 24px;
  max-height: 40vh;
  box-sizing: border-box;
  overflow: hidden;
  text-align: center;
  will-change: transform, opacity;
  background-color: var(--mat-tooltip-container-color, var(--mat-sys-inverse-surface));
  color: var(--mat-tooltip-supporting-text-color, var(--mat-sys-inverse-on-surface));
  border-radius: var(--mat-tooltip-container-shape, var(--mat-sys-corner-extra-small));
  font-family: var(--mat-tooltip-supporting-text-font, var(--mat-sys-body-small-font));
  font-size: var(--mat-tooltip-supporting-text-size, var(--mat-sys-body-small-size));
  font-weight: var(--mat-tooltip-supporting-text-weight, var(--mat-sys-body-small-weight));
  line-height: var(--mat-tooltip-supporting-text-line-height, var(--mat-sys-body-small-line-height));
  letter-spacing: var(--mat-tooltip-supporting-text-tracking, var(--mat-sys-body-small-tracking));
}
.mat-mdc-tooltip-surface::before {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border: 1px solid transparent;
  border-radius: inherit;
  content: "";
  pointer-events: none;
}
.mdc-tooltip--multiline .mat-mdc-tooltip-surface {
  text-align: left;
}
[dir=rtl] .mdc-tooltip--multiline .mat-mdc-tooltip-surface {
  text-align: right;
}

.mat-mdc-tooltip-panel {
  line-height: normal;
}
.mat-mdc-tooltip-panel.mat-mdc-tooltip-panel-non-interactive {
  pointer-events: none;
}

@keyframes mat-mdc-tooltip-show {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes mat-mdc-tooltip-hide {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.8);
  }
}
.mat-mdc-tooltip-show {
  animation: mat-mdc-tooltip-show 150ms cubic-bezier(0, 0, 0.2, 1) forwards;
}

.mat-mdc-tooltip-hide {
  animation: mat-mdc-tooltip-hide 75ms cubic-bezier(0.4, 0, 1, 1) forwards;
}
`],encapsulation:2,changeDetection:0})}return t})();var Jc=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=q({type:t});static \u0275inj=z({imports:[gs,ei,Ce,Ms]})}return t})();var LA=["determinateSpinner"];function VA(t,n){if(t&1&&(Ao(),g(0,"svg",11),ie(1,"circle",12),v()),t&2){let e=T();K("viewBox",e._viewBox()),b(),Gt("stroke-dasharray",e._strokeCircumference(),"px")("stroke-dashoffset",e._strokeCircumference()/2,"px")("stroke-width",e._circleStrokeWidth(),"%"),K("r",e._circleRadius())}}var BA=new y("mat-progress-spinner-default-options",{providedIn:"root",factory:()=>({diameter:JD})}),JD=100,jA=10,eC=(()=>{class t{_elementRef=u(V);_noopAnimations;get color(){return this._color||this._defaultColor}set color(e){this._color=e}_color;_defaultColor="primary";_determinateCircle;constructor(){let e=u(BA),i=Zp(),r=this._elementRef.nativeElement;this._noopAnimations=i==="di-disabled"&&!!e&&!e._forceAnimations,this.mode=r.nodeName.toLowerCase()==="mat-spinner"?"indeterminate":"determinate",!this._noopAnimations&&i==="reduced-motion"&&r.classList.add("mat-progress-spinner-reduced-motion"),e&&(e.color&&(this.color=this._defaultColor=e.color),e.diameter&&(this.diameter=e.diameter),e.strokeWidth&&(this.strokeWidth=e.strokeWidth))}mode;get value(){return this.mode==="determinate"?this._value:0}set value(e){this._value=Math.max(0,Math.min(100,e||0))}_value=0;get diameter(){return this._diameter}set diameter(e){this._diameter=e||0}_diameter=JD;get strokeWidth(){return this._strokeWidth??this.diameter/10}set strokeWidth(e){this._strokeWidth=e||0}_strokeWidth;_circleRadius(){return(this.diameter-jA)/2}_viewBox(){let e=this._circleRadius()*2+this.strokeWidth;return`0 0 ${e} ${e}`}_strokeCircumference(){return 2*Math.PI*this._circleRadius()}_strokeDashOffset(){return this.mode==="determinate"?this._strokeCircumference()*(100-this._value)/100:null}_circleStrokeWidth(){return this.strokeWidth/this.diameter*100}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=H({type:t,selectors:[["mat-progress-spinner"],["mat-spinner"]],viewQuery:function(i,r){if(i&1&&je(LA,5),i&2){let o;se(o=ae())&&(r._determinateCircle=o.first)}},hostAttrs:["role","progressbar","tabindex","-1",1,"mat-mdc-progress-spinner","mdc-circular-progress"],hostVars:18,hostBindings:function(i,r){i&2&&(K("aria-valuemin",0)("aria-valuemax",100)("aria-valuenow",r.mode==="determinate"?r.value:null)("mode",r.mode),hn("mat-"+r.color),Gt("width",r.diameter,"px")("height",r.diameter,"px")("--mat-progress-spinner-size",r.diameter+"px")("--mat-progress-spinner-active-indicator-width",r.diameter+"px"),B("_mat-animation-noopable",r._noopAnimations)("mdc-circular-progress--indeterminate",r.mode==="indeterminate"))},inputs:{color:"color",mode:"mode",value:[2,"value","value",Nr],diameter:[2,"diameter","diameter",Nr],strokeWidth:[2,"strokeWidth","strokeWidth",Nr]},exportAs:["matProgressSpinner"],decls:14,vars:11,consts:[["circle",""],["determinateSpinner",""],["aria-hidden","true",1,"mdc-circular-progress__determinate-container"],["xmlns","http://www.w3.org/2000/svg","focusable","false",1,"mdc-circular-progress__determinate-circle-graphic"],["cx","50%","cy","50%",1,"mdc-circular-progress__determinate-circle"],["aria-hidden","true",1,"mdc-circular-progress__indeterminate-container"],[1,"mdc-circular-progress__spinner-layer"],[1,"mdc-circular-progress__circle-clipper","mdc-circular-progress__circle-left"],[3,"ngTemplateOutlet"],[1,"mdc-circular-progress__gap-patch"],[1,"mdc-circular-progress__circle-clipper","mdc-circular-progress__circle-right"],["xmlns","http://www.w3.org/2000/svg","focusable","false",1,"mdc-circular-progress__indeterminate-circle-graphic"],["cx","50%","cy","50%"]],template:function(i,r){if(i&1&&(tt(0,VA,2,8,"ng-template",null,0,Xo),g(2,"div",2,1),Ao(),g(4,"svg",3),ie(5,"circle",4),v()(),Ya(),g(6,"div",5)(7,"div",6)(8,"div",7),Ar(9,8),v(),g(10,"div",9),Ar(11,8),v(),g(12,"div",10),Ar(13,8),v()()()),i&2){let o=Bn(1);b(4),K("viewBox",r._viewBox()),b(),Gt("stroke-dasharray",r._strokeCircumference(),"px")("stroke-dashoffset",r._strokeDashOffset(),"px")("stroke-width",r._circleStrokeWidth(),"%"),K("r",r._circleRadius()),b(4),ne("ngTemplateOutlet",o),b(2),ne("ngTemplateOutlet",o),b(2),ne("ngTemplateOutlet",o)}},dependencies:[ns],styles:[`.mat-mdc-progress-spinner {
  --mat-progress-spinner-animation-multiplier: 1;
  display: block;
  overflow: hidden;
  line-height: 0;
  position: relative;
  direction: ltr;
  transition: opacity 250ms cubic-bezier(0.4, 0, 0.6, 1);
}
.mat-mdc-progress-spinner circle {
  stroke-width: var(--mat-progress-spinner-active-indicator-width, 4px);
}
.mat-mdc-progress-spinner._mat-animation-noopable, .mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__determinate-circle {
  transition: none !important;
}
.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-circle-graphic,
.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__spinner-layer,
.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-container {
  animation: none !important;
}
.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-container circle {
  stroke-dasharray: 0 !important;
}
@media (forced-colors: active) {
  .mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic,
  .mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle {
    stroke: currentColor;
    stroke: CanvasText;
  }
}

.mat-progress-spinner-reduced-motion {
  --mat-progress-spinner-animation-multiplier: 1.25;
}

.mdc-circular-progress__determinate-container,
.mdc-circular-progress__indeterminate-circle-graphic,
.mdc-circular-progress__indeterminate-container,
.mdc-circular-progress__spinner-layer {
  position: absolute;
  width: 100%;
  height: 100%;
}

.mdc-circular-progress__determinate-container {
  transform: rotate(-90deg);
}
.mdc-circular-progress--indeterminate .mdc-circular-progress__determinate-container {
  opacity: 0;
}

.mdc-circular-progress__indeterminate-container {
  font-size: 0;
  letter-spacing: 0;
  white-space: nowrap;
  opacity: 0;
}
.mdc-circular-progress--indeterminate .mdc-circular-progress__indeterminate-container {
  opacity: 1;
  animation: mdc-circular-progress-container-rotate calc(1568.2352941176ms * var(--mat-progress-spinner-animation-multiplier)) linear infinite;
}

.mdc-circular-progress__determinate-circle-graphic,
.mdc-circular-progress__indeterminate-circle-graphic {
  fill: transparent;
}

.mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle,
.mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic {
  stroke: var(--mat-progress-spinner-active-indicator-color, var(--mat-sys-primary));
}
@media (forced-colors: active) {
  .mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle,
  .mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic {
    stroke: CanvasText;
  }
}

.mdc-circular-progress__determinate-circle {
  transition: stroke-dashoffset 500ms cubic-bezier(0, 0, 0.2, 1);
}

.mdc-circular-progress__gap-patch {
  position: absolute;
  top: 0;
  left: 47.5%;
  box-sizing: border-box;
  width: 5%;
  height: 100%;
  overflow: hidden;
}

.mdc-circular-progress__gap-patch .mdc-circular-progress__indeterminate-circle-graphic {
  left: -900%;
  width: 2000%;
  transform: rotate(180deg);
}
.mdc-circular-progress__circle-clipper .mdc-circular-progress__indeterminate-circle-graphic {
  width: 200%;
}
.mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic {
  left: -100%;
}
.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-left .mdc-circular-progress__indeterminate-circle-graphic {
  animation: mdc-circular-progress-left-spin calc(1333ms * var(--mat-progress-spinner-animation-multiplier)) cubic-bezier(0.4, 0, 0.2, 1) infinite both;
}
.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic {
  animation: mdc-circular-progress-right-spin calc(1333ms * var(--mat-progress-spinner-animation-multiplier)) cubic-bezier(0.4, 0, 0.2, 1) infinite both;
}

.mdc-circular-progress__circle-clipper {
  display: inline-flex;
  position: relative;
  width: 50%;
  height: 100%;
  overflow: hidden;
}

.mdc-circular-progress--indeterminate .mdc-circular-progress__spinner-layer {
  animation: mdc-circular-progress-spinner-layer-rotate calc(5332ms * var(--mat-progress-spinner-animation-multiplier)) cubic-bezier(0.4, 0, 0.2, 1) infinite both;
}

@keyframes mdc-circular-progress-container-rotate {
  to {
    transform: rotate(360deg);
  }
}
@keyframes mdc-circular-progress-spinner-layer-rotate {
  12.5% {
    transform: rotate(135deg);
  }
  25% {
    transform: rotate(270deg);
  }
  37.5% {
    transform: rotate(405deg);
  }
  50% {
    transform: rotate(540deg);
  }
  62.5% {
    transform: rotate(675deg);
  }
  75% {
    transform: rotate(810deg);
  }
  87.5% {
    transform: rotate(945deg);
  }
  100% {
    transform: rotate(1080deg);
  }
}
@keyframes mdc-circular-progress-left-spin {
  from {
    transform: rotate(265deg);
  }
  50% {
    transform: rotate(130deg);
  }
  to {
    transform: rotate(265deg);
  }
}
@keyframes mdc-circular-progress-right-spin {
  from {
    transform: rotate(-265deg);
  }
  50% {
    transform: rotate(-130deg);
  }
  to {
    transform: rotate(-265deg);
  }
}
`],encapsulation:2,changeDetection:0})}return t})();var tC=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=q({type:t});static \u0275inj=z({imports:[Ce]})}return t})();var ed=class t{constructor(n){this.http=n}getSettings(){return this.http.get("/api/settings")}updateSettings(n){return this.http.put("/api/settings",n)}static \u0275fac=function(e){return new(e||t)(I(xt))};static \u0275prov=_({token:t,factory:t.\u0275fac,providedIn:"root"})};var zA=(t,n)=>n.title,$A=(t,n)=>n.key;function GA(t,n){t&1&&(g(0,"div",3),ie(1,"mat-spinner",10),g(2,"span"),w(3,"Loading settings\u2026"),v()())}function WA(t,n){if(t&1){let e=it();g(0,"button",17),Q("click",function(){Ze(e);let r=T().$implicit,o=T(3);return Qe(o.toggleReveal(r.key))}),g(1,"mat-icon"),w(2),v()()}if(t&2){let e=T().$implicit,i=T(3);ne("matTooltip",i.isRevealed(e.key)?"Hide":"Show"),K("aria-label",i.isRevealed(e.key)?"Hide value":"Show value"),b(2),fe(i.isRevealed(e.key)?"visibility_off":"visibility")}}function qA(t,n){if(t&1&&(g(0,"mat-form-field",14)(1,"mat-label"),w(2),v(),ie(3,"input",15),$(4,WA,3,3,"button",16),g(5,"mat-hint"),w(6,"Leave blank to use environment variable or default"),v()()),t&2){let e=n.$implicit,i=T(3);b(2),fe(e.label),b(),ne("type",i.fieldType(e))("formControlName",e.key)("placeholder",e.placeholder??""),b(),G(e.type==="password"?4:-1)}}function YA(t,n){if(t&1&&(g(0,"section",12)(1,"h3",13),w(2),v(),Ln(3,qA,7,5,"mat-form-field",14,$A),v()),t&2){let e=n.$implicit;b(2),fe(e.title),b(),Vn(e.fields)}}function ZA(t,n){if(t&1&&(g(0,"form",11),Q("submit",function(i){return i.preventDefault()}),Ln(1,YA,5,1,"section",12,zA),v()),t&2){let e=T();ne("formGroup",e.form),b(),Vn(e.groups)}}function QA(t,n){if(t&1&&(g(0,"p",5),w(1),v()),t&2){let e=T();b(),fe(e.saveError())}}function XA(t,n){t&1&&ie(0,"mat-spinner",9)}var nC=[{title:"Gemini (Cosmic Voice)",fields:[{key:"GEMINI_API_KEY",label:"API Key",type:"password",placeholder:"Gemini API key"},{key:"GEMINI_MODEL",label:"Model",type:"text",placeholder:"e.g. gemini-2.5-pro"},{key:"GEMINI_BASE_URL",label:"Base URL",type:"text",placeholder:"https://generativelanguage.googleapis.com"}]},{title:"Ollama (Inner Voices)",fields:[{key:"OLLAMA_BASE_URL",label:"Base URL",type:"text",placeholder:"http://localhost:11434"},{key:"OLLAMA_WHISPER_MODEL",label:"Inner Whisper model",type:"text",placeholder:"llama3.1:8b"},{key:"OLLAMA_SHOUT_MODEL",label:"Inner Shout model",type:"text",placeholder:"gemma4:e4b"}]},{title:"Last.fm (Album art)",fields:[{key:"LASTFM_API_KEY",label:"API Key",type:"password",placeholder:"Last.fm read API key"},{key:"LASTFM_BASE_URL",label:"Base URL",type:"text",placeholder:"https://ws.audioscrobbler.com/2.0/"}]},{title:"Clementine",fields:[{key:"CLEMENTINE_DB_PATH",label:"Database path",type:"text",placeholder:"Path to clementine.db copy"},{key:"CLEMENTINE_EXE_PATH",label:"Executable path",type:"text",placeholder:"Path to clementine.exe"},{key:"CLEMENTINE_MATCH_THRESHOLD",label:"Match threshold",type:"number",placeholder:"0.75"}]},{title:"Recommendations",fields:[{key:"RECOMMENDATION_MIN_TRACKS",label:"Min tracks",type:"number",placeholder:"10"},{key:"RECOMMENDATION_MAX_TRACKS",label:"Max tracks",type:"number",placeholder:"20"},{key:"RECOMMENDATION_SUGGESTION_CACHE_MINUTES",label:"Suggestion cache (min)",type:"number",placeholder:"60"}]},{title:"Session memory",fields:[{key:"SESSION_MEMORY_SIZE",label:"Memory size (replies)",type:"number",placeholder:"25"},{key:"SESSION_DEFAULT_TRACK_DURATION_SECONDS",label:"Default track duration (s)",type:"number",placeholder:"210"}]}],td=class t{constructor(n,e,i){this.fb=n;this.settingsService=e;this.dialogRef=i}form;loading=L(!0);saving=L(!1);saveError=L(null);groups=nC;revealed=L({});ngOnInit(){let n={};for(let e of nC)for(let i of e.fields)n[i.key]="";this.form=this.fb.group(n),this.settingsService.getSettings().subscribe({next:e=>{for(let i of e.settings)this.form.contains(i.key)&&this.form.get(i.key)?.setValue(i.value??"");this.loading.set(!1)},error:()=>{this.loading.set(!1)}})}isRevealed(n){return this.revealed()[n]??!1}toggleReveal(n){this.revealed.update(e=>J(D({},e),{[n]:!e[n]}))}fieldType(n){return n.type==="password"?this.isRevealed(n.key)?"text":"password":(n.type==="number","text")}save(){if(this.saving())return;this.saving.set(!0),this.saveError.set(null);let n={},e=this.form.value;for(let i of Object.keys(e))n[i]=e[i].trim()===""?null:e[i].trim();this.settingsService.updateSettings({settings:n}).subscribe({next:()=>{this.saving.set(!1),this.dialogRef.close(!0)},error:()=>{this.saving.set(!1),this.saveError.set("Could not save settings. Please try again.")}})}cancel(){this.dialogRef.close(!1)}static \u0275fac=function(e){return new(e||t)(W(qb),W(ed),W(Xr))};static \u0275cmp=H({type:t,selectors:[["app-settings-modal"]],decls:14,vars:5,consts:[["mat-dialog-title","",1,"settings-title"],["aria-hidden","true"],[1,"settings-content"],["role","status",1,"settings-loading"],[1,"settings-form",3,"formGroup"],["role","alert",1,"settings-error"],["align","end",1,"settings-actions"],["mat-button","","type","button",3,"click","disabled"],["mat-flat-button","","color","primary","type","button",3,"click","disabled"],["diameter","18",1,"btn-spinner"],["diameter","36"],[1,"settings-form",3,"submit","formGroup"],[1,"settings-group"],[1,"settings-group-title"],["appearance","outline",1,"settings-field"],["matInput","","autocomplete","off","spellcheck","false",3,"type","formControlName","placeholder"],["matSuffix","","mat-icon-button","","type","button",3,"matTooltip"],["matSuffix","","mat-icon-button","","type","button",3,"click","matTooltip"]],template:function(e,i){e&1&&(g(0,"h2",0)(1,"mat-icon",1),w(2,"settings"),v(),w(3,` Settings
`),v(),g(4,"mat-dialog-content",2),$(5,GA,4,0,"div",3)(6,ZA,3,1,"form",4),$(7,QA,2,1,"p",5),v(),g(8,"mat-dialog-actions",6)(9,"button",7),Q("click",function(){return i.cancel()}),w(10,"Cancel"),v(),g(11,"button",8),Q("click",function(){return i.save()}),$(12,XA,1,0,"mat-spinner",9),w(13," Save "),v()()),e&2&&(b(5),G(i.loading()?5:6),b(2),G(i.saveError()?7:-1),b(2),ne("disabled",i.saving()),b(2),ne("disabled",i.loading()||i.saving()),b(),G(i.saving()?12:-1))},dependencies:[Yb,Gb,Sc,Vb,Bb,Is,yh,_n,zr,Wi,Wc,DD,ED,CD,Xi,Kr,Qi,ks,kh,ii,ni,Kc,Xc,tC,eC,Jc,Rs],styles:[".settings-title[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;font-family:var(--reco-font);font-size:1.1rem;color:var(--reco-primary)}.settings-title[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:1.2rem;width:1.2rem;height:1.2rem}.settings-content[_ngcontent-%COMP%]{min-width:520px;max-width:600px;max-height:70vh;padding:8px 24px}.settings-loading[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;gap:12px;padding:32px 0;color:var(--reco-text-muted);font-size:.9rem}.settings-form[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:20px}.settings-group[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:8px}.settings-group-title[_ngcontent-%COMP%]{font-family:var(--reco-font);font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--reco-text-muted);margin:0 0 4px;padding-bottom:4px;border-bottom:1px solid var(--reco-border)}.settings-field[_ngcontent-%COMP%]{width:100%}.settings-actions[_ngcontent-%COMP%]{padding:12px 24px 16px;gap:8px}.settings-error[_ngcontent-%COMP%]{color:var(--reco-error);font-size:.85rem;margin:8px 0 0}.btn-spinner[_ngcontent-%COMP%]{display:inline-block;margin-right:6px;vertical-align:middle}"]})};function KA(t,n){if(t&1){let e=it();g(0,"div",1)(1,"button",2),Q("click",function(){Ze(e);let r=T();return Qe(r.action())}),w(2),v()()}if(t&2){let e=T();b(2),nn(" ",e.data.action," ")}}var JA=["label"];function ek(t,n){}var tk=Math.pow(2,31)-1,Ns=class{_overlayRef;instance;containerInstance;_afterDismissed=new E;_afterOpened=new E;_onAction=new E;_durationTimeoutId;_dismissedByAction=!1;constructor(n,e){this._overlayRef=e,this.containerInstance=n,n._onExit.subscribe(()=>this._finishDismiss())}dismiss(){this._afterDismissed.closed||this.containerInstance.exit(),clearTimeout(this._durationTimeoutId)}dismissWithAction(){this._onAction.closed||(this._dismissedByAction=!0,this._onAction.next(),this._onAction.complete(),this.dismiss()),clearTimeout(this._durationTimeoutId)}closeWithAction(){this.dismissWithAction()}_dismissAfter(n){this._durationTimeoutId=setTimeout(()=>this.dismiss(),Math.min(n,tk))}_open(){this._afterOpened.closed||(this._afterOpened.next(),this._afterOpened.complete())}_finishDismiss(){this._overlayRef.dispose(),this._onAction.closed||this._onAction.complete(),this._afterDismissed.next({dismissedByAction:this._dismissedByAction}),this._afterDismissed.complete(),this._dismissedByAction=!1}afterDismissed(){return this._afterDismissed}afterOpened(){return this.containerInstance._onEnter}onAction(){return this._onAction}},iC=new y("MatSnackBarData"),Jr=class{politeness="polite";announcementMessage="";viewContainerRef;duration=0;panelClass;direction;data=null;horizontalPosition="center";verticalPosition="bottom"},nk=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=F({type:t,selectors:[["","matSnackBarLabel",""]],hostAttrs:[1,"mat-mdc-snack-bar-label","mdc-snackbar__label"]})}return t})(),ik=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=F({type:t,selectors:[["","matSnackBarActions",""]],hostAttrs:[1,"mat-mdc-snack-bar-actions","mdc-snackbar__actions"]})}return t})(),rk=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=F({type:t,selectors:[["","matSnackBarAction",""]],hostAttrs:[1,"mat-mdc-snack-bar-action","mdc-snackbar__action"]})}return t})(),ok=(()=>{class t{snackBarRef=u(Ns);data=u(iC);constructor(){}action(){this.snackBarRef.dismissWithAction()}get hasAction(){return!!this.data.action}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=H({type:t,selectors:[["simple-snack-bar"]],hostAttrs:[1,"mat-mdc-simple-snack-bar"],exportAs:["matSnackBar"],decls:3,vars:2,consts:[["matSnackBarLabel",""],["matSnackBarActions",""],["matButton","","matSnackBarAction","",3,"click"]],template:function(i,r){i&1&&(g(0,"div",0),w(1),v(),$(2,KA,3,1,"div",1)),i&2&&(b(),nn(" ",r.data.message,`
`),b(),G(r.hasAction?2:-1))},dependencies:[zr,nk,ik,rk],styles:[`.mat-mdc-simple-snack-bar {
  display: flex;
}
.mat-mdc-simple-snack-bar .mat-mdc-snack-bar-label {
  max-height: 50vh;
  overflow: auto;
}
`],encapsulation:2,changeDetection:0})}return t})(),Oh="_mat-snack-bar-enter",Fh="_mat-snack-bar-exit",sk=(()=>{class t extends Yn{_ngZone=u(S);_elementRef=u(V);_changeDetectorRef=u(ot);_platform=u(re);_animationsDisabled=Ie();snackBarConfig=u(Jr);_document=u(k);_trackedModals=new Set;_enterFallback;_exitFallback;_injector=u(P);_announceDelay=150;_announceTimeoutId;_destroyed=!1;_portalOutlet;_onAnnounce=new E;_onExit=new E;_onEnter=new E;_animationState="void";_live;_label;_role;_liveElementId=u(Re).getId("mat-snack-bar-container-live-");constructor(){super();let e=this.snackBarConfig;e.politeness==="assertive"&&!e.announcementMessage?this._live="assertive":e.politeness==="off"?this._live="off":this._live="polite",this._platform.FIREFOX&&(this._live==="polite"&&(this._role="status"),this._live==="assertive"&&(this._role="alert"))}attachComponentPortal(e){this._assertNotAttached();let i=this._portalOutlet.attachComponentPortal(e);return this._afterPortalAttached(),i}attachTemplatePortal(e){this._assertNotAttached();let i=this._portalOutlet.attachTemplatePortal(e);return this._afterPortalAttached(),i}attachDomPortal=e=>{this._assertNotAttached();let i=this._portalOutlet.attachDomPortal(e);return this._afterPortalAttached(),i};onAnimationEnd(e){e===Fh?this._completeExit():e===Oh&&(clearTimeout(this._enterFallback),this._ngZone.run(()=>{this._onEnter.next(),this._onEnter.complete()}))}enter(){this._destroyed||(this._animationState="visible",this._changeDetectorRef.markForCheck(),this._changeDetectorRef.detectChanges(),this._screenReaderAnnounce(),this._animationsDisabled?$e(()=>{this._ngZone.run(()=>queueMicrotask(()=>this.onAnimationEnd(Oh)))},{injector:this._injector}):(clearTimeout(this._enterFallback),this._enterFallback=setTimeout(()=>{this._elementRef.nativeElement.classList.add("mat-snack-bar-fallback-visible"),this.onAnimationEnd(Oh)},200)))}exit(){return this._destroyed?Ue(void 0):(this._ngZone.run(()=>{this._animationState="hidden",this._changeDetectorRef.markForCheck(),this._elementRef.nativeElement.setAttribute("mat-exit",""),clearTimeout(this._announceTimeoutId),this._animationsDisabled?$e(()=>{this._ngZone.run(()=>queueMicrotask(()=>this.onAnimationEnd(Fh)))},{injector:this._injector}):(clearTimeout(this._exitFallback),this._exitFallback=setTimeout(()=>this.onAnimationEnd(Fh),200))}),this._onExit)}ngOnDestroy(){this._destroyed=!0,this._clearFromModals(),this._completeExit()}_completeExit(){clearTimeout(this._exitFallback),queueMicrotask(()=>{this._onExit.next(),this._onExit.complete()})}_afterPortalAttached(){let e=this._elementRef.nativeElement,i=this.snackBarConfig.panelClass;i&&(Array.isArray(i)?i.forEach(s=>e.classList.add(s)):e.classList.add(i)),this._exposeToModals();let r=this._label.nativeElement,o="mdc-snackbar__label";r.classList.toggle(o,!r.querySelector(`.${o}`))}_exposeToModals(){let e=this._liveElementId,i=this._document.querySelectorAll('body > .cdk-overlay-container [aria-modal="true"]');for(let r=0;r<i.length;r++){let o=i[r],s=o.getAttribute("aria-owns");this._trackedModals.add(o),s?s.indexOf(e)===-1&&o.setAttribute("aria-owns",s+" "+e):o.setAttribute("aria-owns",e)}}_clearFromModals(){this._trackedModals.forEach(e=>{let i=e.getAttribute("aria-owns");if(i){let r=i.replace(this._liveElementId,"").trim();r.length>0?e.setAttribute("aria-owns",r):e.removeAttribute("aria-owns")}}),this._trackedModals.clear()}_assertNotAttached(){this._portalOutlet.hasAttached()}_screenReaderAnnounce(){this._announceTimeoutId||this._ngZone.runOutsideAngular(()=>{this._announceTimeoutId=setTimeout(()=>{if(this._destroyed)return;let e=this._elementRef.nativeElement,i=e.querySelector("[aria-hidden]"),r=e.querySelector("[aria-live]");if(i&&r){let o=null;this._platform.isBrowser&&document.activeElement instanceof HTMLElement&&i.contains(document.activeElement)&&(o=document.activeElement),i.removeAttribute("aria-hidden"),r.appendChild(i),o?.focus(),this._onAnnounce.next(),this._onAnnounce.complete()}},this._announceDelay)})}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=H({type:t,selectors:[["mat-snack-bar-container"]],viewQuery:function(i,r){if(i&1&&je(Zn,7)(JA,7),i&2){let o;se(o=ae())&&(r._portalOutlet=o.first),se(o=ae())&&(r._label=o.first)}},hostAttrs:[1,"mdc-snackbar","mat-mdc-snack-bar-container"],hostVars:6,hostBindings:function(i,r){i&1&&Q("animationend",function(s){return r.onAnimationEnd(s.animationName)})("animationcancel",function(s){return r.onAnimationEnd(s.animationName)}),i&2&&B("mat-snack-bar-container-enter",r._animationState==="visible")("mat-snack-bar-container-exit",r._animationState==="hidden")("mat-snack-bar-container-animations-enabled",!r._animationsDisabled)},features:[pe],decls:6,vars:3,consts:[["label",""],[1,"mdc-snackbar__surface","mat-mdc-snackbar-surface"],[1,"mat-mdc-snack-bar-label"],["aria-hidden","true"],["cdkPortalOutlet",""]],template:function(i,r){i&1&&(g(0,"div",1)(1,"div",2,0)(3,"div",3),tt(4,ek,0,0,"ng-template",4),v(),ie(5,"div"),v()()),i&2&&(b(5),K("aria-live",r._live)("role",r._role)("id",r._liveElementId))},dependencies:[Zn],styles:[`@keyframes _mat-snack-bar-enter {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
@keyframes _mat-snack-bar-exit {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.mat-mdc-snack-bar-container {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  margin: 8px;
}
.mat-mdc-snack-bar-handset .mat-mdc-snack-bar-container {
  width: 100vw;
}

.mat-snack-bar-container-animations-enabled {
  opacity: 0;
}
.mat-snack-bar-container-animations-enabled.mat-snack-bar-fallback-visible {
  opacity: 1;
}
.mat-snack-bar-container-animations-enabled.mat-snack-bar-container-enter {
  animation: _mat-snack-bar-enter 150ms cubic-bezier(0, 0, 0.2, 1) forwards;
}
.mat-snack-bar-container-animations-enabled.mat-snack-bar-container-exit {
  animation: _mat-snack-bar-exit 75ms cubic-bezier(0.4, 0, 1, 1) forwards;
}

.mat-mdc-snackbar-surface {
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  padding-left: 0;
  padding-right: 8px;
}
[dir=rtl] .mat-mdc-snackbar-surface {
  padding-right: 0;
  padding-left: 8px;
}
.mat-mdc-snack-bar-container .mat-mdc-snackbar-surface {
  min-width: 344px;
  max-width: 672px;
}
.mat-mdc-snack-bar-handset .mat-mdc-snackbar-surface {
  width: 100%;
  min-width: 0;
}
@media (forced-colors: active) {
  .mat-mdc-snackbar-surface {
    outline: solid 1px;
  }
}
.mat-mdc-snack-bar-container .mat-mdc-snackbar-surface {
  color: var(--mat-snack-bar-supporting-text-color, var(--mat-sys-inverse-on-surface));
  border-radius: var(--mat-snack-bar-container-shape, var(--mat-sys-corner-extra-small));
  background-color: var(--mat-snack-bar-container-color, var(--mat-sys-inverse-surface));
}

.mdc-snackbar__label {
  width: 100%;
  flex-grow: 1;
  box-sizing: border-box;
  margin: 0;
  padding: 14px 8px 14px 16px;
}
[dir=rtl] .mdc-snackbar__label {
  padding-left: 8px;
  padding-right: 16px;
}
.mat-mdc-snack-bar-container .mdc-snackbar__label {
  font-family: var(--mat-snack-bar-supporting-text-font, var(--mat-sys-body-medium-font));
  font-size: var(--mat-snack-bar-supporting-text-size, var(--mat-sys-body-medium-size));
  font-weight: var(--mat-snack-bar-supporting-text-weight, var(--mat-sys-body-medium-weight));
  line-height: var(--mat-snack-bar-supporting-text-line-height, var(--mat-sys-body-medium-line-height));
}

.mat-mdc-snack-bar-actions {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  box-sizing: border-box;
}

.mat-mdc-snack-bar-handset,
.mat-mdc-snack-bar-container,
.mat-mdc-snack-bar-label {
  flex: 1 1 auto;
}

.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled).mat-unthemed {
  color: var(--mat-snack-bar-button-color, var(--mat-sys-inverse-primary));
}
.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled) {
  --mat-button-text-state-layer-color: currentColor;
  --mat-button-text-ripple-color: currentColor;
}
.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled) .mat-ripple-element {
  opacity: 0.1;
}
`],encapsulation:2})}return t})(),ak=new y("mat-snack-bar-default-options",{providedIn:"root",factory:()=>new Jr}),nd=(()=>{class t{_live=u(zp);_injector=u(P);_breakpointObserver=u(ms);_parentSnackBar=u(t,{optional:!0,skipSelf:!0});_defaultConfig=u(ak);_animationsDisabled=Ie();_snackBarRefAtThisLevel=null;simpleSnackBarComponent=ok;snackBarContainerComponent=sk;handsetCssClass="mat-mdc-snack-bar-handset";get _openedSnackBarRef(){let e=this._parentSnackBar;return e?e._openedSnackBarRef:this._snackBarRefAtThisLevel}set _openedSnackBarRef(e){this._parentSnackBar?this._parentSnackBar._openedSnackBarRef=e:this._snackBarRefAtThisLevel=e}constructor(){}openFromComponent(e,i){return this._attach(e,i)}openFromTemplate(e,i){return this._attach(e,i)}open(e,i="",r){let o=D(D({},this._defaultConfig),r);return o.data={message:e,action:i},o.announcementMessage===e&&(o.announcementMessage=void 0),this.openFromComponent(this.simpleSnackBarComponent,o)}dismiss(){this._openedSnackBarRef&&this._openedSnackBarRef.dismiss()}ngOnDestroy(){this._snackBarRefAtThisLevel&&this._snackBarRefAtThisLevel.dismiss()}_attachSnackBarContainer(e,i){let r=i&&i.viewContainerRef&&i.viewContainerRef.injector,o=P.create({parent:r||this._injector,providers:[{provide:Jr,useValue:i}]}),s=new qt(this.snackBarContainerComponent,i.viewContainerRef,o),a=e.attach(s);return a.instance.snackBarConfig=i,a.instance}_attach(e,i){let r=D(D(D({},new Jr),this._defaultConfig),i),o=this._createOverlay(r),s=this._attachSnackBarContainer(o,r),a=new Ns(s,o);if(e instanceof ut){let l=new qn(e,null,{$implicit:r.data,snackBarRef:a});a.instance=s.attachTemplatePortal(l)}else{let l=this._createInjector(r,a),c=new qt(e,void 0,l),d=s.attachComponentPortal(c);a.instance=d.instance}return this._breakpointObserver.observe(ob.HandsetPortrait).pipe(Se(o.detachments())).subscribe(l=>{o.overlayElement.classList.toggle(this.handsetCssClass,l.matches)}),r.announcementMessage&&s._onAnnounce.subscribe(()=>{this._live.announce(r.announcementMessage,r.politeness)}),this._animateSnackBar(a,r),this._openedSnackBarRef=a,this._openedSnackBarRef}_animateSnackBar(e,i){e.afterDismissed().subscribe(()=>{this._openedSnackBarRef==e&&(this._openedSnackBarRef=null),i.announcementMessage&&this._live.clear()}),i.duration&&i.duration>0&&e.afterOpened().subscribe(()=>e._dismissAfter(i.duration)),this._openedSnackBarRef?(this._openedSnackBarRef.afterDismissed().subscribe(()=>{e.containerInstance.enter()}),this._openedSnackBarRef.dismiss()):e.containerInstance.enter()}_createOverlay(e){let i=new Xn;i.direction=e.direction;let r=Kn(this._injector),o=e.direction==="rtl",s=e.horizontalPosition==="left"||e.horizontalPosition==="start"&&!o||e.horizontalPosition==="end"&&o,a=!s&&e.horizontalPosition!=="center";return s?r.left("0"):a?r.right("0"):r.centerHorizontally(),e.verticalPosition==="top"?r.top("0"):r.bottom("0"),i.positionStrategy=r,i.disableAnimations=this._animationsDisabled,Jn(this._injector,i)}_createInjector(e,i){let r=e&&e.viewContainerRef&&e.viewContainerRef.injector;return P.create({parent:r||this._injector,providers:[{provide:Ns,useValue:i},{provide:iC,useValue:e.data}]})}static \u0275fac=function(i){return new(i||t)};static \u0275prov=_({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var eo=class t{constructor(n){this.http=n}addToPlaylist(n){return this.http.post("/api/clementine/add",{filePaths:n})}static \u0275fac=function(e){return new(e||t)(I(xt))};static \u0275prov=_({token:t,factory:t.\u0275fac,providedIn:"root"})};var ri=class t{constructor(n){this.http=n}logTrackEvent(n,e,i,r,o){let s={eventType:n,artist:e,album:i,title:r,durationSeconds:o??null,timestamp:new Date().toISOString()};return this.http.post("/api/session/events",s)}getMemoryStatus(){return this.http.get("/api/session/memory")}bustMemory(){return this.http.delete("/api/session/memory")}getHistory(){return this.http.get("/api/session/history")}getEnrichedSuggestions(n){return this.http.get(`/api/session/reply/${n}/suggestions`)}setActiveReply(n){return this.http.post("/api/session/active-reply",{replyId:n})}static \u0275fac=function(e){return new(e||t)(I(xt))};static \u0275prov=_({token:t,factory:t.\u0275fac,providedIn:"root"})};function lk(t,n){if(t&1){let e=it();g(0,"img",12),Q("error",function(){Ze(e);let r=T();return Qe(r.onArtError())}),v()}if(t&2){let e=T();ne("src",e.suggestion().albumArtUrl,xl)("alt",e.suggestion().album||e.suggestion().title)}}function ck(t,n){t&1&&(g(0,"div",3)(1,"mat-icon",13),w(2,"album"),v()())}function dk(t,n){if(t&1){let e=it();g(0,"button",14),Q("click",function(r){return Ze(e),T().copyToClipboard(),Qe(r.stopPropagation())}),g(1,"mat-icon"),w(2,"content_copy"),v()()}if(t&2){let e=T();K("aria-label","Copy "+e.suggestion().artist+" \u2013 "+e.suggestion().title+" to clipboard")}}function uk(t,n){if(t&1){let e=it();g(0,"a",15),Q("click",function(r){return Ze(e),T().onYouTubeClick(),Qe(r.stopPropagation())}),ie(1,"img",16),g(2,"span"),w(3,"YouTube"),v()()}if(t&2){let e=T();ne("href",e.youtubeUrl(),xl),K("aria-label","Search "+e.suggestion().artist+" \u2013 "+e.suggestion().title+" on YouTube")}}function fk(t,n){if(t&1){let e=it();g(0,"button",17),Q("click",function(r){return Ze(e),T().addToClementine(),Qe(r.stopPropagation())}),ie(1,"img",18),v()}if(t&2){let e=T();ne("disabled",e.addingToPlaylist()),K("aria-label","Add "+e.suggestion().artist+" \u2013 "+e.suggestion().title+" to Clementine playlist")}}var id=class t{constructor(n,e,i){this.snackBar=n;this.playlistService=e;this.sessionService=i}suggestion=jn.required();addingToPlaylist=L(!1);artFailed=L(!1);hasArt=ke(()=>!!this.suggestion().albumArtUrl&&!this.artFailed());youtubeUrl=ke(()=>`https://www.youtube.com/results?search_query=${encodeURIComponent(`${this.suggestion().artist} ${this.suggestion().title}`)}`);onArtError(){this.artFailed.set(!0)}copyToClipboard(){let n=this.suggestion(),e=`${n.artist} \u2013 ${n.title}`;navigator.clipboard.writeText(e).then(()=>this.snackBar.open(`Copied: ${e}`,void 0,{duration:2e3}),()=>this.snackBar.open("Could not copy to clipboard","Dismiss",{duration:4e3}))}onYouTubeClick(){let n=this.suggestion();this.sessionService.logTrackEvent("track-youtube",n.artist,n.album??null,n.title,n.durationSeconds??null).subscribe({error:()=>{}})}addToClementine(){let n=this.suggestion();!n.filePath||this.addingToPlaylist()||(this.addingToPlaylist.set(!0),this.playlistService.addToPlaylist([n.filePath]).subscribe({next:()=>{this.snackBar.open(`Added to Clementine: ${n.artist} \u2013 ${n.title}`,void 0,{duration:2e3}),this.addingToPlaylist.set(!1),this.sessionService.logTrackEvent("track-added",n.artist,n.album??null,n.title,n.durationSeconds??null).subscribe({error:()=>{}})},error:()=>{this.snackBar.open("Could not add to Clementine playlist","Dismiss",{duration:4e3}),this.addingToPlaylist.set(!1)}}))}static \u0275fac=function(e){return new(e||t)(W(nd),W(eo),W(ri))};static \u0275cmp=H({type:t,selectors:[["app-suggestion-card"]],inputs:{suggestion:[1,"suggestion"]},decls:15,vars:13,consts:[[1,"tile"],[1,"tile-art"],[1,"art-img",3,"src","alt"],[1,"art-placeholder"],["mat-icon-button","",1,"art-overlay-btn"],[1,"tile-info"],[1,"tile-title"],[1,"tile-artist"],[1,"tile-album"],[1,"tile-footer"],["target","_blank","rel","noopener noreferrer",1,"footer-action","footer-action--link",3,"href"],["mat-icon-button","",1,"footer-action","footer-action--btn",3,"disabled"],[1,"art-img",3,"error","src","alt"],["aria-hidden","true"],["mat-icon-button","",1,"art-overlay-btn",3,"click"],["target","_blank","rel","noopener noreferrer",1,"footer-action","footer-action--link",3,"click","href"],["src","/icons/youtube.svg","alt","","aria-hidden","true",1,"footer-icon"],["mat-icon-button","",1,"footer-action","footer-action--btn",3,"click","disabled"],["src","/icons/clementine_addmore.png","alt","","aria-hidden","true",1,"footer-icon"]],template:function(e,i){e&1&&(g(0,"div",0)(1,"div",1),$(2,lk,1,2,"img",2)(3,ck,3,0,"div",3),$(4,dk,3,1,"button",4),v(),g(5,"div",5)(6,"span",6),w(7),v(),g(8,"span",7),w(9),v(),g(10,"span",8),w(11),v()(),g(12,"div",9),$(13,uk,4,2,"a",10),$(14,fk,2,2,"button",11),v()()),e&2&&(B("tile--local",i.suggestion().inLocalLibrary)("tile--discovery",!i.suggestion().inLocalLibrary),b(2),G(i.hasArt()?2:3),b(2),G(i.suggestion().inLocalLibrary?4:-1),b(3),fe(i.suggestion().title),b(2),fe(i.suggestion().artist),b(),Gt("visibility",i.suggestion().album?"visible":"hidden"),b(),nn(" ",i.suggestion().album||"\xA0"," "),b(2),G(i.suggestion().inLocalLibrary?-1:13),b(),G(i.suggestion().inLocalLibrary?14:-1))},dependencies:[ii,ni,_n,Wi],styles:[".tile[_ngcontent-%COMP%]{width:100%;display:flex;flex-direction:column;border-radius:10px;overflow:hidden;background:var(--reco-surface-1);border:2px solid var(--reco-accent);transition:transform .18s ease,box-shadow .18s ease;cursor:default}.tile--local[_ngcontent-%COMP%]{box-shadow:0 0 0 0 var(--reco-accent-dim)}.tile--discovery[_ngcontent-%COMP%]{border-color:#c8006b47;box-shadow:0 0 0 0 var(--reco-accent-dim)}.tile--discovery[_ngcontent-%COMP%]   .tile-art[_ngcontent-%COMP%], .tile--discovery[_ngcontent-%COMP%]   .tile-info[_ngcontent-%COMP%]{opacity:.22}.tile[_ngcontent-%COMP%]:hover{transform:translateY(-3px);box-shadow:0 6px 20px var(--reco-accent-dim)}.tile[_ngcontent-%COMP%]:hover   .art-overlay-btn[_ngcontent-%COMP%]{opacity:1}.tile-art[_ngcontent-%COMP%]{position:relative;width:100%;aspect-ratio:1;overflow:hidden;background:var(--reco-surface-2);flex-shrink:0}.art-img[_ngcontent-%COMP%]{width:100%;height:100%;object-fit:cover;display:block}.art-placeholder[_ngcontent-%COMP%]{width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:var(--reco-text-disabled)}.art-placeholder[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:48px;width:48px;height:48px}.art-overlay-btn[_ngcontent-%COMP%]{position:absolute;bottom:4px;left:4px;width:28px;height:28px;border-radius:6px;background:#0000008c;color:var(--reco-accent);opacity:0;transition:opacity .15s ease;--mdc-icon-button-icon-size: 14px;--mdc-icon-button-state-layer-size: 28px}.art-overlay-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:14px;width:14px;height:14px}.tile-info[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:2px;padding:8px 10px 4px;min-height:0}.tile-title[_ngcontent-%COMP%]{font-family:var(--reco-font);font-size:.8rem;font-weight:600;color:var(--reco-accent);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.tile-artist[_ngcontent-%COMP%]{font-family:var(--reco-font);font-size:.72rem;color:var(--reco-text-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.tile-album[_ngcontent-%COMP%]{font-family:var(--reco-font);font-size:.68rem;color:var(--reco-text-disabled);font-style:italic;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.tile-footer[_ngcontent-%COMP%]{display:flex;align-items:center;padding:2px 6px 6px;min-height:32px}.footer-action[_ngcontent-%COMP%]{display:flex;align-items:center;gap:4px;font-family:var(--reco-font);font-size:.68rem;font-weight:500;opacity:.6;transition:opacity .15s ease;text-decoration:none}.footer-action[_ngcontent-%COMP%]:hover{opacity:1}.footer-action--link[_ngcontent-%COMP%]{color:var(--reco-text-muted)}.footer-action--btn[_ngcontent-%COMP%]{color:var(--reco-accent);--mdc-icon-button-icon-size: 16px;--mdc-icon-button-state-layer-size: 28px}.footer-action--btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:16px;width:16px;height:16px}.footer-action--btn[disabled][_ngcontent-%COMP%]{opacity:.25}.footer-icon[_ngcontent-%COMP%]{width:16px;height:16px;flex-shrink:0}"]})};var pk=(t,n)=>n.title+n.artist;function hk(t,n){t&1&&(g(0,"div",4),ie(1,"span")(2,"span")(3,"span")(4,"span"),v())}function mk(t,n){if(t&1){let e=it();g(0,"button",9),Q("click",function(){Ze(e);let r=T();return Qe(r.addAllToClementine())}),ie(1,"img",10),w(2),v()}if(t&2){let e=T();ne("disabled",e.addingAll()),K("aria-label","Add all "+e.localFilePaths().length+" local tracks to Clementine playlist"),b(2),nn(" Add ",e.localFilePaths().length," to Clementine ")}}function gk(t,n){if(t&1&&(g(0,"div",6)(1,"span"),w(2),v()()),t&2){let e=T();b(2),fe(e.loadingLabel())}}function vk(t,n){t&1&&(g(0,"div",7)(1,"mat-icon",2),w(2,"warning_amber"),v(),g(3,"span"),w(4,"Suggestions unavailable right now."),v()())}function yk(t,n){if(t&1&&(g(0,"div",8)(1,"mat-icon",2),w(2,"search_off"),v(),g(3,"span"),w(4),v()()),t&2){let e=T();b(4),fe(e.message())}}function _k(t,n){if(t&1&&(g(0,"div",12),ie(1,"app-suggestion-card",14),v()),t&2){let e=n.$implicit;b(),ne("suggestion",e)}}function bk(t,n){if(t&1&&(g(0,"p",13),w(1),v()),t&2){let e=T(2);b(),fe(e.message())}}function Dk(t,n){if(t&1&&(g(0,"div",11),Ln(1,_k,2,1,"div",12,pk),v(),$(3,bk,2,1,"p",13)),t&2){let e=T();b(),Vn(e.suggestions()),b(2),G(e.message()?3:-1)}}var rd=class t{constructor(n,e,i){this.playlistService=n;this.snackBar=e;this.sessionService=i}suggestions=jn([]);loading=jn(!1);error=jn(!1);message=jn(null);loadingLabel=jn("Searching your library\u2026");addingAll=L(!1);localTracks=ke(()=>this.suggestions().filter(n=>n.inLocalLibrary&&n.filePath));localFilePaths=ke(()=>this.localTracks().map(n=>n.filePath));addAllToClementine(){let n=this.localTracks(),e=this.localFilePaths();e.length===0||this.addingAll()||(this.addingAll.set(!0),this.playlistService.addToPlaylist(e).subscribe({next:()=>{this.snackBar.open(`Added ${e.length} track(s) to Clementine`,void 0,{duration:2500}),this.addingAll.set(!1);for(let i of n)this.sessionService.logTrackEvent("track-added",i.artist,i.album??null,i.title,i.durationSeconds??null).subscribe({error:()=>{}})},error:()=>{this.snackBar.open("Could not add tracks to Clementine","Dismiss",{duration:4e3}),this.addingAll.set(!1)}}))}static \u0275fac=function(e){return new(e||t)(W(eo),W(nd),W(ri))};static \u0275cmp=H({type:t,selectors:[["app-suggestions-panel"]],inputs:{suggestions:[1,"suggestions"],loading:[1,"loading"],error:[1,"error"],message:[1,"message"],loadingLabel:[1,"loadingLabel"]},decls:12,vars:3,consts:[["aria-label","Track suggestions",1,"suggestions-panel"],[1,"panel-header"],["aria-hidden","true"],[1,"panel-title"],["role","status","aria-label","Loading suggestions",1,"music-bars"],["mat-stroked-button","",1,"add-all-btn",3,"disabled"],["aria-live","polite",1,"panel-state","panel-state--loading"],["role","alert",1,"panel-state","panel-state--error"],[1,"panel-state","panel-state--empty"],["mat-stroked-button","",1,"add-all-btn",3,"click","disabled"],["src","/icons/clementine_addmore.png","alt","","aria-hidden","true",1,"add-all-icon"],["role","list",1,"track-list"],["role","listitem"],[1,"panel-note"],[3,"suggestion"]],template:function(e,i){e&1&&(g(0,"section",0)(1,"div",1)(2,"mat-icon",2),w(3,"queue_music"),v(),g(4,"span",3),w(5,"What I hear in your words"),v(),$(6,hk,5,0,"div",4),$(7,mk,3,3,"button",5),v(),$(8,gk,3,1,"div",6)(9,vk,5,0,"div",7)(10,yk,5,1,"div",8)(11,Dk,4,1),v()),e&2&&(b(6),G(i.loading()?6:-1),b(),G(i.localFilePaths().length>0?7:-1),b(),G(i.loading()&&i.suggestions().length===0?8:i.error()?9:i.suggestions().length===0&&i.message()?10:i.suggestions().length>0?11:-1))},dependencies:[ii,ni,_n,zr,id],styles:["[_nghost-%COMP%]{display:block;background:var(--reco-surface-0);flex-shrink:0}.suggestions-panel[_ngcontent-%COMP%]{padding:12px 16px 14px}.panel-header[_ngcontent-%COMP%]{display:flex;align-items:center;gap:6px;margin-bottom:12px;color:var(--reco-text-muted);font-family:var(--reco-font);font-size:.72rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase}.panel-title[_ngcontent-%COMP%]{flex:1}.music-bars[_ngcontent-%COMP%]{display:inline-flex;align-items:flex-end;gap:2px;height:14px;margin-left:4px}.music-bars[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{display:block;width:3px;background:var(--reco-primary);border-radius:1px;animation:_ngcontent-%COMP%_bar-dance .9s ease-in-out infinite}.music-bars[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(1){animation-delay:0s}.music-bars[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(2){animation-delay:.2s}.music-bars[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(3){animation-delay:.4s}.music-bars[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(4){animation-delay:.6s}@keyframes _ngcontent-%COMP%_bar-dance{0%,to{height:3px}50%{height:14px}}.add-all-btn[_ngcontent-%COMP%]{--mat-button-outlined-label-text-color: var(--reco-accent);--mat-button-outlined-outline-color: var(--reco-accent);font-family:var(--reco-font);font-size:.72rem;font-weight:500;height:28px;line-height:28px;padding:0 10px;color:var(--reco-accent);border-color:var(--reco-accent)!important}.add-all-btn[_ngcontent-%COMP%]   .add-all-icon[_ngcontent-%COMP%]{width:15px;height:15px;margin-right:4px;flex-shrink:0;vertical-align:middle}.add-all-btn[disabled][_ngcontent-%COMP%]{opacity:.4}.panel-state[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;padding:10px 4px;font-family:var(--reco-font);font-size:.875rem;color:var(--reco-text-muted)}.panel-state--error[_ngcontent-%COMP%]{color:var(--reco-error)}.panel-state--loading[_ngcontent-%COMP%]{font-style:italic;color:var(--reco-primary)}.track-list[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}@media(max-width:767px){.track-list[_ngcontent-%COMP%]{grid-template-columns:1fr}}.panel-note[_ngcontent-%COMP%]{margin:10px 4px 0;font-family:var(--reco-font);font-size:.72rem;font-style:italic;color:var(--reco-text-muted)}"]})};var od=class t{constructor(n){this.sanitizer=n}transform(n){let i=n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>").replace(/\*\*(.+?)\*\*/gs,"<strong>$1</strong>");return this.sanitizer.bypassSecurityTrustHtml(i)}static \u0275fac=function(e){return new(e||t)(W(Ui,16))};static \u0275pipe=Fl({name:"boldMarkdown",type:t,pure:!0})};var sd=class t{constructor(n){this.http=n}getRecommendations(n,e="gemini"){return this.http.post("/api/recommendations",{prompt:n,provider:e})}static \u0275fac=function(e){return new(e||t)(I(xt))};static \u0275prov=_({token:t,factory:t.\u0275fac,providedIn:"root"})};var Ek=["messageList"],wk=["promptInput"];function xk(t,n){t&1&&(g(0,"div",18)(1,"mat-icon",33),w(2,"cloud"),v(),g(3,"span"),w(4,"Inner Voice unavailable \u2014 Cosmic Voice stepped in"),v()())}function Ik(t,n){if(t&1&&(g(0,"p",36),w(1),v()),t&2){let e=T(2);b(),fe(e.tryLineHint())}}function Mk(t,n){if(t&1&&(g(0,"div",22),ie(1,"img",34),g(2,"p",35),w(3,"What does your mind sound like today?"),v(),$(4,Ik,2,1,"p",36),v()),t&2){let e=T();b(4),G(e.tryLineHint()?4:-1)}}function Sk(t,n){if(t&1){let e=it();g(0,"button",43),Q("click",function(){Ze(e);let r=T(2).$implicit,o=T();return Qe(o.activateReply(r.eventId))}),g(1,"mat-icon"),w(2,"history"),v()()}}function Tk(t,n){if(t&1&&(g(0,"div",39),$(1,Sk,3,0,"button",40),ie(2,"div",41),mp(3,"boldMarkdown"),g(4,"span",42),w(5),v()()),t&2){let e=T().$implicit,i=T();B("message-bubble--active",e.eventId!==void 0&&e.eventId===i.activeReplyId())("message-bubble--has-rewind",e.hasSuggestions&&e.eventId!==void 0&&e.eventId!==i.activeReplyId()),b(),G(e.hasSuggestions&&e.eventId!==void 0&&e.eventId!==i.activeReplyId()?1:-1),b(),ne("innerHTML",gp(3,7,e.text),Vf),b(3),fe(i.formatMessageTime(e.timestamp))}}function Ak(t,n){if(t&1&&(g(0,"div",39)(1,"span"),w(2),v(),g(3,"span",42),w(4),v()()),t&2){let e=T().$implicit,i=T();b(2),fe(e.text),b(2),fe(i.formatMessageTime(e.timestamp))}}function kk(t,n){if(t&1&&(g(0,"div",37),$(1,Tk,6,9,"div",38)(2,Ak,5,2,"div",39),v()),t&2){let e=n.$implicit;B("message--user",e.role==="user")("message--model",e.role==="model"),b(),G(e.role==="model"?1:2)}}function Rk(t,n){if(t&1&&(g(0,"span",48),w(1),v()),t&2){let e=T(2);b(),fe(e.retryNotice())}}function Nk(t,n){if(t&1&&(g(0,"div",24)(1,"div",44)(2,"div",45)(3,"mat-icon",46),w(4,"music_note"),v(),g(5,"span",47),w(6),v()(),$(7,Rk,2,1,"span",48),v()()),t&2){let e=T();b(6),fe(e.loadingPhrase()),b(),G(e.retryNotice()?7:-1)}}function Ok(t,n){if(t&1&&(g(0,"div",49)(1,"mat-icon",33),w(2),v(),g(3,"span"),w(4),v()()),t&2){let e=T();B("error-banner--rate-limit",e.errorIsRateLimit()),b(2),fe(e.errorIsRateLimit()?"schedule":"error_outline"),b(2),fe(e.error())}}function Fk(t,n){if(t&1&&ie(0,"app-suggestions-panel",31),t&2){let e=T();ne("suggestions",e.suggestions())("loading",e.suggestionsLoading())("error",e.suggestionsError())("message",e.suggestionsMessage())("loadingLabel",e.loadingPhrase())}}function Pk(t,n){if(t&1&&(g(0,"p",50),w(1),v()),t&2){let e=T(2);b(),fe(e.loadingPhrase())}}function Lk(t,n){t&1&&(g(0,"p"),w(1,"This is where your mind's music will take shape."),v())}function Vk(t,n){if(t&1&&(g(0,"div",32)(1,"mat-icon",33),w(2,"queue_music"),v(),$(3,Pk,2,1,"p",50)(4,Lk,2,0,"p"),v()),t&2){let e=T();b(3),G(e.loading()?3:4)}}var sC="reco-provider",Lh=["Holding the note","Staying on the downbeat","Lingering in the intro","Looping the pre\u2011chorus","Riding the sustain pedal","Tuning up forever","Hovering on the fermata","Chilling in the green room","Stuck in soundcheck mode","Spinning the vinyl before the needle drops","Hanging on the last chord","Paused between tracks","Letting the beat simmer","Idling in the bridge","Waiting for the bass to kick in","Floating in reverb","Queued in the playlist","Stuck in the encore gap","Listening to the orchestra warm up","Waiting for the DJ to unmute"],ad=class t{constructor(n,e,i){this.recommendationService=n;this.sessionService=e;this.dialog=i;Nn(()=>{this.loading()?this.typewriterStart(this.randomPhrase()):this.typewriterStop()})}messageListRef;promptInputRef;messages=L([]);prompt=L("");loading=L(!1);error=L(null);errorIsRateLimit=L(!1);suggestions=L([]);suggestionsLoading=L(!1);suggestionsError=L(!1);suggestionsMessage=L(null);hasSuggestions=L(!1);activeReplyId=L(null);retryNotice=L(null);loadingPhrase=L(Lh[0]);tryLineHint=L("");provider=L(localStorage.getItem(sC)??"gemini");usedFallback=L(!1);memoryUsed=L(0);memoryTotal=L(25);memoryFill=ke(()=>this.memoryTotal()>0?this.memoryUsed()/this.memoryTotal():0);memoryHigh=ke(()=>this.memoryFill()>.8);shouldScroll=!1;shouldFocusInput=!1;typewriterTimeout=null;fallbackTimer=null;RETRY_DELAYS=[3e3,5e3,7e3,1e4];HISTORY_LIMIT=50;promptHistory=[];historyIndex=-1;currentDraft="";isHintPreview=L(!1);async ngOnInit(){this.refreshMemory();try{let i=(await(await fetch("/trylines.txt")).text()).split(`
`).map(r=>r.trim()).filter(r=>r.length>0);i.length>0&&this.tryLineHint.set(i[Math.floor(Math.random()*i.length)])}catch{}await this.hydrate()}ngAfterViewInit(){this.focusPromptInput()}ngOnDestroy(){this.typewriterStop(),this.fallbackTimer!==null&&clearTimeout(this.fallbackTimer)}ngAfterViewChecked(){this.shouldScroll&&(this.scrollToBottom(),this.shouldScroll=!1),this.shouldFocusInput&&(this.shouldFocusInput=!1,setTimeout(()=>this.promptInputRef?.nativeElement?.focus(),0))}setProvider(n){this.provider.set(n),localStorage.setItem(sC,n)}refreshMemory(){this.sessionService.getMemoryStatus().subscribe({next:n=>{this.memoryUsed.set(n.used),this.memoryTotal.set(n.total)},error:()=>{}})}bustMemory(){confirm("Clear all session memory? The AI will start fresh on your next question.")&&this.sessionService.bustMemory().subscribe({next:()=>{this.memoryUsed.set(0),this.refreshMemory()},error:()=>{}})}openSettings(){this.dialog.open(td,{disableClose:!1,autoFocus:!1})}send(){let n=this.prompt().trim();!n||this.loading()||(this.messages.update(e=>[...e,{role:"user",text:n,timestamp:new Date}]),this.promptHistory[this.promptHistory.length-1]!==n&&(this.promptHistory.push(n),this.promptHistory.length>this.HISTORY_LIMIT&&this.promptHistory.shift()),this.historyIndex=-1,this.currentDraft="",this.prompt.set(""),this.loading.set(!0),this.error.set(null),this.errorIsRateLimit.set(!1),this.retryNotice.set(null),this.usedFallback.set(!1),this.shouldScroll=!0,this.suggestionsLoading.set(!0),this.suggestionsError.set(!1),this.suggestionsMessage.set(null),this.hasSuggestions.set(!0),this.recommendationService.getRecommendations(n,this.provider()).pipe(Td({count:4,delay:(e,i)=>this.isRetryableError(e)?(this.retryNotice.set(`The AI is a bit busy right now\u2026 retrying (${i}/4)`),mi(this.RETRY_DELAYS[i-1])):uo(()=>e)})).subscribe({next:e=>{this.retryNotice.set(null),this.activeReplyId.set(e.aiReplyEventId),this.messages.update(i=>[...i,{role:"model",text:e.narrative,timestamp:new Date,eventId:e.aiReplyEventId,hasSuggestions:e.suggestions.length>0}]),this.suggestions.set(e.suggestions),this.suggestionsMessage.set(e.message),this.loading.set(!1),this.suggestionsLoading.set(!1),this.refreshMemory(),this.shouldScroll=!0,this.focusPromptInput(),e.usedFallback&&(this.usedFallback.set(!0),this.fallbackTimer!==null&&clearTimeout(this.fallbackTimer),this.fallbackTimer=setTimeout(()=>this.usedFallback.set(!1),8e3))},error:e=>{this.retryNotice.set(null);let i=e.status===429;this.errorIsRateLimit.set(i),this.error.set(e.error?.error??"Something went wrong. Please try again."),this.loading.set(!1),this.suggestionsError.set(!0),this.suggestionsLoading.set(!1),this.focusPromptInput()}}))}onKeydown(n){if(n.key==="Enter"&&!n.shiftKey){n.preventDefault(),this.send();return}if(n.key==="ArrowUp"){if(this.promptHistory.length===0)return;n.preventDefault(),this.historyIndex===-1&&(this.currentDraft=this.isHintPreview()?"":this.prompt(),this.isHintPreview.set(!1)),this.historyIndex=this.historyIndex===-1?this.promptHistory.length-1:Math.max(0,this.historyIndex-1),this.prompt.set(this.promptHistory[this.historyIndex]);return}if(n.key==="ArrowDown"){if(this.historyIndex===-1)return;n.preventDefault(),this.historyIndex++,this.historyIndex>=this.promptHistory.length?(this.historyIndex=-1,this.prompt.set(this.currentDraft)):this.prompt.set(this.promptHistory[this.historyIndex]);return}}onFocus(n){!this.prompt().trim()&&this.tryLineHint()&&(this.prompt.set(this.tryLineHint()),this.isHintPreview.set(!0))}onBlur(){this.isHintPreview()&&(this.prompt.set(""),this.isHintPreview.set(!1))}updatePrompt(n){this.historyIndex=-1;let e=n.target;if(this.isHintPreview()){let r=n,o=r.inputType?.startsWith("insert")?r.data??"":"";o?(this.isHintPreview.set(!1),this.prompt.set(o),e.value=o):e.value=this.tryLineHint();return}let i=e.value;i===""&&this.tryLineHint()?(this.prompt.set(this.tryLineHint()),this.isHintPreview.set(!0)):(this.isHintPreview.set(!1),this.prompt.set(i))}formatMessageTime(n){let e=new Date,i=o=>o.toString().padStart(2,"0"),r=`${i(n.getHours())}:${i(n.getMinutes())}`;return n.toDateString()===e.toDateString()?r:`${i(n.getDate())}/${i(n.getMonth()+1)}/${n.getFullYear()} ${r}`}activateReply(n){this.activeReplyId()!==n&&(this.activeReplyId.set(n),this.hasSuggestions.set(!0),this.suggestionsLoading.set(!0),this.suggestionsError.set(!1),this.sessionService.getEnrichedSuggestions(n).subscribe({next:e=>{this.activeReplyId()===n&&(this.suggestions.set(e.suggestions),this.suggestionsMessage.set(e.message),this.suggestionsLoading.set(!1))},error:()=>{this.activeReplyId()===n&&(this.suggestionsLoading.set(!1),this.suggestionsError.set(!0))}}),this.sessionService.setActiveReply(n).subscribe({error:()=>{}}))}async hydrate(){try{let n=await xd(this.sessionService.getHistory());if(n.turns.length===0)return;this.messages.set(n.turns.map(e=>({role:e.role,text:e.text,timestamp:new Date(e.timestamp),eventId:e.eventId,hasSuggestions:e.hasSuggestions}))),this.activeReplyId.set(n.activeReplyId),this.shouldScroll=!0,n.activeReplyId!=null&&(this.hasSuggestions.set(!0),this.suggestionsLoading.set(!0),this.sessionService.getEnrichedSuggestions(n.activeReplyId).subscribe({next:e=>{this.suggestions.set(e.suggestions),this.suggestionsMessage.set(e.message),this.suggestionsLoading.set(!1)},error:()=>{this.suggestionsLoading.set(!1)}}))}catch{}}typewriterStart(n){this.typewriterStop(),this.typeChar(n,0)}typeChar(n,e){this.loadingPhrase.set(n.slice(0,e)),e<n.length?this.typewriterTimeout=setTimeout(()=>this.typeChar(n,e+1),45):this.typewriterTimeout=setTimeout(()=>this.typewriterStart(this.randomPhrase()),1e3)}typewriterStop(){this.typewriterTimeout!==null&&(clearTimeout(this.typewriterTimeout),this.typewriterTimeout=null)}randomPhrase(){return Lh[Math.floor(Math.random()*Lh.length)]}focusPromptInput(){this.shouldFocusInput=!0}isRetryableError(n){return n?.status===502}scrollToBottom(){let n=this.messageListRef?.nativeElement;n&&(n.scrollTop=n.scrollHeight)}static \u0275fac=function(e){return new(e||t)(W(sd),W(ri),W(Gc))};static \u0275cmp=H({type:t,selectors:[["app-chat"]],viewQuery:function(e,i){if(e&1&&je(Ek,5)(wk,5),e&2){let r;se(r=ae())&&(i.messageListRef=r.first),se(r=ae())&&(i.promptInputRef=r.first)}},decls:48,vars:19,consts:[["messageList",""],["promptInput",""],[1,"page-shell"],[1,"chat-header"],["src","logo.png","alt","Reasonic",1,"header-logo"],[1,"chat-title-group"],[1,"chat-title"],[1,"chat-tagline"],["aria-label","AI provider",1,"provider-toggle",3,"change","value"],["value","inner-whisper","aria-label","Use local llama model (Inner Whisper)"],["value","inner-shout","aria-label","Use local Gemma model (Inner Shout)"],["value","gemini","aria-label","Use Gemini cloud model (Cosmic Voice)"],["src","/icons/gemini.svg","alt","","aria-hidden","true",1,"provider-icon"],["aria-label","Session memory usage",1,"memory-widget"],[1,"memory-label"],["role","progressbar",1,"memory-bar"],["mat-icon-button","","matTooltip","Clear session memory","aria-label","Clear session memory",1,"memory-bust-btn",3,"click"],["mat-icon-button","","matTooltip","Settings","aria-label","Open settings",1,"settings-btn",3,"click"],["role","status","aria-live","polite",1,"fallback-chip"],[1,"split-layout"],["aria-label","Conversation",1,"pane","pane--chat"],[1,"message-list"],[1,"empty-state"],[1,"message",3,"message--user","message--model"],[1,"message","message--model"],["role","alert",1,"error-banner",3,"error-banner--rate-limit"],[1,"input-area"],["appearance","outline","subscriptSizing","dynamic",1,"prompt-field"],["matInput","","placeholder","e.g. Recommend some melancholic jazz from the 60s","aria-label","Music prompt",3,"input","keydown","focus","blur","value","disabled"],["mat-fab","","aria-label","Send message",3,"click","disabled"],["aria-label","Recommendations",1,"pane","pane--reco"],[3,"suggestions","loading","error","message","loadingLabel"],[1,"reco-empty-state"],["aria-hidden","true"],["src","logo.png","aria-hidden","true","alt","",1,"empty-logo"],[1,"empty-prompt"],[1,"empty-hint"],[1,"message"],[1,"message-bubble",3,"message-bubble--active","message-bubble--has-rewind"],[1,"message-bubble"],["mat-icon-button","","matTooltip","Show these suggestions","aria-label","Show suggestions for this reply",1,"rewind-btn"],[3,"innerHTML"],[1,"message-time"],["mat-icon-button","","matTooltip","Show these suggestions","aria-label","Show suggestions for this reply",1,"rewind-btn",3,"click"],["role","status","aria-live","polite",1,"message-bubble","message-bubble--loading"],[1,"loading-row"],["aria-hidden","true",1,"loading-icon"],[1,"loading-phrase"],[1,"retry-notice"],["role","alert",1,"error-banner"],["role","status","aria-live","polite",1,"reco-loading-text"]],template:function(e,i){e&1&&(g(0,"div",2)(1,"header",3),ie(2,"img",4),g(3,"div",5)(4,"span",6),w(5,"Reasonic"),v(),g(6,"p",7),w(7,"The music hiding in your mind"),v()(),g(8,"mat-button-toggle-group",8),Q("change",function(o){return i.setProvider(o.value)}),g(9,"mat-button-toggle",9),w(10," Inner Whisper "),v(),g(11,"mat-button-toggle",10),w(12," Inner Shout "),v(),g(13,"mat-button-toggle",11),ie(14,"img",12),w(15," Cosmic Voice "),v()(),g(16,"div",13)(17,"span",14),w(18),v(),ie(19,"div",15),g(20,"button",16),Q("click",function(){return i.bustMemory()}),g(21,"mat-icon"),w(22,"delete_sweep"),v()()(),g(23,"button",17),Q("click",function(){return i.openSettings()}),g(24,"mat-icon"),w(25,"settings"),v()()(),$(26,xk,5,0,"div",18),g(27,"div",19)(28,"section",20)(29,"div",21,0),$(31,Mk,5,1,"div",22),Ln(32,kk,3,5,"div",23,fp),$(34,Nk,8,2,"div",24),$(35,Ok,5,4,"div",25),v(),g(36,"div",26)(37,"mat-form-field",27)(38,"mat-label"),w(39,"Speak your mind if you want to hear me"),v(),g(40,"input",28,1),Q("input",function(o){return i.updatePrompt(o)})("keydown",function(o){return i.onKeydown(o)})("focus",function(o){return i.onFocus(o)})("blur",function(){return i.onBlur()}),v()(),g(42,"button",29),Q("click",function(){return i.send()}),g(43,"mat-icon"),w(44,"send"),v()()()(),g(45,"section",30),$(46,Fk,1,5,"app-suggestions-panel",31)(47,Vk,5,1,"div",32),v()()()),e&2&&(b(8),ne("value",i.provider()),b(10),Hl("",i.memoryUsed(),"/",i.memoryTotal()),b(),Gt("--fill",i.memoryFill()),B("memory-bar--high",i.memoryHigh()),K("aria-valuenow",i.memoryUsed())("aria-valuemax",i.memoryTotal()),b(7),G(i.usedFallback()?26:-1),b(5),G(i.messages().length===0&&!i.loading()?31:-1),b(),Vn(i.messages()),b(2),G(i.loading()?34:-1),b(),G(i.error()?35:-1),b(2),B("prompt-field--hint",i.isHintPreview()),b(3),ne("value",i.prompt())("disabled",i.loading()),b(2),ne("disabled",!i.prompt().trim()||i.loading()||i.isHintPreview()),b(4),G(i.hasSuggestions()?46:47))},dependencies:[_n,Wi,_b,Kb,_h,kc,Wc,Xi,Kr,Qi,ii,ni,Kc,Xc,Jc,Rs,rd,od],styles:['[_nghost-%COMP%]{display:flex;flex-direction:column;height:100%;overflow:hidden}.page-shell[_ngcontent-%COMP%]{display:flex;flex-direction:column;height:100%;overflow:hidden}.chat-header[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;padding:14px 20px;background-color:var(--reco-surface-0);color:var(--reco-text);border-bottom:1px solid var(--reco-border);flex-shrink:0}.header-logo[_ngcontent-%COMP%]{height:38px;width:auto;object-fit:contain;border-radius:4px;flex-shrink:0}.chat-title-group[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:column;gap:1px}.chat-title[_ngcontent-%COMP%]{font-size:1.1rem;font-weight:600;font-family:var(--reco-font);letter-spacing:.01em;color:var(--reco-primary)}.chat-tagline[_ngcontent-%COMP%]{margin:0;font-size:.68rem;font-style:italic;font-family:var(--reco-font);color:var(--reco-text-muted);letter-spacing:.01em}.provider-toggle[_ngcontent-%COMP%]{--mat-standard-button-toggle-height: 32px;--mat-standard-button-toggle-background-color: transparent;--mat-standard-button-toggle-text-color: var(--reco-text-muted);--mat-standard-button-toggle-selected-state-background-color: var(--reco-primary-dim);--mat-standard-button-toggle-selected-state-text-color: var(--reco-primary);--mat-standard-button-toggle-divider-color: var(--reco-border);border:1px solid var(--reco-border)!important;border-radius:8px;overflow:hidden}.provider-toggle[_ngcontent-%COMP%]   .mat-button-toggle[_ngcontent-%COMP%]{font-size:.72rem;font-weight:600;font-family:var(--reco-font);letter-spacing:.03em;text-transform:uppercase}.provider-toggle[_ngcontent-%COMP%]   .mat-button-toggle-button[_ngcontent-%COMP%]{display:flex;align-items:center;gap:5px;padding:0 10px}.provider-icon[_ngcontent-%COMP%]{width:14px;height:14px;flex-shrink:0;opacity:.85;vertical-align:middle}.memory-widget[_ngcontent-%COMP%]{display:flex;align-items:center;gap:5px;margin-left:8px}.memory-label[_ngcontent-%COMP%]{font-size:.62rem;font-family:var(--reco-font);color:var(--reco-text-muted);white-space:nowrap;min-width:28px;text-align:right}.memory-bar[_ngcontent-%COMP%]{width:52px;height:4px;border-radius:2px;background:var(--reco-border);position:relative;overflow:hidden;flex-shrink:0}.memory-bar[_ngcontent-%COMP%]:after{content:"";position:absolute;inset:0;width:calc(var(--fill, 0) * 100%);border-radius:2px;background:var(--reco-primary);transition:width .4s ease,background .4s ease}.memory-bar--high[_ngcontent-%COMP%]:after{background:var(--reco-accent)}.memory-bust-btn[_ngcontent-%COMP%]{width:28px;height:28px;flex-shrink:0;align-self:center;display:inline-flex!important;align-items:center;justify-content:center;margin:0;padding:0;color:var(--reco-text-muted);--mdc-icon-button-state-layer-size: 28px;--mdc-icon-button-icon-size: 16px}.memory-bust-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:16px;width:16px;height:16px;transition:color .2s ease}.memory-bust-btn[_ngcontent-%COMP%]:hover   mat-icon[_ngcontent-%COMP%]{color:var(--reco-accent)}.settings-btn[_ngcontent-%COMP%]{width:28px;height:28px;flex-shrink:0;align-self:center;display:inline-flex!important;align-items:center;justify-content:center;margin:0;padding:0;color:var(--reco-text-muted);--mdc-icon-button-state-layer-size: 28px;--mdc-icon-button-icon-size: 16px}.settings-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:16px;width:16px;height:16px;transition:color .2s ease}.settings-btn[_ngcontent-%COMP%]:hover   mat-icon[_ngcontent-%COMP%]{color:var(--reco-primary)}.fallback-chip[_ngcontent-%COMP%]{display:flex;align-items:center;gap:6px;padding:6px 16px;background-color:#ffb74d1f;color:var(--reco-warning);font-size:.8rem;font-family:var(--reco-font);flex-shrink:0;animation:_ngcontent-%COMP%_fade-in .3s ease}.fallback-chip[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:16px;width:16px;height:16px}@keyframes _ngcontent-%COMP%_fade-in{0%{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}.split-layout[_ngcontent-%COMP%]{flex:1;display:flex;overflow:hidden}.pane[_ngcontent-%COMP%]{display:flex;flex-direction:column;overflow:hidden}.pane--chat[_ngcontent-%COMP%]{flex:0 0 40%;background:var(--reco-bg);border-right:1px solid var(--reco-border);font-family:var(--reco-font-bubble)}.pane--reco[_ngcontent-%COMP%]{flex:1;overflow-y:auto;background:var(--reco-surface-0)}@media(max-width:767px){.split-layout[_ngcontent-%COMP%]{flex-direction:column}.pane--chat[_ngcontent-%COMP%]{flex:1;border-right:none}.pane--reco[_ngcontent-%COMP%]{flex:0 0 auto;max-height:40vh;order:-1;border-bottom:1px solid var(--reco-border)}}.reco-empty-state[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;color:var(--reco-text-muted)}.reco-empty-state[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:48px;width:48px;height:48px;opacity:.35}.reco-empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;font-size:.9rem;font-style:italic;font-family:var(--reco-font)}.reco-empty-state[_ngcontent-%COMP%]   .reco-loading-text[_ngcontent-%COMP%]{font-family:var(--reco-font-bubble);color:var(--reco-primary);animation:_ngcontent-%COMP%_note-pulse 1.5s ease-in-out infinite}.message-list[_ngcontent-%COMP%]{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px;background:var(--reco-bg);scrollbar-width:thin;scrollbar-color:var(--reco-surface-2) transparent}.empty-state[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;color:var(--reco-text-muted);text-align:center;gap:4px;padding:40px 20px}.empty-logo[_ngcontent-%COMP%]{width:80px;height:80px;object-fit:contain;opacity:.18;margin-bottom:8px}.empty-prompt[_ngcontent-%COMP%]{font-size:1rem;font-weight:500;color:var(--reco-text);margin:0}.empty-hint[_ngcontent-%COMP%]{font-style:italic;font-size:.875rem;color:var(--reco-text-muted);margin:4px 0 0}.message[_ngcontent-%COMP%]{display:flex}.message--user[_ngcontent-%COMP%]{justify-content:flex-end}.message--model[_ngcontent-%COMP%]{justify-content:flex-start}.message-bubble[_ngcontent-%COMP%]{max-width:78%;padding:10px 14px;border-radius:18px;line-height:1.7;font-size:.9rem;font-family:var(--reco-font-bubble);position:relative}.message--user[_ngcontent-%COMP%]   .message-bubble[_ngcontent-%COMP%]{background-color:var(--reco-primary);color:#fff;border-bottom-right-radius:4px;font-weight:400;white-space:pre-wrap}.message--model[_ngcontent-%COMP%]   .message-bubble[_ngcontent-%COMP%]{background-color:var(--reco-surface-2);color:var(--reco-text);border-bottom-left-radius:4px;border:1px solid var(--reco-border)}.message--model[_ngcontent-%COMP%]   .message-bubble[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{font-weight:700;color:var(--reco-primary)}.message--model[_ngcontent-%COMP%]   .message-bubble--active[_ngcontent-%COMP%]{outline:2px solid var(--reco-primary);outline-offset:2px;background-color:var(--reco-surface-1)}.message-bubble--has-rewind[_ngcontent-%COMP%]{padding-right:36px}.message-bubble--loading[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:6px;padding:10px 14px;font-style:italic;font-size:.875rem;font-family:var(--reco-font-bubble);color:var(--reco-text-muted);background-color:var(--reco-surface-1);border:1px solid var(--reco-border);border-bottom-left-radius:4px}.rewind-btn[_ngcontent-%COMP%]{position:absolute;top:4px;right:4px;width:26px;height:26px;flex-shrink:0;color:var(--reco-text-muted);opacity:.4;transition:opacity .2s ease,color .2s ease;--mdc-icon-button-state-layer-size: 26px;--mdc-icon-button-icon-size: 18px}.rewind-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:18px;width:18px;height:18px}.rewind-btn[_ngcontent-%COMP%]:hover{opacity:1;color:var(--reco-primary)}.message-time[_ngcontent-%COMP%]{display:block;font-size:.62rem;font-family:var(--reco-font);margin-top:4px}.message--user[_ngcontent-%COMP%]   .message-time[_ngcontent-%COMP%]{color:#ffffff80;text-align:right}.message--model[_ngcontent-%COMP%]   .message-time[_ngcontent-%COMP%]{color:#6b6b6b;opacity:.7}.loading-row[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px}.retry-notice[_ngcontent-%COMP%]{font-style:normal;font-size:.8rem;font-weight:700;font-family:var(--reco-font);color:var(--reco-warning)}.loading-icon[_ngcontent-%COMP%]{font-size:18px;width:18px;height:18px;flex-shrink:0;color:var(--reco-primary);animation:_ngcontent-%COMP%_note-pulse 1.5s ease-in-out infinite}.loading-phrase[_ngcontent-%COMP%]{min-width:0}@keyframes _ngcontent-%COMP%_note-pulse{0%,to{opacity:.35;transform:scale(.95)}50%{opacity:1;transform:scale(1.05)}}.error-banner[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;padding:10px 14px;border-radius:8px;background-color:#ff525226;color:var(--reco-error);font-size:.875rem;font-family:var(--reco-font);border:1px solid rgba(255,82,82,.3)}.error-banner--rate-limit[_ngcontent-%COMP%]{background-color:var(--reco-accent-dim);color:var(--reco-accent);border-color:#ff2ebe4d}.input-area[_ngcontent-%COMP%]{display:flex;align-items:center;gap:12px;padding:10px 16px;border-top:1px solid var(--reco-border);flex-shrink:0;background-color:var(--reco-surface-0);--mdc-outlined-text-field-label-text-font: var(--reco-font-bubble);--mdc-outlined-text-field-input-text-color: var(--reco-text);--mdc-outlined-text-field-label-text-color: var(--reco-text-muted);--mdc-outlined-text-field-focus-label-text-color: var(--reco-primary);--mdc-outlined-text-field-outline-color: var(--reco-border-strong);--mdc-outlined-text-field-focus-outline-color: var(--reco-primary);--mdc-outlined-text-field-hover-outline-color: var(--reco-primary);--mdc-outlined-text-field-caret-color: var(--reco-primary);--mdc-outlined-text-field-disabled-outline-color: var(--reco-border);--mat-form-field-focus-select-arrow-color: var(--reco-primary);--mdc-fab-container-color: var(--reco-primary);--mdc-fab-icon-color: #ffffff;--mat-fab-foreground-color:#ffffff}.prompt-field[_ngcontent-%COMP%]{flex:1}.prompt-field--hint[_ngcontent-%COMP%]{--mdc-outlined-text-field-input-text-color: var(--reco-text-disabled)}']})};var ld=class t{static \u0275fac=function(e){return new(e||t)};static \u0275cmp=H({type:t,selectors:[["app-root"]],decls:1,vars:0,template:function(e,i){e&1&&ie(0,"app-chat")},dependencies:[ad],styles:["[_nghost-%COMP%]{display:block;height:100vh}"]})};Tp(ld,F_).catch(t=>console.error(t));

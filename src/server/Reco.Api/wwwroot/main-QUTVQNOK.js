var kC=Object.defineProperty,RC=Object.defineProperties;var NC=Object.getOwnPropertyDescriptors;var sh=Object.getOwnPropertySymbols;var OC=Object.prototype.hasOwnProperty,FC=Object.prototype.propertyIsEnumerable;var ah=(t,n,e)=>n in t?kC(t,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[n]=e,D=(t,n)=>{for(var e in n||={})OC.call(n,e)&&ah(t,e,n[e]);if(sh)for(var e of sh(n))FC.call(n,e)&&ah(t,e,n[e]);return t},ee=(t,n)=>RC(t,NC(n));var Ke=null,Js=!1,Id=1,PC=null,Le=Symbol("SIGNAL");function O(t){let n=Ke;return Ke=t,n}function ia(){return Ke}var ui={version:0,lastCleanEpoch:0,dirty:!1,producers:void 0,producersTail:void 0,consumers:void 0,consumersTail:void 0,recomputing:!1,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,kind:"unknown",producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function fi(t){if(Js)throw new Error("");if(Ke===null)return;Ke.consumerOnSignalRead(t);let n=Ke.producersTail;if(n!==void 0&&n.producer===t)return;let e,i=Ke.recomputing;if(i&&(e=n!==void 0?n.nextProducer:Ke.producers,e!==void 0&&e.producer===t)){Ke.producersTail=e,e.lastReadVersion=t.version;return}let o=t.consumersTail;if(o!==void 0&&o.consumer===Ke&&(!i||VC(o,Ke)))return;let r=fo(Ke),s={producer:t,consumer:Ke,nextProducer:e,prevConsumer:o,lastReadVersion:t.version,nextConsumer:void 0};Ke.producersTail=s,n!==void 0?n.nextProducer=s:Ke.producers=s,r&&uh(t,s)}function lh(){Id++}function oa(t){if(!(fo(t)&&!t.dirty)&&!(!t.dirty&&t.lastCleanEpoch===Id)){if(!t.producerMustRecompute(t)&&!uo(t)){na(t);return}t.producerRecomputeValue(t),na(t)}}function Md(t){if(t.consumers===void 0)return;let n=Js;Js=!0;try{for(let e=t.consumers;e!==void 0;e=e.nextConsumer){let i=e.consumer;i.dirty||LC(i)}}finally{Js=n}}function Sd(){return Ke?.consumerAllowSignalWrites!==!1}function LC(t){t.dirty=!0,Md(t),t.consumerMarkedDirty?.(t)}function na(t){t.dirty=!1,t.lastCleanEpoch=Id}function Fn(t){return t&&ch(t),O(t)}function ch(t){t.producersTail=void 0,t.recomputing=!0}function mi(t,n){O(n),t&&dh(t)}function dh(t){t.recomputing=!1;let n=t.producersTail,e=n!==void 0?n.nextProducer:t.producers;if(e!==void 0){if(fo(t))do e=Td(e);while(e!==void 0);n!==void 0?n.nextProducer=void 0:t.producers=void 0}}function uo(t){for(let n=t.producers;n!==void 0;n=n.nextProducer){let e=n.producer,i=n.lastReadVersion;if(i!==e.version||(oa(e),i!==e.version))return!0}return!1}function Pn(t){if(fo(t)){let n=t.producers;for(;n!==void 0;)n=Td(n)}t.producers=void 0,t.producersTail=void 0,t.consumers=void 0,t.consumersTail=void 0}function uh(t,n){let e=t.consumersTail,i=fo(t);if(e!==void 0?(n.nextConsumer=e.nextConsumer,e.nextConsumer=n):(n.nextConsumer=void 0,t.consumers=n),n.prevConsumer=e,t.consumersTail=n,!i)for(let o=t.producers;o!==void 0;o=o.nextProducer)uh(o.producer,o)}function Td(t){let n=t.producer,e=t.nextProducer,i=t.nextConsumer,o=t.prevConsumer;if(t.nextConsumer=void 0,t.prevConsumer=void 0,i!==void 0?i.prevConsumer=o:n.consumersTail=o,o!==void 0)o.nextConsumer=i;else if(n.consumers=i,!fo(n)){let r=n.producers;for(;r!==void 0;)r=Td(r)}return e}function fo(t){return t.consumerIsAlwaysLive||t.consumers!==void 0}function ra(t){PC?.(t)}function VC(t,n){let e=n.producersTail;if(e!==void 0){let i=n.producers;do{if(i===t)return!0;if(i===e)break;i=i.nextProducer}while(i!==void 0)}return!1}function sa(t,n){return Object.is(t,n)}function wr(t,n){let e=Object.create(BC);e.computation=t,n!==void 0&&(e.equal=n);let i=()=>{if(oa(e),fi(e),e.value===Er)throw e.error;return e.value};return i[Le]=e,ra(e),i}var ea=Symbol("UNSET"),ta=Symbol("COMPUTING"),Er=Symbol("ERRORED"),BC=ee(D({},ui),{value:ea,dirty:!0,error:null,equal:sa,kind:"computed",producerMustRecompute(t){return t.value===ea||t.value===ta},producerRecomputeValue(t){if(t.value===ta)throw new Error("");let n=t.value;t.value=ta;let e=Fn(t),i,o=!1;try{i=t.computation(),O(null),o=n!==ea&&n!==Er&&i!==Er&&t.equal(n,i)}catch(r){i=Er,t.error=r}finally{mi(t,e)}if(o){t.value=n;return}t.value=i,t.version++}});function jC(){throw new Error}var fh=jC;function mh(t){fh(t)}function Ad(t){fh=t}var HC=null;function kd(t,n){let e=Object.create(xr);e.value=t,n!==void 0&&(e.equal=n);let i=()=>ph(e);return i[Le]=e,ra(e),[i,s=>mo(e,s),s=>Rd(e,s)]}function ph(t){return fi(t),t.value}function mo(t,n){Sd()||mh(t),t.equal(t.value,n)||(t.value=n,UC(t))}function Rd(t,n){Sd()||mh(t),mo(t,n(t.value))}var xr=ee(D({},ui),{equal:sa,value:void 0,kind:"signal"});function UC(t){t.version++,lh(),Md(t),HC?.(t)}var Nd=ee(D({},ui),{consumerIsAlwaysLive:!0,consumerAllowSignalWrites:!0,dirty:!0,kind:"effect"});function Od(t){if(t.dirty=!1,t.version>0&&!uo(t))return;t.version++;let n=Fn(t);try{t.cleanup(),t.fn()}finally{mi(t,n)}}function X(t){return typeof t=="function"}function po(t){let e=t(i=>{Error.call(i),i.stack=new Error().stack});return e.prototype=Object.create(Error.prototype),e.prototype.constructor=e,e}var aa=po(t=>function(e){t(this),this.message=e?`${e.length} errors occurred during unsubscription:
${e.map((i,o)=>`${o+1}) ${i.toString()}`).join(`
  `)}`:"",this.name="UnsubscriptionError",this.errors=e});function pi(t,n){if(t){let e=t.indexOf(n);0<=e&&t.splice(e,1)}}var de=class t{constructor(n){this.initialTeardown=n,this.closed=!1,this._parentage=null,this._finalizers=null}unsubscribe(){let n;if(!this.closed){this.closed=!0;let{_parentage:e}=this;if(e)if(this._parentage=null,Array.isArray(e))for(let r of e)r.remove(this);else e.remove(this);let{initialTeardown:i}=this;if(X(i))try{i()}catch(r){n=r instanceof aa?r.errors:[r]}let{_finalizers:o}=this;if(o){this._finalizers=null;for(let r of o)try{hh(r)}catch(s){n=n??[],s instanceof aa?n=[...n,...s.errors]:n.push(s)}}if(n)throw new aa(n)}}add(n){var e;if(n&&n!==this)if(this.closed)hh(n);else{if(n instanceof t){if(n.closed||n._hasParent(this))return;n._addParent(this)}(this._finalizers=(e=this._finalizers)!==null&&e!==void 0?e:[]).push(n)}}_hasParent(n){let{_parentage:e}=this;return e===n||Array.isArray(e)&&e.includes(n)}_addParent(n){let{_parentage:e}=this;this._parentage=Array.isArray(e)?(e.push(n),e):e?[e,n]:n}_removeParent(n){let{_parentage:e}=this;e===n?this._parentage=null:Array.isArray(e)&&pi(e,n)}remove(n){let{_finalizers:e}=this;e&&pi(e,n),n instanceof t&&n._removeParent(this)}};de.EMPTY=(()=>{let t=new de;return t.closed=!0,t})();var Fd=de.EMPTY;function la(t){return t instanceof de||t&&"closed"in t&&X(t.remove)&&X(t.add)&&X(t.unsubscribe)}function hh(t){X(t)?t():t.unsubscribe()}var Lt={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1};var ho={setTimeout(t,n,...e){let{delegate:i}=ho;return i?.setTimeout?i.setTimeout(t,n,...e):setTimeout(t,n,...e)},clearTimeout(t){let{delegate:n}=ho;return(n?.clearTimeout||clearTimeout)(t)},delegate:void 0};function ca(t){ho.setTimeout(()=>{let{onUnhandledError:n}=Lt;if(n)n(t);else throw t})}function Ir(){}var gh=Pd("C",void 0,void 0);function vh(t){return Pd("E",void 0,t)}function _h(t){return Pd("N",t,void 0)}function Pd(t,n,e){return{kind:t,value:n,error:e}}var hi=null;function go(t){if(Lt.useDeprecatedSynchronousErrorHandling){let n=!hi;if(n&&(hi={errorThrown:!1,error:null}),t(),n){let{errorThrown:e,error:i}=hi;if(hi=null,e)throw i}}else t()}function yh(t){Lt.useDeprecatedSynchronousErrorHandling&&hi&&(hi.errorThrown=!0,hi.error=t)}var gi=class extends de{constructor(n){super(),this.isStopped=!1,n?(this.destination=n,la(n)&&n.add(this)):this.destination=GC}static create(n,e,i){return new Vt(n,e,i)}next(n){this.isStopped?Vd(_h(n),this):this._next(n)}error(n){this.isStopped?Vd(vh(n),this):(this.isStopped=!0,this._error(n))}complete(){this.isStopped?Vd(gh,this):(this.isStopped=!0,this._complete())}unsubscribe(){this.closed||(this.isStopped=!0,super.unsubscribe(),this.destination=null)}_next(n){this.destination.next(n)}_error(n){try{this.destination.error(n)}finally{this.unsubscribe()}}_complete(){try{this.destination.complete()}finally{this.unsubscribe()}}},zC=Function.prototype.bind;function Ld(t,n){return zC.call(t,n)}var Bd=class{constructor(n){this.partialObserver=n}next(n){let{partialObserver:e}=this;if(e.next)try{e.next(n)}catch(i){da(i)}}error(n){let{partialObserver:e}=this;if(e.error)try{e.error(n)}catch(i){da(i)}else da(n)}complete(){let{partialObserver:n}=this;if(n.complete)try{n.complete()}catch(e){da(e)}}},Vt=class extends gi{constructor(n,e,i){super();let o;if(X(n)||!n)o={next:n??void 0,error:e??void 0,complete:i??void 0};else{let r;this&&Lt.useDeprecatedNextContext?(r=Object.create(n),r.unsubscribe=()=>this.unsubscribe(),o={next:n.next&&Ld(n.next,r),error:n.error&&Ld(n.error,r),complete:n.complete&&Ld(n.complete,r)}):o=n}this.destination=new Bd(o)}};function da(t){Lt.useDeprecatedSynchronousErrorHandling?yh(t):ca(t)}function $C(t){throw t}function Vd(t,n){let{onStoppedNotification:e}=Lt;e&&ho.setTimeout(()=>e(t,n))}var GC={closed:!0,next:Ir,error:$C,complete:Ir};var vo=typeof Symbol=="function"&&Symbol.observable||"@@observable";function mt(t){return t}function bh(t){return t.length===0?mt:t.length===1?t[0]:function(e){return t.reduce((i,o)=>o(i),e)}}var te=(()=>{class t{constructor(e){e&&(this._subscribe=e)}lift(e){let i=new t;return i.source=this,i.operator=e,i}subscribe(e,i,o){let r=qC(e)?e:new Vt(e,i,o);return go(()=>{let{operator:s,source:a}=this;r.add(s?s.call(r,a):a?this._subscribe(r):this._trySubscribe(r))}),r}_trySubscribe(e){try{return this._subscribe(e)}catch(i){e.error(i)}}forEach(e,i){return i=Dh(i),new i((o,r)=>{let s=new Vt({next:a=>{try{e(a)}catch(l){r(l),s.unsubscribe()}},error:r,complete:o});this.subscribe(s)})}_subscribe(e){var i;return(i=this.source)===null||i===void 0?void 0:i.subscribe(e)}[vo](){return this}pipe(...e){return bh(e)(this)}toPromise(e){return e=Dh(e),new e((i,o)=>{let r;this.subscribe(s=>r=s,s=>o(s),()=>i(r))})}}return t.create=n=>new t(n),t})();function Dh(t){var n;return(n=t??Lt.Promise)!==null&&n!==void 0?n:Promise}function WC(t){return t&&X(t.next)&&X(t.error)&&X(t.complete)}function qC(t){return t&&t instanceof gi||WC(t)&&la(t)}function YC(t){return X(t?.lift)}function oe(t){return n=>{if(YC(n))return n.lift(function(e){try{return t(e,this)}catch(i){this.error(i)}});throw new TypeError("Unable to lift unknown Observable type")}}function re(t,n,e,i,o){return new jd(t,n,e,i,o)}var jd=class extends gi{constructor(n,e,i,o,r,s){super(n),this.onFinalize=r,this.shouldUnsubscribe=s,this._next=e?function(a){try{e(a)}catch(l){n.error(l)}}:super._next,this._error=o?function(a){try{o(a)}catch(l){n.error(l)}finally{this.unsubscribe()}}:super._error,this._complete=i?function(){try{i()}catch(a){n.error(a)}finally{this.unsubscribe()}}:super._complete}unsubscribe(){var n;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){let{closed:e}=this;super.unsubscribe(),!e&&((n=this.onFinalize)===null||n===void 0||n.call(this))}}};var Ch=po(t=>function(){t(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"});var C=(()=>{class t extends te{constructor(){super(),this.closed=!1,this.currentObservers=null,this.observers=[],this.isStopped=!1,this.hasError=!1,this.thrownError=null}lift(e){let i=new ua(this,this);return i.operator=e,i}_throwIfClosed(){if(this.closed)throw new Ch}next(e){go(()=>{if(this._throwIfClosed(),!this.isStopped){this.currentObservers||(this.currentObservers=Array.from(this.observers));for(let i of this.currentObservers)i.next(e)}})}error(e){go(()=>{if(this._throwIfClosed(),!this.isStopped){this.hasError=this.isStopped=!0,this.thrownError=e;let{observers:i}=this;for(;i.length;)i.shift().error(e)}})}complete(){go(()=>{if(this._throwIfClosed(),!this.isStopped){this.isStopped=!0;let{observers:e}=this;for(;e.length;)e.shift().complete()}})}unsubscribe(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null}get observed(){var e;return((e=this.observers)===null||e===void 0?void 0:e.length)>0}_trySubscribe(e){return this._throwIfClosed(),super._trySubscribe(e)}_subscribe(e){return this._throwIfClosed(),this._checkFinalizedStatuses(e),this._innerSubscribe(e)}_innerSubscribe(e){let{hasError:i,isStopped:o,observers:r}=this;return i||o?Fd:(this.currentObservers=null,r.push(e),new de(()=>{this.currentObservers=null,pi(r,e)}))}_checkFinalizedStatuses(e){let{hasError:i,thrownError:o,isStopped:r}=this;i?e.error(o):r&&e.complete()}asObservable(){let e=new te;return e.source=this,e}}return t.create=(n,e)=>new ua(n,e),t})(),ua=class extends C{constructor(n,e){super(),this.destination=n,this.source=e}next(n){var e,i;(i=(e=this.destination)===null||e===void 0?void 0:e.next)===null||i===void 0||i.call(e,n)}error(n){var e,i;(i=(e=this.destination)===null||e===void 0?void 0:e.error)===null||i===void 0||i.call(e,n)}complete(){var n,e;(e=(n=this.destination)===null||n===void 0?void 0:n.complete)===null||e===void 0||e.call(n)}_subscribe(n){var e,i;return(i=(e=this.source)===null||e===void 0?void 0:e.subscribe(n))!==null&&i!==void 0?i:Fd}};var vi=class extends C{constructor(n){super(),this._value=n}get value(){return this.getValue()}_subscribe(n){let e=super._subscribe(n);return!e.closed&&n.next(this._value),e}getValue(){let{hasError:n,thrownError:e,_value:i}=this;if(n)throw e;return this._throwIfClosed(),i}next(n){super.next(this._value=n)}};var Mr={now(){return(Mr.delegate||Date).now()},delegate:void 0};var Ln=class extends C{constructor(n=1/0,e=1/0,i=Mr){super(),this._bufferSize=n,this._windowTime=e,this._timestampProvider=i,this._buffer=[],this._infiniteTimeWindow=!0,this._infiniteTimeWindow=e===1/0,this._bufferSize=Math.max(1,n),this._windowTime=Math.max(1,e)}next(n){let{isStopped:e,_buffer:i,_infiniteTimeWindow:o,_timestampProvider:r,_windowTime:s}=this;e||(i.push(n),!o&&i.push(r.now()+s)),this._trimBuffer(),super.next(n)}_subscribe(n){this._throwIfClosed(),this._trimBuffer();let e=this._innerSubscribe(n),{_infiniteTimeWindow:i,_buffer:o}=this,r=o.slice();for(let s=0;s<r.length&&!n.closed;s+=i?1:2)n.next(r[s]);return this._checkFinalizedStatuses(n),e}_trimBuffer(){let{_bufferSize:n,_timestampProvider:e,_buffer:i,_infiniteTimeWindow:o}=this,r=(o?1:2)*n;if(n<1/0&&r<i.length&&i.splice(0,i.length-r),!o){let s=e.now(),a=0;for(let l=1;l<i.length&&i[l]<=s;l+=2)a=l;a&&i.splice(0,a+1)}}};var fa=class extends de{constructor(n,e){super()}schedule(n,e=0){return this}};var Sr={setInterval(t,n,...e){let{delegate:i}=Sr;return i?.setInterval?i.setInterval(t,n,...e):setInterval(t,n,...e)},clearInterval(t){let{delegate:n}=Sr;return(n?.clearInterval||clearInterval)(t)},delegate:void 0};var ma=class extends fa{constructor(n,e){super(n,e),this.scheduler=n,this.work=e,this.pending=!1}schedule(n,e=0){var i;if(this.closed)return this;this.state=n;let o=this.id,r=this.scheduler;return o!=null&&(this.id=this.recycleAsyncId(r,o,e)),this.pending=!0,this.delay=e,this.id=(i=this.id)!==null&&i!==void 0?i:this.requestAsyncId(r,this.id,e),this}requestAsyncId(n,e,i=0){return Sr.setInterval(n.flush.bind(n,this),i)}recycleAsyncId(n,e,i=0){if(i!=null&&this.delay===i&&this.pending===!1)return e;e!=null&&Sr.clearInterval(e)}execute(n,e){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;let i=this._execute(n,e);if(i)return i;this.pending===!1&&this.id!=null&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))}_execute(n,e){let i=!1,o;try{this.work(n)}catch(r){i=!0,o=r||new Error("Scheduled action threw falsy error")}if(i)return this.unsubscribe(),o}unsubscribe(){if(!this.closed){let{id:n,scheduler:e}=this,{actions:i}=e;this.work=this.state=this.scheduler=null,this.pending=!1,pi(i,this),n!=null&&(this.id=this.recycleAsyncId(e,n,null)),this.delay=null,super.unsubscribe()}}};var _o=class t{constructor(n,e=t.now){this.schedulerActionCtor=n,this.now=e}schedule(n,e=0,i){return new this.schedulerActionCtor(this,n).schedule(i,e)}};_o.now=Mr.now;var pa=class extends _o{constructor(n,e=_o.now){super(n,e),this.actions=[],this._active=!1}flush(n){let{actions:e}=this;if(this._active){e.push(n);return}let i;this._active=!0;do if(i=n.execute(n.state,n.delay))break;while(n=e.shift());if(this._active=!1,i){for(;n=e.shift();)n.unsubscribe();throw i}}};var Tr=new pa(ma),Eh=Tr;var _i=new te(t=>t.complete());function ha(t){return t&&X(t.schedule)}function Hd(t){return t[t.length-1]}function ga(t){return X(Hd(t))?t.pop():void 0}function nn(t){return ha(Hd(t))?t.pop():void 0}function wh(t,n){return typeof Hd(t)=="number"?t.pop():n}function Ih(t,n,e,i){function o(r){return r instanceof e?r:new e(function(s){s(r)})}return new(e||(e=Promise))(function(r,s){function a(d){try{c(i.next(d))}catch(f){s(f)}}function l(d){try{c(i.throw(d))}catch(f){s(f)}}function c(d){d.done?r(d.value):o(d.value).then(a,l)}c((i=i.apply(t,n||[])).next())})}function xh(t){var n=typeof Symbol=="function"&&Symbol.iterator,e=n&&t[n],i=0;if(e)return e.call(t);if(t&&typeof t.length=="number")return{next:function(){return t&&i>=t.length&&(t=void 0),{value:t&&t[i++],done:!t}}};throw new TypeError(n?"Object is not iterable.":"Symbol.iterator is not defined.")}function yi(t){return this instanceof yi?(this.v=t,this):new yi(t)}function Mh(t,n,e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var i=e.apply(t,n||[]),o,r=[];return o=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),a("next"),a("throw"),a("return",s),o[Symbol.asyncIterator]=function(){return this},o;function s(m){return function(v){return Promise.resolve(v).then(m,f)}}function a(m,v){i[m]&&(o[m]=function(w){return new Promise(function(I,T){r.push([m,w,I,T])>1||l(m,w)})},v&&(o[m]=v(o[m])))}function l(m,v){try{c(i[m](v))}catch(w){p(r[0][3],w)}}function c(m){m.value instanceof yi?Promise.resolve(m.value.v).then(d,f):p(r[0][2],m)}function d(m){l("next",m)}function f(m){l("throw",m)}function p(m,v){m(v),r.shift(),r.length&&l(r[0][0],r[0][1])}}function Sh(t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var n=t[Symbol.asyncIterator],e;return n?n.call(t):(t=typeof xh=="function"?xh(t):t[Symbol.iterator](),e={},i("next"),i("throw"),i("return"),e[Symbol.asyncIterator]=function(){return this},e);function i(r){e[r]=t[r]&&function(s){return new Promise(function(a,l){s=t[r](s),o(a,l,s.done,s.value)})}}function o(r,s,a,l){Promise.resolve(l).then(function(c){r({value:c,done:a})},s)}}var va=t=>t&&typeof t.length=="number"&&typeof t!="function";function _a(t){return X(t?.then)}function ya(t){return X(t[vo])}function ba(t){return Symbol.asyncIterator&&X(t?.[Symbol.asyncIterator])}function Da(t){return new TypeError(`You provided ${t!==null&&typeof t=="object"?"an invalid object":`'${t}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)}function ZC(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var Ca=ZC();function Ea(t){return X(t?.[Ca])}function wa(t){return Mh(this,arguments,function*(){let e=t.getReader();try{for(;;){let{value:i,done:o}=yield yi(e.read());if(o)return yield yi(void 0);yield yield yi(i)}}finally{e.releaseLock()}})}function xa(t){return X(t?.getReader)}function pe(t){if(t instanceof te)return t;if(t!=null){if(ya(t))return KC(t);if(va(t))return XC(t);if(_a(t))return QC(t);if(ba(t))return Th(t);if(Ea(t))return JC(t);if(xa(t))return eE(t)}throw Da(t)}function KC(t){return new te(n=>{let e=t[vo]();if(X(e.subscribe))return e.subscribe(n);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function XC(t){return new te(n=>{for(let e=0;e<t.length&&!n.closed;e++)n.next(t[e]);n.complete()})}function QC(t){return new te(n=>{t.then(e=>{n.closed||(n.next(e),n.complete())},e=>n.error(e)).then(null,ca)})}function JC(t){return new te(n=>{for(let e of t)if(n.next(e),n.closed)return;n.complete()})}function Th(t){return new te(n=>{tE(t,n).catch(e=>n.error(e))})}function eE(t){return Th(wa(t))}function tE(t,n){var e,i,o,r;return Ih(this,void 0,void 0,function*(){try{for(e=Sh(t);i=yield e.next(),!i.done;){let s=i.value;if(n.next(s),n.closed)return}}catch(s){o={error:s}}finally{try{i&&!i.done&&(r=e.return)&&(yield r.call(e))}finally{if(o)throw o.error}}n.complete()})}function rt(t,n,e,i=0,o=!1){let r=n.schedule(function(){e(),o?t.add(this.schedule(null,i)):this.unsubscribe()},i);if(t.add(r),!o)return r}function Ia(t,n=0){return oe((e,i)=>{e.subscribe(re(i,o=>rt(i,t,()=>i.next(o),n),()=>rt(i,t,()=>i.complete(),n),o=>rt(i,t,()=>i.error(o),n)))})}function Ma(t,n=0){return oe((e,i)=>{i.add(t.schedule(()=>e.subscribe(i),n))})}function Ah(t,n){return pe(t).pipe(Ma(n),Ia(n))}function kh(t,n){return pe(t).pipe(Ma(n),Ia(n))}function Rh(t,n){return new te(e=>{let i=0;return n.schedule(function(){i===t.length?e.complete():(e.next(t[i++]),e.closed||this.schedule())})})}function Nh(t,n){return new te(e=>{let i;return rt(e,n,()=>{i=t[Ca](),rt(e,n,()=>{let o,r;try{({value:o,done:r}=i.next())}catch(s){e.error(s);return}r?e.complete():e.next(o)},0,!0)}),()=>X(i?.return)&&i.return()})}function Sa(t,n){if(!t)throw new Error("Iterable cannot be null");return new te(e=>{rt(e,n,()=>{let i=t[Symbol.asyncIterator]();rt(e,n,()=>{i.next().then(o=>{o.done?e.complete():e.next(o.value)})},0,!0)})})}function Oh(t,n){return Sa(wa(t),n)}function Fh(t,n){if(t!=null){if(ya(t))return Ah(t,n);if(va(t))return Rh(t,n);if(_a(t))return kh(t,n);if(ba(t))return Sa(t,n);if(Ea(t))return Nh(t,n);if(xa(t))return Oh(t,n)}throw Da(t)}function bt(t,n){return n?Fh(t,n):pe(t)}function Ve(...t){let n=nn(t);return bt(t,n)}function Ar(t,n){let e=X(t)?t:()=>t,i=o=>o.error(e());return new te(n?o=>n.schedule(i,0,o):i)}var Ph=po(t=>function(){t(this),this.name="EmptyError",this.message="no elements in sequence"});function Ud(t,n){let e=typeof n=="object";return new Promise((i,o)=>{let r=new Vt({next:s=>{i(s),r.unsubscribe()},error:o,complete:()=>{e?i(n.defaultValue):o(new Ph)}});t.subscribe(r)})}function Lh(t){return t instanceof Date&&!isNaN(t)}function ve(t,n){return oe((e,i)=>{let o=0;e.subscribe(re(i,r=>{i.next(t.call(n,r,o++))}))})}var{isArray:nE}=Array;function iE(t,n){return nE(n)?t(...n):t(n)}function Ta(t){return ve(n=>iE(t,n))}var{isArray:oE}=Array,{getPrototypeOf:rE,prototype:sE,keys:aE}=Object;function Aa(t){if(t.length===1){let n=t[0];if(oE(n))return{args:n,keys:null};if(lE(n)){let e=aE(n);return{args:e.map(i=>n[i]),keys:e}}}return{args:t,keys:null}}function lE(t){return t&&typeof t=="object"&&rE(t)===sE}function ka(t,n){return t.reduce((e,i,o)=>(e[i]=n[o],e),{})}function zd(...t){let n=nn(t),e=ga(t),{args:i,keys:o}=Aa(t);if(i.length===0)return bt([],n);let r=new te(cE(i,n,o?s=>ka(o,s):mt));return e?r.pipe(Ta(e)):r}function cE(t,n,e=mt){return i=>{Vh(n,()=>{let{length:o}=t,r=new Array(o),s=o,a=o;for(let l=0;l<o;l++)Vh(n,()=>{let c=bt(t[l],n),d=!1;c.subscribe(re(i,f=>{r[l]=f,d||(d=!0,a--),a||i.next(e(r.slice()))},()=>{--s||i.complete()}))},i)},i)}}function Vh(t,n,e){t?rt(e,t,n):n()}function Bh(t,n,e,i,o,r,s,a){let l=[],c=0,d=0,f=!1,p=()=>{f&&!l.length&&!c&&n.complete()},m=w=>c<i?v(w):l.push(w),v=w=>{r&&n.next(w),c++;let I=!1;pe(e(w,d++)).subscribe(re(n,T=>{o?.(T),r?m(T):n.next(T)},()=>{I=!0},void 0,()=>{if(I)try{for(c--;l.length&&c<i;){let T=l.shift();s?rt(n,s,()=>v(T)):v(T)}p()}catch(T){n.error(T)}}))};return t.subscribe(re(n,m,()=>{f=!0,p()})),()=>{a?.()}}function yo(t,n,e=1/0){return X(n)?yo((i,o)=>ve((r,s)=>n(i,r,o,s))(pe(t(i,o))),e):(typeof n=="number"&&(e=n),oe((i,o)=>Bh(i,o,t,e)))}function Ra(t=1/0){return yo(mt,t)}function jh(){return Ra(1)}function bo(...t){return jh()(bt(t,nn(t)))}function kr(t){return new te(n=>{pe(t()).subscribe(n)})}function Rr(...t){let n=ga(t),{args:e,keys:i}=Aa(t),o=new te(r=>{let{length:s}=e;if(!s){r.complete();return}let a=new Array(s),l=s,c=s;for(let d=0;d<s;d++){let f=!1;pe(e[d]).subscribe(re(r,p=>{f||(f=!0,c--),a[d]=p},()=>l--,void 0,()=>{(!l||!f)&&(c||r.next(i?ka(i,a):a),r.complete())}))}});return n?o.pipe(Ta(n)):o}function bi(t=0,n,e=Eh){let i=-1;return n!=null&&(ha(n)?e=n:i=n),new te(o=>{let r=Lh(t)?+t-e.now():t;r<0&&(r=0);let s=0;return e.schedule(function(){o.closed||(o.next(s++),0<=i?this.schedule(void 0,i):o.complete())},r)})}function yn(...t){let n=nn(t),e=wh(t,1/0),i=t;return i.length?i.length===1?pe(i[0]):Ra(e)(bt(i,n)):_i}function Me(t,n){return oe((e,i)=>{let o=0;e.subscribe(re(i,r=>t.call(n,r,o++)&&i.next(r)))})}function Hh(t){return oe((n,e)=>{let i=!1,o=null,r=null,s=!1,a=()=>{if(r?.unsubscribe(),r=null,i){i=!1;let c=o;o=null,e.next(c)}s&&e.complete()},l=()=>{r=null,s&&e.complete()};n.subscribe(re(e,c=>{i=!0,o=c,r||pe(t(c)).subscribe(r=re(e,a,l))},()=>{s=!0,(!i||!r||r.closed)&&e.complete()}))})}function Na(t,n=Tr){return Hh(()=>bi(t,n))}function Oa(t){return oe((n,e)=>{let i=null,o=!1,r;i=n.subscribe(re(e,void 0,void 0,s=>{r=pe(t(s,Oa(t)(n))),i?(i.unsubscribe(),i=null,r.subscribe(e)):o=!0})),o&&(i.unsubscribe(),i=null,r.subscribe(e))})}function $d(t,n){return X(n)?yo(t,n,1):yo(t,1)}function Nr(t,n=Tr){return oe((e,i)=>{let o=null,r=null,s=null,a=()=>{if(o){o.unsubscribe(),o=null;let c=r;r=null,i.next(c)}};function l(){let c=s+t,d=n.now();if(d<c){o=this.schedule(void 0,c-d),i.add(o);return}a()}e.subscribe(re(i,c=>{r=c,s=n.now(),o||(o=n.schedule(l,t),i.add(o))},()=>{a(),i.complete()},void 0,()=>{r=o=null}))})}function pt(t){return t<=0?()=>_i:oe((n,e)=>{let i=0;n.subscribe(re(e,o=>{++i<=t&&(e.next(o),t<=i&&e.complete())}))})}function Fa(t,n=mt){return t=t??dE,oe((e,i)=>{let o,r=!0;e.subscribe(re(i,s=>{let a=n(s);(r||!t(o,a))&&(r=!1,o=a,i.next(s))}))})}function dE(t,n){return t===n}function Or(t){return oe((n,e)=>{try{n.subscribe(e)}finally{e.add(t)}})}function Pa(){return oe((t,n)=>{let e,i=!1;t.subscribe(re(n,o=>{let r=e;e=o,i&&n.next([r,o]),i=!0}))})}function Gd(t=1/0){let n;t&&typeof t=="object"?n=t:n={count:t};let{count:e=1/0,delay:i,resetOnSuccess:o=!1}=n;return e<=0?mt:oe((r,s)=>{let a=0,l,c=()=>{let d=!1;l=r.subscribe(re(s,f=>{o&&(a=0),s.next(f)},void 0,f=>{if(a++<e){let p=()=>{l?(l.unsubscribe(),l=null,c()):d=!0};if(i!=null){let m=typeof i=="number"?bi(i):pe(i(f,a)),v=re(s,()=>{v.unsubscribe(),p()},()=>{s.complete()});m.subscribe(v)}else p()}else s.error(f)})),d&&(l.unsubscribe(),l=null,c())};c()})}function Fr(t={}){let{connector:n=()=>new C,resetOnError:e=!0,resetOnComplete:i=!0,resetOnRefCountZero:o=!0}=t;return r=>{let s,a,l,c=0,d=!1,f=!1,p=()=>{a?.unsubscribe(),a=void 0},m=()=>{p(),s=l=void 0,d=f=!1},v=()=>{let w=s;m(),w?.unsubscribe()};return oe((w,I)=>{c++,!f&&!d&&p();let T=l=l??n();I.add(()=>{c--,c===0&&!f&&!d&&(a=Wd(v,o))}),T.subscribe(I),!s&&c>0&&(s=new Vt({next:ye=>T.next(ye),error:ye=>{f=!0,p(),a=Wd(m,e,ye),T.error(ye)},complete:()=>{d=!0,p(),a=Wd(m,i),T.complete()}}),pe(w).subscribe(s))})(r)}}function Wd(t,n,...e){if(n===!0){t();return}if(n===!1)return;let i=new Vt({next:()=>{i.unsubscribe(),t()}});return pe(n(...e)).subscribe(i)}function La(t,n,e){let i,o=!1;return t&&typeof t=="object"?{bufferSize:i=1/0,windowTime:n=1/0,refCount:o=!1,scheduler:e}=t:i=t??1/0,Fr({connector:()=>new Ln(i,n,e),resetOnError:!0,resetOnComplete:!1,resetOnRefCountZero:o})}function Pr(t){return Me((n,e)=>t<=e)}function st(...t){let n=nn(t);return oe((e,i)=>{(n?bo(t,e,n):bo(t,e)).subscribe(i)})}function Di(t,n){return oe((e,i)=>{let o=null,r=0,s=!1,a=()=>s&&!o&&i.complete();e.subscribe(re(i,l=>{o?.unsubscribe();let c=0,d=r++;pe(t(l,d)).subscribe(o=re(i,f=>i.next(n?n(l,f,d,c++):f),()=>{o=null,a()}))},()=>{s=!0,a()}))})}function Se(t){return oe((n,e)=>{pe(t).subscribe(re(e,()=>e.complete(),Ir)),!e.closed&&n.subscribe(e)})}function Ci(t,n,e){let i=X(t)||n||e?{next:t,error:n,complete:e}:t;return i?oe((o,r)=>{var s;(s=i.subscribe)===null||s===void 0||s.call(i);let a=!0;o.subscribe(re(r,l=>{var c;(c=i.next)===null||c===void 0||c.call(i,l),r.next(l)},()=>{var l;a=!1,(l=i.complete)===null||l===void 0||l.call(i),r.complete()},l=>{var c;a=!1,(c=i.error)===null||c===void 0||c.call(i,l),r.error(l)},()=>{var l,c;a&&((l=i.unsubscribe)===null||l===void 0||l.call(i)),(c=i.finalize)===null||c===void 0||c.call(i)}))}):mt}var qd;function Va(){return qd}function on(t){let n=qd;return qd=t,n}var Uh=Symbol("NotFound");function Do(t){return t===Uh||t?.name==="\u0275NotFound"}function zh(t){let n=O(null);try{return t()}finally{O(n)}}var Ga="https://angular.dev/best-practices/security#preventing-cross-site-scripting-xss",A=class extends Error{code;constructor(n,e){super(Hn(n,e)),this.code=n}};function uE(t){return`NG0${Math.abs(t)}`}function Hn(t,n){return`${uE(t)}${n?": "+n:""}`}var Un=globalThis;function ge(t){for(let n in t)if(t[n]===ge)return n;throw Error("")}function Yh(t,n){for(let e in n)n.hasOwnProperty(e)&&!t.hasOwnProperty(e)&&(t[e]=n[e])}function Wa(t){if(typeof t=="string")return t;if(Array.isArray(t))return`[${t.map(Wa).join(", ")}]`;if(t==null)return""+t;let n=t.overriddenName||t.name;if(n)return`${n}`;let e=t.toString();if(e==null)return""+e;let i=e.indexOf(`
`);return i>=0?e.slice(0,i):e}function qa(t,n){return t?n?`${t} ${n}`:t:n||""}var fE=ge({__forward_ref__:ge});function Dt(t){return t.__forward_ref__=Dt,t}function Be(t){return su(t)?t():t}function su(t){return typeof t=="function"&&t.hasOwnProperty(fE)&&t.__forward_ref__===Dt}function b(t){return{token:t.token,providedIn:t.providedIn||null,factory:t.factory,value:void 0}}function z(t){return{providers:t.providers||[],imports:t.imports||[]}}function Ya(t){return mE(t,Za)}function mE(t,n){return t.hasOwnProperty(n)&&t[n]||null}function pE(t){let n=t?.[Za]??null;return n||null}function Zd(t){return t&&t.hasOwnProperty(ja)?t[ja]:null}var Za=ge({\u0275prov:ge}),ja=ge({\u0275inj:ge}),_=class{_desc;ngMetadataName="InjectionToken";\u0275prov;constructor(n,e){this._desc=n,this.\u0275prov=void 0,typeof e=="number"?this.__NG_ELEMENT_ID__=e:e!==void 0&&(this.\u0275prov=b({token:this,providedIn:e.providedIn||"root",factory:e.factory}))}get multi(){return this}toString(){return`InjectionToken ${this._desc}`}};function au(t){return t&&!!t.\u0275providers}var lu=ge({\u0275cmp:ge}),cu=ge({\u0275dir:ge}),du=ge({\u0275pipe:ge});var Vr=ge({\u0275fac:ge}),Mi=ge({__NG_ELEMENT_ID__:ge}),$h=ge({__NG_ENV_ID__:ge});function zn(t){return uu(t,"@Component"),t[lu]||null}function Ka(t){return uu(t,"@Directive"),t[cu]||null}function Zh(t){return uu(t,"@Pipe"),t[du]||null}function uu(t,n){if(t==null)throw new A(-919,!1)}function Si(t){return typeof t=="string"?t:t==null?"":String(t)}var Kh=ge({ngErrorCode:ge}),hE=ge({ngErrorMessage:ge}),gE=ge({ngTokenPath:ge});function fu(t,n){return Xh("",-200,n)}function Xa(t,n){throw new A(-201,!1)}function Xh(t,n,e){let i=new A(n,t);return i[Kh]=n,i[hE]=t,e&&(i[gE]=e),i}function vE(t){return t[Kh]}var Kd;function Qh(){return Kd}function et(t){let n=Kd;return Kd=t,n}function mu(t,n,e){let i=Ya(t);if(i&&i.providedIn=="root")return i.value===void 0?i.value=i.factory():i.value;if(e&8)return null;if(n!==void 0)return n;Xa(t,"")}var _E={},Ei=_E,yE="__NG_DI_FLAG__",Xd=class{injector;constructor(n){this.injector=n}retrieve(n,e){let i=wi(e)||0;try{return this.injector.get(n,i&8?null:Ei,i)}catch(o){if(Do(o))return o;throw o}}};function bE(t,n=0){let e=Va();if(e===void 0)throw new A(-203,!1);if(e===null)return mu(t,void 0,n);{let i=DE(n),o=e.retrieve(t,i);if(Do(o)){if(i.optional)return null;throw o}return o}}function M(t,n=0){return(Qh()||bE)(Be(t),n)}function u(t,n){return M(t,wi(n))}function wi(t){return typeof t>"u"||typeof t=="number"?t:0|(t.optional&&8)|(t.host&&1)|(t.self&&2)|(t.skipSelf&&4)}function DE(t){return{optional:!!(t&8),host:!!(t&1),self:!!(t&2),skipSelf:!!(t&4)}}function Qd(t){let n=[];for(let e=0;e<t.length;e++){let i=Be(t[e]);if(Array.isArray(i)){if(i.length===0)throw new A(900,!1);let o,r=0;for(let s=0;s<i.length;s++){let a=i[s],l=CE(a);typeof l=="number"?l===-1?o=a.token:r|=l:o=a}n.push(M(o,r))}else n.push(M(i))}return n}function CE(t){return t[yE]}function Vn(t,n){let e=t.hasOwnProperty(Vr);return e?t[Vr]:null}function Jh(t,n,e){if(t.length!==n.length)return!1;for(let i=0;i<t.length;i++){let o=t[i],r=n[i];if(e&&(o=e(o),r=e(r)),r!==o)return!1}return!0}function eg(t){return t.flat(Number.POSITIVE_INFINITY)}function Qa(t,n){t.forEach(e=>Array.isArray(e)?Qa(e,n):n(e))}function pu(t,n,e){n>=t.length?t.push(e):t.splice(n,0,e)}function zr(t,n){return n>=t.length-1?t.pop():t.splice(n,1)[0]}function tg(t,n){let e=[];for(let i=0;i<t;i++)e.push(n);return e}function ng(t,n,e,i){let o=t.length;if(o==n)t.push(e,i);else if(o===1)t.push(i,t[0]),t[0]=e;else{for(o--,t.push(t[o-1],t[o]);o>n;){let r=o-2;t[o]=t[r],o--}t[n]=e,t[n+1]=i}}function Ja(t,n,e){let i=Eo(t,n);return i>=0?t[i|1]=e:(i=~i,ng(t,i,n,e)),i}function el(t,n){let e=Eo(t,n);if(e>=0)return t[e|1]}function Eo(t,n){return EE(t,n,1)}function EE(t,n,e){let i=0,o=t.length>>e;for(;o!==i;){let r=i+(o-i>>1),s=t[r<<e];if(n===s)return r<<e;s>n?o=r:i=r+1}return~(o<<e)}var Bt={},Xe=[],Ti=new _(""),hu=new _("",-1),gu=new _(""),Br=class{get(n,e=Ei){if(e===Ei){let o=Xh("",-201);throw o.name="\u0275NotFound",o}return e}};function Ai(t){return{\u0275providers:t}}function ig(t){return Ai([{provide:Ti,multi:!0,useValue:t}])}function og(...t){return{\u0275providers:vu(!0,t),\u0275fromNgModule:!0}}function vu(t,...n){let e=[],i=new Set,o,r=s=>{e.push(s)};return Qa(n,s=>{let a=s;Ha(a,r,[],i)&&(o||=[],o.push(a))}),o!==void 0&&rg(o,r),e}function rg(t,n){for(let e=0;e<t.length;e++){let{ngModule:i,providers:o}=t[e];_u(o,r=>{n(r,i)})}}function Ha(t,n,e,i){if(t=Be(t),!t)return!1;let o=null,r=Zd(t),s=!r&&zn(t);if(!r&&!s){let l=t.ngModule;if(r=Zd(l),r)o=l;else return!1}else{if(s&&!s.standalone)return!1;o=t}let a=i.has(o);if(s){if(a)return!1;if(i.add(o),s.dependencies){let l=typeof s.dependencies=="function"?s.dependencies():s.dependencies;for(let c of l)Ha(c,n,e,i)}}else if(r){if(r.imports!=null&&!a){i.add(o);let c;Qa(r.imports,d=>{Ha(d,n,e,i)&&(c||=[],c.push(d))}),c!==void 0&&rg(c,n)}if(!a){let c=Vn(o)||(()=>new o);n({provide:o,useFactory:c,deps:Xe},o),n({provide:gu,useValue:o,multi:!0},o),n({provide:Ti,useValue:()=>M(o),multi:!0},o)}let l=r.providers;if(l!=null&&!a){let c=t;_u(l,d=>{n(d,c)})}}else return!1;return o!==t&&t.providers!==void 0}function _u(t,n){for(let e of t)au(e)&&(e=e.\u0275providers),Array.isArray(e)?_u(e,n):n(e)}var wE=ge({provide:String,useValue:ge});function sg(t){return t!==null&&typeof t=="object"&&wE in t}function xE(t){return!!(t&&t.useExisting)}function IE(t){return!!(t&&t.useFactory)}function xi(t){return typeof t=="function"}function ag(t){return!!t.useClass}var $r=new _(""),Ba={},Gh={},Yd;function wo(){return Yd===void 0&&(Yd=new Br),Yd}var Re=class{},Ii=class extends Re{parent;source;scopes;records=new Map;_ngOnDestroyHooks=new Set;_onDestroyHooks=[];get destroyed(){return this._destroyed}_destroyed=!1;injectorDefTypes;constructor(n,e,i,o){super(),this.parent=e,this.source=i,this.scopes=o,eu(n,s=>this.processProvider(s)),this.records.set(hu,Co(void 0,this)),o.has("environment")&&this.records.set(Re,Co(void 0,this));let r=this.records.get($r);r!=null&&typeof r.value=="string"&&this.scopes.add(r.value),this.injectorDefTypes=new Set(this.get(gu,Xe,{self:!0}))}retrieve(n,e){let i=wi(e)||0;try{return this.get(n,Ei,i)}catch(o){if(Do(o))return o;throw o}}destroy(){Lr(this),this._destroyed=!0;let n=O(null);try{for(let i of this._ngOnDestroyHooks)i.ngOnDestroy();let e=this._onDestroyHooks;this._onDestroyHooks=[];for(let i of e)i()}finally{this.records.clear(),this._ngOnDestroyHooks.clear(),this.injectorDefTypes.clear(),O(n)}}onDestroy(n){return Lr(this),this._onDestroyHooks.push(n),()=>this.removeOnDestroy(n)}runInContext(n){Lr(this);let e=on(this),i=et(void 0),o;try{return n()}finally{on(e),et(i)}}get(n,e=Ei,i){if(Lr(this),n.hasOwnProperty($h))return n[$h](this);let o=wi(i),r,s=on(this),a=et(void 0);try{if(!(o&4)){let c=this.records.get(n);if(c===void 0){let d=kE(n)&&Ya(n);d&&this.injectableDefInScope(d)?c=Co(Jd(n),Ba):c=null,this.records.set(n,c)}if(c!=null)return this.hydrate(n,c,o)}let l=o&2?wo():this.parent;return e=o&8&&e===Ei?null:e,l.get(n,e)}catch(l){let c=vE(l);throw c===-200||c===-201?new A(c,null):l}finally{et(a),on(s)}}resolveInjectorInitializers(){let n=O(null),e=on(this),i=et(void 0),o;try{let r=this.get(Ti,Xe,{self:!0});for(let s of r)s()}finally{on(e),et(i),O(n)}}toString(){return"R3Injector[...]"}processProvider(n){n=Be(n);let e=xi(n)?n:Be(n&&n.provide),i=SE(n);if(!xi(n)&&n.multi===!0){let o=this.records.get(e);o||(o=Co(void 0,Ba,!0),o.factory=()=>Qd(o.multi),this.records.set(e,o)),e=n,o.multi.push(n)}this.records.set(e,i)}hydrate(n,e,i){let o=O(null);try{if(e.value===Gh)throw fu("");return e.value===Ba&&(e.value=Gh,e.value=e.factory(void 0,i)),typeof e.value=="object"&&e.value&&AE(e.value)&&this._ngOnDestroyHooks.add(e.value),e.value}finally{O(o)}}injectableDefInScope(n){if(!n.providedIn)return!1;let e=Be(n.providedIn);return typeof e=="string"?e==="any"||this.scopes.has(e):this.injectorDefTypes.has(e)}removeOnDestroy(n){let e=this._onDestroyHooks.indexOf(n);e!==-1&&this._onDestroyHooks.splice(e,1)}};function Jd(t){let n=Ya(t),e=n!==null?n.factory:Vn(t);if(e!==null)return e;if(t instanceof _)throw new A(-204,!1);if(t instanceof Function)return ME(t);throw new A(-204,!1)}function ME(t){if(t.length>0)throw new A(-204,!1);let e=pE(t);return e!==null?()=>e.factory(t):()=>new t}function SE(t){if(sg(t))return Co(void 0,t.useValue);{let n=yu(t);return Co(n,Ba)}}function yu(t,n,e){let i;if(xi(t)){let o=Be(t);return Vn(o)||Jd(o)}else if(sg(t))i=()=>Be(t.useValue);else if(IE(t))i=()=>t.useFactory(...Qd(t.deps||[]));else if(xE(t))i=(o,r)=>M(Be(t.useExisting),r!==void 0&&r&8?8:void 0);else{let o=Be(t&&(t.useClass||t.provide));if(TE(t))i=()=>new o(...Qd(t.deps));else return Vn(o)||Jd(o)}return i}function Lr(t){if(t.destroyed)throw new A(-205,!1)}function Co(t,n,e=!1){return{factory:t,value:n,multi:e?[]:void 0}}function TE(t){return!!t.deps}function AE(t){return t!==null&&typeof t=="object"&&typeof t.ngOnDestroy=="function"}function kE(t){return typeof t=="function"||typeof t=="object"&&t.ngMetadataName==="InjectionToken"}function eu(t,n){for(let e of t)Array.isArray(e)?eu(e,n):e&&au(e)?eu(e.\u0275providers,n):n(e)}function xo(t,n){let e;t instanceof Ii?(Lr(t),e=t):e=new Xd(t);let i,o=on(e),r=et(void 0);try{return n()}finally{on(o),et(r)}}function lg(){return Qh()!==void 0||Va()!=null}var jt=0,P=1,U=2,je=3,Ct=4,tt=5,ki=6,Io=7,Ne=8,Dn=9,Ht=10,_e=11,Mo=12,bu=13,Ri=14,nt=15,$n=16,Ni=17,sn=18,Cn=19,Du=20,bn=21,tl=22,Bn=23,ht=24,Oi=25,Gn=26,De=27,cg=1,Cu=6,Wn=7,Gr=8,Fi=9,Te=10;function En(t){return Array.isArray(t)&&typeof t[cg]=="object"}function Ut(t){return Array.isArray(t)&&t[cg]===!0}function Eu(t){return(t.flags&4)!==0}function wn(t){return t.componentOffset>-1}function So(t){return(t.flags&1)===1}function zt(t){return!!t.template}function To(t){return(t[U]&512)!==0}function Pi(t){return(t[U]&256)===256}var wu="svg",dg="math";function Et(t){for(;Array.isArray(t);)t=t[jt];return t}function xu(t,n){return Et(n[t])}function $t(t,n){return Et(n[t.index])}function nl(t,n){return t.data[n]}function Iu(t,n){return t[n]}function Mu(t,n,e,i){e>=t.data.length&&(t.data[e]=null,t.blueprint[e]=null),n[e]=i}function wt(t,n){let e=n[t];return En(e)?e:e[jt]}function ug(t){return(t[U]&4)===4}function il(t){return(t[U]&128)===128}function fg(t){return Ut(t[je])}function gt(t,n){return n==null?null:t[n]}function Su(t){t[Ni]=0}function Tu(t){t[U]&1024||(t[U]|=1024,il(t)&&Li(t))}function mg(t,n){for(;t>0;)n=n[Ri],t--;return n}function Wr(t){return!!(t[U]&9216||t[ht]?.dirty)}function ol(t){t[Ht].changeDetectionScheduler?.notify(8),t[U]&64&&(t[U]|=1024),Wr(t)&&Li(t)}function Li(t){t[Ht].changeDetectionScheduler?.notify(0);let n=jn(t);for(;n!==null&&!(n[U]&8192||(n[U]|=8192,!il(n)));)n=jn(n)}function Au(t,n){if(Pi(t))throw new A(911,!1);t[bn]===null&&(t[bn]=[]),t[bn].push(n)}function pg(t,n){if(t[bn]===null)return;let e=t[bn].indexOf(n);e!==-1&&t[bn].splice(e,1)}function jn(t){let n=t[je];return Ut(n)?n[je]:n}function ku(t){return t[Io]??=[]}function Ru(t){return t.cleanup??=[]}function hg(t,n,e,i){let o=ku(n);o.push(e),t.firstCreatePass&&Ru(t).push(i,o.length-1)}var K={lFrame:Sg(null),bindingsEnabled:!0,skipHydrationRootTNode:null};var tu=!1;function gg(){return K.lFrame.elementDepthCount}function vg(){K.lFrame.elementDepthCount++}function Nu(){K.lFrame.elementDepthCount--}function rl(){return K.bindingsEnabled}function Ou(){return K.skipHydrationRootTNode!==null}function Fu(t){return K.skipHydrationRootTNode===t}function Pu(){K.skipHydrationRootTNode=null}function $(){return K.lFrame.lView}function Ce(){return K.lFrame.tView}function we(t){return K.lFrame.contextLView=t,t[Ne]}function xe(t){return K.lFrame.contextLView=null,t}function $e(){let t=Lu();for(;t!==null&&t.type===64;)t=t.parent;return t}function Lu(){return K.lFrame.currentTNode}function _g(){let t=K.lFrame,n=t.currentTNode;return t.isParent?n:n.parent}function Ao(t,n){let e=K.lFrame;e.currentTNode=t,e.isParent=n}function Vu(){return K.lFrame.isParent}function Bu(){K.lFrame.isParent=!1}function yg(){return K.lFrame.contextLView}function ju(){return tu}function jr(t){let n=tu;return tu=t,n}function bg(){let t=K.lFrame,n=t.bindingRootIndex;return n===-1&&(n=t.bindingRootIndex=t.tView.bindingStartIndex),n}function Dg(){return K.lFrame.bindingIndex}function Cg(t){return K.lFrame.bindingIndex=t}function Vi(){return K.lFrame.bindingIndex++}function sl(t){let n=K.lFrame,e=n.bindingIndex;return n.bindingIndex=n.bindingIndex+t,e}function Eg(){return K.lFrame.inI18n}function wg(t,n){let e=K.lFrame;e.bindingIndex=e.bindingRootIndex=t,al(n)}function xg(){return K.lFrame.currentDirectiveIndex}function al(t){K.lFrame.currentDirectiveIndex=t}function Ig(t){let n=K.lFrame.currentDirectiveIndex;return n===-1?null:t[n]}function ll(){return K.lFrame.currentQueryIndex}function qr(t){K.lFrame.currentQueryIndex=t}function RE(t){let n=t[P];return n.type===2?n.declTNode:n.type===1?t[tt]:null}function Hu(t,n,e){if(e&4){let o=n,r=t;for(;o=o.parent,o===null&&!(e&1);)if(o=RE(r),o===null||(r=r[Ri],o.type&10))break;if(o===null)return!1;n=o,t=r}let i=K.lFrame=Mg();return i.currentTNode=n,i.lView=t,!0}function cl(t){let n=Mg(),e=t[P];K.lFrame=n,n.currentTNode=e.firstChild,n.lView=t,n.tView=e,n.contextLView=t,n.bindingIndex=e.bindingStartIndex,n.inI18n=!1}function Mg(){let t=K.lFrame,n=t===null?null:t.child;return n===null?Sg(t):n}function Sg(t){let n={currentTNode:null,isParent:!0,lView:null,tView:null,selectedIndex:-1,contextLView:null,elementDepthCount:0,currentNamespace:null,currentDirectiveIndex:-1,bindingRootIndex:-1,bindingIndex:-1,currentQueryIndex:0,parent:t,child:null,inI18n:!1};return t!==null&&(t.child=n),n}function Tg(){let t=K.lFrame;return K.lFrame=t.parent,t.currentTNode=null,t.lView=null,t}var Uu=Tg;function dl(){let t=Tg();t.isParent=!0,t.tView=null,t.selectedIndex=-1,t.contextLView=null,t.elementDepthCount=0,t.currentDirectiveIndex=-1,t.currentNamespace=null,t.bindingRootIndex=-1,t.bindingIndex=-1,t.currentQueryIndex=0}function Ag(t){return(K.lFrame.contextLView=mg(t,K.lFrame.contextLView))[Ne]}function an(){return K.lFrame.selectedIndex}function qn(t){K.lFrame.selectedIndex=t}function ul(){let t=K.lFrame;return nl(t.tView,t.selectedIndex)}function Bi(){K.lFrame.currentNamespace=wu}function fl(){NE()}function NE(){K.lFrame.currentNamespace=null}function kg(){return K.lFrame.currentNamespace}var Rg=!0;function ml(){return Rg}function Yr(t){Rg=t}function nu(t,n=null,e=null,i){let o=Ng(t,n,e,i);return o.resolveInjectorInitializers(),o}function Ng(t,n=null,e=null,i,o=new Set){let r=[e||Xe,og(t)],s;return new Ii(r,n||wo(),s||null,o)}var F=class t{static THROW_IF_NOT_FOUND=Ei;static NULL=new Br;static create(n,e){if(Array.isArray(n))return nu({name:""},e,n,"");{let i=n.name??"";return nu({name:i},n.parent,n.providers,i)}}static \u0275prov=b({token:t,providedIn:"any",factory:()=>M(hu)});static __NG_ELEMENT_ID__=-1},k=new _(""),vt=(()=>{class t{static __NG_ELEMENT_ID__=OE;static __NG_ENV_ID__=e=>e}return t})(),Ua=class extends vt{_lView;constructor(n){super(),this._lView=n}get destroyed(){return Pi(this._lView)}onDestroy(n){let e=this._lView;return Au(e,n),()=>pg(e,n)}};function OE(){return new Ua($())}var Og=!1,Fg=new _(""),ji=(()=>{class t{taskId=0;pendingTasks=new Set;destroyed=!1;pendingTask=new vi(!1);debugTaskTracker=u(Fg,{optional:!0});get hasPendingTasks(){return this.destroyed?!1:this.pendingTask.value}get hasPendingTasksObservable(){return this.destroyed?new te(e=>{e.next(!1),e.complete()}):this.pendingTask}add(){!this.hasPendingTasks&&!this.destroyed&&this.pendingTask.next(!0);let e=this.taskId++;return this.pendingTasks.add(e),this.debugTaskTracker?.add(e),e}has(e){return this.pendingTasks.has(e)}remove(e){this.pendingTasks.delete(e),this.debugTaskTracker?.remove(e),this.pendingTasks.size===0&&this.hasPendingTasks&&this.pendingTask.next(!1)}ngOnDestroy(){this.pendingTasks.clear(),this.hasPendingTasks&&this.pendingTask.next(!1),this.destroyed=!0,this.pendingTask.unsubscribe()}static \u0275prov=b({token:t,providedIn:"root",factory:()=>new t})}return t})(),iu=class extends C{__isAsync;destroyRef=void 0;pendingTasks=void 0;constructor(n=!1){super(),this.__isAsync=n,lg()&&(this.destroyRef=u(vt,{optional:!0})??void 0,this.pendingTasks=u(ji,{optional:!0})??void 0)}emit(n){let e=O(null);try{super.next(n)}finally{O(e)}}subscribe(n,e,i){let o=n,r=e||(()=>null),s=i;if(n&&typeof n=="object"){let l=n;o=l.next?.bind(l),r=l.error?.bind(l),s=l.complete?.bind(l)}this.__isAsync&&(r=this.wrapInTimeout(r),o&&(o=this.wrapInTimeout(o)),s&&(s=this.wrapInTimeout(s)));let a=super.subscribe({next:o,error:r,complete:s});return n instanceof de&&n.add(a),a}wrapInTimeout(n){return e=>{let i=this.pendingTasks?.add();setTimeout(()=>{try{n(e)}finally{i!==void 0&&this.pendingTasks?.remove(i)}})}}},se=iu;function za(...t){}function zu(t){let n,e;function i(){t=za;try{e!==void 0&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(e),n!==void 0&&clearTimeout(n)}catch{}}return n=setTimeout(()=>{t(),i()}),typeof requestAnimationFrame=="function"&&(e=requestAnimationFrame(()=>{t(),i()})),()=>i()}function Pg(t){return queueMicrotask(()=>t()),()=>{t=za}}var $u="isAngularZone",Hr=$u+"_ID",FE=0,S=class t{hasPendingMacrotasks=!1;hasPendingMicrotasks=!1;isStable=!0;onUnstable=new se(!1);onMicrotaskEmpty=new se(!1);onStable=new se(!1);onError=new se(!1);constructor(n){let{enableLongStackTrace:e=!1,shouldCoalesceEventChangeDetection:i=!1,shouldCoalesceRunChangeDetection:o=!1,scheduleInRootZone:r=Og}=n;if(typeof Zone>"u")throw new A(908,!1);Zone.assertZonePatched();let s=this;s._nesting=0,s._outer=s._inner=Zone.current,Zone.TaskTrackingZoneSpec&&(s._inner=s._inner.fork(new Zone.TaskTrackingZoneSpec)),e&&Zone.longStackTraceZoneSpec&&(s._inner=s._inner.fork(Zone.longStackTraceZoneSpec)),s.shouldCoalesceEventChangeDetection=!o&&i,s.shouldCoalesceRunChangeDetection=o,s.callbackScheduled=!1,s.scheduleInRootZone=r,VE(s)}static isInAngularZone(){return typeof Zone<"u"&&Zone.current.get($u)===!0}static assertInAngularZone(){if(!t.isInAngularZone())throw new A(909,!1)}static assertNotInAngularZone(){if(t.isInAngularZone())throw new A(909,!1)}run(n,e,i){return this._inner.run(n,e,i)}runTask(n,e,i,o){let r=this._inner,s=r.scheduleEventTask("NgZoneEvent: "+o,n,PE,za,za);try{return r.runTask(s,e,i)}finally{r.cancelTask(s)}}runGuarded(n,e,i){return this._inner.runGuarded(n,e,i)}runOutsideAngular(n){return this._outer.run(n)}},PE={};function Gu(t){if(t._nesting==0&&!t.hasPendingMicrotasks&&!t.isStable)try{t._nesting++,t.onMicrotaskEmpty.emit(null)}finally{if(t._nesting--,!t.hasPendingMicrotasks)try{t.runOutsideAngular(()=>t.onStable.emit(null))}finally{t.isStable=!0}}}function LE(t){if(t.isCheckStableRunning||t.callbackScheduled)return;t.callbackScheduled=!0;function n(){zu(()=>{t.callbackScheduled=!1,ou(t),t.isCheckStableRunning=!0,Gu(t),t.isCheckStableRunning=!1})}t.scheduleInRootZone?Zone.root.run(()=>{n()}):t._outer.run(()=>{n()}),ou(t)}function VE(t){let n=()=>{LE(t)},e=FE++;t._inner=t._inner.fork({name:"angular",properties:{[$u]:!0,[Hr]:e,[Hr+e]:!0},onInvokeTask:(i,o,r,s,a,l)=>{if(BE(l))return i.invokeTask(r,s,a,l);try{return Wh(t),i.invokeTask(r,s,a,l)}finally{(t.shouldCoalesceEventChangeDetection&&s.type==="eventTask"||t.shouldCoalesceRunChangeDetection)&&n(),qh(t)}},onInvoke:(i,o,r,s,a,l,c)=>{try{return Wh(t),i.invoke(r,s,a,l,c)}finally{t.shouldCoalesceRunChangeDetection&&!t.callbackScheduled&&!jE(l)&&n(),qh(t)}},onHasTask:(i,o,r,s)=>{i.hasTask(r,s),o===r&&(s.change=="microTask"?(t._hasPendingMicrotasks=s.microTask,ou(t),Gu(t)):s.change=="macroTask"&&(t.hasPendingMacrotasks=s.macroTask))},onHandleError:(i,o,r,s)=>(i.handleError(r,s),t.runOutsideAngular(()=>t.onError.emit(s)),!1)})}function ou(t){t._hasPendingMicrotasks||(t.shouldCoalesceEventChangeDetection||t.shouldCoalesceRunChangeDetection)&&t.callbackScheduled===!0?t.hasPendingMicrotasks=!0:t.hasPendingMicrotasks=!1}function Wh(t){t._nesting++,t.isStable&&(t.isStable=!1,t.onUnstable.emit(null))}function qh(t){t._nesting--,Gu(t)}var Ur=class{hasPendingMicrotasks=!1;hasPendingMacrotasks=!1;isStable=!0;onUnstable=new se;onMicrotaskEmpty=new se;onStable=new se;onError=new se;run(n,e,i){return n.apply(e,i)}runGuarded(n,e,i){return n.apply(e,i)}runOutsideAngular(n){return n()}runTask(n,e,i,o){return n.apply(e,i)}};function BE(t){return Lg(t,"__ignore_ng_zone__")}function jE(t){return Lg(t,"__scheduler_tick__")}function Lg(t,n){return!Array.isArray(t)||t.length!==1?!1:t[0]?.data?.[n]===!0}var Qe=class{_console=console;handleError(n){this._console.error("ERROR",n)}},xn=new _("",{factory:()=>{let t=u(S),n=u(Re),e;return i=>{t.runOutsideAngular(()=>{n.destroyed&&!e?setTimeout(()=>{throw i}):(e??=n.get(Qe),e.handleError(i))})}}}),Vg={provide:Ti,useValue:()=>{let t=u(Qe,{optional:!0})},multi:!0},HE=new _("",{factory:()=>{let t=u(k).defaultView;if(!t)return;let n=u(xn),e=r=>{n(r.reason),r.preventDefault()},i=r=>{r.error?n(r.error):n(new Error(r.message,{cause:r})),r.preventDefault()},o=()=>{t.addEventListener("unhandledrejection",e),t.addEventListener("error",i)};typeof Zone<"u"?Zone.root.run(o):o(),u(vt).onDestroy(()=>{t.removeEventListener("error",i),t.removeEventListener("unhandledrejection",e)})}});function Wu(){return Ai([ig(()=>{u(HE)})])}function N(t,n){let[e,i,o]=kd(t,n?.equal),r=e,s=r[Le];return r.set=i,r.update=o,r.asReadonly=qu.bind(r),r}function qu(){let t=this[Le];if(t.readonlyFn===void 0){let n=()=>this();n[Le]=t,t.readonlyFn=n}return t.readonlyFn}var ko=(()=>{class t{view;node;constructor(e,i){this.view=e,this.node=i}static __NG_ELEMENT_ID__=UE}return t})();function UE(){return new ko($(),$e())}var rn=class{},Zr=new _("",{factory:()=>!0});var Yu=new _(""),Kr=(()=>{class t{internalPendingTasks=u(ji);scheduler=u(rn);errorHandler=u(xn);add(){let e=this.internalPendingTasks.add();return()=>{this.internalPendingTasks.has(e)&&(this.scheduler.notify(11),this.internalPendingTasks.remove(e))}}run(e){let i=this.add();e().catch(this.errorHandler).finally(i)}static \u0275prov=b({token:t,providedIn:"root",factory:()=>new t})}return t})(),pl=(()=>{class t{static \u0275prov=b({token:t,providedIn:"root",factory:()=>new ru})}return t})(),ru=class{dirtyEffectCount=0;queues=new Map;add(n){this.enqueue(n),this.schedule(n)}schedule(n){n.dirty&&this.dirtyEffectCount++}remove(n){let e=n.zone,i=this.queues.get(e);i.has(n)&&(i.delete(n),n.dirty&&this.dirtyEffectCount--)}enqueue(n){let e=n.zone;this.queues.has(e)||this.queues.set(e,new Set);let i=this.queues.get(e);i.has(n)||i.add(n)}flush(){for(;this.dirtyEffectCount>0;){let n=!1;for(let[e,i]of this.queues)e===null?n||=this.flushQueue(i):n||=e.run(()=>this.flushQueue(i));n||(this.dirtyEffectCount=0)}}flushQueue(n){let e=!1;for(let i of n)i.dirty&&(this.dirtyEffectCount--,e=!0,i.run());return e}},$a=class{[Le];constructor(n){this[Le]=n}destroy(){this[Le].destroy()}};function Gt(t,n){let e=n?.injector??u(F),i=n?.manualCleanup!==!0?e.get(vt):null,o,r=e.get(ko,null,{optional:!0}),s=e.get(rn);return r!==null?(o=GE(r.view,s,t),i instanceof Ua&&i._lView===r.view&&(i=null)):o=WE(t,e.get(pl),s),o.injector=e,i!==null&&(o.onDestroyFns=[i.onDestroy(()=>o.destroy())]),new $a(o)}var Bg=ee(D({},Nd),{cleanupFns:void 0,zone:null,onDestroyFns:null,run(){let t=jr(!1);try{Od(this)}finally{jr(t)}},cleanup(){if(!this.cleanupFns?.length)return;let t=O(null);try{for(;this.cleanupFns.length;)this.cleanupFns.pop()()}finally{this.cleanupFns=[],O(t)}}}),zE=ee(D({},Bg),{consumerMarkedDirty(){this.scheduler.schedule(this),this.notifier.notify(12)},destroy(){if(Pn(this),this.onDestroyFns!==null)for(let t of this.onDestroyFns)t();this.cleanup(),this.scheduler.remove(this)}}),$E=ee(D({},Bg),{consumerMarkedDirty(){this.view[U]|=8192,Li(this.view),this.notifier.notify(13)},destroy(){if(Pn(this),this.onDestroyFns!==null)for(let t of this.onDestroyFns)t();this.cleanup(),this.view[Bn]?.delete(this)}});function GE(t,n,e){let i=Object.create($E);return i.view=t,i.zone=typeof Zone<"u"?Zone.current:null,i.notifier=n,i.fn=jg(i,e),t[Bn]??=new Set,t[Bn].add(i),i.consumerMarkedDirty(i),i}function WE(t,n,e){let i=Object.create(zE);return i.fn=jg(i,t),i.scheduler=n,i.notifier=e,i.zone=typeof Zone<"u"?Zone.current:null,i.scheduler.add(i),i.notifier.notify(12),i}function jg(t,n){return()=>{n(e=>(t.cleanupFns??=[]).push(e))}}function ss(t){return{toString:t}.toString()}function t0(t){return typeof t=="function"}function bv(t,n,e,i){n!==null?n.applyValueToInputSignal(n,i):t[e]=i}var wl=class{previousValue;currentValue;firstChange;constructor(n,e,i){this.previousValue=n,this.currentValue=e,this.firstChange=i}isFirstChange(){return this.firstChange}},xt=(()=>{let t=()=>Dv;return t.ngInherit=!0,t})();function Dv(t){return t.type.prototype.ngOnChanges&&(t.setInput=i0),n0}function n0(){let t=Ev(this),n=t?.current;if(n){let e=t.previous;if(e===Bt)t.previous=n;else for(let i in n)e[i]=n[i];t.current=null,this.ngOnChanges(n)}}function i0(t,n,e,i,o){let r=this.declaredInputs[i],s=Ev(t)||o0(t,{previous:Bt,current:null}),a=s.current||(s.current={}),l=s.previous,c=l[r];a[r]=new wl(c&&c.currentValue,e,l===Bt),bv(t,n,o,e)}var Cv="__ngSimpleChanges__";function Ev(t){return t[Cv]||null}function o0(t,n){return t[Cv]=n}var Hg=[];var fe=function(t,n=null,e){for(let i=0;i<Hg.length;i++){let o=Hg[i];o(t,n,e)}},le=(function(t){return t[t.TemplateCreateStart=0]="TemplateCreateStart",t[t.TemplateCreateEnd=1]="TemplateCreateEnd",t[t.TemplateUpdateStart=2]="TemplateUpdateStart",t[t.TemplateUpdateEnd=3]="TemplateUpdateEnd",t[t.LifecycleHookStart=4]="LifecycleHookStart",t[t.LifecycleHookEnd=5]="LifecycleHookEnd",t[t.OutputStart=6]="OutputStart",t[t.OutputEnd=7]="OutputEnd",t[t.BootstrapApplicationStart=8]="BootstrapApplicationStart",t[t.BootstrapApplicationEnd=9]="BootstrapApplicationEnd",t[t.BootstrapComponentStart=10]="BootstrapComponentStart",t[t.BootstrapComponentEnd=11]="BootstrapComponentEnd",t[t.ChangeDetectionStart=12]="ChangeDetectionStart",t[t.ChangeDetectionEnd=13]="ChangeDetectionEnd",t[t.ChangeDetectionSyncStart=14]="ChangeDetectionSyncStart",t[t.ChangeDetectionSyncEnd=15]="ChangeDetectionSyncEnd",t[t.AfterRenderHooksStart=16]="AfterRenderHooksStart",t[t.AfterRenderHooksEnd=17]="AfterRenderHooksEnd",t[t.ComponentStart=18]="ComponentStart",t[t.ComponentEnd=19]="ComponentEnd",t[t.DeferBlockStateStart=20]="DeferBlockStateStart",t[t.DeferBlockStateEnd=21]="DeferBlockStateEnd",t[t.DynamicComponentStart=22]="DynamicComponentStart",t[t.DynamicComponentEnd=23]="DynamicComponentEnd",t[t.HostBindingsUpdateStart=24]="HostBindingsUpdateStart",t[t.HostBindingsUpdateEnd=25]="HostBindingsUpdateEnd",t})(le||{});function r0(t,n,e){let{ngOnChanges:i,ngOnInit:o,ngDoCheck:r}=n.type.prototype;if(i){let s=Dv(n);(e.preOrderHooks??=[]).push(t,s),(e.preOrderCheckHooks??=[]).push(t,s)}o&&(e.preOrderHooks??=[]).push(0-t,o),r&&((e.preOrderHooks??=[]).push(t,r),(e.preOrderCheckHooks??=[]).push(t,r))}function wv(t,n){for(let e=n.directiveStart,i=n.directiveEnd;e<i;e++){let r=t.data[e].type.prototype,{ngAfterContentInit:s,ngAfterContentChecked:a,ngAfterViewInit:l,ngAfterViewChecked:c,ngOnDestroy:d}=r;s&&(t.contentHooks??=[]).push(-e,s),a&&((t.contentHooks??=[]).push(e,a),(t.contentCheckHooks??=[]).push(e,a)),l&&(t.viewHooks??=[]).push(-e,l),c&&((t.viewHooks??=[]).push(e,c),(t.viewCheckHooks??=[]).push(e,c)),d!=null&&(t.destroyHooks??=[]).push(e,d)}}function yl(t,n,e){xv(t,n,3,e)}function bl(t,n,e,i){(t[U]&3)===e&&xv(t,n,e,i)}function Zu(t,n){let e=t[U];(e&3)===n&&(e&=16383,e+=1,t[U]=e)}function xv(t,n,e,i){let o=i!==void 0?t[Ni]&65535:0,r=i??-1,s=n.length-1,a=0;for(let l=o;l<s;l++)if(typeof n[l+1]=="number"){if(a=n[l],i!=null&&a>=i)break}else n[l]<0&&(t[Ni]+=65536),(a<r||r==-1)&&(s0(t,e,n,l),t[Ni]=(t[Ni]&4294901760)+l+2),l++}function Ug(t,n){fe(le.LifecycleHookStart,t,n);let e=O(null);try{n.call(t)}finally{O(e),fe(le.LifecycleHookEnd,t,n)}}function s0(t,n,e,i){let o=e[i]<0,r=e[i+1],s=o?-e[i]:e[i],a=t[s];o?t[U]>>14<t[Ni]>>16&&(t[U]&3)===n&&(t[U]+=16384,Ug(a,r)):Ug(a,r)}var No=-1,Ui=class{factory;name;injectImpl;resolving=!1;canSeeViewProviders;multi;componentProviders;index;providerFactory;constructor(n,e,i,o){this.factory=n,this.name=o,this.canSeeViewProviders=e,this.injectImpl=i}};function a0(t){return(t.flags&8)!==0}function l0(t){return(t.flags&16)!==0}function c0(t,n,e){let i=0;for(;i<e.length;){let o=e[i];if(typeof o=="number"){if(o!==0)break;i++;let r=e[i++],s=e[i++],a=e[i++];t.setAttribute(n,s,a,r)}else{let r=o,s=e[++i];d0(r)?t.setProperty(n,r,s):t.setAttribute(n,r,s),i++}}return i}function Iv(t){return t===3||t===4||t===6}function d0(t){return t.charCodeAt(0)===64}function Oo(t,n){if(!(n===null||n.length===0))if(t===null||t.length===0)t=n.slice();else{let e=-1;for(let i=0;i<n.length;i++){let o=n[i];typeof o=="number"?e=o:e===0||(e===-1||e===2?zg(t,e,o,null,n[++i]):zg(t,e,o,null,null))}}return t}function zg(t,n,e,i,o){let r=0,s=t.length;if(n===-1)s=-1;else for(;r<t.length;){let a=t[r++];if(typeof a=="number"){if(a===n){s=-1;break}else if(a>n){s=r-1;break}}}for(;r<t.length;){let a=t[r];if(typeof a=="number")break;if(a===e){o!==null&&(t[r+1]=o);return}r++,o!==null&&r++}s!==-1&&(t.splice(s,0,n),r=s+1),t.splice(r++,0,e),o!==null&&t.splice(r++,0,o)}function Mv(t){return t!==No}function xl(t){return t&32767}function u0(t){return t>>16}function Il(t,n){let e=u0(t),i=n;for(;e>0;)i=i[Ri],e--;return i}var sf=!0;function Ml(t){let n=sf;return sf=t,n}var f0=256,Sv=f0-1,Tv=5,m0=0,ln={};function p0(t,n,e){let i;typeof e=="string"?i=e.charCodeAt(0)||0:e.hasOwnProperty(Mi)&&(i=e[Mi]),i==null&&(i=e[Mi]=m0++);let o=i&Sv,r=1<<o;n.data[t+(o>>Tv)]|=r}function Sl(t,n){let e=Av(t,n);if(e!==-1)return e;let i=n[P];i.firstCreatePass&&(t.injectorIndex=n.length,Ku(i.data,t),Ku(n,null),Ku(i.blueprint,null));let o=Gf(t,n),r=t.injectorIndex;if(Mv(o)){let s=xl(o),a=Il(o,n),l=a[P].data;for(let c=0;c<8;c++)n[r+c]=a[s+c]|l[s+c]}return n[r+8]=o,r}function Ku(t,n){t.push(0,0,0,0,0,0,0,0,n)}function Av(t,n){return t.injectorIndex===-1||t.parent&&t.parent.injectorIndex===t.injectorIndex||n[t.injectorIndex+8]===null?-1:t.injectorIndex}function Gf(t,n){if(t.parent&&t.parent.injectorIndex!==-1)return t.parent.injectorIndex;let e=0,i=null,o=n;for(;o!==null;){if(i=Fv(o),i===null)return No;if(e++,o=o[Ri],i.injectorIndex!==-1)return i.injectorIndex|e<<16}return No}function af(t,n,e){p0(t,n,e)}function h0(t,n){if(n==="class")return t.classes;if(n==="style")return t.styles;let e=t.attrs;if(e){let i=e.length,o=0;for(;o<i;){let r=e[o];if(Iv(r))break;if(r===0)o=o+2;else if(typeof r=="number")for(o++;o<i&&typeof e[o]=="string";)o++;else{if(r===n)return e[o+1];o=o+2}}}return null}function kv(t,n,e){if(e&8||t!==void 0)return t;Xa(n,"NodeInjector")}function Rv(t,n,e,i){if(e&8&&i===void 0&&(i=null),(e&3)===0){let o=t[Dn],r=et(void 0);try{return o?o.get(n,i,e&8):mu(n,i,e&8)}finally{et(r)}}return kv(i,n,e)}function Nv(t,n,e,i=0,o){if(t!==null){if(n[U]&2048&&!(i&2)){let s=y0(t,n,e,i,ln);if(s!==ln)return s}let r=Ov(t,n,e,i,ln);if(r!==ln)return r}return Rv(n,e,i,o)}function Ov(t,n,e,i,o){let r=v0(e);if(typeof r=="function"){if(!Hu(n,t,i))return i&1?kv(o,e,i):Rv(n,e,i,o);try{let s;if(s=r(i),s==null&&!(i&8))Xa(e);else return s}finally{Uu()}}else if(typeof r=="number"){let s=null,a=Av(t,n),l=No,c=i&1?n[nt][tt]:null;for((a===-1||i&4)&&(l=a===-1?Gf(t,n):n[a+8],l===No||!Gg(i,!1)?a=-1:(s=n[P],a=xl(l),n=Il(l,n)));a!==-1;){let d=n[P];if($g(r,a,d.data)){let f=g0(a,n,e,s,i,c);if(f!==ln)return f}l=n[a+8],l!==No&&Gg(i,n[P].data[a+8]===c)&&$g(r,a,n)?(s=d,a=xl(l),n=Il(l,n)):a=-1}}return o}function g0(t,n,e,i,o,r){let s=n[P],a=s.data[t+8],l=i==null?wn(a)&&sf:i!=s&&(a.type&3)!==0,c=o&1&&r===a,d=Dl(a,s,e,l,c);return d!==null?es(n,s,d,a,o):ln}function Dl(t,n,e,i,o){let r=t.providerIndexes,s=n.data,a=r&1048575,l=t.directiveStart,c=t.directiveEnd,d=r>>20,f=i?a:a+d,p=o?a+d:c;for(let m=f;m<p;m++){let v=s[m];if(m<l&&e===v||m>=l&&v.type===e)return m}if(o){let m=s[l];if(m&&zt(m)&&m.type===e)return l}return null}function es(t,n,e,i,o){let r=t[e],s=n.data;if(r instanceof Ui){let a=r;if(a.resolving)throw fu("");let l=Ml(a.canSeeViewProviders);a.resolving=!0;let c=s[e].type||s[e],d,f=a.injectImpl?et(a.injectImpl):null,p=Hu(t,i,0);try{r=t[e]=a.factory(void 0,o,s,t,i),n.firstCreatePass&&e>=i.directiveStart&&r0(e,s[e],n)}finally{f!==null&&et(f),Ml(l),a.resolving=!1,Uu()}}return r}function v0(t){if(typeof t=="string")return t.charCodeAt(0)||0;let n=t.hasOwnProperty(Mi)?t[Mi]:void 0;return typeof n=="number"?n>=0?n&Sv:_0:n}function $g(t,n,e){let i=1<<t;return!!(e[n+(t>>Tv)]&i)}function Gg(t,n){return!(t&2)&&!(t&1&&n)}var Hi=class{_tNode;_lView;constructor(n,e){this._tNode=n,this._lView=e}get(n,e,i){return Nv(this._tNode,this._lView,n,wi(i),e)}};function _0(){return new Hi($e(),$())}function It(t){return ss(()=>{let n=t.prototype.constructor,e=n[Vr]||lf(n),i=Object.prototype,o=Object.getPrototypeOf(t.prototype).constructor;for(;o&&o!==i;){let r=o[Vr]||lf(o);if(r&&r!==e)return r;o=Object.getPrototypeOf(o)}return r=>new r})}function lf(t){return su(t)?()=>{let n=lf(Be(t));return n&&n()}:Vn(t)}function y0(t,n,e,i,o){let r=t,s=n;for(;r!==null&&s!==null&&s[U]&2048&&!To(s);){let a=Ov(r,s,e,i|2,ln);if(a!==ln)return a;let l=r.parent;if(!l){let c=s[Du];if(c){let d=c.get(e,ln,i&-5);if(d!==ln)return d}l=Fv(s),s=s[Ri]}r=l}return o}function Fv(t){let n=t[P],e=n.type;return e===2?n.declTNode:e===1?t[tt]:null}function Wf(t){return h0($e(),t)}function b0(){return jo($e(),$())}function jo(t,n){return new B($t(t,n))}var B=(()=>{class t{nativeElement;constructor(e){this.nativeElement=e}static __NG_ELEMENT_ID__=b0}return t})();function Pv(t){return t instanceof B?t.nativeElement:t}function D0(){return this._results[Symbol.iterator]()}var In=class{_emitDistinctChangesOnly;dirty=!0;_onDirty=void 0;_results=[];_changesDetected=!1;_changes=void 0;length=0;first=void 0;last=void 0;get changes(){return this._changes??=new C}constructor(n=!1){this._emitDistinctChangesOnly=n}get(n){return this._results[n]}map(n){return this._results.map(n)}filter(n){return this._results.filter(n)}find(n){return this._results.find(n)}reduce(n,e){return this._results.reduce(n,e)}forEach(n){this._results.forEach(n)}some(n){return this._results.some(n)}toArray(){return this._results.slice()}toString(){return this._results.toString()}reset(n,e){this.dirty=!1;let i=eg(n);(this._changesDetected=!Jh(this._results,i,e))&&(this._results=i,this.length=i.length,this.last=i[this.length-1],this.first=i[0])}notifyOnChanges(){this._changes!==void 0&&(this._changesDetected||!this._emitDistinctChangesOnly)&&this._changes.next(this)}onDirty(n){this._onDirty=n}setDirty(){this.dirty=!0,this._onDirty?.()}destroy(){this._changes!==void 0&&(this._changes.complete(),this._changes.unsubscribe())}[Symbol.iterator]=D0};function Lv(t){return(t.flags&128)===128}var qf=(function(t){return t[t.OnPush=0]="OnPush",t[t.Eager=1]="Eager",t[t.Default=1]="Default",t})(qf||{}),Vv=new Map,C0=0;function E0(){return C0++}function w0(t){Vv.set(t[Cn],t)}function cf(t){Vv.delete(t[Cn])}var Wg="__ngContext__";function Fo(t,n){En(n)?(t[Wg]=n[Cn],w0(n)):t[Wg]=n}function Bv(t){return Hv(t[Mo])}function jv(t){return Hv(t[Ct])}function Hv(t){for(;t!==null&&!Ut(t);)t=t[Ct];return t}var df;function Yf(t){df=t}function Uv(){if(df!==void 0)return df;if(typeof document<"u")return document;throw new A(210,!1)}var Kn=new _("",{factory:()=>x0}),x0="ng";var Ll=new _(""),Gi=new _("",{providedIn:"platform",factory:()=>"unknown"}),as=new _(""),Wi=new _("",{factory:()=>u(k).body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce")||null});var zv="r";var $v="di";var Gv=!1,Wv=new _("",{factory:()=>Gv});var I0=(t,n,e,i)=>{};function M0(t,n,e,i){I0(t,n,e,i)}function Vl(t){return(t.flags&32)===32}var S0=()=>null;function qv(t,n,e=!1){return S0(t,n,e)}function Yv(t,n){let e=t.contentQueries;if(e!==null){let i=O(null);try{for(let o=0;o<e.length;o+=2){let r=e[o],s=e[o+1];if(s!==-1){let a=t.data[s];qr(r),a.contentQueries(2,n[s],s)}}}finally{O(i)}}}function uf(t,n,e){qr(0);let i=O(null);try{n(t,e)}finally{O(i)}}function Zf(t,n,e){if(Eu(n)){let i=O(null);try{let o=n.directiveStart,r=n.directiveEnd;for(let s=o;s<r;s++){let a=t.data[s];if(a.contentQueries){let l=e[s];a.contentQueries(1,l,s)}}}finally{O(i)}}}var Yt=(function(t){return t[t.Emulated=0]="Emulated",t[t.None=2]="None",t[t.ShadowDom=3]="ShadowDom",t[t.ExperimentalIsolatedShadowDom=4]="ExperimentalIsolatedShadowDom",t})(Yt||{});var hl;function T0(){if(hl===void 0&&(hl=null,Un.trustedTypes))try{hl=Un.trustedTypes.createPolicy("angular",{createHTML:t=>t,createScript:t=>t,createScriptURL:t=>t})}catch{}return hl}function Bl(t){return T0()?.createHTML(t)||t}var gl;function A0(){if(gl===void 0&&(gl=null,Un.trustedTypes))try{gl=Un.trustedTypes.createPolicy("angular#unsafe-bypass",{createHTML:t=>t,createScript:t=>t,createScriptURL:t=>t})}catch{}return gl}function qg(t){return A0()?.createHTML(t)||t}var Mn=class{changingThisBreaksApplicationSecurity;constructor(n){this.changingThisBreaksApplicationSecurity=n}toString(){return`SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${Ga})`}},ff=class extends Mn{getTypeName(){return"HTML"}},mf=class extends Mn{getTypeName(){return"Style"}},pf=class extends Mn{getTypeName(){return"Script"}},hf=class extends Mn{getTypeName(){return"URL"}},gf=class extends Mn{getTypeName(){return"ResourceURL"}};function Kt(t){return t instanceof Mn?t.changingThisBreaksApplicationSecurity:t}function Sn(t,n){let e=Zv(t);if(e!=null&&e!==n){if(e==="ResourceURL"&&n==="URL")return!0;throw new Error(`Required a safe ${n}, got a ${e} (see ${Ga})`)}return e===n}function Zv(t){return t instanceof Mn&&t.getTypeName()||null}function Kf(t){return new ff(t)}function Xf(t){return new mf(t)}function Qf(t){return new pf(t)}function Jf(t){return new hf(t)}function em(t){return new gf(t)}function k0(t){let n=new _f(t);return R0()?new vf(n):n}var vf=class{inertDocumentHelper;constructor(n){this.inertDocumentHelper=n}getInertBodyElement(n){n="<body><remove></remove>"+n;try{let e=new window.DOMParser().parseFromString(Bl(n),"text/html").body;return e===null?this.inertDocumentHelper.getInertBodyElement(n):(e.firstChild?.remove(),e)}catch{return null}}},_f=class{defaultDoc;inertDocument;constructor(n){this.defaultDoc=n,this.inertDocument=this.defaultDoc.implementation.createHTMLDocument("sanitization-inert")}getInertBodyElement(n){let e=this.inertDocument.createElement("template");return e.innerHTML=Bl(n),e}};function R0(){try{return!!new window.DOMParser().parseFromString(Bl(""),"text/html")}catch{return!1}}var N0=/^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;function ls(t){return t=String(t),t.match(N0)?t:"unsafe:"+t}function Tn(t){let n={};for(let e of t.split(","))n[e]=!0;return n}function cs(...t){let n={};for(let e of t)for(let i in e)e.hasOwnProperty(i)&&(n[i]=!0);return n}var Kv=Tn("area,br,col,hr,img,wbr"),Xv=Tn("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),Qv=Tn("rp,rt"),O0=cs(Qv,Xv),F0=cs(Xv,Tn("address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul")),P0=cs(Qv,Tn("a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video")),Yg=cs(Kv,F0,P0,O0),Jv=Tn("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),L0=Tn("abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"),V0=Tn("aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"),B0=cs(Jv,L0,V0),j0=Tn("script,style,template");var yf=class{sanitizedSomething=!1;buf=[];sanitizeChildren(n){let e=n.firstChild,i=!0,o=[];for(;e;){if(e.nodeType===Node.ELEMENT_NODE?i=this.startElement(e):e.nodeType===Node.TEXT_NODE?this.chars(e.nodeValue):this.sanitizedSomething=!0,i&&e.firstChild){o.push(e),e=z0(e);continue}for(;e;){e.nodeType===Node.ELEMENT_NODE&&this.endElement(e);let r=U0(e);if(r){e=r;break}e=o.pop()}}return this.buf.join("")}startElement(n){let e=Zg(n).toLowerCase();if(!Yg.hasOwnProperty(e))return this.sanitizedSomething=!0,!j0.hasOwnProperty(e);this.buf.push("<"),this.buf.push(e);let i=n.attributes;for(let o=0;o<i.length;o++){let r=i.item(o),s=r.name,a=s.toLowerCase();if(!B0.hasOwnProperty(a)){this.sanitizedSomething=!0;continue}let l=r.value;Jv[a]&&(l=ls(l)),this.buf.push(" ",s,'="',Kg(l),'"')}return this.buf.push(">"),!0}endElement(n){let e=Zg(n).toLowerCase();Yg.hasOwnProperty(e)&&!Kv.hasOwnProperty(e)&&(this.buf.push("</"),this.buf.push(e),this.buf.push(">"))}chars(n){this.buf.push(Kg(n))}};function H0(t,n){return(t.compareDocumentPosition(n)&Node.DOCUMENT_POSITION_CONTAINED_BY)!==Node.DOCUMENT_POSITION_CONTAINED_BY}function U0(t){let n=t.nextSibling;if(n&&t!==n.previousSibling)throw e_(n);return n}function z0(t){let n=t.firstChild;if(n&&H0(t,n))throw e_(n);return n}function Zg(t){let n=t.nodeName;return typeof n=="string"?n:"FORM"}function e_(t){return new Error(`Failed to sanitize html because the element is clobbered: ${t.outerHTML}`)}var $0=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,G0=/([^\#-~ |!])/g;function Kg(t){return t.replace(/&/g,"&amp;").replace($0,function(n){let e=n.charCodeAt(0),i=n.charCodeAt(1);return"&#"+((e-55296)*1024+(i-56320)+65536)+";"}).replace(G0,function(n){return"&#"+n.charCodeAt(0)+";"}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}var vl;function jl(t,n){let e=null;try{vl=vl||k0(t);let i=n?String(n):"";e=vl.getInertBodyElement(i);let o=5,r=i;do{if(o===0)throw new Error("Failed to sanitize html because the input is unstable");o--,i=r,r=e.innerHTML,e=vl.getInertBodyElement(i)}while(i!==r);let a=new yf().sanitizeChildren(Xg(e)||e);return Bl(a)}finally{if(e){let i=Xg(e)||e;for(;i.firstChild;)i.firstChild.remove()}}}function Xg(t){return"content"in t&&W0(t)?t.content:null}function W0(t){return t.nodeType===Node.ELEMENT_NODE&&t.nodeName==="TEMPLATE"}var q0=/^>|^->|<!--|-->|--!>|<!-$/g,Y0=/(<|>)/g,Z0="\u200B$1\u200B";function K0(t){return t.replace(q0,n=>n.replace(Y0,Z0))}function X0(t,n){return t.createText(n)}function Q0(t,n,e){t.setValue(n,e)}function J0(t,n){return t.createComment(K0(n))}function t_(t,n,e){return t.createElement(n,e)}function Tl(t,n,e,i,o){t.insertBefore(n,e,i,o)}function n_(t,n,e){t.appendChild(n,e)}function Qg(t,n,e,i,o){i!==null?Tl(t,n,e,i,o):n_(t,n,e)}function i_(t,n,e,i){t.removeChild(null,n,e,i)}function ew(t,n,e){t.setAttribute(n,"style",e)}function tw(t,n,e){e===""?t.removeAttribute(n,"class"):t.setAttribute(n,"class",e)}function o_(t,n,e){let{mergedAttrs:i,classes:o,styles:r}=e;i!==null&&c0(t,n,i),o!==null&&tw(t,n,o),r!==null&&ew(t,n,r)}var He=(function(t){return t[t.NONE=0]="NONE",t[t.HTML=1]="HTML",t[t.STYLE=2]="STYLE",t[t.SCRIPT=3]="SCRIPT",t[t.URL=4]="URL",t[t.RESOURCE_URL=5]="RESOURCE_URL",t})(He||{});function tm(t){let n=r_();return n?qg(n.sanitize(He.HTML,t)||""):Sn(t,"HTML")?qg(Kt(t)):jl(Uv(),Si(t))}function Hl(t){let n=r_();return n?n.sanitize(He.URL,t)||"":Sn(t,"URL")?Kt(t):ls(Si(t))}function r_(){let t=$();return t&&t[Ht].sanitizer}function Ul(t){return t.ownerDocument}function nw(t,n,e){let i=t.length;for(;;){let o=t.indexOf(n,e);if(o===-1)return o;if(o===0||t.charCodeAt(o-1)<=32){let r=n.length;if(o+r===i||t.charCodeAt(o+r)<=32)return o}e=o+1}}var s_="ng-template";function iw(t,n,e,i){let o=0;if(i){for(;o<n.length&&typeof n[o]=="string";o+=2)if(n[o]==="class"&&nw(n[o+1].toLowerCase(),e,0)!==-1)return!0}else if(nm(t))return!1;if(o=n.indexOf(1,o),o>-1){let r;for(;++o<n.length&&typeof(r=n[o])=="string";)if(r.toLowerCase()===e)return!0}return!1}function nm(t){return t.type===4&&t.value!==s_}function ow(t,n,e){let i=t.type===4&&!e?s_:t.value;return n===i}function rw(t,n,e){let i=4,o=t.attrs,r=o!==null?lw(o):0,s=!1;for(let a=0;a<n.length;a++){let l=n[a];if(typeof l=="number"){if(!s&&!Wt(i)&&!Wt(l))return!1;if(s&&Wt(l))continue;s=!1,i=l|i&1;continue}if(!s)if(i&4){if(i=2|i&1,l!==""&&!ow(t,l,e)||l===""&&n.length===1){if(Wt(i))return!1;s=!0}}else if(i&8){if(o===null||!iw(t,o,l,e)){if(Wt(i))return!1;s=!0}}else{let c=n[++a],d=sw(l,o,nm(t),e);if(d===-1){if(Wt(i))return!1;s=!0;continue}if(c!==""){let f;if(d>r?f="":f=o[d+1].toLowerCase(),i&2&&c!==f){if(Wt(i))return!1;s=!0}}}}return Wt(i)||s}function Wt(t){return(t&1)===0}function sw(t,n,e,i){if(n===null)return-1;let o=0;if(i||!e){let r=!1;for(;o<n.length;){let s=n[o];if(s===t)return o;if(s===3||s===6)r=!0;else if(s===1||s===2){let a=n[++o];for(;typeof a=="string";)a=n[++o];continue}else{if(s===4)break;if(s===0){o+=4;continue}}o+=r?1:2}return-1}else return cw(n,t)}function a_(t,n,e=!1){for(let i=0;i<n.length;i++)if(rw(t,n[i],e))return!0;return!1}function aw(t){let n=t.attrs;if(n!=null){let e=n.indexOf(5);if((e&1)===0)return n[e+1]}return null}function lw(t){for(let n=0;n<t.length;n++){let e=t[n];if(Iv(e))return n}return t.length}function cw(t,n){let e=t.indexOf(4);if(e>-1)for(e++;e<t.length;){let i=t[e];if(typeof i=="number")return-1;if(i===n)return e;e++}return-1}function dw(t,n){e:for(let e=0;e<n.length;e++){let i=n[e];if(t.length===i.length){for(let o=0;o<t.length;o++)if(t[o]!==i[o])continue e;return!0}}return!1}function Jg(t,n){return t?":not("+n.trim()+")":n}function uw(t){let n=t[0],e=1,i=2,o="",r=!1;for(;e<t.length;){let s=t[e];if(typeof s=="string")if(i&2){let a=t[++e];o+="["+s+(a.length>0?'="'+a+'"':"")+"]"}else i&8?o+="."+s:i&4&&(o+=" "+s);else o!==""&&!Wt(s)&&(n+=Jg(r,o),o=""),i=s,r=r||!Wt(i);e++}return o!==""&&(n+=Jg(r,o)),n}function fw(t){return t.map(uw).join(",")}function mw(t){let n=[],e=[],i=1,o=2;for(;i<t.length;){let r=t[i];if(typeof r=="string")o===2?r!==""&&n.push(r,t[++i]):o===8&&e.push(r);else{if(!Wt(o))break;o=r}i++}return e.length&&n.push(1,...e),n}var at={};function im(t,n,e,i,o,r,s,a,l,c,d){let f=De+i,p=f+o,m=pw(f,p),v=typeof c=="function"?c():c;return m[P]={type:t,blueprint:m,template:e,queries:null,viewQuery:a,declTNode:n,data:m.slice().fill(null,f),bindingStartIndex:f,expandoStartIndex:p,hostBindingOpCodes:null,firstCreatePass:!0,firstUpdatePass:!0,staticViewQueries:!1,staticContentQueries:!1,preOrderHooks:null,preOrderCheckHooks:null,contentHooks:null,contentCheckHooks:null,viewHooks:null,viewCheckHooks:null,destroyHooks:null,cleanup:null,contentQueries:null,components:null,directiveRegistry:typeof r=="function"?r():r,pipeRegistry:typeof s=="function"?s():s,firstChild:null,schemas:l,consts:v,incompleteFirstPass:!1,ssrId:d}}function pw(t,n){let e=[];for(let i=0;i<n;i++)e.push(i<t?null:at);return e}function hw(t){let n=t.tView;return n===null||n.incompleteFirstPass?t.tView=im(1,null,t.template,t.decls,t.vars,t.directiveDefs,t.pipeDefs,t.viewQuery,t.schemas,t.consts,t.id):n}function om(t,n,e,i,o,r,s,a,l,c,d){let f=n.blueprint.slice();return f[jt]=o,f[U]=i|4|128|8|64|1024,(c!==null||t&&t[U]&2048)&&(f[U]|=2048),Su(f),f[je]=f[Ri]=t,f[Ne]=e,f[Ht]=s||t&&t[Ht],f[_e]=a||t&&t[_e],f[Dn]=l||t&&t[Dn]||null,f[tt]=r,f[Cn]=E0(),f[ki]=d,f[Du]=c,f[nt]=n.type==2?t[nt]:f,f}function gw(t,n,e){let i=$t(n,t),o=hw(e),r=t[Ht].rendererFactory,s=rm(t,om(t,o,null,l_(e),i,n,null,r.createRenderer(i,e),null,null,null));return t[n.index]=s}function l_(t){let n=16;return t.signals?n=4096:t.onPush&&(n=64),n}function c_(t,n,e,i){if(e===0)return-1;let o=n.length;for(let r=0;r<e;r++)n.push(i),t.blueprint.push(i),t.data.push(null);return o}function rm(t,n){return t[Mo]?t[bu][Ct]=n:t[Mo]=n,t[bu]=n,n}function y(t=1){d_(Ce(),$(),an()+t,!1)}function d_(t,n,e,i){if(!i)if((n[U]&3)===3){let r=t.preOrderCheckHooks;r!==null&&yl(n,r,e)}else{let r=t.preOrderHooks;r!==null&&bl(n,r,0,e)}qn(e)}var zl=(function(t){return t[t.None=0]="None",t[t.SignalBased=1]="SignalBased",t[t.HasDecoratorInputTransform=2]="HasDecoratorInputTransform",t})(zl||{});function bf(t,n,e,i){let o=O(null);try{let[r,s,a]=t.inputs[e],l=null;(s&zl.SignalBased)!==0&&(l=n[r][Le]),l!==null&&l.transformFn!==void 0?i=l.transformFn(i):a!==null&&(i=a.call(n,i)),t.setInput!==null?t.setInput(n,l,i,e,r):bv(n,l,r,i)}finally{O(o)}}var cn=(function(t){return t[t.Important=1]="Important",t[t.DashCase=2]="DashCase",t})(cn||{}),vw;function sm(t,n){return vw(t,n)}var uB=typeof document<"u"&&typeof document?.documentElement?.getAnimations=="function";var Df=new WeakMap,Xr=new WeakSet;function _w(t,n){let e=Df.get(t);if(!e||e.length===0)return;let i=n.parentNode,o=n.previousSibling;for(let r=e.length-1;r>=0;r--){let s=e[r],a=s.parentNode;s===n?(e.splice(r,1),Xr.add(s),s.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}}))):(o&&s===o||a&&i&&a!==i)&&(e.splice(r,1),s.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}})),s.parentNode?.removeChild(s))}}function yw(t,n){let e=Df.get(t);e?e.includes(n)||e.push(n):Df.set(t,[n])}var zi=new Set,$l=(function(t){return t[t.CHANGE_DETECTION=0]="CHANGE_DETECTION",t[t.AFTER_NEXT_RENDER=1]="AFTER_NEXT_RENDER",t})($l||{}),Xt=new _(""),ev=new Set;function qi(t){ev.has(t)||(ev.add(t),performance?.mark?.("mark_feature_usage",{detail:{feature:t}}))}var Gl=(()=>{class t{impl=null;execute(){this.impl?.execute()}static \u0275prov=b({token:t,providedIn:"root",factory:()=>new t})}return t})(),am=[0,1,2,3],lm=(()=>{class t{ngZone=u(S);scheduler=u(rn);errorHandler=u(Qe,{optional:!0});sequences=new Set;deferredRegistrations=new Set;executing=!1;constructor(){u(Xt,{optional:!0})}execute(){let e=this.sequences.size>0;e&&fe(le.AfterRenderHooksStart),this.executing=!0;for(let i of am)for(let o of this.sequences)if(!(o.erroredOrDestroyed||!o.hooks[i]))try{o.pipelinedValue=this.ngZone.runOutsideAngular(()=>this.maybeTrace(()=>{let r=o.hooks[i];return r(o.pipelinedValue)},o.snapshot))}catch(r){o.erroredOrDestroyed=!0,this.errorHandler?.handleError(r)}this.executing=!1;for(let i of this.sequences)i.afterRun(),i.once&&(this.sequences.delete(i),i.destroy());for(let i of this.deferredRegistrations)this.sequences.add(i);this.deferredRegistrations.size>0&&this.scheduler.notify(7),this.deferredRegistrations.clear(),e&&fe(le.AfterRenderHooksEnd)}register(e){let{view:i}=e;i!==void 0?((i[Oi]??=[]).push(e),Li(i),i[U]|=8192):this.executing?this.deferredRegistrations.add(e):this.addSequence(e)}addSequence(e){this.sequences.add(e),this.scheduler.notify(7)}unregister(e){this.executing&&this.sequences.has(e)?(e.erroredOrDestroyed=!0,e.pipelinedValue=void 0,e.once=!0):(this.sequences.delete(e),this.deferredRegistrations.delete(e))}maybeTrace(e,i){return i?i.run($l.AFTER_NEXT_RENDER,e):e()}static \u0275prov=b({token:t,providedIn:"root",factory:()=>new t})}return t})(),ts=class{impl;hooks;view;once;snapshot;erroredOrDestroyed=!1;pipelinedValue=void 0;unregisterOnDestroy;constructor(n,e,i,o,r,s=null){this.impl=n,this.hooks=e,this.view=i,this.once=o,this.snapshot=s,this.unregisterOnDestroy=r?.onDestroy(()=>this.destroy())}afterRun(){this.erroredOrDestroyed=!1,this.pipelinedValue=void 0,this.snapshot?.dispose(),this.snapshot=null}destroy(){this.impl.unregister(this),this.unregisterOnDestroy?.();let n=this.view?.[Oi];n&&(this.view[Oi]=n.filter(e=>e!==this))}};function Ge(t,n){let e=n?.injector??u(F);return qi("NgAfterNextRender"),Dw(t,e,n,!0)}function bw(t){return t instanceof Function?[void 0,void 0,t,void 0]:[t.earlyRead,t.write,t.mixedReadWrite,t.read]}function Dw(t,n,e,i){let o=n.get(Gl);o.impl??=n.get(lm);let r=n.get(Xt,null,{optional:!0}),s=e?.manualCleanup!==!0?n.get(vt):null,a=n.get(ko,null,{optional:!0}),l=new ts(o.impl,bw(t),a?.view,i,s,r?.snapshot(null));return o.impl.register(l),l}var u_=new _("",{factory:()=>({queue:new Set,isScheduled:!1,scheduler:null,injector:u(Re)})});function f_(t,n,e){let i=t.get(u_);if(Array.isArray(n))for(let o of n)i.queue.add(o),e?.detachedLeaveAnimationFns?.push(o);else i.queue.add(n),e?.detachedLeaveAnimationFns?.push(n);i.scheduler&&i.scheduler(t)}function Cw(t,n){let e=t.get(u_);if(n.detachedLeaveAnimationFns){for(let i of n.detachedLeaveAnimationFns)e.queue.delete(i);n.detachedLeaveAnimationFns=void 0}}function Ew(t,n){for(let[e,i]of n)f_(t,i.animateFns)}function tv(t,n,e,i){let o=t?.[Gn]?.enter;n!==null&&o&&o.has(e.index)&&Ew(i,o)}function Ro(t,n,e,i,o,r,s,a){if(o!=null){let l,c=!1;Ut(o)?l=o:En(o)&&(c=!0,o=o[jt]);let d=Et(o);t===0&&i!==null?(tv(a,i,r,e),s==null?n_(n,i,d):Tl(n,i,d,s||null,!0)):t===1&&i!==null?(tv(a,i,r,e),Tl(n,i,d,s||null,!0),_w(r,d)):t===2?(a?.[Gn]?.leave?.has(r.index)&&yw(r,d),Xr.delete(d),nv(a,r,e,f=>{if(Xr.has(d)){Xr.delete(d);return}i_(n,d,c,f)})):t===3&&(Xr.delete(d),nv(a,r,e,()=>{n.destroyNode(d)})),l!=null&&Ow(n,t,e,l,r,i,s)}}function ww(t,n){m_(t,n),n[jt]=null,n[tt]=null}function xw(t,n,e,i,o,r){i[jt]=o,i[tt]=n,ql(t,i,e,1,o,r)}function m_(t,n){n[Ht].changeDetectionScheduler?.notify(9),ql(t,n,n[_e],2,null,null)}function Iw(t){let n=t[Mo];if(!n)return Xu(t[P],t);for(;n;){let e=null;if(En(n))e=n[Mo];else{let i=n[Te];i&&(e=i)}if(!e){for(;n&&!n[Ct]&&n!==t;)En(n)&&Xu(n[P],n),n=n[je];n===null&&(n=t),En(n)&&Xu(n[P],n),e=n&&n[Ct]}n=e}}function cm(t,n){let e=t[Fi],i=e.indexOf(n);e.splice(i,1)}function Wl(t,n){if(Pi(n))return;let e=n[_e];e.destroyNode&&ql(t,n,e,3,null,null),Iw(n)}function Xu(t,n){if(Pi(n))return;let e=O(null);try{n[U]&=-129,n[U]|=256,n[ht]&&Pn(n[ht]),Tw(t,n),Sw(t,n),n[P].type===1&&n[_e].destroy();let i=n[$n];if(i!==null&&Ut(n[je])){i!==n[je]&&cm(i,n);let o=n[sn];o!==null&&o.detachView(t)}cf(n)}finally{O(e)}}function nv(t,n,e,i){let o=t?.[Gn];if(o==null||o.leave==null||!o.leave.has(n.index))return i(!1);t&&zi.add(t[Cn]),f_(e,()=>{if(o.leave&&o.leave.has(n.index)){let s=o.leave.get(n.index),a=[];if(s){for(let l=0;l<s.animateFns.length;l++){let c=s.animateFns[l],{promise:d}=c();a.push(d)}o.detachedLeaveAnimationFns=void 0}o.running=Promise.allSettled(a),Mw(t,i)}else t&&zi.delete(t[Cn]),i(!1)},o)}function Mw(t,n){let e=t[Gn]?.running;if(e){e.then(()=>{t[Gn].running=void 0,zi.delete(t[Cn]),n(!0)});return}n(!1)}function Sw(t,n){let e=t.cleanup,i=n[Io];if(e!==null)for(let s=0;s<e.length-1;s+=2)if(typeof e[s]=="string"){let a=e[s+3];a>=0?i[a]():i[-a].unsubscribe(),s+=2}else{let a=i[e[s+1]];e[s].call(a)}i!==null&&(n[Io]=null);let o=n[bn];if(o!==null){n[bn]=null;for(let s=0;s<o.length;s++){let a=o[s];a()}}let r=n[Bn];if(r!==null){n[Bn]=null;for(let s of r)s.destroy()}}function Tw(t,n){let e;if(t!=null&&(e=t.destroyHooks)!=null)for(let i=0;i<e.length;i+=2){let o=n[e[i]];if(!(o instanceof Ui)){let r=e[i+1];if(Array.isArray(r))for(let s=0;s<r.length;s+=2){let a=o[r[s]],l=r[s+1];fe(le.LifecycleHookStart,a,l);try{l.call(a)}finally{fe(le.LifecycleHookEnd,a,l)}}else{fe(le.LifecycleHookStart,o,r);try{r.call(o)}finally{fe(le.LifecycleHookEnd,o,r)}}}}}function p_(t,n,e){return Aw(t,n.parent,e)}function Aw(t,n,e){let i=n;for(;i!==null&&i.type&168;)n=i,i=n.parent;if(i===null)return e[jt];if(wn(i)){let{encapsulation:o}=t.data[i.directiveStart+i.componentOffset];if(o===Yt.None||o===Yt.Emulated)return null}return $t(i,e)}function h_(t,n,e){return Rw(t,n,e)}function kw(t,n,e){return t.type&40?$t(t,e):null}var Rw=kw,iv;function dm(t,n,e,i){let o=p_(t,i,n),r=n[_e],s=i.parent||n[tt],a=h_(s,i,n);if(o!=null)if(Array.isArray(e))for(let l=0;l<e.length;l++)Qg(r,o,e[l],a,!1);else Qg(r,o,e,a,!1);iv!==void 0&&iv(r,i,n,e,o)}function Qr(t,n){if(n!==null){let e=n.type;if(e&3)return $t(n,t);if(e&4)return Cf(-1,t[n.index]);if(e&8){let i=n.child;if(i!==null)return Qr(t,i);{let o=t[n.index];return Ut(o)?Cf(-1,o):Et(o)}}else{if(e&128)return Qr(t,n.next);if(e&32)return sm(n,t)()||Et(t[n.index]);{let i=g_(t,n);if(i!==null){if(Array.isArray(i))return i[0];let o=jn(t[nt]);return Qr(o,i)}else return Qr(t,n.next)}}}return null}function g_(t,n){if(n!==null){let i=t[nt][tt],o=n.projection;return i.projection[o]}return null}function Cf(t,n){let e=Te+t+1;if(e<n.length){let i=n[e],o=i[P].firstChild;if(o!==null)return Qr(i,o)}return n[Wn]}function um(t,n,e,i,o,r,s){for(;e!=null;){let a=i[Dn];if(e.type===128){e=e.next;continue}let l=i[e.index],c=e.type;if(s&&n===0&&(l&&Fo(Et(l),i),e.flags|=2),!Vl(e))if(c&8)um(t,n,e.child,i,o,r,!1),Ro(n,t,a,o,l,e,r,i);else if(c&32){let d=sm(e,i),f;for(;f=d();)Ro(n,t,a,o,f,e,r,i);Ro(n,t,a,o,l,e,r,i)}else c&16?v_(t,n,i,e,o,r):Ro(n,t,a,o,l,e,r,i);e=s?e.projectionNext:e.next}}function ql(t,n,e,i,o,r){um(e,i,t.firstChild,n,o,r,!1)}function Nw(t,n,e){let i=n[_e],o=p_(t,e,n),r=e.parent||n[tt],s=h_(r,e,n);v_(i,0,n,e,o,s)}function v_(t,n,e,i,o,r){let s=e[nt],l=s[tt].projection[i.projection];if(Array.isArray(l))for(let c=0;c<l.length;c++){let d=l[c];Ro(n,t,e[Dn],o,d,i,r,e)}else{let c=l,d=s[je];Lv(i)&&(c.flags|=128),um(t,n,c,d,o,r,!0)}}function Ow(t,n,e,i,o,r,s){let a=i[Wn],l=Et(i);a!==l&&Ro(n,t,e,r,a,o,s);for(let c=Te;c<i.length;c++){let d=i[c];ql(d[P],d,t,n,r,a)}}function Fw(t,n,e,i,o){if(n)o?t.addClass(e,i):t.removeClass(e,i);else{let r=i.indexOf("-")===-1?void 0:cn.DashCase;o==null?t.removeStyle(e,i,r):(typeof o=="string"&&o.endsWith("!important")&&(o=o.slice(0,-10),r|=cn.Important),t.setStyle(e,i,o,r))}}function __(t,n,e,i,o){let r=an(),s=i&2;try{qn(-1),s&&n.length>De&&d_(t,n,De,!1);let a=s?le.TemplateUpdateStart:le.TemplateCreateStart;fe(a,o,e),e(i,o)}finally{qn(r);let a=s?le.TemplateUpdateEnd:le.TemplateCreateEnd;fe(a,o,e)}}function Yl(t,n,e){Uw(t,n,e),(e.flags&64)===64&&zw(t,n,e)}function ds(t,n,e=$t){let i=n.localNames;if(i!==null){let o=n.index+1;for(let r=0;r<i.length;r+=2){let s=i[r+1],a=s===-1?e(n,t):t[s];t[o++]=a}}}function Pw(t,n,e,i){let r=i.get(Wv,Gv)||e===Yt.ShadowDom||e===Yt.ExperimentalIsolatedShadowDom,s=t.selectRootElement(n,r);return Lw(s),s}function Lw(t){Vw(t)}var Vw=()=>null;function Bw(t){return t==="class"?"className":t==="for"?"htmlFor":t==="formaction"?"formAction":t==="innerHtml"?"innerHTML":t==="readonly"?"readOnly":t==="tabindex"?"tabIndex":t}function jw(t,n,e,i,o,r){let s=n[P];if(hm(t,s,n,e,i)){wn(t)&&Hw(n,t.index);return}t.type&3&&(e=Bw(e)),y_(t,n,e,i,o,r)}function y_(t,n,e,i,o,r){if(t.type&3){let s=$t(t,n);i=r!=null?r(i,t.value||"",e):i,o.setProperty(s,e,i)}else t.type&12}function Hw(t,n){let e=wt(n,t);e[U]&16||(e[U]|=64)}function Uw(t,n,e){let i=e.directiveStart,o=e.directiveEnd;wn(e)&&gw(n,e,t.data[i+e.componentOffset]),t.firstCreatePass||Sl(e,n);let r=e.initialInputs;for(let s=i;s<o;s++){let a=t.data[s],l=es(n,t,s,e);if(Fo(l,n),r!==null&&qw(n,s-i,l,a,e,r),zt(a)){let c=wt(e.index,n);c[Ne]=es(n,t,s,e)}}}function zw(t,n,e){let i=e.directiveStart,o=e.directiveEnd,r=e.index,s=xg();try{qn(r);for(let a=i;a<o;a++){let l=t.data[a],c=n[a];al(a),(l.hostBindings!==null||l.hostVars!==0||l.hostAttrs!==null)&&$w(l,c)}}finally{qn(-1),al(s)}}function $w(t,n){t.hostBindings!==null&&t.hostBindings(1,n)}function fm(t,n){let e=t.directiveRegistry,i=null;if(e)for(let o=0;o<e.length;o++){let r=e[o];a_(n,r.selectors,!1)&&(i??=[],zt(r)?i.unshift(r):i.push(r))}return i}function Gw(t,n,e,i,o,r){let s=$t(t,n);Ww(n[_e],s,r,t.value,e,i,o)}function Ww(t,n,e,i,o,r,s){if(r==null)t.removeAttribute(n,o,e);else{let a=s==null?Si(r):s(r,i||"",o);t.setAttribute(n,o,a,e)}}function qw(t,n,e,i,o,r){let s=r[n];if(s!==null)for(let a=0;a<s.length;a+=2){let l=s[a],c=s[a+1];bf(i,e,l,c)}}function mm(t,n,e,i,o){let r=De+e,s=n[P],a=o(s,n,t,i,e);n[r]=a,Ao(t,!0);let l=t.type===2;return l?(o_(n[_e],a,t),(gg()===0||So(t))&&Fo(a,n),vg()):Fo(a,n),ml()&&(!l||!Vl(t))&&dm(s,n,a,t),t}function pm(t){let n=t;return Vu()?Bu():(n=n.parent,Ao(n,!1)),n}function Yw(t,n){let e=t[Dn];if(!e)return;let i;try{i=e.get(xn,null)}catch{i=null}i?.(n)}function hm(t,n,e,i,o){let r=t.inputs?.[i],s=t.hostDirectiveInputs?.[i],a=!1;if(s)for(let l=0;l<s.length;l+=2){let c=s[l],d=s[l+1],f=n.data[c];bf(f,e[c],d,o),a=!0}if(r)for(let l of r){let c=e[l],d=n.data[l];bf(d,c,i,o),a=!0}return a}function Zw(t,n){let e=wt(n,t),i=e[P];Kw(i,e);let o=e[jt];o!==null&&e[ki]===null&&(e[ki]=qv(o,e[Dn])),fe(le.ComponentStart);try{gm(i,e,e[Ne])}finally{fe(le.ComponentEnd,e[Ne])}}function Kw(t,n){for(let e=n.length;e<t.blueprint.length;e++)n.push(t.blueprint[e])}function gm(t,n,e){cl(n);try{let i=t.viewQuery;i!==null&&uf(1,i,e);let o=t.template;o!==null&&__(t,n,o,1,e),t.firstCreatePass&&(t.firstCreatePass=!1),n[sn]?.finishViewCreation(t),t.staticContentQueries&&Yv(t,n),t.staticViewQueries&&uf(2,t.viewQuery,e);let r=t.components;r!==null&&Xw(n,r)}catch(i){throw t.firstCreatePass&&(t.incompleteFirstPass=!0,t.firstCreatePass=!1),i}finally{n[U]&=-5,dl()}}function Xw(t,n){for(let e=0;e<n.length;e++)Zw(t,n[e])}function us(t,n,e,i){let o=O(null);try{let r=n.tView,a=t[U]&4096?4096:16,l=om(t,r,e,a,null,n,null,null,i?.injector??null,i?.embeddedViewInjector??null,i?.dehydratedView??null),c=t[n.index];l[$n]=c;let d=t[sn];return d!==null&&(l[sn]=d.createEmbeddedView(r)),gm(r,l,e),l}finally{O(o)}}function Po(t,n){return!n||n.firstChild===null||Lv(t)}function ns(t,n,e,i,o=!1){for(;e!==null;){if(e.type===128){e=o?e.projectionNext:e.next;continue}let r=n[e.index];r!==null&&i.push(Et(r)),Ut(r)&&b_(r,i);let s=e.type;if(s&8)ns(t,n,e.child,i);else if(s&32){let a=sm(e,n),l;for(;l=a();)i.push(l)}else if(s&16){let a=g_(n,e);if(Array.isArray(a))i.push(...a);else{let l=jn(n[nt]);ns(l[P],l,a,i,!0)}}e=o?e.projectionNext:e.next}return i}function b_(t,n){for(let e=Te;e<t.length;e++){let i=t[e],o=i[P].firstChild;o!==null&&ns(i[P],i,o,n)}t[Wn]!==t[jt]&&n.push(t[Wn])}function D_(t){if(t[Oi]!==null){for(let n of t[Oi])n.impl.addSequence(n);t[Oi].length=0}}var C_=[];function Qw(t){return t[ht]??Jw(t)}function Jw(t){let n=C_.pop()??Object.create(tx);return n.lView=t,n}function ex(t){t.lView[ht]!==t&&(t.lView=null,C_.push(t))}var tx=ee(D({},ui),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:t=>{Li(t.lView)},consumerOnSignalRead(){this.lView[ht]=this}});function nx(t){let n=t[ht]??Object.create(ix);return n.lView=t,n}var ix=ee(D({},ui),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:t=>{let n=jn(t.lView);for(;n&&!E_(n[P]);)n=jn(n);n&&Tu(n)},consumerOnSignalRead(){this.lView[ht]=this}});function E_(t){return t.type!==2}function w_(t){if(t[Bn]===null)return;let n=!0;for(;n;){let e=!1;for(let i of t[Bn])i.dirty&&(e=!0,i.zone===null||Zone.current===i.zone?i.run():i.zone.run(()=>i.run()));n=e&&!!(t[U]&8192)}}var ox=100;function x_(t,n=0){let i=t[Ht].rendererFactory,o=!1;o||i.begin?.();try{rx(t,n)}finally{o||i.end?.()}}function rx(t,n){let e=ju();try{jr(!0),Ef(t,n);let i=0;for(;Wr(t);){if(i===ox)throw new A(103,!1);i++,Ef(t,1)}}finally{jr(e)}}function sx(t,n,e,i){if(Pi(n))return;let o=n[U],r=!1,s=!1;cl(n);let a=!0,l=null,c=null;r||(E_(t)?(c=Qw(n),l=Fn(c)):ia()===null?(a=!1,c=nx(n),l=Fn(c)):n[ht]&&(Pn(n[ht]),n[ht]=null));try{Su(n),Cg(t.bindingStartIndex),e!==null&&__(t,n,e,2,i);let d=(o&3)===3;if(!r)if(d){let m=t.preOrderCheckHooks;m!==null&&yl(n,m,null)}else{let m=t.preOrderHooks;m!==null&&bl(n,m,0,null),Zu(n,0)}if(s||ax(n),w_(n),I_(n,0),t.contentQueries!==null&&Yv(t,n),!r)if(d){let m=t.contentCheckHooks;m!==null&&yl(n,m)}else{let m=t.contentHooks;m!==null&&bl(n,m,1),Zu(n,1)}cx(t,n);let f=t.components;f!==null&&S_(n,f,0);let p=t.viewQuery;if(p!==null&&uf(2,p,i),!r)if(d){let m=t.viewCheckHooks;m!==null&&yl(n,m)}else{let m=t.viewHooks;m!==null&&bl(n,m,2),Zu(n,2)}if(t.firstUpdatePass===!0&&(t.firstUpdatePass=!1),n[tl]){for(let m of n[tl])m();n[tl]=null}r||(D_(n),n[U]&=-73)}catch(d){throw r||Li(n),d}finally{c!==null&&(mi(c,l),a&&ex(c)),dl()}}function I_(t,n){for(let e=Bv(t);e!==null;e=jv(e))for(let i=Te;i<e.length;i++){let o=e[i];M_(o,n)}}function ax(t){for(let n=Bv(t);n!==null;n=jv(n)){if(!(n[U]&2))continue;let e=n[Fi];for(let i=0;i<e.length;i++){let o=e[i];Tu(o)}}}function lx(t,n,e){fe(le.ComponentStart);let i=wt(n,t);try{M_(i,e)}finally{fe(le.ComponentEnd,i[Ne])}}function M_(t,n){il(t)&&Ef(t,n)}function Ef(t,n){let i=t[P],o=t[U],r=t[ht],s=!!(n===0&&o&16);if(s||=!!(o&64&&n===0),s||=!!(o&1024),s||=!!(r?.dirty&&uo(r)),s||=!1,r&&(r.dirty=!1),t[U]&=-9217,s)sx(i,t,i.template,t[Ne]);else if(o&8192){let a=O(null);try{w_(t),I_(t,1);let l=i.components;l!==null&&S_(t,l,1),D_(t)}finally{O(a)}}}function S_(t,n,e){for(let i=0;i<n.length;i++)lx(t,n[i],e)}function cx(t,n){let e=t.hostBindingOpCodes;if(e!==null)try{for(let i=0;i<e.length;i++){let o=e[i];if(o<0)qn(~o);else{let r=o,s=e[++i],a=e[++i];wg(s,r);let l=n[r];fe(le.HostBindingsUpdateStart,l);try{a(2,l)}finally{fe(le.HostBindingsUpdateEnd,l)}}}}finally{qn(-1)}}function vm(t,n){let e=ju()?64:1088;for(t[Ht].changeDetectionScheduler?.notify(n);t;){t[U]|=e;let i=jn(t);if(To(t)&&!i)return t;t=i}return null}function T_(t,n,e,i){return[t,!0,0,n,null,i,null,e,null,null]}function A_(t,n){let e=Te+n;if(e<t.length)return t[e]}function fs(t,n,e,i=!0){let o=n[P];if(dx(o,n,t,e),i){let s=Cf(e,t),a=n[_e],l=a.parentNode(t[Wn]);l!==null&&xw(o,t[tt],a,n,l,s)}let r=n[ki];r!==null&&r.firstChild!==null&&(r.firstChild=null)}function k_(t,n){let e=is(t,n);return e!==void 0&&Wl(e[P],e),e}function is(t,n){if(t.length<=Te)return;let e=Te+n,i=t[e];if(i){let o=i[$n];o!==null&&o!==t&&cm(o,i),n>0&&(t[e-1][Ct]=i[Ct]);let r=zr(t,Te+n);ww(i[P],i);let s=r[sn];s!==null&&s.detachView(r[P]),i[je]=null,i[Ct]=null,i[U]&=-129}return i}function dx(t,n,e,i){let o=Te+i,r=e.length;i>0&&(e[o-1][Ct]=n),i<r-Te?(n[Ct]=e[o],pu(e,Te+i,n)):(e.push(n),n[Ct]=null),n[je]=e;let s=n[$n];s!==null&&e!==s&&R_(s,n);let a=n[sn];a!==null&&a.insertView(t),ol(n),n[U]|=128}function R_(t,n){let e=t[Fi],i=n[je];if(En(i))t[U]|=2;else{let o=i[je][nt];n[nt]!==o&&(t[U]|=2)}e===null?t[Fi]=[n]:e.push(n)}var Yn=class{_lView;_cdRefInjectingView;_appRef=null;_attachedToViewContainer=!1;exhaustive;get rootNodes(){let n=this._lView,e=n[P];return ns(e,n,e.firstChild,[])}constructor(n,e){this._lView=n,this._cdRefInjectingView=e}get context(){return this._lView[Ne]}set context(n){this._lView[Ne]=n}get destroyed(){return Pi(this._lView)}destroy(){if(this._appRef)this._appRef.detachView(this);else if(this._attachedToViewContainer){let n=this._lView[je];if(Ut(n)){let e=n[Gr],i=e?e.indexOf(this):-1;i>-1&&(is(n,i),zr(e,i))}this._attachedToViewContainer=!1}Wl(this._lView[P],this._lView)}onDestroy(n){Au(this._lView,n)}markForCheck(){vm(this._cdRefInjectingView||this._lView,4)}detach(){this._lView[U]&=-129}reattach(){ol(this._lView),this._lView[U]|=128}detectChanges(){this._lView[U]|=1024,x_(this._lView)}checkNoChanges(){}attachToViewContainerRef(){if(this._appRef)throw new A(902,!1);this._attachedToViewContainer=!0}detachFromAppRef(){this._appRef=null;let n=To(this._lView),e=this._lView[$n];e!==null&&!n&&cm(e,this._lView),m_(this._lView[P],this._lView)}attachToAppRef(n){if(this._attachedToViewContainer)throw new A(902,!1);this._appRef=n;let e=To(this._lView),i=this._lView[$n];i!==null&&!e&&R_(i,this._lView),ol(this._lView)}};var it=(()=>{class t{_declarationLView;_declarationTContainer;elementRef;static __NG_ELEMENT_ID__=ux;constructor(e,i,o){this._declarationLView=e,this._declarationTContainer=i,this.elementRef=o}get ssrId(){return this._declarationTContainer.tView?.ssrId||null}createEmbeddedView(e,i){return this.createEmbeddedViewImpl(e,i)}createEmbeddedViewImpl(e,i,o){let r=us(this._declarationLView,this._declarationTContainer,e,{embeddedViewInjector:i,dehydratedView:o});return new Yn(r)}}return t})();function ux(){return Zl($e(),$())}function Zl(t,n){return t.type&4?new it(n,t,jo(t,n)):null}function Ho(t,n,e,i,o){let r=t.data[n];if(r===null)r=fx(t,n,e,i,o),Eg()&&(r.flags|=32);else if(r.type&64){r.type=e,r.value=i,r.attrs=o;let s=_g();r.injectorIndex=s===null?-1:s.injectorIndex}return Ao(r,!0),r}function fx(t,n,e,i,o){let r=Lu(),s=Vu(),a=s?r:r&&r.parent,l=t.data[n]=px(t,a,e,n,i,o);return mx(t,l,r,s),l}function mx(t,n,e,i){t.firstChild===null&&(t.firstChild=n),e!==null&&(i?e.child==null&&n.parent!==null&&(e.child=n):e.next===null&&(e.next=n,n.prev=e))}function px(t,n,e,i,o,r){let s=n?n.injectorIndex:-1,a=0;return Ou()&&(a|=128),{type:e,index:i,insertBeforeIndex:null,injectorIndex:s,directiveStart:-1,directiveEnd:-1,directiveStylingLast:-1,componentOffset:-1,controlDirectiveIndex:-1,customControlIndex:-1,propertyBindings:null,flags:a,providerIndexes:0,value:o,attrs:r,mergedAttrs:null,localNames:null,initialInputs:null,inputs:null,hostDirectiveInputs:null,outputs:null,hostDirectiveOutputs:null,directiveToIndex:null,tView:null,next:null,prev:null,projectionNext:null,child:null,parent:n,projection:null,styles:null,stylesWithoutHost:null,residualStyles:void 0,classes:null,classesWithoutHost:null,residualClasses:void 0,classBindings:0,styleBindings:0}}function hx(t){let n=t[Cu]??[],i=t[je][_e],o=[];for(let r of n)r.data[$v]!==void 0?o.push(r):gx(r,i);t[Cu]=o}function gx(t,n){let e=0,i=t.firstChild;if(i){let o=t.data[zv];for(;e<o;){let r=i.nextSibling;i_(n,i,!1),i=r,e++}}}var vx=()=>null,_x=()=>null;function Al(t,n){return vx(t,n)}function N_(t,n,e){return _x(t,n,e)}var O_=class{},Kl=class{},wf=class{resolveComponentFactory(n){throw new A(917,!1)}},Xl=class{static NULL=new wf},Fe=class{},Ae=(()=>{class t{destroyNode=null;static __NG_ELEMENT_ID__=()=>yx()}return t})();function yx(){let t=$(),n=$e(),e=wt(n.index,t);return(En(e)?e:t)[_e]}var F_=(()=>{class t{static \u0275prov=b({token:t,providedIn:"root",factory:()=>null})}return t})();var Cl={},xf=class{injector;parentInjector;constructor(n,e){this.injector=n,this.parentInjector=e}get(n,e,i){let o=this.injector.get(n,Cl,i);return o!==Cl||e===Cl?o:this.parentInjector.get(n,e,i)}};function kl(t,n,e){let i=e?t.styles:null,o=e?t.classes:null,r=0;if(n!==null)for(let s=0;s<n.length;s++){let a=n[s];if(typeof a=="number")r=a;else if(r==1)o=qa(o,a);else if(r==2){let l=a,c=n[++s];i=qa(i,l+": "+c+";")}}e?t.styles=i:t.stylesWithoutHost=i,e?t.classes=o:t.classesWithoutHost=o}function Y(t,n=0){let e=$();if(e===null)return M(t,n);let i=$e();return Nv(i,e,Be(t),n)}function _m(){let t="invalid";throw new Error(t)}function P_(t,n,e,i,o){let r=i===null?null:{"":-1},s=o(t,e);if(s!==null){let a=s,l=null,c=null;for(let d of s)if(d.resolveHostDirectives!==null){[a,l,c]=d.resolveHostDirectives(s);break}Cx(t,n,e,a,r,l,c)}r!==null&&i!==null&&bx(e,i,r)}function bx(t,n,e){let i=t.localNames=[];for(let o=0;o<n.length;o+=2){let r=e[n[o+1]];if(r==null)throw new A(-301,!1);i.push(n[o],r)}}function Dx(t,n,e){n.componentOffset=e,(t.components??=[]).push(n.index)}function Cx(t,n,e,i,o,r,s){let a=i.length,l=null;for(let p=0;p<a;p++){let m=i[p];l===null&&zt(m)&&(l=m,Dx(t,e,p)),af(Sl(e,n),t,m.type)}Sx(e,t.data.length,a),l?.viewProvidersResolver&&l.viewProvidersResolver(l);for(let p=0;p<a;p++){let m=i[p];m.providersResolver&&m.providersResolver(m)}let c=!1,d=!1,f=c_(t,n,a,null);a>0&&(e.directiveToIndex=new Map);for(let p=0;p<a;p++){let m=i[p];if(e.mergedAttrs=Oo(e.mergedAttrs,m.hostAttrs),wx(t,e,n,f,m),Mx(f,m,o),s!==null&&s.has(m)){let[w,I]=s.get(m);e.directiveToIndex.set(m.type,[f,w+e.directiveStart,I+e.directiveStart])}else(r===null||!r.has(m))&&e.directiveToIndex.set(m.type,f);m.contentQueries!==null&&(e.flags|=4),(m.hostBindings!==null||m.hostAttrs!==null||m.hostVars!==0)&&(e.flags|=64);let v=m.type.prototype;!c&&(v.ngOnChanges||v.ngOnInit||v.ngDoCheck)&&((t.preOrderHooks??=[]).push(e.index),c=!0),!d&&(v.ngOnChanges||v.ngDoCheck)&&((t.preOrderCheckHooks??=[]).push(e.index),d=!0),f++}Ex(t,e,r)}function Ex(t,n,e){for(let i=n.directiveStart;i<n.directiveEnd;i++){let o=t.data[i];if(e===null||!e.has(o))ov(0,n,o,i),ov(1,n,o,i),sv(n,i,!1);else{let r=e.get(o);rv(0,n,r,i),rv(1,n,r,i),sv(n,i,!0)}}}function ov(t,n,e,i){let o=t===0?e.inputs:e.outputs;for(let r in o)if(o.hasOwnProperty(r)){let s;t===0?s=n.inputs??={}:s=n.outputs??={},s[r]??=[],s[r].push(i),L_(n,r)}}function rv(t,n,e,i){let o=t===0?e.inputs:e.outputs;for(let r in o)if(o.hasOwnProperty(r)){let s=o[r],a;t===0?a=n.hostDirectiveInputs??={}:a=n.hostDirectiveOutputs??={},a[s]??=[],a[s].push(i,r),L_(n,s)}}function L_(t,n){n==="class"?t.flags|=8:n==="style"&&(t.flags|=16)}function sv(t,n,e){let{attrs:i,inputs:o,hostDirectiveInputs:r}=t;if(i===null||!e&&o===null||e&&r===null||nm(t)){t.initialInputs??=[],t.initialInputs.push(null);return}let s=null,a=0;for(;a<i.length;){let l=i[a];if(l===0){a+=4;continue}else if(l===5){a+=2;continue}else if(typeof l=="number")break;if(!e&&o.hasOwnProperty(l)){let c=o[l];for(let d of c)if(d===n){s??=[],s.push(l,i[a+1]);break}}else if(e&&r.hasOwnProperty(l)){let c=r[l];for(let d=0;d<c.length;d+=2)if(c[d]===n){s??=[],s.push(c[d+1],i[a+1]);break}}a+=2}t.initialInputs??=[],t.initialInputs.push(s)}function wx(t,n,e,i,o){t.data[i]=o;let r=o.factory||(o.factory=Vn(o.type,!0)),s=new Ui(r,zt(o),Y,null);t.blueprint[i]=s,e[i]=s,xx(t,n,i,c_(t,e,o.hostVars,at),o)}function xx(t,n,e,i,o){let r=o.hostBindings;if(r){let s=t.hostBindingOpCodes;s===null&&(s=t.hostBindingOpCodes=[]);let a=~n.index;Ix(s)!=a&&s.push(a),s.push(e,i,r)}}function Ix(t){let n=t.length;for(;n>0;){let e=t[--n];if(typeof e=="number"&&e<0)return e}return 0}function Mx(t,n,e){if(e){if(n.exportAs)for(let i=0;i<n.exportAs.length;i++)e[n.exportAs[i]]=t;zt(n)&&(e[""]=t)}}function Sx(t,n,e){t.flags|=1,t.directiveStart=n,t.directiveEnd=n+e,t.providerIndexes=n}function ym(t,n,e,i,o,r,s,a){let l=n[P],c=l.consts,d=gt(c,s),f=Ho(l,t,e,i,d);return r&&P_(l,n,f,gt(c,a),o),f.mergedAttrs=Oo(f.mergedAttrs,f.attrs),f.attrs!==null&&kl(f,f.attrs,!1),f.mergedAttrs!==null&&kl(f,f.mergedAttrs,!0),l.queries!==null&&l.queries.elementStart(l,f),f}function bm(t,n){wv(t,n),Eu(n)&&t.queries.elementEnd(n)}function Tx(t,n,e,i,o,r){let s=n.consts,a=gt(s,o),l=Ho(n,t,e,i,a);if(l.mergedAttrs=Oo(l.mergedAttrs,l.attrs),r!=null){let c=gt(s,r);l.localNames=[];for(let d=0;d<c.length;d+=2)l.localNames.push(c[d],-1)}return l.attrs!==null&&kl(l,l.attrs,!1),l.mergedAttrs!==null&&kl(l,l.mergedAttrs,!0),n.queries!==null&&n.queries.elementStart(n,l),l}function Ax(t,n,e){return t[n]=e}function Zt(t,n,e){if(e===at)return!1;let i=t[n];return Object.is(i,e)?!1:(t[n]=e,!0)}function kx(t,n,e,i){let o=Zt(t,n,e);return Zt(t,n+1,i)||o}function El(t,n,e){return function i(o){let r=wn(t)?wt(t.index,n):n;vm(r,5);let s=n[Ne],a=av(n,s,e,o),l=i.__ngNextListenerFn__;for(;l;)a=av(n,s,l,o)&&a,l=l.__ngNextListenerFn__;return a}}function av(t,n,e,i){let o=O(null);try{return fe(le.OutputStart,n,e),e(i)!==!1}catch(r){return Yw(t,r),!1}finally{fe(le.OutputEnd,n,e),O(o)}}function V_(t,n,e,i,o,r,s,a){let l=So(t),c=!1,d=null;if(!i&&l&&(d=Nx(n,e,r,t.index)),d!==null){let f=d.__ngLastListenerFn__||d;f.__ngNextListenerFn__=s,d.__ngLastListenerFn__=s,c=!0}else{let f=$t(t,e),p=i?i(f):f;M0(e,p,r,a);let m=o.listen(p,r,a);if(!Rx(r)){let v=i?w=>i(Et(w[t.index])):t.index;B_(v,n,e,r,a,m,!1)}}return c}function Rx(t){return t.startsWith("animation")||t.startsWith("transition")}function Nx(t,n,e,i){let o=t.cleanup;if(o!=null)for(let r=0;r<o.length-1;r+=2){let s=o[r];if(s===e&&o[r+1]===i){let a=n[Io],l=o[r+2];return a&&a.length>l?a[l]:null}typeof s=="string"&&(r+=2)}return null}function B_(t,n,e,i,o,r,s){let a=n.firstCreatePass?Ru(n):null,l=ku(e),c=l.length;l.push(o,r),a&&a.push(i,t,c,(c+1)*(s?-1:1))}function lv(t,n,e,i,o,r){let s=n[e],a=n[P],c=a.data[e].outputs[i],f=s[c].subscribe(r);B_(t.index,a,n,o,r,f,!0)}var If=Symbol("BINDING");function j_(t){return t.debugInfo?.className||t.type.name||null}var Mf=class extends Xl{ngModule;constructor(n){super(),this.ngModule=n}resolveComponentFactory(n){let e=zn(n);return new Lo(e,this.ngModule)}};function Ox(t){return Object.keys(t).map(n=>{let[e,i,o]=t[n],r={propName:e,templateName:n,isSignal:(i&zl.SignalBased)!==0};return o&&(r.transform=o),r})}function Fx(t){return Object.keys(t).map(n=>({propName:t[n],templateName:n}))}function Px(t,n,e){let i=n instanceof Re?n:n?.injector;return i&&t.getStandaloneInjector!==null&&(i=t.getStandaloneInjector(i)||i),i?new xf(e,i):e}function Lx(t){let n=t.get(Fe,null);if(n===null)throw new A(407,!1);let e=t.get(F_,null),i=t.get(rn,null),o=t.get(Xt,null,{optional:!0});return{rendererFactory:n,sanitizer:e,changeDetectionScheduler:i,ngReflect:!1,tracingService:o}}function Vx(t,n){let e=H_(t);return t_(n,e,e==="svg"?wu:e==="math"?dg:null)}function H_(t){return(t.selectors[0][0]||"div").toLowerCase()}var Lo=class extends Kl{componentDef;ngModule;selector;componentType;ngContentSelectors;isBoundToModule;cachedInputs=null;cachedOutputs=null;get inputs(){return this.cachedInputs??=Ox(this.componentDef.inputs),this.cachedInputs}get outputs(){return this.cachedOutputs??=Fx(this.componentDef.outputs),this.cachedOutputs}constructor(n,e){super(),this.componentDef=n,this.ngModule=e,this.componentType=n.type,this.selector=fw(n.selectors),this.ngContentSelectors=n.ngContentSelectors??[],this.isBoundToModule=!!e}create(n,e,i,o,r,s){fe(le.DynamicComponentStart);let a=O(null);try{let l=this.componentDef,c=Px(l,o||this.ngModule,n),d=Lx(c),f=d.tracingService;return f&&f.componentCreate?f.componentCreate(j_(l),()=>this.createComponentRef(d,c,e,i,r,s)):this.createComponentRef(d,c,e,i,r,s)}finally{O(a)}}createComponentRef(n,e,i,o,r,s){let a=this.componentDef,l=Bx(o,a,s,r),c=n.rendererFactory.createRenderer(null,a),d=o?Pw(c,o,a.encapsulation,e):Vx(a,c),f=s?.some(cv)||r?.some(v=>typeof v!="function"&&v.bindings.some(cv)),p=om(null,l,null,512|l_(a),null,null,n,c,e,null,qv(d,e,!0));p[De]=d,cl(p);let m=null;try{let v=ym(De,p,2,"#host",()=>l.directiveRegistry,!0,0);o_(c,d,v),Fo(d,p),Yl(l,p,v),Zf(l,v,p),bm(l,v),i!==void 0&&Hx(v,this.ngContentSelectors,i),m=wt(v.index,p),p[Ne]=m[Ne],gm(l,p,null)}catch(v){throw m!==null&&cf(m),cf(p),v}finally{fe(le.DynamicComponentEnd),dl()}return new Rl(this.componentType,p,!!f)}};function Bx(t,n,e,i){let o=t?["ng-version","21.2.10"]:mw(n.selectors[0]),r=null,s=null,a=0;if(e)for(let d of e)a+=d[If].requiredVars,d.create&&(d.targetIdx=0,(r??=[]).push(d)),d.update&&(d.targetIdx=0,(s??=[]).push(d));if(i)for(let d=0;d<i.length;d++){let f=i[d];if(typeof f!="function")for(let p of f.bindings){a+=p[If].requiredVars;let m=d+1;p.create&&(p.targetIdx=m,(r??=[]).push(p)),p.update&&(p.targetIdx=m,(s??=[]).push(p))}}let l=[n];if(i)for(let d of i){let f=typeof d=="function"?d:d.type,p=Ka(f);l.push(p)}return im(0,null,jx(r,s),1,a,l,null,null,null,[o],null)}function jx(t,n){return!t&&!n?null:e=>{if(e&1&&t)for(let i of t)i.create();if(e&2&&n)for(let i of n)i.update()}}function cv(t){let n=t[If].kind;return n==="input"||n==="twoWay"}var Rl=class extends O_{_rootLView;_hasInputBindings;instance;hostView;changeDetectorRef;componentType;location;previousInputValues=null;_tNode;constructor(n,e,i){super(),this._rootLView=e,this._hasInputBindings=i,this._tNode=nl(e[P],De),this.location=jo(this._tNode,e),this.instance=wt(this._tNode.index,e)[Ne],this.hostView=this.changeDetectorRef=new Yn(e,void 0),this.componentType=n}setInput(n,e){this._hasInputBindings;let i=this._tNode;if(this.previousInputValues??=new Map,this.previousInputValues.has(n)&&Object.is(this.previousInputValues.get(n),e))return;let o=this._rootLView,r=hm(i,o[P],o,n,e);this.previousInputValues.set(n,e);let s=wt(i.index,o);vm(s,1)}get injector(){return new Hi(this._tNode,this._rootLView)}destroy(){this.hostView.destroy()}onDestroy(n){this.hostView.onDestroy(n)}};function Hx(t,n,e){let i=t.projection=[];for(let o=0;o<n.length;o++){let r=e[o];i.push(r!=null&&r.length?Array.from(r):null)}}var lt=(()=>{class t{static __NG_ELEMENT_ID__=Ux}return t})();function Ux(){let t=$e();return U_(t,$())}var Sf=class t extends lt{_lContainer;_hostTNode;_hostLView;constructor(n,e,i){super(),this._lContainer=n,this._hostTNode=e,this._hostLView=i}get element(){return jo(this._hostTNode,this._hostLView)}get injector(){return new Hi(this._hostTNode,this._hostLView)}get parentInjector(){let n=Gf(this._hostTNode,this._hostLView);if(Mv(n)){let e=Il(n,this._hostLView),i=xl(n),o=e[P].data[i+8];return new Hi(o,e)}else return new Hi(null,this._hostLView)}clear(){for(;this.length>0;)this.remove(this.length-1)}get(n){let e=dv(this._lContainer);return e!==null&&e[n]||null}get length(){return this._lContainer.length-Te}createEmbeddedView(n,e,i){let o,r;typeof i=="number"?o=i:i!=null&&(o=i.index,r=i.injector);let s=Al(this._lContainer,n.ssrId),a=n.createEmbeddedViewImpl(e||{},r,s);return this.insertImpl(a,o,Po(this._hostTNode,s)),a}createComponent(n,e,i,o,r,s,a){let l=n&&!t0(n),c;if(l)c=e;else{let I=e||{};c=I.index,i=I.injector,o=I.projectableNodes,r=I.environmentInjector||I.ngModuleRef,s=I.directives,a=I.bindings}let d=l?n:new Lo(zn(n)),f=i||this.parentInjector;if(!r&&d.ngModule==null){let T=(l?f:this.parentInjector).get(Re,null);T&&(r=T)}let p=zn(d.componentType??{}),m=Al(this._lContainer,p?.id??null),v=m?.firstChild??null,w=d.create(f,o,v,r,s,a);return this.insertImpl(w.hostView,c,Po(this._hostTNode,m)),w}insert(n,e){return this.insertImpl(n,e,!0)}insertImpl(n,e,i){let o=n._lView;if(fg(o)){let a=this.indexOf(n);if(a!==-1)this.detach(a);else{let l=o[je],c=new t(l,l[tt],l[je]);c.detach(c.indexOf(n))}}let r=this._adjustIndex(e),s=this._lContainer;return fs(s,o,r,i),n.attachToViewContainerRef(),pu(Qu(s),r,n),n}move(n,e){return this.insert(n,e)}indexOf(n){let e=dv(this._lContainer);return e!==null?e.indexOf(n):-1}remove(n){let e=this._adjustIndex(n,-1),i=is(this._lContainer,e);i&&(zr(Qu(this._lContainer),e),Wl(i[P],i))}detach(n){let e=this._adjustIndex(n,-1),i=is(this._lContainer,e);return i&&zr(Qu(this._lContainer),e)!=null?new Yn(i):null}_adjustIndex(n,e=0){return n??this.length+e}};function dv(t){return t[Gr]}function Qu(t){return t[Gr]||(t[Gr]=[])}function U_(t,n){let e,i=n[t.index];return Ut(i)?e=i:(e=T_(i,n,null,t),n[t.index]=e,rm(n,e)),$x(e,n,t,i),new Sf(e,t,n)}function zx(t,n){let e=t[_e],i=e.createComment(""),o=$t(n,t),r=e.parentNode(o);return Tl(e,r,i,e.nextSibling(o),!1),i}var $x=qx,Gx=()=>!1;function Wx(t,n,e){return Gx(t,n,e)}function qx(t,n,e,i){if(t[Wn])return;let o;e.type&8?o=Et(i):o=zx(n,e),t[Wn]=o}var Tf=class t{queryList;matches=null;constructor(n){this.queryList=n}clone(){return new t(this.queryList)}setDirty(){this.queryList.setDirty()}},Af=class t{queries;constructor(n=[]){this.queries=n}createEmbeddedView(n){let e=n.queries;if(e!==null){let i=n.contentQueries!==null?n.contentQueries[0]:e.length,o=[];for(let r=0;r<i;r++){let s=e.getByIndex(r),a=this.queries[s.indexInDeclarationView];o.push(a.clone())}return new t(o)}return null}insertView(n){this.dirtyQueriesWithMatches(n)}detachView(n){this.dirtyQueriesWithMatches(n)}finishViewCreation(n){this.dirtyQueriesWithMatches(n)}dirtyQueriesWithMatches(n){for(let e=0;e<this.queries.length;e++)Cm(n,e).matches!==null&&this.queries[e].setDirty()}},Nl=class{flags;read;predicate;constructor(n,e,i=null){this.flags=e,this.read=i,typeof n=="string"?this.predicate=Qx(n):this.predicate=n}},kf=class t{queries;constructor(n=[]){this.queries=n}elementStart(n,e){for(let i=0;i<this.queries.length;i++)this.queries[i].elementStart(n,e)}elementEnd(n){for(let e=0;e<this.queries.length;e++)this.queries[e].elementEnd(n)}embeddedTView(n){let e=null;for(let i=0;i<this.length;i++){let o=e!==null?e.length:0,r=this.getByIndex(i).embeddedTView(n,o);r&&(r.indexInDeclarationView=i,e!==null?e.push(r):e=[r])}return e!==null?new t(e):null}template(n,e){for(let i=0;i<this.queries.length;i++)this.queries[i].template(n,e)}getByIndex(n){return this.queries[n]}get length(){return this.queries.length}track(n){this.queries.push(n)}},Rf=class t{metadata;matches=null;indexInDeclarationView=-1;crossesNgTemplate=!1;_declarationNodeIndex;_appliesToNextNode=!0;constructor(n,e=-1){this.metadata=n,this._declarationNodeIndex=e}elementStart(n,e){this.isApplyingToNode(e)&&this.matchTNode(n,e)}elementEnd(n){this._declarationNodeIndex===n.index&&(this._appliesToNextNode=!1)}template(n,e){this.elementStart(n,e)}embeddedTView(n,e){return this.isApplyingToNode(n)?(this.crossesNgTemplate=!0,this.addMatch(-n.index,e),new t(this.metadata)):null}isApplyingToNode(n){if(this._appliesToNextNode&&(this.metadata.flags&1)!==1){let e=this._declarationNodeIndex,i=n.parent;for(;i!==null&&i.type&8&&i.index!==e;)i=i.parent;return e===(i!==null?i.index:-1)}return this._appliesToNextNode}matchTNode(n,e){let i=this.metadata.predicate;if(Array.isArray(i))for(let o=0;o<i.length;o++){let r=i[o];this.matchTNodeWithReadOption(n,e,Yx(e,r)),this.matchTNodeWithReadOption(n,e,Dl(e,n,r,!1,!1))}else i===it?e.type&4&&this.matchTNodeWithReadOption(n,e,-1):this.matchTNodeWithReadOption(n,e,Dl(e,n,i,!1,!1))}matchTNodeWithReadOption(n,e,i){if(i!==null){let o=this.metadata.read;if(o!==null)if(o===B||o===lt||o===it&&e.type&4)this.addMatch(e.index,-2);else{let r=Dl(e,n,o,!1,!1);r!==null&&this.addMatch(e.index,r)}else this.addMatch(e.index,i)}}addMatch(n,e){this.matches===null?this.matches=[n,e]:this.matches.push(n,e)}};function Yx(t,n){let e=t.localNames;if(e!==null){for(let i=0;i<e.length;i+=2)if(e[i]===n)return e[i+1]}return null}function Zx(t,n){return t.type&11?jo(t,n):t.type&4?Zl(t,n):null}function Kx(t,n,e,i){return e===-1?Zx(n,t):e===-2?Xx(t,n,i):es(t,t[P],e,n)}function Xx(t,n,e){if(e===B)return jo(n,t);if(e===it)return Zl(n,t);if(e===lt)return U_(n,t)}function z_(t,n,e,i){let o=n[sn].queries[i];if(o.matches===null){let r=t.data,s=e.matches,a=[];for(let l=0;s!==null&&l<s.length;l+=2){let c=s[l];if(c<0)a.push(null);else{let d=r[c];a.push(Kx(n,d,s[l+1],e.metadata.read))}}o.matches=a}return o.matches}function Nf(t,n,e,i){let o=t.queries.getByIndex(e),r=o.matches;if(r!==null){let s=z_(t,n,o,e);for(let a=0;a<r.length;a+=2){let l=r[a];if(l>0)i.push(s[a/2]);else{let c=r[a+1],d=n[-l];for(let f=Te;f<d.length;f++){let p=d[f];p[$n]===p[je]&&Nf(p[P],p,c,i)}if(d[Fi]!==null){let f=d[Fi];for(let p=0;p<f.length;p++){let m=f[p];Nf(m[P],m,c,i)}}}}}return i}function Dm(t,n){return t[sn].queries[n].queryList}function $_(t,n,e){let i=new In((e&4)===4);return hg(t,n,i,i.destroy),(n[sn]??=new Af).queries.push(new Tf(i))-1}function G_(t,n,e){let i=Ce();return i.firstCreatePass&&(q_(i,new Nl(t,n,e),-1),(n&2)===2&&(i.staticViewQueries=!0)),$_(i,$(),n)}function W_(t,n,e,i){let o=Ce();if(o.firstCreatePass){let r=$e();q_(o,new Nl(n,e,i),r.index),Jx(o,t),(e&2)===2&&(o.staticContentQueries=!0)}return $_(o,$(),e)}function Qx(t){return t.split(",").map(n=>n.trim())}function q_(t,n,e){t.queries===null&&(t.queries=new kf),t.queries.track(new Rf(n,e))}function Jx(t,n){let e=t.contentQueries||(t.contentQueries=[]),i=e.length?e[e.length-1]:-1;n!==i&&e.push(t.queries.length-1,n)}function Cm(t,n){return t.queries.getByIndex(n)}function Y_(t,n){let e=t[P],i=Cm(e,n);return i.crossesNgTemplate?Nf(e,t,n,[]):z_(e,t,i,n)}function Z_(t,n,e){let i,o=wr(()=>{i._dirtyCounter();let r=eI(i,t);if(n&&r===void 0)throw new A(-951,!1);return r});return i=o[Le],i._dirtyCounter=N(0),i._flatValue=void 0,o}function Em(t){return Z_(!0,!1,t)}function wm(t){return Z_(!0,!0,t)}function K_(t,n){let e=t[Le];e._lView=$(),e._queryIndex=n,e._queryList=Dm(e._lView,n),e._queryList.onDirty(()=>e._dirtyCounter.update(i=>i+1))}function eI(t,n){let e=t._lView,i=t._queryIndex;if(e===void 0||i===void 0||e[U]&4)return n?void 0:Xe;let o=Dm(e,i),r=Y_(e,i);return o.reset(r,Pv),n?o.first:o._changesDetected||t._flatValue===void 0?t._flatValue=o.toArray():t._flatValue}var Zn=class{};var os=class extends Zn{injector;componentFactoryResolver=new Mf(this);instance=null;constructor(n){super();let e=new Ii([...n.providers,{provide:Zn,useValue:this},{provide:Xl,useValue:this.componentFactoryResolver}],n.parent||wo(),n.debugName,new Set(["environment"]));this.injector=e,n.runEnvironmentInitializers&&e.resolveInjectorInitializers()}destroy(){this.injector.destroy()}onDestroy(n){this.injector.onDestroy(n)}};function X_(t,n,e=null){return new os({providers:t,parent:n,debugName:e,runEnvironmentInitializers:!0}).injector}var tI=(()=>{class t{_injector;cachedInjectors=new Map;constructor(e){this._injector=e}getOrCreateStandaloneInjector(e){if(!e.standalone)return null;if(!this.cachedInjectors.has(e)){let i=vu(!1,e.type),o=i.length>0?X_([i],this._injector,""):null;this.cachedInjectors.set(e,o)}return this.cachedInjectors.get(e)}ngOnDestroy(){try{for(let e of this.cachedInjectors.values())e!==null&&e.destroy()}finally{this.cachedInjectors.clear()}}static \u0275prov=b({token:t,providedIn:"environment",factory:()=>new t(M(Re))})}return t})();function j(t){return ss(()=>{let n=Q_(t),e=ee(D({},n),{decls:t.decls,vars:t.vars,template:t.template,consts:t.consts||null,ngContentSelectors:t.ngContentSelectors,onPush:t.changeDetection===qf.OnPush,directiveDefs:null,pipeDefs:null,dependencies:n.standalone&&t.dependencies||null,getStandaloneInjector:n.standalone?o=>o.get(tI).getOrCreateStandaloneInjector(e):null,getExternalStyles:null,signals:t.signals??!1,data:t.data||{},encapsulation:t.encapsulation||Yt.Emulated,styles:t.styles||Xe,_:null,schemas:t.schemas||null,tView:null,id:""});n.standalone&&qi("NgStandalone"),J_(e);let i=t.dependencies;return e.directiveDefs=uv(i,nI),e.pipeDefs=uv(i,Zh),e.id=rI(e),e})}function nI(t){return zn(t)||Ka(t)}function q(t){return ss(()=>({type:t.type,bootstrap:t.bootstrap||Xe,declarations:t.declarations||Xe,imports:t.imports||Xe,exports:t.exports||Xe,transitiveCompileScopes:null,schemas:t.schemas||null,id:t.id||null}))}function iI(t,n){if(t==null)return Bt;let e={};for(let i in t)if(t.hasOwnProperty(i)){let o=t[i],r,s,a,l;Array.isArray(o)?(a=o[0],r=o[1],s=o[2]??r,l=o[3]||null):(r=o,s=o,a=zl.None,l=null),e[r]=[i,a,l],n[r]=s}return e}function oI(t){if(t==null)return Bt;let n={};for(let e in t)t.hasOwnProperty(e)&&(n[t[e]]=e);return n}function L(t){return ss(()=>{let n=Q_(t);return J_(n),n})}function Ql(t){return{type:t.type,name:t.name,factory:null,pure:t.pure!==!1,standalone:t.standalone??!0,onDestroy:t.type.prototype.ngOnDestroy||null}}function Q_(t){let n={};return{type:t.type,providersResolver:null,viewProvidersResolver:null,factory:null,hostBindings:t.hostBindings||null,hostVars:t.hostVars||0,hostAttrs:t.hostAttrs||null,contentQueries:t.contentQueries||null,declaredInputs:n,inputConfig:t.inputs||Bt,exportAs:t.exportAs||null,standalone:t.standalone??!0,signals:t.signals===!0,selectors:t.selectors||Xe,viewQuery:t.viewQuery||null,features:t.features||null,setInput:null,resolveHostDirectives:null,hostDirectives:null,controlDef:null,inputs:iI(t.inputs,n),outputs:oI(t.outputs),debugInfo:null}}function J_(t){t.features?.forEach(n=>n(t))}function uv(t,n){return t?()=>{let e=typeof t=="function"?t():t,i=[];for(let o of e){let r=n(o);r!==null&&i.push(r)}return i}:null}function rI(t){let n=0,e=typeof t.consts=="function"?"":t.consts,i=[t.selectors,t.ngContentSelectors,t.hostVars,t.hostAttrs,e,t.vars,t.decls,t.encapsulation,t.standalone,t.signals,t.exportAs,JSON.stringify(t.inputs),JSON.stringify(t.outputs),Object.getOwnPropertyNames(t.type.prototype),!!t.contentQueries,!!t.viewQuery];for(let r of i.join("|"))n=Math.imul(31,n)+r.charCodeAt(0)<<0;return n+=2147483648,"c"+n}function xm(t){let n=e=>{let i=Array.isArray(t);e.hostDirectives===null?(e.resolveHostDirectives=sI,e.hostDirectives=i?t.map(Of):[t]):i?e.hostDirectives.unshift(...t.map(Of)):e.hostDirectives.unshift(t)};return n.ngInherit=!0,n}function sI(t){let n=[],e=!1,i=null,o=null;for(let r=0;r<t.length;r++){let s=t[r];if(s.hostDirectives!==null){let a=n.length;i??=new Map,o??=new Map,ey(s,n,i),o.set(s,[a,n.length-1])}r===0&&zt(s)&&(e=!0,n.push(s))}for(let r=e?1:0;r<t.length;r++)n.push(t[r]);return[n,i,o]}function ey(t,n,e){if(t.hostDirectives!==null)for(let i of t.hostDirectives)if(typeof i=="function"){let o=i();for(let r of o)fv(Of(r),n,e)}else fv(i,n,e)}function fv(t,n,e){let i=Ka(t.directive);aI(i.declaredInputs,t.inputs),ey(i,n,e),e.set(i,t),n.push(i)}function Of(t){return typeof t=="function"?{directive:Be(t),inputs:Bt,outputs:Bt}:{directive:Be(t.directive),inputs:mv(t.inputs),outputs:mv(t.outputs)}}function mv(t){if(t===void 0||t.length===0)return Bt;let n={};for(let e=0;e<t.length;e+=2)n[t[e]]=t[e+1];return n}function aI(t,n){for(let e in n)if(n.hasOwnProperty(e)){let i=n[e],o=t[e];t[i]=o}}function lI(t){return Object.getPrototypeOf(t.prototype).constructor}function he(t){let n=lI(t.type),e=!0,i=[t];for(;n;){let o;if(zt(t))o=n.\u0275cmp||n.\u0275dir;else{if(n.\u0275cmp)throw new A(903,!1);o=n.\u0275dir}if(o){if(e){i.push(o);let s=t;s.inputs=Ju(t.inputs),s.declaredInputs=Ju(t.declaredInputs),s.outputs=Ju(t.outputs);let a=o.hostBindings;a&&mI(t,a);let l=o.viewQuery,c=o.contentQueries;if(l&&uI(t,l),c&&fI(t,c),cI(t,o),Yh(t.outputs,o.outputs),zt(o)&&o.data.animation){let d=t.data;d.animation=(d.animation||[]).concat(o.data.animation)}}let r=o.features;if(r)for(let s=0;s<r.length;s++){let a=r[s];a&&a.ngInherit&&a(t),a===he&&(e=!1)}}n=Object.getPrototypeOf(n)}dI(i)}function cI(t,n){for(let e in n.inputs){if(!n.inputs.hasOwnProperty(e)||t.inputs.hasOwnProperty(e))continue;let i=n.inputs[e];i!==void 0&&(t.inputs[e]=i,t.declaredInputs[e]=n.declaredInputs[e])}}function dI(t){let n=0,e=null;for(let i=t.length-1;i>=0;i--){let o=t[i];o.hostVars=n+=o.hostVars,o.hostAttrs=Oo(o.hostAttrs,e=Oo(e,o.hostAttrs))}}function Ju(t){return t===Bt?{}:t===Xe?[]:t}function uI(t,n){let e=t.viewQuery;e?t.viewQuery=(i,o)=>{n(i,o),e(i,o)}:t.viewQuery=n}function fI(t,n){let e=t.contentQueries;e?t.contentQueries=(i,o,r)=>{n(i,o,r),e(i,o,r)}:t.contentQueries=n}function mI(t,n){let e=t.hostBindings;e?t.hostBindings=(i,o)=>{n(i,o),e(i,o)}:t.hostBindings=n}function ty(t,n,e,i,o,r,s,a){if(e.firstCreatePass){t.mergedAttrs=Oo(t.mergedAttrs,t.attrs);let d=t.tView=im(2,t,o,r,s,e.directiveRegistry,e.pipeRegistry,null,e.schemas,e.consts,null);e.queries!==null&&(e.queries.template(e,t),d.queries=e.queries.embeddedTView(t))}a&&(t.flags|=a),Ao(t,!1);let l=hI(e,n,t,i);ml()&&dm(e,n,l,t),Fo(l,n);let c=T_(l,n,l,t);n[i+De]=c,rm(n,c),Wx(c,t,n)}function pI(t,n,e,i,o,r,s,a,l,c,d){let f=e+De,p;return n.firstCreatePass?(p=Ho(n,f,4,s||null,a||null),rl()&&P_(n,t,p,gt(n.consts,c),fm),wv(n,p)):p=n.data[f],ty(p,t,n,e,i,o,r,l),So(p)&&Yl(n,t,p),c!=null&&ds(t,p,d),p}function Vo(t,n,e,i,o,r,s,a,l,c,d){let f=e+De,p;if(n.firstCreatePass){if(p=Ho(n,f,4,s||null,a||null),c!=null){let m=gt(n.consts,c);p.localNames=[];for(let v=0;v<m.length;v+=2)p.localNames.push(m[v],-1)}}else p=n.data[f];return ty(p,t,n,e,i,o,r,l),c!=null&&ds(t,p,d),p}function ct(t,n,e,i,o,r,s,a){let l=$(),c=Ce(),d=gt(c.consts,r);return pI(l,c,t,n,e,i,o,d,void 0,s,a),ct}function Jl(t,n,e,i,o,r,s,a){let l=$(),c=Ce(),d=gt(c.consts,r);return Vo(l,c,t,n,e,i,o,d,void 0,s,a),Jl}var hI=gI;function gI(t,n,e,i){return Yr(!0),n[_e].createComment("")}function Yi(t){return typeof t=="function"&&t[Le]!==void 0}var Im=new _("");function Uo(t){return!!t&&typeof t.then=="function"}function Mm(t){return!!t&&typeof t.subscribe=="function"}var ny=new _("");var Sm=(()=>{class t{resolve;reject;initialized=!1;done=!1;donePromise=new Promise((e,i)=>{this.resolve=e,this.reject=i});appInits=u(ny,{optional:!0})??[];injector=u(F);constructor(){}runInitializers(){if(this.initialized)return;let e=[];for(let o of this.appInits){let r=xo(this.injector,o);if(Uo(r))e.push(r);else if(Mm(r)){let s=new Promise((a,l)=>{r.subscribe({complete:a,error:l})});e.push(s)}}let i=()=>{this.done=!0,this.resolve()};Promise.all(e).then(()=>{i()}).catch(o=>{this.reject(o)}),e.length===0&&i(),this.initialized=!0}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),iy=new _("");function oy(){Ad(()=>{let t="";throw new A(600,t)})}function ry(t){return t.isBoundToModule}var vI=10;var Mt=(()=>{class t{_runningTick=!1;_destroyed=!1;_destroyListeners=[];_views=[];internalErrorHandler=u(xn);afterRenderManager=u(Gl);zonelessEnabled=u(Zr);rootEffectScheduler=u(pl);dirtyFlags=0;tracingSnapshot=null;allTestViews=new Set;autoDetectTestViews=new Set;includeAllTestViews=!1;afterTick=new C;get allViews(){return[...(this.includeAllTestViews?this.allTestViews:this.autoDetectTestViews).keys(),...this._views]}get destroyed(){return this._destroyed}componentTypes=[];components=[];internalPendingTask=u(ji);get isStable(){return this.internalPendingTask.hasPendingTasksObservable.pipe(ve(e=>!e))}constructor(){u(Xt,{optional:!0})}whenStable(){let e;return new Promise(i=>{e=this.isStable.subscribe({next:o=>{o&&i()}})}).finally(()=>{e.unsubscribe()})}_injector=u(Re);_rendererFactory=null;get injector(){return this._injector}bootstrap(e,i){return this.bootstrapImpl(e,i)}bootstrapImpl(e,i,o=F.NULL){return this._injector.get(S).run(()=>{fe(le.BootstrapComponentStart);let s=e instanceof Kl;if(!this._injector.get(Sm).done){let v="";throw new A(405,v)}let l;s?l=e:l=this._injector.get(Xl).resolveComponentFactory(e),this.componentTypes.push(l.componentType);let c=ry(l)?void 0:this._injector.get(Zn),d=i||l.selector,f=l.create(o,[],d,c),p=f.location.nativeElement,m=f.injector.get(Im,null);return m?.registerApplication(p),f.onDestroy(()=>{this.detachView(f.hostView),Jr(this.components,f),m?.unregisterApplication(p)}),this._loadComponent(f),fe(le.BootstrapComponentEnd,f),f})}tick(){this.zonelessEnabled||(this.dirtyFlags|=1),this._tick()}_tick(){fe(le.ChangeDetectionStart),this.tracingSnapshot!==null?this.tracingSnapshot.run($l.CHANGE_DETECTION,this.tickImpl):this.tickImpl()}tickImpl=()=>{if(this._runningTick)throw fe(le.ChangeDetectionEnd),new A(101,!1);let e=O(null);try{this._runningTick=!0,this.synchronize()}finally{this._runningTick=!1,this.tracingSnapshot?.dispose(),this.tracingSnapshot=null,O(e),this.afterTick.next(),fe(le.ChangeDetectionEnd)}};synchronize(){this._rendererFactory===null&&!this._injector.destroyed&&(this._rendererFactory=this._injector.get(Fe,null,{optional:!0}));let e=0;for(;this.dirtyFlags!==0&&e++<vI;){fe(le.ChangeDetectionSyncStart);try{this.synchronizeOnce()}finally{fe(le.ChangeDetectionSyncEnd)}}}synchronizeOnce(){this.dirtyFlags&16&&(this.dirtyFlags&=-17,this.rootEffectScheduler.flush());let e=!1;if(this.dirtyFlags&7){let i=!!(this.dirtyFlags&1);this.dirtyFlags&=-8,this.dirtyFlags|=8;for(let{_lView:o}of this.allViews){if(!i&&!Wr(o))continue;let r=i&&!this.zonelessEnabled?0:1;x_(o,r),e=!0}if(this.dirtyFlags&=-5,this.syncDirtyFlagsWithViews(),this.dirtyFlags&23)return}e||(this._rendererFactory?.begin?.(),this._rendererFactory?.end?.()),this.dirtyFlags&8&&(this.dirtyFlags&=-9,this.afterRenderManager.execute()),this.syncDirtyFlagsWithViews()}syncDirtyFlagsWithViews(){if(this.allViews.some(({_lView:e})=>Wr(e))){this.dirtyFlags|=2;return}else this.dirtyFlags&=-8}attachView(e){let i=e;this._views.push(i),i.attachToAppRef(this)}detachView(e){let i=e;Jr(this._views,i),i.detachFromAppRef()}_loadComponent(e){this.attachView(e.hostView);try{this.tick()}catch(o){this.internalErrorHandler(o)}this.components.push(e),this._injector.get(iy,[]).forEach(o=>o(e))}ngOnDestroy(){if(!this._destroyed)try{this._destroyListeners.forEach(e=>e()),this._views.slice().forEach(e=>e.destroy())}finally{this._destroyed=!0,this._views=[],this._destroyListeners=[]}}onDestroy(e){return this._destroyListeners.push(e),()=>Jr(this._destroyListeners,e)}destroy(){if(this._destroyed)throw new A(406,!1);let e=this._injector;e.destroy&&!e.destroyed&&e.destroy()}get viewCount(){return this._views.length}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function Jr(t,n){let e=t.indexOf(n);e>-1&&t.splice(e,1)}function Z(t,n,e,i){let o=$(),r=Vi();if(Zt(o,r,n)){let s=Ce(),a=ul();Gw(a,o,t,n,e,i)}return Z}var Ff=class{destroy(n){}updateValue(n,e){}swap(n,e){let i=Math.min(n,e),o=Math.max(n,e),r=this.detach(o);if(o-i>1){let s=this.detach(i);this.attach(i,r),this.attach(o,s)}else this.attach(i,r)}move(n,e){this.attach(e,this.detach(n))}};function ef(t,n,e,i,o){return t===e&&Object.is(n,i)?1:Object.is(o(t,n),o(e,i))?-1:0}function _I(t,n,e,i){let o,r,s=0,a=t.length-1,l=void 0;if(Array.isArray(n)){O(i);let c=n.length-1;for(O(null);s<=a&&s<=c;){let d=t.at(s),f=n[s],p=ef(s,d,s,f,e);if(p!==0){p<0&&t.updateValue(s,f),s++;continue}let m=t.at(a),v=n[c],w=ef(a,m,c,v,e);if(w!==0){w<0&&t.updateValue(a,v),a--,c--;continue}let I=e(s,d),T=e(a,m),ye=e(s,f);if(Object.is(ye,T)){let ft=e(c,v);Object.is(ft,I)?(t.swap(s,a),t.updateValue(a,v),c--,a--):t.move(a,s),t.updateValue(s,f),s++;continue}if(o??=new Ol,r??=hv(t,s,a,e),Pf(t,o,s,ye))t.updateValue(s,f),s++,a++;else if(r.has(ye))o.set(I,t.detach(s)),a--;else{let ft=t.create(s,n[s]);t.attach(s,ft),s++,a++}}for(;s<=c;)pv(t,o,e,s,n[s]),s++}else if(n!=null){O(i);let c=n[Symbol.iterator]();O(null);let d=c.next();for(;!d.done&&s<=a;){let f=t.at(s),p=d.value,m=ef(s,f,s,p,e);if(m!==0)m<0&&t.updateValue(s,p),s++,d=c.next();else{o??=new Ol,r??=hv(t,s,a,e);let v=e(s,p);if(Pf(t,o,s,v))t.updateValue(s,p),s++,a++,d=c.next();else if(!r.has(v))t.attach(s,t.create(s,p)),s++,a++,d=c.next();else{let w=e(s,f);o.set(w,t.detach(s)),a--}}}for(;!d.done;)pv(t,o,e,t.length,d.value),d=c.next()}for(;s<=a;)t.destroy(t.detach(a--));o?.forEach(c=>{t.destroy(c)})}function Pf(t,n,e,i){return n!==void 0&&n.has(i)?(t.attach(e,n.get(i)),n.delete(i),!0):!1}function pv(t,n,e,i,o){if(Pf(t,n,i,e(i,o)))t.updateValue(i,o);else{let r=t.create(i,o);t.attach(i,r)}}function hv(t,n,e,i){let o=new Set;for(let r=n;r<=e;r++)o.add(i(r,t.at(r)));return o}var Ol=class{kvMap=new Map;_vMap=void 0;has(n){return this.kvMap.has(n)}delete(n){if(!this.has(n))return!1;let e=this.kvMap.get(n);return this._vMap!==void 0&&this._vMap.has(e)?(this.kvMap.set(n,this._vMap.get(e)),this._vMap.delete(e)):this.kvMap.delete(n),!0}get(n){return this.kvMap.get(n)}set(n,e){if(this.kvMap.has(n)){let i=this.kvMap.get(n);this._vMap===void 0&&(this._vMap=new Map);let o=this._vMap;for(;o.has(i);)i=o.get(i);o.set(i,e)}else this.kvMap.set(n,e)}forEach(n){for(let[e,i]of this.kvMap)if(n(i,e),this._vMap!==void 0){let o=this._vMap;for(;o.has(i);)i=o.get(i),n(i,e)}}};function G(t,n,e,i,o,r,s,a){qi("NgControlFlow");let l=$(),c=Ce(),d=gt(c.consts,r);return Vo(l,c,t,n,e,i,o,d,256,s,a),Tm}function Tm(t,n,e,i,o,r,s,a){qi("NgControlFlow");let l=$(),c=Ce(),d=gt(c.consts,r);return Vo(l,c,t,n,e,i,o,d,512,s,a),Tm}function W(t,n){qi("NgControlFlow");let e=$(),i=Vi(),o=e[i]!==at?e[i]:-1,r=o!==-1?Fl(e,De+o):void 0,s=0;if(Zt(e,i,t)){let a=O(null);try{if(r!==void 0&&k_(r,s),t!==-1){let l=De+t,c=Fl(e,l),d=jf(e[P],l),f=N_(c,d,e),p=us(e,d,n,{dehydratedView:f});fs(c,p,s,Po(d,f))}}finally{O(a)}}else if(r!==void 0){let a=A_(r,s);a!==void 0&&(a[Ne]=n)}}var Lf=class{lContainer;$implicit;$index;constructor(n,e,i){this.lContainer=n,this.$implicit=e,this.$index=i}get $count(){return this.lContainer.length-Te}};function Am(t){return t}var Vf=class{hasEmptyBlock;trackByFn;liveCollection;constructor(n,e,i){this.hasEmptyBlock=n,this.trackByFn=e,this.liveCollection=i}};function dn(t,n,e,i,o,r,s,a,l,c,d,f,p){qi("NgControlFlow");let m=$(),v=Ce(),w=l!==void 0,I=$(),T=a?s.bind(I[nt][Ne]):s,ye=new Vf(w,T);I[De+t]=ye,Vo(m,v,t+1,n,e,i,o,gt(v.consts,r),256),w&&Vo(m,v,t+2,l,c,d,f,gt(v.consts,p),512)}var Bf=class extends Ff{lContainer;hostLView;templateTNode;operationsCounter=void 0;needsIndexUpdate=!1;constructor(n,e,i){super(),this.lContainer=n,this.hostLView=e,this.templateTNode=i}get length(){return this.lContainer.length-Te}at(n){return this.getLView(n)[Ne].$implicit}attach(n,e){let i=e[ki];this.needsIndexUpdate||=n!==this.length,fs(this.lContainer,e,n,Po(this.templateTNode,i)),yI(this.lContainer,n)}detach(n){return this.needsIndexUpdate||=n!==this.length-1,bI(this.lContainer,n),DI(this.lContainer,n)}create(n,e){let i=Al(this.lContainer,this.templateTNode.tView.ssrId);return us(this.hostLView,this.templateTNode,new Lf(this.lContainer,e,n),{dehydratedView:i})}destroy(n){Wl(n[P],n)}updateValue(n,e){this.getLView(n)[Ne].$implicit=e}reset(){this.needsIndexUpdate=!1}updateIndexes(){if(this.needsIndexUpdate)for(let n=0;n<this.length;n++)this.getLView(n)[Ne].$index=n}getLView(n){return CI(this.lContainer,n)}};function un(t){let n=O(null),e=an();try{let i=$(),o=i[P],r=i[e],s=e+1,a=Fl(i,s);if(r.liveCollection===void 0){let c=jf(o,s);r.liveCollection=new Bf(a,i,c)}else r.liveCollection.reset();let l=r.liveCollection;if(_I(l,t,r.trackByFn,n),l.updateIndexes(),r.hasEmptyBlock){let c=Vi(),d=l.length===0;if(Zt(i,c,d)){let f=e+2,p=Fl(i,f);if(d){let m=jf(o,f),v=N_(p,m,i),w=us(i,m,void 0,{dehydratedView:v});fs(p,w,0,Po(m,v))}else o.firstUpdatePass&&hx(p),k_(p,0)}}}finally{O(n)}}function Fl(t,n){return t[n]}function yI(t,n){if(t.length<=Te)return;let e=Te+n,i=t[e],o=i?i[Gn]:void 0;if(i&&o&&o.detachedLeaveAnimationFns&&o.detachedLeaveAnimationFns.length>0){let r=i[Dn];Cw(r,o),zi.delete(i[Cn]),o.detachedLeaveAnimationFns=void 0}}function bI(t,n){if(t.length<=Te)return;let e=Te+n,i=t[e],o=i?i[Gn]:void 0;o&&o.leave&&o.leave.size>0&&(o.detachedLeaveAnimationFns=[])}function DI(t,n){return is(t,n)}function CI(t,n){return A_(t,n)}function jf(t,n){return nl(t,n)}function Q(t,n,e){let i=$(),o=Vi();if(Zt(i,o,n)){let r=Ce(),s=ul();jw(s,i,t,n,i[_e],e)}return Q}function Hf(t,n,e,i,o){hm(n,t,e,o?"class":"style",i)}function h(t,n,e,i){let o=$(),r=o[P],s=t+De,a=r.firstCreatePass?ym(s,o,2,n,fm,rl(),e,i):r.data[s];if(wn(a)){let l=o[Ht].tracingService;if(l&&l.componentCreate){let c=r.data[a.directiveStart+a.componentOffset];return l.componentCreate(j_(c),()=>(gv(t,n,o,a,i),h))}}return gv(t,n,o,a,i),h}function gv(t,n,e,i,o){if(mm(i,e,t,n,sy),So(i)){let r=e[P];Yl(r,e,i),Zf(r,i,e)}o!=null&&ds(e,i)}function g(){let t=Ce(),n=$e(),e=pm(n);return t.firstCreatePass&&bm(t,e),Fu(e)&&Pu(),Nu(),e.classesWithoutHost!=null&&a0(e)&&Hf(t,e,$(),e.classesWithoutHost,!0),e.stylesWithoutHost!=null&&l0(e)&&Hf(t,e,$(),e.stylesWithoutHost,!1),g}function J(t,n,e,i){return h(t,n,e,i),g(),J}function ot(t,n,e,i){let o=$(),r=o[P],s=t+De,a=r.firstCreatePass?Tx(s,r,2,n,e,i):r.data[s];return mm(a,o,t,n,sy),i!=null&&ds(o,a),ot}function _t(){let t=$e(),n=pm(t);return Fu(n)&&Pu(),Nu(),_t}function dt(t,n,e,i){return ot(t,n,e,i),_t(),dt}var sy=(t,n,e,i,o)=>(Yr(!0),t_(n[_e],i,kg()));function km(t,n,e){let i=$(),o=i[P],r=t+De,s=o.firstCreatePass?ym(r,i,8,"ng-container",fm,rl(),n,e):o.data[r];if(mm(s,i,t,"ng-container",EI),So(s)){let a=i[P];Yl(a,i,s),Zf(a,s,i)}return e!=null&&ds(i,s),km}function Rm(){let t=Ce(),n=$e(),e=pm(n);return t.firstCreatePass&&bm(t,e),Rm}function zo(t,n,e){return km(t,n,e),Rm(),zo}var EI=(t,n,e,i,o)=>(Yr(!0),J0(n[_e],""));function Ue(){return $()}function Qt(t,n,e){let i=$(),o=Vi();if(Zt(i,o,n)){let r=Ce(),s=ul();y_(s,i,t,n,i[_e],e)}return Qt}var ms="en-US";var wI=ms;function ay(t){typeof t=="string"&&(wI=t.toLowerCase().replace(/_/g,"-"))}function H(t,n,e){let i=$(),o=Ce(),r=$e();return xI(o,i,i[_e],r,t,n,e),H}function $o(t,n,e){let i=$(),o=Ce(),r=$e();return(r.type&3||e)&&V_(r,o,i,e,i[_e],t,n,El(r,i,n)),$o}function xI(t,n,e,i,o,r,s){let a=!0,l=null;if((i.type&3||s)&&(l??=El(i,n,r),V_(i,t,n,s,e,o,r,l)&&(a=!1)),a){let c=i.outputs?.[o],d=i.hostDirectiveOutputs?.[o];if(d&&d.length)for(let f=0;f<d.length;f+=2){let p=d[f],m=d[f+1];l??=El(i,n,r),lv(i,n,p,m,o,l)}if(c&&c.length)for(let f of c)l??=El(i,n,r),lv(i,n,f,o,o,l)}}function x(t=1){return Ag(t)}function II(t,n){let e=null,i=aw(t);for(let o=0;o<n.length;o++){let r=n[o];if(r==="*"){e=o;continue}if(i===null?a_(t,r,!0):dw(i,r))return o}return e}function Ye(t){let n=$()[nt][tt];if(!n.projection){let e=t?t.length:1,i=n.projection=tg(e,null),o=i.slice(),r=n.child;for(;r!==null;){if(r.type!==128){let s=t?II(r,t):0;s!==null&&(o[s]?o[s].projectionNext=r:i[s]=r,o[s]=r)}r=r.next}}}function me(t,n=0,e,i,o,r){let s=$(),a=Ce(),l=i?t+1:null;l!==null&&Vo(s,a,l,i,o,r,null,e);let c=Ho(a,De+t,16,null,e||null);c.projection===null&&(c.projection=n),Bu();let f=!s[ki]||Ou();s[nt][tt].projection[c.projection]===null&&l!==null?MI(s,a,l):f&&!Vl(c)&&Nw(a,s,c)}function MI(t,n,e){let i=De+e,o=n.data[i],r=t[i],s=Al(r,o.tView.ssrId),a=us(t,o,void 0,{dehydratedView:s});fs(r,a,0,Po(o,s))}function Xn(t,n,e,i){return W_(t,n,e,i),Xn}function Pe(t,n,e){return G_(t,n,e),Pe}function ne(t){let n=$(),e=Ce(),i=ll();qr(i+1);let o=Cm(e,i);if(t.dirty&&ug(n)===((o.metadata.flags&2)===2)){if(o.matches===null)t.reset([]);else{let r=Y_(n,i);t.reset(r,Pv),t.notifyOnChanges()}return!0}return!1}function ie(){return Dm($(),ll())}function ec(t,n,e,i,o){return K_(n,W_(t,e,i,o)),ec}function tc(t,n,e,i){return K_(t,G_(n,e,i)),tc}function nc(t=1){qr(ll()+t)}function fn(t){let n=yg();return Iu(n,De+t)}function _l(t,n){return t<<17|n<<2}function $i(t){return t>>17&32767}function SI(t){return(t&2)==2}function TI(t,n){return t&131071|n<<17}function Uf(t){return t|2}function Bo(t){return(t&131068)>>2}function tf(t,n){return t&-131069|n<<2}function AI(t){return(t&1)===1}function zf(t){return t|1}function kI(t,n,e,i,o,r){let s=r?n.classBindings:n.styleBindings,a=$i(s),l=Bo(s);t[i]=e;let c=!1,d;if(Array.isArray(e)){let f=e;d=f[1],(d===null||Eo(f,d)>0)&&(c=!0)}else d=e;if(o)if(l!==0){let p=$i(t[a+1]);t[i+1]=_l(p,a),p!==0&&(t[p+1]=tf(t[p+1],i)),t[a+1]=TI(t[a+1],i)}else t[i+1]=_l(a,0),a!==0&&(t[a+1]=tf(t[a+1],i)),a=i;else t[i+1]=_l(l,0),a===0?a=i:t[l+1]=tf(t[l+1],i),l=i;c&&(t[i+1]=Uf(t[i+1])),vv(t,d,i,!0),vv(t,d,i,!1),RI(n,d,t,i,r),s=_l(a,l),r?n.classBindings=s:n.styleBindings=s}function RI(t,n,e,i,o){let r=o?t.residualClasses:t.residualStyles;r!=null&&typeof n=="string"&&Eo(r,n)>=0&&(e[i+1]=zf(e[i+1]))}function vv(t,n,e,i){let o=t[e+1],r=n===null,s=i?$i(o):Bo(o),a=!1;for(;s!==0&&(a===!1||r);){let l=t[s],c=t[s+1];NI(l,n)&&(a=!0,t[s+1]=i?zf(c):Uf(c)),s=i?$i(c):Bo(c)}a&&(t[e+1]=i?Uf(o):zf(o))}function NI(t,n){return t===null||n==null||(Array.isArray(t)?t[1]:t)===n?!0:Array.isArray(t)&&typeof n=="string"?Eo(t,n)>=0:!1}var qt={textEnd:0,key:0,keyEnd:0,value:0,valueEnd:0};function OI(t){return t.substring(qt.key,qt.keyEnd)}function FI(t){return PI(t),ly(t,cy(t,0,qt.textEnd))}function ly(t,n){let e=qt.textEnd;return e===n?-1:(n=qt.keyEnd=LI(t,qt.key=n,e),cy(t,n,e))}function PI(t){qt.key=0,qt.keyEnd=0,qt.value=0,qt.valueEnd=0,qt.textEnd=t.length}function cy(t,n,e){for(;n<e&&t.charCodeAt(n)<=32;)n++;return n}function LI(t,n,e){for(;n<e&&t.charCodeAt(n)>32;)n++;return n}function St(t,n,e){return dy(t,n,e,!1),St}function V(t,n){return dy(t,n,null,!0),V}function Jt(t){BI(GI,VI,t,!0)}function VI(t,n){for(let e=FI(n);e>=0;e=ly(n,e))Ja(t,OI(n),!0)}function dy(t,n,e,i){let o=$(),r=Ce(),s=sl(2);if(r.firstUpdatePass&&fy(r,t,s,i),n!==at&&Zt(o,s,n)){let a=r.data[an()];my(r,a,o,o[_e],t,o[s+1]=qI(n,e),i,s)}}function BI(t,n,e,i){let o=Ce(),r=sl(2);o.firstUpdatePass&&fy(o,null,r,i);let s=$();if(e!==at&&Zt(s,r,e)){let a=o.data[an()];if(py(a,i)&&!uy(o,r)){let l=i?a.classesWithoutHost:a.stylesWithoutHost;l!==null&&(e=qa(l,e||"")),Hf(o,a,s,e,i)}else WI(o,a,s,s[_e],s[r+1],s[r+1]=$I(t,n,e),i,r)}}function uy(t,n){return n>=t.expandoStartIndex}function fy(t,n,e,i){let o=t.data;if(o[e+1]===null){let r=o[an()],s=uy(t,e);py(r,i)&&n===null&&!s&&(n=!1),n=jI(o,r,n,i),kI(o,r,n,e,s,i)}}function jI(t,n,e,i){let o=Ig(t),r=i?n.residualClasses:n.residualStyles;if(o===null)(i?n.classBindings:n.styleBindings)===0&&(e=nf(null,t,n,e,i),e=rs(e,n.attrs,i),r=null);else{let s=n.directiveStylingLast;if(s===-1||t[s]!==o)if(e=nf(o,t,n,e,i),r===null){let l=HI(t,n,i);l!==void 0&&Array.isArray(l)&&(l=nf(null,t,n,l[1],i),l=rs(l,n.attrs,i),UI(t,n,i,l))}else r=zI(t,n,i)}return r!==void 0&&(i?n.residualClasses=r:n.residualStyles=r),e}function HI(t,n,e){let i=e?n.classBindings:n.styleBindings;if(Bo(i)!==0)return t[$i(i)]}function UI(t,n,e,i){let o=e?n.classBindings:n.styleBindings;t[$i(o)]=i}function zI(t,n,e){let i,o=n.directiveEnd;for(let r=1+n.directiveStylingLast;r<o;r++){let s=t[r].hostAttrs;i=rs(i,s,e)}return rs(i,n.attrs,e)}function nf(t,n,e,i,o){let r=null,s=e.directiveEnd,a=e.directiveStylingLast;for(a===-1?a=e.directiveStart:a++;a<s&&(r=n[a],i=rs(i,r.hostAttrs,o),r!==t);)a++;return t!==null&&(e.directiveStylingLast=a),i}function rs(t,n,e){let i=e?1:2,o=-1;if(n!==null)for(let r=0;r<n.length;r++){let s=n[r];typeof s=="number"?o=s:o===i&&(Array.isArray(t)||(t=t===void 0?[]:["",t]),Ja(t,s,e?!0:n[++r]))}return t===void 0?null:t}function $I(t,n,e){if(e==null||e==="")return Xe;let i=[],o=Kt(e);if(Array.isArray(o))for(let r=0;r<o.length;r++)t(i,o[r],!0);else if(o instanceof Set)for(let r of o)t(i,r,!0);else if(typeof o=="object")for(let r in o)o.hasOwnProperty(r)&&t(i,r,o[r]);else typeof o=="string"&&n(i,o);return i}function GI(t,n,e){let i=String(n);i!==""&&!i.includes(" ")&&Ja(t,i,e)}function WI(t,n,e,i,o,r,s,a){o===at&&(o=Xe);let l=0,c=0,d=0<o.length?o[0]:null,f=0<r.length?r[0]:null;for(;d!==null||f!==null;){let p=l<o.length?o[l+1]:void 0,m=c<r.length?r[c+1]:void 0,v=null,w;d===f?(l+=2,c+=2,p!==m&&(v=f,w=m)):f===null||d!==null&&d<f?(l+=2,v=d):(c+=2,v=f,w=m),v!==null&&my(t,n,e,i,v,w,s,a),d=l<o.length?o[l]:null,f=c<r.length?r[c]:null}}function my(t,n,e,i,o,r,s,a){if(!(n.type&3))return;let l=t.data,c=l[a+1],d=AI(c)?_v(l,n,e,o,Bo(c),s):void 0;if(!Pl(d)){Pl(r)||SI(c)&&(r=_v(l,null,e,o,a,s));let f=xu(an(),e);Fw(i,s,f,o,r)}}function _v(t,n,e,i,o,r){let s=n===null,a;for(;o>0;){let l=t[o],c=Array.isArray(l),d=c?l[1]:l,f=d===null,p=e[o+1];p===at&&(p=f?Xe:void 0);let m=f?el(p,i):d===i?p:void 0;if(c&&!Pl(m)&&(m=el(l,i)),Pl(m)&&(a=m,s))return a;let v=t[o+1];o=s?$i(v):Bo(v)}if(n!==null){let l=r?n.residualClasses:n.residualStyles;l!=null&&(a=el(l,i))}return a}function Pl(t){return t!==void 0}function qI(t,n){return t==null||t===""||(typeof n=="string"?t=t+n:typeof t=="object"&&(t=Wa(Kt(t)))),t}function py(t,n){return(t.flags&(n?8:16))!==0}function E(t,n=""){let e=$(),i=Ce(),o=t+De,r=i.firstCreatePass?Ho(i,o,1,n,null):i.data[o],s=YI(i,e,r,n);e[o]=s,ml()&&dm(i,e,s,r),Ao(r,!1)}var YI=(t,n,e,i)=>(Yr(!0),X0(n[_e],i));function ZI(t,n,e,i=""){return Zt(t,Vi(),e)?n+Si(e)+i:at}function KI(t,n,e,i,o,r=""){let s=Dg(),a=kx(t,s,e,o);return sl(2),a?n+Si(e)+i+Si(o)+r:at}function ue(t){return Tt("",t),ue}function Tt(t,n,e){let i=$(),o=ZI(i,t,n,e);return o!==at&&hy(i,an(),o),Tt}function ic(t,n,e,i,o){let r=$(),s=KI(r,t,n,e,i,o);return s!==at&&hy(r,an(),s),ic}function hy(t,n,e){let i=xu(n,t);Q0(t[_e],i,e)}function yv(t,n,e){let i=Ce();i.firstCreatePass&&gy(n,i.data,i.blueprint,zt(t),e)}function gy(t,n,e,i,o){if(t=Be(t),Array.isArray(t))for(let r=0;r<t.length;r++)gy(t[r],n,e,i,o);else{let r=Ce(),s=$(),a=$e(),l=xi(t)?t:Be(t.provide),c=yu(t),d=a.providerIndexes&1048575,f=a.directiveStart,p=a.providerIndexes>>20;if(xi(t)||!t.multi){let m=new Ui(c,o,Y,null),v=rf(l,n,o?d:d+p,f);v===-1?(af(Sl(a,s),r,l),of(r,t,n.length),n.push(l),a.directiveStart++,a.directiveEnd++,o&&(a.providerIndexes+=1048576),e.push(m),s.push(m)):(e[v]=m,s[v]=m)}else{let m=rf(l,n,d+p,f),v=rf(l,n,d,d+p),w=m>=0&&e[m],I=v>=0&&e[v];if(o&&!I||!o&&!w){af(Sl(a,s),r,l);let T=JI(o?QI:XI,e.length,o,i,c,t);!o&&I&&(e[v].providerFactory=T),of(r,t,n.length,0),n.push(l),a.directiveStart++,a.directiveEnd++,o&&(a.providerIndexes+=1048576),e.push(T),s.push(T)}else{let T=vy(e[o?v:m],c,!o&&i);of(r,t,m>-1?m:v,T)}!o&&i&&I&&e[v].componentProviders++}}}function of(t,n,e,i){let o=xi(n),r=ag(n);if(o||r){let l=(r?Be(n.useClass):n).prototype.ngOnDestroy;if(l){let c=t.destroyHooks||(t.destroyHooks=[]);if(!o&&n.multi){let d=c.indexOf(e);d===-1?c.push(e,[i,l]):c[d+1].push(i,l)}else c.push(e,l)}}}function vy(t,n,e){return e&&t.componentProviders++,t.multi.push(n)-1}function rf(t,n,e,i){for(let o=e;o<i;o++)if(n[o]===t)return o;return-1}function XI(t,n,e,i,o){return $f(this.multi,[])}function QI(t,n,e,i,o){let r=this.multi,s;if(this.providerFactory){let a=this.providerFactory.componentProviders,l=es(i,i[P],this.providerFactory.index,o);s=l.slice(0,a),$f(r,s);for(let c=a;c<l.length;c++)s.push(l[c])}else s=[],$f(r,s);return s}function $f(t,n){for(let e=0;e<t.length;e++){let i=t[e];n.push(i())}return n}function JI(t,n,e,i,o,r){let s=new Ui(t,e,Y,null);return s.multi=[],s.index=n,s.componentProviders=0,vy(s,o,i&&!e),s}function Ze(t,n){return e=>{e.providersResolver=(i,o)=>yv(i,o?o(t):t,!1),n&&(e.viewProvidersResolver=(i,o)=>yv(i,o?o(n):n,!0))}}function eM(t,n){let e=t[n];return e===at?void 0:e}function tM(t,n,e,i,o,r){let s=n+e;return Zt(t,s,o)?Ax(t,s+1,r?i.call(r,o):i(o)):eM(t,s+1)}function Nm(t,n){let e=Ce(),i,o=t+De;e.firstCreatePass?(i=nM(n,e.pipeRegistry),e.data[o]=i,i.onDestroy&&(e.destroyHooks??=[]).push(o,i.onDestroy)):i=e.data[o];let r=i.factory||(i.factory=Vn(i.type,!0)),s,a=et(Y);try{let l=Ml(!1),c=r();return Ml(l),Mu(e,$(),o,c),c}finally{et(a)}}function nM(t,n){if(n)for(let e=n.length-1;e>=0;e--){let i=n[e];if(t===i.name)return i}}function Om(t,n,e){let i=t+De,o=$(),r=Iu(o,i);return iM(o,i)?tM(o,bg(),n,r.transform,e,r):r.transform(e)}function iM(t,n){return t[P].data[n].pure}function ps(t,n){return Zl(t,n)}var _y=(()=>{class t{applicationErrorHandler=u(xn);appRef=u(Mt);taskService=u(ji);ngZone=u(S);zonelessEnabled=u(Zr);tracing=u(Xt,{optional:!0});zoneIsDefined=typeof Zone<"u"&&!!Zone.root.run;schedulerTickApplyArgs=[{data:{__scheduler_tick__:!0}}];subscriptions=new de;angularZoneId=this.zoneIsDefined?this.ngZone._inner?.get(Hr):null;scheduleInRootZone=!this.zonelessEnabled&&this.zoneIsDefined&&(u(Yu,{optional:!0})??!1);cancelScheduledCallback=null;useMicrotaskScheduler=!1;runningTick=!1;pendingRenderTaskId=null;constructor(){this.subscriptions.add(this.appRef.afterTick.subscribe(()=>{let e=this.taskService.add();if(!this.runningTick&&(this.cleanup(),!this.zonelessEnabled||this.appRef.includeAllTestViews)){this.taskService.remove(e);return}this.switchToMicrotaskScheduler(),this.taskService.remove(e)})),this.subscriptions.add(this.ngZone.onUnstable.subscribe(()=>{this.runningTick||this.cleanup()}))}switchToMicrotaskScheduler(){this.ngZone.runOutsideAngular(()=>{let e=this.taskService.add();this.useMicrotaskScheduler=!0,queueMicrotask(()=>{this.useMicrotaskScheduler=!1,this.taskService.remove(e)})})}notify(e){if(!this.zonelessEnabled&&e===5)return;switch(e){case 0:{this.appRef.dirtyFlags|=2;break}case 3:case 2:case 4:case 5:case 1:{this.appRef.dirtyFlags|=4;break}case 6:{this.appRef.dirtyFlags|=2;break}case 12:{this.appRef.dirtyFlags|=16;break}case 13:{this.appRef.dirtyFlags|=2;break}case 11:break;default:this.appRef.dirtyFlags|=8}if(this.appRef.tracingSnapshot=this.tracing?.snapshot(this.appRef.tracingSnapshot)??null,!this.shouldScheduleTick())return;let i=this.useMicrotaskScheduler?Pg:zu;this.pendingRenderTaskId=this.taskService.add(),this.scheduleInRootZone?this.cancelScheduledCallback=Zone.root.run(()=>i(()=>this.tick())):this.cancelScheduledCallback=this.ngZone.runOutsideAngular(()=>i(()=>this.tick()))}shouldScheduleTick(){return!(this.appRef.destroyed||this.pendingRenderTaskId!==null||this.runningTick||this.appRef._runningTick||!this.zonelessEnabled&&this.zoneIsDefined&&Zone.current.get(Hr+this.angularZoneId))}tick(){if(this.runningTick||this.appRef.destroyed)return;if(this.appRef.dirtyFlags===0){this.cleanup();return}!this.zonelessEnabled&&this.appRef.dirtyFlags&7&&(this.appRef.dirtyFlags|=1);let e=this.taskService.add();try{this.ngZone.run(()=>{this.runningTick=!0,this.appRef._tick()},void 0,this.schedulerTickApplyArgs)}catch(i){this.applicationErrorHandler(i)}finally{this.taskService.remove(e),this.cleanup()}}ngOnDestroy(){this.subscriptions.unsubscribe(),this.cleanup()}cleanup(){if(this.runningTick=!1,this.cancelScheduledCallback?.(),this.cancelScheduledCallback=null,this.pendingRenderTaskId!==null){let e=this.pendingRenderTaskId;this.pendingRenderTaskId=null,this.taskService.remove(e)}}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function yy(){return[{provide:rn,useExisting:_y},{provide:S,useClass:Ur},{provide:Zr,useValue:!0}]}function oM(){return typeof $localize<"u"&&$localize.locale||ms}var oc=new _("",{factory:()=>u(oc,{optional:!0,skipSelf:!0})||oM()});var rc=class{destroyed=!1;listeners=null;errorHandler=u(Qe,{optional:!0});destroyRef=u(vt);constructor(){this.destroyRef.onDestroy(()=>{this.destroyed=!0,this.listeners=null})}subscribe(n){if(this.destroyed)throw new A(953,!1);return(this.listeners??=[]).push(n),{unsubscribe:()=>{let e=this.listeners?.indexOf(n);e!==void 0&&e!==-1&&this.listeners?.splice(e,1)}}}emit(n){if(this.destroyed){console.warn(Hn(953,!1));return}if(this.listeners===null)return;let e=O(null);try{for(let i of this.listeners)try{i(n)}catch(o){this.errorHandler?.handleError(o)}}finally{O(e)}}};function At(t){return zh(t)}function Ie(t,n){return wr(t,n?.equal)}var wy=Symbol("InputSignalNode#UNSET"),_M=ee(D({},xr),{transformFn:void 0,applyValueToInputSignal(t,n){mo(t,n)}});function xy(t,n){let e=Object.create(_M);e.value=t,e.transformFn=n?.transform;function i(){if(fi(e),e.value===wy){let o=null;throw new A(-950,o)}return e.value}return i[Le]=e,i}var Go=class{attributeName;constructor(n){this.attributeName=n}__NG_ELEMENT_ID__=()=>Wf(this.attributeName);toString(){return`HostAttributeToken ${this.attributeName}`}};function Iy(t){return new rc}function by(t,n){return xy(t,n)}function yM(t){return xy(wy,t)}var kt=(by.required=yM,by);function Dy(t,n){return Em(n)}function bM(t,n){return wm(n)}var gs=(Dy.required=bM,Dy);function Cy(t,n){return Em(n)}function DM(t,n){return wm(n)}var My=(Cy.required=DM,Cy);var Pm=new _(""),CM=new _("");function hs(t){return!t.moduleRef}function EM(t){let n=hs(t)?t.r3Injector:t.moduleRef.injector,e=n.get(S);return e.run(()=>{hs(t)?t.r3Injector.resolveInjectorInitializers():t.moduleRef.resolveInjectorInitializers();let i=n.get(xn),o;if(e.runOutsideAngular(()=>{o=e.onError.subscribe({next:i})}),hs(t)){let r=()=>n.destroy(),s=t.platformInjector.get(Pm);s.add(r),n.onDestroy(()=>{o.unsubscribe(),s.delete(r)})}else{let r=()=>t.moduleRef.destroy(),s=t.platformInjector.get(Pm);s.add(r),t.moduleRef.onDestroy(()=>{Jr(t.allPlatformModules,t.moduleRef),o.unsubscribe(),s.delete(r)})}return xM(i,e,()=>{let r=n.get(ji),s=r.add(),a=n.get(Sm);return a.runInitializers(),a.donePromise.then(()=>{let l=n.get(oc,ms);if(ay(l||ms),!n.get(CM,!0))return hs(t)?n.get(Mt):(t.allPlatformModules.push(t.moduleRef),t.moduleRef);if(hs(t)){let d=n.get(Mt);return t.rootComponent!==void 0&&d.bootstrap(t.rootComponent),d}else return wM?.(t.moduleRef,t.allPlatformModules),t.moduleRef}).finally(()=>{r.remove(s)})})})}var wM;function xM(t,n,e){try{let i=e();return Uo(i)?i.catch(o=>{throw n.runOutsideAngular(()=>t(o)),o}):i}catch(i){throw n.runOutsideAngular(()=>t(i)),i}}var sc=null;function IM(t=[],n){return F.create({name:n,providers:[{provide:$r,useValue:"platform"},{provide:Pm,useValue:new Set([()=>sc=null])},...t]})}function MM(t=[]){if(sc)return sc;let n=IM(t);return sc=n,oy(),SM(n),n}function SM(t){let n=t.get(Ll,null);xo(t,()=>{n?.forEach(e=>e())})}var TM=1e4;var C$=TM-1e3;var We=(()=>{class t{static __NG_ELEMENT_ID__=AM}return t})();function AM(t){return kM($e(),$(),(t&16)===16)}function kM(t,n,e){if(wn(t)&&!e){let i=wt(t.index,n);return new Yn(i,i)}else if(t.type&175){let i=n[nt];return new Yn(i,n)}return null}function Sy(t){let{rootComponent:n,appProviders:e,platformProviders:i,platformRef:o}=t;fe(le.BootstrapApplicationStart);try{let r=o?.injector??MM(i),s=[yy(),Vg,...e||[]],a=new os({providers:s,parent:r,debugName:"",runEnvironmentInitializers:!1});return EM({r3Injector:a.injector,platformInjector:r,rootComponent:n})}catch(r){return Promise.reject(r)}finally{fe(le.BootstrapApplicationEnd)}}function ce(t){return typeof t=="boolean"?t:t!=null&&t!=="false"}function qo(t,n=NaN){return!isNaN(parseFloat(t))&&!isNaN(Number(t))?Number(t):n}var Fm=Symbol("NOT_SET"),Ty=new Set,RM=ee(D({},xr),{kind:"afterRenderEffectPhase",consumerIsAlwaysLive:!0,consumerAllowSignalWrites:!0,value:Fm,cleanup:null,consumerMarkedDirty(){if(this.sequence.impl.executing){if(this.sequence.lastPhase===null||this.sequence.lastPhase<this.phase)return;this.sequence.erroredOrDestroyed=!0}this.sequence.scheduler.notify(7)},phaseFn(t){if(this.sequence.lastPhase=this.phase,!this.dirty)return this.signal;if(this.dirty=!1,this.value!==Fm&&!uo(this))return this.signal;try{for(let o of this.cleanup??Ty)o()}finally{this.cleanup?.clear()}let n=[];t!==void 0&&n.push(t),n.push(this.registerCleanupFn);let e=Fn(this),i;try{i=this.userFn.apply(null,n)}finally{mi(this,e)}return(this.value===Fm||!this.equal(this.value,i))&&(this.value=i,this.version++),this.signal}}),Lm=class extends ts{scheduler;lastPhase=null;nodes=[void 0,void 0,void 0,void 0];onDestroyFns=null;constructor(n,e,i,o,r,s=null){super(n,[void 0,void 0,void 0,void 0],i,!1,r.get(vt),s),this.scheduler=o;for(let a of am){let l=e[a];if(l===void 0)continue;let c=Object.create(RM);c.sequence=this,c.phase=a,c.userFn=l,c.dirty=!0,c.signal=()=>(fi(c),c.value),c.signal[Le]=c,c.registerCleanupFn=d=>(c.cleanup??=new Set).add(d),this.nodes[a]=c,this.hooks[a]=d=>c.phaseFn(d)}}afterRun(){super.afterRun(),this.lastPhase=null}destroy(){if(this.onDestroyFns!==null)for(let n of this.onDestroyFns)n();super.destroy();for(let n of this.nodes)if(n)try{for(let e of n.cleanup??Ty)e()}finally{Pn(n)}}};function Ay(t,n){let e=n?.injector??u(F),i=e.get(rn),o=e.get(Gl),r=e.get(Xt,null,{optional:!0});o.impl??=e.get(lm);let s=t;typeof s=="function"&&(s={mixedReadWrite:t});let a=e.get(ko,null,{optional:!0}),l=new Lm(o.impl,[s.earlyRead,s.write,s.mixedReadWrite,s.read],a?.view,i,e,r?.snapshot(null));return o.impl.register(l),l}function ac(t,n){let e=zn(t),i=n.elementInjector||wo();return new Lo(e).create(i,n.projectableNodes,n.hostElement,n.environmentInjector,n.directives,n.bindings)}var ky=null;function Rt(){return ky}function Vm(t){ky??=t}var vs=class{},Yo=(()=>{class t{historyGo(e){throw new Error("")}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:()=>u(Ry),providedIn:"platform"})}return t})();var Ry=(()=>{class t extends Yo{_location;_history;_doc=u(k);constructor(){super(),this._location=window.location,this._history=window.history}getBaseHrefFromDOM(){return Rt().getBaseHref(this._doc)}onPopState(e){let i=Rt().getGlobalEventTarget(this._doc,"window");return i.addEventListener("popstate",e,!1),()=>i.removeEventListener("popstate",e)}onHashChange(e){let i=Rt().getGlobalEventTarget(this._doc,"window");return i.addEventListener("hashchange",e,!1),()=>i.removeEventListener("hashchange",e)}get href(){return this._location.href}get protocol(){return this._location.protocol}get hostname(){return this._location.hostname}get port(){return this._location.port}get pathname(){return this._location.pathname}get search(){return this._location.search}get hash(){return this._location.hash}set pathname(e){this._location.pathname=e}pushState(e,i,o){this._history.pushState(e,i,o)}replaceState(e,i,o){this._history.replaceState(e,i,o)}forward(){this._history.forward()}back(){this._history.back()}historyGo(e=0){this._history.go(e)}getState(){return this._history.state}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:()=>new t,providedIn:"platform"})}return t})();function Fy(t,n){return t?n?t.endsWith("/")?n.startsWith("/")?t+n.slice(1):t+n:n.startsWith("/")?t+n:`${t}/${n}`:t:n}function Ny(t){let n=t.search(/#|\?|$/);return t[n-1]==="/"?t.slice(0,n-1)+t.slice(n):t}function Qn(t){return t&&t[0]!=="?"?`?${t}`:t}var lc=(()=>{class t{historyGo(e){throw new Error("")}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:()=>u(OM),providedIn:"root"})}return t})(),NM=new _(""),OM=(()=>{class t extends lc{_platformLocation;_baseHref;_removeListenerFns=[];constructor(e,i){super(),this._platformLocation=e,this._baseHref=i??this._platformLocation.getBaseHrefFromDOM()??u(k).location?.origin??""}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(e){this._removeListenerFns.push(this._platformLocation.onPopState(e),this._platformLocation.onHashChange(e))}getBaseHref(){return this._baseHref}prepareExternalUrl(e){return Fy(this._baseHref,e)}path(e=!1){let i=this._platformLocation.pathname+Qn(this._platformLocation.search),o=this._platformLocation.hash;return o&&e?`${i}${o}`:i}pushState(e,i,o,r){let s=this.prepareExternalUrl(o+Qn(r));this._platformLocation.pushState(e,i,s)}replaceState(e,i,o,r){let s=this.prepareExternalUrl(o+Qn(r));this._platformLocation.replaceState(e,i,s)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(e=0){this._platformLocation.historyGo?.(e)}static \u0275fac=function(i){return new(i||t)(M(Yo),M(NM,8))};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var cc=(()=>{class t{_subject=new C;_basePath;_locationStrategy;_urlChangeListeners=[];_urlChangeSubscription=null;constructor(e){this._locationStrategy=e;let i=this._locationStrategy.getBaseHref();this._basePath=LM(Ny(Oy(i))),this._locationStrategy.onPopState(o=>{this._subject.next({url:this.path(!0),pop:!0,state:o.state,type:o.type})})}ngOnDestroy(){this._urlChangeSubscription?.unsubscribe(),this._urlChangeListeners=[]}path(e=!1){return this.normalize(this._locationStrategy.path(e))}getState(){return this._locationStrategy.getState()}isCurrentPathEqualTo(e,i=""){return this.path()==this.normalize(e+Qn(i))}normalize(e){return t.stripTrailingSlash(PM(this._basePath,Oy(e)))}prepareExternalUrl(e){return e&&e[0]!=="/"&&(e="/"+e),this._locationStrategy.prepareExternalUrl(e)}go(e,i="",o=null){this._locationStrategy.pushState(o,"",e,i),this._notifyUrlChangeListeners(this.prepareExternalUrl(e+Qn(i)),o)}replaceState(e,i="",o=null){this._locationStrategy.replaceState(o,"",e,i),this._notifyUrlChangeListeners(this.prepareExternalUrl(e+Qn(i)),o)}forward(){this._locationStrategy.forward()}back(){this._locationStrategy.back()}historyGo(e=0){this._locationStrategy.historyGo?.(e)}onUrlChange(e){return this._urlChangeListeners.push(e),this._urlChangeSubscription??=this.subscribe(i=>{this._notifyUrlChangeListeners(i.url,i.state)}),()=>{let i=this._urlChangeListeners.indexOf(e);this._urlChangeListeners.splice(i,1),this._urlChangeListeners.length===0&&(this._urlChangeSubscription?.unsubscribe(),this._urlChangeSubscription=null)}}_notifyUrlChangeListeners(e="",i){this._urlChangeListeners.forEach(o=>o(e,i))}subscribe(e,i,o){return this._subject.subscribe({next:e,error:i??void 0,complete:o??void 0})}static normalizeQueryParams=Qn;static joinWithSlash=Fy;static stripTrailingSlash=Ny;static \u0275fac=function(i){return new(i||t)(M(lc))};static \u0275prov=b({token:t,factory:()=>FM(),providedIn:"root"})}return t})();function FM(){return new cc(M(lc))}function PM(t,n){if(!t||!n.startsWith(t))return n;let e=n.substring(t.length);return e===""||["/",";","?","#"].includes(e[0])?e:n}function Oy(t){return t.replace(/\/index.html$/,"")}function LM(t){if(new RegExp("^(https?:)?//").test(t)){let[,e]=t.split(/\/\/[^\/]+/);return e}return t}var _s=(()=>{class t{_viewContainerRef;_viewRef=null;ngTemplateOutletContext=null;ngTemplateOutlet=null;ngTemplateOutletInjector=null;injector=u(F);constructor(e){this._viewContainerRef=e}ngOnChanges(e){if(this._shouldRecreateView(e)){let i=this._viewContainerRef;if(this._viewRef&&i.remove(i.indexOf(this._viewRef)),!this.ngTemplateOutlet){this._viewRef=null;return}let o=this._createContextForwardProxy();this._viewRef=i.createEmbeddedView(this.ngTemplateOutlet,o,{injector:this._getInjector()})}}_getInjector(){return this.ngTemplateOutletInjector==="outlet"?this.injector:this.ngTemplateOutletInjector??void 0}_shouldRecreateView(e){return!!e.ngTemplateOutlet||!!e.ngTemplateOutletInjector}_createContextForwardProxy(){return new Proxy({},{set:(e,i,o)=>this.ngTemplateOutletContext?Reflect.set(this.ngTemplateOutletContext,i,o):!1,get:(e,i,o)=>{if(this.ngTemplateOutletContext)return Reflect.get(this.ngTemplateOutletContext,i,o)}})}static \u0275fac=function(i){return new(i||t)(Y(lt))};static \u0275dir=L({type:t,selectors:[["","ngTemplateOutlet",""]],inputs:{ngTemplateOutletContext:"ngTemplateOutletContext",ngTemplateOutlet:"ngTemplateOutlet",ngTemplateOutletInjector:"ngTemplateOutletInjector"},features:[xt]})}return t})();function ys(t,n){n=encodeURIComponent(n);for(let e of t.split(";")){let i=e.indexOf("="),[o,r]=i==-1?[e,""]:[e.slice(0,i),e.slice(i+1)];if(o.trim()===n)return decodeURIComponent(r)}return null}var Zi=class{};var Bm="browser";function Py(t){return t===Bm}var bs=class{_doc;constructor(n){this._doc=n}manager},dc=(()=>{class t extends bs{constructor(e){super(e)}supports(e){return!0}addEventListener(e,i,o,r){return e.addEventListener(i,o,r),()=>this.removeEventListener(e,i,o,r)}removeEventListener(e,i,o,r){return e.removeEventListener(i,o,r)}static \u0275fac=function(i){return new(i||t)(M(k))};static \u0275prov=b({token:t,factory:t.\u0275fac})}return t})(),mc=new _(""),zm=(()=>{class t{_zone;_plugins;_eventNameToPlugin=new Map;constructor(e,i){this._zone=i,e.forEach(s=>{s.manager=this});let o=e.filter(s=>!(s instanceof dc));this._plugins=o.slice().reverse();let r=e.find(s=>s instanceof dc);r&&this._plugins.push(r)}addEventListener(e,i,o,r){return this._findPluginFor(i).addEventListener(e,i,o,r)}getZone(){return this._zone}_findPluginFor(e){let i=this._eventNameToPlugin.get(e);if(i)return i;if(i=this._plugins.find(r=>r.supports(e)),!i)throw new A(5101,!1);return this._eventNameToPlugin.set(e,i),i}static \u0275fac=function(i){return new(i||t)(M(mc),M(S))};static \u0275prov=b({token:t,factory:t.\u0275fac})}return t})(),jm="ng-app-id";function Ly(t){for(let n of t)n.remove()}function Vy(t,n){let e=n.createElement("style");return e.textContent=t,e}function HM(t,n,e,i){let o=t.head?.querySelectorAll(`style[${jm}="${n}"],link[${jm}="${n}"]`);if(o)for(let r of o)r.removeAttribute(jm),r instanceof HTMLLinkElement?i.set(r.href.slice(r.href.lastIndexOf("/")+1),{usage:0,elements:[r]}):r.textContent&&e.set(r.textContent,{usage:0,elements:[r]})}function Um(t,n){let e=n.createElement("link");return e.setAttribute("rel","stylesheet"),e.setAttribute("href",t),e}var $m=(()=>{class t{doc;appId;nonce;inline=new Map;external=new Map;hosts=new Set;constructor(e,i,o,r={}){this.doc=e,this.appId=i,this.nonce=o,HM(e,i,this.inline,this.external),this.hosts.add(e.head)}addStyles(e,i){for(let o of e)this.addUsage(o,this.inline,Vy);i?.forEach(o=>this.addUsage(o,this.external,Um))}removeStyles(e,i){for(let o of e)this.removeUsage(o,this.inline);i?.forEach(o=>this.removeUsage(o,this.external))}addUsage(e,i,o){let r=i.get(e);r?r.usage++:i.set(e,{usage:1,elements:[...this.hosts].map(s=>this.addElement(s,o(e,this.doc)))})}removeUsage(e,i){let o=i.get(e);o&&(o.usage--,o.usage<=0&&(Ly(o.elements),i.delete(e)))}ngOnDestroy(){for(let[,{elements:e}]of[...this.inline,...this.external])Ly(e);this.hosts.clear()}addHost(e){this.hosts.add(e);for(let[i,{elements:o}]of this.inline)o.push(this.addElement(e,Vy(i,this.doc)));for(let[i,{elements:o}]of this.external)o.push(this.addElement(e,Um(i,this.doc)))}removeHost(e){this.hosts.delete(e)}addElement(e,i){return this.nonce&&i.setAttribute("nonce",this.nonce),e.appendChild(i)}static \u0275fac=function(i){return new(i||t)(M(k),M(Kn),M(Wi,8),M(Gi))};static \u0275prov=b({token:t,factory:t.\u0275fac})}return t})(),Hm={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",math:"http://www.w3.org/1998/Math/MathML"},Gm=/%COMP%/g;var jy="%COMP%",UM=`_nghost-${jy}`,zM=`_ngcontent-${jy}`,$M=!0,GM=new _("",{factory:()=>$M});function WM(t){return zM.replace(Gm,t)}function qM(t){return UM.replace(Gm,t)}function Hy(t,n){return n.map(e=>e.replace(Gm,t))}var Wm=(()=>{class t{eventManager;sharedStylesHost;appId;removeStylesOnCompDestroy;doc;ngZone;nonce;tracingService;rendererByCompId=new Map;defaultRenderer;constructor(e,i,o,r,s,a,l=null,c=null){this.eventManager=e,this.sharedStylesHost=i,this.appId=o,this.removeStylesOnCompDestroy=r,this.doc=s,this.ngZone=a,this.nonce=l,this.tracingService=c,this.defaultRenderer=new Ds(e,s,a,this.tracingService)}createRenderer(e,i){if(!e||!i)return this.defaultRenderer;let o=this.getOrCreateRenderer(e,i);return o instanceof fc?o.applyToHost(e):o instanceof Cs&&o.applyStyles(),o}getOrCreateRenderer(e,i){let o=this.rendererByCompId,r=o.get(i.id);if(!r){let s=this.doc,a=this.ngZone,l=this.eventManager,c=this.sharedStylesHost,d=this.removeStylesOnCompDestroy,f=this.tracingService;switch(i.encapsulation){case Yt.Emulated:r=new fc(l,c,i,this.appId,d,s,a,f);break;case Yt.ShadowDom:return new uc(l,e,i,s,a,this.nonce,f,c);case Yt.ExperimentalIsolatedShadowDom:return new uc(l,e,i,s,a,this.nonce,f);default:r=new Cs(l,c,i,d,s,a,f);break}o.set(i.id,r)}return r}ngOnDestroy(){this.rendererByCompId.clear()}componentReplaced(e){this.rendererByCompId.delete(e)}static \u0275fac=function(i){return new(i||t)(M(zm),M($m),M(Kn),M(GM),M(k),M(S),M(Wi),M(Xt,8))};static \u0275prov=b({token:t,factory:t.\u0275fac})}return t})(),Ds=class{eventManager;doc;ngZone;tracingService;data=Object.create(null);throwOnSyntheticProps=!0;constructor(n,e,i,o){this.eventManager=n,this.doc=e,this.ngZone=i,this.tracingService=o}destroy(){}destroyNode=null;createElement(n,e){return e?this.doc.createElementNS(Hm[e]||e,n):this.doc.createElement(n)}createComment(n){return this.doc.createComment(n)}createText(n){return this.doc.createTextNode(n)}appendChild(n,e){(By(n)?n.content:n).appendChild(e)}insertBefore(n,e,i){n&&(By(n)?n.content:n).insertBefore(e,i)}removeChild(n,e){e.remove()}selectRootElement(n,e){let i=typeof n=="string"?this.doc.querySelector(n):n;if(!i)throw new A(-5104,!1);return e||(i.textContent=""),i}parentNode(n){return n.parentNode}nextSibling(n){return n.nextSibling}setAttribute(n,e,i,o){if(o){e=o+":"+e;let r=Hm[o];r?n.setAttributeNS(r,e,i):n.setAttribute(e,i)}else n.setAttribute(e,i)}removeAttribute(n,e,i){if(i){let o=Hm[i];o?n.removeAttributeNS(o,e):n.removeAttribute(`${i}:${e}`)}else n.removeAttribute(e)}addClass(n,e){n.classList.add(e)}removeClass(n,e){n.classList.remove(e)}setStyle(n,e,i,o){o&(cn.DashCase|cn.Important)?n.style.setProperty(e,i,o&cn.Important?"important":""):n.style[e]=i}removeStyle(n,e,i){i&cn.DashCase?n.style.removeProperty(e):n.style[e]=""}setProperty(n,e,i){n!=null&&(n[e]=i)}setValue(n,e){n.nodeValue=e}listen(n,e,i,o){if(typeof n=="string"&&(n=Rt().getGlobalEventTarget(this.doc,n),!n))throw new A(5102,!1);let r=this.decoratePreventDefault(i);return this.tracingService?.wrapEventListener&&(r=this.tracingService.wrapEventListener(n,e,r)),this.eventManager.addEventListener(n,e,r,o)}decoratePreventDefault(n){return e=>{if(e==="__ngUnwrap__")return n;n(e)===!1&&e.preventDefault()}}};function By(t){return t.tagName==="TEMPLATE"&&t.content!==void 0}var uc=class extends Ds{hostEl;sharedStylesHost;shadowRoot;constructor(n,e,i,o,r,s,a,l){super(n,o,r,a),this.hostEl=e,this.sharedStylesHost=l,this.shadowRoot=e.attachShadow({mode:"open"}),this.sharedStylesHost&&this.sharedStylesHost.addHost(this.shadowRoot);let c=i.styles;c=Hy(i.id,c);for(let f of c){let p=document.createElement("style");s&&p.setAttribute("nonce",s),p.textContent=f,this.shadowRoot.appendChild(p)}let d=i.getExternalStyles?.();if(d)for(let f of d){let p=Um(f,o);s&&p.setAttribute("nonce",s),this.shadowRoot.appendChild(p)}}nodeOrShadowRoot(n){return n===this.hostEl?this.shadowRoot:n}appendChild(n,e){return super.appendChild(this.nodeOrShadowRoot(n),e)}insertBefore(n,e,i){return super.insertBefore(this.nodeOrShadowRoot(n),e,i)}removeChild(n,e){return super.removeChild(null,e)}parentNode(n){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(n)))}destroy(){this.sharedStylesHost&&this.sharedStylesHost.removeHost(this.shadowRoot)}},Cs=class extends Ds{sharedStylesHost;removeStylesOnCompDestroy;styles;styleUrls;constructor(n,e,i,o,r,s,a,l){super(n,r,s,a),this.sharedStylesHost=e,this.removeStylesOnCompDestroy=o;let c=i.styles;this.styles=l?Hy(l,c):c,this.styleUrls=i.getExternalStyles?.(l)}applyStyles(){this.sharedStylesHost.addStyles(this.styles,this.styleUrls)}destroy(){this.removeStylesOnCompDestroy&&zi.size===0&&this.sharedStylesHost.removeStyles(this.styles,this.styleUrls)}},fc=class extends Cs{contentAttr;hostAttr;constructor(n,e,i,o,r,s,a,l){let c=o+"-"+i.id;super(n,e,i,r,s,a,l,c),this.contentAttr=WM(c),this.hostAttr=qM(c)}applyToHost(n){this.applyStyles(),this.setAttribute(n,this.hostAttr,"")}createElement(n,e){let i=super.createElement(n,e);return super.setAttribute(i,this.contentAttr,""),i}};var pc=class t extends vs{supportsDOMEvents=!0;static makeCurrent(){Vm(new t)}onAndCancel(n,e,i,o){return n.addEventListener(e,i,o),()=>{n.removeEventListener(e,i,o)}}dispatchEvent(n,e){n.dispatchEvent(e)}remove(n){n.remove()}createElement(n,e){return e=e||this.getDefaultDocument(),e.createElement(n)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(n){return n.nodeType===Node.ELEMENT_NODE}isShadowRoot(n){return n instanceof DocumentFragment}getGlobalEventTarget(n,e){return e==="window"?window:e==="document"?n:e==="body"?n.body:null}getBaseHref(n){let e=YM();return e==null?null:ZM(e)}resetBaseElement(){Es=null}getUserAgent(){return window.navigator.userAgent}getCookie(n){return ys(document.cookie,n)}},Es=null;function YM(){return Es=Es||document.head.querySelector("base"),Es?Es.getAttribute("href"):null}function ZM(t){return new URL(t,document.baseURI).pathname}var KM=(()=>{class t{build(){return new XMLHttpRequest}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac})}return t})(),Uy=["alt","control","meta","shift"],XM={"\b":"Backspace","	":"Tab","\x7F":"Delete","\x1B":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},QM={alt:t=>t.altKey,control:t=>t.ctrlKey,meta:t=>t.metaKey,shift:t=>t.shiftKey},zy=(()=>{class t extends bs{constructor(e){super(e)}supports(e){return t.parseEventName(e)!=null}addEventListener(e,i,o,r){let s=t.parseEventName(i),a=t.eventCallback(s.fullKey,o,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>Rt().onAndCancel(e,s.domEventName,a,r))}static parseEventName(e){let i=e.toLowerCase().split("."),o=i.shift();if(i.length===0||!(o==="keydown"||o==="keyup"))return null;let r=t._normalizeKey(i.pop()),s="",a=i.indexOf("code");if(a>-1&&(i.splice(a,1),s="code."),Uy.forEach(c=>{let d=i.indexOf(c);d>-1&&(i.splice(d,1),s+=c+".")}),s+=r,i.length!=0||r.length===0)return null;let l={};return l.domEventName=o,l.fullKey=s,l}static matchEventFullKeyCode(e,i){let o=XM[e.key]||e.key,r="";return i.indexOf("code.")>-1&&(o=e.code,r="code."),o==null||!o?!1:(o=o.toLowerCase(),o===" "?o="space":o==="."&&(o="dot"),Uy.forEach(s=>{if(s!==o){let a=QM[s];a(e)&&(r+=s+".")}}),r+=o,r===i)}static eventCallback(e,i,o){return r=>{t.matchEventFullKeyCode(r,e)&&o.runGuarded(()=>i(r))}}static _normalizeKey(e){return e==="esc"?"escape":e}static \u0275fac=function(i){return new(i||t)(M(k))};static \u0275prov=b({token:t,factory:t.\u0275fac})}return t})();async function qm(t,n,e){let i=D({rootComponent:t},JM(n,e));return Sy(i)}function JM(t,n){return{platformRef:n?.platformRef,appProviders:[...oS,...t?.providers??[]],platformProviders:iS}}function eS(){pc.makeCurrent()}function tS(){return new Qe}function nS(){return Yf(document),document}var iS=[{provide:Gi,useValue:Bm},{provide:Ll,useValue:eS,multi:!0},{provide:k,useFactory:nS}];var oS=[{provide:$r,useValue:"root"},{provide:Qe,useFactory:tS},{provide:mc,useClass:dc,multi:!0},{provide:mc,useClass:zy,multi:!0},Wm,$m,zm,{provide:Fe,useExisting:Wm},{provide:Zi,useClass:KM},[]];var Jn=class t{headers;normalizedNames=new Map;lazyInit;lazyUpdate=null;constructor(n){n?typeof n=="string"?this.lazyInit=()=>{this.headers=new Map,n.split(`
`).forEach(e=>{let i=e.indexOf(":");if(i>0){let o=e.slice(0,i),r=e.slice(i+1).trim();this.addHeaderEntry(o,r)}})}:typeof Headers<"u"&&n instanceof Headers?(this.headers=new Map,n.forEach((e,i)=>{this.addHeaderEntry(i,e)})):this.lazyInit=()=>{this.headers=new Map,Object.entries(n).forEach(([e,i])=>{this.setHeaderEntries(e,i)})}:this.headers=new Map}has(n){return this.init(),this.headers.has(n.toLowerCase())}get(n){this.init();let e=this.headers.get(n.toLowerCase());return e&&e.length>0?e[0]:null}keys(){return this.init(),Array.from(this.normalizedNames.values())}getAll(n){return this.init(),this.headers.get(n.toLowerCase())||null}append(n,e){return this.clone({name:n,value:e,op:"a"})}set(n,e){return this.clone({name:n,value:e,op:"s"})}delete(n,e){return this.clone({name:n,value:e,op:"d"})}maybeSetNormalizedName(n,e){this.normalizedNames.has(e)||this.normalizedNames.set(e,n)}init(){this.lazyInit&&(this.lazyInit instanceof t?this.copyFrom(this.lazyInit):this.lazyInit(),this.lazyInit=null,this.lazyUpdate&&(this.lazyUpdate.forEach(n=>this.applyUpdate(n)),this.lazyUpdate=null))}copyFrom(n){n.init(),Array.from(n.headers.keys()).forEach(e=>{this.headers.set(e,n.headers.get(e)),this.normalizedNames.set(e,n.normalizedNames.get(e))})}clone(n){let e=new t;return e.lazyInit=this.lazyInit&&this.lazyInit instanceof t?this.lazyInit:this,e.lazyUpdate=(this.lazyUpdate||[]).concat([n]),e}applyUpdate(n){let e=n.name.toLowerCase();switch(n.op){case"a":case"s":let i=n.value;if(typeof i=="string"&&(i=[i]),i.length===0)return;this.maybeSetNormalizedName(n.name,e);let o=(n.op==="a"?this.headers.get(e):void 0)||[];o.push(...i),this.headers.set(e,o);break;case"d":let r=n.value;if(!r)this.headers.delete(e),this.normalizedNames.delete(e);else{let s=this.headers.get(e);if(!s)return;s=s.filter(a=>r.indexOf(a)===-1),s.length===0?(this.headers.delete(e),this.normalizedNames.delete(e)):this.headers.set(e,s)}break}}addHeaderEntry(n,e){let i=n.toLowerCase();this.maybeSetNormalizedName(n,i),this.headers.has(i)?this.headers.get(i).push(e):this.headers.set(i,[e])}setHeaderEntries(n,e){let i=(Array.isArray(e)?e:[e]).map(r=>r.toString()),o=n.toLowerCase();this.headers.set(o,i),this.maybeSetNormalizedName(n,o)}forEach(n){this.init(),Array.from(this.normalizedNames.keys()).forEach(e=>n(this.normalizedNames.get(e),this.headers.get(e)))}};var gc=class{map=new Map;set(n,e){return this.map.set(n,e),this}get(n){return this.map.has(n)||this.map.set(n,n.defaultValue()),this.map.get(n)}delete(n){return this.map.delete(n),this}has(n){return this.map.has(n)}keys(){return this.map.keys()}},vc=class{encodeKey(n){return $y(n)}encodeValue(n){return $y(n)}decodeKey(n){return decodeURIComponent(n)}decodeValue(n){return decodeURIComponent(n)}};function rS(t,n){let e=new Map;return t.length>0&&t.replace(/^\?/,"").split("&").forEach(o=>{let r=o.indexOf("="),[s,a]=r==-1?[n.decodeKey(o),""]:[n.decodeKey(o.slice(0,r)),n.decodeValue(o.slice(r+1))],l=e.get(s)||[];l.push(a),e.set(s,l)}),e}var sS=/%(\d[a-f0-9])/gi,aS={40:"@","3A":":",24:"$","2C":",","3B":";","3D":"=","3F":"?","2F":"/"};function $y(t){return encodeURIComponent(t).replace(sS,(n,e)=>aS[e]??n)}function hc(t){return`${t}`}var An=class t{map;encoder;updates=null;cloneFrom=null;constructor(n={}){if(this.encoder=n.encoder||new vc,n.fromString){if(n.fromObject)throw new A(2805,!1);this.map=rS(n.fromString,this.encoder)}else n.fromObject?(this.map=new Map,Object.keys(n.fromObject).forEach(e=>{let i=n.fromObject[e],o=Array.isArray(i)?i.map(hc):[hc(i)];this.map.set(e,o)})):this.map=null}has(n){return this.init(),this.map.has(n)}get(n){this.init();let e=this.map.get(n);return e?e[0]:null}getAll(n){return this.init(),this.map.get(n)||null}keys(){return this.init(),Array.from(this.map.keys())}append(n,e){return this.clone({param:n,value:e,op:"a"})}appendAll(n){let e=[];return Object.keys(n).forEach(i=>{let o=n[i];Array.isArray(o)?o.forEach(r=>{e.push({param:i,value:r,op:"a"})}):e.push({param:i,value:o,op:"a"})}),this.clone(e)}set(n,e){return this.clone({param:n,value:e,op:"s"})}delete(n,e){return this.clone({param:n,value:e,op:"d"})}toString(){return this.init(),this.keys().map(n=>{let e=this.encoder.encodeKey(n);return this.map.get(n).map(i=>e+"="+this.encoder.encodeValue(i)).join("&")}).filter(n=>n!=="").join("&")}clone(n){let e=new t({encoder:this.encoder});return e.cloneFrom=this.cloneFrom||this,e.updates=(this.updates||[]).concat(n),e}init(){this.map===null&&(this.map=new Map),this.cloneFrom!==null&&(this.cloneFrom.init(),this.cloneFrom.keys().forEach(n=>this.map.set(n,this.cloneFrom.map.get(n))),this.updates.forEach(n=>{switch(n.op){case"a":case"s":let e=(n.op==="a"?this.map.get(n.param):void 0)||[];e.push(hc(n.value)),this.map.set(n.param,e);break;case"d":if(n.value!==void 0){let i=this.map.get(n.param)||[],o=i.indexOf(hc(n.value));o!==-1&&i.splice(o,1),i.length>0?this.map.set(n.param,i):this.map.delete(n.param)}else{this.map.delete(n.param);break}}}),this.cloneFrom=this.updates=null)}};function lS(t){switch(t){case"DELETE":case"GET":case"HEAD":case"OPTIONS":case"JSONP":return!1;default:return!0}}function Gy(t){return typeof ArrayBuffer<"u"&&t instanceof ArrayBuffer}function Wy(t){return typeof Blob<"u"&&t instanceof Blob}function qy(t){return typeof FormData<"u"&&t instanceof FormData}function cS(t){return typeof URLSearchParams<"u"&&t instanceof URLSearchParams}var Yy="Content-Type",Zy="Accept",Ky="text/plain",Xy="application/json",dS=`${Xy}, ${Ky}, */*`,Zo=class t{url;body=null;headers;context;reportProgress=!1;withCredentials=!1;credentials;keepalive=!1;cache;priority;mode;redirect;referrer;integrity;referrerPolicy;responseType="json";method;params;urlWithParams;transferCache;timeout;constructor(n,e,i,o){this.url=e,this.method=n.toUpperCase();let r;if(lS(this.method)||o?(this.body=i!==void 0?i:null,r=o):r=i,r){if(this.reportProgress=!!r.reportProgress,this.withCredentials=!!r.withCredentials,this.keepalive=!!r.keepalive,r.responseType&&(this.responseType=r.responseType),r.headers&&(this.headers=r.headers),r.context&&(this.context=r.context),r.params&&(this.params=r.params),r.priority&&(this.priority=r.priority),r.cache&&(this.cache=r.cache),r.credentials&&(this.credentials=r.credentials),typeof r.timeout=="number"){if(r.timeout<1||!Number.isInteger(r.timeout))throw new A(2822,"");this.timeout=r.timeout}r.mode&&(this.mode=r.mode),r.redirect&&(this.redirect=r.redirect),r.integrity&&(this.integrity=r.integrity),r.referrer&&(this.referrer=r.referrer),r.referrerPolicy&&(this.referrerPolicy=r.referrerPolicy),this.transferCache=r.transferCache}if(this.headers??=new Jn,this.context??=new gc,!this.params)this.params=new An,this.urlWithParams=e;else{let s=this.params.toString();if(s.length===0)this.urlWithParams=e;else{let a=e.indexOf("?"),l=a===-1?"?":a<e.length-1?"&":"";this.urlWithParams=e+l+s}}}serializeBody(){return this.body===null?null:typeof this.body=="string"||Gy(this.body)||Wy(this.body)||qy(this.body)||cS(this.body)?this.body:this.body instanceof An?this.body.toString():typeof this.body=="object"||typeof this.body=="boolean"||Array.isArray(this.body)?JSON.stringify(this.body):this.body.toString()}detectContentTypeHeader(){return this.body===null||qy(this.body)?null:Wy(this.body)?this.body.type||null:Gy(this.body)?null:typeof this.body=="string"?Ky:this.body instanceof An?"application/x-www-form-urlencoded;charset=UTF-8":typeof this.body=="object"||typeof this.body=="number"||typeof this.body=="boolean"?Xy:null}clone(n={}){let e=n.method||this.method,i=n.url||this.url,o=n.responseType||this.responseType,r=n.keepalive??this.keepalive,s=n.priority||this.priority,a=n.cache||this.cache,l=n.mode||this.mode,c=n.redirect||this.redirect,d=n.credentials||this.credentials,f=n.referrer||this.referrer,p=n.integrity||this.integrity,m=n.referrerPolicy||this.referrerPolicy,v=n.transferCache??this.transferCache,w=n.timeout??this.timeout,I=n.body!==void 0?n.body:this.body,T=n.withCredentials??this.withCredentials,ye=n.reportProgress??this.reportProgress,ft=n.headers||this.headers,ze=n.params||this.params,Dr=n.context??this.context;return n.setHeaders!==void 0&&(ft=Object.keys(n.setHeaders).reduce((Cr,di)=>Cr.set(di,n.setHeaders[di]),ft)),n.setParams&&(ze=Object.keys(n.setParams).reduce((Cr,di)=>Cr.set(di,n.setParams[di]),ze)),new t(e,i,I,{params:ze,headers:ft,context:Dr,reportProgress:ye,responseType:o,withCredentials:T,transferCache:v,keepalive:r,cache:a,priority:s,timeout:w,mode:l,redirect:c,credentials:d,referrer:f,integrity:p,referrerPolicy:m})}},Ki=(function(t){return t[t.Sent=0]="Sent",t[t.UploadProgress=1]="UploadProgress",t[t.ResponseHeader=2]="ResponseHeader",t[t.DownloadProgress=3]="DownloadProgress",t[t.Response=4]="Response",t[t.User=5]="User",t})(Ki||{}),Xo=class{headers;status;statusText;url;ok;type;redirected;responseType;constructor(n,e=200,i="OK"){this.headers=n.headers||new Jn,this.status=n.status!==void 0?n.status:e,this.statusText=n.statusText||i,this.url=n.url||null,this.redirected=n.redirected,this.responseType=n.responseType,this.ok=this.status>=200&&this.status<300}},_c=class t extends Xo{constructor(n={}){super(n)}type=Ki.ResponseHeader;clone(n={}){return new t({headers:n.headers||this.headers,status:n.status!==void 0?n.status:this.status,statusText:n.statusText||this.statusText,url:n.url||this.url||void 0})}},ws=class t extends Xo{body;constructor(n={}){super(n),this.body=n.body!==void 0?n.body:null}type=Ki.Response;clone(n={}){return new t({body:n.body!==void 0?n.body:this.body,headers:n.headers||this.headers,status:n.status!==void 0?n.status:this.status,statusText:n.statusText||this.statusText,url:n.url||this.url||void 0,redirected:n.redirected??this.redirected,responseType:n.responseType??this.responseType})}},Ko=class extends Xo{name="HttpErrorResponse";message;error;ok=!1;constructor(n){super(n,0,"Unknown Error"),this.status>=200&&this.status<300?this.message=`Http failure during parsing for ${n.url||"(unknown url)"}`:this.message=`Http failure response for ${n.url||"(unknown url)"}: ${n.status} ${n.statusText}`,this.error=n.error||null}},uS=200,fS=204;var mS=new _("");var pS=/^\)\]\}',?\n/;var Zm=(()=>{class t{xhrFactory;tracingService=u(Xt,{optional:!0});constructor(e){this.xhrFactory=e}maybePropagateTrace(e){return this.tracingService?.propagate?this.tracingService.propagate(e):e}handle(e){if(e.method==="JSONP")throw new A(-2800,!1);let i=this.xhrFactory;return Ve(null).pipe(Di(()=>new te(r=>{let s=i.build();if(s.open(e.method,e.urlWithParams),e.withCredentials&&(s.withCredentials=!0),e.headers.forEach((I,T)=>s.setRequestHeader(I,T.join(","))),e.headers.has(Zy)||s.setRequestHeader(Zy,dS),!e.headers.has(Yy)){let I=e.detectContentTypeHeader();I!==null&&s.setRequestHeader(Yy,I)}if(e.timeout&&(s.timeout=e.timeout),e.responseType){let I=e.responseType.toLowerCase();s.responseType=I!=="json"?I:"text"}let a=e.serializeBody(),l=null,c=()=>{if(l!==null)return l;let I=s.statusText||"OK",T=new Jn(s.getAllResponseHeaders()),ye=s.responseURL||e.url;return l=new _c({headers:T,status:s.status,statusText:I,url:ye}),l},d=this.maybePropagateTrace(()=>{let{headers:I,status:T,statusText:ye,url:ft}=c(),ze=null;T!==fS&&(ze=typeof s.response>"u"?s.responseText:s.response),T===0&&(T=ze?uS:0);let Dr=T>=200&&T<300;if(e.responseType==="json"&&typeof ze=="string"){let Cr=ze;ze=ze.replace(pS,"");try{ze=ze!==""?JSON.parse(ze):null}catch(di){ze=Cr,Dr&&(Dr=!1,ze={error:di,text:ze})}}Dr?(r.next(new ws({body:ze,headers:I,status:T,statusText:ye,url:ft||void 0})),r.complete()):r.error(new Ko({error:ze,headers:I,status:T,statusText:ye,url:ft||void 0}))}),f=this.maybePropagateTrace(I=>{let{url:T}=c(),ye=new Ko({error:I,status:s.status||0,statusText:s.statusText||"Unknown Error",url:T||void 0});r.error(ye)}),p=f;e.timeout&&(p=this.maybePropagateTrace(I=>{let{url:T}=c(),ye=new Ko({error:new DOMException("Request timed out","TimeoutError"),status:s.status||0,statusText:s.statusText||"Request timeout",url:T||void 0});r.error(ye)}));let m=!1,v=this.maybePropagateTrace(I=>{m||(r.next(c()),m=!0);let T={type:Ki.DownloadProgress,loaded:I.loaded};I.lengthComputable&&(T.total=I.total),e.responseType==="text"&&s.responseText&&(T.partialText=s.responseText),r.next(T)}),w=this.maybePropagateTrace(I=>{let T={type:Ki.UploadProgress,loaded:I.loaded};I.lengthComputable&&(T.total=I.total),r.next(T)});return s.addEventListener("load",d),s.addEventListener("error",f),s.addEventListener("timeout",p),s.addEventListener("abort",f),e.reportProgress&&(s.addEventListener("progress",v),a!==null&&s.upload&&s.upload.addEventListener("progress",w)),s.send(a),r.next({type:Ki.Sent}),()=>{s.removeEventListener("error",f),s.removeEventListener("abort",f),s.removeEventListener("load",d),s.removeEventListener("timeout",p),e.reportProgress&&(s.removeEventListener("progress",v),a!==null&&s.upload&&s.upload.removeEventListener("progress",w)),s.readyState!==s.DONE&&s.abort()}})))}static \u0275fac=function(i){return new(i||t)(M(Zi))};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function hS(t,n){return n(t)}function gS(t,n,e){return(i,o)=>xo(e,()=>n(i,r=>t(r,o)))}var Qy=new _("",{factory:()=>[]}),Jy=new _(""),eb=new _("",{factory:()=>!0});var Km=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:function(i){let o=null;return i?o=new(i||t):o=M(Zm),o},providedIn:"root"})}return t})();var yc=(()=>{class t{backend;injector;chain=null;pendingTasks=u(Kr);contributeToStability=u(eb);constructor(e,i){this.backend=e,this.injector=i}handle(e){if(this.chain===null){let i=Array.from(new Set([...this.injector.get(Qy),...this.injector.get(Jy,[])]));this.chain=i.reduceRight((o,r)=>gS(o,r,this.injector),hS)}if(this.contributeToStability){let i=this.pendingTasks.add();return this.chain(e,o=>this.backend.handle(o)).pipe(Or(i))}else return this.chain(e,i=>this.backend.handle(i))}static \u0275fac=function(i){return new(i||t)(M(Km),M(Re))};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),Xm=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:function(i){let o=null;return i?o=new(i||t):o=M(yc),o},providedIn:"root"})}return t})();function Ym(t,n){return{body:n,headers:t.headers,context:t.context,observe:t.observe,params:t.params,reportProgress:t.reportProgress,responseType:t.responseType,withCredentials:t.withCredentials,credentials:t.credentials,transferCache:t.transferCache,timeout:t.timeout,keepalive:t.keepalive,priority:t.priority,cache:t.cache,mode:t.mode,redirect:t.redirect,integrity:t.integrity,referrer:t.referrer,referrerPolicy:t.referrerPolicy}}var Nt=(()=>{class t{handler;constructor(e){this.handler=e}request(e,i,o={}){let r;if(e instanceof Zo)r=e;else{let l;o.headers instanceof Jn?l=o.headers:l=new Jn(o.headers);let c;o.params&&(o.params instanceof An?c=o.params:c=new An({fromObject:o.params})),r=new Zo(e,i,o.body!==void 0?o.body:null,{headers:l,context:o.context,params:c,reportProgress:o.reportProgress,responseType:o.responseType||"json",withCredentials:o.withCredentials,transferCache:o.transferCache,keepalive:o.keepalive,priority:o.priority,cache:o.cache,mode:o.mode,redirect:o.redirect,credentials:o.credentials,referrer:o.referrer,referrerPolicy:o.referrerPolicy,integrity:o.integrity,timeout:o.timeout})}let s=Ve(r).pipe($d(l=>this.handler.handle(l)));if(e instanceof Zo||o.observe==="events")return s;let a=s.pipe(Me(l=>l instanceof ws));switch(o.observe||"body"){case"body":switch(r.responseType){case"arraybuffer":return a.pipe(ve(l=>{if(l.body!==null&&!(l.body instanceof ArrayBuffer))throw new A(2806,!1);return l.body}));case"blob":return a.pipe(ve(l=>{if(l.body!==null&&!(l.body instanceof Blob))throw new A(2807,!1);return l.body}));case"text":return a.pipe(ve(l=>{if(l.body!==null&&typeof l.body!="string")throw new A(2808,!1);return l.body}));default:return a.pipe(ve(l=>l.body))}case"response":return a;default:throw new A(2809,!1)}}delete(e,i={}){return this.request("DELETE",e,i)}get(e,i={}){return this.request("GET",e,i)}head(e,i={}){return this.request("HEAD",e,i)}jsonp(e,i){return this.request("JSONP",e,{params:new An().append(i,"JSONP_CALLBACK"),observe:"body",responseType:"json"})}options(e,i={}){return this.request("OPTIONS",e,i)}patch(e,i,o={}){return this.request("PATCH",e,Ym(o,i))}post(e,i,o={}){return this.request("POST",e,Ym(o,i))}put(e,i,o={}){return this.request("PUT",e,Ym(o,i))}static \u0275fac=function(i){return new(i||t)(M(Xm))};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var vS=new _("",{factory:()=>!0}),_S="XSRF-TOKEN",yS=new _("",{factory:()=>_S}),bS="X-XSRF-TOKEN",DS=new _("",{factory:()=>bS}),CS=(()=>{class t{cookieName=u(yS);doc=u(k);lastCookieString="";lastToken=null;parseCount=0;getToken(){let e=this.doc.cookie||"";return e!==this.lastCookieString&&(this.parseCount++,this.lastToken=ys(e,this.cookieName),this.lastCookieString=e),this.lastToken}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),tb=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:function(i){let o=null;return i?o=new(i||t):o=M(CS),o},providedIn:"root"})}return t})();function ES(t,n){if(!u(vS)||t.method==="GET"||t.method==="HEAD")return n(t);try{let o=u(Yo).href,{origin:r}=new URL(o),{origin:s}=new URL(t.url,r);if(r!==s)return n(t)}catch{return n(t)}let e=u(tb).getToken(),i=u(DS);return e!=null&&!t.headers.has(i)&&(t=t.clone({headers:t.headers.set(i,e)})),n(t)}function Qm(...t){let n=[Nt,yc,{provide:Xm,useExisting:yc},{provide:Km,useFactory:()=>u(mS,{optional:!0})??u(Zm)},{provide:Qy,useValue:ES,multi:!0}];for(let e of t)n.push(...e.\u0275providers);return Ai(n)}var Xi=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:function(i){let o=null;return i?o=new(i||t):o=M(wS),o},providedIn:"root"})}return t})(),wS=(()=>{class t extends Xi{_doc;constructor(e){super(),this._doc=e}sanitize(e,i){if(i==null)return null;switch(e){case He.NONE:return i;case He.HTML:return Sn(i,"HTML")?Kt(i):jl(this._doc,String(i)).toString();case He.STYLE:return Sn(i,"Style")?Kt(i):i;case He.SCRIPT:if(Sn(i,"Script"))return Kt(i);throw new A(5200,!1);case He.URL:return Sn(i,"URL")?Kt(i):ls(String(i));case He.RESOURCE_URL:if(Sn(i,"ResourceURL"))return Kt(i);throw new A(5201,!1);default:throw new A(5202,!1)}}bypassSecurityTrustHtml(e){return Kf(e)}bypassSecurityTrustStyle(e){return Xf(e)}bypassSecurityTrustScript(e){return Qf(e)}bypassSecurityTrustUrl(e){return Jf(e)}bypassSecurityTrustResourceUrl(e){return em(e)}static \u0275fac=function(i){return new(i||t)(M(k))};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var ib={providers:[Wu(),Qm()]};function Qi(t){return t.buttons===0||t.detail===0}function Ji(t){let n=t.touches&&t.touches[0]||t.changedTouches&&t.changedTouches[0];return!!n&&n.identifier===-1&&(n.radiusX==null||n.radiusX===1)&&(n.radiusY==null||n.radiusY===1)}var Jm;function ob(){if(Jm==null){let t=typeof document<"u"?document.head:null;Jm=!!(t&&(t.createShadowRoot||t.attachShadow))}return Jm}function ep(t){if(ob()){let n=t.getRootNode?t.getRootNode():null;if(typeof ShadowRoot<"u"&&ShadowRoot&&n instanceof ShadowRoot)return n}return null}function Is(){let t=typeof document<"u"&&document?document.activeElement:null;for(;t&&t.shadowRoot;){let n=t.shadowRoot.activeElement;if(n===t)break;t=n}return t}function ut(t){return t.composedPath?t.composedPath()[0]:t.target}var tp;try{tp=typeof Intl<"u"&&Intl.v8BreakIterator}catch{tp=!1}var ae=(()=>{class t{_platformId=u(Gi);isBrowser=this._platformId?Py(this._platformId):typeof document=="object"&&!!document;EDGE=this.isBrowser&&/(edge)/i.test(navigator.userAgent);TRIDENT=this.isBrowser&&/(msie|trident)/i.test(navigator.userAgent);BLINK=this.isBrowser&&!!(window.chrome||tp)&&typeof CSS<"u"&&!this.EDGE&&!this.TRIDENT;WEBKIT=this.isBrowser&&/AppleWebKit/i.test(navigator.userAgent)&&!this.BLINK&&!this.EDGE&&!this.TRIDENT;IOS=this.isBrowser&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!("MSStream"in window);FIREFOX=this.isBrowser&&/(firefox|minefield)/i.test(navigator.userAgent);ANDROID=this.isBrowser&&/android/i.test(navigator.userAgent)&&!this.TRIDENT;SAFARI=this.isBrowser&&/safari/i.test(navigator.userAgent)&&this.WEBKIT;constructor(){}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Ms;function rb(){if(Ms==null&&typeof window<"u")try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:()=>Ms=!0}))}finally{Ms=Ms||!1}return Ms}function Qo(t){return rb()?t:!!t.capture}function kn(t,n=0){return sb(t)?Number(t):arguments.length===2?n:0}function sb(t){return!isNaN(parseFloat(t))&&!isNaN(Number(t))}function yt(t){return t instanceof B?t.nativeElement:t}var ab=new _("cdk-input-modality-detector-options"),lb={ignoreKeys:[18,17,224,91,16]},cb=650,np={passive:!0,capture:!0},db=(()=>{class t{_platform=u(ae);_listenerCleanups;modalityDetected;modalityChanged;get mostRecentModality(){return this._modality.value}_mostRecentTarget=null;_modality=new vi(null);_options;_lastTouchMs=0;_onKeydown=e=>{this._options?.ignoreKeys?.some(i=>i===e.keyCode)||(this._modality.next("keyboard"),this._mostRecentTarget=ut(e))};_onMousedown=e=>{Date.now()-this._lastTouchMs<cb||(this._modality.next(Qi(e)?"keyboard":"mouse"),this._mostRecentTarget=ut(e))};_onTouchstart=e=>{if(Ji(e)){this._modality.next("keyboard");return}this._lastTouchMs=Date.now(),this._modality.next("touch"),this._mostRecentTarget=ut(e)};constructor(){let e=u(S),i=u(k),o=u(ab,{optional:!0});if(this._options=D(D({},lb),o),this.modalityDetected=this._modality.pipe(Pr(1)),this.modalityChanged=this.modalityDetected.pipe(Fa()),this._platform.isBrowser){let r=u(Fe).createRenderer(null,null);this._listenerCleanups=e.runOutsideAngular(()=>[r.listen(i,"keydown",this._onKeydown,np),r.listen(i,"mousedown",this._onMousedown,np),r.listen(i,"touchstart",this._onTouchstart,np)])}}ngOnDestroy(){this._modality.complete(),this._listenerCleanups?.forEach(e=>e())}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),Ss=(function(t){return t[t.IMMEDIATE=0]="IMMEDIATE",t[t.EVENTUAL=1]="EVENTUAL",t})(Ss||{}),ub=new _("cdk-focus-monitor-default-options"),bc=Qo({passive:!0,capture:!0}),Ot=(()=>{class t{_ngZone=u(S);_platform=u(ae);_inputModalityDetector=u(db);_origin=null;_lastFocusOrigin=null;_windowFocused=!1;_windowFocusTimeoutId;_originTimeoutId;_originFromTouchInteraction=!1;_elementInfo=new Map;_monitoredElementCount=0;_rootNodeFocusListenerCount=new Map;_detectionMode;_windowFocusListener=()=>{this._windowFocused=!0,this._windowFocusTimeoutId=setTimeout(()=>this._windowFocused=!1)};_document=u(k);_stopInputModalityDetector=new C;constructor(){let e=u(ub,{optional:!0});this._detectionMode=e?.detectionMode||Ss.IMMEDIATE}_rootNodeFocusAndBlurListener=e=>{let i=ut(e);for(let o=i;o;o=o.parentElement)e.type==="focus"?this._onFocus(e,o):this._onBlur(e,o)};monitor(e,i=!1){let o=yt(e);if(!this._platform.isBrowser||o.nodeType!==1)return Ve();let r=ep(o)||this._document,s=this._elementInfo.get(o);if(s)return i&&(s.checkChildren=!0),s.subject;let a={checkChildren:i,subject:new C,rootNode:r};return this._elementInfo.set(o,a),this._registerGlobalListeners(a),a.subject}stopMonitoring(e){let i=yt(e),o=this._elementInfo.get(i);o&&(o.subject.complete(),this._setClasses(i),this._elementInfo.delete(i),this._removeGlobalListeners(o))}focusVia(e,i,o){let r=yt(e),s=this._document.activeElement;r===s?this._getClosestElementsInfo(r).forEach(([a,l])=>this._originChanged(a,i,l)):(this._setOrigin(i),typeof r.focus=="function"&&r.focus(o))}ngOnDestroy(){this._elementInfo.forEach((e,i)=>this.stopMonitoring(i))}_getWindow(){return this._document.defaultView||window}_getFocusOrigin(e){return this._origin?this._originFromTouchInteraction?this._shouldBeAttributedToTouch(e)?"touch":"program":this._origin:this._windowFocused&&this._lastFocusOrigin?this._lastFocusOrigin:e&&this._isLastInteractionFromInputLabel(e)?"mouse":"program"}_shouldBeAttributedToTouch(e){return this._detectionMode===Ss.EVENTUAL||!!e?.contains(this._inputModalityDetector._mostRecentTarget)}_setClasses(e,i){e.classList.toggle("cdk-focused",!!i),e.classList.toggle("cdk-touch-focused",i==="touch"),e.classList.toggle("cdk-keyboard-focused",i==="keyboard"),e.classList.toggle("cdk-mouse-focused",i==="mouse"),e.classList.toggle("cdk-program-focused",i==="program")}_setOrigin(e,i=!1){this._ngZone.runOutsideAngular(()=>{if(this._origin=e,this._originFromTouchInteraction=e==="touch"&&i,this._detectionMode===Ss.IMMEDIATE){clearTimeout(this._originTimeoutId);let o=this._originFromTouchInteraction?cb:1;this._originTimeoutId=setTimeout(()=>this._origin=null,o)}})}_onFocus(e,i){let o=this._elementInfo.get(i),r=ut(e);!o||!o.checkChildren&&i!==r||this._originChanged(i,this._getFocusOrigin(r),o)}_onBlur(e,i){let o=this._elementInfo.get(i);!o||o.checkChildren&&e.relatedTarget instanceof Node&&i.contains(e.relatedTarget)||(this._setClasses(i),this._emitOrigin(o,null))}_emitOrigin(e,i){e.subject.observers.length&&this._ngZone.run(()=>e.subject.next(i))}_registerGlobalListeners(e){if(!this._platform.isBrowser)return;let i=e.rootNode,o=this._rootNodeFocusListenerCount.get(i)||0;o||this._ngZone.runOutsideAngular(()=>{i.addEventListener("focus",this._rootNodeFocusAndBlurListener,bc),i.addEventListener("blur",this._rootNodeFocusAndBlurListener,bc)}),this._rootNodeFocusListenerCount.set(i,o+1),++this._monitoredElementCount===1&&(this._ngZone.runOutsideAngular(()=>{this._getWindow().addEventListener("focus",this._windowFocusListener)}),this._inputModalityDetector.modalityDetected.pipe(Se(this._stopInputModalityDetector)).subscribe(r=>{this._setOrigin(r,!0)}))}_removeGlobalListeners(e){let i=e.rootNode;if(this._rootNodeFocusListenerCount.has(i)){let o=this._rootNodeFocusListenerCount.get(i);o>1?this._rootNodeFocusListenerCount.set(i,o-1):(i.removeEventListener("focus",this._rootNodeFocusAndBlurListener,bc),i.removeEventListener("blur",this._rootNodeFocusAndBlurListener,bc),this._rootNodeFocusListenerCount.delete(i))}--this._monitoredElementCount||(this._getWindow().removeEventListener("focus",this._windowFocusListener),this._stopInputModalityDetector.next(),clearTimeout(this._windowFocusTimeoutId),clearTimeout(this._originTimeoutId))}_originChanged(e,i,o){this._setClasses(e,i),this._emitOrigin(o,i),this._lastFocusOrigin=i}_getClosestElementsInfo(e){let i=[];return this._elementInfo.forEach((o,r)=>{(r===e||o.checkChildren&&r.contains(e))&&i.push([r,o])}),i}_isLastInteractionFromInputLabel(e){let{_mostRecentTarget:i,mostRecentModality:o}=this._inputModalityDetector;if(o!=="mouse"||!i||i===e||e.nodeName!=="INPUT"&&e.nodeName!=="TEXTAREA"||e.disabled)return!1;let r=e.labels;if(r){for(let s=0;s<r.length;s++)if(r[s].contains(i))return!0}return!1}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Dc=new WeakMap,qe=(()=>{class t{_appRef;_injector=u(F);_environmentInjector=u(Re);load(e){let i=this._appRef=this._appRef||this._injector.get(Mt),o=Dc.get(i);o||(o={loaders:new Set,refs:[]},Dc.set(i,o),i.onDestroy(()=>{Dc.get(i)?.refs.forEach(r=>r.destroy()),Dc.delete(i)})),o.loaders.has(e)||(o.loaders.add(e),o.refs.push(ac(e,{environmentInjector:this._environmentInjector})))}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Ec=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275cmp=j({type:t,selectors:[["ng-component"]],exportAs:["cdkVisuallyHidden"],decls:0,vars:0,template:function(i,o){},styles:[`.cdk-visually-hidden {
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
`],encapsulation:2,changeDetection:0})}return t})(),Cc;function xS(){if(Cc===void 0&&(Cc=null,typeof window<"u")){let t=window;t.trustedTypes!==void 0&&(Cc=t.trustedTypes.createPolicy("angular#components",{createHTML:n=>n}))}return Cc}function eo(t){return xS()?.createHTML(t)||t}function fb(t,n,e){let i=e.sanitize(He.HTML,n);t.innerHTML=eo(i||"")}function Jo(t){return Array.isArray(t)?t:[t]}var mb=new Set,to,er=(()=>{class t{_platform=u(ae);_nonce=u(Wi,{optional:!0});_matchMedia;constructor(){this._matchMedia=this._platform.isBrowser&&window.matchMedia?window.matchMedia.bind(window):MS}matchMedia(e){return(this._platform.WEBKIT||this._platform.BLINK)&&IS(e,this._nonce),this._matchMedia(e)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function IS(t,n){if(!mb.has(t))try{to||(to=document.createElement("style"),n&&to.setAttribute("nonce",n),to.setAttribute("type","text/css"),document.head.appendChild(to)),to.sheet&&(to.sheet.insertRule(`@media ${t} {body{ }}`,0),mb.add(t))}catch(e){console.error(e)}}function MS(t){return{matches:t==="all"||t==="",media:t,addListener:()=>{},removeListener:()=>{}}}var Ts=(()=>{class t{_mediaMatcher=u(er);_zone=u(S);_queries=new Map;_destroySubject=new C;constructor(){}ngOnDestroy(){this._destroySubject.next(),this._destroySubject.complete()}isMatched(e){return pb(Jo(e)).some(o=>this._registerQuery(o).mql.matches)}observe(e){let o=pb(Jo(e)).map(s=>this._registerQuery(s).observable),r=zd(o);return r=bo(r.pipe(pt(1)),r.pipe(Pr(1),Nr(0))),r.pipe(ve(s=>{let a={matches:!1,breakpoints:{}};return s.forEach(({matches:l,query:c})=>{a.matches=a.matches||l,a.breakpoints[c]=l}),a}))}_registerQuery(e){if(this._queries.has(e))return this._queries.get(e);let i=this._mediaMatcher.matchMedia(e),r={observable:new te(s=>{let a=l=>this._zone.run(()=>s.next(l));return i.addListener(a),()=>{i.removeListener(a)}}).pipe(st(i),ve(({matches:s})=>({query:e,matches:s})),Se(this._destroySubject)),mql:i};return this._queries.set(e,r),r}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function pb(t){return t.map(n=>n.split(",")).reduce((n,e)=>n.concat(e)).map(n=>n.trim())}var SS=(()=>{class t{create(e){return typeof MutationObserver>"u"?null:new MutationObserver(e)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var wc=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=q({type:t});static \u0275inj=z({providers:[SS]})}return t})();var rp=(()=>{class t{_platform=u(ae);constructor(){}isDisabled(e){return e.hasAttribute("disabled")}isVisible(e){return AS(e)&&getComputedStyle(e).visibility==="visible"}isTabbable(e){if(!this._platform.isBrowser)return!1;let i=TS(VS(e));if(i&&(hb(i)===-1||!this.isVisible(i)))return!1;let o=e.nodeName.toLowerCase(),r=hb(e);return e.hasAttribute("contenteditable")?r!==-1:o==="iframe"||o==="object"||this._platform.WEBKIT&&this._platform.IOS&&!PS(e)?!1:o==="audio"?e.hasAttribute("controls")?r!==-1:!1:o==="video"?r===-1?!1:r!==null?!0:this._platform.FIREFOX||e.hasAttribute("controls"):e.tabIndex>=0}isFocusable(e,i){return LS(e)&&!this.isDisabled(e)&&(i?.ignoreVisibility||this.isVisible(e))}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function TS(t){try{return t.frameElement}catch{return null}}function AS(t){return!!(t.offsetWidth||t.offsetHeight||typeof t.getClientRects=="function"&&t.getClientRects().length)}function kS(t){let n=t.nodeName.toLowerCase();return n==="input"||n==="select"||n==="button"||n==="textarea"}function RS(t){return OS(t)&&t.type=="hidden"}function NS(t){return FS(t)&&t.hasAttribute("href")}function OS(t){return t.nodeName.toLowerCase()=="input"}function FS(t){return t.nodeName.toLowerCase()=="a"}function _b(t){if(!t.hasAttribute("tabindex")||t.tabIndex===void 0)return!1;let n=t.getAttribute("tabindex");return!!(n&&!isNaN(parseInt(n,10)))}function hb(t){if(!_b(t))return null;let n=parseInt(t.getAttribute("tabindex")||"",10);return isNaN(n)?-1:n}function PS(t){let n=t.nodeName.toLowerCase(),e=n==="input"&&t.type;return e==="text"||e==="password"||n==="select"||n==="textarea"}function LS(t){return RS(t)?!1:kS(t)||NS(t)||t.hasAttribute("contenteditable")||_b(t)}function VS(t){return t.ownerDocument&&t.ownerDocument.defaultView||window}var op=class{_element;_checker;_ngZone;_document;_injector;_startAnchor=null;_endAnchor=null;_hasAttached=!1;startAnchorListener=()=>this.focusLastTabbableElement();endAnchorListener=()=>this.focusFirstTabbableElement();get enabled(){return this._enabled}set enabled(n){this._enabled=n,this._startAnchor&&this._endAnchor&&(this._toggleAnchorTabIndex(n,this._startAnchor),this._toggleAnchorTabIndex(n,this._endAnchor))}_enabled=!0;constructor(n,e,i,o,r=!1,s){this._element=n,this._checker=e,this._ngZone=i,this._document=o,this._injector=s,r||this.attachAnchors()}destroy(){let n=this._startAnchor,e=this._endAnchor;n&&(n.removeEventListener("focus",this.startAnchorListener),n.remove()),e&&(e.removeEventListener("focus",this.endAnchorListener),e.remove()),this._startAnchor=this._endAnchor=null,this._hasAttached=!1}attachAnchors(){return this._hasAttached?!0:(this._ngZone.runOutsideAngular(()=>{this._startAnchor||(this._startAnchor=this._createAnchor(),this._startAnchor.addEventListener("focus",this.startAnchorListener)),this._endAnchor||(this._endAnchor=this._createAnchor(),this._endAnchor.addEventListener("focus",this.endAnchorListener))}),this._element.parentNode&&(this._element.parentNode.insertBefore(this._startAnchor,this._element),this._element.parentNode.insertBefore(this._endAnchor,this._element.nextSibling),this._hasAttached=!0),this._hasAttached)}focusInitialElementWhenReady(n){return new Promise(e=>{this._executeOnStable(()=>e(this.focusInitialElement(n)))})}focusFirstTabbableElementWhenReady(n){return new Promise(e=>{this._executeOnStable(()=>e(this.focusFirstTabbableElement(n)))})}focusLastTabbableElementWhenReady(n){return new Promise(e=>{this._executeOnStable(()=>e(this.focusLastTabbableElement(n)))})}_getRegionBoundary(n){let e=this._element.querySelectorAll(`[cdk-focus-region-${n}], [cdkFocusRegion${n}], [cdk-focus-${n}]`);return n=="start"?e.length?e[0]:this._getFirstTabbableElement(this._element):e.length?e[e.length-1]:this._getLastTabbableElement(this._element)}focusInitialElement(n){let e=this._element.querySelector("[cdk-focus-initial], [cdkFocusInitial]");if(e){if(!this._checker.isFocusable(e)){let i=this._getFirstTabbableElement(e);return i?.focus(n),!!i}return e.focus(n),!0}return this.focusFirstTabbableElement(n)}focusFirstTabbableElement(n){let e=this._getRegionBoundary("start");return e&&e.focus(n),!!e}focusLastTabbableElement(n){let e=this._getRegionBoundary("end");return e&&e.focus(n),!!e}hasAttached(){return this._hasAttached}_getFirstTabbableElement(n){if(this._checker.isFocusable(n)&&this._checker.isTabbable(n))return n;let e=n.children;for(let i=0;i<e.length;i++){let o=e[i].nodeType===this._document.ELEMENT_NODE?this._getFirstTabbableElement(e[i]):null;if(o)return o}return null}_getLastTabbableElement(n){if(this._checker.isFocusable(n)&&this._checker.isTabbable(n))return n;let e=n.children;for(let i=e.length-1;i>=0;i--){let o=e[i].nodeType===this._document.ELEMENT_NODE?this._getLastTabbableElement(e[i]):null;if(o)return o}return null}_createAnchor(){let n=this._document.createElement("div");return this._toggleAnchorTabIndex(this._enabled,n),n.classList.add("cdk-visually-hidden"),n.classList.add("cdk-focus-trap-anchor"),n.setAttribute("aria-hidden","true"),n}_toggleAnchorTabIndex(n,e){n?e.setAttribute("tabindex","0"):e.removeAttribute("tabindex")}toggleAnchors(n){this._startAnchor&&this._endAnchor&&(this._toggleAnchorTabIndex(n,this._startAnchor),this._toggleAnchorTabIndex(n,this._endAnchor))}_executeOnStable(n){this._injector?Ge(n,{injector:this._injector}):setTimeout(n)}},sp=(()=>{class t{_checker=u(rp);_ngZone=u(S);_document=u(k);_injector=u(F);constructor(){u(qe).load(Ec)}create(e,i=!1){return new op(e,this._checker,this._ngZone,this._document,i,this._injector)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var yb=new _("liveAnnouncerElement",{providedIn:"root",factory:()=>null}),bb=new _("LIVE_ANNOUNCER_DEFAULT_OPTIONS"),BS=0,ap=(()=>{class t{_ngZone=u(S);_defaultOptions=u(bb,{optional:!0});_liveElement;_document=u(k);_sanitizer=u(Xi);_previousTimeout;_currentPromise;_currentResolve;constructor(){let e=u(yb,{optional:!0});this._liveElement=e||this._createLiveElement()}announce(e,...i){let o=this._defaultOptions,r,s;return i.length===1&&typeof i[0]=="number"?s=i[0]:[r,s]=i,this.clear(),clearTimeout(this._previousTimeout),r||(r=o&&o.politeness?o.politeness:"polite"),s==null&&o&&(s=o.duration),this._liveElement.setAttribute("aria-live",r),this._liveElement.id&&this._exposeAnnouncerToModals(this._liveElement.id),this._ngZone.runOutsideAngular(()=>(this._currentPromise||(this._currentPromise=new Promise(a=>this._currentResolve=a)),clearTimeout(this._previousTimeout),this._previousTimeout=setTimeout(()=>{!e||typeof e=="string"?this._liveElement.textContent=e:fb(this._liveElement,e,this._sanitizer),typeof s=="number"&&(this._previousTimeout=setTimeout(()=>this.clear(),s)),this._currentResolve?.(),this._currentPromise=this._currentResolve=void 0},100),this._currentPromise))}clear(){this._liveElement&&(this._liveElement.textContent="")}ngOnDestroy(){clearTimeout(this._previousTimeout),this._liveElement?.remove(),this._liveElement=null,this._currentResolve?.(),this._currentPromise=this._currentResolve=void 0}_createLiveElement(){let e="cdk-live-announcer-element",i=this._document.getElementsByClassName(e),o=this._document.createElement("div");for(let r=0;r<i.length;r++)i[r].remove();return o.classList.add(e),o.classList.add("cdk-visually-hidden"),o.setAttribute("aria-atomic","true"),o.setAttribute("aria-live","polite"),o.id=`cdk-live-announcer-${BS++}`,this._document.body.appendChild(o),o}_exposeAnnouncerToModals(e){let i=this._document.querySelectorAll('body > .cdk-overlay-container [aria-modal="true"]');for(let o=0;o<i.length;o++){let r=i[o],s=r.getAttribute("aria-owns");s?s.indexOf(e)===-1&&r.setAttribute("aria-owns",s+" "+e):r.setAttribute("aria-owns",e)}}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var ei=(function(t){return t[t.NONE=0]="NONE",t[t.BLACK_ON_WHITE=1]="BLACK_ON_WHITE",t[t.WHITE_ON_BLACK=2]="WHITE_ON_BLACK",t})(ei||{}),gb="cdk-high-contrast-black-on-white",vb="cdk-high-contrast-white-on-black",ip="cdk-high-contrast-active",Db=(()=>{class t{_platform=u(ae);_hasCheckedHighContrastMode=!1;_document=u(k);_breakpointSubscription;constructor(){this._breakpointSubscription=u(Ts).observe("(forced-colors: active)").subscribe(()=>{this._hasCheckedHighContrastMode&&(this._hasCheckedHighContrastMode=!1,this._applyBodyHighContrastModeCssClasses())})}getHighContrastMode(){if(!this._platform.isBrowser)return ei.NONE;let e=this._document.createElement("div");e.style.backgroundColor="rgb(1,2,3)",e.style.position="absolute",this._document.body.appendChild(e);let i=this._document.defaultView||window,o=i&&i.getComputedStyle?i.getComputedStyle(e):null,r=(o&&o.backgroundColor||"").replace(/ /g,"");switch(e.remove(),r){case"rgb(0,0,0)":case"rgb(45,50,54)":case"rgb(32,32,32)":return ei.WHITE_ON_BLACK;case"rgb(255,255,255)":case"rgb(255,250,239)":return ei.BLACK_ON_WHITE}return ei.NONE}ngOnDestroy(){this._breakpointSubscription.unsubscribe()}_applyBodyHighContrastModeCssClasses(){if(!this._hasCheckedHighContrastMode&&this._platform.isBrowser&&this._document.body){let e=this._document.body.classList;e.remove(ip,gb,vb),this._hasCheckedHighContrastMode=!0;let i=this.getHighContrastMode();i===ei.BLACK_ON_WHITE?e.add(ip,gb):i===ei.WHITE_ON_BLACK&&e.add(ip,vb)}}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),As=(()=>{class t{constructor(){u(Db)._applyBodyHighContrastModeCssClasses()}static \u0275fac=function(i){return new(i||t)};static \u0275mod=q({type:t});static \u0275inj=z({imports:[wc]})}return t})();var jS=200,xc=class{_letterKeyStream=new C;_items=[];_selectedItemIndex=-1;_pressedLetters=[];_skipPredicateFn;_selectedItem=new C;selectedItem=this._selectedItem;constructor(n,e){let i=typeof e?.debounceInterval=="number"?e.debounceInterval:jS;e?.skipPredicate&&(this._skipPredicateFn=e.skipPredicate),this.setItems(n),this._setupKeyHandler(i)}destroy(){this._pressedLetters=[],this._letterKeyStream.complete(),this._selectedItem.complete()}setCurrentSelectedItemIndex(n){this._selectedItemIndex=n}setItems(n){this._items=n}handleKey(n){let e=n.keyCode;n.key&&n.key.length===1?this._letterKeyStream.next(n.key.toLocaleUpperCase()):(e>=65&&e<=90||e>=48&&e<=57)&&this._letterKeyStream.next(String.fromCharCode(e))}isTyping(){return this._pressedLetters.length>0}reset(){this._pressedLetters=[]}_setupKeyHandler(n){this._letterKeyStream.pipe(Ci(e=>this._pressedLetters.push(e)),Nr(n),Me(()=>this._pressedLetters.length>0),ve(()=>this._pressedLetters.join("").toLocaleUpperCase())).subscribe(e=>{for(let i=1;i<this._items.length+1;i++){let o=(this._selectedItemIndex+i)%this._items.length,r=this._items[o];if(!this._skipPredicateFn?.(r)&&r.getLabel?.().toLocaleUpperCase().trim().indexOf(e)===0){this._selectedItem.next(r);break}}this._pressedLetters=[]})}};function Ft(t,...n){return n.length?n.some(e=>t[e]):t.altKey||t.shiftKey||t.ctrlKey||t.metaKey}var Ic=class{_items;_activeItemIndex=N(-1);_activeItem=N(null);_wrap=!1;_typeaheadSubscription=de.EMPTY;_itemChangesSubscription;_vertical=!0;_horizontal=null;_allowedModifierKeys=[];_homeAndEnd=!1;_pageUpAndDown={enabled:!1,delta:10};_effectRef;_typeahead;_skipPredicateFn=n=>n.disabled;constructor(n,e){this._items=n,n instanceof In?this._itemChangesSubscription=n.changes.subscribe(i=>this._itemsChanged(i.toArray())):Yi(n)&&(this._effectRef=Gt(()=>this._itemsChanged(n()),{injector:e}))}tabOut=new C;change=new C;skipPredicate(n){return this._skipPredicateFn=n,this}withWrap(n=!0){return this._wrap=n,this}withVerticalOrientation(n=!0){return this._vertical=n,this}withHorizontalOrientation(n){return this._horizontal=n,this}withAllowedModifierKeys(n){return this._allowedModifierKeys=n,this}withTypeAhead(n=200){this._typeaheadSubscription.unsubscribe();let e=this._getItemsArray();return this._typeahead=new xc(e,{debounceInterval:typeof n=="number"?n:void 0,skipPredicate:i=>this._skipPredicateFn(i)}),this._typeaheadSubscription=this._typeahead.selectedItem.subscribe(i=>{this.setActiveItem(i)}),this}cancelTypeahead(){return this._typeahead?.reset(),this}withHomeAndEnd(n=!0){return this._homeAndEnd=n,this}withPageUpDown(n=!0,e=10){return this._pageUpAndDown={enabled:n,delta:e},this}setActiveItem(n){let e=this._activeItem();this.updateActiveItem(n),this._activeItem()!==e&&this.change.next(this._activeItemIndex())}onKeydown(n){let e=n.keyCode,o=["altKey","ctrlKey","metaKey","shiftKey"].every(r=>!n[r]||this._allowedModifierKeys.indexOf(r)>-1);switch(e){case 9:this.tabOut.next();return;case 40:if(this._vertical&&o){this.setNextItemActive();break}else return;case 38:if(this._vertical&&o){this.setPreviousItemActive();break}else return;case 39:if(this._horizontal&&o){this._horizontal==="rtl"?this.setPreviousItemActive():this.setNextItemActive();break}else return;case 37:if(this._horizontal&&o){this._horizontal==="rtl"?this.setNextItemActive():this.setPreviousItemActive();break}else return;case 36:if(this._homeAndEnd&&o){this.setFirstItemActive();break}else return;case 35:if(this._homeAndEnd&&o){this.setLastItemActive();break}else return;case 33:if(this._pageUpAndDown.enabled&&o){let r=this._activeItemIndex()-this._pageUpAndDown.delta;this._setActiveItemByIndex(r>0?r:0,1);break}else return;case 34:if(this._pageUpAndDown.enabled&&o){let r=this._activeItemIndex()+this._pageUpAndDown.delta,s=this._getItemsArray().length;this._setActiveItemByIndex(r<s?r:s-1,-1);break}else return;default:(o||Ft(n,"shiftKey"))&&this._typeahead?.handleKey(n);return}this._typeahead?.reset(),n.preventDefault()}get activeItemIndex(){return this._activeItemIndex()}get activeItem(){return this._activeItem()}isTyping(){return!!this._typeahead&&this._typeahead.isTyping()}setFirstItemActive(){this._setActiveItemByIndex(0,1)}setLastItemActive(){this._setActiveItemByIndex(this._getItemsArray().length-1,-1)}setNextItemActive(){this._activeItemIndex()<0?this.setFirstItemActive():this._setActiveItemByDelta(1)}setPreviousItemActive(){this._activeItemIndex()<0&&this._wrap?this.setLastItemActive():this._setActiveItemByDelta(-1)}updateActiveItem(n){let e=this._getItemsArray(),i=typeof n=="number"?n:e.indexOf(n),o=e[i];this._activeItem.set(o??null),this._activeItemIndex.set(i),this._typeahead?.setCurrentSelectedItemIndex(i)}destroy(){this._typeaheadSubscription.unsubscribe(),this._itemChangesSubscription?.unsubscribe(),this._effectRef?.destroy(),this._typeahead?.destroy(),this.tabOut.complete(),this.change.complete()}_setActiveItemByDelta(n){this._wrap?this._setActiveInWrapMode(n):this._setActiveInDefaultMode(n)}_setActiveInWrapMode(n){let e=this._getItemsArray();for(let i=1;i<=e.length;i++){let o=(this._activeItemIndex()+n*i+e.length)%e.length,r=e[o];if(!this._skipPredicateFn(r)){this.setActiveItem(o);return}}}_setActiveInDefaultMode(n){this._setActiveItemByIndex(this._activeItemIndex()+n,n)}_setActiveItemByIndex(n,e){let i=this._getItemsArray();if(i[n]){for(;this._skipPredicateFn(i[n]);)if(n+=e,!i[n])return;this.setActiveItem(n)}}_getItemsArray(){return Yi(this._items)?this._items():this._items instanceof In?this._items.toArray():this._items}_itemsChanged(n){this._typeahead?.setItems(n);let e=this._activeItem();if(e){let i=n.indexOf(e);i>-1&&i!==this._activeItemIndex()&&(this._activeItemIndex.set(i),this._typeahead?.setCurrentSelectedItemIndex(i))}}};var Ns=class extends Ic{_origin="program";setFocusOrigin(n){return this._origin=n,this}setActiveItem(n){super.setActiveItem(n),this.activeItem&&this.activeItem.focus(this._origin)}};var lp={},ke=class t{_appId=u(Kn);static _infix=`a${Math.floor(Math.random()*1e5).toString()}`;getId(n,e=!1){return this._appId!=="ng"&&(n+=this._appId),lp.hasOwnProperty(n)||(lp[n]=0),`${n}${e?t._infix+"-":""}${lp[n]++}`}static \u0275fac=function(e){return new(e||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})};var Eb=" ";function HS(t,n,e){let i=Ac(t,n);e=e.trim(),!i.some(o=>o.trim()===e)&&(i.push(e),t.setAttribute(n,i.join(Eb)))}function US(t,n,e){let i=Ac(t,n);e=e.trim();let o=i.filter(r=>r!==e);o.length?t.setAttribute(n,o.join(Eb)):t.removeAttribute(n)}function Ac(t,n){return t.getAttribute(n)?.match(/\S+/g)??[]}var wb="cdk-describedby-message",Tc="cdk-describedby-host",dp=0,xb=(()=>{class t{_platform=u(ae);_document=u(k);_messageRegistry=new Map;_messagesContainer=null;_id=`${dp++}`;constructor(){u(qe).load(Ec),this._id=u(Kn)+"-"+dp++}describe(e,i,o){if(!this._canBeDescribed(e,i))return;let r=cp(i,o);typeof i!="string"?(Cb(i,this._id),this._messageRegistry.set(r,{messageElement:i,referenceCount:0})):this._messageRegistry.has(r)||this._createMessageElement(i,o),this._isElementDescribedByMessage(e,r)||this._addMessageReference(e,r)}removeDescription(e,i,o){if(!i||!this._isElementNode(e))return;let r=cp(i,o);if(this._isElementDescribedByMessage(e,r)&&this._removeMessageReference(e,r),typeof i=="string"){let s=this._messageRegistry.get(r);s&&s.referenceCount===0&&this._deleteMessageElement(r)}this._messagesContainer?.childNodes.length===0&&(this._messagesContainer.remove(),this._messagesContainer=null)}ngOnDestroy(){let e=this._document.querySelectorAll(`[${Tc}="${this._id}"]`);for(let i=0;i<e.length;i++)this._removeCdkDescribedByReferenceIds(e[i]),e[i].removeAttribute(Tc);this._messagesContainer?.remove(),this._messagesContainer=null,this._messageRegistry.clear()}_createMessageElement(e,i){let o=this._document.createElement("div");Cb(o,this._id),o.textContent=e,i&&o.setAttribute("role",i),this._createMessagesContainer(),this._messagesContainer.appendChild(o),this._messageRegistry.set(cp(e,i),{messageElement:o,referenceCount:0})}_deleteMessageElement(e){this._messageRegistry.get(e)?.messageElement?.remove(),this._messageRegistry.delete(e)}_createMessagesContainer(){if(this._messagesContainer)return;let e="cdk-describedby-message-container",i=this._document.querySelectorAll(`.${e}[platform="server"]`);for(let r=0;r<i.length;r++)i[r].remove();let o=this._document.createElement("div");o.style.visibility="hidden",o.classList.add(e),o.classList.add("cdk-visually-hidden"),this._platform.isBrowser||o.setAttribute("platform","server"),this._document.body.appendChild(o),this._messagesContainer=o}_removeCdkDescribedByReferenceIds(e){let i=Ac(e,"aria-describedby").filter(o=>o.indexOf(wb)!=0);e.setAttribute("aria-describedby",i.join(" "))}_addMessageReference(e,i){let o=this._messageRegistry.get(i);HS(e,"aria-describedby",o.messageElement.id),e.setAttribute(Tc,this._id),o.referenceCount++}_removeMessageReference(e,i){let o=this._messageRegistry.get(i);o.referenceCount--,US(e,"aria-describedby",o.messageElement.id),e.removeAttribute(Tc)}_isElementDescribedByMessage(e,i){let o=Ac(e,"aria-describedby"),r=this._messageRegistry.get(i),s=r&&r.messageElement.id;return!!s&&o.indexOf(s)!=-1}_canBeDescribed(e,i){if(!this._isElementNode(e))return!1;if(i&&typeof i=="object")return!0;let o=i==null?"":`${i}`.trim(),r=e.getAttribute("aria-label");return o?!r||r.trim()!==o:!1}_isElementNode(e){return e.nodeType===this._document.ELEMENT_NODE}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function cp(t,n){return typeof t=="string"?`${n||""}/${t}`:t}function Cb(t,n){t.id||(t.id=`${wb}-${n}-${dp++}`)}var en=(function(t){return t[t.NORMAL=0]="NORMAL",t[t.NEGATED=1]="NEGATED",t[t.INVERTED=2]="INVERTED",t})(en||{}),kc,no;function Rc(){if(no==null){if(typeof document!="object"||!document||typeof Element!="function"||!Element)return no=!1,no;if(document.documentElement?.style&&"scrollBehavior"in document.documentElement.style)no=!0;else{let t=Element.prototype.scrollTo;t?no=!/\{\s*\[native code\]\s*\}/.test(t.toString()):no=!1}}return no}function tr(){if(typeof document!="object"||!document)return en.NORMAL;if(kc==null){let t=document.createElement("div"),n=t.style;t.dir="rtl",n.width="1px",n.overflow="auto",n.visibility="hidden",n.pointerEvents="none",n.position="absolute";let e=document.createElement("div"),i=e.style;i.width="2px",i.height="1px",t.appendChild(e),document.body.appendChild(t),kc=en.NORMAL,t.scrollLeft===0&&(t.scrollLeft=1,kc=t.scrollLeft===0?en.NEGATED:en.INVERTED),t.remove()}return kc}function up(){return typeof __karma__<"u"&&!!__karma__||typeof jasmine<"u"&&!!jasmine||typeof jest<"u"&&!!jest||typeof Mocha<"u"&&!!Mocha}var nr,Ib=["color","button","checkbox","date","datetime-local","email","file","hidden","image","month","number","password","radio","range","reset","search","submit","tel","text","time","url","week"];function fp(){if(nr)return nr;if(typeof document!="object"||!document)return nr=new Set(Ib),nr;let t=document.createElement("input");return nr=new Set(Ib.filter(n=>(t.setAttribute("type",n),t.type===n))),nr}var Mb={XSmall:"(max-width: 599.98px)",Small:"(min-width: 600px) and (max-width: 959.98px)",Medium:"(min-width: 960px) and (max-width: 1279.98px)",Large:"(min-width: 1280px) and (max-width: 1919.98px)",XLarge:"(min-width: 1920px)",Handset:"(max-width: 599.98px) and (orientation: portrait), (max-width: 959.98px) and (orientation: landscape)",Tablet:"(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait), (min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)",Web:"(min-width: 840px) and (orientation: portrait), (min-width: 1280px) and (orientation: landscape)",HandsetPortrait:"(max-width: 599.98px) and (orientation: portrait)",TabletPortrait:"(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait)",WebPortrait:"(min-width: 840px) and (orientation: portrait)",HandsetLandscape:"(max-width: 959.98px) and (orientation: landscape)",TabletLandscape:"(min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)",WebLandscape:"(min-width: 1280px) and (orientation: landscape)"};var zS=new _("MATERIAL_ANIMATIONS"),Sb=null;function mp(){return u(zS,{optional:!0})?.animationsDisabled||u(as,{optional:!0})==="NoopAnimations"?"di-disabled":(Sb??=u(er).matchMedia("(prefers-reduced-motion)").matches,Sb?"reduced-motion":"enabled")}function Ee(){return mp()!=="enabled"}function Oe(t){return t==null?"":typeof t=="string"?t:`${t}px`}function Rn(t){return t!=null&&`${t}`!="false"}var Pt=(function(t){return t[t.FADING_IN=0]="FADING_IN",t[t.VISIBLE=1]="VISIBLE",t[t.FADING_OUT=2]="FADING_OUT",t[t.HIDDEN=3]="HIDDEN",t})(Pt||{}),pp=class{_renderer;element;config;_animationForciblyDisabledThroughCss;state=Pt.HIDDEN;constructor(n,e,i,o=!1){this._renderer=n,this.element=e,this.config=i,this._animationForciblyDisabledThroughCss=o}fadeOut(){this._renderer.fadeOutRipple(this)}},Tb=Qo({passive:!0,capture:!0}),hp=class{_events=new Map;addHandler(n,e,i,o){let r=this._events.get(e);if(r){let s=r.get(i);s?s.add(o):r.set(i,new Set([o]))}else this._events.set(e,new Map([[i,new Set([o])]])),n.runOutsideAngular(()=>{document.addEventListener(e,this._delegateEventHandler,Tb)})}removeHandler(n,e,i){let o=this._events.get(n);if(!o)return;let r=o.get(e);r&&(r.delete(i),r.size===0&&o.delete(e),o.size===0&&(this._events.delete(n),document.removeEventListener(n,this._delegateEventHandler,Tb)))}_delegateEventHandler=n=>{let e=ut(n);e&&this._events.get(n.type)?.forEach((i,o)=>{(o===e||o.contains(e))&&i.forEach(r=>r.handleEvent(n))})}},Os={enterDuration:225,exitDuration:150},$S=800,Ab=Qo({passive:!0,capture:!0}),kb=["mousedown","touchstart"],Rb=["mouseup","mouseleave","touchend","touchcancel"],GS=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275cmp=j({type:t,selectors:[["ng-component"]],hostAttrs:["mat-ripple-style-loader",""],decls:0,vars:0,template:function(i,o){},styles:[`.mat-ripple {
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
`],encapsulation:2,changeDetection:0})}return t})(),Fs=class t{_target;_ngZone;_platform;_containerElement;_triggerElement=null;_isPointerDown=!1;_activeRipples=new Map;_mostRecentTransientRipple=null;_lastTouchStartEvent;_pointerUpEventsRegistered=!1;_containerRect=null;static _eventManager=new hp;constructor(n,e,i,o,r){this._target=n,this._ngZone=e,this._platform=o,o.isBrowser&&(this._containerElement=yt(i)),r&&r.get(qe).load(GS)}fadeInRipple(n,e,i={}){let o=this._containerRect=this._containerRect||this._containerElement.getBoundingClientRect(),r=D(D({},Os),i.animation);i.centered&&(n=o.left+o.width/2,e=o.top+o.height/2);let s=i.radius||WS(n,e,o),a=n-o.left,l=e-o.top,c=r.enterDuration,d=document.createElement("div");d.classList.add("mat-ripple-element"),d.style.left=`${a-s}px`,d.style.top=`${l-s}px`,d.style.height=`${s*2}px`,d.style.width=`${s*2}px`,i.color!=null&&(d.style.backgroundColor=i.color),d.style.transitionDuration=`${c}ms`,this._containerElement.appendChild(d);let f=window.getComputedStyle(d),p=f.transitionProperty,m=f.transitionDuration,v=p==="none"||m==="0s"||m==="0s, 0s"||o.width===0&&o.height===0,w=new pp(this,d,i,v);d.style.transform="scale3d(1, 1, 1)",w.state=Pt.FADING_IN,i.persistent||(this._mostRecentTransientRipple=w);let I=null;return!v&&(c||r.exitDuration)&&this._ngZone.runOutsideAngular(()=>{let T=()=>{I&&(I.fallbackTimer=null),clearTimeout(ft),this._finishRippleTransition(w)},ye=()=>this._destroyRipple(w),ft=setTimeout(ye,c+100);d.addEventListener("transitionend",T),d.addEventListener("transitioncancel",ye),I={onTransitionEnd:T,onTransitionCancel:ye,fallbackTimer:ft}}),this._activeRipples.set(w,I),(v||!c)&&this._finishRippleTransition(w),w}fadeOutRipple(n){if(n.state===Pt.FADING_OUT||n.state===Pt.HIDDEN)return;let e=n.element,i=D(D({},Os),n.config.animation);e.style.transitionDuration=`${i.exitDuration}ms`,e.style.opacity="0",n.state=Pt.FADING_OUT,(n._animationForciblyDisabledThroughCss||!i.exitDuration)&&this._finishRippleTransition(n)}fadeOutAll(){this._getActiveRipples().forEach(n=>n.fadeOut())}fadeOutAllNonPersistent(){this._getActiveRipples().forEach(n=>{n.config.persistent||n.fadeOut()})}setupTriggerEvents(n){let e=yt(n);!this._platform.isBrowser||!e||e===this._triggerElement||(this._removeTriggerEvents(),this._triggerElement=e,kb.forEach(i=>{t._eventManager.addHandler(this._ngZone,i,e,this)}))}handleEvent(n){n.type==="mousedown"?this._onMousedown(n):n.type==="touchstart"?this._onTouchStart(n):this._onPointerUp(),this._pointerUpEventsRegistered||(this._ngZone.runOutsideAngular(()=>{Rb.forEach(e=>{this._triggerElement.addEventListener(e,this,Ab)})}),this._pointerUpEventsRegistered=!0)}_finishRippleTransition(n){n.state===Pt.FADING_IN?this._startFadeOutTransition(n):n.state===Pt.FADING_OUT&&this._destroyRipple(n)}_startFadeOutTransition(n){let e=n===this._mostRecentTransientRipple,{persistent:i}=n.config;n.state=Pt.VISIBLE,!i&&(!e||!this._isPointerDown)&&n.fadeOut()}_destroyRipple(n){let e=this._activeRipples.get(n)??null;this._activeRipples.delete(n),this._activeRipples.size||(this._containerRect=null),n===this._mostRecentTransientRipple&&(this._mostRecentTransientRipple=null),n.state=Pt.HIDDEN,e!==null&&(n.element.removeEventListener("transitionend",e.onTransitionEnd),n.element.removeEventListener("transitioncancel",e.onTransitionCancel),e.fallbackTimer!==null&&clearTimeout(e.fallbackTimer)),n.element.remove()}_onMousedown(n){let e=Qi(n),i=this._lastTouchStartEvent&&Date.now()<this._lastTouchStartEvent+$S;!this._target.rippleDisabled&&!e&&!i&&(this._isPointerDown=!0,this.fadeInRipple(n.clientX,n.clientY,this._target.rippleConfig))}_onTouchStart(n){if(!this._target.rippleDisabled&&!Ji(n)){this._lastTouchStartEvent=Date.now(),this._isPointerDown=!0;let e=n.changedTouches;if(e)for(let i=0;i<e.length;i++)this.fadeInRipple(e[i].clientX,e[i].clientY,this._target.rippleConfig)}}_onPointerUp(){this._isPointerDown&&(this._isPointerDown=!1,this._getActiveRipples().forEach(n=>{let e=n.state===Pt.VISIBLE||n.config.terminateOnPointerUp&&n.state===Pt.FADING_IN;!n.config.persistent&&e&&n.fadeOut()}))}_getActiveRipples(){return Array.from(this._activeRipples.keys())}_removeTriggerEvents(){let n=this._triggerElement;n&&(kb.forEach(e=>t._eventManager.removeHandler(e,n,this)),this._pointerUpEventsRegistered&&(Rb.forEach(e=>n.removeEventListener(e,this,Ab)),this._pointerUpEventsRegistered=!1))}};function WS(t,n,e){let i=Math.max(Math.abs(t-e.left),Math.abs(t-e.right)),o=Math.max(Math.abs(n-e.top),Math.abs(n-e.bottom));return Math.sqrt(i*i+o*o)}var gp=new _("mat-ripple-global-options"),Nc=(()=>{class t{_elementRef=u(B);_animationsDisabled=Ee();color;unbounded=!1;centered=!1;radius=0;animation;get disabled(){return this._disabled}set disabled(e){e&&this.fadeOutAllNonPersistent(),this._disabled=e,this._setupTriggerEventsIfEnabled()}_disabled=!1;get trigger(){return this._trigger||this._elementRef.nativeElement}set trigger(e){this._trigger=e,this._setupTriggerEventsIfEnabled()}_trigger;_rippleRenderer;_globalOptions;_isInitialized=!1;constructor(){let e=u(S),i=u(ae),o=u(gp,{optional:!0}),r=u(F);this._globalOptions=o||{},this._rippleRenderer=new Fs(this,e,this._elementRef,i,r)}ngOnInit(){this._isInitialized=!0,this._setupTriggerEventsIfEnabled()}ngOnDestroy(){this._rippleRenderer._removeTriggerEvents()}fadeOutAll(){this._rippleRenderer.fadeOutAll()}fadeOutAllNonPersistent(){this._rippleRenderer.fadeOutAllNonPersistent()}get rippleConfig(){return{centered:this.centered,radius:this.radius,color:this.color,animation:D(D(D({},this._globalOptions.animation),this._animationsDisabled?{enterDuration:0,exitDuration:0}:{}),this.animation),terminateOnPointerUp:this._globalOptions.terminateOnPointerUp}}get rippleDisabled(){return this.disabled||!!this._globalOptions.disabled}_setupTriggerEventsIfEnabled(){!this.disabled&&this._isInitialized&&this._rippleRenderer.setupTriggerEvents(this.trigger)}launch(e,i=0,o){return typeof e=="number"?this._rippleRenderer.fadeInRipple(e,i,D(D({},this.rippleConfig),o)):this._rippleRenderer.fadeInRipple(0,0,D(D({},this.rippleConfig),e))}static \u0275fac=function(i){return new(i||t)};static \u0275dir=L({type:t,selectors:[["","mat-ripple",""],["","matRipple",""]],hostAttrs:[1,"mat-ripple"],hostVars:2,hostBindings:function(i,o){i&2&&V("mat-ripple-unbounded",o.unbounded)},inputs:{color:[0,"matRippleColor","color"],unbounded:[0,"matRippleUnbounded","unbounded"],centered:[0,"matRippleCentered","centered"],radius:[0,"matRippleRadius","radius"],animation:[0,"matRippleAnimation","animation"],disabled:[0,"matRippleDisabled","disabled"],trigger:[0,"matRippleTrigger","trigger"]},exportAs:["matRipple"]})}return t})();var qS={capture:!0},YS=["focus","mousedown","mouseenter","touchstart"],vp="mat-ripple-loader-uninitialized",_p="mat-ripple-loader-class-name",Nb="mat-ripple-loader-centered",Oc="mat-ripple-loader-disabled",Ob=(()=>{class t{_document=u(k);_animationsDisabled=Ee();_globalRippleOptions=u(gp,{optional:!0});_platform=u(ae);_ngZone=u(S);_injector=u(F);_eventCleanups;_hosts=new Map;constructor(){let e=u(Fe).createRenderer(null,null);this._eventCleanups=this._ngZone.runOutsideAngular(()=>YS.map(i=>e.listen(this._document,i,this._onInteraction,qS)))}ngOnDestroy(){let e=this._hosts.keys();for(let i of e)this.destroyRipple(i);this._eventCleanups.forEach(i=>i())}configureRipple(e,i){e.setAttribute(vp,this._globalRippleOptions?.namespace??""),(i.className||!e.hasAttribute(_p))&&e.setAttribute(_p,i.className||""),i.centered&&e.setAttribute(Nb,""),i.disabled&&e.setAttribute(Oc,"")}setDisabled(e,i){let o=this._hosts.get(e);o?(o.target.rippleDisabled=i,!i&&!o.hasSetUpEvents&&(o.hasSetUpEvents=!0,o.renderer.setupTriggerEvents(e))):i?e.setAttribute(Oc,""):e.removeAttribute(Oc)}_onInteraction=e=>{let i=ut(e);if(i instanceof HTMLElement){let o=i.closest(`[${vp}="${this._globalRippleOptions?.namespace??""}"]`);o&&this._createRipple(o)}};_createRipple(e){if(!this._document||this._hosts.has(e))return;e.querySelector(".mat-ripple")?.remove();let i=this._document.createElement("span");i.classList.add("mat-ripple",e.getAttribute(_p)),e.append(i);let o=this._globalRippleOptions,r=this._animationsDisabled?0:o?.animation?.enterDuration??Os.enterDuration,s=this._animationsDisabled?0:o?.animation?.exitDuration??Os.exitDuration,a={rippleDisabled:this._animationsDisabled||o?.disabled||e.hasAttribute(Oc),rippleConfig:{centered:e.hasAttribute(Nb),terminateOnPointerUp:o?.terminateOnPointerUp,animation:{enterDuration:r,exitDuration:s}}},l=new Fs(a,this._ngZone,i,this._platform,this._injector),c=!a.rippleDisabled;c&&l.setupTriggerEvents(e),this._hosts.set(e,{target:a,renderer:l,hasSetUpEvents:c}),e.removeAttribute(vp)}destroyRipple(e){let i=this._hosts.get(e);i&&(i.renderer._removeTriggerEvents(),this._hosts.delete(e))}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var ir=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275cmp=j({type:t,selectors:[["structural-styles"]],decls:0,vars:0,template:function(i,o){},styles:[`.mat-focus-indicator {
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
`],encapsulation:2,changeDetection:0})}return t})();var ZS=["mat-icon-button",""],KS=["*"],XS=new _("MAT_BUTTON_CONFIG");function Fb(t){return t==null?void 0:qo(t)}var Fc=(()=>{class t{_elementRef=u(B);_ngZone=u(S);_animationsDisabled=Ee();_config=u(XS,{optional:!0});_focusMonitor=u(Ot);_cleanupClick;_renderer=u(Ae);_rippleLoader=u(Ob);_isAnchor;_isFab=!1;color;get disableRipple(){return this._disableRipple}set disableRipple(e){this._disableRipple=e,this._updateRippleDisabled()}_disableRipple=!1;get disabled(){return this._disabled}set disabled(e){this._disabled=e,this._updateRippleDisabled()}_disabled=!1;ariaDisabled;disabledInteractive;tabIndex;set _tabindex(e){this.tabIndex=e}constructor(){u(qe).load(ir);let e=this._elementRef.nativeElement;this._isAnchor=e.tagName==="A",this.disabledInteractive=this._config?.disabledInteractive??!1,this.color=this._config?.color??null,this._rippleLoader?.configureRipple(e,{className:"mat-mdc-button-ripple"})}ngAfterViewInit(){this._focusMonitor.monitor(this._elementRef,!0),this._isAnchor&&this._setupAsAnchor()}ngOnDestroy(){this._cleanupClick?.(),this._focusMonitor.stopMonitoring(this._elementRef),this._rippleLoader?.destroyRipple(this._elementRef.nativeElement)}focus(e="program",i){e?this._focusMonitor.focusVia(this._elementRef.nativeElement,e,i):this._elementRef.nativeElement.focus(i)}_getAriaDisabled(){return this.ariaDisabled!=null?this.ariaDisabled:this._isAnchor?this.disabled||null:this.disabled&&this.disabledInteractive?!0:null}_getDisabledAttribute(){return this.disabledInteractive||!this.disabled?null:!0}_updateRippleDisabled(){this._rippleLoader?.setDisabled(this._elementRef.nativeElement,this.disableRipple||this.disabled)}_getTabIndex(){return this._isAnchor?this.disabled&&!this.disabledInteractive?-1:this.tabIndex:this.tabIndex}_setupAsAnchor(){this._cleanupClick=this._ngZone.runOutsideAngular(()=>this._renderer.listen(this._elementRef.nativeElement,"click",e=>{this.disabled&&(e.preventDefault(),e.stopImmediatePropagation())}))}static \u0275fac=function(i){return new(i||t)};static \u0275dir=L({type:t,hostAttrs:[1,"mat-mdc-button-base"],hostVars:13,hostBindings:function(i,o){i&2&&(Z("disabled",o._getDisabledAttribute())("aria-disabled",o._getAriaDisabled())("tabindex",o._getTabIndex()),Jt(o.color?"mat-"+o.color:""),V("mat-mdc-button-disabled",o.disabled)("mat-mdc-button-disabled-interactive",o.disabledInteractive)("mat-unthemed",!o.color)("_mat-animation-noopable",o._animationsDisabled))},inputs:{color:"color",disableRipple:[2,"disableRipple","disableRipple",ce],disabled:[2,"disabled","disabled",ce],ariaDisabled:[2,"aria-disabled","ariaDisabled",ce],disabledInteractive:[2,"disabledInteractive","disabledInteractive",ce],tabIndex:[2,"tabIndex","tabIndex",Fb],_tabindex:[2,"tabindex","_tabindex",Fb]}})}return t})(),io=(()=>{class t extends Fc{constructor(){super(),this._rippleLoader.configureRipple(this._elementRef.nativeElement,{centered:!0})}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=j({type:t,selectors:[["button","mat-icon-button",""],["a","mat-icon-button",""],["button","matIconButton",""],["a","matIconButton",""]],hostAttrs:[1,"mdc-icon-button","mat-mdc-icon-button"],exportAs:["matButton","matAnchor"],features:[he],attrs:ZS,ngContentSelectors:KS,decls:4,vars:0,consts:[[1,"mat-mdc-button-persistent-ripple","mdc-icon-button__ripple"],[1,"mat-focus-indicator"],[1,"mat-mdc-button-touch-target"]],template:function(i,o){i&1&&(Ye(),dt(0,"span",0),me(1),dt(2,"span",1)(3,"span",2))},styles:[`.mat-mdc-icon-button {
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
`],encapsulation:2,changeDetection:0})}return t})();var QS=new _("cdk-dir-doc",{providedIn:"root",factory:()=>u(k)}),JS=/^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;function Pb(t){let n=t?.toLowerCase()||"";return n==="auto"&&typeof navigator<"u"&&navigator?.language?JS.test(navigator.language)?"rtl":"ltr":n==="rtl"?"rtl":"ltr"}var Je=(()=>{class t{get value(){return this.valueSignal()}valueSignal=N("ltr");change=new se;constructor(){let e=u(QS,{optional:!0});if(e){let i=e.body?e.body.dir:null,o=e.documentElement?e.documentElement.dir:null;this.valueSignal.set(Pb(i||o||"ltr"))}}ngOnDestroy(){this.change.complete()}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var be=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=q({type:t});static \u0275inj=z({})}return t})();var or=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=q({type:t});static \u0275inj=z({imports:[be]})}return t})();var eT=["matButton",""],Vb=[[["",8,"material-icons",3,"iconPositionEnd",""],["mat-icon",3,"iconPositionEnd",""],["","matButtonIcon","",3,"iconPositionEnd",""]],"*",[["","iconPositionEnd","",8,"material-icons"],["mat-icon","iconPositionEnd",""],["","matButtonIcon","","iconPositionEnd",""]]],Bb=[".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd]), [matButtonIcon]:not([iconPositionEnd])","*",".material-icons[iconPositionEnd], mat-icon[iconPositionEnd], [matButtonIcon][iconPositionEnd]"],tT=["mat-fab",""];var Lb=new Map([["text",["mat-mdc-button"]],["filled",["mdc-button--unelevated","mat-mdc-unelevated-button"]],["elevated",["mdc-button--raised","mat-mdc-raised-button"]],["outlined",["mdc-button--outlined","mat-mdc-outlined-button"]],["tonal",["mat-tonal-button"]]]),rr=(()=>{class t extends Fc{get appearance(){return this._appearance}set appearance(e){this.setAppearance(e||this._config?.defaultAppearance||"text")}_appearance=null;constructor(){super();let e=nT(this._elementRef.nativeElement);e&&this.setAppearance(e)}setAppearance(e){if(e===this._appearance)return;let i=this._elementRef.nativeElement.classList,o=this._appearance?Lb.get(this._appearance):null,r=Lb.get(e);o&&i.remove(...o),i.add(...r),this._appearance=e}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=j({type:t,selectors:[["button","matButton",""],["a","matButton",""],["button","mat-button",""],["button","mat-raised-button",""],["button","mat-flat-button",""],["button","mat-stroked-button",""],["a","mat-button",""],["a","mat-raised-button",""],["a","mat-flat-button",""],["a","mat-stroked-button",""]],hostAttrs:[1,"mdc-button"],inputs:{appearance:[0,"matButton","appearance"]},exportAs:["matButton","matAnchor"],features:[he],attrs:eT,ngContentSelectors:Bb,decls:7,vars:4,consts:[[1,"mat-mdc-button-persistent-ripple"],[1,"mdc-button__label"],[1,"mat-focus-indicator"],[1,"mat-mdc-button-touch-target"]],template:function(i,o){i&1&&(Ye(Vb),dt(0,"span",0),me(1),ot(2,"span",1),me(3,1),_t(),me(4,2),dt(5,"span",2)(6,"span",3)),i&2&&V("mdc-button__ripple",!o._isFab)("mdc-fab__ripple",o._isFab)},styles:[`.mat-mdc-button-base {
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
`],encapsulation:2,changeDetection:0})}return t})();function nT(t){return t.hasAttribute("mat-raised-button")?"elevated":t.hasAttribute("mat-stroked-button")?"outlined":t.hasAttribute("mat-flat-button")?"filled":t.hasAttribute("mat-button")?"text":null}var iT=new _("mat-mdc-fab-default-options",{providedIn:"root",factory:()=>yp}),yp={color:"accent"},jb=(()=>{class t extends Fc{_options=u(iT,{optional:!0});_isFab=!0;extended=!1;constructor(){super(),this._options=this._options||yp,this.color=this._options.color||yp.color}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=j({type:t,selectors:[["button","mat-fab",""],["a","mat-fab",""],["button","matFab",""],["a","matFab",""]],hostAttrs:[1,"mdc-fab","mat-mdc-fab-base","mat-mdc-fab"],hostVars:4,hostBindings:function(i,o){i&2&&V("mdc-fab--extended",o.extended)("mat-mdc-extended-fab",o.extended)},inputs:{extended:[2,"extended","extended",ce]},exportAs:["matButton","matAnchor"],features:[he],attrs:tT,ngContentSelectors:Bb,decls:7,vars:4,consts:[[1,"mat-mdc-button-persistent-ripple"],[1,"mdc-button__label"],[1,"mat-focus-indicator"],[1,"mat-mdc-button-touch-target"]],template:function(i,o){i&1&&(Ye(Vb),dt(0,"span",0),me(1),ot(2,"span",1),me(3,1),_t(),me(4,2),dt(5,"span",2)(6,"span",3)),i&2&&V("mdc-button__ripple",!o._isFab)("mdc-fab__ripple",o._isFab)},styles:[`.mat-mdc-fab-base {
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
`],encapsulation:2,changeDetection:0})}return t})();var Nn=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=q({type:t});static \u0275inj=z({imports:[or,be]})}return t})();var Ps=class{_multiple;_emitChanges;compareWith;_selection=new Set;_deselectedToEmit=[];_selectedToEmit=[];_selected=null;get selected(){return this._selected||(this._selected=Array.from(this._selection.values())),this._selected}changed=new C;constructor(n=!1,e,i=!0,o){this._multiple=n,this._emitChanges=i,this.compareWith=o,e&&e.length&&(n?e.forEach(r=>this._markSelected(r)):this._markSelected(e[0]),this._selectedToEmit.length=0)}select(...n){this._verifyValueAssignment(n),n.forEach(i=>this._markSelected(i));let e=this._hasQueuedChanges();return this._emitChangeEvent(),e}deselect(...n){this._verifyValueAssignment(n),n.forEach(i=>this._unmarkSelected(i));let e=this._hasQueuedChanges();return this._emitChangeEvent(),e}setSelection(...n){this._verifyValueAssignment(n);let e=this.selected,i=new Set(n.map(r=>this._getConcreteValue(r)));n.forEach(r=>this._markSelected(r)),e.filter(r=>!i.has(this._getConcreteValue(r,i))).forEach(r=>this._unmarkSelected(r));let o=this._hasQueuedChanges();return this._emitChangeEvent(),o}toggle(n){return this.isSelected(n)?this.deselect(n):this.select(n)}clear(n=!0){this._unmarkAll();let e=this._hasQueuedChanges();return n&&this._emitChangeEvent(),e}isSelected(n){return this._selection.has(this._getConcreteValue(n))}isEmpty(){return this._selection.size===0}hasValue(){return!this.isEmpty()}sort(n){this._multiple&&this.selected&&this._selected.sort(n)}isMultipleSelection(){return this._multiple}_emitChangeEvent(){this._selected=null,(this._selectedToEmit.length||this._deselectedToEmit.length)&&(this.changed.next({source:this,added:this._selectedToEmit,removed:this._deselectedToEmit}),this._deselectedToEmit=[],this._selectedToEmit=[])}_markSelected(n){n=this._getConcreteValue(n),this.isSelected(n)||(this._multiple||this._unmarkAll(),this.isSelected(n)||this._selection.add(n),this._emitChanges&&this._selectedToEmit.push(n))}_unmarkSelected(n){n=this._getConcreteValue(n),this.isSelected(n)&&(this._selection.delete(n),this._emitChanges&&this._deselectedToEmit.push(n))}_unmarkAll(){this.isEmpty()||this._selection.forEach(n=>this._unmarkSelected(n))}_verifyValueAssignment(n){n.length>1&&this._multiple}_hasQueuedChanges(){return!!(this._deselectedToEmit.length||this._selectedToEmit.length)}_getConcreteValue(n,e){if(this.compareWith){e=e??this._selection;for(let i of e)if(this.compareWith(n,i))return i;return n}else return n}};var Yb=(()=>{class t{_renderer;_elementRef;onChange=e=>{};onTouched=()=>{};constructor(e,i){this._renderer=e,this._elementRef=i}setProperty(e,i){this._renderer.setProperty(this._elementRef.nativeElement,e,i)}registerOnTouched(e){this.onTouched=e}registerOnChange(e){this.onChange=e}setDisabledState(e){this.setProperty("disabled",e)}static \u0275fac=function(i){return new(i||t)(Y(Ae),Y(B))};static \u0275dir=L({type:t})}return t})(),oT=(()=>{class t extends Yb{static \u0275fac=(()=>{let e;return function(o){return(e||(e=It(t)))(o||t)}})();static \u0275dir=L({type:t,features:[he]})}return t})(),qc=new _("");var rT={provide:qc,useExisting:Dt(()=>Yc),multi:!0};function sT(){let t=Rt()?Rt().getUserAgent():"";return/android (\d+)/.test(t.toLowerCase())}var aT=new _(""),Yc=(()=>{class t extends Yb{_compositionMode;_composing=!1;constructor(e,i,o){super(e,i),this._compositionMode=o,this._compositionMode==null&&(this._compositionMode=!sT())}writeValue(e){let i=e??"";this.setProperty("value",i)}_handleInput(e){(!this._compositionMode||this._compositionMode&&!this._composing)&&this.onChange(e)}_compositionStart(){this._composing=!0}_compositionEnd(e){this._composing=!1,this._compositionMode&&this.onChange(e)}static \u0275fac=function(i){return new(i||t)(Y(Ae),Y(B),Y(aT,8))};static \u0275dir=L({type:t,selectors:[["input","formControlName","",3,"type","checkbox"],["textarea","formControlName",""],["input","formControl","",3,"type","checkbox"],["textarea","formControl",""],["input","ngModel","",3,"type","checkbox"],["textarea","ngModel",""],["","ngDefaultControl",""]],hostBindings:function(i,o){i&1&&H("input",function(s){return o._handleInput(s.target.value)})("blur",function(){return o.onTouched()})("compositionstart",function(){return o._compositionStart()})("compositionend",function(s){return o._compositionEnd(s.target.value)})},standalone:!1,features:[Ze([rT]),he]})}return t})();function wp(t){return t==null||xp(t)===0}function xp(t){return t==null?null:Array.isArray(t)||typeof t=="string"?t.length:t instanceof Set?t.size:null}var Ip=new _(""),Mp=new _(""),lT=/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,Bc=class{static min(n){return cT(n)}static max(n){return dT(n)}static required(n){return uT(n)}static requiredTrue(n){return fT(n)}static email(n){return mT(n)}static minLength(n){return pT(n)}static maxLength(n){return hT(n)}static pattern(n){return gT(n)}static nullValidator(n){return Zb()}static compose(n){return tD(n)}static composeAsync(n){return nD(n)}};function cT(t){return n=>{if(n.value==null||t==null)return null;let e=parseFloat(n.value);return!isNaN(e)&&e<t?{min:{min:t,actual:n.value}}:null}}function dT(t){return n=>{if(n.value==null||t==null)return null;let e=parseFloat(n.value);return!isNaN(e)&&e>t?{max:{max:t,actual:n.value}}:null}}function uT(t){return wp(t.value)?{required:!0}:null}function fT(t){return t.value===!0?null:{required:!0}}function mT(t){return wp(t.value)||lT.test(t.value)?null:{email:!0}}function pT(t){return n=>{let e=n.value?.length??xp(n.value);return e===null||e===0?null:e<t?{minlength:{requiredLength:t,actualLength:e}}:null}}function hT(t){return n=>{let e=n.value?.length??xp(n.value);return e!==null&&e>t?{maxlength:{requiredLength:t,actualLength:e}}:null}}function gT(t){if(!t)return Zb;let n,e;return typeof t=="string"?(e="",t.charAt(0)!=="^"&&(e+="^"),e+=t,t.charAt(t.length-1)!=="$"&&(e+="$"),n=new RegExp(e)):(e=t.toString(),n=t),i=>{if(wp(i.value))return null;let o=i.value;return n.test(o)?null:{pattern:{requiredPattern:e,actualValue:o}}}}function Zb(t){return null}function Kb(t){return t!=null}function Xb(t){return Uo(t)?bt(t):t}function Qb(t){let n={};return t.forEach(e=>{n=e!=null?D(D({},n),e):n}),Object.keys(n).length===0?null:n}function Jb(t,n){return n.map(e=>e(t))}function vT(t){return!t.validate}function eD(t){return t.map(n=>vT(n)?n:e=>n.validate(e))}function tD(t){if(!t)return null;let n=t.filter(Kb);return n.length==0?null:function(e){return Qb(Jb(e,n))}}function Sp(t){return t!=null?tD(eD(t)):null}function nD(t){if(!t)return null;let n=t.filter(Kb);return n.length==0?null:function(e){let i=Jb(e,n).map(Xb);return Rr(i).pipe(ve(Qb))}}function Tp(t){return t!=null?nD(eD(t)):null}function Hb(t,n){return t===null?[n]:Array.isArray(t)?[...t,n]:[t,n]}function iD(t){return t._rawValidators}function oD(t){return t._rawAsyncValidators}function bp(t){return t?Array.isArray(t)?t:[t]:[]}function jc(t,n){return Array.isArray(t)?t.includes(n):t===n}function Ub(t,n){let e=bp(n);return bp(t).forEach(o=>{jc(e,o)||e.push(o)}),e}function zb(t,n){return bp(n).filter(e=>!jc(t,e))}var Hc=class{get value(){return this.control?this.control.value:null}get valid(){return this.control?this.control.valid:null}get invalid(){return this.control?this.control.invalid:null}get pending(){return this.control?this.control.pending:null}get disabled(){return this.control?this.control.disabled:null}get enabled(){return this.control?this.control.enabled:null}get errors(){return this.control?this.control.errors:null}get pristine(){return this.control?this.control.pristine:null}get dirty(){return this.control?this.control.dirty:null}get touched(){return this.control?this.control.touched:null}get status(){return this.control?this.control.status:null}get untouched(){return this.control?this.control.untouched:null}get statusChanges(){return this.control?this.control.statusChanges:null}get valueChanges(){return this.control?this.control.valueChanges:null}get path(){return null}_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators=[];_rawAsyncValidators=[];_setValidators(n){this._rawValidators=n||[],this._composedValidatorFn=Sp(this._rawValidators)}_setAsyncValidators(n){this._rawAsyncValidators=n||[],this._composedAsyncValidatorFn=Tp(this._rawAsyncValidators)}get validator(){return this._composedValidatorFn||null}get asyncValidator(){return this._composedAsyncValidatorFn||null}_onDestroyCallbacks=[];_registerOnDestroy(n){this._onDestroyCallbacks.push(n)}_invokeOnDestroyCallbacks(){this._onDestroyCallbacks.forEach(n=>n()),this._onDestroyCallbacks=[]}reset(n=void 0){this.control?.reset(n)}hasError(n,e){return this.control?this.control.hasError(n,e):!1}getError(n,e){return this.control?this.control.getError(n,e):null}},ti=class extends Hc{name;get formDirective(){return null}get path(){return null}},oo=class extends Hc{_parent=null;name=null;valueAccessor=null},Uc=class{_cd;constructor(n){this._cd=n}get isTouched(){return this._cd?.control?._touched?.(),!!this._cd?.control?.touched}get isUntouched(){return!!this._cd?.control?.untouched}get isPristine(){return this._cd?.control?._pristine?.(),!!this._cd?.control?.pristine}get isDirty(){return!!this._cd?.control?.dirty}get isValid(){return this._cd?.control?._status?.(),!!this._cd?.control?.valid}get isInvalid(){return!!this._cd?.control?.invalid}get isPending(){return!!this._cd?.control?.pending}get isSubmitted(){return this._cd?._submitted?.(),!!this._cd?.submitted}};var rD=(()=>{class t extends Uc{constructor(e){super(e)}static \u0275fac=function(i){return new(i||t)(Y(oo,2))};static \u0275dir=L({type:t,selectors:[["","formControlName",""],["","ngModel",""],["","formControl",""]],hostVars:14,hostBindings:function(i,o){i&2&&V("ng-untouched",o.isUntouched)("ng-touched",o.isTouched)("ng-pristine",o.isPristine)("ng-dirty",o.isDirty)("ng-valid",o.isValid)("ng-invalid",o.isInvalid)("ng-pending",o.isPending)},standalone:!1,features:[he]})}return t})(),sD=(()=>{class t extends Uc{constructor(e){super(e)}static \u0275fac=function(i){return new(i||t)(Y(ti,10))};static \u0275dir=L({type:t,selectors:[["","formGroupName",""],["","formArrayName",""],["","ngModelGroup",""],["","formGroup",""],["","formArray",""],["form",3,"ngNoForm",""],["","ngForm",""]],hostVars:16,hostBindings:function(i,o){i&2&&V("ng-untouched",o.isUntouched)("ng-touched",o.isTouched)("ng-pristine",o.isPristine)("ng-dirty",o.isDirty)("ng-valid",o.isValid)("ng-invalid",o.isInvalid)("ng-pending",o.isPending)("ng-submitted",o.isSubmitted)},standalone:!1,features:[he]})}return t})();var Ls="VALID",Lc="INVALID",sr="PENDING",Vs="DISABLED",ni=class{},zc=class extends ni{value;source;constructor(n,e){super(),this.value=n,this.source=e}},js=class extends ni{pristine;source;constructor(n,e){super(),this.pristine=n,this.source=e}},Hs=class extends ni{touched;source;constructor(n,e){super(),this.touched=n,this.source=e}},ar=class extends ni{status;source;constructor(n,e){super(),this.status=n,this.source=e}},$c=class extends ni{source;constructor(n){super(),this.source=n}},Us=class extends ni{source;constructor(n){super(),this.source=n}};function Ap(t){return(Zc(t)?t.validators:t)||null}function _T(t){return Array.isArray(t)?Sp(t):t||null}function kp(t,n){return(Zc(n)?n.asyncValidators:t)||null}function yT(t){return Array.isArray(t)?Tp(t):t||null}function Zc(t){return t!=null&&!Array.isArray(t)&&typeof t=="object"}function aD(t,n,e){let i=t.controls;if(!(n?Object.keys(i):i).length)throw new A(1e3,"");if(!i[e])throw new A(1001,"")}function lD(t,n,e){t._forEachChild((i,o)=>{if(e[o]===void 0)throw new A(-1002,"")})}var lr=class{_pendingDirty=!1;_hasOwnPendingAsyncValidator=null;_pendingTouched=!1;_onCollectionChange=()=>{};_updateOn;_parent=null;_asyncValidationSubscription;_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators;_rawAsyncValidators;value;constructor(n,e){this._assignValidators(n),this._assignAsyncValidators(e)}get validator(){return this._composedValidatorFn}set validator(n){this._rawValidators=this._composedValidatorFn=n}get asyncValidator(){return this._composedAsyncValidatorFn}set asyncValidator(n){this._rawAsyncValidators=this._composedAsyncValidatorFn=n}get parent(){return this._parent}get status(){return At(this.statusReactive)}set status(n){At(()=>this.statusReactive.set(n))}_status=Ie(()=>this.statusReactive());statusReactive=N(void 0);get valid(){return this.status===Ls}get invalid(){return this.status===Lc}get pending(){return this.status===sr}get disabled(){return this.status===Vs}get enabled(){return this.status!==Vs}errors;get pristine(){return At(this.pristineReactive)}set pristine(n){At(()=>this.pristineReactive.set(n))}_pristine=Ie(()=>this.pristineReactive());pristineReactive=N(!0);get dirty(){return!this.pristine}get touched(){return At(this.touchedReactive)}set touched(n){At(()=>this.touchedReactive.set(n))}_touched=Ie(()=>this.touchedReactive());touchedReactive=N(!1);get untouched(){return!this.touched}_events=new C;events=this._events.asObservable();valueChanges;statusChanges;get updateOn(){return this._updateOn?this._updateOn:this.parent?this.parent.updateOn:"change"}setValidators(n){this._assignValidators(n)}setAsyncValidators(n){this._assignAsyncValidators(n)}addValidators(n){this.setValidators(Ub(n,this._rawValidators))}addAsyncValidators(n){this.setAsyncValidators(Ub(n,this._rawAsyncValidators))}removeValidators(n){this.setValidators(zb(n,this._rawValidators))}removeAsyncValidators(n){this.setAsyncValidators(zb(n,this._rawAsyncValidators))}hasValidator(n){return jc(this._rawValidators,n)}hasAsyncValidator(n){return jc(this._rawAsyncValidators,n)}clearValidators(){this.validator=null}clearAsyncValidators(){this.asyncValidator=null}markAsTouched(n={}){let e=this.touched===!1;this.touched=!0;let i=n.sourceControl??this;n.onlySelf||this._parent?.markAsTouched(ee(D({},n),{sourceControl:i})),e&&n.emitEvent!==!1&&this._events.next(new Hs(!0,i))}markAllAsDirty(n={}){this.markAsDirty({onlySelf:!0,emitEvent:n.emitEvent,sourceControl:this}),this._forEachChild(e=>e.markAllAsDirty(n))}markAllAsTouched(n={}){this.markAsTouched({onlySelf:!0,emitEvent:n.emitEvent,sourceControl:this}),this._forEachChild(e=>e.markAllAsTouched(n))}markAsUntouched(n={}){let e=this.touched===!0;this.touched=!1,this._pendingTouched=!1;let i=n.sourceControl??this;this._forEachChild(o=>{o.markAsUntouched({onlySelf:!0,emitEvent:n.emitEvent,sourceControl:i})}),n.onlySelf||this._parent?._updateTouched(n,i),e&&n.emitEvent!==!1&&this._events.next(new Hs(!1,i))}markAsDirty(n={}){let e=this.pristine===!0;this.pristine=!1;let i=n.sourceControl??this;n.onlySelf||this._parent?.markAsDirty(ee(D({},n),{sourceControl:i})),e&&n.emitEvent!==!1&&this._events.next(new js(!1,i))}markAsPristine(n={}){let e=this.pristine===!1;this.pristine=!0,this._pendingDirty=!1;let i=n.sourceControl??this;this._forEachChild(o=>{o.markAsPristine({onlySelf:!0,emitEvent:n.emitEvent})}),n.onlySelf||this._parent?._updatePristine(n,i),e&&n.emitEvent!==!1&&this._events.next(new js(!0,i))}markAsPending(n={}){this.status=sr;let e=n.sourceControl??this;n.emitEvent!==!1&&(this._events.next(new ar(this.status,e)),this.statusChanges.emit(this.status)),n.onlySelf||this._parent?.markAsPending(ee(D({},n),{sourceControl:e}))}disable(n={}){let e=this._parentMarkedDirty(n.onlySelf);this.status=Vs,this.errors=null,this._forEachChild(o=>{o.disable(ee(D({},n),{onlySelf:!0}))}),this._updateValue();let i=n.sourceControl??this;n.emitEvent!==!1&&(this._events.next(new zc(this.value,i)),this._events.next(new ar(this.status,i)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._updateAncestors(ee(D({},n),{skipPristineCheck:e}),this),this._onDisabledChange.forEach(o=>o(!0))}enable(n={}){let e=this._parentMarkedDirty(n.onlySelf);this.status=Ls,this._forEachChild(i=>{i.enable(ee(D({},n),{onlySelf:!0}))}),this.updateValueAndValidity({onlySelf:!0,emitEvent:n.emitEvent}),this._updateAncestors(ee(D({},n),{skipPristineCheck:e}),this),this._onDisabledChange.forEach(i=>i(!1))}_updateAncestors(n,e){n.onlySelf||(this._parent?.updateValueAndValidity(n),n.skipPristineCheck||this._parent?._updatePristine({},e),this._parent?._updateTouched({},e))}setParent(n){this._parent=n}getRawValue(){return this.value}updateValueAndValidity(n={}){if(this._setInitialStatus(),this._updateValue(),this.enabled){let i=this._cancelExistingSubscription();this.errors=this._runValidator(),this.status=this._calculateStatus(),(this.status===Ls||this.status===sr)&&this._runAsyncValidator(i,n.emitEvent)}let e=n.sourceControl??this;n.emitEvent!==!1&&(this._events.next(new zc(this.value,e)),this._events.next(new ar(this.status,e)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),n.onlySelf||this._parent?.updateValueAndValidity(ee(D({},n),{sourceControl:e}))}_updateTreeValidity(n={emitEvent:!0}){this._forEachChild(e=>e._updateTreeValidity(n)),this.updateValueAndValidity({onlySelf:!0,emitEvent:n.emitEvent})}_setInitialStatus(){this.status=this._allControlsDisabled()?Vs:Ls}_runValidator(){return this.validator?this.validator(this):null}_runAsyncValidator(n,e){if(this.asyncValidator){this.status=sr,this._hasOwnPendingAsyncValidator={emitEvent:e!==!1,shouldHaveEmitted:n!==!1};let i=Xb(this.asyncValidator(this));this._asyncValidationSubscription=i.subscribe(o=>{this._hasOwnPendingAsyncValidator=null,this.setErrors(o,{emitEvent:e,shouldHaveEmitted:n})})}}_cancelExistingSubscription(){if(this._asyncValidationSubscription){this._asyncValidationSubscription.unsubscribe();let n=(this._hasOwnPendingAsyncValidator?.emitEvent||this._hasOwnPendingAsyncValidator?.shouldHaveEmitted)??!1;return this._hasOwnPendingAsyncValidator=null,n}return!1}setErrors(n,e={}){this.errors=n,this._updateControlsErrors(e.emitEvent!==!1,this,e.shouldHaveEmitted)}get(n){let e=n;return e==null||(Array.isArray(e)||(e=e.split(".")),e.length===0)?null:e.reduce((i,o)=>i&&i._find(o),this)}getError(n,e){let i=e?this.get(e):this;return i?.errors?i.errors[n]:null}hasError(n,e){return!!this.getError(n,e)}get root(){let n=this;for(;n._parent;)n=n._parent;return n}_updateControlsErrors(n,e,i){this.status=this._calculateStatus(),n&&this.statusChanges.emit(this.status),(n||i)&&this._events.next(new ar(this.status,e)),this._parent&&this._parent._updateControlsErrors(n,e,i)}_initObservables(){this.valueChanges=new se,this.statusChanges=new se}_calculateStatus(){return this._allControlsDisabled()?Vs:this.errors?Lc:this._hasOwnPendingAsyncValidator||this._anyControlsHaveStatus(sr)?sr:this._anyControlsHaveStatus(Lc)?Lc:Ls}_anyControlsHaveStatus(n){return this._anyControls(e=>e.status===n)}_anyControlsDirty(){return this._anyControls(n=>n.dirty)}_anyControlsTouched(){return this._anyControls(n=>n.touched)}_updatePristine(n,e){let i=!this._anyControlsDirty(),o=this.pristine!==i;this.pristine=i,n.onlySelf||this._parent?._updatePristine(n,e),o&&this._events.next(new js(this.pristine,e))}_updateTouched(n={},e){this.touched=this._anyControlsTouched(),this._events.next(new Hs(this.touched,e)),n.onlySelf||this._parent?._updateTouched(n,e)}_onDisabledChange=[];_registerOnCollectionChange(n){this._onCollectionChange=n}_setUpdateStrategy(n){Zc(n)&&n.updateOn!=null&&(this._updateOn=n.updateOn)}_parentMarkedDirty(n){return!n&&!!this._parent?.dirty&&!this._parent._anyControlsDirty()}_find(n){return null}_assignValidators(n){this._rawValidators=Array.isArray(n)?n.slice():n,this._composedValidatorFn=_T(this._rawValidators)}_assignAsyncValidators(n){this._rawAsyncValidators=Array.isArray(n)?n.slice():n,this._composedAsyncValidatorFn=yT(this._rawAsyncValidators)}},cr=class extends lr{constructor(n,e,i){super(Ap(e),kp(i,e)),this.controls=n,this._initObservables(),this._setUpdateStrategy(e),this._setUpControls(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator})}controls;registerControl(n,e){return this.controls[n]?this.controls[n]:(this.controls[n]=e,e.setParent(this),e._registerOnCollectionChange(this._onCollectionChange),e)}addControl(n,e,i={}){this.registerControl(n,e),this.updateValueAndValidity({emitEvent:i.emitEvent}),this._onCollectionChange()}removeControl(n,e={}){this.controls[n]&&this.controls[n]._registerOnCollectionChange(()=>{}),delete this.controls[n],this.updateValueAndValidity({emitEvent:e.emitEvent}),this._onCollectionChange()}setControl(n,e,i={}){this.controls[n]&&this.controls[n]._registerOnCollectionChange(()=>{}),delete this.controls[n],e&&this.registerControl(n,e),this.updateValueAndValidity({emitEvent:i.emitEvent}),this._onCollectionChange()}contains(n){return this.controls.hasOwnProperty(n)&&this.controls[n].enabled}setValue(n,e={}){lD(this,!0,n),Object.keys(n).forEach(i=>{aD(this,!0,i),this.controls[i].setValue(n[i],{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e)}patchValue(n,e={}){n!=null&&(Object.keys(n).forEach(i=>{let o=this.controls[i];o&&o.patchValue(n[i],{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e))}reset(n={},e={}){this._forEachChild((i,o)=>{i.reset(n?n[o]:null,ee(D({},e),{onlySelf:!0}))}),this._updatePristine(e,this),this._updateTouched(e,this),this.updateValueAndValidity(e),e?.emitEvent!==!1&&this._events.next(new Us(this))}getRawValue(){return this._reduceChildren({},(n,e,i)=>(n[i]=e.getRawValue(),n))}_syncPendingControls(){let n=this._reduceChildren(!1,(e,i)=>i._syncPendingControls()?!0:e);return n&&this.updateValueAndValidity({onlySelf:!0}),n}_forEachChild(n){Object.keys(this.controls).forEach(e=>{let i=this.controls[e];i&&n(i,e)})}_setUpControls(){this._forEachChild(n=>{n.setParent(this),n._registerOnCollectionChange(this._onCollectionChange)})}_updateValue(){this.value=this._reduceValue()}_anyControls(n){for(let[e,i]of Object.entries(this.controls))if(this.contains(e)&&n(i))return!0;return!1}_reduceValue(){let n={};return this._reduceChildren(n,(e,i,o)=>((i.enabled||this.disabled)&&(e[o]=i.value),e))}_reduceChildren(n,e){let i=n;return this._forEachChild((o,r)=>{i=e(i,o,r)}),i}_allControlsDisabled(){for(let n of Object.keys(this.controls))if(this.controls[n].enabled)return!1;return Object.keys(this.controls).length>0||this.disabled}_find(n){return this.controls.hasOwnProperty(n)?this.controls[n]:null}};var Dp=class extends cr{};var Rp=new _("",{factory:()=>Np}),Np="always";function bT(t,n){return[...n.path,t]}function Cp(t,n,e=Np){Op(t,n),n.valueAccessor.writeValue(t.value),(t.disabled||e==="always")&&n.valueAccessor.setDisabledState?.(t.disabled),CT(t,n),wT(t,n),ET(t,n),DT(t,n)}function $b(t,n,e=!0){let i=()=>{};n?.valueAccessor?.registerOnChange(i),n?.valueAccessor?.registerOnTouched(i),Wc(t,n),t&&(n._invokeOnDestroyCallbacks(),t._registerOnCollectionChange(()=>{}))}function Gc(t,n){t.forEach(e=>{e.registerOnValidatorChange&&e.registerOnValidatorChange(n)})}function DT(t,n){if(n.valueAccessor.setDisabledState){let e=i=>{n.valueAccessor.setDisabledState(i)};t.registerOnDisabledChange(e),n._registerOnDestroy(()=>{t._unregisterOnDisabledChange(e)})}}function Op(t,n){let e=iD(t);n.validator!==null?t.setValidators(Hb(e,n.validator)):typeof e=="function"&&t.setValidators([e]);let i=oD(t);n.asyncValidator!==null?t.setAsyncValidators(Hb(i,n.asyncValidator)):typeof i=="function"&&t.setAsyncValidators([i]);let o=()=>t.updateValueAndValidity();Gc(n._rawValidators,o),Gc(n._rawAsyncValidators,o)}function Wc(t,n){let e=!1;if(t!==null){if(n.validator!==null){let o=iD(t);if(Array.isArray(o)&&o.length>0){let r=o.filter(s=>s!==n.validator);r.length!==o.length&&(e=!0,t.setValidators(r))}}if(n.asyncValidator!==null){let o=oD(t);if(Array.isArray(o)&&o.length>0){let r=o.filter(s=>s!==n.asyncValidator);r.length!==o.length&&(e=!0,t.setAsyncValidators(r))}}}let i=()=>{};return Gc(n._rawValidators,i),Gc(n._rawAsyncValidators,i),e}function CT(t,n){n.valueAccessor.registerOnChange(e=>{t._pendingValue=e,t._pendingChange=!0,t._pendingDirty=!0,t.updateOn==="change"&&cD(t,n)})}function ET(t,n){n.valueAccessor.registerOnTouched(()=>{t._pendingTouched=!0,t.updateOn==="blur"&&t._pendingChange&&cD(t,n),t.updateOn!=="submit"&&t.markAsTouched()})}function cD(t,n){t._pendingDirty&&t.markAsDirty(),t.setValue(t._pendingValue,{emitModelToViewChange:!1}),n.viewToModelUpdate(t._pendingValue),t._pendingChange=!1}function wT(t,n){let e=(i,o)=>{n.valueAccessor.writeValue(i),o&&n.viewToModelUpdate(i)};t.registerOnChange(e),n._registerOnDestroy(()=>{t._unregisterOnChange(e)})}function dD(t,n){t==null,Op(t,n)}function xT(t,n){return Wc(t,n)}function IT(t,n){if(!t.hasOwnProperty("model"))return!1;let e=t.model;return e.isFirstChange()?!0:!Object.is(n,e.currentValue)}function MT(t){return Object.getPrototypeOf(t.constructor)===oT}function uD(t,n){t._syncPendingControls(),n.forEach(e=>{let i=e.control;i.updateOn==="submit"&&i._pendingChange&&(e.viewToModelUpdate(i._pendingValue),i._pendingChange=!1)})}function ST(t,n){if(!n)return null;Array.isArray(n);let e,i,o;return n.forEach(r=>{r.constructor===Yc?e=r:MT(r)?i=r:o=r}),o||i||e||null}function TT(t,n){let e=t.indexOf(n);e>-1&&t.splice(e,1)}var AT={provide:ti,useExisting:Dt(()=>Fp)},Bs=Promise.resolve(),Fp=(()=>{class t extends ti{callSetDisabledState;get submitted(){return At(this.submittedReactive)}_submitted=Ie(()=>this.submittedReactive());submittedReactive=N(!1);_directives=new Set;form;ngSubmit=new se;options;constructor(e,i,o){super(),this.callSetDisabledState=o,this.form=new cr({},Sp(e),Tp(i))}ngAfterViewInit(){this._setUpdateStrategy()}get formDirective(){return this}get control(){return this.form}get path(){return[]}get controls(){return this.form.controls}addControl(e){Bs.then(()=>{let i=this._findContainer(e.path);e.control=i.registerControl(e.name,e.control),Cp(e.control,e,this.callSetDisabledState),e.control.updateValueAndValidity({emitEvent:!1}),this._directives.add(e)})}getControl(e){return this.form.get(e.path)}removeControl(e){Bs.then(()=>{this._findContainer(e.path)?.removeControl(e.name),this._directives.delete(e)})}addFormGroup(e){Bs.then(()=>{let i=this._findContainer(e.path),o=new cr({});dD(o,e),i.registerControl(e.name,o),o.updateValueAndValidity({emitEvent:!1})})}removeFormGroup(e){Bs.then(()=>{this._findContainer(e.path)?.removeControl?.(e.name)})}getFormGroup(e){return this.form.get(e.path)}updateModel(e,i){Bs.then(()=>{this.form.get(e.path).setValue(i)})}setValue(e){this.control.setValue(e)}onSubmit(e){return this.submittedReactive.set(!0),uD(this.form,this._directives),this.ngSubmit.emit(e),this.form._events.next(new $c(this.control)),e?.target?.method==="dialog"}onReset(){this.resetForm()}resetForm(e=void 0){this.form.reset(e),this.submittedReactive.set(!1)}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.form._updateOn=this.options.updateOn)}_findContainer(e){return e.pop(),e.length?this.form.get(e):this.form}static \u0275fac=function(i){return new(i||t)(Y(Ip,10),Y(Mp,10),Y(Rp,8))};static \u0275dir=L({type:t,selectors:[["form",3,"ngNoForm","",3,"formGroup","",3,"formArray",""],["ng-form"],["","ngForm",""]],hostBindings:function(i,o){i&1&&H("submit",function(s){return o.onSubmit(s)})("reset",function(){return o.onReset()})},inputs:{options:[0,"ngFormOptions","options"]},outputs:{ngSubmit:"ngSubmit"},exportAs:["ngForm"],standalone:!1,features:[Ze([AT]),he]})}return t})();function Gb(t,n){let e=t.indexOf(n);e>-1&&t.splice(e,1)}function Wb(t){return typeof t=="object"&&t!==null&&Object.keys(t).length===2&&"value"in t&&"disabled"in t}var Vc=class extends lr{defaultValue=null;_onChange=[];_pendingValue;_pendingChange=!1;constructor(n=null,e,i){super(Ap(e),kp(i,e)),this._applyFormState(n),this._setUpdateStrategy(e),this._initObservables(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator}),Zc(e)&&(e.nonNullable||e.initialValueIsDefault)&&(Wb(n)?this.defaultValue=n.value:this.defaultValue=n)}setValue(n,e={}){this.value=this._pendingValue=n,this._onChange.length&&e.emitModelToViewChange!==!1&&this._onChange.forEach(i=>i(this.value,e.emitViewToModelChange!==!1)),this.updateValueAndValidity(e)}patchValue(n,e={}){this.setValue(n,e)}reset(n=this.defaultValue,e={}){this._applyFormState(n),this.markAsPristine(e),this.markAsUntouched(e),this.setValue(this.value,e),e.overwriteDefaultValue&&(this.defaultValue=this.value),this._pendingChange=!1,e?.emitEvent!==!1&&this._events.next(new Us(this))}_updateValue(){}_anyControls(n){return!1}_allControlsDisabled(){return this.disabled}registerOnChange(n){this._onChange.push(n)}_unregisterOnChange(n){Gb(this._onChange,n)}registerOnDisabledChange(n){this._onDisabledChange.push(n)}_unregisterOnDisabledChange(n){Gb(this._onDisabledChange,n)}_forEachChild(n){}_syncPendingControls(){return this.updateOn==="submit"&&(this._pendingDirty&&this.markAsDirty(),this._pendingTouched&&this.markAsTouched(),this._pendingChange)?(this.setValue(this._pendingValue,{onlySelf:!0,emitModelToViewChange:!1}),!0):!1}_applyFormState(n){Wb(n)?(this.value=this._pendingValue=n.value,n.disabled?this.disable({onlySelf:!0,emitEvent:!1}):this.enable({onlySelf:!0,emitEvent:!1})):this.value=this._pendingValue=n}};var kT=t=>t instanceof Vc;var fD=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=L({type:t,selectors:[["form",3,"ngNoForm","",3,"ngNativeValidate",""]],hostAttrs:["novalidate",""],standalone:!1})}return t})();var Ep=class extends lr{constructor(n,e,i){super(Ap(e),kp(i,e)),this.controls=n,this._initObservables(),this._setUpdateStrategy(e),this._setUpControls(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator})}controls;at(n){return this.controls[this._adjustIndex(n)]}push(n,e={}){Array.isArray(n)?n.forEach(i=>{this.controls.push(i),this._registerControl(i)}):(this.controls.push(n),this._registerControl(n)),this.updateValueAndValidity({emitEvent:e.emitEvent}),this._onCollectionChange()}insert(n,e,i={}){this.controls.splice(n,0,e),this._registerControl(e),this.updateValueAndValidity({emitEvent:i.emitEvent})}removeAt(n,e={}){let i=this._adjustIndex(n);i<0&&(i=0),this.controls[i]&&this.controls[i]._registerOnCollectionChange(()=>{}),this.controls.splice(i,1),this.updateValueAndValidity({emitEvent:e.emitEvent})}setControl(n,e,i={}){let o=this._adjustIndex(n);o<0&&(o=0),this.controls[o]&&this.controls[o]._registerOnCollectionChange(()=>{}),this.controls.splice(o,1),e&&(this.controls.splice(o,0,e),this._registerControl(e)),this.updateValueAndValidity({emitEvent:i.emitEvent}),this._onCollectionChange()}get length(){return this.controls.length}setValue(n,e={}){lD(this,!1,n),n.forEach((i,o)=>{aD(this,!1,o),this.at(o).setValue(i,{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e)}patchValue(n,e={}){n!=null&&(n.forEach((i,o)=>{this.at(o)&&this.at(o).patchValue(i,{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e))}reset(n=[],e={}){this._forEachChild((i,o)=>{i.reset(n[o],ee(D({},e),{onlySelf:!0}))}),this._updatePristine(e,this),this._updateTouched(e,this),this.updateValueAndValidity(e),e?.emitEvent!==!1&&this._events.next(new Us(this))}getRawValue(){return this.controls.map(n=>n.getRawValue())}clear(n={}){this.controls.length<1||(this._forEachChild(e=>e._registerOnCollectionChange(()=>{})),this.controls.splice(0),this.updateValueAndValidity({emitEvent:n.emitEvent}))}_adjustIndex(n){return n<0?n+this.length:n}_syncPendingControls(){let n=this.controls.reduce((e,i)=>i._syncPendingControls()?!0:e,!1);return n&&this.updateValueAndValidity({onlySelf:!0}),n}_forEachChild(n){this.controls.forEach((e,i)=>{n(e,i)})}_updateValue(){this.value=this.controls.filter(n=>n.enabled||this.disabled).map(n=>n.value)}_anyControls(n){return this.controls.some(e=>e.enabled&&n(e))}_setUpControls(){this._forEachChild(n=>this._registerControl(n))}_allControlsDisabled(){for(let n of this.controls)if(n.enabled)return!1;return this.controls.length>0||this.disabled}_registerControl(n){n.setParent(this),n._registerOnCollectionChange(this._onCollectionChange)}_find(n){return this.at(n)??null}};var RT=(()=>{class t extends ti{callSetDisabledState;get submitted(){return At(this._submittedReactive)}set submitted(e){this._submittedReactive.set(e)}_submitted=Ie(()=>this._submittedReactive());_submittedReactive=N(!1);_oldForm;_onCollectionChange=()=>this._updateDomValue();directives=[];constructor(e,i,o){super(),this.callSetDisabledState=o,this._setValidators(e),this._setAsyncValidators(i)}ngOnChanges(e){this.onChanges(e)}ngOnDestroy(){this.onDestroy()}onChanges(e){this._checkFormPresent(),e.hasOwnProperty("form")&&(this._updateValidators(),this._updateDomValue(),this._updateRegistrations(),this._oldForm=this.form)}onDestroy(){this.form&&(Wc(this.form,this),this.form._onCollectionChange===this._onCollectionChange&&this.form._registerOnCollectionChange(()=>{}))}get formDirective(){return this}get path(){return[]}addControl(e){let i=this.form.get(e.path);return Cp(i,e,this.callSetDisabledState),i.updateValueAndValidity({emitEvent:!1}),this.directives.push(e),i}getControl(e){return this.form.get(e.path)}removeControl(e){$b(e.control||null,e,!1),TT(this.directives,e)}addFormGroup(e){this._setUpFormContainer(e)}removeFormGroup(e){this._cleanUpFormContainer(e)}getFormGroup(e){return this.form.get(e.path)}getFormArray(e){return this.form.get(e.path)}addFormArray(e){this._setUpFormContainer(e)}removeFormArray(e){this._cleanUpFormContainer(e)}updateModel(e,i){this.form.get(e.path).setValue(i)}onReset(){this.resetForm()}resetForm(e=void 0,i={}){this.form.reset(e,i),this._submittedReactive.set(!1)}onSubmit(e){return this.submitted=!0,uD(this.form,this.directives),this.ngSubmit.emit(e),this.form._events.next(new $c(this.control)),e?.target?.method==="dialog"}_updateDomValue(){this.directives.forEach(e=>{let i=e.control,o=this.form.get(e.path);i!==o&&($b(i||null,e),kT(o)&&(Cp(o,e,this.callSetDisabledState),e.control=o))}),this.form._updateTreeValidity({emitEvent:!1})}_setUpFormContainer(e){let i=this.form.get(e.path);dD(i,e),i.updateValueAndValidity({emitEvent:!1})}_cleanUpFormContainer(e){let i=this.form?.get(e.path);i&&xT(i,e)&&i.updateValueAndValidity({emitEvent:!1})}_updateRegistrations(){this.form._registerOnCollectionChange(this._onCollectionChange),this._oldForm?._registerOnCollectionChange(()=>{})}_updateValidators(){Op(this.form,this),this._oldForm&&Wc(this._oldForm,this)}_checkFormPresent(){this.form}static \u0275fac=function(i){return new(i||t)(Y(Ip,10),Y(Mp,10),Y(Rp,8))};static \u0275dir=L({type:t,features:[he,xt]})}return t})();var mD=new _("");var NT={provide:oo,useExisting:Dt(()=>Pp)},Pp=(()=>{class t extends oo{_ngModelWarningConfig;_added=!1;viewModel;control;name=null;set isDisabled(e){}model;update=new se;static _ngModelWarningSentOnce=!1;_ngModelWarningSent=!1;constructor(e,i,o,r,s){super(),this._ngModelWarningConfig=s,this._parent=e,this._setValidators(i),this._setAsyncValidators(o),this.valueAccessor=ST(this,r)}ngOnChanges(e){this._added||this._setUpControl(),IT(e,this.viewModel)&&(this.viewModel=this.model,this.formDirective.updateModel(this,this.model))}ngOnDestroy(){this.formDirective?.removeControl(this)}viewToModelUpdate(e){this.viewModel=e,this.update.emit(e)}get path(){return bT(this.name==null?this.name:this.name.toString(),this._parent)}get formDirective(){return this._parent?this._parent.formDirective:null}_setUpControl(){this.control=this.formDirective.addControl(this),this._added=!0}static \u0275fac=function(i){return new(i||t)(Y(ti,13),Y(Ip,10),Y(Mp,10),Y(qc,10),Y(mD,8))};static \u0275dir=L({type:t,selectors:[["","formControlName",""]],inputs:{name:[0,"formControlName","name"],isDisabled:[0,"disabled","isDisabled"],model:[0,"ngModel","model"]},outputs:{update:"ngModelChange"},standalone:!1,features:[Ze([NT]),he,xt]})}return t})();var OT={provide:ti,useExisting:Dt(()=>zs)},zs=(()=>{class t extends RT{form=null;ngSubmit=new se;get control(){return this.form}static \u0275fac=(()=>{let e;return function(o){return(e||(e=It(t)))(o||t)}})();static \u0275dir=L({type:t,selectors:[["","formGroup",""]],hostBindings:function(i,o){i&1&&H("submit",function(s){return o.onSubmit(s)})("reset",function(){return o.onReset()})},inputs:{form:[0,"formGroup","form"]},outputs:{ngSubmit:"ngSubmit"},exportAs:["ngForm"],standalone:!1,features:[Ze([OT]),he]})}return t})();var FT=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=q({type:t});static \u0275inj=z({})}return t})();function qb(t){return!!t&&(t.asyncValidators!==void 0||t.validators!==void 0||t.updateOn!==void 0)}var pD=(()=>{class t{useNonNullable=!1;get nonNullable(){let e=new t;return e.useNonNullable=!0,e}group(e,i=null){let o=this._reduceControls(e),r={};return qb(i)?r=i:i!==null&&(r.validators=i.validator,r.asyncValidators=i.asyncValidator),new cr(o,r)}record(e,i=null){let o=this._reduceControls(e);return new Dp(o,i)}control(e,i,o){let r={};return this.useNonNullable?(qb(i)?r=i:(r.validators=i,r.asyncValidators=o),new Vc(e,ee(D({},r),{nonNullable:!0}))):new Vc(e,i,o)}array(e,i,o){let r=e.map(s=>this._createControl(s));return new Ep(r,i,o)}_reduceControls(e){let i={};return Object.keys(e).forEach(o=>{i[o]=this._createControl(e[o])}),i}_createControl(e){if(e instanceof Vc)return e;if(e instanceof lr)return e;if(Array.isArray(e)){let i=e[0],o=e.length>1?e[1]:null,r=e.length>2?e[2]:null;return this.control(i,o,r)}else return this.control(e)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var hD=(()=>{class t{static withConfig(e){return{ngModule:t,providers:[{provide:mD,useValue:e.warnOnNgModelWithFormControl??"always"},{provide:Rp,useValue:e.callSetDisabledState??Np}]}}static \u0275fac=function(i){return new(i||t)};static \u0275mod=q({type:t});static \u0275inj=z({imports:[FT]})}return t})();var gD=(()=>{class t{_animationsDisabled=Ee();state="unchecked";disabled=!1;appearance="full";constructor(){}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=j({type:t,selectors:[["mat-pseudo-checkbox"]],hostAttrs:[1,"mat-pseudo-checkbox"],hostVars:12,hostBindings:function(i,o){i&2&&V("mat-pseudo-checkbox-indeterminate",o.state==="indeterminate")("mat-pseudo-checkbox-checked",o.state==="checked")("mat-pseudo-checkbox-disabled",o.disabled)("mat-pseudo-checkbox-minimal",o.appearance==="minimal")("mat-pseudo-checkbox-full",o.appearance==="full")("_mat-animation-noopable",o._animationsDisabled)},inputs:{state:"state",disabled:"disabled",appearance:"appearance"},decls:0,vars:0,template:function(i,o){},styles:[`.mat-pseudo-checkbox {
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
`],encapsulation:2,changeDetection:0})}return t})();var LT=["button"],VT=["*"];function BT(t,n){if(t&1&&(h(0,"div",2),J(1,"mat-pseudo-checkbox",6),g()),t&2){let e=x();y(),Q("disabled",e.disabled)}}var vD=new _("MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS",{providedIn:"root",factory:()=>({hideSingleSelectionIndicator:!1,hideMultipleSelectionIndicator:!1,disabledInteractive:!1})}),_D=new _("MatButtonToggleGroup"),jT={provide:qc,useExisting:Dt(()=>Bp),multi:!0},Kc=class{source;value;constructor(n,e){this.source=n,this.value=e}},Bp=(()=>{class t{_changeDetector=u(We);_dir=u(Je,{optional:!0});_multiple=!1;_disabled=!1;_disabledInteractive=!1;_selectionModel;_rawValue;_controlValueAccessorChangeFn=()=>{};_onTouched=()=>{};_buttonToggles;appearance;get name(){return this._name}set name(e){this._name=e,this._markButtonsForCheck()}_name=u(ke).getId("mat-button-toggle-group-");vertical=!1;get value(){let e=this._selectionModel?this._selectionModel.selected:[];return this.multiple?e.map(i=>i.value):e[0]?e[0].value:void 0}set value(e){this._setSelectionByValue(e),this.valueChange.emit(this.value)}valueChange=new se;get selected(){let e=this._selectionModel?this._selectionModel.selected:[];return this.multiple?e:e[0]||null}get multiple(){return this._multiple}set multiple(e){this._multiple=e,this._markButtonsForCheck()}get disabled(){return this._disabled}set disabled(e){this._disabled=e,this._markButtonsForCheck()}get disabledInteractive(){return this._disabledInteractive}set disabledInteractive(e){this._disabledInteractive=e,this._markButtonsForCheck()}get dir(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}change=new se;get hideSingleSelectionIndicator(){return this._hideSingleSelectionIndicator}set hideSingleSelectionIndicator(e){this._hideSingleSelectionIndicator=e,this._markButtonsForCheck()}_hideSingleSelectionIndicator;get hideMultipleSelectionIndicator(){return this._hideMultipleSelectionIndicator}set hideMultipleSelectionIndicator(e){this._hideMultipleSelectionIndicator=e,this._markButtonsForCheck()}_hideMultipleSelectionIndicator;constructor(){let e=u(vD,{optional:!0});this.appearance=e&&e.appearance?e.appearance:"standard",this._hideSingleSelectionIndicator=e?.hideSingleSelectionIndicator??!1,this._hideMultipleSelectionIndicator=e?.hideMultipleSelectionIndicator??!1}ngOnInit(){this._selectionModel=new Ps(this.multiple,void 0,!1)}ngAfterContentInit(){this._selectionModel.select(...this._buttonToggles.filter(e=>e.checked)),this.multiple||this._initializeTabIndex()}writeValue(e){this.value=e,this._changeDetector.markForCheck()}registerOnChange(e){this._controlValueAccessorChangeFn=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this.disabled=e}_keydown(e){if(this.multiple||this.disabled||Ft(e))return;let o=e.target.id,r=this._buttonToggles.toArray().findIndex(a=>a.buttonId===o),s=null;switch(e.keyCode){case 32:case 13:s=this._buttonToggles.get(r)||null;break;case 38:s=this._getNextButton(r,-1);break;case 37:s=this._getNextButton(r,this.dir==="ltr"?-1:1);break;case 40:s=this._getNextButton(r,1);break;case 39:s=this._getNextButton(r,this.dir==="ltr"?1:-1);break;default:return}s&&(e.preventDefault(),s._onButtonClick(),s.focus())}_emitChangeEvent(e){let i=new Kc(e,this.value);this._rawValue=i.value,this._controlValueAccessorChangeFn(i.value),this.change.emit(i)}_syncButtonToggle(e,i,o=!1,r=!1){!this.multiple&&this.selected&&!e.checked&&(this.selected.checked=!1),this._selectionModel?i?this._selectionModel.select(e):this._selectionModel.deselect(e):r=!0,r?Promise.resolve().then(()=>this._updateModelValue(e,o)):this._updateModelValue(e,o)}_isSelected(e){return this._selectionModel&&this._selectionModel.isSelected(e)}_isPrechecked(e){return typeof this._rawValue>"u"?!1:this.multiple&&Array.isArray(this._rawValue)?this._rawValue.some(i=>e.value!=null&&i===e.value):e.value===this._rawValue}_initializeTabIndex(){if(this._buttonToggles.forEach(e=>{e.tabIndex=-1}),this.selected)this.selected.tabIndex=0;else for(let e=0;e<this._buttonToggles.length;e++){let i=this._buttonToggles.get(e);if(!i.disabled){i.tabIndex=0;break}}}_getNextButton(e,i){let o=this._buttonToggles;for(let r=1;r<=o.length;r++){let s=(e+i*r+o.length)%o.length,a=o.get(s);if(a&&!a.disabled)return a}return null}_setSelectionByValue(e){if(this._rawValue=e,!this._buttonToggles)return;let i=this._buttonToggles.toArray();if(this.multiple&&e?(Array.isArray(e),this._clearSelection(),e.forEach(o=>this._selectValue(o,i))):(this._clearSelection(),this._selectValue(e,i)),!this.multiple&&i.every(o=>o.tabIndex===-1)){for(let o of i)if(!o.disabled){o.tabIndex=0;break}}}_clearSelection(){this._selectionModel.clear(),this._buttonToggles.forEach(e=>{e.checked=!1,this.multiple||(e.tabIndex=-1)})}_selectValue(e,i){for(let o of i)if(o.value===e){o.checked=!0,this._selectionModel.select(o),this.multiple||(o.tabIndex=0);break}}_updateModelValue(e,i){i&&this._emitChangeEvent(e),this.valueChange.emit(this.value)}_markButtonsForCheck(){this._buttonToggles?.forEach(e=>e._markForCheck())}static \u0275fac=function(i){return new(i||t)};static \u0275dir=L({type:t,selectors:[["mat-button-toggle-group"]],contentQueries:function(i,o,r){if(i&1&&Xn(r,Xc,5),i&2){let s;ne(s=ie())&&(o._buttonToggles=s)}},hostAttrs:[1,"mat-button-toggle-group"],hostVars:6,hostBindings:function(i,o){i&1&&H("keydown",function(s){return o._keydown(s)}),i&2&&(Z("role",o.multiple?"group":"radiogroup")("aria-disabled",o.disabled),V("mat-button-toggle-vertical",o.vertical)("mat-button-toggle-group-appearance-standard",o.appearance==="standard"))},inputs:{appearance:"appearance",name:"name",vertical:[2,"vertical","vertical",ce],value:"value",multiple:[2,"multiple","multiple",ce],disabled:[2,"disabled","disabled",ce],disabledInteractive:[2,"disabledInteractive","disabledInteractive",ce],hideSingleSelectionIndicator:[2,"hideSingleSelectionIndicator","hideSingleSelectionIndicator",ce],hideMultipleSelectionIndicator:[2,"hideMultipleSelectionIndicator","hideMultipleSelectionIndicator",ce]},outputs:{valueChange:"valueChange",change:"change"},exportAs:["matButtonToggleGroup"],features:[Ze([jT,{provide:_D,useExisting:t}])]})}return t})(),Xc=(()=>{class t{_changeDetectorRef=u(We);_elementRef=u(B);_focusMonitor=u(Ot);_idGenerator=u(ke);_animationDisabled=Ee();_checked=!1;ariaLabel;ariaLabelledby=null;_buttonElement;buttonToggleGroup;get buttonId(){return`${this.id}-button`}id;name;value;get tabIndex(){return this._tabIndex()}set tabIndex(e){this._tabIndex.set(e)}_tabIndex;disableRipple=!1;get appearance(){return this.buttonToggleGroup?this.buttonToggleGroup.appearance:this._appearance}set appearance(e){this._appearance=e}_appearance;get checked(){return this.buttonToggleGroup?this.buttonToggleGroup._isSelected(this):this._checked}set checked(e){e!==this._checked&&(this._checked=e,this.buttonToggleGroup&&this.buttonToggleGroup._syncButtonToggle(this,this._checked),this._changeDetectorRef.markForCheck())}get disabled(){return this._disabled||this.buttonToggleGroup&&this.buttonToggleGroup.disabled}set disabled(e){this._disabled=e}_disabled=!1;get disabledInteractive(){return this._disabledInteractive||this.buttonToggleGroup!==null&&this.buttonToggleGroup.disabledInteractive}set disabledInteractive(e){this._disabledInteractive=e}_disabledInteractive;change=new se;constructor(){u(qe).load(ir);let e=u(_D,{optional:!0}),i=u(new Go("tabindex"),{optional:!0})||"",o=u(vD,{optional:!0});this._tabIndex=N(parseInt(i)||0),this.buttonToggleGroup=e,this._appearance=o&&o.appearance?o.appearance:"standard",this._disabledInteractive=o?.disabledInteractive??!1}ngOnInit(){let e=this.buttonToggleGroup;this.id=this.id||this._idGenerator.getId("mat-button-toggle-"),e&&(e._isPrechecked(this)?this.checked=!0:e._isSelected(this)!==this._checked&&e._syncButtonToggle(this,this._checked))}ngAfterViewInit(){this._animationDisabled||this._elementRef.nativeElement.classList.add("mat-button-toggle-animations-enabled"),this._focusMonitor.monitor(this._elementRef,!0)}ngOnDestroy(){let e=this.buttonToggleGroup;this._focusMonitor.stopMonitoring(this._elementRef),e&&e._isSelected(this)&&e._syncButtonToggle(this,!1,!1,!0)}focus(e){this._buttonElement.nativeElement.focus(e)}_onButtonClick(){if(this.disabled)return;let e=this.isSingleSelector()?!0:!this._checked;if(e!==this._checked&&(this._checked=e,this.buttonToggleGroup&&(this.buttonToggleGroup._syncButtonToggle(this,this._checked,!0),this.buttonToggleGroup._onTouched())),this.isSingleSelector()){let i=this.buttonToggleGroup._buttonToggles.find(o=>o.tabIndex===0);i&&(i.tabIndex=-1),this.tabIndex=0}this.change.emit(new Kc(this,this.value))}_markForCheck(){this._changeDetectorRef.markForCheck()}_getButtonName(){return this.isSingleSelector()?this.buttonToggleGroup.name:this.name||null}isSingleSelector(){return this.buttonToggleGroup&&!this.buttonToggleGroup.multiple}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=j({type:t,selectors:[["mat-button-toggle"]],viewQuery:function(i,o){if(i&1&&Pe(LT,5),i&2){let r;ne(r=ie())&&(o._buttonElement=r.first)}},hostAttrs:["role","presentation",1,"mat-button-toggle"],hostVars:14,hostBindings:function(i,o){i&1&&H("focus",function(){return o.focus()}),i&2&&(Z("aria-label",null)("aria-labelledby",null)("id",o.id)("name",null),V("mat-button-toggle-standalone",!o.buttonToggleGroup)("mat-button-toggle-checked",o.checked)("mat-button-toggle-disabled",o.disabled)("mat-button-toggle-disabled-interactive",o.disabledInteractive)("mat-button-toggle-appearance-standard",o.appearance==="standard"))},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],id:"id",name:"name",value:"value",tabIndex:"tabIndex",disableRipple:[2,"disableRipple","disableRipple",ce],appearance:"appearance",checked:[2,"checked","checked",ce],disabled:[2,"disabled","disabled",ce],disabledInteractive:[2,"disabledInteractive","disabledInteractive",ce]},outputs:{change:"change"},exportAs:["matButtonToggle"],ngContentSelectors:VT,decls:7,vars:13,consts:[["button",""],["type","button",1,"mat-button-toggle-button","mat-focus-indicator",3,"click","id","disabled"],[1,"mat-button-toggle-checkbox-wrapper"],[1,"mat-button-toggle-label-content"],[1,"mat-button-toggle-focus-overlay"],["matRipple","",1,"mat-button-toggle-ripple",3,"matRippleTrigger","matRippleDisabled"],["state","checked","aria-hidden","true","appearance","minimal",3,"disabled"]],template:function(i,o){if(i&1&&(Ye(),h(0,"button",1,0),H("click",function(){return o._onButtonClick()}),G(2,BT,2,1,"div",2),h(3,"span",3),me(4),g()(),J(5,"span",4)(6,"span",5)),i&2){let r=fn(1);Q("id",o.buttonId)("disabled",o.disabled&&!o.disabledInteractive||null),Z("role",o.isSingleSelector()?"radio":"button")("tabindex",o.disabled&&!o.disabledInteractive?-1:o.tabIndex)("aria-pressed",o.isSingleSelector()?null:o.checked)("aria-checked",o.isSingleSelector()?o.checked:null)("name",o._getButtonName())("aria-label",o.ariaLabel)("aria-labelledby",o.ariaLabelledby)("aria-disabled",o.disabled&&o.disabledInteractive?"true":null),y(2),W(o.buttonToggleGroup&&(!o.buttonToggleGroup.multiple&&!o.buttonToggleGroup.hideSingleSelectionIndicator||o.buttonToggleGroup.multiple&&!o.buttonToggleGroup.hideMultipleSelectionIndicator)?2:-1),y(4),Q("matRippleTrigger",r)("matRippleDisabled",o.disableRipple||o.disabled)}},dependencies:[Nc,gD],styles:[`.mat-button-toggle-standalone,
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
`],encapsulation:2,changeDetection:0})}return t})(),yD=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=q({type:t});static \u0275inj=z({imports:[or,Xc,be]})}return t})();var UT=20,ii=(()=>{class t{_ngZone=u(S);_platform=u(ae);_renderer=u(Fe).createRenderer(null,null);_cleanupGlobalListener;constructor(){}_scrolled=new C;_scrolledCount=0;scrollContainers=new Map;register(e){this.scrollContainers.has(e)||this.scrollContainers.set(e,e.elementScrolled().subscribe(()=>this._scrolled.next(e)))}deregister(e){let i=this.scrollContainers.get(e);i&&(i.unsubscribe(),this.scrollContainers.delete(e))}scrolled(e=UT){return this._platform.isBrowser?new te(i=>{this._cleanupGlobalListener||(this._cleanupGlobalListener=this._ngZone.runOutsideAngular(()=>this._renderer.listen("document","scroll",()=>this._scrolled.next())));let o=e>0?this._scrolled.pipe(Na(e)).subscribe(i):this._scrolled.subscribe(i);return this._scrolledCount++,()=>{o.unsubscribe(),this._scrolledCount--,this._scrolledCount||(this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0)}}):Ve()}ngOnDestroy(){this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0,this.scrollContainers.forEach((e,i)=>this.deregister(i)),this._scrolled.complete()}ancestorScrolled(e,i){let o=this.getAncestorScrollContainers(e);return this.scrolled(i).pipe(Me(r=>!r||o.indexOf(r)>-1))}getAncestorScrollContainers(e){let i=[];return this.scrollContainers.forEach((o,r)=>{this._scrollableContainsElement(r,e)&&i.push(r)}),i}_scrollableContainsElement(e,i){let o=yt(i),r=e.getElementRef().nativeElement;do if(o==r)return!0;while(o=o.parentElement);return!1}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),jp=(()=>{class t{elementRef=u(B);scrollDispatcher=u(ii);ngZone=u(S);dir=u(Je,{optional:!0});_scrollElement=this.elementRef.nativeElement;_destroyed=new C;_renderer=u(Ae);_cleanupScroll;_elementScrolled=new C;constructor(){}ngOnInit(){this._cleanupScroll=this.ngZone.runOutsideAngular(()=>this._renderer.listen(this._scrollElement,"scroll",e=>this._elementScrolled.next(e))),this.scrollDispatcher.register(this)}ngOnDestroy(){this._cleanupScroll?.(),this._elementScrolled.complete(),this.scrollDispatcher.deregister(this),this._destroyed.next(),this._destroyed.complete()}elementScrolled(){return this._elementScrolled}getElementRef(){return this.elementRef}scrollTo(e){let i=this.elementRef.nativeElement,o=this.dir&&this.dir.value=="rtl";e.left==null&&(e.left=o?e.end:e.start),e.right==null&&(e.right=o?e.start:e.end),e.bottom!=null&&(e.top=i.scrollHeight-i.clientHeight-e.bottom),o&&tr()!=en.NORMAL?(e.left!=null&&(e.right=i.scrollWidth-i.clientWidth-e.left),tr()==en.INVERTED?e.left=e.right:tr()==en.NEGATED&&(e.left=e.right?-e.right:e.right)):e.right!=null&&(e.left=i.scrollWidth-i.clientWidth-e.right),this._applyScrollToOptions(e)}_applyScrollToOptions(e){let i=this.elementRef.nativeElement;Rc()?i.scrollTo(e):(e.top!=null&&(i.scrollTop=e.top),e.left!=null&&(i.scrollLeft=e.left))}measureScrollOffset(e){let i="left",o="right",r=this.elementRef.nativeElement;if(e=="top")return r.scrollTop;if(e=="bottom")return r.scrollHeight-r.clientHeight-r.scrollTop;let s=this.dir&&this.dir.value=="rtl";return e=="start"?e=s?o:i:e=="end"&&(e=s?i:o),s&&tr()==en.INVERTED?e==i?r.scrollWidth-r.clientWidth-r.scrollLeft:r.scrollLeft:s&&tr()==en.NEGATED?e==i?r.scrollLeft+r.scrollWidth-r.clientWidth:-r.scrollLeft:e==i?r.scrollLeft:r.scrollWidth-r.clientWidth-r.scrollLeft}static \u0275fac=function(i){return new(i||t)};static \u0275dir=L({type:t,selectors:[["","cdk-scrollable",""],["","cdkScrollable",""]]})}return t})(),zT=20,so=(()=>{class t{_platform=u(ae);_listeners;_viewportSize=null;_change=new C;_document=u(k);constructor(){let e=u(S),i=u(Fe).createRenderer(null,null);e.runOutsideAngular(()=>{if(this._platform.isBrowser){let o=r=>this._change.next(r);this._listeners=[i.listen("window","resize",o),i.listen("window","orientationchange",o)]}this.change().subscribe(()=>this._viewportSize=null)})}ngOnDestroy(){this._listeners?.forEach(e=>e()),this._change.complete()}getViewportSize(){this._viewportSize||this._updateViewportSize();let e={width:this._viewportSize.width,height:this._viewportSize.height};return this._platform.isBrowser||(this._viewportSize=null),e}getViewportRect(){let e=this.getViewportScrollPosition(),{width:i,height:o}=this.getViewportSize();return{top:e.top,left:e.left,bottom:e.top+o,right:e.left+i,height:o,width:i}}getViewportScrollPosition(){if(!this._platform.isBrowser)return{top:0,left:0};let e=this._document,i=this._getWindow(),o=e.documentElement,r=o.getBoundingClientRect(),s=-r.top||e.body?.scrollTop||i.scrollY||o.scrollTop||0,a=-r.left||e.body?.scrollLeft||i.scrollX||o.scrollLeft||0;return{top:s,left:a}}change(e=zT){return e>0?this._change.pipe(Na(e)):this._change}_getWindow(){return this._document.defaultView||window}_updateViewportSize(){let e=this._getWindow();this._viewportSize=this._platform.isBrowser?{width:e.innerWidth,height:e.innerHeight}:{width:0,height:0}}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var ro=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=q({type:t});static \u0275inj=z({})}return t})(),Hp=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=q({type:t});static \u0275inj=z({imports:[be,ro,be,ro]})}return t})();var $s=class{_attachedHost=null;attach(n){return this._attachedHost=n,n.attach(this)}detach(){let n=this._attachedHost;n!=null&&(this._attachedHost=null,n.detach())}get isAttached(){return this._attachedHost!=null}setAttachedHost(n){this._attachedHost=n}},tn=class extends $s{component;viewContainerRef;injector;projectableNodes;bindings;constructor(n,e,i,o,r){super(),this.component=n,this.viewContainerRef=e,this.injector=i,this.projectableNodes=o,this.bindings=r||null}},mn=class extends $s{templateRef;viewContainerRef;context;injector;constructor(n,e,i,o){super(),this.templateRef=n,this.viewContainerRef=e,this.context=i,this.injector=o}get origin(){return this.templateRef.elementRef}attach(n,e=this.context){return this.context=e,super.attach(n)}detach(){return this.context=void 0,super.detach()}},Up=class extends $s{element;constructor(n){super(),this.element=n instanceof B?n.nativeElement:n}},oi=class{_attachedPortal=null;_disposeFn=null;_isDisposed=!1;hasAttached(){return!!this._attachedPortal}attach(n){if(n instanceof tn)return this._attachedPortal=n,this.attachComponentPortal(n);if(n instanceof mn)return this._attachedPortal=n,this.attachTemplatePortal(n);if(this.attachDomPortal&&n instanceof Up)return this._attachedPortal=n,this.attachDomPortal(n)}attachDomPortal=null;detach(){this._attachedPortal&&(this._attachedPortal.setAttachedHost(null),this._attachedPortal=null),this._invokeDisposeFn()}dispose(){this.hasAttached()&&this.detach(),this._invokeDisposeFn(),this._isDisposed=!0}setDisposeFn(n){this._disposeFn=n}_invokeDisposeFn(){this._disposeFn&&(this._disposeFn(),this._disposeFn=null)}},Gs=class extends oi{outletElement;_appRef;_defaultInjector;constructor(n,e,i){super(),this.outletElement=n,this._appRef=e,this._defaultInjector=i}attachComponentPortal(n){let e;if(n.viewContainerRef){let i=n.injector||n.viewContainerRef.injector,o=i.get(Zn,null,{optional:!0})||void 0;e=n.viewContainerRef.createComponent(n.component,{index:n.viewContainerRef.length,injector:i,ngModuleRef:o,projectableNodes:n.projectableNodes||void 0,bindings:n.bindings||void 0}),this.setDisposeFn(()=>e.destroy())}else{let i=this._appRef,o=n.injector||this._defaultInjector||F.NULL,r=o.get(Re,i.injector);e=ac(n.component,{elementInjector:o,environmentInjector:r,projectableNodes:n.projectableNodes||void 0,bindings:n.bindings||void 0}),i.attachView(e.hostView),this.setDisposeFn(()=>{i.viewCount>0&&i.detachView(e.hostView),e.destroy()})}return this.outletElement.appendChild(this._getComponentRootNode(e)),this._attachedPortal=n,e}attachTemplatePortal(n){let e=n.viewContainerRef,i=e.createEmbeddedView(n.templateRef,n.context,{injector:n.injector});return i.rootNodes.forEach(o=>this.outletElement.appendChild(o)),i.detectChanges(),this.setDisposeFn(()=>{let o=e.indexOf(i);o!==-1&&e.remove(o)}),this._attachedPortal=n,i}attachDomPortal=n=>{let e=n.element;e.parentNode;let i=this.outletElement.ownerDocument.createComment("dom-portal");e.parentNode.insertBefore(i,e),this.outletElement.appendChild(e),this._attachedPortal=n,super.setDisposeFn(()=>{i.parentNode&&i.parentNode.replaceChild(e,i)})};dispose(){super.dispose(),this.outletElement.remove()}_getComponentRootNode(n){return n.hostView.rootNodes[0]}};var ri=(()=>{class t extends oi{_moduleRef=u(Zn,{optional:!0});_document=u(k);_viewContainerRef=u(lt);_isInitialized=!1;_attachedRef=null;constructor(){super()}get portal(){return this._attachedPortal}set portal(e){this.hasAttached()&&!e&&!this._isInitialized||(this.hasAttached()&&super.detach(),e&&super.attach(e),this._attachedPortal=e||null)}attached=new se;get attachedRef(){return this._attachedRef}ngOnInit(){this._isInitialized=!0}ngOnDestroy(){super.dispose(),this._attachedRef=this._attachedPortal=null}attachComponentPortal(e){e.setAttachedHost(this);let i=e.viewContainerRef!=null?e.viewContainerRef:this._viewContainerRef,o=i.createComponent(e.component,{index:i.length,injector:e.injector||i.injector,projectableNodes:e.projectableNodes||void 0,ngModuleRef:this._moduleRef||void 0,bindings:e.bindings||void 0});return i!==this._viewContainerRef&&this._getRootNode().appendChild(o.hostView.rootNodes[0]),super.setDisposeFn(()=>o.destroy()),this._attachedPortal=e,this._attachedRef=o,this.attached.emit(o),o}attachTemplatePortal(e){e.setAttachedHost(this);let i=this._viewContainerRef.createEmbeddedView(e.templateRef,e.context,{injector:e.injector});return super.setDisposeFn(()=>this._viewContainerRef.clear()),this._attachedPortal=e,this._attachedRef=i,this.attached.emit(i),i}attachDomPortal=e=>{let i=e.element;i.parentNode;let o=this._document.createComment("dom-portal");e.setAttachedHost(this),i.parentNode.insertBefore(o,i),this._getRootNode().appendChild(i),this._attachedPortal=e,super.setDisposeFn(()=>{o.parentNode&&o.parentNode.replaceChild(i,o)})};_getRootNode(){let e=this._viewContainerRef.element.nativeElement;return e.nodeType===e.ELEMENT_NODE?e:e.parentNode}static \u0275fac=function(i){return new(i||t)};static \u0275dir=L({type:t,selectors:[["","cdkPortalOutlet",""]],inputs:{portal:[0,"cdkPortalOutlet","portal"]},outputs:{attached:"attached"},exportAs:["cdkPortalOutlet"],features:[he]})}return t})(),si=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=q({type:t});static \u0275inj=z({})}return t})();var bD=Rc();function ur(t){return new Qc(t.get(so),t.get(k))}var Qc=class{_viewportRuler;_previousHTMLStyles={top:"",left:""};_previousScrollPosition;_isEnabled=!1;_document;constructor(n,e){this._viewportRuler=n,this._document=e}attach(){}enable(){if(this._canBeEnabled()){let n=this._document.documentElement;this._previousScrollPosition=this._viewportRuler.getViewportScrollPosition(),this._previousHTMLStyles.left=n.style.left||"",this._previousHTMLStyles.top=n.style.top||"",n.style.left=Oe(-this._previousScrollPosition.left),n.style.top=Oe(-this._previousScrollPosition.top),n.classList.add("cdk-global-scrollblock"),this._isEnabled=!0}}disable(){if(this._isEnabled){let n=this._document.documentElement,e=this._document.body,i=n.style,o=e.style,r=i.scrollBehavior||"",s=o.scrollBehavior||"";this._isEnabled=!1,i.left=this._previousHTMLStyles.left,i.top=this._previousHTMLStyles.top,n.classList.remove("cdk-global-scrollblock"),bD&&(i.scrollBehavior=o.scrollBehavior="auto"),window.scroll(this._previousScrollPosition.left,this._previousScrollPosition.top),bD&&(i.scrollBehavior=r,o.scrollBehavior=s)}}_canBeEnabled(){if(this._document.documentElement.classList.contains("cdk-global-scrollblock")||this._isEnabled)return!1;let e=this._document.documentElement,i=this._viewportRuler.getViewportSize();return e.scrollHeight>i.height||e.scrollWidth>i.width}};function MD(t,n){return new Jc(t.get(ii),t.get(S),t.get(so),n)}var Jc=class{_scrollDispatcher;_ngZone;_viewportRuler;_config;_scrollSubscription=null;_overlayRef;_initialScrollPosition;constructor(n,e,i,o){this._scrollDispatcher=n,this._ngZone=e,this._viewportRuler=i,this._config=o}attach(n){this._overlayRef,this._overlayRef=n}enable(){if(this._scrollSubscription)return;let n=this._scrollDispatcher.scrolled(0).pipe(Me(e=>!e||!this._overlayRef.overlayElement.contains(e.getElementRef().nativeElement)));this._config&&this._config.threshold&&this._config.threshold>1?(this._initialScrollPosition=this._viewportRuler.getViewportScrollPosition().top,this._scrollSubscription=n.subscribe(()=>{let e=this._viewportRuler.getViewportScrollPosition().top;Math.abs(e-this._initialScrollPosition)>this._config.threshold?this._detach():this._overlayRef.updatePosition()})):this._scrollSubscription=n.subscribe(this._detach)}disable(){this._scrollSubscription&&(this._scrollSubscription.unsubscribe(),this._scrollSubscription=null)}detach(){this.disable(),this._overlayRef=null}_detach=()=>{this.disable(),this._overlayRef.hasAttached()&&this._ngZone.run(()=>this._overlayRef.detach())}};var Ws=class{enable(){}disable(){}attach(){}};function zp(t,n){return n.some(e=>{let i=t.bottom<e.top,o=t.top>e.bottom,r=t.right<e.left,s=t.left>e.right;return i||o||r||s})}function DD(t,n){return n.some(e=>{let i=t.top<e.top,o=t.bottom>e.bottom,r=t.left<e.left,s=t.right>e.right;return i||o||r||s})}function fr(t,n){return new ed(t.get(ii),t.get(so),t.get(S),n)}var ed=class{_scrollDispatcher;_viewportRuler;_ngZone;_config;_scrollSubscription=null;_overlayRef;constructor(n,e,i,o){this._scrollDispatcher=n,this._viewportRuler=e,this._ngZone=i,this._config=o}attach(n){this._overlayRef,this._overlayRef=n}enable(){if(!this._scrollSubscription){let n=this._config?this._config.scrollThrottle:0;this._scrollSubscription=this._scrollDispatcher.scrolled(n).subscribe(()=>{if(this._overlayRef.updatePosition(),this._config&&this._config.autoClose){let e=this._overlayRef.overlayElement.getBoundingClientRect(),{width:i,height:o}=this._viewportRuler.getViewportSize();zp(e,[{width:i,height:o,bottom:o,right:i,top:0,left:0}])&&(this.disable(),this._ngZone.run(()=>this._overlayRef.detach()))}})}}disable(){this._scrollSubscription&&(this._scrollSubscription.unsubscribe(),this._scrollSubscription=null)}detach(){this.disable(),this._overlayRef=null}},SD=(()=>{class t{_injector=u(F);constructor(){}noop=()=>new Ws;close=e=>MD(this._injector,e);block=()=>ur(this._injector);reposition=e=>fr(this._injector,e);static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),pn=class{positionStrategy;scrollStrategy=new Ws;panelClass="";hasBackdrop=!1;backdropClass="cdk-overlay-dark-backdrop";disableAnimations;width;height;minWidth;minHeight;maxWidth;maxHeight;direction;disposeOnNavigation=!1;usePopover;eventPredicate;constructor(n){if(n){let e=Object.keys(n);for(let i of e)n[i]!==void 0&&(this[i]=n[i])}}};var td=class{connectionPair;scrollableViewProperties;constructor(n,e){this.connectionPair=n,this.scrollableViewProperties=e}};var TD=(()=>{class t{_attachedOverlays=[];_document=u(k);_isAttached=!1;constructor(){}ngOnDestroy(){this.detach()}add(e){this.remove(e),this._attachedOverlays.push(e)}remove(e){let i=this._attachedOverlays.indexOf(e);i>-1&&this._attachedOverlays.splice(i,1),this._attachedOverlays.length===0&&this.detach()}canReceiveEvent(e,i,o){return o.observers.length<1?!1:e.eventPredicate?e.eventPredicate(i):!0}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),AD=(()=>{class t extends TD{_ngZone=u(S);_renderer=u(Fe).createRenderer(null,null);_cleanupKeydown;add(e){super.add(e),this._isAttached||(this._ngZone.runOutsideAngular(()=>{this._cleanupKeydown=this._renderer.listen("body","keydown",this._keydownListener)}),this._isAttached=!0)}detach(){this._isAttached&&(this._cleanupKeydown?.(),this._isAttached=!1)}_keydownListener=e=>{let i=this._attachedOverlays;for(let o=i.length-1;o>-1;o--){let r=i[o];if(this.canReceiveEvent(r,e,r._keydownEvents)){this._ngZone.run(()=>r._keydownEvents.next(e));break}}};static \u0275fac=(()=>{let e;return function(o){return(e||(e=It(t)))(o||t)}})();static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),kD=(()=>{class t extends TD{_platform=u(ae);_ngZone=u(S);_renderer=u(Fe).createRenderer(null,null);_cursorOriginalValue;_cursorStyleIsSet=!1;_pointerDownEventTarget=null;_cleanups;add(e){if(super.add(e),!this._isAttached){let i=this._document.body,o={capture:!0},r=this._renderer;this._cleanups=this._ngZone.runOutsideAngular(()=>[r.listen(i,"pointerdown",this._pointerDownListener,o),r.listen(i,"click",this._clickListener,o),r.listen(i,"auxclick",this._clickListener,o),r.listen(i,"contextmenu",this._clickListener,o)]),this._platform.IOS&&!this._cursorStyleIsSet&&(this._cursorOriginalValue=i.style.cursor,i.style.cursor="pointer",this._cursorStyleIsSet=!0),this._isAttached=!0}}detach(){this._isAttached&&(this._cleanups?.forEach(e=>e()),this._cleanups=void 0,this._platform.IOS&&this._cursorStyleIsSet&&(this._document.body.style.cursor=this._cursorOriginalValue,this._cursorStyleIsSet=!1),this._isAttached=!1)}_pointerDownListener=e=>{this._pointerDownEventTarget=ut(e)};_clickListener=e=>{let i=ut(e),o=e.type==="click"&&this._pointerDownEventTarget?this._pointerDownEventTarget:i;this._pointerDownEventTarget=null;let r=this._attachedOverlays.slice();for(let s=r.length-1;s>-1;s--){let a=r[s],l=a._outsidePointerEvents;if(!(!a.hasAttached()||!this.canReceiveEvent(a,e,l))){if(CD(a.overlayElement,i)||CD(a.overlayElement,o))break;this._ngZone?this._ngZone.run(()=>l.next(e)):l.next(e)}}};static \u0275fac=(()=>{let e;return function(o){return(e||(e=It(t)))(o||t)}})();static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function CD(t,n){let e=typeof ShadowRoot<"u"&&ShadowRoot,i=n;for(;i;){if(i===t)return!0;i=e&&i instanceof ShadowRoot?i.host:i.parentNode}return!1}var RD=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275cmp=j({type:t,selectors:[["ng-component"]],hostAttrs:["cdk-overlay-style-loader",""],decls:0,vars:0,template:function(i,o){},styles:[`.cdk-overlay-container, .cdk-global-overlay-wrapper {
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
`],encapsulation:2,changeDetection:0})}return t})(),od=(()=>{class t{_platform=u(ae);_containerElement;_document=u(k);_styleLoader=u(qe);constructor(){}ngOnDestroy(){this._containerElement?.remove()}getContainerElement(){return this._loadStyles(),this._containerElement||this._createContainer(),this._containerElement}_createContainer(){let e="cdk-overlay-container";if(this._platform.isBrowser||up()){let o=this._document.querySelectorAll(`.${e}[platform="server"], .${e}[platform="test"]`);for(let r=0;r<o.length;r++)o[r].remove()}let i=this._document.createElement("div");i.classList.add(e),up()?i.setAttribute("platform","test"):this._platform.isBrowser||i.setAttribute("platform","server"),this._document.body.appendChild(i),this._containerElement=i}_loadStyles(){this._styleLoader.load(RD)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),$p=class{_renderer;_ngZone;element;_cleanupClick;_cleanupTransitionEnd;_fallbackTimeout;constructor(n,e,i,o){this._renderer=e,this._ngZone=i,this.element=n.createElement("div"),this.element.classList.add("cdk-overlay-backdrop"),this._cleanupClick=e.listen(this.element,"click",o)}detach(){this._ngZone.runOutsideAngular(()=>{let n=this.element;clearTimeout(this._fallbackTimeout),this._cleanupTransitionEnd?.(),this._cleanupTransitionEnd=this._renderer.listen(n,"transitionend",this.dispose),this._fallbackTimeout=setTimeout(this.dispose,500),n.style.pointerEvents="none",n.classList.remove("cdk-overlay-backdrop-showing")})}dispose=()=>{clearTimeout(this._fallbackTimeout),this._cleanupClick?.(),this._cleanupTransitionEnd?.(),this._cleanupClick=this._cleanupTransitionEnd=this._fallbackTimeout=void 0,this.element.remove()}};function Gp(t){return t&&t.nodeType===1}var dr=class{_portalOutlet;_host;_pane;_config;_ngZone;_keyboardDispatcher;_document;_location;_outsideClickDispatcher;_animationsDisabled;_injector;_renderer;_backdropClick=new C;_attachments=new C;_detachments=new C;_positionStrategy;_scrollStrategy;_locationChanges=de.EMPTY;_backdropRef=null;_detachContentMutationObserver;_detachContentAfterRenderRef;_disposed=!1;_previousHostParent;_keydownEvents=new C;_outsidePointerEvents=new C;_afterNextRenderRef;constructor(n,e,i,o,r,s,a,l,c,d=!1,f,p){this._portalOutlet=n,this._host=e,this._pane=i,this._config=o,this._ngZone=r,this._keyboardDispatcher=s,this._document=a,this._location=l,this._outsideClickDispatcher=c,this._animationsDisabled=d,this._injector=f,this._renderer=p,o.scrollStrategy&&(this._scrollStrategy=o.scrollStrategy,this._scrollStrategy.attach(this)),this._positionStrategy=o.positionStrategy}get overlayElement(){return this._pane}get backdropElement(){return this._backdropRef?.element||null}get hostElement(){return this._host}get eventPredicate(){return this._config?.eventPredicate||null}attach(n){if(this._disposed)return null;this._attachHost();let e=this._portalOutlet.attach(n);return this._positionStrategy?.attach(this),this._updateStackingOrder(),this._updateElementSize(),this._updateElementDirection(),this._scrollStrategy&&this._scrollStrategy.enable(),this._afterNextRenderRef?.destroy(),this._afterNextRenderRef=Ge(()=>{this.hasAttached()&&this.updatePosition()},{injector:this._injector}),this._togglePointerEvents(!0),this._config.hasBackdrop&&this._attachBackdrop(),this._config.panelClass&&this._toggleClasses(this._pane,this._config.panelClass,!0),this._attachments.next(),this._completeDetachContent(),this._keyboardDispatcher.add(this),this._config.disposeOnNavigation&&(this._locationChanges=this._location.subscribe(()=>this.dispose())),this._outsideClickDispatcher.add(this),typeof e?.onDestroy=="function"&&e.onDestroy(()=>{this.hasAttached()&&this._ngZone.runOutsideAngular(()=>Promise.resolve().then(()=>this.detach()))}),e}detach(){if(!this.hasAttached())return;this.detachBackdrop(),this._togglePointerEvents(!1),this._positionStrategy&&this._positionStrategy.detach&&this._positionStrategy.detach(),this._scrollStrategy&&this._scrollStrategy.disable();let n=this._portalOutlet.detach();return this._detachments.next(),this._completeDetachContent(),this._keyboardDispatcher.remove(this),this._detachContentWhenEmpty(),this._locationChanges.unsubscribe(),this._outsideClickDispatcher.remove(this),n}dispose(){if(this._disposed)return;let n=this.hasAttached();this._positionStrategy&&this._positionStrategy.dispose(),this._disposeScrollStrategy(),this._backdropRef?.dispose(),this._locationChanges.unsubscribe(),this._keyboardDispatcher.remove(this),this._portalOutlet.dispose(),this._attachments.complete(),this._backdropClick.complete(),this._keydownEvents.complete(),this._outsidePointerEvents.complete(),this._outsideClickDispatcher.remove(this),this._host?.remove(),this._afterNextRenderRef?.destroy(),this._previousHostParent=this._pane=this._host=this._backdropRef=null,n&&this._detachments.next(),this._detachments.complete(),this._completeDetachContent(),this._disposed=!0}hasAttached(){return this._portalOutlet.hasAttached()}backdropClick(){return this._backdropClick}attachments(){return this._attachments}detachments(){return this._detachments}keydownEvents(){return this._keydownEvents}outsidePointerEvents(){return this._outsidePointerEvents}getConfig(){return this._config}updatePosition(){this._positionStrategy&&this._positionStrategy.apply()}updatePositionStrategy(n){n!==this._positionStrategy&&(this._positionStrategy&&this._positionStrategy.dispose(),this._positionStrategy=n,this.hasAttached()&&(n.attach(this),this.updatePosition()))}updateSize(n){this._config=D(D({},this._config),n),this._updateElementSize()}setDirection(n){this._config=ee(D({},this._config),{direction:n}),this._updateElementDirection()}addPanelClass(n){this._pane&&this._toggleClasses(this._pane,n,!0)}removePanelClass(n){this._pane&&this._toggleClasses(this._pane,n,!1)}getDirection(){let n=this._config.direction;return n?typeof n=="string"?n:n.value:"ltr"}updateScrollStrategy(n){n!==this._scrollStrategy&&(this._disposeScrollStrategy(),this._scrollStrategy=n,this.hasAttached()&&(n.attach(this),n.enable()))}_updateElementDirection(){this._host.setAttribute("dir",this.getDirection())}_updateElementSize(){if(!this._pane)return;let n=this._pane.style;n.width=Oe(this._config.width),n.height=Oe(this._config.height),n.minWidth=Oe(this._config.minWidth),n.minHeight=Oe(this._config.minHeight),n.maxWidth=Oe(this._config.maxWidth),n.maxHeight=Oe(this._config.maxHeight)}_togglePointerEvents(n){this._pane.style.pointerEvents=n?"":"none"}_attachHost(){if(!this._host.parentElement){let n=this._config.usePopover?this._positionStrategy?.getPopoverInsertionPoint?.():null;Gp(n)?n.after(this._host):n?.type==="parent"?n.element.appendChild(this._host):this._previousHostParent?.appendChild(this._host)}if(this._config.usePopover)try{this._host.showPopover()}catch{}}_attachBackdrop(){let n="cdk-overlay-backdrop-showing";this._backdropRef?.dispose(),this._backdropRef=new $p(this._document,this._renderer,this._ngZone,e=>{this._backdropClick.next(e)}),this._animationsDisabled&&this._backdropRef.element.classList.add("cdk-overlay-backdrop-noop-animation"),this._config.backdropClass&&this._toggleClasses(this._backdropRef.element,this._config.backdropClass,!0),this._config.usePopover?this._host.prepend(this._backdropRef.element):this._host.parentElement.insertBefore(this._backdropRef.element,this._host),!this._animationsDisabled&&typeof requestAnimationFrame<"u"?this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>this._backdropRef?.element.classList.add(n))}):this._backdropRef.element.classList.add(n)}_updateStackingOrder(){!this._config.usePopover&&this._host.nextSibling&&this._host.parentNode.appendChild(this._host)}detachBackdrop(){this._animationsDisabled?(this._backdropRef?.dispose(),this._backdropRef=null):this._backdropRef?.detach()}_toggleClasses(n,e,i){let o=Jo(e||[]).filter(r=>!!r);o.length&&(i?n.classList.add(...o):n.classList.remove(...o))}_detachContentWhenEmpty(){let n=!1;try{this._detachContentAfterRenderRef=Ge(()=>{n=!0,this._detachContent()},{injector:this._injector})}catch(e){if(n)throw e;this._detachContent()}globalThis.MutationObserver&&this._pane&&(this._detachContentMutationObserver||=new globalThis.MutationObserver(()=>{this._detachContent()}),this._detachContentMutationObserver.observe(this._pane,{childList:!0}))}_detachContent(){(!this._pane||!this._host||this._pane.children.length===0)&&(this._pane&&this._config.panelClass&&this._toggleClasses(this._pane,this._config.panelClass,!1),this._host&&this._host.parentElement&&(this._previousHostParent=this._host.parentElement,this._host.remove()),this._completeDetachContent())}_completeDetachContent(){this._detachContentAfterRenderRef?.destroy(),this._detachContentAfterRenderRef=void 0,this._detachContentMutationObserver?.disconnect()}_disposeScrollStrategy(){let n=this._scrollStrategy;n?.disable(),n?.detach?.()}},ED="cdk-overlay-connected-position-bounding-box",GT=/([A-Za-z%]+)$/;function mr(t,n){return new nd(n,t.get(so),t.get(k),t.get(ae),t.get(od))}var nd=class{_viewportRuler;_document;_platform;_overlayContainer;_overlayRef;_isInitialRender=!1;_lastBoundingBoxSize={width:0,height:0};_isPushed=!1;_canPush=!0;_growAfterOpen=!1;_hasFlexibleDimensions=!0;_positionLocked=!1;_originRect;_overlayRect;_viewportRect;_containerRect;_viewportMargin=0;_scrollables=[];_preferredPositions=[];_origin;_pane;_isDisposed=!1;_boundingBox=null;_lastPosition=null;_lastScrollVisibility=null;_positionChanges=new C;_resizeSubscription=de.EMPTY;_offsetX=0;_offsetY=0;_transformOriginSelector;_appliedPanelClasses=[];_previousPushAmount=null;_popoverLocation="global";positionChanges=this._positionChanges;get positions(){return this._preferredPositions}constructor(n,e,i,o,r){this._viewportRuler=e,this._document=i,this._platform=o,this._overlayContainer=r,this.setOrigin(n)}attach(n){this._overlayRef&&this._overlayRef,this._validatePositions(),n.hostElement.classList.add(ED),this._overlayRef=n,this._boundingBox=n.hostElement,this._pane=n.overlayElement,this._isDisposed=!1,this._isInitialRender=!0,this._lastPosition=null,this._resizeSubscription.unsubscribe(),this._resizeSubscription=this._viewportRuler.change().subscribe(()=>{this._isInitialRender=!0,this.apply()})}apply(){if(this._isDisposed||!this._platform.isBrowser)return;if(!this._isInitialRender&&this._positionLocked&&this._lastPosition){this.reapplyLastPosition();return}this._clearPanelClasses(),this._resetOverlayElementStyles(),this._resetBoundingBoxStyles(),this._viewportRect=this._getNarrowedViewportRect(),this._originRect=this._getOriginRect(),this._overlayRect=this._pane.getBoundingClientRect(),this._containerRect=this._getContainerRect();let n=this._originRect,e=this._overlayRect,i=this._viewportRect,o=this._containerRect,r=[],s;for(let a of this._preferredPositions){let l=this._getOriginPoint(n,o,a),c=this._getOverlayPoint(l,e,a),d=this._getOverlayFit(c,e,i,a);if(d.isCompletelyWithinViewport){this._isPushed=!1,this._applyPosition(a,l);return}if(this._canFitWithFlexibleDimensions(d,c,i)){r.push({position:a,origin:l,overlayRect:e,boundingBoxRect:this._calculateBoundingBoxRect(l,a)});continue}(!s||s.overlayFit.visibleArea<d.visibleArea)&&(s={overlayFit:d,overlayPoint:c,originPoint:l,position:a,overlayRect:e})}if(r.length){let a=null,l=-1;for(let c of r){let d=c.boundingBoxRect.width*c.boundingBoxRect.height*(c.position.weight||1);d>l&&(l=d,a=c)}this._isPushed=!1,this._applyPosition(a.position,a.origin);return}if(this._canPush){this._isPushed=!0,this._applyPosition(s.position,s.originPoint);return}this._applyPosition(s.position,s.originPoint)}detach(){this._clearPanelClasses(),this._lastPosition=null,this._previousPushAmount=null,this._resizeSubscription.unsubscribe()}dispose(){this._isDisposed||(this._boundingBox&&ao(this._boundingBox.style,{top:"",left:"",right:"",bottom:"",height:"",width:"",alignItems:"",justifyContent:""}),this._pane&&this._resetOverlayElementStyles(),this._overlayRef&&this._overlayRef.hostElement.classList.remove(ED),this.detach(),this._positionChanges.complete(),this._overlayRef=this._boundingBox=null,this._isDisposed=!0)}reapplyLastPosition(){if(this._isDisposed||!this._platform.isBrowser)return;let n=this._lastPosition;n?(this._originRect=this._getOriginRect(),this._overlayRect=this._pane.getBoundingClientRect(),this._viewportRect=this._getNarrowedViewportRect(),this._containerRect=this._getContainerRect(),this._applyPosition(n,this._getOriginPoint(this._originRect,this._containerRect,n))):this.apply()}withScrollableContainers(n){return this._scrollables=n,this}withPositions(n){return this._preferredPositions=n,n.indexOf(this._lastPosition)===-1&&(this._lastPosition=null),this._validatePositions(),this}withViewportMargin(n){return this._viewportMargin=n,this}withFlexibleDimensions(n=!0){return this._hasFlexibleDimensions=n,this}withGrowAfterOpen(n=!0){return this._growAfterOpen=n,this}withPush(n=!0){return this._canPush=n,this}withLockedPosition(n=!0){return this._positionLocked=n,this}setOrigin(n){return this._origin=n,this}withDefaultOffsetX(n){return this._offsetX=n,this}withDefaultOffsetY(n){return this._offsetY=n,this}withTransformOriginOn(n){return this._transformOriginSelector=n,this}withPopoverLocation(n){return this._popoverLocation=n,this}getPopoverInsertionPoint(){return this._popoverLocation==="global"?null:this._popoverLocation!=="inline"?this._popoverLocation:this._origin instanceof B?this._origin.nativeElement:Gp(this._origin)?this._origin:null}_getOriginPoint(n,e,i){let o;if(i.originX=="center")o=n.left+n.width/2;else{let s=this._isRtl()?n.right:n.left,a=this._isRtl()?n.left:n.right;o=i.originX=="start"?s:a}e.left<0&&(o-=e.left);let r;return i.originY=="center"?r=n.top+n.height/2:r=i.originY=="top"?n.top:n.bottom,e.top<0&&(r-=e.top),{x:o,y:r}}_getOverlayPoint(n,e,i){let o;i.overlayX=="center"?o=-e.width/2:i.overlayX==="start"?o=this._isRtl()?-e.width:0:o=this._isRtl()?0:-e.width;let r;return i.overlayY=="center"?r=-e.height/2:r=i.overlayY=="top"?0:-e.height,{x:n.x+o,y:n.y+r}}_getOverlayFit(n,e,i,o){let r=xD(e),{x:s,y:a}=n,l=this._getOffset(o,"x"),c=this._getOffset(o,"y");l&&(s+=l),c&&(a+=c);let d=0-s,f=s+r.width-i.width,p=0-a,m=a+r.height-i.height,v=this._subtractOverflows(r.width,d,f),w=this._subtractOverflows(r.height,p,m),I=v*w;return{visibleArea:I,isCompletelyWithinViewport:r.width*r.height===I,fitsInViewportVertically:w===r.height,fitsInViewportHorizontally:v==r.width}}_canFitWithFlexibleDimensions(n,e,i){if(this._hasFlexibleDimensions){let o=i.bottom-e.y,r=i.right-e.x,s=wD(this._overlayRef.getConfig().minHeight),a=wD(this._overlayRef.getConfig().minWidth),l=n.fitsInViewportVertically||s!=null&&s<=o,c=n.fitsInViewportHorizontally||a!=null&&a<=r;return l&&c}return!1}_pushOverlayOnScreen(n,e,i){if(this._previousPushAmount&&this._positionLocked)return{x:n.x+this._previousPushAmount.x,y:n.y+this._previousPushAmount.y};let o=xD(e),r=this._viewportRect,s=Math.max(n.x+o.width-r.width,0),a=Math.max(n.y+o.height-r.height,0),l=Math.max(r.top-i.top-n.y,0),c=Math.max(r.left-i.left-n.x,0),d=0,f=0;return o.width<=r.width?d=c||-s:d=n.x<this._getViewportMarginStart()?r.left-i.left-n.x:0,o.height<=r.height?f=l||-a:f=n.y<this._getViewportMarginTop()?r.top-i.top-n.y:0,this._previousPushAmount={x:d,y:f},{x:n.x+d,y:n.y+f}}_applyPosition(n,e){if(this._setTransformOrigin(n),this._setOverlayElementStyles(e,n),this._setBoundingBoxStyles(e,n),n.panelClass&&this._addPanelClasses(n.panelClass),this._positionChanges.observers.length){let i=this._getScrollVisibility();if(n!==this._lastPosition||!this._lastScrollVisibility||!WT(this._lastScrollVisibility,i)){let o=new td(n,i);this._positionChanges.next(o)}this._lastScrollVisibility=i}this._lastPosition=n,this._isInitialRender=!1}_setTransformOrigin(n){if(!this._transformOriginSelector)return;let e=this._boundingBox.querySelectorAll(this._transformOriginSelector),i,o=n.overlayY;n.overlayX==="center"?i="center":this._isRtl()?i=n.overlayX==="start"?"right":"left":i=n.overlayX==="start"?"left":"right";for(let r=0;r<e.length;r++)e[r].style.transformOrigin=`${i} ${o}`}_calculateBoundingBoxRect(n,e){let i=this._viewportRect,o=this._isRtl(),r,s,a;if(e.overlayY==="top")s=n.y,r=i.height-s+this._getViewportMarginBottom();else if(e.overlayY==="bottom")a=i.height-n.y+this._getViewportMarginTop()+this._getViewportMarginBottom(),r=i.height-a+this._getViewportMarginTop();else{let m=Math.min(i.bottom-n.y+i.top,n.y),v=this._lastBoundingBoxSize.height;r=m*2,s=n.y-m,r>v&&!this._isInitialRender&&!this._growAfterOpen&&(s=n.y-v/2)}let l=e.overlayX==="start"&&!o||e.overlayX==="end"&&o,c=e.overlayX==="end"&&!o||e.overlayX==="start"&&o,d,f,p;if(c)p=i.width-n.x+this._getViewportMarginStart()+this._getViewportMarginEnd(),d=n.x-this._getViewportMarginStart();else if(l)f=n.x,d=i.right-n.x-this._getViewportMarginEnd();else{let m=Math.min(i.right-n.x+i.left,n.x),v=this._lastBoundingBoxSize.width;d=m*2,f=n.x-m,d>v&&!this._isInitialRender&&!this._growAfterOpen&&(f=n.x-v/2)}return{top:s,left:f,bottom:a,right:p,width:d,height:r}}_setBoundingBoxStyles(n,e){let i=this._calculateBoundingBoxRect(n,e);!this._isInitialRender&&!this._growAfterOpen&&(i.height=Math.min(i.height,this._lastBoundingBoxSize.height),i.width=Math.min(i.width,this._lastBoundingBoxSize.width));let o={};if(this._hasExactPosition())o.top=o.left="0",o.bottom=o.right="auto",o.maxHeight=o.maxWidth="",o.width=o.height="100%";else{let r=this._overlayRef.getConfig().maxHeight,s=this._overlayRef.getConfig().maxWidth;o.width=Oe(i.width),o.height=Oe(i.height),o.top=Oe(i.top)||"auto",o.bottom=Oe(i.bottom)||"auto",o.left=Oe(i.left)||"auto",o.right=Oe(i.right)||"auto",e.overlayX==="center"?o.alignItems="center":o.alignItems=e.overlayX==="end"?"flex-end":"flex-start",e.overlayY==="center"?o.justifyContent="center":o.justifyContent=e.overlayY==="bottom"?"flex-end":"flex-start",r&&(o.maxHeight=Oe(r)),s&&(o.maxWidth=Oe(s))}this._lastBoundingBoxSize=i,ao(this._boundingBox.style,o)}_resetBoundingBoxStyles(){ao(this._boundingBox.style,{top:"0",left:"0",right:"0",bottom:"0",height:"",width:"",alignItems:"",justifyContent:""})}_resetOverlayElementStyles(){ao(this._pane.style,{top:"",left:"",bottom:"",right:"",position:"",transform:""})}_setOverlayElementStyles(n,e){let i={},o=this._hasExactPosition(),r=this._hasFlexibleDimensions,s=this._overlayRef.getConfig();if(o){let d=this._viewportRuler.getViewportScrollPosition();ao(i,this._getExactOverlayY(e,n,d)),ao(i,this._getExactOverlayX(e,n,d))}else i.position="static";let a="",l=this._getOffset(e,"x"),c=this._getOffset(e,"y");l&&(a+=`translateX(${l}px) `),c&&(a+=`translateY(${c}px)`),i.transform=a.trim(),s.maxHeight&&(o?i.maxHeight=Oe(s.maxHeight):r&&(i.maxHeight="")),s.maxWidth&&(o?i.maxWidth=Oe(s.maxWidth):r&&(i.maxWidth="")),ao(this._pane.style,i)}_getExactOverlayY(n,e,i){let o={top:"",bottom:""},r=this._getOverlayPoint(e,this._overlayRect,n);if(this._isPushed&&(r=this._pushOverlayOnScreen(r,this._overlayRect,i)),n.overlayY==="bottom"){let s=this._document.documentElement.clientHeight;o.bottom=`${s-(r.y+this._overlayRect.height)}px`}else o.top=Oe(r.y);return o}_getExactOverlayX(n,e,i){let o={left:"",right:""},r=this._getOverlayPoint(e,this._overlayRect,n);this._isPushed&&(r=this._pushOverlayOnScreen(r,this._overlayRect,i));let s;if(this._isRtl()?s=n.overlayX==="end"?"left":"right":s=n.overlayX==="end"?"right":"left",s==="right"){let a=this._document.documentElement.clientWidth;o.right=`${a-(r.x+this._overlayRect.width)}px`}else o.left=Oe(r.x);return o}_getScrollVisibility(){let n=this._getOriginRect(),e=this._pane.getBoundingClientRect(),i=this._scrollables.map(o=>o.getElementRef().nativeElement.getBoundingClientRect());return{isOriginClipped:DD(n,i),isOriginOutsideView:zp(n,i),isOverlayClipped:DD(e,i),isOverlayOutsideView:zp(e,i)}}_subtractOverflows(n,...e){return e.reduce((i,o)=>i-Math.max(o,0),n)}_getNarrowedViewportRect(){let n=this._document.documentElement.clientWidth,e=this._document.documentElement.clientHeight,i=this._viewportRuler.getViewportScrollPosition();return{top:i.top+this._getViewportMarginTop(),left:i.left+this._getViewportMarginStart(),right:i.left+n-this._getViewportMarginEnd(),bottom:i.top+e-this._getViewportMarginBottom(),width:n-this._getViewportMarginStart()-this._getViewportMarginEnd(),height:e-this._getViewportMarginTop()-this._getViewportMarginBottom()}}_isRtl(){return this._overlayRef.getDirection()==="rtl"}_hasExactPosition(){return!this._hasFlexibleDimensions||this._isPushed}_getOffset(n,e){return e==="x"?n.offsetX==null?this._offsetX:n.offsetX:n.offsetY==null?this._offsetY:n.offsetY}_validatePositions(){}_addPanelClasses(n){this._pane&&Jo(n).forEach(e=>{e!==""&&this._appliedPanelClasses.indexOf(e)===-1&&(this._appliedPanelClasses.push(e),this._pane.classList.add(e))})}_clearPanelClasses(){this._pane&&(this._appliedPanelClasses.forEach(n=>{this._pane.classList.remove(n)}),this._appliedPanelClasses=[])}_getViewportMarginStart(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.start??0}_getViewportMarginEnd(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.end??0}_getViewportMarginTop(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.top??0}_getViewportMarginBottom(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.bottom??0}_getOriginRect(){let n=this._origin;if(n instanceof B)return n.nativeElement.getBoundingClientRect();if(n instanceof Element)return n.getBoundingClientRect();let e=n.width||0,i=n.height||0;return{top:n.y,bottom:n.y+i,left:n.x,right:n.x+e,height:i,width:e}}_getContainerRect(){let n=this._overlayRef.getConfig().usePopover&&this._popoverLocation!=="global",e=this._overlayContainer.getContainerElement();n&&(e.style.display="block");let i=e.getBoundingClientRect();return n&&(e.style.display=""),i}};function ao(t,n){for(let e in n)n.hasOwnProperty(e)&&(t[e]=n[e]);return t}function wD(t){if(typeof t!="number"&&t!=null){let[n,e]=t.split(GT);return!e||e==="px"?parseFloat(n):null}return t||null}function xD(t){return{top:Math.floor(t.top),right:Math.floor(t.right),bottom:Math.floor(t.bottom),left:Math.floor(t.left),width:Math.floor(t.width),height:Math.floor(t.height)}}function WT(t,n){return t===n?!0:t.isOriginClipped===n.isOriginClipped&&t.isOriginOutsideView===n.isOriginOutsideView&&t.isOverlayClipped===n.isOverlayClipped&&t.isOverlayOutsideView===n.isOverlayOutsideView}var ID="cdk-global-overlay-wrapper";function ai(t){return new id}var id=class{_overlayRef;_cssPosition="static";_topOffset="";_bottomOffset="";_alignItems="";_xPosition="";_xOffset="";_width="";_height="";_isDisposed=!1;attach(n){let e=n.getConfig();this._overlayRef=n,this._width&&!e.width&&n.updateSize({width:this._width}),this._height&&!e.height&&n.updateSize({height:this._height}),n.hostElement.classList.add(ID),this._isDisposed=!1}top(n=""){return this._bottomOffset="",this._topOffset=n,this._alignItems="flex-start",this}left(n=""){return this._xOffset=n,this._xPosition="left",this}bottom(n=""){return this._topOffset="",this._bottomOffset=n,this._alignItems="flex-end",this}right(n=""){return this._xOffset=n,this._xPosition="right",this}start(n=""){return this._xOffset=n,this._xPosition="start",this}end(n=""){return this._xOffset=n,this._xPosition="end",this}width(n=""){return this._overlayRef?this._overlayRef.updateSize({width:n}):this._width=n,this}height(n=""){return this._overlayRef?this._overlayRef.updateSize({height:n}):this._height=n,this}centerHorizontally(n=""){return this.left(n),this._xPosition="center",this}centerVertically(n=""){return this.top(n),this._alignItems="center",this}apply(){if(!this._overlayRef||!this._overlayRef.hasAttached())return;let n=this._overlayRef.overlayElement.style,e=this._overlayRef.hostElement.style,i=this._overlayRef.getConfig(),{width:o,height:r,maxWidth:s,maxHeight:a}=i,l=(o==="100%"||o==="100vw")&&(!s||s==="100%"||s==="100vw"),c=(r==="100%"||r==="100vh")&&(!a||a==="100%"||a==="100vh"),d=this._xPosition,f=this._xOffset,p=this._overlayRef.getConfig().direction==="rtl",m="",v="",w="";l?w="flex-start":d==="center"?(w="center",p?v=f:m=f):p?d==="left"||d==="end"?(w="flex-end",m=f):(d==="right"||d==="start")&&(w="flex-start",v=f):d==="left"||d==="start"?(w="flex-start",m=f):(d==="right"||d==="end")&&(w="flex-end",v=f),n.position=this._cssPosition,n.marginLeft=l?"0":m,n.marginTop=c?"0":this._topOffset,n.marginBottom=this._bottomOffset,n.marginRight=l?"0":v,e.justifyContent=w,e.alignItems=c?"flex-start":this._alignItems}dispose(){if(this._isDisposed||!this._overlayRef)return;let n=this._overlayRef.overlayElement.style,e=this._overlayRef.hostElement,i=e.style;e.classList.remove(ID),i.justifyContent=i.alignItems=n.marginTop=n.marginBottom=n.marginLeft=n.marginRight=n.position="",this._overlayRef=null,this._isDisposed=!0}},ND=(()=>{class t{_injector=u(F);constructor(){}global(){return ai()}flexibleConnectedTo(e){return mr(this._injector,e)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),OD=new _("OVERLAY_DEFAULT_CONFIG");function hn(t,n){t.get(qe).load(RD);let e=t.get(od),i=t.get(k),o=t.get(ke),r=t.get(Mt),s=t.get(Je),a=t.get(Ae,null,{optional:!0})||t.get(Fe).createRenderer(null,null),l=new pn(n),c=t.get(OD,null,{optional:!0})?.usePopover??!0;l.direction=l.direction||s.value,"showPopover"in i.body?l.usePopover=n?.usePopover??c:l.usePopover=!1;let d=i.createElement("div"),f=i.createElement("div");d.id=o.getId("cdk-overlay-"),d.classList.add("cdk-overlay-pane"),f.appendChild(d),l.usePopover&&(f.setAttribute("popover","manual"),f.classList.add("cdk-overlay-popover"));let p=l.usePopover?l.positionStrategy?.getPopoverInsertionPoint?.():null;return Gp(p)?p.after(f):p?.type==="parent"?p.element.appendChild(f):e.getContainerElement().appendChild(f),new dr(new Gs(d,r,t),f,d,l,t.get(S),t.get(AD),i,t.get(cc),t.get(kD),n?.disableAnimations??t.get(as,null,{optional:!0})==="NoopAnimations",t.get(Re),a)}var FD=(()=>{class t{scrollStrategies=u(SD);_positionBuilder=u(ND);_injector=u(F);constructor(){}create(e){return hn(this._injector,e)}position(){return this._positionBuilder}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var gn=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=q({type:t});static \u0275inj=z({providers:[FD],imports:[be,si,Hp,Hp]})}return t})();function qT(t,n){}var li=class{viewContainerRef;injector;id;role="dialog";panelClass="";hasBackdrop=!0;backdropClass="";disableClose=!1;closePredicate;width="";height="";minWidth;minHeight;maxWidth;maxHeight;positionStrategy;data=null;direction;ariaDescribedBy=null;ariaLabelledBy=null;ariaLabel=null;ariaModal=!1;autoFocus="first-tabbable";restoreFocus=!0;scrollStrategy;closeOnNavigation=!0;closeOnDestroy=!0;closeOnOverlayDetachments=!0;disableAnimations=!1;providers;container;templateContext};var qp=(()=>{class t extends oi{_elementRef=u(B);_focusTrapFactory=u(sp);_config;_interactivityChecker=u(rp);_ngZone=u(S);_focusMonitor=u(Ot);_renderer=u(Ae);_changeDetectorRef=u(We);_injector=u(F);_platform=u(ae);_document=u(k);_portalOutlet;_focusTrapped=new C;_focusTrap=null;_elementFocusedBeforeDialogWasOpened=null;_closeInteractionType=null;_ariaLabelledByQueue=[];_isDestroyed=!1;constructor(){super(),this._config=u(li,{optional:!0})||new li,this._config.ariaLabelledBy&&this._ariaLabelledByQueue.push(this._config.ariaLabelledBy)}_addAriaLabelledBy(e){this._ariaLabelledByQueue.push(e),this._changeDetectorRef.markForCheck()}_removeAriaLabelledBy(e){let i=this._ariaLabelledByQueue.indexOf(e);i>-1&&(this._ariaLabelledByQueue.splice(i,1),this._changeDetectorRef.markForCheck())}_contentAttached(){this._initializeFocusTrap(),this._captureInitialFocus()}_captureInitialFocus(){this._trapFocus()}ngOnDestroy(){this._focusTrapped.complete(),this._isDestroyed=!0,this._restoreFocus()}attachComponentPortal(e){this._portalOutlet.hasAttached();let i=this._portalOutlet.attachComponentPortal(e);return this._contentAttached(),i}attachTemplatePortal(e){this._portalOutlet.hasAttached();let i=this._portalOutlet.attachTemplatePortal(e);return this._contentAttached(),i}attachDomPortal=e=>{this._portalOutlet.hasAttached();let i=this._portalOutlet.attachDomPortal(e);return this._contentAttached(),i};_recaptureFocus(){this._containsFocus()||this._trapFocus()}_forceFocus(e,i){this._interactivityChecker.isFocusable(e)||(e.tabIndex=-1,this._ngZone.runOutsideAngular(()=>{let o=()=>{r(),s(),e.removeAttribute("tabindex")},r=this._renderer.listen(e,"blur",o),s=this._renderer.listen(e,"mousedown",o)})),e.focus(i)}_focusByCssSelector(e,i){let o=this._elementRef.nativeElement.querySelector(e);o&&this._forceFocus(o,i)}_trapFocus(e){this._isDestroyed||Ge(()=>{let i=this._elementRef.nativeElement;switch(this._config.autoFocus){case!1:case"dialog":this._containsFocus()||i.focus(e);break;case!0:case"first-tabbable":this._focusTrap?.focusInitialElement(e)||this._focusDialogContainer(e);break;case"first-heading":this._focusByCssSelector('h1, h2, h3, h4, h5, h6, [role="heading"]',e);break;default:this._focusByCssSelector(this._config.autoFocus,e);break}this._focusTrapped.next()},{injector:this._injector})}_restoreFocus(){let e=this._config.restoreFocus,i=null;if(typeof e=="string"?i=this._document.querySelector(e):typeof e=="boolean"?i=e?this._elementFocusedBeforeDialogWasOpened:null:e&&(i=e),this._config.restoreFocus&&i&&typeof i.focus=="function"){let o=Is(),r=this._elementRef.nativeElement;(!o||o===this._document.body||o===r||r.contains(o))&&(this._focusMonitor?(this._focusMonitor.focusVia(i,this._closeInteractionType),this._closeInteractionType=null):i.focus())}this._focusTrap&&this._focusTrap.destroy()}_focusDialogContainer(e){this._elementRef.nativeElement.focus?.(e)}_containsFocus(){let e=this._elementRef.nativeElement,i=Is();return e===i||e.contains(i)}_initializeFocusTrap(){this._platform.isBrowser&&(this._focusTrap=this._focusTrapFactory.create(this._elementRef.nativeElement),this._document&&(this._elementFocusedBeforeDialogWasOpened=Is()))}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=j({type:t,selectors:[["cdk-dialog-container"]],viewQuery:function(i,o){if(i&1&&Pe(ri,7),i&2){let r;ne(r=ie())&&(o._portalOutlet=r.first)}},hostAttrs:["tabindex","-1",1,"cdk-dialog-container"],hostVars:6,hostBindings:function(i,o){i&2&&Z("id",o._config.id||null)("role",o._config.role)("aria-modal",o._config.ariaModal)("aria-labelledby",o._config.ariaLabel?null:o._ariaLabelledByQueue[0])("aria-label",o._config.ariaLabel)("aria-describedby",o._config.ariaDescribedBy||null)},features:[he],decls:1,vars:0,consts:[["cdkPortalOutlet",""]],template:function(i,o){i&1&&ct(0,qT,0,0,"ng-template",0)},dependencies:[ri],styles:[`.cdk-dialog-container {
  display: block;
  width: 100%;
  height: 100%;
  min-height: inherit;
  max-height: inherit;
}
`],encapsulation:2})}return t})(),qs=class{overlayRef;config;componentInstance=null;componentRef=null;containerInstance;disableClose;closed=new C;backdropClick;keydownEvents;outsidePointerEvents;id;_detachSubscription;constructor(n,e){this.overlayRef=n,this.config=e,this.disableClose=e.disableClose,this.backdropClick=n.backdropClick(),this.keydownEvents=n.keydownEvents(),this.outsidePointerEvents=n.outsidePointerEvents(),this.id=e.id,this.keydownEvents.subscribe(i=>{i.keyCode===27&&!this.disableClose&&!Ft(i)&&(i.preventDefault(),this.close(void 0,{focusOrigin:"keyboard"}))}),this.backdropClick.subscribe(()=>{!this.disableClose&&this._canClose()?this.close(void 0,{focusOrigin:"mouse"}):this.containerInstance._recaptureFocus?.()}),this._detachSubscription=n.detachments().subscribe(()=>{e.closeOnOverlayDetachments!==!1&&this.close()})}close(n,e){if(this._canClose(n)){let i=this.closed;this.containerInstance._closeInteractionType=e?.focusOrigin||"program",this._detachSubscription.unsubscribe(),this.overlayRef.dispose(),i.next(n),i.complete(),this.componentInstance=this.containerInstance=null}}updatePosition(){return this.overlayRef.updatePosition(),this}updateSize(n="",e=""){return this.overlayRef.updateSize({width:n,height:e}),this}addPanelClass(n){return this.overlayRef.addPanelClass(n),this}removePanelClass(n){return this.overlayRef.removePanelClass(n),this}_canClose(n){let e=this.config;return!!this.containerInstance&&(!e.closePredicate||e.closePredicate(n,e,this.componentInstance))}},YT=new _("DialogScrollStrategy",{providedIn:"root",factory:()=>{let t=u(F);return()=>ur(t)}}),ZT=new _("DialogData"),KT=new _("DefaultDialogConfig");function XT(t){let n=N(t),e=new se;return{valueSignal:n,get value(){return n()},change:e,ngOnDestroy(){e.complete()}}}var Yp=(()=>{class t{_injector=u(F);_defaultOptions=u(KT,{optional:!0});_parentDialog=u(t,{optional:!0,skipSelf:!0});_overlayContainer=u(od);_idGenerator=u(ke);_openDialogsAtThisLevel=[];_afterAllClosedAtThisLevel=new C;_afterOpenedAtThisLevel=new C;_ariaHiddenElements=new Map;_scrollStrategy=u(YT);get openDialogs(){return this._parentDialog?this._parentDialog.openDialogs:this._openDialogsAtThisLevel}get afterOpened(){return this._parentDialog?this._parentDialog.afterOpened:this._afterOpenedAtThisLevel}afterAllClosed=kr(()=>this.openDialogs.length?this._getAfterAllClosed():this._getAfterAllClosed().pipe(st(void 0)));constructor(){}open(e,i){let o=this._defaultOptions||new li;i=D(D({},o),i),i.id=i.id||this._idGenerator.getId("cdk-dialog-"),i.id&&this.getDialogById(i.id);let r=this._getOverlayConfig(i),s=hn(this._injector,r),a=new qs(s,i),l=this._attachContainer(s,a,i);if(a.containerInstance=l,!this.openDialogs.length){let c=this._overlayContainer.getContainerElement();l._focusTrapped?l._focusTrapped.pipe(pt(1)).subscribe(()=>{this._hideNonDialogContentFromAssistiveTechnology(c)}):this._hideNonDialogContentFromAssistiveTechnology(c)}return this._attachDialogContent(e,a,l,i),this.openDialogs.push(a),a.closed.subscribe(()=>this._removeOpenDialog(a,!0)),this.afterOpened.next(a),a}closeAll(){Wp(this.openDialogs,e=>e.close())}getDialogById(e){return this.openDialogs.find(i=>i.id===e)}ngOnDestroy(){Wp(this._openDialogsAtThisLevel,e=>{e.config.closeOnDestroy===!1&&this._removeOpenDialog(e,!1)}),Wp(this._openDialogsAtThisLevel,e=>e.close()),this._afterAllClosedAtThisLevel.complete(),this._afterOpenedAtThisLevel.complete(),this._openDialogsAtThisLevel=[]}_getOverlayConfig(e){let i=new pn({positionStrategy:e.positionStrategy||ai().centerHorizontally().centerVertically(),scrollStrategy:e.scrollStrategy||this._scrollStrategy(),panelClass:e.panelClass,hasBackdrop:e.hasBackdrop,direction:e.direction,minWidth:e.minWidth,minHeight:e.minHeight,maxWidth:e.maxWidth,maxHeight:e.maxHeight,width:e.width,height:e.height,disposeOnNavigation:e.closeOnNavigation,disableAnimations:e.disableAnimations});return e.backdropClass&&(i.backdropClass=e.backdropClass),i}_attachContainer(e,i,o){let r=o.injector||o.viewContainerRef?.injector,s=[{provide:li,useValue:o},{provide:qs,useValue:i},{provide:dr,useValue:e}],a;o.container?typeof o.container=="function"?a=o.container:(a=o.container.type,s.push(...o.container.providers(o))):a=qp;let l=new tn(a,o.viewContainerRef,F.create({parent:r||this._injector,providers:s}));return e.attach(l).instance}_attachDialogContent(e,i,o,r){if(e instanceof it){let s=this._createInjector(r,i,o,void 0),a={$implicit:r.data,dialogRef:i};r.templateContext&&(a=D(D({},a),typeof r.templateContext=="function"?r.templateContext():r.templateContext)),o.attachTemplatePortal(new mn(e,null,a,s))}else{let s=this._createInjector(r,i,o,this._injector),a=o.attachComponentPortal(new tn(e,r.viewContainerRef,s));i.componentRef=a,i.componentInstance=a.instance}}_createInjector(e,i,o,r){let s=e.injector||e.viewContainerRef?.injector,a=[{provide:ZT,useValue:e.data},{provide:qs,useValue:i}];return e.providers&&(typeof e.providers=="function"?a.push(...e.providers(i,e,o)):a.push(...e.providers)),e.direction&&(!s||!s.get(Je,null,{optional:!0}))&&a.push({provide:Je,useValue:XT(e.direction)}),F.create({parent:s||r,providers:a})}_removeOpenDialog(e,i){let o=this.openDialogs.indexOf(e);o>-1&&(this.openDialogs.splice(o,1),this.openDialogs.length||(this._ariaHiddenElements.forEach((r,s)=>{r?s.setAttribute("aria-hidden",r):s.removeAttribute("aria-hidden")}),this._ariaHiddenElements.clear(),i&&this._getAfterAllClosed().next()))}_hideNonDialogContentFromAssistiveTechnology(e){if(e.parentElement){let i=e.parentElement.children;for(let o=i.length-1;o>-1;o--){let r=i[o];r!==e&&r.nodeName!=="SCRIPT"&&r.nodeName!=="STYLE"&&!r.hasAttribute("aria-live")&&!r.hasAttribute("popover")&&(this._ariaHiddenElements.set(r,r.getAttribute("aria-hidden")),r.setAttribute("aria-hidden","true"))}}}_getAfterAllClosed(){let e=this._parentDialog;return e?e._getAfterAllClosed():this._afterAllClosedAtThisLevel}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function Wp(t,n){let e=t.length;for(;e--;)n(t[e])}var PD=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=q({type:t});static \u0275inj=z({providers:[Yp],imports:[gn,si,As,si]})}return t})();function QT(t,n){}var sd=class{viewContainerRef;injector;id;role="dialog";panelClass="";hasBackdrop=!0;backdropClass="";disableClose=!1;closePredicate;width="";height="";minWidth;minHeight;maxWidth;maxHeight;position;data=null;direction;ariaDescribedBy=null;ariaLabelledBy=null;ariaLabel=null;ariaModal=!1;autoFocus="first-tabbable";restoreFocus=!0;delayFocusTrap=!0;scrollStrategy;closeOnNavigation=!0;enterAnimationDuration;exitAnimationDuration},Zp="mdc-dialog--open",LD="mdc-dialog--opening",VD="mdc-dialog--closing",JT=150,eA=75,tA=(()=>{class t extends qp{_animationStateChanged=new se;_animationsEnabled=!Ee();_actionSectionCount=0;_hostElement=this._elementRef.nativeElement;_enterAnimationDuration=this._animationsEnabled?jD(this._config.enterAnimationDuration)??JT:0;_exitAnimationDuration=this._animationsEnabled?jD(this._config.exitAnimationDuration)??eA:0;_animationTimer=null;_contentAttached(){super._contentAttached(),this._startOpenAnimation()}_startOpenAnimation(){this._animationStateChanged.emit({state:"opening",totalTime:this._enterAnimationDuration}),this._animationsEnabled?(this._hostElement.style.setProperty(BD,`${this._enterAnimationDuration}ms`),this._requestAnimationFrame(()=>this._hostElement.classList.add(LD,Zp)),this._waitForAnimationToComplete(this._enterAnimationDuration,this._finishDialogOpen)):(this._hostElement.classList.add(Zp),Promise.resolve().then(()=>this._finishDialogOpen()))}_startExitAnimation(){this._animationStateChanged.emit({state:"closing",totalTime:this._exitAnimationDuration}),this._hostElement.classList.remove(Zp),this._animationsEnabled?(this._hostElement.style.setProperty(BD,`${this._exitAnimationDuration}ms`),this._requestAnimationFrame(()=>this._hostElement.classList.add(VD)),this._waitForAnimationToComplete(this._exitAnimationDuration,this._finishDialogClose)):Promise.resolve().then(()=>this._finishDialogClose())}_updateActionSectionCount(e){this._actionSectionCount+=e,this._changeDetectorRef.markForCheck()}_finishDialogOpen=()=>{this._clearAnimationClasses(),this._openAnimationDone(this._enterAnimationDuration)};_finishDialogClose=()=>{this._clearAnimationClasses(),this._animationStateChanged.emit({state:"closed",totalTime:this._exitAnimationDuration})};_clearAnimationClasses(){this._hostElement.classList.remove(LD,VD)}_waitForAnimationToComplete(e,i){this._animationTimer!==null&&clearTimeout(this._animationTimer),this._animationTimer=setTimeout(i,e)}_requestAnimationFrame(e){this._ngZone.runOutsideAngular(()=>{typeof requestAnimationFrame=="function"?requestAnimationFrame(e):e()})}_captureInitialFocus(){this._config.delayFocusTrap||this._trapFocus()}_openAnimationDone(e){this._config.delayFocusTrap&&this._trapFocus(),this._animationStateChanged.next({state:"opened",totalTime:e})}ngOnDestroy(){super.ngOnDestroy(),this._animationTimer!==null&&clearTimeout(this._animationTimer)}attachComponentPortal(e){let i=super.attachComponentPortal(e);return i.location.nativeElement.classList.add("mat-mdc-dialog-component-host"),i}static \u0275fac=(()=>{let e;return function(o){return(e||(e=It(t)))(o||t)}})();static \u0275cmp=j({type:t,selectors:[["mat-dialog-container"]],hostAttrs:["tabindex","-1",1,"mat-mdc-dialog-container","mdc-dialog"],hostVars:10,hostBindings:function(i,o){i&2&&(Qt("id",o._config.id),Z("aria-modal",o._config.ariaModal)("role",o._config.role)("aria-labelledby",o._config.ariaLabel?null:o._ariaLabelledByQueue[0])("aria-label",o._config.ariaLabel)("aria-describedby",o._config.ariaDescribedBy||null),V("_mat-animation-noopable",!o._animationsEnabled)("mat-mdc-dialog-container-with-actions",o._actionSectionCount>0))},features:[he],decls:3,vars:0,consts:[[1,"mat-mdc-dialog-inner-container","mdc-dialog__container"],[1,"mat-mdc-dialog-surface","mdc-dialog__surface"],["cdkPortalOutlet",""]],template:function(i,o){i&1&&(h(0,"div",0)(1,"div",1),ct(2,QT,0,0,"ng-template",2),g()())},dependencies:[ri],styles:[`.mat-mdc-dialog-container {
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
`],encapsulation:2})}return t})(),BD="--mat-dialog-transition-duration";function jD(t){return t==null?null:typeof t=="number"?t:t.endsWith("ms")?kn(t.substring(0,t.length-2)):t.endsWith("s")?kn(t.substring(0,t.length-1))*1e3:t==="0"?0:null}var rd=(function(t){return t[t.OPEN=0]="OPEN",t[t.CLOSING=1]="CLOSING",t[t.CLOSED=2]="CLOSED",t})(rd||{}),hr=class{_ref;_config;_containerInstance;componentInstance;componentRef=null;disableClose;id;_afterOpened=new Ln(1);_beforeClosed=new Ln(1);_result;_closeFallbackTimeout;_state=rd.OPEN;_closeInteractionType;constructor(n,e,i){this._ref=n,this._config=e,this._containerInstance=i,this.disableClose=e.disableClose,this.id=n.id,n.addPanelClass("mat-mdc-dialog-panel"),i._animationStateChanged.pipe(Me(o=>o.state==="opened"),pt(1)).subscribe(()=>{this._afterOpened.next(),this._afterOpened.complete()}),i._animationStateChanged.pipe(Me(o=>o.state==="closed"),pt(1)).subscribe(()=>{clearTimeout(this._closeFallbackTimeout),this._finishDialogClose()}),n.overlayRef.detachments().subscribe(()=>{this._beforeClosed.next(this._result),this._beforeClosed.complete(),this._finishDialogClose()}),yn(this.backdropClick(),this.keydownEvents().pipe(Me(o=>o.keyCode===27&&!this.disableClose&&!Ft(o)))).subscribe(o=>{this.disableClose||(o.preventDefault(),nA(this,o.type==="keydown"?"keyboard":"mouse"))})}close(n){let e=this._config.closePredicate;e&&!e(n,this._config,this.componentInstance)||(this._result=n,this._containerInstance._animationStateChanged.pipe(Me(i=>i.state==="closing"),pt(1)).subscribe(i=>{this._beforeClosed.next(n),this._beforeClosed.complete(),this._ref.overlayRef.detachBackdrop(),this._closeFallbackTimeout=setTimeout(()=>this._finishDialogClose(),i.totalTime+100)}),this._state=rd.CLOSING,this._containerInstance._startExitAnimation())}afterOpened(){return this._afterOpened}afterClosed(){return this._ref.closed}beforeClosed(){return this._beforeClosed}backdropClick(){return this._ref.backdropClick}keydownEvents(){return this._ref.keydownEvents}updatePosition(n){let e=this._ref.config.positionStrategy;return n&&(n.left||n.right)?n.left?e.left(n.left):e.right(n.right):e.centerHorizontally(),n&&(n.top||n.bottom)?n.top?e.top(n.top):e.bottom(n.bottom):e.centerVertically(),this._ref.updatePosition(),this}updateSize(n="",e=""){return this._ref.updateSize(n,e),this}addPanelClass(n){return this._ref.addPanelClass(n),this}removePanelClass(n){return this._ref.removePanelClass(n),this}getState(){return this._state}_finishDialogClose(){this._state=rd.CLOSED,this._ref.close(this._result,{focusOrigin:this._closeInteractionType}),this.componentInstance=null}};function nA(t,n,e){return t._closeInteractionType=n,t.close(e)}var iA=new _("MatMdcDialogData"),oA=new _("mat-mdc-dialog-default-options"),rA=new _("mat-mdc-dialog-scroll-strategy",{providedIn:"root",factory:()=>{let t=u(F);return()=>ur(t)}}),ad=(()=>{class t{_defaultOptions=u(oA,{optional:!0});_scrollStrategy=u(rA);_parentDialog=u(t,{optional:!0,skipSelf:!0});_idGenerator=u(ke);_injector=u(F);_dialog=u(Yp);_animationsDisabled=Ee();_openDialogsAtThisLevel=[];_afterAllClosedAtThisLevel=new C;_afterOpenedAtThisLevel=new C;dialogConfigClass=sd;_dialogRefConstructor;_dialogContainerType;_dialogDataToken;get openDialogs(){return this._parentDialog?this._parentDialog.openDialogs:this._openDialogsAtThisLevel}get afterOpened(){return this._parentDialog?this._parentDialog.afterOpened:this._afterOpenedAtThisLevel}_getAfterAllClosed(){let e=this._parentDialog;return e?e._getAfterAllClosed():this._afterAllClosedAtThisLevel}afterAllClosed=kr(()=>this.openDialogs.length?this._getAfterAllClosed():this._getAfterAllClosed().pipe(st(void 0)));constructor(){this._dialogRefConstructor=hr,this._dialogContainerType=tA,this._dialogDataToken=iA}open(e,i){let o;i=D(D({},this._defaultOptions||new sd),i),i.id=i.id||this._idGenerator.getId("mat-mdc-dialog-"),i.scrollStrategy=i.scrollStrategy||this._scrollStrategy();let r=this._dialog.open(e,ee(D({},i),{positionStrategy:ai(this._injector).centerHorizontally().centerVertically(),disableClose:!0,closePredicate:void 0,closeOnDestroy:!1,closeOnOverlayDetachments:!1,disableAnimations:this._animationsDisabled||i.enterAnimationDuration?.toLocaleString()==="0"||i.exitAnimationDuration?.toString()==="0",container:{type:this._dialogContainerType,providers:()=>[{provide:this.dialogConfigClass,useValue:i},{provide:li,useValue:i}]},templateContext:()=>({dialogRef:o}),providers:(s,a,l)=>(o=new this._dialogRefConstructor(s,i,l),o.updatePosition(i?.position),[{provide:this._dialogContainerType,useValue:l},{provide:this._dialogDataToken,useValue:a.data},{provide:this._dialogRefConstructor,useValue:o}])}));return o.componentRef=r.componentRef,o.componentInstance=r.componentInstance,this.openDialogs.push(o),this.afterOpened.next(o),o.afterClosed().subscribe(()=>{let s=this.openDialogs.indexOf(o);s>-1&&(this.openDialogs.splice(s,1),this.openDialogs.length||this._getAfterAllClosed().next())}),o}closeAll(){this._closeDialogs(this.openDialogs)}getDialogById(e){return this.openDialogs.find(i=>i.id===e)}ngOnDestroy(){this._closeDialogs(this._openDialogsAtThisLevel),this._afterAllClosedAtThisLevel.complete(),this._afterOpenedAtThisLevel.complete()}_closeDialogs(e){let i=e.length;for(;i--;)e[i].close()}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var HD=(()=>{class t{_dialogRef=u(hr,{optional:!0});_elementRef=u(B);_dialog=u(ad);constructor(){}ngOnInit(){this._dialogRef||(this._dialogRef=sA(this._elementRef,this._dialog.openDialogs)),this._dialogRef&&Promise.resolve().then(()=>{this._onAdd()})}ngOnDestroy(){this._dialogRef?._containerInstance&&Promise.resolve().then(()=>{this._onRemove()})}static \u0275fac=function(i){return new(i||t)};static \u0275dir=L({type:t})}return t})(),UD=(()=>{class t extends HD{id=u(ke).getId("mat-mdc-dialog-title-");_onAdd(){this._dialogRef._containerInstance?._addAriaLabelledBy?.(this.id)}_onRemove(){this._dialogRef?._containerInstance?._removeAriaLabelledBy?.(this.id)}static \u0275fac=(()=>{let e;return function(o){return(e||(e=It(t)))(o||t)}})();static \u0275dir=L({type:t,selectors:[["","mat-dialog-title",""],["","matDialogTitle",""]],hostAttrs:[1,"mat-mdc-dialog-title","mdc-dialog__title"],hostVars:1,hostBindings:function(i,o){i&2&&Qt("id",o.id)},inputs:{id:"id"},exportAs:["matDialogTitle"],features:[he]})}return t})(),zD=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=L({type:t,selectors:[["","mat-dialog-content",""],["mat-dialog-content"],["","matDialogContent",""]],hostAttrs:[1,"mat-mdc-dialog-content","mdc-dialog__content"],features:[xm([jp])]})}return t})(),$D=(()=>{class t extends HD{align;_onAdd(){this._dialogRef._containerInstance?._updateActionSectionCount?.(1)}_onRemove(){this._dialogRef._containerInstance?._updateActionSectionCount?.(-1)}static \u0275fac=(()=>{let e;return function(o){return(e||(e=It(t)))(o||t)}})();static \u0275dir=L({type:t,selectors:[["","mat-dialog-actions",""],["mat-dialog-actions"],["","matDialogActions",""]],hostAttrs:[1,"mat-mdc-dialog-actions","mdc-dialog__actions"],hostVars:6,hostBindings:function(i,o){i&2&&V("mat-mdc-dialog-actions-align-start",o.align==="start")("mat-mdc-dialog-actions-align-center",o.align==="center")("mat-mdc-dialog-actions-align-end",o.align==="end")},inputs:{align:"align"},features:[he]})}return t})();function sA(t,n){let e=t.nativeElement.parentElement;for(;e&&!e.classList.contains("mat-mdc-dialog-container");)e=e.parentElement;return e?n.find(i=>i.id===e.id):null}var ld=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=q({type:t});static \u0275inj=z({providers:[ad],imports:[PD,gn,si,be]})}return t})();var Kp=class{_box;_destroyed=new C;_resizeSubject=new C;_resizeObserver;_elementObservables=new Map;constructor(n){this._box=n,typeof ResizeObserver<"u"&&(this._resizeObserver=new ResizeObserver(e=>this._resizeSubject.next(e)))}observe(n){return this._elementObservables.has(n)||this._elementObservables.set(n,new te(e=>{let i=this._resizeSubject.subscribe(e);return this._resizeObserver?.observe(n,{box:this._box}),()=>{this._resizeObserver?.unobserve(n),i.unsubscribe(),this._elementObservables.delete(n)}}).pipe(Me(e=>e.some(i=>i.target===n)),La({bufferSize:1,refCount:!0}),Se(this._destroyed))),this._elementObservables.get(n)}destroy(){this._destroyed.next(),this._destroyed.complete(),this._resizeSubject.complete(),this._elementObservables.clear()}},WD=(()=>{class t{_cleanupErrorListener;_observers=new Map;_ngZone=u(S);constructor(){typeof ResizeObserver<"u"}ngOnDestroy(){for(let[,e]of this._observers)e.destroy();this._observers.clear(),this._cleanupErrorListener?.()}observe(e,i){let o=i?.box||"content-box";return this._observers.has(o)||this._observers.set(o,new Kp(o)),this._observers.get(o).observe(e)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var aA=["notch"],lA=["matFormFieldNotchedOutline",""],cA=["*"],qD=["iconPrefixContainer"],YD=["textPrefixContainer"],ZD=["iconSuffixContainer"],KD=["textSuffixContainer"],dA=["textField"],uA=["*",[["mat-label"]],[["","matPrefix",""],["","matIconPrefix",""]],[["","matTextPrefix",""]],[["","matTextSuffix",""]],[["","matSuffix",""],["","matIconSuffix",""]],[["mat-error"],["","matError",""]],[["mat-hint",3,"align","end"]],[["mat-hint","align","end"]]],fA=["*","mat-label","[matPrefix], [matIconPrefix]","[matTextPrefix]","[matTextSuffix]","[matSuffix], [matIconSuffix]","mat-error, [matError]","mat-hint:not([align='end'])","mat-hint[align='end']"];function mA(t,n){t&1&&J(0,"span",21)}function pA(t,n){if(t&1&&(h(0,"label",20),me(1,1),G(2,mA,1,0,"span",21),g()),t&2){let e=x(2);Q("floating",e._shouldLabelFloat())("monitorResize",e._hasOutline())("id",e._labelId),Z("for",e._control.disableAutomaticLabeling?null:e._control.id),y(2),W(!e.hideRequiredMarker&&e._control.required?2:-1)}}function hA(t,n){if(t&1&&G(0,pA,3,5,"label",20),t&2){let e=x();W(e._hasFloatingLabel()?0:-1)}}function gA(t,n){t&1&&J(0,"div",7)}function vA(t,n){}function _A(t,n){if(t&1&&ct(0,vA,0,0,"ng-template",13),t&2){x(2);let e=fn(1);Q("ngTemplateOutlet",e)}}function yA(t,n){if(t&1&&(h(0,"div",9),G(1,_A,1,1,null,13),g()),t&2){let e=x();Q("matFormFieldNotchedOutlineOpen",e._shouldLabelFloat()),y(),W(e._forceDisplayInfixLabel()?-1:1)}}function bA(t,n){t&1&&(h(0,"div",10,2),me(2,2),g())}function DA(t,n){t&1&&(h(0,"div",11,3),me(2,3),g())}function CA(t,n){}function EA(t,n){if(t&1&&ct(0,CA,0,0,"ng-template",13),t&2){x();let e=fn(1);Q("ngTemplateOutlet",e)}}function wA(t,n){t&1&&(h(0,"div",14,4),me(2,4),g())}function xA(t,n){t&1&&(h(0,"div",15,5),me(2,5),g())}function IA(t,n){t&1&&J(0,"div",16)}function MA(t,n){t&1&&(h(0,"div",18),me(1,6),g())}function SA(t,n){if(t&1&&(h(0,"mat-hint",22),E(1),g()),t&2){let e=x(2);Q("id",e._hintLabelId),y(),ue(e.hintLabel)}}function TA(t,n){if(t&1&&(h(0,"div",19),G(1,SA,2,2,"mat-hint",22),me(2,7),J(3,"div",23),me(4,8),g()),t&2){let e=x();y(),W(e.hintLabel?1:-1)}}var lo=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=L({type:t,selectors:[["mat-label"]]})}return t})(),AA=new _("MatError");var Ys=(()=>{class t{align="start";id=u(ke).getId("mat-mdc-hint-");static \u0275fac=function(i){return new(i||t)};static \u0275dir=L({type:t,selectors:[["mat-hint"]],hostAttrs:[1,"mat-mdc-form-field-hint","mat-mdc-form-field-bottom-align"],hostVars:4,hostBindings:function(i,o){i&2&&(Qt("id",o.id),Z("align",null),V("mat-mdc-form-field-hint-end",o.align==="end"))},inputs:{align:"align",id:"id"}})}return t})(),kA=new _("MatPrefix");var iC=new _("MatSuffix"),Xp=(()=>{class t{set _isTextSelector(e){this._isText=!0}_isText=!1;static \u0275fac=function(i){return new(i||t)};static \u0275dir=L({type:t,selectors:[["","matSuffix",""],["","matIconSuffix",""],["","matTextSuffix",""]],inputs:{_isTextSelector:[0,"matTextSuffix","_isTextSelector"]},features:[Ze([{provide:iC,useExisting:t}])]})}return t})(),oC=new _("FloatingLabelParent"),XD=(()=>{class t{_elementRef=u(B);get floating(){return this._floating}set floating(e){this._floating=e,this.monitorResize&&this._handleResize()}_floating=!1;get monitorResize(){return this._monitorResize}set monitorResize(e){this._monitorResize=e,this._monitorResize?this._subscribeToResize():this._resizeSubscription.unsubscribe()}_monitorResize=!1;_resizeObserver=u(WD);_ngZone=u(S);_parent=u(oC);_resizeSubscription=new de;constructor(){}ngOnDestroy(){this._resizeSubscription.unsubscribe()}getWidth(){return RA(this._elementRef.nativeElement)}get element(){return this._elementRef.nativeElement}_handleResize(){setTimeout(()=>this._parent._handleLabelResized())}_subscribeToResize(){this._resizeSubscription.unsubscribe(),this._ngZone.runOutsideAngular(()=>{this._resizeSubscription=this._resizeObserver.observe(this._elementRef.nativeElement,{box:"border-box"}).subscribe(()=>this._handleResize())})}static \u0275fac=function(i){return new(i||t)};static \u0275dir=L({type:t,selectors:[["label","matFormFieldFloatingLabel",""]],hostAttrs:[1,"mdc-floating-label","mat-mdc-floating-label"],hostVars:2,hostBindings:function(i,o){i&2&&V("mdc-floating-label--float-above",o.floating)},inputs:{floating:"floating",monitorResize:"monitorResize"}})}return t})();function RA(t){let n=t;if(n.offsetParent!==null)return n.scrollWidth;let e=n.cloneNode(!0);e.style.setProperty("position","absolute"),e.style.setProperty("transform","translate(-9999px, -9999px)"),document.documentElement.appendChild(e);let i=e.scrollWidth;return e.remove(),i}var QD="mdc-line-ripple--active",cd="mdc-line-ripple--deactivating",JD=(()=>{class t{_elementRef=u(B);_cleanupTransitionEnd;constructor(){let e=u(S),i=u(Ae);e.runOutsideAngular(()=>{this._cleanupTransitionEnd=i.listen(this._elementRef.nativeElement,"transitionend",this._handleTransitionEnd)})}activate(){let e=this._elementRef.nativeElement.classList;e.remove(cd),e.add(QD)}deactivate(){this._elementRef.nativeElement.classList.add(cd)}_handleTransitionEnd=e=>{let i=this._elementRef.nativeElement.classList,o=i.contains(cd);e.propertyName==="opacity"&&o&&i.remove(QD,cd)};ngOnDestroy(){this._cleanupTransitionEnd()}static \u0275fac=function(i){return new(i||t)};static \u0275dir=L({type:t,selectors:[["div","matFormFieldLineRipple",""]],hostAttrs:[1,"mdc-line-ripple"]})}return t})(),eC=(()=>{class t{_elementRef=u(B);_ngZone=u(S);open=!1;_notch;ngAfterViewInit(){let e=this._elementRef.nativeElement,i=e.querySelector(".mdc-floating-label");i?(e.classList.add("mdc-notched-outline--upgraded"),typeof requestAnimationFrame=="function"&&(i.style.transitionDuration="0s",this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>i.style.transitionDuration="")}))):e.classList.add("mdc-notched-outline--no-label")}_setNotchWidth(e){let i=this._notch.nativeElement;!this.open||!e?i.style.width="":i.style.width=`calc(${e}px * var(--mat-mdc-form-field-floating-label-scale, 0.75) + 9px)`}_setMaxWidth(e){this._notch.nativeElement.style.setProperty("--mat-form-field-notch-max-width",`calc(100% - ${e}px)`)}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=j({type:t,selectors:[["div","matFormFieldNotchedOutline",""]],viewQuery:function(i,o){if(i&1&&Pe(aA,5),i&2){let r;ne(r=ie())&&(o._notch=r.first)}},hostAttrs:[1,"mdc-notched-outline"],hostVars:2,hostBindings:function(i,o){i&2&&V("mdc-notched-outline--notched",o.open)},inputs:{open:[0,"matFormFieldNotchedOutlineOpen","open"]},attrs:lA,ngContentSelectors:cA,decls:5,vars:0,consts:[["notch",""],[1,"mat-mdc-notch-piece","mdc-notched-outline__leading"],[1,"mat-mdc-notch-piece","mdc-notched-outline__notch"],[1,"mat-mdc-notch-piece","mdc-notched-outline__trailing"]],template:function(i,o){i&1&&(Ye(),dt(0,"div",1),ot(1,"div",2,0),me(3),_t(),dt(4,"div",3))},encapsulation:2,changeDetection:0})}return t})(),Qp=(()=>{class t{value=null;stateChanges;id;placeholder;ngControl=null;focused=!1;empty=!1;shouldLabelFloat=!1;required=!1;disabled=!1;errorState=!1;controlType;autofilled;userAriaDescribedBy;disableAutomaticLabeling;describedByIds;static \u0275fac=function(i){return new(i||t)};static \u0275dir=L({type:t})}return t})();var Jp=new _("MatFormField"),NA=new _("MAT_FORM_FIELD_DEFAULT_OPTIONS"),tC="fill",OA="auto",nC="fixed",FA="translateY(-50%)",gr=(()=>{class t{_elementRef=u(B);_changeDetectorRef=u(We);_platform=u(ae);_idGenerator=u(ke);_ngZone=u(S);_defaults=u(NA,{optional:!0});_currentDirection;_textField;_iconPrefixContainer;_textPrefixContainer;_iconSuffixContainer;_textSuffixContainer;_floatingLabel;_notchedOutline;_lineRipple;_iconPrefixContainerSignal=gs("iconPrefixContainer");_textPrefixContainerSignal=gs("textPrefixContainer");_iconSuffixContainerSignal=gs("iconSuffixContainer");_textSuffixContainerSignal=gs("textSuffixContainer");_prefixSuffixContainers=Ie(()=>[this._iconPrefixContainerSignal(),this._textPrefixContainerSignal(),this._iconSuffixContainerSignal(),this._textSuffixContainerSignal()].map(e=>e?.nativeElement).filter(e=>e!==void 0));_formFieldControl;_prefixChildren;_suffixChildren;_errorChildren;_hintChildren;_labelChild=My(lo);get hideRequiredMarker(){return this._hideRequiredMarker}set hideRequiredMarker(e){this._hideRequiredMarker=Rn(e)}_hideRequiredMarker=!1;color="primary";get floatLabel(){return this._floatLabel||this._defaults?.floatLabel||OA}set floatLabel(e){e!==this._floatLabel&&(this._floatLabel=e,this._changeDetectorRef.markForCheck())}_floatLabel;get appearance(){return this._appearanceSignal()}set appearance(e){let i=e||this._defaults?.appearance||tC;this._appearanceSignal.set(i)}_appearanceSignal=N(tC);get subscriptSizing(){return this._subscriptSizing||this._defaults?.subscriptSizing||nC}set subscriptSizing(e){this._subscriptSizing=e||this._defaults?.subscriptSizing||nC}_subscriptSizing=null;get hintLabel(){return this._hintLabel}set hintLabel(e){this._hintLabel=e,this._processHints()}_hintLabel="";_hasIconPrefix=!1;_hasTextPrefix=!1;_hasIconSuffix=!1;_hasTextSuffix=!1;_labelId=this._idGenerator.getId("mat-mdc-form-field-label-");_hintLabelId=this._idGenerator.getId("mat-mdc-hint-");_describedByIds;get _control(){return this._explicitFormFieldControl||this._formFieldControl}set _control(e){this._explicitFormFieldControl=e}_destroyed=new C;_isFocused=null;_explicitFormFieldControl;_previousControl=null;_previousControlValidatorFn=null;_stateChanges;_valueChanges;_describedByChanges;_outlineLabelOffsetResizeObserver=null;_animationsDisabled=Ee();constructor(){let e=this._defaults,i=u(Je);e&&(e.appearance&&(this.appearance=e.appearance),this._hideRequiredMarker=!!e?.hideRequiredMarker,e.color&&(this.color=e.color)),Gt(()=>this._currentDirection=i.valueSignal()),this._syncOutlineLabelOffset()}ngAfterViewInit(){this._updateFocusState(),this._animationsDisabled||this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{this._elementRef.nativeElement.classList.add("mat-form-field-animations-enabled")},300)}),this._changeDetectorRef.detectChanges()}ngAfterContentInit(){this._assertFormFieldControl(),this._initializeSubscript(),this._initializePrefixAndSuffix()}ngAfterContentChecked(){this._assertFormFieldControl(),this._control!==this._previousControl&&(this._initializeControl(this._previousControl),this._control.ngControl&&this._control.ngControl.control&&(this._previousControlValidatorFn=this._control.ngControl.control.validator),this._previousControl=this._control),this._control.ngControl&&this._control.ngControl.control&&this._control.ngControl.control.validator!==this._previousControlValidatorFn&&this._changeDetectorRef.markForCheck()}ngOnDestroy(){this._outlineLabelOffsetResizeObserver?.disconnect(),this._stateChanges?.unsubscribe(),this._valueChanges?.unsubscribe(),this._describedByChanges?.unsubscribe(),this._destroyed.next(),this._destroyed.complete()}getLabelId=Ie(()=>this._hasFloatingLabel()?this._labelId:null);getConnectedOverlayOrigin(){return this._textField||this._elementRef}_animateAndLockLabel(){this._hasFloatingLabel()&&(this.floatLabel="always")}_initializeControl(e){let i=this._control,o="mat-mdc-form-field-type-";e&&this._elementRef.nativeElement.classList.remove(o+e.controlType),i.controlType&&this._elementRef.nativeElement.classList.add(o+i.controlType),this._stateChanges?.unsubscribe(),this._stateChanges=i.stateChanges.subscribe(()=>{this._updateFocusState(),this._changeDetectorRef.markForCheck()}),this._describedByChanges?.unsubscribe(),this._describedByChanges=i.stateChanges.pipe(st([void 0,void 0]),ve(()=>[i.errorState,i.userAriaDescribedBy]),Pa(),Me(([[r,s],[a,l]])=>r!==a||s!==l)).subscribe(()=>this._syncDescribedByIds()),this._valueChanges?.unsubscribe(),i.ngControl&&i.ngControl.valueChanges&&(this._valueChanges=i.ngControl.valueChanges.pipe(Se(this._destroyed)).subscribe(()=>this._changeDetectorRef.markForCheck()))}_checkPrefixAndSuffixTypes(){this._hasIconPrefix=!!this._prefixChildren.find(e=>!e._isText),this._hasTextPrefix=!!this._prefixChildren.find(e=>e._isText),this._hasIconSuffix=!!this._suffixChildren.find(e=>!e._isText),this._hasTextSuffix=!!this._suffixChildren.find(e=>e._isText)}_initializePrefixAndSuffix(){this._checkPrefixAndSuffixTypes(),yn(this._prefixChildren.changes,this._suffixChildren.changes).subscribe(()=>{this._checkPrefixAndSuffixTypes(),this._changeDetectorRef.markForCheck()})}_initializeSubscript(){this._hintChildren.changes.subscribe(()=>{this._processHints(),this._changeDetectorRef.markForCheck()}),this._errorChildren.changes.subscribe(()=>{this._syncDescribedByIds(),this._changeDetectorRef.markForCheck()}),this._validateHints(),this._syncDescribedByIds()}_assertFormFieldControl(){this._control}_updateFocusState(){let e=this._control.focused;e&&!this._isFocused?(this._isFocused=!0,this._lineRipple?.activate()):!e&&(this._isFocused||this._isFocused===null)&&(this._isFocused=!1,this._lineRipple?.deactivate()),this._elementRef.nativeElement.classList.toggle("mat-focused",e),this._textField?.nativeElement.classList.toggle("mdc-text-field--focused",e)}_syncOutlineLabelOffset(){Ay({earlyRead:()=>{if(this._appearanceSignal()!=="outline")return this._outlineLabelOffsetResizeObserver?.disconnect(),null;if(globalThis.ResizeObserver){this._outlineLabelOffsetResizeObserver||=new globalThis.ResizeObserver(()=>{this._writeOutlinedLabelStyles(this._getOutlinedLabelOffset())});for(let e of this._prefixSuffixContainers())this._outlineLabelOffsetResizeObserver.observe(e,{box:"border-box"})}return this._getOutlinedLabelOffset()},write:e=>this._writeOutlinedLabelStyles(e())})}_shouldAlwaysFloat(){return this.floatLabel==="always"}_hasOutline(){return this.appearance==="outline"}_forceDisplayInfixLabel(){return!this._platform.isBrowser&&this._prefixChildren.length&&!this._shouldLabelFloat()}_hasFloatingLabel=Ie(()=>!!this._labelChild());_shouldLabelFloat(){return this._hasFloatingLabel()?this._control.shouldLabelFloat||this._shouldAlwaysFloat():!1}_shouldForward(e){let i=this._control?this._control.ngControl:null;return i&&i[e]}_getSubscriptMessageType(){return this._errorChildren&&this._errorChildren.length>0&&this._control.errorState?"error":"hint"}_handleLabelResized(){this._refreshOutlineNotchWidth()}_refreshOutlineNotchWidth(){!this._hasOutline()||!this._floatingLabel||!this._shouldLabelFloat()?this._notchedOutline?._setNotchWidth(0):this._notchedOutline?._setNotchWidth(this._floatingLabel.getWidth())}_processHints(){this._validateHints(),this._syncDescribedByIds()}_validateHints(){this._hintChildren}_syncDescribedByIds(){if(this._control){let e=[];if(this._control.userAriaDescribedBy&&typeof this._control.userAriaDescribedBy=="string"&&e.push(...this._control.userAriaDescribedBy.split(" ")),this._getSubscriptMessageType()==="hint"){let r=this._hintChildren?this._hintChildren.find(a=>a.align==="start"):null,s=this._hintChildren?this._hintChildren.find(a=>a.align==="end"):null;r?e.push(r.id):this._hintLabel&&e.push(this._hintLabelId),s&&e.push(s.id)}else this._errorChildren&&e.push(...this._errorChildren.map(r=>r.id));let i=this._control.describedByIds,o;if(i){let r=this._describedByIds||e;o=e.concat(i.filter(s=>s&&!r.includes(s)))}else o=e;this._control.setDescribedByIds(o),this._describedByIds=e}}_getOutlinedLabelOffset(){if(!this._hasOutline()||!this._floatingLabel)return null;if(!this._iconPrefixContainer&&!this._textPrefixContainer)return["",null];if(!this._isAttachedToDom())return null;let e=this._iconPrefixContainer?.nativeElement,i=this._textPrefixContainer?.nativeElement,o=this._iconSuffixContainer?.nativeElement,r=this._textSuffixContainer?.nativeElement,s=e?.getBoundingClientRect().width??0,a=i?.getBoundingClientRect().width??0,l=o?.getBoundingClientRect().width??0,c=r?.getBoundingClientRect().width??0,d=this._currentDirection==="rtl"?"-1":"1",f=`${s+a}px`,m=`calc(${d} * (${f} + var(--mat-mdc-form-field-label-offset-x, 0px)))`,v=`var(--mat-mdc-form-field-label-transform, ${FA} translateX(${m}))`,w=s+a+l+c;return[v,w]}_writeOutlinedLabelStyles(e){if(e!==null){let[i,o]=e;this._floatingLabel&&(this._floatingLabel.element.style.transform=i),o!==null&&this._notchedOutline?._setMaxWidth(o)}}_isAttachedToDom(){let e=this._elementRef.nativeElement;if(e.getRootNode){let i=e.getRootNode();return i&&i!==e}return document.documentElement.contains(e)}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=j({type:t,selectors:[["mat-form-field"]],contentQueries:function(i,o,r){if(i&1&&(ec(r,o._labelChild,lo,5),Xn(r,Qp,5)(r,kA,5)(r,iC,5)(r,AA,5)(r,Ys,5)),i&2){nc();let s;ne(s=ie())&&(o._formFieldControl=s.first),ne(s=ie())&&(o._prefixChildren=s),ne(s=ie())&&(o._suffixChildren=s),ne(s=ie())&&(o._errorChildren=s),ne(s=ie())&&(o._hintChildren=s)}},viewQuery:function(i,o){if(i&1&&(tc(o._iconPrefixContainerSignal,qD,5)(o._textPrefixContainerSignal,YD,5)(o._iconSuffixContainerSignal,ZD,5)(o._textSuffixContainerSignal,KD,5),Pe(dA,5)(qD,5)(YD,5)(ZD,5)(KD,5)(XD,5)(eC,5)(JD,5)),i&2){nc(4);let r;ne(r=ie())&&(o._textField=r.first),ne(r=ie())&&(o._iconPrefixContainer=r.first),ne(r=ie())&&(o._textPrefixContainer=r.first),ne(r=ie())&&(o._iconSuffixContainer=r.first),ne(r=ie())&&(o._textSuffixContainer=r.first),ne(r=ie())&&(o._floatingLabel=r.first),ne(r=ie())&&(o._notchedOutline=r.first),ne(r=ie())&&(o._lineRipple=r.first)}},hostAttrs:[1,"mat-mdc-form-field"],hostVars:38,hostBindings:function(i,o){i&2&&V("mat-mdc-form-field-label-always-float",o._shouldAlwaysFloat())("mat-mdc-form-field-has-icon-prefix",o._hasIconPrefix)("mat-mdc-form-field-has-icon-suffix",o._hasIconSuffix)("mat-form-field-invalid",o._control.errorState)("mat-form-field-disabled",o._control.disabled)("mat-form-field-autofilled",o._control.autofilled)("mat-form-field-appearance-fill",o.appearance=="fill")("mat-form-field-appearance-outline",o.appearance=="outline")("mat-form-field-hide-placeholder",o._hasFloatingLabel()&&!o._shouldLabelFloat())("mat-primary",o.color!=="accent"&&o.color!=="warn")("mat-accent",o.color==="accent")("mat-warn",o.color==="warn")("ng-untouched",o._shouldForward("untouched"))("ng-touched",o._shouldForward("touched"))("ng-pristine",o._shouldForward("pristine"))("ng-dirty",o._shouldForward("dirty"))("ng-valid",o._shouldForward("valid"))("ng-invalid",o._shouldForward("invalid"))("ng-pending",o._shouldForward("pending"))},inputs:{hideRequiredMarker:"hideRequiredMarker",color:"color",floatLabel:"floatLabel",appearance:"appearance",subscriptSizing:"subscriptSizing",hintLabel:"hintLabel"},exportAs:["matFormField"],features:[Ze([{provide:Jp,useExisting:t},{provide:oC,useExisting:t}])],ngContentSelectors:fA,decls:18,vars:21,consts:[["labelTemplate",""],["textField",""],["iconPrefixContainer",""],["textPrefixContainer",""],["textSuffixContainer",""],["iconSuffixContainer",""],[1,"mat-mdc-text-field-wrapper","mdc-text-field",3,"click"],[1,"mat-mdc-form-field-focus-overlay"],[1,"mat-mdc-form-field-flex"],["matFormFieldNotchedOutline","",3,"matFormFieldNotchedOutlineOpen"],[1,"mat-mdc-form-field-icon-prefix"],[1,"mat-mdc-form-field-text-prefix"],[1,"mat-mdc-form-field-infix"],[3,"ngTemplateOutlet"],[1,"mat-mdc-form-field-text-suffix"],[1,"mat-mdc-form-field-icon-suffix"],["matFormFieldLineRipple",""],["aria-atomic","true","aria-live","polite",1,"mat-mdc-form-field-subscript-wrapper","mat-mdc-form-field-bottom-align"],[1,"mat-mdc-form-field-error-wrapper"],[1,"mat-mdc-form-field-hint-wrapper"],["matFormFieldFloatingLabel","",3,"floating","monitorResize","id"],["aria-hidden","true",1,"mat-mdc-form-field-required-marker","mdc-floating-label--required"],[3,"id"],[1,"mat-mdc-form-field-hint-spacer"]],template:function(i,o){if(i&1&&(Ye(uA),ct(0,hA,1,1,"ng-template",null,0,ps),h(2,"div",6,1),H("click",function(s){return o._control.onContainerClick(s)}),G(4,gA,1,0,"div",7),h(5,"div",8),G(6,yA,2,2,"div",9),G(7,bA,3,0,"div",10),G(8,DA,3,0,"div",11),h(9,"div",12),G(10,EA,1,1,null,13),me(11),g(),G(12,wA,3,0,"div",14),G(13,xA,3,0,"div",15),g(),G(14,IA,1,0,"div",16),g(),h(15,"div",17),G(16,MA,2,0,"div",18)(17,TA,5,1,"div",19),g()),i&2){let r;y(2),V("mdc-text-field--filled",!o._hasOutline())("mdc-text-field--outlined",o._hasOutline())("mdc-text-field--no-label",!o._hasFloatingLabel())("mdc-text-field--disabled",o._control.disabled)("mdc-text-field--invalid",o._control.errorState),y(2),W(!o._hasOutline()&&!o._control.disabled?4:-1),y(2),W(o._hasOutline()?6:-1),y(),W(o._hasIconPrefix?7:-1),y(),W(o._hasTextPrefix?8:-1),y(2),W(!o._hasOutline()||o._forceDisplayInfixLabel()?10:-1),y(2),W(o._hasTextSuffix?12:-1),y(),W(o._hasIconSuffix?13:-1),y(),W(o._hasOutline()?-1:14),y(),V("mat-mdc-form-field-subscript-dynamic-size",o.subscriptSizing==="dynamic");let s=o._getSubscriptMessageType();y(),W((r=s)==="error"?16:r==="hint"?17:-1)}},dependencies:[XD,eC,_s,JD,Ys],styles:[`.mdc-text-field {
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
`],encapsulation:2,changeDetection:0})}return t})();var co=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=q({type:t});static \u0275inj=z({imports:[wc,gr,be]})}return t})();function sC(t){return Error(`Unable to find icon with the name "${t}"`)}function PA(){return Error("Could not find HttpClient for use with Angular Material icons. Please add provideHttpClient() to your providers.")}function aC(t){return Error(`The URL provided to MatIconRegistry was not trusted as a resource URL via Angular's DomSanitizer. Attempted URL was "${t}".`)}function lC(t){return Error(`The literal provided to MatIconRegistry was not trusted as safe HTML by Angular's DomSanitizer. Attempted literal was "${t}".`)}var On=class{url;svgText;options;svgElement=null;constructor(n,e,i){this.url=n,this.svgText=e,this.options=i}},dC=(()=>{class t{_httpClient;_sanitizer;_errorHandler;_document;_svgIconConfigs=new Map;_iconSetConfigs=new Map;_cachedIconsByUrl=new Map;_inProgressUrlFetches=new Map;_fontCssClassesByAlias=new Map;_resolvers=[];_defaultFontSetClass=["material-icons","mat-ligature-font"];constructor(e,i,o,r){this._httpClient=e,this._sanitizer=i,this._errorHandler=r,this._document=o}addSvgIcon(e,i,o){return this.addSvgIconInNamespace("",e,i,o)}addSvgIconLiteral(e,i,o){return this.addSvgIconLiteralInNamespace("",e,i,o)}addSvgIconInNamespace(e,i,o,r){return this._addSvgIconConfig(e,i,new On(o,null,r))}addSvgIconResolver(e){return this._resolvers.push(e),this}addSvgIconLiteralInNamespace(e,i,o,r){let s=this._sanitizer.sanitize(He.HTML,o);if(!s)throw lC(o);let a=eo(s);return this._addSvgIconConfig(e,i,new On("",a,r))}addSvgIconSet(e,i){return this.addSvgIconSetInNamespace("",e,i)}addSvgIconSetLiteral(e,i){return this.addSvgIconSetLiteralInNamespace("",e,i)}addSvgIconSetInNamespace(e,i,o){return this._addSvgIconSetConfig(e,new On(i,null,o))}addSvgIconSetLiteralInNamespace(e,i,o){let r=this._sanitizer.sanitize(He.HTML,i);if(!r)throw lC(i);let s=eo(r);return this._addSvgIconSetConfig(e,new On("",s,o))}registerFontClassAlias(e,i=e){return this._fontCssClassesByAlias.set(e,i),this}classNameForFontAlias(e){return this._fontCssClassesByAlias.get(e)||e}setDefaultFontSetClass(...e){return this._defaultFontSetClass=e,this}getDefaultFontSetClass(){return this._defaultFontSetClass}getSvgIconFromUrl(e){let i=this._sanitizer.sanitize(He.RESOURCE_URL,e);if(!i)throw aC(e);let o=this._cachedIconsByUrl.get(i);return o?Ve(dd(o)):this._loadSvgIconFromConfig(new On(e,null)).pipe(Ci(r=>this._cachedIconsByUrl.set(i,r)),ve(r=>dd(r)))}getNamedSvgIcon(e,i=""){let o=cC(i,e),r=this._svgIconConfigs.get(o);if(r)return this._getSvgFromConfig(r);if(r=this._getIconConfigFromResolvers(i,e),r)return this._svgIconConfigs.set(o,r),this._getSvgFromConfig(r);let s=this._iconSetConfigs.get(i);return s?this._getSvgFromIconSetConfigs(e,s):Ar(sC(o))}ngOnDestroy(){this._resolvers=[],this._svgIconConfigs.clear(),this._iconSetConfigs.clear(),this._cachedIconsByUrl.clear()}_getSvgFromConfig(e){return e.svgText?Ve(dd(this._svgElementFromConfig(e))):this._loadSvgIconFromConfig(e).pipe(ve(i=>dd(i)))}_getSvgFromIconSetConfigs(e,i){let o=this._extractIconWithNameFromAnySet(e,i);if(o)return Ve(o);let r=i.filter(s=>!s.svgText).map(s=>this._loadSvgIconSetFromConfig(s).pipe(Oa(a=>{let c=`Loading icon set URL: ${this._sanitizer.sanitize(He.RESOURCE_URL,s.url)} failed: ${a.message}`;return this._errorHandler.handleError(new Error(c)),Ve(null)})));return Rr(r).pipe(ve(()=>{let s=this._extractIconWithNameFromAnySet(e,i);if(!s)throw sC(e);return s}))}_extractIconWithNameFromAnySet(e,i){for(let o=i.length-1;o>=0;o--){let r=i[o];if(r.svgText&&r.svgText.toString().indexOf(e)>-1){let s=this._svgElementFromConfig(r),a=this._extractSvgIconFromSet(s,e,r.options);if(a)return a}}return null}_loadSvgIconFromConfig(e){return this._fetchIcon(e).pipe(Ci(i=>e.svgText=i),ve(()=>this._svgElementFromConfig(e)))}_loadSvgIconSetFromConfig(e){return e.svgText?Ve(null):this._fetchIcon(e).pipe(Ci(i=>e.svgText=i))}_extractSvgIconFromSet(e,i,o){let r=e.querySelector(`[id="${i}"]`);if(!r)return null;let s=r.cloneNode(!0);if(s.removeAttribute("id"),s.nodeName.toLowerCase()==="svg")return this._setSvgAttributes(s,o);if(s.nodeName.toLowerCase()==="symbol")return this._setSvgAttributes(this._toSvgElement(s),o);let a=this._svgElementFromString(eo("<svg></svg>"));return a.appendChild(s),this._setSvgAttributes(a,o)}_svgElementFromString(e){let i=this._document.createElement("DIV");i.innerHTML=e;let o=i.querySelector("svg");if(!o)throw Error("<svg> tag not found");return o}_toSvgElement(e){let i=this._svgElementFromString(eo("<svg></svg>")),o=e.attributes;for(let r=0;r<o.length;r++){let{name:s,value:a}=o[r];s!=="id"&&i.setAttribute(s,a)}for(let r=0;r<e.childNodes.length;r++)e.childNodes[r].nodeType===this._document.ELEMENT_NODE&&i.appendChild(e.childNodes[r].cloneNode(!0));return i}_setSvgAttributes(e,i){return e.setAttribute("fit",""),e.setAttribute("height","100%"),e.setAttribute("width","100%"),e.setAttribute("preserveAspectRatio","xMidYMid meet"),e.setAttribute("focusable","false"),i&&i.viewBox&&e.setAttribute("viewBox",i.viewBox),e}_fetchIcon(e){let{url:i,options:o}=e,r=o?.withCredentials??!1;if(!this._httpClient)throw PA();if(i==null)throw Error(`Cannot fetch icon from URL "${i}".`);let s=this._sanitizer.sanitize(He.RESOURCE_URL,i);if(!s)throw aC(i);let a=this._inProgressUrlFetches.get(s);if(a)return a;let l=this._httpClient.get(s,{responseType:"text",withCredentials:r}).pipe(ve(c=>eo(c)),Or(()=>this._inProgressUrlFetches.delete(s)),Fr());return this._inProgressUrlFetches.set(s,l),l}_addSvgIconConfig(e,i,o){return this._svgIconConfigs.set(cC(e,i),o),this}_addSvgIconSetConfig(e,i){let o=this._iconSetConfigs.get(e);return o?o.push(i):this._iconSetConfigs.set(e,[i]),this}_svgElementFromConfig(e){if(!e.svgElement){let i=this._svgElementFromString(e.svgText);this._setSvgAttributes(i,e.options),e.svgElement=i}return e.svgElement}_getIconConfigFromResolvers(e,i){for(let o=0;o<this._resolvers.length;o++){let r=this._resolvers[o](i,e);if(r)return LA(r)?new On(r.url,null,r.options):new On(r,null)}}static \u0275fac=function(i){return new(i||t)(M(Nt,8),M(Xi),M(k,8),M(Qe))};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function dd(t){return t.cloneNode(!0)}function cC(t,n){return t+":"+n}function LA(t){return!!(t.url&&t.options)}var VA=["*"],BA=new _("MAT_ICON_DEFAULT_OPTIONS"),jA=new _("mat-icon-location",{providedIn:"root",factory:()=>{let t=u(k),n=t?t.location:null;return{getPathname:()=>n?n.pathname+n.search:""}}}),uC=["clip-path","color-profile","src","cursor","fill","filter","marker","marker-start","marker-mid","marker-end","mask","stroke"],HA=uC.map(t=>`[${t}]`).join(", "),UA=/^url\(['"]?#(.*?)['"]?\)$/,vn=(()=>{class t{_elementRef=u(B);_iconRegistry=u(dC);_location=u(jA);_errorHandler=u(Qe);_defaultColor;get color(){return this._color||this._defaultColor}set color(e){this._color=e}_color;inline=!1;get svgIcon(){return this._svgIcon}set svgIcon(e){e!==this._svgIcon&&(e?this._updateSvgIcon(e):this._svgIcon&&this._clearSvgElement(),this._svgIcon=e)}_svgIcon;get fontSet(){return this._fontSet}set fontSet(e){let i=this._cleanupFontValue(e);i!==this._fontSet&&(this._fontSet=i,this._updateFontIconClasses())}_fontSet;get fontIcon(){return this._fontIcon}set fontIcon(e){let i=this._cleanupFontValue(e);i!==this._fontIcon&&(this._fontIcon=i,this._updateFontIconClasses())}_fontIcon;_previousFontSetClass=[];_previousFontIconClass;_svgName=null;_svgNamespace=null;_previousPath;_elementsWithExternalReferences;_currentIconFetch=de.EMPTY;constructor(){let e=u(new Go("aria-hidden"),{optional:!0}),i=u(BA,{optional:!0});i&&(i.color&&(this.color=this._defaultColor=i.color),i.fontSet&&(this.fontSet=i.fontSet)),e||this._elementRef.nativeElement.setAttribute("aria-hidden","true")}_splitIconName(e){if(!e)return["",""];let i=e.split(":");switch(i.length){case 1:return["",i[0]];case 2:return i;default:throw Error(`Invalid icon name: "${e}"`)}}ngOnInit(){this._updateFontIconClasses()}ngAfterViewChecked(){let e=this._elementsWithExternalReferences;if(e&&e.size){let i=this._location.getPathname();i!==this._previousPath&&(this._previousPath=i,this._prependPathToReferences(i))}}ngOnDestroy(){this._currentIconFetch.unsubscribe(),this._elementsWithExternalReferences&&this._elementsWithExternalReferences.clear()}_usingFontIcon(){return!this.svgIcon}_setSvgElement(e){this._clearSvgElement();let i=this._location.getPathname();this._previousPath=i,this._cacheChildrenWithExternalReferences(e),this._prependPathToReferences(i),this._elementRef.nativeElement.appendChild(e)}_clearSvgElement(){let e=this._elementRef.nativeElement,i=e.childNodes.length;for(this._elementsWithExternalReferences&&this._elementsWithExternalReferences.clear();i--;){let o=e.childNodes[i];(o.nodeType!==1||o.nodeName.toLowerCase()==="svg")&&o.remove()}}_updateFontIconClasses(){if(!this._usingFontIcon())return;let e=this._elementRef.nativeElement,i=(this.fontSet?this._iconRegistry.classNameForFontAlias(this.fontSet).split(/ +/):this._iconRegistry.getDefaultFontSetClass()).filter(o=>o.length>0);this._previousFontSetClass.forEach(o=>e.classList.remove(o)),i.forEach(o=>e.classList.add(o)),this._previousFontSetClass=i,this.fontIcon!==this._previousFontIconClass&&!i.includes("mat-ligature-font")&&(this._previousFontIconClass&&e.classList.remove(this._previousFontIconClass),this.fontIcon&&e.classList.add(this.fontIcon),this._previousFontIconClass=this.fontIcon)}_cleanupFontValue(e){return typeof e=="string"?e.trim().split(" ")[0]:e}_prependPathToReferences(e){let i=this._elementsWithExternalReferences;i&&i.forEach((o,r)=>{o.forEach(s=>{r.setAttribute(s.name,`url('${e}#${s.value}')`)})})}_cacheChildrenWithExternalReferences(e){let i=e.querySelectorAll(HA),o=this._elementsWithExternalReferences=this._elementsWithExternalReferences||new Map;for(let r=0;r<i.length;r++)uC.forEach(s=>{let a=i[r],l=a.getAttribute(s),c=l?l.match(UA):null;if(c){let d=o.get(a);d||(d=[],o.set(a,d)),d.push({name:s,value:c[1]})}})}_updateSvgIcon(e){if(this._svgNamespace=null,this._svgName=null,this._currentIconFetch.unsubscribe(),e){let[i,o]=this._splitIconName(e);i&&(this._svgNamespace=i),o&&(this._svgName=o),this._currentIconFetch=this._iconRegistry.getNamedSvgIcon(o,i).pipe(pt(1)).subscribe(r=>this._setSvgElement(r),r=>{let s=`Error retrieving icon ${i}:${o}! ${r.message}`;this._errorHandler.handleError(new Error(s))})}}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=j({type:t,selectors:[["mat-icon"]],hostAttrs:["role","img",1,"mat-icon","notranslate"],hostVars:10,hostBindings:function(i,o){i&2&&(Z("data-mat-icon-type",o._usingFontIcon()?"font":"svg")("data-mat-icon-name",o._svgName||o.fontIcon)("data-mat-icon-namespace",o._svgNamespace||o.fontSet)("fontIcon",o._usingFontIcon()?o.fontIcon:null),Jt(o.color?"mat-"+o.color:""),V("mat-icon-inline",o.inline)("mat-icon-no-color",o.color!=="primary"&&o.color!=="accent"&&o.color!=="warn"))},inputs:{color:"color",inline:[2,"inline","inline",ce],svgIcon:"svgIcon",fontSet:"fontSet",fontIcon:"fontIcon"},exportAs:["matIcon"],ngContentSelectors:VA,decls:1,vars:0,template:function(i,o){i&1&&(Ye(),me(0))},styles:[`mat-icon, mat-icon.mat-primary, mat-icon.mat-accent, mat-icon.mat-warn {
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
`],encapsulation:2,changeDetection:0})}return t})(),_n=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=q({type:t});static \u0275inj=z({imports:[be]})}return t})();var zA=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275cmp=j({type:t,selectors:[["ng-component"]],hostAttrs:["cdk-text-field-style-loader",""],decls:0,vars:0,template:function(i,o){},styles:[`textarea.cdk-textarea-autosize {
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
`],encapsulation:2,changeDetection:0})}return t})(),$A={passive:!0},fC=(()=>{class t{_platform=u(ae);_ngZone=u(S);_renderer=u(Fe).createRenderer(null,null);_styleLoader=u(qe);_monitoredElements=new Map;constructor(){}monitor(e){if(!this._platform.isBrowser)return _i;this._styleLoader.load(zA);let i=yt(e),o=this._monitoredElements.get(i);if(o)return o.subject;let r=new C,s="cdk-text-field-autofilled",a=c=>{c.animationName==="cdk-text-field-autofill-start"&&!i.classList.contains(s)?(i.classList.add(s),this._ngZone.run(()=>r.next({target:c.target,isAutofilled:!0}))):c.animationName==="cdk-text-field-autofill-end"&&i.classList.contains(s)&&(i.classList.remove(s),this._ngZone.run(()=>r.next({target:c.target,isAutofilled:!1})))},l=this._ngZone.runOutsideAngular(()=>(i.classList.add("cdk-text-field-autofill-monitored"),this._renderer.listen(i,"animationstart",a,$A)));return this._monitoredElements.set(i,{subject:r,unlisten:l}),r}stopMonitoring(e){let i=yt(e),o=this._monitoredElements.get(i);o&&(o.unlisten(),o.subject.complete(),i.classList.remove("cdk-text-field-autofill-monitored"),i.classList.remove("cdk-text-field-autofilled"),this._monitoredElements.delete(i))}ngOnDestroy(){this._monitoredElements.forEach((e,i)=>this.stopMonitoring(i))}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var mC=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=q({type:t});static \u0275inj=z({})}return t})();var pC=new _("MAT_INPUT_VALUE_ACCESSOR");var hC=(()=>{class t{isErrorState(e,i){return!!(e&&e.invalid&&(e.touched||i&&i.submitted))}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var ud=class{_defaultMatcher;ngControl;_parentFormGroup;_parentForm;_stateChanges;errorState=!1;matcher;constructor(n,e,i,o,r){this._defaultMatcher=n,this.ngControl=e,this._parentFormGroup=i,this._parentForm=o,this._stateChanges=r}updateErrorState(){let n=this.errorState,e=this._parentFormGroup||this._parentForm,i=this.matcher||this._defaultMatcher,o=this.ngControl?this.ngControl.control:null,r=i?.isErrorState(o,e)??!1;r!==n&&(this.errorState=r,this._stateChanges.next())}};var GA=["button","checkbox","file","hidden","image","radio","range","reset","submit"],WA=new _("MAT_INPUT_CONFIG"),fd=(()=>{class t{_elementRef=u(B);_platform=u(ae);ngControl=u(oo,{optional:!0,self:!0});_autofillMonitor=u(fC);_ngZone=u(S);_formField=u(Jp,{optional:!0});_renderer=u(Ae);_uid=u(ke).getId("mat-input-");_previousNativeValue;_inputValueAccessor;_signalBasedValueAccessor;_previousPlaceholder=null;_errorStateTracker;_config=u(WA,{optional:!0});_cleanupIosKeyup;_cleanupWebkitWheel;_isServer=!1;_isNativeSelect=!1;_isTextarea=!1;_isInFormField=!1;focused=!1;stateChanges=new C;controlType="mat-input";autofilled=!1;get disabled(){return this._disabled}set disabled(e){this._disabled=Rn(e),this.focused&&(this.focused=!1,this.stateChanges.next())}_disabled=!1;get id(){return this._id}set id(e){this._id=e||this._uid}_id;placeholder;name;get required(){return this._required??this.ngControl?.control?.hasValidator(Bc.required)??!1}set required(e){this._required=Rn(e)}_required;get type(){return this._type}set type(e){this._type=e||"text",this._validateType(),!this._isTextarea&&fp().has(this._type)&&(this._elementRef.nativeElement.type=this._type)}_type="text";get errorStateMatcher(){return this._errorStateTracker.matcher}set errorStateMatcher(e){this._errorStateTracker.matcher=e}userAriaDescribedBy;get value(){return this._signalBasedValueAccessor?this._signalBasedValueAccessor.value():this._inputValueAccessor.value}set value(e){e!==this.value&&(this._signalBasedValueAccessor?this._signalBasedValueAccessor.value.set(e):this._inputValueAccessor.value=e,this.stateChanges.next())}get readonly(){return this._readonly}set readonly(e){this._readonly=Rn(e)}_readonly=!1;disabledInteractive;get errorState(){return this._errorStateTracker.errorState}set errorState(e){this._errorStateTracker.errorState=e}_neverEmptyInputTypes=["date","datetime","datetime-local","month","time","week"].filter(e=>fp().has(e));constructor(){let e=u(Fp,{optional:!0}),i=u(zs,{optional:!0}),o=u(hC),r=u(pC,{optional:!0,self:!0}),s=this._elementRef.nativeElement,a=s.nodeName.toLowerCase();r?Yi(r.value)?this._signalBasedValueAccessor=r:this._inputValueAccessor=r:this._inputValueAccessor=s,this._previousNativeValue=this.value,this.id=this.id,this._platform.IOS&&this._ngZone.runOutsideAngular(()=>{this._cleanupIosKeyup=this._renderer.listen(s,"keyup",this._iOSKeyupListener)}),this._errorStateTracker=new ud(o,this.ngControl,i,e,this.stateChanges),this._isServer=!this._platform.isBrowser,this._isNativeSelect=a==="select",this._isTextarea=a==="textarea",this._isInFormField=!!this._formField,this.disabledInteractive=this._config?.disabledInteractive||!1,this._isNativeSelect&&(this.controlType=s.multiple?"mat-native-select-multiple":"mat-native-select"),this._signalBasedValueAccessor&&Gt(()=>{this._signalBasedValueAccessor.value(),this.stateChanges.next()})}ngAfterViewInit(){this._platform.isBrowser&&this._autofillMonitor.monitor(this._elementRef.nativeElement).subscribe(e=>{this.autofilled=e.isAutofilled,this.stateChanges.next()})}ngOnChanges(){this.stateChanges.next()}ngOnDestroy(){this.stateChanges.complete(),this._platform.isBrowser&&this._autofillMonitor.stopMonitoring(this._elementRef.nativeElement),this._cleanupIosKeyup?.(),this._cleanupWebkitWheel?.()}ngDoCheck(){this.ngControl&&(this.updateErrorState(),this.ngControl.disabled!==null&&this.ngControl.disabled!==this.disabled&&(this.disabled=this.ngControl.disabled,this.stateChanges.next())),this._dirtyCheckNativeValue(),this._dirtyCheckPlaceholder()}focus(e){this._elementRef.nativeElement.focus(e)}updateErrorState(){this._errorStateTracker.updateErrorState()}_focusChanged(e){if(e!==this.focused){if(!this._isNativeSelect&&e&&this.disabled&&this.disabledInteractive){let i=this._elementRef.nativeElement;i.type==="number"?(i.type="text",i.setSelectionRange(0,0),i.type="number"):i.setSelectionRange(0,0)}this.focused=e,this.stateChanges.next()}}_onInput(){}_dirtyCheckNativeValue(){let e=this._elementRef.nativeElement.value;this._previousNativeValue!==e&&(this._previousNativeValue=e,this.stateChanges.next())}_dirtyCheckPlaceholder(){let e=this._getPlaceholder();if(e!==this._previousPlaceholder){let i=this._elementRef.nativeElement;this._previousPlaceholder=e,e?i.setAttribute("placeholder",e):i.removeAttribute("placeholder")}}_getPlaceholder(){return this.placeholder||null}_validateType(){GA.indexOf(this._type)>-1}_isNeverEmpty(){return this._neverEmptyInputTypes.indexOf(this._type)>-1}_isBadInput(){let e=this._elementRef.nativeElement.validity;return e&&e.badInput}get empty(){return!this._isNeverEmpty()&&!this._elementRef.nativeElement.value&&!this._isBadInput()&&!this.autofilled}get shouldLabelFloat(){if(this._isNativeSelect){let e=this._elementRef.nativeElement,i=e.options[0];return this.focused||e.multiple||!this.empty||!!(e.selectedIndex>-1&&i&&i.label)}else return this.focused&&!this.disabled||!this.empty}get describedByIds(){return this._elementRef.nativeElement.getAttribute("aria-describedby")?.split(" ")||[]}setDescribedByIds(e){let i=this._elementRef.nativeElement;e.length?i.setAttribute("aria-describedby",e.join(" ")):i.removeAttribute("aria-describedby")}onContainerClick(){this.focused||this.focus()}_isInlineSelect(){let e=this._elementRef.nativeElement;return this._isNativeSelect&&(e.multiple||e.size>1)}_iOSKeyupListener=e=>{let i=e.target;!i.value&&i.selectionStart===0&&i.selectionEnd===0&&(i.setSelectionRange(1,1),i.setSelectionRange(0,0))};_getReadonlyAttribute(){return this._isNativeSelect?null:this.readonly||this.disabled&&this.disabledInteractive?"true":null}static \u0275fac=function(i){return new(i||t)};static \u0275dir=L({type:t,selectors:[["input","matInput",""],["textarea","matInput",""],["select","matNativeControl",""],["input","matNativeControl",""],["textarea","matNativeControl",""]],hostAttrs:[1,"mat-mdc-input-element"],hostVars:21,hostBindings:function(i,o){i&1&&H("focus",function(){return o._focusChanged(!0)})("blur",function(){return o._focusChanged(!1)})("input",function(){return o._onInput()}),i&2&&(Qt("id",o.id)("disabled",o.disabled&&!o.disabledInteractive)("required",o.required),Z("name",o.name||null)("readonly",o._getReadonlyAttribute())("aria-disabled",o.disabled&&o.disabledInteractive?"true":null)("aria-invalid",o.empty&&o.required?null:o.errorState)("aria-required",o.required)("id",o.id),V("mat-input-server",o._isServer)("mat-mdc-form-field-textarea-control",o._isInFormField&&o._isTextarea)("mat-mdc-form-field-input-control",o._isInFormField)("mat-mdc-input-disabled-interactive",o.disabledInteractive)("mdc-text-field__input",o._isInFormField)("mat-mdc-native-select-inline",o._isInlineSelect()))},inputs:{disabled:"disabled",id:"id",placeholder:"placeholder",name:"name",required:"required",type:"type",errorStateMatcher:"errorStateMatcher",userAriaDescribedBy:[0,"aria-describedby","userAriaDescribedBy"],value:"value",readonly:"readonly",disabledInteractive:[2,"disabledInteractive","disabledInteractive",ce]},exportAs:["matInput"],features:[Ze([{provide:Qp,useExisting:t}]),xt]})}return t})(),md=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=q({type:t});static \u0275inj=z({imports:[co,co,mC,be]})}return t})();var qA=["tooltip"],YA=20;var ZA=new _("mat-tooltip-scroll-strategy",{providedIn:"root",factory:()=>{let t=u(F);return()=>fr(t,{scrollThrottle:YA})}}),KA=new _("mat-tooltip-default-options",{providedIn:"root",factory:()=>({showDelay:0,hideDelay:0,touchendHideDelay:1500})});var vC="tooltip-panel",XA={passive:!0},QA=8,JA=8,ek=24,tk=200,Ks=(()=>{class t{_elementRef=u(B);_ngZone=u(S);_platform=u(ae);_ariaDescriber=u(xb);_focusMonitor=u(Ot);_dir=u(Je);_injector=u(F);_viewContainerRef=u(lt);_mediaMatcher=u(er);_document=u(k);_renderer=u(Ae);_animationsDisabled=Ee();_defaultOptions=u(KA,{optional:!0});_overlayRef=null;_tooltipInstance=null;_overlayPanelClass;_portal;_position="below";_positionAtOrigin=!1;_disabled=!1;_tooltipClass;_viewInitialized=!1;_pointerExitEventsInitialized=!1;_tooltipComponent=_C;_viewportMargin=8;_currentPosition;_cssClassPrefix="mat-mdc";_ariaDescriptionPending=!1;_dirSubscribed=!1;get position(){return this._position}set position(e){e!==this._position&&(this._position=e,this._overlayRef&&(this._updatePosition(this._overlayRef),this._tooltipInstance?.show(0),this._overlayRef.updatePosition()))}get positionAtOrigin(){return this._positionAtOrigin}set positionAtOrigin(e){this._positionAtOrigin=Rn(e),this._detach(),this._overlayRef=null}get disabled(){return this._disabled}set disabled(e){let i=Rn(e);this._disabled!==i&&(this._disabled=i,i?this.hide(0):this._setupPointerEnterEventsIfNeeded(),this._syncAriaDescription(this.message))}get showDelay(){return this._showDelay}set showDelay(e){this._showDelay=kn(e)}_showDelay;get hideDelay(){return this._hideDelay}set hideDelay(e){this._hideDelay=kn(e),this._tooltipInstance&&(this._tooltipInstance._mouseLeaveHideDelay=this._hideDelay)}_hideDelay;touchGestures="auto";get message(){return this._message}set message(e){let i=this._message;this._message=e!=null?String(e).trim():"",!this._message&&this._isTooltipVisible()?this.hide(0):(this._setupPointerEnterEventsIfNeeded(),this._updateTooltipMessage()),this._syncAriaDescription(i)}_message="";get tooltipClass(){return this._tooltipClass}set tooltipClass(e){this._tooltipClass=e,this._tooltipInstance&&this._setTooltipClass(this._tooltipClass)}_eventCleanups=[];_touchstartTimeout=null;_destroyed=new C;_isDestroyed=!1;constructor(){let e=this._defaultOptions;e&&(this._showDelay=e.showDelay,this._hideDelay=e.hideDelay,e.position&&(this.position=e.position),e.positionAtOrigin&&(this.positionAtOrigin=e.positionAtOrigin),e.touchGestures&&(this.touchGestures=e.touchGestures),e.tooltipClass&&(this.tooltipClass=e.tooltipClass)),this._viewportMargin=QA}ngAfterViewInit(){this._viewInitialized=!0,this._setupPointerEnterEventsIfNeeded(),this._focusMonitor.monitor(this._elementRef).pipe(Se(this._destroyed)).subscribe(e=>{e?e==="keyboard"&&this._ngZone.run(()=>this.show()):this._ngZone.run(()=>this.hide(0))})}ngOnDestroy(){let e=this._elementRef.nativeElement;this._touchstartTimeout&&clearTimeout(this._touchstartTimeout),this._overlayRef&&(this._overlayRef.dispose(),this._tooltipInstance=null),this._eventCleanups.forEach(i=>i()),this._eventCleanups.length=0,this._destroyed.next(),this._destroyed.complete(),this._isDestroyed=!0,this._ariaDescriber.removeDescription(e,this.message,"tooltip"),this._focusMonitor.stopMonitoring(e)}show(e=this.showDelay,i){if(this.disabled||!this.message||this._isTooltipVisible()){this._tooltipInstance?._cancelPendingAnimations();return}let o=this._createOverlay(i);this._detach(),this._portal=this._portal||new tn(this._tooltipComponent,this._viewContainerRef);let r=this._tooltipInstance=o.attach(this._portal).instance;r._triggerElement=this._elementRef.nativeElement,r._mouseLeaveHideDelay=this._hideDelay,r.afterHidden().pipe(Se(this._destroyed)).subscribe(()=>this._detach()),this._setTooltipClass(this._tooltipClass),this._updateTooltipMessage(),r.show(e)}hide(e=this.hideDelay){let i=this._tooltipInstance;i&&(i.isVisible()?i.hide(e):(i._cancelPendingAnimations(),this._detach()))}toggle(e){this._isTooltipVisible()?this.hide():this.show(void 0,e)}_isTooltipVisible(){return!!this._tooltipInstance&&this._tooltipInstance.isVisible()}_createOverlay(e){if(this._overlayRef){let s=this._overlayRef.getConfig().positionStrategy;if((!this.positionAtOrigin||!e)&&s._origin instanceof B)return this._overlayRef;this._detach()}let i=this._injector.get(ii).getAncestorScrollContainers(this._elementRef),o=`${this._cssClassPrefix}-${vC}`,r=mr(this._injector,this.positionAtOrigin?e||this._elementRef:this._elementRef).withTransformOriginOn(`.${this._cssClassPrefix}-tooltip`).withFlexibleDimensions(!1).withViewportMargin(this._viewportMargin).withScrollableContainers(i).withPopoverLocation("global");return r.positionChanges.pipe(Se(this._destroyed)).subscribe(s=>{this._updateCurrentPositionClass(s.connectionPair),this._tooltipInstance&&s.scrollableViewProperties.isOverlayClipped&&this._tooltipInstance.isVisible()&&this._ngZone.run(()=>this.hide(0))}),this._overlayRef=hn(this._injector,{direction:this._dir,positionStrategy:r,panelClass:this._overlayPanelClass?[...this._overlayPanelClass,o]:o,scrollStrategy:this._injector.get(ZA)(),disableAnimations:this._animationsDisabled,eventPredicate:this._overlayEventPredicate}),this._updatePosition(this._overlayRef),this._overlayRef.detachments().pipe(Se(this._destroyed)).subscribe(()=>this._detach()),this._overlayRef.outsidePointerEvents().pipe(Se(this._destroyed)).subscribe(()=>this._tooltipInstance?._handleBodyInteraction()),this._overlayRef.keydownEvents().pipe(Se(this._destroyed)).subscribe(s=>{s.preventDefault(),s.stopPropagation(),this._ngZone.run(()=>this.hide(0))}),this._defaultOptions?.disableTooltipInteractivity&&this._overlayRef.addPanelClass(`${this._cssClassPrefix}-tooltip-panel-non-interactive`),this._dirSubscribed||(this._dirSubscribed=!0,this._dir.change.pipe(Se(this._destroyed)).subscribe(()=>{this._overlayRef&&this._updatePosition(this._overlayRef)})),this._overlayRef}_detach(){this._overlayRef&&this._overlayRef.hasAttached()&&this._overlayRef.detach(),this._tooltipInstance=null}_updatePosition(e){let i=e.getConfig().positionStrategy,o=this._getOrigin(),r=this._getOverlayPosition();i.withPositions([this._addOffset(D(D({},o.main),r.main)),this._addOffset(D(D({},o.fallback),r.fallback))])}_addOffset(e){let i=JA,o=!this._dir||this._dir.value=="ltr";return e.originY==="top"?e.offsetY=-i:e.originY==="bottom"?e.offsetY=i:e.originX==="start"?e.offsetX=o?-i:i:e.originX==="end"&&(e.offsetX=o?i:-i),e}_getOrigin(){let e=!this._dir||this._dir.value=="ltr",i=this.position,o;i=="above"||i=="below"?o={originX:"center",originY:i=="above"?"top":"bottom"}:i=="before"||i=="left"&&e||i=="right"&&!e?o={originX:"start",originY:"center"}:(i=="after"||i=="right"&&e||i=="left"&&!e)&&(o={originX:"end",originY:"center"});let{x:r,y:s}=this._invertPosition(o.originX,o.originY);return{main:o,fallback:{originX:r,originY:s}}}_getOverlayPosition(){let e=!this._dir||this._dir.value=="ltr",i=this.position,o;i=="above"?o={overlayX:"center",overlayY:"bottom"}:i=="below"?o={overlayX:"center",overlayY:"top"}:i=="before"||i=="left"&&e||i=="right"&&!e?o={overlayX:"end",overlayY:"center"}:(i=="after"||i=="right"&&e||i=="left"&&!e)&&(o={overlayX:"start",overlayY:"center"});let{x:r,y:s}=this._invertPosition(o.overlayX,o.overlayY);return{main:o,fallback:{overlayX:r,overlayY:s}}}_updateTooltipMessage(){this._tooltipInstance&&(this._tooltipInstance.message=this.message,this._tooltipInstance._markForCheck(),Ge(()=>{this._tooltipInstance&&this._overlayRef.updatePosition()},{injector:this._injector}))}_setTooltipClass(e){this._tooltipInstance&&(this._tooltipInstance.tooltipClass=e instanceof Set?Array.from(e):e,this._tooltipInstance._markForCheck())}_invertPosition(e,i){return this.position==="above"||this.position==="below"?i==="top"?i="bottom":i==="bottom"&&(i="top"):e==="end"?e="start":e==="start"&&(e="end"),{x:e,y:i}}_updateCurrentPositionClass(e){let{overlayY:i,originX:o,originY:r}=e,s;if(i==="center"?this._dir&&this._dir.value==="rtl"?s=o==="end"?"left":"right":s=o==="start"?"left":"right":s=i==="bottom"&&r==="top"?"above":"below",s!==this._currentPosition){let a=this._overlayRef;if(a){let l=`${this._cssClassPrefix}-${vC}-`;a.removePanelClass(l+this._currentPosition),a.addPanelClass(l+s)}this._currentPosition=s}}_setupPointerEnterEventsIfNeeded(){this._disabled||!this.message||!this._viewInitialized||this._eventCleanups.length||(this._isTouchPlatform()?this.touchGestures!=="off"&&(this._disableNativeGesturesIfNecessary(),this._addListener("touchstart",e=>{let i=e.targetTouches?.[0],o=i?{x:i.clientX,y:i.clientY}:void 0;this._setupPointerExitEventsIfNeeded(),this._touchstartTimeout&&clearTimeout(this._touchstartTimeout);let r=500;this._touchstartTimeout=setTimeout(()=>{this._touchstartTimeout=null,this.show(void 0,o)},this._defaultOptions?.touchLongPressShowDelay??r)})):this._addListener("mouseenter",e=>{this._setupPointerExitEventsIfNeeded();let i;e.x!==void 0&&e.y!==void 0&&(i=e),this.show(void 0,i)}))}_setupPointerExitEventsIfNeeded(){if(!this._pointerExitEventsInitialized){if(this._pointerExitEventsInitialized=!0,!this._isTouchPlatform())this._addListener("mouseleave",e=>{let i=e.relatedTarget;(!i||!this._overlayRef?.overlayElement.contains(i))&&this.hide()}),this._addListener("wheel",e=>{if(this._isTooltipVisible()){let i=this._document.elementFromPoint(e.clientX,e.clientY),o=this._elementRef.nativeElement;i!==o&&!o.contains(i)&&this.hide()}});else if(this.touchGestures!=="off"){this._disableNativeGesturesIfNecessary();let e=()=>{this._touchstartTimeout&&clearTimeout(this._touchstartTimeout),this.hide(this._defaultOptions?.touchendHideDelay)};this._addListener("touchend",e),this._addListener("touchcancel",e)}}}_addListener(e,i){this._eventCleanups.push(this._renderer.listen(this._elementRef.nativeElement,e,i,XA))}_isTouchPlatform(){let e=this._defaultOptions?.detectHoverCapability;return typeof e=="function"?!e():this._platform.IOS||this._platform.ANDROID?!0:this._platform.isBrowser?!!e&&this._mediaMatcher.matchMedia("(any-hover: none)").matches:!1}_disableNativeGesturesIfNecessary(){let e=this.touchGestures;if(e!=="off"){let i=this._elementRef.nativeElement,o=i.style;(e==="on"||i.nodeName!=="INPUT"&&i.nodeName!=="TEXTAREA")&&(o.userSelect=o.msUserSelect=o.webkitUserSelect=o.MozUserSelect="none"),(e==="on"||!i.draggable)&&(o.webkitUserDrag="none"),o.touchAction="none",o.webkitTapHighlightColor="transparent"}}_syncAriaDescription(e){this._ariaDescriptionPending||(this._ariaDescriptionPending=!0,this._ariaDescriber.removeDescription(this._elementRef.nativeElement,e,"tooltip"),this._isDestroyed||Ge({write:()=>{this._ariaDescriptionPending=!1,this.message&&!this.disabled&&this._ariaDescriber.describe(this._elementRef.nativeElement,this.message,"tooltip")}},{injector:this._injector}))}_overlayEventPredicate=e=>e.type==="keydown"?this._isTooltipVisible()&&e.keyCode===27&&!Ft(e):!0;static \u0275fac=function(i){return new(i||t)};static \u0275dir=L({type:t,selectors:[["","matTooltip",""]],hostAttrs:[1,"mat-mdc-tooltip-trigger"],hostVars:2,hostBindings:function(i,o){i&2&&V("mat-mdc-tooltip-disabled",o.disabled)},inputs:{position:[0,"matTooltipPosition","position"],positionAtOrigin:[0,"matTooltipPositionAtOrigin","positionAtOrigin"],disabled:[0,"matTooltipDisabled","disabled"],showDelay:[0,"matTooltipShowDelay","showDelay"],hideDelay:[0,"matTooltipHideDelay","hideDelay"],touchGestures:[0,"matTooltipTouchGestures","touchGestures"],message:[0,"matTooltip","message"],tooltipClass:[0,"matTooltipClass","tooltipClass"]},exportAs:["matTooltip"]})}return t})(),_C=(()=>{class t{_changeDetectorRef=u(We);_elementRef=u(B);_isMultiline=!1;message;tooltipClass;_showTimeoutId;_hideTimeoutId;_triggerElement;_mouseLeaveHideDelay;_animationsDisabled=Ee();_tooltip;_closeOnInteraction=!1;_isVisible=!1;_onHide=new C;_showAnimation="mat-mdc-tooltip-show";_hideAnimation="mat-mdc-tooltip-hide";constructor(){}show(e){this._hideTimeoutId!=null&&clearTimeout(this._hideTimeoutId),this._showTimeoutId=setTimeout(()=>{this._toggleVisibility(!0),this._showTimeoutId=void 0},e)}hide(e){this._showTimeoutId!=null&&clearTimeout(this._showTimeoutId),this._hideTimeoutId=setTimeout(()=>{this._toggleVisibility(!1),this._hideTimeoutId=void 0},e)}afterHidden(){return this._onHide}isVisible(){return this._isVisible}ngOnDestroy(){this._cancelPendingAnimations(),this._onHide.complete(),this._triggerElement=null}_handleBodyInteraction(){this._closeOnInteraction&&this.hide(0)}_markForCheck(){this._changeDetectorRef.markForCheck()}_handleMouseLeave({relatedTarget:e}){(!e||!this._triggerElement.contains(e))&&(this.isVisible()?this.hide(this._mouseLeaveHideDelay):this._finalizeAnimation(!1))}_onShow(){this._isMultiline=this._isTooltipMultiline(),this._markForCheck()}_isTooltipMultiline(){let e=this._elementRef.nativeElement.getBoundingClientRect();return e.height>ek&&e.width>=tk}_handleAnimationEnd({animationName:e}){(e===this._showAnimation||e===this._hideAnimation)&&this._finalizeAnimation(e===this._showAnimation)}_cancelPendingAnimations(){this._showTimeoutId!=null&&clearTimeout(this._showTimeoutId),this._hideTimeoutId!=null&&clearTimeout(this._hideTimeoutId),this._showTimeoutId=this._hideTimeoutId=void 0}_finalizeAnimation(e){e?this._closeOnInteraction=!0:this.isVisible()||this._onHide.next()}_toggleVisibility(e){let i=this._tooltip.nativeElement,o=this._showAnimation,r=this._hideAnimation;if(i.classList.remove(e?r:o),i.classList.add(e?o:r),this._isVisible!==e&&(this._isVisible=e,this._changeDetectorRef.markForCheck()),e&&!this._animationsDisabled&&typeof getComputedStyle=="function"){let s=getComputedStyle(i);(s.getPropertyValue("animation-duration")==="0s"||s.getPropertyValue("animation-name")==="none")&&(this._animationsDisabled=!0)}e&&this._onShow(),this._animationsDisabled&&(i.classList.add("_mat-animation-noopable"),this._finalizeAnimation(e))}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=j({type:t,selectors:[["mat-tooltip-component"]],viewQuery:function(i,o){if(i&1&&Pe(qA,7),i&2){let r;ne(r=ie())&&(o._tooltip=r.first)}},hostAttrs:["aria-hidden","true"],hostBindings:function(i,o){i&1&&H("mouseleave",function(s){return o._handleMouseLeave(s)})},decls:4,vars:5,consts:[["tooltip",""],[1,"mdc-tooltip","mat-mdc-tooltip",3,"animationend"],[1,"mat-mdc-tooltip-surface","mdc-tooltip__surface"]],template:function(i,o){i&1&&(ot(0,"div",1,0),$o("animationend",function(s){return o._handleAnimationEnd(s)}),ot(2,"div",2),E(3),_t()()),i&2&&(Jt(o.tooltipClass),V("mdc-tooltip--multiline",o._isMultiline),y(3),ue(o.message))},styles:[`.mat-mdc-tooltip {
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
`],encapsulation:2,changeDetection:0})}return t})();var pd=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=q({type:t});static \u0275inj=z({imports:[As,gn,be,ro]})}return t})();var nk=["determinateSpinner"];function ik(t,n){if(t&1&&(Bi(),h(0,"svg",11),J(1,"circle",12),g()),t&2){let e=x();Z("viewBox",e._viewBox()),y(),St("stroke-dasharray",e._strokeCircumference(),"px")("stroke-dashoffset",e._strokeCircumference()/2,"px")("stroke-width",e._circleStrokeWidth(),"%"),Z("r",e._circleRadius())}}var ok=new _("mat-progress-spinner-default-options",{providedIn:"root",factory:()=>({diameter:bC})}),bC=100,rk=10,DC=(()=>{class t{_elementRef=u(B);_noopAnimations;get color(){return this._color||this._defaultColor}set color(e){this._color=e}_color;_defaultColor="primary";_determinateCircle;constructor(){let e=u(ok),i=mp(),o=this._elementRef.nativeElement;this._noopAnimations=i==="di-disabled"&&!!e&&!e._forceAnimations,this.mode=o.nodeName.toLowerCase()==="mat-spinner"?"indeterminate":"determinate",!this._noopAnimations&&i==="reduced-motion"&&o.classList.add("mat-progress-spinner-reduced-motion"),e&&(e.color&&(this.color=this._defaultColor=e.color),e.diameter&&(this.diameter=e.diameter),e.strokeWidth&&(this.strokeWidth=e.strokeWidth))}mode;get value(){return this.mode==="determinate"?this._value:0}set value(e){this._value=Math.max(0,Math.min(100,e||0))}_value=0;get diameter(){return this._diameter}set diameter(e){this._diameter=e||0}_diameter=bC;get strokeWidth(){return this._strokeWidth??this.diameter/10}set strokeWidth(e){this._strokeWidth=e||0}_strokeWidth;_circleRadius(){return(this.diameter-rk)/2}_viewBox(){let e=this._circleRadius()*2+this.strokeWidth;return`0 0 ${e} ${e}`}_strokeCircumference(){return 2*Math.PI*this._circleRadius()}_strokeDashOffset(){return this.mode==="determinate"?this._strokeCircumference()*(100-this._value)/100:null}_circleStrokeWidth(){return this.strokeWidth/this.diameter*100}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=j({type:t,selectors:[["mat-progress-spinner"],["mat-spinner"]],viewQuery:function(i,o){if(i&1&&Pe(nk,5),i&2){let r;ne(r=ie())&&(o._determinateCircle=r.first)}},hostAttrs:["role","progressbar","tabindex","-1",1,"mat-mdc-progress-spinner","mdc-circular-progress"],hostVars:18,hostBindings:function(i,o){i&2&&(Z("aria-valuemin",0)("aria-valuemax",100)("aria-valuenow",o.mode==="determinate"?o.value:null)("mode",o.mode),Jt("mat-"+o.color),St("width",o.diameter,"px")("height",o.diameter,"px")("--mat-progress-spinner-size",o.diameter+"px")("--mat-progress-spinner-active-indicator-width",o.diameter+"px"),V("_mat-animation-noopable",o._noopAnimations)("mdc-circular-progress--indeterminate",o.mode==="indeterminate"))},inputs:{color:"color",mode:"mode",value:[2,"value","value",qo],diameter:[2,"diameter","diameter",qo],strokeWidth:[2,"strokeWidth","strokeWidth",qo]},exportAs:["matProgressSpinner"],decls:14,vars:11,consts:[["circle",""],["determinateSpinner",""],["aria-hidden","true",1,"mdc-circular-progress__determinate-container"],["xmlns","http://www.w3.org/2000/svg","focusable","false",1,"mdc-circular-progress__determinate-circle-graphic"],["cx","50%","cy","50%",1,"mdc-circular-progress__determinate-circle"],["aria-hidden","true",1,"mdc-circular-progress__indeterminate-container"],[1,"mdc-circular-progress__spinner-layer"],[1,"mdc-circular-progress__circle-clipper","mdc-circular-progress__circle-left"],[3,"ngTemplateOutlet"],[1,"mdc-circular-progress__gap-patch"],[1,"mdc-circular-progress__circle-clipper","mdc-circular-progress__circle-right"],["xmlns","http://www.w3.org/2000/svg","focusable","false",1,"mdc-circular-progress__indeterminate-circle-graphic"],["cx","50%","cy","50%"]],template:function(i,o){if(i&1&&(ct(0,ik,2,8,"ng-template",null,0,ps),h(2,"div",2,1),Bi(),h(4,"svg",3),J(5,"circle",4),g()(),fl(),h(6,"div",5)(7,"div",6)(8,"div",7),zo(9,8),g(),h(10,"div",9),zo(11,8),g(),h(12,"div",10),zo(13,8),g()()()),i&2){let r=fn(1);y(4),Z("viewBox",o._viewBox()),y(),St("stroke-dasharray",o._strokeCircumference(),"px")("stroke-dashoffset",o._strokeDashOffset(),"px")("stroke-width",o._circleStrokeWidth(),"%"),Z("r",o._circleRadius()),y(4),Q("ngTemplateOutlet",r),y(2),Q("ngTemplateOutlet",r),y(2),Q("ngTemplateOutlet",r)}},dependencies:[_s],styles:[`.mat-mdc-progress-spinner {
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
`],encapsulation:2,changeDetection:0})}return t})();var CC=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=q({type:t});static \u0275inj=z({imports:[be]})}return t})();var hd=class t{constructor(n){this.http=n}getSettings(){return this.http.get("/api/settings")}updateSettings(n){return this.http.put("/api/settings",n)}static \u0275fac=function(e){return new(e||t)(M(Nt))};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})};var lk=(t,n)=>n.title,ck=(t,n)=>n.key;function dk(t,n){t&1&&(h(0,"div",3),J(1,"mat-spinner",10),h(2,"span"),E(3,"Loading settings\u2026"),g()())}function uk(t,n){if(t&1){let e=Ue();h(0,"button",17),H("click",function(){we(e);let o=x().$implicit,r=x(3);return xe(r.toggleReveal(o.key))}),h(1,"mat-icon"),E(2),g()()}if(t&2){let e=x().$implicit,i=x(3);Q("matTooltip",i.isRevealed(e.key)?"Hide":"Show"),Z("aria-label",i.isRevealed(e.key)?"Hide value":"Show value"),y(2),ue(i.isRevealed(e.key)?"visibility_off":"visibility")}}function fk(t,n){if(t&1&&(h(0,"mat-form-field",14)(1,"mat-label"),E(2),g(),J(3,"input",15),G(4,uk,3,3,"button",16),h(5,"mat-hint"),E(6,"Leave blank to use environment variable or default"),g()()),t&2){let e=n.$implicit,i=x(3);y(2),ue(e.label),y(),Q("type",i.fieldType(e))("formControlName",e.key)("placeholder",e.placeholder??""),y(),W(e.type==="password"?4:-1)}}function mk(t,n){if(t&1&&(h(0,"section",12)(1,"h3",13),E(2),g(),dn(3,fk,7,5,"mat-form-field",14,ck),g()),t&2){let e=n.$implicit;y(2),ue(e.title),y(),un(e.fields)}}function pk(t,n){if(t&1&&(h(0,"form",11),H("submit",function(i){return i.preventDefault()}),dn(1,mk,5,1,"section",12,lk),g()),t&2){let e=x();Q("formGroup",e.form),y(),un(e.groups)}}function hk(t,n){if(t&1&&(h(0,"p",5),E(1),g()),t&2){let e=x();y(),ue(e.saveError())}}function gk(t,n){t&1&&J(0,"mat-spinner",9)}var EC=[{title:"Gemini (Cosmic Voice)",fields:[{key:"GEMINI_API_KEY",label:"API Key",type:"password",placeholder:"Gemini API key"},{key:"GEMINI_MODEL",label:"Model",type:"text",placeholder:"e.g. gemini-2.5-pro"},{key:"GEMINI_BASE_URL",label:"Base URL",type:"text",placeholder:"https://generativelanguage.googleapis.com"}]},{title:"Ollama (Inner Voices)",fields:[{key:"OLLAMA_BASE_URL",label:"Base URL",type:"text",placeholder:"http://localhost:11434"},{key:"OLLAMA_WHISPER_MODEL",label:"Inner Whisper model",type:"text",placeholder:"llama3.1:8b"},{key:"OLLAMA_SHOUT_MODEL",label:"Inner Shout model",type:"text",placeholder:"gemma4:e4b"}]},{title:"Last.fm (Album art)",fields:[{key:"LASTFM_API_KEY",label:"API Key",type:"password",placeholder:"Last.fm read API key"},{key:"LASTFM_BASE_URL",label:"Base URL",type:"text",placeholder:"https://ws.audioscrobbler.com/2.0/"}]},{title:"Clementine",fields:[{key:"CLEMENTINE_DB_PATH",label:"Database path",type:"text",placeholder:"Path to clementine.db copy"},{key:"CLEMENTINE_EXE_PATH",label:"Executable path",type:"text",placeholder:"Path to clementine.exe"},{key:"CLEMENTINE_MATCH_THRESHOLD",label:"Match threshold",type:"number",placeholder:"0.75"}]},{title:"Recommendations",fields:[{key:"RECOMMENDATION_MIN_TRACKS",label:"Min tracks",type:"number",placeholder:"10"},{key:"RECOMMENDATION_MAX_TRACKS",label:"Max tracks",type:"number",placeholder:"20"},{key:"RECOMMENDATION_SUGGESTION_CACHE_MINUTES",label:"Suggestion cache (min)",type:"number",placeholder:"60"}]},{title:"Session memory",fields:[{key:"SESSION_MEMORY_SIZE",label:"Memory size (replies)",type:"number",placeholder:"25"},{key:"SESSION_DEFAULT_TRACK_DURATION_SECONDS",label:"Default track duration (s)",type:"number",placeholder:"210"}]}],gd=class t{constructor(n,e,i){this.fb=n;this.settingsService=e;this.dialogRef=i}form;loading=N(!0);saving=N(!1);saveError=N(null);groups=EC;revealed=N({});ngOnInit(){let n={};for(let e of EC)for(let i of e.fields)n[i.key]="";this.form=this.fb.group(n),this.settingsService.getSettings().subscribe({next:e=>{for(let i of e.settings)this.form.contains(i.key)&&this.form.get(i.key)?.setValue(i.value??"");this.loading.set(!1)},error:()=>{this.loading.set(!1)}})}isRevealed(n){return this.revealed()[n]??!1}toggleReveal(n){this.revealed.update(e=>ee(D({},e),{[n]:!e[n]}))}fieldType(n){return n.type==="password"?this.isRevealed(n.key)?"text":"password":(n.type==="number","text")}save(){if(this.saving())return;this.saving.set(!0),this.saveError.set(null);let n={},e=this.form.value;for(let i of Object.keys(e))n[i]=e[i].trim()===""?null:e[i].trim();this.settingsService.updateSettings({settings:n}).subscribe({next:()=>{this.saving.set(!1),this.dialogRef.close(!0)},error:()=>{this.saving.set(!1),this.saveError.set("Could not save settings. Please try again.")}})}cancel(){this.dialogRef.close(!1)}static \u0275fac=function(e){return new(e||t)(Y(pD),Y(hd),Y(hr))};static \u0275cmp=j({type:t,selectors:[["app-settings-modal"]],decls:14,vars:5,consts:[["mat-dialog-title","",1,"settings-title"],["aria-hidden","true"],[1,"settings-content"],["role","status",1,"settings-loading"],[1,"settings-form",3,"formGroup"],["role","alert",1,"settings-error"],["align","end",1,"settings-actions"],["mat-button","","type","button",3,"click","disabled"],["mat-flat-button","","color","primary","type","button",3,"click","disabled"],["diameter","18",1,"btn-spinner"],["diameter","36"],[1,"settings-form",3,"submit","formGroup"],[1,"settings-group"],[1,"settings-group-title"],["appearance","outline",1,"settings-field"],["matInput","","autocomplete","off","spellcheck","false",3,"type","formControlName","placeholder"],["matSuffix","","mat-icon-button","","type","button",3,"matTooltip"],["matSuffix","","mat-icon-button","","type","button",3,"click","matTooltip"]],template:function(e,i){e&1&&(h(0,"h2",0)(1,"mat-icon",1),E(2,"settings"),g(),E(3,` Settings
`),g(),h(4,"mat-dialog-content",2),G(5,dk,4,0,"div",3)(6,pk,3,1,"form",4),G(7,hk,2,1,"p",5),g(),h(8,"mat-dialog-actions",6)(9,"button",7),H("click",function(){return i.cancel()}),E(10,"Cancel"),g(),h(11,"button",8),H("click",function(){return i.save()}),G(12,gk,1,0,"mat-spinner",9),E(13," Save "),g()()),e&2&&(y(5),W(i.loading()?5:6),y(2),W(i.saveError()?7:-1),y(2),Q("disabled",i.saving()),y(2),Q("disabled",i.loading()||i.saving()),y(),W(i.saving()?12:-1))},dependencies:[hD,fD,Yc,rD,sD,zs,Pp,Nn,rr,io,ld,UD,$D,zD,co,gr,lo,Ys,Xp,_n,vn,md,fd,CC,DC,pd,Ks],styles:[".settings-title[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;font-family:var(--reco-font);font-size:1.1rem;color:var(--reco-primary)}.settings-title[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:1.2rem;width:1.2rem;height:1.2rem}.settings-content[_ngcontent-%COMP%]{min-width:520px;max-width:600px;max-height:70vh;padding:8px 24px}.settings-loading[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;gap:12px;padding:32px 0;color:var(--reco-text-muted);font-size:.9rem}.settings-form[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:20px}.settings-group[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:8px}.settings-group-title[_ngcontent-%COMP%]{font-family:var(--reco-font);font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--reco-text-muted);margin:0 0 4px;padding-bottom:4px;border-bottom:1px solid var(--reco-border)}.settings-field[_ngcontent-%COMP%]{width:100%}.settings-actions[_ngcontent-%COMP%]{padding:12px 24px 16px;gap:8px}.settings-error[_ngcontent-%COMP%]{color:var(--reco-error);font-size:.85rem;margin:8px 0 0}.btn-spinner[_ngcontent-%COMP%]{display:inline-block;margin-right:6px;vertical-align:middle}"]})};function vk(t,n){if(t&1){let e=Ue();h(0,"div",1)(1,"button",2),H("click",function(){we(e);let o=x();return xe(o.action())}),E(2),g()()}if(t&2){let e=x();y(2),Tt(" ",e.data.action," ")}}var _k=["label"];function yk(t,n){}var bk=Math.pow(2,31)-1,Xs=class{_overlayRef;instance;containerInstance;_afterDismissed=new C;_afterOpened=new C;_onAction=new C;_durationTimeoutId;_dismissedByAction=!1;constructor(n,e){this._overlayRef=e,this.containerInstance=n,n._onExit.subscribe(()=>this._finishDismiss())}dismiss(){this._afterDismissed.closed||this.containerInstance.exit(),clearTimeout(this._durationTimeoutId)}dismissWithAction(){this._onAction.closed||(this._dismissedByAction=!0,this._onAction.next(),this._onAction.complete(),this.dismiss()),clearTimeout(this._durationTimeoutId)}closeWithAction(){this.dismissWithAction()}_dismissAfter(n){this._durationTimeoutId=setTimeout(()=>this.dismiss(),Math.min(n,bk))}_open(){this._afterOpened.closed||(this._afterOpened.next(),this._afterOpened.complete())}_finishDismiss(){this._overlayRef.dispose(),this._onAction.closed||this._onAction.complete(),this._afterDismissed.next({dismissedByAction:this._dismissedByAction}),this._afterDismissed.complete(),this._dismissedByAction=!1}afterDismissed(){return this._afterDismissed}afterOpened(){return this.containerInstance._onEnter}onAction(){return this._onAction}},wC=new _("MatSnackBarData"),vr=class{politeness="polite";announcementMessage="";viewContainerRef;duration=0;panelClass;direction;data=null;horizontalPosition="center";verticalPosition="bottom"},Dk=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=L({type:t,selectors:[["","matSnackBarLabel",""]],hostAttrs:[1,"mat-mdc-snack-bar-label","mdc-snackbar__label"]})}return t})(),Ck=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=L({type:t,selectors:[["","matSnackBarActions",""]],hostAttrs:[1,"mat-mdc-snack-bar-actions","mdc-snackbar__actions"]})}return t})(),Ek=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=L({type:t,selectors:[["","matSnackBarAction",""]],hostAttrs:[1,"mat-mdc-snack-bar-action","mdc-snackbar__action"]})}return t})(),wk=(()=>{class t{snackBarRef=u(Xs);data=u(wC);constructor(){}action(){this.snackBarRef.dismissWithAction()}get hasAction(){return!!this.data.action}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=j({type:t,selectors:[["simple-snack-bar"]],hostAttrs:[1,"mat-mdc-simple-snack-bar"],exportAs:["matSnackBar"],decls:3,vars:2,consts:[["matSnackBarLabel",""],["matSnackBarActions",""],["matButton","","matSnackBarAction","",3,"click"]],template:function(i,o){i&1&&(h(0,"div",0),E(1),g(),G(2,vk,3,1,"div",1)),i&2&&(y(),Tt(" ",o.data.message,`
`),y(),W(o.hasAction?2:-1))},dependencies:[rr,Dk,Ck,Ek],styles:[`.mat-mdc-simple-snack-bar {
  display: flex;
}
.mat-mdc-simple-snack-bar .mat-mdc-snack-bar-label {
  max-height: 50vh;
  overflow: auto;
}
`],encapsulation:2,changeDetection:0})}return t})(),eh="_mat-snack-bar-enter",th="_mat-snack-bar-exit",xk=(()=>{class t extends oi{_ngZone=u(S);_elementRef=u(B);_changeDetectorRef=u(We);_platform=u(ae);_animationsDisabled=Ee();snackBarConfig=u(vr);_document=u(k);_trackedModals=new Set;_enterFallback;_exitFallback;_injector=u(F);_announceDelay=150;_announceTimeoutId;_destroyed=!1;_portalOutlet;_onAnnounce=new C;_onExit=new C;_onEnter=new C;_animationState="void";_live;_label;_role;_liveElementId=u(ke).getId("mat-snack-bar-container-live-");constructor(){super();let e=this.snackBarConfig;e.politeness==="assertive"&&!e.announcementMessage?this._live="assertive":e.politeness==="off"?this._live="off":this._live="polite",this._platform.FIREFOX&&(this._live==="polite"&&(this._role="status"),this._live==="assertive"&&(this._role="alert"))}attachComponentPortal(e){this._assertNotAttached();let i=this._portalOutlet.attachComponentPortal(e);return this._afterPortalAttached(),i}attachTemplatePortal(e){this._assertNotAttached();let i=this._portalOutlet.attachTemplatePortal(e);return this._afterPortalAttached(),i}attachDomPortal=e=>{this._assertNotAttached();let i=this._portalOutlet.attachDomPortal(e);return this._afterPortalAttached(),i};onAnimationEnd(e){e===th?this._completeExit():e===eh&&(clearTimeout(this._enterFallback),this._ngZone.run(()=>{this._onEnter.next(),this._onEnter.complete()}))}enter(){this._destroyed||(this._animationState="visible",this._changeDetectorRef.markForCheck(),this._changeDetectorRef.detectChanges(),this._screenReaderAnnounce(),this._animationsDisabled?Ge(()=>{this._ngZone.run(()=>queueMicrotask(()=>this.onAnimationEnd(eh)))},{injector:this._injector}):(clearTimeout(this._enterFallback),this._enterFallback=setTimeout(()=>{this._elementRef.nativeElement.classList.add("mat-snack-bar-fallback-visible"),this.onAnimationEnd(eh)},200)))}exit(){return this._destroyed?Ve(void 0):(this._ngZone.run(()=>{this._animationState="hidden",this._changeDetectorRef.markForCheck(),this._elementRef.nativeElement.setAttribute("mat-exit",""),clearTimeout(this._announceTimeoutId),this._animationsDisabled?Ge(()=>{this._ngZone.run(()=>queueMicrotask(()=>this.onAnimationEnd(th)))},{injector:this._injector}):(clearTimeout(this._exitFallback),this._exitFallback=setTimeout(()=>this.onAnimationEnd(th),200))}),this._onExit)}ngOnDestroy(){this._destroyed=!0,this._clearFromModals(),this._completeExit()}_completeExit(){clearTimeout(this._exitFallback),queueMicrotask(()=>{this._onExit.next(),this._onExit.complete()})}_afterPortalAttached(){let e=this._elementRef.nativeElement,i=this.snackBarConfig.panelClass;i&&(Array.isArray(i)?i.forEach(s=>e.classList.add(s)):e.classList.add(i)),this._exposeToModals();let o=this._label.nativeElement,r="mdc-snackbar__label";o.classList.toggle(r,!o.querySelector(`.${r}`))}_exposeToModals(){let e=this._liveElementId,i=this._document.querySelectorAll('body > .cdk-overlay-container [aria-modal="true"]');for(let o=0;o<i.length;o++){let r=i[o],s=r.getAttribute("aria-owns");this._trackedModals.add(r),s?s.indexOf(e)===-1&&r.setAttribute("aria-owns",s+" "+e):r.setAttribute("aria-owns",e)}}_clearFromModals(){this._trackedModals.forEach(e=>{let i=e.getAttribute("aria-owns");if(i){let o=i.replace(this._liveElementId,"").trim();o.length>0?e.setAttribute("aria-owns",o):e.removeAttribute("aria-owns")}}),this._trackedModals.clear()}_assertNotAttached(){this._portalOutlet.hasAttached()}_screenReaderAnnounce(){this._announceTimeoutId||this._ngZone.runOutsideAngular(()=>{this._announceTimeoutId=setTimeout(()=>{if(this._destroyed)return;let e=this._elementRef.nativeElement,i=e.querySelector("[aria-hidden]"),o=e.querySelector("[aria-live]");if(i&&o){let r=null;this._platform.isBrowser&&document.activeElement instanceof HTMLElement&&i.contains(document.activeElement)&&(r=document.activeElement),i.removeAttribute("aria-hidden"),o.appendChild(i),r?.focus(),this._onAnnounce.next(),this._onAnnounce.complete()}},this._announceDelay)})}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=j({type:t,selectors:[["mat-snack-bar-container"]],viewQuery:function(i,o){if(i&1&&Pe(ri,7)(_k,7),i&2){let r;ne(r=ie())&&(o._portalOutlet=r.first),ne(r=ie())&&(o._label=r.first)}},hostAttrs:[1,"mdc-snackbar","mat-mdc-snack-bar-container"],hostVars:6,hostBindings:function(i,o){i&1&&H("animationend",function(s){return o.onAnimationEnd(s.animationName)})("animationcancel",function(s){return o.onAnimationEnd(s.animationName)}),i&2&&V("mat-snack-bar-container-enter",o._animationState==="visible")("mat-snack-bar-container-exit",o._animationState==="hidden")("mat-snack-bar-container-animations-enabled",!o._animationsDisabled)},features:[he],decls:6,vars:3,consts:[["label",""],[1,"mdc-snackbar__surface","mat-mdc-snackbar-surface"],[1,"mat-mdc-snack-bar-label"],["aria-hidden","true"],["cdkPortalOutlet",""]],template:function(i,o){i&1&&(h(0,"div",1)(1,"div",2,0)(3,"div",3),ct(4,yk,0,0,"ng-template",4),g(),J(5,"div"),g()()),i&2&&(y(5),Z("aria-live",o._live)("role",o._role)("id",o._liveElementId))},dependencies:[ri],styles:[`@keyframes _mat-snack-bar-enter {
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
`],encapsulation:2})}return t})(),Ik=new _("mat-snack-bar-default-options",{providedIn:"root",factory:()=>new vr}),vd=(()=>{class t{_live=u(ap);_injector=u(F);_breakpointObserver=u(Ts);_parentSnackBar=u(t,{optional:!0,skipSelf:!0});_defaultConfig=u(Ik);_animationsDisabled=Ee();_snackBarRefAtThisLevel=null;simpleSnackBarComponent=wk;snackBarContainerComponent=xk;handsetCssClass="mat-mdc-snack-bar-handset";get _openedSnackBarRef(){let e=this._parentSnackBar;return e?e._openedSnackBarRef:this._snackBarRefAtThisLevel}set _openedSnackBarRef(e){this._parentSnackBar?this._parentSnackBar._openedSnackBarRef=e:this._snackBarRefAtThisLevel=e}constructor(){}openFromComponent(e,i){return this._attach(e,i)}openFromTemplate(e,i){return this._attach(e,i)}open(e,i="",o){let r=D(D({},this._defaultConfig),o);return r.data={message:e,action:i},r.announcementMessage===e&&(r.announcementMessage=void 0),this.openFromComponent(this.simpleSnackBarComponent,r)}dismiss(){this._openedSnackBarRef&&this._openedSnackBarRef.dismiss()}ngOnDestroy(){this._snackBarRefAtThisLevel&&this._snackBarRefAtThisLevel.dismiss()}_attachSnackBarContainer(e,i){let o=i&&i.viewContainerRef&&i.viewContainerRef.injector,r=F.create({parent:o||this._injector,providers:[{provide:vr,useValue:i}]}),s=new tn(this.snackBarContainerComponent,i.viewContainerRef,r),a=e.attach(s);return a.instance.snackBarConfig=i,a.instance}_attach(e,i){let o=D(D(D({},new vr),this._defaultConfig),i),r=this._createOverlay(o),s=this._attachSnackBarContainer(r,o),a=new Xs(s,r);if(e instanceof it){let l=new mn(e,null,{$implicit:o.data,snackBarRef:a});a.instance=s.attachTemplatePortal(l)}else{let l=this._createInjector(o,a),c=new tn(e,void 0,l),d=s.attachComponentPortal(c);a.instance=d.instance}return this._breakpointObserver.observe(Mb.HandsetPortrait).pipe(Se(r.detachments())).subscribe(l=>{r.overlayElement.classList.toggle(this.handsetCssClass,l.matches)}),o.announcementMessage&&s._onAnnounce.subscribe(()=>{this._live.announce(o.announcementMessage,o.politeness)}),this._animateSnackBar(a,o),this._openedSnackBarRef=a,this._openedSnackBarRef}_animateSnackBar(e,i){e.afterDismissed().subscribe(()=>{this._openedSnackBarRef==e&&(this._openedSnackBarRef=null),i.announcementMessage&&this._live.clear()}),i.duration&&i.duration>0&&e.afterOpened().subscribe(()=>e._dismissAfter(i.duration)),this._openedSnackBarRef?(this._openedSnackBarRef.afterDismissed().subscribe(()=>{e.containerInstance.enter()}),this._openedSnackBarRef.dismiss()):e.containerInstance.enter()}_createOverlay(e){let i=new pn;i.direction=e.direction;let o=ai(this._injector),r=e.direction==="rtl",s=e.horizontalPosition==="left"||e.horizontalPosition==="start"&&!r||e.horizontalPosition==="end"&&r,a=!s&&e.horizontalPosition!=="center";return s?o.left("0"):a?o.right("0"):o.centerHorizontally(),e.verticalPosition==="top"?o.top("0"):o.bottom("0"),i.positionStrategy=o,i.disableAnimations=this._animationsDisabled,hn(this._injector,i)}_createInjector(e,i){let o=e&&e.viewContainerRef&&e.viewContainerRef.injector;return F.create({parent:o||this._injector,providers:[{provide:Xs,useValue:i},{provide:wC,useValue:e.data}]})}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var _r=class t{constructor(n){this.http=n}addToPlaylist(n){return this.http.post("/api/clementine/add",{filePaths:n})}static \u0275fac=function(e){return new(e||t)(M(Nt))};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})};var ci=class t{constructor(n){this.http=n}logTrackEvent(n,e,i,o,r){let s={eventType:n,artist:e,album:i,title:o,durationSeconds:r??null,timestamp:new Date().toISOString()};return this.http.post("/api/session/events",s)}getMemoryStatus(){return this.http.get("/api/session/memory")}bustMemory(){return this.http.delete("/api/session/memory")}getHistory(){return this.http.get("/api/session/history")}getEnrichedSuggestions(n){return this.http.get(`/api/session/reply/${n}/suggestions`)}setActiveReply(n){return this.http.post("/api/session/active-reply",{replyId:n})}static \u0275fac=function(e){return new(e||t)(M(Nt))};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})};function Mk(t,n){if(t&1){let e=Ue();h(0,"img",12),H("error",function(){we(e);let o=x();return xe(o.onArtError())}),g()}if(t&2){let e=x();Q("src",e.suggestion().albumArtUrl,Hl)("alt",e.suggestion().album||e.suggestion().title)}}function Sk(t,n){t&1&&(h(0,"div",3)(1,"mat-icon",13),E(2,"album"),g()())}function Tk(t,n){if(t&1){let e=Ue();h(0,"button",14),H("click",function(o){return we(e),x().copyToClipboard(),xe(o.stopPropagation())}),h(1,"mat-icon"),E(2,"content_copy"),g()()}if(t&2){let e=x();Z("aria-label","Copy "+e.suggestion().artist+" \u2013 "+e.suggestion().title+" to clipboard")}}function Ak(t,n){if(t&1){let e=Ue();h(0,"a",15),H("click",function(o){return we(e),x().onYouTubeClick(),xe(o.stopPropagation())}),J(1,"img",16),h(2,"span"),E(3,"YouTube"),g()()}if(t&2){let e=x();Q("href",e.youtubeUrl(),Hl),Z("aria-label","Search "+e.suggestion().artist+" \u2013 "+e.suggestion().title+" on YouTube")}}function kk(t,n){if(t&1){let e=Ue();h(0,"button",17),H("click",function(o){return we(e),x().addToClementine(),xe(o.stopPropagation())}),J(1,"img",18),g()}if(t&2){let e=x();Q("disabled",e.addingToPlaylist()),Z("aria-label","Add "+e.suggestion().artist+" \u2013 "+e.suggestion().title+" to Clementine playlist")}}var _d=class t{constructor(n,e,i){this.snackBar=n;this.playlistService=e;this.sessionService=i}suggestion=kt.required();clementineUnavailable=kt(!1);addingToPlaylist=N(!1);artFailed=N(!1);hasArt=Ie(()=>!!this.suggestion().albumArtUrl&&!this.artFailed());youtubeUrl=Ie(()=>`https://www.youtube.com/results?search_query=${encodeURIComponent(`${this.suggestion().artist} ${this.suggestion().title}`)}`);onArtError(){this.artFailed.set(!0)}copyToClipboard(){let n=this.suggestion(),e=`${n.artist} \u2013 ${n.title}`;navigator.clipboard.writeText(e).then(()=>this.snackBar.open(`Copied: ${e}`,void 0,{duration:2e3}),()=>this.snackBar.open("Could not copy to clipboard","Dismiss",{duration:4e3}))}onYouTubeClick(){let n=this.suggestion();this.sessionService.logTrackEvent("track-youtube",n.artist,n.album??null,n.title,n.durationSeconds??null).subscribe({error:()=>{}})}addToClementine(){let n=this.suggestion();if(!n.filePath||this.addingToPlaylist())return;this.addingToPlaylist.set(!0);let e=Date.now(),i=()=>{let o=Date.now()-e;setTimeout(()=>this.addingToPlaylist.set(!1),Math.max(0,1e3-o))};this.playlistService.addToPlaylist([n.filePath]).subscribe({next:()=>{this.snackBar.open(`Added to Clementine: ${n.artist} \u2013 ${n.title}`,void 0,{duration:2e3}),this.sessionService.logTrackEvent("track-added",n.artist,n.album??null,n.title,n.durationSeconds??null).subscribe({error:()=>{}}),i()},error:()=>{this.snackBar.open("Could not add to Clementine playlist","Dismiss",{duration:4e3}),i()}})}static \u0275fac=function(e){return new(e||t)(Y(vd),Y(_r),Y(ci))};static \u0275cmp=j({type:t,selectors:[["app-suggestion-card"]],inputs:{suggestion:[1,"suggestion"],clementineUnavailable:[1,"clementineUnavailable"]},decls:15,vars:13,consts:[[1,"tile"],[1,"tile-art"],[1,"art-img",3,"src","alt"],[1,"art-placeholder"],["mat-icon-button","",1,"art-overlay-btn"],[1,"tile-info"],[1,"tile-title"],[1,"tile-artist"],[1,"tile-album"],[1,"tile-footer"],["target","_blank","rel","noopener noreferrer",1,"footer-action","footer-action--link",3,"href"],["mat-icon-button","",1,"footer-action","footer-action--btn",3,"disabled"],[1,"art-img",3,"error","src","alt"],["aria-hidden","true"],["mat-icon-button","",1,"art-overlay-btn",3,"click"],["target","_blank","rel","noopener noreferrer",1,"footer-action","footer-action--link",3,"click","href"],["src","/icons/youtube.svg","alt","","aria-hidden","true",1,"footer-icon"],["mat-icon-button","",1,"footer-action","footer-action--btn",3,"click","disabled"],["src","/icons/clementine_addmore.png","alt","","aria-hidden","true",1,"footer-icon"]],template:function(e,i){e&1&&(h(0,"div",0)(1,"div",1),G(2,Mk,1,2,"img",2)(3,Sk,3,0,"div",3),G(4,Tk,3,1,"button",4),g(),h(5,"div",5)(6,"span",6),E(7),g(),h(8,"span",7),E(9),g(),h(10,"span",8),E(11),g()(),h(12,"div",9),G(13,Ak,4,2,"a",10),G(14,kk,2,2,"button",11),g()()),e&2&&(V("tile--local",i.suggestion().inLocalLibrary)("tile--discovery",!i.suggestion().inLocalLibrary&&!i.clementineUnavailable()),y(2),W(i.hasArt()?2:3),y(2),W(i.suggestion().inLocalLibrary?4:-1),y(3),ue(i.suggestion().title),y(2),ue(i.suggestion().artist),y(),St("visibility",i.suggestion().album?"visible":"hidden"),y(),Tt(" ",i.suggestion().album||"\xA0"," "),y(2),W(i.suggestion().inLocalLibrary?-1:13),y(),W(i.suggestion().inLocalLibrary&&!i.clementineUnavailable()?14:-1))},dependencies:[_n,vn,Nn,io],styles:[".tile[_ngcontent-%COMP%]{width:100%;height:100%;display:flex;flex-direction:column;border-radius:10px;overflow:hidden;background:var(--reco-surface-1);border:2px solid var(--reco-accent);transition:transform .18s ease,box-shadow .18s ease;cursor:default}.tile--local[_ngcontent-%COMP%]{box-shadow:0 0 0 0 var(--reco-accent-dim)}.tile--discovery[_ngcontent-%COMP%]{border-color:#c8006b47;box-shadow:0 0 0 0 var(--reco-accent-dim)}.tile--discovery[_ngcontent-%COMP%]   .tile-art[_ngcontent-%COMP%], .tile--discovery[_ngcontent-%COMP%]   .tile-info[_ngcontent-%COMP%]{opacity:.22}.tile[_ngcontent-%COMP%]:hover{transform:translateY(-3px);box-shadow:0 6px 20px var(--reco-accent-dim)}.tile[_ngcontent-%COMP%]:hover   .art-overlay-btn[_ngcontent-%COMP%]{opacity:1}.tile-art[_ngcontent-%COMP%]{position:relative;width:100%;aspect-ratio:1;overflow:hidden;background:var(--reco-surface-2);flex-shrink:0}.art-img[_ngcontent-%COMP%]{width:100%;height:100%;object-fit:cover;display:block}.art-placeholder[_ngcontent-%COMP%]{width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:var(--reco-text-disabled)}.art-placeholder[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:48px;width:48px;height:48px}.art-overlay-btn[_ngcontent-%COMP%]{position:absolute;bottom:4px;left:4px;width:28px;height:28px;border-radius:6px;background:#0000008c;color:var(--reco-accent);opacity:0;transition:opacity .15s ease;--mdc-icon-button-icon-size: 14px;--mdc-icon-button-state-layer-size: 28px}.art-overlay-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:14px;width:14px;height:14px}.tile-info[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:column;gap:2px;padding:8px 10px 4px;min-height:0}.tile-title[_ngcontent-%COMP%]{font-family:var(--reco-font);font-size:.8rem;font-weight:600;color:var(--reco-accent);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.tile-artist[_ngcontent-%COMP%]{font-family:var(--reco-font);font-size:.72rem;color:var(--reco-text-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.tile-album[_ngcontent-%COMP%]{font-family:var(--reco-font);font-size:.68rem;color:var(--reco-text-disabled);font-style:italic;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.tile-footer[_ngcontent-%COMP%]{display:flex;align-items:center;padding:2px 6px 6px;min-height:32px}.footer-action[_ngcontent-%COMP%]{display:flex;align-items:center;gap:4px;font-family:var(--reco-font);font-size:.68rem;font-weight:500;opacity:.6;transition:opacity .15s ease;text-decoration:none}.footer-action[_ngcontent-%COMP%]:hover{opacity:1}.footer-action--link[_ngcontent-%COMP%]{color:var(--reco-text-muted)}.footer-action--btn[_ngcontent-%COMP%]{color:var(--reco-accent);--mdc-icon-button-icon-size: 16px;--mdc-icon-button-state-layer-size: 28px}.footer-action--btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:16px;width:16px;height:16px}.footer-action--btn[disabled][_ngcontent-%COMP%]{opacity:.25}.footer-icon[_ngcontent-%COMP%]{width:16px;height:16px;flex-shrink:0}"]})};var Rk=(t,n)=>n.title+n.artist;function Nk(t,n){t&1&&(h(0,"div",4),J(1,"span")(2,"span")(3,"span")(4,"span"),g())}function Ok(t,n){if(t&1){let e=Ue();h(0,"button",9),H("click",function(){we(e);let o=x();return xe(o.addAllToClementine())}),J(1,"img",10),E(2),g()}if(t&2){let e=x();Q("disabled",e.addingAll()),Z("aria-label","Add all "+e.localFilePaths().length+" local tracks to Clementine playlist"),y(2),Tt(" Add ",e.localFilePaths().length," to Clementine ")}}function Fk(t,n){if(t&1&&(h(0,"div",6)(1,"span"),E(2),g()()),t&2){let e=x();y(2),ue(e.loadingLabel())}}function Pk(t,n){t&1&&(h(0,"div",7)(1,"mat-icon",2),E(2,"warning_amber"),g(),h(3,"span"),E(4,"Suggestions unavailable right now."),g()())}function Lk(t,n){if(t&1&&(h(0,"div",8)(1,"mat-icon",2),E(2,"search_off"),g(),h(3,"span"),E(4),g()()),t&2){let e=x();y(4),ue(e.message())}}function Vk(t,n){if(t&1&&(h(0,"div",12),J(1,"app-suggestion-card",14),g()),t&2){let e=n.$implicit,i=x(2);y(),Q("suggestion",e)("clementineUnavailable",i.clementineUnavailable())}}function Bk(t,n){if(t&1&&(h(0,"p",13),E(1),g()),t&2){let e=x(2);y(),ue(e.message())}}function jk(t,n){if(t&1&&(h(0,"div",11),dn(1,Vk,2,2,"div",12,Rk),g(),G(3,Bk,2,1,"p",13)),t&2){let e=x();y(),un(e.suggestions()),y(2),W(e.message()?3:-1)}}var yd=class t{constructor(n,e,i){this.playlistService=n;this.snackBar=e;this.sessionService=i}suggestions=kt([]);loading=kt(!1);error=kt(!1);message=kt(null);loadingLabel=kt("Searching your library\u2026");clementineUnavailable=kt(!1);addingAll=N(!1);localTracks=Ie(()=>this.suggestions().filter(n=>n.inLocalLibrary&&n.filePath));localFilePaths=Ie(()=>this.localTracks().map(n=>n.filePath));addAllToClementine(){let n=this.localTracks(),e=this.localFilePaths();if(e.length===0||this.addingAll())return;this.addingAll.set(!0);let i=Date.now(),o=()=>{let r=Date.now()-i;setTimeout(()=>this.addingAll.set(!1),Math.max(0,1e3-r))};this.playlistService.addToPlaylist(e).subscribe({next:()=>{this.snackBar.open(`Added ${e.length} track(s) to Clementine`,void 0,{duration:2500});for(let r of n)this.sessionService.logTrackEvent("track-added",r.artist,r.album??null,r.title,r.durationSeconds??null).subscribe({error:()=>{}});o()},error:()=>{this.snackBar.open("Could not add tracks to Clementine","Dismiss",{duration:4e3}),o()}})}static \u0275fac=function(e){return new(e||t)(Y(_r),Y(vd),Y(ci))};static \u0275cmp=j({type:t,selectors:[["app-suggestions-panel"]],inputs:{suggestions:[1,"suggestions"],loading:[1,"loading"],error:[1,"error"],message:[1,"message"],loadingLabel:[1,"loadingLabel"],clementineUnavailable:[1,"clementineUnavailable"]},decls:12,vars:3,consts:[["aria-label","Track suggestions",1,"suggestions-panel"],[1,"panel-header"],["aria-hidden","true"],[1,"panel-title"],["role","status","aria-label","Loading suggestions",1,"music-bars"],["mat-stroked-button","",1,"add-all-btn",3,"disabled"],["aria-live","polite",1,"panel-state","panel-state--loading"],["role","alert",1,"panel-state","panel-state--error"],[1,"panel-state","panel-state--empty"],["mat-stroked-button","",1,"add-all-btn",3,"click","disabled"],["src","/icons/clementine_addmore.png","alt","","aria-hidden","true",1,"add-all-icon"],["role","list",1,"track-list"],["role","listitem"],[1,"panel-note"],[3,"suggestion","clementineUnavailable"]],template:function(e,i){e&1&&(h(0,"section",0)(1,"div",1)(2,"mat-icon",2),E(3,"queue_music"),g(),h(4,"span",3),E(5,"What I hear in your words"),g(),G(6,Nk,5,0,"div",4),G(7,Ok,3,3,"button",5),g(),G(8,Fk,3,1,"div",6)(9,Pk,5,0,"div",7)(10,Lk,5,1,"div",8)(11,jk,4,1),g()),e&2&&(y(6),W(i.loading()?6:-1),y(),W(!i.clementineUnavailable()&&i.localFilePaths().length>0?7:-1),y(),W(i.loading()&&i.suggestions().length===0?8:i.error()?9:i.suggestions().length===0&&i.message()?10:i.suggestions().length>0?11:-1))},dependencies:[_n,vn,Nn,rr,_d],styles:["[_nghost-%COMP%]{display:block;background:var(--reco-surface-0);flex-shrink:0}.suggestions-panel[_ngcontent-%COMP%]{padding:12px 16px 14px}.panel-header[_ngcontent-%COMP%]{display:flex;align-items:center;gap:6px;margin-bottom:12px;color:var(--reco-text-muted);font-family:var(--reco-font);font-size:.72rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase}.panel-title[_ngcontent-%COMP%]{flex:1}.music-bars[_ngcontent-%COMP%]{display:inline-flex;align-items:flex-end;gap:2px;height:14px;margin-left:4px}.music-bars[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{display:block;width:3px;background:var(--reco-accent);border-radius:1px;animation:_ngcontent-%COMP%_bar-dance .9s ease-in-out infinite}.music-bars[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(1){animation-delay:0s}.music-bars[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(2){animation-delay:.2s}.music-bars[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(3){animation-delay:.4s}.music-bars[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(4){animation-delay:.6s}@keyframes _ngcontent-%COMP%_bar-dance{0%,to{height:3px}50%{height:14px}}.add-all-btn[_ngcontent-%COMP%]{--mat-button-outlined-label-text-color: var(--reco-accent);--mat-button-outlined-outline-color: var(--reco-accent);font-family:var(--reco-font);font-size:.72rem;font-weight:500;height:28px;line-height:28px;padding:0 10px;color:var(--reco-accent);border-color:var(--reco-accent)!important}.add-all-btn[_ngcontent-%COMP%]   .add-all-icon[_ngcontent-%COMP%]{width:15px;height:15px;margin-right:4px;flex-shrink:0;vertical-align:middle}.add-all-btn[disabled][_ngcontent-%COMP%]{opacity:.4}.panel-state[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;padding:10px 4px;font-family:var(--reco-font);font-size:.875rem;color:var(--reco-text-muted)}.panel-state--error[_ngcontent-%COMP%]{color:var(--reco-error)}.panel-state--loading[_ngcontent-%COMP%]{font-style:italic;color:var(--reco-primary)}.track-list[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px}.panel-note[_ngcontent-%COMP%]{margin:10px 4px 0;font-family:var(--reco-font);font-size:.72rem;font-style:italic;color:var(--reco-text-muted)}"]})};var Hk=["mat-menu-item",""],Uk=[[["mat-icon"],["","matMenuItemIcon",""]],"*"],zk=["mat-icon, [matMenuItemIcon]","*"];function $k(t,n){t&1&&(Bi(),h(0,"svg",2),J(1,"polygon",3),g())}var Gk=["*"];function Wk(t,n){if(t&1){let e=Ue();ot(0,"div",0),$o("click",function(){we(e);let o=x();return xe(o.closed.emit("click"))})("animationstart",function(o){we(e);let r=x();return xe(r._onAnimationStart(o.animationName))})("animationend",function(o){we(e);let r=x();return xe(r._onAnimationDone(o.animationName))})("animationcancel",function(o){we(e);let r=x();return xe(r._onAnimationDone(o.animationName))}),ot(1,"div",1),me(2),_t()()}if(t&2){let e=x();Jt(e._classList),V("mat-menu-panel-animations-disabled",e._animationsDisabled)("mat-menu-panel-exit-animation",e._panelAnimationState==="void")("mat-menu-panel-animating",e._isAnimating()),Qt("id",e.panelId),Z("aria-label",e.ariaLabel||null)("aria-labelledby",e.ariaLabelledby||null)("aria-describedby",e.ariaDescribedby||null)}}var oh=new _("MAT_MENU_PANEL"),Qs=(()=>{class t{_elementRef=u(B);_document=u(k);_focusMonitor=u(Ot);_parentMenu=u(oh,{optional:!0});_changeDetectorRef=u(We);role="menuitem";disabled=!1;disableRipple=!1;_hovered=new C;_focused=new C;_highlighted=!1;_triggersSubmenu=!1;constructor(){u(qe).load(ir),this._parentMenu?.addItem?.(this)}focus(e,i){this._focusMonitor&&e?this._focusMonitor.focusVia(this._getHostElement(),e,i):this._getHostElement().focus(i),this._focused.next(this)}ngAfterViewInit(){this._focusMonitor&&this._focusMonitor.monitor(this._elementRef,!1)}ngOnDestroy(){this._focusMonitor&&this._focusMonitor.stopMonitoring(this._elementRef),this._parentMenu&&this._parentMenu.removeItem&&this._parentMenu.removeItem(this),this._hovered.complete(),this._focused.complete()}_getTabIndex(){return this.disabled?"-1":"0"}_getHostElement(){return this._elementRef.nativeElement}_checkDisabled(e){this.disabled&&(e.preventDefault(),e.stopPropagation())}_handleMouseEnter(){this._hovered.next(this)}getLabel(){let e=this._elementRef.nativeElement.cloneNode(!0),i=e.querySelectorAll("mat-icon, .material-icons");for(let o=0;o<i.length;o++)i[o].remove();return e.textContent?.trim()||""}_setHighlighted(e){this._highlighted=e,this._changeDetectorRef.markForCheck()}_setTriggersSubmenu(e){this._triggersSubmenu=e,this._changeDetectorRef.markForCheck()}_hasFocus(){return this._document&&this._document.activeElement===this._getHostElement()}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=j({type:t,selectors:[["","mat-menu-item",""]],hostAttrs:[1,"mat-mdc-menu-item","mat-focus-indicator"],hostVars:8,hostBindings:function(i,o){i&1&&H("click",function(s){return o._checkDisabled(s)})("mouseenter",function(){return o._handleMouseEnter()}),i&2&&(Z("role",o.role)("tabindex",o._getTabIndex())("aria-disabled",o.disabled)("disabled",o.disabled||null),V("mat-mdc-menu-item-highlighted",o._highlighted)("mat-mdc-menu-item-submenu-trigger",o._triggersSubmenu))},inputs:{role:"role",disabled:[2,"disabled","disabled",ce],disableRipple:[2,"disableRipple","disableRipple",ce]},exportAs:["matMenuItem"],attrs:Hk,ngContentSelectors:zk,decls:5,vars:3,consts:[[1,"mat-mdc-menu-item-text"],["matRipple","",1,"mat-mdc-menu-ripple",3,"matRippleDisabled","matRippleTrigger"],["viewBox","0 0 5 10","focusable","false","aria-hidden","true",1,"mat-mdc-menu-submenu-icon"],["points","0,0 5,5 0,10"]],template:function(i,o){i&1&&(Ye(Uk),me(0),h(1,"span",0),me(2,1),g(),J(3,"div",1),G(4,$k,2,0,":svg:svg",2)),i&2&&(y(3),Q("matRippleDisabled",o.disableRipple||o.disabled)("matRippleTrigger",o._getHostElement()),y(),W(o._triggersSubmenu?4:-1))},dependencies:[Nc],encapsulation:2,changeDetection:0})}return t})();var qk=new _("MatMenuContent");var Yk=new _("mat-menu-default-options",{providedIn:"root",factory:()=>({overlapTrigger:!1,xPosition:"after",yPosition:"below",backdropClass:"cdk-overlay-transparent-backdrop"})}),ih="_mat-menu-enter",bd="_mat-menu-exit",br=(()=>{class t{_elementRef=u(B);_changeDetectorRef=u(We);_injector=u(F);_keyManager;_xPosition;_yPosition;_firstItemFocusRef;_exitFallbackTimeout;_animationsDisabled=Ee();_allItems;_directDescendantItems=new In;_classList={};_panelAnimationState="void";_animationDone=new C;_isAnimating=N(!1);parentMenu;direction;overlayPanelClass;backdropClass;ariaLabel;ariaLabelledby;ariaDescribedby;get xPosition(){return this._xPosition}set xPosition(e){this._xPosition=e,this.setPositionClasses()}get yPosition(){return this._yPosition}set yPosition(e){this._yPosition=e,this.setPositionClasses()}templateRef;items;lazyContent;overlapTrigger=!1;hasBackdrop;set panelClass(e){let i=this._previousPanelClass,o=D({},this._classList);i&&i.length&&i.split(" ").forEach(r=>{o[r]=!1}),this._previousPanelClass=e,e&&e.length&&(e.split(" ").forEach(r=>{o[r]=!0}),this._elementRef.nativeElement.className=""),this._classList=o}_previousPanelClass;get classList(){return this.panelClass}set classList(e){this.panelClass=e}closed=new se;close=this.closed;panelId=u(ke).getId("mat-menu-panel-");constructor(){let e=u(Yk);this.overlayPanelClass=e.overlayPanelClass||"",this._xPosition=e.xPosition,this._yPosition=e.yPosition,this.backdropClass=e.backdropClass,this.overlapTrigger=e.overlapTrigger,this.hasBackdrop=e.hasBackdrop}ngOnInit(){this.setPositionClasses()}ngAfterContentInit(){this._updateDirectDescendants(),this._keyManager=new Ns(this._directDescendantItems).withWrap().withTypeAhead().withHomeAndEnd(),this._keyManager.tabOut.subscribe(()=>this.closed.emit("tab")),this._directDescendantItems.changes.pipe(st(this._directDescendantItems),Di(e=>yn(...e.map(i=>i._focused)))).subscribe(e=>this._keyManager.updateActiveItem(e)),this._directDescendantItems.changes.subscribe(e=>{let i=this._keyManager;if(this._panelAnimationState==="enter"&&i.activeItem?._hasFocus()){let o=e.toArray(),r=Math.max(0,Math.min(o.length-1,i.activeItemIndex||0));o[r]&&!o[r].disabled?i.setActiveItem(r):i.setNextItemActive()}})}ngOnDestroy(){this._keyManager?.destroy(),this._directDescendantItems.destroy(),this.closed.complete(),this._firstItemFocusRef?.destroy(),clearTimeout(this._exitFallbackTimeout)}_hovered(){return this._directDescendantItems.changes.pipe(st(this._directDescendantItems),Di(i=>yn(...i.map(o=>o._hovered))))}addItem(e){}removeItem(e){}_handleKeydown(e){let i=e.keyCode,o=this._keyManager;switch(i){case 27:Ft(e)||(e.preventDefault(),this.closed.emit("keydown"));break;case 37:this.parentMenu&&this.direction==="ltr"&&this.closed.emit("keydown");break;case 39:this.parentMenu&&this.direction==="rtl"&&this.closed.emit("keydown");break;default:(i===38||i===40)&&o.setFocusOrigin("keyboard"),o.onKeydown(e);return}}focusFirstItem(e="program"){this._firstItemFocusRef?.destroy(),this._firstItemFocusRef=Ge(()=>{let i=this._resolvePanel();if(!i||!i.contains(document.activeElement)){let o=this._keyManager;o.setFocusOrigin(e).setFirstItemActive(),!o.activeItem&&i&&i.focus()}},{injector:this._injector})}resetActiveItem(){this._keyManager.setActiveItem(-1)}setElevation(e){}setPositionClasses(e=this.xPosition,i=this.yPosition){this._classList=ee(D({},this._classList),{"mat-menu-before":e==="before","mat-menu-after":e==="after","mat-menu-above":i==="above","mat-menu-below":i==="below"}),this._changeDetectorRef.markForCheck()}_onAnimationDone(e){let i=e===bd;(i||e===ih)&&(i&&(clearTimeout(this._exitFallbackTimeout),this._exitFallbackTimeout=void 0),this._animationDone.next(i?"void":"enter"),this._isAnimating.set(!1))}_onAnimationStart(e){(e===ih||e===bd)&&this._isAnimating.set(!0)}_setIsOpen(e){if(this._panelAnimationState=e?"enter":"void",e){if(this._keyManager.activeItemIndex===0){let i=this._resolvePanel();i&&(i.scrollTop=0)}}else this._animationsDisabled||(this._exitFallbackTimeout=setTimeout(()=>this._onAnimationDone(bd),200));this._animationsDisabled&&setTimeout(()=>{this._onAnimationDone(e?ih:bd)}),this._changeDetectorRef.markForCheck()}_updateDirectDescendants(){this._allItems.changes.pipe(st(this._allItems)).subscribe(e=>{this._directDescendantItems.reset(e.filter(i=>i._parentMenu===this)),this._directDescendantItems.notifyOnChanges()})}_resolvePanel(){let e=null;return this._directDescendantItems.length&&(e=this._directDescendantItems.first._getHostElement().closest('[role="menu"]')),e}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=j({type:t,selectors:[["mat-menu"]],contentQueries:function(i,o,r){if(i&1&&Xn(r,qk,5)(r,Qs,5)(r,Qs,4),i&2){let s;ne(s=ie())&&(o.lazyContent=s.first),ne(s=ie())&&(o._allItems=s),ne(s=ie())&&(o.items=s)}},viewQuery:function(i,o){if(i&1&&Pe(it,5),i&2){let r;ne(r=ie())&&(o.templateRef=r.first)}},hostVars:3,hostBindings:function(i,o){i&2&&Z("aria-label",null)("aria-labelledby",null)("aria-describedby",null)},inputs:{backdropClass:"backdropClass",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[0,"aria-describedby","ariaDescribedby"],xPosition:"xPosition",yPosition:"yPosition",overlapTrigger:[2,"overlapTrigger","overlapTrigger",ce],hasBackdrop:[2,"hasBackdrop","hasBackdrop",e=>e==null?null:ce(e)],panelClass:[0,"class","panelClass"],classList:"classList"},outputs:{closed:"closed",close:"close"},exportAs:["matMenu"],features:[Ze([{provide:oh,useExisting:t}])],ngContentSelectors:Gk,decls:1,vars:0,consts:[["tabindex","-1","role","menu",1,"mat-mdc-menu-panel",3,"click","animationstart","animationend","animationcancel","id"],[1,"mat-mdc-menu-content"]],template:function(i,o){i&1&&(Ye(),Jl(0,Wk,3,12,"ng-template"))},styles:[`mat-menu {
  display: none;
}

.mat-mdc-menu-content {
  margin: 0;
  padding: 8px 0;
  outline: 0;
}
.mat-mdc-menu-content,
.mat-mdc-menu-content .mat-mdc-menu-item .mat-mdc-menu-item-text {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  flex: 1;
  white-space: normal;
  font-family: var(--mat-menu-item-label-text-font, var(--mat-sys-label-large-font));
  line-height: var(--mat-menu-item-label-text-line-height, var(--mat-sys-label-large-line-height));
  font-size: var(--mat-menu-item-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-menu-item-label-text-tracking, var(--mat-sys-label-large-tracking));
  font-weight: var(--mat-menu-item-label-text-weight, var(--mat-sys-label-large-weight));
}

@keyframes _mat-menu-enter {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes _mat-menu-exit {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.mat-mdc-menu-panel {
  min-width: 112px;
  max-width: 280px;
  overflow: auto;
  box-sizing: border-box;
  outline: 0;
  animation: _mat-menu-enter 120ms cubic-bezier(0, 0, 0.2, 1);
  border-radius: var(--mat-menu-container-shape, var(--mat-sys-corner-extra-small));
  background-color: var(--mat-menu-container-color, var(--mat-sys-surface-container));
  box-shadow: var(--mat-menu-container-elevation-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12));
  will-change: transform, opacity;
}
.mat-mdc-menu-panel.mat-menu-panel-exit-animation {
  animation: _mat-menu-exit 100ms 25ms linear forwards;
}
.mat-mdc-menu-panel.mat-menu-panel-animations-disabled {
  animation: none;
}
.mat-mdc-menu-panel.mat-menu-panel-animating {
  pointer-events: none;
}
.mat-mdc-menu-panel.mat-menu-panel-animating:has(.mat-mdc-menu-content:empty) {
  display: none;
}
@media (forced-colors: active) {
  .mat-mdc-menu-panel {
    outline: solid 1px;
  }
}
.mat-mdc-menu-panel .mat-divider {
  border-top-color: var(--mat-menu-divider-color, var(--mat-sys-surface-variant));
  margin-bottom: var(--mat-menu-divider-bottom-spacing, 8px);
  margin-top: var(--mat-menu-divider-top-spacing, 8px);
}

.mat-mdc-menu-item {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  padding: 0;
  cursor: pointer;
  width: 100%;
  text-align: left;
  box-sizing: border-box;
  color: inherit;
  font-size: inherit;
  background: none;
  text-decoration: none;
  margin: 0;
  min-height: 48px;
  padding-left: var(--mat-menu-item-leading-spacing, 12px);
  padding-right: var(--mat-menu-item-trailing-spacing, 12px);
  -webkit-user-select: none;
  user-select: none;
  cursor: pointer;
  outline: none;
  border: none;
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-menu-item::-moz-focus-inner {
  border: 0;
}
[dir=rtl] .mat-mdc-menu-item {
  padding-left: var(--mat-menu-item-trailing-spacing, 12px);
  padding-right: var(--mat-menu-item-leading-spacing, 12px);
}
.mat-mdc-menu-item:has(.material-icons, mat-icon, [matButtonIcon]) {
  padding-left: var(--mat-menu-item-with-icon-leading-spacing, 12px);
  padding-right: var(--mat-menu-item-with-icon-trailing-spacing, 12px);
}
[dir=rtl] .mat-mdc-menu-item:has(.material-icons, mat-icon, [matButtonIcon]) {
  padding-left: var(--mat-menu-item-with-icon-trailing-spacing, 12px);
  padding-right: var(--mat-menu-item-with-icon-leading-spacing, 12px);
}
.mat-mdc-menu-item, .mat-mdc-menu-item:visited, .mat-mdc-menu-item:link {
  color: var(--mat-menu-item-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-menu-item .mat-icon-no-color,
.mat-mdc-menu-item .mat-mdc-menu-submenu-icon {
  color: var(--mat-menu-item-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-menu-item[disabled] {
  cursor: default;
  opacity: 0.38;
}
.mat-mdc-menu-item[disabled]::after {
  display: block;
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.mat-mdc-menu-item:focus {
  outline: 0;
}
.mat-mdc-menu-item .mat-icon {
  flex-shrink: 0;
  margin-right: var(--mat-menu-item-spacing, 12px);
  height: var(--mat-menu-item-icon-size, 24px);
  width: var(--mat-menu-item-icon-size, 24px);
}
[dir=rtl] .mat-mdc-menu-item {
  text-align: right;
}
[dir=rtl] .mat-mdc-menu-item .mat-icon {
  margin-right: 0;
  margin-left: var(--mat-menu-item-spacing, 12px);
}
.mat-mdc-menu-item:not([disabled]):hover {
  background-color: var(--mat-menu-item-hover-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-hover-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-menu-item:not([disabled]).cdk-program-focused, .mat-mdc-menu-item:not([disabled]).cdk-keyboard-focused, .mat-mdc-menu-item:not([disabled]).mat-mdc-menu-item-highlighted {
  background-color: var(--mat-menu-item-focus-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-focus-state-layer-opacity) * 100%), transparent));
}
@media (forced-colors: active) {
  .mat-mdc-menu-item {
    margin-top: 1px;
  }
}

.mat-mdc-menu-submenu-icon {
  width: var(--mat-menu-item-icon-size, 24px);
  height: 10px;
  fill: currentColor;
  padding-left: var(--mat-menu-item-spacing, 12px);
}
[dir=rtl] .mat-mdc-menu-submenu-icon {
  padding-right: var(--mat-menu-item-spacing, 12px);
  padding-left: 0;
}
[dir=rtl] .mat-mdc-menu-submenu-icon polygon {
  transform: scaleX(-1);
  transform-origin: center;
}
@media (forced-colors: active) {
  .mat-mdc-menu-submenu-icon {
    fill: CanvasText;
  }
}

.mat-mdc-menu-item .mat-mdc-menu-ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
}
`],encapsulation:2,changeDetection:0})}return t})(),Zk=new _("mat-menu-scroll-strategy",{providedIn:"root",factory:()=>{let t=u(F);return()=>fr(t)}});var yr=new WeakMap,Kk=(()=>{class t{_canHaveBackdrop;_element=u(B);_viewContainerRef=u(lt);_menuItemInstance=u(Qs,{optional:!0,self:!0});_dir=u(Je,{optional:!0});_focusMonitor=u(Ot);_ngZone=u(S);_injector=u(F);_scrollStrategy=u(Zk);_changeDetectorRef=u(We);_animationsDisabled=Ee();_portal;_overlayRef=null;_menuOpen=!1;_closingActionsSubscription=de.EMPTY;_menuCloseSubscription=de.EMPTY;_pendingRemoval;_parentMaterialMenu;_parentInnerPadding;_openedBy=void 0;get _menu(){return this._menuInternal}set _menu(e){e!==this._menuInternal&&(this._menuInternal=e,this._menuCloseSubscription.unsubscribe(),e&&(this._parentMaterialMenu,this._menuCloseSubscription=e.close.subscribe(i=>{this._destroyMenu(i),(i==="click"||i==="tab")&&this._parentMaterialMenu&&this._parentMaterialMenu.closed.emit(i)})),this._menuItemInstance?._setTriggersSubmenu(this._triggersSubmenu()))}_menuInternal=null;constructor(e){this._canHaveBackdrop=e;let i=u(oh,{optional:!0});this._parentMaterialMenu=i instanceof br?i:void 0}ngOnDestroy(){this._menu&&this._ownsMenu(this._menu)&&yr.delete(this._menu),this._pendingRemoval?.unsubscribe(),this._menuCloseSubscription.unsubscribe(),this._closingActionsSubscription.unsubscribe(),this._overlayRef&&(this._overlayRef.dispose(),this._overlayRef=null)}get menuOpen(){return this._menuOpen}get dir(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}_triggersSubmenu(){return!!(this._menuItemInstance&&this._parentMaterialMenu&&this._menu)}_closeMenu(){this._menu?.close.emit()}_openMenu(e){if(this._triggerIsAriaDisabled())return;let i=this._menu;if(this._menuOpen||!i)return;this._pendingRemoval?.unsubscribe();let o=yr.get(i);yr.set(i,this),o&&o!==this&&o._closeMenu();let r=this._createOverlay(i),s=r.getConfig(),a=s.positionStrategy;this._setPosition(i,a),this._canHaveBackdrop?s.hasBackdrop=i.hasBackdrop==null?!this._triggersSubmenu():i.hasBackdrop:s.hasBackdrop=i.hasBackdrop??!1,r.hasAttached()||(r.attach(this._getPortal(i)),i.lazyContent?.attach(this.menuData)),this._closingActionsSubscription=this._menuClosingActions().subscribe(()=>this._closeMenu()),i.parentMenu=this._triggersSubmenu()?this._parentMaterialMenu:void 0,i.direction=this.dir,e&&i.focusFirstItem(this._openedBy||"program"),this._setIsMenuOpen(!0),i instanceof br&&(i._setIsOpen(!0),i._directDescendantItems.changes.pipe(Se(i.close)).subscribe(()=>{a.withLockedPosition(!1).reapplyLastPosition(),a.withLockedPosition(!0)}))}focus(e,i){this._focusMonitor&&e?this._focusMonitor.focusVia(this._element,e,i):this._element.nativeElement.focus(i)}_destroyMenu(e){let i=this._overlayRef,o=this._menu;!i||!this.menuOpen||(this._closingActionsSubscription.unsubscribe(),this._pendingRemoval?.unsubscribe(),o instanceof br&&this._ownsMenu(o)?(this._pendingRemoval=o._animationDone.pipe(pt(1)).subscribe(()=>{i.detach(),yr.has(o)||o.lazyContent?.detach()}),o._setIsOpen(!1)):(i.detach(),o?.lazyContent?.detach()),o&&this._ownsMenu(o)&&yr.delete(o),this.restoreFocus&&(e==="keydown"||!this._openedBy||!this._triggersSubmenu())&&this.focus(this._openedBy),this._openedBy=void 0,this._setIsMenuOpen(!1))}_setIsMenuOpen(e){e!==this._menuOpen&&(this._menuOpen=e,this._menuOpen?this.menuOpened.emit():this.menuClosed.emit(),this._triggersSubmenu()&&this._menuItemInstance._setHighlighted(e),this._changeDetectorRef.markForCheck())}_createOverlay(e){if(!this._overlayRef){let i=this._getOverlayConfig(e);this._subscribeToPositions(e,i.positionStrategy),this._overlayRef=hn(this._injector,i),this._overlayRef.keydownEvents().subscribe(o=>{this._menu instanceof br&&this._menu._handleKeydown(o)})}return this._overlayRef}_getOverlayConfig(e){return new pn({positionStrategy:mr(this._injector,this._getOverlayOrigin()).withLockedPosition().withGrowAfterOpen().withTransformOriginOn(".mat-menu-panel, .mat-mdc-menu-panel"),backdropClass:e.backdropClass||"cdk-overlay-transparent-backdrop",panelClass:e.overlayPanelClass,scrollStrategy:this._scrollStrategy(),direction:this._dir||"ltr",disableAnimations:this._animationsDisabled})}_subscribeToPositions(e,i){e.setPositionClasses&&i.positionChanges.subscribe(o=>{this._ngZone.run(()=>{let r=o.connectionPair.overlayX==="start"?"after":"before",s=o.connectionPair.overlayY==="top"?"below":"above";e.setPositionClasses(r,s)})})}_setPosition(e,i){let[o,r]=e.xPosition==="before"?["end","start"]:["start","end"],[s,a]=e.yPosition==="above"?["bottom","top"]:["top","bottom"],[l,c]=[s,a],[d,f]=[o,r],p=0;if(this._triggersSubmenu()){if(f=o=e.xPosition==="before"?"start":"end",r=d=o==="end"?"start":"end",this._parentMaterialMenu){if(this._parentInnerPadding==null){let m=this._parentMaterialMenu.items.first;this._parentInnerPadding=m?m._getHostElement().offsetTop:0}p=s==="bottom"?this._parentInnerPadding:-this._parentInnerPadding}}else e.overlapTrigger||(l=s==="top"?"bottom":"top",c=a==="top"?"bottom":"top");i.withPositions([{originX:o,originY:l,overlayX:d,overlayY:s,offsetY:p},{originX:r,originY:l,overlayX:f,overlayY:s,offsetY:p},{originX:o,originY:c,overlayX:d,overlayY:a,offsetY:-p},{originX:r,originY:c,overlayX:f,overlayY:a,offsetY:-p}])}_menuClosingActions(){let e=this._getOutsideClickStream(this._overlayRef),i=this._overlayRef.detachments(),o=this._parentMaterialMenu?this._parentMaterialMenu.closed:Ve(),r=this._parentMaterialMenu?this._parentMaterialMenu._hovered().pipe(Me(s=>this._menuOpen&&s!==this._menuItemInstance)):Ve();return yn(e,o,r,i)}_getPortal(e){return(!this._portal||this._portal.templateRef!==e.templateRef)&&(this._portal=new mn(e.templateRef,this._viewContainerRef)),this._portal}_ownsMenu(e){return yr.get(e)===this}_triggerIsAriaDisabled(){return ce(this._element.nativeElement.getAttribute("aria-disabled"))}static \u0275fac=function(i){_m()};static \u0275dir=L({type:t})}return t})(),MC=(()=>{class t extends Kk{_cleanupTouchstart;_hoverSubscription=de.EMPTY;get _deprecatedMatMenuTriggerFor(){return this.menu}set _deprecatedMatMenuTriggerFor(e){this.menu=e}get menu(){return this._menu}set menu(e){this._menu=e}menuData;restoreFocus=!0;menuOpened=new se;onMenuOpen=this.menuOpened;menuClosed=new se;onMenuClose=this.menuClosed;constructor(){super(!0);let e=u(Ae);this._cleanupTouchstart=e.listen(this._element.nativeElement,"touchstart",i=>{Ji(i)||(this._openedBy="touch")},{passive:!0})}triggersSubmenu(){return super._triggersSubmenu()}toggleMenu(){return this.menuOpen?this.closeMenu():this.openMenu()}openMenu(){this._openMenu(!0)}closeMenu(){this._closeMenu()}updatePosition(){this._overlayRef?.updatePosition()}ngAfterContentInit(){this._handleHover()}ngOnDestroy(){super.ngOnDestroy(),this._cleanupTouchstart(),this._hoverSubscription.unsubscribe()}_getOverlayOrigin(){return this._element}_getOutsideClickStream(e){return e.backdropClick()}_handleMousedown(e){Qi(e)||(this._openedBy=e.button===0?"mouse":void 0,this.triggersSubmenu()&&e.preventDefault())}_handleKeydown(e){let i=e.keyCode;(i===13||i===32)&&(this._openedBy="keyboard"),this.triggersSubmenu()&&(i===39&&this.dir==="ltr"||i===37&&this.dir==="rtl")&&(this._openedBy="keyboard",this.openMenu())}_handleClick(e){this.triggersSubmenu()?(e.stopPropagation(),this.openMenu()):this.toggleMenu()}_handleHover(){this.triggersSubmenu()&&this._parentMaterialMenu&&(this._hoverSubscription=this._parentMaterialMenu._hovered().subscribe(e=>{e===this._menuItemInstance&&!e.disabled&&this._parentMaterialMenu?._panelAnimationState!=="void"&&(this._openedBy="mouse",this._openMenu(!1))}))}static \u0275fac=function(i){return new(i||t)};static \u0275dir=L({type:t,selectors:[["","mat-menu-trigger-for",""],["","matMenuTriggerFor",""]],hostAttrs:[1,"mat-mdc-menu-trigger"],hostVars:3,hostBindings:function(i,o){i&1&&H("click",function(s){return o._handleClick(s)})("mousedown",function(s){return o._handleMousedown(s)})("keydown",function(s){return o._handleKeydown(s)}),i&2&&Z("aria-haspopup",o.menu?"menu":null)("aria-expanded",o.menuOpen)("aria-controls",o.menuOpen?o.menu==null?null:o.menu.panelId:null)},inputs:{_deprecatedMatMenuTriggerFor:[0,"mat-menu-trigger-for","_deprecatedMatMenuTriggerFor"],menu:[0,"matMenuTriggerFor","menu"],menuData:[0,"matMenuTriggerData","menuData"],restoreFocus:[0,"matMenuTriggerRestoreFocus","restoreFocus"]},outputs:{menuOpened:"menuOpened",onMenuOpen:"onMenuOpen",menuClosed:"menuClosed",onMenuClose:"onMenuClose"},exportAs:["matMenuTrigger"],features:[he]})}return t})();var SC=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=q({type:t});static \u0275inj=z({imports:[or,gn,be,ro]})}return t})();var TC=[{value:"normal",label:"Normal"},{value:"poetic",label:"Poetic"},{value:"humorous",label:"Humorous"},{value:"cosmic",label:"Cosmic"},{value:"minimalist",label:"Minimalist"},{value:"romantic",label:"Romantic"},{value:"chaotic",label:"Chaotic"},{value:"noir",label:"Noir"},{value:"psychedelic",label:"Psychedelic"}];var Qk=(t,n)=>n.value;function Jk(t,n){if(t&1){let e=Ue();h(0,"button",7),H("click",function(){let o=we(e).$implicit,r=x();return xe(r.select(o.value))}),h(1,"mat-icon",8),E(2),g(),E(3),g()}if(t&2){let e=n.$implicit,i=x();V("mood-menu-item--active",i.currentMood()===e.value),y(2),ue(i.currentMood()===e.value?"check":""),y(),Tt(" ",e.label," ")}}var Dd=class t{currentMood=kt("normal");moodSelected=Iy();moods=TC;moodLabel=Ie(()=>{let n=this.currentMood();return n?n.charAt(0).toUpperCase()+n.slice(1):"Normal"});select(n){this.moodSelected.emit(n)}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=j({type:t,selectors:[["app-mood-picker"]],inputs:{currentMood:[1,"currentMood"]},outputs:{moodSelected:"moodSelected"},decls:11,vars:2,consts:[["picker","matMenu"],["aria-label","Change mood",1,"mood-trigger",3,"matMenuTriggerFor"],[1,"mood-trigger-label"],[1,"mood-trigger-icon"],["xPosition","before",1,"mood-menu"],[1,"mood-menu-title",3,"click"],["mat-menu-item","",1,"mood-menu-item",3,"mood-menu-item--active"],["mat-menu-item","",1,"mood-menu-item",3,"click"],[1,"mood-check"]],template:function(e,i){if(e&1&&(h(0,"button",1)(1,"span",2),E(2),g(),h(3,"mat-icon",3),E(4,"expand_circle_down"),g()(),h(5,"mat-menu",4,0)(7,"div",5),H("click",function(r){return r.stopPropagation()}),E(8,"Change my mood"),g(),dn(9,Jk,4,4,"button",6,Qk),g()),e&2){let o=fn(6);Q("matMenuTriggerFor",o),y(2),ue(i.moodLabel()),y(7),un(i.moods)}},dependencies:[_n,vn,SC,br,Qs,MC],styles:[`:host{display:inline-flex}.mood-trigger{display:inline-flex;align-items:center;gap:3px;background:none;border:none;padding:0;cursor:pointer;color:#fff9}.mood-trigger:hover{color:#fff}.mood-trigger-label{font-family:var(--reco-font);font-size:.58rem;font-weight:600;line-height:1;letter-spacing:.04em;text-transform:uppercase}.mood-trigger-icon{font-size:12px;width:12px;height:12px;line-height:1}.mood-menu{background:var(--reco-surface-1);border:1px solid var(--reco-border);border-radius:10px;min-width:160px;box-shadow:0 8px 24px #00000040}.mood-menu-title{padding:8px 14px 4px;font-family:var(--reco-font);font-size:.65rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--reco-text-muted);pointer-events:none;-webkit-user-select:none;user-select:none}.mood-menu-item{font-family:var(--reco-font);font-size:.82rem;color:var(--reco-text)}.mood-menu-item--active{color:var(--reco-accent);font-weight:600}.mood-check{font-size:14px;width:14px;height:14px;margin-right:6px;flex-shrink:0}
`],encapsulation:2})};var Cd=class t{constructor(n){this.sanitizer=n}transform(n){let i=n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>").replace(/\*\*(.+?)\*\*/gs,"<strong>$1</strong>");return this.sanitizer.bypassSecurityTrustHtml(i)}static \u0275fac=function(e){return new(e||t)(Y(Xi,16))};static \u0275pipe=Ql({name:"boldMarkdown",type:t,pure:!0})};var Ed=class t{constructor(n){this.http=n}getRecommendations(n,e="gemini",i="normal"){return this.http.post("/api/recommendations",{prompt:n,provider:e,mood:i})}static \u0275fac=function(e){return new(e||t)(M(Nt))};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})};var tR=["messageList"],nR=["promptInput"],iR=["splitContainer"];function oR(t,n){t&1&&(h(0,"div",21)(1,"mat-icon",37),E(2,"cloud"),g(),h(3,"span"),E(4,"Inner Voice unavailable \u2014 Cosmic Voice stepped in"),g()())}function rR(t,n){if(t&1&&(h(0,"p",40),E(1),g()),t&2){let e=x(2);y(),ue(e.tryLineHint())}}function sR(t,n){if(t&1&&(h(0,"div",25),J(1,"img",38),h(2,"p",39),E(3,"What does your mind sound like today?"),g(),G(4,rR,2,1,"p",40),g()),t&2){let e=x();y(4),W(e.tryLineHint()?4:-1)}}function aR(t,n){if(t&1){let e=Ue();h(0,"button",47),H("click",function(){we(e);let o=x(2).$implicit,r=x();return xe(r.activateReply(o.eventId))}),h(1,"mat-icon"),E(2,"history"),g()()}}function lR(t,n){if(t&1&&(h(0,"div",43),G(1,aR,3,0,"button",44),J(2,"div",45),Nm(3,"boldMarkdown"),h(4,"span",46),E(5),g()()),t&2){let e=x().$implicit,i=x();V("message-bubble--active",e.eventId!==void 0&&e.eventId===i.activeReplyId())("message-bubble--has-rewind",e.hasSuggestions&&e.eventId!==void 0&&e.eventId!==i.activeReplyId()),y(),W(e.hasSuggestions&&e.eventId!==void 0&&e.eventId!==i.activeReplyId()?1:-1),y(),Q("innerHTML",Om(3,7,e.text),tm),y(3),ue(i.formatMessageTime(e.timestamp))}}function cR(t,n){if(t&1){let e=Ue();h(0,"div",43)(1,"app-mood-picker",48),H("moodSelected",function(o){we(e);let r=x().$implicit,s=x();return xe(s.onMoodSelected(o,r))}),g(),h(2,"span"),E(3),g(),h(4,"span",46),E(5),g()()}if(t&2){let e=x().$implicit,i=x();y(),Q("currentMood",e.mood??"normal"),y(2),ue(e.text),y(2),ue(i.formatMessageTime(e.timestamp))}}function dR(t,n){if(t&1&&(h(0,"div",41),G(1,lR,6,9,"div",42)(2,cR,6,3,"div",43),g()),t&2){let e=n.$implicit;V("message--user",e.role==="user")("message--model",e.role==="model"),y(),W(e.role==="model"?1:2)}}function uR(t,n){if(t&1&&(h(0,"span",53),E(1),g()),t&2){let e=x(2);y(),ue(e.retryNotice())}}function fR(t,n){if(t&1&&(h(0,"div",27)(1,"div",49)(2,"div",50)(3,"mat-icon",51),E(4,"music_note"),g(),h(5,"span",52),E(6),g()(),G(7,uR,2,1,"span",53),g()()),t&2){let e=x();y(6),ue(e.loadingPhrase()),y(),W(e.retryNotice()?7:-1)}}function mR(t,n){if(t&1&&(h(0,"div",54)(1,"mat-icon",37),E(2),g(),h(3,"span"),E(4),g()()),t&2){let e=x();V("error-banner--rate-limit",e.errorIsRateLimit()),y(2),ue(e.errorIsRateLimit()?"schedule":"error_outline"),y(2),ue(e.error())}}function pR(t,n){if(t&1&&J(0,"app-suggestions-panel",35),t&2){let e=x();Q("suggestions",e.suggestions())("loading",e.suggestionsLoading())("error",e.suggestionsError())("message",e.suggestionsMessage())("loadingLabel",e.loadingPhrase())("clementineUnavailable",e.clementineUnavailable())}}function hR(t,n){if(t&1&&(h(0,"p",55),E(1),g()),t&2){let e=x(2);y(),ue(e.loadingPhrase())}}function gR(t,n){t&1&&(h(0,"p"),E(1,"This is where your mind's music will take shape."),g())}function vR(t,n){if(t&1&&(h(0,"div",36)(1,"mat-icon",37),E(2,"queue_music"),g(),G(3,hR,2,1,"p",55)(4,gR,2,0,"p"),g()),t&2){let e=x();y(3),W(e.loading()?3:4)}}var AC="reco-provider",rh=["Holding the note","Staying on the downbeat","Lingering in the intro","Looping the pre\u2011chorus","Riding the sustain pedal","Tuning up forever","Hovering on the fermata","Chilling in the green room","Stuck in soundcheck mode","Spinning the vinyl before the needle drops","Hanging on the last chord","Paused between tracks","Letting the beat simmer","Idling in the bridge","Waiting for the bass to kick in","Floating in reverb","Queued in the playlist","Stuck in the encore gap","Listening to the orchestra warm up","Waiting for the DJ to unmute"],_R=220,yR=25,wd=class t{constructor(n,e,i){this.recommendationService=n;this.sessionService=e;this.dialog=i;Gt(()=>{this.loading()?this.typewriterStart(this.randomPhrase()):this.typewriterStop()})}messageListRef;promptInputRef;containerRef;messages=N([]);prompt=N("");loading=N(!1);error=N(null);errorIsRateLimit=N(!1);suggestions=N([]);suggestionsLoading=N(!1);suggestionsError=N(!1);suggestionsMessage=N(null);hasSuggestions=N(!1);activeReplyId=N(null);retryNotice=N(null);loadingPhrase=N(rh[0]);tryLineHint=N("");provider=N(localStorage.getItem(AC)??"gemini");usedFallback=N(!1);memoryUsed=N(0);memoryTotal=N(25);memoryFill=Ie(()=>this.memoryTotal()>0?this.memoryUsed()/this.memoryTotal():0);memoryHigh=Ie(()=>this.memoryFill()>.8);splitPercent=N(40);dragging=!1;containerWidth=0;clementineUnavailable=Ie(()=>this.suggestionsMessage()?.includes("local library is currently unavailable")===!0);shouldScroll=!1;shouldFocusInput=!1;typewriterTimeout=null;fallbackTimer=null;RETRY_DELAYS=[3e3,5e3,7e3,1e4];HISTORY_LIMIT=50;promptHistory=[];historyIndex=-1;currentDraft="";isHintPreview=N(!1);async ngOnInit(){this.refreshMemory();try{let i=(await(await fetch("/trylines.txt")).text()).split(`
`).map(o=>o.trim()).filter(o=>o.length>0);i.length>0&&this.tryLineHint.set(i[Math.floor(Math.random()*i.length)])}catch{}await this.hydrate()}ngAfterViewInit(){this.focusPromptInput()}ngOnDestroy(){this.typewriterStop(),this.fallbackTimer!==null&&clearTimeout(this.fallbackTimer)}ngAfterViewChecked(){this.shouldScroll&&(this.scrollToBottom(),this.shouldScroll=!1),this.shouldFocusInput&&(this.shouldFocusInput=!1,setTimeout(()=>this.promptInputRef?.nativeElement?.focus(),0))}onDividerMousedown(n){this.dragging=!0,this.containerWidth=this.containerRef?.nativeElement?.getBoundingClientRect().width??0,n.preventDefault()}onMouseMove(n){if(!this.dragging||this.containerWidth===0)return;let e=this.containerRef.nativeElement.getBoundingClientRect(),i=(n.clientX-e.left)/this.containerWidth*100,o=(this.containerWidth-_R)/this.containerWidth*100;this.splitPercent.set(Math.min(Math.max(i,yR),o))}onMouseUp(){this.dragging=!1}setProvider(n){this.provider.set(n),localStorage.setItem(AC,n)}refreshMemory(){this.sessionService.getMemoryStatus().subscribe({next:n=>{this.memoryUsed.set(n.used),this.memoryTotal.set(n.total)},error:()=>{}})}bustMemory(){confirm("Clear all session memory? The AI will start fresh on your next question.")&&this.sessionService.bustMemory().subscribe({next:()=>{this.memoryUsed.set(0),this.refreshMemory()},error:()=>{}})}openSettings(){this.dialog.open(gd,{disableClose:!1,autoFocus:!1})}send(){let n=this.prompt().trim();!n||this.loading()||(this.promptHistory[this.promptHistory.length-1]!==n&&(this.promptHistory.push(n),this.promptHistory.length>this.HISTORY_LIMIT&&this.promptHistory.shift()),this.historyIndex=-1,this.currentDraft="",this.prompt.set(""),this._executeRequest(n,"normal"))}onMoodSelected(n,e){n!==(e.mood??"normal")&&this.resendWithMood(e.text,n)}resendWithMood(n,e){this.loading()||this._executeRequest(n,e)}_executeRequest(n,e){this.messages.update(i=>[...i,{role:"user",text:n,timestamp:new Date,mood:e}]),this.loading.set(!0),this.error.set(null),this.errorIsRateLimit.set(!1),this.retryNotice.set(null),this.usedFallback.set(!1),this.shouldScroll=!0,this.suggestionsLoading.set(!0),this.suggestionsError.set(!1),this.suggestionsMessage.set(null),this.hasSuggestions.set(!0),this.recommendationService.getRecommendations(n,this.provider(),e).pipe(Gd({count:4,delay:(i,o)=>this.isRetryableError(i)?(this.retryNotice.set(`The AI is a bit busy right now\u2026 retrying (${o}/4)`),bi(this.RETRY_DELAYS[o-1])):Ar(()=>i)})).subscribe({next:i=>{this.retryNotice.set(null),this.activeReplyId.set(i.aiReplyEventId),this.messages.update(o=>[...o,{role:"model",text:i.narrative,timestamp:new Date,eventId:i.aiReplyEventId,hasSuggestions:i.suggestions.length>0}]),this.suggestions.set(i.suggestions),this.suggestionsMessage.set(i.message),this.loading.set(!1),this.suggestionsLoading.set(!1),this.refreshMemory(),this.shouldScroll=!0,this.focusPromptInput(),i.usedFallback&&(this.usedFallback.set(!0),this.fallbackTimer!==null&&clearTimeout(this.fallbackTimer),this.fallbackTimer=setTimeout(()=>this.usedFallback.set(!1),8e3))},error:i=>{this.retryNotice.set(null);let o=i.status===429;this.errorIsRateLimit.set(o),this.error.set(i.error?.error??"Something went wrong. Please try again."),this.loading.set(!1),this.suggestionsError.set(!0),this.suggestionsLoading.set(!1),this.focusPromptInput()}})}onKeydown(n){if(n.key==="Enter"&&!n.shiftKey){n.preventDefault(),this.send();return}if(n.key==="ArrowUp"){if(this.promptHistory.length===0)return;n.preventDefault(),this.historyIndex===-1&&(this.currentDraft=this.isHintPreview()?"":this.prompt(),this.isHintPreview.set(!1)),this.historyIndex=this.historyIndex===-1?this.promptHistory.length-1:Math.max(0,this.historyIndex-1),this.prompt.set(this.promptHistory[this.historyIndex]);return}if(n.key==="ArrowDown"){if(this.historyIndex===-1)return;n.preventDefault(),this.historyIndex++,this.historyIndex>=this.promptHistory.length?(this.historyIndex=-1,this.prompt.set(this.currentDraft)):this.prompt.set(this.promptHistory[this.historyIndex]);return}}onFocus(n){!this.prompt().trim()&&this.tryLineHint()&&(this.prompt.set(this.tryLineHint()),this.isHintPreview.set(!0))}onBlur(){this.isHintPreview()&&(this.prompt.set(""),this.isHintPreview.set(!1))}updatePrompt(n){this.historyIndex=-1;let e=n.target;if(this.isHintPreview()){let o=n,r=o.inputType?.startsWith("insert")?o.data??"":"";r?(this.isHintPreview.set(!1),this.prompt.set(r),e.value=r):e.value=this.tryLineHint();return}let i=e.value;i===""&&this.tryLineHint()?(this.prompt.set(this.tryLineHint()),this.isHintPreview.set(!0)):(this.isHintPreview.set(!1),this.prompt.set(i))}formatMessageTime(n){let e=new Date,i=r=>r.toString().padStart(2,"0"),o=`${i(n.getHours())}:${i(n.getMinutes())}`;return n.toDateString()===e.toDateString()?o:`${i(n.getDate())}/${i(n.getMonth()+1)}/${n.getFullYear()} ${o}`}activateReply(n){this.activeReplyId()!==n&&(this.activeReplyId.set(n),this.hasSuggestions.set(!0),this.suggestionsLoading.set(!0),this.suggestionsError.set(!1),this.sessionService.getEnrichedSuggestions(n).subscribe({next:e=>{this.activeReplyId()===n&&(this.suggestions.set(e.suggestions),this.suggestionsMessage.set(e.message),this.suggestionsLoading.set(!1))},error:()=>{this.activeReplyId()===n&&(this.suggestionsLoading.set(!1),this.suggestionsError.set(!0))}}),this.sessionService.setActiveReply(n).subscribe({error:()=>{}}))}async hydrate(){try{let n=await Ud(this.sessionService.getHistory());if(n.turns.length===0)return;this.messages.set(n.turns.map(e=>({role:e.role,text:e.text,timestamp:new Date(e.timestamp),eventId:e.eventId,hasSuggestions:e.hasSuggestions,mood:e.mood??"normal"}))),this.activeReplyId.set(n.activeReplyId),this.shouldScroll=!0,n.activeReplyId!=null&&(this.hasSuggestions.set(!0),this.suggestionsLoading.set(!0),this.sessionService.getEnrichedSuggestions(n.activeReplyId).subscribe({next:e=>{this.suggestions.set(e.suggestions),this.suggestionsMessage.set(e.message),this.suggestionsLoading.set(!1)},error:()=>{this.suggestionsLoading.set(!1)}}))}catch{}}typewriterStart(n){this.typewriterStop(),this.typeChar(n,0)}typeChar(n,e){this.loadingPhrase.set(n.slice(0,e)),e<n.length?this.typewriterTimeout=setTimeout(()=>this.typeChar(n,e+1),45):this.typewriterTimeout=setTimeout(()=>this.typewriterStart(this.randomPhrase()),1e3)}typewriterStop(){this.typewriterTimeout!==null&&(clearTimeout(this.typewriterTimeout),this.typewriterTimeout=null)}randomPhrase(){return rh[Math.floor(Math.random()*rh.length)]}focusPromptInput(){this.shouldFocusInput=!0}isRetryableError(n){return n?.status===502}scrollToBottom(){let n=this.messageListRef?.nativeElement;n&&(n.scrollTop=n.scrollHeight)}static \u0275fac=function(e){return new(e||t)(Y(Ed),Y(ci),Y(ad))};static \u0275cmp=j({type:t,selectors:[["app-chat"]],viewQuery:function(e,i){if(e&1&&Pe(tR,5)(nR,5)(iR,5),e&2){let o;ne(o=ie())&&(i.messageListRef=o.first),ne(o=ie())&&(i.promptInputRef=o.first),ne(o=ie())&&(i.containerRef=o.first)}},hostBindings:function(e,i){e&1&&H("mousemove",function(r){return i.onMouseMove(r)},Ul)("mouseup",function(){return i.onMouseUp()},Ul)},decls:52,vars:21,consts:[["splitContainer",""],["messageList",""],["promptInput",""],[1,"page-shell"],[1,"chat-header"],["src","logo.png","alt","Reasonic",1,"header-logo"],[1,"chat-title-group"],[1,"chat-title"],[1,"chat-tagline"],["aria-label","AI provider",1,"provider-toggle",3,"change","value"],["value","inner-whisper","aria-label","Use local llama model (Inner Whisper)"],["src","/icons/llama3-logo.png","alt","","aria-hidden","true",1,"provider-icon"],["value","inner-shout","aria-label","Use local Gemma model (Inner Shout)"],["src","/icons/gemma4.png","alt","","aria-hidden","true",1,"provider-icon"],["value","gemini","aria-label","Use Gemini cloud model (Cosmic Voice)"],["src","/icons/gemini.svg","alt","","aria-hidden","true",1,"provider-icon"],["aria-label","Session memory usage",1,"memory-widget"],[1,"memory-label"],["role","progressbar",1,"memory-bar"],["mat-icon-button","","matTooltip","Clear session memory","aria-label","Clear session memory",1,"memory-bust-btn",3,"click"],["mat-icon-button","","matTooltip","Settings","aria-label","Open settings",1,"settings-btn",3,"click"],["role","status","aria-live","polite",1,"fallback-chip"],[1,"split-layout"],["aria-label","Conversation",1,"pane","pane--chat"],[1,"message-list"],[1,"empty-state"],[1,"message",3,"message--user","message--model"],[1,"message","message--model"],["role","alert",1,"error-banner",3,"error-banner--rate-limit"],[1,"input-area"],["appearance","outline","subscriptSizing","dynamic",1,"prompt-field"],["matInput","","placeholder","e.g. Recommend some melancholic jazz from the 60s","aria-label","Music prompt",3,"input","keydown","focus","blur","value","disabled"],["mat-fab","","aria-label","Send message",3,"click","disabled"],["aria-hidden","true",1,"split-divider",3,"mousedown"],["aria-label","Recommendations",1,"pane","pane--reco"],[3,"suggestions","loading","error","message","loadingLabel","clementineUnavailable"],[1,"reco-empty-state"],["aria-hidden","true"],["src","logo.png","aria-hidden","true","alt","",1,"empty-logo"],[1,"empty-prompt"],[1,"empty-hint"],[1,"message"],[1,"message-bubble",3,"message-bubble--active","message-bubble--has-rewind"],[1,"message-bubble"],["mat-icon-button","","matTooltip","Show these suggestions","aria-label","Show suggestions for this reply",1,"rewind-btn"],[3,"innerHTML"],[1,"message-time"],["mat-icon-button","","matTooltip","Show these suggestions","aria-label","Show suggestions for this reply",1,"rewind-btn",3,"click"],[1,"mood-badge",3,"moodSelected","currentMood"],["role","status","aria-live","polite",1,"message-bubble","message-bubble--loading"],[1,"loading-row"],["aria-hidden","true",1,"loading-icon"],[1,"loading-phrase"],[1,"retry-notice"],["role","alert",1,"error-banner"],["role","status","aria-live","polite",1,"reco-loading-text"]],template:function(e,i){e&1&&(h(0,"div",3)(1,"header",4),J(2,"img",5),h(3,"div",6)(4,"span",7),E(5,"Reasonic"),g(),h(6,"p",8),E(7,"The music hiding in your mind"),g()(),h(8,"mat-button-toggle-group",9),H("change",function(r){return i.setProvider(r.value)}),h(9,"mat-button-toggle",10),J(10,"img",11),E(11," Inner Whisper "),g(),h(12,"mat-button-toggle",12),J(13,"img",13),E(14," Inner Shout "),g(),h(15,"mat-button-toggle",14),J(16,"img",15),E(17," Cosmic Voice "),g()(),h(18,"div",16)(19,"span",17),E(20),g(),J(21,"div",18),h(22,"button",19),H("click",function(){return i.bustMemory()}),h(23,"mat-icon"),E(24,"delete_sweep"),g()()(),h(25,"button",20),H("click",function(){return i.openSettings()}),h(26,"mat-icon"),E(27,"settings"),g()()(),G(28,oR,5,0,"div",21),h(29,"div",22,0)(31,"section",23)(32,"div",24,1),G(34,sR,5,1,"div",25),dn(35,dR,3,5,"div",26,Am),G(37,fR,8,2,"div",27),G(38,mR,5,4,"div",28),g(),h(39,"div",29)(40,"mat-form-field",30)(41,"mat-label"),E(42,"Speak your mind if you want to hear me"),g(),h(43,"input",31,2),H("input",function(r){return i.updatePrompt(r)})("keydown",function(r){return i.onKeydown(r)})("focus",function(r){return i.onFocus(r)})("blur",function(){return i.onBlur()}),g()(),h(45,"button",32),H("click",function(){return i.send()}),h(46,"mat-icon"),E(47,"send"),g()()()(),h(48,"div",33),H("mousedown",function(r){return i.onDividerMousedown(r)}),g(),h(49,"section",34),G(50,pR,1,6,"app-suggestions-panel",35)(51,vR,5,1,"div",36),g()()()),e&2&&(y(8),Q("value",i.provider()),y(12),ic("",i.memoryUsed(),"/",i.memoryTotal()),y(),St("--fill",i.memoryFill()),V("memory-bar--high",i.memoryHigh()),Z("aria-valuenow",i.memoryUsed())("aria-valuemax",i.memoryTotal()),y(7),W(i.usedFallback()?28:-1),y(),St("--split-pct",i.splitPercent()+"%"),y(5),W(i.messages().length===0&&!i.loading()?34:-1),y(),un(i.messages()),y(2),W(i.loading()?37:-1),y(),W(i.error()?38:-1),y(2),V("prompt-field--hint",i.isHintPreview()),y(3),Q("value",i.prompt())("disabled",i.loading()),y(2),Q("disabled",!i.prompt().trim()||i.loading()||i.isHintPreview()),y(5),W(i.hasSuggestions()?50:51))},dependencies:[Nn,io,jb,yD,Bp,Xc,ld,co,gr,lo,_n,vn,md,fd,pd,Ks,yd,Dd,Cd],styles:['[_nghost-%COMP%]{display:flex;flex-direction:column;height:100%;overflow:hidden}.page-shell[_ngcontent-%COMP%]{display:flex;flex-direction:column;height:100%;overflow:hidden}.chat-header[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;padding:14px 20px;background-color:var(--reco-surface-0);color:var(--reco-text);border-bottom:1px solid var(--reco-border);flex-shrink:0}.header-logo[_ngcontent-%COMP%]{height:38px;width:auto;object-fit:contain;border-radius:4px;flex-shrink:0}.chat-title-group[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:column;gap:1px}.chat-title[_ngcontent-%COMP%]{font-size:1.1rem;font-weight:600;font-family:var(--reco-font);letter-spacing:.01em;background:linear-gradient(90deg,var(--reco-primary),var(--reco-accent));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent}.chat-tagline[_ngcontent-%COMP%]{margin:0;font-size:.68rem;font-style:italic;font-family:var(--reco-font);color:var(--reco-text-muted);letter-spacing:.01em}.provider-toggle[_ngcontent-%COMP%]{--mat-standard-button-toggle-height: 32px;--mat-standard-button-toggle-background-color: transparent;--mat-standard-button-toggle-text-color: var(--reco-text-muted);--mat-standard-button-toggle-selected-state-background-color: var(--reco-primary-dim);--mat-standard-button-toggle-selected-state-text-color: var(--reco-primary);--mat-standard-button-toggle-divider-color: var(--reco-border);border:1px solid var(--reco-border)!important;border-radius:8px;overflow:hidden}.provider-toggle[_ngcontent-%COMP%]   .mat-button-toggle[_ngcontent-%COMP%]{font-size:.72rem;font-weight:600;font-family:var(--reco-font);letter-spacing:.03em;text-transform:uppercase}.provider-toggle[_ngcontent-%COMP%]   .mat-button-toggle-button[_ngcontent-%COMP%]{display:flex;align-items:center;gap:5px;padding:0 10px}.provider-icon[_ngcontent-%COMP%]{width:14px;height:14px;flex-shrink:0;opacity:.85;vertical-align:middle}.memory-widget[_ngcontent-%COMP%]{display:flex;align-items:center;gap:5px;margin-left:8px}.memory-label[_ngcontent-%COMP%]{font-size:.62rem;font-family:var(--reco-font);color:var(--reco-text-muted);white-space:nowrap;min-width:28px;text-align:right}.memory-bar[_ngcontent-%COMP%]{width:52px;height:4px;border-radius:2px;background:var(--reco-border);position:relative;overflow:hidden;flex-shrink:0}.memory-bar[_ngcontent-%COMP%]:after{content:"";position:absolute;inset:0;width:calc(var(--fill, 0) * 100%);border-radius:2px;background:var(--reco-primary);transition:width .4s ease,background .4s ease}.memory-bar--high[_ngcontent-%COMP%]:after{background:var(--reco-accent)}.memory-bust-btn[_ngcontent-%COMP%]{width:28px;height:28px;flex-shrink:0;align-self:center;display:inline-flex!important;align-items:center;justify-content:center;margin:0;padding:0;color:var(--reco-text-muted);--mdc-icon-button-state-layer-size: 28px;--mdc-icon-button-icon-size: 16px}.memory-bust-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:16px;width:16px;height:16px;transition:color .2s ease}.memory-bust-btn[_ngcontent-%COMP%]:hover   mat-icon[_ngcontent-%COMP%]{color:var(--reco-accent)}.settings-btn[_ngcontent-%COMP%]{width:28px;height:28px;flex-shrink:0;align-self:center;display:inline-flex!important;align-items:center;justify-content:center;margin:0;padding:0;color:var(--reco-text-muted);--mdc-icon-button-state-layer-size: 28px;--mdc-icon-button-icon-size: 16px}.settings-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:16px;width:16px;height:16px;transition:color .2s ease}.settings-btn[_ngcontent-%COMP%]:hover   mat-icon[_ngcontent-%COMP%]{color:var(--reco-primary)}.fallback-chip[_ngcontent-%COMP%]{display:flex;align-items:center;gap:6px;padding:6px 16px;background-color:#ffb74d1f;color:var(--reco-warning);font-size:.8rem;font-family:var(--reco-font);flex-shrink:0;animation:_ngcontent-%COMP%_fade-in .3s ease}.fallback-chip[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:16px;width:16px;height:16px}@keyframes _ngcontent-%COMP%_fade-in{0%{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}.split-layout[_ngcontent-%COMP%]{flex:1;display:flex;overflow:hidden}.pane[_ngcontent-%COMP%]{display:flex;flex-direction:column;overflow:hidden}.pane--chat[_ngcontent-%COMP%]{flex:0 0 var(--split-pct, 40%);background:var(--reco-bg);border-right:none;font-family:var(--reco-font-bubble)}.pane--reco[_ngcontent-%COMP%]{flex:1;overflow-y:auto;background:var(--reco-surface-0);min-width:220px}.split-divider[_ngcontent-%COMP%]{width:5px;flex-shrink:0;cursor:col-resize;background:var(--reco-border);transition:background .15s ease;z-index:1}.split-divider[_ngcontent-%COMP%]:hover{background:var(--reco-primary)}@media(max-width:767px){.split-layout[_ngcontent-%COMP%]{flex-direction:column}.pane--chat[_ngcontent-%COMP%]{flex:1}.pane--reco[_ngcontent-%COMP%]{flex:0 0 auto;max-height:40vh;order:-1;border-bottom:1px solid var(--reco-border);min-width:unset}.split-divider[_ngcontent-%COMP%]{display:none}}.reco-empty-state[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;color:var(--reco-text-muted)}.reco-empty-state[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:48px;width:48px;height:48px;opacity:.35}.reco-empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;font-size:.9rem;font-style:italic;font-family:var(--reco-font)}.reco-empty-state[_ngcontent-%COMP%]   .reco-loading-text[_ngcontent-%COMP%]{font-family:var(--reco-font-bubble);color:var(--reco-primary);animation:_ngcontent-%COMP%_note-pulse 1.5s ease-in-out infinite}.message-list[_ngcontent-%COMP%]{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px;background:var(--reco-bg);scrollbar-width:thin;scrollbar-color:var(--reco-surface-2) transparent}.empty-state[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;color:var(--reco-text-muted);text-align:center;gap:4px;padding:40px 20px}.empty-logo[_ngcontent-%COMP%]{width:80px;height:80px;object-fit:contain;opacity:.18;margin-bottom:8px}.empty-prompt[_ngcontent-%COMP%]{font-size:1rem;font-weight:500;color:var(--reco-text);margin:0}.empty-hint[_ngcontent-%COMP%]{font-style:italic;font-size:.875rem;color:var(--reco-text-muted);margin:4px 0 0}.message[_ngcontent-%COMP%]{display:flex}.message--user[_ngcontent-%COMP%]{justify-content:flex-end}.message--model[_ngcontent-%COMP%]{justify-content:flex-start}.message-bubble[_ngcontent-%COMP%]{max-width:78%;padding:10px 14px;border-radius:18px;line-height:1.7;font-size:.9rem;font-family:var(--reco-font-bubble);position:relative}.message--user[_ngcontent-%COMP%]   .message-bubble[_ngcontent-%COMP%]{background-color:var(--reco-primary);color:#fff;border-bottom-right-radius:4px;font-weight:400;white-space:pre-wrap}.message--model[_ngcontent-%COMP%]   .message-bubble[_ngcontent-%COMP%]{background-color:var(--reco-surface-2);color:var(--reco-text);border-bottom-left-radius:4px;border:1px solid var(--reco-border)}.message--model[_ngcontent-%COMP%]   .message-bubble[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{font-weight:700;color:var(--reco-primary)}.message--model[_ngcontent-%COMP%]   .message-bubble--active[_ngcontent-%COMP%]{outline:2px solid var(--reco-primary);outline-offset:2px;background-color:var(--reco-surface-1)}.message-bubble--has-rewind[_ngcontent-%COMP%]{padding-right:36px}.message-bubble--loading[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:6px;padding:10px 14px;font-style:italic;font-size:.875rem;font-family:var(--reco-font-bubble);color:var(--reco-text-muted);background-color:var(--reco-surface-1);border:1px solid var(--reco-border);border-bottom-left-radius:4px}.rewind-btn[_ngcontent-%COMP%]{position:absolute;top:4px;right:4px;width:26px;height:26px;flex-shrink:0;color:var(--reco-text-muted);opacity:.4;transition:opacity .2s ease,color .2s ease;--mdc-icon-button-state-layer-size: 26px;--mdc-icon-button-icon-size: 18px}.rewind-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:18px;width:18px;height:18px}.rewind-btn[_ngcontent-%COMP%]:hover{opacity:1;color:var(--reco-primary)}.message-time[_ngcontent-%COMP%]{display:block;font-size:.62rem;font-family:var(--reco-font);margin-top:4px}.message--user[_ngcontent-%COMP%]   .message-time[_ngcontent-%COMP%]{color:#ffffff80;text-align:right}.message--model[_ngcontent-%COMP%]   .message-time[_ngcontent-%COMP%]{color:#6b6b6b;opacity:.7}.message--user[_ngcontent-%COMP%]   .message-bubble[_ngcontent-%COMP%]{padding-top:24px}.mood-badge[_ngcontent-%COMP%]{position:absolute;top:4px;right:6px}.loading-row[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px}.retry-notice[_ngcontent-%COMP%]{font-style:normal;font-size:.8rem;font-weight:700;font-family:var(--reco-font-bubble);color:var(--reco-primary)}.loading-icon[_ngcontent-%COMP%]{font-size:18px;width:18px;height:18px;flex-shrink:0;color:var(--reco-primary);animation:_ngcontent-%COMP%_note-pulse 1.5s ease-in-out infinite}.loading-phrase[_ngcontent-%COMP%]{min-width:0;font-family:var(--reco-font-bubble);color:var(--reco-primary)}@keyframes _ngcontent-%COMP%_note-pulse{0%,to{opacity:.35;transform:scale(.95)}50%{opacity:1;transform:scale(1.05)}}.error-banner[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;padding:10px 14px;border-radius:8px;background-color:#ff525226;color:var(--reco-error);font-size:.875rem;font-family:var(--reco-font-bubble);border:1px solid rgba(255,82,82,.3)}.error-banner--rate-limit[_ngcontent-%COMP%]{background-color:var(--reco-accent-dim);color:var(--reco-accent);border-color:#ff2ebe4d}.input-area[_ngcontent-%COMP%]{display:flex;align-items:center;gap:12px;padding:10px 16px;border-top:1px solid var(--reco-border);flex-shrink:0;background-color:var(--reco-surface-0);--mdc-outlined-text-field-label-text-font: var(--reco-font-bubble);--mdc-outlined-text-field-input-text-color: var(--reco-text);--mdc-outlined-text-field-label-text-color: var(--reco-text-muted);--mdc-outlined-text-field-focus-label-text-color: var(--reco-primary);--mdc-outlined-text-field-outline-color: var(--reco-border-strong);--mdc-outlined-text-field-focus-outline-color: var(--reco-primary);--mdc-outlined-text-field-hover-outline-color: var(--reco-primary);--mdc-outlined-text-field-caret-color: var(--reco-primary);--mdc-outlined-text-field-disabled-outline-color: var(--reco-border);--mat-form-field-focus-select-arrow-color: var(--reco-primary);--mdc-fab-container-color: var(--reco-primary);--mdc-fab-icon-color: #ffffff;--mat-fab-foreground-color:#ffffff}.prompt-field[_ngcontent-%COMP%]{flex:1}.prompt-field--hint[_ngcontent-%COMP%]{--mdc-outlined-text-field-input-text-color: var(--reco-text-disabled)}']})};var xd=class t{static \u0275fac=function(e){return new(e||t)};static \u0275cmp=j({type:t,selectors:[["app-root"]],decls:1,vars:0,template:function(e,i){e&1&&J(0,"app-chat")},dependencies:[wd],styles:["[_nghost-%COMP%]{display:block;height:100vh}"]})};qm(xd,ib).catch(t=>console.error(t));

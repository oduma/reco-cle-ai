var VC=Object.defineProperty,BC=Object.defineProperties;var jC=Object.getOwnPropertyDescriptors;var eg=Object.getOwnPropertySymbols;var HC=Object.prototype.hasOwnProperty,UC=Object.prototype.propertyIsEnumerable;var tg=(t,n,e)=>n in t?VC(t,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[n]=e,w=(t,n)=>{for(var e in n||={})HC.call(n,e)&&tg(t,e,n[e]);if(eg)for(var e of eg(n))UC.call(n,e)&&tg(t,e,n[e]);return t},ae=(t,n)=>BC(t,jC(n));var ot=null,Ns=!1,ou=1,zC=null,Ze=Symbol("SIGNAL");function W(t){let n=ot;return ot=t,n}function Vs(){return ot}var Li={version:0,lastCleanEpoch:0,dirty:!1,producers:void 0,producersTail:void 0,consumers:void 0,consumersTail:void 0,recomputing:!1,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,kind:"unknown",producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function Vi(t){if(Ns)throw new Error("");if(ot===null)return;ot.consumerOnSignalRead(t);let n=ot.producersTail;if(n!==void 0&&n.producer===t)return;let e,i=ot.recomputing;if(i&&(e=n!==void 0?n.nextProducer:ot.producers,e!==void 0&&e.producer===t)){ot.producersTail=e,e.lastReadVersion=t.version;return}let r=t.consumersTail;if(r!==void 0&&r.consumer===ot&&(!i||GC(r,ot)))return;let o=jr(ot),a={producer:t,consumer:ot,nextProducer:e,prevConsumer:r,lastReadVersion:t.version,nextConsumer:void 0};ot.producersTail=a,n!==void 0?n.nextProducer=a:ot.producers=a,o&&og(t,a)}function ng(){ou++}function Bs(t){if(!(jr(t)&&!t.dirty)&&!(!t.dirty&&t.lastCleanEpoch===ou)){if(!t.producerMustRecompute(t)&&!Br(t)){Ls(t);return}t.producerRecomputeValue(t),Ls(t)}}function au(t){if(t.consumers===void 0)return;let n=Ns;Ns=!0;try{for(let e=t.consumers;e!==void 0;e=e.nextConsumer){let i=e.consumer;i.dirty||$C(i)}}finally{Ns=n}}function su(){return ot?.consumerAllowSignalWrites!==!1}function $C(t){t.dirty=!0,au(t),t.consumerMarkedDirty?.(t)}function Ls(t){t.dirty=!1,t.lastCleanEpoch=ou}function ni(t){return t&&ig(t),W(t)}function ig(t){t.producersTail=void 0,t.recomputing=!0}function Bi(t,n){W(n),t&&rg(t)}function rg(t){t.recomputing=!1;let n=t.producersTail,e=n!==void 0?n.nextProducer:t.producers;if(e!==void 0){if(jr(t))do e=lu(e);while(e!==void 0);n!==void 0?n.nextProducer=void 0:t.producers=void 0}}function Br(t){for(let n=t.producers;n!==void 0;n=n.nextProducer){let e=n.producer,i=n.lastReadVersion;if(i!==e.version||(Bs(e),i!==e.version))return!0}return!1}function ii(t){if(jr(t)){let n=t.producers;for(;n!==void 0;)n=lu(n)}t.producers=void 0,t.producersTail=void 0,t.consumers=void 0,t.consumersTail=void 0}function og(t,n){let e=t.consumersTail,i=jr(t);if(e!==void 0?(n.nextConsumer=e.nextConsumer,e.nextConsumer=n):(n.nextConsumer=void 0,t.consumers=n),n.prevConsumer=e,t.consumersTail=n,!i)for(let r=t.producers;r!==void 0;r=r.nextProducer)og(r.producer,r)}function lu(t){let n=t.producer,e=t.nextProducer,i=t.nextConsumer,r=t.prevConsumer;if(t.nextConsumer=void 0,t.prevConsumer=void 0,i!==void 0?i.prevConsumer=r:n.consumersTail=r,r!==void 0)r.nextConsumer=i;else if(n.consumers=i,!jr(n)){let o=n.producers;for(;o!==void 0;)o=lu(o)}return e}function jr(t){return t.consumerIsAlwaysLive||t.consumers!==void 0}function js(t){zC?.(t)}function GC(t,n){let e=n.producersTail;if(e!==void 0){let i=n.producers;do{if(i===t)return!0;if(i===e)break;i=i.nextProducer}while(i!==void 0)}return!1}function Hs(t,n){return Object.is(t,n)}function na(t,n){let e=Object.create(WC);e.computation=t,n!==void 0&&(e.equal=n);let i=()=>{if(Bs(e),Vi(e),e.value===ta)throw e.error;return e.value};return i[Ze]=e,js(e),i}var Fs=Symbol("UNSET"),Ps=Symbol("COMPUTING"),ta=Symbol("ERRORED"),WC=ae(w({},Li),{value:Fs,dirty:!0,error:null,equal:Hs,kind:"computed",producerMustRecompute(t){return t.value===Fs||t.value===Ps},producerRecomputeValue(t){if(t.value===Ps)throw new Error("");let n=t.value;t.value=Ps;let e=ni(t),i,r=!1;try{i=t.computation(),W(null),r=n!==Fs&&n!==ta&&i!==ta&&t.equal(n,i)}catch(o){i=ta,t.error=o}finally{Bi(t,e)}if(r){t.value=n;return}t.value=i,t.version++}});function YC(){throw new Error}var ag=YC;function sg(t){ag(t)}function cu(t){ag=t}var qC=null;function du(t,n){let e=Object.create(ia);e.value=t,n!==void 0&&(e.equal=n);let i=()=>lg(e);return i[Ze]=e,js(e),[i,a=>Hr(e,a),a=>uu(e,a)]}function lg(t){return Vi(t),t.value}function Hr(t,n){su()||sg(t),t.equal(t.value,n)||(t.value=n,ZC(t))}function uu(t,n){su()||sg(t),Hr(t,n(t.value))}var ia=ae(w({},Li),{equal:Hs,value:void 0,kind:"signal"});function ZC(t){t.version++,ng(),au(t),qC?.(t)}var fu=ae(w({},Li),{consumerIsAlwaysLive:!0,consumerAllowSignalWrites:!0,dirty:!0,kind:"effect"});function mu(t){if(t.dirty=!1,t.version>0&&!Br(t))return;t.version++;let n=ni(t);try{t.cleanup(),t.fn()}finally{Bi(t,n)}}function se(t){return typeof t=="function"}function Ur(t){let e=t(i=>{Error.call(i),i.stack=new Error().stack});return e.prototype=Object.create(Error.prototype),e.prototype.constructor=e,e}var Us=Ur(t=>function(e){t(this),this.message=e?`${e.length} errors occurred during unsubscription:
${e.map((i,r)=>`${r+1}) ${i.toString()}`).join(`
  `)}`:"",this.name="UnsubscriptionError",this.errors=e});function ji(t,n){if(t){let e=t.indexOf(n);0<=e&&t.splice(e,1)}}var ue=class t{constructor(n){this.initialTeardown=n,this.closed=!1,this._parentage=null,this._finalizers=null}unsubscribe(){let n;if(!this.closed){this.closed=!0;let{_parentage:e}=this;if(e)if(this._parentage=null,Array.isArray(e))for(let o of e)o.remove(this);else e.remove(this);let{initialTeardown:i}=this;if(se(i))try{i()}catch(o){n=o instanceof Us?o.errors:[o]}let{_finalizers:r}=this;if(r){this._finalizers=null;for(let o of r)try{cg(o)}catch(a){n=n??[],a instanceof Us?n=[...n,...a.errors]:n.push(a)}}if(n)throw new Us(n)}}add(n){var e;if(n&&n!==this)if(this.closed)cg(n);else{if(n instanceof t){if(n.closed||n._hasParent(this))return;n._addParent(this)}(this._finalizers=(e=this._finalizers)!==null&&e!==void 0?e:[]).push(n)}}_hasParent(n){let{_parentage:e}=this;return e===n||Array.isArray(e)&&e.includes(n)}_addParent(n){let{_parentage:e}=this;this._parentage=Array.isArray(e)?(e.push(n),e):e?[e,n]:n}_removeParent(n){let{_parentage:e}=this;e===n?this._parentage=null:Array.isArray(e)&&ji(e,n)}remove(n){let{_finalizers:e}=this;e&&ji(e,n),n instanceof t&&n._removeParent(this)}};ue.EMPTY=(()=>{let t=new ue;return t.closed=!0,t})();var hu=ue.EMPTY;function zs(t){return t instanceof ue||t&&"closed"in t&&se(t.remove)&&se(t.add)&&se(t.unsubscribe)}function cg(t){se(t)?t():t.unsubscribe()}var tn={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1};var zr={setTimeout(t,n,...e){let{delegate:i}=zr;return i?.setTimeout?i.setTimeout(t,n,...e):setTimeout(t,n,...e)},clearTimeout(t){let{delegate:n}=zr;return(n?.clearTimeout||clearTimeout)(t)},delegate:void 0};function $s(t){zr.setTimeout(()=>{let{onUnhandledError:n}=tn;if(n)n(t);else throw t})}function ra(){}var dg=pu("C",void 0,void 0);function ug(t){return pu("E",void 0,t)}function fg(t){return pu("N",t,void 0)}function pu(t,n,e){return{kind:t,value:n,error:e}}var Hi=null;function $r(t){if(tn.useDeprecatedSynchronousErrorHandling){let n=!Hi;if(n&&(Hi={errorThrown:!1,error:null}),t(),n){let{errorThrown:e,error:i}=Hi;if(Hi=null,e)throw i}}else t()}function mg(t){tn.useDeprecatedSynchronousErrorHandling&&Hi&&(Hi.errorThrown=!0,Hi.error=t)}var Ui=class extends ue{constructor(n){super(),this.isStopped=!1,n?(this.destination=n,zs(n)&&n.add(this)):this.destination=XC}static create(n,e,i){return new nn(n,e,i)}next(n){this.isStopped?_u(fg(n),this):this._next(n)}error(n){this.isStopped?_u(ug(n),this):(this.isStopped=!0,this._error(n))}complete(){this.isStopped?_u(dg,this):(this.isStopped=!0,this._complete())}unsubscribe(){this.closed||(this.isStopped=!0,super.unsubscribe(),this.destination=null)}_next(n){this.destination.next(n)}_error(n){try{this.destination.error(n)}finally{this.unsubscribe()}}_complete(){try{this.destination.complete()}finally{this.unsubscribe()}}},KC=Function.prototype.bind;function gu(t,n){return KC.call(t,n)}var bu=class{constructor(n){this.partialObserver=n}next(n){let{partialObserver:e}=this;if(e.next)try{e.next(n)}catch(i){Gs(i)}}error(n){let{partialObserver:e}=this;if(e.error)try{e.error(n)}catch(i){Gs(i)}else Gs(n)}complete(){let{partialObserver:n}=this;if(n.complete)try{n.complete()}catch(e){Gs(e)}}},nn=class extends Ui{constructor(n,e,i){super();let r;if(se(n)||!n)r={next:n??void 0,error:e??void 0,complete:i??void 0};else{let o;this&&tn.useDeprecatedNextContext?(o=Object.create(n),o.unsubscribe=()=>this.unsubscribe(),r={next:n.next&&gu(n.next,o),error:n.error&&gu(n.error,o),complete:n.complete&&gu(n.complete,o)}):r=n}this.destination=new bu(r)}};function Gs(t){tn.useDeprecatedSynchronousErrorHandling?mg(t):$s(t)}function QC(t){throw t}function _u(t,n){let{onStoppedNotification:e}=tn;e&&zr.setTimeout(()=>e(t,n))}var XC={closed:!0,next:ra,error:QC,complete:ra};var Gr=typeof Symbol=="function"&&Symbol.observable||"@@observable";function St(t){return t}function hg(t){return t.length===0?St:t.length===1?t[0]:function(e){return t.reduce((i,r)=>r(i),e)}}var le=(()=>{class t{constructor(e){e&&(this._subscribe=e)}lift(e){let i=new t;return i.source=this,i.operator=e,i}subscribe(e,i,r){let o=ex(e)?e:new nn(e,i,r);return $r(()=>{let{operator:a,source:s}=this;o.add(a?a.call(o,s):s?this._subscribe(o):this._trySubscribe(o))}),o}_trySubscribe(e){try{return this._subscribe(e)}catch(i){e.error(i)}}forEach(e,i){return i=pg(i),new i((r,o)=>{let a=new nn({next:s=>{try{e(s)}catch(l){o(l),a.unsubscribe()}},error:o,complete:r});this.subscribe(a)})}_subscribe(e){var i;return(i=this.source)===null||i===void 0?void 0:i.subscribe(e)}[Gr](){return this}pipe(...e){return hg(e)(this)}toPromise(e){return e=pg(e),new e((i,r)=>{let o;this.subscribe(a=>o=a,a=>r(a),()=>i(o))})}}return t.create=n=>new t(n),t})();function pg(t){var n;return(n=t??tn.Promise)!==null&&n!==void 0?n:Promise}function JC(t){return t&&se(t.next)&&se(t.error)&&se(t.complete)}function ex(t){return t&&t instanceof Ui||JC(t)&&zs(t)}function tx(t){return se(t?.lift)}function fe(t){return n=>{if(tx(n))return n.lift(function(e){try{return t(e,this)}catch(i){this.error(i)}});throw new TypeError("Unable to lift unknown Observable type")}}function me(t,n,e,i,r){return new vu(t,n,e,i,r)}var vu=class extends Ui{constructor(n,e,i,r,o,a){super(n),this.onFinalize=o,this.shouldUnsubscribe=a,this._next=e?function(s){try{e(s)}catch(l){n.error(l)}}:super._next,this._error=r?function(s){try{r(s)}catch(l){n.error(l)}finally{this.unsubscribe()}}:super._error,this._complete=i?function(){try{i()}catch(s){n.error(s)}finally{this.unsubscribe()}}:super._complete}unsubscribe(){var n;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){let{closed:e}=this;super.unsubscribe(),!e&&((n=this.onFinalize)===null||n===void 0||n.call(this))}}};var gg=Ur(t=>function(){t(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"});var E=(()=>{class t extends le{constructor(){super(),this.closed=!1,this.currentObservers=null,this.observers=[],this.isStopped=!1,this.hasError=!1,this.thrownError=null}lift(e){let i=new Ws(this,this);return i.operator=e,i}_throwIfClosed(){if(this.closed)throw new gg}next(e){$r(()=>{if(this._throwIfClosed(),!this.isStopped){this.currentObservers||(this.currentObservers=Array.from(this.observers));for(let i of this.currentObservers)i.next(e)}})}error(e){$r(()=>{if(this._throwIfClosed(),!this.isStopped){this.hasError=this.isStopped=!0,this.thrownError=e;let{observers:i}=this;for(;i.length;)i.shift().error(e)}})}complete(){$r(()=>{if(this._throwIfClosed(),!this.isStopped){this.isStopped=!0;let{observers:e}=this;for(;e.length;)e.shift().complete()}})}unsubscribe(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null}get observed(){var e;return((e=this.observers)===null||e===void 0?void 0:e.length)>0}_trySubscribe(e){return this._throwIfClosed(),super._trySubscribe(e)}_subscribe(e){return this._throwIfClosed(),this._checkFinalizedStatuses(e),this._innerSubscribe(e)}_innerSubscribe(e){let{hasError:i,isStopped:r,observers:o}=this;return i||r?hu:(this.currentObservers=null,o.push(e),new ue(()=>{this.currentObservers=null,ji(o,e)}))}_checkFinalizedStatuses(e){let{hasError:i,thrownError:r,isStopped:o}=this;i?e.error(r):o&&e.complete()}asObservable(){let e=new le;return e.source=this,e}}return t.create=(n,e)=>new Ws(n,e),t})(),Ws=class extends E{constructor(n,e){super(),this.destination=n,this.source=e}next(n){var e,i;(i=(e=this.destination)===null||e===void 0?void 0:e.next)===null||i===void 0||i.call(e,n)}error(n){var e,i;(i=(e=this.destination)===null||e===void 0?void 0:e.error)===null||i===void 0||i.call(e,n)}complete(){var n,e;(e=(n=this.destination)===null||n===void 0?void 0:n.complete)===null||e===void 0||e.call(n)}_subscribe(n){var e,i;return(i=(e=this.source)===null||e===void 0?void 0:e.subscribe(n))!==null&&i!==void 0?i:hu}};var zi=class extends E{constructor(n){super(),this._value=n}get value(){return this.getValue()}_subscribe(n){let e=super._subscribe(n);return!e.closed&&n.next(this._value),e}getValue(){let{hasError:n,thrownError:e,_value:i}=this;if(n)throw e;return this._throwIfClosed(),i}next(n){super.next(this._value=n)}};var oa={now(){return(oa.delegate||Date).now()},delegate:void 0};var ri=class extends E{constructor(n=1/0,e=1/0,i=oa){super(),this._bufferSize=n,this._windowTime=e,this._timestampProvider=i,this._buffer=[],this._infiniteTimeWindow=!0,this._infiniteTimeWindow=e===1/0,this._bufferSize=Math.max(1,n),this._windowTime=Math.max(1,e)}next(n){let{isStopped:e,_buffer:i,_infiniteTimeWindow:r,_timestampProvider:o,_windowTime:a}=this;e||(i.push(n),!r&&i.push(o.now()+a)),this._trimBuffer(),super.next(n)}_subscribe(n){this._throwIfClosed(),this._trimBuffer();let e=this._innerSubscribe(n),{_infiniteTimeWindow:i,_buffer:r}=this,o=r.slice();for(let a=0;a<o.length&&!n.closed;a+=i?1:2)n.next(o[a]);return this._checkFinalizedStatuses(n),e}_trimBuffer(){let{_bufferSize:n,_timestampProvider:e,_buffer:i,_infiniteTimeWindow:r}=this,o=(r?1:2)*n;if(n<1/0&&o<i.length&&i.splice(0,i.length-o),!r){let a=e.now(),s=0;for(let l=1;l<i.length&&i[l]<=a;l+=2)s=l;s&&i.splice(0,s+1)}}};var Ys=class extends ue{constructor(n,e){super()}schedule(n,e=0){return this}};var aa={setInterval(t,n,...e){let{delegate:i}=aa;return i?.setInterval?i.setInterval(t,n,...e):setInterval(t,n,...e)},clearInterval(t){let{delegate:n}=aa;return(n?.clearInterval||clearInterval)(t)},delegate:void 0};var qs=class extends Ys{constructor(n,e){super(n,e),this.scheduler=n,this.work=e,this.pending=!1}schedule(n,e=0){var i;if(this.closed)return this;this.state=n;let r=this.id,o=this.scheduler;return r!=null&&(this.id=this.recycleAsyncId(o,r,e)),this.pending=!0,this.delay=e,this.id=(i=this.id)!==null&&i!==void 0?i:this.requestAsyncId(o,this.id,e),this}requestAsyncId(n,e,i=0){return aa.setInterval(n.flush.bind(n,this),i)}recycleAsyncId(n,e,i=0){if(i!=null&&this.delay===i&&this.pending===!1)return e;e!=null&&aa.clearInterval(e)}execute(n,e){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;let i=this._execute(n,e);if(i)return i;this.pending===!1&&this.id!=null&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))}_execute(n,e){let i=!1,r;try{this.work(n)}catch(o){i=!0,r=o||new Error("Scheduled action threw falsy error")}if(i)return this.unsubscribe(),r}unsubscribe(){if(!this.closed){let{id:n,scheduler:e}=this,{actions:i}=e;this.work=this.state=this.scheduler=null,this.pending=!1,ji(i,this),n!=null&&(this.id=this.recycleAsyncId(e,n,null)),this.delay=null,super.unsubscribe()}}};var Wr=class t{constructor(n,e=t.now){this.schedulerActionCtor=n,this.now=e}schedule(n,e=0,i){return new this.schedulerActionCtor(this,n).schedule(i,e)}};Wr.now=oa.now;var Zs=class extends Wr{constructor(n,e=Wr.now){super(n,e),this.actions=[],this._active=!1}flush(n){let{actions:e}=this;if(this._active){e.push(n);return}let i;this._active=!0;do if(i=n.execute(n.state,n.delay))break;while(n=e.shift());if(this._active=!1,i){for(;n=e.shift();)n.unsubscribe();throw i}}};var sa=new Zs(qs),_g=sa;var $i=new le(t=>t.complete());function Ks(t){return t&&se(t.schedule)}function yu(t){return t[t.length-1]}function Qs(t){return se(yu(t))?t.pop():void 0}function Cn(t){return Ks(yu(t))?t.pop():void 0}function bg(t,n){return typeof yu(t)=="number"?t.pop():n}function yg(t,n,e,i){function r(o){return o instanceof e?o:new e(function(a){a(o)})}return new(e||(e=Promise))(function(o,a){function s(u){try{c(i.next(u))}catch(f){a(f)}}function l(u){try{c(i.throw(u))}catch(f){a(f)}}function c(u){u.done?o(u.value):r(u.value).then(s,l)}c((i=i.apply(t,n||[])).next())})}function vg(t){var n=typeof Symbol=="function"&&Symbol.iterator,e=n&&t[n],i=0;if(e)return e.call(t);if(t&&typeof t.length=="number")return{next:function(){return t&&i>=t.length&&(t=void 0),{value:t&&t[i++],done:!t}}};throw new TypeError(n?"Object is not iterable.":"Symbol.iterator is not defined.")}function Gi(t){return this instanceof Gi?(this.v=t,this):new Gi(t)}function Dg(t,n,e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var i=e.apply(t,n||[]),r,o=[];return r=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),s("next"),s("throw"),s("return",a),r[Symbol.asyncIterator]=function(){return this},r;function a(p){return function(v){return Promise.resolve(v).then(p,f)}}function s(p,v){i[p]&&(r[p]=function(S){return new Promise(function(N,z){o.push([p,S,N,z])>1||l(p,S)})},v&&(r[p]=v(r[p])))}function l(p,v){try{c(i[p](v))}catch(S){g(o[0][3],S)}}function c(p){p.value instanceof Gi?Promise.resolve(p.value.v).then(u,f):g(o[0][2],p)}function u(p){l("next",p)}function f(p){l("throw",p)}function g(p,v){p(v),o.shift(),o.length&&l(o[0][0],o[0][1])}}function Cg(t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var n=t[Symbol.asyncIterator],e;return n?n.call(t):(t=typeof vg=="function"?vg(t):t[Symbol.iterator](),e={},i("next"),i("throw"),i("return"),e[Symbol.asyncIterator]=function(){return this},e);function i(o){e[o]=t[o]&&function(a){return new Promise(function(s,l){a=t[o](a),r(s,l,a.done,a.value)})}}function r(o,a,s,l){Promise.resolve(l).then(function(c){o({value:c,done:s})},a)}}var Xs=t=>t&&typeof t.length=="number"&&typeof t!="function";function Js(t){return se(t?.then)}function el(t){return se(t[Gr])}function tl(t){return Symbol.asyncIterator&&se(t?.[Symbol.asyncIterator])}function nl(t){return new TypeError(`You provided ${t!==null&&typeof t=="object"?"an invalid object":`'${t}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)}function nx(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var il=nx();function rl(t){return se(t?.[il])}function ol(t){return Dg(this,arguments,function*(){let e=t.getReader();try{for(;;){let{value:i,done:r}=yield Gi(e.read());if(r)return yield Gi(void 0);yield yield Gi(i)}}finally{e.releaseLock()}})}function al(t){return se(t?.getReader)}function be(t){if(t instanceof le)return t;if(t!=null){if(el(t))return ix(t);if(Xs(t))return rx(t);if(Js(t))return ox(t);if(tl(t))return xg(t);if(rl(t))return ax(t);if(al(t))return sx(t)}throw nl(t)}function ix(t){return new le(n=>{let e=t[Gr]();if(se(e.subscribe))return e.subscribe(n);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function rx(t){return new le(n=>{for(let e=0;e<t.length&&!n.closed;e++)n.next(t[e]);n.complete()})}function ox(t){return new le(n=>{t.then(e=>{n.closed||(n.next(e),n.complete())},e=>n.error(e)).then(null,$s)})}function ax(t){return new le(n=>{for(let e of t)if(n.next(e),n.closed)return;n.complete()})}function xg(t){return new le(n=>{lx(t,n).catch(e=>n.error(e))})}function sx(t){return xg(ol(t))}function lx(t,n){var e,i,r,o;return yg(this,void 0,void 0,function*(){try{for(e=Cg(t);i=yield e.next(),!i.done;){let a=i.value;if(n.next(a),n.closed)return}}catch(a){r={error:a}}finally{try{i&&!i.done&&(o=e.return)&&(yield o.call(e))}finally{if(r)throw r.error}}n.complete()})}function bt(t,n,e,i=0,r=!1){let o=n.schedule(function(){e(),r?t.add(this.schedule(null,i)):this.unsubscribe()},i);if(t.add(o),!r)return o}function sl(t,n=0){return fe((e,i)=>{e.subscribe(me(i,r=>bt(i,t,()=>i.next(r),n),()=>bt(i,t,()=>i.complete(),n),r=>bt(i,t,()=>i.error(r),n)))})}function ll(t,n=0){return fe((e,i)=>{i.add(t.schedule(()=>e.subscribe(i),n))})}function wg(t,n){return be(t).pipe(ll(n),sl(n))}function Eg(t,n){return be(t).pipe(ll(n),sl(n))}function Mg(t,n){return new le(e=>{let i=0;return n.schedule(function(){i===t.length?e.complete():(e.next(t[i++]),e.closed||this.schedule())})})}function Ig(t,n){return new le(e=>{let i;return bt(e,n,()=>{i=t[il](),bt(e,n,()=>{let r,o;try{({value:r,done:o}=i.next())}catch(a){e.error(a);return}o?e.complete():e.next(r)},0,!0)}),()=>se(i?.return)&&i.return()})}function cl(t,n){if(!t)throw new Error("Iterable cannot be null");return new le(e=>{bt(e,n,()=>{let i=t[Symbol.asyncIterator]();bt(e,n,()=>{i.next().then(r=>{r.done?e.complete():e.next(r.value)})},0,!0)})})}function Sg(t,n){return cl(ol(t),n)}function kg(t,n){if(t!=null){if(el(t))return wg(t,n);if(Xs(t))return Mg(t,n);if(Js(t))return Eg(t,n);if(tl(t))return cl(t,n);if(rl(t))return Ig(t,n);if(al(t))return Sg(t,n)}throw nl(t)}function Vt(t,n){return n?kg(t,n):be(t)}function Pe(...t){let n=Cn(t);return Vt(t,n)}function la(t,n){let e=se(t)?t:()=>t,i=r=>r.error(e());return new le(n?r=>n.schedule(i,0,r):i)}var Tg=Ur(t=>function(){t(this),this.name="EmptyError",this.message="no elements in sequence"});function Yr(t,n){let e=typeof n=="object";return new Promise((i,r)=>{let o=new nn({next:a=>{i(a),o.unsubscribe()},error:r,complete:()=>{e?i(n.defaultValue):r(new Tg)}});t.subscribe(o)})}function Ag(t){return t instanceof Date&&!isNaN(t)}function Ee(t,n){return fe((e,i)=>{let r=0;e.subscribe(me(i,o=>{i.next(t.call(n,o,r++))}))})}var{isArray:cx}=Array;function dx(t,n){return cx(n)?t(...n):t(n)}function dl(t){return Ee(n=>dx(t,n))}var{isArray:ux}=Array,{getPrototypeOf:fx,prototype:mx,keys:hx}=Object;function ul(t){if(t.length===1){let n=t[0];if(ux(n))return{args:n,keys:null};if(px(n)){let e=hx(n);return{args:e.map(i=>n[i]),keys:e}}}return{args:t,keys:null}}function px(t){return t&&typeof t=="object"&&fx(t)===mx}function fl(t,n){return t.reduce((e,i,r)=>(e[i]=n[r],e),{})}function Du(...t){let n=Cn(t),e=Qs(t),{args:i,keys:r}=ul(t);if(i.length===0)return Vt([],n);let o=new le(gx(i,n,r?a=>fl(r,a):St));return e?o.pipe(dl(e)):o}function gx(t,n,e=St){return i=>{Rg(n,()=>{let{length:r}=t,o=new Array(r),a=r,s=r;for(let l=0;l<r;l++)Rg(n,()=>{let c=Vt(t[l],n),u=!1;c.subscribe(me(i,f=>{o[l]=f,u||(u=!0,s--),s||i.next(e(o.slice()))},()=>{--a||i.complete()}))},i)},i)}}function Rg(t,n,e){t?bt(e,t,n):n()}function Og(t,n,e,i,r,o,a,s){let l=[],c=0,u=0,f=!1,g=()=>{f&&!l.length&&!c&&n.complete()},p=S=>c<i?v(S):l.push(S),v=S=>{o&&n.next(S),c++;let N=!1;be(e(S,u++)).subscribe(me(n,z=>{r?.(z),o?p(z):n.next(z)},()=>{N=!0},void 0,()=>{if(N)try{for(c--;l.length&&c<i;){let z=l.shift();a?bt(n,a,()=>v(z)):v(z)}g()}catch(z){n.error(z)}}))};return t.subscribe(me(n,p,()=>{f=!0,g()})),()=>{s?.()}}function qr(t,n,e=1/0){return se(n)?qr((i,r)=>Ee((o,a)=>n(i,o,r,a))(be(t(i,r))),e):(typeof n=="number"&&(e=n),fe((i,r)=>Og(i,r,t,e)))}function ml(t=1/0){return qr(St,t)}function Ng(){return ml(1)}function Zr(...t){return Ng()(Vt(t,Cn(t)))}function ca(t){return new le(n=>{be(t()).subscribe(n)})}function Wi(...t){let n=Qs(t),{args:e,keys:i}=ul(t),r=new le(o=>{let{length:a}=e;if(!a){o.complete();return}let s=new Array(a),l=a,c=a;for(let u=0;u<a;u++){let f=!1;be(e[u]).subscribe(me(o,g=>{f||(f=!0,c--),s[u]=g},()=>l--,void 0,()=>{(!l||!f)&&(c||o.next(i?fl(i,s):s),o.complete())}))}});return n?r.pipe(dl(n)):r}function Yi(t=0,n,e=_g){let i=-1;return n!=null&&(Ks(n)?e=n:i=n),new le(r=>{let o=Ag(t)?+t-e.now():t;o<0&&(o=0);let a=0;return e.schedule(function(){r.closed||(r.next(a++),0<=i?this.schedule(void 0,i):r.complete())},o)})}function Bt(...t){let n=Cn(t),e=bg(t,1/0),i=t;return i.length?i.length===1?be(i[0]):ml(e)(Vt(i,n)):$i}function Le(t,n){return fe((e,i)=>{let r=0;e.subscribe(me(i,o=>t.call(n,o,r++)&&i.next(o)))})}function Fg(t){return fe((n,e)=>{let i=!1,r=null,o=null,a=!1,s=()=>{if(o?.unsubscribe(),o=null,i){i=!1;let c=r;r=null,e.next(c)}a&&e.complete()},l=()=>{o=null,a&&e.complete()};n.subscribe(me(e,c=>{i=!0,r=c,o||be(t(c)).subscribe(o=me(e,s,l))},()=>{a=!0,(!i||!o||o.closed)&&e.complete()}))})}function hl(t,n=sa){return Fg(()=>Yi(t,n))}function pl(t){return fe((n,e)=>{let i=null,r=!1,o;i=n.subscribe(me(e,void 0,void 0,a=>{o=be(t(a,pl(t)(n))),i?(i.unsubscribe(),i=null,o.subscribe(e)):r=!0})),r&&(i.unsubscribe(),i=null,o.subscribe(e))})}function Cu(t,n){return se(n)?qr(t,n,1):qr(t,1)}function da(t,n=sa){return fe((e,i)=>{let r=null,o=null,a=null,s=()=>{if(r){r.unsubscribe(),r=null;let c=o;o=null,i.next(c)}};function l(){let c=a+t,u=n.now();if(u<c){r=this.schedule(void 0,c-u),i.add(r);return}s()}e.subscribe(me(i,c=>{o=c,a=n.now(),r||(r=n.schedule(l,t),i.add(r))},()=>{s(),i.complete()},void 0,()=>{o=r=null}))})}function vt(t){return t<=0?()=>$i:fe((n,e)=>{let i=0;n.subscribe(me(e,r=>{++i<=t&&(e.next(r),t<=i&&e.complete())}))})}function gl(t,n=St){return t=t??_x,fe((e,i)=>{let r,o=!0;e.subscribe(me(i,a=>{let s=n(a);(o||!t(r,s))&&(o=!1,r=s,i.next(a))}))})}function _x(t,n){return t===n}function ua(t){return fe((n,e)=>{try{n.subscribe(e)}finally{e.add(t)}})}function _l(){return fe((t,n)=>{let e,i=!1;t.subscribe(me(n,r=>{let o=e;e=r,i&&n.next([o,r]),i=!0}))})}function xu(t=1/0){let n;t&&typeof t=="object"?n=t:n={count:t};let{count:e=1/0,delay:i,resetOnSuccess:r=!1}=n;return e<=0?St:fe((o,a)=>{let s=0,l,c=()=>{let u=!1;l=o.subscribe(me(a,f=>{r&&(s=0),a.next(f)},void 0,f=>{if(s++<e){let g=()=>{l?(l.unsubscribe(),l=null,c()):u=!0};if(i!=null){let p=typeof i=="number"?Yi(i):be(i(f,s)),v=me(a,()=>{v.unsubscribe(),g()},()=>{a.complete()});p.subscribe(v)}else g()}else a.error(f)})),u&&(l.unsubscribe(),l=null,c())};c()})}function fa(t={}){let{connector:n=()=>new E,resetOnError:e=!0,resetOnComplete:i=!0,resetOnRefCountZero:r=!0}=t;return o=>{let a,s,l,c=0,u=!1,f=!1,g=()=>{s?.unsubscribe(),s=void 0},p=()=>{g(),a=l=void 0,u=f=!1},v=()=>{let S=a;p(),S?.unsubscribe()};return fe((S,N)=>{c++,!f&&!u&&g();let z=l=l??n();N.add(()=>{c--,c===0&&!f&&!u&&(s=wu(v,r))}),z.subscribe(N),!a&&c>0&&(a=new nn({next:ke=>z.next(ke),error:ke=>{f=!0,g(),s=wu(p,e,ke),z.error(ke)},complete:()=>{u=!0,g(),s=wu(p,i),z.complete()}}),be(S).subscribe(a))})(o)}}function wu(t,n,...e){if(n===!0){t();return}if(n===!1)return;let i=new nn({next:()=>{i.unsubscribe(),t()}});return be(n(...e)).subscribe(i)}function bl(t,n,e){let i,r=!1;return t&&typeof t=="object"?{bufferSize:i=1/0,windowTime:n=1/0,refCount:r=!1,scheduler:e}=t:i=t??1/0,fa({connector:()=>new ri(i,n,e),resetOnError:!0,resetOnComplete:!1,resetOnRefCountZero:r})}function ma(t){return Le((n,e)=>t<=e)}function nt(...t){let n=Cn(t);return fe((e,i)=>{(n?Zr(t,e,n):Zr(t,e)).subscribe(i)})}function qi(t,n){return fe((e,i)=>{let r=null,o=0,a=!1,s=()=>a&&!r&&i.complete();e.subscribe(me(i,l=>{r?.unsubscribe();let c=0,u=o++;be(t(l,u)).subscribe(r=me(i,f=>i.next(n?n(l,f,u,c++):f),()=>{r=null,s()}))},()=>{a=!0,s()}))})}function je(t){return fe((n,e)=>{be(t).subscribe(me(e,()=>e.complete(),ra)),!e.closed&&n.subscribe(e)})}function Zi(t,n,e){let i=se(t)||n||e?{next:t,error:n,complete:e}:t;return i?fe((r,o)=>{var a;(a=i.subscribe)===null||a===void 0||a.call(i);let s=!0;r.subscribe(me(o,l=>{var c;(c=i.next)===null||c===void 0||c.call(i,l),o.next(l)},()=>{var l;s=!1,(l=i.complete)===null||l===void 0||l.call(i),o.complete()},l=>{var c;s=!1,(c=i.error)===null||c===void 0||c.call(i,l),o.error(l)},()=>{var l,c;s&&((l=i.unsubscribe)===null||l===void 0||l.call(i)),(c=i.finalize)===null||c===void 0||c.call(i)}))}):St}var Eu;function vl(){return Eu}function xn(t){let n=Eu;return Eu=t,n}var Pg=Symbol("NotFound");function Kr(t){return t===Pg||t?.name==="\u0275NotFound"}function Lg(t){let n=W(null);try{return t()}finally{W(n)}}var Ml="https://angular.dev/best-practices/security#preventing-cross-site-scripting-xss",$=class extends Error{code;constructor(n,e){super(li(n,e)),this.code=n}};function bx(t){return`NG0${Math.abs(t)}`}function li(t,n){return`${bx(t)}${n?": "+n:""}`}var ci=globalThis;function De(t){for(let n in t)if(t[n]===De)return n;throw Error("")}function Ug(t,n){for(let e in n)n.hasOwnProperty(e)&&!t.hasOwnProperty(e)&&(t[e]=n[e])}function Il(t){if(typeof t=="string")return t;if(Array.isArray(t))return`[${t.map(Il).join(", ")}]`;if(t==null)return""+t;let n=t.overriddenName||t.name;if(n)return`${n}`;let e=t.toString();if(e==null)return""+e;let i=e.indexOf(`
`);return i>=0?e.slice(0,i):e}function Sl(t,n){return t?n?`${t} ${n}`:t:n||""}var vx=De({__forward_ref__:De});function ht(t){return t.__forward_ref__=ht,t}function Ke(t){return Vu(t)?t():t}function Vu(t){return typeof t=="function"&&t.hasOwnProperty(vx)&&t.__forward_ref__===ht}function y(t){return{token:t.token,providedIn:t.providedIn||null,factory:t.factory,value:void 0}}function q(t){return{providers:t.providers||[],imports:t.imports||[]}}function kl(t){return yx(t,Tl)}function yx(t,n){return t.hasOwnProperty(n)&&t[n]||null}function Dx(t){let n=t?.[Tl]??null;return n||null}function Iu(t){return t&&t.hasOwnProperty(Dl)?t[Dl]:null}var Tl=De({\u0275prov:De}),Dl=De({\u0275inj:De}),b=class{_desc;ngMetadataName="InjectionToken";\u0275prov;constructor(n,e){this._desc=n,this.\u0275prov=void 0,typeof e=="number"?this.__NG_ELEMENT_ID__=e:e!==void 0&&(this.\u0275prov=y({token:this,providedIn:e.providedIn||"root",factory:e.factory}))}get multi(){return this}toString(){return`InjectionToken ${this._desc}`}};function Bu(t){return t&&!!t.\u0275providers}var ju=De({\u0275cmp:De}),Hu=De({\u0275dir:De}),Uu=De({\u0275pipe:De});var pa=De({\u0275fac:De}),er=De({__NG_ELEMENT_ID__:De}),Vg=De({__NG_ENV_ID__:De});function di(t){return zu(t,"@Component"),t[ju]||null}function Al(t){return zu(t,"@Directive"),t[Hu]||null}function zg(t){return zu(t,"@Pipe"),t[Uu]||null}function zu(t,n){if(t==null)throw new $(-919,!1)}function tr(t){return typeof t=="string"?t:t==null?"":String(t)}var $g=De({ngErrorCode:De}),Cx=De({ngErrorMessage:De}),xx=De({ngTokenPath:De});function $u(t,n){return Gg("",-200,n)}function Rl(t,n){throw new $(-201,!1)}function Gg(t,n,e){let i=new $(n,t);return i[$g]=n,i[Cx]=t,e&&(i[xx]=e),i}function wx(t){return t[$g]}var Su;function Wg(){return Su}function mt(t){let n=Su;return Su=t,n}function Gu(t,n,e){let i=kl(t);if(i&&i.providedIn=="root")return i.value===void 0?i.value=i.factory():i.value;if(e&8)return null;if(n!==void 0)return n;Rl(t,"")}var Ex={},Ki=Ex,Mx="__NG_DI_FLAG__",ku=class{injector;constructor(n){this.injector=n}retrieve(n,e){let i=Qi(e)||0;try{return this.injector.get(n,i&8?null:Ki,i)}catch(r){if(Kr(r))return r;throw r}}};function Ix(t,n=0){let e=vl();if(e===void 0)throw new $(-203,!1);if(e===null)return Gu(t,void 0,n);{let i=Sx(n),r=e.retrieve(t,i);if(Kr(r)){if(i.optional)return null;throw r}return r}}function R(t,n=0){return(Wg()||Ix)(Ke(t),n)}function d(t,n){return R(t,Qi(n))}function Qi(t){return typeof t>"u"||typeof t=="number"?t:0|(t.optional&&8)|(t.host&&1)|(t.self&&2)|(t.skipSelf&&4)}function Sx(t){return{optional:!!(t&8),host:!!(t&1),self:!!(t&2),skipSelf:!!(t&4)}}function Tu(t){let n=[];for(let e=0;e<t.length;e++){let i=Ke(t[e]);if(Array.isArray(i)){if(i.length===0)throw new $(900,!1);let r,o=0;for(let a=0;a<i.length;a++){let s=i[a],l=kx(s);typeof l=="number"?l===-1?r=s.token:o|=l:r=s}n.push(R(r,o))}else n.push(R(i))}return n}function kx(t){return t[Mx]}function oi(t,n){let e=t.hasOwnProperty(pa);return e?t[pa]:null}function Yg(t,n,e){if(t.length!==n.length)return!1;for(let i=0;i<t.length;i++){let r=t[i],o=n[i];if(e&&(r=e(r),o=e(o)),o!==r)return!1}return!0}function qg(t){return t.flat(Number.POSITIVE_INFINITY)}function Ol(t,n){t.forEach(e=>Array.isArray(e)?Ol(e,n):n(e))}function Wu(t,n,e){n>=t.length?t.push(e):t.splice(n,0,e)}function ya(t,n){return n>=t.length-1?t.pop():t.splice(n,1)[0]}function Zg(t,n){let e=[];for(let i=0;i<t;i++)e.push(n);return e}function Kg(t,n,e,i){let r=t.length;if(r==n)t.push(e,i);else if(r===1)t.push(i,t[0]),t[0]=e;else{for(r--,t.push(t[r-1],t[r]);r>n;){let o=r-2;t[r]=t[o],r--}t[n]=e,t[n+1]=i}}function Nl(t,n,e){let i=Xr(t,n);return i>=0?t[i|1]=e:(i=~i,Kg(t,i,n,e)),i}function Fl(t,n){let e=Xr(t,n);if(e>=0)return t[e|1]}function Xr(t,n){return Tx(t,n,1)}function Tx(t,n,e){let i=0,r=t.length>>e;for(;r!==i;){let o=i+(r-i>>1),a=t[o<<e];if(n===a)return o<<e;a>n?r=o:i=o+1}return~(r<<e)}var rn={},at=[],nr=new b(""),Yu=new b("",-1),qu=new b(""),ga=class{get(n,e=Ki){if(e===Ki){let r=Gg("",-201);throw r.name="\u0275NotFound",r}return e}};function ir(t){return{\u0275providers:t}}function Qg(t){return ir([{provide:nr,multi:!0,useValue:t}])}function Xg(...t){return{\u0275providers:Zu(!0,t),\u0275fromNgModule:!0}}function Zu(t,...n){let e=[],i=new Set,r,o=a=>{e.push(a)};return Ol(n,a=>{let s=a;Cl(s,o,[],i)&&(r||=[],r.push(s))}),r!==void 0&&Jg(r,o),e}function Jg(t,n){for(let e=0;e<t.length;e++){let{ngModule:i,providers:r}=t[e];Ku(r,o=>{n(o,i)})}}function Cl(t,n,e,i){if(t=Ke(t),!t)return!1;let r=null,o=Iu(t),a=!o&&di(t);if(!o&&!a){let l=t.ngModule;if(o=Iu(l),o)r=l;else return!1}else{if(a&&!a.standalone)return!1;r=t}let s=i.has(r);if(a){if(s)return!1;if(i.add(r),a.dependencies){let l=typeof a.dependencies=="function"?a.dependencies():a.dependencies;for(let c of l)Cl(c,n,e,i)}}else if(o){if(o.imports!=null&&!s){i.add(r);let c;Ol(o.imports,u=>{Cl(u,n,e,i)&&(c||=[],c.push(u))}),c!==void 0&&Jg(c,n)}if(!s){let c=oi(r)||(()=>new r);n({provide:r,useFactory:c,deps:at},r),n({provide:qu,useValue:r,multi:!0},r),n({provide:nr,useValue:()=>R(r),multi:!0},r)}let l=o.providers;if(l!=null&&!s){let c=t;Ku(l,u=>{n(u,c)})}}else return!1;return r!==t&&t.providers!==void 0}function Ku(t,n){for(let e of t)Bu(e)&&(e=e.\u0275providers),Array.isArray(e)?Ku(e,n):n(e)}var Ax=De({provide:String,useValue:De});function e_(t){return t!==null&&typeof t=="object"&&Ax in t}function Rx(t){return!!(t&&t.useExisting)}function Ox(t){return!!(t&&t.useFactory)}function Xi(t){return typeof t=="function"}function t_(t){return!!t.useClass}var Da=new b(""),yl={},Bg={},Mu;function Jr(){return Mu===void 0&&(Mu=new ga),Mu}var Ue=class{},Ji=class extends Ue{parent;source;scopes;records=new Map;_ngOnDestroyHooks=new Set;_onDestroyHooks=[];get destroyed(){return this._destroyed}_destroyed=!1;injectorDefTypes;constructor(n,e,i,r){super(),this.parent=e,this.source=i,this.scopes=r,Ru(n,a=>this.processProvider(a)),this.records.set(Yu,Qr(void 0,this)),r.has("environment")&&this.records.set(Ue,Qr(void 0,this));let o=this.records.get(Da);o!=null&&typeof o.value=="string"&&this.scopes.add(o.value),this.injectorDefTypes=new Set(this.get(qu,at,{self:!0}))}retrieve(n,e){let i=Qi(e)||0;try{return this.get(n,Ki,i)}catch(r){if(Kr(r))return r;throw r}}destroy(){ha(this),this._destroyed=!0;let n=W(null);try{for(let i of this._ngOnDestroyHooks)i.ngOnDestroy();let e=this._onDestroyHooks;this._onDestroyHooks=[];for(let i of e)i()}finally{this.records.clear(),this._ngOnDestroyHooks.clear(),this.injectorDefTypes.clear(),W(n)}}onDestroy(n){return ha(this),this._onDestroyHooks.push(n),()=>this.removeOnDestroy(n)}runInContext(n){ha(this);let e=xn(this),i=mt(void 0),r;try{return n()}finally{xn(e),mt(i)}}get(n,e=Ki,i){if(ha(this),n.hasOwnProperty(Vg))return n[Vg](this);let r=Qi(i),o,a=xn(this),s=mt(void 0);try{if(!(r&4)){let c=this.records.get(n);if(c===void 0){let u=Vx(n)&&kl(n);u&&this.injectableDefInScope(u)?c=Qr(Au(n),yl):c=null,this.records.set(n,c)}if(c!=null)return this.hydrate(n,c,r)}let l=r&2?Jr():this.parent;return e=r&8&&e===Ki?null:e,l.get(n,e)}catch(l){let c=wx(l);throw c===-200||c===-201?new $(c,null):l}finally{mt(s),xn(a)}}resolveInjectorInitializers(){let n=W(null),e=xn(this),i=mt(void 0),r;try{let o=this.get(nr,at,{self:!0});for(let a of o)a()}finally{xn(e),mt(i),W(n)}}toString(){return"R3Injector[...]"}processProvider(n){n=Ke(n);let e=Xi(n)?n:Ke(n&&n.provide),i=Fx(n);if(!Xi(n)&&n.multi===!0){let r=this.records.get(e);r||(r=Qr(void 0,yl,!0),r.factory=()=>Tu(r.multi),this.records.set(e,r)),e=n,r.multi.push(n)}this.records.set(e,i)}hydrate(n,e,i){let r=W(null);try{if(e.value===Bg)throw $u("");return e.value===yl&&(e.value=Bg,e.value=e.factory(void 0,i)),typeof e.value=="object"&&e.value&&Lx(e.value)&&this._ngOnDestroyHooks.add(e.value),e.value}finally{W(r)}}injectableDefInScope(n){if(!n.providedIn)return!1;let e=Ke(n.providedIn);return typeof e=="string"?e==="any"||this.scopes.has(e):this.injectorDefTypes.has(e)}removeOnDestroy(n){let e=this._onDestroyHooks.indexOf(n);e!==-1&&this._onDestroyHooks.splice(e,1)}};function Au(t){let n=kl(t),e=n!==null?n.factory:oi(t);if(e!==null)return e;if(t instanceof b)throw new $(-204,!1);if(t instanceof Function)return Nx(t);throw new $(-204,!1)}function Nx(t){if(t.length>0)throw new $(-204,!1);let e=Dx(t);return e!==null?()=>e.factory(t):()=>new t}function Fx(t){if(e_(t))return Qr(void 0,t.useValue);{let n=Qu(t);return Qr(n,yl)}}function Qu(t,n,e){let i;if(Xi(t)){let r=Ke(t);return oi(r)||Au(r)}else if(e_(t))i=()=>Ke(t.useValue);else if(Ox(t))i=()=>t.useFactory(...Tu(t.deps||[]));else if(Rx(t))i=(r,o)=>R(Ke(t.useExisting),o!==void 0&&o&8?8:void 0);else{let r=Ke(t&&(t.useClass||t.provide));if(Px(t))i=()=>new r(...Tu(t.deps));else return oi(r)||Au(r)}return i}function ha(t){if(t.destroyed)throw new $(-205,!1)}function Qr(t,n,e=!1){return{factory:t,value:n,multi:e?[]:void 0}}function Px(t){return!!t.deps}function Lx(t){return t!==null&&typeof t=="object"&&typeof t.ngOnDestroy=="function"}function Vx(t){return typeof t=="function"||typeof t=="object"&&t.ngMetadataName==="InjectionToken"}function Ru(t,n){for(let e of t)Array.isArray(e)?Ru(e,n):e&&Bu(e)?Ru(e.\u0275providers,n):n(e)}function eo(t,n){let e;t instanceof Ji?(ha(t),e=t):e=new ku(t);let i,r=xn(e),o=mt(void 0);try{return n()}finally{xn(r),mt(o)}}function n_(){return Wg()!==void 0||vl()!=null}var on=0,Y=1,J=2,Qe=3,jt=4,pt=5,rr=6,to=7,ze=8,Pn=9,an=10,Ce=11,no=12,Xu=13,or=14,gt=15,ui=16,ar=17,En=18,Ln=19,Ju=20,Fn=21,Pl=22,ai=23,kt=24,sr=25,fi=26,Oe=27,i_=1,ef=6,mi=7,Ca=8,lr=9,He=10;function Vn(t){return Array.isArray(t)&&typeof t[i_]=="object"}function sn(t){return Array.isArray(t)&&t[i_]===!0}function tf(t){return(t.flags&4)!==0}function Bn(t){return t.componentOffset>-1}function io(t){return(t.flags&1)===1}function ln(t){return!!t.template}function ro(t){return(t[J]&512)!==0}function cr(t){return(t[J]&256)===256}var nf="svg",r_="math";function Ht(t){for(;Array.isArray(t);)t=t[on];return t}function rf(t,n){return Ht(n[t])}function cn(t,n){return Ht(n[t.index])}function Ll(t,n){return t.data[n]}function of(t,n){return t[n]}function af(t,n,e,i){e>=t.data.length&&(t.data[e]=null,t.blueprint[e]=null),n[e]=i}function Ut(t,n){let e=n[t];return Vn(e)?e:e[on]}function o_(t){return(t[J]&4)===4}function Vl(t){return(t[J]&128)===128}function a_(t){return sn(t[Qe])}function Tt(t,n){return n==null?null:t[n]}function sf(t){t[ar]=0}function lf(t){t[J]&1024||(t[J]|=1024,Vl(t)&&dr(t))}function s_(t,n){for(;t>0;)n=n[or],t--;return n}function xa(t){return!!(t[J]&9216||t[kt]?.dirty)}function Bl(t){t[an].changeDetectionScheduler?.notify(8),t[J]&64&&(t[J]|=1024),xa(t)&&dr(t)}function dr(t){t[an].changeDetectionScheduler?.notify(0);let n=si(t);for(;n!==null&&!(n[J]&8192||(n[J]|=8192,!Vl(n)));)n=si(n)}function cf(t,n){if(cr(t))throw new $(911,!1);t[Fn]===null&&(t[Fn]=[]),t[Fn].push(n)}function l_(t,n){if(t[Fn]===null)return;let e=t[Fn].indexOf(n);e!==-1&&t[Fn].splice(e,1)}function si(t){let n=t[Qe];return sn(n)?n[Qe]:n}function df(t){return t[to]??=[]}function uf(t){return t.cleanup??=[]}function c_(t,n,e,i){let r=df(n);r.push(e),t.firstCreatePass&&uf(t).push(i,r.length-1)}var re={lFrame:C_(null),bindingsEnabled:!0,skipHydrationRootTNode:null};var Ou=!1;function d_(){return re.lFrame.elementDepthCount}function u_(){re.lFrame.elementDepthCount++}function ff(){re.lFrame.elementDepthCount--}function jl(){return re.bindingsEnabled}function mf(){return re.skipHydrationRootTNode!==null}function hf(t){return re.skipHydrationRootTNode===t}function pf(){re.skipHydrationRootTNode=null}function X(){return re.lFrame.lView}function Se(){return re.lFrame.tView}function te(t){return re.lFrame.contextLView=t,t[ze]}function ne(t){return re.lFrame.contextLView=null,t}function Xe(){let t=gf();for(;t!==null&&t.type===64;)t=t.parent;return t}function gf(){return re.lFrame.currentTNode}function f_(){let t=re.lFrame,n=t.currentTNode;return t.isParent?n:n.parent}function oo(t,n){let e=re.lFrame;e.currentTNode=t,e.isParent=n}function _f(){return re.lFrame.isParent}function bf(){re.lFrame.isParent=!1}function m_(){return re.lFrame.contextLView}function vf(){return Ou}function _a(t){let n=Ou;return Ou=t,n}function h_(){let t=re.lFrame,n=t.bindingRootIndex;return n===-1&&(n=t.bindingRootIndex=t.tView.bindingStartIndex),n}function p_(){return re.lFrame.bindingIndex}function g_(t){return re.lFrame.bindingIndex=t}function hi(){return re.lFrame.bindingIndex++}function Hl(t){let n=re.lFrame,e=n.bindingIndex;return n.bindingIndex=n.bindingIndex+t,e}function __(){return re.lFrame.inI18n}function b_(t,n){let e=re.lFrame;e.bindingIndex=e.bindingRootIndex=t,Ul(n)}function v_(){return re.lFrame.currentDirectiveIndex}function Ul(t){re.lFrame.currentDirectiveIndex=t}function y_(t){let n=re.lFrame.currentDirectiveIndex;return n===-1?null:t[n]}function zl(){return re.lFrame.currentQueryIndex}function wa(t){re.lFrame.currentQueryIndex=t}function Bx(t){let n=t[Y];return n.type===2?n.declTNode:n.type===1?t[pt]:null}function yf(t,n,e){if(e&4){let r=n,o=t;for(;r=r.parent,r===null&&!(e&1);)if(r=Bx(o),r===null||(o=o[or],r.type&10))break;if(r===null)return!1;n=r,t=o}let i=re.lFrame=D_();return i.currentTNode=n,i.lView=t,!0}function $l(t){let n=D_(),e=t[Y];re.lFrame=n,n.currentTNode=e.firstChild,n.lView=t,n.tView=e,n.contextLView=t,n.bindingIndex=e.bindingStartIndex,n.inI18n=!1}function D_(){let t=re.lFrame,n=t===null?null:t.child;return n===null?C_(t):n}function C_(t){let n={currentTNode:null,isParent:!0,lView:null,tView:null,selectedIndex:-1,contextLView:null,elementDepthCount:0,currentNamespace:null,currentDirectiveIndex:-1,bindingRootIndex:-1,bindingIndex:-1,currentQueryIndex:0,parent:t,child:null,inI18n:!1};return t!==null&&(t.child=n),n}function x_(){let t=re.lFrame;return re.lFrame=t.parent,t.currentTNode=null,t.lView=null,t}var Df=x_;function Gl(){let t=x_();t.isParent=!0,t.tView=null,t.selectedIndex=-1,t.contextLView=null,t.elementDepthCount=0,t.currentDirectiveIndex=-1,t.currentNamespace=null,t.bindingRootIndex=-1,t.bindingIndex=-1,t.currentQueryIndex=0}function w_(t){return(re.lFrame.contextLView=s_(t,re.lFrame.contextLView))[ze]}function Mn(){return re.lFrame.selectedIndex}function pi(t){re.lFrame.selectedIndex=t}function Ea(){let t=re.lFrame;return Ll(t.tView,t.selectedIndex)}function yt(){re.lFrame.currentNamespace=nf}function jn(){jx()}function jx(){re.lFrame.currentNamespace=null}function E_(){return re.lFrame.currentNamespace}var M_=!0;function Wl(){return M_}function Ma(t){M_=t}function Nu(t,n=null,e=null,i){let r=I_(t,n,e,i);return r.resolveInjectorInitializers(),r}function I_(t,n=null,e=null,i,r=new Set){let o=[e||at,Xg(t)],a;return new Ji(o,n||Jr(),a||null,r)}var G=class t{static THROW_IF_NOT_FOUND=Ki;static NULL=new ga;static create(n,e){if(Array.isArray(n))return Nu({name:""},e,n,"");{let i=n.name??"";return Nu({name:i},n.parent,n.providers,i)}}static \u0275prov=y({token:t,providedIn:"any",factory:()=>R(Yu)});static __NG_ELEMENT_ID__=-1},H=new b(""),At=(()=>{class t{static __NG_ELEMENT_ID__=Hx;static __NG_ENV_ID__=e=>e}return t})(),xl=class extends At{_lView;constructor(n){super(),this._lView=n}get destroyed(){return cr(this._lView)}onDestroy(n){let e=this._lView;return cf(e,n),()=>l_(e,n)}};function Hx(){return new xl(X())}var S_=!1,k_=new b(""),ur=(()=>{class t{taskId=0;pendingTasks=new Set;destroyed=!1;pendingTask=new zi(!1);debugTaskTracker=d(k_,{optional:!0});get hasPendingTasks(){return this.destroyed?!1:this.pendingTask.value}get hasPendingTasksObservable(){return this.destroyed?new le(e=>{e.next(!1),e.complete()}):this.pendingTask}add(){!this.hasPendingTasks&&!this.destroyed&&this.pendingTask.next(!0);let e=this.taskId++;return this.pendingTasks.add(e),this.debugTaskTracker?.add(e),e}has(e){return this.pendingTasks.has(e)}remove(e){this.pendingTasks.delete(e),this.debugTaskTracker?.remove(e),this.pendingTasks.size===0&&this.hasPendingTasks&&this.pendingTask.next(!1)}ngOnDestroy(){this.pendingTasks.clear(),this.hasPendingTasks&&this.pendingTask.next(!1),this.destroyed=!0,this.pendingTask.unsubscribe()}static \u0275prov=y({token:t,providedIn:"root",factory:()=>new t})}return t})(),Fu=class extends E{__isAsync;destroyRef=void 0;pendingTasks=void 0;constructor(n=!1){super(),this.__isAsync=n,n_()&&(this.destroyRef=d(At,{optional:!0})??void 0,this.pendingTasks=d(ur,{optional:!0})??void 0)}emit(n){let e=W(null);try{super.next(n)}finally{W(e)}}subscribe(n,e,i){let r=n,o=e||(()=>null),a=i;if(n&&typeof n=="object"){let l=n;r=l.next?.bind(l),o=l.error?.bind(l),a=l.complete?.bind(l)}this.__isAsync&&(o=this.wrapInTimeout(o),r&&(r=this.wrapInTimeout(r)),a&&(a=this.wrapInTimeout(a)));let s=super.subscribe({next:r,error:o,complete:a});return n instanceof ue&&n.add(s),s}wrapInTimeout(n){return e=>{let i=this.pendingTasks?.add();setTimeout(()=>{try{n(e)}finally{i!==void 0&&this.pendingTasks?.remove(i)}})}}},F=Fu;function wl(...t){}function Cf(t){let n,e;function i(){t=wl;try{e!==void 0&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(e),n!==void 0&&clearTimeout(n)}catch{}}return n=setTimeout(()=>{t(),i()}),typeof requestAnimationFrame=="function"&&(e=requestAnimationFrame(()=>{t(),i()})),()=>i()}function T_(t){return queueMicrotask(()=>t()),()=>{t=wl}}var xf="isAngularZone",ba=xf+"_ID",Ux=0,A=class t{hasPendingMacrotasks=!1;hasPendingMicrotasks=!1;isStable=!0;onUnstable=new F(!1);onMicrotaskEmpty=new F(!1);onStable=new F(!1);onError=new F(!1);constructor(n){let{enableLongStackTrace:e=!1,shouldCoalesceEventChangeDetection:i=!1,shouldCoalesceRunChangeDetection:r=!1,scheduleInRootZone:o=S_}=n;if(typeof Zone>"u")throw new $(908,!1);Zone.assertZonePatched();let a=this;a._nesting=0,a._outer=a._inner=Zone.current,Zone.TaskTrackingZoneSpec&&(a._inner=a._inner.fork(new Zone.TaskTrackingZoneSpec)),e&&Zone.longStackTraceZoneSpec&&(a._inner=a._inner.fork(Zone.longStackTraceZoneSpec)),a.shouldCoalesceEventChangeDetection=!r&&i,a.shouldCoalesceRunChangeDetection=r,a.callbackScheduled=!1,a.scheduleInRootZone=o,Gx(a)}static isInAngularZone(){return typeof Zone<"u"&&Zone.current.get(xf)===!0}static assertInAngularZone(){if(!t.isInAngularZone())throw new $(909,!1)}static assertNotInAngularZone(){if(t.isInAngularZone())throw new $(909,!1)}run(n,e,i){return this._inner.run(n,e,i)}runTask(n,e,i,r){let o=this._inner,a=o.scheduleEventTask("NgZoneEvent: "+r,n,zx,wl,wl);try{return o.runTask(a,e,i)}finally{o.cancelTask(a)}}runGuarded(n,e,i){return this._inner.runGuarded(n,e,i)}runOutsideAngular(n){return this._outer.run(n)}},zx={};function wf(t){if(t._nesting==0&&!t.hasPendingMicrotasks&&!t.isStable)try{t._nesting++,t.onMicrotaskEmpty.emit(null)}finally{if(t._nesting--,!t.hasPendingMicrotasks)try{t.runOutsideAngular(()=>t.onStable.emit(null))}finally{t.isStable=!0}}}function $x(t){if(t.isCheckStableRunning||t.callbackScheduled)return;t.callbackScheduled=!0;function n(){Cf(()=>{t.callbackScheduled=!1,Pu(t),t.isCheckStableRunning=!0,wf(t),t.isCheckStableRunning=!1})}t.scheduleInRootZone?Zone.root.run(()=>{n()}):t._outer.run(()=>{n()}),Pu(t)}function Gx(t){let n=()=>{$x(t)},e=Ux++;t._inner=t._inner.fork({name:"angular",properties:{[xf]:!0,[ba]:e,[ba+e]:!0},onInvokeTask:(i,r,o,a,s,l)=>{if(Wx(l))return i.invokeTask(o,a,s,l);try{return jg(t),i.invokeTask(o,a,s,l)}finally{(t.shouldCoalesceEventChangeDetection&&a.type==="eventTask"||t.shouldCoalesceRunChangeDetection)&&n(),Hg(t)}},onInvoke:(i,r,o,a,s,l,c)=>{try{return jg(t),i.invoke(o,a,s,l,c)}finally{t.shouldCoalesceRunChangeDetection&&!t.callbackScheduled&&!Yx(l)&&n(),Hg(t)}},onHasTask:(i,r,o,a)=>{i.hasTask(o,a),r===o&&(a.change=="microTask"?(t._hasPendingMicrotasks=a.microTask,Pu(t),wf(t)):a.change=="macroTask"&&(t.hasPendingMacrotasks=a.macroTask))},onHandleError:(i,r,o,a)=>(i.handleError(o,a),t.runOutsideAngular(()=>t.onError.emit(a)),!1)})}function Pu(t){t._hasPendingMicrotasks||(t.shouldCoalesceEventChangeDetection||t.shouldCoalesceRunChangeDetection)&&t.callbackScheduled===!0?t.hasPendingMicrotasks=!0:t.hasPendingMicrotasks=!1}function jg(t){t._nesting++,t.isStable&&(t.isStable=!1,t.onUnstable.emit(null))}function Hg(t){t._nesting--,wf(t)}var va=class{hasPendingMicrotasks=!1;hasPendingMacrotasks=!1;isStable=!0;onUnstable=new F;onMicrotaskEmpty=new F;onStable=new F;onError=new F;run(n,e,i){return n.apply(e,i)}runGuarded(n,e,i){return n.apply(e,i)}runOutsideAngular(n){return n()}runTask(n,e,i,r){return n.apply(e,i)}};function Wx(t){return A_(t,"__ignore_ng_zone__")}function Yx(t){return A_(t,"__scheduler_tick__")}function A_(t,n){return!Array.isArray(t)||t.length!==1?!1:t[0]?.data?.[n]===!0}var st=class{_console=console;handleError(n){this._console.error("ERROR",n)}},Hn=new b("",{factory:()=>{let t=d(A),n=d(Ue),e;return i=>{t.runOutsideAngular(()=>{n.destroyed&&!e?setTimeout(()=>{throw i}):(e??=n.get(st),e.handleError(i))})}}}),R_={provide:nr,useValue:()=>{let t=d(st,{optional:!0})},multi:!0},qx=new b("",{factory:()=>{let t=d(H).defaultView;if(!t)return;let n=d(Hn),e=o=>{n(o.reason),o.preventDefault()},i=o=>{o.error?n(o.error):n(new Error(o.message,{cause:o})),o.preventDefault()},r=()=>{t.addEventListener("unhandledrejection",e),t.addEventListener("error",i)};typeof Zone<"u"?Zone.root.run(r):r(),d(At).onDestroy(()=>{t.removeEventListener("error",i),t.removeEventListener("unhandledrejection",e)})}});function Ef(){return ir([Qg(()=>{d(qx)})])}function x(t,n){let[e,i,r]=du(t,n?.equal),o=e,a=o[Ze];return o.set=i,o.update=r,o.asReadonly=Mf.bind(o),o}function Mf(){let t=this[Ze];if(t.readonlyFn===void 0){let n=()=>this();n[Ze]=t,t.readonlyFn=n}return t.readonlyFn}var ao=(()=>{class t{view;node;constructor(e,i){this.view=e,this.node=i}static __NG_ELEMENT_ID__=Zx}return t})();function Zx(){return new ao(X(),Xe())}var wn=class{},Ia=new b("",{factory:()=>!0});var If=new b(""),Sa=(()=>{class t{internalPendingTasks=d(ur);scheduler=d(wn);errorHandler=d(Hn);add(){let e=this.internalPendingTasks.add();return()=>{this.internalPendingTasks.has(e)&&(this.scheduler.notify(11),this.internalPendingTasks.remove(e))}}run(e){let i=this.add();e().catch(this.errorHandler).finally(i)}static \u0275prov=y({token:t,providedIn:"root",factory:()=>new t})}return t})(),Yl=(()=>{class t{static \u0275prov=y({token:t,providedIn:"root",factory:()=>new Lu})}return t})(),Lu=class{dirtyEffectCount=0;queues=new Map;add(n){this.enqueue(n),this.schedule(n)}schedule(n){n.dirty&&this.dirtyEffectCount++}remove(n){let e=n.zone,i=this.queues.get(e);i.has(n)&&(i.delete(n),n.dirty&&this.dirtyEffectCount--)}enqueue(n){let e=n.zone;this.queues.has(e)||this.queues.set(e,new Set);let i=this.queues.get(e);i.has(n)||i.add(n)}flush(){for(;this.dirtyEffectCount>0;){let n=!1;for(let[e,i]of this.queues)e===null?n||=this.flushQueue(i):n||=e.run(()=>this.flushQueue(i));n||(this.dirtyEffectCount=0)}}flushQueue(n){let e=!1;for(let i of n)i.dirty&&(this.dirtyEffectCount--,e=!0,i.run());return e}},El=class{[Ze];constructor(n){this[Ze]=n}destroy(){this[Ze].destroy()}};function dn(t,n){let e=n?.injector??d(G),i=n?.manualCleanup!==!0?e.get(At):null,r,o=e.get(ao,null,{optional:!0}),a=e.get(wn);return o!==null?(r=Xx(o.view,a,t),i instanceof xl&&i._lView===o.view&&(i=null)):r=Jx(t,e.get(Yl),a),r.injector=e,i!==null&&(r.onDestroyFns=[i.onDestroy(()=>r.destroy())]),new El(r)}var O_=ae(w({},fu),{cleanupFns:void 0,zone:null,onDestroyFns:null,run(){let t=_a(!1);try{mu(this)}finally{_a(t)}},cleanup(){if(!this.cleanupFns?.length)return;let t=W(null);try{for(;this.cleanupFns.length;)this.cleanupFns.pop()()}finally{this.cleanupFns=[],W(t)}}}),Kx=ae(w({},O_),{consumerMarkedDirty(){this.scheduler.schedule(this),this.notifier.notify(12)},destroy(){if(ii(this),this.onDestroyFns!==null)for(let t of this.onDestroyFns)t();this.cleanup(),this.scheduler.remove(this)}}),Qx=ae(w({},O_),{consumerMarkedDirty(){this.view[J]|=8192,dr(this.view),this.notifier.notify(13)},destroy(){if(ii(this),this.onDestroyFns!==null)for(let t of this.onDestroyFns)t();this.cleanup(),this.view[ai]?.delete(this)}});function Xx(t,n,e){let i=Object.create(Qx);return i.view=t,i.zone=typeof Zone<"u"?Zone.current:null,i.notifier=n,i.fn=N_(i,e),t[ai]??=new Set,t[ai].add(i),i.consumerMarkedDirty(i),i}function Jx(t,n,e){let i=Object.create(Kx);return i.fn=N_(i,t),i.scheduler=n,i.notifier=e,i.zone=typeof Zone<"u"?Zone.current:null,i.scheduler.add(i),i.notifier.notify(12),i}function N_(t,n){return()=>{n(e=>(t.cleanupFns??=[]).push(e))}}function Va(t){return{toString:t}.toString()}function lw(t){return typeof t=="function"}function hb(t,n,e,i){n!==null?n.applyValueToInputSignal(n,i):t[e]=i}var ic=class{previousValue;currentValue;firstChange;constructor(n,e,i){this.previousValue=n,this.currentValue=e,this.firstChange=i}isFirstChange(){return this.firstChange}},We=(()=>{let t=()=>pb;return t.ngInherit=!0,t})();function pb(t){return t.type.prototype.ngOnChanges&&(t.setInput=dw),cw}function cw(){let t=_b(this),n=t?.current;if(n){let e=t.previous;if(e===rn)t.previous=n;else for(let i in n)e[i]=n[i];t.current=null,this.ngOnChanges(n)}}function dw(t,n,e,i,r){let o=this.declaredInputs[i],a=_b(t)||uw(t,{previous:rn,current:null}),s=a.current||(a.current={}),l=a.previous,c=l[o];s[o]=new ic(c&&c.currentValue,e,l===rn),hb(t,n,r,e)}var gb="__ngSimpleChanges__";function _b(t){return t[gb]||null}function uw(t,n){return t[gb]=n}var F_=[];var ge=function(t,n=null,e){for(let i=0;i<F_.length;i++){let r=F_[i];r(t,n,e)}},he=(function(t){return t[t.TemplateCreateStart=0]="TemplateCreateStart",t[t.TemplateCreateEnd=1]="TemplateCreateEnd",t[t.TemplateUpdateStart=2]="TemplateUpdateStart",t[t.TemplateUpdateEnd=3]="TemplateUpdateEnd",t[t.LifecycleHookStart=4]="LifecycleHookStart",t[t.LifecycleHookEnd=5]="LifecycleHookEnd",t[t.OutputStart=6]="OutputStart",t[t.OutputEnd=7]="OutputEnd",t[t.BootstrapApplicationStart=8]="BootstrapApplicationStart",t[t.BootstrapApplicationEnd=9]="BootstrapApplicationEnd",t[t.BootstrapComponentStart=10]="BootstrapComponentStart",t[t.BootstrapComponentEnd=11]="BootstrapComponentEnd",t[t.ChangeDetectionStart=12]="ChangeDetectionStart",t[t.ChangeDetectionEnd=13]="ChangeDetectionEnd",t[t.ChangeDetectionSyncStart=14]="ChangeDetectionSyncStart",t[t.ChangeDetectionSyncEnd=15]="ChangeDetectionSyncEnd",t[t.AfterRenderHooksStart=16]="AfterRenderHooksStart",t[t.AfterRenderHooksEnd=17]="AfterRenderHooksEnd",t[t.ComponentStart=18]="ComponentStart",t[t.ComponentEnd=19]="ComponentEnd",t[t.DeferBlockStateStart=20]="DeferBlockStateStart",t[t.DeferBlockStateEnd=21]="DeferBlockStateEnd",t[t.DynamicComponentStart=22]="DynamicComponentStart",t[t.DynamicComponentEnd=23]="DynamicComponentEnd",t[t.HostBindingsUpdateStart=24]="HostBindingsUpdateStart",t[t.HostBindingsUpdateEnd=25]="HostBindingsUpdateEnd",t})(he||{});function fw(t,n,e){let{ngOnChanges:i,ngOnInit:r,ngDoCheck:o}=n.type.prototype;if(i){let a=pb(n);(e.preOrderHooks??=[]).push(t,a),(e.preOrderCheckHooks??=[]).push(t,a)}r&&(e.preOrderHooks??=[]).push(0-t,r),o&&((e.preOrderHooks??=[]).push(t,o),(e.preOrderCheckHooks??=[]).push(t,o))}function bb(t,n){for(let e=n.directiveStart,i=n.directiveEnd;e<i;e++){let o=t.data[e].type.prototype,{ngAfterContentInit:a,ngAfterContentChecked:s,ngAfterViewInit:l,ngAfterViewChecked:c,ngOnDestroy:u}=o;a&&(t.contentHooks??=[]).push(-e,a),s&&((t.contentHooks??=[]).push(e,s),(t.contentCheckHooks??=[]).push(e,s)),l&&(t.viewHooks??=[]).push(-e,l),c&&((t.viewHooks??=[]).push(e,c),(t.viewCheckHooks??=[]).push(e,c)),u!=null&&(t.destroyHooks??=[]).push(e,u)}}function Xl(t,n,e){vb(t,n,3,e)}function Jl(t,n,e,i){(t[J]&3)===e&&vb(t,n,e,i)}function Sf(t,n){let e=t[J];(e&3)===n&&(e&=16383,e+=1,t[J]=e)}function vb(t,n,e,i){let r=i!==void 0?t[ar]&65535:0,o=i??-1,a=n.length-1,s=0;for(let l=r;l<a;l++)if(typeof n[l+1]=="number"){if(s=n[l],i!=null&&s>=i)break}else n[l]<0&&(t[ar]+=65536),(s<o||o==-1)&&(mw(t,e,n,l),t[ar]=(t[ar]&4294901760)+l+2),l++}function P_(t,n){ge(he.LifecycleHookStart,t,n);let e=W(null);try{n.call(t)}finally{W(e),ge(he.LifecycleHookEnd,t,n)}}function mw(t,n,e,i){let r=e[i]<0,o=e[i+1],a=r?-e[i]:e[i],s=t[a];r?t[J]>>14<t[ar]>>16&&(t[J]&3)===n&&(t[J]+=16384,P_(s,o)):P_(s,o)}var lo=-1,mr=class{factory;name;injectImpl;resolving=!1;canSeeViewProviders;multi;componentProviders;index;providerFactory;constructor(n,e,i,r){this.factory=n,this.name=r,this.canSeeViewProviders=e,this.injectImpl=i}};function hw(t){return(t.flags&8)!==0}function pw(t){return(t.flags&16)!==0}function gw(t,n,e){let i=0;for(;i<e.length;){let r=e[i];if(typeof r=="number"){if(r!==0)break;i++;let o=e[i++],a=e[i++],s=e[i++];t.setAttribute(n,a,s,o)}else{let o=r,a=e[++i];_w(o)?t.setProperty(n,o,a):t.setAttribute(n,o,a),i++}}return i}function yb(t){return t===3||t===4||t===6}function _w(t){return t.charCodeAt(0)===64}function co(t,n){if(!(n===null||n.length===0))if(t===null||t.length===0)t=n.slice();else{let e=-1;for(let i=0;i<n.length;i++){let r=n[i];typeof r=="number"?e=r:e===0||(e===-1||e===2?L_(t,e,r,null,n[++i]):L_(t,e,r,null,null))}}return t}function L_(t,n,e,i,r){let o=0,a=t.length;if(n===-1)a=-1;else for(;o<t.length;){let s=t[o++];if(typeof s=="number"){if(s===n){a=-1;break}else if(s>n){a=o-1;break}}}for(;o<t.length;){let s=t[o];if(typeof s=="number")break;if(s===e){r!==null&&(t[o+1]=r);return}o++,r!==null&&o++}a!==-1&&(t.splice(a,0,n),o=a+1),t.splice(o++,0,e),r!==null&&t.splice(o++,0,r)}function Db(t){return t!==lo}function rc(t){return t&32767}function bw(t){return t>>16}function oc(t,n){let e=bw(t),i=n;for(;e>0;)i=i[or],e--;return i}var Vf=!0;function ac(t){let n=Vf;return Vf=t,n}var vw=256,Cb=vw-1,xb=5,yw=0,In={};function Dw(t,n,e){let i;typeof e=="string"?i=e.charCodeAt(0)||0:e.hasOwnProperty(er)&&(i=e[er]),i==null&&(i=e[er]=yw++);let r=i&Cb,o=1<<r;n.data[t+(r>>xb)]|=o}function sc(t,n){let e=wb(t,n);if(e!==-1)return e;let i=n[Y];i.firstCreatePass&&(t.injectorIndex=n.length,kf(i.data,t),kf(n,null),kf(i.blueprint,null));let r=xm(t,n),o=t.injectorIndex;if(Db(r)){let a=rc(r),s=oc(r,n),l=s[Y].data;for(let c=0;c<8;c++)n[o+c]=s[a+c]|l[a+c]}return n[o+8]=r,o}function kf(t,n){t.push(0,0,0,0,0,0,0,0,n)}function wb(t,n){return t.injectorIndex===-1||t.parent&&t.parent.injectorIndex===t.injectorIndex||n[t.injectorIndex+8]===null?-1:t.injectorIndex}function xm(t,n){if(t.parent&&t.parent.injectorIndex!==-1)return t.parent.injectorIndex;let e=0,i=null,r=n;for(;r!==null;){if(i=kb(r),i===null)return lo;if(e++,r=r[or],i.injectorIndex!==-1)return i.injectorIndex|e<<16}return lo}function Bf(t,n,e){Dw(t,n,e)}function Cw(t,n){if(n==="class")return t.classes;if(n==="style")return t.styles;let e=t.attrs;if(e){let i=e.length,r=0;for(;r<i;){let o=e[r];if(yb(o))break;if(o===0)r=r+2;else if(typeof o=="number")for(r++;r<i&&typeof e[r]=="string";)r++;else{if(o===n)return e[r+1];r=r+2}}}return null}function Eb(t,n,e){if(e&8||t!==void 0)return t;Rl(n,"NodeInjector")}function Mb(t,n,e,i){if(e&8&&i===void 0&&(i=null),(e&3)===0){let r=t[Pn],o=mt(void 0);try{return r?r.get(n,i,e&8):Gu(n,i,e&8)}finally{mt(o)}}return Eb(i,n,e)}function Ib(t,n,e,i=0,r){if(t!==null){if(n[J]&2048&&!(i&2)){let a=Mw(t,n,e,i,In);if(a!==In)return a}let o=Sb(t,n,e,i,In);if(o!==In)return o}return Mb(n,e,i,r)}function Sb(t,n,e,i,r){let o=ww(e);if(typeof o=="function"){if(!yf(n,t,i))return i&1?Eb(r,e,i):Mb(n,e,i,r);try{let a;if(a=o(i),a==null&&!(i&8))Rl(e);else return a}finally{Df()}}else if(typeof o=="number"){let a=null,s=wb(t,n),l=lo,c=i&1?n[gt][pt]:null;for((s===-1||i&4)&&(l=s===-1?xm(t,n):n[s+8],l===lo||!B_(i,!1)?s=-1:(a=n[Y],s=rc(l),n=oc(l,n)));s!==-1;){let u=n[Y];if(V_(o,s,u.data)){let f=xw(s,n,e,a,i,c);if(f!==In)return f}l=n[s+8],l!==lo&&B_(i,n[Y].data[s+8]===c)&&V_(o,s,n)?(a=u,s=rc(l),n=oc(l,n)):s=-1}}return r}function xw(t,n,e,i,r,o){let a=n[Y],s=a.data[t+8],l=i==null?Bn(s)&&Vf:i!=a&&(s.type&3)!==0,c=r&1&&o===s,u=ec(s,a,e,l,c);return u!==null?Ra(n,a,u,s,r):In}function ec(t,n,e,i,r){let o=t.providerIndexes,a=n.data,s=o&1048575,l=t.directiveStart,c=t.directiveEnd,u=o>>20,f=i?s:s+u,g=r?s+u:c;for(let p=f;p<g;p++){let v=a[p];if(p<l&&e===v||p>=l&&v.type===e)return p}if(r){let p=a[l];if(p&&ln(p)&&p.type===e)return l}return null}function Ra(t,n,e,i,r){let o=t[e],a=n.data;if(o instanceof mr){let s=o;if(s.resolving)throw $u("");let l=ac(s.canSeeViewProviders);s.resolving=!0;let c=a[e].type||a[e],u,f=s.injectImpl?mt(s.injectImpl):null,g=yf(t,i,0);try{o=t[e]=s.factory(void 0,r,a,t,i),n.firstCreatePass&&e>=i.directiveStart&&fw(e,a[e],n)}finally{f!==null&&mt(f),ac(l),s.resolving=!1,Df()}}return o}function ww(t){if(typeof t=="string")return t.charCodeAt(0)||0;let n=t.hasOwnProperty(er)?t[er]:void 0;return typeof n=="number"?n>=0?n&Cb:Ew:n}function V_(t,n,e){let i=1<<t;return!!(e[n+(t>>xb)]&i)}function B_(t,n){return!(t&2)&&!(t&1&&n)}var fr=class{_tNode;_lView;constructor(n,e){this._tNode=n,this._lView=e}get(n,e,i){return Ib(this._tNode,this._lView,n,Qi(i),e)}};function Ew(){return new fr(Xe(),X())}function Rt(t){return Va(()=>{let n=t.prototype.constructor,e=n[pa]||jf(n),i=Object.prototype,r=Object.getPrototypeOf(t.prototype).constructor;for(;r&&r!==i;){let o=r[pa]||jf(r);if(o&&o!==e)return o;r=Object.getPrototypeOf(r)}return o=>new o})}function jf(t){return Vu(t)?()=>{let n=jf(Ke(t));return n&&n()}:oi(t)}function Mw(t,n,e,i,r){let o=t,a=n;for(;o!==null&&a!==null&&a[J]&2048&&!ro(a);){let s=Sb(o,a,e,i|2,In);if(s!==In)return s;let l=o.parent;if(!l){let c=a[Ju];if(c){let u=c.get(e,In,i&-5);if(u!==In)return u}l=kb(a),a=a[or]}o=l}return r}function kb(t){let n=t[Y],e=n.type;return e===2?n.declTNode:e===1?t[pt]:null}function wm(t){return Cw(Xe(),t)}function Iw(){return go(Xe(),X())}function go(t,n){return new L(cn(t,n))}var L=(()=>{class t{nativeElement;constructor(e){this.nativeElement=e}static __NG_ELEMENT_ID__=Iw}return t})();function Tb(t){return t instanceof L?t.nativeElement:t}function Sw(){return this._results[Symbol.iterator]()}var Un=class{_emitDistinctChangesOnly;dirty=!0;_onDirty=void 0;_results=[];_changesDetected=!1;_changes=void 0;length=0;first=void 0;last=void 0;get changes(){return this._changes??=new E}constructor(n=!1){this._emitDistinctChangesOnly=n}get(n){return this._results[n]}map(n){return this._results.map(n)}filter(n){return this._results.filter(n)}find(n){return this._results.find(n)}reduce(n,e){return this._results.reduce(n,e)}forEach(n){this._results.forEach(n)}some(n){return this._results.some(n)}toArray(){return this._results.slice()}toString(){return this._results.toString()}reset(n,e){this.dirty=!1;let i=qg(n);(this._changesDetected=!Yg(this._results,i,e))&&(this._results=i,this.length=i.length,this.last=i[this.length-1],this.first=i[0])}notifyOnChanges(){this._changes!==void 0&&(this._changesDetected||!this._emitDistinctChangesOnly)&&this._changes.next(this)}onDirty(n){this._onDirty=n}setDirty(){this.dirty=!0,this._onDirty?.()}destroy(){this._changes!==void 0&&(this._changes.complete(),this._changes.unsubscribe())}[Symbol.iterator]=Sw};function Ab(t){return(t.flags&128)===128}var Em=(function(t){return t[t.OnPush=0]="OnPush",t[t.Eager=1]="Eager",t[t.Default=1]="Default",t})(Em||{}),Rb=new Map,kw=0;function Tw(){return kw++}function Aw(t){Rb.set(t[Ln],t)}function Hf(t){Rb.delete(t[Ln])}var j_="__ngContext__";function uo(t,n){Vn(n)?(t[j_]=n[Ln],Aw(n)):t[j_]=n}function Ob(t){return Fb(t[no])}function Nb(t){return Fb(t[jt])}function Fb(t){for(;t!==null&&!sn(t);)t=t[jt];return t}var Uf;function Mm(t){Uf=t}function Pb(){if(Uf!==void 0)return Uf;if(typeof document<"u")return document;throw new $(210,!1)}var bi=new b("",{factory:()=>Rw}),Rw="ng";var gc=new b(""),gr=new b("",{providedIn:"platform",factory:()=>"unknown"}),Ba=new b(""),_r=new b("",{factory:()=>d(H).body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce")||null});var Lb="r";var Vb="di";var Bb=!1,jb=new b("",{factory:()=>Bb});var Ow=(t,n,e,i)=>{};function Nw(t,n,e,i){Ow(t,n,e,i)}function _c(t){return(t.flags&32)===32}var Fw=()=>null;function Hb(t,n,e=!1){return Fw(t,n,e)}function Ub(t,n){let e=t.contentQueries;if(e!==null){let i=W(null);try{for(let r=0;r<e.length;r+=2){let o=e[r],a=e[r+1];if(a!==-1){let s=t.data[a];wa(o),s.contentQueries(2,n[a],a)}}}finally{W(i)}}}function zf(t,n,e){wa(0);let i=W(null);try{n(t,e)}finally{W(i)}}function Im(t,n,e){if(tf(n)){let i=W(null);try{let r=n.directiveStart,o=n.directiveEnd;for(let a=r;a<o;a++){let s=t.data[a];if(s.contentQueries){let l=e[a];s.contentQueries(1,l,a)}}}finally{W(i)}}}var mn=(function(t){return t[t.Emulated=0]="Emulated",t[t.None=2]="None",t[t.ShadowDom=3]="ShadowDom",t[t.ExperimentalIsolatedShadowDom=4]="ExperimentalIsolatedShadowDom",t})(mn||{});var ql;function Pw(){if(ql===void 0&&(ql=null,ci.trustedTypes))try{ql=ci.trustedTypes.createPolicy("angular",{createHTML:t=>t,createScript:t=>t,createScriptURL:t=>t})}catch{}return ql}function bc(t){return Pw()?.createHTML(t)||t}var Zl;function Lw(){if(Zl===void 0&&(Zl=null,ci.trustedTypes))try{Zl=ci.trustedTypes.createPolicy("angular#unsafe-bypass",{createHTML:t=>t,createScript:t=>t,createScriptURL:t=>t})}catch{}return Zl}function H_(t){return Lw()?.createHTML(t)||t}var zn=class{changingThisBreaksApplicationSecurity;constructor(n){this.changingThisBreaksApplicationSecurity=n}toString(){return`SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${Ml})`}},$f=class extends zn{getTypeName(){return"HTML"}},Gf=class extends zn{getTypeName(){return"Style"}},Wf=class extends zn{getTypeName(){return"Script"}},Yf=class extends zn{getTypeName(){return"URL"}},qf=class extends zn{getTypeName(){return"ResourceURL"}};function hn(t){return t instanceof zn?t.changingThisBreaksApplicationSecurity:t}function $n(t,n){let e=zb(t);if(e!=null&&e!==n){if(e==="ResourceURL"&&n==="URL")return!0;throw new Error(`Required a safe ${n}, got a ${e} (see ${Ml})`)}return e===n}function zb(t){return t instanceof zn&&t.getTypeName()||null}function Sm(t){return new $f(t)}function km(t){return new Gf(t)}function Tm(t){return new Wf(t)}function Am(t){return new Yf(t)}function Rm(t){return new qf(t)}function Vw(t){let n=new Kf(t);return Bw()?new Zf(n):n}var Zf=class{inertDocumentHelper;constructor(n){this.inertDocumentHelper=n}getInertBodyElement(n){n="<body><remove></remove>"+n;try{let e=new window.DOMParser().parseFromString(bc(n),"text/html").body;return e===null?this.inertDocumentHelper.getInertBodyElement(n):(e.firstChild?.remove(),e)}catch{return null}}},Kf=class{defaultDoc;inertDocument;constructor(n){this.defaultDoc=n,this.inertDocument=this.defaultDoc.implementation.createHTMLDocument("sanitization-inert")}getInertBodyElement(n){let e=this.inertDocument.createElement("template");return e.innerHTML=bc(n),e}};function Bw(){try{return!!new window.DOMParser().parseFromString(bc(""),"text/html")}catch{return!1}}var jw=/^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;function ja(t){return t=String(t),t.match(jw)?t:"unsafe:"+t}function Gn(t){let n={};for(let e of t.split(","))n[e]=!0;return n}function Ha(...t){let n={};for(let e of t)for(let i in e)e.hasOwnProperty(i)&&(n[i]=!0);return n}var $b=Gn("area,br,col,hr,img,wbr"),Gb=Gn("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),Wb=Gn("rp,rt"),Hw=Ha(Wb,Gb),Uw=Ha(Gb,Gn("address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul")),zw=Ha(Wb,Gn("a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video")),U_=Ha($b,Uw,zw,Hw),Yb=Gn("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),$w=Gn("abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"),Gw=Gn("aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"),Ww=Ha(Yb,$w,Gw),Yw=Gn("script,style,template");var Qf=class{sanitizedSomething=!1;buf=[];sanitizeChildren(n){let e=n.firstChild,i=!0,r=[];for(;e;){if(e.nodeType===Node.ELEMENT_NODE?i=this.startElement(e):e.nodeType===Node.TEXT_NODE?this.chars(e.nodeValue):this.sanitizedSomething=!0,i&&e.firstChild){r.push(e),e=Kw(e);continue}for(;e;){e.nodeType===Node.ELEMENT_NODE&&this.endElement(e);let o=Zw(e);if(o){e=o;break}e=r.pop()}}return this.buf.join("")}startElement(n){let e=z_(n).toLowerCase();if(!U_.hasOwnProperty(e))return this.sanitizedSomething=!0,!Yw.hasOwnProperty(e);this.buf.push("<"),this.buf.push(e);let i=n.attributes;for(let r=0;r<i.length;r++){let o=i.item(r),a=o.name,s=a.toLowerCase();if(!Ww.hasOwnProperty(s)){this.sanitizedSomething=!0;continue}let l=o.value;Yb[s]&&(l=ja(l)),this.buf.push(" ",a,'="',$_(l),'"')}return this.buf.push(">"),!0}endElement(n){let e=z_(n).toLowerCase();U_.hasOwnProperty(e)&&!$b.hasOwnProperty(e)&&(this.buf.push("</"),this.buf.push(e),this.buf.push(">"))}chars(n){this.buf.push($_(n))}};function qw(t,n){return(t.compareDocumentPosition(n)&Node.DOCUMENT_POSITION_CONTAINED_BY)!==Node.DOCUMENT_POSITION_CONTAINED_BY}function Zw(t){let n=t.nextSibling;if(n&&t!==n.previousSibling)throw qb(n);return n}function Kw(t){let n=t.firstChild;if(n&&qw(t,n))throw qb(n);return n}function z_(t){let n=t.nodeName;return typeof n=="string"?n:"FORM"}function qb(t){return new Error(`Failed to sanitize html because the element is clobbered: ${t.outerHTML}`)}var Qw=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,Xw=/([^\#-~ |!])/g;function $_(t){return t.replace(/&/g,"&amp;").replace(Qw,function(n){let e=n.charCodeAt(0),i=n.charCodeAt(1);return"&#"+((e-55296)*1024+(i-56320)+65536)+";"}).replace(Xw,function(n){return"&#"+n.charCodeAt(0)+";"}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}var Kl;function vc(t,n){let e=null;try{Kl=Kl||Vw(t);let i=n?String(n):"";e=Kl.getInertBodyElement(i);let r=5,o=i;do{if(r===0)throw new Error("Failed to sanitize html because the input is unstable");r--,i=o,o=e.innerHTML,e=Kl.getInertBodyElement(i)}while(i!==o);let s=new Qf().sanitizeChildren(G_(e)||e);return bc(s)}finally{if(e){let i=G_(e)||e;for(;i.firstChild;)i.firstChild.remove()}}}function G_(t){return"content"in t&&Jw(t)?t.content:null}function Jw(t){return t.nodeType===Node.ELEMENT_NODE&&t.nodeName==="TEMPLATE"}var eE=/^>|^->|<!--|-->|--!>|<!-$/g,tE=/(<|>)/g,nE="\u200B$1\u200B";function iE(t){return t.replace(eE,n=>n.replace(tE,nE))}function rE(t,n){return t.createText(n)}function oE(t,n,e){t.setValue(n,e)}function aE(t,n){return t.createComment(iE(n))}function Zb(t,n,e){return t.createElement(n,e)}function lc(t,n,e,i,r){t.insertBefore(n,e,i,r)}function Kb(t,n,e){t.appendChild(n,e)}function W_(t,n,e,i,r){i!==null?lc(t,n,e,i,r):Kb(t,n,e)}function Qb(t,n,e,i){t.removeChild(null,n,e,i)}function sE(t,n,e){t.setAttribute(n,"style",e)}function lE(t,n,e){e===""?t.removeAttribute(n,"class"):t.setAttribute(n,"class",e)}function Xb(t,n,e){let{mergedAttrs:i,classes:r,styles:o}=e;i!==null&&gw(t,n,i),r!==null&&lE(t,n,r),o!==null&&sE(t,n,o)}var Je=(function(t){return t[t.NONE=0]="NONE",t[t.HTML=1]="HTML",t[t.STYLE=2]="STYLE",t[t.SCRIPT=3]="SCRIPT",t[t.URL=4]="URL",t[t.RESOURCE_URL=5]="RESOURCE_URL",t})(Je||{});function Om(t){let n=Jb();return n?H_(n.sanitize(Je.HTML,t)||""):$n(t,"HTML")?H_(hn(t)):vc(Pb(),tr(t))}function Ua(t){let n=Jb();return n?n.sanitize(Je.URL,t)||"":$n(t,"URL")?hn(t):ja(tr(t))}function Jb(){let t=X();return t&&t[an].sanitizer}function yc(t){return t.ownerDocument}function cE(t,n,e){let i=t.length;for(;;){let r=t.indexOf(n,e);if(r===-1)return r;if(r===0||t.charCodeAt(r-1)<=32){let o=n.length;if(r+o===i||t.charCodeAt(r+o)<=32)return r}e=r+1}}var ev="ng-template";function dE(t,n,e,i){let r=0;if(i){for(;r<n.length&&typeof n[r]=="string";r+=2)if(n[r]==="class"&&cE(n[r+1].toLowerCase(),e,0)!==-1)return!0}else if(Nm(t))return!1;if(r=n.indexOf(1,r),r>-1){let o;for(;++r<n.length&&typeof(o=n[r])=="string";)if(o.toLowerCase()===e)return!0}return!1}function Nm(t){return t.type===4&&t.value!==ev}function uE(t,n,e){let i=t.type===4&&!e?ev:t.value;return n===i}function fE(t,n,e){let i=4,r=t.attrs,o=r!==null?pE(r):0,a=!1;for(let s=0;s<n.length;s++){let l=n[s];if(typeof l=="number"){if(!a&&!un(i)&&!un(l))return!1;if(a&&un(l))continue;a=!1,i=l|i&1;continue}if(!a)if(i&4){if(i=2|i&1,l!==""&&!uE(t,l,e)||l===""&&n.length===1){if(un(i))return!1;a=!0}}else if(i&8){if(r===null||!dE(t,r,l,e)){if(un(i))return!1;a=!0}}else{let c=n[++s],u=mE(l,r,Nm(t),e);if(u===-1){if(un(i))return!1;a=!0;continue}if(c!==""){let f;if(u>o?f="":f=r[u+1].toLowerCase(),i&2&&c!==f){if(un(i))return!1;a=!0}}}}return un(i)||a}function un(t){return(t&1)===0}function mE(t,n,e,i){if(n===null)return-1;let r=0;if(i||!e){let o=!1;for(;r<n.length;){let a=n[r];if(a===t)return r;if(a===3||a===6)o=!0;else if(a===1||a===2){let s=n[++r];for(;typeof s=="string";)s=n[++r];continue}else{if(a===4)break;if(a===0){r+=4;continue}}r+=o?1:2}return-1}else return gE(n,t)}function tv(t,n,e=!1){for(let i=0;i<n.length;i++)if(fE(t,n[i],e))return!0;return!1}function hE(t){let n=t.attrs;if(n!=null){let e=n.indexOf(5);if((e&1)===0)return n[e+1]}return null}function pE(t){for(let n=0;n<t.length;n++){let e=t[n];if(yb(e))return n}return t.length}function gE(t,n){let e=t.indexOf(4);if(e>-1)for(e++;e<t.length;){let i=t[e];if(typeof i=="number")return-1;if(i===n)return e;e++}return-1}function _E(t,n){e:for(let e=0;e<n.length;e++){let i=n[e];if(t.length===i.length){for(let r=0;r<t.length;r++)if(t[r]!==i[r])continue e;return!0}}return!1}function Y_(t,n){return t?":not("+n.trim()+")":n}function bE(t){let n=t[0],e=1,i=2,r="",o=!1;for(;e<t.length;){let a=t[e];if(typeof a=="string")if(i&2){let s=t[++e];r+="["+a+(s.length>0?'="'+s+'"':"")+"]"}else i&8?r+="."+a:i&4&&(r+=" "+a);else r!==""&&!un(a)&&(n+=Y_(o,r),r=""),i=a,o=o||!un(i);e++}return r!==""&&(n+=Y_(o,r)),n}function vE(t){return t.map(bE).join(",")}function yE(t){let n=[],e=[],i=1,r=2;for(;i<t.length;){let o=t[i];if(typeof o=="string")r===2?o!==""&&n.push(o,t[++i]):r===8&&e.push(o);else{if(!un(r))break;r=o}i++}return e.length&&n.push(1,...e),n}var Dt={};function Fm(t,n,e,i,r,o,a,s,l,c,u){let f=Oe+i,g=f+r,p=DE(f,g),v=typeof c=="function"?c():c;return p[Y]={type:t,blueprint:p,template:e,queries:null,viewQuery:s,declTNode:n,data:p.slice().fill(null,f),bindingStartIndex:f,expandoStartIndex:g,hostBindingOpCodes:null,firstCreatePass:!0,firstUpdatePass:!0,staticViewQueries:!1,staticContentQueries:!1,preOrderHooks:null,preOrderCheckHooks:null,contentHooks:null,contentCheckHooks:null,viewHooks:null,viewCheckHooks:null,destroyHooks:null,cleanup:null,contentQueries:null,components:null,directiveRegistry:typeof o=="function"?o():o,pipeRegistry:typeof a=="function"?a():a,firstChild:null,schemas:l,consts:v,incompleteFirstPass:!1,ssrId:u}}function DE(t,n){let e=[];for(let i=0;i<n;i++)e.push(i<t?null:Dt);return e}function CE(t){let n=t.tView;return n===null||n.incompleteFirstPass?t.tView=Fm(1,null,t.template,t.decls,t.vars,t.directiveDefs,t.pipeDefs,t.viewQuery,t.schemas,t.consts,t.id):n}function Pm(t,n,e,i,r,o,a,s,l,c,u){let f=n.blueprint.slice();return f[on]=r,f[J]=i|4|128|8|64|1024,(c!==null||t&&t[J]&2048)&&(f[J]|=2048),sf(f),f[Qe]=f[or]=t,f[ze]=e,f[an]=a||t&&t[an],f[Ce]=s||t&&t[Ce],f[Pn]=l||t&&t[Pn]||null,f[pt]=o,f[Ln]=Tw(),f[rr]=u,f[Ju]=c,f[gt]=n.type==2?t[gt]:f,f}function xE(t,n,e){let i=cn(n,t),r=CE(e),o=t[an].rendererFactory,a=Lm(t,Pm(t,r,null,nv(e),i,n,null,o.createRenderer(i,e),null,null,null));return t[n.index]=a}function nv(t){let n=16;return t.signals?n=4096:t.onPush&&(n=64),n}function iv(t,n,e,i){if(e===0)return-1;let r=n.length;for(let o=0;o<e;o++)n.push(i),t.blueprint.push(i),t.data.push(null);return r}function Lm(t,n){return t[no]?t[Xu][jt]=n:t[no]=n,t[Xu]=n,n}function _(t=1){rv(Se(),X(),Mn()+t,!1)}function rv(t,n,e,i){if(!i)if((n[J]&3)===3){let o=t.preOrderCheckHooks;o!==null&&Xl(n,o,e)}else{let o=t.preOrderHooks;o!==null&&Jl(n,o,0,e)}pi(e)}var Dc=(function(t){return t[t.None=0]="None",t[t.SignalBased=1]="SignalBased",t[t.HasDecoratorInputTransform=2]="HasDecoratorInputTransform",t})(Dc||{});function Xf(t,n,e,i){let r=W(null);try{let[o,a,s]=t.inputs[e],l=null;(a&Dc.SignalBased)!==0&&(l=n[o][Ze]),l!==null&&l.transformFn!==void 0?i=l.transformFn(i):s!==null&&(i=s.call(n,i)),t.setInput!==null?t.setInput(n,l,i,e,o):hb(n,l,o,i)}finally{W(r)}}var Sn=(function(t){return t[t.Important=1]="Important",t[t.DashCase=2]="DashCase",t})(Sn||{}),wE;function Vm(t,n){return wE(t,n)}var mj=typeof document<"u"&&typeof document?.documentElement?.getAnimations=="function";var Jf=new WeakMap,ka=new WeakSet;function EE(t,n){let e=Jf.get(t);if(!e||e.length===0)return;let i=n.parentNode,r=n.previousSibling;for(let o=e.length-1;o>=0;o--){let a=e[o],s=a.parentNode;a===n?(e.splice(o,1),ka.add(a),a.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}}))):(r&&a===r||s&&i&&s!==i)&&(e.splice(o,1),a.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}})),a.parentNode?.removeChild(a))}}function ME(t,n){let e=Jf.get(t);e?e.includes(n)||e.push(n):Jf.set(t,[n])}var hr=new Set,Cc=(function(t){return t[t.CHANGE_DETECTION=0]="CHANGE_DETECTION",t[t.AFTER_NEXT_RENDER=1]="AFTER_NEXT_RENDER",t})(Cc||{}),pn=new b(""),q_=new Set;function br(t){q_.has(t)||(q_.add(t),performance?.mark?.("mark_feature_usage",{detail:{feature:t}}))}var xc=(()=>{class t{impl=null;execute(){this.impl?.execute()}static \u0275prov=y({token:t,providedIn:"root",factory:()=>new t})}return t})(),Bm=[0,1,2,3],jm=(()=>{class t{ngZone=d(A);scheduler=d(wn);errorHandler=d(st,{optional:!0});sequences=new Set;deferredRegistrations=new Set;executing=!1;constructor(){d(pn,{optional:!0})}execute(){let e=this.sequences.size>0;e&&ge(he.AfterRenderHooksStart),this.executing=!0;for(let i of Bm)for(let r of this.sequences)if(!(r.erroredOrDestroyed||!r.hooks[i]))try{r.pipelinedValue=this.ngZone.runOutsideAngular(()=>this.maybeTrace(()=>{let o=r.hooks[i];return o(r.pipelinedValue)},r.snapshot))}catch(o){r.erroredOrDestroyed=!0,this.errorHandler?.handleError(o)}this.executing=!1;for(let i of this.sequences)i.afterRun(),i.once&&(this.sequences.delete(i),i.destroy());for(let i of this.deferredRegistrations)this.sequences.add(i);this.deferredRegistrations.size>0&&this.scheduler.notify(7),this.deferredRegistrations.clear(),e&&ge(he.AfterRenderHooksEnd)}register(e){let{view:i}=e;i!==void 0?((i[sr]??=[]).push(e),dr(i),i[J]|=8192):this.executing?this.deferredRegistrations.add(e):this.addSequence(e)}addSequence(e){this.sequences.add(e),this.scheduler.notify(7)}unregister(e){this.executing&&this.sequences.has(e)?(e.erroredOrDestroyed=!0,e.pipelinedValue=void 0,e.once=!0):(this.sequences.delete(e),this.deferredRegistrations.delete(e))}maybeTrace(e,i){return i?i.run(Cc.AFTER_NEXT_RENDER,e):e()}static \u0275prov=y({token:t,providedIn:"root",factory:()=>new t})}return t})(),Oa=class{impl;hooks;view;once;snapshot;erroredOrDestroyed=!1;pipelinedValue=void 0;unregisterOnDestroy;constructor(n,e,i,r,o,a=null){this.impl=n,this.hooks=e,this.view=i,this.once=r,this.snapshot=a,this.unregisterOnDestroy=o?.onDestroy(()=>this.destroy())}afterRun(){this.erroredOrDestroyed=!1,this.pipelinedValue=void 0,this.snapshot?.dispose(),this.snapshot=null}destroy(){this.impl.unregister(this),this.unregisterOnDestroy?.();let n=this.view?.[sr];n&&(this.view[sr]=n.filter(e=>e!==this))}};function Ye(t,n){let e=n?.injector??d(G);return br("NgAfterNextRender"),SE(t,e,n,!0)}function IE(t){return t instanceof Function?[void 0,void 0,t,void 0]:[t.earlyRead,t.write,t.mixedReadWrite,t.read]}function SE(t,n,e,i){let r=n.get(xc);r.impl??=n.get(jm);let o=n.get(pn,null,{optional:!0}),a=e?.manualCleanup!==!0?n.get(At):null,s=n.get(ao,null,{optional:!0}),l=new Oa(r.impl,IE(t),s?.view,i,a,o?.snapshot(null));return r.impl.register(l),l}var ov=new b("",{factory:()=>({queue:new Set,isScheduled:!1,scheduler:null,injector:d(Ue)})});function av(t,n,e){let i=t.get(ov);if(Array.isArray(n))for(let r of n)i.queue.add(r),e?.detachedLeaveAnimationFns?.push(r);else i.queue.add(n),e?.detachedLeaveAnimationFns?.push(n);i.scheduler&&i.scheduler(t)}function kE(t,n){let e=t.get(ov);if(n.detachedLeaveAnimationFns){for(let i of n.detachedLeaveAnimationFns)e.queue.delete(i);n.detachedLeaveAnimationFns=void 0}}function TE(t,n){for(let[e,i]of n)av(t,i.animateFns)}function Z_(t,n,e,i){let r=t?.[fi]?.enter;n!==null&&r&&r.has(e.index)&&TE(i,r)}function so(t,n,e,i,r,o,a,s){if(r!=null){let l,c=!1;sn(r)?l=r:Vn(r)&&(c=!0,r=r[on]);let u=Ht(r);t===0&&i!==null?(Z_(s,i,o,e),a==null?Kb(n,i,u):lc(n,i,u,a||null,!0)):t===1&&i!==null?(Z_(s,i,o,e),lc(n,i,u,a||null,!0),EE(o,u)):t===2?(s?.[fi]?.leave?.has(o.index)&&ME(o,u),ka.delete(u),K_(s,o,e,f=>{if(ka.has(u)){ka.delete(u);return}Qb(n,u,c,f)})):t===3&&(ka.delete(u),K_(s,o,e,()=>{n.destroyNode(u)})),l!=null&&HE(n,t,e,l,o,i,a)}}function AE(t,n){sv(t,n),n[on]=null,n[pt]=null}function RE(t,n,e,i,r,o){i[on]=r,i[pt]=n,Ec(t,i,e,1,r,o)}function sv(t,n){n[an].changeDetectionScheduler?.notify(9),Ec(t,n,n[Ce],2,null,null)}function OE(t){let n=t[no];if(!n)return Tf(t[Y],t);for(;n;){let e=null;if(Vn(n))e=n[no];else{let i=n[He];i&&(e=i)}if(!e){for(;n&&!n[jt]&&n!==t;)Vn(n)&&Tf(n[Y],n),n=n[Qe];n===null&&(n=t),Vn(n)&&Tf(n[Y],n),e=n&&n[jt]}n=e}}function Hm(t,n){let e=t[lr],i=e.indexOf(n);e.splice(i,1)}function wc(t,n){if(cr(n))return;let e=n[Ce];e.destroyNode&&Ec(t,n,e,3,null,null),OE(n)}function Tf(t,n){if(cr(n))return;let e=W(null);try{n[J]&=-129,n[J]|=256,n[kt]&&ii(n[kt]),PE(t,n),FE(t,n),n[Y].type===1&&n[Ce].destroy();let i=n[ui];if(i!==null&&sn(n[Qe])){i!==n[Qe]&&Hm(i,n);let r=n[En];r!==null&&r.detachView(t)}Hf(n)}finally{W(e)}}function K_(t,n,e,i){let r=t?.[fi];if(r==null||r.leave==null||!r.leave.has(n.index))return i(!1);t&&hr.add(t[Ln]),av(e,()=>{if(r.leave&&r.leave.has(n.index)){let a=r.leave.get(n.index),s=[];if(a){for(let l=0;l<a.animateFns.length;l++){let c=a.animateFns[l],{promise:u}=c();s.push(u)}r.detachedLeaveAnimationFns=void 0}r.running=Promise.allSettled(s),NE(t,i)}else t&&hr.delete(t[Ln]),i(!1)},r)}function NE(t,n){let e=t[fi]?.running;if(e){e.then(()=>{t[fi].running=void 0,hr.delete(t[Ln]),n(!0)});return}n(!1)}function FE(t,n){let e=t.cleanup,i=n[to];if(e!==null)for(let a=0;a<e.length-1;a+=2)if(typeof e[a]=="string"){let s=e[a+3];s>=0?i[s]():i[-s].unsubscribe(),a+=2}else{let s=i[e[a+1]];e[a].call(s)}i!==null&&(n[to]=null);let r=n[Fn];if(r!==null){n[Fn]=null;for(let a=0;a<r.length;a++){let s=r[a];s()}}let o=n[ai];if(o!==null){n[ai]=null;for(let a of o)a.destroy()}}function PE(t,n){let e;if(t!=null&&(e=t.destroyHooks)!=null)for(let i=0;i<e.length;i+=2){let r=n[e[i]];if(!(r instanceof mr)){let o=e[i+1];if(Array.isArray(o))for(let a=0;a<o.length;a+=2){let s=r[o[a]],l=o[a+1];ge(he.LifecycleHookStart,s,l);try{l.call(s)}finally{ge(he.LifecycleHookEnd,s,l)}}else{ge(he.LifecycleHookStart,r,o);try{o.call(r)}finally{ge(he.LifecycleHookEnd,r,o)}}}}}function lv(t,n,e){return LE(t,n.parent,e)}function LE(t,n,e){let i=n;for(;i!==null&&i.type&168;)n=i,i=n.parent;if(i===null)return e[on];if(Bn(i)){let{encapsulation:r}=t.data[i.directiveStart+i.componentOffset];if(r===mn.None||r===mn.Emulated)return null}return cn(i,e)}function cv(t,n,e){return BE(t,n,e)}function VE(t,n,e){return t.type&40?cn(t,e):null}var BE=VE,Q_;function Um(t,n,e,i){let r=lv(t,i,n),o=n[Ce],a=i.parent||n[pt],s=cv(a,i,n);if(r!=null)if(Array.isArray(e))for(let l=0;l<e.length;l++)W_(o,r,e[l],s,!1);else W_(o,r,e,s,!1);Q_!==void 0&&Q_(o,i,n,e,r)}function Ta(t,n){if(n!==null){let e=n.type;if(e&3)return cn(n,t);if(e&4)return em(-1,t[n.index]);if(e&8){let i=n.child;if(i!==null)return Ta(t,i);{let r=t[n.index];return sn(r)?em(-1,r):Ht(r)}}else{if(e&128)return Ta(t,n.next);if(e&32)return Vm(n,t)()||Ht(t[n.index]);{let i=dv(t,n);if(i!==null){if(Array.isArray(i))return i[0];let r=si(t[gt]);return Ta(r,i)}else return Ta(t,n.next)}}}return null}function dv(t,n){if(n!==null){let i=t[gt][pt],r=n.projection;return i.projection[r]}return null}function em(t,n){let e=He+t+1;if(e<n.length){let i=n[e],r=i[Y].firstChild;if(r!==null)return Ta(i,r)}return n[mi]}function zm(t,n,e,i,r,o,a){for(;e!=null;){let s=i[Pn];if(e.type===128){e=e.next;continue}let l=i[e.index],c=e.type;if(a&&n===0&&(l&&uo(Ht(l),i),e.flags|=2),!_c(e))if(c&8)zm(t,n,e.child,i,r,o,!1),so(n,t,s,r,l,e,o,i);else if(c&32){let u=Vm(e,i),f;for(;f=u();)so(n,t,s,r,f,e,o,i);so(n,t,s,r,l,e,o,i)}else c&16?uv(t,n,i,e,r,o):so(n,t,s,r,l,e,o,i);e=a?e.projectionNext:e.next}}function Ec(t,n,e,i,r,o){zm(e,i,t.firstChild,n,r,o,!1)}function jE(t,n,e){let i=n[Ce],r=lv(t,e,n),o=e.parent||n[pt],a=cv(o,e,n);uv(i,0,n,e,r,a)}function uv(t,n,e,i,r,o){let a=e[gt],l=a[pt].projection[i.projection];if(Array.isArray(l))for(let c=0;c<l.length;c++){let u=l[c];so(n,t,e[Pn],r,u,i,o,e)}else{let c=l,u=a[Qe];Ab(i)&&(c.flags|=128),zm(t,n,c,u,r,o,!0)}}function HE(t,n,e,i,r,o,a){let s=i[mi],l=Ht(i);s!==l&&so(n,t,e,o,s,r,a);for(let c=He;c<i.length;c++){let u=i[c];Ec(u[Y],u,t,n,o,s)}}function UE(t,n,e,i,r){if(n)r?t.addClass(e,i):t.removeClass(e,i);else{let o=i.indexOf("-")===-1?void 0:Sn.DashCase;r==null?t.removeStyle(e,i,o):(typeof r=="string"&&r.endsWith("!important")&&(r=r.slice(0,-10),o|=Sn.Important),t.setStyle(e,i,r,o))}}function fv(t,n,e,i,r){let o=Mn(),a=i&2;try{pi(-1),a&&n.length>Oe&&rv(t,n,Oe,!1);let s=a?he.TemplateUpdateStart:he.TemplateCreateStart;ge(s,r,e),e(i,r)}finally{pi(o);let s=a?he.TemplateUpdateEnd:he.TemplateCreateEnd;ge(s,r,e)}}function Mc(t,n,e){qE(t,n,e),(e.flags&64)===64&&ZE(t,n,e)}function za(t,n,e=cn){let i=n.localNames;if(i!==null){let r=n.index+1;for(let o=0;o<i.length;o+=2){let a=i[o+1],s=a===-1?e(n,t):t[a];t[r++]=s}}}function zE(t,n,e,i){let o=i.get(jb,Bb)||e===mn.ShadowDom||e===mn.ExperimentalIsolatedShadowDom,a=t.selectRootElement(n,o);return $E(a),a}function $E(t){GE(t)}var GE=()=>null;function WE(t){return t==="class"?"className":t==="for"?"htmlFor":t==="formaction"?"formAction":t==="innerHtml"?"innerHTML":t==="readonly"?"readOnly":t==="tabindex"?"tabIndex":t}function mv(t,n,e,i,r,o){let a=n[Y];if(Ym(t,a,n,e,i)){Bn(t)&&YE(n,t.index);return}t.type&3&&(e=WE(e)),hv(t,n,e,i,r,o)}function hv(t,n,e,i,r,o){if(t.type&3){let a=cn(t,n);i=o!=null?o(i,t.value||"",e):i,r.setProperty(a,e,i)}else t.type&12}function YE(t,n){let e=Ut(n,t);e[J]&16||(e[J]|=64)}function qE(t,n,e){let i=e.directiveStart,r=e.directiveEnd;Bn(e)&&xE(n,e,t.data[i+e.componentOffset]),t.firstCreatePass||sc(e,n);let o=e.initialInputs;for(let a=i;a<r;a++){let s=t.data[a],l=Ra(n,t,a,e);if(uo(l,n),o!==null&&JE(n,a-i,l,s,e,o),ln(s)){let c=Ut(e.index,n);c[ze]=Ra(n,t,a,e)}}}function ZE(t,n,e){let i=e.directiveStart,r=e.directiveEnd,o=e.index,a=v_();try{pi(o);for(let s=i;s<r;s++){let l=t.data[s],c=n[s];Ul(s),(l.hostBindings!==null||l.hostVars!==0||l.hostAttrs!==null)&&KE(l,c)}}finally{pi(-1),Ul(a)}}function KE(t,n){t.hostBindings!==null&&t.hostBindings(1,n)}function $m(t,n){let e=t.directiveRegistry,i=null;if(e)for(let r=0;r<e.length;r++){let o=e[r];tv(n,o.selectors,!1)&&(i??=[],ln(o)?i.unshift(o):i.push(o))}return i}function QE(t,n,e,i,r,o){let a=cn(t,n);XE(n[Ce],a,o,t.value,e,i,r)}function XE(t,n,e,i,r,o,a){if(o==null)t.removeAttribute(n,r,e);else{let s=a==null?tr(o):a(o,i||"",r);t.setAttribute(n,r,s,e)}}function JE(t,n,e,i,r,o){let a=o[n];if(a!==null)for(let s=0;s<a.length;s+=2){let l=a[s],c=a[s+1];Xf(i,e,l,c)}}function Gm(t,n,e,i,r){let o=Oe+e,a=n[Y],s=r(a,n,t,i,e);n[o]=s,oo(t,!0);let l=t.type===2;return l?(Xb(n[Ce],s,t),(d_()===0||io(t))&&uo(s,n),u_()):uo(s,n),Wl()&&(!l||!_c(t))&&Um(a,n,s,t),t}function Wm(t){let n=t;return _f()?bf():(n=n.parent,oo(n,!1)),n}function eM(t,n){let e=t[Pn];if(!e)return;let i;try{i=e.get(Hn,null)}catch{i=null}i?.(n)}function Ym(t,n,e,i,r){let o=t.inputs?.[i],a=t.hostDirectiveInputs?.[i],s=!1;if(a)for(let l=0;l<a.length;l+=2){let c=a[l],u=a[l+1],f=n.data[c];Xf(f,e[c],u,r),s=!0}if(o)for(let l of o){let c=e[l],u=n.data[l];Xf(u,c,i,r),s=!0}return s}function tM(t,n){let e=Ut(n,t),i=e[Y];nM(i,e);let r=e[on];r!==null&&e[rr]===null&&(e[rr]=Hb(r,e[Pn])),ge(he.ComponentStart);try{qm(i,e,e[ze])}finally{ge(he.ComponentEnd,e[ze])}}function nM(t,n){for(let e=n.length;e<t.blueprint.length;e++)n.push(t.blueprint[e])}function qm(t,n,e){$l(n);try{let i=t.viewQuery;i!==null&&zf(1,i,e);let r=t.template;r!==null&&fv(t,n,r,1,e),t.firstCreatePass&&(t.firstCreatePass=!1),n[En]?.finishViewCreation(t),t.staticContentQueries&&Ub(t,n),t.staticViewQueries&&zf(2,t.viewQuery,e);let o=t.components;o!==null&&iM(n,o)}catch(i){throw t.firstCreatePass&&(t.incompleteFirstPass=!0,t.firstCreatePass=!1),i}finally{n[J]&=-5,Gl()}}function iM(t,n){for(let e=0;e<n.length;e++)tM(t,n[e])}function $a(t,n,e,i){let r=W(null);try{let o=n.tView,s=t[J]&4096?4096:16,l=Pm(t,o,e,s,null,n,null,null,i?.injector??null,i?.embeddedViewInjector??null,i?.dehydratedView??null),c=t[n.index];l[ui]=c;let u=t[En];return u!==null&&(l[En]=u.createEmbeddedView(o)),qm(o,l,e),l}finally{W(r)}}function fo(t,n){return!n||n.firstChild===null||Ab(t)}function Na(t,n,e,i,r=!1){for(;e!==null;){if(e.type===128){e=r?e.projectionNext:e.next;continue}let o=n[e.index];o!==null&&i.push(Ht(o)),sn(o)&&pv(o,i);let a=e.type;if(a&8)Na(t,n,e.child,i);else if(a&32){let s=Vm(e,n),l;for(;l=s();)i.push(l)}else if(a&16){let s=dv(n,e);if(Array.isArray(s))i.push(...s);else{let l=si(n[gt]);Na(l[Y],l,s,i,!0)}}e=r?e.projectionNext:e.next}return i}function pv(t,n){for(let e=He;e<t.length;e++){let i=t[e],r=i[Y].firstChild;r!==null&&Na(i[Y],i,r,n)}t[mi]!==t[on]&&n.push(t[mi])}function gv(t){if(t[sr]!==null){for(let n of t[sr])n.impl.addSequence(n);t[sr].length=0}}var _v=[];function rM(t){return t[kt]??oM(t)}function oM(t){let n=_v.pop()??Object.create(sM);return n.lView=t,n}function aM(t){t.lView[kt]!==t&&(t.lView=null,_v.push(t))}var sM=ae(w({},Li),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:t=>{dr(t.lView)},consumerOnSignalRead(){this.lView[kt]=this}});function lM(t){let n=t[kt]??Object.create(cM);return n.lView=t,n}var cM=ae(w({},Li),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:t=>{let n=si(t.lView);for(;n&&!bv(n[Y]);)n=si(n);n&&lf(n)},consumerOnSignalRead(){this.lView[kt]=this}});function bv(t){return t.type!==2}function vv(t){if(t[ai]===null)return;let n=!0;for(;n;){let e=!1;for(let i of t[ai])i.dirty&&(e=!0,i.zone===null||Zone.current===i.zone?i.run():i.zone.run(()=>i.run()));n=e&&!!(t[J]&8192)}}var dM=100;function yv(t,n=0){let i=t[an].rendererFactory,r=!1;r||i.begin?.();try{uM(t,n)}finally{r||i.end?.()}}function uM(t,n){let e=vf();try{_a(!0),tm(t,n);let i=0;for(;xa(t);){if(i===dM)throw new $(103,!1);i++,tm(t,1)}}finally{_a(e)}}function fM(t,n,e,i){if(cr(n))return;let r=n[J],o=!1,a=!1;$l(n);let s=!0,l=null,c=null;o||(bv(t)?(c=rM(n),l=ni(c)):Vs()===null?(s=!1,c=lM(n),l=ni(c)):n[kt]&&(ii(n[kt]),n[kt]=null));try{sf(n),g_(t.bindingStartIndex),e!==null&&fv(t,n,e,2,i);let u=(r&3)===3;if(!o)if(u){let p=t.preOrderCheckHooks;p!==null&&Xl(n,p,null)}else{let p=t.preOrderHooks;p!==null&&Jl(n,p,0,null),Sf(n,0)}if(a||mM(n),vv(n),Dv(n,0),t.contentQueries!==null&&Ub(t,n),!o)if(u){let p=t.contentCheckHooks;p!==null&&Xl(n,p)}else{let p=t.contentHooks;p!==null&&Jl(n,p,1),Sf(n,1)}pM(t,n);let f=t.components;f!==null&&xv(n,f,0);let g=t.viewQuery;if(g!==null&&zf(2,g,i),!o)if(u){let p=t.viewCheckHooks;p!==null&&Xl(n,p)}else{let p=t.viewHooks;p!==null&&Jl(n,p,2),Sf(n,2)}if(t.firstUpdatePass===!0&&(t.firstUpdatePass=!1),n[Pl]){for(let p of n[Pl])p();n[Pl]=null}o||(gv(n),n[J]&=-73)}catch(u){throw o||dr(n),u}finally{c!==null&&(Bi(c,l),s&&aM(c)),Gl()}}function Dv(t,n){for(let e=Ob(t);e!==null;e=Nb(e))for(let i=He;i<e.length;i++){let r=e[i];Cv(r,n)}}function mM(t){for(let n=Ob(t);n!==null;n=Nb(n)){if(!(n[J]&2))continue;let e=n[lr];for(let i=0;i<e.length;i++){let r=e[i];lf(r)}}}function hM(t,n,e){ge(he.ComponentStart);let i=Ut(n,t);try{Cv(i,e)}finally{ge(he.ComponentEnd,i[ze])}}function Cv(t,n){Vl(t)&&tm(t,n)}function tm(t,n){let i=t[Y],r=t[J],o=t[kt],a=!!(n===0&&r&16);if(a||=!!(r&64&&n===0),a||=!!(r&1024),a||=!!(o?.dirty&&Br(o)),a||=!1,o&&(o.dirty=!1),t[J]&=-9217,a)fM(i,t,i.template,t[ze]);else if(r&8192){let s=W(null);try{vv(t),Dv(t,1);let l=i.components;l!==null&&xv(t,l,1),gv(t)}finally{W(s)}}}function xv(t,n,e){for(let i=0;i<n.length;i++)hM(t,n[i],e)}function pM(t,n){let e=t.hostBindingOpCodes;if(e!==null)try{for(let i=0;i<e.length;i++){let r=e[i];if(r<0)pi(~r);else{let o=r,a=e[++i],s=e[++i];b_(a,o);let l=n[o];ge(he.HostBindingsUpdateStart,l);try{s(2,l)}finally{ge(he.HostBindingsUpdateEnd,l)}}}}finally{pi(-1)}}function Zm(t,n){let e=vf()?64:1088;for(t[an].changeDetectionScheduler?.notify(n);t;){t[J]|=e;let i=si(t);if(ro(t)&&!i)return t;t=i}return null}function wv(t,n,e,i){return[t,!0,0,n,null,i,null,e,null,null]}function Ev(t,n){let e=He+n;if(e<t.length)return t[e]}function Ga(t,n,e,i=!0){let r=n[Y];if(gM(r,n,t,e),i){let a=em(e,t),s=n[Ce],l=s.parentNode(t[mi]);l!==null&&RE(r,t[pt],s,n,l,a)}let o=n[rr];o!==null&&o.firstChild!==null&&(o.firstChild=null)}function Mv(t,n){let e=Fa(t,n);return e!==void 0&&wc(e[Y],e),e}function Fa(t,n){if(t.length<=He)return;let e=He+n,i=t[e];if(i){let r=i[ui];r!==null&&r!==t&&Hm(r,i),n>0&&(t[e-1][jt]=i[jt]);let o=ya(t,He+n);AE(i[Y],i);let a=o[En];a!==null&&a.detachView(o[Y]),i[Qe]=null,i[jt]=null,i[J]&=-129}return i}function gM(t,n,e,i){let r=He+i,o=e.length;i>0&&(e[r-1][jt]=n),i<o-He?(n[jt]=e[r],Wu(e,He+i,n)):(e.push(n),n[jt]=null),n[Qe]=e;let a=n[ui];a!==null&&e!==a&&Iv(a,n);let s=n[En];s!==null&&s.insertView(t),Bl(n),n[J]|=128}function Iv(t,n){let e=t[lr],i=n[Qe];if(Vn(i))t[J]|=2;else{let r=i[Qe][gt];n[gt]!==r&&(t[J]|=2)}e===null?t[lr]=[n]:e.push(n)}var gi=class{_lView;_cdRefInjectingView;_appRef=null;_attachedToViewContainer=!1;exhaustive;get rootNodes(){let n=this._lView,e=n[Y];return Na(e,n,e.firstChild,[])}constructor(n,e){this._lView=n,this._cdRefInjectingView=e}get context(){return this._lView[ze]}set context(n){this._lView[ze]=n}get destroyed(){return cr(this._lView)}destroy(){if(this._appRef)this._appRef.detachView(this);else if(this._attachedToViewContainer){let n=this._lView[Qe];if(sn(n)){let e=n[Ca],i=e?e.indexOf(this):-1;i>-1&&(Fa(n,i),ya(e,i))}this._attachedToViewContainer=!1}wc(this._lView[Y],this._lView)}onDestroy(n){cf(this._lView,n)}markForCheck(){Zm(this._cdRefInjectingView||this._lView,4)}detach(){this._lView[J]&=-129}reattach(){Bl(this._lView),this._lView[J]|=128}detectChanges(){this._lView[J]|=1024,yv(this._lView)}checkNoChanges(){}attachToViewContainerRef(){if(this._appRef)throw new $(902,!1);this._attachedToViewContainer=!0}detachFromAppRef(){this._appRef=null;let n=ro(this._lView),e=this._lView[ui];e!==null&&!n&&Hm(e,this._lView),sv(this._lView[Y],this._lView)}attachToAppRef(n){if(this._attachedToViewContainer)throw new $(902,!1);this._appRef=n;let e=ro(this._lView),i=this._lView[ui];i!==null&&!e&&Iv(i,this._lView),Bl(this._lView)}};var lt=(()=>{class t{_declarationLView;_declarationTContainer;elementRef;static __NG_ELEMENT_ID__=_M;constructor(e,i,r){this._declarationLView=e,this._declarationTContainer=i,this.elementRef=r}get ssrId(){return this._declarationTContainer.tView?.ssrId||null}createEmbeddedView(e,i){return this.createEmbeddedViewImpl(e,i)}createEmbeddedViewImpl(e,i,r){let o=$a(this._declarationLView,this._declarationTContainer,e,{embeddedViewInjector:i,dehydratedView:r});return new gi(o)}}return t})();function _M(){return Ic(Xe(),X())}function Ic(t,n){return t.type&4?new lt(n,t,go(t,n)):null}function _o(t,n,e,i,r){let o=t.data[n];if(o===null)o=bM(t,n,e,i,r),__()&&(o.flags|=32);else if(o.type&64){o.type=e,o.value=i,o.attrs=r;let a=f_();o.injectorIndex=a===null?-1:a.injectorIndex}return oo(o,!0),o}function bM(t,n,e,i,r){let o=gf(),a=_f(),s=a?o:o&&o.parent,l=t.data[n]=yM(t,s,e,n,i,r);return vM(t,l,o,a),l}function vM(t,n,e,i){t.firstChild===null&&(t.firstChild=n),e!==null&&(i?e.child==null&&n.parent!==null&&(e.child=n):e.next===null&&(e.next=n,n.prev=e))}function yM(t,n,e,i,r,o){let a=n?n.injectorIndex:-1,s=0;return mf()&&(s|=128),{type:e,index:i,insertBeforeIndex:null,injectorIndex:a,directiveStart:-1,directiveEnd:-1,directiveStylingLast:-1,componentOffset:-1,controlDirectiveIndex:-1,customControlIndex:-1,propertyBindings:null,flags:s,providerIndexes:0,value:r,attrs:o,mergedAttrs:null,localNames:null,initialInputs:null,inputs:null,hostDirectiveInputs:null,outputs:null,hostDirectiveOutputs:null,directiveToIndex:null,tView:null,next:null,prev:null,projectionNext:null,child:null,parent:n,projection:null,styles:null,stylesWithoutHost:null,residualStyles:void 0,classes:null,classesWithoutHost:null,residualClasses:void 0,classBindings:0,styleBindings:0}}function DM(t){let n=t[ef]??[],i=t[Qe][Ce],r=[];for(let o of n)o.data[Vb]!==void 0?r.push(o):CM(o,i);t[ef]=r}function CM(t,n){let e=0,i=t.firstChild;if(i){let r=t.data[Lb];for(;e<r;){let o=i.nextSibling;Qb(n,i,!1),i=o,e++}}}var xM=()=>null,wM=()=>null;function cc(t,n){return xM(t,n)}function Sv(t,n,e){return wM(t,n,e)}var kv=class{},Sc=class{},nm=class{resolveComponentFactory(n){throw new $(917,!1)}},kc=class{static NULL=new nm},Ge=class{},Te=(()=>{class t{destroyNode=null;static __NG_ELEMENT_ID__=()=>EM()}return t})();function EM(){let t=X(),n=Xe(),e=Ut(n.index,t);return(Vn(e)?e:t)[Ce]}var Tv=(()=>{class t{static \u0275prov=y({token:t,providedIn:"root",factory:()=>null})}return t})();var tc={},im=class{injector;parentInjector;constructor(n,e){this.injector=n,this.parentInjector=e}get(n,e,i){let r=this.injector.get(n,tc,i);return r!==tc||e===tc?r:this.parentInjector.get(n,e,i)}};function dc(t,n,e){let i=e?t.styles:null,r=e?t.classes:null,o=0;if(n!==null)for(let a=0;a<n.length;a++){let s=n[a];if(typeof s=="number")o=s;else if(o==1)r=Sl(r,s);else if(o==2){let l=s,c=n[++a];i=Sl(i,l+": "+c+";")}}e?t.styles=i:t.stylesWithoutHost=i,e?t.classes=r:t.classesWithoutHost=r}function ee(t,n=0){let e=X();if(e===null)return R(t,n);let i=Xe();return Ib(i,e,Ke(t),n)}function Wa(){let t="invalid";throw new Error(t)}function Av(t,n,e,i,r){let o=i===null?null:{"":-1},a=r(t,e);if(a!==null){let s=a,l=null,c=null;for(let u of a)if(u.resolveHostDirectives!==null){[s,l,c]=u.resolveHostDirectives(a);break}SM(t,n,e,s,o,l,c)}o!==null&&i!==null&&MM(e,i,o)}function MM(t,n,e){let i=t.localNames=[];for(let r=0;r<n.length;r+=2){let o=e[n[r+1]];if(o==null)throw new $(-301,!1);i.push(n[r],o)}}function IM(t,n,e){n.componentOffset=e,(t.components??=[]).push(n.index)}function SM(t,n,e,i,r,o,a){let s=i.length,l=null;for(let g=0;g<s;g++){let p=i[g];l===null&&ln(p)&&(l=p,IM(t,e,g)),Bf(sc(e,n),t,p.type)}NM(e,t.data.length,s),l?.viewProvidersResolver&&l.viewProvidersResolver(l);for(let g=0;g<s;g++){let p=i[g];p.providersResolver&&p.providersResolver(p)}let c=!1,u=!1,f=iv(t,n,s,null);s>0&&(e.directiveToIndex=new Map);for(let g=0;g<s;g++){let p=i[g];if(e.mergedAttrs=co(e.mergedAttrs,p.hostAttrs),TM(t,e,n,f,p),OM(f,p,r),a!==null&&a.has(p)){let[S,N]=a.get(p);e.directiveToIndex.set(p.type,[f,S+e.directiveStart,N+e.directiveStart])}else(o===null||!o.has(p))&&e.directiveToIndex.set(p.type,f);p.contentQueries!==null&&(e.flags|=4),(p.hostBindings!==null||p.hostAttrs!==null||p.hostVars!==0)&&(e.flags|=64);let v=p.type.prototype;!c&&(v.ngOnChanges||v.ngOnInit||v.ngDoCheck)&&((t.preOrderHooks??=[]).push(e.index),c=!0),!u&&(v.ngOnChanges||v.ngDoCheck)&&((t.preOrderCheckHooks??=[]).push(e.index),u=!0),f++}kM(t,e,o)}function kM(t,n,e){for(let i=n.directiveStart;i<n.directiveEnd;i++){let r=t.data[i];if(e===null||!e.has(r))X_(0,n,r,i),X_(1,n,r,i),eb(n,i,!1);else{let o=e.get(r);J_(0,n,o,i),J_(1,n,o,i),eb(n,i,!0)}}}function X_(t,n,e,i){let r=t===0?e.inputs:e.outputs;for(let o in r)if(r.hasOwnProperty(o)){let a;t===0?a=n.inputs??={}:a=n.outputs??={},a[o]??=[],a[o].push(i),Rv(n,o)}}function J_(t,n,e,i){let r=t===0?e.inputs:e.outputs;for(let o in r)if(r.hasOwnProperty(o)){let a=r[o],s;t===0?s=n.hostDirectiveInputs??={}:s=n.hostDirectiveOutputs??={},s[a]??=[],s[a].push(i,o),Rv(n,a)}}function Rv(t,n){n==="class"?t.flags|=8:n==="style"&&(t.flags|=16)}function eb(t,n,e){let{attrs:i,inputs:r,hostDirectiveInputs:o}=t;if(i===null||!e&&r===null||e&&o===null||Nm(t)){t.initialInputs??=[],t.initialInputs.push(null);return}let a=null,s=0;for(;s<i.length;){let l=i[s];if(l===0){s+=4;continue}else if(l===5){s+=2;continue}else if(typeof l=="number")break;if(!e&&r.hasOwnProperty(l)){let c=r[l];for(let u of c)if(u===n){a??=[],a.push(l,i[s+1]);break}}else if(e&&o.hasOwnProperty(l)){let c=o[l];for(let u=0;u<c.length;u+=2)if(c[u]===n){a??=[],a.push(c[u+1],i[s+1]);break}}s+=2}t.initialInputs??=[],t.initialInputs.push(a)}function TM(t,n,e,i,r){t.data[i]=r;let o=r.factory||(r.factory=oi(r.type,!0)),a=new mr(o,ln(r),ee,null);t.blueprint[i]=a,e[i]=a,AM(t,n,i,iv(t,e,r.hostVars,Dt),r)}function AM(t,n,e,i,r){let o=r.hostBindings;if(o){let a=t.hostBindingOpCodes;a===null&&(a=t.hostBindingOpCodes=[]);let s=~n.index;RM(a)!=s&&a.push(s),a.push(e,i,o)}}function RM(t){let n=t.length;for(;n>0;){let e=t[--n];if(typeof e=="number"&&e<0)return e}return 0}function OM(t,n,e){if(e){if(n.exportAs)for(let i=0;i<n.exportAs.length;i++)e[n.exportAs[i]]=t;ln(n)&&(e[""]=t)}}function NM(t,n,e){t.flags|=1,t.directiveStart=n,t.directiveEnd=n+e,t.providerIndexes=n}function Km(t,n,e,i,r,o,a,s){let l=n[Y],c=l.consts,u=Tt(c,a),f=_o(l,t,e,i,u);return o&&Av(l,n,f,Tt(c,s),r),f.mergedAttrs=co(f.mergedAttrs,f.attrs),f.attrs!==null&&dc(f,f.attrs,!1),f.mergedAttrs!==null&&dc(f,f.mergedAttrs,!0),l.queries!==null&&l.queries.elementStart(l,f),f}function Qm(t,n){bb(t,n),tf(n)&&t.queries.elementEnd(n)}function FM(t,n,e,i,r,o){let a=n.consts,s=Tt(a,r),l=_o(n,t,e,i,s);if(l.mergedAttrs=co(l.mergedAttrs,l.attrs),o!=null){let c=Tt(a,o);l.localNames=[];for(let u=0;u<c.length;u+=2)l.localNames.push(c[u],-1)}return l.attrs!==null&&dc(l,l.attrs,!1),l.mergedAttrs!==null&&dc(l,l.mergedAttrs,!0),n.queries!==null&&n.queries.elementStart(n,l),l}function PM(t,n,e){return t[n]=e}function zt(t,n,e){if(e===Dt)return!1;let i=t[n];return Object.is(i,e)?!1:(t[n]=e,!0)}function LM(t,n,e,i){let r=zt(t,n,e);return zt(t,n+1,i)||r}function nc(t,n,e){return function i(r){let o=Bn(t)?Ut(t.index,n):n;Zm(o,5);let a=n[ze],s=tb(n,a,e,r),l=i.__ngNextListenerFn__;for(;l;)s=tb(n,a,l,r)&&s,l=l.__ngNextListenerFn__;return s}}function tb(t,n,e,i){let r=W(null);try{return ge(he.OutputStart,n,e),e(i)!==!1}catch(o){return eM(t,o),!1}finally{ge(he.OutputEnd,n,e),W(r)}}function Ov(t,n,e,i,r,o,a,s){let l=io(t),c=!1,u=null;if(!i&&l&&(u=BM(n,e,o,t.index)),u!==null){let f=u.__ngLastListenerFn__||u;f.__ngNextListenerFn__=a,u.__ngLastListenerFn__=a,c=!0}else{let f=cn(t,e),g=i?i(f):f;Nw(e,g,o,s);let p=r.listen(g,o,s);if(!VM(o)){let v=i?S=>i(Ht(S[t.index])):t.index;Nv(v,n,e,o,s,p,!1)}}return c}function VM(t){return t.startsWith("animation")||t.startsWith("transition")}function BM(t,n,e,i){let r=t.cleanup;if(r!=null)for(let o=0;o<r.length-1;o+=2){let a=r[o];if(a===e&&r[o+1]===i){let s=n[to],l=r[o+2];return s&&s.length>l?s[l]:null}typeof a=="string"&&(o+=2)}return null}function Nv(t,n,e,i,r,o,a){let s=n.firstCreatePass?uf(n):null,l=df(e),c=l.length;l.push(r,o),s&&s.push(i,t,c,(c+1)*(a?-1:1))}function nb(t,n,e,i,r,o){let a=n[e],s=n[Y],c=s.data[e].outputs[i],f=a[c].subscribe(o);Nv(t.index,s,n,r,o,f,!0)}var rm=Symbol("BINDING");function Fv(t){return t.debugInfo?.className||t.type.name||null}var om=class extends kc{ngModule;constructor(n){super(),this.ngModule=n}resolveComponentFactory(n){let e=di(n);return new mo(e,this.ngModule)}};function jM(t){return Object.keys(t).map(n=>{let[e,i,r]=t[n],o={propName:e,templateName:n,isSignal:(i&Dc.SignalBased)!==0};return r&&(o.transform=r),o})}function HM(t){return Object.keys(t).map(n=>({propName:t[n],templateName:n}))}function UM(t,n,e){let i=n instanceof Ue?n:n?.injector;return i&&t.getStandaloneInjector!==null&&(i=t.getStandaloneInjector(i)||i),i?new im(e,i):e}function zM(t){let n=t.get(Ge,null);if(n===null)throw new $(407,!1);let e=t.get(Tv,null),i=t.get(wn,null),r=t.get(pn,null,{optional:!0});return{rendererFactory:n,sanitizer:e,changeDetectionScheduler:i,ngReflect:!1,tracingService:r}}function $M(t,n){let e=Pv(t);return Zb(n,e,e==="svg"?nf:e==="math"?r_:null)}function Pv(t){return(t.selectors[0][0]||"div").toLowerCase()}var mo=class extends Sc{componentDef;ngModule;selector;componentType;ngContentSelectors;isBoundToModule;cachedInputs=null;cachedOutputs=null;get inputs(){return this.cachedInputs??=jM(this.componentDef.inputs),this.cachedInputs}get outputs(){return this.cachedOutputs??=HM(this.componentDef.outputs),this.cachedOutputs}constructor(n,e){super(),this.componentDef=n,this.ngModule=e,this.componentType=n.type,this.selector=vE(n.selectors),this.ngContentSelectors=n.ngContentSelectors??[],this.isBoundToModule=!!e}create(n,e,i,r,o,a){ge(he.DynamicComponentStart);let s=W(null);try{let l=this.componentDef,c=UM(l,r||this.ngModule,n),u=zM(c),f=u.tracingService;return f&&f.componentCreate?f.componentCreate(Fv(l),()=>this.createComponentRef(u,c,e,i,o,a)):this.createComponentRef(u,c,e,i,o,a)}finally{W(s)}}createComponentRef(n,e,i,r,o,a){let s=this.componentDef,l=GM(r,s,a,o),c=n.rendererFactory.createRenderer(null,s),u=r?zE(c,r,s.encapsulation,e):$M(s,c),f=a?.some(ib)||o?.some(v=>typeof v!="function"&&v.bindings.some(ib)),g=Pm(null,l,null,512|nv(s),null,null,n,c,e,null,Hb(u,e,!0));g[Oe]=u,$l(g);let p=null;try{let v=Km(Oe,g,2,"#host",()=>l.directiveRegistry,!0,0);Xb(c,u,v),uo(u,g),Mc(l,g,v),Im(l,v,g),Qm(l,v),i!==void 0&&YM(v,this.ngContentSelectors,i),p=Ut(v.index,g),g[ze]=p[ze],qm(l,g,null)}catch(v){throw p!==null&&Hf(p),Hf(g),v}finally{ge(he.DynamicComponentEnd),Gl()}return new uc(this.componentType,g,!!f)}};function GM(t,n,e,i){let r=t?["ng-version","21.2.10"]:yE(n.selectors[0]),o=null,a=null,s=0;if(e)for(let u of e)s+=u[rm].requiredVars,u.create&&(u.targetIdx=0,(o??=[]).push(u)),u.update&&(u.targetIdx=0,(a??=[]).push(u));if(i)for(let u=0;u<i.length;u++){let f=i[u];if(typeof f!="function")for(let g of f.bindings){s+=g[rm].requiredVars;let p=u+1;g.create&&(g.targetIdx=p,(o??=[]).push(g)),g.update&&(g.targetIdx=p,(a??=[]).push(g))}}let l=[n];if(i)for(let u of i){let f=typeof u=="function"?u:u.type,g=Al(f);l.push(g)}return Fm(0,null,WM(o,a),1,s,l,null,null,null,[r],null)}function WM(t,n){return!t&&!n?null:e=>{if(e&1&&t)for(let i of t)i.create();if(e&2&&n)for(let i of n)i.update()}}function ib(t){let n=t[rm].kind;return n==="input"||n==="twoWay"}var uc=class extends kv{_rootLView;_hasInputBindings;instance;hostView;changeDetectorRef;componentType;location;previousInputValues=null;_tNode;constructor(n,e,i){super(),this._rootLView=e,this._hasInputBindings=i,this._tNode=Ll(e[Y],Oe),this.location=go(this._tNode,e),this.instance=Ut(this._tNode.index,e)[ze],this.hostView=this.changeDetectorRef=new gi(e,void 0),this.componentType=n}setInput(n,e){this._hasInputBindings;let i=this._tNode;if(this.previousInputValues??=new Map,this.previousInputValues.has(n)&&Object.is(this.previousInputValues.get(n),e))return;let r=this._rootLView,o=Ym(i,r[Y],r,n,e);this.previousInputValues.set(n,e);let a=Ut(i.index,r);Zm(a,1)}get injector(){return new fr(this._tNode,this._rootLView)}destroy(){this.hostView.destroy()}onDestroy(n){this.hostView.onDestroy(n)}};function YM(t,n,e){let i=t.projection=[];for(let r=0;r<n.length;r++){let o=e[r];i.push(o!=null&&o.length?Array.from(o):null)}}var _t=(()=>{class t{static __NG_ELEMENT_ID__=qM}return t})();function qM(){let t=Xe();return Lv(t,X())}var am=class t extends _t{_lContainer;_hostTNode;_hostLView;constructor(n,e,i){super(),this._lContainer=n,this._hostTNode=e,this._hostLView=i}get element(){return go(this._hostTNode,this._hostLView)}get injector(){return new fr(this._hostTNode,this._hostLView)}get parentInjector(){let n=xm(this._hostTNode,this._hostLView);if(Db(n)){let e=oc(n,this._hostLView),i=rc(n),r=e[Y].data[i+8];return new fr(r,e)}else return new fr(null,this._hostLView)}clear(){for(;this.length>0;)this.remove(this.length-1)}get(n){let e=rb(this._lContainer);return e!==null&&e[n]||null}get length(){return this._lContainer.length-He}createEmbeddedView(n,e,i){let r,o;typeof i=="number"?r=i:i!=null&&(r=i.index,o=i.injector);let a=cc(this._lContainer,n.ssrId),s=n.createEmbeddedViewImpl(e||{},o,a);return this.insertImpl(s,r,fo(this._hostTNode,a)),s}createComponent(n,e,i,r,o,a,s){let l=n&&!lw(n),c;if(l)c=e;else{let N=e||{};c=N.index,i=N.injector,r=N.projectableNodes,o=N.environmentInjector||N.ngModuleRef,a=N.directives,s=N.bindings}let u=l?n:new mo(di(n)),f=i||this.parentInjector;if(!o&&u.ngModule==null){let z=(l?f:this.parentInjector).get(Ue,null);z&&(o=z)}let g=di(u.componentType??{}),p=cc(this._lContainer,g?.id??null),v=p?.firstChild??null,S=u.create(f,r,v,o,a,s);return this.insertImpl(S.hostView,c,fo(this._hostTNode,p)),S}insert(n,e){return this.insertImpl(n,e,!0)}insertImpl(n,e,i){let r=n._lView;if(a_(r)){let s=this.indexOf(n);if(s!==-1)this.detach(s);else{let l=r[Qe],c=new t(l,l[pt],l[Qe]);c.detach(c.indexOf(n))}}let o=this._adjustIndex(e),a=this._lContainer;return Ga(a,r,o,i),n.attachToViewContainerRef(),Wu(Af(a),o,n),n}move(n,e){return this.insert(n,e)}indexOf(n){let e=rb(this._lContainer);return e!==null?e.indexOf(n):-1}remove(n){let e=this._adjustIndex(n,-1),i=Fa(this._lContainer,e);i&&(ya(Af(this._lContainer),e),wc(i[Y],i))}detach(n){let e=this._adjustIndex(n,-1),i=Fa(this._lContainer,e);return i&&ya(Af(this._lContainer),e)!=null?new gi(i):null}_adjustIndex(n,e=0){return n??this.length+e}};function rb(t){return t[Ca]}function Af(t){return t[Ca]||(t[Ca]=[])}function Lv(t,n){let e,i=n[t.index];return sn(i)?e=i:(e=wv(i,n,null,t),n[t.index]=e,Lm(n,e)),KM(e,n,t,i),new am(e,t,n)}function ZM(t,n){let e=t[Ce],i=e.createComment(""),r=cn(n,t),o=e.parentNode(r);return lc(e,o,i,e.nextSibling(r),!1),i}var KM=JM,QM=()=>!1;function XM(t,n,e){return QM(t,n,e)}function JM(t,n,e,i){if(t[mi])return;let r;e.type&8?r=Ht(i):r=ZM(n,e),t[mi]=r}var sm=class t{queryList;matches=null;constructor(n){this.queryList=n}clone(){return new t(this.queryList)}setDirty(){this.queryList.setDirty()}},lm=class t{queries;constructor(n=[]){this.queries=n}createEmbeddedView(n){let e=n.queries;if(e!==null){let i=n.contentQueries!==null?n.contentQueries[0]:e.length,r=[];for(let o=0;o<i;o++){let a=e.getByIndex(o),s=this.queries[a.indexInDeclarationView];r.push(s.clone())}return new t(r)}return null}insertView(n){this.dirtyQueriesWithMatches(n)}detachView(n){this.dirtyQueriesWithMatches(n)}finishViewCreation(n){this.dirtyQueriesWithMatches(n)}dirtyQueriesWithMatches(n){for(let e=0;e<this.queries.length;e++)Jm(n,e).matches!==null&&this.queries[e].setDirty()}},fc=class{flags;read;predicate;constructor(n,e,i=null){this.flags=e,this.read=i,typeof n=="string"?this.predicate=rI(n):this.predicate=n}},cm=class t{queries;constructor(n=[]){this.queries=n}elementStart(n,e){for(let i=0;i<this.queries.length;i++)this.queries[i].elementStart(n,e)}elementEnd(n){for(let e=0;e<this.queries.length;e++)this.queries[e].elementEnd(n)}embeddedTView(n){let e=null;for(let i=0;i<this.length;i++){let r=e!==null?e.length:0,o=this.getByIndex(i).embeddedTView(n,r);o&&(o.indexInDeclarationView=i,e!==null?e.push(o):e=[o])}return e!==null?new t(e):null}template(n,e){for(let i=0;i<this.queries.length;i++)this.queries[i].template(n,e)}getByIndex(n){return this.queries[n]}get length(){return this.queries.length}track(n){this.queries.push(n)}},dm=class t{metadata;matches=null;indexInDeclarationView=-1;crossesNgTemplate=!1;_declarationNodeIndex;_appliesToNextNode=!0;constructor(n,e=-1){this.metadata=n,this._declarationNodeIndex=e}elementStart(n,e){this.isApplyingToNode(e)&&this.matchTNode(n,e)}elementEnd(n){this._declarationNodeIndex===n.index&&(this._appliesToNextNode=!1)}template(n,e){this.elementStart(n,e)}embeddedTView(n,e){return this.isApplyingToNode(n)?(this.crossesNgTemplate=!0,this.addMatch(-n.index,e),new t(this.metadata)):null}isApplyingToNode(n){if(this._appliesToNextNode&&(this.metadata.flags&1)!==1){let e=this._declarationNodeIndex,i=n.parent;for(;i!==null&&i.type&8&&i.index!==e;)i=i.parent;return e===(i!==null?i.index:-1)}return this._appliesToNextNode}matchTNode(n,e){let i=this.metadata.predicate;if(Array.isArray(i))for(let r=0;r<i.length;r++){let o=i[r];this.matchTNodeWithReadOption(n,e,eI(e,o)),this.matchTNodeWithReadOption(n,e,ec(e,n,o,!1,!1))}else i===lt?e.type&4&&this.matchTNodeWithReadOption(n,e,-1):this.matchTNodeWithReadOption(n,e,ec(e,n,i,!1,!1))}matchTNodeWithReadOption(n,e,i){if(i!==null){let r=this.metadata.read;if(r!==null)if(r===L||r===_t||r===lt&&e.type&4)this.addMatch(e.index,-2);else{let o=ec(e,n,r,!1,!1);o!==null&&this.addMatch(e.index,o)}else this.addMatch(e.index,i)}}addMatch(n,e){this.matches===null?this.matches=[n,e]:this.matches.push(n,e)}};function eI(t,n){let e=t.localNames;if(e!==null){for(let i=0;i<e.length;i+=2)if(e[i]===n)return e[i+1]}return null}function tI(t,n){return t.type&11?go(t,n):t.type&4?Ic(t,n):null}function nI(t,n,e,i){return e===-1?tI(n,t):e===-2?iI(t,n,i):Ra(t,t[Y],e,n)}function iI(t,n,e){if(e===L)return go(n,t);if(e===lt)return Ic(n,t);if(e===_t)return Lv(n,t)}function Vv(t,n,e,i){let r=n[En].queries[i];if(r.matches===null){let o=t.data,a=e.matches,s=[];for(let l=0;a!==null&&l<a.length;l+=2){let c=a[l];if(c<0)s.push(null);else{let u=o[c];s.push(nI(n,u,a[l+1],e.metadata.read))}}r.matches=s}return r.matches}function um(t,n,e,i){let r=t.queries.getByIndex(e),o=r.matches;if(o!==null){let a=Vv(t,n,r,e);for(let s=0;s<o.length;s+=2){let l=o[s];if(l>0)i.push(a[s/2]);else{let c=o[s+1],u=n[-l];for(let f=He;f<u.length;f++){let g=u[f];g[ui]===g[Qe]&&um(g[Y],g,c,i)}if(u[lr]!==null){let f=u[lr];for(let g=0;g<f.length;g++){let p=f[g];um(p[Y],p,c,i)}}}}}return i}function Xm(t,n){return t[En].queries[n].queryList}function Bv(t,n,e){let i=new Un((e&4)===4);return c_(t,n,i,i.destroy),(n[En]??=new lm).queries.push(new sm(i))-1}function jv(t,n,e){let i=Se();return i.firstCreatePass&&(Uv(i,new fc(t,n,e),-1),(n&2)===2&&(i.staticViewQueries=!0)),Bv(i,X(),n)}function Hv(t,n,e,i){let r=Se();if(r.firstCreatePass){let o=Xe();Uv(r,new fc(n,e,i),o.index),oI(r,t),(e&2)===2&&(r.staticContentQueries=!0)}return Bv(r,X(),e)}function rI(t){return t.split(",").map(n=>n.trim())}function Uv(t,n,e){t.queries===null&&(t.queries=new cm),t.queries.track(new dm(n,e))}function oI(t,n){let e=t.contentQueries||(t.contentQueries=[]),i=e.length?e[e.length-1]:-1;n!==i&&e.push(t.queries.length-1,n)}function Jm(t,n){return t.queries.getByIndex(n)}function zv(t,n){let e=t[Y],i=Jm(e,n);return i.crossesNgTemplate?um(e,t,n,[]):Vv(e,t,i,n)}function $v(t,n,e){let i,r=na(()=>{i._dirtyCounter();let o=aI(i,t);if(n&&o===void 0)throw new $(-951,!1);return o});return i=r[Ze],i._dirtyCounter=x(0),i._flatValue=void 0,r}function eh(t){return $v(!0,!1,t)}function th(t){return $v(!0,!0,t)}function Gv(t,n){let e=t[Ze];e._lView=X(),e._queryIndex=n,e._queryList=Xm(e._lView,n),e._queryList.onDirty(()=>e._dirtyCounter.update(i=>i+1))}function aI(t,n){let e=t._lView,i=t._queryIndex;if(e===void 0||i===void 0||e[J]&4)return n?void 0:at;let r=Xm(e,i),o=zv(e,i);return r.reset(o,Tb),n?r.first:r._changesDetected||t._flatValue===void 0?t._flatValue=r.toArray():t._flatValue}var _i=class{};var Pa=class extends _i{injector;componentFactoryResolver=new om(this);instance=null;constructor(n){super();let e=new Ji([...n.providers,{provide:_i,useValue:this},{provide:kc,useValue:this.componentFactoryResolver}],n.parent||Jr(),n.debugName,new Set(["environment"]));this.injector=e,n.runEnvironmentInitializers&&e.resolveInjectorInitializers()}destroy(){this.injector.destroy()}onDestroy(n){this.injector.onDestroy(n)}};function Wv(t,n,e=null){return new Pa({providers:t,parent:n,debugName:e,runEnvironmentInitializers:!0}).injector}var sI=(()=>{class t{_injector;cachedInjectors=new Map;constructor(e){this._injector=e}getOrCreateStandaloneInjector(e){if(!e.standalone)return null;if(!this.cachedInjectors.has(e)){let i=Zu(!1,e.type),r=i.length>0?Wv([i],this._injector,""):null;this.cachedInjectors.set(e,r)}return this.cachedInjectors.get(e)}ngOnDestroy(){try{for(let e of this.cachedInjectors.values())e!==null&&e.destroy()}finally{this.cachedInjectors.clear()}}static \u0275prov=y({token:t,providedIn:"environment",factory:()=>new t(R(Ue))})}return t})();function k(t){return Va(()=>{let n=Yv(t),e=ae(w({},n),{decls:t.decls,vars:t.vars,template:t.template,consts:t.consts||null,ngContentSelectors:t.ngContentSelectors,onPush:t.changeDetection===Em.OnPush,directiveDefs:null,pipeDefs:null,dependencies:n.standalone&&t.dependencies||null,getStandaloneInjector:n.standalone?r=>r.get(sI).getOrCreateStandaloneInjector(e):null,getExternalStyles:null,signals:t.signals??!1,data:t.data||{},encapsulation:t.encapsulation||mn.Emulated,styles:t.styles||at,_:null,schemas:t.schemas||null,tView:null,id:""});n.standalone&&br("NgStandalone"),qv(e);let i=t.dependencies;return e.directiveDefs=ob(i,lI),e.pipeDefs=ob(i,zg),e.id=uI(e),e})}function lI(t){return di(t)||Al(t)}function Z(t){return Va(()=>({type:t.type,bootstrap:t.bootstrap||at,declarations:t.declarations||at,imports:t.imports||at,exports:t.exports||at,transitiveCompileScopes:null,schemas:t.schemas||null,id:t.id||null}))}function cI(t,n){if(t==null)return rn;let e={};for(let i in t)if(t.hasOwnProperty(i)){let r=t[i],o,a,s,l;Array.isArray(r)?(s=r[0],o=r[1],a=r[2]??o,l=r[3]||null):(o=r,a=r,s=Dc.None,l=null),e[o]=[i,s,l],n[o]=a}return e}function dI(t){if(t==null)return rn;let n={};for(let e in t)t.hasOwnProperty(e)&&(n[t[e]]=e);return n}function U(t){return Va(()=>{let n=Yv(t);return qv(n),n})}function Tc(t){return{type:t.type,name:t.name,factory:null,pure:t.pure!==!1,standalone:t.standalone??!0,onDestroy:t.type.prototype.ngOnDestroy||null}}function Yv(t){let n={};return{type:t.type,providersResolver:null,viewProvidersResolver:null,factory:null,hostBindings:t.hostBindings||null,hostVars:t.hostVars||0,hostAttrs:t.hostAttrs||null,contentQueries:t.contentQueries||null,declaredInputs:n,inputConfig:t.inputs||rn,exportAs:t.exportAs||null,standalone:t.standalone??!0,signals:t.signals===!0,selectors:t.selectors||at,viewQuery:t.viewQuery||null,features:t.features||null,setInput:null,resolveHostDirectives:null,hostDirectives:null,controlDef:null,inputs:cI(t.inputs,n),outputs:dI(t.outputs),debugInfo:null}}function qv(t){t.features?.forEach(n=>n(t))}function ob(t,n){return t?()=>{let e=typeof t=="function"?t():t,i=[];for(let r of e){let o=n(r);o!==null&&i.push(o)}return i}:null}function uI(t){let n=0,e=typeof t.consts=="function"?"":t.consts,i=[t.selectors,t.ngContentSelectors,t.hostVars,t.hostAttrs,e,t.vars,t.decls,t.encapsulation,t.standalone,t.signals,t.exportAs,JSON.stringify(t.inputs),JSON.stringify(t.outputs),Object.getOwnPropertyNames(t.type.prototype),!!t.contentQueries,!!t.viewQuery];for(let o of i.join("|"))n=Math.imul(31,n)+o.charCodeAt(0)<<0;return n+=2147483648,"c"+n}function nh(t){let n=e=>{let i=Array.isArray(t);e.hostDirectives===null?(e.resolveHostDirectives=fI,e.hostDirectives=i?t.map(fm):[t]):i?e.hostDirectives.unshift(...t.map(fm)):e.hostDirectives.unshift(t)};return n.ngInherit=!0,n}function fI(t){let n=[],e=!1,i=null,r=null;for(let o=0;o<t.length;o++){let a=t[o];if(a.hostDirectives!==null){let s=n.length;i??=new Map,r??=new Map,Zv(a,n,i),r.set(a,[s,n.length-1])}o===0&&ln(a)&&(e=!0,n.push(a))}for(let o=e?1:0;o<t.length;o++)n.push(t[o]);return[n,i,r]}function Zv(t,n,e){if(t.hostDirectives!==null)for(let i of t.hostDirectives)if(typeof i=="function"){let r=i();for(let o of r)ab(fm(o),n,e)}else ab(i,n,e)}function ab(t,n,e){let i=Al(t.directive);mI(i.declaredInputs,t.inputs),Zv(i,n,e),e.set(i,t),n.push(i)}function fm(t){return typeof t=="function"?{directive:Ke(t),inputs:rn,outputs:rn}:{directive:Ke(t.directive),inputs:sb(t.inputs),outputs:sb(t.outputs)}}function sb(t){if(t===void 0||t.length===0)return rn;let n={};for(let e=0;e<t.length;e+=2)n[t[e]]=t[e+1];return n}function mI(t,n){for(let e in n)if(n.hasOwnProperty(e)){let i=n[e],r=t[e];t[i]=r}}function hI(t){return Object.getPrototypeOf(t.prototype).constructor}function _e(t){let n=hI(t.type),e=!0,i=[t];for(;n;){let r;if(ln(t))r=n.\u0275cmp||n.\u0275dir;else{if(n.\u0275cmp)throw new $(903,!1);r=n.\u0275dir}if(r){if(e){i.push(r);let a=t;a.inputs=Rf(t.inputs),a.declaredInputs=Rf(t.declaredInputs),a.outputs=Rf(t.outputs);let s=r.hostBindings;s&&vI(t,s);let l=r.viewQuery,c=r.contentQueries;if(l&&_I(t,l),c&&bI(t,c),pI(t,r),Ug(t.outputs,r.outputs),ln(r)&&r.data.animation){let u=t.data;u.animation=(u.animation||[]).concat(r.data.animation)}}let o=r.features;if(o)for(let a=0;a<o.length;a++){let s=o[a];s&&s.ngInherit&&s(t),s===_e&&(e=!1)}}n=Object.getPrototypeOf(n)}gI(i)}function pI(t,n){for(let e in n.inputs){if(!n.inputs.hasOwnProperty(e)||t.inputs.hasOwnProperty(e))continue;let i=n.inputs[e];i!==void 0&&(t.inputs[e]=i,t.declaredInputs[e]=n.declaredInputs[e])}}function gI(t){let n=0,e=null;for(let i=t.length-1;i>=0;i--){let r=t[i];r.hostVars=n+=r.hostVars,r.hostAttrs=co(r.hostAttrs,e=co(e,r.hostAttrs))}}function Rf(t){return t===rn?{}:t===at?[]:t}function _I(t,n){let e=t.viewQuery;e?t.viewQuery=(i,r)=>{n(i,r),e(i,r)}:t.viewQuery=n}function bI(t,n){let e=t.contentQueries;e?t.contentQueries=(i,r,o)=>{n(i,r,o),e(i,r,o)}:t.contentQueries=n}function vI(t,n){let e=t.hostBindings;e?t.hostBindings=(i,r)=>{n(i,r),e(i,r)}:t.hostBindings=n}function Kv(t,n,e,i,r,o,a,s){if(e.firstCreatePass){t.mergedAttrs=co(t.mergedAttrs,t.attrs);let u=t.tView=Fm(2,t,r,o,a,e.directiveRegistry,e.pipeRegistry,null,e.schemas,e.consts,null);e.queries!==null&&(e.queries.template(e,t),u.queries=e.queries.embeddedTView(t))}s&&(t.flags|=s),oo(t,!1);let l=DI(e,n,t,i);Wl()&&Um(e,n,l,t),uo(l,n);let c=wv(l,n,l,t);n[i+Oe]=c,Lm(n,c),XM(c,t,n)}function yI(t,n,e,i,r,o,a,s,l,c,u){let f=e+Oe,g;return n.firstCreatePass?(g=_o(n,f,4,a||null,s||null),jl()&&Av(n,t,g,Tt(n.consts,c),$m),bb(n,g)):g=n.data[f],Kv(g,t,n,e,i,r,o,l),io(g)&&Mc(n,t,g),c!=null&&za(t,g,u),g}function ho(t,n,e,i,r,o,a,s,l,c,u){let f=e+Oe,g;if(n.firstCreatePass){if(g=_o(n,f,4,a||null,s||null),c!=null){let p=Tt(n.consts,c);g.localNames=[];for(let v=0;v<p.length;v+=2)g.localNames.push(p[v],-1)}}else g=n.data[f];return Kv(g,t,n,e,i,r,o,l),c!=null&&za(t,g,u),g}function it(t,n,e,i,r,o,a,s){let l=X(),c=Se(),u=Tt(c.consts,o);return yI(l,c,t,n,e,i,r,u,void 0,a,s),it}function Ya(t,n,e,i,r,o,a,s){let l=X(),c=Se(),u=Tt(c.consts,o);return ho(l,c,t,n,e,i,r,u,void 0,a,s),Ya}var DI=CI;function CI(t,n,e,i){return Ma(!0),n[Ce].createComment("")}function vi(t){return typeof t=="function"&&t[Ze]!==void 0}function ih(t){return vi(t)&&typeof t.set=="function"}var rh=new b("");function bo(t){return!!t&&typeof t.then=="function"}function oh(t){return!!t&&typeof t.subscribe=="function"}var Qv=new b("");var ah=(()=>{class t{resolve;reject;initialized=!1;done=!1;donePromise=new Promise((e,i)=>{this.resolve=e,this.reject=i});appInits=d(Qv,{optional:!0})??[];injector=d(G);constructor(){}runInitializers(){if(this.initialized)return;let e=[];for(let r of this.appInits){let o=eo(this.injector,r);if(bo(o))e.push(o);else if(oh(o)){let a=new Promise((s,l)=>{o.subscribe({complete:s,error:l})});e.push(a)}}let i=()=>{this.done=!0,this.resolve()};Promise.all(e).then(()=>{i()}).catch(r=>{this.reject(r)}),e.length===0&&i(),this.initialized=!0}static \u0275fac=function(i){return new(i||t)};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),Xv=new b("");function Jv(){cu(()=>{let t="";throw new $(600,t)})}function ey(t){return t.isBoundToModule}var xI=10;var $t=(()=>{class t{_runningTick=!1;_destroyed=!1;_destroyListeners=[];_views=[];internalErrorHandler=d(Hn);afterRenderManager=d(xc);zonelessEnabled=d(Ia);rootEffectScheduler=d(Yl);dirtyFlags=0;tracingSnapshot=null;allTestViews=new Set;autoDetectTestViews=new Set;includeAllTestViews=!1;afterTick=new E;get allViews(){return[...(this.includeAllTestViews?this.allTestViews:this.autoDetectTestViews).keys(),...this._views]}get destroyed(){return this._destroyed}componentTypes=[];components=[];internalPendingTask=d(ur);get isStable(){return this.internalPendingTask.hasPendingTasksObservable.pipe(Ee(e=>!e))}constructor(){d(pn,{optional:!0})}whenStable(){let e;return new Promise(i=>{e=this.isStable.subscribe({next:r=>{r&&i()}})}).finally(()=>{e.unsubscribe()})}_injector=d(Ue);_rendererFactory=null;get injector(){return this._injector}bootstrap(e,i){return this.bootstrapImpl(e,i)}bootstrapImpl(e,i,r=G.NULL){return this._injector.get(A).run(()=>{ge(he.BootstrapComponentStart);let a=e instanceof Sc;if(!this._injector.get(ah).done){let v="";throw new $(405,v)}let l;a?l=e:l=this._injector.get(kc).resolveComponentFactory(e),this.componentTypes.push(l.componentType);let c=ey(l)?void 0:this._injector.get(_i),u=i||l.selector,f=l.create(r,[],u,c),g=f.location.nativeElement,p=f.injector.get(rh,null);return p?.registerApplication(g),f.onDestroy(()=>{this.detachView(f.hostView),Aa(this.components,f),p?.unregisterApplication(g)}),this._loadComponent(f),ge(he.BootstrapComponentEnd,f),f})}tick(){this.zonelessEnabled||(this.dirtyFlags|=1),this._tick()}_tick(){ge(he.ChangeDetectionStart),this.tracingSnapshot!==null?this.tracingSnapshot.run(Cc.CHANGE_DETECTION,this.tickImpl):this.tickImpl()}tickImpl=()=>{if(this._runningTick)throw ge(he.ChangeDetectionEnd),new $(101,!1);let e=W(null);try{this._runningTick=!0,this.synchronize()}finally{this._runningTick=!1,this.tracingSnapshot?.dispose(),this.tracingSnapshot=null,W(e),this.afterTick.next(),ge(he.ChangeDetectionEnd)}};synchronize(){this._rendererFactory===null&&!this._injector.destroyed&&(this._rendererFactory=this._injector.get(Ge,null,{optional:!0}));let e=0;for(;this.dirtyFlags!==0&&e++<xI;){ge(he.ChangeDetectionSyncStart);try{this.synchronizeOnce()}finally{ge(he.ChangeDetectionSyncEnd)}}}synchronizeOnce(){this.dirtyFlags&16&&(this.dirtyFlags&=-17,this.rootEffectScheduler.flush());let e=!1;if(this.dirtyFlags&7){let i=!!(this.dirtyFlags&1);this.dirtyFlags&=-8,this.dirtyFlags|=8;for(let{_lView:r}of this.allViews){if(!i&&!xa(r))continue;let o=i&&!this.zonelessEnabled?0:1;yv(r,o),e=!0}if(this.dirtyFlags&=-5,this.syncDirtyFlagsWithViews(),this.dirtyFlags&23)return}e||(this._rendererFactory?.begin?.(),this._rendererFactory?.end?.()),this.dirtyFlags&8&&(this.dirtyFlags&=-9,this.afterRenderManager.execute()),this.syncDirtyFlagsWithViews()}syncDirtyFlagsWithViews(){if(this.allViews.some(({_lView:e})=>xa(e))){this.dirtyFlags|=2;return}else this.dirtyFlags&=-8}attachView(e){let i=e;this._views.push(i),i.attachToAppRef(this)}detachView(e){let i=e;Aa(this._views,i),i.detachFromAppRef()}_loadComponent(e){this.attachView(e.hostView);try{this.tick()}catch(r){this.internalErrorHandler(r)}this.components.push(e),this._injector.get(Xv,[]).forEach(r=>r(e))}ngOnDestroy(){if(!this._destroyed)try{this._destroyListeners.forEach(e=>e()),this._views.slice().forEach(e=>e.destroy())}finally{this._destroyed=!0,this._views=[],this._destroyListeners=[]}}onDestroy(e){return this._destroyListeners.push(e),()=>Aa(this._destroyListeners,e)}destroy(){if(this._destroyed)throw new $(406,!1);let e=this._injector;e.destroy&&!e.destroyed&&e.destroy()}get viewCount(){return this._views.length}static \u0275fac=function(i){return new(i||t)};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function Aa(t,n){let e=t.indexOf(n);e>-1&&t.splice(e,1)}function P(t,n,e,i){let r=X(),o=hi();if(zt(r,o,n)){let a=Se(),s=Ea();QE(s,r,t,n,e,i)}return P}var mm=class{destroy(n){}updateValue(n,e){}swap(n,e){let i=Math.min(n,e),r=Math.max(n,e),o=this.detach(r);if(r-i>1){let a=this.detach(i);this.attach(i,o),this.attach(r,a)}else this.attach(i,o)}move(n,e){this.attach(e,this.detach(n))}};function Of(t,n,e,i,r){return t===e&&Object.is(n,i)?1:Object.is(r(t,n),r(e,i))?-1:0}function wI(t,n,e,i){let r,o,a=0,s=t.length-1,l=void 0;if(Array.isArray(n)){W(i);let c=n.length-1;for(W(null);a<=s&&a<=c;){let u=t.at(a),f=n[a],g=Of(a,u,a,f,e);if(g!==0){g<0&&t.updateValue(a,f),a++;continue}let p=t.at(s),v=n[c],S=Of(s,p,c,v,e);if(S!==0){S<0&&t.updateValue(s,v),s--,c--;continue}let N=e(a,u),z=e(s,p),ke=e(a,f);if(Object.is(ke,z)){let It=e(c,v);Object.is(It,N)?(t.swap(a,s),t.updateValue(s,v),c--,s--):t.move(s,a),t.updateValue(a,f),a++;continue}if(r??=new mc,o??=cb(t,a,s,e),hm(t,r,a,ke))t.updateValue(a,f),a++,s++;else if(o.has(ke))r.set(N,t.detach(a)),s--;else{let It=t.create(a,n[a]);t.attach(a,It),a++,s++}}for(;a<=c;)lb(t,r,e,a,n[a]),a++}else if(n!=null){W(i);let c=n[Symbol.iterator]();W(null);let u=c.next();for(;!u.done&&a<=s;){let f=t.at(a),g=u.value,p=Of(a,f,a,g,e);if(p!==0)p<0&&t.updateValue(a,g),a++,u=c.next();else{r??=new mc,o??=cb(t,a,s,e);let v=e(a,g);if(hm(t,r,a,v))t.updateValue(a,g),a++,s++,u=c.next();else if(!o.has(v))t.attach(a,t.create(a,g)),a++,s++,u=c.next();else{let S=e(a,f);r.set(S,t.detach(a)),s--}}}for(;!u.done;)lb(t,r,e,t.length,u.value),u=c.next()}for(;a<=s;)t.destroy(t.detach(s--));r?.forEach(c=>{t.destroy(c)})}function hm(t,n,e,i){return n!==void 0&&n.has(i)?(t.attach(e,n.get(i)),n.delete(i),!0):!1}function lb(t,n,e,i,r){if(hm(t,n,i,e(i,r)))t.updateValue(i,r);else{let o=t.create(i,r);t.attach(i,o)}}function cb(t,n,e,i){let r=new Set;for(let o=n;o<=e;o++)r.add(i(o,t.at(o)));return r}var mc=class{kvMap=new Map;_vMap=void 0;has(n){return this.kvMap.has(n)}delete(n){if(!this.has(n))return!1;let e=this.kvMap.get(n);return this._vMap!==void 0&&this._vMap.has(e)?(this.kvMap.set(n,this._vMap.get(e)),this._vMap.delete(e)):this.kvMap.delete(n),!0}get(n){return this.kvMap.get(n)}set(n,e){if(this.kvMap.has(n)){let i=this.kvMap.get(n);this._vMap===void 0&&(this._vMap=new Map);let r=this._vMap;for(;r.has(i);)i=r.get(i);r.set(i,e)}else this.kvMap.set(n,e)}forEach(n){for(let[e,i]of this.kvMap)if(n(i,e),this._vMap!==void 0){let r=this._vMap;for(;r.has(i);)i=r.get(i),n(i,e)}}};function V(t,n,e,i,r,o,a,s){br("NgControlFlow");let l=X(),c=Se(),u=Tt(c.consts,o);return ho(l,c,t,n,e,i,r,u,256,a,s),sh}function sh(t,n,e,i,r,o,a,s){br("NgControlFlow");let l=X(),c=Se(),u=Tt(c.consts,o);return ho(l,c,t,n,e,i,r,u,512,a,s),sh}function B(t,n){br("NgControlFlow");let e=X(),i=hi(),r=e[i]!==Dt?e[i]:-1,o=r!==-1?hc(e,Oe+r):void 0,a=0;if(zt(e,i,t)){let s=W(null);try{if(o!==void 0&&Mv(o,a),t!==-1){let l=Oe+t,c=hc(e,l),u=bm(e[Y],l),f=Sv(c,u,e),g=$a(e,u,n,{dehydratedView:f});Ga(c,g,a,fo(u,f))}}finally{W(s)}}else if(o!==void 0){let s=Ev(o,a);s!==void 0&&(s[ze]=n)}}var pm=class{lContainer;$implicit;$index;constructor(n,e,i){this.lContainer=n,this.$implicit=e,this.$index=i}get $count(){return this.lContainer.length-He}};function lh(t){return t}var gm=class{hasEmptyBlock;trackByFn;liveCollection;constructor(n,e,i){this.hasEmptyBlock=n,this.trackByFn=e,this.liveCollection=i}};function Ct(t,n,e,i,r,o,a,s,l,c,u,f,g){br("NgControlFlow");let p=X(),v=Se(),S=l!==void 0,N=X(),z=s?a.bind(N[gt][ze]):a,ke=new gm(S,z);N[Oe+t]=ke,ho(p,v,t+1,n,e,i,r,Tt(v.consts,o),256),S&&ho(p,v,t+2,l,c,u,f,Tt(v.consts,g),512)}var _m=class extends mm{lContainer;hostLView;templateTNode;operationsCounter=void 0;needsIndexUpdate=!1;constructor(n,e,i){super(),this.lContainer=n,this.hostLView=e,this.templateTNode=i}get length(){return this.lContainer.length-He}at(n){return this.getLView(n)[ze].$implicit}attach(n,e){let i=e[rr];this.needsIndexUpdate||=n!==this.length,Ga(this.lContainer,e,n,fo(this.templateTNode,i)),EI(this.lContainer,n)}detach(n){return this.needsIndexUpdate||=n!==this.length-1,MI(this.lContainer,n),II(this.lContainer,n)}create(n,e){let i=cc(this.lContainer,this.templateTNode.tView.ssrId);return $a(this.hostLView,this.templateTNode,new pm(this.lContainer,e,n),{dehydratedView:i})}destroy(n){wc(n[Y],n)}updateValue(n,e){this.getLView(n)[ze].$implicit=e}reset(){this.needsIndexUpdate=!1}updateIndexes(){if(this.needsIndexUpdate)for(let n=0;n<this.length;n++)this.getLView(n)[ze].$index=n}getLView(n){return SI(this.lContainer,n)}};function xt(t){let n=W(null),e=Mn();try{let i=X(),r=i[Y],o=i[e],a=e+1,s=hc(i,a);if(o.liveCollection===void 0){let c=bm(r,a);o.liveCollection=new _m(s,i,c)}else o.liveCollection.reset();let l=o.liveCollection;if(wI(l,t,o.trackByFn,n),l.updateIndexes(),o.hasEmptyBlock){let c=hi(),u=l.length===0;if(zt(i,c,u)){let f=e+2,g=hc(i,f);if(u){let p=bm(r,f),v=Sv(g,p,i),S=$a(i,p,void 0,{dehydratedView:v});Ga(g,S,0,fo(p,v))}else r.firstUpdatePass&&DM(g),Mv(g,0)}}}finally{W(n)}}function hc(t,n){return t[n]}function EI(t,n){if(t.length<=He)return;let e=He+n,i=t[e],r=i?i[fi]:void 0;if(i&&r&&r.detachedLeaveAnimationFns&&r.detachedLeaveAnimationFns.length>0){let o=i[Pn];kE(o,r),hr.delete(i[Ln]),r.detachedLeaveAnimationFns=void 0}}function MI(t,n){if(t.length<=He)return;let e=He+n,i=t[e],r=i?i[fi]:void 0;r&&r.leave&&r.leave.size>0&&(r.detachedLeaveAnimationFns=[])}function II(t,n){return Fa(t,n)}function SI(t,n){return Ev(t,n)}function bm(t,n){return Ll(t,n)}function T(t,n,e){let i=X(),r=hi();if(zt(i,r,n)){let o=Se(),a=Ea();mv(a,i,t,n,i[Ce],e)}return T}function vm(t,n,e,i,r){Ym(n,t,e,r?"class":"style",i)}function m(t,n,e,i){let r=X(),o=r[Y],a=t+Oe,s=o.firstCreatePass?Km(a,r,2,n,$m,jl(),e,i):o.data[a];if(Bn(s)){let l=r[an].tracingService;if(l&&l.componentCreate){let c=o.data[s.directiveStart+s.componentOffset];return l.componentCreate(Fv(c),()=>(db(t,n,r,s,i),m))}}return db(t,n,r,s,i),m}function db(t,n,e,i,r){if(Gm(i,e,t,n,ty),io(i)){let o=e[Y];Mc(o,e,i),Im(o,i,e)}r!=null&&za(e,i)}function h(){let t=Se(),n=Xe(),e=Wm(n);return t.firstCreatePass&&Qm(t,e),hf(e)&&pf(),ff(),e.classesWithoutHost!=null&&hw(e)&&vm(t,e,X(),e.classesWithoutHost,!0),e.stylesWithoutHost!=null&&pw(e)&&vm(t,e,X(),e.stylesWithoutHost,!1),h}function j(t,n,e,i){return m(t,n,e,i),h(),j}function Ae(t,n,e,i){let r=X(),o=r[Y],a=t+Oe,s=o.firstCreatePass?FM(a,o,2,n,e,i):o.data[a];return Gm(s,r,t,n,ty),i!=null&&za(r,s),Ae}function Ve(){let t=Xe(),n=Wm(t);return hf(n)&&pf(),ff(),Ve}function ct(t,n,e,i){return Ae(t,n,e,i),Ve(),ct}var ty=(t,n,e,i,r)=>(Ma(!0),Zb(n[Ce],i,E_()));function ch(t,n,e){let i=X(),r=i[Y],o=t+Oe,a=r.firstCreatePass?Km(o,i,8,"ng-container",$m,jl(),n,e):r.data[o];if(Gm(a,i,t,"ng-container",kI),io(a)){let s=i[Y];Mc(s,i,a),Im(s,a,i)}return e!=null&&za(i,a),ch}function dh(){let t=Se(),n=Xe(),e=Wm(n);return t.firstCreatePass&&Qm(t,e),dh}function vo(t,n,e){return ch(t,n,e),dh(),vo}var kI=(t,n,e,i,r)=>(Ma(!0),aE(n[Ce],""));function pe(){return X()}function et(t,n,e){let i=X(),r=hi();if(zt(i,r,n)){let o=Se(),a=Ea();hv(a,i,t,n,i[Ce],e)}return et}var qa="en-US";var TI=qa;function ny(t){typeof t=="string"&&(TI=t.toLowerCase().replace(/_/g,"-"))}function M(t,n,e){let i=X(),r=Se(),o=Xe();return iy(r,i,i[Ce],o,t,n,e),M}function yi(t,n,e){let i=X(),r=Se(),o=Xe();return(o.type&3||e)&&Ov(o,r,i,e,i[Ce],t,n,nc(o,i,n)),yi}function iy(t,n,e,i,r,o,a){let s=!0,l=null;if((i.type&3||a)&&(l??=nc(i,n,o),Ov(i,t,n,a,e,r,o,l)&&(s=!1)),s){let c=i.outputs?.[r],u=i.hostDirectiveOutputs?.[r];if(u&&u.length)for(let f=0;f<u.length;f+=2){let g=u[f],p=u[f+1];l??=nc(i,n,o),nb(i,n,g,p,r,l)}if(c&&c.length)for(let f of c)l??=nc(i,n,o),nb(i,n,f,r,r,l)}}function D(t=1){return w_(t)}function AI(t,n){let e=null,i=hE(t);for(let r=0;r<n.length;r++){let o=n[r];if(o==="*"){e=r;continue}if(i===null?tv(t,o,!0):_E(i,o))return r}return e}function Ne(t){let n=X()[gt][pt];if(!n.projection){let e=t?t.length:1,i=n.projection=Zg(e,null),r=i.slice(),o=n.child;for(;o!==null;){if(o.type!==128){let a=t?AI(o,t):0;a!==null&&(r[a]?r[a].projectionNext=o:i[a]=o,r[a]=o)}o=o.next}}}function ce(t,n=0,e,i,r,o){let a=X(),s=Se(),l=i?t+1:null;l!==null&&ho(a,s,l,i,r,o,null,e);let c=_o(s,Oe+t,16,null,e||null);c.projection===null&&(c.projection=n),bf();let f=!a[rr]||mf();a[gt][pt].projection[c.projection]===null&&l!==null?RI(a,s,l):f&&!_c(c)&&jE(s,a,c)}function RI(t,n,e){let i=Oe+e,r=n.data[i],o=t[i],a=cc(o,r.tView.ssrId),s=$a(t,r,void 0,{dehydratedView:a});Ga(o,s,0,fo(r,a))}function kn(t,n,e,i){return Hv(t,n,e,i),kn}function ve(t,n,e){return jv(t,n,e),ve}function K(t){let n=X(),e=Se(),i=zl();wa(i+1);let r=Jm(e,i);if(t.dirty&&o_(n)===((r.metadata.flags&2)===2)){if(r.matches===null)t.reset([]);else{let o=zv(n,i);t.reset(o,Tb),t.notifyOnChanges()}return!0}return!1}function Q(){return Xm(X(),zl())}function Ac(t,n,e,i,r){return Gv(n,Hv(t,e,i,r)),Ac}function Rc(t,n,e,i){return Gv(t,jv(n,e,i)),Rc}function Oc(t=1){wa(zl()+t)}function Gt(t){let n=m_();return of(n,Oe+t)}function Ql(t,n){return t<<17|n<<2}function pr(t){return t>>17&32767}function OI(t){return(t&2)==2}function NI(t,n){return t&131071|n<<17}function ym(t){return t|2}function po(t){return(t&131068)>>2}function Nf(t,n){return t&-131069|n<<2}function FI(t){return(t&1)===1}function Dm(t){return t|1}function PI(t,n,e,i,r,o){let a=o?n.classBindings:n.styleBindings,s=pr(a),l=po(a);t[i]=e;let c=!1,u;if(Array.isArray(e)){let f=e;u=f[1],(u===null||Xr(f,u)>0)&&(c=!0)}else u=e;if(r)if(l!==0){let g=pr(t[s+1]);t[i+1]=Ql(g,s),g!==0&&(t[g+1]=Nf(t[g+1],i)),t[s+1]=NI(t[s+1],i)}else t[i+1]=Ql(s,0),s!==0&&(t[s+1]=Nf(t[s+1],i)),s=i;else t[i+1]=Ql(l,0),s===0?s=i:t[l+1]=Nf(t[l+1],i),l=i;c&&(t[i+1]=ym(t[i+1])),ub(t,u,i,!0),ub(t,u,i,!1),LI(n,u,t,i,o),a=Ql(s,l),o?n.classBindings=a:n.styleBindings=a}function LI(t,n,e,i,r){let o=r?t.residualClasses:t.residualStyles;o!=null&&typeof n=="string"&&Xr(o,n)>=0&&(e[i+1]=Dm(e[i+1]))}function ub(t,n,e,i){let r=t[e+1],o=n===null,a=i?pr(r):po(r),s=!1;for(;a!==0&&(s===!1||o);){let l=t[a],c=t[a+1];VI(l,n)&&(s=!0,t[a+1]=i?Dm(c):ym(c)),a=i?pr(c):po(c)}s&&(t[e+1]=i?ym(r):Dm(r))}function VI(t,n){return t===null||n==null||(Array.isArray(t)?t[1]:t)===n?!0:Array.isArray(t)&&typeof n=="string"?Xr(t,n)>=0:!1}var fn={textEnd:0,key:0,keyEnd:0,value:0,valueEnd:0};function BI(t){return t.substring(fn.key,fn.keyEnd)}function jI(t){return HI(t),ry(t,oy(t,0,fn.textEnd))}function ry(t,n){let e=fn.textEnd;return e===n?-1:(n=fn.keyEnd=UI(t,fn.key=n,e),oy(t,n,e))}function HI(t){fn.key=0,fn.keyEnd=0,fn.value=0,fn.valueEnd=0,fn.textEnd=t.length}function oy(t,n,e){for(;n<e&&t.charCodeAt(n)<=32;)n++;return n}function UI(t,n,e){for(;n<e&&t.charCodeAt(n)>32;)n++;return n}function dt(t,n,e){return ay(t,n,e,!1),dt}function I(t,n){return ay(t,n,null,!0),I}function rt(t){$I(KI,zI,t,!0)}function zI(t,n){for(let e=jI(n);e>=0;e=ry(n,e))Nl(t,BI(n),!0)}function ay(t,n,e,i){let r=X(),o=Se(),a=Hl(2);if(o.firstUpdatePass&&ly(o,t,a,i),n!==Dt&&zt(r,a,n)){let s=o.data[Mn()];cy(o,s,r,r[Ce],t,r[a+1]=XI(n,e),i,a)}}function $I(t,n,e,i){let r=Se(),o=Hl(2);r.firstUpdatePass&&ly(r,null,o,i);let a=X();if(e!==Dt&&zt(a,o,e)){let s=r.data[Mn()];if(dy(s,i)&&!sy(r,o)){let l=i?s.classesWithoutHost:s.stylesWithoutHost;l!==null&&(e=Sl(l,e||"")),vm(r,s,a,e,i)}else QI(r,s,a,a[Ce],a[o+1],a[o+1]=ZI(t,n,e),i,o)}}function sy(t,n){return n>=t.expandoStartIndex}function ly(t,n,e,i){let r=t.data;if(r[e+1]===null){let o=r[Mn()],a=sy(t,e);dy(o,i)&&n===null&&!a&&(n=!1),n=GI(r,o,n,i),PI(r,o,n,e,a,i)}}function GI(t,n,e,i){let r=y_(t),o=i?n.residualClasses:n.residualStyles;if(r===null)(i?n.classBindings:n.styleBindings)===0&&(e=Ff(null,t,n,e,i),e=La(e,n.attrs,i),o=null);else{let a=n.directiveStylingLast;if(a===-1||t[a]!==r)if(e=Ff(r,t,n,e,i),o===null){let l=WI(t,n,i);l!==void 0&&Array.isArray(l)&&(l=Ff(null,t,n,l[1],i),l=La(l,n.attrs,i),YI(t,n,i,l))}else o=qI(t,n,i)}return o!==void 0&&(i?n.residualClasses=o:n.residualStyles=o),e}function WI(t,n,e){let i=e?n.classBindings:n.styleBindings;if(po(i)!==0)return t[pr(i)]}function YI(t,n,e,i){let r=e?n.classBindings:n.styleBindings;t[pr(r)]=i}function qI(t,n,e){let i,r=n.directiveEnd;for(let o=1+n.directiveStylingLast;o<r;o++){let a=t[o].hostAttrs;i=La(i,a,e)}return La(i,n.attrs,e)}function Ff(t,n,e,i,r){let o=null,a=e.directiveEnd,s=e.directiveStylingLast;for(s===-1?s=e.directiveStart:s++;s<a&&(o=n[s],i=La(i,o.hostAttrs,r),o!==t);)s++;return t!==null&&(e.directiveStylingLast=s),i}function La(t,n,e){let i=e?1:2,r=-1;if(n!==null)for(let o=0;o<n.length;o++){let a=n[o];typeof a=="number"?r=a:r===i&&(Array.isArray(t)||(t=t===void 0?[]:["",t]),Nl(t,a,e?!0:n[++o]))}return t===void 0?null:t}function ZI(t,n,e){if(e==null||e==="")return at;let i=[],r=hn(e);if(Array.isArray(r))for(let o=0;o<r.length;o++)t(i,r[o],!0);else if(r instanceof Set)for(let o of r)t(i,o,!0);else if(typeof r=="object")for(let o in r)r.hasOwnProperty(o)&&t(i,o,r[o]);else typeof r=="string"&&n(i,r);return i}function KI(t,n,e){let i=String(n);i!==""&&!i.includes(" ")&&Nl(t,i,e)}function QI(t,n,e,i,r,o,a,s){r===Dt&&(r=at);let l=0,c=0,u=0<r.length?r[0]:null,f=0<o.length?o[0]:null;for(;u!==null||f!==null;){let g=l<r.length?r[l+1]:void 0,p=c<o.length?o[c+1]:void 0,v=null,S;u===f?(l+=2,c+=2,g!==p&&(v=f,S=p)):f===null||u!==null&&u<f?(l+=2,v=u):(c+=2,v=f,S=p),v!==null&&cy(t,n,e,i,v,S,a,s),u=l<r.length?r[l]:null,f=c<o.length?o[c]:null}}function cy(t,n,e,i,r,o,a,s){if(!(n.type&3))return;let l=t.data,c=l[s+1],u=FI(c)?fb(l,n,e,r,po(c),a):void 0;if(!pc(u)){pc(o)||OI(c)&&(o=fb(l,null,e,r,s,a));let f=rf(Mn(),e);UE(i,a,f,r,o)}}function fb(t,n,e,i,r,o){let a=n===null,s;for(;r>0;){let l=t[r],c=Array.isArray(l),u=c?l[1]:l,f=u===null,g=e[r+1];g===Dt&&(g=f?at:void 0);let p=f?Fl(g,i):u===i?g:void 0;if(c&&!pc(p)&&(p=Fl(l,i)),pc(p)&&(s=p,a))return s;let v=t[r+1];r=a?pr(v):po(v)}if(n!==null){let l=o?n.residualClasses:n.residualStyles;l!=null&&(s=Fl(l,i))}return s}function pc(t){return t!==void 0}function XI(t,n){return t==null||t===""||(typeof n=="string"?t=t+n:typeof t=="object"&&(t=Il(hn(t)))),t}function dy(t,n){return(t.flags&(n?8:16))!==0}function C(t,n=""){let e=X(),i=Se(),r=t+Oe,o=i.firstCreatePass?_o(i,r,1,n,null):i.data[r],a=JI(i,e,o,n);e[r]=a,Wl()&&Um(i,e,a,o),oo(o,!1)}var JI=(t,n,e,i)=>(Ma(!0),rE(n[Ce],i));function eS(t,n,e,i=""){return zt(t,hi(),e)?n+tr(e)+i:Dt}function tS(t,n,e,i,r,o=""){let a=p_(),s=LM(t,a,e,r);return Hl(2),s?n+tr(e)+i+tr(r)+o:Dt}function oe(t){return Fe("",t),oe}function Fe(t,n,e){let i=X(),r=eS(i,t,n,e);return r!==Dt&&uy(i,Mn(),r),Fe}function vr(t,n,e,i,r){let o=X(),a=tS(o,t,n,e,i,r);return a!==Dt&&uy(o,Mn(),a),vr}function uy(t,n,e){let i=rf(n,t);oE(t[Ce],i,e)}function yo(t,n,e){ih(n)&&(n=n());let i=X(),r=hi();if(zt(i,r,n)){let o=Se(),a=Ea();mv(a,i,t,n,i[Ce],e)}return yo}function Za(t,n){let e=ih(t);return e&&t.set(n),e}function Do(t,n){let e=X(),i=Se(),r=Xe();return iy(i,e,e[Ce],r,t,n),Do}function mb(t,n,e){let i=Se();i.firstCreatePass&&fy(n,i.data,i.blueprint,ln(t),e)}function fy(t,n,e,i,r){if(t=Ke(t),Array.isArray(t))for(let o=0;o<t.length;o++)fy(t[o],n,e,i,r);else{let o=Se(),a=X(),s=Xe(),l=Xi(t)?t:Ke(t.provide),c=Qu(t),u=s.providerIndexes&1048575,f=s.directiveStart,g=s.providerIndexes>>20;if(Xi(t)||!t.multi){let p=new mr(c,r,ee,null),v=Lf(l,n,r?u:u+g,f);v===-1?(Bf(sc(s,a),o,l),Pf(o,t,n.length),n.push(l),s.directiveStart++,s.directiveEnd++,r&&(s.providerIndexes+=1048576),e.push(p),a.push(p)):(e[v]=p,a[v]=p)}else{let p=Lf(l,n,u+g,f),v=Lf(l,n,u,u+g),S=p>=0&&e[p],N=v>=0&&e[v];if(r&&!N||!r&&!S){Bf(sc(s,a),o,l);let z=rS(r?iS:nS,e.length,r,i,c,t);!r&&N&&(e[v].providerFactory=z),Pf(o,t,n.length,0),n.push(l),s.directiveStart++,s.directiveEnd++,r&&(s.providerIndexes+=1048576),e.push(z),a.push(z)}else{let z=my(e[r?v:p],c,!r&&i);Pf(o,t,p>-1?p:v,z)}!r&&i&&N&&e[v].componentProviders++}}}function Pf(t,n,e,i){let r=Xi(n),o=t_(n);if(r||o){let l=(o?Ke(n.useClass):n).prototype.ngOnDestroy;if(l){let c=t.destroyHooks||(t.destroyHooks=[]);if(!r&&n.multi){let u=c.indexOf(e);u===-1?c.push(e,[i,l]):c[u+1].push(i,l)}else c.push(e,l)}}}function my(t,n,e){return e&&t.componentProviders++,t.multi.push(n)-1}function Lf(t,n,e,i){for(let r=e;r<i;r++)if(n[r]===t)return r;return-1}function nS(t,n,e,i,r){return Cm(this.multi,[])}function iS(t,n,e,i,r){let o=this.multi,a;if(this.providerFactory){let s=this.providerFactory.componentProviders,l=Ra(i,i[Y],this.providerFactory.index,r);a=l.slice(0,s),Cm(o,a);for(let c=s;c<l.length;c++)a.push(l[c])}else a=[],Cm(o,a);return a}function Cm(t,n){for(let e=0;e<t.length;e++){let i=t[e];n.push(i())}return n}function rS(t,n,e,i,r,o){let a=new mr(t,e,ee,null);return a.multi=[],a.index=n,a.componentProviders=0,my(a,r,i&&!e),a}function Be(t,n){return e=>{e.providersResolver=(i,r)=>mb(i,r?r(t):t,!1),n&&(e.viewProvidersResolver=(i,r)=>mb(i,r?r(n):n,!0))}}function oS(t,n){let e=t[n];return e===Dt?void 0:e}function aS(t,n,e,i,r,o){let a=n+e;return zt(t,a,r)?PM(t,a+1,o?i.call(o,r):i(r)):oS(t,a+1)}function uh(t,n){let e=Se(),i,r=t+Oe;e.firstCreatePass?(i=sS(n,e.pipeRegistry),e.data[r]=i,i.onDestroy&&(e.destroyHooks??=[]).push(r,i.onDestroy)):i=e.data[r];let o=i.factory||(i.factory=oi(i.type,!0)),a,s=mt(ee);try{let l=ac(!1),c=o();return ac(l),af(e,X(),r,c),c}finally{mt(s)}}function sS(t,n){if(n)for(let e=n.length-1;e>=0;e--){let i=n[e];if(t===i.name)return i}}function fh(t,n,e){let i=t+Oe,r=X(),o=of(r,i);return lS(r,i)?aS(r,h_(),n,o.transform,e,o):o.transform(e)}function lS(t,n){return t[Y].data[n].pure}function Ka(t,n){return Ic(t,n)}var hy=(()=>{class t{applicationErrorHandler=d(Hn);appRef=d($t);taskService=d(ur);ngZone=d(A);zonelessEnabled=d(Ia);tracing=d(pn,{optional:!0});zoneIsDefined=typeof Zone<"u"&&!!Zone.root.run;schedulerTickApplyArgs=[{data:{__scheduler_tick__:!0}}];subscriptions=new ue;angularZoneId=this.zoneIsDefined?this.ngZone._inner?.get(ba):null;scheduleInRootZone=!this.zonelessEnabled&&this.zoneIsDefined&&(d(If,{optional:!0})??!1);cancelScheduledCallback=null;useMicrotaskScheduler=!1;runningTick=!1;pendingRenderTaskId=null;constructor(){this.subscriptions.add(this.appRef.afterTick.subscribe(()=>{let e=this.taskService.add();if(!this.runningTick&&(this.cleanup(),!this.zonelessEnabled||this.appRef.includeAllTestViews)){this.taskService.remove(e);return}this.switchToMicrotaskScheduler(),this.taskService.remove(e)})),this.subscriptions.add(this.ngZone.onUnstable.subscribe(()=>{this.runningTick||this.cleanup()}))}switchToMicrotaskScheduler(){this.ngZone.runOutsideAngular(()=>{let e=this.taskService.add();this.useMicrotaskScheduler=!0,queueMicrotask(()=>{this.useMicrotaskScheduler=!1,this.taskService.remove(e)})})}notify(e){if(!this.zonelessEnabled&&e===5)return;switch(e){case 0:{this.appRef.dirtyFlags|=2;break}case 3:case 2:case 4:case 5:case 1:{this.appRef.dirtyFlags|=4;break}case 6:{this.appRef.dirtyFlags|=2;break}case 12:{this.appRef.dirtyFlags|=16;break}case 13:{this.appRef.dirtyFlags|=2;break}case 11:break;default:this.appRef.dirtyFlags|=8}if(this.appRef.tracingSnapshot=this.tracing?.snapshot(this.appRef.tracingSnapshot)??null,!this.shouldScheduleTick())return;let i=this.useMicrotaskScheduler?T_:Cf;this.pendingRenderTaskId=this.taskService.add(),this.scheduleInRootZone?this.cancelScheduledCallback=Zone.root.run(()=>i(()=>this.tick())):this.cancelScheduledCallback=this.ngZone.runOutsideAngular(()=>i(()=>this.tick()))}shouldScheduleTick(){return!(this.appRef.destroyed||this.pendingRenderTaskId!==null||this.runningTick||this.appRef._runningTick||!this.zonelessEnabled&&this.zoneIsDefined&&Zone.current.get(ba+this.angularZoneId))}tick(){if(this.runningTick||this.appRef.destroyed)return;if(this.appRef.dirtyFlags===0){this.cleanup();return}!this.zonelessEnabled&&this.appRef.dirtyFlags&7&&(this.appRef.dirtyFlags|=1);let e=this.taskService.add();try{this.ngZone.run(()=>{this.runningTick=!0,this.appRef._tick()},void 0,this.schedulerTickApplyArgs)}catch(i){this.applicationErrorHandler(i)}finally{this.taskService.remove(e),this.cleanup()}}ngOnDestroy(){this.subscriptions.unsubscribe(),this.cleanup()}cleanup(){if(this.runningTick=!1,this.cancelScheduledCallback?.(),this.cancelScheduledCallback=null,this.pendingRenderTaskId!==null){let e=this.pendingRenderTaskId;this.pendingRenderTaskId=null,this.taskService.remove(e)}}static \u0275fac=function(i){return new(i||t)};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function py(){return[{provide:wn,useExisting:hy},{provide:A,useClass:va},{provide:Ia,useValue:!0}]}function cS(){return typeof $localize<"u"&&$localize.locale||qa}var Co=new b("",{factory:()=>d(Co,{optional:!0,skipSelf:!0})||cS()});var Nc=class{destroyed=!1;listeners=null;errorHandler=d(st,{optional:!0});destroyRef=d(At);constructor(){this.destroyRef.onDestroy(()=>{this.destroyed=!0,this.listeners=null})}subscribe(n){if(this.destroyed)throw new $(953,!1);return(this.listeners??=[]).push(n),{unsubscribe:()=>{let e=this.listeners?.indexOf(n);e!==void 0&&e!==-1&&this.listeners?.splice(e,1)}}}emit(n){if(this.destroyed){console.warn(li(953,!1));return}if(this.listeners===null)return;let e=W(null);try{for(let i of this.listeners)try{i(n)}catch(r){this.errorHandler?.handleError(r)}}finally{W(e)}}};function Wt(t){return Lg(t)}function Me(t,n){return na(t,n?.equal)}var vy=Symbol("InputSignalNode#UNSET"),xS=ae(w({},ia),{transformFn:void 0,applyValueToInputSignal(t,n){Hr(t,n)}});function yy(t,n){let e=Object.create(xS);e.value=t,e.transformFn=n?.transform;function i(){if(Vi(e),e.value===vy){let r=null;throw new $(-950,r)}return e.value}return i[Ze]=e,i}var Tn=class{attributeName;constructor(n){this.attributeName=n}__NG_ELEMENT_ID__=()=>wm(this.attributeName);toString(){return`HostAttributeToken ${this.attributeName}`}};function Dy(t){return new Nc}function gy(t,n){return yy(t,n)}function wS(t){return yy(vy,t)}var Yt=(gy.required=wS,gy);function _y(t,n){return eh(n)}function ES(t,n){return th(n)}var Xa=(_y.required=ES,_y);function by(t,n){return eh(n)}function MS(t,n){return th(n)}var Cy=(by.required=MS,by);var hh=new b(""),IS=new b("");function Qa(t){return!t.moduleRef}function SS(t){let n=Qa(t)?t.r3Injector:t.moduleRef.injector,e=n.get(A);return e.run(()=>{Qa(t)?t.r3Injector.resolveInjectorInitializers():t.moduleRef.resolveInjectorInitializers();let i=n.get(Hn),r;if(e.runOutsideAngular(()=>{r=e.onError.subscribe({next:i})}),Qa(t)){let o=()=>n.destroy(),a=t.platformInjector.get(hh);a.add(o),n.onDestroy(()=>{r.unsubscribe(),a.delete(o)})}else{let o=()=>t.moduleRef.destroy(),a=t.platformInjector.get(hh);a.add(o),t.moduleRef.onDestroy(()=>{Aa(t.allPlatformModules,t.moduleRef),r.unsubscribe(),a.delete(o)})}return TS(i,e,()=>{let o=n.get(ur),a=o.add(),s=n.get(ah);return s.runInitializers(),s.donePromise.then(()=>{let l=n.get(Co,qa);if(ny(l||qa),!n.get(IS,!0))return Qa(t)?n.get($t):(t.allPlatformModules.push(t.moduleRef),t.moduleRef);if(Qa(t)){let u=n.get($t);return t.rootComponent!==void 0&&u.bootstrap(t.rootComponent),u}else return kS?.(t.moduleRef,t.allPlatformModules),t.moduleRef}).finally(()=>{o.remove(a)})})})}var kS;function TS(t,n,e){try{let i=e();return bo(i)?i.catch(r=>{throw n.runOutsideAngular(()=>t(r)),r}):i}catch(i){throw n.runOutsideAngular(()=>t(i)),i}}var Fc=null;function AS(t=[],n){return G.create({name:n,providers:[{provide:Da,useValue:"platform"},{provide:hh,useValue:new Set([()=>Fc=null])},...t]})}function RS(t=[]){if(Fc)return Fc;let n=AS(t);return Fc=n,Jv(),OS(n),n}function OS(t){let n=t.get(gc,null);eo(t,()=>{n?.forEach(e=>e())})}var NS=1e4;var y8=NS-1e3;var xe=(()=>{class t{static __NG_ELEMENT_ID__=FS}return t})();function FS(t){return PS(Xe(),X(),(t&16)===16)}function PS(t,n,e){if(Bn(t)&&!e){let i=Ut(t.index,n);return new gi(i,i)}else if(t.type&175){let i=n[gt];return new gi(i,n)}return null}function xy(t){let{rootComponent:n,appProviders:e,platformProviders:i,platformRef:r}=t;ge(he.BootstrapApplicationStart);try{let o=r?.injector??RS(i),a=[py(),R_,...e||[]],s=new Pa({providers:a,parent:o,debugName:"",runEnvironmentInitializers:!1});return SS({r3Injector:s.injector,platformInjector:o,rootComponent:n})}catch(o){return Promise.reject(o)}finally{ge(he.BootstrapApplicationEnd)}}function ie(t){return typeof t=="boolean"?t:t!=null&&t!=="false"}function Di(t,n=NaN){return!isNaN(parseFloat(t))&&!isNaN(Number(t))?Number(t):n}var mh=Symbol("NOT_SET"),wy=new Set,LS=ae(w({},ia),{kind:"afterRenderEffectPhase",consumerIsAlwaysLive:!0,consumerAllowSignalWrites:!0,value:mh,cleanup:null,consumerMarkedDirty(){if(this.sequence.impl.executing){if(this.sequence.lastPhase===null||this.sequence.lastPhase<this.phase)return;this.sequence.erroredOrDestroyed=!0}this.sequence.scheduler.notify(7)},phaseFn(t){if(this.sequence.lastPhase=this.phase,!this.dirty)return this.signal;if(this.dirty=!1,this.value!==mh&&!Br(this))return this.signal;try{for(let r of this.cleanup??wy)r()}finally{this.cleanup?.clear()}let n=[];t!==void 0&&n.push(t),n.push(this.registerCleanupFn);let e=ni(this),i;try{i=this.userFn.apply(null,n)}finally{Bi(this,e)}return(this.value===mh||!this.equal(this.value,i))&&(this.value=i,this.version++),this.signal}}),ph=class extends Oa{scheduler;lastPhase=null;nodes=[void 0,void 0,void 0,void 0];onDestroyFns=null;constructor(n,e,i,r,o,a=null){super(n,[void 0,void 0,void 0,void 0],i,!1,o.get(At),a),this.scheduler=r;for(let s of Bm){let l=e[s];if(l===void 0)continue;let c=Object.create(LS);c.sequence=this,c.phase=s,c.userFn=l,c.dirty=!0,c.signal=()=>(Vi(c),c.value),c.signal[Ze]=c,c.registerCleanupFn=u=>(c.cleanup??=new Set).add(u),this.nodes[s]=c,this.hooks[s]=u=>c.phaseFn(u)}}afterRun(){super.afterRun(),this.lastPhase=null}destroy(){if(this.onDestroyFns!==null)for(let n of this.onDestroyFns)n();super.destroy();for(let n of this.nodes)if(n)try{for(let e of n.cleanup??wy)e()}finally{ii(n)}}};function Ey(t,n){let e=n?.injector??d(G),i=e.get(wn),r=e.get(xc),o=e.get(pn,null,{optional:!0});r.impl??=e.get(jm);let a=t;typeof a=="function"&&(a={mixedReadWrite:t});let s=e.get(ao,null,{optional:!0}),l=new ph(r.impl,[a.earlyRead,a.write,a.mixedReadWrite,a.read],s?.view,i,e,o?.snapshot(null));return r.impl.register(l),l}function Pc(t,n){let e=di(t),i=n.elementInjector||Jr();return new mo(e).create(i,n.projectableNodes,n.hostElement,n.environmentInjector,n.directives,n.bindings)}var My=null;function qt(){return My}function _h(t){My??=t}var Ja=class{},xo=(()=>{class t{historyGo(e){throw new Error("")}static \u0275fac=function(i){return new(i||t)};static \u0275prov=y({token:t,factory:()=>d(Iy),providedIn:"platform"})}return t})();var Iy=(()=>{class t extends xo{_location;_history;_doc=d(H);constructor(){super(),this._location=window.location,this._history=window.history}getBaseHrefFromDOM(){return qt().getBaseHref(this._doc)}onPopState(e){let i=qt().getGlobalEventTarget(this._doc,"window");return i.addEventListener("popstate",e,!1),()=>i.removeEventListener("popstate",e)}onHashChange(e){let i=qt().getGlobalEventTarget(this._doc,"window");return i.addEventListener("hashchange",e,!1),()=>i.removeEventListener("hashchange",e)}get href(){return this._location.href}get protocol(){return this._location.protocol}get hostname(){return this._location.hostname}get port(){return this._location.port}get pathname(){return this._location.pathname}get search(){return this._location.search}get hash(){return this._location.hash}set pathname(e){this._location.pathname=e}pushState(e,i,r){this._history.pushState(e,i,r)}replaceState(e,i,r){this._history.replaceState(e,i,r)}forward(){this._history.forward()}back(){this._history.back()}historyGo(e=0){this._history.go(e)}getState(){return this._history.state}static \u0275fac=function(i){return new(i||t)};static \u0275prov=y({token:t,factory:()=>new t,providedIn:"platform"})}return t})();function Ty(t,n){return t?n?t.endsWith("/")?n.startsWith("/")?t+n.slice(1):t+n:n.startsWith("/")?t+n:`${t}/${n}`:t:n}function Sy(t){let n=t.search(/#|\?|$/);return t[n-1]==="/"?t.slice(0,n-1)+t.slice(n):t}function Ci(t){return t&&t[0]!=="?"?`?${t}`:t}var Lc=(()=>{class t{historyGo(e){throw new Error("")}static \u0275fac=function(i){return new(i||t)};static \u0275prov=y({token:t,factory:()=>d(BS),providedIn:"root"})}return t})(),VS=new b(""),BS=(()=>{class t extends Lc{_platformLocation;_baseHref;_removeListenerFns=[];constructor(e,i){super(),this._platformLocation=e,this._baseHref=i??this._platformLocation.getBaseHrefFromDOM()??d(H).location?.origin??""}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(e){this._removeListenerFns.push(this._platformLocation.onPopState(e),this._platformLocation.onHashChange(e))}getBaseHref(){return this._baseHref}prepareExternalUrl(e){return Ty(this._baseHref,e)}path(e=!1){let i=this._platformLocation.pathname+Ci(this._platformLocation.search),r=this._platformLocation.hash;return r&&e?`${i}${r}`:i}pushState(e,i,r,o){let a=this.prepareExternalUrl(r+Ci(o));this._platformLocation.pushState(e,i,a)}replaceState(e,i,r,o){let a=this.prepareExternalUrl(r+Ci(o));this._platformLocation.replaceState(e,i,a)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(e=0){this._platformLocation.historyGo?.(e)}static \u0275fac=function(i){return new(i||t)(R(xo),R(VS,8))};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Vc=(()=>{class t{_subject=new E;_basePath;_locationStrategy;_urlChangeListeners=[];_urlChangeSubscription=null;constructor(e){this._locationStrategy=e;let i=this._locationStrategy.getBaseHref();this._basePath=US(Sy(ky(i))),this._locationStrategy.onPopState(r=>{this._subject.next({url:this.path(!0),pop:!0,state:r.state,type:r.type})})}ngOnDestroy(){this._urlChangeSubscription?.unsubscribe(),this._urlChangeListeners=[]}path(e=!1){return this.normalize(this._locationStrategy.path(e))}getState(){return this._locationStrategy.getState()}isCurrentPathEqualTo(e,i=""){return this.path()==this.normalize(e+Ci(i))}normalize(e){return t.stripTrailingSlash(HS(this._basePath,ky(e)))}prepareExternalUrl(e){return e&&e[0]!=="/"&&(e="/"+e),this._locationStrategy.prepareExternalUrl(e)}go(e,i="",r=null){this._locationStrategy.pushState(r,"",e,i),this._notifyUrlChangeListeners(this.prepareExternalUrl(e+Ci(i)),r)}replaceState(e,i="",r=null){this._locationStrategy.replaceState(r,"",e,i),this._notifyUrlChangeListeners(this.prepareExternalUrl(e+Ci(i)),r)}forward(){this._locationStrategy.forward()}back(){this._locationStrategy.back()}historyGo(e=0){this._locationStrategy.historyGo?.(e)}onUrlChange(e){return this._urlChangeListeners.push(e),this._urlChangeSubscription??=this.subscribe(i=>{this._notifyUrlChangeListeners(i.url,i.state)}),()=>{let i=this._urlChangeListeners.indexOf(e);this._urlChangeListeners.splice(i,1),this._urlChangeListeners.length===0&&(this._urlChangeSubscription?.unsubscribe(),this._urlChangeSubscription=null)}}_notifyUrlChangeListeners(e="",i){this._urlChangeListeners.forEach(r=>r(e,i))}subscribe(e,i,r){return this._subject.subscribe({next:e,error:i??void 0,complete:r??void 0})}static normalizeQueryParams=Ci;static joinWithSlash=Ty;static stripTrailingSlash=Sy;static \u0275fac=function(i){return new(i||t)(R(Lc))};static \u0275prov=y({token:t,factory:()=>jS(),providedIn:"root"})}return t})();function jS(){return new Vc(R(Lc))}function HS(t,n){if(!t||!n.startsWith(t))return n;let e=n.substring(t.length);return e===""||["/",";","?","#"].includes(e[0])?e:n}function ky(t){return t.replace(/\/index.html$/,"")}function US(t){if(new RegExp("^(https?:)?//").test(t)){let[,e]=t.split(/\/\/[^\/]+/);return e}return t}var es=(()=>{class t{_viewContainerRef;_viewRef=null;ngTemplateOutletContext=null;ngTemplateOutlet=null;ngTemplateOutletInjector=null;injector=d(G);constructor(e){this._viewContainerRef=e}ngOnChanges(e){if(this._shouldRecreateView(e)){let i=this._viewContainerRef;if(this._viewRef&&i.remove(i.indexOf(this._viewRef)),!this.ngTemplateOutlet){this._viewRef=null;return}let r=this._createContextForwardProxy();this._viewRef=i.createEmbeddedView(this.ngTemplateOutlet,r,{injector:this._getInjector()})}}_getInjector(){return this.ngTemplateOutletInjector==="outlet"?this.injector:this.ngTemplateOutletInjector??void 0}_shouldRecreateView(e){return!!e.ngTemplateOutlet||!!e.ngTemplateOutletInjector}_createContextForwardProxy(){return new Proxy({},{set:(e,i,r)=>this.ngTemplateOutletContext?Reflect.set(this.ngTemplateOutletContext,i,r):!1,get:(e,i,r)=>{if(this.ngTemplateOutletContext)return Reflect.get(this.ngTemplateOutletContext,i,r)}})}static \u0275fac=function(i){return new(i||t)(ee(_t))};static \u0275dir=U({type:t,selectors:[["","ngTemplateOutlet",""]],inputs:{ngTemplateOutletContext:"ngTemplateOutletContext",ngTemplateOutlet:"ngTemplateOutlet",ngTemplateOutletInjector:"ngTemplateOutletInjector"},features:[We]})}return t})();function ts(t,n){n=encodeURIComponent(n);for(let e of t.split(";")){let i=e.indexOf("="),[r,o]=i==-1?[e,""]:[e.slice(0,i),e.slice(i+1)];if(r.trim()===n)return decodeURIComponent(o)}return null}var Dr=class{};var bh="browser";function Ay(t){return t===bh}var ns=class{_doc;constructor(n){this._doc=n}manager},Bc=(()=>{class t extends ns{constructor(e){super(e)}supports(e){return!0}addEventListener(e,i,r,o){return e.addEventListener(i,r,o),()=>this.removeEventListener(e,i,r,o)}removeEventListener(e,i,r,o){return e.removeEventListener(i,r,o)}static \u0275fac=function(i){return new(i||t)(R(H))};static \u0275prov=y({token:t,factory:t.\u0275fac})}return t})(),Uc=new b(""),Ch=(()=>{class t{_zone;_plugins;_eventNameToPlugin=new Map;constructor(e,i){this._zone=i,e.forEach(a=>{a.manager=this});let r=e.filter(a=>!(a instanceof Bc));this._plugins=r.slice().reverse();let o=e.find(a=>a instanceof Bc);o&&this._plugins.push(o)}addEventListener(e,i,r,o){return this._findPluginFor(i).addEventListener(e,i,r,o)}getZone(){return this._zone}_findPluginFor(e){let i=this._eventNameToPlugin.get(e);if(i)return i;if(i=this._plugins.find(o=>o.supports(e)),!i)throw new $(5101,!1);return this._eventNameToPlugin.set(e,i),i}static \u0275fac=function(i){return new(i||t)(R(Uc),R(A))};static \u0275prov=y({token:t,factory:t.\u0275fac})}return t})(),vh="ng-app-id";function Ry(t){for(let n of t)n.remove()}function Oy(t,n){let e=n.createElement("style");return e.textContent=t,e}function WS(t,n,e,i){let r=t.head?.querySelectorAll(`style[${vh}="${n}"],link[${vh}="${n}"]`);if(r)for(let o of r)o.removeAttribute(vh),o instanceof HTMLLinkElement?i.set(o.href.slice(o.href.lastIndexOf("/")+1),{usage:0,elements:[o]}):o.textContent&&e.set(o.textContent,{usage:0,elements:[o]})}function Dh(t,n){let e=n.createElement("link");return e.setAttribute("rel","stylesheet"),e.setAttribute("href",t),e}var xh=(()=>{class t{doc;appId;nonce;inline=new Map;external=new Map;hosts=new Set;constructor(e,i,r,o={}){this.doc=e,this.appId=i,this.nonce=r,WS(e,i,this.inline,this.external),this.hosts.add(e.head)}addStyles(e,i){for(let r of e)this.addUsage(r,this.inline,Oy);i?.forEach(r=>this.addUsage(r,this.external,Dh))}removeStyles(e,i){for(let r of e)this.removeUsage(r,this.inline);i?.forEach(r=>this.removeUsage(r,this.external))}addUsage(e,i,r){let o=i.get(e);o?o.usage++:i.set(e,{usage:1,elements:[...this.hosts].map(a=>this.addElement(a,r(e,this.doc)))})}removeUsage(e,i){let r=i.get(e);r&&(r.usage--,r.usage<=0&&(Ry(r.elements),i.delete(e)))}ngOnDestroy(){for(let[,{elements:e}]of[...this.inline,...this.external])Ry(e);this.hosts.clear()}addHost(e){this.hosts.add(e);for(let[i,{elements:r}]of this.inline)r.push(this.addElement(e,Oy(i,this.doc)));for(let[i,{elements:r}]of this.external)r.push(this.addElement(e,Dh(i,this.doc)))}removeHost(e){this.hosts.delete(e)}addElement(e,i){return this.nonce&&i.setAttribute("nonce",this.nonce),e.appendChild(i)}static \u0275fac=function(i){return new(i||t)(R(H),R(bi),R(_r,8),R(gr))};static \u0275prov=y({token:t,factory:t.\u0275fac})}return t})(),yh={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",math:"http://www.w3.org/1998/Math/MathML"},wh=/%COMP%/g;var Fy="%COMP%",YS=`_nghost-${Fy}`,qS=`_ngcontent-${Fy}`,ZS=!0,KS=new b("",{factory:()=>ZS});function QS(t){return qS.replace(wh,t)}function XS(t){return YS.replace(wh,t)}function Py(t,n){return n.map(e=>e.replace(wh,t))}var Eh=(()=>{class t{eventManager;sharedStylesHost;appId;removeStylesOnCompDestroy;doc;ngZone;nonce;tracingService;rendererByCompId=new Map;defaultRenderer;constructor(e,i,r,o,a,s,l=null,c=null){this.eventManager=e,this.sharedStylesHost=i,this.appId=r,this.removeStylesOnCompDestroy=o,this.doc=a,this.ngZone=s,this.nonce=l,this.tracingService=c,this.defaultRenderer=new is(e,a,s,this.tracingService)}createRenderer(e,i){if(!e||!i)return this.defaultRenderer;let r=this.getOrCreateRenderer(e,i);return r instanceof Hc?r.applyToHost(e):r instanceof rs&&r.applyStyles(),r}getOrCreateRenderer(e,i){let r=this.rendererByCompId,o=r.get(i.id);if(!o){let a=this.doc,s=this.ngZone,l=this.eventManager,c=this.sharedStylesHost,u=this.removeStylesOnCompDestroy,f=this.tracingService;switch(i.encapsulation){case mn.Emulated:o=new Hc(l,c,i,this.appId,u,a,s,f);break;case mn.ShadowDom:return new jc(l,e,i,a,s,this.nonce,f,c);case mn.ExperimentalIsolatedShadowDom:return new jc(l,e,i,a,s,this.nonce,f);default:o=new rs(l,c,i,u,a,s,f);break}r.set(i.id,o)}return o}ngOnDestroy(){this.rendererByCompId.clear()}componentReplaced(e){this.rendererByCompId.delete(e)}static \u0275fac=function(i){return new(i||t)(R(Ch),R(xh),R(bi),R(KS),R(H),R(A),R(_r),R(pn,8))};static \u0275prov=y({token:t,factory:t.\u0275fac})}return t})(),is=class{eventManager;doc;ngZone;tracingService;data=Object.create(null);throwOnSyntheticProps=!0;constructor(n,e,i,r){this.eventManager=n,this.doc=e,this.ngZone=i,this.tracingService=r}destroy(){}destroyNode=null;createElement(n,e){return e?this.doc.createElementNS(yh[e]||e,n):this.doc.createElement(n)}createComment(n){return this.doc.createComment(n)}createText(n){return this.doc.createTextNode(n)}appendChild(n,e){(Ny(n)?n.content:n).appendChild(e)}insertBefore(n,e,i){n&&(Ny(n)?n.content:n).insertBefore(e,i)}removeChild(n,e){e.remove()}selectRootElement(n,e){let i=typeof n=="string"?this.doc.querySelector(n):n;if(!i)throw new $(-5104,!1);return e||(i.textContent=""),i}parentNode(n){return n.parentNode}nextSibling(n){return n.nextSibling}setAttribute(n,e,i,r){if(r){e=r+":"+e;let o=yh[r];o?n.setAttributeNS(o,e,i):n.setAttribute(e,i)}else n.setAttribute(e,i)}removeAttribute(n,e,i){if(i){let r=yh[i];r?n.removeAttributeNS(r,e):n.removeAttribute(`${i}:${e}`)}else n.removeAttribute(e)}addClass(n,e){n.classList.add(e)}removeClass(n,e){n.classList.remove(e)}setStyle(n,e,i,r){r&(Sn.DashCase|Sn.Important)?n.style.setProperty(e,i,r&Sn.Important?"important":""):n.style[e]=i}removeStyle(n,e,i){i&Sn.DashCase?n.style.removeProperty(e):n.style[e]=""}setProperty(n,e,i){n!=null&&(n[e]=i)}setValue(n,e){n.nodeValue=e}listen(n,e,i,r){if(typeof n=="string"&&(n=qt().getGlobalEventTarget(this.doc,n),!n))throw new $(5102,!1);let o=this.decoratePreventDefault(i);return this.tracingService?.wrapEventListener&&(o=this.tracingService.wrapEventListener(n,e,o)),this.eventManager.addEventListener(n,e,o,r)}decoratePreventDefault(n){return e=>{if(e==="__ngUnwrap__")return n;n(e)===!1&&e.preventDefault()}}};function Ny(t){return t.tagName==="TEMPLATE"&&t.content!==void 0}var jc=class extends is{hostEl;sharedStylesHost;shadowRoot;constructor(n,e,i,r,o,a,s,l){super(n,r,o,s),this.hostEl=e,this.sharedStylesHost=l,this.shadowRoot=e.attachShadow({mode:"open"}),this.sharedStylesHost&&this.sharedStylesHost.addHost(this.shadowRoot);let c=i.styles;c=Py(i.id,c);for(let f of c){let g=document.createElement("style");a&&g.setAttribute("nonce",a),g.textContent=f,this.shadowRoot.appendChild(g)}let u=i.getExternalStyles?.();if(u)for(let f of u){let g=Dh(f,r);a&&g.setAttribute("nonce",a),this.shadowRoot.appendChild(g)}}nodeOrShadowRoot(n){return n===this.hostEl?this.shadowRoot:n}appendChild(n,e){return super.appendChild(this.nodeOrShadowRoot(n),e)}insertBefore(n,e,i){return super.insertBefore(this.nodeOrShadowRoot(n),e,i)}removeChild(n,e){return super.removeChild(null,e)}parentNode(n){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(n)))}destroy(){this.sharedStylesHost&&this.sharedStylesHost.removeHost(this.shadowRoot)}},rs=class extends is{sharedStylesHost;removeStylesOnCompDestroy;styles;styleUrls;constructor(n,e,i,r,o,a,s,l){super(n,o,a,s),this.sharedStylesHost=e,this.removeStylesOnCompDestroy=r;let c=i.styles;this.styles=l?Py(l,c):c,this.styleUrls=i.getExternalStyles?.(l)}applyStyles(){this.sharedStylesHost.addStyles(this.styles,this.styleUrls)}destroy(){this.removeStylesOnCompDestroy&&hr.size===0&&this.sharedStylesHost.removeStyles(this.styles,this.styleUrls)}},Hc=class extends rs{contentAttr;hostAttr;constructor(n,e,i,r,o,a,s,l){let c=r+"-"+i.id;super(n,e,i,o,a,s,l,c),this.contentAttr=QS(c),this.hostAttr=XS(c)}applyToHost(n){this.applyStyles(),this.setAttribute(n,this.hostAttr,"")}createElement(n,e){let i=super.createElement(n,e);return super.setAttribute(i,this.contentAttr,""),i}};var zc=class t extends Ja{supportsDOMEvents=!0;static makeCurrent(){_h(new t)}onAndCancel(n,e,i,r){return n.addEventListener(e,i,r),()=>{n.removeEventListener(e,i,r)}}dispatchEvent(n,e){n.dispatchEvent(e)}remove(n){n.remove()}createElement(n,e){return e=e||this.getDefaultDocument(),e.createElement(n)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(n){return n.nodeType===Node.ELEMENT_NODE}isShadowRoot(n){return n instanceof DocumentFragment}getGlobalEventTarget(n,e){return e==="window"?window:e==="document"?n:e==="body"?n.body:null}getBaseHref(n){let e=JS();return e==null?null:ek(e)}resetBaseElement(){os=null}getUserAgent(){return window.navigator.userAgent}getCookie(n){return ts(document.cookie,n)}},os=null;function JS(){return os=os||document.head.querySelector("base"),os?os.getAttribute("href"):null}function ek(t){return new URL(t,document.baseURI).pathname}var tk=(()=>{class t{build(){return new XMLHttpRequest}static \u0275fac=function(i){return new(i||t)};static \u0275prov=y({token:t,factory:t.\u0275fac})}return t})(),Ly=["alt","control","meta","shift"],nk={"\b":"Backspace","	":"Tab","\x7F":"Delete","\x1B":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},ik={alt:t=>t.altKey,control:t=>t.ctrlKey,meta:t=>t.metaKey,shift:t=>t.shiftKey},Vy=(()=>{class t extends ns{constructor(e){super(e)}supports(e){return t.parseEventName(e)!=null}addEventListener(e,i,r,o){let a=t.parseEventName(i),s=t.eventCallback(a.fullKey,r,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>qt().onAndCancel(e,a.domEventName,s,o))}static parseEventName(e){let i=e.toLowerCase().split("."),r=i.shift();if(i.length===0||!(r==="keydown"||r==="keyup"))return null;let o=t._normalizeKey(i.pop()),a="",s=i.indexOf("code");if(s>-1&&(i.splice(s,1),a="code."),Ly.forEach(c=>{let u=i.indexOf(c);u>-1&&(i.splice(u,1),a+=c+".")}),a+=o,i.length!=0||o.length===0)return null;let l={};return l.domEventName=r,l.fullKey=a,l}static matchEventFullKeyCode(e,i){let r=nk[e.key]||e.key,o="";return i.indexOf("code.")>-1&&(r=e.code,o="code."),r==null||!r?!1:(r=r.toLowerCase(),r===" "?r="space":r==="."&&(r="dot"),Ly.forEach(a=>{if(a!==r){let s=ik[a];s(e)&&(o+=a+".")}}),o+=r,o===i)}static eventCallback(e,i,r){return o=>{t.matchEventFullKeyCode(o,e)&&r.runGuarded(()=>i(o))}}static _normalizeKey(e){return e==="esc"?"escape":e}static \u0275fac=function(i){return new(i||t)(R(H))};static \u0275prov=y({token:t,factory:t.\u0275fac})}return t})();async function Mh(t,n,e){let i=w({rootComponent:t},rk(n,e));return xy(i)}function rk(t,n){return{platformRef:n?.platformRef,appProviders:[...ck,...t?.providers??[]],platformProviders:lk}}function ok(){zc.makeCurrent()}function ak(){return new st}function sk(){return Mm(document),document}var lk=[{provide:gr,useValue:bh},{provide:gc,useValue:ok,multi:!0},{provide:H,useFactory:sk}];var ck=[{provide:Da,useValue:"root"},{provide:st,useFactory:ak},{provide:Uc,useClass:Bc,multi:!0},{provide:Uc,useClass:Vy,multi:!0},Eh,xh,Ch,{provide:Ge,useExisting:Eh},{provide:Dr,useClass:tk},[]];var xi=class t{headers;normalizedNames=new Map;lazyInit;lazyUpdate=null;constructor(n){n?typeof n=="string"?this.lazyInit=()=>{this.headers=new Map,n.split(`
`).forEach(e=>{let i=e.indexOf(":");if(i>0){let r=e.slice(0,i),o=e.slice(i+1).trim();this.addHeaderEntry(r,o)}})}:typeof Headers<"u"&&n instanceof Headers?(this.headers=new Map,n.forEach((e,i)=>{this.addHeaderEntry(i,e)})):this.lazyInit=()=>{this.headers=new Map,Object.entries(n).forEach(([e,i])=>{this.setHeaderEntries(e,i)})}:this.headers=new Map}has(n){return this.init(),this.headers.has(n.toLowerCase())}get(n){this.init();let e=this.headers.get(n.toLowerCase());return e&&e.length>0?e[0]:null}keys(){return this.init(),Array.from(this.normalizedNames.values())}getAll(n){return this.init(),this.headers.get(n.toLowerCase())||null}append(n,e){return this.clone({name:n,value:e,op:"a"})}set(n,e){return this.clone({name:n,value:e,op:"s"})}delete(n,e){return this.clone({name:n,value:e,op:"d"})}maybeSetNormalizedName(n,e){this.normalizedNames.has(e)||this.normalizedNames.set(e,n)}init(){this.lazyInit&&(this.lazyInit instanceof t?this.copyFrom(this.lazyInit):this.lazyInit(),this.lazyInit=null,this.lazyUpdate&&(this.lazyUpdate.forEach(n=>this.applyUpdate(n)),this.lazyUpdate=null))}copyFrom(n){n.init(),Array.from(n.headers.keys()).forEach(e=>{this.headers.set(e,n.headers.get(e)),this.normalizedNames.set(e,n.normalizedNames.get(e))})}clone(n){let e=new t;return e.lazyInit=this.lazyInit&&this.lazyInit instanceof t?this.lazyInit:this,e.lazyUpdate=(this.lazyUpdate||[]).concat([n]),e}applyUpdate(n){let e=n.name.toLowerCase();switch(n.op){case"a":case"s":let i=n.value;if(typeof i=="string"&&(i=[i]),i.length===0)return;this.maybeSetNormalizedName(n.name,e);let r=(n.op==="a"?this.headers.get(e):void 0)||[];r.push(...i),this.headers.set(e,r);break;case"d":let o=n.value;if(!o)this.headers.delete(e),this.normalizedNames.delete(e);else{let a=this.headers.get(e);if(!a)return;a=a.filter(s=>o.indexOf(s)===-1),a.length===0?(this.headers.delete(e),this.normalizedNames.delete(e)):this.headers.set(e,a)}break}}addHeaderEntry(n,e){let i=n.toLowerCase();this.maybeSetNormalizedName(n,i),this.headers.has(i)?this.headers.get(i).push(e):this.headers.set(i,[e])}setHeaderEntries(n,e){let i=(Array.isArray(e)?e:[e]).map(o=>o.toString()),r=n.toLowerCase();this.headers.set(r,i),this.maybeSetNormalizedName(n,r)}forEach(n){this.init(),Array.from(this.normalizedNames.keys()).forEach(e=>n(this.normalizedNames.get(e),this.headers.get(e)))}};var Gc=class{map=new Map;set(n,e){return this.map.set(n,e),this}get(n){return this.map.has(n)||this.map.set(n,n.defaultValue()),this.map.get(n)}delete(n){return this.map.delete(n),this}has(n){return this.map.has(n)}keys(){return this.map.keys()}},Wc=class{encodeKey(n){return By(n)}encodeValue(n){return By(n)}decodeKey(n){return decodeURIComponent(n)}decodeValue(n){return decodeURIComponent(n)}};function dk(t,n){let e=new Map;return t.length>0&&t.replace(/^\?/,"").split("&").forEach(r=>{let o=r.indexOf("="),[a,s]=o==-1?[n.decodeKey(r),""]:[n.decodeKey(r.slice(0,o)),n.decodeValue(r.slice(o+1))],l=e.get(a)||[];l.push(s),e.set(a,l)}),e}var uk=/%(\d[a-f0-9])/gi,fk={40:"@","3A":":",24:"$","2C":",","3B":";","3D":"=","3F":"?","2F":"/"};function By(t){return encodeURIComponent(t).replace(uk,(n,e)=>fk[e]??n)}function $c(t){return`${t}`}var Wn=class t{map;encoder;updates=null;cloneFrom=null;constructor(n={}){if(this.encoder=n.encoder||new Wc,n.fromString){if(n.fromObject)throw new $(2805,!1);this.map=dk(n.fromString,this.encoder)}else n.fromObject?(this.map=new Map,Object.keys(n.fromObject).forEach(e=>{let i=n.fromObject[e],r=Array.isArray(i)?i.map($c):[$c(i)];this.map.set(e,r)})):this.map=null}has(n){return this.init(),this.map.has(n)}get(n){this.init();let e=this.map.get(n);return e?e[0]:null}getAll(n){return this.init(),this.map.get(n)||null}keys(){return this.init(),Array.from(this.map.keys())}append(n,e){return this.clone({param:n,value:e,op:"a"})}appendAll(n){let e=[];return Object.keys(n).forEach(i=>{let r=n[i];Array.isArray(r)?r.forEach(o=>{e.push({param:i,value:o,op:"a"})}):e.push({param:i,value:r,op:"a"})}),this.clone(e)}set(n,e){return this.clone({param:n,value:e,op:"s"})}delete(n,e){return this.clone({param:n,value:e,op:"d"})}toString(){return this.init(),this.keys().map(n=>{let e=this.encoder.encodeKey(n);return this.map.get(n).map(i=>e+"="+this.encoder.encodeValue(i)).join("&")}).filter(n=>n!=="").join("&")}clone(n){let e=new t({encoder:this.encoder});return e.cloneFrom=this.cloneFrom||this,e.updates=(this.updates||[]).concat(n),e}init(){this.map===null&&(this.map=new Map),this.cloneFrom!==null&&(this.cloneFrom.init(),this.cloneFrom.keys().forEach(n=>this.map.set(n,this.cloneFrom.map.get(n))),this.updates.forEach(n=>{switch(n.op){case"a":case"s":let e=(n.op==="a"?this.map.get(n.param):void 0)||[];e.push($c(n.value)),this.map.set(n.param,e);break;case"d":if(n.value!==void 0){let i=this.map.get(n.param)||[],r=i.indexOf($c(n.value));r!==-1&&i.splice(r,1),i.length>0?this.map.set(n.param,i):this.map.delete(n.param)}else{this.map.delete(n.param);break}}}),this.cloneFrom=this.updates=null)}};function mk(t){switch(t){case"DELETE":case"GET":case"HEAD":case"OPTIONS":case"JSONP":return!1;default:return!0}}function jy(t){return typeof ArrayBuffer<"u"&&t instanceof ArrayBuffer}function Hy(t){return typeof Blob<"u"&&t instanceof Blob}function Uy(t){return typeof FormData<"u"&&t instanceof FormData}function hk(t){return typeof URLSearchParams<"u"&&t instanceof URLSearchParams}var zy="Content-Type",$y="Accept",Gy="text/plain",Wy="application/json",pk=`${Wy}, ${Gy}, */*`,wo=class t{url;body=null;headers;context;reportProgress=!1;withCredentials=!1;credentials;keepalive=!1;cache;priority;mode;redirect;referrer;integrity;referrerPolicy;responseType="json";method;params;urlWithParams;transferCache;timeout;constructor(n,e,i,r){this.url=e,this.method=n.toUpperCase();let o;if(mk(this.method)||r?(this.body=i!==void 0?i:null,o=r):o=i,o){if(this.reportProgress=!!o.reportProgress,this.withCredentials=!!o.withCredentials,this.keepalive=!!o.keepalive,o.responseType&&(this.responseType=o.responseType),o.headers&&(this.headers=o.headers),o.context&&(this.context=o.context),o.params&&(this.params=o.params),o.priority&&(this.priority=o.priority),o.cache&&(this.cache=o.cache),o.credentials&&(this.credentials=o.credentials),typeof o.timeout=="number"){if(o.timeout<1||!Number.isInteger(o.timeout))throw new $(2822,"");this.timeout=o.timeout}o.mode&&(this.mode=o.mode),o.redirect&&(this.redirect=o.redirect),o.integrity&&(this.integrity=o.integrity),o.referrer&&(this.referrer=o.referrer),o.referrerPolicy&&(this.referrerPolicy=o.referrerPolicy),this.transferCache=o.transferCache}if(this.headers??=new xi,this.context??=new Gc,!this.params)this.params=new Wn,this.urlWithParams=e;else{let a=this.params.toString();if(a.length===0)this.urlWithParams=e;else{let s=e.indexOf("?"),l=s===-1?"?":s<e.length-1?"&":"";this.urlWithParams=e+l+a}}}serializeBody(){return this.body===null?null:typeof this.body=="string"||jy(this.body)||Hy(this.body)||Uy(this.body)||hk(this.body)?this.body:this.body instanceof Wn?this.body.toString():typeof this.body=="object"||typeof this.body=="boolean"||Array.isArray(this.body)?JSON.stringify(this.body):this.body.toString()}detectContentTypeHeader(){return this.body===null||Uy(this.body)?null:Hy(this.body)?this.body.type||null:jy(this.body)?null:typeof this.body=="string"?Gy:this.body instanceof Wn?"application/x-www-form-urlencoded;charset=UTF-8":typeof this.body=="object"||typeof this.body=="number"||typeof this.body=="boolean"?Wy:null}clone(n={}){let e=n.method||this.method,i=n.url||this.url,r=n.responseType||this.responseType,o=n.keepalive??this.keepalive,a=n.priority||this.priority,s=n.cache||this.cache,l=n.mode||this.mode,c=n.redirect||this.redirect,u=n.credentials||this.credentials,f=n.referrer||this.referrer,g=n.integrity||this.integrity,p=n.referrerPolicy||this.referrerPolicy,v=n.transferCache??this.transferCache,S=n.timeout??this.timeout,N=n.body!==void 0?n.body:this.body,z=n.withCredentials??this.withCredentials,ke=n.reportProgress??this.reportProgress,It=n.headers||this.headers,tt=n.params||this.params,Jo=n.context??this.context;return n.setHeaders!==void 0&&(It=Object.keys(n.setHeaders).reduce((ea,Pi)=>ea.set(Pi,n.setHeaders[Pi]),It)),n.setParams&&(tt=Object.keys(n.setParams).reduce((ea,Pi)=>ea.set(Pi,n.setParams[Pi]),tt)),new t(e,i,N,{params:tt,headers:It,context:Jo,reportProgress:ke,responseType:r,withCredentials:z,transferCache:v,keepalive:o,cache:s,priority:a,timeout:S,mode:l,redirect:c,credentials:u,referrer:f,integrity:g,referrerPolicy:p})}},Cr=(function(t){return t[t.Sent=0]="Sent",t[t.UploadProgress=1]="UploadProgress",t[t.ResponseHeader=2]="ResponseHeader",t[t.DownloadProgress=3]="DownloadProgress",t[t.Response=4]="Response",t[t.User=5]="User",t})(Cr||{}),Mo=class{headers;status;statusText;url;ok;type;redirected;responseType;constructor(n,e=200,i="OK"){this.headers=n.headers||new xi,this.status=n.status!==void 0?n.status:e,this.statusText=n.statusText||i,this.url=n.url||null,this.redirected=n.redirected,this.responseType=n.responseType,this.ok=this.status>=200&&this.status<300}},Yc=class t extends Mo{constructor(n={}){super(n)}type=Cr.ResponseHeader;clone(n={}){return new t({headers:n.headers||this.headers,status:n.status!==void 0?n.status:this.status,statusText:n.statusText||this.statusText,url:n.url||this.url||void 0})}},as=class t extends Mo{body;constructor(n={}){super(n),this.body=n.body!==void 0?n.body:null}type=Cr.Response;clone(n={}){return new t({body:n.body!==void 0?n.body:this.body,headers:n.headers||this.headers,status:n.status!==void 0?n.status:this.status,statusText:n.statusText||this.statusText,url:n.url||this.url||void 0,redirected:n.redirected??this.redirected,responseType:n.responseType??this.responseType})}},Eo=class extends Mo{name="HttpErrorResponse";message;error;ok=!1;constructor(n){super(n,0,"Unknown Error"),this.status>=200&&this.status<300?this.message=`Http failure during parsing for ${n.url||"(unknown url)"}`:this.message=`Http failure response for ${n.url||"(unknown url)"}: ${n.status} ${n.statusText}`,this.error=n.error||null}},gk=200,_k=204;var bk=new b("");var vk=/^\)\]\}',?\n/;var Sh=(()=>{class t{xhrFactory;tracingService=d(pn,{optional:!0});constructor(e){this.xhrFactory=e}maybePropagateTrace(e){return this.tracingService?.propagate?this.tracingService.propagate(e):e}handle(e){if(e.method==="JSONP")throw new $(-2800,!1);let i=this.xhrFactory;return Pe(null).pipe(qi(()=>new le(o=>{let a=i.build();if(a.open(e.method,e.urlWithParams),e.withCredentials&&(a.withCredentials=!0),e.headers.forEach((N,z)=>a.setRequestHeader(N,z.join(","))),e.headers.has($y)||a.setRequestHeader($y,pk),!e.headers.has(zy)){let N=e.detectContentTypeHeader();N!==null&&a.setRequestHeader(zy,N)}if(e.timeout&&(a.timeout=e.timeout),e.responseType){let N=e.responseType.toLowerCase();a.responseType=N!=="json"?N:"text"}let s=e.serializeBody(),l=null,c=()=>{if(l!==null)return l;let N=a.statusText||"OK",z=new xi(a.getAllResponseHeaders()),ke=a.responseURL||e.url;return l=new Yc({headers:z,status:a.status,statusText:N,url:ke}),l},u=this.maybePropagateTrace(()=>{let{headers:N,status:z,statusText:ke,url:It}=c(),tt=null;z!==_k&&(tt=typeof a.response>"u"?a.responseText:a.response),z===0&&(z=tt?gk:0);let Jo=z>=200&&z<300;if(e.responseType==="json"&&typeof tt=="string"){let ea=tt;tt=tt.replace(vk,"");try{tt=tt!==""?JSON.parse(tt):null}catch(Pi){tt=ea,Jo&&(Jo=!1,tt={error:Pi,text:tt})}}Jo?(o.next(new as({body:tt,headers:N,status:z,statusText:ke,url:It||void 0})),o.complete()):o.error(new Eo({error:tt,headers:N,status:z,statusText:ke,url:It||void 0}))}),f=this.maybePropagateTrace(N=>{let{url:z}=c(),ke=new Eo({error:N,status:a.status||0,statusText:a.statusText||"Unknown Error",url:z||void 0});o.error(ke)}),g=f;e.timeout&&(g=this.maybePropagateTrace(N=>{let{url:z}=c(),ke=new Eo({error:new DOMException("Request timed out","TimeoutError"),status:a.status||0,statusText:a.statusText||"Request timeout",url:z||void 0});o.error(ke)}));let p=!1,v=this.maybePropagateTrace(N=>{p||(o.next(c()),p=!0);let z={type:Cr.DownloadProgress,loaded:N.loaded};N.lengthComputable&&(z.total=N.total),e.responseType==="text"&&a.responseText&&(z.partialText=a.responseText),o.next(z)}),S=this.maybePropagateTrace(N=>{let z={type:Cr.UploadProgress,loaded:N.loaded};N.lengthComputable&&(z.total=N.total),o.next(z)});return a.addEventListener("load",u),a.addEventListener("error",f),a.addEventListener("timeout",g),a.addEventListener("abort",f),e.reportProgress&&(a.addEventListener("progress",v),s!==null&&a.upload&&a.upload.addEventListener("progress",S)),a.send(s),o.next({type:Cr.Sent}),()=>{a.removeEventListener("error",f),a.removeEventListener("abort",f),a.removeEventListener("load",u),a.removeEventListener("timeout",g),e.reportProgress&&(a.removeEventListener("progress",v),s!==null&&a.upload&&a.upload.removeEventListener("progress",S)),a.readyState!==a.DONE&&a.abort()}})))}static \u0275fac=function(i){return new(i||t)(R(Dr))};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function yk(t,n){return n(t)}function Dk(t,n,e){return(i,r)=>eo(e,()=>n(i,o=>t(o,r)))}var Yy=new b("",{factory:()=>[]}),qy=new b(""),Zy=new b("",{factory:()=>!0});var kh=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275prov=y({token:t,factory:function(i){let r=null;return i?r=new(i||t):r=R(Sh),r},providedIn:"root"})}return t})();var qc=(()=>{class t{backend;injector;chain=null;pendingTasks=d(Sa);contributeToStability=d(Zy);constructor(e,i){this.backend=e,this.injector=i}handle(e){if(this.chain===null){let i=Array.from(new Set([...this.injector.get(Yy),...this.injector.get(qy,[])]));this.chain=i.reduceRight((r,o)=>Dk(r,o,this.injector),yk)}if(this.contributeToStability){let i=this.pendingTasks.add();return this.chain(e,r=>this.backend.handle(r)).pipe(ua(i))}else return this.chain(e,i=>this.backend.handle(i))}static \u0275fac=function(i){return new(i||t)(R(kh),R(Ue))};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),Th=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275prov=y({token:t,factory:function(i){let r=null;return i?r=new(i||t):r=R(qc),r},providedIn:"root"})}return t})();function Ih(t,n){return{body:n,headers:t.headers,context:t.context,observe:t.observe,params:t.params,reportProgress:t.reportProgress,responseType:t.responseType,withCredentials:t.withCredentials,credentials:t.credentials,transferCache:t.transferCache,timeout:t.timeout,keepalive:t.keepalive,priority:t.priority,cache:t.cache,mode:t.mode,redirect:t.redirect,integrity:t.integrity,referrer:t.referrer,referrerPolicy:t.referrerPolicy}}var ut=(()=>{class t{handler;constructor(e){this.handler=e}request(e,i,r={}){let o;if(e instanceof wo)o=e;else{let l;r.headers instanceof xi?l=r.headers:l=new xi(r.headers);let c;r.params&&(r.params instanceof Wn?c=r.params:c=new Wn({fromObject:r.params})),o=new wo(e,i,r.body!==void 0?r.body:null,{headers:l,context:r.context,params:c,reportProgress:r.reportProgress,responseType:r.responseType||"json",withCredentials:r.withCredentials,transferCache:r.transferCache,keepalive:r.keepalive,priority:r.priority,cache:r.cache,mode:r.mode,redirect:r.redirect,credentials:r.credentials,referrer:r.referrer,referrerPolicy:r.referrerPolicy,integrity:r.integrity,timeout:r.timeout})}let a=Pe(o).pipe(Cu(l=>this.handler.handle(l)));if(e instanceof wo||r.observe==="events")return a;let s=a.pipe(Le(l=>l instanceof as));switch(r.observe||"body"){case"body":switch(o.responseType){case"arraybuffer":return s.pipe(Ee(l=>{if(l.body!==null&&!(l.body instanceof ArrayBuffer))throw new $(2806,!1);return l.body}));case"blob":return s.pipe(Ee(l=>{if(l.body!==null&&!(l.body instanceof Blob))throw new $(2807,!1);return l.body}));case"text":return s.pipe(Ee(l=>{if(l.body!==null&&typeof l.body!="string")throw new $(2808,!1);return l.body}));default:return s.pipe(Ee(l=>l.body))}case"response":return s;default:throw new $(2809,!1)}}delete(e,i={}){return this.request("DELETE",e,i)}get(e,i={}){return this.request("GET",e,i)}head(e,i={}){return this.request("HEAD",e,i)}jsonp(e,i){return this.request("JSONP",e,{params:new Wn().append(i,"JSONP_CALLBACK"),observe:"body",responseType:"json"})}options(e,i={}){return this.request("OPTIONS",e,i)}patch(e,i,r={}){return this.request("PATCH",e,Ih(r,i))}post(e,i,r={}){return this.request("POST",e,Ih(r,i))}put(e,i,r={}){return this.request("PUT",e,Ih(r,i))}static \u0275fac=function(i){return new(i||t)(R(Th))};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Ck=new b("",{factory:()=>!0}),xk="XSRF-TOKEN",wk=new b("",{factory:()=>xk}),Ek="X-XSRF-TOKEN",Mk=new b("",{factory:()=>Ek}),Ik=(()=>{class t{cookieName=d(wk);doc=d(H);lastCookieString="";lastToken=null;parseCount=0;getToken(){let e=this.doc.cookie||"";return e!==this.lastCookieString&&(this.parseCount++,this.lastToken=ts(e,this.cookieName),this.lastCookieString=e),this.lastToken}static \u0275fac=function(i){return new(i||t)};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),Ky=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275prov=y({token:t,factory:function(i){let r=null;return i?r=new(i||t):r=R(Ik),r},providedIn:"root"})}return t})();function Sk(t,n){if(!d(Ck)||t.method==="GET"||t.method==="HEAD")return n(t);try{let r=d(xo).href,{origin:o}=new URL(r),{origin:a}=new URL(t.url,o);if(o!==a)return n(t)}catch{return n(t)}let e=d(Ky).getToken(),i=d(Mk);return e!=null&&!t.headers.has(i)&&(t=t.clone({headers:t.headers.set(i,e)})),n(t)}function Ah(...t){let n=[ut,qc,{provide:Th,useExisting:qc},{provide:kh,useFactory:()=>d(bk,{optional:!0})??d(Sh)},{provide:Yy,useValue:Sk,multi:!0}];for(let e of t)n.push(...e.\u0275providers);return ir(n)}var xr=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275prov=y({token:t,factory:function(i){let r=null;return i?r=new(i||t):r=R(kk),r},providedIn:"root"})}return t})(),kk=(()=>{class t extends xr{_doc;constructor(e){super(),this._doc=e}sanitize(e,i){if(i==null)return null;switch(e){case Je.NONE:return i;case Je.HTML:return $n(i,"HTML")?hn(i):vc(this._doc,String(i)).toString();case Je.STYLE:return $n(i,"Style")?hn(i):i;case Je.SCRIPT:if($n(i,"Script"))return hn(i);throw new $(5200,!1);case Je.URL:return $n(i,"URL")?hn(i):ja(String(i));case Je.RESOURCE_URL:if($n(i,"ResourceURL"))return hn(i);throw new $(5201,!1);default:throw new $(5202,!1)}}bypassSecurityTrustHtml(e){return Sm(e)}bypassSecurityTrustStyle(e){return km(e)}bypassSecurityTrustScript(e){return Tm(e)}bypassSecurityTrustUrl(e){return Am(e)}bypassSecurityTrustResourceUrl(e){return Rm(e)}static \u0275fac=function(i){return new(i||t)(R(H))};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Xy={providers:[Ef(),Ah()]};function wr(t){return t.buttons===0||t.detail===0}function Er(t){let n=t.touches&&t.touches[0]||t.changedTouches&&t.changedTouches[0];return!!n&&n.identifier===-1&&(n.radiusX==null||n.radiusX===1)&&(n.radiusY==null||n.radiusY===1)}var Rh;function Jy(){if(Rh==null){let t=typeof document<"u"?document.head:null;Rh=!!(t&&(t.createShadowRoot||t.attachShadow))}return Rh}function Oh(t){if(Jy()){let n=t.getRootNode?t.getRootNode():null;if(typeof ShadowRoot<"u"&&ShadowRoot&&n instanceof ShadowRoot)return n}return null}function Yn(){let t=typeof document<"u"&&document?document.activeElement:null;for(;t&&t.shadowRoot;){let n=t.shadowRoot.activeElement;if(n===t)break;t=n}return t}function wt(t){return t.composedPath?t.composedPath()[0]:t.target}var Nh;try{Nh=typeof Intl<"u"&&Intl.v8BreakIterator}catch{Nh=!1}var de=(()=>{class t{_platformId=d(gr);isBrowser=this._platformId?Ay(this._platformId):typeof document=="object"&&!!document;EDGE=this.isBrowser&&/(edge)/i.test(navigator.userAgent);TRIDENT=this.isBrowser&&/(msie|trident)/i.test(navigator.userAgent);BLINK=this.isBrowser&&!!(window.chrome||Nh)&&typeof CSS<"u"&&!this.EDGE&&!this.TRIDENT;WEBKIT=this.isBrowser&&/AppleWebKit/i.test(navigator.userAgent)&&!this.BLINK&&!this.EDGE&&!this.TRIDENT;IOS=this.isBrowser&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!("MSStream"in window);FIREFOX=this.isBrowser&&/(firefox|minefield)/i.test(navigator.userAgent);ANDROID=this.isBrowser&&/android/i.test(navigator.userAgent)&&!this.TRIDENT;SAFARI=this.isBrowser&&/safari/i.test(navigator.userAgent)&&this.WEBKIT;constructor(){}static \u0275fac=function(i){return new(i||t)};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var ss;function eD(){if(ss==null&&typeof window<"u")try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:()=>ss=!0}))}finally{ss=ss||!1}return ss}function So(t){return eD()?t:!!t.capture}function qn(t,n=0){return tD(t)?Number(t):arguments.length===2?n:0}function tD(t){return!isNaN(parseFloat(t))&&!isNaN(Number(t))}function Ot(t){return t instanceof L?t.nativeElement:t}var nD=new b("cdk-input-modality-detector-options"),iD={ignoreKeys:[18,17,224,91,16]},rD=650,Fh={passive:!0,capture:!0},oD=(()=>{class t{_platform=d(de);_listenerCleanups;modalityDetected;modalityChanged;get mostRecentModality(){return this._modality.value}_mostRecentTarget=null;_modality=new zi(null);_options;_lastTouchMs=0;_onKeydown=e=>{this._options?.ignoreKeys?.some(i=>i===e.keyCode)||(this._modality.next("keyboard"),this._mostRecentTarget=wt(e))};_onMousedown=e=>{Date.now()-this._lastTouchMs<rD||(this._modality.next(wr(e)?"keyboard":"mouse"),this._mostRecentTarget=wt(e))};_onTouchstart=e=>{if(Er(e)){this._modality.next("keyboard");return}this._lastTouchMs=Date.now(),this._modality.next("touch"),this._mostRecentTarget=wt(e)};constructor(){let e=d(A),i=d(H),r=d(nD,{optional:!0});if(this._options=w(w({},iD),r),this.modalityDetected=this._modality.pipe(ma(1)),this.modalityChanged=this.modalityDetected.pipe(gl()),this._platform.isBrowser){let o=d(Ge).createRenderer(null,null);this._listenerCleanups=e.runOutsideAngular(()=>[o.listen(i,"keydown",this._onKeydown,Fh),o.listen(i,"mousedown",this._onMousedown,Fh),o.listen(i,"touchstart",this._onTouchstart,Fh)])}}ngOnDestroy(){this._modality.complete(),this._listenerCleanups?.forEach(e=>e())}static \u0275fac=function(i){return new(i||t)};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),ls=(function(t){return t[t.IMMEDIATE=0]="IMMEDIATE",t[t.EVENTUAL=1]="EVENTUAL",t})(ls||{}),aD=new b("cdk-focus-monitor-default-options"),Zc=So({passive:!0,capture:!0}),Nt=(()=>{class t{_ngZone=d(A);_platform=d(de);_inputModalityDetector=d(oD);_origin=null;_lastFocusOrigin=null;_windowFocused=!1;_windowFocusTimeoutId;_originTimeoutId;_originFromTouchInteraction=!1;_elementInfo=new Map;_monitoredElementCount=0;_rootNodeFocusListenerCount=new Map;_detectionMode;_windowFocusListener=()=>{this._windowFocused=!0,this._windowFocusTimeoutId=setTimeout(()=>this._windowFocused=!1)};_document=d(H);_stopInputModalityDetector=new E;constructor(){let e=d(aD,{optional:!0});this._detectionMode=e?.detectionMode||ls.IMMEDIATE}_rootNodeFocusAndBlurListener=e=>{let i=wt(e);for(let r=i;r;r=r.parentElement)e.type==="focus"?this._onFocus(e,r):this._onBlur(e,r)};monitor(e,i=!1){let r=Ot(e);if(!this._platform.isBrowser||r.nodeType!==1)return Pe();let o=Oh(r)||this._document,a=this._elementInfo.get(r);if(a)return i&&(a.checkChildren=!0),a.subject;let s={checkChildren:i,subject:new E,rootNode:o};return this._elementInfo.set(r,s),this._registerGlobalListeners(s),s.subject}stopMonitoring(e){let i=Ot(e),r=this._elementInfo.get(i);r&&(r.subject.complete(),this._setClasses(i),this._elementInfo.delete(i),this._removeGlobalListeners(r))}focusVia(e,i,r){let o=Ot(e),a=this._document.activeElement;o===a?this._getClosestElementsInfo(o).forEach(([s,l])=>this._originChanged(s,i,l)):(this._setOrigin(i),typeof o.focus=="function"&&o.focus(r))}ngOnDestroy(){this._elementInfo.forEach((e,i)=>this.stopMonitoring(i))}_getWindow(){return this._document.defaultView||window}_getFocusOrigin(e){return this._origin?this._originFromTouchInteraction?this._shouldBeAttributedToTouch(e)?"touch":"program":this._origin:this._windowFocused&&this._lastFocusOrigin?this._lastFocusOrigin:e&&this._isLastInteractionFromInputLabel(e)?"mouse":"program"}_shouldBeAttributedToTouch(e){return this._detectionMode===ls.EVENTUAL||!!e?.contains(this._inputModalityDetector._mostRecentTarget)}_setClasses(e,i){e.classList.toggle("cdk-focused",!!i),e.classList.toggle("cdk-touch-focused",i==="touch"),e.classList.toggle("cdk-keyboard-focused",i==="keyboard"),e.classList.toggle("cdk-mouse-focused",i==="mouse"),e.classList.toggle("cdk-program-focused",i==="program")}_setOrigin(e,i=!1){this._ngZone.runOutsideAngular(()=>{if(this._origin=e,this._originFromTouchInteraction=e==="touch"&&i,this._detectionMode===ls.IMMEDIATE){clearTimeout(this._originTimeoutId);let r=this._originFromTouchInteraction?rD:1;this._originTimeoutId=setTimeout(()=>this._origin=null,r)}})}_onFocus(e,i){let r=this._elementInfo.get(i),o=wt(e);!r||!r.checkChildren&&i!==o||this._originChanged(i,this._getFocusOrigin(o),r)}_onBlur(e,i){let r=this._elementInfo.get(i);!r||r.checkChildren&&e.relatedTarget instanceof Node&&i.contains(e.relatedTarget)||(this._setClasses(i),this._emitOrigin(r,null))}_emitOrigin(e,i){e.subject.observers.length&&this._ngZone.run(()=>e.subject.next(i))}_registerGlobalListeners(e){if(!this._platform.isBrowser)return;let i=e.rootNode,r=this._rootNodeFocusListenerCount.get(i)||0;r||this._ngZone.runOutsideAngular(()=>{i.addEventListener("focus",this._rootNodeFocusAndBlurListener,Zc),i.addEventListener("blur",this._rootNodeFocusAndBlurListener,Zc)}),this._rootNodeFocusListenerCount.set(i,r+1),++this._monitoredElementCount===1&&(this._ngZone.runOutsideAngular(()=>{this._getWindow().addEventListener("focus",this._windowFocusListener)}),this._inputModalityDetector.modalityDetected.pipe(je(this._stopInputModalityDetector)).subscribe(o=>{this._setOrigin(o,!0)}))}_removeGlobalListeners(e){let i=e.rootNode;if(this._rootNodeFocusListenerCount.has(i)){let r=this._rootNodeFocusListenerCount.get(i);r>1?this._rootNodeFocusListenerCount.set(i,r-1):(i.removeEventListener("focus",this._rootNodeFocusAndBlurListener,Zc),i.removeEventListener("blur",this._rootNodeFocusAndBlurListener,Zc),this._rootNodeFocusListenerCount.delete(i))}--this._monitoredElementCount||(this._getWindow().removeEventListener("focus",this._windowFocusListener),this._stopInputModalityDetector.next(),clearTimeout(this._windowFocusTimeoutId),clearTimeout(this._originTimeoutId))}_originChanged(e,i,r){this._setClasses(e,i),this._emitOrigin(r,i),this._lastFocusOrigin=i}_getClosestElementsInfo(e){let i=[];return this._elementInfo.forEach((r,o)=>{(o===e||r.checkChildren&&o.contains(e))&&i.push([o,r])}),i}_isLastInteractionFromInputLabel(e){let{_mostRecentTarget:i,mostRecentModality:r}=this._inputModalityDetector;if(r!=="mouse"||!i||i===e||e.nodeName!=="INPUT"&&e.nodeName!=="TEXTAREA"||e.disabled)return!1;let o=e.labels;if(o){for(let a=0;a<o.length;a++)if(o[a].contains(i))return!0}return!1}static \u0275fac=function(i){return new(i||t)};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),Ph=(()=>{class t{_elementRef=d(L);_focusMonitor=d(Nt);_monitorSubscription;_focusOrigin=null;cdkFocusChange=new F;constructor(){}get focusOrigin(){return this._focusOrigin}ngAfterViewInit(){let e=this._elementRef.nativeElement;this._monitorSubscription=this._focusMonitor.monitor(e,e.nodeType===1&&e.hasAttribute("cdkMonitorSubtreeFocus")).subscribe(i=>{this._focusOrigin=i,this.cdkFocusChange.emit(i)})}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef),this._monitorSubscription?.unsubscribe()}static \u0275fac=function(i){return new(i||t)};static \u0275dir=U({type:t,selectors:[["","cdkMonitorElementFocus",""],["","cdkMonitorSubtreeFocus",""]],outputs:{cdkFocusChange:"cdkFocusChange"},exportAs:["cdkMonitorFocus"]})}return t})();var Kc=new WeakMap,Re=(()=>{class t{_appRef;_injector=d(G);_environmentInjector=d(Ue);load(e){let i=this._appRef=this._appRef||this._injector.get($t),r=Kc.get(i);r||(r={loaders:new Set,refs:[]},Kc.set(i,r),i.onDestroy(()=>{Kc.get(i)?.refs.forEach(o=>o.destroy()),Kc.delete(i)})),r.loaders.has(e)||(r.loaders.add(e),r.refs.push(Pc(e,{environmentInjector:this._environmentInjector})))}static \u0275fac=function(i){return new(i||t)};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var wi=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["ng-component"]],exportAs:["cdkVisuallyHidden"],decls:0,vars:0,template:function(i,r){},styles:[`.cdk-visually-hidden {
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
`],encapsulation:2,changeDetection:0})}return t})(),Qc;function Tk(){if(Qc===void 0&&(Qc=null,typeof window<"u")){let t=window;t.trustedTypes!==void 0&&(Qc=t.trustedTypes.createPolicy("angular#components",{createHTML:n=>n}))}return Qc}function Mr(t){return Tk()?.createHTML(t)||t}function sD(t,n,e){let i=e.sanitize(Je.HTML,n);t.innerHTML=Mr(i||"")}function ko(t){return Array.isArray(t)?t:[t]}var lD=new Set,Ir,To=(()=>{class t{_platform=d(de);_nonce=d(_r,{optional:!0});_matchMedia;constructor(){this._matchMedia=this._platform.isBrowser&&window.matchMedia?window.matchMedia.bind(window):Rk}matchMedia(e){return(this._platform.WEBKIT||this._platform.BLINK)&&Ak(e,this._nonce),this._matchMedia(e)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function Ak(t,n){if(!lD.has(t))try{Ir||(Ir=document.createElement("style"),n&&Ir.setAttribute("nonce",n),Ir.setAttribute("type","text/css"),document.head.appendChild(Ir)),Ir.sheet&&(Ir.sheet.insertRule(`@media ${t} {body{ }}`,0),lD.add(t))}catch(e){console.error(e)}}function Rk(t){return{matches:t==="all"||t==="",media:t,addListener:()=>{},removeListener:()=>{}}}var cs=(()=>{class t{_mediaMatcher=d(To);_zone=d(A);_queries=new Map;_destroySubject=new E;constructor(){}ngOnDestroy(){this._destroySubject.next(),this._destroySubject.complete()}isMatched(e){return cD(ko(e)).some(r=>this._registerQuery(r).mql.matches)}observe(e){let r=cD(ko(e)).map(a=>this._registerQuery(a).observable),o=Du(r);return o=Zr(o.pipe(vt(1)),o.pipe(ma(1),da(0))),o.pipe(Ee(a=>{let s={matches:!1,breakpoints:{}};return a.forEach(({matches:l,query:c})=>{s.matches=s.matches||l,s.breakpoints[c]=l}),s}))}_registerQuery(e){if(this._queries.has(e))return this._queries.get(e);let i=this._mediaMatcher.matchMedia(e),o={observable:new le(a=>{let s=l=>this._zone.run(()=>a.next(l));return i.addListener(s),()=>{i.removeListener(s)}}).pipe(nt(i),Ee(({matches:a})=>({query:e,matches:a})),je(this._destroySubject)),mql:i};return this._queries.set(e,o),o}static \u0275fac=function(i){return new(i||t)};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function cD(t){return t.map(n=>n.split(",")).reduce((n,e)=>n.concat(e)).map(n=>n.trim())}var Ok=(()=>{class t{create(e){return typeof MutationObserver>"u"?null:new MutationObserver(e)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Xc=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=Z({type:t});static \u0275inj=q({providers:[Ok]})}return t})();var Bh=(()=>{class t{_platform=d(de);constructor(){}isDisabled(e){return e.hasAttribute("disabled")}isVisible(e){return Fk(e)&&getComputedStyle(e).visibility==="visible"}isTabbable(e){if(!this._platform.isBrowser)return!1;let i=Nk(zk(e));if(i&&(dD(i)===-1||!this.isVisible(i)))return!1;let r=e.nodeName.toLowerCase(),o=dD(e);return e.hasAttribute("contenteditable")?o!==-1:r==="iframe"||r==="object"||this._platform.WEBKIT&&this._platform.IOS&&!Hk(e)?!1:r==="audio"?e.hasAttribute("controls")?o!==-1:!1:r==="video"?o===-1?!1:o!==null?!0:this._platform.FIREFOX||e.hasAttribute("controls"):e.tabIndex>=0}isFocusable(e,i){return Uk(e)&&!this.isDisabled(e)&&(i?.ignoreVisibility||this.isVisible(e))}static \u0275fac=function(i){return new(i||t)};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function Nk(t){try{return t.frameElement}catch{return null}}function Fk(t){return!!(t.offsetWidth||t.offsetHeight||typeof t.getClientRects=="function"&&t.getClientRects().length)}function Pk(t){let n=t.nodeName.toLowerCase();return n==="input"||n==="select"||n==="button"||n==="textarea"}function Lk(t){return Bk(t)&&t.type=="hidden"}function Vk(t){return jk(t)&&t.hasAttribute("href")}function Bk(t){return t.nodeName.toLowerCase()=="input"}function jk(t){return t.nodeName.toLowerCase()=="a"}function mD(t){if(!t.hasAttribute("tabindex")||t.tabIndex===void 0)return!1;let n=t.getAttribute("tabindex");return!!(n&&!isNaN(parseInt(n,10)))}function dD(t){if(!mD(t))return null;let n=parseInt(t.getAttribute("tabindex")||"",10);return isNaN(n)?-1:n}function Hk(t){let n=t.nodeName.toLowerCase(),e=n==="input"&&t.type;return e==="text"||e==="password"||n==="select"||n==="textarea"}function Uk(t){return Lk(t)?!1:Pk(t)||Vk(t)||t.hasAttribute("contenteditable")||mD(t)}function zk(t){return t.ownerDocument&&t.ownerDocument.defaultView||window}var Vh=class{_element;_checker;_ngZone;_document;_injector;_startAnchor=null;_endAnchor=null;_hasAttached=!1;startAnchorListener=()=>this.focusLastTabbableElement();endAnchorListener=()=>this.focusFirstTabbableElement();get enabled(){return this._enabled}set enabled(n){this._enabled=n,this._startAnchor&&this._endAnchor&&(this._toggleAnchorTabIndex(n,this._startAnchor),this._toggleAnchorTabIndex(n,this._endAnchor))}_enabled=!0;constructor(n,e,i,r,o=!1,a){this._element=n,this._checker=e,this._ngZone=i,this._document=r,this._injector=a,o||this.attachAnchors()}destroy(){let n=this._startAnchor,e=this._endAnchor;n&&(n.removeEventListener("focus",this.startAnchorListener),n.remove()),e&&(e.removeEventListener("focus",this.endAnchorListener),e.remove()),this._startAnchor=this._endAnchor=null,this._hasAttached=!1}attachAnchors(){return this._hasAttached?!0:(this._ngZone.runOutsideAngular(()=>{this._startAnchor||(this._startAnchor=this._createAnchor(),this._startAnchor.addEventListener("focus",this.startAnchorListener)),this._endAnchor||(this._endAnchor=this._createAnchor(),this._endAnchor.addEventListener("focus",this.endAnchorListener))}),this._element.parentNode&&(this._element.parentNode.insertBefore(this._startAnchor,this._element),this._element.parentNode.insertBefore(this._endAnchor,this._element.nextSibling),this._hasAttached=!0),this._hasAttached)}focusInitialElementWhenReady(n){return new Promise(e=>{this._executeOnStable(()=>e(this.focusInitialElement(n)))})}focusFirstTabbableElementWhenReady(n){return new Promise(e=>{this._executeOnStable(()=>e(this.focusFirstTabbableElement(n)))})}focusLastTabbableElementWhenReady(n){return new Promise(e=>{this._executeOnStable(()=>e(this.focusLastTabbableElement(n)))})}_getRegionBoundary(n){let e=this._element.querySelectorAll(`[cdk-focus-region-${n}], [cdkFocusRegion${n}], [cdk-focus-${n}]`);return n=="start"?e.length?e[0]:this._getFirstTabbableElement(this._element):e.length?e[e.length-1]:this._getLastTabbableElement(this._element)}focusInitialElement(n){let e=this._element.querySelector("[cdk-focus-initial], [cdkFocusInitial]");if(e){if(!this._checker.isFocusable(e)){let i=this._getFirstTabbableElement(e);return i?.focus(n),!!i}return e.focus(n),!0}return this.focusFirstTabbableElement(n)}focusFirstTabbableElement(n){let e=this._getRegionBoundary("start");return e&&e.focus(n),!!e}focusLastTabbableElement(n){let e=this._getRegionBoundary("end");return e&&e.focus(n),!!e}hasAttached(){return this._hasAttached}_getFirstTabbableElement(n){if(this._checker.isFocusable(n)&&this._checker.isTabbable(n))return n;let e=n.children;for(let i=0;i<e.length;i++){let r=e[i].nodeType===this._document.ELEMENT_NODE?this._getFirstTabbableElement(e[i]):null;if(r)return r}return null}_getLastTabbableElement(n){if(this._checker.isFocusable(n)&&this._checker.isTabbable(n))return n;let e=n.children;for(let i=e.length-1;i>=0;i--){let r=e[i].nodeType===this._document.ELEMENT_NODE?this._getLastTabbableElement(e[i]):null;if(r)return r}return null}_createAnchor(){let n=this._document.createElement("div");return this._toggleAnchorTabIndex(this._enabled,n),n.classList.add("cdk-visually-hidden"),n.classList.add("cdk-focus-trap-anchor"),n.setAttribute("aria-hidden","true"),n}_toggleAnchorTabIndex(n,e){n?e.setAttribute("tabindex","0"):e.removeAttribute("tabindex")}toggleAnchors(n){this._startAnchor&&this._endAnchor&&(this._toggleAnchorTabIndex(n,this._startAnchor),this._toggleAnchorTabIndex(n,this._endAnchor))}_executeOnStable(n){this._injector?Ye(n,{injector:this._injector}):setTimeout(n)}},Jc=(()=>{class t{_checker=d(Bh);_ngZone=d(A);_document=d(H);_injector=d(G);constructor(){d(Re).load(wi)}create(e,i=!1){return new Vh(e,this._checker,this._ngZone,this._document,i,this._injector)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),jh=(()=>{class t{_elementRef=d(L);_focusTrapFactory=d(Jc);focusTrap=void 0;_previouslyFocusedElement=null;get enabled(){return this.focusTrap?.enabled||!1}set enabled(e){this.focusTrap&&(this.focusTrap.enabled=e)}autoCapture=!1;constructor(){d(de).isBrowser&&(this.focusTrap=this._focusTrapFactory.create(this._elementRef.nativeElement,!0))}ngOnDestroy(){this.focusTrap?.destroy(),this._previouslyFocusedElement&&(this._previouslyFocusedElement.focus(),this._previouslyFocusedElement=null)}ngAfterContentInit(){this.focusTrap?.attachAnchors(),this.autoCapture&&this._captureFocus()}ngDoCheck(){this.focusTrap&&!this.focusTrap.hasAttached()&&this.focusTrap.attachAnchors()}ngOnChanges(e){let i=e.autoCapture;i&&!i.firstChange&&this.autoCapture&&this.focusTrap?.hasAttached()&&this._captureFocus()}_captureFocus(){this._previouslyFocusedElement=Yn(),this.focusTrap?.focusInitialElementWhenReady()}static \u0275fac=function(i){return new(i||t)};static \u0275dir=U({type:t,selectors:[["","cdkTrapFocus",""]],inputs:{enabled:[2,"cdkTrapFocus","enabled",ie],autoCapture:[2,"cdkTrapFocusAutoCapture","autoCapture",ie]},exportAs:["cdkTrapFocus"],features:[We]})}return t})(),hD=new b("liveAnnouncerElement",{providedIn:"root",factory:()=>null}),pD=new b("LIVE_ANNOUNCER_DEFAULT_OPTIONS"),$k=0,Hh=(()=>{class t{_ngZone=d(A);_defaultOptions=d(pD,{optional:!0});_liveElement;_document=d(H);_sanitizer=d(xr);_previousTimeout;_currentPromise;_currentResolve;constructor(){let e=d(hD,{optional:!0});this._liveElement=e||this._createLiveElement()}announce(e,...i){let r=this._defaultOptions,o,a;return i.length===1&&typeof i[0]=="number"?a=i[0]:[o,a]=i,this.clear(),clearTimeout(this._previousTimeout),o||(o=r&&r.politeness?r.politeness:"polite"),a==null&&r&&(a=r.duration),this._liveElement.setAttribute("aria-live",o),this._liveElement.id&&this._exposeAnnouncerToModals(this._liveElement.id),this._ngZone.runOutsideAngular(()=>(this._currentPromise||(this._currentPromise=new Promise(s=>this._currentResolve=s)),clearTimeout(this._previousTimeout),this._previousTimeout=setTimeout(()=>{!e||typeof e=="string"?this._liveElement.textContent=e:sD(this._liveElement,e,this._sanitizer),typeof a=="number"&&(this._previousTimeout=setTimeout(()=>this.clear(),a)),this._currentResolve?.(),this._currentPromise=this._currentResolve=void 0},100),this._currentPromise))}clear(){this._liveElement&&(this._liveElement.textContent="")}ngOnDestroy(){clearTimeout(this._previousTimeout),this._liveElement?.remove(),this._liveElement=null,this._currentResolve?.(),this._currentPromise=this._currentResolve=void 0}_createLiveElement(){let e="cdk-live-announcer-element",i=this._document.getElementsByClassName(e),r=this._document.createElement("div");for(let o=0;o<i.length;o++)i[o].remove();return r.classList.add(e),r.classList.add("cdk-visually-hidden"),r.setAttribute("aria-atomic","true"),r.setAttribute("aria-live","polite"),r.id=`cdk-live-announcer-${$k++}`,this._document.body.appendChild(r),r}_exposeAnnouncerToModals(e){let i=this._document.querySelectorAll('body > .cdk-overlay-container [aria-modal="true"]');for(let r=0;r<i.length;r++){let o=i[r],a=o.getAttribute("aria-owns");a?a.indexOf(e)===-1&&o.setAttribute("aria-owns",a+" "+e):o.setAttribute("aria-owns",e)}}static \u0275fac=function(i){return new(i||t)};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Ei=(function(t){return t[t.NONE=0]="NONE",t[t.BLACK_ON_WHITE=1]="BLACK_ON_WHITE",t[t.WHITE_ON_BLACK=2]="WHITE_ON_BLACK",t})(Ei||{}),uD="cdk-high-contrast-black-on-white",fD="cdk-high-contrast-white-on-black",Lh="cdk-high-contrast-active",gD=(()=>{class t{_platform=d(de);_hasCheckedHighContrastMode=!1;_document=d(H);_breakpointSubscription;constructor(){this._breakpointSubscription=d(cs).observe("(forced-colors: active)").subscribe(()=>{this._hasCheckedHighContrastMode&&(this._hasCheckedHighContrastMode=!1,this._applyBodyHighContrastModeCssClasses())})}getHighContrastMode(){if(!this._platform.isBrowser)return Ei.NONE;let e=this._document.createElement("div");e.style.backgroundColor="rgb(1,2,3)",e.style.position="absolute",this._document.body.appendChild(e);let i=this._document.defaultView||window,r=i&&i.getComputedStyle?i.getComputedStyle(e):null,o=(r&&r.backgroundColor||"").replace(/ /g,"");switch(e.remove(),o){case"rgb(0,0,0)":case"rgb(45,50,54)":case"rgb(32,32,32)":return Ei.WHITE_ON_BLACK;case"rgb(255,255,255)":case"rgb(255,250,239)":return Ei.BLACK_ON_WHITE}return Ei.NONE}ngOnDestroy(){this._breakpointSubscription.unsubscribe()}_applyBodyHighContrastModeCssClasses(){if(!this._hasCheckedHighContrastMode&&this._platform.isBrowser&&this._document.body){let e=this._document.body.classList;e.remove(Lh,uD,fD),this._hasCheckedHighContrastMode=!0;let i=this.getHighContrastMode();i===Ei.BLACK_ON_WHITE?e.add(Lh,uD):i===Ei.WHITE_ON_BLACK&&e.add(Lh,fD)}}static \u0275fac=function(i){return new(i||t)};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),Sr=(()=>{class t{constructor(){d(gD)._applyBodyHighContrastModeCssClasses()}static \u0275fac=function(i){return new(i||t)};static \u0275mod=Z({type:t});static \u0275inj=q({imports:[Xc]})}return t})();var Gk=200,ed=class{_letterKeyStream=new E;_items=[];_selectedItemIndex=-1;_pressedLetters=[];_skipPredicateFn;_selectedItem=new E;selectedItem=this._selectedItem;constructor(n,e){let i=typeof e?.debounceInterval=="number"?e.debounceInterval:Gk;e?.skipPredicate&&(this._skipPredicateFn=e.skipPredicate),this.setItems(n),this._setupKeyHandler(i)}destroy(){this._pressedLetters=[],this._letterKeyStream.complete(),this._selectedItem.complete()}setCurrentSelectedItemIndex(n){this._selectedItemIndex=n}setItems(n){this._items=n}handleKey(n){let e=n.keyCode;n.key&&n.key.length===1?this._letterKeyStream.next(n.key.toLocaleUpperCase()):(e>=65&&e<=90||e>=48&&e<=57)&&this._letterKeyStream.next(String.fromCharCode(e))}isTyping(){return this._pressedLetters.length>0}reset(){this._pressedLetters=[]}_setupKeyHandler(n){this._letterKeyStream.pipe(Zi(e=>this._pressedLetters.push(e)),da(n),Le(()=>this._pressedLetters.length>0),Ee(()=>this._pressedLetters.join("").toLocaleUpperCase())).subscribe(e=>{for(let i=1;i<this._items.length+1;i++){let r=(this._selectedItemIndex+i)%this._items.length,o=this._items[r];if(!this._skipPredicateFn?.(o)&&o.getLabel?.().toLocaleUpperCase().trim().indexOf(e)===0){this._selectedItem.next(o);break}}this._pressedLetters=[]})}};function Et(t,...n){return n.length?n.some(e=>t[e]):t.altKey||t.shiftKey||t.ctrlKey||t.metaKey}var td=class{_items;_activeItemIndex=x(-1);_activeItem=x(null);_wrap=!1;_typeaheadSubscription=ue.EMPTY;_itemChangesSubscription;_vertical=!0;_horizontal=null;_allowedModifierKeys=[];_homeAndEnd=!1;_pageUpAndDown={enabled:!1,delta:10};_effectRef;_typeahead;_skipPredicateFn=n=>n.disabled;constructor(n,e){this._items=n,n instanceof Un?this._itemChangesSubscription=n.changes.subscribe(i=>this._itemsChanged(i.toArray())):vi(n)&&(this._effectRef=dn(()=>this._itemsChanged(n()),{injector:e}))}tabOut=new E;change=new E;skipPredicate(n){return this._skipPredicateFn=n,this}withWrap(n=!0){return this._wrap=n,this}withVerticalOrientation(n=!0){return this._vertical=n,this}withHorizontalOrientation(n){return this._horizontal=n,this}withAllowedModifierKeys(n){return this._allowedModifierKeys=n,this}withTypeAhead(n=200){this._typeaheadSubscription.unsubscribe();let e=this._getItemsArray();return this._typeahead=new ed(e,{debounceInterval:typeof n=="number"?n:void 0,skipPredicate:i=>this._skipPredicateFn(i)}),this._typeaheadSubscription=this._typeahead.selectedItem.subscribe(i=>{this.setActiveItem(i)}),this}cancelTypeahead(){return this._typeahead?.reset(),this}withHomeAndEnd(n=!0){return this._homeAndEnd=n,this}withPageUpDown(n=!0,e=10){return this._pageUpAndDown={enabled:n,delta:e},this}setActiveItem(n){let e=this._activeItem();this.updateActiveItem(n),this._activeItem()!==e&&this.change.next(this._activeItemIndex())}onKeydown(n){let e=n.keyCode,r=["altKey","ctrlKey","metaKey","shiftKey"].every(o=>!n[o]||this._allowedModifierKeys.indexOf(o)>-1);switch(e){case 9:this.tabOut.next();return;case 40:if(this._vertical&&r){this.setNextItemActive();break}else return;case 38:if(this._vertical&&r){this.setPreviousItemActive();break}else return;case 39:if(this._horizontal&&r){this._horizontal==="rtl"?this.setPreviousItemActive():this.setNextItemActive();break}else return;case 37:if(this._horizontal&&r){this._horizontal==="rtl"?this.setNextItemActive():this.setPreviousItemActive();break}else return;case 36:if(this._homeAndEnd&&r){this.setFirstItemActive();break}else return;case 35:if(this._homeAndEnd&&r){this.setLastItemActive();break}else return;case 33:if(this._pageUpAndDown.enabled&&r){let o=this._activeItemIndex()-this._pageUpAndDown.delta;this._setActiveItemByIndex(o>0?o:0,1);break}else return;case 34:if(this._pageUpAndDown.enabled&&r){let o=this._activeItemIndex()+this._pageUpAndDown.delta,a=this._getItemsArray().length;this._setActiveItemByIndex(o<a?o:a-1,-1);break}else return;default:(r||Et(n,"shiftKey"))&&this._typeahead?.handleKey(n);return}this._typeahead?.reset(),n.preventDefault()}get activeItemIndex(){return this._activeItemIndex()}get activeItem(){return this._activeItem()}isTyping(){return!!this._typeahead&&this._typeahead.isTyping()}setFirstItemActive(){this._setActiveItemByIndex(0,1)}setLastItemActive(){this._setActiveItemByIndex(this._getItemsArray().length-1,-1)}setNextItemActive(){this._activeItemIndex()<0?this.setFirstItemActive():this._setActiveItemByDelta(1)}setPreviousItemActive(){this._activeItemIndex()<0&&this._wrap?this.setLastItemActive():this._setActiveItemByDelta(-1)}updateActiveItem(n){let e=this._getItemsArray(),i=typeof n=="number"?n:e.indexOf(n),r=e[i];this._activeItem.set(r??null),this._activeItemIndex.set(i),this._typeahead?.setCurrentSelectedItemIndex(i)}destroy(){this._typeaheadSubscription.unsubscribe(),this._itemChangesSubscription?.unsubscribe(),this._effectRef?.destroy(),this._typeahead?.destroy(),this.tabOut.complete(),this.change.complete()}_setActiveItemByDelta(n){this._wrap?this._setActiveInWrapMode(n):this._setActiveInDefaultMode(n)}_setActiveInWrapMode(n){let e=this._getItemsArray();for(let i=1;i<=e.length;i++){let r=(this._activeItemIndex()+n*i+e.length)%e.length,o=e[r];if(!this._skipPredicateFn(o)){this.setActiveItem(r);return}}}_setActiveInDefaultMode(n){this._setActiveItemByIndex(this._activeItemIndex()+n,n)}_setActiveItemByIndex(n,e){let i=this._getItemsArray();if(i[n]){for(;this._skipPredicateFn(i[n]);)if(n+=e,!i[n])return;this.setActiveItem(n)}}_getItemsArray(){return vi(this._items)?this._items():this._items instanceof Un?this._items.toArray():this._items}_itemsChanged(n){this._typeahead?.setItems(n);let e=this._activeItem();if(e){let i=n.indexOf(e);i>-1&&i!==this._activeItemIndex()&&(this._activeItemIndex.set(i),this._typeahead?.setCurrentSelectedItemIndex(i))}}};var ds=class extends td{_origin="program";setFocusOrigin(n){return this._origin=n,this}setActiveItem(n){super.setActiveItem(n),this.activeItem&&this.activeItem.focus(this._origin)}};var Uh={},Ie=class t{_appId=d(bi);static _infix=`a${Math.floor(Math.random()*1e5).toString()}`;getId(n,e=!1){return this._appId!=="ng"&&(n+=this._appId),Uh.hasOwnProperty(n)||(Uh[n]=0),`${n}${e?t._infix+"-":""}${Uh[n]++}`}static \u0275fac=function(e){return new(e||t)};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})};var bD=" ";function Wk(t,n,e){let i=sd(t,n);e=e.trim(),!i.some(r=>r.trim()===e)&&(i.push(e),t.setAttribute(n,i.join(bD)))}function Yk(t,n,e){let i=sd(t,n);e=e.trim();let r=i.filter(o=>o!==e);r.length?t.setAttribute(n,r.join(bD)):t.removeAttribute(n)}function sd(t,n){return t.getAttribute(n)?.match(/\S+/g)??[]}var vD="cdk-describedby-message",ad="cdk-describedby-host",$h=0,yD=(()=>{class t{_platform=d(de);_document=d(H);_messageRegistry=new Map;_messagesContainer=null;_id=`${$h++}`;constructor(){d(Re).load(wi),this._id=d(bi)+"-"+$h++}describe(e,i,r){if(!this._canBeDescribed(e,i))return;let o=zh(i,r);typeof i!="string"?(_D(i,this._id),this._messageRegistry.set(o,{messageElement:i,referenceCount:0})):this._messageRegistry.has(o)||this._createMessageElement(i,r),this._isElementDescribedByMessage(e,o)||this._addMessageReference(e,o)}removeDescription(e,i,r){if(!i||!this._isElementNode(e))return;let o=zh(i,r);if(this._isElementDescribedByMessage(e,o)&&this._removeMessageReference(e,o),typeof i=="string"){let a=this._messageRegistry.get(o);a&&a.referenceCount===0&&this._deleteMessageElement(o)}this._messagesContainer?.childNodes.length===0&&(this._messagesContainer.remove(),this._messagesContainer=null)}ngOnDestroy(){let e=this._document.querySelectorAll(`[${ad}="${this._id}"]`);for(let i=0;i<e.length;i++)this._removeCdkDescribedByReferenceIds(e[i]),e[i].removeAttribute(ad);this._messagesContainer?.remove(),this._messagesContainer=null,this._messageRegistry.clear()}_createMessageElement(e,i){let r=this._document.createElement("div");_D(r,this._id),r.textContent=e,i&&r.setAttribute("role",i),this._createMessagesContainer(),this._messagesContainer.appendChild(r),this._messageRegistry.set(zh(e,i),{messageElement:r,referenceCount:0})}_deleteMessageElement(e){this._messageRegistry.get(e)?.messageElement?.remove(),this._messageRegistry.delete(e)}_createMessagesContainer(){if(this._messagesContainer)return;let e="cdk-describedby-message-container",i=this._document.querySelectorAll(`.${e}[platform="server"]`);for(let o=0;o<i.length;o++)i[o].remove();let r=this._document.createElement("div");r.style.visibility="hidden",r.classList.add(e),r.classList.add("cdk-visually-hidden"),this._platform.isBrowser||r.setAttribute("platform","server"),this._document.body.appendChild(r),this._messagesContainer=r}_removeCdkDescribedByReferenceIds(e){let i=sd(e,"aria-describedby").filter(r=>r.indexOf(vD)!=0);e.setAttribute("aria-describedby",i.join(" "))}_addMessageReference(e,i){let r=this._messageRegistry.get(i);Wk(e,"aria-describedby",r.messageElement.id),e.setAttribute(ad,this._id),r.referenceCount++}_removeMessageReference(e,i){let r=this._messageRegistry.get(i);r.referenceCount--,Yk(e,"aria-describedby",r.messageElement.id),e.removeAttribute(ad)}_isElementDescribedByMessage(e,i){let r=sd(e,"aria-describedby"),o=this._messageRegistry.get(i),a=o&&o.messageElement.id;return!!a&&r.indexOf(a)!=-1}_canBeDescribed(e,i){if(!this._isElementNode(e))return!1;if(i&&typeof i=="object")return!0;let r=i==null?"":`${i}`.trim(),o=e.getAttribute("aria-label");return r?!o||o.trim()!==r:!1}_isElementNode(e){return e.nodeType===this._document.ELEMENT_NODE}static \u0275fac=function(i){return new(i||t)};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function zh(t,n){return typeof t=="string"?`${n||""}/${t}`:t}function _D(t,n){t.id||(t.id=`${vD}-${n}-${$h++}`)}var gn=(function(t){return t[t.NORMAL=0]="NORMAL",t[t.NEGATED=1]="NEGATED",t[t.INVERTED=2]="INVERTED",t})(gn||{}),ld,kr;function cd(){if(kr==null){if(typeof document!="object"||!document||typeof Element!="function"||!Element)return kr=!1,kr;if(document.documentElement?.style&&"scrollBehavior"in document.documentElement.style)kr=!0;else{let t=Element.prototype.scrollTo;t?kr=!/\{\s*\[native code\]\s*\}/.test(t.toString()):kr=!1}}return kr}function Ao(){if(typeof document!="object"||!document)return gn.NORMAL;if(ld==null){let t=document.createElement("div"),n=t.style;t.dir="rtl",n.width="1px",n.overflow="auto",n.visibility="hidden",n.pointerEvents="none",n.position="absolute";let e=document.createElement("div"),i=e.style;i.width="2px",i.height="1px",t.appendChild(e),document.body.appendChild(t),ld=gn.NORMAL,t.scrollLeft===0&&(t.scrollLeft=1,ld=t.scrollLeft===0?gn.NEGATED:gn.INVERTED),t.remove()}return ld}function Gh(){return typeof __karma__<"u"&&!!__karma__||typeof jasmine<"u"&&!!jasmine||typeof jest<"u"&&!!jest||typeof Mocha<"u"&&!!Mocha}var Ro,DD=["color","button","checkbox","date","datetime-local","email","file","hidden","image","month","number","password","radio","range","reset","search","submit","tel","text","time","url","week"];function Wh(){if(Ro)return Ro;if(typeof document!="object"||!document)return Ro=new Set(DD),Ro;let t=document.createElement("input");return Ro=new Set(DD.filter(n=>(t.setAttribute("type",n),t.type===n))),Ro}var CD={XSmall:"(max-width: 599.98px)",Small:"(min-width: 600px) and (max-width: 959.98px)",Medium:"(min-width: 960px) and (max-width: 1279.98px)",Large:"(min-width: 1280px) and (max-width: 1919.98px)",XLarge:"(min-width: 1920px)",Handset:"(max-width: 599.98px) and (orientation: portrait), (max-width: 959.98px) and (orientation: landscape)",Tablet:"(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait), (min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)",Web:"(min-width: 840px) and (orientation: portrait), (min-width: 1280px) and (orientation: landscape)",HandsetPortrait:"(max-width: 599.98px) and (orientation: portrait)",TabletPortrait:"(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait)",WebPortrait:"(min-width: 840px) and (orientation: portrait)",HandsetLandscape:"(max-width: 959.98px) and (orientation: landscape)",TabletLandscape:"(min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)",WebLandscape:"(min-width: 1280px) and (orientation: landscape)"};var qk=new b("MATERIAL_ANIMATIONS"),xD=null;function Yh(){return d(qk,{optional:!0})?.animationsDisabled||d(Ba,{optional:!0})==="NoopAnimations"?"di-disabled":(xD??=d(To).matchMedia("(prefers-reduced-motion)").matches,xD?"reduced-motion":"enabled")}function we(){return Yh()!=="enabled"}function $e(t){return t==null?"":typeof t=="string"?t:`${t}px`}function Qn(t){return t!=null&&`${t}`!="false"}var Zt=(function(t){return t[t.FADING_IN=0]="FADING_IN",t[t.VISIBLE=1]="VISIBLE",t[t.FADING_OUT=2]="FADING_OUT",t[t.HIDDEN=3]="HIDDEN",t})(Zt||{}),qh=class{_renderer;element;config;_animationForciblyDisabledThroughCss;state=Zt.HIDDEN;constructor(n,e,i,r=!1){this._renderer=n,this.element=e,this.config=i,this._animationForciblyDisabledThroughCss=r}fadeOut(){this._renderer.fadeOutRipple(this)}},wD=So({passive:!0,capture:!0}),Zh=class{_events=new Map;addHandler(n,e,i,r){let o=this._events.get(e);if(o){let a=o.get(i);a?a.add(r):o.set(i,new Set([r]))}else this._events.set(e,new Map([[i,new Set([r])]])),n.runOutsideAngular(()=>{document.addEventListener(e,this._delegateEventHandler,wD)})}removeHandler(n,e,i){let r=this._events.get(n);if(!r)return;let o=r.get(e);o&&(o.delete(i),o.size===0&&r.delete(e),r.size===0&&(this._events.delete(n),document.removeEventListener(n,this._delegateEventHandler,wD)))}_delegateEventHandler=n=>{let e=wt(n);e&&this._events.get(n.type)?.forEach((i,r)=>{(r===e||r.contains(e))&&i.forEach(o=>o.handleEvent(n))})}},us={enterDuration:225,exitDuration:150},Zk=800,ED=So({passive:!0,capture:!0}),MD=["mousedown","touchstart"],ID=["mouseup","mouseleave","touchend","touchcancel"],Kk=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["ng-component"]],hostAttrs:["mat-ripple-style-loader",""],decls:0,vars:0,template:function(i,r){},styles:[`.mat-ripple {
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
`],encapsulation:2,changeDetection:0})}return t})(),fs=class t{_target;_ngZone;_platform;_containerElement;_triggerElement=null;_isPointerDown=!1;_activeRipples=new Map;_mostRecentTransientRipple=null;_lastTouchStartEvent;_pointerUpEventsRegistered=!1;_containerRect=null;static _eventManager=new Zh;constructor(n,e,i,r,o){this._target=n,this._ngZone=e,this._platform=r,r.isBrowser&&(this._containerElement=Ot(i)),o&&o.get(Re).load(Kk)}fadeInRipple(n,e,i={}){let r=this._containerRect=this._containerRect||this._containerElement.getBoundingClientRect(),o=w(w({},us),i.animation);i.centered&&(n=r.left+r.width/2,e=r.top+r.height/2);let a=i.radius||Qk(n,e,r),s=n-r.left,l=e-r.top,c=o.enterDuration,u=document.createElement("div");u.classList.add("mat-ripple-element"),u.style.left=`${s-a}px`,u.style.top=`${l-a}px`,u.style.height=`${a*2}px`,u.style.width=`${a*2}px`,i.color!=null&&(u.style.backgroundColor=i.color),u.style.transitionDuration=`${c}ms`,this._containerElement.appendChild(u);let f=window.getComputedStyle(u),g=f.transitionProperty,p=f.transitionDuration,v=g==="none"||p==="0s"||p==="0s, 0s"||r.width===0&&r.height===0,S=new qh(this,u,i,v);u.style.transform="scale3d(1, 1, 1)",S.state=Zt.FADING_IN,i.persistent||(this._mostRecentTransientRipple=S);let N=null;return!v&&(c||o.exitDuration)&&this._ngZone.runOutsideAngular(()=>{let z=()=>{N&&(N.fallbackTimer=null),clearTimeout(It),this._finishRippleTransition(S)},ke=()=>this._destroyRipple(S),It=setTimeout(ke,c+100);u.addEventListener("transitionend",z),u.addEventListener("transitioncancel",ke),N={onTransitionEnd:z,onTransitionCancel:ke,fallbackTimer:It}}),this._activeRipples.set(S,N),(v||!c)&&this._finishRippleTransition(S),S}fadeOutRipple(n){if(n.state===Zt.FADING_OUT||n.state===Zt.HIDDEN)return;let e=n.element,i=w(w({},us),n.config.animation);e.style.transitionDuration=`${i.exitDuration}ms`,e.style.opacity="0",n.state=Zt.FADING_OUT,(n._animationForciblyDisabledThroughCss||!i.exitDuration)&&this._finishRippleTransition(n)}fadeOutAll(){this._getActiveRipples().forEach(n=>n.fadeOut())}fadeOutAllNonPersistent(){this._getActiveRipples().forEach(n=>{n.config.persistent||n.fadeOut()})}setupTriggerEvents(n){let e=Ot(n);!this._platform.isBrowser||!e||e===this._triggerElement||(this._removeTriggerEvents(),this._triggerElement=e,MD.forEach(i=>{t._eventManager.addHandler(this._ngZone,i,e,this)}))}handleEvent(n){n.type==="mousedown"?this._onMousedown(n):n.type==="touchstart"?this._onTouchStart(n):this._onPointerUp(),this._pointerUpEventsRegistered||(this._ngZone.runOutsideAngular(()=>{ID.forEach(e=>{this._triggerElement.addEventListener(e,this,ED)})}),this._pointerUpEventsRegistered=!0)}_finishRippleTransition(n){n.state===Zt.FADING_IN?this._startFadeOutTransition(n):n.state===Zt.FADING_OUT&&this._destroyRipple(n)}_startFadeOutTransition(n){let e=n===this._mostRecentTransientRipple,{persistent:i}=n.config;n.state=Zt.VISIBLE,!i&&(!e||!this._isPointerDown)&&n.fadeOut()}_destroyRipple(n){let e=this._activeRipples.get(n)??null;this._activeRipples.delete(n),this._activeRipples.size||(this._containerRect=null),n===this._mostRecentTransientRipple&&(this._mostRecentTransientRipple=null),n.state=Zt.HIDDEN,e!==null&&(n.element.removeEventListener("transitionend",e.onTransitionEnd),n.element.removeEventListener("transitioncancel",e.onTransitionCancel),e.fallbackTimer!==null&&clearTimeout(e.fallbackTimer)),n.element.remove()}_onMousedown(n){let e=wr(n),i=this._lastTouchStartEvent&&Date.now()<this._lastTouchStartEvent+Zk;!this._target.rippleDisabled&&!e&&!i&&(this._isPointerDown=!0,this.fadeInRipple(n.clientX,n.clientY,this._target.rippleConfig))}_onTouchStart(n){if(!this._target.rippleDisabled&&!Er(n)){this._lastTouchStartEvent=Date.now(),this._isPointerDown=!0;let e=n.changedTouches;if(e)for(let i=0;i<e.length;i++)this.fadeInRipple(e[i].clientX,e[i].clientY,this._target.rippleConfig)}}_onPointerUp(){this._isPointerDown&&(this._isPointerDown=!1,this._getActiveRipples().forEach(n=>{let e=n.state===Zt.VISIBLE||n.config.terminateOnPointerUp&&n.state===Zt.FADING_IN;!n.config.persistent&&e&&n.fadeOut()}))}_getActiveRipples(){return Array.from(this._activeRipples.keys())}_removeTriggerEvents(){let n=this._triggerElement;n&&(MD.forEach(e=>t._eventManager.removeHandler(e,n,this)),this._pointerUpEventsRegistered&&(ID.forEach(e=>n.removeEventListener(e,this,ED)),this._pointerUpEventsRegistered=!1))}};function Qk(t,n,e){let i=Math.max(Math.abs(t-e.left),Math.abs(t-e.right)),r=Math.max(Math.abs(n-e.top),Math.abs(n-e.bottom));return Math.sqrt(i*i+r*r)}var Kh=new b("mat-ripple-global-options"),Oo=(()=>{class t{_elementRef=d(L);_animationsDisabled=we();color;unbounded=!1;centered=!1;radius=0;animation;get disabled(){return this._disabled}set disabled(e){e&&this.fadeOutAllNonPersistent(),this._disabled=e,this._setupTriggerEventsIfEnabled()}_disabled=!1;get trigger(){return this._trigger||this._elementRef.nativeElement}set trigger(e){this._trigger=e,this._setupTriggerEventsIfEnabled()}_trigger;_rippleRenderer;_globalOptions;_isInitialized=!1;constructor(){let e=d(A),i=d(de),r=d(Kh,{optional:!0}),o=d(G);this._globalOptions=r||{},this._rippleRenderer=new fs(this,e,this._elementRef,i,o)}ngOnInit(){this._isInitialized=!0,this._setupTriggerEventsIfEnabled()}ngOnDestroy(){this._rippleRenderer._removeTriggerEvents()}fadeOutAll(){this._rippleRenderer.fadeOutAll()}fadeOutAllNonPersistent(){this._rippleRenderer.fadeOutAllNonPersistent()}get rippleConfig(){return{centered:this.centered,radius:this.radius,color:this.color,animation:w(w(w({},this._globalOptions.animation),this._animationsDisabled?{enterDuration:0,exitDuration:0}:{}),this.animation),terminateOnPointerUp:this._globalOptions.terminateOnPointerUp}}get rippleDisabled(){return this.disabled||!!this._globalOptions.disabled}_setupTriggerEventsIfEnabled(){!this.disabled&&this._isInitialized&&this._rippleRenderer.setupTriggerEvents(this.trigger)}launch(e,i=0,r){return typeof e=="number"?this._rippleRenderer.fadeInRipple(e,i,w(w({},this.rippleConfig),r)):this._rippleRenderer.fadeInRipple(0,0,w(w({},this.rippleConfig),e))}static \u0275fac=function(i){return new(i||t)};static \u0275dir=U({type:t,selectors:[["","mat-ripple",""],["","matRipple",""]],hostAttrs:[1,"mat-ripple"],hostVars:2,hostBindings:function(i,r){i&2&&I("mat-ripple-unbounded",r.unbounded)},inputs:{color:[0,"matRippleColor","color"],unbounded:[0,"matRippleUnbounded","unbounded"],centered:[0,"matRippleCentered","centered"],radius:[0,"matRippleRadius","radius"],animation:[0,"matRippleAnimation","animation"],disabled:[0,"matRippleDisabled","disabled"],trigger:[0,"matRippleTrigger","trigger"]},exportAs:["matRipple"]})}return t})();var Xk={capture:!0},Jk=["focus","mousedown","mouseenter","touchstart"],Qh="mat-ripple-loader-uninitialized",Xh="mat-ripple-loader-class-name",SD="mat-ripple-loader-centered",dd="mat-ripple-loader-disabled",kD=(()=>{class t{_document=d(H);_animationsDisabled=we();_globalRippleOptions=d(Kh,{optional:!0});_platform=d(de);_ngZone=d(A);_injector=d(G);_eventCleanups;_hosts=new Map;constructor(){let e=d(Ge).createRenderer(null,null);this._eventCleanups=this._ngZone.runOutsideAngular(()=>Jk.map(i=>e.listen(this._document,i,this._onInteraction,Xk)))}ngOnDestroy(){let e=this._hosts.keys();for(let i of e)this.destroyRipple(i);this._eventCleanups.forEach(i=>i())}configureRipple(e,i){e.setAttribute(Qh,this._globalRippleOptions?.namespace??""),(i.className||!e.hasAttribute(Xh))&&e.setAttribute(Xh,i.className||""),i.centered&&e.setAttribute(SD,""),i.disabled&&e.setAttribute(dd,"")}setDisabled(e,i){let r=this._hosts.get(e);r?(r.target.rippleDisabled=i,!i&&!r.hasSetUpEvents&&(r.hasSetUpEvents=!0,r.renderer.setupTriggerEvents(e))):i?e.setAttribute(dd,""):e.removeAttribute(dd)}_onInteraction=e=>{let i=wt(e);if(i instanceof HTMLElement){let r=i.closest(`[${Qh}="${this._globalRippleOptions?.namespace??""}"]`);r&&this._createRipple(r)}};_createRipple(e){if(!this._document||this._hosts.has(e))return;e.querySelector(".mat-ripple")?.remove();let i=this._document.createElement("span");i.classList.add("mat-ripple",e.getAttribute(Xh)),e.append(i);let r=this._globalRippleOptions,o=this._animationsDisabled?0:r?.animation?.enterDuration??us.enterDuration,a=this._animationsDisabled?0:r?.animation?.exitDuration??us.exitDuration,s={rippleDisabled:this._animationsDisabled||r?.disabled||e.hasAttribute(dd),rippleConfig:{centered:e.hasAttribute(SD),terminateOnPointerUp:r?.terminateOnPointerUp,animation:{enterDuration:o,exitDuration:a}}},l=new fs(s,this._ngZone,i,this._platform,this._injector),c=!s.rippleDisabled;c&&l.setupTriggerEvents(e),this._hosts.set(e,{target:s,renderer:l,hasSetUpEvents:c}),e.removeAttribute(Qh)}destroyRipple(e){let i=this._hosts.get(e);i&&(i.renderer._removeTriggerEvents(),this._hosts.delete(e))}static \u0275fac=function(i){return new(i||t)};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var An=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["structural-styles"]],decls:0,vars:0,template:function(i,r){},styles:[`.mat-focus-indicator {
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
`],encapsulation:2,changeDetection:0})}return t})();var eT=["mat-icon-button",""],tT=["*"],nT=new b("MAT_BUTTON_CONFIG");function TD(t){return t==null?void 0:Di(t)}var ud=(()=>{class t{_elementRef=d(L);_ngZone=d(A);_animationsDisabled=we();_config=d(nT,{optional:!0});_focusMonitor=d(Nt);_cleanupClick;_renderer=d(Te);_rippleLoader=d(kD);_isAnchor;_isFab=!1;color;get disableRipple(){return this._disableRipple}set disableRipple(e){this._disableRipple=e,this._updateRippleDisabled()}_disableRipple=!1;get disabled(){return this._disabled}set disabled(e){this._disabled=e,this._updateRippleDisabled()}_disabled=!1;ariaDisabled;disabledInteractive;tabIndex;set _tabindex(e){this.tabIndex=e}constructor(){d(Re).load(An);let e=this._elementRef.nativeElement;this._isAnchor=e.tagName==="A",this.disabledInteractive=this._config?.disabledInteractive??!1,this.color=this._config?.color??null,this._rippleLoader?.configureRipple(e,{className:"mat-mdc-button-ripple"})}ngAfterViewInit(){this._focusMonitor.monitor(this._elementRef,!0),this._isAnchor&&this._setupAsAnchor()}ngOnDestroy(){this._cleanupClick?.(),this._focusMonitor.stopMonitoring(this._elementRef),this._rippleLoader?.destroyRipple(this._elementRef.nativeElement)}focus(e="program",i){e?this._focusMonitor.focusVia(this._elementRef.nativeElement,e,i):this._elementRef.nativeElement.focus(i)}_getAriaDisabled(){return this.ariaDisabled!=null?this.ariaDisabled:this._isAnchor?this.disabled||null:this.disabled&&this.disabledInteractive?!0:null}_getDisabledAttribute(){return this.disabledInteractive||!this.disabled?null:!0}_updateRippleDisabled(){this._rippleLoader?.setDisabled(this._elementRef.nativeElement,this.disableRipple||this.disabled)}_getTabIndex(){return this._isAnchor?this.disabled&&!this.disabledInteractive?-1:this.tabIndex:this.tabIndex}_setupAsAnchor(){this._cleanupClick=this._ngZone.runOutsideAngular(()=>this._renderer.listen(this._elementRef.nativeElement,"click",e=>{this.disabled&&(e.preventDefault(),e.stopImmediatePropagation())}))}static \u0275fac=function(i){return new(i||t)};static \u0275dir=U({type:t,hostAttrs:[1,"mat-mdc-button-base"],hostVars:13,hostBindings:function(i,r){i&2&&(P("disabled",r._getDisabledAttribute())("aria-disabled",r._getAriaDisabled())("tabindex",r._getTabIndex()),rt(r.color?"mat-"+r.color:""),I("mat-mdc-button-disabled",r.disabled)("mat-mdc-button-disabled-interactive",r.disabledInteractive)("mat-unthemed",!r.color)("_mat-animation-noopable",r._animationsDisabled))},inputs:{color:"color",disableRipple:[2,"disableRipple","disableRipple",ie],disabled:[2,"disabled","disabled",ie],ariaDisabled:[2,"aria-disabled","ariaDisabled",ie],disabledInteractive:[2,"disabledInteractive","disabledInteractive",ie],tabIndex:[2,"tabIndex","tabIndex",TD],_tabindex:[2,"tabindex","_tabindex",TD]}})}return t})(),Kt=(()=>{class t extends ud{constructor(){super(),this._rippleLoader.configureRipple(this._elementRef.nativeElement,{centered:!0})}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["button","mat-icon-button",""],["a","mat-icon-button",""],["button","matIconButton",""],["a","matIconButton",""]],hostAttrs:[1,"mdc-icon-button","mat-mdc-icon-button"],exportAs:["matButton","matAnchor"],features:[_e],attrs:eT,ngContentSelectors:tT,decls:4,vars:0,consts:[[1,"mat-mdc-button-persistent-ripple","mdc-icon-button__ripple"],[1,"mat-focus-indicator"],[1,"mat-mdc-button-touch-target"]],template:function(i,r){i&1&&(Ne(),ct(0,"span",0),ce(1),ct(2,"span",1)(3,"span",2))},styles:[`.mat-mdc-icon-button {
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
`],encapsulation:2,changeDetection:0})}return t})();var iT=new b("cdk-dir-doc",{providedIn:"root",factory:()=>d(H)}),rT=/^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;function AD(t){let n=t?.toLowerCase()||"";return n==="auto"&&typeof navigator<"u"&&navigator?.language?rT.test(navigator.language)?"rtl":"ltr":n==="rtl"?"rtl":"ltr"}var qe=(()=>{class t{get value(){return this.valueSignal()}valueSignal=x("ltr");change=new F;constructor(){let e=d(iT,{optional:!0});if(e){let i=e.body?e.body.dir:null,r=e.documentElement?e.documentElement.dir:null;this.valueSignal.set(AD(i||r||"ltr"))}}ngOnDestroy(){this.change.complete()}static \u0275fac=function(i){return new(i||t)};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var ye=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=Z({type:t});static \u0275inj=q({})}return t})();var No=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=Z({type:t});static \u0275inj=q({imports:[ye]})}return t})();var oT=["matButton",""],OD=[[["",8,"material-icons",3,"iconPositionEnd",""],["mat-icon",3,"iconPositionEnd",""],["","matButtonIcon","",3,"iconPositionEnd",""]],"*",[["","iconPositionEnd","",8,"material-icons"],["mat-icon","iconPositionEnd",""],["","matButtonIcon","","iconPositionEnd",""]]],ND=[".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd]), [matButtonIcon]:not([iconPositionEnd])","*",".material-icons[iconPositionEnd], mat-icon[iconPositionEnd], [matButtonIcon][iconPositionEnd]"],aT=["mat-fab",""];var RD=new Map([["text",["mat-mdc-button"]],["filled",["mdc-button--unelevated","mat-mdc-unelevated-button"]],["elevated",["mdc-button--raised","mat-mdc-raised-button"]],["outlined",["mdc-button--outlined","mat-mdc-outlined-button"]],["tonal",["mat-tonal-button"]]]),_n=(()=>{class t extends ud{get appearance(){return this._appearance}set appearance(e){this.setAppearance(e||this._config?.defaultAppearance||"text")}_appearance=null;constructor(){super();let e=sT(this._elementRef.nativeElement);e&&this.setAppearance(e)}setAppearance(e){if(e===this._appearance)return;let i=this._elementRef.nativeElement.classList,r=this._appearance?RD.get(this._appearance):null,o=RD.get(e);r&&i.remove(...r),i.add(...o),this._appearance=e}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["button","matButton",""],["a","matButton",""],["button","mat-button",""],["button","mat-raised-button",""],["button","mat-flat-button",""],["button","mat-stroked-button",""],["a","mat-button",""],["a","mat-raised-button",""],["a","mat-flat-button",""],["a","mat-stroked-button",""]],hostAttrs:[1,"mdc-button"],inputs:{appearance:[0,"matButton","appearance"]},exportAs:["matButton","matAnchor"],features:[_e],attrs:oT,ngContentSelectors:ND,decls:7,vars:4,consts:[[1,"mat-mdc-button-persistent-ripple"],[1,"mdc-button__label"],[1,"mat-focus-indicator"],[1,"mat-mdc-button-touch-target"]],template:function(i,r){i&1&&(Ne(OD),ct(0,"span",0),ce(1),Ae(2,"span",1),ce(3,1),Ve(),ce(4,2),ct(5,"span",2)(6,"span",3)),i&2&&I("mdc-button__ripple",!r._isFab)("mdc-fab__ripple",r._isFab)},styles:[`.mat-mdc-button-base {
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
`],encapsulation:2,changeDetection:0})}return t})();function sT(t){return t.hasAttribute("mat-raised-button")?"elevated":t.hasAttribute("mat-stroked-button")?"outlined":t.hasAttribute("mat-flat-button")?"filled":t.hasAttribute("mat-button")?"text":null}var lT=new b("mat-mdc-fab-default-options",{providedIn:"root",factory:()=>Jh}),Jh={color:"accent"},FD=(()=>{class t extends ud{_options=d(lT,{optional:!0});_isFab=!0;extended=!1;constructor(){super(),this._options=this._options||Jh,this.color=this._options.color||Jh.color}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["button","mat-fab",""],["a","mat-fab",""],["button","matFab",""],["a","matFab",""]],hostAttrs:[1,"mdc-fab","mat-mdc-fab-base","mat-mdc-fab"],hostVars:4,hostBindings:function(i,r){i&2&&I("mdc-fab--extended",r.extended)("mat-mdc-extended-fab",r.extended)},inputs:{extended:[2,"extended","extended",ie]},exportAs:["matButton","matAnchor"],features:[_e],attrs:aT,ngContentSelectors:ND,decls:7,vars:4,consts:[[1,"mat-mdc-button-persistent-ripple"],[1,"mdc-button__label"],[1,"mat-focus-indicator"],[1,"mat-mdc-button-touch-target"]],template:function(i,r){i&1&&(Ne(OD),ct(0,"span",0),ce(1),Ae(2,"span",1),ce(3,1),Ve(),ce(4,2),ct(5,"span",2)(6,"span",3)),i&2&&I("mdc-button__ripple",!r._isFab)("mdc-fab__ripple",r._isFab)},styles:[`.mat-mdc-fab-base {
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
`],encapsulation:2,changeDetection:0})}return t})();var Ft=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=Z({type:t});static \u0275inj=q({imports:[No,ye]})}return t})();var cT=20,Si=(()=>{class t{_ngZone=d(A);_platform=d(de);_renderer=d(Ge).createRenderer(null,null);_cleanupGlobalListener;constructor(){}_scrolled=new E;_scrolledCount=0;scrollContainers=new Map;register(e){this.scrollContainers.has(e)||this.scrollContainers.set(e,e.elementScrolled().subscribe(()=>this._scrolled.next(e)))}deregister(e){let i=this.scrollContainers.get(e);i&&(i.unsubscribe(),this.scrollContainers.delete(e))}scrolled(e=cT){return this._platform.isBrowser?new le(i=>{this._cleanupGlobalListener||(this._cleanupGlobalListener=this._ngZone.runOutsideAngular(()=>this._renderer.listen("document","scroll",()=>this._scrolled.next())));let r=e>0?this._scrolled.pipe(hl(e)).subscribe(i):this._scrolled.subscribe(i);return this._scrolledCount++,()=>{r.unsubscribe(),this._scrolledCount--,this._scrolledCount||(this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0)}}):Pe()}ngOnDestroy(){this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0,this.scrollContainers.forEach((e,i)=>this.deregister(i)),this._scrolled.complete()}ancestorScrolled(e,i){let r=this.getAncestorScrollContainers(e);return this.scrolled(i).pipe(Le(o=>!o||r.indexOf(o)>-1))}getAncestorScrollContainers(e){let i=[];return this.scrollContainers.forEach((r,o)=>{this._scrollableContainsElement(o,e)&&i.push(o)}),i}_scrollableContainsElement(e,i){let r=Ot(i),o=e.getElementRef().nativeElement;do if(r==o)return!0;while(r=r.parentElement);return!1}static \u0275fac=function(i){return new(i||t)};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),ep=(()=>{class t{elementRef=d(L);scrollDispatcher=d(Si);ngZone=d(A);dir=d(qe,{optional:!0});_scrollElement=this.elementRef.nativeElement;_destroyed=new E;_renderer=d(Te);_cleanupScroll;_elementScrolled=new E;constructor(){}ngOnInit(){this._cleanupScroll=this.ngZone.runOutsideAngular(()=>this._renderer.listen(this._scrollElement,"scroll",e=>this._elementScrolled.next(e))),this.scrollDispatcher.register(this)}ngOnDestroy(){this._cleanupScroll?.(),this._elementScrolled.complete(),this.scrollDispatcher.deregister(this),this._destroyed.next(),this._destroyed.complete()}elementScrolled(){return this._elementScrolled}getElementRef(){return this.elementRef}scrollTo(e){let i=this.elementRef.nativeElement,r=this.dir&&this.dir.value=="rtl";e.left==null&&(e.left=r?e.end:e.start),e.right==null&&(e.right=r?e.start:e.end),e.bottom!=null&&(e.top=i.scrollHeight-i.clientHeight-e.bottom),r&&Ao()!=gn.NORMAL?(e.left!=null&&(e.right=i.scrollWidth-i.clientWidth-e.left),Ao()==gn.INVERTED?e.left=e.right:Ao()==gn.NEGATED&&(e.left=e.right?-e.right:e.right)):e.right!=null&&(e.left=i.scrollWidth-i.clientWidth-e.right),this._applyScrollToOptions(e)}_applyScrollToOptions(e){let i=this.elementRef.nativeElement;cd()?i.scrollTo(e):(e.top!=null&&(i.scrollTop=e.top),e.left!=null&&(i.scrollLeft=e.left))}measureScrollOffset(e){let i="left",r="right",o=this.elementRef.nativeElement;if(e=="top")return o.scrollTop;if(e=="bottom")return o.scrollHeight-o.clientHeight-o.scrollTop;let a=this.dir&&this.dir.value=="rtl";return e=="start"?e=a?r:i:e=="end"&&(e=a?i:r),a&&Ao()==gn.INVERTED?e==i?o.scrollWidth-o.clientWidth-o.scrollLeft:o.scrollLeft:a&&Ao()==gn.NEGATED?e==i?o.scrollLeft+o.scrollWidth-o.clientWidth:-o.scrollLeft:e==i?o.scrollLeft:o.scrollWidth-o.clientWidth-o.scrollLeft}static \u0275fac=function(i){return new(i||t)};static \u0275dir=U({type:t,selectors:[["","cdk-scrollable",""],["","cdkScrollable",""]]})}return t})(),dT=20,Tr=(()=>{class t{_platform=d(de);_listeners;_viewportSize=null;_change=new E;_document=d(H);constructor(){let e=d(A),i=d(Ge).createRenderer(null,null);e.runOutsideAngular(()=>{if(this._platform.isBrowser){let r=o=>this._change.next(o);this._listeners=[i.listen("window","resize",r),i.listen("window","orientationchange",r)]}this.change().subscribe(()=>this._viewportSize=null)})}ngOnDestroy(){this._listeners?.forEach(e=>e()),this._change.complete()}getViewportSize(){this._viewportSize||this._updateViewportSize();let e={width:this._viewportSize.width,height:this._viewportSize.height};return this._platform.isBrowser||(this._viewportSize=null),e}getViewportRect(){let e=this.getViewportScrollPosition(),{width:i,height:r}=this.getViewportSize();return{top:e.top,left:e.left,bottom:e.top+r,right:e.left+i,height:r,width:i}}getViewportScrollPosition(){if(!this._platform.isBrowser)return{top:0,left:0};let e=this._document,i=this._getWindow(),r=e.documentElement,o=r.getBoundingClientRect(),a=-o.top||e.body?.scrollTop||i.scrollY||r.scrollTop||0,s=-o.left||e.body?.scrollLeft||i.scrollX||r.scrollLeft||0;return{top:a,left:s}}change(e=dT){return e>0?this._change.pipe(hl(e)):this._change}_getWindow(){return this._document.defaultView||window}_updateViewportSize(){let e=this._getWindow();this._viewportSize=this._platform.isBrowser?{width:e.innerWidth,height:e.innerHeight}:{width:0,height:0}}static \u0275fac=function(i){return new(i||t)};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Xn=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=Z({type:t});static \u0275inj=q({})}return t})(),tp=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=Z({type:t});static \u0275inj=q({imports:[ye,Xn,ye,Xn]})}return t})();var hs=class{_attachedHost=null;attach(n){return this._attachedHost=n,n.attach(this)}detach(){let n=this._attachedHost;n!=null&&(this._attachedHost=null,n.detach())}get isAttached(){return this._attachedHost!=null}setAttachedHost(n){this._attachedHost=n}},Pt=class extends hs{component;viewContainerRef;injector;projectableNodes;bindings;constructor(n,e,i,r,o){super(),this.component=n,this.viewContainerRef=e,this.injector=i,this.projectableNodes=r,this.bindings=o||null}},bn=class extends hs{templateRef;viewContainerRef;context;injector;constructor(n,e,i,r){super(),this.templateRef=n,this.viewContainerRef=e,this.context=i,this.injector=r}get origin(){return this.templateRef.elementRef}attach(n,e=this.context){return this.context=e,super.attach(n)}detach(){return this.context=void 0,super.detach()}},np=class extends hs{element;constructor(n){super(),this.element=n instanceof L?n.nativeElement:n}},ki=class{_attachedPortal=null;_disposeFn=null;_isDisposed=!1;hasAttached(){return!!this._attachedPortal}attach(n){if(n instanceof Pt)return this._attachedPortal=n,this.attachComponentPortal(n);if(n instanceof bn)return this._attachedPortal=n,this.attachTemplatePortal(n);if(this.attachDomPortal&&n instanceof np)return this._attachedPortal=n,this.attachDomPortal(n)}attachDomPortal=null;detach(){this._attachedPortal&&(this._attachedPortal.setAttachedHost(null),this._attachedPortal=null),this._invokeDisposeFn()}dispose(){this.hasAttached()&&this.detach(),this._invokeDisposeFn(),this._isDisposed=!0}setDisposeFn(n){this._disposeFn=n}_invokeDisposeFn(){this._disposeFn&&(this._disposeFn(),this._disposeFn=null)}},ps=class extends ki{outletElement;_appRef;_defaultInjector;constructor(n,e,i){super(),this.outletElement=n,this._appRef=e,this._defaultInjector=i}attachComponentPortal(n){let e;if(n.viewContainerRef){let i=n.injector||n.viewContainerRef.injector,r=i.get(_i,null,{optional:!0})||void 0;e=n.viewContainerRef.createComponent(n.component,{index:n.viewContainerRef.length,injector:i,ngModuleRef:r,projectableNodes:n.projectableNodes||void 0,bindings:n.bindings||void 0}),this.setDisposeFn(()=>e.destroy())}else{let i=this._appRef,r=n.injector||this._defaultInjector||G.NULL,o=r.get(Ue,i.injector);e=Pc(n.component,{elementInjector:r,environmentInjector:o,projectableNodes:n.projectableNodes||void 0,bindings:n.bindings||void 0}),i.attachView(e.hostView),this.setDisposeFn(()=>{i.viewCount>0&&i.detachView(e.hostView),e.destroy()})}return this.outletElement.appendChild(this._getComponentRootNode(e)),this._attachedPortal=n,e}attachTemplatePortal(n){let e=n.viewContainerRef,i=e.createEmbeddedView(n.templateRef,n.context,{injector:n.injector});return i.rootNodes.forEach(r=>this.outletElement.appendChild(r)),i.detectChanges(),this.setDisposeFn(()=>{let r=e.indexOf(i);r!==-1&&e.remove(r)}),this._attachedPortal=n,i}attachDomPortal=n=>{let e=n.element;e.parentNode;let i=this.outletElement.ownerDocument.createComment("dom-portal");e.parentNode.insertBefore(i,e),this.outletElement.appendChild(e),this._attachedPortal=n,super.setDisposeFn(()=>{i.parentNode&&i.parentNode.replaceChild(e,i)})};dispose(){super.dispose(),this.outletElement.remove()}_getComponentRootNode(n){return n.hostView.rootNodes[0]}};var vn=(()=>{class t extends ki{_moduleRef=d(_i,{optional:!0});_document=d(H);_viewContainerRef=d(_t);_isInitialized=!1;_attachedRef=null;constructor(){super()}get portal(){return this._attachedPortal}set portal(e){this.hasAttached()&&!e&&!this._isInitialized||(this.hasAttached()&&super.detach(),e&&super.attach(e),this._attachedPortal=e||null)}attached=new F;get attachedRef(){return this._attachedRef}ngOnInit(){this._isInitialized=!0}ngOnDestroy(){super.dispose(),this._attachedRef=this._attachedPortal=null}attachComponentPortal(e){e.setAttachedHost(this);let i=e.viewContainerRef!=null?e.viewContainerRef:this._viewContainerRef,r=i.createComponent(e.component,{index:i.length,injector:e.injector||i.injector,projectableNodes:e.projectableNodes||void 0,ngModuleRef:this._moduleRef||void 0,bindings:e.bindings||void 0});return i!==this._viewContainerRef&&this._getRootNode().appendChild(r.hostView.rootNodes[0]),super.setDisposeFn(()=>r.destroy()),this._attachedPortal=e,this._attachedRef=r,this.attached.emit(r),r}attachTemplatePortal(e){e.setAttachedHost(this);let i=this._viewContainerRef.createEmbeddedView(e.templateRef,e.context,{injector:e.injector});return super.setDisposeFn(()=>this._viewContainerRef.clear()),this._attachedPortal=e,this._attachedRef=i,this.attached.emit(i),i}attachDomPortal=e=>{let i=e.element;i.parentNode;let r=this._document.createComment("dom-portal");e.setAttachedHost(this),i.parentNode.insertBefore(r,i),this._getRootNode().appendChild(i),this._attachedPortal=e,super.setDisposeFn(()=>{r.parentNode&&r.parentNode.replaceChild(i,r)})};_getRootNode(){let e=this._viewContainerRef.element.nativeElement;return e.nodeType===e.ELEMENT_NODE?e:e.parentNode}static \u0275fac=function(i){return new(i||t)};static \u0275dir=U({type:t,selectors:[["","cdkPortalOutlet",""]],inputs:{portal:[0,"cdkPortalOutlet","portal"]},outputs:{attached:"attached"},exportAs:["cdkPortalOutlet"],features:[_e]})}return t})(),Rn=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=Z({type:t});static \u0275inj=q({})}return t})();var PD=cd();function Rr(t){return new fd(t.get(Tr),t.get(H))}var fd=class{_viewportRuler;_previousHTMLStyles={top:"",left:""};_previousScrollPosition;_isEnabled=!1;_document;constructor(n,e){this._viewportRuler=n,this._document=e}attach(){}enable(){if(this._canBeEnabled()){let n=this._document.documentElement;this._previousScrollPosition=this._viewportRuler.getViewportScrollPosition(),this._previousHTMLStyles.left=n.style.left||"",this._previousHTMLStyles.top=n.style.top||"",n.style.left=$e(-this._previousScrollPosition.left),n.style.top=$e(-this._previousScrollPosition.top),n.classList.add("cdk-global-scrollblock"),this._isEnabled=!0}}disable(){if(this._isEnabled){let n=this._document.documentElement,e=this._document.body,i=n.style,r=e.style,o=i.scrollBehavior||"",a=r.scrollBehavior||"";this._isEnabled=!1,i.left=this._previousHTMLStyles.left,i.top=this._previousHTMLStyles.top,n.classList.remove("cdk-global-scrollblock"),PD&&(i.scrollBehavior=r.scrollBehavior="auto"),window.scroll(this._previousScrollPosition.left,this._previousScrollPosition.top),PD&&(i.scrollBehavior=o,r.scrollBehavior=a)}}_canBeEnabled(){if(this._document.documentElement.classList.contains("cdk-global-scrollblock")||this._isEnabled)return!1;let e=this._document.documentElement,i=this._viewportRuler.getViewportSize();return e.scrollHeight>i.height||e.scrollWidth>i.width}};function zD(t,n){return new md(t.get(Si),t.get(A),t.get(Tr),n)}var md=class{_scrollDispatcher;_ngZone;_viewportRuler;_config;_scrollSubscription=null;_overlayRef;_initialScrollPosition;constructor(n,e,i,r){this._scrollDispatcher=n,this._ngZone=e,this._viewportRuler=i,this._config=r}attach(n){this._overlayRef,this._overlayRef=n}enable(){if(this._scrollSubscription)return;let n=this._scrollDispatcher.scrolled(0).pipe(Le(e=>!e||!this._overlayRef.overlayElement.contains(e.getElementRef().nativeElement)));this._config&&this._config.threshold&&this._config.threshold>1?(this._initialScrollPosition=this._viewportRuler.getViewportScrollPosition().top,this._scrollSubscription=n.subscribe(()=>{let e=this._viewportRuler.getViewportScrollPosition().top;Math.abs(e-this._initialScrollPosition)>this._config.threshold?this._detach():this._overlayRef.updatePosition()})):this._scrollSubscription=n.subscribe(this._detach)}disable(){this._scrollSubscription&&(this._scrollSubscription.unsubscribe(),this._scrollSubscription=null)}detach(){this.disable(),this._overlayRef=null}_detach=()=>{this.disable(),this._overlayRef.hasAttached()&&this._ngZone.run(()=>this._overlayRef.detach())}};var gs=class{enable(){}disable(){}attach(){}};function ip(t,n){return n.some(e=>{let i=t.bottom<e.top,r=t.top>e.bottom,o=t.right<e.left,a=t.left>e.right;return i||r||o||a})}function LD(t,n){return n.some(e=>{let i=t.top<e.top,r=t.bottom>e.bottom,o=t.left<e.left,a=t.right>e.right;return i||r||o||a})}function Or(t,n){return new hd(t.get(Si),t.get(Tr),t.get(A),n)}var hd=class{_scrollDispatcher;_viewportRuler;_ngZone;_config;_scrollSubscription=null;_overlayRef;constructor(n,e,i,r){this._scrollDispatcher=n,this._viewportRuler=e,this._ngZone=i,this._config=r}attach(n){this._overlayRef,this._overlayRef=n}enable(){if(!this._scrollSubscription){let n=this._config?this._config.scrollThrottle:0;this._scrollSubscription=this._scrollDispatcher.scrolled(n).subscribe(()=>{if(this._overlayRef.updatePosition(),this._config&&this._config.autoClose){let e=this._overlayRef.overlayElement.getBoundingClientRect(),{width:i,height:r}=this._viewportRuler.getViewportSize();ip(e,[{width:i,height:r,bottom:r,right:i,top:0,left:0}])&&(this.disable(),this._ngZone.run(()=>this._overlayRef.detach()))}})}}disable(){this._scrollSubscription&&(this._scrollSubscription.unsubscribe(),this._scrollSubscription=null)}detach(){this.disable(),this._overlayRef=null}},$D=(()=>{class t{_injector=d(G);constructor(){}noop=()=>new gs;close=e=>zD(this._injector,e);block=()=>Rr(this._injector);reposition=e=>Or(this._injector,e);static \u0275fac=function(i){return new(i||t)};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),yn=class{positionStrategy;scrollStrategy=new gs;panelClass="";hasBackdrop=!1;backdropClass="cdk-overlay-dark-backdrop";disableAnimations;width;height;minWidth;minHeight;maxWidth;maxHeight;direction;disposeOnNavigation=!1;usePopover;eventPredicate;constructor(n){if(n){let e=Object.keys(n);for(let i of e)n[i]!==void 0&&(this[i]=n[i])}}};var pd=class{connectionPair;scrollableViewProperties;constructor(n,e){this.connectionPair=n,this.scrollableViewProperties=e}};var GD=(()=>{class t{_attachedOverlays=[];_document=d(H);_isAttached=!1;constructor(){}ngOnDestroy(){this.detach()}add(e){this.remove(e),this._attachedOverlays.push(e)}remove(e){let i=this._attachedOverlays.indexOf(e);i>-1&&this._attachedOverlays.splice(i,1),this._attachedOverlays.length===0&&this.detach()}canReceiveEvent(e,i,r){return r.observers.length<1?!1:e.eventPredicate?e.eventPredicate(i):!0}static \u0275fac=function(i){return new(i||t)};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),WD=(()=>{class t extends GD{_ngZone=d(A);_renderer=d(Ge).createRenderer(null,null);_cleanupKeydown;add(e){super.add(e),this._isAttached||(this._ngZone.runOutsideAngular(()=>{this._cleanupKeydown=this._renderer.listen("body","keydown",this._keydownListener)}),this._isAttached=!0)}detach(){this._isAttached&&(this._cleanupKeydown?.(),this._isAttached=!1)}_keydownListener=e=>{let i=this._attachedOverlays;for(let r=i.length-1;r>-1;r--){let o=i[r];if(this.canReceiveEvent(o,e,o._keydownEvents)){this._ngZone.run(()=>o._keydownEvents.next(e));break}}};static \u0275fac=(()=>{let e;return function(r){return(e||(e=Rt(t)))(r||t)}})();static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),YD=(()=>{class t extends GD{_platform=d(de);_ngZone=d(A);_renderer=d(Ge).createRenderer(null,null);_cursorOriginalValue;_cursorStyleIsSet=!1;_pointerDownEventTarget=null;_cleanups;add(e){if(super.add(e),!this._isAttached){let i=this._document.body,r={capture:!0},o=this._renderer;this._cleanups=this._ngZone.runOutsideAngular(()=>[o.listen(i,"pointerdown",this._pointerDownListener,r),o.listen(i,"click",this._clickListener,r),o.listen(i,"auxclick",this._clickListener,r),o.listen(i,"contextmenu",this._clickListener,r)]),this._platform.IOS&&!this._cursorStyleIsSet&&(this._cursorOriginalValue=i.style.cursor,i.style.cursor="pointer",this._cursorStyleIsSet=!0),this._isAttached=!0}}detach(){this._isAttached&&(this._cleanups?.forEach(e=>e()),this._cleanups=void 0,this._platform.IOS&&this._cursorStyleIsSet&&(this._document.body.style.cursor=this._cursorOriginalValue,this._cursorStyleIsSet=!1),this._isAttached=!1)}_pointerDownListener=e=>{this._pointerDownEventTarget=wt(e)};_clickListener=e=>{let i=wt(e),r=e.type==="click"&&this._pointerDownEventTarget?this._pointerDownEventTarget:i;this._pointerDownEventTarget=null;let o=this._attachedOverlays.slice();for(let a=o.length-1;a>-1;a--){let s=o[a],l=s._outsidePointerEvents;if(!(!s.hasAttached()||!this.canReceiveEvent(s,e,l))){if(VD(s.overlayElement,i)||VD(s.overlayElement,r))break;this._ngZone?this._ngZone.run(()=>l.next(e)):l.next(e)}}};static \u0275fac=(()=>{let e;return function(r){return(e||(e=Rt(t)))(r||t)}})();static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function VD(t,n){let e=typeof ShadowRoot<"u"&&ShadowRoot,i=n;for(;i;){if(i===t)return!0;i=e&&i instanceof ShadowRoot?i.host:i.parentNode}return!1}var qD=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["ng-component"]],hostAttrs:["cdk-overlay-style-loader",""],decls:0,vars:0,template:function(i,r){},styles:[`.cdk-overlay-container, .cdk-global-overlay-wrapper {
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
`],encapsulation:2,changeDetection:0})}return t})(),_d=(()=>{class t{_platform=d(de);_containerElement;_document=d(H);_styleLoader=d(Re);constructor(){}ngOnDestroy(){this._containerElement?.remove()}getContainerElement(){return this._loadStyles(),this._containerElement||this._createContainer(),this._containerElement}_createContainer(){let e="cdk-overlay-container";if(this._platform.isBrowser||Gh()){let r=this._document.querySelectorAll(`.${e}[platform="server"], .${e}[platform="test"]`);for(let o=0;o<r.length;o++)r[o].remove()}let i=this._document.createElement("div");i.classList.add(e),Gh()?i.setAttribute("platform","test"):this._platform.isBrowser||i.setAttribute("platform","server"),this._document.body.appendChild(i),this._containerElement=i}_loadStyles(){this._styleLoader.load(qD)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),rp=class{_renderer;_ngZone;element;_cleanupClick;_cleanupTransitionEnd;_fallbackTimeout;constructor(n,e,i,r){this._renderer=e,this._ngZone=i,this.element=n.createElement("div"),this.element.classList.add("cdk-overlay-backdrop"),this._cleanupClick=e.listen(this.element,"click",r)}detach(){this._ngZone.runOutsideAngular(()=>{let n=this.element;clearTimeout(this._fallbackTimeout),this._cleanupTransitionEnd?.(),this._cleanupTransitionEnd=this._renderer.listen(n,"transitionend",this.dispose),this._fallbackTimeout=setTimeout(this.dispose,500),n.style.pointerEvents="none",n.classList.remove("cdk-overlay-backdrop-showing")})}dispose=()=>{clearTimeout(this._fallbackTimeout),this._cleanupClick?.(),this._cleanupTransitionEnd?.(),this._cleanupClick=this._cleanupTransitionEnd=this._fallbackTimeout=void 0,this.element.remove()}};function op(t){return t&&t.nodeType===1}var Fo=class{_portalOutlet;_host;_pane;_config;_ngZone;_keyboardDispatcher;_document;_location;_outsideClickDispatcher;_animationsDisabled;_injector;_renderer;_backdropClick=new E;_attachments=new E;_detachments=new E;_positionStrategy;_scrollStrategy;_locationChanges=ue.EMPTY;_backdropRef=null;_detachContentMutationObserver;_detachContentAfterRenderRef;_disposed=!1;_previousHostParent;_keydownEvents=new E;_outsidePointerEvents=new E;_afterNextRenderRef;constructor(n,e,i,r,o,a,s,l,c,u=!1,f,g){this._portalOutlet=n,this._host=e,this._pane=i,this._config=r,this._ngZone=o,this._keyboardDispatcher=a,this._document=s,this._location=l,this._outsideClickDispatcher=c,this._animationsDisabled=u,this._injector=f,this._renderer=g,r.scrollStrategy&&(this._scrollStrategy=r.scrollStrategy,this._scrollStrategy.attach(this)),this._positionStrategy=r.positionStrategy}get overlayElement(){return this._pane}get backdropElement(){return this._backdropRef?.element||null}get hostElement(){return this._host}get eventPredicate(){return this._config?.eventPredicate||null}attach(n){if(this._disposed)return null;this._attachHost();let e=this._portalOutlet.attach(n);return this._positionStrategy?.attach(this),this._updateStackingOrder(),this._updateElementSize(),this._updateElementDirection(),this._scrollStrategy&&this._scrollStrategy.enable(),this._afterNextRenderRef?.destroy(),this._afterNextRenderRef=Ye(()=>{this.hasAttached()&&this.updatePosition()},{injector:this._injector}),this._togglePointerEvents(!0),this._config.hasBackdrop&&this._attachBackdrop(),this._config.panelClass&&this._toggleClasses(this._pane,this._config.panelClass,!0),this._attachments.next(),this._completeDetachContent(),this._keyboardDispatcher.add(this),this._config.disposeOnNavigation&&(this._locationChanges=this._location.subscribe(()=>this.dispose())),this._outsideClickDispatcher.add(this),typeof e?.onDestroy=="function"&&e.onDestroy(()=>{this.hasAttached()&&this._ngZone.runOutsideAngular(()=>Promise.resolve().then(()=>this.detach()))}),e}detach(){if(!this.hasAttached())return;this.detachBackdrop(),this._togglePointerEvents(!1),this._positionStrategy&&this._positionStrategy.detach&&this._positionStrategy.detach(),this._scrollStrategy&&this._scrollStrategy.disable();let n=this._portalOutlet.detach();return this._detachments.next(),this._completeDetachContent(),this._keyboardDispatcher.remove(this),this._detachContentWhenEmpty(),this._locationChanges.unsubscribe(),this._outsideClickDispatcher.remove(this),n}dispose(){if(this._disposed)return;let n=this.hasAttached();this._positionStrategy&&this._positionStrategy.dispose(),this._disposeScrollStrategy(),this._backdropRef?.dispose(),this._locationChanges.unsubscribe(),this._keyboardDispatcher.remove(this),this._portalOutlet.dispose(),this._attachments.complete(),this._backdropClick.complete(),this._keydownEvents.complete(),this._outsidePointerEvents.complete(),this._outsideClickDispatcher.remove(this),this._host?.remove(),this._afterNextRenderRef?.destroy(),this._previousHostParent=this._pane=this._host=this._backdropRef=null,n&&this._detachments.next(),this._detachments.complete(),this._completeDetachContent(),this._disposed=!0}hasAttached(){return this._portalOutlet.hasAttached()}backdropClick(){return this._backdropClick}attachments(){return this._attachments}detachments(){return this._detachments}keydownEvents(){return this._keydownEvents}outsidePointerEvents(){return this._outsidePointerEvents}getConfig(){return this._config}updatePosition(){this._positionStrategy&&this._positionStrategy.apply()}updatePositionStrategy(n){n!==this._positionStrategy&&(this._positionStrategy&&this._positionStrategy.dispose(),this._positionStrategy=n,this.hasAttached()&&(n.attach(this),this.updatePosition()))}updateSize(n){this._config=w(w({},this._config),n),this._updateElementSize()}setDirection(n){this._config=ae(w({},this._config),{direction:n}),this._updateElementDirection()}addPanelClass(n){this._pane&&this._toggleClasses(this._pane,n,!0)}removePanelClass(n){this._pane&&this._toggleClasses(this._pane,n,!1)}getDirection(){let n=this._config.direction;return n?typeof n=="string"?n:n.value:"ltr"}updateScrollStrategy(n){n!==this._scrollStrategy&&(this._disposeScrollStrategy(),this._scrollStrategy=n,this.hasAttached()&&(n.attach(this),n.enable()))}_updateElementDirection(){this._host.setAttribute("dir",this.getDirection())}_updateElementSize(){if(!this._pane)return;let n=this._pane.style;n.width=$e(this._config.width),n.height=$e(this._config.height),n.minWidth=$e(this._config.minWidth),n.minHeight=$e(this._config.minHeight),n.maxWidth=$e(this._config.maxWidth),n.maxHeight=$e(this._config.maxHeight)}_togglePointerEvents(n){this._pane.style.pointerEvents=n?"":"none"}_attachHost(){if(!this._host.parentElement){let n=this._config.usePopover?this._positionStrategy?.getPopoverInsertionPoint?.():null;op(n)?n.after(this._host):n?.type==="parent"?n.element.appendChild(this._host):this._previousHostParent?.appendChild(this._host)}if(this._config.usePopover)try{this._host.showPopover()}catch{}}_attachBackdrop(){let n="cdk-overlay-backdrop-showing";this._backdropRef?.dispose(),this._backdropRef=new rp(this._document,this._renderer,this._ngZone,e=>{this._backdropClick.next(e)}),this._animationsDisabled&&this._backdropRef.element.classList.add("cdk-overlay-backdrop-noop-animation"),this._config.backdropClass&&this._toggleClasses(this._backdropRef.element,this._config.backdropClass,!0),this._config.usePopover?this._host.prepend(this._backdropRef.element):this._host.parentElement.insertBefore(this._backdropRef.element,this._host),!this._animationsDisabled&&typeof requestAnimationFrame<"u"?this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>this._backdropRef?.element.classList.add(n))}):this._backdropRef.element.classList.add(n)}_updateStackingOrder(){!this._config.usePopover&&this._host.nextSibling&&this._host.parentNode.appendChild(this._host)}detachBackdrop(){this._animationsDisabled?(this._backdropRef?.dispose(),this._backdropRef=null):this._backdropRef?.detach()}_toggleClasses(n,e,i){let r=ko(e||[]).filter(o=>!!o);r.length&&(i?n.classList.add(...r):n.classList.remove(...r))}_detachContentWhenEmpty(){let n=!1;try{this._detachContentAfterRenderRef=Ye(()=>{n=!0,this._detachContent()},{injector:this._injector})}catch(e){if(n)throw e;this._detachContent()}globalThis.MutationObserver&&this._pane&&(this._detachContentMutationObserver||=new globalThis.MutationObserver(()=>{this._detachContent()}),this._detachContentMutationObserver.observe(this._pane,{childList:!0}))}_detachContent(){(!this._pane||!this._host||this._pane.children.length===0)&&(this._pane&&this._config.panelClass&&this._toggleClasses(this._pane,this._config.panelClass,!1),this._host&&this._host.parentElement&&(this._previousHostParent=this._host.parentElement,this._host.remove()),this._completeDetachContent())}_completeDetachContent(){this._detachContentAfterRenderRef?.destroy(),this._detachContentAfterRenderRef=void 0,this._detachContentMutationObserver?.disconnect()}_disposeScrollStrategy(){let n=this._scrollStrategy;n?.disable(),n?.detach?.()}},BD="cdk-overlay-connected-position-bounding-box",fT=/([A-Za-z%]+)$/;function Nr(t,n){return new _s(n,t.get(Tr),t.get(H),t.get(de),t.get(_d))}var _s=class{_viewportRuler;_document;_platform;_overlayContainer;_overlayRef;_isInitialRender=!1;_lastBoundingBoxSize={width:0,height:0};_isPushed=!1;_canPush=!0;_growAfterOpen=!1;_hasFlexibleDimensions=!0;_positionLocked=!1;_originRect;_overlayRect;_viewportRect;_containerRect;_viewportMargin=0;_scrollables=[];_preferredPositions=[];_origin;_pane;_isDisposed=!1;_boundingBox=null;_lastPosition=null;_lastScrollVisibility=null;_positionChanges=new E;_resizeSubscription=ue.EMPTY;_offsetX=0;_offsetY=0;_transformOriginSelector;_appliedPanelClasses=[];_previousPushAmount=null;_popoverLocation="global";positionChanges=this._positionChanges;get positions(){return this._preferredPositions}constructor(n,e,i,r,o){this._viewportRuler=e,this._document=i,this._platform=r,this._overlayContainer=o,this.setOrigin(n)}attach(n){this._overlayRef&&this._overlayRef,this._validatePositions(),n.hostElement.classList.add(BD),this._overlayRef=n,this._boundingBox=n.hostElement,this._pane=n.overlayElement,this._isDisposed=!1,this._isInitialRender=!0,this._lastPosition=null,this._resizeSubscription.unsubscribe(),this._resizeSubscription=this._viewportRuler.change().subscribe(()=>{this._isInitialRender=!0,this.apply()})}apply(){if(this._isDisposed||!this._platform.isBrowser)return;if(!this._isInitialRender&&this._positionLocked&&this._lastPosition){this.reapplyLastPosition();return}this._clearPanelClasses(),this._resetOverlayElementStyles(),this._resetBoundingBoxStyles(),this._viewportRect=this._getNarrowedViewportRect(),this._originRect=this._getOriginRect(),this._overlayRect=this._pane.getBoundingClientRect(),this._containerRect=this._getContainerRect();let n=this._originRect,e=this._overlayRect,i=this._viewportRect,r=this._containerRect,o=[],a;for(let s of this._preferredPositions){let l=this._getOriginPoint(n,r,s),c=this._getOverlayPoint(l,e,s),u=this._getOverlayFit(c,e,i,s);if(u.isCompletelyWithinViewport){this._isPushed=!1,this._applyPosition(s,l);return}if(this._canFitWithFlexibleDimensions(u,c,i)){o.push({position:s,origin:l,overlayRect:e,boundingBoxRect:this._calculateBoundingBoxRect(l,s)});continue}(!a||a.overlayFit.visibleArea<u.visibleArea)&&(a={overlayFit:u,overlayPoint:c,originPoint:l,position:s,overlayRect:e})}if(o.length){let s=null,l=-1;for(let c of o){let u=c.boundingBoxRect.width*c.boundingBoxRect.height*(c.position.weight||1);u>l&&(l=u,s=c)}this._isPushed=!1,this._applyPosition(s.position,s.origin);return}if(this._canPush){this._isPushed=!0,this._applyPosition(a.position,a.originPoint);return}this._applyPosition(a.position,a.originPoint)}detach(){this._clearPanelClasses(),this._lastPosition=null,this._previousPushAmount=null,this._resizeSubscription.unsubscribe()}dispose(){this._isDisposed||(this._boundingBox&&Ar(this._boundingBox.style,{top:"",left:"",right:"",bottom:"",height:"",width:"",alignItems:"",justifyContent:""}),this._pane&&this._resetOverlayElementStyles(),this._overlayRef&&this._overlayRef.hostElement.classList.remove(BD),this.detach(),this._positionChanges.complete(),this._overlayRef=this._boundingBox=null,this._isDisposed=!0)}reapplyLastPosition(){if(this._isDisposed||!this._platform.isBrowser)return;let n=this._lastPosition;n?(this._originRect=this._getOriginRect(),this._overlayRect=this._pane.getBoundingClientRect(),this._viewportRect=this._getNarrowedViewportRect(),this._containerRect=this._getContainerRect(),this._applyPosition(n,this._getOriginPoint(this._originRect,this._containerRect,n))):this.apply()}withScrollableContainers(n){return this._scrollables=n,this}withPositions(n){return this._preferredPositions=n,n.indexOf(this._lastPosition)===-1&&(this._lastPosition=null),this._validatePositions(),this}withViewportMargin(n){return this._viewportMargin=n,this}withFlexibleDimensions(n=!0){return this._hasFlexibleDimensions=n,this}withGrowAfterOpen(n=!0){return this._growAfterOpen=n,this}withPush(n=!0){return this._canPush=n,this}withLockedPosition(n=!0){return this._positionLocked=n,this}setOrigin(n){return this._origin=n,this}withDefaultOffsetX(n){return this._offsetX=n,this}withDefaultOffsetY(n){return this._offsetY=n,this}withTransformOriginOn(n){return this._transformOriginSelector=n,this}withPopoverLocation(n){return this._popoverLocation=n,this}getPopoverInsertionPoint(){return this._popoverLocation==="global"?null:this._popoverLocation!=="inline"?this._popoverLocation:this._origin instanceof L?this._origin.nativeElement:op(this._origin)?this._origin:null}_getOriginPoint(n,e,i){let r;if(i.originX=="center")r=n.left+n.width/2;else{let a=this._isRtl()?n.right:n.left,s=this._isRtl()?n.left:n.right;r=i.originX=="start"?a:s}e.left<0&&(r-=e.left);let o;return i.originY=="center"?o=n.top+n.height/2:o=i.originY=="top"?n.top:n.bottom,e.top<0&&(o-=e.top),{x:r,y:o}}_getOverlayPoint(n,e,i){let r;i.overlayX=="center"?r=-e.width/2:i.overlayX==="start"?r=this._isRtl()?-e.width:0:r=this._isRtl()?0:-e.width;let o;return i.overlayY=="center"?o=-e.height/2:o=i.overlayY=="top"?0:-e.height,{x:n.x+r,y:n.y+o}}_getOverlayFit(n,e,i,r){let o=HD(e),{x:a,y:s}=n,l=this._getOffset(r,"x"),c=this._getOffset(r,"y");l&&(a+=l),c&&(s+=c);let u=0-a,f=a+o.width-i.width,g=0-s,p=s+o.height-i.height,v=this._subtractOverflows(o.width,u,f),S=this._subtractOverflows(o.height,g,p),N=v*S;return{visibleArea:N,isCompletelyWithinViewport:o.width*o.height===N,fitsInViewportVertically:S===o.height,fitsInViewportHorizontally:v==o.width}}_canFitWithFlexibleDimensions(n,e,i){if(this._hasFlexibleDimensions){let r=i.bottom-e.y,o=i.right-e.x,a=jD(this._overlayRef.getConfig().minHeight),s=jD(this._overlayRef.getConfig().minWidth),l=n.fitsInViewportVertically||a!=null&&a<=r,c=n.fitsInViewportHorizontally||s!=null&&s<=o;return l&&c}return!1}_pushOverlayOnScreen(n,e,i){if(this._previousPushAmount&&this._positionLocked)return{x:n.x+this._previousPushAmount.x,y:n.y+this._previousPushAmount.y};let r=HD(e),o=this._viewportRect,a=Math.max(n.x+r.width-o.width,0),s=Math.max(n.y+r.height-o.height,0),l=Math.max(o.top-i.top-n.y,0),c=Math.max(o.left-i.left-n.x,0),u=0,f=0;return r.width<=o.width?u=c||-a:u=n.x<this._getViewportMarginStart()?o.left-i.left-n.x:0,r.height<=o.height?f=l||-s:f=n.y<this._getViewportMarginTop()?o.top-i.top-n.y:0,this._previousPushAmount={x:u,y:f},{x:n.x+u,y:n.y+f}}_applyPosition(n,e){if(this._setTransformOrigin(n),this._setOverlayElementStyles(e,n),this._setBoundingBoxStyles(e,n),n.panelClass&&this._addPanelClasses(n.panelClass),this._positionChanges.observers.length){let i=this._getScrollVisibility();if(n!==this._lastPosition||!this._lastScrollVisibility||!mT(this._lastScrollVisibility,i)){let r=new pd(n,i);this._positionChanges.next(r)}this._lastScrollVisibility=i}this._lastPosition=n,this._isInitialRender=!1}_setTransformOrigin(n){if(!this._transformOriginSelector)return;let e=this._boundingBox.querySelectorAll(this._transformOriginSelector),i,r=n.overlayY;n.overlayX==="center"?i="center":this._isRtl()?i=n.overlayX==="start"?"right":"left":i=n.overlayX==="start"?"left":"right";for(let o=0;o<e.length;o++)e[o].style.transformOrigin=`${i} ${r}`}_calculateBoundingBoxRect(n,e){let i=this._viewportRect,r=this._isRtl(),o,a,s;if(e.overlayY==="top")a=n.y,o=i.height-a+this._getViewportMarginBottom();else if(e.overlayY==="bottom")s=i.height-n.y+this._getViewportMarginTop()+this._getViewportMarginBottom(),o=i.height-s+this._getViewportMarginTop();else{let p=Math.min(i.bottom-n.y+i.top,n.y),v=this._lastBoundingBoxSize.height;o=p*2,a=n.y-p,o>v&&!this._isInitialRender&&!this._growAfterOpen&&(a=n.y-v/2)}let l=e.overlayX==="start"&&!r||e.overlayX==="end"&&r,c=e.overlayX==="end"&&!r||e.overlayX==="start"&&r,u,f,g;if(c)g=i.width-n.x+this._getViewportMarginStart()+this._getViewportMarginEnd(),u=n.x-this._getViewportMarginStart();else if(l)f=n.x,u=i.right-n.x-this._getViewportMarginEnd();else{let p=Math.min(i.right-n.x+i.left,n.x),v=this._lastBoundingBoxSize.width;u=p*2,f=n.x-p,u>v&&!this._isInitialRender&&!this._growAfterOpen&&(f=n.x-v/2)}return{top:a,left:f,bottom:s,right:g,width:u,height:o}}_setBoundingBoxStyles(n,e){let i=this._calculateBoundingBoxRect(n,e);!this._isInitialRender&&!this._growAfterOpen&&(i.height=Math.min(i.height,this._lastBoundingBoxSize.height),i.width=Math.min(i.width,this._lastBoundingBoxSize.width));let r={};if(this._hasExactPosition())r.top=r.left="0",r.bottom=r.right="auto",r.maxHeight=r.maxWidth="",r.width=r.height="100%";else{let o=this._overlayRef.getConfig().maxHeight,a=this._overlayRef.getConfig().maxWidth;r.width=$e(i.width),r.height=$e(i.height),r.top=$e(i.top)||"auto",r.bottom=$e(i.bottom)||"auto",r.left=$e(i.left)||"auto",r.right=$e(i.right)||"auto",e.overlayX==="center"?r.alignItems="center":r.alignItems=e.overlayX==="end"?"flex-end":"flex-start",e.overlayY==="center"?r.justifyContent="center":r.justifyContent=e.overlayY==="bottom"?"flex-end":"flex-start",o&&(r.maxHeight=$e(o)),a&&(r.maxWidth=$e(a))}this._lastBoundingBoxSize=i,Ar(this._boundingBox.style,r)}_resetBoundingBoxStyles(){Ar(this._boundingBox.style,{top:"0",left:"0",right:"0",bottom:"0",height:"",width:"",alignItems:"",justifyContent:""})}_resetOverlayElementStyles(){Ar(this._pane.style,{top:"",left:"",bottom:"",right:"",position:"",transform:""})}_setOverlayElementStyles(n,e){let i={},r=this._hasExactPosition(),o=this._hasFlexibleDimensions,a=this._overlayRef.getConfig();if(r){let u=this._viewportRuler.getViewportScrollPosition();Ar(i,this._getExactOverlayY(e,n,u)),Ar(i,this._getExactOverlayX(e,n,u))}else i.position="static";let s="",l=this._getOffset(e,"x"),c=this._getOffset(e,"y");l&&(s+=`translateX(${l}px) `),c&&(s+=`translateY(${c}px)`),i.transform=s.trim(),a.maxHeight&&(r?i.maxHeight=$e(a.maxHeight):o&&(i.maxHeight="")),a.maxWidth&&(r?i.maxWidth=$e(a.maxWidth):o&&(i.maxWidth="")),Ar(this._pane.style,i)}_getExactOverlayY(n,e,i){let r={top:"",bottom:""},o=this._getOverlayPoint(e,this._overlayRect,n);if(this._isPushed&&(o=this._pushOverlayOnScreen(o,this._overlayRect,i)),n.overlayY==="bottom"){let a=this._document.documentElement.clientHeight;r.bottom=`${a-(o.y+this._overlayRect.height)}px`}else r.top=$e(o.y);return r}_getExactOverlayX(n,e,i){let r={left:"",right:""},o=this._getOverlayPoint(e,this._overlayRect,n);this._isPushed&&(o=this._pushOverlayOnScreen(o,this._overlayRect,i));let a;if(this._isRtl()?a=n.overlayX==="end"?"left":"right":a=n.overlayX==="end"?"right":"left",a==="right"){let s=this._document.documentElement.clientWidth;r.right=`${s-(o.x+this._overlayRect.width)}px`}else r.left=$e(o.x);return r}_getScrollVisibility(){let n=this._getOriginRect(),e=this._pane.getBoundingClientRect(),i=this._scrollables.map(r=>r.getElementRef().nativeElement.getBoundingClientRect());return{isOriginClipped:LD(n,i),isOriginOutsideView:ip(n,i),isOverlayClipped:LD(e,i),isOverlayOutsideView:ip(e,i)}}_subtractOverflows(n,...e){return e.reduce((i,r)=>i-Math.max(r,0),n)}_getNarrowedViewportRect(){let n=this._document.documentElement.clientWidth,e=this._document.documentElement.clientHeight,i=this._viewportRuler.getViewportScrollPosition();return{top:i.top+this._getViewportMarginTop(),left:i.left+this._getViewportMarginStart(),right:i.left+n-this._getViewportMarginEnd(),bottom:i.top+e-this._getViewportMarginBottom(),width:n-this._getViewportMarginStart()-this._getViewportMarginEnd(),height:e-this._getViewportMarginTop()-this._getViewportMarginBottom()}}_isRtl(){return this._overlayRef.getDirection()==="rtl"}_hasExactPosition(){return!this._hasFlexibleDimensions||this._isPushed}_getOffset(n,e){return e==="x"?n.offsetX==null?this._offsetX:n.offsetX:n.offsetY==null?this._offsetY:n.offsetY}_validatePositions(){}_addPanelClasses(n){this._pane&&ko(n).forEach(e=>{e!==""&&this._appliedPanelClasses.indexOf(e)===-1&&(this._appliedPanelClasses.push(e),this._pane.classList.add(e))})}_clearPanelClasses(){this._pane&&(this._appliedPanelClasses.forEach(n=>{this._pane.classList.remove(n)}),this._appliedPanelClasses=[])}_getViewportMarginStart(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.start??0}_getViewportMarginEnd(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.end??0}_getViewportMarginTop(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.top??0}_getViewportMarginBottom(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.bottom??0}_getOriginRect(){let n=this._origin;if(n instanceof L)return n.nativeElement.getBoundingClientRect();if(n instanceof Element)return n.getBoundingClientRect();let e=n.width||0,i=n.height||0;return{top:n.y,bottom:n.y+i,left:n.x,right:n.x+e,height:i,width:e}}_getContainerRect(){let n=this._overlayRef.getConfig().usePopover&&this._popoverLocation!=="global",e=this._overlayContainer.getContainerElement();n&&(e.style.display="block");let i=e.getBoundingClientRect();return n&&(e.style.display=""),i}};function Ar(t,n){for(let e in n)n.hasOwnProperty(e)&&(t[e]=n[e]);return t}function jD(t){if(typeof t!="number"&&t!=null){let[n,e]=t.split(fT);return!e||e==="px"?parseFloat(n):null}return t||null}function HD(t){return{top:Math.floor(t.top),right:Math.floor(t.right),bottom:Math.floor(t.bottom),left:Math.floor(t.left),width:Math.floor(t.width),height:Math.floor(t.height)}}function mT(t,n){return t===n?!0:t.isOriginClipped===n.isOriginClipped&&t.isOriginOutsideView===n.isOriginOutsideView&&t.isOverlayClipped===n.isOverlayClipped&&t.isOverlayOutsideView===n.isOverlayOutsideView}var UD="cdk-global-overlay-wrapper";function Jn(t){return new gd}var gd=class{_overlayRef;_cssPosition="static";_topOffset="";_bottomOffset="";_alignItems="";_xPosition="";_xOffset="";_width="";_height="";_isDisposed=!1;attach(n){let e=n.getConfig();this._overlayRef=n,this._width&&!e.width&&n.updateSize({width:this._width}),this._height&&!e.height&&n.updateSize({height:this._height}),n.hostElement.classList.add(UD),this._isDisposed=!1}top(n=""){return this._bottomOffset="",this._topOffset=n,this._alignItems="flex-start",this}left(n=""){return this._xOffset=n,this._xPosition="left",this}bottom(n=""){return this._topOffset="",this._bottomOffset=n,this._alignItems="flex-end",this}right(n=""){return this._xOffset=n,this._xPosition="right",this}start(n=""){return this._xOffset=n,this._xPosition="start",this}end(n=""){return this._xOffset=n,this._xPosition="end",this}width(n=""){return this._overlayRef?this._overlayRef.updateSize({width:n}):this._width=n,this}height(n=""){return this._overlayRef?this._overlayRef.updateSize({height:n}):this._height=n,this}centerHorizontally(n=""){return this.left(n),this._xPosition="center",this}centerVertically(n=""){return this.top(n),this._alignItems="center",this}apply(){if(!this._overlayRef||!this._overlayRef.hasAttached())return;let n=this._overlayRef.overlayElement.style,e=this._overlayRef.hostElement.style,i=this._overlayRef.getConfig(),{width:r,height:o,maxWidth:a,maxHeight:s}=i,l=(r==="100%"||r==="100vw")&&(!a||a==="100%"||a==="100vw"),c=(o==="100%"||o==="100vh")&&(!s||s==="100%"||s==="100vh"),u=this._xPosition,f=this._xOffset,g=this._overlayRef.getConfig().direction==="rtl",p="",v="",S="";l?S="flex-start":u==="center"?(S="center",g?v=f:p=f):g?u==="left"||u==="end"?(S="flex-end",p=f):(u==="right"||u==="start")&&(S="flex-start",v=f):u==="left"||u==="start"?(S="flex-start",p=f):(u==="right"||u==="end")&&(S="flex-end",v=f),n.position=this._cssPosition,n.marginLeft=l?"0":p,n.marginTop=c?"0":this._topOffset,n.marginBottom=this._bottomOffset,n.marginRight=l?"0":v,e.justifyContent=S,e.alignItems=c?"flex-start":this._alignItems}dispose(){if(this._isDisposed||!this._overlayRef)return;let n=this._overlayRef.overlayElement.style,e=this._overlayRef.hostElement,i=e.style;e.classList.remove(UD),i.justifyContent=i.alignItems=n.marginTop=n.marginBottom=n.marginLeft=n.marginRight=n.position="",this._overlayRef=null,this._isDisposed=!0}},ZD=(()=>{class t{_injector=d(G);constructor(){}global(){return Jn()}flexibleConnectedTo(e){return Nr(this._injector,e)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),KD=new b("OVERLAY_DEFAULT_CONFIG");function Dn(t,n){t.get(Re).load(qD);let e=t.get(_d),i=t.get(H),r=t.get(Ie),o=t.get($t),a=t.get(qe),s=t.get(Te,null,{optional:!0})||t.get(Ge).createRenderer(null,null),l=new yn(n),c=t.get(KD,null,{optional:!0})?.usePopover??!0;l.direction=l.direction||a.value,"showPopover"in i.body?l.usePopover=n?.usePopover??c:l.usePopover=!1;let u=i.createElement("div"),f=i.createElement("div");u.id=r.getId("cdk-overlay-"),u.classList.add("cdk-overlay-pane"),f.appendChild(u),l.usePopover&&(f.setAttribute("popover","manual"),f.classList.add("cdk-overlay-popover"));let g=l.usePopover?l.positionStrategy?.getPopoverInsertionPoint?.():null;return op(g)?g.after(f):g?.type==="parent"?g.element.appendChild(f):e.getContainerElement().appendChild(f),new Fo(new ps(u,o,t),f,u,l,t.get(A),t.get(WD),i,t.get(Vc),t.get(YD),n?.disableAnimations??t.get(Ba,null,{optional:!0})==="NoopAnimations",t.get(Ue),s)}var QD=(()=>{class t{scrollStrategies=d($D);_positionBuilder=d(ZD);_injector=d(G);constructor(){}create(e){return Dn(this._injector,e)}position(){return this._positionBuilder}static \u0275fac=function(i){return new(i||t)};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Qt=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=Z({type:t});static \u0275inj=q({providers:[QD],imports:[ye,Rn,tp,tp]})}return t})();function hT(t,n){}var Ti=class{viewContainerRef;injector;id;role="dialog";panelClass="";hasBackdrop=!0;backdropClass="";disableClose=!1;closePredicate;width="";height="";minWidth;minHeight;maxWidth;maxHeight;positionStrategy;data=null;direction;ariaDescribedBy=null;ariaLabelledBy=null;ariaLabel=null;ariaModal=!1;autoFocus="first-tabbable";restoreFocus=!0;scrollStrategy;closeOnNavigation=!0;closeOnDestroy=!0;closeOnOverlayDetachments=!0;disableAnimations=!1;providers;container;templateContext};var sp=(()=>{class t extends ki{_elementRef=d(L);_focusTrapFactory=d(Jc);_config;_interactivityChecker=d(Bh);_ngZone=d(A);_focusMonitor=d(Nt);_renderer=d(Te);_changeDetectorRef=d(xe);_injector=d(G);_platform=d(de);_document=d(H);_portalOutlet;_focusTrapped=new E;_focusTrap=null;_elementFocusedBeforeDialogWasOpened=null;_closeInteractionType=null;_ariaLabelledByQueue=[];_isDestroyed=!1;constructor(){super(),this._config=d(Ti,{optional:!0})||new Ti,this._config.ariaLabelledBy&&this._ariaLabelledByQueue.push(this._config.ariaLabelledBy)}_addAriaLabelledBy(e){this._ariaLabelledByQueue.push(e),this._changeDetectorRef.markForCheck()}_removeAriaLabelledBy(e){let i=this._ariaLabelledByQueue.indexOf(e);i>-1&&(this._ariaLabelledByQueue.splice(i,1),this._changeDetectorRef.markForCheck())}_contentAttached(){this._initializeFocusTrap(),this._captureInitialFocus()}_captureInitialFocus(){this._trapFocus()}ngOnDestroy(){this._focusTrapped.complete(),this._isDestroyed=!0,this._restoreFocus()}attachComponentPortal(e){this._portalOutlet.hasAttached();let i=this._portalOutlet.attachComponentPortal(e);return this._contentAttached(),i}attachTemplatePortal(e){this._portalOutlet.hasAttached();let i=this._portalOutlet.attachTemplatePortal(e);return this._contentAttached(),i}attachDomPortal=e=>{this._portalOutlet.hasAttached();let i=this._portalOutlet.attachDomPortal(e);return this._contentAttached(),i};_recaptureFocus(){this._containsFocus()||this._trapFocus()}_forceFocus(e,i){this._interactivityChecker.isFocusable(e)||(e.tabIndex=-1,this._ngZone.runOutsideAngular(()=>{let r=()=>{o(),a(),e.removeAttribute("tabindex")},o=this._renderer.listen(e,"blur",r),a=this._renderer.listen(e,"mousedown",r)})),e.focus(i)}_focusByCssSelector(e,i){let r=this._elementRef.nativeElement.querySelector(e);r&&this._forceFocus(r,i)}_trapFocus(e){this._isDestroyed||Ye(()=>{let i=this._elementRef.nativeElement;switch(this._config.autoFocus){case!1:case"dialog":this._containsFocus()||i.focus(e);break;case!0:case"first-tabbable":this._focusTrap?.focusInitialElement(e)||this._focusDialogContainer(e);break;case"first-heading":this._focusByCssSelector('h1, h2, h3, h4, h5, h6, [role="heading"]',e);break;default:this._focusByCssSelector(this._config.autoFocus,e);break}this._focusTrapped.next()},{injector:this._injector})}_restoreFocus(){let e=this._config.restoreFocus,i=null;if(typeof e=="string"?i=this._document.querySelector(e):typeof e=="boolean"?i=e?this._elementFocusedBeforeDialogWasOpened:null:e&&(i=e),this._config.restoreFocus&&i&&typeof i.focus=="function"){let r=Yn(),o=this._elementRef.nativeElement;(!r||r===this._document.body||r===o||o.contains(r))&&(this._focusMonitor?(this._focusMonitor.focusVia(i,this._closeInteractionType),this._closeInteractionType=null):i.focus())}this._focusTrap&&this._focusTrap.destroy()}_focusDialogContainer(e){this._elementRef.nativeElement.focus?.(e)}_containsFocus(){let e=this._elementRef.nativeElement,i=Yn();return e===i||e.contains(i)}_initializeFocusTrap(){this._platform.isBrowser&&(this._focusTrap=this._focusTrapFactory.create(this._elementRef.nativeElement),this._document&&(this._elementFocusedBeforeDialogWasOpened=Yn()))}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["cdk-dialog-container"]],viewQuery:function(i,r){if(i&1&&ve(vn,7),i&2){let o;K(o=Q())&&(r._portalOutlet=o.first)}},hostAttrs:["tabindex","-1",1,"cdk-dialog-container"],hostVars:6,hostBindings:function(i,r){i&2&&P("id",r._config.id||null)("role",r._config.role)("aria-modal",r._config.ariaModal)("aria-labelledby",r._config.ariaLabel?null:r._ariaLabelledByQueue[0])("aria-label",r._config.ariaLabel)("aria-describedby",r._config.ariaDescribedBy||null)},features:[_e],decls:1,vars:0,consts:[["cdkPortalOutlet",""]],template:function(i,r){i&1&&it(0,hT,0,0,"ng-template",0)},dependencies:[vn],styles:[`.cdk-dialog-container {
  display: block;
  width: 100%;
  height: 100%;
  min-height: inherit;
  max-height: inherit;
}
`],encapsulation:2})}return t})(),bs=class{overlayRef;config;componentInstance=null;componentRef=null;containerInstance;disableClose;closed=new E;backdropClick;keydownEvents;outsidePointerEvents;id;_detachSubscription;constructor(n,e){this.overlayRef=n,this.config=e,this.disableClose=e.disableClose,this.backdropClick=n.backdropClick(),this.keydownEvents=n.keydownEvents(),this.outsidePointerEvents=n.outsidePointerEvents(),this.id=e.id,this.keydownEvents.subscribe(i=>{i.keyCode===27&&!this.disableClose&&!Et(i)&&(i.preventDefault(),this.close(void 0,{focusOrigin:"keyboard"}))}),this.backdropClick.subscribe(()=>{!this.disableClose&&this._canClose()?this.close(void 0,{focusOrigin:"mouse"}):this.containerInstance._recaptureFocus?.()}),this._detachSubscription=n.detachments().subscribe(()=>{e.closeOnOverlayDetachments!==!1&&this.close()})}close(n,e){if(this._canClose(n)){let i=this.closed;this.containerInstance._closeInteractionType=e?.focusOrigin||"program",this._detachSubscription.unsubscribe(),this.overlayRef.dispose(),i.next(n),i.complete(),this.componentInstance=this.containerInstance=null}}updatePosition(){return this.overlayRef.updatePosition(),this}updateSize(n="",e=""){return this.overlayRef.updateSize({width:n,height:e}),this}addPanelClass(n){return this.overlayRef.addPanelClass(n),this}removePanelClass(n){return this.overlayRef.removePanelClass(n),this}_canClose(n){let e=this.config;return!!this.containerInstance&&(!e.closePredicate||e.closePredicate(n,e,this.componentInstance))}},pT=new b("DialogScrollStrategy",{providedIn:"root",factory:()=>{let t=d(G);return()=>Rr(t)}}),gT=new b("DialogData"),_T=new b("DefaultDialogConfig");function bT(t){let n=x(t),e=new F;return{valueSignal:n,get value(){return n()},change:e,ngOnDestroy(){e.complete()}}}var lp=(()=>{class t{_injector=d(G);_defaultOptions=d(_T,{optional:!0});_parentDialog=d(t,{optional:!0,skipSelf:!0});_overlayContainer=d(_d);_idGenerator=d(Ie);_openDialogsAtThisLevel=[];_afterAllClosedAtThisLevel=new E;_afterOpenedAtThisLevel=new E;_ariaHiddenElements=new Map;_scrollStrategy=d(pT);get openDialogs(){return this._parentDialog?this._parentDialog.openDialogs:this._openDialogsAtThisLevel}get afterOpened(){return this._parentDialog?this._parentDialog.afterOpened:this._afterOpenedAtThisLevel}afterAllClosed=ca(()=>this.openDialogs.length?this._getAfterAllClosed():this._getAfterAllClosed().pipe(nt(void 0)));constructor(){}open(e,i){let r=this._defaultOptions||new Ti;i=w(w({},r),i),i.id=i.id||this._idGenerator.getId("cdk-dialog-"),i.id&&this.getDialogById(i.id);let o=this._getOverlayConfig(i),a=Dn(this._injector,o),s=new bs(a,i),l=this._attachContainer(a,s,i);if(s.containerInstance=l,!this.openDialogs.length){let c=this._overlayContainer.getContainerElement();l._focusTrapped?l._focusTrapped.pipe(vt(1)).subscribe(()=>{this._hideNonDialogContentFromAssistiveTechnology(c)}):this._hideNonDialogContentFromAssistiveTechnology(c)}return this._attachDialogContent(e,s,l,i),this.openDialogs.push(s),s.closed.subscribe(()=>this._removeOpenDialog(s,!0)),this.afterOpened.next(s),s}closeAll(){ap(this.openDialogs,e=>e.close())}getDialogById(e){return this.openDialogs.find(i=>i.id===e)}ngOnDestroy(){ap(this._openDialogsAtThisLevel,e=>{e.config.closeOnDestroy===!1&&this._removeOpenDialog(e,!1)}),ap(this._openDialogsAtThisLevel,e=>e.close()),this._afterAllClosedAtThisLevel.complete(),this._afterOpenedAtThisLevel.complete(),this._openDialogsAtThisLevel=[]}_getOverlayConfig(e){let i=new yn({positionStrategy:e.positionStrategy||Jn().centerHorizontally().centerVertically(),scrollStrategy:e.scrollStrategy||this._scrollStrategy(),panelClass:e.panelClass,hasBackdrop:e.hasBackdrop,direction:e.direction,minWidth:e.minWidth,minHeight:e.minHeight,maxWidth:e.maxWidth,maxHeight:e.maxHeight,width:e.width,height:e.height,disposeOnNavigation:e.closeOnNavigation,disableAnimations:e.disableAnimations});return e.backdropClass&&(i.backdropClass=e.backdropClass),i}_attachContainer(e,i,r){let o=r.injector||r.viewContainerRef?.injector,a=[{provide:Ti,useValue:r},{provide:bs,useValue:i},{provide:Fo,useValue:e}],s;r.container?typeof r.container=="function"?s=r.container:(s=r.container.type,a.push(...r.container.providers(r))):s=sp;let l=new Pt(s,r.viewContainerRef,G.create({parent:o||this._injector,providers:a}));return e.attach(l).instance}_attachDialogContent(e,i,r,o){if(e instanceof lt){let a=this._createInjector(o,i,r,void 0),s={$implicit:o.data,dialogRef:i};o.templateContext&&(s=w(w({},s),typeof o.templateContext=="function"?o.templateContext():o.templateContext)),r.attachTemplatePortal(new bn(e,null,s,a))}else{let a=this._createInjector(o,i,r,this._injector),s=r.attachComponentPortal(new Pt(e,o.viewContainerRef,a));i.componentRef=s,i.componentInstance=s.instance}}_createInjector(e,i,r,o){let a=e.injector||e.viewContainerRef?.injector,s=[{provide:gT,useValue:e.data},{provide:bs,useValue:i}];return e.providers&&(typeof e.providers=="function"?s.push(...e.providers(i,e,r)):s.push(...e.providers)),e.direction&&(!a||!a.get(qe,null,{optional:!0}))&&s.push({provide:qe,useValue:bT(e.direction)}),G.create({parent:a||o,providers:s})}_removeOpenDialog(e,i){let r=this.openDialogs.indexOf(e);r>-1&&(this.openDialogs.splice(r,1),this.openDialogs.length||(this._ariaHiddenElements.forEach((o,a)=>{o?a.setAttribute("aria-hidden",o):a.removeAttribute("aria-hidden")}),this._ariaHiddenElements.clear(),i&&this._getAfterAllClosed().next()))}_hideNonDialogContentFromAssistiveTechnology(e){if(e.parentElement){let i=e.parentElement.children;for(let r=i.length-1;r>-1;r--){let o=i[r];o!==e&&o.nodeName!=="SCRIPT"&&o.nodeName!=="STYLE"&&!o.hasAttribute("aria-live")&&!o.hasAttribute("popover")&&(this._ariaHiddenElements.set(o,o.getAttribute("aria-hidden")),o.setAttribute("aria-hidden","true"))}}}_getAfterAllClosed(){let e=this._parentDialog;return e?e._getAfterAllClosed():this._afterAllClosedAtThisLevel}static \u0275fac=function(i){return new(i||t)};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function ap(t,n){let e=t.length;for(;e--;)n(t[e])}var XD=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=Z({type:t});static \u0275inj=q({providers:[lp],imports:[Qt,Rn,Sr,Rn]})}return t})();function vT(t,n){}var vd=class{viewContainerRef;injector;id;role="dialog";panelClass="";hasBackdrop=!0;backdropClass="";disableClose=!1;closePredicate;width="";height="";minWidth;minHeight;maxWidth;maxHeight;position;data=null;direction;ariaDescribedBy=null;ariaLabelledBy=null;ariaLabel=null;ariaModal=!1;autoFocus="first-tabbable";restoreFocus=!0;delayFocusTrap=!0;scrollStrategy;closeOnNavigation=!0;enterAnimationDuration;exitAnimationDuration},cp="mdc-dialog--open",JD="mdc-dialog--opening",e0="mdc-dialog--closing",yT=150,DT=75,CT=(()=>{class t extends sp{_animationStateChanged=new F;_animationsEnabled=!we();_actionSectionCount=0;_hostElement=this._elementRef.nativeElement;_enterAnimationDuration=this._animationsEnabled?n0(this._config.enterAnimationDuration)??yT:0;_exitAnimationDuration=this._animationsEnabled?n0(this._config.exitAnimationDuration)??DT:0;_animationTimer=null;_contentAttached(){super._contentAttached(),this._startOpenAnimation()}_startOpenAnimation(){this._animationStateChanged.emit({state:"opening",totalTime:this._enterAnimationDuration}),this._animationsEnabled?(this._hostElement.style.setProperty(t0,`${this._enterAnimationDuration}ms`),this._requestAnimationFrame(()=>this._hostElement.classList.add(JD,cp)),this._waitForAnimationToComplete(this._enterAnimationDuration,this._finishDialogOpen)):(this._hostElement.classList.add(cp),Promise.resolve().then(()=>this._finishDialogOpen()))}_startExitAnimation(){this._animationStateChanged.emit({state:"closing",totalTime:this._exitAnimationDuration}),this._hostElement.classList.remove(cp),this._animationsEnabled?(this._hostElement.style.setProperty(t0,`${this._exitAnimationDuration}ms`),this._requestAnimationFrame(()=>this._hostElement.classList.add(e0)),this._waitForAnimationToComplete(this._exitAnimationDuration,this._finishDialogClose)):Promise.resolve().then(()=>this._finishDialogClose())}_updateActionSectionCount(e){this._actionSectionCount+=e,this._changeDetectorRef.markForCheck()}_finishDialogOpen=()=>{this._clearAnimationClasses(),this._openAnimationDone(this._enterAnimationDuration)};_finishDialogClose=()=>{this._clearAnimationClasses(),this._animationStateChanged.emit({state:"closed",totalTime:this._exitAnimationDuration})};_clearAnimationClasses(){this._hostElement.classList.remove(JD,e0)}_waitForAnimationToComplete(e,i){this._animationTimer!==null&&clearTimeout(this._animationTimer),this._animationTimer=setTimeout(i,e)}_requestAnimationFrame(e){this._ngZone.runOutsideAngular(()=>{typeof requestAnimationFrame=="function"?requestAnimationFrame(e):e()})}_captureInitialFocus(){this._config.delayFocusTrap||this._trapFocus()}_openAnimationDone(e){this._config.delayFocusTrap&&this._trapFocus(),this._animationStateChanged.next({state:"opened",totalTime:e})}ngOnDestroy(){super.ngOnDestroy(),this._animationTimer!==null&&clearTimeout(this._animationTimer)}attachComponentPortal(e){let i=super.attachComponentPortal(e);return i.location.nativeElement.classList.add("mat-mdc-dialog-component-host"),i}static \u0275fac=(()=>{let e;return function(r){return(e||(e=Rt(t)))(r||t)}})();static \u0275cmp=k({type:t,selectors:[["mat-dialog-container"]],hostAttrs:["tabindex","-1",1,"mat-mdc-dialog-container","mdc-dialog"],hostVars:10,hostBindings:function(i,r){i&2&&(et("id",r._config.id),P("aria-modal",r._config.ariaModal)("role",r._config.role)("aria-labelledby",r._config.ariaLabel?null:r._ariaLabelledByQueue[0])("aria-label",r._config.ariaLabel)("aria-describedby",r._config.ariaDescribedBy||null),I("_mat-animation-noopable",!r._animationsEnabled)("mat-mdc-dialog-container-with-actions",r._actionSectionCount>0))},features:[_e],decls:3,vars:0,consts:[[1,"mat-mdc-dialog-inner-container","mdc-dialog__container"],[1,"mat-mdc-dialog-surface","mdc-dialog__surface"],["cdkPortalOutlet",""]],template:function(i,r){i&1&&(m(0,"div",0)(1,"div",1),it(2,vT,0,0,"ng-template",2),h()())},dependencies:[vn],styles:[`.mat-mdc-dialog-container {
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
`],encapsulation:2})}return t})(),t0="--mat-dialog-transition-duration";function n0(t){return t==null?null:typeof t=="number"?t:t.endsWith("ms")?qn(t.substring(0,t.length-2)):t.endsWith("s")?qn(t.substring(0,t.length-1))*1e3:t==="0"?0:null}var bd=(function(t){return t[t.OPEN=0]="OPEN",t[t.CLOSING=1]="CLOSING",t[t.CLOSED=2]="CLOSED",t})(bd||{}),Ri=class{_ref;_config;_containerInstance;componentInstance;componentRef=null;disableClose;id;_afterOpened=new ri(1);_beforeClosed=new ri(1);_result;_closeFallbackTimeout;_state=bd.OPEN;_closeInteractionType;constructor(n,e,i){this._ref=n,this._config=e,this._containerInstance=i,this.disableClose=e.disableClose,this.id=n.id,n.addPanelClass("mat-mdc-dialog-panel"),i._animationStateChanged.pipe(Le(r=>r.state==="opened"),vt(1)).subscribe(()=>{this._afterOpened.next(),this._afterOpened.complete()}),i._animationStateChanged.pipe(Le(r=>r.state==="closed"),vt(1)).subscribe(()=>{clearTimeout(this._closeFallbackTimeout),this._finishDialogClose()}),n.overlayRef.detachments().subscribe(()=>{this._beforeClosed.next(this._result),this._beforeClosed.complete(),this._finishDialogClose()}),Bt(this.backdropClick(),this.keydownEvents().pipe(Le(r=>r.keyCode===27&&!this.disableClose&&!Et(r)))).subscribe(r=>{this.disableClose||(r.preventDefault(),xT(this,r.type==="keydown"?"keyboard":"mouse"))})}close(n){let e=this._config.closePredicate;e&&!e(n,this._config,this.componentInstance)||(this._result=n,this._containerInstance._animationStateChanged.pipe(Le(i=>i.state==="closing"),vt(1)).subscribe(i=>{this._beforeClosed.next(n),this._beforeClosed.complete(),this._ref.overlayRef.detachBackdrop(),this._closeFallbackTimeout=setTimeout(()=>this._finishDialogClose(),i.totalTime+100)}),this._state=bd.CLOSING,this._containerInstance._startExitAnimation())}afterOpened(){return this._afterOpened}afterClosed(){return this._ref.closed}beforeClosed(){return this._beforeClosed}backdropClick(){return this._ref.backdropClick}keydownEvents(){return this._ref.keydownEvents}updatePosition(n){let e=this._ref.config.positionStrategy;return n&&(n.left||n.right)?n.left?e.left(n.left):e.right(n.right):e.centerHorizontally(),n&&(n.top||n.bottom)?n.top?e.top(n.top):e.bottom(n.bottom):e.centerVertically(),this._ref.updatePosition(),this}updateSize(n="",e=""){return this._ref.updateSize(n,e),this}addPanelClass(n){return this._ref.addPanelClass(n),this}removePanelClass(n){return this._ref.removePanelClass(n),this}getState(){return this._state}_finishDialogClose(){this._state=bd.CLOSED,this._ref.close(this._result,{focusOrigin:this._closeInteractionType}),this.componentInstance=null}};function xT(t,n,e){return t._closeInteractionType=n,t.close(e)}var dp=new b("MatMdcDialogData"),wT=new b("mat-mdc-dialog-default-options"),ET=new b("mat-mdc-dialog-scroll-strategy",{providedIn:"root",factory:()=>{let t=d(G);return()=>Rr(t)}}),yd=(()=>{class t{_defaultOptions=d(wT,{optional:!0});_scrollStrategy=d(ET);_parentDialog=d(t,{optional:!0,skipSelf:!0});_idGenerator=d(Ie);_injector=d(G);_dialog=d(lp);_animationsDisabled=we();_openDialogsAtThisLevel=[];_afterAllClosedAtThisLevel=new E;_afterOpenedAtThisLevel=new E;dialogConfigClass=vd;_dialogRefConstructor;_dialogContainerType;_dialogDataToken;get openDialogs(){return this._parentDialog?this._parentDialog.openDialogs:this._openDialogsAtThisLevel}get afterOpened(){return this._parentDialog?this._parentDialog.afterOpened:this._afterOpenedAtThisLevel}_getAfterAllClosed(){let e=this._parentDialog;return e?e._getAfterAllClosed():this._afterAllClosedAtThisLevel}afterAllClosed=ca(()=>this.openDialogs.length?this._getAfterAllClosed():this._getAfterAllClosed().pipe(nt(void 0)));constructor(){this._dialogRefConstructor=Ri,this._dialogContainerType=CT,this._dialogDataToken=dp}open(e,i){let r;i=w(w({},this._defaultOptions||new vd),i),i.id=i.id||this._idGenerator.getId("mat-mdc-dialog-"),i.scrollStrategy=i.scrollStrategy||this._scrollStrategy();let o=this._dialog.open(e,ae(w({},i),{positionStrategy:Jn(this._injector).centerHorizontally().centerVertically(),disableClose:!0,closePredicate:void 0,closeOnDestroy:!1,closeOnOverlayDetachments:!1,disableAnimations:this._animationsDisabled||i.enterAnimationDuration?.toLocaleString()==="0"||i.exitAnimationDuration?.toString()==="0",container:{type:this._dialogContainerType,providers:()=>[{provide:this.dialogConfigClass,useValue:i},{provide:Ti,useValue:i}]},templateContext:()=>({dialogRef:r}),providers:(a,s,l)=>(r=new this._dialogRefConstructor(a,i,l),r.updatePosition(i?.position),[{provide:this._dialogContainerType,useValue:l},{provide:this._dialogDataToken,useValue:s.data},{provide:this._dialogRefConstructor,useValue:r}])}));return r.componentRef=o.componentRef,r.componentInstance=o.componentInstance,this.openDialogs.push(r),this.afterOpened.next(r),r.afterClosed().subscribe(()=>{let a=this.openDialogs.indexOf(r);a>-1&&(this.openDialogs.splice(a,1),this.openDialogs.length||this._getAfterAllClosed().next())}),r}closeAll(){this._closeDialogs(this.openDialogs)}getDialogById(e){return this.openDialogs.find(i=>i.id===e)}ngOnDestroy(){this._closeDialogs(this._openDialogsAtThisLevel),this._afterAllClosedAtThisLevel.complete(),this._afterOpenedAtThisLevel.complete()}_closeDialogs(e){let i=e.length;for(;i--;)e[i].close()}static \u0275fac=function(i){return new(i||t)};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var i0=(()=>{class t{_dialogRef=d(Ri,{optional:!0});_elementRef=d(L);_dialog=d(yd);constructor(){}ngOnInit(){this._dialogRef||(this._dialogRef=MT(this._elementRef,this._dialog.openDialogs)),this._dialogRef&&Promise.resolve().then(()=>{this._onAdd()})}ngOnDestroy(){this._dialogRef?._containerInstance&&Promise.resolve().then(()=>{this._onRemove()})}static \u0275fac=function(i){return new(i||t)};static \u0275dir=U({type:t})}return t})(),Dd=(()=>{class t extends i0{id=d(Ie).getId("mat-mdc-dialog-title-");_onAdd(){this._dialogRef._containerInstance?._addAriaLabelledBy?.(this.id)}_onRemove(){this._dialogRef?._containerInstance?._removeAriaLabelledBy?.(this.id)}static \u0275fac=(()=>{let e;return function(r){return(e||(e=Rt(t)))(r||t)}})();static \u0275dir=U({type:t,selectors:[["","mat-dialog-title",""],["","matDialogTitle",""]],hostAttrs:[1,"mat-mdc-dialog-title","mdc-dialog__title"],hostVars:1,hostBindings:function(i,r){i&2&&et("id",r.id)},inputs:{id:"id"},exportAs:["matDialogTitle"],features:[_e]})}return t})(),Cd=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=U({type:t,selectors:[["","mat-dialog-content",""],["mat-dialog-content"],["","matDialogContent",""]],hostAttrs:[1,"mat-mdc-dialog-content","mdc-dialog__content"],features:[nh([ep])]})}return t})(),r0=(()=>{class t extends i0{align;_onAdd(){this._dialogRef._containerInstance?._updateActionSectionCount?.(1)}_onRemove(){this._dialogRef._containerInstance?._updateActionSectionCount?.(-1)}static \u0275fac=(()=>{let e;return function(r){return(e||(e=Rt(t)))(r||t)}})();static \u0275dir=U({type:t,selectors:[["","mat-dialog-actions",""],["mat-dialog-actions"],["","matDialogActions",""]],hostAttrs:[1,"mat-mdc-dialog-actions","mdc-dialog__actions"],hostVars:6,hostBindings:function(i,r){i&2&&I("mat-mdc-dialog-actions-align-start",r.align==="start")("mat-mdc-dialog-actions-align-center",r.align==="center")("mat-mdc-dialog-actions-align-end",r.align==="end")},inputs:{align:"align"},features:[_e]})}return t})();function MT(t,n){let e=t.nativeElement.parentElement;for(;e&&!e.classList.contains("mat-mdc-dialog-container");)e=e.parentElement;return e?n.find(i=>i.id===e.id):null}var Po=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=Z({type:t});static \u0275inj=q({providers:[yd],imports:[XD,Qt,Rn,ye]})}return t})();var fp=class{_box;_destroyed=new E;_resizeSubject=new E;_resizeObserver;_elementObservables=new Map;constructor(n){this._box=n,typeof ResizeObserver<"u"&&(this._resizeObserver=new ResizeObserver(e=>this._resizeSubject.next(e)))}observe(n){return this._elementObservables.has(n)||this._elementObservables.set(n,new le(e=>{let i=this._resizeSubject.subscribe(e);return this._resizeObserver?.observe(n,{box:this._box}),()=>{this._resizeObserver?.unobserve(n),i.unsubscribe(),this._elementObservables.delete(n)}}).pipe(Le(e=>e.some(i=>i.target===n)),bl({bufferSize:1,refCount:!0}),je(this._destroyed))),this._elementObservables.get(n)}destroy(){this._destroyed.next(),this._destroyed.complete(),this._resizeSubject.complete(),this._elementObservables.clear()}},o0=(()=>{class t{_cleanupErrorListener;_observers=new Map;_ngZone=d(A);constructor(){typeof ResizeObserver<"u"}ngOnDestroy(){for(let[,e]of this._observers)e.destroy();this._observers.clear(),this._cleanupErrorListener?.()}observe(e,i){let r=i?.box||"content-box";return this._observers.has(r)||this._observers.set(r,new fp(r)),this._observers.get(r).observe(e)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var IT=["notch"],ST=["matFormFieldNotchedOutline",""],kT=["*"],a0=["iconPrefixContainer"],s0=["textPrefixContainer"],l0=["iconSuffixContainer"],c0=["textSuffixContainer"],TT=["textField"],AT=["*",[["mat-label"]],[["","matPrefix",""],["","matIconPrefix",""]],[["","matTextPrefix",""]],[["","matTextSuffix",""]],[["","matSuffix",""],["","matIconSuffix",""]],[["mat-error"],["","matError",""]],[["mat-hint",3,"align","end"]],[["mat-hint","align","end"]]],RT=["*","mat-label","[matPrefix], [matIconPrefix]","[matTextPrefix]","[matTextSuffix]","[matSuffix], [matIconSuffix]","mat-error, [matError]","mat-hint:not([align='end'])","mat-hint[align='end']"];function OT(t,n){t&1&&j(0,"span",21)}function NT(t,n){if(t&1&&(m(0,"label",20),ce(1,1),V(2,OT,1,0,"span",21),h()),t&2){let e=D(2);T("floating",e._shouldLabelFloat())("monitorResize",e._hasOutline())("id",e._labelId),P("for",e._control.disableAutomaticLabeling?null:e._control.id),_(2),B(!e.hideRequiredMarker&&e._control.required?2:-1)}}function FT(t,n){if(t&1&&V(0,NT,3,5,"label",20),t&2){let e=D();B(e._hasFloatingLabel()?0:-1)}}function PT(t,n){t&1&&j(0,"div",7)}function LT(t,n){}function VT(t,n){if(t&1&&it(0,LT,0,0,"ng-template",13),t&2){D(2);let e=Gt(1);T("ngTemplateOutlet",e)}}function BT(t,n){if(t&1&&(m(0,"div",9),V(1,VT,1,1,null,13),h()),t&2){let e=D();T("matFormFieldNotchedOutlineOpen",e._shouldLabelFloat()),_(),B(e._forceDisplayInfixLabel()?-1:1)}}function jT(t,n){t&1&&(m(0,"div",10,2),ce(2,2),h())}function HT(t,n){t&1&&(m(0,"div",11,3),ce(2,3),h())}function UT(t,n){}function zT(t,n){if(t&1&&it(0,UT,0,0,"ng-template",13),t&2){D();let e=Gt(1);T("ngTemplateOutlet",e)}}function $T(t,n){t&1&&(m(0,"div",14,4),ce(2,4),h())}function GT(t,n){t&1&&(m(0,"div",15,5),ce(2,5),h())}function WT(t,n){t&1&&j(0,"div",16)}function YT(t,n){t&1&&(m(0,"div",18),ce(1,6),h())}function qT(t,n){if(t&1&&(m(0,"mat-hint",22),C(1),h()),t&2){let e=D(2);T("id",e._hintLabelId),_(),oe(e.hintLabel)}}function ZT(t,n){if(t&1&&(m(0,"div",19),V(1,qT,2,2,"mat-hint",22),ce(2,7),j(3,"div",23),ce(4,8),h()),t&2){let e=D();_(),B(e.hintLabel?1:-1)}}var Fr=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=U({type:t,selectors:[["mat-label"]]})}return t})(),KT=new b("MatError");var vs=(()=>{class t{align="start";id=d(Ie).getId("mat-mdc-hint-");static \u0275fac=function(i){return new(i||t)};static \u0275dir=U({type:t,selectors:[["mat-hint"]],hostAttrs:[1,"mat-mdc-form-field-hint","mat-mdc-form-field-bottom-align"],hostVars:4,hostBindings:function(i,r){i&2&&(et("id",r.id),P("align",null),I("mat-mdc-form-field-hint-end",r.align==="end"))},inputs:{align:"align",id:"id"}})}return t})(),QT=new b("MatPrefix");var g0=new b("MatSuffix"),mp=(()=>{class t{set _isTextSelector(e){this._isText=!0}_isText=!1;static \u0275fac=function(i){return new(i||t)};static \u0275dir=U({type:t,selectors:[["","matSuffix",""],["","matIconSuffix",""],["","matTextSuffix",""]],inputs:{_isTextSelector:[0,"matTextSuffix","_isTextSelector"]},features:[Be([{provide:g0,useExisting:t}])]})}return t})(),_0=new b("FloatingLabelParent"),d0=(()=>{class t{_elementRef=d(L);get floating(){return this._floating}set floating(e){this._floating=e,this.monitorResize&&this._handleResize()}_floating=!1;get monitorResize(){return this._monitorResize}set monitorResize(e){this._monitorResize=e,this._monitorResize?this._subscribeToResize():this._resizeSubscription.unsubscribe()}_monitorResize=!1;_resizeObserver=d(o0);_ngZone=d(A);_parent=d(_0);_resizeSubscription=new ue;constructor(){}ngOnDestroy(){this._resizeSubscription.unsubscribe()}getWidth(){return XT(this._elementRef.nativeElement)}get element(){return this._elementRef.nativeElement}_handleResize(){setTimeout(()=>this._parent._handleLabelResized())}_subscribeToResize(){this._resizeSubscription.unsubscribe(),this._ngZone.runOutsideAngular(()=>{this._resizeSubscription=this._resizeObserver.observe(this._elementRef.nativeElement,{box:"border-box"}).subscribe(()=>this._handleResize())})}static \u0275fac=function(i){return new(i||t)};static \u0275dir=U({type:t,selectors:[["label","matFormFieldFloatingLabel",""]],hostAttrs:[1,"mdc-floating-label","mat-mdc-floating-label"],hostVars:2,hostBindings:function(i,r){i&2&&I("mdc-floating-label--float-above",r.floating)},inputs:{floating:"floating",monitorResize:"monitorResize"}})}return t})();function XT(t){let n=t;if(n.offsetParent!==null)return n.scrollWidth;let e=n.cloneNode(!0);e.style.setProperty("position","absolute"),e.style.setProperty("transform","translate(-9999px, -9999px)"),document.documentElement.appendChild(e);let i=e.scrollWidth;return e.remove(),i}var u0="mdc-line-ripple--active",xd="mdc-line-ripple--deactivating",f0=(()=>{class t{_elementRef=d(L);_cleanupTransitionEnd;constructor(){let e=d(A),i=d(Te);e.runOutsideAngular(()=>{this._cleanupTransitionEnd=i.listen(this._elementRef.nativeElement,"transitionend",this._handleTransitionEnd)})}activate(){let e=this._elementRef.nativeElement.classList;e.remove(xd),e.add(u0)}deactivate(){this._elementRef.nativeElement.classList.add(xd)}_handleTransitionEnd=e=>{let i=this._elementRef.nativeElement.classList,r=i.contains(xd);e.propertyName==="opacity"&&r&&i.remove(u0,xd)};ngOnDestroy(){this._cleanupTransitionEnd()}static \u0275fac=function(i){return new(i||t)};static \u0275dir=U({type:t,selectors:[["div","matFormFieldLineRipple",""]],hostAttrs:[1,"mdc-line-ripple"]})}return t})(),m0=(()=>{class t{_elementRef=d(L);_ngZone=d(A);open=!1;_notch;ngAfterViewInit(){let e=this._elementRef.nativeElement,i=e.querySelector(".mdc-floating-label");i?(e.classList.add("mdc-notched-outline--upgraded"),typeof requestAnimationFrame=="function"&&(i.style.transitionDuration="0s",this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>i.style.transitionDuration="")}))):e.classList.add("mdc-notched-outline--no-label")}_setNotchWidth(e){let i=this._notch.nativeElement;!this.open||!e?i.style.width="":i.style.width=`calc(${e}px * var(--mat-mdc-form-field-floating-label-scale, 0.75) + 9px)`}_setMaxWidth(e){this._notch.nativeElement.style.setProperty("--mat-form-field-notch-max-width",`calc(100% - ${e}px)`)}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["div","matFormFieldNotchedOutline",""]],viewQuery:function(i,r){if(i&1&&ve(IT,5),i&2){let o;K(o=Q())&&(r._notch=o.first)}},hostAttrs:[1,"mdc-notched-outline"],hostVars:2,hostBindings:function(i,r){i&2&&I("mdc-notched-outline--notched",r.open)},inputs:{open:[0,"matFormFieldNotchedOutlineOpen","open"]},attrs:ST,ngContentSelectors:kT,decls:5,vars:0,consts:[["notch",""],[1,"mat-mdc-notch-piece","mdc-notched-outline__leading"],[1,"mat-mdc-notch-piece","mdc-notched-outline__notch"],[1,"mat-mdc-notch-piece","mdc-notched-outline__trailing"]],template:function(i,r){i&1&&(Ne(),ct(0,"div",1),Ae(1,"div",2,0),ce(3),Ve(),ct(4,"div",3))},encapsulation:2,changeDetection:0})}return t})(),hp=(()=>{class t{value=null;stateChanges;id;placeholder;ngControl=null;focused=!1;empty=!1;shouldLabelFloat=!1;required=!1;disabled=!1;errorState=!1;controlType;autofilled;userAriaDescribedBy;disableAutomaticLabeling;describedByIds;static \u0275fac=function(i){return new(i||t)};static \u0275dir=U({type:t})}return t})();var pp=new b("MatFormField"),JT=new b("MAT_FORM_FIELD_DEFAULT_OPTIONS"),h0="fill",eA="auto",p0="fixed",tA="translateY(-50%)",Lo=(()=>{class t{_elementRef=d(L);_changeDetectorRef=d(xe);_platform=d(de);_idGenerator=d(Ie);_ngZone=d(A);_defaults=d(JT,{optional:!0});_currentDirection;_textField;_iconPrefixContainer;_textPrefixContainer;_iconSuffixContainer;_textSuffixContainer;_floatingLabel;_notchedOutline;_lineRipple;_iconPrefixContainerSignal=Xa("iconPrefixContainer");_textPrefixContainerSignal=Xa("textPrefixContainer");_iconSuffixContainerSignal=Xa("iconSuffixContainer");_textSuffixContainerSignal=Xa("textSuffixContainer");_prefixSuffixContainers=Me(()=>[this._iconPrefixContainerSignal(),this._textPrefixContainerSignal(),this._iconSuffixContainerSignal(),this._textSuffixContainerSignal()].map(e=>e?.nativeElement).filter(e=>e!==void 0));_formFieldControl;_prefixChildren;_suffixChildren;_errorChildren;_hintChildren;_labelChild=Cy(Fr);get hideRequiredMarker(){return this._hideRequiredMarker}set hideRequiredMarker(e){this._hideRequiredMarker=Qn(e)}_hideRequiredMarker=!1;color="primary";get floatLabel(){return this._floatLabel||this._defaults?.floatLabel||eA}set floatLabel(e){e!==this._floatLabel&&(this._floatLabel=e,this._changeDetectorRef.markForCheck())}_floatLabel;get appearance(){return this._appearanceSignal()}set appearance(e){let i=e||this._defaults?.appearance||h0;this._appearanceSignal.set(i)}_appearanceSignal=x(h0);get subscriptSizing(){return this._subscriptSizing||this._defaults?.subscriptSizing||p0}set subscriptSizing(e){this._subscriptSizing=e||this._defaults?.subscriptSizing||p0}_subscriptSizing=null;get hintLabel(){return this._hintLabel}set hintLabel(e){this._hintLabel=e,this._processHints()}_hintLabel="";_hasIconPrefix=!1;_hasTextPrefix=!1;_hasIconSuffix=!1;_hasTextSuffix=!1;_labelId=this._idGenerator.getId("mat-mdc-form-field-label-");_hintLabelId=this._idGenerator.getId("mat-mdc-hint-");_describedByIds;get _control(){return this._explicitFormFieldControl||this._formFieldControl}set _control(e){this._explicitFormFieldControl=e}_destroyed=new E;_isFocused=null;_explicitFormFieldControl;_previousControl=null;_previousControlValidatorFn=null;_stateChanges;_valueChanges;_describedByChanges;_outlineLabelOffsetResizeObserver=null;_animationsDisabled=we();constructor(){let e=this._defaults,i=d(qe);e&&(e.appearance&&(this.appearance=e.appearance),this._hideRequiredMarker=!!e?.hideRequiredMarker,e.color&&(this.color=e.color)),dn(()=>this._currentDirection=i.valueSignal()),this._syncOutlineLabelOffset()}ngAfterViewInit(){this._updateFocusState(),this._animationsDisabled||this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{this._elementRef.nativeElement.classList.add("mat-form-field-animations-enabled")},300)}),this._changeDetectorRef.detectChanges()}ngAfterContentInit(){this._assertFormFieldControl(),this._initializeSubscript(),this._initializePrefixAndSuffix()}ngAfterContentChecked(){this._assertFormFieldControl(),this._control!==this._previousControl&&(this._initializeControl(this._previousControl),this._control.ngControl&&this._control.ngControl.control&&(this._previousControlValidatorFn=this._control.ngControl.control.validator),this._previousControl=this._control),this._control.ngControl&&this._control.ngControl.control&&this._control.ngControl.control.validator!==this._previousControlValidatorFn&&this._changeDetectorRef.markForCheck()}ngOnDestroy(){this._outlineLabelOffsetResizeObserver?.disconnect(),this._stateChanges?.unsubscribe(),this._valueChanges?.unsubscribe(),this._describedByChanges?.unsubscribe(),this._destroyed.next(),this._destroyed.complete()}getLabelId=Me(()=>this._hasFloatingLabel()?this._labelId:null);getConnectedOverlayOrigin(){return this._textField||this._elementRef}_animateAndLockLabel(){this._hasFloatingLabel()&&(this.floatLabel="always")}_initializeControl(e){let i=this._control,r="mat-mdc-form-field-type-";e&&this._elementRef.nativeElement.classList.remove(r+e.controlType),i.controlType&&this._elementRef.nativeElement.classList.add(r+i.controlType),this._stateChanges?.unsubscribe(),this._stateChanges=i.stateChanges.subscribe(()=>{this._updateFocusState(),this._changeDetectorRef.markForCheck()}),this._describedByChanges?.unsubscribe(),this._describedByChanges=i.stateChanges.pipe(nt([void 0,void 0]),Ee(()=>[i.errorState,i.userAriaDescribedBy]),_l(),Le(([[o,a],[s,l]])=>o!==s||a!==l)).subscribe(()=>this._syncDescribedByIds()),this._valueChanges?.unsubscribe(),i.ngControl&&i.ngControl.valueChanges&&(this._valueChanges=i.ngControl.valueChanges.pipe(je(this._destroyed)).subscribe(()=>this._changeDetectorRef.markForCheck()))}_checkPrefixAndSuffixTypes(){this._hasIconPrefix=!!this._prefixChildren.find(e=>!e._isText),this._hasTextPrefix=!!this._prefixChildren.find(e=>e._isText),this._hasIconSuffix=!!this._suffixChildren.find(e=>!e._isText),this._hasTextSuffix=!!this._suffixChildren.find(e=>e._isText)}_initializePrefixAndSuffix(){this._checkPrefixAndSuffixTypes(),Bt(this._prefixChildren.changes,this._suffixChildren.changes).subscribe(()=>{this._checkPrefixAndSuffixTypes(),this._changeDetectorRef.markForCheck()})}_initializeSubscript(){this._hintChildren.changes.subscribe(()=>{this._processHints(),this._changeDetectorRef.markForCheck()}),this._errorChildren.changes.subscribe(()=>{this._syncDescribedByIds(),this._changeDetectorRef.markForCheck()}),this._validateHints(),this._syncDescribedByIds()}_assertFormFieldControl(){this._control}_updateFocusState(){let e=this._control.focused;e&&!this._isFocused?(this._isFocused=!0,this._lineRipple?.activate()):!e&&(this._isFocused||this._isFocused===null)&&(this._isFocused=!1,this._lineRipple?.deactivate()),this._elementRef.nativeElement.classList.toggle("mat-focused",e),this._textField?.nativeElement.classList.toggle("mdc-text-field--focused",e)}_syncOutlineLabelOffset(){Ey({earlyRead:()=>{if(this._appearanceSignal()!=="outline")return this._outlineLabelOffsetResizeObserver?.disconnect(),null;if(globalThis.ResizeObserver){this._outlineLabelOffsetResizeObserver||=new globalThis.ResizeObserver(()=>{this._writeOutlinedLabelStyles(this._getOutlinedLabelOffset())});for(let e of this._prefixSuffixContainers())this._outlineLabelOffsetResizeObserver.observe(e,{box:"border-box"})}return this._getOutlinedLabelOffset()},write:e=>this._writeOutlinedLabelStyles(e())})}_shouldAlwaysFloat(){return this.floatLabel==="always"}_hasOutline(){return this.appearance==="outline"}_forceDisplayInfixLabel(){return!this._platform.isBrowser&&this._prefixChildren.length&&!this._shouldLabelFloat()}_hasFloatingLabel=Me(()=>!!this._labelChild());_shouldLabelFloat(){return this._hasFloatingLabel()?this._control.shouldLabelFloat||this._shouldAlwaysFloat():!1}_shouldForward(e){let i=this._control?this._control.ngControl:null;return i&&i[e]}_getSubscriptMessageType(){return this._errorChildren&&this._errorChildren.length>0&&this._control.errorState?"error":"hint"}_handleLabelResized(){this._refreshOutlineNotchWidth()}_refreshOutlineNotchWidth(){!this._hasOutline()||!this._floatingLabel||!this._shouldLabelFloat()?this._notchedOutline?._setNotchWidth(0):this._notchedOutline?._setNotchWidth(this._floatingLabel.getWidth())}_processHints(){this._validateHints(),this._syncDescribedByIds()}_validateHints(){this._hintChildren}_syncDescribedByIds(){if(this._control){let e=[];if(this._control.userAriaDescribedBy&&typeof this._control.userAriaDescribedBy=="string"&&e.push(...this._control.userAriaDescribedBy.split(" ")),this._getSubscriptMessageType()==="hint"){let o=this._hintChildren?this._hintChildren.find(s=>s.align==="start"):null,a=this._hintChildren?this._hintChildren.find(s=>s.align==="end"):null;o?e.push(o.id):this._hintLabel&&e.push(this._hintLabelId),a&&e.push(a.id)}else this._errorChildren&&e.push(...this._errorChildren.map(o=>o.id));let i=this._control.describedByIds,r;if(i){let o=this._describedByIds||e;r=e.concat(i.filter(a=>a&&!o.includes(a)))}else r=e;this._control.setDescribedByIds(r),this._describedByIds=e}}_getOutlinedLabelOffset(){if(!this._hasOutline()||!this._floatingLabel)return null;if(!this._iconPrefixContainer&&!this._textPrefixContainer)return["",null];if(!this._isAttachedToDom())return null;let e=this._iconPrefixContainer?.nativeElement,i=this._textPrefixContainer?.nativeElement,r=this._iconSuffixContainer?.nativeElement,o=this._textSuffixContainer?.nativeElement,a=e?.getBoundingClientRect().width??0,s=i?.getBoundingClientRect().width??0,l=r?.getBoundingClientRect().width??0,c=o?.getBoundingClientRect().width??0,u=this._currentDirection==="rtl"?"-1":"1",f=`${a+s}px`,p=`calc(${u} * (${f} + var(--mat-mdc-form-field-label-offset-x, 0px)))`,v=`var(--mat-mdc-form-field-label-transform, ${tA} translateX(${p}))`,S=a+s+l+c;return[v,S]}_writeOutlinedLabelStyles(e){if(e!==null){let[i,r]=e;this._floatingLabel&&(this._floatingLabel.element.style.transform=i),r!==null&&this._notchedOutline?._setMaxWidth(r)}}_isAttachedToDom(){let e=this._elementRef.nativeElement;if(e.getRootNode){let i=e.getRootNode();return i&&i!==e}return document.documentElement.contains(e)}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["mat-form-field"]],contentQueries:function(i,r,o){if(i&1&&(Ac(o,r._labelChild,Fr,5),kn(o,hp,5)(o,QT,5)(o,g0,5)(o,KT,5)(o,vs,5)),i&2){Oc();let a;K(a=Q())&&(r._formFieldControl=a.first),K(a=Q())&&(r._prefixChildren=a),K(a=Q())&&(r._suffixChildren=a),K(a=Q())&&(r._errorChildren=a),K(a=Q())&&(r._hintChildren=a)}},viewQuery:function(i,r){if(i&1&&(Rc(r._iconPrefixContainerSignal,a0,5)(r._textPrefixContainerSignal,s0,5)(r._iconSuffixContainerSignal,l0,5)(r._textSuffixContainerSignal,c0,5),ve(TT,5)(a0,5)(s0,5)(l0,5)(c0,5)(d0,5)(m0,5)(f0,5)),i&2){Oc(4);let o;K(o=Q())&&(r._textField=o.first),K(o=Q())&&(r._iconPrefixContainer=o.first),K(o=Q())&&(r._textPrefixContainer=o.first),K(o=Q())&&(r._iconSuffixContainer=o.first),K(o=Q())&&(r._textSuffixContainer=o.first),K(o=Q())&&(r._floatingLabel=o.first),K(o=Q())&&(r._notchedOutline=o.first),K(o=Q())&&(r._lineRipple=o.first)}},hostAttrs:[1,"mat-mdc-form-field"],hostVars:38,hostBindings:function(i,r){i&2&&I("mat-mdc-form-field-label-always-float",r._shouldAlwaysFloat())("mat-mdc-form-field-has-icon-prefix",r._hasIconPrefix)("mat-mdc-form-field-has-icon-suffix",r._hasIconSuffix)("mat-form-field-invalid",r._control.errorState)("mat-form-field-disabled",r._control.disabled)("mat-form-field-autofilled",r._control.autofilled)("mat-form-field-appearance-fill",r.appearance=="fill")("mat-form-field-appearance-outline",r.appearance=="outline")("mat-form-field-hide-placeholder",r._hasFloatingLabel()&&!r._shouldLabelFloat())("mat-primary",r.color!=="accent"&&r.color!=="warn")("mat-accent",r.color==="accent")("mat-warn",r.color==="warn")("ng-untouched",r._shouldForward("untouched"))("ng-touched",r._shouldForward("touched"))("ng-pristine",r._shouldForward("pristine"))("ng-dirty",r._shouldForward("dirty"))("ng-valid",r._shouldForward("valid"))("ng-invalid",r._shouldForward("invalid"))("ng-pending",r._shouldForward("pending"))},inputs:{hideRequiredMarker:"hideRequiredMarker",color:"color",floatLabel:"floatLabel",appearance:"appearance",subscriptSizing:"subscriptSizing",hintLabel:"hintLabel"},exportAs:["matFormField"],features:[Be([{provide:pp,useExisting:t},{provide:_0,useExisting:t}])],ngContentSelectors:RT,decls:18,vars:21,consts:[["labelTemplate",""],["textField",""],["iconPrefixContainer",""],["textPrefixContainer",""],["textSuffixContainer",""],["iconSuffixContainer",""],[1,"mat-mdc-text-field-wrapper","mdc-text-field",3,"click"],[1,"mat-mdc-form-field-focus-overlay"],[1,"mat-mdc-form-field-flex"],["matFormFieldNotchedOutline","",3,"matFormFieldNotchedOutlineOpen"],[1,"mat-mdc-form-field-icon-prefix"],[1,"mat-mdc-form-field-text-prefix"],[1,"mat-mdc-form-field-infix"],[3,"ngTemplateOutlet"],[1,"mat-mdc-form-field-text-suffix"],[1,"mat-mdc-form-field-icon-suffix"],["matFormFieldLineRipple",""],["aria-atomic","true","aria-live","polite",1,"mat-mdc-form-field-subscript-wrapper","mat-mdc-form-field-bottom-align"],[1,"mat-mdc-form-field-error-wrapper"],[1,"mat-mdc-form-field-hint-wrapper"],["matFormFieldFloatingLabel","",3,"floating","monitorResize","id"],["aria-hidden","true",1,"mat-mdc-form-field-required-marker","mdc-floating-label--required"],[3,"id"],[1,"mat-mdc-form-field-hint-spacer"]],template:function(i,r){if(i&1&&(Ne(AT),it(0,FT,1,1,"ng-template",null,0,Ka),m(2,"div",6,1),M("click",function(a){return r._control.onContainerClick(a)}),V(4,PT,1,0,"div",7),m(5,"div",8),V(6,BT,2,2,"div",9),V(7,jT,3,0,"div",10),V(8,HT,3,0,"div",11),m(9,"div",12),V(10,zT,1,1,null,13),ce(11),h(),V(12,$T,3,0,"div",14),V(13,GT,3,0,"div",15),h(),V(14,WT,1,0,"div",16),h(),m(15,"div",17),V(16,YT,2,0,"div",18)(17,ZT,5,1,"div",19),h()),i&2){let o;_(2),I("mdc-text-field--filled",!r._hasOutline())("mdc-text-field--outlined",r._hasOutline())("mdc-text-field--no-label",!r._hasFloatingLabel())("mdc-text-field--disabled",r._control.disabled)("mdc-text-field--invalid",r._control.errorState),_(2),B(!r._hasOutline()&&!r._control.disabled?4:-1),_(2),B(r._hasOutline()?6:-1),_(),B(r._hasIconPrefix?7:-1),_(),B(r._hasTextPrefix?8:-1),_(2),B(!r._hasOutline()||r._forceDisplayInfixLabel()?10:-1),_(2),B(r._hasTextSuffix?12:-1),_(),B(r._hasIconSuffix?13:-1),_(),B(r._hasOutline()?-1:14),_(),I("mat-mdc-form-field-subscript-dynamic-size",r.subscriptSizing==="dynamic");let a=r._getSubscriptMessageType();_(),B((o=a)==="error"?16:o==="hint"?17:-1)}},dependencies:[d0,m0,es,f0,vs],styles:[`.mdc-text-field {
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
`],encapsulation:2,changeDetection:0})}return t})();var Pr=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=Z({type:t});static \u0275inj=q({imports:[Xc,Lo,ye]})}return t})();function v0(t){return Error(`Unable to find icon with the name "${t}"`)}function nA(){return Error("Could not find HttpClient for use with Angular Material icons. Please add provideHttpClient() to your providers.")}function y0(t){return Error(`The URL provided to MatIconRegistry was not trusted as a resource URL via Angular's DomSanitizer. Attempted URL was "${t}".`)}function D0(t){return Error(`The literal provided to MatIconRegistry was not trusted as safe HTML by Angular's DomSanitizer. Attempted literal was "${t}".`)}var ei=class{url;svgText;options;svgElement=null;constructor(n,e,i){this.url=n,this.svgText=e,this.options=i}},x0=(()=>{class t{_httpClient;_sanitizer;_errorHandler;_document;_svgIconConfigs=new Map;_iconSetConfigs=new Map;_cachedIconsByUrl=new Map;_inProgressUrlFetches=new Map;_fontCssClassesByAlias=new Map;_resolvers=[];_defaultFontSetClass=["material-icons","mat-ligature-font"];constructor(e,i,r,o){this._httpClient=e,this._sanitizer=i,this._errorHandler=o,this._document=r}addSvgIcon(e,i,r){return this.addSvgIconInNamespace("",e,i,r)}addSvgIconLiteral(e,i,r){return this.addSvgIconLiteralInNamespace("",e,i,r)}addSvgIconInNamespace(e,i,r,o){return this._addSvgIconConfig(e,i,new ei(r,null,o))}addSvgIconResolver(e){return this._resolvers.push(e),this}addSvgIconLiteralInNamespace(e,i,r,o){let a=this._sanitizer.sanitize(Je.HTML,r);if(!a)throw D0(r);let s=Mr(a);return this._addSvgIconConfig(e,i,new ei("",s,o))}addSvgIconSet(e,i){return this.addSvgIconSetInNamespace("",e,i)}addSvgIconSetLiteral(e,i){return this.addSvgIconSetLiteralInNamespace("",e,i)}addSvgIconSetInNamespace(e,i,r){return this._addSvgIconSetConfig(e,new ei(i,null,r))}addSvgIconSetLiteralInNamespace(e,i,r){let o=this._sanitizer.sanitize(Je.HTML,i);if(!o)throw D0(i);let a=Mr(o);return this._addSvgIconSetConfig(e,new ei("",a,r))}registerFontClassAlias(e,i=e){return this._fontCssClassesByAlias.set(e,i),this}classNameForFontAlias(e){return this._fontCssClassesByAlias.get(e)||e}setDefaultFontSetClass(...e){return this._defaultFontSetClass=e,this}getDefaultFontSetClass(){return this._defaultFontSetClass}getSvgIconFromUrl(e){let i=this._sanitizer.sanitize(Je.RESOURCE_URL,e);if(!i)throw y0(e);let r=this._cachedIconsByUrl.get(i);return r?Pe(wd(r)):this._loadSvgIconFromConfig(new ei(e,null)).pipe(Zi(o=>this._cachedIconsByUrl.set(i,o)),Ee(o=>wd(o)))}getNamedSvgIcon(e,i=""){let r=C0(i,e),o=this._svgIconConfigs.get(r);if(o)return this._getSvgFromConfig(o);if(o=this._getIconConfigFromResolvers(i,e),o)return this._svgIconConfigs.set(r,o),this._getSvgFromConfig(o);let a=this._iconSetConfigs.get(i);return a?this._getSvgFromIconSetConfigs(e,a):la(v0(r))}ngOnDestroy(){this._resolvers=[],this._svgIconConfigs.clear(),this._iconSetConfigs.clear(),this._cachedIconsByUrl.clear()}_getSvgFromConfig(e){return e.svgText?Pe(wd(this._svgElementFromConfig(e))):this._loadSvgIconFromConfig(e).pipe(Ee(i=>wd(i)))}_getSvgFromIconSetConfigs(e,i){let r=this._extractIconWithNameFromAnySet(e,i);if(r)return Pe(r);let o=i.filter(a=>!a.svgText).map(a=>this._loadSvgIconSetFromConfig(a).pipe(pl(s=>{let c=`Loading icon set URL: ${this._sanitizer.sanitize(Je.RESOURCE_URL,a.url)} failed: ${s.message}`;return this._errorHandler.handleError(new Error(c)),Pe(null)})));return Wi(o).pipe(Ee(()=>{let a=this._extractIconWithNameFromAnySet(e,i);if(!a)throw v0(e);return a}))}_extractIconWithNameFromAnySet(e,i){for(let r=i.length-1;r>=0;r--){let o=i[r];if(o.svgText&&o.svgText.toString().indexOf(e)>-1){let a=this._svgElementFromConfig(o),s=this._extractSvgIconFromSet(a,e,o.options);if(s)return s}}return null}_loadSvgIconFromConfig(e){return this._fetchIcon(e).pipe(Zi(i=>e.svgText=i),Ee(()=>this._svgElementFromConfig(e)))}_loadSvgIconSetFromConfig(e){return e.svgText?Pe(null):this._fetchIcon(e).pipe(Zi(i=>e.svgText=i))}_extractSvgIconFromSet(e,i,r){let o=e.querySelector(`[id="${i}"]`);if(!o)return null;let a=o.cloneNode(!0);if(a.removeAttribute("id"),a.nodeName.toLowerCase()==="svg")return this._setSvgAttributes(a,r);if(a.nodeName.toLowerCase()==="symbol")return this._setSvgAttributes(this._toSvgElement(a),r);let s=this._svgElementFromString(Mr("<svg></svg>"));return s.appendChild(a),this._setSvgAttributes(s,r)}_svgElementFromString(e){let i=this._document.createElement("DIV");i.innerHTML=e;let r=i.querySelector("svg");if(!r)throw Error("<svg> tag not found");return r}_toSvgElement(e){let i=this._svgElementFromString(Mr("<svg></svg>")),r=e.attributes;for(let o=0;o<r.length;o++){let{name:a,value:s}=r[o];a!=="id"&&i.setAttribute(a,s)}for(let o=0;o<e.childNodes.length;o++)e.childNodes[o].nodeType===this._document.ELEMENT_NODE&&i.appendChild(e.childNodes[o].cloneNode(!0));return i}_setSvgAttributes(e,i){return e.setAttribute("fit",""),e.setAttribute("height","100%"),e.setAttribute("width","100%"),e.setAttribute("preserveAspectRatio","xMidYMid meet"),e.setAttribute("focusable","false"),i&&i.viewBox&&e.setAttribute("viewBox",i.viewBox),e}_fetchIcon(e){let{url:i,options:r}=e,o=r?.withCredentials??!1;if(!this._httpClient)throw nA();if(i==null)throw Error(`Cannot fetch icon from URL "${i}".`);let a=this._sanitizer.sanitize(Je.RESOURCE_URL,i);if(!a)throw y0(i);let s=this._inProgressUrlFetches.get(a);if(s)return s;let l=this._httpClient.get(a,{responseType:"text",withCredentials:o}).pipe(Ee(c=>Mr(c)),ua(()=>this._inProgressUrlFetches.delete(a)),fa());return this._inProgressUrlFetches.set(a,l),l}_addSvgIconConfig(e,i,r){return this._svgIconConfigs.set(C0(e,i),r),this}_addSvgIconSetConfig(e,i){let r=this._iconSetConfigs.get(e);return r?r.push(i):this._iconSetConfigs.set(e,[i]),this}_svgElementFromConfig(e){if(!e.svgElement){let i=this._svgElementFromString(e.svgText);this._setSvgAttributes(i,e.options),e.svgElement=i}return e.svgElement}_getIconConfigFromResolvers(e,i){for(let r=0;r<this._resolvers.length;r++){let o=this._resolvers[r](i,e);if(o)return iA(o)?new ei(o.url,null,o.options):new ei(o,null)}}static \u0275fac=function(i){return new(i||t)(R(ut,8),R(xr),R(H,8),R(st))};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function wd(t){return t.cloneNode(!0)}function C0(t,n){return t+":"+n}function iA(t){return!!(t.url&&t.options)}var rA=["*"],oA=new b("MAT_ICON_DEFAULT_OPTIONS"),aA=new b("mat-icon-location",{providedIn:"root",factory:()=>{let t=d(H),n=t?t.location:null;return{getPathname:()=>n?n.pathname+n.search:""}}}),w0=["clip-path","color-profile","src","cursor","fill","filter","marker","marker-start","marker-mid","marker-end","mask","stroke"],sA=w0.map(t=>`[${t}]`).join(", "),lA=/^url\(['"]?#(.*?)['"]?\)$/,Xt=(()=>{class t{_elementRef=d(L);_iconRegistry=d(x0);_location=d(aA);_errorHandler=d(st);_defaultColor;get color(){return this._color||this._defaultColor}set color(e){this._color=e}_color;inline=!1;get svgIcon(){return this._svgIcon}set svgIcon(e){e!==this._svgIcon&&(e?this._updateSvgIcon(e):this._svgIcon&&this._clearSvgElement(),this._svgIcon=e)}_svgIcon;get fontSet(){return this._fontSet}set fontSet(e){let i=this._cleanupFontValue(e);i!==this._fontSet&&(this._fontSet=i,this._updateFontIconClasses())}_fontSet;get fontIcon(){return this._fontIcon}set fontIcon(e){let i=this._cleanupFontValue(e);i!==this._fontIcon&&(this._fontIcon=i,this._updateFontIconClasses())}_fontIcon;_previousFontSetClass=[];_previousFontIconClass;_svgName=null;_svgNamespace=null;_previousPath;_elementsWithExternalReferences;_currentIconFetch=ue.EMPTY;constructor(){let e=d(new Tn("aria-hidden"),{optional:!0}),i=d(oA,{optional:!0});i&&(i.color&&(this.color=this._defaultColor=i.color),i.fontSet&&(this.fontSet=i.fontSet)),e||this._elementRef.nativeElement.setAttribute("aria-hidden","true")}_splitIconName(e){if(!e)return["",""];let i=e.split(":");switch(i.length){case 1:return["",i[0]];case 2:return i;default:throw Error(`Invalid icon name: "${e}"`)}}ngOnInit(){this._updateFontIconClasses()}ngAfterViewChecked(){let e=this._elementsWithExternalReferences;if(e&&e.size){let i=this._location.getPathname();i!==this._previousPath&&(this._previousPath=i,this._prependPathToReferences(i))}}ngOnDestroy(){this._currentIconFetch.unsubscribe(),this._elementsWithExternalReferences&&this._elementsWithExternalReferences.clear()}_usingFontIcon(){return!this.svgIcon}_setSvgElement(e){this._clearSvgElement();let i=this._location.getPathname();this._previousPath=i,this._cacheChildrenWithExternalReferences(e),this._prependPathToReferences(i),this._elementRef.nativeElement.appendChild(e)}_clearSvgElement(){let e=this._elementRef.nativeElement,i=e.childNodes.length;for(this._elementsWithExternalReferences&&this._elementsWithExternalReferences.clear();i--;){let r=e.childNodes[i];(r.nodeType!==1||r.nodeName.toLowerCase()==="svg")&&r.remove()}}_updateFontIconClasses(){if(!this._usingFontIcon())return;let e=this._elementRef.nativeElement,i=(this.fontSet?this._iconRegistry.classNameForFontAlias(this.fontSet).split(/ +/):this._iconRegistry.getDefaultFontSetClass()).filter(r=>r.length>0);this._previousFontSetClass.forEach(r=>e.classList.remove(r)),i.forEach(r=>e.classList.add(r)),this._previousFontSetClass=i,this.fontIcon!==this._previousFontIconClass&&!i.includes("mat-ligature-font")&&(this._previousFontIconClass&&e.classList.remove(this._previousFontIconClass),this.fontIcon&&e.classList.add(this.fontIcon),this._previousFontIconClass=this.fontIcon)}_cleanupFontValue(e){return typeof e=="string"?e.trim().split(" ")[0]:e}_prependPathToReferences(e){let i=this._elementsWithExternalReferences;i&&i.forEach((r,o)=>{r.forEach(a=>{o.setAttribute(a.name,`url('${e}#${a.value}')`)})})}_cacheChildrenWithExternalReferences(e){let i=e.querySelectorAll(sA),r=this._elementsWithExternalReferences=this._elementsWithExternalReferences||new Map;for(let o=0;o<i.length;o++)w0.forEach(a=>{let s=i[o],l=s.getAttribute(a),c=l?l.match(lA):null;if(c){let u=r.get(s);u||(u=[],r.set(s,u)),u.push({name:a,value:c[1]})}})}_updateSvgIcon(e){if(this._svgNamespace=null,this._svgName=null,this._currentIconFetch.unsubscribe(),e){let[i,r]=this._splitIconName(e);i&&(this._svgNamespace=i),r&&(this._svgName=r),this._currentIconFetch=this._iconRegistry.getNamedSvgIcon(r,i).pipe(vt(1)).subscribe(o=>this._setSvgElement(o),o=>{let a=`Error retrieving icon ${i}:${r}! ${o.message}`;this._errorHandler.handleError(new Error(a))})}}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["mat-icon"]],hostAttrs:["role","img",1,"mat-icon","notranslate"],hostVars:10,hostBindings:function(i,r){i&2&&(P("data-mat-icon-type",r._usingFontIcon()?"font":"svg")("data-mat-icon-name",r._svgName||r.fontIcon)("data-mat-icon-namespace",r._svgNamespace||r.fontSet)("fontIcon",r._usingFontIcon()?r.fontIcon:null),rt(r.color?"mat-"+r.color:""),I("mat-icon-inline",r.inline)("mat-icon-no-color",r.color!=="primary"&&r.color!=="accent"&&r.color!=="warn"))},inputs:{color:"color",inline:[2,"inline","inline",ie],svgIcon:"svgIcon",fontSet:"fontSet",fontIcon:"fontIcon"},exportAs:["matIcon"],ngContentSelectors:rA,decls:1,vars:0,template:function(i,r){i&1&&(Ne(),ce(0))},styles:[`mat-icon, mat-icon.mat-primary, mat-icon.mat-accent, mat-icon.mat-warn {
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
`],encapsulation:2,changeDetection:0})}return t})(),Jt=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=Z({type:t});static \u0275inj=q({imports:[ye]})}return t})();var cA=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["ng-component"]],hostAttrs:["cdk-text-field-style-loader",""],decls:0,vars:0,template:function(i,r){},styles:[`textarea.cdk-textarea-autosize {
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
`],encapsulation:2,changeDetection:0})}return t})(),dA={passive:!0},E0=(()=>{class t{_platform=d(de);_ngZone=d(A);_renderer=d(Ge).createRenderer(null,null);_styleLoader=d(Re);_monitoredElements=new Map;constructor(){}monitor(e){if(!this._platform.isBrowser)return $i;this._styleLoader.load(cA);let i=Ot(e),r=this._monitoredElements.get(i);if(r)return r.subject;let o=new E,a="cdk-text-field-autofilled",s=c=>{c.animationName==="cdk-text-field-autofill-start"&&!i.classList.contains(a)?(i.classList.add(a),this._ngZone.run(()=>o.next({target:c.target,isAutofilled:!0}))):c.animationName==="cdk-text-field-autofill-end"&&i.classList.contains(a)&&(i.classList.remove(a),this._ngZone.run(()=>o.next({target:c.target,isAutofilled:!1})))},l=this._ngZone.runOutsideAngular(()=>(i.classList.add("cdk-text-field-autofill-monitored"),this._renderer.listen(i,"animationstart",s,dA)));return this._monitoredElements.set(i,{subject:o,unlisten:l}),o}stopMonitoring(e){let i=Ot(e),r=this._monitoredElements.get(i);r&&(r.unlisten(),r.subject.complete(),i.classList.remove("cdk-text-field-autofill-monitored"),i.classList.remove("cdk-text-field-autofilled"),this._monitoredElements.delete(i))}ngOnDestroy(){this._monitoredElements.forEach((e,i)=>this.stopMonitoring(i))}static \u0275fac=function(i){return new(i||t)};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var M0=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=Z({type:t});static \u0275inj=q({})}return t})();var N0=(()=>{class t{_renderer;_elementRef;onChange=e=>{};onTouched=()=>{};constructor(e,i){this._renderer=e,this._elementRef=i}setProperty(e,i){this._renderer.setProperty(this._elementRef.nativeElement,e,i)}registerOnTouched(e){this.onTouched=e}registerOnChange(e){this.onChange=e}setDisabledState(e){this.setProperty("disabled",e)}static \u0275fac=function(i){return new(i||t)(ee(Te),ee(L))};static \u0275dir=U({type:t})}return t})(),uA=(()=>{class t extends N0{static \u0275fac=(()=>{let e;return function(r){return(e||(e=Rt(t)))(r||t)}})();static \u0275dir=U({type:t,features:[_e]})}return t})(),zo=new b("");var fA={provide:zo,useExisting:ht(()=>Fd),multi:!0};function mA(){let t=qt()?qt().getUserAgent():"";return/android (\d+)/.test(t.toLowerCase())}var hA=new b(""),Fd=(()=>{class t extends N0{_compositionMode;_composing=!1;constructor(e,i,r){super(e,i),this._compositionMode=r,this._compositionMode==null&&(this._compositionMode=!mA())}writeValue(e){let i=e??"";this.setProperty("value",i)}_handleInput(e){(!this._compositionMode||this._compositionMode&&!this._composing)&&this.onChange(e)}_compositionStart(){this._composing=!0}_compositionEnd(e){this._composing=!1,this._compositionMode&&this.onChange(e)}static \u0275fac=function(i){return new(i||t)(ee(Te),ee(L),ee(hA,8))};static \u0275dir=U({type:t,selectors:[["input","formControlName","",3,"type","checkbox"],["textarea","formControlName",""],["input","formControl","",3,"type","checkbox"],["textarea","formControl",""],["input","ngModel","",3,"type","checkbox"],["textarea","ngModel",""],["","ngDefaultControl",""]],hostBindings:function(i,r){i&1&&M("input",function(a){return r._handleInput(a.target.value)})("blur",function(){return r.onTouched()})("compositionstart",function(){return r._compositionStart()})("compositionend",function(a){return r._compositionEnd(a.target.value)})},standalone:!1,features:[Be([fA]),_e]})}return t})();function yp(t){return t==null||Dp(t)===0}function Dp(t){return t==null?null:Array.isArray(t)||typeof t=="string"?t.length:t instanceof Set?t.size:null}var Ms=new b(""),Cp=new b(""),pA=/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,Id=class{static min(n){return gA(n)}static max(n){return _A(n)}static required(n){return bA(n)}static requiredTrue(n){return vA(n)}static email(n){return yA(n)}static minLength(n){return DA(n)}static maxLength(n){return CA(n)}static pattern(n){return xA(n)}static nullValidator(n){return F0()}static compose(n){return H0(n)}static composeAsync(n){return U0(n)}};function gA(t){return n=>{if(n.value==null||t==null)return null;let e=parseFloat(n.value);return!isNaN(e)&&e<t?{min:{min:t,actual:n.value}}:null}}function _A(t){return n=>{if(n.value==null||t==null)return null;let e=parseFloat(n.value);return!isNaN(e)&&e>t?{max:{max:t,actual:n.value}}:null}}function bA(t){return yp(t.value)?{required:!0}:null}function vA(t){return t.value===!0?null:{required:!0}}function yA(t){return yp(t.value)||pA.test(t.value)?null:{email:!0}}function DA(t){return n=>{let e=n.value?.length??Dp(n.value);return e===null||e===0?null:e<t?{minlength:{requiredLength:t,actualLength:e}}:null}}function CA(t){return n=>{let e=n.value?.length??Dp(n.value);return e!==null&&e>t?{maxlength:{requiredLength:t,actualLength:e}}:null}}function xA(t){if(!t)return F0;let n,e;return typeof t=="string"?(e="",t.charAt(0)!=="^"&&(e+="^"),e+=t,t.charAt(t.length-1)!=="$"&&(e+="$"),n=new RegExp(e)):(e=t.toString(),n=t),i=>{if(yp(i.value))return null;let r=i.value;return n.test(r)?null:{pattern:{requiredPattern:e,actualValue:r}}}}function F0(t){return null}function P0(t){return t!=null}function L0(t){return bo(t)?Vt(t):t}function V0(t){let n={};return t.forEach(e=>{n=e!=null?w(w({},n),e):n}),Object.keys(n).length===0?null:n}function B0(t,n){return n.map(e=>e(t))}function wA(t){return!t.validate}function j0(t){return t.map(n=>wA(n)?n:e=>n.validate(e))}function H0(t){if(!t)return null;let n=t.filter(P0);return n.length==0?null:function(e){return V0(B0(e,n))}}function xp(t){return t!=null?H0(j0(t)):null}function U0(t){if(!t)return null;let n=t.filter(P0);return n.length==0?null:function(e){let i=B0(e,n).map(L0);return Wi(i).pipe(Ee(V0))}}function wp(t){return t!=null?U0(j0(t)):null}function I0(t,n){return t===null?[n]:Array.isArray(t)?[...t,n]:[t,n]}function z0(t){return t._rawValidators}function $0(t){return t._rawAsyncValidators}function gp(t){return t?Array.isArray(t)?t:[t]:[]}function Sd(t,n){return Array.isArray(t)?t.includes(n):t===n}function S0(t,n){let e=gp(n);return gp(t).forEach(r=>{Sd(e,r)||e.push(r)}),e}function k0(t,n){return gp(n).filter(e=>!Sd(t,e))}var kd=class{get value(){return this.control?this.control.value:null}get valid(){return this.control?this.control.valid:null}get invalid(){return this.control?this.control.invalid:null}get pending(){return this.control?this.control.pending:null}get disabled(){return this.control?this.control.disabled:null}get enabled(){return this.control?this.control.enabled:null}get errors(){return this.control?this.control.errors:null}get pristine(){return this.control?this.control.pristine:null}get dirty(){return this.control?this.control.dirty:null}get touched(){return this.control?this.control.touched:null}get status(){return this.control?this.control.status:null}get untouched(){return this.control?this.control.untouched:null}get statusChanges(){return this.control?this.control.statusChanges:null}get valueChanges(){return this.control?this.control.valueChanges:null}get path(){return null}_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators=[];_rawAsyncValidators=[];_setValidators(n){this._rawValidators=n||[],this._composedValidatorFn=xp(this._rawValidators)}_setAsyncValidators(n){this._rawAsyncValidators=n||[],this._composedAsyncValidatorFn=wp(this._rawAsyncValidators)}get validator(){return this._composedValidatorFn||null}get asyncValidator(){return this._composedAsyncValidatorFn||null}_onDestroyCallbacks=[];_registerOnDestroy(n){this._onDestroyCallbacks.push(n)}_invokeOnDestroyCallbacks(){this._onDestroyCallbacks.forEach(n=>n()),this._onDestroyCallbacks=[]}reset(n=void 0){this.control?.reset(n)}hasError(n,e){return this.control?this.control.hasError(n,e):!1}getError(n,e){return this.control?this.control.getError(n,e):null}},Oi=class extends kd{name;get formDirective(){return null}get path(){return null}},Lr=class extends kd{_parent=null;name=null;valueAccessor=null},Td=class{_cd;constructor(n){this._cd=n}get isTouched(){return this._cd?.control?._touched?.(),!!this._cd?.control?.touched}get isUntouched(){return!!this._cd?.control?.untouched}get isPristine(){return this._cd?.control?._pristine?.(),!!this._cd?.control?.pristine}get isDirty(){return!!this._cd?.control?.dirty}get isValid(){return this._cd?.control?._status?.(),!!this._cd?.control?.valid}get isInvalid(){return!!this._cd?.control?.invalid}get isPending(){return!!this._cd?.control?.pending}get isSubmitted(){return this._cd?._submitted?.(),!!this._cd?.submitted}};var G0=(()=>{class t extends Td{constructor(e){super(e)}static \u0275fac=function(i){return new(i||t)(ee(Lr,2))};static \u0275dir=U({type:t,selectors:[["","formControlName",""],["","ngModel",""],["","formControl",""]],hostVars:14,hostBindings:function(i,r){i&2&&I("ng-untouched",r.isUntouched)("ng-touched",r.isTouched)("ng-pristine",r.isPristine)("ng-dirty",r.isDirty)("ng-valid",r.isValid)("ng-invalid",r.isInvalid)("ng-pending",r.isPending)},standalone:!1,features:[_e]})}return t})(),W0=(()=>{class t extends Td{constructor(e){super(e)}static \u0275fac=function(i){return new(i||t)(ee(Oi,10))};static \u0275dir=U({type:t,selectors:[["","formGroupName",""],["","formArrayName",""],["","ngModelGroup",""],["","formGroup",""],["","formArray",""],["form",3,"ngNoForm",""],["","ngForm",""]],hostVars:16,hostBindings:function(i,r){i&2&&I("ng-untouched",r.isUntouched)("ng-touched",r.isTouched)("ng-pristine",r.isPristine)("ng-dirty",r.isDirty)("ng-valid",r.isValid)("ng-invalid",r.isInvalid)("ng-pending",r.isPending)("ng-submitted",r.isSubmitted)},standalone:!1,features:[_e]})}return t})();var ys="VALID",Ed="INVALID",Bo="PENDING",Ds="DISABLED",Ni=class{},Ad=class extends Ni{value;source;constructor(n,e){super(),this.value=n,this.source=e}},xs=class extends Ni{pristine;source;constructor(n,e){super(),this.pristine=n,this.source=e}},ws=class extends Ni{touched;source;constructor(n,e){super(),this.touched=n,this.source=e}},jo=class extends Ni{status;source;constructor(n,e){super(),this.status=n,this.source=e}},Rd=class extends Ni{source;constructor(n){super(),this.source=n}},Es=class extends Ni{source;constructor(n){super(),this.source=n}};function Ep(t){return(Pd(t)?t.validators:t)||null}function EA(t){return Array.isArray(t)?xp(t):t||null}function Mp(t,n){return(Pd(n)?n.asyncValidators:t)||null}function MA(t){return Array.isArray(t)?wp(t):t||null}function Pd(t){return t!=null&&!Array.isArray(t)&&typeof t=="object"}function Y0(t,n,e){let i=t.controls;if(!(n?Object.keys(i):i).length)throw new $(1e3,"");if(!i[e])throw new $(1001,"")}function q0(t,n,e){t._forEachChild((i,r)=>{if(e[r]===void 0)throw new $(-1002,"")})}var Ho=class{_pendingDirty=!1;_hasOwnPendingAsyncValidator=null;_pendingTouched=!1;_onCollectionChange=()=>{};_updateOn;_parent=null;_asyncValidationSubscription;_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators;_rawAsyncValidators;value;constructor(n,e){this._assignValidators(n),this._assignAsyncValidators(e)}get validator(){return this._composedValidatorFn}set validator(n){this._rawValidators=this._composedValidatorFn=n}get asyncValidator(){return this._composedAsyncValidatorFn}set asyncValidator(n){this._rawAsyncValidators=this._composedAsyncValidatorFn=n}get parent(){return this._parent}get status(){return Wt(this.statusReactive)}set status(n){Wt(()=>this.statusReactive.set(n))}_status=Me(()=>this.statusReactive());statusReactive=x(void 0);get valid(){return this.status===ys}get invalid(){return this.status===Ed}get pending(){return this.status===Bo}get disabled(){return this.status===Ds}get enabled(){return this.status!==Ds}errors;get pristine(){return Wt(this.pristineReactive)}set pristine(n){Wt(()=>this.pristineReactive.set(n))}_pristine=Me(()=>this.pristineReactive());pristineReactive=x(!0);get dirty(){return!this.pristine}get touched(){return Wt(this.touchedReactive)}set touched(n){Wt(()=>this.touchedReactive.set(n))}_touched=Me(()=>this.touchedReactive());touchedReactive=x(!1);get untouched(){return!this.touched}_events=new E;events=this._events.asObservable();valueChanges;statusChanges;get updateOn(){return this._updateOn?this._updateOn:this.parent?this.parent.updateOn:"change"}setValidators(n){this._assignValidators(n)}setAsyncValidators(n){this._assignAsyncValidators(n)}addValidators(n){this.setValidators(S0(n,this._rawValidators))}addAsyncValidators(n){this.setAsyncValidators(S0(n,this._rawAsyncValidators))}removeValidators(n){this.setValidators(k0(n,this._rawValidators))}removeAsyncValidators(n){this.setAsyncValidators(k0(n,this._rawAsyncValidators))}hasValidator(n){return Sd(this._rawValidators,n)}hasAsyncValidator(n){return Sd(this._rawAsyncValidators,n)}clearValidators(){this.validator=null}clearAsyncValidators(){this.asyncValidator=null}markAsTouched(n={}){let e=this.touched===!1;this.touched=!0;let i=n.sourceControl??this;n.onlySelf||this._parent?.markAsTouched(ae(w({},n),{sourceControl:i})),e&&n.emitEvent!==!1&&this._events.next(new ws(!0,i))}markAllAsDirty(n={}){this.markAsDirty({onlySelf:!0,emitEvent:n.emitEvent,sourceControl:this}),this._forEachChild(e=>e.markAllAsDirty(n))}markAllAsTouched(n={}){this.markAsTouched({onlySelf:!0,emitEvent:n.emitEvent,sourceControl:this}),this._forEachChild(e=>e.markAllAsTouched(n))}markAsUntouched(n={}){let e=this.touched===!0;this.touched=!1,this._pendingTouched=!1;let i=n.sourceControl??this;this._forEachChild(r=>{r.markAsUntouched({onlySelf:!0,emitEvent:n.emitEvent,sourceControl:i})}),n.onlySelf||this._parent?._updateTouched(n,i),e&&n.emitEvent!==!1&&this._events.next(new ws(!1,i))}markAsDirty(n={}){let e=this.pristine===!0;this.pristine=!1;let i=n.sourceControl??this;n.onlySelf||this._parent?.markAsDirty(ae(w({},n),{sourceControl:i})),e&&n.emitEvent!==!1&&this._events.next(new xs(!1,i))}markAsPristine(n={}){let e=this.pristine===!1;this.pristine=!0,this._pendingDirty=!1;let i=n.sourceControl??this;this._forEachChild(r=>{r.markAsPristine({onlySelf:!0,emitEvent:n.emitEvent})}),n.onlySelf||this._parent?._updatePristine(n,i),e&&n.emitEvent!==!1&&this._events.next(new xs(!0,i))}markAsPending(n={}){this.status=Bo;let e=n.sourceControl??this;n.emitEvent!==!1&&(this._events.next(new jo(this.status,e)),this.statusChanges.emit(this.status)),n.onlySelf||this._parent?.markAsPending(ae(w({},n),{sourceControl:e}))}disable(n={}){let e=this._parentMarkedDirty(n.onlySelf);this.status=Ds,this.errors=null,this._forEachChild(r=>{r.disable(ae(w({},n),{onlySelf:!0}))}),this._updateValue();let i=n.sourceControl??this;n.emitEvent!==!1&&(this._events.next(new Ad(this.value,i)),this._events.next(new jo(this.status,i)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._updateAncestors(ae(w({},n),{skipPristineCheck:e}),this),this._onDisabledChange.forEach(r=>r(!0))}enable(n={}){let e=this._parentMarkedDirty(n.onlySelf);this.status=ys,this._forEachChild(i=>{i.enable(ae(w({},n),{onlySelf:!0}))}),this.updateValueAndValidity({onlySelf:!0,emitEvent:n.emitEvent}),this._updateAncestors(ae(w({},n),{skipPristineCheck:e}),this),this._onDisabledChange.forEach(i=>i(!1))}_updateAncestors(n,e){n.onlySelf||(this._parent?.updateValueAndValidity(n),n.skipPristineCheck||this._parent?._updatePristine({},e),this._parent?._updateTouched({},e))}setParent(n){this._parent=n}getRawValue(){return this.value}updateValueAndValidity(n={}){if(this._setInitialStatus(),this._updateValue(),this.enabled){let i=this._cancelExistingSubscription();this.errors=this._runValidator(),this.status=this._calculateStatus(),(this.status===ys||this.status===Bo)&&this._runAsyncValidator(i,n.emitEvent)}let e=n.sourceControl??this;n.emitEvent!==!1&&(this._events.next(new Ad(this.value,e)),this._events.next(new jo(this.status,e)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),n.onlySelf||this._parent?.updateValueAndValidity(ae(w({},n),{sourceControl:e}))}_updateTreeValidity(n={emitEvent:!0}){this._forEachChild(e=>e._updateTreeValidity(n)),this.updateValueAndValidity({onlySelf:!0,emitEvent:n.emitEvent})}_setInitialStatus(){this.status=this._allControlsDisabled()?Ds:ys}_runValidator(){return this.validator?this.validator(this):null}_runAsyncValidator(n,e){if(this.asyncValidator){this.status=Bo,this._hasOwnPendingAsyncValidator={emitEvent:e!==!1,shouldHaveEmitted:n!==!1};let i=L0(this.asyncValidator(this));this._asyncValidationSubscription=i.subscribe(r=>{this._hasOwnPendingAsyncValidator=null,this.setErrors(r,{emitEvent:e,shouldHaveEmitted:n})})}}_cancelExistingSubscription(){if(this._asyncValidationSubscription){this._asyncValidationSubscription.unsubscribe();let n=(this._hasOwnPendingAsyncValidator?.emitEvent||this._hasOwnPendingAsyncValidator?.shouldHaveEmitted)??!1;return this._hasOwnPendingAsyncValidator=null,n}return!1}setErrors(n,e={}){this.errors=n,this._updateControlsErrors(e.emitEvent!==!1,this,e.shouldHaveEmitted)}get(n){let e=n;return e==null||(Array.isArray(e)||(e=e.split(".")),e.length===0)?null:e.reduce((i,r)=>i&&i._find(r),this)}getError(n,e){let i=e?this.get(e):this;return i?.errors?i.errors[n]:null}hasError(n,e){return!!this.getError(n,e)}get root(){let n=this;for(;n._parent;)n=n._parent;return n}_updateControlsErrors(n,e,i){this.status=this._calculateStatus(),n&&this.statusChanges.emit(this.status),(n||i)&&this._events.next(new jo(this.status,e)),this._parent&&this._parent._updateControlsErrors(n,e,i)}_initObservables(){this.valueChanges=new F,this.statusChanges=new F}_calculateStatus(){return this._allControlsDisabled()?Ds:this.errors?Ed:this._hasOwnPendingAsyncValidator||this._anyControlsHaveStatus(Bo)?Bo:this._anyControlsHaveStatus(Ed)?Ed:ys}_anyControlsHaveStatus(n){return this._anyControls(e=>e.status===n)}_anyControlsDirty(){return this._anyControls(n=>n.dirty)}_anyControlsTouched(){return this._anyControls(n=>n.touched)}_updatePristine(n,e){let i=!this._anyControlsDirty(),r=this.pristine!==i;this.pristine=i,n.onlySelf||this._parent?._updatePristine(n,e),r&&this._events.next(new xs(this.pristine,e))}_updateTouched(n={},e){this.touched=this._anyControlsTouched(),this._events.next(new ws(this.touched,e)),n.onlySelf||this._parent?._updateTouched(n,e)}_onDisabledChange=[];_registerOnCollectionChange(n){this._onCollectionChange=n}_setUpdateStrategy(n){Pd(n)&&n.updateOn!=null&&(this._updateOn=n.updateOn)}_parentMarkedDirty(n){return!n&&!!this._parent?.dirty&&!this._parent._anyControlsDirty()}_find(n){return null}_assignValidators(n){this._rawValidators=Array.isArray(n)?n.slice():n,this._composedValidatorFn=EA(this._rawValidators)}_assignAsyncValidators(n){this._rawAsyncValidators=Array.isArray(n)?n.slice():n,this._composedAsyncValidatorFn=MA(this._rawAsyncValidators)}},Uo=class extends Ho{constructor(n,e,i){super(Ep(e),Mp(i,e)),this.controls=n,this._initObservables(),this._setUpdateStrategy(e),this._setUpControls(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator})}controls;registerControl(n,e){return this.controls[n]?this.controls[n]:(this.controls[n]=e,e.setParent(this),e._registerOnCollectionChange(this._onCollectionChange),e)}addControl(n,e,i={}){this.registerControl(n,e),this.updateValueAndValidity({emitEvent:i.emitEvent}),this._onCollectionChange()}removeControl(n,e={}){this.controls[n]&&this.controls[n]._registerOnCollectionChange(()=>{}),delete this.controls[n],this.updateValueAndValidity({emitEvent:e.emitEvent}),this._onCollectionChange()}setControl(n,e,i={}){this.controls[n]&&this.controls[n]._registerOnCollectionChange(()=>{}),delete this.controls[n],e&&this.registerControl(n,e),this.updateValueAndValidity({emitEvent:i.emitEvent}),this._onCollectionChange()}contains(n){return this.controls.hasOwnProperty(n)&&this.controls[n].enabled}setValue(n,e={}){q0(this,!0,n),Object.keys(n).forEach(i=>{Y0(this,!0,i),this.controls[i].setValue(n[i],{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e)}patchValue(n,e={}){n!=null&&(Object.keys(n).forEach(i=>{let r=this.controls[i];r&&r.patchValue(n[i],{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e))}reset(n={},e={}){this._forEachChild((i,r)=>{i.reset(n?n[r]:null,ae(w({},e),{onlySelf:!0}))}),this._updatePristine(e,this),this._updateTouched(e,this),this.updateValueAndValidity(e),e?.emitEvent!==!1&&this._events.next(new Es(this))}getRawValue(){return this._reduceChildren({},(n,e,i)=>(n[i]=e.getRawValue(),n))}_syncPendingControls(){let n=this._reduceChildren(!1,(e,i)=>i._syncPendingControls()?!0:e);return n&&this.updateValueAndValidity({onlySelf:!0}),n}_forEachChild(n){Object.keys(this.controls).forEach(e=>{let i=this.controls[e];i&&n(i,e)})}_setUpControls(){this._forEachChild(n=>{n.setParent(this),n._registerOnCollectionChange(this._onCollectionChange)})}_updateValue(){this.value=this._reduceValue()}_anyControls(n){for(let[e,i]of Object.entries(this.controls))if(this.contains(e)&&n(i))return!0;return!1}_reduceValue(){let n={};return this._reduceChildren(n,(e,i,r)=>((i.enabled||this.disabled)&&(e[r]=i.value),e))}_reduceChildren(n,e){let i=n;return this._forEachChild((r,o)=>{i=e(i,r,o)}),i}_allControlsDisabled(){for(let n of Object.keys(this.controls))if(this.controls[n].enabled)return!1;return Object.keys(this.controls).length>0||this.disabled}_find(n){return this.controls.hasOwnProperty(n)?this.controls[n]:null}};var _p=class extends Uo{};var Ip=new b("",{factory:()=>Sp}),Sp="always";function IA(t,n){return[...n.path,t]}function bp(t,n,e=Sp){kp(t,n),n.valueAccessor.writeValue(t.value),(t.disabled||e==="always")&&n.valueAccessor.setDisabledState?.(t.disabled),kA(t,n),AA(t,n),TA(t,n),SA(t,n)}function T0(t,n,e=!0){let i=()=>{};n?.valueAccessor?.registerOnChange(i),n?.valueAccessor?.registerOnTouched(i),Nd(t,n),t&&(n._invokeOnDestroyCallbacks(),t._registerOnCollectionChange(()=>{}))}function Od(t,n){t.forEach(e=>{e.registerOnValidatorChange&&e.registerOnValidatorChange(n)})}function SA(t,n){if(n.valueAccessor.setDisabledState){let e=i=>{n.valueAccessor.setDisabledState(i)};t.registerOnDisabledChange(e),n._registerOnDestroy(()=>{t._unregisterOnDisabledChange(e)})}}function kp(t,n){let e=z0(t);n.validator!==null?t.setValidators(I0(e,n.validator)):typeof e=="function"&&t.setValidators([e]);let i=$0(t);n.asyncValidator!==null?t.setAsyncValidators(I0(i,n.asyncValidator)):typeof i=="function"&&t.setAsyncValidators([i]);let r=()=>t.updateValueAndValidity();Od(n._rawValidators,r),Od(n._rawAsyncValidators,r)}function Nd(t,n){let e=!1;if(t!==null){if(n.validator!==null){let r=z0(t);if(Array.isArray(r)&&r.length>0){let o=r.filter(a=>a!==n.validator);o.length!==r.length&&(e=!0,t.setValidators(o))}}if(n.asyncValidator!==null){let r=$0(t);if(Array.isArray(r)&&r.length>0){let o=r.filter(a=>a!==n.asyncValidator);o.length!==r.length&&(e=!0,t.setAsyncValidators(o))}}}let i=()=>{};return Od(n._rawValidators,i),Od(n._rawAsyncValidators,i),e}function kA(t,n){n.valueAccessor.registerOnChange(e=>{t._pendingValue=e,t._pendingChange=!0,t._pendingDirty=!0,t.updateOn==="change"&&Z0(t,n)})}function TA(t,n){n.valueAccessor.registerOnTouched(()=>{t._pendingTouched=!0,t.updateOn==="blur"&&t._pendingChange&&Z0(t,n),t.updateOn!=="submit"&&t.markAsTouched()})}function Z0(t,n){t._pendingDirty&&t.markAsDirty(),t.setValue(t._pendingValue,{emitModelToViewChange:!1}),n.viewToModelUpdate(t._pendingValue),t._pendingChange=!1}function AA(t,n){let e=(i,r)=>{n.valueAccessor.writeValue(i),r&&n.viewToModelUpdate(i)};t.registerOnChange(e),n._registerOnDestroy(()=>{t._unregisterOnChange(e)})}function K0(t,n){t==null,kp(t,n)}function RA(t,n){return Nd(t,n)}function OA(t,n){if(!t.hasOwnProperty("model"))return!1;let e=t.model;return e.isFirstChange()?!0:!Object.is(n,e.currentValue)}function NA(t){return Object.getPrototypeOf(t.constructor)===uA}function Q0(t,n){t._syncPendingControls(),n.forEach(e=>{let i=e.control;i.updateOn==="submit"&&i._pendingChange&&(e.viewToModelUpdate(i._pendingValue),i._pendingChange=!1)})}function FA(t,n){if(!n)return null;Array.isArray(n);let e,i,r;return n.forEach(o=>{o.constructor===Fd?e=o:NA(o)?i=o:r=o}),r||i||e||null}function PA(t,n){let e=t.indexOf(n);e>-1&&t.splice(e,1)}var LA={provide:Oi,useExisting:ht(()=>Tp)},Cs=Promise.resolve(),Tp=(()=>{class t extends Oi{callSetDisabledState;get submitted(){return Wt(this.submittedReactive)}_submitted=Me(()=>this.submittedReactive());submittedReactive=x(!1);_directives=new Set;form;ngSubmit=new F;options;constructor(e,i,r){super(),this.callSetDisabledState=r,this.form=new Uo({},xp(e),wp(i))}ngAfterViewInit(){this._setUpdateStrategy()}get formDirective(){return this}get control(){return this.form}get path(){return[]}get controls(){return this.form.controls}addControl(e){Cs.then(()=>{let i=this._findContainer(e.path);e.control=i.registerControl(e.name,e.control),bp(e.control,e,this.callSetDisabledState),e.control.updateValueAndValidity({emitEvent:!1}),this._directives.add(e)})}getControl(e){return this.form.get(e.path)}removeControl(e){Cs.then(()=>{this._findContainer(e.path)?.removeControl(e.name),this._directives.delete(e)})}addFormGroup(e){Cs.then(()=>{let i=this._findContainer(e.path),r=new Uo({});K0(r,e),i.registerControl(e.name,r),r.updateValueAndValidity({emitEvent:!1})})}removeFormGroup(e){Cs.then(()=>{this._findContainer(e.path)?.removeControl?.(e.name)})}getFormGroup(e){return this.form.get(e.path)}updateModel(e,i){Cs.then(()=>{this.form.get(e.path).setValue(i)})}setValue(e){this.control.setValue(e)}onSubmit(e){return this.submittedReactive.set(!0),Q0(this.form,this._directives),this.ngSubmit.emit(e),this.form._events.next(new Rd(this.control)),e?.target?.method==="dialog"}onReset(){this.resetForm()}resetForm(e=void 0){this.form.reset(e),this.submittedReactive.set(!1)}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.form._updateOn=this.options.updateOn)}_findContainer(e){return e.pop(),e.length?this.form.get(e):this.form}static \u0275fac=function(i){return new(i||t)(ee(Ms,10),ee(Cp,10),ee(Ip,8))};static \u0275dir=U({type:t,selectors:[["form",3,"ngNoForm","",3,"formGroup","",3,"formArray",""],["ng-form"],["","ngForm",""]],hostBindings:function(i,r){i&1&&M("submit",function(a){return r.onSubmit(a)})("reset",function(){return r.onReset()})},inputs:{options:[0,"ngFormOptions","options"]},outputs:{ngSubmit:"ngSubmit"},exportAs:["ngForm"],standalone:!1,features:[Be([LA]),_e]})}return t})();function A0(t,n){let e=t.indexOf(n);e>-1&&t.splice(e,1)}function R0(t){return typeof t=="object"&&t!==null&&Object.keys(t).length===2&&"value"in t&&"disabled"in t}var Md=class extends Ho{defaultValue=null;_onChange=[];_pendingValue;_pendingChange=!1;constructor(n=null,e,i){super(Ep(e),Mp(i,e)),this._applyFormState(n),this._setUpdateStrategy(e),this._initObservables(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator}),Pd(e)&&(e.nonNullable||e.initialValueIsDefault)&&(R0(n)?this.defaultValue=n.value:this.defaultValue=n)}setValue(n,e={}){this.value=this._pendingValue=n,this._onChange.length&&e.emitModelToViewChange!==!1&&this._onChange.forEach(i=>i(this.value,e.emitViewToModelChange!==!1)),this.updateValueAndValidity(e)}patchValue(n,e={}){this.setValue(n,e)}reset(n=this.defaultValue,e={}){this._applyFormState(n),this.markAsPristine(e),this.markAsUntouched(e),this.setValue(this.value,e),e.overwriteDefaultValue&&(this.defaultValue=this.value),this._pendingChange=!1,e?.emitEvent!==!1&&this._events.next(new Es(this))}_updateValue(){}_anyControls(n){return!1}_allControlsDisabled(){return this.disabled}registerOnChange(n){this._onChange.push(n)}_unregisterOnChange(n){A0(this._onChange,n)}registerOnDisabledChange(n){this._onDisabledChange.push(n)}_unregisterOnDisabledChange(n){A0(this._onDisabledChange,n)}_forEachChild(n){}_syncPendingControls(){return this.updateOn==="submit"&&(this._pendingDirty&&this.markAsDirty(),this._pendingTouched&&this.markAsTouched(),this._pendingChange)?(this.setValue(this._pendingValue,{onlySelf:!0,emitModelToViewChange:!1}),!0):!1}_applyFormState(n){R0(n)?(this.value=this._pendingValue=n.value,n.disabled?this.disable({onlySelf:!0,emitEvent:!1}):this.enable({onlySelf:!0,emitEvent:!1})):this.value=this._pendingValue=n}};var VA=t=>t instanceof Md;var X0=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=U({type:t,selectors:[["form",3,"ngNoForm","",3,"ngNativeValidate",""]],hostAttrs:["novalidate",""],standalone:!1})}return t})();var vp=class extends Ho{constructor(n,e,i){super(Ep(e),Mp(i,e)),this.controls=n,this._initObservables(),this._setUpdateStrategy(e),this._setUpControls(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator})}controls;at(n){return this.controls[this._adjustIndex(n)]}push(n,e={}){Array.isArray(n)?n.forEach(i=>{this.controls.push(i),this._registerControl(i)}):(this.controls.push(n),this._registerControl(n)),this.updateValueAndValidity({emitEvent:e.emitEvent}),this._onCollectionChange()}insert(n,e,i={}){this.controls.splice(n,0,e),this._registerControl(e),this.updateValueAndValidity({emitEvent:i.emitEvent})}removeAt(n,e={}){let i=this._adjustIndex(n);i<0&&(i=0),this.controls[i]&&this.controls[i]._registerOnCollectionChange(()=>{}),this.controls.splice(i,1),this.updateValueAndValidity({emitEvent:e.emitEvent})}setControl(n,e,i={}){let r=this._adjustIndex(n);r<0&&(r=0),this.controls[r]&&this.controls[r]._registerOnCollectionChange(()=>{}),this.controls.splice(r,1),e&&(this.controls.splice(r,0,e),this._registerControl(e)),this.updateValueAndValidity({emitEvent:i.emitEvent}),this._onCollectionChange()}get length(){return this.controls.length}setValue(n,e={}){q0(this,!1,n),n.forEach((i,r)=>{Y0(this,!1,r),this.at(r).setValue(i,{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e)}patchValue(n,e={}){n!=null&&(n.forEach((i,r)=>{this.at(r)&&this.at(r).patchValue(i,{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e))}reset(n=[],e={}){this._forEachChild((i,r)=>{i.reset(n[r],ae(w({},e),{onlySelf:!0}))}),this._updatePristine(e,this),this._updateTouched(e,this),this.updateValueAndValidity(e),e?.emitEvent!==!1&&this._events.next(new Es(this))}getRawValue(){return this.controls.map(n=>n.getRawValue())}clear(n={}){this.controls.length<1||(this._forEachChild(e=>e._registerOnCollectionChange(()=>{})),this.controls.splice(0),this.updateValueAndValidity({emitEvent:n.emitEvent}))}_adjustIndex(n){return n<0?n+this.length:n}_syncPendingControls(){let n=this.controls.reduce((e,i)=>i._syncPendingControls()?!0:e,!1);return n&&this.updateValueAndValidity({onlySelf:!0}),n}_forEachChild(n){this.controls.forEach((e,i)=>{n(e,i)})}_updateValue(){this.value=this.controls.filter(n=>n.enabled||this.disabled).map(n=>n.value)}_anyControls(n){return this.controls.some(e=>e.enabled&&n(e))}_setUpControls(){this._forEachChild(n=>this._registerControl(n))}_allControlsDisabled(){for(let n of this.controls)if(n.enabled)return!1;return this.controls.length>0||this.disabled}_registerControl(n){n.setParent(this),n._registerOnCollectionChange(this._onCollectionChange)}_find(n){return this.at(n)??null}};var BA=(()=>{class t extends Oi{callSetDisabledState;get submitted(){return Wt(this._submittedReactive)}set submitted(e){this._submittedReactive.set(e)}_submitted=Me(()=>this._submittedReactive());_submittedReactive=x(!1);_oldForm;_onCollectionChange=()=>this._updateDomValue();directives=[];constructor(e,i,r){super(),this.callSetDisabledState=r,this._setValidators(e),this._setAsyncValidators(i)}ngOnChanges(e){this.onChanges(e)}ngOnDestroy(){this.onDestroy()}onChanges(e){this._checkFormPresent(),e.hasOwnProperty("form")&&(this._updateValidators(),this._updateDomValue(),this._updateRegistrations(),this._oldForm=this.form)}onDestroy(){this.form&&(Nd(this.form,this),this.form._onCollectionChange===this._onCollectionChange&&this.form._registerOnCollectionChange(()=>{}))}get formDirective(){return this}get path(){return[]}addControl(e){let i=this.form.get(e.path);return bp(i,e,this.callSetDisabledState),i.updateValueAndValidity({emitEvent:!1}),this.directives.push(e),i}getControl(e){return this.form.get(e.path)}removeControl(e){T0(e.control||null,e,!1),PA(this.directives,e)}addFormGroup(e){this._setUpFormContainer(e)}removeFormGroup(e){this._cleanUpFormContainer(e)}getFormGroup(e){return this.form.get(e.path)}getFormArray(e){return this.form.get(e.path)}addFormArray(e){this._setUpFormContainer(e)}removeFormArray(e){this._cleanUpFormContainer(e)}updateModel(e,i){this.form.get(e.path).setValue(i)}onReset(){this.resetForm()}resetForm(e=void 0,i={}){this.form.reset(e,i),this._submittedReactive.set(!1)}onSubmit(e){return this.submitted=!0,Q0(this.form,this.directives),this.ngSubmit.emit(e),this.form._events.next(new Rd(this.control)),e?.target?.method==="dialog"}_updateDomValue(){this.directives.forEach(e=>{let i=e.control,r=this.form.get(e.path);i!==r&&(T0(i||null,e),VA(r)&&(bp(r,e,this.callSetDisabledState),e.control=r))}),this.form._updateTreeValidity({emitEvent:!1})}_setUpFormContainer(e){let i=this.form.get(e.path);K0(i,e),i.updateValueAndValidity({emitEvent:!1})}_cleanUpFormContainer(e){let i=this.form?.get(e.path);i&&RA(i,e)&&i.updateValueAndValidity({emitEvent:!1})}_updateRegistrations(){this.form._registerOnCollectionChange(this._onCollectionChange),this._oldForm?._registerOnCollectionChange(()=>{})}_updateValidators(){kp(this.form,this),this._oldForm&&Nd(this._oldForm,this)}_checkFormPresent(){this.form}static \u0275fac=function(i){return new(i||t)(ee(Ms,10),ee(Cp,10),ee(Ip,8))};static \u0275dir=U({type:t,features:[_e,We]})}return t})();var J0=new b("");var jA={provide:Lr,useExisting:ht(()=>Ap)},Ap=(()=>{class t extends Lr{_ngModelWarningConfig;_added=!1;viewModel;control;name=null;set isDisabled(e){}model;update=new F;static _ngModelWarningSentOnce=!1;_ngModelWarningSent=!1;constructor(e,i,r,o,a){super(),this._ngModelWarningConfig=a,this._parent=e,this._setValidators(i),this._setAsyncValidators(r),this.valueAccessor=FA(this,o)}ngOnChanges(e){this._added||this._setUpControl(),OA(e,this.viewModel)&&(this.viewModel=this.model,this.formDirective.updateModel(this,this.model))}ngOnDestroy(){this.formDirective?.removeControl(this)}viewToModelUpdate(e){this.viewModel=e,this.update.emit(e)}get path(){return IA(this.name==null?this.name:this.name.toString(),this._parent)}get formDirective(){return this._parent?this._parent.formDirective:null}_setUpControl(){this.control=this.formDirective.addControl(this),this._added=!0}static \u0275fac=function(i){return new(i||t)(ee(Oi,13),ee(Ms,10),ee(Cp,10),ee(zo,10),ee(J0,8))};static \u0275dir=U({type:t,selectors:[["","formControlName",""]],inputs:{name:[0,"formControlName","name"],isDisabled:[0,"disabled","isDisabled"],model:[0,"ngModel","model"]},outputs:{update:"ngModelChange"},standalone:!1,features:[Be([jA]),_e,We]})}return t})();var HA={provide:Oi,useExisting:ht(()=>Is)},Is=(()=>{class t extends BA{form=null;ngSubmit=new F;get control(){return this.form}static \u0275fac=(()=>{let e;return function(r){return(e||(e=Rt(t)))(r||t)}})();static \u0275dir=U({type:t,selectors:[["","formGroup",""]],hostBindings:function(i,r){i&1&&M("submit",function(a){return r.onSubmit(a)})("reset",function(){return r.onReset()})},inputs:{form:[0,"formGroup","form"]},outputs:{ngSubmit:"ngSubmit"},exportAs:["ngForm"],standalone:!1,features:[Be([HA]),_e]})}return t})();var UA=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=Z({type:t});static \u0275inj=q({})}return t})();function O0(t){return!!t&&(t.asyncValidators!==void 0||t.validators!==void 0||t.updateOn!==void 0)}var eC=(()=>{class t{useNonNullable=!1;get nonNullable(){let e=new t;return e.useNonNullable=!0,e}group(e,i=null){let r=this._reduceControls(e),o={};return O0(i)?o=i:i!==null&&(o.validators=i.validator,o.asyncValidators=i.asyncValidator),new Uo(r,o)}record(e,i=null){let r=this._reduceControls(e);return new _p(r,i)}control(e,i,r){let o={};return this.useNonNullable?(O0(i)?o=i:(o.validators=i,o.asyncValidators=r),new Md(e,ae(w({},o),{nonNullable:!0}))):new Md(e,i,r)}array(e,i,r){let o=e.map(a=>this._createControl(a));return new vp(o,i,r)}_reduceControls(e){let i={};return Object.keys(e).forEach(r=>{i[r]=this._createControl(e[r])}),i}_createControl(e){if(e instanceof Md)return e;if(e instanceof Ho)return e;if(Array.isArray(e)){let i=e[0],r=e.length>1?e[1]:null,o=e.length>2?e[2]:null;return this.control(i,r,o)}else return this.control(e)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var tC=(()=>{class t{static withConfig(e){return{ngModule:t,providers:[{provide:J0,useValue:e.warnOnNgModelWithFormControl??"always"},{provide:Ip,useValue:e.callSetDisabledState??Sp}]}}static \u0275fac=function(i){return new(i||t)};static \u0275mod=Z({type:t});static \u0275inj=q({imports:[UA]})}return t})();var nC=new b("MAT_INPUT_VALUE_ACCESSOR");var iC=(()=>{class t{isErrorState(e,i){return!!(e&&e.invalid&&(e.touched||i&&i.submitted))}static \u0275fac=function(i){return new(i||t)};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Ld=class{_defaultMatcher;ngControl;_parentFormGroup;_parentForm;_stateChanges;errorState=!1;matcher;constructor(n,e,i,r,o){this._defaultMatcher=n,this.ngControl=e,this._parentFormGroup=i,this._parentForm=r,this._stateChanges=o}updateErrorState(){let n=this.errorState,e=this._parentFormGroup||this._parentForm,i=this.matcher||this._defaultMatcher,r=this.ngControl?this.ngControl.control:null,o=i?.isErrorState(r,e)??!1;o!==n&&(this.errorState=o,this._stateChanges.next())}};var $A=["button","checkbox","file","hidden","image","radio","range","reset","submit"],GA=new b("MAT_INPUT_CONFIG"),Vd=(()=>{class t{_elementRef=d(L);_platform=d(de);ngControl=d(Lr,{optional:!0,self:!0});_autofillMonitor=d(E0);_ngZone=d(A);_formField=d(pp,{optional:!0});_renderer=d(Te);_uid=d(Ie).getId("mat-input-");_previousNativeValue;_inputValueAccessor;_signalBasedValueAccessor;_previousPlaceholder=null;_errorStateTracker;_config=d(GA,{optional:!0});_cleanupIosKeyup;_cleanupWebkitWheel;_isServer=!1;_isNativeSelect=!1;_isTextarea=!1;_isInFormField=!1;focused=!1;stateChanges=new E;controlType="mat-input";autofilled=!1;get disabled(){return this._disabled}set disabled(e){this._disabled=Qn(e),this.focused&&(this.focused=!1,this.stateChanges.next())}_disabled=!1;get id(){return this._id}set id(e){this._id=e||this._uid}_id;placeholder;name;get required(){return this._required??this.ngControl?.control?.hasValidator(Id.required)??!1}set required(e){this._required=Qn(e)}_required;get type(){return this._type}set type(e){this._type=e||"text",this._validateType(),!this._isTextarea&&Wh().has(this._type)&&(this._elementRef.nativeElement.type=this._type)}_type="text";get errorStateMatcher(){return this._errorStateTracker.matcher}set errorStateMatcher(e){this._errorStateTracker.matcher=e}userAriaDescribedBy;get value(){return this._signalBasedValueAccessor?this._signalBasedValueAccessor.value():this._inputValueAccessor.value}set value(e){e!==this.value&&(this._signalBasedValueAccessor?this._signalBasedValueAccessor.value.set(e):this._inputValueAccessor.value=e,this.stateChanges.next())}get readonly(){return this._readonly}set readonly(e){this._readonly=Qn(e)}_readonly=!1;disabledInteractive;get errorState(){return this._errorStateTracker.errorState}set errorState(e){this._errorStateTracker.errorState=e}_neverEmptyInputTypes=["date","datetime","datetime-local","month","time","week"].filter(e=>Wh().has(e));constructor(){let e=d(Tp,{optional:!0}),i=d(Is,{optional:!0}),r=d(iC),o=d(nC,{optional:!0,self:!0}),a=this._elementRef.nativeElement,s=a.nodeName.toLowerCase();o?vi(o.value)?this._signalBasedValueAccessor=o:this._inputValueAccessor=o:this._inputValueAccessor=a,this._previousNativeValue=this.value,this.id=this.id,this._platform.IOS&&this._ngZone.runOutsideAngular(()=>{this._cleanupIosKeyup=this._renderer.listen(a,"keyup",this._iOSKeyupListener)}),this._errorStateTracker=new Ld(r,this.ngControl,i,e,this.stateChanges),this._isServer=!this._platform.isBrowser,this._isNativeSelect=s==="select",this._isTextarea=s==="textarea",this._isInFormField=!!this._formField,this.disabledInteractive=this._config?.disabledInteractive||!1,this._isNativeSelect&&(this.controlType=a.multiple?"mat-native-select-multiple":"mat-native-select"),this._signalBasedValueAccessor&&dn(()=>{this._signalBasedValueAccessor.value(),this.stateChanges.next()})}ngAfterViewInit(){this._platform.isBrowser&&this._autofillMonitor.monitor(this._elementRef.nativeElement).subscribe(e=>{this.autofilled=e.isAutofilled,this.stateChanges.next()})}ngOnChanges(){this.stateChanges.next()}ngOnDestroy(){this.stateChanges.complete(),this._platform.isBrowser&&this._autofillMonitor.stopMonitoring(this._elementRef.nativeElement),this._cleanupIosKeyup?.(),this._cleanupWebkitWheel?.()}ngDoCheck(){this.ngControl&&(this.updateErrorState(),this.ngControl.disabled!==null&&this.ngControl.disabled!==this.disabled&&(this.disabled=this.ngControl.disabled,this.stateChanges.next())),this._dirtyCheckNativeValue(),this._dirtyCheckPlaceholder()}focus(e){this._elementRef.nativeElement.focus(e)}updateErrorState(){this._errorStateTracker.updateErrorState()}_focusChanged(e){if(e!==this.focused){if(!this._isNativeSelect&&e&&this.disabled&&this.disabledInteractive){let i=this._elementRef.nativeElement;i.type==="number"?(i.type="text",i.setSelectionRange(0,0),i.type="number"):i.setSelectionRange(0,0)}this.focused=e,this.stateChanges.next()}}_onInput(){}_dirtyCheckNativeValue(){let e=this._elementRef.nativeElement.value;this._previousNativeValue!==e&&(this._previousNativeValue=e,this.stateChanges.next())}_dirtyCheckPlaceholder(){let e=this._getPlaceholder();if(e!==this._previousPlaceholder){let i=this._elementRef.nativeElement;this._previousPlaceholder=e,e?i.setAttribute("placeholder",e):i.removeAttribute("placeholder")}}_getPlaceholder(){return this.placeholder||null}_validateType(){$A.indexOf(this._type)>-1}_isNeverEmpty(){return this._neverEmptyInputTypes.indexOf(this._type)>-1}_isBadInput(){let e=this._elementRef.nativeElement.validity;return e&&e.badInput}get empty(){return!this._isNeverEmpty()&&!this._elementRef.nativeElement.value&&!this._isBadInput()&&!this.autofilled}get shouldLabelFloat(){if(this._isNativeSelect){let e=this._elementRef.nativeElement,i=e.options[0];return this.focused||e.multiple||!this.empty||!!(e.selectedIndex>-1&&i&&i.label)}else return this.focused&&!this.disabled||!this.empty}get describedByIds(){return this._elementRef.nativeElement.getAttribute("aria-describedby")?.split(" ")||[]}setDescribedByIds(e){let i=this._elementRef.nativeElement;e.length?i.setAttribute("aria-describedby",e.join(" ")):i.removeAttribute("aria-describedby")}onContainerClick(){this.focused||this.focus()}_isInlineSelect(){let e=this._elementRef.nativeElement;return this._isNativeSelect&&(e.multiple||e.size>1)}_iOSKeyupListener=e=>{let i=e.target;!i.value&&i.selectionStart===0&&i.selectionEnd===0&&(i.setSelectionRange(1,1),i.setSelectionRange(0,0))};_getReadonlyAttribute(){return this._isNativeSelect?null:this.readonly||this.disabled&&this.disabledInteractive?"true":null}static \u0275fac=function(i){return new(i||t)};static \u0275dir=U({type:t,selectors:[["input","matInput",""],["textarea","matInput",""],["select","matNativeControl",""],["input","matNativeControl",""],["textarea","matNativeControl",""]],hostAttrs:[1,"mat-mdc-input-element"],hostVars:21,hostBindings:function(i,r){i&1&&M("focus",function(){return r._focusChanged(!0)})("blur",function(){return r._focusChanged(!1)})("input",function(){return r._onInput()}),i&2&&(et("id",r.id)("disabled",r.disabled&&!r.disabledInteractive)("required",r.required),P("name",r.name||null)("readonly",r._getReadonlyAttribute())("aria-disabled",r.disabled&&r.disabledInteractive?"true":null)("aria-invalid",r.empty&&r.required?null:r.errorState)("aria-required",r.required)("id",r.id),I("mat-input-server",r._isServer)("mat-mdc-form-field-textarea-control",r._isInFormField&&r._isTextarea)("mat-mdc-form-field-input-control",r._isInFormField)("mat-mdc-input-disabled-interactive",r.disabledInteractive)("mdc-text-field__input",r._isInFormField)("mat-mdc-native-select-inline",r._isInlineSelect()))},inputs:{disabled:"disabled",id:"id",placeholder:"placeholder",name:"name",required:"required",type:"type",errorStateMatcher:"errorStateMatcher",userAriaDescribedBy:[0,"aria-describedby","userAriaDescribedBy"],value:"value",readonly:"readonly",disabledInteractive:[2,"disabledInteractive","disabledInteractive",ie]},exportAs:["matInput"],features:[Be([{provide:hp,useExisting:t}]),We]})}return t})(),Bd=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=Z({type:t});static \u0275inj=q({imports:[Pr,Pr,M0,ye]})}return t})();var WA=["tooltip"],YA=20;var qA=new b("mat-tooltip-scroll-strategy",{providedIn:"root",factory:()=>{let t=d(G);return()=>Or(t,{scrollThrottle:YA})}}),ZA=new b("mat-tooltip-default-options",{providedIn:"root",factory:()=>({showDelay:0,hideDelay:0,touchendHideDelay:1500})});var oC="tooltip-panel",KA={passive:!0},QA=8,XA=8,JA=24,eR=200,ti=(()=>{class t{_elementRef=d(L);_ngZone=d(A);_platform=d(de);_ariaDescriber=d(yD);_focusMonitor=d(Nt);_dir=d(qe);_injector=d(G);_viewContainerRef=d(_t);_mediaMatcher=d(To);_document=d(H);_renderer=d(Te);_animationsDisabled=we();_defaultOptions=d(ZA,{optional:!0});_overlayRef=null;_tooltipInstance=null;_overlayPanelClass;_portal;_position="below";_positionAtOrigin=!1;_disabled=!1;_tooltipClass;_viewInitialized=!1;_pointerExitEventsInitialized=!1;_tooltipComponent=aC;_viewportMargin=8;_currentPosition;_cssClassPrefix="mat-mdc";_ariaDescriptionPending=!1;_dirSubscribed=!1;get position(){return this._position}set position(e){e!==this._position&&(this._position=e,this._overlayRef&&(this._updatePosition(this._overlayRef),this._tooltipInstance?.show(0),this._overlayRef.updatePosition()))}get positionAtOrigin(){return this._positionAtOrigin}set positionAtOrigin(e){this._positionAtOrigin=Qn(e),this._detach(),this._overlayRef=null}get disabled(){return this._disabled}set disabled(e){let i=Qn(e);this._disabled!==i&&(this._disabled=i,i?this.hide(0):this._setupPointerEnterEventsIfNeeded(),this._syncAriaDescription(this.message))}get showDelay(){return this._showDelay}set showDelay(e){this._showDelay=qn(e)}_showDelay;get hideDelay(){return this._hideDelay}set hideDelay(e){this._hideDelay=qn(e),this._tooltipInstance&&(this._tooltipInstance._mouseLeaveHideDelay=this._hideDelay)}_hideDelay;touchGestures="auto";get message(){return this._message}set message(e){let i=this._message;this._message=e!=null?String(e).trim():"",!this._message&&this._isTooltipVisible()?this.hide(0):(this._setupPointerEnterEventsIfNeeded(),this._updateTooltipMessage()),this._syncAriaDescription(i)}_message="";get tooltipClass(){return this._tooltipClass}set tooltipClass(e){this._tooltipClass=e,this._tooltipInstance&&this._setTooltipClass(this._tooltipClass)}_eventCleanups=[];_touchstartTimeout=null;_destroyed=new E;_isDestroyed=!1;constructor(){let e=this._defaultOptions;e&&(this._showDelay=e.showDelay,this._hideDelay=e.hideDelay,e.position&&(this.position=e.position),e.positionAtOrigin&&(this.positionAtOrigin=e.positionAtOrigin),e.touchGestures&&(this.touchGestures=e.touchGestures),e.tooltipClass&&(this.tooltipClass=e.tooltipClass)),this._viewportMargin=QA}ngAfterViewInit(){this._viewInitialized=!0,this._setupPointerEnterEventsIfNeeded(),this._focusMonitor.monitor(this._elementRef).pipe(je(this._destroyed)).subscribe(e=>{e?e==="keyboard"&&this._ngZone.run(()=>this.show()):this._ngZone.run(()=>this.hide(0))})}ngOnDestroy(){let e=this._elementRef.nativeElement;this._touchstartTimeout&&clearTimeout(this._touchstartTimeout),this._overlayRef&&(this._overlayRef.dispose(),this._tooltipInstance=null),this._eventCleanups.forEach(i=>i()),this._eventCleanups.length=0,this._destroyed.next(),this._destroyed.complete(),this._isDestroyed=!0,this._ariaDescriber.removeDescription(e,this.message,"tooltip"),this._focusMonitor.stopMonitoring(e)}show(e=this.showDelay,i){if(this.disabled||!this.message||this._isTooltipVisible()){this._tooltipInstance?._cancelPendingAnimations();return}let r=this._createOverlay(i);this._detach(),this._portal=this._portal||new Pt(this._tooltipComponent,this._viewContainerRef);let o=this._tooltipInstance=r.attach(this._portal).instance;o._triggerElement=this._elementRef.nativeElement,o._mouseLeaveHideDelay=this._hideDelay,o.afterHidden().pipe(je(this._destroyed)).subscribe(()=>this._detach()),this._setTooltipClass(this._tooltipClass),this._updateTooltipMessage(),o.show(e)}hide(e=this.hideDelay){let i=this._tooltipInstance;i&&(i.isVisible()?i.hide(e):(i._cancelPendingAnimations(),this._detach()))}toggle(e){this._isTooltipVisible()?this.hide():this.show(void 0,e)}_isTooltipVisible(){return!!this._tooltipInstance&&this._tooltipInstance.isVisible()}_createOverlay(e){if(this._overlayRef){let a=this._overlayRef.getConfig().positionStrategy;if((!this.positionAtOrigin||!e)&&a._origin instanceof L)return this._overlayRef;this._detach()}let i=this._injector.get(Si).getAncestorScrollContainers(this._elementRef),r=`${this._cssClassPrefix}-${oC}`,o=Nr(this._injector,this.positionAtOrigin?e||this._elementRef:this._elementRef).withTransformOriginOn(`.${this._cssClassPrefix}-tooltip`).withFlexibleDimensions(!1).withViewportMargin(this._viewportMargin).withScrollableContainers(i).withPopoverLocation("global");return o.positionChanges.pipe(je(this._destroyed)).subscribe(a=>{this._updateCurrentPositionClass(a.connectionPair),this._tooltipInstance&&a.scrollableViewProperties.isOverlayClipped&&this._tooltipInstance.isVisible()&&this._ngZone.run(()=>this.hide(0))}),this._overlayRef=Dn(this._injector,{direction:this._dir,positionStrategy:o,panelClass:this._overlayPanelClass?[...this._overlayPanelClass,r]:r,scrollStrategy:this._injector.get(qA)(),disableAnimations:this._animationsDisabled,eventPredicate:this._overlayEventPredicate}),this._updatePosition(this._overlayRef),this._overlayRef.detachments().pipe(je(this._destroyed)).subscribe(()=>this._detach()),this._overlayRef.outsidePointerEvents().pipe(je(this._destroyed)).subscribe(()=>this._tooltipInstance?._handleBodyInteraction()),this._overlayRef.keydownEvents().pipe(je(this._destroyed)).subscribe(a=>{a.preventDefault(),a.stopPropagation(),this._ngZone.run(()=>this.hide(0))}),this._defaultOptions?.disableTooltipInteractivity&&this._overlayRef.addPanelClass(`${this._cssClassPrefix}-tooltip-panel-non-interactive`),this._dirSubscribed||(this._dirSubscribed=!0,this._dir.change.pipe(je(this._destroyed)).subscribe(()=>{this._overlayRef&&this._updatePosition(this._overlayRef)})),this._overlayRef}_detach(){this._overlayRef&&this._overlayRef.hasAttached()&&this._overlayRef.detach(),this._tooltipInstance=null}_updatePosition(e){let i=e.getConfig().positionStrategy,r=this._getOrigin(),o=this._getOverlayPosition();i.withPositions([this._addOffset(w(w({},r.main),o.main)),this._addOffset(w(w({},r.fallback),o.fallback))])}_addOffset(e){let i=XA,r=!this._dir||this._dir.value=="ltr";return e.originY==="top"?e.offsetY=-i:e.originY==="bottom"?e.offsetY=i:e.originX==="start"?e.offsetX=r?-i:i:e.originX==="end"&&(e.offsetX=r?i:-i),e}_getOrigin(){let e=!this._dir||this._dir.value=="ltr",i=this.position,r;i=="above"||i=="below"?r={originX:"center",originY:i=="above"?"top":"bottom"}:i=="before"||i=="left"&&e||i=="right"&&!e?r={originX:"start",originY:"center"}:(i=="after"||i=="right"&&e||i=="left"&&!e)&&(r={originX:"end",originY:"center"});let{x:o,y:a}=this._invertPosition(r.originX,r.originY);return{main:r,fallback:{originX:o,originY:a}}}_getOverlayPosition(){let e=!this._dir||this._dir.value=="ltr",i=this.position,r;i=="above"?r={overlayX:"center",overlayY:"bottom"}:i=="below"?r={overlayX:"center",overlayY:"top"}:i=="before"||i=="left"&&e||i=="right"&&!e?r={overlayX:"end",overlayY:"center"}:(i=="after"||i=="right"&&e||i=="left"&&!e)&&(r={overlayX:"start",overlayY:"center"});let{x:o,y:a}=this._invertPosition(r.overlayX,r.overlayY);return{main:r,fallback:{overlayX:o,overlayY:a}}}_updateTooltipMessage(){this._tooltipInstance&&(this._tooltipInstance.message=this.message,this._tooltipInstance._markForCheck(),Ye(()=>{this._tooltipInstance&&this._overlayRef.updatePosition()},{injector:this._injector}))}_setTooltipClass(e){this._tooltipInstance&&(this._tooltipInstance.tooltipClass=e instanceof Set?Array.from(e):e,this._tooltipInstance._markForCheck())}_invertPosition(e,i){return this.position==="above"||this.position==="below"?i==="top"?i="bottom":i==="bottom"&&(i="top"):e==="end"?e="start":e==="start"&&(e="end"),{x:e,y:i}}_updateCurrentPositionClass(e){let{overlayY:i,originX:r,originY:o}=e,a;if(i==="center"?this._dir&&this._dir.value==="rtl"?a=r==="end"?"left":"right":a=r==="start"?"left":"right":a=i==="bottom"&&o==="top"?"above":"below",a!==this._currentPosition){let s=this._overlayRef;if(s){let l=`${this._cssClassPrefix}-${oC}-`;s.removePanelClass(l+this._currentPosition),s.addPanelClass(l+a)}this._currentPosition=a}}_setupPointerEnterEventsIfNeeded(){this._disabled||!this.message||!this._viewInitialized||this._eventCleanups.length||(this._isTouchPlatform()?this.touchGestures!=="off"&&(this._disableNativeGesturesIfNecessary(),this._addListener("touchstart",e=>{let i=e.targetTouches?.[0],r=i?{x:i.clientX,y:i.clientY}:void 0;this._setupPointerExitEventsIfNeeded(),this._touchstartTimeout&&clearTimeout(this._touchstartTimeout);let o=500;this._touchstartTimeout=setTimeout(()=>{this._touchstartTimeout=null,this.show(void 0,r)},this._defaultOptions?.touchLongPressShowDelay??o)})):this._addListener("mouseenter",e=>{this._setupPointerExitEventsIfNeeded();let i;e.x!==void 0&&e.y!==void 0&&(i=e),this.show(void 0,i)}))}_setupPointerExitEventsIfNeeded(){if(!this._pointerExitEventsInitialized){if(this._pointerExitEventsInitialized=!0,!this._isTouchPlatform())this._addListener("mouseleave",e=>{let i=e.relatedTarget;(!i||!this._overlayRef?.overlayElement.contains(i))&&this.hide()}),this._addListener("wheel",e=>{if(this._isTooltipVisible()){let i=this._document.elementFromPoint(e.clientX,e.clientY),r=this._elementRef.nativeElement;i!==r&&!r.contains(i)&&this.hide()}});else if(this.touchGestures!=="off"){this._disableNativeGesturesIfNecessary();let e=()=>{this._touchstartTimeout&&clearTimeout(this._touchstartTimeout),this.hide(this._defaultOptions?.touchendHideDelay)};this._addListener("touchend",e),this._addListener("touchcancel",e)}}}_addListener(e,i){this._eventCleanups.push(this._renderer.listen(this._elementRef.nativeElement,e,i,KA))}_isTouchPlatform(){let e=this._defaultOptions?.detectHoverCapability;return typeof e=="function"?!e():this._platform.IOS||this._platform.ANDROID?!0:this._platform.isBrowser?!!e&&this._mediaMatcher.matchMedia("(any-hover: none)").matches:!1}_disableNativeGesturesIfNecessary(){let e=this.touchGestures;if(e!=="off"){let i=this._elementRef.nativeElement,r=i.style;(e==="on"||i.nodeName!=="INPUT"&&i.nodeName!=="TEXTAREA")&&(r.userSelect=r.msUserSelect=r.webkitUserSelect=r.MozUserSelect="none"),(e==="on"||!i.draggable)&&(r.webkitUserDrag="none"),r.touchAction="none",r.webkitTapHighlightColor="transparent"}}_syncAriaDescription(e){this._ariaDescriptionPending||(this._ariaDescriptionPending=!0,this._ariaDescriber.removeDescription(this._elementRef.nativeElement,e,"tooltip"),this._isDestroyed||Ye({write:()=>{this._ariaDescriptionPending=!1,this.message&&!this.disabled&&this._ariaDescriber.describe(this._elementRef.nativeElement,this.message,"tooltip")}},{injector:this._injector}))}_overlayEventPredicate=e=>e.type==="keydown"?this._isTooltipVisible()&&e.keyCode===27&&!Et(e):!0;static \u0275fac=function(i){return new(i||t)};static \u0275dir=U({type:t,selectors:[["","matTooltip",""]],hostAttrs:[1,"mat-mdc-tooltip-trigger"],hostVars:2,hostBindings:function(i,r){i&2&&I("mat-mdc-tooltip-disabled",r.disabled)},inputs:{position:[0,"matTooltipPosition","position"],positionAtOrigin:[0,"matTooltipPositionAtOrigin","positionAtOrigin"],disabled:[0,"matTooltipDisabled","disabled"],showDelay:[0,"matTooltipShowDelay","showDelay"],hideDelay:[0,"matTooltipHideDelay","hideDelay"],touchGestures:[0,"matTooltipTouchGestures","touchGestures"],message:[0,"matTooltip","message"],tooltipClass:[0,"matTooltipClass","tooltipClass"]},exportAs:["matTooltip"]})}return t})(),aC=(()=>{class t{_changeDetectorRef=d(xe);_elementRef=d(L);_isMultiline=!1;message;tooltipClass;_showTimeoutId;_hideTimeoutId;_triggerElement;_mouseLeaveHideDelay;_animationsDisabled=we();_tooltip;_closeOnInteraction=!1;_isVisible=!1;_onHide=new E;_showAnimation="mat-mdc-tooltip-show";_hideAnimation="mat-mdc-tooltip-hide";constructor(){}show(e){this._hideTimeoutId!=null&&clearTimeout(this._hideTimeoutId),this._showTimeoutId=setTimeout(()=>{this._toggleVisibility(!0),this._showTimeoutId=void 0},e)}hide(e){this._showTimeoutId!=null&&clearTimeout(this._showTimeoutId),this._hideTimeoutId=setTimeout(()=>{this._toggleVisibility(!1),this._hideTimeoutId=void 0},e)}afterHidden(){return this._onHide}isVisible(){return this._isVisible}ngOnDestroy(){this._cancelPendingAnimations(),this._onHide.complete(),this._triggerElement=null}_handleBodyInteraction(){this._closeOnInteraction&&this.hide(0)}_markForCheck(){this._changeDetectorRef.markForCheck()}_handleMouseLeave({relatedTarget:e}){(!e||!this._triggerElement.contains(e))&&(this.isVisible()?this.hide(this._mouseLeaveHideDelay):this._finalizeAnimation(!1))}_onShow(){this._isMultiline=this._isTooltipMultiline(),this._markForCheck()}_isTooltipMultiline(){let e=this._elementRef.nativeElement.getBoundingClientRect();return e.height>JA&&e.width>=eR}_handleAnimationEnd({animationName:e}){(e===this._showAnimation||e===this._hideAnimation)&&this._finalizeAnimation(e===this._showAnimation)}_cancelPendingAnimations(){this._showTimeoutId!=null&&clearTimeout(this._showTimeoutId),this._hideTimeoutId!=null&&clearTimeout(this._hideTimeoutId),this._showTimeoutId=this._hideTimeoutId=void 0}_finalizeAnimation(e){e?this._closeOnInteraction=!0:this.isVisible()||this._onHide.next()}_toggleVisibility(e){let i=this._tooltip.nativeElement,r=this._showAnimation,o=this._hideAnimation;if(i.classList.remove(e?o:r),i.classList.add(e?r:o),this._isVisible!==e&&(this._isVisible=e,this._changeDetectorRef.markForCheck()),e&&!this._animationsDisabled&&typeof getComputedStyle=="function"){let a=getComputedStyle(i);(a.getPropertyValue("animation-duration")==="0s"||a.getPropertyValue("animation-name")==="none")&&(this._animationsDisabled=!0)}e&&this._onShow(),this._animationsDisabled&&(i.classList.add("_mat-animation-noopable"),this._finalizeAnimation(e))}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["mat-tooltip-component"]],viewQuery:function(i,r){if(i&1&&ve(WA,7),i&2){let o;K(o=Q())&&(r._tooltip=o.first)}},hostAttrs:["aria-hidden","true"],hostBindings:function(i,r){i&1&&M("mouseleave",function(a){return r._handleMouseLeave(a)})},decls:4,vars:5,consts:[["tooltip",""],[1,"mdc-tooltip","mat-mdc-tooltip",3,"animationend"],[1,"mat-mdc-tooltip-surface","mdc-tooltip__surface"]],template:function(i,r){i&1&&(Ae(0,"div",1,0),yi("animationend",function(a){return r._handleAnimationEnd(a)}),Ae(2,"div",2),C(3),Ve()()),i&2&&(rt(r.tooltipClass),I("mdc-tooltip--multiline",r._isMultiline),_(3),oe(r.message))},styles:[`.mat-mdc-tooltip {
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
`],encapsulation:2,changeDetection:0})}return t})();var $o=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=Z({type:t});static \u0275inj=q({imports:[Sr,Qt,ye,Xn]})}return t})();var Ss=class{_multiple;_emitChanges;compareWith;_selection=new Set;_deselectedToEmit=[];_selectedToEmit=[];_selected=null;get selected(){return this._selected||(this._selected=Array.from(this._selection.values())),this._selected}changed=new E;constructor(n=!1,e,i=!0,r){this._multiple=n,this._emitChanges=i,this.compareWith=r,e&&e.length&&(n?e.forEach(o=>this._markSelected(o)):this._markSelected(e[0]),this._selectedToEmit.length=0)}select(...n){this._verifyValueAssignment(n),n.forEach(i=>this._markSelected(i));let e=this._hasQueuedChanges();return this._emitChangeEvent(),e}deselect(...n){this._verifyValueAssignment(n),n.forEach(i=>this._unmarkSelected(i));let e=this._hasQueuedChanges();return this._emitChangeEvent(),e}setSelection(...n){this._verifyValueAssignment(n);let e=this.selected,i=new Set(n.map(o=>this._getConcreteValue(o)));n.forEach(o=>this._markSelected(o)),e.filter(o=>!i.has(this._getConcreteValue(o,i))).forEach(o=>this._unmarkSelected(o));let r=this._hasQueuedChanges();return this._emitChangeEvent(),r}toggle(n){return this.isSelected(n)?this.deselect(n):this.select(n)}clear(n=!0){this._unmarkAll();let e=this._hasQueuedChanges();return n&&this._emitChangeEvent(),e}isSelected(n){return this._selection.has(this._getConcreteValue(n))}isEmpty(){return this._selection.size===0}hasValue(){return!this.isEmpty()}sort(n){this._multiple&&this.selected&&this._selected.sort(n)}isMultipleSelection(){return this._multiple}_emitChangeEvent(){this._selected=null,(this._selectedToEmit.length||this._deselectedToEmit.length)&&(this.changed.next({source:this,added:this._selectedToEmit,removed:this._deselectedToEmit}),this._deselectedToEmit=[],this._selectedToEmit=[])}_markSelected(n){n=this._getConcreteValue(n),this.isSelected(n)||(this._multiple||this._unmarkAll(),this.isSelected(n)||this._selection.add(n),this._emitChanges&&this._selectedToEmit.push(n))}_unmarkSelected(n){n=this._getConcreteValue(n),this.isSelected(n)&&(this._selection.delete(n),this._emitChanges&&this._deselectedToEmit.push(n))}_unmarkAll(){this.isEmpty()||this._selection.forEach(n=>this._unmarkSelected(n))}_verifyValueAssignment(n){n.length>1&&this._multiple}_hasQueuedChanges(){return!!(this._deselectedToEmit.length||this._selectedToEmit.length)}_getConcreteValue(n,e){if(this.compareWith){e=e??this._selection;for(let i of e)if(this.compareWith(n,i))return i;return n}else return n}};var sC=(()=>{class t{_animationsDisabled=we();state="unchecked";disabled=!1;appearance="full";constructor(){}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["mat-pseudo-checkbox"]],hostAttrs:[1,"mat-pseudo-checkbox"],hostVars:12,hostBindings:function(i,r){i&2&&I("mat-pseudo-checkbox-indeterminate",r.state==="indeterminate")("mat-pseudo-checkbox-checked",r.state==="checked")("mat-pseudo-checkbox-disabled",r.disabled)("mat-pseudo-checkbox-minimal",r.appearance==="minimal")("mat-pseudo-checkbox-full",r.appearance==="full")("_mat-animation-noopable",r._animationsDisabled)},inputs:{state:"state",disabled:"disabled",appearance:"appearance"},decls:0,vars:0,template:function(i,r){},styles:[`.mat-pseudo-checkbox {
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
`],encapsulation:2,changeDetection:0})}return t})();var tR=["button"],nR=["*"];function iR(t,n){if(t&1&&(m(0,"div",2),j(1,"mat-pseudo-checkbox",6),h()),t&2){let e=D();_(),T("disabled",e.disabled)}}var lC=new b("MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS",{providedIn:"root",factory:()=>({hideSingleSelectionIndicator:!1,hideMultipleSelectionIndicator:!1,disabledInteractive:!1})}),cC=new b("MatButtonToggleGroup"),rR={provide:zo,useExisting:ht(()=>Op),multi:!0},jd=class{source;value;constructor(n,e){this.source=n,this.value=e}},Op=(()=>{class t{_changeDetector=d(xe);_dir=d(qe,{optional:!0});_multiple=!1;_disabled=!1;_disabledInteractive=!1;_selectionModel;_rawValue;_controlValueAccessorChangeFn=()=>{};_onTouched=()=>{};_buttonToggles;appearance;get name(){return this._name}set name(e){this._name=e,this._markButtonsForCheck()}_name=d(Ie).getId("mat-button-toggle-group-");vertical=!1;get value(){let e=this._selectionModel?this._selectionModel.selected:[];return this.multiple?e.map(i=>i.value):e[0]?e[0].value:void 0}set value(e){this._setSelectionByValue(e),this.valueChange.emit(this.value)}valueChange=new F;get selected(){let e=this._selectionModel?this._selectionModel.selected:[];return this.multiple?e:e[0]||null}get multiple(){return this._multiple}set multiple(e){this._multiple=e,this._markButtonsForCheck()}get disabled(){return this._disabled}set disabled(e){this._disabled=e,this._markButtonsForCheck()}get disabledInteractive(){return this._disabledInteractive}set disabledInteractive(e){this._disabledInteractive=e,this._markButtonsForCheck()}get dir(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}change=new F;get hideSingleSelectionIndicator(){return this._hideSingleSelectionIndicator}set hideSingleSelectionIndicator(e){this._hideSingleSelectionIndicator=e,this._markButtonsForCheck()}_hideSingleSelectionIndicator;get hideMultipleSelectionIndicator(){return this._hideMultipleSelectionIndicator}set hideMultipleSelectionIndicator(e){this._hideMultipleSelectionIndicator=e,this._markButtonsForCheck()}_hideMultipleSelectionIndicator;constructor(){let e=d(lC,{optional:!0});this.appearance=e&&e.appearance?e.appearance:"standard",this._hideSingleSelectionIndicator=e?.hideSingleSelectionIndicator??!1,this._hideMultipleSelectionIndicator=e?.hideMultipleSelectionIndicator??!1}ngOnInit(){this._selectionModel=new Ss(this.multiple,void 0,!1)}ngAfterContentInit(){this._selectionModel.select(...this._buttonToggles.filter(e=>e.checked)),this.multiple||this._initializeTabIndex()}writeValue(e){this.value=e,this._changeDetector.markForCheck()}registerOnChange(e){this._controlValueAccessorChangeFn=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this.disabled=e}_keydown(e){if(this.multiple||this.disabled||Et(e))return;let r=e.target.id,o=this._buttonToggles.toArray().findIndex(s=>s.buttonId===r),a=null;switch(e.keyCode){case 32:case 13:a=this._buttonToggles.get(o)||null;break;case 38:a=this._getNextButton(o,-1);break;case 37:a=this._getNextButton(o,this.dir==="ltr"?-1:1);break;case 40:a=this._getNextButton(o,1);break;case 39:a=this._getNextButton(o,this.dir==="ltr"?1:-1);break;default:return}a&&(e.preventDefault(),a._onButtonClick(),a.focus())}_emitChangeEvent(e){let i=new jd(e,this.value);this._rawValue=i.value,this._controlValueAccessorChangeFn(i.value),this.change.emit(i)}_syncButtonToggle(e,i,r=!1,o=!1){!this.multiple&&this.selected&&!e.checked&&(this.selected.checked=!1),this._selectionModel?i?this._selectionModel.select(e):this._selectionModel.deselect(e):o=!0,o?Promise.resolve().then(()=>this._updateModelValue(e,r)):this._updateModelValue(e,r)}_isSelected(e){return this._selectionModel&&this._selectionModel.isSelected(e)}_isPrechecked(e){return typeof this._rawValue>"u"?!1:this.multiple&&Array.isArray(this._rawValue)?this._rawValue.some(i=>e.value!=null&&i===e.value):e.value===this._rawValue}_initializeTabIndex(){if(this._buttonToggles.forEach(e=>{e.tabIndex=-1}),this.selected)this.selected.tabIndex=0;else for(let e=0;e<this._buttonToggles.length;e++){let i=this._buttonToggles.get(e);if(!i.disabled){i.tabIndex=0;break}}}_getNextButton(e,i){let r=this._buttonToggles;for(let o=1;o<=r.length;o++){let a=(e+i*o+r.length)%r.length,s=r.get(a);if(s&&!s.disabled)return s}return null}_setSelectionByValue(e){if(this._rawValue=e,!this._buttonToggles)return;let i=this._buttonToggles.toArray();if(this.multiple&&e?(Array.isArray(e),this._clearSelection(),e.forEach(r=>this._selectValue(r,i))):(this._clearSelection(),this._selectValue(e,i)),!this.multiple&&i.every(r=>r.tabIndex===-1)){for(let r of i)if(!r.disabled){r.tabIndex=0;break}}}_clearSelection(){this._selectionModel.clear(),this._buttonToggles.forEach(e=>{e.checked=!1,this.multiple||(e.tabIndex=-1)})}_selectValue(e,i){for(let r of i)if(r.value===e){r.checked=!0,this._selectionModel.select(r),this.multiple||(r.tabIndex=0);break}}_updateModelValue(e,i){i&&this._emitChangeEvent(e),this.valueChange.emit(this.value)}_markButtonsForCheck(){this._buttonToggles?.forEach(e=>e._markForCheck())}static \u0275fac=function(i){return new(i||t)};static \u0275dir=U({type:t,selectors:[["mat-button-toggle-group"]],contentQueries:function(i,r,o){if(i&1&&kn(o,Hd,5),i&2){let a;K(a=Q())&&(r._buttonToggles=a)}},hostAttrs:[1,"mat-button-toggle-group"],hostVars:6,hostBindings:function(i,r){i&1&&M("keydown",function(a){return r._keydown(a)}),i&2&&(P("role",r.multiple?"group":"radiogroup")("aria-disabled",r.disabled),I("mat-button-toggle-vertical",r.vertical)("mat-button-toggle-group-appearance-standard",r.appearance==="standard"))},inputs:{appearance:"appearance",name:"name",vertical:[2,"vertical","vertical",ie],value:"value",multiple:[2,"multiple","multiple",ie],disabled:[2,"disabled","disabled",ie],disabledInteractive:[2,"disabledInteractive","disabledInteractive",ie],hideSingleSelectionIndicator:[2,"hideSingleSelectionIndicator","hideSingleSelectionIndicator",ie],hideMultipleSelectionIndicator:[2,"hideMultipleSelectionIndicator","hideMultipleSelectionIndicator",ie]},outputs:{valueChange:"valueChange",change:"change"},exportAs:["matButtonToggleGroup"],features:[Be([rR,{provide:cC,useExisting:t}])]})}return t})(),Hd=(()=>{class t{_changeDetectorRef=d(xe);_elementRef=d(L);_focusMonitor=d(Nt);_idGenerator=d(Ie);_animationDisabled=we();_checked=!1;ariaLabel;ariaLabelledby=null;_buttonElement;buttonToggleGroup;get buttonId(){return`${this.id}-button`}id;name;value;get tabIndex(){return this._tabIndex()}set tabIndex(e){this._tabIndex.set(e)}_tabIndex;disableRipple=!1;get appearance(){return this.buttonToggleGroup?this.buttonToggleGroup.appearance:this._appearance}set appearance(e){this._appearance=e}_appearance;get checked(){return this.buttonToggleGroup?this.buttonToggleGroup._isSelected(this):this._checked}set checked(e){e!==this._checked&&(this._checked=e,this.buttonToggleGroup&&this.buttonToggleGroup._syncButtonToggle(this,this._checked),this._changeDetectorRef.markForCheck())}get disabled(){return this._disabled||this.buttonToggleGroup&&this.buttonToggleGroup.disabled}set disabled(e){this._disabled=e}_disabled=!1;get disabledInteractive(){return this._disabledInteractive||this.buttonToggleGroup!==null&&this.buttonToggleGroup.disabledInteractive}set disabledInteractive(e){this._disabledInteractive=e}_disabledInteractive;change=new F;constructor(){d(Re).load(An);let e=d(cC,{optional:!0}),i=d(new Tn("tabindex"),{optional:!0})||"",r=d(lC,{optional:!0});this._tabIndex=x(parseInt(i)||0),this.buttonToggleGroup=e,this._appearance=r&&r.appearance?r.appearance:"standard",this._disabledInteractive=r?.disabledInteractive??!1}ngOnInit(){let e=this.buttonToggleGroup;this.id=this.id||this._idGenerator.getId("mat-button-toggle-"),e&&(e._isPrechecked(this)?this.checked=!0:e._isSelected(this)!==this._checked&&e._syncButtonToggle(this,this._checked))}ngAfterViewInit(){this._animationDisabled||this._elementRef.nativeElement.classList.add("mat-button-toggle-animations-enabled"),this._focusMonitor.monitor(this._elementRef,!0)}ngOnDestroy(){let e=this.buttonToggleGroup;this._focusMonitor.stopMonitoring(this._elementRef),e&&e._isSelected(this)&&e._syncButtonToggle(this,!1,!1,!0)}focus(e){this._buttonElement.nativeElement.focus(e)}_onButtonClick(){if(this.disabled)return;let e=this.isSingleSelector()?!0:!this._checked;if(e!==this._checked&&(this._checked=e,this.buttonToggleGroup&&(this.buttonToggleGroup._syncButtonToggle(this,this._checked,!0),this.buttonToggleGroup._onTouched())),this.isSingleSelector()){let i=this.buttonToggleGroup._buttonToggles.find(r=>r.tabIndex===0);i&&(i.tabIndex=-1),this.tabIndex=0}this.change.emit(new jd(this,this.value))}_markForCheck(){this._changeDetectorRef.markForCheck()}_getButtonName(){return this.isSingleSelector()?this.buttonToggleGroup.name:this.name||null}isSingleSelector(){return this.buttonToggleGroup&&!this.buttonToggleGroup.multiple}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["mat-button-toggle"]],viewQuery:function(i,r){if(i&1&&ve(tR,5),i&2){let o;K(o=Q())&&(r._buttonElement=o.first)}},hostAttrs:["role","presentation",1,"mat-button-toggle"],hostVars:14,hostBindings:function(i,r){i&1&&M("focus",function(){return r.focus()}),i&2&&(P("aria-label",null)("aria-labelledby",null)("id",r.id)("name",null),I("mat-button-toggle-standalone",!r.buttonToggleGroup)("mat-button-toggle-checked",r.checked)("mat-button-toggle-disabled",r.disabled)("mat-button-toggle-disabled-interactive",r.disabledInteractive)("mat-button-toggle-appearance-standard",r.appearance==="standard"))},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],id:"id",name:"name",value:"value",tabIndex:"tabIndex",disableRipple:[2,"disableRipple","disableRipple",ie],appearance:"appearance",checked:[2,"checked","checked",ie],disabled:[2,"disabled","disabled",ie],disabledInteractive:[2,"disabledInteractive","disabledInteractive",ie]},outputs:{change:"change"},exportAs:["matButtonToggle"],ngContentSelectors:nR,decls:7,vars:13,consts:[["button",""],["type","button",1,"mat-button-toggle-button","mat-focus-indicator",3,"click","id","disabled"],[1,"mat-button-toggle-checkbox-wrapper"],[1,"mat-button-toggle-label-content"],[1,"mat-button-toggle-focus-overlay"],["matRipple","",1,"mat-button-toggle-ripple",3,"matRippleTrigger","matRippleDisabled"],["state","checked","aria-hidden","true","appearance","minimal",3,"disabled"]],template:function(i,r){if(i&1&&(Ne(),m(0,"button",1,0),M("click",function(){return r._onButtonClick()}),V(2,iR,2,1,"div",2),m(3,"span",3),ce(4),h()(),j(5,"span",4)(6,"span",5)),i&2){let o=Gt(1);T("id",r.buttonId)("disabled",r.disabled&&!r.disabledInteractive||null),P("role",r.isSingleSelector()?"radio":"button")("tabindex",r.disabled&&!r.disabledInteractive?-1:r.tabIndex)("aria-pressed",r.isSingleSelector()?null:r.checked)("aria-checked",r.isSingleSelector()?r.checked:null)("name",r._getButtonName())("aria-label",r.ariaLabel)("aria-labelledby",r.ariaLabelledby)("aria-disabled",r.disabled&&r.disabledInteractive?"true":null),_(2),B(r.buttonToggleGroup&&(!r.buttonToggleGroup.multiple&&!r.buttonToggleGroup.hideSingleSelectionIndicator||r.buttonToggleGroup.multiple&&!r.buttonToggleGroup.hideMultipleSelectionIndicator)?2:-1),_(4),T("matRippleTrigger",o)("matRippleDisabled",r.disableRipple||r.disabled)}},dependencies:[Oo,sC],styles:[`.mat-button-toggle-standalone,
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
`],encapsulation:2,changeDetection:0})}return t})(),dC=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=Z({type:t});static \u0275inj=q({imports:[No,Hd,ye]})}return t})();var aR=["mat-internal-form-field",""],sR=["*"],uC=(()=>{class t{labelPosition="after";static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["div","mat-internal-form-field",""]],hostAttrs:[1,"mdc-form-field","mat-internal-form-field"],hostVars:2,hostBindings:function(i,r){i&2&&I("mdc-form-field--align-end",r.labelPosition==="before")},inputs:{labelPosition:"labelPosition"},attrs:aR,ngContentSelectors:sR,decls:1,vars:0,template:function(i,r){i&1&&(Ne(),ce(0))},styles:[`.mat-internal-form-field {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
}
.mat-internal-form-field > label {
  margin-left: 0;
  margin-right: auto;
  padding-left: 4px;
  padding-right: 0;
  order: 0;
}
[dir=rtl] .mat-internal-form-field > label {
  margin-left: auto;
  margin-right: 0;
  padding-left: 0;
  padding-right: 4px;
}

.mdc-form-field--align-end > label {
  margin-left: auto;
  margin-right: 0;
  padding-left: 0;
  padding-right: 4px;
  order: -1;
}
[dir=rtl] .mdc-form-field--align-end .mdc-form-field--align-end label {
  margin-left: 0;
  margin-right: auto;
  padding-left: 4px;
  padding-right: 0;
}
`],encapsulation:2,changeDetection:0})}return t})();var lR=["input"],cR=["label"],dR=["*"],Np={color:"accent",clickAction:"check-indeterminate",disabledInteractive:!1},uR=new b("mat-checkbox-default-options",{providedIn:"root",factory:()=>Np}),ft=(function(t){return t[t.Init=0]="Init",t[t.Checked=1]="Checked",t[t.Unchecked=2]="Unchecked",t[t.Indeterminate=3]="Indeterminate",t})(ft||{}),Fp=class{source;checked},Pp=(()=>{class t{_elementRef=d(L);_changeDetectorRef=d(xe);_ngZone=d(A);_animationsDisabled=we();_options=d(uR,{optional:!0});focus(){this._inputElement.nativeElement.focus()}_createChangeEvent(e){let i=new Fp;return i.source=this,i.checked=e,i}_getAnimationTargetElement(){return this._inputElement?.nativeElement}_animationClasses={uncheckedToChecked:"mdc-checkbox--anim-unchecked-checked",uncheckedToIndeterminate:"mdc-checkbox--anim-unchecked-indeterminate",checkedToUnchecked:"mdc-checkbox--anim-checked-unchecked",checkedToIndeterminate:"mdc-checkbox--anim-checked-indeterminate",indeterminateToChecked:"mdc-checkbox--anim-indeterminate-checked",indeterminateToUnchecked:"mdc-checkbox--anim-indeterminate-unchecked"};ariaLabel="";ariaLabelledby=null;ariaDescribedby;ariaExpanded;ariaControls;ariaOwns;_uniqueId;id;get inputId(){return`${this.id||this._uniqueId}-input`}required=!1;labelPosition="after";name=null;change=new F;indeterminateChange=new F;value;disableRipple=!1;_inputElement;_labelElement;tabIndex;color;disabledInteractive;_onTouched=()=>{};_currentAnimationClass="";_currentCheckState=ft.Init;_controlValueAccessorChangeFn=()=>{};_validatorChangeFn=()=>{};constructor(){d(Re).load(An);let e=d(new Tn("tabindex"),{optional:!0});this._options=this._options||Np,this.color=this._options.color||Np.color,this.tabIndex=e==null?0:parseInt(e)||0,this.id=this._uniqueId=d(Ie).getId("mat-mdc-checkbox-"),this.disabledInteractive=this._options?.disabledInteractive??!1}ngOnChanges(e){e.required&&this._validatorChangeFn()}ngAfterViewInit(){this._syncIndeterminate(this.indeterminate)}get checked(){return this._checked}set checked(e){e!=this.checked&&(this._checked=e,this._changeDetectorRef.markForCheck())}_checked=!1;get disabled(){return this._disabled}set disabled(e){e!==this.disabled&&(this._disabled=e,this._changeDetectorRef.markForCheck())}_disabled=!1;get indeterminate(){return this._indeterminate()}set indeterminate(e){let i=e!=this._indeterminate();this._indeterminate.set(e),i&&(e?this._transitionCheckState(ft.Indeterminate):this._transitionCheckState(this.checked?ft.Checked:ft.Unchecked),this.indeterminateChange.emit(e)),this._syncIndeterminate(e)}_indeterminate=x(!1);_isRippleDisabled(){return this.disableRipple||this.disabled}_onLabelTextChange(){this._changeDetectorRef.detectChanges()}writeValue(e){this.checked=!!e}registerOnChange(e){this._controlValueAccessorChangeFn=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this.disabled=e}validate(e){return this.required&&e.value!==!0?{required:!0}:null}registerOnValidatorChange(e){this._validatorChangeFn=e}_transitionCheckState(e){let i=this._currentCheckState,r=this._getAnimationTargetElement();if(!(i===e||!r)&&(this._currentAnimationClass&&r.classList.remove(this._currentAnimationClass),this._currentAnimationClass=this._getAnimationClassForCheckStateTransition(i,e),this._currentCheckState=e,this._currentAnimationClass.length>0)){r.classList.add(this._currentAnimationClass);let o=this._currentAnimationClass;this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{r.classList.remove(o)},1e3)})}}_emitChangeEvent(){this._controlValueAccessorChangeFn(this.checked),this.change.emit(this._createChangeEvent(this.checked)),this._inputElement&&(this._inputElement.nativeElement.checked=this.checked)}toggle(){this.checked=!this.checked,this._controlValueAccessorChangeFn(this.checked)}_handleInputClick(){let e=this._options?.clickAction;!this.disabled&&e!=="noop"?(this.indeterminate&&e!=="check"&&Promise.resolve().then(()=>{this._indeterminate.set(!1),this.indeterminateChange.emit(!1)}),this._checked=!this._checked,this._transitionCheckState(this._checked?ft.Checked:ft.Unchecked),this._emitChangeEvent()):(this.disabled&&this.disabledInteractive||!this.disabled&&e==="noop")&&(this._inputElement.nativeElement.checked=this.checked,this._inputElement.nativeElement.indeterminate=this.indeterminate)}_onInteractionEvent(e){e.stopPropagation()}_onBlur(){Promise.resolve().then(()=>{this._onTouched(),this._changeDetectorRef.markForCheck()})}_getAnimationClassForCheckStateTransition(e,i){if(this._animationsDisabled)return"";switch(e){case ft.Init:if(i===ft.Checked)return this._animationClasses.uncheckedToChecked;if(i==ft.Indeterminate)return this._checked?this._animationClasses.checkedToIndeterminate:this._animationClasses.uncheckedToIndeterminate;break;case ft.Unchecked:return i===ft.Checked?this._animationClasses.uncheckedToChecked:this._animationClasses.uncheckedToIndeterminate;case ft.Checked:return i===ft.Unchecked?this._animationClasses.checkedToUnchecked:this._animationClasses.checkedToIndeterminate;case ft.Indeterminate:return i===ft.Checked?this._animationClasses.indeterminateToChecked:this._animationClasses.indeterminateToUnchecked}return""}_syncIndeterminate(e){let i=this._inputElement;i&&(i.nativeElement.indeterminate=e)}_onInputClick(){this._handleInputClick()}_onTouchTargetClick(){this._handleInputClick(),this.disabled||this._inputElement.nativeElement.focus()}_preventBubblingFromLabel(e){e.target&&this._labelElement.nativeElement.contains(e.target)&&e.stopPropagation()}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["mat-checkbox"]],viewQuery:function(i,r){if(i&1&&ve(lR,5)(cR,5),i&2){let o;K(o=Q())&&(r._inputElement=o.first),K(o=Q())&&(r._labelElement=o.first)}},hostAttrs:[1,"mat-mdc-checkbox"],hostVars:16,hostBindings:function(i,r){i&2&&(et("id",r.id),P("tabindex",null)("aria-label",null)("aria-labelledby",null),rt(r.color?"mat-"+r.color:"mat-accent"),I("_mat-animation-noopable",r._animationsDisabled)("mdc-checkbox--disabled",r.disabled)("mat-mdc-checkbox-disabled",r.disabled)("mat-mdc-checkbox-checked",r.checked)("mat-mdc-checkbox-disabled-interactive",r.disabledInteractive))},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[0,"aria-describedby","ariaDescribedby"],ariaExpanded:[2,"aria-expanded","ariaExpanded",ie],ariaControls:[0,"aria-controls","ariaControls"],ariaOwns:[0,"aria-owns","ariaOwns"],id:"id",required:[2,"required","required",ie],labelPosition:"labelPosition",name:"name",value:"value",disableRipple:[2,"disableRipple","disableRipple",ie],tabIndex:[2,"tabIndex","tabIndex",e=>e==null?void 0:Di(e)],color:"color",disabledInteractive:[2,"disabledInteractive","disabledInteractive",ie],checked:[2,"checked","checked",ie],disabled:[2,"disabled","disabled",ie],indeterminate:[2,"indeterminate","indeterminate",ie]},outputs:{change:"change",indeterminateChange:"indeterminateChange"},exportAs:["matCheckbox"],features:[Be([{provide:zo,useExisting:ht(()=>t),multi:!0},{provide:Ms,useExisting:t,multi:!0}]),We],ngContentSelectors:dR,decls:15,vars:23,consts:[["checkbox",""],["input",""],["label",""],["mat-internal-form-field","",3,"click","labelPosition"],[1,"mdc-checkbox"],["aria-hidden","true",1,"mat-mdc-checkbox-touch-target",3,"click"],["type","checkbox",1,"mdc-checkbox__native-control",3,"blur","click","change","checked","indeterminate","disabled","id","required","tabIndex"],["aria-hidden","true",1,"mdc-checkbox__ripple"],["aria-hidden","true",1,"mdc-checkbox__background"],["focusable","false","viewBox","0 0 24 24",1,"mdc-checkbox__checkmark"],["fill","none","d","M1.73,12.91 8.1,19.28 22.79,4.59",1,"mdc-checkbox__checkmark-path"],[1,"mdc-checkbox__mixedmark"],["mat-ripple","","aria-hidden","true",1,"mat-mdc-checkbox-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled","matRippleCentered"],[1,"mdc-label",3,"for"]],template:function(i,r){if(i&1&&(Ne(),m(0,"div",3),M("click",function(a){return r._preventBubblingFromLabel(a)}),m(1,"div",4,0)(3,"div",5),M("click",function(){return r._onTouchTargetClick()}),h(),m(4,"input",6,1),M("blur",function(){return r._onBlur()})("click",function(){return r._onInputClick()})("change",function(a){return r._onInteractionEvent(a)}),h(),j(6,"div",7),m(7,"div",8),yt(),m(8,"svg",9),j(9,"path",10),h(),jn(),j(10,"div",11),h(),j(11,"div",12),h(),m(12,"label",13,2),ce(14),h()()),i&2){let o=Gt(2);T("labelPosition",r.labelPosition),_(4),I("mdc-checkbox--selected",r.checked),T("checked",r.checked)("indeterminate",r.indeterminate)("disabled",r.disabled&&!r.disabledInteractive)("id",r.inputId)("required",r.required)("tabIndex",r.disabled&&!r.disabledInteractive?-1:r.tabIndex),P("aria-label",r.ariaLabel||null)("aria-labelledby",r.ariaLabelledby)("aria-describedby",r.ariaDescribedby)("aria-checked",r.indeterminate?"mixed":null)("aria-controls",r.ariaControls)("aria-disabled",r.disabled&&r.disabledInteractive?!0:null)("aria-expanded",r.ariaExpanded)("aria-owns",r.ariaOwns)("name",r.name)("value",r.value),_(7),T("matRippleTrigger",o)("matRippleDisabled",r.disableRipple||r.disabled)("matRippleCentered",!0),_(),T("for",r.inputId)}},dependencies:[Oo,uC],styles:[`.mdc-checkbox {
  display: inline-block;
  position: relative;
  flex: 0 0 18px;
  box-sizing: content-box;
  width: 18px;
  height: 18px;
  line-height: 0;
  white-space: nowrap;
  cursor: pointer;
  vertical-align: bottom;
  padding: calc((var(--mat-checkbox-state-layer-size, 40px) - 18px) / 2);
  margin: calc((var(--mat-checkbox-state-layer-size, 40px) - var(--mat-checkbox-state-layer-size, 40px)) / 2);
}
.mdc-checkbox:hover > .mdc-checkbox__ripple {
  opacity: var(--mat-checkbox-unselected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
  background-color: var(--mat-checkbox-unselected-hover-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox:hover > .mat-mdc-checkbox-ripple > .mat-ripple-element {
  background-color: var(--mat-checkbox-unselected-hover-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox .mdc-checkbox__native-control:focus + .mdc-checkbox__ripple {
  opacity: var(--mat-checkbox-unselected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
  background-color: var(--mat-checkbox-unselected-focus-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox .mdc-checkbox__native-control:focus ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--mat-checkbox-unselected-focus-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox:active > .mdc-checkbox__native-control + .mdc-checkbox__ripple {
  opacity: var(--mat-checkbox-unselected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
  background-color: var(--mat-checkbox-unselected-pressed-state-layer-color, var(--mat-sys-primary));
}
.mdc-checkbox:active > .mdc-checkbox__native-control ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--mat-checkbox-unselected-pressed-state-layer-color, var(--mat-sys-primary));
}
.mdc-checkbox:hover > .mdc-checkbox__native-control:checked + .mdc-checkbox__ripple {
  opacity: var(--mat-checkbox-selected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
  background-color: var(--mat-checkbox-selected-hover-state-layer-color, var(--mat-sys-primary));
}
.mdc-checkbox:hover > .mdc-checkbox__native-control:checked ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--mat-checkbox-selected-hover-state-layer-color, var(--mat-sys-primary));
}
.mdc-checkbox .mdc-checkbox__native-control:focus:checked + .mdc-checkbox__ripple {
  opacity: var(--mat-checkbox-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
  background-color: var(--mat-checkbox-selected-focus-state-layer-color, var(--mat-sys-primary));
}
.mdc-checkbox .mdc-checkbox__native-control:focus:checked ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--mat-checkbox-selected-focus-state-layer-color, var(--mat-sys-primary));
}
.mdc-checkbox:active > .mdc-checkbox__native-control:checked + .mdc-checkbox__ripple {
  opacity: var(--mat-checkbox-selected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
  background-color: var(--mat-checkbox-selected-pressed-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox:active > .mdc-checkbox__native-control:checked ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--mat-checkbox-selected-pressed-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control ~ .mat-mdc-checkbox-ripple .mat-ripple-element,
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control + .mdc-checkbox__ripple {
  background-color: var(--mat-checkbox-unselected-hover-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox .mdc-checkbox__native-control {
  position: absolute;
  margin: 0;
  padding: 0;
  opacity: 0;
  cursor: inherit;
  z-index: 1;
  width: var(--mat-checkbox-state-layer-size, 40px);
  height: var(--mat-checkbox-state-layer-size, 40px);
  top: calc((var(--mat-checkbox-state-layer-size, 40px) - var(--mat-checkbox-state-layer-size, 40px)) / 2);
  right: calc((var(--mat-checkbox-state-layer-size, 40px) - var(--mat-checkbox-state-layer-size, 40px)) / 2);
  left: calc((var(--mat-checkbox-state-layer-size, 40px) - var(--mat-checkbox-state-layer-size, 40px)) / 2);
}

.mdc-checkbox--disabled {
  cursor: default;
  pointer-events: none;
}

.mdc-checkbox__background {
  display: inline-flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 18px;
  height: 18px;
  border: 2px solid currentColor;
  border-radius: 2px;
  background-color: transparent;
  pointer-events: none;
  will-change: background-color, border-color;
  transition: background-color 90ms cubic-bezier(0.4, 0, 0.6, 1), border-color 90ms cubic-bezier(0.4, 0, 0.6, 1);
  -webkit-print-color-adjust: exact;
  color-adjust: exact;
  border-color: var(--mat-checkbox-unselected-icon-color, var(--mat-sys-on-surface-variant));
  top: calc((var(--mat-checkbox-state-layer-size, 40px) - 18px) / 2);
  left: calc((var(--mat-checkbox-state-layer-size, 40px) - 18px) / 2);
}

.mdc-checkbox__native-control:enabled:checked ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:enabled:indeterminate ~ .mdc-checkbox__background {
  border-color: var(--mat-checkbox-selected-icon-color, var(--mat-sys-primary));
  background-color: var(--mat-checkbox-selected-icon-color, var(--mat-sys-primary));
}

.mdc-checkbox--disabled .mdc-checkbox__background {
  border-color: var(--mat-checkbox-disabled-unselected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mdc-checkbox--disabled .mdc-checkbox__background {
    border-color: GrayText;
  }
}

.mdc-checkbox__native-control:disabled:checked ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:disabled:indeterminate ~ .mdc-checkbox__background {
  background-color: var(--mat-checkbox-disabled-selected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  border-color: transparent;
}
@media (forced-colors: active) {
  .mdc-checkbox__native-control:disabled:checked ~ .mdc-checkbox__background,
  .mdc-checkbox__native-control:disabled:indeterminate ~ .mdc-checkbox__background {
    border-color: GrayText;
  }
}

.mdc-checkbox:hover > .mdc-checkbox__native-control:not(:checked) ~ .mdc-checkbox__background,
.mdc-checkbox:hover > .mdc-checkbox__native-control:not(:indeterminate) ~ .mdc-checkbox__background {
  border-color: var(--mat-checkbox-unselected-hover-icon-color, var(--mat-sys-on-surface));
  background-color: transparent;
}

.mdc-checkbox:hover > .mdc-checkbox__native-control:checked ~ .mdc-checkbox__background,
.mdc-checkbox:hover > .mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background {
  border-color: var(--mat-checkbox-selected-hover-icon-color, var(--mat-sys-primary));
  background-color: var(--mat-checkbox-selected-hover-icon-color, var(--mat-sys-primary));
}

.mdc-checkbox__native-control:focus:focus:not(:checked) ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:focus:focus:not(:indeterminate) ~ .mdc-checkbox__background {
  border-color: var(--mat-checkbox-unselected-focus-icon-color, var(--mat-sys-on-surface));
}

.mdc-checkbox__native-control:focus:focus:checked ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:focus:focus:indeterminate ~ .mdc-checkbox__background {
  border-color: var(--mat-checkbox-selected-focus-icon-color, var(--mat-sys-primary));
  background-color: var(--mat-checkbox-selected-focus-icon-color, var(--mat-sys-primary));
}

.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox:hover > .mdc-checkbox__native-control ~ .mdc-checkbox__background,
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control:focus ~ .mdc-checkbox__background,
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__background {
  border-color: var(--mat-checkbox-disabled-unselected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox:hover > .mdc-checkbox__native-control ~ .mdc-checkbox__background,
  .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control:focus ~ .mdc-checkbox__background,
  .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__background {
    border-color: GrayText;
  }
}
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__native-control:checked ~ .mdc-checkbox__background,
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background {
  background-color: var(--mat-checkbox-disabled-selected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  border-color: transparent;
}

.mdc-checkbox__checkmark {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  opacity: 0;
  transition: opacity 180ms cubic-bezier(0.4, 0, 0.6, 1);
  color: var(--mat-checkbox-selected-checkmark-color, var(--mat-sys-on-primary));
}
@media (forced-colors: active) {
  .mdc-checkbox__checkmark {
    color: CanvasText;
  }
}

.mdc-checkbox--disabled .mdc-checkbox__checkmark, .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__checkmark {
  color: var(--mat-checkbox-disabled-selected-checkmark-color, var(--mat-sys-surface));
}
@media (forced-colors: active) {
  .mdc-checkbox--disabled .mdc-checkbox__checkmark, .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__checkmark {
    color: GrayText;
  }
}

.mdc-checkbox__checkmark-path {
  transition: stroke-dashoffset 180ms cubic-bezier(0.4, 0, 0.6, 1);
  stroke: currentColor;
  stroke-width: 3.12px;
  stroke-dashoffset: 29.7833385;
  stroke-dasharray: 29.7833385;
}

.mdc-checkbox__mixedmark {
  width: 100%;
  height: 0;
  transform: scaleX(0) rotate(0deg);
  border-width: 1px;
  border-style: solid;
  opacity: 0;
  transition: opacity 90ms cubic-bezier(0.4, 0, 0.6, 1), transform 90ms cubic-bezier(0.4, 0, 0.6, 1);
  border-color: var(--mat-checkbox-selected-checkmark-color, var(--mat-sys-on-primary));
}
@media (forced-colors: active) {
  .mdc-checkbox__mixedmark {
    margin: 0 1px;
  }
}

.mdc-checkbox--disabled .mdc-checkbox__mixedmark, .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__mixedmark {
  border-color: var(--mat-checkbox-disabled-selected-checkmark-color, var(--mat-sys-surface));
}
@media (forced-colors: active) {
  .mdc-checkbox--disabled .mdc-checkbox__mixedmark, .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__mixedmark {
    border-color: GrayText;
  }
}

.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__background,
.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__background,
.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__background,
.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__background {
  animation-duration: 180ms;
  animation-timing-function: linear;
}

.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__checkmark-path {
  animation: mdc-checkbox-unchecked-checked-checkmark-path 180ms linear;
  transition: none;
}

.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__mixedmark {
  animation: mdc-checkbox-unchecked-indeterminate-mixedmark 90ms linear;
  transition: none;
}

.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__checkmark-path {
  animation: mdc-checkbox-checked-unchecked-checkmark-path 90ms linear;
  transition: none;
}

.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__checkmark {
  animation: mdc-checkbox-checked-indeterminate-checkmark 90ms linear;
  transition: none;
}
.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__mixedmark {
  animation: mdc-checkbox-checked-indeterminate-mixedmark 90ms linear;
  transition: none;
}

.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__checkmark {
  animation: mdc-checkbox-indeterminate-checked-checkmark 500ms linear;
  transition: none;
}
.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__mixedmark {
  animation: mdc-checkbox-indeterminate-checked-mixedmark 500ms linear;
  transition: none;
}

.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__mixedmark {
  animation: mdc-checkbox-indeterminate-unchecked-mixedmark 300ms linear;
  transition: none;
}

.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background {
  transition: border-color 90ms cubic-bezier(0, 0, 0.2, 1), background-color 90ms cubic-bezier(0, 0, 0.2, 1);
}
.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background > .mdc-checkbox__checkmark > .mdc-checkbox__checkmark-path,
.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background > .mdc-checkbox__checkmark > .mdc-checkbox__checkmark-path {
  stroke-dashoffset: 0;
}

.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background > .mdc-checkbox__checkmark {
  transition: opacity 180ms cubic-bezier(0, 0, 0.2, 1), transform 180ms cubic-bezier(0, 0, 0.2, 1);
  opacity: 1;
}
.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background > .mdc-checkbox__mixedmark {
  transform: scaleX(1) rotate(-45deg);
}

.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background > .mdc-checkbox__checkmark {
  transform: rotate(45deg);
  opacity: 0;
  transition: opacity 90ms cubic-bezier(0.4, 0, 0.6, 1), transform 90ms cubic-bezier(0.4, 0, 0.6, 1);
}
.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background > .mdc-checkbox__mixedmark {
  transform: scaleX(1) rotate(0deg);
  opacity: 1;
}

@keyframes mdc-checkbox-unchecked-checked-checkmark-path {
  0%, 50% {
    stroke-dashoffset: 29.7833385;
  }
  50% {
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  100% {
    stroke-dashoffset: 0;
  }
}
@keyframes mdc-checkbox-unchecked-indeterminate-mixedmark {
  0%, 68.2% {
    transform: scaleX(0);
  }
  68.2% {
    animation-timing-function: cubic-bezier(0, 0, 0, 1);
  }
  100% {
    transform: scaleX(1);
  }
}
@keyframes mdc-checkbox-checked-unchecked-checkmark-path {
  from {
    animation-timing-function: cubic-bezier(0.4, 0, 1, 1);
    opacity: 1;
    stroke-dashoffset: 0;
  }
  to {
    opacity: 0;
    stroke-dashoffset: -29.7833385;
  }
}
@keyframes mdc-checkbox-checked-indeterminate-checkmark {
  from {
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    transform: rotate(0deg);
    opacity: 1;
  }
  to {
    transform: rotate(45deg);
    opacity: 0;
  }
}
@keyframes mdc-checkbox-indeterminate-checked-checkmark {
  from {
    animation-timing-function: cubic-bezier(0.14, 0, 0, 1);
    transform: rotate(45deg);
    opacity: 0;
  }
  to {
    transform: rotate(360deg);
    opacity: 1;
  }
}
@keyframes mdc-checkbox-checked-indeterminate-mixedmark {
  from {
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    transform: rotate(-45deg);
    opacity: 0;
  }
  to {
    transform: rotate(0deg);
    opacity: 1;
  }
}
@keyframes mdc-checkbox-indeterminate-checked-mixedmark {
  from {
    animation-timing-function: cubic-bezier(0.14, 0, 0, 1);
    transform: rotate(0deg);
    opacity: 1;
  }
  to {
    transform: rotate(315deg);
    opacity: 0;
  }
}
@keyframes mdc-checkbox-indeterminate-unchecked-mixedmark {
  0% {
    animation-timing-function: linear;
    transform: scaleX(1);
    opacity: 1;
  }
  32.8%, 100% {
    transform: scaleX(0);
    opacity: 0;
  }
}
.mat-mdc-checkbox {
  display: inline-block;
  position: relative;
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mat-mdc-checkbox-touch-target,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__native-control,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__ripple,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mat-mdc-checkbox-ripple::before,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__background,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__background > .mdc-checkbox__checkmark,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__background > .mdc-checkbox__checkmark > .mdc-checkbox__checkmark-path,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__background > .mdc-checkbox__mixedmark {
  transition: none !important;
  animation: none !important;
}
.mat-mdc-checkbox label {
  cursor: pointer;
}
.mat-mdc-checkbox .mat-internal-form-field {
  color: var(--mat-checkbox-label-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-checkbox-label-text-font, var(--mat-sys-body-medium-font));
  line-height: var(--mat-checkbox-label-text-line-height, var(--mat-sys-body-medium-line-height));
  font-size: var(--mat-checkbox-label-text-size, var(--mat-sys-body-medium-size));
  letter-spacing: var(--mat-checkbox-label-text-tracking, var(--mat-sys-body-medium-tracking));
  font-weight: var(--mat-checkbox-label-text-weight, var(--mat-sys-body-medium-weight));
}
.mat-mdc-checkbox.mat-mdc-checkbox-disabled.mat-mdc-checkbox-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-checkbox.mat-mdc-checkbox-disabled.mat-mdc-checkbox-disabled-interactive input {
  cursor: default;
}
.mat-mdc-checkbox.mat-mdc-checkbox-disabled label {
  cursor: default;
  color: var(--mat-checkbox-disabled-label-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mat-mdc-checkbox.mat-mdc-checkbox-disabled label {
    color: GrayText;
  }
}
.mat-mdc-checkbox label:empty {
  display: none;
}
.mat-mdc-checkbox .mdc-checkbox__ripple {
  opacity: 0;
}

.mat-mdc-checkbox .mat-mdc-checkbox-ripple,
.mdc-checkbox__ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
.mat-mdc-checkbox .mat-mdc-checkbox-ripple:not(:empty),
.mdc-checkbox__ripple:not(:empty) {
  transform: translateZ(0);
}

.mat-mdc-checkbox-ripple .mat-ripple-element {
  opacity: 0.1;
}

.mat-mdc-checkbox-touch-target {
  position: absolute;
  top: 50%;
  left: 50%;
  height: var(--mat-checkbox-touch-target-size, 48px);
  width: var(--mat-checkbox-touch-target-size, 48px);
  transform: translate(-50%, -50%);
  display: var(--mat-checkbox-touch-target-display, block);
}

.mat-mdc-checkbox .mat-mdc-checkbox-ripple::before {
  border-radius: 50%;
}

.mdc-checkbox__native-control:focus-visible ~ .mat-focus-indicator::before {
  content: "";
}
`],encapsulation:2,changeDetection:0})}return t})(),fC=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=Z({type:t});static \u0275inj=q({imports:[Pp,ye]})}return t})();var mR=["determinateSpinner"];function hR(t,n){if(t&1&&(yt(),m(0,"svg",11),j(1,"circle",12),h()),t&2){let e=D();P("viewBox",e._viewBox()),_(),dt("stroke-dasharray",e._strokeCircumference(),"px")("stroke-dashoffset",e._strokeCircumference()/2,"px")("stroke-width",e._circleStrokeWidth(),"%"),P("r",e._circleRadius())}}var pR=new b("mat-progress-spinner-default-options",{providedIn:"root",factory:()=>({diameter:mC})}),mC=100,gR=10,Ud=(()=>{class t{_elementRef=d(L);_noopAnimations;get color(){return this._color||this._defaultColor}set color(e){this._color=e}_color;_defaultColor="primary";_determinateCircle;constructor(){let e=d(pR),i=Yh(),r=this._elementRef.nativeElement;this._noopAnimations=i==="di-disabled"&&!!e&&!e._forceAnimations,this.mode=r.nodeName.toLowerCase()==="mat-spinner"?"indeterminate":"determinate",!this._noopAnimations&&i==="reduced-motion"&&r.classList.add("mat-progress-spinner-reduced-motion"),e&&(e.color&&(this.color=this._defaultColor=e.color),e.diameter&&(this.diameter=e.diameter),e.strokeWidth&&(this.strokeWidth=e.strokeWidth))}mode;get value(){return this.mode==="determinate"?this._value:0}set value(e){this._value=Math.max(0,Math.min(100,e||0))}_value=0;get diameter(){return this._diameter}set diameter(e){this._diameter=e||0}_diameter=mC;get strokeWidth(){return this._strokeWidth??this.diameter/10}set strokeWidth(e){this._strokeWidth=e||0}_strokeWidth;_circleRadius(){return(this.diameter-gR)/2}_viewBox(){let e=this._circleRadius()*2+this.strokeWidth;return`0 0 ${e} ${e}`}_strokeCircumference(){return 2*Math.PI*this._circleRadius()}_strokeDashOffset(){return this.mode==="determinate"?this._strokeCircumference()*(100-this._value)/100:null}_circleStrokeWidth(){return this.strokeWidth/this.diameter*100}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["mat-progress-spinner"],["mat-spinner"]],viewQuery:function(i,r){if(i&1&&ve(mR,5),i&2){let o;K(o=Q())&&(r._determinateCircle=o.first)}},hostAttrs:["role","progressbar","tabindex","-1",1,"mat-mdc-progress-spinner","mdc-circular-progress"],hostVars:18,hostBindings:function(i,r){i&2&&(P("aria-valuemin",0)("aria-valuemax",100)("aria-valuenow",r.mode==="determinate"?r.value:null)("mode",r.mode),rt("mat-"+r.color),dt("width",r.diameter,"px")("height",r.diameter,"px")("--mat-progress-spinner-size",r.diameter+"px")("--mat-progress-spinner-active-indicator-width",r.diameter+"px"),I("_mat-animation-noopable",r._noopAnimations)("mdc-circular-progress--indeterminate",r.mode==="indeterminate"))},inputs:{color:"color",mode:"mode",value:[2,"value","value",Di],diameter:[2,"diameter","diameter",Di],strokeWidth:[2,"strokeWidth","strokeWidth",Di]},exportAs:["matProgressSpinner"],decls:14,vars:11,consts:[["circle",""],["determinateSpinner",""],["aria-hidden","true",1,"mdc-circular-progress__determinate-container"],["xmlns","http://www.w3.org/2000/svg","focusable","false",1,"mdc-circular-progress__determinate-circle-graphic"],["cx","50%","cy","50%",1,"mdc-circular-progress__determinate-circle"],["aria-hidden","true",1,"mdc-circular-progress__indeterminate-container"],[1,"mdc-circular-progress__spinner-layer"],[1,"mdc-circular-progress__circle-clipper","mdc-circular-progress__circle-left"],[3,"ngTemplateOutlet"],[1,"mdc-circular-progress__gap-patch"],[1,"mdc-circular-progress__circle-clipper","mdc-circular-progress__circle-right"],["xmlns","http://www.w3.org/2000/svg","focusable","false",1,"mdc-circular-progress__indeterminate-circle-graphic"],["cx","50%","cy","50%"]],template:function(i,r){if(i&1&&(it(0,hR,2,8,"ng-template",null,0,Ka),m(2,"div",2,1),yt(),m(4,"svg",3),j(5,"circle",4),h()(),jn(),m(6,"div",5)(7,"div",6)(8,"div",7),vo(9,8),h(),m(10,"div",9),vo(11,8),h(),m(12,"div",10),vo(13,8),h()()()),i&2){let o=Gt(1);_(4),P("viewBox",r._viewBox()),_(),dt("stroke-dasharray",r._strokeCircumference(),"px")("stroke-dashoffset",r._strokeDashOffset(),"px")("stroke-width",r._circleStrokeWidth(),"%"),P("r",r._circleRadius()),_(4),T("ngTemplateOutlet",o),_(2),T("ngTemplateOutlet",o),_(2),T("ngTemplateOutlet",o)}},dependencies:[es],styles:[`.mat-mdc-progress-spinner {
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
`],encapsulation:2,changeDetection:0})}return t})();var zd=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=Z({type:t});static \u0275inj=q({imports:[ye]})}return t})();var Go=class t{constructor(n){this.http=n}getSettings(){return this.http.get("/api/settings")}updateSettings(n){return this.http.put("/api/settings",n)}getDefaults(){return this.http.get("/api/settings/defaults")}static \u0275fac=function(e){return new(e||t)(R(ut))};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})};var _R=(t,n)=>n.title,bR=(t,n)=>n.key;function vR(t,n){t&1&&(m(0,"div",3),j(1,"mat-spinner",9),m(2,"span"),C(3,"Loading settings\u2026"),h()())}function yR(t,n){if(t&1&&j(0,"textarea",27),t&2){let e=D().$implicit,i=D(3);T("formControlName",e.key)("placeholder",i.placeholderFor(e))}}function DR(t,n){if(t&1){let e=pe();m(0,"button",31),M("click",function(){te(e);let r=D(2).$implicit,o=D(3);return ne(o.toggleReveal(r.key))}),m(1,"mat-icon"),C(2),h()()}if(t&2){let e=D(2).$implicit,i=D(3);T("matTooltip",i.isRevealed(e.key)?"Hide":"Show"),P("aria-label",i.isRevealed(e.key)?"Hide value":"Show value"),_(2),oe(i.isRevealed(e.key)?"visibility_off":"visibility")}}function CR(t,n){if(t&1&&(j(0,"input",29),V(1,DR,3,3,"button",30)),t&2){let e=D().$implicit,i=D(3);T("type",i.fieldType(e))("formControlName",e.key)("placeholder",i.placeholderFor(e)),_(),B(e.type==="password"?1:-1)}}function xR(t,n){if(t&1){let e=pe();m(0,"button",32),M("click",function(){te(e);let r=D().$implicit,o=D(3);return ne(o.resetField(r.key))}),m(1,"mat-icon"),C(2,"restart_alt"),h()()}if(t&2){let e=D().$implicit;P("aria-label","Reset "+e.label+" to default")}}function wR(t,n){if(t&1&&(m(0,"div",25)(1,"mat-form-field",26)(2,"mat-label"),C(3),h(),V(4,yR,1,2,"textarea",27)(5,CR,2,4),m(6,"mat-hint"),C(7,"Leave blank to use environment variable or default"),h()(),V(8,xR,3,1,"button",28),h()),t&2){let e=n.$implicit;I("field-row--resettable",!e.isSecret),_(3),oe(e.label),_(),B(e.type==="textarea"?4:5),_(4),B(e.isSecret?-1:8)}}function ER(t,n){if(t&1&&(m(0,"section",10)(1,"h3",11),C(2),h(),Ct(3,wR,9,5,"div",24,bR),h()),t&2){let e=n.$implicit;_(2),oe(e.title),_(),xt(e.fields)}}function MR(t,n){if(t&1){let e=pe();m(0,"section",10)(1,"h3",11),C(2,"Active Voice"),h(),m(3,"mat-button-toggle-group",12),M("change",function(r){te(e);let o=D();return ne(o.selectProvider(r.value))}),m(4,"mat-button-toggle",13),j(5,"img",14),C(6),h(),m(7,"mat-button-toggle",15),j(8,"img",16),C(9),h(),m(10,"mat-button-toggle",17),j(11,"img",18),C(12),h()()(),m(13,"section",10)(14,"h3",11),C(15,"Environmental Context"),h(),m(16,"p",19),C(17," When enabled, your location and/or the current weather are included with each recommendation request so the AI can factor your surroundings into its suggestions. "),h(),m(18,"div",20)(19,"mat-checkbox",21),M("change",function(r){te(e);let o=D();return ne(o.useLocation.set(r.checked))}),C(20," Use User Location "),h()(),m(21,"div",20)(22,"mat-checkbox",22),M("change",function(r){te(e);let o=D();return ne(o.useWeather.set(r.checked))}),C(23," Use Current Weather "),h()()(),m(24,"form",23),M("submit",function(r){return r.preventDefault()}),Ct(25,ER,5,1,"section",10,_R),h()}if(t&2){let e=D();_(3),T("value",e.provider()),_(3),Fe(" ",e.modelLabel("OLLAMA_WHISPER_MODEL","llama3.1:8b")," "),_(3),Fe(" ",e.modelLabel("OLLAMA_SHOUT_MODEL","gemma4:e4b")," "),_(3),Fe(" ",e.modelLabel("GEMINI_MODEL","gemini-2.5-pro")," "),_(7),T("checked",e.useLocation()),_(3),T("checked",e.useWeather()),_(2),T("formGroup",e.form),_(),xt(e.groups)}}function IR(t,n){if(t&1&&(m(0,"p",4),C(1),h()),t&2){let e=D();_(),oe(e.saveError())}}function SR(t,n){t&1&&j(0,"mat-spinner",8)}var gC=[{title:"Gemini (Cosmic Voice)",fields:[{key:"GEMINI_API_KEY",label:"API Key",type:"password",placeholder:"Gemini API key",isSecret:!0},{key:"GEMINI_MODEL",label:"Model",type:"text"},{key:"GEMINI_BASE_URL",label:"Base URL",type:"text"}]},{title:"Ollama (Inner Voices)",fields:[{key:"OLLAMA_BASE_URL",label:"Base URL",type:"text"},{key:"OLLAMA_WHISPER_MODEL",label:"Inner Whisper model",type:"text"},{key:"OLLAMA_SHOUT_MODEL",label:"Inner Shout model",type:"text"}]},{title:"Last.fm (Album art)",fields:[{key:"LASTFM_API_KEY",label:"API Key",type:"password",placeholder:"Last.fm read API key",isSecret:!0},{key:"LASTFM_BASE_URL",label:"Base URL",type:"text"}]},{title:"Clementine",fields:[{key:"CLEMENTINE_DB_PATH",label:"Database path",type:"text",placeholder:"Path to clementine.db copy"},{key:"CLEMENTINE_EXE_PATH",label:"Executable path",type:"text"},{key:"CLEMENTINE_MATCH_THRESHOLD",label:"Match threshold",type:"number"}]},{title:"Recommendations",fields:[{key:"RECOMMENDATION_MIN_TRACKS",label:"Min tracks",type:"number"},{key:"RECOMMENDATION_MAX_TRACKS",label:"Max tracks",type:"number"},{key:"RECOMMENDATION_SUGGESTION_CACHE_MINUTES",label:"Suggestion cache (min)",type:"number"},{key:"RECOMMENDATION_HISTORY_MAX_ROWS",label:"History cap (rows)",type:"number"}]},{title:"Session memory",fields:[{key:"SESSION_MEMORY_SIZE",label:"Memory size (replies)",type:"number"},{key:"SESSION_DEFAULT_TRACK_DURATION_SECONDS",label:"Default track duration (s)",type:"number"}]},{title:"AI Settings",fields:[{key:"SESSION_MEMORY_INSTRUCTION",label:"Session memory instruction",type:"textarea"},{key:"RECOMMENDATION_INSTRUCTION",label:"Recommendation prompt",type:"textarea"},{key:"DIARY_SYSTEM_INSTRUCTION",label:"Diary system instruction",type:"textarea"},{key:"MOOD_ANNOTATION_POETIC",label:"Mood annotation: Poetic",type:"text"},{key:"MOOD_ANNOTATION_HUMOROUS",label:"Mood annotation: Humorous",type:"text"},{key:"MOOD_ANNOTATION_COSMIC",label:"Mood annotation: Cosmic",type:"text"},{key:"MOOD_ANNOTATION_MINIMALIST",label:"Mood annotation: Minimalist",type:"text"},{key:"MOOD_ANNOTATION_ROMANTIC",label:"Mood annotation: Romantic",type:"text"},{key:"MOOD_ANNOTATION_CHAOTIC",label:"Mood annotation: Chaotic",type:"text"},{key:"MOOD_ANNOTATION_NOIR",label:"Mood annotation: Noir",type:"text"},{key:"MOOD_ANNOTATION_PSYCHEDELIC",label:"Mood annotation: Psychedelic",type:"text"}]}],_C="reco-provider",$d=class t{constructor(n,e,i){this.fb=n;this.settingsService=e;this.dialogRef=i}form;loading=x(!0);saving=x(!1);saveError=x(null);groups=gC;defaults=x({});provider=x(localStorage.getItem(_C)??"gemini");useLocation=x(!1);useWeather=x(!1);revealed=x({});ngOnInit(){let n={};for(let e of gC)for(let i of e.fields)n[i.key]="";this.form=this.fb.group(n),Wi({settings:this.settingsService.getSettings(),defaults:this.settingsService.getDefaults()}).subscribe({next:({settings:e,defaults:i})=>{this.defaults.set(i);for(let r of e.settings)this.form.contains(r.key)&&this.form.get(r.key)?.setValue(r.value??""),r.key==="USE_USER_LOCATION"&&this.useLocation.set(r.value==="true"),r.key==="USE_CURRENT_WEATHER"&&this.useWeather.set(r.value==="true");this.loading.set(!1)},error:()=>{this.loading.set(!1)}})}selectProvider(n){this.provider.set(n),localStorage.setItem(_C,n)}modelLabel(n,e){return this.form.get(n)?.value?.trim()||e}isRevealed(n){return this.revealed()[n]??!1}toggleReveal(n){this.revealed.update(e=>ae(w({},e),{[n]:!e[n]}))}fieldType(n){return n.type==="password"?this.isRevealed(n.key)?"text":"password":"text"}placeholderFor(n){return this.defaults()[n.key]??n.placeholder??""}resetField(n){let e=this.defaults()[n];e!==void 0&&this.form.get(n)?.setValue(e)}save(){if(this.saving())return;this.saving.set(!0),this.saveError.set(null);let n={},e=this.form.value;for(let i of Object.keys(e))n[i]=e[i].trim()===""?null:e[i].trim();n.USE_USER_LOCATION=this.useLocation()?"true":"false",n.USE_CURRENT_WEATHER=this.useWeather()?"true":"false",this.settingsService.updateSettings({settings:n}).subscribe({next:()=>{this.saving.set(!1),this.dialogRef.close(!0)},error:()=>{this.saving.set(!1),this.saveError.set("Could not save settings. Please try again.")}})}cancel(){this.dialogRef.close(!1)}static \u0275fac=function(e){return new(e||t)(ee(eC),ee(Go),ee(Ri))};static \u0275cmp=k({type:t,selectors:[["app-settings-modal"]],decls:14,vars:5,consts:[["mat-dialog-title","",1,"settings-title"],["aria-hidden","true"],[1,"settings-content"],["role","status",1,"settings-loading"],["role","alert",1,"settings-error"],["align","end",1,"settings-actions"],["mat-button","","type","button",3,"click","disabled"],["mat-flat-button","","color","primary","type","button",3,"click","disabled"],["diameter","18",1,"btn-spinner"],["diameter","36"],[1,"settings-group"],[1,"settings-group-title"],["aria-label","AI provider",1,"provider-toggle",3,"change","value"],["value","inner-whisper","aria-label","Inner Whisper"],["src","/icons/llama3-logo.png","alt","","aria-hidden","true",1,"provider-icon"],["value","inner-shout","aria-label","Inner Shout"],["src","/icons/gemma4.png","alt","","aria-hidden","true",1,"provider-icon"],["value","gemini","aria-label","Cosmic Voice"],["src","/icons/gemini.svg","alt","","aria-hidden","true",1,"provider-icon"],[1,"settings-group-hint"],[1,"checkbox-row"],["aria-label","Send user location to AI",3,"change","checked"],["aria-label","Send current weather to AI",3,"change","checked"],[1,"settings-form",3,"submit","formGroup"],[1,"field-row",3,"field-row--resettable"],[1,"field-row"],["appearance","outline","floatLabel","always",1,"settings-field"],["matInput","","rows","5","autocomplete","off","spellcheck","false",1,"settings-textarea",3,"formControlName","placeholder"],["mat-icon-button","","type","button","matTooltip","Reset to default",1,"reset-field-btn"],["matInput","","autocomplete","off","spellcheck","false",3,"type","formControlName","placeholder"],["matSuffix","","mat-icon-button","","type","button",3,"matTooltip"],["matSuffix","","mat-icon-button","","type","button",3,"click","matTooltip"],["mat-icon-button","","type","button","matTooltip","Reset to default",1,"reset-field-btn",3,"click"]],template:function(e,i){e&1&&(m(0,"h2",0)(1,"mat-icon",1),C(2,"settings"),h(),C(3,` Settings
`),h(),m(4,"mat-dialog-content",2),V(5,vR,4,0,"div",3)(6,MR,27,7),V(7,IR,2,1,"p",4),h(),m(8,"mat-dialog-actions",5)(9,"button",6),M("click",function(){return i.cancel()}),C(10,"Cancel"),h(),m(11,"button",7),M("click",function(){return i.save()}),V(12,SR,1,0,"mat-spinner",8),C(13," Save "),h()()),e&2&&(_(5),B(i.loading()?5:6),_(2),B(i.saveError()?7:-1),_(2),T("disabled",i.saving()),_(2),T("disabled",i.loading()||i.saving()),_(),B(i.saving()?12:-1))},dependencies:[tC,X0,Fd,G0,W0,Is,Ap,Ft,_n,Kt,dC,Op,Hd,fC,Pp,Po,Dd,r0,Cd,Pr,Lo,Fr,vs,mp,Jt,Xt,Bd,Vd,zd,Ud,$o,ti],styles:[".settings-title[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;font-family:var(--reco-font);font-size:1.1rem;color:var(--reco-primary)}.settings-title[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:1.2rem;width:1.2rem;height:1.2rem}.settings-content[_ngcontent-%COMP%]{min-width:520px;max-width:680px;max-height:72vh;padding:8px 24px}.settings-loading[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;gap:12px;padding:32px 0;color:var(--reco-text-muted);font-size:.9rem}.settings-form[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:20px}.settings-group-hint[_ngcontent-%COMP%]{font-size:.8rem;color:var(--reco-text-muted);margin:0 0 4px;line-height:1.4}.checkbox-row[_ngcontent-%COMP%]{padding:2px 0}.provider-toggle[_ngcontent-%COMP%]{width:100%}.provider-toggle[_ngcontent-%COMP%]   mat-button-toggle[_ngcontent-%COMP%]{flex:1;font-size:.8rem}.provider-toggle[_ngcontent-%COMP%]   .provider-icon[_ngcontent-%COMP%]{width:16px;height:16px;vertical-align:middle;margin-right:4px}.settings-group[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:8px}.settings-group-title[_ngcontent-%COMP%]{font-family:var(--reco-font);font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--reco-text-muted);margin:0 0 4px;padding-bottom:4px;border-bottom:1px solid var(--reco-border)}.settings-field[_ngcontent-%COMP%]{width:100%}.settings-textarea[_ngcontent-%COMP%]{font-family:var(--reco-font-bubble, monospace);font-size:.8rem;line-height:1.5;resize:vertical;min-height:96px}.field-row[_ngcontent-%COMP%]{display:flex;align-items:flex-start;gap:4px}.field-row--resettable[_ngcontent-%COMP%]   .settings-field[_ngcontent-%COMP%]{flex:1}.reset-field-btn[_ngcontent-%COMP%]{flex-shrink:0;margin-top:6px;color:var(--reco-text-muted);--mdc-icon-button-state-layer-size: 28px;--mdc-icon-button-icon-size: 18px}.reset-field-btn[_ngcontent-%COMP%]:hover{color:var(--reco-primary)}.settings-actions[_ngcontent-%COMP%]{padding:12px 24px 16px;gap:8px}.settings-error[_ngcontent-%COMP%]{color:var(--reco-error);font-size:.85rem;margin:8px 0 0}.btn-spinner[_ngcontent-%COMP%]{display:inline-block;margin-right:6px;vertical-align:middle}"]})};var Lp=new b("MAT_DATE_LOCALE",{providedIn:"root",factory:()=>d(Co)}),Wo="Method not implemented",Mt=class{locale;_localeChanges=new E;localeChanges=this._localeChanges;setTime(n,e,i,r){throw new Error(Wo)}getHours(n){throw new Error(Wo)}getMinutes(n){throw new Error(Wo)}getSeconds(n){throw new Error(Wo)}parseTime(n,e){throw new Error(Wo)}addSeconds(n,e){throw new Error(Wo)}getValidDateOrNull(n){return this.isDateInstance(n)&&this.isValid(n)?n:null}deserialize(n){return n==null||this.isDateInstance(n)&&this.isValid(n)?n:this.invalid()}setLocale(n){this.locale=n,this._localeChanges.next()}compareDate(n,e){return this.getYear(n)-this.getYear(e)||this.getMonth(n)-this.getMonth(e)||this.getDate(n)-this.getDate(e)}compareTime(n,e){return this.getHours(n)-this.getHours(e)||this.getMinutes(n)-this.getMinutes(e)||this.getSeconds(n)-this.getSeconds(e)}sameDate(n,e){if(n&&e){let i=this.isValid(n),r=this.isValid(e);return i&&r?!this.compareDate(n,e):i==r}return n==e}sameTime(n,e){if(n&&e){let i=this.isValid(n),r=this.isValid(e);return i&&r?!this.compareTime(n,e):i==r}return n==e}clampDate(n,e,i){return e&&this.compareDate(n,e)<0?e:i&&this.compareDate(n,i)>0?i:n}},Vr=new b("mat-date-formats");var kR=["mat-calendar-body",""];function TR(t,n){return this._trackRow(n)}var xC=(t,n)=>n.id;function AR(t,n){if(t&1&&(Ae(0,"tr",0)(1,"td",3),C(2),Ve()()),t&2){let e=D();_(),dt("padding-top",e._cellPadding)("padding-bottom",e._cellPadding),P("colspan",e.numCols),_(),Fe(" ",e.label," ")}}function RR(t,n){if(t&1&&(Ae(0,"td",3),C(1),Ve()),t&2){let e=D(2);dt("padding-top",e._cellPadding)("padding-bottom",e._cellPadding),P("colspan",e._firstRowOffset),_(),Fe(" ",e._firstRowOffset>=e.labelMinRequiredCells?e.label:""," ")}}function OR(t,n){if(t&1){let e=pe();Ae(0,"td",6)(1,"button",7),yi("click",function(r){let o=te(e).$implicit,a=D(2);return ne(a._cellClicked(o,r))})("focus",function(r){let o=te(e).$implicit,a=D(2);return ne(a._emitActiveDateChange(o,r))}),Ae(2,"span",8),C(3),Ve(),ct(4,"span",9),Ve()()}if(t&2){let e=n.$implicit,i=n.$index,r=D().$index,o=D();dt("width",o._cellWidth)("padding-top",o._cellPadding)("padding-bottom",o._cellPadding),P("data-mat-row",r)("data-mat-col",i),_(),rt(e.cssClasses),I("mat-calendar-body-disabled",!e.enabled)("mat-calendar-body-active",o._isActiveCell(r,i))("mat-calendar-body-range-start",o._isRangeStart(e.compareValue))("mat-calendar-body-range-end",o._isRangeEnd(e.compareValue))("mat-calendar-body-in-range",o._isInRange(e.compareValue))("mat-calendar-body-comparison-bridge-start",o._isComparisonBridgeStart(e.compareValue,r,i))("mat-calendar-body-comparison-bridge-end",o._isComparisonBridgeEnd(e.compareValue,r,i))("mat-calendar-body-comparison-start",o._isComparisonStart(e.compareValue))("mat-calendar-body-comparison-end",o._isComparisonEnd(e.compareValue))("mat-calendar-body-in-comparison-range",o._isInComparisonRange(e.compareValue))("mat-calendar-body-preview-start",o._isPreviewStart(e.compareValue))("mat-calendar-body-preview-end",o._isPreviewEnd(e.compareValue))("mat-calendar-body-in-preview",o._isInPreview(e.compareValue)),et("tabIndex",o._isActiveCell(r,i)?0:-1),P("aria-label",e.ariaLabel)("aria-disabled",!e.enabled||null)("aria-pressed",o._isSelected(e.compareValue))("aria-current",o.todayValue===e.compareValue?"date":null)("aria-describedby",o._getDescribedby(e.compareValue)),_(),I("mat-calendar-body-selected",o._isSelected(e.compareValue))("mat-calendar-body-comparison-identical",o._isComparisonIdentical(e.compareValue))("mat-calendar-body-today",o.todayValue===e.compareValue),_(),Fe(" ",e.displayValue," ")}}function NR(t,n){if(t&1&&(Ae(0,"tr",1),V(1,RR,2,6,"td",4),Ct(2,OR,5,49,"td",5,xC),Ve()),t&2){let e=n.$implicit,i=n.$index,r=D();_(),B(i===0&&r._firstRowOffset?1:-1),_(),xt(e)}}function FR(t,n){if(t&1&&(m(0,"th",2)(1,"span",6),C(2),h(),m(3,"span",3),C(4),h()()),t&2){let e=n.$implicit;_(2),oe(e.long),_(2),oe(e.narrow)}}var PR=["*"];function LR(t,n){}function VR(t,n){if(t&1){let e=pe();m(0,"mat-month-view",4),Do("activeDateChange",function(r){te(e);let o=D();return Za(o.activeDate,r)||(o.activeDate=r),ne(r)}),M("_userSelection",function(r){te(e);let o=D();return ne(o._dateSelected(r))})("dragStarted",function(r){te(e);let o=D();return ne(o._dragStarted(r))})("dragEnded",function(r){te(e);let o=D();return ne(o._dragEnded(r))}),h()}if(t&2){let e=D();yo("activeDate",e.activeDate),T("selected",e.selected)("dateFilter",e.dateFilter)("maxDate",e.maxDate)("minDate",e.minDate)("dateClass",e.dateClass)("comparisonStart",e.comparisonStart)("comparisonEnd",e.comparisonEnd)("startDateAccessibleName",e.startDateAccessibleName)("endDateAccessibleName",e.endDateAccessibleName)("activeDrag",e._activeDrag)}}function BR(t,n){if(t&1){let e=pe();m(0,"mat-year-view",5),Do("activeDateChange",function(r){te(e);let o=D();return Za(o.activeDate,r)||(o.activeDate=r),ne(r)}),M("monthSelected",function(r){te(e);let o=D();return ne(o._monthSelectedInYearView(r))})("selectedChange",function(r){te(e);let o=D();return ne(o._goToDateInView(r,"month"))}),h()}if(t&2){let e=D();yo("activeDate",e.activeDate),T("selected",e.selected)("dateFilter",e.dateFilter)("maxDate",e.maxDate)("minDate",e.minDate)("dateClass",e.dateClass)}}function jR(t,n){if(t&1){let e=pe();m(0,"mat-multi-year-view",6),Do("activeDateChange",function(r){te(e);let o=D();return Za(o.activeDate,r)||(o.activeDate=r),ne(r)}),M("yearSelected",function(r){te(e);let o=D();return ne(o._yearSelectedInMultiYearView(r))})("selectedChange",function(r){te(e);let o=D();return ne(o._goToDateInView(r,"year"))}),h()}if(t&2){let e=D();yo("activeDate",e.activeDate),T("selected",e.selected)("dateFilter",e.dateFilter)("maxDate",e.maxDate)("minDate",e.minDate)("dateClass",e.dateClass)}}function HR(t,n){}var UR=["button"],zR=[[["","matDatepickerToggleIcon",""]]],$R=["[matDatepickerToggleIcon]"];function GR(t,n){t&1&&(yt(),m(0,"svg",2),j(1,"path",3),h())}var qo=(()=>{class t{changes=new E;calendarLabel="Calendar";openCalendarLabel="Open calendar";closeCalendarLabel="Close calendar";prevMonthLabel="Previous month";nextMonthLabel="Next month";prevYearLabel="Previous year";nextYearLabel="Next year";prevMultiYearLabel="Previous 24 years";nextMultiYearLabel="Next 24 years";switchToMonthViewLabel="Choose date";switchToMultiYearViewLabel="Choose month and year";startDateLabel="Start date";endDateLabel="End date";comparisonDateLabel="Comparison range";formatYearRange(e,i){return`${e} \u2013 ${i}`}formatYearRangeLabel(e,i){return`${e} to ${i}`}static \u0275fac=function(i){return new(i||t)};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),WR=0,Ts=class{value;displayValue;ariaLabel;enabled;compareValue;rawValue;id=WR++;cssClasses;constructor(n,e,i,r,o,a=n,s){this.value=n,this.displayValue=e,this.ariaLabel=i,this.enabled=r,this.compareValue=a,this.rawValue=s,this.cssClasses=o instanceof Set?Array.from(o):o}},YR={passive:!1,capture:!0},Gd={passive:!0,capture:!0},bC={passive:!0},Yo=(()=>{class t{_elementRef=d(L);_ngZone=d(A);_platform=d(de);_intl=d(qo);_eventCleanups;_skipNextFocus=!1;_focusActiveCellAfterViewChecked=!1;label;rows;todayValue;startValue;endValue;labelMinRequiredCells;numCols=7;activeCell=0;ngAfterViewChecked(){this._focusActiveCellAfterViewChecked&&(this._focusActiveCell(),this._focusActiveCellAfterViewChecked=!1)}isRange=!1;cellAspectRatio=1;comparisonStart=null;comparisonEnd=null;previewStart=null;previewEnd=null;startDateAccessibleName=null;endDateAccessibleName=null;selectedValueChange=new F;previewChange=new F;activeDateChange=new F;dragStarted=new F;dragEnded=new F;_firstRowOffset;_cellPadding;_cellWidth;_startDateLabelId;_endDateLabelId;_comparisonStartDateLabelId;_comparisonEndDateLabelId;_didDragSinceMouseDown=!1;_injector=d(G);comparisonDateAccessibleName=this._intl.comparisonDateLabel;_trackRow=e=>e;constructor(){let e=d(Te),i=d(Ie);this._startDateLabelId=i.getId("mat-calendar-body-start-"),this._endDateLabelId=i.getId("mat-calendar-body-end-"),this._comparisonStartDateLabelId=i.getId("mat-calendar-body-comparison-start-"),this._comparisonEndDateLabelId=i.getId("mat-calendar-body-comparison-end-"),d(Re).load(An),this._ngZone.runOutsideAngular(()=>{let r=this._elementRef.nativeElement,o=[e.listen(r,"touchmove",this._touchmoveHandler,YR),e.listen(r,"mouseenter",this._enterHandler,Gd),e.listen(r,"focus",this._enterHandler,Gd),e.listen(r,"mouseleave",this._leaveHandler,Gd),e.listen(r,"blur",this._leaveHandler,Gd),e.listen(r,"mousedown",this._mousedownHandler,bC),e.listen(r,"touchstart",this._mousedownHandler,bC)];this._platform.isBrowser&&o.push(e.listen("window","mouseup",this._mouseupHandler),e.listen("window","touchend",this._touchendHandler)),this._eventCleanups=o})}_cellClicked(e,i){this._didDragSinceMouseDown||e.enabled&&this.selectedValueChange.emit({value:e.value,event:i})}_emitActiveDateChange(e,i){e.enabled&&this.activeDateChange.emit({value:e.value,event:i})}_isSelected(e){return this.startValue===e||this.endValue===e}ngOnChanges(e){let i=e.numCols,{rows:r,numCols:o}=this;(e.rows||i)&&(this._firstRowOffset=r&&r.length&&r[0].length?o-r[0].length:0),(e.cellAspectRatio||i||!this._cellPadding)&&(this._cellPadding=`${50*this.cellAspectRatio/o}%`),(i||!this._cellWidth)&&(this._cellWidth=`${100/o}%`)}ngOnDestroy(){this._eventCleanups.forEach(e=>e())}_isActiveCell(e,i){let r=e*this.numCols+i;return e&&(r-=this._firstRowOffset),r==this.activeCell}_focusActiveCell(e=!0){Ye(()=>{setTimeout(()=>{let i=this._elementRef.nativeElement.querySelector(".mat-calendar-body-active");i&&(e||(this._skipNextFocus=!0),i.focus())})},{injector:this._injector})}_scheduleFocusActiveCellAfterViewChecked(){this._focusActiveCellAfterViewChecked=!0}_isRangeStart(e){return jp(e,this.startValue,this.endValue)}_isRangeEnd(e){return Hp(e,this.startValue,this.endValue)}_isInRange(e){return Up(e,this.startValue,this.endValue,this.isRange)}_isComparisonStart(e){return jp(e,this.comparisonStart,this.comparisonEnd)}_isComparisonBridgeStart(e,i,r){if(!this._isComparisonStart(e)||this._isRangeStart(e)||!this._isInRange(e))return!1;let o=this.rows[i][r-1];if(!o){let a=this.rows[i-1];o=a&&a[a.length-1]}return o&&!this._isRangeEnd(o.compareValue)}_isComparisonBridgeEnd(e,i,r){if(!this._isComparisonEnd(e)||this._isRangeEnd(e)||!this._isInRange(e))return!1;let o=this.rows[i][r+1];if(!o){let a=this.rows[i+1];o=a&&a[0]}return o&&!this._isRangeStart(o.compareValue)}_isComparisonEnd(e){return Hp(e,this.comparisonStart,this.comparisonEnd)}_isInComparisonRange(e){return Up(e,this.comparisonStart,this.comparisonEnd,this.isRange)}_isComparisonIdentical(e){return this.comparisonStart===this.comparisonEnd&&e===this.comparisonStart}_isPreviewStart(e){return jp(e,this.previewStart,this.previewEnd)}_isPreviewEnd(e){return Hp(e,this.previewStart,this.previewEnd)}_isInPreview(e){return Up(e,this.previewStart,this.previewEnd,this.isRange)}_getDescribedby(e){if(!this.isRange)return null;if(this.startValue===e&&this.endValue===e)return`${this._startDateLabelId} ${this._endDateLabelId}`;if(this.startValue===e)return this._startDateLabelId;if(this.endValue===e)return this._endDateLabelId;if(this.comparisonStart!==null&&this.comparisonEnd!==null){if(e===this.comparisonStart&&e===this.comparisonEnd)return`${this._comparisonStartDateLabelId} ${this._comparisonEndDateLabelId}`;if(e===this.comparisonStart)return this._comparisonStartDateLabelId;if(e===this.comparisonEnd)return this._comparisonEndDateLabelId}return null}_enterHandler=e=>{if(this._skipNextFocus&&e.type==="focus"){this._skipNextFocus=!1;return}if(e.target&&this.isRange){let i=this._getCellFromElement(e.target);i&&this._ngZone.run(()=>this.previewChange.emit({value:i.enabled?i:null,event:e}))}};_touchmoveHandler=e=>{if(!this.isRange)return;let i=vC(e),r=i?this._getCellFromElement(i):null;i!==e.target&&(this._didDragSinceMouseDown=!0),Bp(e.target)&&e.preventDefault(),this._ngZone.run(()=>this.previewChange.emit({value:r?.enabled?r:null,event:e}))};_leaveHandler=e=>{this.previewEnd!==null&&this.isRange&&(e.type!=="blur"&&(this._didDragSinceMouseDown=!0),e.target&&this._getCellFromElement(e.target)&&!(e.relatedTarget&&this._getCellFromElement(e.relatedTarget))&&this._ngZone.run(()=>this.previewChange.emit({value:null,event:e})))};_mousedownHandler=e=>{if(!this.isRange)return;this._didDragSinceMouseDown=!1;let i=e.target&&this._getCellFromElement(e.target);!i||!this._isInRange(i.compareValue)||this._ngZone.run(()=>{this.dragStarted.emit({value:i.rawValue,event:e})})};_mouseupHandler=e=>{if(!this.isRange)return;let i=Bp(e.target);if(!i){this._ngZone.run(()=>{this.dragEnded.emit({value:null,event:e})});return}i.closest(".mat-calendar-body")===this._elementRef.nativeElement&&this._ngZone.run(()=>{let r=this._getCellFromElement(i);this.dragEnded.emit({value:r?.rawValue??null,event:e})})};_touchendHandler=e=>{let i=vC(e);i&&this._mouseupHandler({target:i})};_getCellFromElement(e){let i=Bp(e);if(i){let r=i.getAttribute("data-mat-row"),o=i.getAttribute("data-mat-col");if(r&&o)return this.rows[parseInt(r)]?.[parseInt(o)]||null}return null}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["","mat-calendar-body",""]],hostAttrs:[1,"mat-calendar-body"],inputs:{label:"label",rows:"rows",todayValue:"todayValue",startValue:"startValue",endValue:"endValue",labelMinRequiredCells:"labelMinRequiredCells",numCols:"numCols",activeCell:"activeCell",isRange:"isRange",cellAspectRatio:"cellAspectRatio",comparisonStart:"comparisonStart",comparisonEnd:"comparisonEnd",previewStart:"previewStart",previewEnd:"previewEnd",startDateAccessibleName:"startDateAccessibleName",endDateAccessibleName:"endDateAccessibleName"},outputs:{selectedValueChange:"selectedValueChange",previewChange:"previewChange",activeDateChange:"activeDateChange",dragStarted:"dragStarted",dragEnded:"dragEnded"},exportAs:["matCalendarBody"],features:[We],attrs:kR,decls:11,vars:11,consts:[["aria-hidden","true"],["role","row"],[1,"mat-calendar-body-hidden-label",3,"id"],[1,"mat-calendar-body-label"],[1,"mat-calendar-body-label",3,"paddingTop","paddingBottom"],["role","gridcell",1,"mat-calendar-body-cell-container",3,"width","paddingTop","paddingBottom"],["role","gridcell",1,"mat-calendar-body-cell-container"],["type","button",1,"mat-calendar-body-cell",3,"click","focus","tabindex"],[1,"mat-calendar-body-cell-content","mat-focus-indicator"],["aria-hidden","true",1,"mat-calendar-body-cell-preview"]],template:function(i,r){i&1&&(V(0,AR,3,6,"tr",0),Ct(1,NR,4,1,"tr",1,TR,!0),Ae(3,"span",2),C(4),Ve(),Ae(5,"span",2),C(6),Ve(),Ae(7,"span",2),C(8),Ve(),Ae(9,"span",2),C(10),Ve()),i&2&&(B(r._firstRowOffset<r.labelMinRequiredCells?0:-1),_(),xt(r.rows),_(2),et("id",r._startDateLabelId),_(),Fe(" ",r.startDateAccessibleName,`
`),_(),et("id",r._endDateLabelId),_(),Fe(" ",r.endDateAccessibleName,`
`),_(),et("id",r._comparisonStartDateLabelId),_(),vr(" ",r.comparisonDateAccessibleName," ",r.startDateAccessibleName,`
`),_(),et("id",r._comparisonEndDateLabelId),_(),vr(" ",r.comparisonDateAccessibleName," ",r.endDateAccessibleName,`
`))},styles:[`.mat-calendar-body {
  min-width: 224px;
}

.mat-calendar-body-today:not(.mat-calendar-body-selected):not(.mat-calendar-body-comparison-identical) {
  border-color: var(--mat-datepicker-calendar-date-today-outline-color, var(--mat-sys-primary));
}

.mat-calendar-body-label {
  height: 0;
  line-height: 0;
  text-align: start;
  padding-left: 4.7142857143%;
  padding-right: 4.7142857143%;
  font-size: var(--mat-datepicker-calendar-body-label-text-size, var(--mat-sys-title-small-size));
  font-weight: var(--mat-datepicker-calendar-body-label-text-weight, var(--mat-sys-title-small-weight));
  color: var(--mat-datepicker-calendar-body-label-text-color, var(--mat-sys-on-surface));
}

.mat-calendar-body-hidden-label {
  display: none;
}

.mat-calendar-body-cell-container {
  position: relative;
  height: 0;
  line-height: 0;
}

.mat-calendar-body-cell {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: none;
  text-align: center;
  outline: none;
  margin: 0;
  font-family: var(--mat-datepicker-calendar-text-font, var(--mat-sys-body-medium-font));
  font-size: var(--mat-datepicker-calendar-text-size, var(--mat-sys-body-medium-size));
  -webkit-user-select: none;
  user-select: none;
  cursor: pointer;
  outline: none;
  border: none;
  -webkit-tap-highlight-color: transparent;
}
.mat-calendar-body-cell::-moz-focus-inner {
  border: 0;
}

.mat-calendar-body-cell::before,
.mat-calendar-body-cell::after,
.mat-calendar-body-cell-preview {
  content: "";
  position: absolute;
  top: 5%;
  left: 0;
  z-index: 0;
  box-sizing: border-box;
  display: block;
  height: 90%;
  width: 100%;
}

.mat-calendar-body-range-start:not(.mat-calendar-body-in-comparison-range)::before,
.mat-calendar-body-range-start::after,
.mat-calendar-body-comparison-start:not(.mat-calendar-body-comparison-bridge-start)::before,
.mat-calendar-body-comparison-start::after,
.mat-calendar-body-preview-start .mat-calendar-body-cell-preview {
  left: 5%;
  width: 95%;
  border-top-left-radius: 999px;
  border-bottom-left-radius: 999px;
}
[dir=rtl] .mat-calendar-body-range-start:not(.mat-calendar-body-in-comparison-range)::before,
[dir=rtl] .mat-calendar-body-range-start::after,
[dir=rtl] .mat-calendar-body-comparison-start:not(.mat-calendar-body-comparison-bridge-start)::before,
[dir=rtl] .mat-calendar-body-comparison-start::after,
[dir=rtl] .mat-calendar-body-preview-start .mat-calendar-body-cell-preview {
  left: 0;
  border-radius: 0;
  border-top-right-radius: 999px;
  border-bottom-right-radius: 999px;
}

.mat-calendar-body-range-end:not(.mat-calendar-body-in-comparison-range)::before,
.mat-calendar-body-range-end::after,
.mat-calendar-body-comparison-end:not(.mat-calendar-body-comparison-bridge-end)::before,
.mat-calendar-body-comparison-end::after,
.mat-calendar-body-preview-end .mat-calendar-body-cell-preview {
  width: 95%;
  border-top-right-radius: 999px;
  border-bottom-right-radius: 999px;
}
[dir=rtl] .mat-calendar-body-range-end:not(.mat-calendar-body-in-comparison-range)::before,
[dir=rtl] .mat-calendar-body-range-end::after,
[dir=rtl] .mat-calendar-body-comparison-end:not(.mat-calendar-body-comparison-bridge-end)::before,
[dir=rtl] .mat-calendar-body-comparison-end::after,
[dir=rtl] .mat-calendar-body-preview-end .mat-calendar-body-cell-preview {
  left: 5%;
  border-radius: 0;
  border-top-left-radius: 999px;
  border-bottom-left-radius: 999px;
}

[dir=rtl] .mat-calendar-body-comparison-bridge-start.mat-calendar-body-range-end::after,
[dir=rtl] .mat-calendar-body-comparison-bridge-end.mat-calendar-body-range-start::after {
  width: 95%;
  border-top-right-radius: 999px;
  border-bottom-right-radius: 999px;
}

.mat-calendar-body-comparison-start.mat-calendar-body-range-end::after, [dir=rtl] .mat-calendar-body-comparison-start.mat-calendar-body-range-end::after,
.mat-calendar-body-comparison-end.mat-calendar-body-range-start::after,
[dir=rtl] .mat-calendar-body-comparison-end.mat-calendar-body-range-start::after {
  width: 90%;
}

.mat-calendar-body-in-preview {
  color: var(--mat-datepicker-calendar-date-preview-state-outline-color, var(--mat-sys-primary));
}
.mat-calendar-body-in-preview .mat-calendar-body-cell-preview {
  border-top: dashed 1px;
  border-bottom: dashed 1px;
}

.mat-calendar-body-preview-start .mat-calendar-body-cell-preview {
  border-left: dashed 1px;
}
[dir=rtl] .mat-calendar-body-preview-start .mat-calendar-body-cell-preview {
  border-left: 0;
  border-right: dashed 1px;
}

.mat-calendar-body-preview-end .mat-calendar-body-cell-preview {
  border-right: dashed 1px;
}
[dir=rtl] .mat-calendar-body-preview-end .mat-calendar-body-cell-preview {
  border-right: 0;
  border-left: dashed 1px;
}

.mat-calendar-body-disabled {
  cursor: default;
}
.mat-calendar-body-disabled > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected):not(.mat-calendar-body-comparison-identical) {
  color: var(--mat-datepicker-calendar-date-disabled-state-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-calendar-body-disabled > .mat-calendar-body-today:not(.mat-calendar-body-selected):not(.mat-calendar-body-comparison-identical) {
  border-color: var(--mat-datepicker-calendar-date-today-disabled-state-outline-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mat-calendar-body-disabled {
    opacity: 0.5;
  }
}

.mat-calendar-body-cell-content {
  top: 5%;
  left: 5%;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 90%;
  height: 90%;
  line-height: 1;
  border-width: 1px;
  border-style: solid;
  border-radius: 999px;
  color: var(--mat-datepicker-calendar-date-text-color, var(--mat-sys-on-surface));
  border-color: var(--mat-datepicker-calendar-date-outline-color, transparent);
}
.mat-calendar-body-cell-content.mat-focus-indicator {
  position: absolute;
}
@media (forced-colors: active) {
  .mat-calendar-body-cell-content {
    border: none;
  }
}

.cdk-keyboard-focused .mat-calendar-body-active > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected):not(.mat-calendar-body-comparison-identical), .cdk-program-focused .mat-calendar-body-active > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected):not(.mat-calendar-body-comparison-identical) {
  background-color: var(--mat-datepicker-calendar-date-focus-state-background-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-focus-state-layer-opacity) * 100%), transparent));
}

@media (hover: hover) {
  .mat-calendar-body-cell:not(.mat-calendar-body-disabled):hover > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected):not(.mat-calendar-body-comparison-identical) {
    background-color: var(--mat-datepicker-calendar-date-hover-state-background-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-hover-state-layer-opacity) * 100%), transparent));
  }
}
.mat-calendar-body-selected {
  background-color: var(--mat-datepicker-calendar-date-selected-state-background-color, var(--mat-sys-primary));
  color: var(--mat-datepicker-calendar-date-selected-state-text-color, var(--mat-sys-on-primary));
}
.mat-calendar-body-disabled > .mat-calendar-body-selected {
  background-color: var(--mat-datepicker-calendar-date-selected-disabled-state-background-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-calendar-body-selected.mat-calendar-body-today {
  box-shadow: inset 0 0 0 1px var(--mat-datepicker-calendar-date-today-selected-state-outline-color, var(--mat-sys-primary));
}

.mat-calendar-body-in-range::before {
  background: var(--mat-datepicker-calendar-date-in-range-state-background-color, var(--mat-sys-primary-container));
}

.mat-calendar-body-comparison-identical,
.mat-calendar-body-in-comparison-range::before {
  background: var(--mat-datepicker-calendar-date-in-comparison-range-state-background-color, var(--mat-sys-tertiary-container));
}

.mat-calendar-body-comparison-identical,
.mat-calendar-body-in-comparison-range::before {
  background: var(--mat-datepicker-calendar-date-in-comparison-range-state-background-color, var(--mat-sys-tertiary-container));
}

.mat-calendar-body-comparison-bridge-start::before,
[dir=rtl] .mat-calendar-body-comparison-bridge-end::before {
  background: linear-gradient(to right, var(--mat-datepicker-calendar-date-in-range-state-background-color, var(--mat-sys-primary-container)) 50%, var(--mat-datepicker-calendar-date-in-comparison-range-state-background-color, var(--mat-sys-tertiary-container)) 50%);
}

.mat-calendar-body-comparison-bridge-end::before,
[dir=rtl] .mat-calendar-body-comparison-bridge-start::before {
  background: linear-gradient(to left, var(--mat-datepicker-calendar-date-in-range-state-background-color, var(--mat-sys-primary-container)) 50%, var(--mat-datepicker-calendar-date-in-comparison-range-state-background-color, var(--mat-sys-tertiary-container)) 50%);
}

.mat-calendar-body-in-range > .mat-calendar-body-comparison-identical,
.mat-calendar-body-in-comparison-range.mat-calendar-body-in-range::after {
  background: var(--mat-datepicker-calendar-date-in-overlap-range-state-background-color, var(--mat-sys-secondary-container));
}

.mat-calendar-body-comparison-identical.mat-calendar-body-selected,
.mat-calendar-body-in-comparison-range > .mat-calendar-body-selected {
  background: var(--mat-datepicker-calendar-date-in-overlap-range-selected-state-background-color, var(--mat-sys-secondary));
}

@media (forced-colors: active) {
  .mat-datepicker-popup:not(:empty),
  .mat-calendar-body-cell:not(.mat-calendar-body-in-range) .mat-calendar-body-selected {
    outline: solid 1px;
  }
  .mat-calendar-body-today {
    outline: dotted 1px;
  }
  .mat-calendar-body-cell::before,
  .mat-calendar-body-cell::after,
  .mat-calendar-body-selected {
    background: none;
  }
  .mat-calendar-body-in-range::before,
  .mat-calendar-body-comparison-bridge-start::before,
  .mat-calendar-body-comparison-bridge-end::before {
    border-top: solid 1px;
    border-bottom: solid 1px;
  }
  .mat-calendar-body-range-start::before {
    border-left: solid 1px;
  }
  [dir=rtl] .mat-calendar-body-range-start::before {
    border-left: 0;
    border-right: solid 1px;
  }
  .mat-calendar-body-range-end::before {
    border-right: solid 1px;
  }
  [dir=rtl] .mat-calendar-body-range-end::before {
    border-right: 0;
    border-left: solid 1px;
  }
  .mat-calendar-body-in-comparison-range::before {
    border-top: dashed 1px;
    border-bottom: dashed 1px;
  }
  .mat-calendar-body-comparison-start::before {
    border-left: dashed 1px;
  }
  [dir=rtl] .mat-calendar-body-comparison-start::before {
    border-left: 0;
    border-right: dashed 1px;
  }
  .mat-calendar-body-comparison-end::before {
    border-right: dashed 1px;
  }
  [dir=rtl] .mat-calendar-body-comparison-end::before {
    border-right: 0;
    border-left: dashed 1px;
  }
}
`],encapsulation:2,changeDetection:0})}return t})();function Vp(t){return t?.nodeName==="TD"}function Bp(t){let n;return Vp(t)?n=t:Vp(t.parentNode)?n=t.parentNode:Vp(t.parentNode?.parentNode)&&(n=t.parentNode.parentNode),n?.getAttribute("data-mat-row")!=null?n:null}function jp(t,n,e){return e!==null&&n!==e&&t<e&&t===n}function Hp(t,n,e){return n!==null&&n!==e&&t>=n&&t===e}function Up(t,n,e,i){return i&&n!==null&&e!==null&&n!==e&&t>=n&&t<=e}function vC(t){let n=t.changedTouches[0];return document.elementFromPoint(n.clientX,n.clientY)}var en=class{start;end;_disableStructuralEquivalency;constructor(n,e){this.start=n,this.end=e}},Wd=(()=>{class t{selection;_adapter;_selectionChanged=new E;selectionChanged=this._selectionChanged;constructor(e,i){this.selection=e,this._adapter=i,this.selection=e}updateSelection(e,i){let r=this.selection;this.selection=e,this._selectionChanged.next({selection:e,source:i,oldValue:r})}ngOnDestroy(){this._selectionChanged.complete()}_isValidDateInstance(e){return this._adapter.isDateInstance(e)&&this._adapter.isValid(e)}static \u0275fac=function(i){Wa()};static \u0275prov=y({token:t,factory:t.\u0275fac})}return t})(),qR=(()=>{class t extends Wd{constructor(e){super(null,e)}add(e){super.updateSelection(e,this)}isValid(){return this.selection!=null&&this._isValidDateInstance(this.selection)}isComplete(){return this.selection!=null}clone(){let e=new t(this._adapter);return e.updateSelection(this.selection,this),e}static \u0275fac=function(i){return new(i||t)(R(Mt))};static \u0275prov=y({token:t,factory:t.\u0275fac})}return t})();var ZR={provide:Wd,useFactory:()=>d(Wd,{optional:!0,skipSelf:!0})||new qR(d(Mt))};var wC=new b("MAT_DATE_RANGE_SELECTION_STRATEGY");var zp=7,KR=0,yC=(()=>{class t{_changeDetectorRef=d(xe);_dateFormats=d(Vr,{optional:!0});_dateAdapter=d(Mt,{optional:!0});_dir=d(qe,{optional:!0});_rangeStrategy=d(wC,{optional:!0});_rerenderSubscription=ue.EMPTY;_selectionKeyPressed=!1;get activeDate(){return this._activeDate}set activeDate(e){let i=this._activeDate,r=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e))||this._dateAdapter.today();this._activeDate=this._dateAdapter.clampDate(r,this.minDate,this.maxDate),this._hasSameMonthAndYear(i,this._activeDate)||this._init()}_activeDate;get selected(){return this._selected}set selected(e){e instanceof en?this._selected=e:this._selected=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e)),this._setRanges(this._selected)}_selected=null;get minDate(){return this._minDate}set minDate(e){this._minDate=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e))}_minDate=null;get maxDate(){return this._maxDate}set maxDate(e){this._maxDate=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e))}_maxDate=null;dateFilter;dateClass;comparisonStart=null;comparisonEnd=null;startDateAccessibleName=null;endDateAccessibleName=null;activeDrag=null;selectedChange=new F;_userSelection=new F;dragStarted=new F;dragEnded=new F;activeDateChange=new F;_matCalendarBody;_monthLabel=x("");_weeks=x([]);_firstWeekOffset=x(0);_rangeStart=x(null);_rangeEnd=x(null);_comparisonRangeStart=x(null);_comparisonRangeEnd=x(null);_previewStart=x(null);_previewEnd=x(null);_isRange=x(!1);_todayDate=x(null);_weekdays=x([]);constructor(){d(Re).load(wi),this._activeDate=this._dateAdapter.today()}ngAfterContentInit(){this._rerenderSubscription=this._dateAdapter.localeChanges.pipe(nt(null)).subscribe(()=>this._init())}ngOnChanges(e){let i=e.comparisonStart||e.comparisonEnd;i&&!i.firstChange&&this._setRanges(this.selected),e.activeDrag&&!this.activeDrag&&this._clearPreview()}ngOnDestroy(){this._rerenderSubscription.unsubscribe()}_dateSelected(e){let i=e.value,r=this._getDateFromDayOfMonth(i),o,a;this._selected instanceof en?(o=this._getDateInCurrentMonth(this._selected.start),a=this._getDateInCurrentMonth(this._selected.end)):o=a=this._getDateInCurrentMonth(this._selected),(o!==i||a!==i)&&this.selectedChange.emit(r),this._userSelection.emit({value:r,event:e.event}),this._clearPreview(),this._changeDetectorRef.markForCheck()}_updateActiveDate(e){let i=e.value,r=this._activeDate;this.activeDate=this._getDateFromDayOfMonth(i),this._dateAdapter.compareDate(r,this.activeDate)&&this.activeDateChange.emit(this._activeDate)}_handleCalendarBodyKeydown(e){let i=this._activeDate,r=this._isRtl();switch(e.keyCode){case 37:this.activeDate=this._dateAdapter.addCalendarDays(this._activeDate,r?1:-1);break;case 39:this.activeDate=this._dateAdapter.addCalendarDays(this._activeDate,r?-1:1);break;case 38:this.activeDate=this._dateAdapter.addCalendarDays(this._activeDate,-7);break;case 40:this.activeDate=this._dateAdapter.addCalendarDays(this._activeDate,7);break;case 36:this.activeDate=this._dateAdapter.addCalendarDays(this._activeDate,1-this._dateAdapter.getDate(this._activeDate));break;case 35:this.activeDate=this._dateAdapter.addCalendarDays(this._activeDate,this._dateAdapter.getNumDaysInMonth(this._activeDate)-this._dateAdapter.getDate(this._activeDate));break;case 33:this.activeDate=e.altKey?this._dateAdapter.addCalendarYears(this._activeDate,-1):this._dateAdapter.addCalendarMonths(this._activeDate,-1);break;case 34:this.activeDate=e.altKey?this._dateAdapter.addCalendarYears(this._activeDate,1):this._dateAdapter.addCalendarMonths(this._activeDate,1);break;case 13:case 32:this._selectionKeyPressed=!0,this._canSelect(this._activeDate)&&e.preventDefault();return;case 27:this._previewEnd()!=null&&!Et(e)&&(this._clearPreview(),this.activeDrag?this.dragEnded.emit({value:null,event:e}):(this.selectedChange.emit(null),this._userSelection.emit({value:null,event:e})),e.preventDefault(),e.stopPropagation());return;default:return}this._dateAdapter.compareDate(i,this.activeDate)&&(this.activeDateChange.emit(this.activeDate),this._focusActiveCellAfterViewChecked()),e.preventDefault()}_handleCalendarBodyKeyup(e){(e.keyCode===32||e.keyCode===13)&&(this._selectionKeyPressed&&this._canSelect(this._activeDate)&&this._dateSelected({value:this._dateAdapter.getDate(this._activeDate),event:e}),this._selectionKeyPressed=!1)}_init(){this._setRanges(this.selected),this._todayDate.set(this._getCellCompareValue(this._dateAdapter.today())),this._monthLabel.set(this._dateFormats.display.monthLabel?this._dateAdapter.format(this.activeDate,this._dateFormats.display.monthLabel):this._dateAdapter.getMonthNames("short")[this._dateAdapter.getMonth(this.activeDate)].toLocaleUpperCase());let e=this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate),this._dateAdapter.getMonth(this.activeDate),1);this._firstWeekOffset.set((zp+this._dateAdapter.getDayOfWeek(e)-this._dateAdapter.getFirstDayOfWeek())%zp),this._initWeekdays(),this._createWeekCells(),this._changeDetectorRef.markForCheck()}_focusActiveCell(e){this._matCalendarBody._focusActiveCell(e)}_focusActiveCellAfterViewChecked(){this._matCalendarBody._scheduleFocusActiveCellAfterViewChecked()}_previewChanged({event:e,value:i}){if(this._rangeStrategy){let r=i?i.rawValue:null,o=this._rangeStrategy.createPreview(r,this.selected,e);if(this._previewStart.set(this._getCellCompareValue(o.start)),this._previewEnd.set(this._getCellCompareValue(o.end)),this.activeDrag&&r){let a=this._rangeStrategy.createDrag?.(this.activeDrag.value,this.selected,r,e);a&&(this._previewStart.set(this._getCellCompareValue(a.start)),this._previewEnd.set(this._getCellCompareValue(a.end)))}}}_dragEnded(e){if(this.activeDrag)if(e.value){let i=this._rangeStrategy?.createDrag?.(this.activeDrag.value,this.selected,e.value,e.event);this.dragEnded.emit({value:i??null,event:e.event})}else this.dragEnded.emit({value:null,event:e.event})}_getDateFromDayOfMonth(e){return this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate),this._dateAdapter.getMonth(this.activeDate),e)}_initWeekdays(){let e=this._dateAdapter.getFirstDayOfWeek(),i=this._dateAdapter.getDayOfWeekNames("narrow"),o=this._dateAdapter.getDayOfWeekNames("long").map((a,s)=>({long:a,narrow:i[s],id:KR++}));this._weekdays.set(o.slice(e).concat(o.slice(0,e)))}_createWeekCells(){let e=this._dateAdapter.getNumDaysInMonth(this.activeDate),i=this._dateAdapter.getDateNames(),r=[[]];for(let o=0,a=this._firstWeekOffset();o<e;o++,a++){a==zp&&(r.push([]),a=0);let s=this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate),this._dateAdapter.getMonth(this.activeDate),o+1),l=this._shouldEnableDate(s),c=this._dateAdapter.format(s,this._dateFormats.display.dateA11yLabel),u=this.dateClass?this.dateClass(s,"month"):void 0;r[r.length-1].push(new Ts(o+1,i[o],c,l,u,this._getCellCompareValue(s),s))}this._weeks.set(r)}_shouldEnableDate(e){return!!e&&(!this.minDate||this._dateAdapter.compareDate(e,this.minDate)>=0)&&(!this.maxDate||this._dateAdapter.compareDate(e,this.maxDate)<=0)&&(!this.dateFilter||this.dateFilter(e))}_getDateInCurrentMonth(e){return e&&this._hasSameMonthAndYear(e,this.activeDate)?this._dateAdapter.getDate(e):null}_hasSameMonthAndYear(e,i){return!!(e&&i&&this._dateAdapter.getMonth(e)==this._dateAdapter.getMonth(i)&&this._dateAdapter.getYear(e)==this._dateAdapter.getYear(i))}_getCellCompareValue(e){if(e){let i=this._dateAdapter.getYear(e),r=this._dateAdapter.getMonth(e),o=this._dateAdapter.getDate(e);return new Date(i,r,o).getTime()}return null}_isRtl(){return this._dir&&this._dir.value==="rtl"}_setRanges(e){e instanceof en?(this._rangeStart.set(this._getCellCompareValue(e.start)),this._rangeEnd.set(this._getCellCompareValue(e.end)),this._isRange.set(!0)):(this._rangeStart.set(this._getCellCompareValue(e)),this._rangeEnd.set(this._rangeStart()),this._isRange.set(!1)),this._comparisonRangeStart.set(this._getCellCompareValue(this.comparisonStart)),this._comparisonRangeEnd.set(this._getCellCompareValue(this.comparisonEnd))}_canSelect(e){return!this.dateFilter||this.dateFilter(e)}_clearPreview(){this._previewStart.set(null),this._previewEnd.set(null)}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["mat-month-view"]],viewQuery:function(i,r){if(i&1&&ve(Yo,5),i&2){let o;K(o=Q())&&(r._matCalendarBody=o.first)}},inputs:{activeDate:"activeDate",selected:"selected",minDate:"minDate",maxDate:"maxDate",dateFilter:"dateFilter",dateClass:"dateClass",comparisonStart:"comparisonStart",comparisonEnd:"comparisonEnd",startDateAccessibleName:"startDateAccessibleName",endDateAccessibleName:"endDateAccessibleName",activeDrag:"activeDrag"},outputs:{selectedChange:"selectedChange",_userSelection:"_userSelection",dragStarted:"dragStarted",dragEnded:"dragEnded",activeDateChange:"activeDateChange"},exportAs:["matMonthView"],features:[We],decls:8,vars:14,consts:[["role","grid",1,"mat-calendar-table"],[1,"mat-calendar-table-header"],["scope","col"],["aria-hidden","true"],["colspan","7",1,"mat-calendar-table-header-divider"],["mat-calendar-body","",3,"selectedValueChange","activeDateChange","previewChange","dragStarted","dragEnded","keyup","keydown","label","rows","todayValue","startValue","endValue","comparisonStart","comparisonEnd","previewStart","previewEnd","isRange","labelMinRequiredCells","activeCell","startDateAccessibleName","endDateAccessibleName"],[1,"cdk-visually-hidden"]],template:function(i,r){i&1&&(m(0,"table",0)(1,"thead",1)(2,"tr"),Ct(3,FR,5,2,"th",2,xC),h(),m(5,"tr",3),j(6,"th",4),h()(),m(7,"tbody",5),M("selectedValueChange",function(a){return r._dateSelected(a)})("activeDateChange",function(a){return r._updateActiveDate(a)})("previewChange",function(a){return r._previewChanged(a)})("dragStarted",function(a){return r.dragStarted.emit(a)})("dragEnded",function(a){return r._dragEnded(a)})("keyup",function(a){return r._handleCalendarBodyKeyup(a)})("keydown",function(a){return r._handleCalendarBodyKeydown(a)}),h()()),i&2&&(_(3),xt(r._weekdays()),_(4),T("label",r._monthLabel())("rows",r._weeks())("todayValue",r._todayDate())("startValue",r._rangeStart())("endValue",r._rangeEnd())("comparisonStart",r._comparisonRangeStart())("comparisonEnd",r._comparisonRangeEnd())("previewStart",r._previewStart())("previewEnd",r._previewEnd())("isRange",r._isRange())("labelMinRequiredCells",3)("activeCell",r._dateAdapter.getDate(r.activeDate)-1)("startDateAccessibleName",r.startDateAccessibleName)("endDateAccessibleName",r.endDateAccessibleName))},dependencies:[Yo],encapsulation:2,changeDetection:0})}return t})(),Lt=24,$p=4,DC=(()=>{class t{_changeDetectorRef=d(xe);_dateAdapter=d(Mt,{optional:!0});_dir=d(qe,{optional:!0});_rerenderSubscription=ue.EMPTY;_selectionKeyPressed=!1;get activeDate(){return this._activeDate}set activeDate(e){let i=this._activeDate,r=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e))||this._dateAdapter.today();this._activeDate=this._dateAdapter.clampDate(r,this.minDate,this.maxDate),EC(this._dateAdapter,i,this._activeDate,this.minDate,this.maxDate)||this._init()}_activeDate;get selected(){return this._selected}set selected(e){e instanceof en?this._selected=e:this._selected=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e)),this._setSelectedYear(e)}_selected=null;get minDate(){return this._minDate}set minDate(e){this._minDate=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e))}_minDate=null;get maxDate(){return this._maxDate}set maxDate(e){this._maxDate=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e))}_maxDate=null;dateFilter;dateClass;selectedChange=new F;yearSelected=new F;activeDateChange=new F;_matCalendarBody;_years=x([]);_todayYear=x(0);_selectedYear=x(null);constructor(){this._dateAdapter,this._activeDate=this._dateAdapter.today()}ngAfterContentInit(){this._rerenderSubscription=this._dateAdapter.localeChanges.pipe(nt(null)).subscribe(()=>this._init())}ngOnDestroy(){this._rerenderSubscription.unsubscribe()}_init(){this._todayYear.set(this._dateAdapter.getYear(this._dateAdapter.today()));let i=this._dateAdapter.getYear(this._activeDate)-ks(this._dateAdapter,this.activeDate,this.minDate,this.maxDate),r=[];for(let o=0,a=[];o<Lt;o++)a.push(i+o),a.length==$p&&(r.push(a.map(s=>this._createCellForYear(s))),a=[]);this._years.set(r),this._changeDetectorRef.markForCheck()}_yearSelected(e){let i=e.value,r=this._dateAdapter.createDate(i,0,1),o=this._getDateFromYear(i);this.yearSelected.emit(r),this.selectedChange.emit(o)}_updateActiveDate(e){let i=e.value,r=this._activeDate;this.activeDate=this._getDateFromYear(i),this._dateAdapter.compareDate(r,this.activeDate)&&this.activeDateChange.emit(this.activeDate)}_handleCalendarBodyKeydown(e){let i=this._activeDate,r=this._isRtl();switch(e.keyCode){case 37:this.activeDate=this._dateAdapter.addCalendarYears(this._activeDate,r?1:-1);break;case 39:this.activeDate=this._dateAdapter.addCalendarYears(this._activeDate,r?-1:1);break;case 38:this.activeDate=this._dateAdapter.addCalendarYears(this._activeDate,-$p);break;case 40:this.activeDate=this._dateAdapter.addCalendarYears(this._activeDate,$p);break;case 36:this.activeDate=this._dateAdapter.addCalendarYears(this._activeDate,-ks(this._dateAdapter,this.activeDate,this.minDate,this.maxDate));break;case 35:this.activeDate=this._dateAdapter.addCalendarYears(this._activeDate,Lt-ks(this._dateAdapter,this.activeDate,this.minDate,this.maxDate)-1);break;case 33:this.activeDate=this._dateAdapter.addCalendarYears(this._activeDate,e.altKey?-Lt*10:-Lt);break;case 34:this.activeDate=this._dateAdapter.addCalendarYears(this._activeDate,e.altKey?Lt*10:Lt);break;case 13:case 32:this._selectionKeyPressed=!0;break;default:return}this._dateAdapter.compareDate(i,this.activeDate)&&this.activeDateChange.emit(this.activeDate),this._focusActiveCellAfterViewChecked(),e.preventDefault()}_handleCalendarBodyKeyup(e){(e.keyCode===32||e.keyCode===13)&&(this._selectionKeyPressed&&this._yearSelected({value:this._dateAdapter.getYear(this._activeDate),event:e}),this._selectionKeyPressed=!1)}_getActiveCell(){return ks(this._dateAdapter,this.activeDate,this.minDate,this.maxDate)}_focusActiveCell(){this._matCalendarBody._focusActiveCell()}_focusActiveCellAfterViewChecked(){this._matCalendarBody._scheduleFocusActiveCellAfterViewChecked()}_getDateFromYear(e){let i=this._dateAdapter.getMonth(this.activeDate),r=this._dateAdapter.getNumDaysInMonth(this._dateAdapter.createDate(e,i,1));return this._dateAdapter.createDate(e,i,Math.min(this._dateAdapter.getDate(this.activeDate),r))}_createCellForYear(e){let i=this._dateAdapter.createDate(e,0,1),r=this._dateAdapter.getYearName(i),o=this.dateClass?this.dateClass(i,"multi-year"):void 0;return new Ts(e,r,r,this._shouldEnableYear(e),o)}_shouldEnableYear(e){if(e==null||this.maxDate&&e>this._dateAdapter.getYear(this.maxDate)||this.minDate&&e<this._dateAdapter.getYear(this.minDate))return!1;if(!this.dateFilter)return!0;let i=this._dateAdapter.createDate(e,0,1);for(let r=i;this._dateAdapter.getYear(r)==e;r=this._dateAdapter.addCalendarDays(r,1))if(this.dateFilter(r))return!0;return!1}_isRtl(){return this._dir&&this._dir.value==="rtl"}_setSelectedYear(e){if(this._selectedYear.set(null),e instanceof en){let i=e.start||e.end;i&&this._selectedYear.set(this._dateAdapter.getYear(i))}else e&&this._selectedYear.set(this._dateAdapter.getYear(e))}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["mat-multi-year-view"]],viewQuery:function(i,r){if(i&1&&ve(Yo,5),i&2){let o;K(o=Q())&&(r._matCalendarBody=o.first)}},inputs:{activeDate:"activeDate",selected:"selected",minDate:"minDate",maxDate:"maxDate",dateFilter:"dateFilter",dateClass:"dateClass"},outputs:{selectedChange:"selectedChange",yearSelected:"yearSelected",activeDateChange:"activeDateChange"},exportAs:["matMultiYearView"],decls:5,vars:7,consts:[["role","grid",1,"mat-calendar-table"],["aria-hidden","true",1,"mat-calendar-table-header"],["colspan","4",1,"mat-calendar-table-header-divider"],["mat-calendar-body","",3,"selectedValueChange","activeDateChange","keyup","keydown","rows","todayValue","startValue","endValue","numCols","cellAspectRatio","activeCell"]],template:function(i,r){i&1&&(m(0,"table",0)(1,"thead",1)(2,"tr"),j(3,"th",2),h()(),m(4,"tbody",3),M("selectedValueChange",function(a){return r._yearSelected(a)})("activeDateChange",function(a){return r._updateActiveDate(a)})("keyup",function(a){return r._handleCalendarBodyKeyup(a)})("keydown",function(a){return r._handleCalendarBodyKeydown(a)}),h()()),i&2&&(_(4),T("rows",r._years())("todayValue",r._todayYear())("startValue",r._selectedYear())("endValue",r._selectedYear())("numCols",4)("cellAspectRatio",4/7)("activeCell",r._getActiveCell()))},dependencies:[Yo],encapsulation:2,changeDetection:0})}return t})();function EC(t,n,e,i,r){let o=t.getYear(n),a=t.getYear(e),s=MC(t,i,r);return Math.floor((o-s)/Lt)===Math.floor((a-s)/Lt)}function ks(t,n,e,i){let r=t.getYear(n);return QR(r-MC(t,e,i),Lt)}function MC(t,n,e){let i=0;return e?i=t.getYear(e)-Lt+1:n&&(i=t.getYear(n)),i}function QR(t,n){return(t%n+n)%n}var CC=(()=>{class t{_changeDetectorRef=d(xe);_dateFormats=d(Vr,{optional:!0});_dateAdapter=d(Mt,{optional:!0});_dir=d(qe,{optional:!0});_rerenderSubscription=ue.EMPTY;_selectionKeyPressed=!1;get activeDate(){return this._activeDate}set activeDate(e){let i=this._activeDate,r=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e))||this._dateAdapter.today();this._activeDate=this._dateAdapter.clampDate(r,this.minDate,this.maxDate),this._dateAdapter.getYear(i)!==this._dateAdapter.getYear(this._activeDate)&&this._init()}_activeDate;get selected(){return this._selected}set selected(e){e instanceof en?this._selected=e:this._selected=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e)),this._setSelectedMonth(e)}_selected=null;get minDate(){return this._minDate}set minDate(e){this._minDate=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e))}_minDate=null;get maxDate(){return this._maxDate}set maxDate(e){this._maxDate=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e))}_maxDate=null;dateFilter;dateClass;selectedChange=new F;monthSelected=new F;activeDateChange=new F;_matCalendarBody;_months=x([]);_yearLabel=x("");_todayMonth=x(null);_selectedMonth=x(null);constructor(){this._activeDate=this._dateAdapter.today()}ngAfterContentInit(){this._rerenderSubscription=this._dateAdapter.localeChanges.pipe(nt(null)).subscribe(()=>this._init())}ngOnDestroy(){this._rerenderSubscription.unsubscribe()}_monthSelected(e){let i=e.value,r=this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate),i,1);this.monthSelected.emit(r);let o=this._getDateFromMonth(i);this.selectedChange.emit(o)}_updateActiveDate(e){let i=e.value,r=this._activeDate;this.activeDate=this._getDateFromMonth(i),this._dateAdapter.compareDate(r,this.activeDate)&&this.activeDateChange.emit(this.activeDate)}_handleCalendarBodyKeydown(e){let i=this._activeDate,r=this._isRtl();switch(e.keyCode){case 37:this.activeDate=this._dateAdapter.addCalendarMonths(this._activeDate,r?1:-1);break;case 39:this.activeDate=this._dateAdapter.addCalendarMonths(this._activeDate,r?-1:1);break;case 38:this.activeDate=this._dateAdapter.addCalendarMonths(this._activeDate,-4);break;case 40:this.activeDate=this._dateAdapter.addCalendarMonths(this._activeDate,4);break;case 36:this.activeDate=this._dateAdapter.addCalendarMonths(this._activeDate,-this._dateAdapter.getMonth(this._activeDate));break;case 35:this.activeDate=this._dateAdapter.addCalendarMonths(this._activeDate,11-this._dateAdapter.getMonth(this._activeDate));break;case 33:this.activeDate=this._dateAdapter.addCalendarYears(this._activeDate,e.altKey?-10:-1);break;case 34:this.activeDate=this._dateAdapter.addCalendarYears(this._activeDate,e.altKey?10:1);break;case 13:case 32:this._selectionKeyPressed=!0;break;default:return}this._dateAdapter.compareDate(i,this.activeDate)&&(this.activeDateChange.emit(this.activeDate),this._focusActiveCellAfterViewChecked()),e.preventDefault()}_handleCalendarBodyKeyup(e){(e.keyCode===32||e.keyCode===13)&&(this._selectionKeyPressed&&this._monthSelected({value:this._dateAdapter.getMonth(this._activeDate),event:e}),this._selectionKeyPressed=!1)}_init(){this._setSelectedMonth(this.selected),this._todayMonth.set(this._getMonthInCurrentYear(this._dateAdapter.today())),this._yearLabel.set(this._dateAdapter.getYearName(this.activeDate));let e=this._dateAdapter.getMonthNames("short");this._months.set([[0,1,2,3],[4,5,6,7],[8,9,10,11]].map(i=>i.map(r=>this._createCellForMonth(r,e[r])))),this._changeDetectorRef.markForCheck()}_focusActiveCell(){this._matCalendarBody._focusActiveCell()}_focusActiveCellAfterViewChecked(){this._matCalendarBody._scheduleFocusActiveCellAfterViewChecked()}_getMonthInCurrentYear(e){return e&&this._dateAdapter.getYear(e)==this._dateAdapter.getYear(this.activeDate)?this._dateAdapter.getMonth(e):null}_getDateFromMonth(e){let i=this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate),e,1),r=this._dateAdapter.getNumDaysInMonth(i);return this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate),e,Math.min(this._dateAdapter.getDate(this.activeDate),r))}_createCellForMonth(e,i){let r=this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate),e,1),o=this._dateAdapter.format(r,this._dateFormats.display.monthYearA11yLabel),a=this.dateClass?this.dateClass(r,"year"):void 0;return new Ts(e,i.toLocaleUpperCase(),o,this._shouldEnableMonth(e),a)}_shouldEnableMonth(e){let i=this._dateAdapter.getYear(this.activeDate);if(e==null||this._isYearAndMonthAfterMaxDate(i,e)||this._isYearAndMonthBeforeMinDate(i,e))return!1;if(!this.dateFilter)return!0;let r=this._dateAdapter.createDate(i,e,1);for(let o=r;this._dateAdapter.getMonth(o)==e;o=this._dateAdapter.addCalendarDays(o,1))if(this.dateFilter(o))return!0;return!1}_isYearAndMonthAfterMaxDate(e,i){if(this.maxDate){let r=this._dateAdapter.getYear(this.maxDate),o=this._dateAdapter.getMonth(this.maxDate);return e>r||e===r&&i>o}return!1}_isYearAndMonthBeforeMinDate(e,i){if(this.minDate){let r=this._dateAdapter.getYear(this.minDate),o=this._dateAdapter.getMonth(this.minDate);return e<r||e===r&&i<o}return!1}_isRtl(){return this._dir&&this._dir.value==="rtl"}_setSelectedMonth(e){e instanceof en?this._selectedMonth.set(this._getMonthInCurrentYear(e.start)||this._getMonthInCurrentYear(e.end)):this._selectedMonth.set(this._getMonthInCurrentYear(e))}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["mat-year-view"]],viewQuery:function(i,r){if(i&1&&ve(Yo,5),i&2){let o;K(o=Q())&&(r._matCalendarBody=o.first)}},inputs:{activeDate:"activeDate",selected:"selected",minDate:"minDate",maxDate:"maxDate",dateFilter:"dateFilter",dateClass:"dateClass"},outputs:{selectedChange:"selectedChange",monthSelected:"monthSelected",activeDateChange:"activeDateChange"},exportAs:["matYearView"],decls:5,vars:9,consts:[["role","grid",1,"mat-calendar-table"],["aria-hidden","true",1,"mat-calendar-table-header"],["colspan","4",1,"mat-calendar-table-header-divider"],["mat-calendar-body","",3,"selectedValueChange","activeDateChange","keyup","keydown","label","rows","todayValue","startValue","endValue","labelMinRequiredCells","numCols","cellAspectRatio","activeCell"]],template:function(i,r){i&1&&(m(0,"table",0)(1,"thead",1)(2,"tr"),j(3,"th",2),h()(),m(4,"tbody",3),M("selectedValueChange",function(a){return r._monthSelected(a)})("activeDateChange",function(a){return r._updateActiveDate(a)})("keyup",function(a){return r._handleCalendarBodyKeyup(a)})("keydown",function(a){return r._handleCalendarBodyKeydown(a)}),h()()),i&2&&(_(4),T("label",r._yearLabel())("rows",r._months())("todayValue",r._todayMonth())("startValue",r._selectedMonth())("endValue",r._selectedMonth())("labelMinRequiredCells",2)("numCols",4)("cellAspectRatio",4/7)("activeCell",r._dateAdapter.getMonth(r.activeDate)))},dependencies:[Yo],encapsulation:2,changeDetection:0})}return t})(),IC=(()=>{class t{_intl=d(qo);calendar=d(As);_dateAdapter=d(Mt,{optional:!0});_dateFormats=d(Vr,{optional:!0});_periodButtonText;_periodButtonDescription;_periodButtonLabel;_prevButtonLabel;_nextButtonLabel;constructor(){d(Re).load(wi);let e=d(xe);this._updateLabels(),this.calendar.stateChanges.subscribe(()=>{this._updateLabels(),e.markForCheck()})}get periodButtonText(){return this._periodButtonText}get periodButtonDescription(){return this._periodButtonDescription}get periodButtonLabel(){return this._periodButtonLabel}get prevButtonLabel(){return this._prevButtonLabel}get nextButtonLabel(){return this._nextButtonLabel}currentPeriodClicked(){this.calendar.currentView=this.calendar.currentView=="month"?"multi-year":"month"}previousClicked(){this.previousEnabled()&&(this.calendar.activeDate=this.calendar.currentView=="month"?this._dateAdapter.addCalendarMonths(this.calendar.activeDate,-1):this._dateAdapter.addCalendarYears(this.calendar.activeDate,this.calendar.currentView=="year"?-1:-Lt))}nextClicked(){this.nextEnabled()&&(this.calendar.activeDate=this.calendar.currentView=="month"?this._dateAdapter.addCalendarMonths(this.calendar.activeDate,1):this._dateAdapter.addCalendarYears(this.calendar.activeDate,this.calendar.currentView=="year"?1:Lt))}previousEnabled(){return this.calendar.minDate?!this.calendar.minDate||!this._isSameView(this.calendar.activeDate,this.calendar.minDate):!0}nextEnabled(){return!this.calendar.maxDate||!this._isSameView(this.calendar.activeDate,this.calendar.maxDate)}_updateLabels(){let e=this.calendar,i=this._intl,r=this._dateAdapter;e.currentView==="month"?(this._periodButtonText=r.format(e.activeDate,this._dateFormats.display.monthYearLabel).toLocaleUpperCase(),this._periodButtonDescription=r.format(e.activeDate,this._dateFormats.display.monthYearLabel).toLocaleUpperCase(),this._periodButtonLabel=i.switchToMultiYearViewLabel,this._prevButtonLabel=i.prevMonthLabel,this._nextButtonLabel=i.nextMonthLabel):e.currentView==="year"?(this._periodButtonText=r.getYearName(e.activeDate),this._periodButtonDescription=r.getYearName(e.activeDate),this._periodButtonLabel=i.switchToMonthViewLabel,this._prevButtonLabel=i.prevYearLabel,this._nextButtonLabel=i.nextYearLabel):(this._periodButtonText=i.formatYearRange(...this._formatMinAndMaxYearLabels()),this._periodButtonDescription=i.formatYearRangeLabel(...this._formatMinAndMaxYearLabels()),this._periodButtonLabel=i.switchToMonthViewLabel,this._prevButtonLabel=i.prevMultiYearLabel,this._nextButtonLabel=i.nextMultiYearLabel)}_isSameView(e,i){return this.calendar.currentView=="month"?this._dateAdapter.getYear(e)==this._dateAdapter.getYear(i)&&this._dateAdapter.getMonth(e)==this._dateAdapter.getMonth(i):this.calendar.currentView=="year"?this._dateAdapter.getYear(e)==this._dateAdapter.getYear(i):EC(this._dateAdapter,e,i,this.calendar.minDate,this.calendar.maxDate)}_formatMinAndMaxYearLabels(){let i=this._dateAdapter.getYear(this.calendar.activeDate)-ks(this._dateAdapter,this.calendar.activeDate,this.calendar.minDate,this.calendar.maxDate),r=i+Lt-1,o=this._dateAdapter.getYearName(this._dateAdapter.createDate(i,0,1)),a=this._dateAdapter.getYearName(this._dateAdapter.createDate(r,0,1));return[o,a]}_periodButtonLabelId=d(Ie).getId("mat-calendar-period-label-");static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["mat-calendar-header"]],exportAs:["matCalendarHeader"],ngContentSelectors:PR,decls:17,vars:13,consts:[[1,"mat-calendar-header"],[1,"mat-calendar-controls"],["aria-live","polite",1,"cdk-visually-hidden",3,"id"],["matButton","","type","button",1,"mat-calendar-period-button",3,"click"],["aria-hidden","true"],["viewBox","0 0 10 5","focusable","false","aria-hidden","true",1,"mat-calendar-arrow"],["points","0,0 5,5 10,0"],[1,"mat-calendar-spacer"],["matIconButton","","type","button","disabledInteractive","",1,"mat-calendar-previous-button",3,"click","disabled","matTooltip"],["viewBox","0 0 24 24","focusable","false","aria-hidden","true"],["d","M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"],["matIconButton","","type","button","disabledInteractive","",1,"mat-calendar-next-button",3,"click","disabled","matTooltip"],["d","M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"]],template:function(i,r){i&1&&(Ne(),m(0,"div",0)(1,"div",1)(2,"span",2),C(3),h(),m(4,"button",3),M("click",function(){return r.currentPeriodClicked()}),m(5,"span",4),C(6),h(),yt(),m(7,"svg",5),j(8,"polygon",6),h()(),jn(),j(9,"div",7),ce(10),m(11,"button",8),M("click",function(){return r.previousClicked()}),yt(),m(12,"svg",9),j(13,"path",10),h()(),jn(),m(14,"button",11),M("click",function(){return r.nextClicked()}),yt(),m(15,"svg",9),j(16,"path",12),h()()()()),i&2&&(_(2),T("id",r._periodButtonLabelId),_(),oe(r.periodButtonDescription),_(),P("aria-label",r.periodButtonLabel)("aria-describedby",r._periodButtonLabelId),_(2),oe(r.periodButtonText),_(),I("mat-calendar-invert",r.calendar.currentView!=="month"),_(4),T("disabled",!r.previousEnabled())("matTooltip",r.prevButtonLabel),P("aria-label",r.prevButtonLabel),_(3),T("disabled",!r.nextEnabled())("matTooltip",r.nextButtonLabel),P("aria-label",r.nextButtonLabel))},dependencies:[_n,Kt,ti],encapsulation:2,changeDetection:0})}return t})(),As=(()=>{class t{_dateAdapter=d(Mt,{optional:!0});_dateFormats=d(Vr,{optional:!0});_changeDetectorRef=d(xe);_elementRef=d(L);headerComponent;_calendarHeaderPortal;_intlChanges;_moveFocusOnNextTick=!1;get startAt(){return this._startAt}set startAt(e){this._startAt=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e))}_startAt=null;startView="month";get selected(){return this._selected}set selected(e){e instanceof en?this._selected=e:this._selected=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e))}_selected=null;get minDate(){return this._minDate}set minDate(e){this._minDate=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e))}_minDate=null;get maxDate(){return this._maxDate}set maxDate(e){this._maxDate=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e))}_maxDate=null;dateFilter;dateClass;comparisonStart=null;comparisonEnd=null;startDateAccessibleName=null;endDateAccessibleName=null;selectedChange=new F;yearSelected=new F;monthSelected=new F;viewChanged=new F(!0);_userSelection=new F;_userDragDrop=new F;monthView;yearView;multiYearView;get activeDate(){return this._clampedActiveDate}set activeDate(e){this._clampedActiveDate=this._dateAdapter.clampDate(e,this.minDate,this.maxDate),this.stateChanges.next(),this._changeDetectorRef.markForCheck()}_clampedActiveDate;get currentView(){return this._currentView}set currentView(e){let i=this._currentView!==e?e:null;this._currentView=e,this._moveFocusOnNextTick=!0,this._changeDetectorRef.markForCheck(),i&&(this.stateChanges.next(),this.viewChanged.emit(i))}_currentView;_activeDrag=null;stateChanges=new E;constructor(){this._intlChanges=d(qo).changes.subscribe(()=>{this._changeDetectorRef.markForCheck(),this.stateChanges.next()})}ngAfterContentInit(){this._calendarHeaderPortal=new Pt(this.headerComponent||IC),this.activeDate=this.startAt||this._dateAdapter.today(),this._currentView=this.startView}ngAfterViewChecked(){this._moveFocusOnNextTick&&(this._moveFocusOnNextTick=!1,this.focusActiveCell())}ngOnDestroy(){this._intlChanges.unsubscribe(),this.stateChanges.complete()}ngOnChanges(e){let i=e.minDate&&!this._dateAdapter.sameDate(e.minDate.previousValue,e.minDate.currentValue)?e.minDate:void 0,r=e.maxDate&&!this._dateAdapter.sameDate(e.maxDate.previousValue,e.maxDate.currentValue)?e.maxDate:void 0,o=i||r||e.dateFilter;if(o&&!o.firstChange){let a=this._getCurrentViewComponent();a&&(this._elementRef.nativeElement.contains(Yn())&&(this._moveFocusOnNextTick=!0),this._changeDetectorRef.detectChanges(),a._init())}this.stateChanges.next()}focusActiveCell(){this._getCurrentViewComponent()?._focusActiveCell(!1)}updateTodaysDate(){this._getCurrentViewComponent()?._init()}_dateSelected(e){let i=e.value;(this.selected instanceof en||i&&!this._dateAdapter.sameDate(i,this.selected))&&this.selectedChange.emit(i),this._userSelection.emit(e)}_yearSelectedInMultiYearView(e){this.yearSelected.emit(e)}_monthSelectedInYearView(e){this.monthSelected.emit(e)}_goToDateInView(e,i){this.activeDate=e,this.currentView=i}_dragStarted(e){this._activeDrag=e}_dragEnded(e){this._activeDrag&&(e.value&&this._userDragDrop.emit(e),this._activeDrag=null)}_getCurrentViewComponent(){return this.monthView||this.yearView||this.multiYearView}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["mat-calendar"]],viewQuery:function(i,r){if(i&1&&ve(yC,5)(CC,5)(DC,5),i&2){let o;K(o=Q())&&(r.monthView=o.first),K(o=Q())&&(r.yearView=o.first),K(o=Q())&&(r.multiYearView=o.first)}},hostAttrs:[1,"mat-calendar"],inputs:{headerComponent:"headerComponent",startAt:"startAt",startView:"startView",selected:"selected",minDate:"minDate",maxDate:"maxDate",dateFilter:"dateFilter",dateClass:"dateClass",comparisonStart:"comparisonStart",comparisonEnd:"comparisonEnd",startDateAccessibleName:"startDateAccessibleName",endDateAccessibleName:"endDateAccessibleName"},outputs:{selectedChange:"selectedChange",yearSelected:"yearSelected",monthSelected:"monthSelected",viewChanged:"viewChanged",_userSelection:"_userSelection",_userDragDrop:"_userDragDrop"},exportAs:["matCalendar"],features:[Be([ZR]),We],decls:5,vars:2,consts:[[3,"cdkPortalOutlet"],["cdkMonitorSubtreeFocus","","tabindex","-1",1,"mat-calendar-content"],[3,"activeDate","selected","dateFilter","maxDate","minDate","dateClass","comparisonStart","comparisonEnd","startDateAccessibleName","endDateAccessibleName","activeDrag"],[3,"activeDate","selected","dateFilter","maxDate","minDate","dateClass"],[3,"activeDateChange","_userSelection","dragStarted","dragEnded","activeDate","selected","dateFilter","maxDate","minDate","dateClass","comparisonStart","comparisonEnd","startDateAccessibleName","endDateAccessibleName","activeDrag"],[3,"activeDateChange","monthSelected","selectedChange","activeDate","selected","dateFilter","maxDate","minDate","dateClass"],[3,"activeDateChange","yearSelected","selectedChange","activeDate","selected","dateFilter","maxDate","minDate","dateClass"]],template:function(i,r){if(i&1&&(it(0,LR,0,0,"ng-template",0),m(1,"div",1),V(2,VR,1,11,"mat-month-view",2)(3,BR,1,6,"mat-year-view",3)(4,jR,1,6,"mat-multi-year-view",3),h()),i&2){let o;T("cdkPortalOutlet",r._calendarHeaderPortal),_(2),B((o=r.currentView)==="month"?2:o==="year"?3:o==="multi-year"?4:-1)}},dependencies:[vn,Ph,yC,CC,DC],styles:[`.mat-calendar {
  display: block;
  line-height: normal;
  font-family: var(--mat-datepicker-calendar-text-font, var(--mat-sys-body-medium-font));
  font-size: var(--mat-datepicker-calendar-text-size, var(--mat-sys-body-medium-size));
}

.mat-calendar-header {
  padding: 8px 8px 0 8px;
}

.mat-calendar-content {
  padding: 0 8px 8px 8px;
  outline: none;
}

.mat-calendar-controls {
  display: flex;
  align-items: center;
  margin: 5% calc(4.7142857143% - 16px);
}

.mat-calendar-spacer {
  flex: 1 1 auto;
}

.mat-calendar-period-button {
  min-width: 0;
  margin: 0 8px;
  font-size: var(--mat-datepicker-calendar-period-button-text-size, var(--mat-sys-title-small-size));
  font-weight: var(--mat-datepicker-calendar-period-button-text-weight, var(--mat-sys-title-small-weight));
  --mat-button-text-label-text-color: var(--mat-datepicker-calendar-period-button-text-color, var(--mat-sys-on-surface-variant));
}

.mat-calendar-arrow {
  display: inline-block;
  width: 10px;
  height: 5px;
  margin: 0 0 0 5px;
  vertical-align: middle;
  fill: var(--mat-datepicker-calendar-period-button-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-calendar-arrow.mat-calendar-invert {
  transform: rotate(180deg);
}
[dir=rtl] .mat-calendar-arrow {
  margin: 0 5px 0 0;
}
@media (forced-colors: active) {
  .mat-calendar-arrow {
    fill: CanvasText;
  }
}

.mat-datepicker-content .mat-calendar-previous-button:not(.mat-mdc-button-disabled),
.mat-datepicker-content .mat-calendar-next-button:not(.mat-mdc-button-disabled) {
  color: var(--mat-datepicker-calendar-navigation-button-icon-color, var(--mat-sys-on-surface-variant));
}
[dir=rtl] .mat-calendar-previous-button,
[dir=rtl] .mat-calendar-next-button {
  transform: rotate(180deg);
}

.mat-calendar-table {
  border-spacing: 0;
  border-collapse: collapse;
  width: 100%;
}

.mat-calendar-table-header th {
  text-align: center;
  padding: 0 0 8px 0;
  color: var(--mat-datepicker-calendar-header-text-color, var(--mat-sys-on-surface-variant));
  font-size: var(--mat-datepicker-calendar-header-text-size, var(--mat-sys-title-small-size));
  font-weight: var(--mat-datepicker-calendar-header-text-weight, var(--mat-sys-title-small-weight));
}

.mat-calendar-table-header-divider {
  position: relative;
  height: 1px;
}
.mat-calendar-table-header-divider::after {
  content: "";
  position: absolute;
  top: 0;
  left: -8px;
  right: -8px;
  height: 1px;
  background: var(--mat-datepicker-calendar-header-divider-color, transparent);
}

.mat-calendar-body-cell-content::before {
  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 3px) * -1);
}

.mat-calendar-body-cell:focus-visible .mat-focus-indicator::before {
  content: "";
}
`],encapsulation:2,changeDetection:0})}return t})();var XR=(()=>{class t{_elementRef=d(L);_animationsDisabled=we();_changeDetectorRef=d(xe);_globalModel=d(Wd);_dateAdapter=d(Mt);_ngZone=d(A);_rangeSelectionStrategy=d(wC,{optional:!0});_stateChanges;_model;_eventCleanups;_animationFallback;_calendar;color;datepicker;comparisonStart=null;comparisonEnd=null;startDateAccessibleName=null;endDateAccessibleName=null;_isAbove=!1;_animationDone=new E;_isAnimating=!1;_closeButtonText;_closeButtonFocused=!1;_actionsPortal=null;_dialogLabelId=null;constructor(){if(d(Re).load(wi),this._closeButtonText=d(qo).closeCalendarLabel,!this._animationsDisabled){let e=this._elementRef.nativeElement,i=d(Te);this._eventCleanups=this._ngZone.runOutsideAngular(()=>[i.listen(e,"animationstart",this._handleAnimationEvent),i.listen(e,"animationend",this._handleAnimationEvent),i.listen(e,"animationcancel",this._handleAnimationEvent)])}}ngAfterViewInit(){this._stateChanges=this.datepicker.stateChanges.subscribe(()=>{this._changeDetectorRef.markForCheck()}),this._calendar.focusActiveCell()}ngOnDestroy(){clearTimeout(this._animationFallback),this._eventCleanups?.forEach(e=>e()),this._stateChanges?.unsubscribe(),this._animationDone.complete()}_handleUserSelection(e){let i=this._model.selection,r=e.value,o=i instanceof en;if(o&&this._rangeSelectionStrategy){let a=this._rangeSelectionStrategy.selectionFinished(r,i,e.event);this._model.updateSelection(a,this)}else r&&(o||!this._dateAdapter.sameDate(r,i))&&this._model.add(r);(!this._model||this._model.isComplete())&&!this._actionsPortal&&this.datepicker.close()}_handleUserDragDrop(e){this._model.updateSelection(e.value,this)}_startExitAnimation(){this._elementRef.nativeElement.classList.add("mat-datepicker-content-exit"),this._animationsDisabled?this._animationDone.next():(clearTimeout(this._animationFallback),this._animationFallback=setTimeout(()=>{this._isAnimating||this._animationDone.next()},200))}_handleAnimationEvent=e=>{let i=this._elementRef.nativeElement;e.target!==i||!e.animationName.startsWith("_mat-datepicker-content")||(clearTimeout(this._animationFallback),this._isAnimating=e.type==="animationstart",i.classList.toggle("mat-datepicker-content-animating",this._isAnimating),this._isAnimating||this._animationDone.next())};_getSelected(){return this._model.selection}_applyPendingSelection(){this._model!==this._globalModel&&this._globalModel.updateSelection(this._model.selection,this)}_assignActions(e,i){this._model=e?this._globalModel.clone():this._globalModel,this._actionsPortal=e,i&&this._changeDetectorRef.detectChanges()}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["mat-datepicker-content"]],viewQuery:function(i,r){if(i&1&&ve(As,5),i&2){let o;K(o=Q())&&(r._calendar=o.first)}},hostAttrs:[1,"mat-datepicker-content"],hostVars:6,hostBindings:function(i,r){i&2&&(rt(r.color?"mat-"+r.color:""),I("mat-datepicker-content-touch",r.datepicker.touchUi)("mat-datepicker-content-animations-enabled",!r._animationsDisabled))},inputs:{color:"color"},exportAs:["matDatepickerContent"],decls:5,vars:26,consts:[["cdkTrapFocus","","role","dialog",1,"mat-datepicker-content-container"],[3,"yearSelected","monthSelected","viewChanged","_userSelection","_userDragDrop","id","startAt","startView","minDate","maxDate","dateFilter","headerComponent","selected","dateClass","comparisonStart","comparisonEnd","startDateAccessibleName","endDateAccessibleName"],[3,"cdkPortalOutlet"],["type","button","matButton","elevated",1,"mat-datepicker-close-button",3,"focus","blur","click","color"]],template:function(i,r){i&1&&(m(0,"div",0)(1,"mat-calendar",1),M("yearSelected",function(a){return r.datepicker._selectYear(a)})("monthSelected",function(a){return r.datepicker._selectMonth(a)})("viewChanged",function(a){return r.datepicker._viewChanged(a)})("_userSelection",function(a){return r._handleUserSelection(a)})("_userDragDrop",function(a){return r._handleUserDragDrop(a)}),h(),it(2,HR,0,0,"ng-template",2),m(3,"button",3),M("focus",function(){return r._closeButtonFocused=!0})("blur",function(){return r._closeButtonFocused=!1})("click",function(){return r.datepicker.close()}),C(4),h()()),i&2&&(I("mat-datepicker-content-container-with-custom-header",r.datepicker.calendarHeaderComponent)("mat-datepicker-content-container-with-actions",r._actionsPortal),P("aria-modal",!0)("aria-labelledby",r._dialogLabelId??void 0),_(),rt(r.datepicker.panelClass),T("id",r.datepicker.id)("startAt",r.datepicker.startAt)("startView",r.datepicker.startView)("minDate",r.datepicker._getMinDate())("maxDate",r.datepicker._getMaxDate())("dateFilter",r.datepicker._getDateFilter())("headerComponent",r.datepicker.calendarHeaderComponent)("selected",r._getSelected())("dateClass",r.datepicker.dateClass)("comparisonStart",r.comparisonStart)("comparisonEnd",r.comparisonEnd)("startDateAccessibleName",r.startDateAccessibleName)("endDateAccessibleName",r.endDateAccessibleName),_(),T("cdkPortalOutlet",r._actionsPortal),_(),I("cdk-visually-hidden",!r._closeButtonFocused),T("color",r.color||"primary"),_(),oe(r._closeButtonText))},dependencies:[jh,As,vn,_n],styles:[`@keyframes _mat-datepicker-content-dropdown-enter {
  from {
    opacity: 0;
    transform: scaleY(0.8);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes _mat-datepicker-content-dialog-enter {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes _mat-datepicker-content-exit {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.mat-datepicker-content {
  display: block;
  background-color: var(--mat-datepicker-calendar-container-background-color, var(--mat-sys-surface-container-high));
  color: var(--mat-datepicker-calendar-container-text-color, var(--mat-sys-on-surface));
  box-shadow: var(--mat-datepicker-calendar-container-elevation-shadow, 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12));
  border-radius: var(--mat-datepicker-calendar-container-shape, var(--mat-sys-corner-large));
}
.mat-datepicker-content.mat-datepicker-content-animations-enabled {
  animation: _mat-datepicker-content-dropdown-enter 120ms cubic-bezier(0, 0, 0.2, 1);
}
.mat-datepicker-content .mat-calendar {
  width: 296px;
  height: 354px;
}
.mat-datepicker-content .mat-datepicker-content-container-with-custom-header .mat-calendar {
  height: auto;
}
.mat-datepicker-content .mat-datepicker-close-button {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 8px;
}
.mat-datepicker-content-animating .mat-datepicker-content .mat-datepicker-close-button {
  display: none;
}

.mat-datepicker-content-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.mat-datepicker-content-touch {
  display: block;
  max-height: 80vh;
  box-shadow: var(--mat-datepicker-calendar-container-touch-elevation-shadow, 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12));
  border-radius: var(--mat-datepicker-calendar-container-touch-shape, var(--mat-sys-corner-extra-large));
  position: relative;
  overflow: visible;
}
.mat-datepicker-content-touch.mat-datepicker-content-animations-enabled {
  animation: _mat-datepicker-content-dialog-enter 150ms cubic-bezier(0, 0, 0.2, 1);
}
.mat-datepicker-content-touch .mat-datepicker-content-container {
  min-height: 312px;
  max-height: 788px;
  min-width: 250px;
  max-width: 750px;
}
.mat-datepicker-content-touch .mat-calendar {
  width: 100%;
  height: auto;
}

.mat-datepicker-content-exit.mat-datepicker-content-animations-enabled {
  animation: _mat-datepicker-content-exit 100ms linear;
}

@media all and (orientation: landscape) {
  .mat-datepicker-content-touch .mat-datepicker-content-container {
    width: 64vh;
    height: 80vh;
  }
}
@media all and (orientation: portrait) {
  .mat-datepicker-content-touch .mat-datepicker-content-container {
    width: 80vw;
    height: 100vw;
  }
  .mat-datepicker-content-touch .mat-datepicker-content-container-with-actions {
    height: 115vw;
  }
}
`],encapsulation:2,changeDetection:0})}return t})();var JR=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=U({type:t,selectors:[["","matDatepickerToggleIcon",""]]})}return t})(),eO=(()=>{class t{_intl=d(qo);_changeDetectorRef=d(xe);_stateChanges=ue.EMPTY;datepicker;tabIndex=null;ariaLabel;get disabled(){return this._disabled===void 0&&this.datepicker?this.datepicker.disabled:!!this._disabled}set disabled(e){this._disabled=e}_disabled;disableRipple=!1;_customIcon;_button;constructor(){let e=d(new Tn("tabindex"),{optional:!0}),i=Number(e);this.tabIndex=i||i===0?i:null}ngOnChanges(e){e.datepicker&&this._watchStateChanges()}ngOnDestroy(){this._stateChanges.unsubscribe()}ngAfterContentInit(){this._watchStateChanges()}_open(e){this.datepicker&&!this.disabled&&(this.datepicker.open(),e.stopPropagation())}_watchStateChanges(){let e=this.datepicker?this.datepicker.stateChanges:Pe(),i=this.datepicker&&this.datepicker.datepickerInput?this.datepicker.datepickerInput.stateChanges:Pe(),r=this.datepicker?Bt(this.datepicker.openedStream,this.datepicker.closedStream):Pe();this._stateChanges.unsubscribe(),this._stateChanges=Bt(this._intl.changes,e,i,r).subscribe(()=>this._changeDetectorRef.markForCheck())}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["mat-datepicker-toggle"]],contentQueries:function(i,r,o){if(i&1&&kn(o,JR,5),i&2){let a;K(a=Q())&&(r._customIcon=a.first)}},viewQuery:function(i,r){if(i&1&&ve(UR,5),i&2){let o;K(o=Q())&&(r._button=o.first)}},hostAttrs:[1,"mat-datepicker-toggle"],hostVars:8,hostBindings:function(i,r){i&1&&M("click",function(a){return r._open(a)}),i&2&&(P("tabindex",null)("data-mat-calendar",r.datepicker?r.datepicker.id:null),I("mat-datepicker-toggle-active",r.datepicker&&r.datepicker.opened)("mat-accent",r.datepicker&&r.datepicker.color==="accent")("mat-warn",r.datepicker&&r.datepicker.color==="warn"))},inputs:{datepicker:[0,"for","datepicker"],tabIndex:"tabIndex",ariaLabel:[0,"aria-label","ariaLabel"],disabled:[2,"disabled","disabled",ie],disableRipple:"disableRipple"},exportAs:["matDatepickerToggle"],features:[We],ngContentSelectors:$R,decls:4,vars:7,consts:[["button",""],["matIconButton","","type","button",3,"tabIndex","disabled","disableRipple"],["viewBox","0 0 24 24","width","24px","height","24px","fill","currentColor","focusable","false","aria-hidden","true",1,"mat-datepicker-toggle-default-icon"],["d","M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"]],template:function(i,r){i&1&&(Ne(zR),m(0,"button",1,0),V(2,GR,2,0,":svg:svg",2),ce(3),h()),i&2&&(T("tabIndex",r.disabled?-1:r.tabIndex)("disabled",r.disabled)("disableRipple",r.disableRipple),P("aria-haspopup",r.datepicker?"dialog":null)("aria-label",r.ariaLabel||r._intl.openCalendarLabel)("aria-expanded",r.datepicker?r.datepicker.opened:null),_(2),B(r._customIcon?-1:2))},dependencies:[Kt],styles:[`.mat-datepicker-toggle {
  pointer-events: auto;
  color: var(--mat-datepicker-toggle-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-datepicker-toggle button {
  color: inherit;
}

.mat-datepicker-toggle-active {
  color: var(--mat-datepicker-toggle-active-state-icon-color, var(--mat-sys-primary));
}

@media (forced-colors: active) {
  .mat-datepicker-toggle-default-icon {
    color: CanvasText;
  }
}
`],encapsulation:2,changeDetection:0})}return t})();var SC=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=Z({type:t});static \u0275inj=q({providers:[qo],imports:[Ft,Qt,Sr,Rn,XR,eO,IC,ye,Xn]})}return t})();var nO=/^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|(?:(?:\+|-)\d{2}:\d{2}))?)?$/,iO=/^(\d?\d)[:.](\d?\d)(?:[:.](\d?\d))?\s*(AM|PM)?$/i;function Gp(t,n){let e=Array(t);for(let i=0;i<t;i++)e[i]=n(i);return e}var rO=(()=>{class t extends Mt{_matDateLocale=d(Lp,{optional:!0});constructor(){super();let e=d(Lp,{optional:!0});e!==void 0&&(this._matDateLocale=e),super.setLocale(this._matDateLocale)}getYear(e){return e.getFullYear()}getMonth(e){return e.getMonth()}getDate(e){return e.getDate()}getDayOfWeek(e){return e.getDay()}getMonthNames(e){let i=new Intl.DateTimeFormat(this.locale,{month:e,timeZone:"utc"});return Gp(12,r=>this._format(i,new Date(2017,r,1)))}getDateNames(){let e=new Intl.DateTimeFormat(this.locale,{day:"numeric",timeZone:"utc"});return Gp(31,i=>this._format(e,new Date(2017,0,i+1)))}getDayOfWeekNames(e){let i=new Intl.DateTimeFormat(this.locale,{weekday:e,timeZone:"utc"});return Gp(7,r=>this._format(i,new Date(2017,0,r+1)))}getYearName(e){let i=new Intl.DateTimeFormat(this.locale,{year:"numeric",timeZone:"utc"});return this._format(i,e)}getFirstDayOfWeek(){if(typeof Intl<"u"&&Intl.Locale){let e=new Intl.Locale(this.locale),i=(e.getWeekInfo?.()||e.weekInfo)?.firstDay??0;return i===7?0:i}return 0}getNumDaysInMonth(e){return this.getDate(this._createDateWithOverflow(this.getYear(e),this.getMonth(e)+1,0))}clone(e){return new Date(e.getTime())}createDate(e,i,r){let o=this._createDateWithOverflow(e,i,r);return o.getMonth()!=i,o}today(){return new Date}parse(e,i){return typeof e=="number"?new Date(e):e?new Date(Date.parse(e)):null}format(e,i){if(!this.isValid(e))throw Error("NativeDateAdapter: Cannot format invalid date.");let r=new Intl.DateTimeFormat(this.locale,ae(w({},i),{timeZone:"utc"}));return this._format(r,e)}addCalendarYears(e,i){return this.addCalendarMonths(e,i*12)}addCalendarMonths(e,i){let r=this._createDateWithOverflow(this.getYear(e),this.getMonth(e)+i,this.getDate(e));return this.getMonth(r)!=((this.getMonth(e)+i)%12+12)%12&&(r=this._createDateWithOverflow(this.getYear(r),this.getMonth(r),0)),r}addCalendarDays(e,i){return this._createDateWithOverflow(this.getYear(e),this.getMonth(e),this.getDate(e)+i)}toIso8601(e){return[e.getUTCFullYear(),this._2digit(e.getUTCMonth()+1),this._2digit(e.getUTCDate())].join("-")}deserialize(e){if(typeof e=="string"){if(!e)return null;if(nO.test(e)){let i=new Date(e);if(this.isValid(i))return i}}return super.deserialize(e)}isDateInstance(e){return e instanceof Date}isValid(e){return!isNaN(e.getTime())}invalid(){return new Date(NaN)}setTime(e,i,r,o){let a=this.clone(e);return a.setHours(i,r,o,0),a}getHours(e){return e.getHours()}getMinutes(e){return e.getMinutes()}getSeconds(e){return e.getSeconds()}parseTime(e,i){if(typeof e!="string")return e instanceof Date?new Date(e.getTime()):null;let r=e.trim();if(r.length===0)return null;let o=this._parseTimeString(r);if(o===null){let a=r.replace(/[^0-9:(AM|PM)]/gi,"").trim();a.length>0&&(o=this._parseTimeString(a))}return o||this.invalid()}addSeconds(e,i){return new Date(e.getTime()+i*1e3)}_createDateWithOverflow(e,i,r){let o=new Date;return o.setFullYear(e,i,r),o.setHours(0,0,0,0),o}_2digit(e){return("00"+e).slice(-2)}_format(e,i){let r=new Date;return r.setUTCFullYear(i.getFullYear(),i.getMonth(),i.getDate()),r.setUTCHours(i.getHours(),i.getMinutes(),i.getSeconds(),i.getMilliseconds()),e.format(r)}_parseTimeString(e){let i=e.toUpperCase().match(iO);if(i){let r=parseInt(i[1]),o=parseInt(i[2]),a=i[3]==null?void 0:parseInt(i[3]),s=i[4];if(r===12?r=s==="AM"?0:r:s==="PM"&&(r+=12),Wp(r,0,23)&&Wp(o,0,59)&&(a==null||Wp(a,0,59)))return this.setTime(this.today(),r,o,a||0)}return null}static \u0275fac=function(i){return new(i||t)};static \u0275prov=y({token:t,factory:t.\u0275fac})}return t})();function Wp(t,n,e){return!isNaN(t)&&t>=n&&t<=e}var oO={parse:{dateInput:null,timeInput:null},display:{dateInput:{year:"numeric",month:"numeric",day:"numeric"},timeInput:{hour:"numeric",minute:"numeric"},monthYearLabel:{year:"numeric",month:"short"},dateA11yLabel:{year:"numeric",month:"long",day:"numeric"},monthYearA11yLabel:{year:"numeric",month:"long"},timeOptionLabel:{hour:"numeric",minute:"numeric"}}};function kC(t=oO){return[{provide:Mt,useClass:rO},{provide:Vr,useValue:t}]}var Yd=class t{http=d(ut);getActiveDates(){return this.http.get("/api/diary/active-dates")}getOrGenerateEntry(n,e=!1,i){return this.http.post("/api/diary/entry",{date:n,force:e,provider:i})}static \u0275fac=function(e){return new(e||t)};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})};function aO(t,n){t&1&&(m(0,"div",9),j(1,"mat-spinner",16),h())}function sO(t,n){if(t&1){let e=pe();m(0,"mat-calendar",17),M("selectedChange",function(r){te(e);let o=D();return ne(o.onDateSelected(r))}),h()}if(t&2){let e=D();T("selected",e.selectedDate())("maxDate",e.maxDate())("dateClass",e.dateClass)}}function lO(t,n){t&1&&(m(0,"div",12)(1,"mat-icon",18),C(2,"menu_book"),h(),m(3,"p"),C(4,"Pick a highlighted day from the calendar to read what the music said about you."),h()())}function cO(t,n){t&1&&(m(0,"div",13),j(1,"mat-spinner",19),m(2,"p"),C(3,"Writing your diary entry\u2026"),h()())}function dO(t,n){if(t&1){let e=pe();m(0,"div",14)(1,"mat-icon",18),C(2,"error_outline"),h(),m(3,"p"),C(4),h(),m(5,"button",20),M("click",function(){te(e);let r=D();return ne(r.regenerate())}),C(6,"Try again"),h()()}if(t&2){let e=D();_(4),oe(e.entryError())}}function uO(t,n){t&1&&(m(0,"span",24),C(1,"Cached"),h())}function fO(t,n){if(t&1){let e=pe();m(0,"div",15)(1,"div",21)(2,"span",22),C(3),h(),m(4,"button",23),M("click",function(){te(e);let r=D();return ne(r.regenerate())}),m(5,"mat-icon"),C(6,"refresh"),h()()(),V(7,uO,2,0,"span",24),m(8,"div",25),C(9),h()()}if(t&2){let e=D();_(3),oe(e.selectedDateLabel()),_(4),B(e.isFromCache()?7:-1),_(2),oe(e.entryContent())}}function Yp(t){let n=t.getFullYear(),e=String(t.getMonth()+1).padStart(2,"0"),i=String(t.getDate()).padStart(2,"0");return`${n}-${e}-${i}`}var qd=class t{diaryService=d(Yd);dialogRef=d(Ri);dialogData=d(dp,{optional:!0});activeDates=x(new Set);selectedDate=x(null);entryContent=x(null);entryLoading=x(!1);entryError=x(null);isFromCache=x(!1);datesLoading=x(!0);maxDate=Me(()=>{let n=new Date;return n.setDate(n.getDate()-1),n});selectedDateLabel=Me(()=>{let n=this.selectedDate();return n?n.toLocaleDateString(void 0,{weekday:"long",year:"numeric",month:"long",day:"numeric"}):null});dateClass=(n,e)=>e!=="month"?"":this.activeDates().has(Yp(n))?"diary-active-day":"";ngOnInit(){this.diaryService.getActiveDates().subscribe({next:n=>{this.activeDates.set(new Set(n)),this.datesLoading.set(!1)},error:()=>this.datesLoading.set(!1)})}onDateSelected(n){if(!n)return;let e=Yp(n);this.activeDates().has(e)&&(this.selectedDate.set(n),this.loadEntry(e,!1))}regenerate(){let n=this.selectedDate();n&&this.loadEntry(Yp(n),!0)}loadEntry(n,e){this.entryLoading.set(!0),this.entryError.set(null),this.entryContent.set(null);let i=this.dialogData?.provider;this.diaryService.getOrGenerateEntry(n,e,i).subscribe({next:r=>{this.entryContent.set(r.content),this.isFromCache.set(r.isFromCache),this.entryLoading.set(!1)},error:()=>{this.entryError.set("Could not generate your diary entry. Please try again."),this.entryLoading.set(!1)}})}close(){this.dialogRef.close()}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=k({type:t,selectors:[["app-musical-diary-modal"]],features:[Be([kC()])],decls:21,vars:2,consts:[[1,"diary-modal"],["mat-dialog-title","",1,"dialog-header"],["aria-hidden","true",1,"header-icon"],[1,"header-title"],["mat-icon-button","","aria-label","Close diary",1,"close-btn",3,"click"],[1,"dialog-body"],[1,"diary-layout"],[1,"calendar-pane"],[1,"calendar-hint"],[1,"calendar-loading"],[3,"selected","maxDate","dateClass"],[1,"entry-pane"],[1,"entry-empty"],[1,"entry-loading"],[1,"entry-error"],[1,"entry-content"],["diameter","32"],[3,"selectedChange","selected","maxDate","dateClass"],["aria-hidden","true"],["diameter","36"],["mat-stroked-button","",3,"click"],[1,"entry-date-row"],[1,"entry-date-label"],["mat-icon-button","","matTooltip","Regenerate this entry","aria-label","Regenerate diary entry",1,"regen-btn",3,"click"],[1,"cache-badge"],[1,"entry-text"]],template:function(e,i){e&1&&(m(0,"div",0)(1,"div",1)(2,"mat-icon",2),C(3,"auto_stories"),h(),m(4,"span",3),C(5,"Musical Diary"),h(),m(6,"button",4),M("click",function(){return i.close()}),m(7,"mat-icon"),C(8,"close"),h()()(),m(9,"mat-dialog-content",5)(10,"div",6)(11,"div",7)(12,"p",8),C(13,"Select a past day to read your diary entry."),h(),V(14,aO,2,0,"div",9)(15,sO,1,3,"mat-calendar",10),h(),m(16,"div",11),V(17,lO,5,0,"div",12)(18,cO,4,0,"div",13)(19,dO,7,1,"div",14)(20,fO,10,3,"div",15),h()()()()),e&2&&(_(14),B(i.datesLoading()?14:15),_(3),B(i.selectedDate()?i.entryLoading()?18:i.entryError()?19:i.entryContent()?20:-1:17))},dependencies:[Ft,_n,Kt,Po,Dd,Cd,Jt,Xt,zd,Ud,$o,ti,SC,As],styles:[".diary-modal[_ngcontent-%COMP%]{display:flex;flex-direction:column;max-height:90vh}.dialog-header[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;padding:16px 20px 8px;font-family:var(--reco-font);font-size:1.1rem}.header-icon[_ngcontent-%COMP%]{color:var(--reco-accent);font-size:1.3rem;width:1.3rem;height:1.3rem}.header-title[_ngcontent-%COMP%]{flex:1;font-weight:600;background:linear-gradient(90deg,var(--reco-primary),var(--reco-accent));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent}.close-btn[_ngcontent-%COMP%]{color:var(--reco-text-muted)}.close-btn[_ngcontent-%COMP%]:hover   mat-icon[_ngcontent-%COMP%]{color:var(--reco-error)}.dialog-body[_ngcontent-%COMP%]{padding:0!important;overflow:hidden}.diary-layout[_ngcontent-%COMP%]{display:flex;min-width:680px;max-width:900px;height:440px}.calendar-pane[_ngcontent-%COMP%]{flex:0 0 300px;padding:12px 16px;border-right:1px solid var(--reco-border);overflow-y:auto;display:flex;flex-direction:column;gap:8px}.calendar-hint[_ngcontent-%COMP%]{margin:0;font-family:var(--reco-font);font-size:.72rem;color:var(--reco-text-muted);font-style:italic}.calendar-loading[_ngcontent-%COMP%]{flex:1;display:flex;align-items:center;justify-content:center}[_nghost-%COMP%]     .diary-active-day .mat-calendar-body-cell-content{background-color:var(--reco-primary-dim)!important;color:var(--reco-primary)!important;font-weight:700}[_nghost-%COMP%]     .diary-active-day.mat-calendar-body-selected .mat-calendar-body-cell-content{background-color:var(--reco-primary)!important;color:#fff!important}.entry-pane[_ngcontent-%COMP%]{flex:1;padding:16px 20px;overflow-y:auto;display:flex;flex-direction:column}.entry-empty[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;color:var(--reco-text-muted);text-align:center;padding:24px}.entry-empty[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:48px;width:48px;height:48px;opacity:.3}.entry-empty[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;font-family:var(--reco-font);font-size:.88rem;font-style:italic;max-width:260px}.entry-loading[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;color:var(--reco-text-muted)}.entry-loading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;font-family:var(--reco-font);font-size:.85rem;font-style:italic}.entry-error[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;color:var(--reco-error)}.entry-error[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:36px;width:36px;height:36px}.entry-error[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;font-family:var(--reco-font);font-size:.875rem;text-align:center}.entry-content[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:10px}.entry-date-row[_ngcontent-%COMP%]{display:flex;align-items:center;gap:6px}.entry-date-label[_ngcontent-%COMP%]{flex:1;font-family:var(--reco-font);font-size:.78rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--reco-text-muted)}.regen-btn[_ngcontent-%COMP%]{color:var(--reco-text-muted);--mdc-icon-button-state-layer-size: 28px;--mdc-icon-button-icon-size: 16px}.regen-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:16px;width:16px;height:16px;transition:color .2s ease}.regen-btn[_ngcontent-%COMP%]:hover   mat-icon[_ngcontent-%COMP%]{color:var(--reco-primary)}.cache-badge[_ngcontent-%COMP%]{display:inline-block;padding:2px 8px;background:var(--reco-surface-2);border:1px solid var(--reco-border);border-radius:10px;font-family:var(--reco-font);font-size:.6rem;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:var(--reco-text-muted);align-self:flex-start}.entry-text[_ngcontent-%COMP%]{font-family:var(--reco-font);font-size:.9rem;line-height:1.75;color:var(--reco-text);white-space:pre-wrap}"]})};function mO(t,n){if(t&1){let e=pe();m(0,"div",1)(1,"button",2),M("click",function(){te(e);let r=D();return ne(r.action())}),C(2),h()()}if(t&2){let e=D();_(2),Fe(" ",e.data.action," ")}}var hO=["label"];function pO(t,n){}var gO=Math.pow(2,31)-1,Rs=class{_overlayRef;instance;containerInstance;_afterDismissed=new E;_afterOpened=new E;_onAction=new E;_durationTimeoutId;_dismissedByAction=!1;constructor(n,e){this._overlayRef=e,this.containerInstance=n,n._onExit.subscribe(()=>this._finishDismiss())}dismiss(){this._afterDismissed.closed||this.containerInstance.exit(),clearTimeout(this._durationTimeoutId)}dismissWithAction(){this._onAction.closed||(this._dismissedByAction=!0,this._onAction.next(),this._onAction.complete(),this.dismiss()),clearTimeout(this._durationTimeoutId)}closeWithAction(){this.dismissWithAction()}_dismissAfter(n){this._durationTimeoutId=setTimeout(()=>this.dismiss(),Math.min(n,gO))}_open(){this._afterOpened.closed||(this._afterOpened.next(),this._afterOpened.complete())}_finishDismiss(){this._overlayRef.dispose(),this._onAction.closed||this._onAction.complete(),this._afterDismissed.next({dismissedByAction:this._dismissedByAction}),this._afterDismissed.complete(),this._dismissedByAction=!1}afterDismissed(){return this._afterDismissed}afterOpened(){return this.containerInstance._onEnter}onAction(){return this._onAction}},TC=new b("MatSnackBarData"),Zo=class{politeness="polite";announcementMessage="";viewContainerRef;duration=0;panelClass;direction;data=null;horizontalPosition="center";verticalPosition="bottom"},_O=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=U({type:t,selectors:[["","matSnackBarLabel",""]],hostAttrs:[1,"mat-mdc-snack-bar-label","mdc-snackbar__label"]})}return t})(),bO=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=U({type:t,selectors:[["","matSnackBarActions",""]],hostAttrs:[1,"mat-mdc-snack-bar-actions","mdc-snackbar__actions"]})}return t})(),vO=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=U({type:t,selectors:[["","matSnackBarAction",""]],hostAttrs:[1,"mat-mdc-snack-bar-action","mdc-snackbar__action"]})}return t})(),yO=(()=>{class t{snackBarRef=d(Rs);data=d(TC);constructor(){}action(){this.snackBarRef.dismissWithAction()}get hasAction(){return!!this.data.action}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["simple-snack-bar"]],hostAttrs:[1,"mat-mdc-simple-snack-bar"],exportAs:["matSnackBar"],decls:3,vars:2,consts:[["matSnackBarLabel",""],["matSnackBarActions",""],["matButton","","matSnackBarAction","",3,"click"]],template:function(i,r){i&1&&(m(0,"div",0),C(1),h(),V(2,mO,3,1,"div",1)),i&2&&(_(),Fe(" ",r.data.message,`
`),_(),B(r.hasAction?2:-1))},dependencies:[_n,_O,bO,vO],styles:[`.mat-mdc-simple-snack-bar {
  display: flex;
}
.mat-mdc-simple-snack-bar .mat-mdc-snack-bar-label {
  max-height: 50vh;
  overflow: auto;
}
`],encapsulation:2,changeDetection:0})}return t})(),qp="_mat-snack-bar-enter",Zp="_mat-snack-bar-exit",DO=(()=>{class t extends ki{_ngZone=d(A);_elementRef=d(L);_changeDetectorRef=d(xe);_platform=d(de);_animationsDisabled=we();snackBarConfig=d(Zo);_document=d(H);_trackedModals=new Set;_enterFallback;_exitFallback;_injector=d(G);_announceDelay=150;_announceTimeoutId;_destroyed=!1;_portalOutlet;_onAnnounce=new E;_onExit=new E;_onEnter=new E;_animationState="void";_live;_label;_role;_liveElementId=d(Ie).getId("mat-snack-bar-container-live-");constructor(){super();let e=this.snackBarConfig;e.politeness==="assertive"&&!e.announcementMessage?this._live="assertive":e.politeness==="off"?this._live="off":this._live="polite",this._platform.FIREFOX&&(this._live==="polite"&&(this._role="status"),this._live==="assertive"&&(this._role="alert"))}attachComponentPortal(e){this._assertNotAttached();let i=this._portalOutlet.attachComponentPortal(e);return this._afterPortalAttached(),i}attachTemplatePortal(e){this._assertNotAttached();let i=this._portalOutlet.attachTemplatePortal(e);return this._afterPortalAttached(),i}attachDomPortal=e=>{this._assertNotAttached();let i=this._portalOutlet.attachDomPortal(e);return this._afterPortalAttached(),i};onAnimationEnd(e){e===Zp?this._completeExit():e===qp&&(clearTimeout(this._enterFallback),this._ngZone.run(()=>{this._onEnter.next(),this._onEnter.complete()}))}enter(){this._destroyed||(this._animationState="visible",this._changeDetectorRef.markForCheck(),this._changeDetectorRef.detectChanges(),this._screenReaderAnnounce(),this._animationsDisabled?Ye(()=>{this._ngZone.run(()=>queueMicrotask(()=>this.onAnimationEnd(qp)))},{injector:this._injector}):(clearTimeout(this._enterFallback),this._enterFallback=setTimeout(()=>{this._elementRef.nativeElement.classList.add("mat-snack-bar-fallback-visible"),this.onAnimationEnd(qp)},200)))}exit(){return this._destroyed?Pe(void 0):(this._ngZone.run(()=>{this._animationState="hidden",this._changeDetectorRef.markForCheck(),this._elementRef.nativeElement.setAttribute("mat-exit",""),clearTimeout(this._announceTimeoutId),this._animationsDisabled?Ye(()=>{this._ngZone.run(()=>queueMicrotask(()=>this.onAnimationEnd(Zp)))},{injector:this._injector}):(clearTimeout(this._exitFallback),this._exitFallback=setTimeout(()=>this.onAnimationEnd(Zp),200))}),this._onExit)}ngOnDestroy(){this._destroyed=!0,this._clearFromModals(),this._completeExit()}_completeExit(){clearTimeout(this._exitFallback),queueMicrotask(()=>{this._onExit.next(),this._onExit.complete()})}_afterPortalAttached(){let e=this._elementRef.nativeElement,i=this.snackBarConfig.panelClass;i&&(Array.isArray(i)?i.forEach(a=>e.classList.add(a)):e.classList.add(i)),this._exposeToModals();let r=this._label.nativeElement,o="mdc-snackbar__label";r.classList.toggle(o,!r.querySelector(`.${o}`))}_exposeToModals(){let e=this._liveElementId,i=this._document.querySelectorAll('body > .cdk-overlay-container [aria-modal="true"]');for(let r=0;r<i.length;r++){let o=i[r],a=o.getAttribute("aria-owns");this._trackedModals.add(o),a?a.indexOf(e)===-1&&o.setAttribute("aria-owns",a+" "+e):o.setAttribute("aria-owns",e)}}_clearFromModals(){this._trackedModals.forEach(e=>{let i=e.getAttribute("aria-owns");if(i){let r=i.replace(this._liveElementId,"").trim();r.length>0?e.setAttribute("aria-owns",r):e.removeAttribute("aria-owns")}}),this._trackedModals.clear()}_assertNotAttached(){this._portalOutlet.hasAttached()}_screenReaderAnnounce(){this._announceTimeoutId||this._ngZone.runOutsideAngular(()=>{this._announceTimeoutId=setTimeout(()=>{if(this._destroyed)return;let e=this._elementRef.nativeElement,i=e.querySelector("[aria-hidden]"),r=e.querySelector("[aria-live]");if(i&&r){let o=null;this._platform.isBrowser&&document.activeElement instanceof HTMLElement&&i.contains(document.activeElement)&&(o=document.activeElement),i.removeAttribute("aria-hidden"),r.appendChild(i),o?.focus(),this._onAnnounce.next(),this._onAnnounce.complete()}},this._announceDelay)})}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["mat-snack-bar-container"]],viewQuery:function(i,r){if(i&1&&ve(vn,7)(hO,7),i&2){let o;K(o=Q())&&(r._portalOutlet=o.first),K(o=Q())&&(r._label=o.first)}},hostAttrs:[1,"mdc-snackbar","mat-mdc-snack-bar-container"],hostVars:6,hostBindings:function(i,r){i&1&&M("animationend",function(a){return r.onAnimationEnd(a.animationName)})("animationcancel",function(a){return r.onAnimationEnd(a.animationName)}),i&2&&I("mat-snack-bar-container-enter",r._animationState==="visible")("mat-snack-bar-container-exit",r._animationState==="hidden")("mat-snack-bar-container-animations-enabled",!r._animationsDisabled)},features:[_e],decls:6,vars:3,consts:[["label",""],[1,"mdc-snackbar__surface","mat-mdc-snackbar-surface"],[1,"mat-mdc-snack-bar-label"],["aria-hidden","true"],["cdkPortalOutlet",""]],template:function(i,r){i&1&&(m(0,"div",1)(1,"div",2,0)(3,"div",3),it(4,pO,0,0,"ng-template",4),h(),j(5,"div"),h()()),i&2&&(_(5),P("aria-live",r._live)("role",r._role)("id",r._liveElementId))},dependencies:[vn],styles:[`@keyframes _mat-snack-bar-enter {
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
`],encapsulation:2})}return t})(),CO=new b("mat-snack-bar-default-options",{providedIn:"root",factory:()=>new Zo}),Zd=(()=>{class t{_live=d(Hh);_injector=d(G);_breakpointObserver=d(cs);_parentSnackBar=d(t,{optional:!0,skipSelf:!0});_defaultConfig=d(CO);_animationsDisabled=we();_snackBarRefAtThisLevel=null;simpleSnackBarComponent=yO;snackBarContainerComponent=DO;handsetCssClass="mat-mdc-snack-bar-handset";get _openedSnackBarRef(){let e=this._parentSnackBar;return e?e._openedSnackBarRef:this._snackBarRefAtThisLevel}set _openedSnackBarRef(e){this._parentSnackBar?this._parentSnackBar._openedSnackBarRef=e:this._snackBarRefAtThisLevel=e}constructor(){}openFromComponent(e,i){return this._attach(e,i)}openFromTemplate(e,i){return this._attach(e,i)}open(e,i="",r){let o=w(w({},this._defaultConfig),r);return o.data={message:e,action:i},o.announcementMessage===e&&(o.announcementMessage=void 0),this.openFromComponent(this.simpleSnackBarComponent,o)}dismiss(){this._openedSnackBarRef&&this._openedSnackBarRef.dismiss()}ngOnDestroy(){this._snackBarRefAtThisLevel&&this._snackBarRefAtThisLevel.dismiss()}_attachSnackBarContainer(e,i){let r=i&&i.viewContainerRef&&i.viewContainerRef.injector,o=G.create({parent:r||this._injector,providers:[{provide:Zo,useValue:i}]}),a=new Pt(this.snackBarContainerComponent,i.viewContainerRef,o),s=e.attach(a);return s.instance.snackBarConfig=i,s.instance}_attach(e,i){let r=w(w(w({},new Zo),this._defaultConfig),i),o=this._createOverlay(r),a=this._attachSnackBarContainer(o,r),s=new Rs(a,o);if(e instanceof lt){let l=new bn(e,null,{$implicit:r.data,snackBarRef:s});s.instance=a.attachTemplatePortal(l)}else{let l=this._createInjector(r,s),c=new Pt(e,void 0,l),u=a.attachComponentPortal(c);s.instance=u.instance}return this._breakpointObserver.observe(CD.HandsetPortrait).pipe(je(o.detachments())).subscribe(l=>{o.overlayElement.classList.toggle(this.handsetCssClass,l.matches)}),r.announcementMessage&&a._onAnnounce.subscribe(()=>{this._live.announce(r.announcementMessage,r.politeness)}),this._animateSnackBar(s,r),this._openedSnackBarRef=s,this._openedSnackBarRef}_animateSnackBar(e,i){e.afterDismissed().subscribe(()=>{this._openedSnackBarRef==e&&(this._openedSnackBarRef=null),i.announcementMessage&&this._live.clear()}),i.duration&&i.duration>0&&e.afterOpened().subscribe(()=>e._dismissAfter(i.duration)),this._openedSnackBarRef?(this._openedSnackBarRef.afterDismissed().subscribe(()=>{e.containerInstance.enter()}),this._openedSnackBarRef.dismiss()):e.containerInstance.enter()}_createOverlay(e){let i=new yn;i.direction=e.direction;let r=Jn(this._injector),o=e.direction==="rtl",a=e.horizontalPosition==="left"||e.horizontalPosition==="start"&&!o||e.horizontalPosition==="end"&&o,s=!a&&e.horizontalPosition!=="center";return a?r.left("0"):s?r.right("0"):r.centerHorizontally(),e.verticalPosition==="top"?r.top("0"):r.bottom("0"),i.positionStrategy=r,i.disableAnimations=this._animationsDisabled,Dn(this._injector,i)}_createInjector(e,i){let r=e&&e.viewContainerRef&&e.viewContainerRef.injector;return G.create({parent:r||this._injector,providers:[{provide:Rs,useValue:i},{provide:TC,useValue:e.data}]})}static \u0275fac=function(i){return new(i||t)};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Ko=class t{constructor(n){this.http=n}addToPlaylist(n){return this.http.post("/api/clementine/add",{filePaths:n})}static \u0275fac=function(e){return new(e||t)(R(ut))};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})};var Fi=class t{constructor(n){this.http=n}logTrackEvent(n,e,i,r,o){let a={eventType:n,artist:e,album:i,title:r,durationSeconds:o??null,timestamp:new Date().toISOString()};return this.http.post("/api/session/events",a)}getMemoryStatus(){return this.http.get("/api/session/memory")}bustMemory(){return this.http.delete("/api/session/memory")}getHistory(){return this.http.get("/api/session/history")}getEnrichedSuggestions(n){return this.http.get(`/api/session/reply/${n}/suggestions`)}setActiveReply(n){return this.http.post("/api/session/active-reply",{replyId:n})}static \u0275fac=function(e){return new(e||t)(R(ut))};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})};function xO(t,n){if(t&1){let e=pe();m(0,"img",14),M("error",function(){te(e);let r=D();return ne(r.onArtError())}),h()}if(t&2){let e=D();T("src",e.suggestion().albumArtUrl,Ua)("alt",e.suggestion().album||e.suggestion().title)}}function wO(t,n){t&1&&(m(0,"div",3)(1,"mat-icon",15),C(2,"album"),h()())}function EO(t,n){if(t&1){let e=pe();m(0,"button",16),M("click",function(r){return te(e),D().copyToClipboard(),ne(r.stopPropagation())}),m(1,"mat-icon"),C(2,"content_copy"),h()()}if(t&2){let e=D();P("aria-label","Copy "+e.suggestion().artist+" \u2013 "+e.suggestion().title+" to clipboard")}}function MO(t,n){if(t&1){let e=pe();m(0,"a",17),M("click",function(r){return te(e),D().onYouTubeClick(),ne(r.stopPropagation())}),j(1,"img",18),m(2,"span"),C(3,"YouTube"),h()()}if(t&2){let e=D();T("href",e.youtubeUrl(),Ua),P("aria-label","Search "+e.suggestion().artist+" \u2013 "+e.suggestion().title+" on YouTube")}}function IO(t,n){if(t&1){let e=pe();m(0,"button",19),M("click",function(r){return te(e),D().addToClementine(),ne(r.stopPropagation())}),j(1,"img",20),h()}if(t&2){let e=D();T("disabled",e.addingToPlaylist()),P("aria-label","Add "+e.suggestion().artist+" \u2013 "+e.suggestion().title+" to Clementine playlist")}}var Kd=class t{constructor(n,e,i){this.snackBar=n;this.playlistService=e;this.sessionService=i}suggestion=Yt.required();clementineUnavailable=Yt(!1);addingToPlaylist=x(!1);artFailed=x(!1);hasArt=Me(()=>!!this.suggestion().albumArtUrl&&!this.artFailed());youtubeUrl=Me(()=>`https://www.youtube.com/results?search_query=${encodeURIComponent(`${this.suggestion().artist} ${this.suggestion().title}`)}`);lyricsUrl=Me(()=>{let n=this.suggestion(),e=i=>i.toLowerCase().replace(/&/g,"and").replace(/\s+/g,"-").replace(/[^a-z0-9-]/g,"");return`https://genius.com/${e(n.artist)}-${e(n.title)}-lyrics`});onArtError(){this.artFailed.set(!0)}copyToClipboard(){let n=this.suggestion(),e=`${n.artist} \u2013 ${n.title}`;navigator.clipboard.writeText(e).then(()=>this.snackBar.open(`Copied: ${e}`,void 0,{duration:2e3}),()=>this.snackBar.open("Could not copy to clipboard","Dismiss",{duration:4e3}))}onYouTubeClick(){let n=this.suggestion();this.sessionService.logTrackEvent("track-youtube",n.artist,n.album??null,n.title,n.durationSeconds??null).subscribe({error:()=>{}})}addToClementine(){let n=this.suggestion();if(!n.filePath||this.addingToPlaylist())return;this.addingToPlaylist.set(!0);let e=Date.now(),i=()=>{let r=Date.now()-e;setTimeout(()=>this.addingToPlaylist.set(!1),Math.max(0,1e3-r))};this.playlistService.addToPlaylist([n.filePath]).subscribe({next:()=>{this.snackBar.open(`Added to Clementine: ${n.artist} \u2013 ${n.title}`,void 0,{duration:2e3}),this.sessionService.logTrackEvent("track-added",n.artist,n.album??null,n.title,n.durationSeconds??null).subscribe({error:()=>{}}),i()},error:()=>{this.snackBar.open("Could not add to Clementine playlist","Dismiss",{duration:4e3}),i()}})}static \u0275fac=function(e){return new(e||t)(ee(Zd),ee(Ko),ee(Fi))};static \u0275cmp=k({type:t,selectors:[["app-suggestion-card"]],inputs:{suggestion:[1,"suggestion"],clementineUnavailable:[1,"clementineUnavailable"]},decls:18,vars:15,consts:[[1,"tile"],[1,"tile-art"],[1,"art-img",3,"src","alt"],[1,"art-placeholder"],["mat-icon-button","",1,"art-overlay-btn"],[1,"tile-info"],[1,"tile-title"],[1,"tile-artist"],[1,"tile-album"],[1,"tile-footer"],["target","_blank","rel","noopener noreferrer",1,"footer-action","footer-action--link",3,"href"],["mat-icon-button","",1,"footer-action","footer-action--btn",3,"disabled"],["target","_blank","rel","noopener noreferrer",1,"footer-action","footer-action--lyrics",3,"click","href"],[1,"lyrics-icon"],[1,"art-img",3,"error","src","alt"],["aria-hidden","true"],["mat-icon-button","",1,"art-overlay-btn",3,"click"],["target","_blank","rel","noopener noreferrer",1,"footer-action","footer-action--link",3,"click","href"],["src","/icons/youtube.svg","alt","","aria-hidden","true",1,"footer-icon"],["mat-icon-button","",1,"footer-action","footer-action--btn",3,"click","disabled"],["src","/icons/clementine_addmore.png","alt","","aria-hidden","true",1,"footer-icon"]],template:function(e,i){e&1&&(m(0,"div",0)(1,"div",1),V(2,xO,1,2,"img",2)(3,wO,3,0,"div",3),V(4,EO,3,1,"button",4),h(),m(5,"div",5)(6,"span",6),C(7),h(),m(8,"span",7),C(9),h(),m(10,"span",8),C(11),h()(),m(12,"div",9),V(13,MO,4,2,"a",10),V(14,IO,2,2,"button",11),m(15,"a",12),M("click",function(o){return o.stopPropagation()}),m(16,"mat-icon",13),C(17,"lyrics"),h()()()()),e&2&&(I("tile--local",i.suggestion().inLocalLibrary)("tile--discovery",!i.suggestion().inLocalLibrary&&!i.clementineUnavailable()),_(2),B(i.hasArt()?2:3),_(2),B(i.suggestion().inLocalLibrary?4:-1),_(3),oe(i.suggestion().title),_(2),oe(i.suggestion().artist),_(),dt("visibility",i.suggestion().album?"visible":"hidden"),_(),Fe(" ",i.suggestion().album||"\xA0"," "),_(2),B(i.suggestion().inLocalLibrary?-1:13),_(),B(i.suggestion().inLocalLibrary&&!i.clementineUnavailable()?14:-1),_(),T("href",i.lyricsUrl(),Ua),P("aria-label","Find lyrics for "+i.suggestion().title+" by "+i.suggestion().artist+" on Genius"))},dependencies:[Jt,Xt,Ft,Kt],styles:[".tile[_ngcontent-%COMP%]{width:100%;height:100%;display:flex;flex-direction:column;border-radius:10px;overflow:hidden;background:var(--reco-surface-1);border:2px solid var(--reco-accent);transition:transform .18s ease,box-shadow .18s ease;cursor:default}.tile--local[_ngcontent-%COMP%]{box-shadow:0 0 0 0 var(--reco-accent-dim)}.tile--discovery[_ngcontent-%COMP%]{border-color:#c8006b47;box-shadow:0 0 0 0 var(--reco-accent-dim)}.tile--discovery[_ngcontent-%COMP%]   .tile-art[_ngcontent-%COMP%], .tile--discovery[_ngcontent-%COMP%]   .tile-info[_ngcontent-%COMP%]{opacity:.22}.tile[_ngcontent-%COMP%]:hover{transform:translateY(-3px);box-shadow:0 6px 20px var(--reco-accent-dim)}.tile[_ngcontent-%COMP%]:hover   .art-overlay-btn[_ngcontent-%COMP%]{opacity:1}.tile-art[_ngcontent-%COMP%]{position:relative;width:100%;aspect-ratio:1;overflow:hidden;background:var(--reco-surface-2);flex-shrink:0}.art-img[_ngcontent-%COMP%]{width:100%;height:100%;object-fit:cover;display:block}.art-placeholder[_ngcontent-%COMP%]{width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:var(--reco-text-disabled)}.art-placeholder[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:48px;width:48px;height:48px}.art-overlay-btn[_ngcontent-%COMP%]{position:absolute;bottom:4px;left:4px;width:28px;height:28px;border-radius:6px;background:#0000008c;color:var(--reco-accent);opacity:0;transition:opacity .15s ease;--mdc-icon-button-icon-size: 14px;--mdc-icon-button-state-layer-size: 28px}.art-overlay-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:14px;width:14px;height:14px}.tile-info[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:column;gap:2px;padding:8px 10px 4px;min-height:0}.tile-title[_ngcontent-%COMP%]{font-family:var(--reco-font);font-size:.8rem;font-weight:600;color:var(--reco-accent);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.tile-artist[_ngcontent-%COMP%]{font-family:var(--reco-font);font-size:.72rem;color:var(--reco-text-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.tile-album[_ngcontent-%COMP%]{font-family:var(--reco-font);font-size:.68rem;color:var(--reco-text-disabled);font-style:italic;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.tile-footer[_ngcontent-%COMP%]{display:flex;align-items:center;padding:2px 6px 6px;min-height:32px;gap:4px}.footer-action[_ngcontent-%COMP%]{display:flex;align-items:center;gap:4px;font-family:var(--reco-font);font-size:.68rem;font-weight:500;opacity:.6;transition:opacity .15s ease;text-decoration:none}.footer-action[_ngcontent-%COMP%]:hover{opacity:1}.footer-action--link[_ngcontent-%COMP%]{color:var(--reco-text-muted)}.footer-action--btn[_ngcontent-%COMP%]{color:var(--reco-accent);--mdc-icon-button-icon-size: 16px;--mdc-icon-button-state-layer-size: 28px}.footer-action--btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:16px;width:16px;height:16px}.footer-action--btn[disabled][_ngcontent-%COMP%]{opacity:.25}.footer-icon[_ngcontent-%COMP%]{width:16px;height:16px;flex-shrink:0}.footer-action--lyrics[_ngcontent-%COMP%]{margin-left:auto;color:var(--reco-accent);display:flex;align-items:center;opacity:.6;transition:opacity .15s ease}.footer-action--lyrics[_ngcontent-%COMP%]:hover{opacity:1}.lyrics-icon[_ngcontent-%COMP%]{font-size:16px;width:16px;height:16px}"]})};var SO=(t,n)=>n.title+n.artist;function kO(t,n){t&1&&(m(0,"div",4),j(1,"span")(2,"span")(3,"span")(4,"span"),h())}function TO(t,n){if(t&1){let e=pe();m(0,"button",9),M("click",function(){te(e);let r=D();return ne(r.addAllToClementine())}),j(1,"img",10),C(2),h()}if(t&2){let e=D();T("disabled",e.addingAll()),P("aria-label","Add all "+e.localFilePaths().length+" local tracks to Clementine playlist"),_(2),Fe(" Add ",e.localFilePaths().length," to Clementine ")}}function AO(t,n){if(t&1&&(m(0,"div",6)(1,"span"),C(2),h()()),t&2){let e=D();_(2),oe(e.loadingLabel())}}function RO(t,n){t&1&&(m(0,"div",7)(1,"mat-icon",2),C(2,"warning_amber"),h(),m(3,"span"),C(4,"Suggestions unavailable right now."),h()())}function OO(t,n){if(t&1&&(m(0,"div",8)(1,"mat-icon",2),C(2,"search_off"),h(),m(3,"span"),C(4),h()()),t&2){let e=D();_(4),oe(e.message())}}function NO(t,n){if(t&1&&(m(0,"div",12),j(1,"app-suggestion-card",14),h()),t&2){let e=n.$implicit,i=D(2);_(),T("suggestion",e)("clementineUnavailable",i.clementineUnavailable())}}function FO(t,n){if(t&1&&(m(0,"p",13),C(1),h()),t&2){let e=D(2);_(),oe(e.message())}}function PO(t,n){if(t&1&&(m(0,"div",11),Ct(1,NO,2,2,"div",12,SO),h(),V(3,FO,2,1,"p",13)),t&2){let e=D();_(),xt(e.suggestions()),_(2),B(e.message()?3:-1)}}var Qd=class t{constructor(n,e,i){this.playlistService=n;this.snackBar=e;this.sessionService=i}suggestions=Yt([]);loading=Yt(!1);error=Yt(!1);message=Yt(null);loadingLabel=Yt("Searching your library\u2026");clementineUnavailable=Yt(!1);addingAll=x(!1);localTracks=Me(()=>this.suggestions().filter(n=>n.inLocalLibrary&&n.filePath));localFilePaths=Me(()=>this.localTracks().map(n=>n.filePath));addAllToClementine(){let n=this.localTracks(),e=this.localFilePaths();if(e.length===0||this.addingAll())return;this.addingAll.set(!0);let i=Date.now(),r=()=>{let o=Date.now()-i;setTimeout(()=>this.addingAll.set(!1),Math.max(0,1e3-o))};this.playlistService.addToPlaylist(e).subscribe({next:()=>{this.snackBar.open(`Added ${e.length} track(s) to Clementine`,void 0,{duration:2500});for(let o of n)this.sessionService.logTrackEvent("track-added",o.artist,o.album??null,o.title,o.durationSeconds??null).subscribe({error:()=>{}});r()},error:()=>{this.snackBar.open("Could not add tracks to Clementine","Dismiss",{duration:4e3}),r()}})}static \u0275fac=function(e){return new(e||t)(ee(Ko),ee(Zd),ee(Fi))};static \u0275cmp=k({type:t,selectors:[["app-suggestions-panel"]],inputs:{suggestions:[1,"suggestions"],loading:[1,"loading"],error:[1,"error"],message:[1,"message"],loadingLabel:[1,"loadingLabel"],clementineUnavailable:[1,"clementineUnavailable"]},decls:12,vars:3,consts:[["aria-label","Track suggestions",1,"suggestions-panel"],[1,"panel-header"],["aria-hidden","true"],[1,"panel-title"],["role","status","aria-label","Loading suggestions",1,"music-bars"],["mat-stroked-button","",1,"add-all-btn",3,"disabled"],["aria-live","polite",1,"panel-state","panel-state--loading"],["role","alert",1,"panel-state","panel-state--error"],[1,"panel-state","panel-state--empty"],["mat-stroked-button","",1,"add-all-btn",3,"click","disabled"],["src","/icons/clementine_addmore.png","alt","","aria-hidden","true",1,"add-all-icon"],["role","list",1,"track-list"],["role","listitem"],[1,"panel-note"],[3,"suggestion","clementineUnavailable"]],template:function(e,i){e&1&&(m(0,"section",0)(1,"div",1)(2,"mat-icon",2),C(3,"queue_music"),h(),m(4,"span",3),C(5,"What I hear in your words"),h(),V(6,kO,5,0,"div",4),V(7,TO,3,3,"button",5),h(),V(8,AO,3,1,"div",6)(9,RO,5,0,"div",7)(10,OO,5,1,"div",8)(11,PO,4,1),h()),e&2&&(_(6),B(i.loading()?6:-1),_(),B(!i.clementineUnavailable()&&i.localFilePaths().length>0?7:-1),_(),B(i.loading()&&i.suggestions().length===0?8:i.error()?9:i.suggestions().length===0&&i.message()?10:i.suggestions().length>0?11:-1))},dependencies:[Jt,Xt,Ft,_n,Kd],styles:["[_nghost-%COMP%]{display:block;background:var(--reco-surface-0);flex-shrink:0}.suggestions-panel[_ngcontent-%COMP%]{padding:12px 16px 14px}.panel-header[_ngcontent-%COMP%]{display:flex;align-items:center;gap:6px;margin-bottom:12px;color:var(--reco-text);font-family:var(--reco-font);font-size:.84rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase}.panel-title[_ngcontent-%COMP%]{flex:1;background:linear-gradient(90deg,var(--reco-primary),var(--reco-accent));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent}.music-bars[_ngcontent-%COMP%]{display:inline-flex;align-items:flex-end;gap:2px;height:14px;margin-left:4px}.music-bars[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{display:block;width:3px;background:var(--reco-accent);border-radius:1px;animation:_ngcontent-%COMP%_bar-dance .9s ease-in-out infinite}.music-bars[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(1){animation-delay:0s}.music-bars[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(2){animation-delay:.2s}.music-bars[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(3){animation-delay:.4s}.music-bars[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(4){animation-delay:.6s}@keyframes _ngcontent-%COMP%_bar-dance{0%,to{height:3px}50%{height:14px}}.add-all-btn[_ngcontent-%COMP%]{--mat-button-outlined-label-text-color: var(--reco-accent);--mat-button-outlined-outline-color: var(--reco-accent);font-family:var(--reco-font);font-size:.72rem;font-weight:500;height:28px;line-height:28px;padding:0 10px;color:var(--reco-accent);border-color:var(--reco-accent)!important}.add-all-btn[_ngcontent-%COMP%]   .add-all-icon[_ngcontent-%COMP%]{width:15px;height:15px;margin-right:4px;flex-shrink:0;vertical-align:middle}.add-all-btn[disabled][_ngcontent-%COMP%]{opacity:.4}.panel-state[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;padding:10px 4px;font-family:var(--reco-font);font-size:.875rem;color:var(--reco-text-muted)}.panel-state--error[_ngcontent-%COMP%]{color:var(--reco-error)}.panel-state--loading[_ngcontent-%COMP%]{font-style:italic;color:var(--reco-primary)}.track-list[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px}.panel-note[_ngcontent-%COMP%]{margin:10px 4px 0;font-family:var(--reco-font);font-size:.72rem;font-style:italic;color:var(--reco-text-muted)}"]})};var LO=["mat-menu-item",""],VO=[[["mat-icon"],["","matMenuItemIcon",""]],"*"],BO=["mat-icon, [matMenuItemIcon]","*"];function jO(t,n){t&1&&(yt(),m(0,"svg",2),j(1,"polygon",3),h())}var HO=["*"];function UO(t,n){if(t&1){let e=pe();Ae(0,"div",0),yi("click",function(){te(e);let r=D();return ne(r.closed.emit("click"))})("animationstart",function(r){te(e);let o=D();return ne(o._onAnimationStart(r.animationName))})("animationend",function(r){te(e);let o=D();return ne(o._onAnimationDone(r.animationName))})("animationcancel",function(r){te(e);let o=D();return ne(o._onAnimationDone(r.animationName))}),Ae(1,"div",1),ce(2),Ve()()}if(t&2){let e=D();rt(e._classList),I("mat-menu-panel-animations-disabled",e._animationsDisabled)("mat-menu-panel-exit-animation",e._panelAnimationState==="void")("mat-menu-panel-animating",e._isAnimating()),et("id",e.panelId),P("aria-label",e.ariaLabel||null)("aria-labelledby",e.ariaLabelledby||null)("aria-describedby",e.ariaDescribedby||null)}}var Xp=new b("MAT_MENU_PANEL"),Os=(()=>{class t{_elementRef=d(L);_document=d(H);_focusMonitor=d(Nt);_parentMenu=d(Xp,{optional:!0});_changeDetectorRef=d(xe);role="menuitem";disabled=!1;disableRipple=!1;_hovered=new E;_focused=new E;_highlighted=!1;_triggersSubmenu=!1;constructor(){d(Re).load(An),this._parentMenu?.addItem?.(this)}focus(e,i){this._focusMonitor&&e?this._focusMonitor.focusVia(this._getHostElement(),e,i):this._getHostElement().focus(i),this._focused.next(this)}ngAfterViewInit(){this._focusMonitor&&this._focusMonitor.monitor(this._elementRef,!1)}ngOnDestroy(){this._focusMonitor&&this._focusMonitor.stopMonitoring(this._elementRef),this._parentMenu&&this._parentMenu.removeItem&&this._parentMenu.removeItem(this),this._hovered.complete(),this._focused.complete()}_getTabIndex(){return this.disabled?"-1":"0"}_getHostElement(){return this._elementRef.nativeElement}_checkDisabled(e){this.disabled&&(e.preventDefault(),e.stopPropagation())}_handleMouseEnter(){this._hovered.next(this)}getLabel(){let e=this._elementRef.nativeElement.cloneNode(!0),i=e.querySelectorAll("mat-icon, .material-icons");for(let r=0;r<i.length;r++)i[r].remove();return e.textContent?.trim()||""}_setHighlighted(e){this._highlighted=e,this._changeDetectorRef.markForCheck()}_setTriggersSubmenu(e){this._triggersSubmenu=e,this._changeDetectorRef.markForCheck()}_hasFocus(){return this._document&&this._document.activeElement===this._getHostElement()}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["","mat-menu-item",""]],hostAttrs:[1,"mat-mdc-menu-item","mat-focus-indicator"],hostVars:8,hostBindings:function(i,r){i&1&&M("click",function(a){return r._checkDisabled(a)})("mouseenter",function(){return r._handleMouseEnter()}),i&2&&(P("role",r.role)("tabindex",r._getTabIndex())("aria-disabled",r.disabled)("disabled",r.disabled||null),I("mat-mdc-menu-item-highlighted",r._highlighted)("mat-mdc-menu-item-submenu-trigger",r._triggersSubmenu))},inputs:{role:"role",disabled:[2,"disabled","disabled",ie],disableRipple:[2,"disableRipple","disableRipple",ie]},exportAs:["matMenuItem"],attrs:LO,ngContentSelectors:BO,decls:5,vars:3,consts:[[1,"mat-mdc-menu-item-text"],["matRipple","",1,"mat-mdc-menu-ripple",3,"matRippleDisabled","matRippleTrigger"],["viewBox","0 0 5 10","focusable","false","aria-hidden","true",1,"mat-mdc-menu-submenu-icon"],["points","0,0 5,5 0,10"]],template:function(i,r){i&1&&(Ne(VO),ce(0),m(1,"span",0),ce(2,1),h(),j(3,"div",1),V(4,jO,2,0,":svg:svg",2)),i&2&&(_(3),T("matRippleDisabled",r.disableRipple||r.disabled)("matRippleTrigger",r._getHostElement()),_(),B(r._triggersSubmenu?4:-1))},dependencies:[Oo],encapsulation:2,changeDetection:0})}return t})();var zO=new b("MatMenuContent");var $O=new b("mat-menu-default-options",{providedIn:"root",factory:()=>({overlapTrigger:!1,xPosition:"after",yPosition:"below",backdropClass:"cdk-overlay-transparent-backdrop"})}),Qp="_mat-menu-enter",Xd="_mat-menu-exit",Xo=(()=>{class t{_elementRef=d(L);_changeDetectorRef=d(xe);_injector=d(G);_keyManager;_xPosition;_yPosition;_firstItemFocusRef;_exitFallbackTimeout;_animationsDisabled=we();_allItems;_directDescendantItems=new Un;_classList={};_panelAnimationState="void";_animationDone=new E;_isAnimating=x(!1);parentMenu;direction;overlayPanelClass;backdropClass;ariaLabel;ariaLabelledby;ariaDescribedby;get xPosition(){return this._xPosition}set xPosition(e){this._xPosition=e,this.setPositionClasses()}get yPosition(){return this._yPosition}set yPosition(e){this._yPosition=e,this.setPositionClasses()}templateRef;items;lazyContent;overlapTrigger=!1;hasBackdrop;set panelClass(e){let i=this._previousPanelClass,r=w({},this._classList);i&&i.length&&i.split(" ").forEach(o=>{r[o]=!1}),this._previousPanelClass=e,e&&e.length&&(e.split(" ").forEach(o=>{r[o]=!0}),this._elementRef.nativeElement.className=""),this._classList=r}_previousPanelClass;get classList(){return this.panelClass}set classList(e){this.panelClass=e}closed=new F;close=this.closed;panelId=d(Ie).getId("mat-menu-panel-");constructor(){let e=d($O);this.overlayPanelClass=e.overlayPanelClass||"",this._xPosition=e.xPosition,this._yPosition=e.yPosition,this.backdropClass=e.backdropClass,this.overlapTrigger=e.overlapTrigger,this.hasBackdrop=e.hasBackdrop}ngOnInit(){this.setPositionClasses()}ngAfterContentInit(){this._updateDirectDescendants(),this._keyManager=new ds(this._directDescendantItems).withWrap().withTypeAhead().withHomeAndEnd(),this._keyManager.tabOut.subscribe(()=>this.closed.emit("tab")),this._directDescendantItems.changes.pipe(nt(this._directDescendantItems),qi(e=>Bt(...e.map(i=>i._focused)))).subscribe(e=>this._keyManager.updateActiveItem(e)),this._directDescendantItems.changes.subscribe(e=>{let i=this._keyManager;if(this._panelAnimationState==="enter"&&i.activeItem?._hasFocus()){let r=e.toArray(),o=Math.max(0,Math.min(r.length-1,i.activeItemIndex||0));r[o]&&!r[o].disabled?i.setActiveItem(o):i.setNextItemActive()}})}ngOnDestroy(){this._keyManager?.destroy(),this._directDescendantItems.destroy(),this.closed.complete(),this._firstItemFocusRef?.destroy(),clearTimeout(this._exitFallbackTimeout)}_hovered(){return this._directDescendantItems.changes.pipe(nt(this._directDescendantItems),qi(i=>Bt(...i.map(r=>r._hovered))))}addItem(e){}removeItem(e){}_handleKeydown(e){let i=e.keyCode,r=this._keyManager;switch(i){case 27:Et(e)||(e.preventDefault(),this.closed.emit("keydown"));break;case 37:this.parentMenu&&this.direction==="ltr"&&this.closed.emit("keydown");break;case 39:this.parentMenu&&this.direction==="rtl"&&this.closed.emit("keydown");break;default:(i===38||i===40)&&r.setFocusOrigin("keyboard"),r.onKeydown(e);return}}focusFirstItem(e="program"){this._firstItemFocusRef?.destroy(),this._firstItemFocusRef=Ye(()=>{let i=this._resolvePanel();if(!i||!i.contains(document.activeElement)){let r=this._keyManager;r.setFocusOrigin(e).setFirstItemActive(),!r.activeItem&&i&&i.focus()}},{injector:this._injector})}resetActiveItem(){this._keyManager.setActiveItem(-1)}setElevation(e){}setPositionClasses(e=this.xPosition,i=this.yPosition){this._classList=ae(w({},this._classList),{"mat-menu-before":e==="before","mat-menu-after":e==="after","mat-menu-above":i==="above","mat-menu-below":i==="below"}),this._changeDetectorRef.markForCheck()}_onAnimationDone(e){let i=e===Xd;(i||e===Qp)&&(i&&(clearTimeout(this._exitFallbackTimeout),this._exitFallbackTimeout=void 0),this._animationDone.next(i?"void":"enter"),this._isAnimating.set(!1))}_onAnimationStart(e){(e===Qp||e===Xd)&&this._isAnimating.set(!0)}_setIsOpen(e){if(this._panelAnimationState=e?"enter":"void",e){if(this._keyManager.activeItemIndex===0){let i=this._resolvePanel();i&&(i.scrollTop=0)}}else this._animationsDisabled||(this._exitFallbackTimeout=setTimeout(()=>this._onAnimationDone(Xd),200));this._animationsDisabled&&setTimeout(()=>{this._onAnimationDone(e?Qp:Xd)}),this._changeDetectorRef.markForCheck()}_updateDirectDescendants(){this._allItems.changes.pipe(nt(this._allItems)).subscribe(e=>{this._directDescendantItems.reset(e.filter(i=>i._parentMenu===this)),this._directDescendantItems.notifyOnChanges()})}_resolvePanel(){let e=null;return this._directDescendantItems.length&&(e=this._directDescendantItems.first._getHostElement().closest('[role="menu"]')),e}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["mat-menu"]],contentQueries:function(i,r,o){if(i&1&&kn(o,zO,5)(o,Os,5)(o,Os,4),i&2){let a;K(a=Q())&&(r.lazyContent=a.first),K(a=Q())&&(r._allItems=a),K(a=Q())&&(r.items=a)}},viewQuery:function(i,r){if(i&1&&ve(lt,5),i&2){let o;K(o=Q())&&(r.templateRef=o.first)}},hostVars:3,hostBindings:function(i,r){i&2&&P("aria-label",null)("aria-labelledby",null)("aria-describedby",null)},inputs:{backdropClass:"backdropClass",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[0,"aria-describedby","ariaDescribedby"],xPosition:"xPosition",yPosition:"yPosition",overlapTrigger:[2,"overlapTrigger","overlapTrigger",ie],hasBackdrop:[2,"hasBackdrop","hasBackdrop",e=>e==null?null:ie(e)],panelClass:[0,"class","panelClass"],classList:"classList"},outputs:{closed:"closed",close:"close"},exportAs:["matMenu"],features:[Be([{provide:Xp,useExisting:t}])],ngContentSelectors:HO,decls:1,vars:0,consts:[["tabindex","-1","role","menu",1,"mat-mdc-menu-panel",3,"click","animationstart","animationend","animationcancel","id"],[1,"mat-mdc-menu-content"]],template:function(i,r){i&1&&(Ne(),Ya(0,UO,3,12,"ng-template"))},styles:[`mat-menu {
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
`],encapsulation:2,changeDetection:0})}return t})(),GO=new b("mat-menu-scroll-strategy",{providedIn:"root",factory:()=>{let t=d(G);return()=>Or(t)}});var Qo=new WeakMap,WO=(()=>{class t{_canHaveBackdrop;_element=d(L);_viewContainerRef=d(_t);_menuItemInstance=d(Os,{optional:!0,self:!0});_dir=d(qe,{optional:!0});_focusMonitor=d(Nt);_ngZone=d(A);_injector=d(G);_scrollStrategy=d(GO);_changeDetectorRef=d(xe);_animationsDisabled=we();_portal;_overlayRef=null;_menuOpen=!1;_closingActionsSubscription=ue.EMPTY;_menuCloseSubscription=ue.EMPTY;_pendingRemoval;_parentMaterialMenu;_parentInnerPadding;_openedBy=void 0;get _menu(){return this._menuInternal}set _menu(e){e!==this._menuInternal&&(this._menuInternal=e,this._menuCloseSubscription.unsubscribe(),e&&(this._parentMaterialMenu,this._menuCloseSubscription=e.close.subscribe(i=>{this._destroyMenu(i),(i==="click"||i==="tab")&&this._parentMaterialMenu&&this._parentMaterialMenu.closed.emit(i)})),this._menuItemInstance?._setTriggersSubmenu(this._triggersSubmenu()))}_menuInternal=null;constructor(e){this._canHaveBackdrop=e;let i=d(Xp,{optional:!0});this._parentMaterialMenu=i instanceof Xo?i:void 0}ngOnDestroy(){this._menu&&this._ownsMenu(this._menu)&&Qo.delete(this._menu),this._pendingRemoval?.unsubscribe(),this._menuCloseSubscription.unsubscribe(),this._closingActionsSubscription.unsubscribe(),this._overlayRef&&(this._overlayRef.dispose(),this._overlayRef=null)}get menuOpen(){return this._menuOpen}get dir(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}_triggersSubmenu(){return!!(this._menuItemInstance&&this._parentMaterialMenu&&this._menu)}_closeMenu(){this._menu?.close.emit()}_openMenu(e){if(this._triggerIsAriaDisabled())return;let i=this._menu;if(this._menuOpen||!i)return;this._pendingRemoval?.unsubscribe();let r=Qo.get(i);Qo.set(i,this),r&&r!==this&&r._closeMenu();let o=this._createOverlay(i),a=o.getConfig(),s=a.positionStrategy;this._setPosition(i,s),this._canHaveBackdrop?a.hasBackdrop=i.hasBackdrop==null?!this._triggersSubmenu():i.hasBackdrop:a.hasBackdrop=i.hasBackdrop??!1,o.hasAttached()||(o.attach(this._getPortal(i)),i.lazyContent?.attach(this.menuData)),this._closingActionsSubscription=this._menuClosingActions().subscribe(()=>this._closeMenu()),i.parentMenu=this._triggersSubmenu()?this._parentMaterialMenu:void 0,i.direction=this.dir,e&&i.focusFirstItem(this._openedBy||"program"),this._setIsMenuOpen(!0),i instanceof Xo&&(i._setIsOpen(!0),i._directDescendantItems.changes.pipe(je(i.close)).subscribe(()=>{s.withLockedPosition(!1).reapplyLastPosition(),s.withLockedPosition(!0)}))}focus(e,i){this._focusMonitor&&e?this._focusMonitor.focusVia(this._element,e,i):this._element.nativeElement.focus(i)}_destroyMenu(e){let i=this._overlayRef,r=this._menu;!i||!this.menuOpen||(this._closingActionsSubscription.unsubscribe(),this._pendingRemoval?.unsubscribe(),r instanceof Xo&&this._ownsMenu(r)?(this._pendingRemoval=r._animationDone.pipe(vt(1)).subscribe(()=>{i.detach(),Qo.has(r)||r.lazyContent?.detach()}),r._setIsOpen(!1)):(i.detach(),r?.lazyContent?.detach()),r&&this._ownsMenu(r)&&Qo.delete(r),this.restoreFocus&&(e==="keydown"||!this._openedBy||!this._triggersSubmenu())&&this.focus(this._openedBy),this._openedBy=void 0,this._setIsMenuOpen(!1))}_setIsMenuOpen(e){e!==this._menuOpen&&(this._menuOpen=e,this._menuOpen?this.menuOpened.emit():this.menuClosed.emit(),this._triggersSubmenu()&&this._menuItemInstance._setHighlighted(e),this._changeDetectorRef.markForCheck())}_createOverlay(e){if(!this._overlayRef){let i=this._getOverlayConfig(e);this._subscribeToPositions(e,i.positionStrategy),this._overlayRef=Dn(this._injector,i),this._overlayRef.keydownEvents().subscribe(r=>{this._menu instanceof Xo&&this._menu._handleKeydown(r)})}return this._overlayRef}_getOverlayConfig(e){return new yn({positionStrategy:Nr(this._injector,this._getOverlayOrigin()).withLockedPosition().withGrowAfterOpen().withTransformOriginOn(".mat-menu-panel, .mat-mdc-menu-panel"),backdropClass:e.backdropClass||"cdk-overlay-transparent-backdrop",panelClass:e.overlayPanelClass,scrollStrategy:this._scrollStrategy(),direction:this._dir||"ltr",disableAnimations:this._animationsDisabled})}_subscribeToPositions(e,i){e.setPositionClasses&&i.positionChanges.subscribe(r=>{this._ngZone.run(()=>{let o=r.connectionPair.overlayX==="start"?"after":"before",a=r.connectionPair.overlayY==="top"?"below":"above";e.setPositionClasses(o,a)})})}_setPosition(e,i){let[r,o]=e.xPosition==="before"?["end","start"]:["start","end"],[a,s]=e.yPosition==="above"?["bottom","top"]:["top","bottom"],[l,c]=[a,s],[u,f]=[r,o],g=0;if(this._triggersSubmenu()){if(f=r=e.xPosition==="before"?"start":"end",o=u=r==="end"?"start":"end",this._parentMaterialMenu){if(this._parentInnerPadding==null){let p=this._parentMaterialMenu.items.first;this._parentInnerPadding=p?p._getHostElement().offsetTop:0}g=a==="bottom"?this._parentInnerPadding:-this._parentInnerPadding}}else e.overlapTrigger||(l=a==="top"?"bottom":"top",c=s==="top"?"bottom":"top");i.withPositions([{originX:r,originY:l,overlayX:u,overlayY:a,offsetY:g},{originX:o,originY:l,overlayX:f,overlayY:a,offsetY:g},{originX:r,originY:c,overlayX:u,overlayY:s,offsetY:-g},{originX:o,originY:c,overlayX:f,overlayY:s,offsetY:-g}])}_menuClosingActions(){let e=this._getOutsideClickStream(this._overlayRef),i=this._overlayRef.detachments(),r=this._parentMaterialMenu?this._parentMaterialMenu.closed:Pe(),o=this._parentMaterialMenu?this._parentMaterialMenu._hovered().pipe(Le(a=>this._menuOpen&&a!==this._menuItemInstance)):Pe();return Bt(e,r,o,i)}_getPortal(e){return(!this._portal||this._portal.templateRef!==e.templateRef)&&(this._portal=new bn(e.templateRef,this._viewContainerRef)),this._portal}_ownsMenu(e){return Qo.get(e)===this}_triggerIsAriaDisabled(){return ie(this._element.nativeElement.getAttribute("aria-disabled"))}static \u0275fac=function(i){Wa()};static \u0275dir=U({type:t})}return t})(),OC=(()=>{class t extends WO{_cleanupTouchstart;_hoverSubscription=ue.EMPTY;get _deprecatedMatMenuTriggerFor(){return this.menu}set _deprecatedMatMenuTriggerFor(e){this.menu=e}get menu(){return this._menu}set menu(e){this._menu=e}menuData;restoreFocus=!0;menuOpened=new F;onMenuOpen=this.menuOpened;menuClosed=new F;onMenuClose=this.menuClosed;constructor(){super(!0);let e=d(Te);this._cleanupTouchstart=e.listen(this._element.nativeElement,"touchstart",i=>{Er(i)||(this._openedBy="touch")},{passive:!0})}triggersSubmenu(){return super._triggersSubmenu()}toggleMenu(){return this.menuOpen?this.closeMenu():this.openMenu()}openMenu(){this._openMenu(!0)}closeMenu(){this._closeMenu()}updatePosition(){this._overlayRef?.updatePosition()}ngAfterContentInit(){this._handleHover()}ngOnDestroy(){super.ngOnDestroy(),this._cleanupTouchstart(),this._hoverSubscription.unsubscribe()}_getOverlayOrigin(){return this._element}_getOutsideClickStream(e){return e.backdropClick()}_handleMousedown(e){wr(e)||(this._openedBy=e.button===0?"mouse":void 0,this.triggersSubmenu()&&e.preventDefault())}_handleKeydown(e){let i=e.keyCode;(i===13||i===32)&&(this._openedBy="keyboard"),this.triggersSubmenu()&&(i===39&&this.dir==="ltr"||i===37&&this.dir==="rtl")&&(this._openedBy="keyboard",this.openMenu())}_handleClick(e){this.triggersSubmenu()?(e.stopPropagation(),this.openMenu()):this.toggleMenu()}_handleHover(){this.triggersSubmenu()&&this._parentMaterialMenu&&(this._hoverSubscription=this._parentMaterialMenu._hovered().subscribe(e=>{e===this._menuItemInstance&&!e.disabled&&this._parentMaterialMenu?._panelAnimationState!=="void"&&(this._openedBy="mouse",this._openMenu(!1))}))}static \u0275fac=function(i){return new(i||t)};static \u0275dir=U({type:t,selectors:[["","mat-menu-trigger-for",""],["","matMenuTriggerFor",""]],hostAttrs:[1,"mat-mdc-menu-trigger"],hostVars:3,hostBindings:function(i,r){i&1&&M("click",function(a){return r._handleClick(a)})("mousedown",function(a){return r._handleMousedown(a)})("keydown",function(a){return r._handleKeydown(a)}),i&2&&P("aria-haspopup",r.menu?"menu":null)("aria-expanded",r.menuOpen)("aria-controls",r.menuOpen?r.menu==null?null:r.menu.panelId:null)},inputs:{_deprecatedMatMenuTriggerFor:[0,"mat-menu-trigger-for","_deprecatedMatMenuTriggerFor"],menu:[0,"matMenuTriggerFor","menu"],menuData:[0,"matMenuTriggerData","menuData"],restoreFocus:[0,"matMenuTriggerRestoreFocus","restoreFocus"]},outputs:{menuOpened:"menuOpened",onMenuOpen:"onMenuOpen",menuClosed:"menuClosed",onMenuClose:"onMenuClose"},exportAs:["matMenuTrigger"],features:[_e]})}return t})();var NC=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=Z({type:t});static \u0275inj=q({imports:[No,Qt,ye,Xn]})}return t})();var FC=[{value:"normal",label:"Normal"},{value:"poetic",label:"Poetic"},{value:"humorous",label:"Humorous"},{value:"cosmic",label:"Cosmic"},{value:"minimalist",label:"Minimalist"},{value:"romantic",label:"Romantic"},{value:"chaotic",label:"Chaotic"},{value:"noir",label:"Noir"},{value:"psychedelic",label:"Psychedelic"}];var qO=(t,n)=>n.value;function ZO(t,n){if(t&1){let e=pe();m(0,"button",7),M("click",function(){let r=te(e).$implicit,o=D();return ne(o.select(r.value))}),m(1,"mat-icon",8),C(2),h(),C(3),h()}if(t&2){let e=n.$implicit,i=D();I("mood-menu-item--active",i.currentMood()===e.value),_(2),oe(i.currentMood()===e.value?"check":""),_(),Fe(" ",e.label," ")}}var Jd=class t{currentMood=Yt("normal");moodSelected=Dy();moods=FC;moodLabel=Me(()=>{let n=this.currentMood();return n?n.charAt(0).toUpperCase()+n.slice(1):"Normal"});select(n){this.moodSelected.emit(n)}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=k({type:t,selectors:[["app-mood-picker"]],inputs:{currentMood:[1,"currentMood"]},outputs:{moodSelected:"moodSelected"},decls:11,vars:2,consts:[["picker","matMenu"],["aria-label","Change mood",1,"mood-trigger",3,"matMenuTriggerFor"],[1,"mood-trigger-label"],[1,"mood-trigger-icon"],["xPosition","before",1,"mood-menu"],[1,"mood-menu-title",3,"click"],["mat-menu-item","",1,"mood-menu-item",3,"mood-menu-item--active"],["mat-menu-item","",1,"mood-menu-item",3,"click"],[1,"mood-check"]],template:function(e,i){if(e&1&&(m(0,"button",1)(1,"span",2),C(2),h(),m(3,"mat-icon",3),C(4,"expand_circle_down"),h()(),m(5,"mat-menu",4,0)(7,"div",5),M("click",function(o){return o.stopPropagation()}),C(8,"Change my mood"),h(),Ct(9,ZO,4,4,"button",6,qO),h()),e&2){let r=Gt(6);T("matMenuTriggerFor",r),_(2),oe(i.moodLabel()),_(7),xt(i.moods)}},dependencies:[Jt,Xt,NC,Xo,Os,OC],styles:[`:host{display:inline-flex}.mood-trigger{display:inline-flex;align-items:center;gap:3px;background:none;border:none;padding:0;cursor:pointer;color:#fff9}.mood-trigger:hover{color:#fff}.mood-trigger-label{font-family:var(--reco-font);font-size:.58rem;font-weight:600;line-height:1;letter-spacing:.04em;text-transform:uppercase}.mood-trigger-icon{font-size:12px;width:12px;height:12px;line-height:1}.mood-menu{background:var(--reco-surface-1);border:1px solid var(--reco-border);border-radius:10px;min-width:160px;box-shadow:0 8px 24px #00000040}.mood-menu-title{padding:8px 14px 4px;font-family:var(--reco-font);font-size:.65rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--reco-text-muted);pointer-events:none;-webkit-user-select:none;user-select:none}.mood-menu-item{font-family:var(--reco-font);font-size:.82rem;color:var(--reco-text)}.mood-menu-item--active{color:var(--reco-accent);font-weight:600}.mood-check{font-size:14px;width:14px;height:14px;margin-right:6px;flex-shrink:0}
`],encapsulation:2})};var eu=class t{constructor(n){this.sanitizer=n}transform(n){let i=n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>").replace(/\*\*(.+?)\*\*/gs,"<strong>$1</strong>");return this.sanitizer.bypassSecurityTrustHtml(i)}static \u0275fac=function(e){return new(e||t)(ee(xr,16))};static \u0275pipe=Tc({name:"boldMarkdown",type:t,pure:!0})};var tu=class t{constructor(n){this.http=n}getRecommendations(n,e="gemini",i="normal",r,o){return this.http.post("/api/recommendations",{prompt:n,provider:e,mood:i,locationContext:r??null,weatherContext:o??null})}static \u0275fac=function(e){return new(e||t)(R(ut))};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})};var nu=class t{constructor(n){this.http=n;this.init()}locationLabel=x(null);locationContext=x(null);weatherContext=x(null);async init(){try{let n=await Yr(this.http.get("https://geo.kamero.ai/api/geo")),e=PC(n.city),i=PC(n.country),r=[e,i].filter(Boolean);r.length>0&&(this.locationLabel.set(r.join(", ")),this.locationContext.set(`The user is located in ${r.join(", ")}.`));let o=parseFloat(n.latitude),a=parseFloat(n.longitude),l=(await Yr(this.http.get(`https://api.open-meteo.com/v1/forecast?latitude=${o}&longitude=${a}&current_weather=true`))).current_weather,c=QO(l.temperature),u=XO(l.windspeed),f=JO(l.weathercode);this.weatherContext.set(`Outside it is ${f}, there is ${u} and as temperature is ${c}`)}catch{}}static \u0275fac=function(e){return new(e||t)(R(ut))};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})};function PC(t){return!t||t.trim()===""||t.trim().toLowerCase()==="undefined"?null:t.trim()}function QO(t){return t<=3?"Very Cold":t<=6?"Cold":t<=10?"Chill":t<=15?"Normal":t<=20?"Nice":t<=28?"Warm":t<=35?"Hot":"Burning hot"}function XO(t){return t<=15?"no wind":t<=30?"a light wind":t<=50?"windy":t<=100?"a strong wind":"a hurricane"}function JO(t){return t===0?"a clear sky":t>=1&&t<=3?"partly cloudy":t>=45&&t<=48?"fog":t>=51&&t<=57?"drizzling":t>=61&&t<=65?"raining":t>=71&&t<=75?"snowing":t>=80&&t<=82?"raining":t>=85&&t<=86?"snowing":t>=95&&t<=99?"a thunderstorm":"partly cloudy"}var tN=["messageList"],nN=["promptInput"],iN=["splitContainer"];function rN(t,n){if(t&1&&(m(0,"mat-icon",32),C(1,"location_on"),h(),m(2,"span"),C(3),h()),t&2){let e=D();_(3),oe(e.geoWeatherService.locationLabel())}}function oN(t,n){t&1&&(m(0,"div",16)(1,"mat-icon",32),C(2,"cloud"),h(),m(3,"span"),C(4,"Inner Voice unavailable \u2014 Cosmic Voice stepped in"),h()())}function aN(t,n){if(t&1&&(m(0,"p",35),C(1),h()),t&2){let e=D(2);_(),oe(e.tryLineHint())}}function sN(t,n){if(t&1&&(m(0,"div",20),j(1,"img",33),m(2,"p",34),C(3,"What does your mind sound like today?"),h(),V(4,aN,2,1,"p",35),h()),t&2){let e=D();_(4),B(e.tryLineHint()?4:-1)}}function lN(t,n){if(t&1){let e=pe();m(0,"button",43),M("click",function(){te(e);let r=D(2).$implicit,o=D();return ne(o.activateReply(r.eventId))}),m(1,"mat-icon"),C(2,"history"),h()()}}function cN(t,n){if(t&1){let e=pe();m(0,"button",44),M("click",function(){te(e);let r=D(2).$index,o=D();return ne(o.toggleExpand(r))}),C(1),h()}if(t&2){let e=D(2).$index,i=D();_(),Fe(" ",i.expandedBubbles().has(e)?"Show Less":"Show More..."," ")}}function dN(t,n){if(t&1&&(m(0,"div",37)(1,"div",38),V(2,lN,3,0,"button",39),j(3,"div",40),uh(4,"boldMarkdown"),m(5,"span",41),C(6),h()(),V(7,cN,2,1,"button",42),h()),t&2){let e=D(),i=e.$implicit,r=e.$index,o=D();_(),I("message-bubble--active",i.eventId!==void 0&&i.eventId===o.activeReplyId())("message-bubble--has-rewind",i.hasSuggestions&&i.eventId!==void 0&&i.eventId!==o.activeReplyId())("message-bubble--clamped",o.isTruncated(r)),P("data-msg-index",r),_(),B(i.hasSuggestions&&i.eventId!==void 0&&i.eventId!==o.activeReplyId()?2:-1),_(),T("innerHTML",fh(4,11,i.text),Om),_(3),oe(o.formatMessageTime(i.timestamp)),_(),B(o.showToggle(r)?7:-1)}}function uN(t,n){if(t&1){let e=pe();m(0,"div",38)(1,"app-mood-picker",45),M("moodSelected",function(r){te(e);let o=D().$implicit,a=D();return ne(a.onMoodSelected(r,o))}),h(),m(2,"span"),C(3),h(),m(4,"span",41),C(5),h()()}if(t&2){let e=D().$implicit,i=D();_(),T("currentMood",e.mood??"normal"),_(2),oe(e.text),_(2),oe(i.formatMessageTime(e.timestamp))}}function fN(t,n){if(t&1&&(m(0,"div",36),V(1,dN,8,13,"div",37)(2,uN,6,3,"div",38),h()),t&2){let e=n.$implicit;I("message--user",e.role==="user")("message--model",e.role==="model"),_(),B(e.role==="model"?1:2)}}function mN(t,n){if(t&1&&(m(0,"span",50),C(1),h()),t&2){let e=D(2);_(),oe(e.retryNotice())}}function hN(t,n){if(t&1&&(m(0,"div",22)(1,"div",46)(2,"div",47)(3,"mat-icon",48),C(4,"music_note"),h(),m(5,"span",49),C(6),h()(),V(7,mN,2,1,"span",50),h()()),t&2){let e=D();_(6),oe(e.loadingPhrase()),_(),B(e.retryNotice()?7:-1)}}function pN(t,n){if(t&1&&(m(0,"div",51)(1,"mat-icon",32),C(2),h(),m(3,"span"),C(4),h()()),t&2){let e=D();I("error-banner--rate-limit",e.errorIsRateLimit()),_(2),oe(e.errorIsRateLimit()?"schedule":"error_outline"),_(2),oe(e.error())}}function gN(t,n){if(t&1&&j(0,"app-suggestions-panel",30),t&2){let e=D();T("suggestions",e.suggestions())("loading",e.suggestionsLoading())("error",e.suggestionsError())("message",e.suggestionsMessage())("loadingLabel",e.loadingPhrase())("clementineUnavailable",e.clementineUnavailable())}}function _N(t,n){if(t&1&&(m(0,"p",52),C(1),h()),t&2){let e=D(2);_(),oe(e.loadingPhrase())}}function bN(t,n){t&1&&(m(0,"p"),C(1,"This is where your mind's music will take shape."),h())}function vN(t,n){if(t&1&&(m(0,"div",31)(1,"mat-icon",32),C(2,"queue_music"),h(),V(3,_N,2,1,"p",52)(4,bN,2,0,"p"),h()),t&2){let e=D();_(3),B(e.loading()?3:4)}}var LC="reco-provider",Jp=["Holding the note","Staying on the downbeat","Lingering in the intro","Looping the pre\u2011chorus","Riding the sustain pedal","Tuning up forever","Hovering on the fermata","Chilling in the green room","Stuck in soundcheck mode","Spinning the vinyl before the needle drops","Hanging on the last chord","Paused between tracks","Letting the beat simmer","Idling in the bridge","Waiting for the bass to kick in","Floating in reverb","Queued in the playlist","Stuck in the encore gap","Listening to the orchestra warm up","Waiting for the DJ to unmute"],yN=220,DN=25,iu=class t{constructor(n,e,i,r,o,a){this.recommendationService=n;this.sessionService=e;this.settingsService=i;this.geoWeatherService=r;this.dialog=o;this.ngZone=a;dn(()=>{this.loading()?this.typewriterStart(this.randomPhrase()):this.typewriterStop()})}messageListRef;promptInputRef;containerRef;messages=x([]);prompt=x("");loading=x(!1);error=x(null);errorIsRateLimit=x(!1);suggestions=x([]);suggestionsLoading=x(!1);suggestionsError=x(!1);suggestionsMessage=x(null);hasSuggestions=x(!1);activeReplyId=x(null);retryNotice=x(null);truncatedBubbles=x(new Set);expandedBubbles=x(new Set);bubbleNaturalHeights=new Map;resizeObserver;pendingMeasure=!1;loadingPhrase=x(Jp[0]);tryLineHint=x("");provider=x(localStorage.getItem(LC)??"gemini");usedFallback=x(!1);useLocation=x(!1);useWeather=x(!1);memoryUsed=x(0);memoryTotal=x(25);memoryFill=Me(()=>this.memoryTotal()>0?this.memoryUsed()/this.memoryTotal():0);memoryHigh=Me(()=>this.memoryFill()>.8);splitPercent=x(40);dragging=!1;containerWidth=0;clementineUnavailable=Me(()=>this.suggestionsMessage()?.includes("local library is currently unavailable")===!0);shouldScroll=!1;shouldFocusInput=!1;typewriterTimeout=null;fallbackTimer=null;RETRY_DELAYS=[3e3,5e3,7e3,1e4];HISTORY_LIMIT=50;promptHistory=[];historyIndex=-1;currentDraft="";isHintPreview=x(!1);async ngOnInit(){this.refreshMemory(),this.loadEnvSettings();try{let i=(await(await fetch("/trylines.txt")).text()).split(`
`).map(r=>r.trim()).filter(r=>r.length>0);i.length>0&&this.tryLineHint.set(i[Math.floor(Math.random()*i.length)])}catch{}await this.hydrate()}ngAfterViewInit(){if(this.focusPromptInput(),typeof ResizeObserver<"u"){this.resizeObserver=new ResizeObserver(()=>this.ngZone.run(()=>this.recomputeTruncation()));let n=this.messageListRef?.nativeElement;n&&this.resizeObserver.observe(n)}}ngOnDestroy(){this.typewriterStop(),this.fallbackTimer!==null&&clearTimeout(this.fallbackTimer),this.resizeObserver?.disconnect()}ngAfterViewChecked(){this.shouldScroll&&(this.scrollToBottom(),this.shouldScroll=!1),this.shouldFocusInput&&(this.shouldFocusInput=!1,setTimeout(()=>this.promptInputRef?.nativeElement?.focus(),0)),this.pendingMeasure||(this.pendingMeasure=!0,Promise.resolve().then(()=>{this.pendingMeasure=!1,this.measureNewBubbles()}))}onDividerMousedown(n){this.dragging=!0,this.containerWidth=this.containerRef?.nativeElement?.getBoundingClientRect().width??0,n.preventDefault()}onMouseMove(n){if(!this.dragging||this.containerWidth===0)return;let e=this.containerRef.nativeElement.getBoundingClientRect(),i=(n.clientX-e.left)/this.containerWidth*100,r=(this.containerWidth-yN)/this.containerWidth*100;this.splitPercent.set(Math.min(Math.max(i,DN),r))}onMouseUp(){this.dragging=!1}loadEnvSettings(){this.settingsService.getSettings().subscribe({next:n=>{let e=i=>n.settings.find(r=>r.key===i)?.value??"false";this.useLocation.set(e("USE_USER_LOCATION")==="true"),this.useWeather.set(e("USE_CURRENT_WEATHER")==="true")},error:()=>{}})}refreshMemory(){this.sessionService.getMemoryStatus().subscribe({next:n=>{this.memoryUsed.set(n.used),this.memoryTotal.set(n.total)},error:()=>{}})}bustMemory(){confirm("Clear all session memory? The AI will start fresh on your next question.")&&this.sessionService.bustMemory().subscribe({next:()=>{this.memoryUsed.set(0),this.refreshMemory()},error:()=>{}})}openSettings(){this.dialog.open($d,{disableClose:!1,autoFocus:!1}).afterClosed().subscribe(n=>{if(n){let e=localStorage.getItem(LC);e&&this.provider.set(e),this.loadEnvSettings()}})}openDiary(){this.dialog.open(qd,{disableClose:!1,autoFocus:!1,maxWidth:"96vw",data:{provider:this.provider()}})}isTruncated(n){return this.truncatedBubbles().has(n)&&!this.expandedBubbles().has(n)}showToggle(n){return this.truncatedBubbles().has(n)}toggleExpand(n){this.expandedBubbles.update(e=>{let i=new Set(e);return i.has(n)?i.delete(n):i.add(n),i})}send(){let n=this.prompt().trim();!n||this.loading()||(this.promptHistory[this.promptHistory.length-1]!==n&&(this.promptHistory.push(n),this.promptHistory.length>this.HISTORY_LIMIT&&this.promptHistory.shift()),this.historyIndex=-1,this.currentDraft="",this.prompt.set(""),this._executeRequest(n,"normal"))}onMoodSelected(n,e){n!==(e.mood??"normal")&&this.resendWithMood(e.text,n)}resendWithMood(n,e){this.loading()||this._executeRequest(n,e)}_executeRequest(n,e){this.messages.update(o=>[...o,{role:"user",text:n,timestamp:new Date,mood:e}]),this.loading.set(!0),this.error.set(null),this.errorIsRateLimit.set(!1),this.retryNotice.set(null),this.usedFallback.set(!1),this.shouldScroll=!0,this.suggestionsLoading.set(!0),this.suggestionsError.set(!1),this.suggestionsMessage.set(null),this.hasSuggestions.set(!0);let i=this.useLocation()?this.geoWeatherService.locationContext():null,r=this.useWeather()?this.geoWeatherService.weatherContext():null;this.recommendationService.getRecommendations(n,this.provider(),e,i,r).pipe(xu({count:4,delay:(o,a)=>this.isRetryableError(o)?(this.retryNotice.set(`The AI is a bit busy right now\u2026 retrying (${a}/4)`),Yi(this.RETRY_DELAYS[a-1])):la(()=>o)})).subscribe({next:o=>{this.retryNotice.set(null),this.activeReplyId.set(o.aiReplyEventId),this.messages.update(a=>[...a,{role:"model",text:o.narrative,timestamp:new Date,eventId:o.aiReplyEventId,hasSuggestions:o.suggestions.length>0}]),this.suggestions.set(o.suggestions),this.suggestionsMessage.set(o.message),this.loading.set(!1),this.suggestionsLoading.set(!1),this.refreshMemory(),this.shouldScroll=!0,this.focusPromptInput(),o.usedFallback&&(this.usedFallback.set(!0),this.fallbackTimer!==null&&clearTimeout(this.fallbackTimer),this.fallbackTimer=setTimeout(()=>this.usedFallback.set(!1),8e3))},error:o=>{this.retryNotice.set(null);let a=o.status===429;this.errorIsRateLimit.set(a),this.error.set(o.error?.error??"Something went wrong. Please try again."),this.loading.set(!1),this.suggestionsError.set(!0),this.suggestionsLoading.set(!1),this.focusPromptInput()}})}onKeydown(n){if(n.key==="Enter"&&!n.shiftKey){n.preventDefault(),this.send();return}if(n.key==="ArrowUp"){if(this.promptHistory.length===0)return;n.preventDefault(),this.historyIndex===-1&&(this.currentDraft=this.isHintPreview()?"":this.prompt(),this.isHintPreview.set(!1)),this.historyIndex=this.historyIndex===-1?this.promptHistory.length-1:Math.max(0,this.historyIndex-1),this.prompt.set(this.promptHistory[this.historyIndex]);return}if(n.key==="ArrowDown"){if(this.historyIndex===-1)return;n.preventDefault(),this.historyIndex++,this.historyIndex>=this.promptHistory.length?(this.historyIndex=-1,this.prompt.set(this.currentDraft)):this.prompt.set(this.promptHistory[this.historyIndex]);return}}onFocus(n){!this.prompt().trim()&&this.tryLineHint()&&(this.prompt.set(this.tryLineHint()),this.isHintPreview.set(!0))}onBlur(){this.isHintPreview()&&(this.prompt.set(""),this.isHintPreview.set(!1))}updatePrompt(n){this.historyIndex=-1;let e=n.target;if(this.isHintPreview()){let r=n,o=r.inputType?.startsWith("insert")?r.data??"":"";o?(this.isHintPreview.set(!1),this.prompt.set(o),e.value=o):e.value=this.tryLineHint();return}let i=e.value;i===""&&this.tryLineHint()?(this.prompt.set(this.tryLineHint()),this.isHintPreview.set(!0)):(this.isHintPreview.set(!1),this.prompt.set(i))}formatMessageTime(n){let e=new Date,i=o=>o.toString().padStart(2,"0"),r=`${i(n.getHours())}:${i(n.getMinutes())}`;return n.toDateString()===e.toDateString()?r:`${i(n.getDate())}/${i(n.getMonth()+1)}/${n.getFullYear()} ${r}`}activateReply(n){this.activeReplyId()!==n&&(this.activeReplyId.set(n),this.hasSuggestions.set(!0),this.suggestionsLoading.set(!0),this.suggestionsError.set(!1),this.sessionService.getEnrichedSuggestions(n).subscribe({next:e=>{this.activeReplyId()===n&&(this.suggestions.set(e.suggestions),this.suggestionsMessage.set(e.message),this.suggestionsLoading.set(!1))},error:()=>{this.activeReplyId()===n&&(this.suggestionsLoading.set(!1),this.suggestionsError.set(!0))}}),this.sessionService.setActiveReply(n).subscribe({error:()=>{}}))}async hydrate(){try{let n=await Yr(this.sessionService.getHistory());if(n.turns.length===0)return;this.bubbleNaturalHeights.clear(),this.truncatedBubbles.set(new Set),this.expandedBubbles.set(new Set),this.messages.set(n.turns.map(e=>({role:e.role,text:e.text,timestamp:new Date(e.timestamp),eventId:e.eventId,hasSuggestions:e.hasSuggestions,mood:e.mood??"normal"}))),this.activeReplyId.set(n.activeReplyId),this.shouldScroll=!0,n.activeReplyId!=null&&(this.hasSuggestions.set(!0),this.suggestionsLoading.set(!0),this.sessionService.getEnrichedSuggestions(n.activeReplyId).subscribe({next:e=>{this.suggestions.set(e.suggestions),this.suggestionsMessage.set(e.message),this.suggestionsLoading.set(!1)},error:()=>{this.suggestionsLoading.set(!1)}}))}catch{}}typewriterStart(n){this.typewriterStop(),this.typeChar(n,0)}typeChar(n,e){this.loadingPhrase.set(n.slice(0,e)),e<n.length?this.typewriterTimeout=setTimeout(()=>this.typeChar(n,e+1),45):this.typewriterTimeout=setTimeout(()=>this.typewriterStart(this.randomPhrase()),1e3)}typewriterStop(){this.typewriterTimeout!==null&&(clearTimeout(this.typewriterTimeout),this.typewriterTimeout=null)}randomPhrase(){return Jp[Math.floor(Math.random()*Jp.length)]}focusPromptInput(){this.shouldFocusInput=!0}isRetryableError(n){return n?.status===502}measureNewBubbles(){let n=this.messageListRef?.nativeElement;if(!n)return;let e=window.innerHeight*.5,i=!1;n.querySelectorAll("[data-msg-index]").forEach(r=>{let o=parseInt(r.dataset.msgIndex??"-1",10);o<0||this.bubbleNaturalHeights.has(o)||(this.bubbleNaturalHeights.set(o,r.scrollHeight),i=!0)}),i&&this.recomputeTruncation(e)}recomputeTruncation(n=window.innerHeight*.5){let e=this.messages(),i=new Set;for(let[o,a]of this.bubbleNaturalHeights)o<e.length&&e[o].role==="model"&&a>n&&i.add(o);let r=this.truncatedBubbles();t.setsEqual(i,r)||this.truncatedBubbles.set(i)}static setsEqual(n,e){if(n.size!==e.size)return!1;for(let i of n)if(!e.has(i))return!1;return!0}scrollToBottom(){let n=this.messageListRef?.nativeElement;n&&(n.scrollTop=n.scrollHeight)}static \u0275fac=function(e){return new(e||t)(ee(tu),ee(Fi),ee(Go),ee(nu),ee(yd),ee(A))};static \u0275cmp=k({type:t,selectors:[["app-chat"]],viewQuery:function(e,i){if(e&1&&ve(tN,5)(nN,5)(iN,5),e&2){let r;K(r=Q())&&(i.messageListRef=r.first),K(r=Q())&&(i.promptInputRef=r.first),K(r=Q())&&(i.containerRef=r.first)}},hostBindings:function(e,i){e&1&&M("mousemove",function(o){return i.onMouseMove(o)},yc)("mouseup",function(){return i.onMouseUp()},yc)},decls:47,vars:21,consts:[["splitContainer",""],["messageList",""],["promptInput",""],[1,"page-shell"],[1,"chat-header"],["src","logo.png","alt","Reasonic",1,"header-logo"],[1,"chat-title-group"],[1,"chat-title"],[1,"chat-tagline"],["aria-label","Current location","aria-live","polite",1,"location-display"],["aria-label","Session memory usage",1,"memory-widget"],[1,"memory-label"],["role","progressbar",1,"memory-bar"],["mat-icon-button","","matTooltip","Clear session memory","aria-label","Clear session memory",1,"memory-bust-btn",3,"click"],["mat-icon-button","","matTooltip","Musical Diary","aria-label","Open musical diary",1,"diary-btn",3,"click"],["mat-icon-button","","matTooltip","Settings","aria-label","Open settings",1,"settings-btn",3,"click"],["role","status","aria-live","polite",1,"fallback-chip"],[1,"split-layout"],["aria-label","Conversation",1,"pane","pane--chat"],[1,"message-list"],[1,"empty-state"],[1,"message",3,"message--user","message--model"],[1,"message","message--model"],["role","alert",1,"error-banner",3,"error-banner--rate-limit"],[1,"input-area"],["appearance","outline","subscriptSizing","dynamic",1,"prompt-field"],["matInput","","placeholder","e.g. Recommend some melancholic jazz from the 60s","aria-label","Music prompt",3,"input","keydown","focus","blur","value","disabled"],["mat-fab","","aria-label","Send message",3,"click","disabled"],["aria-hidden","true",1,"split-divider",3,"mousedown"],["aria-label","Recommendations",1,"pane","pane--reco"],[3,"suggestions","loading","error","message","loadingLabel","clementineUnavailable"],[1,"reco-empty-state"],["aria-hidden","true"],["src","logo.png","aria-hidden","true","alt","",1,"empty-logo"],[1,"empty-prompt"],[1,"empty-hint"],[1,"message"],[1,"model-msg-group"],[1,"message-bubble"],["mat-icon-button","","matTooltip","Show these suggestions","aria-label","Show suggestions for this reply",1,"rewind-btn"],[3,"innerHTML"],[1,"message-time"],["type","button",1,"show-more-btn"],["mat-icon-button","","matTooltip","Show these suggestions","aria-label","Show suggestions for this reply",1,"rewind-btn",3,"click"],["type","button",1,"show-more-btn",3,"click"],[1,"mood-badge",3,"moodSelected","currentMood"],["role","status","aria-live","polite",1,"message-bubble","message-bubble--loading"],[1,"loading-row"],["aria-hidden","true",1,"loading-icon"],[1,"loading-phrase"],[1,"retry-notice"],["role","alert",1,"error-banner"],["role","status","aria-live","polite",1,"reco-loading-text"]],template:function(e,i){e&1&&(m(0,"div",3)(1,"header",4),j(2,"img",5),m(3,"div",6)(4,"span",7),C(5,"Reasonic"),h(),m(6,"p",8),C(7,"The music hiding in your mind"),h()(),m(8,"div",9),V(9,rN,4,1),h(),m(10,"div",10)(11,"span",11),C(12),h(),j(13,"div",12),m(14,"button",13),M("click",function(){return i.bustMemory()}),m(15,"mat-icon"),C(16,"delete_sweep"),h()()(),m(17,"button",14),M("click",function(){return i.openDiary()}),m(18,"mat-icon"),C(19,"auto_stories"),h()(),m(20,"button",15),M("click",function(){return i.openSettings()}),m(21,"mat-icon"),C(22,"settings"),h()()(),V(23,oN,5,0,"div",16),m(24,"div",17,0)(26,"section",18)(27,"div",19,1),V(29,sN,5,1,"div",20),Ct(30,fN,3,5,"div",21,lh),V(32,hN,8,2,"div",22),V(33,pN,5,4,"div",23),h(),m(34,"div",24)(35,"mat-form-field",25)(36,"mat-label"),C(37,"Speak your mind if you want to hear me"),h(),m(38,"input",26,2),M("input",function(o){return i.updatePrompt(o)})("keydown",function(o){return i.onKeydown(o)})("focus",function(o){return i.onFocus(o)})("blur",function(){return i.onBlur()}),h()(),m(40,"button",27),M("click",function(){return i.send()}),m(41,"mat-icon"),C(42,"send"),h()()()(),m(43,"div",28),M("mousedown",function(o){return i.onDividerMousedown(o)}),h(),m(44,"section",29),V(45,gN,1,6,"app-suggestions-panel",30)(46,vN,5,1,"div",31),h()()()),e&2&&(_(9),B(i.geoWeatherService.locationLabel()?9:-1),_(3),vr("",i.memoryUsed(),"/",i.memoryTotal()),_(),dt("--fill",i.memoryFill()),I("memory-bar--high",i.memoryHigh()),P("aria-valuenow",i.memoryUsed())("aria-valuemax",i.memoryTotal()),_(10),B(i.usedFallback()?23:-1),_(),dt("--split-pct",i.splitPercent()+"%"),_(5),B(i.messages().length===0&&!i.loading()?29:-1),_(),xt(i.messages()),_(2),B(i.loading()?32:-1),_(),B(i.error()?33:-1),_(2),I("prompt-field--hint",i.isHintPreview()),_(3),T("value",i.prompt())("disabled",i.loading()),_(2),T("disabled",!i.prompt().trim()||i.loading()||i.isHintPreview()),_(5),B(i.hasSuggestions()?45:46))},dependencies:[Ft,Kt,FD,Po,Pr,Lo,Fr,Jt,Xt,Bd,Vd,$o,ti,Qd,Jd,eu],styles:['[_nghost-%COMP%]{display:flex;flex-direction:column;height:100%;overflow:hidden}.page-shell[_ngcontent-%COMP%]{display:flex;flex-direction:column;height:100%;overflow:hidden}.chat-header[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;padding:14px 20px;background-color:var(--reco-surface-0);color:var(--reco-text);border-bottom:1px solid var(--reco-border);flex-shrink:0}.header-logo[_ngcontent-%COMP%]{height:38px;width:auto;object-fit:contain;border-radius:4px;flex-shrink:0}.chat-title-group[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:column;gap:1px}.chat-title[_ngcontent-%COMP%]{font-size:1.1rem;font-weight:600;font-family:var(--reco-font);letter-spacing:.01em;background:linear-gradient(90deg,var(--reco-primary),var(--reco-accent));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent}.chat-tagline[_ngcontent-%COMP%]{margin:0;font-size:.68rem;font-style:italic;font-family:var(--reco-font);color:var(--reco-text-muted);letter-spacing:.01em}.location-display[_ngcontent-%COMP%]{display:flex;align-items:center;gap:4px;font-size:.78rem;font-family:var(--reco-font);color:var(--reco-text-muted);letter-spacing:.02em;white-space:nowrap}.location-display[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:.95rem;width:.95rem;height:.95rem;color:var(--reco-primary)}.memory-widget[_ngcontent-%COMP%]{display:flex;align-items:center;gap:5px;margin-left:8px}.memory-label[_ngcontent-%COMP%]{font-size:.62rem;font-family:var(--reco-font);color:var(--reco-text-muted);white-space:nowrap;min-width:28px;text-align:right}.memory-bar[_ngcontent-%COMP%]{width:52px;height:4px;border-radius:2px;background:var(--reco-border);position:relative;overflow:hidden;flex-shrink:0}.memory-bar[_ngcontent-%COMP%]:after{content:"";position:absolute;inset:0;width:calc(var(--fill, 0) * 100%);border-radius:2px;background:var(--reco-primary);transition:width .4s ease,background .4s ease}.memory-bar--high[_ngcontent-%COMP%]:after{background:var(--reco-accent)}.memory-bust-btn[_ngcontent-%COMP%]{width:28px;height:28px;flex-shrink:0;align-self:center;display:inline-flex!important;align-items:center;justify-content:center;margin:0;padding:0;color:var(--reco-text-muted);--mdc-icon-button-state-layer-size: 28px;--mdc-icon-button-icon-size: 16px}.memory-bust-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:16px;width:16px;height:16px;transition:color .2s ease}.memory-bust-btn[_ngcontent-%COMP%]:hover   mat-icon[_ngcontent-%COMP%]{color:var(--reco-accent)}.diary-btn[_ngcontent-%COMP%]{width:28px;height:28px;flex-shrink:0;align-self:center;display:inline-flex!important;align-items:center;justify-content:center;margin:0;padding:0;color:var(--reco-text-muted);--mdc-icon-button-state-layer-size: 28px;--mdc-icon-button-icon-size: 16px}.diary-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:16px;width:16px;height:16px;transition:color .2s ease}.diary-btn[_ngcontent-%COMP%]:hover   mat-icon[_ngcontent-%COMP%]{color:var(--reco-accent)}.settings-btn[_ngcontent-%COMP%]{width:28px;height:28px;flex-shrink:0;align-self:center;display:inline-flex!important;align-items:center;justify-content:center;margin:0;padding:0;color:var(--reco-text-muted);--mdc-icon-button-state-layer-size: 28px;--mdc-icon-button-icon-size: 16px}.settings-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:16px;width:16px;height:16px;transition:color .2s ease}.settings-btn[_ngcontent-%COMP%]:hover   mat-icon[_ngcontent-%COMP%]{color:var(--reco-primary)}.fallback-chip[_ngcontent-%COMP%]{display:flex;align-items:center;gap:6px;padding:6px 16px;background-color:#ffb74d1f;color:var(--reco-warning);font-size:.8rem;font-family:var(--reco-font);flex-shrink:0;animation:_ngcontent-%COMP%_fade-in .3s ease}.fallback-chip[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:16px;width:16px;height:16px}@keyframes _ngcontent-%COMP%_fade-in{0%{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}.split-layout[_ngcontent-%COMP%]{flex:1;display:flex;overflow:hidden}.pane[_ngcontent-%COMP%]{display:flex;flex-direction:column;overflow:hidden}.pane--chat[_ngcontent-%COMP%]{flex:0 0 var(--split-pct, 40%);background:var(--reco-bg);border-right:none;font-family:var(--reco-font-bubble)}.pane--reco[_ngcontent-%COMP%]{flex:1;overflow-y:auto;background:var(--reco-surface-0);min-width:220px}.split-divider[_ngcontent-%COMP%]{width:5px;flex-shrink:0;cursor:col-resize;background:var(--reco-border);transition:background .15s ease;z-index:1}.split-divider[_ngcontent-%COMP%]:hover{background:var(--reco-primary)}@media(max-width:767px){.split-layout[_ngcontent-%COMP%]{flex-direction:column}.pane--chat[_ngcontent-%COMP%]{flex:1}.pane--reco[_ngcontent-%COMP%]{flex:0 0 auto;max-height:40vh;order:-1;border-bottom:1px solid var(--reco-border);min-width:unset}.split-divider[_ngcontent-%COMP%]{display:none}}.reco-empty-state[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;color:var(--reco-text-muted)}.reco-empty-state[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:48px;width:48px;height:48px;opacity:.35}.reco-empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;font-size:.9rem;font-style:italic;font-family:var(--reco-font)}.reco-empty-state[_ngcontent-%COMP%]   .reco-loading-text[_ngcontent-%COMP%]{font-family:var(--reco-font-bubble);color:var(--reco-primary);animation:_ngcontent-%COMP%_note-pulse 1.5s ease-in-out infinite}.message-list[_ngcontent-%COMP%]{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px;background:var(--reco-bg);scrollbar-width:thin;scrollbar-color:var(--reco-surface-2) transparent}.empty-state[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;color:var(--reco-text-muted);text-align:center;gap:4px;padding:40px 20px}.empty-logo[_ngcontent-%COMP%]{width:80px;height:80px;object-fit:contain;opacity:.18;margin-bottom:8px}.empty-prompt[_ngcontent-%COMP%]{font-size:1rem;font-weight:500;color:var(--reco-text);margin:0}.empty-hint[_ngcontent-%COMP%]{font-style:italic;font-size:.875rem;color:var(--reco-text-muted);margin:4px 0 0}.message[_ngcontent-%COMP%]{display:flex}.message--user[_ngcontent-%COMP%]{justify-content:flex-end}.message--model[_ngcontent-%COMP%]{justify-content:flex-start}.model-msg-group[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:flex-start;gap:4px;max-width:78%}.model-msg-group[_ngcontent-%COMP%]   .message-bubble[_ngcontent-%COMP%]{max-width:100%}.message-bubble[_ngcontent-%COMP%]{max-width:78%;padding:10px 14px;border-radius:18px;line-height:1.7;font-size:.9rem;font-family:var(--reco-font-bubble);position:relative}.message--user[_ngcontent-%COMP%]   .message-bubble[_ngcontent-%COMP%]{background-color:var(--reco-primary);color:#fff;border-bottom-right-radius:4px;font-weight:400;white-space:pre-wrap}.message--model[_ngcontent-%COMP%]   .message-bubble[_ngcontent-%COMP%]{background-color:var(--reco-surface-2);color:var(--reco-text);border-bottom-left-radius:4px;border:1px solid var(--reco-border)}.message--model[_ngcontent-%COMP%]   .message-bubble[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{font-weight:700;color:var(--reco-primary)}.message--model[_ngcontent-%COMP%]   .message-bubble--active[_ngcontent-%COMP%]{outline:2px solid var(--reco-primary);outline-offset:2px;background-color:var(--reco-surface-1)}.message-bubble--has-rewind[_ngcontent-%COMP%]{padding-right:36px}.message-bubble--clamped[_ngcontent-%COMP%]{max-height:50vh;overflow:hidden;position:relative}.message-bubble--clamped[_ngcontent-%COMP%]:after{content:"";position:absolute;bottom:0;left:0;right:0;height:48px;background:linear-gradient(to bottom,transparent,var(--reco-surface-2));pointer-events:none}.message-bubble--loading[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:6px;padding:10px 14px;font-style:italic;font-size:.875rem;font-family:var(--reco-font-bubble);color:var(--reco-text-muted);background-color:var(--reco-surface-1);border:1px solid var(--reco-border);border-bottom-left-radius:4px}.show-more-btn[_ngcontent-%COMP%]{background:none;border:none;cursor:pointer;font-family:var(--reco-font);font-size:.72rem;font-weight:500;color:var(--reco-primary);padding:0 2px;text-decoration:underline;text-underline-offset:2px;line-height:1.4}.show-more-btn[_ngcontent-%COMP%]:hover{color:var(--reco-accent)}.rewind-btn[_ngcontent-%COMP%]{position:absolute;top:4px;right:4px;width:26px;height:26px;flex-shrink:0;color:var(--reco-text-muted);opacity:.4;transition:opacity .2s ease,color .2s ease;--mdc-icon-button-state-layer-size: 26px;--mdc-icon-button-icon-size: 18px}.rewind-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:18px;width:18px;height:18px}.rewind-btn[_ngcontent-%COMP%]:hover{opacity:1;color:var(--reco-primary)}.message-time[_ngcontent-%COMP%]{display:block;font-size:.62rem;font-family:var(--reco-font);margin-top:4px}.message--user[_ngcontent-%COMP%]   .message-time[_ngcontent-%COMP%]{color:#ffffff80;text-align:right}.message--model[_ngcontent-%COMP%]   .message-time[_ngcontent-%COMP%]{color:#6b6b6b;opacity:.7}.message--user[_ngcontent-%COMP%]   .message-bubble[_ngcontent-%COMP%]{padding-top:24px}.mood-badge[_ngcontent-%COMP%]{position:absolute;top:4px;right:6px}.loading-row[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px}.retry-notice[_ngcontent-%COMP%]{font-style:normal;font-size:.8rem;font-weight:700;font-family:var(--reco-font-bubble);color:var(--reco-primary)}.loading-icon[_ngcontent-%COMP%]{font-size:18px;width:18px;height:18px;flex-shrink:0;color:var(--reco-primary);animation:_ngcontent-%COMP%_note-pulse 1.5s ease-in-out infinite}.loading-phrase[_ngcontent-%COMP%]{min-width:0;font-family:var(--reco-font-bubble);color:var(--reco-primary)}@keyframes _ngcontent-%COMP%_note-pulse{0%,to{opacity:.35;transform:scale(.95)}50%{opacity:1;transform:scale(1.05)}}.error-banner[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;padding:10px 14px;border-radius:8px;background-color:#ff525226;color:var(--reco-error);font-size:.875rem;font-family:var(--reco-font-bubble);border:1px solid rgba(255,82,82,.3)}.error-banner--rate-limit[_ngcontent-%COMP%]{background-color:var(--reco-accent-dim);color:var(--reco-accent);border-color:#ff2ebe4d}.input-area[_ngcontent-%COMP%]{display:flex;align-items:center;gap:12px;padding:10px 16px;border-top:1px solid var(--reco-border);flex-shrink:0;background-color:var(--reco-surface-0);--mdc-outlined-text-field-label-text-font: var(--reco-font-bubble);--mdc-outlined-text-field-input-text-color: var(--reco-text);--mdc-outlined-text-field-label-text-color: var(--reco-text-muted);--mdc-outlined-text-field-focus-label-text-color: var(--reco-primary);--mdc-outlined-text-field-outline-color: var(--reco-border-strong);--mdc-outlined-text-field-focus-outline-color: var(--reco-primary);--mdc-outlined-text-field-hover-outline-color: var(--reco-primary);--mdc-outlined-text-field-caret-color: var(--reco-primary);--mdc-outlined-text-field-disabled-outline-color: var(--reco-border);--mat-form-field-focus-select-arrow-color: var(--reco-primary);--mdc-fab-container-color: var(--reco-primary);--mdc-fab-icon-color: #ffffff;--mat-fab-foreground-color:#ffffff}.prompt-field[_ngcontent-%COMP%]{flex:1}.prompt-field--hint[_ngcontent-%COMP%]{--mdc-outlined-text-field-input-text-color: var(--reco-text-disabled)}']})};var ru=class t{static \u0275fac=function(e){return new(e||t)};static \u0275cmp=k({type:t,selectors:[["app-root"]],decls:1,vars:0,template:function(e,i){e&1&&j(0,"app-chat")},dependencies:[iu],styles:["[_nghost-%COMP%]{display:block;height:100vh}"]})};Mh(ru,Xy).catch(t=>console.error(t));

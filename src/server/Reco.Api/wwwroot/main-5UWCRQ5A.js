var Ob=Object.defineProperty,Fb=Object.defineProperties;var Pb=Object.getOwnPropertyDescriptors;var Yf=Object.getOwnPropertySymbols;var Lb=Object.prototype.hasOwnProperty,Vb=Object.prototype.propertyIsEnumerable;var Zf=(e,n,t)=>n in e?Ob(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t,E=(e,n)=>{for(var t in n||={})Lb.call(n,t)&&Zf(e,t,n[t]);if(Yf)for(var t of Yf(n))Vb.call(n,t)&&Zf(e,t,n[t]);return e},Z=(e,n)=>Fb(e,Pb(n));var Ae=null,Fi=!1,Fl=1,jb=null,Ce=Symbol("SIGNAL");function M(e){let n=Ae;return Ae=e,n}function ji(){return Ae}var xn={version:0,lastCleanEpoch:0,dirty:!1,producers:void 0,producersTail:void 0,consumers:void 0,consumersTail:void 0,recomputing:!1,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,kind:"unknown",producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function In(e){if(Fi)throw new Error("");if(Ae===null)return;Ae.consumerOnSignalRead(e);let n=Ae.producersTail;if(n!==void 0&&n.producer===e)return;let t,r=Ae.recomputing;if(r&&(t=n!==void 0?n.nextProducer:Ae.producers,t!==void 0&&t.producer===e)){Ae.producersTail=t,t.lastReadVersion=e.version;return}let o=e.consumersTail;if(o!==void 0&&o.consumer===Ae&&(!r||Hb(o,Ae)))return;let i=hr(Ae),s={producer:e,consumer:Ae,nextProducer:t,prevConsumer:o,lastReadVersion:e.version,nextConsumer:void 0};Ae.producersTail=s,n!==void 0?n.nextProducer=s:Ae.producers=s,i&&Jf(e,s)}function Qf(){Fl++}function Bi(e){if(!(hr(e)&&!e.dirty)&&!(!e.dirty&&e.lastCleanEpoch===Fl)){if(!e.producerMustRecompute(e)&&!pr(e)){Vi(e);return}e.producerRecomputeValue(e),Vi(e)}}function Pl(e){if(e.consumers===void 0)return;let n=Fi;Fi=!0;try{for(let t=e.consumers;t!==void 0;t=t.nextConsumer){let r=t.consumer;r.dirty||Bb(r)}}finally{Fi=n}}function Ll(){return Ae?.consumerAllowSignalWrites!==!1}function Bb(e){e.dirty=!0,Pl(e),e.consumerMarkedDirty?.(e)}function Vi(e){e.dirty=!1,e.lastCleanEpoch=Fl}function tn(e){return e&&Kf(e),M(e)}function Kf(e){e.producersTail=void 0,e.recomputing=!0}function Mn(e,n){M(n),e&&Xf(e)}function Xf(e){e.recomputing=!1;let n=e.producersTail,t=n!==void 0?n.nextProducer:e.producers;if(t!==void 0){if(hr(e))do t=Vl(t);while(t!==void 0);n!==void 0?n.nextProducer=void 0:e.producers=void 0}}function pr(e){for(let n=e.producers;n!==void 0;n=n.nextProducer){let t=n.producer,r=n.lastReadVersion;if(r!==t.version||(Bi(t),r!==t.version))return!0}return!1}function nn(e){if(hr(e)){let n=e.producers;for(;n!==void 0;)n=Vl(n)}e.producers=void 0,e.producersTail=void 0,e.consumers=void 0,e.consumersTail=void 0}function Jf(e,n){let t=e.consumersTail,r=hr(e);if(t!==void 0?(n.nextConsumer=t.nextConsumer,t.nextConsumer=n):(n.nextConsumer=void 0,e.consumers=n),n.prevConsumer=t,e.consumersTail=n,!r)for(let o=e.producers;o!==void 0;o=o.nextProducer)Jf(o.producer,o)}function Vl(e){let n=e.producer,t=e.nextProducer,r=e.nextConsumer,o=e.prevConsumer;if(e.nextConsumer=void 0,e.prevConsumer=void 0,r!==void 0?r.prevConsumer=o:n.consumersTail=o,o!==void 0)o.nextConsumer=r;else if(n.consumers=r,!hr(n)){let i=n.producers;for(;i!==void 0;)i=Vl(i)}return t}function hr(e){return e.consumerIsAlwaysLive||e.consumers!==void 0}function Hi(e){jb?.(e)}function Hb(e,n){let t=n.producersTail;if(t!==void 0){let r=n.producers;do{if(r===e)return!0;if(r===t)break;r=r.nextProducer}while(r!==void 0)}return!1}function Ui(e,n){return Object.is(e,n)}function go(e,n){let t=Object.create(Ub);t.computation=e,n!==void 0&&(t.equal=n);let r=()=>{if(Bi(t),In(t),t.value===mo)throw t.error;return t.value};return r[Ce]=t,Hi(t),r}var Pi=Symbol("UNSET"),Li=Symbol("COMPUTING"),mo=Symbol("ERRORED"),Ub=Z(E({},xn),{value:Pi,dirty:!0,error:null,equal:Ui,kind:"computed",producerMustRecompute(e){return e.value===Pi||e.value===Li},producerRecomputeValue(e){if(e.value===Li)throw new Error("");let n=e.value;e.value=Li;let t=tn(e),r,o=!1;try{r=e.computation(),M(null),o=n!==Pi&&n!==mo&&r!==mo&&e.equal(n,r)}catch(i){r=mo,e.error=i}finally{Mn(e,t)}if(o){e.value=n;return}e.value=r,e.version++}});function $b(){throw new Error}var ep=$b;function tp(e){ep(e)}function jl(e){ep=e}var zb=null;function Bl(e,n){let t=Object.create(vo);t.value=e,n!==void 0&&(t.equal=n);let r=()=>np(t);return r[Ce]=t,Hi(t),[r,s=>mr(t,s),s=>Hl(t,s)]}function np(e){return In(e),e.value}function mr(e,n){Ll()||tp(e),e.equal(e.value,n)||(e.value=n,Gb(e))}function Hl(e,n){Ll()||tp(e),mr(e,n(e.value))}var vo=Z(E({},xn),{equal:Ui,value:void 0,kind:"signal"});function Gb(e){e.version++,Qf(),Pl(e),zb?.(e)}var Ul=Z(E({},xn),{consumerIsAlwaysLive:!0,consumerAllowSignalWrites:!0,dirty:!0,kind:"effect"});function $l(e){if(e.dirty=!1,e.version>0&&!pr(e))return;e.version++;let n=tn(e);try{e.cleanup(),e.fn()}finally{Mn(e,n)}}function P(e){return typeof e=="function"}function $i(e){let t=e(r=>{Error.call(r),r.stack=new Error().stack});return t.prototype=Object.create(Error.prototype),t.prototype.constructor=t,t}var zi=$i(e=>function(t){e(this),this.message=t?`${t.length} errors occurred during unsubscription:
${t.map((r,o)=>`${o+1}) ${r.toString()}`).join(`
  `)}`:"",this.name="UnsubscriptionError",this.errors=t});function Sn(e,n){if(e){let t=e.indexOf(n);0<=t&&e.splice(t,1)}}var me=class e{constructor(n){this.initialTeardown=n,this.closed=!1,this._parentage=null,this._finalizers=null}unsubscribe(){let n;if(!this.closed){this.closed=!0;let{_parentage:t}=this;if(t)if(this._parentage=null,Array.isArray(t))for(let i of t)i.remove(this);else t.remove(this);let{initialTeardown:r}=this;if(P(r))try{r()}catch(i){n=i instanceof zi?i.errors:[i]}let{_finalizers:o}=this;if(o){this._finalizers=null;for(let i of o)try{rp(i)}catch(s){n=n??[],s instanceof zi?n=[...n,...s.errors]:n.push(s)}}if(n)throw new zi(n)}}add(n){var t;if(n&&n!==this)if(this.closed)rp(n);else{if(n instanceof e){if(n.closed||n._hasParent(this))return;n._addParent(this)}(this._finalizers=(t=this._finalizers)!==null&&t!==void 0?t:[]).push(n)}}_hasParent(n){let{_parentage:t}=this;return t===n||Array.isArray(t)&&t.includes(n)}_addParent(n){let{_parentage:t}=this;this._parentage=Array.isArray(t)?(t.push(n),t):t?[t,n]:n}_removeParent(n){let{_parentage:t}=this;t===n?this._parentage=null:Array.isArray(t)&&Sn(t,n)}remove(n){let{_finalizers:t}=this;t&&Sn(t,n),n instanceof e&&n._removeParent(this)}};me.EMPTY=(()=>{let e=new me;return e.closed=!0,e})();var zl=me.EMPTY;function Gi(e){return e instanceof me||e&&"closed"in e&&P(e.remove)&&P(e.add)&&P(e.unsubscribe)}function rp(e){P(e)?e():e.unsubscribe()}var ot={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1};var gr={setTimeout(e,n,...t){let{delegate:r}=gr;return r?.setTimeout?r.setTimeout(e,n,...t):setTimeout(e,n,...t)},clearTimeout(e){let{delegate:n}=gr;return(n?.clearTimeout||clearTimeout)(e)},delegate:void 0};function Wi(e){gr.setTimeout(()=>{let{onUnhandledError:n}=ot;if(n)n(e);else throw e})}function yo(){}var op=Gl("C",void 0,void 0);function ip(e){return Gl("E",void 0,e)}function sp(e){return Gl("N",e,void 0)}function Gl(e,n,t){return{kind:e,value:n,error:t}}var Tn=null;function vr(e){if(ot.useDeprecatedSynchronousErrorHandling){let n=!Tn;if(n&&(Tn={errorThrown:!1,error:null}),e(),n){let{errorThrown:t,error:r}=Tn;if(Tn=null,t)throw r}}else e()}function ap(e){ot.useDeprecatedSynchronousErrorHandling&&Tn&&(Tn.errorThrown=!0,Tn.error=e)}var An=class extends me{constructor(n){super(),this.isStopped=!1,n?(this.destination=n,Gi(n)&&n.add(this)):this.destination=Yb}static create(n,t,r){return new Rt(n,t,r)}next(n){this.isStopped?ql(sp(n),this):this._next(n)}error(n){this.isStopped?ql(ip(n),this):(this.isStopped=!0,this._error(n))}complete(){this.isStopped?ql(op,this):(this.isStopped=!0,this._complete())}unsubscribe(){this.closed||(this.isStopped=!0,super.unsubscribe(),this.destination=null)}_next(n){this.destination.next(n)}_error(n){try{this.destination.error(n)}finally{this.unsubscribe()}}_complete(){try{this.destination.complete()}finally{this.unsubscribe()}}},Wb=Function.prototype.bind;function Wl(e,n){return Wb.call(e,n)}var Yl=class{constructor(n){this.partialObserver=n}next(n){let{partialObserver:t}=this;if(t.next)try{t.next(n)}catch(r){qi(r)}}error(n){let{partialObserver:t}=this;if(t.error)try{t.error(n)}catch(r){qi(r)}else qi(n)}complete(){let{partialObserver:n}=this;if(n.complete)try{n.complete()}catch(t){qi(t)}}},Rt=class extends An{constructor(n,t,r){super();let o;if(P(n)||!n)o={next:n??void 0,error:t??void 0,complete:r??void 0};else{let i;this&&ot.useDeprecatedNextContext?(i=Object.create(n),i.unsubscribe=()=>this.unsubscribe(),o={next:n.next&&Wl(n.next,i),error:n.error&&Wl(n.error,i),complete:n.complete&&Wl(n.complete,i)}):o=n}this.destination=new Yl(o)}};function qi(e){ot.useDeprecatedSynchronousErrorHandling?ap(e):Wi(e)}function qb(e){throw e}function ql(e,n){let{onStoppedNotification:t}=ot;t&&gr.setTimeout(()=>t(e,n))}var Yb={closed:!0,next:yo,error:qb,complete:yo};var yr=typeof Symbol=="function"&&Symbol.observable||"@@observable";function it(e){return e}function lp(e){return e.length===0?it:e.length===1?e[0]:function(t){return e.reduce((r,o)=>o(r),t)}}var z=(()=>{class e{constructor(t){t&&(this._subscribe=t)}lift(t){let r=new e;return r.source=this,r.operator=t,r}subscribe(t,r,o){let i=Qb(t)?t:new Rt(t,r,o);return vr(()=>{let{operator:s,source:a}=this;i.add(s?s.call(i,a):a?this._subscribe(i):this._trySubscribe(i))}),i}_trySubscribe(t){try{return this._subscribe(t)}catch(r){t.error(r)}}forEach(t,r){return r=cp(r),new r((o,i)=>{let s=new Rt({next:a=>{try{t(a)}catch(l){i(l),s.unsubscribe()}},error:i,complete:o});this.subscribe(s)})}_subscribe(t){var r;return(r=this.source)===null||r===void 0?void 0:r.subscribe(t)}[yr](){return this}pipe(...t){return lp(t)(this)}toPromise(t){return t=cp(t),new t((r,o)=>{let i;this.subscribe(s=>i=s,s=>o(s),()=>r(i))})}}return e.create=n=>new e(n),e})();function cp(e){var n;return(n=e??ot.Promise)!==null&&n!==void 0?n:Promise}function Zb(e){return e&&P(e.next)&&P(e.error)&&P(e.complete)}function Qb(e){return e&&e instanceof An||Zb(e)&&Gi(e)}function Kb(e){return P(e?.lift)}function q(e){return n=>{if(Kb(n))return n.lift(function(t){try{return e(t,this)}catch(r){this.error(r)}});throw new TypeError("Unable to lift unknown Observable type")}}function Q(e,n,t,r,o){return new Zl(e,n,t,r,o)}var Zl=class extends An{constructor(n,t,r,o,i,s){super(n),this.onFinalize=i,this.shouldUnsubscribe=s,this._next=t?function(a){try{t(a)}catch(l){n.error(l)}}:super._next,this._error=o?function(a){try{o(a)}catch(l){n.error(l)}finally{this.unsubscribe()}}:super._error,this._complete=r?function(){try{r()}catch(a){n.error(a)}finally{this.unsubscribe()}}:super._complete}unsubscribe(){var n;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){let{closed:t}=this;super.unsubscribe(),!t&&((n=this.onFinalize)===null||n===void 0||n.call(this))}}};var dp=$i(e=>function(){e(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"});var A=(()=>{class e extends z{constructor(){super(),this.closed=!1,this.currentObservers=null,this.observers=[],this.isStopped=!1,this.hasError=!1,this.thrownError=null}lift(t){let r=new Yi(this,this);return r.operator=t,r}_throwIfClosed(){if(this.closed)throw new dp}next(t){vr(()=>{if(this._throwIfClosed(),!this.isStopped){this.currentObservers||(this.currentObservers=Array.from(this.observers));for(let r of this.currentObservers)r.next(t)}})}error(t){vr(()=>{if(this._throwIfClosed(),!this.isStopped){this.hasError=this.isStopped=!0,this.thrownError=t;let{observers:r}=this;for(;r.length;)r.shift().error(t)}})}complete(){vr(()=>{if(this._throwIfClosed(),!this.isStopped){this.isStopped=!0;let{observers:t}=this;for(;t.length;)t.shift().complete()}})}unsubscribe(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null}get observed(){var t;return((t=this.observers)===null||t===void 0?void 0:t.length)>0}_trySubscribe(t){return this._throwIfClosed(),super._trySubscribe(t)}_subscribe(t){return this._throwIfClosed(),this._checkFinalizedStatuses(t),this._innerSubscribe(t)}_innerSubscribe(t){let{hasError:r,isStopped:o,observers:i}=this;return r||o?zl:(this.currentObservers=null,i.push(t),new me(()=>{this.currentObservers=null,Sn(i,t)}))}_checkFinalizedStatuses(t){let{hasError:r,thrownError:o,isStopped:i}=this;r?t.error(o):i&&t.complete()}asObservable(){let t=new z;return t.source=this,t}}return e.create=(n,t)=>new Yi(n,t),e})(),Yi=class extends A{constructor(n,t){super(),this.destination=n,this.source=t}next(n){var t,r;(r=(t=this.destination)===null||t===void 0?void 0:t.next)===null||r===void 0||r.call(t,n)}error(n){var t,r;(r=(t=this.destination)===null||t===void 0?void 0:t.error)===null||r===void 0||r.call(t,n)}complete(){var n,t;(t=(n=this.destination)===null||n===void 0?void 0:n.complete)===null||t===void 0||t.call(n)}_subscribe(n){var t,r;return(r=(t=this.source)===null||t===void 0?void 0:t.subscribe(n))!==null&&r!==void 0?r:zl}};var Nn=class extends A{constructor(n){super(),this._value=n}get value(){return this.getValue()}_subscribe(n){let t=super._subscribe(n);return!t.closed&&n.next(this._value),t}getValue(){let{hasError:n,thrownError:t,_value:r}=this;if(n)throw t;return this._throwIfClosed(),r}next(n){super.next(this._value=n)}};var bo={now(){return(bo.delegate||Date).now()},delegate:void 0};var Zi=class extends A{constructor(n=1/0,t=1/0,r=bo){super(),this._bufferSize=n,this._windowTime=t,this._timestampProvider=r,this._buffer=[],this._infiniteTimeWindow=!0,this._infiniteTimeWindow=t===1/0,this._bufferSize=Math.max(1,n),this._windowTime=Math.max(1,t)}next(n){let{isStopped:t,_buffer:r,_infiniteTimeWindow:o,_timestampProvider:i,_windowTime:s}=this;t||(r.push(n),!o&&r.push(i.now()+s)),this._trimBuffer(),super.next(n)}_subscribe(n){this._throwIfClosed(),this._trimBuffer();let t=this._innerSubscribe(n),{_infiniteTimeWindow:r,_buffer:o}=this,i=o.slice();for(let s=0;s<i.length&&!n.closed;s+=r?1:2)n.next(i[s]);return this._checkFinalizedStatuses(n),t}_trimBuffer(){let{_bufferSize:n,_timestampProvider:t,_buffer:r,_infiniteTimeWindow:o}=this,i=(o?1:2)*n;if(n<1/0&&i<r.length&&r.splice(0,r.length-i),!o){let s=t.now(),a=0;for(let l=1;l<r.length&&r[l]<=s;l+=2)a=l;a&&r.splice(0,a+1)}}};var Qi=class extends me{constructor(n,t){super()}schedule(n,t=0){return this}};var _o={setInterval(e,n,...t){let{delegate:r}=_o;return r?.setInterval?r.setInterval(e,n,...t):setInterval(e,n,...t)},clearInterval(e){let{delegate:n}=_o;return(n?.clearInterval||clearInterval)(e)},delegate:void 0};var Ki=class extends Qi{constructor(n,t){super(n,t),this.scheduler=n,this.work=t,this.pending=!1}schedule(n,t=0){var r;if(this.closed)return this;this.state=n;let o=this.id,i=this.scheduler;return o!=null&&(this.id=this.recycleAsyncId(i,o,t)),this.pending=!0,this.delay=t,this.id=(r=this.id)!==null&&r!==void 0?r:this.requestAsyncId(i,this.id,t),this}requestAsyncId(n,t,r=0){return _o.setInterval(n.flush.bind(n,this),r)}recycleAsyncId(n,t,r=0){if(r!=null&&this.delay===r&&this.pending===!1)return t;t!=null&&_o.clearInterval(t)}execute(n,t){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;let r=this._execute(n,t);if(r)return r;this.pending===!1&&this.id!=null&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))}_execute(n,t){let r=!1,o;try{this.work(n)}catch(i){r=!0,o=i||new Error("Scheduled action threw falsy error")}if(r)return this.unsubscribe(),o}unsubscribe(){if(!this.closed){let{id:n,scheduler:t}=this,{actions:r}=t;this.work=this.state=this.scheduler=null,this.pending=!1,Sn(r,this),n!=null&&(this.id=this.recycleAsyncId(t,n,null)),this.delay=null,super.unsubscribe()}}};var br=class e{constructor(n,t=e.now){this.schedulerActionCtor=n,this.now=t}schedule(n,t=0,r){return new this.schedulerActionCtor(this,n).schedule(r,t)}};br.now=bo.now;var Xi=class extends br{constructor(n,t=br.now){super(n,t),this.actions=[],this._active=!1}flush(n){let{actions:t}=this;if(this._active){t.push(n);return}let r;this._active=!0;do if(r=n.execute(n.state,n.delay))break;while(n=t.shift());if(this._active=!1,r){for(;n=t.shift();)n.unsubscribe();throw r}}};var up=new Xi(Ki);var kn=new z(e=>e.complete());function fp(e){return e&&P(e.schedule)}function Ql(e){return e[e.length-1]}function Ji(e){return P(Ql(e))?e.pop():void 0}function _t(e){return fp(Ql(e))?e.pop():void 0}function pp(e,n){return typeof Ql(e)=="number"?e.pop():n}function mp(e,n,t,r){function o(i){return i instanceof t?i:new t(function(s){s(i)})}return new(t||(t=Promise))(function(i,s){function a(d){try{c(r.next(d))}catch(u){s(u)}}function l(d){try{c(r.throw(d))}catch(u){s(u)}}function c(d){d.done?i(d.value):o(d.value).then(a,l)}c((r=r.apply(e,n||[])).next())})}function hp(e){var n=typeof Symbol=="function"&&Symbol.iterator,t=n&&e[n],r=0;if(t)return t.call(e);if(e&&typeof e.length=="number")return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(n?"Object is not iterable.":"Symbol.iterator is not defined.")}function Rn(e){return this instanceof Rn?(this.v=e,this):new Rn(e)}function gp(e,n,t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var r=t.apply(e,n||[]),o,i=[];return o=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),a("next"),a("throw"),a("return",s),o[Symbol.asyncIterator]=function(){return this},o;function s(p){return function(m){return Promise.resolve(m).then(p,u)}}function a(p,m){r[p]&&(o[p]=function(D){return new Promise(function(C,w){i.push([p,D,C,w])>1||l(p,D)})},m&&(o[p]=m(o[p])))}function l(p,m){try{c(r[p](m))}catch(D){h(i[0][3],D)}}function c(p){p.value instanceof Rn?Promise.resolve(p.value.v).then(d,u):h(i[0][2],p)}function d(p){l("next",p)}function u(p){l("throw",p)}function h(p,m){p(m),i.shift(),i.length&&l(i[0][0],i[0][1])}}function vp(e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var n=e[Symbol.asyncIterator],t;return n?n.call(e):(e=typeof hp=="function"?hp(e):e[Symbol.iterator](),t={},r("next"),r("throw"),r("return"),t[Symbol.asyncIterator]=function(){return this},t);function r(i){t[i]=e[i]&&function(s){return new Promise(function(a,l){s=e[i](s),o(a,l,s.done,s.value)})}}function o(i,s,a,l){Promise.resolve(l).then(function(c){i({value:c,done:a})},s)}}var es=e=>e&&typeof e.length=="number"&&typeof e!="function";function ts(e){return P(e?.then)}function ns(e){return P(e[yr])}function rs(e){return Symbol.asyncIterator&&P(e?.[Symbol.asyncIterator])}function os(e){return new TypeError(`You provided ${e!==null&&typeof e=="object"?"an invalid object":`'${e}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)}function Xb(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var is=Xb();function ss(e){return P(e?.[is])}function as(e){return gp(this,arguments,function*(){let t=e.getReader();try{for(;;){let{value:r,done:o}=yield Rn(t.read());if(o)return yield Rn(void 0);yield yield Rn(r)}}finally{t.releaseLock()}})}function ls(e){return P(e?.getReader)}function ge(e){if(e instanceof z)return e;if(e!=null){if(ns(e))return Jb(e);if(es(e))return e_(e);if(ts(e))return t_(e);if(rs(e))return yp(e);if(ss(e))return n_(e);if(ls(e))return r_(e)}throw os(e)}function Jb(e){return new z(n=>{let t=e[yr]();if(P(t.subscribe))return t.subscribe(n);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function e_(e){return new z(n=>{for(let t=0;t<e.length&&!n.closed;t++)n.next(e[t]);n.complete()})}function t_(e){return new z(n=>{e.then(t=>{n.closed||(n.next(t),n.complete())},t=>n.error(t)).then(null,Wi)})}function n_(e){return new z(n=>{for(let t of e)if(n.next(t),n.closed)return;n.complete()})}function yp(e){return new z(n=>{o_(e,n).catch(t=>n.error(t))})}function r_(e){return yp(as(e))}function o_(e,n){var t,r,o,i;return mp(this,void 0,void 0,function*(){try{for(t=vp(e);r=yield t.next(),!r.done;){let s=r.value;if(n.next(s),n.closed)return}}catch(s){o={error:s}}finally{try{r&&!r.done&&(i=t.return)&&(yield i.call(t))}finally{if(o)throw o.error}}n.complete()})}function Be(e,n,t,r=0,o=!1){let i=n.schedule(function(){t(),o?e.add(this.schedule(null,r)):this.unsubscribe()},r);if(e.add(i),!o)return i}function cs(e,n=0){return q((t,r)=>{t.subscribe(Q(r,o=>Be(r,e,()=>r.next(o),n),()=>Be(r,e,()=>r.complete(),n),o=>Be(r,e,()=>r.error(o),n)))})}function ds(e,n=0){return q((t,r)=>{r.add(e.schedule(()=>t.subscribe(r),n))})}function bp(e,n){return ge(e).pipe(ds(n),cs(n))}function _p(e,n){return ge(e).pipe(ds(n),cs(n))}function Dp(e,n){return new z(t=>{let r=0;return n.schedule(function(){r===e.length?t.complete():(t.next(e[r++]),t.closed||this.schedule())})})}function Ep(e,n){return new z(t=>{let r;return Be(t,n,()=>{r=e[is](),Be(t,n,()=>{let o,i;try{({value:o,done:i}=r.next())}catch(s){t.error(s);return}i?t.complete():t.next(o)},0,!0)}),()=>P(r?.return)&&r.return()})}function us(e,n){if(!e)throw new Error("Iterable cannot be null");return new z(t=>{Be(t,n,()=>{let r=e[Symbol.asyncIterator]();Be(t,n,()=>{r.next().then(o=>{o.done?t.complete():t.next(o.value)})},0,!0)})})}function Cp(e,n){return us(as(e),n)}function wp(e,n){if(e!=null){if(ns(e))return bp(e,n);if(es(e))return Dp(e,n);if(ts(e))return _p(e,n);if(rs(e))return us(e,n);if(ss(e))return Ep(e,n);if(ls(e))return Cp(e,n)}throw os(e)}function Ye(e,n){return n?wp(e,n):ge(e)}function He(...e){let n=_t(e);return Ye(e,n)}function Kl(e,n){let t=P(e)?e:()=>e,r=o=>o.error(t());return new z(n?o=>n.schedule(r,0,o):r)}function se(e,n){return q((t,r)=>{let o=0;t.subscribe(Q(r,i=>{r.next(e.call(n,i,o++))}))})}var{isArray:i_}=Array;function s_(e,n){return i_(n)?e(...n):e(n)}function fs(e){return se(n=>s_(e,n))}var{isArray:a_}=Array,{getPrototypeOf:l_,prototype:c_,keys:d_}=Object;function ps(e){if(e.length===1){let n=e[0];if(a_(n))return{args:n,keys:null};if(u_(n)){let t=d_(n);return{args:t.map(r=>n[r]),keys:t}}}return{args:e,keys:null}}function u_(e){return e&&typeof e=="object"&&l_(e)===c_}function hs(e,n){return e.reduce((t,r,o)=>(t[r]=n[o],t),{})}function Xl(...e){let n=_t(e),t=Ji(e),{args:r,keys:o}=ps(e);if(r.length===0)return Ye([],n);let i=new z(f_(r,n,o?s=>hs(o,s):it));return t?i.pipe(fs(t)):i}function f_(e,n,t=it){return r=>{xp(n,()=>{let{length:o}=e,i=new Array(o),s=o,a=o;for(let l=0;l<o;l++)xp(n,()=>{let c=Ye(e[l],n),d=!1;c.subscribe(Q(r,u=>{i[l]=u,d||(d=!0,a--),a||r.next(t(i.slice()))},()=>{--s||r.complete()}))},r)},r)}}function xp(e,n,t){e?Be(t,e,n):n()}function Ip(e,n,t,r,o,i,s,a){let l=[],c=0,d=0,u=!1,h=()=>{u&&!l.length&&!c&&n.complete()},p=D=>c<r?m(D):l.push(D),m=D=>{i&&n.next(D),c++;let C=!1;ge(t(D,d++)).subscribe(Q(n,w=>{o?.(w),i?p(w):n.next(w)},()=>{C=!0},void 0,()=>{if(C)try{for(c--;l.length&&c<r;){let w=l.shift();s?Be(n,s,()=>m(w)):m(w)}h()}catch(w){n.error(w)}}))};return e.subscribe(Q(n,p,()=>{u=!0,h()})),()=>{a?.()}}function _r(e,n,t=1/0){return P(n)?_r((r,o)=>se((i,s)=>n(r,i,o,s))(ge(e(r,o))),t):(typeof n=="number"&&(t=n),q((r,o)=>Ip(r,o,e,t)))}function ms(e=1/0){return _r(it,e)}function Mp(){return ms(1)}function Dr(...e){return Mp()(Ye(e,_t(e)))}function Do(...e){let n=Ji(e),{args:t,keys:r}=ps(e),o=new z(i=>{let{length:s}=t;if(!s){i.complete();return}let a=new Array(s),l=s,c=s;for(let d=0;d<s;d++){let u=!1;ge(t[d]).subscribe(Q(i,h=>{u||(u=!0,c--),a[d]=h},()=>l--,void 0,()=>{(!l||!u)&&(c||i.next(r?hs(r,a):a),i.complete())}))}});return n?o.pipe(fs(n)):o}function Jl(...e){let n=_t(e),t=pp(e,1/0),r=e;return r.length?r.length===1?ge(r[0]):ms(t)(Ye(r,n)):kn}function Ot(e,n){return q((t,r)=>{let o=0;t.subscribe(Q(r,i=>e.call(n,i,o++)&&r.next(i)))})}function gs(e){return q((n,t)=>{let r=null,o=!1,i;r=n.subscribe(Q(t,void 0,void 0,s=>{i=ge(e(s,gs(e)(n))),r?(r.unsubscribe(),r=null,i.subscribe(t)):o=!0})),o&&(r.unsubscribe(),r=null,i.subscribe(t))})}function ec(e,n){return P(n)?_r(e,n,1):_r(e,1)}function tc(e,n=up){return q((t,r)=>{let o=null,i=null,s=null,a=()=>{if(o){o.unsubscribe(),o=null;let c=i;i=null,r.next(c)}};function l(){let c=s+e,d=n.now();if(d<c){o=this.schedule(void 0,c-d),r.add(o);return}a()}t.subscribe(Q(r,c=>{i=c,s=n.now(),o||(o=n.schedule(l,e),r.add(o))},()=>{a(),r.complete()},void 0,()=>{i=o=null}))})}function Eo(e){return e<=0?()=>kn:q((n,t)=>{let r=0;n.subscribe(Q(t,o=>{++r<=e&&(t.next(o),e<=r&&t.complete())}))})}function nc(e,n=it){return e=e??p_,q((t,r)=>{let o,i=!0;t.subscribe(Q(r,s=>{let a=n(s);(i||!e(o,a))&&(i=!1,o=a,r.next(s))}))})}function p_(e,n){return e===n}function Co(e){return q((n,t)=>{try{n.subscribe(t)}finally{t.add(e)}})}function rc(){return q((e,n)=>{let t,r=!1;e.subscribe(Q(n,o=>{let i=t;t=o,r&&n.next([i,o]),r=!0}))})}function wo(e={}){let{connector:n=()=>new A,resetOnError:t=!0,resetOnComplete:r=!0,resetOnRefCountZero:o=!0}=e;return i=>{let s,a,l,c=0,d=!1,u=!1,h=()=>{a?.unsubscribe(),a=void 0},p=()=>{h(),s=l=void 0,d=u=!1},m=()=>{let D=s;p(),D?.unsubscribe()};return q((D,C)=>{c++,!u&&!d&&h();let w=l=l??n();C.add(()=>{c--,c===0&&!u&&!d&&(a=oc(m,o))}),w.subscribe(C),!s&&c>0&&(s=new Rt({next:ie=>w.next(ie),error:ie=>{u=!0,h(),a=oc(p,t,ie),w.error(ie)},complete:()=>{d=!0,h(),a=oc(p,r),w.complete()}}),ge(D).subscribe(s))})(i)}}function oc(e,n,...t){if(n===!0){e();return}if(n===!1)return;let r=new Rt({next:()=>{r.unsubscribe(),e()}});return ge(n(...t)).subscribe(r)}function ic(e,n,t){let r,o=!1;return e&&typeof e=="object"?{bufferSize:r=1/0,windowTime:n=1/0,refCount:o=!1,scheduler:t}=e:r=e??1/0,wo({connector:()=>new Zi(r,n,t),resetOnError:!0,resetOnComplete:!1,resetOnRefCountZero:o})}function xo(e){return Ot((n,t)=>e<=t)}function Io(...e){let n=_t(e);return q((t,r)=>{(n?Dr(e,t,n):Dr(e,t)).subscribe(r)})}function sc(e,n){return q((t,r)=>{let o=null,i=0,s=!1,a=()=>s&&!o&&r.complete();t.subscribe(Q(r,l=>{o?.unsubscribe();let c=0,d=i++;ge(e(l,d)).subscribe(o=Q(r,u=>r.next(n?n(l,u,d,c++):u),()=>{o=null,a()}))},()=>{s=!0,a()}))})}function st(e){return q((n,t)=>{ge(e).subscribe(Q(t,()=>t.complete(),yo)),!t.closed&&n.subscribe(t)})}function Mo(e,n,t){let r=P(e)||n||t?{next:e,error:n,complete:t}:e;return r?q((o,i)=>{var s;(s=r.subscribe)===null||s===void 0||s.call(r);let a=!0;o.subscribe(Q(i,l=>{var c;(c=r.next)===null||c===void 0||c.call(r,l),i.next(l)},()=>{var l;a=!1,(l=r.complete)===null||l===void 0||l.call(r),i.complete()},l=>{var c;a=!1,(c=r.error)===null||c===void 0||c.call(r,l),i.error(l)},()=>{var l,c;a&&((l=r.unsubscribe)===null||l===void 0||l.call(r)),(c=r.finalize)===null||c===void 0||c.call(r)}))}):it}var ac;function vs(){return ac}function Dt(e){let n=ac;return ac=e,n}var Sp=Symbol("NotFound");function Er(e){return e===Sp||e?.name==="\u0275NotFound"}function Tp(e){let n=M(null);try{return e()}finally{M(n)}}var ws="https://angular.dev/best-practices/security#preventing-cross-site-scripting-xss",I=class extends Error{code;constructor(n,t){super(wr(n,t)),this.code=n}};function h_(e){return`NG0${Math.abs(e)}`}function wr(e,n){return`${h_(e)}${n?": "+n:""}`}var an=globalThis;function ee(e){for(let n in e)if(e[n]===ee)return n;throw Error("")}function Op(e,n){for(let t in n)n.hasOwnProperty(t)&&!e.hasOwnProperty(t)&&(e[t]=n[t])}function xs(e){if(typeof e=="string")return e;if(Array.isArray(e))return`[${e.map(xs).join(", ")}]`;if(e==null)return""+e;let n=e.overriddenName||e.name;if(n)return`${n}`;let t=e.toString();if(t==null)return""+t;let r=t.indexOf(`
`);return r>=0?t.slice(0,r):t}function Is(e,n){return e?n?`${e} ${n}`:e:n||""}var m_=ee({__forward_ref__:ee});function Pt(e){return e.__forward_ref__=Pt,e}function Se(e){return _c(e)?e():e}function _c(e){return typeof e=="function"&&e.hasOwnProperty(m_)&&e.__forward_ref__===Pt}function v(e){return{token:e.token,providedIn:e.providedIn||null,factory:e.factory,value:void 0}}function J(e){return{providers:e.providers||[],imports:e.imports||[]}}function Ms(e){return g_(e,Ss)}function g_(e,n){return e.hasOwnProperty(n)&&e[n]||null}function v_(e){let n=e?.[Ss]??null;return n||null}function cc(e){return e&&e.hasOwnProperty(bs)?e[bs]:null}var Ss=ee({\u0275prov:ee}),bs=ee({\u0275inj:ee}),g=class{_desc;ngMetadataName="InjectionToken";\u0275prov;constructor(n,t){this._desc=n,this.\u0275prov=void 0,typeof t=="number"?this.__NG_ELEMENT_ID__=t:t!==void 0&&(this.\u0275prov=v({token:this,providedIn:t.providedIn||"root",factory:t.factory}))}get multi(){return this}toString(){return`InjectionToken ${this._desc}`}};function Dc(e){return e&&!!e.\u0275providers}var Ec=ee({\u0275cmp:ee}),Cc=ee({\u0275dir:ee}),wc=ee({\u0275pipe:ee});var To=ee({\u0275fac:ee}),Vn=ee({__NG_ELEMENT_ID__:ee}),Ap=ee({__NG_ENV_ID__:ee});function ln(e){return Ic(e,"@Component"),e[Ec]||null}function xc(e){return Ic(e,"@Directive"),e[Cc]||null}function Fp(e){return Ic(e,"@Pipe"),e[wc]||null}function Ic(e,n){if(e==null)throw new I(-919,!1)}function Oo(e){return typeof e=="string"?e:e==null?"":String(e)}var Pp=ee({ngErrorCode:ee}),y_=ee({ngErrorMessage:ee}),b_=ee({ngTokenPath:ee});function Mc(e,n){return Lp("",-200,n)}function Ts(e,n){throw new I(-201,!1)}function Lp(e,n,t){let r=new I(n,e);return r[Pp]=n,r[y_]=e,t&&(r[b_]=t),r}function __(e){return e[Pp]}var dc;function Vp(){return dc}function Oe(e){let n=dc;return dc=e,n}function Sc(e,n,t){let r=Ms(e);if(r&&r.providedIn=="root")return r.value===void 0?r.value=r.factory():r.value;if(t&8)return null;if(n!==void 0)return n;Ts(e,"")}var D_={},On=D_,E_="__NG_DI_FLAG__",uc=class{injector;constructor(n){this.injector=n}retrieve(n,t){let r=Fn(t)||0;try{return this.injector.get(n,r&8?null:On,r)}catch(o){if(Er(o))return o;throw o}}};function C_(e,n=0){let t=vs();if(t===void 0)throw new I(-203,!1);if(t===null)return Sc(e,void 0,n);{let r=w_(n),o=t.retrieve(e,r);if(Er(o)){if(r.optional)return null;throw o}return o}}function x(e,n=0){return(Vp()||C_)(Se(e),n)}function f(e,n){return x(e,Fn(n))}function Fn(e){return typeof e>"u"||typeof e=="number"?e:0|(e.optional&&8)|(e.host&&1)|(e.self&&2)|(e.skipSelf&&4)}function w_(e){return{optional:!!(e&8),host:!!(e&1),self:!!(e&2),skipSelf:!!(e&4)}}function fc(e){let n=[];for(let t=0;t<e.length;t++){let r=Se(e[t]);if(Array.isArray(r)){if(r.length===0)throw new I(900,!1);let o,i=0;for(let s=0;s<r.length;s++){let a=r[s],l=x_(a);typeof l=="number"?l===-1?o=a.token:i|=l:o=a}n.push(x(o,i))}else n.push(x(r))}return n}function x_(e){return e[E_]}function rn(e,n){let t=e.hasOwnProperty(To);return t?e[To]:null}function jp(e,n,t){if(e.length!==n.length)return!1;for(let r=0;r<e.length;r++){let o=e[r],i=n[r];if(t&&(o=t(o),i=t(i)),i!==o)return!1}return!0}function Bp(e){return e.flat(Number.POSITIVE_INFINITY)}function As(e,n){e.forEach(t=>Array.isArray(t)?As(t,n):n(t))}function Tc(e,n,t){n>=e.length?e.push(t):e.splice(n,0,t)}function Fo(e,n){return n>=e.length-1?e.pop():e.splice(n,1)[0]}function Hp(e,n){let t=[];for(let r=0;r<e;r++)t.push(n);return t}function Up(e,n,t,r){let o=e.length;if(o==n)e.push(t,r);else if(o===1)e.push(r,e[0]),e[0]=t;else{for(o--,e.push(e[o-1],e[o]);o>n;){let i=o-2;e[o]=e[i],o--}e[n]=t,e[n+1]=r}}function Ns(e,n,t){let r=xr(e,n);return r>=0?e[r|1]=t:(r=~r,Up(e,r,n,t)),r}function ks(e,n){let t=xr(e,n);if(t>=0)return e[t|1]}function xr(e,n){return I_(e,n,1)}function I_(e,n,t){let r=0,o=e.length>>t;for(;o!==r;){let i=r+(o-r>>1),s=e[i<<t];if(n===s)return i<<t;s>n?o=i:r=i+1}return~(o<<t)}var cn={},Ne=[],jn=new g(""),Ac=new g("",-1),Nc=new g(""),Ao=class{get(n,t=On){if(t===On){let o=Lp("",-201);throw o.name="\u0275NotFound",o}return t}};function Bn(e){return{\u0275providers:e}}function $p(e){return Bn([{provide:jn,multi:!0,useValue:e}])}function zp(...e){return{\u0275providers:kc(!0,e),\u0275fromNgModule:!0}}function kc(e,...n){let t=[],r=new Set,o,i=s=>{t.push(s)};return As(n,s=>{let a=s;_s(a,i,[],r)&&(o||=[],o.push(a))}),o!==void 0&&Gp(o,i),t}function Gp(e,n){for(let t=0;t<e.length;t++){let{ngModule:r,providers:o}=e[t];Rc(o,i=>{n(i,r)})}}function _s(e,n,t,r){if(e=Se(e),!e)return!1;let o=null,i=cc(e),s=!i&&ln(e);if(!i&&!s){let l=e.ngModule;if(i=cc(l),i)o=l;else return!1}else{if(s&&!s.standalone)return!1;o=e}let a=r.has(o);if(s){if(a)return!1;if(r.add(o),s.dependencies){let l=typeof s.dependencies=="function"?s.dependencies():s.dependencies;for(let c of l)_s(c,n,t,r)}}else if(i){if(i.imports!=null&&!a){r.add(o);let c;As(i.imports,d=>{_s(d,n,t,r)&&(c||=[],c.push(d))}),c!==void 0&&Gp(c,n)}if(!a){let c=rn(o)||(()=>new o);n({provide:o,useFactory:c,deps:Ne},o),n({provide:Nc,useValue:o,multi:!0},o),n({provide:jn,useValue:()=>x(o),multi:!0},o)}let l=i.providers;if(l!=null&&!a){let c=e;Rc(l,d=>{n(d,c)})}}else return!1;return o!==e&&e.providers!==void 0}function Rc(e,n){for(let t of e)Dc(t)&&(t=t.\u0275providers),Array.isArray(t)?Rc(t,n):n(t)}var M_=ee({provide:String,useValue:ee});function Wp(e){return e!==null&&typeof e=="object"&&M_ in e}function S_(e){return!!(e&&e.useExisting)}function T_(e){return!!(e&&e.useFactory)}function Pn(e){return typeof e=="function"}function qp(e){return!!e.useClass}var Po=new g(""),ys={},Np={},lc;function Ir(){return lc===void 0&&(lc=new Ao),lc}var be=class{},Ln=class extends be{parent;source;scopes;records=new Map;_ngOnDestroyHooks=new Set;_onDestroyHooks=[];get destroyed(){return this._destroyed}_destroyed=!1;injectorDefTypes;constructor(n,t,r,o){super(),this.parent=t,this.source=r,this.scopes=o,hc(n,s=>this.processProvider(s)),this.records.set(Ac,Cr(void 0,this)),o.has("environment")&&this.records.set(be,Cr(void 0,this));let i=this.records.get(Po);i!=null&&typeof i.value=="string"&&this.scopes.add(i.value),this.injectorDefTypes=new Set(this.get(Nc,Ne,{self:!0}))}retrieve(n,t){let r=Fn(t)||0;try{return this.get(n,On,r)}catch(o){if(Er(o))return o;throw o}}destroy(){So(this),this._destroyed=!0;let n=M(null);try{for(let r of this._ngOnDestroyHooks)r.ngOnDestroy();let t=this._onDestroyHooks;this._onDestroyHooks=[];for(let r of t)r()}finally{this.records.clear(),this._ngOnDestroyHooks.clear(),this.injectorDefTypes.clear(),M(n)}}onDestroy(n){return So(this),this._onDestroyHooks.push(n),()=>this.removeOnDestroy(n)}runInContext(n){So(this);let t=Dt(this),r=Oe(void 0),o;try{return n()}finally{Dt(t),Oe(r)}}get(n,t=On,r){if(So(this),n.hasOwnProperty(Ap))return n[Ap](this);let o=Fn(r),i,s=Dt(this),a=Oe(void 0);try{if(!(o&4)){let c=this.records.get(n);if(c===void 0){let d=O_(n)&&Ms(n);d&&this.injectableDefInScope(d)?c=Cr(pc(n),ys):c=null,this.records.set(n,c)}if(c!=null)return this.hydrate(n,c,o)}let l=o&2?Ir():this.parent;return t=o&8&&t===On?null:t,l.get(n,t)}catch(l){let c=__(l);throw c===-200||c===-201?new I(c,null):l}finally{Oe(a),Dt(s)}}resolveInjectorInitializers(){let n=M(null),t=Dt(this),r=Oe(void 0),o;try{let i=this.get(jn,Ne,{self:!0});for(let s of i)s()}finally{Dt(t),Oe(r),M(n)}}toString(){return"R3Injector[...]"}processProvider(n){n=Se(n);let t=Pn(n)?n:Se(n&&n.provide),r=N_(n);if(!Pn(n)&&n.multi===!0){let o=this.records.get(t);o||(o=Cr(void 0,ys,!0),o.factory=()=>fc(o.multi),this.records.set(t,o)),t=n,o.multi.push(n)}this.records.set(t,r)}hydrate(n,t,r){let o=M(null);try{if(t.value===Np)throw Mc("");return t.value===ys&&(t.value=Np,t.value=t.factory(void 0,r)),typeof t.value=="object"&&t.value&&R_(t.value)&&this._ngOnDestroyHooks.add(t.value),t.value}finally{M(o)}}injectableDefInScope(n){if(!n.providedIn)return!1;let t=Se(n.providedIn);return typeof t=="string"?t==="any"||this.scopes.has(t):this.injectorDefTypes.has(t)}removeOnDestroy(n){let t=this._onDestroyHooks.indexOf(n);t!==-1&&this._onDestroyHooks.splice(t,1)}};function pc(e){let n=Ms(e),t=n!==null?n.factory:rn(e);if(t!==null)return t;if(e instanceof g)throw new I(-204,!1);if(e instanceof Function)return A_(e);throw new I(-204,!1)}function A_(e){if(e.length>0)throw new I(-204,!1);let t=v_(e);return t!==null?()=>t.factory(e):()=>new e}function N_(e){if(Wp(e))return Cr(void 0,e.useValue);{let n=Oc(e);return Cr(n,ys)}}function Oc(e,n,t){let r;if(Pn(e)){let o=Se(e);return rn(o)||pc(o)}else if(Wp(e))r=()=>Se(e.useValue);else if(T_(e))r=()=>e.useFactory(...fc(e.deps||[]));else if(S_(e))r=(o,i)=>x(Se(e.useExisting),i!==void 0&&i&8?8:void 0);else{let o=Se(e&&(e.useClass||e.provide));if(k_(e))r=()=>new o(...fc(e.deps));else return rn(o)||pc(o)}return r}function So(e){if(e.destroyed)throw new I(-205,!1)}function Cr(e,n,t=!1){return{factory:e,value:n,multi:t?[]:void 0}}function k_(e){return!!e.deps}function R_(e){return e!==null&&typeof e=="object"&&typeof e.ngOnDestroy=="function"}function O_(e){return typeof e=="function"||typeof e=="object"&&e.ngMetadataName==="InjectionToken"}function hc(e,n){for(let t of e)Array.isArray(t)?hc(t,n):t&&Dc(t)?hc(t.\u0275providers,n):n(t)}function Mr(e,n){let t;e instanceof Ln?(So(e),t=e):t=new uc(e);let r,o=Dt(t),i=Oe(void 0);try{return n()}finally{Dt(o),Oe(i)}}function Yp(){return Vp()!==void 0||vs()!=null}var at=0,S=1,T=2,we=3,Ze=4,Fe=5,Hn=6,Sr=7,_e=8,Lt=9,lt=10,ue=11,Tr=12,Fc=13,Un=14,Pe=15,dn=16,$n=17,Ct=18,Vt=19,Pc=20,Ft=21,Rs=22,on=23,Ge=24,zn=25,un=26,ve=27,Zp=1,Lc=6,fn=7,Lo=8,Gn=9,ye=10;function jt(e){return Array.isArray(e)&&typeof e[Zp]=="object"}function ct(e){return Array.isArray(e)&&e[Zp]===!0}function Vc(e){return(e.flags&4)!==0}function Bt(e){return e.componentOffset>-1}function Vo(e){return(e.flags&1)===1}function wt(e){return!!e.template}function Ar(e){return(e[T]&512)!==0}function Wn(e){return(e[T]&256)===256}var Qp="svg",Kp="math";function Qe(e){for(;Array.isArray(e);)e=e[at];return e}function jc(e,n){return Qe(n[e])}function dt(e,n){return Qe(n[e.index])}function Os(e,n){return e.data[n]}function Bc(e,n){return e[n]}function Hc(e,n,t,r){t>=e.data.length&&(e.data[t]=null,e.blueprint[t]=null),n[t]=r}function Ke(e,n){let t=n[e];return jt(t)?t:t[at]}function Xp(e){return(e[T]&4)===4}function Fs(e){return(e[T]&128)===128}function Jp(e){return ct(e[we])}function Xe(e,n){return n==null?null:e[n]}function Uc(e){e[$n]=0}function $c(e){e[T]&1024||(e[T]|=1024,Fs(e)&&qn(e))}function eh(e,n){for(;e>0;)n=n[Un],e--;return n}function jo(e){return!!(e[T]&9216||e[Ge]?.dirty)}function Ps(e){e[lt].changeDetectionScheduler?.notify(8),e[T]&64&&(e[T]|=1024),jo(e)&&qn(e)}function qn(e){e[lt].changeDetectionScheduler?.notify(0);let n=sn(e);for(;n!==null&&!(n[T]&8192||(n[T]|=8192,!Fs(n)));)n=sn(n)}function zc(e,n){if(Wn(e))throw new I(911,!1);e[Ft]===null&&(e[Ft]=[]),e[Ft].push(n)}function th(e,n){if(e[Ft]===null)return;let t=e[Ft].indexOf(n);t!==-1&&e[Ft].splice(t,1)}function sn(e){let n=e[we];return ct(n)?n[we]:n}function Gc(e){return e[Sr]??=[]}function Wc(e){return e.cleanup??=[]}function nh(e,n,t,r){let o=Gc(n);o.push(t),e.firstCreatePass&&Wc(e).push(r,o.length-1)}var L={lFrame:hh(null),bindingsEnabled:!0,skipHydrationRootTNode:null};var mc=!1;function rh(){return L.lFrame.elementDepthCount}function oh(){L.lFrame.elementDepthCount++}function qc(){L.lFrame.elementDepthCount--}function Yc(){return L.bindingsEnabled}function Zc(){return L.skipHydrationRootTNode!==null}function Qc(e){return L.skipHydrationRootTNode===e}function Kc(){L.skipHydrationRootTNode=null}function k(){return L.lFrame.lView}function De(){return L.lFrame.tView}function xt(e){return L.lFrame.contextLView=e,e[_e]}function It(e){return L.lFrame.contextLView=null,e}function ke(){let e=Xc();for(;e!==null&&e.type===64;)e=e.parent;return e}function Xc(){return L.lFrame.currentTNode}function ih(){let e=L.lFrame,n=e.currentTNode;return e.isParent?n:n.parent}function Nr(e,n){let t=L.lFrame;t.currentTNode=e,t.isParent=n}function Jc(){return L.lFrame.isParent}function ed(){L.lFrame.isParent=!1}function sh(){return L.lFrame.contextLView}function td(){return mc}function No(e){let n=mc;return mc=e,n}function ah(){let e=L.lFrame,n=e.bindingRootIndex;return n===-1&&(n=e.bindingRootIndex=e.tView.bindingStartIndex),n}function lh(e){return L.lFrame.bindingIndex=e}function Yn(){return L.lFrame.bindingIndex++}function nd(e){let n=L.lFrame,t=n.bindingIndex;return n.bindingIndex=n.bindingIndex+e,t}function ch(){return L.lFrame.inI18n}function dh(e,n){let t=L.lFrame;t.bindingIndex=t.bindingRootIndex=e,Ls(n)}function uh(){return L.lFrame.currentDirectiveIndex}function Ls(e){L.lFrame.currentDirectiveIndex=e}function fh(e){let n=L.lFrame.currentDirectiveIndex;return n===-1?null:e[n]}function Vs(){return L.lFrame.currentQueryIndex}function Bo(e){L.lFrame.currentQueryIndex=e}function F_(e){let n=e[S];return n.type===2?n.declTNode:n.type===1?e[Fe]:null}function rd(e,n,t){if(t&4){let o=n,i=e;for(;o=o.parent,o===null&&!(t&1);)if(o=F_(i),o===null||(i=i[Un],o.type&10))break;if(o===null)return!1;n=o,e=i}let r=L.lFrame=ph();return r.currentTNode=n,r.lView=e,!0}function js(e){let n=ph(),t=e[S];L.lFrame=n,n.currentTNode=t.firstChild,n.lView=e,n.tView=t,n.contextLView=e,n.bindingIndex=t.bindingStartIndex,n.inI18n=!1}function ph(){let e=L.lFrame,n=e===null?null:e.child;return n===null?hh(e):n}function hh(e){let n={currentTNode:null,isParent:!0,lView:null,tView:null,selectedIndex:-1,contextLView:null,elementDepthCount:0,currentNamespace:null,currentDirectiveIndex:-1,bindingRootIndex:-1,bindingIndex:-1,currentQueryIndex:0,parent:e,child:null,inI18n:!1};return e!==null&&(e.child=n),n}function mh(){let e=L.lFrame;return L.lFrame=e.parent,e.currentTNode=null,e.lView=null,e}var od=mh;function Bs(){let e=mh();e.isParent=!0,e.tView=null,e.selectedIndex=-1,e.contextLView=null,e.elementDepthCount=0,e.currentDirectiveIndex=-1,e.currentNamespace=null,e.bindingRootIndex=-1,e.bindingIndex=-1,e.currentQueryIndex=0}function gh(e){return(L.lFrame.contextLView=eh(e,L.lFrame.contextLView))[_e]}function Ht(){return L.lFrame.selectedIndex}function pn(e){L.lFrame.selectedIndex=e}function Hs(){let e=L.lFrame;return Os(e.tView,e.selectedIndex)}function vh(){return L.lFrame.currentNamespace}var yh=!0;function Us(){return yh}function $s(e){yh=e}function gc(e,n=null,t=null,r){let o=bh(e,n,t,r);return o.resolveInjectorInitializers(),o}function bh(e,n=null,t=null,r,o=new Set){let i=[t||Ne,zp(e)],s;return new Ln(i,n||Ir(),s||null,o)}var K=class e{static THROW_IF_NOT_FOUND=On;static NULL=new Ao;static create(n,t){if(Array.isArray(n))return gc({name:""},t,n,"");{let r=n.name??"";return gc({name:r},n.parent,n.providers,r)}}static \u0275prov=v({token:e,providedIn:"any",factory:()=>x(Ac)});static __NG_ELEMENT_ID__=-1},F=new g(""),Mt=(()=>{class e{static __NG_ELEMENT_ID__=P_;static __NG_ENV_ID__=t=>t}return e})(),Ds=class extends Mt{_lView;constructor(n){super(),this._lView=n}get destroyed(){return Wn(this._lView)}onDestroy(n){let t=this._lView;return zc(t,n),()=>th(t,n)}};function P_(){return new Ds(k())}var _h=!1,Dh=new g(""),Zn=(()=>{class e{taskId=0;pendingTasks=new Set;destroyed=!1;pendingTask=new Nn(!1);debugTaskTracker=f(Dh,{optional:!0});get hasPendingTasks(){return this.destroyed?!1:this.pendingTask.value}get hasPendingTasksObservable(){return this.destroyed?new z(t=>{t.next(!1),t.complete()}):this.pendingTask}add(){!this.hasPendingTasks&&!this.destroyed&&this.pendingTask.next(!0);let t=this.taskId++;return this.pendingTasks.add(t),this.debugTaskTracker?.add(t),t}has(t){return this.pendingTasks.has(t)}remove(t){this.pendingTasks.delete(t),this.debugTaskTracker?.remove(t),this.pendingTasks.size===0&&this.hasPendingTasks&&this.pendingTask.next(!1)}ngOnDestroy(){this.pendingTasks.clear(),this.hasPendingTasks&&this.pendingTask.next(!1),this.destroyed=!0,this.pendingTask.unsubscribe()}static \u0275prov=v({token:e,providedIn:"root",factory:()=>new e})}return e})(),vc=class extends A{__isAsync;destroyRef=void 0;pendingTasks=void 0;constructor(n=!1){super(),this.__isAsync=n,Yp()&&(this.destroyRef=f(Mt,{optional:!0})??void 0,this.pendingTasks=f(Zn,{optional:!0})??void 0)}emit(n){let t=M(null);try{super.next(n)}finally{M(t)}}subscribe(n,t,r){let o=n,i=t||(()=>null),s=r;if(n&&typeof n=="object"){let l=n;o=l.next?.bind(l),i=l.error?.bind(l),s=l.complete?.bind(l)}this.__isAsync&&(i=this.wrapInTimeout(i),o&&(o=this.wrapInTimeout(o)),s&&(s=this.wrapInTimeout(s)));let a=super.subscribe({next:o,error:i,complete:s});return n instanceof me&&n.add(a),a}wrapInTimeout(n){return t=>{let r=this.pendingTasks?.add();setTimeout(()=>{try{n(t)}finally{r!==void 0&&this.pendingTasks?.remove(r)}})}}},ae=vc;function Es(...e){}function id(e){let n,t;function r(){e=Es;try{t!==void 0&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(t),n!==void 0&&clearTimeout(n)}catch{}}return n=setTimeout(()=>{e(),r()}),typeof requestAnimationFrame=="function"&&(t=requestAnimationFrame(()=>{e(),r()})),()=>r()}function Eh(e){return queueMicrotask(()=>e()),()=>{e=Es}}var sd="isAngularZone",ko=sd+"_ID",L_=0,N=class e{hasPendingMacrotasks=!1;hasPendingMicrotasks=!1;isStable=!0;onUnstable=new ae(!1);onMicrotaskEmpty=new ae(!1);onStable=new ae(!1);onError=new ae(!1);constructor(n){let{enableLongStackTrace:t=!1,shouldCoalesceEventChangeDetection:r=!1,shouldCoalesceRunChangeDetection:o=!1,scheduleInRootZone:i=_h}=n;if(typeof Zone>"u")throw new I(908,!1);Zone.assertZonePatched();let s=this;s._nesting=0,s._outer=s._inner=Zone.current,Zone.TaskTrackingZoneSpec&&(s._inner=s._inner.fork(new Zone.TaskTrackingZoneSpec)),t&&Zone.longStackTraceZoneSpec&&(s._inner=s._inner.fork(Zone.longStackTraceZoneSpec)),s.shouldCoalesceEventChangeDetection=!o&&r,s.shouldCoalesceRunChangeDetection=o,s.callbackScheduled=!1,s.scheduleInRootZone=i,B_(s)}static isInAngularZone(){return typeof Zone<"u"&&Zone.current.get(sd)===!0}static assertInAngularZone(){if(!e.isInAngularZone())throw new I(909,!1)}static assertNotInAngularZone(){if(e.isInAngularZone())throw new I(909,!1)}run(n,t,r){return this._inner.run(n,t,r)}runTask(n,t,r,o){let i=this._inner,s=i.scheduleEventTask("NgZoneEvent: "+o,n,V_,Es,Es);try{return i.runTask(s,t,r)}finally{i.cancelTask(s)}}runGuarded(n,t,r){return this._inner.runGuarded(n,t,r)}runOutsideAngular(n){return this._outer.run(n)}},V_={};function ad(e){if(e._nesting==0&&!e.hasPendingMicrotasks&&!e.isStable)try{e._nesting++,e.onMicrotaskEmpty.emit(null)}finally{if(e._nesting--,!e.hasPendingMicrotasks)try{e.runOutsideAngular(()=>e.onStable.emit(null))}finally{e.isStable=!0}}}function j_(e){if(e.isCheckStableRunning||e.callbackScheduled)return;e.callbackScheduled=!0;function n(){id(()=>{e.callbackScheduled=!1,yc(e),e.isCheckStableRunning=!0,ad(e),e.isCheckStableRunning=!1})}e.scheduleInRootZone?Zone.root.run(()=>{n()}):e._outer.run(()=>{n()}),yc(e)}function B_(e){let n=()=>{j_(e)},t=L_++;e._inner=e._inner.fork({name:"angular",properties:{[sd]:!0,[ko]:t,[ko+t]:!0},onInvokeTask:(r,o,i,s,a,l)=>{if(H_(l))return r.invokeTask(i,s,a,l);try{return kp(e),r.invokeTask(i,s,a,l)}finally{(e.shouldCoalesceEventChangeDetection&&s.type==="eventTask"||e.shouldCoalesceRunChangeDetection)&&n(),Rp(e)}},onInvoke:(r,o,i,s,a,l,c)=>{try{return kp(e),r.invoke(i,s,a,l,c)}finally{e.shouldCoalesceRunChangeDetection&&!e.callbackScheduled&&!U_(l)&&n(),Rp(e)}},onHasTask:(r,o,i,s)=>{r.hasTask(i,s),o===i&&(s.change=="microTask"?(e._hasPendingMicrotasks=s.microTask,yc(e),ad(e)):s.change=="macroTask"&&(e.hasPendingMacrotasks=s.macroTask))},onHandleError:(r,o,i,s)=>(r.handleError(i,s),e.runOutsideAngular(()=>e.onError.emit(s)),!1)})}function yc(e){e._hasPendingMicrotasks||(e.shouldCoalesceEventChangeDetection||e.shouldCoalesceRunChangeDetection)&&e.callbackScheduled===!0?e.hasPendingMicrotasks=!0:e.hasPendingMicrotasks=!1}function kp(e){e._nesting++,e.isStable&&(e.isStable=!1,e.onUnstable.emit(null))}function Rp(e){e._nesting--,ad(e)}var Ro=class{hasPendingMicrotasks=!1;hasPendingMacrotasks=!1;isStable=!0;onUnstable=new ae;onMicrotaskEmpty=new ae;onStable=new ae;onError=new ae;run(n,t,r){return n.apply(t,r)}runGuarded(n,t,r){return n.apply(t,r)}runOutsideAngular(n){return n()}runTask(n,t,r,o){return n.apply(t,r)}};function H_(e){return Ch(e,"__ignore_ng_zone__")}function U_(e){return Ch(e,"__scheduler_tick__")}function Ch(e,n){return!Array.isArray(e)||e.length!==1?!1:e[0]?.data?.[n]===!0}var Ue=class{_console=console;handleError(n){this._console.error("ERROR",n)}},Ut=new g("",{factory:()=>{let e=f(N),n=f(be),t;return r=>{e.runOutsideAngular(()=>{n.destroyed&&!t?setTimeout(()=>{throw r}):(t??=n.get(Ue),t.handleError(r))})}}}),wh={provide:jn,useValue:()=>{let e=f(Ue,{optional:!0})},multi:!0},$_=new g("",{factory:()=>{let e=f(F).defaultView;if(!e)return;let n=f(Ut),t=i=>{n(i.reason),i.preventDefault()},r=i=>{i.error?n(i.error):n(new Error(i.message,{cause:i})),i.preventDefault()},o=()=>{e.addEventListener("unhandledrejection",t),e.addEventListener("error",r)};typeof Zone<"u"?Zone.root.run(o):o(),f(Mt).onDestroy(()=>{e.removeEventListener("error",r),e.removeEventListener("unhandledrejection",t)})}});function ld(){return Bn([$p(()=>{f($_)})])}function H(e,n){let[t,r,o]=Bl(e,n?.equal),i=t,s=i[Ce];return i.set=r,i.update=o,i.asReadonly=xh.bind(i),i}function xh(){let e=this[Ce];if(e.readonlyFn===void 0){let n=()=>this();n[Ce]=e,e.readonlyFn=n}return e.readonlyFn}var kr=(()=>{class e{view;node;constructor(t,r){this.view=t,this.node=r}static __NG_ELEMENT_ID__=z_}return e})();function z_(){return new kr(k(),ke())}var Et=class{},Ho=new g("",{factory:()=>!0});var cd=new g(""),zs=(()=>{class e{internalPendingTasks=f(Zn);scheduler=f(Et);errorHandler=f(Ut);add(){let t=this.internalPendingTasks.add();return()=>{this.internalPendingTasks.has(t)&&(this.scheduler.notify(11),this.internalPendingTasks.remove(t))}}run(t){let r=this.add();t().catch(this.errorHandler).finally(r)}static \u0275prov=v({token:e,providedIn:"root",factory:()=>new e})}return e})(),Gs=(()=>{class e{static \u0275prov=v({token:e,providedIn:"root",factory:()=>new bc})}return e})(),bc=class{dirtyEffectCount=0;queues=new Map;add(n){this.enqueue(n),this.schedule(n)}schedule(n){n.dirty&&this.dirtyEffectCount++}remove(n){let t=n.zone,r=this.queues.get(t);r.has(n)&&(r.delete(n),n.dirty&&this.dirtyEffectCount--)}enqueue(n){let t=n.zone;this.queues.has(t)||this.queues.set(t,new Set);let r=this.queues.get(t);r.has(n)||r.add(n)}flush(){for(;this.dirtyEffectCount>0;){let n=!1;for(let[t,r]of this.queues)t===null?n||=this.flushQueue(r):n||=t.run(()=>this.flushQueue(r));n||(this.dirtyEffectCount=0)}}flushQueue(n){let t=!1;for(let r of n)r.dirty&&(this.dirtyEffectCount--,t=!0,r.run());return t}},Cs=class{[Ce];constructor(n){this[Ce]=n}destroy(){this[Ce].destroy()}};function Qn(e,n){let t=n?.injector??f(K),r=n?.manualCleanup!==!0?t.get(Mt):null,o,i=t.get(kr,null,{optional:!0}),s=t.get(Et);return i!==null?(o=q_(i.view,s,e),r instanceof Ds&&r._lView===i.view&&(r=null)):o=Y_(e,t.get(Gs),s),o.injector=t,r!==null&&(o.onDestroyFns=[r.onDestroy(()=>o.destroy())]),new Cs(o)}var Ih=Z(E({},Ul),{cleanupFns:void 0,zone:null,onDestroyFns:null,run(){let e=No(!1);try{$l(this)}finally{No(e)}},cleanup(){if(!this.cleanupFns?.length)return;let e=M(null);try{for(;this.cleanupFns.length;)this.cleanupFns.pop()()}finally{this.cleanupFns=[],M(e)}}}),G_=Z(E({},Ih),{consumerMarkedDirty(){this.scheduler.schedule(this),this.notifier.notify(12)},destroy(){if(nn(this),this.onDestroyFns!==null)for(let e of this.onDestroyFns)e();this.cleanup(),this.scheduler.remove(this)}}),W_=Z(E({},Ih),{consumerMarkedDirty(){this.view[T]|=8192,qn(this.view),this.notifier.notify(13)},destroy(){if(nn(this),this.onDestroyFns!==null)for(let e of this.onDestroyFns)e();this.cleanup(),this.view[on]?.delete(this)}});function q_(e,n,t){let r=Object.create(W_);return r.view=e,r.zone=typeof Zone<"u"?Zone.current:null,r.notifier=n,r.fn=Mh(r,t),e[on]??=new Set,e[on].add(r),r.consumerMarkedDirty(r),r}function Y_(e,n,t){let r=Object.create(G_);return r.fn=Mh(r,e),r.scheduler=n,r.notifier=t,r.zone=typeof Zone<"u"?Zone.current:null,r.scheduler.add(r),r.notifier.notify(12),r}function Mh(e,n){return()=>{n(t=>(e.cleanupFns??=[]).push(t))}}function Xo(e){return{toString:e}.toString()}function iD(e){return typeof e=="function"}function im(e,n,t,r){n!==null?n.applyValueToInputSignal(n,r):e[t]=r}var ea=class{previousValue;currentValue;firstChange;constructor(n,t,r){this.previousValue=n,this.currentValue=t,this.firstChange=r}isFirstChange(){return this.firstChange}},zt=(()=>{let e=()=>sm;return e.ngInherit=!0,e})();function sm(e){return e.type.prototype.ngOnChanges&&(e.setInput=aD),sD}function sD(){let e=lm(this),n=e?.current;if(n){let t=e.previous;if(t===cn)e.previous=n;else for(let r in n)t[r]=n[r];e.current=null,this.ngOnChanges(n)}}function aD(e,n,t,r,o){let i=this.declaredInputs[r],s=lm(e)||lD(e,{previous:cn,current:null}),a=s.current||(s.current={}),l=s.previous,c=l[i];a[i]=new ea(c&&c.currentValue,t,l===cn),im(e,n,o,t)}var am="__ngSimpleChanges__";function lm(e){return e[am]||null}function lD(e,n){return e[am]=n}var Sh=[];var X=function(e,n=null,t){for(let r=0;r<Sh.length;r++){let o=Sh[r];o(e,n,t)}},G=(function(e){return e[e.TemplateCreateStart=0]="TemplateCreateStart",e[e.TemplateCreateEnd=1]="TemplateCreateEnd",e[e.TemplateUpdateStart=2]="TemplateUpdateStart",e[e.TemplateUpdateEnd=3]="TemplateUpdateEnd",e[e.LifecycleHookStart=4]="LifecycleHookStart",e[e.LifecycleHookEnd=5]="LifecycleHookEnd",e[e.OutputStart=6]="OutputStart",e[e.OutputEnd=7]="OutputEnd",e[e.BootstrapApplicationStart=8]="BootstrapApplicationStart",e[e.BootstrapApplicationEnd=9]="BootstrapApplicationEnd",e[e.BootstrapComponentStart=10]="BootstrapComponentStart",e[e.BootstrapComponentEnd=11]="BootstrapComponentEnd",e[e.ChangeDetectionStart=12]="ChangeDetectionStart",e[e.ChangeDetectionEnd=13]="ChangeDetectionEnd",e[e.ChangeDetectionSyncStart=14]="ChangeDetectionSyncStart",e[e.ChangeDetectionSyncEnd=15]="ChangeDetectionSyncEnd",e[e.AfterRenderHooksStart=16]="AfterRenderHooksStart",e[e.AfterRenderHooksEnd=17]="AfterRenderHooksEnd",e[e.ComponentStart=18]="ComponentStart",e[e.ComponentEnd=19]="ComponentEnd",e[e.DeferBlockStateStart=20]="DeferBlockStateStart",e[e.DeferBlockStateEnd=21]="DeferBlockStateEnd",e[e.DynamicComponentStart=22]="DynamicComponentStart",e[e.DynamicComponentEnd=23]="DynamicComponentEnd",e[e.HostBindingsUpdateStart=24]="HostBindingsUpdateStart",e[e.HostBindingsUpdateEnd=25]="HostBindingsUpdateEnd",e})(G||{});function cD(e,n,t){let{ngOnChanges:r,ngOnInit:o,ngDoCheck:i}=n.type.prototype;if(r){let s=sm(n);(t.preOrderHooks??=[]).push(e,s),(t.preOrderCheckHooks??=[]).push(e,s)}o&&(t.preOrderHooks??=[]).push(0-e,o),i&&((t.preOrderHooks??=[]).push(e,i),(t.preOrderCheckHooks??=[]).push(e,i))}function cm(e,n){for(let t=n.directiveStart,r=n.directiveEnd;t<r;t++){let i=e.data[t].type.prototype,{ngAfterContentInit:s,ngAfterContentChecked:a,ngAfterViewInit:l,ngAfterViewChecked:c,ngOnDestroy:d}=i;s&&(e.contentHooks??=[]).push(-t,s),a&&((e.contentHooks??=[]).push(t,a),(e.contentCheckHooks??=[]).push(t,a)),l&&(e.viewHooks??=[]).push(-t,l),c&&((e.viewHooks??=[]).push(t,c),(e.viewCheckHooks??=[]).push(t,c)),d!=null&&(e.destroyHooks??=[]).push(t,d)}}function Qs(e,n,t){dm(e,n,3,t)}function Ks(e,n,t,r){(e[T]&3)===t&&dm(e,n,t,r)}function dd(e,n){let t=e[T];(t&3)===n&&(t&=16383,t+=1,e[T]=t)}function dm(e,n,t,r){let o=r!==void 0?e[$n]&65535:0,i=r??-1,s=n.length-1,a=0;for(let l=o;l<s;l++)if(typeof n[l+1]=="number"){if(a=n[l],r!=null&&a>=r)break}else n[l]<0&&(e[$n]+=65536),(a<i||i==-1)&&(dD(e,t,n,l),e[$n]=(e[$n]&4294901760)+l+2),l++}function Th(e,n){X(G.LifecycleHookStart,e,n);let t=M(null);try{n.call(e)}finally{M(t),X(G.LifecycleHookEnd,e,n)}}function dD(e,n,t,r){let o=t[r]<0,i=t[r+1],s=o?-t[r]:t[r],a=e[s];o?e[T]>>14<e[$n]>>16&&(e[T]&3)===n&&(e[T]+=16384,Th(a,i)):Th(a,i)}var Or=-1,Xn=class{factory;name;injectImpl;resolving=!1;canSeeViewProviders;multi;componentProviders;index;providerFactory;constructor(n,t,r,o){this.factory=n,this.name=o,this.canSeeViewProviders=t,this.injectImpl=r}};function uD(e){return(e.flags&8)!==0}function fD(e){return(e.flags&16)!==0}function pD(e,n,t){let r=0;for(;r<t.length;){let o=t[r];if(typeof o=="number"){if(o!==0)break;r++;let i=t[r++],s=t[r++],a=t[r++];e.setAttribute(n,s,a,i)}else{let i=o,s=t[++r];hD(i)?e.setProperty(n,i,s):e.setAttribute(n,i,s),r++}}return r}function um(e){return e===3||e===4||e===6}function hD(e){return e.charCodeAt(0)===64}function Fr(e,n){if(!(n===null||n.length===0))if(e===null||e.length===0)e=n.slice();else{let t=-1;for(let r=0;r<n.length;r++){let o=n[r];typeof o=="number"?t=o:t===0||(t===-1||t===2?Ah(e,t,o,null,n[++r]):Ah(e,t,o,null,null))}}return e}function Ah(e,n,t,r,o){let i=0,s=e.length;if(n===-1)s=-1;else for(;i<e.length;){let a=e[i++];if(typeof a=="number"){if(a===n){s=-1;break}else if(a>n){s=i-1;break}}}for(;i<e.length;){let a=e[i];if(typeof a=="number")break;if(a===t){o!==null&&(e[i+1]=o);return}i++,o!==null&&i++}s!==-1&&(e.splice(s,0,n),i=s+1),e.splice(i++,0,t),o!==null&&e.splice(i++,0,o)}function fm(e){return e!==Or}function ta(e){return e&32767}function mD(e){return e>>16}function na(e,n){let t=mD(e),r=n;for(;t>0;)r=r[Un],t--;return r}var Dd=!0;function ra(e){let n=Dd;return Dd=e,n}var gD=256,pm=gD-1,hm=5,vD=0,St={};function yD(e,n,t){let r;typeof t=="string"?r=t.charCodeAt(0)||0:t.hasOwnProperty(Vn)&&(r=t[Vn]),r==null&&(r=t[Vn]=vD++);let o=r&pm,i=1<<o;n.data[e+(o>>hm)]|=i}function oa(e,n){let t=mm(e,n);if(t!==-1)return t;let r=n[S];r.firstCreatePass&&(e.injectorIndex=n.length,ud(r.data,e),ud(n,null),ud(r.blueprint,null));let o=iu(e,n),i=e.injectorIndex;if(fm(o)){let s=ta(o),a=na(o,n),l=a[S].data;for(let c=0;c<8;c++)n[i+c]=a[s+c]|l[s+c]}return n[i+8]=o,i}function ud(e,n){e.push(0,0,0,0,0,0,0,0,n)}function mm(e,n){return e.injectorIndex===-1||e.parent&&e.parent.injectorIndex===e.injectorIndex||n[e.injectorIndex+8]===null?-1:e.injectorIndex}function iu(e,n){if(e.parent&&e.parent.injectorIndex!==-1)return e.parent.injectorIndex;let t=0,r=null,o=n;for(;o!==null;){if(r=_m(o),r===null)return Or;if(t++,o=o[Un],r.injectorIndex!==-1)return r.injectorIndex|t<<16}return Or}function Ed(e,n,t){yD(e,n,t)}function bD(e,n){if(n==="class")return e.classes;if(n==="style")return e.styles;let t=e.attrs;if(t){let r=t.length,o=0;for(;o<r;){let i=t[o];if(um(i))break;if(i===0)o=o+2;else if(typeof i=="number")for(o++;o<r&&typeof t[o]=="string";)o++;else{if(i===n)return t[o+1];o=o+2}}}return null}function gm(e,n,t){if(t&8||e!==void 0)return e;Ts(n,"NodeInjector")}function vm(e,n,t,r){if(t&8&&r===void 0&&(r=null),(t&3)===0){let o=e[Lt],i=Oe(void 0);try{return o?o.get(n,r,t&8):Sc(n,r,t&8)}finally{Oe(i)}}return gm(r,n,t)}function ym(e,n,t,r=0,o){if(e!==null){if(n[T]&2048&&!(r&2)){let s=CD(e,n,t,r,St);if(s!==St)return s}let i=bm(e,n,t,r,St);if(i!==St)return i}return vm(n,t,r,o)}function bm(e,n,t,r,o){let i=DD(t);if(typeof i=="function"){if(!rd(n,e,r))return r&1?gm(o,t,r):vm(n,t,r,o);try{let s;if(s=i(r),s==null&&!(r&8))Ts(t);else return s}finally{od()}}else if(typeof i=="number"){let s=null,a=mm(e,n),l=Or,c=r&1?n[Pe][Fe]:null;for((a===-1||r&4)&&(l=a===-1?iu(e,n):n[a+8],l===Or||!kh(r,!1)?a=-1:(s=n[S],a=ta(l),n=na(l,n)));a!==-1;){let d=n[S];if(Nh(i,a,d.data)){let u=_D(a,n,t,s,r,c);if(u!==St)return u}l=n[a+8],l!==Or&&kh(r,n[S].data[a+8]===c)&&Nh(i,a,n)?(s=d,a=ta(l),n=na(l,n)):a=-1}}return o}function _D(e,n,t,r,o,i){let s=n[S],a=s.data[e+8],l=r==null?Bt(a)&&Dd:r!=s&&(a.type&3)!==0,c=o&1&&i===a,d=Xs(a,s,t,l,c);return d!==null?Go(n,s,d,a,o):St}function Xs(e,n,t,r,o){let i=e.providerIndexes,s=n.data,a=i&1048575,l=e.directiveStart,c=e.directiveEnd,d=i>>20,u=r?a:a+d,h=o?a+d:c;for(let p=u;p<h;p++){let m=s[p];if(p<l&&t===m||p>=l&&m.type===t)return p}if(o){let p=s[l];if(p&&wt(p)&&p.type===t)return l}return null}function Go(e,n,t,r,o){let i=e[t],s=n.data;if(i instanceof Xn){let a=i;if(a.resolving)throw Mc("");let l=ra(a.canSeeViewProviders);a.resolving=!0;let c=s[t].type||s[t],d,u=a.injectImpl?Oe(a.injectImpl):null,h=rd(e,r,0);try{i=e[t]=a.factory(void 0,o,s,e,r),n.firstCreatePass&&t>=r.directiveStart&&cD(t,s[t],n)}finally{u!==null&&Oe(u),ra(l),a.resolving=!1,od()}}return i}function DD(e){if(typeof e=="string")return e.charCodeAt(0)||0;let n=e.hasOwnProperty(Vn)?e[Vn]:void 0;return typeof n=="number"?n>=0?n&pm:ED:n}function Nh(e,n,t){let r=1<<e;return!!(t[n+(e>>hm)]&r)}function kh(e,n){return!(e&2)&&!(e&1&&n)}var Kn=class{_tNode;_lView;constructor(n,t){this._tNode=n,this._lView=t}get(n,t,r){return ym(this._tNode,this._lView,n,Fn(r),t)}};function ED(){return new Kn(ke(),k())}function tr(e){return Xo(()=>{let n=e.prototype.constructor,t=n[To]||Cd(n),r=Object.prototype,o=Object.getPrototypeOf(e.prototype).constructor;for(;o&&o!==r;){let i=o[To]||Cd(o);if(i&&i!==t)return i;o=Object.getPrototypeOf(o)}return i=>new i})}function Cd(e){return _c(e)?()=>{let n=Cd(Se(e));return n&&n()}:rn(e)}function CD(e,n,t,r,o){let i=e,s=n;for(;i!==null&&s!==null&&s[T]&2048&&!Ar(s);){let a=bm(i,s,t,r|2,St);if(a!==St)return a;let l=i.parent;if(!l){let c=s[Pc];if(c){let d=c.get(t,St,r&-5);if(d!==St)return d}l=_m(s),s=s[Un]}i=l}return o}function _m(e){let n=e[S],t=n.type;return t===2?n.declTNode:t===1?e[Fe]:null}function su(e){return bD(ke(),e)}function wD(){return Br(ke(),k())}function Br(e,n){return new Y(dt(e,n))}var Y=(()=>{class e{nativeElement;constructor(t){this.nativeElement=t}static __NG_ELEMENT_ID__=wD}return e})();function Dm(e){return e instanceof Y?e.nativeElement:e}function xD(){return this._results[Symbol.iterator]()}var ia=class{_emitDistinctChangesOnly;dirty=!0;_onDirty=void 0;_results=[];_changesDetected=!1;_changes=void 0;length=0;first=void 0;last=void 0;get changes(){return this._changes??=new A}constructor(n=!1){this._emitDistinctChangesOnly=n}get(n){return this._results[n]}map(n){return this._results.map(n)}filter(n){return this._results.filter(n)}find(n){return this._results.find(n)}reduce(n,t){return this._results.reduce(n,t)}forEach(n){this._results.forEach(n)}some(n){return this._results.some(n)}toArray(){return this._results.slice()}toString(){return this._results.toString()}reset(n,t){this.dirty=!1;let r=Bp(n);(this._changesDetected=!jp(this._results,r,t))&&(this._results=r,this.length=r.length,this.last=r[this.length-1],this.first=r[0])}notifyOnChanges(){this._changes!==void 0&&(this._changesDetected||!this._emitDistinctChangesOnly)&&this._changes.next(this)}onDirty(n){this._onDirty=n}setDirty(){this.dirty=!0,this._onDirty?.()}destroy(){this._changes!==void 0&&(this._changes.complete(),this._changes.unsubscribe())}[Symbol.iterator]=xD};function Em(e){return(e.flags&128)===128}var au=(function(e){return e[e.OnPush=0]="OnPush",e[e.Eager=1]="Eager",e[e.Default=1]="Default",e})(au||{}),Cm=new Map,ID=0;function MD(){return ID++}function SD(e){Cm.set(e[Vt],e)}function wd(e){Cm.delete(e[Vt])}var Rh="__ngContext__";function Pr(e,n){jt(n)?(e[Rh]=n[Vt],SD(n)):e[Rh]=n}function wm(e){return Im(e[Tr])}function xm(e){return Im(e[Ze])}function Im(e){for(;e!==null&&!ct(e);)e=e[Ze];return e}var xd;function lu(e){xd=e}function Mm(){if(xd!==void 0)return xd;if(typeof document<"u")return document;throw new I(210,!1)}var Hr=new g("",{factory:()=>TD}),TD="ng";var ha=new g(""),nr=new g("",{providedIn:"platform",factory:()=>"unknown"}),Jo=new g(""),rr=new g("",{factory:()=>f(F).body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce")||null});var Sm="r";var Tm="di";var Am=!1,Nm=new g("",{factory:()=>Am});var AD=(e,n,t,r)=>{};function ND(e,n,t,r){AD(e,n,t,r)}function ma(e){return(e.flags&32)===32}var kD=()=>null;function km(e,n,t=!1){return kD(e,n,t)}function Rm(e,n){let t=e.contentQueries;if(t!==null){let r=M(null);try{for(let o=0;o<t.length;o+=2){let i=t[o],s=t[o+1];if(s!==-1){let a=e.data[s];Bo(i),a.contentQueries(2,n[s],s)}}}finally{M(r)}}}function Id(e,n,t){Bo(0);let r=M(null);try{n(e,t)}finally{M(r)}}function Om(e,n,t){if(Vc(n)){let r=M(null);try{let o=n.directiveStart,i=n.directiveEnd;for(let s=o;s<i;s++){let a=e.data[s];if(a.contentQueries){let l=t[s];a.contentQueries(1,l,s)}}}finally{M(r)}}}var pt=(function(e){return e[e.Emulated=0]="Emulated",e[e.None=2]="None",e[e.ShadowDom=3]="ShadowDom",e[e.ExperimentalIsolatedShadowDom=4]="ExperimentalIsolatedShadowDom",e})(pt||{});var Ws;function RD(){if(Ws===void 0&&(Ws=null,an.trustedTypes))try{Ws=an.trustedTypes.createPolicy("angular",{createHTML:e=>e,createScript:e=>e,createScriptURL:e=>e})}catch{}return Ws}function ga(e){return RD()?.createHTML(e)||e}var qs;function OD(){if(qs===void 0&&(qs=null,an.trustedTypes))try{qs=an.trustedTypes.createPolicy("angular#unsafe-bypass",{createHTML:e=>e,createScript:e=>e,createScriptURL:e=>e})}catch{}return qs}function Oh(e){return OD()?.createHTML(e)||e}var $t=class{changingThisBreaksApplicationSecurity;constructor(n){this.changingThisBreaksApplicationSecurity=n}toString(){return`SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${ws})`}},Md=class extends $t{getTypeName(){return"HTML"}},Sd=class extends $t{getTypeName(){return"Style"}},Td=class extends $t{getTypeName(){return"Script"}},Ad=class extends $t{getTypeName(){return"URL"}},Nd=class extends $t{getTypeName(){return"ResourceURL"}};function ht(e){return e instanceof $t?e.changingThisBreaksApplicationSecurity:e}function Gt(e,n){let t=Fm(e);if(t!=null&&t!==n){if(t==="ResourceURL"&&n==="URL")return!0;throw new Error(`Required a safe ${n}, got a ${t} (see ${ws})`)}return t===n}function Fm(e){return e instanceof $t&&e.getTypeName()||null}function cu(e){return new Md(e)}function du(e){return new Sd(e)}function uu(e){return new Td(e)}function fu(e){return new Ad(e)}function pu(e){return new Nd(e)}function FD(e){let n=new Rd(e);return PD()?new kd(n):n}var kd=class{inertDocumentHelper;constructor(n){this.inertDocumentHelper=n}getInertBodyElement(n){n="<body><remove></remove>"+n;try{let t=new window.DOMParser().parseFromString(ga(n),"text/html").body;return t===null?this.inertDocumentHelper.getInertBodyElement(n):(t.firstChild?.remove(),t)}catch{return null}}},Rd=class{defaultDoc;inertDocument;constructor(n){this.defaultDoc=n,this.inertDocument=this.defaultDoc.implementation.createHTMLDocument("sanitization-inert")}getInertBodyElement(n){let t=this.inertDocument.createElement("template");return t.innerHTML=ga(n),t}};function PD(){try{return!!new window.DOMParser().parseFromString(ga(""),"text/html")}catch{return!1}}var LD=/^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;function ei(e){return e=String(e),e.match(LD)?e:"unsafe:"+e}function Wt(e){let n={};for(let t of e.split(","))n[t]=!0;return n}function ti(...e){let n={};for(let t of e)for(let r in t)t.hasOwnProperty(r)&&(n[r]=!0);return n}var Pm=Wt("area,br,col,hr,img,wbr"),Lm=Wt("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),Vm=Wt("rp,rt"),VD=ti(Vm,Lm),jD=ti(Lm,Wt("address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul")),BD=ti(Vm,Wt("a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video")),Fh=ti(Pm,jD,BD,VD),jm=Wt("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),HD=Wt("abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"),UD=Wt("aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"),$D=ti(jm,HD,UD),zD=Wt("script,style,template");var Od=class{sanitizedSomething=!1;buf=[];sanitizeChildren(n){let t=n.firstChild,r=!0,o=[];for(;t;){if(t.nodeType===Node.ELEMENT_NODE?r=this.startElement(t):t.nodeType===Node.TEXT_NODE?this.chars(t.nodeValue):this.sanitizedSomething=!0,r&&t.firstChild){o.push(t),t=qD(t);continue}for(;t;){t.nodeType===Node.ELEMENT_NODE&&this.endElement(t);let i=WD(t);if(i){t=i;break}t=o.pop()}}return this.buf.join("")}startElement(n){let t=Ph(n).toLowerCase();if(!Fh.hasOwnProperty(t))return this.sanitizedSomething=!0,!zD.hasOwnProperty(t);this.buf.push("<"),this.buf.push(t);let r=n.attributes;for(let o=0;o<r.length;o++){let i=r.item(o),s=i.name,a=s.toLowerCase();if(!$D.hasOwnProperty(a)){this.sanitizedSomething=!0;continue}let l=i.value;jm[a]&&(l=ei(l)),this.buf.push(" ",s,'="',Lh(l),'"')}return this.buf.push(">"),!0}endElement(n){let t=Ph(n).toLowerCase();Fh.hasOwnProperty(t)&&!Pm.hasOwnProperty(t)&&(this.buf.push("</"),this.buf.push(t),this.buf.push(">"))}chars(n){this.buf.push(Lh(n))}};function GD(e,n){return(e.compareDocumentPosition(n)&Node.DOCUMENT_POSITION_CONTAINED_BY)!==Node.DOCUMENT_POSITION_CONTAINED_BY}function WD(e){let n=e.nextSibling;if(n&&e!==n.previousSibling)throw Bm(n);return n}function qD(e){let n=e.firstChild;if(n&&GD(e,n))throw Bm(n);return n}function Ph(e){let n=e.nodeName;return typeof n=="string"?n:"FORM"}function Bm(e){return new Error(`Failed to sanitize html because the element is clobbered: ${e.outerHTML}`)}var YD=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,ZD=/([^\#-~ |!])/g;function Lh(e){return e.replace(/&/g,"&amp;").replace(YD,function(n){let t=n.charCodeAt(0),r=n.charCodeAt(1);return"&#"+((t-55296)*1024+(r-56320)+65536)+";"}).replace(ZD,function(n){return"&#"+n.charCodeAt(0)+";"}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}var Ys;function va(e,n){let t=null;try{Ys=Ys||FD(e);let r=n?String(n):"";t=Ys.getInertBodyElement(r);let o=5,i=r;do{if(o===0)throw new Error("Failed to sanitize html because the input is unstable");o--,r=i,i=t.innerHTML,t=Ys.getInertBodyElement(r)}while(r!==i);let a=new Od().sanitizeChildren(Vh(t)||t);return ga(a)}finally{if(t){let r=Vh(t)||t;for(;r.firstChild;)r.firstChild.remove()}}}function Vh(e){return"content"in e&&QD(e)?e.content:null}function QD(e){return e.nodeType===Node.ELEMENT_NODE&&e.nodeName==="TEMPLATE"}function KD(e,n){return e.createText(n)}function XD(e,n,t){e.setValue(n,t)}function Hm(e,n,t){return e.createElement(n,t)}function sa(e,n,t,r,o){e.insertBefore(n,t,r,o)}function Um(e,n,t){e.appendChild(n,t)}function jh(e,n,t,r,o){r!==null?sa(e,n,t,r,o):Um(e,n,t)}function $m(e,n,t,r){e.removeChild(null,n,t,r)}function JD(e,n,t){e.setAttribute(n,"style",t)}function eE(e,n,t){t===""?e.removeAttribute(n,"class"):e.setAttribute(n,"class",t)}function zm(e,n,t){let{mergedAttrs:r,classes:o,styles:i}=t;r!==null&&pD(e,n,r),o!==null&&eE(e,n,o),i!==null&&JD(e,n,i)}var xe=(function(e){return e[e.NONE=0]="NONE",e[e.HTML=1]="HTML",e[e.STYLE=2]="STYLE",e[e.SCRIPT=3]="SCRIPT",e[e.URL=4]="URL",e[e.RESOURCE_URL=5]="RESOURCE_URL",e})(xe||{});function hu(e){let n=Gm();return n?Oh(n.sanitize(xe.HTML,e)||""):Gt(e,"HTML")?Oh(ht(e)):va(Mm(),Oo(e))}function ya(e){let n=Gm();return n?n.sanitize(xe.URL,e)||"":Gt(e,"URL")?ht(e):ei(Oo(e))}function Gm(){let e=k();return e&&e[lt].sanitizer}function tE(e,n,t){let r=e.length;for(;;){let o=e.indexOf(n,t);if(o===-1)return o;if(o===0||e.charCodeAt(o-1)<=32){let i=n.length;if(o+i===r||e.charCodeAt(o+i)<=32)return o}t=o+1}}var Wm="ng-template";function nE(e,n,t,r){let o=0;if(r){for(;o<n.length&&typeof n[o]=="string";o+=2)if(n[o]==="class"&&tE(n[o+1].toLowerCase(),t,0)!==-1)return!0}else if(mu(e))return!1;if(o=n.indexOf(1,o),o>-1){let i;for(;++o<n.length&&typeof(i=n[o])=="string";)if(i.toLowerCase()===t)return!0}return!1}function mu(e){return e.type===4&&e.value!==Wm}function rE(e,n,t){let r=e.type===4&&!t?Wm:e.value;return n===r}function oE(e,n,t){let r=4,o=e.attrs,i=o!==null?aE(o):0,s=!1;for(let a=0;a<n.length;a++){let l=n[a];if(typeof l=="number"){if(!s&&!ut(r)&&!ut(l))return!1;if(s&&ut(l))continue;s=!1,r=l|r&1;continue}if(!s)if(r&4){if(r=2|r&1,l!==""&&!rE(e,l,t)||l===""&&n.length===1){if(ut(r))return!1;s=!0}}else if(r&8){if(o===null||!nE(e,o,l,t)){if(ut(r))return!1;s=!0}}else{let c=n[++a],d=iE(l,o,mu(e),t);if(d===-1){if(ut(r))return!1;s=!0;continue}if(c!==""){let u;if(d>i?u="":u=o[d+1].toLowerCase(),r&2&&c!==u){if(ut(r))return!1;s=!0}}}}return ut(r)||s}function ut(e){return(e&1)===0}function iE(e,n,t,r){if(n===null)return-1;let o=0;if(r||!t){let i=!1;for(;o<n.length;){let s=n[o];if(s===e)return o;if(s===3||s===6)i=!0;else if(s===1||s===2){let a=n[++o];for(;typeof a=="string";)a=n[++o];continue}else{if(s===4)break;if(s===0){o+=4;continue}}o+=i?1:2}return-1}else return lE(n,e)}function qm(e,n,t=!1){for(let r=0;r<n.length;r++)if(oE(e,n[r],t))return!0;return!1}function sE(e){let n=e.attrs;if(n!=null){let t=n.indexOf(5);if((t&1)===0)return n[t+1]}return null}function aE(e){for(let n=0;n<e.length;n++){let t=e[n];if(um(t))return n}return e.length}function lE(e,n){let t=e.indexOf(4);if(t>-1)for(t++;t<e.length;){let r=e[t];if(typeof r=="number")return-1;if(r===n)return t;t++}return-1}function cE(e,n){e:for(let t=0;t<n.length;t++){let r=n[t];if(e.length===r.length){for(let o=0;o<e.length;o++)if(e[o]!==r[o])continue e;return!0}}return!1}function Bh(e,n){return e?":not("+n.trim()+")":n}function dE(e){let n=e[0],t=1,r=2,o="",i=!1;for(;t<e.length;){let s=e[t];if(typeof s=="string")if(r&2){let a=e[++t];o+="["+s+(a.length>0?'="'+a+'"':"")+"]"}else r&8?o+="."+s:r&4&&(o+=" "+s);else o!==""&&!ut(s)&&(n+=Bh(i,o),o=""),r=s,i=i||!ut(r);t++}return o!==""&&(n+=Bh(i,o)),n}function uE(e){return e.map(dE).join(",")}function fE(e){let n=[],t=[],r=1,o=2;for(;r<e.length;){let i=e[r];if(typeof i=="string")o===2?i!==""&&n.push(i,e[++r]):o===8&&t.push(i);else{if(!ut(o))break;o=i}r++}return t.length&&n.push(1,...t),n}var Je={};function gu(e,n,t,r,o,i,s,a,l,c,d){let u=ve+r,h=u+o,p=pE(u,h),m=typeof c=="function"?c():c;return p[S]={type:e,blueprint:p,template:t,queries:null,viewQuery:a,declTNode:n,data:p.slice().fill(null,u),bindingStartIndex:u,expandoStartIndex:h,hostBindingOpCodes:null,firstCreatePass:!0,firstUpdatePass:!0,staticViewQueries:!1,staticContentQueries:!1,preOrderHooks:null,preOrderCheckHooks:null,contentHooks:null,contentCheckHooks:null,viewHooks:null,viewCheckHooks:null,destroyHooks:null,cleanup:null,contentQueries:null,components:null,directiveRegistry:typeof i=="function"?i():i,pipeRegistry:typeof s=="function"?s():s,firstChild:null,schemas:l,consts:m,incompleteFirstPass:!1,ssrId:d}}function pE(e,n){let t=[];for(let r=0;r<n;r++)t.push(r<e?null:Je);return t}function hE(e){let n=e.tView;return n===null||n.incompleteFirstPass?e.tView=gu(1,null,e.template,e.decls,e.vars,e.directiveDefs,e.pipeDefs,e.viewQuery,e.schemas,e.consts,e.id):n}function vu(e,n,t,r,o,i,s,a,l,c,d){let u=n.blueprint.slice();return u[at]=o,u[T]=r|4|128|8|64|1024,(c!==null||e&&e[T]&2048)&&(u[T]|=2048),Uc(u),u[we]=u[Un]=e,u[_e]=t,u[lt]=s||e&&e[lt],u[ue]=a||e&&e[ue],u[Lt]=l||e&&e[Lt]||null,u[Fe]=i,u[Vt]=MD(),u[Hn]=d,u[Pc]=c,u[Pe]=n.type==2?e[Pe]:u,u}function mE(e,n,t){let r=dt(n,e),o=hE(t),i=e[lt].rendererFactory,s=yu(e,vu(e,o,null,Ym(t),r,n,null,i.createRenderer(r,t),null,null,null));return e[n.index]=s}function Ym(e){let n=16;return e.signals?n=4096:e.onPush&&(n=64),n}function Zm(e,n,t,r){if(t===0)return-1;let o=n.length;for(let i=0;i<t;i++)n.push(r),e.blueprint.push(r),e.data.push(null);return o}function yu(e,n){return e[Tr]?e[Fc][Ze]=n:e[Tr]=n,e[Fc]=n,n}function _(e=1){Qm(De(),k(),Ht()+e,!1)}function Qm(e,n,t,r){if(!r)if((n[T]&3)===3){let i=e.preOrderCheckHooks;i!==null&&Qs(n,i,t)}else{let i=e.preOrderHooks;i!==null&&Ks(n,i,0,t)}pn(t)}var ba=(function(e){return e[e.None=0]="None",e[e.SignalBased=1]="SignalBased",e[e.HasDecoratorInputTransform=2]="HasDecoratorInputTransform",e})(ba||{});function Fd(e,n,t,r){let o=M(null);try{let[i,s,a]=e.inputs[t],l=null;(s&ba.SignalBased)!==0&&(l=n[i][Ce]),l!==null&&l.transformFn!==void 0?r=l.transformFn(r):a!==null&&(r=a.call(n,r)),e.setInput!==null?e.setInput(n,l,r,t,i):im(n,l,i,r)}finally{M(o)}}var Tt=(function(e){return e[e.Important=1]="Important",e[e.DashCase=2]="DashCase",e})(Tt||{}),gE;function bu(e,n){return gE(e,n)}var fF=typeof document<"u"&&typeof document?.documentElement?.getAnimations=="function";var Pd=new WeakMap,Uo=new WeakSet;function vE(e,n){let t=Pd.get(e);if(!t||t.length===0)return;let r=n.parentNode,o=n.previousSibling;for(let i=t.length-1;i>=0;i--){let s=t[i],a=s.parentNode;s===n?(t.splice(i,1),Uo.add(s),s.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}}))):(o&&s===o||a&&r&&a!==r)&&(t.splice(i,1),s.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}})),s.parentNode?.removeChild(s))}}function yE(e,n){let t=Pd.get(e);t?t.includes(n)||t.push(n):Pd.set(e,[n])}var Jn=new Set,_a=(function(e){return e[e.CHANGE_DETECTION=0]="CHANGE_DETECTION",e[e.AFTER_NEXT_RENDER=1]="AFTER_NEXT_RENDER",e})(_a||{}),mt=new g(""),Hh=new Set;function or(e){Hh.has(e)||(Hh.add(e),performance?.mark?.("mark_feature_usage",{detail:{feature:e}}))}var Da=(()=>{class e{impl=null;execute(){this.impl?.execute()}static \u0275prov=v({token:e,providedIn:"root",factory:()=>new e})}return e})(),_u=[0,1,2,3],Du=(()=>{class e{ngZone=f(N);scheduler=f(Et);errorHandler=f(Ue,{optional:!0});sequences=new Set;deferredRegistrations=new Set;executing=!1;constructor(){f(mt,{optional:!0})}execute(){let t=this.sequences.size>0;t&&X(G.AfterRenderHooksStart),this.executing=!0;for(let r of _u)for(let o of this.sequences)if(!(o.erroredOrDestroyed||!o.hooks[r]))try{o.pipelinedValue=this.ngZone.runOutsideAngular(()=>this.maybeTrace(()=>{let i=o.hooks[r];return i(o.pipelinedValue)},o.snapshot))}catch(i){o.erroredOrDestroyed=!0,this.errorHandler?.handleError(i)}this.executing=!1;for(let r of this.sequences)r.afterRun(),r.once&&(this.sequences.delete(r),r.destroy());for(let r of this.deferredRegistrations)this.sequences.add(r);this.deferredRegistrations.size>0&&this.scheduler.notify(7),this.deferredRegistrations.clear(),t&&X(G.AfterRenderHooksEnd)}register(t){let{view:r}=t;r!==void 0?((r[zn]??=[]).push(t),qn(r),r[T]|=8192):this.executing?this.deferredRegistrations.add(t):this.addSequence(t)}addSequence(t){this.sequences.add(t),this.scheduler.notify(7)}unregister(t){this.executing&&this.sequences.has(t)?(t.erroredOrDestroyed=!0,t.pipelinedValue=void 0,t.once=!0):(this.sequences.delete(t),this.deferredRegistrations.delete(t))}maybeTrace(t,r){return r?r.run(_a.AFTER_NEXT_RENDER,t):t()}static \u0275prov=v({token:e,providedIn:"root",factory:()=>new e})}return e})(),Wo=class{impl;hooks;view;once;snapshot;erroredOrDestroyed=!1;pipelinedValue=void 0;unregisterOnDestroy;constructor(n,t,r,o,i,s=null){this.impl=n,this.hooks=t,this.view=r,this.once=o,this.snapshot=s,this.unregisterOnDestroy=i?.onDestroy(()=>this.destroy())}afterRun(){this.erroredOrDestroyed=!1,this.pipelinedValue=void 0,this.snapshot?.dispose(),this.snapshot=null}destroy(){this.impl.unregister(this),this.unregisterOnDestroy?.();let n=this.view?.[zn];n&&(this.view[zn]=n.filter(t=>t!==this))}};function qt(e,n){let t=n?.injector??f(K);return or("NgAfterNextRender"),_E(e,t,n,!0)}function bE(e){return e instanceof Function?[void 0,void 0,e,void 0]:[e.earlyRead,e.write,e.mixedReadWrite,e.read]}function _E(e,n,t,r){let o=n.get(Da);o.impl??=n.get(Du);let i=n.get(mt,null,{optional:!0}),s=t?.manualCleanup!==!0?n.get(Mt):null,a=n.get(kr,null,{optional:!0}),l=new Wo(o.impl,bE(e),a?.view,r,s,i?.snapshot(null));return o.impl.register(l),l}var Km=new g("",{factory:()=>({queue:new Set,isScheduled:!1,scheduler:null,injector:f(be)})});function Xm(e,n,t){let r=e.get(Km);if(Array.isArray(n))for(let o of n)r.queue.add(o),t?.detachedLeaveAnimationFns?.push(o);else r.queue.add(n),t?.detachedLeaveAnimationFns?.push(n);r.scheduler&&r.scheduler(e)}function DE(e,n){let t=e.get(Km);if(n.detachedLeaveAnimationFns){for(let r of n.detachedLeaveAnimationFns)t.queue.delete(r);n.detachedLeaveAnimationFns=void 0}}function EE(e,n){for(let[t,r]of n)Xm(e,r.animateFns)}function Uh(e,n,t,r){let o=e?.[un]?.enter;n!==null&&o&&o.has(t.index)&&EE(r,o)}function Rr(e,n,t,r,o,i,s,a){if(o!=null){let l,c=!1;ct(o)?l=o:jt(o)&&(c=!0,o=o[at]);let d=Qe(o);e===0&&r!==null?(Uh(a,r,i,t),s==null?Um(n,r,d):sa(n,r,d,s||null,!0)):e===1&&r!==null?(Uh(a,r,i,t),sa(n,r,d,s||null,!0),vE(i,d)):e===2?(a?.[un]?.leave?.has(i.index)&&yE(i,d),Uo.delete(d),$h(a,i,t,u=>{if(Uo.has(d)){Uo.delete(d);return}$m(n,d,c,u)})):e===3&&(Uo.delete(d),$h(a,i,t,()=>{n.destroyNode(d)})),l!=null&&RE(n,e,t,l,i,r,s)}}function CE(e,n){Jm(e,n),n[at]=null,n[Fe]=null}function wE(e,n,t,r,o,i){r[at]=o,r[Fe]=n,Ca(e,r,t,1,o,i)}function Jm(e,n){n[lt].changeDetectionScheduler?.notify(9),Ca(e,n,n[ue],2,null,null)}function xE(e){let n=e[Tr];if(!n)return fd(e[S],e);for(;n;){let t=null;if(jt(n))t=n[Tr];else{let r=n[ye];r&&(t=r)}if(!t){for(;n&&!n[Ze]&&n!==e;)jt(n)&&fd(n[S],n),n=n[we];n===null&&(n=e),jt(n)&&fd(n[S],n),t=n&&n[Ze]}n=t}}function Eu(e,n){let t=e[Gn],r=t.indexOf(n);t.splice(r,1)}function Ea(e,n){if(Wn(n))return;let t=n[ue];t.destroyNode&&Ca(e,n,t,3,null,null),xE(n)}function fd(e,n){if(Wn(n))return;let t=M(null);try{n[T]&=-129,n[T]|=256,n[Ge]&&nn(n[Ge]),SE(e,n),ME(e,n),n[S].type===1&&n[ue].destroy();let r=n[dn];if(r!==null&&ct(n[we])){r!==n[we]&&Eu(r,n);let o=n[Ct];o!==null&&o.detachView(e)}wd(n)}finally{M(t)}}function $h(e,n,t,r){let o=e?.[un];if(o==null||o.leave==null||!o.leave.has(n.index))return r(!1);e&&Jn.add(e[Vt]),Xm(t,()=>{if(o.leave&&o.leave.has(n.index)){let s=o.leave.get(n.index),a=[];if(s){for(let l=0;l<s.animateFns.length;l++){let c=s.animateFns[l],{promise:d}=c();a.push(d)}o.detachedLeaveAnimationFns=void 0}o.running=Promise.allSettled(a),IE(e,r)}else e&&Jn.delete(e[Vt]),r(!1)},o)}function IE(e,n){let t=e[un]?.running;if(t){t.then(()=>{e[un].running=void 0,Jn.delete(e[Vt]),n(!0)});return}n(!1)}function ME(e,n){let t=e.cleanup,r=n[Sr];if(t!==null)for(let s=0;s<t.length-1;s+=2)if(typeof t[s]=="string"){let a=t[s+3];a>=0?r[a]():r[-a].unsubscribe(),s+=2}else{let a=r[t[s+1]];t[s].call(a)}r!==null&&(n[Sr]=null);let o=n[Ft];if(o!==null){n[Ft]=null;for(let s=0;s<o.length;s++){let a=o[s];a()}}let i=n[on];if(i!==null){n[on]=null;for(let s of i)s.destroy()}}function SE(e,n){let t;if(e!=null&&(t=e.destroyHooks)!=null)for(let r=0;r<t.length;r+=2){let o=n[t[r]];if(!(o instanceof Xn)){let i=t[r+1];if(Array.isArray(i))for(let s=0;s<i.length;s+=2){let a=o[i[s]],l=i[s+1];X(G.LifecycleHookStart,a,l);try{l.call(a)}finally{X(G.LifecycleHookEnd,a,l)}}else{X(G.LifecycleHookStart,o,i);try{i.call(o)}finally{X(G.LifecycleHookEnd,o,i)}}}}}function eg(e,n,t){return TE(e,n.parent,t)}function TE(e,n,t){let r=n;for(;r!==null&&r.type&168;)n=r,r=n.parent;if(r===null)return t[at];if(Bt(r)){let{encapsulation:o}=e.data[r.directiveStart+r.componentOffset];if(o===pt.None||o===pt.Emulated)return null}return dt(r,t)}function tg(e,n,t){return NE(e,n,t)}function AE(e,n,t){return e.type&40?dt(e,t):null}var NE=AE,zh;function Cu(e,n,t,r){let o=eg(e,r,n),i=n[ue],s=r.parent||n[Fe],a=tg(s,r,n);if(o!=null)if(Array.isArray(t))for(let l=0;l<t.length;l++)jh(i,o,t[l],a,!1);else jh(i,o,t,a,!1);zh!==void 0&&zh(i,r,n,t,o)}function $o(e,n){if(n!==null){let t=n.type;if(t&3)return dt(n,e);if(t&4)return Ld(-1,e[n.index]);if(t&8){let r=n.child;if(r!==null)return $o(e,r);{let o=e[n.index];return ct(o)?Ld(-1,o):Qe(o)}}else{if(t&128)return $o(e,n.next);if(t&32)return bu(n,e)()||Qe(e[n.index]);{let r=ng(e,n);if(r!==null){if(Array.isArray(r))return r[0];let o=sn(e[Pe]);return $o(o,r)}else return $o(e,n.next)}}}return null}function ng(e,n){if(n!==null){let r=e[Pe][Fe],o=n.projection;return r.projection[o]}return null}function Ld(e,n){let t=ye+e+1;if(t<n.length){let r=n[t],o=r[S].firstChild;if(o!==null)return $o(r,o)}return n[fn]}function wu(e,n,t,r,o,i,s){for(;t!=null;){let a=r[Lt];if(t.type===128){t=t.next;continue}let l=r[t.index],c=t.type;if(s&&n===0&&(l&&Pr(Qe(l),r),t.flags|=2),!ma(t))if(c&8)wu(e,n,t.child,r,o,i,!1),Rr(n,e,a,o,l,t,i,r);else if(c&32){let d=bu(t,r),u;for(;u=d();)Rr(n,e,a,o,u,t,i,r);Rr(n,e,a,o,l,t,i,r)}else c&16?rg(e,n,r,t,o,i):Rr(n,e,a,o,l,t,i,r);t=s?t.projectionNext:t.next}}function Ca(e,n,t,r,o,i){wu(t,r,e.firstChild,n,o,i,!1)}function kE(e,n,t){let r=n[ue],o=eg(e,t,n),i=t.parent||n[Fe],s=tg(i,t,n);rg(r,0,n,t,o,s)}function rg(e,n,t,r,o,i){let s=t[Pe],l=s[Fe].projection[r.projection];if(Array.isArray(l))for(let c=0;c<l.length;c++){let d=l[c];Rr(n,e,t[Lt],o,d,r,i,t)}else{let c=l,d=s[we];Em(r)&&(c.flags|=128),wu(e,n,c,d,o,i,!0)}}function RE(e,n,t,r,o,i,s){let a=r[fn],l=Qe(r);a!==l&&Rr(n,e,t,i,a,o,s);for(let c=ye;c<r.length;c++){let d=r[c];Ca(d[S],d,e,n,i,a)}}function OE(e,n,t,r,o){if(n)o?e.addClass(t,r):e.removeClass(t,r);else{let i=r.indexOf("-")===-1?void 0:Tt.DashCase;o==null?e.removeStyle(t,r,i):(typeof o=="string"&&o.endsWith("!important")&&(o=o.slice(0,-10),i|=Tt.Important),e.setStyle(t,r,o,i))}}function og(e,n,t,r,o){let i=Ht(),s=r&2;try{pn(-1),s&&n.length>ve&&Qm(e,n,ve,!1);let a=s?G.TemplateUpdateStart:G.TemplateCreateStart;X(a,o,t),t(r,o)}finally{pn(i);let a=s?G.TemplateUpdateEnd:G.TemplateCreateEnd;X(a,o,t)}}function xu(e,n,t){HE(e,n,t),(t.flags&64)===64&&UE(e,n,t)}function wa(e,n,t=dt){let r=n.localNames;if(r!==null){let o=n.index+1;for(let i=0;i<r.length;i+=2){let s=r[i+1],a=s===-1?t(n,e):e[s];e[o++]=a}}}function FE(e,n,t,r){let i=r.get(Nm,Am)||t===pt.ShadowDom||t===pt.ExperimentalIsolatedShadowDom,s=e.selectRootElement(n,i);return PE(s),s}function PE(e){LE(e)}var LE=()=>null;function VE(e){return e==="class"?"className":e==="for"?"htmlFor":e==="formaction"?"formAction":e==="innerHtml"?"innerHTML":e==="readonly"?"readOnly":e==="tabindex"?"tabIndex":e}function jE(e,n,t,r,o,i){let s=n[S];if(Iu(e,s,n,t,r)){Bt(e)&&BE(n,e.index);return}e.type&3&&(t=VE(t)),ig(e,n,t,r,o,i)}function ig(e,n,t,r,o,i){if(e.type&3){let s=dt(e,n);r=i!=null?i(r,e.value||"",t):r,o.setProperty(s,t,r)}else e.type&12}function BE(e,n){let t=Ke(n,e);t[T]&16||(t[T]|=64)}function HE(e,n,t){let r=t.directiveStart,o=t.directiveEnd;Bt(t)&&mE(n,t,e.data[r+t.componentOffset]),e.firstCreatePass||oa(t,n);let i=t.initialInputs;for(let s=r;s<o;s++){let a=e.data[s],l=Go(n,e,s,t);if(Pr(l,n),i!==null&&WE(n,s-r,l,a,t,i),wt(a)){let c=Ke(t.index,n);c[_e]=Go(n,e,s,t)}}}function UE(e,n,t){let r=t.directiveStart,o=t.directiveEnd,i=t.index,s=uh();try{pn(i);for(let a=r;a<o;a++){let l=e.data[a],c=n[a];Ls(a),(l.hostBindings!==null||l.hostVars!==0||l.hostAttrs!==null)&&$E(l,c)}}finally{pn(-1),Ls(s)}}function $E(e,n){e.hostBindings!==null&&e.hostBindings(1,n)}function sg(e,n){let t=e.directiveRegistry,r=null;if(t)for(let o=0;o<t.length;o++){let i=t[o];qm(n,i.selectors,!1)&&(r??=[],wt(i)?r.unshift(i):r.push(i))}return r}function zE(e,n,t,r,o,i){let s=dt(e,n);GE(n[ue],s,i,e.value,t,r,o)}function GE(e,n,t,r,o,i,s){if(i==null)e.removeAttribute(n,o,t);else{let a=s==null?Oo(i):s(i,r||"",o);e.setAttribute(n,o,a,t)}}function WE(e,n,t,r,o,i){let s=i[n];if(s!==null)for(let a=0;a<s.length;a+=2){let l=s[a],c=s[a+1];Fd(r,t,l,c)}}function ag(e,n,t,r,o){let i=ve+t,s=n[S],a=o(s,n,e,r,t);n[i]=a,Nr(e,!0);let l=e.type===2;return l?(zm(n[ue],a,e),(rh()===0||Vo(e))&&Pr(a,n),oh()):Pr(a,n),Us()&&(!l||!ma(e))&&Cu(s,n,a,e),e}function lg(e){let n=e;return Jc()?ed():(n=n.parent,Nr(n,!1)),n}function qE(e,n){let t=e[Lt];if(!t)return;let r;try{r=t.get(Ut,null)}catch{r=null}r?.(n)}function Iu(e,n,t,r,o){let i=e.inputs?.[r],s=e.hostDirectiveInputs?.[r],a=!1;if(s)for(let l=0;l<s.length;l+=2){let c=s[l],d=s[l+1],u=n.data[c];Fd(u,t[c],d,o),a=!0}if(i)for(let l of i){let c=t[l],d=n.data[l];Fd(d,c,r,o),a=!0}return a}function YE(e,n){let t=Ke(n,e),r=t[S];ZE(r,t);let o=t[at];o!==null&&t[Hn]===null&&(t[Hn]=km(o,t[Lt])),X(G.ComponentStart);try{Mu(r,t,t[_e])}finally{X(G.ComponentEnd,t[_e])}}function ZE(e,n){for(let t=n.length;t<e.blueprint.length;t++)n.push(e.blueprint[t])}function Mu(e,n,t){js(n);try{let r=e.viewQuery;r!==null&&Id(1,r,t);let o=e.template;o!==null&&og(e,n,o,1,t),e.firstCreatePass&&(e.firstCreatePass=!1),n[Ct]?.finishViewCreation(e),e.staticContentQueries&&Rm(e,n),e.staticViewQueries&&Id(2,e.viewQuery,t);let i=e.components;i!==null&&QE(n,i)}catch(r){throw e.firstCreatePass&&(e.incompleteFirstPass=!0,e.firstCreatePass=!1),r}finally{n[T]&=-5,Bs()}}function QE(e,n){for(let t=0;t<n.length;t++)YE(e,n[t])}function ni(e,n,t,r){let o=M(null);try{let i=n.tView,a=e[T]&4096?4096:16,l=vu(e,i,t,a,null,n,null,null,r?.injector??null,r?.embeddedViewInjector??null,r?.dehydratedView??null),c=e[n.index];l[dn]=c;let d=e[Ct];return d!==null&&(l[Ct]=d.createEmbeddedView(i)),Mu(i,l,t),l}finally{M(o)}}function Lr(e,n){return!n||n.firstChild===null||Em(e)}function qo(e,n,t,r,o=!1){for(;t!==null;){if(t.type===128){t=o?t.projectionNext:t.next;continue}let i=n[t.index];i!==null&&r.push(Qe(i)),ct(i)&&cg(i,r);let s=t.type;if(s&8)qo(e,n,t.child,r);else if(s&32){let a=bu(t,n),l;for(;l=a();)r.push(l)}else if(s&16){let a=ng(n,t);if(Array.isArray(a))r.push(...a);else{let l=sn(n[Pe]);qo(l[S],l,a,r,!0)}}t=o?t.projectionNext:t.next}return r}function cg(e,n){for(let t=ye;t<e.length;t++){let r=e[t],o=r[S].firstChild;o!==null&&qo(r[S],r,o,n)}e[fn]!==e[at]&&n.push(e[fn])}function dg(e){if(e[zn]!==null){for(let n of e[zn])n.impl.addSequence(n);e[zn].length=0}}var ug=[];function KE(e){return e[Ge]??XE(e)}function XE(e){let n=ug.pop()??Object.create(eC);return n.lView=e,n}function JE(e){e.lView[Ge]!==e&&(e.lView=null,ug.push(e))}var eC=Z(E({},xn),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:e=>{qn(e.lView)},consumerOnSignalRead(){this.lView[Ge]=this}});function tC(e){let n=e[Ge]??Object.create(nC);return n.lView=e,n}var nC=Z(E({},xn),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:e=>{let n=sn(e.lView);for(;n&&!fg(n[S]);)n=sn(n);n&&$c(n)},consumerOnSignalRead(){this.lView[Ge]=this}});function fg(e){return e.type!==2}function pg(e){if(e[on]===null)return;let n=!0;for(;n;){let t=!1;for(let r of e[on])r.dirty&&(t=!0,r.zone===null||Zone.current===r.zone?r.run():r.zone.run(()=>r.run()));n=t&&!!(e[T]&8192)}}var rC=100;function hg(e,n=0){let r=e[lt].rendererFactory,o=!1;o||r.begin?.();try{oC(e,n)}finally{o||r.end?.()}}function oC(e,n){let t=td();try{No(!0),Vd(e,n);let r=0;for(;jo(e);){if(r===rC)throw new I(103,!1);r++,Vd(e,1)}}finally{No(t)}}function iC(e,n,t,r){if(Wn(n))return;let o=n[T],i=!1,s=!1;js(n);let a=!0,l=null,c=null;i||(fg(e)?(c=KE(n),l=tn(c)):ji()===null?(a=!1,c=tC(n),l=tn(c)):n[Ge]&&(nn(n[Ge]),n[Ge]=null));try{Uc(n),lh(e.bindingStartIndex),t!==null&&og(e,n,t,2,r);let d=(o&3)===3;if(!i)if(d){let p=e.preOrderCheckHooks;p!==null&&Qs(n,p,null)}else{let p=e.preOrderHooks;p!==null&&Ks(n,p,0,null),dd(n,0)}if(s||sC(n),pg(n),mg(n,0),e.contentQueries!==null&&Rm(e,n),!i)if(d){let p=e.contentCheckHooks;p!==null&&Qs(n,p)}else{let p=e.contentHooks;p!==null&&Ks(n,p,1),dd(n,1)}lC(e,n);let u=e.components;u!==null&&vg(n,u,0);let h=e.viewQuery;if(h!==null&&Id(2,h,r),!i)if(d){let p=e.viewCheckHooks;p!==null&&Qs(n,p)}else{let p=e.viewHooks;p!==null&&Ks(n,p,2),dd(n,2)}if(e.firstUpdatePass===!0&&(e.firstUpdatePass=!1),n[Rs]){for(let p of n[Rs])p();n[Rs]=null}i||(dg(n),n[T]&=-73)}catch(d){throw i||qn(n),d}finally{c!==null&&(Mn(c,l),a&&JE(c)),Bs()}}function mg(e,n){for(let t=wm(e);t!==null;t=xm(t))for(let r=ye;r<t.length;r++){let o=t[r];gg(o,n)}}function sC(e){for(let n=wm(e);n!==null;n=xm(n)){if(!(n[T]&2))continue;let t=n[Gn];for(let r=0;r<t.length;r++){let o=t[r];$c(o)}}}function aC(e,n,t){X(G.ComponentStart);let r=Ke(n,e);try{gg(r,t)}finally{X(G.ComponentEnd,r[_e])}}function gg(e,n){Fs(e)&&Vd(e,n)}function Vd(e,n){let r=e[S],o=e[T],i=e[Ge],s=!!(n===0&&o&16);if(s||=!!(o&64&&n===0),s||=!!(o&1024),s||=!!(i?.dirty&&pr(i)),s||=!1,i&&(i.dirty=!1),e[T]&=-9217,s)iC(r,e,r.template,e[_e]);else if(o&8192){let a=M(null);try{pg(e),mg(e,1);let l=r.components;l!==null&&vg(e,l,1),dg(e)}finally{M(a)}}}function vg(e,n,t){for(let r=0;r<n.length;r++)aC(e,n[r],t)}function lC(e,n){let t=e.hostBindingOpCodes;if(t!==null)try{for(let r=0;r<t.length;r++){let o=t[r];if(o<0)pn(~o);else{let i=o,s=t[++r],a=t[++r];dh(s,i);let l=n[i];X(G.HostBindingsUpdateStart,l);try{a(2,l)}finally{X(G.HostBindingsUpdateEnd,l)}}}}finally{pn(-1)}}function Su(e,n){let t=td()?64:1088;for(e[lt].changeDetectionScheduler?.notify(n);e;){e[T]|=t;let r=sn(e);if(Ar(e)&&!r)return e;e=r}return null}function yg(e,n,t,r){return[e,!0,0,n,null,r,null,t,null,null]}function bg(e,n){let t=ye+n;if(t<e.length)return e[t]}function ri(e,n,t,r=!0){let o=n[S];if(cC(o,n,e,t),r){let s=Ld(t,e),a=n[ue],l=a.parentNode(e[fn]);l!==null&&wE(o,e[Fe],a,n,l,s)}let i=n[Hn];i!==null&&i.firstChild!==null&&(i.firstChild=null)}function _g(e,n){let t=Yo(e,n);return t!==void 0&&Ea(t[S],t),t}function Yo(e,n){if(e.length<=ye)return;let t=ye+n,r=e[t];if(r){let o=r[dn];o!==null&&o!==e&&Eu(o,r),n>0&&(e[t-1][Ze]=r[Ze]);let i=Fo(e,ye+n);CE(r[S],r);let s=i[Ct];s!==null&&s.detachView(i[S]),r[we]=null,r[Ze]=null,r[T]&=-129}return r}function cC(e,n,t,r){let o=ye+r,i=t.length;r>0&&(t[o-1][Ze]=n),r<i-ye?(n[Ze]=t[o],Tc(t,ye+r,n)):(t.push(n),n[Ze]=null),n[we]=t;let s=n[dn];s!==null&&t!==s&&Dg(s,n);let a=n[Ct];a!==null&&a.insertView(e),Ps(n),n[T]|=128}function Dg(e,n){let t=e[Gn],r=n[we];if(jt(r))e[T]|=2;else{let o=r[we][Pe];n[Pe]!==o&&(e[T]|=2)}t===null?e[Gn]=[n]:t.push(n)}var hn=class{_lView;_cdRefInjectingView;_appRef=null;_attachedToViewContainer=!1;exhaustive;get rootNodes(){let n=this._lView,t=n[S];return qo(t,n,t.firstChild,[])}constructor(n,t){this._lView=n,this._cdRefInjectingView=t}get context(){return this._lView[_e]}set context(n){this._lView[_e]=n}get destroyed(){return Wn(this._lView)}destroy(){if(this._appRef)this._appRef.detachView(this);else if(this._attachedToViewContainer){let n=this._lView[we];if(ct(n)){let t=n[Lo],r=t?t.indexOf(this):-1;r>-1&&(Yo(n,r),Fo(t,r))}this._attachedToViewContainer=!1}Ea(this._lView[S],this._lView)}onDestroy(n){zc(this._lView,n)}markForCheck(){Su(this._cdRefInjectingView||this._lView,4)}detach(){this._lView[T]&=-129}reattach(){Ps(this._lView),this._lView[T]|=128}detectChanges(){this._lView[T]|=1024,hg(this._lView)}checkNoChanges(){}attachToViewContainerRef(){if(this._appRef)throw new I(902,!1);this._attachedToViewContainer=!0}detachFromAppRef(){this._appRef=null;let n=Ar(this._lView),t=this._lView[dn];t!==null&&!n&&Eu(t,this._lView),Jm(this._lView[S],this._lView)}attachToAppRef(n){if(this._attachedToViewContainer)throw new I(902,!1);this._appRef=n;let t=Ar(this._lView),r=this._lView[dn];r!==null&&!t&&Dg(r,this._lView),Ps(this._lView)}};var At=(()=>{class e{_declarationLView;_declarationTContainer;elementRef;static __NG_ELEMENT_ID__=dC;constructor(t,r,o){this._declarationLView=t,this._declarationTContainer=r,this.elementRef=o}get ssrId(){return this._declarationTContainer.tView?.ssrId||null}createEmbeddedView(t,r){return this.createEmbeddedViewImpl(t,r)}createEmbeddedViewImpl(t,r,o){let i=ni(this._declarationLView,this._declarationTContainer,t,{embeddedViewInjector:r,dehydratedView:o});return new hn(i)}}return e})();function dC(){return xa(ke(),k())}function xa(e,n){return e.type&4?new At(n,e,Br(e,n)):null}function Ur(e,n,t,r,o){let i=e.data[n];if(i===null)i=uC(e,n,t,r,o),ch()&&(i.flags|=32);else if(i.type&64){i.type=t,i.value=r,i.attrs=o;let s=ih();i.injectorIndex=s===null?-1:s.injectorIndex}return Nr(i,!0),i}function uC(e,n,t,r,o){let i=Xc(),s=Jc(),a=s?i:i&&i.parent,l=e.data[n]=pC(e,a,t,n,r,o);return fC(e,l,i,s),l}function fC(e,n,t,r){e.firstChild===null&&(e.firstChild=n),t!==null&&(r?t.child==null&&n.parent!==null&&(t.child=n):t.next===null&&(t.next=n,n.prev=t))}function pC(e,n,t,r,o,i){let s=n?n.injectorIndex:-1,a=0;return Zc()&&(a|=128),{type:t,index:r,insertBeforeIndex:null,injectorIndex:s,directiveStart:-1,directiveEnd:-1,directiveStylingLast:-1,componentOffset:-1,controlDirectiveIndex:-1,customControlIndex:-1,propertyBindings:null,flags:a,providerIndexes:0,value:o,attrs:i,mergedAttrs:null,localNames:null,initialInputs:null,inputs:null,hostDirectiveInputs:null,outputs:null,hostDirectiveOutputs:null,directiveToIndex:null,tView:null,next:null,prev:null,projectionNext:null,child:null,parent:n,projection:null,styles:null,stylesWithoutHost:null,residualStyles:void 0,classes:null,classesWithoutHost:null,residualClasses:void 0,classBindings:0,styleBindings:0}}function hC(e){let n=e[Lc]??[],r=e[we][ue],o=[];for(let i of n)i.data[Tm]!==void 0?o.push(i):mC(i,r);e[Lc]=o}function mC(e,n){let t=0,r=e.firstChild;if(r){let o=e.data[Sm];for(;t<o;){let i=r.nextSibling;$m(n,r,!1),r=i,t++}}}var gC=()=>null,vC=()=>null;function aa(e,n){return gC(e,n)}function Eg(e,n,t){return vC(e,n,t)}var Cg=class{},Ia=class{},jd=class{resolveComponentFactory(n){throw new I(917,!1)}},Ma=class{static NULL=new jd},Te=class{},et=(()=>{class e{destroyNode=null;static __NG_ELEMENT_ID__=()=>yC()}return e})();function yC(){let e=k(),n=ke(),t=Ke(n.index,e);return(jt(t)?t:e)[ue]}var wg=(()=>{class e{static \u0275prov=v({token:e,providedIn:"root",factory:()=>null})}return e})();var Js={},Bd=class{injector;parentInjector;constructor(n,t){this.injector=n,this.parentInjector=t}get(n,t,r){let o=this.injector.get(n,Js,r);return o!==Js||t===Js?o:this.parentInjector.get(n,t,r)}};function la(e,n,t){let r=t?e.styles:null,o=t?e.classes:null,i=0;if(n!==null)for(let s=0;s<n.length;s++){let a=n[s];if(typeof a=="number")i=a;else if(i==1)o=Is(o,a);else if(i==2){let l=a,c=n[++s];r=Is(r,l+": "+c+";")}}t?e.styles=r:e.stylesWithoutHost=r,t?e.classes=o:e.classesWithoutHost=o}function fe(e,n=0){let t=k();if(t===null)return x(e,n);let r=ke();return ym(r,t,Se(e),n)}function xg(e,n,t,r,o){let i=r===null?null:{"":-1},s=o(e,t);if(s!==null){let a=s,l=null,c=null;for(let d of s)if(d.resolveHostDirectives!==null){[a,l,c]=d.resolveHostDirectives(s);break}DC(e,n,t,a,i,l,c)}i!==null&&r!==null&&bC(t,r,i)}function bC(e,n,t){let r=e.localNames=[];for(let o=0;o<n.length;o+=2){let i=t[n[o+1]];if(i==null)throw new I(-301,!1);r.push(n[o],i)}}function _C(e,n,t){n.componentOffset=t,(e.components??=[]).push(n.index)}function DC(e,n,t,r,o,i,s){let a=r.length,l=null;for(let h=0;h<a;h++){let p=r[h];l===null&&wt(p)&&(l=p,_C(e,t,h)),Ed(oa(t,n),e,p.type)}MC(t,e.data.length,a),l?.viewProvidersResolver&&l.viewProvidersResolver(l);for(let h=0;h<a;h++){let p=r[h];p.providersResolver&&p.providersResolver(p)}let c=!1,d=!1,u=Zm(e,n,a,null);a>0&&(t.directiveToIndex=new Map);for(let h=0;h<a;h++){let p=r[h];if(t.mergedAttrs=Fr(t.mergedAttrs,p.hostAttrs),CC(e,t,n,u,p),IC(u,p,o),s!==null&&s.has(p)){let[D,C]=s.get(p);t.directiveToIndex.set(p.type,[u,D+t.directiveStart,C+t.directiveStart])}else(i===null||!i.has(p))&&t.directiveToIndex.set(p.type,u);p.contentQueries!==null&&(t.flags|=4),(p.hostBindings!==null||p.hostAttrs!==null||p.hostVars!==0)&&(t.flags|=64);let m=p.type.prototype;!c&&(m.ngOnChanges||m.ngOnInit||m.ngDoCheck)&&((e.preOrderHooks??=[]).push(t.index),c=!0),!d&&(m.ngOnChanges||m.ngDoCheck)&&((e.preOrderCheckHooks??=[]).push(t.index),d=!0),u++}EC(e,t,i)}function EC(e,n,t){for(let r=n.directiveStart;r<n.directiveEnd;r++){let o=e.data[r];if(t===null||!t.has(o))Gh(0,n,o,r),Gh(1,n,o,r),qh(n,r,!1);else{let i=t.get(o);Wh(0,n,i,r),Wh(1,n,i,r),qh(n,r,!0)}}}function Gh(e,n,t,r){let o=e===0?t.inputs:t.outputs;for(let i in o)if(o.hasOwnProperty(i)){let s;e===0?s=n.inputs??={}:s=n.outputs??={},s[i]??=[],s[i].push(r),Ig(n,i)}}function Wh(e,n,t,r){let o=e===0?t.inputs:t.outputs;for(let i in o)if(o.hasOwnProperty(i)){let s=o[i],a;e===0?a=n.hostDirectiveInputs??={}:a=n.hostDirectiveOutputs??={},a[s]??=[],a[s].push(r,i),Ig(n,s)}}function Ig(e,n){n==="class"?e.flags|=8:n==="style"&&(e.flags|=16)}function qh(e,n,t){let{attrs:r,inputs:o,hostDirectiveInputs:i}=e;if(r===null||!t&&o===null||t&&i===null||mu(e)){e.initialInputs??=[],e.initialInputs.push(null);return}let s=null,a=0;for(;a<r.length;){let l=r[a];if(l===0){a+=4;continue}else if(l===5){a+=2;continue}else if(typeof l=="number")break;if(!t&&o.hasOwnProperty(l)){let c=o[l];for(let d of c)if(d===n){s??=[],s.push(l,r[a+1]);break}}else if(t&&i.hasOwnProperty(l)){let c=i[l];for(let d=0;d<c.length;d+=2)if(c[d]===n){s??=[],s.push(c[d+1],r[a+1]);break}}a+=2}e.initialInputs??=[],e.initialInputs.push(s)}function CC(e,n,t,r,o){e.data[r]=o;let i=o.factory||(o.factory=rn(o.type,!0)),s=new Xn(i,wt(o),fe,null);e.blueprint[r]=s,t[r]=s,wC(e,n,r,Zm(e,t,o.hostVars,Je),o)}function wC(e,n,t,r,o){let i=o.hostBindings;if(i){let s=e.hostBindingOpCodes;s===null&&(s=e.hostBindingOpCodes=[]);let a=~n.index;xC(s)!=a&&s.push(a),s.push(t,r,i)}}function xC(e){let n=e.length;for(;n>0;){let t=e[--n];if(typeof t=="number"&&t<0)return t}return 0}function IC(e,n,t){if(t){if(n.exportAs)for(let r=0;r<n.exportAs.length;r++)t[n.exportAs[r]]=e;wt(n)&&(t[""]=e)}}function MC(e,n,t){e.flags|=1,e.directiveStart=n,e.directiveEnd=n+t,e.providerIndexes=n}function Mg(e,n,t,r,o,i,s,a){let l=n[S],c=l.consts,d=Xe(c,s),u=Ur(l,e,t,r,d);return i&&xg(l,n,u,Xe(c,a),o),u.mergedAttrs=Fr(u.mergedAttrs,u.attrs),u.attrs!==null&&la(u,u.attrs,!1),u.mergedAttrs!==null&&la(u,u.mergedAttrs,!0),l.queries!==null&&l.queries.elementStart(l,u),u}function Sg(e,n){cm(e,n),Vc(n)&&e.queries.elementEnd(n)}function SC(e,n,t,r,o,i){let s=n.consts,a=Xe(s,o),l=Ur(n,e,t,r,a);if(l.mergedAttrs=Fr(l.mergedAttrs,l.attrs),i!=null){let c=Xe(s,i);l.localNames=[];for(let d=0;d<c.length;d+=2)l.localNames.push(c[d],-1)}return l.attrs!==null&&la(l,l.attrs,!1),l.mergedAttrs!==null&&la(l,l.mergedAttrs,!0),n.queries!==null&&n.queries.elementStart(n,l),l}function TC(e,n,t){return e[n]=t}function Yt(e,n,t){if(t===Je)return!1;let r=e[n];return Object.is(r,t)?!1:(e[n]=t,!0)}function pd(e,n,t){return function r(o){let i=Bt(e)?Ke(e.index,n):n;Su(i,5);let s=n[_e],a=Yh(n,s,t,o),l=r.__ngNextListenerFn__;for(;l;)a=Yh(n,s,l,o)&&a,l=l.__ngNextListenerFn__;return a}}function Yh(e,n,t,r){let o=M(null);try{return X(G.OutputStart,n,t),t(r)!==!1}catch(i){return qE(e,i),!1}finally{X(G.OutputEnd,n,t),M(o)}}function AC(e,n,t,r,o,i,s,a){let l=Vo(e),c=!1,d=null;if(!r&&l&&(d=kC(n,t,i,e.index)),d!==null){let u=d.__ngLastListenerFn__||d;u.__ngNextListenerFn__=s,d.__ngLastListenerFn__=s,c=!0}else{let u=dt(e,t),h=r?r(u):u;ND(t,h,i,a);let p=o.listen(h,i,a);if(!NC(i)){let m=r?D=>r(Qe(D[e.index])):e.index;Tg(m,n,t,i,a,p,!1)}}return c}function NC(e){return e.startsWith("animation")||e.startsWith("transition")}function kC(e,n,t,r){let o=e.cleanup;if(o!=null)for(let i=0;i<o.length-1;i+=2){let s=o[i];if(s===t&&o[i+1]===r){let a=n[Sr],l=o[i+2];return a&&a.length>l?a[l]:null}typeof s=="string"&&(i+=2)}return null}function Tg(e,n,t,r,o,i,s){let a=n.firstCreatePass?Wc(n):null,l=Gc(t),c=l.length;l.push(o,i),a&&a.push(r,e,c,(c+1)*(s?-1:1))}function Zh(e,n,t,r,o,i){let s=n[t],a=n[S],c=a.data[t].outputs[r],u=s[c].subscribe(i);Tg(e.index,a,n,o,i,u,!0)}var Hd=Symbol("BINDING");function Ag(e){return e.debugInfo?.className||e.type.name||null}var Ud=class extends Ma{ngModule;constructor(n){super(),this.ngModule=n}resolveComponentFactory(n){let t=ln(n);return new Vr(t,this.ngModule)}};function RC(e){return Object.keys(e).map(n=>{let[t,r,o]=e[n],i={propName:t,templateName:n,isSignal:(r&ba.SignalBased)!==0};return o&&(i.transform=o),i})}function OC(e){return Object.keys(e).map(n=>({propName:e[n],templateName:n}))}function FC(e,n,t){let r=n instanceof be?n:n?.injector;return r&&e.getStandaloneInjector!==null&&(r=e.getStandaloneInjector(r)||r),r?new Bd(t,r):t}function PC(e){let n=e.get(Te,null);if(n===null)throw new I(407,!1);let t=e.get(wg,null),r=e.get(Et,null),o=e.get(mt,null,{optional:!0});return{rendererFactory:n,sanitizer:t,changeDetectionScheduler:r,ngReflect:!1,tracingService:o}}function LC(e,n){let t=Ng(e);return Hm(n,t,t==="svg"?Qp:t==="math"?Kp:null)}function Ng(e){return(e.selectors[0][0]||"div").toLowerCase()}var Vr=class extends Ia{componentDef;ngModule;selector;componentType;ngContentSelectors;isBoundToModule;cachedInputs=null;cachedOutputs=null;get inputs(){return this.cachedInputs??=RC(this.componentDef.inputs),this.cachedInputs}get outputs(){return this.cachedOutputs??=OC(this.componentDef.outputs),this.cachedOutputs}constructor(n,t){super(),this.componentDef=n,this.ngModule=t,this.componentType=n.type,this.selector=uE(n.selectors),this.ngContentSelectors=n.ngContentSelectors??[],this.isBoundToModule=!!t}create(n,t,r,o,i,s){X(G.DynamicComponentStart);let a=M(null);try{let l=this.componentDef,c=FC(l,o||this.ngModule,n),d=PC(c),u=d.tracingService;return u&&u.componentCreate?u.componentCreate(Ag(l),()=>this.createComponentRef(d,c,t,r,i,s)):this.createComponentRef(d,c,t,r,i,s)}finally{M(a)}}createComponentRef(n,t,r,o,i,s){let a=this.componentDef,l=VC(o,a,s,i),c=n.rendererFactory.createRenderer(null,a),d=o?FE(c,o,a.encapsulation,t):LC(a,c),u=s?.some(Qh)||i?.some(m=>typeof m!="function"&&m.bindings.some(Qh)),h=vu(null,l,null,512|Ym(a),null,null,n,c,t,null,km(d,t,!0));h[ve]=d,js(h);let p=null;try{let m=Mg(ve,h,2,"#host",()=>l.directiveRegistry,!0,0);zm(c,d,m),Pr(d,h),xu(l,h,m),Om(l,m,h),Sg(l,m),r!==void 0&&BC(m,this.ngContentSelectors,r),p=Ke(m.index,h),h[_e]=p[_e],Mu(l,h,null)}catch(m){throw p!==null&&wd(p),wd(h),m}finally{X(G.DynamicComponentEnd),Bs()}return new ca(this.componentType,h,!!u)}};function VC(e,n,t,r){let o=e?["ng-version","21.2.10"]:fE(n.selectors[0]),i=null,s=null,a=0;if(t)for(let d of t)a+=d[Hd].requiredVars,d.create&&(d.targetIdx=0,(i??=[]).push(d)),d.update&&(d.targetIdx=0,(s??=[]).push(d));if(r)for(let d=0;d<r.length;d++){let u=r[d];if(typeof u!="function")for(let h of u.bindings){a+=h[Hd].requiredVars;let p=d+1;h.create&&(h.targetIdx=p,(i??=[]).push(h)),h.update&&(h.targetIdx=p,(s??=[]).push(h))}}let l=[n];if(r)for(let d of r){let u=typeof d=="function"?d:d.type,h=xc(u);l.push(h)}return gu(0,null,jC(i,s),1,a,l,null,null,null,[o],null)}function jC(e,n){return!e&&!n?null:t=>{if(t&1&&e)for(let r of e)r.create();if(t&2&&n)for(let r of n)r.update()}}function Qh(e){let n=e[Hd].kind;return n==="input"||n==="twoWay"}var ca=class extends Cg{_rootLView;_hasInputBindings;instance;hostView;changeDetectorRef;componentType;location;previousInputValues=null;_tNode;constructor(n,t,r){super(),this._rootLView=t,this._hasInputBindings=r,this._tNode=Os(t[S],ve),this.location=Br(this._tNode,t),this.instance=Ke(this._tNode.index,t)[_e],this.hostView=this.changeDetectorRef=new hn(t,void 0),this.componentType=n}setInput(n,t){this._hasInputBindings;let r=this._tNode;if(this.previousInputValues??=new Map,this.previousInputValues.has(n)&&Object.is(this.previousInputValues.get(n),t))return;let o=this._rootLView,i=Iu(r,o[S],o,n,t);this.previousInputValues.set(n,t);let s=Ke(r.index,o);Su(s,1)}get injector(){return new Kn(this._tNode,this._rootLView)}destroy(){this.hostView.destroy()}onDestroy(n){this.hostView.onDestroy(n)}};function BC(e,n,t){let r=e.projection=[];for(let o=0;o<n.length;o++){let i=t[o];r.push(i!=null&&i.length?Array.from(i):null)}}var Zt=(()=>{class e{static __NG_ELEMENT_ID__=HC}return e})();function HC(){let e=ke();return kg(e,k())}var $d=class e extends Zt{_lContainer;_hostTNode;_hostLView;constructor(n,t,r){super(),this._lContainer=n,this._hostTNode=t,this._hostLView=r}get element(){return Br(this._hostTNode,this._hostLView)}get injector(){return new Kn(this._hostTNode,this._hostLView)}get parentInjector(){let n=iu(this._hostTNode,this._hostLView);if(fm(n)){let t=na(n,this._hostLView),r=ta(n),o=t[S].data[r+8];return new Kn(o,t)}else return new Kn(null,this._hostLView)}clear(){for(;this.length>0;)this.remove(this.length-1)}get(n){let t=Kh(this._lContainer);return t!==null&&t[n]||null}get length(){return this._lContainer.length-ye}createEmbeddedView(n,t,r){let o,i;typeof r=="number"?o=r:r!=null&&(o=r.index,i=r.injector);let s=aa(this._lContainer,n.ssrId),a=n.createEmbeddedViewImpl(t||{},i,s);return this.insertImpl(a,o,Lr(this._hostTNode,s)),a}createComponent(n,t,r,o,i,s,a){let l=n&&!iD(n),c;if(l)c=t;else{let C=t||{};c=C.index,r=C.injector,o=C.projectableNodes,i=C.environmentInjector||C.ngModuleRef,s=C.directives,a=C.bindings}let d=l?n:new Vr(ln(n)),u=r||this.parentInjector;if(!i&&d.ngModule==null){let w=(l?u:this.parentInjector).get(be,null);w&&(i=w)}let h=ln(d.componentType??{}),p=aa(this._lContainer,h?.id??null),m=p?.firstChild??null,D=d.create(u,o,m,i,s,a);return this.insertImpl(D.hostView,c,Lr(this._hostTNode,p)),D}insert(n,t){return this.insertImpl(n,t,!0)}insertImpl(n,t,r){let o=n._lView;if(Jp(o)){let a=this.indexOf(n);if(a!==-1)this.detach(a);else{let l=o[we],c=new e(l,l[Fe],l[we]);c.detach(c.indexOf(n))}}let i=this._adjustIndex(t),s=this._lContainer;return ri(s,o,i,r),n.attachToViewContainerRef(),Tc(hd(s),i,n),n}move(n,t){return this.insert(n,t)}indexOf(n){let t=Kh(this._lContainer);return t!==null?t.indexOf(n):-1}remove(n){let t=this._adjustIndex(n,-1),r=Yo(this._lContainer,t);r&&(Fo(hd(this._lContainer),t),Ea(r[S],r))}detach(n){let t=this._adjustIndex(n,-1),r=Yo(this._lContainer,t);return r&&Fo(hd(this._lContainer),t)!=null?new hn(r):null}_adjustIndex(n,t=0){return n??this.length+t}};function Kh(e){return e[Lo]}function hd(e){return e[Lo]||(e[Lo]=[])}function kg(e,n){let t,r=n[e.index];return ct(r)?t=r:(t=yg(r,n,null,e),n[e.index]=t,yu(n,t)),$C(t,n,e,r),new $d(t,e,n)}function UC(e,n){let t=e[ue],r=t.createComment(""),o=dt(n,e),i=t.parentNode(o);return sa(t,i,r,t.nextSibling(o),!1),r}var $C=WC,zC=()=>!1;function GC(e,n,t){return zC(e,n,t)}function WC(e,n,t,r){if(e[fn])return;let o;t.type&8?o=Qe(r):o=UC(n,t),e[fn]=o}var zd=class e{queryList;matches=null;constructor(n){this.queryList=n}clone(){return new e(this.queryList)}setDirty(){this.queryList.setDirty()}},Gd=class e{queries;constructor(n=[]){this.queries=n}createEmbeddedView(n){let t=n.queries;if(t!==null){let r=n.contentQueries!==null?n.contentQueries[0]:t.length,o=[];for(let i=0;i<r;i++){let s=t.getByIndex(i),a=this.queries[s.indexInDeclarationView];o.push(a.clone())}return new e(o)}return null}insertView(n){this.dirtyQueriesWithMatches(n)}detachView(n){this.dirtyQueriesWithMatches(n)}finishViewCreation(n){this.dirtyQueriesWithMatches(n)}dirtyQueriesWithMatches(n){for(let t=0;t<this.queries.length;t++)Au(n,t).matches!==null&&this.queries[t].setDirty()}},da=class{flags;read;predicate;constructor(n,t,r=null){this.flags=t,this.read=r,typeof n=="string"?this.predicate=KC(n):this.predicate=n}},Wd=class e{queries;constructor(n=[]){this.queries=n}elementStart(n,t){for(let r=0;r<this.queries.length;r++)this.queries[r].elementStart(n,t)}elementEnd(n){for(let t=0;t<this.queries.length;t++)this.queries[t].elementEnd(n)}embeddedTView(n){let t=null;for(let r=0;r<this.length;r++){let o=t!==null?t.length:0,i=this.getByIndex(r).embeddedTView(n,o);i&&(i.indexInDeclarationView=r,t!==null?t.push(i):t=[i])}return t!==null?new e(t):null}template(n,t){for(let r=0;r<this.queries.length;r++)this.queries[r].template(n,t)}getByIndex(n){return this.queries[n]}get length(){return this.queries.length}track(n){this.queries.push(n)}},qd=class e{metadata;matches=null;indexInDeclarationView=-1;crossesNgTemplate=!1;_declarationNodeIndex;_appliesToNextNode=!0;constructor(n,t=-1){this.metadata=n,this._declarationNodeIndex=t}elementStart(n,t){this.isApplyingToNode(t)&&this.matchTNode(n,t)}elementEnd(n){this._declarationNodeIndex===n.index&&(this._appliesToNextNode=!1)}template(n,t){this.elementStart(n,t)}embeddedTView(n,t){return this.isApplyingToNode(n)?(this.crossesNgTemplate=!0,this.addMatch(-n.index,t),new e(this.metadata)):null}isApplyingToNode(n){if(this._appliesToNextNode&&(this.metadata.flags&1)!==1){let t=this._declarationNodeIndex,r=n.parent;for(;r!==null&&r.type&8&&r.index!==t;)r=r.parent;return t===(r!==null?r.index:-1)}return this._appliesToNextNode}matchTNode(n,t){let r=this.metadata.predicate;if(Array.isArray(r))for(let o=0;o<r.length;o++){let i=r[o];this.matchTNodeWithReadOption(n,t,qC(t,i)),this.matchTNodeWithReadOption(n,t,Xs(t,n,i,!1,!1))}else r===At?t.type&4&&this.matchTNodeWithReadOption(n,t,-1):this.matchTNodeWithReadOption(n,t,Xs(t,n,r,!1,!1))}matchTNodeWithReadOption(n,t,r){if(r!==null){let o=this.metadata.read;if(o!==null)if(o===Y||o===Zt||o===At&&t.type&4)this.addMatch(t.index,-2);else{let i=Xs(t,n,o,!1,!1);i!==null&&this.addMatch(t.index,i)}else this.addMatch(t.index,r)}}addMatch(n,t){this.matches===null?this.matches=[n,t]:this.matches.push(n,t)}};function qC(e,n){let t=e.localNames;if(t!==null){for(let r=0;r<t.length;r+=2)if(t[r]===n)return t[r+1]}return null}function YC(e,n){return e.type&11?Br(e,n):e.type&4?xa(e,n):null}function ZC(e,n,t,r){return t===-1?YC(n,e):t===-2?QC(e,n,r):Go(e,e[S],t,n)}function QC(e,n,t){if(t===Y)return Br(n,e);if(t===At)return xa(n,e);if(t===Zt)return kg(n,e)}function Rg(e,n,t,r){let o=n[Ct].queries[r];if(o.matches===null){let i=e.data,s=t.matches,a=[];for(let l=0;s!==null&&l<s.length;l+=2){let c=s[l];if(c<0)a.push(null);else{let d=i[c];a.push(ZC(n,d,s[l+1],t.metadata.read))}}o.matches=a}return o.matches}function Yd(e,n,t,r){let o=e.queries.getByIndex(t),i=o.matches;if(i!==null){let s=Rg(e,n,o,t);for(let a=0;a<i.length;a+=2){let l=i[a];if(l>0)r.push(s[a/2]);else{let c=i[a+1],d=n[-l];for(let u=ye;u<d.length;u++){let h=d[u];h[dn]===h[we]&&Yd(h[S],h,c,r)}if(d[Gn]!==null){let u=d[Gn];for(let h=0;h<u.length;h++){let p=u[h];Yd(p[S],p,c,r)}}}}}return r}function Tu(e,n){return e[Ct].queries[n].queryList}function Og(e,n,t){let r=new ia((t&4)===4);return nh(e,n,r,r.destroy),(n[Ct]??=new Gd).queries.push(new zd(r))-1}function Fg(e,n,t){let r=De();return r.firstCreatePass&&(Lg(r,new da(e,n,t),-1),(n&2)===2&&(r.staticViewQueries=!0)),Og(r,k(),n)}function Pg(e,n,t,r){let o=De();if(o.firstCreatePass){let i=ke();Lg(o,new da(n,t,r),i.index),XC(o,e),(t&2)===2&&(o.staticContentQueries=!0)}return Og(o,k(),t)}function KC(e){return e.split(",").map(n=>n.trim())}function Lg(e,n,t){e.queries===null&&(e.queries=new Wd),e.queries.track(new qd(n,t))}function XC(e,n){let t=e.contentQueries||(e.contentQueries=[]),r=t.length?t[t.length-1]:-1;n!==r&&t.push(e.queries.length-1,n)}function Au(e,n){return e.queries.getByIndex(n)}function Vg(e,n){let t=e[S],r=Au(t,n);return r.crossesNgTemplate?Yd(t,e,n,[]):Rg(t,e,r,n)}function jg(e,n,t){let r,o=go(()=>{r._dirtyCounter();let i=JC(r,e);if(n&&i===void 0)throw new I(-951,!1);return i});return r=o[Ce],r._dirtyCounter=H(0),r._flatValue=void 0,o}function Nu(e){return jg(!0,!1,e)}function ku(e){return jg(!0,!0,e)}function Bg(e,n){let t=e[Ce];t._lView=k(),t._queryIndex=n,t._queryList=Tu(t._lView,n),t._queryList.onDirty(()=>t._dirtyCounter.update(r=>r+1))}function JC(e,n){let t=e._lView,r=e._queryIndex;if(t===void 0||r===void 0||t[T]&4)return n?void 0:Ne;let o=Tu(t,r),i=Vg(t,r);return o.reset(i,Dm),n?o.first:o._changesDetected||e._flatValue===void 0?e._flatValue=o.toArray():e._flatValue}var mn=class{};var Zo=class extends mn{injector;componentFactoryResolver=new Ud(this);instance=null;constructor(n){super();let t=new Ln([...n.providers,{provide:mn,useValue:this},{provide:Ma,useValue:this.componentFactoryResolver}],n.parent||Ir(),n.debugName,new Set(["environment"]));this.injector=t,n.runEnvironmentInitializers&&t.resolveInjectorInitializers()}destroy(){this.injector.destroy()}onDestroy(n){this.injector.onDestroy(n)}};function Hg(e,n,t=null){return new Zo({providers:e,parent:n,debugName:t,runEnvironmentInitializers:!0}).injector}var ew=(()=>{class e{_injector;cachedInjectors=new Map;constructor(t){this._injector=t}getOrCreateStandaloneInjector(t){if(!t.standalone)return null;if(!this.cachedInjectors.has(t)){let r=kc(!1,t.type),o=r.length>0?Hg([r],this._injector,""):null;this.cachedInjectors.set(t,o)}return this.cachedInjectors.get(t)}ngOnDestroy(){try{for(let t of this.cachedInjectors.values())t!==null&&t.destroy()}finally{this.cachedInjectors.clear()}}static \u0275prov=v({token:e,providedIn:"environment",factory:()=>new e(x(be))})}return e})();function $(e){return Xo(()=>{let n=Ug(e),t=Z(E({},n),{decls:e.decls,vars:e.vars,template:e.template,consts:e.consts||null,ngContentSelectors:e.ngContentSelectors,onPush:e.changeDetection===au.OnPush,directiveDefs:null,pipeDefs:null,dependencies:n.standalone&&e.dependencies||null,getStandaloneInjector:n.standalone?o=>o.get(ew).getOrCreateStandaloneInjector(t):null,getExternalStyles:null,signals:e.signals??!1,data:e.data||{},encapsulation:e.encapsulation||pt.Emulated,styles:e.styles||Ne,_:null,schemas:e.schemas||null,tView:null,id:""});n.standalone&&or("NgStandalone"),$g(t);let r=e.dependencies;return t.directiveDefs=Xh(r,tw),t.pipeDefs=Xh(r,Fp),t.id=ow(t),t})}function tw(e){return ln(e)||xc(e)}function te(e){return Xo(()=>({type:e.type,bootstrap:e.bootstrap||Ne,declarations:e.declarations||Ne,imports:e.imports||Ne,exports:e.exports||Ne,transitiveCompileScopes:null,schemas:e.schemas||null,id:e.id||null}))}function nw(e,n){if(e==null)return cn;let t={};for(let r in e)if(e.hasOwnProperty(r)){let o=e[r],i,s,a,l;Array.isArray(o)?(a=o[0],i=o[1],s=o[2]??i,l=o[3]||null):(i=o,s=o,a=ba.None,l=null),t[i]=[r,a,l],n[i]=s}return t}function rw(e){if(e==null)return cn;let n={};for(let t in e)e.hasOwnProperty(t)&&(n[e[t]]=t);return n}function W(e){return Xo(()=>{let n=Ug(e);return $g(n),n})}function Sa(e){return{type:e.type,name:e.name,factory:null,pure:e.pure!==!1,standalone:e.standalone??!0,onDestroy:e.type.prototype.ngOnDestroy||null}}function Ug(e){let n={};return{type:e.type,providersResolver:null,viewProvidersResolver:null,factory:null,hostBindings:e.hostBindings||null,hostVars:e.hostVars||0,hostAttrs:e.hostAttrs||null,contentQueries:e.contentQueries||null,declaredInputs:n,inputConfig:e.inputs||cn,exportAs:e.exportAs||null,standalone:e.standalone??!0,signals:e.signals===!0,selectors:e.selectors||Ne,viewQuery:e.viewQuery||null,features:e.features||null,setInput:null,resolveHostDirectives:null,hostDirectives:null,controlDef:null,inputs:nw(e.inputs,n),outputs:rw(e.outputs),debugInfo:null}}function $g(e){e.features?.forEach(n=>n(e))}function Xh(e,n){return e?()=>{let t=typeof e=="function"?e():e,r=[];for(let o of t){let i=n(o);i!==null&&r.push(i)}return r}:null}function ow(e){let n=0,t=typeof e.consts=="function"?"":e.consts,r=[e.selectors,e.ngContentSelectors,e.hostVars,e.hostAttrs,t,e.vars,e.decls,e.encapsulation,e.standalone,e.signals,e.exportAs,JSON.stringify(e.inputs),JSON.stringify(e.outputs),Object.getOwnPropertyNames(e.type.prototype),!!e.contentQueries,!!e.viewQuery];for(let i of r.join("|"))n=Math.imul(31,n)+i.charCodeAt(0)<<0;return n+=2147483648,"c"+n}function iw(e){return Object.getPrototypeOf(e.prototype).constructor}function Le(e){let n=iw(e.type),t=!0,r=[e];for(;n;){let o;if(wt(e))o=n.\u0275cmp||n.\u0275dir;else{if(n.\u0275cmp)throw new I(903,!1);o=n.\u0275dir}if(o){if(t){r.push(o);let s=e;s.inputs=md(e.inputs),s.declaredInputs=md(e.declaredInputs),s.outputs=md(e.outputs);let a=o.hostBindings;a&&dw(e,a);let l=o.viewQuery,c=o.contentQueries;if(l&&lw(e,l),c&&cw(e,c),sw(e,o),Op(e.outputs,o.outputs),wt(o)&&o.data.animation){let d=e.data;d.animation=(d.animation||[]).concat(o.data.animation)}}let i=o.features;if(i)for(let s=0;s<i.length;s++){let a=i[s];a&&a.ngInherit&&a(e),a===Le&&(t=!1)}}n=Object.getPrototypeOf(n)}aw(r)}function sw(e,n){for(let t in n.inputs){if(!n.inputs.hasOwnProperty(t)||e.inputs.hasOwnProperty(t))continue;let r=n.inputs[t];r!==void 0&&(e.inputs[t]=r,e.declaredInputs[t]=n.declaredInputs[t])}}function aw(e){let n=0,t=null;for(let r=e.length-1;r>=0;r--){let o=e[r];o.hostVars=n+=o.hostVars,o.hostAttrs=Fr(o.hostAttrs,t=Fr(t,o.hostAttrs))}}function md(e){return e===cn?{}:e===Ne?[]:e}function lw(e,n){let t=e.viewQuery;t?e.viewQuery=(r,o)=>{n(r,o),t(r,o)}:e.viewQuery=n}function cw(e,n){let t=e.contentQueries;t?e.contentQueries=(r,o,i)=>{n(r,o,i),t(r,o,i)}:e.contentQueries=n}function dw(e,n){let t=e.hostBindings;t?e.hostBindings=(r,o)=>{n(r,o),t(r,o)}:e.hostBindings=n}function zg(e,n,t,r,o,i,s,a){if(t.firstCreatePass){e.mergedAttrs=Fr(e.mergedAttrs,e.attrs);let d=e.tView=gu(2,e,o,i,s,t.directiveRegistry,t.pipeRegistry,null,t.schemas,t.consts,null);t.queries!==null&&(t.queries.template(t,e),d.queries=t.queries.embeddedTView(e))}a&&(e.flags|=a),Nr(e,!1);let l=fw(t,n,e,r);Us()&&Cu(t,n,l,e),Pr(l,n);let c=yg(l,n,l,e);n[r+ve]=c,yu(n,c),GC(c,e,n)}function uw(e,n,t,r,o,i,s,a,l,c,d){let u=t+ve,h;return n.firstCreatePass?(h=Ur(n,u,4,s||null,a||null),Yc()&&xg(n,e,h,Xe(n.consts,c),sg),cm(n,h)):h=n.data[u],zg(h,e,n,t,r,o,i,l),Vo(h)&&xu(n,e,h),c!=null&&wa(e,h,d),h}function Qo(e,n,t,r,o,i,s,a,l,c,d){let u=t+ve,h;if(n.firstCreatePass){if(h=Ur(n,u,4,s||null,a||null),c!=null){let p=Xe(n.consts,c);h.localNames=[];for(let m=0;m<p.length;m+=2)h.localNames.push(p[m],-1)}}else h=n.data[u];return zg(h,e,n,t,r,o,i,l),c!=null&&wa(e,h,d),h}function gn(e,n,t,r,o,i,s,a){let l=k(),c=De(),d=Xe(c.consts,i);return uw(l,c,e,n,t,r,o,d,void 0,s,a),gn}var fw=pw;function pw(e,n,t,r){return $s(!0),n[ue].createComment("")}function Ta(e){return typeof e=="function"&&e[Ce]!==void 0}var Ru=new g("");function $r(e){return!!e&&typeof e.then=="function"}function Ou(e){return!!e&&typeof e.subscribe=="function"}var Gg=new g("");var Fu=(()=>{class e{resolve;reject;initialized=!1;done=!1;donePromise=new Promise((t,r)=>{this.resolve=t,this.reject=r});appInits=f(Gg,{optional:!0})??[];injector=f(K);constructor(){}runInitializers(){if(this.initialized)return;let t=[];for(let o of this.appInits){let i=Mr(this.injector,o);if($r(i))t.push(i);else if(Ou(i)){let s=new Promise((a,l)=>{i.subscribe({complete:a,error:l})});t.push(s)}}let r=()=>{this.done=!0,this.resolve()};Promise.all(t).then(()=>{r()}).catch(o=>{this.reject(o)}),t.length===0&&r(),this.initialized=!0}static \u0275fac=function(r){return new(r||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),Wg=new g("");function qg(){jl(()=>{let e="";throw new I(600,e)})}function Yg(e){return e.isBoundToModule}var hw=10;var Nt=(()=>{class e{_runningTick=!1;_destroyed=!1;_destroyListeners=[];_views=[];internalErrorHandler=f(Ut);afterRenderManager=f(Da);zonelessEnabled=f(Ho);rootEffectScheduler=f(Gs);dirtyFlags=0;tracingSnapshot=null;allTestViews=new Set;autoDetectTestViews=new Set;includeAllTestViews=!1;afterTick=new A;get allViews(){return[...(this.includeAllTestViews?this.allTestViews:this.autoDetectTestViews).keys(),...this._views]}get destroyed(){return this._destroyed}componentTypes=[];components=[];internalPendingTask=f(Zn);get isStable(){return this.internalPendingTask.hasPendingTasksObservable.pipe(se(t=>!t))}constructor(){f(mt,{optional:!0})}whenStable(){let t;return new Promise(r=>{t=this.isStable.subscribe({next:o=>{o&&r()}})}).finally(()=>{t.unsubscribe()})}_injector=f(be);_rendererFactory=null;get injector(){return this._injector}bootstrap(t,r){return this.bootstrapImpl(t,r)}bootstrapImpl(t,r,o=K.NULL){return this._injector.get(N).run(()=>{X(G.BootstrapComponentStart);let s=t instanceof Ia;if(!this._injector.get(Fu).done){let m="";throw new I(405,m)}let l;s?l=t:l=this._injector.get(Ma).resolveComponentFactory(t),this.componentTypes.push(l.componentType);let c=Yg(l)?void 0:this._injector.get(mn),d=r||l.selector,u=l.create(o,[],d,c),h=u.location.nativeElement,p=u.injector.get(Ru,null);return p?.registerApplication(h),u.onDestroy(()=>{this.detachView(u.hostView),zo(this.components,u),p?.unregisterApplication(h)}),this._loadComponent(u),X(G.BootstrapComponentEnd,u),u})}tick(){this.zonelessEnabled||(this.dirtyFlags|=1),this._tick()}_tick(){X(G.ChangeDetectionStart),this.tracingSnapshot!==null?this.tracingSnapshot.run(_a.CHANGE_DETECTION,this.tickImpl):this.tickImpl()}tickImpl=()=>{if(this._runningTick)throw X(G.ChangeDetectionEnd),new I(101,!1);let t=M(null);try{this._runningTick=!0,this.synchronize()}finally{this._runningTick=!1,this.tracingSnapshot?.dispose(),this.tracingSnapshot=null,M(t),this.afterTick.next(),X(G.ChangeDetectionEnd)}};synchronize(){this._rendererFactory===null&&!this._injector.destroyed&&(this._rendererFactory=this._injector.get(Te,null,{optional:!0}));let t=0;for(;this.dirtyFlags!==0&&t++<hw;){X(G.ChangeDetectionSyncStart);try{this.synchronizeOnce()}finally{X(G.ChangeDetectionSyncEnd)}}}synchronizeOnce(){this.dirtyFlags&16&&(this.dirtyFlags&=-17,this.rootEffectScheduler.flush());let t=!1;if(this.dirtyFlags&7){let r=!!(this.dirtyFlags&1);this.dirtyFlags&=-8,this.dirtyFlags|=8;for(let{_lView:o}of this.allViews){if(!r&&!jo(o))continue;let i=r&&!this.zonelessEnabled?0:1;hg(o,i),t=!0}if(this.dirtyFlags&=-5,this.syncDirtyFlagsWithViews(),this.dirtyFlags&23)return}t||(this._rendererFactory?.begin?.(),this._rendererFactory?.end?.()),this.dirtyFlags&8&&(this.dirtyFlags&=-9,this.afterRenderManager.execute()),this.syncDirtyFlagsWithViews()}syncDirtyFlagsWithViews(){if(this.allViews.some(({_lView:t})=>jo(t))){this.dirtyFlags|=2;return}else this.dirtyFlags&=-8}attachView(t){let r=t;this._views.push(r),r.attachToAppRef(this)}detachView(t){let r=t;zo(this._views,r),r.detachFromAppRef()}_loadComponent(t){this.attachView(t.hostView);try{this.tick()}catch(o){this.internalErrorHandler(o)}this.components.push(t),this._injector.get(Wg,[]).forEach(o=>o(t))}ngOnDestroy(){if(!this._destroyed)try{this._destroyListeners.forEach(t=>t()),this._views.slice().forEach(t=>t.destroy())}finally{this._destroyed=!0,this._views=[],this._destroyListeners=[]}}onDestroy(t){return this._destroyListeners.push(t),()=>zo(this._destroyListeners,t)}destroy(){if(this._destroyed)throw new I(406,!1);let t=this._injector;t.destroy&&!t.destroyed&&t.destroy()}get viewCount(){return this._views.length}static \u0275fac=function(r){return new(r||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function zo(e,n){let t=e.indexOf(n);t>-1&&e.splice(t,1)}function le(e,n,t,r){let o=k(),i=Yn();if(Yt(o,i,n)){let s=De(),a=Hs();zE(a,o,e,n,t,r)}return le}var Zd=class{destroy(n){}updateValue(n,t){}swap(n,t){let r=Math.min(n,t),o=Math.max(n,t),i=this.detach(o);if(o-r>1){let s=this.detach(r);this.attach(r,i),this.attach(o,s)}else this.attach(r,i)}move(n,t){this.attach(t,this.detach(n))}};function gd(e,n,t,r,o){return e===t&&Object.is(n,r)?1:Object.is(o(e,n),o(t,r))?-1:0}function mw(e,n,t,r){let o,i,s=0,a=e.length-1,l=void 0;if(Array.isArray(n)){M(r);let c=n.length-1;for(M(null);s<=a&&s<=c;){let d=e.at(s),u=n[s],h=gd(s,d,s,u,t);if(h!==0){h<0&&e.updateValue(s,u),s++;continue}let p=e.at(a),m=n[c],D=gd(a,p,c,m,t);if(D!==0){D<0&&e.updateValue(a,m),a--,c--;continue}let C=t(s,d),w=t(a,p),ie=t(s,u);if(Object.is(ie,w)){let ze=t(c,m);Object.is(ze,C)?(e.swap(s,a),e.updateValue(a,m),c--,a--):e.move(a,s),e.updateValue(s,u),s++;continue}if(o??=new ua,i??=em(e,s,a,t),Qd(e,o,s,ie))e.updateValue(s,u),s++,a++;else if(i.has(ie))o.set(C,e.detach(s)),a--;else{let ze=e.create(s,n[s]);e.attach(s,ze),s++,a++}}for(;s<=c;)Jh(e,o,t,s,n[s]),s++}else if(n!=null){M(r);let c=n[Symbol.iterator]();M(null);let d=c.next();for(;!d.done&&s<=a;){let u=e.at(s),h=d.value,p=gd(s,u,s,h,t);if(p!==0)p<0&&e.updateValue(s,h),s++,d=c.next();else{o??=new ua,i??=em(e,s,a,t);let m=t(s,h);if(Qd(e,o,s,m))e.updateValue(s,h),s++,a++,d=c.next();else if(!i.has(m))e.attach(s,e.create(s,h)),s++,a++,d=c.next();else{let D=t(s,u);o.set(D,e.detach(s)),a--}}}for(;!d.done;)Jh(e,o,t,e.length,d.value),d=c.next()}for(;s<=a;)e.destroy(e.detach(a--));o?.forEach(c=>{e.destroy(c)})}function Qd(e,n,t,r){return n!==void 0&&n.has(r)?(e.attach(t,n.get(r)),n.delete(r),!0):!1}function Jh(e,n,t,r,o){if(Qd(e,n,r,t(r,o)))e.updateValue(r,o);else{let i=e.create(r,o);e.attach(r,i)}}function em(e,n,t,r){let o=new Set;for(let i=n;i<=t;i++)o.add(r(i,e.at(i)));return o}var ua=class{kvMap=new Map;_vMap=void 0;has(n){return this.kvMap.has(n)}delete(n){if(!this.has(n))return!1;let t=this.kvMap.get(n);return this._vMap!==void 0&&this._vMap.has(t)?(this.kvMap.set(n,this._vMap.get(t)),this._vMap.delete(t)):this.kvMap.delete(n),!0}get(n){return this.kvMap.get(n)}set(n,t){if(this.kvMap.has(n)){let r=this.kvMap.get(n);this._vMap===void 0&&(this._vMap=new Map);let o=this._vMap;for(;o.has(r);)r=o.get(r);o.set(r,t)}else this.kvMap.set(n,t)}forEach(n){for(let[t,r]of this.kvMap)if(n(r,t),this._vMap!==void 0){let o=this._vMap;for(;o.has(r);)r=o.get(r),n(r,t)}}};function j(e,n,t,r,o,i,s,a){or("NgControlFlow");let l=k(),c=De(),d=Xe(c.consts,i);return Qo(l,c,e,n,t,r,o,d,256,s,a),Pu}function Pu(e,n,t,r,o,i,s,a){or("NgControlFlow");let l=k(),c=De(),d=Xe(c.consts,i);return Qo(l,c,e,n,t,r,o,d,512,s,a),Pu}function B(e,n){or("NgControlFlow");let t=k(),r=Yn(),o=t[r]!==Je?t[r]:-1,i=o!==-1?fa(t,ve+o):void 0,s=0;if(Yt(t,r,e)){let a=M(null);try{if(i!==void 0&&_g(i,s),e!==-1){let l=ve+e,c=fa(t,l),d=eu(t[S],l),u=Eg(c,d,t),h=ni(t,d,n,{dehydratedView:u});ri(c,h,s,Lr(d,u))}}finally{M(a)}}else if(i!==void 0){let a=bg(i,s);a!==void 0&&(a[_e]=n)}}var Kd=class{lContainer;$implicit;$index;constructor(n,t,r){this.lContainer=n,this.$implicit=t,this.$index=r}get $count(){return this.lContainer.length-ye}};function Lu(e){return e}var Xd=class{hasEmptyBlock;trackByFn;liveCollection;constructor(n,t,r){this.hasEmptyBlock=n,this.trackByFn=t,this.liveCollection=r}};function oi(e,n,t,r,o,i,s,a,l,c,d,u,h){or("NgControlFlow");let p=k(),m=De(),D=l!==void 0,C=k(),w=a?s.bind(C[Pe][_e]):s,ie=new Xd(D,w);C[ve+e]=ie,Qo(p,m,e+1,n,t,r,o,Xe(m.consts,i),256),D&&Qo(p,m,e+2,l,c,d,u,Xe(m.consts,h),512)}var Jd=class extends Zd{lContainer;hostLView;templateTNode;operationsCounter=void 0;needsIndexUpdate=!1;constructor(n,t,r){super(),this.lContainer=n,this.hostLView=t,this.templateTNode=r}get length(){return this.lContainer.length-ye}at(n){return this.getLView(n)[_e].$implicit}attach(n,t){let r=t[Hn];this.needsIndexUpdate||=n!==this.length,ri(this.lContainer,t,n,Lr(this.templateTNode,r)),gw(this.lContainer,n)}detach(n){return this.needsIndexUpdate||=n!==this.length-1,vw(this.lContainer,n),yw(this.lContainer,n)}create(n,t){let r=aa(this.lContainer,this.templateTNode.tView.ssrId);return ni(this.hostLView,this.templateTNode,new Kd(this.lContainer,t,n),{dehydratedView:r})}destroy(n){Ea(n[S],n)}updateValue(n,t){this.getLView(n)[_e].$implicit=t}reset(){this.needsIndexUpdate=!1}updateIndexes(){if(this.needsIndexUpdate)for(let n=0;n<this.length;n++)this.getLView(n)[_e].$index=n}getLView(n){return bw(this.lContainer,n)}};function ii(e){let n=M(null),t=Ht();try{let r=k(),o=r[S],i=r[t],s=t+1,a=fa(r,s);if(i.liveCollection===void 0){let c=eu(o,s);i.liveCollection=new Jd(a,r,c)}else i.liveCollection.reset();let l=i.liveCollection;if(mw(l,e,i.trackByFn,n),l.updateIndexes(),i.hasEmptyBlock){let c=Yn(),d=l.length===0;if(Yt(r,c,d)){let u=t+2,h=fa(r,u);if(d){let p=eu(o,u),m=Eg(h,p,r),D=ni(r,p,void 0,{dehydratedView:m});ri(h,D,0,Lr(p,m))}else o.firstUpdatePass&&hC(h),_g(h,0)}}}finally{M(n)}}function fa(e,n){return e[n]}function gw(e,n){if(e.length<=ye)return;let t=ye+n,r=e[t],o=r?r[un]:void 0;if(r&&o&&o.detachedLeaveAnimationFns&&o.detachedLeaveAnimationFns.length>0){let i=r[Lt];DE(i,o),Jn.delete(r[Vt]),o.detachedLeaveAnimationFns=void 0}}function vw(e,n){if(e.length<=ye)return;let t=ye+n,r=e[t],o=r?r[un]:void 0;o&&o.leave&&o.leave.size>0&&(o.detachedLeaveAnimationFns=[])}function yw(e,n){return Yo(e,n)}function bw(e,n){return bg(e,n)}function eu(e,n){return Os(e,n)}function ce(e,n,t){let r=k(),o=Yn();if(Yt(r,o,n)){let i=De(),s=Hs();jE(s,r,e,n,r[ue],t)}return ce}function tu(e,n,t,r,o){Iu(n,e,t,o?"class":"style",r)}function y(e,n,t,r){let o=k(),i=o[S],s=e+ve,a=i.firstCreatePass?Mg(s,o,2,n,sg,Yc(),t,r):i.data[s];if(Bt(a)){let l=o[lt].tracingService;if(l&&l.componentCreate){let c=i.data[a.directiveStart+a.componentOffset];return l.componentCreate(Ag(c),()=>(tm(e,n,o,a,r),y))}}return tm(e,n,o,a,r),y}function tm(e,n,t,r,o){if(ag(r,t,e,n,Zg),Vo(r)){let i=t[S];xu(i,t,r),Om(i,r,t)}o!=null&&wa(t,r)}function b(){let e=De(),n=ke(),t=lg(n);return e.firstCreatePass&&Sg(e,t),Qc(t)&&Kc(),qc(),t.classesWithoutHost!=null&&uD(t)&&tu(e,t,k(),t.classesWithoutHost,!0),t.stylesWithoutHost!=null&&fD(t)&&tu(e,t,k(),t.stylesWithoutHost,!1),b}function re(e,n,t,r){return y(e,n,t,r),b(),re}function vn(e,n,t,r){let o=k(),i=o[S],s=e+ve,a=i.firstCreatePass?SC(s,i,2,n,t,r):i.data[s];return ag(a,o,e,n,Zg),r!=null&&wa(o,a),vn}function yn(){let e=ke(),n=lg(e);return Qc(n)&&Kc(),qc(),yn}function We(e,n,t,r){return vn(e,n,t,r),yn(),We}var Zg=(e,n,t,r,o)=>($s(!0),Hm(n[ue],r,vh()));function Qt(){return k()}function zr(e,n,t){let r=k(),o=Yn();if(Yt(r,o,n)){let i=De(),s=Hs();ig(s,r,e,n,r[ue],t)}return zr}var si="en-US";var _w=si;function Qg(e){typeof e=="string"&&(_w=e.toLowerCase().replace(/_/g,"-"))}function ne(e,n,t){let r=k(),o=De(),i=ke();return Dw(o,r,r[ue],i,e,n,t),ne}function Dw(e,n,t,r,o,i,s){let a=!0,l=null;if((r.type&3||s)&&(l??=pd(r,n,i),AC(r,e,n,s,t,o,i,l)&&(a=!1)),a){let c=r.outputs?.[o],d=r.hostDirectiveOutputs?.[o];if(d&&d.length)for(let u=0;u<d.length;u+=2){let h=d[u],p=d[u+1];l??=pd(r,n,i),Zh(r,n,h,p,o,l)}if(c&&c.length)for(let u of c)l??=pd(r,n,i),Zh(r,n,u,o,o,l)}}function V(e=1){return gh(e)}function Ew(e,n){let t=null,r=sE(e);for(let o=0;o<n.length;o++){let i=n[o];if(i==="*"){t=o;continue}if(r===null?qm(e,i,!0):cE(r,i))return o}return t}function qe(e){let n=k()[Pe][Fe];if(!n.projection){let t=e?e.length:1,r=n.projection=Hp(t,null),o=r.slice(),i=n.child;for(;i!==null;){if(i.type!==128){let s=e?Ew(i,e):0;s!==null&&(o[s]?o[s].projectionNext=i:r[s]=i,o[s]=i)}i=i.next}}}function de(e,n=0,t,r,o,i){let s=k(),a=De(),l=r?e+1:null;l!==null&&Qo(s,a,l,r,o,i,null,t);let c=Ur(a,ve+e,16,null,t||null);c.projection===null&&(c.projection=n),ed();let u=!s[Hn]||Zc();s[Pe][Fe].projection[c.projection]===null&&l!==null?Cw(s,a,l):u&&!ma(c)&&kE(a,s,c)}function Cw(e,n,t){let r=ve+t,o=n.data[r],i=e[r],s=aa(i,o.tView.ssrId),a=ni(e,o,void 0,{dehydratedView:s});ri(i,a,0,Lr(o,s))}function Gr(e,n,t,r){return Pg(e,n,t,r),Gr}function gt(e,n,t){return Fg(e,n,t),gt}function pe(e){let n=k(),t=De(),r=Vs();Bo(r+1);let o=Au(t,r);if(e.dirty&&Xp(n)===((o.metadata.flags&2)===2)){if(o.matches===null)e.reset([]);else{let i=Vg(n,r);e.reset(i,Dm),e.notifyOnChanges()}return!0}return!1}function he(){return Tu(k(),Vs())}function Aa(e,n,t,r,o){return Bg(n,Pg(e,t,r,o)),Aa}function Na(e,n,t,r){return Bg(e,Fg(n,t,r)),Na}function ka(e=1){Bo(Vs()+e)}function Wr(e){let n=sh();return Bc(n,ve+e)}function Zs(e,n){return e<<17|n<<2}function er(e){return e>>17&32767}function ww(e){return(e&2)==2}function xw(e,n){return e&131071|n<<17}function nu(e){return e|2}function jr(e){return(e&131068)>>2}function vd(e,n){return e&-131069|n<<2}function Iw(e){return(e&1)===1}function ru(e){return e|1}function Mw(e,n,t,r,o,i){let s=i?n.classBindings:n.styleBindings,a=er(s),l=jr(s);e[r]=t;let c=!1,d;if(Array.isArray(t)){let u=t;d=u[1],(d===null||xr(u,d)>0)&&(c=!0)}else d=t;if(o)if(l!==0){let h=er(e[a+1]);e[r+1]=Zs(h,a),h!==0&&(e[h+1]=vd(e[h+1],r)),e[a+1]=xw(e[a+1],r)}else e[r+1]=Zs(a,0),a!==0&&(e[a+1]=vd(e[a+1],r)),a=r;else e[r+1]=Zs(l,0),a===0?a=r:e[l+1]=vd(e[l+1],r),l=r;c&&(e[r+1]=nu(e[r+1])),nm(e,d,r,!0),nm(e,d,r,!1),Sw(n,d,e,r,i),s=Zs(a,l),i?n.classBindings=s:n.styleBindings=s}function Sw(e,n,t,r,o){let i=o?e.residualClasses:e.residualStyles;i!=null&&typeof n=="string"&&xr(i,n)>=0&&(t[r+1]=ru(t[r+1]))}function nm(e,n,t,r){let o=e[t+1],i=n===null,s=r?er(o):jr(o),a=!1;for(;s!==0&&(a===!1||i);){let l=e[s],c=e[s+1];Tw(l,n)&&(a=!0,e[s+1]=r?ru(c):nu(c)),s=r?er(c):jr(c)}a&&(e[t+1]=r?nu(o):ru(o))}function Tw(e,n){return e===null||n==null||(Array.isArray(e)?e[1]:e)===n?!0:Array.isArray(e)&&typeof n=="string"?xr(e,n)>=0:!1}var ft={textEnd:0,key:0,keyEnd:0,value:0,valueEnd:0};function Aw(e){return e.substring(ft.key,ft.keyEnd)}function Nw(e){return kw(e),Kg(e,Xg(e,0,ft.textEnd))}function Kg(e,n){let t=ft.textEnd;return t===n?-1:(n=ft.keyEnd=Rw(e,ft.key=n,t),Xg(e,n,t))}function kw(e){ft.key=0,ft.keyEnd=0,ft.value=0,ft.valueEnd=0,ft.textEnd=e.length}function Xg(e,n,t){for(;n<t&&e.charCodeAt(n)<=32;)n++;return n}function Rw(e,n,t){for(;n<t&&e.charCodeAt(n)>32;)n++;return n}function Ra(e,n,t){return Jg(e,n,t,!1),Ra}function U(e,n){return Jg(e,n,null,!0),U}function ai(e){Fw(Hw,Ow,e,!0)}function Ow(e,n){for(let t=Nw(n);t>=0;t=Kg(n,t))Ns(e,Aw(n),!0)}function Jg(e,n,t,r){let o=k(),i=De(),s=nd(2);if(i.firstUpdatePass&&tv(i,e,s,r),n!==Je&&Yt(o,s,n)){let a=i.data[Ht()];nv(i,a,o,o[ue],e,o[s+1]=$w(n,t),r,s)}}function Fw(e,n,t,r){let o=De(),i=nd(2);o.firstUpdatePass&&tv(o,null,i,r);let s=k();if(t!==Je&&Yt(s,i,t)){let a=o.data[Ht()];if(rv(a,r)&&!ev(o,i)){let l=r?a.classesWithoutHost:a.stylesWithoutHost;l!==null&&(t=Is(l,t||"")),tu(o,a,s,t,r)}else Uw(o,a,s,s[ue],s[i+1],s[i+1]=Bw(e,n,t),r,i)}}function ev(e,n){return n>=e.expandoStartIndex}function tv(e,n,t,r){let o=e.data;if(o[t+1]===null){let i=o[Ht()],s=ev(e,t);rv(i,r)&&n===null&&!s&&(n=!1),n=Pw(o,i,n,r),Mw(o,i,n,t,s,r)}}function Pw(e,n,t,r){let o=fh(e),i=r?n.residualClasses:n.residualStyles;if(o===null)(r?n.classBindings:n.styleBindings)===0&&(t=yd(null,e,n,t,r),t=Ko(t,n.attrs,r),i=null);else{let s=n.directiveStylingLast;if(s===-1||e[s]!==o)if(t=yd(o,e,n,t,r),i===null){let l=Lw(e,n,r);l!==void 0&&Array.isArray(l)&&(l=yd(null,e,n,l[1],r),l=Ko(l,n.attrs,r),Vw(e,n,r,l))}else i=jw(e,n,r)}return i!==void 0&&(r?n.residualClasses=i:n.residualStyles=i),t}function Lw(e,n,t){let r=t?n.classBindings:n.styleBindings;if(jr(r)!==0)return e[er(r)]}function Vw(e,n,t,r){let o=t?n.classBindings:n.styleBindings;e[er(o)]=r}function jw(e,n,t){let r,o=n.directiveEnd;for(let i=1+n.directiveStylingLast;i<o;i++){let s=e[i].hostAttrs;r=Ko(r,s,t)}return Ko(r,n.attrs,t)}function yd(e,n,t,r,o){let i=null,s=t.directiveEnd,a=t.directiveStylingLast;for(a===-1?a=t.directiveStart:a++;a<s&&(i=n[a],r=Ko(r,i.hostAttrs,o),i!==e);)a++;return e!==null&&(t.directiveStylingLast=a),r}function Ko(e,n,t){let r=t?1:2,o=-1;if(n!==null)for(let i=0;i<n.length;i++){let s=n[i];typeof s=="number"?o=s:o===r&&(Array.isArray(e)||(e=e===void 0?[]:["",e]),Ns(e,s,t?!0:n[++i]))}return e===void 0?null:e}function Bw(e,n,t){if(t==null||t==="")return Ne;let r=[],o=ht(t);if(Array.isArray(o))for(let i=0;i<o.length;i++)e(r,o[i],!0);else if(o instanceof Set)for(let i of o)e(r,i,!0);else if(typeof o=="object")for(let i in o)o.hasOwnProperty(i)&&e(r,i,o[i]);else typeof o=="string"&&n(r,o);return r}function Hw(e,n,t){let r=String(n);r!==""&&!r.includes(" ")&&Ns(e,r,t)}function Uw(e,n,t,r,o,i,s,a){o===Je&&(o=Ne);let l=0,c=0,d=0<o.length?o[0]:null,u=0<i.length?i[0]:null;for(;d!==null||u!==null;){let h=l<o.length?o[l+1]:void 0,p=c<i.length?i[c+1]:void 0,m=null,D;d===u?(l+=2,c+=2,h!==p&&(m=u,D=p)):u===null||d!==null&&d<u?(l+=2,m=d):(c+=2,m=u,D=p),m!==null&&nv(e,n,t,r,m,D,s,a),d=l<o.length?o[l]:null,u=c<i.length?i[c]:null}}function nv(e,n,t,r,o,i,s,a){if(!(n.type&3))return;let l=e.data,c=l[a+1],d=Iw(c)?rm(l,n,t,o,jr(c),s):void 0;if(!pa(d)){pa(i)||ww(c)&&(i=rm(l,null,t,o,a,s));let u=jc(Ht(),t);OE(r,s,u,o,i)}}function rm(e,n,t,r,o,i){let s=n===null,a;for(;o>0;){let l=e[o],c=Array.isArray(l),d=c?l[1]:l,u=d===null,h=t[o+1];h===Je&&(h=u?Ne:void 0);let p=u?ks(h,r):d===r?h:void 0;if(c&&!pa(p)&&(p=ks(l,r)),pa(p)&&(a=p,s))return a;let m=e[o+1];o=s?er(m):jr(m)}if(n!==null){let l=i?n.residualClasses:n.residualStyles;l!=null&&(a=ks(l,r))}return a}function pa(e){return e!==void 0}function $w(e,n){return e==null||e===""||(typeof n=="string"?e=e+n:typeof e=="object"&&(e=xs(ht(e)))),e}function rv(e,n){return(e.flags&(n?8:16))!==0}function R(e,n=""){let t=k(),r=De(),o=e+ve,i=r.firstCreatePass?Ur(r,o,1,n,null):r.data[o],s=zw(r,t,i,n);t[o]=s,Us()&&Cu(r,t,s,i),Nr(i,!1)}var zw=(e,n,t,r)=>($s(!0),KD(n[ue],r));function Gw(e,n,t,r=""){return Yt(e,Yn(),t)?n+Oo(t)+r:Je}function Me(e){return kt("",e),Me}function kt(e,n,t){let r=k(),o=Gw(r,e,n,t);return o!==Je&&Ww(r,Ht(),o),kt}function Ww(e,n,t){let r=jc(n,e);XD(e[ue],r,t)}function om(e,n,t){let r=De();r.firstCreatePass&&ov(n,r.data,r.blueprint,wt(e),t)}function ov(e,n,t,r,o){if(e=Se(e),Array.isArray(e))for(let i=0;i<e.length;i++)ov(e[i],n,t,r,o);else{let i=De(),s=k(),a=ke(),l=Pn(e)?e:Se(e.provide),c=Oc(e),d=a.providerIndexes&1048575,u=a.directiveStart,h=a.providerIndexes>>20;if(Pn(e)||!e.multi){let p=new Xn(c,o,fe,null),m=_d(l,n,o?d:d+h,u);m===-1?(Ed(oa(a,s),i,l),bd(i,e,n.length),n.push(l),a.directiveStart++,a.directiveEnd++,o&&(a.providerIndexes+=1048576),t.push(p),s.push(p)):(t[m]=p,s[m]=p)}else{let p=_d(l,n,d+h,u),m=_d(l,n,d,d+h),D=p>=0&&t[p],C=m>=0&&t[m];if(o&&!C||!o&&!D){Ed(oa(a,s),i,l);let w=Zw(o?Yw:qw,t.length,o,r,c,e);!o&&C&&(t[m].providerFactory=w),bd(i,e,n.length,0),n.push(l),a.directiveStart++,a.directiveEnd++,o&&(a.providerIndexes+=1048576),t.push(w),s.push(w)}else{let w=iv(t[o?m:p],c,!o&&r);bd(i,e,p>-1?p:m,w)}!o&&r&&C&&t[m].componentProviders++}}}function bd(e,n,t,r){let o=Pn(n),i=qp(n);if(o||i){let l=(i?Se(n.useClass):n).prototype.ngOnDestroy;if(l){let c=e.destroyHooks||(e.destroyHooks=[]);if(!o&&n.multi){let d=c.indexOf(t);d===-1?c.push(t,[r,l]):c[d+1].push(r,l)}else c.push(t,l)}}}function iv(e,n,t){return t&&e.componentProviders++,e.multi.push(n)-1}function _d(e,n,t,r){for(let o=t;o<r;o++)if(n[o]===e)return o;return-1}function qw(e,n,t,r,o){return ou(this.multi,[])}function Yw(e,n,t,r,o){let i=this.multi,s;if(this.providerFactory){let a=this.providerFactory.componentProviders,l=Go(r,r[S],this.providerFactory.index,o);s=l.slice(0,a),ou(i,s);for(let c=a;c<l.length;c++)s.push(l[c])}else s=[],ou(i,s);return s}function ou(e,n){for(let t=0;t<e.length;t++){let r=e[t];n.push(r())}return n}function Zw(e,n,t,r,o,i){let s=new Xn(e,t,fe,null);return s.multi=[],s.index=n,s.componentProviders=0,iv(s,o,r&&!t),s}function vt(e,n){return t=>{t.providersResolver=(r,o)=>om(r,o?o(e):e,!1),n&&(t.viewProvidersResolver=(r,o)=>om(r,o?o(n):n,!0))}}function Qw(e,n){let t=e[n];return t===Je?void 0:t}function Kw(e,n,t,r,o,i){let s=n+t;return Yt(e,s,o)?TC(e,s+1,i?r.call(i,o):r(o)):Qw(e,s+1)}function Vu(e,n){let t=De(),r,o=e+ve;t.firstCreatePass?(r=Xw(n,t.pipeRegistry),t.data[o]=r,r.onDestroy&&(t.destroyHooks??=[]).push(o,r.onDestroy)):r=t.data[o];let i=r.factory||(r.factory=rn(r.type,!0)),s,a=Oe(fe);try{let l=ra(!1),c=i();return ra(l),Hc(t,k(),o,c),c}finally{Oe(a)}}function Xw(e,n){if(n)for(let t=n.length-1;t>=0;t--){let r=n[t];if(e===r.name)return r}}function ju(e,n,t){let r=e+ve,o=k(),i=Bc(o,r);return Jw(o,r)?Kw(o,ah(),n,i.transform,t,i):i.transform(t)}function Jw(e,n){return e[S].data[n].pure}function Bu(e,n){return xa(e,n)}var sv=(()=>{class e{applicationErrorHandler=f(Ut);appRef=f(Nt);taskService=f(Zn);ngZone=f(N);zonelessEnabled=f(Ho);tracing=f(mt,{optional:!0});zoneIsDefined=typeof Zone<"u"&&!!Zone.root.run;schedulerTickApplyArgs=[{data:{__scheduler_tick__:!0}}];subscriptions=new me;angularZoneId=this.zoneIsDefined?this.ngZone._inner?.get(ko):null;scheduleInRootZone=!this.zonelessEnabled&&this.zoneIsDefined&&(f(cd,{optional:!0})??!1);cancelScheduledCallback=null;useMicrotaskScheduler=!1;runningTick=!1;pendingRenderTaskId=null;constructor(){this.subscriptions.add(this.appRef.afterTick.subscribe(()=>{let t=this.taskService.add();if(!this.runningTick&&(this.cleanup(),!this.zonelessEnabled||this.appRef.includeAllTestViews)){this.taskService.remove(t);return}this.switchToMicrotaskScheduler(),this.taskService.remove(t)})),this.subscriptions.add(this.ngZone.onUnstable.subscribe(()=>{this.runningTick||this.cleanup()}))}switchToMicrotaskScheduler(){this.ngZone.runOutsideAngular(()=>{let t=this.taskService.add();this.useMicrotaskScheduler=!0,queueMicrotask(()=>{this.useMicrotaskScheduler=!1,this.taskService.remove(t)})})}notify(t){if(!this.zonelessEnabled&&t===5)return;switch(t){case 0:{this.appRef.dirtyFlags|=2;break}case 3:case 2:case 4:case 5:case 1:{this.appRef.dirtyFlags|=4;break}case 6:{this.appRef.dirtyFlags|=2;break}case 12:{this.appRef.dirtyFlags|=16;break}case 13:{this.appRef.dirtyFlags|=2;break}case 11:break;default:this.appRef.dirtyFlags|=8}if(this.appRef.tracingSnapshot=this.tracing?.snapshot(this.appRef.tracingSnapshot)??null,!this.shouldScheduleTick())return;let r=this.useMicrotaskScheduler?Eh:id;this.pendingRenderTaskId=this.taskService.add(),this.scheduleInRootZone?this.cancelScheduledCallback=Zone.root.run(()=>r(()=>this.tick())):this.cancelScheduledCallback=this.ngZone.runOutsideAngular(()=>r(()=>this.tick()))}shouldScheduleTick(){return!(this.appRef.destroyed||this.pendingRenderTaskId!==null||this.runningTick||this.appRef._runningTick||!this.zonelessEnabled&&this.zoneIsDefined&&Zone.current.get(ko+this.angularZoneId))}tick(){if(this.runningTick||this.appRef.destroyed)return;if(this.appRef.dirtyFlags===0){this.cleanup();return}!this.zonelessEnabled&&this.appRef.dirtyFlags&7&&(this.appRef.dirtyFlags|=1);let t=this.taskService.add();try{this.ngZone.run(()=>{this.runningTick=!0,this.appRef._tick()},void 0,this.schedulerTickApplyArgs)}catch(r){this.applicationErrorHandler(r)}finally{this.taskService.remove(t),this.cleanup()}}ngOnDestroy(){this.subscriptions.unsubscribe(),this.cleanup()}cleanup(){if(this.runningTick=!1,this.cancelScheduledCallback?.(),this.cancelScheduledCallback=null,this.pendingRenderTaskId!==null){let t=this.pendingRenderTaskId;this.pendingRenderTaskId=null,this.taskService.remove(t)}}static \u0275fac=function(r){return new(r||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function av(){return[{provide:Et,useExisting:sv},{provide:N,useClass:Ro},{provide:Ho,useValue:!0}]}function ex(){return typeof $localize<"u"&&$localize.locale||si}var Oa=new g("",{factory:()=>f(Oa,{optional:!0,skipSelf:!0})||ex()});function yt(e){return Tp(e)}function Re(e,n){return go(e,n?.equal)}var fv=Symbol("InputSignalNode#UNSET"),hx=Z(E({},vo),{transformFn:void 0,applyValueToInputSignal(e,n){mr(e,n)}});function pv(e,n){let t=Object.create(hx);t.value=e,t.transformFn=n?.transform;function r(){if(In(t),t.value===fv){let o=null;throw new I(-950,o)}return t.value}return r[Ce]=t,r}var qr=class{attributeName;constructor(n){this.attributeName=n}__NG_ELEMENT_ID__=()=>su(this.attributeName);toString(){return`HostAttributeToken ${this.attributeName}`}};function lv(e,n){return pv(e,n)}function mx(e){return pv(fv,e)}var bn=(lv.required=mx,lv);function cv(e,n){return Nu(n)}function gx(e,n){return ku(n)}var ci=(cv.required=gx,cv);function dv(e,n){return Nu(n)}function vx(e,n){return ku(n)}var hv=(dv.required=vx,dv);var Uu=new g(""),yx=new g("");function li(e){return!e.moduleRef}function bx(e){let n=li(e)?e.r3Injector:e.moduleRef.injector,t=n.get(N);return t.run(()=>{li(e)?e.r3Injector.resolveInjectorInitializers():e.moduleRef.resolveInjectorInitializers();let r=n.get(Ut),o;if(t.runOutsideAngular(()=>{o=t.onError.subscribe({next:r})}),li(e)){let i=()=>n.destroy(),s=e.platformInjector.get(Uu);s.add(i),n.onDestroy(()=>{o.unsubscribe(),s.delete(i)})}else{let i=()=>e.moduleRef.destroy(),s=e.platformInjector.get(Uu);s.add(i),e.moduleRef.onDestroy(()=>{zo(e.allPlatformModules,e.moduleRef),o.unsubscribe(),s.delete(i)})}return Dx(r,t,()=>{let i=n.get(Zn),s=i.add(),a=n.get(Fu);return a.runInitializers(),a.donePromise.then(()=>{let l=n.get(Oa,si);if(Qg(l||si),!n.get(yx,!0))return li(e)?n.get(Nt):(e.allPlatformModules.push(e.moduleRef),e.moduleRef);if(li(e)){let d=n.get(Nt);return e.rootComponent!==void 0&&d.bootstrap(e.rootComponent),d}else return _x?.(e.moduleRef,e.allPlatformModules),e.moduleRef}).finally(()=>{i.remove(s)})})})}var _x;function Dx(e,n,t){try{let r=t();return $r(r)?r.catch(o=>{throw n.runOutsideAngular(()=>e(o)),o}):r}catch(r){throw n.runOutsideAngular(()=>e(r)),r}}var Fa=null;function Ex(e=[],n){return K.create({name:n,providers:[{provide:Po,useValue:"platform"},{provide:Uu,useValue:new Set([()=>Fa=null])},...e]})}function Cx(e=[]){if(Fa)return Fa;let n=Ex(e);return Fa=n,qg(),wx(n),n}function wx(e){let n=e.get(ha,null);Mr(e,()=>{n?.forEach(t=>t())})}var xx=1e4;var NB=xx-1e3;var Kt=(()=>{class e{static __NG_ELEMENT_ID__=Ix}return e})();function Ix(e){return Mx(ke(),k(),(e&16)===16)}function Mx(e,n,t){if(Bt(e)&&!t){let r=Ke(e.index,n);return new hn(r,r)}else if(e.type&175){let r=n[Pe];return new hn(r,n)}return null}function mv(e){let{rootComponent:n,appProviders:t,platformProviders:r,platformRef:o}=e;X(G.BootstrapApplicationStart);try{let i=o?.injector??Cx(r),s=[av(),wh,...t||[]],a=new Zo({providers:s,parent:i,debugName:"",runEnvironmentInitializers:!1});return bx({r3Injector:a.injector,platformInjector:i,rootComponent:n})}catch(i){return Promise.reject(i)}finally{X(G.BootstrapApplicationEnd)}}function oe(e){return typeof e=="boolean"?e:e!=null&&e!=="false"}function gv(e,n=NaN){return!isNaN(parseFloat(e))&&!isNaN(Number(e))?Number(e):n}var Hu=Symbol("NOT_SET"),vv=new Set,Sx=Z(E({},vo),{kind:"afterRenderEffectPhase",consumerIsAlwaysLive:!0,consumerAllowSignalWrites:!0,value:Hu,cleanup:null,consumerMarkedDirty(){if(this.sequence.impl.executing){if(this.sequence.lastPhase===null||this.sequence.lastPhase<this.phase)return;this.sequence.erroredOrDestroyed=!0}this.sequence.scheduler.notify(7)},phaseFn(e){if(this.sequence.lastPhase=this.phase,!this.dirty)return this.signal;if(this.dirty=!1,this.value!==Hu&&!pr(this))return this.signal;try{for(let o of this.cleanup??vv)o()}finally{this.cleanup?.clear()}let n=[];e!==void 0&&n.push(e),n.push(this.registerCleanupFn);let t=tn(this),r;try{r=this.userFn.apply(null,n)}finally{Mn(this,t)}return(this.value===Hu||!this.equal(this.value,r))&&(this.value=r,this.version++),this.signal}}),$u=class extends Wo{scheduler;lastPhase=null;nodes=[void 0,void 0,void 0,void 0];onDestroyFns=null;constructor(n,t,r,o,i,s=null){super(n,[void 0,void 0,void 0,void 0],r,!1,i.get(Mt),s),this.scheduler=o;for(let a of _u){let l=t[a];if(l===void 0)continue;let c=Object.create(Sx);c.sequence=this,c.phase=a,c.userFn=l,c.dirty=!0,c.signal=()=>(In(c),c.value),c.signal[Ce]=c,c.registerCleanupFn=d=>(c.cleanup??=new Set).add(d),this.nodes[a]=c,this.hooks[a]=d=>c.phaseFn(d)}}afterRun(){super.afterRun(),this.lastPhase=null}destroy(){if(this.onDestroyFns!==null)for(let n of this.onDestroyFns)n();super.destroy();for(let n of this.nodes)if(n)try{for(let t of n.cleanup??vv)t()}finally{nn(n)}}};function yv(e,n){let t=n?.injector??f(K),r=t.get(Et),o=t.get(Da),i=t.get(mt,null,{optional:!0});o.impl??=t.get(Du);let s=e;typeof s=="function"&&(s={mixedReadWrite:e});let a=t.get(kr,null,{optional:!0}),l=new $u(o.impl,[s.earlyRead,s.write,s.mixedReadWrite,s.read],a?.view,r,t,i?.snapshot(null));return o.impl.register(l),l}function La(e,n){let t=ln(e),r=n.elementInjector||Ir();return new Vr(t).create(r,n.projectableNodes,n.hostElement,n.environmentInjector,n.directives,n.bindings)}var bv=null;function Xt(){return bv}function zu(e){bv??=e}var di=class{},Yr=(()=>{class e{historyGo(t){throw new Error("")}static \u0275fac=function(r){return new(r||e)};static \u0275prov=v({token:e,factory:()=>f(_v),providedIn:"platform"})}return e})();var _v=(()=>{class e extends Yr{_location;_history;_doc=f(F);constructor(){super(),this._location=window.location,this._history=window.history}getBaseHrefFromDOM(){return Xt().getBaseHref(this._doc)}onPopState(t){let r=Xt().getGlobalEventTarget(this._doc,"window");return r.addEventListener("popstate",t,!1),()=>r.removeEventListener("popstate",t)}onHashChange(t){let r=Xt().getGlobalEventTarget(this._doc,"window");return r.addEventListener("hashchange",t,!1),()=>r.removeEventListener("hashchange",t)}get href(){return this._location.href}get protocol(){return this._location.protocol}get hostname(){return this._location.hostname}get port(){return this._location.port}get pathname(){return this._location.pathname}get search(){return this._location.search}get hash(){return this._location.hash}set pathname(t){this._location.pathname=t}pushState(t,r,o){this._history.pushState(t,r,o)}replaceState(t,r,o){this._history.replaceState(t,r,o)}forward(){this._history.forward()}back(){this._history.back()}historyGo(t=0){this._history.go(t)}getState(){return this._history.state}static \u0275fac=function(r){return new(r||e)};static \u0275prov=v({token:e,factory:()=>new e,providedIn:"platform"})}return e})();function Cv(e,n){return e?n?e.endsWith("/")?n.startsWith("/")?e+n.slice(1):e+n:n.startsWith("/")?e+n:`${e}/${n}`:e:n}function Dv(e){let n=e.search(/#|\?|$/);return e[n-1]==="/"?e.slice(0,n-1)+e.slice(n):e}function _n(e){return e&&e[0]!=="?"?`?${e}`:e}var Va=(()=>{class e{historyGo(t){throw new Error("")}static \u0275fac=function(r){return new(r||e)};static \u0275prov=v({token:e,factory:()=>f(Ax),providedIn:"root"})}return e})(),Tx=new g(""),Ax=(()=>{class e extends Va{_platformLocation;_baseHref;_removeListenerFns=[];constructor(t,r){super(),this._platformLocation=t,this._baseHref=r??this._platformLocation.getBaseHrefFromDOM()??f(F).location?.origin??""}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(t){this._removeListenerFns.push(this._platformLocation.onPopState(t),this._platformLocation.onHashChange(t))}getBaseHref(){return this._baseHref}prepareExternalUrl(t){return Cv(this._baseHref,t)}path(t=!1){let r=this._platformLocation.pathname+_n(this._platformLocation.search),o=this._platformLocation.hash;return o&&t?`${r}${o}`:r}pushState(t,r,o,i){let s=this.prepareExternalUrl(o+_n(i));this._platformLocation.pushState(t,r,s)}replaceState(t,r,o,i){let s=this.prepareExternalUrl(o+_n(i));this._platformLocation.replaceState(t,r,s)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(t=0){this._platformLocation.historyGo?.(t)}static \u0275fac=function(r){return new(r||e)(x(Yr),x(Tx,8))};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var ja=(()=>{class e{_subject=new A;_basePath;_locationStrategy;_urlChangeListeners=[];_urlChangeSubscription=null;constructor(t){this._locationStrategy=t;let r=this._locationStrategy.getBaseHref();this._basePath=Rx(Dv(Ev(r))),this._locationStrategy.onPopState(o=>{this._subject.next({url:this.path(!0),pop:!0,state:o.state,type:o.type})})}ngOnDestroy(){this._urlChangeSubscription?.unsubscribe(),this._urlChangeListeners=[]}path(t=!1){return this.normalize(this._locationStrategy.path(t))}getState(){return this._locationStrategy.getState()}isCurrentPathEqualTo(t,r=""){return this.path()==this.normalize(t+_n(r))}normalize(t){return e.stripTrailingSlash(kx(this._basePath,Ev(t)))}prepareExternalUrl(t){return t&&t[0]!=="/"&&(t="/"+t),this._locationStrategy.prepareExternalUrl(t)}go(t,r="",o=null){this._locationStrategy.pushState(o,"",t,r),this._notifyUrlChangeListeners(this.prepareExternalUrl(t+_n(r)),o)}replaceState(t,r="",o=null){this._locationStrategy.replaceState(o,"",t,r),this._notifyUrlChangeListeners(this.prepareExternalUrl(t+_n(r)),o)}forward(){this._locationStrategy.forward()}back(){this._locationStrategy.back()}historyGo(t=0){this._locationStrategy.historyGo?.(t)}onUrlChange(t){return this._urlChangeListeners.push(t),this._urlChangeSubscription??=this.subscribe(r=>{this._notifyUrlChangeListeners(r.url,r.state)}),()=>{let r=this._urlChangeListeners.indexOf(t);this._urlChangeListeners.splice(r,1),this._urlChangeListeners.length===0&&(this._urlChangeSubscription?.unsubscribe(),this._urlChangeSubscription=null)}}_notifyUrlChangeListeners(t="",r){this._urlChangeListeners.forEach(o=>o(t,r))}subscribe(t,r,o){return this._subject.subscribe({next:t,error:r??void 0,complete:o??void 0})}static normalizeQueryParams=_n;static joinWithSlash=Cv;static stripTrailingSlash=Dv;static \u0275fac=function(r){return new(r||e)(x(Va))};static \u0275prov=v({token:e,factory:()=>Nx(),providedIn:"root"})}return e})();function Nx(){return new ja(x(Va))}function kx(e,n){if(!e||!n.startsWith(e))return n;let t=n.substring(e.length);return t===""||["/",";","?","#"].includes(t[0])?t:n}function Ev(e){return e.replace(/\/index.html$/,"")}function Rx(e){if(new RegExp("^(https?:)?//").test(e)){let[,t]=e.split(/\/\/[^\/]+/);return t}return e}var Gu=(()=>{class e{_viewContainerRef;_viewRef=null;ngTemplateOutletContext=null;ngTemplateOutlet=null;ngTemplateOutletInjector=null;injector=f(K);constructor(t){this._viewContainerRef=t}ngOnChanges(t){if(this._shouldRecreateView(t)){let r=this._viewContainerRef;if(this._viewRef&&r.remove(r.indexOf(this._viewRef)),!this.ngTemplateOutlet){this._viewRef=null;return}let o=this._createContextForwardProxy();this._viewRef=r.createEmbeddedView(this.ngTemplateOutlet,o,{injector:this._getInjector()})}}_getInjector(){return this.ngTemplateOutletInjector==="outlet"?this.injector:this.ngTemplateOutletInjector??void 0}_shouldRecreateView(t){return!!t.ngTemplateOutlet||!!t.ngTemplateOutletInjector}_createContextForwardProxy(){return new Proxy({},{set:(t,r,o)=>this.ngTemplateOutletContext?Reflect.set(this.ngTemplateOutletContext,r,o):!1,get:(t,r,o)=>{if(this.ngTemplateOutletContext)return Reflect.get(this.ngTemplateOutletContext,r,o)}})}static \u0275fac=function(r){return new(r||e)(fe(Zt))};static \u0275dir=W({type:e,selectors:[["","ngTemplateOutlet",""]],inputs:{ngTemplateOutletContext:"ngTemplateOutletContext",ngTemplateOutlet:"ngTemplateOutlet",ngTemplateOutletInjector:"ngTemplateOutletInjector"},features:[zt]})}return e})();function ui(e,n){n=encodeURIComponent(n);for(let t of e.split(";")){let r=t.indexOf("="),[o,i]=r==-1?[t,""]:[t.slice(0,r),t.slice(r+1)];if(o.trim()===n)return decodeURIComponent(i)}return null}var ir=class{};var Wu="browser";function wv(e){return e===Wu}var fi=class{_doc;constructor(n){this._doc=n}manager},Ba=(()=>{class e extends fi{constructor(t){super(t)}supports(t){return!0}addEventListener(t,r,o,i){return t.addEventListener(r,o,i),()=>this.removeEventListener(t,r,o,i)}removeEventListener(t,r,o,i){return t.removeEventListener(r,o,i)}static \u0275fac=function(r){return new(r||e)(x(F))};static \u0275prov=v({token:e,factory:e.\u0275fac})}return e})(),$a=new g(""),Qu=(()=>{class e{_zone;_plugins;_eventNameToPlugin=new Map;constructor(t,r){this._zone=r,t.forEach(s=>{s.manager=this});let o=t.filter(s=>!(s instanceof Ba));this._plugins=o.slice().reverse();let i=t.find(s=>s instanceof Ba);i&&this._plugins.push(i)}addEventListener(t,r,o,i){return this._findPluginFor(r).addEventListener(t,r,o,i)}getZone(){return this._zone}_findPluginFor(t){let r=this._eventNameToPlugin.get(t);if(r)return r;if(r=this._plugins.find(i=>i.supports(t)),!r)throw new I(5101,!1);return this._eventNameToPlugin.set(t,r),r}static \u0275fac=function(r){return new(r||e)(x($a),x(N))};static \u0275prov=v({token:e,factory:e.\u0275fac})}return e})(),qu="ng-app-id";function xv(e){for(let n of e)n.remove()}function Iv(e,n){let t=n.createElement("style");return t.textContent=e,t}function Px(e,n,t,r){let o=e.head?.querySelectorAll(`style[${qu}="${n}"],link[${qu}="${n}"]`);if(o)for(let i of o)i.removeAttribute(qu),i instanceof HTMLLinkElement?r.set(i.href.slice(i.href.lastIndexOf("/")+1),{usage:0,elements:[i]}):i.textContent&&t.set(i.textContent,{usage:0,elements:[i]})}function Zu(e,n){let t=n.createElement("link");return t.setAttribute("rel","stylesheet"),t.setAttribute("href",e),t}var Ku=(()=>{class e{doc;appId;nonce;inline=new Map;external=new Map;hosts=new Set;constructor(t,r,o,i={}){this.doc=t,this.appId=r,this.nonce=o,Px(t,r,this.inline,this.external),this.hosts.add(t.head)}addStyles(t,r){for(let o of t)this.addUsage(o,this.inline,Iv);r?.forEach(o=>this.addUsage(o,this.external,Zu))}removeStyles(t,r){for(let o of t)this.removeUsage(o,this.inline);r?.forEach(o=>this.removeUsage(o,this.external))}addUsage(t,r,o){let i=r.get(t);i?i.usage++:r.set(t,{usage:1,elements:[...this.hosts].map(s=>this.addElement(s,o(t,this.doc)))})}removeUsage(t,r){let o=r.get(t);o&&(o.usage--,o.usage<=0&&(xv(o.elements),r.delete(t)))}ngOnDestroy(){for(let[,{elements:t}]of[...this.inline,...this.external])xv(t);this.hosts.clear()}addHost(t){this.hosts.add(t);for(let[r,{elements:o}]of this.inline)o.push(this.addElement(t,Iv(r,this.doc)));for(let[r,{elements:o}]of this.external)o.push(this.addElement(t,Zu(r,this.doc)))}removeHost(t){this.hosts.delete(t)}addElement(t,r){return this.nonce&&r.setAttribute("nonce",this.nonce),t.appendChild(r)}static \u0275fac=function(r){return new(r||e)(x(F),x(Hr),x(rr,8),x(nr))};static \u0275prov=v({token:e,factory:e.\u0275fac})}return e})(),Yu={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",math:"http://www.w3.org/1998/Math/MathML"},Xu=/%COMP%/g;var Sv="%COMP%",Lx=`_nghost-${Sv}`,Vx=`_ngcontent-${Sv}`,jx=!0,Bx=new g("",{factory:()=>jx});function Hx(e){return Vx.replace(Xu,e)}function Ux(e){return Lx.replace(Xu,e)}function Tv(e,n){return n.map(t=>t.replace(Xu,e))}var Ju=(()=>{class e{eventManager;sharedStylesHost;appId;removeStylesOnCompDestroy;doc;ngZone;nonce;tracingService;rendererByCompId=new Map;defaultRenderer;constructor(t,r,o,i,s,a,l=null,c=null){this.eventManager=t,this.sharedStylesHost=r,this.appId=o,this.removeStylesOnCompDestroy=i,this.doc=s,this.ngZone=a,this.nonce=l,this.tracingService=c,this.defaultRenderer=new pi(t,s,a,this.tracingService)}createRenderer(t,r){if(!t||!r)return this.defaultRenderer;let o=this.getOrCreateRenderer(t,r);return o instanceof Ua?o.applyToHost(t):o instanceof hi&&o.applyStyles(),o}getOrCreateRenderer(t,r){let o=this.rendererByCompId,i=o.get(r.id);if(!i){let s=this.doc,a=this.ngZone,l=this.eventManager,c=this.sharedStylesHost,d=this.removeStylesOnCompDestroy,u=this.tracingService;switch(r.encapsulation){case pt.Emulated:i=new Ua(l,c,r,this.appId,d,s,a,u);break;case pt.ShadowDom:return new Ha(l,t,r,s,a,this.nonce,u,c);case pt.ExperimentalIsolatedShadowDom:return new Ha(l,t,r,s,a,this.nonce,u);default:i=new hi(l,c,r,d,s,a,u);break}o.set(r.id,i)}return i}ngOnDestroy(){this.rendererByCompId.clear()}componentReplaced(t){this.rendererByCompId.delete(t)}static \u0275fac=function(r){return new(r||e)(x(Qu),x(Ku),x(Hr),x(Bx),x(F),x(N),x(rr),x(mt,8))};static \u0275prov=v({token:e,factory:e.\u0275fac})}return e})(),pi=class{eventManager;doc;ngZone;tracingService;data=Object.create(null);throwOnSyntheticProps=!0;constructor(n,t,r,o){this.eventManager=n,this.doc=t,this.ngZone=r,this.tracingService=o}destroy(){}destroyNode=null;createElement(n,t){return t?this.doc.createElementNS(Yu[t]||t,n):this.doc.createElement(n)}createComment(n){return this.doc.createComment(n)}createText(n){return this.doc.createTextNode(n)}appendChild(n,t){(Mv(n)?n.content:n).appendChild(t)}insertBefore(n,t,r){n&&(Mv(n)?n.content:n).insertBefore(t,r)}removeChild(n,t){t.remove()}selectRootElement(n,t){let r=typeof n=="string"?this.doc.querySelector(n):n;if(!r)throw new I(-5104,!1);return t||(r.textContent=""),r}parentNode(n){return n.parentNode}nextSibling(n){return n.nextSibling}setAttribute(n,t,r,o){if(o){t=o+":"+t;let i=Yu[o];i?n.setAttributeNS(i,t,r):n.setAttribute(t,r)}else n.setAttribute(t,r)}removeAttribute(n,t,r){if(r){let o=Yu[r];o?n.removeAttributeNS(o,t):n.removeAttribute(`${r}:${t}`)}else n.removeAttribute(t)}addClass(n,t){n.classList.add(t)}removeClass(n,t){n.classList.remove(t)}setStyle(n,t,r,o){o&(Tt.DashCase|Tt.Important)?n.style.setProperty(t,r,o&Tt.Important?"important":""):n.style[t]=r}removeStyle(n,t,r){r&Tt.DashCase?n.style.removeProperty(t):n.style[t]=""}setProperty(n,t,r){n!=null&&(n[t]=r)}setValue(n,t){n.nodeValue=t}listen(n,t,r,o){if(typeof n=="string"&&(n=Xt().getGlobalEventTarget(this.doc,n),!n))throw new I(5102,!1);let i=this.decoratePreventDefault(r);return this.tracingService?.wrapEventListener&&(i=this.tracingService.wrapEventListener(n,t,i)),this.eventManager.addEventListener(n,t,i,o)}decoratePreventDefault(n){return t=>{if(t==="__ngUnwrap__")return n;n(t)===!1&&t.preventDefault()}}};function Mv(e){return e.tagName==="TEMPLATE"&&e.content!==void 0}var Ha=class extends pi{hostEl;sharedStylesHost;shadowRoot;constructor(n,t,r,o,i,s,a,l){super(n,o,i,a),this.hostEl=t,this.sharedStylesHost=l,this.shadowRoot=t.attachShadow({mode:"open"}),this.sharedStylesHost&&this.sharedStylesHost.addHost(this.shadowRoot);let c=r.styles;c=Tv(r.id,c);for(let u of c){let h=document.createElement("style");s&&h.setAttribute("nonce",s),h.textContent=u,this.shadowRoot.appendChild(h)}let d=r.getExternalStyles?.();if(d)for(let u of d){let h=Zu(u,o);s&&h.setAttribute("nonce",s),this.shadowRoot.appendChild(h)}}nodeOrShadowRoot(n){return n===this.hostEl?this.shadowRoot:n}appendChild(n,t){return super.appendChild(this.nodeOrShadowRoot(n),t)}insertBefore(n,t,r){return super.insertBefore(this.nodeOrShadowRoot(n),t,r)}removeChild(n,t){return super.removeChild(null,t)}parentNode(n){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(n)))}destroy(){this.sharedStylesHost&&this.sharedStylesHost.removeHost(this.shadowRoot)}},hi=class extends pi{sharedStylesHost;removeStylesOnCompDestroy;styles;styleUrls;constructor(n,t,r,o,i,s,a,l){super(n,i,s,a),this.sharedStylesHost=t,this.removeStylesOnCompDestroy=o;let c=r.styles;this.styles=l?Tv(l,c):c,this.styleUrls=r.getExternalStyles?.(l)}applyStyles(){this.sharedStylesHost.addStyles(this.styles,this.styleUrls)}destroy(){this.removeStylesOnCompDestroy&&Jn.size===0&&this.sharedStylesHost.removeStyles(this.styles,this.styleUrls)}},Ua=class extends hi{contentAttr;hostAttr;constructor(n,t,r,o,i,s,a,l){let c=o+"-"+r.id;super(n,t,r,i,s,a,l,c),this.contentAttr=Hx(c),this.hostAttr=Ux(c)}applyToHost(n){this.applyStyles(),this.setAttribute(n,this.hostAttr,"")}createElement(n,t){let r=super.createElement(n,t);return super.setAttribute(r,this.contentAttr,""),r}};var za=class e extends di{supportsDOMEvents=!0;static makeCurrent(){zu(new e)}onAndCancel(n,t,r,o){return n.addEventListener(t,r,o),()=>{n.removeEventListener(t,r,o)}}dispatchEvent(n,t){n.dispatchEvent(t)}remove(n){n.remove()}createElement(n,t){return t=t||this.getDefaultDocument(),t.createElement(n)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(n){return n.nodeType===Node.ELEMENT_NODE}isShadowRoot(n){return n instanceof DocumentFragment}getGlobalEventTarget(n,t){return t==="window"?window:t==="document"?n:t==="body"?n.body:null}getBaseHref(n){let t=$x();return t==null?null:zx(t)}resetBaseElement(){mi=null}getUserAgent(){return window.navigator.userAgent}getCookie(n){return ui(document.cookie,n)}},mi=null;function $x(){return mi=mi||document.head.querySelector("base"),mi?mi.getAttribute("href"):null}function zx(e){return new URL(e,document.baseURI).pathname}var Gx=(()=>{class e{build(){return new XMLHttpRequest}static \u0275fac=function(r){return new(r||e)};static \u0275prov=v({token:e,factory:e.\u0275fac})}return e})(),Av=["alt","control","meta","shift"],Wx={"\b":"Backspace","	":"Tab","\x7F":"Delete","\x1B":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},qx={alt:e=>e.altKey,control:e=>e.ctrlKey,meta:e=>e.metaKey,shift:e=>e.shiftKey},Nv=(()=>{class e extends fi{constructor(t){super(t)}supports(t){return e.parseEventName(t)!=null}addEventListener(t,r,o,i){let s=e.parseEventName(r),a=e.eventCallback(s.fullKey,o,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>Xt().onAndCancel(t,s.domEventName,a,i))}static parseEventName(t){let r=t.toLowerCase().split("."),o=r.shift();if(r.length===0||!(o==="keydown"||o==="keyup"))return null;let i=e._normalizeKey(r.pop()),s="",a=r.indexOf("code");if(a>-1&&(r.splice(a,1),s="code."),Av.forEach(c=>{let d=r.indexOf(c);d>-1&&(r.splice(d,1),s+=c+".")}),s+=i,r.length!=0||i.length===0)return null;let l={};return l.domEventName=o,l.fullKey=s,l}static matchEventFullKeyCode(t,r){let o=Wx[t.key]||t.key,i="";return r.indexOf("code.")>-1&&(o=t.code,i="code."),o==null||!o?!1:(o=o.toLowerCase(),o===" "?o="space":o==="."&&(o="dot"),Av.forEach(s=>{if(s!==o){let a=qx[s];a(t)&&(i+=s+".")}}),i+=o,i===r)}static eventCallback(t,r,o){return i=>{e.matchEventFullKeyCode(i,t)&&o.runGuarded(()=>r(i))}}static _normalizeKey(t){return t==="esc"?"escape":t}static \u0275fac=function(r){return new(r||e)(x(F))};static \u0275prov=v({token:e,factory:e.\u0275fac})}return e})();async function ef(e,n,t){let r=E({rootComponent:e},Yx(n,t));return mv(r)}function Yx(e,n){return{platformRef:n?.platformRef,appProviders:[...Jx,...e?.providers??[]],platformProviders:Xx}}function Zx(){za.makeCurrent()}function Qx(){return new Ue}function Kx(){return lu(document),document}var Xx=[{provide:nr,useValue:Wu},{provide:ha,useValue:Zx,multi:!0},{provide:F,useFactory:Kx}];var Jx=[{provide:Po,useValue:"root"},{provide:Ue,useFactory:Qx},{provide:$a,useClass:Ba,multi:!0},{provide:$a,useClass:Nv,multi:!0},Ju,Ku,Qu,{provide:Te,useExisting:Ju},{provide:ir,useClass:Gx},[]];var Dn=class e{headers;normalizedNames=new Map;lazyInit;lazyUpdate=null;constructor(n){n?typeof n=="string"?this.lazyInit=()=>{this.headers=new Map,n.split(`
`).forEach(t=>{let r=t.indexOf(":");if(r>0){let o=t.slice(0,r),i=t.slice(r+1).trim();this.addHeaderEntry(o,i)}})}:typeof Headers<"u"&&n instanceof Headers?(this.headers=new Map,n.forEach((t,r)=>{this.addHeaderEntry(r,t)})):this.lazyInit=()=>{this.headers=new Map,Object.entries(n).forEach(([t,r])=>{this.setHeaderEntries(t,r)})}:this.headers=new Map}has(n){return this.init(),this.headers.has(n.toLowerCase())}get(n){this.init();let t=this.headers.get(n.toLowerCase());return t&&t.length>0?t[0]:null}keys(){return this.init(),Array.from(this.normalizedNames.values())}getAll(n){return this.init(),this.headers.get(n.toLowerCase())||null}append(n,t){return this.clone({name:n,value:t,op:"a"})}set(n,t){return this.clone({name:n,value:t,op:"s"})}delete(n,t){return this.clone({name:n,value:t,op:"d"})}maybeSetNormalizedName(n,t){this.normalizedNames.has(t)||this.normalizedNames.set(t,n)}init(){this.lazyInit&&(this.lazyInit instanceof e?this.copyFrom(this.lazyInit):this.lazyInit(),this.lazyInit=null,this.lazyUpdate&&(this.lazyUpdate.forEach(n=>this.applyUpdate(n)),this.lazyUpdate=null))}copyFrom(n){n.init(),Array.from(n.headers.keys()).forEach(t=>{this.headers.set(t,n.headers.get(t)),this.normalizedNames.set(t,n.normalizedNames.get(t))})}clone(n){let t=new e;return t.lazyInit=this.lazyInit&&this.lazyInit instanceof e?this.lazyInit:this,t.lazyUpdate=(this.lazyUpdate||[]).concat([n]),t}applyUpdate(n){let t=n.name.toLowerCase();switch(n.op){case"a":case"s":let r=n.value;if(typeof r=="string"&&(r=[r]),r.length===0)return;this.maybeSetNormalizedName(n.name,t);let o=(n.op==="a"?this.headers.get(t):void 0)||[];o.push(...r),this.headers.set(t,o);break;case"d":let i=n.value;if(!i)this.headers.delete(t),this.normalizedNames.delete(t);else{let s=this.headers.get(t);if(!s)return;s=s.filter(a=>i.indexOf(a)===-1),s.length===0?(this.headers.delete(t),this.normalizedNames.delete(t)):this.headers.set(t,s)}break}}addHeaderEntry(n,t){let r=n.toLowerCase();this.maybeSetNormalizedName(n,r),this.headers.has(r)?this.headers.get(r).push(t):this.headers.set(r,[t])}setHeaderEntries(n,t){let r=(Array.isArray(t)?t:[t]).map(i=>i.toString()),o=n.toLowerCase();this.headers.set(o,r),this.maybeSetNormalizedName(n,o)}forEach(n){this.init(),Array.from(this.normalizedNames.keys()).forEach(t=>n(this.normalizedNames.get(t),this.headers.get(t)))}};var Wa=class{map=new Map;set(n,t){return this.map.set(n,t),this}get(n){return this.map.has(n)||this.map.set(n,n.defaultValue()),this.map.get(n)}delete(n){return this.map.delete(n),this}has(n){return this.map.has(n)}keys(){return this.map.keys()}},qa=class{encodeKey(n){return kv(n)}encodeValue(n){return kv(n)}decodeKey(n){return decodeURIComponent(n)}decodeValue(n){return decodeURIComponent(n)}};function e0(e,n){let t=new Map;return e.length>0&&e.replace(/^\?/,"").split("&").forEach(o=>{let i=o.indexOf("="),[s,a]=i==-1?[n.decodeKey(o),""]:[n.decodeKey(o.slice(0,i)),n.decodeValue(o.slice(i+1))],l=t.get(s)||[];l.push(a),t.set(s,l)}),t}var t0=/%(\d[a-f0-9])/gi,n0={40:"@","3A":":",24:"$","2C":",","3B":";","3D":"=","3F":"?","2F":"/"};function kv(e){return encodeURIComponent(e).replace(t0,(n,t)=>n0[t]??n)}function Ga(e){return`${e}`}var Jt=class e{map;encoder;updates=null;cloneFrom=null;constructor(n={}){if(this.encoder=n.encoder||new qa,n.fromString){if(n.fromObject)throw new I(2805,!1);this.map=e0(n.fromString,this.encoder)}else n.fromObject?(this.map=new Map,Object.keys(n.fromObject).forEach(t=>{let r=n.fromObject[t],o=Array.isArray(r)?r.map(Ga):[Ga(r)];this.map.set(t,o)})):this.map=null}has(n){return this.init(),this.map.has(n)}get(n){this.init();let t=this.map.get(n);return t?t[0]:null}getAll(n){return this.init(),this.map.get(n)||null}keys(){return this.init(),Array.from(this.map.keys())}append(n,t){return this.clone({param:n,value:t,op:"a"})}appendAll(n){let t=[];return Object.keys(n).forEach(r=>{let o=n[r];Array.isArray(o)?o.forEach(i=>{t.push({param:r,value:i,op:"a"})}):t.push({param:r,value:o,op:"a"})}),this.clone(t)}set(n,t){return this.clone({param:n,value:t,op:"s"})}delete(n,t){return this.clone({param:n,value:t,op:"d"})}toString(){return this.init(),this.keys().map(n=>{let t=this.encoder.encodeKey(n);return this.map.get(n).map(r=>t+"="+this.encoder.encodeValue(r)).join("&")}).filter(n=>n!=="").join("&")}clone(n){let t=new e({encoder:this.encoder});return t.cloneFrom=this.cloneFrom||this,t.updates=(this.updates||[]).concat(n),t}init(){this.map===null&&(this.map=new Map),this.cloneFrom!==null&&(this.cloneFrom.init(),this.cloneFrom.keys().forEach(n=>this.map.set(n,this.cloneFrom.map.get(n))),this.updates.forEach(n=>{switch(n.op){case"a":case"s":let t=(n.op==="a"?this.map.get(n.param):void 0)||[];t.push(Ga(n.value)),this.map.set(n.param,t);break;case"d":if(n.value!==void 0){let r=this.map.get(n.param)||[],o=r.indexOf(Ga(n.value));o!==-1&&r.splice(o,1),r.length>0?this.map.set(n.param,r):this.map.delete(n.param)}else{this.map.delete(n.param);break}}}),this.cloneFrom=this.updates=null)}};function r0(e){switch(e){case"DELETE":case"GET":case"HEAD":case"OPTIONS":case"JSONP":return!1;default:return!0}}function Rv(e){return typeof ArrayBuffer<"u"&&e instanceof ArrayBuffer}function Ov(e){return typeof Blob<"u"&&e instanceof Blob}function Fv(e){return typeof FormData<"u"&&e instanceof FormData}function o0(e){return typeof URLSearchParams<"u"&&e instanceof URLSearchParams}var Pv="Content-Type",Lv="Accept",Vv="text/plain",jv="application/json",i0=`${jv}, ${Vv}, */*`,Zr=class e{url;body=null;headers;context;reportProgress=!1;withCredentials=!1;credentials;keepalive=!1;cache;priority;mode;redirect;referrer;integrity;referrerPolicy;responseType="json";method;params;urlWithParams;transferCache;timeout;constructor(n,t,r,o){this.url=t,this.method=n.toUpperCase();let i;if(r0(this.method)||o?(this.body=r!==void 0?r:null,i=o):i=r,i){if(this.reportProgress=!!i.reportProgress,this.withCredentials=!!i.withCredentials,this.keepalive=!!i.keepalive,i.responseType&&(this.responseType=i.responseType),i.headers&&(this.headers=i.headers),i.context&&(this.context=i.context),i.params&&(this.params=i.params),i.priority&&(this.priority=i.priority),i.cache&&(this.cache=i.cache),i.credentials&&(this.credentials=i.credentials),typeof i.timeout=="number"){if(i.timeout<1||!Number.isInteger(i.timeout))throw new I(2822,"");this.timeout=i.timeout}i.mode&&(this.mode=i.mode),i.redirect&&(this.redirect=i.redirect),i.integrity&&(this.integrity=i.integrity),i.referrer&&(this.referrer=i.referrer),i.referrerPolicy&&(this.referrerPolicy=i.referrerPolicy),this.transferCache=i.transferCache}if(this.headers??=new Dn,this.context??=new Wa,!this.params)this.params=new Jt,this.urlWithParams=t;else{let s=this.params.toString();if(s.length===0)this.urlWithParams=t;else{let a=t.indexOf("?"),l=a===-1?"?":a<t.length-1?"&":"";this.urlWithParams=t+l+s}}}serializeBody(){return this.body===null?null:typeof this.body=="string"||Rv(this.body)||Ov(this.body)||Fv(this.body)||o0(this.body)?this.body:this.body instanceof Jt?this.body.toString():typeof this.body=="object"||typeof this.body=="boolean"||Array.isArray(this.body)?JSON.stringify(this.body):this.body.toString()}detectContentTypeHeader(){return this.body===null||Fv(this.body)?null:Ov(this.body)?this.body.type||null:Rv(this.body)?null:typeof this.body=="string"?Vv:this.body instanceof Jt?"application/x-www-form-urlencoded;charset=UTF-8":typeof this.body=="object"||typeof this.body=="number"||typeof this.body=="boolean"?jv:null}clone(n={}){let t=n.method||this.method,r=n.url||this.url,o=n.responseType||this.responseType,i=n.keepalive??this.keepalive,s=n.priority||this.priority,a=n.cache||this.cache,l=n.mode||this.mode,c=n.redirect||this.redirect,d=n.credentials||this.credentials,u=n.referrer||this.referrer,h=n.integrity||this.integrity,p=n.referrerPolicy||this.referrerPolicy,m=n.transferCache??this.transferCache,D=n.timeout??this.timeout,C=n.body!==void 0?n.body:this.body,w=n.withCredentials??this.withCredentials,ie=n.reportProgress??this.reportProgress,ze=n.headers||this.headers,Ie=n.params||this.params,po=n.context??this.context;return n.setHeaders!==void 0&&(ze=Object.keys(n.setHeaders).reduce((ho,wn)=>ho.set(wn,n.setHeaders[wn]),ze)),n.setParams&&(Ie=Object.keys(n.setParams).reduce((ho,wn)=>ho.set(wn,n.setParams[wn]),Ie)),new e(t,r,C,{params:Ie,headers:ze,context:po,reportProgress:ie,responseType:o,withCredentials:w,transferCache:m,keepalive:i,cache:a,priority:s,timeout:D,mode:l,redirect:c,credentials:d,referrer:u,integrity:h,referrerPolicy:p})}},sr=(function(e){return e[e.Sent=0]="Sent",e[e.UploadProgress=1]="UploadProgress",e[e.ResponseHeader=2]="ResponseHeader",e[e.DownloadProgress=3]="DownloadProgress",e[e.Response=4]="Response",e[e.User=5]="User",e})(sr||{}),Kr=class{headers;status;statusText;url;ok;type;redirected;responseType;constructor(n,t=200,r="OK"){this.headers=n.headers||new Dn,this.status=n.status!==void 0?n.status:t,this.statusText=n.statusText||r,this.url=n.url||null,this.redirected=n.redirected,this.responseType=n.responseType,this.ok=this.status>=200&&this.status<300}},Ya=class e extends Kr{constructor(n={}){super(n)}type=sr.ResponseHeader;clone(n={}){return new e({headers:n.headers||this.headers,status:n.status!==void 0?n.status:this.status,statusText:n.statusText||this.statusText,url:n.url||this.url||void 0})}},gi=class e extends Kr{body;constructor(n={}){super(n),this.body=n.body!==void 0?n.body:null}type=sr.Response;clone(n={}){return new e({body:n.body!==void 0?n.body:this.body,headers:n.headers||this.headers,status:n.status!==void 0?n.status:this.status,statusText:n.statusText||this.statusText,url:n.url||this.url||void 0,redirected:n.redirected??this.redirected,responseType:n.responseType??this.responseType})}},Qr=class extends Kr{name="HttpErrorResponse";message;error;ok=!1;constructor(n){super(n,0,"Unknown Error"),this.status>=200&&this.status<300?this.message=`Http failure during parsing for ${n.url||"(unknown url)"}`:this.message=`Http failure response for ${n.url||"(unknown url)"}: ${n.status} ${n.statusText}`,this.error=n.error||null}},s0=200,a0=204;var l0=new g("");var c0=/^\)\]\}',?\n/;var nf=(()=>{class e{xhrFactory;tracingService=f(mt,{optional:!0});constructor(t){this.xhrFactory=t}maybePropagateTrace(t){return this.tracingService?.propagate?this.tracingService.propagate(t):t}handle(t){if(t.method==="JSONP")throw new I(-2800,!1);let r=this.xhrFactory;return He(null).pipe(sc(()=>new z(i=>{let s=r.build();if(s.open(t.method,t.urlWithParams),t.withCredentials&&(s.withCredentials=!0),t.headers.forEach((C,w)=>s.setRequestHeader(C,w.join(","))),t.headers.has(Lv)||s.setRequestHeader(Lv,i0),!t.headers.has(Pv)){let C=t.detectContentTypeHeader();C!==null&&s.setRequestHeader(Pv,C)}if(t.timeout&&(s.timeout=t.timeout),t.responseType){let C=t.responseType.toLowerCase();s.responseType=C!=="json"?C:"text"}let a=t.serializeBody(),l=null,c=()=>{if(l!==null)return l;let C=s.statusText||"OK",w=new Dn(s.getAllResponseHeaders()),ie=s.responseURL||t.url;return l=new Ya({headers:w,status:s.status,statusText:C,url:ie}),l},d=this.maybePropagateTrace(()=>{let{headers:C,status:w,statusText:ie,url:ze}=c(),Ie=null;w!==a0&&(Ie=typeof s.response>"u"?s.responseText:s.response),w===0&&(w=Ie?s0:0);let po=w>=200&&w<300;if(t.responseType==="json"&&typeof Ie=="string"){let ho=Ie;Ie=Ie.replace(c0,"");try{Ie=Ie!==""?JSON.parse(Ie):null}catch(wn){Ie=ho,po&&(po=!1,Ie={error:wn,text:Ie})}}po?(i.next(new gi({body:Ie,headers:C,status:w,statusText:ie,url:ze||void 0})),i.complete()):i.error(new Qr({error:Ie,headers:C,status:w,statusText:ie,url:ze||void 0}))}),u=this.maybePropagateTrace(C=>{let{url:w}=c(),ie=new Qr({error:C,status:s.status||0,statusText:s.statusText||"Unknown Error",url:w||void 0});i.error(ie)}),h=u;t.timeout&&(h=this.maybePropagateTrace(C=>{let{url:w}=c(),ie=new Qr({error:new DOMException("Request timed out","TimeoutError"),status:s.status||0,statusText:s.statusText||"Request timeout",url:w||void 0});i.error(ie)}));let p=!1,m=this.maybePropagateTrace(C=>{p||(i.next(c()),p=!0);let w={type:sr.DownloadProgress,loaded:C.loaded};C.lengthComputable&&(w.total=C.total),t.responseType==="text"&&s.responseText&&(w.partialText=s.responseText),i.next(w)}),D=this.maybePropagateTrace(C=>{let w={type:sr.UploadProgress,loaded:C.loaded};C.lengthComputable&&(w.total=C.total),i.next(w)});return s.addEventListener("load",d),s.addEventListener("error",u),s.addEventListener("timeout",h),s.addEventListener("abort",u),t.reportProgress&&(s.addEventListener("progress",m),a!==null&&s.upload&&s.upload.addEventListener("progress",D)),s.send(a),i.next({type:sr.Sent}),()=>{s.removeEventListener("error",u),s.removeEventListener("abort",u),s.removeEventListener("load",d),s.removeEventListener("timeout",h),t.reportProgress&&(s.removeEventListener("progress",m),a!==null&&s.upload&&s.upload.removeEventListener("progress",D)),s.readyState!==s.DONE&&s.abort()}})))}static \u0275fac=function(r){return new(r||e)(x(ir))};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function d0(e,n){return n(e)}function u0(e,n,t){return(r,o)=>Mr(t,()=>n(r,i=>e(i,o)))}var Bv=new g("",{factory:()=>[]}),Hv=new g(""),Uv=new g("",{factory:()=>!0});var rf=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275prov=v({token:e,factory:function(r){let o=null;return r?o=new(r||e):o=x(nf),o},providedIn:"root"})}return e})();var Za=(()=>{class e{backend;injector;chain=null;pendingTasks=f(zs);contributeToStability=f(Uv);constructor(t,r){this.backend=t,this.injector=r}handle(t){if(this.chain===null){let r=Array.from(new Set([...this.injector.get(Bv),...this.injector.get(Hv,[])]));this.chain=r.reduceRight((o,i)=>u0(o,i,this.injector),d0)}if(this.contributeToStability){let r=this.pendingTasks.add();return this.chain(t,o=>this.backend.handle(o)).pipe(Co(r))}else return this.chain(t,r=>this.backend.handle(r))}static \u0275fac=function(r){return new(r||e)(x(rf),x(be))};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),of=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275prov=v({token:e,factory:function(r){let o=null;return r?o=new(r||e):o=x(Za),o},providedIn:"root"})}return e})();function tf(e,n){return{body:n,headers:e.headers,context:e.context,observe:e.observe,params:e.params,reportProgress:e.reportProgress,responseType:e.responseType,withCredentials:e.withCredentials,credentials:e.credentials,transferCache:e.transferCache,timeout:e.timeout,keepalive:e.keepalive,priority:e.priority,cache:e.cache,mode:e.mode,redirect:e.redirect,integrity:e.integrity,referrer:e.referrer,referrerPolicy:e.referrerPolicy}}var En=(()=>{class e{handler;constructor(t){this.handler=t}request(t,r,o={}){let i;if(t instanceof Zr)i=t;else{let l;o.headers instanceof Dn?l=o.headers:l=new Dn(o.headers);let c;o.params&&(o.params instanceof Jt?c=o.params:c=new Jt({fromObject:o.params})),i=new Zr(t,r,o.body!==void 0?o.body:null,{headers:l,context:o.context,params:c,reportProgress:o.reportProgress,responseType:o.responseType||"json",withCredentials:o.withCredentials,transferCache:o.transferCache,keepalive:o.keepalive,priority:o.priority,cache:o.cache,mode:o.mode,redirect:o.redirect,credentials:o.credentials,referrer:o.referrer,referrerPolicy:o.referrerPolicy,integrity:o.integrity,timeout:o.timeout})}let s=He(i).pipe(ec(l=>this.handler.handle(l)));if(t instanceof Zr||o.observe==="events")return s;let a=s.pipe(Ot(l=>l instanceof gi));switch(o.observe||"body"){case"body":switch(i.responseType){case"arraybuffer":return a.pipe(se(l=>{if(l.body!==null&&!(l.body instanceof ArrayBuffer))throw new I(2806,!1);return l.body}));case"blob":return a.pipe(se(l=>{if(l.body!==null&&!(l.body instanceof Blob))throw new I(2807,!1);return l.body}));case"text":return a.pipe(se(l=>{if(l.body!==null&&typeof l.body!="string")throw new I(2808,!1);return l.body}));default:return a.pipe(se(l=>l.body))}case"response":return a;default:throw new I(2809,!1)}}delete(t,r={}){return this.request("DELETE",t,r)}get(t,r={}){return this.request("GET",t,r)}head(t,r={}){return this.request("HEAD",t,r)}jsonp(t,r){return this.request("JSONP",t,{params:new Jt().append(r,"JSONP_CALLBACK"),observe:"body",responseType:"json"})}options(t,r={}){return this.request("OPTIONS",t,r)}patch(t,r,o={}){return this.request("PATCH",t,tf(o,r))}post(t,r,o={}){return this.request("POST",t,tf(o,r))}put(t,r,o={}){return this.request("PUT",t,tf(o,r))}static \u0275fac=function(r){return new(r||e)(x(of))};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var f0=new g("",{factory:()=>!0}),p0="XSRF-TOKEN",h0=new g("",{factory:()=>p0}),m0="X-XSRF-TOKEN",g0=new g("",{factory:()=>m0}),v0=(()=>{class e{cookieName=f(h0);doc=f(F);lastCookieString="";lastToken=null;parseCount=0;getToken(){let t=this.doc.cookie||"";return t!==this.lastCookieString&&(this.parseCount++,this.lastToken=ui(t,this.cookieName),this.lastCookieString=t),this.lastToken}static \u0275fac=function(r){return new(r||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),$v=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275prov=v({token:e,factory:function(r){let o=null;return r?o=new(r||e):o=x(v0),o},providedIn:"root"})}return e})();function y0(e,n){if(!f(f0)||e.method==="GET"||e.method==="HEAD")return n(e);try{let o=f(Yr).href,{origin:i}=new URL(o),{origin:s}=new URL(e.url,i);if(i!==s)return n(e)}catch{return n(e)}let t=f($v).getToken(),r=f(g0);return t!=null&&!e.headers.has(r)&&(e=e.clone({headers:e.headers.set(r,t)})),n(e)}function sf(...e){let n=[En,Za,{provide:of,useExisting:Za},{provide:rf,useFactory:()=>f(l0,{optional:!0})??f(nf)},{provide:Bv,useValue:y0,multi:!0}];for(let t of e)n.push(...t.\u0275providers);return Bn(n)}var ar=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275prov=v({token:e,factory:function(r){let o=null;return r?o=new(r||e):o=x(b0),o},providedIn:"root"})}return e})(),b0=(()=>{class e extends ar{_doc;constructor(t){super(),this._doc=t}sanitize(t,r){if(r==null)return null;switch(t){case xe.NONE:return r;case xe.HTML:return Gt(r,"HTML")?ht(r):va(this._doc,String(r)).toString();case xe.STYLE:return Gt(r,"Style")?ht(r):r;case xe.SCRIPT:if(Gt(r,"Script"))return ht(r);throw new I(5200,!1);case xe.URL:return Gt(r,"URL")?ht(r):ei(String(r));case xe.RESOURCE_URL:if(Gt(r,"ResourceURL"))return ht(r);throw new I(5201,!1);default:throw new I(5202,!1)}}bypassSecurityTrustHtml(t){return cu(t)}bypassSecurityTrustStyle(t){return du(t)}bypassSecurityTrustScript(t){return uu(t)}bypassSecurityTrustUrl(t){return fu(t)}bypassSecurityTrustResourceUrl(t){return pu(t)}static \u0275fac=function(r){return new(r||e)(x(F))};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var Gv={providers:[ld(),sf()]};function vi(e){return e.buttons===0||e.detail===0}function yi(e){let n=e.touches&&e.touches[0]||e.changedTouches&&e.changedTouches[0];return!!n&&n.identifier===-1&&(n.radiusX==null||n.radiusX===1)&&(n.radiusY==null||n.radiusY===1)}var lf;function Wv(){if(lf==null){let e=typeof document<"u"?document.head:null;lf=!!(e&&(e.createShadowRoot||e.attachShadow))}return lf}function cf(e){if(Wv()){let n=e.getRootNode?e.getRootNode():null;if(typeof ShadowRoot<"u"&&ShadowRoot&&n instanceof ShadowRoot)return n}return null}function $e(e){return e.composedPath?e.composedPath()[0]:e.target}var df;try{df=typeof Intl<"u"&&Intl.v8BreakIterator}catch{df=!1}var Ee=(()=>{class e{_platformId=f(nr);isBrowser=this._platformId?wv(this._platformId):typeof document=="object"&&!!document;EDGE=this.isBrowser&&/(edge)/i.test(navigator.userAgent);TRIDENT=this.isBrowser&&/(msie|trident)/i.test(navigator.userAgent);BLINK=this.isBrowser&&!!(window.chrome||df)&&typeof CSS<"u"&&!this.EDGE&&!this.TRIDENT;WEBKIT=this.isBrowser&&/AppleWebKit/i.test(navigator.userAgent)&&!this.BLINK&&!this.EDGE&&!this.TRIDENT;IOS=this.isBrowser&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!("MSStream"in window);FIREFOX=this.isBrowser&&/(firefox|minefield)/i.test(navigator.userAgent);ANDROID=this.isBrowser&&/android/i.test(navigator.userAgent)&&!this.TRIDENT;SAFARI=this.isBrowser&&/safari/i.test(navigator.userAgent)&&this.WEBKIT;constructor(){}static \u0275fac=function(r){return new(r||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var bi;function qv(){if(bi==null&&typeof window<"u")try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:()=>bi=!0}))}finally{bi=bi||!1}return bi}function Xr(e){return qv()?e:!!e.capture}function bt(e){return e instanceof Y?e.nativeElement:e}var Yv=new g("cdk-input-modality-detector-options"),Zv={ignoreKeys:[18,17,224,91,16]},Qv=650,uf={passive:!0,capture:!0},Kv=(()=>{class e{_platform=f(Ee);_listenerCleanups;modalityDetected;modalityChanged;get mostRecentModality(){return this._modality.value}_mostRecentTarget=null;_modality=new Nn(null);_options;_lastTouchMs=0;_onKeydown=t=>{this._options?.ignoreKeys?.some(r=>r===t.keyCode)||(this._modality.next("keyboard"),this._mostRecentTarget=$e(t))};_onMousedown=t=>{Date.now()-this._lastTouchMs<Qv||(this._modality.next(vi(t)?"keyboard":"mouse"),this._mostRecentTarget=$e(t))};_onTouchstart=t=>{if(yi(t)){this._modality.next("keyboard");return}this._lastTouchMs=Date.now(),this._modality.next("touch"),this._mostRecentTarget=$e(t)};constructor(){let t=f(N),r=f(F),o=f(Yv,{optional:!0});if(this._options=E(E({},Zv),o),this.modalityDetected=this._modality.pipe(xo(1)),this.modalityChanged=this.modalityDetected.pipe(nc()),this._platform.isBrowser){let i=f(Te).createRenderer(null,null);this._listenerCleanups=t.runOutsideAngular(()=>[i.listen(r,"keydown",this._onKeydown,uf),i.listen(r,"mousedown",this._onMousedown,uf),i.listen(r,"touchstart",this._onTouchstart,uf)])}}ngOnDestroy(){this._modality.complete(),this._listenerCleanups?.forEach(t=>t())}static \u0275fac=function(r){return new(r||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),_i=(function(e){return e[e.IMMEDIATE=0]="IMMEDIATE",e[e.EVENTUAL=1]="EVENTUAL",e})(_i||{}),Xv=new g("cdk-focus-monitor-default-options"),Qa=Xr({passive:!0,capture:!0}),Di=(()=>{class e{_ngZone=f(N);_platform=f(Ee);_inputModalityDetector=f(Kv);_origin=null;_lastFocusOrigin=null;_windowFocused=!1;_windowFocusTimeoutId;_originTimeoutId;_originFromTouchInteraction=!1;_elementInfo=new Map;_monitoredElementCount=0;_rootNodeFocusListenerCount=new Map;_detectionMode;_windowFocusListener=()=>{this._windowFocused=!0,this._windowFocusTimeoutId=setTimeout(()=>this._windowFocused=!1)};_document=f(F);_stopInputModalityDetector=new A;constructor(){let t=f(Xv,{optional:!0});this._detectionMode=t?.detectionMode||_i.IMMEDIATE}_rootNodeFocusAndBlurListener=t=>{let r=$e(t);for(let o=r;o;o=o.parentElement)t.type==="focus"?this._onFocus(t,o):this._onBlur(t,o)};monitor(t,r=!1){let o=bt(t);if(!this._platform.isBrowser||o.nodeType!==1)return He();let i=cf(o)||this._document,s=this._elementInfo.get(o);if(s)return r&&(s.checkChildren=!0),s.subject;let a={checkChildren:r,subject:new A,rootNode:i};return this._elementInfo.set(o,a),this._registerGlobalListeners(a),a.subject}stopMonitoring(t){let r=bt(t),o=this._elementInfo.get(r);o&&(o.subject.complete(),this._setClasses(r),this._elementInfo.delete(r),this._removeGlobalListeners(o))}focusVia(t,r,o){let i=bt(t),s=this._document.activeElement;i===s?this._getClosestElementsInfo(i).forEach(([a,l])=>this._originChanged(a,r,l)):(this._setOrigin(r),typeof i.focus=="function"&&i.focus(o))}ngOnDestroy(){this._elementInfo.forEach((t,r)=>this.stopMonitoring(r))}_getWindow(){return this._document.defaultView||window}_getFocusOrigin(t){return this._origin?this._originFromTouchInteraction?this._shouldBeAttributedToTouch(t)?"touch":"program":this._origin:this._windowFocused&&this._lastFocusOrigin?this._lastFocusOrigin:t&&this._isLastInteractionFromInputLabel(t)?"mouse":"program"}_shouldBeAttributedToTouch(t){return this._detectionMode===_i.EVENTUAL||!!t?.contains(this._inputModalityDetector._mostRecentTarget)}_setClasses(t,r){t.classList.toggle("cdk-focused",!!r),t.classList.toggle("cdk-touch-focused",r==="touch"),t.classList.toggle("cdk-keyboard-focused",r==="keyboard"),t.classList.toggle("cdk-mouse-focused",r==="mouse"),t.classList.toggle("cdk-program-focused",r==="program")}_setOrigin(t,r=!1){this._ngZone.runOutsideAngular(()=>{if(this._origin=t,this._originFromTouchInteraction=t==="touch"&&r,this._detectionMode===_i.IMMEDIATE){clearTimeout(this._originTimeoutId);let o=this._originFromTouchInteraction?Qv:1;this._originTimeoutId=setTimeout(()=>this._origin=null,o)}})}_onFocus(t,r){let o=this._elementInfo.get(r),i=$e(t);!o||!o.checkChildren&&r!==i||this._originChanged(r,this._getFocusOrigin(i),o)}_onBlur(t,r){let o=this._elementInfo.get(r);!o||o.checkChildren&&t.relatedTarget instanceof Node&&r.contains(t.relatedTarget)||(this._setClasses(r),this._emitOrigin(o,null))}_emitOrigin(t,r){t.subject.observers.length&&this._ngZone.run(()=>t.subject.next(r))}_registerGlobalListeners(t){if(!this._platform.isBrowser)return;let r=t.rootNode,o=this._rootNodeFocusListenerCount.get(r)||0;o||this._ngZone.runOutsideAngular(()=>{r.addEventListener("focus",this._rootNodeFocusAndBlurListener,Qa),r.addEventListener("blur",this._rootNodeFocusAndBlurListener,Qa)}),this._rootNodeFocusListenerCount.set(r,o+1),++this._monitoredElementCount===1&&(this._ngZone.runOutsideAngular(()=>{this._getWindow().addEventListener("focus",this._windowFocusListener)}),this._inputModalityDetector.modalityDetected.pipe(st(this._stopInputModalityDetector)).subscribe(i=>{this._setOrigin(i,!0)}))}_removeGlobalListeners(t){let r=t.rootNode;if(this._rootNodeFocusListenerCount.has(r)){let o=this._rootNodeFocusListenerCount.get(r);o>1?this._rootNodeFocusListenerCount.set(r,o-1):(r.removeEventListener("focus",this._rootNodeFocusAndBlurListener,Qa),r.removeEventListener("blur",this._rootNodeFocusAndBlurListener,Qa),this._rootNodeFocusListenerCount.delete(r))}--this._monitoredElementCount||(this._getWindow().removeEventListener("focus",this._windowFocusListener),this._stopInputModalityDetector.next(),clearTimeout(this._windowFocusTimeoutId),clearTimeout(this._originTimeoutId))}_originChanged(t,r,o){this._setClasses(t,r),this._emitOrigin(o,r),this._lastFocusOrigin=r}_getClosestElementsInfo(t){let r=[];return this._elementInfo.forEach((o,i)=>{(i===t||o.checkChildren&&i.contains(t))&&r.push([i,o])}),r}_isLastInteractionFromInputLabel(t){let{_mostRecentTarget:r,mostRecentModality:o}=this._inputModalityDetector;if(o!=="mouse"||!r||r===t||t.nodeName!=="INPUT"&&t.nodeName!=="TEXTAREA"||t.disabled)return!1;let i=t.labels;if(i){for(let s=0;s<i.length;s++)if(i[s].contains(r))return!0}return!1}static \u0275fac=function(r){return new(r||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var Ka=new WeakMap,tt=(()=>{class e{_appRef;_injector=f(K);_environmentInjector=f(be);load(t){let r=this._appRef=this._appRef||this._injector.get(Nt),o=Ka.get(r);o||(o={loaders:new Set,refs:[]},Ka.set(r,o),r.onDestroy(()=>{Ka.get(r)?.refs.forEach(i=>i.destroy()),Ka.delete(r)})),o.loaders.has(t)||(o.loaders.add(t),o.refs.push(La(t,{environmentInjector:this._environmentInjector})))}static \u0275fac=function(r){return new(r||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var Xa;function _0(){if(Xa===void 0&&(Xa=null,typeof window<"u")){let e=window;e.trustedTypes!==void 0&&(Xa=e.trustedTypes.createPolicy("angular#components",{createHTML:n=>n}))}return Xa}function lr(e){return _0()?.createHTML(e)||e}function Jv(e,n,t){let r=t.sanitize(xe.HTML,n);e.innerHTML=lr(r||"")}function Ei(e){return Array.isArray(e)?e:[e]}var ey=new Set,cr,Ja=(()=>{class e{_platform=f(Ee);_nonce=f(rr,{optional:!0});_matchMedia;constructor(){this._matchMedia=this._platform.isBrowser&&window.matchMedia?window.matchMedia.bind(window):E0}matchMedia(t){return(this._platform.WEBKIT||this._platform.BLINK)&&D0(t,this._nonce),this._matchMedia(t)}static \u0275fac=function(r){return new(r||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function D0(e,n){if(!ey.has(e))try{cr||(cr=document.createElement("style"),n&&cr.setAttribute("nonce",n),cr.setAttribute("type","text/css"),document.head.appendChild(cr)),cr.sheet&&(cr.sheet.insertRule(`@media ${e} {body{ }}`,0),ey.add(e))}catch(t){console.error(t)}}function E0(e){return{matches:e==="all"||e==="",media:e,addListener:()=>{},removeListener:()=>{}}}var ff=(()=>{class e{_mediaMatcher=f(Ja);_zone=f(N);_queries=new Map;_destroySubject=new A;constructor(){}ngOnDestroy(){this._destroySubject.next(),this._destroySubject.complete()}isMatched(t){return ty(Ei(t)).some(o=>this._registerQuery(o).mql.matches)}observe(t){let o=ty(Ei(t)).map(s=>this._registerQuery(s).observable),i=Xl(o);return i=Dr(i.pipe(Eo(1)),i.pipe(xo(1),tc(0))),i.pipe(se(s=>{let a={matches:!1,breakpoints:{}};return s.forEach(({matches:l,query:c})=>{a.matches=a.matches||l,a.breakpoints[c]=l}),a}))}_registerQuery(t){if(this._queries.has(t))return this._queries.get(t);let r=this._mediaMatcher.matchMedia(t),i={observable:new z(s=>{let a=l=>this._zone.run(()=>s.next(l));return r.addListener(a),()=>{r.removeListener(a)}}).pipe(Io(r),se(({matches:s})=>({query:t,matches:s})),st(this._destroySubject)),mql:r};return this._queries.set(t,i),i}static \u0275fac=function(r){return new(r||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function ty(e){return e.map(n=>n.split(",")).reduce((n,t)=>n.concat(t)).map(n=>n.trim())}var C0=(()=>{class e{create(t){return typeof MutationObserver>"u"?null:new MutationObserver(t)}static \u0275fac=function(r){return new(r||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var ny=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275mod=te({type:e});static \u0275inj=J({providers:[C0]})}return e})();var ry=new g("liveAnnouncerElement",{providedIn:"root",factory:()=>null}),oy=new g("LIVE_ANNOUNCER_DEFAULT_OPTIONS"),w0=0,pf=(()=>{class e{_ngZone=f(N);_defaultOptions=f(oy,{optional:!0});_liveElement;_document=f(F);_sanitizer=f(ar);_previousTimeout;_currentPromise;_currentResolve;constructor(){let t=f(ry,{optional:!0});this._liveElement=t||this._createLiveElement()}announce(t,...r){let o=this._defaultOptions,i,s;return r.length===1&&typeof r[0]=="number"?s=r[0]:[i,s]=r,this.clear(),clearTimeout(this._previousTimeout),i||(i=o&&o.politeness?o.politeness:"polite"),s==null&&o&&(s=o.duration),this._liveElement.setAttribute("aria-live",i),this._liveElement.id&&this._exposeAnnouncerToModals(this._liveElement.id),this._ngZone.runOutsideAngular(()=>(this._currentPromise||(this._currentPromise=new Promise(a=>this._currentResolve=a)),clearTimeout(this._previousTimeout),this._previousTimeout=setTimeout(()=>{!t||typeof t=="string"?this._liveElement.textContent=t:Jv(this._liveElement,t,this._sanitizer),typeof s=="number"&&(this._previousTimeout=setTimeout(()=>this.clear(),s)),this._currentResolve?.(),this._currentPromise=this._currentResolve=void 0},100),this._currentPromise))}clear(){this._liveElement&&(this._liveElement.textContent="")}ngOnDestroy(){clearTimeout(this._previousTimeout),this._liveElement?.remove(),this._liveElement=null,this._currentResolve?.(),this._currentPromise=this._currentResolve=void 0}_createLiveElement(){let t="cdk-live-announcer-element",r=this._document.getElementsByClassName(t),o=this._document.createElement("div");for(let i=0;i<r.length;i++)r[i].remove();return o.classList.add(t),o.classList.add("cdk-visually-hidden"),o.setAttribute("aria-atomic","true"),o.setAttribute("aria-live","polite"),o.id=`cdk-live-announcer-${w0++}`,this._document.body.appendChild(o),o}_exposeAnnouncerToModals(t){let r=this._document.querySelectorAll('body > .cdk-overlay-container [aria-modal="true"]');for(let o=0;o<r.length;o++){let i=r[o],s=i.getAttribute("aria-owns");s?s.indexOf(t)===-1&&i.setAttribute("aria-owns",s+" "+t):i.setAttribute("aria-owns",t)}}static \u0275fac=function(r){return new(r||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function iy(e,...n){return n.length?n.some(t=>e[t]):e.altKey||e.shiftKey||e.ctrlKey||e.metaKey}var hf={},Ve=class e{_appId=f(Hr);static _infix=`a${Math.floor(Math.random()*1e5).toString()}`;getId(n,t=!1){return this._appId!=="ng"&&(n+=this._appId),hf.hasOwnProperty(n)||(hf[n]=0),`${n}${t?e._infix+"-":""}${hf[n]++}`}static \u0275fac=function(t){return new(t||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})};var x0=new g("cdk-dir-doc",{providedIn:"root",factory:()=>f(F)}),I0=/^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;function sy(e){let n=e?.toLowerCase()||"";return n==="auto"&&typeof navigator<"u"&&navigator?.language?I0.test(navigator.language)?"rtl":"ltr":n==="rtl"?"rtl":"ltr"}var dr=(()=>{class e{get value(){return this.valueSignal()}valueSignal=H("ltr");change=new ae;constructor(){let t=f(x0,{optional:!0});if(t){let r=t.body?t.body.dir:null,o=t.documentElement?t.documentElement.dir:null;this.valueSignal.set(sy(r||o||"ltr"))}}ngOnDestroy(){this.change.complete()}static \u0275fac=function(r){return new(r||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var nt=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275mod=te({type:e});static \u0275inj=J({})}return e})();function ur(e){return e==null?"":typeof e=="string"?e:`${e}px`}function Jr(e){return e!=null&&`${e}`!="false"}function mf(){return typeof __karma__<"u"&&!!__karma__||typeof jasmine<"u"&&!!jasmine||typeof jest<"u"&&!!jest||typeof Mocha<"u"&&!!Mocha}var eo,ay=["color","button","checkbox","date","datetime-local","email","file","hidden","image","month","number","password","radio","range","reset","search","submit","tel","text","time","url","week"];function gf(){if(eo)return eo;if(typeof document!="object"||!document)return eo=new Set(ay),eo;let e=document.createElement("input");return eo=new Set(ay.filter(n=>(e.setAttribute("type",n),e.type===n))),eo}var vf=class{_box;_destroyed=new A;_resizeSubject=new A;_resizeObserver;_elementObservables=new Map;constructor(n){this._box=n,typeof ResizeObserver<"u"&&(this._resizeObserver=new ResizeObserver(t=>this._resizeSubject.next(t)))}observe(n){return this._elementObservables.has(n)||this._elementObservables.set(n,new z(t=>{let r=this._resizeSubject.subscribe(t);return this._resizeObserver?.observe(n,{box:this._box}),()=>{this._resizeObserver?.unobserve(n),r.unsubscribe(),this._elementObservables.delete(n)}}).pipe(Ot(t=>t.some(r=>r.target===n)),ic({bufferSize:1,refCount:!0}),st(this._destroyed))),this._elementObservables.get(n)}destroy(){this._destroyed.next(),this._destroyed.complete(),this._resizeSubject.complete(),this._elementObservables.clear()}},ly=(()=>{class e{_cleanupErrorListener;_observers=new Map;_ngZone=f(N);constructor(){typeof ResizeObserver<"u"}ngOnDestroy(){for(let[,t]of this._observers)t.destroy();this._observers.clear(),this._cleanupErrorListener?.()}observe(t,r){let o=r?.box||"content-box";return this._observers.has(o)||this._observers.set(o,new vf(o)),this._observers.get(o).observe(t)}static \u0275fac=function(r){return new(r||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var cy={XSmall:"(max-width: 599.98px)",Small:"(min-width: 600px) and (max-width: 959.98px)",Medium:"(min-width: 960px) and (max-width: 1279.98px)",Large:"(min-width: 1280px) and (max-width: 1919.98px)",XLarge:"(min-width: 1920px)",Handset:"(max-width: 599.98px) and (orientation: portrait), (max-width: 959.98px) and (orientation: landscape)",Tablet:"(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait), (min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)",Web:"(min-width: 840px) and (orientation: portrait), (min-width: 1280px) and (orientation: landscape)",HandsetPortrait:"(max-width: 599.98px) and (orientation: portrait)",TabletPortrait:"(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait)",WebPortrait:"(min-width: 840px) and (orientation: portrait)",HandsetLandscape:"(max-width: 959.98px) and (orientation: landscape)",TabletLandscape:"(min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)",WebLandscape:"(min-width: 1280px) and (orientation: landscape)"};var S0=new g("MATERIAL_ANIMATIONS"),dy=null;function T0(){return f(S0,{optional:!0})?.animationsDisabled||f(Jo,{optional:!0})==="NoopAnimations"?"di-disabled":(dy??=f(Ja).matchMedia("(prefers-reduced-motion)").matches,dy?"reduced-motion":"enabled")}function je(){return T0()!=="enabled"}var A0=["notch"],N0=["matFormFieldNotchedOutline",""],k0=["*"],uy=["iconPrefixContainer"],fy=["textPrefixContainer"],py=["iconSuffixContainer"],hy=["textSuffixContainer"],R0=["textField"],O0=["*",[["mat-label"]],[["","matPrefix",""],["","matIconPrefix",""]],[["","matTextPrefix",""]],[["","matTextSuffix",""]],[["","matSuffix",""],["","matIconSuffix",""]],[["mat-error"],["","matError",""]],[["mat-hint",3,"align","end"]],[["mat-hint","align","end"]]],F0=["*","mat-label","[matPrefix], [matIconPrefix]","[matTextPrefix]","[matTextSuffix]","[matSuffix], [matIconSuffix]","mat-error, [matError]","mat-hint:not([align='end'])","mat-hint[align='end']"];function P0(e,n){e&1&&re(0,"span",21)}function L0(e,n){if(e&1&&(y(0,"label",20),de(1,1),j(2,P0,1,0,"span",21),b()),e&2){let t=V(2);ce("floating",t._shouldLabelFloat())("monitorResize",t._hasOutline())("id",t._labelId),le("for",t._control.disableAutomaticLabeling?null:t._control.id),_(2),B(!t.hideRequiredMarker&&t._control.required?2:-1)}}function V0(e,n){if(e&1&&j(0,L0,3,5,"label",20),e&2){let t=V();B(t._hasFloatingLabel()?0:-1)}}function j0(e,n){e&1&&re(0,"div",7)}function B0(e,n){}function H0(e,n){if(e&1&&gn(0,B0,0,0,"ng-template",13),e&2){V(2);let t=Wr(1);ce("ngTemplateOutlet",t)}}function U0(e,n){if(e&1&&(y(0,"div",9),j(1,H0,1,1,null,13),b()),e&2){let t=V();ce("matFormFieldNotchedOutlineOpen",t._shouldLabelFloat()),_(),B(t._forceDisplayInfixLabel()?-1:1)}}function $0(e,n){e&1&&(y(0,"div",10,2),de(2,2),b())}function z0(e,n){e&1&&(y(0,"div",11,3),de(2,3),b())}function G0(e,n){}function W0(e,n){if(e&1&&gn(0,G0,0,0,"ng-template",13),e&2){V();let t=Wr(1);ce("ngTemplateOutlet",t)}}function q0(e,n){e&1&&(y(0,"div",14,4),de(2,4),b())}function Y0(e,n){e&1&&(y(0,"div",15,5),de(2,5),b())}function Z0(e,n){e&1&&re(0,"div",16)}function Q0(e,n){e&1&&(y(0,"div",18),de(1,6),b())}function K0(e,n){if(e&1&&(y(0,"mat-hint",22),R(1),b()),e&2){let t=V(2);ce("id",t._hintLabelId),_(),Me(t.hintLabel)}}function X0(e,n){if(e&1&&(y(0,"div",19),j(1,K0,2,2,"mat-hint",22),de(2,7),re(3,"div",23),de(4,8),b()),e&2){let t=V();_(),B(t.hintLabel?1:-1)}}var Ci=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275dir=W({type:e,selectors:[["mat-label"]]})}return e})(),J0=new g("MatError");var yf=(()=>{class e{align="start";id=f(Ve).getId("mat-mdc-hint-");static \u0275fac=function(r){return new(r||e)};static \u0275dir=W({type:e,selectors:[["mat-hint"]],hostAttrs:[1,"mat-mdc-form-field-hint","mat-mdc-form-field-bottom-align"],hostVars:4,hostBindings:function(r,o){r&2&&(zr("id",o.id),le("align",null),U("mat-mdc-form-field-hint-end",o.align==="end"))},inputs:{align:"align",id:"id"}})}return e})(),eI=new g("MatPrefix");var tI=new g("MatSuffix");var Dy=new g("FloatingLabelParent"),my=(()=>{class e{_elementRef=f(Y);get floating(){return this._floating}set floating(t){this._floating=t,this.monitorResize&&this._handleResize()}_floating=!1;get monitorResize(){return this._monitorResize}set monitorResize(t){this._monitorResize=t,this._monitorResize?this._subscribeToResize():this._resizeSubscription.unsubscribe()}_monitorResize=!1;_resizeObserver=f(ly);_ngZone=f(N);_parent=f(Dy);_resizeSubscription=new me;constructor(){}ngOnDestroy(){this._resizeSubscription.unsubscribe()}getWidth(){return nI(this._elementRef.nativeElement)}get element(){return this._elementRef.nativeElement}_handleResize(){setTimeout(()=>this._parent._handleLabelResized())}_subscribeToResize(){this._resizeSubscription.unsubscribe(),this._ngZone.runOutsideAngular(()=>{this._resizeSubscription=this._resizeObserver.observe(this._elementRef.nativeElement,{box:"border-box"}).subscribe(()=>this._handleResize())})}static \u0275fac=function(r){return new(r||e)};static \u0275dir=W({type:e,selectors:[["label","matFormFieldFloatingLabel",""]],hostAttrs:[1,"mdc-floating-label","mat-mdc-floating-label"],hostVars:2,hostBindings:function(r,o){r&2&&U("mdc-floating-label--float-above",o.floating)},inputs:{floating:"floating",monitorResize:"monitorResize"}})}return e})();function nI(e){let n=e;if(n.offsetParent!==null)return n.scrollWidth;let t=n.cloneNode(!0);t.style.setProperty("position","absolute"),t.style.setProperty("transform","translate(-9999px, -9999px)"),document.documentElement.appendChild(t);let r=t.scrollWidth;return t.remove(),r}var gy="mdc-line-ripple--active",el="mdc-line-ripple--deactivating",vy=(()=>{class e{_elementRef=f(Y);_cleanupTransitionEnd;constructor(){let t=f(N),r=f(et);t.runOutsideAngular(()=>{this._cleanupTransitionEnd=r.listen(this._elementRef.nativeElement,"transitionend",this._handleTransitionEnd)})}activate(){let t=this._elementRef.nativeElement.classList;t.remove(el),t.add(gy)}deactivate(){this._elementRef.nativeElement.classList.add(el)}_handleTransitionEnd=t=>{let r=this._elementRef.nativeElement.classList,o=r.contains(el);t.propertyName==="opacity"&&o&&r.remove(gy,el)};ngOnDestroy(){this._cleanupTransitionEnd()}static \u0275fac=function(r){return new(r||e)};static \u0275dir=W({type:e,selectors:[["div","matFormFieldLineRipple",""]],hostAttrs:[1,"mdc-line-ripple"]})}return e})(),yy=(()=>{class e{_elementRef=f(Y);_ngZone=f(N);open=!1;_notch;ngAfterViewInit(){let t=this._elementRef.nativeElement,r=t.querySelector(".mdc-floating-label");r?(t.classList.add("mdc-notched-outline--upgraded"),typeof requestAnimationFrame=="function"&&(r.style.transitionDuration="0s",this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>r.style.transitionDuration="")}))):t.classList.add("mdc-notched-outline--no-label")}_setNotchWidth(t){let r=this._notch.nativeElement;!this.open||!t?r.style.width="":r.style.width=`calc(${t}px * var(--mat-mdc-form-field-floating-label-scale, 0.75) + 9px)`}_setMaxWidth(t){this._notch.nativeElement.style.setProperty("--mat-form-field-notch-max-width",`calc(100% - ${t}px)`)}static \u0275fac=function(r){return new(r||e)};static \u0275cmp=$({type:e,selectors:[["div","matFormFieldNotchedOutline",""]],viewQuery:function(r,o){if(r&1&&gt(A0,5),r&2){let i;pe(i=he())&&(o._notch=i.first)}},hostAttrs:[1,"mdc-notched-outline"],hostVars:2,hostBindings:function(r,o){r&2&&U("mdc-notched-outline--notched",o.open)},inputs:{open:[0,"matFormFieldNotchedOutlineOpen","open"]},attrs:N0,ngContentSelectors:k0,decls:5,vars:0,consts:[["notch",""],[1,"mat-mdc-notch-piece","mdc-notched-outline__leading"],[1,"mat-mdc-notch-piece","mdc-notched-outline__notch"],[1,"mat-mdc-notch-piece","mdc-notched-outline__trailing"]],template:function(r,o){r&1&&(qe(),We(0,"div",1),vn(1,"div",2,0),de(3),yn(),We(4,"div",3))},encapsulation:2,changeDetection:0})}return e})(),bf=(()=>{class e{value=null;stateChanges;id;placeholder;ngControl=null;focused=!1;empty=!1;shouldLabelFloat=!1;required=!1;disabled=!1;errorState=!1;controlType;autofilled;userAriaDescribedBy;disableAutomaticLabeling;describedByIds;static \u0275fac=function(r){return new(r||e)};static \u0275dir=W({type:e})}return e})();var _f=new g("MatFormField"),rI=new g("MAT_FORM_FIELD_DEFAULT_OPTIONS"),by="fill",oI="auto",_y="fixed",iI="translateY(-50%)",tl=(()=>{class e{_elementRef=f(Y);_changeDetectorRef=f(Kt);_platform=f(Ee);_idGenerator=f(Ve);_ngZone=f(N);_defaults=f(rI,{optional:!0});_currentDirection;_textField;_iconPrefixContainer;_textPrefixContainer;_iconSuffixContainer;_textSuffixContainer;_floatingLabel;_notchedOutline;_lineRipple;_iconPrefixContainerSignal=ci("iconPrefixContainer");_textPrefixContainerSignal=ci("textPrefixContainer");_iconSuffixContainerSignal=ci("iconSuffixContainer");_textSuffixContainerSignal=ci("textSuffixContainer");_prefixSuffixContainers=Re(()=>[this._iconPrefixContainerSignal(),this._textPrefixContainerSignal(),this._iconSuffixContainerSignal(),this._textSuffixContainerSignal()].map(t=>t?.nativeElement).filter(t=>t!==void 0));_formFieldControl;_prefixChildren;_suffixChildren;_errorChildren;_hintChildren;_labelChild=hv(Ci);get hideRequiredMarker(){return this._hideRequiredMarker}set hideRequiredMarker(t){this._hideRequiredMarker=Jr(t)}_hideRequiredMarker=!1;color="primary";get floatLabel(){return this._floatLabel||this._defaults?.floatLabel||oI}set floatLabel(t){t!==this._floatLabel&&(this._floatLabel=t,this._changeDetectorRef.markForCheck())}_floatLabel;get appearance(){return this._appearanceSignal()}set appearance(t){let r=t||this._defaults?.appearance||by;this._appearanceSignal.set(r)}_appearanceSignal=H(by);get subscriptSizing(){return this._subscriptSizing||this._defaults?.subscriptSizing||_y}set subscriptSizing(t){this._subscriptSizing=t||this._defaults?.subscriptSizing||_y}_subscriptSizing=null;get hintLabel(){return this._hintLabel}set hintLabel(t){this._hintLabel=t,this._processHints()}_hintLabel="";_hasIconPrefix=!1;_hasTextPrefix=!1;_hasIconSuffix=!1;_hasTextSuffix=!1;_labelId=this._idGenerator.getId("mat-mdc-form-field-label-");_hintLabelId=this._idGenerator.getId("mat-mdc-hint-");_describedByIds;get _control(){return this._explicitFormFieldControl||this._formFieldControl}set _control(t){this._explicitFormFieldControl=t}_destroyed=new A;_isFocused=null;_explicitFormFieldControl;_previousControl=null;_previousControlValidatorFn=null;_stateChanges;_valueChanges;_describedByChanges;_outlineLabelOffsetResizeObserver=null;_animationsDisabled=je();constructor(){let t=this._defaults,r=f(dr);t&&(t.appearance&&(this.appearance=t.appearance),this._hideRequiredMarker=!!t?.hideRequiredMarker,t.color&&(this.color=t.color)),Qn(()=>this._currentDirection=r.valueSignal()),this._syncOutlineLabelOffset()}ngAfterViewInit(){this._updateFocusState(),this._animationsDisabled||this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{this._elementRef.nativeElement.classList.add("mat-form-field-animations-enabled")},300)}),this._changeDetectorRef.detectChanges()}ngAfterContentInit(){this._assertFormFieldControl(),this._initializeSubscript(),this._initializePrefixAndSuffix()}ngAfterContentChecked(){this._assertFormFieldControl(),this._control!==this._previousControl&&(this._initializeControl(this._previousControl),this._control.ngControl&&this._control.ngControl.control&&(this._previousControlValidatorFn=this._control.ngControl.control.validator),this._previousControl=this._control),this._control.ngControl&&this._control.ngControl.control&&this._control.ngControl.control.validator!==this._previousControlValidatorFn&&this._changeDetectorRef.markForCheck()}ngOnDestroy(){this._outlineLabelOffsetResizeObserver?.disconnect(),this._stateChanges?.unsubscribe(),this._valueChanges?.unsubscribe(),this._describedByChanges?.unsubscribe(),this._destroyed.next(),this._destroyed.complete()}getLabelId=Re(()=>this._hasFloatingLabel()?this._labelId:null);getConnectedOverlayOrigin(){return this._textField||this._elementRef}_animateAndLockLabel(){this._hasFloatingLabel()&&(this.floatLabel="always")}_initializeControl(t){let r=this._control,o="mat-mdc-form-field-type-";t&&this._elementRef.nativeElement.classList.remove(o+t.controlType),r.controlType&&this._elementRef.nativeElement.classList.add(o+r.controlType),this._stateChanges?.unsubscribe(),this._stateChanges=r.stateChanges.subscribe(()=>{this._updateFocusState(),this._changeDetectorRef.markForCheck()}),this._describedByChanges?.unsubscribe(),this._describedByChanges=r.stateChanges.pipe(Io([void 0,void 0]),se(()=>[r.errorState,r.userAriaDescribedBy]),rc(),Ot(([[i,s],[a,l]])=>i!==a||s!==l)).subscribe(()=>this._syncDescribedByIds()),this._valueChanges?.unsubscribe(),r.ngControl&&r.ngControl.valueChanges&&(this._valueChanges=r.ngControl.valueChanges.pipe(st(this._destroyed)).subscribe(()=>this._changeDetectorRef.markForCheck()))}_checkPrefixAndSuffixTypes(){this._hasIconPrefix=!!this._prefixChildren.find(t=>!t._isText),this._hasTextPrefix=!!this._prefixChildren.find(t=>t._isText),this._hasIconSuffix=!!this._suffixChildren.find(t=>!t._isText),this._hasTextSuffix=!!this._suffixChildren.find(t=>t._isText)}_initializePrefixAndSuffix(){this._checkPrefixAndSuffixTypes(),Jl(this._prefixChildren.changes,this._suffixChildren.changes).subscribe(()=>{this._checkPrefixAndSuffixTypes(),this._changeDetectorRef.markForCheck()})}_initializeSubscript(){this._hintChildren.changes.subscribe(()=>{this._processHints(),this._changeDetectorRef.markForCheck()}),this._errorChildren.changes.subscribe(()=>{this._syncDescribedByIds(),this._changeDetectorRef.markForCheck()}),this._validateHints(),this._syncDescribedByIds()}_assertFormFieldControl(){this._control}_updateFocusState(){let t=this._control.focused;t&&!this._isFocused?(this._isFocused=!0,this._lineRipple?.activate()):!t&&(this._isFocused||this._isFocused===null)&&(this._isFocused=!1,this._lineRipple?.deactivate()),this._elementRef.nativeElement.classList.toggle("mat-focused",t),this._textField?.nativeElement.classList.toggle("mdc-text-field--focused",t)}_syncOutlineLabelOffset(){yv({earlyRead:()=>{if(this._appearanceSignal()!=="outline")return this._outlineLabelOffsetResizeObserver?.disconnect(),null;if(globalThis.ResizeObserver){this._outlineLabelOffsetResizeObserver||=new globalThis.ResizeObserver(()=>{this._writeOutlinedLabelStyles(this._getOutlinedLabelOffset())});for(let t of this._prefixSuffixContainers())this._outlineLabelOffsetResizeObserver.observe(t,{box:"border-box"})}return this._getOutlinedLabelOffset()},write:t=>this._writeOutlinedLabelStyles(t())})}_shouldAlwaysFloat(){return this.floatLabel==="always"}_hasOutline(){return this.appearance==="outline"}_forceDisplayInfixLabel(){return!this._platform.isBrowser&&this._prefixChildren.length&&!this._shouldLabelFloat()}_hasFloatingLabel=Re(()=>!!this._labelChild());_shouldLabelFloat(){return this._hasFloatingLabel()?this._control.shouldLabelFloat||this._shouldAlwaysFloat():!1}_shouldForward(t){let r=this._control?this._control.ngControl:null;return r&&r[t]}_getSubscriptMessageType(){return this._errorChildren&&this._errorChildren.length>0&&this._control.errorState?"error":"hint"}_handleLabelResized(){this._refreshOutlineNotchWidth()}_refreshOutlineNotchWidth(){!this._hasOutline()||!this._floatingLabel||!this._shouldLabelFloat()?this._notchedOutline?._setNotchWidth(0):this._notchedOutline?._setNotchWidth(this._floatingLabel.getWidth())}_processHints(){this._validateHints(),this._syncDescribedByIds()}_validateHints(){this._hintChildren}_syncDescribedByIds(){if(this._control){let t=[];if(this._control.userAriaDescribedBy&&typeof this._control.userAriaDescribedBy=="string"&&t.push(...this._control.userAriaDescribedBy.split(" ")),this._getSubscriptMessageType()==="hint"){let i=this._hintChildren?this._hintChildren.find(a=>a.align==="start"):null,s=this._hintChildren?this._hintChildren.find(a=>a.align==="end"):null;i?t.push(i.id):this._hintLabel&&t.push(this._hintLabelId),s&&t.push(s.id)}else this._errorChildren&&t.push(...this._errorChildren.map(i=>i.id));let r=this._control.describedByIds,o;if(r){let i=this._describedByIds||t;o=t.concat(r.filter(s=>s&&!i.includes(s)))}else o=t;this._control.setDescribedByIds(o),this._describedByIds=t}}_getOutlinedLabelOffset(){if(!this._hasOutline()||!this._floatingLabel)return null;if(!this._iconPrefixContainer&&!this._textPrefixContainer)return["",null];if(!this._isAttachedToDom())return null;let t=this._iconPrefixContainer?.nativeElement,r=this._textPrefixContainer?.nativeElement,o=this._iconSuffixContainer?.nativeElement,i=this._textSuffixContainer?.nativeElement,s=t?.getBoundingClientRect().width??0,a=r?.getBoundingClientRect().width??0,l=o?.getBoundingClientRect().width??0,c=i?.getBoundingClientRect().width??0,d=this._currentDirection==="rtl"?"-1":"1",u=`${s+a}px`,p=`calc(${d} * (${u} + var(--mat-mdc-form-field-label-offset-x, 0px)))`,m=`var(--mat-mdc-form-field-label-transform, ${iI} translateX(${p}))`,D=s+a+l+c;return[m,D]}_writeOutlinedLabelStyles(t){if(t!==null){let[r,o]=t;this._floatingLabel&&(this._floatingLabel.element.style.transform=r),o!==null&&this._notchedOutline?._setMaxWidth(o)}}_isAttachedToDom(){let t=this._elementRef.nativeElement;if(t.getRootNode){let r=t.getRootNode();return r&&r!==t}return document.documentElement.contains(t)}static \u0275fac=function(r){return new(r||e)};static \u0275cmp=$({type:e,selectors:[["mat-form-field"]],contentQueries:function(r,o,i){if(r&1&&(Aa(i,o._labelChild,Ci,5),Gr(i,bf,5)(i,eI,5)(i,tI,5)(i,J0,5)(i,yf,5)),r&2){ka();let s;pe(s=he())&&(o._formFieldControl=s.first),pe(s=he())&&(o._prefixChildren=s),pe(s=he())&&(o._suffixChildren=s),pe(s=he())&&(o._errorChildren=s),pe(s=he())&&(o._hintChildren=s)}},viewQuery:function(r,o){if(r&1&&(Na(o._iconPrefixContainerSignal,uy,5)(o._textPrefixContainerSignal,fy,5)(o._iconSuffixContainerSignal,py,5)(o._textSuffixContainerSignal,hy,5),gt(R0,5)(uy,5)(fy,5)(py,5)(hy,5)(my,5)(yy,5)(vy,5)),r&2){ka(4);let i;pe(i=he())&&(o._textField=i.first),pe(i=he())&&(o._iconPrefixContainer=i.first),pe(i=he())&&(o._textPrefixContainer=i.first),pe(i=he())&&(o._iconSuffixContainer=i.first),pe(i=he())&&(o._textSuffixContainer=i.first),pe(i=he())&&(o._floatingLabel=i.first),pe(i=he())&&(o._notchedOutline=i.first),pe(i=he())&&(o._lineRipple=i.first)}},hostAttrs:[1,"mat-mdc-form-field"],hostVars:38,hostBindings:function(r,o){r&2&&U("mat-mdc-form-field-label-always-float",o._shouldAlwaysFloat())("mat-mdc-form-field-has-icon-prefix",o._hasIconPrefix)("mat-mdc-form-field-has-icon-suffix",o._hasIconSuffix)("mat-form-field-invalid",o._control.errorState)("mat-form-field-disabled",o._control.disabled)("mat-form-field-autofilled",o._control.autofilled)("mat-form-field-appearance-fill",o.appearance=="fill")("mat-form-field-appearance-outline",o.appearance=="outline")("mat-form-field-hide-placeholder",o._hasFloatingLabel()&&!o._shouldLabelFloat())("mat-primary",o.color!=="accent"&&o.color!=="warn")("mat-accent",o.color==="accent")("mat-warn",o.color==="warn")("ng-untouched",o._shouldForward("untouched"))("ng-touched",o._shouldForward("touched"))("ng-pristine",o._shouldForward("pristine"))("ng-dirty",o._shouldForward("dirty"))("ng-valid",o._shouldForward("valid"))("ng-invalid",o._shouldForward("invalid"))("ng-pending",o._shouldForward("pending"))},inputs:{hideRequiredMarker:"hideRequiredMarker",color:"color",floatLabel:"floatLabel",appearance:"appearance",subscriptSizing:"subscriptSizing",hintLabel:"hintLabel"},exportAs:["matFormField"],features:[vt([{provide:_f,useExisting:e},{provide:Dy,useExisting:e}])],ngContentSelectors:F0,decls:18,vars:21,consts:[["labelTemplate",""],["textField",""],["iconPrefixContainer",""],["textPrefixContainer",""],["textSuffixContainer",""],["iconSuffixContainer",""],[1,"mat-mdc-text-field-wrapper","mdc-text-field",3,"click"],[1,"mat-mdc-form-field-focus-overlay"],[1,"mat-mdc-form-field-flex"],["matFormFieldNotchedOutline","",3,"matFormFieldNotchedOutlineOpen"],[1,"mat-mdc-form-field-icon-prefix"],[1,"mat-mdc-form-field-text-prefix"],[1,"mat-mdc-form-field-infix"],[3,"ngTemplateOutlet"],[1,"mat-mdc-form-field-text-suffix"],[1,"mat-mdc-form-field-icon-suffix"],["matFormFieldLineRipple",""],["aria-atomic","true","aria-live","polite",1,"mat-mdc-form-field-subscript-wrapper","mat-mdc-form-field-bottom-align"],[1,"mat-mdc-form-field-error-wrapper"],[1,"mat-mdc-form-field-hint-wrapper"],["matFormFieldFloatingLabel","",3,"floating","monitorResize","id"],["aria-hidden","true",1,"mat-mdc-form-field-required-marker","mdc-floating-label--required"],[3,"id"],[1,"mat-mdc-form-field-hint-spacer"]],template:function(r,o){if(r&1&&(qe(O0),gn(0,V0,1,1,"ng-template",null,0,Bu),y(2,"div",6,1),ne("click",function(s){return o._control.onContainerClick(s)}),j(4,j0,1,0,"div",7),y(5,"div",8),j(6,U0,2,2,"div",9),j(7,$0,3,0,"div",10),j(8,z0,3,0,"div",11),y(9,"div",12),j(10,W0,1,1,null,13),de(11),b(),j(12,q0,3,0,"div",14),j(13,Y0,3,0,"div",15),b(),j(14,Z0,1,0,"div",16),b(),y(15,"div",17),j(16,Q0,2,0,"div",18)(17,X0,5,1,"div",19),b()),r&2){let i;_(2),U("mdc-text-field--filled",!o._hasOutline())("mdc-text-field--outlined",o._hasOutline())("mdc-text-field--no-label",!o._hasFloatingLabel())("mdc-text-field--disabled",o._control.disabled)("mdc-text-field--invalid",o._control.errorState),_(2),B(!o._hasOutline()&&!o._control.disabled?4:-1),_(2),B(o._hasOutline()?6:-1),_(),B(o._hasIconPrefix?7:-1),_(),B(o._hasTextPrefix?8:-1),_(2),B(!o._hasOutline()||o._forceDisplayInfixLabel()?10:-1),_(2),B(o._hasTextSuffix?12:-1),_(),B(o._hasIconSuffix?13:-1),_(),B(o._hasOutline()?-1:14),_(),U("mat-mdc-form-field-subscript-dynamic-size",o.subscriptSizing==="dynamic");let s=o._getSubscriptMessageType();_(),B((i=s)==="error"?16:i==="hint"?17:-1)}},dependencies:[my,yy,Gu,vy,yf],styles:[`.mdc-text-field {
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
`],encapsulation:2,changeDetection:0})}return e})();var wi=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275mod=te({type:e});static \u0275inj=J({imports:[ny,tl,nt]})}return e})();var aI=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275cmp=$({type:e,selectors:[["ng-component"]],hostAttrs:["cdk-text-field-style-loader",""],decls:0,vars:0,template:function(r,o){},styles:[`textarea.cdk-textarea-autosize {
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
`],encapsulation:2,changeDetection:0})}return e})(),lI={passive:!0},Ey=(()=>{class e{_platform=f(Ee);_ngZone=f(N);_renderer=f(Te).createRenderer(null,null);_styleLoader=f(tt);_monitoredElements=new Map;constructor(){}monitor(t){if(!this._platform.isBrowser)return kn;this._styleLoader.load(aI);let r=bt(t),o=this._monitoredElements.get(r);if(o)return o.subject;let i=new A,s="cdk-text-field-autofilled",a=c=>{c.animationName==="cdk-text-field-autofill-start"&&!r.classList.contains(s)?(r.classList.add(s),this._ngZone.run(()=>i.next({target:c.target,isAutofilled:!0}))):c.animationName==="cdk-text-field-autofill-end"&&r.classList.contains(s)&&(r.classList.remove(s),this._ngZone.run(()=>i.next({target:c.target,isAutofilled:!1})))},l=this._ngZone.runOutsideAngular(()=>(r.classList.add("cdk-text-field-autofill-monitored"),this._renderer.listen(r,"animationstart",a,lI)));return this._monitoredElements.set(r,{subject:i,unlisten:l}),i}stopMonitoring(t){let r=bt(t),o=this._monitoredElements.get(r);o&&(o.unlisten(),o.subject.complete(),r.classList.remove("cdk-text-field-autofill-monitored"),r.classList.remove("cdk-text-field-autofilled"),this._monitoredElements.delete(r))}ngOnDestroy(){this._monitoredElements.forEach((t,r)=>this.stopMonitoring(r))}static \u0275fac=function(r){return new(r||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var Cy=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275mod=te({type:e});static \u0275inj=J({})}return e})();var Ay=new g("");function Cf(e){return e==null||wf(e)===0}function wf(e){return e==null?null:Array.isArray(e)||typeof e=="string"?e.length:e instanceof Set?e.size:null}var Ny=new g(""),ky=new g(""),cI=/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,rl=class{static min(n){return dI(n)}static max(n){return uI(n)}static required(n){return fI(n)}static requiredTrue(n){return pI(n)}static email(n){return hI(n)}static minLength(n){return mI(n)}static maxLength(n){return gI(n)}static pattern(n){return vI(n)}static nullValidator(n){return Ry()}static compose(n){return jy(n)}static composeAsync(n){return By(n)}};function dI(e){return n=>{if(n.value==null||e==null)return null;let t=parseFloat(n.value);return!isNaN(t)&&t<e?{min:{min:e,actual:n.value}}:null}}function uI(e){return n=>{if(n.value==null||e==null)return null;let t=parseFloat(n.value);return!isNaN(t)&&t>e?{max:{max:e,actual:n.value}}:null}}function fI(e){return Cf(e.value)?{required:!0}:null}function pI(e){return e.value===!0?null:{required:!0}}function hI(e){return Cf(e.value)||cI.test(e.value)?null:{email:!0}}function mI(e){return n=>{let t=n.value?.length??wf(n.value);return t===null||t===0?null:t<e?{minlength:{requiredLength:e,actualLength:t}}:null}}function gI(e){return n=>{let t=n.value?.length??wf(n.value);return t!==null&&t>e?{maxlength:{requiredLength:e,actualLength:t}}:null}}function vI(e){if(!e)return Ry;let n,t;return typeof e=="string"?(t="",e.charAt(0)!=="^"&&(t+="^"),t+=e,e.charAt(e.length-1)!=="$"&&(t+="$"),n=new RegExp(t)):(t=e.toString(),n=e),r=>{if(Cf(r.value))return null;let o=r.value;return n.test(o)?null:{pattern:{requiredPattern:t,actualValue:o}}}}function Ry(e){return null}function Oy(e){return e!=null}function Fy(e){return $r(e)?Ye(e):e}function Py(e){let n={};return e.forEach(t=>{n=t!=null?E(E({},n),t):n}),Object.keys(n).length===0?null:n}function Ly(e,n){return n.map(t=>t(e))}function yI(e){return!e.validate}function Vy(e){return e.map(n=>yI(n)?n:t=>n.validate(t))}function jy(e){if(!e)return null;let n=e.filter(Oy);return n.length==0?null:function(t){return Py(Ly(t,n))}}function xf(e){return e!=null?jy(Vy(e)):null}function By(e){if(!e)return null;let n=e.filter(Oy);return n.length==0?null:function(t){let r=Ly(t,n).map(Fy);return Do(r).pipe(se(Py))}}function If(e){return e!=null?By(Vy(e)):null}function wy(e,n){return e===null?[n]:Array.isArray(e)?[...e,n]:[e,n]}function Hy(e){return e._rawValidators}function Uy(e){return e._rawAsyncValidators}function Df(e){return e?Array.isArray(e)?e:[e]:[]}function ol(e,n){return Array.isArray(e)?e.includes(n):e===n}function xy(e,n){let t=Df(n);return Df(e).forEach(o=>{ol(t,o)||t.push(o)}),t}function Iy(e,n){return Df(n).filter(t=>!ol(e,t))}var il=class{get value(){return this.control?this.control.value:null}get valid(){return this.control?this.control.valid:null}get invalid(){return this.control?this.control.invalid:null}get pending(){return this.control?this.control.pending:null}get disabled(){return this.control?this.control.disabled:null}get enabled(){return this.control?this.control.enabled:null}get errors(){return this.control?this.control.errors:null}get pristine(){return this.control?this.control.pristine:null}get dirty(){return this.control?this.control.dirty:null}get touched(){return this.control?this.control.touched:null}get status(){return this.control?this.control.status:null}get untouched(){return this.control?this.control.untouched:null}get statusChanges(){return this.control?this.control.statusChanges:null}get valueChanges(){return this.control?this.control.valueChanges:null}get path(){return null}_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators=[];_rawAsyncValidators=[];_setValidators(n){this._rawValidators=n||[],this._composedValidatorFn=xf(this._rawValidators)}_setAsyncValidators(n){this._rawAsyncValidators=n||[],this._composedAsyncValidatorFn=If(this._rawAsyncValidators)}get validator(){return this._composedValidatorFn||null}get asyncValidator(){return this._composedAsyncValidatorFn||null}_onDestroyCallbacks=[];_registerOnDestroy(n){this._onDestroyCallbacks.push(n)}_invokeOnDestroyCallbacks(){this._onDestroyCallbacks.forEach(n=>n()),this._onDestroyCallbacks=[]}reset(n=void 0){this.control?.reset(n)}hasError(n,t){return this.control?this.control.hasError(n,t):!1}getError(n,t){return this.control?this.control.getError(n,t):null}},ro=class extends il{name;get formDirective(){return null}get path(){return null}},sl=class extends il{_parent=null;name=null;valueAccessor=null};var xi="VALID",nl="INVALID",to="PENDING",Ii="DISABLED",Cn=class{},al=class extends Cn{value;source;constructor(n,t){super(),this.value=n,this.source=t}},Si=class extends Cn{pristine;source;constructor(n,t){super(),this.pristine=n,this.source=t}},Ti=class extends Cn{touched;source;constructor(n,t){super(),this.touched=n,this.source=t}},no=class extends Cn{status;source;constructor(n,t){super(),this.status=n,this.source=t}},ll=class extends Cn{source;constructor(n){super(),this.source=n}},cl=class extends Cn{source;constructor(n){super(),this.source=n}};function $y(e){return(hl(e)?e.validators:e)||null}function bI(e){return Array.isArray(e)?xf(e):e||null}function zy(e,n){return(hl(n)?n.asyncValidators:e)||null}function _I(e){return Array.isArray(e)?If(e):e||null}function hl(e){return e!=null&&!Array.isArray(e)&&typeof e=="object"}function DI(e,n,t){let r=e.controls;if(!(n?Object.keys(r):r).length)throw new I(1e3,"");if(!r[t])throw new I(1001,"")}function EI(e,n,t){e._forEachChild((r,o)=>{if(t[o]===void 0)throw new I(-1002,"")})}var dl=class{_pendingDirty=!1;_hasOwnPendingAsyncValidator=null;_pendingTouched=!1;_onCollectionChange=()=>{};_updateOn;_parent=null;_asyncValidationSubscription;_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators;_rawAsyncValidators;value;constructor(n,t){this._assignValidators(n),this._assignAsyncValidators(t)}get validator(){return this._composedValidatorFn}set validator(n){this._rawValidators=this._composedValidatorFn=n}get asyncValidator(){return this._composedAsyncValidatorFn}set asyncValidator(n){this._rawAsyncValidators=this._composedAsyncValidatorFn=n}get parent(){return this._parent}get status(){return yt(this.statusReactive)}set status(n){yt(()=>this.statusReactive.set(n))}_status=Re(()=>this.statusReactive());statusReactive=H(void 0);get valid(){return this.status===xi}get invalid(){return this.status===nl}get pending(){return this.status===to}get disabled(){return this.status===Ii}get enabled(){return this.status!==Ii}errors;get pristine(){return yt(this.pristineReactive)}set pristine(n){yt(()=>this.pristineReactive.set(n))}_pristine=Re(()=>this.pristineReactive());pristineReactive=H(!0);get dirty(){return!this.pristine}get touched(){return yt(this.touchedReactive)}set touched(n){yt(()=>this.touchedReactive.set(n))}_touched=Re(()=>this.touchedReactive());touchedReactive=H(!1);get untouched(){return!this.touched}_events=new A;events=this._events.asObservable();valueChanges;statusChanges;get updateOn(){return this._updateOn?this._updateOn:this.parent?this.parent.updateOn:"change"}setValidators(n){this._assignValidators(n)}setAsyncValidators(n){this._assignAsyncValidators(n)}addValidators(n){this.setValidators(xy(n,this._rawValidators))}addAsyncValidators(n){this.setAsyncValidators(xy(n,this._rawAsyncValidators))}removeValidators(n){this.setValidators(Iy(n,this._rawValidators))}removeAsyncValidators(n){this.setAsyncValidators(Iy(n,this._rawAsyncValidators))}hasValidator(n){return ol(this._rawValidators,n)}hasAsyncValidator(n){return ol(this._rawAsyncValidators,n)}clearValidators(){this.validator=null}clearAsyncValidators(){this.asyncValidator=null}markAsTouched(n={}){let t=this.touched===!1;this.touched=!0;let r=n.sourceControl??this;n.onlySelf||this._parent?.markAsTouched(Z(E({},n),{sourceControl:r})),t&&n.emitEvent!==!1&&this._events.next(new Ti(!0,r))}markAllAsDirty(n={}){this.markAsDirty({onlySelf:!0,emitEvent:n.emitEvent,sourceControl:this}),this._forEachChild(t=>t.markAllAsDirty(n))}markAllAsTouched(n={}){this.markAsTouched({onlySelf:!0,emitEvent:n.emitEvent,sourceControl:this}),this._forEachChild(t=>t.markAllAsTouched(n))}markAsUntouched(n={}){let t=this.touched===!0;this.touched=!1,this._pendingTouched=!1;let r=n.sourceControl??this;this._forEachChild(o=>{o.markAsUntouched({onlySelf:!0,emitEvent:n.emitEvent,sourceControl:r})}),n.onlySelf||this._parent?._updateTouched(n,r),t&&n.emitEvent!==!1&&this._events.next(new Ti(!1,r))}markAsDirty(n={}){let t=this.pristine===!0;this.pristine=!1;let r=n.sourceControl??this;n.onlySelf||this._parent?.markAsDirty(Z(E({},n),{sourceControl:r})),t&&n.emitEvent!==!1&&this._events.next(new Si(!1,r))}markAsPristine(n={}){let t=this.pristine===!1;this.pristine=!0,this._pendingDirty=!1;let r=n.sourceControl??this;this._forEachChild(o=>{o.markAsPristine({onlySelf:!0,emitEvent:n.emitEvent})}),n.onlySelf||this._parent?._updatePristine(n,r),t&&n.emitEvent!==!1&&this._events.next(new Si(!0,r))}markAsPending(n={}){this.status=to;let t=n.sourceControl??this;n.emitEvent!==!1&&(this._events.next(new no(this.status,t)),this.statusChanges.emit(this.status)),n.onlySelf||this._parent?.markAsPending(Z(E({},n),{sourceControl:t}))}disable(n={}){let t=this._parentMarkedDirty(n.onlySelf);this.status=Ii,this.errors=null,this._forEachChild(o=>{o.disable(Z(E({},n),{onlySelf:!0}))}),this._updateValue();let r=n.sourceControl??this;n.emitEvent!==!1&&(this._events.next(new al(this.value,r)),this._events.next(new no(this.status,r)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._updateAncestors(Z(E({},n),{skipPristineCheck:t}),this),this._onDisabledChange.forEach(o=>o(!0))}enable(n={}){let t=this._parentMarkedDirty(n.onlySelf);this.status=xi,this._forEachChild(r=>{r.enable(Z(E({},n),{onlySelf:!0}))}),this.updateValueAndValidity({onlySelf:!0,emitEvent:n.emitEvent}),this._updateAncestors(Z(E({},n),{skipPristineCheck:t}),this),this._onDisabledChange.forEach(r=>r(!1))}_updateAncestors(n,t){n.onlySelf||(this._parent?.updateValueAndValidity(n),n.skipPristineCheck||this._parent?._updatePristine({},t),this._parent?._updateTouched({},t))}setParent(n){this._parent=n}getRawValue(){return this.value}updateValueAndValidity(n={}){if(this._setInitialStatus(),this._updateValue(),this.enabled){let r=this._cancelExistingSubscription();this.errors=this._runValidator(),this.status=this._calculateStatus(),(this.status===xi||this.status===to)&&this._runAsyncValidator(r,n.emitEvent)}let t=n.sourceControl??this;n.emitEvent!==!1&&(this._events.next(new al(this.value,t)),this._events.next(new no(this.status,t)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),n.onlySelf||this._parent?.updateValueAndValidity(Z(E({},n),{sourceControl:t}))}_updateTreeValidity(n={emitEvent:!0}){this._forEachChild(t=>t._updateTreeValidity(n)),this.updateValueAndValidity({onlySelf:!0,emitEvent:n.emitEvent})}_setInitialStatus(){this.status=this._allControlsDisabled()?Ii:xi}_runValidator(){return this.validator?this.validator(this):null}_runAsyncValidator(n,t){if(this.asyncValidator){this.status=to,this._hasOwnPendingAsyncValidator={emitEvent:t!==!1,shouldHaveEmitted:n!==!1};let r=Fy(this.asyncValidator(this));this._asyncValidationSubscription=r.subscribe(o=>{this._hasOwnPendingAsyncValidator=null,this.setErrors(o,{emitEvent:t,shouldHaveEmitted:n})})}}_cancelExistingSubscription(){if(this._asyncValidationSubscription){this._asyncValidationSubscription.unsubscribe();let n=(this._hasOwnPendingAsyncValidator?.emitEvent||this._hasOwnPendingAsyncValidator?.shouldHaveEmitted)??!1;return this._hasOwnPendingAsyncValidator=null,n}return!1}setErrors(n,t={}){this.errors=n,this._updateControlsErrors(t.emitEvent!==!1,this,t.shouldHaveEmitted)}get(n){let t=n;return t==null||(Array.isArray(t)||(t=t.split(".")),t.length===0)?null:t.reduce((r,o)=>r&&r._find(o),this)}getError(n,t){let r=t?this.get(t):this;return r?.errors?r.errors[n]:null}hasError(n,t){return!!this.getError(n,t)}get root(){let n=this;for(;n._parent;)n=n._parent;return n}_updateControlsErrors(n,t,r){this.status=this._calculateStatus(),n&&this.statusChanges.emit(this.status),(n||r)&&this._events.next(new no(this.status,t)),this._parent&&this._parent._updateControlsErrors(n,t,r)}_initObservables(){this.valueChanges=new ae,this.statusChanges=new ae}_calculateStatus(){return this._allControlsDisabled()?Ii:this.errors?nl:this._hasOwnPendingAsyncValidator||this._anyControlsHaveStatus(to)?to:this._anyControlsHaveStatus(nl)?nl:xi}_anyControlsHaveStatus(n){return this._anyControls(t=>t.status===n)}_anyControlsDirty(){return this._anyControls(n=>n.dirty)}_anyControlsTouched(){return this._anyControls(n=>n.touched)}_updatePristine(n,t){let r=!this._anyControlsDirty(),o=this.pristine!==r;this.pristine=r,n.onlySelf||this._parent?._updatePristine(n,t),o&&this._events.next(new Si(this.pristine,t))}_updateTouched(n={},t){this.touched=this._anyControlsTouched(),this._events.next(new Ti(this.touched,t)),n.onlySelf||this._parent?._updateTouched(n,t)}_onDisabledChange=[];_registerOnCollectionChange(n){this._onCollectionChange=n}_setUpdateStrategy(n){hl(n)&&n.updateOn!=null&&(this._updateOn=n.updateOn)}_parentMarkedDirty(n){return!n&&!!this._parent?.dirty&&!this._parent._anyControlsDirty()}_find(n){return null}_assignValidators(n){this._rawValidators=Array.isArray(n)?n.slice():n,this._composedValidatorFn=bI(this._rawValidators)}_assignAsyncValidators(n){this._rawAsyncValidators=Array.isArray(n)?n.slice():n,this._composedAsyncValidatorFn=_I(this._rawAsyncValidators)}},ul=class extends dl{constructor(n,t,r){super($y(t),zy(r,t)),this.controls=n,this._initObservables(),this._setUpdateStrategy(t),this._setUpControls(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator})}controls;registerControl(n,t){return this.controls[n]?this.controls[n]:(this.controls[n]=t,t.setParent(this),t._registerOnCollectionChange(this._onCollectionChange),t)}addControl(n,t,r={}){this.registerControl(n,t),this.updateValueAndValidity({emitEvent:r.emitEvent}),this._onCollectionChange()}removeControl(n,t={}){this.controls[n]&&this.controls[n]._registerOnCollectionChange(()=>{}),delete this.controls[n],this.updateValueAndValidity({emitEvent:t.emitEvent}),this._onCollectionChange()}setControl(n,t,r={}){this.controls[n]&&this.controls[n]._registerOnCollectionChange(()=>{}),delete this.controls[n],t&&this.registerControl(n,t),this.updateValueAndValidity({emitEvent:r.emitEvent}),this._onCollectionChange()}contains(n){return this.controls.hasOwnProperty(n)&&this.controls[n].enabled}setValue(n,t={}){EI(this,!0,n),Object.keys(n).forEach(r=>{DI(this,!0,r),this.controls[r].setValue(n[r],{onlySelf:!0,emitEvent:t.emitEvent})}),this.updateValueAndValidity(t)}patchValue(n,t={}){n!=null&&(Object.keys(n).forEach(r=>{let o=this.controls[r];o&&o.patchValue(n[r],{onlySelf:!0,emitEvent:t.emitEvent})}),this.updateValueAndValidity(t))}reset(n={},t={}){this._forEachChild((r,o)=>{r.reset(n?n[o]:null,Z(E({},t),{onlySelf:!0}))}),this._updatePristine(t,this),this._updateTouched(t,this),this.updateValueAndValidity(t),t?.emitEvent!==!1&&this._events.next(new cl(this))}getRawValue(){return this._reduceChildren({},(n,t,r)=>(n[r]=t.getRawValue(),n))}_syncPendingControls(){let n=this._reduceChildren(!1,(t,r)=>r._syncPendingControls()?!0:t);return n&&this.updateValueAndValidity({onlySelf:!0}),n}_forEachChild(n){Object.keys(this.controls).forEach(t=>{let r=this.controls[t];r&&n(r,t)})}_setUpControls(){this._forEachChild(n=>{n.setParent(this),n._registerOnCollectionChange(this._onCollectionChange)})}_updateValue(){this.value=this._reduceValue()}_anyControls(n){for(let[t,r]of Object.entries(this.controls))if(this.contains(t)&&n(r))return!0;return!1}_reduceValue(){let n={};return this._reduceChildren(n,(t,r,o)=>((r.enabled||this.disabled)&&(t[o]=r.value),t))}_reduceChildren(n,t){let r=n;return this._forEachChild((o,i)=>{r=t(r,o,i)}),r}_allControlsDisabled(){for(let n of Object.keys(this.controls))if(this.controls[n].enabled)return!1;return Object.keys(this.controls).length>0||this.disabled}_find(n){return this.controls.hasOwnProperty(n)?this.controls[n]:null}};var Gy=new g("",{factory:()=>Wy}),Wy="always";function Ef(e,n,t=Wy){Mf(e,n),n.valueAccessor.writeValue(e.value),(e.disabled||t==="always")&&n.valueAccessor.setDisabledState?.(e.disabled),wI(e,n),II(e,n),xI(e,n),CI(e,n)}function My(e,n,t=!0){let r=()=>{};n?.valueAccessor?.registerOnChange(r),n?.valueAccessor?.registerOnTouched(r),pl(e,n),e&&(n._invokeOnDestroyCallbacks(),e._registerOnCollectionChange(()=>{}))}function fl(e,n){e.forEach(t=>{t.registerOnValidatorChange&&t.registerOnValidatorChange(n)})}function CI(e,n){if(n.valueAccessor.setDisabledState){let t=r=>{n.valueAccessor.setDisabledState(r)};e.registerOnDisabledChange(t),n._registerOnDestroy(()=>{e._unregisterOnDisabledChange(t)})}}function Mf(e,n){let t=Hy(e);n.validator!==null?e.setValidators(wy(t,n.validator)):typeof t=="function"&&e.setValidators([t]);let r=Uy(e);n.asyncValidator!==null?e.setAsyncValidators(wy(r,n.asyncValidator)):typeof r=="function"&&e.setAsyncValidators([r]);let o=()=>e.updateValueAndValidity();fl(n._rawValidators,o),fl(n._rawAsyncValidators,o)}function pl(e,n){let t=!1;if(e!==null){if(n.validator!==null){let o=Hy(e);if(Array.isArray(o)&&o.length>0){let i=o.filter(s=>s!==n.validator);i.length!==o.length&&(t=!0,e.setValidators(i))}}if(n.asyncValidator!==null){let o=Uy(e);if(Array.isArray(o)&&o.length>0){let i=o.filter(s=>s!==n.asyncValidator);i.length!==o.length&&(t=!0,e.setAsyncValidators(i))}}}let r=()=>{};return fl(n._rawValidators,r),fl(n._rawAsyncValidators,r),t}function wI(e,n){n.valueAccessor.registerOnChange(t=>{e._pendingValue=t,e._pendingChange=!0,e._pendingDirty=!0,e.updateOn==="change"&&qy(e,n)})}function xI(e,n){n.valueAccessor.registerOnTouched(()=>{e._pendingTouched=!0,e.updateOn==="blur"&&e._pendingChange&&qy(e,n),e.updateOn!=="submit"&&e.markAsTouched()})}function qy(e,n){e._pendingDirty&&e.markAsDirty(),e.setValue(e._pendingValue,{emitModelToViewChange:!1}),n.viewToModelUpdate(e._pendingValue),e._pendingChange=!1}function II(e,n){let t=(r,o)=>{n.valueAccessor.writeValue(r),o&&n.viewToModelUpdate(r)};e.registerOnChange(t),n._registerOnDestroy(()=>{e._unregisterOnChange(t)})}function Yy(e,n){e==null,Mf(e,n)}function MI(e,n){return pl(e,n)}function Zy(e,n){e._syncPendingControls(),n.forEach(t=>{let r=t.control;r.updateOn==="submit"&&r._pendingChange&&(t.viewToModelUpdate(r._pendingValue),r._pendingChange=!1)})}function SI(e,n){let t=e.indexOf(n);t>-1&&e.splice(t,1)}var TI={provide:ro,useExisting:Pt(()=>Sf)},Mi=Promise.resolve(),Sf=(()=>{class e extends ro{callSetDisabledState;get submitted(){return yt(this.submittedReactive)}_submitted=Re(()=>this.submittedReactive());submittedReactive=H(!1);_directives=new Set;form;ngSubmit=new ae;options;constructor(t,r,o){super(),this.callSetDisabledState=o,this.form=new ul({},xf(t),If(r))}ngAfterViewInit(){this._setUpdateStrategy()}get formDirective(){return this}get control(){return this.form}get path(){return[]}get controls(){return this.form.controls}addControl(t){Mi.then(()=>{let r=this._findContainer(t.path);t.control=r.registerControl(t.name,t.control),Ef(t.control,t,this.callSetDisabledState),t.control.updateValueAndValidity({emitEvent:!1}),this._directives.add(t)})}getControl(t){return this.form.get(t.path)}removeControl(t){Mi.then(()=>{this._findContainer(t.path)?.removeControl(t.name),this._directives.delete(t)})}addFormGroup(t){Mi.then(()=>{let r=this._findContainer(t.path),o=new ul({});Yy(o,t),r.registerControl(t.name,o),o.updateValueAndValidity({emitEvent:!1})})}removeFormGroup(t){Mi.then(()=>{this._findContainer(t.path)?.removeControl?.(t.name)})}getFormGroup(t){return this.form.get(t.path)}updateModel(t,r){Mi.then(()=>{this.form.get(t.path).setValue(r)})}setValue(t){this.control.setValue(t)}onSubmit(t){return this.submittedReactive.set(!0),Zy(this.form,this._directives),this.ngSubmit.emit(t),this.form._events.next(new ll(this.control)),t?.target?.method==="dialog"}onReset(){this.resetForm()}resetForm(t=void 0){this.form.reset(t),this.submittedReactive.set(!1)}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.form._updateOn=this.options.updateOn)}_findContainer(t){return t.pop(),t.length?this.form.get(t):this.form}static \u0275fac=function(r){return new(r||e)(fe(Ny,10),fe(ky,10),fe(Gy,8))};static \u0275dir=W({type:e,selectors:[["form",3,"ngNoForm","",3,"formGroup","",3,"formArray",""],["ng-form"],["","ngForm",""]],hostBindings:function(r,o){r&1&&ne("submit",function(s){return o.onSubmit(s)})("reset",function(){return o.onReset()})},inputs:{options:[0,"ngFormOptions","options"]},outputs:{ngSubmit:"ngSubmit"},exportAs:["ngForm"],standalone:!1,features:[vt([TI]),Le]})}return e})();function Sy(e,n){let t=e.indexOf(n);t>-1&&e.splice(t,1)}function Ty(e){return typeof e=="object"&&e!==null&&Object.keys(e).length===2&&"value"in e&&"disabled"in e}var AI=class extends dl{defaultValue=null;_onChange=[];_pendingValue;_pendingChange=!1;constructor(n=null,t,r){super($y(t),zy(r,t)),this._applyFormState(n),this._setUpdateStrategy(t),this._initObservables(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator}),hl(t)&&(t.nonNullable||t.initialValueIsDefault)&&(Ty(n)?this.defaultValue=n.value:this.defaultValue=n)}setValue(n,t={}){this.value=this._pendingValue=n,this._onChange.length&&t.emitModelToViewChange!==!1&&this._onChange.forEach(r=>r(this.value,t.emitViewToModelChange!==!1)),this.updateValueAndValidity(t)}patchValue(n,t={}){this.setValue(n,t)}reset(n=this.defaultValue,t={}){this._applyFormState(n),this.markAsPristine(t),this.markAsUntouched(t),this.setValue(this.value,t),t.overwriteDefaultValue&&(this.defaultValue=this.value),this._pendingChange=!1,t?.emitEvent!==!1&&this._events.next(new cl(this))}_updateValue(){}_anyControls(n){return!1}_allControlsDisabled(){return this.disabled}registerOnChange(n){this._onChange.push(n)}_unregisterOnChange(n){Sy(this._onChange,n)}registerOnDisabledChange(n){this._onDisabledChange.push(n)}_unregisterOnDisabledChange(n){Sy(this._onDisabledChange,n)}_forEachChild(n){}_syncPendingControls(){return this.updateOn==="submit"&&(this._pendingDirty&&this.markAsDirty(),this._pendingTouched&&this.markAsTouched(),this._pendingChange)?(this.setValue(this._pendingValue,{onlySelf:!0,emitModelToViewChange:!1}),!0):!1}_applyFormState(n){Ty(n)?(this.value=this._pendingValue=n.value,n.disabled?this.disable({onlySelf:!0,emitEvent:!1}):this.enable({onlySelf:!0,emitEvent:!1})):this.value=this._pendingValue=n}};var NI=e=>e instanceof AI;var kI=(()=>{class e extends ro{callSetDisabledState;get submitted(){return yt(this._submittedReactive)}set submitted(t){this._submittedReactive.set(t)}_submitted=Re(()=>this._submittedReactive());_submittedReactive=H(!1);_oldForm;_onCollectionChange=()=>this._updateDomValue();directives=[];constructor(t,r,o){super(),this.callSetDisabledState=o,this._setValidators(t),this._setAsyncValidators(r)}ngOnChanges(t){this.onChanges(t)}ngOnDestroy(){this.onDestroy()}onChanges(t){this._checkFormPresent(),t.hasOwnProperty("form")&&(this._updateValidators(),this._updateDomValue(),this._updateRegistrations(),this._oldForm=this.form)}onDestroy(){this.form&&(pl(this.form,this),this.form._onCollectionChange===this._onCollectionChange&&this.form._registerOnCollectionChange(()=>{}))}get formDirective(){return this}get path(){return[]}addControl(t){let r=this.form.get(t.path);return Ef(r,t,this.callSetDisabledState),r.updateValueAndValidity({emitEvent:!1}),this.directives.push(t),r}getControl(t){return this.form.get(t.path)}removeControl(t){My(t.control||null,t,!1),SI(this.directives,t)}addFormGroup(t){this._setUpFormContainer(t)}removeFormGroup(t){this._cleanUpFormContainer(t)}getFormGroup(t){return this.form.get(t.path)}getFormArray(t){return this.form.get(t.path)}addFormArray(t){this._setUpFormContainer(t)}removeFormArray(t){this._cleanUpFormContainer(t)}updateModel(t,r){this.form.get(t.path).setValue(r)}onReset(){this.resetForm()}resetForm(t=void 0,r={}){this.form.reset(t,r),this._submittedReactive.set(!1)}onSubmit(t){return this.submitted=!0,Zy(this.form,this.directives),this.ngSubmit.emit(t),this.form._events.next(new ll(this.control)),t?.target?.method==="dialog"}_updateDomValue(){this.directives.forEach(t=>{let r=t.control,o=this.form.get(t.path);r!==o&&(My(r||null,t),NI(o)&&(Ef(o,t,this.callSetDisabledState),t.control=o))}),this.form._updateTreeValidity({emitEvent:!1})}_setUpFormContainer(t){let r=this.form.get(t.path);Yy(r,t),r.updateValueAndValidity({emitEvent:!1})}_cleanUpFormContainer(t){let r=this.form?.get(t.path);r&&MI(r,t)&&r.updateValueAndValidity({emitEvent:!1})}_updateRegistrations(){this.form._registerOnCollectionChange(this._onCollectionChange),this._oldForm?._registerOnCollectionChange(()=>{})}_updateValidators(){Mf(this.form,this),this._oldForm&&pl(this._oldForm,this)}_checkFormPresent(){this.form}static \u0275fac=function(r){return new(r||e)(fe(Ny,10),fe(ky,10),fe(Gy,8))};static \u0275dir=W({type:e,features:[Le,zt]})}return e})();var RI={provide:ro,useExisting:Pt(()=>Tf)},Tf=(()=>{class e extends kI{form=null;ngSubmit=new ae;get control(){return this.form}static \u0275fac=(()=>{let t;return function(o){return(t||(t=tr(e)))(o||e)}})();static \u0275dir=W({type:e,selectors:[["","formGroup",""]],hostBindings:function(r,o){r&1&&ne("submit",function(s){return o.onSubmit(s)})("reset",function(){return o.onReset()})},inputs:{form:[0,"formGroup","form"]},outputs:{ngSubmit:"ngSubmit"},exportAs:["ngForm"],standalone:!1,features:[vt([RI]),Le]})}return e})();var Qy=new g("MAT_INPUT_VALUE_ACCESSOR");var Ky=(()=>{class e{isErrorState(t,r){return!!(t&&t.invalid&&(t.touched||r&&r.submitted))}static \u0275fac=function(r){return new(r||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var ml=class{_defaultMatcher;ngControl;_parentFormGroup;_parentForm;_stateChanges;errorState=!1;matcher;constructor(n,t,r,o,i){this._defaultMatcher=n,this.ngControl=t,this._parentFormGroup=r,this._parentForm=o,this._stateChanges=i}updateErrorState(){let n=this.errorState,t=this._parentFormGroup||this._parentForm,r=this.matcher||this._defaultMatcher,o=this.ngControl?this.ngControl.control:null,i=r?.isErrorState(o,t)??!1;i!==n&&(this.errorState=i,this._stateChanges.next())}};var OI=["button","checkbox","file","hidden","image","radio","range","reset","submit"],FI=new g("MAT_INPUT_CONFIG"),Xy=(()=>{class e{_elementRef=f(Y);_platform=f(Ee);ngControl=f(sl,{optional:!0,self:!0});_autofillMonitor=f(Ey);_ngZone=f(N);_formField=f(_f,{optional:!0});_renderer=f(et);_uid=f(Ve).getId("mat-input-");_previousNativeValue;_inputValueAccessor;_signalBasedValueAccessor;_previousPlaceholder=null;_errorStateTracker;_config=f(FI,{optional:!0});_cleanupIosKeyup;_cleanupWebkitWheel;_isServer=!1;_isNativeSelect=!1;_isTextarea=!1;_isInFormField=!1;focused=!1;stateChanges=new A;controlType="mat-input";autofilled=!1;get disabled(){return this._disabled}set disabled(t){this._disabled=Jr(t),this.focused&&(this.focused=!1,this.stateChanges.next())}_disabled=!1;get id(){return this._id}set id(t){this._id=t||this._uid}_id;placeholder;name;get required(){return this._required??this.ngControl?.control?.hasValidator(rl.required)??!1}set required(t){this._required=Jr(t)}_required;get type(){return this._type}set type(t){this._type=t||"text",this._validateType(),!this._isTextarea&&gf().has(this._type)&&(this._elementRef.nativeElement.type=this._type)}_type="text";get errorStateMatcher(){return this._errorStateTracker.matcher}set errorStateMatcher(t){this._errorStateTracker.matcher=t}userAriaDescribedBy;get value(){return this._signalBasedValueAccessor?this._signalBasedValueAccessor.value():this._inputValueAccessor.value}set value(t){t!==this.value&&(this._signalBasedValueAccessor?this._signalBasedValueAccessor.value.set(t):this._inputValueAccessor.value=t,this.stateChanges.next())}get readonly(){return this._readonly}set readonly(t){this._readonly=Jr(t)}_readonly=!1;disabledInteractive;get errorState(){return this._errorStateTracker.errorState}set errorState(t){this._errorStateTracker.errorState=t}_neverEmptyInputTypes=["date","datetime","datetime-local","month","time","week"].filter(t=>gf().has(t));constructor(){let t=f(Sf,{optional:!0}),r=f(Tf,{optional:!0}),o=f(Ky),i=f(Qy,{optional:!0,self:!0}),s=this._elementRef.nativeElement,a=s.nodeName.toLowerCase();i?Ta(i.value)?this._signalBasedValueAccessor=i:this._inputValueAccessor=i:this._inputValueAccessor=s,this._previousNativeValue=this.value,this.id=this.id,this._platform.IOS&&this._ngZone.runOutsideAngular(()=>{this._cleanupIosKeyup=this._renderer.listen(s,"keyup",this._iOSKeyupListener)}),this._errorStateTracker=new ml(o,this.ngControl,r,t,this.stateChanges),this._isServer=!this._platform.isBrowser,this._isNativeSelect=a==="select",this._isTextarea=a==="textarea",this._isInFormField=!!this._formField,this.disabledInteractive=this._config?.disabledInteractive||!1,this._isNativeSelect&&(this.controlType=s.multiple?"mat-native-select-multiple":"mat-native-select"),this._signalBasedValueAccessor&&Qn(()=>{this._signalBasedValueAccessor.value(),this.stateChanges.next()})}ngAfterViewInit(){this._platform.isBrowser&&this._autofillMonitor.monitor(this._elementRef.nativeElement).subscribe(t=>{this.autofilled=t.isAutofilled,this.stateChanges.next()})}ngOnChanges(){this.stateChanges.next()}ngOnDestroy(){this.stateChanges.complete(),this._platform.isBrowser&&this._autofillMonitor.stopMonitoring(this._elementRef.nativeElement),this._cleanupIosKeyup?.(),this._cleanupWebkitWheel?.()}ngDoCheck(){this.ngControl&&(this.updateErrorState(),this.ngControl.disabled!==null&&this.ngControl.disabled!==this.disabled&&(this.disabled=this.ngControl.disabled,this.stateChanges.next())),this._dirtyCheckNativeValue(),this._dirtyCheckPlaceholder()}focus(t){this._elementRef.nativeElement.focus(t)}updateErrorState(){this._errorStateTracker.updateErrorState()}_focusChanged(t){if(t!==this.focused){if(!this._isNativeSelect&&t&&this.disabled&&this.disabledInteractive){let r=this._elementRef.nativeElement;r.type==="number"?(r.type="text",r.setSelectionRange(0,0),r.type="number"):r.setSelectionRange(0,0)}this.focused=t,this.stateChanges.next()}}_onInput(){}_dirtyCheckNativeValue(){let t=this._elementRef.nativeElement.value;this._previousNativeValue!==t&&(this._previousNativeValue=t,this.stateChanges.next())}_dirtyCheckPlaceholder(){let t=this._getPlaceholder();if(t!==this._previousPlaceholder){let r=this._elementRef.nativeElement;this._previousPlaceholder=t,t?r.setAttribute("placeholder",t):r.removeAttribute("placeholder")}}_getPlaceholder(){return this.placeholder||null}_validateType(){OI.indexOf(this._type)>-1}_isNeverEmpty(){return this._neverEmptyInputTypes.indexOf(this._type)>-1}_isBadInput(){let t=this._elementRef.nativeElement.validity;return t&&t.badInput}get empty(){return!this._isNeverEmpty()&&!this._elementRef.nativeElement.value&&!this._isBadInput()&&!this.autofilled}get shouldLabelFloat(){if(this._isNativeSelect){let t=this._elementRef.nativeElement,r=t.options[0];return this.focused||t.multiple||!this.empty||!!(t.selectedIndex>-1&&r&&r.label)}else return this.focused&&!this.disabled||!this.empty}get describedByIds(){return this._elementRef.nativeElement.getAttribute("aria-describedby")?.split(" ")||[]}setDescribedByIds(t){let r=this._elementRef.nativeElement;t.length?r.setAttribute("aria-describedby",t.join(" ")):r.removeAttribute("aria-describedby")}onContainerClick(){this.focused||this.focus()}_isInlineSelect(){let t=this._elementRef.nativeElement;return this._isNativeSelect&&(t.multiple||t.size>1)}_iOSKeyupListener=t=>{let r=t.target;!r.value&&r.selectionStart===0&&r.selectionEnd===0&&(r.setSelectionRange(1,1),r.setSelectionRange(0,0))};_getReadonlyAttribute(){return this._isNativeSelect?null:this.readonly||this.disabled&&this.disabledInteractive?"true":null}static \u0275fac=function(r){return new(r||e)};static \u0275dir=W({type:e,selectors:[["input","matInput",""],["textarea","matInput",""],["select","matNativeControl",""],["input","matNativeControl",""],["textarea","matNativeControl",""]],hostAttrs:[1,"mat-mdc-input-element"],hostVars:21,hostBindings:function(r,o){r&1&&ne("focus",function(){return o._focusChanged(!0)})("blur",function(){return o._focusChanged(!1)})("input",function(){return o._onInput()}),r&2&&(zr("id",o.id)("disabled",o.disabled&&!o.disabledInteractive)("required",o.required),le("name",o.name||null)("readonly",o._getReadonlyAttribute())("aria-disabled",o.disabled&&o.disabledInteractive?"true":null)("aria-invalid",o.empty&&o.required?null:o.errorState)("aria-required",o.required)("id",o.id),U("mat-input-server",o._isServer)("mat-mdc-form-field-textarea-control",o._isInFormField&&o._isTextarea)("mat-mdc-form-field-input-control",o._isInFormField)("mat-mdc-input-disabled-interactive",o.disabledInteractive)("mdc-text-field__input",o._isInFormField)("mat-mdc-native-select-inline",o._isInlineSelect()))},inputs:{disabled:"disabled",id:"id",placeholder:"placeholder",name:"name",required:"required",type:"type",errorStateMatcher:"errorStateMatcher",userAriaDescribedBy:[0,"aria-describedby","userAriaDescribedBy"],value:"value",readonly:"readonly",disabledInteractive:[2,"disabledInteractive","disabledInteractive",oe]},exportAs:["matInput"],features:[vt([{provide:bf,useExisting:e}]),zt]})}return e})(),Jy=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275mod=te({type:e});static \u0275inj=J({imports:[wi,wi,Cy,nt]})}return e})();var rt=(function(e){return e[e.FADING_IN=0]="FADING_IN",e[e.VISIBLE=1]="VISIBLE",e[e.FADING_OUT=2]="FADING_OUT",e[e.HIDDEN=3]="HIDDEN",e})(rt||{}),Af=class{_renderer;element;config;_animationForciblyDisabledThroughCss;state=rt.HIDDEN;constructor(n,t,r,o=!1){this._renderer=n,this.element=t,this.config=r,this._animationForciblyDisabledThroughCss=o}fadeOut(){this._renderer.fadeOutRipple(this)}},eb=Xr({passive:!0,capture:!0}),Nf=class{_events=new Map;addHandler(n,t,r,o){let i=this._events.get(t);if(i){let s=i.get(r);s?s.add(o):i.set(r,new Set([o]))}else this._events.set(t,new Map([[r,new Set([o])]])),n.runOutsideAngular(()=>{document.addEventListener(t,this._delegateEventHandler,eb)})}removeHandler(n,t,r){let o=this._events.get(n);if(!o)return;let i=o.get(t);i&&(i.delete(r),i.size===0&&o.delete(t),o.size===0&&(this._events.delete(n),document.removeEventListener(n,this._delegateEventHandler,eb)))}_delegateEventHandler=n=>{let t=$e(n);t&&this._events.get(n.type)?.forEach((r,o)=>{(o===t||o.contains(t))&&r.forEach(i=>i.handleEvent(n))})}},Ai={enterDuration:225,exitDuration:150},LI=800,tb=Xr({passive:!0,capture:!0}),nb=["mousedown","touchstart"],rb=["mouseup","mouseleave","touchend","touchcancel"],VI=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275cmp=$({type:e,selectors:[["ng-component"]],hostAttrs:["mat-ripple-style-loader",""],decls:0,vars:0,template:function(r,o){},styles:[`.mat-ripple {
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
`],encapsulation:2,changeDetection:0})}return e})(),Ni=class e{_target;_ngZone;_platform;_containerElement;_triggerElement=null;_isPointerDown=!1;_activeRipples=new Map;_mostRecentTransientRipple=null;_lastTouchStartEvent;_pointerUpEventsRegistered=!1;_containerRect=null;static _eventManager=new Nf;constructor(n,t,r,o,i){this._target=n,this._ngZone=t,this._platform=o,o.isBrowser&&(this._containerElement=bt(r)),i&&i.get(tt).load(VI)}fadeInRipple(n,t,r={}){let o=this._containerRect=this._containerRect||this._containerElement.getBoundingClientRect(),i=E(E({},Ai),r.animation);r.centered&&(n=o.left+o.width/2,t=o.top+o.height/2);let s=r.radius||jI(n,t,o),a=n-o.left,l=t-o.top,c=i.enterDuration,d=document.createElement("div");d.classList.add("mat-ripple-element"),d.style.left=`${a-s}px`,d.style.top=`${l-s}px`,d.style.height=`${s*2}px`,d.style.width=`${s*2}px`,r.color!=null&&(d.style.backgroundColor=r.color),d.style.transitionDuration=`${c}ms`,this._containerElement.appendChild(d);let u=window.getComputedStyle(d),h=u.transitionProperty,p=u.transitionDuration,m=h==="none"||p==="0s"||p==="0s, 0s"||o.width===0&&o.height===0,D=new Af(this,d,r,m);d.style.transform="scale3d(1, 1, 1)",D.state=rt.FADING_IN,r.persistent||(this._mostRecentTransientRipple=D);let C=null;return!m&&(c||i.exitDuration)&&this._ngZone.runOutsideAngular(()=>{let w=()=>{C&&(C.fallbackTimer=null),clearTimeout(ze),this._finishRippleTransition(D)},ie=()=>this._destroyRipple(D),ze=setTimeout(ie,c+100);d.addEventListener("transitionend",w),d.addEventListener("transitioncancel",ie),C={onTransitionEnd:w,onTransitionCancel:ie,fallbackTimer:ze}}),this._activeRipples.set(D,C),(m||!c)&&this._finishRippleTransition(D),D}fadeOutRipple(n){if(n.state===rt.FADING_OUT||n.state===rt.HIDDEN)return;let t=n.element,r=E(E({},Ai),n.config.animation);t.style.transitionDuration=`${r.exitDuration}ms`,t.style.opacity="0",n.state=rt.FADING_OUT,(n._animationForciblyDisabledThroughCss||!r.exitDuration)&&this._finishRippleTransition(n)}fadeOutAll(){this._getActiveRipples().forEach(n=>n.fadeOut())}fadeOutAllNonPersistent(){this._getActiveRipples().forEach(n=>{n.config.persistent||n.fadeOut()})}setupTriggerEvents(n){let t=bt(n);!this._platform.isBrowser||!t||t===this._triggerElement||(this._removeTriggerEvents(),this._triggerElement=t,nb.forEach(r=>{e._eventManager.addHandler(this._ngZone,r,t,this)}))}handleEvent(n){n.type==="mousedown"?this._onMousedown(n):n.type==="touchstart"?this._onTouchStart(n):this._onPointerUp(),this._pointerUpEventsRegistered||(this._ngZone.runOutsideAngular(()=>{rb.forEach(t=>{this._triggerElement.addEventListener(t,this,tb)})}),this._pointerUpEventsRegistered=!0)}_finishRippleTransition(n){n.state===rt.FADING_IN?this._startFadeOutTransition(n):n.state===rt.FADING_OUT&&this._destroyRipple(n)}_startFadeOutTransition(n){let t=n===this._mostRecentTransientRipple,{persistent:r}=n.config;n.state=rt.VISIBLE,!r&&(!t||!this._isPointerDown)&&n.fadeOut()}_destroyRipple(n){let t=this._activeRipples.get(n)??null;this._activeRipples.delete(n),this._activeRipples.size||(this._containerRect=null),n===this._mostRecentTransientRipple&&(this._mostRecentTransientRipple=null),n.state=rt.HIDDEN,t!==null&&(n.element.removeEventListener("transitionend",t.onTransitionEnd),n.element.removeEventListener("transitioncancel",t.onTransitionCancel),t.fallbackTimer!==null&&clearTimeout(t.fallbackTimer)),n.element.remove()}_onMousedown(n){let t=vi(n),r=this._lastTouchStartEvent&&Date.now()<this._lastTouchStartEvent+LI;!this._target.rippleDisabled&&!t&&!r&&(this._isPointerDown=!0,this.fadeInRipple(n.clientX,n.clientY,this._target.rippleConfig))}_onTouchStart(n){if(!this._target.rippleDisabled&&!yi(n)){this._lastTouchStartEvent=Date.now(),this._isPointerDown=!0;let t=n.changedTouches;if(t)for(let r=0;r<t.length;r++)this.fadeInRipple(t[r].clientX,t[r].clientY,this._target.rippleConfig)}}_onPointerUp(){this._isPointerDown&&(this._isPointerDown=!1,this._getActiveRipples().forEach(n=>{let t=n.state===rt.VISIBLE||n.config.terminateOnPointerUp&&n.state===rt.FADING_IN;!n.config.persistent&&t&&n.fadeOut()}))}_getActiveRipples(){return Array.from(this._activeRipples.keys())}_removeTriggerEvents(){let n=this._triggerElement;n&&(nb.forEach(t=>e._eventManager.removeHandler(t,n,this)),this._pointerUpEventsRegistered&&(rb.forEach(t=>n.removeEventListener(t,this,tb)),this._pointerUpEventsRegistered=!1))}};function jI(e,n,t){let r=Math.max(Math.abs(e-t.left),Math.abs(e-t.right)),o=Math.max(Math.abs(n-t.top),Math.abs(n-t.bottom));return Math.sqrt(r*r+o*o)}var kf=new g("mat-ripple-global-options"),ob=(()=>{class e{_elementRef=f(Y);_animationsDisabled=je();color;unbounded=!1;centered=!1;radius=0;animation;get disabled(){return this._disabled}set disabled(t){t&&this.fadeOutAllNonPersistent(),this._disabled=t,this._setupTriggerEventsIfEnabled()}_disabled=!1;get trigger(){return this._trigger||this._elementRef.nativeElement}set trigger(t){this._trigger=t,this._setupTriggerEventsIfEnabled()}_trigger;_rippleRenderer;_globalOptions;_isInitialized=!1;constructor(){let t=f(N),r=f(Ee),o=f(kf,{optional:!0}),i=f(K);this._globalOptions=o||{},this._rippleRenderer=new Ni(this,t,this._elementRef,r,i)}ngOnInit(){this._isInitialized=!0,this._setupTriggerEventsIfEnabled()}ngOnDestroy(){this._rippleRenderer._removeTriggerEvents()}fadeOutAll(){this._rippleRenderer.fadeOutAll()}fadeOutAllNonPersistent(){this._rippleRenderer.fadeOutAllNonPersistent()}get rippleConfig(){return{centered:this.centered,radius:this.radius,color:this.color,animation:E(E(E({},this._globalOptions.animation),this._animationsDisabled?{enterDuration:0,exitDuration:0}:{}),this.animation),terminateOnPointerUp:this._globalOptions.terminateOnPointerUp}}get rippleDisabled(){return this.disabled||!!this._globalOptions.disabled}_setupTriggerEventsIfEnabled(){!this.disabled&&this._isInitialized&&this._rippleRenderer.setupTriggerEvents(this.trigger)}launch(t,r=0,o){return typeof t=="number"?this._rippleRenderer.fadeInRipple(t,r,E(E({},this.rippleConfig),o)):this._rippleRenderer.fadeInRipple(0,0,E(E({},this.rippleConfig),t))}static \u0275fac=function(r){return new(r||e)};static \u0275dir=W({type:e,selectors:[["","mat-ripple",""],["","matRipple",""]],hostAttrs:[1,"mat-ripple"],hostVars:2,hostBindings:function(r,o){r&2&&U("mat-ripple-unbounded",o.unbounded)},inputs:{color:[0,"matRippleColor","color"],unbounded:[0,"matRippleUnbounded","unbounded"],centered:[0,"matRippleCentered","centered"],radius:[0,"matRippleRadius","radius"],animation:[0,"matRippleAnimation","animation"],disabled:[0,"matRippleDisabled","disabled"],trigger:[0,"matRippleTrigger","trigger"]},exportAs:["matRipple"]})}return e})();var BI={capture:!0},HI=["focus","mousedown","mouseenter","touchstart"],Rf="mat-ripple-loader-uninitialized",Of="mat-ripple-loader-class-name",ib="mat-ripple-loader-centered",gl="mat-ripple-loader-disabled",sb=(()=>{class e{_document=f(F);_animationsDisabled=je();_globalRippleOptions=f(kf,{optional:!0});_platform=f(Ee);_ngZone=f(N);_injector=f(K);_eventCleanups;_hosts=new Map;constructor(){let t=f(Te).createRenderer(null,null);this._eventCleanups=this._ngZone.runOutsideAngular(()=>HI.map(r=>t.listen(this._document,r,this._onInteraction,BI)))}ngOnDestroy(){let t=this._hosts.keys();for(let r of t)this.destroyRipple(r);this._eventCleanups.forEach(r=>r())}configureRipple(t,r){t.setAttribute(Rf,this._globalRippleOptions?.namespace??""),(r.className||!t.hasAttribute(Of))&&t.setAttribute(Of,r.className||""),r.centered&&t.setAttribute(ib,""),r.disabled&&t.setAttribute(gl,"")}setDisabled(t,r){let o=this._hosts.get(t);o?(o.target.rippleDisabled=r,!r&&!o.hasSetUpEvents&&(o.hasSetUpEvents=!0,o.renderer.setupTriggerEvents(t))):r?t.setAttribute(gl,""):t.removeAttribute(gl)}_onInteraction=t=>{let r=$e(t);if(r instanceof HTMLElement){let o=r.closest(`[${Rf}="${this._globalRippleOptions?.namespace??""}"]`);o&&this._createRipple(o)}};_createRipple(t){if(!this._document||this._hosts.has(t))return;t.querySelector(".mat-ripple")?.remove();let r=this._document.createElement("span");r.classList.add("mat-ripple",t.getAttribute(Of)),t.append(r);let o=this._globalRippleOptions,i=this._animationsDisabled?0:o?.animation?.enterDuration??Ai.enterDuration,s=this._animationsDisabled?0:o?.animation?.exitDuration??Ai.exitDuration,a={rippleDisabled:this._animationsDisabled||o?.disabled||t.hasAttribute(gl),rippleConfig:{centered:t.hasAttribute(ib),terminateOnPointerUp:o?.terminateOnPointerUp,animation:{enterDuration:i,exitDuration:s}}},l=new Ni(a,this._ngZone,r,this._platform,this._injector),c=!a.rippleDisabled;c&&l.setupTriggerEvents(t),this._hosts.set(t,{target:a,renderer:l,hasSetUpEvents:c}),t.removeAttribute(Rf)}destroyRipple(t){let r=this._hosts.get(t);r&&(r.renderer._removeTriggerEvents(),this._hosts.delete(t))}static \u0275fac=function(r){return new(r||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var vl=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275cmp=$({type:e,selectors:[["structural-styles"]],decls:0,vars:0,template:function(r,o){},styles:[`.mat-focus-indicator {
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
`],encapsulation:2,changeDetection:0})}return e})();var UI=["mat-icon-button",""],$I=["*"],zI=new g("MAT_BUTTON_CONFIG");function ab(e){return e==null?void 0:gv(e)}var yl=(()=>{class e{_elementRef=f(Y);_ngZone=f(N);_animationsDisabled=je();_config=f(zI,{optional:!0});_focusMonitor=f(Di);_cleanupClick;_renderer=f(et);_rippleLoader=f(sb);_isAnchor;_isFab=!1;color;get disableRipple(){return this._disableRipple}set disableRipple(t){this._disableRipple=t,this._updateRippleDisabled()}_disableRipple=!1;get disabled(){return this._disabled}set disabled(t){this._disabled=t,this._updateRippleDisabled()}_disabled=!1;ariaDisabled;disabledInteractive;tabIndex;set _tabindex(t){this.tabIndex=t}constructor(){f(tt).load(vl);let t=this._elementRef.nativeElement;this._isAnchor=t.tagName==="A",this.disabledInteractive=this._config?.disabledInteractive??!1,this.color=this._config?.color??null,this._rippleLoader?.configureRipple(t,{className:"mat-mdc-button-ripple"})}ngAfterViewInit(){this._focusMonitor.monitor(this._elementRef,!0),this._isAnchor&&this._setupAsAnchor()}ngOnDestroy(){this._cleanupClick?.(),this._focusMonitor.stopMonitoring(this._elementRef),this._rippleLoader?.destroyRipple(this._elementRef.nativeElement)}focus(t="program",r){t?this._focusMonitor.focusVia(this._elementRef.nativeElement,t,r):this._elementRef.nativeElement.focus(r)}_getAriaDisabled(){return this.ariaDisabled!=null?this.ariaDisabled:this._isAnchor?this.disabled||null:this.disabled&&this.disabledInteractive?!0:null}_getDisabledAttribute(){return this.disabledInteractive||!this.disabled?null:!0}_updateRippleDisabled(){this._rippleLoader?.setDisabled(this._elementRef.nativeElement,this.disableRipple||this.disabled)}_getTabIndex(){return this._isAnchor?this.disabled&&!this.disabledInteractive?-1:this.tabIndex:this.tabIndex}_setupAsAnchor(){this._cleanupClick=this._ngZone.runOutsideAngular(()=>this._renderer.listen(this._elementRef.nativeElement,"click",t=>{this.disabled&&(t.preventDefault(),t.stopImmediatePropagation())}))}static \u0275fac=function(r){return new(r||e)};static \u0275dir=W({type:e,hostAttrs:[1,"mat-mdc-button-base"],hostVars:13,hostBindings:function(r,o){r&2&&(le("disabled",o._getDisabledAttribute())("aria-disabled",o._getAriaDisabled())("tabindex",o._getTabIndex()),ai(o.color?"mat-"+o.color:""),U("mat-mdc-button-disabled",o.disabled)("mat-mdc-button-disabled-interactive",o.disabledInteractive)("mat-unthemed",!o.color)("_mat-animation-noopable",o._animationsDisabled))},inputs:{color:"color",disableRipple:[2,"disableRipple","disableRipple",oe],disabled:[2,"disabled","disabled",oe],ariaDisabled:[2,"aria-disabled","ariaDisabled",oe],disabledInteractive:[2,"disabledInteractive","disabledInteractive",oe],tabIndex:[2,"tabIndex","tabIndex",ab],_tabindex:[2,"tabindex","_tabindex",ab]}})}return e})(),Ff=(()=>{class e extends yl{constructor(){super(),this._rippleLoader.configureRipple(this._elementRef.nativeElement,{centered:!0})}static \u0275fac=function(r){return new(r||e)};static \u0275cmp=$({type:e,selectors:[["button","mat-icon-button",""],["a","mat-icon-button",""],["button","matIconButton",""],["a","matIconButton",""]],hostAttrs:[1,"mdc-icon-button","mat-mdc-icon-button"],exportAs:["matButton","matAnchor"],features:[Le],attrs:UI,ngContentSelectors:$I,decls:4,vars:0,consts:[[1,"mat-mdc-button-persistent-ripple","mdc-icon-button__ripple"],[1,"mat-focus-indicator"],[1,"mat-mdc-button-touch-target"]],template:function(r,o){r&1&&(qe(),We(0,"span",0),de(1),We(2,"span",1)(3,"span",2))},styles:[`.mat-mdc-icon-button {
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
`],encapsulation:2,changeDetection:0})}return e})();var bl=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275mod=te({type:e});static \u0275inj=J({imports:[nt]})}return e})();var GI=["matButton",""],cb=[[["",8,"material-icons",3,"iconPositionEnd",""],["mat-icon",3,"iconPositionEnd",""],["","matButtonIcon","",3,"iconPositionEnd",""]],"*",[["","iconPositionEnd","",8,"material-icons"],["mat-icon","iconPositionEnd",""],["","matButtonIcon","","iconPositionEnd",""]]],db=[".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd]), [matButtonIcon]:not([iconPositionEnd])","*",".material-icons[iconPositionEnd], mat-icon[iconPositionEnd], [matButtonIcon][iconPositionEnd]"],WI=["mat-fab",""];var lb=new Map([["text",["mat-mdc-button"]],["filled",["mdc-button--unelevated","mat-mdc-unelevated-button"]],["elevated",["mdc-button--raised","mat-mdc-raised-button"]],["outlined",["mdc-button--outlined","mat-mdc-outlined-button"]],["tonal",["mat-tonal-button"]]]),_l=(()=>{class e extends yl{get appearance(){return this._appearance}set appearance(t){this.setAppearance(t||this._config?.defaultAppearance||"text")}_appearance=null;constructor(){super();let t=qI(this._elementRef.nativeElement);t&&this.setAppearance(t)}setAppearance(t){if(t===this._appearance)return;let r=this._elementRef.nativeElement.classList,o=this._appearance?lb.get(this._appearance):null,i=lb.get(t);o&&r.remove(...o),r.add(...i),this._appearance=t}static \u0275fac=function(r){return new(r||e)};static \u0275cmp=$({type:e,selectors:[["button","matButton",""],["a","matButton",""],["button","mat-button",""],["button","mat-raised-button",""],["button","mat-flat-button",""],["button","mat-stroked-button",""],["a","mat-button",""],["a","mat-raised-button",""],["a","mat-flat-button",""],["a","mat-stroked-button",""]],hostAttrs:[1,"mdc-button"],inputs:{appearance:[0,"matButton","appearance"]},exportAs:["matButton","matAnchor"],features:[Le],attrs:GI,ngContentSelectors:db,decls:7,vars:4,consts:[[1,"mat-mdc-button-persistent-ripple"],[1,"mdc-button__label"],[1,"mat-focus-indicator"],[1,"mat-mdc-button-touch-target"]],template:function(r,o){r&1&&(qe(cb),We(0,"span",0),de(1),vn(2,"span",1),de(3,1),yn(),de(4,2),We(5,"span",2)(6,"span",3)),r&2&&U("mdc-button__ripple",!o._isFab)("mdc-fab__ripple",o._isFab)},styles:[`.mat-mdc-button-base {
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
`],encapsulation:2,changeDetection:0})}return e})();function qI(e){return e.hasAttribute("mat-raised-button")?"elevated":e.hasAttribute("mat-stroked-button")?"outlined":e.hasAttribute("mat-flat-button")?"filled":e.hasAttribute("mat-button")?"text":null}var YI=new g("mat-mdc-fab-default-options",{providedIn:"root",factory:()=>Pf}),Pf={color:"accent"},ub=(()=>{class e extends yl{_options=f(YI,{optional:!0});_isFab=!0;extended=!1;constructor(){super(),this._options=this._options||Pf,this.color=this._options.color||Pf.color}static \u0275fac=function(r){return new(r||e)};static \u0275cmp=$({type:e,selectors:[["button","mat-fab",""],["a","mat-fab",""],["button","matFab",""],["a","matFab",""]],hostAttrs:[1,"mdc-fab","mat-mdc-fab-base","mat-mdc-fab"],hostVars:4,hostBindings:function(r,o){r&2&&U("mdc-fab--extended",o.extended)("mat-mdc-extended-fab",o.extended)},inputs:{extended:[2,"extended","extended",oe]},exportAs:["matButton","matAnchor"],features:[Le],attrs:WI,ngContentSelectors:db,decls:7,vars:4,consts:[[1,"mat-mdc-button-persistent-ripple"],[1,"mdc-button__label"],[1,"mat-focus-indicator"],[1,"mat-mdc-button-touch-target"]],template:function(r,o){r&1&&(qe(cb),We(0,"span",0),de(1),vn(2,"span",1),de(3,1),yn(),de(4,2),We(5,"span",2)(6,"span",3)),r&2&&U("mdc-button__ripple",!o._isFab)("mdc-fab__ripple",o._isFab)},styles:[`.mat-mdc-fab-base {
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
`],encapsulation:2,changeDetection:0})}return e})();var fr=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275mod=te({type:e});static \u0275inj=J({imports:[bl,nt]})}return e})();var ki=class{_multiple;_emitChanges;compareWith;_selection=new Set;_deselectedToEmit=[];_selectedToEmit=[];_selected=null;get selected(){return this._selected||(this._selected=Array.from(this._selection.values())),this._selected}changed=new A;constructor(n=!1,t,r=!0,o){this._multiple=n,this._emitChanges=r,this.compareWith=o,t&&t.length&&(n?t.forEach(i=>this._markSelected(i)):this._markSelected(t[0]),this._selectedToEmit.length=0)}select(...n){this._verifyValueAssignment(n),n.forEach(r=>this._markSelected(r));let t=this._hasQueuedChanges();return this._emitChangeEvent(),t}deselect(...n){this._verifyValueAssignment(n),n.forEach(r=>this._unmarkSelected(r));let t=this._hasQueuedChanges();return this._emitChangeEvent(),t}setSelection(...n){this._verifyValueAssignment(n);let t=this.selected,r=new Set(n.map(i=>this._getConcreteValue(i)));n.forEach(i=>this._markSelected(i)),t.filter(i=>!r.has(this._getConcreteValue(i,r))).forEach(i=>this._unmarkSelected(i));let o=this._hasQueuedChanges();return this._emitChangeEvent(),o}toggle(n){return this.isSelected(n)?this.deselect(n):this.select(n)}clear(n=!0){this._unmarkAll();let t=this._hasQueuedChanges();return n&&this._emitChangeEvent(),t}isSelected(n){return this._selection.has(this._getConcreteValue(n))}isEmpty(){return this._selection.size===0}hasValue(){return!this.isEmpty()}sort(n){this._multiple&&this.selected&&this._selected.sort(n)}isMultipleSelection(){return this._multiple}_emitChangeEvent(){this._selected=null,(this._selectedToEmit.length||this._deselectedToEmit.length)&&(this.changed.next({source:this,added:this._selectedToEmit,removed:this._deselectedToEmit}),this._deselectedToEmit=[],this._selectedToEmit=[])}_markSelected(n){n=this._getConcreteValue(n),this.isSelected(n)||(this._multiple||this._unmarkAll(),this.isSelected(n)||this._selection.add(n),this._emitChanges&&this._selectedToEmit.push(n))}_unmarkSelected(n){n=this._getConcreteValue(n),this.isSelected(n)&&(this._selection.delete(n),this._emitChanges&&this._deselectedToEmit.push(n))}_unmarkAll(){this.isEmpty()||this._selection.forEach(n=>this._unmarkSelected(n))}_verifyValueAssignment(n){n.length>1&&this._multiple}_hasQueuedChanges(){return!!(this._deselectedToEmit.length||this._selectedToEmit.length)}_getConcreteValue(n,t){if(this.compareWith){t=t??this._selection;for(let r of t)if(this.compareWith(n,r))return r;return n}else return n}};var fb=(()=>{class e{_animationsDisabled=je();state="unchecked";disabled=!1;appearance="full";constructor(){}static \u0275fac=function(r){return new(r||e)};static \u0275cmp=$({type:e,selectors:[["mat-pseudo-checkbox"]],hostAttrs:[1,"mat-pseudo-checkbox"],hostVars:12,hostBindings:function(r,o){r&2&&U("mat-pseudo-checkbox-indeterminate",o.state==="indeterminate")("mat-pseudo-checkbox-checked",o.state==="checked")("mat-pseudo-checkbox-disabled",o.disabled)("mat-pseudo-checkbox-minimal",o.appearance==="minimal")("mat-pseudo-checkbox-full",o.appearance==="full")("_mat-animation-noopable",o._animationsDisabled)},inputs:{state:"state",disabled:"disabled",appearance:"appearance"},decls:0,vars:0,template:function(r,o){},styles:[`.mat-pseudo-checkbox {
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
`],encapsulation:2,changeDetection:0})}return e})();var tM=["button"],nM=["*"];function rM(e,n){if(e&1&&(y(0,"div",2),re(1,"mat-pseudo-checkbox",6),b()),e&2){let t=V();_(),ce("disabled",t.disabled)}}var pb=new g("MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS",{providedIn:"root",factory:()=>({hideSingleSelectionIndicator:!1,hideMultipleSelectionIndicator:!1,disabledInteractive:!1})}),hb=new g("MatButtonToggleGroup"),oM={provide:Ay,useExisting:Pt(()=>Vf),multi:!0},Dl=class{source;value;constructor(n,t){this.source=n,this.value=t}},Vf=(()=>{class e{_changeDetector=f(Kt);_dir=f(dr,{optional:!0});_multiple=!1;_disabled=!1;_disabledInteractive=!1;_selectionModel;_rawValue;_controlValueAccessorChangeFn=()=>{};_onTouched=()=>{};_buttonToggles;appearance;get name(){return this._name}set name(t){this._name=t,this._markButtonsForCheck()}_name=f(Ve).getId("mat-button-toggle-group-");vertical=!1;get value(){let t=this._selectionModel?this._selectionModel.selected:[];return this.multiple?t.map(r=>r.value):t[0]?t[0].value:void 0}set value(t){this._setSelectionByValue(t),this.valueChange.emit(this.value)}valueChange=new ae;get selected(){let t=this._selectionModel?this._selectionModel.selected:[];return this.multiple?t:t[0]||null}get multiple(){return this._multiple}set multiple(t){this._multiple=t,this._markButtonsForCheck()}get disabled(){return this._disabled}set disabled(t){this._disabled=t,this._markButtonsForCheck()}get disabledInteractive(){return this._disabledInteractive}set disabledInteractive(t){this._disabledInteractive=t,this._markButtonsForCheck()}get dir(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}change=new ae;get hideSingleSelectionIndicator(){return this._hideSingleSelectionIndicator}set hideSingleSelectionIndicator(t){this._hideSingleSelectionIndicator=t,this._markButtonsForCheck()}_hideSingleSelectionIndicator;get hideMultipleSelectionIndicator(){return this._hideMultipleSelectionIndicator}set hideMultipleSelectionIndicator(t){this._hideMultipleSelectionIndicator=t,this._markButtonsForCheck()}_hideMultipleSelectionIndicator;constructor(){let t=f(pb,{optional:!0});this.appearance=t&&t.appearance?t.appearance:"standard",this._hideSingleSelectionIndicator=t?.hideSingleSelectionIndicator??!1,this._hideMultipleSelectionIndicator=t?.hideMultipleSelectionIndicator??!1}ngOnInit(){this._selectionModel=new ki(this.multiple,void 0,!1)}ngAfterContentInit(){this._selectionModel.select(...this._buttonToggles.filter(t=>t.checked)),this.multiple||this._initializeTabIndex()}writeValue(t){this.value=t,this._changeDetector.markForCheck()}registerOnChange(t){this._controlValueAccessorChangeFn=t}registerOnTouched(t){this._onTouched=t}setDisabledState(t){this.disabled=t}_keydown(t){if(this.multiple||this.disabled||iy(t))return;let o=t.target.id,i=this._buttonToggles.toArray().findIndex(a=>a.buttonId===o),s=null;switch(t.keyCode){case 32:case 13:s=this._buttonToggles.get(i)||null;break;case 38:s=this._getNextButton(i,-1);break;case 37:s=this._getNextButton(i,this.dir==="ltr"?-1:1);break;case 40:s=this._getNextButton(i,1);break;case 39:s=this._getNextButton(i,this.dir==="ltr"?1:-1);break;default:return}s&&(t.preventDefault(),s._onButtonClick(),s.focus())}_emitChangeEvent(t){let r=new Dl(t,this.value);this._rawValue=r.value,this._controlValueAccessorChangeFn(r.value),this.change.emit(r)}_syncButtonToggle(t,r,o=!1,i=!1){!this.multiple&&this.selected&&!t.checked&&(this.selected.checked=!1),this._selectionModel?r?this._selectionModel.select(t):this._selectionModel.deselect(t):i=!0,i?Promise.resolve().then(()=>this._updateModelValue(t,o)):this._updateModelValue(t,o)}_isSelected(t){return this._selectionModel&&this._selectionModel.isSelected(t)}_isPrechecked(t){return typeof this._rawValue>"u"?!1:this.multiple&&Array.isArray(this._rawValue)?this._rawValue.some(r=>t.value!=null&&r===t.value):t.value===this._rawValue}_initializeTabIndex(){if(this._buttonToggles.forEach(t=>{t.tabIndex=-1}),this.selected)this.selected.tabIndex=0;else for(let t=0;t<this._buttonToggles.length;t++){let r=this._buttonToggles.get(t);if(!r.disabled){r.tabIndex=0;break}}}_getNextButton(t,r){let o=this._buttonToggles;for(let i=1;i<=o.length;i++){let s=(t+r*i+o.length)%o.length,a=o.get(s);if(a&&!a.disabled)return a}return null}_setSelectionByValue(t){if(this._rawValue=t,!this._buttonToggles)return;let r=this._buttonToggles.toArray();if(this.multiple&&t?(Array.isArray(t),this._clearSelection(),t.forEach(o=>this._selectValue(o,r))):(this._clearSelection(),this._selectValue(t,r)),!this.multiple&&r.every(o=>o.tabIndex===-1)){for(let o of r)if(!o.disabled){o.tabIndex=0;break}}}_clearSelection(){this._selectionModel.clear(),this._buttonToggles.forEach(t=>{t.checked=!1,this.multiple||(t.tabIndex=-1)})}_selectValue(t,r){for(let o of r)if(o.value===t){o.checked=!0,this._selectionModel.select(o),this.multiple||(o.tabIndex=0);break}}_updateModelValue(t,r){r&&this._emitChangeEvent(t),this.valueChange.emit(this.value)}_markButtonsForCheck(){this._buttonToggles?.forEach(t=>t._markForCheck())}static \u0275fac=function(r){return new(r||e)};static \u0275dir=W({type:e,selectors:[["mat-button-toggle-group"]],contentQueries:function(r,o,i){if(r&1&&Gr(i,El,5),r&2){let s;pe(s=he())&&(o._buttonToggles=s)}},hostAttrs:[1,"mat-button-toggle-group"],hostVars:6,hostBindings:function(r,o){r&1&&ne("keydown",function(s){return o._keydown(s)}),r&2&&(le("role",o.multiple?"group":"radiogroup")("aria-disabled",o.disabled),U("mat-button-toggle-vertical",o.vertical)("mat-button-toggle-group-appearance-standard",o.appearance==="standard"))},inputs:{appearance:"appearance",name:"name",vertical:[2,"vertical","vertical",oe],value:"value",multiple:[2,"multiple","multiple",oe],disabled:[2,"disabled","disabled",oe],disabledInteractive:[2,"disabledInteractive","disabledInteractive",oe],hideSingleSelectionIndicator:[2,"hideSingleSelectionIndicator","hideSingleSelectionIndicator",oe],hideMultipleSelectionIndicator:[2,"hideMultipleSelectionIndicator","hideMultipleSelectionIndicator",oe]},outputs:{valueChange:"valueChange",change:"change"},exportAs:["matButtonToggleGroup"],features:[vt([oM,{provide:hb,useExisting:e}])]})}return e})(),El=(()=>{class e{_changeDetectorRef=f(Kt);_elementRef=f(Y);_focusMonitor=f(Di);_idGenerator=f(Ve);_animationDisabled=je();_checked=!1;ariaLabel;ariaLabelledby=null;_buttonElement;buttonToggleGroup;get buttonId(){return`${this.id}-button`}id;name;value;get tabIndex(){return this._tabIndex()}set tabIndex(t){this._tabIndex.set(t)}_tabIndex;disableRipple=!1;get appearance(){return this.buttonToggleGroup?this.buttonToggleGroup.appearance:this._appearance}set appearance(t){this._appearance=t}_appearance;get checked(){return this.buttonToggleGroup?this.buttonToggleGroup._isSelected(this):this._checked}set checked(t){t!==this._checked&&(this._checked=t,this.buttonToggleGroup&&this.buttonToggleGroup._syncButtonToggle(this,this._checked),this._changeDetectorRef.markForCheck())}get disabled(){return this._disabled||this.buttonToggleGroup&&this.buttonToggleGroup.disabled}set disabled(t){this._disabled=t}_disabled=!1;get disabledInteractive(){return this._disabledInteractive||this.buttonToggleGroup!==null&&this.buttonToggleGroup.disabledInteractive}set disabledInteractive(t){this._disabledInteractive=t}_disabledInteractive;change=new ae;constructor(){f(tt).load(vl);let t=f(hb,{optional:!0}),r=f(new qr("tabindex"),{optional:!0})||"",o=f(pb,{optional:!0});this._tabIndex=H(parseInt(r)||0),this.buttonToggleGroup=t,this._appearance=o&&o.appearance?o.appearance:"standard",this._disabledInteractive=o?.disabledInteractive??!1}ngOnInit(){let t=this.buttonToggleGroup;this.id=this.id||this._idGenerator.getId("mat-button-toggle-"),t&&(t._isPrechecked(this)?this.checked=!0:t._isSelected(this)!==this._checked&&t._syncButtonToggle(this,this._checked))}ngAfterViewInit(){this._animationDisabled||this._elementRef.nativeElement.classList.add("mat-button-toggle-animations-enabled"),this._focusMonitor.monitor(this._elementRef,!0)}ngOnDestroy(){let t=this.buttonToggleGroup;this._focusMonitor.stopMonitoring(this._elementRef),t&&t._isSelected(this)&&t._syncButtonToggle(this,!1,!1,!0)}focus(t){this._buttonElement.nativeElement.focus(t)}_onButtonClick(){if(this.disabled)return;let t=this.isSingleSelector()?!0:!this._checked;if(t!==this._checked&&(this._checked=t,this.buttonToggleGroup&&(this.buttonToggleGroup._syncButtonToggle(this,this._checked,!0),this.buttonToggleGroup._onTouched())),this.isSingleSelector()){let r=this.buttonToggleGroup._buttonToggles.find(o=>o.tabIndex===0);r&&(r.tabIndex=-1),this.tabIndex=0}this.change.emit(new Dl(this,this.value))}_markForCheck(){this._changeDetectorRef.markForCheck()}_getButtonName(){return this.isSingleSelector()?this.buttonToggleGroup.name:this.name||null}isSingleSelector(){return this.buttonToggleGroup&&!this.buttonToggleGroup.multiple}static \u0275fac=function(r){return new(r||e)};static \u0275cmp=$({type:e,selectors:[["mat-button-toggle"]],viewQuery:function(r,o){if(r&1&&gt(tM,5),r&2){let i;pe(i=he())&&(o._buttonElement=i.first)}},hostAttrs:["role","presentation",1,"mat-button-toggle"],hostVars:14,hostBindings:function(r,o){r&1&&ne("focus",function(){return o.focus()}),r&2&&(le("aria-label",null)("aria-labelledby",null)("id",o.id)("name",null),U("mat-button-toggle-standalone",!o.buttonToggleGroup)("mat-button-toggle-checked",o.checked)("mat-button-toggle-disabled",o.disabled)("mat-button-toggle-disabled-interactive",o.disabledInteractive)("mat-button-toggle-appearance-standard",o.appearance==="standard"))},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],id:"id",name:"name",value:"value",tabIndex:"tabIndex",disableRipple:[2,"disableRipple","disableRipple",oe],appearance:"appearance",checked:[2,"checked","checked",oe],disabled:[2,"disabled","disabled",oe],disabledInteractive:[2,"disabledInteractive","disabledInteractive",oe]},outputs:{change:"change"},exportAs:["matButtonToggle"],ngContentSelectors:nM,decls:7,vars:13,consts:[["button",""],["type","button",1,"mat-button-toggle-button","mat-focus-indicator",3,"click","id","disabled"],[1,"mat-button-toggle-checkbox-wrapper"],[1,"mat-button-toggle-label-content"],[1,"mat-button-toggle-focus-overlay"],["matRipple","",1,"mat-button-toggle-ripple",3,"matRippleTrigger","matRippleDisabled"],["state","checked","aria-hidden","true","appearance","minimal",3,"disabled"]],template:function(r,o){if(r&1&&(qe(),y(0,"button",1,0),ne("click",function(){return o._onButtonClick()}),j(2,rM,2,1,"div",2),y(3,"span",3),de(4),b()(),re(5,"span",4)(6,"span",5)),r&2){let i=Wr(1);ce("id",o.buttonId)("disabled",o.disabled&&!o.disabledInteractive||null),le("role",o.isSingleSelector()?"radio":"button")("tabindex",o.disabled&&!o.disabledInteractive?-1:o.tabIndex)("aria-pressed",o.isSingleSelector()?null:o.checked)("aria-checked",o.isSingleSelector()?o.checked:null)("name",o._getButtonName())("aria-label",o.ariaLabel)("aria-labelledby",o.ariaLabelledby)("aria-disabled",o.disabled&&o.disabledInteractive?"true":null),_(2),B(o.buttonToggleGroup&&(!o.buttonToggleGroup.multiple&&!o.buttonToggleGroup.hideSingleSelectionIndicator||o.buttonToggleGroup.multiple&&!o.buttonToggleGroup.hideMultipleSelectionIndicator)?2:-1),_(4),ce("matRippleTrigger",i)("matRippleDisabled",o.disableRipple||o.disabled)}},dependencies:[ob,fb],styles:[`.mat-button-toggle-standalone,
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
`],encapsulation:2,changeDetection:0})}return e})(),mb=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275mod=te({type:e});static \u0275inj=J({imports:[bl,El,nt]})}return e})();function gb(e){return Error(`Unable to find icon with the name "${e}"`)}function sM(){return Error("Could not find HttpClient for use with Angular Material icons. Please add provideHttpClient() to your providers.")}function vb(e){return Error(`The URL provided to MatIconRegistry was not trusted as a resource URL via Angular's DomSanitizer. Attempted URL was "${e}".`)}function yb(e){return Error(`The literal provided to MatIconRegistry was not trusted as safe HTML by Angular's DomSanitizer. Attempted literal was "${e}".`)}var en=class{url;svgText;options;svgElement=null;constructor(n,t,r){this.url=n,this.svgText=t,this.options=r}},_b=(()=>{class e{_httpClient;_sanitizer;_errorHandler;_document;_svgIconConfigs=new Map;_iconSetConfigs=new Map;_cachedIconsByUrl=new Map;_inProgressUrlFetches=new Map;_fontCssClassesByAlias=new Map;_resolvers=[];_defaultFontSetClass=["material-icons","mat-ligature-font"];constructor(t,r,o,i){this._httpClient=t,this._sanitizer=r,this._errorHandler=i,this._document=o}addSvgIcon(t,r,o){return this.addSvgIconInNamespace("",t,r,o)}addSvgIconLiteral(t,r,o){return this.addSvgIconLiteralInNamespace("",t,r,o)}addSvgIconInNamespace(t,r,o,i){return this._addSvgIconConfig(t,r,new en(o,null,i))}addSvgIconResolver(t){return this._resolvers.push(t),this}addSvgIconLiteralInNamespace(t,r,o,i){let s=this._sanitizer.sanitize(xe.HTML,o);if(!s)throw yb(o);let a=lr(s);return this._addSvgIconConfig(t,r,new en("",a,i))}addSvgIconSet(t,r){return this.addSvgIconSetInNamespace("",t,r)}addSvgIconSetLiteral(t,r){return this.addSvgIconSetLiteralInNamespace("",t,r)}addSvgIconSetInNamespace(t,r,o){return this._addSvgIconSetConfig(t,new en(r,null,o))}addSvgIconSetLiteralInNamespace(t,r,o){let i=this._sanitizer.sanitize(xe.HTML,r);if(!i)throw yb(r);let s=lr(i);return this._addSvgIconSetConfig(t,new en("",s,o))}registerFontClassAlias(t,r=t){return this._fontCssClassesByAlias.set(t,r),this}classNameForFontAlias(t){return this._fontCssClassesByAlias.get(t)||t}setDefaultFontSetClass(...t){return this._defaultFontSetClass=t,this}getDefaultFontSetClass(){return this._defaultFontSetClass}getSvgIconFromUrl(t){let r=this._sanitizer.sanitize(xe.RESOURCE_URL,t);if(!r)throw vb(t);let o=this._cachedIconsByUrl.get(r);return o?He(Cl(o)):this._loadSvgIconFromConfig(new en(t,null)).pipe(Mo(i=>this._cachedIconsByUrl.set(r,i)),se(i=>Cl(i)))}getNamedSvgIcon(t,r=""){let o=bb(r,t),i=this._svgIconConfigs.get(o);if(i)return this._getSvgFromConfig(i);if(i=this._getIconConfigFromResolvers(r,t),i)return this._svgIconConfigs.set(o,i),this._getSvgFromConfig(i);let s=this._iconSetConfigs.get(r);return s?this._getSvgFromIconSetConfigs(t,s):Kl(gb(o))}ngOnDestroy(){this._resolvers=[],this._svgIconConfigs.clear(),this._iconSetConfigs.clear(),this._cachedIconsByUrl.clear()}_getSvgFromConfig(t){return t.svgText?He(Cl(this._svgElementFromConfig(t))):this._loadSvgIconFromConfig(t).pipe(se(r=>Cl(r)))}_getSvgFromIconSetConfigs(t,r){let o=this._extractIconWithNameFromAnySet(t,r);if(o)return He(o);let i=r.filter(s=>!s.svgText).map(s=>this._loadSvgIconSetFromConfig(s).pipe(gs(a=>{let c=`Loading icon set URL: ${this._sanitizer.sanitize(xe.RESOURCE_URL,s.url)} failed: ${a.message}`;return this._errorHandler.handleError(new Error(c)),He(null)})));return Do(i).pipe(se(()=>{let s=this._extractIconWithNameFromAnySet(t,r);if(!s)throw gb(t);return s}))}_extractIconWithNameFromAnySet(t,r){for(let o=r.length-1;o>=0;o--){let i=r[o];if(i.svgText&&i.svgText.toString().indexOf(t)>-1){let s=this._svgElementFromConfig(i),a=this._extractSvgIconFromSet(s,t,i.options);if(a)return a}}return null}_loadSvgIconFromConfig(t){return this._fetchIcon(t).pipe(Mo(r=>t.svgText=r),se(()=>this._svgElementFromConfig(t)))}_loadSvgIconSetFromConfig(t){return t.svgText?He(null):this._fetchIcon(t).pipe(Mo(r=>t.svgText=r))}_extractSvgIconFromSet(t,r,o){let i=t.querySelector(`[id="${r}"]`);if(!i)return null;let s=i.cloneNode(!0);if(s.removeAttribute("id"),s.nodeName.toLowerCase()==="svg")return this._setSvgAttributes(s,o);if(s.nodeName.toLowerCase()==="symbol")return this._setSvgAttributes(this._toSvgElement(s),o);let a=this._svgElementFromString(lr("<svg></svg>"));return a.appendChild(s),this._setSvgAttributes(a,o)}_svgElementFromString(t){let r=this._document.createElement("DIV");r.innerHTML=t;let o=r.querySelector("svg");if(!o)throw Error("<svg> tag not found");return o}_toSvgElement(t){let r=this._svgElementFromString(lr("<svg></svg>")),o=t.attributes;for(let i=0;i<o.length;i++){let{name:s,value:a}=o[i];s!=="id"&&r.setAttribute(s,a)}for(let i=0;i<t.childNodes.length;i++)t.childNodes[i].nodeType===this._document.ELEMENT_NODE&&r.appendChild(t.childNodes[i].cloneNode(!0));return r}_setSvgAttributes(t,r){return t.setAttribute("fit",""),t.setAttribute("height","100%"),t.setAttribute("width","100%"),t.setAttribute("preserveAspectRatio","xMidYMid meet"),t.setAttribute("focusable","false"),r&&r.viewBox&&t.setAttribute("viewBox",r.viewBox),t}_fetchIcon(t){let{url:r,options:o}=t,i=o?.withCredentials??!1;if(!this._httpClient)throw sM();if(r==null)throw Error(`Cannot fetch icon from URL "${r}".`);let s=this._sanitizer.sanitize(xe.RESOURCE_URL,r);if(!s)throw vb(r);let a=this._inProgressUrlFetches.get(s);if(a)return a;let l=this._httpClient.get(s,{responseType:"text",withCredentials:i}).pipe(se(c=>lr(c)),Co(()=>this._inProgressUrlFetches.delete(s)),wo());return this._inProgressUrlFetches.set(s,l),l}_addSvgIconConfig(t,r,o){return this._svgIconConfigs.set(bb(t,r),o),this}_addSvgIconSetConfig(t,r){let o=this._iconSetConfigs.get(t);return o?o.push(r):this._iconSetConfigs.set(t,[r]),this}_svgElementFromConfig(t){if(!t.svgElement){let r=this._svgElementFromString(t.svgText);this._setSvgAttributes(r,t.options),t.svgElement=r}return t.svgElement}_getIconConfigFromResolvers(t,r){for(let o=0;o<this._resolvers.length;o++){let i=this._resolvers[o](r,t);if(i)return aM(i)?new en(i.url,null,i.options):new en(i,null)}}static \u0275fac=function(r){return new(r||e)(x(En,8),x(ar),x(F,8),x(Ue))};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function Cl(e){return e.cloneNode(!0)}function bb(e,n){return e+":"+n}function aM(e){return!!(e.url&&e.options)}var lM=["*"],cM=new g("MAT_ICON_DEFAULT_OPTIONS"),dM=new g("mat-icon-location",{providedIn:"root",factory:()=>{let e=f(F),n=e?e.location:null;return{getPathname:()=>n?n.pathname+n.search:""}}}),Db=["clip-path","color-profile","src","cursor","fill","filter","marker","marker-start","marker-mid","marker-end","mask","stroke"],uM=Db.map(e=>`[${e}]`).join(", "),fM=/^url\(['"]?#(.*?)['"]?\)$/,oo=(()=>{class e{_elementRef=f(Y);_iconRegistry=f(_b);_location=f(dM);_errorHandler=f(Ue);_defaultColor;get color(){return this._color||this._defaultColor}set color(t){this._color=t}_color;inline=!1;get svgIcon(){return this._svgIcon}set svgIcon(t){t!==this._svgIcon&&(t?this._updateSvgIcon(t):this._svgIcon&&this._clearSvgElement(),this._svgIcon=t)}_svgIcon;get fontSet(){return this._fontSet}set fontSet(t){let r=this._cleanupFontValue(t);r!==this._fontSet&&(this._fontSet=r,this._updateFontIconClasses())}_fontSet;get fontIcon(){return this._fontIcon}set fontIcon(t){let r=this._cleanupFontValue(t);r!==this._fontIcon&&(this._fontIcon=r,this._updateFontIconClasses())}_fontIcon;_previousFontSetClass=[];_previousFontIconClass;_svgName=null;_svgNamespace=null;_previousPath;_elementsWithExternalReferences;_currentIconFetch=me.EMPTY;constructor(){let t=f(new qr("aria-hidden"),{optional:!0}),r=f(cM,{optional:!0});r&&(r.color&&(this.color=this._defaultColor=r.color),r.fontSet&&(this.fontSet=r.fontSet)),t||this._elementRef.nativeElement.setAttribute("aria-hidden","true")}_splitIconName(t){if(!t)return["",""];let r=t.split(":");switch(r.length){case 1:return["",r[0]];case 2:return r;default:throw Error(`Invalid icon name: "${t}"`)}}ngOnInit(){this._updateFontIconClasses()}ngAfterViewChecked(){let t=this._elementsWithExternalReferences;if(t&&t.size){let r=this._location.getPathname();r!==this._previousPath&&(this._previousPath=r,this._prependPathToReferences(r))}}ngOnDestroy(){this._currentIconFetch.unsubscribe(),this._elementsWithExternalReferences&&this._elementsWithExternalReferences.clear()}_usingFontIcon(){return!this.svgIcon}_setSvgElement(t){this._clearSvgElement();let r=this._location.getPathname();this._previousPath=r,this._cacheChildrenWithExternalReferences(t),this._prependPathToReferences(r),this._elementRef.nativeElement.appendChild(t)}_clearSvgElement(){let t=this._elementRef.nativeElement,r=t.childNodes.length;for(this._elementsWithExternalReferences&&this._elementsWithExternalReferences.clear();r--;){let o=t.childNodes[r];(o.nodeType!==1||o.nodeName.toLowerCase()==="svg")&&o.remove()}}_updateFontIconClasses(){if(!this._usingFontIcon())return;let t=this._elementRef.nativeElement,r=(this.fontSet?this._iconRegistry.classNameForFontAlias(this.fontSet).split(/ +/):this._iconRegistry.getDefaultFontSetClass()).filter(o=>o.length>0);this._previousFontSetClass.forEach(o=>t.classList.remove(o)),r.forEach(o=>t.classList.add(o)),this._previousFontSetClass=r,this.fontIcon!==this._previousFontIconClass&&!r.includes("mat-ligature-font")&&(this._previousFontIconClass&&t.classList.remove(this._previousFontIconClass),this.fontIcon&&t.classList.add(this.fontIcon),this._previousFontIconClass=this.fontIcon)}_cleanupFontValue(t){return typeof t=="string"?t.trim().split(" ")[0]:t}_prependPathToReferences(t){let r=this._elementsWithExternalReferences;r&&r.forEach((o,i)=>{o.forEach(s=>{i.setAttribute(s.name,`url('${t}#${s.value}')`)})})}_cacheChildrenWithExternalReferences(t){let r=t.querySelectorAll(uM),o=this._elementsWithExternalReferences=this._elementsWithExternalReferences||new Map;for(let i=0;i<r.length;i++)Db.forEach(s=>{let a=r[i],l=a.getAttribute(s),c=l?l.match(fM):null;if(c){let d=o.get(a);d||(d=[],o.set(a,d)),d.push({name:s,value:c[1]})}})}_updateSvgIcon(t){if(this._svgNamespace=null,this._svgName=null,this._currentIconFetch.unsubscribe(),t){let[r,o]=this._splitIconName(t);r&&(this._svgNamespace=r),o&&(this._svgName=o),this._currentIconFetch=this._iconRegistry.getNamedSvgIcon(o,r).pipe(Eo(1)).subscribe(i=>this._setSvgElement(i),i=>{let s=`Error retrieving icon ${r}:${o}! ${i.message}`;this._errorHandler.handleError(new Error(s))})}}static \u0275fac=function(r){return new(r||e)};static \u0275cmp=$({type:e,selectors:[["mat-icon"]],hostAttrs:["role","img",1,"mat-icon","notranslate"],hostVars:10,hostBindings:function(r,o){r&2&&(le("data-mat-icon-type",o._usingFontIcon()?"font":"svg")("data-mat-icon-name",o._svgName||o.fontIcon)("data-mat-icon-namespace",o._svgNamespace||o.fontSet)("fontIcon",o._usingFontIcon()?o.fontIcon:null),ai(o.color?"mat-"+o.color:""),U("mat-icon-inline",o.inline)("mat-icon-no-color",o.color!=="primary"&&o.color!=="accent"&&o.color!=="warn"))},inputs:{color:"color",inline:[2,"inline","inline",oe],svgIcon:"svgIcon",fontSet:"fontSet",fontIcon:"fontIcon"},exportAs:["matIcon"],ngContentSelectors:lM,decls:1,vars:0,template:function(r,o){r&1&&(qe(),de(0))},styles:[`mat-icon, mat-icon.mat-primary, mat-icon.mat-accent, mat-icon.mat-warn {
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
`],encapsulation:2,changeDetection:0})}return e})(),io=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275mod=te({type:e});static \u0275inj=J({imports:[nt]})}return e})();var Ri=class{_attachedHost=null;attach(n){return this._attachedHost=n,n.attach(this)}detach(){let n=this._attachedHost;n!=null&&(this._attachedHost=null,n.detach())}get isAttached(){return this._attachedHost!=null}setAttachedHost(n){this._attachedHost=n}},so=class extends Ri{component;viewContainerRef;injector;projectableNodes;bindings;constructor(n,t,r,o,i){super(),this.component=n,this.viewContainerRef=t,this.injector=r,this.projectableNodes=o,this.bindings=i||null}},ao=class extends Ri{templateRef;viewContainerRef;context;injector;constructor(n,t,r,o){super(),this.templateRef=n,this.viewContainerRef=t,this.context=r,this.injector=o}get origin(){return this.templateRef.elementRef}attach(n,t=this.context){return this.context=t,super.attach(n)}detach(){return this.context=void 0,super.detach()}},Bf=class extends Ri{element;constructor(n){super(),this.element=n instanceof Y?n.nativeElement:n}},lo=class{_attachedPortal=null;_disposeFn=null;_isDisposed=!1;hasAttached(){return!!this._attachedPortal}attach(n){if(n instanceof so)return this._attachedPortal=n,this.attachComponentPortal(n);if(n instanceof ao)return this._attachedPortal=n,this.attachTemplatePortal(n);if(this.attachDomPortal&&n instanceof Bf)return this._attachedPortal=n,this.attachDomPortal(n)}attachDomPortal=null;detach(){this._attachedPortal&&(this._attachedPortal.setAttachedHost(null),this._attachedPortal=null),this._invokeDisposeFn()}dispose(){this.hasAttached()&&this.detach(),this._invokeDisposeFn(),this._isDisposed=!0}setDisposeFn(n){this._disposeFn=n}_invokeDisposeFn(){this._disposeFn&&(this._disposeFn(),this._disposeFn=null)}},wl=class extends lo{outletElement;_appRef;_defaultInjector;constructor(n,t,r){super(),this.outletElement=n,this._appRef=t,this._defaultInjector=r}attachComponentPortal(n){let t;if(n.viewContainerRef){let r=n.injector||n.viewContainerRef.injector,o=r.get(mn,null,{optional:!0})||void 0;t=n.viewContainerRef.createComponent(n.component,{index:n.viewContainerRef.length,injector:r,ngModuleRef:o,projectableNodes:n.projectableNodes||void 0,bindings:n.bindings||void 0}),this.setDisposeFn(()=>t.destroy())}else{let r=this._appRef,o=n.injector||this._defaultInjector||K.NULL,i=o.get(be,r.injector);t=La(n.component,{elementInjector:o,environmentInjector:i,projectableNodes:n.projectableNodes||void 0,bindings:n.bindings||void 0}),r.attachView(t.hostView),this.setDisposeFn(()=>{r.viewCount>0&&r.detachView(t.hostView),t.destroy()})}return this.outletElement.appendChild(this._getComponentRootNode(t)),this._attachedPortal=n,t}attachTemplatePortal(n){let t=n.viewContainerRef,r=t.createEmbeddedView(n.templateRef,n.context,{injector:n.injector});return r.rootNodes.forEach(o=>this.outletElement.appendChild(o)),r.detectChanges(),this.setDisposeFn(()=>{let o=t.indexOf(r);o!==-1&&t.remove(o)}),this._attachedPortal=n,r}attachDomPortal=n=>{let t=n.element;t.parentNode;let r=this.outletElement.ownerDocument.createComment("dom-portal");t.parentNode.insertBefore(r,t),this.outletElement.appendChild(t),this._attachedPortal=n,super.setDisposeFn(()=>{r.parentNode&&r.parentNode.replaceChild(t,r)})};dispose(){super.dispose(),this.outletElement.remove()}_getComponentRootNode(n){return n.hostView.rootNodes[0]}};var Hf=(()=>{class e extends lo{_moduleRef=f(mn,{optional:!0});_document=f(F);_viewContainerRef=f(Zt);_isInitialized=!1;_attachedRef=null;constructor(){super()}get portal(){return this._attachedPortal}set portal(t){this.hasAttached()&&!t&&!this._isInitialized||(this.hasAttached()&&super.detach(),t&&super.attach(t),this._attachedPortal=t||null)}attached=new ae;get attachedRef(){return this._attachedRef}ngOnInit(){this._isInitialized=!0}ngOnDestroy(){super.dispose(),this._attachedRef=this._attachedPortal=null}attachComponentPortal(t){t.setAttachedHost(this);let r=t.viewContainerRef!=null?t.viewContainerRef:this._viewContainerRef,o=r.createComponent(t.component,{index:r.length,injector:t.injector||r.injector,projectableNodes:t.projectableNodes||void 0,ngModuleRef:this._moduleRef||void 0,bindings:t.bindings||void 0});return r!==this._viewContainerRef&&this._getRootNode().appendChild(o.hostView.rootNodes[0]),super.setDisposeFn(()=>o.destroy()),this._attachedPortal=t,this._attachedRef=o,this.attached.emit(o),o}attachTemplatePortal(t){t.setAttachedHost(this);let r=this._viewContainerRef.createEmbeddedView(t.templateRef,t.context,{injector:t.injector});return super.setDisposeFn(()=>this._viewContainerRef.clear()),this._attachedPortal=t,this._attachedRef=r,this.attached.emit(r),r}attachDomPortal=t=>{let r=t.element;r.parentNode;let o=this._document.createComment("dom-portal");t.setAttachedHost(this),r.parentNode.insertBefore(o,r),this._getRootNode().appendChild(r),this._attachedPortal=t,super.setDisposeFn(()=>{o.parentNode&&o.parentNode.replaceChild(r,o)})};_getRootNode(){let t=this._viewContainerRef.element.nativeElement;return t.nodeType===t.ELEMENT_NODE?t:t.parentNode}static \u0275fac=function(r){return new(r||e)};static \u0275dir=W({type:e,selectors:[["","cdkPortalOutlet",""]],inputs:{portal:[0,"cdkPortalOutlet","portal"]},outputs:{attached:"attached"},exportAs:["cdkPortalOutlet"],features:[Le]})}return e})();var xl=class{enable(){}disable(){}attach(){}};var co=class{positionStrategy;scrollStrategy=new xl;panelClass="";hasBackdrop=!1;backdropClass="cdk-overlay-dark-backdrop";disableAnimations;width;height;minWidth;minHeight;maxWidth;maxHeight;direction;disposeOnNavigation=!1;usePopover;eventPredicate;constructor(n){if(n){let t=Object.keys(n);for(let r of t)n[r]!==void 0&&(this[r]=n[r])}}};var wb=(()=>{class e{_attachedOverlays=[];_document=f(F);_isAttached=!1;constructor(){}ngOnDestroy(){this.detach()}add(t){this.remove(t),this._attachedOverlays.push(t)}remove(t){let r=this._attachedOverlays.indexOf(t);r>-1&&this._attachedOverlays.splice(r,1),this._attachedOverlays.length===0&&this.detach()}canReceiveEvent(t,r,o){return o.observers.length<1?!1:t.eventPredicate?t.eventPredicate(r):!0}static \u0275fac=function(r){return new(r||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),xb=(()=>{class e extends wb{_ngZone=f(N);_renderer=f(Te).createRenderer(null,null);_cleanupKeydown;add(t){super.add(t),this._isAttached||(this._ngZone.runOutsideAngular(()=>{this._cleanupKeydown=this._renderer.listen("body","keydown",this._keydownListener)}),this._isAttached=!0)}detach(){this._isAttached&&(this._cleanupKeydown?.(),this._isAttached=!1)}_keydownListener=t=>{let r=this._attachedOverlays;for(let o=r.length-1;o>-1;o--){let i=r[o];if(this.canReceiveEvent(i,t,i._keydownEvents)){this._ngZone.run(()=>i._keydownEvents.next(t));break}}};static \u0275fac=(()=>{let t;return function(o){return(t||(t=tr(e)))(o||e)}})();static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),Ib=(()=>{class e extends wb{_platform=f(Ee);_ngZone=f(N);_renderer=f(Te).createRenderer(null,null);_cursorOriginalValue;_cursorStyleIsSet=!1;_pointerDownEventTarget=null;_cleanups;add(t){if(super.add(t),!this._isAttached){let r=this._document.body,o={capture:!0},i=this._renderer;this._cleanups=this._ngZone.runOutsideAngular(()=>[i.listen(r,"pointerdown",this._pointerDownListener,o),i.listen(r,"click",this._clickListener,o),i.listen(r,"auxclick",this._clickListener,o),i.listen(r,"contextmenu",this._clickListener,o)]),this._platform.IOS&&!this._cursorStyleIsSet&&(this._cursorOriginalValue=r.style.cursor,r.style.cursor="pointer",this._cursorStyleIsSet=!0),this._isAttached=!0}}detach(){this._isAttached&&(this._cleanups?.forEach(t=>t()),this._cleanups=void 0,this._platform.IOS&&this._cursorStyleIsSet&&(this._document.body.style.cursor=this._cursorOriginalValue,this._cursorStyleIsSet=!1),this._isAttached=!1)}_pointerDownListener=t=>{this._pointerDownEventTarget=$e(t)};_clickListener=t=>{let r=$e(t),o=t.type==="click"&&this._pointerDownEventTarget?this._pointerDownEventTarget:r;this._pointerDownEventTarget=null;let i=this._attachedOverlays.slice();for(let s=i.length-1;s>-1;s--){let a=i[s],l=a._outsidePointerEvents;if(!(!a.hasAttached()||!this.canReceiveEvent(a,t,l))){if(Eb(a.overlayElement,r)||Eb(a.overlayElement,o))break;this._ngZone?this._ngZone.run(()=>l.next(t)):l.next(t)}}};static \u0275fac=(()=>{let t;return function(o){return(t||(t=tr(e)))(o||e)}})();static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function Eb(e,n){let t=typeof ShadowRoot<"u"&&ShadowRoot,r=n;for(;r;){if(r===e)return!0;r=t&&r instanceof ShadowRoot?r.host:r.parentNode}return!1}var Mb=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275cmp=$({type:e,selectors:[["ng-component"]],hostAttrs:["cdk-overlay-style-loader",""],decls:0,vars:0,template:function(r,o){},styles:[`.cdk-overlay-container, .cdk-global-overlay-wrapper {
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
`],encapsulation:2,changeDetection:0})}return e})(),hM=(()=>{class e{_platform=f(Ee);_containerElement;_document=f(F);_styleLoader=f(tt);constructor(){}ngOnDestroy(){this._containerElement?.remove()}getContainerElement(){return this._loadStyles(),this._containerElement||this._createContainer(),this._containerElement}_createContainer(){let t="cdk-overlay-container";if(this._platform.isBrowser||mf()){let o=this._document.querySelectorAll(`.${t}[platform="server"], .${t}[platform="test"]`);for(let i=0;i<o.length;i++)o[i].remove()}let r=this._document.createElement("div");r.classList.add(t),mf()?r.setAttribute("platform","test"):this._platform.isBrowser||r.setAttribute("platform","server"),this._document.body.appendChild(r),this._containerElement=r}_loadStyles(){this._styleLoader.load(Mb)}static \u0275fac=function(r){return new(r||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),Uf=class{_renderer;_ngZone;element;_cleanupClick;_cleanupTransitionEnd;_fallbackTimeout;constructor(n,t,r,o){this._renderer=t,this._ngZone=r,this.element=n.createElement("div"),this.element.classList.add("cdk-overlay-backdrop"),this._cleanupClick=t.listen(this.element,"click",o)}detach(){this._ngZone.runOutsideAngular(()=>{let n=this.element;clearTimeout(this._fallbackTimeout),this._cleanupTransitionEnd?.(),this._cleanupTransitionEnd=this._renderer.listen(n,"transitionend",this.dispose),this._fallbackTimeout=setTimeout(this.dispose,500),n.style.pointerEvents="none",n.classList.remove("cdk-overlay-backdrop-showing")})}dispose=()=>{clearTimeout(this._fallbackTimeout),this._cleanupClick?.(),this._cleanupTransitionEnd?.(),this._cleanupClick=this._cleanupTransitionEnd=this._fallbackTimeout=void 0,this.element.remove()}};function Sb(e){return e&&e.nodeType===1}var Il=class{_portalOutlet;_host;_pane;_config;_ngZone;_keyboardDispatcher;_document;_location;_outsideClickDispatcher;_animationsDisabled;_injector;_renderer;_backdropClick=new A;_attachments=new A;_detachments=new A;_positionStrategy;_scrollStrategy;_locationChanges=me.EMPTY;_backdropRef=null;_detachContentMutationObserver;_detachContentAfterRenderRef;_disposed=!1;_previousHostParent;_keydownEvents=new A;_outsidePointerEvents=new A;_afterNextRenderRef;constructor(n,t,r,o,i,s,a,l,c,d=!1,u,h){this._portalOutlet=n,this._host=t,this._pane=r,this._config=o,this._ngZone=i,this._keyboardDispatcher=s,this._document=a,this._location=l,this._outsideClickDispatcher=c,this._animationsDisabled=d,this._injector=u,this._renderer=h,o.scrollStrategy&&(this._scrollStrategy=o.scrollStrategy,this._scrollStrategy.attach(this)),this._positionStrategy=o.positionStrategy}get overlayElement(){return this._pane}get backdropElement(){return this._backdropRef?.element||null}get hostElement(){return this._host}get eventPredicate(){return this._config?.eventPredicate||null}attach(n){if(this._disposed)return null;this._attachHost();let t=this._portalOutlet.attach(n);return this._positionStrategy?.attach(this),this._updateStackingOrder(),this._updateElementSize(),this._updateElementDirection(),this._scrollStrategy&&this._scrollStrategy.enable(),this._afterNextRenderRef?.destroy(),this._afterNextRenderRef=qt(()=>{this.hasAttached()&&this.updatePosition()},{injector:this._injector}),this._togglePointerEvents(!0),this._config.hasBackdrop&&this._attachBackdrop(),this._config.panelClass&&this._toggleClasses(this._pane,this._config.panelClass,!0),this._attachments.next(),this._completeDetachContent(),this._keyboardDispatcher.add(this),this._config.disposeOnNavigation&&(this._locationChanges=this._location.subscribe(()=>this.dispose())),this._outsideClickDispatcher.add(this),typeof t?.onDestroy=="function"&&t.onDestroy(()=>{this.hasAttached()&&this._ngZone.runOutsideAngular(()=>Promise.resolve().then(()=>this.detach()))}),t}detach(){if(!this.hasAttached())return;this.detachBackdrop(),this._togglePointerEvents(!1),this._positionStrategy&&this._positionStrategy.detach&&this._positionStrategy.detach(),this._scrollStrategy&&this._scrollStrategy.disable();let n=this._portalOutlet.detach();return this._detachments.next(),this._completeDetachContent(),this._keyboardDispatcher.remove(this),this._detachContentWhenEmpty(),this._locationChanges.unsubscribe(),this._outsideClickDispatcher.remove(this),n}dispose(){if(this._disposed)return;let n=this.hasAttached();this._positionStrategy&&this._positionStrategy.dispose(),this._disposeScrollStrategy(),this._backdropRef?.dispose(),this._locationChanges.unsubscribe(),this._keyboardDispatcher.remove(this),this._portalOutlet.dispose(),this._attachments.complete(),this._backdropClick.complete(),this._keydownEvents.complete(),this._outsidePointerEvents.complete(),this._outsideClickDispatcher.remove(this),this._host?.remove(),this._afterNextRenderRef?.destroy(),this._previousHostParent=this._pane=this._host=this._backdropRef=null,n&&this._detachments.next(),this._detachments.complete(),this._completeDetachContent(),this._disposed=!0}hasAttached(){return this._portalOutlet.hasAttached()}backdropClick(){return this._backdropClick}attachments(){return this._attachments}detachments(){return this._detachments}keydownEvents(){return this._keydownEvents}outsidePointerEvents(){return this._outsidePointerEvents}getConfig(){return this._config}updatePosition(){this._positionStrategy&&this._positionStrategy.apply()}updatePositionStrategy(n){n!==this._positionStrategy&&(this._positionStrategy&&this._positionStrategy.dispose(),this._positionStrategy=n,this.hasAttached()&&(n.attach(this),this.updatePosition()))}updateSize(n){this._config=E(E({},this._config),n),this._updateElementSize()}setDirection(n){this._config=Z(E({},this._config),{direction:n}),this._updateElementDirection()}addPanelClass(n){this._pane&&this._toggleClasses(this._pane,n,!0)}removePanelClass(n){this._pane&&this._toggleClasses(this._pane,n,!1)}getDirection(){let n=this._config.direction;return n?typeof n=="string"?n:n.value:"ltr"}updateScrollStrategy(n){n!==this._scrollStrategy&&(this._disposeScrollStrategy(),this._scrollStrategy=n,this.hasAttached()&&(n.attach(this),n.enable()))}_updateElementDirection(){this._host.setAttribute("dir",this.getDirection())}_updateElementSize(){if(!this._pane)return;let n=this._pane.style;n.width=ur(this._config.width),n.height=ur(this._config.height),n.minWidth=ur(this._config.minWidth),n.minHeight=ur(this._config.minHeight),n.maxWidth=ur(this._config.maxWidth),n.maxHeight=ur(this._config.maxHeight)}_togglePointerEvents(n){this._pane.style.pointerEvents=n?"":"none"}_attachHost(){if(!this._host.parentElement){let n=this._config.usePopover?this._positionStrategy?.getPopoverInsertionPoint?.():null;Sb(n)?n.after(this._host):n?.type==="parent"?n.element.appendChild(this._host):this._previousHostParent?.appendChild(this._host)}if(this._config.usePopover)try{this._host.showPopover()}catch{}}_attachBackdrop(){let n="cdk-overlay-backdrop-showing";this._backdropRef?.dispose(),this._backdropRef=new Uf(this._document,this._renderer,this._ngZone,t=>{this._backdropClick.next(t)}),this._animationsDisabled&&this._backdropRef.element.classList.add("cdk-overlay-backdrop-noop-animation"),this._config.backdropClass&&this._toggleClasses(this._backdropRef.element,this._config.backdropClass,!0),this._config.usePopover?this._host.prepend(this._backdropRef.element):this._host.parentElement.insertBefore(this._backdropRef.element,this._host),!this._animationsDisabled&&typeof requestAnimationFrame<"u"?this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>this._backdropRef?.element.classList.add(n))}):this._backdropRef.element.classList.add(n)}_updateStackingOrder(){!this._config.usePopover&&this._host.nextSibling&&this._host.parentNode.appendChild(this._host)}detachBackdrop(){this._animationsDisabled?(this._backdropRef?.dispose(),this._backdropRef=null):this._backdropRef?.detach()}_toggleClasses(n,t,r){let o=Ei(t||[]).filter(i=>!!i);o.length&&(r?n.classList.add(...o):n.classList.remove(...o))}_detachContentWhenEmpty(){let n=!1;try{this._detachContentAfterRenderRef=qt(()=>{n=!0,this._detachContent()},{injector:this._injector})}catch(t){if(n)throw t;this._detachContent()}globalThis.MutationObserver&&this._pane&&(this._detachContentMutationObserver||=new globalThis.MutationObserver(()=>{this._detachContent()}),this._detachContentMutationObserver.observe(this._pane,{childList:!0}))}_detachContent(){(!this._pane||!this._host||this._pane.children.length===0)&&(this._pane&&this._config.panelClass&&this._toggleClasses(this._pane,this._config.panelClass,!1),this._host&&this._host.parentElement&&(this._previousHostParent=this._host.parentElement,this._host.remove()),this._completeDetachContent())}_completeDetachContent(){this._detachContentAfterRenderRef?.destroy(),this._detachContentAfterRenderRef=void 0,this._detachContentMutationObserver?.disconnect()}_disposeScrollStrategy(){let n=this._scrollStrategy;n?.disable(),n?.detach?.()}};var Cb="cdk-global-overlay-wrapper";function $f(e){return new Ml}var Ml=class{_overlayRef;_cssPosition="static";_topOffset="";_bottomOffset="";_alignItems="";_xPosition="";_xOffset="";_width="";_height="";_isDisposed=!1;attach(n){let t=n.getConfig();this._overlayRef=n,this._width&&!t.width&&n.updateSize({width:this._width}),this._height&&!t.height&&n.updateSize({height:this._height}),n.hostElement.classList.add(Cb),this._isDisposed=!1}top(n=""){return this._bottomOffset="",this._topOffset=n,this._alignItems="flex-start",this}left(n=""){return this._xOffset=n,this._xPosition="left",this}bottom(n=""){return this._topOffset="",this._bottomOffset=n,this._alignItems="flex-end",this}right(n=""){return this._xOffset=n,this._xPosition="right",this}start(n=""){return this._xOffset=n,this._xPosition="start",this}end(n=""){return this._xOffset=n,this._xPosition="end",this}width(n=""){return this._overlayRef?this._overlayRef.updateSize({width:n}):this._width=n,this}height(n=""){return this._overlayRef?this._overlayRef.updateSize({height:n}):this._height=n,this}centerHorizontally(n=""){return this.left(n),this._xPosition="center",this}centerVertically(n=""){return this.top(n),this._alignItems="center",this}apply(){if(!this._overlayRef||!this._overlayRef.hasAttached())return;let n=this._overlayRef.overlayElement.style,t=this._overlayRef.hostElement.style,r=this._overlayRef.getConfig(),{width:o,height:i,maxWidth:s,maxHeight:a}=r,l=(o==="100%"||o==="100vw")&&(!s||s==="100%"||s==="100vw"),c=(i==="100%"||i==="100vh")&&(!a||a==="100%"||a==="100vh"),d=this._xPosition,u=this._xOffset,h=this._overlayRef.getConfig().direction==="rtl",p="",m="",D="";l?D="flex-start":d==="center"?(D="center",h?m=u:p=u):h?d==="left"||d==="end"?(D="flex-end",p=u):(d==="right"||d==="start")&&(D="flex-start",m=u):d==="left"||d==="start"?(D="flex-start",p=u):(d==="right"||d==="end")&&(D="flex-end",m=u),n.position=this._cssPosition,n.marginLeft=l?"0":p,n.marginTop=c?"0":this._topOffset,n.marginBottom=this._bottomOffset,n.marginRight=l?"0":m,t.justifyContent=D,t.alignItems=c?"flex-start":this._alignItems}dispose(){if(this._isDisposed||!this._overlayRef)return;let n=this._overlayRef.overlayElement.style,t=this._overlayRef.hostElement,r=t.style;t.classList.remove(Cb),r.justifyContent=r.alignItems=n.marginTop=n.marginBottom=n.marginLeft=n.marginRight=n.position="",this._overlayRef=null,this._isDisposed=!0}};var Tb=new g("OVERLAY_DEFAULT_CONFIG");function zf(e,n){e.get(tt).load(Mb);let t=e.get(hM),r=e.get(F),o=e.get(Ve),i=e.get(Nt),s=e.get(dr),a=e.get(et,null,{optional:!0})||e.get(Te).createRenderer(null,null),l=new co(n),c=e.get(Tb,null,{optional:!0})?.usePopover??!0;l.direction=l.direction||s.value,"showPopover"in r.body?l.usePopover=n?.usePopover??c:l.usePopover=!1;let d=r.createElement("div"),u=r.createElement("div");d.id=o.getId("cdk-overlay-"),d.classList.add("cdk-overlay-pane"),u.appendChild(d),l.usePopover&&(u.setAttribute("popover","manual"),u.classList.add("cdk-overlay-popover"));let h=l.usePopover?l.positionStrategy?.getPopoverInsertionPoint?.():null;return Sb(h)?h.after(u):h?.type==="parent"?h.element.appendChild(u):t.getContainerElement().appendChild(u),new Il(new wl(d,i,e),u,d,l,e.get(N),e.get(xb),r,e.get(ja),e.get(Ib),n?.disableAnimations??e.get(Jo,null,{optional:!0})==="NoopAnimations",e.get(be),a)}function gM(e,n){if(e&1){let t=Qt();y(0,"div",1)(1,"button",2),ne("click",function(){xt(t);let o=V();return It(o.action())}),R(2),b()()}if(e&2){let t=V();_(2),kt(" ",t.data.action," ")}}var vM=["label"];function yM(e,n){}var bM=Math.pow(2,31)-1,Oi=class{_overlayRef;instance;containerInstance;_afterDismissed=new A;_afterOpened=new A;_onAction=new A;_durationTimeoutId;_dismissedByAction=!1;constructor(n,t){this._overlayRef=t,this.containerInstance=n,n._onExit.subscribe(()=>this._finishDismiss())}dismiss(){this._afterDismissed.closed||this.containerInstance.exit(),clearTimeout(this._durationTimeoutId)}dismissWithAction(){this._onAction.closed||(this._dismissedByAction=!0,this._onAction.next(),this._onAction.complete(),this.dismiss()),clearTimeout(this._durationTimeoutId)}closeWithAction(){this.dismissWithAction()}_dismissAfter(n){this._durationTimeoutId=setTimeout(()=>this.dismiss(),Math.min(n,bM))}_open(){this._afterOpened.closed||(this._afterOpened.next(),this._afterOpened.complete())}_finishDismiss(){this._overlayRef.dispose(),this._onAction.closed||this._onAction.complete(),this._afterDismissed.next({dismissedByAction:this._dismissedByAction}),this._afterDismissed.complete(),this._dismissedByAction=!1}afterDismissed(){return this._afterDismissed}afterOpened(){return this.containerInstance._onEnter}onAction(){return this._onAction}},Ab=new g("MatSnackBarData"),uo=class{politeness="polite";announcementMessage="";viewContainerRef;duration=0;panelClass;direction;data=null;horizontalPosition="center";verticalPosition="bottom"},_M=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275dir=W({type:e,selectors:[["","matSnackBarLabel",""]],hostAttrs:[1,"mat-mdc-snack-bar-label","mdc-snackbar__label"]})}return e})(),DM=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275dir=W({type:e,selectors:[["","matSnackBarActions",""]],hostAttrs:[1,"mat-mdc-snack-bar-actions","mdc-snackbar__actions"]})}return e})(),EM=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275dir=W({type:e,selectors:[["","matSnackBarAction",""]],hostAttrs:[1,"mat-mdc-snack-bar-action","mdc-snackbar__action"]})}return e})(),CM=(()=>{class e{snackBarRef=f(Oi);data=f(Ab);constructor(){}action(){this.snackBarRef.dismissWithAction()}get hasAction(){return!!this.data.action}static \u0275fac=function(r){return new(r||e)};static \u0275cmp=$({type:e,selectors:[["simple-snack-bar"]],hostAttrs:[1,"mat-mdc-simple-snack-bar"],exportAs:["matSnackBar"],decls:3,vars:2,consts:[["matSnackBarLabel",""],["matSnackBarActions",""],["matButton","","matSnackBarAction","",3,"click"]],template:function(r,o){r&1&&(y(0,"div",0),R(1),b(),j(2,gM,3,1,"div",1)),r&2&&(_(),kt(" ",o.data.message,`
`),_(),B(o.hasAction?2:-1))},dependencies:[_l,_M,DM,EM],styles:[`.mat-mdc-simple-snack-bar {
  display: flex;
}
.mat-mdc-simple-snack-bar .mat-mdc-snack-bar-label {
  max-height: 50vh;
  overflow: auto;
}
`],encapsulation:2,changeDetection:0})}return e})(),Gf="_mat-snack-bar-enter",Wf="_mat-snack-bar-exit",wM=(()=>{class e extends lo{_ngZone=f(N);_elementRef=f(Y);_changeDetectorRef=f(Kt);_platform=f(Ee);_animationsDisabled=je();snackBarConfig=f(uo);_document=f(F);_trackedModals=new Set;_enterFallback;_exitFallback;_injector=f(K);_announceDelay=150;_announceTimeoutId;_destroyed=!1;_portalOutlet;_onAnnounce=new A;_onExit=new A;_onEnter=new A;_animationState="void";_live;_label;_role;_liveElementId=f(Ve).getId("mat-snack-bar-container-live-");constructor(){super();let t=this.snackBarConfig;t.politeness==="assertive"&&!t.announcementMessage?this._live="assertive":t.politeness==="off"?this._live="off":this._live="polite",this._platform.FIREFOX&&(this._live==="polite"&&(this._role="status"),this._live==="assertive"&&(this._role="alert"))}attachComponentPortal(t){this._assertNotAttached();let r=this._portalOutlet.attachComponentPortal(t);return this._afterPortalAttached(),r}attachTemplatePortal(t){this._assertNotAttached();let r=this._portalOutlet.attachTemplatePortal(t);return this._afterPortalAttached(),r}attachDomPortal=t=>{this._assertNotAttached();let r=this._portalOutlet.attachDomPortal(t);return this._afterPortalAttached(),r};onAnimationEnd(t){t===Wf?this._completeExit():t===Gf&&(clearTimeout(this._enterFallback),this._ngZone.run(()=>{this._onEnter.next(),this._onEnter.complete()}))}enter(){this._destroyed||(this._animationState="visible",this._changeDetectorRef.markForCheck(),this._changeDetectorRef.detectChanges(),this._screenReaderAnnounce(),this._animationsDisabled?qt(()=>{this._ngZone.run(()=>queueMicrotask(()=>this.onAnimationEnd(Gf)))},{injector:this._injector}):(clearTimeout(this._enterFallback),this._enterFallback=setTimeout(()=>{this._elementRef.nativeElement.classList.add("mat-snack-bar-fallback-visible"),this.onAnimationEnd(Gf)},200)))}exit(){return this._destroyed?He(void 0):(this._ngZone.run(()=>{this._animationState="hidden",this._changeDetectorRef.markForCheck(),this._elementRef.nativeElement.setAttribute("mat-exit",""),clearTimeout(this._announceTimeoutId),this._animationsDisabled?qt(()=>{this._ngZone.run(()=>queueMicrotask(()=>this.onAnimationEnd(Wf)))},{injector:this._injector}):(clearTimeout(this._exitFallback),this._exitFallback=setTimeout(()=>this.onAnimationEnd(Wf),200))}),this._onExit)}ngOnDestroy(){this._destroyed=!0,this._clearFromModals(),this._completeExit()}_completeExit(){clearTimeout(this._exitFallback),queueMicrotask(()=>{this._onExit.next(),this._onExit.complete()})}_afterPortalAttached(){let t=this._elementRef.nativeElement,r=this.snackBarConfig.panelClass;r&&(Array.isArray(r)?r.forEach(s=>t.classList.add(s)):t.classList.add(r)),this._exposeToModals();let o=this._label.nativeElement,i="mdc-snackbar__label";o.classList.toggle(i,!o.querySelector(`.${i}`))}_exposeToModals(){let t=this._liveElementId,r=this._document.querySelectorAll('body > .cdk-overlay-container [aria-modal="true"]');for(let o=0;o<r.length;o++){let i=r[o],s=i.getAttribute("aria-owns");this._trackedModals.add(i),s?s.indexOf(t)===-1&&i.setAttribute("aria-owns",s+" "+t):i.setAttribute("aria-owns",t)}}_clearFromModals(){this._trackedModals.forEach(t=>{let r=t.getAttribute("aria-owns");if(r){let o=r.replace(this._liveElementId,"").trim();o.length>0?t.setAttribute("aria-owns",o):t.removeAttribute("aria-owns")}}),this._trackedModals.clear()}_assertNotAttached(){this._portalOutlet.hasAttached()}_screenReaderAnnounce(){this._announceTimeoutId||this._ngZone.runOutsideAngular(()=>{this._announceTimeoutId=setTimeout(()=>{if(this._destroyed)return;let t=this._elementRef.nativeElement,r=t.querySelector("[aria-hidden]"),o=t.querySelector("[aria-live]");if(r&&o){let i=null;this._platform.isBrowser&&document.activeElement instanceof HTMLElement&&r.contains(document.activeElement)&&(i=document.activeElement),r.removeAttribute("aria-hidden"),o.appendChild(r),i?.focus(),this._onAnnounce.next(),this._onAnnounce.complete()}},this._announceDelay)})}static \u0275fac=function(r){return new(r||e)};static \u0275cmp=$({type:e,selectors:[["mat-snack-bar-container"]],viewQuery:function(r,o){if(r&1&&gt(Hf,7)(vM,7),r&2){let i;pe(i=he())&&(o._portalOutlet=i.first),pe(i=he())&&(o._label=i.first)}},hostAttrs:[1,"mdc-snackbar","mat-mdc-snack-bar-container"],hostVars:6,hostBindings:function(r,o){r&1&&ne("animationend",function(s){return o.onAnimationEnd(s.animationName)})("animationcancel",function(s){return o.onAnimationEnd(s.animationName)}),r&2&&U("mat-snack-bar-container-enter",o._animationState==="visible")("mat-snack-bar-container-exit",o._animationState==="hidden")("mat-snack-bar-container-animations-enabled",!o._animationsDisabled)},features:[Le],decls:6,vars:3,consts:[["label",""],[1,"mdc-snackbar__surface","mat-mdc-snackbar-surface"],[1,"mat-mdc-snack-bar-label"],["aria-hidden","true"],["cdkPortalOutlet",""]],template:function(r,o){r&1&&(y(0,"div",1)(1,"div",2,0)(3,"div",3),gn(4,yM,0,0,"ng-template",4),b(),re(5,"div"),b()()),r&2&&(_(5),le("aria-live",o._live)("role",o._role)("id",o._liveElementId))},dependencies:[Hf],styles:[`@keyframes _mat-snack-bar-enter {
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
`],encapsulation:2})}return e})(),xM=new g("mat-snack-bar-default-options",{providedIn:"root",factory:()=>new uo}),Sl=(()=>{class e{_live=f(pf);_injector=f(K);_breakpointObserver=f(ff);_parentSnackBar=f(e,{optional:!0,skipSelf:!0});_defaultConfig=f(xM);_animationsDisabled=je();_snackBarRefAtThisLevel=null;simpleSnackBarComponent=CM;snackBarContainerComponent=wM;handsetCssClass="mat-mdc-snack-bar-handset";get _openedSnackBarRef(){let t=this._parentSnackBar;return t?t._openedSnackBarRef:this._snackBarRefAtThisLevel}set _openedSnackBarRef(t){this._parentSnackBar?this._parentSnackBar._openedSnackBarRef=t:this._snackBarRefAtThisLevel=t}constructor(){}openFromComponent(t,r){return this._attach(t,r)}openFromTemplate(t,r){return this._attach(t,r)}open(t,r="",o){let i=E(E({},this._defaultConfig),o);return i.data={message:t,action:r},i.announcementMessage===t&&(i.announcementMessage=void 0),this.openFromComponent(this.simpleSnackBarComponent,i)}dismiss(){this._openedSnackBarRef&&this._openedSnackBarRef.dismiss()}ngOnDestroy(){this._snackBarRefAtThisLevel&&this._snackBarRefAtThisLevel.dismiss()}_attachSnackBarContainer(t,r){let o=r&&r.viewContainerRef&&r.viewContainerRef.injector,i=K.create({parent:o||this._injector,providers:[{provide:uo,useValue:r}]}),s=new so(this.snackBarContainerComponent,r.viewContainerRef,i),a=t.attach(s);return a.instance.snackBarConfig=r,a.instance}_attach(t,r){let o=E(E(E({},new uo),this._defaultConfig),r),i=this._createOverlay(o),s=this._attachSnackBarContainer(i,o),a=new Oi(s,i);if(t instanceof At){let l=new ao(t,null,{$implicit:o.data,snackBarRef:a});a.instance=s.attachTemplatePortal(l)}else{let l=this._createInjector(o,a),c=new so(t,void 0,l),d=s.attachComponentPortal(c);a.instance=d.instance}return this._breakpointObserver.observe(cy.HandsetPortrait).pipe(st(i.detachments())).subscribe(l=>{i.overlayElement.classList.toggle(this.handsetCssClass,l.matches)}),o.announcementMessage&&s._onAnnounce.subscribe(()=>{this._live.announce(o.announcementMessage,o.politeness)}),this._animateSnackBar(a,o),this._openedSnackBarRef=a,this._openedSnackBarRef}_animateSnackBar(t,r){t.afterDismissed().subscribe(()=>{this._openedSnackBarRef==t&&(this._openedSnackBarRef=null),r.announcementMessage&&this._live.clear()}),r.duration&&r.duration>0&&t.afterOpened().subscribe(()=>t._dismissAfter(r.duration)),this._openedSnackBarRef?(this._openedSnackBarRef.afterDismissed().subscribe(()=>{t.containerInstance.enter()}),this._openedSnackBarRef.dismiss()):t.containerInstance.enter()}_createOverlay(t){let r=new co;r.direction=t.direction;let o=$f(this._injector),i=t.direction==="rtl",s=t.horizontalPosition==="left"||t.horizontalPosition==="start"&&!i||t.horizontalPosition==="end"&&i,a=!s&&t.horizontalPosition!=="center";return s?o.left("0"):a?o.right("0"):o.centerHorizontally(),t.verticalPosition==="top"?o.top("0"):o.bottom("0"),r.positionStrategy=o,r.disableAnimations=this._animationsDisabled,zf(this._injector,r)}_createInjector(t,r){let o=t&&t.viewContainerRef&&t.viewContainerRef.injector;return K.create({parent:o||this._injector,providers:[{provide:Oi,useValue:r},{provide:Ab,useValue:t.data}]})}static \u0275fac=function(r){return new(r||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var fo=class e{constructor(n){this.http=n}addToPlaylist(n){return this.http.post("/api/clementine/add",{filePaths:n})}static \u0275fac=function(t){return new(t||e)(x(En))};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})};function IM(e,n){if(e&1){let t=Qt();y(0,"img",12),ne("error",function(){xt(t);let o=V();return It(o.onArtError())}),b()}if(e&2){let t=V();ce("src",t.suggestion().albumArtUrl,ya)("alt",t.suggestion().album||t.suggestion().title)}}function MM(e,n){e&1&&(y(0,"div",3)(1,"mat-icon",13),R(2,"album"),b()())}function SM(e,n){if(e&1){let t=Qt();y(0,"button",14),ne("click",function(o){return xt(t),V().copyToClipboard(),It(o.stopPropagation())}),y(1,"mat-icon"),R(2,"content_copy"),b()()}if(e&2){let t=V();le("aria-label","Copy "+t.suggestion().artist+" \u2013 "+t.suggestion().title+" to clipboard")}}function TM(e,n){if(e&1&&(y(0,"a",15),ne("click",function(r){return r.stopPropagation()}),re(1,"img",16),y(2,"span"),R(3,"YouTube"),b()()),e&2){let t=V();ce("href",t.youtubeUrl(),ya),le("aria-label","Search "+t.suggestion().artist+" \u2013 "+t.suggestion().title+" on YouTube")}}function AM(e,n){if(e&1){let t=Qt();y(0,"button",17),ne("click",function(o){return xt(t),V().addToClementine(),It(o.stopPropagation())}),re(1,"img",18),b()}if(e&2){let t=V();ce("disabled",t.addingToPlaylist()),le("aria-label","Add "+t.suggestion().artist+" \u2013 "+t.suggestion().title+" to Clementine playlist")}}var Tl=class e{constructor(n,t){this.snackBar=n;this.playlistService=t}suggestion=bn.required();addingToPlaylist=H(!1);artFailed=H(!1);hasArt=Re(()=>!!this.suggestion().albumArtUrl&&!this.artFailed());youtubeUrl=Re(()=>`https://www.youtube.com/results?search_query=${encodeURIComponent(`${this.suggestion().artist} ${this.suggestion().title}`)}`);onArtError(){this.artFailed.set(!0)}copyToClipboard(){let n=this.suggestion(),t=`${n.artist} \u2013 ${n.title}`;navigator.clipboard.writeText(t).then(()=>this.snackBar.open(`Copied: ${t}`,void 0,{duration:2e3}),()=>this.snackBar.open("Could not copy to clipboard","Dismiss",{duration:4e3}))}addToClementine(){let n=this.suggestion();!n.filePath||this.addingToPlaylist()||(this.addingToPlaylist.set(!0),this.playlistService.addToPlaylist([n.filePath]).subscribe({next:()=>{this.snackBar.open(`Added to Clementine: ${n.artist} \u2013 ${n.title}`,void 0,{duration:2e3}),this.addingToPlaylist.set(!1)},error:()=>{this.snackBar.open("Could not add to Clementine playlist","Dismiss",{duration:4e3}),this.addingToPlaylist.set(!1)}}))}static \u0275fac=function(t){return new(t||e)(fe(Sl),fe(fo))};static \u0275cmp=$({type:e,selectors:[["app-suggestion-card"]],inputs:{suggestion:[1,"suggestion"]},decls:15,vars:13,consts:[[1,"tile"],[1,"tile-art"],[1,"art-img",3,"src","alt"],[1,"art-placeholder"],["mat-icon-button","",1,"art-overlay-btn"],[1,"tile-info"],[1,"tile-title"],[1,"tile-artist"],[1,"tile-album"],[1,"tile-footer"],["target","_blank","rel","noopener noreferrer",1,"footer-action","footer-action--link",3,"href"],["mat-icon-button","",1,"footer-action","footer-action--btn",3,"disabled"],[1,"art-img",3,"error","src","alt"],["aria-hidden","true"],["mat-icon-button","",1,"art-overlay-btn",3,"click"],["target","_blank","rel","noopener noreferrer",1,"footer-action","footer-action--link",3,"click","href"],["src","/icons/youtube.svg","alt","","aria-hidden","true",1,"footer-icon"],["mat-icon-button","",1,"footer-action","footer-action--btn",3,"click","disabled"],["src","/icons/clementine_addmore.png","alt","","aria-hidden","true",1,"footer-icon"]],template:function(t,r){t&1&&(y(0,"div",0)(1,"div",1),j(2,IM,1,2,"img",2)(3,MM,3,0,"div",3),j(4,SM,3,1,"button",4),b(),y(5,"div",5)(6,"span",6),R(7),b(),y(8,"span",7),R(9),b(),y(10,"span",8),R(11),b()(),y(12,"div",9),j(13,TM,4,2,"a",10),j(14,AM,2,2,"button",11),b()()),t&2&&(U("tile--local",r.suggestion().inLocalLibrary)("tile--discovery",!r.suggestion().inLocalLibrary),_(2),B(r.hasArt()?2:3),_(2),B(r.suggestion().inLocalLibrary?4:-1),_(3),Me(r.suggestion().title),_(2),Me(r.suggestion().artist),_(),Ra("visibility",r.suggestion().album?"visible":"hidden"),_(),kt(" ",r.suggestion().album||"\xA0"," "),_(2),B(r.suggestion().inLocalLibrary?-1:13),_(),B(r.suggestion().inLocalLibrary?14:-1))},dependencies:[io,oo,fr,Ff],styles:[".tile[_ngcontent-%COMP%]{width:100%;display:flex;flex-direction:column;border-radius:10px;overflow:hidden;background:var(--reco-surface-1);border:2px solid var(--reco-accent);transition:transform .18s ease,box-shadow .18s ease;cursor:default}.tile--local[_ngcontent-%COMP%]{box-shadow:0 0 0 0 var(--reco-accent-dim)}.tile--discovery[_ngcontent-%COMP%]{border-color:#c8006b47;box-shadow:0 0 0 0 var(--reco-accent-dim)}.tile--discovery[_ngcontent-%COMP%]   .tile-art[_ngcontent-%COMP%], .tile--discovery[_ngcontent-%COMP%]   .tile-info[_ngcontent-%COMP%]{opacity:.22}.tile[_ngcontent-%COMP%]:hover{transform:translateY(-3px);box-shadow:0 6px 20px var(--reco-accent-dim)}.tile[_ngcontent-%COMP%]:hover   .art-overlay-btn[_ngcontent-%COMP%]{opacity:1}.tile-art[_ngcontent-%COMP%]{position:relative;width:100%;aspect-ratio:1;overflow:hidden;background:var(--reco-surface-2);flex-shrink:0}.art-img[_ngcontent-%COMP%]{width:100%;height:100%;object-fit:cover;display:block}.art-placeholder[_ngcontent-%COMP%]{width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:var(--reco-text-disabled)}.art-placeholder[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:48px;width:48px;height:48px}.art-overlay-btn[_ngcontent-%COMP%]{position:absolute;bottom:4px;left:4px;width:28px;height:28px;border-radius:6px;background:#0000008c;color:var(--reco-accent);opacity:0;transition:opacity .15s ease;--mdc-icon-button-icon-size: 14px;--mdc-icon-button-state-layer-size: 28px}.art-overlay-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:14px;width:14px;height:14px}.tile-info[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:2px;padding:8px 10px 4px;min-height:0}.tile-title[_ngcontent-%COMP%]{font-family:var(--reco-font);font-size:.8rem;font-weight:600;color:var(--reco-accent);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.tile-artist[_ngcontent-%COMP%]{font-family:var(--reco-font);font-size:.72rem;color:var(--reco-text-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.tile-album[_ngcontent-%COMP%]{font-family:var(--reco-font);font-size:.68rem;color:var(--reco-text-disabled);font-style:italic;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.tile-footer[_ngcontent-%COMP%]{display:flex;align-items:center;padding:2px 6px 6px;min-height:32px}.footer-action[_ngcontent-%COMP%]{display:flex;align-items:center;gap:4px;font-family:var(--reco-font);font-size:.68rem;font-weight:500;opacity:.6;transition:opacity .15s ease;text-decoration:none}.footer-action[_ngcontent-%COMP%]:hover{opacity:1}.footer-action--link[_ngcontent-%COMP%]{color:var(--reco-text-muted)}.footer-action--btn[_ngcontent-%COMP%]{color:var(--reco-accent);--mdc-icon-button-icon-size: 16px;--mdc-icon-button-state-layer-size: 28px}.footer-action--btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:16px;width:16px;height:16px}.footer-action--btn[disabled][_ngcontent-%COMP%]{opacity:.25}.footer-icon[_ngcontent-%COMP%]{width:16px;height:16px;flex-shrink:0}"]})};var NM=(e,n)=>n.title+n.artist;function kM(e,n){e&1&&(y(0,"div",4),re(1,"span")(2,"span")(3,"span")(4,"span"),b())}function RM(e,n){if(e&1){let t=Qt();y(0,"button",9),ne("click",function(){xt(t);let o=V();return It(o.addAllToClementine())}),re(1,"img",10),R(2),b()}if(e&2){let t=V();ce("disabled",t.addingAll()),le("aria-label","Add all "+t.localFilePaths().length+" local tracks to Clementine playlist"),_(2),kt(" Add ",t.localFilePaths().length," to Clementine ")}}function OM(e,n){if(e&1&&(y(0,"div",6)(1,"span"),R(2),b()()),e&2){let t=V();_(2),Me(t.loadingLabel())}}function FM(e,n){e&1&&(y(0,"div",7)(1,"mat-icon",2),R(2,"warning_amber"),b(),y(3,"span"),R(4,"Suggestions unavailable right now."),b()())}function PM(e,n){if(e&1&&(y(0,"div",8)(1,"mat-icon",2),R(2,"search_off"),b(),y(3,"span"),R(4),b()()),e&2){let t=V();_(4),Me(t.message())}}function LM(e,n){if(e&1&&(y(0,"div",12),re(1,"app-suggestion-card",14),b()),e&2){let t=n.$implicit;_(),ce("suggestion",t)}}function VM(e,n){if(e&1&&(y(0,"p",13),R(1),b()),e&2){let t=V(2);_(),Me(t.message())}}function jM(e,n){if(e&1&&(y(0,"div",11),oi(1,LM,2,1,"div",12,NM),b(),j(3,VM,2,1,"p",13)),e&2){let t=V();_(),ii(t.suggestions()),_(2),B(t.message()?3:-1)}}var Al=class e{constructor(n,t){this.playlistService=n;this.snackBar=t}suggestions=bn([]);loading=bn(!1);error=bn(!1);message=bn(null);loadingLabel=bn("Searching your library\u2026");addingAll=H(!1);localFilePaths=Re(()=>this.suggestions().filter(n=>n.inLocalLibrary&&n.filePath).map(n=>n.filePath));addAllToClementine(){let n=this.localFilePaths();n.length===0||this.addingAll()||(this.addingAll.set(!0),this.playlistService.addToPlaylist(n).subscribe({next:()=>{this.snackBar.open(`Added ${n.length} track(s) to Clementine`,void 0,{duration:2500}),this.addingAll.set(!1)},error:()=>{this.snackBar.open("Could not add tracks to Clementine","Dismiss",{duration:4e3}),this.addingAll.set(!1)}}))}static \u0275fac=function(t){return new(t||e)(fe(fo),fe(Sl))};static \u0275cmp=$({type:e,selectors:[["app-suggestions-panel"]],inputs:{suggestions:[1,"suggestions"],loading:[1,"loading"],error:[1,"error"],message:[1,"message"],loadingLabel:[1,"loadingLabel"]},decls:12,vars:3,consts:[["aria-label","Track suggestions",1,"suggestions-panel"],[1,"panel-header"],["aria-hidden","true"],[1,"panel-title"],["role","status","aria-label","Loading suggestions",1,"music-bars"],["mat-stroked-button","",1,"add-all-btn",3,"disabled"],["aria-live","polite",1,"panel-state","panel-state--loading"],["role","alert",1,"panel-state","panel-state--error"],[1,"panel-state","panel-state--empty"],["mat-stroked-button","",1,"add-all-btn",3,"click","disabled"],["src","/icons/clementine_addmore.png","alt","","aria-hidden","true",1,"add-all-icon"],["role","list",1,"track-list"],["role","listitem"],[1,"panel-note"],[3,"suggestion"]],template:function(t,r){t&1&&(y(0,"section",0)(1,"div",1)(2,"mat-icon",2),R(3,"queue_music"),b(),y(4,"span",3),R(5,"What I hear in your words"),b(),j(6,kM,5,0,"div",4),j(7,RM,3,3,"button",5),b(),j(8,OM,3,1,"div",6)(9,FM,5,0,"div",7)(10,PM,5,1,"div",8)(11,jM,4,1),b()),t&2&&(_(6),B(r.loading()?6:-1),_(),B(r.localFilePaths().length>0?7:-1),_(),B(r.loading()&&r.suggestions().length===0?8:r.error()?9:r.suggestions().length===0&&r.message()?10:r.suggestions().length>0?11:-1))},dependencies:[io,oo,fr,_l,Tl],styles:["[_nghost-%COMP%]{display:block;background:var(--reco-surface-0);flex-shrink:0}.suggestions-panel[_ngcontent-%COMP%]{padding:12px 16px 14px}.panel-header[_ngcontent-%COMP%]{display:flex;align-items:center;gap:6px;margin-bottom:12px;color:var(--reco-text-muted);font-family:var(--reco-font);font-size:.72rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase}.panel-title[_ngcontent-%COMP%]{flex:1}.music-bars[_ngcontent-%COMP%]{display:inline-flex;align-items:flex-end;gap:2px;height:14px;margin-left:4px}.music-bars[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{display:block;width:3px;background:var(--reco-primary);border-radius:1px;animation:_ngcontent-%COMP%_bar-dance .9s ease-in-out infinite}.music-bars[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(1){animation-delay:0s}.music-bars[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(2){animation-delay:.2s}.music-bars[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(3){animation-delay:.4s}.music-bars[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(4){animation-delay:.6s}@keyframes _ngcontent-%COMP%_bar-dance{0%,to{height:3px}50%{height:14px}}.add-all-btn[_ngcontent-%COMP%]{--mat-button-outlined-label-text-color: var(--reco-accent);--mat-button-outlined-outline-color: var(--reco-accent);font-family:var(--reco-font);font-size:.72rem;font-weight:500;height:28px;line-height:28px;padding:0 10px;color:var(--reco-accent);border-color:var(--reco-accent)!important}.add-all-btn[_ngcontent-%COMP%]   .add-all-icon[_ngcontent-%COMP%]{width:15px;height:15px;margin-right:4px;flex-shrink:0;vertical-align:middle}.add-all-btn[disabled][_ngcontent-%COMP%]{opacity:.4}.panel-state[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;padding:10px 4px;font-family:var(--reco-font);font-size:.875rem;color:var(--reco-text-muted)}.panel-state--error[_ngcontent-%COMP%]{color:var(--reco-error)}.panel-state--loading[_ngcontent-%COMP%]{font-style:italic;color:var(--reco-primary)}.track-list[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}@media(max-width:767px){.track-list[_ngcontent-%COMP%]{grid-template-columns:1fr}}.panel-note[_ngcontent-%COMP%]{margin:10px 4px 0;font-family:var(--reco-font);font-size:.72rem;font-style:italic;color:var(--reco-text-muted)}"]})};var Nl=class e{constructor(n){this.sanitizer=n}transform(n){let r=n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>").replace(/\*\*(.+?)\*\*/gs,"<strong>$1</strong>");return this.sanitizer.bypassSecurityTrustHtml(r)}static \u0275fac=function(t){return new(t||e)(fe(ar,16))};static \u0275pipe=Sa({name:"boldMarkdown",type:e,pure:!0})};var kl=class e{constructor(n){this.http=n}getRecommendations(n,t,r="gemini"){return this.http.post("/api/recommendations",{prompt:n,history:t,provider:r})}static \u0275fac=function(t){return new(t||e)(x(En))};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})};var HM=["messageList"];function UM(e,n){e&1&&(y(0,"div",12)(1,"mat-icon",27),R(2,"cloud"),b(),y(3,"span"),R(4,"Inner Voice unavailable \u2014 Cosmic Voice stepped in"),b()())}function $M(e,n){if(e&1&&(y(0,"p",30),R(1),b()),e&2){let t=V(2);_(),Me(t.tryLineHint())}}function zM(e,n){if(e&1&&(y(0,"div",16),re(1,"img",28),y(2,"p",29),R(3,"What does your mind sound like today?"),b(),j(4,$M,2,1,"p",30),b()),e&2){let t=V();_(4),B(t.tryLineHint()?4:-1)}}function GM(e,n){if(e&1&&(re(0,"div",32),Vu(1,"boldMarkdown")),e&2){let t=V().$implicit;ce("innerHTML",ju(1,1,t.text),hu)}}function WM(e,n){if(e&1&&(y(0,"div",33),R(1),b()),e&2){let t=V().$implicit;_(),Me(t.text)}}function qM(e,n){if(e&1&&(y(0,"div",31),j(1,GM,2,3,"div",32)(2,WM,2,1,"div",33),b()),e&2){let t=n.$implicit;U("message--user",t.role==="user")("message--model",t.role==="model"),_(),B(t.role==="model"?1:2)}}function YM(e,n){if(e&1&&(y(0,"div",18)(1,"div",34)(2,"mat-icon",35),R(3,"music_note"),b(),y(4,"span",36),R(5),b()()()),e&2){let t=V();_(5),Me(t.loadingPhrase())}}function ZM(e,n){if(e&1&&(y(0,"div",37)(1,"mat-icon",27),R(2),b(),y(3,"span"),R(4),b()()),e&2){let t=V();U("error-banner--rate-limit",t.errorIsRateLimit()),_(2),Me(t.errorIsRateLimit()?"schedule":"error_outline"),_(2),Me(t.error())}}function QM(e,n){if(e&1&&re(0,"app-suggestions-panel",25),e&2){let t=V();ce("suggestions",t.suggestions())("loading",t.suggestionsLoading())("error",t.suggestionsError())("message",t.suggestionsMessage())("loadingLabel",t.loadingPhrase())}}function KM(e,n){if(e&1&&(y(0,"p",38),R(1),b()),e&2){let t=V(2);_(),Me(t.loadingPhrase())}}function XM(e,n){e&1&&(y(0,"p"),R(1,"This is where your mind's music will take shape."),b())}function JM(e,n){if(e&1&&(y(0,"div",26)(1,"mat-icon",27),R(2,"queue_music"),b(),j(3,KM,2,1,"p",38)(4,XM,2,0,"p"),b()),e&2){let t=V();_(3),B(t.loading()?3:4)}}var Rb="reco-provider",qf=["Holding the note","Staying on the downbeat","Lingering in the intro","Looping the pre\u2011chorus","Riding the sustain pedal","Tuning up forever","Hovering on the fermata","Chilling in the green room","Stuck in soundcheck mode","Spinning the vinyl before the needle drops","Hanging on the last chord","Paused between tracks","Letting the beat simmer","Idling in the bridge","Waiting for the bass to kick in","Floating in reverb","Queued in the playlist","Stuck in the encore gap","Listening to the orchestra warm up","Waiting for the DJ to unmute"],Rl=class e{constructor(n){this.recommendationService=n;Qn(()=>{this.loading()?this.typewriterStart(this.randomPhrase()):this.typewriterStop()})}messageListRef;messages=H([]);prompt=H("");loading=H(!1);error=H(null);errorIsRateLimit=H(!1);suggestions=H([]);suggestionsLoading=H(!1);suggestionsError=H(!1);suggestionsMessage=H(null);hasSuggestions=H(!1);loadingPhrase=H(qf[0]);tryLineHint=H("");provider=H(localStorage.getItem(Rb)??"gemini");usedFallback=H(!1);history=[];shouldScroll=!1;typewriterTimeout=null;fallbackTimer=null;HISTORY_LIMIT=50;promptHistory=[];historyIndex=-1;currentDraft="";isHintPreview=H(!1);async ngOnInit(){try{let r=(await(await fetch("/trylines.txt")).text()).split(`
`).map(o=>o.trim()).filter(o=>o.length>0);r.length>0&&this.tryLineHint.set(r[Math.floor(Math.random()*r.length)])}catch{}}ngOnDestroy(){this.typewriterStop(),this.fallbackTimer!==null&&clearTimeout(this.fallbackTimer)}ngAfterViewChecked(){this.shouldScroll&&(this.scrollToBottom(),this.shouldScroll=!1)}setProvider(n){this.provider.set(n),localStorage.setItem(Rb,n)}send(){let n=this.prompt().trim();!n||this.loading()||(this.messages.update(t=>[...t,{role:"user",text:n}]),this.promptHistory[this.promptHistory.length-1]!==n&&(this.promptHistory.push(n),this.promptHistory.length>this.HISTORY_LIMIT&&this.promptHistory.shift()),this.historyIndex=-1,this.currentDraft="",this.prompt.set(""),this.loading.set(!0),this.error.set(null),this.errorIsRateLimit.set(!1),this.usedFallback.set(!1),this.shouldScroll=!0,this.suggestionsLoading.set(!0),this.suggestionsError.set(!1),this.suggestionsMessage.set(null),this.hasSuggestions.set(!0),this.recommendationService.getRecommendations(n,this.history,this.provider()).subscribe({next:t=>{this.messages.update(r=>[...r,{role:"model",text:t.narrative}]),this.history=t.history,this.suggestions.set(t.suggestions),this.suggestionsMessage.set(t.message),this.loading.set(!1),this.suggestionsLoading.set(!1),this.shouldScroll=!0,t.usedFallback&&(this.usedFallback.set(!0),this.fallbackTimer!==null&&clearTimeout(this.fallbackTimer),this.fallbackTimer=setTimeout(()=>this.usedFallback.set(!1),8e3))},error:t=>{let r=t.status===429;this.errorIsRateLimit.set(r),this.error.set(t.error?.error??"Something went wrong. Please try again."),this.loading.set(!1),this.suggestionsError.set(!0),this.suggestionsLoading.set(!1)}}))}onKeydown(n){if(n.key==="Enter"&&!n.shiftKey){n.preventDefault(),this.send();return}if(n.key==="ArrowUp"){if(this.promptHistory.length===0)return;n.preventDefault(),this.historyIndex===-1&&(this.currentDraft=this.isHintPreview()?"":this.prompt(),this.isHintPreview.set(!1)),this.historyIndex=this.historyIndex===-1?this.promptHistory.length-1:Math.max(0,this.historyIndex-1),this.prompt.set(this.promptHistory[this.historyIndex]);return}if(n.key==="ArrowDown"){if(this.historyIndex===-1)return;n.preventDefault(),this.historyIndex++,this.historyIndex>=this.promptHistory.length?(this.historyIndex=-1,this.prompt.set(this.currentDraft)):this.prompt.set(this.promptHistory[this.historyIndex]);return}}onFocus(n){!this.prompt().trim()&&this.tryLineHint()&&(this.prompt.set(this.tryLineHint()),this.isHintPreview.set(!0))}onBlur(){this.isHintPreview()&&(this.prompt.set(""),this.isHintPreview.set(!1))}updatePrompt(n){this.historyIndex=-1;let t=n.target;if(this.isHintPreview()){let o=n,i=o.inputType?.startsWith("insert")?o.data??"":"";i?(this.isHintPreview.set(!1),this.prompt.set(i),t.value=i):t.value=this.tryLineHint();return}let r=t.value;r===""&&this.tryLineHint()?(this.prompt.set(this.tryLineHint()),this.isHintPreview.set(!0)):(this.isHintPreview.set(!1),this.prompt.set(r))}typewriterStart(n){this.typewriterStop(),this.typeChar(n,0)}typeChar(n,t){this.loadingPhrase.set(n.slice(0,t)),t<n.length?this.typewriterTimeout=setTimeout(()=>this.typeChar(n,t+1),45):this.typewriterTimeout=setTimeout(()=>this.typewriterStart(this.randomPhrase()),1e3)}typewriterStop(){this.typewriterTimeout!==null&&(clearTimeout(this.typewriterTimeout),this.typewriterTimeout=null)}randomPhrase(){return qf[Math.floor(Math.random()*qf.length)]}scrollToBottom(){let n=this.messageListRef?.nativeElement;n&&(n.scrollTop=n.scrollHeight)}static \u0275fac=function(t){return new(t||e)(fe(kl))};static \u0275cmp=$({type:e,selectors:[["app-chat"]],viewQuery:function(t,r){if(t&1&&gt(HM,5),t&2){let o;pe(o=he())&&(r.messageListRef=o.first)}},decls:37,vars:11,consts:[["messageList",""],[1,"page-shell"],[1,"chat-header"],["src","logo.png","alt","Reasonic",1,"header-logo"],[1,"chat-title-group"],[1,"chat-title"],[1,"chat-tagline"],["aria-label","AI provider",1,"provider-toggle",3,"change","value"],["value","inner-whisper","aria-label","Use local llama model (Inner Whisper)"],["value","inner-shout","aria-label","Use local Gemma model (Inner Shout)"],["value","gemini","aria-label","Use Gemini cloud model (Cosmic Voice)"],["src","/icons/gemini.svg","alt","","aria-hidden","true",1,"provider-icon"],["role","status","aria-live","polite",1,"fallback-chip"],[1,"split-layout"],["aria-label","Conversation",1,"pane","pane--chat"],[1,"message-list"],[1,"empty-state"],[1,"message",3,"message--user","message--model"],[1,"message","message--model"],["role","alert",1,"error-banner",3,"error-banner--rate-limit"],[1,"input-area"],["appearance","outline","subscriptSizing","dynamic",1,"prompt-field"],["matInput","","placeholder","e.g. Recommend some melancholic jazz from the 60s","aria-label","Music prompt",3,"input","keydown","focus","blur","value","disabled"],["mat-fab","","aria-label","Send message",3,"click","disabled"],["aria-label","Recommendations",1,"pane","pane--reco"],[3,"suggestions","loading","error","message","loadingLabel"],[1,"reco-empty-state"],["aria-hidden","true"],["src","logo.png","aria-hidden","true","alt","",1,"empty-logo"],[1,"empty-prompt"],[1,"empty-hint"],[1,"message"],[1,"message-bubble",3,"innerHTML"],[1,"message-bubble"],["role","status","aria-live","polite",1,"message-bubble","message-bubble--loading"],["aria-hidden","true",1,"loading-icon"],[1,"loading-phrase"],["role","alert",1,"error-banner"],["role","status","aria-live","polite",1,"reco-loading-text"]],template:function(t,r){t&1&&(y(0,"div",1)(1,"header",2),re(2,"img",3),y(3,"div",4)(4,"span",5),R(5,"Reasonic"),b(),y(6,"p",6),R(7,"The music hiding in your mind"),b()(),y(8,"mat-button-toggle-group",7),ne("change",function(i){return r.setProvider(i.value)}),y(9,"mat-button-toggle",8),R(10," Inner Whisper "),b(),y(11,"mat-button-toggle",9),R(12," Inner Shout "),b(),y(13,"mat-button-toggle",10),re(14,"img",11),R(15," Cosmic Voice "),b()()(),j(16,UM,5,0,"div",12),y(17,"div",13)(18,"section",14)(19,"div",15,0),j(21,zM,5,1,"div",16),oi(22,qM,3,5,"div",17,Lu),j(24,YM,6,1,"div",18),j(25,ZM,5,4,"div",19),b(),y(26,"div",20)(27,"mat-form-field",21)(28,"mat-label"),R(29,"Speak your mind if you want to hear me"),b(),y(30,"input",22),ne("input",function(i){return r.updatePrompt(i)})("keydown",function(i){return r.onKeydown(i)})("focus",function(i){return r.onFocus(i)})("blur",function(){return r.onBlur()}),b()(),y(31,"button",23),ne("click",function(){return r.send()}),y(32,"mat-icon"),R(33,"send"),b()()()(),y(34,"section",24),j(35,QM,1,5,"app-suggestions-panel",25)(36,JM,5,1,"div",26),b()()()),t&2&&(_(8),ce("value",r.provider()),_(8),B(r.usedFallback()?16:-1),_(5),B(r.messages().length===0&&!r.loading()?21:-1),_(),ii(r.messages()),_(2),B(r.loading()?24:-1),_(),B(r.error()?25:-1),_(2),U("prompt-field--hint",r.isHintPreview()),_(3),ce("value",r.prompt())("disabled",r.loading()),_(),ce("disabled",!r.prompt().trim()||r.loading()||r.isHintPreview()),_(4),B(r.hasSuggestions()?35:36))},dependencies:[wi,tl,Ci,Jy,Xy,fr,ub,mb,Vf,El,io,oo,Al,Nl],styles:["[_nghost-%COMP%]{display:flex;flex-direction:column;height:100%;overflow:hidden}.page-shell[_ngcontent-%COMP%]{display:flex;flex-direction:column;height:100%;overflow:hidden}.chat-header[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;padding:14px 20px;background-color:var(--reco-surface-0);color:var(--reco-text);border-bottom:1px solid var(--reco-border);flex-shrink:0}.header-logo[_ngcontent-%COMP%]{height:38px;width:auto;object-fit:contain;border-radius:4px;flex-shrink:0}.chat-title-group[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:column;gap:1px}.chat-title[_ngcontent-%COMP%]{font-size:1.1rem;font-weight:600;font-family:var(--reco-font);letter-spacing:.01em;color:var(--reco-primary)}.chat-tagline[_ngcontent-%COMP%]{margin:0;font-size:.68rem;font-style:italic;font-family:var(--reco-font);color:var(--reco-text-muted);letter-spacing:.01em}.provider-toggle[_ngcontent-%COMP%]{--mat-standard-button-toggle-height: 32px;--mat-standard-button-toggle-background-color: transparent;--mat-standard-button-toggle-text-color: var(--reco-text-muted);--mat-standard-button-toggle-selected-state-background-color: var(--reco-primary-dim);--mat-standard-button-toggle-selected-state-text-color: var(--reco-primary);--mat-standard-button-toggle-divider-color: var(--reco-border);border:1px solid var(--reco-border)!important;border-radius:8px;overflow:hidden}.provider-toggle[_ngcontent-%COMP%]   .mat-button-toggle[_ngcontent-%COMP%]{font-size:.72rem;font-weight:600;font-family:var(--reco-font);letter-spacing:.03em;text-transform:uppercase}.provider-toggle[_ngcontent-%COMP%]   .mat-button-toggle-button[_ngcontent-%COMP%]{display:flex;align-items:center;gap:5px;padding:0 10px}.provider-icon[_ngcontent-%COMP%]{width:14px;height:14px;flex-shrink:0;opacity:.85;vertical-align:middle}.fallback-chip[_ngcontent-%COMP%]{display:flex;align-items:center;gap:6px;padding:6px 16px;background-color:#ffb74d1f;color:var(--reco-warning);font-size:.8rem;font-family:var(--reco-font);flex-shrink:0;animation:_ngcontent-%COMP%_fade-in .3s ease}.fallback-chip[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:16px;width:16px;height:16px}@keyframes _ngcontent-%COMP%_fade-in{0%{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}.split-layout[_ngcontent-%COMP%]{flex:1;display:flex;overflow:hidden}.pane[_ngcontent-%COMP%]{display:flex;flex-direction:column;overflow:hidden}.pane--chat[_ngcontent-%COMP%]{flex:0 0 40%;background:var(--reco-bg);border-right:1px solid var(--reco-border);font-family:var(--reco-font-bubble)}.pane--reco[_ngcontent-%COMP%]{flex:1;overflow-y:auto;background:var(--reco-surface-0)}@media(max-width:767px){.split-layout[_ngcontent-%COMP%]{flex-direction:column}.pane--chat[_ngcontent-%COMP%]{flex:1;border-right:none}.pane--reco[_ngcontent-%COMP%]{flex:0 0 auto;max-height:40vh;order:-1;border-bottom:1px solid var(--reco-border)}}.reco-empty-state[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;color:var(--reco-text-muted)}.reco-empty-state[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:48px;width:48px;height:48px;opacity:.35}.reco-empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;font-size:.9rem;font-style:italic;font-family:var(--reco-font)}.reco-empty-state[_ngcontent-%COMP%]   .reco-loading-text[_ngcontent-%COMP%]{font-family:var(--reco-font-bubble);color:var(--reco-primary);animation:_ngcontent-%COMP%_note-pulse 1.5s ease-in-out infinite}.message-list[_ngcontent-%COMP%]{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px;background:var(--reco-bg);scrollbar-width:thin;scrollbar-color:var(--reco-surface-2) transparent}.empty-state[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;color:var(--reco-text-muted);text-align:center;gap:4px;padding:40px 20px}.empty-logo[_ngcontent-%COMP%]{width:80px;height:80px;object-fit:contain;opacity:.18;margin-bottom:8px}.empty-prompt[_ngcontent-%COMP%]{font-size:1rem;font-weight:500;color:var(--reco-text);margin:0}.empty-hint[_ngcontent-%COMP%]{font-style:italic;font-size:.875rem;color:var(--reco-text-muted);margin:4px 0 0}.message[_ngcontent-%COMP%]{display:flex}.message--user[_ngcontent-%COMP%]{justify-content:flex-end}.message--model[_ngcontent-%COMP%]{justify-content:flex-start}.message-bubble[_ngcontent-%COMP%]{max-width:78%;padding:10px 14px;border-radius:18px;line-height:1.7;font-size:.9rem;font-family:var(--reco-font-bubble)}.message--user[_ngcontent-%COMP%]   .message-bubble[_ngcontent-%COMP%]{background-color:var(--reco-primary);color:#fff;border-bottom-right-radius:4px;font-weight:400;white-space:pre-wrap}.message--model[_ngcontent-%COMP%]   .message-bubble[_ngcontent-%COMP%]{background-color:var(--reco-surface-2);color:var(--reco-text);border-bottom-left-radius:4px;border:1px solid var(--reco-border)}.message--model[_ngcontent-%COMP%]   .message-bubble[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{font-weight:700;color:var(--reco-primary)}.message-bubble--loading[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;padding:10px 14px;font-style:italic;font-size:.875rem;font-family:var(--reco-font-bubble);color:var(--reco-text-muted);background-color:var(--reco-surface-1);border:1px solid var(--reco-border);border-bottom-left-radius:4px}.loading-icon[_ngcontent-%COMP%]{font-size:18px;width:18px;height:18px;flex-shrink:0;color:var(--reco-primary);animation:_ngcontent-%COMP%_note-pulse 1.5s ease-in-out infinite}.loading-phrase[_ngcontent-%COMP%]{min-width:0}@keyframes _ngcontent-%COMP%_note-pulse{0%,to{opacity:.35;transform:scale(.95)}50%{opacity:1;transform:scale(1.05)}}.error-banner[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;padding:10px 14px;border-radius:8px;background-color:#ff525226;color:var(--reco-error);font-size:.875rem;font-family:var(--reco-font);border:1px solid rgba(255,82,82,.3)}.error-banner--rate-limit[_ngcontent-%COMP%]{background-color:var(--reco-accent-dim);color:var(--reco-accent);border-color:#ff2ebe4d}.input-area[_ngcontent-%COMP%]{display:flex;align-items:center;gap:12px;padding:10px 16px;border-top:1px solid var(--reco-border);flex-shrink:0;background-color:var(--reco-surface-0);--mdc-outlined-text-field-label-text-font: var(--reco-font-bubble);--mdc-outlined-text-field-input-text-color: var(--reco-text);--mdc-outlined-text-field-label-text-color: var(--reco-text-muted);--mdc-outlined-text-field-focus-label-text-color: var(--reco-primary);--mdc-outlined-text-field-outline-color: var(--reco-border-strong);--mdc-outlined-text-field-focus-outline-color: var(--reco-primary);--mdc-outlined-text-field-hover-outline-color: var(--reco-primary);--mdc-outlined-text-field-caret-color: var(--reco-primary);--mdc-outlined-text-field-disabled-outline-color: var(--reco-border);--mat-form-field-focus-select-arrow-color: var(--reco-primary);--mdc-fab-container-color: var(--reco-primary);--mdc-fab-icon-color: #ffffff;--mat-fab-foreground-color:#ffffff}.prompt-field[_ngcontent-%COMP%]{flex:1}.prompt-field--hint[_ngcontent-%COMP%]{--mdc-outlined-text-field-input-text-color: var(--reco-text-disabled)}"]})};var Ol=class e{static \u0275fac=function(t){return new(t||e)};static \u0275cmp=$({type:e,selectors:[["app-root"]],decls:1,vars:0,template:function(t,r){t&1&&re(0,"app-chat")},dependencies:[Rl],styles:["[_nghost-%COMP%]{display:block;height:100vh}"]})};ef(Ol,Gv).catch(e=>console.error(e));

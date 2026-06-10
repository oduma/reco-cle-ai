var px=Object.defineProperty,hx=Object.defineProperties;var gx=Object.getOwnPropertyDescriptors;var yg=Object.getOwnPropertySymbols;var _x=Object.prototype.hasOwnProperty,bx=Object.prototype.propertyIsEnumerable;var Cg=(t,n,e)=>n in t?px(t,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[n]=e,I=(t,n)=>{for(var e in n||={})_x.call(n,e)&&Cg(t,e,n[e]);if(yg)for(var e of yg(n))bx.call(n,e)&&Cg(t,e,n[e]);return t},se=(t,n)=>hx(t,gx(n));var ut=null,qs=!1,wu=1,vx=null,Xe=Symbol("SIGNAL");function ee(t){let n=ut;return ut=t,n}function Xs(){return ut}var Yi={version:0,lastCleanEpoch:0,dirty:!1,producers:void 0,producersTail:void 0,consumers:void 0,consumersTail:void 0,recomputing:!1,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,kind:"unknown",producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function qi(t){if(qs)throw new Error("");if(ut===null)return;ut.consumerOnSignalRead(t);let n=ut.producersTail;if(n!==void 0&&n.producer===t)return;let e,i=ut.recomputing;if(i&&(e=n!==void 0?n.nextProducer:ut.producers,e!==void 0&&e.producer===t)){ut.producersTail=e,e.lastReadVersion=t.version;return}let r=t.consumersTail;if(r!==void 0&&r.consumer===ut&&(!i||Cx(r,ut)))return;let o=qr(ut),a={producer:t,consumer:ut,nextProducer:e,prevConsumer:r,lastReadVersion:t.version,nextConsumer:void 0};ut.producersTail=a,n!==void 0?n.nextProducer=a:ut.producers=a,o&&Eg(t,a)}function Dg(){wu++}function Js(t){if(!(qr(t)&&!t.dirty)&&!(!t.dirty&&t.lastCleanEpoch===wu)){if(!t.producerMustRecompute(t)&&!Yr(t)){Qs(t);return}t.producerRecomputeValue(t),Qs(t)}}function Eu(t){if(t.consumers===void 0)return;let n=qs;qs=!0;try{for(let e=t.consumers;e!==void 0;e=e.nextConsumer){let i=e.consumer;i.dirty||yx(i)}}finally{qs=n}}function Mu(){return ut?.consumerAllowSignalWrites!==!1}function yx(t){t.dirty=!0,Eu(t),t.consumerMarkedDirty?.(t)}function Qs(t){t.dirty=!1,t.lastCleanEpoch=wu}function hi(t){return t&&xg(t),ee(t)}function xg(t){t.producersTail=void 0,t.recomputing=!0}function Zi(t,n){ee(n),t&&wg(t)}function wg(t){t.recomputing=!1;let n=t.producersTail,e=n!==void 0?n.nextProducer:t.producers;if(e!==void 0){if(qr(t))do e=Iu(e);while(e!==void 0);n!==void 0?n.nextProducer=void 0:t.producers=void 0}}function Yr(t){for(let n=t.producers;n!==void 0;n=n.nextProducer){let e=n.producer,i=n.lastReadVersion;if(i!==e.version||(Js(e),i!==e.version))return!0}return!1}function gi(t){if(qr(t)){let n=t.producers;for(;n!==void 0;)n=Iu(n)}t.producers=void 0,t.producersTail=void 0,t.consumers=void 0,t.consumersTail=void 0}function Eg(t,n){let e=t.consumersTail,i=qr(t);if(e!==void 0?(n.nextConsumer=e.nextConsumer,e.nextConsumer=n):(n.nextConsumer=void 0,t.consumers=n),n.prevConsumer=e,t.consumersTail=n,!i)for(let r=t.producers;r!==void 0;r=r.nextProducer)Eg(r.producer,r)}function Iu(t){let n=t.producer,e=t.nextProducer,i=t.nextConsumer,r=t.prevConsumer;if(t.nextConsumer=void 0,t.prevConsumer=void 0,i!==void 0?i.prevConsumer=r:n.consumersTail=r,r!==void 0)r.nextConsumer=i;else if(n.consumers=i,!qr(n)){let o=n.producers;for(;o!==void 0;)o=Iu(o)}return e}function qr(t){return t.consumerIsAlwaysLive||t.consumers!==void 0}function el(t){vx?.(t)}function Cx(t,n){let e=n.producersTail;if(e!==void 0){let i=n.producers;do{if(i===t)return!0;if(i===e)break;i=i.nextProducer}while(i!==void 0)}return!1}function tl(t,n){return Object.is(t,n)}function ua(t,n){let e=Object.create(Dx);e.computation=t,n!==void 0&&(e.equal=n);let i=()=>{if(Js(e),qi(e),e.value===da)throw e.error;return e.value};return i[Xe]=e,el(e),i}var Zs=Symbol("UNSET"),Ks=Symbol("COMPUTING"),da=Symbol("ERRORED"),Dx=se(I({},Yi),{value:Zs,dirty:!0,error:null,equal:tl,kind:"computed",producerMustRecompute(t){return t.value===Zs||t.value===Ks},producerRecomputeValue(t){if(t.value===Ks)throw new Error("");let n=t.value;t.value=Ks;let e=hi(t),i,r=!1;try{i=t.computation(),ee(null),r=n!==Zs&&n!==da&&i!==da&&t.equal(n,i)}catch(o){i=da,t.error=o}finally{Zi(t,e)}if(r){t.value=n;return}t.value=i,t.version++}});function xx(){throw new Error}var Mg=xx;function Ig(t){Mg(t)}function Su(t){Mg=t}var wx=null;function ku(t,n){let e=Object.create(fa);e.value=t,n!==void 0&&(e.equal=n);let i=()=>Sg(e);return i[Xe]=e,el(e),[i,a=>Zr(e,a),a=>Tu(e,a)]}function Sg(t){return qi(t),t.value}function Zr(t,n){Mu()||Ig(t),t.equal(t.value,n)||(t.value=n,Ex(t))}function Tu(t,n){Mu()||Ig(t),Zr(t,n(t.value))}var fa=se(I({},Yi),{equal:tl,value:void 0,kind:"signal"});function Ex(t){t.version++,Dg(),Eu(t),wx?.(t)}var Au=se(I({},Yi),{consumerIsAlwaysLive:!0,consumerAllowSignalWrites:!0,dirty:!0,kind:"effect"});function Ru(t){if(t.dirty=!1,t.version>0&&!Yr(t))return;t.version++;let n=hi(t);try{t.cleanup(),t.fn()}finally{Zi(t,n)}}function le(t){return typeof t=="function"}function Kr(t){let e=t(i=>{Error.call(i),i.stack=new Error().stack});return e.prototype=Object.create(Error.prototype),e.prototype.constructor=e,e}var nl=Kr(t=>function(e){t(this),this.message=e?`${e.length} errors occurred during unsubscription:
${e.map((i,r)=>`${r+1}) ${i.toString()}`).join(`
  `)}`:"",this.name="UnsubscriptionError",this.errors=e});function Ki(t,n){if(t){let e=t.indexOf(n);0<=e&&t.splice(e,1)}}var ce=class t{constructor(n){this.initialTeardown=n,this.closed=!1,this._parentage=null,this._finalizers=null}unsubscribe(){let n;if(!this.closed){this.closed=!0;let{_parentage:e}=this;if(e)if(this._parentage=null,Array.isArray(e))for(let o of e)o.remove(this);else e.remove(this);let{initialTeardown:i}=this;if(le(i))try{i()}catch(o){n=o instanceof nl?o.errors:[o]}let{_finalizers:r}=this;if(r){this._finalizers=null;for(let o of r)try{kg(o)}catch(a){n=n??[],a instanceof nl?n=[...n,...a.errors]:n.push(a)}}if(n)throw new nl(n)}}add(n){var e;if(n&&n!==this)if(this.closed)kg(n);else{if(n instanceof t){if(n.closed||n._hasParent(this))return;n._addParent(this)}(this._finalizers=(e=this._finalizers)!==null&&e!==void 0?e:[]).push(n)}}_hasParent(n){let{_parentage:e}=this;return e===n||Array.isArray(e)&&e.includes(n)}_addParent(n){let{_parentage:e}=this;this._parentage=Array.isArray(e)?(e.push(n),e):e?[e,n]:n}_removeParent(n){let{_parentage:e}=this;e===n?this._parentage=null:Array.isArray(e)&&Ki(e,n)}remove(n){let{_finalizers:e}=this;e&&Ki(e,n),n instanceof t&&n._removeParent(this)}};ce.EMPTY=(()=>{let t=new ce;return t.closed=!0,t})();var Ou=ce.EMPTY;function il(t){return t instanceof ce||t&&"closed"in t&&le(t.remove)&&le(t.add)&&le(t.unsubscribe)}function kg(t){le(t)?t():t.unsubscribe()}var un={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1};var Qr={setTimeout(t,n,...e){let{delegate:i}=Qr;return i?.setTimeout?i.setTimeout(t,n,...e):setTimeout(t,n,...e)},clearTimeout(t){let{delegate:n}=Qr;return(n?.clearTimeout||clearTimeout)(t)},delegate:void 0};function rl(t){Qr.setTimeout(()=>{let{onUnhandledError:n}=un;if(n)n(t);else throw t})}function ma(){}var Tg=Nu("C",void 0,void 0);function Ag(t){return Nu("E",void 0,t)}function Rg(t){return Nu("N",t,void 0)}function Nu(t,n,e){return{kind:t,value:n,error:e}}var Qi=null;function Xr(t){if(un.useDeprecatedSynchronousErrorHandling){let n=!Qi;if(n&&(Qi={errorThrown:!1,error:null}),t(),n){let{errorThrown:e,error:i}=Qi;if(Qi=null,e)throw i}}else t()}function Og(t){un.useDeprecatedSynchronousErrorHandling&&Qi&&(Qi.errorThrown=!0,Qi.error=t)}var Xi=class extends ce{constructor(n){super(),this.isStopped=!1,n?(this.destination=n,il(n)&&n.add(this)):this.destination=Sx}static create(n,e,i){return new fn(n,e,i)}next(n){this.isStopped?Pu(Rg(n),this):this._next(n)}error(n){this.isStopped?Pu(Ag(n),this):(this.isStopped=!0,this._error(n))}complete(){this.isStopped?Pu(Tg,this):(this.isStopped=!0,this._complete())}unsubscribe(){this.closed||(this.isStopped=!0,super.unsubscribe(),this.destination=null)}_next(n){this.destination.next(n)}_error(n){try{this.destination.error(n)}finally{this.unsubscribe()}}_complete(){try{this.destination.complete()}finally{this.unsubscribe()}}},Mx=Function.prototype.bind;function Fu(t,n){return Mx.call(t,n)}var Lu=class{constructor(n){this.partialObserver=n}next(n){let{partialObserver:e}=this;if(e.next)try{e.next(n)}catch(i){ol(i)}}error(n){let{partialObserver:e}=this;if(e.error)try{e.error(n)}catch(i){ol(i)}else ol(n)}complete(){let{partialObserver:n}=this;if(n.complete)try{n.complete()}catch(e){ol(e)}}},fn=class extends Xi{constructor(n,e,i){super();let r;if(le(n)||!n)r={next:n??void 0,error:e??void 0,complete:i??void 0};else{let o;this&&un.useDeprecatedNextContext?(o=Object.create(n),o.unsubscribe=()=>this.unsubscribe(),r={next:n.next&&Fu(n.next,o),error:n.error&&Fu(n.error,o),complete:n.complete&&Fu(n.complete,o)}):r=n}this.destination=new Lu(r)}};function ol(t){un.useDeprecatedSynchronousErrorHandling?Og(t):rl(t)}function Ix(t){throw t}function Pu(t,n){let{onStoppedNotification:e}=un;e&&Qr.setTimeout(()=>e(t,n))}var Sx={closed:!0,next:ma,error:Ix,complete:ma};var Jr=typeof Symbol=="function"&&Symbol.observable||"@@observable";function Nt(t){return t}function Ng(t){return t.length===0?Nt:t.length===1?t[0]:function(e){return t.reduce((i,r)=>r(i),e)}}var ue=(()=>{class t{constructor(e){e&&(this._subscribe=e)}lift(e){let i=new t;return i.source=this,i.operator=e,i}subscribe(e,i,r){let o=Tx(e)?e:new fn(e,i,r);return Xr(()=>{let{operator:a,source:s}=this;o.add(a?a.call(o,s):s?this._subscribe(o):this._trySubscribe(o))}),o}_trySubscribe(e){try{return this._subscribe(e)}catch(i){e.error(i)}}forEach(e,i){return i=Fg(i),new i((r,o)=>{let a=new fn({next:s=>{try{e(s)}catch(l){o(l),a.unsubscribe()}},error:o,complete:r});this.subscribe(a)})}_subscribe(e){var i;return(i=this.source)===null||i===void 0?void 0:i.subscribe(e)}[Jr](){return this}pipe(...e){return Ng(e)(this)}toPromise(e){return e=Fg(e),new e((i,r)=>{let o;this.subscribe(a=>o=a,a=>r(a),()=>i(o))})}}return t.create=n=>new t(n),t})();function Fg(t){var n;return(n=t??un.Promise)!==null&&n!==void 0?n:Promise}function kx(t){return t&&le(t.next)&&le(t.error)&&le(t.complete)}function Tx(t){return t&&t instanceof Xi||kx(t)&&il(t)}function Ax(t){return le(t?.lift)}function fe(t){return n=>{if(Ax(n))return n.lift(function(e){try{return t(e,this)}catch(i){this.error(i)}});throw new TypeError("Unable to lift unknown Observable type")}}function me(t,n,e,i,r){return new Vu(t,n,e,i,r)}var Vu=class extends Xi{constructor(n,e,i,r,o,a){super(n),this.onFinalize=o,this.shouldUnsubscribe=a,this._next=e?function(s){try{e(s)}catch(l){n.error(l)}}:super._next,this._error=r?function(s){try{r(s)}catch(l){n.error(l)}finally{this.unsubscribe()}}:super._error,this._complete=i?function(){try{i()}catch(s){n.error(s)}finally{this.unsubscribe()}}:super._complete}unsubscribe(){var n;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){let{closed:e}=this;super.unsubscribe(),!e&&((n=this.onFinalize)===null||n===void 0||n.call(this))}}};var Pg=Kr(t=>function(){t(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"});var M=(()=>{class t extends ue{constructor(){super(),this.closed=!1,this.currentObservers=null,this.observers=[],this.isStopped=!1,this.hasError=!1,this.thrownError=null}lift(e){let i=new al(this,this);return i.operator=e,i}_throwIfClosed(){if(this.closed)throw new Pg}next(e){Xr(()=>{if(this._throwIfClosed(),!this.isStopped){this.currentObservers||(this.currentObservers=Array.from(this.observers));for(let i of this.currentObservers)i.next(e)}})}error(e){Xr(()=>{if(this._throwIfClosed(),!this.isStopped){this.hasError=this.isStopped=!0,this.thrownError=e;let{observers:i}=this;for(;i.length;)i.shift().error(e)}})}complete(){Xr(()=>{if(this._throwIfClosed(),!this.isStopped){this.isStopped=!0;let{observers:e}=this;for(;e.length;)e.shift().complete()}})}unsubscribe(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null}get observed(){var e;return((e=this.observers)===null||e===void 0?void 0:e.length)>0}_trySubscribe(e){return this._throwIfClosed(),super._trySubscribe(e)}_subscribe(e){return this._throwIfClosed(),this._checkFinalizedStatuses(e),this._innerSubscribe(e)}_innerSubscribe(e){let{hasError:i,isStopped:r,observers:o}=this;return i||r?Ou:(this.currentObservers=null,o.push(e),new ce(()=>{this.currentObservers=null,Ki(o,e)}))}_checkFinalizedStatuses(e){let{hasError:i,thrownError:r,isStopped:o}=this;i?e.error(r):o&&e.complete()}asObservable(){let e=new ue;return e.source=this,e}}return t.create=(n,e)=>new al(n,e),t})(),al=class extends M{constructor(n,e){super(),this.destination=n,this.source=e}next(n){var e,i;(i=(e=this.destination)===null||e===void 0?void 0:e.next)===null||i===void 0||i.call(e,n)}error(n){var e,i;(i=(e=this.destination)===null||e===void 0?void 0:e.error)===null||i===void 0||i.call(e,n)}complete(){var n,e;(e=(n=this.destination)===null||n===void 0?void 0:n.complete)===null||e===void 0||e.call(n)}_subscribe(n){var e,i;return(i=(e=this.source)===null||e===void 0?void 0:e.subscribe(n))!==null&&i!==void 0?i:Ou}};var Ji=class extends M{constructor(n){super(),this._value=n}get value(){return this.getValue()}_subscribe(n){let e=super._subscribe(n);return!e.closed&&n.next(this._value),e}getValue(){let{hasError:n,thrownError:e,_value:i}=this;if(n)throw e;return this._throwIfClosed(),i}next(n){super.next(this._value=n)}};var pa={now(){return(pa.delegate||Date).now()},delegate:void 0};var _i=class extends M{constructor(n=1/0,e=1/0,i=pa){super(),this._bufferSize=n,this._windowTime=e,this._timestampProvider=i,this._buffer=[],this._infiniteTimeWindow=!0,this._infiniteTimeWindow=e===1/0,this._bufferSize=Math.max(1,n),this._windowTime=Math.max(1,e)}next(n){let{isStopped:e,_buffer:i,_infiniteTimeWindow:r,_timestampProvider:o,_windowTime:a}=this;e||(i.push(n),!r&&i.push(o.now()+a)),this._trimBuffer(),super.next(n)}_subscribe(n){this._throwIfClosed(),this._trimBuffer();let e=this._innerSubscribe(n),{_infiniteTimeWindow:i,_buffer:r}=this,o=r.slice();for(let a=0;a<o.length&&!n.closed;a+=i?1:2)n.next(o[a]);return this._checkFinalizedStatuses(n),e}_trimBuffer(){let{_bufferSize:n,_timestampProvider:e,_buffer:i,_infiniteTimeWindow:r}=this,o=(r?1:2)*n;if(n<1/0&&o<i.length&&i.splice(0,i.length-o),!r){let a=e.now(),s=0;for(let l=1;l<i.length&&i[l]<=a;l+=2)s=l;s&&i.splice(0,s+1)}}};var sl=class extends ce{constructor(n,e){super()}schedule(n,e=0){return this}};var ha={setInterval(t,n,...e){let{delegate:i}=ha;return i?.setInterval?i.setInterval(t,n,...e):setInterval(t,n,...e)},clearInterval(t){let{delegate:n}=ha;return(n?.clearInterval||clearInterval)(t)},delegate:void 0};var ll=class extends sl{constructor(n,e){super(n,e),this.scheduler=n,this.work=e,this.pending=!1}schedule(n,e=0){var i;if(this.closed)return this;this.state=n;let r=this.id,o=this.scheduler;return r!=null&&(this.id=this.recycleAsyncId(o,r,e)),this.pending=!0,this.delay=e,this.id=(i=this.id)!==null&&i!==void 0?i:this.requestAsyncId(o,this.id,e),this}requestAsyncId(n,e,i=0){return ha.setInterval(n.flush.bind(n,this),i)}recycleAsyncId(n,e,i=0){if(i!=null&&this.delay===i&&this.pending===!1)return e;e!=null&&ha.clearInterval(e)}execute(n,e){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;let i=this._execute(n,e);if(i)return i;this.pending===!1&&this.id!=null&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))}_execute(n,e){let i=!1,r;try{this.work(n)}catch(o){i=!0,r=o||new Error("Scheduled action threw falsy error")}if(i)return this.unsubscribe(),r}unsubscribe(){if(!this.closed){let{id:n,scheduler:e}=this,{actions:i}=e;this.work=this.state=this.scheduler=null,this.pending=!1,Ki(i,this),n!=null&&(this.id=this.recycleAsyncId(e,n,null)),this.delay=null,super.unsubscribe()}}};var eo=class t{constructor(n,e=t.now){this.schedulerActionCtor=n,this.now=e}schedule(n,e=0,i){return new this.schedulerActionCtor(this,n).schedule(i,e)}};eo.now=pa.now;var cl=class extends eo{constructor(n,e=eo.now){super(n,e),this.actions=[],this._active=!1}flush(n){let{actions:e}=this;if(this._active){e.push(n);return}let i;this._active=!0;do if(i=n.execute(n.state,n.delay))break;while(n=e.shift());if(this._active=!1,i){for(;n=e.shift();)n.unsubscribe();throw i}}};var ga=new cl(ll),Lg=ga;var er=new ue(t=>t.complete());function dl(t){return t&&le(t.schedule)}function Bu(t){return t[t.length-1]}function ul(t){return le(Bu(t))?t.pop():void 0}function Pn(t){return dl(Bu(t))?t.pop():void 0}function Vg(t,n){return typeof Bu(t)=="number"?t.pop():n}function jg(t,n,e,i){function r(o){return o instanceof e?o:new e(function(a){a(o)})}return new(e||(e=Promise))(function(o,a){function s(u){try{d(i.next(u))}catch(f){a(f)}}function l(u){try{d(i.throw(u))}catch(f){a(f)}}function d(u){u.done?o(u.value):r(u.value).then(s,l)}d((i=i.apply(t,n||[])).next())})}function Bg(t){var n=typeof Symbol=="function"&&Symbol.iterator,e=n&&t[n],i=0;if(e)return e.call(t);if(t&&typeof t.length=="number")return{next:function(){return t&&i>=t.length&&(t=void 0),{value:t&&t[i++],done:!t}}};throw new TypeError(n?"Object is not iterable.":"Symbol.iterator is not defined.")}function tr(t){return this instanceof tr?(this.v=t,this):new tr(t)}function Hg(t,n,e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var i=e.apply(t,n||[]),r,o=[];return r=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),s("next"),s("throw"),s("return",a),r[Symbol.asyncIterator]=function(){return this},r;function a(g){return function(C){return Promise.resolve(C).then(g,f)}}function s(g,C){i[g]&&(r[g]=function(F){return new Promise(function(z,Q){o.push([g,F,z,Q])>1||l(g,F)})},C&&(r[g]=C(r[g])))}function l(g,C){try{d(i[g](C))}catch(F){_(o[0][3],F)}}function d(g){g.value instanceof tr?Promise.resolve(g.value.v).then(u,f):_(o[0][2],g)}function u(g){l("next",g)}function f(g){l("throw",g)}function _(g,C){g(C),o.shift(),o.length&&l(o[0][0],o[0][1])}}function Ug(t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var n=t[Symbol.asyncIterator],e;return n?n.call(t):(t=typeof Bg=="function"?Bg(t):t[Symbol.iterator](),e={},i("next"),i("throw"),i("return"),e[Symbol.asyncIterator]=function(){return this},e);function i(o){e[o]=t[o]&&function(a){return new Promise(function(s,l){a=t[o](a),r(s,l,a.done,a.value)})}}function r(o,a,s,l){Promise.resolve(l).then(function(d){o({value:d,done:s})},a)}}var fl=t=>t&&typeof t.length=="number"&&typeof t!="function";function ml(t){return le(t?.then)}function pl(t){return le(t[Jr])}function hl(t){return Symbol.asyncIterator&&le(t?.[Symbol.asyncIterator])}function gl(t){return new TypeError(`You provided ${t!==null&&typeof t=="object"?"an invalid object":`'${t}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)}function Rx(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var _l=Rx();function bl(t){return le(t?.[_l])}function vl(t){return Hg(this,arguments,function*(){let e=t.getReader();try{for(;;){let{value:i,done:r}=yield tr(e.read());if(r)return yield tr(void 0);yield yield tr(i)}}finally{e.releaseLock()}})}function yl(t){return le(t?.getReader)}function we(t){if(t instanceof ue)return t;if(t!=null){if(pl(t))return Ox(t);if(fl(t))return Nx(t);if(ml(t))return Fx(t);if(hl(t))return zg(t);if(bl(t))return Px(t);if(yl(t))return Lx(t)}throw gl(t)}function Ox(t){return new ue(n=>{let e=t[Jr]();if(le(e.subscribe))return e.subscribe(n);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function Nx(t){return new ue(n=>{for(let e=0;e<t.length&&!n.closed;e++)n.next(t[e]);n.complete()})}function Fx(t){return new ue(n=>{t.then(e=>{n.closed||(n.next(e),n.complete())},e=>n.error(e)).then(null,rl)})}function Px(t){return new ue(n=>{for(let e of t)if(n.next(e),n.closed)return;n.complete()})}function zg(t){return new ue(n=>{Vx(t,n).catch(e=>n.error(e))})}function Lx(t){return zg(vl(t))}function Vx(t,n){var e,i,r,o;return jg(this,void 0,void 0,function*(){try{for(e=Ug(t);i=yield e.next(),!i.done;){let a=i.value;if(n.next(a),n.closed)return}}catch(a){r={error:a}}finally{try{i&&!i.done&&(o=e.return)&&(yield o.call(e))}finally{if(r)throw r.error}}n.complete()})}function St(t,n,e,i=0,r=!1){let o=n.schedule(function(){e(),r?t.add(this.schedule(null,i)):this.unsubscribe()},i);if(t.add(o),!r)return o}function Cl(t,n=0){return fe((e,i)=>{e.subscribe(me(i,r=>St(i,t,()=>i.next(r),n),()=>St(i,t,()=>i.complete(),n),r=>St(i,t,()=>i.error(r),n)))})}function Dl(t,n=0){return fe((e,i)=>{i.add(t.schedule(()=>e.subscribe(i),n))})}function $g(t,n){return we(t).pipe(Dl(n),Cl(n))}function Wg(t,n){return we(t).pipe(Dl(n),Cl(n))}function Gg(t,n){return new ue(e=>{let i=0;return n.schedule(function(){i===t.length?e.complete():(e.next(t[i++]),e.closed||this.schedule())})})}function Yg(t,n){return new ue(e=>{let i;return St(e,n,()=>{i=t[_l](),St(e,n,()=>{let r,o;try{({value:r,done:o}=i.next())}catch(a){e.error(a);return}o?e.complete():e.next(r)},0,!0)}),()=>le(i?.return)&&i.return()})}function xl(t,n){if(!t)throw new Error("Iterable cannot be null");return new ue(e=>{St(e,n,()=>{let i=t[Symbol.asyncIterator]();St(e,n,()=>{i.next().then(r=>{r.done?e.complete():e.next(r.value)})},0,!0)})})}function qg(t,n){return xl(vl(t),n)}function Zg(t,n){if(t!=null){if(pl(t))return $g(t,n);if(fl(t))return Gg(t,n);if(ml(t))return Wg(t,n);if(hl(t))return xl(t,n);if(bl(t))return Yg(t,n);if(yl(t))return qg(t,n)}throw gl(t)}function $t(t,n){return n?Zg(t,n):we(t)}function He(...t){let n=Pn(t);return $t(t,n)}function _a(t,n){let e=le(t)?t:()=>t,i=r=>r.error(e());return new ue(n?r=>n.schedule(i,0,r):i)}var Kg=Kr(t=>function(){t(this),this.name="EmptyError",this.message="no elements in sequence"});function nr(t,n){let e=typeof n=="object";return new Promise((i,r)=>{let o=new fn({next:a=>{i(a),o.unsubscribe()},error:r,complete:()=>{e?i(n.defaultValue):r(new Kg)}});t.subscribe(o)})}function Qg(t){return t instanceof Date&&!isNaN(t)}function Ce(t,n){return fe((e,i)=>{let r=0;e.subscribe(me(i,o=>{i.next(t.call(n,o,r++))}))})}var{isArray:Bx}=Array;function jx(t,n){return Bx(n)?t(...n):t(n)}function wl(t){return Ce(n=>jx(t,n))}var{isArray:Hx}=Array,{getPrototypeOf:Ux,prototype:zx,keys:$x}=Object;function El(t){if(t.length===1){let n=t[0];if(Hx(n))return{args:n,keys:null};if(Wx(n)){let e=$x(n);return{args:e.map(i=>n[i]),keys:e}}}return{args:t,keys:null}}function Wx(t){return t&&typeof t=="object"&&Ux(t)===zx}function Ml(t,n){return t.reduce((e,i,r)=>(e[i]=n[r],e),{})}function ju(...t){let n=Pn(t),e=ul(t),{args:i,keys:r}=El(t);if(i.length===0)return $t([],n);let o=new ue(Gx(i,n,r?a=>Ml(r,a):Nt));return e?o.pipe(wl(e)):o}function Gx(t,n,e=Nt){return i=>{Xg(n,()=>{let{length:r}=t,o=new Array(r),a=r,s=r;for(let l=0;l<r;l++)Xg(n,()=>{let d=$t(t[l],n),u=!1;d.subscribe(me(i,f=>{o[l]=f,u||(u=!0,s--),s||i.next(e(o.slice()))},()=>{--a||i.complete()}))},i)},i)}}function Xg(t,n,e){t?St(e,t,n):n()}function Jg(t,n,e,i,r,o,a,s){let l=[],d=0,u=0,f=!1,_=()=>{f&&!l.length&&!d&&n.complete()},g=F=>d<i?C(F):l.push(F),C=F=>{o&&n.next(F),d++;let z=!1;we(e(F,u++)).subscribe(me(n,Q=>{r?.(Q),o?g(Q):n.next(Q)},()=>{z=!0},void 0,()=>{if(z)try{for(d--;l.length&&d<i;){let Q=l.shift();a?St(n,a,()=>C(Q)):C(Q)}_()}catch(Q){n.error(Q)}}))};return t.subscribe(me(n,g,()=>{f=!0,_()})),()=>{s?.()}}function to(t,n,e=1/0){return le(n)?to((i,r)=>Ce((o,a)=>n(i,o,r,a))(we(t(i,r))),e):(typeof n=="number"&&(e=n),fe((i,r)=>Jg(i,r,t,e)))}function Il(t=1/0){return to(Nt,t)}function e_(){return Il(1)}function no(...t){return e_()($t(t,Pn(t)))}function ir(t){return new ue(n=>{we(t()).subscribe(n)})}function rr(...t){let n=ul(t),{args:e,keys:i}=El(t),r=new ue(o=>{let{length:a}=e;if(!a){o.complete();return}let s=new Array(a),l=a,d=a;for(let u=0;u<a;u++){let f=!1;we(e[u]).subscribe(me(o,_=>{f||(f=!0,d--),s[u]=_},()=>l--,void 0,()=>{(!l||!f)&&(d||o.next(i?Ml(i,s):s),o.complete())}))}});return n?r.pipe(wl(n)):r}function or(t=0,n,e=Lg){let i=-1;return n!=null&&(dl(n)?e=n:i=n),new ue(r=>{let o=Qg(t)?+t-e.now():t;o<0&&(o=0);let a=0;return e.schedule(function(){r.closed||(r.next(a++),0<=i?this.schedule(void 0,i):r.complete())},o)})}function ft(...t){let n=Pn(t),e=Vg(t,1/0),i=t;return i.length?i.length===1?we(i[0]):Il(e)($t(i,n)):er}function Ne(t,n){return fe((e,i)=>{let r=0;e.subscribe(me(i,o=>t.call(n,o,r++)&&i.next(o)))})}function t_(t){return fe((n,e)=>{let i=!1,r=null,o=null,a=!1,s=()=>{if(o?.unsubscribe(),o=null,i){i=!1;let d=r;r=null,e.next(d)}a&&e.complete()},l=()=>{o=null,a&&e.complete()};n.subscribe(me(e,d=>{i=!0,r=d,o||we(t(d)).subscribe(o=me(e,s,l))},()=>{a=!0,(!i||!o||o.closed)&&e.complete()}))})}function Sl(t,n=ga){return t_(()=>or(t,n))}function kl(t){return fe((n,e)=>{let i=null,r=!1,o;i=n.subscribe(me(e,void 0,void 0,a=>{o=we(t(a,kl(t)(n))),i?(i.unsubscribe(),i=null,o.subscribe(e)):r=!0})),r&&(i.unsubscribe(),i=null,o.subscribe(e))})}function Hu(t,n){return le(n)?to(t,n,1):to(t,1)}function ba(t,n=ga){return fe((e,i)=>{let r=null,o=null,a=null,s=()=>{if(r){r.unsubscribe(),r=null;let d=o;o=null,i.next(d)}};function l(){let d=a+t,u=n.now();if(u<d){r=this.schedule(void 0,d-u),i.add(r);return}s()}e.subscribe(me(i,d=>{o=d,a=n.now(),r||(r=n.schedule(l,t),i.add(r))},()=>{s(),i.complete()},void 0,()=>{o=r=null}))})}function mt(t){return t<=0?()=>er:fe((n,e)=>{let i=0;n.subscribe(me(e,r=>{++i<=t&&(e.next(r),t<=i&&e.complete())}))})}function Tl(t,n=Nt){return t=t??Yx,fe((e,i)=>{let r,o=!0;e.subscribe(me(i,a=>{let s=n(a);(o||!t(r,s))&&(o=!1,r=s,i.next(a))}))})}function Yx(t,n){return t===n}function va(t){return fe((n,e)=>{try{n.subscribe(e)}finally{e.add(t)}})}function Al(){return fe((t,n)=>{let e,i=!1;t.subscribe(me(n,r=>{let o=e;e=r,i&&n.next([o,r]),i=!0}))})}function Uu(t=1/0){let n;t&&typeof t=="object"?n=t:n={count:t};let{count:e=1/0,delay:i,resetOnSuccess:r=!1}=n;return e<=0?Nt:fe((o,a)=>{let s=0,l,d=()=>{let u=!1;l=o.subscribe(me(a,f=>{r&&(s=0),a.next(f)},void 0,f=>{if(s++<e){let _=()=>{l?(l.unsubscribe(),l=null,d()):u=!0};if(i!=null){let g=typeof i=="number"?or(i):we(i(f,s)),C=me(a,()=>{C.unsubscribe(),_()},()=>{a.complete()});g.subscribe(C)}else _()}else a.error(f)})),u&&(l.unsubscribe(),l=null,d())};d()})}function ya(t={}){let{connector:n=()=>new M,resetOnError:e=!0,resetOnComplete:i=!0,resetOnRefCountZero:r=!0}=t;return o=>{let a,s,l,d=0,u=!1,f=!1,_=()=>{s?.unsubscribe(),s=void 0},g=()=>{_(),a=l=void 0,u=f=!1},C=()=>{let F=a;g(),F?.unsubscribe()};return fe((F,z)=>{d++,!f&&!u&&_();let Q=l=l??n();z.add(()=>{d--,d===0&&!f&&!u&&(s=zu(C,r))}),Q.subscribe(z),!a&&d>0&&(a=new fn({next:Le=>Q.next(Le),error:Le=>{f=!0,_(),s=zu(g,e,Le),Q.error(Le)},complete:()=>{u=!0,_(),s=zu(g,i),Q.complete()}}),we(F).subscribe(a))})(o)}}function zu(t,n,...e){if(n===!0){t();return}if(n===!1)return;let i=new fn({next:()=>{i.unsubscribe(),t()}});return we(n(...e)).subscribe(i)}function Rl(t,n,e){let i,r=!1;return t&&typeof t=="object"?{bufferSize:i=1/0,windowTime:n=1/0,refCount:r=!1,scheduler:e}=t:i=t??1/0,ya({connector:()=>new _i(i,n,e),resetOnError:!0,resetOnComplete:!1,resetOnRefCountZero:r})}function Ca(t){return Ne((n,e)=>t<=e)}function We(...t){let n=Pn(t);return fe((e,i)=>{(n?no(t,e,n):no(t,e)).subscribe(i)})}function Ln(t,n){return fe((e,i)=>{let r=null,o=0,a=!1,s=()=>a&&!r&&i.complete();e.subscribe(me(i,l=>{r?.unsubscribe();let d=0,u=o++;we(t(l,u)).subscribe(r=me(i,f=>i.next(n?n(l,f,u,d++):f),()=>{r=null,s()}))},()=>{a=!0,s()}))})}function Ee(t){return fe((n,e)=>{we(t).subscribe(me(e,()=>e.complete(),ma)),!e.closed&&n.subscribe(e)})}function $u(t,n=!1){return fe((e,i)=>{let r=0;e.subscribe(me(i,o=>{let a=t(o,r++);(a||n)&&i.next(o),!a&&i.complete()}))})}function kt(t,n,e){let i=le(t)||n||e?{next:t,error:n,complete:e}:t;return i?fe((r,o)=>{var a;(a=i.subscribe)===null||a===void 0||a.call(i);let s=!0;r.subscribe(me(o,l=>{var d;(d=i.next)===null||d===void 0||d.call(i,l),o.next(l)},()=>{var l;s=!1,(l=i.complete)===null||l===void 0||l.call(i),o.complete()},l=>{var d;s=!1,(d=i.error)===null||d===void 0||d.call(i,l),o.error(l)},()=>{var l,d;s&&((l=i.unsubscribe)===null||l===void 0||l.call(i)),(d=i.finalize)===null||d===void 0||d.call(i)}))}):Nt}var Wu;function Ol(){return Wu}function Vn(t){let n=Wu;return Wu=t,n}var n_=Symbol("NotFound");function io(t){return t===n_||t?.name==="\u0275NotFound"}function i_(t){let n=ee(null);try{return t()}finally{ee(n)}}var jl="https://angular.dev/best-practices/security#preventing-cross-site-scripting-xss",X=class extends Error{code;constructor(n,e){super(Ci(n,e)),this.code=n}};function qx(t){return`NG0${Math.abs(t)}`}function Ci(t,n){return`${qx(t)}${n?": "+n:""}`}var Di=globalThis;function Me(t){for(let n in t)if(t[n]===Me)return n;throw Error("")}function l_(t,n){for(let e in n)n.hasOwnProperty(e)&&!t.hasOwnProperty(e)&&(t[e]=n[e])}function Hl(t){if(typeof t=="string")return t;if(Array.isArray(t))return`[${t.map(Hl).join(", ")}]`;if(t==null)return""+t;let n=t.overriddenName||t.name;if(n)return`${n}`;let e=t.toString();if(e==null)return""+e;let i=e.indexOf(`
`);return i>=0?e.slice(0,i):e}function Ul(t,n){return t?n?`${t} ${n}`:t:n||""}var Zx=Me({__forward_ref__:Me});function gt(t){return t.__forward_ref__=gt,t}function Je(t){return of(t)?t():t}function of(t){return typeof t=="function"&&t.hasOwnProperty(Zx)&&t.__forward_ref__===gt}function D(t){return{token:t.token,providedIn:t.providedIn||null,factory:t.factory,value:void 0}}function q(t){return{providers:t.providers||[],imports:t.imports||[]}}function zl(t){return Kx(t,$l)}function Kx(t,n){return t.hasOwnProperty(n)&&t[n]||null}function Qx(t){let n=t?.[$l]??null;return n||null}function Yu(t){return t&&t.hasOwnProperty(Fl)?t[Fl]:null}var $l=Me({\u0275prov:Me}),Fl=Me({\u0275inj:Me}),y=class{_desc;ngMetadataName="InjectionToken";\u0275prov;constructor(n,e){this._desc=n,this.\u0275prov=void 0,typeof e=="number"?this.__NG_ELEMENT_ID__=e:e!==void 0&&(this.\u0275prov=D({token:this,providedIn:e.providedIn||"root",factory:e.factory}))}get multi(){return this}toString(){return`InjectionToken ${this._desc}`}};function af(t){return t&&!!t.\u0275providers}var sf=Me({\u0275cmp:Me}),lf=Me({\u0275dir:Me}),cf=Me({\u0275pipe:Me});var xa=Me({\u0275fac:Me}),dr=Me({__NG_ELEMENT_ID__:Me}),r_=Me({__NG_ENV_ID__:Me});function xi(t){return df(t,"@Component"),t[sf]||null}function Wl(t){return df(t,"@Directive"),t[lf]||null}function c_(t){return df(t,"@Pipe"),t[cf]||null}function df(t,n){if(t==null)throw new X(-919,!1)}function ur(t){return typeof t=="string"?t:t==null?"":String(t)}var d_=Me({ngErrorCode:Me}),Xx=Me({ngErrorMessage:Me}),Jx=Me({ngTokenPath:Me});function uf(t,n){return u_("",-200,n)}function Gl(t,n){throw new X(-201,!1)}function u_(t,n,e){let i=new X(n,t);return i[d_]=n,i[Xx]=t,e&&(i[Jx]=e),i}function ew(t){return t[d_]}var qu;function f_(){return qu}function xt(t){let n=qu;return qu=t,n}function ff(t,n,e){let i=zl(t);if(i&&i.providedIn=="root")return i.value===void 0?i.value=i.factory():i.value;if(e&8)return null;if(n!==void 0)return n;Gl(t,"")}var tw={},ar=tw,nw="__NG_DI_FLAG__",Zu=class{injector;constructor(n){this.injector=n}retrieve(n,e){let i=sr(e)||0;try{return this.injector.get(n,i&8?null:ar,i)}catch(r){if(io(r))return r;throw r}}};function iw(t,n=0){let e=Ol();if(e===void 0)throw new X(-203,!1);if(e===null)return ff(t,void 0,n);{let i=rw(n),r=e.retrieve(t,i);if(io(r)){if(i.optional)return null;throw r}return r}}function V(t,n=0){return(f_()||iw)(Je(t),n)}function c(t,n){return V(t,sr(n))}function sr(t){return typeof t>"u"||typeof t=="number"?t:0|(t.optional&&8)|(t.host&&1)|(t.self&&2)|(t.skipSelf&&4)}function rw(t){return{optional:!!(t&8),host:!!(t&1),self:!!(t&2),skipSelf:!!(t&4)}}function Ku(t){let n=[];for(let e=0;e<t.length;e++){let i=Je(t[e]);if(Array.isArray(i)){if(i.length===0)throw new X(900,!1);let r,o=0;for(let a=0;a<i.length;a++){let s=i[a],l=ow(s);typeof l=="number"?l===-1?r=s.token:o|=l:r=s}n.push(V(r,o))}else n.push(V(i))}return n}function ow(t){return t[nw]}function bi(t,n){let e=t.hasOwnProperty(xa);return e?t[xa]:null}function m_(t,n,e){if(t.length!==n.length)return!1;for(let i=0;i<t.length;i++){let r=t[i],o=n[i];if(e&&(r=e(r),o=e(o)),o!==r)return!1}return!0}function p_(t){return t.flat(Number.POSITIVE_INFINITY)}function Yl(t,n){t.forEach(e=>Array.isArray(e)?Yl(e,n):n(e))}function mf(t,n,e){n>=t.length?t.push(e):t.splice(n,0,e)}function Sa(t,n){return n>=t.length-1?t.pop():t.splice(n,1)[0]}function h_(t,n){let e=[];for(let i=0;i<t;i++)e.push(n);return e}function g_(t,n,e,i){let r=t.length;if(r==n)t.push(e,i);else if(r===1)t.push(i,t[0]),t[0]=e;else{for(r--,t.push(t[r-1],t[r]);r>n;){let o=r-2;t[r]=t[o],r--}t[n]=e,t[n+1]=i}}function ql(t,n,e){let i=oo(t,n);return i>=0?t[i|1]=e:(i=~i,g_(t,i,n,e)),i}function Zl(t,n){let e=oo(t,n);if(e>=0)return t[e|1]}function oo(t,n){return aw(t,n,1)}function aw(t,n,e){let i=0,r=t.length>>e;for(;r!==i;){let o=i+(r-i>>1),a=t[o<<e];if(n===a)return o<<e;a>n?r=o:i=o+1}return~(r<<e)}var mn={},pt=[],fr=new y(""),pf=new y("",-1),hf=new y(""),wa=class{get(n,e=ar){if(e===ar){let r=u_("",-201);throw r.name="\u0275NotFound",r}return e}};function mr(t){return{\u0275providers:t}}function __(t){return mr([{provide:fr,multi:!0,useValue:t}])}function b_(...t){return{\u0275providers:gf(!0,t),\u0275fromNgModule:!0}}function gf(t,...n){let e=[],i=new Set,r,o=a=>{e.push(a)};return Yl(n,a=>{let s=a;Pl(s,o,[],i)&&(r||=[],r.push(s))}),r!==void 0&&v_(r,o),e}function v_(t,n){for(let e=0;e<t.length;e++){let{ngModule:i,providers:r}=t[e];_f(r,o=>{n(o,i)})}}function Pl(t,n,e,i){if(t=Je(t),!t)return!1;let r=null,o=Yu(t),a=!o&&xi(t);if(!o&&!a){let l=t.ngModule;if(o=Yu(l),o)r=l;else return!1}else{if(a&&!a.standalone)return!1;r=t}let s=i.has(r);if(a){if(s)return!1;if(i.add(r),a.dependencies){let l=typeof a.dependencies=="function"?a.dependencies():a.dependencies;for(let d of l)Pl(d,n,e,i)}}else if(o){if(o.imports!=null&&!s){i.add(r);let d;Yl(o.imports,u=>{Pl(u,n,e,i)&&(d||=[],d.push(u))}),d!==void 0&&v_(d,n)}if(!s){let d=bi(r)||(()=>new r);n({provide:r,useFactory:d,deps:pt},r),n({provide:hf,useValue:r,multi:!0},r),n({provide:fr,useValue:()=>V(r),multi:!0},r)}let l=o.providers;if(l!=null&&!s){let d=t;_f(l,u=>{n(u,d)})}}else return!1;return r!==t&&t.providers!==void 0}function _f(t,n){for(let e of t)af(e)&&(e=e.\u0275providers),Array.isArray(e)?_f(e,n):n(e)}var sw=Me({provide:String,useValue:Me});function y_(t){return t!==null&&typeof t=="object"&&sw in t}function lw(t){return!!(t&&t.useExisting)}function cw(t){return!!(t&&t.useFactory)}function lr(t){return typeof t=="function"}function C_(t){return!!t.useClass}var ka=new y(""),Nl={},o_={},Gu;function ao(){return Gu===void 0&&(Gu=new wa),Gu}var Ge=class{},cr=class extends Ge{parent;source;scopes;records=new Map;_ngOnDestroyHooks=new Set;_onDestroyHooks=[];get destroyed(){return this._destroyed}_destroyed=!1;injectorDefTypes;constructor(n,e,i,r){super(),this.parent=e,this.source=i,this.scopes=r,Xu(n,a=>this.processProvider(a)),this.records.set(pf,ro(void 0,this)),r.has("environment")&&this.records.set(Ge,ro(void 0,this));let o=this.records.get(ka);o!=null&&typeof o.value=="string"&&this.scopes.add(o.value),this.injectorDefTypes=new Set(this.get(hf,pt,{self:!0}))}retrieve(n,e){let i=sr(e)||0;try{return this.get(n,ar,i)}catch(r){if(io(r))return r;throw r}}destroy(){Da(this),this._destroyed=!0;let n=ee(null);try{for(let i of this._ngOnDestroyHooks)i.ngOnDestroy();let e=this._onDestroyHooks;this._onDestroyHooks=[];for(let i of e)i()}finally{this.records.clear(),this._ngOnDestroyHooks.clear(),this.injectorDefTypes.clear(),ee(n)}}onDestroy(n){return Da(this),this._onDestroyHooks.push(n),()=>this.removeOnDestroy(n)}runInContext(n){Da(this);let e=Vn(this),i=xt(void 0),r;try{return n()}finally{Vn(e),xt(i)}}get(n,e=ar,i){if(Da(this),n.hasOwnProperty(r_))return n[r_](this);let r=sr(i),o,a=Vn(this),s=xt(void 0);try{if(!(r&4)){let d=this.records.get(n);if(d===void 0){let u=pw(n)&&zl(n);u&&this.injectableDefInScope(u)?d=ro(Qu(n),Nl):d=null,this.records.set(n,d)}if(d!=null)return this.hydrate(n,d,r)}let l=r&2?ao():this.parent;return e=r&8&&e===ar?null:e,l.get(n,e)}catch(l){let d=ew(l);throw d===-200||d===-201?new X(d,null):l}finally{xt(s),Vn(a)}}resolveInjectorInitializers(){let n=ee(null),e=Vn(this),i=xt(void 0),r;try{let o=this.get(fr,pt,{self:!0});for(let a of o)a()}finally{Vn(e),xt(i),ee(n)}}toString(){return"R3Injector[...]"}processProvider(n){n=Je(n);let e=lr(n)?n:Je(n&&n.provide),i=uw(n);if(!lr(n)&&n.multi===!0){let r=this.records.get(e);r||(r=ro(void 0,Nl,!0),r.factory=()=>Ku(r.multi),this.records.set(e,r)),e=n,r.multi.push(n)}this.records.set(e,i)}hydrate(n,e,i){let r=ee(null);try{if(e.value===o_)throw uf("");return e.value===Nl&&(e.value=o_,e.value=e.factory(void 0,i)),typeof e.value=="object"&&e.value&&mw(e.value)&&this._ngOnDestroyHooks.add(e.value),e.value}finally{ee(r)}}injectableDefInScope(n){if(!n.providedIn)return!1;let e=Je(n.providedIn);return typeof e=="string"?e==="any"||this.scopes.has(e):this.injectorDefTypes.has(e)}removeOnDestroy(n){let e=this._onDestroyHooks.indexOf(n);e!==-1&&this._onDestroyHooks.splice(e,1)}};function Qu(t){let n=zl(t),e=n!==null?n.factory:bi(t);if(e!==null)return e;if(t instanceof y)throw new X(-204,!1);if(t instanceof Function)return dw(t);throw new X(-204,!1)}function dw(t){if(t.length>0)throw new X(-204,!1);let e=Qx(t);return e!==null?()=>e.factory(t):()=>new t}function uw(t){if(y_(t))return ro(void 0,t.useValue);{let n=bf(t);return ro(n,Nl)}}function bf(t,n,e){let i;if(lr(t)){let r=Je(t);return bi(r)||Qu(r)}else if(y_(t))i=()=>Je(t.useValue);else if(cw(t))i=()=>t.useFactory(...Ku(t.deps||[]));else if(lw(t))i=(r,o)=>V(Je(t.useExisting),o!==void 0&&o&8?8:void 0);else{let r=Je(t&&(t.useClass||t.provide));if(fw(t))i=()=>new r(...Ku(t.deps));else return bi(r)||Qu(r)}return i}function Da(t){if(t.destroyed)throw new X(-205,!1)}function ro(t,n,e=!1){return{factory:t,value:n,multi:e?[]:void 0}}function fw(t){return!!t.deps}function mw(t){return t!==null&&typeof t=="object"&&typeof t.ngOnDestroy=="function"}function pw(t){return typeof t=="function"||typeof t=="object"&&t.ngMetadataName==="InjectionToken"}function Xu(t,n){for(let e of t)Array.isArray(e)?Xu(e,n):e&&af(e)?Xu(e.\u0275providers,n):n(e)}function so(t,n){let e;t instanceof cr?(Da(t),e=t):e=new Zu(t);let i,r=Vn(e),o=xt(void 0);try{return n()}finally{Vn(r),xt(o)}}function D_(){return f_()!==void 0||Ol()!=null}var pn=0,te=1,re=2,et=3,Wt=4,wt=5,pr=6,lo=7,Ye=8,Zn=9,hn=10,Ie=11,co=12,vf=13,hr=14,Et=15,wi=16,gr=17,jn=18,Kn=19,yf=20,qn=21,Kl=22,vi=23,Ft=24,_r=25,Ei=26,Ve=27,x_=1,Cf=6,Mi=7,Ta=8,br=9,ze=10;function Qn(t){return Array.isArray(t)&&typeof t[x_]=="object"}function gn(t){return Array.isArray(t)&&t[x_]===!0}function Df(t){return(t.flags&4)!==0}function Xn(t){return t.componentOffset>-1}function uo(t){return(t.flags&1)===1}function _n(t){return!!t.template}function fo(t){return(t[re]&512)!==0}function vr(t){return(t[re]&256)===256}var xf="svg",w_="math";function Gt(t){for(;Array.isArray(t);)t=t[pn];return t}function wf(t,n){return Gt(n[t])}function bn(t,n){return Gt(n[t.index])}function Ql(t,n){return t.data[n]}function Ef(t,n){return t[n]}function Mf(t,n,e,i){e>=t.data.length&&(t.data[e]=null,t.blueprint[e]=null),n[e]=i}function Yt(t,n){let e=n[t];return Qn(e)?e:e[pn]}function E_(t){return(t[re]&4)===4}function Xl(t){return(t[re]&128)===128}function M_(t){return gn(t[et])}function Pt(t,n){return n==null?null:t[n]}function If(t){t[gr]=0}function Sf(t){t[re]&1024||(t[re]|=1024,Xl(t)&&yr(t))}function I_(t,n){for(;t>0;)n=n[hr],t--;return n}function Aa(t){return!!(t[re]&9216||t[Ft]?.dirty)}function Jl(t){t[hn].changeDetectionScheduler?.notify(8),t[re]&64&&(t[re]|=1024),Aa(t)&&yr(t)}function yr(t){t[hn].changeDetectionScheduler?.notify(0);let n=yi(t);for(;n!==null&&!(n[re]&8192||(n[re]|=8192,!Xl(n)));)n=yi(n)}function kf(t,n){if(vr(t))throw new X(911,!1);t[qn]===null&&(t[qn]=[]),t[qn].push(n)}function S_(t,n){if(t[qn]===null)return;let e=t[qn].indexOf(n);e!==-1&&t[qn].splice(e,1)}function yi(t){let n=t[et];return gn(n)?n[et]:n}function Tf(t){return t[lo]??=[]}function Af(t){return t.cleanup??=[]}function k_(t,n,e,i){let r=Tf(n);r.push(e),t.firstCreatePass&&Af(t).push(i,r.length-1)}var ae={lFrame:U_(null),bindingsEnabled:!0,skipHydrationRootTNode:null};var Ju=!1;function T_(){return ae.lFrame.elementDepthCount}function A_(){ae.lFrame.elementDepthCount++}function Rf(){ae.lFrame.elementDepthCount--}function ec(){return ae.bindingsEnabled}function Of(){return ae.skipHydrationRootTNode!==null}function Nf(t){return ae.skipHydrationRootTNode===t}function Ff(){ae.skipHydrationRootTNode=null}function ie(){return ae.lFrame.lView}function Fe(){return ae.lFrame.tView}function j(t){return ae.lFrame.contextLView=t,t[Ye]}function H(t){return ae.lFrame.contextLView=null,t}function tt(){let t=Pf();for(;t!==null&&t.type===64;)t=t.parent;return t}function Pf(){return ae.lFrame.currentTNode}function R_(){let t=ae.lFrame,n=t.currentTNode;return t.isParent?n:n.parent}function mo(t,n){let e=ae.lFrame;e.currentTNode=t,e.isParent=n}function Lf(){return ae.lFrame.isParent}function Vf(){ae.lFrame.isParent=!1}function O_(){return ae.lFrame.contextLView}function Bf(){return Ju}function Ea(t){let n=Ju;return Ju=t,n}function N_(){let t=ae.lFrame,n=t.bindingRootIndex;return n===-1&&(n=t.bindingRootIndex=t.tView.bindingStartIndex),n}function F_(){return ae.lFrame.bindingIndex}function P_(t){return ae.lFrame.bindingIndex=t}function Ii(){return ae.lFrame.bindingIndex++}function tc(t){let n=ae.lFrame,e=n.bindingIndex;return n.bindingIndex=n.bindingIndex+t,e}function L_(){return ae.lFrame.inI18n}function V_(t,n){let e=ae.lFrame;e.bindingIndex=e.bindingRootIndex=t,nc(n)}function B_(){return ae.lFrame.currentDirectiveIndex}function nc(t){ae.lFrame.currentDirectiveIndex=t}function j_(t){let n=ae.lFrame.currentDirectiveIndex;return n===-1?null:t[n]}function ic(){return ae.lFrame.currentQueryIndex}function Ra(t){ae.lFrame.currentQueryIndex=t}function hw(t){let n=t[te];return n.type===2?n.declTNode:n.type===1?t[wt]:null}function jf(t,n,e){if(e&4){let r=n,o=t;for(;r=r.parent,r===null&&!(e&1);)if(r=hw(o),r===null||(o=o[hr],r.type&10))break;if(r===null)return!1;n=r,t=o}let i=ae.lFrame=H_();return i.currentTNode=n,i.lView=t,!0}function rc(t){let n=H_(),e=t[te];ae.lFrame=n,n.currentTNode=e.firstChild,n.lView=t,n.tView=e,n.contextLView=t,n.bindingIndex=e.bindingStartIndex,n.inI18n=!1}function H_(){let t=ae.lFrame,n=t===null?null:t.child;return n===null?U_(t):n}function U_(t){let n={currentTNode:null,isParent:!0,lView:null,tView:null,selectedIndex:-1,contextLView:null,elementDepthCount:0,currentNamespace:null,currentDirectiveIndex:-1,bindingRootIndex:-1,bindingIndex:-1,currentQueryIndex:0,parent:t,child:null,inI18n:!1};return t!==null&&(t.child=n),n}function z_(){let t=ae.lFrame;return ae.lFrame=t.parent,t.currentTNode=null,t.lView=null,t}var Hf=z_;function oc(){let t=z_();t.isParent=!0,t.tView=null,t.selectedIndex=-1,t.contextLView=null,t.elementDepthCount=0,t.currentDirectiveIndex=-1,t.currentNamespace=null,t.bindingRootIndex=-1,t.bindingIndex=-1,t.currentQueryIndex=0}function $_(t){return(ae.lFrame.contextLView=I_(t,ae.lFrame.contextLView))[Ye]}function Hn(){return ae.lFrame.selectedIndex}function Si(t){ae.lFrame.selectedIndex=t}function Oa(){let t=ae.lFrame;return Ql(t.tView,t.selectedIndex)}function _t(){ae.lFrame.currentNamespace=xf}function Jn(){gw()}function gw(){ae.lFrame.currentNamespace=null}function W_(){return ae.lFrame.currentNamespace}var G_=!0;function ac(){return G_}function Na(t){G_=t}function ef(t,n=null,e=null,i){let r=Y_(t,n,e,i);return r.resolveInjectorInitializers(),r}function Y_(t,n=null,e=null,i,r=new Set){let o=[e||pt,b_(t)],a;return new cr(o,n||ao(),a||null,r)}var Y=class t{static THROW_IF_NOT_FOUND=ar;static NULL=new wa;static create(n,e){if(Array.isArray(n))return ef({name:""},e,n,"");{let i=n.name??"";return ef({name:i},n.parent,n.providers,i)}}static \u0275prov=D({token:t,providedIn:"any",factory:()=>V(pf)});static __NG_ELEMENT_ID__=-1},K=new y(""),Lt=(()=>{class t{static __NG_ELEMENT_ID__=_w;static __NG_ENV_ID__=e=>e}return t})(),Ll=class extends Lt{_lView;constructor(n){super(),this._lView=n}get destroyed(){return vr(this._lView)}onDestroy(n){let e=this._lView;return kf(e,n),()=>S_(e,n)}};function _w(){return new Ll(ie())}var q_=!1,Z_=new y(""),Cr=(()=>{class t{taskId=0;pendingTasks=new Set;destroyed=!1;pendingTask=new Ji(!1);debugTaskTracker=c(Z_,{optional:!0});get hasPendingTasks(){return this.destroyed?!1:this.pendingTask.value}get hasPendingTasksObservable(){return this.destroyed?new ue(e=>{e.next(!1),e.complete()}):this.pendingTask}add(){!this.hasPendingTasks&&!this.destroyed&&this.pendingTask.next(!0);let e=this.taskId++;return this.pendingTasks.add(e),this.debugTaskTracker?.add(e),e}has(e){return this.pendingTasks.has(e)}remove(e){this.pendingTasks.delete(e),this.debugTaskTracker?.remove(e),this.pendingTasks.size===0&&this.hasPendingTasks&&this.pendingTask.next(!1)}ngOnDestroy(){this.pendingTasks.clear(),this.hasPendingTasks&&this.pendingTask.next(!1),this.destroyed=!0,this.pendingTask.unsubscribe()}static \u0275prov=D({token:t,providedIn:"root",factory:()=>new t})}return t})(),tf=class extends M{__isAsync;destroyRef=void 0;pendingTasks=void 0;constructor(n=!1){super(),this.__isAsync=n,D_()&&(this.destroyRef=c(Lt,{optional:!0})??void 0,this.pendingTasks=c(Cr,{optional:!0})??void 0)}emit(n){let e=ee(null);try{super.next(n)}finally{ee(e)}}subscribe(n,e,i){let r=n,o=e||(()=>null),a=i;if(n&&typeof n=="object"){let l=n;r=l.next?.bind(l),o=l.error?.bind(l),a=l.complete?.bind(l)}this.__isAsync&&(o=this.wrapInTimeout(o),r&&(r=this.wrapInTimeout(r)),a&&(a=this.wrapInTimeout(a)));let s=super.subscribe({next:r,error:o,complete:a});return n instanceof ce&&n.add(s),s}wrapInTimeout(n){return e=>{let i=this.pendingTasks?.add();setTimeout(()=>{try{n(e)}finally{i!==void 0&&this.pendingTasks?.remove(i)}})}}},S=tf;function Vl(...t){}function Uf(t){let n,e;function i(){t=Vl;try{e!==void 0&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(e),n!==void 0&&clearTimeout(n)}catch{}}return n=setTimeout(()=>{t(),i()}),typeof requestAnimationFrame=="function"&&(e=requestAnimationFrame(()=>{t(),i()})),()=>i()}function K_(t){return queueMicrotask(()=>t()),()=>{t=Vl}}var zf="isAngularZone",Ma=zf+"_ID",bw=0,P=class t{hasPendingMacrotasks=!1;hasPendingMicrotasks=!1;isStable=!0;onUnstable=new S(!1);onMicrotaskEmpty=new S(!1);onStable=new S(!1);onError=new S(!1);constructor(n){let{enableLongStackTrace:e=!1,shouldCoalesceEventChangeDetection:i=!1,shouldCoalesceRunChangeDetection:r=!1,scheduleInRootZone:o=q_}=n;if(typeof Zone>"u")throw new X(908,!1);Zone.assertZonePatched();let a=this;a._nesting=0,a._outer=a._inner=Zone.current,Zone.TaskTrackingZoneSpec&&(a._inner=a._inner.fork(new Zone.TaskTrackingZoneSpec)),e&&Zone.longStackTraceZoneSpec&&(a._inner=a._inner.fork(Zone.longStackTraceZoneSpec)),a.shouldCoalesceEventChangeDetection=!r&&i,a.shouldCoalesceRunChangeDetection=r,a.callbackScheduled=!1,a.scheduleInRootZone=o,Cw(a)}static isInAngularZone(){return typeof Zone<"u"&&Zone.current.get(zf)===!0}static assertInAngularZone(){if(!t.isInAngularZone())throw new X(909,!1)}static assertNotInAngularZone(){if(t.isInAngularZone())throw new X(909,!1)}run(n,e,i){return this._inner.run(n,e,i)}runTask(n,e,i,r){let o=this._inner,a=o.scheduleEventTask("NgZoneEvent: "+r,n,vw,Vl,Vl);try{return o.runTask(a,e,i)}finally{o.cancelTask(a)}}runGuarded(n,e,i){return this._inner.runGuarded(n,e,i)}runOutsideAngular(n){return this._outer.run(n)}},vw={};function $f(t){if(t._nesting==0&&!t.hasPendingMicrotasks&&!t.isStable)try{t._nesting++,t.onMicrotaskEmpty.emit(null)}finally{if(t._nesting--,!t.hasPendingMicrotasks)try{t.runOutsideAngular(()=>t.onStable.emit(null))}finally{t.isStable=!0}}}function yw(t){if(t.isCheckStableRunning||t.callbackScheduled)return;t.callbackScheduled=!0;function n(){Uf(()=>{t.callbackScheduled=!1,nf(t),t.isCheckStableRunning=!0,$f(t),t.isCheckStableRunning=!1})}t.scheduleInRootZone?Zone.root.run(()=>{n()}):t._outer.run(()=>{n()}),nf(t)}function Cw(t){let n=()=>{yw(t)},e=bw++;t._inner=t._inner.fork({name:"angular",properties:{[zf]:!0,[Ma]:e,[Ma+e]:!0},onInvokeTask:(i,r,o,a,s,l)=>{if(Dw(l))return i.invokeTask(o,a,s,l);try{return a_(t),i.invokeTask(o,a,s,l)}finally{(t.shouldCoalesceEventChangeDetection&&a.type==="eventTask"||t.shouldCoalesceRunChangeDetection)&&n(),s_(t)}},onInvoke:(i,r,o,a,s,l,d)=>{try{return a_(t),i.invoke(o,a,s,l,d)}finally{t.shouldCoalesceRunChangeDetection&&!t.callbackScheduled&&!xw(l)&&n(),s_(t)}},onHasTask:(i,r,o,a)=>{i.hasTask(o,a),r===o&&(a.change=="microTask"?(t._hasPendingMicrotasks=a.microTask,nf(t),$f(t)):a.change=="macroTask"&&(t.hasPendingMacrotasks=a.macroTask))},onHandleError:(i,r,o,a)=>(i.handleError(o,a),t.runOutsideAngular(()=>t.onError.emit(a)),!1)})}function nf(t){t._hasPendingMicrotasks||(t.shouldCoalesceEventChangeDetection||t.shouldCoalesceRunChangeDetection)&&t.callbackScheduled===!0?t.hasPendingMicrotasks=!0:t.hasPendingMicrotasks=!1}function a_(t){t._nesting++,t.isStable&&(t.isStable=!1,t.onUnstable.emit(null))}function s_(t){t._nesting--,$f(t)}var Ia=class{hasPendingMicrotasks=!1;hasPendingMacrotasks=!1;isStable=!0;onUnstable=new S;onMicrotaskEmpty=new S;onStable=new S;onError=new S;run(n,e,i){return n.apply(e,i)}runGuarded(n,e,i){return n.apply(e,i)}runOutsideAngular(n){return n()}runTask(n,e,i,r){return n.apply(e,i)}};function Dw(t){return Q_(t,"__ignore_ng_zone__")}function xw(t){return Q_(t,"__scheduler_tick__")}function Q_(t,n){return!Array.isArray(t)||t.length!==1?!1:t[0]?.data?.[n]===!0}var ht=class{_console=console;handleError(n){this._console.error("ERROR",n)}},ei=new y("",{factory:()=>{let t=c(P),n=c(Ge),e;return i=>{t.runOutsideAngular(()=>{n.destroyed&&!e?setTimeout(()=>{throw i}):(e??=n.get(ht),e.handleError(i))})}}}),X_={provide:fr,useValue:()=>{let t=c(ht,{optional:!0})},multi:!0},ww=new y("",{factory:()=>{let t=c(K).defaultView;if(!t)return;let n=c(ei),e=o=>{n(o.reason),o.preventDefault()},i=o=>{o.error?n(o.error):n(new Error(o.message,{cause:o})),o.preventDefault()},r=()=>{t.addEventListener("unhandledrejection",e),t.addEventListener("error",i)};typeof Zone<"u"?Zone.root.run(r):r(),c(Lt).onDestroy(()=>{t.removeEventListener("error",i),t.removeEventListener("unhandledrejection",e)})}});function Wf(){return mr([__(()=>{c(ww)})])}function x(t,n){let[e,i,r]=ku(t,n?.equal),o=e,a=o[Xe];return o.set=i,o.update=r,o.asReadonly=Gf.bind(o),o}function Gf(){let t=this[Xe];if(t.readonlyFn===void 0){let n=()=>this();n[Xe]=t,t.readonlyFn=n}return t.readonlyFn}var po=(()=>{class t{view;node;constructor(e,i){this.view=e,this.node=i}static __NG_ELEMENT_ID__=Ew}return t})();function Ew(){return new po(ie(),tt())}var Bn=class{},Fa=new y("",{factory:()=>!0});var Yf=new y(""),Pa=(()=>{class t{internalPendingTasks=c(Cr);scheduler=c(Bn);errorHandler=c(ei);add(){let e=this.internalPendingTasks.add();return()=>{this.internalPendingTasks.has(e)&&(this.scheduler.notify(11),this.internalPendingTasks.remove(e))}}run(e){let i=this.add();e().catch(this.errorHandler).finally(i)}static \u0275prov=D({token:t,providedIn:"root",factory:()=>new t})}return t})(),sc=(()=>{class t{static \u0275prov=D({token:t,providedIn:"root",factory:()=>new rf})}return t})(),rf=class{dirtyEffectCount=0;queues=new Map;add(n){this.enqueue(n),this.schedule(n)}schedule(n){n.dirty&&this.dirtyEffectCount++}remove(n){let e=n.zone,i=this.queues.get(e);i.has(n)&&(i.delete(n),n.dirty&&this.dirtyEffectCount--)}enqueue(n){let e=n.zone;this.queues.has(e)||this.queues.set(e,new Set);let i=this.queues.get(e);i.has(n)||i.add(n)}flush(){for(;this.dirtyEffectCount>0;){let n=!1;for(let[e,i]of this.queues)e===null?n||=this.flushQueue(i):n||=e.run(()=>this.flushQueue(i));n||(this.dirtyEffectCount=0)}}flushQueue(n){let e=!1;for(let i of n)i.dirty&&(this.dirtyEffectCount--,e=!0,i.run());return e}},Bl=class{[Xe];constructor(n){this[Xe]=n}destroy(){this[Xe].destroy()}};function vn(t,n){let e=n?.injector??c(Y),i=n?.manualCleanup!==!0?e.get(Lt):null,r,o=e.get(po,null,{optional:!0}),a=e.get(Bn);return o!==null?(r=Sw(o.view,a,t),i instanceof Ll&&i._lView===o.view&&(i=null)):r=kw(t,e.get(sc),a),r.injector=e,i!==null&&(r.onDestroyFns=[i.onDestroy(()=>r.destroy())]),new Bl(r)}var J_=se(I({},Au),{cleanupFns:void 0,zone:null,onDestroyFns:null,run(){let t=Ea(!1);try{Ru(this)}finally{Ea(t)}},cleanup(){if(!this.cleanupFns?.length)return;let t=ee(null);try{for(;this.cleanupFns.length;)this.cleanupFns.pop()()}finally{this.cleanupFns=[],ee(t)}}}),Mw=se(I({},J_),{consumerMarkedDirty(){this.scheduler.schedule(this),this.notifier.notify(12)},destroy(){if(gi(this),this.onDestroyFns!==null)for(let t of this.onDestroyFns)t();this.cleanup(),this.scheduler.remove(this)}}),Iw=se(I({},J_),{consumerMarkedDirty(){this.view[re]|=8192,yr(this.view),this.notifier.notify(13)},destroy(){if(gi(this),this.onDestroyFns!==null)for(let t of this.onDestroyFns)t();this.cleanup(),this.view[vi]?.delete(this)}});function Sw(t,n,e){let i=Object.create(Iw);return i.view=t,i.zone=typeof Zone<"u"?Zone.current:null,i.notifier=n,i.fn=eb(i,e),t[vi]??=new Set,t[vi].add(i),i.consumerMarkedDirty(i),i}function kw(t,n,e){let i=Object.create(Mw);return i.fn=eb(i,t),i.scheduler=n,i.notifier=e,i.zone=typeof Zone<"u"?Zone.current:null,i.scheduler.add(i),i.notifier.notify(12),i}function eb(t,n){return()=>{n(e=>(t.cleanupFns??=[]).push(e))}}function Ga(t){return{toString:t}.toString()}function Vw(t){return typeof t=="function"}function Nb(t,n,e,i){n!==null?n.applyValueToInputSignal(n,i):t[e]=i}var _c=class{previousValue;currentValue;firstChange;constructor(n,e,i){this.previousValue=n,this.currentValue=e,this.firstChange=i}isFirstChange(){return this.firstChange}},Be=(()=>{let t=()=>Fb;return t.ngInherit=!0,t})();function Fb(t){return t.type.prototype.ngOnChanges&&(t.setInput=jw),Bw}function Bw(){let t=Lb(this),n=t?.current;if(n){let e=t.previous;if(e===mn)t.previous=n;else for(let i in n)e[i]=n[i];t.current=null,this.ngOnChanges(n)}}function jw(t,n,e,i,r){let o=this.declaredInputs[i],a=Lb(t)||Hw(t,{previous:mn,current:null}),s=a.current||(a.current={}),l=a.previous,d=l[o];s[o]=new _c(d&&d.currentValue,e,l===mn),Nb(t,n,r,e)}var Pb="__ngSimpleChanges__";function Lb(t){return t[Pb]||null}function Hw(t,n){return t[Pb]=n}var tb=[];var De=function(t,n=null,e){for(let i=0;i<tb.length;i++){let r=tb[i];r(t,n,e)}},ge=(function(t){return t[t.TemplateCreateStart=0]="TemplateCreateStart",t[t.TemplateCreateEnd=1]="TemplateCreateEnd",t[t.TemplateUpdateStart=2]="TemplateUpdateStart",t[t.TemplateUpdateEnd=3]="TemplateUpdateEnd",t[t.LifecycleHookStart=4]="LifecycleHookStart",t[t.LifecycleHookEnd=5]="LifecycleHookEnd",t[t.OutputStart=6]="OutputStart",t[t.OutputEnd=7]="OutputEnd",t[t.BootstrapApplicationStart=8]="BootstrapApplicationStart",t[t.BootstrapApplicationEnd=9]="BootstrapApplicationEnd",t[t.BootstrapComponentStart=10]="BootstrapComponentStart",t[t.BootstrapComponentEnd=11]="BootstrapComponentEnd",t[t.ChangeDetectionStart=12]="ChangeDetectionStart",t[t.ChangeDetectionEnd=13]="ChangeDetectionEnd",t[t.ChangeDetectionSyncStart=14]="ChangeDetectionSyncStart",t[t.ChangeDetectionSyncEnd=15]="ChangeDetectionSyncEnd",t[t.AfterRenderHooksStart=16]="AfterRenderHooksStart",t[t.AfterRenderHooksEnd=17]="AfterRenderHooksEnd",t[t.ComponentStart=18]="ComponentStart",t[t.ComponentEnd=19]="ComponentEnd",t[t.DeferBlockStateStart=20]="DeferBlockStateStart",t[t.DeferBlockStateEnd=21]="DeferBlockStateEnd",t[t.DynamicComponentStart=22]="DynamicComponentStart",t[t.DynamicComponentEnd=23]="DynamicComponentEnd",t[t.HostBindingsUpdateStart=24]="HostBindingsUpdateStart",t[t.HostBindingsUpdateEnd=25]="HostBindingsUpdateEnd",t})(ge||{});function Uw(t,n,e){let{ngOnChanges:i,ngOnInit:r,ngDoCheck:o}=n.type.prototype;if(i){let a=Fb(n);(e.preOrderHooks??=[]).push(t,a),(e.preOrderCheckHooks??=[]).push(t,a)}r&&(e.preOrderHooks??=[]).push(0-t,r),o&&((e.preOrderHooks??=[]).push(t,o),(e.preOrderCheckHooks??=[]).push(t,o))}function Vb(t,n){for(let e=n.directiveStart,i=n.directiveEnd;e<i;e++){let o=t.data[e].type.prototype,{ngAfterContentInit:a,ngAfterContentChecked:s,ngAfterViewInit:l,ngAfterViewChecked:d,ngOnDestroy:u}=o;a&&(t.contentHooks??=[]).push(-e,a),s&&((t.contentHooks??=[]).push(e,s),(t.contentCheckHooks??=[]).push(e,s)),l&&(t.viewHooks??=[]).push(-e,l),d&&((t.viewHooks??=[]).push(e,d),(t.viewCheckHooks??=[]).push(e,d)),u!=null&&(t.destroyHooks??=[]).push(e,u)}}function fc(t,n,e){Bb(t,n,3,e)}function mc(t,n,e,i){(t[re]&3)===e&&Bb(t,n,e,i)}function qf(t,n){let e=t[re];(e&3)===n&&(e&=16383,e+=1,t[re]=e)}function Bb(t,n,e,i){let r=i!==void 0?t[gr]&65535:0,o=i??-1,a=n.length-1,s=0;for(let l=r;l<a;l++)if(typeof n[l+1]=="number"){if(s=n[l],i!=null&&s>=i)break}else n[l]<0&&(t[gr]+=65536),(s<o||o==-1)&&(zw(t,e,n,l),t[gr]=(t[gr]&4294901760)+l+2),l++}function nb(t,n){De(ge.LifecycleHookStart,t,n);let e=ee(null);try{n.call(t)}finally{ee(e),De(ge.LifecycleHookEnd,t,n)}}function zw(t,n,e,i){let r=e[i]<0,o=e[i+1],a=r?-e[i]:e[i],s=t[a];r?t[re]>>14<t[gr]>>16&&(t[re]&3)===n&&(t[re]+=16384,nb(s,o)):nb(s,o)}var go=-1,xr=class{factory;name;injectImpl;resolving=!1;canSeeViewProviders;multi;componentProviders;index;providerFactory;constructor(n,e,i,r){this.factory=n,this.name=r,this.canSeeViewProviders=e,this.injectImpl=i}};function $w(t){return(t.flags&8)!==0}function Ww(t){return(t.flags&16)!==0}function Gw(t,n,e){let i=0;for(;i<e.length;){let r=e[i];if(typeof r=="number"){if(r!==0)break;i++;let o=e[i++],a=e[i++],s=e[i++];t.setAttribute(n,a,s,o)}else{let o=r,a=e[++i];Yw(o)?t.setProperty(n,o,a):t.setAttribute(n,o,a),i++}}return i}function jb(t){return t===3||t===4||t===6}function Yw(t){return t.charCodeAt(0)===64}function _o(t,n){if(!(n===null||n.length===0))if(t===null||t.length===0)t=n.slice();else{let e=-1;for(let i=0;i<n.length;i++){let r=n[i];typeof r=="number"?e=r:e===0||(e===-1||e===2?ib(t,e,r,null,n[++i]):ib(t,e,r,null,null))}}return t}function ib(t,n,e,i,r){let o=0,a=t.length;if(n===-1)a=-1;else for(;o<t.length;){let s=t[o++];if(typeof s=="number"){if(s===n){a=-1;break}else if(s>n){a=o-1;break}}}for(;o<t.length;){let s=t[o];if(typeof s=="number")break;if(s===e){r!==null&&(t[o+1]=r);return}o++,r!==null&&o++}a!==-1&&(t.splice(a,0,n),o=a+1),t.splice(o++,0,e),r!==null&&t.splice(o++,0,r)}function Hb(t){return t!==go}function bc(t){return t&32767}function qw(t){return t>>16}function vc(t,n){let e=qw(t),i=n;for(;e>0;)i=i[hr],e--;return i}var rm=!0;function yc(t){let n=rm;return rm=t,n}var Zw=256,Ub=Zw-1,zb=5,Kw=0,Un={};function Qw(t,n,e){let i;typeof e=="string"?i=e.charCodeAt(0)||0:e.hasOwnProperty(dr)&&(i=e[dr]),i==null&&(i=e[dr]=Kw++);let r=i&Ub,o=1<<r;n.data[t+(r>>zb)]|=o}function Cc(t,n){let e=$b(t,n);if(e!==-1)return e;let i=n[te];i.firstCreatePass&&(t.injectorIndex=n.length,Zf(i.data,t),Zf(n,null),Zf(i.blueprint,null));let r=zm(t,n),o=t.injectorIndex;if(Hb(r)){let a=bc(r),s=vc(r,n),l=s[te].data;for(let d=0;d<8;d++)n[o+d]=s[a+d]|l[a+d]}return n[o+8]=r,o}function Zf(t,n){t.push(0,0,0,0,0,0,0,0,n)}function $b(t,n){return t.injectorIndex===-1||t.parent&&t.parent.injectorIndex===t.injectorIndex||n[t.injectorIndex+8]===null?-1:t.injectorIndex}function zm(t,n){if(t.parent&&t.parent.injectorIndex!==-1)return t.parent.injectorIndex;let e=0,i=null,r=n;for(;r!==null;){if(i=Zb(r),i===null)return go;if(e++,r=r[hr],i.injectorIndex!==-1)return i.injectorIndex|e<<16}return go}function om(t,n,e){Qw(t,n,e)}function Xw(t,n){if(n==="class")return t.classes;if(n==="style")return t.styles;let e=t.attrs;if(e){let i=e.length,r=0;for(;r<i;){let o=e[r];if(jb(o))break;if(o===0)r=r+2;else if(typeof o=="number")for(r++;r<i&&typeof e[r]=="string";)r++;else{if(o===n)return e[r+1];r=r+2}}}return null}function Wb(t,n,e){if(e&8||t!==void 0)return t;Gl(n,"NodeInjector")}function Gb(t,n,e,i){if(e&8&&i===void 0&&(i=null),(e&3)===0){let r=t[Zn],o=xt(void 0);try{return r?r.get(n,i,e&8):ff(n,i,e&8)}finally{xt(o)}}return Wb(i,n,e)}function Yb(t,n,e,i=0,r){if(t!==null){if(n[re]&2048&&!(i&2)){let a=nE(t,n,e,i,Un);if(a!==Un)return a}let o=qb(t,n,e,i,Un);if(o!==Un)return o}return Gb(n,e,i,r)}function qb(t,n,e,i,r){let o=eE(e);if(typeof o=="function"){if(!jf(n,t,i))return i&1?Wb(r,e,i):Gb(n,e,i,r);try{let a;if(a=o(i),a==null&&!(i&8))Gl(e);else return a}finally{Hf()}}else if(typeof o=="number"){let a=null,s=$b(t,n),l=go,d=i&1?n[Et][wt]:null;for((s===-1||i&4)&&(l=s===-1?zm(t,n):n[s+8],l===go||!ob(i,!1)?s=-1:(a=n[te],s=bc(l),n=vc(l,n)));s!==-1;){let u=n[te];if(rb(o,s,u.data)){let f=Jw(s,n,e,a,i,d);if(f!==Un)return f}l=n[s+8],l!==go&&ob(i,n[te].data[s+8]===d)&&rb(o,s,n)?(a=u,s=bc(l),n=vc(l,n)):s=-1}}return r}function Jw(t,n,e,i,r,o){let a=n[te],s=a.data[t+8],l=i==null?Xn(s)&&rm:i!=a&&(s.type&3)!==0,d=r&1&&o===s,u=pc(s,a,e,l,d);return u!==null?ja(n,a,u,s,r):Un}function pc(t,n,e,i,r){let o=t.providerIndexes,a=n.data,s=o&1048575,l=t.directiveStart,d=t.directiveEnd,u=o>>20,f=i?s:s+u,_=r?s+u:d;for(let g=f;g<_;g++){let C=a[g];if(g<l&&e===C||g>=l&&C.type===e)return g}if(r){let g=a[l];if(g&&_n(g)&&g.type===e)return l}return null}function ja(t,n,e,i,r){let o=t[e],a=n.data;if(o instanceof xr){let s=o;if(s.resolving)throw uf("");let l=yc(s.canSeeViewProviders);s.resolving=!0;let d=a[e].type||a[e],u,f=s.injectImpl?xt(s.injectImpl):null,_=jf(t,i,0);try{o=t[e]=s.factory(void 0,r,a,t,i),n.firstCreatePass&&e>=i.directiveStart&&Uw(e,a[e],n)}finally{f!==null&&xt(f),yc(l),s.resolving=!1,Hf()}}return o}function eE(t){if(typeof t=="string")return t.charCodeAt(0)||0;let n=t.hasOwnProperty(dr)?t[dr]:void 0;return typeof n=="number"?n>=0?n&Ub:tE:n}function rb(t,n,e){let i=1<<t;return!!(e[n+(t>>zb)]&i)}function ob(t,n){return!(t&2)&&!(t&1&&n)}var Dr=class{_tNode;_lView;constructor(n,e){this._tNode=n,this._lView=e}get(n,e,i){return Yb(this._tNode,this._lView,n,sr(i),e)}};function tE(){return new Dr(tt(),ie())}function Vt(t){return Ga(()=>{let n=t.prototype.constructor,e=n[xa]||am(n),i=Object.prototype,r=Object.getPrototypeOf(t.prototype).constructor;for(;r&&r!==i;){let o=r[xa]||am(r);if(o&&o!==e)return o;r=Object.getPrototypeOf(r)}return o=>new o})}function am(t){return of(t)?()=>{let n=am(Je(t));return n&&n()}:bi(t)}function nE(t,n,e,i,r){let o=t,a=n;for(;o!==null&&a!==null&&a[re]&2048&&!fo(a);){let s=qb(o,a,e,i|2,Un);if(s!==Un)return s;let l=o.parent;if(!l){let d=a[yf];if(d){let u=d.get(e,Un,i&-5);if(u!==Un)return u}l=Zb(a),a=a[hr]}o=l}return r}function Zb(t){let n=t[te],e=n.type;return e===2?n.declTNode:e===1?t[wt]:null}function $m(t){return Xw(tt(),t)}function iE(){return xo(tt(),ie())}function xo(t,n){return new L(bn(t,n))}var L=(()=>{class t{nativeElement;constructor(e){this.nativeElement=e}static __NG_ELEMENT_ID__=iE}return t})();function Kb(t){return t instanceof L?t.nativeElement:t}function rE(){return this._results[Symbol.iterator]()}var ti=class{_emitDistinctChangesOnly;dirty=!0;_onDirty=void 0;_results=[];_changesDetected=!1;_changes=void 0;length=0;first=void 0;last=void 0;get changes(){return this._changes??=new M}constructor(n=!1){this._emitDistinctChangesOnly=n}get(n){return this._results[n]}map(n){return this._results.map(n)}filter(n){return this._results.filter(n)}find(n){return this._results.find(n)}reduce(n,e){return this._results.reduce(n,e)}forEach(n){this._results.forEach(n)}some(n){return this._results.some(n)}toArray(){return this._results.slice()}toString(){return this._results.toString()}reset(n,e){this.dirty=!1;let i=p_(n);(this._changesDetected=!m_(this._results,i,e))&&(this._results=i,this.length=i.length,this.last=i[this.length-1],this.first=i[0])}notifyOnChanges(){this._changes!==void 0&&(this._changesDetected||!this._emitDistinctChangesOnly)&&this._changes.next(this)}onDirty(n){this._onDirty=n}setDirty(){this.dirty=!0,this._onDirty?.()}destroy(){this._changes!==void 0&&(this._changes.complete(),this._changes.unsubscribe())}[Symbol.iterator]=rE};function Qb(t){return(t.flags&128)===128}var Wm=(function(t){return t[t.OnPush=0]="OnPush",t[t.Eager=1]="Eager",t[t.Default=1]="Default",t})(Wm||{}),Xb=new Map,oE=0;function aE(){return oE++}function sE(t){Xb.set(t[Kn],t)}function sm(t){Xb.delete(t[Kn])}var ab="__ngContext__";function bo(t,n){Qn(n)?(t[ab]=n[Kn],sE(n)):t[ab]=n}function Jb(t){return tv(t[co])}function ev(t){return tv(t[Wt])}function tv(t){for(;t!==null&&!gn(t);)t=t[Wt];return t}var lm;function Gm(t){lm=t}function nv(){if(lm!==void 0)return lm;if(typeof document<"u")return document;throw new X(210,!1)}var Ai=new y("",{factory:()=>lE}),lE="ng";var Tc=new y(""),Mr=new y("",{providedIn:"platform",factory:()=>"unknown"}),Ya=new y(""),Ir=new y("",{factory:()=>c(K).body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce")||null});var iv="r";var rv="di";var ov=!1,av=new y("",{factory:()=>ov});var cE=(t,n,e,i)=>{};function dE(t,n,e,i){cE(t,n,e,i)}function Ac(t){return(t.flags&32)===32}var uE=()=>null;function sv(t,n,e=!1){return uE(t,n,e)}function lv(t,n){let e=t.contentQueries;if(e!==null){let i=ee(null);try{for(let r=0;r<e.length;r+=2){let o=e[r],a=e[r+1];if(a!==-1){let s=t.data[a];Ra(o),s.contentQueries(2,n[a],a)}}}finally{ee(i)}}}function cm(t,n,e){Ra(0);let i=ee(null);try{n(t,e)}finally{ee(i)}}function Ym(t,n,e){if(Df(n)){let i=ee(null);try{let r=n.directiveStart,o=n.directiveEnd;for(let a=r;a<o;a++){let s=t.data[a];if(s.contentQueries){let l=e[a];s.contentQueries(1,l,a)}}}finally{ee(i)}}}var Dn=(function(t){return t[t.Emulated=0]="Emulated",t[t.None=2]="None",t[t.ShadowDom=3]="ShadowDom",t[t.ExperimentalIsolatedShadowDom=4]="ExperimentalIsolatedShadowDom",t})(Dn||{});var lc;function fE(){if(lc===void 0&&(lc=null,Di.trustedTypes))try{lc=Di.trustedTypes.createPolicy("angular",{createHTML:t=>t,createScript:t=>t,createScriptURL:t=>t})}catch{}return lc}function Rc(t){return fE()?.createHTML(t)||t}var cc;function mE(){if(cc===void 0&&(cc=null,Di.trustedTypes))try{cc=Di.trustedTypes.createPolicy("angular#unsafe-bypass",{createHTML:t=>t,createScript:t=>t,createScriptURL:t=>t})}catch{}return cc}function sb(t){return mE()?.createHTML(t)||t}var ni=class{changingThisBreaksApplicationSecurity;constructor(n){this.changingThisBreaksApplicationSecurity=n}toString(){return`SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${jl})`}},dm=class extends ni{getTypeName(){return"HTML"}},um=class extends ni{getTypeName(){return"Style"}},fm=class extends ni{getTypeName(){return"Script"}},mm=class extends ni{getTypeName(){return"URL"}},pm=class extends ni{getTypeName(){return"ResourceURL"}};function xn(t){return t instanceof ni?t.changingThisBreaksApplicationSecurity:t}function ii(t,n){let e=cv(t);if(e!=null&&e!==n){if(e==="ResourceURL"&&n==="URL")return!0;throw new Error(`Required a safe ${n}, got a ${e} (see ${jl})`)}return e===n}function cv(t){return t instanceof ni&&t.getTypeName()||null}function qm(t){return new dm(t)}function Zm(t){return new um(t)}function Km(t){return new fm(t)}function Qm(t){return new mm(t)}function Xm(t){return new pm(t)}function pE(t){let n=new gm(t);return hE()?new hm(n):n}var hm=class{inertDocumentHelper;constructor(n){this.inertDocumentHelper=n}getInertBodyElement(n){n="<body><remove></remove>"+n;try{let e=new window.DOMParser().parseFromString(Rc(n),"text/html").body;return e===null?this.inertDocumentHelper.getInertBodyElement(n):(e.firstChild?.remove(),e)}catch{return null}}},gm=class{defaultDoc;inertDocument;constructor(n){this.defaultDoc=n,this.inertDocument=this.defaultDoc.implementation.createHTMLDocument("sanitization-inert")}getInertBodyElement(n){let e=this.inertDocument.createElement("template");return e.innerHTML=Rc(n),e}};function hE(){try{return!!new window.DOMParser().parseFromString(Rc(""),"text/html")}catch{return!1}}var gE=/^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;function qa(t){return t=String(t),t.match(gE)?t:"unsafe:"+t}function ri(t){let n={};for(let e of t.split(","))n[e]=!0;return n}function Za(...t){let n={};for(let e of t)for(let i in e)e.hasOwnProperty(i)&&(n[i]=!0);return n}var dv=ri("area,br,col,hr,img,wbr"),uv=ri("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),fv=ri("rp,rt"),_E=Za(fv,uv),bE=Za(uv,ri("address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul")),vE=Za(fv,ri("a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video")),lb=Za(dv,bE,vE,_E),mv=ri("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),yE=ri("abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"),CE=ri("aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"),DE=Za(mv,yE,CE),xE=ri("script,style,template");var _m=class{sanitizedSomething=!1;buf=[];sanitizeChildren(n){let e=n.firstChild,i=!0,r=[];for(;e;){if(e.nodeType===Node.ELEMENT_NODE?i=this.startElement(e):e.nodeType===Node.TEXT_NODE?this.chars(e.nodeValue):this.sanitizedSomething=!0,i&&e.firstChild){r.push(e),e=ME(e);continue}for(;e;){e.nodeType===Node.ELEMENT_NODE&&this.endElement(e);let o=EE(e);if(o){e=o;break}e=r.pop()}}return this.buf.join("")}startElement(n){let e=cb(n).toLowerCase();if(!lb.hasOwnProperty(e))return this.sanitizedSomething=!0,!xE.hasOwnProperty(e);this.buf.push("<"),this.buf.push(e);let i=n.attributes;for(let r=0;r<i.length;r++){let o=i.item(r),a=o.name,s=a.toLowerCase();if(!DE.hasOwnProperty(s)){this.sanitizedSomething=!0;continue}let l=o.value;mv[s]&&(l=qa(l)),this.buf.push(" ",a,'="',db(l),'"')}return this.buf.push(">"),!0}endElement(n){let e=cb(n).toLowerCase();lb.hasOwnProperty(e)&&!dv.hasOwnProperty(e)&&(this.buf.push("</"),this.buf.push(e),this.buf.push(">"))}chars(n){this.buf.push(db(n))}};function wE(t,n){return(t.compareDocumentPosition(n)&Node.DOCUMENT_POSITION_CONTAINED_BY)!==Node.DOCUMENT_POSITION_CONTAINED_BY}function EE(t){let n=t.nextSibling;if(n&&t!==n.previousSibling)throw pv(n);return n}function ME(t){let n=t.firstChild;if(n&&wE(t,n))throw pv(n);return n}function cb(t){let n=t.nodeName;return typeof n=="string"?n:"FORM"}function pv(t){return new Error(`Failed to sanitize html because the element is clobbered: ${t.outerHTML}`)}var IE=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,SE=/([^\#-~ |!])/g;function db(t){return t.replace(/&/g,"&amp;").replace(IE,function(n){let e=n.charCodeAt(0),i=n.charCodeAt(1);return"&#"+((e-55296)*1024+(i-56320)+65536)+";"}).replace(SE,function(n){return"&#"+n.charCodeAt(0)+";"}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}var dc;function Oc(t,n){let e=null;try{dc=dc||pE(t);let i=n?String(n):"";e=dc.getInertBodyElement(i);let r=5,o=i;do{if(r===0)throw new Error("Failed to sanitize html because the input is unstable");r--,i=o,o=e.innerHTML,e=dc.getInertBodyElement(i)}while(i!==o);let s=new _m().sanitizeChildren(ub(e)||e);return Rc(s)}finally{if(e){let i=ub(e)||e;for(;i.firstChild;)i.firstChild.remove()}}}function ub(t){return"content"in t&&kE(t)?t.content:null}function kE(t){return t.nodeType===Node.ELEMENT_NODE&&t.nodeName==="TEMPLATE"}var TE=/^>|^->|<!--|-->|--!>|<!-$/g,AE=/(<|>)/g,RE="\u200B$1\u200B";function OE(t){return t.replace(TE,n=>n.replace(AE,RE))}function NE(t,n){return t.createText(n)}function FE(t,n,e){t.setValue(n,e)}function PE(t,n){return t.createComment(OE(n))}function hv(t,n,e){return t.createElement(n,e)}function Dc(t,n,e,i,r){t.insertBefore(n,e,i,r)}function gv(t,n,e){t.appendChild(n,e)}function fb(t,n,e,i,r){i!==null?Dc(t,n,e,i,r):gv(t,n,e)}function _v(t,n,e,i){t.removeChild(null,n,e,i)}function LE(t,n,e){t.setAttribute(n,"style",e)}function VE(t,n,e){e===""?t.removeAttribute(n,"class"):t.setAttribute(n,"class",e)}function bv(t,n,e){let{mergedAttrs:i,classes:r,styles:o}=e;i!==null&&Gw(t,n,i),r!==null&&VE(t,n,r),o!==null&&LE(t,n,o)}var nt=(function(t){return t[t.NONE=0]="NONE",t[t.HTML=1]="HTML",t[t.STYLE=2]="STYLE",t[t.SCRIPT=3]="SCRIPT",t[t.URL=4]="URL",t[t.RESOURCE_URL=5]="RESOURCE_URL",t})(nt||{});function Jm(t){let n=vv();return n?sb(n.sanitize(nt.HTML,t)||""):ii(t,"HTML")?sb(xn(t)):Oc(nv(),ur(t))}function Ka(t){let n=vv();return n?n.sanitize(nt.URL,t)||"":ii(t,"URL")?xn(t):qa(ur(t))}function vv(){let t=ie();return t&&t[hn].sanitizer}function Nc(t){return t.ownerDocument}function BE(t,n,e){let i=t.length;for(;;){let r=t.indexOf(n,e);if(r===-1)return r;if(r===0||t.charCodeAt(r-1)<=32){let o=n.length;if(r+o===i||t.charCodeAt(r+o)<=32)return r}e=r+1}}var yv="ng-template";function jE(t,n,e,i){let r=0;if(i){for(;r<n.length&&typeof n[r]=="string";r+=2)if(n[r]==="class"&&BE(n[r+1].toLowerCase(),e,0)!==-1)return!0}else if(ep(t))return!1;if(r=n.indexOf(1,r),r>-1){let o;for(;++r<n.length&&typeof(o=n[r])=="string";)if(o.toLowerCase()===e)return!0}return!1}function ep(t){return t.type===4&&t.value!==yv}function HE(t,n,e){let i=t.type===4&&!e?yv:t.value;return n===i}function UE(t,n,e){let i=4,r=t.attrs,o=r!==null?WE(r):0,a=!1;for(let s=0;s<n.length;s++){let l=n[s];if(typeof l=="number"){if(!a&&!yn(i)&&!yn(l))return!1;if(a&&yn(l))continue;a=!1,i=l|i&1;continue}if(!a)if(i&4){if(i=2|i&1,l!==""&&!HE(t,l,e)||l===""&&n.length===1){if(yn(i))return!1;a=!0}}else if(i&8){if(r===null||!jE(t,r,l,e)){if(yn(i))return!1;a=!0}}else{let d=n[++s],u=zE(l,r,ep(t),e);if(u===-1){if(yn(i))return!1;a=!0;continue}if(d!==""){let f;if(u>o?f="":f=r[u+1].toLowerCase(),i&2&&d!==f){if(yn(i))return!1;a=!0}}}}return yn(i)||a}function yn(t){return(t&1)===0}function zE(t,n,e,i){if(n===null)return-1;let r=0;if(i||!e){let o=!1;for(;r<n.length;){let a=n[r];if(a===t)return r;if(a===3||a===6)o=!0;else if(a===1||a===2){let s=n[++r];for(;typeof s=="string";)s=n[++r];continue}else{if(a===4)break;if(a===0){r+=4;continue}}r+=o?1:2}return-1}else return GE(n,t)}function Cv(t,n,e=!1){for(let i=0;i<n.length;i++)if(UE(t,n[i],e))return!0;return!1}function $E(t){let n=t.attrs;if(n!=null){let e=n.indexOf(5);if((e&1)===0)return n[e+1]}return null}function WE(t){for(let n=0;n<t.length;n++){let e=t[n];if(jb(e))return n}return t.length}function GE(t,n){let e=t.indexOf(4);if(e>-1)for(e++;e<t.length;){let i=t[e];if(typeof i=="number")return-1;if(i===n)return e;e++}return-1}function YE(t,n){e:for(let e=0;e<n.length;e++){let i=n[e];if(t.length===i.length){for(let r=0;r<t.length;r++)if(t[r]!==i[r])continue e;return!0}}return!1}function mb(t,n){return t?":not("+n.trim()+")":n}function qE(t){let n=t[0],e=1,i=2,r="",o=!1;for(;e<t.length;){let a=t[e];if(typeof a=="string")if(i&2){let s=t[++e];r+="["+a+(s.length>0?'="'+s+'"':"")+"]"}else i&8?r+="."+a:i&4&&(r+=" "+a);else r!==""&&!yn(a)&&(n+=mb(o,r),r=""),i=a,o=o||!yn(i);e++}return r!==""&&(n+=mb(o,r)),n}function ZE(t){return t.map(qE).join(",")}function KE(t){let n=[],e=[],i=1,r=2;for(;i<t.length;){let o=t[i];if(typeof o=="string")r===2?o!==""&&n.push(o,t[++i]):r===8&&e.push(o);else{if(!yn(r))break;r=o}i++}return e.length&&n.push(1,...e),n}var Tt={};function tp(t,n,e,i,r,o,a,s,l,d,u){let f=Ve+i,_=f+r,g=QE(f,_),C=typeof d=="function"?d():d;return g[te]={type:t,blueprint:g,template:e,queries:null,viewQuery:s,declTNode:n,data:g.slice().fill(null,f),bindingStartIndex:f,expandoStartIndex:_,hostBindingOpCodes:null,firstCreatePass:!0,firstUpdatePass:!0,staticViewQueries:!1,staticContentQueries:!1,preOrderHooks:null,preOrderCheckHooks:null,contentHooks:null,contentCheckHooks:null,viewHooks:null,viewCheckHooks:null,destroyHooks:null,cleanup:null,contentQueries:null,components:null,directiveRegistry:typeof o=="function"?o():o,pipeRegistry:typeof a=="function"?a():a,firstChild:null,schemas:l,consts:C,incompleteFirstPass:!1,ssrId:u}}function QE(t,n){let e=[];for(let i=0;i<n;i++)e.push(i<t?null:Tt);return e}function XE(t){let n=t.tView;return n===null||n.incompleteFirstPass?t.tView=tp(1,null,t.template,t.decls,t.vars,t.directiveDefs,t.pipeDefs,t.viewQuery,t.schemas,t.consts,t.id):n}function np(t,n,e,i,r,o,a,s,l,d,u){let f=n.blueprint.slice();return f[pn]=r,f[re]=i|4|128|8|64|1024,(d!==null||t&&t[re]&2048)&&(f[re]|=2048),If(f),f[et]=f[hr]=t,f[Ye]=e,f[hn]=a||t&&t[hn],f[Ie]=s||t&&t[Ie],f[Zn]=l||t&&t[Zn]||null,f[wt]=o,f[Kn]=aE(),f[pr]=u,f[yf]=d,f[Et]=n.type==2?t[Et]:f,f}function JE(t,n,e){let i=bn(n,t),r=XE(e),o=t[hn].rendererFactory,a=ip(t,np(t,r,null,Dv(e),i,n,null,o.createRenderer(i,e),null,null,null));return t[n.index]=a}function Dv(t){let n=16;return t.signals?n=4096:t.onPush&&(n=64),n}function xv(t,n,e,i){if(e===0)return-1;let r=n.length;for(let o=0;o<e;o++)n.push(i),t.blueprint.push(i),t.data.push(null);return r}function ip(t,n){return t[co]?t[vf][Wt]=n:t[co]=n,t[vf]=n,n}function h(t=1){wv(Fe(),ie(),Hn()+t,!1)}function wv(t,n,e,i){if(!i)if((n[re]&3)===3){let o=t.preOrderCheckHooks;o!==null&&fc(n,o,e)}else{let o=t.preOrderHooks;o!==null&&mc(n,o,0,e)}Si(e)}var Fc=(function(t){return t[t.None=0]="None",t[t.SignalBased=1]="SignalBased",t[t.HasDecoratorInputTransform=2]="HasDecoratorInputTransform",t})(Fc||{});function bm(t,n,e,i){let r=ee(null);try{let[o,a,s]=t.inputs[e],l=null;(a&Fc.SignalBased)!==0&&(l=n[o][Xe]),l!==null&&l.transformFn!==void 0?i=l.transformFn(i):s!==null&&(i=s.call(n,i)),t.setInput!==null?t.setInput(n,l,i,e,o):Nb(n,l,o,i)}finally{ee(r)}}var zn=(function(t){return t[t.Important=1]="Important",t[t.DashCase=2]="DashCase",t})(zn||{}),eM;function rp(t,n){return eM(t,n)}var wH=typeof document<"u"&&typeof document?.documentElement?.getAnimations=="function";var vm=new WeakMap,La=new WeakSet;function tM(t,n){let e=vm.get(t);if(!e||e.length===0)return;let i=n.parentNode,r=n.previousSibling;for(let o=e.length-1;o>=0;o--){let a=e[o],s=a.parentNode;a===n?(e.splice(o,1),La.add(a),a.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}}))):(r&&a===r||s&&i&&s!==i)&&(e.splice(o,1),a.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}})),a.parentNode?.removeChild(a))}}function nM(t,n){let e=vm.get(t);e?e.includes(n)||e.push(n):vm.set(t,[n])}var wr=new Set,Pc=(function(t){return t[t.CHANGE_DETECTION=0]="CHANGE_DETECTION",t[t.AFTER_NEXT_RENDER=1]="AFTER_NEXT_RENDER",t})(Pc||{}),wn=new y(""),pb=new Set;function Sr(t){pb.has(t)||(pb.add(t),performance?.mark?.("mark_feature_usage",{detail:{feature:t}}))}var Lc=(()=>{class t{impl=null;execute(){this.impl?.execute()}static \u0275prov=D({token:t,providedIn:"root",factory:()=>new t})}return t})(),op=[0,1,2,3],ap=(()=>{class t{ngZone=c(P);scheduler=c(Bn);errorHandler=c(ht,{optional:!0});sequences=new Set;deferredRegistrations=new Set;executing=!1;constructor(){c(wn,{optional:!0})}execute(){let e=this.sequences.size>0;e&&De(ge.AfterRenderHooksStart),this.executing=!0;for(let i of op)for(let r of this.sequences)if(!(r.erroredOrDestroyed||!r.hooks[i]))try{r.pipelinedValue=this.ngZone.runOutsideAngular(()=>this.maybeTrace(()=>{let o=r.hooks[i];return o(r.pipelinedValue)},r.snapshot))}catch(o){r.erroredOrDestroyed=!0,this.errorHandler?.handleError(o)}this.executing=!1;for(let i of this.sequences)i.afterRun(),i.once&&(this.sequences.delete(i),i.destroy());for(let i of this.deferredRegistrations)this.sequences.add(i);this.deferredRegistrations.size>0&&this.scheduler.notify(7),this.deferredRegistrations.clear(),e&&De(ge.AfterRenderHooksEnd)}register(e){let{view:i}=e;i!==void 0?((i[_r]??=[]).push(e),yr(i),i[re]|=8192):this.executing?this.deferredRegistrations.add(e):this.addSequence(e)}addSequence(e){this.sequences.add(e),this.scheduler.notify(7)}unregister(e){this.executing&&this.sequences.has(e)?(e.erroredOrDestroyed=!0,e.pipelinedValue=void 0,e.once=!0):(this.sequences.delete(e),this.deferredRegistrations.delete(e))}maybeTrace(e,i){return i?i.run(Pc.AFTER_NEXT_RENDER,e):e()}static \u0275prov=D({token:t,providedIn:"root",factory:()=>new t})}return t})(),Ha=class{impl;hooks;view;once;snapshot;erroredOrDestroyed=!1;pipelinedValue=void 0;unregisterOnDestroy;constructor(n,e,i,r,o,a=null){this.impl=n,this.hooks=e,this.view=i,this.once=r,this.snapshot=a,this.unregisterOnDestroy=o?.onDestroy(()=>this.destroy())}afterRun(){this.erroredOrDestroyed=!1,this.pipelinedValue=void 0,this.snapshot?.dispose(),this.snapshot=null}destroy(){this.impl.unregister(this),this.unregisterOnDestroy?.();let n=this.view?.[_r];n&&(this.view[_r]=n.filter(e=>e!==this))}};function Qe(t,n){let e=n?.injector??c(Y);return Sr("NgAfterNextRender"),rM(t,e,n,!0)}function iM(t){return t instanceof Function?[void 0,void 0,t,void 0]:[t.earlyRead,t.write,t.mixedReadWrite,t.read]}function rM(t,n,e,i){let r=n.get(Lc);r.impl??=n.get(ap);let o=n.get(wn,null,{optional:!0}),a=e?.manualCleanup!==!0?n.get(Lt):null,s=n.get(po,null,{optional:!0}),l=new Ha(r.impl,iM(t),s?.view,i,a,o?.snapshot(null));return r.impl.register(l),l}var Ev=new y("",{factory:()=>({queue:new Set,isScheduled:!1,scheduler:null,injector:c(Ge)})});function Mv(t,n,e){let i=t.get(Ev);if(Array.isArray(n))for(let r of n)i.queue.add(r),e?.detachedLeaveAnimationFns?.push(r);else i.queue.add(n),e?.detachedLeaveAnimationFns?.push(n);i.scheduler&&i.scheduler(t)}function oM(t,n){let e=t.get(Ev);if(n.detachedLeaveAnimationFns){for(let i of n.detachedLeaveAnimationFns)e.queue.delete(i);n.detachedLeaveAnimationFns=void 0}}function aM(t,n){for(let[e,i]of n)Mv(t,i.animateFns)}function hb(t,n,e,i){let r=t?.[Ei]?.enter;n!==null&&r&&r.has(e.index)&&aM(i,r)}function ho(t,n,e,i,r,o,a,s){if(r!=null){let l,d=!1;gn(r)?l=r:Qn(r)&&(d=!0,r=r[pn]);let u=Gt(r);t===0&&i!==null?(hb(s,i,o,e),a==null?gv(n,i,u):Dc(n,i,u,a||null,!0)):t===1&&i!==null?(hb(s,i,o,e),Dc(n,i,u,a||null,!0),tM(o,u)):t===2?(s?.[Ei]?.leave?.has(o.index)&&nM(o,u),La.delete(u),gb(s,o,e,f=>{if(La.has(u)){La.delete(u);return}_v(n,u,d,f)})):t===3&&(La.delete(u),gb(s,o,e,()=>{n.destroyNode(u)})),l!=null&&_M(n,t,e,l,o,i,a)}}function sM(t,n){Iv(t,n),n[pn]=null,n[wt]=null}function lM(t,n,e,i,r,o){i[pn]=r,i[wt]=n,Bc(t,i,e,1,r,o)}function Iv(t,n){n[hn].changeDetectionScheduler?.notify(9),Bc(t,n,n[Ie],2,null,null)}function cM(t){let n=t[co];if(!n)return Kf(t[te],t);for(;n;){let e=null;if(Qn(n))e=n[co];else{let i=n[ze];i&&(e=i)}if(!e){for(;n&&!n[Wt]&&n!==t;)Qn(n)&&Kf(n[te],n),n=n[et];n===null&&(n=t),Qn(n)&&Kf(n[te],n),e=n&&n[Wt]}n=e}}function sp(t,n){let e=t[br],i=e.indexOf(n);e.splice(i,1)}function Vc(t,n){if(vr(n))return;let e=n[Ie];e.destroyNode&&Bc(t,n,e,3,null,null),cM(n)}function Kf(t,n){if(vr(n))return;let e=ee(null);try{n[re]&=-129,n[re]|=256,n[Ft]&&gi(n[Ft]),fM(t,n),uM(t,n),n[te].type===1&&n[Ie].destroy();let i=n[wi];if(i!==null&&gn(n[et])){i!==n[et]&&sp(i,n);let r=n[jn];r!==null&&r.detachView(t)}sm(n)}finally{ee(e)}}function gb(t,n,e,i){let r=t?.[Ei];if(r==null||r.leave==null||!r.leave.has(n.index))return i(!1);t&&wr.add(t[Kn]),Mv(e,()=>{if(r.leave&&r.leave.has(n.index)){let a=r.leave.get(n.index),s=[];if(a){for(let l=0;l<a.animateFns.length;l++){let d=a.animateFns[l],{promise:u}=d();s.push(u)}r.detachedLeaveAnimationFns=void 0}r.running=Promise.allSettled(s),dM(t,i)}else t&&wr.delete(t[Kn]),i(!1)},r)}function dM(t,n){let e=t[Ei]?.running;if(e){e.then(()=>{t[Ei].running=void 0,wr.delete(t[Kn]),n(!0)});return}n(!1)}function uM(t,n){let e=t.cleanup,i=n[lo];if(e!==null)for(let a=0;a<e.length-1;a+=2)if(typeof e[a]=="string"){let s=e[a+3];s>=0?i[s]():i[-s].unsubscribe(),a+=2}else{let s=i[e[a+1]];e[a].call(s)}i!==null&&(n[lo]=null);let r=n[qn];if(r!==null){n[qn]=null;for(let a=0;a<r.length;a++){let s=r[a];s()}}let o=n[vi];if(o!==null){n[vi]=null;for(let a of o)a.destroy()}}function fM(t,n){let e;if(t!=null&&(e=t.destroyHooks)!=null)for(let i=0;i<e.length;i+=2){let r=n[e[i]];if(!(r instanceof xr)){let o=e[i+1];if(Array.isArray(o))for(let a=0;a<o.length;a+=2){let s=r[o[a]],l=o[a+1];De(ge.LifecycleHookStart,s,l);try{l.call(s)}finally{De(ge.LifecycleHookEnd,s,l)}}else{De(ge.LifecycleHookStart,r,o);try{o.call(r)}finally{De(ge.LifecycleHookEnd,r,o)}}}}}function Sv(t,n,e){return mM(t,n.parent,e)}function mM(t,n,e){let i=n;for(;i!==null&&i.type&168;)n=i,i=n.parent;if(i===null)return e[pn];if(Xn(i)){let{encapsulation:r}=t.data[i.directiveStart+i.componentOffset];if(r===Dn.None||r===Dn.Emulated)return null}return bn(i,e)}function kv(t,n,e){return hM(t,n,e)}function pM(t,n,e){return t.type&40?bn(t,e):null}var hM=pM,_b;function lp(t,n,e,i){let r=Sv(t,i,n),o=n[Ie],a=i.parent||n[wt],s=kv(a,i,n);if(r!=null)if(Array.isArray(e))for(let l=0;l<e.length;l++)fb(o,r,e[l],s,!1);else fb(o,r,e,s,!1);_b!==void 0&&_b(o,i,n,e,r)}function Va(t,n){if(n!==null){let e=n.type;if(e&3)return bn(n,t);if(e&4)return ym(-1,t[n.index]);if(e&8){let i=n.child;if(i!==null)return Va(t,i);{let r=t[n.index];return gn(r)?ym(-1,r):Gt(r)}}else{if(e&128)return Va(t,n.next);if(e&32)return rp(n,t)()||Gt(t[n.index]);{let i=Tv(t,n);if(i!==null){if(Array.isArray(i))return i[0];let r=yi(t[Et]);return Va(r,i)}else return Va(t,n.next)}}}return null}function Tv(t,n){if(n!==null){let i=t[Et][wt],r=n.projection;return i.projection[r]}return null}function ym(t,n){let e=ze+t+1;if(e<n.length){let i=n[e],r=i[te].firstChild;if(r!==null)return Va(i,r)}return n[Mi]}function cp(t,n,e,i,r,o,a){for(;e!=null;){let s=i[Zn];if(e.type===128){e=e.next;continue}let l=i[e.index],d=e.type;if(a&&n===0&&(l&&bo(Gt(l),i),e.flags|=2),!Ac(e))if(d&8)cp(t,n,e.child,i,r,o,!1),ho(n,t,s,r,l,e,o,i);else if(d&32){let u=rp(e,i),f;for(;f=u();)ho(n,t,s,r,f,e,o,i);ho(n,t,s,r,l,e,o,i)}else d&16?Av(t,n,i,e,r,o):ho(n,t,s,r,l,e,o,i);e=a?e.projectionNext:e.next}}function Bc(t,n,e,i,r,o){cp(e,i,t.firstChild,n,r,o,!1)}function gM(t,n,e){let i=n[Ie],r=Sv(t,e,n),o=e.parent||n[wt],a=kv(o,e,n);Av(i,0,n,e,r,a)}function Av(t,n,e,i,r,o){let a=e[Et],l=a[wt].projection[i.projection];if(Array.isArray(l))for(let d=0;d<l.length;d++){let u=l[d];ho(n,t,e[Zn],r,u,i,o,e)}else{let d=l,u=a[et];Qb(i)&&(d.flags|=128),cp(t,n,d,u,r,o,!0)}}function _M(t,n,e,i,r,o,a){let s=i[Mi],l=Gt(i);s!==l&&ho(n,t,e,o,s,r,a);for(let d=ze;d<i.length;d++){let u=i[d];Bc(u[te],u,t,n,o,s)}}function bM(t,n,e,i,r){if(n)r?t.addClass(e,i):t.removeClass(e,i);else{let o=i.indexOf("-")===-1?void 0:zn.DashCase;r==null?t.removeStyle(e,i,o):(typeof r=="string"&&r.endsWith("!important")&&(r=r.slice(0,-10),o|=zn.Important),t.setStyle(e,i,r,o))}}function Rv(t,n,e,i,r){let o=Hn(),a=i&2;try{Si(-1),a&&n.length>Ve&&wv(t,n,Ve,!1);let s=a?ge.TemplateUpdateStart:ge.TemplateCreateStart;De(s,r,e),e(i,r)}finally{Si(o);let s=a?ge.TemplateUpdateEnd:ge.TemplateCreateEnd;De(s,r,e)}}function jc(t,n,e){wM(t,n,e),(e.flags&64)===64&&EM(t,n,e)}function Qa(t,n,e=bn){let i=n.localNames;if(i!==null){let r=n.index+1;for(let o=0;o<i.length;o+=2){let a=i[o+1],s=a===-1?e(n,t):t[a];t[r++]=s}}}function vM(t,n,e,i){let o=i.get(av,ov)||e===Dn.ShadowDom||e===Dn.ExperimentalIsolatedShadowDom,a=t.selectRootElement(n,o);return yM(a),a}function yM(t){CM(t)}var CM=()=>null;function DM(t){return t==="class"?"className":t==="for"?"htmlFor":t==="formaction"?"formAction":t==="innerHtml"?"innerHTML":t==="readonly"?"readOnly":t==="tabindex"?"tabIndex":t}function Ov(t,n,e,i,r,o){let a=n[te];if(mp(t,a,n,e,i)){Xn(t)&&xM(n,t.index);return}t.type&3&&(e=DM(e)),Nv(t,n,e,i,r,o)}function Nv(t,n,e,i,r,o){if(t.type&3){let a=bn(t,n);i=o!=null?o(i,t.value||"",e):i,r.setProperty(a,e,i)}else t.type&12}function xM(t,n){let e=Yt(n,t);e[re]&16||(e[re]|=64)}function wM(t,n,e){let i=e.directiveStart,r=e.directiveEnd;Xn(e)&&JE(n,e,t.data[i+e.componentOffset]),t.firstCreatePass||Cc(e,n);let o=e.initialInputs;for(let a=i;a<r;a++){let s=t.data[a],l=ja(n,t,a,e);if(bo(l,n),o!==null&&kM(n,a-i,l,s,e,o),_n(s)){let d=Yt(e.index,n);d[Ye]=ja(n,t,a,e)}}}function EM(t,n,e){let i=e.directiveStart,r=e.directiveEnd,o=e.index,a=B_();try{Si(o);for(let s=i;s<r;s++){let l=t.data[s],d=n[s];nc(s),(l.hostBindings!==null||l.hostVars!==0||l.hostAttrs!==null)&&MM(l,d)}}finally{Si(-1),nc(a)}}function MM(t,n){t.hostBindings!==null&&t.hostBindings(1,n)}function dp(t,n){let e=t.directiveRegistry,i=null;if(e)for(let r=0;r<e.length;r++){let o=e[r];Cv(n,o.selectors,!1)&&(i??=[],_n(o)?i.unshift(o):i.push(o))}return i}function IM(t,n,e,i,r,o){let a=bn(t,n);SM(n[Ie],a,o,t.value,e,i,r)}function SM(t,n,e,i,r,o,a){if(o==null)t.removeAttribute(n,r,e);else{let s=a==null?ur(o):a(o,i||"",r);t.setAttribute(n,r,s,e)}}function kM(t,n,e,i,r,o){let a=o[n];if(a!==null)for(let s=0;s<a.length;s+=2){let l=a[s],d=a[s+1];bm(i,e,l,d)}}function up(t,n,e,i,r){let o=Ve+e,a=n[te],s=r(a,n,t,i,e);n[o]=s,mo(t,!0);let l=t.type===2;return l?(bv(n[Ie],s,t),(T_()===0||uo(t))&&bo(s,n),A_()):bo(s,n),ac()&&(!l||!Ac(t))&&lp(a,n,s,t),t}function fp(t){let n=t;return Lf()?Vf():(n=n.parent,mo(n,!1)),n}function TM(t,n){let e=t[Zn];if(!e)return;let i;try{i=e.get(ei,null)}catch{i=null}i?.(n)}function mp(t,n,e,i,r){let o=t.inputs?.[i],a=t.hostDirectiveInputs?.[i],s=!1;if(a)for(let l=0;l<a.length;l+=2){let d=a[l],u=a[l+1],f=n.data[d];bm(f,e[d],u,r),s=!0}if(o)for(let l of o){let d=e[l],u=n.data[l];bm(u,d,i,r),s=!0}return s}function AM(t,n){let e=Yt(n,t),i=e[te];RM(i,e);let r=e[pn];r!==null&&e[pr]===null&&(e[pr]=sv(r,e[Zn])),De(ge.ComponentStart);try{pp(i,e,e[Ye])}finally{De(ge.ComponentEnd,e[Ye])}}function RM(t,n){for(let e=n.length;e<t.blueprint.length;e++)n.push(t.blueprint[e])}function pp(t,n,e){rc(n);try{let i=t.viewQuery;i!==null&&cm(1,i,e);let r=t.template;r!==null&&Rv(t,n,r,1,e),t.firstCreatePass&&(t.firstCreatePass=!1),n[jn]?.finishViewCreation(t),t.staticContentQueries&&lv(t,n),t.staticViewQueries&&cm(2,t.viewQuery,e);let o=t.components;o!==null&&OM(n,o)}catch(i){throw t.firstCreatePass&&(t.incompleteFirstPass=!0,t.firstCreatePass=!1),i}finally{n[re]&=-5,oc()}}function OM(t,n){for(let e=0;e<n.length;e++)AM(t,n[e])}function Xa(t,n,e,i){let r=ee(null);try{let o=n.tView,s=t[re]&4096?4096:16,l=np(t,o,e,s,null,n,null,null,i?.injector??null,i?.embeddedViewInjector??null,i?.dehydratedView??null),d=t[n.index];l[wi]=d;let u=t[jn];return u!==null&&(l[jn]=u.createEmbeddedView(o)),pp(o,l,e),l}finally{ee(r)}}function vo(t,n){return!n||n.firstChild===null||Qb(t)}function Ua(t,n,e,i,r=!1){for(;e!==null;){if(e.type===128){e=r?e.projectionNext:e.next;continue}let o=n[e.index];o!==null&&i.push(Gt(o)),gn(o)&&Fv(o,i);let a=e.type;if(a&8)Ua(t,n,e.child,i);else if(a&32){let s=rp(e,n),l;for(;l=s();)i.push(l)}else if(a&16){let s=Tv(n,e);if(Array.isArray(s))i.push(...s);else{let l=yi(n[Et]);Ua(l[te],l,s,i,!0)}}e=r?e.projectionNext:e.next}return i}function Fv(t,n){for(let e=ze;e<t.length;e++){let i=t[e],r=i[te].firstChild;r!==null&&Ua(i[te],i,r,n)}t[Mi]!==t[pn]&&n.push(t[Mi])}function Pv(t){if(t[_r]!==null){for(let n of t[_r])n.impl.addSequence(n);t[_r].length=0}}var Lv=[];function NM(t){return t[Ft]??FM(t)}function FM(t){let n=Lv.pop()??Object.create(LM);return n.lView=t,n}function PM(t){t.lView[Ft]!==t&&(t.lView=null,Lv.push(t))}var LM=se(I({},Yi),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:t=>{yr(t.lView)},consumerOnSignalRead(){this.lView[Ft]=this}});function VM(t){let n=t[Ft]??Object.create(BM);return n.lView=t,n}var BM=se(I({},Yi),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:t=>{let n=yi(t.lView);for(;n&&!Vv(n[te]);)n=yi(n);n&&Sf(n)},consumerOnSignalRead(){this.lView[Ft]=this}});function Vv(t){return t.type!==2}function Bv(t){if(t[vi]===null)return;let n=!0;for(;n;){let e=!1;for(let i of t[vi])i.dirty&&(e=!0,i.zone===null||Zone.current===i.zone?i.run():i.zone.run(()=>i.run()));n=e&&!!(t[re]&8192)}}var jM=100;function jv(t,n=0){let i=t[hn].rendererFactory,r=!1;r||i.begin?.();try{HM(t,n)}finally{r||i.end?.()}}function HM(t,n){let e=Bf();try{Ea(!0),Cm(t,n);let i=0;for(;Aa(t);){if(i===jM)throw new X(103,!1);i++,Cm(t,1)}}finally{Ea(e)}}function UM(t,n,e,i){if(vr(n))return;let r=n[re],o=!1,a=!1;rc(n);let s=!0,l=null,d=null;o||(Vv(t)?(d=NM(n),l=hi(d)):Xs()===null?(s=!1,d=VM(n),l=hi(d)):n[Ft]&&(gi(n[Ft]),n[Ft]=null));try{If(n),P_(t.bindingStartIndex),e!==null&&Rv(t,n,e,2,i);let u=(r&3)===3;if(!o)if(u){let g=t.preOrderCheckHooks;g!==null&&fc(n,g,null)}else{let g=t.preOrderHooks;g!==null&&mc(n,g,0,null),qf(n,0)}if(a||zM(n),Bv(n),Hv(n,0),t.contentQueries!==null&&lv(t,n),!o)if(u){let g=t.contentCheckHooks;g!==null&&fc(n,g)}else{let g=t.contentHooks;g!==null&&mc(n,g,1),qf(n,1)}WM(t,n);let f=t.components;f!==null&&zv(n,f,0);let _=t.viewQuery;if(_!==null&&cm(2,_,i),!o)if(u){let g=t.viewCheckHooks;g!==null&&fc(n,g)}else{let g=t.viewHooks;g!==null&&mc(n,g,2),qf(n,2)}if(t.firstUpdatePass===!0&&(t.firstUpdatePass=!1),n[Kl]){for(let g of n[Kl])g();n[Kl]=null}o||(Pv(n),n[re]&=-73)}catch(u){throw o||yr(n),u}finally{d!==null&&(Zi(d,l),s&&PM(d)),oc()}}function Hv(t,n){for(let e=Jb(t);e!==null;e=ev(e))for(let i=ze;i<e.length;i++){let r=e[i];Uv(r,n)}}function zM(t){for(let n=Jb(t);n!==null;n=ev(n)){if(!(n[re]&2))continue;let e=n[br];for(let i=0;i<e.length;i++){let r=e[i];Sf(r)}}}function $M(t,n,e){De(ge.ComponentStart);let i=Yt(n,t);try{Uv(i,e)}finally{De(ge.ComponentEnd,i[Ye])}}function Uv(t,n){Xl(t)&&Cm(t,n)}function Cm(t,n){let i=t[te],r=t[re],o=t[Ft],a=!!(n===0&&r&16);if(a||=!!(r&64&&n===0),a||=!!(r&1024),a||=!!(o?.dirty&&Yr(o)),a||=!1,o&&(o.dirty=!1),t[re]&=-9217,a)UM(i,t,i.template,t[Ye]);else if(r&8192){let s=ee(null);try{Bv(t),Hv(t,1);let l=i.components;l!==null&&zv(t,l,1),Pv(t)}finally{ee(s)}}}function zv(t,n,e){for(let i=0;i<n.length;i++)$M(t,n[i],e)}function WM(t,n){let e=t.hostBindingOpCodes;if(e!==null)try{for(let i=0;i<e.length;i++){let r=e[i];if(r<0)Si(~r);else{let o=r,a=e[++i],s=e[++i];V_(a,o);let l=n[o];De(ge.HostBindingsUpdateStart,l);try{s(2,l)}finally{De(ge.HostBindingsUpdateEnd,l)}}}}finally{Si(-1)}}function hp(t,n){let e=Bf()?64:1088;for(t[hn].changeDetectionScheduler?.notify(n);t;){t[re]|=e;let i=yi(t);if(fo(t)&&!i)return t;t=i}return null}function $v(t,n,e,i){return[t,!0,0,n,null,i,null,e,null,null]}function Wv(t,n){let e=ze+n;if(e<t.length)return t[e]}function Ja(t,n,e,i=!0){let r=n[te];if(GM(r,n,t,e),i){let a=ym(e,t),s=n[Ie],l=s.parentNode(t[Mi]);l!==null&&lM(r,t[wt],s,n,l,a)}let o=n[pr];o!==null&&o.firstChild!==null&&(o.firstChild=null)}function Gv(t,n){let e=za(t,n);return e!==void 0&&Vc(e[te],e),e}function za(t,n){if(t.length<=ze)return;let e=ze+n,i=t[e];if(i){let r=i[wi];r!==null&&r!==t&&sp(r,i),n>0&&(t[e-1][Wt]=i[Wt]);let o=Sa(t,ze+n);sM(i[te],i);let a=o[jn];a!==null&&a.detachView(o[te]),i[et]=null,i[Wt]=null,i[re]&=-129}return i}function GM(t,n,e,i){let r=ze+i,o=e.length;i>0&&(e[r-1][Wt]=n),i<o-ze?(n[Wt]=e[r],mf(e,ze+i,n)):(e.push(n),n[Wt]=null),n[et]=e;let a=n[wi];a!==null&&e!==a&&Yv(a,n);let s=n[jn];s!==null&&s.insertView(t),Jl(n),n[re]|=128}function Yv(t,n){let e=t[br],i=n[et];if(Qn(i))t[re]|=2;else{let r=i[et][Et];n[Et]!==r&&(t[re]|=2)}e===null?t[br]=[n]:e.push(n)}var ki=class{_lView;_cdRefInjectingView;_appRef=null;_attachedToViewContainer=!1;exhaustive;get rootNodes(){let n=this._lView,e=n[te];return Ua(e,n,e.firstChild,[])}constructor(n,e){this._lView=n,this._cdRefInjectingView=e}get context(){return this._lView[Ye]}set context(n){this._lView[Ye]=n}get destroyed(){return vr(this._lView)}destroy(){if(this._appRef)this._appRef.detachView(this);else if(this._attachedToViewContainer){let n=this._lView[et];if(gn(n)){let e=n[Ta],i=e?e.indexOf(this):-1;i>-1&&(za(n,i),Sa(e,i))}this._attachedToViewContainer=!1}Vc(this._lView[te],this._lView)}onDestroy(n){kf(this._lView,n)}markForCheck(){hp(this._cdRefInjectingView||this._lView,4)}detach(){this._lView[re]&=-129}reattach(){Jl(this._lView),this._lView[re]|=128}detectChanges(){this._lView[re]|=1024,jv(this._lView)}checkNoChanges(){}attachToViewContainerRef(){if(this._appRef)throw new X(902,!1);this._attachedToViewContainer=!0}detachFromAppRef(){this._appRef=null;let n=fo(this._lView),e=this._lView[wi];e!==null&&!n&&sp(e,this._lView),Iv(this._lView[te],this._lView)}attachToAppRef(n){if(this._attachedToViewContainer)throw new X(902,!1);this._appRef=n;let e=fo(this._lView),i=this._lView[wi];i!==null&&!e&&Yv(i,this._lView),Jl(this._lView)}};var st=(()=>{class t{_declarationLView;_declarationTContainer;elementRef;static __NG_ELEMENT_ID__=YM;constructor(e,i,r){this._declarationLView=e,this._declarationTContainer=i,this.elementRef=r}get ssrId(){return this._declarationTContainer.tView?.ssrId||null}createEmbeddedView(e,i){return this.createEmbeddedViewImpl(e,i)}createEmbeddedViewImpl(e,i,r){let o=Xa(this._declarationLView,this._declarationTContainer,e,{embeddedViewInjector:i,dehydratedView:r});return new ki(o)}}return t})();function YM(){return Hc(tt(),ie())}function Hc(t,n){return t.type&4?new st(n,t,xo(t,n)):null}function wo(t,n,e,i,r){let o=t.data[n];if(o===null)o=qM(t,n,e,i,r),L_()&&(o.flags|=32);else if(o.type&64){o.type=e,o.value=i,o.attrs=r;let a=R_();o.injectorIndex=a===null?-1:a.injectorIndex}return mo(o,!0),o}function qM(t,n,e,i,r){let o=Pf(),a=Lf(),s=a?o:o&&o.parent,l=t.data[n]=KM(t,s,e,n,i,r);return ZM(t,l,o,a),l}function ZM(t,n,e,i){t.firstChild===null&&(t.firstChild=n),e!==null&&(i?e.child==null&&n.parent!==null&&(e.child=n):e.next===null&&(e.next=n,n.prev=e))}function KM(t,n,e,i,r,o){let a=n?n.injectorIndex:-1,s=0;return Of()&&(s|=128),{type:e,index:i,insertBeforeIndex:null,injectorIndex:a,directiveStart:-1,directiveEnd:-1,directiveStylingLast:-1,componentOffset:-1,controlDirectiveIndex:-1,customControlIndex:-1,propertyBindings:null,flags:s,providerIndexes:0,value:r,attrs:o,mergedAttrs:null,localNames:null,initialInputs:null,inputs:null,hostDirectiveInputs:null,outputs:null,hostDirectiveOutputs:null,directiveToIndex:null,tView:null,next:null,prev:null,projectionNext:null,child:null,parent:n,projection:null,styles:null,stylesWithoutHost:null,residualStyles:void 0,classes:null,classesWithoutHost:null,residualClasses:void 0,classBindings:0,styleBindings:0}}function QM(t){let n=t[Cf]??[],i=t[et][Ie],r=[];for(let o of n)o.data[rv]!==void 0?r.push(o):XM(o,i);t[Cf]=r}function XM(t,n){let e=0,i=t.firstChild;if(i){let r=t.data[iv];for(;e<r;){let o=i.nextSibling;_v(n,i,!1),i=o,e++}}}var JM=()=>null,eI=()=>null;function xc(t,n){return JM(t,n)}function qv(t,n,e){return eI(t,n,e)}var Zv=class{},Uc=class{},Dm=class{resolveComponentFactory(n){throw new X(917,!1)}},zc=class{static NULL=new Dm},Ke=class{},Te=(()=>{class t{destroyNode=null;static __NG_ELEMENT_ID__=()=>tI()}return t})();function tI(){let t=ie(),n=tt(),e=Yt(n.index,t);return(Qn(e)?e:t)[Ie]}var Kv=(()=>{class t{static \u0275prov=D({token:t,providedIn:"root",factory:()=>null})}return t})();var hc={},xm=class{injector;parentInjector;constructor(n,e){this.injector=n,this.parentInjector=e}get(n,e,i){let r=this.injector.get(n,hc,i);return r!==hc||e===hc?r:this.parentInjector.get(n,e,i)}};function wc(t,n,e){let i=e?t.styles:null,r=e?t.classes:null,o=0;if(n!==null)for(let a=0;a<n.length;a++){let s=n[a];if(typeof s=="number")o=s;else if(o==1)r=Ul(r,s);else if(o==2){let l=s,d=n[++a];i=Ul(i,l+": "+d+";")}}e?t.styles=i:t.stylesWithoutHost=i,e?t.classes=r:t.classesWithoutHost=r}function J(t,n=0){let e=ie();if(e===null)return V(t,n);let i=tt();return Yb(i,e,Je(t),n)}function es(){let t="invalid";throw new Error(t)}function Qv(t,n,e,i,r){let o=i===null?null:{"":-1},a=r(t,e);if(a!==null){let s=a,l=null,d=null;for(let u of a)if(u.resolveHostDirectives!==null){[s,l,d]=u.resolveHostDirectives(a);break}rI(t,n,e,s,o,l,d)}o!==null&&i!==null&&nI(e,i,o)}function nI(t,n,e){let i=t.localNames=[];for(let r=0;r<n.length;r+=2){let o=e[n[r+1]];if(o==null)throw new X(-301,!1);i.push(n[r],o)}}function iI(t,n,e){n.componentOffset=e,(t.components??=[]).push(n.index)}function rI(t,n,e,i,r,o,a){let s=i.length,l=null;for(let _=0;_<s;_++){let g=i[_];l===null&&_n(g)&&(l=g,iI(t,e,_)),om(Cc(e,n),t,g.type)}dI(e,t.data.length,s),l?.viewProvidersResolver&&l.viewProvidersResolver(l);for(let _=0;_<s;_++){let g=i[_];g.providersResolver&&g.providersResolver(g)}let d=!1,u=!1,f=xv(t,n,s,null);s>0&&(e.directiveToIndex=new Map);for(let _=0;_<s;_++){let g=i[_];if(e.mergedAttrs=_o(e.mergedAttrs,g.hostAttrs),aI(t,e,n,f,g),cI(f,g,r),a!==null&&a.has(g)){let[F,z]=a.get(g);e.directiveToIndex.set(g.type,[f,F+e.directiveStart,z+e.directiveStart])}else(o===null||!o.has(g))&&e.directiveToIndex.set(g.type,f);g.contentQueries!==null&&(e.flags|=4),(g.hostBindings!==null||g.hostAttrs!==null||g.hostVars!==0)&&(e.flags|=64);let C=g.type.prototype;!d&&(C.ngOnChanges||C.ngOnInit||C.ngDoCheck)&&((t.preOrderHooks??=[]).push(e.index),d=!0),!u&&(C.ngOnChanges||C.ngDoCheck)&&((t.preOrderCheckHooks??=[]).push(e.index),u=!0),f++}oI(t,e,o)}function oI(t,n,e){for(let i=n.directiveStart;i<n.directiveEnd;i++){let r=t.data[i];if(e===null||!e.has(r))bb(0,n,r,i),bb(1,n,r,i),yb(n,i,!1);else{let o=e.get(r);vb(0,n,o,i),vb(1,n,o,i),yb(n,i,!0)}}}function bb(t,n,e,i){let r=t===0?e.inputs:e.outputs;for(let o in r)if(r.hasOwnProperty(o)){let a;t===0?a=n.inputs??={}:a=n.outputs??={},a[o]??=[],a[o].push(i),Xv(n,o)}}function vb(t,n,e,i){let r=t===0?e.inputs:e.outputs;for(let o in r)if(r.hasOwnProperty(o)){let a=r[o],s;t===0?s=n.hostDirectiveInputs??={}:s=n.hostDirectiveOutputs??={},s[a]??=[],s[a].push(i,o),Xv(n,a)}}function Xv(t,n){n==="class"?t.flags|=8:n==="style"&&(t.flags|=16)}function yb(t,n,e){let{attrs:i,inputs:r,hostDirectiveInputs:o}=t;if(i===null||!e&&r===null||e&&o===null||ep(t)){t.initialInputs??=[],t.initialInputs.push(null);return}let a=null,s=0;for(;s<i.length;){let l=i[s];if(l===0){s+=4;continue}else if(l===5){s+=2;continue}else if(typeof l=="number")break;if(!e&&r.hasOwnProperty(l)){let d=r[l];for(let u of d)if(u===n){a??=[],a.push(l,i[s+1]);break}}else if(e&&o.hasOwnProperty(l)){let d=o[l];for(let u=0;u<d.length;u+=2)if(d[u]===n){a??=[],a.push(d[u+1],i[s+1]);break}}s+=2}t.initialInputs??=[],t.initialInputs.push(a)}function aI(t,n,e,i,r){t.data[i]=r;let o=r.factory||(r.factory=bi(r.type,!0)),a=new xr(o,_n(r),J,null);t.blueprint[i]=a,e[i]=a,sI(t,n,i,xv(t,e,r.hostVars,Tt),r)}function sI(t,n,e,i,r){let o=r.hostBindings;if(o){let a=t.hostBindingOpCodes;a===null&&(a=t.hostBindingOpCodes=[]);let s=~n.index;lI(a)!=s&&a.push(s),a.push(e,i,o)}}function lI(t){let n=t.length;for(;n>0;){let e=t[--n];if(typeof e=="number"&&e<0)return e}return 0}function cI(t,n,e){if(e){if(n.exportAs)for(let i=0;i<n.exportAs.length;i++)e[n.exportAs[i]]=t;_n(n)&&(e[""]=t)}}function dI(t,n,e){t.flags|=1,t.directiveStart=n,t.directiveEnd=n+e,t.providerIndexes=n}function gp(t,n,e,i,r,o,a,s){let l=n[te],d=l.consts,u=Pt(d,a),f=wo(l,t,e,i,u);return o&&Qv(l,n,f,Pt(d,s),r),f.mergedAttrs=_o(f.mergedAttrs,f.attrs),f.attrs!==null&&wc(f,f.attrs,!1),f.mergedAttrs!==null&&wc(f,f.mergedAttrs,!0),l.queries!==null&&l.queries.elementStart(l,f),f}function _p(t,n){Vb(t,n),Df(n)&&t.queries.elementEnd(n)}function uI(t,n,e,i,r,o){let a=n.consts,s=Pt(a,r),l=wo(n,t,e,i,s);if(l.mergedAttrs=_o(l.mergedAttrs,l.attrs),o!=null){let d=Pt(a,o);l.localNames=[];for(let u=0;u<d.length;u+=2)l.localNames.push(d[u],-1)}return l.attrs!==null&&wc(l,l.attrs,!1),l.mergedAttrs!==null&&wc(l,l.mergedAttrs,!0),n.queries!==null&&n.queries.elementStart(n,l),l}function fI(t,n,e){return t[n]=e}function qt(t,n,e){if(e===Tt)return!1;let i=t[n];return Object.is(i,e)?!1:(t[n]=e,!0)}function mI(t,n,e,i){let r=qt(t,n,e);return qt(t,n+1,i)||r}function gc(t,n,e){return function i(r){let o=Xn(t)?Yt(t.index,n):n;hp(o,5);let a=n[Ye],s=Cb(n,a,e,r),l=i.__ngNextListenerFn__;for(;l;)s=Cb(n,a,l,r)&&s,l=l.__ngNextListenerFn__;return s}}function Cb(t,n,e,i){let r=ee(null);try{return De(ge.OutputStart,n,e),e(i)!==!1}catch(o){return TM(t,o),!1}finally{De(ge.OutputEnd,n,e),ee(r)}}function Jv(t,n,e,i,r,o,a,s){let l=uo(t),d=!1,u=null;if(!i&&l&&(u=hI(n,e,o,t.index)),u!==null){let f=u.__ngLastListenerFn__||u;f.__ngNextListenerFn__=a,u.__ngLastListenerFn__=a,d=!0}else{let f=bn(t,e),_=i?i(f):f;dE(e,_,o,s);let g=r.listen(_,o,s);if(!pI(o)){let C=i?F=>i(Gt(F[t.index])):t.index;ey(C,n,e,o,s,g,!1)}}return d}function pI(t){return t.startsWith("animation")||t.startsWith("transition")}function hI(t,n,e,i){let r=t.cleanup;if(r!=null)for(let o=0;o<r.length-1;o+=2){let a=r[o];if(a===e&&r[o+1]===i){let s=n[lo],l=r[o+2];return s&&s.length>l?s[l]:null}typeof a=="string"&&(o+=2)}return null}function ey(t,n,e,i,r,o,a){let s=n.firstCreatePass?Af(n):null,l=Tf(e),d=l.length;l.push(r,o),s&&s.push(i,t,d,(d+1)*(a?-1:1))}function Db(t,n,e,i,r,o){let a=n[e],s=n[te],d=s.data[e].outputs[i],f=a[d].subscribe(o);ey(t.index,s,n,r,o,f,!0)}var wm=Symbol("BINDING");function ty(t){return t.debugInfo?.className||t.type.name||null}var Em=class extends zc{ngModule;constructor(n){super(),this.ngModule=n}resolveComponentFactory(n){let e=xi(n);return new yo(e,this.ngModule)}};function gI(t){return Object.keys(t).map(n=>{let[e,i,r]=t[n],o={propName:e,templateName:n,isSignal:(i&Fc.SignalBased)!==0};return r&&(o.transform=r),o})}function _I(t){return Object.keys(t).map(n=>({propName:t[n],templateName:n}))}function bI(t,n,e){let i=n instanceof Ge?n:n?.injector;return i&&t.getStandaloneInjector!==null&&(i=t.getStandaloneInjector(i)||i),i?new xm(e,i):e}function vI(t){let n=t.get(Ke,null);if(n===null)throw new X(407,!1);let e=t.get(Kv,null),i=t.get(Bn,null),r=t.get(wn,null,{optional:!0});return{rendererFactory:n,sanitizer:e,changeDetectionScheduler:i,ngReflect:!1,tracingService:r}}function yI(t,n){let e=ny(t);return hv(n,e,e==="svg"?xf:e==="math"?w_:null)}function ny(t){return(t.selectors[0][0]||"div").toLowerCase()}var yo=class extends Uc{componentDef;ngModule;selector;componentType;ngContentSelectors;isBoundToModule;cachedInputs=null;cachedOutputs=null;get inputs(){return this.cachedInputs??=gI(this.componentDef.inputs),this.cachedInputs}get outputs(){return this.cachedOutputs??=_I(this.componentDef.outputs),this.cachedOutputs}constructor(n,e){super(),this.componentDef=n,this.ngModule=e,this.componentType=n.type,this.selector=ZE(n.selectors),this.ngContentSelectors=n.ngContentSelectors??[],this.isBoundToModule=!!e}create(n,e,i,r,o,a){De(ge.DynamicComponentStart);let s=ee(null);try{let l=this.componentDef,d=bI(l,r||this.ngModule,n),u=vI(d),f=u.tracingService;return f&&f.componentCreate?f.componentCreate(ty(l),()=>this.createComponentRef(u,d,e,i,o,a)):this.createComponentRef(u,d,e,i,o,a)}finally{ee(s)}}createComponentRef(n,e,i,r,o,a){let s=this.componentDef,l=CI(r,s,a,o),d=n.rendererFactory.createRenderer(null,s),u=r?vM(d,r,s.encapsulation,e):yI(s,d),f=a?.some(xb)||o?.some(C=>typeof C!="function"&&C.bindings.some(xb)),_=np(null,l,null,512|Dv(s),null,null,n,d,e,null,sv(u,e,!0));_[Ve]=u,rc(_);let g=null;try{let C=gp(Ve,_,2,"#host",()=>l.directiveRegistry,!0,0);bv(d,u,C),bo(u,_),jc(l,_,C),Ym(l,C,_),_p(l,C),i!==void 0&&xI(C,this.ngContentSelectors,i),g=Yt(C.index,_),_[Ye]=g[Ye],pp(l,_,null)}catch(C){throw g!==null&&sm(g),sm(_),C}finally{De(ge.DynamicComponentEnd),oc()}return new Ec(this.componentType,_,!!f)}};function CI(t,n,e,i){let r=t?["ng-version","21.2.10"]:KE(n.selectors[0]),o=null,a=null,s=0;if(e)for(let u of e)s+=u[wm].requiredVars,u.create&&(u.targetIdx=0,(o??=[]).push(u)),u.update&&(u.targetIdx=0,(a??=[]).push(u));if(i)for(let u=0;u<i.length;u++){let f=i[u];if(typeof f!="function")for(let _ of f.bindings){s+=_[wm].requiredVars;let g=u+1;_.create&&(_.targetIdx=g,(o??=[]).push(_)),_.update&&(_.targetIdx=g,(a??=[]).push(_))}}let l=[n];if(i)for(let u of i){let f=typeof u=="function"?u:u.type,_=Wl(f);l.push(_)}return tp(0,null,DI(o,a),1,s,l,null,null,null,[r],null)}function DI(t,n){return!t&&!n?null:e=>{if(e&1&&t)for(let i of t)i.create();if(e&2&&n)for(let i of n)i.update()}}function xb(t){let n=t[wm].kind;return n==="input"||n==="twoWay"}var Ec=class extends Zv{_rootLView;_hasInputBindings;instance;hostView;changeDetectorRef;componentType;location;previousInputValues=null;_tNode;constructor(n,e,i){super(),this._rootLView=e,this._hasInputBindings=i,this._tNode=Ql(e[te],Ve),this.location=xo(this._tNode,e),this.instance=Yt(this._tNode.index,e)[Ye],this.hostView=this.changeDetectorRef=new ki(e,void 0),this.componentType=n}setInput(n,e){this._hasInputBindings;let i=this._tNode;if(this.previousInputValues??=new Map,this.previousInputValues.has(n)&&Object.is(this.previousInputValues.get(n),e))return;let r=this._rootLView,o=mp(i,r[te],r,n,e);this.previousInputValues.set(n,e);let a=Yt(i.index,r);hp(a,1)}get injector(){return new Dr(this._tNode,this._rootLView)}destroy(){this.hostView.destroy()}onDestroy(n){this.hostView.onDestroy(n)}};function xI(t,n,e){let i=t.projection=[];for(let r=0;r<n.length;r++){let o=e[r];i.push(o!=null&&o.length?Array.from(o):null)}}var bt=(()=>{class t{static __NG_ELEMENT_ID__=wI}return t})();function wI(){let t=tt();return iy(t,ie())}var Mm=class t extends bt{_lContainer;_hostTNode;_hostLView;constructor(n,e,i){super(),this._lContainer=n,this._hostTNode=e,this._hostLView=i}get element(){return xo(this._hostTNode,this._hostLView)}get injector(){return new Dr(this._hostTNode,this._hostLView)}get parentInjector(){let n=zm(this._hostTNode,this._hostLView);if(Hb(n)){let e=vc(n,this._hostLView),i=bc(n),r=e[te].data[i+8];return new Dr(r,e)}else return new Dr(null,this._hostLView)}clear(){for(;this.length>0;)this.remove(this.length-1)}get(n){let e=wb(this._lContainer);return e!==null&&e[n]||null}get length(){return this._lContainer.length-ze}createEmbeddedView(n,e,i){let r,o;typeof i=="number"?r=i:i!=null&&(r=i.index,o=i.injector);let a=xc(this._lContainer,n.ssrId),s=n.createEmbeddedViewImpl(e||{},o,a);return this.insertImpl(s,r,vo(this._hostTNode,a)),s}createComponent(n,e,i,r,o,a,s){let l=n&&!Vw(n),d;if(l)d=e;else{let z=e||{};d=z.index,i=z.injector,r=z.projectableNodes,o=z.environmentInjector||z.ngModuleRef,a=z.directives,s=z.bindings}let u=l?n:new yo(xi(n)),f=i||this.parentInjector;if(!o&&u.ngModule==null){let Q=(l?f:this.parentInjector).get(Ge,null);Q&&(o=Q)}let _=xi(u.componentType??{}),g=xc(this._lContainer,_?.id??null),C=g?.firstChild??null,F=u.create(f,r,C,o,a,s);return this.insertImpl(F.hostView,d,vo(this._hostTNode,g)),F}insert(n,e){return this.insertImpl(n,e,!0)}insertImpl(n,e,i){let r=n._lView;if(M_(r)){let s=this.indexOf(n);if(s!==-1)this.detach(s);else{let l=r[et],d=new t(l,l[wt],l[et]);d.detach(d.indexOf(n))}}let o=this._adjustIndex(e),a=this._lContainer;return Ja(a,r,o,i),n.attachToViewContainerRef(),mf(Qf(a),o,n),n}move(n,e){return this.insert(n,e)}indexOf(n){let e=wb(this._lContainer);return e!==null?e.indexOf(n):-1}remove(n){let e=this._adjustIndex(n,-1),i=za(this._lContainer,e);i&&(Sa(Qf(this._lContainer),e),Vc(i[te],i))}detach(n){let e=this._adjustIndex(n,-1),i=za(this._lContainer,e);return i&&Sa(Qf(this._lContainer),e)!=null?new ki(i):null}_adjustIndex(n,e=0){return n??this.length+e}};function wb(t){return t[Ta]}function Qf(t){return t[Ta]||(t[Ta]=[])}function iy(t,n){let e,i=n[t.index];return gn(i)?e=i:(e=$v(i,n,null,t),n[t.index]=e,ip(n,e)),MI(e,n,t,i),new Mm(e,t,n)}function EI(t,n){let e=t[Ie],i=e.createComment(""),r=bn(n,t),o=e.parentNode(r);return Dc(e,o,i,e.nextSibling(r),!1),i}var MI=kI,II=()=>!1;function SI(t,n,e){return II(t,n,e)}function kI(t,n,e,i){if(t[Mi])return;let r;e.type&8?r=Gt(i):r=EI(n,e),t[Mi]=r}var Im=class t{queryList;matches=null;constructor(n){this.queryList=n}clone(){return new t(this.queryList)}setDirty(){this.queryList.setDirty()}},Sm=class t{queries;constructor(n=[]){this.queries=n}createEmbeddedView(n){let e=n.queries;if(e!==null){let i=n.contentQueries!==null?n.contentQueries[0]:e.length,r=[];for(let o=0;o<i;o++){let a=e.getByIndex(o),s=this.queries[a.indexInDeclarationView];r.push(s.clone())}return new t(r)}return null}insertView(n){this.dirtyQueriesWithMatches(n)}detachView(n){this.dirtyQueriesWithMatches(n)}finishViewCreation(n){this.dirtyQueriesWithMatches(n)}dirtyQueriesWithMatches(n){for(let e=0;e<this.queries.length;e++)vp(n,e).matches!==null&&this.queries[e].setDirty()}},Mc=class{flags;read;predicate;constructor(n,e,i=null){this.flags=e,this.read=i,typeof n=="string"?this.predicate=NI(n):this.predicate=n}},km=class t{queries;constructor(n=[]){this.queries=n}elementStart(n,e){for(let i=0;i<this.queries.length;i++)this.queries[i].elementStart(n,e)}elementEnd(n){for(let e=0;e<this.queries.length;e++)this.queries[e].elementEnd(n)}embeddedTView(n){let e=null;for(let i=0;i<this.length;i++){let r=e!==null?e.length:0,o=this.getByIndex(i).embeddedTView(n,r);o&&(o.indexInDeclarationView=i,e!==null?e.push(o):e=[o])}return e!==null?new t(e):null}template(n,e){for(let i=0;i<this.queries.length;i++)this.queries[i].template(n,e)}getByIndex(n){return this.queries[n]}get length(){return this.queries.length}track(n){this.queries.push(n)}},Tm=class t{metadata;matches=null;indexInDeclarationView=-1;crossesNgTemplate=!1;_declarationNodeIndex;_appliesToNextNode=!0;constructor(n,e=-1){this.metadata=n,this._declarationNodeIndex=e}elementStart(n,e){this.isApplyingToNode(e)&&this.matchTNode(n,e)}elementEnd(n){this._declarationNodeIndex===n.index&&(this._appliesToNextNode=!1)}template(n,e){this.elementStart(n,e)}embeddedTView(n,e){return this.isApplyingToNode(n)?(this.crossesNgTemplate=!0,this.addMatch(-n.index,e),new t(this.metadata)):null}isApplyingToNode(n){if(this._appliesToNextNode&&(this.metadata.flags&1)!==1){let e=this._declarationNodeIndex,i=n.parent;for(;i!==null&&i.type&8&&i.index!==e;)i=i.parent;return e===(i!==null?i.index:-1)}return this._appliesToNextNode}matchTNode(n,e){let i=this.metadata.predicate;if(Array.isArray(i))for(let r=0;r<i.length;r++){let o=i[r];this.matchTNodeWithReadOption(n,e,TI(e,o)),this.matchTNodeWithReadOption(n,e,pc(e,n,o,!1,!1))}else i===st?e.type&4&&this.matchTNodeWithReadOption(n,e,-1):this.matchTNodeWithReadOption(n,e,pc(e,n,i,!1,!1))}matchTNodeWithReadOption(n,e,i){if(i!==null){let r=this.metadata.read;if(r!==null)if(r===L||r===bt||r===st&&e.type&4)this.addMatch(e.index,-2);else{let o=pc(e,n,r,!1,!1);o!==null&&this.addMatch(e.index,o)}else this.addMatch(e.index,i)}}addMatch(n,e){this.matches===null?this.matches=[n,e]:this.matches.push(n,e)}};function TI(t,n){let e=t.localNames;if(e!==null){for(let i=0;i<e.length;i+=2)if(e[i]===n)return e[i+1]}return null}function AI(t,n){return t.type&11?xo(t,n):t.type&4?Hc(t,n):null}function RI(t,n,e,i){return e===-1?AI(n,t):e===-2?OI(t,n,i):ja(t,t[te],e,n)}function OI(t,n,e){if(e===L)return xo(n,t);if(e===st)return Hc(n,t);if(e===bt)return iy(n,t)}function ry(t,n,e,i){let r=n[jn].queries[i];if(r.matches===null){let o=t.data,a=e.matches,s=[];for(let l=0;a!==null&&l<a.length;l+=2){let d=a[l];if(d<0)s.push(null);else{let u=o[d];s.push(RI(n,u,a[l+1],e.metadata.read))}}r.matches=s}return r.matches}function Am(t,n,e,i){let r=t.queries.getByIndex(e),o=r.matches;if(o!==null){let a=ry(t,n,r,e);for(let s=0;s<o.length;s+=2){let l=o[s];if(l>0)i.push(a[s/2]);else{let d=o[s+1],u=n[-l];for(let f=ze;f<u.length;f++){let _=u[f];_[wi]===_[et]&&Am(_[te],_,d,i)}if(u[br]!==null){let f=u[br];for(let _=0;_<f.length;_++){let g=f[_];Am(g[te],g,d,i)}}}}}return i}function bp(t,n){return t[jn].queries[n].queryList}function oy(t,n,e){let i=new ti((e&4)===4);return k_(t,n,i,i.destroy),(n[jn]??=new Sm).queries.push(new Im(i))-1}function ay(t,n,e){let i=Fe();return i.firstCreatePass&&(ly(i,new Mc(t,n,e),-1),(n&2)===2&&(i.staticViewQueries=!0)),oy(i,ie(),n)}function sy(t,n,e,i){let r=Fe();if(r.firstCreatePass){let o=tt();ly(r,new Mc(n,e,i),o.index),FI(r,t),(e&2)===2&&(r.staticContentQueries=!0)}return oy(r,ie(),e)}function NI(t){return t.split(",").map(n=>n.trim())}function ly(t,n,e){t.queries===null&&(t.queries=new km),t.queries.track(new Tm(n,e))}function FI(t,n){let e=t.contentQueries||(t.contentQueries=[]),i=e.length?e[e.length-1]:-1;n!==i&&e.push(t.queries.length-1,n)}function vp(t,n){return t.queries.getByIndex(n)}function cy(t,n){let e=t[te],i=vp(e,n);return i.crossesNgTemplate?Am(e,t,n,[]):ry(e,t,i,n)}function dy(t,n,e){let i,r=ua(()=>{i._dirtyCounter();let o=PI(i,t);if(n&&o===void 0)throw new X(-951,!1);return o});return i=r[Xe],i._dirtyCounter=x(0),i._flatValue=void 0,r}function yp(t){return dy(!0,!1,t)}function Cp(t){return dy(!0,!0,t)}function uy(t,n){let e=t[Xe];e._lView=ie(),e._queryIndex=n,e._queryList=bp(e._lView,n),e._queryList.onDirty(()=>e._dirtyCounter.update(i=>i+1))}function PI(t,n){let e=t._lView,i=t._queryIndex;if(e===void 0||i===void 0||e[re]&4)return n?void 0:pt;let r=bp(e,i),o=cy(e,i);return r.reset(o,Kb),n?r.first:r._changesDetected||t._flatValue===void 0?t._flatValue=r.toArray():t._flatValue}var Ti=class{};var $a=class extends Ti{injector;componentFactoryResolver=new Em(this);instance=null;constructor(n){super();let e=new cr([...n.providers,{provide:Ti,useValue:this},{provide:zc,useValue:this.componentFactoryResolver}],n.parent||ao(),n.debugName,new Set(["environment"]));this.injector=e,n.runEnvironmentInitializers&&e.resolveInjectorInitializers()}destroy(){this.injector.destroy()}onDestroy(n){this.injector.onDestroy(n)}};function fy(t,n,e=null){return new $a({providers:t,parent:n,debugName:e,runEnvironmentInitializers:!0}).injector}var LI=(()=>{class t{_injector;cachedInjectors=new Map;constructor(e){this._injector=e}getOrCreateStandaloneInjector(e){if(!e.standalone)return null;if(!this.cachedInjectors.has(e)){let i=gf(!1,e.type),r=i.length>0?fy([i],this._injector,""):null;this.cachedInjectors.set(e,r)}return this.cachedInjectors.get(e)}ngOnDestroy(){try{for(let e of this.cachedInjectors.values())e!==null&&e.destroy()}finally{this.cachedInjectors.clear()}}static \u0275prov=D({token:t,providedIn:"environment",factory:()=>new t(V(Ge))})}return t})();function R(t){return Ga(()=>{let n=my(t),e=se(I({},n),{decls:t.decls,vars:t.vars,template:t.template,consts:t.consts||null,ngContentSelectors:t.ngContentSelectors,onPush:t.changeDetection===Wm.OnPush,directiveDefs:null,pipeDefs:null,dependencies:n.standalone&&t.dependencies||null,getStandaloneInjector:n.standalone?r=>r.get(LI).getOrCreateStandaloneInjector(e):null,getExternalStyles:null,signals:t.signals??!1,data:t.data||{},encapsulation:t.encapsulation||Dn.Emulated,styles:t.styles||pt,_:null,schemas:t.schemas||null,tView:null,id:""});n.standalone&&Sr("NgStandalone"),py(e);let i=t.dependencies;return e.directiveDefs=Eb(i,VI),e.pipeDefs=Eb(i,c_),e.id=HI(e),e})}function VI(t){return xi(t)||Wl(t)}function Z(t){return Ga(()=>({type:t.type,bootstrap:t.bootstrap||pt,declarations:t.declarations||pt,imports:t.imports||pt,exports:t.exports||pt,transitiveCompileScopes:null,schemas:t.schemas||null,id:t.id||null}))}function BI(t,n){if(t==null)return mn;let e={};for(let i in t)if(t.hasOwnProperty(i)){let r=t[i],o,a,s,l;Array.isArray(r)?(s=r[0],o=r[1],a=r[2]??o,l=r[3]||null):(o=r,a=r,s=Fc.None,l=null),e[o]=[i,s,l],n[o]=a}return e}function jI(t){if(t==null)return mn;let n={};for(let e in t)t.hasOwnProperty(e)&&(n[t[e]]=e);return n}function $(t){return Ga(()=>{let n=my(t);return py(n),n})}function $c(t){return{type:t.type,name:t.name,factory:null,pure:t.pure!==!1,standalone:t.standalone??!0,onDestroy:t.type.prototype.ngOnDestroy||null}}function my(t){let n={};return{type:t.type,providersResolver:null,viewProvidersResolver:null,factory:null,hostBindings:t.hostBindings||null,hostVars:t.hostVars||0,hostAttrs:t.hostAttrs||null,contentQueries:t.contentQueries||null,declaredInputs:n,inputConfig:t.inputs||mn,exportAs:t.exportAs||null,standalone:t.standalone??!0,signals:t.signals===!0,selectors:t.selectors||pt,viewQuery:t.viewQuery||null,features:t.features||null,setInput:null,resolveHostDirectives:null,hostDirectives:null,controlDef:null,inputs:BI(t.inputs,n),outputs:jI(t.outputs),debugInfo:null}}function py(t){t.features?.forEach(n=>n(t))}function Eb(t,n){return t?()=>{let e=typeof t=="function"?t():t,i=[];for(let r of e){let o=n(r);o!==null&&i.push(o)}return i}:null}function HI(t){let n=0,e=typeof t.consts=="function"?"":t.consts,i=[t.selectors,t.ngContentSelectors,t.hostVars,t.hostAttrs,e,t.vars,t.decls,t.encapsulation,t.standalone,t.signals,t.exportAs,JSON.stringify(t.inputs),JSON.stringify(t.outputs),Object.getOwnPropertyNames(t.type.prototype),!!t.contentQueries,!!t.viewQuery];for(let o of i.join("|"))n=Math.imul(31,n)+o.charCodeAt(0)<<0;return n+=2147483648,"c"+n}function Dp(t){let n=e=>{let i=Array.isArray(t);e.hostDirectives===null?(e.resolveHostDirectives=UI,e.hostDirectives=i?t.map(Rm):[t]):i?e.hostDirectives.unshift(...t.map(Rm)):e.hostDirectives.unshift(t)};return n.ngInherit=!0,n}function UI(t){let n=[],e=!1,i=null,r=null;for(let o=0;o<t.length;o++){let a=t[o];if(a.hostDirectives!==null){let s=n.length;i??=new Map,r??=new Map,hy(a,n,i),r.set(a,[s,n.length-1])}o===0&&_n(a)&&(e=!0,n.push(a))}for(let o=e?1:0;o<t.length;o++)n.push(t[o]);return[n,i,r]}function hy(t,n,e){if(t.hostDirectives!==null)for(let i of t.hostDirectives)if(typeof i=="function"){let r=i();for(let o of r)Mb(Rm(o),n,e)}else Mb(i,n,e)}function Mb(t,n,e){let i=Wl(t.directive);zI(i.declaredInputs,t.inputs),hy(i,n,e),e.set(i,t),n.push(i)}function Rm(t){return typeof t=="function"?{directive:Je(t),inputs:mn,outputs:mn}:{directive:Je(t.directive),inputs:Ib(t.inputs),outputs:Ib(t.outputs)}}function Ib(t){if(t===void 0||t.length===0)return mn;let n={};for(let e=0;e<t.length;e+=2)n[t[e]]=t[e+1];return n}function zI(t,n){for(let e in n)if(n.hasOwnProperty(e)){let i=n[e],r=t[e];t[i]=r}}function $I(t){return Object.getPrototypeOf(t.prototype).constructor}function ve(t){let n=$I(t.type),e=!0,i=[t];for(;n;){let r;if(_n(t))r=n.\u0275cmp||n.\u0275dir;else{if(n.\u0275cmp)throw new X(903,!1);r=n.\u0275dir}if(r){if(e){i.push(r);let a=t;a.inputs=Xf(t.inputs),a.declaredInputs=Xf(t.declaredInputs),a.outputs=Xf(t.outputs);let s=r.hostBindings;s&&ZI(t,s);let l=r.viewQuery,d=r.contentQueries;if(l&&YI(t,l),d&&qI(t,d),WI(t,r),l_(t.outputs,r.outputs),_n(r)&&r.data.animation){let u=t.data;u.animation=(u.animation||[]).concat(r.data.animation)}}let o=r.features;if(o)for(let a=0;a<o.length;a++){let s=o[a];s&&s.ngInherit&&s(t),s===ve&&(e=!1)}}n=Object.getPrototypeOf(n)}GI(i)}function WI(t,n){for(let e in n.inputs){if(!n.inputs.hasOwnProperty(e)||t.inputs.hasOwnProperty(e))continue;let i=n.inputs[e];i!==void 0&&(t.inputs[e]=i,t.declaredInputs[e]=n.declaredInputs[e])}}function GI(t){let n=0,e=null;for(let i=t.length-1;i>=0;i--){let r=t[i];r.hostVars=n+=r.hostVars,r.hostAttrs=_o(r.hostAttrs,e=_o(e,r.hostAttrs))}}function Xf(t){return t===mn?{}:t===pt?[]:t}function YI(t,n){let e=t.viewQuery;e?t.viewQuery=(i,r)=>{n(i,r),e(i,r)}:t.viewQuery=n}function qI(t,n){let e=t.contentQueries;e?t.contentQueries=(i,r,o)=>{n(i,r,o),e(i,r,o)}:t.contentQueries=n}function ZI(t,n){let e=t.hostBindings;e?t.hostBindings=(i,r)=>{n(i,r),e(i,r)}:t.hostBindings=n}function gy(t,n,e,i,r,o,a,s){if(e.firstCreatePass){t.mergedAttrs=_o(t.mergedAttrs,t.attrs);let u=t.tView=tp(2,t,r,o,a,e.directiveRegistry,e.pipeRegistry,null,e.schemas,e.consts,null);e.queries!==null&&(e.queries.template(e,t),u.queries=e.queries.embeddedTView(t))}s&&(t.flags|=s),mo(t,!1);let l=QI(e,n,t,i);ac()&&lp(e,n,l,t),bo(l,n);let d=$v(l,n,l,t);n[i+Ve]=d,ip(n,d),SI(d,t,n)}function KI(t,n,e,i,r,o,a,s,l,d,u){let f=e+Ve,_;return n.firstCreatePass?(_=wo(n,f,4,a||null,s||null),ec()&&Qv(n,t,_,Pt(n.consts,d),dp),Vb(n,_)):_=n.data[f],gy(_,t,n,e,i,r,o,l),uo(_)&&jc(n,t,_),d!=null&&Qa(t,_,u),_}function Co(t,n,e,i,r,o,a,s,l,d,u){let f=e+Ve,_;if(n.firstCreatePass){if(_=wo(n,f,4,a||null,s||null),d!=null){let g=Pt(n.consts,d);_.localNames=[];for(let C=0;C<g.length;C+=2)_.localNames.push(g[C],-1)}}else _=n.data[f];return gy(_,t,n,e,i,r,o,l),d!=null&&Qa(t,_,u),_}function it(t,n,e,i,r,o,a,s){let l=ie(),d=Fe(),u=Pt(d.consts,o);return KI(l,d,t,n,e,i,r,u,void 0,a,s),it}function ts(t,n,e,i,r,o,a,s){let l=ie(),d=Fe(),u=Pt(d.consts,o);return Co(l,d,t,n,e,i,r,u,void 0,a,s),ts}var QI=XI;function XI(t,n,e,i){return Na(!0),n[Ie].createComment("")}function $n(t){return typeof t=="function"&&t[Xe]!==void 0}function xp(t){return $n(t)&&typeof t.set=="function"}var wp=new y("");function Eo(t){return!!t&&typeof t.then=="function"}function Ep(t){return!!t&&typeof t.subscribe=="function"}var _y=new y("");var Mp=(()=>{class t{resolve;reject;initialized=!1;done=!1;donePromise=new Promise((e,i)=>{this.resolve=e,this.reject=i});appInits=c(_y,{optional:!0})??[];injector=c(Y);constructor(){}runInitializers(){if(this.initialized)return;let e=[];for(let r of this.appInits){let o=so(this.injector,r);if(Eo(o))e.push(o);else if(Ep(o)){let a=new Promise((s,l)=>{o.subscribe({complete:s,error:l})});e.push(a)}}let i=()=>{this.done=!0,this.resolve()};Promise.all(e).then(()=>{i()}).catch(r=>{this.reject(r)}),e.length===0&&i(),this.initialized=!0}static \u0275fac=function(i){return new(i||t)};static \u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),by=new y("");function vy(){Su(()=>{let t="";throw new X(600,t)})}function yy(t){return t.isBoundToModule}var JI=10;var Zt=(()=>{class t{_runningTick=!1;_destroyed=!1;_destroyListeners=[];_views=[];internalErrorHandler=c(ei);afterRenderManager=c(Lc);zonelessEnabled=c(Fa);rootEffectScheduler=c(sc);dirtyFlags=0;tracingSnapshot=null;allTestViews=new Set;autoDetectTestViews=new Set;includeAllTestViews=!1;afterTick=new M;get allViews(){return[...(this.includeAllTestViews?this.allTestViews:this.autoDetectTestViews).keys(),...this._views]}get destroyed(){return this._destroyed}componentTypes=[];components=[];internalPendingTask=c(Cr);get isStable(){return this.internalPendingTask.hasPendingTasksObservable.pipe(Ce(e=>!e))}constructor(){c(wn,{optional:!0})}whenStable(){let e;return new Promise(i=>{e=this.isStable.subscribe({next:r=>{r&&i()}})}).finally(()=>{e.unsubscribe()})}_injector=c(Ge);_rendererFactory=null;get injector(){return this._injector}bootstrap(e,i){return this.bootstrapImpl(e,i)}bootstrapImpl(e,i,r=Y.NULL){return this._injector.get(P).run(()=>{De(ge.BootstrapComponentStart);let a=e instanceof Uc;if(!this._injector.get(Mp).done){let C="";throw new X(405,C)}let l;a?l=e:l=this._injector.get(zc).resolveComponentFactory(e),this.componentTypes.push(l.componentType);let d=yy(l)?void 0:this._injector.get(Ti),u=i||l.selector,f=l.create(r,[],u,d),_=f.location.nativeElement,g=f.injector.get(wp,null);return g?.registerApplication(_),f.onDestroy(()=>{this.detachView(f.hostView),Ba(this.components,f),g?.unregisterApplication(_)}),this._loadComponent(f),De(ge.BootstrapComponentEnd,f),f})}tick(){this.zonelessEnabled||(this.dirtyFlags|=1),this._tick()}_tick(){De(ge.ChangeDetectionStart),this.tracingSnapshot!==null?this.tracingSnapshot.run(Pc.CHANGE_DETECTION,this.tickImpl):this.tickImpl()}tickImpl=()=>{if(this._runningTick)throw De(ge.ChangeDetectionEnd),new X(101,!1);let e=ee(null);try{this._runningTick=!0,this.synchronize()}finally{this._runningTick=!1,this.tracingSnapshot?.dispose(),this.tracingSnapshot=null,ee(e),this.afterTick.next(),De(ge.ChangeDetectionEnd)}};synchronize(){this._rendererFactory===null&&!this._injector.destroyed&&(this._rendererFactory=this._injector.get(Ke,null,{optional:!0}));let e=0;for(;this.dirtyFlags!==0&&e++<JI;){De(ge.ChangeDetectionSyncStart);try{this.synchronizeOnce()}finally{De(ge.ChangeDetectionSyncEnd)}}}synchronizeOnce(){this.dirtyFlags&16&&(this.dirtyFlags&=-17,this.rootEffectScheduler.flush());let e=!1;if(this.dirtyFlags&7){let i=!!(this.dirtyFlags&1);this.dirtyFlags&=-8,this.dirtyFlags|=8;for(let{_lView:r}of this.allViews){if(!i&&!Aa(r))continue;let o=i&&!this.zonelessEnabled?0:1;jv(r,o),e=!0}if(this.dirtyFlags&=-5,this.syncDirtyFlagsWithViews(),this.dirtyFlags&23)return}e||(this._rendererFactory?.begin?.(),this._rendererFactory?.end?.()),this.dirtyFlags&8&&(this.dirtyFlags&=-9,this.afterRenderManager.execute()),this.syncDirtyFlagsWithViews()}syncDirtyFlagsWithViews(){if(this.allViews.some(({_lView:e})=>Aa(e))){this.dirtyFlags|=2;return}else this.dirtyFlags&=-8}attachView(e){let i=e;this._views.push(i),i.attachToAppRef(this)}detachView(e){let i=e;Ba(this._views,i),i.detachFromAppRef()}_loadComponent(e){this.attachView(e.hostView);try{this.tick()}catch(r){this.internalErrorHandler(r)}this.components.push(e),this._injector.get(by,[]).forEach(r=>r(e))}ngOnDestroy(){if(!this._destroyed)try{this._destroyListeners.forEach(e=>e()),this._views.slice().forEach(e=>e.destroy())}finally{this._destroyed=!0,this._views=[],this._destroyListeners=[]}}onDestroy(e){return this._destroyListeners.push(e),()=>Ba(this._destroyListeners,e)}destroy(){if(this._destroyed)throw new X(406,!1);let e=this._injector;e.destroy&&!e.destroyed&&e.destroy()}get viewCount(){return this._views.length}static \u0275fac=function(i){return new(i||t)};static \u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function Ba(t,n){let e=t.indexOf(n);e>-1&&t.splice(e,1)}function O(t,n,e,i){let r=ie(),o=Ii();if(qt(r,o,n)){let a=Fe(),s=Oa();IM(s,r,t,n,e,i)}return O}var Om=class{destroy(n){}updateValue(n,e){}swap(n,e){let i=Math.min(n,e),r=Math.max(n,e),o=this.detach(r);if(r-i>1){let a=this.detach(i);this.attach(i,o),this.attach(r,a)}else this.attach(i,o)}move(n,e){this.attach(e,this.detach(n))}};function Jf(t,n,e,i,r){return t===e&&Object.is(n,i)?1:Object.is(r(t,n),r(e,i))?-1:0}function eS(t,n,e,i){let r,o,a=0,s=t.length-1,l=void 0;if(Array.isArray(n)){ee(i);let d=n.length-1;for(ee(null);a<=s&&a<=d;){let u=t.at(a),f=n[a],_=Jf(a,u,a,f,e);if(_!==0){_<0&&t.updateValue(a,f),a++;continue}let g=t.at(s),C=n[d],F=Jf(s,g,d,C,e);if(F!==0){F<0&&t.updateValue(s,C),s--,d--;continue}let z=e(a,u),Q=e(s,g),Le=e(a,f);if(Object.is(Le,Q)){let Ot=e(d,C);Object.is(Ot,z)?(t.swap(a,s),t.updateValue(s,C),d--,s--):t.move(s,a),t.updateValue(a,f),a++;continue}if(r??=new Ic,o??=kb(t,a,s,e),Nm(t,r,a,Le))t.updateValue(a,f),a++,s++;else if(o.has(Le))r.set(z,t.detach(a)),s--;else{let Ot=t.create(a,n[a]);t.attach(a,Ot),a++,s++}}for(;a<=d;)Sb(t,r,e,a,n[a]),a++}else if(n!=null){ee(i);let d=n[Symbol.iterator]();ee(null);let u=d.next();for(;!u.done&&a<=s;){let f=t.at(a),_=u.value,g=Jf(a,f,a,_,e);if(g!==0)g<0&&t.updateValue(a,_),a++,u=d.next();else{r??=new Ic,o??=kb(t,a,s,e);let C=e(a,_);if(Nm(t,r,a,C))t.updateValue(a,_),a++,s++,u=d.next();else if(!o.has(C))t.attach(a,t.create(a,_)),a++,s++,u=d.next();else{let F=e(a,f);r.set(F,t.detach(a)),s--}}}for(;!u.done;)Sb(t,r,e,t.length,u.value),u=d.next()}for(;a<=s;)t.destroy(t.detach(s--));r?.forEach(d=>{t.destroy(d)})}function Nm(t,n,e,i){return n!==void 0&&n.has(i)?(t.attach(e,n.get(i)),n.delete(i),!0):!1}function Sb(t,n,e,i,r){if(Nm(t,n,i,e(i,r)))t.updateValue(i,r);else{let o=t.create(i,r);t.attach(i,o)}}function kb(t,n,e,i){let r=new Set;for(let o=n;o<=e;o++)r.add(i(o,t.at(o)));return r}var Ic=class{kvMap=new Map;_vMap=void 0;has(n){return this.kvMap.has(n)}delete(n){if(!this.has(n))return!1;let e=this.kvMap.get(n);return this._vMap!==void 0&&this._vMap.has(e)?(this.kvMap.set(n,this._vMap.get(e)),this._vMap.delete(e)):this.kvMap.delete(n),!0}get(n){return this.kvMap.get(n)}set(n,e){if(this.kvMap.has(n)){let i=this.kvMap.get(n);this._vMap===void 0&&(this._vMap=new Map);let r=this._vMap;for(;r.has(i);)i=r.get(i);r.set(i,e)}else this.kvMap.set(n,e)}forEach(n){for(let[e,i]of this.kvMap)if(n(i,e),this._vMap!==void 0){let r=this._vMap;for(;r.has(i);)i=r.get(i),n(i,e)}}};function k(t,n,e,i,r,o,a,s){Sr("NgControlFlow");let l=ie(),d=Fe(),u=Pt(d.consts,o);return Co(l,d,t,n,e,i,r,u,256,a,s),Ip}function Ip(t,n,e,i,r,o,a,s){Sr("NgControlFlow");let l=ie(),d=Fe(),u=Pt(d.consts,o);return Co(l,d,t,n,e,i,r,u,512,a,s),Ip}function T(t,n){Sr("NgControlFlow");let e=ie(),i=Ii(),r=e[i]!==Tt?e[i]:-1,o=r!==-1?Sc(e,Ve+r):void 0,a=0;if(qt(e,i,t)){let s=ee(null);try{if(o!==void 0&&Gv(o,a),t!==-1){let l=Ve+t,d=Sc(e,l),u=Vm(e[te],l),f=qv(d,u,e),_=Xa(e,u,n,{dehydratedView:f});Ja(d,_,a,vo(u,f))}}finally{ee(s)}}else if(o!==void 0){let s=Wv(o,a);s!==void 0&&(s[Ye]=n)}}var Fm=class{lContainer;$implicit;$index;constructor(n,e,i){this.lContainer=n,this.$implicit=e,this.$index=i}get $count(){return this.lContainer.length-ze}};function Sp(t){return t}function kp(t,n){return n}var Pm=class{hasEmptyBlock;trackByFn;liveCollection;constructor(n,e,i){this.hasEmptyBlock=n,this.trackByFn=e,this.liveCollection=i}};function lt(t,n,e,i,r,o,a,s,l,d,u,f,_){Sr("NgControlFlow");let g=ie(),C=Fe(),F=l!==void 0,z=ie(),Q=s?a.bind(z[Et][Ye]):a,Le=new Pm(F,Q);z[Ve+t]=Le,Co(g,C,t+1,n,e,i,r,Pt(C.consts,o),256),F&&Co(g,C,t+2,l,d,u,f,Pt(C.consts,_),512)}var Lm=class extends Om{lContainer;hostLView;templateTNode;operationsCounter=void 0;needsIndexUpdate=!1;constructor(n,e,i){super(),this.lContainer=n,this.hostLView=e,this.templateTNode=i}get length(){return this.lContainer.length-ze}at(n){return this.getLView(n)[Ye].$implicit}attach(n,e){let i=e[pr];this.needsIndexUpdate||=n!==this.length,Ja(this.lContainer,e,n,vo(this.templateTNode,i)),tS(this.lContainer,n)}detach(n){return this.needsIndexUpdate||=n!==this.length-1,nS(this.lContainer,n),iS(this.lContainer,n)}create(n,e){let i=xc(this.lContainer,this.templateTNode.tView.ssrId);return Xa(this.hostLView,this.templateTNode,new Fm(this.lContainer,e,n),{dehydratedView:i})}destroy(n){Vc(n[te],n)}updateValue(n,e){this.getLView(n)[Ye].$implicit=e}reset(){this.needsIndexUpdate=!1}updateIndexes(){if(this.needsIndexUpdate)for(let n=0;n<this.length;n++)this.getLView(n)[Ye].$index=n}getLView(n){return rS(this.lContainer,n)}};function ct(t){let n=ee(null),e=Hn();try{let i=ie(),r=i[te],o=i[e],a=e+1,s=Sc(i,a);if(o.liveCollection===void 0){let d=Vm(r,a);o.liveCollection=new Lm(s,i,d)}else o.liveCollection.reset();let l=o.liveCollection;if(eS(l,t,o.trackByFn,n),l.updateIndexes(),o.hasEmptyBlock){let d=Ii(),u=l.length===0;if(qt(i,d,u)){let f=e+2,_=Sc(i,f);if(u){let g=Vm(r,f),C=qv(_,g,i),F=Xa(i,g,void 0,{dehydratedView:C});Ja(_,F,0,vo(g,C))}else r.firstUpdatePass&&QM(_),Gv(_,0)}}}finally{ee(n)}}function Sc(t,n){return t[n]}function tS(t,n){if(t.length<=ze)return;let e=ze+n,i=t[e],r=i?i[Ei]:void 0;if(i&&r&&r.detachedLeaveAnimationFns&&r.detachedLeaveAnimationFns.length>0){let o=i[Zn];oM(o,r),wr.delete(i[Kn]),r.detachedLeaveAnimationFns=void 0}}function nS(t,n){if(t.length<=ze)return;let e=ze+n,i=t[e],r=i?i[Ei]:void 0;r&&r.leave&&r.leave.size>0&&(r.detachedLeaveAnimationFns=[])}function iS(t,n){return za(t,n)}function rS(t,n){return Wv(t,n)}function Vm(t,n){return Ql(t,n)}function E(t,n,e){let i=ie(),r=Ii();if(qt(i,r,n)){let o=Fe(),a=Oa();Ov(a,i,t,n,i[Ie],e)}return E}function Bm(t,n,e,i,r){mp(n,t,e,r?"class":"style",i)}function m(t,n,e,i){let r=ie(),o=r[te],a=t+Ve,s=o.firstCreatePass?gp(a,r,2,n,dp,ec(),e,i):o.data[a];if(Xn(s)){let l=r[hn].tracingService;if(l&&l.componentCreate){let d=o.data[s.directiveStart+s.componentOffset];return l.componentCreate(ty(d),()=>(Tb(t,n,r,s,i),m))}}return Tb(t,n,r,s,i),m}function Tb(t,n,e,i,r){if(up(i,e,t,n,Cy),uo(i)){let o=e[te];jc(o,e,i),Ym(o,i,e)}r!=null&&Qa(e,i)}function p(){let t=Fe(),n=tt(),e=fp(n);return t.firstCreatePass&&_p(t,e),Nf(e)&&Ff(),Rf(),e.classesWithoutHost!=null&&$w(e)&&Bm(t,e,ie(),e.classesWithoutHost,!0),e.stylesWithoutHost!=null&&Ww(e)&&Bm(t,e,ie(),e.stylesWithoutHost,!1),p}function B(t,n,e,i){return m(t,n,e,i),p(),B}function Pe(t,n,e,i){let r=ie(),o=r[te],a=t+Ve,s=o.firstCreatePass?uI(a,o,2,n,e,i):o.data[a];return up(s,r,t,n,Cy),i!=null&&Qa(r,s),Pe}function je(){let t=tt(),n=fp(t);return Nf(n)&&Ff(),Rf(),je}function vt(t,n,e,i){return Pe(t,n,e,i),je(),vt}var Cy=(t,n,e,i,r)=>(Na(!0),hv(n[Ie],i,W_()));function Tp(t,n,e){let i=ie(),r=i[te],o=t+Ve,a=r.firstCreatePass?gp(o,i,8,"ng-container",dp,ec(),n,e):r.data[o];if(up(a,i,t,"ng-container",oS),uo(a)){let s=i[te];jc(s,i,a),Ym(s,a,i)}return e!=null&&Qa(i,a),Tp}function Ap(){let t=Fe(),n=tt(),e=fp(n);return t.firstCreatePass&&_p(t,e),Ap}function Mo(t,n,e){return Tp(t,n,e),Ap(),Mo}var oS=(t,n,e,i,r)=>(Na(!0),PE(n[Ie],""));function de(){return ie()}function qe(t,n,e){let i=ie(),r=Ii();if(qt(i,r,n)){let o=Fe(),a=Oa();Nv(a,i,t,n,i[Ie],e)}return qe}var ns="en-US";var aS=ns;function Dy(t){typeof t=="string"&&(aS=t.toLowerCase().replace(/_/g,"-"))}function w(t,n,e){let i=ie(),r=Fe(),o=tt();return xy(r,i,i[Ie],o,t,n,e),w}function Ri(t,n,e){let i=ie(),r=Fe(),o=tt();return(o.type&3||e)&&Jv(o,r,i,e,i[Ie],t,n,gc(o,i,n)),Ri}function xy(t,n,e,i,r,o,a){let s=!0,l=null;if((i.type&3||a)&&(l??=gc(i,n,o),Jv(i,t,n,a,e,r,o,l)&&(s=!1)),s){let d=i.outputs?.[r],u=i.hostDirectiveOutputs?.[r];if(u&&u.length)for(let f=0;f<u.length;f+=2){let _=u[f],g=u[f+1];l??=gc(i,n,o),Db(i,n,_,g,r,l)}if(d&&d.length)for(let f of d)l??=gc(i,n,o),Db(i,n,f,r,r,l)}}function b(t=1){return $_(t)}function sS(t,n){let e=null,i=$E(t);for(let r=0;r<n.length;r++){let o=n[r];if(o==="*"){e=r;continue}if(i===null?Cv(t,o,!0):YE(i,o))return r}return e}function Se(t){let n=ie()[Et][wt];if(!n.projection){let e=t?t.length:1,i=n.projection=h_(e,null),r=i.slice(),o=n.child;for(;o!==null;){if(o.type!==128){let a=t?sS(o,t):0;a!==null&&(r[a]?r[a].projectionNext=o:i[a]=o,r[a]=o)}o=o.next}}}function oe(t,n=0,e,i,r,o){let a=ie(),s=Fe(),l=i?t+1:null;l!==null&&Co(a,s,l,i,r,o,null,e);let d=wo(s,Ve+t,16,null,e||null);d.projection===null&&(d.projection=n),Vf();let f=!a[pr]||Of();a[Et][wt].projection[d.projection]===null&&l!==null?lS(a,s,l):f&&!Ac(d)&&gM(s,a,d)}function lS(t,n,e){let i=Ve+e,r=n.data[i],o=t[i],a=xc(o,r.tView.ssrId),s=Xa(t,r,void 0,{dehydratedView:a});Ja(o,s,0,vo(r,a))}function Kt(t,n,e,i){return sy(t,n,e,i),Kt}function _e(t,n,e){return ay(t,n,e),_e}function W(t){let n=ie(),e=Fe(),i=ic();Ra(i+1);let r=vp(e,i);if(t.dirty&&E_(n)===((r.metadata.flags&2)===2)){if(r.matches===null)t.reset([]);else{let o=cy(n,i);t.reset(o,Kb),t.notifyOnChanges()}return!0}return!1}function G(){return bp(ie(),ic())}function Wc(t,n,e,i,r){return uy(n,sy(t,e,i,r)),Wc}function Gc(t,n,e,i){return uy(t,ay(n,e,i)),Gc}function Yc(t=1){Ra(ic()+t)}function yt(t){let n=O_();return Ef(n,Ve+t)}function uc(t,n){return t<<17|n<<2}function Er(t){return t>>17&32767}function cS(t){return(t&2)==2}function dS(t,n){return t&131071|n<<17}function jm(t){return t|2}function Do(t){return(t&131068)>>2}function em(t,n){return t&-131069|n<<2}function uS(t){return(t&1)===1}function Hm(t){return t|1}function fS(t,n,e,i,r,o){let a=o?n.classBindings:n.styleBindings,s=Er(a),l=Do(a);t[i]=e;let d=!1,u;if(Array.isArray(e)){let f=e;u=f[1],(u===null||oo(f,u)>0)&&(d=!0)}else u=e;if(r)if(l!==0){let _=Er(t[s+1]);t[i+1]=uc(_,s),_!==0&&(t[_+1]=em(t[_+1],i)),t[s+1]=dS(t[s+1],i)}else t[i+1]=uc(s,0),s!==0&&(t[s+1]=em(t[s+1],i)),s=i;else t[i+1]=uc(l,0),s===0?s=i:t[l+1]=em(t[l+1],i),l=i;d&&(t[i+1]=jm(t[i+1])),Ab(t,u,i,!0),Ab(t,u,i,!1),mS(n,u,t,i,o),a=uc(s,l),o?n.classBindings=a:n.styleBindings=a}function mS(t,n,e,i,r){let o=r?t.residualClasses:t.residualStyles;o!=null&&typeof n=="string"&&oo(o,n)>=0&&(e[i+1]=Hm(e[i+1]))}function Ab(t,n,e,i){let r=t[e+1],o=n===null,a=i?Er(r):Do(r),s=!1;for(;a!==0&&(s===!1||o);){let l=t[a],d=t[a+1];pS(l,n)&&(s=!0,t[a+1]=i?Hm(d):jm(d)),a=i?Er(d):Do(d)}s&&(t[e+1]=i?jm(r):Hm(r))}function pS(t,n){return t===null||n==null||(Array.isArray(t)?t[1]:t)===n?!0:Array.isArray(t)&&typeof n=="string"?oo(t,n)>=0:!1}var Cn={textEnd:0,key:0,keyEnd:0,value:0,valueEnd:0};function hS(t){return t.substring(Cn.key,Cn.keyEnd)}function gS(t){return _S(t),wy(t,Ey(t,0,Cn.textEnd))}function wy(t,n){let e=Cn.textEnd;return e===n?-1:(n=Cn.keyEnd=bS(t,Cn.key=n,e),Ey(t,n,e))}function _S(t){Cn.key=0,Cn.keyEnd=0,Cn.value=0,Cn.valueEnd=0,Cn.textEnd=t.length}function Ey(t,n,e){for(;n<e&&t.charCodeAt(n)<=32;)n++;return n}function bS(t,n,e){for(;n<e&&t.charCodeAt(n)>32;)n++;return n}function Ct(t,n,e){return My(t,n,e,!1),Ct}function A(t,n){return My(t,n,null,!0),A}function rt(t){yS(MS,vS,t,!0)}function vS(t,n){for(let e=gS(n);e>=0;e=wy(n,e))ql(t,hS(n),!0)}function My(t,n,e,i){let r=ie(),o=Fe(),a=tc(2);if(o.firstUpdatePass&&Sy(o,t,a,i),n!==Tt&&qt(r,a,n)){let s=o.data[Hn()];ky(o,s,r,r[Ie],t,r[a+1]=SS(n,e),i,a)}}function yS(t,n,e,i){let r=Fe(),o=tc(2);r.firstUpdatePass&&Sy(r,null,o,i);let a=ie();if(e!==Tt&&qt(a,o,e)){let s=r.data[Hn()];if(Ty(s,i)&&!Iy(r,o)){let l=i?s.classesWithoutHost:s.stylesWithoutHost;l!==null&&(e=Ul(l,e||"")),Bm(r,s,a,e,i)}else IS(r,s,a,a[Ie],a[o+1],a[o+1]=ES(t,n,e),i,o)}}function Iy(t,n){return n>=t.expandoStartIndex}function Sy(t,n,e,i){let r=t.data;if(r[e+1]===null){let o=r[Hn()],a=Iy(t,e);Ty(o,i)&&n===null&&!a&&(n=!1),n=CS(r,o,n,i),fS(r,o,n,e,a,i)}}function CS(t,n,e,i){let r=j_(t),o=i?n.residualClasses:n.residualStyles;if(r===null)(i?n.classBindings:n.styleBindings)===0&&(e=tm(null,t,n,e,i),e=Wa(e,n.attrs,i),o=null);else{let a=n.directiveStylingLast;if(a===-1||t[a]!==r)if(e=tm(r,t,n,e,i),o===null){let l=DS(t,n,i);l!==void 0&&Array.isArray(l)&&(l=tm(null,t,n,l[1],i),l=Wa(l,n.attrs,i),xS(t,n,i,l))}else o=wS(t,n,i)}return o!==void 0&&(i?n.residualClasses=o:n.residualStyles=o),e}function DS(t,n,e){let i=e?n.classBindings:n.styleBindings;if(Do(i)!==0)return t[Er(i)]}function xS(t,n,e,i){let r=e?n.classBindings:n.styleBindings;t[Er(r)]=i}function wS(t,n,e){let i,r=n.directiveEnd;for(let o=1+n.directiveStylingLast;o<r;o++){let a=t[o].hostAttrs;i=Wa(i,a,e)}return Wa(i,n.attrs,e)}function tm(t,n,e,i,r){let o=null,a=e.directiveEnd,s=e.directiveStylingLast;for(s===-1?s=e.directiveStart:s++;s<a&&(o=n[s],i=Wa(i,o.hostAttrs,r),o!==t);)s++;return t!==null&&(e.directiveStylingLast=s),i}function Wa(t,n,e){let i=e?1:2,r=-1;if(n!==null)for(let o=0;o<n.length;o++){let a=n[o];typeof a=="number"?r=a:r===i&&(Array.isArray(t)||(t=t===void 0?[]:["",t]),ql(t,a,e?!0:n[++o]))}return t===void 0?null:t}function ES(t,n,e){if(e==null||e==="")return pt;let i=[],r=xn(e);if(Array.isArray(r))for(let o=0;o<r.length;o++)t(i,r[o],!0);else if(r instanceof Set)for(let o of r)t(i,o,!0);else if(typeof r=="object")for(let o in r)r.hasOwnProperty(o)&&t(i,o,r[o]);else typeof r=="string"&&n(i,r);return i}function MS(t,n,e){let i=String(n);i!==""&&!i.includes(" ")&&ql(t,i,e)}function IS(t,n,e,i,r,o,a,s){r===Tt&&(r=pt);let l=0,d=0,u=0<r.length?r[0]:null,f=0<o.length?o[0]:null;for(;u!==null||f!==null;){let _=l<r.length?r[l+1]:void 0,g=d<o.length?o[d+1]:void 0,C=null,F;u===f?(l+=2,d+=2,_!==g&&(C=f,F=g)):f===null||u!==null&&u<f?(l+=2,C=u):(d+=2,C=f,F=g),C!==null&&ky(t,n,e,i,C,F,a,s),u=l<r.length?r[l]:null,f=d<o.length?o[d]:null}}function ky(t,n,e,i,r,o,a,s){if(!(n.type&3))return;let l=t.data,d=l[s+1],u=uS(d)?Rb(l,n,e,r,Do(d),a):void 0;if(!kc(u)){kc(o)||cS(d)&&(o=Rb(l,null,e,r,s,a));let f=wf(Hn(),e);bM(i,a,f,r,o)}}function Rb(t,n,e,i,r,o){let a=n===null,s;for(;r>0;){let l=t[r],d=Array.isArray(l),u=d?l[1]:l,f=u===null,_=e[r+1];_===Tt&&(_=f?pt:void 0);let g=f?Zl(_,i):u===i?_:void 0;if(d&&!kc(g)&&(g=Zl(l,i)),kc(g)&&(s=g,a))return s;let C=t[r+1];r=a?Er(C):Do(C)}if(n!==null){let l=o?n.residualClasses:n.residualStyles;l!=null&&(s=Zl(l,i))}return s}function kc(t){return t!==void 0}function SS(t,n){return t==null||t===""||(typeof n=="string"?t=t+n:typeof t=="object"&&(t=Hl(xn(t)))),t}function Ty(t,n){return(t.flags&(n?8:16))!==0}function v(t,n=""){let e=ie(),i=Fe(),r=t+Ve,o=i.firstCreatePass?wo(i,r,1,n,null):i.data[r],a=kS(i,e,o,n);e[r]=a,ac()&&lp(i,e,a,o),mo(o,!1)}var kS=(t,n,e,i)=>(Na(!0),NE(n[Ie],i));function TS(t,n,e,i=""){return qt(t,Ii(),e)?n+ur(e)+i:Tt}function AS(t,n,e,i,r,o=""){let a=F_(),s=mI(t,a,e,r);return tc(2),s?n+ur(e)+i+ur(r)+o:Tt}function ne(t){return Ae("",t),ne}function Ae(t,n,e){let i=ie(),r=TS(i,t,n,e);return r!==Tt&&Ay(i,Hn(),r),Ae}function is(t,n,e,i,r){let o=ie(),a=AS(o,t,n,e,i,r);return a!==Tt&&Ay(o,Hn(),a),is}function Ay(t,n,e){let i=wf(n,t);FE(t[Ie],i,e)}function Io(t,n,e){xp(n)&&(n=n());let i=ie(),r=Ii();if(qt(i,r,n)){let o=Fe(),a=Oa();Ov(a,i,t,n,i[Ie],e)}return Io}function rs(t,n){let e=xp(t);return e&&t.set(n),e}function So(t,n){let e=ie(),i=Fe(),r=tt();return xy(i,e,e[Ie],r,t,n),So}function Ob(t,n,e){let i=Fe();i.firstCreatePass&&Ry(n,i.data,i.blueprint,_n(t),e)}function Ry(t,n,e,i,r){if(t=Je(t),Array.isArray(t))for(let o=0;o<t.length;o++)Ry(t[o],n,e,i,r);else{let o=Fe(),a=ie(),s=tt(),l=lr(t)?t:Je(t.provide),d=bf(t),u=s.providerIndexes&1048575,f=s.directiveStart,_=s.providerIndexes>>20;if(lr(t)||!t.multi){let g=new xr(d,r,J,null),C=im(l,n,r?u:u+_,f);C===-1?(om(Cc(s,a),o,l),nm(o,t,n.length),n.push(l),s.directiveStart++,s.directiveEnd++,r&&(s.providerIndexes+=1048576),e.push(g),a.push(g)):(e[C]=g,a[C]=g)}else{let g=im(l,n,u+_,f),C=im(l,n,u,u+_),F=g>=0&&e[g],z=C>=0&&e[C];if(r&&!z||!r&&!F){om(Cc(s,a),o,l);let Q=NS(r?OS:RS,e.length,r,i,d,t);!r&&z&&(e[C].providerFactory=Q),nm(o,t,n.length,0),n.push(l),s.directiveStart++,s.directiveEnd++,r&&(s.providerIndexes+=1048576),e.push(Q),a.push(Q)}else{let Q=Oy(e[r?C:g],d,!r&&i);nm(o,t,g>-1?g:C,Q)}!r&&i&&z&&e[C].componentProviders++}}}function nm(t,n,e,i){let r=lr(n),o=C_(n);if(r||o){let l=(o?Je(n.useClass):n).prototype.ngOnDestroy;if(l){let d=t.destroyHooks||(t.destroyHooks=[]);if(!r&&n.multi){let u=d.indexOf(e);u===-1?d.push(e,[i,l]):d[u+1].push(i,l)}else d.push(e,l)}}}function Oy(t,n,e){return e&&t.componentProviders++,t.multi.push(n)-1}function im(t,n,e,i){for(let r=e;r<i;r++)if(n[r]===t)return r;return-1}function RS(t,n,e,i,r){return Um(this.multi,[])}function OS(t,n,e,i,r){let o=this.multi,a;if(this.providerFactory){let s=this.providerFactory.componentProviders,l=ja(i,i[te],this.providerFactory.index,r);a=l.slice(0,s),Um(o,a);for(let d=s;d<l.length;d++)a.push(l[d])}else a=[],Um(o,a);return a}function Um(t,n){for(let e=0;e<t.length;e++){let i=t[e];n.push(i())}return n}function NS(t,n,e,i,r,o){let a=new xr(t,e,J,null);return a.multi=[],a.index=n,a.componentProviders=0,Oy(a,r,i&&!e),a}function Re(t,n){return e=>{e.providersResolver=(i,r)=>Ob(i,r?r(t):t,!1),n&&(e.viewProvidersResolver=(i,r)=>Ob(i,r?r(n):n,!0))}}function FS(t,n){let e=t[n];return e===Tt?void 0:e}function PS(t,n,e,i,r,o){let a=n+e;return qt(t,a,r)?fI(t,a+1,o?i.call(o,r):i(r)):FS(t,a+1)}function Rp(t,n){let e=Fe(),i,r=t+Ve;e.firstCreatePass?(i=LS(n,e.pipeRegistry),e.data[r]=i,i.onDestroy&&(e.destroyHooks??=[]).push(r,i.onDestroy)):i=e.data[r];let o=i.factory||(i.factory=bi(i.type,!0)),a,s=xt(J);try{let l=yc(!1),d=o();return yc(l),Mf(e,ie(),r,d),d}finally{xt(s)}}function LS(t,n){if(n)for(let e=n.length-1;e>=0;e--){let i=n[e];if(t===i.name)return i}}function Op(t,n,e){let i=t+Ve,r=ie(),o=Ef(r,i);return VS(r,i)?PS(r,N_(),n,o.transform,e,o):o.transform(e)}function VS(t,n){return t[te].data[n].pure}function os(t,n){return Hc(t,n)}var Ny=(()=>{class t{applicationErrorHandler=c(ei);appRef=c(Zt);taskService=c(Cr);ngZone=c(P);zonelessEnabled=c(Fa);tracing=c(wn,{optional:!0});zoneIsDefined=typeof Zone<"u"&&!!Zone.root.run;schedulerTickApplyArgs=[{data:{__scheduler_tick__:!0}}];subscriptions=new ce;angularZoneId=this.zoneIsDefined?this.ngZone._inner?.get(Ma):null;scheduleInRootZone=!this.zonelessEnabled&&this.zoneIsDefined&&(c(Yf,{optional:!0})??!1);cancelScheduledCallback=null;useMicrotaskScheduler=!1;runningTick=!1;pendingRenderTaskId=null;constructor(){this.subscriptions.add(this.appRef.afterTick.subscribe(()=>{let e=this.taskService.add();if(!this.runningTick&&(this.cleanup(),!this.zonelessEnabled||this.appRef.includeAllTestViews)){this.taskService.remove(e);return}this.switchToMicrotaskScheduler(),this.taskService.remove(e)})),this.subscriptions.add(this.ngZone.onUnstable.subscribe(()=>{this.runningTick||this.cleanup()}))}switchToMicrotaskScheduler(){this.ngZone.runOutsideAngular(()=>{let e=this.taskService.add();this.useMicrotaskScheduler=!0,queueMicrotask(()=>{this.useMicrotaskScheduler=!1,this.taskService.remove(e)})})}notify(e){if(!this.zonelessEnabled&&e===5)return;switch(e){case 0:{this.appRef.dirtyFlags|=2;break}case 3:case 2:case 4:case 5:case 1:{this.appRef.dirtyFlags|=4;break}case 6:{this.appRef.dirtyFlags|=2;break}case 12:{this.appRef.dirtyFlags|=16;break}case 13:{this.appRef.dirtyFlags|=2;break}case 11:break;default:this.appRef.dirtyFlags|=8}if(this.appRef.tracingSnapshot=this.tracing?.snapshot(this.appRef.tracingSnapshot)??null,!this.shouldScheduleTick())return;let i=this.useMicrotaskScheduler?K_:Uf;this.pendingRenderTaskId=this.taskService.add(),this.scheduleInRootZone?this.cancelScheduledCallback=Zone.root.run(()=>i(()=>this.tick())):this.cancelScheduledCallback=this.ngZone.runOutsideAngular(()=>i(()=>this.tick()))}shouldScheduleTick(){return!(this.appRef.destroyed||this.pendingRenderTaskId!==null||this.runningTick||this.appRef._runningTick||!this.zonelessEnabled&&this.zoneIsDefined&&Zone.current.get(Ma+this.angularZoneId))}tick(){if(this.runningTick||this.appRef.destroyed)return;if(this.appRef.dirtyFlags===0){this.cleanup();return}!this.zonelessEnabled&&this.appRef.dirtyFlags&7&&(this.appRef.dirtyFlags|=1);let e=this.taskService.add();try{this.ngZone.run(()=>{this.runningTick=!0,this.appRef._tick()},void 0,this.schedulerTickApplyArgs)}catch(i){this.applicationErrorHandler(i)}finally{this.taskService.remove(e),this.cleanup()}}ngOnDestroy(){this.subscriptions.unsubscribe(),this.cleanup()}cleanup(){if(this.runningTick=!1,this.cancelScheduledCallback?.(),this.cancelScheduledCallback=null,this.pendingRenderTaskId!==null){let e=this.pendingRenderTaskId;this.pendingRenderTaskId=null,this.taskService.remove(e)}}static \u0275fac=function(i){return new(i||t)};static \u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function Fy(){return[{provide:Bn,useExisting:Ny},{provide:P,useClass:Ia},{provide:Fa,useValue:!0}]}function BS(){return typeof $localize<"u"&&$localize.locale||ns}var ko=new y("",{factory:()=>c(ko,{optional:!0,skipSelf:!0})||BS()});var qc=class{destroyed=!1;listeners=null;errorHandler=c(ht,{optional:!0});destroyRef=c(Lt);constructor(){this.destroyRef.onDestroy(()=>{this.destroyed=!0,this.listeners=null})}subscribe(n){if(this.destroyed)throw new X(953,!1);return(this.listeners??=[]).push(n),{unsubscribe:()=>{let e=this.listeners?.indexOf(n);e!==void 0&&e!==-1&&this.listeners?.splice(e,1)}}}emit(n){if(this.destroyed){console.warn(Ci(953,!1));return}if(this.listeners===null)return;let e=ee(null);try{for(let i of this.listeners)try{i(n)}catch(r){this.errorHandler?.handleError(r)}}finally{ee(e)}}};function Qt(t){return i_(t)}function ke(t,n){return ua(t,n?.equal)}var By=Symbol("InputSignalNode#UNSET"),JS=se(I({},fa),{transformFn:void 0,applyValueToInputSignal(t,n){Zr(t,n)}});function jy(t,n){let e=Object.create(JS);e.value=t,e.transformFn=n?.transform;function i(){if(qi(e),e.value===By){let r=null;throw new X(-950,r)}return e.value}return i[Xe]=e,i}var Xt=class{attributeName;constructor(n){this.attributeName=n}__NG_ELEMENT_ID__=()=>$m(this.attributeName);toString(){return`HostAttributeToken ${this.attributeName}`}};function Hy(t){return new qc}function Py(t,n){return jy(t,n)}function ek(t){return jy(By,t)}var Jt=(Py.required=ek,Py);function Ly(t,n){return yp(n)}function tk(t,n){return Cp(n)}var ss=(Ly.required=tk,Ly);function Vy(t,n){return yp(n)}function nk(t,n){return Cp(n)}var Uy=(Vy.required=nk,Vy);var Fp=new y(""),ik=new y("");function as(t){return!t.moduleRef}function rk(t){let n=as(t)?t.r3Injector:t.moduleRef.injector,e=n.get(P);return e.run(()=>{as(t)?t.r3Injector.resolveInjectorInitializers():t.moduleRef.resolveInjectorInitializers();let i=n.get(ei),r;if(e.runOutsideAngular(()=>{r=e.onError.subscribe({next:i})}),as(t)){let o=()=>n.destroy(),a=t.platformInjector.get(Fp);a.add(o),n.onDestroy(()=>{r.unsubscribe(),a.delete(o)})}else{let o=()=>t.moduleRef.destroy(),a=t.platformInjector.get(Fp);a.add(o),t.moduleRef.onDestroy(()=>{Ba(t.allPlatformModules,t.moduleRef),r.unsubscribe(),a.delete(o)})}return ak(i,e,()=>{let o=n.get(Cr),a=o.add(),s=n.get(Mp);return s.runInitializers(),s.donePromise.then(()=>{let l=n.get(ko,ns);if(Dy(l||ns),!n.get(ik,!0))return as(t)?n.get(Zt):(t.allPlatformModules.push(t.moduleRef),t.moduleRef);if(as(t)){let u=n.get(Zt);return t.rootComponent!==void 0&&u.bootstrap(t.rootComponent),u}else return ok?.(t.moduleRef,t.allPlatformModules),t.moduleRef}).finally(()=>{o.remove(a)})})})}var ok;function ak(t,n,e){try{let i=e();return Eo(i)?i.catch(r=>{throw n.runOutsideAngular(()=>t(r)),r}):i}catch(i){throw n.runOutsideAngular(()=>t(i)),i}}var Zc=null;function sk(t=[],n){return Y.create({name:n,providers:[{provide:ka,useValue:"platform"},{provide:Fp,useValue:new Set([()=>Zc=null])},...t]})}function lk(t=[]){if(Zc)return Zc;let n=sk(t);return Zc=n,vy(),ck(n),n}function ck(t){let n=t.get(Tc,null);so(t,()=>{n?.forEach(e=>e())})}var dk=1e4;var T4=dk-1e3;var be=(()=>{class t{static __NG_ELEMENT_ID__=uk}return t})();function uk(t){return fk(tt(),ie(),(t&16)===16)}function fk(t,n,e){if(Xn(t)&&!e){let i=Yt(t.index,n);return new ki(i,i)}else if(t.type&175){let i=n[Et];return new ki(i,n)}return null}function zy(t){let{rootComponent:n,appProviders:e,platformProviders:i,platformRef:r}=t;De(ge.BootstrapApplicationStart);try{let o=r?.injector??lk(i),a=[Fy(),X_,...e||[]],s=new $a({providers:a,parent:o,debugName:"",runEnvironmentInitializers:!1});return rk({r3Injector:s.injector,platformInjector:o,rootComponent:n})}catch(o){return Promise.reject(o)}finally{De(ge.BootstrapApplicationEnd)}}function U(t){return typeof t=="boolean"?t:t!=null&&t!=="false"}function En(t,n=NaN){return!isNaN(parseFloat(t))&&!isNaN(Number(t))?Number(t):n}var Np=Symbol("NOT_SET"),$y=new Set,mk=se(I({},fa),{kind:"afterRenderEffectPhase",consumerIsAlwaysLive:!0,consumerAllowSignalWrites:!0,value:Np,cleanup:null,consumerMarkedDirty(){if(this.sequence.impl.executing){if(this.sequence.lastPhase===null||this.sequence.lastPhase<this.phase)return;this.sequence.erroredOrDestroyed=!0}this.sequence.scheduler.notify(7)},phaseFn(t){if(this.sequence.lastPhase=this.phase,!this.dirty)return this.signal;if(this.dirty=!1,this.value!==Np&&!Yr(this))return this.signal;try{for(let r of this.cleanup??$y)r()}finally{this.cleanup?.clear()}let n=[];t!==void 0&&n.push(t),n.push(this.registerCleanupFn);let e=hi(this),i;try{i=this.userFn.apply(null,n)}finally{Zi(this,e)}return(this.value===Np||!this.equal(this.value,i))&&(this.value=i,this.version++),this.signal}}),Pp=class extends Ha{scheduler;lastPhase=null;nodes=[void 0,void 0,void 0,void 0];onDestroyFns=null;constructor(n,e,i,r,o,a=null){super(n,[void 0,void 0,void 0,void 0],i,!1,o.get(Lt),a),this.scheduler=r;for(let s of op){let l=e[s];if(l===void 0)continue;let d=Object.create(mk);d.sequence=this,d.phase=s,d.userFn=l,d.dirty=!0,d.signal=()=>(qi(d),d.value),d.signal[Xe]=d,d.registerCleanupFn=u=>(d.cleanup??=new Set).add(u),this.nodes[s]=d,this.hooks[s]=u=>d.phaseFn(u)}}afterRun(){super.afterRun(),this.lastPhase=null}destroy(){if(this.onDestroyFns!==null)for(let n of this.onDestroyFns)n();super.destroy();for(let n of this.nodes)if(n)try{for(let e of n.cleanup??$y)e()}finally{gi(n)}}};function Wy(t,n){let e=n?.injector??c(Y),i=e.get(Bn),r=e.get(Lc),o=e.get(wn,null,{optional:!0});r.impl??=e.get(ap);let a=t;typeof a=="function"&&(a={mixedReadWrite:t});let s=e.get(po,null,{optional:!0}),l=new Pp(r.impl,[a.earlyRead,a.write,a.mixedReadWrite,a.read],s?.view,i,e,o?.snapshot(null));return r.impl.register(l),l}function Kc(t,n){let e=xi(t),i=n.elementInjector||ao();return new yo(e).create(i,n.projectableNodes,n.hostElement,n.environmentInjector,n.directives,n.bindings)}var Gy=null;function en(){return Gy}function Vp(t){Gy??=t}var ls=class{},To=(()=>{class t{historyGo(e){throw new Error("")}static \u0275fac=function(i){return new(i||t)};static \u0275prov=D({token:t,factory:()=>c(Yy),providedIn:"platform"})}return t})();var Yy=(()=>{class t extends To{_location;_history;_doc=c(K);constructor(){super(),this._location=window.location,this._history=window.history}getBaseHrefFromDOM(){return en().getBaseHref(this._doc)}onPopState(e){let i=en().getGlobalEventTarget(this._doc,"window");return i.addEventListener("popstate",e,!1),()=>i.removeEventListener("popstate",e)}onHashChange(e){let i=en().getGlobalEventTarget(this._doc,"window");return i.addEventListener("hashchange",e,!1),()=>i.removeEventListener("hashchange",e)}get href(){return this._location.href}get protocol(){return this._location.protocol}get hostname(){return this._location.hostname}get port(){return this._location.port}get pathname(){return this._location.pathname}get search(){return this._location.search}get hash(){return this._location.hash}set pathname(e){this._location.pathname=e}pushState(e,i,r){this._history.pushState(e,i,r)}replaceState(e,i,r){this._history.replaceState(e,i,r)}forward(){this._history.forward()}back(){this._history.back()}historyGo(e=0){this._history.go(e)}getState(){return this._history.state}static \u0275fac=function(i){return new(i||t)};static \u0275prov=D({token:t,factory:()=>new t,providedIn:"platform"})}return t})();function Ky(t,n){return t?n?t.endsWith("/")?n.startsWith("/")?t+n.slice(1):t+n:n.startsWith("/")?t+n:`${t}/${n}`:t:n}function qy(t){let n=t.search(/#|\?|$/);return t[n-1]==="/"?t.slice(0,n-1)+t.slice(n):t}function Oi(t){return t&&t[0]!=="?"?`?${t}`:t}var Qc=(()=>{class t{historyGo(e){throw new Error("")}static \u0275fac=function(i){return new(i||t)};static \u0275prov=D({token:t,factory:()=>c(hk),providedIn:"root"})}return t})(),pk=new y(""),hk=(()=>{class t extends Qc{_platformLocation;_baseHref;_removeListenerFns=[];constructor(e,i){super(),this._platformLocation=e,this._baseHref=i??this._platformLocation.getBaseHrefFromDOM()??c(K).location?.origin??""}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(e){this._removeListenerFns.push(this._platformLocation.onPopState(e),this._platformLocation.onHashChange(e))}getBaseHref(){return this._baseHref}prepareExternalUrl(e){return Ky(this._baseHref,e)}path(e=!1){let i=this._platformLocation.pathname+Oi(this._platformLocation.search),r=this._platformLocation.hash;return r&&e?`${i}${r}`:i}pushState(e,i,r,o){let a=this.prepareExternalUrl(r+Oi(o));this._platformLocation.pushState(e,i,a)}replaceState(e,i,r,o){let a=this.prepareExternalUrl(r+Oi(o));this._platformLocation.replaceState(e,i,a)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(e=0){this._platformLocation.historyGo?.(e)}static \u0275fac=function(i){return new(i||t)(V(To),V(pk,8))};static \u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Xc=(()=>{class t{_subject=new M;_basePath;_locationStrategy;_urlChangeListeners=[];_urlChangeSubscription=null;constructor(e){this._locationStrategy=e;let i=this._locationStrategy.getBaseHref();this._basePath=bk(qy(Zy(i))),this._locationStrategy.onPopState(r=>{this._subject.next({url:this.path(!0),pop:!0,state:r.state,type:r.type})})}ngOnDestroy(){this._urlChangeSubscription?.unsubscribe(),this._urlChangeListeners=[]}path(e=!1){return this.normalize(this._locationStrategy.path(e))}getState(){return this._locationStrategy.getState()}isCurrentPathEqualTo(e,i=""){return this.path()==this.normalize(e+Oi(i))}normalize(e){return t.stripTrailingSlash(_k(this._basePath,Zy(e)))}prepareExternalUrl(e){return e&&e[0]!=="/"&&(e="/"+e),this._locationStrategy.prepareExternalUrl(e)}go(e,i="",r=null){this._locationStrategy.pushState(r,"",e,i),this._notifyUrlChangeListeners(this.prepareExternalUrl(e+Oi(i)),r)}replaceState(e,i="",r=null){this._locationStrategy.replaceState(r,"",e,i),this._notifyUrlChangeListeners(this.prepareExternalUrl(e+Oi(i)),r)}forward(){this._locationStrategy.forward()}back(){this._locationStrategy.back()}historyGo(e=0){this._locationStrategy.historyGo?.(e)}onUrlChange(e){return this._urlChangeListeners.push(e),this._urlChangeSubscription??=this.subscribe(i=>{this._notifyUrlChangeListeners(i.url,i.state)}),()=>{let i=this._urlChangeListeners.indexOf(e);this._urlChangeListeners.splice(i,1),this._urlChangeListeners.length===0&&(this._urlChangeSubscription?.unsubscribe(),this._urlChangeSubscription=null)}}_notifyUrlChangeListeners(e="",i){this._urlChangeListeners.forEach(r=>r(e,i))}subscribe(e,i,r){return this._subject.subscribe({next:e,error:i??void 0,complete:r??void 0})}static normalizeQueryParams=Oi;static joinWithSlash=Ky;static stripTrailingSlash=qy;static \u0275fac=function(i){return new(i||t)(V(Qc))};static \u0275prov=D({token:t,factory:()=>gk(),providedIn:"root"})}return t})();function gk(){return new Xc(V(Qc))}function _k(t,n){if(!t||!n.startsWith(t))return n;let e=n.substring(t.length);return e===""||["/",";","?","#"].includes(e[0])?e:n}function Zy(t){return t.replace(/\/index.html$/,"")}function bk(t){if(new RegExp("^(https?:)?//").test(t)){let[,e]=t.split(/\/\/[^\/]+/);return e}return t}var cs=(()=>{class t{_viewContainerRef;_viewRef=null;ngTemplateOutletContext=null;ngTemplateOutlet=null;ngTemplateOutletInjector=null;injector=c(Y);constructor(e){this._viewContainerRef=e}ngOnChanges(e){if(this._shouldRecreateView(e)){let i=this._viewContainerRef;if(this._viewRef&&i.remove(i.indexOf(this._viewRef)),!this.ngTemplateOutlet){this._viewRef=null;return}let r=this._createContextForwardProxy();this._viewRef=i.createEmbeddedView(this.ngTemplateOutlet,r,{injector:this._getInjector()})}}_getInjector(){return this.ngTemplateOutletInjector==="outlet"?this.injector:this.ngTemplateOutletInjector??void 0}_shouldRecreateView(e){return!!e.ngTemplateOutlet||!!e.ngTemplateOutletInjector}_createContextForwardProxy(){return new Proxy({},{set:(e,i,r)=>this.ngTemplateOutletContext?Reflect.set(this.ngTemplateOutletContext,i,r):!1,get:(e,i,r)=>{if(this.ngTemplateOutletContext)return Reflect.get(this.ngTemplateOutletContext,i,r)}})}static \u0275fac=function(i){return new(i||t)(J(bt))};static \u0275dir=$({type:t,selectors:[["","ngTemplateOutlet",""]],inputs:{ngTemplateOutletContext:"ngTemplateOutletContext",ngTemplateOutlet:"ngTemplateOutlet",ngTemplateOutletInjector:"ngTemplateOutletInjector"},features:[Be]})}return t})();function ds(t,n){n=encodeURIComponent(n);for(let e of t.split(";")){let i=e.indexOf("="),[r,o]=i==-1?[e,""]:[e.slice(0,i),e.slice(i+1)];if(r.trim()===n)return decodeURIComponent(o)}return null}var Tr=class{};var Bp="browser";function Qy(t){return t===Bp}var us=class{_doc;constructor(n){this._doc=n}manager},Jc=(()=>{class t extends us{constructor(e){super(e)}supports(e){return!0}addEventListener(e,i,r,o){return e.addEventListener(i,r,o),()=>this.removeEventListener(e,i,r,o)}removeEventListener(e,i,r,o){return e.removeEventListener(i,r,o)}static \u0275fac=function(i){return new(i||t)(V(K))};static \u0275prov=D({token:t,factory:t.\u0275fac})}return t})(),nd=new y(""),zp=(()=>{class t{_zone;_plugins;_eventNameToPlugin=new Map;constructor(e,i){this._zone=i,e.forEach(a=>{a.manager=this});let r=e.filter(a=>!(a instanceof Jc));this._plugins=r.slice().reverse();let o=e.find(a=>a instanceof Jc);o&&this._plugins.push(o)}addEventListener(e,i,r,o){return this._findPluginFor(i).addEventListener(e,i,r,o)}getZone(){return this._zone}_findPluginFor(e){let i=this._eventNameToPlugin.get(e);if(i)return i;if(i=this._plugins.find(o=>o.supports(e)),!i)throw new X(5101,!1);return this._eventNameToPlugin.set(e,i),i}static \u0275fac=function(i){return new(i||t)(V(nd),V(P))};static \u0275prov=D({token:t,factory:t.\u0275fac})}return t})(),jp="ng-app-id";function Xy(t){for(let n of t)n.remove()}function Jy(t,n){let e=n.createElement("style");return e.textContent=t,e}function Dk(t,n,e,i){let r=t.head?.querySelectorAll(`style[${jp}="${n}"],link[${jp}="${n}"]`);if(r)for(let o of r)o.removeAttribute(jp),o instanceof HTMLLinkElement?i.set(o.href.slice(o.href.lastIndexOf("/")+1),{usage:0,elements:[o]}):o.textContent&&e.set(o.textContent,{usage:0,elements:[o]})}function Up(t,n){let e=n.createElement("link");return e.setAttribute("rel","stylesheet"),e.setAttribute("href",t),e}var $p=(()=>{class t{doc;appId;nonce;inline=new Map;external=new Map;hosts=new Set;constructor(e,i,r,o={}){this.doc=e,this.appId=i,this.nonce=r,Dk(e,i,this.inline,this.external),this.hosts.add(e.head)}addStyles(e,i){for(let r of e)this.addUsage(r,this.inline,Jy);i?.forEach(r=>this.addUsage(r,this.external,Up))}removeStyles(e,i){for(let r of e)this.removeUsage(r,this.inline);i?.forEach(r=>this.removeUsage(r,this.external))}addUsage(e,i,r){let o=i.get(e);o?o.usage++:i.set(e,{usage:1,elements:[...this.hosts].map(a=>this.addElement(a,r(e,this.doc)))})}removeUsage(e,i){let r=i.get(e);r&&(r.usage--,r.usage<=0&&(Xy(r.elements),i.delete(e)))}ngOnDestroy(){for(let[,{elements:e}]of[...this.inline,...this.external])Xy(e);this.hosts.clear()}addHost(e){this.hosts.add(e);for(let[i,{elements:r}]of this.inline)r.push(this.addElement(e,Jy(i,this.doc)));for(let[i,{elements:r}]of this.external)r.push(this.addElement(e,Up(i,this.doc)))}removeHost(e){this.hosts.delete(e)}addElement(e,i){return this.nonce&&i.setAttribute("nonce",this.nonce),e.appendChild(i)}static \u0275fac=function(i){return new(i||t)(V(K),V(Ai),V(Ir,8),V(Mr))};static \u0275prov=D({token:t,factory:t.\u0275fac})}return t})(),Hp={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",math:"http://www.w3.org/1998/Math/MathML"},Wp=/%COMP%/g;var t0="%COMP%",xk=`_nghost-${t0}`,wk=`_ngcontent-${t0}`,Ek=!0,Mk=new y("",{factory:()=>Ek});function Ik(t){return wk.replace(Wp,t)}function Sk(t){return xk.replace(Wp,t)}function n0(t,n){return n.map(e=>e.replace(Wp,t))}var Gp=(()=>{class t{eventManager;sharedStylesHost;appId;removeStylesOnCompDestroy;doc;ngZone;nonce;tracingService;rendererByCompId=new Map;defaultRenderer;constructor(e,i,r,o,a,s,l=null,d=null){this.eventManager=e,this.sharedStylesHost=i,this.appId=r,this.removeStylesOnCompDestroy=o,this.doc=a,this.ngZone=s,this.nonce=l,this.tracingService=d,this.defaultRenderer=new fs(e,a,s,this.tracingService)}createRenderer(e,i){if(!e||!i)return this.defaultRenderer;let r=this.getOrCreateRenderer(e,i);return r instanceof td?r.applyToHost(e):r instanceof ms&&r.applyStyles(),r}getOrCreateRenderer(e,i){let r=this.rendererByCompId,o=r.get(i.id);if(!o){let a=this.doc,s=this.ngZone,l=this.eventManager,d=this.sharedStylesHost,u=this.removeStylesOnCompDestroy,f=this.tracingService;switch(i.encapsulation){case Dn.Emulated:o=new td(l,d,i,this.appId,u,a,s,f);break;case Dn.ShadowDom:return new ed(l,e,i,a,s,this.nonce,f,d);case Dn.ExperimentalIsolatedShadowDom:return new ed(l,e,i,a,s,this.nonce,f);default:o=new ms(l,d,i,u,a,s,f);break}r.set(i.id,o)}return o}ngOnDestroy(){this.rendererByCompId.clear()}componentReplaced(e){this.rendererByCompId.delete(e)}static \u0275fac=function(i){return new(i||t)(V(zp),V($p),V(Ai),V(Mk),V(K),V(P),V(Ir),V(wn,8))};static \u0275prov=D({token:t,factory:t.\u0275fac})}return t})(),fs=class{eventManager;doc;ngZone;tracingService;data=Object.create(null);throwOnSyntheticProps=!0;constructor(n,e,i,r){this.eventManager=n,this.doc=e,this.ngZone=i,this.tracingService=r}destroy(){}destroyNode=null;createElement(n,e){return e?this.doc.createElementNS(Hp[e]||e,n):this.doc.createElement(n)}createComment(n){return this.doc.createComment(n)}createText(n){return this.doc.createTextNode(n)}appendChild(n,e){(e0(n)?n.content:n).appendChild(e)}insertBefore(n,e,i){n&&(e0(n)?n.content:n).insertBefore(e,i)}removeChild(n,e){e.remove()}selectRootElement(n,e){let i=typeof n=="string"?this.doc.querySelector(n):n;if(!i)throw new X(-5104,!1);return e||(i.textContent=""),i}parentNode(n){return n.parentNode}nextSibling(n){return n.nextSibling}setAttribute(n,e,i,r){if(r){e=r+":"+e;let o=Hp[r];o?n.setAttributeNS(o,e,i):n.setAttribute(e,i)}else n.setAttribute(e,i)}removeAttribute(n,e,i){if(i){let r=Hp[i];r?n.removeAttributeNS(r,e):n.removeAttribute(`${i}:${e}`)}else n.removeAttribute(e)}addClass(n,e){n.classList.add(e)}removeClass(n,e){n.classList.remove(e)}setStyle(n,e,i,r){r&(zn.DashCase|zn.Important)?n.style.setProperty(e,i,r&zn.Important?"important":""):n.style[e]=i}removeStyle(n,e,i){i&zn.DashCase?n.style.removeProperty(e):n.style[e]=""}setProperty(n,e,i){n!=null&&(n[e]=i)}setValue(n,e){n.nodeValue=e}listen(n,e,i,r){if(typeof n=="string"&&(n=en().getGlobalEventTarget(this.doc,n),!n))throw new X(5102,!1);let o=this.decoratePreventDefault(i);return this.tracingService?.wrapEventListener&&(o=this.tracingService.wrapEventListener(n,e,o)),this.eventManager.addEventListener(n,e,o,r)}decoratePreventDefault(n){return e=>{if(e==="__ngUnwrap__")return n;n(e)===!1&&e.preventDefault()}}};function e0(t){return t.tagName==="TEMPLATE"&&t.content!==void 0}var ed=class extends fs{hostEl;sharedStylesHost;shadowRoot;constructor(n,e,i,r,o,a,s,l){super(n,r,o,s),this.hostEl=e,this.sharedStylesHost=l,this.shadowRoot=e.attachShadow({mode:"open"}),this.sharedStylesHost&&this.sharedStylesHost.addHost(this.shadowRoot);let d=i.styles;d=n0(i.id,d);for(let f of d){let _=document.createElement("style");a&&_.setAttribute("nonce",a),_.textContent=f,this.shadowRoot.appendChild(_)}let u=i.getExternalStyles?.();if(u)for(let f of u){let _=Up(f,r);a&&_.setAttribute("nonce",a),this.shadowRoot.appendChild(_)}}nodeOrShadowRoot(n){return n===this.hostEl?this.shadowRoot:n}appendChild(n,e){return super.appendChild(this.nodeOrShadowRoot(n),e)}insertBefore(n,e,i){return super.insertBefore(this.nodeOrShadowRoot(n),e,i)}removeChild(n,e){return super.removeChild(null,e)}parentNode(n){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(n)))}destroy(){this.sharedStylesHost&&this.sharedStylesHost.removeHost(this.shadowRoot)}},ms=class extends fs{sharedStylesHost;removeStylesOnCompDestroy;styles;styleUrls;constructor(n,e,i,r,o,a,s,l){super(n,o,a,s),this.sharedStylesHost=e,this.removeStylesOnCompDestroy=r;let d=i.styles;this.styles=l?n0(l,d):d,this.styleUrls=i.getExternalStyles?.(l)}applyStyles(){this.sharedStylesHost.addStyles(this.styles,this.styleUrls)}destroy(){this.removeStylesOnCompDestroy&&wr.size===0&&this.sharedStylesHost.removeStyles(this.styles,this.styleUrls)}},td=class extends ms{contentAttr;hostAttr;constructor(n,e,i,r,o,a,s,l){let d=r+"-"+i.id;super(n,e,i,o,a,s,l,d),this.contentAttr=Ik(d),this.hostAttr=Sk(d)}applyToHost(n){this.applyStyles(),this.setAttribute(n,this.hostAttr,"")}createElement(n,e){let i=super.createElement(n,e);return super.setAttribute(i,this.contentAttr,""),i}};var id=class t extends ls{supportsDOMEvents=!0;static makeCurrent(){Vp(new t)}onAndCancel(n,e,i,r){return n.addEventListener(e,i,r),()=>{n.removeEventListener(e,i,r)}}dispatchEvent(n,e){n.dispatchEvent(e)}remove(n){n.remove()}createElement(n,e){return e=e||this.getDefaultDocument(),e.createElement(n)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(n){return n.nodeType===Node.ELEMENT_NODE}isShadowRoot(n){return n instanceof DocumentFragment}getGlobalEventTarget(n,e){return e==="window"?window:e==="document"?n:e==="body"?n.body:null}getBaseHref(n){let e=kk();return e==null?null:Tk(e)}resetBaseElement(){ps=null}getUserAgent(){return window.navigator.userAgent}getCookie(n){return ds(document.cookie,n)}},ps=null;function kk(){return ps=ps||document.head.querySelector("base"),ps?ps.getAttribute("href"):null}function Tk(t){return new URL(t,document.baseURI).pathname}var Ak=(()=>{class t{build(){return new XMLHttpRequest}static \u0275fac=function(i){return new(i||t)};static \u0275prov=D({token:t,factory:t.\u0275fac})}return t})(),i0=["alt","control","meta","shift"],Rk={"\b":"Backspace","	":"Tab","\x7F":"Delete","\x1B":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},Ok={alt:t=>t.altKey,control:t=>t.ctrlKey,meta:t=>t.metaKey,shift:t=>t.shiftKey},r0=(()=>{class t extends us{constructor(e){super(e)}supports(e){return t.parseEventName(e)!=null}addEventListener(e,i,r,o){let a=t.parseEventName(i),s=t.eventCallback(a.fullKey,r,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>en().onAndCancel(e,a.domEventName,s,o))}static parseEventName(e){let i=e.toLowerCase().split("."),r=i.shift();if(i.length===0||!(r==="keydown"||r==="keyup"))return null;let o=t._normalizeKey(i.pop()),a="",s=i.indexOf("code");if(s>-1&&(i.splice(s,1),a="code."),i0.forEach(d=>{let u=i.indexOf(d);u>-1&&(i.splice(u,1),a+=d+".")}),a+=o,i.length!=0||o.length===0)return null;let l={};return l.domEventName=r,l.fullKey=a,l}static matchEventFullKeyCode(e,i){let r=Rk[e.key]||e.key,o="";return i.indexOf("code.")>-1&&(r=e.code,o="code."),r==null||!r?!1:(r=r.toLowerCase(),r===" "?r="space":r==="."&&(r="dot"),i0.forEach(a=>{if(a!==r){let s=Ok[a];s(e)&&(o+=a+".")}}),o+=r,o===i)}static eventCallback(e,i,r){return o=>{t.matchEventFullKeyCode(o,e)&&r.runGuarded(()=>i(o))}}static _normalizeKey(e){return e==="esc"?"escape":e}static \u0275fac=function(i){return new(i||t)(V(K))};static \u0275prov=D({token:t,factory:t.\u0275fac})}return t})();async function Yp(t,n,e){let i=I({rootComponent:t},Nk(n,e));return zy(i)}function Nk(t,n){return{platformRef:n?.platformRef,appProviders:[...Bk,...t?.providers??[]],platformProviders:Vk}}function Fk(){id.makeCurrent()}function Pk(){return new ht}function Lk(){return Gm(document),document}var Vk=[{provide:Mr,useValue:Bp},{provide:Tc,useValue:Fk,multi:!0},{provide:K,useFactory:Lk}];var Bk=[{provide:ka,useValue:"root"},{provide:ht,useFactory:Pk},{provide:nd,useClass:Jc,multi:!0},{provide:nd,useClass:r0,multi:!0},Gp,$p,zp,{provide:Ke,useExisting:Gp},{provide:Tr,useClass:Ak},[]];var Ni=class t{headers;normalizedNames=new Map;lazyInit;lazyUpdate=null;constructor(n){n?typeof n=="string"?this.lazyInit=()=>{this.headers=new Map,n.split(`
`).forEach(e=>{let i=e.indexOf(":");if(i>0){let r=e.slice(0,i),o=e.slice(i+1).trim();this.addHeaderEntry(r,o)}})}:typeof Headers<"u"&&n instanceof Headers?(this.headers=new Map,n.forEach((e,i)=>{this.addHeaderEntry(i,e)})):this.lazyInit=()=>{this.headers=new Map,Object.entries(n).forEach(([e,i])=>{this.setHeaderEntries(e,i)})}:this.headers=new Map}has(n){return this.init(),this.headers.has(n.toLowerCase())}get(n){this.init();let e=this.headers.get(n.toLowerCase());return e&&e.length>0?e[0]:null}keys(){return this.init(),Array.from(this.normalizedNames.values())}getAll(n){return this.init(),this.headers.get(n.toLowerCase())||null}append(n,e){return this.clone({name:n,value:e,op:"a"})}set(n,e){return this.clone({name:n,value:e,op:"s"})}delete(n,e){return this.clone({name:n,value:e,op:"d"})}maybeSetNormalizedName(n,e){this.normalizedNames.has(e)||this.normalizedNames.set(e,n)}init(){this.lazyInit&&(this.lazyInit instanceof t?this.copyFrom(this.lazyInit):this.lazyInit(),this.lazyInit=null,this.lazyUpdate&&(this.lazyUpdate.forEach(n=>this.applyUpdate(n)),this.lazyUpdate=null))}copyFrom(n){n.init(),Array.from(n.headers.keys()).forEach(e=>{this.headers.set(e,n.headers.get(e)),this.normalizedNames.set(e,n.normalizedNames.get(e))})}clone(n){let e=new t;return e.lazyInit=this.lazyInit&&this.lazyInit instanceof t?this.lazyInit:this,e.lazyUpdate=(this.lazyUpdate||[]).concat([n]),e}applyUpdate(n){let e=n.name.toLowerCase();switch(n.op){case"a":case"s":let i=n.value;if(typeof i=="string"&&(i=[i]),i.length===0)return;this.maybeSetNormalizedName(n.name,e);let r=(n.op==="a"?this.headers.get(e):void 0)||[];r.push(...i),this.headers.set(e,r);break;case"d":let o=n.value;if(!o)this.headers.delete(e),this.normalizedNames.delete(e);else{let a=this.headers.get(e);if(!a)return;a=a.filter(s=>o.indexOf(s)===-1),a.length===0?(this.headers.delete(e),this.normalizedNames.delete(e)):this.headers.set(e,a)}break}}addHeaderEntry(n,e){let i=n.toLowerCase();this.maybeSetNormalizedName(n,i),this.headers.has(i)?this.headers.get(i).push(e):this.headers.set(i,[e])}setHeaderEntries(n,e){let i=(Array.isArray(e)?e:[e]).map(o=>o.toString()),r=n.toLowerCase();this.headers.set(r,i),this.maybeSetNormalizedName(n,r)}forEach(n){this.init(),Array.from(this.normalizedNames.keys()).forEach(e=>n(this.normalizedNames.get(e),this.headers.get(e)))}};var od=class{map=new Map;set(n,e){return this.map.set(n,e),this}get(n){return this.map.has(n)||this.map.set(n,n.defaultValue()),this.map.get(n)}delete(n){return this.map.delete(n),this}has(n){return this.map.has(n)}keys(){return this.map.keys()}},ad=class{encodeKey(n){return o0(n)}encodeValue(n){return o0(n)}decodeKey(n){return decodeURIComponent(n)}decodeValue(n){return decodeURIComponent(n)}};function jk(t,n){let e=new Map;return t.length>0&&t.replace(/^\?/,"").split("&").forEach(r=>{let o=r.indexOf("="),[a,s]=o==-1?[n.decodeKey(r),""]:[n.decodeKey(r.slice(0,o)),n.decodeValue(r.slice(o+1))],l=e.get(a)||[];l.push(s),e.set(a,l)}),e}var Hk=/%(\d[a-f0-9])/gi,Uk={40:"@","3A":":",24:"$","2C":",","3B":";","3D":"=","3F":"?","2F":"/"};function o0(t){return encodeURIComponent(t).replace(Hk,(n,e)=>Uk[e]??n)}function rd(t){return`${t}`}var oi=class t{map;encoder;updates=null;cloneFrom=null;constructor(n={}){if(this.encoder=n.encoder||new ad,n.fromString){if(n.fromObject)throw new X(2805,!1);this.map=jk(n.fromString,this.encoder)}else n.fromObject?(this.map=new Map,Object.keys(n.fromObject).forEach(e=>{let i=n.fromObject[e],r=Array.isArray(i)?i.map(rd):[rd(i)];this.map.set(e,r)})):this.map=null}has(n){return this.init(),this.map.has(n)}get(n){this.init();let e=this.map.get(n);return e?e[0]:null}getAll(n){return this.init(),this.map.get(n)||null}keys(){return this.init(),Array.from(this.map.keys())}append(n,e){return this.clone({param:n,value:e,op:"a"})}appendAll(n){let e=[];return Object.keys(n).forEach(i=>{let r=n[i];Array.isArray(r)?r.forEach(o=>{e.push({param:i,value:o,op:"a"})}):e.push({param:i,value:r,op:"a"})}),this.clone(e)}set(n,e){return this.clone({param:n,value:e,op:"s"})}delete(n,e){return this.clone({param:n,value:e,op:"d"})}toString(){return this.init(),this.keys().map(n=>{let e=this.encoder.encodeKey(n);return this.map.get(n).map(i=>e+"="+this.encoder.encodeValue(i)).join("&")}).filter(n=>n!=="").join("&")}clone(n){let e=new t({encoder:this.encoder});return e.cloneFrom=this.cloneFrom||this,e.updates=(this.updates||[]).concat(n),e}init(){this.map===null&&(this.map=new Map),this.cloneFrom!==null&&(this.cloneFrom.init(),this.cloneFrom.keys().forEach(n=>this.map.set(n,this.cloneFrom.map.get(n))),this.updates.forEach(n=>{switch(n.op){case"a":case"s":let e=(n.op==="a"?this.map.get(n.param):void 0)||[];e.push(rd(n.value)),this.map.set(n.param,e);break;case"d":if(n.value!==void 0){let i=this.map.get(n.param)||[],r=i.indexOf(rd(n.value));r!==-1&&i.splice(r,1),i.length>0?this.map.set(n.param,i):this.map.delete(n.param)}else{this.map.delete(n.param);break}}}),this.cloneFrom=this.updates=null)}};function zk(t){switch(t){case"DELETE":case"GET":case"HEAD":case"OPTIONS":case"JSONP":return!1;default:return!0}}function a0(t){return typeof ArrayBuffer<"u"&&t instanceof ArrayBuffer}function s0(t){return typeof Blob<"u"&&t instanceof Blob}function l0(t){return typeof FormData<"u"&&t instanceof FormData}function $k(t){return typeof URLSearchParams<"u"&&t instanceof URLSearchParams}var c0="Content-Type",d0="Accept",u0="text/plain",f0="application/json",Wk=`${f0}, ${u0}, */*`,Ao=class t{url;body=null;headers;context;reportProgress=!1;withCredentials=!1;credentials;keepalive=!1;cache;priority;mode;redirect;referrer;integrity;referrerPolicy;responseType="json";method;params;urlWithParams;transferCache;timeout;constructor(n,e,i,r){this.url=e,this.method=n.toUpperCase();let o;if(zk(this.method)||r?(this.body=i!==void 0?i:null,o=r):o=i,o){if(this.reportProgress=!!o.reportProgress,this.withCredentials=!!o.withCredentials,this.keepalive=!!o.keepalive,o.responseType&&(this.responseType=o.responseType),o.headers&&(this.headers=o.headers),o.context&&(this.context=o.context),o.params&&(this.params=o.params),o.priority&&(this.priority=o.priority),o.cache&&(this.cache=o.cache),o.credentials&&(this.credentials=o.credentials),typeof o.timeout=="number"){if(o.timeout<1||!Number.isInteger(o.timeout))throw new X(2822,"");this.timeout=o.timeout}o.mode&&(this.mode=o.mode),o.redirect&&(this.redirect=o.redirect),o.integrity&&(this.integrity=o.integrity),o.referrer&&(this.referrer=o.referrer),o.referrerPolicy&&(this.referrerPolicy=o.referrerPolicy),this.transferCache=o.transferCache}if(this.headers??=new Ni,this.context??=new od,!this.params)this.params=new oi,this.urlWithParams=e;else{let a=this.params.toString();if(a.length===0)this.urlWithParams=e;else{let s=e.indexOf("?"),l=s===-1?"?":s<e.length-1?"&":"";this.urlWithParams=e+l+a}}}serializeBody(){return this.body===null?null:typeof this.body=="string"||a0(this.body)||s0(this.body)||l0(this.body)||$k(this.body)?this.body:this.body instanceof oi?this.body.toString():typeof this.body=="object"||typeof this.body=="boolean"||Array.isArray(this.body)?JSON.stringify(this.body):this.body.toString()}detectContentTypeHeader(){return this.body===null||l0(this.body)?null:s0(this.body)?this.body.type||null:a0(this.body)?null:typeof this.body=="string"?u0:this.body instanceof oi?"application/x-www-form-urlencoded;charset=UTF-8":typeof this.body=="object"||typeof this.body=="number"||typeof this.body=="boolean"?f0:null}clone(n={}){let e=n.method||this.method,i=n.url||this.url,r=n.responseType||this.responseType,o=n.keepalive??this.keepalive,a=n.priority||this.priority,s=n.cache||this.cache,l=n.mode||this.mode,d=n.redirect||this.redirect,u=n.credentials||this.credentials,f=n.referrer||this.referrer,_=n.integrity||this.integrity,g=n.referrerPolicy||this.referrerPolicy,C=n.transferCache??this.transferCache,F=n.timeout??this.timeout,z=n.body!==void 0?n.body:this.body,Q=n.withCredentials??this.withCredentials,Le=n.reportProgress??this.reportProgress,Ot=n.headers||this.headers,ot=n.params||this.params,la=n.context??this.context;return n.setHeaders!==void 0&&(Ot=Object.keys(n.setHeaders).reduce((ca,Gi)=>ca.set(Gi,n.setHeaders[Gi]),Ot)),n.setParams&&(ot=Object.keys(n.setParams).reduce((ca,Gi)=>ca.set(Gi,n.setParams[Gi]),ot)),new t(e,i,z,{params:ot,headers:Ot,context:la,reportProgress:Le,responseType:r,withCredentials:Q,transferCache:C,keepalive:o,cache:s,priority:a,timeout:F,mode:l,redirect:d,credentials:u,referrer:f,integrity:_,referrerPolicy:g})}},Ar=(function(t){return t[t.Sent=0]="Sent",t[t.UploadProgress=1]="UploadProgress",t[t.ResponseHeader=2]="ResponseHeader",t[t.DownloadProgress=3]="DownloadProgress",t[t.Response=4]="Response",t[t.User=5]="User",t})(Ar||{}),Oo=class{headers;status;statusText;url;ok;type;redirected;responseType;constructor(n,e=200,i="OK"){this.headers=n.headers||new Ni,this.status=n.status!==void 0?n.status:e,this.statusText=n.statusText||i,this.url=n.url||null,this.redirected=n.redirected,this.responseType=n.responseType,this.ok=this.status>=200&&this.status<300}},sd=class t extends Oo{constructor(n={}){super(n)}type=Ar.ResponseHeader;clone(n={}){return new t({headers:n.headers||this.headers,status:n.status!==void 0?n.status:this.status,statusText:n.statusText||this.statusText,url:n.url||this.url||void 0})}},hs=class t extends Oo{body;constructor(n={}){super(n),this.body=n.body!==void 0?n.body:null}type=Ar.Response;clone(n={}){return new t({body:n.body!==void 0?n.body:this.body,headers:n.headers||this.headers,status:n.status!==void 0?n.status:this.status,statusText:n.statusText||this.statusText,url:n.url||this.url||void 0,redirected:n.redirected??this.redirected,responseType:n.responseType??this.responseType})}},Ro=class extends Oo{name="HttpErrorResponse";message;error;ok=!1;constructor(n){super(n,0,"Unknown Error"),this.status>=200&&this.status<300?this.message=`Http failure during parsing for ${n.url||"(unknown url)"}`:this.message=`Http failure response for ${n.url||"(unknown url)"}: ${n.status} ${n.statusText}`,this.error=n.error||null}},Gk=200,Yk=204;var qk=new y("");var Zk=/^\)\]\}',?\n/;var Zp=(()=>{class t{xhrFactory;tracingService=c(wn,{optional:!0});constructor(e){this.xhrFactory=e}maybePropagateTrace(e){return this.tracingService?.propagate?this.tracingService.propagate(e):e}handle(e){if(e.method==="JSONP")throw new X(-2800,!1);let i=this.xhrFactory;return He(null).pipe(Ln(()=>new ue(o=>{let a=i.build();if(a.open(e.method,e.urlWithParams),e.withCredentials&&(a.withCredentials=!0),e.headers.forEach((z,Q)=>a.setRequestHeader(z,Q.join(","))),e.headers.has(d0)||a.setRequestHeader(d0,Wk),!e.headers.has(c0)){let z=e.detectContentTypeHeader();z!==null&&a.setRequestHeader(c0,z)}if(e.timeout&&(a.timeout=e.timeout),e.responseType){let z=e.responseType.toLowerCase();a.responseType=z!=="json"?z:"text"}let s=e.serializeBody(),l=null,d=()=>{if(l!==null)return l;let z=a.statusText||"OK",Q=new Ni(a.getAllResponseHeaders()),Le=a.responseURL||e.url;return l=new sd({headers:Q,status:a.status,statusText:z,url:Le}),l},u=this.maybePropagateTrace(()=>{let{headers:z,status:Q,statusText:Le,url:Ot}=d(),ot=null;Q!==Yk&&(ot=typeof a.response>"u"?a.responseText:a.response),Q===0&&(Q=ot?Gk:0);let la=Q>=200&&Q<300;if(e.responseType==="json"&&typeof ot=="string"){let ca=ot;ot=ot.replace(Zk,"");try{ot=ot!==""?JSON.parse(ot):null}catch(Gi){ot=ca,la&&(la=!1,ot={error:Gi,text:ot})}}la?(o.next(new hs({body:ot,headers:z,status:Q,statusText:Le,url:Ot||void 0})),o.complete()):o.error(new Ro({error:ot,headers:z,status:Q,statusText:Le,url:Ot||void 0}))}),f=this.maybePropagateTrace(z=>{let{url:Q}=d(),Le=new Ro({error:z,status:a.status||0,statusText:a.statusText||"Unknown Error",url:Q||void 0});o.error(Le)}),_=f;e.timeout&&(_=this.maybePropagateTrace(z=>{let{url:Q}=d(),Le=new Ro({error:new DOMException("Request timed out","TimeoutError"),status:a.status||0,statusText:a.statusText||"Request timeout",url:Q||void 0});o.error(Le)}));let g=!1,C=this.maybePropagateTrace(z=>{g||(o.next(d()),g=!0);let Q={type:Ar.DownloadProgress,loaded:z.loaded};z.lengthComputable&&(Q.total=z.total),e.responseType==="text"&&a.responseText&&(Q.partialText=a.responseText),o.next(Q)}),F=this.maybePropagateTrace(z=>{let Q={type:Ar.UploadProgress,loaded:z.loaded};z.lengthComputable&&(Q.total=z.total),o.next(Q)});return a.addEventListener("load",u),a.addEventListener("error",f),a.addEventListener("timeout",_),a.addEventListener("abort",f),e.reportProgress&&(a.addEventListener("progress",C),s!==null&&a.upload&&a.upload.addEventListener("progress",F)),a.send(s),o.next({type:Ar.Sent}),()=>{a.removeEventListener("error",f),a.removeEventListener("abort",f),a.removeEventListener("load",u),a.removeEventListener("timeout",_),e.reportProgress&&(a.removeEventListener("progress",C),s!==null&&a.upload&&a.upload.removeEventListener("progress",F)),a.readyState!==a.DONE&&a.abort()}})))}static \u0275fac=function(i){return new(i||t)(V(Tr))};static \u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function Kk(t,n){return n(t)}function Qk(t,n,e){return(i,r)=>so(e,()=>n(i,o=>t(o,r)))}var m0=new y("",{factory:()=>[]}),p0=new y(""),h0=new y("",{factory:()=>!0});var Kp=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275prov=D({token:t,factory:function(i){let r=null;return i?r=new(i||t):r=V(Zp),r},providedIn:"root"})}return t})();var ld=(()=>{class t{backend;injector;chain=null;pendingTasks=c(Pa);contributeToStability=c(h0);constructor(e,i){this.backend=e,this.injector=i}handle(e){if(this.chain===null){let i=Array.from(new Set([...this.injector.get(m0),...this.injector.get(p0,[])]));this.chain=i.reduceRight((r,o)=>Qk(r,o,this.injector),Kk)}if(this.contributeToStability){let i=this.pendingTasks.add();return this.chain(e,r=>this.backend.handle(r)).pipe(va(i))}else return this.chain(e,i=>this.backend.handle(i))}static \u0275fac=function(i){return new(i||t)(V(Kp),V(Ge))};static \u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),Qp=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275prov=D({token:t,factory:function(i){let r=null;return i?r=new(i||t):r=V(ld),r},providedIn:"root"})}return t})();function qp(t,n){return{body:n,headers:t.headers,context:t.context,observe:t.observe,params:t.params,reportProgress:t.reportProgress,responseType:t.responseType,withCredentials:t.withCredentials,credentials:t.credentials,transferCache:t.transferCache,timeout:t.timeout,keepalive:t.keepalive,priority:t.priority,cache:t.cache,mode:t.mode,redirect:t.redirect,integrity:t.integrity,referrer:t.referrer,referrerPolicy:t.referrerPolicy}}var at=(()=>{class t{handler;constructor(e){this.handler=e}request(e,i,r={}){let o;if(e instanceof Ao)o=e;else{let l;r.headers instanceof Ni?l=r.headers:l=new Ni(r.headers);let d;r.params&&(r.params instanceof oi?d=r.params:d=new oi({fromObject:r.params})),o=new Ao(e,i,r.body!==void 0?r.body:null,{headers:l,context:r.context,params:d,reportProgress:r.reportProgress,responseType:r.responseType||"json",withCredentials:r.withCredentials,transferCache:r.transferCache,keepalive:r.keepalive,priority:r.priority,cache:r.cache,mode:r.mode,redirect:r.redirect,credentials:r.credentials,referrer:r.referrer,referrerPolicy:r.referrerPolicy,integrity:r.integrity,timeout:r.timeout})}let a=He(o).pipe(Hu(l=>this.handler.handle(l)));if(e instanceof Ao||r.observe==="events")return a;let s=a.pipe(Ne(l=>l instanceof hs));switch(r.observe||"body"){case"body":switch(o.responseType){case"arraybuffer":return s.pipe(Ce(l=>{if(l.body!==null&&!(l.body instanceof ArrayBuffer))throw new X(2806,!1);return l.body}));case"blob":return s.pipe(Ce(l=>{if(l.body!==null&&!(l.body instanceof Blob))throw new X(2807,!1);return l.body}));case"text":return s.pipe(Ce(l=>{if(l.body!==null&&typeof l.body!="string")throw new X(2808,!1);return l.body}));default:return s.pipe(Ce(l=>l.body))}case"response":return s;default:throw new X(2809,!1)}}delete(e,i={}){return this.request("DELETE",e,i)}get(e,i={}){return this.request("GET",e,i)}head(e,i={}){return this.request("HEAD",e,i)}jsonp(e,i){return this.request("JSONP",e,{params:new oi().append(i,"JSONP_CALLBACK"),observe:"body",responseType:"json"})}options(e,i={}){return this.request("OPTIONS",e,i)}patch(e,i,r={}){return this.request("PATCH",e,qp(r,i))}post(e,i,r={}){return this.request("POST",e,qp(r,i))}put(e,i,r={}){return this.request("PUT",e,qp(r,i))}static \u0275fac=function(i){return new(i||t)(V(Qp))};static \u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Xk=new y("",{factory:()=>!0}),Jk="XSRF-TOKEN",eT=new y("",{factory:()=>Jk}),tT="X-XSRF-TOKEN",nT=new y("",{factory:()=>tT}),iT=(()=>{class t{cookieName=c(eT);doc=c(K);lastCookieString="";lastToken=null;parseCount=0;getToken(){let e=this.doc.cookie||"";return e!==this.lastCookieString&&(this.parseCount++,this.lastToken=ds(e,this.cookieName),this.lastCookieString=e),this.lastToken}static \u0275fac=function(i){return new(i||t)};static \u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),g0=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275prov=D({token:t,factory:function(i){let r=null;return i?r=new(i||t):r=V(iT),r},providedIn:"root"})}return t})();function rT(t,n){if(!c(Xk)||t.method==="GET"||t.method==="HEAD")return n(t);try{let r=c(To).href,{origin:o}=new URL(r),{origin:a}=new URL(t.url,o);if(o!==a)return n(t)}catch{return n(t)}let e=c(g0).getToken(),i=c(nT);return e!=null&&!t.headers.has(i)&&(t=t.clone({headers:t.headers.set(i,e)})),n(t)}function Xp(...t){let n=[at,ld,{provide:Qp,useExisting:ld},{provide:Kp,useFactory:()=>c(qk,{optional:!0})??c(Zp)},{provide:m0,useValue:rT,multi:!0}];for(let e of t)n.push(...e.\u0275providers);return mr(n)}var Or=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275prov=D({token:t,factory:function(i){let r=null;return i?r=new(i||t):r=V(oT),r},providedIn:"root"})}return t})(),oT=(()=>{class t extends Or{_doc;constructor(e){super(),this._doc=e}sanitize(e,i){if(i==null)return null;switch(e){case nt.NONE:return i;case nt.HTML:return ii(i,"HTML")?xn(i):Oc(this._doc,String(i)).toString();case nt.STYLE:return ii(i,"Style")?xn(i):i;case nt.SCRIPT:if(ii(i,"Script"))return xn(i);throw new X(5200,!1);case nt.URL:return ii(i,"URL")?xn(i):qa(String(i));case nt.RESOURCE_URL:if(ii(i,"ResourceURL"))return xn(i);throw new X(5201,!1);default:throw new X(5202,!1)}}bypassSecurityTrustHtml(e){return qm(e)}bypassSecurityTrustStyle(e){return Zm(e)}bypassSecurityTrustScript(e){return Km(e)}bypassSecurityTrustUrl(e){return Qm(e)}bypassSecurityTrustResourceUrl(e){return Xm(e)}static \u0275fac=function(i){return new(i||t)(V(K))};static \u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var b0={providers:[Wf(),Xp()]};function Nr(t){return t.buttons===0||t.detail===0}function Fr(t){let n=t.touches&&t.touches[0]||t.changedTouches&&t.changedTouches[0];return!!n&&n.identifier===-1&&(n.radiusX==null||n.radiusX===1)&&(n.radiusY==null||n.radiusY===1)}var Jp;function v0(){if(Jp==null){let t=typeof document<"u"?document.head:null;Jp=!!(t&&(t.createShadowRoot||t.attachShadow))}return Jp}function eh(t){if(v0()){let n=t.getRootNode?t.getRootNode():null;if(typeof ShadowRoot<"u"&&ShadowRoot&&n instanceof ShadowRoot)return n}return null}function ai(){let t=typeof document<"u"&&document?document.activeElement:null;for(;t&&t.shadowRoot;){let n=t.shadowRoot.activeElement;if(n===t)break;t=n}return t}function dt(t){return t.composedPath?t.composedPath()[0]:t.target}var th;try{th=typeof Intl<"u"&&Intl.v8BreakIterator}catch{th=!1}var pe=(()=>{class t{_platformId=c(Mr);isBrowser=this._platformId?Qy(this._platformId):typeof document=="object"&&!!document;EDGE=this.isBrowser&&/(edge)/i.test(navigator.userAgent);TRIDENT=this.isBrowser&&/(msie|trident)/i.test(navigator.userAgent);BLINK=this.isBrowser&&!!(window.chrome||th)&&typeof CSS<"u"&&!this.EDGE&&!this.TRIDENT;WEBKIT=this.isBrowser&&/AppleWebKit/i.test(navigator.userAgent)&&!this.BLINK&&!this.EDGE&&!this.TRIDENT;IOS=this.isBrowser&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!("MSStream"in window);FIREFOX=this.isBrowser&&/(firefox|minefield)/i.test(navigator.userAgent);ANDROID=this.isBrowser&&/android/i.test(navigator.userAgent)&&!this.TRIDENT;SAFARI=this.isBrowser&&/safari/i.test(navigator.userAgent)&&this.WEBKIT;constructor(){}static \u0275fac=function(i){return new(i||t)};static \u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var gs;function y0(){if(gs==null&&typeof window<"u")try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:()=>gs=!0}))}finally{gs=gs||!1}return gs}function No(t){return y0()?t:!!t.capture}function si(t,n=0){return C0(t)?Number(t):arguments.length===2?n:0}function C0(t){return!isNaN(parseFloat(t))&&!isNaN(Number(t))}function Bt(t){return t instanceof L?t.nativeElement:t}var D0=new y("cdk-input-modality-detector-options"),x0={ignoreKeys:[18,17,224,91,16]},w0=650,nh={passive:!0,capture:!0},E0=(()=>{class t{_platform=c(pe);_listenerCleanups;modalityDetected;modalityChanged;get mostRecentModality(){return this._modality.value}_mostRecentTarget=null;_modality=new Ji(null);_options;_lastTouchMs=0;_onKeydown=e=>{this._options?.ignoreKeys?.some(i=>i===e.keyCode)||(this._modality.next("keyboard"),this._mostRecentTarget=dt(e))};_onMousedown=e=>{Date.now()-this._lastTouchMs<w0||(this._modality.next(Nr(e)?"keyboard":"mouse"),this._mostRecentTarget=dt(e))};_onTouchstart=e=>{if(Fr(e)){this._modality.next("keyboard");return}this._lastTouchMs=Date.now(),this._modality.next("touch"),this._mostRecentTarget=dt(e)};constructor(){let e=c(P),i=c(K),r=c(D0,{optional:!0});if(this._options=I(I({},x0),r),this.modalityDetected=this._modality.pipe(Ca(1)),this.modalityChanged=this.modalityDetected.pipe(Tl()),this._platform.isBrowser){let o=c(Ke).createRenderer(null,null);this._listenerCleanups=e.runOutsideAngular(()=>[o.listen(i,"keydown",this._onKeydown,nh),o.listen(i,"mousedown",this._onMousedown,nh),o.listen(i,"touchstart",this._onTouchstart,nh)])}}ngOnDestroy(){this._modality.complete(),this._listenerCleanups?.forEach(e=>e())}static \u0275fac=function(i){return new(i||t)};static \u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),_s=(function(t){return t[t.IMMEDIATE=0]="IMMEDIATE",t[t.EVENTUAL=1]="EVENTUAL",t})(_s||{}),M0=new y("cdk-focus-monitor-default-options"),cd=No({passive:!0,capture:!0}),jt=(()=>{class t{_ngZone=c(P);_platform=c(pe);_inputModalityDetector=c(E0);_origin=null;_lastFocusOrigin=null;_windowFocused=!1;_windowFocusTimeoutId;_originTimeoutId;_originFromTouchInteraction=!1;_elementInfo=new Map;_monitoredElementCount=0;_rootNodeFocusListenerCount=new Map;_detectionMode;_windowFocusListener=()=>{this._windowFocused=!0,this._windowFocusTimeoutId=setTimeout(()=>this._windowFocused=!1)};_document=c(K);_stopInputModalityDetector=new M;constructor(){let e=c(M0,{optional:!0});this._detectionMode=e?.detectionMode||_s.IMMEDIATE}_rootNodeFocusAndBlurListener=e=>{let i=dt(e);for(let r=i;r;r=r.parentElement)e.type==="focus"?this._onFocus(e,r):this._onBlur(e,r)};monitor(e,i=!1){let r=Bt(e);if(!this._platform.isBrowser||r.nodeType!==1)return He();let o=eh(r)||this._document,a=this._elementInfo.get(r);if(a)return i&&(a.checkChildren=!0),a.subject;let s={checkChildren:i,subject:new M,rootNode:o};return this._elementInfo.set(r,s),this._registerGlobalListeners(s),s.subject}stopMonitoring(e){let i=Bt(e),r=this._elementInfo.get(i);r&&(r.subject.complete(),this._setClasses(i),this._elementInfo.delete(i),this._removeGlobalListeners(r))}focusVia(e,i,r){let o=Bt(e),a=this._document.activeElement;o===a?this._getClosestElementsInfo(o).forEach(([s,l])=>this._originChanged(s,i,l)):(this._setOrigin(i),typeof o.focus=="function"&&o.focus(r))}ngOnDestroy(){this._elementInfo.forEach((e,i)=>this.stopMonitoring(i))}_getWindow(){return this._document.defaultView||window}_getFocusOrigin(e){return this._origin?this._originFromTouchInteraction?this._shouldBeAttributedToTouch(e)?"touch":"program":this._origin:this._windowFocused&&this._lastFocusOrigin?this._lastFocusOrigin:e&&this._isLastInteractionFromInputLabel(e)?"mouse":"program"}_shouldBeAttributedToTouch(e){return this._detectionMode===_s.EVENTUAL||!!e?.contains(this._inputModalityDetector._mostRecentTarget)}_setClasses(e,i){e.classList.toggle("cdk-focused",!!i),e.classList.toggle("cdk-touch-focused",i==="touch"),e.classList.toggle("cdk-keyboard-focused",i==="keyboard"),e.classList.toggle("cdk-mouse-focused",i==="mouse"),e.classList.toggle("cdk-program-focused",i==="program")}_setOrigin(e,i=!1){this._ngZone.runOutsideAngular(()=>{if(this._origin=e,this._originFromTouchInteraction=e==="touch"&&i,this._detectionMode===_s.IMMEDIATE){clearTimeout(this._originTimeoutId);let r=this._originFromTouchInteraction?w0:1;this._originTimeoutId=setTimeout(()=>this._origin=null,r)}})}_onFocus(e,i){let r=this._elementInfo.get(i),o=dt(e);!r||!r.checkChildren&&i!==o||this._originChanged(i,this._getFocusOrigin(o),r)}_onBlur(e,i){let r=this._elementInfo.get(i);!r||r.checkChildren&&e.relatedTarget instanceof Node&&i.contains(e.relatedTarget)||(this._setClasses(i),this._emitOrigin(r,null))}_emitOrigin(e,i){e.subject.observers.length&&this._ngZone.run(()=>e.subject.next(i))}_registerGlobalListeners(e){if(!this._platform.isBrowser)return;let i=e.rootNode,r=this._rootNodeFocusListenerCount.get(i)||0;r||this._ngZone.runOutsideAngular(()=>{i.addEventListener("focus",this._rootNodeFocusAndBlurListener,cd),i.addEventListener("blur",this._rootNodeFocusAndBlurListener,cd)}),this._rootNodeFocusListenerCount.set(i,r+1),++this._monitoredElementCount===1&&(this._ngZone.runOutsideAngular(()=>{this._getWindow().addEventListener("focus",this._windowFocusListener)}),this._inputModalityDetector.modalityDetected.pipe(Ee(this._stopInputModalityDetector)).subscribe(o=>{this._setOrigin(o,!0)}))}_removeGlobalListeners(e){let i=e.rootNode;if(this._rootNodeFocusListenerCount.has(i)){let r=this._rootNodeFocusListenerCount.get(i);r>1?this._rootNodeFocusListenerCount.set(i,r-1):(i.removeEventListener("focus",this._rootNodeFocusAndBlurListener,cd),i.removeEventListener("blur",this._rootNodeFocusAndBlurListener,cd),this._rootNodeFocusListenerCount.delete(i))}--this._monitoredElementCount||(this._getWindow().removeEventListener("focus",this._windowFocusListener),this._stopInputModalityDetector.next(),clearTimeout(this._windowFocusTimeoutId),clearTimeout(this._originTimeoutId))}_originChanged(e,i,r){this._setClasses(e,i),this._emitOrigin(r,i),this._lastFocusOrigin=i}_getClosestElementsInfo(e){let i=[];return this._elementInfo.forEach((r,o)=>{(o===e||r.checkChildren&&o.contains(e))&&i.push([o,r])}),i}_isLastInteractionFromInputLabel(e){let{_mostRecentTarget:i,mostRecentModality:r}=this._inputModalityDetector;if(r!=="mouse"||!i||i===e||e.nodeName!=="INPUT"&&e.nodeName!=="TEXTAREA"||e.disabled)return!1;let o=e.labels;if(o){for(let a=0;a<o.length;a++)if(o[a].contains(i))return!0}return!1}static \u0275fac=function(i){return new(i||t)};static \u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),ih=(()=>{class t{_elementRef=c(L);_focusMonitor=c(jt);_monitorSubscription;_focusOrigin=null;cdkFocusChange=new S;constructor(){}get focusOrigin(){return this._focusOrigin}ngAfterViewInit(){let e=this._elementRef.nativeElement;this._monitorSubscription=this._focusMonitor.monitor(e,e.nodeType===1&&e.hasAttribute("cdkMonitorSubtreeFocus")).subscribe(i=>{this._focusOrigin=i,this.cdkFocusChange.emit(i)})}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef),this._monitorSubscription?.unsubscribe()}static \u0275fac=function(i){return new(i||t)};static \u0275dir=$({type:t,selectors:[["","cdkMonitorElementFocus",""],["","cdkMonitorSubtreeFocus",""]],outputs:{cdkFocusChange:"cdkFocusChange"},exportAs:["cdkMonitorFocus"]})}return t})();var dd=new WeakMap,Oe=(()=>{class t{_appRef;_injector=c(Y);_environmentInjector=c(Ge);load(e){let i=this._appRef=this._appRef||this._injector.get(Zt),r=dd.get(i);r||(r={loaders:new Set,refs:[]},dd.set(i,r),i.onDestroy(()=>{dd.get(i)?.refs.forEach(o=>o.destroy()),dd.delete(i)})),r.loaders.has(e)||(r.loaders.add(e),r.refs.push(Kc(e,{environmentInjector:this._environmentInjector})))}static \u0275fac=function(i){return new(i||t)};static \u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Wn=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275cmp=R({type:t,selectors:[["ng-component"]],exportAs:["cdkVisuallyHidden"],decls:0,vars:0,template:function(i,r){},styles:[`.cdk-visually-hidden {
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
`],encapsulation:2,changeDetection:0})}return t})(),ud;function aT(){if(ud===void 0&&(ud=null,typeof window<"u")){let t=window;t.trustedTypes!==void 0&&(ud=t.trustedTypes.createPolicy("angular#components",{createHTML:n=>n}))}return ud}function Pr(t){return aT()?.createHTML(t)||t}function I0(t,n,e){let i=e.sanitize(nt.HTML,n);t.innerHTML=Pr(i||"")}function Fo(t){return Array.isArray(t)?t:[t]}var S0=new Set,Lr,Po=(()=>{class t{_platform=c(pe);_nonce=c(Ir,{optional:!0});_matchMedia;constructor(){this._matchMedia=this._platform.isBrowser&&window.matchMedia?window.matchMedia.bind(window):lT}matchMedia(e){return(this._platform.WEBKIT||this._platform.BLINK)&&sT(e,this._nonce),this._matchMedia(e)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function sT(t,n){if(!S0.has(t))try{Lr||(Lr=document.createElement("style"),n&&Lr.setAttribute("nonce",n),Lr.setAttribute("type","text/css"),document.head.appendChild(Lr)),Lr.sheet&&(Lr.sheet.insertRule(`@media ${t} {body{ }}`,0),S0.add(t))}catch(e){console.error(e)}}function lT(t){return{matches:t==="all"||t==="",media:t,addListener:()=>{},removeListener:()=>{}}}var bs=(()=>{class t{_mediaMatcher=c(Po);_zone=c(P);_queries=new Map;_destroySubject=new M;constructor(){}ngOnDestroy(){this._destroySubject.next(),this._destroySubject.complete()}isMatched(e){return k0(Fo(e)).some(r=>this._registerQuery(r).mql.matches)}observe(e){let r=k0(Fo(e)).map(a=>this._registerQuery(a).observable),o=ju(r);return o=no(o.pipe(mt(1)),o.pipe(Ca(1),ba(0))),o.pipe(Ce(a=>{let s={matches:!1,breakpoints:{}};return a.forEach(({matches:l,query:d})=>{s.matches=s.matches||l,s.breakpoints[d]=l}),s}))}_registerQuery(e){if(this._queries.has(e))return this._queries.get(e);let i=this._mediaMatcher.matchMedia(e),o={observable:new ue(a=>{let s=l=>this._zone.run(()=>a.next(l));return i.addListener(s),()=>{i.removeListener(s)}}).pipe(We(i),Ce(({matches:a})=>({query:e,matches:a})),Ee(this._destroySubject)),mql:i};return this._queries.set(e,o),o}static \u0275fac=function(i){return new(i||t)};static \u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function k0(t){return t.map(n=>n.split(",")).reduce((n,e)=>n.concat(e)).map(n=>n.trim())}var cT=(()=>{class t{create(e){return typeof MutationObserver>"u"?null:new MutationObserver(e)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var fd=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=Z({type:t});static \u0275inj=q({providers:[cT]})}return t})();var ah=(()=>{class t{_platform=c(pe);constructor(){}isDisabled(e){return e.hasAttribute("disabled")}isVisible(e){return uT(e)&&getComputedStyle(e).visibility==="visible"}isTabbable(e){if(!this._platform.isBrowser)return!1;let i=dT(vT(e));if(i&&(T0(i)===-1||!this.isVisible(i)))return!1;let r=e.nodeName.toLowerCase(),o=T0(e);return e.hasAttribute("contenteditable")?o!==-1:r==="iframe"||r==="object"||this._platform.WEBKIT&&this._platform.IOS&&!_T(e)?!1:r==="audio"?e.hasAttribute("controls")?o!==-1:!1:r==="video"?o===-1?!1:o!==null?!0:this._platform.FIREFOX||e.hasAttribute("controls"):e.tabIndex>=0}isFocusable(e,i){return bT(e)&&!this.isDisabled(e)&&(i?.ignoreVisibility||this.isVisible(e))}static \u0275fac=function(i){return new(i||t)};static \u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function dT(t){try{return t.frameElement}catch{return null}}function uT(t){return!!(t.offsetWidth||t.offsetHeight||typeof t.getClientRects=="function"&&t.getClientRects().length)}function fT(t){let n=t.nodeName.toLowerCase();return n==="input"||n==="select"||n==="button"||n==="textarea"}function mT(t){return hT(t)&&t.type=="hidden"}function pT(t){return gT(t)&&t.hasAttribute("href")}function hT(t){return t.nodeName.toLowerCase()=="input"}function gT(t){return t.nodeName.toLowerCase()=="a"}function O0(t){if(!t.hasAttribute("tabindex")||t.tabIndex===void 0)return!1;let n=t.getAttribute("tabindex");return!!(n&&!isNaN(parseInt(n,10)))}function T0(t){if(!O0(t))return null;let n=parseInt(t.getAttribute("tabindex")||"",10);return isNaN(n)?-1:n}function _T(t){let n=t.nodeName.toLowerCase(),e=n==="input"&&t.type;return e==="text"||e==="password"||n==="select"||n==="textarea"}function bT(t){return mT(t)?!1:fT(t)||pT(t)||t.hasAttribute("contenteditable")||O0(t)}function vT(t){return t.ownerDocument&&t.ownerDocument.defaultView||window}var oh=class{_element;_checker;_ngZone;_document;_injector;_startAnchor=null;_endAnchor=null;_hasAttached=!1;startAnchorListener=()=>this.focusLastTabbableElement();endAnchorListener=()=>this.focusFirstTabbableElement();get enabled(){return this._enabled}set enabled(n){this._enabled=n,this._startAnchor&&this._endAnchor&&(this._toggleAnchorTabIndex(n,this._startAnchor),this._toggleAnchorTabIndex(n,this._endAnchor))}_enabled=!0;constructor(n,e,i,r,o=!1,a){this._element=n,this._checker=e,this._ngZone=i,this._document=r,this._injector=a,o||this.attachAnchors()}destroy(){let n=this._startAnchor,e=this._endAnchor;n&&(n.removeEventListener("focus",this.startAnchorListener),n.remove()),e&&(e.removeEventListener("focus",this.endAnchorListener),e.remove()),this._startAnchor=this._endAnchor=null,this._hasAttached=!1}attachAnchors(){return this._hasAttached?!0:(this._ngZone.runOutsideAngular(()=>{this._startAnchor||(this._startAnchor=this._createAnchor(),this._startAnchor.addEventListener("focus",this.startAnchorListener)),this._endAnchor||(this._endAnchor=this._createAnchor(),this._endAnchor.addEventListener("focus",this.endAnchorListener))}),this._element.parentNode&&(this._element.parentNode.insertBefore(this._startAnchor,this._element),this._element.parentNode.insertBefore(this._endAnchor,this._element.nextSibling),this._hasAttached=!0),this._hasAttached)}focusInitialElementWhenReady(n){return new Promise(e=>{this._executeOnStable(()=>e(this.focusInitialElement(n)))})}focusFirstTabbableElementWhenReady(n){return new Promise(e=>{this._executeOnStable(()=>e(this.focusFirstTabbableElement(n)))})}focusLastTabbableElementWhenReady(n){return new Promise(e=>{this._executeOnStable(()=>e(this.focusLastTabbableElement(n)))})}_getRegionBoundary(n){let e=this._element.querySelectorAll(`[cdk-focus-region-${n}], [cdkFocusRegion${n}], [cdk-focus-${n}]`);return n=="start"?e.length?e[0]:this._getFirstTabbableElement(this._element):e.length?e[e.length-1]:this._getLastTabbableElement(this._element)}focusInitialElement(n){let e=this._element.querySelector("[cdk-focus-initial], [cdkFocusInitial]");if(e){if(!this._checker.isFocusable(e)){let i=this._getFirstTabbableElement(e);return i?.focus(n),!!i}return e.focus(n),!0}return this.focusFirstTabbableElement(n)}focusFirstTabbableElement(n){let e=this._getRegionBoundary("start");return e&&e.focus(n),!!e}focusLastTabbableElement(n){let e=this._getRegionBoundary("end");return e&&e.focus(n),!!e}hasAttached(){return this._hasAttached}_getFirstTabbableElement(n){if(this._checker.isFocusable(n)&&this._checker.isTabbable(n))return n;let e=n.children;for(let i=0;i<e.length;i++){let r=e[i].nodeType===this._document.ELEMENT_NODE?this._getFirstTabbableElement(e[i]):null;if(r)return r}return null}_getLastTabbableElement(n){if(this._checker.isFocusable(n)&&this._checker.isTabbable(n))return n;let e=n.children;for(let i=e.length-1;i>=0;i--){let r=e[i].nodeType===this._document.ELEMENT_NODE?this._getLastTabbableElement(e[i]):null;if(r)return r}return null}_createAnchor(){let n=this._document.createElement("div");return this._toggleAnchorTabIndex(this._enabled,n),n.classList.add("cdk-visually-hidden"),n.classList.add("cdk-focus-trap-anchor"),n.setAttribute("aria-hidden","true"),n}_toggleAnchorTabIndex(n,e){n?e.setAttribute("tabindex","0"):e.removeAttribute("tabindex")}toggleAnchors(n){this._startAnchor&&this._endAnchor&&(this._toggleAnchorTabIndex(n,this._startAnchor),this._toggleAnchorTabIndex(n,this._endAnchor))}_executeOnStable(n){this._injector?Qe(n,{injector:this._injector}):setTimeout(n)}},md=(()=>{class t{_checker=c(ah);_ngZone=c(P);_document=c(K);_injector=c(Y);constructor(){c(Oe).load(Wn)}create(e,i=!1){return new oh(e,this._checker,this._ngZone,this._document,i,this._injector)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),sh=(()=>{class t{_elementRef=c(L);_focusTrapFactory=c(md);focusTrap=void 0;_previouslyFocusedElement=null;get enabled(){return this.focusTrap?.enabled||!1}set enabled(e){this.focusTrap&&(this.focusTrap.enabled=e)}autoCapture=!1;constructor(){c(pe).isBrowser&&(this.focusTrap=this._focusTrapFactory.create(this._elementRef.nativeElement,!0))}ngOnDestroy(){this.focusTrap?.destroy(),this._previouslyFocusedElement&&(this._previouslyFocusedElement.focus(),this._previouslyFocusedElement=null)}ngAfterContentInit(){this.focusTrap?.attachAnchors(),this.autoCapture&&this._captureFocus()}ngDoCheck(){this.focusTrap&&!this.focusTrap.hasAttached()&&this.focusTrap.attachAnchors()}ngOnChanges(e){let i=e.autoCapture;i&&!i.firstChange&&this.autoCapture&&this.focusTrap?.hasAttached()&&this._captureFocus()}_captureFocus(){this._previouslyFocusedElement=ai(),this.focusTrap?.focusInitialElementWhenReady()}static \u0275fac=function(i){return new(i||t)};static \u0275dir=$({type:t,selectors:[["","cdkTrapFocus",""]],inputs:{enabled:[2,"cdkTrapFocus","enabled",U],autoCapture:[2,"cdkTrapFocusAutoCapture","autoCapture",U]},exportAs:["cdkTrapFocus"],features:[Be]})}return t})(),N0=new y("liveAnnouncerElement",{providedIn:"root",factory:()=>null}),F0=new y("LIVE_ANNOUNCER_DEFAULT_OPTIONS"),yT=0,vs=(()=>{class t{_ngZone=c(P);_defaultOptions=c(F0,{optional:!0});_liveElement;_document=c(K);_sanitizer=c(Or);_previousTimeout;_currentPromise;_currentResolve;constructor(){let e=c(N0,{optional:!0});this._liveElement=e||this._createLiveElement()}announce(e,...i){let r=this._defaultOptions,o,a;return i.length===1&&typeof i[0]=="number"?a=i[0]:[o,a]=i,this.clear(),clearTimeout(this._previousTimeout),o||(o=r&&r.politeness?r.politeness:"polite"),a==null&&r&&(a=r.duration),this._liveElement.setAttribute("aria-live",o),this._liveElement.id&&this._exposeAnnouncerToModals(this._liveElement.id),this._ngZone.runOutsideAngular(()=>(this._currentPromise||(this._currentPromise=new Promise(s=>this._currentResolve=s)),clearTimeout(this._previousTimeout),this._previousTimeout=setTimeout(()=>{!e||typeof e=="string"?this._liveElement.textContent=e:I0(this._liveElement,e,this._sanitizer),typeof a=="number"&&(this._previousTimeout=setTimeout(()=>this.clear(),a)),this._currentResolve?.(),this._currentPromise=this._currentResolve=void 0},100),this._currentPromise))}clear(){this._liveElement&&(this._liveElement.textContent="")}ngOnDestroy(){clearTimeout(this._previousTimeout),this._liveElement?.remove(),this._liveElement=null,this._currentResolve?.(),this._currentPromise=this._currentResolve=void 0}_createLiveElement(){let e="cdk-live-announcer-element",i=this._document.getElementsByClassName(e),r=this._document.createElement("div");for(let o=0;o<i.length;o++)i[o].remove();return r.classList.add(e),r.classList.add("cdk-visually-hidden"),r.setAttribute("aria-atomic","true"),r.setAttribute("aria-live","polite"),r.id=`cdk-live-announcer-${yT++}`,this._document.body.appendChild(r),r}_exposeAnnouncerToModals(e){let i=this._document.querySelectorAll('body > .cdk-overlay-container [aria-modal="true"]');for(let r=0;r<i.length;r++){let o=i[r],a=o.getAttribute("aria-owns");a?a.indexOf(e)===-1&&o.setAttribute("aria-owns",a+" "+e):o.setAttribute("aria-owns",e)}}static \u0275fac=function(i){return new(i||t)};static \u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Fi=(function(t){return t[t.NONE=0]="NONE",t[t.BLACK_ON_WHITE=1]="BLACK_ON_WHITE",t[t.WHITE_ON_BLACK=2]="WHITE_ON_BLACK",t})(Fi||{}),A0="cdk-high-contrast-black-on-white",R0="cdk-high-contrast-white-on-black",rh="cdk-high-contrast-active",P0=(()=>{class t{_platform=c(pe);_hasCheckedHighContrastMode=!1;_document=c(K);_breakpointSubscription;constructor(){this._breakpointSubscription=c(bs).observe("(forced-colors: active)").subscribe(()=>{this._hasCheckedHighContrastMode&&(this._hasCheckedHighContrastMode=!1,this._applyBodyHighContrastModeCssClasses())})}getHighContrastMode(){if(!this._platform.isBrowser)return Fi.NONE;let e=this._document.createElement("div");e.style.backgroundColor="rgb(1,2,3)",e.style.position="absolute",this._document.body.appendChild(e);let i=this._document.defaultView||window,r=i&&i.getComputedStyle?i.getComputedStyle(e):null,o=(r&&r.backgroundColor||"").replace(/ /g,"");switch(e.remove(),o){case"rgb(0,0,0)":case"rgb(45,50,54)":case"rgb(32,32,32)":return Fi.WHITE_ON_BLACK;case"rgb(255,255,255)":case"rgb(255,250,239)":return Fi.BLACK_ON_WHITE}return Fi.NONE}ngOnDestroy(){this._breakpointSubscription.unsubscribe()}_applyBodyHighContrastModeCssClasses(){if(!this._hasCheckedHighContrastMode&&this._platform.isBrowser&&this._document.body){let e=this._document.body.classList;e.remove(rh,A0,R0),this._hasCheckedHighContrastMode=!0;let i=this.getHighContrastMode();i===Fi.BLACK_ON_WHITE?e.add(rh,A0):i===Fi.WHITE_ON_BLACK&&e.add(rh,R0)}}static \u0275fac=function(i){return new(i||t)};static \u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),Vr=(()=>{class t{constructor(){c(P0)._applyBodyHighContrastModeCssClasses()}static \u0275fac=function(i){return new(i||t)};static \u0275mod=Z({type:t});static \u0275inj=q({imports:[fd]})}return t})();var CT=200,pd=class{_letterKeyStream=new M;_items=[];_selectedItemIndex=-1;_pressedLetters=[];_skipPredicateFn;_selectedItem=new M;selectedItem=this._selectedItem;constructor(n,e){let i=typeof e?.debounceInterval=="number"?e.debounceInterval:CT;e?.skipPredicate&&(this._skipPredicateFn=e.skipPredicate),this.setItems(n),this._setupKeyHandler(i)}destroy(){this._pressedLetters=[],this._letterKeyStream.complete(),this._selectedItem.complete()}setCurrentSelectedItemIndex(n){this._selectedItemIndex=n}setItems(n){this._items=n}handleKey(n){let e=n.keyCode;n.key&&n.key.length===1?this._letterKeyStream.next(n.key.toLocaleUpperCase()):(e>=65&&e<=90||e>=48&&e<=57)&&this._letterKeyStream.next(String.fromCharCode(e))}isTyping(){return this._pressedLetters.length>0}reset(){this._pressedLetters=[]}_setupKeyHandler(n){this._letterKeyStream.pipe(kt(e=>this._pressedLetters.push(e)),ba(n),Ne(()=>this._pressedLetters.length>0),Ce(()=>this._pressedLetters.join("").toLocaleUpperCase())).subscribe(e=>{for(let i=1;i<this._items.length+1;i++){let r=(this._selectedItemIndex+i)%this._items.length,o=this._items[r];if(!this._skipPredicateFn?.(o)&&o.getLabel?.().toLocaleUpperCase().trim().indexOf(e)===0){this._selectedItem.next(o);break}}this._pressedLetters=[]})}};function $e(t,...n){return n.length?n.some(e=>t[e]):t.altKey||t.shiftKey||t.ctrlKey||t.metaKey}var Lo=class{_items;_activeItemIndex=x(-1);_activeItem=x(null);_wrap=!1;_typeaheadSubscription=ce.EMPTY;_itemChangesSubscription;_vertical=!0;_horizontal=null;_allowedModifierKeys=[];_homeAndEnd=!1;_pageUpAndDown={enabled:!1,delta:10};_effectRef;_typeahead;_skipPredicateFn=n=>n.disabled;constructor(n,e){this._items=n,n instanceof ti?this._itemChangesSubscription=n.changes.subscribe(i=>this._itemsChanged(i.toArray())):$n(n)&&(this._effectRef=vn(()=>this._itemsChanged(n()),{injector:e}))}tabOut=new M;change=new M;skipPredicate(n){return this._skipPredicateFn=n,this}withWrap(n=!0){return this._wrap=n,this}withVerticalOrientation(n=!0){return this._vertical=n,this}withHorizontalOrientation(n){return this._horizontal=n,this}withAllowedModifierKeys(n){return this._allowedModifierKeys=n,this}withTypeAhead(n=200){this._typeaheadSubscription.unsubscribe();let e=this._getItemsArray();return this._typeahead=new pd(e,{debounceInterval:typeof n=="number"?n:void 0,skipPredicate:i=>this._skipPredicateFn(i)}),this._typeaheadSubscription=this._typeahead.selectedItem.subscribe(i=>{this.setActiveItem(i)}),this}cancelTypeahead(){return this._typeahead?.reset(),this}withHomeAndEnd(n=!0){return this._homeAndEnd=n,this}withPageUpDown(n=!0,e=10){return this._pageUpAndDown={enabled:n,delta:e},this}setActiveItem(n){let e=this._activeItem();this.updateActiveItem(n),this._activeItem()!==e&&this.change.next(this._activeItemIndex())}onKeydown(n){let e=n.keyCode,r=["altKey","ctrlKey","metaKey","shiftKey"].every(o=>!n[o]||this._allowedModifierKeys.indexOf(o)>-1);switch(e){case 9:this.tabOut.next();return;case 40:if(this._vertical&&r){this.setNextItemActive();break}else return;case 38:if(this._vertical&&r){this.setPreviousItemActive();break}else return;case 39:if(this._horizontal&&r){this._horizontal==="rtl"?this.setPreviousItemActive():this.setNextItemActive();break}else return;case 37:if(this._horizontal&&r){this._horizontal==="rtl"?this.setNextItemActive():this.setPreviousItemActive();break}else return;case 36:if(this._homeAndEnd&&r){this.setFirstItemActive();break}else return;case 35:if(this._homeAndEnd&&r){this.setLastItemActive();break}else return;case 33:if(this._pageUpAndDown.enabled&&r){let o=this._activeItemIndex()-this._pageUpAndDown.delta;this._setActiveItemByIndex(o>0?o:0,1);break}else return;case 34:if(this._pageUpAndDown.enabled&&r){let o=this._activeItemIndex()+this._pageUpAndDown.delta,a=this._getItemsArray().length;this._setActiveItemByIndex(o<a?o:a-1,-1);break}else return;default:(r||$e(n,"shiftKey"))&&this._typeahead?.handleKey(n);return}this._typeahead?.reset(),n.preventDefault()}get activeItemIndex(){return this._activeItemIndex()}get activeItem(){return this._activeItem()}isTyping(){return!!this._typeahead&&this._typeahead.isTyping()}setFirstItemActive(){this._setActiveItemByIndex(0,1)}setLastItemActive(){this._setActiveItemByIndex(this._getItemsArray().length-1,-1)}setNextItemActive(){this._activeItemIndex()<0?this.setFirstItemActive():this._setActiveItemByDelta(1)}setPreviousItemActive(){this._activeItemIndex()<0&&this._wrap?this.setLastItemActive():this._setActiveItemByDelta(-1)}updateActiveItem(n){let e=this._getItemsArray(),i=typeof n=="number"?n:e.indexOf(n),r=e[i];this._activeItem.set(r??null),this._activeItemIndex.set(i),this._typeahead?.setCurrentSelectedItemIndex(i)}destroy(){this._typeaheadSubscription.unsubscribe(),this._itemChangesSubscription?.unsubscribe(),this._effectRef?.destroy(),this._typeahead?.destroy(),this.tabOut.complete(),this.change.complete()}_setActiveItemByDelta(n){this._wrap?this._setActiveInWrapMode(n):this._setActiveInDefaultMode(n)}_setActiveInWrapMode(n){let e=this._getItemsArray();for(let i=1;i<=e.length;i++){let r=(this._activeItemIndex()+n*i+e.length)%e.length,o=e[r];if(!this._skipPredicateFn(o)){this.setActiveItem(r);return}}}_setActiveInDefaultMode(n){this._setActiveItemByIndex(this._activeItemIndex()+n,n)}_setActiveItemByIndex(n,e){let i=this._getItemsArray();if(i[n]){for(;this._skipPredicateFn(i[n]);)if(n+=e,!i[n])return;this.setActiveItem(n)}}_getItemsArray(){return $n(this._items)?this._items():this._items instanceof ti?this._items.toArray():this._items}_itemsChanged(n){this._typeahead?.setItems(n);let e=this._activeItem();if(e){let i=n.indexOf(e);i>-1&&i!==this._activeItemIndex()&&(this._activeItemIndex.set(i),this._typeahead?.setCurrentSelectedItemIndex(i))}}};var ys=class extends Lo{setActiveItem(n){this.activeItem&&this.activeItem.setInactiveStyles(),super.setActiveItem(n),this.activeItem&&this.activeItem.setActiveStyles()}};var Cs=class extends Lo{_origin="program";setFocusOrigin(n){return this._origin=n,this}setActiveItem(n){super.setActiveItem(n),this.activeItem&&this.activeItem.focus(this._origin)}};var lh={},ye=class t{_appId=c(Ai);static _infix=`a${Math.floor(Math.random()*1e5).toString()}`;getId(n,e=!1){return this._appId!=="ng"&&(n+=this._appId),lh.hasOwnProperty(n)||(lh[n]=0),`${n}${e?t._infix+"-":""}${lh[n]++}`}static \u0275fac=function(e){return new(e||t)};static \u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"})};var B0=" ";function uh(t,n,e){let i=yd(t,n);e=e.trim(),!i.some(r=>r.trim()===e)&&(i.push(e),t.setAttribute(n,i.join(B0)))}function Cd(t,n,e){let i=yd(t,n);e=e.trim();let r=i.filter(o=>o!==e);r.length?t.setAttribute(n,r.join(B0)):t.removeAttribute(n)}function yd(t,n){return t.getAttribute(n)?.match(/\S+/g)??[]}var j0="cdk-describedby-message",vd="cdk-describedby-host",dh=0,H0=(()=>{class t{_platform=c(pe);_document=c(K);_messageRegistry=new Map;_messagesContainer=null;_id=`${dh++}`;constructor(){c(Oe).load(Wn),this._id=c(Ai)+"-"+dh++}describe(e,i,r){if(!this._canBeDescribed(e,i))return;let o=ch(i,r);typeof i!="string"?(V0(i,this._id),this._messageRegistry.set(o,{messageElement:i,referenceCount:0})):this._messageRegistry.has(o)||this._createMessageElement(i,r),this._isElementDescribedByMessage(e,o)||this._addMessageReference(e,o)}removeDescription(e,i,r){if(!i||!this._isElementNode(e))return;let o=ch(i,r);if(this._isElementDescribedByMessage(e,o)&&this._removeMessageReference(e,o),typeof i=="string"){let a=this._messageRegistry.get(o);a&&a.referenceCount===0&&this._deleteMessageElement(o)}this._messagesContainer?.childNodes.length===0&&(this._messagesContainer.remove(),this._messagesContainer=null)}ngOnDestroy(){let e=this._document.querySelectorAll(`[${vd}="${this._id}"]`);for(let i=0;i<e.length;i++)this._removeCdkDescribedByReferenceIds(e[i]),e[i].removeAttribute(vd);this._messagesContainer?.remove(),this._messagesContainer=null,this._messageRegistry.clear()}_createMessageElement(e,i){let r=this._document.createElement("div");V0(r,this._id),r.textContent=e,i&&r.setAttribute("role",i),this._createMessagesContainer(),this._messagesContainer.appendChild(r),this._messageRegistry.set(ch(e,i),{messageElement:r,referenceCount:0})}_deleteMessageElement(e){this._messageRegistry.get(e)?.messageElement?.remove(),this._messageRegistry.delete(e)}_createMessagesContainer(){if(this._messagesContainer)return;let e="cdk-describedby-message-container",i=this._document.querySelectorAll(`.${e}[platform="server"]`);for(let o=0;o<i.length;o++)i[o].remove();let r=this._document.createElement("div");r.style.visibility="hidden",r.classList.add(e),r.classList.add("cdk-visually-hidden"),this._platform.isBrowser||r.setAttribute("platform","server"),this._document.body.appendChild(r),this._messagesContainer=r}_removeCdkDescribedByReferenceIds(e){let i=yd(e,"aria-describedby").filter(r=>r.indexOf(j0)!=0);e.setAttribute("aria-describedby",i.join(" "))}_addMessageReference(e,i){let r=this._messageRegistry.get(i);uh(e,"aria-describedby",r.messageElement.id),e.setAttribute(vd,this._id),r.referenceCount++}_removeMessageReference(e,i){let r=this._messageRegistry.get(i);r.referenceCount--,Cd(e,"aria-describedby",r.messageElement.id),e.removeAttribute(vd)}_isElementDescribedByMessage(e,i){let r=yd(e,"aria-describedby"),o=this._messageRegistry.get(i),a=o&&o.messageElement.id;return!!a&&r.indexOf(a)!=-1}_canBeDescribed(e,i){if(!this._isElementNode(e))return!1;if(i&&typeof i=="object")return!0;let r=i==null?"":`${i}`.trim(),o=e.getAttribute("aria-label");return r?!o||o.trim()!==r:!1}_isElementNode(e){return e.nodeType===this._document.ELEMENT_NODE}static \u0275fac=function(i){return new(i||t)};static \u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function ch(t,n){return typeof t=="string"?`${n||""}/${t}`:t}function V0(t,n){t.id||(t.id=`${j0}-${n}-${dh++}`)}var Tn=(function(t){return t[t.NORMAL=0]="NORMAL",t[t.NEGATED=1]="NEGATED",t[t.INVERTED=2]="INVERTED",t})(Tn||{}),Dd,Br;function xd(){if(Br==null){if(typeof document!="object"||!document||typeof Element!="function"||!Element)return Br=!1,Br;if(document.documentElement?.style&&"scrollBehavior"in document.documentElement.style)Br=!0;else{let t=Element.prototype.scrollTo;t?Br=!/\{\s*\[native code\]\s*\}/.test(t.toString()):Br=!1}}return Br}function Vo(){if(typeof document!="object"||!document)return Tn.NORMAL;if(Dd==null){let t=document.createElement("div"),n=t.style;t.dir="rtl",n.width="1px",n.overflow="auto",n.visibility="hidden",n.pointerEvents="none",n.position="absolute";let e=document.createElement("div"),i=e.style;i.width="2px",i.height="1px",t.appendChild(e),document.body.appendChild(t),Dd=Tn.NORMAL,t.scrollLeft===0&&(t.scrollLeft=1,Dd=t.scrollLeft===0?Tn.NEGATED:Tn.INVERTED),t.remove()}return Dd}function fh(){return typeof __karma__<"u"&&!!__karma__||typeof jasmine<"u"&&!!jasmine||typeof jest<"u"&&!!jest||typeof Mocha<"u"&&!!Mocha}var Bo,U0=["color","button","checkbox","date","datetime-local","email","file","hidden","image","month","number","password","radio","range","reset","search","submit","tel","text","time","url","week"];function mh(){if(Bo)return Bo;if(typeof document!="object"||!document)return Bo=new Set(U0),Bo;let t=document.createElement("input");return Bo=new Set(U0.filter(n=>(t.setAttribute("type",n),t.type===n))),Bo}var z0={XSmall:"(max-width: 599.98px)",Small:"(min-width: 600px) and (max-width: 959.98px)",Medium:"(min-width: 960px) and (max-width: 1279.98px)",Large:"(min-width: 1280px) and (max-width: 1919.98px)",XLarge:"(min-width: 1920px)",Handset:"(max-width: 599.98px) and (orientation: portrait), (max-width: 959.98px) and (orientation: landscape)",Tablet:"(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait), (min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)",Web:"(min-width: 840px) and (orientation: portrait), (min-width: 1280px) and (orientation: landscape)",HandsetPortrait:"(max-width: 599.98px) and (orientation: portrait)",TabletPortrait:"(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait)",WebPortrait:"(min-width: 840px) and (orientation: portrait)",HandsetLandscape:"(max-width: 959.98px) and (orientation: landscape)",TabletLandscape:"(min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)",WebLandscape:"(min-width: 1280px) and (orientation: landscape)"};var DT=new y("MATERIAL_ANIMATIONS"),$0=null;function ph(){return c(DT,{optional:!0})?.animationsDisabled||c(Ya,{optional:!0})==="NoopAnimations"?"di-disabled":($0??=c(Po).matchMedia("(prefers-reduced-motion)").matches,$0?"reduced-motion":"enabled")}function xe(){return ph()!=="enabled"}function Ze(t){return t==null?"":typeof t=="string"?t:`${t}px`}function li(t){return t!=null&&`${t}`!="false"}var tn=(function(t){return t[t.FADING_IN=0]="FADING_IN",t[t.VISIBLE=1]="VISIBLE",t[t.FADING_OUT=2]="FADING_OUT",t[t.HIDDEN=3]="HIDDEN",t})(tn||{}),hh=class{_renderer;element;config;_animationForciblyDisabledThroughCss;state=tn.HIDDEN;constructor(n,e,i,r=!1){this._renderer=n,this.element=e,this.config=i,this._animationForciblyDisabledThroughCss=r}fadeOut(){this._renderer.fadeOutRipple(this)}},W0=No({passive:!0,capture:!0}),gh=class{_events=new Map;addHandler(n,e,i,r){let o=this._events.get(e);if(o){let a=o.get(i);a?a.add(r):o.set(i,new Set([r]))}else this._events.set(e,new Map([[i,new Set([r])]])),n.runOutsideAngular(()=>{document.addEventListener(e,this._delegateEventHandler,W0)})}removeHandler(n,e,i){let r=this._events.get(n);if(!r)return;let o=r.get(e);o&&(o.delete(i),o.size===0&&r.delete(e),r.size===0&&(this._events.delete(n),document.removeEventListener(n,this._delegateEventHandler,W0)))}_delegateEventHandler=n=>{let e=dt(n);e&&this._events.get(n.type)?.forEach((i,r)=>{(r===e||r.contains(e))&&i.forEach(o=>o.handleEvent(n))})}},Ds={enterDuration:225,exitDuration:150},xT=800,G0=No({passive:!0,capture:!0}),Y0=["mousedown","touchstart"],q0=["mouseup","mouseleave","touchend","touchcancel"],wT=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275cmp=R({type:t,selectors:[["ng-component"]],hostAttrs:["mat-ripple-style-loader",""],decls:0,vars:0,template:function(i,r){},styles:[`.mat-ripple {
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
`],encapsulation:2,changeDetection:0})}return t})(),xs=class t{_target;_ngZone;_platform;_containerElement;_triggerElement=null;_isPointerDown=!1;_activeRipples=new Map;_mostRecentTransientRipple=null;_lastTouchStartEvent;_pointerUpEventsRegistered=!1;_containerRect=null;static _eventManager=new gh;constructor(n,e,i,r,o){this._target=n,this._ngZone=e,this._platform=r,r.isBrowser&&(this._containerElement=Bt(i)),o&&o.get(Oe).load(wT)}fadeInRipple(n,e,i={}){let r=this._containerRect=this._containerRect||this._containerElement.getBoundingClientRect(),o=I(I({},Ds),i.animation);i.centered&&(n=r.left+r.width/2,e=r.top+r.height/2);let a=i.radius||ET(n,e,r),s=n-r.left,l=e-r.top,d=o.enterDuration,u=document.createElement("div");u.classList.add("mat-ripple-element"),u.style.left=`${s-a}px`,u.style.top=`${l-a}px`,u.style.height=`${a*2}px`,u.style.width=`${a*2}px`,i.color!=null&&(u.style.backgroundColor=i.color),u.style.transitionDuration=`${d}ms`,this._containerElement.appendChild(u);let f=window.getComputedStyle(u),_=f.transitionProperty,g=f.transitionDuration,C=_==="none"||g==="0s"||g==="0s, 0s"||r.width===0&&r.height===0,F=new hh(this,u,i,C);u.style.transform="scale3d(1, 1, 1)",F.state=tn.FADING_IN,i.persistent||(this._mostRecentTransientRipple=F);let z=null;return!C&&(d||o.exitDuration)&&this._ngZone.runOutsideAngular(()=>{let Q=()=>{z&&(z.fallbackTimer=null),clearTimeout(Ot),this._finishRippleTransition(F)},Le=()=>this._destroyRipple(F),Ot=setTimeout(Le,d+100);u.addEventListener("transitionend",Q),u.addEventListener("transitioncancel",Le),z={onTransitionEnd:Q,onTransitionCancel:Le,fallbackTimer:Ot}}),this._activeRipples.set(F,z),(C||!d)&&this._finishRippleTransition(F),F}fadeOutRipple(n){if(n.state===tn.FADING_OUT||n.state===tn.HIDDEN)return;let e=n.element,i=I(I({},Ds),n.config.animation);e.style.transitionDuration=`${i.exitDuration}ms`,e.style.opacity="0",n.state=tn.FADING_OUT,(n._animationForciblyDisabledThroughCss||!i.exitDuration)&&this._finishRippleTransition(n)}fadeOutAll(){this._getActiveRipples().forEach(n=>n.fadeOut())}fadeOutAllNonPersistent(){this._getActiveRipples().forEach(n=>{n.config.persistent||n.fadeOut()})}setupTriggerEvents(n){let e=Bt(n);!this._platform.isBrowser||!e||e===this._triggerElement||(this._removeTriggerEvents(),this._triggerElement=e,Y0.forEach(i=>{t._eventManager.addHandler(this._ngZone,i,e,this)}))}handleEvent(n){n.type==="mousedown"?this._onMousedown(n):n.type==="touchstart"?this._onTouchStart(n):this._onPointerUp(),this._pointerUpEventsRegistered||(this._ngZone.runOutsideAngular(()=>{q0.forEach(e=>{this._triggerElement.addEventListener(e,this,G0)})}),this._pointerUpEventsRegistered=!0)}_finishRippleTransition(n){n.state===tn.FADING_IN?this._startFadeOutTransition(n):n.state===tn.FADING_OUT&&this._destroyRipple(n)}_startFadeOutTransition(n){let e=n===this._mostRecentTransientRipple,{persistent:i}=n.config;n.state=tn.VISIBLE,!i&&(!e||!this._isPointerDown)&&n.fadeOut()}_destroyRipple(n){let e=this._activeRipples.get(n)??null;this._activeRipples.delete(n),this._activeRipples.size||(this._containerRect=null),n===this._mostRecentTransientRipple&&(this._mostRecentTransientRipple=null),n.state=tn.HIDDEN,e!==null&&(n.element.removeEventListener("transitionend",e.onTransitionEnd),n.element.removeEventListener("transitioncancel",e.onTransitionCancel),e.fallbackTimer!==null&&clearTimeout(e.fallbackTimer)),n.element.remove()}_onMousedown(n){let e=Nr(n),i=this._lastTouchStartEvent&&Date.now()<this._lastTouchStartEvent+xT;!this._target.rippleDisabled&&!e&&!i&&(this._isPointerDown=!0,this.fadeInRipple(n.clientX,n.clientY,this._target.rippleConfig))}_onTouchStart(n){if(!this._target.rippleDisabled&&!Fr(n)){this._lastTouchStartEvent=Date.now(),this._isPointerDown=!0;let e=n.changedTouches;if(e)for(let i=0;i<e.length;i++)this.fadeInRipple(e[i].clientX,e[i].clientY,this._target.rippleConfig)}}_onPointerUp(){this._isPointerDown&&(this._isPointerDown=!1,this._getActiveRipples().forEach(n=>{let e=n.state===tn.VISIBLE||n.config.terminateOnPointerUp&&n.state===tn.FADING_IN;!n.config.persistent&&e&&n.fadeOut()}))}_getActiveRipples(){return Array.from(this._activeRipples.keys())}_removeTriggerEvents(){let n=this._triggerElement;n&&(Y0.forEach(e=>t._eventManager.removeHandler(e,n,this)),this._pointerUpEventsRegistered&&(q0.forEach(e=>n.removeEventListener(e,this,G0)),this._pointerUpEventsRegistered=!1))}};function ET(t,n,e){let i=Math.max(Math.abs(t-e.left),Math.abs(t-e.right)),r=Math.max(Math.abs(n-e.top),Math.abs(n-e.bottom));return Math.sqrt(i*i+r*r)}var _h=new y("mat-ripple-global-options"),Pi=(()=>{class t{_elementRef=c(L);_animationsDisabled=xe();color;unbounded=!1;centered=!1;radius=0;animation;get disabled(){return this._disabled}set disabled(e){e&&this.fadeOutAllNonPersistent(),this._disabled=e,this._setupTriggerEventsIfEnabled()}_disabled=!1;get trigger(){return this._trigger||this._elementRef.nativeElement}set trigger(e){this._trigger=e,this._setupTriggerEventsIfEnabled()}_trigger;_rippleRenderer;_globalOptions;_isInitialized=!1;constructor(){let e=c(P),i=c(pe),r=c(_h,{optional:!0}),o=c(Y);this._globalOptions=r||{},this._rippleRenderer=new xs(this,e,this._elementRef,i,o)}ngOnInit(){this._isInitialized=!0,this._setupTriggerEventsIfEnabled()}ngOnDestroy(){this._rippleRenderer._removeTriggerEvents()}fadeOutAll(){this._rippleRenderer.fadeOutAll()}fadeOutAllNonPersistent(){this._rippleRenderer.fadeOutAllNonPersistent()}get rippleConfig(){return{centered:this.centered,radius:this.radius,color:this.color,animation:I(I(I({},this._globalOptions.animation),this._animationsDisabled?{enterDuration:0,exitDuration:0}:{}),this.animation),terminateOnPointerUp:this._globalOptions.terminateOnPointerUp}}get rippleDisabled(){return this.disabled||!!this._globalOptions.disabled}_setupTriggerEventsIfEnabled(){!this.disabled&&this._isInitialized&&this._rippleRenderer.setupTriggerEvents(this.trigger)}launch(e,i=0,r){return typeof e=="number"?this._rippleRenderer.fadeInRipple(e,i,I(I({},this.rippleConfig),r)):this._rippleRenderer.fadeInRipple(0,0,I(I({},this.rippleConfig),e))}static \u0275fac=function(i){return new(i||t)};static \u0275dir=$({type:t,selectors:[["","mat-ripple",""],["","matRipple",""]],hostAttrs:[1,"mat-ripple"],hostVars:2,hostBindings:function(i,r){i&2&&A("mat-ripple-unbounded",r.unbounded)},inputs:{color:[0,"matRippleColor","color"],unbounded:[0,"matRippleUnbounded","unbounded"],centered:[0,"matRippleCentered","centered"],radius:[0,"matRippleRadius","radius"],animation:[0,"matRippleAnimation","animation"],disabled:[0,"matRippleDisabled","disabled"],trigger:[0,"matRippleTrigger","trigger"]},exportAs:["matRipple"]})}return t})();var MT={capture:!0},IT=["focus","mousedown","mouseenter","touchstart"],bh="mat-ripple-loader-uninitialized",vh="mat-ripple-loader-class-name",Z0="mat-ripple-loader-centered",wd="mat-ripple-loader-disabled",K0=(()=>{class t{_document=c(K);_animationsDisabled=xe();_globalRippleOptions=c(_h,{optional:!0});_platform=c(pe);_ngZone=c(P);_injector=c(Y);_eventCleanups;_hosts=new Map;constructor(){let e=c(Ke).createRenderer(null,null);this._eventCleanups=this._ngZone.runOutsideAngular(()=>IT.map(i=>e.listen(this._document,i,this._onInteraction,MT)))}ngOnDestroy(){let e=this._hosts.keys();for(let i of e)this.destroyRipple(i);this._eventCleanups.forEach(i=>i())}configureRipple(e,i){e.setAttribute(bh,this._globalRippleOptions?.namespace??""),(i.className||!e.hasAttribute(vh))&&e.setAttribute(vh,i.className||""),i.centered&&e.setAttribute(Z0,""),i.disabled&&e.setAttribute(wd,"")}setDisabled(e,i){let r=this._hosts.get(e);r?(r.target.rippleDisabled=i,!i&&!r.hasSetUpEvents&&(r.hasSetUpEvents=!0,r.renderer.setupTriggerEvents(e))):i?e.setAttribute(wd,""):e.removeAttribute(wd)}_onInteraction=e=>{let i=dt(e);if(i instanceof HTMLElement){let r=i.closest(`[${bh}="${this._globalRippleOptions?.namespace??""}"]`);r&&this._createRipple(r)}};_createRipple(e){if(!this._document||this._hosts.has(e))return;e.querySelector(".mat-ripple")?.remove();let i=this._document.createElement("span");i.classList.add("mat-ripple",e.getAttribute(vh)),e.append(i);let r=this._globalRippleOptions,o=this._animationsDisabled?0:r?.animation?.enterDuration??Ds.enterDuration,a=this._animationsDisabled?0:r?.animation?.exitDuration??Ds.exitDuration,s={rippleDisabled:this._animationsDisabled||r?.disabled||e.hasAttribute(wd),rippleConfig:{centered:e.hasAttribute(Z0),terminateOnPointerUp:r?.terminateOnPointerUp,animation:{enterDuration:o,exitDuration:a}}},l=new xs(s,this._ngZone,i,this._platform,this._injector),d=!s.rippleDisabled;d&&l.setupTriggerEvents(e),this._hosts.set(e,{target:s,renderer:l,hasSetUpEvents:d}),e.removeAttribute(bh)}destroyRipple(e){let i=this._hosts.get(e);i&&(i.renderer._removeTriggerEvents(),this._hosts.delete(e))}static \u0275fac=function(i){return new(i||t)};static \u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var nn=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275cmp=R({type:t,selectors:[["structural-styles"]],decls:0,vars:0,template:function(i,r){},styles:[`.mat-focus-indicator {
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
`],encapsulation:2,changeDetection:0})}return t})();var ST=["mat-icon-button",""],kT=["*"],TT=new y("MAT_BUTTON_CONFIG");function Q0(t){return t==null?void 0:En(t)}var Ed=(()=>{class t{_elementRef=c(L);_ngZone=c(P);_animationsDisabled=xe();_config=c(TT,{optional:!0});_focusMonitor=c(jt);_cleanupClick;_renderer=c(Te);_rippleLoader=c(K0);_isAnchor;_isFab=!1;color;get disableRipple(){return this._disableRipple}set disableRipple(e){this._disableRipple=e,this._updateRippleDisabled()}_disableRipple=!1;get disabled(){return this._disabled}set disabled(e){this._disabled=e,this._updateRippleDisabled()}_disabled=!1;ariaDisabled;disabledInteractive;tabIndex;set _tabindex(e){this.tabIndex=e}constructor(){c(Oe).load(nn);let e=this._elementRef.nativeElement;this._isAnchor=e.tagName==="A",this.disabledInteractive=this._config?.disabledInteractive??!1,this.color=this._config?.color??null,this._rippleLoader?.configureRipple(e,{className:"mat-mdc-button-ripple"})}ngAfterViewInit(){this._focusMonitor.monitor(this._elementRef,!0),this._isAnchor&&this._setupAsAnchor()}ngOnDestroy(){this._cleanupClick?.(),this._focusMonitor.stopMonitoring(this._elementRef),this._rippleLoader?.destroyRipple(this._elementRef.nativeElement)}focus(e="program",i){e?this._focusMonitor.focusVia(this._elementRef.nativeElement,e,i):this._elementRef.nativeElement.focus(i)}_getAriaDisabled(){return this.ariaDisabled!=null?this.ariaDisabled:this._isAnchor?this.disabled||null:this.disabled&&this.disabledInteractive?!0:null}_getDisabledAttribute(){return this.disabledInteractive||!this.disabled?null:!0}_updateRippleDisabled(){this._rippleLoader?.setDisabled(this._elementRef.nativeElement,this.disableRipple||this.disabled)}_getTabIndex(){return this._isAnchor?this.disabled&&!this.disabledInteractive?-1:this.tabIndex:this.tabIndex}_setupAsAnchor(){this._cleanupClick=this._ngZone.runOutsideAngular(()=>this._renderer.listen(this._elementRef.nativeElement,"click",e=>{this.disabled&&(e.preventDefault(),e.stopImmediatePropagation())}))}static \u0275fac=function(i){return new(i||t)};static \u0275dir=$({type:t,hostAttrs:[1,"mat-mdc-button-base"],hostVars:13,hostBindings:function(i,r){i&2&&(O("disabled",r._getDisabledAttribute())("aria-disabled",r._getAriaDisabled())("tabindex",r._getTabIndex()),rt(r.color?"mat-"+r.color:""),A("mat-mdc-button-disabled",r.disabled)("mat-mdc-button-disabled-interactive",r.disabledInteractive)("mat-unthemed",!r.color)("_mat-animation-noopable",r._animationsDisabled))},inputs:{color:"color",disableRipple:[2,"disableRipple","disableRipple",U],disabled:[2,"disabled","disabled",U],ariaDisabled:[2,"aria-disabled","ariaDisabled",U],disabledInteractive:[2,"disabledInteractive","disabledInteractive",U],tabIndex:[2,"tabIndex","tabIndex",Q0],_tabindex:[2,"tabindex","_tabindex",Q0]}})}return t})(),rn=(()=>{class t extends Ed{constructor(){super(),this._rippleLoader.configureRipple(this._elementRef.nativeElement,{centered:!0})}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=R({type:t,selectors:[["button","mat-icon-button",""],["a","mat-icon-button",""],["button","matIconButton",""],["a","matIconButton",""]],hostAttrs:[1,"mdc-icon-button","mat-mdc-icon-button"],exportAs:["matButton","matAnchor"],features:[ve],attrs:ST,ngContentSelectors:kT,decls:4,vars:0,consts:[[1,"mat-mdc-button-persistent-ripple","mdc-icon-button__ripple"],[1,"mat-focus-indicator"],[1,"mat-mdc-button-touch-target"]],template:function(i,r){i&1&&(Se(),vt(0,"span",0),oe(1),vt(2,"span",1)(3,"span",2))},styles:[`.mat-mdc-icon-button {
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
`],encapsulation:2,changeDetection:0})}return t})();var AT=new y("cdk-dir-doc",{providedIn:"root",factory:()=>c(K)}),RT=/^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;function X0(t){let n=t?.toLowerCase()||"";return n==="auto"&&typeof navigator<"u"&&navigator?.language?RT.test(navigator.language)?"rtl":"ltr":n==="rtl"?"rtl":"ltr"}var Ue=(()=>{class t{get value(){return this.valueSignal()}valueSignal=x("ltr");change=new S;constructor(){let e=c(AT,{optional:!0});if(e){let i=e.body?e.body.dir:null,r=e.documentElement?e.documentElement.dir:null;this.valueSignal.set(X0(i||r||"ltr"))}}ngOnDestroy(){this.change.complete()}static \u0275fac=function(i){return new(i||t)};static \u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var he=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=Z({type:t});static \u0275inj=q({})}return t})();var Li=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=Z({type:t});static \u0275inj=q({imports:[he]})}return t})();var OT=["matButton",""],eC=[[["",8,"material-icons",3,"iconPositionEnd",""],["mat-icon",3,"iconPositionEnd",""],["","matButtonIcon","",3,"iconPositionEnd",""]],"*",[["","iconPositionEnd","",8,"material-icons"],["mat-icon","iconPositionEnd",""],["","matButtonIcon","","iconPositionEnd",""]]],tC=[".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd]), [matButtonIcon]:not([iconPositionEnd])","*",".material-icons[iconPositionEnd], mat-icon[iconPositionEnd], [matButtonIcon][iconPositionEnd]"],NT=["mat-fab",""];var J0=new Map([["text",["mat-mdc-button"]],["filled",["mdc-button--unelevated","mat-mdc-unelevated-button"]],["elevated",["mdc-button--raised","mat-mdc-raised-button"]],["outlined",["mdc-button--outlined","mat-mdc-outlined-button"]],["tonal",["mat-tonal-button"]]]),An=(()=>{class t extends Ed{get appearance(){return this._appearance}set appearance(e){this.setAppearance(e||this._config?.defaultAppearance||"text")}_appearance=null;constructor(){super();let e=FT(this._elementRef.nativeElement);e&&this.setAppearance(e)}setAppearance(e){if(e===this._appearance)return;let i=this._elementRef.nativeElement.classList,r=this._appearance?J0.get(this._appearance):null,o=J0.get(e);r&&i.remove(...r),i.add(...o),this._appearance=e}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=R({type:t,selectors:[["button","matButton",""],["a","matButton",""],["button","mat-button",""],["button","mat-raised-button",""],["button","mat-flat-button",""],["button","mat-stroked-button",""],["a","mat-button",""],["a","mat-raised-button",""],["a","mat-flat-button",""],["a","mat-stroked-button",""]],hostAttrs:[1,"mdc-button"],inputs:{appearance:[0,"matButton","appearance"]},exportAs:["matButton","matAnchor"],features:[ve],attrs:OT,ngContentSelectors:tC,decls:7,vars:4,consts:[[1,"mat-mdc-button-persistent-ripple"],[1,"mdc-button__label"],[1,"mat-focus-indicator"],[1,"mat-mdc-button-touch-target"]],template:function(i,r){i&1&&(Se(eC),vt(0,"span",0),oe(1),Pe(2,"span",1),oe(3,1),je(),oe(4,2),vt(5,"span",2)(6,"span",3)),i&2&&A("mdc-button__ripple",!r._isFab)("mdc-fab__ripple",r._isFab)},styles:[`.mat-mdc-button-base {
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
`],encapsulation:2,changeDetection:0})}return t})();function FT(t){return t.hasAttribute("mat-raised-button")?"elevated":t.hasAttribute("mat-stroked-button")?"outlined":t.hasAttribute("mat-flat-button")?"filled":t.hasAttribute("mat-button")?"text":null}var PT=new y("mat-mdc-fab-default-options",{providedIn:"root",factory:()=>yh}),yh={color:"accent"},nC=(()=>{class t extends Ed{_options=c(PT,{optional:!0});_isFab=!0;extended=!1;constructor(){super(),this._options=this._options||yh,this.color=this._options.color||yh.color}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=R({type:t,selectors:[["button","mat-fab",""],["a","mat-fab",""],["button","matFab",""],["a","matFab",""]],hostAttrs:[1,"mdc-fab","mat-mdc-fab-base","mat-mdc-fab"],hostVars:4,hostBindings:function(i,r){i&2&&A("mdc-fab--extended",r.extended)("mat-mdc-extended-fab",r.extended)},inputs:{extended:[2,"extended","extended",U]},exportAs:["matButton","matAnchor"],features:[ve],attrs:NT,ngContentSelectors:tC,decls:7,vars:4,consts:[[1,"mat-mdc-button-persistent-ripple"],[1,"mdc-button__label"],[1,"mat-focus-indicator"],[1,"mat-mdc-button-touch-target"]],template:function(i,r){i&1&&(Se(eC),vt(0,"span",0),oe(1),Pe(2,"span",1),oe(3,1),je(),oe(4,2),vt(5,"span",2)(6,"span",3)),i&2&&A("mdc-button__ripple",!r._isFab)("mdc-fab__ripple",r._isFab)},styles:[`.mat-mdc-fab-base {
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
`],encapsulation:2,changeDetection:0})}return t})();var Ht=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=Z({type:t});static \u0275inj=q({imports:[Li,he]})}return t})();var LT=20,Vi=(()=>{class t{_ngZone=c(P);_platform=c(pe);_renderer=c(Ke).createRenderer(null,null);_cleanupGlobalListener;constructor(){}_scrolled=new M;_scrolledCount=0;scrollContainers=new Map;register(e){this.scrollContainers.has(e)||this.scrollContainers.set(e,e.elementScrolled().subscribe(()=>this._scrolled.next(e)))}deregister(e){let i=this.scrollContainers.get(e);i&&(i.unsubscribe(),this.scrollContainers.delete(e))}scrolled(e=LT){return this._platform.isBrowser?new ue(i=>{this._cleanupGlobalListener||(this._cleanupGlobalListener=this._ngZone.runOutsideAngular(()=>this._renderer.listen("document","scroll",()=>this._scrolled.next())));let r=e>0?this._scrolled.pipe(Sl(e)).subscribe(i):this._scrolled.subscribe(i);return this._scrolledCount++,()=>{r.unsubscribe(),this._scrolledCount--,this._scrolledCount||(this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0)}}):He()}ngOnDestroy(){this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0,this.scrollContainers.forEach((e,i)=>this.deregister(i)),this._scrolled.complete()}ancestorScrolled(e,i){let r=this.getAncestorScrollContainers(e);return this.scrolled(i).pipe(Ne(o=>!o||r.indexOf(o)>-1))}getAncestorScrollContainers(e){let i=[];return this.scrollContainers.forEach((r,o)=>{this._scrollableContainsElement(o,e)&&i.push(o)}),i}_scrollableContainsElement(e,i){let r=Bt(i),o=e.getElementRef().nativeElement;do if(r==o)return!0;while(r=r.parentElement);return!1}static \u0275fac=function(i){return new(i||t)};static \u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),Ch=(()=>{class t{elementRef=c(L);scrollDispatcher=c(Vi);ngZone=c(P);dir=c(Ue,{optional:!0});_scrollElement=this.elementRef.nativeElement;_destroyed=new M;_renderer=c(Te);_cleanupScroll;_elementScrolled=new M;constructor(){}ngOnInit(){this._cleanupScroll=this.ngZone.runOutsideAngular(()=>this._renderer.listen(this._scrollElement,"scroll",e=>this._elementScrolled.next(e))),this.scrollDispatcher.register(this)}ngOnDestroy(){this._cleanupScroll?.(),this._elementScrolled.complete(),this.scrollDispatcher.deregister(this),this._destroyed.next(),this._destroyed.complete()}elementScrolled(){return this._elementScrolled}getElementRef(){return this.elementRef}scrollTo(e){let i=this.elementRef.nativeElement,r=this.dir&&this.dir.value=="rtl";e.left==null&&(e.left=r?e.end:e.start),e.right==null&&(e.right=r?e.start:e.end),e.bottom!=null&&(e.top=i.scrollHeight-i.clientHeight-e.bottom),r&&Vo()!=Tn.NORMAL?(e.left!=null&&(e.right=i.scrollWidth-i.clientWidth-e.left),Vo()==Tn.INVERTED?e.left=e.right:Vo()==Tn.NEGATED&&(e.left=e.right?-e.right:e.right)):e.right!=null&&(e.left=i.scrollWidth-i.clientWidth-e.right),this._applyScrollToOptions(e)}_applyScrollToOptions(e){let i=this.elementRef.nativeElement;xd()?i.scrollTo(e):(e.top!=null&&(i.scrollTop=e.top),e.left!=null&&(i.scrollLeft=e.left))}measureScrollOffset(e){let i="left",r="right",o=this.elementRef.nativeElement;if(e=="top")return o.scrollTop;if(e=="bottom")return o.scrollHeight-o.clientHeight-o.scrollTop;let a=this.dir&&this.dir.value=="rtl";return e=="start"?e=a?r:i:e=="end"&&(e=a?i:r),a&&Vo()==Tn.INVERTED?e==i?o.scrollWidth-o.clientWidth-o.scrollLeft:o.scrollLeft:a&&Vo()==Tn.NEGATED?e==i?o.scrollLeft+o.scrollWidth-o.clientWidth:-o.scrollLeft:e==i?o.scrollLeft:o.scrollWidth-o.clientWidth-o.scrollLeft}static \u0275fac=function(i){return new(i||t)};static \u0275dir=$({type:t,selectors:[["","cdk-scrollable",""],["","cdkScrollable",""]]})}return t})(),VT=20,ci=(()=>{class t{_platform=c(pe);_listeners;_viewportSize=null;_change=new M;_document=c(K);constructor(){let e=c(P),i=c(Ke).createRenderer(null,null);e.runOutsideAngular(()=>{if(this._platform.isBrowser){let r=o=>this._change.next(o);this._listeners=[i.listen("window","resize",r),i.listen("window","orientationchange",r)]}this.change().subscribe(()=>this._viewportSize=null)})}ngOnDestroy(){this._listeners?.forEach(e=>e()),this._change.complete()}getViewportSize(){this._viewportSize||this._updateViewportSize();let e={width:this._viewportSize.width,height:this._viewportSize.height};return this._platform.isBrowser||(this._viewportSize=null),e}getViewportRect(){let e=this.getViewportScrollPosition(),{width:i,height:r}=this.getViewportSize();return{top:e.top,left:e.left,bottom:e.top+r,right:e.left+i,height:r,width:i}}getViewportScrollPosition(){if(!this._platform.isBrowser)return{top:0,left:0};let e=this._document,i=this._getWindow(),r=e.documentElement,o=r.getBoundingClientRect(),a=-o.top||e.body?.scrollTop||i.scrollY||r.scrollTop||0,s=-o.left||e.body?.scrollLeft||i.scrollX||r.scrollLeft||0;return{top:a,left:s}}change(e=VT){return e>0?this._change.pipe(Sl(e)):this._change}_getWindow(){return this._document.defaultView||window}_updateViewportSize(){let e=this._getWindow();this._viewportSize=this._platform.isBrowser?{width:e.innerWidth,height:e.innerHeight}:{width:0,height:0}}static \u0275fac=function(i){return new(i||t)};static \u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Rn=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=Z({type:t});static \u0275inj=q({})}return t})(),Dh=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=Z({type:t});static \u0275inj=q({imports:[he,Rn,he,Rn]})}return t})();var Es=class{_attachedHost=null;attach(n){return this._attachedHost=n,n.attach(this)}detach(){let n=this._attachedHost;n!=null&&(this._attachedHost=null,n.detach())}get isAttached(){return this._attachedHost!=null}setAttachedHost(n){this._attachedHost=n}},Ut=class extends Es{component;viewContainerRef;injector;projectableNodes;bindings;constructor(n,e,i,r,o){super(),this.component=n,this.viewContainerRef=e,this.injector=i,this.projectableNodes=r,this.bindings=o||null}},on=class extends Es{templateRef;viewContainerRef;context;injector;constructor(n,e,i,r){super(),this.templateRef=n,this.viewContainerRef=e,this.context=i,this.injector=r}get origin(){return this.templateRef.elementRef}attach(n,e=this.context){return this.context=e,super.attach(n)}detach(){return this.context=void 0,super.detach()}},xh=class extends Es{element;constructor(n){super(),this.element=n instanceof L?n.nativeElement:n}},Bi=class{_attachedPortal=null;_disposeFn=null;_isDisposed=!1;hasAttached(){return!!this._attachedPortal}attach(n){if(n instanceof Ut)return this._attachedPortal=n,this.attachComponentPortal(n);if(n instanceof on)return this._attachedPortal=n,this.attachTemplatePortal(n);if(this.attachDomPortal&&n instanceof xh)return this._attachedPortal=n,this.attachDomPortal(n)}attachDomPortal=null;detach(){this._attachedPortal&&(this._attachedPortal.setAttachedHost(null),this._attachedPortal=null),this._invokeDisposeFn()}dispose(){this.hasAttached()&&this.detach(),this._invokeDisposeFn(),this._isDisposed=!0}setDisposeFn(n){this._disposeFn=n}_invokeDisposeFn(){this._disposeFn&&(this._disposeFn(),this._disposeFn=null)}},Ms=class extends Bi{outletElement;_appRef;_defaultInjector;constructor(n,e,i){super(),this.outletElement=n,this._appRef=e,this._defaultInjector=i}attachComponentPortal(n){let e;if(n.viewContainerRef){let i=n.injector||n.viewContainerRef.injector,r=i.get(Ti,null,{optional:!0})||void 0;e=n.viewContainerRef.createComponent(n.component,{index:n.viewContainerRef.length,injector:i,ngModuleRef:r,projectableNodes:n.projectableNodes||void 0,bindings:n.bindings||void 0}),this.setDisposeFn(()=>e.destroy())}else{let i=this._appRef,r=n.injector||this._defaultInjector||Y.NULL,o=r.get(Ge,i.injector);e=Kc(n.component,{elementInjector:r,environmentInjector:o,projectableNodes:n.projectableNodes||void 0,bindings:n.bindings||void 0}),i.attachView(e.hostView),this.setDisposeFn(()=>{i.viewCount>0&&i.detachView(e.hostView),e.destroy()})}return this.outletElement.appendChild(this._getComponentRootNode(e)),this._attachedPortal=n,e}attachTemplatePortal(n){let e=n.viewContainerRef,i=e.createEmbeddedView(n.templateRef,n.context,{injector:n.injector});return i.rootNodes.forEach(r=>this.outletElement.appendChild(r)),i.detectChanges(),this.setDisposeFn(()=>{let r=e.indexOf(i);r!==-1&&e.remove(r)}),this._attachedPortal=n,i}attachDomPortal=n=>{let e=n.element;e.parentNode;let i=this.outletElement.ownerDocument.createComment("dom-portal");e.parentNode.insertBefore(i,e),this.outletElement.appendChild(e),this._attachedPortal=n,super.setDisposeFn(()=>{i.parentNode&&i.parentNode.replaceChild(e,i)})};dispose(){super.dispose(),this.outletElement.remove()}_getComponentRootNode(n){return n.hostView.rootNodes[0]}};var On=(()=>{class t extends Bi{_moduleRef=c(Ti,{optional:!0});_document=c(K);_viewContainerRef=c(bt);_isInitialized=!1;_attachedRef=null;constructor(){super()}get portal(){return this._attachedPortal}set portal(e){this.hasAttached()&&!e&&!this._isInitialized||(this.hasAttached()&&super.detach(),e&&super.attach(e),this._attachedPortal=e||null)}attached=new S;get attachedRef(){return this._attachedRef}ngOnInit(){this._isInitialized=!0}ngOnDestroy(){super.dispose(),this._attachedRef=this._attachedPortal=null}attachComponentPortal(e){e.setAttachedHost(this);let i=e.viewContainerRef!=null?e.viewContainerRef:this._viewContainerRef,r=i.createComponent(e.component,{index:i.length,injector:e.injector||i.injector,projectableNodes:e.projectableNodes||void 0,ngModuleRef:this._moduleRef||void 0,bindings:e.bindings||void 0});return i!==this._viewContainerRef&&this._getRootNode().appendChild(r.hostView.rootNodes[0]),super.setDisposeFn(()=>r.destroy()),this._attachedPortal=e,this._attachedRef=r,this.attached.emit(r),r}attachTemplatePortal(e){e.setAttachedHost(this);let i=this._viewContainerRef.createEmbeddedView(e.templateRef,e.context,{injector:e.injector});return super.setDisposeFn(()=>this._viewContainerRef.clear()),this._attachedPortal=e,this._attachedRef=i,this.attached.emit(i),i}attachDomPortal=e=>{let i=e.element;i.parentNode;let r=this._document.createComment("dom-portal");e.setAttachedHost(this),i.parentNode.insertBefore(r,i),this._getRootNode().appendChild(i),this._attachedPortal=e,super.setDisposeFn(()=>{r.parentNode&&r.parentNode.replaceChild(i,r)})};_getRootNode(){let e=this._viewContainerRef.element.nativeElement;return e.nodeType===e.ELEMENT_NODE?e:e.parentNode}static \u0275fac=function(i){return new(i||t)};static \u0275dir=$({type:t,selectors:[["","cdkPortalOutlet",""]],inputs:{portal:[0,"cdkPortalOutlet","portal"]},outputs:{attached:"attached"},exportAs:["cdkPortalOutlet"],features:[ve]})}return t})(),Gn=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=Z({type:t});static \u0275inj=q({})}return t})();var iC=xd();function Hr(t){return new Md(t.get(ci),t.get(K))}var Md=class{_viewportRuler;_previousHTMLStyles={top:"",left:""};_previousScrollPosition;_isEnabled=!1;_document;constructor(n,e){this._viewportRuler=n,this._document=e}attach(){}enable(){if(this._canBeEnabled()){let n=this._document.documentElement;this._previousScrollPosition=this._viewportRuler.getViewportScrollPosition(),this._previousHTMLStyles.left=n.style.left||"",this._previousHTMLStyles.top=n.style.top||"",n.style.left=Ze(-this._previousScrollPosition.left),n.style.top=Ze(-this._previousScrollPosition.top),n.classList.add("cdk-global-scrollblock"),this._isEnabled=!0}}disable(){if(this._isEnabled){let n=this._document.documentElement,e=this._document.body,i=n.style,r=e.style,o=i.scrollBehavior||"",a=r.scrollBehavior||"";this._isEnabled=!1,i.left=this._previousHTMLStyles.left,i.top=this._previousHTMLStyles.top,n.classList.remove("cdk-global-scrollblock"),iC&&(i.scrollBehavior=r.scrollBehavior="auto"),window.scroll(this._previousScrollPosition.left,this._previousScrollPosition.top),iC&&(i.scrollBehavior=o,r.scrollBehavior=a)}}_canBeEnabled(){if(this._document.documentElement.classList.contains("cdk-global-scrollblock")||this._isEnabled)return!1;let e=this._document.documentElement,i=this._viewportRuler.getViewportSize();return e.scrollHeight>i.height||e.scrollWidth>i.width}};function dC(t,n){return new Id(t.get(Vi),t.get(P),t.get(ci),n)}var Id=class{_scrollDispatcher;_ngZone;_viewportRuler;_config;_scrollSubscription=null;_overlayRef;_initialScrollPosition;constructor(n,e,i,r){this._scrollDispatcher=n,this._ngZone=e,this._viewportRuler=i,this._config=r}attach(n){this._overlayRef,this._overlayRef=n}enable(){if(this._scrollSubscription)return;let n=this._scrollDispatcher.scrolled(0).pipe(Ne(e=>!e||!this._overlayRef.overlayElement.contains(e.getElementRef().nativeElement)));this._config&&this._config.threshold&&this._config.threshold>1?(this._initialScrollPosition=this._viewportRuler.getViewportScrollPosition().top,this._scrollSubscription=n.subscribe(()=>{let e=this._viewportRuler.getViewportScrollPosition().top;Math.abs(e-this._initialScrollPosition)>this._config.threshold?this._detach():this._overlayRef.updatePosition()})):this._scrollSubscription=n.subscribe(this._detach)}disable(){this._scrollSubscription&&(this._scrollSubscription.unsubscribe(),this._scrollSubscription=null)}detach(){this.disable(),this._overlayRef=null}_detach=()=>{this.disable(),this._overlayRef.hasAttached()&&this._ngZone.run(()=>this._overlayRef.detach())}};var Is=class{enable(){}disable(){}attach(){}};function wh(t,n){return n.some(e=>{let i=t.bottom<e.top,r=t.top>e.bottom,o=t.right<e.left,a=t.left>e.right;return i||r||o||a})}function rC(t,n){return n.some(e=>{let i=t.top<e.top,r=t.bottom>e.bottom,o=t.left<e.left,a=t.right>e.right;return i||r||o||a})}function Yn(t,n){return new Sd(t.get(Vi),t.get(ci),t.get(P),n)}var Sd=class{_scrollDispatcher;_viewportRuler;_ngZone;_config;_scrollSubscription=null;_overlayRef;constructor(n,e,i,r){this._scrollDispatcher=n,this._viewportRuler=e,this._ngZone=i,this._config=r}attach(n){this._overlayRef,this._overlayRef=n}enable(){if(!this._scrollSubscription){let n=this._config?this._config.scrollThrottle:0;this._scrollSubscription=this._scrollDispatcher.scrolled(n).subscribe(()=>{if(this._overlayRef.updatePosition(),this._config&&this._config.autoClose){let e=this._overlayRef.overlayElement.getBoundingClientRect(),{width:i,height:r}=this._viewportRuler.getViewportSize();wh(e,[{width:i,height:r,bottom:r,right:i,top:0,left:0}])&&(this.disable(),this._ngZone.run(()=>this._overlayRef.detach()))}})}}disable(){this._scrollSubscription&&(this._scrollSubscription.unsubscribe(),this._scrollSubscription=null)}detach(){this.disable(),this._overlayRef=null}},uC=(()=>{class t{_injector=c(Y);constructor(){}noop=()=>new Is;close=e=>dC(this._injector,e);block=()=>Hr(this._injector);reposition=e=>Yn(this._injector,e);static \u0275fac=function(i){return new(i||t)};static \u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),an=class{positionStrategy;scrollStrategy=new Is;panelClass="";hasBackdrop=!1;backdropClass="cdk-overlay-dark-backdrop";disableAnimations;width;height;minWidth;minHeight;maxWidth;maxHeight;direction;disposeOnNavigation=!1;usePopover;eventPredicate;constructor(n){if(n){let e=Object.keys(n);for(let i of e)n[i]!==void 0&&(this[i]=n[i])}}};var kd=class{connectionPair;scrollableViewProperties;constructor(n,e){this.connectionPair=n,this.scrollableViewProperties=e}};var fC=(()=>{class t{_attachedOverlays=[];_document=c(K);_isAttached=!1;constructor(){}ngOnDestroy(){this.detach()}add(e){this.remove(e),this._attachedOverlays.push(e)}remove(e){let i=this._attachedOverlays.indexOf(e);i>-1&&this._attachedOverlays.splice(i,1),this._attachedOverlays.length===0&&this.detach()}canReceiveEvent(e,i,r){return r.observers.length<1?!1:e.eventPredicate?e.eventPredicate(i):!0}static \u0275fac=function(i){return new(i||t)};static \u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),mC=(()=>{class t extends fC{_ngZone=c(P);_renderer=c(Ke).createRenderer(null,null);_cleanupKeydown;add(e){super.add(e),this._isAttached||(this._ngZone.runOutsideAngular(()=>{this._cleanupKeydown=this._renderer.listen("body","keydown",this._keydownListener)}),this._isAttached=!0)}detach(){this._isAttached&&(this._cleanupKeydown?.(),this._isAttached=!1)}_keydownListener=e=>{let i=this._attachedOverlays;for(let r=i.length-1;r>-1;r--){let o=i[r];if(this.canReceiveEvent(o,e,o._keydownEvents)){this._ngZone.run(()=>o._keydownEvents.next(e));break}}};static \u0275fac=(()=>{let e;return function(r){return(e||(e=Vt(t)))(r||t)}})();static \u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),pC=(()=>{class t extends fC{_platform=c(pe);_ngZone=c(P);_renderer=c(Ke).createRenderer(null,null);_cursorOriginalValue;_cursorStyleIsSet=!1;_pointerDownEventTarget=null;_cleanups;add(e){if(super.add(e),!this._isAttached){let i=this._document.body,r={capture:!0},o=this._renderer;this._cleanups=this._ngZone.runOutsideAngular(()=>[o.listen(i,"pointerdown",this._pointerDownListener,r),o.listen(i,"click",this._clickListener,r),o.listen(i,"auxclick",this._clickListener,r),o.listen(i,"contextmenu",this._clickListener,r)]),this._platform.IOS&&!this._cursorStyleIsSet&&(this._cursorOriginalValue=i.style.cursor,i.style.cursor="pointer",this._cursorStyleIsSet=!0),this._isAttached=!0}}detach(){this._isAttached&&(this._cleanups?.forEach(e=>e()),this._cleanups=void 0,this._platform.IOS&&this._cursorStyleIsSet&&(this._document.body.style.cursor=this._cursorOriginalValue,this._cursorStyleIsSet=!1),this._isAttached=!1)}_pointerDownListener=e=>{this._pointerDownEventTarget=dt(e)};_clickListener=e=>{let i=dt(e),r=e.type==="click"&&this._pointerDownEventTarget?this._pointerDownEventTarget:i;this._pointerDownEventTarget=null;let o=this._attachedOverlays.slice();for(let a=o.length-1;a>-1;a--){let s=o[a],l=s._outsidePointerEvents;if(!(!s.hasAttached()||!this.canReceiveEvent(s,e,l))){if(oC(s.overlayElement,i)||oC(s.overlayElement,r))break;this._ngZone?this._ngZone.run(()=>l.next(e)):l.next(e)}}};static \u0275fac=(()=>{let e;return function(r){return(e||(e=Vt(t)))(r||t)}})();static \u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function oC(t,n){let e=typeof ShadowRoot<"u"&&ShadowRoot,i=n;for(;i;){if(i===t)return!0;i=e&&i instanceof ShadowRoot?i.host:i.parentNode}return!1}var hC=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275cmp=R({type:t,selectors:[["ng-component"]],hostAttrs:["cdk-overlay-style-loader",""],decls:0,vars:0,template:function(i,r){},styles:[`.cdk-overlay-container, .cdk-global-overlay-wrapper {
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
`],encapsulation:2,changeDetection:0})}return t})(),Ad=(()=>{class t{_platform=c(pe);_containerElement;_document=c(K);_styleLoader=c(Oe);constructor(){}ngOnDestroy(){this._containerElement?.remove()}getContainerElement(){return this._loadStyles(),this._containerElement||this._createContainer(),this._containerElement}_createContainer(){let e="cdk-overlay-container";if(this._platform.isBrowser||fh()){let r=this._document.querySelectorAll(`.${e}[platform="server"], .${e}[platform="test"]`);for(let o=0;o<r.length;o++)r[o].remove()}let i=this._document.createElement("div");i.classList.add(e),fh()?i.setAttribute("platform","test"):this._platform.isBrowser||i.setAttribute("platform","server"),this._document.body.appendChild(i),this._containerElement=i}_loadStyles(){this._styleLoader.load(hC)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),Eh=class{_renderer;_ngZone;element;_cleanupClick;_cleanupTransitionEnd;_fallbackTimeout;constructor(n,e,i,r){this._renderer=e,this._ngZone=i,this.element=n.createElement("div"),this.element.classList.add("cdk-overlay-backdrop"),this._cleanupClick=e.listen(this.element,"click",r)}detach(){this._ngZone.runOutsideAngular(()=>{let n=this.element;clearTimeout(this._fallbackTimeout),this._cleanupTransitionEnd?.(),this._cleanupTransitionEnd=this._renderer.listen(n,"transitionend",this.dispose),this._fallbackTimeout=setTimeout(this.dispose,500),n.style.pointerEvents="none",n.classList.remove("cdk-overlay-backdrop-showing")})}dispose=()=>{clearTimeout(this._fallbackTimeout),this._cleanupClick?.(),this._cleanupTransitionEnd?.(),this._cleanupClick=this._cleanupTransitionEnd=this._fallbackTimeout=void 0,this.element.remove()}};function Mh(t){return t&&t.nodeType===1}var jo=class{_portalOutlet;_host;_pane;_config;_ngZone;_keyboardDispatcher;_document;_location;_outsideClickDispatcher;_animationsDisabled;_injector;_renderer;_backdropClick=new M;_attachments=new M;_detachments=new M;_positionStrategy;_scrollStrategy;_locationChanges=ce.EMPTY;_backdropRef=null;_detachContentMutationObserver;_detachContentAfterRenderRef;_disposed=!1;_previousHostParent;_keydownEvents=new M;_outsidePointerEvents=new M;_afterNextRenderRef;constructor(n,e,i,r,o,a,s,l,d,u=!1,f,_){this._portalOutlet=n,this._host=e,this._pane=i,this._config=r,this._ngZone=o,this._keyboardDispatcher=a,this._document=s,this._location=l,this._outsideClickDispatcher=d,this._animationsDisabled=u,this._injector=f,this._renderer=_,r.scrollStrategy&&(this._scrollStrategy=r.scrollStrategy,this._scrollStrategy.attach(this)),this._positionStrategy=r.positionStrategy}get overlayElement(){return this._pane}get backdropElement(){return this._backdropRef?.element||null}get hostElement(){return this._host}get eventPredicate(){return this._config?.eventPredicate||null}attach(n){if(this._disposed)return null;this._attachHost();let e=this._portalOutlet.attach(n);return this._positionStrategy?.attach(this),this._updateStackingOrder(),this._updateElementSize(),this._updateElementDirection(),this._scrollStrategy&&this._scrollStrategy.enable(),this._afterNextRenderRef?.destroy(),this._afterNextRenderRef=Qe(()=>{this.hasAttached()&&this.updatePosition()},{injector:this._injector}),this._togglePointerEvents(!0),this._config.hasBackdrop&&this._attachBackdrop(),this._config.panelClass&&this._toggleClasses(this._pane,this._config.panelClass,!0),this._attachments.next(),this._completeDetachContent(),this._keyboardDispatcher.add(this),this._config.disposeOnNavigation&&(this._locationChanges=this._location.subscribe(()=>this.dispose())),this._outsideClickDispatcher.add(this),typeof e?.onDestroy=="function"&&e.onDestroy(()=>{this.hasAttached()&&this._ngZone.runOutsideAngular(()=>Promise.resolve().then(()=>this.detach()))}),e}detach(){if(!this.hasAttached())return;this.detachBackdrop(),this._togglePointerEvents(!1),this._positionStrategy&&this._positionStrategy.detach&&this._positionStrategy.detach(),this._scrollStrategy&&this._scrollStrategy.disable();let n=this._portalOutlet.detach();return this._detachments.next(),this._completeDetachContent(),this._keyboardDispatcher.remove(this),this._detachContentWhenEmpty(),this._locationChanges.unsubscribe(),this._outsideClickDispatcher.remove(this),n}dispose(){if(this._disposed)return;let n=this.hasAttached();this._positionStrategy&&this._positionStrategy.dispose(),this._disposeScrollStrategy(),this._backdropRef?.dispose(),this._locationChanges.unsubscribe(),this._keyboardDispatcher.remove(this),this._portalOutlet.dispose(),this._attachments.complete(),this._backdropClick.complete(),this._keydownEvents.complete(),this._outsidePointerEvents.complete(),this._outsideClickDispatcher.remove(this),this._host?.remove(),this._afterNextRenderRef?.destroy(),this._previousHostParent=this._pane=this._host=this._backdropRef=null,n&&this._detachments.next(),this._detachments.complete(),this._completeDetachContent(),this._disposed=!0}hasAttached(){return this._portalOutlet.hasAttached()}backdropClick(){return this._backdropClick}attachments(){return this._attachments}detachments(){return this._detachments}keydownEvents(){return this._keydownEvents}outsidePointerEvents(){return this._outsidePointerEvents}getConfig(){return this._config}updatePosition(){this._positionStrategy&&this._positionStrategy.apply()}updatePositionStrategy(n){n!==this._positionStrategy&&(this._positionStrategy&&this._positionStrategy.dispose(),this._positionStrategy=n,this.hasAttached()&&(n.attach(this),this.updatePosition()))}updateSize(n){this._config=I(I({},this._config),n),this._updateElementSize()}setDirection(n){this._config=se(I({},this._config),{direction:n}),this._updateElementDirection()}addPanelClass(n){this._pane&&this._toggleClasses(this._pane,n,!0)}removePanelClass(n){this._pane&&this._toggleClasses(this._pane,n,!1)}getDirection(){let n=this._config.direction;return n?typeof n=="string"?n:n.value:"ltr"}updateScrollStrategy(n){n!==this._scrollStrategy&&(this._disposeScrollStrategy(),this._scrollStrategy=n,this.hasAttached()&&(n.attach(this),n.enable()))}_updateElementDirection(){this._host.setAttribute("dir",this.getDirection())}_updateElementSize(){if(!this._pane)return;let n=this._pane.style;n.width=Ze(this._config.width),n.height=Ze(this._config.height),n.minWidth=Ze(this._config.minWidth),n.minHeight=Ze(this._config.minHeight),n.maxWidth=Ze(this._config.maxWidth),n.maxHeight=Ze(this._config.maxHeight)}_togglePointerEvents(n){this._pane.style.pointerEvents=n?"":"none"}_attachHost(){if(!this._host.parentElement){let n=this._config.usePopover?this._positionStrategy?.getPopoverInsertionPoint?.():null;Mh(n)?n.after(this._host):n?.type==="parent"?n.element.appendChild(this._host):this._previousHostParent?.appendChild(this._host)}if(this._config.usePopover)try{this._host.showPopover()}catch{}}_attachBackdrop(){let n="cdk-overlay-backdrop-showing";this._backdropRef?.dispose(),this._backdropRef=new Eh(this._document,this._renderer,this._ngZone,e=>{this._backdropClick.next(e)}),this._animationsDisabled&&this._backdropRef.element.classList.add("cdk-overlay-backdrop-noop-animation"),this._config.backdropClass&&this._toggleClasses(this._backdropRef.element,this._config.backdropClass,!0),this._config.usePopover?this._host.prepend(this._backdropRef.element):this._host.parentElement.insertBefore(this._backdropRef.element,this._host),!this._animationsDisabled&&typeof requestAnimationFrame<"u"?this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>this._backdropRef?.element.classList.add(n))}):this._backdropRef.element.classList.add(n)}_updateStackingOrder(){!this._config.usePopover&&this._host.nextSibling&&this._host.parentNode.appendChild(this._host)}detachBackdrop(){this._animationsDisabled?(this._backdropRef?.dispose(),this._backdropRef=null):this._backdropRef?.detach()}_toggleClasses(n,e,i){let r=Fo(e||[]).filter(o=>!!o);r.length&&(i?n.classList.add(...r):n.classList.remove(...r))}_detachContentWhenEmpty(){let n=!1;try{this._detachContentAfterRenderRef=Qe(()=>{n=!0,this._detachContent()},{injector:this._injector})}catch(e){if(n)throw e;this._detachContent()}globalThis.MutationObserver&&this._pane&&(this._detachContentMutationObserver||=new globalThis.MutationObserver(()=>{this._detachContent()}),this._detachContentMutationObserver.observe(this._pane,{childList:!0}))}_detachContent(){(!this._pane||!this._host||this._pane.children.length===0)&&(this._pane&&this._config.panelClass&&this._toggleClasses(this._pane,this._config.panelClass,!1),this._host&&this._host.parentElement&&(this._previousHostParent=this._host.parentElement,this._host.remove()),this._completeDetachContent())}_completeDetachContent(){this._detachContentAfterRenderRef?.destroy(),this._detachContentAfterRenderRef=void 0,this._detachContentMutationObserver?.disconnect()}_disposeScrollStrategy(){let n=this._scrollStrategy;n?.disable(),n?.detach?.()}},aC="cdk-overlay-connected-position-bounding-box",jT=/([A-Za-z%]+)$/;function ji(t,n){return new Ss(n,t.get(ci),t.get(K),t.get(pe),t.get(Ad))}var Ss=class{_viewportRuler;_document;_platform;_overlayContainer;_overlayRef;_isInitialRender=!1;_lastBoundingBoxSize={width:0,height:0};_isPushed=!1;_canPush=!0;_growAfterOpen=!1;_hasFlexibleDimensions=!0;_positionLocked=!1;_originRect;_overlayRect;_viewportRect;_containerRect;_viewportMargin=0;_scrollables=[];_preferredPositions=[];_origin;_pane;_isDisposed=!1;_boundingBox=null;_lastPosition=null;_lastScrollVisibility=null;_positionChanges=new M;_resizeSubscription=ce.EMPTY;_offsetX=0;_offsetY=0;_transformOriginSelector;_appliedPanelClasses=[];_previousPushAmount=null;_popoverLocation="global";positionChanges=this._positionChanges;get positions(){return this._preferredPositions}constructor(n,e,i,r,o){this._viewportRuler=e,this._document=i,this._platform=r,this._overlayContainer=o,this.setOrigin(n)}attach(n){this._overlayRef&&this._overlayRef,this._validatePositions(),n.hostElement.classList.add(aC),this._overlayRef=n,this._boundingBox=n.hostElement,this._pane=n.overlayElement,this._isDisposed=!1,this._isInitialRender=!0,this._lastPosition=null,this._resizeSubscription.unsubscribe(),this._resizeSubscription=this._viewportRuler.change().subscribe(()=>{this._isInitialRender=!0,this.apply()})}apply(){if(this._isDisposed||!this._platform.isBrowser)return;if(!this._isInitialRender&&this._positionLocked&&this._lastPosition){this.reapplyLastPosition();return}this._clearPanelClasses(),this._resetOverlayElementStyles(),this._resetBoundingBoxStyles(),this._viewportRect=this._getNarrowedViewportRect(),this._originRect=this._getOriginRect(),this._overlayRect=this._pane.getBoundingClientRect(),this._containerRect=this._getContainerRect();let n=this._originRect,e=this._overlayRect,i=this._viewportRect,r=this._containerRect,o=[],a;for(let s of this._preferredPositions){let l=this._getOriginPoint(n,r,s),d=this._getOverlayPoint(l,e,s),u=this._getOverlayFit(d,e,i,s);if(u.isCompletelyWithinViewport){this._isPushed=!1,this._applyPosition(s,l);return}if(this._canFitWithFlexibleDimensions(u,d,i)){o.push({position:s,origin:l,overlayRect:e,boundingBoxRect:this._calculateBoundingBoxRect(l,s)});continue}(!a||a.overlayFit.visibleArea<u.visibleArea)&&(a={overlayFit:u,overlayPoint:d,originPoint:l,position:s,overlayRect:e})}if(o.length){let s=null,l=-1;for(let d of o){let u=d.boundingBoxRect.width*d.boundingBoxRect.height*(d.position.weight||1);u>l&&(l=u,s=d)}this._isPushed=!1,this._applyPosition(s.position,s.origin);return}if(this._canPush){this._isPushed=!0,this._applyPosition(a.position,a.originPoint);return}this._applyPosition(a.position,a.originPoint)}detach(){this._clearPanelClasses(),this._lastPosition=null,this._previousPushAmount=null,this._resizeSubscription.unsubscribe()}dispose(){this._isDisposed||(this._boundingBox&&jr(this._boundingBox.style,{top:"",left:"",right:"",bottom:"",height:"",width:"",alignItems:"",justifyContent:""}),this._pane&&this._resetOverlayElementStyles(),this._overlayRef&&this._overlayRef.hostElement.classList.remove(aC),this.detach(),this._positionChanges.complete(),this._overlayRef=this._boundingBox=null,this._isDisposed=!0)}reapplyLastPosition(){if(this._isDisposed||!this._platform.isBrowser)return;let n=this._lastPosition;n?(this._originRect=this._getOriginRect(),this._overlayRect=this._pane.getBoundingClientRect(),this._viewportRect=this._getNarrowedViewportRect(),this._containerRect=this._getContainerRect(),this._applyPosition(n,this._getOriginPoint(this._originRect,this._containerRect,n))):this.apply()}withScrollableContainers(n){return this._scrollables=n,this}withPositions(n){return this._preferredPositions=n,n.indexOf(this._lastPosition)===-1&&(this._lastPosition=null),this._validatePositions(),this}withViewportMargin(n){return this._viewportMargin=n,this}withFlexibleDimensions(n=!0){return this._hasFlexibleDimensions=n,this}withGrowAfterOpen(n=!0){return this._growAfterOpen=n,this}withPush(n=!0){return this._canPush=n,this}withLockedPosition(n=!0){return this._positionLocked=n,this}setOrigin(n){return this._origin=n,this}withDefaultOffsetX(n){return this._offsetX=n,this}withDefaultOffsetY(n){return this._offsetY=n,this}withTransformOriginOn(n){return this._transformOriginSelector=n,this}withPopoverLocation(n){return this._popoverLocation=n,this}getPopoverInsertionPoint(){return this._popoverLocation==="global"?null:this._popoverLocation!=="inline"?this._popoverLocation:this._origin instanceof L?this._origin.nativeElement:Mh(this._origin)?this._origin:null}_getOriginPoint(n,e,i){let r;if(i.originX=="center")r=n.left+n.width/2;else{let a=this._isRtl()?n.right:n.left,s=this._isRtl()?n.left:n.right;r=i.originX=="start"?a:s}e.left<0&&(r-=e.left);let o;return i.originY=="center"?o=n.top+n.height/2:o=i.originY=="top"?n.top:n.bottom,e.top<0&&(o-=e.top),{x:r,y:o}}_getOverlayPoint(n,e,i){let r;i.overlayX=="center"?r=-e.width/2:i.overlayX==="start"?r=this._isRtl()?-e.width:0:r=this._isRtl()?0:-e.width;let o;return i.overlayY=="center"?o=-e.height/2:o=i.overlayY=="top"?0:-e.height,{x:n.x+r,y:n.y+o}}_getOverlayFit(n,e,i,r){let o=lC(e),{x:a,y:s}=n,l=this._getOffset(r,"x"),d=this._getOffset(r,"y");l&&(a+=l),d&&(s+=d);let u=0-a,f=a+o.width-i.width,_=0-s,g=s+o.height-i.height,C=this._subtractOverflows(o.width,u,f),F=this._subtractOverflows(o.height,_,g),z=C*F;return{visibleArea:z,isCompletelyWithinViewport:o.width*o.height===z,fitsInViewportVertically:F===o.height,fitsInViewportHorizontally:C==o.width}}_canFitWithFlexibleDimensions(n,e,i){if(this._hasFlexibleDimensions){let r=i.bottom-e.y,o=i.right-e.x,a=sC(this._overlayRef.getConfig().minHeight),s=sC(this._overlayRef.getConfig().minWidth),l=n.fitsInViewportVertically||a!=null&&a<=r,d=n.fitsInViewportHorizontally||s!=null&&s<=o;return l&&d}return!1}_pushOverlayOnScreen(n,e,i){if(this._previousPushAmount&&this._positionLocked)return{x:n.x+this._previousPushAmount.x,y:n.y+this._previousPushAmount.y};let r=lC(e),o=this._viewportRect,a=Math.max(n.x+r.width-o.width,0),s=Math.max(n.y+r.height-o.height,0),l=Math.max(o.top-i.top-n.y,0),d=Math.max(o.left-i.left-n.x,0),u=0,f=0;return r.width<=o.width?u=d||-a:u=n.x<this._getViewportMarginStart()?o.left-i.left-n.x:0,r.height<=o.height?f=l||-s:f=n.y<this._getViewportMarginTop()?o.top-i.top-n.y:0,this._previousPushAmount={x:u,y:f},{x:n.x+u,y:n.y+f}}_applyPosition(n,e){if(this._setTransformOrigin(n),this._setOverlayElementStyles(e,n),this._setBoundingBoxStyles(e,n),n.panelClass&&this._addPanelClasses(n.panelClass),this._positionChanges.observers.length){let i=this._getScrollVisibility();if(n!==this._lastPosition||!this._lastScrollVisibility||!HT(this._lastScrollVisibility,i)){let r=new kd(n,i);this._positionChanges.next(r)}this._lastScrollVisibility=i}this._lastPosition=n,this._isInitialRender=!1}_setTransformOrigin(n){if(!this._transformOriginSelector)return;let e=this._boundingBox.querySelectorAll(this._transformOriginSelector),i,r=n.overlayY;n.overlayX==="center"?i="center":this._isRtl()?i=n.overlayX==="start"?"right":"left":i=n.overlayX==="start"?"left":"right";for(let o=0;o<e.length;o++)e[o].style.transformOrigin=`${i} ${r}`}_calculateBoundingBoxRect(n,e){let i=this._viewportRect,r=this._isRtl(),o,a,s;if(e.overlayY==="top")a=n.y,o=i.height-a+this._getViewportMarginBottom();else if(e.overlayY==="bottom")s=i.height-n.y+this._getViewportMarginTop()+this._getViewportMarginBottom(),o=i.height-s+this._getViewportMarginTop();else{let g=Math.min(i.bottom-n.y+i.top,n.y),C=this._lastBoundingBoxSize.height;o=g*2,a=n.y-g,o>C&&!this._isInitialRender&&!this._growAfterOpen&&(a=n.y-C/2)}let l=e.overlayX==="start"&&!r||e.overlayX==="end"&&r,d=e.overlayX==="end"&&!r||e.overlayX==="start"&&r,u,f,_;if(d)_=i.width-n.x+this._getViewportMarginStart()+this._getViewportMarginEnd(),u=n.x-this._getViewportMarginStart();else if(l)f=n.x,u=i.right-n.x-this._getViewportMarginEnd();else{let g=Math.min(i.right-n.x+i.left,n.x),C=this._lastBoundingBoxSize.width;u=g*2,f=n.x-g,u>C&&!this._isInitialRender&&!this._growAfterOpen&&(f=n.x-C/2)}return{top:a,left:f,bottom:s,right:_,width:u,height:o}}_setBoundingBoxStyles(n,e){let i=this._calculateBoundingBoxRect(n,e);!this._isInitialRender&&!this._growAfterOpen&&(i.height=Math.min(i.height,this._lastBoundingBoxSize.height),i.width=Math.min(i.width,this._lastBoundingBoxSize.width));let r={};if(this._hasExactPosition())r.top=r.left="0",r.bottom=r.right="auto",r.maxHeight=r.maxWidth="",r.width=r.height="100%";else{let o=this._overlayRef.getConfig().maxHeight,a=this._overlayRef.getConfig().maxWidth;r.width=Ze(i.width),r.height=Ze(i.height),r.top=Ze(i.top)||"auto",r.bottom=Ze(i.bottom)||"auto",r.left=Ze(i.left)||"auto",r.right=Ze(i.right)||"auto",e.overlayX==="center"?r.alignItems="center":r.alignItems=e.overlayX==="end"?"flex-end":"flex-start",e.overlayY==="center"?r.justifyContent="center":r.justifyContent=e.overlayY==="bottom"?"flex-end":"flex-start",o&&(r.maxHeight=Ze(o)),a&&(r.maxWidth=Ze(a))}this._lastBoundingBoxSize=i,jr(this._boundingBox.style,r)}_resetBoundingBoxStyles(){jr(this._boundingBox.style,{top:"0",left:"0",right:"0",bottom:"0",height:"",width:"",alignItems:"",justifyContent:""})}_resetOverlayElementStyles(){jr(this._pane.style,{top:"",left:"",bottom:"",right:"",position:"",transform:""})}_setOverlayElementStyles(n,e){let i={},r=this._hasExactPosition(),o=this._hasFlexibleDimensions,a=this._overlayRef.getConfig();if(r){let u=this._viewportRuler.getViewportScrollPosition();jr(i,this._getExactOverlayY(e,n,u)),jr(i,this._getExactOverlayX(e,n,u))}else i.position="static";let s="",l=this._getOffset(e,"x"),d=this._getOffset(e,"y");l&&(s+=`translateX(${l}px) `),d&&(s+=`translateY(${d}px)`),i.transform=s.trim(),a.maxHeight&&(r?i.maxHeight=Ze(a.maxHeight):o&&(i.maxHeight="")),a.maxWidth&&(r?i.maxWidth=Ze(a.maxWidth):o&&(i.maxWidth="")),jr(this._pane.style,i)}_getExactOverlayY(n,e,i){let r={top:"",bottom:""},o=this._getOverlayPoint(e,this._overlayRect,n);if(this._isPushed&&(o=this._pushOverlayOnScreen(o,this._overlayRect,i)),n.overlayY==="bottom"){let a=this._document.documentElement.clientHeight;r.bottom=`${a-(o.y+this._overlayRect.height)}px`}else r.top=Ze(o.y);return r}_getExactOverlayX(n,e,i){let r={left:"",right:""},o=this._getOverlayPoint(e,this._overlayRect,n);this._isPushed&&(o=this._pushOverlayOnScreen(o,this._overlayRect,i));let a;if(this._isRtl()?a=n.overlayX==="end"?"left":"right":a=n.overlayX==="end"?"right":"left",a==="right"){let s=this._document.documentElement.clientWidth;r.right=`${s-(o.x+this._overlayRect.width)}px`}else r.left=Ze(o.x);return r}_getScrollVisibility(){let n=this._getOriginRect(),e=this._pane.getBoundingClientRect(),i=this._scrollables.map(r=>r.getElementRef().nativeElement.getBoundingClientRect());return{isOriginClipped:rC(n,i),isOriginOutsideView:wh(n,i),isOverlayClipped:rC(e,i),isOverlayOutsideView:wh(e,i)}}_subtractOverflows(n,...e){return e.reduce((i,r)=>i-Math.max(r,0),n)}_getNarrowedViewportRect(){let n=this._document.documentElement.clientWidth,e=this._document.documentElement.clientHeight,i=this._viewportRuler.getViewportScrollPosition();return{top:i.top+this._getViewportMarginTop(),left:i.left+this._getViewportMarginStart(),right:i.left+n-this._getViewportMarginEnd(),bottom:i.top+e-this._getViewportMarginBottom(),width:n-this._getViewportMarginStart()-this._getViewportMarginEnd(),height:e-this._getViewportMarginTop()-this._getViewportMarginBottom()}}_isRtl(){return this._overlayRef.getDirection()==="rtl"}_hasExactPosition(){return!this._hasFlexibleDimensions||this._isPushed}_getOffset(n,e){return e==="x"?n.offsetX==null?this._offsetX:n.offsetX:n.offsetY==null?this._offsetY:n.offsetY}_validatePositions(){}_addPanelClasses(n){this._pane&&Fo(n).forEach(e=>{e!==""&&this._appliedPanelClasses.indexOf(e)===-1&&(this._appliedPanelClasses.push(e),this._pane.classList.add(e))})}_clearPanelClasses(){this._pane&&(this._appliedPanelClasses.forEach(n=>{this._pane.classList.remove(n)}),this._appliedPanelClasses=[])}_getViewportMarginStart(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.start??0}_getViewportMarginEnd(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.end??0}_getViewportMarginTop(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.top??0}_getViewportMarginBottom(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.bottom??0}_getOriginRect(){let n=this._origin;if(n instanceof L)return n.nativeElement.getBoundingClientRect();if(n instanceof Element)return n.getBoundingClientRect();let e=n.width||0,i=n.height||0;return{top:n.y,bottom:n.y+i,left:n.x,right:n.x+e,height:i,width:e}}_getContainerRect(){let n=this._overlayRef.getConfig().usePopover&&this._popoverLocation!=="global",e=this._overlayContainer.getContainerElement();n&&(e.style.display="block");let i=e.getBoundingClientRect();return n&&(e.style.display=""),i}};function jr(t,n){for(let e in n)n.hasOwnProperty(e)&&(t[e]=n[e]);return t}function sC(t){if(typeof t!="number"&&t!=null){let[n,e]=t.split(jT);return!e||e==="px"?parseFloat(n):null}return t||null}function lC(t){return{top:Math.floor(t.top),right:Math.floor(t.right),bottom:Math.floor(t.bottom),left:Math.floor(t.left),width:Math.floor(t.width),height:Math.floor(t.height)}}function HT(t,n){return t===n?!0:t.isOriginClipped===n.isOriginClipped&&t.isOriginOutsideView===n.isOriginOutsideView&&t.isOverlayClipped===n.isOverlayClipped&&t.isOverlayOutsideView===n.isOverlayOutsideView}var cC="cdk-global-overlay-wrapper";function di(t){return new Td}var Td=class{_overlayRef;_cssPosition="static";_topOffset="";_bottomOffset="";_alignItems="";_xPosition="";_xOffset="";_width="";_height="";_isDisposed=!1;attach(n){let e=n.getConfig();this._overlayRef=n,this._width&&!e.width&&n.updateSize({width:this._width}),this._height&&!e.height&&n.updateSize({height:this._height}),n.hostElement.classList.add(cC),this._isDisposed=!1}top(n=""){return this._bottomOffset="",this._topOffset=n,this._alignItems="flex-start",this}left(n=""){return this._xOffset=n,this._xPosition="left",this}bottom(n=""){return this._topOffset="",this._bottomOffset=n,this._alignItems="flex-end",this}right(n=""){return this._xOffset=n,this._xPosition="right",this}start(n=""){return this._xOffset=n,this._xPosition="start",this}end(n=""){return this._xOffset=n,this._xPosition="end",this}width(n=""){return this._overlayRef?this._overlayRef.updateSize({width:n}):this._width=n,this}height(n=""){return this._overlayRef?this._overlayRef.updateSize({height:n}):this._height=n,this}centerHorizontally(n=""){return this.left(n),this._xPosition="center",this}centerVertically(n=""){return this.top(n),this._alignItems="center",this}apply(){if(!this._overlayRef||!this._overlayRef.hasAttached())return;let n=this._overlayRef.overlayElement.style,e=this._overlayRef.hostElement.style,i=this._overlayRef.getConfig(),{width:r,height:o,maxWidth:a,maxHeight:s}=i,l=(r==="100%"||r==="100vw")&&(!a||a==="100%"||a==="100vw"),d=(o==="100%"||o==="100vh")&&(!s||s==="100%"||s==="100vh"),u=this._xPosition,f=this._xOffset,_=this._overlayRef.getConfig().direction==="rtl",g="",C="",F="";l?F="flex-start":u==="center"?(F="center",_?C=f:g=f):_?u==="left"||u==="end"?(F="flex-end",g=f):(u==="right"||u==="start")&&(F="flex-start",C=f):u==="left"||u==="start"?(F="flex-start",g=f):(u==="right"||u==="end")&&(F="flex-end",C=f),n.position=this._cssPosition,n.marginLeft=l?"0":g,n.marginTop=d?"0":this._topOffset,n.marginBottom=this._bottomOffset,n.marginRight=l?"0":C,e.justifyContent=F,e.alignItems=d?"flex-start":this._alignItems}dispose(){if(this._isDisposed||!this._overlayRef)return;let n=this._overlayRef.overlayElement.style,e=this._overlayRef.hostElement,i=e.style;e.classList.remove(cC),i.justifyContent=i.alignItems=n.marginTop=n.marginBottom=n.marginLeft=n.marginRight=n.position="",this._overlayRef=null,this._isDisposed=!0}},gC=(()=>{class t{_injector=c(Y);constructor(){}global(){return di()}flexibleConnectedTo(e){return ji(this._injector,e)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),ks=new y("OVERLAY_DEFAULT_CONFIG");function sn(t,n){t.get(Oe).load(hC);let e=t.get(Ad),i=t.get(K),r=t.get(ye),o=t.get(Zt),a=t.get(Ue),s=t.get(Te,null,{optional:!0})||t.get(Ke).createRenderer(null,null),l=new an(n),d=t.get(ks,null,{optional:!0})?.usePopover??!0;l.direction=l.direction||a.value,"showPopover"in i.body?l.usePopover=n?.usePopover??d:l.usePopover=!1;let u=i.createElement("div"),f=i.createElement("div");u.id=r.getId("cdk-overlay-"),u.classList.add("cdk-overlay-pane"),f.appendChild(u),l.usePopover&&(f.setAttribute("popover","manual"),f.classList.add("cdk-overlay-popover"));let _=l.usePopover?l.positionStrategy?.getPopoverInsertionPoint?.():null;return Mh(_)?_.after(f):_?.type==="parent"?_.element.appendChild(f):e.getContainerElement().appendChild(f),new jo(new Ms(u,o,t),f,u,l,t.get(P),t.get(mC),i,t.get(Xc),t.get(pC),n?.disableAnimations??t.get(Ya,null,{optional:!0})==="NoopAnimations",t.get(Ge),s)}var _C=(()=>{class t{scrollStrategies=c(uC);_positionBuilder=c(gC);_injector=c(Y);constructor(){}create(e){return sn(this._injector,e)}position(){return this._positionBuilder}static \u0275fac=function(i){return new(i||t)};static \u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),UT=[{originX:"start",originY:"bottom",overlayX:"start",overlayY:"top"},{originX:"start",originY:"top",overlayX:"start",overlayY:"bottom"},{originX:"end",originY:"top",overlayX:"end",overlayY:"bottom"},{originX:"end",originY:"bottom",overlayX:"end",overlayY:"top"}],zT=new y("cdk-connected-overlay-scroll-strategy",{providedIn:"root",factory:()=>{let t=c(Y);return()=>Yn(t)}}),Ho=(()=>{class t{elementRef=c(L);constructor(){}static \u0275fac=function(i){return new(i||t)};static \u0275dir=$({type:t,selectors:[["","cdk-overlay-origin",""],["","overlay-origin",""],["","cdkOverlayOrigin",""]],exportAs:["cdkOverlayOrigin"]})}return t})(),bC=new y("cdk-connected-overlay-default-config"),Rd=(()=>{class t{_dir=c(Ue,{optional:!0});_injector=c(Y);_overlayRef;_templatePortal;_backdropSubscription=ce.EMPTY;_attachSubscription=ce.EMPTY;_detachSubscription=ce.EMPTY;_positionSubscription=ce.EMPTY;_offsetX;_offsetY;_position;_scrollStrategyFactory=c(zT);_ngZone=c(P);origin;positions;positionStrategy;get offsetX(){return this._offsetX}set offsetX(e){this._offsetX=e,this._position&&this._updatePositionStrategy(this._position)}get offsetY(){return this._offsetY}set offsetY(e){this._offsetY=e,this._position&&this._updatePositionStrategy(this._position)}width;height;minWidth;minHeight;backdropClass;panelClass;viewportMargin=0;scrollStrategy;open=!1;disableClose=!1;transformOriginSelector;hasBackdrop=!1;lockPosition=!1;flexibleDimensions=!1;growAfterOpen=!1;push=!1;disposeOnNavigation=!1;usePopover;matchWidth=!1;set _config(e){typeof e!="string"&&this._assignConfig(e)}backdropClick=new S;positionChange=new S;attach=new S;detach=new S;overlayKeydown=new S;overlayOutsideClick=new S;constructor(){let e=c(st),i=c(bt),r=c(bC,{optional:!0}),o=c(ks,{optional:!0});this.usePopover=o?.usePopover===!1?null:"global",this._templatePortal=new on(e,i),this.scrollStrategy=this._scrollStrategyFactory(),r&&this._assignConfig(r)}get overlayRef(){return this._overlayRef}get dir(){return this._dir?this._dir.value:"ltr"}ngOnDestroy(){this._attachSubscription.unsubscribe(),this._detachSubscription.unsubscribe(),this._backdropSubscription.unsubscribe(),this._positionSubscription.unsubscribe(),this._overlayRef?.dispose()}ngOnChanges(e){this._position&&(this._updatePositionStrategy(this._position),this._overlayRef?.updateSize({width:this._getWidth(),minWidth:this.minWidth,height:this.height,minHeight:this.minHeight}),e.origin&&this.open&&this._position.apply()),e.open&&(this.open?this.attachOverlay():this.detachOverlay())}_createOverlay(){(!this.positions||!this.positions.length)&&(this.positions=UT);let e=this._overlayRef=sn(this._injector,this._buildConfig());this._attachSubscription=e.attachments().subscribe(()=>this.attach.emit()),this._detachSubscription=e.detachments().subscribe(()=>this.detach.emit()),e.keydownEvents().subscribe(i=>{this.overlayKeydown.next(i),i.keyCode===27&&!this.disableClose&&!$e(i)&&(i.preventDefault(),this.detachOverlay())}),this._overlayRef.outsidePointerEvents().subscribe(i=>{let r=this._getOriginElement(),o=dt(i);(!r||r!==o&&!r.contains(o))&&this.overlayOutsideClick.next(i)})}_buildConfig(){let e=this._position=this.positionStrategy||this._createPositionStrategy(),i=new an({direction:this._dir||"ltr",positionStrategy:e,scrollStrategy:this.scrollStrategy,hasBackdrop:this.hasBackdrop,disposeOnNavigation:this.disposeOnNavigation,usePopover:!!this.usePopover});return(this.height||this.height===0)&&(i.height=this.height),(this.minWidth||this.minWidth===0)&&(i.minWidth=this.minWidth),(this.minHeight||this.minHeight===0)&&(i.minHeight=this.minHeight),this.backdropClass&&(i.backdropClass=this.backdropClass),this.panelClass&&(i.panelClass=this.panelClass),i}_updatePositionStrategy(e){let i=this.positions.map(r=>({originX:r.originX,originY:r.originY,overlayX:r.overlayX,overlayY:r.overlayY,offsetX:r.offsetX||this.offsetX,offsetY:r.offsetY||this.offsetY,panelClass:r.panelClass||void 0}));return e.setOrigin(this._getOrigin()).withPositions(i).withFlexibleDimensions(this.flexibleDimensions).withPush(this.push).withGrowAfterOpen(this.growAfterOpen).withViewportMargin(this.viewportMargin).withLockedPosition(this.lockPosition).withTransformOriginOn(this.transformOriginSelector).withPopoverLocation(this.usePopover===null?"global":this.usePopover)}_createPositionStrategy(){let e=ji(this._injector,this._getOrigin());return this._updatePositionStrategy(e),e}_getOrigin(){return this.origin instanceof Ho?this.origin.elementRef:this.origin}_getOriginElement(){return this.origin instanceof Ho?this.origin.elementRef.nativeElement:this.origin instanceof L?this.origin.nativeElement:typeof Element<"u"&&this.origin instanceof Element?this.origin:null}_getWidth(){return this.width?this.width:this.matchWidth?this._getOriginElement()?.getBoundingClientRect?.().width:void 0}attachOverlay(){this._overlayRef||this._createOverlay();let e=this._overlayRef;e.getConfig().hasBackdrop=this.hasBackdrop,e.updateSize({width:this._getWidth()}),e.hasAttached()||e.attach(this._templatePortal),this.hasBackdrop?this._backdropSubscription=e.backdropClick().subscribe(i=>this.backdropClick.emit(i)):this._backdropSubscription.unsubscribe(),this._positionSubscription.unsubscribe(),this.positionChange.observers.length>0&&(this._positionSubscription=this._position.positionChanges.pipe($u(()=>this.positionChange.observers.length>0)).subscribe(i=>{this._ngZone.run(()=>this.positionChange.emit(i)),this.positionChange.observers.length===0&&this._positionSubscription.unsubscribe()})),this.open=!0}detachOverlay(){this._overlayRef?.detach(),this._backdropSubscription.unsubscribe(),this._positionSubscription.unsubscribe(),this.open=!1}_assignConfig(e){this.origin=e.origin??this.origin,this.positions=e.positions??this.positions,this.positionStrategy=e.positionStrategy??this.positionStrategy,this.offsetX=e.offsetX??this.offsetX,this.offsetY=e.offsetY??this.offsetY,this.width=e.width??this.width,this.height=e.height??this.height,this.minWidth=e.minWidth??this.minWidth,this.minHeight=e.minHeight??this.minHeight,this.backdropClass=e.backdropClass??this.backdropClass,this.panelClass=e.panelClass??this.panelClass,this.viewportMargin=e.viewportMargin??this.viewportMargin,this.scrollStrategy=e.scrollStrategy??this.scrollStrategy,this.disableClose=e.disableClose??this.disableClose,this.transformOriginSelector=e.transformOriginSelector??this.transformOriginSelector,this.hasBackdrop=e.hasBackdrop??this.hasBackdrop,this.lockPosition=e.lockPosition??this.lockPosition,this.flexibleDimensions=e.flexibleDimensions??this.flexibleDimensions,this.growAfterOpen=e.growAfterOpen??this.growAfterOpen,this.push=e.push??this.push,this.disposeOnNavigation=e.disposeOnNavigation??this.disposeOnNavigation,this.usePopover=e.usePopover??this.usePopover,this.matchWidth=e.matchWidth??this.matchWidth}static \u0275fac=function(i){return new(i||t)};static \u0275dir=$({type:t,selectors:[["","cdk-connected-overlay",""],["","connected-overlay",""],["","cdkConnectedOverlay",""]],inputs:{origin:[0,"cdkConnectedOverlayOrigin","origin"],positions:[0,"cdkConnectedOverlayPositions","positions"],positionStrategy:[0,"cdkConnectedOverlayPositionStrategy","positionStrategy"],offsetX:[0,"cdkConnectedOverlayOffsetX","offsetX"],offsetY:[0,"cdkConnectedOverlayOffsetY","offsetY"],width:[0,"cdkConnectedOverlayWidth","width"],height:[0,"cdkConnectedOverlayHeight","height"],minWidth:[0,"cdkConnectedOverlayMinWidth","minWidth"],minHeight:[0,"cdkConnectedOverlayMinHeight","minHeight"],backdropClass:[0,"cdkConnectedOverlayBackdropClass","backdropClass"],panelClass:[0,"cdkConnectedOverlayPanelClass","panelClass"],viewportMargin:[0,"cdkConnectedOverlayViewportMargin","viewportMargin"],scrollStrategy:[0,"cdkConnectedOverlayScrollStrategy","scrollStrategy"],open:[0,"cdkConnectedOverlayOpen","open"],disableClose:[0,"cdkConnectedOverlayDisableClose","disableClose"],transformOriginSelector:[0,"cdkConnectedOverlayTransformOriginOn","transformOriginSelector"],hasBackdrop:[2,"cdkConnectedOverlayHasBackdrop","hasBackdrop",U],lockPosition:[2,"cdkConnectedOverlayLockPosition","lockPosition",U],flexibleDimensions:[2,"cdkConnectedOverlayFlexibleDimensions","flexibleDimensions",U],growAfterOpen:[2,"cdkConnectedOverlayGrowAfterOpen","growAfterOpen",U],push:[2,"cdkConnectedOverlayPush","push",U],disposeOnNavigation:[2,"cdkConnectedOverlayDisposeOnNavigation","disposeOnNavigation",U],usePopover:[0,"cdkConnectedOverlayUsePopover","usePopover"],matchWidth:[2,"cdkConnectedOverlayMatchWidth","matchWidth",U],_config:[0,"cdkConnectedOverlay","_config"]},outputs:{backdropClick:"backdropClick",positionChange:"positionChange",attach:"attach",detach:"detach",overlayKeydown:"overlayKeydown",overlayOutsideClick:"overlayOutsideClick"},exportAs:["cdkConnectedOverlay"],features:[Be]})}return t})(),At=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=Z({type:t});static \u0275inj=q({providers:[_C],imports:[he,Gn,Dh,Dh]})}return t})();function $T(t,n){}var Hi=class{viewContainerRef;injector;id;role="dialog";panelClass="";hasBackdrop=!0;backdropClass="";disableClose=!1;closePredicate;width="";height="";minWidth;minHeight;maxWidth;maxHeight;positionStrategy;data=null;direction;ariaDescribedBy=null;ariaLabelledBy=null;ariaLabel=null;ariaModal=!1;autoFocus="first-tabbable";restoreFocus=!0;scrollStrategy;closeOnNavigation=!0;closeOnDestroy=!0;closeOnOverlayDetachments=!0;disableAnimations=!1;providers;container;templateContext};var Sh=(()=>{class t extends Bi{_elementRef=c(L);_focusTrapFactory=c(md);_config;_interactivityChecker=c(ah);_ngZone=c(P);_focusMonitor=c(jt);_renderer=c(Te);_changeDetectorRef=c(be);_injector=c(Y);_platform=c(pe);_document=c(K);_portalOutlet;_focusTrapped=new M;_focusTrap=null;_elementFocusedBeforeDialogWasOpened=null;_closeInteractionType=null;_ariaLabelledByQueue=[];_isDestroyed=!1;constructor(){super(),this._config=c(Hi,{optional:!0})||new Hi,this._config.ariaLabelledBy&&this._ariaLabelledByQueue.push(this._config.ariaLabelledBy)}_addAriaLabelledBy(e){this._ariaLabelledByQueue.push(e),this._changeDetectorRef.markForCheck()}_removeAriaLabelledBy(e){let i=this._ariaLabelledByQueue.indexOf(e);i>-1&&(this._ariaLabelledByQueue.splice(i,1),this._changeDetectorRef.markForCheck())}_contentAttached(){this._initializeFocusTrap(),this._captureInitialFocus()}_captureInitialFocus(){this._trapFocus()}ngOnDestroy(){this._focusTrapped.complete(),this._isDestroyed=!0,this._restoreFocus()}attachComponentPortal(e){this._portalOutlet.hasAttached();let i=this._portalOutlet.attachComponentPortal(e);return this._contentAttached(),i}attachTemplatePortal(e){this._portalOutlet.hasAttached();let i=this._portalOutlet.attachTemplatePortal(e);return this._contentAttached(),i}attachDomPortal=e=>{this._portalOutlet.hasAttached();let i=this._portalOutlet.attachDomPortal(e);return this._contentAttached(),i};_recaptureFocus(){this._containsFocus()||this._trapFocus()}_forceFocus(e,i){this._interactivityChecker.isFocusable(e)||(e.tabIndex=-1,this._ngZone.runOutsideAngular(()=>{let r=()=>{o(),a(),e.removeAttribute("tabindex")},o=this._renderer.listen(e,"blur",r),a=this._renderer.listen(e,"mousedown",r)})),e.focus(i)}_focusByCssSelector(e,i){let r=this._elementRef.nativeElement.querySelector(e);r&&this._forceFocus(r,i)}_trapFocus(e){this._isDestroyed||Qe(()=>{let i=this._elementRef.nativeElement;switch(this._config.autoFocus){case!1:case"dialog":this._containsFocus()||i.focus(e);break;case!0:case"first-tabbable":this._focusTrap?.focusInitialElement(e)||this._focusDialogContainer(e);break;case"first-heading":this._focusByCssSelector('h1, h2, h3, h4, h5, h6, [role="heading"]',e);break;default:this._focusByCssSelector(this._config.autoFocus,e);break}this._focusTrapped.next()},{injector:this._injector})}_restoreFocus(){let e=this._config.restoreFocus,i=null;if(typeof e=="string"?i=this._document.querySelector(e):typeof e=="boolean"?i=e?this._elementFocusedBeforeDialogWasOpened:null:e&&(i=e),this._config.restoreFocus&&i&&typeof i.focus=="function"){let r=ai(),o=this._elementRef.nativeElement;(!r||r===this._document.body||r===o||o.contains(r))&&(this._focusMonitor?(this._focusMonitor.focusVia(i,this._closeInteractionType),this._closeInteractionType=null):i.focus())}this._focusTrap&&this._focusTrap.destroy()}_focusDialogContainer(e){this._elementRef.nativeElement.focus?.(e)}_containsFocus(){let e=this._elementRef.nativeElement,i=ai();return e===i||e.contains(i)}_initializeFocusTrap(){this._platform.isBrowser&&(this._focusTrap=this._focusTrapFactory.create(this._elementRef.nativeElement),this._document&&(this._elementFocusedBeforeDialogWasOpened=ai()))}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=R({type:t,selectors:[["cdk-dialog-container"]],viewQuery:function(i,r){if(i&1&&_e(On,7),i&2){let o;W(o=G())&&(r._portalOutlet=o.first)}},hostAttrs:["tabindex","-1",1,"cdk-dialog-container"],hostVars:6,hostBindings:function(i,r){i&2&&O("id",r._config.id||null)("role",r._config.role)("aria-modal",r._config.ariaModal)("aria-labelledby",r._config.ariaLabel?null:r._ariaLabelledByQueue[0])("aria-label",r._config.ariaLabel)("aria-describedby",r._config.ariaDescribedBy||null)},features:[ve],decls:1,vars:0,consts:[["cdkPortalOutlet",""]],template:function(i,r){i&1&&it(0,$T,0,0,"ng-template",0)},dependencies:[On],styles:[`.cdk-dialog-container {
  display: block;
  width: 100%;
  height: 100%;
  min-height: inherit;
  max-height: inherit;
}
`],encapsulation:2})}return t})(),Ts=class{overlayRef;config;componentInstance=null;componentRef=null;containerInstance;disableClose;closed=new M;backdropClick;keydownEvents;outsidePointerEvents;id;_detachSubscription;constructor(n,e){this.overlayRef=n,this.config=e,this.disableClose=e.disableClose,this.backdropClick=n.backdropClick(),this.keydownEvents=n.keydownEvents(),this.outsidePointerEvents=n.outsidePointerEvents(),this.id=e.id,this.keydownEvents.subscribe(i=>{i.keyCode===27&&!this.disableClose&&!$e(i)&&(i.preventDefault(),this.close(void 0,{focusOrigin:"keyboard"}))}),this.backdropClick.subscribe(()=>{!this.disableClose&&this._canClose()?this.close(void 0,{focusOrigin:"mouse"}):this.containerInstance._recaptureFocus?.()}),this._detachSubscription=n.detachments().subscribe(()=>{e.closeOnOverlayDetachments!==!1&&this.close()})}close(n,e){if(this._canClose(n)){let i=this.closed;this.containerInstance._closeInteractionType=e?.focusOrigin||"program",this._detachSubscription.unsubscribe(),this.overlayRef.dispose(),i.next(n),i.complete(),this.componentInstance=this.containerInstance=null}}updatePosition(){return this.overlayRef.updatePosition(),this}updateSize(n="",e=""){return this.overlayRef.updateSize({width:n,height:e}),this}addPanelClass(n){return this.overlayRef.addPanelClass(n),this}removePanelClass(n){return this.overlayRef.removePanelClass(n),this}_canClose(n){let e=this.config;return!!this.containerInstance&&(!e.closePredicate||e.closePredicate(n,e,this.componentInstance))}},WT=new y("DialogScrollStrategy",{providedIn:"root",factory:()=>{let t=c(Y);return()=>Hr(t)}}),GT=new y("DialogData"),YT=new y("DefaultDialogConfig");function qT(t){let n=x(t),e=new S;return{valueSignal:n,get value(){return n()},change:e,ngOnDestroy(){e.complete()}}}var kh=(()=>{class t{_injector=c(Y);_defaultOptions=c(YT,{optional:!0});_parentDialog=c(t,{optional:!0,skipSelf:!0});_overlayContainer=c(Ad);_idGenerator=c(ye);_openDialogsAtThisLevel=[];_afterAllClosedAtThisLevel=new M;_afterOpenedAtThisLevel=new M;_ariaHiddenElements=new Map;_scrollStrategy=c(WT);get openDialogs(){return this._parentDialog?this._parentDialog.openDialogs:this._openDialogsAtThisLevel}get afterOpened(){return this._parentDialog?this._parentDialog.afterOpened:this._afterOpenedAtThisLevel}afterAllClosed=ir(()=>this.openDialogs.length?this._getAfterAllClosed():this._getAfterAllClosed().pipe(We(void 0)));constructor(){}open(e,i){let r=this._defaultOptions||new Hi;i=I(I({},r),i),i.id=i.id||this._idGenerator.getId("cdk-dialog-"),i.id&&this.getDialogById(i.id);let o=this._getOverlayConfig(i),a=sn(this._injector,o),s=new Ts(a,i),l=this._attachContainer(a,s,i);if(s.containerInstance=l,!this.openDialogs.length){let d=this._overlayContainer.getContainerElement();l._focusTrapped?l._focusTrapped.pipe(mt(1)).subscribe(()=>{this._hideNonDialogContentFromAssistiveTechnology(d)}):this._hideNonDialogContentFromAssistiveTechnology(d)}return this._attachDialogContent(e,s,l,i),this.openDialogs.push(s),s.closed.subscribe(()=>this._removeOpenDialog(s,!0)),this.afterOpened.next(s),s}closeAll(){Ih(this.openDialogs,e=>e.close())}getDialogById(e){return this.openDialogs.find(i=>i.id===e)}ngOnDestroy(){Ih(this._openDialogsAtThisLevel,e=>{e.config.closeOnDestroy===!1&&this._removeOpenDialog(e,!1)}),Ih(this._openDialogsAtThisLevel,e=>e.close()),this._afterAllClosedAtThisLevel.complete(),this._afterOpenedAtThisLevel.complete(),this._openDialogsAtThisLevel=[]}_getOverlayConfig(e){let i=new an({positionStrategy:e.positionStrategy||di().centerHorizontally().centerVertically(),scrollStrategy:e.scrollStrategy||this._scrollStrategy(),panelClass:e.panelClass,hasBackdrop:e.hasBackdrop,direction:e.direction,minWidth:e.minWidth,minHeight:e.minHeight,maxWidth:e.maxWidth,maxHeight:e.maxHeight,width:e.width,height:e.height,disposeOnNavigation:e.closeOnNavigation,disableAnimations:e.disableAnimations});return e.backdropClass&&(i.backdropClass=e.backdropClass),i}_attachContainer(e,i,r){let o=r.injector||r.viewContainerRef?.injector,a=[{provide:Hi,useValue:r},{provide:Ts,useValue:i},{provide:jo,useValue:e}],s;r.container?typeof r.container=="function"?s=r.container:(s=r.container.type,a.push(...r.container.providers(r))):s=Sh;let l=new Ut(s,r.viewContainerRef,Y.create({parent:o||this._injector,providers:a}));return e.attach(l).instance}_attachDialogContent(e,i,r,o){if(e instanceof st){let a=this._createInjector(o,i,r,void 0),s={$implicit:o.data,dialogRef:i};o.templateContext&&(s=I(I({},s),typeof o.templateContext=="function"?o.templateContext():o.templateContext)),r.attachTemplatePortal(new on(e,null,s,a))}else{let a=this._createInjector(o,i,r,this._injector),s=r.attachComponentPortal(new Ut(e,o.viewContainerRef,a));i.componentRef=s,i.componentInstance=s.instance}}_createInjector(e,i,r,o){let a=e.injector||e.viewContainerRef?.injector,s=[{provide:GT,useValue:e.data},{provide:Ts,useValue:i}];return e.providers&&(typeof e.providers=="function"?s.push(...e.providers(i,e,r)):s.push(...e.providers)),e.direction&&(!a||!a.get(Ue,null,{optional:!0}))&&s.push({provide:Ue,useValue:qT(e.direction)}),Y.create({parent:a||o,providers:s})}_removeOpenDialog(e,i){let r=this.openDialogs.indexOf(e);r>-1&&(this.openDialogs.splice(r,1),this.openDialogs.length||(this._ariaHiddenElements.forEach((o,a)=>{o?a.setAttribute("aria-hidden",o):a.removeAttribute("aria-hidden")}),this._ariaHiddenElements.clear(),i&&this._getAfterAllClosed().next()))}_hideNonDialogContentFromAssistiveTechnology(e){if(e.parentElement){let i=e.parentElement.children;for(let r=i.length-1;r>-1;r--){let o=i[r];o!==e&&o.nodeName!=="SCRIPT"&&o.nodeName!=="STYLE"&&!o.hasAttribute("aria-live")&&!o.hasAttribute("popover")&&(this._ariaHiddenElements.set(o,o.getAttribute("aria-hidden")),o.setAttribute("aria-hidden","true"))}}}_getAfterAllClosed(){let e=this._parentDialog;return e?e._getAfterAllClosed():this._afterAllClosedAtThisLevel}static \u0275fac=function(i){return new(i||t)};static \u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function Ih(t,n){let e=t.length;for(;e--;)n(t[e])}var vC=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=Z({type:t});static \u0275inj=q({providers:[kh],imports:[At,Gn,Vr,Gn]})}return t})();function ZT(t,n){}var Nd=class{viewContainerRef;injector;id;role="dialog";panelClass="";hasBackdrop=!0;backdropClass="";disableClose=!1;closePredicate;width="";height="";minWidth;minHeight;maxWidth;maxHeight;position;data=null;direction;ariaDescribedBy=null;ariaLabelledBy=null;ariaLabel=null;ariaModal=!1;autoFocus="first-tabbable";restoreFocus=!0;delayFocusTrap=!0;scrollStrategy;closeOnNavigation=!0;enterAnimationDuration;exitAnimationDuration},Th="mdc-dialog--open",yC="mdc-dialog--opening",CC="mdc-dialog--closing",KT=150,QT=75,XT=(()=>{class t extends Sh{_animationStateChanged=new S;_animationsEnabled=!xe();_actionSectionCount=0;_hostElement=this._elementRef.nativeElement;_enterAnimationDuration=this._animationsEnabled?xC(this._config.enterAnimationDuration)??KT:0;_exitAnimationDuration=this._animationsEnabled?xC(this._config.exitAnimationDuration)??QT:0;_animationTimer=null;_contentAttached(){super._contentAttached(),this._startOpenAnimation()}_startOpenAnimation(){this._animationStateChanged.emit({state:"opening",totalTime:this._enterAnimationDuration}),this._animationsEnabled?(this._hostElement.style.setProperty(DC,`${this._enterAnimationDuration}ms`),this._requestAnimationFrame(()=>this._hostElement.classList.add(yC,Th)),this._waitForAnimationToComplete(this._enterAnimationDuration,this._finishDialogOpen)):(this._hostElement.classList.add(Th),Promise.resolve().then(()=>this._finishDialogOpen()))}_startExitAnimation(){this._animationStateChanged.emit({state:"closing",totalTime:this._exitAnimationDuration}),this._hostElement.classList.remove(Th),this._animationsEnabled?(this._hostElement.style.setProperty(DC,`${this._exitAnimationDuration}ms`),this._requestAnimationFrame(()=>this._hostElement.classList.add(CC)),this._waitForAnimationToComplete(this._exitAnimationDuration,this._finishDialogClose)):Promise.resolve().then(()=>this._finishDialogClose())}_updateActionSectionCount(e){this._actionSectionCount+=e,this._changeDetectorRef.markForCheck()}_finishDialogOpen=()=>{this._clearAnimationClasses(),this._openAnimationDone(this._enterAnimationDuration)};_finishDialogClose=()=>{this._clearAnimationClasses(),this._animationStateChanged.emit({state:"closed",totalTime:this._exitAnimationDuration})};_clearAnimationClasses(){this._hostElement.classList.remove(yC,CC)}_waitForAnimationToComplete(e,i){this._animationTimer!==null&&clearTimeout(this._animationTimer),this._animationTimer=setTimeout(i,e)}_requestAnimationFrame(e){this._ngZone.runOutsideAngular(()=>{typeof requestAnimationFrame=="function"?requestAnimationFrame(e):e()})}_captureInitialFocus(){this._config.delayFocusTrap||this._trapFocus()}_openAnimationDone(e){this._config.delayFocusTrap&&this._trapFocus(),this._animationStateChanged.next({state:"opened",totalTime:e})}ngOnDestroy(){super.ngOnDestroy(),this._animationTimer!==null&&clearTimeout(this._animationTimer)}attachComponentPortal(e){let i=super.attachComponentPortal(e);return i.location.nativeElement.classList.add("mat-mdc-dialog-component-host"),i}static \u0275fac=(()=>{let e;return function(r){return(e||(e=Vt(t)))(r||t)}})();static \u0275cmp=R({type:t,selectors:[["mat-dialog-container"]],hostAttrs:["tabindex","-1",1,"mat-mdc-dialog-container","mdc-dialog"],hostVars:10,hostBindings:function(i,r){i&2&&(qe("id",r._config.id),O("aria-modal",r._config.ariaModal)("role",r._config.role)("aria-labelledby",r._config.ariaLabel?null:r._ariaLabelledByQueue[0])("aria-label",r._config.ariaLabel)("aria-describedby",r._config.ariaDescribedBy||null),A("_mat-animation-noopable",!r._animationsEnabled)("mat-mdc-dialog-container-with-actions",r._actionSectionCount>0))},features:[ve],decls:3,vars:0,consts:[[1,"mat-mdc-dialog-inner-container","mdc-dialog__container"],[1,"mat-mdc-dialog-surface","mdc-dialog__surface"],["cdkPortalOutlet",""]],template:function(i,r){i&1&&(m(0,"div",0)(1,"div",1),it(2,ZT,0,0,"ng-template",2),p()())},dependencies:[On],styles:[`.mat-mdc-dialog-container {
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
`],encapsulation:2})}return t})(),DC="--mat-dialog-transition-duration";function xC(t){return t==null?null:typeof t=="number"?t:t.endsWith("ms")?si(t.substring(0,t.length-2)):t.endsWith("s")?si(t.substring(0,t.length-1))*1e3:t==="0"?0:null}var Od=(function(t){return t[t.OPEN=0]="OPEN",t[t.CLOSING=1]="CLOSING",t[t.CLOSED=2]="CLOSED",t})(Od||{}),Ui=class{_ref;_config;_containerInstance;componentInstance;componentRef=null;disableClose;id;_afterOpened=new _i(1);_beforeClosed=new _i(1);_result;_closeFallbackTimeout;_state=Od.OPEN;_closeInteractionType;constructor(n,e,i){this._ref=n,this._config=e,this._containerInstance=i,this.disableClose=e.disableClose,this.id=n.id,n.addPanelClass("mat-mdc-dialog-panel"),i._animationStateChanged.pipe(Ne(r=>r.state==="opened"),mt(1)).subscribe(()=>{this._afterOpened.next(),this._afterOpened.complete()}),i._animationStateChanged.pipe(Ne(r=>r.state==="closed"),mt(1)).subscribe(()=>{clearTimeout(this._closeFallbackTimeout),this._finishDialogClose()}),n.overlayRef.detachments().subscribe(()=>{this._beforeClosed.next(this._result),this._beforeClosed.complete(),this._finishDialogClose()}),ft(this.backdropClick(),this.keydownEvents().pipe(Ne(r=>r.keyCode===27&&!this.disableClose&&!$e(r)))).subscribe(r=>{this.disableClose||(r.preventDefault(),JT(this,r.type==="keydown"?"keyboard":"mouse"))})}close(n){let e=this._config.closePredicate;e&&!e(n,this._config,this.componentInstance)||(this._result=n,this._containerInstance._animationStateChanged.pipe(Ne(i=>i.state==="closing"),mt(1)).subscribe(i=>{this._beforeClosed.next(n),this._beforeClosed.complete(),this._ref.overlayRef.detachBackdrop(),this._closeFallbackTimeout=setTimeout(()=>this._finishDialogClose(),i.totalTime+100)}),this._state=Od.CLOSING,this._containerInstance._startExitAnimation())}afterOpened(){return this._afterOpened}afterClosed(){return this._ref.closed}beforeClosed(){return this._beforeClosed}backdropClick(){return this._ref.backdropClick}keydownEvents(){return this._ref.keydownEvents}updatePosition(n){let e=this._ref.config.positionStrategy;return n&&(n.left||n.right)?n.left?e.left(n.left):e.right(n.right):e.centerHorizontally(),n&&(n.top||n.bottom)?n.top?e.top(n.top):e.bottom(n.bottom):e.centerVertically(),this._ref.updatePosition(),this}updateSize(n="",e=""){return this._ref.updateSize(n,e),this}addPanelClass(n){return this._ref.addPanelClass(n),this}removePanelClass(n){return this._ref.removePanelClass(n),this}getState(){return this._state}_finishDialogClose(){this._state=Od.CLOSED,this._ref.close(this._result,{focusOrigin:this._closeInteractionType}),this.componentInstance=null}};function JT(t,n,e){return t._closeInteractionType=n,t.close(e)}var Ah=new y("MatMdcDialogData"),eA=new y("mat-mdc-dialog-default-options"),tA=new y("mat-mdc-dialog-scroll-strategy",{providedIn:"root",factory:()=>{let t=c(Y);return()=>Hr(t)}}),Fd=(()=>{class t{_defaultOptions=c(eA,{optional:!0});_scrollStrategy=c(tA);_parentDialog=c(t,{optional:!0,skipSelf:!0});_idGenerator=c(ye);_injector=c(Y);_dialog=c(kh);_animationsDisabled=xe();_openDialogsAtThisLevel=[];_afterAllClosedAtThisLevel=new M;_afterOpenedAtThisLevel=new M;dialogConfigClass=Nd;_dialogRefConstructor;_dialogContainerType;_dialogDataToken;get openDialogs(){return this._parentDialog?this._parentDialog.openDialogs:this._openDialogsAtThisLevel}get afterOpened(){return this._parentDialog?this._parentDialog.afterOpened:this._afterOpenedAtThisLevel}_getAfterAllClosed(){let e=this._parentDialog;return e?e._getAfterAllClosed():this._afterAllClosedAtThisLevel}afterAllClosed=ir(()=>this.openDialogs.length?this._getAfterAllClosed():this._getAfterAllClosed().pipe(We(void 0)));constructor(){this._dialogRefConstructor=Ui,this._dialogContainerType=XT,this._dialogDataToken=Ah}open(e,i){let r;i=I(I({},this._defaultOptions||new Nd),i),i.id=i.id||this._idGenerator.getId("mat-mdc-dialog-"),i.scrollStrategy=i.scrollStrategy||this._scrollStrategy();let o=this._dialog.open(e,se(I({},i),{positionStrategy:di(this._injector).centerHorizontally().centerVertically(),disableClose:!0,closePredicate:void 0,closeOnDestroy:!1,closeOnOverlayDetachments:!1,disableAnimations:this._animationsDisabled||i.enterAnimationDuration?.toLocaleString()==="0"||i.exitAnimationDuration?.toString()==="0",container:{type:this._dialogContainerType,providers:()=>[{provide:this.dialogConfigClass,useValue:i},{provide:Hi,useValue:i}]},templateContext:()=>({dialogRef:r}),providers:(a,s,l)=>(r=new this._dialogRefConstructor(a,i,l),r.updatePosition(i?.position),[{provide:this._dialogContainerType,useValue:l},{provide:this._dialogDataToken,useValue:s.data},{provide:this._dialogRefConstructor,useValue:r}])}));return r.componentRef=o.componentRef,r.componentInstance=o.componentInstance,this.openDialogs.push(r),this.afterOpened.next(r),r.afterClosed().subscribe(()=>{let a=this.openDialogs.indexOf(r);a>-1&&(this.openDialogs.splice(a,1),this.openDialogs.length||this._getAfterAllClosed().next())}),r}closeAll(){this._closeDialogs(this.openDialogs)}getDialogById(e){return this.openDialogs.find(i=>i.id===e)}ngOnDestroy(){this._closeDialogs(this._openDialogsAtThisLevel),this._afterAllClosedAtThisLevel.complete(),this._afterOpenedAtThisLevel.complete()}_closeDialogs(e){let i=e.length;for(;i--;)e[i].close()}static \u0275fac=function(i){return new(i||t)};static \u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var wC=(()=>{class t{_dialogRef=c(Ui,{optional:!0});_elementRef=c(L);_dialog=c(Fd);constructor(){}ngOnInit(){this._dialogRef||(this._dialogRef=nA(this._elementRef,this._dialog.openDialogs)),this._dialogRef&&Promise.resolve().then(()=>{this._onAdd()})}ngOnDestroy(){this._dialogRef?._containerInstance&&Promise.resolve().then(()=>{this._onRemove()})}static \u0275fac=function(i){return new(i||t)};static \u0275dir=$({type:t})}return t})(),Pd=(()=>{class t extends wC{id=c(ye).getId("mat-mdc-dialog-title-");_onAdd(){this._dialogRef._containerInstance?._addAriaLabelledBy?.(this.id)}_onRemove(){this._dialogRef?._containerInstance?._removeAriaLabelledBy?.(this.id)}static \u0275fac=(()=>{let e;return function(r){return(e||(e=Vt(t)))(r||t)}})();static \u0275dir=$({type:t,selectors:[["","mat-dialog-title",""],["","matDialogTitle",""]],hostAttrs:[1,"mat-mdc-dialog-title","mdc-dialog__title"],hostVars:1,hostBindings:function(i,r){i&2&&qe("id",r.id)},inputs:{id:"id"},exportAs:["matDialogTitle"],features:[ve]})}return t})(),Ld=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=$({type:t,selectors:[["","mat-dialog-content",""],["mat-dialog-content"],["","matDialogContent",""]],hostAttrs:[1,"mat-mdc-dialog-content","mdc-dialog__content"],features:[Dp([Ch])]})}return t})(),EC=(()=>{class t extends wC{align;_onAdd(){this._dialogRef._containerInstance?._updateActionSectionCount?.(1)}_onRemove(){this._dialogRef._containerInstance?._updateActionSectionCount?.(-1)}static \u0275fac=(()=>{let e;return function(r){return(e||(e=Vt(t)))(r||t)}})();static \u0275dir=$({type:t,selectors:[["","mat-dialog-actions",""],["mat-dialog-actions"],["","matDialogActions",""]],hostAttrs:[1,"mat-mdc-dialog-actions","mdc-dialog__actions"],hostVars:6,hostBindings:function(i,r){i&2&&A("mat-mdc-dialog-actions-align-start",r.align==="start")("mat-mdc-dialog-actions-align-center",r.align==="center")("mat-mdc-dialog-actions-align-end",r.align==="end")},inputs:{align:"align"},features:[ve]})}return t})();function nA(t,n){let e=t.nativeElement.parentElement;for(;e&&!e.classList.contains("mat-mdc-dialog-container");)e=e.parentElement;return e?n.find(i=>i.id===e.id):null}var Uo=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=Z({type:t});static \u0275inj=q({providers:[Fd],imports:[vC,At,Gn,he]})}return t})();var Oh=class{_box;_destroyed=new M;_resizeSubject=new M;_resizeObserver;_elementObservables=new Map;constructor(n){this._box=n,typeof ResizeObserver<"u"&&(this._resizeObserver=new ResizeObserver(e=>this._resizeSubject.next(e)))}observe(n){return this._elementObservables.has(n)||this._elementObservables.set(n,new ue(e=>{let i=this._resizeSubject.subscribe(e);return this._resizeObserver?.observe(n,{box:this._box}),()=>{this._resizeObserver?.unobserve(n),i.unsubscribe(),this._elementObservables.delete(n)}}).pipe(Ne(e=>e.some(i=>i.target===n)),Rl({bufferSize:1,refCount:!0}),Ee(this._destroyed))),this._elementObservables.get(n)}destroy(){this._destroyed.next(),this._destroyed.complete(),this._resizeSubject.complete(),this._elementObservables.clear()}},MC=(()=>{class t{_cleanupErrorListener;_observers=new Map;_ngZone=c(P);constructor(){typeof ResizeObserver<"u"}ngOnDestroy(){for(let[,e]of this._observers)e.destroy();this._observers.clear(),this._cleanupErrorListener?.()}observe(e,i){let r=i?.box||"content-box";return this._observers.has(r)||this._observers.set(r,new Oh(r)),this._observers.get(r).observe(e)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var iA=["notch"],rA=["matFormFieldNotchedOutline",""],oA=["*"],IC=["iconPrefixContainer"],SC=["textPrefixContainer"],kC=["iconSuffixContainer"],TC=["textSuffixContainer"],aA=["textField"],sA=["*",[["mat-label"]],[["","matPrefix",""],["","matIconPrefix",""]],[["","matTextPrefix",""]],[["","matTextSuffix",""]],[["","matSuffix",""],["","matIconSuffix",""]],[["mat-error"],["","matError",""]],[["mat-hint",3,"align","end"]],[["mat-hint","align","end"]]],lA=["*","mat-label","[matPrefix], [matIconPrefix]","[matTextPrefix]","[matTextSuffix]","[matSuffix], [matIconSuffix]","mat-error, [matError]","mat-hint:not([align='end'])","mat-hint[align='end']"];function cA(t,n){t&1&&B(0,"span",21)}function dA(t,n){if(t&1&&(m(0,"label",20),oe(1,1),k(2,cA,1,0,"span",21),p()),t&2){let e=b(2);E("floating",e._shouldLabelFloat())("monitorResize",e._hasOutline())("id",e._labelId),O("for",e._control.disableAutomaticLabeling?null:e._control.id),h(2),T(!e.hideRequiredMarker&&e._control.required?2:-1)}}function uA(t,n){if(t&1&&k(0,dA,3,5,"label",20),t&2){let e=b();T(e._hasFloatingLabel()?0:-1)}}function fA(t,n){t&1&&B(0,"div",7)}function mA(t,n){}function pA(t,n){if(t&1&&it(0,mA,0,0,"ng-template",13),t&2){b(2);let e=yt(1);E("ngTemplateOutlet",e)}}function hA(t,n){if(t&1&&(m(0,"div",9),k(1,pA,1,1,null,13),p()),t&2){let e=b();E("matFormFieldNotchedOutlineOpen",e._shouldLabelFloat()),h(),T(e._forceDisplayInfixLabel()?-1:1)}}function gA(t,n){t&1&&(m(0,"div",10,2),oe(2,2),p())}function _A(t,n){t&1&&(m(0,"div",11,3),oe(2,3),p())}function bA(t,n){}function vA(t,n){if(t&1&&it(0,bA,0,0,"ng-template",13),t&2){b();let e=yt(1);E("ngTemplateOutlet",e)}}function yA(t,n){t&1&&(m(0,"div",14,4),oe(2,4),p())}function CA(t,n){t&1&&(m(0,"div",15,5),oe(2,5),p())}function DA(t,n){t&1&&B(0,"div",16)}function xA(t,n){t&1&&(m(0,"div",18),oe(1,6),p())}function wA(t,n){if(t&1&&(m(0,"mat-hint",22),v(1),p()),t&2){let e=b(2);E("id",e._hintLabelId),h(),ne(e.hintLabel)}}function EA(t,n){if(t&1&&(m(0,"div",19),k(1,wA,2,2,"mat-hint",22),oe(2,7),B(3,"div",23),oe(4,8),p()),t&2){let e=b();h(),T(e.hintLabel?1:-1)}}var As=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=$({type:t,selectors:[["mat-label"]]})}return t})(),MA=new y("MatError");var Rs=(()=>{class t{align="start";id=c(ye).getId("mat-mdc-hint-");static \u0275fac=function(i){return new(i||t)};static \u0275dir=$({type:t,selectors:[["mat-hint"]],hostAttrs:[1,"mat-mdc-form-field-hint","mat-mdc-form-field-bottom-align"],hostVars:4,hostBindings:function(i,r){i&2&&(qe("id",r.id),O("align",null),A("mat-mdc-form-field-hint-end",r.align==="end"))},inputs:{align:"align",id:"id"}})}return t})(),IA=new y("MatPrefix");var LC=new y("MatSuffix"),Nh=(()=>{class t{set _isTextSelector(e){this._isText=!0}_isText=!1;static \u0275fac=function(i){return new(i||t)};static \u0275dir=$({type:t,selectors:[["","matSuffix",""],["","matIconSuffix",""],["","matTextSuffix",""]],inputs:{_isTextSelector:[0,"matTextSuffix","_isTextSelector"]},features:[Re([{provide:LC,useExisting:t}])]})}return t})(),VC=new y("FloatingLabelParent"),AC=(()=>{class t{_elementRef=c(L);get floating(){return this._floating}set floating(e){this._floating=e,this.monitorResize&&this._handleResize()}_floating=!1;get monitorResize(){return this._monitorResize}set monitorResize(e){this._monitorResize=e,this._monitorResize?this._subscribeToResize():this._resizeSubscription.unsubscribe()}_monitorResize=!1;_resizeObserver=c(MC);_ngZone=c(P);_parent=c(VC);_resizeSubscription=new ce;constructor(){}ngOnDestroy(){this._resizeSubscription.unsubscribe()}getWidth(){return SA(this._elementRef.nativeElement)}get element(){return this._elementRef.nativeElement}_handleResize(){setTimeout(()=>this._parent._handleLabelResized())}_subscribeToResize(){this._resizeSubscription.unsubscribe(),this._ngZone.runOutsideAngular(()=>{this._resizeSubscription=this._resizeObserver.observe(this._elementRef.nativeElement,{box:"border-box"}).subscribe(()=>this._handleResize())})}static \u0275fac=function(i){return new(i||t)};static \u0275dir=$({type:t,selectors:[["label","matFormFieldFloatingLabel",""]],hostAttrs:[1,"mdc-floating-label","mat-mdc-floating-label"],hostVars:2,hostBindings:function(i,r){i&2&&A("mdc-floating-label--float-above",r.floating)},inputs:{floating:"floating",monitorResize:"monitorResize"}})}return t})();function SA(t){let n=t;if(n.offsetParent!==null)return n.scrollWidth;let e=n.cloneNode(!0);e.style.setProperty("position","absolute"),e.style.setProperty("transform","translate(-9999px, -9999px)"),document.documentElement.appendChild(e);let i=e.scrollWidth;return e.remove(),i}var RC="mdc-line-ripple--active",Vd="mdc-line-ripple--deactivating",OC=(()=>{class t{_elementRef=c(L);_cleanupTransitionEnd;constructor(){let e=c(P),i=c(Te);e.runOutsideAngular(()=>{this._cleanupTransitionEnd=i.listen(this._elementRef.nativeElement,"transitionend",this._handleTransitionEnd)})}activate(){let e=this._elementRef.nativeElement.classList;e.remove(Vd),e.add(RC)}deactivate(){this._elementRef.nativeElement.classList.add(Vd)}_handleTransitionEnd=e=>{let i=this._elementRef.nativeElement.classList,r=i.contains(Vd);e.propertyName==="opacity"&&r&&i.remove(RC,Vd)};ngOnDestroy(){this._cleanupTransitionEnd()}static \u0275fac=function(i){return new(i||t)};static \u0275dir=$({type:t,selectors:[["div","matFormFieldLineRipple",""]],hostAttrs:[1,"mdc-line-ripple"]})}return t})(),NC=(()=>{class t{_elementRef=c(L);_ngZone=c(P);open=!1;_notch;ngAfterViewInit(){let e=this._elementRef.nativeElement,i=e.querySelector(".mdc-floating-label");i?(e.classList.add("mdc-notched-outline--upgraded"),typeof requestAnimationFrame=="function"&&(i.style.transitionDuration="0s",this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>i.style.transitionDuration="")}))):e.classList.add("mdc-notched-outline--no-label")}_setNotchWidth(e){let i=this._notch.nativeElement;!this.open||!e?i.style.width="":i.style.width=`calc(${e}px * var(--mat-mdc-form-field-floating-label-scale, 0.75) + 9px)`}_setMaxWidth(e){this._notch.nativeElement.style.setProperty("--mat-form-field-notch-max-width",`calc(100% - ${e}px)`)}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=R({type:t,selectors:[["div","matFormFieldNotchedOutline",""]],viewQuery:function(i,r){if(i&1&&_e(iA,5),i&2){let o;W(o=G())&&(r._notch=o.first)}},hostAttrs:[1,"mdc-notched-outline"],hostVars:2,hostBindings:function(i,r){i&2&&A("mdc-notched-outline--notched",r.open)},inputs:{open:[0,"matFormFieldNotchedOutlineOpen","open"]},attrs:rA,ngContentSelectors:oA,decls:5,vars:0,consts:[["notch",""],[1,"mat-mdc-notch-piece","mdc-notched-outline__leading"],[1,"mat-mdc-notch-piece","mdc-notched-outline__notch"],[1,"mat-mdc-notch-piece","mdc-notched-outline__trailing"]],template:function(i,r){i&1&&(Se(),vt(0,"div",1),Pe(1,"div",2,0),oe(3),je(),vt(4,"div",3))},encapsulation:2,changeDetection:0})}return t})(),Os=(()=>{class t{value=null;stateChanges;id;placeholder;ngControl=null;focused=!1;empty=!1;shouldLabelFloat=!1;required=!1;disabled=!1;errorState=!1;controlType;autofilled;userAriaDescribedBy;disableAutomaticLabeling;describedByIds;static \u0275fac=function(i){return new(i||t)};static \u0275dir=$({type:t})}return t})();var Ns=new y("MatFormField"),kA=new y("MAT_FORM_FIELD_DEFAULT_OPTIONS"),FC="fill",TA="auto",PC="fixed",AA="translateY(-50%)",zo=(()=>{class t{_elementRef=c(L);_changeDetectorRef=c(be);_platform=c(pe);_idGenerator=c(ye);_ngZone=c(P);_defaults=c(kA,{optional:!0});_currentDirection;_textField;_iconPrefixContainer;_textPrefixContainer;_iconSuffixContainer;_textSuffixContainer;_floatingLabel;_notchedOutline;_lineRipple;_iconPrefixContainerSignal=ss("iconPrefixContainer");_textPrefixContainerSignal=ss("textPrefixContainer");_iconSuffixContainerSignal=ss("iconSuffixContainer");_textSuffixContainerSignal=ss("textSuffixContainer");_prefixSuffixContainers=ke(()=>[this._iconPrefixContainerSignal(),this._textPrefixContainerSignal(),this._iconSuffixContainerSignal(),this._textSuffixContainerSignal()].map(e=>e?.nativeElement).filter(e=>e!==void 0));_formFieldControl;_prefixChildren;_suffixChildren;_errorChildren;_hintChildren;_labelChild=Uy(As);get hideRequiredMarker(){return this._hideRequiredMarker}set hideRequiredMarker(e){this._hideRequiredMarker=li(e)}_hideRequiredMarker=!1;color="primary";get floatLabel(){return this._floatLabel||this._defaults?.floatLabel||TA}set floatLabel(e){e!==this._floatLabel&&(this._floatLabel=e,this._changeDetectorRef.markForCheck())}_floatLabel;get appearance(){return this._appearanceSignal()}set appearance(e){let i=e||this._defaults?.appearance||FC;this._appearanceSignal.set(i)}_appearanceSignal=x(FC);get subscriptSizing(){return this._subscriptSizing||this._defaults?.subscriptSizing||PC}set subscriptSizing(e){this._subscriptSizing=e||this._defaults?.subscriptSizing||PC}_subscriptSizing=null;get hintLabel(){return this._hintLabel}set hintLabel(e){this._hintLabel=e,this._processHints()}_hintLabel="";_hasIconPrefix=!1;_hasTextPrefix=!1;_hasIconSuffix=!1;_hasTextSuffix=!1;_labelId=this._idGenerator.getId("mat-mdc-form-field-label-");_hintLabelId=this._idGenerator.getId("mat-mdc-hint-");_describedByIds;get _control(){return this._explicitFormFieldControl||this._formFieldControl}set _control(e){this._explicitFormFieldControl=e}_destroyed=new M;_isFocused=null;_explicitFormFieldControl;_previousControl=null;_previousControlValidatorFn=null;_stateChanges;_valueChanges;_describedByChanges;_outlineLabelOffsetResizeObserver=null;_animationsDisabled=xe();constructor(){let e=this._defaults,i=c(Ue);e&&(e.appearance&&(this.appearance=e.appearance),this._hideRequiredMarker=!!e?.hideRequiredMarker,e.color&&(this.color=e.color)),vn(()=>this._currentDirection=i.valueSignal()),this._syncOutlineLabelOffset()}ngAfterViewInit(){this._updateFocusState(),this._animationsDisabled||this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{this._elementRef.nativeElement.classList.add("mat-form-field-animations-enabled")},300)}),this._changeDetectorRef.detectChanges()}ngAfterContentInit(){this._assertFormFieldControl(),this._initializeSubscript(),this._initializePrefixAndSuffix()}ngAfterContentChecked(){this._assertFormFieldControl(),this._control!==this._previousControl&&(this._initializeControl(this._previousControl),this._control.ngControl&&this._control.ngControl.control&&(this._previousControlValidatorFn=this._control.ngControl.control.validator),this._previousControl=this._control),this._control.ngControl&&this._control.ngControl.control&&this._control.ngControl.control.validator!==this._previousControlValidatorFn&&this._changeDetectorRef.markForCheck()}ngOnDestroy(){this._outlineLabelOffsetResizeObserver?.disconnect(),this._stateChanges?.unsubscribe(),this._valueChanges?.unsubscribe(),this._describedByChanges?.unsubscribe(),this._destroyed.next(),this._destroyed.complete()}getLabelId=ke(()=>this._hasFloatingLabel()?this._labelId:null);getConnectedOverlayOrigin(){return this._textField||this._elementRef}_animateAndLockLabel(){this._hasFloatingLabel()&&(this.floatLabel="always")}_initializeControl(e){let i=this._control,r="mat-mdc-form-field-type-";e&&this._elementRef.nativeElement.classList.remove(r+e.controlType),i.controlType&&this._elementRef.nativeElement.classList.add(r+i.controlType),this._stateChanges?.unsubscribe(),this._stateChanges=i.stateChanges.subscribe(()=>{this._updateFocusState(),this._changeDetectorRef.markForCheck()}),this._describedByChanges?.unsubscribe(),this._describedByChanges=i.stateChanges.pipe(We([void 0,void 0]),Ce(()=>[i.errorState,i.userAriaDescribedBy]),Al(),Ne(([[o,a],[s,l]])=>o!==s||a!==l)).subscribe(()=>this._syncDescribedByIds()),this._valueChanges?.unsubscribe(),i.ngControl&&i.ngControl.valueChanges&&(this._valueChanges=i.ngControl.valueChanges.pipe(Ee(this._destroyed)).subscribe(()=>this._changeDetectorRef.markForCheck()))}_checkPrefixAndSuffixTypes(){this._hasIconPrefix=!!this._prefixChildren.find(e=>!e._isText),this._hasTextPrefix=!!this._prefixChildren.find(e=>e._isText),this._hasIconSuffix=!!this._suffixChildren.find(e=>!e._isText),this._hasTextSuffix=!!this._suffixChildren.find(e=>e._isText)}_initializePrefixAndSuffix(){this._checkPrefixAndSuffixTypes(),ft(this._prefixChildren.changes,this._suffixChildren.changes).subscribe(()=>{this._checkPrefixAndSuffixTypes(),this._changeDetectorRef.markForCheck()})}_initializeSubscript(){this._hintChildren.changes.subscribe(()=>{this._processHints(),this._changeDetectorRef.markForCheck()}),this._errorChildren.changes.subscribe(()=>{this._syncDescribedByIds(),this._changeDetectorRef.markForCheck()}),this._validateHints(),this._syncDescribedByIds()}_assertFormFieldControl(){this._control}_updateFocusState(){let e=this._control.focused;e&&!this._isFocused?(this._isFocused=!0,this._lineRipple?.activate()):!e&&(this._isFocused||this._isFocused===null)&&(this._isFocused=!1,this._lineRipple?.deactivate()),this._elementRef.nativeElement.classList.toggle("mat-focused",e),this._textField?.nativeElement.classList.toggle("mdc-text-field--focused",e)}_syncOutlineLabelOffset(){Wy({earlyRead:()=>{if(this._appearanceSignal()!=="outline")return this._outlineLabelOffsetResizeObserver?.disconnect(),null;if(globalThis.ResizeObserver){this._outlineLabelOffsetResizeObserver||=new globalThis.ResizeObserver(()=>{this._writeOutlinedLabelStyles(this._getOutlinedLabelOffset())});for(let e of this._prefixSuffixContainers())this._outlineLabelOffsetResizeObserver.observe(e,{box:"border-box"})}return this._getOutlinedLabelOffset()},write:e=>this._writeOutlinedLabelStyles(e())})}_shouldAlwaysFloat(){return this.floatLabel==="always"}_hasOutline(){return this.appearance==="outline"}_forceDisplayInfixLabel(){return!this._platform.isBrowser&&this._prefixChildren.length&&!this._shouldLabelFloat()}_hasFloatingLabel=ke(()=>!!this._labelChild());_shouldLabelFloat(){return this._hasFloatingLabel()?this._control.shouldLabelFloat||this._shouldAlwaysFloat():!1}_shouldForward(e){let i=this._control?this._control.ngControl:null;return i&&i[e]}_getSubscriptMessageType(){return this._errorChildren&&this._errorChildren.length>0&&this._control.errorState?"error":"hint"}_handleLabelResized(){this._refreshOutlineNotchWidth()}_refreshOutlineNotchWidth(){!this._hasOutline()||!this._floatingLabel||!this._shouldLabelFloat()?this._notchedOutline?._setNotchWidth(0):this._notchedOutline?._setNotchWidth(this._floatingLabel.getWidth())}_processHints(){this._validateHints(),this._syncDescribedByIds()}_validateHints(){this._hintChildren}_syncDescribedByIds(){if(this._control){let e=[];if(this._control.userAriaDescribedBy&&typeof this._control.userAriaDescribedBy=="string"&&e.push(...this._control.userAriaDescribedBy.split(" ")),this._getSubscriptMessageType()==="hint"){let o=this._hintChildren?this._hintChildren.find(s=>s.align==="start"):null,a=this._hintChildren?this._hintChildren.find(s=>s.align==="end"):null;o?e.push(o.id):this._hintLabel&&e.push(this._hintLabelId),a&&e.push(a.id)}else this._errorChildren&&e.push(...this._errorChildren.map(o=>o.id));let i=this._control.describedByIds,r;if(i){let o=this._describedByIds||e;r=e.concat(i.filter(a=>a&&!o.includes(a)))}else r=e;this._control.setDescribedByIds(r),this._describedByIds=e}}_getOutlinedLabelOffset(){if(!this._hasOutline()||!this._floatingLabel)return null;if(!this._iconPrefixContainer&&!this._textPrefixContainer)return["",null];if(!this._isAttachedToDom())return null;let e=this._iconPrefixContainer?.nativeElement,i=this._textPrefixContainer?.nativeElement,r=this._iconSuffixContainer?.nativeElement,o=this._textSuffixContainer?.nativeElement,a=e?.getBoundingClientRect().width??0,s=i?.getBoundingClientRect().width??0,l=r?.getBoundingClientRect().width??0,d=o?.getBoundingClientRect().width??0,u=this._currentDirection==="rtl"?"-1":"1",f=`${a+s}px`,g=`calc(${u} * (${f} + var(--mat-mdc-form-field-label-offset-x, 0px)))`,C=`var(--mat-mdc-form-field-label-transform, ${AA} translateX(${g}))`,F=a+s+l+d;return[C,F]}_writeOutlinedLabelStyles(e){if(e!==null){let[i,r]=e;this._floatingLabel&&(this._floatingLabel.element.style.transform=i),r!==null&&this._notchedOutline?._setMaxWidth(r)}}_isAttachedToDom(){let e=this._elementRef.nativeElement;if(e.getRootNode){let i=e.getRootNode();return i&&i!==e}return document.documentElement.contains(e)}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=R({type:t,selectors:[["mat-form-field"]],contentQueries:function(i,r,o){if(i&1&&(Wc(o,r._labelChild,As,5),Kt(o,Os,5)(o,IA,5)(o,LC,5)(o,MA,5)(o,Rs,5)),i&2){Yc();let a;W(a=G())&&(r._formFieldControl=a.first),W(a=G())&&(r._prefixChildren=a),W(a=G())&&(r._suffixChildren=a),W(a=G())&&(r._errorChildren=a),W(a=G())&&(r._hintChildren=a)}},viewQuery:function(i,r){if(i&1&&(Gc(r._iconPrefixContainerSignal,IC,5)(r._textPrefixContainerSignal,SC,5)(r._iconSuffixContainerSignal,kC,5)(r._textSuffixContainerSignal,TC,5),_e(aA,5)(IC,5)(SC,5)(kC,5)(TC,5)(AC,5)(NC,5)(OC,5)),i&2){Yc(4);let o;W(o=G())&&(r._textField=o.first),W(o=G())&&(r._iconPrefixContainer=o.first),W(o=G())&&(r._textPrefixContainer=o.first),W(o=G())&&(r._iconSuffixContainer=o.first),W(o=G())&&(r._textSuffixContainer=o.first),W(o=G())&&(r._floatingLabel=o.first),W(o=G())&&(r._notchedOutline=o.first),W(o=G())&&(r._lineRipple=o.first)}},hostAttrs:[1,"mat-mdc-form-field"],hostVars:38,hostBindings:function(i,r){i&2&&A("mat-mdc-form-field-label-always-float",r._shouldAlwaysFloat())("mat-mdc-form-field-has-icon-prefix",r._hasIconPrefix)("mat-mdc-form-field-has-icon-suffix",r._hasIconSuffix)("mat-form-field-invalid",r._control.errorState)("mat-form-field-disabled",r._control.disabled)("mat-form-field-autofilled",r._control.autofilled)("mat-form-field-appearance-fill",r.appearance=="fill")("mat-form-field-appearance-outline",r.appearance=="outline")("mat-form-field-hide-placeholder",r._hasFloatingLabel()&&!r._shouldLabelFloat())("mat-primary",r.color!=="accent"&&r.color!=="warn")("mat-accent",r.color==="accent")("mat-warn",r.color==="warn")("ng-untouched",r._shouldForward("untouched"))("ng-touched",r._shouldForward("touched"))("ng-pristine",r._shouldForward("pristine"))("ng-dirty",r._shouldForward("dirty"))("ng-valid",r._shouldForward("valid"))("ng-invalid",r._shouldForward("invalid"))("ng-pending",r._shouldForward("pending"))},inputs:{hideRequiredMarker:"hideRequiredMarker",color:"color",floatLabel:"floatLabel",appearance:"appearance",subscriptSizing:"subscriptSizing",hintLabel:"hintLabel"},exportAs:["matFormField"],features:[Re([{provide:Ns,useExisting:t},{provide:VC,useExisting:t}])],ngContentSelectors:lA,decls:18,vars:21,consts:[["labelTemplate",""],["textField",""],["iconPrefixContainer",""],["textPrefixContainer",""],["textSuffixContainer",""],["iconSuffixContainer",""],[1,"mat-mdc-text-field-wrapper","mdc-text-field",3,"click"],[1,"mat-mdc-form-field-focus-overlay"],[1,"mat-mdc-form-field-flex"],["matFormFieldNotchedOutline","",3,"matFormFieldNotchedOutlineOpen"],[1,"mat-mdc-form-field-icon-prefix"],[1,"mat-mdc-form-field-text-prefix"],[1,"mat-mdc-form-field-infix"],[3,"ngTemplateOutlet"],[1,"mat-mdc-form-field-text-suffix"],[1,"mat-mdc-form-field-icon-suffix"],["matFormFieldLineRipple",""],["aria-atomic","true","aria-live","polite",1,"mat-mdc-form-field-subscript-wrapper","mat-mdc-form-field-bottom-align"],[1,"mat-mdc-form-field-error-wrapper"],[1,"mat-mdc-form-field-hint-wrapper"],["matFormFieldFloatingLabel","",3,"floating","monitorResize","id"],["aria-hidden","true",1,"mat-mdc-form-field-required-marker","mdc-floating-label--required"],[3,"id"],[1,"mat-mdc-form-field-hint-spacer"]],template:function(i,r){if(i&1&&(Se(sA),it(0,uA,1,1,"ng-template",null,0,os),m(2,"div",6,1),w("click",function(a){return r._control.onContainerClick(a)}),k(4,fA,1,0,"div",7),m(5,"div",8),k(6,hA,2,2,"div",9),k(7,gA,3,0,"div",10),k(8,_A,3,0,"div",11),m(9,"div",12),k(10,vA,1,1,null,13),oe(11),p(),k(12,yA,3,0,"div",14),k(13,CA,3,0,"div",15),p(),k(14,DA,1,0,"div",16),p(),m(15,"div",17),k(16,xA,2,0,"div",18)(17,EA,5,1,"div",19),p()),i&2){let o;h(2),A("mdc-text-field--filled",!r._hasOutline())("mdc-text-field--outlined",r._hasOutline())("mdc-text-field--no-label",!r._hasFloatingLabel())("mdc-text-field--disabled",r._control.disabled)("mdc-text-field--invalid",r._control.errorState),h(2),T(!r._hasOutline()&&!r._control.disabled?4:-1),h(2),T(r._hasOutline()?6:-1),h(),T(r._hasIconPrefix?7:-1),h(),T(r._hasTextPrefix?8:-1),h(2),T(!r._hasOutline()||r._forceDisplayInfixLabel()?10:-1),h(2),T(r._hasTextSuffix?12:-1),h(),T(r._hasIconSuffix?13:-1),h(),T(r._hasOutline()?-1:14),h(),A("mat-mdc-form-field-subscript-dynamic-size",r.subscriptSizing==="dynamic");let a=r._getSubscriptMessageType();h(),T((o=a)==="error"?16:o==="hint"?17:-1)}},dependencies:[AC,NC,cs,OC,Rs],styles:[`.mdc-text-field {
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
`],encapsulation:2,changeDetection:0})}return t})();var ui=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=Z({type:t});static \u0275inj=q({imports:[fd,zo,he]})}return t})();function jC(t){return Error(`Unable to find icon with the name "${t}"`)}function RA(){return Error("Could not find HttpClient for use with Angular Material icons. Please add provideHttpClient() to your providers.")}function HC(t){return Error(`The URL provided to MatIconRegistry was not trusted as a resource URL via Angular's DomSanitizer. Attempted URL was "${t}".`)}function UC(t){return Error(`The literal provided to MatIconRegistry was not trusted as safe HTML by Angular's DomSanitizer. Attempted literal was "${t}".`)}var fi=class{url;svgText;options;svgElement=null;constructor(n,e,i){this.url=n,this.svgText=e,this.options=i}},$C=(()=>{class t{_httpClient;_sanitizer;_errorHandler;_document;_svgIconConfigs=new Map;_iconSetConfigs=new Map;_cachedIconsByUrl=new Map;_inProgressUrlFetches=new Map;_fontCssClassesByAlias=new Map;_resolvers=[];_defaultFontSetClass=["material-icons","mat-ligature-font"];constructor(e,i,r,o){this._httpClient=e,this._sanitizer=i,this._errorHandler=o,this._document=r}addSvgIcon(e,i,r){return this.addSvgIconInNamespace("",e,i,r)}addSvgIconLiteral(e,i,r){return this.addSvgIconLiteralInNamespace("",e,i,r)}addSvgIconInNamespace(e,i,r,o){return this._addSvgIconConfig(e,i,new fi(r,null,o))}addSvgIconResolver(e){return this._resolvers.push(e),this}addSvgIconLiteralInNamespace(e,i,r,o){let a=this._sanitizer.sanitize(nt.HTML,r);if(!a)throw UC(r);let s=Pr(a);return this._addSvgIconConfig(e,i,new fi("",s,o))}addSvgIconSet(e,i){return this.addSvgIconSetInNamespace("",e,i)}addSvgIconSetLiteral(e,i){return this.addSvgIconSetLiteralInNamespace("",e,i)}addSvgIconSetInNamespace(e,i,r){return this._addSvgIconSetConfig(e,new fi(i,null,r))}addSvgIconSetLiteralInNamespace(e,i,r){let o=this._sanitizer.sanitize(nt.HTML,i);if(!o)throw UC(i);let a=Pr(o);return this._addSvgIconSetConfig(e,new fi("",a,r))}registerFontClassAlias(e,i=e){return this._fontCssClassesByAlias.set(e,i),this}classNameForFontAlias(e){return this._fontCssClassesByAlias.get(e)||e}setDefaultFontSetClass(...e){return this._defaultFontSetClass=e,this}getDefaultFontSetClass(){return this._defaultFontSetClass}getSvgIconFromUrl(e){let i=this._sanitizer.sanitize(nt.RESOURCE_URL,e);if(!i)throw HC(e);let r=this._cachedIconsByUrl.get(i);return r?He(Bd(r)):this._loadSvgIconFromConfig(new fi(e,null)).pipe(kt(o=>this._cachedIconsByUrl.set(i,o)),Ce(o=>Bd(o)))}getNamedSvgIcon(e,i=""){let r=zC(i,e),o=this._svgIconConfigs.get(r);if(o)return this._getSvgFromConfig(o);if(o=this._getIconConfigFromResolvers(i,e),o)return this._svgIconConfigs.set(r,o),this._getSvgFromConfig(o);let a=this._iconSetConfigs.get(i);return a?this._getSvgFromIconSetConfigs(e,a):_a(jC(r))}ngOnDestroy(){this._resolvers=[],this._svgIconConfigs.clear(),this._iconSetConfigs.clear(),this._cachedIconsByUrl.clear()}_getSvgFromConfig(e){return e.svgText?He(Bd(this._svgElementFromConfig(e))):this._loadSvgIconFromConfig(e).pipe(Ce(i=>Bd(i)))}_getSvgFromIconSetConfigs(e,i){let r=this._extractIconWithNameFromAnySet(e,i);if(r)return He(r);let o=i.filter(a=>!a.svgText).map(a=>this._loadSvgIconSetFromConfig(a).pipe(kl(s=>{let d=`Loading icon set URL: ${this._sanitizer.sanitize(nt.RESOURCE_URL,a.url)} failed: ${s.message}`;return this._errorHandler.handleError(new Error(d)),He(null)})));return rr(o).pipe(Ce(()=>{let a=this._extractIconWithNameFromAnySet(e,i);if(!a)throw jC(e);return a}))}_extractIconWithNameFromAnySet(e,i){for(let r=i.length-1;r>=0;r--){let o=i[r];if(o.svgText&&o.svgText.toString().indexOf(e)>-1){let a=this._svgElementFromConfig(o),s=this._extractSvgIconFromSet(a,e,o.options);if(s)return s}}return null}_loadSvgIconFromConfig(e){return this._fetchIcon(e).pipe(kt(i=>e.svgText=i),Ce(()=>this._svgElementFromConfig(e)))}_loadSvgIconSetFromConfig(e){return e.svgText?He(null):this._fetchIcon(e).pipe(kt(i=>e.svgText=i))}_extractSvgIconFromSet(e,i,r){let o=e.querySelector(`[id="${i}"]`);if(!o)return null;let a=o.cloneNode(!0);if(a.removeAttribute("id"),a.nodeName.toLowerCase()==="svg")return this._setSvgAttributes(a,r);if(a.nodeName.toLowerCase()==="symbol")return this._setSvgAttributes(this._toSvgElement(a),r);let s=this._svgElementFromString(Pr("<svg></svg>"));return s.appendChild(a),this._setSvgAttributes(s,r)}_svgElementFromString(e){let i=this._document.createElement("DIV");i.innerHTML=e;let r=i.querySelector("svg");if(!r)throw Error("<svg> tag not found");return r}_toSvgElement(e){let i=this._svgElementFromString(Pr("<svg></svg>")),r=e.attributes;for(let o=0;o<r.length;o++){let{name:a,value:s}=r[o];a!=="id"&&i.setAttribute(a,s)}for(let o=0;o<e.childNodes.length;o++)e.childNodes[o].nodeType===this._document.ELEMENT_NODE&&i.appendChild(e.childNodes[o].cloneNode(!0));return i}_setSvgAttributes(e,i){return e.setAttribute("fit",""),e.setAttribute("height","100%"),e.setAttribute("width","100%"),e.setAttribute("preserveAspectRatio","xMidYMid meet"),e.setAttribute("focusable","false"),i&&i.viewBox&&e.setAttribute("viewBox",i.viewBox),e}_fetchIcon(e){let{url:i,options:r}=e,o=r?.withCredentials??!1;if(!this._httpClient)throw RA();if(i==null)throw Error(`Cannot fetch icon from URL "${i}".`);let a=this._sanitizer.sanitize(nt.RESOURCE_URL,i);if(!a)throw HC(i);let s=this._inProgressUrlFetches.get(a);if(s)return s;let l=this._httpClient.get(a,{responseType:"text",withCredentials:o}).pipe(Ce(d=>Pr(d)),va(()=>this._inProgressUrlFetches.delete(a)),ya());return this._inProgressUrlFetches.set(a,l),l}_addSvgIconConfig(e,i,r){return this._svgIconConfigs.set(zC(e,i),r),this}_addSvgIconSetConfig(e,i){let r=this._iconSetConfigs.get(e);return r?r.push(i):this._iconSetConfigs.set(e,[i]),this}_svgElementFromConfig(e){if(!e.svgElement){let i=this._svgElementFromString(e.svgText);this._setSvgAttributes(i,e.options),e.svgElement=i}return e.svgElement}_getIconConfigFromResolvers(e,i){for(let r=0;r<this._resolvers.length;r++){let o=this._resolvers[r](i,e);if(o)return OA(o)?new fi(o.url,null,o.options):new fi(o,null)}}static \u0275fac=function(i){return new(i||t)(V(at,8),V(Or),V(K,8),V(ht))};static \u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function Bd(t){return t.cloneNode(!0)}function zC(t,n){return t+":"+n}function OA(t){return!!(t.url&&t.options)}var NA=["*"],FA=new y("MAT_ICON_DEFAULT_OPTIONS"),PA=new y("mat-icon-location",{providedIn:"root",factory:()=>{let t=c(K),n=t?t.location:null;return{getPathname:()=>n?n.pathname+n.search:""}}}),WC=["clip-path","color-profile","src","cursor","fill","filter","marker","marker-start","marker-mid","marker-end","mask","stroke"],LA=WC.map(t=>`[${t}]`).join(", "),VA=/^url\(['"]?#(.*?)['"]?\)$/,ln=(()=>{class t{_elementRef=c(L);_iconRegistry=c($C);_location=c(PA);_errorHandler=c(ht);_defaultColor;get color(){return this._color||this._defaultColor}set color(e){this._color=e}_color;inline=!1;get svgIcon(){return this._svgIcon}set svgIcon(e){e!==this._svgIcon&&(e?this._updateSvgIcon(e):this._svgIcon&&this._clearSvgElement(),this._svgIcon=e)}_svgIcon;get fontSet(){return this._fontSet}set fontSet(e){let i=this._cleanupFontValue(e);i!==this._fontSet&&(this._fontSet=i,this._updateFontIconClasses())}_fontSet;get fontIcon(){return this._fontIcon}set fontIcon(e){let i=this._cleanupFontValue(e);i!==this._fontIcon&&(this._fontIcon=i,this._updateFontIconClasses())}_fontIcon;_previousFontSetClass=[];_previousFontIconClass;_svgName=null;_svgNamespace=null;_previousPath;_elementsWithExternalReferences;_currentIconFetch=ce.EMPTY;constructor(){let e=c(new Xt("aria-hidden"),{optional:!0}),i=c(FA,{optional:!0});i&&(i.color&&(this.color=this._defaultColor=i.color),i.fontSet&&(this.fontSet=i.fontSet)),e||this._elementRef.nativeElement.setAttribute("aria-hidden","true")}_splitIconName(e){if(!e)return["",""];let i=e.split(":");switch(i.length){case 1:return["",i[0]];case 2:return i;default:throw Error(`Invalid icon name: "${e}"`)}}ngOnInit(){this._updateFontIconClasses()}ngAfterViewChecked(){let e=this._elementsWithExternalReferences;if(e&&e.size){let i=this._location.getPathname();i!==this._previousPath&&(this._previousPath=i,this._prependPathToReferences(i))}}ngOnDestroy(){this._currentIconFetch.unsubscribe(),this._elementsWithExternalReferences&&this._elementsWithExternalReferences.clear()}_usingFontIcon(){return!this.svgIcon}_setSvgElement(e){this._clearSvgElement();let i=this._location.getPathname();this._previousPath=i,this._cacheChildrenWithExternalReferences(e),this._prependPathToReferences(i),this._elementRef.nativeElement.appendChild(e)}_clearSvgElement(){let e=this._elementRef.nativeElement,i=e.childNodes.length;for(this._elementsWithExternalReferences&&this._elementsWithExternalReferences.clear();i--;){let r=e.childNodes[i];(r.nodeType!==1||r.nodeName.toLowerCase()==="svg")&&r.remove()}}_updateFontIconClasses(){if(!this._usingFontIcon())return;let e=this._elementRef.nativeElement,i=(this.fontSet?this._iconRegistry.classNameForFontAlias(this.fontSet).split(/ +/):this._iconRegistry.getDefaultFontSetClass()).filter(r=>r.length>0);this._previousFontSetClass.forEach(r=>e.classList.remove(r)),i.forEach(r=>e.classList.add(r)),this._previousFontSetClass=i,this.fontIcon!==this._previousFontIconClass&&!i.includes("mat-ligature-font")&&(this._previousFontIconClass&&e.classList.remove(this._previousFontIconClass),this.fontIcon&&e.classList.add(this.fontIcon),this._previousFontIconClass=this.fontIcon)}_cleanupFontValue(e){return typeof e=="string"?e.trim().split(" ")[0]:e}_prependPathToReferences(e){let i=this._elementsWithExternalReferences;i&&i.forEach((r,o)=>{r.forEach(a=>{o.setAttribute(a.name,`url('${e}#${a.value}')`)})})}_cacheChildrenWithExternalReferences(e){let i=e.querySelectorAll(LA),r=this._elementsWithExternalReferences=this._elementsWithExternalReferences||new Map;for(let o=0;o<i.length;o++)WC.forEach(a=>{let s=i[o],l=s.getAttribute(a),d=l?l.match(VA):null;if(d){let u=r.get(s);u||(u=[],r.set(s,u)),u.push({name:a,value:d[1]})}})}_updateSvgIcon(e){if(this._svgNamespace=null,this._svgName=null,this._currentIconFetch.unsubscribe(),e){let[i,r]=this._splitIconName(e);i&&(this._svgNamespace=i),r&&(this._svgName=r),this._currentIconFetch=this._iconRegistry.getNamedSvgIcon(r,i).pipe(mt(1)).subscribe(o=>this._setSvgElement(o),o=>{let a=`Error retrieving icon ${i}:${r}! ${o.message}`;this._errorHandler.handleError(new Error(a))})}}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=R({type:t,selectors:[["mat-icon"]],hostAttrs:["role","img",1,"mat-icon","notranslate"],hostVars:10,hostBindings:function(i,r){i&2&&(O("data-mat-icon-type",r._usingFontIcon()?"font":"svg")("data-mat-icon-name",r._svgName||r.fontIcon)("data-mat-icon-namespace",r._svgNamespace||r.fontSet)("fontIcon",r._usingFontIcon()?r.fontIcon:null),rt(r.color?"mat-"+r.color:""),A("mat-icon-inline",r.inline)("mat-icon-no-color",r.color!=="primary"&&r.color!=="accent"&&r.color!=="warn"))},inputs:{color:"color",inline:[2,"inline","inline",U],svgIcon:"svgIcon",fontSet:"fontSet",fontIcon:"fontIcon"},exportAs:["matIcon"],ngContentSelectors:NA,decls:1,vars:0,template:function(i,r){i&1&&(Se(),oe(0))},styles:[`mat-icon, mat-icon.mat-primary, mat-icon.mat-accent, mat-icon.mat-warn {
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
`],encapsulation:2,changeDetection:0})}return t})(),cn=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=Z({type:t});static \u0275inj=q({imports:[he]})}return t})();var BA=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275cmp=R({type:t,selectors:[["ng-component"]],hostAttrs:["cdk-text-field-style-loader",""],decls:0,vars:0,template:function(i,r){},styles:[`textarea.cdk-textarea-autosize {
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
`],encapsulation:2,changeDetection:0})}return t})(),jA={passive:!0},GC=(()=>{class t{_platform=c(pe);_ngZone=c(P);_renderer=c(Ke).createRenderer(null,null);_styleLoader=c(Oe);_monitoredElements=new Map;constructor(){}monitor(e){if(!this._platform.isBrowser)return er;this._styleLoader.load(BA);let i=Bt(e),r=this._monitoredElements.get(i);if(r)return r.subject;let o=new M,a="cdk-text-field-autofilled",s=d=>{d.animationName==="cdk-text-field-autofill-start"&&!i.classList.contains(a)?(i.classList.add(a),this._ngZone.run(()=>o.next({target:d.target,isAutofilled:!0}))):d.animationName==="cdk-text-field-autofill-end"&&i.classList.contains(a)&&(i.classList.remove(a),this._ngZone.run(()=>o.next({target:d.target,isAutofilled:!1})))},l=this._ngZone.runOutsideAngular(()=>(i.classList.add("cdk-text-field-autofill-monitored"),this._renderer.listen(i,"animationstart",s,jA)));return this._monitoredElements.set(i,{subject:o,unlisten:l}),o}stopMonitoring(e){let i=Bt(e),r=this._monitoredElements.get(i);r&&(r.unlisten(),r.subject.complete(),i.classList.remove("cdk-text-field-autofill-monitored"),i.classList.remove("cdk-text-field-autofilled"),this._monitoredElements.delete(i))}ngOnDestroy(){this._monitoredElements.forEach((e,i)=>this.stopMonitoring(i))}static \u0275fac=function(i){return new(i||t)};static \u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var YC=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=Z({type:t});static \u0275inj=q({})}return t})();var nD=(()=>{class t{_renderer;_elementRef;onChange=e=>{};onTouched=()=>{};constructor(e,i){this._renderer=e,this._elementRef=i}setProperty(e,i){this._renderer.setProperty(this._elementRef.nativeElement,e,i)}registerOnTouched(e){this.onTouched=e}registerOnChange(e){this.onChange=e}setDisabledState(e){this.setProperty("disabled",e)}static \u0275fac=function(i){return new(i||t)(J(Te),J(L))};static \u0275dir=$({type:t})}return t})(),HA=(()=>{class t extends nD{static \u0275fac=(()=>{let e;return function(r){return(e||(e=Vt(t)))(r||t)}})();static \u0275dir=$({type:t,features:[ve]})}return t})(),Ur=new y("");var UA={provide:Ur,useExisting:gt(()=>Zd),multi:!0};function zA(){let t=en()?en().getUserAgent():"";return/android (\d+)/.test(t.toLowerCase())}var $A=new y(""),Zd=(()=>{class t extends nD{_compositionMode;_composing=!1;constructor(e,i,r){super(e,i),this._compositionMode=r,this._compositionMode==null&&(this._compositionMode=!zA())}writeValue(e){let i=e??"";this.setProperty("value",i)}_handleInput(e){(!this._compositionMode||this._compositionMode&&!this._composing)&&this.onChange(e)}_compositionStart(){this._composing=!0}_compositionEnd(e){this._composing=!1,this._compositionMode&&this.onChange(e)}static \u0275fac=function(i){return new(i||t)(J(Te),J(L),J($A,8))};static \u0275dir=$({type:t,selectors:[["input","formControlName","",3,"type","checkbox"],["textarea","formControlName",""],["input","formControl","",3,"type","checkbox"],["textarea","formControl",""],["input","ngModel","",3,"type","checkbox"],["textarea","ngModel",""],["","ngDefaultControl",""]],hostBindings:function(i,r){i&1&&w("input",function(a){return r._handleInput(a.target.value)})("blur",function(){return r.onTouched()})("compositionstart",function(){return r._compositionStart()})("compositionend",function(a){return r._compositionEnd(a.target.value)})},standalone:!1,features:[Re([UA]),ve]})}return t})();function Vh(t){return t==null||Bh(t)===0}function Bh(t){return t==null?null:Array.isArray(t)||typeof t=="string"?t.length:t instanceof Set?t.size:null}var Ko=new y(""),Kd=new y(""),WA=/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,Yo=class{static min(n){return GA(n)}static max(n){return YA(n)}static required(n){return qA(n)}static requiredTrue(n){return ZA(n)}static email(n){return KA(n)}static minLength(n){return QA(n)}static maxLength(n){return XA(n)}static pattern(n){return JA(n)}static nullValidator(n){return iD()}static compose(n){return cD(n)}static composeAsync(n){return dD(n)}};function GA(t){return n=>{if(n.value==null||t==null)return null;let e=parseFloat(n.value);return!isNaN(e)&&e<t?{min:{min:t,actual:n.value}}:null}}function YA(t){return n=>{if(n.value==null||t==null)return null;let e=parseFloat(n.value);return!isNaN(e)&&e>t?{max:{max:t,actual:n.value}}:null}}function qA(t){return Vh(t.value)?{required:!0}:null}function ZA(t){return t.value===!0?null:{required:!0}}function KA(t){return Vh(t.value)||WA.test(t.value)?null:{email:!0}}function QA(t){return n=>{let e=n.value?.length??Bh(n.value);return e===null||e===0?null:e<t?{minlength:{requiredLength:t,actualLength:e}}:null}}function XA(t){return n=>{let e=n.value?.length??Bh(n.value);return e!==null&&e>t?{maxlength:{requiredLength:t,actualLength:e}}:null}}function JA(t){if(!t)return iD;let n,e;return typeof t=="string"?(e="",t.charAt(0)!=="^"&&(e+="^"),e+=t,t.charAt(t.length-1)!=="$"&&(e+="$"),n=new RegExp(e)):(e=t.toString(),n=t),i=>{if(Vh(i.value))return null;let r=i.value;return n.test(r)?null:{pattern:{requiredPattern:e,actualValue:r}}}}function iD(t){return null}function rD(t){return t!=null}function oD(t){return Eo(t)?$t(t):t}function aD(t){let n={};return t.forEach(e=>{n=e!=null?I(I({},n),e):n}),Object.keys(n).length===0?null:n}function sD(t,n){return n.map(e=>e(t))}function eR(t){return!t.validate}function lD(t){return t.map(n=>eR(n)?n:e=>n.validate(e))}function cD(t){if(!t)return null;let n=t.filter(rD);return n.length==0?null:function(e){return aD(sD(e,n))}}function jh(t){return t!=null?cD(lD(t)):null}function dD(t){if(!t)return null;let n=t.filter(rD);return n.length==0?null:function(e){let i=sD(e,n).map(oD);return rr(i).pipe(Ce(aD))}}function Hh(t){return t!=null?dD(lD(t)):null}function qC(t,n){return t===null?[n]:Array.isArray(t)?[...t,n]:[t,n]}function uD(t){return t._rawValidators}function fD(t){return t._rawAsyncValidators}function Fh(t){return t?Array.isArray(t)?t:[t]:[]}function Hd(t,n){return Array.isArray(t)?t.includes(n):t===n}function ZC(t,n){let e=Fh(n);return Fh(t).forEach(r=>{Hd(e,r)||e.push(r)}),e}function KC(t,n){return Fh(n).filter(e=>!Hd(t,e))}var Ud=class{get value(){return this.control?this.control.value:null}get valid(){return this.control?this.control.valid:null}get invalid(){return this.control?this.control.invalid:null}get pending(){return this.control?this.control.pending:null}get disabled(){return this.control?this.control.disabled:null}get enabled(){return this.control?this.control.enabled:null}get errors(){return this.control?this.control.errors:null}get pristine(){return this.control?this.control.pristine:null}get dirty(){return this.control?this.control.dirty:null}get touched(){return this.control?this.control.touched:null}get status(){return this.control?this.control.status:null}get untouched(){return this.control?this.control.untouched:null}get statusChanges(){return this.control?this.control.statusChanges:null}get valueChanges(){return this.control?this.control.valueChanges:null}get path(){return null}_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators=[];_rawAsyncValidators=[];_setValidators(n){this._rawValidators=n||[],this._composedValidatorFn=jh(this._rawValidators)}_setAsyncValidators(n){this._rawAsyncValidators=n||[],this._composedAsyncValidatorFn=Hh(this._rawAsyncValidators)}get validator(){return this._composedValidatorFn||null}get asyncValidator(){return this._composedAsyncValidatorFn||null}_onDestroyCallbacks=[];_registerOnDestroy(n){this._onDestroyCallbacks.push(n)}_invokeOnDestroyCallbacks(){this._onDestroyCallbacks.forEach(n=>n()),this._onDestroyCallbacks=[]}reset(n=void 0){this.control?.reset(n)}hasError(n,e){return this.control?this.control.hasError(n,e):!1}getError(n,e){return this.control?this.control.getError(n,e):null}},mi=class extends Ud{name;get formDirective(){return null}get path(){return null}},Fn=class extends Ud{_parent=null;name=null;valueAccessor=null},zd=class{_cd;constructor(n){this._cd=n}get isTouched(){return this._cd?.control?._touched?.(),!!this._cd?.control?.touched}get isUntouched(){return!!this._cd?.control?.untouched}get isPristine(){return this._cd?.control?._pristine?.(),!!this._cd?.control?.pristine}get isDirty(){return!!this._cd?.control?.dirty}get isValid(){return this._cd?.control?._status?.(),!!this._cd?.control?.valid}get isInvalid(){return!!this._cd?.control?.invalid}get isPending(){return!!this._cd?.control?.pending}get isSubmitted(){return this._cd?._submitted?.(),!!this._cd?.submitted}};var mD=(()=>{class t extends zd{constructor(e){super(e)}static \u0275fac=function(i){return new(i||t)(J(Fn,2))};static \u0275dir=$({type:t,selectors:[["","formControlName",""],["","ngModel",""],["","formControl",""]],hostVars:14,hostBindings:function(i,r){i&2&&A("ng-untouched",r.isUntouched)("ng-touched",r.isTouched)("ng-pristine",r.isPristine)("ng-dirty",r.isDirty)("ng-valid",r.isValid)("ng-invalid",r.isInvalid)("ng-pending",r.isPending)},standalone:!1,features:[ve]})}return t})(),pD=(()=>{class t extends zd{constructor(e){super(e)}static \u0275fac=function(i){return new(i||t)(J(mi,10))};static \u0275dir=$({type:t,selectors:[["","formGroupName",""],["","formArrayName",""],["","ngModelGroup",""],["","formGroup",""],["","formArray",""],["form",3,"ngNoForm",""],["","ngForm",""]],hostVars:16,hostBindings:function(i,r){i&2&&A("ng-untouched",r.isUntouched)("ng-touched",r.isTouched)("ng-pristine",r.isPristine)("ng-dirty",r.isDirty)("ng-valid",r.isValid)("ng-invalid",r.isInvalid)("ng-pending",r.isPending)("ng-submitted",r.isSubmitted)},standalone:!1,features:[ve]})}return t})();var Fs="VALID",jd="INVALID",Wo="PENDING",Ps="DISABLED",zi=class{},$d=class extends zi{value;source;constructor(n,e){super(),this.value=n,this.source=e}},Vs=class extends zi{pristine;source;constructor(n,e){super(),this.pristine=n,this.source=e}},Bs=class extends zi{touched;source;constructor(n,e){super(),this.touched=n,this.source=e}},Go=class extends zi{status;source;constructor(n,e){super(),this.status=n,this.source=e}},Wd=class extends zi{source;constructor(n){super(),this.source=n}},Hs=class extends zi{source;constructor(n){super(),this.source=n}};function Uh(t){return(Qd(t)?t.validators:t)||null}function tR(t){return Array.isArray(t)?jh(t):t||null}function zh(t,n){return(Qd(n)?n.asyncValidators:t)||null}function nR(t){return Array.isArray(t)?Hh(t):t||null}function Qd(t){return t!=null&&!Array.isArray(t)&&typeof t=="object"}function hD(t,n,e){let i=t.controls;if(!(n?Object.keys(i):i).length)throw new X(1e3,"");if(!i[e])throw new X(1001,"")}function gD(t,n,e){t._forEachChild((i,r)=>{if(e[r]===void 0)throw new X(-1002,"")})}var qo=class{_pendingDirty=!1;_hasOwnPendingAsyncValidator=null;_pendingTouched=!1;_onCollectionChange=()=>{};_updateOn;_parent=null;_asyncValidationSubscription;_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators;_rawAsyncValidators;value;constructor(n,e){this._assignValidators(n),this._assignAsyncValidators(e)}get validator(){return this._composedValidatorFn}set validator(n){this._rawValidators=this._composedValidatorFn=n}get asyncValidator(){return this._composedAsyncValidatorFn}set asyncValidator(n){this._rawAsyncValidators=this._composedAsyncValidatorFn=n}get parent(){return this._parent}get status(){return Qt(this.statusReactive)}set status(n){Qt(()=>this.statusReactive.set(n))}_status=ke(()=>this.statusReactive());statusReactive=x(void 0);get valid(){return this.status===Fs}get invalid(){return this.status===jd}get pending(){return this.status===Wo}get disabled(){return this.status===Ps}get enabled(){return this.status!==Ps}errors;get pristine(){return Qt(this.pristineReactive)}set pristine(n){Qt(()=>this.pristineReactive.set(n))}_pristine=ke(()=>this.pristineReactive());pristineReactive=x(!0);get dirty(){return!this.pristine}get touched(){return Qt(this.touchedReactive)}set touched(n){Qt(()=>this.touchedReactive.set(n))}_touched=ke(()=>this.touchedReactive());touchedReactive=x(!1);get untouched(){return!this.touched}_events=new M;events=this._events.asObservable();valueChanges;statusChanges;get updateOn(){return this._updateOn?this._updateOn:this.parent?this.parent.updateOn:"change"}setValidators(n){this._assignValidators(n)}setAsyncValidators(n){this._assignAsyncValidators(n)}addValidators(n){this.setValidators(ZC(n,this._rawValidators))}addAsyncValidators(n){this.setAsyncValidators(ZC(n,this._rawAsyncValidators))}removeValidators(n){this.setValidators(KC(n,this._rawValidators))}removeAsyncValidators(n){this.setAsyncValidators(KC(n,this._rawAsyncValidators))}hasValidator(n){return Hd(this._rawValidators,n)}hasAsyncValidator(n){return Hd(this._rawAsyncValidators,n)}clearValidators(){this.validator=null}clearAsyncValidators(){this.asyncValidator=null}markAsTouched(n={}){let e=this.touched===!1;this.touched=!0;let i=n.sourceControl??this;n.onlySelf||this._parent?.markAsTouched(se(I({},n),{sourceControl:i})),e&&n.emitEvent!==!1&&this._events.next(new Bs(!0,i))}markAllAsDirty(n={}){this.markAsDirty({onlySelf:!0,emitEvent:n.emitEvent,sourceControl:this}),this._forEachChild(e=>e.markAllAsDirty(n))}markAllAsTouched(n={}){this.markAsTouched({onlySelf:!0,emitEvent:n.emitEvent,sourceControl:this}),this._forEachChild(e=>e.markAllAsTouched(n))}markAsUntouched(n={}){let e=this.touched===!0;this.touched=!1,this._pendingTouched=!1;let i=n.sourceControl??this;this._forEachChild(r=>{r.markAsUntouched({onlySelf:!0,emitEvent:n.emitEvent,sourceControl:i})}),n.onlySelf||this._parent?._updateTouched(n,i),e&&n.emitEvent!==!1&&this._events.next(new Bs(!1,i))}markAsDirty(n={}){let e=this.pristine===!0;this.pristine=!1;let i=n.sourceControl??this;n.onlySelf||this._parent?.markAsDirty(se(I({},n),{sourceControl:i})),e&&n.emitEvent!==!1&&this._events.next(new Vs(!1,i))}markAsPristine(n={}){let e=this.pristine===!1;this.pristine=!0,this._pendingDirty=!1;let i=n.sourceControl??this;this._forEachChild(r=>{r.markAsPristine({onlySelf:!0,emitEvent:n.emitEvent})}),n.onlySelf||this._parent?._updatePristine(n,i),e&&n.emitEvent!==!1&&this._events.next(new Vs(!0,i))}markAsPending(n={}){this.status=Wo;let e=n.sourceControl??this;n.emitEvent!==!1&&(this._events.next(new Go(this.status,e)),this.statusChanges.emit(this.status)),n.onlySelf||this._parent?.markAsPending(se(I({},n),{sourceControl:e}))}disable(n={}){let e=this._parentMarkedDirty(n.onlySelf);this.status=Ps,this.errors=null,this._forEachChild(r=>{r.disable(se(I({},n),{onlySelf:!0}))}),this._updateValue();let i=n.sourceControl??this;n.emitEvent!==!1&&(this._events.next(new $d(this.value,i)),this._events.next(new Go(this.status,i)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._updateAncestors(se(I({},n),{skipPristineCheck:e}),this),this._onDisabledChange.forEach(r=>r(!0))}enable(n={}){let e=this._parentMarkedDirty(n.onlySelf);this.status=Fs,this._forEachChild(i=>{i.enable(se(I({},n),{onlySelf:!0}))}),this.updateValueAndValidity({onlySelf:!0,emitEvent:n.emitEvent}),this._updateAncestors(se(I({},n),{skipPristineCheck:e}),this),this._onDisabledChange.forEach(i=>i(!1))}_updateAncestors(n,e){n.onlySelf||(this._parent?.updateValueAndValidity(n),n.skipPristineCheck||this._parent?._updatePristine({},e),this._parent?._updateTouched({},e))}setParent(n){this._parent=n}getRawValue(){return this.value}updateValueAndValidity(n={}){if(this._setInitialStatus(),this._updateValue(),this.enabled){let i=this._cancelExistingSubscription();this.errors=this._runValidator(),this.status=this._calculateStatus(),(this.status===Fs||this.status===Wo)&&this._runAsyncValidator(i,n.emitEvent)}let e=n.sourceControl??this;n.emitEvent!==!1&&(this._events.next(new $d(this.value,e)),this._events.next(new Go(this.status,e)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),n.onlySelf||this._parent?.updateValueAndValidity(se(I({},n),{sourceControl:e}))}_updateTreeValidity(n={emitEvent:!0}){this._forEachChild(e=>e._updateTreeValidity(n)),this.updateValueAndValidity({onlySelf:!0,emitEvent:n.emitEvent})}_setInitialStatus(){this.status=this._allControlsDisabled()?Ps:Fs}_runValidator(){return this.validator?this.validator(this):null}_runAsyncValidator(n,e){if(this.asyncValidator){this.status=Wo,this._hasOwnPendingAsyncValidator={emitEvent:e!==!1,shouldHaveEmitted:n!==!1};let i=oD(this.asyncValidator(this));this._asyncValidationSubscription=i.subscribe(r=>{this._hasOwnPendingAsyncValidator=null,this.setErrors(r,{emitEvent:e,shouldHaveEmitted:n})})}}_cancelExistingSubscription(){if(this._asyncValidationSubscription){this._asyncValidationSubscription.unsubscribe();let n=(this._hasOwnPendingAsyncValidator?.emitEvent||this._hasOwnPendingAsyncValidator?.shouldHaveEmitted)??!1;return this._hasOwnPendingAsyncValidator=null,n}return!1}setErrors(n,e={}){this.errors=n,this._updateControlsErrors(e.emitEvent!==!1,this,e.shouldHaveEmitted)}get(n){let e=n;return e==null||(Array.isArray(e)||(e=e.split(".")),e.length===0)?null:e.reduce((i,r)=>i&&i._find(r),this)}getError(n,e){let i=e?this.get(e):this;return i?.errors?i.errors[n]:null}hasError(n,e){return!!this.getError(n,e)}get root(){let n=this;for(;n._parent;)n=n._parent;return n}_updateControlsErrors(n,e,i){this.status=this._calculateStatus(),n&&this.statusChanges.emit(this.status),(n||i)&&this._events.next(new Go(this.status,e)),this._parent&&this._parent._updateControlsErrors(n,e,i)}_initObservables(){this.valueChanges=new S,this.statusChanges=new S}_calculateStatus(){return this._allControlsDisabled()?Ps:this.errors?jd:this._hasOwnPendingAsyncValidator||this._anyControlsHaveStatus(Wo)?Wo:this._anyControlsHaveStatus(jd)?jd:Fs}_anyControlsHaveStatus(n){return this._anyControls(e=>e.status===n)}_anyControlsDirty(){return this._anyControls(n=>n.dirty)}_anyControlsTouched(){return this._anyControls(n=>n.touched)}_updatePristine(n,e){let i=!this._anyControlsDirty(),r=this.pristine!==i;this.pristine=i,n.onlySelf||this._parent?._updatePristine(n,e),r&&this._events.next(new Vs(this.pristine,e))}_updateTouched(n={},e){this.touched=this._anyControlsTouched(),this._events.next(new Bs(this.touched,e)),n.onlySelf||this._parent?._updateTouched(n,e)}_onDisabledChange=[];_registerOnCollectionChange(n){this._onCollectionChange=n}_setUpdateStrategy(n){Qd(n)&&n.updateOn!=null&&(this._updateOn=n.updateOn)}_parentMarkedDirty(n){return!n&&!!this._parent?.dirty&&!this._parent._anyControlsDirty()}_find(n){return null}_assignValidators(n){this._rawValidators=Array.isArray(n)?n.slice():n,this._composedValidatorFn=tR(this._rawValidators)}_assignAsyncValidators(n){this._rawAsyncValidators=Array.isArray(n)?n.slice():n,this._composedAsyncValidatorFn=nR(this._rawAsyncValidators)}},Zo=class extends qo{constructor(n,e,i){super(Uh(e),zh(i,e)),this.controls=n,this._initObservables(),this._setUpdateStrategy(e),this._setUpControls(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator})}controls;registerControl(n,e){return this.controls[n]?this.controls[n]:(this.controls[n]=e,e.setParent(this),e._registerOnCollectionChange(this._onCollectionChange),e)}addControl(n,e,i={}){this.registerControl(n,e),this.updateValueAndValidity({emitEvent:i.emitEvent}),this._onCollectionChange()}removeControl(n,e={}){this.controls[n]&&this.controls[n]._registerOnCollectionChange(()=>{}),delete this.controls[n],this.updateValueAndValidity({emitEvent:e.emitEvent}),this._onCollectionChange()}setControl(n,e,i={}){this.controls[n]&&this.controls[n]._registerOnCollectionChange(()=>{}),delete this.controls[n],e&&this.registerControl(n,e),this.updateValueAndValidity({emitEvent:i.emitEvent}),this._onCollectionChange()}contains(n){return this.controls.hasOwnProperty(n)&&this.controls[n].enabled}setValue(n,e={}){gD(this,!0,n),Object.keys(n).forEach(i=>{hD(this,!0,i),this.controls[i].setValue(n[i],{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e)}patchValue(n,e={}){n!=null&&(Object.keys(n).forEach(i=>{let r=this.controls[i];r&&r.patchValue(n[i],{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e))}reset(n={},e={}){this._forEachChild((i,r)=>{i.reset(n?n[r]:null,se(I({},e),{onlySelf:!0}))}),this._updatePristine(e,this),this._updateTouched(e,this),this.updateValueAndValidity(e),e?.emitEvent!==!1&&this._events.next(new Hs(this))}getRawValue(){return this._reduceChildren({},(n,e,i)=>(n[i]=e.getRawValue(),n))}_syncPendingControls(){let n=this._reduceChildren(!1,(e,i)=>i._syncPendingControls()?!0:e);return n&&this.updateValueAndValidity({onlySelf:!0}),n}_forEachChild(n){Object.keys(this.controls).forEach(e=>{let i=this.controls[e];i&&n(i,e)})}_setUpControls(){this._forEachChild(n=>{n.setParent(this),n._registerOnCollectionChange(this._onCollectionChange)})}_updateValue(){this.value=this._reduceValue()}_anyControls(n){for(let[e,i]of Object.entries(this.controls))if(this.contains(e)&&n(i))return!0;return!1}_reduceValue(){let n={};return this._reduceChildren(n,(e,i,r)=>((i.enabled||this.disabled)&&(e[r]=i.value),e))}_reduceChildren(n,e){let i=n;return this._forEachChild((r,o)=>{i=e(i,r,o)}),i}_allControlsDisabled(){for(let n of Object.keys(this.controls))if(this.controls[n].enabled)return!1;return Object.keys(this.controls).length>0||this.disabled}_find(n){return this.controls.hasOwnProperty(n)?this.controls[n]:null}};var Ph=class extends Zo{};var Us=new y("",{factory:()=>Xd}),Xd="always";function _D(t,n){return[...n.path,t]}function Gd(t,n,e=Xd){$h(t,n),n.valueAccessor.writeValue(t.value),(t.disabled||e==="always")&&n.valueAccessor.setDisabledState?.(t.disabled),rR(t,n),aR(t,n),oR(t,n),iR(t,n)}function QC(t,n,e=!0){let i=()=>{};n?.valueAccessor?.registerOnChange(i),n?.valueAccessor?.registerOnTouched(i),qd(t,n),t&&(n._invokeOnDestroyCallbacks(),t._registerOnCollectionChange(()=>{}))}function Yd(t,n){t.forEach(e=>{e.registerOnValidatorChange&&e.registerOnValidatorChange(n)})}function iR(t,n){if(n.valueAccessor.setDisabledState){let e=i=>{n.valueAccessor.setDisabledState(i)};t.registerOnDisabledChange(e),n._registerOnDestroy(()=>{t._unregisterOnDisabledChange(e)})}}function $h(t,n){let e=uD(t);n.validator!==null?t.setValidators(qC(e,n.validator)):typeof e=="function"&&t.setValidators([e]);let i=fD(t);n.asyncValidator!==null?t.setAsyncValidators(qC(i,n.asyncValidator)):typeof i=="function"&&t.setAsyncValidators([i]);let r=()=>t.updateValueAndValidity();Yd(n._rawValidators,r),Yd(n._rawAsyncValidators,r)}function qd(t,n){let e=!1;if(t!==null){if(n.validator!==null){let r=uD(t);if(Array.isArray(r)&&r.length>0){let o=r.filter(a=>a!==n.validator);o.length!==r.length&&(e=!0,t.setValidators(o))}}if(n.asyncValidator!==null){let r=fD(t);if(Array.isArray(r)&&r.length>0){let o=r.filter(a=>a!==n.asyncValidator);o.length!==r.length&&(e=!0,t.setAsyncValidators(o))}}}let i=()=>{};return Yd(n._rawValidators,i),Yd(n._rawAsyncValidators,i),e}function rR(t,n){n.valueAccessor.registerOnChange(e=>{t._pendingValue=e,t._pendingChange=!0,t._pendingDirty=!0,t.updateOn==="change"&&bD(t,n)})}function oR(t,n){n.valueAccessor.registerOnTouched(()=>{t._pendingTouched=!0,t.updateOn==="blur"&&t._pendingChange&&bD(t,n),t.updateOn!=="submit"&&t.markAsTouched()})}function bD(t,n){t._pendingDirty&&t.markAsDirty(),t.setValue(t._pendingValue,{emitModelToViewChange:!1}),n.viewToModelUpdate(t._pendingValue),t._pendingChange=!1}function aR(t,n){let e=(i,r)=>{n.valueAccessor.writeValue(i),r&&n.viewToModelUpdate(i)};t.registerOnChange(e),n._registerOnDestroy(()=>{t._unregisterOnChange(e)})}function vD(t,n){t==null,$h(t,n)}function sR(t,n){return qd(t,n)}function yD(t,n){if(!t.hasOwnProperty("model"))return!1;let e=t.model;return e.isFirstChange()?!0:!Object.is(n,e.currentValue)}function lR(t){return Object.getPrototypeOf(t.constructor)===HA}function CD(t,n){t._syncPendingControls(),n.forEach(e=>{let i=e.control;i.updateOn==="submit"&&i._pendingChange&&(e.viewToModelUpdate(i._pendingValue),i._pendingChange=!1)})}function DD(t,n){if(!n)return null;Array.isArray(n);let e,i,r;return n.forEach(o=>{o.constructor===Zd?e=o:lR(o)?i=o:r=o}),r||i||e||null}function cR(t,n){let e=t.indexOf(n);e>-1&&t.splice(e,1)}var dR={provide:mi,useExisting:gt(()=>zs)},Ls=Promise.resolve(),zs=(()=>{class t extends mi{callSetDisabledState;get submitted(){return Qt(this.submittedReactive)}_submitted=ke(()=>this.submittedReactive());submittedReactive=x(!1);_directives=new Set;form;ngSubmit=new S;options;constructor(e,i,r){super(),this.callSetDisabledState=r,this.form=new Zo({},jh(e),Hh(i))}ngAfterViewInit(){this._setUpdateStrategy()}get formDirective(){return this}get control(){return this.form}get path(){return[]}get controls(){return this.form.controls}addControl(e){Ls.then(()=>{let i=this._findContainer(e.path);e.control=i.registerControl(e.name,e.control),Gd(e.control,e,this.callSetDisabledState),e.control.updateValueAndValidity({emitEvent:!1}),this._directives.add(e)})}getControl(e){return this.form.get(e.path)}removeControl(e){Ls.then(()=>{this._findContainer(e.path)?.removeControl(e.name),this._directives.delete(e)})}addFormGroup(e){Ls.then(()=>{let i=this._findContainer(e.path),r=new Zo({});vD(r,e),i.registerControl(e.name,r),r.updateValueAndValidity({emitEvent:!1})})}removeFormGroup(e){Ls.then(()=>{this._findContainer(e.path)?.removeControl?.(e.name)})}getFormGroup(e){return this.form.get(e.path)}updateModel(e,i){Ls.then(()=>{this.form.get(e.path).setValue(i)})}setValue(e){this.control.setValue(e)}onSubmit(e){return this.submittedReactive.set(!0),CD(this.form,this._directives),this.ngSubmit.emit(e),this.form._events.next(new Wd(this.control)),e?.target?.method==="dialog"}onReset(){this.resetForm()}resetForm(e=void 0){this.form.reset(e),this.submittedReactive.set(!1)}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.form._updateOn=this.options.updateOn)}_findContainer(e){return e.pop(),e.length?this.form.get(e):this.form}static \u0275fac=function(i){return new(i||t)(J(Ko,10),J(Kd,10),J(Us,8))};static \u0275dir=$({type:t,selectors:[["form",3,"ngNoForm","",3,"formGroup","",3,"formArray",""],["ng-form"],["","ngForm",""]],hostBindings:function(i,r){i&1&&w("submit",function(a){return r.onSubmit(a)})("reset",function(){return r.onReset()})},inputs:{options:[0,"ngFormOptions","options"]},outputs:{ngSubmit:"ngSubmit"},exportAs:["ngForm"],standalone:!1,features:[Re([dR]),ve]})}return t})();function XC(t,n){let e=t.indexOf(n);e>-1&&t.splice(e,1)}function JC(t){return typeof t=="object"&&t!==null&&Object.keys(t).length===2&&"value"in t&&"disabled"in t}var js=class extends qo{defaultValue=null;_onChange=[];_pendingValue;_pendingChange=!1;constructor(n=null,e,i){super(Uh(e),zh(i,e)),this._applyFormState(n),this._setUpdateStrategy(e),this._initObservables(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator}),Qd(e)&&(e.nonNullable||e.initialValueIsDefault)&&(JC(n)?this.defaultValue=n.value:this.defaultValue=n)}setValue(n,e={}){this.value=this._pendingValue=n,this._onChange.length&&e.emitModelToViewChange!==!1&&this._onChange.forEach(i=>i(this.value,e.emitViewToModelChange!==!1)),this.updateValueAndValidity(e)}patchValue(n,e={}){this.setValue(n,e)}reset(n=this.defaultValue,e={}){this._applyFormState(n),this.markAsPristine(e),this.markAsUntouched(e),this.setValue(this.value,e),e.overwriteDefaultValue&&(this.defaultValue=this.value),this._pendingChange=!1,e?.emitEvent!==!1&&this._events.next(new Hs(this))}_updateValue(){}_anyControls(n){return!1}_allControlsDisabled(){return this.disabled}registerOnChange(n){this._onChange.push(n)}_unregisterOnChange(n){XC(this._onChange,n)}registerOnDisabledChange(n){this._onDisabledChange.push(n)}_unregisterOnDisabledChange(n){XC(this._onDisabledChange,n)}_forEachChild(n){}_syncPendingControls(){return this.updateOn==="submit"&&(this._pendingDirty&&this.markAsDirty(),this._pendingTouched&&this.markAsTouched(),this._pendingChange)?(this.setValue(this._pendingValue,{onlySelf:!0,emitModelToViewChange:!1}),!0):!1}_applyFormState(n){JC(n)?(this.value=this._pendingValue=n.value,n.disabled?this.disable({onlySelf:!0,emitEvent:!1}):this.enable({onlySelf:!0,emitEvent:!1})):this.value=this._pendingValue=n}};var uR=t=>t instanceof js;var fR={provide:Fn,useExisting:gt(()=>Wh)},eD=Promise.resolve(),Wh=(()=>{class t extends Fn{_changeDetectorRef;callSetDisabledState;control=new js;static ngAcceptInputType_isDisabled;_registered=!1;viewModel;name="";isDisabled;model;options;update=new S;constructor(e,i,r,o,a,s){super(),this._changeDetectorRef=a,this.callSetDisabledState=s,this._parent=e,this._setValidators(i),this._setAsyncValidators(r),this.valueAccessor=DD(this,o)}ngOnChanges(e){if(this._checkForErrors(),!this._registered||"name"in e){if(this._registered&&(this._checkName(),this.formDirective)){let i=e.name.previousValue;this.formDirective.removeControl({name:i,path:this._getPath(i)})}this._setUpControl()}"isDisabled"in e&&this._updateDisabled(e),yD(e,this.viewModel)&&(this._updateValue(this.model),this.viewModel=this.model)}ngOnDestroy(){this.formDirective?.removeControl(this)}get path(){return this._getPath(this.name)}get formDirective(){return this._parent?this._parent.formDirective:null}viewToModelUpdate(e){this.viewModel=e,this.update.emit(e)}_setUpControl(){this._setUpdateStrategy(),this._isStandalone()?this._setUpStandalone():this.formDirective.addControl(this),this._registered=!0}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.control._updateOn=this.options.updateOn)}_isStandalone(){return!this._parent||!!(this.options&&this.options.standalone)}_setUpStandalone(){Gd(this.control,this,this.callSetDisabledState),this.control.updateValueAndValidity({emitEvent:!1})}_checkForErrors(){this._checkName()}_checkName(){this.options&&this.options.name&&(this.name=this.options.name),!this._isStandalone()&&this.name}_updateValue(e){eD.then(()=>{this.control.setValue(e,{emitViewToModelChange:!1}),this._changeDetectorRef?.markForCheck()})}_updateDisabled(e){let i=e.isDisabled.currentValue,r=i!==0&&U(i);eD.then(()=>{r&&!this.control.disabled?this.control.disable():!r&&this.control.disabled&&this.control.enable(),this._changeDetectorRef?.markForCheck()})}_getPath(e){return this._parent?_D(e,this._parent):[e]}static \u0275fac=function(i){return new(i||t)(J(mi,9),J(Ko,10),J(Kd,10),J(Ur,10),J(be,8),J(Us,8))};static \u0275dir=$({type:t,selectors:[["","ngModel","",3,"formControlName","",3,"formControl",""]],inputs:{name:"name",isDisabled:[0,"disabled","isDisabled"],model:[0,"ngModel","model"],options:[0,"ngModelOptions","options"]},outputs:{update:"ngModelChange"},exportAs:["ngModel"],standalone:!1,features:[Re([fR]),ve,Be]})}return t})();var xD=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=$({type:t,selectors:[["form",3,"ngNoForm","",3,"ngNativeValidate",""]],hostAttrs:["novalidate",""],standalone:!1})}return t})();var Lh=class extends qo{constructor(n,e,i){super(Uh(e),zh(i,e)),this.controls=n,this._initObservables(),this._setUpdateStrategy(e),this._setUpControls(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator})}controls;at(n){return this.controls[this._adjustIndex(n)]}push(n,e={}){Array.isArray(n)?n.forEach(i=>{this.controls.push(i),this._registerControl(i)}):(this.controls.push(n),this._registerControl(n)),this.updateValueAndValidity({emitEvent:e.emitEvent}),this._onCollectionChange()}insert(n,e,i={}){this.controls.splice(n,0,e),this._registerControl(e),this.updateValueAndValidity({emitEvent:i.emitEvent})}removeAt(n,e={}){let i=this._adjustIndex(n);i<0&&(i=0),this.controls[i]&&this.controls[i]._registerOnCollectionChange(()=>{}),this.controls.splice(i,1),this.updateValueAndValidity({emitEvent:e.emitEvent})}setControl(n,e,i={}){let r=this._adjustIndex(n);r<0&&(r=0),this.controls[r]&&this.controls[r]._registerOnCollectionChange(()=>{}),this.controls.splice(r,1),e&&(this.controls.splice(r,0,e),this._registerControl(e)),this.updateValueAndValidity({emitEvent:i.emitEvent}),this._onCollectionChange()}get length(){return this.controls.length}setValue(n,e={}){gD(this,!1,n),n.forEach((i,r)=>{hD(this,!1,r),this.at(r).setValue(i,{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e)}patchValue(n,e={}){n!=null&&(n.forEach((i,r)=>{this.at(r)&&this.at(r).patchValue(i,{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e))}reset(n=[],e={}){this._forEachChild((i,r)=>{i.reset(n[r],se(I({},e),{onlySelf:!0}))}),this._updatePristine(e,this),this._updateTouched(e,this),this.updateValueAndValidity(e),e?.emitEvent!==!1&&this._events.next(new Hs(this))}getRawValue(){return this.controls.map(n=>n.getRawValue())}clear(n={}){this.controls.length<1||(this._forEachChild(e=>e._registerOnCollectionChange(()=>{})),this.controls.splice(0),this.updateValueAndValidity({emitEvent:n.emitEvent}))}_adjustIndex(n){return n<0?n+this.length:n}_syncPendingControls(){let n=this.controls.reduce((e,i)=>i._syncPendingControls()?!0:e,!1);return n&&this.updateValueAndValidity({onlySelf:!0}),n}_forEachChild(n){this.controls.forEach((e,i)=>{n(e,i)})}_updateValue(){this.value=this.controls.filter(n=>n.enabled||this.disabled).map(n=>n.value)}_anyControls(n){return this.controls.some(e=>e.enabled&&n(e))}_setUpControls(){this._forEachChild(n=>this._registerControl(n))}_allControlsDisabled(){for(let n of this.controls)if(n.enabled)return!1;return this.controls.length>0||this.disabled}_registerControl(n){n.setParent(this),n._registerOnCollectionChange(this._onCollectionChange)}_find(n){return this.at(n)??null}};var mR=(()=>{class t extends mi{callSetDisabledState;get submitted(){return Qt(this._submittedReactive)}set submitted(e){this._submittedReactive.set(e)}_submitted=ke(()=>this._submittedReactive());_submittedReactive=x(!1);_oldForm;_onCollectionChange=()=>this._updateDomValue();directives=[];constructor(e,i,r){super(),this.callSetDisabledState=r,this._setValidators(e),this._setAsyncValidators(i)}ngOnChanges(e){this.onChanges(e)}ngOnDestroy(){this.onDestroy()}onChanges(e){this._checkFormPresent(),e.hasOwnProperty("form")&&(this._updateValidators(),this._updateDomValue(),this._updateRegistrations(),this._oldForm=this.form)}onDestroy(){this.form&&(qd(this.form,this),this.form._onCollectionChange===this._onCollectionChange&&this.form._registerOnCollectionChange(()=>{}))}get formDirective(){return this}get path(){return[]}addControl(e){let i=this.form.get(e.path);return Gd(i,e,this.callSetDisabledState),i.updateValueAndValidity({emitEvent:!1}),this.directives.push(e),i}getControl(e){return this.form.get(e.path)}removeControl(e){QC(e.control||null,e,!1),cR(this.directives,e)}addFormGroup(e){this._setUpFormContainer(e)}removeFormGroup(e){this._cleanUpFormContainer(e)}getFormGroup(e){return this.form.get(e.path)}getFormArray(e){return this.form.get(e.path)}addFormArray(e){this._setUpFormContainer(e)}removeFormArray(e){this._cleanUpFormContainer(e)}updateModel(e,i){this.form.get(e.path).setValue(i)}onReset(){this.resetForm()}resetForm(e=void 0,i={}){this.form.reset(e,i),this._submittedReactive.set(!1)}onSubmit(e){return this.submitted=!0,CD(this.form,this.directives),this.ngSubmit.emit(e),this.form._events.next(new Wd(this.control)),e?.target?.method==="dialog"}_updateDomValue(){this.directives.forEach(e=>{let i=e.control,r=this.form.get(e.path);i!==r&&(QC(i||null,e),uR(r)&&(Gd(r,e,this.callSetDisabledState),e.control=r))}),this.form._updateTreeValidity({emitEvent:!1})}_setUpFormContainer(e){let i=this.form.get(e.path);vD(i,e),i.updateValueAndValidity({emitEvent:!1})}_cleanUpFormContainer(e){let i=this.form?.get(e.path);i&&sR(i,e)&&i.updateValueAndValidity({emitEvent:!1})}_updateRegistrations(){this.form._registerOnCollectionChange(this._onCollectionChange),this._oldForm?._registerOnCollectionChange(()=>{})}_updateValidators(){$h(this.form,this),this._oldForm&&qd(this._oldForm,this)}_checkFormPresent(){this.form}static \u0275fac=function(i){return new(i||t)(J(Ko,10),J(Kd,10),J(Us,8))};static \u0275dir=$({type:t,features:[ve,Be]})}return t})();var wD=new y("");var pR={provide:Fn,useExisting:gt(()=>Gh)},Gh=(()=>{class t extends Fn{_ngModelWarningConfig;_added=!1;viewModel;control;name=null;set isDisabled(e){}model;update=new S;static _ngModelWarningSentOnce=!1;_ngModelWarningSent=!1;constructor(e,i,r,o,a){super(),this._ngModelWarningConfig=a,this._parent=e,this._setValidators(i),this._setAsyncValidators(r),this.valueAccessor=DD(this,o)}ngOnChanges(e){this._added||this._setUpControl(),yD(e,this.viewModel)&&(this.viewModel=this.model,this.formDirective.updateModel(this,this.model))}ngOnDestroy(){this.formDirective?.removeControl(this)}viewToModelUpdate(e){this.viewModel=e,this.update.emit(e)}get path(){return _D(this.name==null?this.name:this.name.toString(),this._parent)}get formDirective(){return this._parent?this._parent.formDirective:null}_setUpControl(){this.control=this.formDirective.addControl(this),this._added=!0}static \u0275fac=function(i){return new(i||t)(J(mi,13),J(Ko,10),J(Kd,10),J(Ur,10),J(wD,8))};static \u0275dir=$({type:t,selectors:[["","formControlName",""]],inputs:{name:[0,"formControlName","name"],isDisabled:[0,"disabled","isDisabled"],model:[0,"ngModel","model"]},outputs:{update:"ngModelChange"},standalone:!1,features:[Re([pR]),ve,Be]})}return t})();var hR={provide:mi,useExisting:gt(()=>zr)},zr=(()=>{class t extends mR{form=null;ngSubmit=new S;get control(){return this.form}static \u0275fac=(()=>{let e;return function(r){return(e||(e=Vt(t)))(r||t)}})();static \u0275dir=$({type:t,selectors:[["","formGroup",""]],hostBindings:function(i,r){i&1&&w("submit",function(a){return r.onSubmit(a)})("reset",function(){return r.onReset()})},inputs:{form:[0,"formGroup","form"]},outputs:{ngSubmit:"ngSubmit"},exportAs:["ngForm"],standalone:!1,features:[Re([hR]),ve]})}return t})();var ED=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=Z({type:t});static \u0275inj=q({})}return t})();function tD(t){return!!t&&(t.asyncValidators!==void 0||t.validators!==void 0||t.updateOn!==void 0)}var MD=(()=>{class t{useNonNullable=!1;get nonNullable(){let e=new t;return e.useNonNullable=!0,e}group(e,i=null){let r=this._reduceControls(e),o={};return tD(i)?o=i:i!==null&&(o.validators=i.validator,o.asyncValidators=i.asyncValidator),new Zo(r,o)}record(e,i=null){let r=this._reduceControls(e);return new Ph(r,i)}control(e,i,r){let o={};return this.useNonNullable?(tD(i)?o=i:(o.validators=i,o.asyncValidators=r),new js(e,se(I({},o),{nonNullable:!0}))):new js(e,i,r)}array(e,i,r){let o=e.map(a=>this._createControl(a));return new Lh(o,i,r)}_reduceControls(e){let i={};return Object.keys(e).forEach(r=>{i[r]=this._createControl(e[r])}),i}_createControl(e){if(e instanceof js)return e;if(e instanceof qo)return e;if(Array.isArray(e)){let i=e[0],r=e.length>1?e[1]:null,o=e.length>2?e[2]:null;return this.control(i,r,o)}else return this.control(e)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var ID=(()=>{class t{static withConfig(e){return{ngModule:t,providers:[{provide:Us,useValue:e.callSetDisabledState??Xd}]}}static \u0275fac=function(i){return new(i||t)};static \u0275mod=Z({type:t});static \u0275inj=q({imports:[ED]})}return t})(),SD=(()=>{class t{static withConfig(e){return{ngModule:t,providers:[{provide:wD,useValue:e.warnOnNgModelWithFormControl??"always"},{provide:Us,useValue:e.callSetDisabledState??Xd}]}}static \u0275fac=function(i){return new(i||t)};static \u0275mod=Z({type:t});static \u0275inj=q({imports:[ED]})}return t})();var kD=new y("MAT_INPUT_VALUE_ACCESSOR");var Jd=(()=>{class t{isErrorState(e,i){return!!(e&&e.invalid&&(e.touched||i&&i.submitted))}static \u0275fac=function(i){return new(i||t)};static \u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Qo=class{_defaultMatcher;ngControl;_parentFormGroup;_parentForm;_stateChanges;errorState=!1;matcher;constructor(n,e,i,r,o){this._defaultMatcher=n,this.ngControl=e,this._parentFormGroup=i,this._parentForm=r,this._stateChanges=o}updateErrorState(){let n=this.errorState,e=this._parentFormGroup||this._parentForm,i=this.matcher||this._defaultMatcher,r=this.ngControl?this.ngControl.control:null,o=i?.isErrorState(r,e)??!1;o!==n&&(this.errorState=o,this._stateChanges.next())}};var _R=["button","checkbox","file","hidden","image","radio","range","reset","submit"],bR=new y("MAT_INPUT_CONFIG"),eu=(()=>{class t{_elementRef=c(L);_platform=c(pe);ngControl=c(Fn,{optional:!0,self:!0});_autofillMonitor=c(GC);_ngZone=c(P);_formField=c(Ns,{optional:!0});_renderer=c(Te);_uid=c(ye).getId("mat-input-");_previousNativeValue;_inputValueAccessor;_signalBasedValueAccessor;_previousPlaceholder=null;_errorStateTracker;_config=c(bR,{optional:!0});_cleanupIosKeyup;_cleanupWebkitWheel;_isServer=!1;_isNativeSelect=!1;_isTextarea=!1;_isInFormField=!1;focused=!1;stateChanges=new M;controlType="mat-input";autofilled=!1;get disabled(){return this._disabled}set disabled(e){this._disabled=li(e),this.focused&&(this.focused=!1,this.stateChanges.next())}_disabled=!1;get id(){return this._id}set id(e){this._id=e||this._uid}_id;placeholder;name;get required(){return this._required??this.ngControl?.control?.hasValidator(Yo.required)??!1}set required(e){this._required=li(e)}_required;get type(){return this._type}set type(e){this._type=e||"text",this._validateType(),!this._isTextarea&&mh().has(this._type)&&(this._elementRef.nativeElement.type=this._type)}_type="text";get errorStateMatcher(){return this._errorStateTracker.matcher}set errorStateMatcher(e){this._errorStateTracker.matcher=e}userAriaDescribedBy;get value(){return this._signalBasedValueAccessor?this._signalBasedValueAccessor.value():this._inputValueAccessor.value}set value(e){e!==this.value&&(this._signalBasedValueAccessor?this._signalBasedValueAccessor.value.set(e):this._inputValueAccessor.value=e,this.stateChanges.next())}get readonly(){return this._readonly}set readonly(e){this._readonly=li(e)}_readonly=!1;disabledInteractive;get errorState(){return this._errorStateTracker.errorState}set errorState(e){this._errorStateTracker.errorState=e}_neverEmptyInputTypes=["date","datetime","datetime-local","month","time","week"].filter(e=>mh().has(e));constructor(){let e=c(zs,{optional:!0}),i=c(zr,{optional:!0}),r=c(Jd),o=c(kD,{optional:!0,self:!0}),a=this._elementRef.nativeElement,s=a.nodeName.toLowerCase();o?$n(o.value)?this._signalBasedValueAccessor=o:this._inputValueAccessor=o:this._inputValueAccessor=a,this._previousNativeValue=this.value,this.id=this.id,this._platform.IOS&&this._ngZone.runOutsideAngular(()=>{this._cleanupIosKeyup=this._renderer.listen(a,"keyup",this._iOSKeyupListener)}),this._errorStateTracker=new Qo(r,this.ngControl,i,e,this.stateChanges),this._isServer=!this._platform.isBrowser,this._isNativeSelect=s==="select",this._isTextarea=s==="textarea",this._isInFormField=!!this._formField,this.disabledInteractive=this._config?.disabledInteractive||!1,this._isNativeSelect&&(this.controlType=a.multiple?"mat-native-select-multiple":"mat-native-select"),this._signalBasedValueAccessor&&vn(()=>{this._signalBasedValueAccessor.value(),this.stateChanges.next()})}ngAfterViewInit(){this._platform.isBrowser&&this._autofillMonitor.monitor(this._elementRef.nativeElement).subscribe(e=>{this.autofilled=e.isAutofilled,this.stateChanges.next()})}ngOnChanges(){this.stateChanges.next()}ngOnDestroy(){this.stateChanges.complete(),this._platform.isBrowser&&this._autofillMonitor.stopMonitoring(this._elementRef.nativeElement),this._cleanupIosKeyup?.(),this._cleanupWebkitWheel?.()}ngDoCheck(){this.ngControl&&(this.updateErrorState(),this.ngControl.disabled!==null&&this.ngControl.disabled!==this.disabled&&(this.disabled=this.ngControl.disabled,this.stateChanges.next())),this._dirtyCheckNativeValue(),this._dirtyCheckPlaceholder()}focus(e){this._elementRef.nativeElement.focus(e)}updateErrorState(){this._errorStateTracker.updateErrorState()}_focusChanged(e){if(e!==this.focused){if(!this._isNativeSelect&&e&&this.disabled&&this.disabledInteractive){let i=this._elementRef.nativeElement;i.type==="number"?(i.type="text",i.setSelectionRange(0,0),i.type="number"):i.setSelectionRange(0,0)}this.focused=e,this.stateChanges.next()}}_onInput(){}_dirtyCheckNativeValue(){let e=this._elementRef.nativeElement.value;this._previousNativeValue!==e&&(this._previousNativeValue=e,this.stateChanges.next())}_dirtyCheckPlaceholder(){let e=this._getPlaceholder();if(e!==this._previousPlaceholder){let i=this._elementRef.nativeElement;this._previousPlaceholder=e,e?i.setAttribute("placeholder",e):i.removeAttribute("placeholder")}}_getPlaceholder(){return this.placeholder||null}_validateType(){_R.indexOf(this._type)>-1}_isNeverEmpty(){return this._neverEmptyInputTypes.indexOf(this._type)>-1}_isBadInput(){let e=this._elementRef.nativeElement.validity;return e&&e.badInput}get empty(){return!this._isNeverEmpty()&&!this._elementRef.nativeElement.value&&!this._isBadInput()&&!this.autofilled}get shouldLabelFloat(){if(this._isNativeSelect){let e=this._elementRef.nativeElement,i=e.options[0];return this.focused||e.multiple||!this.empty||!!(e.selectedIndex>-1&&i&&i.label)}else return this.focused&&!this.disabled||!this.empty}get describedByIds(){return this._elementRef.nativeElement.getAttribute("aria-describedby")?.split(" ")||[]}setDescribedByIds(e){let i=this._elementRef.nativeElement;e.length?i.setAttribute("aria-describedby",e.join(" ")):i.removeAttribute("aria-describedby")}onContainerClick(){this.focused||this.focus()}_isInlineSelect(){let e=this._elementRef.nativeElement;return this._isNativeSelect&&(e.multiple||e.size>1)}_iOSKeyupListener=e=>{let i=e.target;!i.value&&i.selectionStart===0&&i.selectionEnd===0&&(i.setSelectionRange(1,1),i.setSelectionRange(0,0))};_getReadonlyAttribute(){return this._isNativeSelect?null:this.readonly||this.disabled&&this.disabledInteractive?"true":null}static \u0275fac=function(i){return new(i||t)};static \u0275dir=$({type:t,selectors:[["input","matInput",""],["textarea","matInput",""],["select","matNativeControl",""],["input","matNativeControl",""],["textarea","matNativeControl",""]],hostAttrs:[1,"mat-mdc-input-element"],hostVars:21,hostBindings:function(i,r){i&1&&w("focus",function(){return r._focusChanged(!0)})("blur",function(){return r._focusChanged(!1)})("input",function(){return r._onInput()}),i&2&&(qe("id",r.id)("disabled",r.disabled&&!r.disabledInteractive)("required",r.required),O("name",r.name||null)("readonly",r._getReadonlyAttribute())("aria-disabled",r.disabled&&r.disabledInteractive?"true":null)("aria-invalid",r.empty&&r.required?null:r.errorState)("aria-required",r.required)("id",r.id),A("mat-input-server",r._isServer)("mat-mdc-form-field-textarea-control",r._isInFormField&&r._isTextarea)("mat-mdc-form-field-input-control",r._isInFormField)("mat-mdc-input-disabled-interactive",r.disabledInteractive)("mdc-text-field__input",r._isInFormField)("mat-mdc-native-select-inline",r._isInlineSelect()))},inputs:{disabled:"disabled",id:"id",placeholder:"placeholder",name:"name",required:"required",type:"type",errorStateMatcher:"errorStateMatcher",userAriaDescribedBy:[0,"aria-describedby","userAriaDescribedBy"],value:"value",readonly:"readonly",disabledInteractive:[2,"disabledInteractive","disabledInteractive",U]},exportAs:["matInput"],features:[Re([{provide:Os,useExisting:t}]),Be]})}return t})(),tu=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=Z({type:t});static \u0275inj=q({imports:[ui,ui,YC,he]})}return t})();var vR=["mat-menu-item",""],yR=[[["mat-icon"],["","matMenuItemIcon",""]],"*"],CR=["mat-icon, [matMenuItemIcon]","*"];function DR(t,n){t&1&&(_t(),m(0,"svg",2),B(1,"polygon",3),p())}var xR=["*"];function wR(t,n){if(t&1){let e=de();Pe(0,"div",0),Ri("click",function(){j(e);let r=b();return H(r.closed.emit("click"))})("animationstart",function(r){j(e);let o=b();return H(o._onAnimationStart(r.animationName))})("animationend",function(r){j(e);let o=b();return H(o._onAnimationDone(r.animationName))})("animationcancel",function(r){j(e);let o=b();return H(o._onAnimationDone(r.animationName))}),Pe(1,"div",1),oe(2),je()()}if(t&2){let e=b();rt(e._classList),A("mat-menu-panel-animations-disabled",e._animationsDisabled)("mat-menu-panel-exit-animation",e._panelAnimationState==="void")("mat-menu-panel-animating",e._isAnimating()),qe("id",e.panelId),O("aria-label",e.ariaLabel||null)("aria-labelledby",e.ariaLabelledby||null)("aria-describedby",e.ariaDescribedby||null)}}var qh=new y("MAT_MENU_PANEL"),$r=(()=>{class t{_elementRef=c(L);_document=c(K);_focusMonitor=c(jt);_parentMenu=c(qh,{optional:!0});_changeDetectorRef=c(be);role="menuitem";disabled=!1;disableRipple=!1;_hovered=new M;_focused=new M;_highlighted=!1;_triggersSubmenu=!1;constructor(){c(Oe).load(nn),this._parentMenu?.addItem?.(this)}focus(e,i){this._focusMonitor&&e?this._focusMonitor.focusVia(this._getHostElement(),e,i):this._getHostElement().focus(i),this._focused.next(this)}ngAfterViewInit(){this._focusMonitor&&this._focusMonitor.monitor(this._elementRef,!1)}ngOnDestroy(){this._focusMonitor&&this._focusMonitor.stopMonitoring(this._elementRef),this._parentMenu&&this._parentMenu.removeItem&&this._parentMenu.removeItem(this),this._hovered.complete(),this._focused.complete()}_getTabIndex(){return this.disabled?"-1":"0"}_getHostElement(){return this._elementRef.nativeElement}_checkDisabled(e){this.disabled&&(e.preventDefault(),e.stopPropagation())}_handleMouseEnter(){this._hovered.next(this)}getLabel(){let e=this._elementRef.nativeElement.cloneNode(!0),i=e.querySelectorAll("mat-icon, .material-icons");for(let r=0;r<i.length;r++)i[r].remove();return e.textContent?.trim()||""}_setHighlighted(e){this._highlighted=e,this._changeDetectorRef.markForCheck()}_setTriggersSubmenu(e){this._triggersSubmenu=e,this._changeDetectorRef.markForCheck()}_hasFocus(){return this._document&&this._document.activeElement===this._getHostElement()}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=R({type:t,selectors:[["","mat-menu-item",""]],hostAttrs:[1,"mat-mdc-menu-item","mat-focus-indicator"],hostVars:8,hostBindings:function(i,r){i&1&&w("click",function(a){return r._checkDisabled(a)})("mouseenter",function(){return r._handleMouseEnter()}),i&2&&(O("role",r.role)("tabindex",r._getTabIndex())("aria-disabled",r.disabled)("disabled",r.disabled||null),A("mat-mdc-menu-item-highlighted",r._highlighted)("mat-mdc-menu-item-submenu-trigger",r._triggersSubmenu))},inputs:{role:"role",disabled:[2,"disabled","disabled",U],disableRipple:[2,"disableRipple","disableRipple",U]},exportAs:["matMenuItem"],attrs:vR,ngContentSelectors:CR,decls:5,vars:3,consts:[[1,"mat-mdc-menu-item-text"],["matRipple","",1,"mat-mdc-menu-ripple",3,"matRippleDisabled","matRippleTrigger"],["viewBox","0 0 5 10","focusable","false","aria-hidden","true",1,"mat-mdc-menu-submenu-icon"],["points","0,0 5,5 0,10"]],template:function(i,r){i&1&&(Se(yR),oe(0),m(1,"span",0),oe(2,1),p(),B(3,"div",1),k(4,DR,2,0,":svg:svg",2)),i&2&&(h(3),E("matRippleDisabled",r.disableRipple||r.disabled)("matRippleTrigger",r._getHostElement()),h(),T(r._triggersSubmenu?4:-1))},dependencies:[Pi],encapsulation:2,changeDetection:0})}return t})();var ER=new y("MatMenuContent");var MR=new y("mat-menu-default-options",{providedIn:"root",factory:()=>({overlapTrigger:!1,xPosition:"after",yPosition:"below",backdropClass:"cdk-overlay-transparent-backdrop"})}),Yh="_mat-menu-enter",nu="_mat-menu-exit",$i=(()=>{class t{_elementRef=c(L);_changeDetectorRef=c(be);_injector=c(Y);_keyManager;_xPosition;_yPosition;_firstItemFocusRef;_exitFallbackTimeout;_animationsDisabled=xe();_allItems;_directDescendantItems=new ti;_classList={};_panelAnimationState="void";_animationDone=new M;_isAnimating=x(!1);parentMenu;direction;overlayPanelClass;backdropClass;ariaLabel;ariaLabelledby;ariaDescribedby;get xPosition(){return this._xPosition}set xPosition(e){this._xPosition=e,this.setPositionClasses()}get yPosition(){return this._yPosition}set yPosition(e){this._yPosition=e,this.setPositionClasses()}templateRef;items;lazyContent;overlapTrigger=!1;hasBackdrop;set panelClass(e){let i=this._previousPanelClass,r=I({},this._classList);i&&i.length&&i.split(" ").forEach(o=>{r[o]=!1}),this._previousPanelClass=e,e&&e.length&&(e.split(" ").forEach(o=>{r[o]=!0}),this._elementRef.nativeElement.className=""),this._classList=r}_previousPanelClass;get classList(){return this.panelClass}set classList(e){this.panelClass=e}closed=new S;close=this.closed;panelId=c(ye).getId("mat-menu-panel-");constructor(){let e=c(MR);this.overlayPanelClass=e.overlayPanelClass||"",this._xPosition=e.xPosition,this._yPosition=e.yPosition,this.backdropClass=e.backdropClass,this.overlapTrigger=e.overlapTrigger,this.hasBackdrop=e.hasBackdrop}ngOnInit(){this.setPositionClasses()}ngAfterContentInit(){this._updateDirectDescendants(),this._keyManager=new Cs(this._directDescendantItems).withWrap().withTypeAhead().withHomeAndEnd(),this._keyManager.tabOut.subscribe(()=>this.closed.emit("tab")),this._directDescendantItems.changes.pipe(We(this._directDescendantItems),Ln(e=>ft(...e.map(i=>i._focused)))).subscribe(e=>this._keyManager.updateActiveItem(e)),this._directDescendantItems.changes.subscribe(e=>{let i=this._keyManager;if(this._panelAnimationState==="enter"&&i.activeItem?._hasFocus()){let r=e.toArray(),o=Math.max(0,Math.min(r.length-1,i.activeItemIndex||0));r[o]&&!r[o].disabled?i.setActiveItem(o):i.setNextItemActive()}})}ngOnDestroy(){this._keyManager?.destroy(),this._directDescendantItems.destroy(),this.closed.complete(),this._firstItemFocusRef?.destroy(),clearTimeout(this._exitFallbackTimeout)}_hovered(){return this._directDescendantItems.changes.pipe(We(this._directDescendantItems),Ln(i=>ft(...i.map(r=>r._hovered))))}addItem(e){}removeItem(e){}_handleKeydown(e){let i=e.keyCode,r=this._keyManager;switch(i){case 27:$e(e)||(e.preventDefault(),this.closed.emit("keydown"));break;case 37:this.parentMenu&&this.direction==="ltr"&&this.closed.emit("keydown");break;case 39:this.parentMenu&&this.direction==="rtl"&&this.closed.emit("keydown");break;default:(i===38||i===40)&&r.setFocusOrigin("keyboard"),r.onKeydown(e);return}}focusFirstItem(e="program"){this._firstItemFocusRef?.destroy(),this._firstItemFocusRef=Qe(()=>{let i=this._resolvePanel();if(!i||!i.contains(document.activeElement)){let r=this._keyManager;r.setFocusOrigin(e).setFirstItemActive(),!r.activeItem&&i&&i.focus()}},{injector:this._injector})}resetActiveItem(){this._keyManager.setActiveItem(-1)}setElevation(e){}setPositionClasses(e=this.xPosition,i=this.yPosition){this._classList=se(I({},this._classList),{"mat-menu-before":e==="before","mat-menu-after":e==="after","mat-menu-above":i==="above","mat-menu-below":i==="below"}),this._changeDetectorRef.markForCheck()}_onAnimationDone(e){let i=e===nu;(i||e===Yh)&&(i&&(clearTimeout(this._exitFallbackTimeout),this._exitFallbackTimeout=void 0),this._animationDone.next(i?"void":"enter"),this._isAnimating.set(!1))}_onAnimationStart(e){(e===Yh||e===nu)&&this._isAnimating.set(!0)}_setIsOpen(e){if(this._panelAnimationState=e?"enter":"void",e){if(this._keyManager.activeItemIndex===0){let i=this._resolvePanel();i&&(i.scrollTop=0)}}else this._animationsDisabled||(this._exitFallbackTimeout=setTimeout(()=>this._onAnimationDone(nu),200));this._animationsDisabled&&setTimeout(()=>{this._onAnimationDone(e?Yh:nu)}),this._changeDetectorRef.markForCheck()}_updateDirectDescendants(){this._allItems.changes.pipe(We(this._allItems)).subscribe(e=>{this._directDescendantItems.reset(e.filter(i=>i._parentMenu===this)),this._directDescendantItems.notifyOnChanges()})}_resolvePanel(){let e=null;return this._directDescendantItems.length&&(e=this._directDescendantItems.first._getHostElement().closest('[role="menu"]')),e}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=R({type:t,selectors:[["mat-menu"]],contentQueries:function(i,r,o){if(i&1&&Kt(o,ER,5)(o,$r,5)(o,$r,4),i&2){let a;W(a=G())&&(r.lazyContent=a.first),W(a=G())&&(r._allItems=a),W(a=G())&&(r.items=a)}},viewQuery:function(i,r){if(i&1&&_e(st,5),i&2){let o;W(o=G())&&(r.templateRef=o.first)}},hostVars:3,hostBindings:function(i,r){i&2&&O("aria-label",null)("aria-labelledby",null)("aria-describedby",null)},inputs:{backdropClass:"backdropClass",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[0,"aria-describedby","ariaDescribedby"],xPosition:"xPosition",yPosition:"yPosition",overlapTrigger:[2,"overlapTrigger","overlapTrigger",U],hasBackdrop:[2,"hasBackdrop","hasBackdrop",e=>e==null?null:U(e)],panelClass:[0,"class","panelClass"],classList:"classList"},outputs:{closed:"closed",close:"close"},exportAs:["matMenu"],features:[Re([{provide:qh,useExisting:t}])],ngContentSelectors:xR,decls:1,vars:0,consts:[["tabindex","-1","role","menu",1,"mat-mdc-menu-panel",3,"click","animationstart","animationend","animationcancel","id"],[1,"mat-mdc-menu-content"]],template:function(i,r){i&1&&(Se(),ts(0,wR,3,12,"ng-template"))},styles:[`mat-menu {
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
`],encapsulation:2,changeDetection:0})}return t})(),IR=new y("mat-menu-scroll-strategy",{providedIn:"root",factory:()=>{let t=c(Y);return()=>Yn(t)}});var Xo=new WeakMap,SR=(()=>{class t{_canHaveBackdrop;_element=c(L);_viewContainerRef=c(bt);_menuItemInstance=c($r,{optional:!0,self:!0});_dir=c(Ue,{optional:!0});_focusMonitor=c(jt);_ngZone=c(P);_injector=c(Y);_scrollStrategy=c(IR);_changeDetectorRef=c(be);_animationsDisabled=xe();_portal;_overlayRef=null;_menuOpen=!1;_closingActionsSubscription=ce.EMPTY;_menuCloseSubscription=ce.EMPTY;_pendingRemoval;_parentMaterialMenu;_parentInnerPadding;_openedBy=void 0;get _menu(){return this._menuInternal}set _menu(e){e!==this._menuInternal&&(this._menuInternal=e,this._menuCloseSubscription.unsubscribe(),e&&(this._parentMaterialMenu,this._menuCloseSubscription=e.close.subscribe(i=>{this._destroyMenu(i),(i==="click"||i==="tab")&&this._parentMaterialMenu&&this._parentMaterialMenu.closed.emit(i)})),this._menuItemInstance?._setTriggersSubmenu(this._triggersSubmenu()))}_menuInternal=null;constructor(e){this._canHaveBackdrop=e;let i=c(qh,{optional:!0});this._parentMaterialMenu=i instanceof $i?i:void 0}ngOnDestroy(){this._menu&&this._ownsMenu(this._menu)&&Xo.delete(this._menu),this._pendingRemoval?.unsubscribe(),this._menuCloseSubscription.unsubscribe(),this._closingActionsSubscription.unsubscribe(),this._overlayRef&&(this._overlayRef.dispose(),this._overlayRef=null)}get menuOpen(){return this._menuOpen}get dir(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}_triggersSubmenu(){return!!(this._menuItemInstance&&this._parentMaterialMenu&&this._menu)}_closeMenu(){this._menu?.close.emit()}_openMenu(e){if(this._triggerIsAriaDisabled())return;let i=this._menu;if(this._menuOpen||!i)return;this._pendingRemoval?.unsubscribe();let r=Xo.get(i);Xo.set(i,this),r&&r!==this&&r._closeMenu();let o=this._createOverlay(i),a=o.getConfig(),s=a.positionStrategy;this._setPosition(i,s),this._canHaveBackdrop?a.hasBackdrop=i.hasBackdrop==null?!this._triggersSubmenu():i.hasBackdrop:a.hasBackdrop=i.hasBackdrop??!1,o.hasAttached()||(o.attach(this._getPortal(i)),i.lazyContent?.attach(this.menuData)),this._closingActionsSubscription=this._menuClosingActions().subscribe(()=>this._closeMenu()),i.parentMenu=this._triggersSubmenu()?this._parentMaterialMenu:void 0,i.direction=this.dir,e&&i.focusFirstItem(this._openedBy||"program"),this._setIsMenuOpen(!0),i instanceof $i&&(i._setIsOpen(!0),i._directDescendantItems.changes.pipe(Ee(i.close)).subscribe(()=>{s.withLockedPosition(!1).reapplyLastPosition(),s.withLockedPosition(!0)}))}focus(e,i){this._focusMonitor&&e?this._focusMonitor.focusVia(this._element,e,i):this._element.nativeElement.focus(i)}_destroyMenu(e){let i=this._overlayRef,r=this._menu;!i||!this.menuOpen||(this._closingActionsSubscription.unsubscribe(),this._pendingRemoval?.unsubscribe(),r instanceof $i&&this._ownsMenu(r)?(this._pendingRemoval=r._animationDone.pipe(mt(1)).subscribe(()=>{i.detach(),Xo.has(r)||r.lazyContent?.detach()}),r._setIsOpen(!1)):(i.detach(),r?.lazyContent?.detach()),r&&this._ownsMenu(r)&&Xo.delete(r),this.restoreFocus&&(e==="keydown"||!this._openedBy||!this._triggersSubmenu())&&this.focus(this._openedBy),this._openedBy=void 0,this._setIsMenuOpen(!1))}_setIsMenuOpen(e){e!==this._menuOpen&&(this._menuOpen=e,this._menuOpen?this.menuOpened.emit():this.menuClosed.emit(),this._triggersSubmenu()&&this._menuItemInstance._setHighlighted(e),this._changeDetectorRef.markForCheck())}_createOverlay(e){if(!this._overlayRef){let i=this._getOverlayConfig(e);this._subscribeToPositions(e,i.positionStrategy),this._overlayRef=sn(this._injector,i),this._overlayRef.keydownEvents().subscribe(r=>{this._menu instanceof $i&&this._menu._handleKeydown(r)})}return this._overlayRef}_getOverlayConfig(e){return new an({positionStrategy:ji(this._injector,this._getOverlayOrigin()).withLockedPosition().withGrowAfterOpen().withTransformOriginOn(".mat-menu-panel, .mat-mdc-menu-panel"),backdropClass:e.backdropClass||"cdk-overlay-transparent-backdrop",panelClass:e.overlayPanelClass,scrollStrategy:this._scrollStrategy(),direction:this._dir||"ltr",disableAnimations:this._animationsDisabled})}_subscribeToPositions(e,i){e.setPositionClasses&&i.positionChanges.subscribe(r=>{this._ngZone.run(()=>{let o=r.connectionPair.overlayX==="start"?"after":"before",a=r.connectionPair.overlayY==="top"?"below":"above";e.setPositionClasses(o,a)})})}_setPosition(e,i){let[r,o]=e.xPosition==="before"?["end","start"]:["start","end"],[a,s]=e.yPosition==="above"?["bottom","top"]:["top","bottom"],[l,d]=[a,s],[u,f]=[r,o],_=0;if(this._triggersSubmenu()){if(f=r=e.xPosition==="before"?"start":"end",o=u=r==="end"?"start":"end",this._parentMaterialMenu){if(this._parentInnerPadding==null){let g=this._parentMaterialMenu.items.first;this._parentInnerPadding=g?g._getHostElement().offsetTop:0}_=a==="bottom"?this._parentInnerPadding:-this._parentInnerPadding}}else e.overlapTrigger||(l=a==="top"?"bottom":"top",d=s==="top"?"bottom":"top");i.withPositions([{originX:r,originY:l,overlayX:u,overlayY:a,offsetY:_},{originX:o,originY:l,overlayX:f,overlayY:a,offsetY:_},{originX:r,originY:d,overlayX:u,overlayY:s,offsetY:-_},{originX:o,originY:d,overlayX:f,overlayY:s,offsetY:-_}])}_menuClosingActions(){let e=this._getOutsideClickStream(this._overlayRef),i=this._overlayRef.detachments(),r=this._parentMaterialMenu?this._parentMaterialMenu.closed:He(),o=this._parentMaterialMenu?this._parentMaterialMenu._hovered().pipe(Ne(a=>this._menuOpen&&a!==this._menuItemInstance)):He();return ft(e,r,o,i)}_getPortal(e){return(!this._portal||this._portal.templateRef!==e.templateRef)&&(this._portal=new on(e.templateRef,this._viewContainerRef)),this._portal}_ownsMenu(e){return Xo.get(e)===this}_triggerIsAriaDisabled(){return U(this._element.nativeElement.getAttribute("aria-disabled"))}static \u0275fac=function(i){es()};static \u0275dir=$({type:t})}return t})(),iu=(()=>{class t extends SR{_cleanupTouchstart;_hoverSubscription=ce.EMPTY;get _deprecatedMatMenuTriggerFor(){return this.menu}set _deprecatedMatMenuTriggerFor(e){this.menu=e}get menu(){return this._menu}set menu(e){this._menu=e}menuData;restoreFocus=!0;menuOpened=new S;onMenuOpen=this.menuOpened;menuClosed=new S;onMenuClose=this.menuClosed;constructor(){super(!0);let e=c(Te);this._cleanupTouchstart=e.listen(this._element.nativeElement,"touchstart",i=>{Fr(i)||(this._openedBy="touch")},{passive:!0})}triggersSubmenu(){return super._triggersSubmenu()}toggleMenu(){return this.menuOpen?this.closeMenu():this.openMenu()}openMenu(){this._openMenu(!0)}closeMenu(){this._closeMenu()}updatePosition(){this._overlayRef?.updatePosition()}ngAfterContentInit(){this._handleHover()}ngOnDestroy(){super.ngOnDestroy(),this._cleanupTouchstart(),this._hoverSubscription.unsubscribe()}_getOverlayOrigin(){return this._element}_getOutsideClickStream(e){return e.backdropClick()}_handleMousedown(e){Nr(e)||(this._openedBy=e.button===0?"mouse":void 0,this.triggersSubmenu()&&e.preventDefault())}_handleKeydown(e){let i=e.keyCode;(i===13||i===32)&&(this._openedBy="keyboard"),this.triggersSubmenu()&&(i===39&&this.dir==="ltr"||i===37&&this.dir==="rtl")&&(this._openedBy="keyboard",this.openMenu())}_handleClick(e){this.triggersSubmenu()?(e.stopPropagation(),this.openMenu()):this.toggleMenu()}_handleHover(){this.triggersSubmenu()&&this._parentMaterialMenu&&(this._hoverSubscription=this._parentMaterialMenu._hovered().subscribe(e=>{e===this._menuItemInstance&&!e.disabled&&this._parentMaterialMenu?._panelAnimationState!=="void"&&(this._openedBy="mouse",this._openMenu(!1))}))}static \u0275fac=function(i){return new(i||t)};static \u0275dir=$({type:t,selectors:[["","mat-menu-trigger-for",""],["","matMenuTriggerFor",""]],hostAttrs:[1,"mat-mdc-menu-trigger"],hostVars:3,hostBindings:function(i,r){i&1&&w("click",function(a){return r._handleClick(a)})("mousedown",function(a){return r._handleMousedown(a)})("keydown",function(a){return r._handleKeydown(a)}),i&2&&O("aria-haspopup",r.menu?"menu":null)("aria-expanded",r.menuOpen)("aria-controls",r.menuOpen?r.menu==null?null:r.menu.panelId:null)},inputs:{_deprecatedMatMenuTriggerFor:[0,"mat-menu-trigger-for","_deprecatedMatMenuTriggerFor"],menu:[0,"matMenuTriggerFor","menu"],menuData:[0,"matMenuTriggerData","menuData"],restoreFocus:[0,"matMenuTriggerRestoreFocus","restoreFocus"]},outputs:{menuOpened:"menuOpened",onMenuOpen:"onMenuOpen",menuClosed:"menuClosed",onMenuClose:"onMenuClose"},exportAs:["matMenuTrigger"],features:[ve]})}return t})();var ru=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=Z({type:t});static \u0275inj=q({imports:[Li,At,he,Rn]})}return t})();var Wr=class{_multiple;_emitChanges;compareWith;_selection=new Set;_deselectedToEmit=[];_selectedToEmit=[];_selected=null;get selected(){return this._selected||(this._selected=Array.from(this._selection.values())),this._selected}changed=new M;constructor(n=!1,e,i=!0,r){this._multiple=n,this._emitChanges=i,this.compareWith=r,e&&e.length&&(n?e.forEach(o=>this._markSelected(o)):this._markSelected(e[0]),this._selectedToEmit.length=0)}select(...n){this._verifyValueAssignment(n),n.forEach(i=>this._markSelected(i));let e=this._hasQueuedChanges();return this._emitChangeEvent(),e}deselect(...n){this._verifyValueAssignment(n),n.forEach(i=>this._unmarkSelected(i));let e=this._hasQueuedChanges();return this._emitChangeEvent(),e}setSelection(...n){this._verifyValueAssignment(n);let e=this.selected,i=new Set(n.map(o=>this._getConcreteValue(o)));n.forEach(o=>this._markSelected(o)),e.filter(o=>!i.has(this._getConcreteValue(o,i))).forEach(o=>this._unmarkSelected(o));let r=this._hasQueuedChanges();return this._emitChangeEvent(),r}toggle(n){return this.isSelected(n)?this.deselect(n):this.select(n)}clear(n=!0){this._unmarkAll();let e=this._hasQueuedChanges();return n&&this._emitChangeEvent(),e}isSelected(n){return this._selection.has(this._getConcreteValue(n))}isEmpty(){return this._selection.size===0}hasValue(){return!this.isEmpty()}sort(n){this._multiple&&this.selected&&this._selected.sort(n)}isMultipleSelection(){return this._multiple}_emitChangeEvent(){this._selected=null,(this._selectedToEmit.length||this._deselectedToEmit.length)&&(this.changed.next({source:this,added:this._selectedToEmit,removed:this._deselectedToEmit}),this._deselectedToEmit=[],this._selectedToEmit=[])}_markSelected(n){n=this._getConcreteValue(n),this.isSelected(n)||(this._multiple||this._unmarkAll(),this.isSelected(n)||this._selection.add(n),this._emitChanges&&this._selectedToEmit.push(n))}_unmarkSelected(n){n=this._getConcreteValue(n),this.isSelected(n)&&(this._selection.delete(n),this._emitChanges&&this._deselectedToEmit.push(n))}_unmarkAll(){this.isEmpty()||this._selection.forEach(n=>this._unmarkSelected(n))}_verifyValueAssignment(n){n.length>1&&this._multiple}_hasQueuedChanges(){return!!(this._deselectedToEmit.length||this._selectedToEmit.length)}_getConcreteValue(n,e){if(this.compareWith){e=e??this._selection;for(let i of e)if(this.compareWith(n,i))return i;return n}else return n}};var ou=(()=>{class t{_animationsDisabled=xe();state="unchecked";disabled=!1;appearance="full";constructor(){}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=R({type:t,selectors:[["mat-pseudo-checkbox"]],hostAttrs:[1,"mat-pseudo-checkbox"],hostVars:12,hostBindings:function(i,r){i&2&&A("mat-pseudo-checkbox-indeterminate",r.state==="indeterminate")("mat-pseudo-checkbox-checked",r.state==="checked")("mat-pseudo-checkbox-disabled",r.disabled)("mat-pseudo-checkbox-minimal",r.appearance==="minimal")("mat-pseudo-checkbox-full",r.appearance==="full")("_mat-animation-noopable",r._animationsDisabled)},inputs:{state:"state",disabled:"disabled",appearance:"appearance"},decls:0,vars:0,template:function(i,r){},styles:[`.mat-pseudo-checkbox {
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
`],encapsulation:2,changeDetection:0})}return t})();var kR=["text"],TR=[[["mat-icon"]],"*"],AR=["mat-icon","*"];function RR(t,n){if(t&1&&B(0,"mat-pseudo-checkbox",1),t&2){let e=b();E("disabled",e.disabled)("state",e.selected?"checked":"unchecked")}}function OR(t,n){if(t&1&&B(0,"mat-pseudo-checkbox",3),t&2){let e=b();E("disabled",e.disabled)}}function NR(t,n){if(t&1&&(m(0,"span",4),v(1),p()),t&2){let e=b();h(),Ae("(",e.group.label,")")}}var Kh=new y("MAT_OPTION_PARENT_COMPONENT"),Qh=new y("MatOptgroup");var Zh=class{source;isUserInput;constructor(n,e=!1){this.source=n,this.isUserInput=e}},Jo=(()=>{class t{_element=c(L);_changeDetectorRef=c(be);_parent=c(Kh,{optional:!0});group=c(Qh,{optional:!0});_signalDisableRipple=!1;_selected=!1;_active=!1;_mostRecentViewValue="";get multiple(){return this._parent&&this._parent.multiple}get selected(){return this._selected}value;id=c(ye).getId("mat-option-");get disabled(){return this.group&&this.group.disabled||this._disabled()}set disabled(e){this._disabled.set(e)}_disabled=x(!1);get disableRipple(){return this._signalDisableRipple?this._parent.disableRipple():!!this._parent?.disableRipple}get hideSingleSelectionIndicator(){return!!(this._parent&&this._parent.hideSingleSelectionIndicator)}onSelectionChange=new S;_text;_stateChanges=new M;constructor(){let e=c(Oe);e.load(nn),e.load(Wn),this._signalDisableRipple=!!this._parent&&$n(this._parent.disableRipple)}get active(){return this._active}get viewValue(){return(this._text?.nativeElement.textContent||"").trim()}select(e=!0){this._selected||(this._selected=!0,this._changeDetectorRef.markForCheck(),e&&this._emitSelectionChangeEvent())}deselect(e=!0){this._selected&&(this._selected=!1,this._changeDetectorRef.markForCheck(),e&&this._emitSelectionChangeEvent())}focus(e,i){let r=this._getHostElement();typeof r.focus=="function"&&r.focus(i)}setActiveStyles(){this._active||(this._active=!0,this._changeDetectorRef.markForCheck())}setInactiveStyles(){this._active&&(this._active=!1,this._changeDetectorRef.markForCheck())}getLabel(){return this.viewValue}_handleKeydown(e){(e.keyCode===13||e.keyCode===32)&&!$e(e)&&(this._selectViaInteraction(),e.preventDefault())}_selectViaInteraction(){this.disabled||(this._selected=this.multiple?!this._selected:!0,this._changeDetectorRef.markForCheck(),this._emitSelectionChangeEvent(!0))}_getTabIndex(){return this.disabled?"-1":"0"}_getHostElement(){return this._element.nativeElement}ngAfterViewChecked(){if(this._selected){let e=this.viewValue;e!==this._mostRecentViewValue&&(this._mostRecentViewValue&&this._stateChanges.next(),this._mostRecentViewValue=e)}}ngOnDestroy(){this._stateChanges.complete()}_emitSelectionChangeEvent(e=!1){this.onSelectionChange.emit(new Zh(this,e))}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=R({type:t,selectors:[["mat-option"]],viewQuery:function(i,r){if(i&1&&_e(kR,7),i&2){let o;W(o=G())&&(r._text=o.first)}},hostAttrs:["role","option",1,"mat-mdc-option","mdc-list-item"],hostVars:11,hostBindings:function(i,r){i&1&&w("click",function(){return r._selectViaInteraction()})("keydown",function(a){return r._handleKeydown(a)}),i&2&&(qe("id",r.id),O("aria-selected",r.selected)("aria-disabled",r.disabled.toString()),A("mdc-list-item--selected",r.selected)("mat-mdc-option-multiple",r.multiple)("mat-mdc-option-active",r.active)("mdc-list-item--disabled",r.disabled))},inputs:{value:"value",id:"id",disabled:[2,"disabled","disabled",U]},outputs:{onSelectionChange:"onSelectionChange"},exportAs:["matOption"],ngContentSelectors:AR,decls:8,vars:5,consts:[["text",""],["aria-hidden","true",1,"mat-mdc-option-pseudo-checkbox",3,"disabled","state"],[1,"mdc-list-item__primary-text"],["state","checked","aria-hidden","true","appearance","minimal",1,"mat-mdc-option-pseudo-checkbox",3,"disabled"],[1,"cdk-visually-hidden"],["aria-hidden","true","mat-ripple","",1,"mat-mdc-option-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled"]],template:function(i,r){i&1&&(Se(TR),k(0,RR,1,2,"mat-pseudo-checkbox",1),oe(1),m(2,"span",2,0),oe(4,1),p(),k(5,OR,1,1,"mat-pseudo-checkbox",3),k(6,NR,2,1,"span",4),B(7,"div",5)),i&2&&(T(r.multiple?0:-1),h(5),T(!r.multiple&&r.selected&&!r.hideSingleSelectionIndicator?5:-1),h(),T(r.group&&r.group._inert?6:-1),h(),E("matRippleTrigger",r._getHostElement())("matRippleDisabled",r.disabled||r.disableRipple))},dependencies:[ou,Pi],styles:[`.mat-mdc-option {
  -webkit-user-select: none;
  user-select: none;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  min-height: 48px;
  padding: 0 16px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  color: var(--mat-option-label-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-option-label-text-font, var(--mat-sys-label-large-font));
  line-height: var(--mat-option-label-text-line-height, var(--mat-sys-label-large-line-height));
  font-size: var(--mat-option-label-text-size, var(--mat-sys-body-large-size));
  letter-spacing: var(--mat-option-label-text-tracking, var(--mat-sys-label-large-tracking));
  font-weight: var(--mat-option-label-text-weight, var(--mat-sys-body-large-weight));
}
.mat-mdc-option:hover:not(.mdc-list-item--disabled) {
  background-color: var(--mat-option-hover-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-hover-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-option:focus.mdc-list-item, .mat-mdc-option.mat-mdc-option-active.mdc-list-item {
  background-color: var(--mat-option-focus-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-focus-state-layer-opacity) * 100%), transparent));
  outline: 0;
}
.mat-mdc-option.mdc-list-item--selected:not(.mdc-list-item--disabled):not(.mat-mdc-option-active, .mat-mdc-option-multiple, :focus, :hover) {
  background-color: var(--mat-option-selected-state-layer-color, var(--mat-sys-secondary-container));
}
.mat-mdc-option.mdc-list-item--selected:not(.mdc-list-item--disabled):not(.mat-mdc-option-active, .mat-mdc-option-multiple, :focus, :hover) .mdc-list-item__primary-text {
  color: var(--mat-option-selected-state-label-text-color, var(--mat-sys-on-secondary-container));
}
.mat-mdc-option .mat-pseudo-checkbox {
  --mat-pseudo-checkbox-minimal-selected-checkmark-color: var(--mat-option-selected-state-label-text-color, var(--mat-sys-on-secondary-container));
}
.mat-mdc-option.mdc-list-item {
  align-items: center;
  background: transparent;
}
.mat-mdc-option.mdc-list-item--disabled {
  cursor: default;
  pointer-events: none;
}
.mat-mdc-option.mdc-list-item--disabled .mat-mdc-option-pseudo-checkbox, .mat-mdc-option.mdc-list-item--disabled .mdc-list-item__primary-text, .mat-mdc-option.mdc-list-item--disabled > mat-icon {
  opacity: 0.38;
}
.mat-mdc-optgroup .mat-mdc-option:not(.mat-mdc-option-multiple) {
  padding-left: 32px;
}
[dir=rtl] .mat-mdc-optgroup .mat-mdc-option:not(.mat-mdc-option-multiple) {
  padding-left: 16px;
  padding-right: 32px;
}
.mat-mdc-option .mat-icon,
.mat-mdc-option .mat-pseudo-checkbox-full {
  margin-right: 16px;
  flex-shrink: 0;
}
[dir=rtl] .mat-mdc-option .mat-icon,
[dir=rtl] .mat-mdc-option .mat-pseudo-checkbox-full {
  margin-right: 0;
  margin-left: 16px;
}
.mat-mdc-option .mat-pseudo-checkbox-minimal {
  margin-left: 16px;
  flex-shrink: 0;
}
[dir=rtl] .mat-mdc-option .mat-pseudo-checkbox-minimal {
  margin-right: 16px;
  margin-left: 0;
}
.mat-mdc-option .mat-mdc-option-ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
}
.mat-mdc-option .mdc-list-item__primary-text {
  white-space: normal;
  font-size: inherit;
  font-weight: inherit;
  letter-spacing: inherit;
  line-height: inherit;
  font-family: inherit;
  text-decoration: inherit;
  text-transform: inherit;
  margin-right: auto;
}
[dir=rtl] .mat-mdc-option .mdc-list-item__primary-text {
  margin-right: 0;
  margin-left: auto;
}
@media (forced-colors: active) {
  .mat-mdc-option.mdc-list-item--selected:not(:has(.mat-mdc-option-pseudo-checkbox))::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
    width: 10px;
    height: 0;
    border-bottom: solid 10px;
    border-radius: 10px;
  }
  [dir=rtl] .mat-mdc-option.mdc-list-item--selected:not(:has(.mat-mdc-option-pseudo-checkbox))::after {
    right: auto;
    left: 16px;
  }
}

.mat-mdc-option-multiple {
  --mat-list-list-item-selected-container-color: var(--mat-list-list-item-container-color, transparent);
}

.mat-mdc-option-active .mat-focus-indicator::before {
  content: "";
}
`],encapsulation:2,changeDetection:0})}return t})();function RD(t,n,e){if(e.length){let i=n.toArray(),r=e.toArray(),o=0;for(let a=0;a<t+1;a++)i[a].group&&i[a].group===r[o]&&o++;return o}return 0}function OD(t,n,e,i){return t<e?t:t+n>e+i?Math.max(0,t-i+n):e}var ND=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=Z({type:t});static \u0275inj=q({imports:[he]})}return t})();var Xh=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=Z({type:t});static \u0275inj=q({imports:[Li,ND,Jo,he]})}return t})();var FR=["trigger"],PR=["panel"],LR=[[["mat-select-trigger"]],"*"],VR=["mat-select-trigger","*"];function BR(t,n){if(t&1&&(m(0,"span",4),v(1),p()),t&2){let e=b();h(),ne(e.placeholder)}}function jR(t,n){t&1&&oe(0)}function HR(t,n){if(t&1&&(m(0,"span",11),v(1),p()),t&2){let e=b(2);h(),ne(e.triggerValue)}}function UR(t,n){if(t&1&&(m(0,"span",5),k(1,jR,1,0)(2,HR,2,1,"span",11),p()),t&2){let e=b();h(),T(e.customTrigger?1:2)}}function zR(t,n){if(t&1){let e=de();m(0,"div",12,1),w("keydown",function(r){j(e);let o=b();return H(o._handleKeydown(r))}),oe(2,1),p()}if(t&2){let e=b();rt(e.panelClass),A("mat-select-panel-animations-enabled",!e._animationsDisabled)("mat-primary",(e._parentFormField==null?null:e._parentFormField.color)==="primary")("mat-accent",(e._parentFormField==null?null:e._parentFormField.color)==="accent")("mat-warn",(e._parentFormField==null?null:e._parentFormField.color)==="warn")("mat-undefined",!(e._parentFormField!=null&&e._parentFormField.color)),O("id",e.id+"-panel")("aria-multiselectable",e.multiple)("aria-label",e.ariaLabel||null)("aria-labelledby",e._getPanelAriaLabelledby())}}var $R=new y("mat-select-scroll-strategy",{providedIn:"root",factory:()=>{let t=c(Y);return()=>Yn(t)}}),WR=new y("MAT_SELECT_CONFIG"),GR=new y("MatSelectTrigger"),Jh=class{source;value;constructor(n,e){this.source=n,this.value=e}},FD=(()=>{class t{_viewportRuler=c(ci);_changeDetectorRef=c(be);_elementRef=c(L);_dir=c(Ue,{optional:!0});_idGenerator=c(ye);_renderer=c(Te);_parentFormField=c(Ns,{optional:!0});ngControl=c(Fn,{self:!0,optional:!0});_liveAnnouncer=c(vs);_defaultOptions=c(WR,{optional:!0});_animationsDisabled=xe();_popoverLocation;_initialized=new M;_cleanupDetach;options;optionGroups;customTrigger;_positions=[{originX:"start",originY:"bottom",overlayX:"start",overlayY:"top"},{originX:"end",originY:"bottom",overlayX:"end",overlayY:"top"},{originX:"start",originY:"top",overlayX:"start",overlayY:"bottom",panelClass:"mat-mdc-select-panel-above"},{originX:"end",originY:"top",overlayX:"end",overlayY:"bottom",panelClass:"mat-mdc-select-panel-above"}];_scrollOptionIntoView(e){let i=this.options.toArray()[e];if(i){let r=this.panel.nativeElement,o=RD(e,this.options,this.optionGroups),a=i._getHostElement();e===0&&o===1?r.scrollTop=0:r.scrollTop=OD(a.offsetTop,a.offsetHeight,r.scrollTop,r.offsetHeight)}}_positioningSettled(){this._scrollOptionIntoView(this._keyManager.activeItemIndex||0)}_getChangeEvent(e){return new Jh(this,e)}_scrollStrategyFactory=c($R);_panelOpen=!1;_compareWith=(e,i)=>e===i;_uid=this._idGenerator.getId("mat-select-");_triggerAriaLabelledBy=null;_previousControl;_destroy=new M;_errorStateTracker;stateChanges=new M;disableAutomaticLabeling=!0;userAriaDescribedBy;_selectionModel;_keyManager;_preferredOverlayOrigin;_overlayWidth;_onChange=()=>{};_onTouched=()=>{};_valueId=this._idGenerator.getId("mat-select-value-");_scrollStrategy;_overlayPanelClass=this._defaultOptions?.overlayPanelClass||"";get focused(){return this._focused||this._panelOpen}_focused=!1;controlType="mat-select";trigger;panel;_overlayDir;panelClass;disabled=!1;get disableRipple(){return this._disableRipple()}set disableRipple(e){this._disableRipple.set(e)}_disableRipple=x(!1);tabIndex=0;get hideSingleSelectionIndicator(){return this._hideSingleSelectionIndicator}set hideSingleSelectionIndicator(e){this._hideSingleSelectionIndicator=e,this._syncParentProperties()}_hideSingleSelectionIndicator=this._defaultOptions?.hideSingleSelectionIndicator??!1;get placeholder(){return this._placeholder}set placeholder(e){this._placeholder=e,this.stateChanges.next()}_placeholder;get required(){return this._required??this.ngControl?.control?.hasValidator(Yo.required)??!1}set required(e){this._required=e,this.stateChanges.next()}_required;get multiple(){return this._multiple}set multiple(e){this._selectionModel,this._multiple=e}_multiple=!1;disableOptionCentering=this._defaultOptions?.disableOptionCentering??!1;get compareWith(){return this._compareWith}set compareWith(e){this._compareWith=e,this._selectionModel&&this._initializeSelection()}get value(){return this._value}set value(e){this._assignValue(e)&&this._onChange(e)}_value;ariaLabel="";ariaLabelledby;get errorStateMatcher(){return this._errorStateTracker.matcher}set errorStateMatcher(e){this._errorStateTracker.matcher=e}typeaheadDebounceInterval;sortComparator;get id(){return this._id}set id(e){this._id=e||this._uid,this.stateChanges.next()}_id;get errorState(){return this._errorStateTracker.errorState}set errorState(e){this._errorStateTracker.errorState=e}panelWidth=this._defaultOptions&&typeof this._defaultOptions.panelWidth<"u"?this._defaultOptions.panelWidth:"auto";canSelectNullableOptions=this._defaultOptions?.canSelectNullableOptions??!1;optionSelectionChanges=ir(()=>{let e=this.options;return e?e.changes.pipe(We(e),Ln(()=>ft(...e.map(i=>i.onSelectionChange)))):this._initialized.pipe(Ln(()=>this.optionSelectionChanges))});openedChange=new S;_openedStream=this.openedChange.pipe(Ne(e=>e),Ce(()=>{}));_closedStream=this.openedChange.pipe(Ne(e=>!e),Ce(()=>{}));selectionChange=new S;valueChange=new S;constructor(){let e=c(Jd),i=c(zs,{optional:!0}),r=c(zr,{optional:!0}),o=c(new Xt("tabindex"),{optional:!0}),a=c(ks,{optional:!0});this.ngControl&&(this.ngControl.valueAccessor=this),this._defaultOptions?.typeaheadDebounceInterval!=null&&(this.typeaheadDebounceInterval=this._defaultOptions.typeaheadDebounceInterval),this._errorStateTracker=new Qo(e,this.ngControl,r,i,this.stateChanges),this._scrollStrategy=this._scrollStrategyFactory(),this.tabIndex=o==null?0:parseInt(o)||0,this._popoverLocation=a?.usePopover===!1?null:"inline",this.id=this.id}ngOnInit(){this._selectionModel=new Wr(this.multiple),this.stateChanges.next(),this._viewportRuler.change().pipe(Ee(this._destroy)).subscribe(()=>{this.panelOpen&&(this._overlayWidth=this._getOverlayWidth(this._preferredOverlayOrigin),this._changeDetectorRef.detectChanges())})}ngAfterContentInit(){this._initialized.next(),this._initialized.complete(),this._initKeyManager(),this._selectionModel.changed.pipe(Ee(this._destroy)).subscribe(e=>{e.added.forEach(i=>i.select()),e.removed.forEach(i=>i.deselect())}),this.options.changes.pipe(We(null),Ee(this._destroy)).subscribe(()=>{this._resetOptions(),this._initializeSelection()})}ngDoCheck(){let e=this._getTriggerAriaLabelledby(),i=this.ngControl;if(e!==this._triggerAriaLabelledBy){let r=this._elementRef.nativeElement;this._triggerAriaLabelledBy=e,e?r.setAttribute("aria-labelledby",e):r.removeAttribute("aria-labelledby")}i&&(this._previousControl!==i.control&&(this._previousControl!==void 0&&i.disabled!==null&&i.disabled!==this.disabled&&(this.disabled=i.disabled),this._previousControl=i.control),this.updateErrorState())}ngOnChanges(e){(e.disabled||e.userAriaDescribedBy)&&this.stateChanges.next(),e.typeaheadDebounceInterval&&this._keyManager&&this._keyManager.withTypeAhead(this.typeaheadDebounceInterval),e.panelClass&&this.panelClass instanceof Set&&(this.panelClass=Array.from(this.panelClass))}ngOnDestroy(){this._cleanupDetach?.(),this._keyManager?.destroy(),this._destroy.next(),this._destroy.complete(),this.stateChanges.complete(),this._clearFromModal()}toggle(){this.panelOpen?this.close():this.open()}open(){this._canOpen()&&(this._parentFormField&&(this._preferredOverlayOrigin=this._parentFormField.getConnectedOverlayOrigin()),this._cleanupDetach?.(),this._overlayWidth=this._getOverlayWidth(this._preferredOverlayOrigin),this._applyModalPanelOwnership(),this._panelOpen=!0,this._overlayDir.positionChange.pipe(mt(1)).subscribe(()=>{this._changeDetectorRef.detectChanges(),this._positioningSettled()}),this._overlayDir.attachOverlay(),this._keyManager.withHorizontalOrientation(null),this._highlightCorrectOption(),this._changeDetectorRef.markForCheck(),this.stateChanges.next(),Promise.resolve().then(()=>this.openedChange.emit(!0)))}_trackedModal=null;_applyModalPanelOwnership(){let e=this._elementRef.nativeElement.closest('body > .cdk-overlay-container [aria-modal="true"]');if(!e)return;let i=`${this.id}-panel`;this._trackedModal&&Cd(this._trackedModal,"aria-owns",i),uh(e,"aria-owns",i),this._trackedModal=e}_clearFromModal(){if(!this._trackedModal)return;let e=`${this.id}-panel`;Cd(this._trackedModal,"aria-owns",e),this._trackedModal=null}close(){this._panelOpen&&(this._panelOpen=!1,this._exitAndDetach(),this._keyManager.withHorizontalOrientation(this._isRtl()?"rtl":"ltr"),this._changeDetectorRef.markForCheck(),this._onTouched(),this.stateChanges.next(),Promise.resolve().then(()=>this.openedChange.emit(!1)))}_exitAndDetach(){if(this._animationsDisabled||!this.panel){this._detachOverlay();return}this._cleanupDetach?.(),this._cleanupDetach=()=>{i(),clearTimeout(r),this._cleanupDetach=void 0};let e=this.panel.nativeElement,i=this._renderer.listen(e,"animationend",o=>{o.animationName==="_mat-select-exit"&&(this._cleanupDetach?.(),this._detachOverlay())}),r=setTimeout(()=>{this._cleanupDetach?.(),this._detachOverlay()},200);e.classList.add("mat-select-panel-exit")}_detachOverlay(){this._overlayDir.detachOverlay(),this._changeDetectorRef.markForCheck()}writeValue(e){this._assignValue(e)}registerOnChange(e){this._onChange=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this.disabled=e,this._changeDetectorRef.markForCheck(),this.stateChanges.next()}get panelOpen(){return this._panelOpen}get selected(){return this.multiple?this._selectionModel?.selected||[]:this._selectionModel?.selected[0]}get triggerValue(){if(this.empty)return"";if(this._multiple){let e=this._selectionModel.selected.map(i=>i.viewValue);return this._isRtl()&&e.reverse(),e.join(", ")}return this._selectionModel.selected[0].viewValue}updateErrorState(){this._errorStateTracker.updateErrorState()}_isRtl(){return this._dir?this._dir.value==="rtl":!1}_handleKeydown(e){this.disabled||(this.panelOpen?this._handleOpenKeydown(e):this._handleClosedKeydown(e))}_handleClosedKeydown(e){let i=e.keyCode,r=i===40||i===38||i===37||i===39,o=i===13||i===32,a=this._keyManager;if(!a.isTyping()&&o&&!$e(e)||(this.multiple||e.altKey)&&r)e.preventDefault(),this.open();else if(!this.multiple){let s=this.selected;a.onKeydown(e);let l=this.selected;l&&s!==l&&this._liveAnnouncer.announce(l.viewValue,1e4)}}_handleOpenKeydown(e){let i=this._keyManager,r=e.keyCode,o=r===40||r===38,a=i.isTyping();if(o&&e.altKey)e.preventDefault(),this.close();else if(!a&&(r===13||r===32)&&i.activeItem&&!$e(e))e.preventDefault(),i.activeItem._selectViaInteraction();else if(!a&&this._multiple&&r===65&&e.ctrlKey){e.preventDefault();let s=this.options.some(l=>!l.disabled&&!l.selected);this.options.forEach(l=>{l.disabled||(s?l.select():l.deselect())})}else{let s=i.activeItemIndex;i.onKeydown(e),this._multiple&&o&&e.shiftKey&&i.activeItem&&i.activeItemIndex!==s&&i.activeItem._selectViaInteraction()}}_handleOverlayKeydown(e){e.keyCode===27&&!$e(e)&&(e.preventDefault(),this.close())}_onFocus(){this.disabled||(this._focused=!0,this.stateChanges.next())}_onBlur(){this._focused=!1,this._keyManager?.cancelTypeahead(),!this.disabled&&!this.panelOpen&&(this._onTouched(),this._changeDetectorRef.markForCheck(),this.stateChanges.next())}get empty(){return!this._selectionModel||this._selectionModel.isEmpty()}_initializeSelection(){Promise.resolve().then(()=>{this.ngControl&&(this._value=this.ngControl.value),this._setSelectionByValue(this._value),this.stateChanges.next()})}_setSelectionByValue(e){if(this.options.forEach(i=>i.setInactiveStyles()),this._selectionModel.clear(),this.multiple&&e)Array.isArray(e),e.forEach(i=>this._selectOptionByValue(i)),this._sortValues();else{let i=this._selectOptionByValue(e);i?this._keyManager.updateActiveItem(i):this.panelOpen||this._keyManager.updateActiveItem(-1)}this._changeDetectorRef.markForCheck()}_selectOptionByValue(e){let i=this.options.find(r=>{if(this._selectionModel.isSelected(r))return!1;try{return(r.value!=null||this.canSelectNullableOptions)&&this._compareWith(r.value,e)}catch{return!1}});return i&&this._selectionModel.select(i),i}_assignValue(e){return e!==this._value||this._multiple&&Array.isArray(e)?(this.options&&this._setSelectionByValue(e),this._value=e,!0):!1}_skipPredicate=e=>this.panelOpen?!1:e.disabled;_getOverlayWidth(e){return this.panelWidth==="auto"?(e instanceof Ho?e.elementRef:e||this._elementRef).nativeElement.getBoundingClientRect().width:this.panelWidth===null?"":this.panelWidth}_syncParentProperties(){if(this.options)for(let e of this.options)e._changeDetectorRef.markForCheck()}_initKeyManager(){this._keyManager=new ys(this.options).withTypeAhead(this.typeaheadDebounceInterval).withVerticalOrientation().withHorizontalOrientation(this._isRtl()?"rtl":"ltr").withHomeAndEnd().withPageUpDown().withAllowedModifierKeys(["shiftKey"]).skipPredicate(this._skipPredicate),this._keyManager.tabOut.subscribe(()=>{this.panelOpen&&(!this.multiple&&this._keyManager.activeItem&&this._keyManager.activeItem._selectViaInteraction(),this.focus(),this.close())}),this._keyManager.change.subscribe(()=>{this._panelOpen&&this.panel?this._scrollOptionIntoView(this._keyManager.activeItemIndex||0):!this._panelOpen&&!this.multiple&&this._keyManager.activeItem&&this._keyManager.activeItem._selectViaInteraction()})}_resetOptions(){let e=ft(this.options.changes,this._destroy);this.optionSelectionChanges.pipe(Ee(e)).subscribe(i=>{this._onSelect(i.source,i.isUserInput),i.isUserInput&&!this.multiple&&this._panelOpen&&(this.close(),this.focus())}),ft(...this.options.map(i=>i._stateChanges)).pipe(Ee(e)).subscribe(()=>{this._changeDetectorRef.detectChanges(),this.stateChanges.next()})}_onSelect(e,i){let r=this._selectionModel.isSelected(e);!this.canSelectNullableOptions&&e.value==null&&!this._multiple?(e.deselect(),this._selectionModel.clear(),this.value!=null&&this._propagateChanges(e.value)):(r!==e.selected&&(e.selected?this._selectionModel.select(e):this._selectionModel.deselect(e)),i&&this._keyManager.setActiveItem(e),this.multiple&&(this._sortValues(),i&&this.focus())),r!==this._selectionModel.isSelected(e)&&this._propagateChanges(),this.stateChanges.next()}_sortValues(){if(this.multiple){let e=this.options.toArray();this._selectionModel.sort((i,r)=>this.sortComparator?this.sortComparator(i,r,e):e.indexOf(i)-e.indexOf(r)),this.stateChanges.next()}}_propagateChanges(e){let i;this.multiple?i=this.selected.map(r=>r.value):i=this.selected?this.selected.value:e,this._value=i,this.valueChange.emit(i),this._onChange(i),this.selectionChange.emit(this._getChangeEvent(i)),this._changeDetectorRef.markForCheck()}_highlightCorrectOption(){if(this._keyManager)if(this.empty){let e=-1;for(let i=0;i<this.options.length;i++)if(!this.options.get(i).disabled){e=i;break}this._keyManager.setActiveItem(e)}else this._keyManager.setActiveItem(this._selectionModel.selected[0])}_canOpen(){return!this._panelOpen&&!this.disabled&&this.options?.length>0&&!!this._overlayDir}focus(e){this._elementRef.nativeElement.focus(e)}_getPanelAriaLabelledby(){if(this.ariaLabel)return null;let e=this._parentFormField?.getLabelId()||null,i=e?e+" ":"";return this.ariaLabelledby?i+this.ariaLabelledby:e}_getAriaActiveDescendant(){return this.panelOpen&&this._keyManager&&this._keyManager.activeItem?this._keyManager.activeItem.id:null}_getTriggerAriaLabelledby(){if(this.ariaLabel)return null;let e=this._parentFormField?.getLabelId()||"";return this.ariaLabelledby&&(e+=" "+this.ariaLabelledby),e||(e=this._valueId),e}get describedByIds(){return this._elementRef.nativeElement.getAttribute("aria-describedby")?.split(" ")||[]}setDescribedByIds(e){let i=this._elementRef.nativeElement;e.length?i.setAttribute("aria-describedby",e.join(" ")):i.removeAttribute("aria-describedby")}onContainerClick(e){let i=dt(e);i&&(i.tagName==="MAT-OPTION"||i.classList.contains("cdk-overlay-backdrop")||i.closest(".mat-mdc-select-panel"))||(this.focus(),this.open())}get shouldLabelFloat(){return this.panelOpen||!this.empty||this.focused&&!!this.placeholder}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=R({type:t,selectors:[["mat-select"]],contentQueries:function(i,r,o){if(i&1&&Kt(o,GR,5)(o,Jo,5)(o,Qh,5),i&2){let a;W(a=G())&&(r.customTrigger=a.first),W(a=G())&&(r.options=a),W(a=G())&&(r.optionGroups=a)}},viewQuery:function(i,r){if(i&1&&_e(FR,5)(PR,5)(Rd,5),i&2){let o;W(o=G())&&(r.trigger=o.first),W(o=G())&&(r.panel=o.first),W(o=G())&&(r._overlayDir=o.first)}},hostAttrs:["role","combobox","aria-haspopup","listbox",1,"mat-mdc-select"],hostVars:21,hostBindings:function(i,r){i&1&&w("keydown",function(a){return r._handleKeydown(a)})("focus",function(){return r._onFocus()})("blur",function(){return r._onBlur()}),i&2&&(O("id",r.id)("tabindex",r.disabled?-1:r.tabIndex)("aria-controls",r.panelOpen?r.id+"-panel":null)("aria-expanded",r.panelOpen)("aria-label",r.ariaLabel||null)("aria-required",r.required.toString())("aria-disabled",r.disabled.toString())("aria-invalid",r.errorState)("aria-activedescendant",r._getAriaActiveDescendant()),A("mat-mdc-select-disabled",r.disabled)("mat-mdc-select-invalid",r.errorState)("mat-mdc-select-required",r.required)("mat-mdc-select-empty",r.empty)("mat-mdc-select-multiple",r.multiple)("mat-select-open",r.panelOpen))},inputs:{userAriaDescribedBy:[0,"aria-describedby","userAriaDescribedBy"],panelClass:"panelClass",disabled:[2,"disabled","disabled",U],disableRipple:[2,"disableRipple","disableRipple",U],tabIndex:[2,"tabIndex","tabIndex",e=>e==null?0:En(e)],hideSingleSelectionIndicator:[2,"hideSingleSelectionIndicator","hideSingleSelectionIndicator",U],placeholder:"placeholder",required:[2,"required","required",U],multiple:[2,"multiple","multiple",U],disableOptionCentering:[2,"disableOptionCentering","disableOptionCentering",U],compareWith:"compareWith",value:"value",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],errorStateMatcher:"errorStateMatcher",typeaheadDebounceInterval:[2,"typeaheadDebounceInterval","typeaheadDebounceInterval",En],sortComparator:"sortComparator",id:"id",panelWidth:"panelWidth",canSelectNullableOptions:[2,"canSelectNullableOptions","canSelectNullableOptions",U]},outputs:{openedChange:"openedChange",_openedStream:"opened",_closedStream:"closed",selectionChange:"selectionChange",valueChange:"valueChange"},exportAs:["matSelect"],features:[Re([{provide:Os,useExisting:t},{provide:Kh,useExisting:t}]),Be],ngContentSelectors:VR,decls:11,vars:10,consts:[["fallbackOverlayOrigin","cdkOverlayOrigin","trigger",""],["panel",""],["cdk-overlay-origin","",1,"mat-mdc-select-trigger",3,"click"],[1,"mat-mdc-select-value"],[1,"mat-mdc-select-placeholder","mat-mdc-select-min-line"],[1,"mat-mdc-select-value-text"],[1,"mat-mdc-select-arrow-wrapper"],[1,"mat-mdc-select-arrow"],["viewBox","0 0 24 24","width","24px","height","24px","focusable","false","aria-hidden","true"],["d","M7 10l5 5 5-5z"],["cdk-connected-overlay","","cdkConnectedOverlayHasBackdrop","","cdkConnectedOverlayBackdropClass","cdk-overlay-transparent-backdrop",3,"detach","backdropClick","overlayKeydown","cdkConnectedOverlayDisableClose","cdkConnectedOverlayPanelClass","cdkConnectedOverlayScrollStrategy","cdkConnectedOverlayOrigin","cdkConnectedOverlayPositions","cdkConnectedOverlayWidth","cdkConnectedOverlayFlexibleDimensions","cdkConnectedOverlayUsePopover"],[1,"mat-mdc-select-min-line"],["role","listbox","tabindex","-1",1,"mat-mdc-select-panel","mdc-menu-surface","mdc-menu-surface--open",3,"keydown"]],template:function(i,r){if(i&1&&(Se(LR),m(0,"div",2,0),w("click",function(){return r.open()}),m(3,"div",3),k(4,BR,2,1,"span",4)(5,UR,3,1,"span",5),p(),m(6,"div",6)(7,"div",7),_t(),m(8,"svg",8),B(9,"path",9),p()()()(),it(10,zR,3,16,"ng-template",10),w("detach",function(){return r.close()})("backdropClick",function(){return r.close()})("overlayKeydown",function(a){return r._handleOverlayKeydown(a)})),i&2){let o=yt(1);h(3),O("id",r._valueId),h(),T(r.empty?4:5),h(6),E("cdkConnectedOverlayDisableClose",!0)("cdkConnectedOverlayPanelClass",r._overlayPanelClass)("cdkConnectedOverlayScrollStrategy",r._scrollStrategy)("cdkConnectedOverlayOrigin",r._preferredOverlayOrigin||o)("cdkConnectedOverlayPositions",r._positions)("cdkConnectedOverlayWidth",r._overlayWidth)("cdkConnectedOverlayFlexibleDimensions",!0)("cdkConnectedOverlayUsePopover",r._popoverLocation)}},dependencies:[Ho,Rd],styles:[`@keyframes _mat-select-enter {
  from {
    opacity: 0;
    transform: scaleY(0.8);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes _mat-select-exit {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.mat-mdc-select {
  display: inline-block;
  width: 100%;
  outline: none;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  color: var(--mat-select-enabled-trigger-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-select-trigger-text-font, var(--mat-sys-body-large-font));
  line-height: var(--mat-select-trigger-text-line-height, var(--mat-sys-body-large-line-height));
  font-size: var(--mat-select-trigger-text-size, var(--mat-sys-body-large-size));
  font-weight: var(--mat-select-trigger-text-weight, var(--mat-sys-body-large-weight));
  letter-spacing: var(--mat-select-trigger-text-tracking, var(--mat-sys-body-large-tracking));
}

div.mat-mdc-select-panel {
  box-shadow: var(--mat-select-container-elevation-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12));
}

.mat-mdc-select-disabled {
  color: var(--mat-select-disabled-trigger-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-select-disabled .mat-mdc-select-placeholder {
  color: var(--mat-select-disabled-trigger-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}

.mat-mdc-select-trigger {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  box-sizing: border-box;
  width: 100%;
}
.mat-mdc-select-disabled .mat-mdc-select-trigger {
  -webkit-user-select: none;
  user-select: none;
  cursor: default;
}

.mat-mdc-select-value {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mat-mdc-select-value-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mat-mdc-select-arrow-wrapper {
  height: 24px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
}
.mat-form-field-appearance-fill .mdc-text-field--no-label .mat-mdc-select-arrow-wrapper {
  transform: none;
}

.mat-mdc-form-field .mat-mdc-select.mat-mdc-select-invalid .mat-mdc-select-arrow,
.mat-form-field-invalid:not(.mat-form-field-disabled) .mat-mdc-form-field-infix::after {
  color: var(--mat-select-invalid-arrow-color, var(--mat-sys-error));
}

.mat-mdc-select-arrow {
  width: 10px;
  height: 5px;
  position: relative;
  color: var(--mat-select-enabled-arrow-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-form-field.mat-focused .mat-mdc-select-arrow {
  color: var(--mat-select-focused-arrow-color, var(--mat-sys-primary));
}
.mat-mdc-form-field .mat-mdc-select.mat-mdc-select-disabled .mat-mdc-select-arrow {
  color: var(--mat-select-disabled-arrow-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-select-open .mat-mdc-select-arrow {
  transform: rotate(180deg);
}
.mat-form-field-animations-enabled .mat-mdc-select-arrow {
  transition: transform 80ms linear;
}
.mat-mdc-select-arrow svg {
  fill: currentColor;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
@media (forced-colors: active) {
  .mat-mdc-select-arrow svg {
    fill: CanvasText;
  }
  .mat-mdc-select-disabled .mat-mdc-select-arrow svg {
    fill: GrayText;
  }
}

div.mat-mdc-select-panel {
  width: 100%;
  max-height: 275px;
  outline: 0;
  overflow: auto;
  padding: 8px 0;
  box-sizing: border-box;
  transform-origin: top center;
  border-radius: 0 0 4px 4px;
  position: relative;
  background-color: var(--mat-select-panel-background-color, var(--mat-sys-surface-container));
}
.mat-mdc-select-panel-above div.mat-mdc-select-panel {
  border-radius: 4px 4px 0 0;
  transform-origin: bottom center;
}
@media (forced-colors: active) {
  div.mat-mdc-select-panel {
    outline: solid 1px;
  }
}

.mat-select-panel-animations-enabled {
  animation: _mat-select-enter 120ms cubic-bezier(0, 0, 0.2, 1);
}
.mat-select-panel-animations-enabled.mat-select-panel-exit {
  animation: _mat-select-exit 100ms linear;
}

.mat-mdc-select-placeholder {
  transition: color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1);
  color: var(--mat-select-placeholder-text-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-form-field:not(.mat-form-field-animations-enabled) .mat-mdc-select-placeholder, ._mat-animation-noopable .mat-mdc-select-placeholder {
  transition: none;
}
.mat-form-field-hide-placeholder .mat-mdc-select-placeholder {
  color: transparent;
  -webkit-text-fill-color: transparent;
  transition: none;
  display: block;
}

.mat-mdc-form-field-type-mat-select:not(.mat-form-field-disabled) .mat-mdc-text-field-wrapper {
  cursor: pointer;
}
.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-fill .mat-mdc-floating-label {
  max-width: calc(100% - 18px);
}
.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-fill .mdc-floating-label--float-above {
  max-width: calc(100% / 0.75 - 24px);
}
.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-outline .mdc-notched-outline__notch {
  max-width: calc(100% - 60px);
}
.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-outline .mdc-text-field--label-floating .mdc-notched-outline__notch {
  max-width: calc(100% - 24px);
}

.mat-mdc-select-min-line:empty::before {
  content: " ";
  white-space: pre;
  width: 1px;
  display: inline-block;
  visibility: hidden;
}

.mat-form-field-appearance-fill .mat-mdc-select-arrow-wrapper {
  transform: var(--mat-select-arrow-transform, translateY(-8px));
}
`],encapsulation:2,changeDetection:0})}return t})();var PD=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=Z({type:t});static \u0275inj=q({imports:[At,Xh,he,Rn,ui,Xh]})}return t})();var qR=["tooltip"],ZR=20;var KR=new y("mat-tooltip-scroll-strategy",{providedIn:"root",factory:()=>{let t=c(Y);return()=>Yn(t,{scrollThrottle:ZR})}}),QR=new y("mat-tooltip-default-options",{providedIn:"root",factory:()=>({showDelay:0,hideDelay:0,touchendHideDelay:1500})});var LD="tooltip-panel",XR={passive:!0},JR=8,eO=8,tO=24,nO=200,pi=(()=>{class t{_elementRef=c(L);_ngZone=c(P);_platform=c(pe);_ariaDescriber=c(H0);_focusMonitor=c(jt);_dir=c(Ue);_injector=c(Y);_viewContainerRef=c(bt);_mediaMatcher=c(Po);_document=c(K);_renderer=c(Te);_animationsDisabled=xe();_defaultOptions=c(QR,{optional:!0});_overlayRef=null;_tooltipInstance=null;_overlayPanelClass;_portal;_position="below";_positionAtOrigin=!1;_disabled=!1;_tooltipClass;_viewInitialized=!1;_pointerExitEventsInitialized=!1;_tooltipComponent=VD;_viewportMargin=8;_currentPosition;_cssClassPrefix="mat-mdc";_ariaDescriptionPending=!1;_dirSubscribed=!1;get position(){return this._position}set position(e){e!==this._position&&(this._position=e,this._overlayRef&&(this._updatePosition(this._overlayRef),this._tooltipInstance?.show(0),this._overlayRef.updatePosition()))}get positionAtOrigin(){return this._positionAtOrigin}set positionAtOrigin(e){this._positionAtOrigin=li(e),this._detach(),this._overlayRef=null}get disabled(){return this._disabled}set disabled(e){let i=li(e);this._disabled!==i&&(this._disabled=i,i?this.hide(0):this._setupPointerEnterEventsIfNeeded(),this._syncAriaDescription(this.message))}get showDelay(){return this._showDelay}set showDelay(e){this._showDelay=si(e)}_showDelay;get hideDelay(){return this._hideDelay}set hideDelay(e){this._hideDelay=si(e),this._tooltipInstance&&(this._tooltipInstance._mouseLeaveHideDelay=this._hideDelay)}_hideDelay;touchGestures="auto";get message(){return this._message}set message(e){let i=this._message;this._message=e!=null?String(e).trim():"",!this._message&&this._isTooltipVisible()?this.hide(0):(this._setupPointerEnterEventsIfNeeded(),this._updateTooltipMessage()),this._syncAriaDescription(i)}_message="";get tooltipClass(){return this._tooltipClass}set tooltipClass(e){this._tooltipClass=e,this._tooltipInstance&&this._setTooltipClass(this._tooltipClass)}_eventCleanups=[];_touchstartTimeout=null;_destroyed=new M;_isDestroyed=!1;constructor(){let e=this._defaultOptions;e&&(this._showDelay=e.showDelay,this._hideDelay=e.hideDelay,e.position&&(this.position=e.position),e.positionAtOrigin&&(this.positionAtOrigin=e.positionAtOrigin),e.touchGestures&&(this.touchGestures=e.touchGestures),e.tooltipClass&&(this.tooltipClass=e.tooltipClass)),this._viewportMargin=JR}ngAfterViewInit(){this._viewInitialized=!0,this._setupPointerEnterEventsIfNeeded(),this._focusMonitor.monitor(this._elementRef).pipe(Ee(this._destroyed)).subscribe(e=>{e?e==="keyboard"&&this._ngZone.run(()=>this.show()):this._ngZone.run(()=>this.hide(0))})}ngOnDestroy(){let e=this._elementRef.nativeElement;this._touchstartTimeout&&clearTimeout(this._touchstartTimeout),this._overlayRef&&(this._overlayRef.dispose(),this._tooltipInstance=null),this._eventCleanups.forEach(i=>i()),this._eventCleanups.length=0,this._destroyed.next(),this._destroyed.complete(),this._isDestroyed=!0,this._ariaDescriber.removeDescription(e,this.message,"tooltip"),this._focusMonitor.stopMonitoring(e)}show(e=this.showDelay,i){if(this.disabled||!this.message||this._isTooltipVisible()){this._tooltipInstance?._cancelPendingAnimations();return}let r=this._createOverlay(i);this._detach(),this._portal=this._portal||new Ut(this._tooltipComponent,this._viewContainerRef);let o=this._tooltipInstance=r.attach(this._portal).instance;o._triggerElement=this._elementRef.nativeElement,o._mouseLeaveHideDelay=this._hideDelay,o.afterHidden().pipe(Ee(this._destroyed)).subscribe(()=>this._detach()),this._setTooltipClass(this._tooltipClass),this._updateTooltipMessage(),o.show(e)}hide(e=this.hideDelay){let i=this._tooltipInstance;i&&(i.isVisible()?i.hide(e):(i._cancelPendingAnimations(),this._detach()))}toggle(e){this._isTooltipVisible()?this.hide():this.show(void 0,e)}_isTooltipVisible(){return!!this._tooltipInstance&&this._tooltipInstance.isVisible()}_createOverlay(e){if(this._overlayRef){let a=this._overlayRef.getConfig().positionStrategy;if((!this.positionAtOrigin||!e)&&a._origin instanceof L)return this._overlayRef;this._detach()}let i=this._injector.get(Vi).getAncestorScrollContainers(this._elementRef),r=`${this._cssClassPrefix}-${LD}`,o=ji(this._injector,this.positionAtOrigin?e||this._elementRef:this._elementRef).withTransformOriginOn(`.${this._cssClassPrefix}-tooltip`).withFlexibleDimensions(!1).withViewportMargin(this._viewportMargin).withScrollableContainers(i).withPopoverLocation("global");return o.positionChanges.pipe(Ee(this._destroyed)).subscribe(a=>{this._updateCurrentPositionClass(a.connectionPair),this._tooltipInstance&&a.scrollableViewProperties.isOverlayClipped&&this._tooltipInstance.isVisible()&&this._ngZone.run(()=>this.hide(0))}),this._overlayRef=sn(this._injector,{direction:this._dir,positionStrategy:o,panelClass:this._overlayPanelClass?[...this._overlayPanelClass,r]:r,scrollStrategy:this._injector.get(KR)(),disableAnimations:this._animationsDisabled,eventPredicate:this._overlayEventPredicate}),this._updatePosition(this._overlayRef),this._overlayRef.detachments().pipe(Ee(this._destroyed)).subscribe(()=>this._detach()),this._overlayRef.outsidePointerEvents().pipe(Ee(this._destroyed)).subscribe(()=>this._tooltipInstance?._handleBodyInteraction()),this._overlayRef.keydownEvents().pipe(Ee(this._destroyed)).subscribe(a=>{a.preventDefault(),a.stopPropagation(),this._ngZone.run(()=>this.hide(0))}),this._defaultOptions?.disableTooltipInteractivity&&this._overlayRef.addPanelClass(`${this._cssClassPrefix}-tooltip-panel-non-interactive`),this._dirSubscribed||(this._dirSubscribed=!0,this._dir.change.pipe(Ee(this._destroyed)).subscribe(()=>{this._overlayRef&&this._updatePosition(this._overlayRef)})),this._overlayRef}_detach(){this._overlayRef&&this._overlayRef.hasAttached()&&this._overlayRef.detach(),this._tooltipInstance=null}_updatePosition(e){let i=e.getConfig().positionStrategy,r=this._getOrigin(),o=this._getOverlayPosition();i.withPositions([this._addOffset(I(I({},r.main),o.main)),this._addOffset(I(I({},r.fallback),o.fallback))])}_addOffset(e){let i=eO,r=!this._dir||this._dir.value=="ltr";return e.originY==="top"?e.offsetY=-i:e.originY==="bottom"?e.offsetY=i:e.originX==="start"?e.offsetX=r?-i:i:e.originX==="end"&&(e.offsetX=r?i:-i),e}_getOrigin(){let e=!this._dir||this._dir.value=="ltr",i=this.position,r;i=="above"||i=="below"?r={originX:"center",originY:i=="above"?"top":"bottom"}:i=="before"||i=="left"&&e||i=="right"&&!e?r={originX:"start",originY:"center"}:(i=="after"||i=="right"&&e||i=="left"&&!e)&&(r={originX:"end",originY:"center"});let{x:o,y:a}=this._invertPosition(r.originX,r.originY);return{main:r,fallback:{originX:o,originY:a}}}_getOverlayPosition(){let e=!this._dir||this._dir.value=="ltr",i=this.position,r;i=="above"?r={overlayX:"center",overlayY:"bottom"}:i=="below"?r={overlayX:"center",overlayY:"top"}:i=="before"||i=="left"&&e||i=="right"&&!e?r={overlayX:"end",overlayY:"center"}:(i=="after"||i=="right"&&e||i=="left"&&!e)&&(r={overlayX:"start",overlayY:"center"});let{x:o,y:a}=this._invertPosition(r.overlayX,r.overlayY);return{main:r,fallback:{overlayX:o,overlayY:a}}}_updateTooltipMessage(){this._tooltipInstance&&(this._tooltipInstance.message=this.message,this._tooltipInstance._markForCheck(),Qe(()=>{this._tooltipInstance&&this._overlayRef.updatePosition()},{injector:this._injector}))}_setTooltipClass(e){this._tooltipInstance&&(this._tooltipInstance.tooltipClass=e instanceof Set?Array.from(e):e,this._tooltipInstance._markForCheck())}_invertPosition(e,i){return this.position==="above"||this.position==="below"?i==="top"?i="bottom":i==="bottom"&&(i="top"):e==="end"?e="start":e==="start"&&(e="end"),{x:e,y:i}}_updateCurrentPositionClass(e){let{overlayY:i,originX:r,originY:o}=e,a;if(i==="center"?this._dir&&this._dir.value==="rtl"?a=r==="end"?"left":"right":a=r==="start"?"left":"right":a=i==="bottom"&&o==="top"?"above":"below",a!==this._currentPosition){let s=this._overlayRef;if(s){let l=`${this._cssClassPrefix}-${LD}-`;s.removePanelClass(l+this._currentPosition),s.addPanelClass(l+a)}this._currentPosition=a}}_setupPointerEnterEventsIfNeeded(){this._disabled||!this.message||!this._viewInitialized||this._eventCleanups.length||(this._isTouchPlatform()?this.touchGestures!=="off"&&(this._disableNativeGesturesIfNecessary(),this._addListener("touchstart",e=>{let i=e.targetTouches?.[0],r=i?{x:i.clientX,y:i.clientY}:void 0;this._setupPointerExitEventsIfNeeded(),this._touchstartTimeout&&clearTimeout(this._touchstartTimeout);let o=500;this._touchstartTimeout=setTimeout(()=>{this._touchstartTimeout=null,this.show(void 0,r)},this._defaultOptions?.touchLongPressShowDelay??o)})):this._addListener("mouseenter",e=>{this._setupPointerExitEventsIfNeeded();let i;e.x!==void 0&&e.y!==void 0&&(i=e),this.show(void 0,i)}))}_setupPointerExitEventsIfNeeded(){if(!this._pointerExitEventsInitialized){if(this._pointerExitEventsInitialized=!0,!this._isTouchPlatform())this._addListener("mouseleave",e=>{let i=e.relatedTarget;(!i||!this._overlayRef?.overlayElement.contains(i))&&this.hide()}),this._addListener("wheel",e=>{if(this._isTooltipVisible()){let i=this._document.elementFromPoint(e.clientX,e.clientY),r=this._elementRef.nativeElement;i!==r&&!r.contains(i)&&this.hide()}});else if(this.touchGestures!=="off"){this._disableNativeGesturesIfNecessary();let e=()=>{this._touchstartTimeout&&clearTimeout(this._touchstartTimeout),this.hide(this._defaultOptions?.touchendHideDelay)};this._addListener("touchend",e),this._addListener("touchcancel",e)}}}_addListener(e,i){this._eventCleanups.push(this._renderer.listen(this._elementRef.nativeElement,e,i,XR))}_isTouchPlatform(){let e=this._defaultOptions?.detectHoverCapability;return typeof e=="function"?!e():this._platform.IOS||this._platform.ANDROID?!0:this._platform.isBrowser?!!e&&this._mediaMatcher.matchMedia("(any-hover: none)").matches:!1}_disableNativeGesturesIfNecessary(){let e=this.touchGestures;if(e!=="off"){let i=this._elementRef.nativeElement,r=i.style;(e==="on"||i.nodeName!=="INPUT"&&i.nodeName!=="TEXTAREA")&&(r.userSelect=r.msUserSelect=r.webkitUserSelect=r.MozUserSelect="none"),(e==="on"||!i.draggable)&&(r.webkitUserDrag="none"),r.touchAction="none",r.webkitTapHighlightColor="transparent"}}_syncAriaDescription(e){this._ariaDescriptionPending||(this._ariaDescriptionPending=!0,this._ariaDescriber.removeDescription(this._elementRef.nativeElement,e,"tooltip"),this._isDestroyed||Qe({write:()=>{this._ariaDescriptionPending=!1,this.message&&!this.disabled&&this._ariaDescriber.describe(this._elementRef.nativeElement,this.message,"tooltip")}},{injector:this._injector}))}_overlayEventPredicate=e=>e.type==="keydown"?this._isTooltipVisible()&&e.keyCode===27&&!$e(e):!0;static \u0275fac=function(i){return new(i||t)};static \u0275dir=$({type:t,selectors:[["","matTooltip",""]],hostAttrs:[1,"mat-mdc-tooltip-trigger"],hostVars:2,hostBindings:function(i,r){i&2&&A("mat-mdc-tooltip-disabled",r.disabled)},inputs:{position:[0,"matTooltipPosition","position"],positionAtOrigin:[0,"matTooltipPositionAtOrigin","positionAtOrigin"],disabled:[0,"matTooltipDisabled","disabled"],showDelay:[0,"matTooltipShowDelay","showDelay"],hideDelay:[0,"matTooltipHideDelay","hideDelay"],touchGestures:[0,"matTooltipTouchGestures","touchGestures"],message:[0,"matTooltip","message"],tooltipClass:[0,"matTooltipClass","tooltipClass"]},exportAs:["matTooltip"]})}return t})(),VD=(()=>{class t{_changeDetectorRef=c(be);_elementRef=c(L);_isMultiline=!1;message;tooltipClass;_showTimeoutId;_hideTimeoutId;_triggerElement;_mouseLeaveHideDelay;_animationsDisabled=xe();_tooltip;_closeOnInteraction=!1;_isVisible=!1;_onHide=new M;_showAnimation="mat-mdc-tooltip-show";_hideAnimation="mat-mdc-tooltip-hide";constructor(){}show(e){this._hideTimeoutId!=null&&clearTimeout(this._hideTimeoutId),this._showTimeoutId=setTimeout(()=>{this._toggleVisibility(!0),this._showTimeoutId=void 0},e)}hide(e){this._showTimeoutId!=null&&clearTimeout(this._showTimeoutId),this._hideTimeoutId=setTimeout(()=>{this._toggleVisibility(!1),this._hideTimeoutId=void 0},e)}afterHidden(){return this._onHide}isVisible(){return this._isVisible}ngOnDestroy(){this._cancelPendingAnimations(),this._onHide.complete(),this._triggerElement=null}_handleBodyInteraction(){this._closeOnInteraction&&this.hide(0)}_markForCheck(){this._changeDetectorRef.markForCheck()}_handleMouseLeave({relatedTarget:e}){(!e||!this._triggerElement.contains(e))&&(this.isVisible()?this.hide(this._mouseLeaveHideDelay):this._finalizeAnimation(!1))}_onShow(){this._isMultiline=this._isTooltipMultiline(),this._markForCheck()}_isTooltipMultiline(){let e=this._elementRef.nativeElement.getBoundingClientRect();return e.height>tO&&e.width>=nO}_handleAnimationEnd({animationName:e}){(e===this._showAnimation||e===this._hideAnimation)&&this._finalizeAnimation(e===this._showAnimation)}_cancelPendingAnimations(){this._showTimeoutId!=null&&clearTimeout(this._showTimeoutId),this._hideTimeoutId!=null&&clearTimeout(this._hideTimeoutId),this._showTimeoutId=this._hideTimeoutId=void 0}_finalizeAnimation(e){e?this._closeOnInteraction=!0:this.isVisible()||this._onHide.next()}_toggleVisibility(e){let i=this._tooltip.nativeElement,r=this._showAnimation,o=this._hideAnimation;if(i.classList.remove(e?o:r),i.classList.add(e?r:o),this._isVisible!==e&&(this._isVisible=e,this._changeDetectorRef.markForCheck()),e&&!this._animationsDisabled&&typeof getComputedStyle=="function"){let a=getComputedStyle(i);(a.getPropertyValue("animation-duration")==="0s"||a.getPropertyValue("animation-name")==="none")&&(this._animationsDisabled=!0)}e&&this._onShow(),this._animationsDisabled&&(i.classList.add("_mat-animation-noopable"),this._finalizeAnimation(e))}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=R({type:t,selectors:[["mat-tooltip-component"]],viewQuery:function(i,r){if(i&1&&_e(qR,7),i&2){let o;W(o=G())&&(r._tooltip=o.first)}},hostAttrs:["aria-hidden","true"],hostBindings:function(i,r){i&1&&w("mouseleave",function(a){return r._handleMouseLeave(a)})},decls:4,vars:5,consts:[["tooltip",""],[1,"mdc-tooltip","mat-mdc-tooltip",3,"animationend"],[1,"mat-mdc-tooltip-surface","mdc-tooltip__surface"]],template:function(i,r){i&1&&(Pe(0,"div",1,0),Ri("animationend",function(a){return r._handleAnimationEnd(a)}),Pe(2,"div",2),v(3),je()()),i&2&&(rt(r.tooltipClass),A("mdc-tooltip--multiline",r._isMultiline),h(3),ne(r.message))},styles:[`.mat-mdc-tooltip {
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
`],encapsulation:2,changeDetection:0})}return t})();var ea=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=Z({type:t});static \u0275inj=q({imports:[Vr,At,he,Rn]})}return t})();var iO=["button"],rO=["*"];function oO(t,n){if(t&1&&(m(0,"div",2),B(1,"mat-pseudo-checkbox",6),p()),t&2){let e=b();h(),E("disabled",e.disabled)}}var BD=new y("MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS",{providedIn:"root",factory:()=>({hideSingleSelectionIndicator:!1,hideMultipleSelectionIndicator:!1,disabledInteractive:!1})}),jD=new y("MatButtonToggleGroup"),aO={provide:Ur,useExisting:gt(()=>tg),multi:!0},au=class{source;value;constructor(n,e){this.source=n,this.value=e}},tg=(()=>{class t{_changeDetector=c(be);_dir=c(Ue,{optional:!0});_multiple=!1;_disabled=!1;_disabledInteractive=!1;_selectionModel;_rawValue;_controlValueAccessorChangeFn=()=>{};_onTouched=()=>{};_buttonToggles;appearance;get name(){return this._name}set name(e){this._name=e,this._markButtonsForCheck()}_name=c(ye).getId("mat-button-toggle-group-");vertical=!1;get value(){let e=this._selectionModel?this._selectionModel.selected:[];return this.multiple?e.map(i=>i.value):e[0]?e[0].value:void 0}set value(e){this._setSelectionByValue(e),this.valueChange.emit(this.value)}valueChange=new S;get selected(){let e=this._selectionModel?this._selectionModel.selected:[];return this.multiple?e:e[0]||null}get multiple(){return this._multiple}set multiple(e){this._multiple=e,this._markButtonsForCheck()}get disabled(){return this._disabled}set disabled(e){this._disabled=e,this._markButtonsForCheck()}get disabledInteractive(){return this._disabledInteractive}set disabledInteractive(e){this._disabledInteractive=e,this._markButtonsForCheck()}get dir(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}change=new S;get hideSingleSelectionIndicator(){return this._hideSingleSelectionIndicator}set hideSingleSelectionIndicator(e){this._hideSingleSelectionIndicator=e,this._markButtonsForCheck()}_hideSingleSelectionIndicator;get hideMultipleSelectionIndicator(){return this._hideMultipleSelectionIndicator}set hideMultipleSelectionIndicator(e){this._hideMultipleSelectionIndicator=e,this._markButtonsForCheck()}_hideMultipleSelectionIndicator;constructor(){let e=c(BD,{optional:!0});this.appearance=e&&e.appearance?e.appearance:"standard",this._hideSingleSelectionIndicator=e?.hideSingleSelectionIndicator??!1,this._hideMultipleSelectionIndicator=e?.hideMultipleSelectionIndicator??!1}ngOnInit(){this._selectionModel=new Wr(this.multiple,void 0,!1)}ngAfterContentInit(){this._selectionModel.select(...this._buttonToggles.filter(e=>e.checked)),this.multiple||this._initializeTabIndex()}writeValue(e){this.value=e,this._changeDetector.markForCheck()}registerOnChange(e){this._controlValueAccessorChangeFn=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this.disabled=e}_keydown(e){if(this.multiple||this.disabled||$e(e))return;let r=e.target.id,o=this._buttonToggles.toArray().findIndex(s=>s.buttonId===r),a=null;switch(e.keyCode){case 32:case 13:a=this._buttonToggles.get(o)||null;break;case 38:a=this._getNextButton(o,-1);break;case 37:a=this._getNextButton(o,this.dir==="ltr"?-1:1);break;case 40:a=this._getNextButton(o,1);break;case 39:a=this._getNextButton(o,this.dir==="ltr"?1:-1);break;default:return}a&&(e.preventDefault(),a._onButtonClick(),a.focus())}_emitChangeEvent(e){let i=new au(e,this.value);this._rawValue=i.value,this._controlValueAccessorChangeFn(i.value),this.change.emit(i)}_syncButtonToggle(e,i,r=!1,o=!1){!this.multiple&&this.selected&&!e.checked&&(this.selected.checked=!1),this._selectionModel?i?this._selectionModel.select(e):this._selectionModel.deselect(e):o=!0,o?Promise.resolve().then(()=>this._updateModelValue(e,r)):this._updateModelValue(e,r)}_isSelected(e){return this._selectionModel&&this._selectionModel.isSelected(e)}_isPrechecked(e){return typeof this._rawValue>"u"?!1:this.multiple&&Array.isArray(this._rawValue)?this._rawValue.some(i=>e.value!=null&&i===e.value):e.value===this._rawValue}_initializeTabIndex(){if(this._buttonToggles.forEach(e=>{e.tabIndex=-1}),this.selected)this.selected.tabIndex=0;else for(let e=0;e<this._buttonToggles.length;e++){let i=this._buttonToggles.get(e);if(!i.disabled){i.tabIndex=0;break}}}_getNextButton(e,i){let r=this._buttonToggles;for(let o=1;o<=r.length;o++){let a=(e+i*o+r.length)%r.length,s=r.get(a);if(s&&!s.disabled)return s}return null}_setSelectionByValue(e){if(this._rawValue=e,!this._buttonToggles)return;let i=this._buttonToggles.toArray();if(this.multiple&&e?(Array.isArray(e),this._clearSelection(),e.forEach(r=>this._selectValue(r,i))):(this._clearSelection(),this._selectValue(e,i)),!this.multiple&&i.every(r=>r.tabIndex===-1)){for(let r of i)if(!r.disabled){r.tabIndex=0;break}}}_clearSelection(){this._selectionModel.clear(),this._buttonToggles.forEach(e=>{e.checked=!1,this.multiple||(e.tabIndex=-1)})}_selectValue(e,i){for(let r of i)if(r.value===e){r.checked=!0,this._selectionModel.select(r),this.multiple||(r.tabIndex=0);break}}_updateModelValue(e,i){i&&this._emitChangeEvent(e),this.valueChange.emit(this.value)}_markButtonsForCheck(){this._buttonToggles?.forEach(e=>e._markForCheck())}static \u0275fac=function(i){return new(i||t)};static \u0275dir=$({type:t,selectors:[["mat-button-toggle-group"]],contentQueries:function(i,r,o){if(i&1&&Kt(o,su,5),i&2){let a;W(a=G())&&(r._buttonToggles=a)}},hostAttrs:[1,"mat-button-toggle-group"],hostVars:6,hostBindings:function(i,r){i&1&&w("keydown",function(a){return r._keydown(a)}),i&2&&(O("role",r.multiple?"group":"radiogroup")("aria-disabled",r.disabled),A("mat-button-toggle-vertical",r.vertical)("mat-button-toggle-group-appearance-standard",r.appearance==="standard"))},inputs:{appearance:"appearance",name:"name",vertical:[2,"vertical","vertical",U],value:"value",multiple:[2,"multiple","multiple",U],disabled:[2,"disabled","disabled",U],disabledInteractive:[2,"disabledInteractive","disabledInteractive",U],hideSingleSelectionIndicator:[2,"hideSingleSelectionIndicator","hideSingleSelectionIndicator",U],hideMultipleSelectionIndicator:[2,"hideMultipleSelectionIndicator","hideMultipleSelectionIndicator",U]},outputs:{valueChange:"valueChange",change:"change"},exportAs:["matButtonToggleGroup"],features:[Re([aO,{provide:jD,useExisting:t}])]})}return t})(),su=(()=>{class t{_changeDetectorRef=c(be);_elementRef=c(L);_focusMonitor=c(jt);_idGenerator=c(ye);_animationDisabled=xe();_checked=!1;ariaLabel;ariaLabelledby=null;_buttonElement;buttonToggleGroup;get buttonId(){return`${this.id}-button`}id;name;value;get tabIndex(){return this._tabIndex()}set tabIndex(e){this._tabIndex.set(e)}_tabIndex;disableRipple=!1;get appearance(){return this.buttonToggleGroup?this.buttonToggleGroup.appearance:this._appearance}set appearance(e){this._appearance=e}_appearance;get checked(){return this.buttonToggleGroup?this.buttonToggleGroup._isSelected(this):this._checked}set checked(e){e!==this._checked&&(this._checked=e,this.buttonToggleGroup&&this.buttonToggleGroup._syncButtonToggle(this,this._checked),this._changeDetectorRef.markForCheck())}get disabled(){return this._disabled||this.buttonToggleGroup&&this.buttonToggleGroup.disabled}set disabled(e){this._disabled=e}_disabled=!1;get disabledInteractive(){return this._disabledInteractive||this.buttonToggleGroup!==null&&this.buttonToggleGroup.disabledInteractive}set disabledInteractive(e){this._disabledInteractive=e}_disabledInteractive;change=new S;constructor(){c(Oe).load(nn);let e=c(jD,{optional:!0}),i=c(new Xt("tabindex"),{optional:!0})||"",r=c(BD,{optional:!0});this._tabIndex=x(parseInt(i)||0),this.buttonToggleGroup=e,this._appearance=r&&r.appearance?r.appearance:"standard",this._disabledInteractive=r?.disabledInteractive??!1}ngOnInit(){let e=this.buttonToggleGroup;this.id=this.id||this._idGenerator.getId("mat-button-toggle-"),e&&(e._isPrechecked(this)?this.checked=!0:e._isSelected(this)!==this._checked&&e._syncButtonToggle(this,this._checked))}ngAfterViewInit(){this._animationDisabled||this._elementRef.nativeElement.classList.add("mat-button-toggle-animations-enabled"),this._focusMonitor.monitor(this._elementRef,!0)}ngOnDestroy(){let e=this.buttonToggleGroup;this._focusMonitor.stopMonitoring(this._elementRef),e&&e._isSelected(this)&&e._syncButtonToggle(this,!1,!1,!0)}focus(e){this._buttonElement.nativeElement.focus(e)}_onButtonClick(){if(this.disabled)return;let e=this.isSingleSelector()?!0:!this._checked;if(e!==this._checked&&(this._checked=e,this.buttonToggleGroup&&(this.buttonToggleGroup._syncButtonToggle(this,this._checked,!0),this.buttonToggleGroup._onTouched())),this.isSingleSelector()){let i=this.buttonToggleGroup._buttonToggles.find(r=>r.tabIndex===0);i&&(i.tabIndex=-1),this.tabIndex=0}this.change.emit(new au(this,this.value))}_markForCheck(){this._changeDetectorRef.markForCheck()}_getButtonName(){return this.isSingleSelector()?this.buttonToggleGroup.name:this.name||null}isSingleSelector(){return this.buttonToggleGroup&&!this.buttonToggleGroup.multiple}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=R({type:t,selectors:[["mat-button-toggle"]],viewQuery:function(i,r){if(i&1&&_e(iO,5),i&2){let o;W(o=G())&&(r._buttonElement=o.first)}},hostAttrs:["role","presentation",1,"mat-button-toggle"],hostVars:14,hostBindings:function(i,r){i&1&&w("focus",function(){return r.focus()}),i&2&&(O("aria-label",null)("aria-labelledby",null)("id",r.id)("name",null),A("mat-button-toggle-standalone",!r.buttonToggleGroup)("mat-button-toggle-checked",r.checked)("mat-button-toggle-disabled",r.disabled)("mat-button-toggle-disabled-interactive",r.disabledInteractive)("mat-button-toggle-appearance-standard",r.appearance==="standard"))},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],id:"id",name:"name",value:"value",tabIndex:"tabIndex",disableRipple:[2,"disableRipple","disableRipple",U],appearance:"appearance",checked:[2,"checked","checked",U],disabled:[2,"disabled","disabled",U],disabledInteractive:[2,"disabledInteractive","disabledInteractive",U]},outputs:{change:"change"},exportAs:["matButtonToggle"],ngContentSelectors:rO,decls:7,vars:13,consts:[["button",""],["type","button",1,"mat-button-toggle-button","mat-focus-indicator",3,"click","id","disabled"],[1,"mat-button-toggle-checkbox-wrapper"],[1,"mat-button-toggle-label-content"],[1,"mat-button-toggle-focus-overlay"],["matRipple","",1,"mat-button-toggle-ripple",3,"matRippleTrigger","matRippleDisabled"],["state","checked","aria-hidden","true","appearance","minimal",3,"disabled"]],template:function(i,r){if(i&1&&(Se(),m(0,"button",1,0),w("click",function(){return r._onButtonClick()}),k(2,oO,2,1,"div",2),m(3,"span",3),oe(4),p()(),B(5,"span",4)(6,"span",5)),i&2){let o=yt(1);E("id",r.buttonId)("disabled",r.disabled&&!r.disabledInteractive||null),O("role",r.isSingleSelector()?"radio":"button")("tabindex",r.disabled&&!r.disabledInteractive?-1:r.tabIndex)("aria-pressed",r.isSingleSelector()?null:r.checked)("aria-checked",r.isSingleSelector()?r.checked:null)("name",r._getButtonName())("aria-label",r.ariaLabel)("aria-labelledby",r.ariaLabelledby)("aria-disabled",r.disabled&&r.disabledInteractive?"true":null),h(2),T(r.buttonToggleGroup&&(!r.buttonToggleGroup.multiple&&!r.buttonToggleGroup.hideSingleSelectionIndicator||r.buttonToggleGroup.multiple&&!r.buttonToggleGroup.hideMultipleSelectionIndicator)?2:-1),h(4),E("matRippleTrigger",o)("matRippleDisabled",r.disableRipple||r.disabled)}},dependencies:[Pi,ou],styles:[`.mat-button-toggle-standalone,
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
`],encapsulation:2,changeDetection:0})}return t})(),HD=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=Z({type:t});static \u0275inj=q({imports:[Li,su,he]})}return t})();var lO=["mat-internal-form-field",""],cO=["*"],UD=(()=>{class t{labelPosition="after";static \u0275fac=function(i){return new(i||t)};static \u0275cmp=R({type:t,selectors:[["div","mat-internal-form-field",""]],hostAttrs:[1,"mdc-form-field","mat-internal-form-field"],hostVars:2,hostBindings:function(i,r){i&2&&A("mdc-form-field--align-end",r.labelPosition==="before")},inputs:{labelPosition:"labelPosition"},attrs:lO,ngContentSelectors:cO,decls:1,vars:0,template:function(i,r){i&1&&(Se(),oe(0))},styles:[`.mat-internal-form-field {
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
`],encapsulation:2,changeDetection:0})}return t})();var dO=["input"],uO=["label"],fO=["*"],ng={color:"accent",clickAction:"check-indeterminate",disabledInteractive:!1},mO=new y("mat-checkbox-default-options",{providedIn:"root",factory:()=>ng}),Dt=(function(t){return t[t.Init=0]="Init",t[t.Checked=1]="Checked",t[t.Unchecked=2]="Unchecked",t[t.Indeterminate=3]="Indeterminate",t})(Dt||{}),ig=class{source;checked},rg=(()=>{class t{_elementRef=c(L);_changeDetectorRef=c(be);_ngZone=c(P);_animationsDisabled=xe();_options=c(mO,{optional:!0});focus(){this._inputElement.nativeElement.focus()}_createChangeEvent(e){let i=new ig;return i.source=this,i.checked=e,i}_getAnimationTargetElement(){return this._inputElement?.nativeElement}_animationClasses={uncheckedToChecked:"mdc-checkbox--anim-unchecked-checked",uncheckedToIndeterminate:"mdc-checkbox--anim-unchecked-indeterminate",checkedToUnchecked:"mdc-checkbox--anim-checked-unchecked",checkedToIndeterminate:"mdc-checkbox--anim-checked-indeterminate",indeterminateToChecked:"mdc-checkbox--anim-indeterminate-checked",indeterminateToUnchecked:"mdc-checkbox--anim-indeterminate-unchecked"};ariaLabel="";ariaLabelledby=null;ariaDescribedby;ariaExpanded;ariaControls;ariaOwns;_uniqueId;id;get inputId(){return`${this.id||this._uniqueId}-input`}required=!1;labelPosition="after";name=null;change=new S;indeterminateChange=new S;value;disableRipple=!1;_inputElement;_labelElement;tabIndex;color;disabledInteractive;_onTouched=()=>{};_currentAnimationClass="";_currentCheckState=Dt.Init;_controlValueAccessorChangeFn=()=>{};_validatorChangeFn=()=>{};constructor(){c(Oe).load(nn);let e=c(new Xt("tabindex"),{optional:!0});this._options=this._options||ng,this.color=this._options.color||ng.color,this.tabIndex=e==null?0:parseInt(e)||0,this.id=this._uniqueId=c(ye).getId("mat-mdc-checkbox-"),this.disabledInteractive=this._options?.disabledInteractive??!1}ngOnChanges(e){e.required&&this._validatorChangeFn()}ngAfterViewInit(){this._syncIndeterminate(this.indeterminate)}get checked(){return this._checked}set checked(e){e!=this.checked&&(this._checked=e,this._changeDetectorRef.markForCheck())}_checked=!1;get disabled(){return this._disabled}set disabled(e){e!==this.disabled&&(this._disabled=e,this._changeDetectorRef.markForCheck())}_disabled=!1;get indeterminate(){return this._indeterminate()}set indeterminate(e){let i=e!=this._indeterminate();this._indeterminate.set(e),i&&(e?this._transitionCheckState(Dt.Indeterminate):this._transitionCheckState(this.checked?Dt.Checked:Dt.Unchecked),this.indeterminateChange.emit(e)),this._syncIndeterminate(e)}_indeterminate=x(!1);_isRippleDisabled(){return this.disableRipple||this.disabled}_onLabelTextChange(){this._changeDetectorRef.detectChanges()}writeValue(e){this.checked=!!e}registerOnChange(e){this._controlValueAccessorChangeFn=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this.disabled=e}validate(e){return this.required&&e.value!==!0?{required:!0}:null}registerOnValidatorChange(e){this._validatorChangeFn=e}_transitionCheckState(e){let i=this._currentCheckState,r=this._getAnimationTargetElement();if(!(i===e||!r)&&(this._currentAnimationClass&&r.classList.remove(this._currentAnimationClass),this._currentAnimationClass=this._getAnimationClassForCheckStateTransition(i,e),this._currentCheckState=e,this._currentAnimationClass.length>0)){r.classList.add(this._currentAnimationClass);let o=this._currentAnimationClass;this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{r.classList.remove(o)},1e3)})}}_emitChangeEvent(){this._controlValueAccessorChangeFn(this.checked),this.change.emit(this._createChangeEvent(this.checked)),this._inputElement&&(this._inputElement.nativeElement.checked=this.checked)}toggle(){this.checked=!this.checked,this._controlValueAccessorChangeFn(this.checked)}_handleInputClick(){let e=this._options?.clickAction;!this.disabled&&e!=="noop"?(this.indeterminate&&e!=="check"&&Promise.resolve().then(()=>{this._indeterminate.set(!1),this.indeterminateChange.emit(!1)}),this._checked=!this._checked,this._transitionCheckState(this._checked?Dt.Checked:Dt.Unchecked),this._emitChangeEvent()):(this.disabled&&this.disabledInteractive||!this.disabled&&e==="noop")&&(this._inputElement.nativeElement.checked=this.checked,this._inputElement.nativeElement.indeterminate=this.indeterminate)}_onInteractionEvent(e){e.stopPropagation()}_onBlur(){Promise.resolve().then(()=>{this._onTouched(),this._changeDetectorRef.markForCheck()})}_getAnimationClassForCheckStateTransition(e,i){if(this._animationsDisabled)return"";switch(e){case Dt.Init:if(i===Dt.Checked)return this._animationClasses.uncheckedToChecked;if(i==Dt.Indeterminate)return this._checked?this._animationClasses.checkedToIndeterminate:this._animationClasses.uncheckedToIndeterminate;break;case Dt.Unchecked:return i===Dt.Checked?this._animationClasses.uncheckedToChecked:this._animationClasses.uncheckedToIndeterminate;case Dt.Checked:return i===Dt.Unchecked?this._animationClasses.checkedToUnchecked:this._animationClasses.checkedToIndeterminate;case Dt.Indeterminate:return i===Dt.Checked?this._animationClasses.indeterminateToChecked:this._animationClasses.indeterminateToUnchecked}return""}_syncIndeterminate(e){let i=this._inputElement;i&&(i.nativeElement.indeterminate=e)}_onInputClick(){this._handleInputClick()}_onTouchTargetClick(){this._handleInputClick(),this.disabled||this._inputElement.nativeElement.focus()}_preventBubblingFromLabel(e){e.target&&this._labelElement.nativeElement.contains(e.target)&&e.stopPropagation()}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=R({type:t,selectors:[["mat-checkbox"]],viewQuery:function(i,r){if(i&1&&_e(dO,5)(uO,5),i&2){let o;W(o=G())&&(r._inputElement=o.first),W(o=G())&&(r._labelElement=o.first)}},hostAttrs:[1,"mat-mdc-checkbox"],hostVars:16,hostBindings:function(i,r){i&2&&(qe("id",r.id),O("tabindex",null)("aria-label",null)("aria-labelledby",null),rt(r.color?"mat-"+r.color:"mat-accent"),A("_mat-animation-noopable",r._animationsDisabled)("mdc-checkbox--disabled",r.disabled)("mat-mdc-checkbox-disabled",r.disabled)("mat-mdc-checkbox-checked",r.checked)("mat-mdc-checkbox-disabled-interactive",r.disabledInteractive))},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[0,"aria-describedby","ariaDescribedby"],ariaExpanded:[2,"aria-expanded","ariaExpanded",U],ariaControls:[0,"aria-controls","ariaControls"],ariaOwns:[0,"aria-owns","ariaOwns"],id:"id",required:[2,"required","required",U],labelPosition:"labelPosition",name:"name",value:"value",disableRipple:[2,"disableRipple","disableRipple",U],tabIndex:[2,"tabIndex","tabIndex",e=>e==null?void 0:En(e)],color:"color",disabledInteractive:[2,"disabledInteractive","disabledInteractive",U],checked:[2,"checked","checked",U],disabled:[2,"disabled","disabled",U],indeterminate:[2,"indeterminate","indeterminate",U]},outputs:{change:"change",indeterminateChange:"indeterminateChange"},exportAs:["matCheckbox"],features:[Re([{provide:Ur,useExisting:gt(()=>t),multi:!0},{provide:Ko,useExisting:t,multi:!0}]),Be],ngContentSelectors:fO,decls:15,vars:23,consts:[["checkbox",""],["input",""],["label",""],["mat-internal-form-field","",3,"click","labelPosition"],[1,"mdc-checkbox"],["aria-hidden","true",1,"mat-mdc-checkbox-touch-target",3,"click"],["type","checkbox",1,"mdc-checkbox__native-control",3,"blur","click","change","checked","indeterminate","disabled","id","required","tabIndex"],["aria-hidden","true",1,"mdc-checkbox__ripple"],["aria-hidden","true",1,"mdc-checkbox__background"],["focusable","false","viewBox","0 0 24 24",1,"mdc-checkbox__checkmark"],["fill","none","d","M1.73,12.91 8.1,19.28 22.79,4.59",1,"mdc-checkbox__checkmark-path"],[1,"mdc-checkbox__mixedmark"],["mat-ripple","","aria-hidden","true",1,"mat-mdc-checkbox-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled","matRippleCentered"],[1,"mdc-label",3,"for"]],template:function(i,r){if(i&1&&(Se(),m(0,"div",3),w("click",function(a){return r._preventBubblingFromLabel(a)}),m(1,"div",4,0)(3,"div",5),w("click",function(){return r._onTouchTargetClick()}),p(),m(4,"input",6,1),w("blur",function(){return r._onBlur()})("click",function(){return r._onInputClick()})("change",function(a){return r._onInteractionEvent(a)}),p(),B(6,"div",7),m(7,"div",8),_t(),m(8,"svg",9),B(9,"path",10),p(),Jn(),B(10,"div",11),p(),B(11,"div",12),p(),m(12,"label",13,2),oe(14),p()()),i&2){let o=yt(2);E("labelPosition",r.labelPosition),h(4),A("mdc-checkbox--selected",r.checked),E("checked",r.checked)("indeterminate",r.indeterminate)("disabled",r.disabled&&!r.disabledInteractive)("id",r.inputId)("required",r.required)("tabIndex",r.disabled&&!r.disabledInteractive?-1:r.tabIndex),O("aria-label",r.ariaLabel||null)("aria-labelledby",r.ariaLabelledby)("aria-describedby",r.ariaDescribedby)("aria-checked",r.indeterminate?"mixed":null)("aria-controls",r.ariaControls)("aria-disabled",r.disabled&&r.disabledInteractive?!0:null)("aria-expanded",r.ariaExpanded)("aria-owns",r.ariaOwns)("name",r.name)("value",r.value),h(7),E("matRippleTrigger",o)("matRippleDisabled",r.disableRipple||r.disabled)("matRippleCentered",!0),h(),E("for",r.inputId)}},dependencies:[Pi,UD],styles:[`.mdc-checkbox {
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
`],encapsulation:2,changeDetection:0})}return t})(),zD=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=Z({type:t});static \u0275inj=q({imports:[rg,he]})}return t})();var hO=["determinateSpinner"];function gO(t,n){if(t&1&&(_t(),m(0,"svg",11),B(1,"circle",12),p()),t&2){let e=b();O("viewBox",e._viewBox()),h(),Ct("stroke-dasharray",e._strokeCircumference(),"px")("stroke-dashoffset",e._strokeCircumference()/2,"px")("stroke-width",e._circleStrokeWidth(),"%"),O("r",e._circleRadius())}}var _O=new y("mat-progress-spinner-default-options",{providedIn:"root",factory:()=>({diameter:$D})}),$D=100,bO=10,lu=(()=>{class t{_elementRef=c(L);_noopAnimations;get color(){return this._color||this._defaultColor}set color(e){this._color=e}_color;_defaultColor="primary";_determinateCircle;constructor(){let e=c(_O),i=ph(),r=this._elementRef.nativeElement;this._noopAnimations=i==="di-disabled"&&!!e&&!e._forceAnimations,this.mode=r.nodeName.toLowerCase()==="mat-spinner"?"indeterminate":"determinate",!this._noopAnimations&&i==="reduced-motion"&&r.classList.add("mat-progress-spinner-reduced-motion"),e&&(e.color&&(this.color=this._defaultColor=e.color),e.diameter&&(this.diameter=e.diameter),e.strokeWidth&&(this.strokeWidth=e.strokeWidth))}mode;get value(){return this.mode==="determinate"?this._value:0}set value(e){this._value=Math.max(0,Math.min(100,e||0))}_value=0;get diameter(){return this._diameter}set diameter(e){this._diameter=e||0}_diameter=$D;get strokeWidth(){return this._strokeWidth??this.diameter/10}set strokeWidth(e){this._strokeWidth=e||0}_strokeWidth;_circleRadius(){return(this.diameter-bO)/2}_viewBox(){let e=this._circleRadius()*2+this.strokeWidth;return`0 0 ${e} ${e}`}_strokeCircumference(){return 2*Math.PI*this._circleRadius()}_strokeDashOffset(){return this.mode==="determinate"?this._strokeCircumference()*(100-this._value)/100:null}_circleStrokeWidth(){return this.strokeWidth/this.diameter*100}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=R({type:t,selectors:[["mat-progress-spinner"],["mat-spinner"]],viewQuery:function(i,r){if(i&1&&_e(hO,5),i&2){let o;W(o=G())&&(r._determinateCircle=o.first)}},hostAttrs:["role","progressbar","tabindex","-1",1,"mat-mdc-progress-spinner","mdc-circular-progress"],hostVars:18,hostBindings:function(i,r){i&2&&(O("aria-valuemin",0)("aria-valuemax",100)("aria-valuenow",r.mode==="determinate"?r.value:null)("mode",r.mode),rt("mat-"+r.color),Ct("width",r.diameter,"px")("height",r.diameter,"px")("--mat-progress-spinner-size",r.diameter+"px")("--mat-progress-spinner-active-indicator-width",r.diameter+"px"),A("_mat-animation-noopable",r._noopAnimations)("mdc-circular-progress--indeterminate",r.mode==="indeterminate"))},inputs:{color:"color",mode:"mode",value:[2,"value","value",En],diameter:[2,"diameter","diameter",En],strokeWidth:[2,"strokeWidth","strokeWidth",En]},exportAs:["matProgressSpinner"],decls:14,vars:11,consts:[["circle",""],["determinateSpinner",""],["aria-hidden","true",1,"mdc-circular-progress__determinate-container"],["xmlns","http://www.w3.org/2000/svg","focusable","false",1,"mdc-circular-progress__determinate-circle-graphic"],["cx","50%","cy","50%",1,"mdc-circular-progress__determinate-circle"],["aria-hidden","true",1,"mdc-circular-progress__indeterminate-container"],[1,"mdc-circular-progress__spinner-layer"],[1,"mdc-circular-progress__circle-clipper","mdc-circular-progress__circle-left"],[3,"ngTemplateOutlet"],[1,"mdc-circular-progress__gap-patch"],[1,"mdc-circular-progress__circle-clipper","mdc-circular-progress__circle-right"],["xmlns","http://www.w3.org/2000/svg","focusable","false",1,"mdc-circular-progress__indeterminate-circle-graphic"],["cx","50%","cy","50%"]],template:function(i,r){if(i&1&&(it(0,gO,2,8,"ng-template",null,0,os),m(2,"div",2,1),_t(),m(4,"svg",3),B(5,"circle",4),p()(),Jn(),m(6,"div",5)(7,"div",6)(8,"div",7),Mo(9,8),p(),m(10,"div",9),Mo(11,8),p(),m(12,"div",10),Mo(13,8),p()()()),i&2){let o=yt(1);h(4),O("viewBox",r._viewBox()),h(),Ct("stroke-dasharray",r._strokeCircumference(),"px")("stroke-dashoffset",r._strokeDashOffset(),"px")("stroke-width",r._circleStrokeWidth(),"%"),O("r",r._circleRadius()),h(4),E("ngTemplateOutlet",o),h(2),E("ngTemplateOutlet",o),h(2),E("ngTemplateOutlet",o)}},dependencies:[cs],styles:[`.mat-mdc-progress-spinner {
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
`],encapsulation:2,changeDetection:0})}return t})();var cu=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=Z({type:t});static \u0275inj=q({imports:[he]})}return t})();var ta=class t{constructor(n){this.http=n}getSettings(){return this.http.get("/api/settings")}updateSettings(n){return this.http.put("/api/settings",n)}getDefaults(){return this.http.get("/api/settings/defaults")}static \u0275fac=function(e){return new(e||t)(V(at))};static \u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"})};var na=class t{constructor(n){this.http=n}_promptSets=x([]);_activePromptSet=x(null);promptSets=this._promptSets.asReadonly();activePromptSet=this._activePromptSet.asReadonly();loadAll(){return this.http.get("/api/prompt-sets").pipe(kt(n=>this._promptSets.set(n)))}getActiveName(){return this.http.get("/api/prompt-sets/active")}setActive(n){return this.http.put("/api/prompt-sets/active",{name:n}).pipe(kt(()=>{let e=this._promptSets().find(i=>i.name===n)??null;this._activePromptSet.set(e)}))}create(n){return this.http.post("/api/prompt-sets",n).pipe(kt(e=>this._promptSets.update(i=>[...i,e].sort((r,o)=>r.name.localeCompare(o.name)))))}update(n,e){return this.http.put(`/api/prompt-sets/${n}`,e).pipe(kt(i=>{this._promptSets.update(r=>r.map(o=>o.id===n?i:o)),this._activePromptSet()?.id===n&&this._activePromptSet.set(i)}))}delete(n){return this.http.delete(`/api/prompt-sets/${n}`).pipe(kt(()=>this._promptSets.update(e=>e.filter(i=>i.id!==n))))}async init(){let[n,e]=await Promise.all([this.http.get("/api/prompt-sets").toPromise(),this.http.get("/api/prompt-sets/active").toPromise()]),i=n??[];this._promptSets.set(i);let r=i.find(o=>o.name===e?.name)??i[0]??null;this._activePromptSet.set(r)}static \u0275fac=function(e){return new(e||t)(V(at))};static \u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"})};var vO=(t,n)=>n.title,yO=(t,n)=>n.id,CO=(t,n)=>n.key;function DO(t,n){t&1&&(m(0,"div",3),B(1,"mat-spinner",9),m(2,"span"),v(3,"Loading settings\u2026"),p()())}function xO(t,n){t&1&&(m(0,"p",23),v(1,"Loading\u2026"),p())}function wO(t,n){if(t&1){let e=de();m(0,"div",26)(1,"mat-form-field",29)(2,"mat-label"),v(3,"Name"),p(),m(4,"input",30),w("ngModelChange",function(r){j(e);let o=b(4);return H(o.editName.set(r))}),p()(),m(5,"mat-checkbox",31),w("ngModelChange",function(r){j(e);let o=b(4);return H(o.editUseSession.set(r))}),v(6," Use session memory "),p(),m(7,"mat-form-field",32)(8,"mat-label"),v(9,"Recommendation Prompt"),p(),m(10,"textarea",33),w("ngModelChange",function(r){j(e);let o=b(4);return H(o.editPrompt.set(r))}),p()(),m(11,"div",34)(12,"button",7),w("click",function(){j(e);let r=b().$implicit,o=b(3);return H(o.saveEdit(r.id))}),v(13,"Save"),p(),m(14,"button",6),w("click",function(){j(e);let r=b(4);return H(r.cancelEdit())}),v(15,"Cancel"),p()()()}if(t&2){let e=b(4);h(4),E("ngModel",e.editName()),h(),E("ngModel",e.editUseSession()),h(5),E("ngModel",e.editPrompt()),h(2),E("disabled",e.psSaving()),h(2),E("disabled",e.psSaving())}}function EO(t,n){if(t&1){let e=de();m(0,"span",35),v(1),p(),m(2,"mat-icon",36),v(3),p(),m(4,"button",37),w("click",function(){j(e);let r=b().$implicit,o=b(3);return H(o.startEdit(r))}),m(5,"mat-icon"),v(6,"edit"),p()(),m(7,"button",38),w("click",function(){j(e);let r=b().$implicit,o=b(3);return H(o.deletePromptSet(r))}),m(8,"mat-icon"),v(9,"delete"),p()()}if(t&2){let e=b().$implicit;h(),ne(e.name),h(),E("matTooltip",e.useSession?"Session enabled":"No session"),h(),Ae(" ",e.useSession?"memory":"memory_off"," ")}}function MO(t,n){if(t&1&&(m(0,"div",25),k(1,wO,16,5,"div",26)(2,EO,10,3),p()),t&2){let e=n.$implicit,i=b(3);h(),T(i.editingId()===e.id?1:2)}}function IO(t,n){if(t&1){let e=de();m(0,"div",26)(1,"mat-form-field",29)(2,"mat-label"),v(3,"Name"),p(),m(4,"input",39),w("ngModelChange",function(r){j(e);let o=b(3);return H(o.editName.set(r))}),p()(),m(5,"mat-checkbox",40),w("ngModelChange",function(r){j(e);let o=b(3);return H(o.editUseSession.set(r))}),v(6," Use session memory "),p(),m(7,"mat-form-field",32)(8,"mat-label"),v(9,"Recommendation Prompt"),p(),m(10,"textarea",41),w("ngModelChange",function(r){j(e);let o=b(3);return H(o.editPrompt.set(r))}),p()(),m(11,"div",34)(12,"button",7),w("click",function(){j(e);let r=b(3);return H(r.saveNew())}),v(13,"Create"),p(),m(14,"button",6),w("click",function(){j(e);let r=b(3);return H(r.cancelEdit())}),v(15,"Cancel"),p()()()}if(t&2){let e=b(3);h(4),E("ngModel",e.editName()),h(),E("ngModel",e.editUseSession()),h(5),E("ngModel",e.editPrompt()),h(2),E("disabled",e.psSaving()),h(2),E("disabled",e.psSaving())}}function SO(t,n){if(t&1){let e=de();m(0,"button",42),w("click",function(){j(e);let r=b(3);return H(r.startAdd())}),m(1,"mat-icon"),v(2,"add"),p(),v(3," Add Prompt Set "),p()}}function kO(t,n){if(t&1&&(m(0,"p",28),v(1),p()),t&2){let e=b(3);h(),ne(e.psError())}}function TO(t,n){if(t&1&&(lt(0,MO,3,1,"div",25,yO),k(2,IO,16,5,"div",26)(3,SO,4,0,"button",27),k(4,kO,2,1,"p",28)),t&2){let e=b(2);ct(e.promptSets()),h(2),T(e.addingNew()?2:e.editingId()===null?3:-1),h(2),T(e.psError()?4:-1)}}function AO(t,n){if(t&1&&B(0,"textarea",46),t&2){let e=b().$implicit,i=b(3);E("formControlName",e.key)("placeholder",i.placeholderFor(e))}}function RO(t,n){if(t&1){let e=de();m(0,"button",51),w("click",function(){j(e);let r=b(2).$implicit,o=b(3);return H(o.toggleReveal(r.key))}),m(1,"mat-icon"),v(2),p()()}if(t&2){let e=b(2).$implicit,i=b(3);E("matTooltip",i.isRevealed(e.key)?"Hide":"Show"),O("aria-label",i.isRevealed(e.key)?"Hide value":"Show value"),h(2),ne(i.isRevealed(e.key)?"visibility_off":"visibility")}}function OO(t,n){if(t&1&&(B(0,"input",49),k(1,RO,3,3,"button",50)),t&2){let e=b().$implicit,i=b(3);E("type",i.fieldType(e))("formControlName",e.key)("placeholder",i.placeholderFor(e)),h(),T(e.type==="password"?1:-1)}}function NO(t,n){t&1&&(m(0,"mat-hint"),v(1,"Leave blank to use environment variable or default"),p())}function FO(t,n){if(t&1){let e=de();m(0,"button",52),w("click",function(){j(e);let r=b().$implicit,o=b(3);return H(o.resetField(r.key))}),m(1,"mat-icon"),v(2,"restart_alt"),p()()}if(t&2){let e=b().$implicit;O("aria-label","Reset "+e.label+" to default")}}function PO(t,n){if(t&1){let e=de();m(0,"button",53),w("click",function(){j(e);let r=b().$implicit,o=b(3);return H(o.clearField(r.key))}),m(1,"mat-icon"),v(2,"clear_all"),p()()}if(t&2){let e=b().$implicit;O("aria-label","Clear "+e.label)}}function LO(t,n){if(t&1&&(m(0,"div",44)(1,"mat-form-field",45)(2,"mat-label"),v(3),p(),k(4,AO,1,2,"textarea",46)(5,OO,2,4),k(6,NO,2,0,"mat-hint"),p(),k(7,FO,3,1,"button",47),k(8,PO,3,1,"button",48),p()),t&2){let e=n.$implicit;A("field-row--resettable",!e.isSecret),h(3),ne(e.label),h(),T(e.type==="textarea"?4:5),h(2),T(e.clearable?-1:6),h(),T(!e.isSecret&&!e.clearable?7:-1),h(),T(e.clearable?8:-1)}}function VO(t,n){if(t&1&&(m(0,"section",10)(1,"h3",11),v(2),p(),lt(3,LO,9,7,"div",43,CO),p()),t&2){let e=n.$implicit;h(2),ne(e.title),h(),ct(e.fields)}}function BO(t,n){if(t&1){let e=de();m(0,"section",10)(1,"h3",11),v(2,"Active Voice"),p(),m(3,"mat-button-toggle-group",12),w("change",function(r){j(e);let o=b();return H(o.selectProvider(r.value))}),m(4,"mat-button-toggle",13),B(5,"img",14),v(6),p(),m(7,"mat-button-toggle",15),B(8,"img",16),v(9),p(),m(10,"mat-button-toggle",17),B(11,"img",18),v(12),p()()(),m(13,"section",10)(14,"h3",11),v(15,"Environmental Context"),p(),m(16,"p",19),v(17," When enabled, your location and/or the current weather are included with each recommendation request so the AI can factor your surroundings into its suggestions. "),p(),m(18,"div",20)(19,"mat-checkbox",21),w("change",function(r){j(e);let o=b();return H(o.useLocation.set(r.checked))}),v(20," Use User Location "),p()(),m(21,"div",20)(22,"mat-checkbox",22),w("change",function(r){j(e);let o=b();return H(o.useWeather.set(r.checked))}),v(23," Use Current Weather "),p()()(),m(24,"section",10)(25,"h3",11),v(26,"Prompt Sets"),p(),m(27,"p",19),v(28,"Each prompt set carries its own recommendation prompt and conversation history."),p(),k(29,xO,2,0,"p",23)(30,TO,5,2),p(),m(31,"form",24),w("submit",function(r){return r.preventDefault()}),lt(32,VO,5,1,"section",10,vO),p()}if(t&2){let e=b();h(3),E("value",e.provider()),h(3),Ae(" ",e.modelLabel("OLLAMA_WHISPER_MODEL","llama3.1:8b")," "),h(3),Ae(" ",e.modelLabel("OLLAMA_SHOUT_MODEL","gemma4:e4b")," "),h(3),Ae(" ",e.modelLabel("GEMINI_MODEL","gemini-2.5-pro")," "),h(7),E("checked",e.useLocation()),h(3),E("checked",e.useWeather()),h(7),T(e.psLoading()?29:30),h(2),E("formGroup",e.form),h(),ct(e.groups)}}function jO(t,n){if(t&1&&(m(0,"p",4),v(1),p()),t&2){let e=b();h(),ne(e.saveError())}}function HO(t,n){t&1&&B(0,"mat-spinner",8)}var qD=[{title:"Gemini (Cosmic Voice)",fields:[{key:"GEMINI_API_KEY",label:"API Key",type:"password",placeholder:"Gemini API key",isSecret:!0},{key:"GEMINI_MODEL",label:"Model",type:"text"},{key:"GEMINI_BASE_URL",label:"Base URL",type:"text"}]},{title:"Ollama (Inner Voices)",fields:[{key:"OLLAMA_BASE_URL",label:"Base URL",type:"text"},{key:"OLLAMA_WHISPER_MODEL",label:"Inner Whisper model",type:"text"},{key:"OLLAMA_SHOUT_MODEL",label:"Inner Shout model",type:"text"}]},{title:"Last.fm (Album art)",fields:[{key:"LASTFM_API_KEY",label:"API Key",type:"password",placeholder:"Last.fm read API key",isSecret:!0},{key:"LASTFM_BASE_URL",label:"Base URL",type:"text"}]},{title:"Clementine",fields:[{key:"CLEMENTINE_DB_PATH",label:"Database path",type:"text",placeholder:"Path to clementine.db copy"},{key:"CLEMENTINE_EXE_PATH",label:"Executable path",type:"text"},{key:"CLEMENTINE_MATCH_THRESHOLD",label:"Match threshold",type:"number"}]},{title:"Recommendations",fields:[{key:"RECOMMENDATION_MIN_TRACKS",label:"Min tracks",type:"number"},{key:"RECOMMENDATION_MAX_TRACKS",label:"Max tracks",type:"number"},{key:"RECOMMENDATION_SUGGESTION_CACHE_MINUTES",label:"Suggestion cache (min)",type:"number"},{key:"RECOMMENDATION_HISTORY_MAX_ROWS",label:"History cap (rows)",type:"number"}]},{title:"Session memory",fields:[{key:"SESSION_MEMORY_SIZE",label:"Memory size (replies)",type:"number"},{key:"SESSION_DEFAULT_TRACK_DURATION_SECONDS",label:"Default track duration (s)",type:"number"}]},{title:"AI Settings",fields:[{key:"DIARY_SYSTEM_INSTRUCTION",label:"Diary system instruction",type:"textarea"},{key:"MOOD_ANNOTATION_POETIC",label:"Mood annotation: Poetic",type:"text"},{key:"MOOD_ANNOTATION_HUMOROUS",label:"Mood annotation: Humorous",type:"text"},{key:"MOOD_ANNOTATION_COSMIC",label:"Mood annotation: Cosmic",type:"text"},{key:"MOOD_ANNOTATION_MINIMALIST",label:"Mood annotation: Minimalist",type:"text"},{key:"MOOD_ANNOTATION_ROMANTIC",label:"Mood annotation: Romantic",type:"text"},{key:"MOOD_ANNOTATION_CHAOTIC",label:"Mood annotation: Chaotic",type:"text"},{key:"MOOD_ANNOTATION_NOIR",label:"Mood annotation: Noir",type:"text"},{key:"MOOD_ANNOTATION_PSYCHEDELIC",label:"Mood annotation: Psychedelic",type:"text"}]},{title:"Personalization",fields:[{key:"AVOIDED_ARTISTS",label:"Avoid these artists (one per line)",type:"textarea",placeholder:"Enter artist names, one per line\u2026",clearable:!0}]}],ZD="reco-provider",du=class t{constructor(n,e,i,r){this.fb=n;this.settingsService=e;this.promptSetService=i;this.dialogRef=r}form;loading=x(!0);saving=x(!1);saveError=x(null);groups=qD;defaults=x({});provider=x(localStorage.getItem(ZD)??"gemini");useLocation=x(!1);useWeather=x(!1);revealed=x({});psLoading=x(!1);psSaving=x(!1);psError=x(null);editingId=x(null);addingNew=x(!1);editName=x("");editUseSession=x(!0);editPrompt=x("");ngOnInit(){let n={};for(let e of qD)for(let i of e.fields)n[i.key]="";this.form=this.fb.group(n),this.psLoading.set(!0),this.promptSetService.loadAll().subscribe({error:()=>{}}),rr({settings:this.settingsService.getSettings(),defaults:this.settingsService.getDefaults()}).subscribe({next:({settings:e,defaults:i})=>{this.defaults.set(i);for(let r of e.settings)this.form.contains(r.key)&&this.form.get(r.key)?.setValue(r.value??""),r.key==="USE_USER_LOCATION"&&this.useLocation.set(r.value==="true"),r.key==="USE_CURRENT_WEATHER"&&this.useWeather.set(r.value==="true");this.loading.set(!1),this.psLoading.set(!1)},error:()=>{this.loading.set(!1),this.psLoading.set(!1)}})}selectProvider(n){this.provider.set(n),localStorage.setItem(ZD,n)}modelLabel(n,e){return this.form.get(n)?.value?.trim()||e}isRevealed(n){return this.revealed()[n]??!1}toggleReveal(n){this.revealed.update(e=>se(I({},e),{[n]:!e[n]}))}fieldType(n){return n.type==="password"?this.isRevealed(n.key)?"text":"password":"text"}placeholderFor(n){return this.defaults()[n.key]??n.placeholder??""}resetField(n){let e=this.defaults()[n];e!==void 0&&this.form.get(n)?.setValue(e)}clearField(n){this.form.get(n)?.setValue("")}get promptSets(){return this.promptSetService.promptSets}startEdit(n){this.editingId.set(n.id),this.editName.set(n.name),this.editUseSession.set(n.useSession),this.editPrompt.set(n.recommendationPrompt),this.addingNew.set(!1),this.psError.set(null)}cancelEdit(){this.editingId.set(null),this.addingNew.set(!1),this.psError.set(null)}startAdd(){this.addingNew.set(!0),this.editingId.set(null),this.editName.set(""),this.editUseSession.set(!0),this.editPrompt.set(""),this.psError.set(null)}saveEdit(n){let e=this.editName().trim();if(!e){this.psError.set("Name is required.");return}this.psSaving.set(!0),this.psError.set(null),this.promptSetService.update(n,{name:e,useSession:this.editUseSession(),recommendationPrompt:this.editPrompt()}).subscribe({next:()=>{this.psSaving.set(!1),this.editingId.set(null)},error:i=>{this.psSaving.set(!1),this.psError.set(i?.error?.error??"Could not save.")}})}saveNew(){let n=this.editName().trim();if(!n){this.psError.set("Name is required.");return}this.psSaving.set(!0),this.psError.set(null),this.promptSetService.create({name:n,useSession:this.editUseSession(),recommendationPrompt:this.editPrompt()}).subscribe({next:()=>{this.psSaving.set(!1),this.addingNew.set(!1)},error:e=>{this.psSaving.set(!1),this.psError.set(e?.error?.error??"Could not create.")}})}deletePromptSet(n){confirm(`Delete prompt set "${n.name}"? This cannot be undone.`)&&this.promptSetService.delete(n.id).subscribe({error:()=>{}})}save(){if(this.saving())return;this.saving.set(!0),this.saveError.set(null);let n={},e=this.form.value;for(let i of Object.keys(e))n[i]=e[i].trim()===""?null:e[i].trim();n.USE_USER_LOCATION=this.useLocation()?"true":"false",n.USE_CURRENT_WEATHER=this.useWeather()?"true":"false",this.settingsService.updateSettings({settings:n}).subscribe({next:()=>{this.saving.set(!1),this.dialogRef.close(!0)},error:()=>{this.saving.set(!1),this.saveError.set("Could not save settings. Please try again.")}})}cancel(){this.dialogRef.close(!1)}static \u0275fac=function(e){return new(e||t)(J(MD),J(ta),J(na),J(Ui))};static \u0275cmp=R({type:t,selectors:[["app-settings-modal"]],decls:14,vars:5,consts:[["mat-dialog-title","",1,"settings-title"],["aria-hidden","true"],[1,"settings-content"],["role","status",1,"settings-loading"],["role","alert",1,"settings-error"],["align","end",1,"settings-actions"],["mat-button","","type","button",3,"click","disabled"],["mat-flat-button","","color","primary","type","button",3,"click","disabled"],["diameter","18",1,"btn-spinner"],["diameter","36"],[1,"settings-group"],[1,"settings-group-title"],["aria-label","AI provider",1,"provider-toggle",3,"change","value"],["value","inner-whisper","aria-label","Inner Whisper"],["src","/icons/llama3-logo.png","alt","","aria-hidden","true",1,"provider-icon"],["value","inner-shout","aria-label","Inner Shout"],["src","/icons/gemma4.png","alt","","aria-hidden","true",1,"provider-icon"],["value","gemini","aria-label","Cosmic Voice"],["src","/icons/gemini.svg","alt","","aria-hidden","true",1,"provider-icon"],[1,"settings-group-hint"],[1,"checkbox-row"],["aria-label","Send user location to AI",3,"change","checked"],["aria-label","Send current weather to AI",3,"change","checked"],[1,"ps-hint"],[1,"settings-form",3,"submit","formGroup"],[1,"ps-row"],[1,"ps-form"],["mat-stroked-button","","type","button",1,"ps-add-btn"],["role","alert",1,"ps-error"],["appearance","outline","floatLabel","always",1,"ps-name-field"],["matInput","","name","psEditName",3,"ngModelChange","ngModel"],["name","psEditSession",3,"ngModelChange","ngModel"],["appearance","outline","floatLabel","always",1,"ps-prompt-field"],["matInput","","name","psEditPrompt","rows","6","placeholder","You are an expert music discovery assistant\u2026",1,"settings-textarea",3,"ngModelChange","ngModel"],[1,"ps-form-actions"],[1,"ps-name"],[1,"ps-session-icon",3,"matTooltip"],["mat-icon-button","","type","button","matTooltip","Edit","aria-label","Edit prompt set",3,"click"],["mat-icon-button","","type","button","matTooltip","Delete","aria-label","Delete prompt set",3,"click"],["matInput","","name","psNewName",3,"ngModelChange","ngModel"],["name","psNewSession",3,"ngModelChange","ngModel"],["matInput","","name","psNewPrompt","rows","6","placeholder","You are an expert music discovery assistant\u2026",1,"settings-textarea",3,"ngModelChange","ngModel"],["mat-stroked-button","","type","button",1,"ps-add-btn",3,"click"],[1,"field-row",3,"field-row--resettable"],[1,"field-row"],["appearance","outline","floatLabel","always",1,"settings-field"],["matInput","","rows","5","autocomplete","off","spellcheck","false",1,"settings-textarea",3,"formControlName","placeholder"],["mat-icon-button","","type","button","matTooltip","Reset to default",1,"reset-field-btn"],["mat-icon-button","","type","button","matTooltip","Clear all",1,"reset-field-btn"],["matInput","","autocomplete","off","spellcheck","false",3,"type","formControlName","placeholder"],["matSuffix","","mat-icon-button","","type","button",3,"matTooltip"],["matSuffix","","mat-icon-button","","type","button",3,"click","matTooltip"],["mat-icon-button","","type","button","matTooltip","Reset to default",1,"reset-field-btn",3,"click"],["mat-icon-button","","type","button","matTooltip","Clear all",1,"reset-field-btn",3,"click"]],template:function(e,i){e&1&&(m(0,"h2",0)(1,"mat-icon",1),v(2,"settings"),p(),v(3,` Settings
`),p(),m(4,"mat-dialog-content",2),k(5,DO,4,0,"div",3)(6,BO,34,8),k(7,jO,2,1,"p",4),p(),m(8,"mat-dialog-actions",5)(9,"button",6),w("click",function(){return i.cancel()}),v(10,"Cancel"),p(),m(11,"button",7),w("click",function(){return i.save()}),k(12,HO,1,0,"mat-spinner",8),v(13," Save "),p()()),e&2&&(h(5),T(i.loading()?5:6),h(2),T(i.saveError()?7:-1),h(2),E("disabled",i.saving()),h(2),E("disabled",i.loading()||i.saving()),h(),T(i.saving()?12:-1))},dependencies:[ID,xD,Zd,mD,pD,Wh,SD,zr,Gh,Ht,An,rn,HD,tg,su,zD,rg,Uo,Pd,EC,Ld,ui,zo,As,Rs,Nh,cn,ln,tu,eu,cu,lu,ea,pi],styles:[".settings-title[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;font-family:var(--reco-font);font-size:1.1rem;color:var(--reco-primary)}.settings-title[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:1.2rem;width:1.2rem;height:1.2rem}.settings-content[_ngcontent-%COMP%]{min-width:520px;max-width:680px;max-height:72vh;padding:8px 24px}.settings-loading[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;gap:12px;padding:32px 0;color:var(--reco-text-muted);font-size:.9rem}.settings-form[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:20px}.settings-group-hint[_ngcontent-%COMP%]{font-size:.8rem;color:var(--reco-text-muted);margin:0 0 4px;line-height:1.4}.checkbox-row[_ngcontent-%COMP%]{padding:2px 0}.provider-toggle[_ngcontent-%COMP%]{width:100%}.provider-toggle[_ngcontent-%COMP%]   mat-button-toggle[_ngcontent-%COMP%]{flex:1;font-size:.8rem}.provider-toggle[_ngcontent-%COMP%]   .provider-icon[_ngcontent-%COMP%]{width:16px;height:16px;vertical-align:middle;margin-right:4px}.settings-group[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:8px}.settings-group-title[_ngcontent-%COMP%]{font-family:var(--reco-font);font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--reco-text-muted);margin:0 0 4px;padding-bottom:4px;border-bottom:1px solid var(--reco-border)}.settings-field[_ngcontent-%COMP%]{width:100%}.settings-textarea[_ngcontent-%COMP%]{font-family:var(--reco-font-bubble, monospace);font-size:.8rem;line-height:1.5;resize:vertical;min-height:96px}.field-row[_ngcontent-%COMP%]{display:flex;align-items:flex-start;gap:4px}.field-row--resettable[_ngcontent-%COMP%]   .settings-field[_ngcontent-%COMP%]{flex:1}.reset-field-btn[_ngcontent-%COMP%]{flex-shrink:0;margin-top:6px;color:var(--reco-text-muted);--mdc-icon-button-state-layer-size: 28px;--mdc-icon-button-icon-size: 18px}.reset-field-btn[_ngcontent-%COMP%]:hover{color:var(--reco-primary)}.ps-row[_ngcontent-%COMP%]{display:flex;align-items:center;gap:4px;padding:4px 0;border-bottom:1px solid var(--reco-border)}.ps-name[_ngcontent-%COMP%]{flex:1;font-size:.88rem;font-family:var(--reco-font);color:var(--reco-text);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ps-session-icon[_ngcontent-%COMP%]{font-size:1rem;width:1rem;height:1rem;color:var(--reco-text-muted);flex-shrink:0}.ps-form[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:8px;padding:8px 0;width:100%}.ps-name-field[_ngcontent-%COMP%], .ps-prompt-field[_ngcontent-%COMP%]{width:100%}.ps-form-actions[_ngcontent-%COMP%]{display:flex;gap:8px}.ps-add-btn[_ngcontent-%COMP%]{align-self:flex-start;margin-top:4px;font-size:.82rem}.ps-hint[_ngcontent-%COMP%]{font-size:.82rem;color:var(--reco-text-muted);margin:0}.ps-error[_ngcontent-%COMP%]{color:var(--reco-error);font-size:.82rem;margin:4px 0 0}.settings-actions[_ngcontent-%COMP%]{padding:12px 24px 16px;gap:8px}.settings-error[_ngcontent-%COMP%]{color:var(--reco-error);font-size:.85rem;margin:8px 0 0}.btn-spinner[_ngcontent-%COMP%]{display:inline-block;margin-right:6px;vertical-align:middle}"]})};var og=new y("MAT_DATE_LOCALE",{providedIn:"root",factory:()=>c(ko)}),ia="Method not implemented",Rt=class{locale;_localeChanges=new M;localeChanges=this._localeChanges;setTime(n,e,i,r){throw new Error(ia)}getHours(n){throw new Error(ia)}getMinutes(n){throw new Error(ia)}getSeconds(n){throw new Error(ia)}parseTime(n,e){throw new Error(ia)}addSeconds(n,e){throw new Error(ia)}getValidDateOrNull(n){return this.isDateInstance(n)&&this.isValid(n)?n:null}deserialize(n){return n==null||this.isDateInstance(n)&&this.isValid(n)?n:this.invalid()}setLocale(n){this.locale=n,this._localeChanges.next()}compareDate(n,e){return this.getYear(n)-this.getYear(e)||this.getMonth(n)-this.getMonth(e)||this.getDate(n)-this.getDate(e)}compareTime(n,e){return this.getHours(n)-this.getHours(e)||this.getMinutes(n)-this.getMinutes(e)||this.getSeconds(n)-this.getSeconds(e)}sameDate(n,e){if(n&&e){let i=this.isValid(n),r=this.isValid(e);return i&&r?!this.compareDate(n,e):i==r}return n==e}sameTime(n,e){if(n&&e){let i=this.isValid(n),r=this.isValid(e);return i&&r?!this.compareTime(n,e):i==r}return n==e}clampDate(n,e,i){return e&&this.compareDate(n,e)<0?e:i&&this.compareDate(n,i)>0?i:n}},Gr=new y("mat-date-formats");var UO=["mat-calendar-body",""];function zO(t,n){return this._trackRow(n)}var tx=(t,n)=>n.id;function $O(t,n){if(t&1&&(Pe(0,"tr",0)(1,"td",3),v(2),je()()),t&2){let e=b();h(),Ct("padding-top",e._cellPadding)("padding-bottom",e._cellPadding),O("colspan",e.numCols),h(),Ae(" ",e.label," ")}}function WO(t,n){if(t&1&&(Pe(0,"td",3),v(1),je()),t&2){let e=b(2);Ct("padding-top",e._cellPadding)("padding-bottom",e._cellPadding),O("colspan",e._firstRowOffset),h(),Ae(" ",e._firstRowOffset>=e.labelMinRequiredCells?e.label:""," ")}}function GO(t,n){if(t&1){let e=de();Pe(0,"td",6)(1,"button",7),Ri("click",function(r){let o=j(e).$implicit,a=b(2);return H(a._cellClicked(o,r))})("focus",function(r){let o=j(e).$implicit,a=b(2);return H(a._emitActiveDateChange(o,r))}),Pe(2,"span",8),v(3),je(),vt(4,"span",9),je()()}if(t&2){let e=n.$implicit,i=n.$index,r=b().$index,o=b();Ct("width",o._cellWidth)("padding-top",o._cellPadding)("padding-bottom",o._cellPadding),O("data-mat-row",r)("data-mat-col",i),h(),rt(e.cssClasses),A("mat-calendar-body-disabled",!e.enabled)("mat-calendar-body-active",o._isActiveCell(r,i))("mat-calendar-body-range-start",o._isRangeStart(e.compareValue))("mat-calendar-body-range-end",o._isRangeEnd(e.compareValue))("mat-calendar-body-in-range",o._isInRange(e.compareValue))("mat-calendar-body-comparison-bridge-start",o._isComparisonBridgeStart(e.compareValue,r,i))("mat-calendar-body-comparison-bridge-end",o._isComparisonBridgeEnd(e.compareValue,r,i))("mat-calendar-body-comparison-start",o._isComparisonStart(e.compareValue))("mat-calendar-body-comparison-end",o._isComparisonEnd(e.compareValue))("mat-calendar-body-in-comparison-range",o._isInComparisonRange(e.compareValue))("mat-calendar-body-preview-start",o._isPreviewStart(e.compareValue))("mat-calendar-body-preview-end",o._isPreviewEnd(e.compareValue))("mat-calendar-body-in-preview",o._isInPreview(e.compareValue)),qe("tabIndex",o._isActiveCell(r,i)?0:-1),O("aria-label",e.ariaLabel)("aria-disabled",!e.enabled||null)("aria-pressed",o._isSelected(e.compareValue))("aria-current",o.todayValue===e.compareValue?"date":null)("aria-describedby",o._getDescribedby(e.compareValue)),h(),A("mat-calendar-body-selected",o._isSelected(e.compareValue))("mat-calendar-body-comparison-identical",o._isComparisonIdentical(e.compareValue))("mat-calendar-body-today",o.todayValue===e.compareValue),h(),Ae(" ",e.displayValue," ")}}function YO(t,n){if(t&1&&(Pe(0,"tr",1),k(1,WO,2,6,"td",4),lt(2,GO,5,49,"td",5,tx),je()),t&2){let e=n.$implicit,i=n.$index,r=b();h(),T(i===0&&r._firstRowOffset?1:-1),h(),ct(e)}}function qO(t,n){if(t&1&&(m(0,"th",2)(1,"span",6),v(2),p(),m(3,"span",3),v(4),p()()),t&2){let e=n.$implicit;h(2),ne(e.long),h(2),ne(e.narrow)}}var ZO=["*"];function KO(t,n){}function QO(t,n){if(t&1){let e=de();m(0,"mat-month-view",4),So("activeDateChange",function(r){j(e);let o=b();return rs(o.activeDate,r)||(o.activeDate=r),H(r)}),w("_userSelection",function(r){j(e);let o=b();return H(o._dateSelected(r))})("dragStarted",function(r){j(e);let o=b();return H(o._dragStarted(r))})("dragEnded",function(r){j(e);let o=b();return H(o._dragEnded(r))}),p()}if(t&2){let e=b();Io("activeDate",e.activeDate),E("selected",e.selected)("dateFilter",e.dateFilter)("maxDate",e.maxDate)("minDate",e.minDate)("dateClass",e.dateClass)("comparisonStart",e.comparisonStart)("comparisonEnd",e.comparisonEnd)("startDateAccessibleName",e.startDateAccessibleName)("endDateAccessibleName",e.endDateAccessibleName)("activeDrag",e._activeDrag)}}function XO(t,n){if(t&1){let e=de();m(0,"mat-year-view",5),So("activeDateChange",function(r){j(e);let o=b();return rs(o.activeDate,r)||(o.activeDate=r),H(r)}),w("monthSelected",function(r){j(e);let o=b();return H(o._monthSelectedInYearView(r))})("selectedChange",function(r){j(e);let o=b();return H(o._goToDateInView(r,"month"))}),p()}if(t&2){let e=b();Io("activeDate",e.activeDate),E("selected",e.selected)("dateFilter",e.dateFilter)("maxDate",e.maxDate)("minDate",e.minDate)("dateClass",e.dateClass)}}function JO(t,n){if(t&1){let e=de();m(0,"mat-multi-year-view",6),So("activeDateChange",function(r){j(e);let o=b();return rs(o.activeDate,r)||(o.activeDate=r),H(r)}),w("yearSelected",function(r){j(e);let o=b();return H(o._yearSelectedInMultiYearView(r))})("selectedChange",function(r){j(e);let o=b();return H(o._goToDateInView(r,"year"))}),p()}if(t&2){let e=b();Io("activeDate",e.activeDate),E("selected",e.selected)("dateFilter",e.dateFilter)("maxDate",e.maxDate)("minDate",e.minDate)("dateClass",e.dateClass)}}function e1(t,n){}var t1=["button"],n1=[[["","matDatepickerToggleIcon",""]]],i1=["[matDatepickerToggleIcon]"];function r1(t,n){t&1&&(_t(),m(0,"svg",2),B(1,"path",3),p())}var oa=(()=>{class t{changes=new M;calendarLabel="Calendar";openCalendarLabel="Open calendar";closeCalendarLabel="Close calendar";prevMonthLabel="Previous month";nextMonthLabel="Next month";prevYearLabel="Previous year";nextYearLabel="Next year";prevMultiYearLabel="Previous 24 years";nextMultiYearLabel="Next 24 years";switchToMonthViewLabel="Choose date";switchToMultiYearViewLabel="Choose month and year";startDateLabel="Start date";endDateLabel="End date";comparisonDateLabel="Comparison range";formatYearRange(e,i){return`${e} \u2013 ${i}`}formatYearRangeLabel(e,i){return`${e} to ${i}`}static \u0275fac=function(i){return new(i||t)};static \u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),o1=0,Ws=class{value;displayValue;ariaLabel;enabled;compareValue;rawValue;id=o1++;cssClasses;constructor(n,e,i,r,o,a=n,s){this.value=n,this.displayValue=e,this.ariaLabel=i,this.enabled=r,this.compareValue=a,this.rawValue=s,this.cssClasses=o instanceof Set?Array.from(o):o}},a1={passive:!1,capture:!0},uu={passive:!0,capture:!0},KD={passive:!0},ra=(()=>{class t{_elementRef=c(L);_ngZone=c(P);_platform=c(pe);_intl=c(oa);_eventCleanups;_skipNextFocus=!1;_focusActiveCellAfterViewChecked=!1;label;rows;todayValue;startValue;endValue;labelMinRequiredCells;numCols=7;activeCell=0;ngAfterViewChecked(){this._focusActiveCellAfterViewChecked&&(this._focusActiveCell(),this._focusActiveCellAfterViewChecked=!1)}isRange=!1;cellAspectRatio=1;comparisonStart=null;comparisonEnd=null;previewStart=null;previewEnd=null;startDateAccessibleName=null;endDateAccessibleName=null;selectedValueChange=new S;previewChange=new S;activeDateChange=new S;dragStarted=new S;dragEnded=new S;_firstRowOffset;_cellPadding;_cellWidth;_startDateLabelId;_endDateLabelId;_comparisonStartDateLabelId;_comparisonEndDateLabelId;_didDragSinceMouseDown=!1;_injector=c(Y);comparisonDateAccessibleName=this._intl.comparisonDateLabel;_trackRow=e=>e;constructor(){let e=c(Te),i=c(ye);this._startDateLabelId=i.getId("mat-calendar-body-start-"),this._endDateLabelId=i.getId("mat-calendar-body-end-"),this._comparisonStartDateLabelId=i.getId("mat-calendar-body-comparison-start-"),this._comparisonEndDateLabelId=i.getId("mat-calendar-body-comparison-end-"),c(Oe).load(nn),this._ngZone.runOutsideAngular(()=>{let r=this._elementRef.nativeElement,o=[e.listen(r,"touchmove",this._touchmoveHandler,a1),e.listen(r,"mouseenter",this._enterHandler,uu),e.listen(r,"focus",this._enterHandler,uu),e.listen(r,"mouseleave",this._leaveHandler,uu),e.listen(r,"blur",this._leaveHandler,uu),e.listen(r,"mousedown",this._mousedownHandler,KD),e.listen(r,"touchstart",this._mousedownHandler,KD)];this._platform.isBrowser&&o.push(e.listen("window","mouseup",this._mouseupHandler),e.listen("window","touchend",this._touchendHandler)),this._eventCleanups=o})}_cellClicked(e,i){this._didDragSinceMouseDown||e.enabled&&this.selectedValueChange.emit({value:e.value,event:i})}_emitActiveDateChange(e,i){e.enabled&&this.activeDateChange.emit({value:e.value,event:i})}_isSelected(e){return this.startValue===e||this.endValue===e}ngOnChanges(e){let i=e.numCols,{rows:r,numCols:o}=this;(e.rows||i)&&(this._firstRowOffset=r&&r.length&&r[0].length?o-r[0].length:0),(e.cellAspectRatio||i||!this._cellPadding)&&(this._cellPadding=`${50*this.cellAspectRatio/o}%`),(i||!this._cellWidth)&&(this._cellWidth=`${100/o}%`)}ngOnDestroy(){this._eventCleanups.forEach(e=>e())}_isActiveCell(e,i){let r=e*this.numCols+i;return e&&(r-=this._firstRowOffset),r==this.activeCell}_focusActiveCell(e=!0){Qe(()=>{setTimeout(()=>{let i=this._elementRef.nativeElement.querySelector(".mat-calendar-body-active");i&&(e||(this._skipNextFocus=!0),i.focus())})},{injector:this._injector})}_scheduleFocusActiveCellAfterViewChecked(){this._focusActiveCellAfterViewChecked=!0}_isRangeStart(e){return lg(e,this.startValue,this.endValue)}_isRangeEnd(e){return cg(e,this.startValue,this.endValue)}_isInRange(e){return dg(e,this.startValue,this.endValue,this.isRange)}_isComparisonStart(e){return lg(e,this.comparisonStart,this.comparisonEnd)}_isComparisonBridgeStart(e,i,r){if(!this._isComparisonStart(e)||this._isRangeStart(e)||!this._isInRange(e))return!1;let o=this.rows[i][r-1];if(!o){let a=this.rows[i-1];o=a&&a[a.length-1]}return o&&!this._isRangeEnd(o.compareValue)}_isComparisonBridgeEnd(e,i,r){if(!this._isComparisonEnd(e)||this._isRangeEnd(e)||!this._isInRange(e))return!1;let o=this.rows[i][r+1];if(!o){let a=this.rows[i+1];o=a&&a[0]}return o&&!this._isRangeStart(o.compareValue)}_isComparisonEnd(e){return cg(e,this.comparisonStart,this.comparisonEnd)}_isInComparisonRange(e){return dg(e,this.comparisonStart,this.comparisonEnd,this.isRange)}_isComparisonIdentical(e){return this.comparisonStart===this.comparisonEnd&&e===this.comparisonStart}_isPreviewStart(e){return lg(e,this.previewStart,this.previewEnd)}_isPreviewEnd(e){return cg(e,this.previewStart,this.previewEnd)}_isInPreview(e){return dg(e,this.previewStart,this.previewEnd,this.isRange)}_getDescribedby(e){if(!this.isRange)return null;if(this.startValue===e&&this.endValue===e)return`${this._startDateLabelId} ${this._endDateLabelId}`;if(this.startValue===e)return this._startDateLabelId;if(this.endValue===e)return this._endDateLabelId;if(this.comparisonStart!==null&&this.comparisonEnd!==null){if(e===this.comparisonStart&&e===this.comparisonEnd)return`${this._comparisonStartDateLabelId} ${this._comparisonEndDateLabelId}`;if(e===this.comparisonStart)return this._comparisonStartDateLabelId;if(e===this.comparisonEnd)return this._comparisonEndDateLabelId}return null}_enterHandler=e=>{if(this._skipNextFocus&&e.type==="focus"){this._skipNextFocus=!1;return}if(e.target&&this.isRange){let i=this._getCellFromElement(e.target);i&&this._ngZone.run(()=>this.previewChange.emit({value:i.enabled?i:null,event:e}))}};_touchmoveHandler=e=>{if(!this.isRange)return;let i=QD(e),r=i?this._getCellFromElement(i):null;i!==e.target&&(this._didDragSinceMouseDown=!0),sg(e.target)&&e.preventDefault(),this._ngZone.run(()=>this.previewChange.emit({value:r?.enabled?r:null,event:e}))};_leaveHandler=e=>{this.previewEnd!==null&&this.isRange&&(e.type!=="blur"&&(this._didDragSinceMouseDown=!0),e.target&&this._getCellFromElement(e.target)&&!(e.relatedTarget&&this._getCellFromElement(e.relatedTarget))&&this._ngZone.run(()=>this.previewChange.emit({value:null,event:e})))};_mousedownHandler=e=>{if(!this.isRange)return;this._didDragSinceMouseDown=!1;let i=e.target&&this._getCellFromElement(e.target);!i||!this._isInRange(i.compareValue)||this._ngZone.run(()=>{this.dragStarted.emit({value:i.rawValue,event:e})})};_mouseupHandler=e=>{if(!this.isRange)return;let i=sg(e.target);if(!i){this._ngZone.run(()=>{this.dragEnded.emit({value:null,event:e})});return}i.closest(".mat-calendar-body")===this._elementRef.nativeElement&&this._ngZone.run(()=>{let r=this._getCellFromElement(i);this.dragEnded.emit({value:r?.rawValue??null,event:e})})};_touchendHandler=e=>{let i=QD(e);i&&this._mouseupHandler({target:i})};_getCellFromElement(e){let i=sg(e);if(i){let r=i.getAttribute("data-mat-row"),o=i.getAttribute("data-mat-col");if(r&&o)return this.rows[parseInt(r)]?.[parseInt(o)]||null}return null}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=R({type:t,selectors:[["","mat-calendar-body",""]],hostAttrs:[1,"mat-calendar-body"],inputs:{label:"label",rows:"rows",todayValue:"todayValue",startValue:"startValue",endValue:"endValue",labelMinRequiredCells:"labelMinRequiredCells",numCols:"numCols",activeCell:"activeCell",isRange:"isRange",cellAspectRatio:"cellAspectRatio",comparisonStart:"comparisonStart",comparisonEnd:"comparisonEnd",previewStart:"previewStart",previewEnd:"previewEnd",startDateAccessibleName:"startDateAccessibleName",endDateAccessibleName:"endDateAccessibleName"},outputs:{selectedValueChange:"selectedValueChange",previewChange:"previewChange",activeDateChange:"activeDateChange",dragStarted:"dragStarted",dragEnded:"dragEnded"},exportAs:["matCalendarBody"],features:[Be],attrs:UO,decls:11,vars:11,consts:[["aria-hidden","true"],["role","row"],[1,"mat-calendar-body-hidden-label",3,"id"],[1,"mat-calendar-body-label"],[1,"mat-calendar-body-label",3,"paddingTop","paddingBottom"],["role","gridcell",1,"mat-calendar-body-cell-container",3,"width","paddingTop","paddingBottom"],["role","gridcell",1,"mat-calendar-body-cell-container"],["type","button",1,"mat-calendar-body-cell",3,"click","focus","tabindex"],[1,"mat-calendar-body-cell-content","mat-focus-indicator"],["aria-hidden","true",1,"mat-calendar-body-cell-preview"]],template:function(i,r){i&1&&(k(0,$O,3,6,"tr",0),lt(1,YO,4,1,"tr",1,zO,!0),Pe(3,"span",2),v(4),je(),Pe(5,"span",2),v(6),je(),Pe(7,"span",2),v(8),je(),Pe(9,"span",2),v(10),je()),i&2&&(T(r._firstRowOffset<r.labelMinRequiredCells?0:-1),h(),ct(r.rows),h(2),qe("id",r._startDateLabelId),h(),Ae(" ",r.startDateAccessibleName,`
`),h(),qe("id",r._endDateLabelId),h(),Ae(" ",r.endDateAccessibleName,`
`),h(),qe("id",r._comparisonStartDateLabelId),h(),is(" ",r.comparisonDateAccessibleName," ",r.startDateAccessibleName,`
`),h(),qe("id",r._comparisonEndDateLabelId),h(),is(" ",r.comparisonDateAccessibleName," ",r.endDateAccessibleName,`
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
`],encapsulation:2,changeDetection:0})}return t})();function ag(t){return t?.nodeName==="TD"}function sg(t){let n;return ag(t)?n=t:ag(t.parentNode)?n=t.parentNode:ag(t.parentNode?.parentNode)&&(n=t.parentNode.parentNode),n?.getAttribute("data-mat-row")!=null?n:null}function lg(t,n,e){return e!==null&&n!==e&&t<e&&t===n}function cg(t,n,e){return n!==null&&n!==e&&t>=n&&t===e}function dg(t,n,e,i){return i&&n!==null&&e!==null&&n!==e&&t>=n&&t<=e}function QD(t){let n=t.changedTouches[0];return document.elementFromPoint(n.clientX,n.clientY)}var dn=class{start;end;_disableStructuralEquivalency;constructor(n,e){this.start=n,this.end=e}},fu=(()=>{class t{selection;_adapter;_selectionChanged=new M;selectionChanged=this._selectionChanged;constructor(e,i){this.selection=e,this._adapter=i,this.selection=e}updateSelection(e,i){let r=this.selection;this.selection=e,this._selectionChanged.next({selection:e,source:i,oldValue:r})}ngOnDestroy(){this._selectionChanged.complete()}_isValidDateInstance(e){return this._adapter.isDateInstance(e)&&this._adapter.isValid(e)}static \u0275fac=function(i){es()};static \u0275prov=D({token:t,factory:t.\u0275fac})}return t})(),s1=(()=>{class t extends fu{constructor(e){super(null,e)}add(e){super.updateSelection(e,this)}isValid(){return this.selection!=null&&this._isValidDateInstance(this.selection)}isComplete(){return this.selection!=null}clone(){let e=new t(this._adapter);return e.updateSelection(this.selection,this),e}static \u0275fac=function(i){return new(i||t)(V(Rt))};static \u0275prov=D({token:t,factory:t.\u0275fac})}return t})();var l1={provide:fu,useFactory:()=>c(fu,{optional:!0,skipSelf:!0})||new s1(c(Rt))};var nx=new y("MAT_DATE_RANGE_SELECTION_STRATEGY");var ug=7,c1=0,XD=(()=>{class t{_changeDetectorRef=c(be);_dateFormats=c(Gr,{optional:!0});_dateAdapter=c(Rt,{optional:!0});_dir=c(Ue,{optional:!0});_rangeStrategy=c(nx,{optional:!0});_rerenderSubscription=ce.EMPTY;_selectionKeyPressed=!1;get activeDate(){return this._activeDate}set activeDate(e){let i=this._activeDate,r=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e))||this._dateAdapter.today();this._activeDate=this._dateAdapter.clampDate(r,this.minDate,this.maxDate),this._hasSameMonthAndYear(i,this._activeDate)||this._init()}_activeDate;get selected(){return this._selected}set selected(e){e instanceof dn?this._selected=e:this._selected=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e)),this._setRanges(this._selected)}_selected=null;get minDate(){return this._minDate}set minDate(e){this._minDate=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e))}_minDate=null;get maxDate(){return this._maxDate}set maxDate(e){this._maxDate=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e))}_maxDate=null;dateFilter;dateClass;comparisonStart=null;comparisonEnd=null;startDateAccessibleName=null;endDateAccessibleName=null;activeDrag=null;selectedChange=new S;_userSelection=new S;dragStarted=new S;dragEnded=new S;activeDateChange=new S;_matCalendarBody;_monthLabel=x("");_weeks=x([]);_firstWeekOffset=x(0);_rangeStart=x(null);_rangeEnd=x(null);_comparisonRangeStart=x(null);_comparisonRangeEnd=x(null);_previewStart=x(null);_previewEnd=x(null);_isRange=x(!1);_todayDate=x(null);_weekdays=x([]);constructor(){c(Oe).load(Wn),this._activeDate=this._dateAdapter.today()}ngAfterContentInit(){this._rerenderSubscription=this._dateAdapter.localeChanges.pipe(We(null)).subscribe(()=>this._init())}ngOnChanges(e){let i=e.comparisonStart||e.comparisonEnd;i&&!i.firstChange&&this._setRanges(this.selected),e.activeDrag&&!this.activeDrag&&this._clearPreview()}ngOnDestroy(){this._rerenderSubscription.unsubscribe()}_dateSelected(e){let i=e.value,r=this._getDateFromDayOfMonth(i),o,a;this._selected instanceof dn?(o=this._getDateInCurrentMonth(this._selected.start),a=this._getDateInCurrentMonth(this._selected.end)):o=a=this._getDateInCurrentMonth(this._selected),(o!==i||a!==i)&&this.selectedChange.emit(r),this._userSelection.emit({value:r,event:e.event}),this._clearPreview(),this._changeDetectorRef.markForCheck()}_updateActiveDate(e){let i=e.value,r=this._activeDate;this.activeDate=this._getDateFromDayOfMonth(i),this._dateAdapter.compareDate(r,this.activeDate)&&this.activeDateChange.emit(this._activeDate)}_handleCalendarBodyKeydown(e){let i=this._activeDate,r=this._isRtl();switch(e.keyCode){case 37:this.activeDate=this._dateAdapter.addCalendarDays(this._activeDate,r?1:-1);break;case 39:this.activeDate=this._dateAdapter.addCalendarDays(this._activeDate,r?-1:1);break;case 38:this.activeDate=this._dateAdapter.addCalendarDays(this._activeDate,-7);break;case 40:this.activeDate=this._dateAdapter.addCalendarDays(this._activeDate,7);break;case 36:this.activeDate=this._dateAdapter.addCalendarDays(this._activeDate,1-this._dateAdapter.getDate(this._activeDate));break;case 35:this.activeDate=this._dateAdapter.addCalendarDays(this._activeDate,this._dateAdapter.getNumDaysInMonth(this._activeDate)-this._dateAdapter.getDate(this._activeDate));break;case 33:this.activeDate=e.altKey?this._dateAdapter.addCalendarYears(this._activeDate,-1):this._dateAdapter.addCalendarMonths(this._activeDate,-1);break;case 34:this.activeDate=e.altKey?this._dateAdapter.addCalendarYears(this._activeDate,1):this._dateAdapter.addCalendarMonths(this._activeDate,1);break;case 13:case 32:this._selectionKeyPressed=!0,this._canSelect(this._activeDate)&&e.preventDefault();return;case 27:this._previewEnd()!=null&&!$e(e)&&(this._clearPreview(),this.activeDrag?this.dragEnded.emit({value:null,event:e}):(this.selectedChange.emit(null),this._userSelection.emit({value:null,event:e})),e.preventDefault(),e.stopPropagation());return;default:return}this._dateAdapter.compareDate(i,this.activeDate)&&(this.activeDateChange.emit(this.activeDate),this._focusActiveCellAfterViewChecked()),e.preventDefault()}_handleCalendarBodyKeyup(e){(e.keyCode===32||e.keyCode===13)&&(this._selectionKeyPressed&&this._canSelect(this._activeDate)&&this._dateSelected({value:this._dateAdapter.getDate(this._activeDate),event:e}),this._selectionKeyPressed=!1)}_init(){this._setRanges(this.selected),this._todayDate.set(this._getCellCompareValue(this._dateAdapter.today())),this._monthLabel.set(this._dateFormats.display.monthLabel?this._dateAdapter.format(this.activeDate,this._dateFormats.display.monthLabel):this._dateAdapter.getMonthNames("short")[this._dateAdapter.getMonth(this.activeDate)].toLocaleUpperCase());let e=this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate),this._dateAdapter.getMonth(this.activeDate),1);this._firstWeekOffset.set((ug+this._dateAdapter.getDayOfWeek(e)-this._dateAdapter.getFirstDayOfWeek())%ug),this._initWeekdays(),this._createWeekCells(),this._changeDetectorRef.markForCheck()}_focusActiveCell(e){this._matCalendarBody._focusActiveCell(e)}_focusActiveCellAfterViewChecked(){this._matCalendarBody._scheduleFocusActiveCellAfterViewChecked()}_previewChanged({event:e,value:i}){if(this._rangeStrategy){let r=i?i.rawValue:null,o=this._rangeStrategy.createPreview(r,this.selected,e);if(this._previewStart.set(this._getCellCompareValue(o.start)),this._previewEnd.set(this._getCellCompareValue(o.end)),this.activeDrag&&r){let a=this._rangeStrategy.createDrag?.(this.activeDrag.value,this.selected,r,e);a&&(this._previewStart.set(this._getCellCompareValue(a.start)),this._previewEnd.set(this._getCellCompareValue(a.end)))}}}_dragEnded(e){if(this.activeDrag)if(e.value){let i=this._rangeStrategy?.createDrag?.(this.activeDrag.value,this.selected,e.value,e.event);this.dragEnded.emit({value:i??null,event:e.event})}else this.dragEnded.emit({value:null,event:e.event})}_getDateFromDayOfMonth(e){return this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate),this._dateAdapter.getMonth(this.activeDate),e)}_initWeekdays(){let e=this._dateAdapter.getFirstDayOfWeek(),i=this._dateAdapter.getDayOfWeekNames("narrow"),o=this._dateAdapter.getDayOfWeekNames("long").map((a,s)=>({long:a,narrow:i[s],id:c1++}));this._weekdays.set(o.slice(e).concat(o.slice(0,e)))}_createWeekCells(){let e=this._dateAdapter.getNumDaysInMonth(this.activeDate),i=this._dateAdapter.getDateNames(),r=[[]];for(let o=0,a=this._firstWeekOffset();o<e;o++,a++){a==ug&&(r.push([]),a=0);let s=this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate),this._dateAdapter.getMonth(this.activeDate),o+1),l=this._shouldEnableDate(s),d=this._dateAdapter.format(s,this._dateFormats.display.dateA11yLabel),u=this.dateClass?this.dateClass(s,"month"):void 0;r[r.length-1].push(new Ws(o+1,i[o],d,l,u,this._getCellCompareValue(s),s))}this._weeks.set(r)}_shouldEnableDate(e){return!!e&&(!this.minDate||this._dateAdapter.compareDate(e,this.minDate)>=0)&&(!this.maxDate||this._dateAdapter.compareDate(e,this.maxDate)<=0)&&(!this.dateFilter||this.dateFilter(e))}_getDateInCurrentMonth(e){return e&&this._hasSameMonthAndYear(e,this.activeDate)?this._dateAdapter.getDate(e):null}_hasSameMonthAndYear(e,i){return!!(e&&i&&this._dateAdapter.getMonth(e)==this._dateAdapter.getMonth(i)&&this._dateAdapter.getYear(e)==this._dateAdapter.getYear(i))}_getCellCompareValue(e){if(e){let i=this._dateAdapter.getYear(e),r=this._dateAdapter.getMonth(e),o=this._dateAdapter.getDate(e);return new Date(i,r,o).getTime()}return null}_isRtl(){return this._dir&&this._dir.value==="rtl"}_setRanges(e){e instanceof dn?(this._rangeStart.set(this._getCellCompareValue(e.start)),this._rangeEnd.set(this._getCellCompareValue(e.end)),this._isRange.set(!0)):(this._rangeStart.set(this._getCellCompareValue(e)),this._rangeEnd.set(this._rangeStart()),this._isRange.set(!1)),this._comparisonRangeStart.set(this._getCellCompareValue(this.comparisonStart)),this._comparisonRangeEnd.set(this._getCellCompareValue(this.comparisonEnd))}_canSelect(e){return!this.dateFilter||this.dateFilter(e)}_clearPreview(){this._previewStart.set(null),this._previewEnd.set(null)}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=R({type:t,selectors:[["mat-month-view"]],viewQuery:function(i,r){if(i&1&&_e(ra,5),i&2){let o;W(o=G())&&(r._matCalendarBody=o.first)}},inputs:{activeDate:"activeDate",selected:"selected",minDate:"minDate",maxDate:"maxDate",dateFilter:"dateFilter",dateClass:"dateClass",comparisonStart:"comparisonStart",comparisonEnd:"comparisonEnd",startDateAccessibleName:"startDateAccessibleName",endDateAccessibleName:"endDateAccessibleName",activeDrag:"activeDrag"},outputs:{selectedChange:"selectedChange",_userSelection:"_userSelection",dragStarted:"dragStarted",dragEnded:"dragEnded",activeDateChange:"activeDateChange"},exportAs:["matMonthView"],features:[Be],decls:8,vars:14,consts:[["role","grid",1,"mat-calendar-table"],[1,"mat-calendar-table-header"],["scope","col"],["aria-hidden","true"],["colspan","7",1,"mat-calendar-table-header-divider"],["mat-calendar-body","",3,"selectedValueChange","activeDateChange","previewChange","dragStarted","dragEnded","keyup","keydown","label","rows","todayValue","startValue","endValue","comparisonStart","comparisonEnd","previewStart","previewEnd","isRange","labelMinRequiredCells","activeCell","startDateAccessibleName","endDateAccessibleName"],[1,"cdk-visually-hidden"]],template:function(i,r){i&1&&(m(0,"table",0)(1,"thead",1)(2,"tr"),lt(3,qO,5,2,"th",2,tx),p(),m(5,"tr",3),B(6,"th",4),p()(),m(7,"tbody",5),w("selectedValueChange",function(a){return r._dateSelected(a)})("activeDateChange",function(a){return r._updateActiveDate(a)})("previewChange",function(a){return r._previewChanged(a)})("dragStarted",function(a){return r.dragStarted.emit(a)})("dragEnded",function(a){return r._dragEnded(a)})("keyup",function(a){return r._handleCalendarBodyKeyup(a)})("keydown",function(a){return r._handleCalendarBodyKeydown(a)}),p()()),i&2&&(h(3),ct(r._weekdays()),h(4),E("label",r._monthLabel())("rows",r._weeks())("todayValue",r._todayDate())("startValue",r._rangeStart())("endValue",r._rangeEnd())("comparisonStart",r._comparisonRangeStart())("comparisonEnd",r._comparisonRangeEnd())("previewStart",r._previewStart())("previewEnd",r._previewEnd())("isRange",r._isRange())("labelMinRequiredCells",3)("activeCell",r._dateAdapter.getDate(r.activeDate)-1)("startDateAccessibleName",r.startDateAccessibleName)("endDateAccessibleName",r.endDateAccessibleName))},dependencies:[ra],encapsulation:2,changeDetection:0})}return t})(),zt=24,fg=4,JD=(()=>{class t{_changeDetectorRef=c(be);_dateAdapter=c(Rt,{optional:!0});_dir=c(Ue,{optional:!0});_rerenderSubscription=ce.EMPTY;_selectionKeyPressed=!1;get activeDate(){return this._activeDate}set activeDate(e){let i=this._activeDate,r=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e))||this._dateAdapter.today();this._activeDate=this._dateAdapter.clampDate(r,this.minDate,this.maxDate),ix(this._dateAdapter,i,this._activeDate,this.minDate,this.maxDate)||this._init()}_activeDate;get selected(){return this._selected}set selected(e){e instanceof dn?this._selected=e:this._selected=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e)),this._setSelectedYear(e)}_selected=null;get minDate(){return this._minDate}set minDate(e){this._minDate=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e))}_minDate=null;get maxDate(){return this._maxDate}set maxDate(e){this._maxDate=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e))}_maxDate=null;dateFilter;dateClass;selectedChange=new S;yearSelected=new S;activeDateChange=new S;_matCalendarBody;_years=x([]);_todayYear=x(0);_selectedYear=x(null);constructor(){this._dateAdapter,this._activeDate=this._dateAdapter.today()}ngAfterContentInit(){this._rerenderSubscription=this._dateAdapter.localeChanges.pipe(We(null)).subscribe(()=>this._init())}ngOnDestroy(){this._rerenderSubscription.unsubscribe()}_init(){this._todayYear.set(this._dateAdapter.getYear(this._dateAdapter.today()));let i=this._dateAdapter.getYear(this._activeDate)-$s(this._dateAdapter,this.activeDate,this.minDate,this.maxDate),r=[];for(let o=0,a=[];o<zt;o++)a.push(i+o),a.length==fg&&(r.push(a.map(s=>this._createCellForYear(s))),a=[]);this._years.set(r),this._changeDetectorRef.markForCheck()}_yearSelected(e){let i=e.value,r=this._dateAdapter.createDate(i,0,1),o=this._getDateFromYear(i);this.yearSelected.emit(r),this.selectedChange.emit(o)}_updateActiveDate(e){let i=e.value,r=this._activeDate;this.activeDate=this._getDateFromYear(i),this._dateAdapter.compareDate(r,this.activeDate)&&this.activeDateChange.emit(this.activeDate)}_handleCalendarBodyKeydown(e){let i=this._activeDate,r=this._isRtl();switch(e.keyCode){case 37:this.activeDate=this._dateAdapter.addCalendarYears(this._activeDate,r?1:-1);break;case 39:this.activeDate=this._dateAdapter.addCalendarYears(this._activeDate,r?-1:1);break;case 38:this.activeDate=this._dateAdapter.addCalendarYears(this._activeDate,-fg);break;case 40:this.activeDate=this._dateAdapter.addCalendarYears(this._activeDate,fg);break;case 36:this.activeDate=this._dateAdapter.addCalendarYears(this._activeDate,-$s(this._dateAdapter,this.activeDate,this.minDate,this.maxDate));break;case 35:this.activeDate=this._dateAdapter.addCalendarYears(this._activeDate,zt-$s(this._dateAdapter,this.activeDate,this.minDate,this.maxDate)-1);break;case 33:this.activeDate=this._dateAdapter.addCalendarYears(this._activeDate,e.altKey?-zt*10:-zt);break;case 34:this.activeDate=this._dateAdapter.addCalendarYears(this._activeDate,e.altKey?zt*10:zt);break;case 13:case 32:this._selectionKeyPressed=!0;break;default:return}this._dateAdapter.compareDate(i,this.activeDate)&&this.activeDateChange.emit(this.activeDate),this._focusActiveCellAfterViewChecked(),e.preventDefault()}_handleCalendarBodyKeyup(e){(e.keyCode===32||e.keyCode===13)&&(this._selectionKeyPressed&&this._yearSelected({value:this._dateAdapter.getYear(this._activeDate),event:e}),this._selectionKeyPressed=!1)}_getActiveCell(){return $s(this._dateAdapter,this.activeDate,this.minDate,this.maxDate)}_focusActiveCell(){this._matCalendarBody._focusActiveCell()}_focusActiveCellAfterViewChecked(){this._matCalendarBody._scheduleFocusActiveCellAfterViewChecked()}_getDateFromYear(e){let i=this._dateAdapter.getMonth(this.activeDate),r=this._dateAdapter.getNumDaysInMonth(this._dateAdapter.createDate(e,i,1));return this._dateAdapter.createDate(e,i,Math.min(this._dateAdapter.getDate(this.activeDate),r))}_createCellForYear(e){let i=this._dateAdapter.createDate(e,0,1),r=this._dateAdapter.getYearName(i),o=this.dateClass?this.dateClass(i,"multi-year"):void 0;return new Ws(e,r,r,this._shouldEnableYear(e),o)}_shouldEnableYear(e){if(e==null||this.maxDate&&e>this._dateAdapter.getYear(this.maxDate)||this.minDate&&e<this._dateAdapter.getYear(this.minDate))return!1;if(!this.dateFilter)return!0;let i=this._dateAdapter.createDate(e,0,1);for(let r=i;this._dateAdapter.getYear(r)==e;r=this._dateAdapter.addCalendarDays(r,1))if(this.dateFilter(r))return!0;return!1}_isRtl(){return this._dir&&this._dir.value==="rtl"}_setSelectedYear(e){if(this._selectedYear.set(null),e instanceof dn){let i=e.start||e.end;i&&this._selectedYear.set(this._dateAdapter.getYear(i))}else e&&this._selectedYear.set(this._dateAdapter.getYear(e))}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=R({type:t,selectors:[["mat-multi-year-view"]],viewQuery:function(i,r){if(i&1&&_e(ra,5),i&2){let o;W(o=G())&&(r._matCalendarBody=o.first)}},inputs:{activeDate:"activeDate",selected:"selected",minDate:"minDate",maxDate:"maxDate",dateFilter:"dateFilter",dateClass:"dateClass"},outputs:{selectedChange:"selectedChange",yearSelected:"yearSelected",activeDateChange:"activeDateChange"},exportAs:["matMultiYearView"],decls:5,vars:7,consts:[["role","grid",1,"mat-calendar-table"],["aria-hidden","true",1,"mat-calendar-table-header"],["colspan","4",1,"mat-calendar-table-header-divider"],["mat-calendar-body","",3,"selectedValueChange","activeDateChange","keyup","keydown","rows","todayValue","startValue","endValue","numCols","cellAspectRatio","activeCell"]],template:function(i,r){i&1&&(m(0,"table",0)(1,"thead",1)(2,"tr"),B(3,"th",2),p()(),m(4,"tbody",3),w("selectedValueChange",function(a){return r._yearSelected(a)})("activeDateChange",function(a){return r._updateActiveDate(a)})("keyup",function(a){return r._handleCalendarBodyKeyup(a)})("keydown",function(a){return r._handleCalendarBodyKeydown(a)}),p()()),i&2&&(h(4),E("rows",r._years())("todayValue",r._todayYear())("startValue",r._selectedYear())("endValue",r._selectedYear())("numCols",4)("cellAspectRatio",4/7)("activeCell",r._getActiveCell()))},dependencies:[ra],encapsulation:2,changeDetection:0})}return t})();function ix(t,n,e,i,r){let o=t.getYear(n),a=t.getYear(e),s=rx(t,i,r);return Math.floor((o-s)/zt)===Math.floor((a-s)/zt)}function $s(t,n,e,i){let r=t.getYear(n);return d1(r-rx(t,e,i),zt)}function rx(t,n,e){let i=0;return e?i=t.getYear(e)-zt+1:n&&(i=t.getYear(n)),i}function d1(t,n){return(t%n+n)%n}var ex=(()=>{class t{_changeDetectorRef=c(be);_dateFormats=c(Gr,{optional:!0});_dateAdapter=c(Rt,{optional:!0});_dir=c(Ue,{optional:!0});_rerenderSubscription=ce.EMPTY;_selectionKeyPressed=!1;get activeDate(){return this._activeDate}set activeDate(e){let i=this._activeDate,r=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e))||this._dateAdapter.today();this._activeDate=this._dateAdapter.clampDate(r,this.minDate,this.maxDate),this._dateAdapter.getYear(i)!==this._dateAdapter.getYear(this._activeDate)&&this._init()}_activeDate;get selected(){return this._selected}set selected(e){e instanceof dn?this._selected=e:this._selected=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e)),this._setSelectedMonth(e)}_selected=null;get minDate(){return this._minDate}set minDate(e){this._minDate=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e))}_minDate=null;get maxDate(){return this._maxDate}set maxDate(e){this._maxDate=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e))}_maxDate=null;dateFilter;dateClass;selectedChange=new S;monthSelected=new S;activeDateChange=new S;_matCalendarBody;_months=x([]);_yearLabel=x("");_todayMonth=x(null);_selectedMonth=x(null);constructor(){this._activeDate=this._dateAdapter.today()}ngAfterContentInit(){this._rerenderSubscription=this._dateAdapter.localeChanges.pipe(We(null)).subscribe(()=>this._init())}ngOnDestroy(){this._rerenderSubscription.unsubscribe()}_monthSelected(e){let i=e.value,r=this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate),i,1);this.monthSelected.emit(r);let o=this._getDateFromMonth(i);this.selectedChange.emit(o)}_updateActiveDate(e){let i=e.value,r=this._activeDate;this.activeDate=this._getDateFromMonth(i),this._dateAdapter.compareDate(r,this.activeDate)&&this.activeDateChange.emit(this.activeDate)}_handleCalendarBodyKeydown(e){let i=this._activeDate,r=this._isRtl();switch(e.keyCode){case 37:this.activeDate=this._dateAdapter.addCalendarMonths(this._activeDate,r?1:-1);break;case 39:this.activeDate=this._dateAdapter.addCalendarMonths(this._activeDate,r?-1:1);break;case 38:this.activeDate=this._dateAdapter.addCalendarMonths(this._activeDate,-4);break;case 40:this.activeDate=this._dateAdapter.addCalendarMonths(this._activeDate,4);break;case 36:this.activeDate=this._dateAdapter.addCalendarMonths(this._activeDate,-this._dateAdapter.getMonth(this._activeDate));break;case 35:this.activeDate=this._dateAdapter.addCalendarMonths(this._activeDate,11-this._dateAdapter.getMonth(this._activeDate));break;case 33:this.activeDate=this._dateAdapter.addCalendarYears(this._activeDate,e.altKey?-10:-1);break;case 34:this.activeDate=this._dateAdapter.addCalendarYears(this._activeDate,e.altKey?10:1);break;case 13:case 32:this._selectionKeyPressed=!0;break;default:return}this._dateAdapter.compareDate(i,this.activeDate)&&(this.activeDateChange.emit(this.activeDate),this._focusActiveCellAfterViewChecked()),e.preventDefault()}_handleCalendarBodyKeyup(e){(e.keyCode===32||e.keyCode===13)&&(this._selectionKeyPressed&&this._monthSelected({value:this._dateAdapter.getMonth(this._activeDate),event:e}),this._selectionKeyPressed=!1)}_init(){this._setSelectedMonth(this.selected),this._todayMonth.set(this._getMonthInCurrentYear(this._dateAdapter.today())),this._yearLabel.set(this._dateAdapter.getYearName(this.activeDate));let e=this._dateAdapter.getMonthNames("short");this._months.set([[0,1,2,3],[4,5,6,7],[8,9,10,11]].map(i=>i.map(r=>this._createCellForMonth(r,e[r])))),this._changeDetectorRef.markForCheck()}_focusActiveCell(){this._matCalendarBody._focusActiveCell()}_focusActiveCellAfterViewChecked(){this._matCalendarBody._scheduleFocusActiveCellAfterViewChecked()}_getMonthInCurrentYear(e){return e&&this._dateAdapter.getYear(e)==this._dateAdapter.getYear(this.activeDate)?this._dateAdapter.getMonth(e):null}_getDateFromMonth(e){let i=this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate),e,1),r=this._dateAdapter.getNumDaysInMonth(i);return this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate),e,Math.min(this._dateAdapter.getDate(this.activeDate),r))}_createCellForMonth(e,i){let r=this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate),e,1),o=this._dateAdapter.format(r,this._dateFormats.display.monthYearA11yLabel),a=this.dateClass?this.dateClass(r,"year"):void 0;return new Ws(e,i.toLocaleUpperCase(),o,this._shouldEnableMonth(e),a)}_shouldEnableMonth(e){let i=this._dateAdapter.getYear(this.activeDate);if(e==null||this._isYearAndMonthAfterMaxDate(i,e)||this._isYearAndMonthBeforeMinDate(i,e))return!1;if(!this.dateFilter)return!0;let r=this._dateAdapter.createDate(i,e,1);for(let o=r;this._dateAdapter.getMonth(o)==e;o=this._dateAdapter.addCalendarDays(o,1))if(this.dateFilter(o))return!0;return!1}_isYearAndMonthAfterMaxDate(e,i){if(this.maxDate){let r=this._dateAdapter.getYear(this.maxDate),o=this._dateAdapter.getMonth(this.maxDate);return e>r||e===r&&i>o}return!1}_isYearAndMonthBeforeMinDate(e,i){if(this.minDate){let r=this._dateAdapter.getYear(this.minDate),o=this._dateAdapter.getMonth(this.minDate);return e<r||e===r&&i<o}return!1}_isRtl(){return this._dir&&this._dir.value==="rtl"}_setSelectedMonth(e){e instanceof dn?this._selectedMonth.set(this._getMonthInCurrentYear(e.start)||this._getMonthInCurrentYear(e.end)):this._selectedMonth.set(this._getMonthInCurrentYear(e))}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=R({type:t,selectors:[["mat-year-view"]],viewQuery:function(i,r){if(i&1&&_e(ra,5),i&2){let o;W(o=G())&&(r._matCalendarBody=o.first)}},inputs:{activeDate:"activeDate",selected:"selected",minDate:"minDate",maxDate:"maxDate",dateFilter:"dateFilter",dateClass:"dateClass"},outputs:{selectedChange:"selectedChange",monthSelected:"monthSelected",activeDateChange:"activeDateChange"},exportAs:["matYearView"],decls:5,vars:9,consts:[["role","grid",1,"mat-calendar-table"],["aria-hidden","true",1,"mat-calendar-table-header"],["colspan","4",1,"mat-calendar-table-header-divider"],["mat-calendar-body","",3,"selectedValueChange","activeDateChange","keyup","keydown","label","rows","todayValue","startValue","endValue","labelMinRequiredCells","numCols","cellAspectRatio","activeCell"]],template:function(i,r){i&1&&(m(0,"table",0)(1,"thead",1)(2,"tr"),B(3,"th",2),p()(),m(4,"tbody",3),w("selectedValueChange",function(a){return r._monthSelected(a)})("activeDateChange",function(a){return r._updateActiveDate(a)})("keyup",function(a){return r._handleCalendarBodyKeyup(a)})("keydown",function(a){return r._handleCalendarBodyKeydown(a)}),p()()),i&2&&(h(4),E("label",r._yearLabel())("rows",r._months())("todayValue",r._todayMonth())("startValue",r._selectedMonth())("endValue",r._selectedMonth())("labelMinRequiredCells",2)("numCols",4)("cellAspectRatio",4/7)("activeCell",r._dateAdapter.getMonth(r.activeDate)))},dependencies:[ra],encapsulation:2,changeDetection:0})}return t})(),ox=(()=>{class t{_intl=c(oa);calendar=c(Gs);_dateAdapter=c(Rt,{optional:!0});_dateFormats=c(Gr,{optional:!0});_periodButtonText;_periodButtonDescription;_periodButtonLabel;_prevButtonLabel;_nextButtonLabel;constructor(){c(Oe).load(Wn);let e=c(be);this._updateLabels(),this.calendar.stateChanges.subscribe(()=>{this._updateLabels(),e.markForCheck()})}get periodButtonText(){return this._periodButtonText}get periodButtonDescription(){return this._periodButtonDescription}get periodButtonLabel(){return this._periodButtonLabel}get prevButtonLabel(){return this._prevButtonLabel}get nextButtonLabel(){return this._nextButtonLabel}currentPeriodClicked(){this.calendar.currentView=this.calendar.currentView=="month"?"multi-year":"month"}previousClicked(){this.previousEnabled()&&(this.calendar.activeDate=this.calendar.currentView=="month"?this._dateAdapter.addCalendarMonths(this.calendar.activeDate,-1):this._dateAdapter.addCalendarYears(this.calendar.activeDate,this.calendar.currentView=="year"?-1:-zt))}nextClicked(){this.nextEnabled()&&(this.calendar.activeDate=this.calendar.currentView=="month"?this._dateAdapter.addCalendarMonths(this.calendar.activeDate,1):this._dateAdapter.addCalendarYears(this.calendar.activeDate,this.calendar.currentView=="year"?1:zt))}previousEnabled(){return this.calendar.minDate?!this.calendar.minDate||!this._isSameView(this.calendar.activeDate,this.calendar.minDate):!0}nextEnabled(){return!this.calendar.maxDate||!this._isSameView(this.calendar.activeDate,this.calendar.maxDate)}_updateLabels(){let e=this.calendar,i=this._intl,r=this._dateAdapter;e.currentView==="month"?(this._periodButtonText=r.format(e.activeDate,this._dateFormats.display.monthYearLabel).toLocaleUpperCase(),this._periodButtonDescription=r.format(e.activeDate,this._dateFormats.display.monthYearLabel).toLocaleUpperCase(),this._periodButtonLabel=i.switchToMultiYearViewLabel,this._prevButtonLabel=i.prevMonthLabel,this._nextButtonLabel=i.nextMonthLabel):e.currentView==="year"?(this._periodButtonText=r.getYearName(e.activeDate),this._periodButtonDescription=r.getYearName(e.activeDate),this._periodButtonLabel=i.switchToMonthViewLabel,this._prevButtonLabel=i.prevYearLabel,this._nextButtonLabel=i.nextYearLabel):(this._periodButtonText=i.formatYearRange(...this._formatMinAndMaxYearLabels()),this._periodButtonDescription=i.formatYearRangeLabel(...this._formatMinAndMaxYearLabels()),this._periodButtonLabel=i.switchToMonthViewLabel,this._prevButtonLabel=i.prevMultiYearLabel,this._nextButtonLabel=i.nextMultiYearLabel)}_isSameView(e,i){return this.calendar.currentView=="month"?this._dateAdapter.getYear(e)==this._dateAdapter.getYear(i)&&this._dateAdapter.getMonth(e)==this._dateAdapter.getMonth(i):this.calendar.currentView=="year"?this._dateAdapter.getYear(e)==this._dateAdapter.getYear(i):ix(this._dateAdapter,e,i,this.calendar.minDate,this.calendar.maxDate)}_formatMinAndMaxYearLabels(){let i=this._dateAdapter.getYear(this.calendar.activeDate)-$s(this._dateAdapter,this.calendar.activeDate,this.calendar.minDate,this.calendar.maxDate),r=i+zt-1,o=this._dateAdapter.getYearName(this._dateAdapter.createDate(i,0,1)),a=this._dateAdapter.getYearName(this._dateAdapter.createDate(r,0,1));return[o,a]}_periodButtonLabelId=c(ye).getId("mat-calendar-period-label-");static \u0275fac=function(i){return new(i||t)};static \u0275cmp=R({type:t,selectors:[["mat-calendar-header"]],exportAs:["matCalendarHeader"],ngContentSelectors:ZO,decls:17,vars:13,consts:[[1,"mat-calendar-header"],[1,"mat-calendar-controls"],["aria-live","polite",1,"cdk-visually-hidden",3,"id"],["matButton","","type","button",1,"mat-calendar-period-button",3,"click"],["aria-hidden","true"],["viewBox","0 0 10 5","focusable","false","aria-hidden","true",1,"mat-calendar-arrow"],["points","0,0 5,5 10,0"],[1,"mat-calendar-spacer"],["matIconButton","","type","button","disabledInteractive","",1,"mat-calendar-previous-button",3,"click","disabled","matTooltip"],["viewBox","0 0 24 24","focusable","false","aria-hidden","true"],["d","M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"],["matIconButton","","type","button","disabledInteractive","",1,"mat-calendar-next-button",3,"click","disabled","matTooltip"],["d","M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"]],template:function(i,r){i&1&&(Se(),m(0,"div",0)(1,"div",1)(2,"span",2),v(3),p(),m(4,"button",3),w("click",function(){return r.currentPeriodClicked()}),m(5,"span",4),v(6),p(),_t(),m(7,"svg",5),B(8,"polygon",6),p()(),Jn(),B(9,"div",7),oe(10),m(11,"button",8),w("click",function(){return r.previousClicked()}),_t(),m(12,"svg",9),B(13,"path",10),p()(),Jn(),m(14,"button",11),w("click",function(){return r.nextClicked()}),_t(),m(15,"svg",9),B(16,"path",12),p()()()()),i&2&&(h(2),E("id",r._periodButtonLabelId),h(),ne(r.periodButtonDescription),h(),O("aria-label",r.periodButtonLabel)("aria-describedby",r._periodButtonLabelId),h(2),ne(r.periodButtonText),h(),A("mat-calendar-invert",r.calendar.currentView!=="month"),h(4),E("disabled",!r.previousEnabled())("matTooltip",r.prevButtonLabel),O("aria-label",r.prevButtonLabel),h(3),E("disabled",!r.nextEnabled())("matTooltip",r.nextButtonLabel),O("aria-label",r.nextButtonLabel))},dependencies:[An,rn,pi],encapsulation:2,changeDetection:0})}return t})(),Gs=(()=>{class t{_dateAdapter=c(Rt,{optional:!0});_dateFormats=c(Gr,{optional:!0});_changeDetectorRef=c(be);_elementRef=c(L);headerComponent;_calendarHeaderPortal;_intlChanges;_moveFocusOnNextTick=!1;get startAt(){return this._startAt}set startAt(e){this._startAt=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e))}_startAt=null;startView="month";get selected(){return this._selected}set selected(e){e instanceof dn?this._selected=e:this._selected=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e))}_selected=null;get minDate(){return this._minDate}set minDate(e){this._minDate=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e))}_minDate=null;get maxDate(){return this._maxDate}set maxDate(e){this._maxDate=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e))}_maxDate=null;dateFilter;dateClass;comparisonStart=null;comparisonEnd=null;startDateAccessibleName=null;endDateAccessibleName=null;selectedChange=new S;yearSelected=new S;monthSelected=new S;viewChanged=new S(!0);_userSelection=new S;_userDragDrop=new S;monthView;yearView;multiYearView;get activeDate(){return this._clampedActiveDate}set activeDate(e){this._clampedActiveDate=this._dateAdapter.clampDate(e,this.minDate,this.maxDate),this.stateChanges.next(),this._changeDetectorRef.markForCheck()}_clampedActiveDate;get currentView(){return this._currentView}set currentView(e){let i=this._currentView!==e?e:null;this._currentView=e,this._moveFocusOnNextTick=!0,this._changeDetectorRef.markForCheck(),i&&(this.stateChanges.next(),this.viewChanged.emit(i))}_currentView;_activeDrag=null;stateChanges=new M;constructor(){this._intlChanges=c(oa).changes.subscribe(()=>{this._changeDetectorRef.markForCheck(),this.stateChanges.next()})}ngAfterContentInit(){this._calendarHeaderPortal=new Ut(this.headerComponent||ox),this.activeDate=this.startAt||this._dateAdapter.today(),this._currentView=this.startView}ngAfterViewChecked(){this._moveFocusOnNextTick&&(this._moveFocusOnNextTick=!1,this.focusActiveCell())}ngOnDestroy(){this._intlChanges.unsubscribe(),this.stateChanges.complete()}ngOnChanges(e){let i=e.minDate&&!this._dateAdapter.sameDate(e.minDate.previousValue,e.minDate.currentValue)?e.minDate:void 0,r=e.maxDate&&!this._dateAdapter.sameDate(e.maxDate.previousValue,e.maxDate.currentValue)?e.maxDate:void 0,o=i||r||e.dateFilter;if(o&&!o.firstChange){let a=this._getCurrentViewComponent();a&&(this._elementRef.nativeElement.contains(ai())&&(this._moveFocusOnNextTick=!0),this._changeDetectorRef.detectChanges(),a._init())}this.stateChanges.next()}focusActiveCell(){this._getCurrentViewComponent()?._focusActiveCell(!1)}updateTodaysDate(){this._getCurrentViewComponent()?._init()}_dateSelected(e){let i=e.value;(this.selected instanceof dn||i&&!this._dateAdapter.sameDate(i,this.selected))&&this.selectedChange.emit(i),this._userSelection.emit(e)}_yearSelectedInMultiYearView(e){this.yearSelected.emit(e)}_monthSelectedInYearView(e){this.monthSelected.emit(e)}_goToDateInView(e,i){this.activeDate=e,this.currentView=i}_dragStarted(e){this._activeDrag=e}_dragEnded(e){this._activeDrag&&(e.value&&this._userDragDrop.emit(e),this._activeDrag=null)}_getCurrentViewComponent(){return this.monthView||this.yearView||this.multiYearView}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=R({type:t,selectors:[["mat-calendar"]],viewQuery:function(i,r){if(i&1&&_e(XD,5)(ex,5)(JD,5),i&2){let o;W(o=G())&&(r.monthView=o.first),W(o=G())&&(r.yearView=o.first),W(o=G())&&(r.multiYearView=o.first)}},hostAttrs:[1,"mat-calendar"],inputs:{headerComponent:"headerComponent",startAt:"startAt",startView:"startView",selected:"selected",minDate:"minDate",maxDate:"maxDate",dateFilter:"dateFilter",dateClass:"dateClass",comparisonStart:"comparisonStart",comparisonEnd:"comparisonEnd",startDateAccessibleName:"startDateAccessibleName",endDateAccessibleName:"endDateAccessibleName"},outputs:{selectedChange:"selectedChange",yearSelected:"yearSelected",monthSelected:"monthSelected",viewChanged:"viewChanged",_userSelection:"_userSelection",_userDragDrop:"_userDragDrop"},exportAs:["matCalendar"],features:[Re([l1]),Be],decls:5,vars:2,consts:[[3,"cdkPortalOutlet"],["cdkMonitorSubtreeFocus","","tabindex","-1",1,"mat-calendar-content"],[3,"activeDate","selected","dateFilter","maxDate","minDate","dateClass","comparisonStart","comparisonEnd","startDateAccessibleName","endDateAccessibleName","activeDrag"],[3,"activeDate","selected","dateFilter","maxDate","minDate","dateClass"],[3,"activeDateChange","_userSelection","dragStarted","dragEnded","activeDate","selected","dateFilter","maxDate","minDate","dateClass","comparisonStart","comparisonEnd","startDateAccessibleName","endDateAccessibleName","activeDrag"],[3,"activeDateChange","monthSelected","selectedChange","activeDate","selected","dateFilter","maxDate","minDate","dateClass"],[3,"activeDateChange","yearSelected","selectedChange","activeDate","selected","dateFilter","maxDate","minDate","dateClass"]],template:function(i,r){if(i&1&&(it(0,KO,0,0,"ng-template",0),m(1,"div",1),k(2,QO,1,11,"mat-month-view",2)(3,XO,1,6,"mat-year-view",3)(4,JO,1,6,"mat-multi-year-view",3),p()),i&2){let o;E("cdkPortalOutlet",r._calendarHeaderPortal),h(2),T((o=r.currentView)==="month"?2:o==="year"?3:o==="multi-year"?4:-1)}},dependencies:[On,ih,XD,ex,JD],styles:[`.mat-calendar {
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
`],encapsulation:2,changeDetection:0})}return t})();var u1=(()=>{class t{_elementRef=c(L);_animationsDisabled=xe();_changeDetectorRef=c(be);_globalModel=c(fu);_dateAdapter=c(Rt);_ngZone=c(P);_rangeSelectionStrategy=c(nx,{optional:!0});_stateChanges;_model;_eventCleanups;_animationFallback;_calendar;color;datepicker;comparisonStart=null;comparisonEnd=null;startDateAccessibleName=null;endDateAccessibleName=null;_isAbove=!1;_animationDone=new M;_isAnimating=!1;_closeButtonText;_closeButtonFocused=!1;_actionsPortal=null;_dialogLabelId=null;constructor(){if(c(Oe).load(Wn),this._closeButtonText=c(oa).closeCalendarLabel,!this._animationsDisabled){let e=this._elementRef.nativeElement,i=c(Te);this._eventCleanups=this._ngZone.runOutsideAngular(()=>[i.listen(e,"animationstart",this._handleAnimationEvent),i.listen(e,"animationend",this._handleAnimationEvent),i.listen(e,"animationcancel",this._handleAnimationEvent)])}}ngAfterViewInit(){this._stateChanges=this.datepicker.stateChanges.subscribe(()=>{this._changeDetectorRef.markForCheck()}),this._calendar.focusActiveCell()}ngOnDestroy(){clearTimeout(this._animationFallback),this._eventCleanups?.forEach(e=>e()),this._stateChanges?.unsubscribe(),this._animationDone.complete()}_handleUserSelection(e){let i=this._model.selection,r=e.value,o=i instanceof dn;if(o&&this._rangeSelectionStrategy){let a=this._rangeSelectionStrategy.selectionFinished(r,i,e.event);this._model.updateSelection(a,this)}else r&&(o||!this._dateAdapter.sameDate(r,i))&&this._model.add(r);(!this._model||this._model.isComplete())&&!this._actionsPortal&&this.datepicker.close()}_handleUserDragDrop(e){this._model.updateSelection(e.value,this)}_startExitAnimation(){this._elementRef.nativeElement.classList.add("mat-datepicker-content-exit"),this._animationsDisabled?this._animationDone.next():(clearTimeout(this._animationFallback),this._animationFallback=setTimeout(()=>{this._isAnimating||this._animationDone.next()},200))}_handleAnimationEvent=e=>{let i=this._elementRef.nativeElement;e.target!==i||!e.animationName.startsWith("_mat-datepicker-content")||(clearTimeout(this._animationFallback),this._isAnimating=e.type==="animationstart",i.classList.toggle("mat-datepicker-content-animating",this._isAnimating),this._isAnimating||this._animationDone.next())};_getSelected(){return this._model.selection}_applyPendingSelection(){this._model!==this._globalModel&&this._globalModel.updateSelection(this._model.selection,this)}_assignActions(e,i){this._model=e?this._globalModel.clone():this._globalModel,this._actionsPortal=e,i&&this._changeDetectorRef.detectChanges()}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=R({type:t,selectors:[["mat-datepicker-content"]],viewQuery:function(i,r){if(i&1&&_e(Gs,5),i&2){let o;W(o=G())&&(r._calendar=o.first)}},hostAttrs:[1,"mat-datepicker-content"],hostVars:6,hostBindings:function(i,r){i&2&&(rt(r.color?"mat-"+r.color:""),A("mat-datepicker-content-touch",r.datepicker.touchUi)("mat-datepicker-content-animations-enabled",!r._animationsDisabled))},inputs:{color:"color"},exportAs:["matDatepickerContent"],decls:5,vars:26,consts:[["cdkTrapFocus","","role","dialog",1,"mat-datepicker-content-container"],[3,"yearSelected","monthSelected","viewChanged","_userSelection","_userDragDrop","id","startAt","startView","minDate","maxDate","dateFilter","headerComponent","selected","dateClass","comparisonStart","comparisonEnd","startDateAccessibleName","endDateAccessibleName"],[3,"cdkPortalOutlet"],["type","button","matButton","elevated",1,"mat-datepicker-close-button",3,"focus","blur","click","color"]],template:function(i,r){i&1&&(m(0,"div",0)(1,"mat-calendar",1),w("yearSelected",function(a){return r.datepicker._selectYear(a)})("monthSelected",function(a){return r.datepicker._selectMonth(a)})("viewChanged",function(a){return r.datepicker._viewChanged(a)})("_userSelection",function(a){return r._handleUserSelection(a)})("_userDragDrop",function(a){return r._handleUserDragDrop(a)}),p(),it(2,e1,0,0,"ng-template",2),m(3,"button",3),w("focus",function(){return r._closeButtonFocused=!0})("blur",function(){return r._closeButtonFocused=!1})("click",function(){return r.datepicker.close()}),v(4),p()()),i&2&&(A("mat-datepicker-content-container-with-custom-header",r.datepicker.calendarHeaderComponent)("mat-datepicker-content-container-with-actions",r._actionsPortal),O("aria-modal",!0)("aria-labelledby",r._dialogLabelId??void 0),h(),rt(r.datepicker.panelClass),E("id",r.datepicker.id)("startAt",r.datepicker.startAt)("startView",r.datepicker.startView)("minDate",r.datepicker._getMinDate())("maxDate",r.datepicker._getMaxDate())("dateFilter",r.datepicker._getDateFilter())("headerComponent",r.datepicker.calendarHeaderComponent)("selected",r._getSelected())("dateClass",r.datepicker.dateClass)("comparisonStart",r.comparisonStart)("comparisonEnd",r.comparisonEnd)("startDateAccessibleName",r.startDateAccessibleName)("endDateAccessibleName",r.endDateAccessibleName),h(),E("cdkPortalOutlet",r._actionsPortal),h(),A("cdk-visually-hidden",!r._closeButtonFocused),E("color",r.color||"primary"),h(),ne(r._closeButtonText))},dependencies:[sh,Gs,On,An],styles:[`@keyframes _mat-datepicker-content-dropdown-enter {
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
`],encapsulation:2,changeDetection:0})}return t})();var f1=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=$({type:t,selectors:[["","matDatepickerToggleIcon",""]]})}return t})(),m1=(()=>{class t{_intl=c(oa);_changeDetectorRef=c(be);_stateChanges=ce.EMPTY;datepicker;tabIndex=null;ariaLabel;get disabled(){return this._disabled===void 0&&this.datepicker?this.datepicker.disabled:!!this._disabled}set disabled(e){this._disabled=e}_disabled;disableRipple=!1;_customIcon;_button;constructor(){let e=c(new Xt("tabindex"),{optional:!0}),i=Number(e);this.tabIndex=i||i===0?i:null}ngOnChanges(e){e.datepicker&&this._watchStateChanges()}ngOnDestroy(){this._stateChanges.unsubscribe()}ngAfterContentInit(){this._watchStateChanges()}_open(e){this.datepicker&&!this.disabled&&(this.datepicker.open(),e.stopPropagation())}_watchStateChanges(){let e=this.datepicker?this.datepicker.stateChanges:He(),i=this.datepicker&&this.datepicker.datepickerInput?this.datepicker.datepickerInput.stateChanges:He(),r=this.datepicker?ft(this.datepicker.openedStream,this.datepicker.closedStream):He();this._stateChanges.unsubscribe(),this._stateChanges=ft(this._intl.changes,e,i,r).subscribe(()=>this._changeDetectorRef.markForCheck())}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=R({type:t,selectors:[["mat-datepicker-toggle"]],contentQueries:function(i,r,o){if(i&1&&Kt(o,f1,5),i&2){let a;W(a=G())&&(r._customIcon=a.first)}},viewQuery:function(i,r){if(i&1&&_e(t1,5),i&2){let o;W(o=G())&&(r._button=o.first)}},hostAttrs:[1,"mat-datepicker-toggle"],hostVars:8,hostBindings:function(i,r){i&1&&w("click",function(a){return r._open(a)}),i&2&&(O("tabindex",null)("data-mat-calendar",r.datepicker?r.datepicker.id:null),A("mat-datepicker-toggle-active",r.datepicker&&r.datepicker.opened)("mat-accent",r.datepicker&&r.datepicker.color==="accent")("mat-warn",r.datepicker&&r.datepicker.color==="warn"))},inputs:{datepicker:[0,"for","datepicker"],tabIndex:"tabIndex",ariaLabel:[0,"aria-label","ariaLabel"],disabled:[2,"disabled","disabled",U],disableRipple:"disableRipple"},exportAs:["matDatepickerToggle"],features:[Be],ngContentSelectors:i1,decls:4,vars:7,consts:[["button",""],["matIconButton","","type","button",3,"tabIndex","disabled","disableRipple"],["viewBox","0 0 24 24","width","24px","height","24px","fill","currentColor","focusable","false","aria-hidden","true",1,"mat-datepicker-toggle-default-icon"],["d","M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"]],template:function(i,r){i&1&&(Se(n1),m(0,"button",1,0),k(2,r1,2,0,":svg:svg",2),oe(3),p()),i&2&&(E("tabIndex",r.disabled?-1:r.tabIndex)("disabled",r.disabled)("disableRipple",r.disableRipple),O("aria-haspopup",r.datepicker?"dialog":null)("aria-label",r.ariaLabel||r._intl.openCalendarLabel)("aria-expanded",r.datepicker?r.datepicker.opened:null),h(2),T(r._customIcon?-1:2))},dependencies:[rn],styles:[`.mat-datepicker-toggle {
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
`],encapsulation:2,changeDetection:0})}return t})();var ax=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=Z({type:t});static \u0275inj=q({providers:[oa],imports:[Ht,At,Vr,Gn,u1,m1,ox,he,Rn]})}return t})();var h1=/^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|(?:(?:\+|-)\d{2}:\d{2}))?)?$/,g1=/^(\d?\d)[:.](\d?\d)(?:[:.](\d?\d))?\s*(AM|PM)?$/i;function mg(t,n){let e=Array(t);for(let i=0;i<t;i++)e[i]=n(i);return e}var _1=(()=>{class t extends Rt{_matDateLocale=c(og,{optional:!0});constructor(){super();let e=c(og,{optional:!0});e!==void 0&&(this._matDateLocale=e),super.setLocale(this._matDateLocale)}getYear(e){return e.getFullYear()}getMonth(e){return e.getMonth()}getDate(e){return e.getDate()}getDayOfWeek(e){return e.getDay()}getMonthNames(e){let i=new Intl.DateTimeFormat(this.locale,{month:e,timeZone:"utc"});return mg(12,r=>this._format(i,new Date(2017,r,1)))}getDateNames(){let e=new Intl.DateTimeFormat(this.locale,{day:"numeric",timeZone:"utc"});return mg(31,i=>this._format(e,new Date(2017,0,i+1)))}getDayOfWeekNames(e){let i=new Intl.DateTimeFormat(this.locale,{weekday:e,timeZone:"utc"});return mg(7,r=>this._format(i,new Date(2017,0,r+1)))}getYearName(e){let i=new Intl.DateTimeFormat(this.locale,{year:"numeric",timeZone:"utc"});return this._format(i,e)}getFirstDayOfWeek(){if(typeof Intl<"u"&&Intl.Locale){let e=new Intl.Locale(this.locale),i=(e.getWeekInfo?.()||e.weekInfo)?.firstDay??0;return i===7?0:i}return 0}getNumDaysInMonth(e){return this.getDate(this._createDateWithOverflow(this.getYear(e),this.getMonth(e)+1,0))}clone(e){return new Date(e.getTime())}createDate(e,i,r){let o=this._createDateWithOverflow(e,i,r);return o.getMonth()!=i,o}today(){return new Date}parse(e,i){return typeof e=="number"?new Date(e):e?new Date(Date.parse(e)):null}format(e,i){if(!this.isValid(e))throw Error("NativeDateAdapter: Cannot format invalid date.");let r=new Intl.DateTimeFormat(this.locale,se(I({},i),{timeZone:"utc"}));return this._format(r,e)}addCalendarYears(e,i){return this.addCalendarMonths(e,i*12)}addCalendarMonths(e,i){let r=this._createDateWithOverflow(this.getYear(e),this.getMonth(e)+i,this.getDate(e));return this.getMonth(r)!=((this.getMonth(e)+i)%12+12)%12&&(r=this._createDateWithOverflow(this.getYear(r),this.getMonth(r),0)),r}addCalendarDays(e,i){return this._createDateWithOverflow(this.getYear(e),this.getMonth(e),this.getDate(e)+i)}toIso8601(e){return[e.getUTCFullYear(),this._2digit(e.getUTCMonth()+1),this._2digit(e.getUTCDate())].join("-")}deserialize(e){if(typeof e=="string"){if(!e)return null;if(h1.test(e)){let i=new Date(e);if(this.isValid(i))return i}}return super.deserialize(e)}isDateInstance(e){return e instanceof Date}isValid(e){return!isNaN(e.getTime())}invalid(){return new Date(NaN)}setTime(e,i,r,o){let a=this.clone(e);return a.setHours(i,r,o,0),a}getHours(e){return e.getHours()}getMinutes(e){return e.getMinutes()}getSeconds(e){return e.getSeconds()}parseTime(e,i){if(typeof e!="string")return e instanceof Date?new Date(e.getTime()):null;let r=e.trim();if(r.length===0)return null;let o=this._parseTimeString(r);if(o===null){let a=r.replace(/[^0-9:(AM|PM)]/gi,"").trim();a.length>0&&(o=this._parseTimeString(a))}return o||this.invalid()}addSeconds(e,i){return new Date(e.getTime()+i*1e3)}_createDateWithOverflow(e,i,r){let o=new Date;return o.setFullYear(e,i,r),o.setHours(0,0,0,0),o}_2digit(e){return("00"+e).slice(-2)}_format(e,i){let r=new Date;return r.setUTCFullYear(i.getFullYear(),i.getMonth(),i.getDate()),r.setUTCHours(i.getHours(),i.getMinutes(),i.getSeconds(),i.getMilliseconds()),e.format(r)}_parseTimeString(e){let i=e.toUpperCase().match(g1);if(i){let r=parseInt(i[1]),o=parseInt(i[2]),a=i[3]==null?void 0:parseInt(i[3]),s=i[4];if(r===12?r=s==="AM"?0:r:s==="PM"&&(r+=12),pg(r,0,23)&&pg(o,0,59)&&(a==null||pg(a,0,59)))return this.setTime(this.today(),r,o,a||0)}return null}static \u0275fac=function(i){return new(i||t)};static \u0275prov=D({token:t,factory:t.\u0275fac})}return t})();function pg(t,n,e){return!isNaN(t)&&t>=n&&t<=e}var b1={parse:{dateInput:null,timeInput:null},display:{dateInput:{year:"numeric",month:"numeric",day:"numeric"},timeInput:{hour:"numeric",minute:"numeric"},monthYearLabel:{year:"numeric",month:"short"},dateA11yLabel:{year:"numeric",month:"long",day:"numeric"},monthYearA11yLabel:{year:"numeric",month:"long"},timeOptionLabel:{hour:"numeric",minute:"numeric"}}};function sx(t=b1){return[{provide:Rt,useClass:_1},{provide:Gr,useValue:t}]}var mu=class t{http=c(at);getActiveDates(){return this.http.get("/api/diary/active-dates")}getOrGenerateEntry(n,e=!1,i){return this.http.post("/api/diary/entry",{date:n,force:e,provider:i})}static \u0275fac=function(e){return new(e||t)};static \u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"})};function v1(t,n){t&1&&(m(0,"div",9),B(1,"mat-spinner",16),p())}function y1(t,n){if(t&1){let e=de();m(0,"mat-calendar",17),w("selectedChange",function(r){j(e);let o=b();return H(o.onDateSelected(r))}),p()}if(t&2){let e=b();E("selected",e.selectedDate())("maxDate",e.maxDate())("dateClass",e.dateClass)}}function C1(t,n){t&1&&(m(0,"div",12)(1,"mat-icon",18),v(2,"menu_book"),p(),m(3,"p"),v(4,"Pick a highlighted day from the calendar to read what the music said about you."),p()())}function D1(t,n){t&1&&(m(0,"div",13),B(1,"mat-spinner",19),m(2,"p"),v(3,"Writing your diary entry\u2026"),p()())}function x1(t,n){if(t&1){let e=de();m(0,"div",14)(1,"mat-icon",18),v(2,"error_outline"),p(),m(3,"p"),v(4),p(),m(5,"button",20),w("click",function(){j(e);let r=b();return H(r.regenerate())}),v(6,"Try again"),p()()}if(t&2){let e=b();h(4),ne(e.entryError())}}function w1(t,n){t&1&&(m(0,"span",24),v(1,"Cached"),p())}function E1(t,n){if(t&1){let e=de();m(0,"div",15)(1,"div",21)(2,"span",22),v(3),p(),m(4,"button",23),w("click",function(){j(e);let r=b();return H(r.regenerate())}),m(5,"mat-icon"),v(6,"refresh"),p()()(),k(7,w1,2,0,"span",24),m(8,"div",25),v(9),p()()}if(t&2){let e=b();h(3),ne(e.selectedDateLabel()),h(4),T(e.isFromCache()?7:-1),h(2),ne(e.entryContent())}}function hg(t){let n=t.getFullYear(),e=String(t.getMonth()+1).padStart(2,"0"),i=String(t.getDate()).padStart(2,"0");return`${n}-${e}-${i}`}var pu=class t{diaryService=c(mu);dialogRef=c(Ui);dialogData=c(Ah,{optional:!0});activeDates=x(new Set);selectedDate=x(null);entryContent=x(null);entryLoading=x(!1);entryError=x(null);isFromCache=x(!1);datesLoading=x(!0);maxDate=ke(()=>{let n=new Date;return n.setDate(n.getDate()-1),n});selectedDateLabel=ke(()=>{let n=this.selectedDate();return n?n.toLocaleDateString(void 0,{weekday:"long",year:"numeric",month:"long",day:"numeric"}):null});dateClass=(n,e)=>e!=="month"?"":this.activeDates().has(hg(n))?"diary-active-day":"";ngOnInit(){this.diaryService.getActiveDates().subscribe({next:n=>{this.activeDates.set(new Set(n)),this.datesLoading.set(!1)},error:()=>this.datesLoading.set(!1)})}onDateSelected(n){if(!n)return;let e=hg(n);this.activeDates().has(e)&&(this.selectedDate.set(n),this.loadEntry(e,!1))}regenerate(){let n=this.selectedDate();n&&this.loadEntry(hg(n),!0)}loadEntry(n,e){this.entryLoading.set(!0),this.entryError.set(null),this.entryContent.set(null);let i=this.dialogData?.provider;this.diaryService.getOrGenerateEntry(n,e,i).subscribe({next:r=>{this.entryContent.set(r.content),this.isFromCache.set(r.isFromCache),this.entryLoading.set(!1)},error:()=>{this.entryError.set("Could not generate your diary entry. Please try again."),this.entryLoading.set(!1)}})}close(){this.dialogRef.close()}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=R({type:t,selectors:[["app-musical-diary-modal"]],features:[Re([sx()])],decls:21,vars:2,consts:[[1,"diary-modal"],["mat-dialog-title","",1,"dialog-header"],["aria-hidden","true",1,"header-icon"],[1,"header-title"],["mat-icon-button","","aria-label","Close diary",1,"close-btn",3,"click"],[1,"dialog-body"],[1,"diary-layout"],[1,"calendar-pane"],[1,"calendar-hint"],[1,"calendar-loading"],[3,"selected","maxDate","dateClass"],[1,"entry-pane"],[1,"entry-empty"],[1,"entry-loading"],[1,"entry-error"],[1,"entry-content"],["diameter","32"],[3,"selectedChange","selected","maxDate","dateClass"],["aria-hidden","true"],["diameter","36"],["mat-stroked-button","",3,"click"],[1,"entry-date-row"],[1,"entry-date-label"],["mat-icon-button","","matTooltip","Regenerate this entry","aria-label","Regenerate diary entry",1,"regen-btn",3,"click"],[1,"cache-badge"],[1,"entry-text"]],template:function(e,i){e&1&&(m(0,"div",0)(1,"div",1)(2,"mat-icon",2),v(3,"auto_stories"),p(),m(4,"span",3),v(5,"Musical Diary"),p(),m(6,"button",4),w("click",function(){return i.close()}),m(7,"mat-icon"),v(8,"close"),p()()(),m(9,"mat-dialog-content",5)(10,"div",6)(11,"div",7)(12,"p",8),v(13,"Select a past day to read your diary entry."),p(),k(14,v1,2,0,"div",9)(15,y1,1,3,"mat-calendar",10),p(),m(16,"div",11),k(17,C1,5,0,"div",12)(18,D1,4,0,"div",13)(19,x1,7,1,"div",14)(20,E1,10,3,"div",15),p()()()()),e&2&&(h(14),T(i.datesLoading()?14:15),h(3),T(i.selectedDate()?i.entryLoading()?18:i.entryError()?19:i.entryContent()?20:-1:17))},dependencies:[Ht,An,rn,Uo,Pd,Ld,cn,ln,cu,lu,ea,pi,ax,Gs],styles:[".diary-modal[_ngcontent-%COMP%]{display:flex;flex-direction:column;max-height:90vh}.dialog-header[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;padding:16px 20px 8px;font-family:var(--reco-font);font-size:1.1rem}.header-icon[_ngcontent-%COMP%]{color:var(--reco-accent);font-size:1.3rem;width:1.3rem;height:1.3rem}.header-title[_ngcontent-%COMP%]{flex:1;font-weight:600;background:linear-gradient(90deg,var(--reco-primary),var(--reco-accent));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent}.close-btn[_ngcontent-%COMP%]{color:var(--reco-text-muted)}.close-btn[_ngcontent-%COMP%]:hover   mat-icon[_ngcontent-%COMP%]{color:var(--reco-error)}.dialog-body[_ngcontent-%COMP%]{padding:0!important;overflow:hidden}.diary-layout[_ngcontent-%COMP%]{display:flex;min-width:680px;max-width:900px;height:440px}.calendar-pane[_ngcontent-%COMP%]{flex:0 0 300px;padding:12px 16px;border-right:1px solid var(--reco-border);overflow-y:auto;display:flex;flex-direction:column;gap:8px}.calendar-hint[_ngcontent-%COMP%]{margin:0;font-family:var(--reco-font);font-size:.72rem;color:var(--reco-text-muted);font-style:italic}.calendar-loading[_ngcontent-%COMP%]{flex:1;display:flex;align-items:center;justify-content:center}[_nghost-%COMP%]     .diary-active-day .mat-calendar-body-cell-content{background-color:var(--reco-primary-dim)!important;color:var(--reco-primary)!important;font-weight:700}[_nghost-%COMP%]     .diary-active-day.mat-calendar-body-selected .mat-calendar-body-cell-content{background-color:var(--reco-primary)!important;color:#fff!important}.entry-pane[_ngcontent-%COMP%]{flex:1;padding:16px 20px;overflow-y:auto;display:flex;flex-direction:column}.entry-empty[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;color:var(--reco-text-muted);text-align:center;padding:24px}.entry-empty[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:48px;width:48px;height:48px;opacity:.3}.entry-empty[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;font-family:var(--reco-font);font-size:.88rem;font-style:italic;max-width:260px}.entry-loading[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;color:var(--reco-text-muted)}.entry-loading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;font-family:var(--reco-font);font-size:.85rem;font-style:italic}.entry-error[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;color:var(--reco-error)}.entry-error[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:36px;width:36px;height:36px}.entry-error[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;font-family:var(--reco-font);font-size:.875rem;text-align:center}.entry-content[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:10px}.entry-date-row[_ngcontent-%COMP%]{display:flex;align-items:center;gap:6px}.entry-date-label[_ngcontent-%COMP%]{flex:1;font-family:var(--reco-font);font-size:.78rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--reco-text-muted)}.regen-btn[_ngcontent-%COMP%]{color:var(--reco-text-muted);--mdc-icon-button-state-layer-size: 28px;--mdc-icon-button-icon-size: 16px}.regen-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:16px;width:16px;height:16px;transition:color .2s ease}.regen-btn[_ngcontent-%COMP%]:hover   mat-icon[_ngcontent-%COMP%]{color:var(--reco-primary)}.cache-badge[_ngcontent-%COMP%]{display:inline-block;padding:2px 8px;background:var(--reco-surface-2);border:1px solid var(--reco-border);border-radius:10px;font-family:var(--reco-font);font-size:.6rem;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:var(--reco-text-muted);align-self:flex-start}.entry-text[_ngcontent-%COMP%]{font-family:var(--reco-font);font-size:.9rem;line-height:1.75;color:var(--reco-text);white-space:pre-wrap}"]})};function M1(t,n){if(t&1){let e=de();m(0,"div",1)(1,"button",2),w("click",function(){j(e);let r=b();return H(r.action())}),v(2),p()()}if(t&2){let e=b();h(2),Ae(" ",e.data.action," ")}}var I1=["label"];function S1(t,n){}var k1=Math.pow(2,31)-1,Ys=class{_overlayRef;instance;containerInstance;_afterDismissed=new M;_afterOpened=new M;_onAction=new M;_durationTimeoutId;_dismissedByAction=!1;constructor(n,e){this._overlayRef=e,this.containerInstance=n,n._onExit.subscribe(()=>this._finishDismiss())}dismiss(){this._afterDismissed.closed||this.containerInstance.exit(),clearTimeout(this._durationTimeoutId)}dismissWithAction(){this._onAction.closed||(this._dismissedByAction=!0,this._onAction.next(),this._onAction.complete(),this.dismiss()),clearTimeout(this._durationTimeoutId)}closeWithAction(){this.dismissWithAction()}_dismissAfter(n){this._durationTimeoutId=setTimeout(()=>this.dismiss(),Math.min(n,k1))}_open(){this._afterOpened.closed||(this._afterOpened.next(),this._afterOpened.complete())}_finishDismiss(){this._overlayRef.dispose(),this._onAction.closed||this._onAction.complete(),this._afterDismissed.next({dismissedByAction:this._dismissedByAction}),this._afterDismissed.complete(),this._dismissedByAction=!1}afterDismissed(){return this._afterDismissed}afterOpened(){return this.containerInstance._onEnter}onAction(){return this._onAction}},lx=new y("MatSnackBarData"),aa=class{politeness="polite";announcementMessage="";viewContainerRef;duration=0;panelClass;direction;data=null;horizontalPosition="center";verticalPosition="bottom"},T1=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=$({type:t,selectors:[["","matSnackBarLabel",""]],hostAttrs:[1,"mat-mdc-snack-bar-label","mdc-snackbar__label"]})}return t})(),A1=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=$({type:t,selectors:[["","matSnackBarActions",""]],hostAttrs:[1,"mat-mdc-snack-bar-actions","mdc-snackbar__actions"]})}return t})(),R1=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=$({type:t,selectors:[["","matSnackBarAction",""]],hostAttrs:[1,"mat-mdc-snack-bar-action","mdc-snackbar__action"]})}return t})(),O1=(()=>{class t{snackBarRef=c(Ys);data=c(lx);constructor(){}action(){this.snackBarRef.dismissWithAction()}get hasAction(){return!!this.data.action}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=R({type:t,selectors:[["simple-snack-bar"]],hostAttrs:[1,"mat-mdc-simple-snack-bar"],exportAs:["matSnackBar"],decls:3,vars:2,consts:[["matSnackBarLabel",""],["matSnackBarActions",""],["matButton","","matSnackBarAction","",3,"click"]],template:function(i,r){i&1&&(m(0,"div",0),v(1),p(),k(2,M1,3,1,"div",1)),i&2&&(h(),Ae(" ",r.data.message,`
`),h(),T(r.hasAction?2:-1))},dependencies:[An,T1,A1,R1],styles:[`.mat-mdc-simple-snack-bar {
  display: flex;
}
.mat-mdc-simple-snack-bar .mat-mdc-snack-bar-label {
  max-height: 50vh;
  overflow: auto;
}
`],encapsulation:2,changeDetection:0})}return t})(),gg="_mat-snack-bar-enter",_g="_mat-snack-bar-exit",N1=(()=>{class t extends Bi{_ngZone=c(P);_elementRef=c(L);_changeDetectorRef=c(be);_platform=c(pe);_animationsDisabled=xe();snackBarConfig=c(aa);_document=c(K);_trackedModals=new Set;_enterFallback;_exitFallback;_injector=c(Y);_announceDelay=150;_announceTimeoutId;_destroyed=!1;_portalOutlet;_onAnnounce=new M;_onExit=new M;_onEnter=new M;_animationState="void";_live;_label;_role;_liveElementId=c(ye).getId("mat-snack-bar-container-live-");constructor(){super();let e=this.snackBarConfig;e.politeness==="assertive"&&!e.announcementMessage?this._live="assertive":e.politeness==="off"?this._live="off":this._live="polite",this._platform.FIREFOX&&(this._live==="polite"&&(this._role="status"),this._live==="assertive"&&(this._role="alert"))}attachComponentPortal(e){this._assertNotAttached();let i=this._portalOutlet.attachComponentPortal(e);return this._afterPortalAttached(),i}attachTemplatePortal(e){this._assertNotAttached();let i=this._portalOutlet.attachTemplatePortal(e);return this._afterPortalAttached(),i}attachDomPortal=e=>{this._assertNotAttached();let i=this._portalOutlet.attachDomPortal(e);return this._afterPortalAttached(),i};onAnimationEnd(e){e===_g?this._completeExit():e===gg&&(clearTimeout(this._enterFallback),this._ngZone.run(()=>{this._onEnter.next(),this._onEnter.complete()}))}enter(){this._destroyed||(this._animationState="visible",this._changeDetectorRef.markForCheck(),this._changeDetectorRef.detectChanges(),this._screenReaderAnnounce(),this._animationsDisabled?Qe(()=>{this._ngZone.run(()=>queueMicrotask(()=>this.onAnimationEnd(gg)))},{injector:this._injector}):(clearTimeout(this._enterFallback),this._enterFallback=setTimeout(()=>{this._elementRef.nativeElement.classList.add("mat-snack-bar-fallback-visible"),this.onAnimationEnd(gg)},200)))}exit(){return this._destroyed?He(void 0):(this._ngZone.run(()=>{this._animationState="hidden",this._changeDetectorRef.markForCheck(),this._elementRef.nativeElement.setAttribute("mat-exit",""),clearTimeout(this._announceTimeoutId),this._animationsDisabled?Qe(()=>{this._ngZone.run(()=>queueMicrotask(()=>this.onAnimationEnd(_g)))},{injector:this._injector}):(clearTimeout(this._exitFallback),this._exitFallback=setTimeout(()=>this.onAnimationEnd(_g),200))}),this._onExit)}ngOnDestroy(){this._destroyed=!0,this._clearFromModals(),this._completeExit()}_completeExit(){clearTimeout(this._exitFallback),queueMicrotask(()=>{this._onExit.next(),this._onExit.complete()})}_afterPortalAttached(){let e=this._elementRef.nativeElement,i=this.snackBarConfig.panelClass;i&&(Array.isArray(i)?i.forEach(a=>e.classList.add(a)):e.classList.add(i)),this._exposeToModals();let r=this._label.nativeElement,o="mdc-snackbar__label";r.classList.toggle(o,!r.querySelector(`.${o}`))}_exposeToModals(){let e=this._liveElementId,i=this._document.querySelectorAll('body > .cdk-overlay-container [aria-modal="true"]');for(let r=0;r<i.length;r++){let o=i[r],a=o.getAttribute("aria-owns");this._trackedModals.add(o),a?a.indexOf(e)===-1&&o.setAttribute("aria-owns",a+" "+e):o.setAttribute("aria-owns",e)}}_clearFromModals(){this._trackedModals.forEach(e=>{let i=e.getAttribute("aria-owns");if(i){let r=i.replace(this._liveElementId,"").trim();r.length>0?e.setAttribute("aria-owns",r):e.removeAttribute("aria-owns")}}),this._trackedModals.clear()}_assertNotAttached(){this._portalOutlet.hasAttached()}_screenReaderAnnounce(){this._announceTimeoutId||this._ngZone.runOutsideAngular(()=>{this._announceTimeoutId=setTimeout(()=>{if(this._destroyed)return;let e=this._elementRef.nativeElement,i=e.querySelector("[aria-hidden]"),r=e.querySelector("[aria-live]");if(i&&r){let o=null;this._platform.isBrowser&&document.activeElement instanceof HTMLElement&&i.contains(document.activeElement)&&(o=document.activeElement),i.removeAttribute("aria-hidden"),r.appendChild(i),o?.focus(),this._onAnnounce.next(),this._onAnnounce.complete()}},this._announceDelay)})}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=R({type:t,selectors:[["mat-snack-bar-container"]],viewQuery:function(i,r){if(i&1&&_e(On,7)(I1,7),i&2){let o;W(o=G())&&(r._portalOutlet=o.first),W(o=G())&&(r._label=o.first)}},hostAttrs:[1,"mdc-snackbar","mat-mdc-snack-bar-container"],hostVars:6,hostBindings:function(i,r){i&1&&w("animationend",function(a){return r.onAnimationEnd(a.animationName)})("animationcancel",function(a){return r.onAnimationEnd(a.animationName)}),i&2&&A("mat-snack-bar-container-enter",r._animationState==="visible")("mat-snack-bar-container-exit",r._animationState==="hidden")("mat-snack-bar-container-animations-enabled",!r._animationsDisabled)},features:[ve],decls:6,vars:3,consts:[["label",""],[1,"mdc-snackbar__surface","mat-mdc-snackbar-surface"],[1,"mat-mdc-snack-bar-label"],["aria-hidden","true"],["cdkPortalOutlet",""]],template:function(i,r){i&1&&(m(0,"div",1)(1,"div",2,0)(3,"div",3),it(4,S1,0,0,"ng-template",4),p(),B(5,"div"),p()()),i&2&&(h(5),O("aria-live",r._live)("role",r._role)("id",r._liveElementId))},dependencies:[On],styles:[`@keyframes _mat-snack-bar-enter {
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
`],encapsulation:2})}return t})(),F1=new y("mat-snack-bar-default-options",{providedIn:"root",factory:()=>new aa}),hu=(()=>{class t{_live=c(vs);_injector=c(Y);_breakpointObserver=c(bs);_parentSnackBar=c(t,{optional:!0,skipSelf:!0});_defaultConfig=c(F1);_animationsDisabled=xe();_snackBarRefAtThisLevel=null;simpleSnackBarComponent=O1;snackBarContainerComponent=N1;handsetCssClass="mat-mdc-snack-bar-handset";get _openedSnackBarRef(){let e=this._parentSnackBar;return e?e._openedSnackBarRef:this._snackBarRefAtThisLevel}set _openedSnackBarRef(e){this._parentSnackBar?this._parentSnackBar._openedSnackBarRef=e:this._snackBarRefAtThisLevel=e}constructor(){}openFromComponent(e,i){return this._attach(e,i)}openFromTemplate(e,i){return this._attach(e,i)}open(e,i="",r){let o=I(I({},this._defaultConfig),r);return o.data={message:e,action:i},o.announcementMessage===e&&(o.announcementMessage=void 0),this.openFromComponent(this.simpleSnackBarComponent,o)}dismiss(){this._openedSnackBarRef&&this._openedSnackBarRef.dismiss()}ngOnDestroy(){this._snackBarRefAtThisLevel&&this._snackBarRefAtThisLevel.dismiss()}_attachSnackBarContainer(e,i){let r=i&&i.viewContainerRef&&i.viewContainerRef.injector,o=Y.create({parent:r||this._injector,providers:[{provide:aa,useValue:i}]}),a=new Ut(this.snackBarContainerComponent,i.viewContainerRef,o),s=e.attach(a);return s.instance.snackBarConfig=i,s.instance}_attach(e,i){let r=I(I(I({},new aa),this._defaultConfig),i),o=this._createOverlay(r),a=this._attachSnackBarContainer(o,r),s=new Ys(a,o);if(e instanceof st){let l=new on(e,null,{$implicit:r.data,snackBarRef:s});s.instance=a.attachTemplatePortal(l)}else{let l=this._createInjector(r,s),d=new Ut(e,void 0,l),u=a.attachComponentPortal(d);s.instance=u.instance}return this._breakpointObserver.observe(z0.HandsetPortrait).pipe(Ee(o.detachments())).subscribe(l=>{o.overlayElement.classList.toggle(this.handsetCssClass,l.matches)}),r.announcementMessage&&a._onAnnounce.subscribe(()=>{this._live.announce(r.announcementMessage,r.politeness)}),this._animateSnackBar(s,r),this._openedSnackBarRef=s,this._openedSnackBarRef}_animateSnackBar(e,i){e.afterDismissed().subscribe(()=>{this._openedSnackBarRef==e&&(this._openedSnackBarRef=null),i.announcementMessage&&this._live.clear()}),i.duration&&i.duration>0&&e.afterOpened().subscribe(()=>e._dismissAfter(i.duration)),this._openedSnackBarRef?(this._openedSnackBarRef.afterDismissed().subscribe(()=>{e.containerInstance.enter()}),this._openedSnackBarRef.dismiss()):e.containerInstance.enter()}_createOverlay(e){let i=new an;i.direction=e.direction;let r=di(this._injector),o=e.direction==="rtl",a=e.horizontalPosition==="left"||e.horizontalPosition==="start"&&!o||e.horizontalPosition==="end"&&o,s=!a&&e.horizontalPosition!=="center";return a?r.left("0"):s?r.right("0"):r.centerHorizontally(),e.verticalPosition==="top"?r.top("0"):r.bottom("0"),i.positionStrategy=r,i.disableAnimations=this._animationsDisabled,sn(this._injector,i)}_createInjector(e,i){let r=e&&e.viewContainerRef&&e.viewContainerRef.injector;return Y.create({parent:r||this._injector,providers:[{provide:Ys,useValue:i},{provide:lx,useValue:e.data}]})}static \u0275fac=function(i){return new(i||t)};static \u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var sa=class t{constructor(n){this.http=n}addToPlaylist(n){return this.http.post("/api/clementine/add",{filePaths:n})}static \u0275fac=function(e){return new(e||t)(V(at))};static \u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"})};var Wi=class t{constructor(n){this.http=n}logTrackEvent(n,e,i,r,o){let a={eventType:n,artist:e,album:i,title:r,durationSeconds:o??null,timestamp:new Date().toISOString()};return this.http.post("/api/session/events",a)}getMemoryStatus(){return this.http.get("/api/session/memory")}bustMemory(){return this.http.delete("/api/session/memory")}getHistory(){return this.http.get("/api/session/history")}getEnrichedSuggestions(n){return this.http.get(`/api/session/reply/${n}/suggestions`)}setActiveReply(n){return this.http.post("/api/session/active-reply",{replyId:n})}static \u0275fac=function(e){return new(e||t)(V(at))};static \u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"})};function P1(t,n){if(t&1){let e=de();m(0,"img",14),w("error",function(){j(e);let r=b();return H(r.onArtError())}),p()}if(t&2){let e=b();E("src",e.suggestion().albumArtUrl,Ka)("alt",e.suggestion().album||e.suggestion().title)}}function L1(t,n){t&1&&(m(0,"div",3)(1,"mat-icon",15),v(2,"album"),p()())}function V1(t,n){if(t&1){let e=de();m(0,"button",16),w("click",function(r){return j(e),b().copyToClipboard(),H(r.stopPropagation())}),m(1,"mat-icon"),v(2,"content_copy"),p()()}if(t&2){let e=b();O("aria-label","Copy "+e.suggestion().artist+" \u2013 "+e.suggestion().title+" to clipboard")}}function B1(t,n){if(t&1){let e=de();m(0,"a",17),w("click",function(r){return j(e),b().onYouTubeClick(),H(r.stopPropagation())}),B(1,"img",18),m(2,"span"),v(3,"YouTube"),p()()}if(t&2){let e=b();E("href",e.youtubeUrl(),Ka),O("aria-label","Search "+e.suggestion().artist+" \u2013 "+e.suggestion().title+" on YouTube")}}function j1(t,n){if(t&1){let e=de();m(0,"button",19),w("click",function(r){return j(e),b().addToClementine(),H(r.stopPropagation())}),B(1,"img",20),p()}if(t&2){let e=b();E("disabled",e.addingToPlaylist()),O("aria-label","Add "+e.suggestion().artist+" \u2013 "+e.suggestion().title+" to Clementine playlist")}}var gu=class t{constructor(n,e,i){this.snackBar=n;this.playlistService=e;this.sessionService=i}suggestion=Jt.required();clementineUnavailable=Jt(!1);addingToPlaylist=x(!1);artFailed=x(!1);hasArt=ke(()=>!!this.suggestion().albumArtUrl&&!this.artFailed());youtubeUrl=ke(()=>`https://www.youtube.com/results?search_query=${encodeURIComponent(`${this.suggestion().artist} ${this.suggestion().title}`)}`);lyricsUrl=ke(()=>{let n=this.suggestion(),e=i=>i.toLowerCase().replace(/&/g,"and").replace(/\s+/g,"-").replace(/[^a-z0-9-]/g,"");return`https://genius.com/${e(n.artist)}-${e(n.title)}-lyrics`});onArtError(){this.artFailed.set(!0)}copyToClipboard(){let n=this.suggestion(),e=`${n.artist} \u2013 ${n.title}`;navigator.clipboard.writeText(e).then(()=>this.snackBar.open(`Copied: ${e}`,void 0,{duration:2e3}),()=>this.snackBar.open("Could not copy to clipboard","Dismiss",{duration:4e3}))}onYouTubeClick(){let n=this.suggestion();this.sessionService.logTrackEvent("track-youtube",n.artist,n.album??null,n.title,n.durationSeconds??null).subscribe({error:()=>{}})}addToClementine(){let n=this.suggestion();if(!n.filePath||this.addingToPlaylist())return;this.addingToPlaylist.set(!0);let e=Date.now(),i=()=>{let r=Date.now()-e;setTimeout(()=>this.addingToPlaylist.set(!1),Math.max(0,1e3-r))};this.playlistService.addToPlaylist([n.filePath]).subscribe({next:()=>{this.snackBar.open(`Added to Clementine: ${n.artist} \u2013 ${n.title}`,void 0,{duration:2e3}),this.sessionService.logTrackEvent("track-added",n.artist,n.album??null,n.title,n.durationSeconds??null).subscribe({error:()=>{}}),i()},error:()=>{this.snackBar.open("Could not add to Clementine playlist","Dismiss",{duration:4e3}),i()}})}static \u0275fac=function(e){return new(e||t)(J(hu),J(sa),J(Wi))};static \u0275cmp=R({type:t,selectors:[["app-suggestion-card"]],inputs:{suggestion:[1,"suggestion"],clementineUnavailable:[1,"clementineUnavailable"]},decls:18,vars:15,consts:[[1,"tile"],[1,"tile-art"],[1,"art-img",3,"src","alt"],[1,"art-placeholder"],["mat-icon-button","",1,"art-overlay-btn"],[1,"tile-info"],[1,"tile-title"],[1,"tile-artist"],[1,"tile-album"],[1,"tile-footer"],["target","_blank","rel","noopener noreferrer",1,"footer-action","footer-action--link",3,"href"],["mat-icon-button","",1,"footer-action","footer-action--btn",3,"disabled"],["target","_blank","rel","noopener noreferrer",1,"footer-action","footer-action--lyrics",3,"click","href"],[1,"lyrics-icon"],[1,"art-img",3,"error","src","alt"],["aria-hidden","true"],["mat-icon-button","",1,"art-overlay-btn",3,"click"],["target","_blank","rel","noopener noreferrer",1,"footer-action","footer-action--link",3,"click","href"],["src","/icons/youtube.svg","alt","","aria-hidden","true",1,"footer-icon"],["mat-icon-button","",1,"footer-action","footer-action--btn",3,"click","disabled"],["src","/icons/clementine_addmore.png","alt","","aria-hidden","true",1,"footer-icon"]],template:function(e,i){e&1&&(m(0,"div",0)(1,"div",1),k(2,P1,1,2,"img",2)(3,L1,3,0,"div",3),k(4,V1,3,1,"button",4),p(),m(5,"div",5)(6,"span",6),v(7),p(),m(8,"span",7),v(9),p(),m(10,"span",8),v(11),p()(),m(12,"div",9),k(13,B1,4,2,"a",10),k(14,j1,2,2,"button",11),m(15,"a",12),w("click",function(o){return o.stopPropagation()}),m(16,"mat-icon",13),v(17,"lyrics"),p()()()()),e&2&&(A("tile--local",i.suggestion().inLocalLibrary)("tile--discovery",!i.suggestion().inLocalLibrary&&!i.clementineUnavailable()),h(2),T(i.hasArt()?2:3),h(2),T(i.suggestion().inLocalLibrary?4:-1),h(3),ne(i.suggestion().title),h(2),ne(i.suggestion().artist),h(),Ct("visibility",i.suggestion().album?"visible":"hidden"),h(),Ae(" ",i.suggestion().album||"\xA0"," "),h(2),T(i.suggestion().inLocalLibrary?-1:13),h(),T(i.suggestion().inLocalLibrary&&!i.clementineUnavailable()?14:-1),h(),E("href",i.lyricsUrl(),Ka),O("aria-label","Find lyrics for "+i.suggestion().title+" by "+i.suggestion().artist+" on Genius"))},dependencies:[cn,ln,Ht,rn],styles:[".tile[_ngcontent-%COMP%]{width:100%;height:100%;display:flex;flex-direction:column;border-radius:10px;overflow:hidden;background:var(--reco-surface-1);border:2px solid var(--reco-accent);transition:transform .18s ease,box-shadow .18s ease;cursor:default}.tile--local[_ngcontent-%COMP%]{box-shadow:0 0 0 0 var(--reco-accent-dim)}.tile--discovery[_ngcontent-%COMP%]{border-color:#c8006b47;box-shadow:0 0 0 0 var(--reco-accent-dim)}.tile--discovery[_ngcontent-%COMP%]   .tile-art[_ngcontent-%COMP%], .tile--discovery[_ngcontent-%COMP%]   .tile-info[_ngcontent-%COMP%]{opacity:.22}.tile[_ngcontent-%COMP%]:hover{transform:translateY(-3px);box-shadow:0 6px 20px var(--reco-accent-dim)}.tile[_ngcontent-%COMP%]:hover   .art-overlay-btn[_ngcontent-%COMP%]{opacity:1}.tile-art[_ngcontent-%COMP%]{position:relative;width:100%;aspect-ratio:1;overflow:hidden;background:var(--reco-surface-2);flex-shrink:0}.art-img[_ngcontent-%COMP%]{width:100%;height:100%;object-fit:cover;display:block}.art-placeholder[_ngcontent-%COMP%]{width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:var(--reco-text-disabled)}.art-placeholder[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:48px;width:48px;height:48px}.art-overlay-btn[_ngcontent-%COMP%]{position:absolute;bottom:4px;left:4px;width:28px;height:28px;border-radius:6px;background:#0000008c;color:var(--reco-accent);opacity:0;transition:opacity .15s ease;--mdc-icon-button-icon-size: 14px;--mdc-icon-button-state-layer-size: 28px}.art-overlay-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:14px;width:14px;height:14px}.tile-info[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:column;gap:2px;padding:8px 10px 4px;min-height:0}.tile-title[_ngcontent-%COMP%]{font-family:var(--reco-font);font-size:.8rem;font-weight:600;color:var(--reco-accent);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.tile-artist[_ngcontent-%COMP%]{font-family:var(--reco-font);font-size:.72rem;color:var(--reco-text-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.tile-album[_ngcontent-%COMP%]{font-family:var(--reco-font);font-size:.68rem;color:var(--reco-text-disabled);font-style:italic;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.tile-footer[_ngcontent-%COMP%]{display:flex;align-items:center;padding:2px 6px 6px;min-height:32px;gap:4px}.footer-action[_ngcontent-%COMP%]{display:flex;align-items:center;gap:4px;font-family:var(--reco-font);font-size:.68rem;font-weight:500;opacity:.6;transition:opacity .15s ease;text-decoration:none}.footer-action[_ngcontent-%COMP%]:hover{opacity:1}.footer-action--link[_ngcontent-%COMP%]{color:var(--reco-text-muted)}.footer-action--btn[_ngcontent-%COMP%]{color:var(--reco-accent);--mdc-icon-button-icon-size: 16px;--mdc-icon-button-state-layer-size: 28px}.footer-action--btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:16px;width:16px;height:16px}.footer-action--btn[disabled][_ngcontent-%COMP%]{opacity:.25}.footer-icon[_ngcontent-%COMP%]{width:16px;height:16px;flex-shrink:0}.footer-action--lyrics[_ngcontent-%COMP%]{margin-left:auto;color:var(--reco-accent);display:flex;align-items:center;opacity:.6;transition:opacity .15s ease}.footer-action--lyrics[_ngcontent-%COMP%]:hover{opacity:1}.lyrics-icon[_ngcontent-%COMP%]{font-size:16px;width:16px;height:16px}"]})};var H1=(t,n)=>n.title+n.artist;function U1(t,n){t&1&&(m(0,"div",4),B(1,"span")(2,"span")(3,"span")(4,"span"),p())}function z1(t,n){if(t&1){let e=de();m(0,"button",9),w("click",function(){j(e);let r=b();return H(r.addAllToClementine())}),B(1,"img",10),v(2),p()}if(t&2){let e=b();E("disabled",e.addingAll()),O("aria-label","Add all "+e.localFilePaths().length+" local tracks to Clementine playlist"),h(2),Ae(" Add ",e.localFilePaths().length," to Clementine ")}}function $1(t,n){if(t&1&&(m(0,"div",6)(1,"span"),v(2),p()()),t&2){let e=b();h(2),ne(e.loadingLabel())}}function W1(t,n){t&1&&(m(0,"div",7)(1,"mat-icon",2),v(2,"warning_amber"),p(),m(3,"span"),v(4,"Suggestions unavailable right now."),p()())}function G1(t,n){if(t&1&&(m(0,"div",8)(1,"mat-icon",2),v(2,"search_off"),p(),m(3,"span"),v(4),p()()),t&2){let e=b();h(4),ne(e.message())}}function Y1(t,n){if(t&1&&(m(0,"div",12),B(1,"app-suggestion-card",14),p()),t&2){let e=n.$implicit,i=b(2);h(),E("suggestion",e)("clementineUnavailable",i.clementineUnavailable())}}function q1(t,n){if(t&1&&(m(0,"p",13),v(1),p()),t&2){let e=b(2);h(),ne(e.message())}}function Z1(t,n){if(t&1&&(m(0,"div",11),lt(1,Y1,2,2,"div",12,H1),p(),k(3,q1,2,1,"p",13)),t&2){let e=b();h(),ct(e.suggestions()),h(2),T(e.message()?3:-1)}}var _u=class t{constructor(n,e,i){this.playlistService=n;this.snackBar=e;this.sessionService=i}suggestions=Jt([]);loading=Jt(!1);error=Jt(!1);message=Jt(null);loadingLabel=Jt("Searching your library\u2026");clementineUnavailable=Jt(!1);addingAll=x(!1);localTracks=ke(()=>this.suggestions().filter(n=>n.inLocalLibrary&&n.filePath));localFilePaths=ke(()=>this.localTracks().map(n=>n.filePath));addAllToClementine(){let n=this.localTracks(),e=this.localFilePaths();if(e.length===0||this.addingAll())return;this.addingAll.set(!0);let i=Date.now(),r=()=>{let o=Date.now()-i;setTimeout(()=>this.addingAll.set(!1),Math.max(0,1e3-o))};this.playlistService.addToPlaylist(e).subscribe({next:()=>{this.snackBar.open(`Added ${e.length} track(s) to Clementine`,void 0,{duration:2500});for(let o of n)this.sessionService.logTrackEvent("track-added",o.artist,o.album??null,o.title,o.durationSeconds??null).subscribe({error:()=>{}});r()},error:()=>{this.snackBar.open("Could not add tracks to Clementine","Dismiss",{duration:4e3}),r()}})}static \u0275fac=function(e){return new(e||t)(J(sa),J(hu),J(Wi))};static \u0275cmp=R({type:t,selectors:[["app-suggestions-panel"]],inputs:{suggestions:[1,"suggestions"],loading:[1,"loading"],error:[1,"error"],message:[1,"message"],loadingLabel:[1,"loadingLabel"],clementineUnavailable:[1,"clementineUnavailable"]},decls:12,vars:3,consts:[["aria-label","Track suggestions",1,"suggestions-panel"],[1,"panel-header"],["aria-hidden","true"],[1,"panel-title"],["role","status","aria-label","Loading suggestions",1,"music-bars"],["mat-stroked-button","",1,"add-all-btn",3,"disabled"],["aria-live","polite",1,"panel-state","panel-state--loading"],["role","alert",1,"panel-state","panel-state--error"],[1,"panel-state","panel-state--empty"],["mat-stroked-button","",1,"add-all-btn",3,"click","disabled"],["src","/icons/clementine_addmore.png","alt","","aria-hidden","true",1,"add-all-icon"],["role","list",1,"track-list"],["role","listitem"],[1,"panel-note"],[3,"suggestion","clementineUnavailable"]],template:function(e,i){e&1&&(m(0,"section",0)(1,"div",1)(2,"mat-icon",2),v(3,"queue_music"),p(),m(4,"span",3),v(5,"What I hear in your words"),p(),k(6,U1,5,0,"div",4),k(7,z1,3,3,"button",5),p(),k(8,$1,3,1,"div",6)(9,W1,5,0,"div",7)(10,G1,5,1,"div",8)(11,Z1,4,1),p()),e&2&&(h(6),T(i.loading()?6:-1),h(),T(!i.clementineUnavailable()&&i.localFilePaths().length>0?7:-1),h(),T(i.loading()&&i.suggestions().length===0?8:i.error()?9:i.suggestions().length===0&&i.message()?10:i.suggestions().length>0?11:-1))},dependencies:[cn,ln,Ht,An,gu],styles:["[_nghost-%COMP%]{display:block;background:var(--reco-surface-0);flex-shrink:0}.suggestions-panel[_ngcontent-%COMP%]{padding:12px 16px 14px}.panel-header[_ngcontent-%COMP%]{display:flex;align-items:center;gap:6px;margin-bottom:12px;color:var(--reco-text);font-family:var(--reco-font);font-size:.84rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase}.panel-title[_ngcontent-%COMP%]{flex:1;background:linear-gradient(90deg,var(--reco-primary),var(--reco-accent));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent}.music-bars[_ngcontent-%COMP%]{display:inline-flex;align-items:flex-end;gap:2px;height:14px;margin-left:4px}.music-bars[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{display:block;width:3px;background:var(--reco-accent);border-radius:1px;animation:_ngcontent-%COMP%_bar-dance .9s ease-in-out infinite}.music-bars[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(1){animation-delay:0s}.music-bars[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(2){animation-delay:.2s}.music-bars[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(3){animation-delay:.4s}.music-bars[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(4){animation-delay:.6s}@keyframes _ngcontent-%COMP%_bar-dance{0%,to{height:3px}50%{height:14px}}.add-all-btn[_ngcontent-%COMP%]{--mat-button-outlined-label-text-color: var(--reco-accent);--mat-button-outlined-outline-color: var(--reco-accent);font-family:var(--reco-font);font-size:.72rem;font-weight:500;height:28px;line-height:28px;padding:0 10px;color:var(--reco-accent);border-color:var(--reco-accent)!important}.add-all-btn[_ngcontent-%COMP%]   .add-all-icon[_ngcontent-%COMP%]{width:15px;height:15px;margin-right:4px;flex-shrink:0;vertical-align:middle}.add-all-btn[disabled][_ngcontent-%COMP%]{opacity:.4}.panel-state[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;padding:10px 4px;font-family:var(--reco-font);font-size:.875rem;color:var(--reco-text-muted)}.panel-state--error[_ngcontent-%COMP%]{color:var(--reco-error)}.panel-state--loading[_ngcontent-%COMP%]{font-style:italic;color:var(--reco-primary)}.track-list[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px}.panel-note[_ngcontent-%COMP%]{margin:10px 4px 0;font-family:var(--reco-font);font-size:.72rem;font-style:italic;color:var(--reco-text-muted)}"]})};var ux=[{value:"normal",label:"Normal"},{value:"poetic",label:"Poetic"},{value:"humorous",label:"Humorous"},{value:"cosmic",label:"Cosmic"},{value:"minimalist",label:"Minimalist"},{value:"romantic",label:"Romantic"},{value:"chaotic",label:"Chaotic"},{value:"noir",label:"Noir"},{value:"psychedelic",label:"Psychedelic"}];var K1=(t,n)=>n.value;function Q1(t,n){if(t&1){let e=de();m(0,"button",7),w("click",function(){let r=j(e).$implicit,o=b();return H(o.select(r.value))}),m(1,"mat-icon",8),v(2),p(),v(3),p()}if(t&2){let e=n.$implicit,i=b();A("mood-menu-item--active",i.currentMood()===e.value),h(2),ne(i.currentMood()===e.value?"check":""),h(),Ae(" ",e.label," ")}}var bu=class t{currentMood=Jt("normal");moodSelected=Hy();moods=ux;moodLabel=ke(()=>{let n=this.currentMood();return n?n.charAt(0).toUpperCase()+n.slice(1):"Normal"});select(n){this.moodSelected.emit(n)}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=R({type:t,selectors:[["app-mood-picker"]],inputs:{currentMood:[1,"currentMood"]},outputs:{moodSelected:"moodSelected"},decls:11,vars:2,consts:[["picker","matMenu"],["aria-label","Change mood",1,"mood-trigger",3,"matMenuTriggerFor"],[1,"mood-trigger-label"],[1,"mood-trigger-icon"],["xPosition","before",1,"mood-menu"],[1,"mood-menu-title",3,"click"],["mat-menu-item","",1,"mood-menu-item",3,"mood-menu-item--active"],["mat-menu-item","",1,"mood-menu-item",3,"click"],[1,"mood-check"]],template:function(e,i){if(e&1&&(m(0,"button",1)(1,"span",2),v(2),p(),m(3,"mat-icon",3),v(4,"expand_circle_down"),p()(),m(5,"mat-menu",4,0)(7,"div",5),w("click",function(o){return o.stopPropagation()}),v(8,"Change my mood"),p(),lt(9,Q1,4,4,"button",6,K1),p()),e&2){let r=yt(6);E("matMenuTriggerFor",r),h(2),ne(i.moodLabel()),h(7),ct(i.moods)}},dependencies:[cn,ln,ru,$i,$r,iu],styles:[`:host{display:inline-flex}.mood-trigger{display:inline-flex;align-items:center;gap:3px;background:none;border:none;padding:0;cursor:pointer;color:#fff9}.mood-trigger:hover{color:#fff}.mood-trigger-label{font-family:var(--reco-font);font-size:.58rem;font-weight:600;line-height:1;letter-spacing:.04em;text-transform:uppercase}.mood-trigger-icon{font-size:12px;width:12px;height:12px;line-height:1}.mood-menu{background:var(--reco-surface-1);border:1px solid var(--reco-border);border-radius:10px;min-width:160px;box-shadow:0 8px 24px #00000040}.mood-menu-title{padding:8px 14px 4px;font-family:var(--reco-font);font-size:.65rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--reco-text-muted);pointer-events:none;-webkit-user-select:none;user-select:none}.mood-menu-item{font-family:var(--reco-font);font-size:.82rem;color:var(--reco-text)}.mood-menu-item--active{color:var(--reco-accent);font-weight:600}.mood-check{font-size:14px;width:14px;height:14px;margin-right:6px;flex-shrink:0}
`],encapsulation:2})};var vu=class t{constructor(n){this.sanitizer=n}transform(n){let i=n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>").replace(/\*\*(.+?)\*\*/gs,"<strong>$1</strong>");return this.sanitizer.bypassSecurityTrustHtml(i)}static \u0275fac=function(e){return new(e||t)(J(Or,16))};static \u0275pipe=$c({name:"boldMarkdown",type:t,pure:!0})};var yu=class t{constructor(n){this.http=n}getRecommendations(n,e="gemini",i="normal",r,o,a){return this.http.post("/api/recommendations",{prompt:n,provider:e,mood:i,locationContext:r??null,weatherContext:o??null,promptSetName:a??null})}static \u0275fac=function(e){return new(e||t)(V(at))};static \u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"})};var Cu=class t{constructor(n){this.http=n;this.init()}locationLabel=x(null);locationContext=x(null);weatherContext=x(null);async init(){try{let n=await nr(this.http.get("https://geo.kamero.ai/api/geo")),e=fx(n.city),i=fx(n.country),r=[e,i].filter(Boolean);r.length>0&&(this.locationLabel.set(r.join(", ")),this.locationContext.set(`The user is located in ${r.join(", ")}.`));let o=parseFloat(n.latitude),a=parseFloat(n.longitude),l=(await nr(this.http.get(`https://api.open-meteo.com/v1/forecast?latitude=${o}&longitude=${a}&current_weather=true`))).current_weather,d=J1(l.temperature),u=eN(l.windspeed),f=tN(l.weathercode);this.weatherContext.set(`Outside it is ${f}, there is ${u} and as temperature is ${d}`)}catch{}}static \u0275fac=function(e){return new(e||t)(V(at))};static \u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"})};function fx(t){return!t||t.trim()===""||t.trim().toLowerCase()==="undefined"?null:t.trim()}function J1(t){return t<=3?"Very Cold":t<=6?"Cold":t<=10?"Chill":t<=15?"Normal":t<=20?"Nice":t<=28?"Warm":t<=35?"Hot":"Burning hot"}function eN(t){return t<=15?"no wind":t<=30?"a light wind":t<=50?"windy":t<=100?"a strong wind":"a hurricane"}function tN(t){return t===0?"a clear sky":t>=1&&t<=3?"partly cloudy":t>=45&&t<=48?"fog":t>=51&&t<=57?"drizzling":t>=61&&t<=65?"raining":t>=71&&t<=75?"snowing":t>=80&&t<=82?"raining":t>=85&&t<=86?"snowing":t>=95&&t<=99?"a thunderstorm":"partly cloudy"}var iN=["messageList"],rN=["promptInput"],oN=["splitContainer"],aN=(t,n)=>n.id;function sN(t,n){if(t&1&&(m(0,"mat-icon",37),v(1,"location_on"),p(),m(2,"span"),v(3),p()),t&2){let e=b();h(3),ne(e.geoWeatherService.locationLabel())}}function lN(t,n){if(t&1&&(m(0,"mat-option",39),v(1),p()),t&2){let e=n.$implicit;E("value",e.name),h(),ne(e.name)}}function cN(t,n){if(t&1){let e=de();m(0,"mat-form-field",11)(1,"mat-select",38),w("selectionChange",function(r){j(e);let o=b();return H(o.onPromptSetChange(r.value))}),lt(2,lN,2,2,"mat-option",39,aN),p()()}if(t&2){let e,i=b();h(),E("value",(e=i.promptSetService.activePromptSet())==null?null:e.name),h(),ct(i.promptSetService.promptSets())}}function dN(t,n){t&1&&(m(0,"div",18)(1,"mat-icon",37),v(2,"cloud"),p(),m(3,"span"),v(4,"Inner Voice unavailable \u2014 Cosmic Voice stepped in"),p()())}function uN(t,n){if(t&1&&(m(0,"p",42),v(1),p()),t&2){let e=b(2);h(),ne(e.displayHint())}}function fN(t,n){if(t&1&&(m(0,"div",22),B(1,"img",40),m(2,"p",41),v(3,"What does your mind sound like today?"),p(),k(4,uN,2,1,"p",42),p()),t&2){let e=b();h(4),T(e.displayHint()?4:-1)}}function mN(t,n){if(t&1){let e=de();m(0,"button",50),w("click",function(){j(e);let r=b(2).$implicit,o=b();return H(o.activateReply(r.eventId))}),m(1,"mat-icon"),v(2,"history"),p()()}}function pN(t,n){if(t&1){let e=de();m(0,"button",51),w("click",function(){j(e);let r=b(2).$index,o=b();return H(o.toggleExpand(r))}),v(1),p()}if(t&2){let e=b(2).$index,i=b();h(),Ae(" ",i.expandedBubbles().has(e)?"Show Less":"Show More..."," ")}}function hN(t,n){if(t&1&&(m(0,"div",44)(1,"div",45),k(2,mN,3,0,"button",46),B(3,"div",47),Rp(4,"boldMarkdown"),m(5,"span",48),v(6),p()(),k(7,pN,2,1,"button",49),p()),t&2){let e=b(),i=e.$implicit,r=e.$index,o=b();h(),A("message-bubble--active",i.eventId!==void 0&&i.eventId===o.activeReplyId())("message-bubble--has-rewind",i.hasSuggestions&&i.eventId!==void 0&&i.eventId!==o.activeReplyId())("message-bubble--clamped",o.isTruncated(r)),O("data-msg-index",r),h(),T(i.hasSuggestions&&i.eventId!==void 0&&i.eventId!==o.activeReplyId()?2:-1),h(),E("innerHTML",Op(4,11,i.text),Jm),h(3),ne(o.formatMessageTime(i.timestamp)),h(),T(o.showToggle(r)?7:-1)}}function gN(t,n){if(t&1){let e=de();m(0,"div",45)(1,"app-mood-picker",52),w("moodSelected",function(r){j(e);let o=b().$implicit,a=b();return H(a.onMoodSelected(r,o))}),p(),m(2,"span"),v(3),p(),m(4,"span",48),v(5),p()()}if(t&2){let e=b().$implicit,i=b();h(),E("currentMood",e.mood??"normal"),h(2),ne(e.text),h(2),ne(i.formatMessageTime(e.timestamp))}}function _N(t,n){if(t&1&&(m(0,"div",43),k(1,hN,8,13,"div",44)(2,gN,6,3,"div",45),p()),t&2){let e=n.$implicit;A("message--user",e.role==="user")("message--model",e.role==="model"),h(),T(e.role==="model"?1:2)}}function bN(t,n){if(t&1&&(m(0,"span",57),v(1),p()),t&2){let e=b(2);h(),ne(e.retryNotice())}}function vN(t,n){if(t&1&&(m(0,"div",24)(1,"div",53)(2,"div",54)(3,"mat-icon",55),v(4,"music_note"),p(),m(5,"span",56),v(6),p()(),k(7,bN,2,1,"span",57),p()()),t&2){let e=b();h(6),ne(e.loadingPhrase()),h(),T(e.retryNotice()?7:-1)}}function yN(t,n){if(t&1&&(m(0,"div",58)(1,"mat-icon",37),v(2),p(),m(3,"span"),v(4),p()()),t&2){let e=b();A("error-banner--rate-limit",e.errorIsRateLimit()),h(2),ne(e.errorIsRateLimit()?"schedule":"error_outline"),h(2),ne(e.error())}}function CN(t,n){if(t&1){let e=de();m(0,"button",59),w("click",function(){let r=j(e).$implicit,o=b();return H(o.selectSuggestion(r))}),v(1),p()}if(t&2){let e=n.$implicit;h(),ne(e)}}function DN(t,n){if(t&1&&B(0,"app-suggestions-panel",35),t&2){let e=b();E("suggestions",e.suggestions())("loading",e.suggestionsLoading())("error",e.suggestionsError())("message",e.suggestionsMessage())("loadingLabel",e.loadingPhrase())("clementineUnavailable",e.clementineUnavailable())}}function xN(t,n){if(t&1&&(m(0,"p",60),v(1),p()),t&2){let e=b(2);h(),ne(e.loadingPhrase())}}function wN(t,n){t&1&&(m(0,"p"),v(1,"This is where your mind's music will take shape."),p())}function EN(t,n){if(t&1&&(m(0,"div",36)(1,"mat-icon",37),v(2,"queue_music"),p(),k(3,xN,2,1,"p",60)(4,wN,2,0,"p"),p()),t&2){let e=b();h(3),T(e.loading()?3:4)}}var mx="reco-provider",vg=["Holding the note","Staying on the downbeat","Lingering in the intro","Looping the pre\u2011chorus","Riding the sustain pedal","Tuning up forever","Hovering on the fermata","Chilling in the green room","Stuck in soundcheck mode","Spinning the vinyl before the needle drops","Hanging on the last chord","Paused between tracks","Letting the beat simmer","Idling in the bridge","Waiting for the bass to kick in","Floating in reverb","Queued in the playlist","Stuck in the encore gap","Listening to the orchestra warm up","Waiting for the DJ to unmute"],MN=220,IN=25,Du=class t{constructor(n,e,i,r,o,a,s){this.recommendationService=n;this.sessionService=e;this.settingsService=i;this.geoWeatherService=r;this.promptSetService=o;this.dialog=a;this.ngZone=s;vn(()=>{this.loading()?this.typewriterStart(this.randomPhrase()):this.typewriterStop()})}messageListRef;promptInputRef;containerRef;messages=x([]);prompt=x("");loading=x(!1);error=x(null);errorIsRateLimit=x(!1);suggestions=x([]);suggestionsLoading=x(!1);suggestionsError=x(!1);suggestionsMessage=x(null);hasSuggestions=x(!1);activeReplyId=x(null);retryNotice=x(null);truncatedBubbles=x(new Set);expandedBubbles=x(new Set);bubbleNaturalHeights=new Map;resizeObserver;pendingMeasure=!1;loadingPhrase=x(vg[0]);tryLines=x([]);displayHint=x("");provider=x(localStorage.getItem(mx)??"gemini");usedFallback=x(!1);useLocation=x(!1);useWeather=x(!1);memoryUsed=x(0);memoryTotal=x(25);memoryFill=ke(()=>this.memoryTotal()>0?this.memoryUsed()/this.memoryTotal():0);memoryHigh=ke(()=>this.memoryFill()>.8);sessionDisabled=ke(()=>this.promptSetService.activePromptSet()?.useSession===!1);splitPercent=x(40);dragging=!1;containerWidth=0;clementineUnavailable=ke(()=>this.suggestionsMessage()?.includes("local library is currently unavailable")===!0);shouldScroll=!1;shouldFocusInput=!1;typewriterTimeout=null;fallbackTimer=null;RETRY_DELAYS=[3e3,5e3,7e3,1e4];HISTORY_LIMIT=50;promptHistory=[];historyIndex=-1;currentDraft="";async ngOnInit(){await this.promptSetService.init();let n=this.promptSetService.activePromptSet();n?.useSession===!1?(this.memoryUsed.set(0),this.memoryTotal.set(0)):this.refreshMemory(),this.loadEnvSettings();try{let r=(await(await fetch("/trylines.txt")).text()).split(`
`).map(o=>o.trim().replace(/^Try:\s*"/,"").replace(/"$/,"").trim()).filter(o=>o.length>0);r.length>0&&(this.tryLines.set(r),this.displayHint.set(r[Math.floor(Math.random()*r.length)]))}catch{}n?.useSession!==!1&&await this.hydrate()}ngAfterViewInit(){if(this.focusPromptInput(),typeof ResizeObserver<"u"){this.resizeObserver=new ResizeObserver(()=>this.ngZone.run(()=>this.recomputeTruncation()));let n=this.messageListRef?.nativeElement;n&&this.resizeObserver.observe(n)}}ngOnDestroy(){this.typewriterStop(),this.fallbackTimer!==null&&clearTimeout(this.fallbackTimer),this.resizeObserver?.disconnect()}ngAfterViewChecked(){this.shouldScroll&&(this.scrollToBottom(),this.shouldScroll=!1),this.shouldFocusInput&&(this.shouldFocusInput=!1,setTimeout(()=>this.promptInputRef?.nativeElement?.focus(),0)),this.pendingMeasure||(this.pendingMeasure=!0,Promise.resolve().then(()=>{this.pendingMeasure=!1,this.measureNewBubbles()}))}onDividerMousedown(n){this.dragging=!0,this.containerWidth=this.containerRef?.nativeElement?.getBoundingClientRect().width??0,n.preventDefault()}onMouseMove(n){if(!this.dragging||this.containerWidth===0)return;let e=this.containerRef.nativeElement.getBoundingClientRect(),i=(n.clientX-e.left)/this.containerWidth*100,r=(this.containerWidth-MN)/this.containerWidth*100;this.splitPercent.set(Math.min(Math.max(i,IN),r))}onMouseUp(){this.dragging=!1}loadEnvSettings(){this.settingsService.getSettings().subscribe({next:n=>{let e=i=>n.settings.find(r=>r.key===i)?.value??"false";this.useLocation.set(e("USE_USER_LOCATION")==="true"),this.useWeather.set(e("USE_CURRENT_WEATHER")==="true")},error:()=>{}})}refreshMemory(){if(this.sessionDisabled()){this.memoryUsed.set(0),this.memoryTotal.set(0);return}this.sessionService.getMemoryStatus().subscribe({next:n=>{this.memoryUsed.set(n.used),this.memoryTotal.set(n.total)},error:()=>{}})}bustMemory(){this.sessionDisabled()||confirm("Clear all session memory? The AI will start fresh on your next question.")&&this.sessionService.bustMemory().subscribe({next:()=>{this.memoryUsed.set(0),this.refreshMemory()},error:()=>{}})}async onPromptSetChange(n){try{await nr(this.promptSetService.setActive(n))}catch{return}let e=this.promptSetService.activePromptSet();if(this.messages.set([]),this.suggestions.set([]),this.hasSuggestions.set(!1),this.suggestionsError.set(!1),this.suggestionsMessage.set(null),this.activeReplyId.set(null),this.bubbleNaturalHeights.clear(),this.truncatedBubbles.set(new Set),this.expandedBubbles.set(new Set),!e||!e.useSession){this.memoryUsed.set(0),this.memoryTotal.set(0);return}this.refreshMemory(),await this.hydrate()}openSettings(){this.dialog.open(du,{disableClose:!1,autoFocus:!1}).afterClosed().subscribe(n=>{if(n){let e=localStorage.getItem(mx);e&&this.provider.set(e),this.loadEnvSettings()}})}openDiary(){this.dialog.open(pu,{disableClose:!1,autoFocus:!1,maxWidth:"96vw",data:{provider:this.provider()}})}isTruncated(n){return this.truncatedBubbles().has(n)&&!this.expandedBubbles().has(n)}showToggle(n){return this.truncatedBubbles().has(n)}toggleExpand(n){this.expandedBubbles.update(e=>{let i=new Set(e);return i.has(n)?i.delete(n):i.add(n),i})}send(){let n=this.prompt().trim();!n||this.loading()||(this.promptHistory[this.promptHistory.length-1]!==n&&(this.promptHistory.push(n),this.promptHistory.length>this.HISTORY_LIMIT&&this.promptHistory.shift()),this.historyIndex=-1,this.currentDraft="",this.prompt.set(""),this._executeRequest(n,"normal"))}onMoodSelected(n,e){n!==(e.mood??"normal")&&this.resendWithMood(e.text,n)}resendWithMood(n,e){this.loading()||this._executeRequest(n,e)}_executeRequest(n,e){this.messages.update(a=>[...a,{role:"user",text:n,timestamp:new Date,mood:e}]),this.loading.set(!0),this.error.set(null),this.errorIsRateLimit.set(!1),this.retryNotice.set(null),this.usedFallback.set(!1),this.shouldScroll=!0,this.suggestionsLoading.set(!0),this.suggestionsError.set(!1),this.suggestionsMessage.set(null),this.hasSuggestions.set(!0);let i=this.useLocation()?this.geoWeatherService.locationContext():null,r=this.useWeather()?this.geoWeatherService.weatherContext():null,o=this.promptSetService.activePromptSet()?.name??null;this.recommendationService.getRecommendations(n,this.provider(),e,i,r,o).pipe(Uu({count:4,delay:(a,s)=>this.isRetryableError(a)?(this.retryNotice.set(`The AI is a bit busy right now\u2026 retrying (${s}/4)`),or(this.RETRY_DELAYS[s-1])):_a(()=>a)})).subscribe({next:a=>{this.retryNotice.set(null),this.activeReplyId.set(a.aiReplyEventId),this.messages.update(s=>[...s,{role:"model",text:a.narrative,timestamp:new Date,eventId:a.aiReplyEventId,hasSuggestions:a.suggestions.length>0}]),this.suggestions.set(a.suggestions),this.suggestionsMessage.set(a.message),this.loading.set(!1),this.suggestionsLoading.set(!1),this.refreshMemory(),this.shouldScroll=!0,this.focusPromptInput(),a.usedFallback&&(this.usedFallback.set(!0),this.fallbackTimer!==null&&clearTimeout(this.fallbackTimer),this.fallbackTimer=setTimeout(()=>this.usedFallback.set(!1),8e3))},error:a=>{this.retryNotice.set(null);let s=a.status===429;this.errorIsRateLimit.set(s),this.error.set(a.error?.error??"Something went wrong. Please try again."),this.loading.set(!1),this.suggestionsError.set(!0),this.suggestionsLoading.set(!1),this.focusPromptInput()}})}onKeydown(n){if(n.key==="Enter"&&!n.shiftKey){n.preventDefault(),this.send();return}if(n.key==="ArrowUp"){if(this.promptHistory.length===0)return;n.preventDefault(),this.historyIndex===-1&&(this.currentDraft=this.prompt()),this.historyIndex=this.historyIndex===-1?this.promptHistory.length-1:Math.max(0,this.historyIndex-1),this.prompt.set(this.promptHistory[this.historyIndex]);return}if(n.key==="ArrowDown"){if(this.historyIndex===-1)return;n.preventDefault(),this.historyIndex++,this.historyIndex>=this.promptHistory.length?(this.historyIndex=-1,this.prompt.set(this.currentDraft)):this.prompt.set(this.promptHistory[this.historyIndex]);return}}updatePrompt(n){this.historyIndex=-1,this.prompt.set(n.target.value)}selectSuggestion(n){this.prompt.set(n),this.send()}formatMessageTime(n){let e=new Date,i=o=>o.toString().padStart(2,"0"),r=`${i(n.getHours())}:${i(n.getMinutes())}`;return n.toDateString()===e.toDateString()?r:`${i(n.getDate())}/${i(n.getMonth()+1)}/${n.getFullYear()} ${r}`}activateReply(n){this.activeReplyId()!==n&&(this.activeReplyId.set(n),this.hasSuggestions.set(!0),this.suggestionsLoading.set(!0),this.suggestionsError.set(!1),this.sessionService.getEnrichedSuggestions(n).subscribe({next:e=>{this.activeReplyId()===n&&(this.suggestions.set(e.suggestions),this.suggestionsMessage.set(e.message),this.suggestionsLoading.set(!1))},error:()=>{this.activeReplyId()===n&&(this.suggestionsLoading.set(!1),this.suggestionsError.set(!0))}}),this.sessionService.setActiveReply(n).subscribe({error:()=>{}}))}async hydrate(){try{let n=await nr(this.sessionService.getHistory());if(n.turns.length===0)return;this.bubbleNaturalHeights.clear(),this.truncatedBubbles.set(new Set),this.expandedBubbles.set(new Set),this.messages.set(n.turns.map(e=>({role:e.role,text:e.text,timestamp:new Date(e.timestamp),eventId:e.eventId,hasSuggestions:e.hasSuggestions,mood:e.mood??"normal"}))),this.activeReplyId.set(n.activeReplyId),this.shouldScroll=!0,n.activeReplyId!=null&&(this.hasSuggestions.set(!0),this.suggestionsLoading.set(!0),this.sessionService.getEnrichedSuggestions(n.activeReplyId).subscribe({next:e=>{this.suggestions.set(e.suggestions),this.suggestionsMessage.set(e.message),this.suggestionsLoading.set(!1)},error:()=>{this.suggestionsLoading.set(!1)}}))}catch{}}typewriterStart(n){this.typewriterStop(),this.typeChar(n,0)}typeChar(n,e){this.loadingPhrase.set(n.slice(0,e)),e<n.length?this.typewriterTimeout=setTimeout(()=>this.typeChar(n,e+1),45):this.typewriterTimeout=setTimeout(()=>this.typewriterStart(this.randomPhrase()),1e3)}typewriterStop(){this.typewriterTimeout!==null&&(clearTimeout(this.typewriterTimeout),this.typewriterTimeout=null)}randomPhrase(){return vg[Math.floor(Math.random()*vg.length)]}focusPromptInput(){this.shouldFocusInput=!0}isRetryableError(n){return n?.status===502}measureNewBubbles(){let n=this.messageListRef?.nativeElement;if(!n)return;let e=window.innerHeight*.5,i=!1;n.querySelectorAll("[data-msg-index]").forEach(r=>{let o=parseInt(r.dataset.msgIndex??"-1",10);o<0||this.bubbleNaturalHeights.has(o)||(this.bubbleNaturalHeights.set(o,r.scrollHeight),i=!0)}),i&&this.recomputeTruncation(e)}recomputeTruncation(n=window.innerHeight*.5){let e=this.messages(),i=new Set;for(let[o,a]of this.bubbleNaturalHeights)o<e.length&&e[o].role==="model"&&a>n&&i.add(o);let r=this.truncatedBubbles();t.setsEqual(i,r)||this.truncatedBubbles.set(i)}static setsEqual(n,e){if(n.size!==e.size)return!1;for(let i of n)if(!e.has(i))return!1;return!0}scrollToBottom(){let n=this.messageListRef?.nativeElement;n&&(n.scrollTop=n.scrollHeight)}static \u0275fac=function(e){return new(e||t)(J(yu),J(Wi),J(ta),J(Cu),J(na),J(Fd),J(P))};static \u0275cmp=R({type:t,selectors:[["app-chat"]],viewQuery:function(e,i){if(e&1&&_e(iN,5)(rN,5)(oN,5),e&2){let r;W(r=G())&&(i.messageListRef=r.first),W(r=G())&&(i.promptInputRef=r.first),W(r=G())&&(i.containerRef=r.first)}},hostBindings:function(e,i){e&1&&w("mousemove",function(o){return i.onMouseMove(o)},Nc)("mouseup",function(){return i.onMouseUp()},Nc)},decls:53,vars:24,consts:[["splitContainer",""],["messageList",""],["promptInput",""],["suggestionsMenu",""],[1,"page-shell"],[1,"chat-header"],["src","logo.png","alt","Reasonic",1,"header-logo"],[1,"chat-title-group"],[1,"chat-title"],[1,"chat-tagline"],["aria-label","Current location","aria-live","polite",1,"location-display"],["appearance","outline","subscriptSizing","dynamic",1,"prompt-set-selector"],["aria-label","Session memory usage",1,"memory-widget"],[1,"memory-label"],["role","progressbar",1,"memory-bar"],["mat-icon-button","","matTooltip","Clear session memory","aria-label","Clear session memory",1,"memory-bust-btn",3,"click","disabled"],["mat-icon-button","","matTooltip","Musical Diary","aria-label","Open musical diary",1,"diary-btn",3,"click"],["mat-icon-button","","matTooltip","Settings","aria-label","Open settings",1,"settings-btn",3,"click"],["role","status","aria-live","polite",1,"fallback-chip"],[1,"split-layout"],["aria-label","Conversation",1,"pane","pane--chat"],[1,"message-list"],[1,"empty-state"],[1,"message",3,"message--user","message--model"],[1,"message","message--model"],["role","alert",1,"error-banner",3,"error-banner--rate-limit"],[1,"input-area"],["appearance","outline","subscriptSizing","dynamic",1,"prompt-field"],["matInput","","placeholder","Speak your mind if you want to hear me","aria-label","Music prompt",3,"input","keydown","value","disabled"],["mat-icon-button","","aria-label","Browse suggestions",1,"lightbulb-btn",3,"matMenuTriggerFor","disabled"],["yPosition","above"],["mat-menu-item",""],["mat-fab","","aria-label","Send message",3,"click","disabled"],["aria-hidden","true",1,"split-divider",3,"mousedown"],["aria-label","Recommendations",1,"pane","pane--reco"],[3,"suggestions","loading","error","message","loadingLabel","clementineUnavailable"],[1,"reco-empty-state"],["aria-hidden","true"],["aria-label","Active prompt set",3,"selectionChange","value"],[3,"value"],["src","logo.png","aria-hidden","true","alt","",1,"empty-logo"],[1,"empty-prompt"],[1,"empty-hint"],[1,"message"],[1,"model-msg-group"],[1,"message-bubble"],["mat-icon-button","","matTooltip","Show these suggestions","aria-label","Show suggestions for this reply",1,"rewind-btn"],[3,"innerHTML"],[1,"message-time"],["type","button",1,"show-more-btn"],["mat-icon-button","","matTooltip","Show these suggestions","aria-label","Show suggestions for this reply",1,"rewind-btn",3,"click"],["type","button",1,"show-more-btn",3,"click"],[1,"mood-badge",3,"moodSelected","currentMood"],["role","status","aria-live","polite",1,"message-bubble","message-bubble--loading"],[1,"loading-row"],["aria-hidden","true",1,"loading-icon"],[1,"loading-phrase"],[1,"retry-notice"],["role","alert",1,"error-banner"],["mat-menu-item","",3,"click"],["role","status","aria-live","polite",1,"reco-loading-text"]],template:function(e,i){if(e&1&&(m(0,"div",4)(1,"header",5),B(2,"img",6),m(3,"div",7)(4,"span",8),v(5,"Reasonic"),p(),m(6,"p",9),v(7,"The music hiding in your mind"),p()(),m(8,"div",10),k(9,sN,4,1),p(),k(10,cN,4,1,"mat-form-field",11),m(11,"div",12)(12,"span",13),v(13),p(),B(14,"div",14),m(15,"button",15),w("click",function(){return i.bustMemory()}),m(16,"mat-icon"),v(17,"delete_sweep"),p()()(),m(18,"button",16),w("click",function(){return i.openDiary()}),m(19,"mat-icon"),v(20,"auto_stories"),p()(),m(21,"button",17),w("click",function(){return i.openSettings()}),m(22,"mat-icon"),v(23,"settings"),p()()(),k(24,dN,5,0,"div",18),m(25,"div",19,0)(27,"section",20)(28,"div",21,1),k(30,fN,5,1,"div",22),lt(31,_N,3,5,"div",23,Sp),k(33,vN,8,2,"div",24),k(34,yN,5,4,"div",25),p(),m(35,"div",26)(36,"mat-form-field",27)(37,"input",28,2),w("input",function(o){return i.updatePrompt(o)})("keydown",function(o){return i.onKeydown(o)}),p()(),m(39,"button",29)(40,"mat-icon"),v(41,"lightbulb"),p()(),m(42,"mat-menu",30,3),lt(44,CN,2,1,"button",31,kp),p(),m(46,"button",32),w("click",function(){return i.send()}),m(47,"mat-icon"),v(48,"send"),p()()()(),m(49,"div",33),w("mousedown",function(o){return i.onDividerMousedown(o)}),p(),m(50,"section",34),k(51,DN,1,6,"app-suggestions-panel",35)(52,EN,5,1,"div",36),p()()()),e&2){let r=yt(43);h(9),T(i.geoWeatherService.locationLabel()?9:-1),h(),T(i.promptSetService.promptSets().length>0?10:-1),h(),A("memory-widget--disabled",i.sessionDisabled()),h(2),ne(i.sessionDisabled()?"0/0":i.memoryUsed()+"/"+i.memoryTotal()),h(),Ct("--fill",i.sessionDisabled()?0:i.memoryFill()),A("memory-bar--high",i.memoryHigh()&&!i.sessionDisabled()),O("aria-valuenow",i.sessionDisabled()?0:i.memoryUsed())("aria-valuemax",i.sessionDisabled()?0:i.memoryTotal()),h(),E("disabled",i.sessionDisabled()),h(9),T(i.usedFallback()?24:-1),h(),Ct("--split-pct",i.splitPercent()+"%"),h(5),T(i.messages().length===0&&!i.loading()?30:-1),h(),ct(i.messages()),h(2),T(i.loading()?33:-1),h(),T(i.error()?34:-1),h(3),E("value",i.prompt())("disabled",i.loading()),h(2),E("matMenuTriggerFor",r)("disabled",i.loading()),h(5),ct(i.tryLines()),h(2),E("disabled",!i.prompt().trim()||i.loading()),h(5),T(i.hasSuggestions()?51:52)}},dependencies:[Ht,rn,nC,Uo,ui,zo,cn,ln,tu,eu,ru,$i,$r,iu,PD,FD,Jo,ea,pi,_u,bu,vu],styles:['[_nghost-%COMP%]{display:flex;flex-direction:column;height:100%;overflow:hidden}.page-shell[_ngcontent-%COMP%]{display:flex;flex-direction:column;height:100%;overflow:hidden}.chat-header[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;padding:14px 20px;background-color:var(--reco-surface-0);color:var(--reco-text);border-bottom:1px solid var(--reco-border);flex-shrink:0}.header-logo[_ngcontent-%COMP%]{height:38px;width:auto;object-fit:contain;border-radius:4px;flex-shrink:0}.chat-title-group[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:column;gap:1px}.chat-title[_ngcontent-%COMP%]{font-size:1.1rem;font-weight:600;font-family:var(--reco-font);letter-spacing:.01em;background:linear-gradient(90deg,var(--reco-primary),var(--reco-accent));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent}.chat-tagline[_ngcontent-%COMP%]{margin:0;font-size:.68rem;font-style:italic;font-family:var(--reco-font);color:var(--reco-text-muted);letter-spacing:.01em}.location-display[_ngcontent-%COMP%]{display:flex;align-items:center;gap:4px;font-size:.78rem;font-family:var(--reco-font);color:var(--reco-text-muted);letter-spacing:.02em;white-space:nowrap}.location-display[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:.95rem;width:.95rem;height:.95rem;color:var(--reco-primary)}.prompt-set-selector[_ngcontent-%COMP%]{width:140px;flex-shrink:0}.prompt-set-selector[_ngcontent-%COMP%]     .mat-mdc-form-field-infix{padding-top:4px!important;padding-bottom:4px!important;min-height:0}.prompt-set-selector[_ngcontent-%COMP%]     .mat-mdc-select-value{font-size:.78rem;font-family:var(--reco-font);color:var(--reco-text-muted)}.prompt-set-selector[_ngcontent-%COMP%]     .mdc-notched-outline__leading, .prompt-set-selector[_ngcontent-%COMP%]     .mdc-notched-outline__notch, .prompt-set-selector[_ngcontent-%COMP%]     .mdc-notched-outline__trailing{border-color:var(--reco-border)!important}.memory-widget[_ngcontent-%COMP%]{display:flex;align-items:center;gap:5px;margin-left:8px}.memory-label[_ngcontent-%COMP%]{font-size:.62rem;font-family:var(--reco-font);color:var(--reco-text-muted);white-space:nowrap;min-width:28px;text-align:right}.memory-bar[_ngcontent-%COMP%]{width:52px;height:4px;border-radius:2px;background:var(--reco-border);position:relative;overflow:hidden;flex-shrink:0}.memory-bar[_ngcontent-%COMP%]:after{content:"";position:absolute;inset:0;width:calc(var(--fill, 0) * 100%);border-radius:2px;background:var(--reco-primary);transition:width .4s ease,background .4s ease}.memory-bar--high[_ngcontent-%COMP%]:after{background:var(--reco-accent)}.memory-widget--disabled[_ngcontent-%COMP%]{opacity:.35;pointer-events:none}.memory-bust-btn[_ngcontent-%COMP%]{width:28px;height:28px;flex-shrink:0;align-self:center;display:inline-flex!important;align-items:center;justify-content:center;margin:0;padding:0;color:var(--reco-text-muted);--mdc-icon-button-state-layer-size: 28px;--mdc-icon-button-icon-size: 16px}.memory-bust-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:16px;width:16px;height:16px;transition:color .2s ease}.memory-bust-btn[_ngcontent-%COMP%]:hover   mat-icon[_ngcontent-%COMP%]{color:var(--reco-accent)}.diary-btn[_ngcontent-%COMP%]{width:28px;height:28px;flex-shrink:0;align-self:center;display:inline-flex!important;align-items:center;justify-content:center;margin:0;padding:0;color:var(--reco-text-muted);--mdc-icon-button-state-layer-size: 28px;--mdc-icon-button-icon-size: 16px}.diary-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:16px;width:16px;height:16px;transition:color .2s ease}.diary-btn[_ngcontent-%COMP%]:hover   mat-icon[_ngcontent-%COMP%]{color:var(--reco-accent)}.settings-btn[_ngcontent-%COMP%]{width:28px;height:28px;flex-shrink:0;align-self:center;display:inline-flex!important;align-items:center;justify-content:center;margin:0;padding:0;color:var(--reco-text-muted);--mdc-icon-button-state-layer-size: 28px;--mdc-icon-button-icon-size: 16px}.settings-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:16px;width:16px;height:16px;transition:color .2s ease}.settings-btn[_ngcontent-%COMP%]:hover   mat-icon[_ngcontent-%COMP%]{color:var(--reco-primary)}.fallback-chip[_ngcontent-%COMP%]{display:flex;align-items:center;gap:6px;padding:6px 16px;background-color:#ffb74d1f;color:var(--reco-warning);font-size:.8rem;font-family:var(--reco-font);flex-shrink:0;animation:_ngcontent-%COMP%_fade-in .3s ease}.fallback-chip[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:16px;width:16px;height:16px}@keyframes _ngcontent-%COMP%_fade-in{0%{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}.split-layout[_ngcontent-%COMP%]{flex:1;display:flex;overflow:hidden}.pane[_ngcontent-%COMP%]{display:flex;flex-direction:column;overflow:hidden}.pane--chat[_ngcontent-%COMP%]{flex:0 0 var(--split-pct, 40%);background:var(--reco-bg);border-right:none;font-family:var(--reco-font-bubble)}.pane--reco[_ngcontent-%COMP%]{flex:1;overflow-y:auto;background:var(--reco-surface-0);min-width:220px}.split-divider[_ngcontent-%COMP%]{width:5px;flex-shrink:0;cursor:col-resize;background:var(--reco-border);transition:background .15s ease;z-index:1}.split-divider[_ngcontent-%COMP%]:hover{background:var(--reco-primary)}@media(max-width:767px){.split-layout[_ngcontent-%COMP%]{flex-direction:column}.pane--chat[_ngcontent-%COMP%]{flex:1}.pane--reco[_ngcontent-%COMP%]{flex:0 0 auto;max-height:40vh;order:-1;border-bottom:1px solid var(--reco-border);min-width:unset}.split-divider[_ngcontent-%COMP%]{display:none}}.reco-empty-state[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;color:var(--reco-text-muted)}.reco-empty-state[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:48px;width:48px;height:48px;opacity:.35}.reco-empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;font-size:.9rem;font-style:italic;font-family:var(--reco-font)}.reco-empty-state[_ngcontent-%COMP%]   .reco-loading-text[_ngcontent-%COMP%]{font-family:var(--reco-font-bubble);color:var(--reco-primary);animation:_ngcontent-%COMP%_note-pulse 1.5s ease-in-out infinite}.message-list[_ngcontent-%COMP%]{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px;background:var(--reco-bg);scrollbar-width:thin;scrollbar-color:var(--reco-surface-2) transparent}.empty-state[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;color:var(--reco-text-muted);text-align:center;gap:4px;padding:40px 20px}.empty-logo[_ngcontent-%COMP%]{width:80px;height:80px;object-fit:contain;opacity:.18;margin-bottom:8px}.empty-prompt[_ngcontent-%COMP%]{font-size:1rem;font-weight:500;color:var(--reco-text);margin:0}.empty-hint[_ngcontent-%COMP%]{font-style:italic;font-size:.875rem;color:var(--reco-text-muted);margin:4px 0 0}.message[_ngcontent-%COMP%]{display:flex}.message--user[_ngcontent-%COMP%]{justify-content:flex-end}.message--model[_ngcontent-%COMP%]{justify-content:flex-start}.model-msg-group[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:flex-start;gap:4px;max-width:78%}.model-msg-group[_ngcontent-%COMP%]   .message-bubble[_ngcontent-%COMP%]{max-width:100%}.message-bubble[_ngcontent-%COMP%]{max-width:78%;padding:10px 14px;border-radius:18px;line-height:1.7;font-size:.9rem;font-family:var(--reco-font-bubble);position:relative}.message--user[_ngcontent-%COMP%]   .message-bubble[_ngcontent-%COMP%]{background-color:var(--reco-primary);color:#fff;border-bottom-right-radius:4px;font-weight:400;white-space:pre-wrap}.message--model[_ngcontent-%COMP%]   .message-bubble[_ngcontent-%COMP%]{background-color:var(--reco-surface-2);color:var(--reco-text);border-bottom-left-radius:4px;border:1px solid var(--reco-border)}.message--model[_ngcontent-%COMP%]   .message-bubble[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{font-weight:700;color:var(--reco-primary)}.message--model[_ngcontent-%COMP%]   .message-bubble--active[_ngcontent-%COMP%]{outline:2px solid var(--reco-primary);outline-offset:2px;background-color:var(--reco-surface-1)}.message-bubble--has-rewind[_ngcontent-%COMP%]{padding-right:36px}.message-bubble--clamped[_ngcontent-%COMP%]{max-height:50vh;overflow:hidden;position:relative}.message-bubble--clamped[_ngcontent-%COMP%]:after{content:"";position:absolute;bottom:0;left:0;right:0;height:48px;background:linear-gradient(to bottom,transparent,var(--reco-surface-2));pointer-events:none}.message-bubble--loading[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:6px;padding:10px 14px;font-style:italic;font-size:.875rem;font-family:var(--reco-font-bubble);color:var(--reco-text-muted);background-color:var(--reco-surface-1);border:1px solid var(--reco-border);border-bottom-left-radius:4px}.show-more-btn[_ngcontent-%COMP%]{background:none;border:none;cursor:pointer;font-family:var(--reco-font);font-size:.72rem;font-weight:500;color:var(--reco-primary);padding:0 2px;text-decoration:underline;text-underline-offset:2px;line-height:1.4}.show-more-btn[_ngcontent-%COMP%]:hover{color:var(--reco-accent)}.rewind-btn[_ngcontent-%COMP%]{position:absolute;top:4px;right:4px;width:26px;height:26px;flex-shrink:0;color:var(--reco-text-muted);opacity:.4;transition:opacity .2s ease,color .2s ease;--mdc-icon-button-state-layer-size: 26px;--mdc-icon-button-icon-size: 18px}.rewind-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:18px;width:18px;height:18px}.rewind-btn[_ngcontent-%COMP%]:hover{opacity:1;color:var(--reco-primary)}.message-time[_ngcontent-%COMP%]{display:block;font-size:.62rem;font-family:var(--reco-font);margin-top:4px}.message--user[_ngcontent-%COMP%]   .message-time[_ngcontent-%COMP%]{color:#ffffff80;text-align:right}.message--model[_ngcontent-%COMP%]   .message-time[_ngcontent-%COMP%]{color:#6b6b6b;opacity:.7}.message--user[_ngcontent-%COMP%]   .message-bubble[_ngcontent-%COMP%]{padding-top:24px}.mood-badge[_ngcontent-%COMP%]{position:absolute;top:4px;right:6px}.loading-row[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px}.retry-notice[_ngcontent-%COMP%]{font-style:normal;font-size:.8rem;font-weight:700;font-family:var(--reco-font-bubble);color:var(--reco-primary)}.loading-icon[_ngcontent-%COMP%]{font-size:18px;width:18px;height:18px;flex-shrink:0;color:var(--reco-primary);animation:_ngcontent-%COMP%_note-pulse 1.5s ease-in-out infinite}.loading-phrase[_ngcontent-%COMP%]{min-width:0;font-family:var(--reco-font-bubble);color:var(--reco-primary)}@keyframes _ngcontent-%COMP%_note-pulse{0%,to{opacity:.35;transform:scale(.95)}50%{opacity:1;transform:scale(1.05)}}.error-banner[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;padding:10px 14px;border-radius:8px;background-color:#ff525226;color:var(--reco-error);font-size:.875rem;font-family:var(--reco-font-bubble);border:1px solid rgba(255,82,82,.3)}.error-banner--rate-limit[_ngcontent-%COMP%]{background-color:var(--reco-accent-dim);color:var(--reco-accent);border-color:#ff2ebe4d}.input-area[_ngcontent-%COMP%]{display:flex;align-items:center;gap:12px;padding:10px 16px;border-top:1px solid var(--reco-border);flex-shrink:0;background-color:var(--reco-surface-0);--mdc-outlined-text-field-label-text-font: var(--reco-font-bubble);--mdc-outlined-text-field-input-text-color: var(--reco-text);--mdc-outlined-text-field-label-text-color: var(--reco-text-muted);--mdc-outlined-text-field-focus-label-text-color: var(--reco-primary);--mdc-outlined-text-field-outline-color: var(--reco-border-strong);--mdc-outlined-text-field-focus-outline-color: var(--reco-primary);--mdc-outlined-text-field-hover-outline-color: var(--reco-primary);--mdc-outlined-text-field-caret-color: var(--reco-primary);--mdc-outlined-text-field-disabled-outline-color: var(--reco-border);--mdc-outlined-text-field-input-placeholder-text-color: rgba(255, 255, 255, .28);--mat-form-field-focus-select-arrow-color: var(--reco-primary);--mdc-fab-container-color: var(--reco-primary);--mdc-fab-icon-color: #ffffff;--mat-fab-foreground-color:#ffffff}.prompt-field[_ngcontent-%COMP%]{flex:1}.lightbulb-btn[_ngcontent-%COMP%]{flex-shrink:0;color:var(--reco-text-muted)}.lightbulb-btn[_ngcontent-%COMP%]:hover:not([disabled]){color:var(--reco-primary)}']})};var xu=class t{static \u0275fac=function(e){return new(e||t)};static \u0275cmp=R({type:t,selectors:[["app-root"]],decls:1,vars:0,template:function(e,i){e&1&&B(0,"app-chat")},dependencies:[Du],styles:["[_nghost-%COMP%]{display:block;height:100vh}"]})};Yp(xu,b0).catch(t=>console.error(t));

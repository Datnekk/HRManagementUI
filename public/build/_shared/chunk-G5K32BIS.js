import{A as et,B as tt,C as rt,D as nt,F as ot,G as at,H as J,a as ze,b as ye,c as U,d as Be,e as Ve,f as Xe,g as ee,h as j,i as Y,j as Ye,k as z,l as Ge,m as We,n as te,o as B,r as Re,s as Ke,t as qe,u as ge,v as ve,x as Ze,y as Qe,z as Kt}from"/build/_shared/chunk-QHNMJF3C.js";import{a as I}from"/build/_shared/chunk-TQC3RT7F.js";import{c as F}from"/build/_shared/chunk-Q3IECNXJ.js";z();var k=F(I());Kt();J();function L(){return L=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},L.apply(this,arguments)}var m=F(I());J();function C(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}J();async function re(e,t){if(e.id in t)return t[e.id];try{let r=await import(e.module);return t[e.id]=r,r}catch(r){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(r),window.__remixContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function it(e,t,r){let n=e.map(a=>{var l;let s=t[a.route.id],i=r.routes[a.route.id];return[i.css?i.css.map(u=>({rel:"stylesheet",href:u})):[],(s==null||(l=s.links)===null||l===void 0?void 0:l.call(s))||[]]}).flat(2),o=Qt(e,r);return ut(n,o)}async function _e(e,t){var r,n;if(!e.css&&!t.links||!tr())return;let o=[((r=e.css)===null||r===void 0?void 0:r.map(s=>({rel:"stylesheet",href:s})))??[],((n=t.links)===null||n===void 0?void 0:n.call(t))??[]].flat(1);if(o.length===0)return;let a=[];for(let s of o)!oe(s)&&s.rel==="stylesheet"&&a.push({...s,rel:"preload",as:"style"});let l=a.filter(s=>(!s.media||window.matchMedia(s.media).matches)&&!document.querySelector(`link[rel="stylesheet"][href="${s.href}"]`));await Promise.all(l.map(qt))}async function qt(e){return new Promise(t=>{let r=document.createElement("link");Object.assign(r,e);function n(){document.head.contains(r)&&document.head.removeChild(r)}r.onload=()=>{n(),t()},r.onerror=()=>{n(),t()},document.head.appendChild(r)})}function oe(e){return e!=null&&typeof e.page=="string"}function Zt(e){return e==null?!1:e.href==null?e.rel==="preload"&&typeof e.imageSrcSet=="string"&&typeof e.imageSizes=="string":typeof e.rel=="string"&&typeof e.href=="string"}async function st(e,t,r){let n=await Promise.all(e.map(async o=>{let a=await re(t.routes[o.route.id],r);return a.links?a.links():[]}));return ut(n.flat(1).filter(Zt).filter(o=>o.rel==="stylesheet"||o.rel==="preload").map(o=>o.rel==="stylesheet"?{...o,rel:"prefetch",as:"style"}:{...o,rel:"prefetch"}))}function xe(e,t,r,n,o,a,l){let s=dt(e),i=(c,d)=>r[d]?c.route.id!==r[d].route.id:!0,u=(c,d)=>{var p;return r[d].pathname!==c.pathname||((p=r[d].route.path)===null||p===void 0?void 0:p.endsWith("*"))&&r[d].params["*"]!==c.params["*"]};return l==="data"&&(a.v3_singleFetch||o.search!==s.search)?t.filter((c,d)=>{if(!n.routes[c.route.id].hasLoader)return!1;if(i(c,d)||u(c,d))return!0;let f=a.v3_singleFetch||o.search!==s.search;if(c.route.shouldRevalidate){var w;let g=c.route.shouldRevalidate({currentUrl:new URL(o.pathname+o.search+o.hash,window.origin),currentParams:((w=r[0])===null||w===void 0?void 0:w.params)||{},nextUrl:new URL(e,window.origin),nextParams:c.params,defaultShouldRevalidate:f});if(typeof g=="boolean")return g}return f}):t.filter((c,d)=>{let p=n.routes[c.route.id];return(l==="assets"||p.hasLoader)&&(i(c,d)||u(c,d))})}function lt(e,t,r){let n=dt(e);return Ee(t.filter(o=>r.routes[o.route.id].hasLoader&&!r.routes[o.route.id].hasClientLoader).map(o=>{let{pathname:a,search:l}=n,s=new URLSearchParams(l);return s.set("_data",o.route.id),`${a}?${s}`}))}function ct(e,t){return Ee(e.map(r=>{let n=t.routes[r.route.id],o=[n.module];return n.imports&&(o=o.concat(n.imports)),o}).flat(1))}function Qt(e,t){return Ee(e.map(r=>{let n=t.routes[r.route.id],o=[n.module];return n.imports&&(o=o.concat(n.imports)),o}).flat(1))}function Ee(e){return[...new Set(e)]}function er(e){let t={},r=Object.keys(e).sort();for(let n of r)t[n]=e[n];return t}function ut(e,t){let r=new Set,n=new Set(t);return e.reduce((o,a)=>{if(t&&!oe(a)&&a.as==="script"&&a.href&&n.has(a.href))return o;let s=JSON.stringify(er(a));return r.has(s)||(r.add(s),o.push({key:s,link:a})),o},[])}function dt(e){let t=ye(e);return t.search===void 0&&(t.search=""),t}var ne;function tr(){if(ne!==void 0)return ne;let e=document.createElement("link");return ne=e.relList.supports("preload"),e=null,ne}var rr={"&":"\\u0026",">":"\\u003e","<":"\\u003c","\u2028":"\\u2028","\u2029":"\\u2029"},nr=/[&><\u2028\u2029]/g;function G(e){return e.replace(nr,t=>rr[t])}function Se(e){return{__html:e}}var Ce=F(I());z();var or=-1,ar=-2,ir=-3,sr=-4,lr=-5,cr=-6,ur=-7,dr="B",fr="D",mt="E",mr="M",hr="N",ht="P",pr="R",wr="S",yr="Y",Rr="U",gr="Z",pt=class{promise;resolve;reject;constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}};function vr(){let e=new TextDecoder,t="";return new TransformStream({transform(r,n){let o=e.decode(r,{stream:!0}),a=(t+o).split(`
`);t=a.pop()||"";for(let l of a)n.enqueue(l)},flush(r){t&&r.enqueue(t)}})}var sn=Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var be=typeof window<"u"?window:typeof globalThis<"u"?globalThis:void 0;function Le(e){let{hydrated:t,values:r}=this;if(typeof e=="number")return ft.call(this,e);if(!Array.isArray(e)||!e.length)throw new SyntaxError;let n=r.length;for(let o of e)r.push(o);return t.length=r.length,ft.call(this,n)}function ft(e){let{hydrated:t,values:r,deferred:n,plugins:o}=this,a,l=[[e,i=>{a=i}]],s=[];for(;l.length>0;){let[i,u]=l.pop();switch(i){case ur:u(void 0);continue;case lr:u(null);continue;case ar:u(NaN);continue;case cr:u(1/0);continue;case ir:u(-1/0);continue;case sr:u(-0);continue}if(t[i]){u(t[i]);continue}let h=r[i];if(!h||typeof h!="object"){t[i]=h,u(h);continue}if(Array.isArray(h))if(typeof h[0]=="string"){let[c,d,p]=h;switch(c){case fr:u(t[i]=new Date(d));continue;case Rr:u(t[i]=new URL(d));continue;case dr:u(t[i]=BigInt(d));continue;case pr:u(t[i]=new RegExp(d,p));continue;case yr:u(t[i]=Symbol.for(d));continue;case wr:let f=new Set;t[i]=f;for(let R=1;R<h.length;R++)l.push([h[R],_=>{f.add(_)}]);u(f);continue;case mr:let w=new Map;t[i]=w;for(let R=1;R<h.length;R+=2){let _=[];l.push([h[R+1],y=>{_[1]=y}]),l.push([h[R],y=>{_[0]=y}]),s.push(()=>{w.set(_[0],_[1])})}u(w);continue;case hr:let g=Object.create(null);t[i]=g;for(let R of Object.keys(d).reverse()){let _=[];l.push([d[R],y=>{_[1]=y}]),l.push([Number(R.slice(1)),y=>{_[0]=y}]),s.push(()=>{g[_[0]]=_[1]})}u(g);continue;case ht:if(t[d])u(t[i]=t[d]);else{let R=new pt;n[d]=R,u(t[i]=R.promise)}continue;case mt:let[,v,S]=h,E=S&&be&&be[S]?new be[S](v):new Error(v);t[i]=E,u(E);continue;case gr:u(t[i]=t[d]);continue;default:if(Array.isArray(o)){let R=[],_=h.slice(1);for(let y=0;y<_.length;y++){let x=_[y];l.push([x,b=>{R[y]=b}])}s.push(()=>{for(let y of o){let x=y(h[0],...R);if(x){u(t[i]=x.value);return}}throw new SyntaxError});continue}throw new SyntaxError}}else{let c=[];t[i]=c;for(let d=0;d<h.length;d++){let p=h[d];p!==or&&l.push([p,f=>{c[d]=f}])}u(c);continue}else{let c={};t[i]=c;for(let d of Object.keys(h).reverse()){let p=[];l.push([h[d],f=>{p[1]=f}]),l.push([Number(d.slice(1)),f=>{p[0]=f}]),s.push(()=>{c[p[0]]=p[1]})}u(c);continue}}for(;s.length>0;)s.pop()();return a}async function wt(e,t){let{plugins:r}=t??{},n=new pt,o=e.pipeThrough(vr()).getReader(),a={values:[],hydrated:[],deferred:{},plugins:r},l=await _r.call(a,o),s=n.promise;return l.done?n.resolve():s=xr.call(a,o).then(n.resolve).catch(i=>{for(let u of Object.values(a.deferred))u.reject(i);n.reject(i)}),{done:s.then(()=>o.closed),value:l.value}}async function _r(e){let t=await e.read();if(!t.value)throw new SyntaxError;let r;try{r=JSON.parse(t.value)}catch{throw new SyntaxError}return{done:t.done,value:Le.call(this,r)}}async function xr(e){let t=await e.read();for(;!t.done;){if(!t.value)continue;let r=t.value;switch(r[0]){case ht:{let n=r.indexOf(":"),o=Number(r.slice(1,n)),a=this.deferred[o];if(!a)throw new Error(`Deferred ID ${o} not found in stream`);let l=r.slice(n+1),s;try{s=JSON.parse(l)}catch{throw new SyntaxError}let i=Le.call(this,s);a.resolve(i);break}case mt:{let n=r.indexOf(":"),o=Number(r.slice(1,n)),a=this.deferred[o];if(!a)throw new Error(`Deferred ID ${o} not found in stream`);let l=r.slice(n+1),s;try{s=JSON.parse(l)}catch{throw new SyntaxError}let i=Le.call(this,s);a.reject(i);break}default:throw new SyntaxError}t=await e.read()}}var ae=Symbol("SingleFetchRedirect");z();function Rt(e){return e.headers.get("X-Remix-Catch")!=null}function Er(e){return e.headers.get("X-Remix-Error")!=null}function Sr(e){return W(e)&&e.status>=400&&e.headers.get("X-Remix-Error")==null&&e.headers.get("X-Remix-Catch")==null&&e.headers.get("X-Remix-Response")==null}function gt(e){return e.headers.get("X-Remix-Redirect")!=null}function vt(e){var t;return!!((t=e.headers.get("Content-Type"))!==null&&t!==void 0&&t.match(/text\/remix-deferred/))}function W(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.headers=="object"&&typeof e.body<"u"}function _t(e){let t=e;return t&&typeof t=="object"&&typeof t.data=="object"&&typeof t.subscribe=="function"&&typeof t.cancel=="function"&&typeof t.resolveData=="function"}async function Oe(e,t,r=0){let n=new URL(e.url);n.searchParams.set("_data",t),r>0&&await new Promise(s=>setTimeout(s,5**r*10));let o=await K(e),a=window.__remixRevalidation,l=await fetch(n.href,o).catch(s=>{if(typeof a=="number"&&a===window.__remixRevalidation&&s?.name==="TypeError"&&r<3)return Oe(e,t,r+1);throw s});if(Er(l)){let s=await l.json(),i=new Error(s.message);return i.stack=s.stack,i}if(Sr(l)){let s=await l.text(),i=new Error(s);return i.stack=void 0,i}return l}async function K(e){let t={signal:e.signal};if(e.method!=="GET"){t.method=e.method;let r=e.headers.get("Content-Type");r&&/\bapplication\/json\b/.test(r)?(t.headers={"Content-Type":r},t.body=JSON.stringify(await e.json())):r&&/\btext\/plain\b/.test(r)?(t.headers={"Content-Type":r},t.body=await e.text()):r&&/\bapplication\/x-www-form-urlencoded\b/.test(r)?t.body=new URLSearchParams(await e.text()):t.body=await e.formData()}return t}var br="__deferred_promise:";async function xt(e){if(!e)throw new Error("parseDeferredReadableStream requires stream argument");let t,r={};try{let n=Lr(e),a=(await n.next()).value;if(!a)throw new Error("no critical data");let l=JSON.parse(a);if(typeof l=="object"&&l!==null)for(let[s,i]of Object.entries(l))typeof i!="string"||!i.startsWith(br)||(t=t||{},t[s]=new Promise((u,h)=>{r[s]={resolve:c=>{u(c),delete r[s]},reject:c=>{h(c),delete r[s]}}}));return(async()=>{try{for await(let s of n){let[i,...u]=s.split(":"),h=u.join(":"),c=JSON.parse(h);if(i==="data")for(let[d,p]of Object.entries(c))r[d]&&r[d].resolve(p);else if(i==="error")for(let[d,p]of Object.entries(c)){let f=new Error(p.message);f.stack=p.stack,r[d]&&r[d].reject(f)}}for(let[s,i]of Object.entries(r))i.reject(new Ve(`Deferred ${s} will never be resolved`))}catch(s){for(let i of Object.values(r))i.reject(s)}})(),new Xe({...l,...t})}catch(n){for(let o of Object.values(r))o.reject(n);throw n}}async function*Lr(e){let t=e.getReader(),r=[],n=[],o=!1,a=new TextEncoder,l=new TextDecoder,s=async()=>{if(n.length>0)return n.shift();for(;!o&&n.length===0;){let u=await t.read();if(u.done){o=!0;break}r.push(u.value);try{let c=l.decode(yt(...r)).split(`

`);if(c.length>=2&&(n.push(...c.slice(0,-1)),r=[a.encode(c.slice(-1).join(`

`))]),n.length>0)break}catch{continue}}return n.length>0||r.length>0&&(n=l.decode(yt(...r)).split(`

`).filter(h=>h),r=[]),n.shift()},i=await s();for(;i;)yield i,i=await s()}function yt(...e){let t=new Uint8Array(e.reduce((n,o)=>n+o.length,0)),r=0;for(let n of e)t.set(n,r),r+=n.length;return t}function St(e,t,r){return async({request:n,matches:o,fetcherKey:a})=>n.method!=="GET"?Or(n,o):a?Cr(n,o):kr(e,t,r(),n,o)}async function Or(e,t){let r=t.find(a=>a.shouldLoad);C(r,"No action match found");let n,o=await r.resolve(async a=>await a(async()=>{let s=q(e.url),i=await K(e),{data:u,status:h}=await Ne(s,i);return n=h,ke(u,r.route.id)}));return W(o.result)||Y(o.result)?{[r.route.id]:o}:{[r.route.id]:{type:o.type,result:Be(o.result,n)}}}async function kr(e,t,r,n,o){let a=new Set,l=!1,s=o.map(()=>Et()),i=Promise.all(s.map(f=>f.promise)),u=Et(),h=Lt(q(n.url)),c=await K(n),d={},p=Promise.all(o.map(async(f,w)=>f.resolve(async g=>{if(s[w].resolve(),!f.shouldLoad){var v;if(!r.state.initialized)return;if(f.route.id in r.state.loaderData&&e.routes[f.route.id]&&(v=t[f.route.id])!==null&&v!==void 0&&v.shouldRevalidate){e.routes[f.route.id].hasLoader&&(l=!0);return}}if(e.routes[f.route.id].hasClientLoader){e.routes[f.route.id].hasLoader&&(l=!0);try{let S=await bt(g,h,c,f.route.id);d[f.route.id]={type:"data",result:S}}catch(S){d[f.route.id]={type:"error",result:S}}return}e.routes[f.route.id].hasLoader&&a.add(f.route.id);try{let S=await g(async()=>{let E=await u.promise;return Ot(E,f.route.id)});d[f.route.id]={type:"data",result:S}}catch(S){d[f.route.id]={type:"error",result:S}}})));if(await i,(!r.state.initialized||a.size===0)&&!window.__remixHdrActive)u.resolve({});else try{l&&a.size>0&&h.searchParams.set("_routes",o.filter(w=>a.has(w.route.id)).map(w=>w.route.id).join(","));let f=await Ne(h,c);u.resolve(f.data)}catch(f){u.reject(f)}return await p,d}async function Cr(e,t){let r=t.find(o=>o.shouldLoad);C(r,"No fetcher match found");let n=await r.resolve(async o=>{let a=Lt(q(e.url)),l=await K(e);return bt(o,a,l,r.route.id)});return{[r.route.id]:n}}function bt(e,t,r,n){return e(async()=>{let o=new URL(t);o.searchParams.set("_routes",n);let{data:a}=await Ne(o,r);return Ot(a,n)})}function Lt(e){let t=e.searchParams.getAll("index");e.searchParams.delete("index");let r=[];for(let n of t)n&&r.push(n);for(let n of r)e.searchParams.append("index",n);return e}function q(e){let t=typeof e=="string"?new URL(e,typeof window>"u"?"server://singlefetch/":window.location.origin):e;return t.pathname==="/"?t.pathname="_root.data":t.pathname=`${t.pathname.replace(/\/$/,"")}.data`,t}async function Ne(e,t){let r=await fetch(e,t);if(new Set([100,101,204,205]).has(r.status))return!t.method||t.method==="GET"?{status:r.status,data:{}}:{status:r.status,data:{data:null}};C(r.body,"No response body to decode");try{let o=await $e(r.body,window);return{status:r.status,data:o.value}}catch(o){throw console.error(o),new Error(`Unable to decode turbo-stream response from URL: ${e.toString()}`)}}function $e(e,t){return wt(e,{plugins:[(r,...n)=>{if(r==="SanitizedError"){let[o,a,l]=n,s=Error;o&&o in t&&typeof t[o]=="function"&&(s=t[o]);let i=new s(a);return i.stack=l,{value:i}}if(r==="ErrorResponse"){let[o,a,l]=n;return{value:new j(a,l,o)}}if(r==="SingleFetchRedirect")return{value:{[ae]:n[0]}}},(r,n)=>{if(r==="SingleFetchFallback")return{value:void 0};if(r==="SingleFetchClassInstance")return{value:n}}]})}function Ot(e,t){let r=e[ae];return r?ke(r,t):e[t]!==void 0?ke(e[t],t):null}function ke(e,t){if("error"in e)throw e.error;if("redirect"in e){let r={};throw e.revalidate&&(r["X-Remix-Revalidate"]="yes"),e.reload&&(r["X-Remix-Reload-Document"]="yes"),e.replace&&(r["X-Remix-Replace"]="yes"),ee(e.redirect,{status:e.status,headers:r})}else{if("data"in e)return e.data;throw new Error(`No response found for routeId "${t}"`)}}function Et(){let e,t,r=new Promise((n,o)=>{e=async a=>{n(a);try{await r}catch{}},t=async a=>{o(a);try{await r}catch{}}});return{promise:r,resolve:e,reject:t}}z();var Dt=F(I());var T=F(I());z();J();var O=F(I());J();var ie=class extends O.Component{constructor(t){super(t),this.state={error:t.error||null,location:t.location}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,r){return r.location!==t.location?{error:t.error||null,location:t.location}:{error:t.error||r.error,location:r.location}}render(){return this.state.error?O.createElement(Me,{error:this.state.error,isOutsideRemixApp:!0}):this.props.children}};function Me({error:e,isOutsideRemixApp:t}){console.error(e);let r=O.createElement("script",{dangerouslySetInnerHTML:{__html:`
        console.log(
          "\u{1F4BF} Hey developer \u{1F44B}. You can provide a way better UX than this when your app throws errors. Check out https://remix.run/guides/errors for more information."
        );
      `}});if(Y(e))return O.createElement(se,{title:"Unhandled Thrown Response!"},O.createElement("h1",{style:{fontSize:"24px"}},e.status," ",e.statusText),r);let n;if(e instanceof Error)n=e;else{let o=e==null?"Unknown Error":typeof e=="object"&&"toString"in e?e.toString():JSON.stringify(e);n=new Error(o)}return O.createElement(se,{title:"Application Error!",isOutsideRemixApp:t},O.createElement("h1",{style:{fontSize:"24px"}},"Application Error"),O.createElement("pre",{style:{padding:"2rem",background:"hsla(10, 50%, 50%, 0.1)",color:"red",overflow:"auto"}},n.stack),r)}function se({title:e,renderScripts:t,isOutsideRemixApp:r,children:n}){var o;let{routeModules:a}=D();return(o=a.root)!==null&&o!==void 0&&o.Layout&&!r?n:O.createElement("html",{lang:"en"},O.createElement("head",null,O.createElement("meta",{charSet:"utf-8"}),O.createElement("meta",{name:"viewport",content:"width=device-width,initial-scale=1,viewport-fit=cover"}),O.createElement("title",null,e)),O.createElement("body",null,O.createElement("main",{style:{fontFamily:"system-ui, sans-serif",padding:"2rem"}},n,t?O.createElement(De,null):null)))}var Ae=F(I());function kt(){return Ae.createElement(se,{title:"Loading...",renderScripts:!0},Ae.createElement("script",{dangerouslySetInnerHTML:{__html:`
              console.log(
                "\u{1F4BF} Hey developer \u{1F44B}. You can provide a way better UX than this " +
                "when your app is loading JS modules and/or running \`clientLoader\` " +
                "functions. Check out https://remix.run/route/hydrate-fallback " +
                "for more information."
              );
            `}}))}function Nt(e){let t={};return Object.values(e).forEach(r=>{let n=r.parentId||"";t[n]||(t[n]=[]),t[n].push(r)}),t}function Nr(e,t,r){let n=Mt(t),o=t.HydrateFallback&&(!r||e.id==="root")?t.HydrateFallback:e.id==="root"?kt:void 0,a=t.ErrorBoundary?t.ErrorBoundary:e.id==="root"?()=>T.createElement(Me,{error:ge()}):void 0;return e.id==="root"&&t.Layout?{...n?{element:T.createElement(t.Layout,null,T.createElement(n,null))}:{Component:n},...a?{errorElement:T.createElement(t.Layout,null,T.createElement(a,null))}:{ErrorBoundary:a},...o?{hydrateFallbackElement:T.createElement(t.Layout,null,T.createElement(o,null))}:{HydrateFallback:o}}:{Component:n,ErrorBoundary:a,HydrateFallback:o}}function $t(e,t,r,n,o,a){return V(t,r,n,o,a,"",Nt(t),e)}function le(e,t,r){if(r){let l=`You cannot call ${e==="action"?"serverAction()":"serverLoader()"} in SPA Mode (routeId: "${t.id}")`;throw console.error(l),new j(400,"Bad Request",new Error(l),!0)}let o=`You are trying to call ${e==="action"?"serverAction()":"serverLoader()"} on a route that does not have a server ${e} (routeId: "${t.id}")`;if(e==="loader"&&!t.hasLoader||e==="action"&&!t.hasAction)throw console.error(o),new j(400,"Bad Request",new Error(o),!0)}function Pe(e,t){let r=e==="clientAction"?"a":"an",n=`Route "${t}" does not have ${r} ${e}, but you are trying to submit to it. To fix this, please add ${r} \`${e}\` function to the route`;throw console.error(n),new j(405,"Method Not Allowed",new Error(n),!0)}function V(e,t,r,n,o,a="",l=Nt(e),s){return(l[a]||[]).map(i=>{let u=t[i.id];async function h(E,R,_){if(typeof _=="function")return await _();let y=await Dr(E,i);return R?Ar(y):y}function c(E,R,_){return i.hasLoader?h(E,R,_):Promise.resolve(null)}function d(E,R,_){if(!i.hasAction)throw Pe("action",i.id);return h(E,R,_)}async function p(E){let R=t[i.id],_=R?_e(i,R):Promise.resolve();try{return E()}finally{await _}}let f={id:i.id,index:i.index,path:i.path};if(u){var w,g,v;Object.assign(f,{...f,...Nr(i,u,o),handle:u.handle,shouldRevalidate:Ct(n,u,i.id,s)});let E=r==null||(w=r.loaderData)===null||w===void 0?void 0:w[i.id],R=r==null||(g=r.errors)===null||g===void 0?void 0:g[i.id],_=s==null&&(((v=u.clientLoader)===null||v===void 0?void 0:v.hydrate)===!0||!i.hasLoader);f.loader=async({request:y,params:x},b)=>{try{return await p(async()=>(C(u,"No `routeModule` available for critical-route loader"),u.clientLoader?u.clientLoader({request:y,params:x,async serverLoader(){if(le("loader",i,o),_){if(E!==void 0)return E;if(R!==void 0)throw R;return null}return c(y,!0,b)}}):o?null:c(y,!1,b)))}finally{_=!1}},f.loader.hydrate=Fe(i,u,o),f.action=({request:y,params:x},b)=>p(async()=>{if(C(u,"No `routeModule` available for critical-route action"),!u.clientAction){if(o)throw Pe("clientAction",i.id);return d(y,!1,b)}return u.clientAction({request:y,params:x,async serverAction(){return le("action",i,o),d(y,!0,b)}})})}else i.hasClientLoader||(f.loader=({request:E},R)=>p(()=>o?Promise.resolve(null):c(E,!1,R))),i.hasClientAction||(f.action=({request:E},R)=>p(()=>{if(o)throw Pe("clientAction",i.id);return d(E,!1,R)})),f.lazy=async()=>{let E=await Mr(i,t),R={...E};if(E.clientLoader){let _=E.clientLoader;R.loader=(y,x)=>_({...y,async serverLoader(){return le("loader",i,o),c(y.request,!0,x)}})}if(E.clientAction){let _=E.clientAction;R.action=(y,x)=>_({...y,async serverAction(){return le("action",i,o),d(y.request,!0,x)}})}return{...R.loader?{loader:R.loader}:{},...R.action?{action:R.action}:{},hasErrorBoundary:R.hasErrorBoundary,shouldRevalidate:Ct(n,R,i.id,s),handle:R.handle,Component:R.Component,ErrorBoundary:R.ErrorBoundary}};let S=V(e,t,r,n,o,i.id,l,s);return S.length>0&&(f.children=S),f})}function Ct(e,t,r,n){if(n)return $r(r,t.shouldRevalidate,n);if(e.v3_singleFetch&&t.shouldRevalidate){let o=t.shouldRevalidate;return a=>o({...a,defaultShouldRevalidate:!0})}return t.shouldRevalidate}function $r(e,t,r){let n=!1;return o=>n?t?t(o):o.defaultShouldRevalidate:(n=!0,r.has(e))}async function Mr(e,t){let r=await re(e,t);return await _e(e,r),{Component:Mt(r),ErrorBoundary:r.ErrorBoundary,clientAction:r.clientAction,clientLoader:r.clientLoader,handle:r.handle,links:r.links,meta:r.meta,shouldRevalidate:r.shouldRevalidate}}async function Dr(e,t){let r=await Oe(e,t.id);if(r instanceof Error)throw r;if(gt(r))throw Pr(r);if(Rt(r))throw r;return vt(r)&&r.body?await xt(r.body):r}function Ar(e){if(_t(e))return e.data;if(W(e)){let t=e.headers.get("Content-Type");return t&&/\bapplication\/json\b/.test(t)?e.json():e.text()}return e}function Pr(e){let t=parseInt(e.headers.get("X-Remix-Status"),10)||302,r=e.headers.get("X-Remix-Redirect"),n={},o=e.headers.get("X-Remix-Revalidate");o&&(n["X-Remix-Revalidate"]=o);let a=e.headers.get("X-Remix-Reload-Document");a&&(n["X-Remix-Reload-Document"]=a);let l=e.headers.get("X-Remix-Replace");return l&&(n["X-Remix-Replace"]=l),ee(r,{status:t,headers:n})}function Mt(e){if(e.default==null)return;if(!(typeof e.default=="object"&&Object.keys(e.default).length===0))return e.default}function Fe(e,t,r){return r&&e.id!=="root"||t.clientLoader!=null&&(t.clientLoader.hydrate===!0||e.hasLoader!==!0)}var ce=new Set,Fr=1e3,ue=new Set,Ir=7680;function de(e,t){return e.v3_lazyRouteDiscovery===!0&&!t}function At(e,t){let r=new Set(t.state.matches.map(l=>l.route.id)),n=t.state.location.pathname.split("/").filter(Boolean),o=["/"];for(n.pop();n.length>0;)o.push(`/${n.join("/")}`),n.pop();o.forEach(l=>{let s=U(t.routes,l,t.basename);s&&s.forEach(i=>r.add(i.route.id))});let a=[...r].reduce((l,s)=>Object.assign(l,{[s]:e.routes[s]}),{});return{...e,routes:a}}function Pt(e,t,r,n,o){if(de(r,n))return async({path:a,patch:l,signal:s,fetcherKey:i})=>{ue.has(a)||await It([a],i?window.location.href:a,e,t,r,n,o,l,s)}}function Ft(e,t,r,n,o){Dt.useEffect(()=>{var a;if(!de(n,o)||((a=navigator.connection)===null||a===void 0?void 0:a.saveData)===!0)return;function l(c){let d=c.tagName==="FORM"?c.getAttribute("action"):c.getAttribute("href");if(!d)return;let p=new URL(d,window.location.origin);ue.has(p.pathname)||ce.add(p.pathname)}async function s(){let c=Array.from(ce.keys()).filter(d=>ue.has(d)?(ce.delete(d),!1):!0);if(c.length!==0)try{await It(c,null,t,r,n,o,e.basename,e.patchRoutes)}catch(d){console.error("Failed to fetch manifest patches",d)}}document.body.querySelectorAll("a[data-discover], form[data-discover]").forEach(c=>l(c)),s();let i=Tr(s,100);function u(c){return c.nodeType===Node.ELEMENT_NODE}let h=new MutationObserver(c=>{let d=new Set;c.forEach(p=>{[p.target,...p.addedNodes].forEach(f=>{u(f)&&((f.tagName==="A"&&f.getAttribute("data-discover")||f.tagName==="FORM"&&f.getAttribute("data-discover"))&&d.add(f),f.tagName!=="A"&&f.querySelectorAll("a[data-discover], form[data-discover]").forEach(w=>d.add(w)))})}),d.forEach(p=>l(p)),i()});return h.observe(document.documentElement,{subtree:!0,childList:!0,attributes:!0,attributeFilter:["data-discover","href","action"]}),()=>h.disconnect()},[n,o,t,r,e])}var Ie="remix-manifest-version";async function It(e,t,r,n,o,a,l,s,i){let u=`${l??"/"}/__manifest`.replace(/\/+/g,"/"),h=new URL(u,window.location.origin);if(e.sort().forEach(w=>h.searchParams.append("p",w)),h.searchParams.set("version",r.version),h.toString().length>Ir){ce.clear();return}let c;try{let w=await fetch(h,{signal:i});if(w.ok){if(w.status===204&&w.headers.has("X-Remix-Reload-Document")){if(!t){console.warn("Detected a manifest version mismatch during eager route discovery. The next navigation/fetch to an undiscovered route will result in a new document navigation to sync up with the latest manifest.");return}if(sessionStorage.getItem(Ie)===r.version){console.error("Unable to discover routes due to manifest version mismatch.");return}throw sessionStorage.setItem(Ie,r.version),window.location.href=t,new Error("Detected manifest version mismatch, reloading...")}else if(w.status>=400)throw new Error(await w.text())}else throw new Error(`${w.status} ${w.statusText}`);sessionStorage.removeItem(Ie),c=await w.json()}catch(w){if(i!=null&&i.aborted)return;throw w}let d=new Set(Object.keys(r.routes)),p=Object.values(c).reduce((w,g)=>d.has(g.id)?w:Object.assign(w,{[g.id]:g}),{});Object.assign(r.routes,p),e.forEach(w=>jr(w,ue));let f=new Set;Object.values(p).forEach(w=>{(!w.parentId||!p[w.parentId])&&f.add(w.parentId)}),f.forEach(w=>s(w||null,V(p,n,null,o,a,w)))}function jr(e,t){if(t.size>=Fr){let r=t.values().next().value;typeof r=="string"&&t.delete(r)}t.add(e)}function Tr(e,t){let r;return(...n)=>{window.clearTimeout(r),r=window.setTimeout(()=>e(...n),t)}}function Tt(){let e=m.useContext(Ge);return C(e,"You must render this element inside a <DataRouterContext.Provider> element"),e}function me(){let e=m.useContext(We);return C(e,"You must render this element inside a <DataRouterStateContext.Provider> element"),e}var Q=m.createContext(void 0);Q.displayName="Remix";function D(){let e=m.useContext(Q);return C(e,"You must render this element inside a <Remix> element"),e}function Ht(e,t){let[r,n]=m.useState(!1),[o,a]=m.useState(!1),{onFocus:l,onBlur:s,onMouseEnter:i,onMouseLeave:u,onTouchStart:h}=t,c=m.useRef(null);m.useEffect(()=>{if(e==="render"&&a(!0),e==="viewport"){let f=g=>{g.forEach(v=>{a(v.isIntersecting)})},w=new IntersectionObserver(f,{threshold:.5});return c.current&&w.observe(c.current),()=>{w.disconnect()}}},[e]);let d=()=>{e==="intent"&&n(!0)},p=()=>{e==="intent"&&(n(!1),a(!1))};return m.useEffect(()=>{if(r){let f=setTimeout(()=>{a(!0)},100);return()=>{clearTimeout(f)}}},[r]),[o,c,{onFocus:Z(l,d),onBlur:Z(s,p),onMouseEnter:Z(i,d),onMouseLeave:Z(u,p),onTouchStart:Z(h,d)}]}var je=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;function Te(e,t,r){return e==="render"&&!t&&!r?"true":void 0}var Ut=m.forwardRef(({to:e,prefetch:t="none",discover:r="render",...n},o)=>{let a=typeof e=="string"&&je.test(e),l=te(e),[s,i,u]=Ht(t,n);return m.createElement(m.Fragment,null,m.createElement(rt,L({},n,u,{ref:Vt(o,i),to:e,"data-discover":Te(r,a,n.reloadDocument)})),s&&!a?m.createElement(he,{page:l}):null)});Ut.displayName="NavLink";var Jt=m.forwardRef(({to:e,prefetch:t="none",discover:r="render",...n},o)=>{let a=typeof e=="string"&&je.test(e),l=te(e),[s,i,u]=Ht(t,n);return m.createElement(m.Fragment,null,m.createElement(tt,L({},n,u,{ref:Vt(o,i),to:e,"data-discover":Te(r,a,n.reloadDocument)})),s&&!a?m.createElement(he,{page:l}):null)});Jt.displayName="Link";var zt=m.forwardRef(({discover:e="render",...t},r)=>{let n=typeof t.action=="string"&&je.test(t.action);return m.createElement(nt,L({},t,{ref:r,"data-discover":Te(e,n,t.reloadDocument)}))});zt.displayName="Form";function Z(e,t){return r=>{e&&e(r),r.defaultPrevented||t(r)}}function He(e,t,r){if(r&&!fe)return[e[0]];if(t){let n=e.findIndex(o=>t[o.route.id]!==void 0);return e.slice(0,n+1)}return e}function Hr(){let{isSpaMode:e,manifest:t,routeModules:r,criticalCss:n}=D(),{errors:o,matches:a}=me(),l=He(a,o,e),s=m.useMemo(()=>it(l,r,t),[l,r,t]);return m.createElement(m.Fragment,null,n?m.createElement("style",{dangerouslySetInnerHTML:{__html:n}}):null,s.map(({key:i,link:u})=>oe(u)?m.createElement(he,L({key:i},u)):m.createElement("link",L({key:i},u))))}function he({page:e,...t}){let{router:r}=Tt(),n=m.useMemo(()=>U(r.routes,e,r.basename),[r.routes,e,r.basename]);return n?m.createElement(Jr,L({page:e,matches:n},t)):(console.warn(`Tried to prefetch ${e} but no routes matched.`),null)}function Ur(e){let{manifest:t,routeModules:r}=D(),[n,o]=m.useState([]);return m.useEffect(()=>{let a=!1;return st(e,t,r).then(l=>{a||o(l)}),()=>{a=!0}},[e,t,r]),n}function Jr({page:e,matches:t,...r}){let n=B(),{future:o,manifest:a,routeModules:l}=D(),{loaderData:s,matches:i}=me(),u=m.useMemo(()=>xe(e,t,i,a,n,o,"data"),[e,t,i,a,n,o]),h=m.useMemo(()=>{if(!o.v3_singleFetch)return lt(e,u,a);if(e===n.pathname+n.search+n.hash)return[];let f=new Set,w=!1;if(t.forEach(v=>{var S;a.routes[v.route.id].hasLoader&&(!u.some(E=>E.route.id===v.route.id)&&v.route.id in s&&(S=l[v.route.id])!==null&&S!==void 0&&S.shouldRevalidate||a.routes[v.route.id].hasClientLoader?w=!0:f.add(v.route.id))}),f.size===0)return[];let g=q(e);return w&&f.size>0&&g.searchParams.set("_routes",t.filter(v=>f.has(v.route.id)).map(v=>v.route.id).join(",")),[g.pathname+g.search]},[o.v3_singleFetch,s,n,a,u,t,e,l]),c=m.useMemo(()=>xe(e,t,i,a,n,o,"assets"),[e,t,i,a,n,o]),d=m.useMemo(()=>ct(c,a),[c,a]),p=Ur(c);return m.createElement(m.Fragment,null,h.map(f=>m.createElement("link",L({key:f,rel:"prefetch",as:"fetch",href:f},r))),d.map(f=>m.createElement("link",L({key:f,rel:"modulepreload",href:f},r))),p.map(({key:f,link:w})=>m.createElement("link",L({key:f},w))))}function zr(){let{isSpaMode:e,routeModules:t}=D(),{errors:r,matches:n,loaderData:o}=me(),a=B(),l=He(n,r,e),s=null;r&&(s=r[l[l.length-1].route.id]);let i=[],u=null,h=[];for(let c=0;c<l.length;c++){let d=l[c],p=d.route.id,f=o[p],w=d.params,g=t[p],v=[],S={id:p,data:f,meta:[],params:d.params,pathname:d.pathname,handle:d.route.handle,error:s};if(h[c]=S,g!=null&&g.meta?v=typeof g.meta=="function"?g.meta({data:f,params:w,location:a,matches:h,error:s}):Array.isArray(g.meta)?[...g.meta]:g.meta:u&&(v=[...u]),v=v||[],!Array.isArray(v))throw new Error("The route at "+d.route.path+` returns an invalid value. All route meta functions must return an array of meta objects.

To reference the meta function API, see https://remix.run/route/meta`);S.meta=v,h[c]=S,i=[...v],u=i}return m.createElement(m.Fragment,null,i.flat().map(c=>{if(!c)return null;if("tagName"in c){let{tagName:d,...p}=c;return Br(d)?m.createElement(d,L({key:JSON.stringify(p)},p)):(console.warn(`A meta object uses an invalid tagName: ${d}. Expected either 'link' or 'meta'`),null)}if("title"in c)return m.createElement("title",{key:"title"},String(c.title));if("charset"in c&&(c.charSet??=c.charset,delete c.charset),"charSet"in c&&c.charSet!=null)return typeof c.charSet=="string"?m.createElement("meta",{key:"charSet",charSet:c.charSet}):null;if("script:ld+json"in c)try{let d=JSON.stringify(c["script:ld+json"]);return m.createElement("script",{key:`script:ld+json:${d}`,type:"application/ld+json",dangerouslySetInnerHTML:{__html:d}})}catch{return null}return m.createElement("meta",L({key:JSON.stringify(c)},c))}))}function Br(e){return typeof e=="string"&&/^(meta|link)$/.test(e)}function Bt(e){return m.createElement(Ze,e)}var fe=!1;function De(e){let{manifest:t,serverHandoffString:r,abortDelay:n,serializeError:o,isSpaMode:a,future:l,renderMeta:s}=D(),{router:i,static:u,staticContext:h}=Tt(),{matches:c}=me(),d=de(l,a);s&&(s.didRenderScripts=!0);let p=He(c,null,a);m.useEffect(()=>{fe=!0},[]);let f=(y,x)=>{let b;return o&&x instanceof Error?b=o(x):b=x,`${JSON.stringify(y)}:__remixContext.p(!1, ${G(JSON.stringify(b))})`},w=(y,x,b)=>{let N;try{N=JSON.stringify(b)}catch(X){return f(x,X)}return`${JSON.stringify(x)}:__remixContext.p(${G(N)})`},g=(y,x,b)=>{let N;return o&&b instanceof Error?N=o(b):N=b,`__remixContext.r(${JSON.stringify(y)}, ${JSON.stringify(x)}, !1, ${G(JSON.stringify(N))})`},v=(y,x,b)=>{let N;try{N=JSON.stringify(b)}catch(X){return g(y,x,X)}return`__remixContext.r(${JSON.stringify(y)}, ${JSON.stringify(x)}, ${G(N)})`},S=[],E=m.useMemo(()=>{var y;let x=l.v3_singleFetch?"window.__remixContext.stream = new ReadableStream({start(controller){window.__remixContext.streamController = controller;}}).pipeThrough(new TextEncoderStream());":"",b=h?`window.__remixContext = ${r};${x}`:" ",N=l.v3_singleFetch?void 0:h?.activeDeferreds;b+=N?["__remixContext.p = function(v,e,p,x) {","  if (typeof e !== 'undefined') {",`    x=new Error("Unexpected Server Error");
    x.stack=undefined;`,"    p=Promise.reject(x);","  } else {","    p=Promise.resolve(v);","  }","  return p;","};","__remixContext.n = function(i,k) {","  __remixContext.t = __remixContext.t || {};","  __remixContext.t[i] = __remixContext.t[i] || {};","  let p = new Promise((r, e) => {__remixContext.t[i][k] = {r:(v)=>{r(v);},e:(v)=>{e(v);}};});",typeof n=="number"?`setTimeout(() => {if(typeof p._error !== "undefined" || typeof p._data !== "undefined"){return;} __remixContext.t[i][k].e(new Error("Server timeout."))}, ${n});`:"","  return p;","};","__remixContext.r = function(i,k,v,e,p,x) {","  p = __remixContext.t[i][k];","  if (typeof e !== 'undefined') {",`    x=new Error("Unexpected Server Error");
    x.stack=undefined;`,"    p.e(x);","  } else {","    p.r(v);","  }","};"].join(`
`)+Object.entries(N).map(([M,A])=>{let Gt=new Set(A.pendingKeys),Wt=A.deferredKeys.map(P=>{if(Gt.has(P))return S.push(m.createElement(jt,{key:`${M} | ${P}`,deferredData:A,routeId:M,dataKey:P,scriptProps:e,serializeData:v,serializeError:g})),`${JSON.stringify(P)}:__remixContext.n(${JSON.stringify(M)}, ${JSON.stringify(P)})`;{let we=A.data[P];return typeof we._error<"u"?f(P,we._error):w(M,P,we._data)}}).join(`,
`);return`Object.assign(__remixContext.state.loaderData[${JSON.stringify(M)}], {${Wt}});`}).join(`
`)+(S.length>0?`__remixContext.a=${S.length};`:""):"";let X=u?`${(y=t.hmr)!==null&&y!==void 0&&y.runtime?`import ${JSON.stringify(t.hmr.runtime)};`:""}${d?"":`import ${JSON.stringify(t.url)}`};
${p.map((M,A)=>`import * as route${A} from ${JSON.stringify(t.routes[M.route.id].module)};`).join(`
`)}
${d?`window.__remixManifest = ${JSON.stringify(At(t,i),null,2)};`:""}
window.__remixRouteModules = {${p.map((M,A)=>`${JSON.stringify(M.route.id)}:route${A}`).join(",")}};

import(${JSON.stringify(t.entry.module)});`:" ";return m.createElement(m.Fragment,null,m.createElement("script",L({},e,{suppressHydrationWarning:!0,dangerouslySetInnerHTML:Se(b),type:void 0})),m.createElement("script",L({},e,{suppressHydrationWarning:!0,dangerouslySetInnerHTML:Se(X),type:"module",async:!0})))},[]);if(!u&&typeof __remixContext=="object"&&__remixContext.a)for(let y=0;y<__remixContext.a;y++)S.push(m.createElement(jt,{key:y,scriptProps:e,serializeData:v,serializeError:g}));let R=p.map(y=>{let x=t.routes[y.route.id];return(x.imports||[]).concat([x.module])}).flat(1),_=fe?[]:t.entry.imports.concat(R);return fe?null:m.createElement(m.Fragment,null,d?null:m.createElement("link",{rel:"modulepreload",href:t.url,crossOrigin:e.crossOrigin}),m.createElement("link",{rel:"modulepreload",href:t.entry.module,crossOrigin:e.crossOrigin}),Xr(_).map(y=>m.createElement("link",{key:y,rel:"modulepreload",href:y,crossOrigin:e.crossOrigin})),E,S)}function jt({dataKey:e,deferredData:t,routeId:r,scriptProps:n,serializeData:o,serializeError:a}){return typeof document>"u"&&t&&e&&r&&C(t.pendingKeys.includes(e),`Deferred data for route ${r} with key ${e} was not pending but tried to render a script for it.`),m.createElement(m.Suspense,{fallback:typeof document>"u"&&t&&e&&r?null:m.createElement("script",L({},n,{async:!0,suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:" "}}))},typeof document>"u"&&t&&e&&r?m.createElement(Bt,{resolve:t.data[e],errorElement:m.createElement(Vr,{dataKey:e,routeId:r,scriptProps:n,serializeError:a}),children:l=>m.createElement("script",L({},n,{async:!0,suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:o(r,e,l)}}))}):m.createElement("script",L({},n,{async:!0,suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:" "}})))}function Vr({dataKey:e,routeId:t,scriptProps:r,serializeError:n}){let o=ve();return m.createElement("script",L({},r,{suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:n(t,e,o)}}))}function Xr(e){return[...new Set(e)]}function Yr(){return Ke()}function Gr(){return qe()}function Wr(e={}){return ot(e)}function Vt(...e){return t=>{e.forEach(r=>{typeof r=="function"?r(t):r!=null&&(r.current=t)})}}z();function Xt(e){if(!e)return null;let t=Object.entries(e),r={};for(let[n,o]of t)if(o&&o.__type==="RouteErrorResponse")r[n]=new j(o.status,o.statusText,o.data,o.internal===!0);else if(o&&o.__type==="Error"){if(o.__subType){let a=window[o.__subType];if(typeof a=="function")try{let l=new a(o.message);l.stack=o.stack,r[n]=l}catch{}}if(r[n]==null){let a=new Error(o.message);a.stack=o.stack,r[n]=a}}else r[n]=o;return r}var H,$,Ue=!1;var Je,io=new Promise(e=>{Je=e}).catch(()=>{});function Kr(e){if(!$){if(window.__remixContext.future.v3_singleFetch){if(!H){let s=window.__remixContext.stream;C(s,"No stream found for single fetch decoding"),window.__remixContext.stream=void 0,H=$e(s,window).then(i=>{window.__remixContext.state=i.value,H.value=!0}).catch(i=>{H.error=i})}if(H.error)throw H.error;if(!H.value)throw H}let a=V(window.__remixManifest.routes,window.__remixRouteModules,window.__remixContext.state,window.__remixContext.future,window.__remixContext.isSpaMode),l;if(!window.__remixContext.isSpaMode){l={...window.__remixContext.state,loaderData:{...window.__remixContext.state.loaderData}};let s=U(a,window.location,window.__remixContext.basename);if(s)for(let i of s){let u=i.route.id,h=window.__remixRouteModules[u],c=window.__remixManifest.routes[u];h&&Fe(c,h,window.__remixContext.isSpaMode)&&(h.HydrateFallback||!c.hasLoader)?l.loaderData[u]=void 0:c&&!c.hasLoader&&(l.loaderData[u]=null)}l&&l.errors&&(l.errors=Xt(l.errors))}$=Ye({routes:a,history:ze(),basename:window.__remixContext.basename,future:{v7_normalizeFormMethod:!0,v7_fetcherPersist:window.__remixContext.future.v3_fetcherPersist,v7_partialHydration:!0,v7_prependBasename:!0,v7_relativeSplatPath:window.__remixContext.future.v3_relativeSplatPath,v7_skipActionErrorRevalidation:window.__remixContext.future.v3_singleFetch===!0},hydrationData:l,mapRouteProperties:Qe,dataStrategy:window.__remixContext.future.v3_singleFetch&&!window.__remixContext.isSpaMode?St(window.__remixManifest,window.__remixRouteModules,()=>$):void 0,patchRoutesOnNavigation:Pt(window.__remixManifest,window.__remixRouteModules,window.__remixContext.future,window.__remixContext.isSpaMode,window.__remixContext.basename)}),$.state.initialized&&(Ue=!0,$.initialize()),$.createRoutesForHMR=$t,window.__remixRouter=$,Je&&Je($)}let[t,r]=k.useState(void 0),[n,o]=k.useState($.state.location);return k.useLayoutEffect(()=>{Ue||(Ue=!0,$.initialize())},[]),k.useLayoutEffect(()=>$.subscribe(a=>{a.location!==n&&o(a.location)}),[n]),Ft($,window.__remixManifest,window.__remixRouteModules,window.__remixContext.future,window.__remixContext.isSpaMode),k.createElement(k.Fragment,null,k.createElement(Q.Provider,{value:{manifest:window.__remixManifest,routeModules:window.__remixRouteModules,future:window.__remixContext.future,criticalCss:t,isSpaMode:window.__remixContext.isSpaMode}},k.createElement(ie,{location:n},k.createElement(et,{router:$,fallbackElement:null,future:{v7_startTransition:!0}}))),window.__remixContext.future.v3_singleFetch?k.createElement(k.Fragment,null):null)}J();var pe=F(I());J();var Yt="positions";function qr({getKey:e,...t}){let{isSpaMode:r}=D(),n=B(),o=Re();at({getKey:e,storageKey:Yt});let a=pe.useMemo(()=>{if(!e)return null;let s=e(n,o);return s!==n.key?s:null},[]);if(r)return null;let l=((s,i)=>{if(!window.history.state||!window.history.state.key){let u=Math.random().toString(32).slice(2);window.history.replaceState({key:u},"")}try{let h=JSON.parse(sessionStorage.getItem(s)||"{}")[i||window.history.state.key];typeof h=="number"&&window.scrollTo(0,h)}catch(u){console.error(u),sessionStorage.removeItem(s)}}).toString();return pe.createElement("script",L({},t,{suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${l})(${JSON.stringify(Yt)}, ${JSON.stringify(a)})`}}))}export{Ut as a,zt as b,Hr as c,zr as d,De as e,Yr as f,Gr as g,Wr as h,Kr as i,qr as j};
/*! Bundled license information:

@remix-run/react/dist/esm/_virtual/_rollupPluginBabelHelpers.js:
  (**
   * @remix-run/react v2.17.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/invariant.js:
  (**
   * @remix-run/react v2.17.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/routeModules.js:
  (**
   * @remix-run/react v2.17.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/links.js:
  (**
   * @remix-run/react v2.17.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/markup.js:
  (**
   * @remix-run/react v2.17.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/single-fetch.js:
  (**
   * @remix-run/server-runtime v2.17.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/index.js:
  (**
   * @remix-run/server-runtime v2.17.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/data.js:
  (**
   * @remix-run/react v2.17.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/single-fetch.js:
  (**
   * @remix-run/react v2.17.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/errorBoundaries.js:
  (**
   * @remix-run/react v2.17.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/fallback.js:
  (**
   * @remix-run/react v2.17.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/routes.js:
  (**
   * @remix-run/react v2.17.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/fog-of-war.js:
  (**
   * @remix-run/react v2.17.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/components.js:
  (**
   * @remix-run/react v2.17.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/errors.js:
  (**
   * @remix-run/react v2.17.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/browser.js:
  (**
   * @remix-run/react v2.17.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/scroll-restoration.js:
  (**
   * @remix-run/react v2.17.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/index.js:
  (**
   * @remix-run/react v2.17.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)
*/

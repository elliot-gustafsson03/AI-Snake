var E=Object.defineProperty;var I=(e,t,r)=>t in e?E(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var o=(e,t,r)=>(I(e,typeof t!="symbol"?t+"":t,r),r);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function r(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(n){if(n.ep)return;n.ep=!0;const i=r(n);fetch(n.href,i)}})();class P{getPos(){return this.pos}getColor(){return this.color}}const p=28,f=21,a=10;function M(e){return e.x<0||e.x>=p||e.y<0||e.y>=f}function H(e){for(;;){let t={x:Math.floor(Math.random()*p),y:Math.floor(Math.random()*f)};if(!x(t,e))return t}}function x(e,t){for(let r=0;r<t.length;r++)if(y(e,t[r]))return!0;return!1}function y(e,t){return e.x==t.x&&e.y==t.y}function d(e,t){return y(e,t)}function R(e,t){return{x:e.x-t.x,y:e.y-t.y}}function u(e,t){return{x:e.x+t.x,y:e.y+t.y}}function j(e){return e.x==0&&e.y==0}function m(e){return{x:e.y,y:-e.x}}function v(e){return{x:-e.y,y:e.x}}function G(e){return{x:-e.x,y:-e.y}}class N extends P{constructor(){super();o(this,"pos");o(this,"color");o(this,"tail");o(this,"vel",{x:0,y:0});this.pos={x:Math.floor(p/2),y:Math.floor(f/2)},this.color="#ffffff",this.tail=[]}move(){if(this.tail.length>0){for(let r=this.tail.length-1;r>0;r--)this.tail[r].pos=Object.assign({},this.tail[r-1].pos);this.tail[0].pos=Object.assign({},this.pos)}this.pos=u(this.pos,this.vel)}grow(){this.tail.push({pos:Object.assign({},this.pos),color:V()})}}function V(){const r=Math.floor(Math.random()*128)+128,s=Math.floor(Math.random()*128)+128,n=Math.floor(Math.random()*128)+128,i=r.toString(16).padStart(2,"0"),c=s.toString(16).padStart(2,"0"),C=n.toString(16).padStart(2,"0");return`#${i}${c}${C}`}class $ extends P{constructor(r){super();o(this,"pos");o(this,"color");this.pos=r,this.color="#fc664c"}}class S{constructor(t,r,s,n){o(this,"context");o(this,"controller");o(this,"fps");o(this,"gameOverCallback");o(this,"interval");o(this,"snake");o(this,"apple");o(this,"points",0);this.context=t,this.controller=r,this.fps=s,this.gameOverCallback=n}start(){this.snake=new N,this.apple=this.spawnApple(),this.setUpdate()}setUpdate(){this.interval=setInterval(this.update.bind(this),1e3/this.fps)}update(){this.move(),this.render(),this.checkCollisions()}move(){this.snake.vel=this.controller.getNewVelocity({snake:this.snake,apple:this.apple}),this.snake.move()}render(){this.context.clearRect(0,0,p*a,f*a),this.fillPixel(this.apple.getPos(),this.apple.getColor()),this.snake.tail.forEach(t=>{this.fillPixel(t.pos,t.color)}),this.fillPixel(this.snake.getPos(),this.snake.getColor())}fillPixel(t,r){this.context.fillStyle=r,this.context.fillRect(t.x*a+1,t.y*a+1,a-2,a-2)}checkCollisions(){if(y(this.snake.getPos(),this.apple.getPos())){this.eatApple();return}if(M(this.snake.getPos())){this.gameOver();return}if(x(this.snake.getPos(),this.snake.tail.map(t=>t.pos))){this.gameOver();return}}spawnApple(){return new $(H([this.snake.getPos(),...this.snake.tail.map(t=>t.pos)]))}eatApple(){this.controller.reward(),document.querySelector("#points").innerHTML=`Points: ${++this.points}`,this.snake.grow(),this.apple=this.spawnApple()}gameOver(){this.controller.punish(),clearInterval(this.interval),document.querySelector("#points").innerHTML="Points: 0",this.gameOverCallback(this.points)}pause(){clearInterval(this.interval)}resume(){this.setUpdate()}}class q{}function A(e){return K(e)*8+D(e)}function K(e){const t=R(e.apple.getPos(),e.snake.getPos());let r;return Math.abs(t.x)>Math.abs(t.y)?r={x:t.x/Math.abs(t.x),y:0}:r={x:0,y:t.y/Math.abs(t.y)},d(r,v(e.snake.vel))?1:d(r,G(e.snake.vel))?2:d(r,m(e.snake.vel))?3:0}function D(e){const t=[u(e.snake.getPos(),m(e.snake.vel)),u(e.snake.getPos(),e.snake.vel),u(e.snake.getPos(),v(e.snake.vel))];let r=0;for(let s=0;s<t.length;s++)(M(t[s])||x(t[s],e.snake.tail.map(n=>n.pos)))&&(r+=Math.pow(2,s));return r}class U extends q{constructor(){super();o(this,"lastKey","");this.listen()}listen(){window.addEventListener("keydown",r=>{this.lastKey=r.key})}getNewVelocity(r){A(r);let s=r.snake.vel,n={x:0,y:0};switch(this.lastKey){case"ArrowUp":n.y=-1;break;case"ArrowDown":n.y=1;break;case"ArrowLeft":n.x=-1;break;case"ArrowRight":n.x=1;break;default:return s}return n.x==-s.x&&n.y==-s.y?s:n}reward(){console.log("Good job!")}punish(){console.log("Too bad!")}}class W{constructor(){o(this,"table");this.table=Array(32);for(let t=0;t<this.table.length;t++){this.table[t]=Array(3);for(let r=0;r<this.table[t].length;r++)this.table[t][r]=Math.random()}}getBestAction(t){const r=this.table[t],s=Math.max(...r);for(let n=0;n<r.length;n++)if(r[n]==s)return n;return 1}addWeight(t,r){this.table[t.stateIndex][t.action]+=r}randomAction(){return Math.floor(Math.random()*3)}}class L extends q{constructor(){super();o(this,"qTable");o(this,"prevState");o(this,"exploreRate",.5);this.qTable=new W}getNewVelocity(r){j(r.snake.vel)&&(r.snake.vel={x:0,y:-1});const s=A(r),n=this.explore()?this.qTable.getBestAction(s):this.qTable.randomAction();switch(this.prevState={stateIndex:s,action:n},n){case 0:return m(r.snake.vel);case 1:return r.snake.vel;case 2:return v(r.snake.vel);default:return r.snake.vel}}explore(){return this.exploreRate<Math.random()}reduceExploreRate(r){this.exploreRate=.5*Math.pow(.9,r),console.log(this.exploreRate)}reward(){this.prevState&&this.qTable.addWeight(this.prevState,1)}punish(){this.prevState&&this.qTable.addWeight(this.prevState,-1)}}let l,B=1,h=0,g=!1;function O(e){var n;let t=+document.querySelector("#fps").value;(n=document.querySelector("#select-controller"))==null||n.remove();const r=document.querySelector("canvas"),s=r==null?void 0:r.getContext("2d");l=new S(s,e,t,T),l.start()}function T(e){document.querySelector("#generation").innerHTML=`Generation ${++B}`,e>h&&(h=e,document.querySelector("#highscore").innerHTML=`Highscore: ${h}`);let t=l.context,r=l.controller,s=l.fps;r instanceof L&&r.reduceExploreRate(h),l=new S(t,r,s,T),l.start()}var k;(k=document.querySelector("#keyboard-input"))==null||k.addEventListener("click",()=>{O(new U)});var b;(b=document.querySelector("#ai-input"))==null||b.addEventListener("click",()=>{O(new L)});var w;(w=document.querySelector("#pause-btn"))==null||w.addEventListener("click",()=>{let e="";g?(e="pause.svg",l==null||l.resume()):(e="play.svg",l==null||l.pause()),document.querySelector("#pause-btn").src=e,g=!g});
parcelRequire=function(e,r,n){var t="function"==typeof parcelRequire&&parcelRequire,i="function"==typeof require&&require;function u(n,o){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!o&&f)return f(n,!0);if(t)return t(n,!0);if(i&&"string"==typeof n)return i(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}a.resolve=function(r){return e[n][1][r]||r};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,a,l,l.exports)}return r[n].exports;function a(e){return u(a.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=t;for(var o=0;o<n.length;o++)u(n[o]);return u}({15:[function(require,module,exports) {
module.exports="still.c90d994f.png";
},{}],9:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("../../assets/images/villager/still.png"),s=o(e);function o(e){return e&&e.__esModule?e:{default:e}}const r=e=>new Promise((s,o)=>{const r=new Image;r.src=e,r.onload=s,r.onerror=o});class t{constructor(){this.imagesToLoad=[s.default]}onLoad(){return Promise.all(this.imagesToLoad.map(r))}}exports.default=t;
},{"../../assets/images/villager/still.png":15}],13:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});class t{constructor(t=0,e=0){this.x=t,this.y=e}_operation(t,e){[this.x,this.y]=e(t)}add(e,r=null){let i=t=>[this.x+t.x,this.y+t.y];e instanceof t?this._operation(e,i):"number"==typeof e&&"number"==typeof r?this._operation(new t(e,r),i):console.error("Error Point.add didn't receive the correct arguments")}sub(e,r=null){let i=t=>[this.x-t.x,this.y-t.y];e instanceof t?this._operation(e,i):"number"==typeof e&&"number"==typeof r?this._operation(new t(e,r),i):console.error("Error Point.add didn't receive the correct arguments")}multiply(t){let e=t=>[this.x*t,this.y*t];"number"==typeof t?this._operation(t,e):console.error("Error Point.multiply didn't receive the correct arguments")}checkEquals(t){return t.x===this.x&&t.y===this.y}getNormalised(){if(this.x||this.y){const e=Math.sqrt(this.x*this.x+this.y*this.y);return new t(this.x/e,this.y/e)}return new t}getDifference(e){if(e instanceof t)return new t(e.x-this.x,e.y-this.y)}getMagnitude(){return Math.sqrt(this.x*this.x+this.y*this.y)}}exports.default=t;
},{}],19:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("./Point"),i=h(t);function h(t){return t&&t.__esModule?t:{default:t}}class e{constructor(t,h,e,s=null){t instanceof i.default?(this.pos=new i.default(t.x,t.y),this.width=h,this.height=e):(this.pos=new i.default(t,h),this.width=e,this.height=s)}detectCollision(t){let h=t;return t instanceof i.default&&(h=new e(t,0,0)),h instanceof e&&this.x-this.width/2<h.x+h.width/2&&h.x-h.width/2<this.x+this.width/2&&this.y-this.height/2<h.y+h.height/2&&h.y-h.height/2<this.y+this.height/2}draw(t){t.strokeRect(this.x-this.width/2,this.y-this.height/2,this.width,this.height)}get x(){return this.pos.x}set x(t){this.pos.x=t}get y(){return this.pos.y}set y(t){this.pos.y=t}}exports.default=e;
},{"./Point":13}],28:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("../Point"),e=s(t);function s(t){return t&&t.__esModule?t:{default:t}}class i{constructor(t,s,i=1){t instanceof e.default?(this.pos=new e.default(t.x,t.y),this.distanceMultiplier=s||1):(this.pos=new e.default(t,s),this.distanceMultiplier=i)}getDistance(t){return this.distanceMultiplier*Math.sqrt(Math.pow(this.x-t.x,2)+Math.pow(this.y-t.y,2))}get x(){return this.pos.x}get y(){return this.pos.y}}exports.default=i;
},{"../Point":13}],37:[function(require,module,exports) {
"use strict";function e(e,t){let n=0;for(let o of e){if(!(o.totalValue<t.totalValue))break;n++}return[...e.slice(0,n),t,...e.slice(n)]}function t(t,n,o,i){return o.reduce((o,{node:d},l)=>{if(i(t,d)){const i=t.getDistance(d);return e(o,{index:l,prevNodeIndex:-1,totalValue:n.getDistance(d)+i,totalWeight:i})}return o},[])}function n(n,o,i,d){const l=(e,t)=>e.totalWeight>=0&&e.totalWeight<=t.totalValue;let a=[],r=[],s=!0;d(n,o)||(s=!1,r=t(n,o,i,d));let f,u={node:o,totalWeight:-1,prevNodeIndex:-1},c=1e4;for(;r.length;){if(c--<=0)throw new Error("Reactor overloaded");const t=d(o,i[(f=r.shift()).index].node);if(l(u,f))break;for(let n of i[f.index].edges){if(a.some(e=>e.index===n))continue;const d=o.getDistance(i[n].node),l=i[f.index].node.getDistance(i[n].node)+f.totalWeight,s=d+l;if(t){const e=o.getDistance(i[f.index].node);(u.totalWeight<0||e<u.totalWeight)&&(u.totalWeight=e,u.prevNodeIndex=f.index)}const c=r.findIndex(e=>e.index===n);if(c>-1){if(r[c].totalValue<=s)continue;r.splice(c,1)}r=e(r,{index:n,prevNodeIndex:f.index,totalValue:s,totalWeight:l})}a.push(f)}let x=[o.pos],g=u.prevNodeIndex;for(;g>=0;)x.unshift(i[g].node.pos),g=a.find(e=>e.index===g).prevNodeIndex;return x.unshift(n.pos),s||2!==x.length||console.log("Could not find a valid route when pathfinding"),x}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=n;
},{}],33:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("../Hitbox"),t=a(e),i=require("../Point"),s=a(i),h=require("./Node"),d=a(h),n=require("./AStarFinder"),o=a(n);function a(e){return e&&e.__esModule?e:{default:e}}class c{constructor(e,t,i){this.obstacles=e,this.nodeWidth=t,this.nodeHeight=i,this.adjacencyList=[],this.update=!1}_checkLineOfSight(e,i){const h=(e.y-i.y)/(e.x-i.x),d=h<0?-1:1,n=h<0?1:-1,o=new s.default(e.x+d*this.nodeWidth/2,e.y-this.nodeHeight/2),a=new s.default(e.x+n*this.nodeWidth/2,e.y+this.nodeHeight/2),c=e=>e.y>h*(e.x-o.x)+o.y,r=e=>e.y<h*(e.x-a.x)+a.y,y=new t.default(e.x+(i.x-e.x)/2,e.y+(i.y-e.y)/2,Math.max(e.x-i.x+this.nodeWidth,i.x-e.x+this.nodeWidth)-1e-9,Math.max(e.y-i.y+this.nodeHeight,i.y-e.y+this.nodeHeight)-1e-9);for(let e of this.obstacles)if(y.detectCollision(e.hitbox)){const t=new s.default(e.x+d*e.width/2,e.y-e.height/2);if(c(new s.default(e.x+n*e.width/2,e.y+e.height/2))&&r(t))return!1}return!0}addNode(e){if(e instanceof d.default){const t={node:e,edges:[]};for(let i in this.adjacencyList){const s=Number(i),h=this.adjacencyList[s].node;this._checkLineOfSight(e,h)&&(t.edges.push(s),this.adjacencyList[s].edges.push(this.adjacencyList.length))}this.adjacencyList.push(t)}}getShortestRoute(e,t){return(0,o.default)(e,t,this.adjacencyList,this._checkLineOfSight.bind(this))}draw(e){for(let{node:t,edges:i}of this.adjacencyList){e.strokeStyle="blue",e.strokeRect(t.x-this.nodeWidth/2,t.y-this.nodeHeight/2,this.nodeWidth,this.nodeHeight);for(let s of i)e.strokeStyle="lime",e.beginPath(),e.moveTo(t.x,t.y),e.lineTo(this.adjacencyList[s].node.x,this.adjacencyList[s].node.y),e.stroke()}e.strokeStyle="black"}}exports.default=c;
},{"../Hitbox":19,"../Point":13,"./Node":28,"./AStarFinder":37}],20:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("../Hitbox"),e=u(t),r=require("./Network"),o=u(r),s=require("./Node"),i=u(s);function u(t){return t&&t.__esModule?t:{default:t}}class h{constructor(t){this.map=t,this.networks={}}_getNetworkKey(t){return"w"+t.width+"h"+t.height}_getNetwork(t){const e=this._getNetworkKey(t);return e in this.networks||this.addNetwork(t),this.networks[e]}_buildNetwork(t){let r=new o.default(this.map.obstacles,t.width,t.height),s=[];for(let r of this.map.obstacles){const o=r.getNodes(t).filter(r=>!this.map.checkCollision(new e.default(r.pos,t.width,t.height)));for(let t of o)s.push(t)}for(let t of s)r.addNode(t);return r}updateNetworks(){for(let t of Object.values(this.networks))t.update=!0}getShortestRoute(t,e){const r=new i.default(t.pos),o=new i.default(e);return this._getNetwork(t).getShortestRoute(r,o)}addNetwork(t){if(!(t instanceof e.default))return!1;const r=this._getNetworkKey(t);if(!(r in this.networks)){let e=this._buildNetwork(t);this.networks[r]=e}return!0}drawNetwork(t,e){this._getNetwork(t).draw(e)}}exports.default=h;
},{"../Hitbox":19,"./Network":33,"./Node":28}],27:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("./Hitbox"),e=r(t);function r(t){return t&&t.__esModule?t:{default:t}}class i{constructor(t,r,i,h){this.hitbox=new e.default(t,r,i,h)}get pos(){return this.hitbox.pos}get x(){return this.hitbox.x}get y(){return this.hitbox.y}get width(){return this.hitbox.width}get height(){return this.hitbox.height}}exports.default=i;
},{"./Hitbox":19}],18:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./Entity"),t=s(e),i=require("./Pathfinding/Node"),r=s(i);function s(e){return e&&e.__esModule?e:{default:e}}class u extends t.default{getNodes(e){let t=[];for(let i=-1;i<=1;i+=2)for(let s=-1;s<=1;s+=2)t.push(new r.default(this.x+i*(this.width/2+e.width/2),this.y+s*(this.height/2+e.height/2)));return t}}exports.default=u;
},{"./Entity":27,"./Pathfinding/Node":28}],25:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./Obstacle"),t=r(e);function r(e){return e&&e.__esModule?e:{default:e}}class s extends t.default{constructor(e,t){super(e,t,40,40)}}exports.default=s;
},{"./Obstacle":18}],35:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});class t{constructor(t,e,s={}){return this.name=t,this.action=e,this.data=s,this}}exports.default=t;
},{}],26:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("./Entity"),e=d(t),s=require("./Hitbox"),i=d(s),a=require("./Task"),o=d(a),h=require("../assets/images/villager/still.png"),n=d(h);function d(t){return t&&t.__esModule?t:{default:t}}const u=new Image;u.src=n.default;class l extends e.default{constructor(t,e,s){const i=2*u.width;super(e,s,i,i),this.map=t,this.actions={pathfind:function(t){if("points"in t.data||(t.data.points=this.map.pathfind(this.hitbox,t.data.hitbox.pos)),t.data.points.length&&this.pos.checkEquals(t.data.points[0])&&t.data.points.shift(),!t.data.points.length)return!0;this.moveTo(t.data.points[0])}},this.taskQueue=[],this.speed=1}moveTo(t){const e=this.pos.getDifference(t),s=e.getNormalised(),i=e.getMagnitude();i<this.speed?s.multiply(i):s.multiply(this.speed),this.pos.add(s)}addTask(t){t instanceof o.default&&this.taskQueue.push(t)}update(){if(this.taskQueue.length>0){!0===this.actions[this.taskQueue[0].action].call(this,this.taskQueue[0])&&this.taskQueue.shift()}else{let t;do{t=new i.default(960*Math.random(),540*Math.random(),this.width,this.height)}while(this.map.checkCollision(t));this.taskQueue.push(new o.default("Random pathing","pathfind",{hitbox:t}))}}draw(t){const e=u,s=2*e.width,i=2*e.height,a=this.taskQueue[0];if(t.strokeStyle="red",a&&"points"in a.data){const e=[this.pos].concat(a.data.points);for(let s=1;s<e.length;s++)t.strokeStyle=`rgb(${255-(s-1)/(e.length-1)*255}, 0, 0)`,t.beginPath(),t.moveTo(e[s-1].x,e[s-1].y),t.lineTo(e[s].x,e[s].y),t.stroke()}t.strokeStyle="white",t.drawImage(e,this.pos.x-s/2,this.pos.y-i,s,i)}}exports.default=l;
},{"./Entity":27,"./Hitbox":19,"./Task":35,"../assets/images/villager/still.png":15}],17:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./VillageCentre"),t=l(e),r=require("./Villager"),a=l(r);function l(e){return e&&e.__esModule?e:{default:e}}class s{constructor(e,r,l){this.villageCentre=new t.default(r,l),this.map=e,this.villagers=[],this.map.registerObstacle(this.villageCentre);for(var s=0;s<5;s++){let e=new a.default(this.map,960*Math.random(),540*Math.random());this.villagers.push(e)}}update(){for(let e of this.villagers)e.update()}draw(e){for(let t of this.villagers)t.draw(e)}}exports.default=s;
},{"./VillageCentre":25,"./Villager":26}],12:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("./Pathfinding/Pathfinder"),e=l(t),i=require("./Village"),s=l(i),a=require("./Obstacle"),r=l(a),h=require("./Hitbox"),o=l(h);function l(t){return t&&t.__esModule?t:{default:t}}class d{constructor(t){this.mapLimit=t,this.pathfinder=new e.default(this),this.obstacles=[],this.villages=[new s.default(this,this.mapLimit.x/2,this.mapLimit.y/2)];for(let t=0;t<10;t++)this.registerObstacle(new r.default(Math.random()*this.mapLimit.x,Math.random()*this.mapLimit.y,40,20));this._testHitbox=new o.default(960*Math.random(),540*Math.random(),16,16),this.pathfinder.addNetwork(this._testHitbox)}registerObstacle(t){this.obstacles.push(t),this.pathfinder.updateNetworks()}checkCollision(t){if(t.x<0||t.y<0||t.x+t.width>this.mapLimit.x||t.y+t.height>this.mapLimit.y)return!0;for(let e of this.obstacles)if(t.detectCollision(e.hitbox))return!0}pathfind(t,e){return this.pathfinder.getShortestRoute(t,e)}update(){for(let t of this.villages)t.update()}draw(t){this.pathfinder.drawNetwork(this._testHitbox,t);for(let e of this.obstacles)e.hitbox.draw(t);for(let e of this.villages)e.draw(t);t.strokeStyle="black"}}exports.default=d;
},{"./Pathfinding/Pathfinder":20,"./Village":17,"./Obstacle":18,"./Hitbox":19}],8:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("./Map"),e=a(t),i=require("./Point"),s=a(i);function a(t){return t&&t.__esModule?t:{default:t}}class h{constructor(t,i){this.canvas=t,this.ctx=i,this.map=new e.default(new s.default(t.width,t.height))}update(){this.map.update()}draw(){this.ctx.fillStyle="white",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height),this.ctx.fillStyle="black",this.ctx.strokeStyle="black",this.map.draw(this.ctx)}}exports.default=h;
},{"./Map":12,"./Point":13}],6:[function(require,module,exports) {
"use strict";var e=require("./src/Assets/AssetManager"),t=s(e),n=require("./src/Engine"),a=s(n);function s(e){return e&&e.__esModule?e:{default:e}}const r=document.getElementById("game-canvas"),u=r.getContext("2d");let o;u.imageSmoothingEnabled=!1;const i=new t.default;function c(){o.update(),o.draw(),requestAnimationFrame(c)}async function d(){await i.onLoad(),o=new a.default(r,u),c()}d();
},{"./src/Assets/AssetManager":9,"./src/Engine":8}]},{},[6])
//# sourceMappingURL=Village-Simulator.4d1af42a.map
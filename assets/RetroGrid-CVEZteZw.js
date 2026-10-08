import{A as e,Dt as t,Et as n,L as r,P as i,Z as a,f as o,it as s,l as c,p as l,u,ut as d,y as f}from"./runtime-core.esm-bundler-De2lc3Ib.js";import{t as p}from"./utils-BFkPXsMX.js";var m=2,h=3,g=.5,_=.9,v=.92,y=-.5,b=6,x=-2,S=`
attribute vec2 a_position;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`,C=`
#extension GL_OES_standard_derivatives : enable
precision highp float;

uniform vec2 u_container_size;
uniform vec2 u_viewport_size;
uniform vec4 u_line_color;
uniform float u_angle;
uniform float u_cell_size;
uniform float u_device_pixel_ratio;
uniform float u_time;

const float animationDurationSeconds = ${15 .toFixed(1)};
const float gridHeightRatio = ${h.toFixed(1)};
const float gridStartOffsetRatio = ${y.toFixed(1)};
const float gridWidthRatio = ${b.toFixed(1)};
const float gridXOffsetRatio = ${x.toFixed(1)};
const float gridLineAlignmentOffsetPx = ${g.toFixed(1)};
const float gridLineAntialiasMultiplier = ${_.toFixed(1)};
const float horizontalLodLevelOneEndPx = 5.6;
const float horizontalLodLevelOneStartPx = 2.8;
const float horizontalLodLevelTwoEndPx = 3.0;
const float horizontalLodLevelTwoStartPx = 1.4;
const float horizontalCompressionEndPx = 2.8;
const float horizontalCompressionStartPx = 1.2;
const float lineWidthPx = ${v.toFixed(2)};
const float perspectivePx = ${200 .toFixed(1)};
const float gridTravelRatio = 0.5;
const float verticalCompressionEndPx = 2.6;
const float verticalCompressionStartPx = 1.0;
const float verticalEdgeCompressionEnd = 0.95;
const float verticalEdgeCompressionStart = 0.45;
const float verticalLodLevelEnd = 0.64;
const float verticalLodLevelStart = 0.22;
const float verticalTopCompressionEndCells = 6.0;
const float verticalTopCompressionStartCells = 2.0;

float renderGridLine(float wrappedCoord, float antiAliasWidth, float softnessBoost) {
  return 1.0 - smoothstep(lineWidthPx, lineWidthPx + (antiAliasWidth * (1.5 + softnessBoost)), wrappedCoord);
}

void main() {
  float angle = radians(clamp(u_angle, 1.0, 89.0));
  float sinAngle = sin(angle);
  float cosAngle = cos(angle);
  vec2 screen = vec2(
    (gl_FragCoord.x / u_device_pixel_ratio) - (u_container_size.x * 0.5),
    (u_container_size.y * 0.5) - (gl_FragCoord.y / u_device_pixel_ratio)
  );

  vec3 rayOrigin = vec3(0.0, 0.0, perspectivePx);
  vec3 rayDirection = normalize(vec3(screen, -perspectivePx));
  vec3 planeXAxis = vec3(1.0, 0.0, 0.0);
  vec3 planeYAxis = vec3(0.0, cosAngle, sinAngle);
  vec3 planeNormal = normalize(cross(planeXAxis, planeYAxis));
  float denominator = dot(rayDirection, planeNormal);

  if (abs(denominator) < 0.0001) {
    discard;
  }

  float distanceToPlane = dot(-rayOrigin, planeNormal) / denominator;

  if (distanceToPlane <= 0.0) {
    discard;
  }

  vec3 hitPoint = rayOrigin + (rayDirection * distanceToPlane);
  float localX = hitPoint.x;
  float localY = dot(hitPoint, planeYAxis);
  float gridWidth = u_viewport_size.x * gridWidthRatio;
  float gridHeight = u_viewport_size.y * gridHeightRatio;
  float gridScrollSpeed = (gridHeight * gridTravelRatio) / animationDurationSeconds;
  float patternOffsetY = u_time * gridScrollSpeed;
  float gridLeft = (-0.5 * u_container_size.x) + (gridXOffsetRatio * u_container_size.x);
  float gridTop = (-0.5 * u_container_size.y) + (gridStartOffsetRatio * gridHeight);
  vec2 planePosition = vec2(localX - gridLeft, localY - gridTop);

  if (planePosition.x < 0.0 || planePosition.y < 0.0 || planePosition.x > gridWidth || planePosition.y > gridHeight) {
    discard;
  }

  vec2 patternPosition = vec2(planePosition.x, planePosition.y - patternOffsetY);
  vec2 wrapped = mod(patternPosition + vec2(gridLineAlignmentOffsetPx), u_cell_size);
  vec2 patternDerivative = max(fwidth(patternPosition), vec2(0.0001));
  vec2 antiAliasWidth = patternDerivative * gridLineAntialiasMultiplier;
  float horizontalCellSpanPx = u_cell_size / patternDerivative.y;
  float horizontalCompression = 1.0 - smoothstep(horizontalCompressionStartPx, horizontalCompressionEndPx, horizontalCellSpanPx);
  float verticalCellSpanPx = u_cell_size / patternDerivative.x;
  float sideDistance = abs((planePosition.x / gridWidth) * 2.0 - 1.0);
  float verticalEdgeCompression = smoothstep(verticalEdgeCompressionStart, verticalEdgeCompressionEnd, sideDistance);
  float verticalTopCompression = 1.0 - smoothstep(
    u_cell_size * verticalTopCompressionStartCells,
    u_cell_size * verticalTopCompressionEndCells,
    planePosition.y
  );
  float verticalCompression =
    (1.0 - smoothstep(verticalCompressionStartPx, verticalCompressionEndPx, verticalCellSpanPx))
    * verticalEdgeCompression * verticalTopCompression;
  float horizontalSoftnessBoost = 1.0 + (horizontalCompression * 3.0);
  float verticalSoftnessBoost = 1.0 + (verticalCompression * 3.5);
  float verticalLod = smoothstep(verticalLodLevelStart, verticalLodLevelEnd, verticalCompression);
  float verticalLineFine = renderGridLine(wrapped.x, antiAliasWidth.x, verticalSoftnessBoost);
  float verticalWrappedLod = mod(patternPosition.x + gridLineAlignmentOffsetPx, u_cell_size * 2.0);
  float verticalLineCoarse = renderGridLine(verticalWrappedLod, antiAliasWidth.x, verticalSoftnessBoost + verticalLod);
  float verticalLine = max(verticalLineFine * (1.0 - verticalLod), verticalLineCoarse * verticalLod);
  float horizontalLodLevelOne = 1.0 - smoothstep(horizontalLodLevelOneStartPx, horizontalLodLevelOneEndPx, horizontalCellSpanPx);
  float horizontalLodLevelTwo = 1.0 - smoothstep(horizontalLodLevelTwoStartPx, horizontalLodLevelTwoEndPx, horizontalCellSpanPx);
  float horizontalLineFine = renderGridLine(wrapped.y, antiAliasWidth.y, horizontalSoftnessBoost);
  float horizontalWrappedLodOne = mod(patternPosition.y + gridLineAlignmentOffsetPx, u_cell_size * 2.0);
  float horizontalWrappedLodTwo = mod(patternPosition.y + gridLineAlignmentOffsetPx, u_cell_size * 4.0);
  float horizontalLineCoarse = renderGridLine(
    horizontalWrappedLodOne,
    antiAliasWidth.y,
    horizontalSoftnessBoost + horizontalLodLevelOne
  );
  float horizontalLineExtraCoarse = renderGridLine(
    horizontalWrappedLodTwo,
    antiAliasWidth.y,
    horizontalSoftnessBoost + horizontalLodLevelOne + horizontalLodLevelTwo
  );
  float horizontalLineReduced = max(
    horizontalLineFine * (1.0 - horizontalLodLevelOne),
    horizontalLineCoarse * horizontalLodLevelOne
  );
  float horizontalLine = max(
    horizontalLineReduced * (1.0 - horizontalLodLevelTwo),
    horizontalLineExtraCoarse * horizontalLodLevelTwo
  );
  float line = max(verticalLine, horizontalLine);

  if (line <= 0.001) {
    discard;
  }

  float alpha = u_line_color.a * line;
  gl_FragColor = vec4(u_line_color.rgb * alpha, alpha);
}
`;function w(e,t,n){return Math.min(Math.max(e,t),n)}function T(e,t,n){let r=e.createShader(t);return r?(e.shaderSource(r,n),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)?r:(e.deleteShader(r),null)):null}function E(e){let t=T(e,e.VERTEX_SHADER,S),n=T(e,e.FRAGMENT_SHADER,C);if(!t||!n)return t&&e.deleteShader(t),n&&e.deleteShader(n),null;let r=e.createProgram();return r?(e.attachShader(r,t),e.attachShader(r,n),e.linkProgram(r),e.deleteShader(t),e.deleteShader(n),e.getProgramParameter(r,e.LINK_STATUS)?r:(e.deleteProgram(r),null)):(e.deleteShader(t),e.deleteShader(n),null)}function D(e){let t=e.getContext(`webgl`,{alpha:!0,antialias:!0,premultipliedAlpha:!0});if(!t||!t.getExtension(`OES_standard_derivatives`))return null;let n=E(t);if(!n)return null;let r=t.getAttribLocation(n,`a_position`),i=e=>t.getUniformLocation(n,e),a={angle:i(`u_angle`),cellSize:i(`u_cell_size`),containerSize:i(`u_container_size`),devicePixelRatio:i(`u_device_pixel_ratio`),lineColor:i(`u_line_color`),time:i(`u_time`),viewportSize:i(`u_viewport_size`)},o=t.createBuffer();if(r<0||!o||Object.values(a).some(e=>!e))return o&&t.deleteBuffer(o),t.deleteProgram(n),null;t.bindBuffer(t.ARRAY_BUFFER,o),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),t.STATIC_DRAW);let s=1;return{resize(n,r){s=Math.min(window.devicePixelRatio||1,m),e.width=Math.floor(n*s),e.height=Math.floor(r*s),t.viewport(0,0,e.width,e.height)},draw({width:e,height:i,time:c,angle:l,cellSize:u,color:d}){t.useProgram(n),t.bindBuffer(t.ARRAY_BUFFER,o),t.enableVertexAttribArray(r),t.vertexAttribPointer(r,2,t.FLOAT,!1,0,0),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.uniform1f(a.angle,w(l,1,89)),t.uniform1f(a.cellSize,Math.max(u,1)),t.uniform2f(a.containerSize,e,i),t.uniform1f(a.devicePixelRatio,s),t.uniform4fv(a.lineColor,d);let f=window.innerHeight*h*.5/15,p=f>0?4*Math.max(u,1)/f:1/0;t.uniform1f(a.time,c%p),t.uniform2f(a.viewportSize,window.innerWidth,window.innerHeight),t.drawArrays(t.TRIANGLES,0,3)},dispose(){t.isContextLost()||(t.deleteBuffer(o),t.deleteProgram(n))}}}var O;function k(e){if(O===void 0){let e=document.createElement(`canvas`);e.width=e.height=1,O=e.getContext(`2d`,{willReadFrequently:!0})}if(!O)return new Float32Array([.5,.5,.5,1]);O.clearRect(0,0,1,1),O.fillStyle=e,O.fillRect(0,0,1,1);let[t,n,r,i]=O.getImageData(0,0,1,1).data;return new Float32Array([t/255,n/255,r/255,i/255])}var A=f({__name:`RetroGrid`,props:{class:{type:[Boolean,null,String,Object,Array]},angle:{default:65},cellSize:{default:60},opacity:{default:.5},lightLineColor:{default:`gray`},darkLineColor:{default:`gray`}},setup(f){let m=f,h=s(null),g=s(null),_=s(null),v=s(!1),y=c(()=>w(m.angle,1,89)),b=c(()=>Math.max(m.cellSize,1)),x=null,S=0,C=0,T=new Float32Array([.5,.5,.5,1]),E=!0,O=!1,A=null,j=null,M=null,N=null,P=null,F=null;function I(e){x&&S&&C&&!O&&x.draw({width:S,height:C,time:j?.matches?0:e/1e3,angle:y.value,cellSize:b.value,color:T})}function L(){A!==null&&cancelAnimationFrame(A),A=null}function R(e){I(e),A=!j?.matches&&E?requestAnimationFrame(R):null}function z(){let e=g.value,t=h.value;e&&t&&(!O&&!x&&(x=D(e)),O||!x?(L(),v.value=!1):(S=Math.floor(t.clientWidth),C=Math.floor(t.clientHeight),!S||!C?L():(x.resize(S,C),_.value&&(T=k(getComputedStyle(_.value).color)),I(performance.now()),v.value=!0,j?.matches||!E?L():A===null&&(A=requestAnimationFrame(R)))))}function B(e){e.preventDefault(),O=!0,x=null,L(),v.value=!1}function V(){O=!1,z()}return i(()=>{let e=g.value,t=h.value;e&&t&&(j=window.matchMedia?.(`(prefers-reduced-motion: reduce)`)??null,M=window.matchMedia?.(`(prefers-color-scheme: dark)`)??null,j?.addEventListener?.(`change`,z),M?.addEventListener?.(`change`,z),window.addEventListener(`resize`,z),e.addEventListener(`webglcontextlost`,B),e.addEventListener(`webglcontextrestored`,V),N=new ResizeObserver(z),N.observe(t),P=new IntersectionObserver(([e])=>{E=e?.isIntersecting??!1,E?z():L()}),P.observe(t),F=new MutationObserver(z),F.observe(document.documentElement,{attributes:!0,attributeFilter:[`class`,`style`,`data-theme`]}),z())}),a(()=>[m.angle,m.cellSize,m.lightLineColor,m.darkLineColor],z,{flush:`post`}),e(()=>{L(),N?.disconnect(),P?.disconnect(),F?.disconnect(),j?.removeEventListener?.(`change`,z),M?.removeEventListener?.(`change`,z),window.removeEventListener(`resize`,z),g.value?.removeEventListener(`webglcontextlost`,B),g.value?.removeEventListener(`webglcontextrestored`,V),x?.dispose(),x=null}),(e,i)=>(r(),l(`div`,{ref_key:`containerRef`,ref:h,"aria-hidden":`true`,class:n(d(p)(`pointer-events-none absolute size-full overflow-hidden [--retro-grid-line:var(--retro-grid-light-line)] dark:[--retro-grid-line:var(--retro-grid-dark-line)]`,m.class)),style:t({opacity:m.opacity,"--retro-grid-light-line":m.lightLineColor,"--retro-grid-dark-line":m.darkLineColor})},[u(`span`,{ref_key:`colorProbeRef`,ref:_,class:`hidden text-(--retro-grid-line)`},null,512),v.value?o(``,!0):(r(),l(`div`,{key:0,class:`absolute inset-0`,style:t({perspective:`${d(200)}px`})},[u(`div`,{class:`absolute inset-0`,style:t({transform:`rotateX(${y.value}deg)`})},[u(`div`,{class:`animate-retro-grid absolute inset-[0%_0px] ml-[-200%] h-[300vh] w-[600vw] origin-[100%_0_0] [background-image:linear-gradient(to_right,var(--retro-grid-line)_1px,transparent_0),linear-gradient(to_bottom,var(--retro-grid-line)_1px,transparent_0)] bg-repeat motion-reduce:animate-none`,style:t({backgroundSize:`${b.value}px ${b.value}px`,transform:`translateY(-50%)`})},null,4)],4)],4)),u(`canvas`,{ref_key:`canvasRef`,ref:g,class:n(d(p)(`absolute inset-0 size-full`,v.value?`opacity-100`:`opacity-0`))},null,2),i[0]||=u(`div`,{class:`absolute inset-0 bg-linear-to-t from-background to-transparent to-90%`},null,-1)],6))}});export{A as t};
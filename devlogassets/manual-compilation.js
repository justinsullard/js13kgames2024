// util
const Evil = _ => eval(`(_=${_},_)`);
//math
const { sin, cos, abs, max, min, random, pow: pow$1, PI } = Math;
//strings
const tostring = (x, ...y) => x.toString(...y);
const stringify = (x, ...y) => JSON.stringify(x, ...y);
const split = (x, y = /[\n, ]/) => x.split(y);
const lower = x => x.toLowerCase();
// arrays
const sort = (x, fn = (a, b) => a - b) => x.sort(fn);
const uniq = x => [...new Set(x)];
const merge = (a, b = []) => [...new Set([...a, ...b])];
const map = (x, f) => x.map(f);
const join = (a, x = "") => a.join(x);
const filter = (x, f) => x.filter(f);
const flat = x => x.flat();
const reduce = (x, f, i) => x.reduce(f, i);
const stripe = (l = 0, fn = x => x) => map(
    map(new Array(l).fill(0), (x, i) => i),
    fn
);
const each = (x, f) => x.forEach(f);
// objects
const entries = x => [...Object.entries(x)];
const isfunction = x => typeof x === "function";
const assign = (x, y) => Object.assign(x, y);
const keys = x => [...Object.keys(x)];
const values = x => Object.values(x);
// misc
const length = x => x.length;
const $ = x => document.getElementById(x);
const grab = x => fetch(new Request(`./${x}.txt`)).then(y=>t.text());

// events
const handlers = new Map();
function store(ev) {
  if (!handlers.has(ev)) {
    handlers.set(ev, new Set());
  }
  return handlers.get(ev);
}
const on = (ev, cb) => store(ev).add(cb);
const off = (ev, cb) => store(ev).delete(cb);
const once = (ev, cb) => {
  const f = (...args) => {
    off(ev, f);
    cb(...args);
  };
  on(ev, f);
};
const emit = (e, ...x) => each(store(e), f => f(...x));
const listen = (e, f, w = window) => w.addEventListener(e, f);

// data
const TEXTURE_2D_ARRAY = 35866;
const CLAMP_TO_EDGE = 33071;
const ARRAY_BUFFER = 34962;
const FLOAT = 5126;
const STATIC_DRAW = 35044;
const VERTEX_SHADER = 35633;
const FRAGMENT_SHADER = 35632;
const TEXTURE_WRAP_S = 10242;
const TEXTURE_WRAP_T = 10243;
const TEXTURE_MIN_FILTER = 10241;
const TEXTURE_MAG_FILTER = 10240;
const NEAREST = 9728;
const COLOR_BUFFER_BIT = 16384;
const DEPTH_TEST = 2929;
const LEQUAL = 515;
const BLEND = 3042;
const SRC_ALPHA = 770;
const ONE_MINUS_SRC_ALPHA = 771;
const TRIANGLES = 4;
const RGBA = 6408;
const UNSIGNED_BYTE = 5121;
const wscale = 1 / 40;
const hscale = 1 / 30;
const pright = wscale - 1;
const pbottom = 1 - hscale;
const transparent = [0, 0, 0, 0];
const transformStride = 12;


const Operators = split(``);
const IDS = {};
const ID = x => {
    const kind = x?.constructor?.name ?? "_";
    return (IDS[kind] = (IDS[kind] ?? -1) + 1);
};
// transformers
// actions
const loadFont = () => new Promise(resolve => {
    const image = new Image();
    image.src = "./13.webp";
    listen("load", () => resolve(image), image);
});
  

const Invocation = (name, mixins = [], props = []) => {
  const all = filter(
    [...flat(map(mixins, x => x.props)), ...props],
    x => x !== undefined
  );
  const final = map(uniq(map(all, x => x[0])), x =>
    filter(all, y => y[0] === x).pop()
  );
  const names = map(final, x => x[0]);
  return Evil(`class ${name} extends Array{
static mixins=${stringify(map(mixins, x => x.name))};
static names=${stringify(names)};
static props=[${join(
    map(
      final,
      ([n, x]) => `["${n}", ${isfunction(x) ? tostring(x) : stringify(x)}]`
    ),
    ", "
  )}];
static defaults=x=>map(${name}.props,([n,p])=>isfunction(p)?p(x):p);
constructor(...x){super();each(${name}.defaults(this),(d,i)=>this[i]=x[i]??d)}
*[Symbol.iterator](){for(const x of this){yield x}}
${join(
  map(
    names,
    (name, i) => `get ${name}(){return this[${i}]}
set ${name}(x){return this[${i}]=x}
`
  )
)}}`);
};

const Thing = Invocation(
  "Thing",
  [],
  [
    ["name", null], // string
    ["props", []],
  ]
);

const Prop = Invocation(
  "Prop",
  [],
  [
    ["id", x => ID(x)], // number
    ["name", "Prop"], // string
    ["default", null], // Literal
  ]
);

const Action = Invocation(
  "Action",
  [],
  [
    ["name", null],
    ["inputs", []], // Thing, Prop
    ["mutations", []], // Mutation
    ["outputs", []], // Thing, Prop
  ]
);


const Mutation = Invocation(
  "Mutation",
  [Thing],
  [
    ["left", null], // Thing, Prop
    ["operator", Operators[0]], // Operators
    ["right", null], // Literal, Prop
  ]
);



const vertexShaderSrc = `#version 300 es
#pragma vscode_glsllint_stage:vert
uniform vec2 warp;
layout(location=0)in vec4 aP;
layout(location=1)in vec2 aT;
layout(location=2)in vec3 aO;
layout(location=3)in vec4 aF;
layout(location=4)in vec4 aB;
layout(location=5)in float aA;
layout(location=6)in float aD;
out vec2 vT;
out vec4 vF;
out vec4 vB;
out float vA;
out float vD;
void main(){
    vT=aT;
    vF=aF;
    vB=aB;
    vA=aA;
    vD=aD;
    vec4 p=vec4(aP.xyz+aO,1.);
    vec2 sh=vec2(1.+(p.y*p.y)*warp.x,1.+(p.x*p.x)*warp.y);
    float l=max(abs(p.x),abs(p.y));
    if(l>1.){
        sh/=l*l;
        vF.a/=l*l*2.;
        vB.a=0.;
    }
    p.xy/=sh;
    gl_Position=p;
}`;
const fragmentShaderSrc = `#version 300 es
#pragma vscode_glsllint_stage:frag
precision mediump float;
uniform mediump sampler2DArray uSam;
uniform vec2 mask;
uniform float fxmix;
uniform float brightness;
uniform float contrast;
uniform float saturation;
in vec2 vT;
in vec4 vF;
in vec4 vB;
in float vA;
in float vD;
vec2 res=vec2(8.,8.);
const vec3 lum=vec3(.2126,.7152,.0722);
out vec4 fc;
vec4 M(vec2 p){
    p.x+=p.y*3.;
    vec4 m=vec4(mask.x,mask.x,mask.x,1.);
    p.x=fract(p.x/6.);
    if(p.x<.333)m.r=mask.y;
    else if(p.x<.666)m.g=mask.y;
    else m.b=mask.y;
    return m;
}
void main(){
    if(vA<=0.)discard;
    vec4 tC=texture(uSam,vec3(vT,vD));
    fc=(vF*tC)+(vB*(vec4(1.)-tC));
    if(fc.a<=0.)discard;
    vec4 mask=M(vT*res);
    fc=mix(fc,mask,fxmix);
    fc.rgb=fc.rgb+brightness;
    fc.rgb=.5+(contrast+1.)*(fc.rgb-.5);
    fc.rgb=mix(vec3(dot(fc.rgb,lum)),fc.rgb,1.+saturation);
    fc.a*=vA;
}`;

const makeShader = (gl, type, program, src) => {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  gl.attachShader(program, shader);
  // return shader;
};

const theme = {
  white: "#ffffff",
  comment: "#8a837c",
  literal: "#6c055c",
  token: "#c22afd",
  buzz: "#528bfe",
  hardware: "#1b41fe",
  operator: "#1b4b72",
  name: "#336130",
  code: "#42b353",
  pickup: "#bfcc38",
  string: "#995b07",
  text: "#5d4524",
  keyword: "#5d3624",
  variable: "#70382e",
  exception: "#993407",
  smell: "#ff6665",
  gutter: "#282c34",
  padding: "#4a3c3a",
  background: "#19100c",
};
const colorMap = reduce(
  entries(theme),
  (r, [k, v]) => {
    r[k] = [...v.match(/\w\w/g).map(x => parseInt(x, 16) / 255), 1];
    return r;
  },
  {}
);
const colors = values(colorMap);
const colorNames = keys(colorMap);
const colorCount = colors.length;
const charfade = [
  46, 44, 30, 96, 39, 58, 45, 13, 59, 11, 31, 19, 10, 94, 8, 17, 18, 28, 29, 5,
  14, 20, 4, 15, 37, 7, 33, 127, 6, 106, 105, 42, 12, 43, 61, 124, 40, 92, 0,
  21, 24, 32, 47, 60, 41, 62, 95, 116, 1, 16, 26, 3, 108, 123, 63, 9, 2, 125,
  34, 23, 25, 91, 126, 93, 118, 27, 84, 114, 89, 38, 86, 115, 22, 111, 102, 104,
  120, 49, 97, 55, 76, 99, 112, 113, 121, 64, 101, 107, 103, 119, 110, 117, 36,
  122, 74, 70, 80, 109, 67, 98, 75, 88, 100, 52, 65, 69, 51, 54, 57, 83, 87, 35,
  50, 78, 85, 56, 48, 73, 79, 71, 68, 72, 82, 90, 81, 53, 66, 77,
];

const modelData = new Float32Array([
  // position       texCoord
  -1,
  1,
  0,
  0,
  pright,
  1,
  1,
  0,
  -1,
  pbottom,
  0,
  1,

  pright,
  pbottom,
  1,
  1,
  -1,
  pbottom,
  0,
  1,
  pright,
  1,
  1,
  0,
]);

const transformData = new Float32Array(
  [
    ...stripe(4800, i => [
      // TODO: Break these up into char objects
      (i % 80) * wscale, // aOffset.x
      ((i / 80) | 0) * -hscale, // aOffset.y
      ...transparent, // aFgColor
      ...transparent, // aBgColor
      1, // aAlpha
      0, // aDepth (char)
    ]),
    ...[
      // TODO: Break these up into bug objects, etc.
      ...stripe(256, () => [0, transparent, 0]), // blank bugs
      [220, colorMap.smell, 1], // dumpster fire
      [208, colorMap.buzz, 1], // cursor
      [232, colorMap.buzz, 1], // mouse
    ].map(([i, color, a]) => [
      -2, // aOffset.x
      -2, // aOffset.y
      ...color, // aFgColor
      ...transparent, // aBgColor
      a, // aAlpha
      i, // aDepth (char)
    ]),
  ].flat()
);

const defaultUniforms = () => ({
  time: 0,
  warp: new Float32Array([0, 0]), // new Float32Array([1 / 51, 1 / 46]),
  mask: new Float32Array([0.25, 0.9]),
  fxmix: 0.2,
  brightness: 0.02,
  contrast: 0.03,
  saturation: 0,
});
const uniforms = defaultUniforms();
// on("uniforms@screen", () => console.log(uniforms));
on("uniform@screen", (k, v) => (uniforms[k] = v));
// webgl
const tp = (gl, ...x) => gl.texParameteri(...x);
const vtp = (gl, ...x) => gl.vertexAttribPointer(...x);
const evaa = (gl, ...x) => gl.enableVertexAttribArray(...x);
const vad = (gl, ...x) => gl.vertexAttribDivisor(...x);
const bb = (gl, ...x) => gl.bindBuffer(...x);
const bd = (gl, ...x) => gl.bufferData(...x);
let gl;
let uniformLocations;

const draw = (t = 0) => {
  if (!gl) {
    return;
  }
  uniforms.time = t;
  const c = (t / 13000) * PI;
  const st = abs(sin(c));
  const ct = cos(c);
  // uniforms.warp.set([st / 51, st / 46]);
  assign(uniforms, {
    fxmix: 0.1 + st / 5,
    saturation: ct / 5,
    contrast: ct / 5,
    brightness: 0.02 + ct / 8,
  });
  each(entries(uniforms), ([k, v]) =>
    gl[v?.length ? "uniform2fv" : "uniform1f"](uniformLocations[k], v)
  );

  gl.clearColor(...colorMap.background);
  gl.clear(COLOR_BUFFER_BIT);

  gl.enable(DEPTH_TEST);
  gl.depthFunc(LEQUAL);
  gl.enable(BLEND);
  gl.blendFunc(SRC_ALPHA, ONE_MINUS_SRC_ALPHA);

  bd(gl, ARRAY_BUFFER, transformData, STATIC_DRAW);

  gl.drawArraysInstanced(TRIANGLES, 0, 6, 5059); // 4800 + 256 + 3
};
const print = (
  x = 0,
  y = 0,
  fg = colorMap.text,
  bg = transparent,
  alpha = 1,
  char = 0
) => {
  const offset = (x + y * 80) * transformStride;
  transformData.set([...fg, ...bg, alpha, char], offset + 2);
};
const move$1 = (entity, x = 0, y = 0) => {
  transformData.set([x, y], (4800 + entity) * transformStride);
};
const update$1 = (entity, char = 0) => {
  transformData.set([char], (4800 + entity) * transformStride + 11);
};
const del = (x = 0, y = 0) => {
  print(x, y, transparent, transparent, 0, 0);
};
const printf = (str = "", x = 0, y = 0, fg, bg, alpha) => {
  for (let c = str.length; c--; ) {
    print(x + c, y, fg, bg, alpha, str.charCodeAt(c));
  }
};
const text = (str = "", x = 0, y = 0, fg, bg, alpha) => {
  for (let c = str.length; c--; ) {
    print(x + c, y, fg, bg, str[c] === " " ? 0 : alpha, str.charCodeAt(c));
  }
};
const clear = () => {
  const fg = colorMap.text;
  const bg = transparent;
  for (let c = 4800; c--; ) {
    transformData.set([...fg, ...bg, 0, 0], c * transformStride + 2);
  }
};

once("init", async ({ $screen, image }) => {
  gl = $screen.getContext("webgl2", { premultipliedAlpha: false });
  const program = gl.createProgram();
  makeShader(gl, VERTEX_SHADER, program, vertexShaderSrc);
  makeShader(gl, FRAGMENT_SHADER, program, fragmentShaderSrc);
  gl.linkProgram(program);
  gl.useProgram(program);

  const texture = gl.createTexture();
  gl.bindTexture(TEXTURE_2D_ARRAY, texture);
  gl.texImage3D(
    TEXTURE_2D_ARRAY,
    0,
    RGBA,
    8,
    8,
    256,
    0,
    RGBA,
    UNSIGNED_BYTE,
    image
  );
  gl.generateMipmap(TEXTURE_2D_ARRAY);
  tp(gl, TEXTURE_2D_ARRAY, TEXTURE_WRAP_S, CLAMP_TO_EDGE);
  tp(gl, TEXTURE_2D_ARRAY, TEXTURE_WRAP_T, CLAMP_TO_EDGE);
  tp(gl, TEXTURE_2D_ARRAY, TEXTURE_MIN_FILTER, NEAREST);
  tp(gl, TEXTURE_2D_ARRAY, TEXTURE_MAG_FILTER, NEAREST);

  bb(gl, ARRAY_BUFFER, gl.createBuffer());
  bd(gl, ARRAY_BUFFER, modelData, STATIC_DRAW);
  vtp(gl, 0, 2, FLOAT, false, 16, 0);
  vtp(gl, 1, 2, FLOAT, false, 16, 8);
  evaa(gl, 0);
  evaa(gl, 1);

  bb(gl, ARRAY_BUFFER, gl.createBuffer());
  each(
    [
      [2, 2, FLOAT, false, 48, 0], // offset x and y
      [3, 4, FLOAT, false, 48, 8], // aFgColor
      [4, 4, FLOAT, false, 48, 24], // aBgColor
      [5, 1, FLOAT, false, 48, 40], // aAlpha
      [6, 1, FLOAT, false, 48, 44], // aDepth (char)
    ],
    (x, i) => {
      vtp(gl, ...x);
      vad(gl, x[0], 1);
      evaa(gl, x[0]);
    }
  );

  uniformLocations = entries(uniforms).reduce((r, [name, i]) => {
    r[name] = gl.getUniformLocation(program, name);
    return r;
  }, {});
});

let char = 208;
let trauma = 0;

const drawCursor = (dur, x = -2, y = -2) => {
  const offset = (dur / 240) % 2 | 0;
  update$1(257, trauma ? (209 + trauma) | 0 : char + offset);
  move$1(257, x / 40, -y / 30);
  trauma = max(0, trauma - 0.125);
};
const cursortrauma = (x = 1) => (trauma = max(0, min(7, x)));

each(split("keydown,keypress,keyup"), x => listen(x, e => emit(x, e)));

const pointer = [-16, -16];
let cx = -1;
let cy = -1;
on("mousemove", e => ([pointer[0], pointer[1]] = [e.clientX, e.clientY]));

once("init", ({ $screen, $pointy, image }) => {
  $pointy.width = 16;
  $pointy.height = 16;
  const pointy = $pointy.getContext("2d");
  pointy.imageSmoothingEnabled = false;
  pointy.fillStyle = theme.buzz;
  pointy.fillRect(0, 0, 16, 16);
  pointy.globalCompositeOperation = "destination-atop";
  pointy.drawImage(image, 0, 232 * 8, 8, 8, 0, 0, 16, 16);
  each("mousemove,click,mousedown,mouseup".split(","), x =>
    listen(x, e => emit(x, e, cx, cy))
  );

  const mousemove = () => {
    const { clientWidth, clientHeight, offsetLeft, offsetTop } = $screen;
    const dx = clientWidth / 640;
    const dy = clientHeight / 480;
    const uvx = (pointer[0] - offsetLeft) / clientWidth;
    const uvy = (pointer[1] - offsetTop) / clientHeight;
    cx = (uvx * 80) | 0;
    cy = (uvy * 60) | 0;
    each(
      entries({
        left: pointer[0] + "px",
        top: pointer[1] + "px",
        width: (dx * 8).toFixed(2) + "px",
        height: (dy * 8).toFixed(2) + "px",
        transform: `scale2d(${[1 / dx, 1 / dy]
          .map(x => x.toFixed(3))
          .join(",")})`,
      }),
      ([k, v]) => ($pointy.style[k] = v)
    );

    move$1(258, uvx * 2, uvy * -2);
    emit("@hover", cx, cy);
  };
  on("move@mouse", mousemove);
});


const euclidean = (nodes = 0, offset = 0, base = 13) => {
  let move = nodes ? base / nodes : 0;
  return sort(stripe(nodes, x => ((x * move + offset + base) | 0) % base));
};


const notes = (root = 13, a = 432) => stripe(13 * root, x => a * 2 ** ((x - 4 * root) / root));

const synth = window.speechSynthesis;
const speak = (message = "Hello world!") =>
  new Promise((resolve, reject) => {
    if (synth) {
      const voice = new SpeechSynthesisUtterance(message);
      voice.lang = "en-US";
      // voice.pitch = 0;
      // voice.rate = 0.75;
      voice.onerror = () => {
        emit("error@say", message);
        reject();
      };
      voice.onend = () => {
        emit("end@say", message);
        resolve();
      };
      synth.speak(voice);
    } else {
      emit("end@say", message);
      resolve();
    }
  });
on("@say", speak);

const musick = notes();

let dj;
let analyzer;
let reverb;
let hovered$1 = false;
let active$1 = false;
let bpm = 13000 / 54; // 240.740...
let mpb = 60000 / bpm;
let spb = mpb / 1000;

on("@hover", (x, y) => (hovered$1 = x === 0 && y === 0));
on("click", () => hovered$1 && (active$1 = !active$1));

const hire = () => {
  dj = new AudioContext();
  analyzer = dj.createAnalyser();
  analyzer.connect(dj.destination);
  analyzer.fftSize = 128;

  reverb = dj.createConvolver();
  const rate = dj.sampleRate;
  const decay = 3;
  const length = 3 * rate; // 3 second reverb
  const impulse = dj.createBuffer(2, length, rate);
  const impulseL = impulse.getChannelData(0);
  const impulseR = impulse.getChannelData(1);
  for (let i = 0; i < length; i++) {
    let n = i;
    impulseL[i] = (random() * 2 - 1) * pow$1(1 - n / length, decay);
    impulseR[i] = (random() * 2 - 1) * pow$1(1 - n / length, decay);
  }
  reverb.buffer = impulse;
  reverb.connect(analyzer);

  window.removeEventListener("click", hire);
  if (!hovered$1) {
    active$1 = true;
  }
};
listen("click", hire);

const scales = uniq(
  stripe(13, a =>
    [
      ...stripe(13, b => sort(merge(euclidean(4, a, 13), euclidean(3, b, 13)))),
      euclidean(7, a, 13),
    ]
      .filter(x => x.length === 7)
      .map(x => x.join(","))
  ).flat()
).map(x => x.split(",").map(x => 1 * x));
scales.push([0, 1, 4, 6, 8, 9, 12]);
// console.log("scales.length", scales, scales.length);
const scaleslength = length(scales);

const melodies = {
  hi: {
    name: "Hi by Rich Lions",
    scale: 26,
    // octave: 3,
    octave: 4,
    key: 5,
    notes: [
      [0, 3, 4],

      [13, 3, 1],
      [14, 2, 1],
      [15, 4, 1],
      [17, 3, 1],
      [19, 3, 1],
      [20, 2, 1],
      [21, 4, 4],

      [26, 2, 1],
    ],
    bass: [
      [0, 4, 2],
      [4, 3, 2],
      [8, 2, 2],
      [12, 1, 2],
      [16, 0, 4],
      [20, -3, 4],
      [24, 0, 2],
    ],
  },
  ohno: {
    name: "Oh no",
    scale: 39, // 21,
    // octave: 2,
    octave: 3,
    key: 8,
    notes: [
      [0, 0, 1],
      [1, 1, 1],
      [2, 2, 1],
      [3, 0, 1],
      [4, 1, 1],
      [5, 2, 1],
      [6, 3, 1],
      [7, 4, 1],
      [8, 5, 1],
      [9, 4, 3],

      [12, 7, 1],
      [13, 8, 1],
      [14, 9, 1],
      [15, 7, 1],
      [16, 8, 1],
      [17, 9, 1],

      [18, 4, 1],
      [19, 5, 1],
      [20, 6, 1],
      [21, 7, 3],

      // [23, 7, 3],
      [24, 6, 1],
      [25, 2, 1],
      [26, 1, 1],
    ],
    bass: [
      [0, 0, 3],
      [3, 0, 3],
      [6, 3, 3],
      [9, 4, 3],
      [12, 0, 3],
      [15, 0, 3],
      [18, -3, 2],
      [20, -1, 1],
      [21, 0, 3],
      [23, -7, 2],
      [25, -5, 2],
    ],
  },
  nevergiveup: {
    name: "Never Give Up by Rick Roller",
    scale: 17,
    // octave: 3,
    octave: 4,
    key: 1,
    notes: [
      [0, 10, 1], // give
      [2, 10, 1.5], // you
      [4, 9, 2], // up
      [8, 4, 1], // nev
      [9, 5, 1], // er
      [10, 8, 1], // gon
      [11, 5, 1], // na
      [12, 9, 1], // make
      [14, 9, 1.5], // you
      [16, 8, 2.5], // cry
      [23, 4, 1], // nev
      [24, 5, 1], // er
      [25, 8, 1], // gon
      [26, 5, 1], // na
    ],
    bass: [
      [0, 10, 4],
      [4, 9, 4],
      [8, 4, 4],
      [12, 9, 4],
      [16, 8, 7],
      // [20, 0, 5],
      [23, 4, 4],
    ],
  },
  uphill: {
    name: "Uphill by K Shrub",
    scale: 7,
    // octave: 3,
    octave: 4,
    key: 3,
    notes: [
      // 1 7 7 7 5  1 7 7 7 4
      [0, 6, 1],
      [1, 6, 1],
      [2, 6, 1],
      [3, 4, 2],

      [7, 0, 1],
      [8, 6, 1],
      [9, 6, 1],
      [10, 6, 1],
      [11, 3, 2],

      [14, 0, 1],
      [15, 6, 1],
      [16, 6, 1],
      [17, 6, 1],
      [18, 2, 2],
      [20, 3, 2],

      [23, 2, 1],
      [24, 3, 1],
      [25, 4, 1],

      [26, 0, 1],
    ],
    bass: [
      [0, 6, 5],
      [3, -3, 5],

      // [7, 6, 1.5],
      [8, 6, 5],
      // [11, 3, 5],
      [11, -4, 5],

      // [14, 0, 1.5],
      [15, 6, 3],
      [18, -5, 2],
      [20, -4, 5],
    ],
  },
  strangers: {
    // A B C D E F G H
    // I J K L M N O P Q
    // R S T U V W X Y Z
    name: "Strangers by The Things",
    scale: 9,
    // octave: 3,
    octave: 4,
    key: 3,
    notes: [
      [0, 0, 1],
      [1, 2, 1],
      [2, 3, 1],
      [3, 4, 1],

      [4, 5, 1],
      [5, 4, 1],
      [6, 2, 1],
      [7, 0, 1],

      [8, 0, 1],
      [9, 2, 1],
      [10, 3, 1],
      [11, 4, 1],

      [12, 5, 1],
      [13, 4, 1],
      [14, 2, 1],
      [15, 0, 1],

      [16, 0, 1],
      [17, 2, 1],
      [18, 3, 1],
      [19, 4, 1],

      [20, 5, 1],
      [21, 4, 1],
      [22, 2, 1],
      [23, 0, 1],
    ],
    bass: [
      [0, 0, 4],
      [4, -3, 4],
      [8, 0, 4],
      [12, -3, 4],
      [16, 0, 4],
      [20, -3, 4],
    ],
  },
  buzzed: {
    name: "Buzzed by The Fizz",
    scale: 15,
    // octave: 2,
    octave: 3,
    key: 9,
    notes: [
      [0, 0, 2], // fizzbuzz
      [3, 3, 1], // fizz
      [5, 5, 1], // buzz
      [6, 3, 1.5], // fizz
      [9, 3, 1], // fizz
      [10, 5, 2], // buzz
      [12, 3, 1], // fizz
      [15, 15, 2.5], // fizzbuzz
      [18, 3, 1], // fizz
      [20, 5, 1], // buzz
      [21, 3, 2], // fizz
      [24, 3, 1], // fizz
      [25, 5, 2], // buzz
    ],
    bass: [
      [0, 0, 15],
      [5, 5, 3],
      [10, 5, 3],
      [15, 15, 15],
      [20, 5, 3],
      [25, 5, 3],
    ],
  },
  codetastrophy: {
    name: "Code-tastrophy",
    scale: 13,
    // octave: 2,
    octave: 3,
    key: 0,
    notes: sort(
      merge(
        [12],
        euclidean(13, 0, 27),
        euclidean(5, 4, 27),
        euclidean(3, 13, 27)
      )
    ).map((b, i, a) => [
      b,
      (13 - (((i % 3) + i / 2) | 0)) | 0,
      a[i - 1] === b - 1 ? 1 : 2,
    ]),
    bass: [
      [0, 0, 7],
      [6, 7, 7],
      [12, 3, 7],
      [18, 3, 7],
      [26, 7, 1],
    ],
  },
  bizznezz: {
    name: "Bizznezz",
    scale: 4,
    // octave: 2,
    octave: 3,
    key: 7,
    notes: euclidean(9, 0, 27)
      .map((x, i) => [
        [x, 10 - i, 1],
        [x + 1, 9 - i, 1],
        [x + 2, 8 - i, 1],
      ])
      .flat(),
    bass: euclidean(9, 0, 27).map((x, i) => [x + 2, 8 - i, 2.5]),
  },
  oops: {
    name: "Oops",
    scale: 35,
    // octave: 2,
    octave: 3,
    key: 1,
    notes: euclidean(7, 2, 27)
      .map((x, i) => [
        [x, (i * 2) % 3, 1],
        [(x + 1) % 27, i + 4, 1],
        [(x + 2) % 27, i + 3, 1],
      ])
      .flat(),
    bass: euclidean(5, 1, 27)
      .map((x, i) => [
        [x, i * 2, 2],
        [(x + 2) % 27, i * 2 - 1, 2],
      ])
      .flat(),
  },
};
// console.log({ scales, melodies });
let lasttick = -1;
let measure = 0;
let key = 0;
let melody = melodies.codetastrophy;
let scale = scales[melody.scale];

const startMeasure = () => {
  measure++;
  emit("start@measure", measure);
};
const endMeasure = () => {
  emit("end@measure", measure);
  if (measure === scaleslength - 1) {
    shuffle();
  } else {
    scale = scales[(melody.scale + measure + 1) % scaleslength];
  }
};

on("key@speaker", x => (key = x % 13));
on("scale@speaker", x => (scale = scales[x] ?? scale));
on("melody@speaker", x => {
  melody = melodies[x] ?? melody;
  scale = scales[melody.scale] ?? scale;
  key = melody.key ?? key;
  measure = 0;
});

const tickOfMeasure = dur => (((dur / mpb) % 27 | 0) + 1) % 27;
// audio
const lramp = (x, ...y) => x.linearRampToValueAtTime(...y);
const expramp = (x, ...y) => x.exponentialRampToValueAtTime(...y);
const sval = (x, ...y) => x.setValueAtTime(...y);
const con = (a, b, ...x) => a.connect(b, ...x);
// note, len, vol, verb, attack, deflate
const play = (
  tick,
  dur,
  type = "sine",
  octave = 1,
  note = 0,
  len = 1,
  vol = 0.5,
  verb = 0.5,
  attack = 0.001,
  deflate = 0.5
) => {
  const decay = len * spb;
  const oct = octave + (note < 0 ? -1 : (note / 7) | 0);
  // const oct = octave;
  const freq = musick[key + oct * 13 + scale[(note + 7) % 7]];
  // console.log({ tick, note, octave, oct, n: (note + 7) % 7, sick: key + (oct * 13) + scale[(note + 7) % 7], freq });

  const t = dj.currentTime;
  const offset = max(((27 + tick - ((dur / mpb) % 27)) % 27) * spb, 0);
  const when = t + offset;

  const osc = dj.createOscillator({ type });
  const gain = dj.createGain();
  const comp = dj.createDynamicsCompressor();
  const verbage = dj.createGain();
  const split = dj.createChannelSplitter(2);
  const over = when + decay + 0.1;
  // console.log("play", tick, dur, osc.frequency, freq, when, t);
  sval(osc.frequency, freq, when);
  sval(osc.frequency, freq, when + attack);
  expramp(osc.frequency, freq * deflate, when + decay);

  sval(gain.gain, 0.01, t);
  lramp(gain.gain, vol * 0.5, when);
  expramp(gain.gain, vol, when + attack);
  expramp(gain.gain, 0.01, over);

  sval(comp.threshold, -27, t);
  sval(comp.knee, 39, when);
  sval(comp.ratio, 13, when);
  sval(comp.attack, 0, when);
  sval(comp.release, min(decay, 1), when);

  lramp(verbage.gain, vol * verb, when + 0.1);
  lramp(verbage.gain, 0.01, when + decay);

  con(osc, gain);
  con(gain, comp);
  con(comp, split);
  con(split, analyzer, 0, 0);
  con(split, verbage, 1, 0);
  con(verbage, reverb);

  osc.start(when);
  osc.stop(over);
  setTimeout(
    () => each([osc, gain, comp, split, verbage], x => x.disconnect()),
    (over - t + 1) * 1000
  );
};

const bass = (tick, dur) => {
  const sing = melody.bass.find(([x]) => x === tick);
  if (!sing) {
    return;
  }
  play(tick, dur, "square", 1, sing[1], sing[2], 0.5, 0.7, 0.01, 0.98);
};

const drum = (tick, dur) => {
  const sing = melody.notes.find(([x]) => x === tick);
  if (!sing) {
    return;
  }
  play(
    tick,
    dur,
    "sawtooth",
    melody.octave,
    sing[1],
    sing[2],
    0.7,
    0.8,
    0.005,
    0.98
  );
};

const scheduled = new Set();
const data$1 = new Uint8Array(79);

const drawSpeaker = dur => {
  print(
    0,
    0,
    hovered$1 ? colorMap.buzz : active$1 ? colorMap.hardware : colorMap.comment,
    transparent,
    1,
    191
  );
  const tick = tickOfMeasure(dur);
  if (tick !== lasttick) {
    scheduled.delete(lasttick);
    lasttick = tick;
  }
  if (analyzer) {
    if (active$1 && !scheduled.has(tick)) {
      if (tick === 0) {
        startMeasure();
      }
      // console.log("rendering tick", tick, measure, dur);
      scheduled.add(tick);
      drum(tick, dur);
      bass(tick, dur);
      if (tick === 26) {
        endMeasure();
      }
    }
    analyzer.getByteTimeDomainData(data$1);
    each([...data$1], (v, i) => {
      const a = ((abs(v - 127) / 128) ** 1.05 * 6) | 0;
      print(1 + i, 0, colorMap.buzz, transparent, 0.25 + a / 8, 216 + a);
    });
  }
};
// TODO: Remove this
const shuffle = () => {
  measure = 0;
  const list = values(melodies);
  melody = list[(list.indexOf(melody) + 1) % list.length];
  scale = scales[melody.scale] ?? scale;
  key = melody.key ?? key;
  speak(`Now playing ${melody.name}`);
};
assign(window, { shuffle });

// Brownie Points
const drawBrowniePoints = (dur, amt = 0) => {
  print(18, 38, colorMap.pickup, transparent, 1, 0xc5); // Brownie Point
  text(`:${amt}`.padEnd(4), 19, 38, colorMap.pickup);
};

// Coffee = Buzz
// Buzz = Code
const drawBuzz = (dur, amt = 0) => {
  print(0, 38, colorMap.code, transparent, 1, 0xc4); // Coffee
  text(`:${amt}`.padEnd(4), 1, 38, colorMap.code);
};

class Input {
  label = "input";
  value = "";
  max = 32;
  min = 0;
  complete = false;
  mask = false;
  cursor = 0;
  constructor(label, max, min, mask) {
    this.label = label ?? this.label;
    this.max = max ?? this.max;
    this.min = min ?? this.min;
    this.mask = mask ?? this.mask;
    this.keydown = ({ key }) => {
      if (key === "Delete") {
        this.value =
          this.value.slice(0, this.cursor) +
          this.value.slice(this.cursor + 1, this.vl);
        cursortrauma(5);
      } else if (key === "Enter" || key === "Return") {
        this.submit();
      } else if (key === "ArrowLeft") {
        this.cursor -= 1;
        cursortrauma(4);
      } else if (key === "ArrowRight") {
        this.cursor += 1;
        cursortrauma(4);
      } else if (key == "Backspace") {
        this.value =
          this.value.slice(0, this.cursor - 1) +
          this.value.slice(this.cursor, this.vl);
        this.cursor -= 1;
        cursortrauma(5);
      }
      this.norm();
    };
    this.keypress = ({ key }) => {
      if (key.length === 1 && this.vl < this.max - 1) {
        this.value =
          this.value.slice(0, this.cursor) +
          key +
          this.value.slice(this.cursor, this.vl);
        this.cursor += 1;
        cursortrauma(5);
        this.norm();
      } else {
        emit("nope@speaker");
      }
    };
    this.toggle(on);
  }
  toggle(f) {
    each("keydown,keypress".split(","), x => f(x, this[x]));
  }
  get vl() {
    return this.value.length;
  }
  norm() {
    this.cursor = max(0, min(this.vl, this.max, this.cursor));
  }
  submit() {
    if (!this.complete && this.vl >= this.min) {
      this.toggle(off);
      this.complete = true;
      drawCursor(0, -1, -1);
      emit("@output", this.value, this.label);
    } else {
      emit("nope@speaker");
    }
  }
  draw(dur, x, y) {
    const vl = this.vl;
    const offset = this.label.length + 1;
    printf(this.label + ":", x, y, colorMap.name);
    const value = this.mask ? "".padStart(vl, "*") : this.value;
    text(value, x + offset, y, colorMap.text);
    if (vl < this.max) {
      for (let i = x + this.max; i--; ) {
        del(x + offset + vl + i, y);
      }
    }
    if (!this.complete) {
      drawCursor(dur, x + offset + this.cursor, y);
    }
  }
}

const autocolor = {
  "½": colorMap.name,
};

const t$2 = 39;
const w$1 = 49;
const h$1 = 20;
const loglines = [];
let dirty = false;

const cycle = () => {
  while (loglines.length > h$1) {
    dirty = true;
    loglines.shift();
  }
};
const logConsole = x => {
  const length = x.length ?? 0;
  if (length > w$1) {
    if (typeof x === "string") {
      let words = x.split(" ");
      let l = words.shift();
      while (words.length) {
        const word = words.shift();
        if (l.length + word.length + 1 < w$1) {
          l += " " + word;
        } else {
          loglines.push(l);
          l = word;
        }
      }
      loglines.push(l);
    }
    // work on splitting them later.
    // loglines.push(...x.wrap(w));
  } else if (length) {
    loglines.push(x);
  }
  cycle();
};
const inputConsole = (...x) => {
  // What the heck are we going to do how?
  loglines.push(new Input(...x));
  cycle();
};
const drawConsole = dur => {
  if (dirty) {
    for (let c = w$1 * h$1; c--; ) {
      del(c % w$1, (t$2 + c / w$1) | 0);
    }
    dirty = false;
  }
  each(loglines, (l, i) => {
    if (typeof l === "string") {
      const color = autocolor[l[0]] ?? colorMap.text;
      text(l, 0, t$2 + i, color);
    } else if (l.draw) {
      l.draw(dur, 0, t$2 + i);
    }
  });
};

const drawDumpsterFire = (dur, amt = 0) => print(79, 59, colorMap.exception, transparent, 1, 0xec);

const drawErrors = (dur, amt = 0) => {
  print(6, 38, colorMap.smell, transparent, 1, 0xcc); // Errors
  text(`:${amt}`.padEnd(4), 7, 38, colorMap.smell);
};

const drawLoc = (dur, x, y) => {
  text(`ln:${y + 1} col:${x + 1}`.padEnd(14, " "), 27, 38, colorMap.comment);
};


const { buzz, hardware: hardware$1, pickup: pickup$1 } = colorMap;

// Key Controls
const KEYS = {};
const clearKeys = () => each(keys(KEYS), k => (KEYS[k] = false));
on("@KEYS", () => console.log(JSON.stringify(KEYS, false, 2)));
// let enabled = false;
// export const enableKeyControls = () => {
//     enabled = true;
//     clearKeys();
// };
// export const disableKeyControls = () => {
//     enabled = false;
//     clearKeys();
// };

on("keydown", ({ key }) => (KEYS[lower(key)] = true));
on("keyup", ({ key }) => (KEYS[lower(key)] = false));
listen("visibilitychange", clearKeys, document);
listen("blur", clearKeys);
listen("focus", clearKeys);

const t$1 = 40;
const l$1 = 50;
const drawKeyControls = dur => {
  // if (!enabled) { return; }
  const energy = values(KEYS).find(x => x) ? (random() * 7) | 0 : 0;
  print(l$1, t$1, KEYS.escape ? buzz : hardware$1, transparent, 1, 0x1b); // Esc
  print(l$1 + 1, t$1 + 1, KEYS[" "] ? buzz : hardware$1, transparent, 1, 0xe5); // Spacebar
  print(l$1 + 2, t$1, KEYS.shift ? buzz : hardware$1, transparent, 1, 0xe6); // Shift
  print(l$1 + 6, t$1, KEYS.enter ? buzz : hardware$1, transparent, 1, 0xe7); // Enter
  print(l$1 + 4, t$1, KEYS.arrowup ? buzz : hardware$1, transparent, 1, 0xe1); // ArrowUp
  print(
    l$1 + 3,
    t$1 + 1,
    KEYS.arrowleft ? buzz : hardware$1,
    transparent,
    1,
    0xe2
  ); // ArrowLeft
  print(
    l$1 + 4,
    t$1 + 1,
    KEYS.arrowdown ? buzz : hardware$1,
    transparent,
    1,
    0xe3
  ); // ArrowDown
  print(
    l$1 + 5,
    t$1 + 1,
    KEYS.arrowright ? buzz : hardware$1,
    transparent,
    1,
    0xe4
  ); // ArrowRight

  print(l$1 + 8, t$1, hardware$1, transparent, 1, 0xc0); // Virtual Core
  print(l$1 + 9, t$1, pickup$1, transparent, 1, 0xc3); // Plugin Key
  print(l$1 + 10, t$1, hardware$1, transparent, 1, 0xe0); // Key Control Plugin
  print(l$1 + 11, t$1, hardware$1, transparent, 1, 0xd8 + energy); // Wire
  text("Key Controls", l$1 + 12, t$1, hardware$1);
};

const keyify = key => "codetastrophy-" + key;
const open = key => JSON.parse(localStorage.getItem(keyify(key)) ?? "null");
const save = (key, x) => localStorage.setItem(keyify(key), JSON.stringify(x));

const user = open("user") ?? {
  username: null,
  desired: null,
  password: null,
  invalidations: [],
  achievements: [],
  readme: ["# Codetastrophy"],
  preferences: {},
};
const update = (k, v) => {
  if (Array.isArray(user[k])) {
    user[k].push(v);
  } else if (k) {
    user[k] = v;
  }
  save("user", user);
  emit("update@user", user);
};
on("achievement@user", x => update("achievements", x));
once("init", update);

const reasons = [
  [
    "Triskaidekaphobia!",
    x => x.length === 13 || x.toLowerCase() === "thirteen" || x.includes("13"),
    "What, do you have triskaidekaphobia?",
  ],
  [
    "Too few lowercase letters.",
    x => !x.match(/[a-z]/),
    "Too many lowercase letters.",
  ],
  [
    "Too few capital letters.",
    x => !x.match(/[A-Z]/),
    "Too many capital letters.",
  ],
  ["Too few letters.", x => !x.match(/[a-z]/i), "Too many letters."],
  ["Too few numbers.", x => !x.match(/\d/), "Too many numbers"],
  [
    "Too few special characters.",
    x => !x.match(/\W+/),
    "Too many special characters.",
  ],
  [
    "Too many lowercase letters.",
    x => x.match(/[a-z]/),
    "Too few lowercase letters.",
  ],
  [
    "Too many capital letters.",
    x => x.match(/[A-Z]/),
    "Too few capital letters.",
  ],
  ["Too many letters.", x => x.match(/[a-z]/i), "Too few letters."],
  ["Too many numbers.", x => x.match(/\d/), "Too few numbers"],
  [
    "Too many special characters.",
    x => x.match(/\W+/),
    "Too few special characters.",
  ],
  ["Too easy to guess.", x => x.length < 16, "Too hard to guess."],
  ["Too hard to guess.", x => x.length > 8, "Too easy to guess."],
  ["Too long.", x => x.length > 13, "Too short."],
  ["Too short.", x => x.length < 13, "Too long."],
  ["Too many mistakes.", x => x],
  ["Too few haikus.", x => x],
  ["Are you even trying?", x => x],
  ["You might want to give up.", x => x, "Just keep trying."],
];

const validate = (x = "") =>
  reasons.find((r, i) => r[1](x) && !user.invalidations.includes(i));

const loginQueue = [];
const step = () => {
  const [utterance, show] = loginQueue.shift() ?? [];
  if (typeof utterance === "string") {
    speak(utterance).then(step);
    logConsole(show ?? utterance);
  } else if (utterance) {
    utterance();
  } else;
};
// on("end@say", m => m === current && step());
let attempts = 0;
const passwordPrompt = () => {
  loginQueue.push([() => inputConsole("password", 32, 0, true)]);
  once("@output", x => {
    let reason = validate(x);
    const i = reasons.indexOf(reason);
    if ((!x || !reason) && attempts >= 2) {
      if (user.invalidations.length === reasons.length) {
        emit("achievement@user", "samuraiocertificate");
      }
      update("password", "true");
      emit("melody@speaker", "hi");
      loginQueue.push(
        ["New password successfully set to:"],
        ["redacted for security reasons", "*************"],
        ["Congratulations, and welcome to the dumpster fire!"],
        ["Now, get to work, slacker."],
        [() => emit("@state", "mainmenu")]
      );
    } else {
      attempts++;
      if (reason && !user.invalidations.includes(i)) {
        emit("melody@speaker", "oops");
        update("invalidations", i);
      }
      if (!reason) {
        reason = reasons
          .find((r, i) => !user.invalidations.includes(i))
          ?.slice(2);
      }
      loginQueue.push(
        [reason?.[0] ?? "Something went wrong."],
        [
          attempts >= 2
            ? "Try again, or press Enter and I'll just do it for you."
            : "Try again.",
        ],
        [passwordPrompt]
      );
    }
    step();
  });
  step();
};

on("open@login", () => {
  emit("melody@speaker", "hi");
  // enableKeyControls();
  logConsole(`½ codetastrophy`);
  loginQueue.push(["Welcome to code-tastrophy", "Welcome to codetastrophy!"]);
  if (user.username) {
    update("tail", user.username.split("b13").pop());
    loginQueue.push(
      ["Oh, great. You again."],
      [`I'm still not calling you ${user.desired}.`],
      [
        `You're forever noobie ${user.tail.split("").join(", ")}.`,
        `You're forever ${user.username}.`,
      ]
    );
    if (!user.password || !user.achievements.includes("samuraiocertificate")) {
      // If they don't have the achievement yet prompt them for a password again
      loginQueue.push(
        ["Your password has expired."],
        ["Create a new one, then press Enter."],
        [passwordPrompt]
      );
    } else {
      loginQueue.push(
        ["Welcome back to the dumpster fire!"],
        [() => emit("@state", "mainmenu")]
      );
    }
  } else {
    loginQueue.push(
      ["Input your desired username, then press Enter."],
      [() => inputConsole("username", 32, 2)]
    );
    once("@output", x => {
      const tail = Date.now().toString(16).slice(-6);
      user.desired = x;
      update("username", "n00b13" + tail);
      loginQueue.push(
        ["Ha ha."],
        ["Ha ha ha."],
        ["No."],
        [
          `You're now noobie ${tail.split("").join(", ")}.`,
          `You're now ${user.username}.`,
        ],
        ["Create your new password, then press Enter."],
        [passwordPrompt]
      );
      step();
    });
  }
  step();
});
on("close@login", () => {
  loginQueue.splice(0, loginQueue.length);
  // disableKeyControls();
});
const drawLogin = dur => {
  drawConsole(dur);
  drawKeyControls();
};

const { hardware, pickup } = colorMap;
const t = 43;
const l = 50;
const drawInformant = dur => {
  const energy = 0;
  print(l, t, hardware, transparent, 1, 0xc0); // Virtual Core
  print(l + 1, t, pickup, transparent, 1, 0xc3); // Plugin Key
  print(l + 2, t, hardware, transparent, 1, 0xb3); // Informant Plugin
  print(l + 3, t, hardware, transparent, 1, 0xd8 + energy); // Wire
  text("Informant", l + 4, t, hardware);
};

const drawWarnings = (dur, amt = 0) => {
  print(12, 38, colorMap.exception, transparent, 1, 0xcb); // Warning
  text(`:${amt}`.padEnd(4), 13, 38, colorMap.exception);
};

on("update@user", x => x);
// Main Menu
let cursor = [0, 0];
const move = {
  Left: () => (cursor[0] = max(0, cursor[0] - 1)),
  Right: () => (cursor[0] = min(36, cursor[0] + 1)),
  Up: () => (cursor[1] = max(0, cursor[1] - 1)),
  Down: () => (cursor[1] = min(36, cursor[1] + 1)),
};
const keydown = ({ key }) => {
  const dir = move[key.split("Arrow").pop()];
  if (dir) {
    dir();
    cursortrauma(2 + random() * 2.5);
  }
};
on("open@mainmenu", () => {
  open("repo");
  emit("melody@speaker", "codetastrophy");
  logConsole("½ Main Menu");
  speak("Main Menu");
  on("keydown", keydown);
});
on("close@mainmenu", () => {
  current = null;
  queue.splice(0, queue.length);
  off("keydown", keydown);
});

// const MainMenu = () => FunctionDeclaration();
/**
function MainMenu(you) {
    if (you.areNotScared) return currentRepo.continue(î);
    if (you.areAQuiter) return new Repo(î);
    if (you.areConfused) return ReadMe(î);
    if (you.wantToGloat) return Achievements(î);
}
*/
const drawMainMenu = dur => {
  drawConsole(dur);
  drawKeyControls();
  drawInformant();
  drawBuzz(dur, 13);
  drawErrors(dur, 0);
  drawWarnings(dur, 0);
  drawBrowniePoints(dur, 0);
  drawDumpsterFire();
  drawCursor(dur, 4 + cursor[0], 1 + cursor[1]);
  drawLoc(dur, ...cursor);
};

const squirrel = (seed = 0, x = 0, y = 0, z = 0) => {
  let mangled = x + 198491317 * y + 237375311 * z; // 777767777
  mangled *= 0xb5297a4d;
  mangled += seed;
  mangled ^= mangled >> 8;
  mangled += 0x68e31da4;
  mangled ^= mangled << 8;
  mangled *= 0x1b56c4e9;
  mangled ^= mangled >> 8;
  return mangled / 0x7fffffff;
};

const nameRGB = colorMap.name.slice(0, 3);
const w = 56;
const h = 13;
const pow = 131313;
let hovered = false;
let active = false;
let data;

on("open@title", () => {
  active = true;
  emit("melody@speaker", "codetastrophy");
});
on("close@title", () => (active = false));
on("@hover", (x, y) => (hovered = active && x >= 33 && x <= 47 && y == 35));
on("click", () => {
  if (!hovered || !active) {
    return;
  }
  emit("@state", "login");
});
const drawTitle = dur => {
  if (!data || !active) {
    return;
  }
  const t = dur % pow;
  const d169 = t / 169;
  const d125 = sin(t / 125);
  const d39 = t / 39;
  const d1300 = sin(t / 1300);

  const mina = 0.21;
  for (let c = 0; c < 4800; c++) {
    const x = c % 80;
    const y = (c / 80) | 0;
    const y59 = y / 59;
    const s =
      squirrel(
        13,
        (x + sin(y + d169) * (1.3 - y59) ** 3) | 0,
        (y + d39) | 0,
        d125 | 0
      ) *
        y59 ** 1.13 +
      (cos((x - 40) / (5 - d1300)) - 1) / 13;
    const fg =
      s > 0.6
        ? colorMap.smell
        : s > 0.4
        ? colorMap.exception
        : s >= mina
        ? colorMap.variable
        : colorMap.gutter;
    const bg =
      s > 0.6
        ? colorMap.string
        : s > 0.4
        ? colorMap.variable
        : s >= mina
        ? colorMap.keyword
        : colorMap.padding;
    print(
      x,
      y,
      fg,
      [...bg.slice(0, 3), s / 2],
      s,
      charfade[(((s - mina) / (1 - mina)) * 127) | 0]
    );
  }

  for (let c = w * h; c--; ) {
    const color = data.slice(c * 4, c * 4 + 4);
    const alpha = color[3] / 255;
    const rgba = map([...color], x => x / 255);
    if (alpha) {
      print(
        (c % w) + 12,
        ((c / w) | 0) + 23,
        rgba,
        // [...nameRGB, alpha**2],
        [...nameRGB, alpha / 3],
        1,
        charfade[((color[3] - 3 + sin(d169 + (c / 13) ** 1.3) * 3) / 2) | 0]
      );
    }
  }
  printf("v0.13.30135715366", 40, 33, colorMap.code);
  text("Click to Begin", 33, 35, hovered ? colorMap.buzz : colorMap.hardware);
};

const acs = (g, ...x) => g.addColorStop(...x);
once("init", ({ image }) => {
  const canvas = new OffscreenCanvas(w, h);
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, w, h);
  // "\x90\x91\x92\x93\x94\x95\x96"
  // stripe(y,i=>i+144)
  stripe(7, l => ctx.drawImage(image, 0, (144 + l) * 8, 8, 8, l * 8, 2, 8, 8));
  let fade;
  ctx.globalCompositeOperation = "source-in";
  fade = ctx.createLinearGradient(0, 0, 56, 0);
  stripe(14, i => {
    acs(fade, (i + 0.1) / 14, theme.code);
    acs(fade, (i + 1) / 14, theme.code + "80");
  });
  ctx.fillStyle = fade;
  ctx.fillRect(0, 0, 56, 13);
  fade = ctx.createLinearGradient(0, 0, 0, 13);
  acs(fade, 0.25, theme.code);
  acs(fade, 1, theme.code + "20");
  ctx.fillStyle = fade;
  ctx.fillRect(0, 0, 56, 13);
  ctx.globalCompositeOperation = "source-over";
  data = ctx.getImageData(0, 0, 56, 13).data;
});

const Link = Invocation(
  "Link",
  [],
  [
    ["name", null],
    ["head", []], // Thing
    ["tail", []], // Thing
  ]
);

// Abstract Syntax Tree
const AST = {
  ArrayExpression: [{ elements: [] }, ["Expression"]],
  ArrayPattern: [{ elements: [] }, ["Pattern"]],
  ArrowFunctionExpression: [
    {
      generator: false,
      async: false,
      params: [],
      body: [],
    },
    ["Expression"],
  ],
  AssignmentExpression: [
    { left: null, operator: "=", right: null },
    ["Expression"],
  ],
  AssignmentPattern: [{ left: null, right: null }, ["Pattern"]],
  AwaitExpression: [{ argument: null }, ["Expression"]],
  BinaryExpression: [
    { left: null, operator: "===", right: null },
    ["Expression"],
  ],
  BlockStatement: [
    { leadingComments: [], trailingComments: [], body: [] },
    ["Statement"],
  ],
  BooleanLiteral: [{ value: false }, ["Literal"]],
  BreakStatement: [
    { leadingComments: [], trailingComments: [], label: null },
    ["Statement"],
  ],
  CallExpression: [
    { trailingComments: [], callee: null, arguments: [] },
    ["Expression"],
  ],
  CatchClause: [{ param: null, body: null }],
  ClassBody: [{ body: [] }],
  ClassDeclaration: [
    { trailingComments: [], id: null, superClass: null, body: null },
    ["Declaration"],
  ],
  ClassMethod: [
    {
      key: null,
      computed: false,
      kind: "method",
      generator: false,
      async: false,
      params: [],
      body: null,
      static: false,
    },
    ["Method"],
  ],
  ClassPrivateMethod: [
    {
      key: null,
      computed: false,
      kind: "method",
      generator: false,
      async: false,
      params: [],
      body: null,
      static: false,
    },
    ["ClassMethod"],
  ],
  ClassPrivateProperty: [
    {
      key: null,
      computed: false,
      value: null,
      trailingComments: [],
      leadingComments: [],
      static: false,
    },
    ["ClassProperty"],
  ],
  ClassProperty: [
    {
      key: null,
      computed: false,
      value: null,
      trailingComments: [],
      leadingComments: [],
      static: false,
    },
    ["Property"],
  ],
  Comment: [{ value: "" }],
  CommentBlock: [{ value: "" }, ["Comment"]],
  CommentLine: [{ value: "" }, ["Comment"]],
  ConditionalExpression: [
    { test: null, consequent: null, alternate: null },
    ["Expression"],
  ],
  ContinueStatement: [{ label: null }, ["Statement"]],
  DebuggerStatement: [{}, ["Statement"]],
  Declaration: [{ trailingComments: [] }],
  DoWhileStatement: [{ test: null, body: null }, ["WhileStatement"]],
  EmptyStatement: [{}, ["Statement"]],
  ExportDefaultDeclaration: [{ declaration: null }, ["Declaration"]],
  ExportNamedDeclaration: [
    { specifiers: [], declaration: null },
    ["Declaration"],
  ],
  ExportSpecifier: [{ local: null, exported: null }],
  Expression: [{ trailingComments: [] }],
  ExpressionStatement: [{ expression: null }, ["Statement"]],
  File: [{ program: null }],
  ForInStatement: [
    {
      left: null,
      right: null,
      body: null,
    },
    ["Statement"],
  ],
  ForOfStatement: [
    {
      await: false,
      left: null,
      right: null,
      body: null,
    },
    ["Statement"],
  ],
  ForStatement: [
    {
      init: null,
      test: null,
      update: null,
      body: null,
    },
    ["Statement"],
  ],
  FunctionDeclaration: [
    {
      id: null,
      generator: false,
      async: false,
      params: [],
      body: null,
    },
    ["Declaration"],
  ],
  FunctionExpression: [
    {
      generator: false,
      async: false,
      id: null,
      params: [],
      body: null,
    },
    ["Expression"],
  ],
  Identifier: [{ n: "a", undefined: undefined }],
  IfStatement: [
    {
      test: null,
      consequent: null,
      alternate: null,
    },
    ["Statement"],
  ],
  Import: [{}],
  ImportDeclaration: [{ specifiers: [], source: null }, ["Declaration"]],
  ImportSpecifier: [{ imported: null, local: null }],
  ImportdefaultSpecifier: [{ local: null }],
  Keyword: [{ word: null }],
  LabeledStatement: [{ body: null, label: null }, ["Statement"]],
  Literal: [{}],
  LogicalExpression: [
    { left: null, operator: "&&", right: null },
    ["Expression"],
  ],
  MemberExpression: [
    { object: null, computed: false, property: null },
    ["Expression"],
  ],
  Method: [
    {
      key: null,
      computed: false,
      kind: "method",
      generator: false,
      async: false,
      params: [],
      body: null,
    },
  ],
  NewExpression: [{ callee: null, arguments: [] }, ["Expression"]],
  NullLiteral: [{}, ["Literal"]],
  NumericLiteral: [{ value: null }, ["Literal"]],
  ObjectExpression: [{ properties: [] }, ["Expression"]],
  ObjectMethod: [
    {
      key: null,
      computed: false,
      kind: "method",
      generator: false,
      async: false,
      params: [],
      body: null,
    },
    ["Method"],
  ],
  ObjectPattern: [{ properties: [] }, ["Pattern"]],
  ObjectProperty: [
    {
      key: null,
      computed: false,
      value: null,
      trailingComments: [],
      leadingComments: [],
      shorthand: false,
    },
    ["Property"],
  ],
  OptionalCallExpression: [
    { callee: null, arguments: [], optional: true },
    ["CallExpression"],
  ],
  OptionalMemberExpression: [
    {
      object: null,
      computed: false,
      property: null,
      optional: true,
    },
    ["MemberExpression"],
  ],
  Pattern: [],
  PrivateName: [{ id: null }],
  Program: [{ body: [] }],
  Property: [
    {
      key: null,
      computed: false,
      value: null,
      trailingComments: [],
      leadingComments: [],
    },
  ],
  Raw: [{ raw: "", cooked: "" }],
  RegExpLiteral: [{ pattern: null, flags: null }, ["Literal"]],
  RestElement: [{ argument: null }],
  ReturnStatement: [{ argument: null }, ["Statement"]],
  SequenceExpression: [{ expressions: [] }, ["Expression"]],
  SpreadElement: [{ argument: null }],
  Statement: [{ leadingComments: [], trailingComments: [] }],
  StringLiteral: [{ value: null }, ["Literal"]],
  Super: [],
  TemplateElement: [{ value: null, tail: false }],
  TemplateLiteral: [{ expression: [], quasis: [] }, ["Literal"]],
  ThisExpression: [{ trailingComments: [] }, ["Expression"]],
  TryStatement: [
    {
      leadingComments: [],
      trailingComments: [],
      block: null,
      handler: null,
      finalizer: null,
    },
    ["Statement"],
  ],
  UnaryExpression: [
    { trailingComments: [], operator: "!", prefix: false, argument: null },
    ["Expression"],
  ],
  UpdateExpression: [
    { trailingComments: [], operator: "++", prefix: false, argument: null },
    ["Expression"],
  ],
  VariableDeclaration: [
    { trailingComments: [], kind: "var", declarations: [] },
    ["Declaration"],
  ],
  VariableDeclarator: [{ id: null, init: null }],
  WhileStatement: [
    { leadingComments: [], trailingComments: [], test: null, body: null },
    ["Statement"],
  ],
  YieldExpression: [
    { trailingComments: [], delegate: false, argument: null },
    ["Expression"],
  ],
};
var AST$1 = reduce(
  sort(
    entries(AST),
    ([an, [ap, am = []]], [bn, [bp, bm = []]]) =>
      am.length - bm.length || an.length - bn.length || (an < bn ? -1 : 1)
  ),
  (r, [name, [props = {}, mixins = []]]) => {
    r[name] = Invocation(
      name,
      map(mixins, k => r[k]),
      entries(props)
    );
    return r;
  },
  {}
);

// Maybe put this in to be cheaky about the devtools
// const devtools = function () {};
// devtools.toString = () => {
//   devtools.opened = true;
//   const message = "What, are you trying to cheat or something?";
//   setTimeout(() => {
//       logConsole(message);
//       emit("@say", message);
//   }, 1000);
//   return message;
// }
// console.log("DevTools: %s", devtools);

let state = "init";
const states = {
  init: () => {},
  title: drawTitle,
  mainmenu: drawMainMenu,
  login: drawLogin,
};
on("@state", grid => {
  emit(`close@${state}`);
  state = grid;
  clear();
  clearKeys();
  emit(`open@${state}`);
});
once("init", () => emit("@state", "title"));

const main = async () => {
  const image = await loadFont();
  emit("init", { image, $pointy: $("pointy"), $screen: $("screen") });

  let now = 0;
  let dur = 0;
  const r = () => requestAnimationFrame(render);
  const render = (t = 0) => {
    const d = t - now;
    now = t;
    // Move the mouse
    emit("move@mouse", dur);
    states[state](dur);
    drawSpeaker(dur);
    // Draw the screen
    draw(dur);
    r();
  };
  r();
};

main();

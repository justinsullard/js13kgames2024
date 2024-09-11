import entries from "../util/entries.js";
import stripe from "../util/stripe.js";
import { on, once } from "./bus.js";
import each from "../util/each.js";
import { abs, sin, cos, PI } from "../util/math.js";
import assign from "../util/assign.js";
import keys from "../util/keys.js";
import values from "../util/values.js";
import reduce from "../util/reduce.js";
// import split from "../util/split.js";

const loadShader = x => fetch(x).then(r => r.text());

let vertexShaderSrc;
let fragmentShaderSrc;

const makeShader = (gl, type, program, src) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    gl.attachShader(program, shader);
    // return shader;
};

export const theme = {
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
export const transparent = [0, 0, 0, 0];
export const colorMap = reduce(entries(theme), (r, [k, v]) => {
    r[k] = [...v.match(/\w\w/g).map(x => parseInt(x, 16) / 255), 1];
    return r;
}, {});
export const colors = values(colorMap);
export const colorNames = keys(colorMap);
export const colorCount = colors.length;
export const charfade = [46,44,30,96,39,58,45,13,59,11,31,19,10,94,8,17,18,28,29,5,14,20,4,15,37,7,33,127,6,106,105,42,12,43,61,124,40,92,0,21,24,32,47,60,41,62,95,116,1,16,26,3,108,123,63,9,2,125,34,23,25,91,126,93,118,27,84,114,89,38,86,115,22,111,102,104,120,49,97,55,76,99,112,113,121,64,101,107,103,119,110,117,36,122,74,70,80,109,67,98,75,88,100,52,65,69,51,54,57,83,87,35,50,78,85,56,48,73,79,71,68,72,82,90,81,53,66,77];

export const wscale = 1/40;
export const hscale = 1/30;

const pright = wscale - 1;
const pbottom = 1 - hscale;
const modelData = new Float32Array([
    // position       texCoord
    -1, 1,            0, 0,
    pright, 1,        1, 0,
    -1, pbottom,      0, 1,

    pright, pbottom,  1, 1,
    -1, pbottom,      0 ,1,
    pright, 1,        1, 0
]);

export const transformStride = 12;
const transformData = new Float32Array([
    ...stripe(4800, i => [ // TODO: Break these up into char objects
        (i % 80) * wscale, // aOffset.x
        ((i / 80) | 0) * -hscale, // aOffset.y 
        ...transparent, // aFgColor
        ...transparent, // aBgColor
        1, // aAlpha
        0 // aDepth (char)
    ]),
    ...[ // TODO: Break these up into bug objects, etc.
        ...stripe(256, () => [0, transparent, 0]), // blank bugs
        [220, colorMap.smell, 1], // dumpster fire
        [208, colorMap.buzz, 1], // cursor
        [232, colorMap.buzz, 1] // mouse
    ].map(([i, color, a]) => [
        -2, // aOffset.x
        -2, // aOffset.y 
        ...color, // aFgColor
        ...transparent, // aBgColor
        a, // aAlpha
        i // aDepth (char)
    ])
].flat());

export const defaultUniforms = () => ({
    time: 0,
    warp: new Float32Array([0, 0]), // new Float32Array([1 / 51, 1 / 46]),
    mask: new Float32Array([0.25, 0.9]),
    fxmix: 0.2,
    brightness: 0.02,
    contrast: 0.03,
    saturation: 0,
});
const uniforms = defaultUniforms();
on("uniforms@screen", () => console.log(uniforms));
on("uniform@screen", (k, v) => uniforms[k] = v);

const tp = (gl, ...x) => gl.texParameteri(...x);
const vtp = (gl, ...x) => gl.vertexAttribPointer(...x);
const evaa = (gl, ...x) => gl.enableVertexAttribArray(...x);
const vad = (gl, ...x) => gl.vertexAttribDivisor(...x);
const bb = (gl, ...x) => gl.bindBuffer(...x);
const bd = (gl, ...x) => gl.bufferData(...x);

let gl;
let uniformLocations;
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

export const draw = (t = 0) => {
    if (!gl) { return; }
    uniforms.time = t;
    const c = t / 13000 * PI;
    const st = abs(sin(c));
    const ct = cos(c);
    // uniforms.warp.set([st / 51, st / 46]);
    assign(uniforms, {
        fxmix: 0.1 + st / 5,
        saturation: ct / 5,
        contrast: ct / 5,
        brightness: 0.02 + ct / 8,
    });
    each(
        entries(uniforms),
        ([k, v]) => gl[v?.length ? "uniform2fv" : "uniform1f"](uniformLocations[k], v)
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
export const print = (x = 0, y = 0, fg = colorMap.text, bg = transparent, alpha = 1, char = 0) => {
    const offset = (x + y * 80) * transformStride;
    transformData.set([...fg, ...bg, alpha, char], offset + 2);
};
export const move = (entity, x = 0, y = 0) => {
    transformData.set([x, y], (4800 + entity) * transformStride);
};
export const update = (entity, char = 0) => {
    transformData.set([char], (4800 + entity) * transformStride + 11);
};
export const del = (x = 0, y = 0) => {
    print(x, y, transparent, transparent, 0, 0);
};
export const printf = (str = "", x = 0, y = 0, fg, bg, alpha) => {
    for (let c = str.length; c--;) {
        print(x + c, y, fg, bg, alpha, str.charCodeAt(c));
    }
};
export const text = (str = "", x = 0, y = 0, fg, bg, alpha) => {
    for (let c = str.length; c--;) {
        print(x + c, y, fg, bg, str[c] === " " ? 0 : alpha, str.charCodeAt(c));
    }
};
export const clear = () => {
    const fg = colorMap.text
    const bg = transparent;
    for (let c = 4800; c--;) {
        transformData.set([...fg, ...bg, 0, 0], c * transformStride + 2);
    }
}
export const report = (c) => {
    const offset = c * transformStride;
    return transformData.slice(offset, offset + transformStride);
}

once("init", async ({ $screen, image }) => {

    vertexShaderSrc = vertexShaderSrc || await loadShader("./hardware/vertex.glsl");
    fragmentShaderSrc = fragmentShaderSrc || await loadShader("./hardware/fragment.glsl");

    gl = $screen.getContext("webgl2", { premultipliedAlpha: false });
    const program = gl.createProgram();
    makeShader(gl, VERTEX_SHADER, program, vertexShaderSrc);
    makeShader(gl, FRAGMENT_SHADER, program, fragmentShaderSrc);
    gl.linkProgram(program);
    gl.useProgram(program);
    
    const texture = gl.createTexture();
    gl.bindTexture(TEXTURE_2D_ARRAY, texture);
    gl.texImage3D(TEXTURE_2D_ARRAY, 0, RGBA, 8, 8, 256, 0, RGBA, UNSIGNED_BYTE, image);
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
    each([
        [2, 2, FLOAT, false, 48, 0], // offset x and y
        [3, 4, FLOAT, false, 48, 8], // aFgColor
        [4, 4, FLOAT, false, 48, 24], // aBgColor
        [5, 1, FLOAT, false, 48, 40], // aAlpha
        [6, 1, FLOAT, false, 48, 44], // aDepth (char)
    ], (x, i) => {
        vtp(gl, ...x);
        vad(gl, x[0], 1);
        evaa(gl, x[0]);    
    });

    uniformLocations = entries(uniforms).reduce(
        (r, [name, i]) => {
            r[name] = gl.getUniformLocation(program, name);
            return r;
        },
        {}
    );
});
import entries from "../util/entries.js";
import stripe from "../util/stripe.js";
import { once } from "./bus.js";
import each from "../util/each.js";

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
export const colorMap = [...Object.entries(theme)].reduce((r, [k, v]) => {
    r[k] = [...v.match(/\w\w/g).map(x => parseInt(x, 16) / 255), 1];
    return r;
}, {});
export const colors = [...Object.values(colorMap)];
export const colorNames = [...Object.keys(colorMap)];
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
    warp: new Float32Array([1 / 51, 1 / 46]),
    mask: new Float32Array([0.25, 0.9]),
    fxmix: 0.2,
    brightness: 0.02,
    contrast: 0.03,
    saturation: 0,
});
const uniforms = defaultUniforms();

const tp = (gl, ...x) => gl.texParameteri(...x);
const vtp = (gl, ...x) => gl.vertexAttribPointer(...x);
const evaa = (gl, ...x) => gl.enableVertexAttribArray(...x);
const vad = (gl, ...x) => gl.vertexAttribDivisor(...x);
const bb = (gl, ...x) => gl.bindBuffer(...x);

let gl;
let uniformLocations;
let GLT2A;
let GLCTE;
let GLAB;
let GLF;
let GLSD;


export const draw = (t = 0) => {
    if (!gl) { return; }
    uniforms.time = t;

    each(
        entries(uniforms),
        ([k, v]) => gl[v?.length ? "uniform2fv" : "uniform1f"](uniformLocations[k], v)
    );

    gl.clearColor(...colorMap.background);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    gl.bufferData(GLAB, transformData, GLSD);

    gl.drawArraysInstanced(gl.TRIANGLES, 0, 6, 5059); // 4800 + 256 + 3
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
    GLT2A = gl.TEXTURE_2D_ARRAY;
    GLCTE = gl.CLAMP_TO_EDGE;
    GLAB = gl.ARRAY_BUFFER;
    GLF = gl.FLOAT;
    GLSD = gl.STATIC_DRAW;
    
    const program = gl.createProgram();
    // const vertexShader = makeShader(gl, gl.VERTEX_SHADER, program, vertexShaderSrc);
    // const fragmentShader = makeShader(gl, gl.FRAGMENT_SHADER, program, fragmentShaderSrc);
    makeShader(gl, gl.VERTEX_SHADER, program, vertexShaderSrc);
    makeShader(gl, gl.FRAGMENT_SHADER, program, fragmentShaderSrc);
    gl.linkProgram(program);
    // if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    //     console.debug(gl.getShaderInfoLog(vertexShader));
    //     console.debug(gl.getShaderInfoLog(fragmentShader));
    // }
    gl.useProgram(program);


    const texture = gl.createTexture();
    gl.bindTexture(GLT2A, texture);
    gl.texImage3D(GLT2A, 0, gl.RGBA, 8, 8, 256, 0, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.generateMipmap(GLT2A);
    tp(gl, GLT2A, gl.TEXTURE_WRAP_S, GLCTE);
    tp(gl, GLT2A, gl.TEXTURE_WRAP_T, GLCTE);
    tp(gl, GLT2A, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_LINEAR);
    tp(gl, GLT2A, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    // const modelBuffer = gl.createBuffer();
    // bb(gl, GLAB, modelBuffer);
    bb(gl, GLAB, gl.createBuffer());
    gl.bufferData(GLAB, modelData, GLSD);
    vtp(gl, 0, 2, GLF, false, 16, 0);
    vtp(gl, 1, 2, GLF, false, 16, 8);
    evaa(gl, 0);
    evaa(gl, 1);

    // const transformBuffer = gl.createBuffer();
    // bb(gl, GLAB, transformBuffer);
    bb(gl, GLAB, gl.createBuffer());

    vtp(gl, 2, 2, GLF, false, 48, 0); // offset x and y
    vad(gl, 2, 1);
    evaa(gl, 2);
    vtp(gl, 3, 4, GLF, false, 48, 8); // aFgColor
    vad(gl, 3, 1);
    evaa(gl, 3);
    vtp(gl, 4, 4, GLF, false, 48, 24); // aBgColor
    vad(gl, 4, 1);
    evaa(gl, 4);
    vtp(gl, 5, 1, GLF, false, 48, 40); // aAlpha
    vad(gl, 5, 1);
    evaa(gl, 5);
    vtp(gl, 6, 1, GLF, false, 48, 44); // aDepth (char)
    vad(gl, 6, 1);
    evaa(gl, 6);

    // Confirm if these are actually necessary.


    uniformLocations = entries(uniforms).reduce(
        (r, [name, i]) => {
            r[name] = gl.getUniformLocation(program, name);
            return r;
        },
        {}
    );
});
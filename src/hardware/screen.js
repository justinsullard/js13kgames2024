import vertexShaderSrc from './vertex.glsl?raw';
import fragmentShaderSrc from './fragment.glsl?raw';
import stripe from "../util/stripe.js";

const makeShader = (gl, type, program, src) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    gl.attachShader(program, shader);
    return shader;
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
export const colorMap = [...Object.entries(theme)].reduce((r, [k, v]) => {
    r[k] = [...v.match(/\w\w/g).map(x => parseInt(x, 16) / 255), 1];
    return r;
}, {});
export const colors = [...Object.values(colorMap)];
export const colorCount = colors.length;
export const charfade = [46,44,30,96,39,58,45,13,59,11,31,19,10,94,8,17,18,28,29,5,14,20,4,15,37,7,33,127,6,106,105,42,12,43,61,124,40,92,0,21,24,32,47,60,41,62,95,116,1,16,26,3,108,123,63,9,2,125,34,23,25,91,126,93,118,27,84,114,89,38,86,115,22,111,102,104,120,49,97,55,76,99,112,113,121,64,101,107,103,119,110,117,36,122,74,70,80,109,67,98,75,88,100,52,65,69,51,54,57,83,87,35,50,78,85,56,48,73,79,71,68,72,82,90,81,53,66,77];

export const wscale = 1/40;
export const hscale = 1/30;

export const transformStride = 12;

export default class Screen {
    uniforms = {
        warp: [1 / 51, 1 / 46],
        mask: [0.25, 0.9],
        fxmix: [0.2],
        brightness: [0.6],
        contrast: [0.03],
        saturation: [0],
    };
    constructor(canvas, image) {

        const gl = canvas.getContext("webgl2");
        const program = gl.createProgram();
        const vertexShader = makeShader(gl, gl.VERTEX_SHADER, program, vertexShaderSrc);
        const fragmentShader = makeShader(gl, gl.FRAGMENT_SHADER, program, fragmentShaderSrc);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.debug(gl.getShaderInfoLog(vertexShader));
            console.debug(gl.getShaderInfoLog(fragmentShader));
        }
        gl.useProgram(program);

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

        // layout(location=0) in vec4 aPosition; modelData 0-1 (2)
        // layout(location=1) in vec2 aTexCoord; modelData 2-3 (2)
        // layout(location=2) in vec3 aOffset; transformData 0-1 (2)
        // layout(location=3) in vec4 aFgColor; transformData 2-5 (4)
        // layout(location=4) in vec4 aBgColor; transformData 6-9 (4)
        // layout(location=5) in float aAlpha; transformData 10 (1)
        // layout(location=6) in float aDepth; transformData 11 (1)
        
        const transformData = new Float32Array([
            ...stripe(4800, i => [
                (i % 80) * wscale, // aOffset.x
                ((i / 80) | 0) * -hscale, // aOffset.y 
                0, 0, 0, 0, // aFgColor
                0, 0, 0, 0, // aBgColor
                1, // aAlpha
                0 // aDepth (char)
            ]),
            ...[
                ...stripe(256, () => [0, [0, 0, 0, 0]]), // blank bugs
                [220, colorMap.smell], // dumpster fire
                [208, colorMap.buzz], // cursor
                [232, colorMap.buzz] // mouse
            ].map(([i, color]) => [
                -1, // aOffset.x
                -1, // aOffset.y 
                ...color, // aFgColor
                0, 0, 0, 0, // aBgColor
                0, // aAlpha
                i // aDepth (char)
            ])
        ].flat());
        
        Object.assign(this, {
            canvas,
            image,
            gl,
            program,
            vertexShader,
            fragmentShader,
            modelData,
            transformData,
        });

    }
}
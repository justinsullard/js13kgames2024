import stripe from "../util/stripe.js";

const loadShader = x => fetch(x).then(r => r.text());

let vertexShaderSrc;
let fragmentShaderSrc;

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

export const transformStride = 12;

export class Screen {
    uniforms = {
        time: 0,
        warp: new Float32Array([1 / 51, 1 / 46]),
        mask: new Float32Array([0.25, 0.9]),
        fxmix: 0.2,
        brightness: 0.02,
        contrast: 0.03,
        saturation: 0,
    };
    constructor(canvas, image) {

        const gl = canvas.getContext("webgl2", {
            premultipliedAlpha: false  // Ask for non-premultiplied alpha
        });
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
        
        const transformData = new Float32Array([
            ...stripe(4800, i => [
                (i % 80) * wscale, // aOffset.x
                ((i / 80) | 0) * -hscale, // aOffset.y 
                ...transparent, // aFgColor
                ...transparent, // aBgColor
                1, // aAlpha
                0 // aDepth (char)
            ]),
            ...[
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

        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D_ARRAY, texture);
        gl.texImage3D(gl.TEXTURE_2D_ARRAY, 0, gl.RGBA, 8, 8, 256, 0, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.generateMipmap(gl.TEXTURE_2D_ARRAY);
        gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_LINEAR);
        gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    
        const modelBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, modelBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, modelData, gl.STATIC_DRAW);
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 16, 0);
        gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 16, 8);
        gl.enableVertexAttribArray(0);
        gl.enableVertexAttribArray(1);
    
        const transformBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, transformBuffer);
    
        gl.vertexAttribPointer(2, 2, gl.FLOAT, false, 48, 0); // offset x and y
        gl.vertexAttribPointer(3, 4, gl.FLOAT, false, 48, 8); // aFgColor
        gl.vertexAttribPointer(4, 4, gl.FLOAT, false, 48, 24); // aBgColor
        gl.vertexAttribPointer(5, 1, gl.FLOAT, false, 48, 40); // aAlpha
        gl.vertexAttribPointer(6, 1, gl.FLOAT, false, 48, 44); // aDepth (char)
    
        // Confirm if these are actually necessary.
        gl.vertexAttribDivisor(2, 1);
        gl.vertexAttribDivisor(3, 1);
        gl.vertexAttribDivisor(4, 1);
        gl.vertexAttribDivisor(5, 1);
        gl.vertexAttribDivisor(6, 1);
    
        gl.enableVertexAttribArray(2);
        gl.enableVertexAttribArray(3);
        gl.enableVertexAttribArray(4);
        gl.enableVertexAttribArray(5);
        gl.enableVertexAttribArray(6);

        const uniformLocations = Object.entries(this.uniforms).reduce(
            (r, [name, i]) => {
                r[name] = gl.getUniformLocation(program, name);
                return r;
            },
            {}
        );

        Object.assign(this, {
            canvas,
            image,
            gl,
            program,
            vertexShader,
            fragmentShader,
            modelData,
            transformData,
            uniformLocations,
        });

    }
    draw(t = 0) {
        const { gl, transformData, uniforms, uniformLocations } = this;
        uniforms.time = t;
        [...Object.entries(uniforms)]
            .forEach(([k, v]) => gl[v?.length ? "uniform2fv" : "uniform1f"](uniformLocations[k], v));

        gl.clearColor(...colorMap.background);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        gl.bufferData(gl.ARRAY_BUFFER, transformData, gl.STATIC_DRAW);

        gl.drawArraysInstanced(gl.TRIANGLES, 0, 6, 5059); // 4800 + 256 + 3
    }
    print(x = 0, y = 0, fg = colorMap.text, bg = transparent, alpha = 1, char = 0) {
        const offset = (x + y * 80) * transformStride;
        this.transformData.set([...fg, ...bg, alpha, char], offset + 2);
    }
    move(entity, x = 0, y = 0) {
        this.transformData.set([x, y], (4800 + entity) * transformStride);
    }
    delete(x = 0, y = 0) {
        this.print(x, y, transparent, transparent, 0, 0);
    }
    printf(str = "", x = 0, y = 0, fg, bg, alpha) {
        for (let c = str.length; c--;) {
            this.print(x + c, y, fg, bg, alpha, str.charCodeAt(c));
        }
    }
}

export default async (...x) => {
    vertexShaderSrc = vertexShaderSrc || await loadShader("./hardware/vertex.glsl");
    fragmentShaderSrc = fragmentShaderSrc || await loadShader("./hardware/fragment.glsl");
    return new Screen(...x);
};
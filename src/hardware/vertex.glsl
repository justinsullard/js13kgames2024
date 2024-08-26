#version 300 es
#pragma vscode_glsllint_stage: vert

uniform vec2 warp;

layout(location=0) in vec4 aPosition;
layout(location=1) in vec2 aTexCoord;
layout(location=2) in vec3 aOffset;
layout(location=3) in vec4 aFgColor;
layout(location=4) in vec4 aBgColor;
layout(location=5) in float aAlpha;
layout(location=6) in float aDepth;

out vec2 vT;
out vec4 vF;
out vec4 vB;
out float vA;
out float vD;

void main() {
    vT = aTexCoord;
    vF = aFgColor;
    vB = aBgColor;
    vA = aAlpha;
    vD = aDepth;
    vec4 p = vec4(aPosition.xyz + aOffset, 1.0);
    vec2 shift = vec2(1.0 + (p.y * p.y) * warp.x, 1.0 + (p.x * p.x) * warp.y);
    float len = max(abs(p.x), abs(p.y));
    if (len > 1.0) {
        shift /= len * len;
        vF.a /= len * len * 2.0;
        vB.a = 0.0;
    }
    p.xy /= shift;
    gl_Position = p;
}
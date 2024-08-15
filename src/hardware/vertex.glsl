#version 300 es
#pragma vscode_glsllint_stage: vert

// uniform float time; // 0
uniform vec2 warp; // vec2(1.0 / 51.0, 1.0 / 46.0);
// uniform vec2 mask; // vec2(0.25, 0.9)
// uniform float fxmix; // 0.2
// uniform float brightness; // 0.06
// uniform float contrast; // 0.03
// uniform float saturation; // 0.0

layout(location=0) in vec4 aPosition;
layout(location=1) in vec2 aTexCoord;
layout(location=2) in vec3 aOffset;
layout(location=3) in vec4 aFgColor;
layout(location=4) in vec4 aBgColor;
layout(location=5) in float aAlpha;
layout(location=6) in float aDepth;

out vec2 vTexCoord;
out vec4 vFgColor;
out vec4 vBgColor;
out float vAlpha;
out float vDepth;

void main() {
    vTexCoord = aTexCoord;
    vFgColor = aFgColor;
    vBgColor = aBgColor;
    vAlpha = aAlpha;
    vDepth = aDepth;
    vec4 pos = vec4(aPosition.xyz + aOffset, 1.0);
    vec2 shift = vec2(1.0 + (pos.y * pos.y) * warp.x, 1.0 + (pos.x * pos.x) * warp.y);
    float len = max(abs(pos.x), abs(pos.y));
    if (len > 1.0) {
        shift /= len * len;
        vFgColor.a /= len * len * 2.0;
        vBgColor.a = 0.0;
    }
    pos.xy /= shift;
    gl_Position = pos;
}
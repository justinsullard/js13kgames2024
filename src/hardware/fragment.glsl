#version 300 es
#pragma vscode_glsllint_stage: frag
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

vec2 res = vec2(8.0, 8.0);
const vec3 lum = vec3(0.2126, 0.7152, 0.0722);

out vec4 fc; // fragColor

vec4 M(vec2 p) {
    p.x += p.y * 3.0;
    vec4 m = vec4(mask.x, mask.x, mask.x, 1.0);
    p.x = fract(p.x / 6.0);
    if (p.x < 0.333) m.r = mask.y;
    else if (p.x < 0.666) m.g = mask.y;
    else m.b = mask.y;
    return m;
}

void main() {
    if (vA <= 0.0) discard;
    vec4 tC = texture(uSam, vec3(vT, vD));
    fc = (vF * tC) + (vB * (vec4(1.0) - tC));
    if (fc.a <= 0.0) discard;
    vec4 mask = M(vT * res);
    fc = mix(fc, mask, fxmix);
    fc.rgb = fc.rgb + brightness;
    fc.rgb = 0.5 + (contrast + 1.0) * (fc.rgb - 0.5);
    fc.rgb = mix(vec3(dot(fc.rgb, lum)), fc.rgb, 1.0 + saturation);
    fc.a *= vA;
}
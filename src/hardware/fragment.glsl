#version 300 es
#pragma vscode_glsllint_stage: frag
precision mediump float;

uniform mediump sampler2DArray uSampler;

uniform vec2 mask;
uniform float fxmix;
uniform float brightness;
uniform float contrast;
uniform float saturation;

in vec2 vTexCoord;
in vec4 vFgColor;
in vec4 vBgColor;
in float vAlpha;
in float vDepth;

vec2 res = vec2(8.0, 8.0);
const vec3 luminanceWeighting = vec3(0.2126, 0.7152, 0.0722);

out vec4 fragColor;

vec4 Mask(vec2 pos) {
    pos.x += pos.y * 3.0;
    vec4 masked = vec4(mask.x, mask.x, mask.x, 1.0);
    pos.x = fract(pos.x / 6.0);
    if (pos.x < 0.333) masked.r = mask.y;
    else if (pos.x < 0.666) masked.g = mask.y;
    else masked.b = mask.y;
    return masked;
}

void main() {
    if (vAlpha <= 0.0) discard;
    vec4 texColor = texture(uSampler, vec3(vTexCoord, vDepth));
    fragColor = (vFgColor * texColor) + (vBgColor * (vec4(1.0) - texColor));
    if (fragColor.a <= 0.0) discard;
    vec4 mask = Mask(vTexCoord * res);
    fragColor = mix(fragColor, mask, fxmix);
    fragColor.rgb = fragColor.rgb + brightness;
    fragColor.rgb = 0.5 + (contrast + 1.0) * (fragColor.rgb - 0.5);
    fragColor.rgb = mix(vec3(dot(fragColor.rgb, luminanceWeighting)), fragColor.rgb, 1.0 + saturation);
    fragColor.a *= vAlpha;
}
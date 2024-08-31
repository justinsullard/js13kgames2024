#version 300 es
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
}
import { on, once, emit } from "../hardware/bus.js";
import { theme, colorMap, charfade } from "../hardware/screen.js";
import squirrel from "../util/squirrel.js";
import stripe from "../util/stripe.js";
import { print, printf, text } from "../hardware/screen.js";
import { sin, cos } from "../util/math.js";
import map from "../util/map.js";

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
on("close@title", () => active = false);
on("@hover", (x, y) => hovered = active && x >= 33 && x <= 47 && y == 35);
on("click", () => {
    if (!hovered || !active){ return; }
    emit("@state", "login");
});
export const drawTitle = (dur) => {
    if (!data || !active) { return; }
    const t = dur % pow;
    const d169 = t/169;
    const d125 = sin(t/125);
    const d39 = t/39;
    const d1300 = sin(t/1300);

    const mina = 0.21;
    for (let c = 0; c < 4800; c++) {
        const x = c % 80;
        const y = c / 80 | 0;
        const y59 = y / 59;
        const s = squirrel(
            13,
            x + sin(y + d169) * (1.3 - y59)**3 | 0 ,
            y + d39 | 0,
            d125 | 0
        ) * y59**1.13 + ((cos((x - 40) / (5 - d1300)) - 1) / 13);
        const fg = s > 0.6 ? colorMap.smell : (s > 0.4 ? colorMap.exception : (s >= mina ? colorMap.variable : colorMap.gutter));
        const bg = s > 0.6 ? colorMap.string : (s > 0.4 ? colorMap.variable : (s >= mina ? colorMap.keyword : colorMap.padding));
        print(x, y, fg, [...bg.slice(0, 3), s / 2], s, charfade[(s - mina) / (1 - mina) * 127 | 0]);
    }

    for (let c = w * h; c--;) {
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
                charfade[(color[3] - 3 + sin(d169 + (c/13)**1.3) * 3) / 2 | 0],
            );
        }
    }
    printf("v0.13.dev", 40, 33, colorMap.code);
    text("Click to Begin", 33, 35, hovered ? colorMap.buzz : colorMap.hardware);
};
export default drawTitle;

const acs = (g, ...x) => g.addColorStop(...x);
once("init", ({ image }) => {
    const canvas = new OffscreenCanvas(w, h);
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, w, h);
    // "\x90\x91\x92\x93\x94\x95\x96"
    // stripe(y,i=>i+144)
    stripe(7, l => ctx.drawImage(image,
        0, (144 + l) * 8, 8, 8,
        l * 8, 2, 8, 8))
    let fade;
    ctx.globalCompositeOperation = "source-in";
    fade = ctx.createLinearGradient(0, 0, 56, 0);
    stripe(14, i => {
        acs(fade, (i+0.1)/14, theme.code);
        acs(fade, (i+1)/14, theme.code + "80");
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

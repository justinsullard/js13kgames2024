import sort from "../util/sort.js";
import stripe from "../util/stripe.js";
import euclidean from "../util/euclidean.js";
import merge from "../util/merge.js";
import fizzbuzz from "../util/fizzbuzz.js";
import notes from "../util/notes.js";
import uniq from "../util/uniq.js";
import bus from "./bus.js";
import { colorMap, transparent } from "./screen.js";
import squirrel from "../util/squirrel.js";

const musick = notes();
const fzzbzz = stripe(musick.length, fizzbuzz);
const isFizzBuzz = x => fzzbzz[x] === "fizzbuzz";
const isFizz = x => fzzbzz[x] === "fizz";
const isBuzz = x => fzzbzz[x] === "buzz";

let dj;
let analyzer;
let hovered = false;
let active = false;
let bpm = 250;
let mpb = 60000 / bpm;
let spb = mpb / 1000;

bus.on("@hover", (x, y) => hovered = x === 0 && y === 0);
bus.on("click", () => hovered && (active = !active));

const hire = () => {
    dj = new AudioContext();
    analyzer = dj.createAnalyser();
    analyzer.connect(dj.destination);
    analyzer.fftSize = 128;
    window.removeEventListener("click", hire);
    if (!hovered) { active = true; }
};
window.addEventListener("click", hire);

const scales = uniq(
    stripe(13,
        (a) => [
            ...stripe(13, (b) => sort(merge(euclidean(4, a, 13), euclidean(3, b, 13)))),
            euclidean(7, a, 13)
        ].filter(x => x.length === 7).map(x => x.join(","))
    ).flat()
).map(x => x.split(",").map(x => 1 * x));

const melodies = {
    nevergiveup: {
        octave: 3,
        notes: [
            [0, 10, 1], // give
            [2, 10, 1.5], // you
            [4,  9, 2], // up
            [8,  4, 1], // nev
            [9,  5, 1], // er
            [10, 8, 1], // gon
            [11, 5, 1], // na
            [12, 9, 1], // make
            [14, 9, 1.5], // you
            [16, 8, 2.5], // cry
            [23, 4, 1], // nev
            [24, 5, 1], // er
            [25, 8, 1], // gon
            [26, 5, 1] // na
        ],
    },
    buzzed: {
        octave: 4,
        notes: [
            [0,   0, 2], // fizzbuzz
            [3,   3, 1], // fizz
            [5,   5, 1], // buzz
            [6,   3, 1.5], // fizz
            [9,   3, 1], // fizz
            [10,  5, 2], // buzz
            [12,  3, 1], // fizz
            [15, 15, 2.5], // fizzbuzz
            [18,  3, 1], // fizz
            [20,  5, 1], // buzz
            [21,  3, 2], // fizz
            [24,  3, 1], // fizz
            [25,  5, 2], // buzz
        ],
    },
    codetastrophy: {
        octave: 3,
        notes: sort(
            merge([12], euclidean(13, 0, 27), euclidean(5, 4, 27), euclidean(3, 13, 27))
        ).map((b, i, a) => [b, ((13 - ((i % 3) + (i/2)|0)) | 0), a[i-1] === b - 1 ? 1 : 2]),
    },
};
// console.log({ scales, melodies });

let key = 0;
bus.on("key@speaker", x => key = x % 13);

let scale = scales[17];
bus.on("scale@speaker", x => scale = scales[x] ?? scale);

let melody = melodies.codetastrophy;
bus.on("melody@speaker", x => melody = melodies[x] ?? melody);

const scheduled = new Set();
const tickOfMeasure = (dur) => ((((dur / mpb) % 27) | 0) + 1) % 27;

const drum = (tick, dur) => {
    if (scheduled.has(tick)) { return; }
    scheduled.add(tick);
    const sing =  melody.notes.find(([x]) => x === tick);
    if (!sing) { return; }
    const decay = sing[2] * spb;
    const vol = 0.7;
    const octave = melody.octave + (sing[1] / scale.length | 0);
    const note = key + (octave * 8) + scale[sing[1] % scale.length];
    const freq = musick[note];

    const t = dj.currentTime;
    const offset = Math.max(((27 + tick) - ((dur / mpb) % 27)) % 27 * spb, 0);
    const when = t + offset;

    const osc = dj.createOscillator({ type: "sine" });
    const gain = dj.createGain();
    const comp = dj.createDynamicsCompressor();

    osc.frequency.setValueAtTime(freq, when + 0.001);
    gain.gain.linearRampToValueAtTime(vol, when + 0.1); // 1
    osc.frequency.exponentialRampToValueAtTime(freq * 0.98, when + decay);//0.5
    gain.gain.exponentialRampToValueAtTime(0.01 * vol, when + decay);
    gain.gain.exponentialRampToValueAtTime(0.01, when + decay + 0.1);
    comp.threshold.setValueAtTime(-27, t);
    comp.knee.setValueAtTime(39, when);
    comp.ratio.setValueAtTime(13, when);
    comp.attack.setValueAtTime(0, when);
    comp.release.setValueAtTime(decay, when);

    osc.connect(gain);

    gain.connect(comp);
    comp.connect(analyzer);

    osc.start(when);
    osc.stop(when + decay + 0.1);
};


let lasttick = -1;
const data = new Uint8Array(49);

bus.on("draw@speaker", (dur) => {
    bus.emit("print@screen", 0, 0, hovered ? colorMap.buzz : (active ? colorMap.hardware : colorMap.comment), transparent, 1, 191);
    const tick = tickOfMeasure(dur);
    if (tick !== lasttick) {
        scheduled.delete(lasttick);
        lasttick = tick;
    }
    if (active && analyzer) {
        drum(tick, dur);
        analyzer.getByteTimeDomainData(data);
        [...data].forEach((v, i) => {
            const a = (Math.abs(v - 127) / 128) * 6 | 0;
            bus.emit("print@screen", 1 + i, 0, colorMap.buzz, transparent, 0.25 + (a/8), 216 + a);
        });
    }
});
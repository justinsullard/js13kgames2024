import sort from "../util/sort.js";
import stripe from "../util/stripe.js";
import euclidean from "../util/euclidean.js";
import merge from "../util/merge.js";
import fizzbuzz from "../util/fizzbuzz.js";
import notes from "../util/notes.js";
import uniq from "../util/uniq.js";
import bus from "./bus.js";
import { colorMap, transparent } from "./screen.js";
// import squirrel from "../util/squirrel.js";

const musick = notes();

let dj;
let analyzer;
let reverb;
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

    reverb = dj.createConvolver();
    const rate = dj.sampleRate;
    const decay = 3;
    const length = 3 * rate; // 3 second reverb
    const impulse = dj.createBuffer(2, length, rate);
    const impulseL = impulse.getChannelData(0);
    const impulseR = impulse.getChannelData(1);
    for (let i = 0; i < length; i++) {
        let n = i;
        impulseL[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
        impulseR[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
    }
    reverb.buffer = impulse;
    reverb.connect(analyzer);
    // console.log("impulse", impulse);


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
        scale: 17,
        octave: 3,
        key: 1,
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
        bass: [
            [0, 10, 4],
            [4,  9, 4],
            [8,  4, 4],
            [12, 9, 4],
            [16, 8, 7],
            // [20, 0, 5],
            [23, 4, 4],
        ],
    },
    uphill: {
        scale: 3,
        octave: 3,
        key: 3,
        notes: [ // 1 7 7 7 5  1 7 7 7 4 
            [0, 6, 1],
            [1, 6, 1],
            [2, 6, 1],
            [3, 4, 2],
            
            [7, 0, 1],
            [8, 6, 1],
            [9, 6, 1],
            [10, 6, 1],
            [11, 3, 2],

            [14, 0, 1],
            [15, 6, 1],
            [16, 6, 1],
            [17, 6, 1],
            [18, 2, 2],
            [20, 3, 2],

            [23, 2, 1],
            [24, 3, 1],
            [25, 4, 1],

            [26, 0, 1],
        ],
        bass: [
            [0, 6, 5],
            [3, -3, 5],

            // [7, 6, 1.5],
            [8, 6, 5],
            // [11, 3, 5],
            [11, -4, 5],

            // [14, 0, 1.5],
            [15, 6, 3],
            [18, -5, 2],
            [20, -4, 5],

        ],
    },
    strangers: {
        scale: 24,
        octave: 3,
        key: 3,
        notes: [
            [0,  0, 1],
            [1,  2, 1],
            [2,  3, 1],
            [3,  4, 1],

            [4,  5, 1],
            [5,  4, 1],
            [6,  2, 1],
            [7,  0, 1],

            [8,  0, 1],
            [9,  2, 1],
            [10, 3, 1],
            [11, 4, 1],

            [12, 5, 1],
            [13, 4, 1],
            [14, 2, 1],
            [15, 0, 1],

            [16,  0, 1],
            [17,  2, 1],
            [18,  3, 1],
            [19,  4, 1],

            [20, 5, 1],
            [21, 4, 1],
            [22, 2, 1],
            [23, 0, 1],
        ],
        bass: [
            [0,  0, 4],
            [4,  -3, 4],
            [8,  0, 4],
            [12, -3, 4],
            [16,  0, 4],
            [20, -3, 4],
        ],
    },
    buzzed: {
        scale: 15,
        octave: 2,
        key: 9,
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
        bass: [
            [0,   0, 15],
            [5,   5, 3],
            [10,  5, 3],
            [15, 15, 15],
            [20,  5, 3],
            [25,  5, 3],
        ],
    },
    codetastrophy: {
        scale: 13,
        octave: 2,
        key: 0,
        notes: sort(
            merge([12], euclidean(13, 0, 27), euclidean(5, 4, 27), euclidean(3, 13, 27))
        ).map((b, i, a) => [b, ((13 - ((i % 3) + (i/2)|0)) | 0), a[i-1] === b - 1 ? 1 : 2]),
        bass: [
            [0,  0, 7],
            [6,  7, 7],
            [12, 3, 7],
            [18, 3, 7],
            [26, 7, 1]
        ],
    },
    bizznezz: {
        scale: 4,
        octave: 2,
        key: 7,
        notes: euclidean(9, 0, 27).map((x, i) => [
            [x, 10 - i, 1],
            [x + 1, 9 - i, 1],
            [x + 2, 8 - i, 1]
        ]).flat(),
        bass: euclidean(9, 0, 27).map((x, i) => [x + 2, 8 - i, 2.5]),
    },
    oops: {
        scale: 35,
        octave: 2,
        key: 1,
        notes: euclidean(7, 2, 27).map((x, i) => [
            [x, i * 2 % 3, 1],
            [(x + 1) % 27, i + 4, 1],
            [(x + 2) % 27, i + 3, 1]
        ]).flat(),
        bass: euclidean(5, 1, 27).map((x, i) => [
            [x, i * 2, 2],
            [(x + 2) % 27, i * 2 - 1, 2]
        ]).flat(),
    },
};
console.log({ scales, melodies });

let key = 0;
let melody = melodies.codetastrophy;
let scale = scales[melody.scale];

bus.on("key@speaker", x => key = x % 13);
bus.on("scale@speaker", x => scale = scales[x] ?? scale);
bus.on("melody@speaker", x => {
    melody = melodies[x] ?? melody;
    scale = scales[melody.scale] ?? scale;
    key = melody.key ?? key;
});

const tickOfMeasure = (dur) => ((((dur / mpb) % 27) | 0) + 1) % 27;

const lramp = (x, ...y) => x.linearRampToValueAtTime(...y);
const expramp = (x, ...y) => x.exponentialRampToValueAtTime(...y);
const sval = (x, ...y) => x.setValueAtTime(...y);

 // note, len, vol, verb, attack, deflate
const play = (tick, dur, type = "sine", octave = 1, note = 0, len = 1, vol = 0.5, verb = 0.5, attack = 0.001, deflate = 0.5) => {
    const decay = len * spb;
    const oct = octave + (note < 0 ? -1 : (note / 7) | 0);
    // const oct = octave;
    const freq = musick[key + (oct * 13) + scale[(note + 7) % 7]];
    // console.log({ tick, note, octave, oct, n: (note + 7) % 7, sick: key + (oct * 13) + scale[(note + 7) % 7], freq });

    const t = dj.currentTime;
    const offset = Math.max(((27 + tick) - ((dur / mpb) % 27)) % 27 * spb, 0);
    const when = t + offset;

    const osc = dj.createOscillator({ type });
    const gain = dj.createGain();
    const comp = dj.createDynamicsCompressor();
    const verbage = dj.createGain();
    const split = dj.createChannelSplitter(2);
    const over = when + decay + 0.1;

    sval(osc.frequency, freq, when);
    sval(osc.frequency, freq, when + attack);
    expramp(osc.frequency, freq * deflate, when + decay);

    sval(gain.gain, 0.01, t);
    lramp(gain.gain, vol * 0.5, when);
    expramp(gain.gain, vol, when + attack);
    expramp(gain.gain, 0.01, over);

    sval(comp.threshold, -27, t);
    sval(comp.knee, 39, when);
    sval(comp.ratio, 13, when);
    sval(comp.attack, 0, when);
    sval(comp.release, Math.min(decay, 1), when);


    lramp(verbage.gain, vol * verb, when + 0.1);
    lramp(verbage.gain, 0.01, when + decay);

    osc.connect(gain);
    gain.connect(comp);
    comp.connect(split);
    split.connect(analyzer, 0, 0);
    split.connect(verbage, 1, 0);
    verbage.connect(reverb);

    osc.start(when);
    osc.stop(over);
    setTimeout(() => {
        osc.disconnect();
        gain.disconnect();
        comp.disconnect();
        split.disconnect();
        verbage.disconnect();
    }, (over - t + 1) * 1000)
};

const bass = (tick, dur) => {
    const sing =  melody.bass.find(([x]) => x === tick);
    if (!sing) { return; }
     // tick, dur, type, octave, note,    len,      vol, verb, attack, deflate
    play(tick, dur, "square", 1, sing[1], sing[2],  0.5, 0.7, 0.01, 0.98);
};

const drum = (tick, dur) => {
    const sing =  melody.notes.find(([x]) => x === tick);
    if (!sing) { return; }
     // tick, dur, type,     octave,        note,    len,         vol, verb, attack, deflate
     play(tick, dur, "sawtooth", melody.octave, sing[1], sing[2], 0.7, 0.8, 0.005, 0.98);
};


let lasttick = -1;
const scheduled = new Set();
const data = new Uint8Array(79);

bus.on("draw@speaker", (dur) => {
    bus.emit("print@screen", 0, 0, hovered ? colorMap.buzz : (active ? colorMap.hardware : colorMap.comment), transparent, 1, 191);
    const tick = tickOfMeasure(dur);
    if (tick !== lasttick) {
        scheduled.delete(lasttick);
        lasttick = tick;
    }
    if (active && analyzer) {
        if (!scheduled.has(tick)) {
            scheduled.add(tick);
            drum(tick, dur);
            bass(tick, dur);
        }
        analyzer.getByteTimeDomainData(data);
        [...data].forEach((v, i) => {
            const a = (Math.abs(v - 127) / 128) * 6 | 0;
            // const a = (Math.abs(v - 127) / 128)**1.05 * 6 | 0;
            bus.emit("print@screen", 1 + i, 0, colorMap.buzz, transparent, 0.25 + (a/8), 216 + a);
        });
    }
});
import each from "../util/each.js";
import { on, emit } from "./bus.js";

const synth = window.speechSynthesis;
export const speak = (message = "Hello world!") => new Promise((resolve, reject) => {
    if (synth) {
        const voice = new SpeechSynthesisUtterance(message);
        voice.lang = "en-US";
        // voice.pitch = 0;
        // voice.rate = 0.75;
        voice.onerror = () => {
            emit("error@say", message);
            reject();
        };
        voice.onend = () => {
            emit("end@say", message);
            resolve();
        };
        // each([
        //     // "boundary",
        //     "end",
        //     "error",
        //     // "mark",
        //     // "pause",
        //     // "resume",
        //     // "start"
        // ], ev => {
        //     voice[`on${ev}`] = (...x) => emit(`${ev}@say`, message);
        // });
        synth.speak(voice);
    } else {
        emit("end@say", message);
        resolve();
    }
});
export default speak;
// if (synth && voices) {
//     on("@say", (message = "Hello world!") => {
//         const voice = new SpeechSynthesisUtterance(message);
//         voice.lang = "en-US";
//         voice.pitch = 0;
//         // voice.rate = 0.75;
//         each([
//             // "boundary",
//             "end",
//             "error",
//             // "mark",
//             // "pause",
//             // "resume",
//             // "start"
//         ], ev => {
//             voice[`on${ev}`] = (...x) => emit(`${ev}@say`, message);
//         });
//         synth.speak(voice);
//     });
//     on("error@say", console.error);
// } else {
//     on("@say", (x) => emit("end@say", x));
// }
on("@say", speak);
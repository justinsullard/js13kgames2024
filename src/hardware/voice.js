import { on, emit } from "./bus.js";

const synth = window.speechSynthesis;
let voices = synth?.getVoices();
if (synth && voices) {
    on("@say", (message = "Hello world!") => {
        const voice = new SpeechSynthesisUtterance(message);
        voice.lang = "en-US";
        voice.pitch = 0;
        // voice.rate = 0.75;
        [
            "boundary",
            "end",
            "error",
            "mark",
            "pause",
            "resume",
            "start"
        ].forEach(ev => {
            voice[`on${ev}`] = (...x) => emit(`${ev}@say`, message);
        });
        synth.speak(voice);
    });
    on("error@say", console.error);
} else {
    on("@say", (x) => emit("end@say", x));
}
import bus from "./bus.js";

const synth = window.speechSynthesis;
let voices = synth?.getVoices();
// console.log(voices);
if (synth && voices) {
    bus.on("@say", (message = "Hello world!") => {
        const voice = new SpeechSynthesisUtterance(message);
        voice.lang = "en-US";
        voice.pitch = 0;
        voice.rate = 0.75;
        [
            "boundary",
            "end",
            "error",
            "mark",
            "pause",
            "resume",
            "start"
        ].forEach(ev => {
            voice[`on${ev}`] = (...x) => bus.emit(`${ev}@say`, message);
        });
        synth.speak(voice);
    });
    bus.on("error@say", console.error);
} else {
    bus.on("@say", (x) => bus.emit("end@say", x));
}
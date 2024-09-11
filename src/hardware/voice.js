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
        synth.speak(voice);
    } else {
        emit("end@say", message);
        resolve();
    }
});
export default speak;
on("@say", speak);
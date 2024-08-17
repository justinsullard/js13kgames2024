import bus from "./bus.js";

const synth = window.speechSynthesis;
let voices = synth?.getVoices();
console.log(voices);
if (synth && voices) {
    bus.on("@say", (message = "Hello world!") => {
        const voice = new SpeechSynthesisUtterance(message);
        voice.pitch = 0;
        voice.rate = 0.75;
        synth.speak(voice);
    });
    bus.on("login@voice", () => {
        [
            "Welcome to code-tastrophy!",
            "Input your desired username, then press Enter",
            "Ha. Ha. Ha. No. You're now noobie 416839",
            "Create your new password, then press Enter.",
            "Invalid. Must contain 1 haiku. Please try again.",
            "Invalid. Are you even trying? Let's do this again.",
            "Invalid. Far too easy to guess. You should just press Enter now and let me do it.",
            "New password successfully set to: 'redacted for security reasons'.",
            "Congratulations, and welcome to the dumpster fire!",
            "Now, get to work, slacker."
        ].forEach(x => bus.emit("@say", x))    
    });
}
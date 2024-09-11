import { emit, on, once} from "../hardware/bus.js";
import speak from "../hardware/voice.js";
import drawKeyControls from "../plugins/keycontrols.js";
import { open, save } from "../util/storage.js";
import { drawConsole, inputConsole, logConsole } from "./console.js";

const user = open("user") ?? {
    username: null,
    desired: null,
    password: null,
    invalidations: [],
    achievements: [],
    readme: ["# Codetastrophy"],
    preferences: {},
};
const update = (k, v) => {
    if (Array.isArray(user[k])) {
        user[k].push(v);
    } else if (k) {
        user[k] = v;
    }
    save("user", user);
    emit("update@user", user);
}
on("achievement@user", (x) => update("achievements", x));
once("init", update);

const reasons = [
    ["Triskaidekaphobia!", x => (x.length === 13 || x.toLowerCase() === "thirteen" || x.includes("13")), "What, do you have triskaidekaphobia?"],
    ["Too few lowercase letters.", x => !x.match(/[a-z]/), "Too many lowercase letters."],
    ["Too few capital letters.", x => !x.match(/[A-Z]/), "Too many capital letters."],
    ["Too few letters.", x => !x.match(/[a-z]/i), "Too many letters."],
    ["Too few numbers.", x => !x.match(/\d/), "Too many numbers"],
    ["Too few special characters.", x => !x.match(/\W+/), "Too many special characters."],
    ["Too many lowercase letters.", x => x.match(/[a-z]/), "Too few lowercase letters."],
    ["Too many capital letters.", x => x.match(/[A-Z]/), "Too few capital letters."],
    ["Too many letters.", x => x.match(/[a-z]/i), "Too few letters."],
    ["Too many numbers.", x => x.match(/\d/), "Too few numbers"],
    ["Too many special characters.", x => x.match(/\W+/), "Too few special characters."],
    ["Too easy to guess.", x => x.length < 16, "Too hard to guess."],
    ["Too hard to guess.", x => x.length > 8, "Too easy to guess."],
    ["Too long.", x => x.length > 13, "Too short."],
    ["Too short.", x => x.length < 13, "Too long."],
    ["Too many mistakes.", x => x],
    ["Too few haikus.", x => x],
    ["Are you even trying?", x => x],
    ["You might want to give up.", x => x, "Just keep trying."]
]

const validate = (x = "") => reasons.find((r, i) => r[1](x) && !user.invalidations.includes(i));

const loginQueue = [];

let current = null;
const step = () => {
    const [utterance, show] = loginQueue.shift() ?? [];
    if (typeof utterance === "string") {
        current = utterance;
        speak(utterance).then(step);
        logConsole(show ?? utterance);
    } else if (utterance) {
        utterance();
    } else {
        current = null;
    }
};
// on("end@say", m => m === current && step());
let attempts = 0;
const passwordPrompt = () => {
    loginQueue.push([() => inputConsole("password", 32, 0, true)]);
    once("@output", x => {
        let reason = validate(x);
        const i = reasons.indexOf(reason);
        if ((!x || !reason) && attempts >= 2) {
            if (user.invalidations.length === reasons.length) {
                emit("achievement@user", "samuraiocertificate");
            }
            update("password", "true");
            emit("melody@speaker", "hi");
            loginQueue.push(
                ["New password successfully set to:"],
                ["redacted for security reasons", "*************"],
                ["Congratulations, and welcome to the dumpster fire!"],
                ["Now, get to work, slacker."],
                [() => emit("@state", "mainmenu")]
            );
        } else {
            attempts++;
            if (reason && !user.invalidations.includes(i)) {
                emit("melody@speaker", "oops");
                update("invalidations", i);
            }
            if (!reason) {
                reason = reasons.find((r, i) => !user.invalidations.includes(i))?.slice(2);
            }
            loginQueue.push(
                [reason?.[0] ?? "Something went wrong."],
                [attempts >= 2 ? "Try again, or press Enter and I'll just do it for you." : "Try again."],
                [passwordPrompt]
            );
        }
        step();
    });
    step();
};

on("open@login", () => {
    emit("melody@speaker", "hi");
    // enableKeyControls();
    logConsole(`½ codetastrophy`);
    loginQueue.push(["Welcome to code-tastrophy", "Welcome to codetastrophy!"]);
    if (user.username) {
        update("tail", user.username.split("b13").pop());
        loginQueue.push(
            ["Oh, great. You again."],
            [`I'm still not calling you ${user.desired}.`],
            [`You're forever noobie ${user.tail.split("").join(", ")}.`, `You're forever ${user.username}.`]
        );
        if (!user.password || !user.achievements.includes("samuraiocertificate")) {
            // If they don't have the achievement yet prompt them for a password again
            loginQueue.push(
                ["Your password has expired."],
                ["Create a new one, then press Enter."],
                [passwordPrompt]
            );
        } else {
            loginQueue.push(
                ["Welcome back to the dumpster fire!"],
                [() => emit("@state", "mainmenu")]
            );

        }
    } else {
        loginQueue.push(
            ["Input your desired username, then press Enter."],
            [() => inputConsole("username", 32, 2)]
        );
        once("@output", x => {
            const tail = Date.now().toString(16).slice(-6);
            user.desired = x;
            update("username", "n00b13" + tail);
            loginQueue.push(
                ["Ha ha."],
                ["Ha ha ha."],
                ["No."],
                [`You're now noobie ${tail.split("").join(", ")}.`, `You're now ${user.username}.`],
                ["Create your new password, then press Enter."],
                [passwordPrompt]
            );
            step();
        });
    }
    step();
});
on("close@login", () => {
    current = null;
    loginQueue.splice(0, loginQueue.length);
    // disableKeyControls();
});
export const drawLogin = (dur) => {
    drawConsole(dur);
    drawKeyControls(dur);
};
export default drawLogin;

import bus from "../hardware/bus.js";
import { open } from "../util/storage.js";
import stripe from "../util/stripe.js";

const user = open ?? {
    username: null,
    desired: null,
    password: null,
    achievements: [],
    readme: [ "# Codetastrophy"],
    preferences: {},
};

const reasons = [
    ["Triskaidekaphobia!", x => x.length === 13 || x.toLowerCase() === "thirteen" || x.includes(13)]
    ["Too few lowercase letters.", x => !x.match(/[a-z]/)],
    ["Too few capital letters.", x => !x.match(/[A-Z]/)],
    ["Too few letters.", x => !x.match(/[a-z]/i)],
    ["Too few numbers.", x => !x.match(/\d/)],
    ["Too few special characters.", x => !x.match(/\W+/)],
    ["Too many lowercase letters.", x => x.match(/[a-z]/)],
    ["Too many capital letters.", x => x.match(/[A-Z]/)],
    ["Too many letters.", x => x.match(/[a-z]/i)],
    ["Too many numbers.", x => x.match(/\d/)],
    ["Too many special characters.", x => x.match(/\W+/)],
    ["Too easy to guess.", x => x.length < 16],
    ["Too hard to guess.", x => x.length > 8],
    ["Too long.", x => x.length > 13],
    ["Too short.", x => x.length < 13],
    ["Too many mistakes.", x => x],
    ["Too few haikus.", x => x],
    ["Are you even trying?", x => x],
];

const validate = (x = "") => {
    let reason;
    return reason;
};

const queue = [];

let current = null;
const step = () => {
    const [say, show] = queue.shift() ?? [];
    if (typeof say === "string") {
        current = say;
        bus.emit("@say", say);
        bus.emit("log@console", show ?? say);
    } else if (say) {
        say();
    } else {
        current = null;
    }
};
bus.on("end@say", m => m === current && step());

bus.on("open@login", () => {
    bus.emit("melody@speaker", "hi");
    bus.emit("enable@keyboard");
    // bus.emit("log@console", `½ ${stripe(7, i => String.fromCharCode(i+144)).join("")}`);
    bus.emit("log@console", `½ codetastrophy`);
    queue.push(["Welcome to code-tastrophy", "Welcome to codetastrophy!"]);
    if (user.username) {
        queue.push(["Oh, great."], ["You again."]);
    } else {
        queue.push(["Input your desired username, then press Enter."]);
        queue.push([() => {
            bus.emit("input@console", "username");
        }]);
    }
    // Check if we have a username
    // Check if we have a password
    step();
});
bus.on("close@login", () => {

});

bus.on("draw@login", (dur) => {
    bus.emit("draw@console", dur);
    bus.emit("draw@keycontrols", dur);
});

bus.on("login@voice", () => {
    [
        "Welcome to code-tastrophy!",
        "Input your desired username, then press Enter",
        "Ha. Ha. Ha. No. You're now noobie a, 3, f, 7, 8, c.",
        "Create your new password, then press Enter.",
        "Invalid. Must contain 1 haiku. Please try again.",
        "Invalid. Are you even trying? Let's do this again.",
        "Invalid. Far too easy to guess. You should just press Enter now and let me do it.",
        "New password successfully set to: 'redacted for security reasons'.",
        "Congratulations, and welcome to the dumpster fire!",
        "Now, get to work, slacker."
    ].forEach(x => bus.emit("@say", x));
});

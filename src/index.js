import bus from "./hardware/bus.js";
import loadFont from "./font/image.js";

import "./hardware/cursor.js";
import "./hardware/keyboard.js";
import "./hardware/mouse.js";
import "./hardware/screen.js";
import "./hardware/speaker.js";
import "./hardware/voice.js";
// import "./hardware/wakelock.js";
import "./grid/achievements.js";
import "./grid/title.js";
import "./grid/login.js";
import "./grid/mainmenu.js";
import "./grid/console.js";
import "./grid/loc.js";
import "./plugins/keycontrols.js";
import "./plugins/informant.js";
import "./plugins/welcomemat.js";
import listen from "./util/listen.js";

document.addEventListener("visibilitychange", (...x) => {
    bus.emit("visibility", document.hidden);
});
listen("blur", () => bus.emit("visibility", false));
listen("focus", () => bus.emit("visibility", true));

// Maybe put this in to be cheaky about the devtools
// const devtools = function () {};
// devtools.toString = () => {
//   devtools.opened = true;
//   const message = "What, are you trying to cheat or something?";
//   setTimeout(() => {
//       bus.emit("log@console", message);
//       bus.emit("@say", message);
//   }, 1000);
//   return message;
// }
// console.log("DevTools: %s", devtools);

const $ = x => document.getElementById(x);

let paused = false;
bus.on("pause", () => paused = true);
bus.on("play", () => paused = false);

let state = "init";
bus.on("@state", grid => {
    bus.emit(`close@${state}`);
    state = grid;
    bus.emit("clear@screen");
    bus.emit(`open@${state}`);
});
bus.once("init", () => bus.emit("@state", "title"));

const main = async () => {

    const image = await loadFont();
    bus.emit("init", { image, $pointy: $("pointy"), $screen: $("screen") });

    let now = 0;
    let frame = 0;
    let dur = 0;

    const render = (t = 0) => {
        const d = t - now;
        if (!paused) {
            dur += d;
        }
        now = t;
        
        // Move the mouse
        bus.emit("move@mouse", dur);

        if (!paused) {
            bus.emit(`draw@${state}`, dur);
        }

        bus.emit("draw@speaker", dur);

        // Draw the screen
        bus.emit("draw@screen", dur);

        frame++;
        requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
};

main().catch(console.error);

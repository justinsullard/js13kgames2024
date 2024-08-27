import { on, emit, once } from "./hardware/bus.js";
import loadFont from "./font/image.js";
import listen from "./util/listen.js";

import "./hardware/cursor.js";
import "./hardware/keyboard.js";
import "./hardware/mouse.js";
import "./hardware/screen.js";
import "./hardware/speaker.js";
import "./hardware/voice.js";
// import "./hardware/wakelock.js";
import "./grid/achievements.js";
import "./grid/audio.js";
import "./grid/backlog.js";
import "./grid/billing.js";
import "./grid/browniepoints.js";
import "./grid/buzz.js";
import "./grid/clipboard.js";
import "./grid/console.js";
import "./grid/disks.js";
import "./grid/endscreen.js";
import "./grid/errors.js";
import "./grid/file.js";
import "./grid/gutter.js";
import "./grid/loc.js";
import "./grid/login.js";
import "./grid/mainmenu.js";
import "./grid/marketplace.js";
import "./grid/memory.js";
import "./grid/minimap.js";
import "./grid/network.js";
import "./grid/purchase.js";
import "./grid/purchaseconfirmation.js";
import "./grid/readme.js";
import "./grid/repoachievements.js";
import "./grid/repomenu.js";
import "./grid/reporeadme.js";
import "./grid/title.js";
import "./grid/warnings.js";
import "./plugins/keycontrols.js";
import "./plugins/informant.js";
import "./plugins/welcomemat.js";

document.addEventListener("visibilitychange", (...x) => {
    emit("visibility", document.hidden);
});
listen("blur", () => emit("visibility", false));
listen("focus", () => emit("visibility", true));

// Maybe put this in to be cheaky about the devtools
// const devtools = function () {};
// devtools.toString = () => {
//   devtools.opened = true;
//   const message = "What, are you trying to cheat or something?";
//   setTimeout(() => {
//       emit("log@console", message);
//       emit("@say", message);
//   }, 1000);
//   return message;
// }
// console.log("DevTools: %s", devtools);

const $ = x => document.getElementById(x);

let paused = false;
on("pause", () => paused = true);
on("play", () => paused = false);

let state = "init";
on("@state", grid => {
    emit(`close@${state}`);
    state = grid;
    emit("clear@screen");
    emit(`open@${state}`);
});
once("init", () => emit("@state", "title"));

const main = async () => {

    const image = await loadFont();
    emit("init", { image, $pointy: $("pointy"), $screen: $("screen") });

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
        emit("move@mouse", dur);

        if (!paused) {
            emit(`draw@${state}`, dur);
        }

        emit("draw@speaker", dur);

        // Draw the screen
        emit("draw@screen", dur);

        frame++;
        requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
};

main().catch(console.error);

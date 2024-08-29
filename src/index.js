import { on, emit, once } from "./hardware/bus.js";
import loadFont from "./font/image.js";

import "./hardware/cursor.js";
import "./hardware/keyboard.js";
import "./hardware/mouse.js";
import "./hardware/screen.js";
import { clear, draw } from "./hardware/screen.js";
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
import "./grid/dumpsterfire.js";
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
import drawSpeaker from "./hardware/speaker.js";
import drawTitle from "./grid/title.js";
import drawMainMenu from "./grid/mainmenu.js";
import drawLogin from "./grid/login.js";
import { clearKeys } from "./plugins/keycontrols.js";

// Maybe put this in to be cheaky about the devtools
// const devtools = function () {};
// devtools.toString = () => {
//   devtools.opened = true;
//   const message = "What, are you trying to cheat or something?";
//   setTimeout(() => {
//       logConsole(message);
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
const states = {
    init: () => {},
    title: drawTitle,
    mainmenu: drawMainMenu,
    login: drawLogin,
};
on("@state", grid => {
    emit(`close@${state}`);
    state = grid;
    clear();
    clearKeys();
    emit(`open@${state}`);
});
once("init", () => emit("@state", "title"));

const main = async () => {
    const image = await loadFont();
    emit("init", { image, $pointy: $("pointy"), $screen: $("screen") });

    let now = 0;
    let frame = 0;
    let dur = 0;
    const r = () => requestAnimationFrame(render);
    const render = (t = 0) => {
        const d = t - now;
        if (!paused) {
            dur += d;
        }
        now = t;
        
        // Move the mouse
        emit("move@mouse", dur);

        if (!paused) {
            states[state](dur);
            // emit(`draw@${state}`, dur);
        }

        drawSpeaker(dur);

        // Draw the screen
        draw(dur);

        frame++;
        r();
    };
    r();
};

main().catch(console.error);

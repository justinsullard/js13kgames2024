import bus from "./hardware/bus.js";
import loadFont from "./font/image.js";

import "./hardware/mouse.js";
import "./hardware/screen.js";
import "./hardware/speaker.js";
import "./hardware/voice.js";
import "./grid/title.js";

const $ = x => document.getElementById(x);

let paused = false;
bus.on("pause", () => paused = true);
bus.on("play", () => paused = false);

let state = "init";
bus.on("@state", grid => {
    bus.emit(`close@${state}`);
    state = grid;
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

import Screen, { theme, colorMap, colors, colorCount, colorNames } from "./hardware/screen.js";
import loadFont from "./font/image.js";
import stripe from "./util/stripe.js";
import { loadPointy, pointer } from "./hardware/mouse.js";

const $ = x => document.getElementById(x);

const main = async () => {
    const image = await loadFont();
    const $screen = $("screen");
    const $pointy = $("pointy");
    await loadPointy($pointy, image);
    $screen.style.boxShadow = `${theme.background} 0px 0px 2px 3px`;
    const screen = await Screen($screen, image);

    // Just some dummy stuff to test the rendering for the moment
    const logo = stripe(7, x=>String.fromCharCode(144+x)).join("");
    for (let i = 60; i--;) {
        screen.printf("codetastrophy " + colorNames[i % colorCount], 0, i, colors[i % colorCount]);
        screen.printf(logo, i, i, colorMap.code);    
    }


    let now = 0;
    let frame = 0;
    let dur = 0;
    const render = (t = 0) => {
        const d = t - now;
        dur += d;
        now = t;

        // Move the mouse
        const { clientWidth, clientHeight, offsetLeft, offsetTop } = $screen;
        const dx = clientWidth / 640;
        const dy = clientHeight / 480;
        screen.move(258,
            (pointer[0] - offsetLeft) * 2 / clientWidth,
            (pointer[1] - offsetTop) * -2 / clientHeight
        );
        $pointy.style.left = pointer[0] + "px";
        $pointy.style.top = pointer[1] + "px";
        $pointy.style.width = (dx * 8).toFixed(2) + "px";
        $pointy.style.height = (dy * 8).toFixed(2) + "px";
        $pointy.style.transform = `scale2d(${[1 / dx, 1 / dy].map(x => x.toFixed(3)).join(",")})`;

        screen.draw(dur);
        frame++;
        requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
};

main().catch(console.error);

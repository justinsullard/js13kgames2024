import { theme } from "./screen.js";
import bus from "./bus.js";

const pointer = [-16, -16];
const keys = {};
bus.on("keydown", e => console.log("keydown", e));
bus.on("keypress", e => console.log("keypress", e));
bus.on("keyup", e => console.log("keyup", e));

bus.once("init", ({ $screen, $pointy, image }) => {
    $pointy.width = 16;
    $pointy.height = 16;
    const pointy = $pointy.getContext("2d");
    pointy.imageSmoothingEnabled = false;
    pointy.fillStyle = theme.buzz;
    pointy.fillRect(0, 0, 16, 16);
    pointy.globalCompositeOperation = "destination-atop";
    pointy.drawImage(image, 0, 232 * 8, 8, 8, 0, 0, 16, 16);
    $pointy.style.display = "block";
    "mousemove,click,mousedown,mouseup".split(",")
        .forEach(x => window.addEventListener(x, (e) => bus.emit(x, e)));

    const move = () => {
        const { clientWidth, clientHeight, offsetLeft, offsetTop } = $screen;
        const dx = clientWidth / 640;
        const dy = clientHeight / 480;
        const uvx = (pointer[0] - offsetLeft) / clientWidth;
        const uvy = (pointer[1] - offsetTop) / clientHeight;
        const cx = uvx * 80 | 0;
        const cy = uvy * 60 | 0;
        $pointy.style.left = pointer[0] + "px";
        $pointy.style.top = pointer[1] + "px";
        $pointy.style.width = (dx * 8).toFixed(2) + "px";
        $pointy.style.height = (dy * 8).toFixed(2) + "px";
        $pointy.style.transform = `scale2d(${[1 / dx, 1 / dy].map(x => x.toFixed(3)).join(",")})`;
        bus.emit("move@screen", 258, uvx * 2, uvy * -2);
        bus.emit("@hover", cx, cy);
    };
    bus.on("move@mouse", move);
});
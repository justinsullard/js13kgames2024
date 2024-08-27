import { theme, move } from "./screen.js";
import { on, once, emit} from "./bus.js";

const pointer = [-16, -16];
let cx = -1;
let cy = -1;
on("mousemove", e => [pointer[0], pointer[1]] = [e.clientX, e.clientY]);

once("init", ({ $screen, $pointy, image }) => {
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
        .forEach(x => window.addEventListener(x, (e) => emit(x, e, cx, cy)));

    const mousemove = () => {
        const { clientWidth, clientHeight, offsetLeft, offsetTop } = $screen;
        const dx = clientWidth / 640;
        const dy = clientHeight / 480;
        const uvx = (pointer[0] - offsetLeft) / clientWidth;
        const uvy = (pointer[1] - offsetTop) / clientHeight;
        cx = uvx * 80 | 0;
        cy = uvy * 60 | 0;
        $pointy.style.left = pointer[0] + "px";
        $pointy.style.top = pointer[1] + "px";
        $pointy.style.width = (dx * 8).toFixed(2) + "px";
        $pointy.style.height = (dy * 8).toFixed(2) + "px";
        $pointy.style.transform = `scale2d(${[1 / dx, 1 / dy].map(x => x.toFixed(3)).join(",")})`;
        move(258, uvx * 2, uvy * -2);
        emit("@hover", cx, cy);
    };
    on("move@mouse", mousemove);
});
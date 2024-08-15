import { theme } from "./screen.js";

export const pointer = [-16, -16];

export const loadPointy = async ($pointy, image) => {
    $pointy.width = 16;
    $pointy.height = 16;
    const pointy = $pointy.getContext("2d");
    pointy.imageSmoothingEnabled = false;
    pointy.fillStyle = theme.buzz;
    pointy.fillRect(0, 0, 16, 16);
    pointy.globalCompositeOperation = "destination-atop";
    pointy.drawImage(image, 0, 232 * 8, 8, 8, 0, 0, 16, 16);
    $pointy.style.display = "block";
    window.addEventListener(
        'mousemove',
        (e) => [pointer[0], pointer[1]] = [e.clientX, e.clientY]
    );    
};
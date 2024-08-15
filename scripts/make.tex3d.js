const { createWriteStream } = require("fs");
const { createCanvas, loadImage } = require("canvas");

const save = canvas => new Promise((resolve, reject) => {
  const out = createWriteStream("../src/font/codetastrophy.tex3d.png");
  out.on("finish", resolve);
  out.on("error", reject);
  canvas.createPNGStream().pipe(out);
});

const doit = async () => {
    const canvas = createCanvas(8, 2048);
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, 8, 2048);
    const image = await loadImage("../src/font/codetastrophy.mono.png");
    for (let i = 0; i < 256; i++) {
    const x = i % 16;
    const y = (i / 16) | 0;
    ctx.drawImage(image, x*8, y*8, 8, 8, 0, i*8, 8, 8);
    }
    await save(canvas);
};

doit().catch(console.error);
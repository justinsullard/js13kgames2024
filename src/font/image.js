import listen from "../util/listen";
export default () => new Promise(resolve => {
    const image = new Image();
    image.src = "./font/codetastrophy.tex3d.png";
    listen('load', () => resolve(image), image);
});

export const loadFont = () => new Promise(resolve => {
    const image = new Image();
    image.src = "./font/codetastrophy.tex3d.png";
    image.addEventListener('load', () => resolve(image));
});
export default loadFont;

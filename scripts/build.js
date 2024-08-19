// import { rollup } from "rollup";
import fs from "fs-extra";
import { join } from "path";
import { URL } from 'node:url';

const __dirname = new URL('.', import.meta.url).pathname;

const fpath = (x) => join(__dirname, x);

export const build = async () => {
    console.log("build running from", __dirname)
    // clear the build folder
    await fs.emptyDir("../build/");
    // create staging folder in build folder
    // copy everything from src that matters (.js, .glsl, .css, .html)
    await fs.copy(fpath("../src/"), fpath("../build/staging/"), {
        filter: (x) => !x.includes("font/") || x.includes("tex3d")
    });

    const screenpath = fpath("../build/staging/hardware/screen.js");
    const screensrc = await fs.readFile(screenpath, "utf-8");
    const vertexsrc = await fs.readFile(fpath("../build/staging/hardware/vertex.glsl"), "utf-8");
    const fragmentsrc = await fs.readFile(fpath("../build/staging/hardware/fragment.glsl"), "utf-8");
    await fs.writeFile(screenpath, screensrc
        .replace(/vertexShaderSrc = vertexShaderSrc.+/, "")
        .replace(/fragmentShaderSrc = fragmentShaderSrc.+/, "")
        .replace(/vertexShaderSrc;/, `vertexShaderSrc = \`${vertexsrc}\`;`)
        .replace(/fragmentShaderSrc;/, `fragmentShaderSrc = \`${fragmentsrc}\`;`)
    );

// inline glsl for shaders


// extract lexicon
// perform lexicon replacements

// flatten and treeshake with rollup

// minifications
// attempt uglify
// attempt roadroller
// attempt custom
// attempt custom > roadroller
// attempt uglify > roadroller
// attempt uglify > custom
// ?


// build zip files based on minifications
// choose the winner

};
export default build;
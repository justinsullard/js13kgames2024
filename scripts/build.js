import { URL } from 'node:url';
import { join } from "path";
import { PassThrough } from 'node:stream';

import { rollup } from "rollup";
import fs from "fs-extra";
import { minify } from "uglify-js";
import { Packer } from "roadroller";
import yazl from "yazl";

const __dirname = new URL('.', import.meta.url).pathname;

const fpath = (x) => join(__dirname, x);

const jamstart = 1723546800000;
const jamend = 1726225200000;
const zipmax = 13312;

const roadrollerit = async (data) => {
    const inputs = [{ data, type: 'js', action: 'eval'}];
    const packer = new Packer([{ data, type: 'js', action: 'eval'}], {});
    await packer.optimize();
    const { firstLine, secondLine } = packer.makeDecoder();
    return firstLine + secondLine;
}

let busy = false;
let queue = false;
export const build = async () => {
    if (Date.now() >= jamend) {
        console.error("It's too late, the jam is over");
    }
    if (busy) {
        queue = true;
        console.error("Dude, you're saving stuff too quick. I'll queue this one.");
        return false;
    }
    busy = true;
    const timestamp = Date.now() - jamstart;
    const version = new Date(timestamp).toISOString().split("-").pop().replace(/\D+/g, "");
    const timer = "Build Time";
    console.time(timer);
    console.log(`building v0.13.${version}`);
    // clear the build folder
    await fs.emptyDir("../build/");
    // create staging folder in build folder
    // copy everything from src that matters (.js, .glsl, .css, .html)
    await fs.copy(fpath("../src/"), fpath("../build/staging/"), {
        filter: (x) => !x.includes("font/") || x.includes("image.js")
    });
    await fs.copy(fpath("../src/font/codetastrophy.tex3d.png"), fpath("../build/13.png"));
    
    // Adjust version number
    const titlepath = fpath("../build/staging/grid/title.js");
    const titlesrc = await fs.readFile(titlepath, "utf-8");
    await fs.writeFile(titlepath, titlesrc.replace("v0.13.dev", `v0.13.${version}`));

    const packagepath = fpath("../package.json");
    const packagesrc = await fs.readFile(packagepath, "utf-8");
    const newpackage = packagesrc.replace(/"0\.13\.\d+"/, `"0.13.${version}"`);
    await fs.writeFile(packagepath, newpackage, "utf-8");

    // Adjust png path
    const imagejspath = fpath("../build/staging/font/image.js");
    const imagejssrc = await fs.readFile(imagejspath, "utf-8");
    await fs.writeFile(imagejspath, imagejssrc.replace("./font/codetastrophy.tex3d.png", "./13.png"));
    // inline glsl for shaders
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

    // extract lexicon
    // perform lexicon replacements

    // flatten and treeshake with rollup
	let bundle;
	let buildFailed = false;
    let rolledup;
	try {
		// create a bundle
		bundle = await rollup({
            // input options
            // // core input options
            // external,
            input: fpath("../build/staging/index.js"), // conditionally required
            // plugins,

            // // advanced input options
            // cache,
            // logLevel,
            // makeAbsoluteExternalsRelative,
            // maxParallelFileOps,
            // onLog,
            // onwarn,
            // preserveEntrySignatures,
            // strictDeprecations,

            // // danger zone
            // context,
            // moduleContext,
            // preserveSymlinks,
            // shimMissingExports,
            treeshake: true,

            // // experimental
            // experimentalCacheExpiry,
            // experimentalLogSideEffects,
            // perf
        });
        const { output } = await bundle.generate({
            // output options
            // // core output options
            // dir,
            // file,
            // format,
            // globals,
            // name,
            // plugins,

            // // advanced output options
            // assetFileNames,
            // banner,
            // chunkFileNames,
            // compact,
            // dynamicImportInCjs,
            // entryFileNames,
            // extend,
            // externalImportAttributes,
            // footer,
            // generatedCode,
            // hashCharacters,
            // hoistTransitiveImports,
            // importAttributesKey,
            // inlineDynamicImports,
            // interop,
            // intro,
            // manualChunks,
            // minifyInternalExports,
            // outro,
            // paths,
            // preserveModules,
            // preserveModulesRoot,
            // sourcemap,
            // sourcemapBaseUrl,
            // sourcemapExcludeSources,
            // sourcemapFile,
            // sourcemapFileNames,
            // sourcemapIgnoreList,
            // sourcemapPathTransform,
            // validate,

            // // danger zone
            // amd,
            // esModule,
            // exports,
            // externalLiveBindings,
            // freeze,
            // indent,
            // noConflict,
            // reexportProtoFromExternal,
            // sanitizeFileName,
            // strict,
            // systemNullSetters,

            // // experimental
            // experimentalMinChunkSize
        });
        rolledup = output.map(x => x.code).join("\n");
		await fs.writeFile(fpath("../build/staging/index.rollup.js"), rolledup);
	} catch (error) {
		buildFailed = true;
		// do some error reporting
		console.error("Build error\x07", error);
        setTimeout(() => console.error("You broke it!\x07"), 500);
        setTimeout(() => console.error("Fix it, dude!\x07"), 1000);
	}
	if (bundle) {
		// closes the bundle
		await bundle.close();
	}
    if (buildFailed) {
        if (queue) {
            setTimeout(() => {
                busy = false;
                queue = false;
                build();            
            }, 10);
        } else {
            busy = false;
        }
        console.timeEnd(timer);
        return false;
    }

    // minifications
    // attempt uglify
    const { error: uglyerror, code: uglycode } = minify(rolledup, { mangle: { toplevel: true, properties: false } });
    if (uglycode) {
        await fs.writeFile(fpath("../build/staging/index.uglify.js"), uglycode);
    }
    // attempt roadroller
    const roadrollered = await roadrollerit(rolledup);
    await fs.writeFile(fpath("../build/staging/index.roadroller.js"), roadrollered);

    // attempt custom
    // attempt custom > roadroller
    // attempt uglify > roadroller
    const uglyroller = await roadrollerit(uglycode);
    await fs.writeFile(fpath("../build/staging/index.uglyroller.js"), uglyroller);
    // attempt uglify > custom
    // ?

    // build final html
    const htmlpath = fpath("../build/staging/index.html");
    const csspath = fpath("../build/staging/index.css");
    const htmlsrc = await fs.readFile(htmlpath, "utf-8");
    const csssrc = await fs.readFile(csspath, "utf-8");
    await fs.writeFile(fpath("../build/index.html"),
        htmlsrc.split("\n").map(x => {
            if (x.startsWith("<link")) {
                return `<style>${csssrc.replace(/\s+/mg, "")}</style>`;
            }
            if (x.startsWith("<script")) {
                // choose the winner
                return `<script type=module>${[
                    uglycode,
                    roadrollered,
                    uglyroller,
                ].sort((a, b) => a.length - b.length)[0]}</script>`
            }
            return x;
        }).join("\n")
    );

    // build zip files based on minifications
    const stream = new PassThrough();
    const zip = new yazl.ZipFile();
    zip.outputStream.pipe(stream);
    zip.addFile(fpath("../build/index.html"), "index.html");
    zip.addFile(fpath("../build/13.png"), "13.png");
    zip.end({ forceZip64Format: false }, () => console.log("yazl zip ended"));
    const buff = await new Promise((resolve, reject) => {
        const chunks = [];
        stream.on("data", (c) => chunks.push(Buffer.from(c)));
        stream.on("error", reject);
        stream.on("end", () => resolve(Buffer.concat(chunks)));
    });
    await fs.writeFile(fpath(`../build/codetastrophy.v0.13.${version}.zip`), buff);
    const bytes = buff.length;
    const percent = (bytes / zipmax * 100).toFixed(1);
    console.log(`Built zip ${bytes}/${zipmax} bytes (${percent}%)`);
    console.timeEnd(timer);
    if (queue) {
        setTimeout(() => {
            busy = false;
            queue = false;
            build();            
        }, 10);
    } else {
        console.log("Build ready\x07");
        busy = false;
    }
    return true;
};
export default build;
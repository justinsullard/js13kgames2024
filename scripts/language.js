console.time("Launguage");
import { readdir, readFile, writeFile } from "fs/promises";
import { join } from "path";
import uniq from "../src/util/uniq.js";
import categorized from "categorized-words";

const __dirname = new URL('.', import.meta.url).pathname;

const fpath = (x) => join(__dirname, x);

// const titleCaseRegexOne = /[A-Z][a-z0-9]+$/;
// const titleCaseRegexTwo = /[\- _]*[A-Z][a-z0-9]+$/;
// const titleCaseRegexThree = /[A-Z]+$/;
// const titleCaseRegexFour = /[\- _]*[A-Z]+$/;
// const titleCaseRegexFive = /[a-z]+$/;
// const titleCaseRegexSix = /[\- _]*[a-z]+$/;
// const titleCaseRegexSeven = /\w\S*/g;
// const seperatorRegex = /[\- _]+/g;
// const spacesRegex = / +/g;

// const lower = x => x.toLowerCase();
// const upper = x => x.toUpperCase();

// function stringToTitleCase(str, maintain) {
//     let ret = str;
//     let words = [];
//     ret = ret.replace(seperatorRegex, ' ').trim();
//     while (ret.length) {
//         if (ret.match(titleCaseRegexOne)) {
//             words.unshift(ret.match(titleCaseRegexOne)[0]);
//             ret = ret.replace(titleCaseRegexTwo, '');
//         } else if (ret.match(titleCaseRegexThree)) {
//             words.unshift(ret.match(titleCaseRegexThree)[0]);
//             ret = ret.replace(titleCaseRegexFour, '');
//         } else if (ret.match(titleCaseRegexFive)) {
//             words.unshift(ret.match(titleCaseRegexFive)[0]);
//             ret = ret.replace(titleCaseRegexSix, '');
//         } else {
//             words = ret.split(/ /).concat(words);
//             ret = "";
//         }
//     }
//     words = words.join(" ");
//     return = words.join(" ").replace(titleCaseRegexSeven, function (txt) {
//         // return upper(txt.charAt(0)) + lower(txt.substr(1));
//         return maintain ? upper(txt.charAt(0)) + txt.substr(1) : upper(txt.charAt(0)) + lower(txt.substr(1));
//     });
//     return ret;
// }
// function stringToLowerCamelCase(str, maintain) {
//     var ret = str;
//     if (isString(str)) {
//         ret = stringToTitleCase(ret, maintain).replace(spacesRegex, '');
//         ret = lower(ret.charAt(0)) + ret.substr(1);
//     }
//     return ret;
// }
// function stringToUpperCamelCase(str, maintain) {
//     return stringToTitleCase(str, maintain).replace(spacesRegex, '');
// }
// function stringToLowerUnderscoreCase(str, maintain) {
//     var ret = str;
//     if (isString(str)) {
//         ret = lower(stringToTitleCase(ret, maintain).replace(spacesRegex, "_"));
//     }
//     return ret;
// }
// function stringToUpperUnderscoreCase(str, maintain) {
//     var ret = str;
//     if (isString(str)) {
//         ret = upper(stringToTitleCase(ret, maintain).replace(spacesRegex, "_"));
//     }
//     return ret;
// }
// function stringToTitleUnderscoreCase(str, maintain) {
//     var ret = str;
//     if (isString(str)) {
//         ret = stringToTitleCase(ret, maintain).replace(spacesRegex, "_");
//     }
//     return ret;
// }
// function stringToLowerDashCase(str, maintain) {
//     var ret = str;
//     if (isString(str)) {
//         ret = lower(stringToTitleCase(ret, maintain).replace(spacesRegex, "-"));
//     }
//     return ret;
// }
// function stringToUpperDashCase(str, maintain) {
//     var ret = str;
//     if (isString(str)) {
//         ret = upper(stringToTitleCase(ret, maintain).replace(spacesRegex, "-"));
//     }
//     return ret;
// }
// function stringToTitleDashCase(str, maintain) {
//     var ret = str;
//     if (isString(str)) {
//         ret = stringToTitleCase(ret, maintain).replace(spacesRegex, "-");
//     }
//     return ret;
// }



// const listings = await readdir(fpath("../src"));
const listings = [];
listings.push(fpath("../build/staging/index.rollup.js"));
listings.push(fpath("../readme.md"));

const dirs = listings.filter(x => !x.includes("."));
const sublistings = await Promise.all(
    dirs.map(async (x) => {
        const list = await readdir(fpath(`../src/${x}`));
        return list.map(y => `${x}/${y}`);
    })
);
const subwordify = (x) => x.match(/#[a-f0-9]{6}|-?0x[a-f0-9]+|-?\d+(?:\.\d+)?|[A-Z]{2,}(?![a-z0-9])|[A-Z][a-z0-9]+|[a-z0-9]+|[A-Z]/g) ?? [];
const wordify = (x) => (x.match(/#[a-f0-9]{6}|-?0x[a-f0-9]+|-?\d+(?:\.\d+)?|\$?\w+(?:[-_@$]\w+)+|\w+/gi) ?? [])
    .flat();

const NUM = /^(?:-?\d+(?:\.\d+)?|-?0x[a-f0-9]+)$/i;

const lexicon = await ([
    ...listings,
    ...sublistings.flat(),
].reduce(
    async (p, x) => {
        const r = await p;
        console.log("processing", x);

        const words = wordify(x);
        if (x.match(/\.(js|html|css|txt|json|glsl|md)/)) {
            const src = await readFile(x[0] === "/" ? x : fpath(`../src/${x}`), "utf-8");
            words.push(...wordify(src));
        }
        words.forEach(w => r.all.set(w, (r.all.get(w) ?? 0) + 1));

        const numbers = words.filter(x => NUM.test(x));
        numbers.forEach(w => r.numbers.set(w, (r.numbers.get(w) ?? 0) + 1));

        // const subwords = words.filter(x => !NUM.test(x)).map(subwordify).flat();
        // subwords.forEach(w => r.subwords.set(w, (r.subwords.get(w) ?? 0) + 1));

        return r;
    },
    Promise.resolve({ all: new Map(), numbers: new Map(), subwords: new Map() })
));
console.log("Processing subwords");
const allwords = [...lexicon.all.keys()].sort().reverse();
const lowerallwords = allwords.map(x => x.toLowerCase());
[...lexicon.all.entries()].forEach(([word, count]) => {
    // const lower = word.toLowerCase();
    // const subwords = subwordify(word);
    // const lowersubwords = subwords.map(x => x.toLowerCase());
    // const foundin = allwords.filter(other => other.length > 3 && subwords.includes(other));
    // const lowerin = allwords.filter(other => other.length > 3 && lowersubwords.includes(other.toLowerCase()));
    // const lowerend = lowerin.filter(x => lowersubwords.find(y => y.endsWith(x)));
    // const lowerstart = lowerin.filter(x => lowersubwords.find(y => y.startsWith(x)));
    // const lowermiddle = lowerin.filter(x => !lowerend.includes(x) && !lowerstart.includes(x));
    const subwords = subwordify(word).map(subword => {
        const r = [];
        let s = subword;
        let l = s.toLowerCase();
        while (l.length) {
            let o = lowerallwords.find(a => a.length > 3 && l.endsWith(a));
            if (o) {
                l = l.slice(0, l.length - o.length);
                s = s.slice(0, s.length - o.length);
                r.push(allwords[lowerallwords.indexOf(o)]);
                continue;
            }
            o = lowerallwords.find(a => a.length > 3 && l.startsWith(a));
            if (o) {
                l = l.slice(o.length - 1);
                s = l.slice(o.length - 1);
                r.push(allwords[lowerallwords.indexOf(o)]);
                continue;
            }
            // We'll ignore middle words at the moment, because they should already be broken up
            r.push(s);
            l = "";
            break;
        }
        return r; 
    }).flat().filter(Boolean);
    subwords.forEach(w => lexicon.subwords.set(w, (lexicon.subwords.get(w) ?? 0) + 1));
});
console.log("Processing parts of speech");
const lists = {
    N: [], // noun
    V: [], // verb
    A: [], // adjective
    I: [], // interjection
    C: [], // conjunction/preposition
    P: [], // pronoun
    S: [], // spoken contraction
    O: [], // other unknown part of speech
};
[...lexicon.subwords.keys()].forEach(w => {
    const l = w.toLowerCase();
    let used = false;
    Object.keys(categorized).forEach(k => {
        if (categorized[k].includes(l)) {
            used = true;
            lists[k].push(w);
        }
    });
    if (!used && !lexicon.numbers.has(w)) {
        lists.O.push(w);
    }
});
console.log("Writing outputs");
const alphaSort = ([a], [b]) => a < b ? -1 : 1;
const freqSort = ([x, a], [y, b]) => a - b || alphaSort(x, y);
const lengthSort = ([a], [b]) => a.length - b.length || alphaSort(a, b);
await writeFile(
    fpath("../data/lexicon.txt"),
    [...lexicon.all.entries()].sort(alphaSort).map(([a, b]) => `${a} : ${b}`).join("\n")
);
await writeFile(
    fpath("../data/lexicon.freq.sort.txt"),
    [...lexicon.all.entries()].sort(freqSort).map(([a, b]) => `${a} : ${b}`).join("\n")
);
await writeFile(
    fpath("../data/lexicon.length.sort.txt"),
    [...lexicon.all.entries()].sort(lengthSort).map(([a, b]) => `${a} : ${b}`).join("\n")
);
await writeFile(
    fpath("../data/numbers.txt"),
    [...lexicon.numbers.entries()].sort(alphaSort).map(([a, b]) => `${a} : ${b}`).join("\n")
);
await writeFile(
    fpath("../data/subwords.txt"),
    [...lexicon.subwords.entries()].sort(alphaSort).map(([a, b]) => `${a} : ${b}`).join("\n")
);
await writeFile(
    fpath("../data/subwords.freq.txt"),
    [...lexicon.subwords.entries()].sort(freqSort).map(([a, b]) => `${a} : ${b}`).join("\n")
);
await writeFile(
    fpath("../data/subwords.length.txt"),
    [...lexicon.subwords.entries()].sort(lengthSort).map(([a, b]) => `${a} : ${b}`).join("\n")
);
await writeFile(fpath("../data/nouns.txt"), lists.N.sort().join("\n"));
await writeFile(fpath("../data/verb.txt"), lists.V.sort().join("\n"));
await writeFile(fpath("../data/adjective.txt"), lists.A.sort().join("\n"));
await writeFile(fpath("../data/interjection.txt"), lists.I.sort().join("\n"));
await writeFile(fpath("../data/conjunction.txt"), lists.C.sort().join("\n"));
await writeFile(fpath("../data/pronoun.txt"), lists.P.sort().join("\n"));
await writeFile(fpath("../data/spokencontraction.txt"), lists.S.sort().join("\n"));
await writeFile(fpath("../data/otherunknown.txt"), lists.O.sort().join("\n"));
console.timeEnd("Launguage");
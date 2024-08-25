import { createReadStream } from "fs";
import readline from "node:readline";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";

const __dirname = new URL('.', import.meta.url).pathname;
const fpath = (x) => join(__dirname, x);

// const rl = readline.createInterface({
//     input: createReadStream(fpath("../data/Oxford English Dictionary.txt")),
//     crlfDelay: Infinity,
// });


// for await (const line of rl) {
//     if (line.length > 2) {
//         console.log(line.split(/ {2,}/));
//     }
// }

// const raw = await readFile(fpath("../data/dictionary.json"));
// const dictionary = JSON.parse(raw);
const dictionary = await readFile(fpath("../data/dictionary.json")).then(JSON.parse);

const lists = {
    "n.": new Set(),
    "prep.": new Set(),
    "a.": new Set(),
    "v.": new Set(),
    "adv.": new Set(),
    "p.": new Set(),
    "interj.": new Set(),
    "conj.": new Set(),
    "pron.": new Set(),
};

dictionary.forEach((q) => {
    const { word, pos } = q;
    // console.log(word, pos);
    if (!word) { return console.log("huh?", q); }
    word.split("; ").forEach(w => lists[pos].add(w.toLowerCase()));

});
await writeFile(fpath("../data/noun.json"), JSON.stringify([...lists["n."]], false, 2));
await writeFile(fpath("../data/preposition.json"), JSON.stringify([...lists["prep."]], false, 2));
await writeFile(fpath("../data/adjective.json"), JSON.stringify([...lists["a."]], false, 2));
await writeFile(fpath("../data/verb.json"), JSON.stringify([...lists["v."]], false, 2));
await writeFile(fpath("../data/adverb.json"), JSON.stringify([...lists["adv."]], false, 2));
await writeFile(fpath("../data/participle.json"), JSON.stringify([...lists["p."]], false, 2));
await writeFile(fpath("../data/interjection.json"), JSON.stringify([...lists["interj."]], false, 2));
await writeFile(fpath("../data/conjugation.json"), JSON.stringify([...lists["conj."]], false, 2));
await writeFile(fpath("../data/pronoun.json"), JSON.stringify([...lists["pron."]], false, 2));

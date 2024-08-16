import sort from "../util/sort.js";
import stripe from "../util/stripe.js";
import euclidean from "../util/euclidean.js";
import merge from "../util/merge.js";
import fizzbuzz from "../util/fizzbuzz.js";
import notes from "../util/notes.js";
import uniq from "../util/uniq.js";

const musick = notes();
const fzzbzz = stripe(13, fizzbuzz);
const isFizzBuzz = x => fzzbzz[x] === "fizzbuzz";
const isFizz = x => fzzbzz[x] === "fizz";
const isBuzz = x => fzzbzz[x] === "buzz";

const scales = uniq(
    stripe(13,
        (a) => [
            ...stripe(13, (b) => sort(merge(euclidean(4, a, 13), euclidean(3, b, 13)))),
            euclidean(7, a, 13)
        ].filter(x => x.length === 7).map(x => x.join(","))
    ).flat()
).map(x => x.split(",").map(x => 1 * x));

const theme = {
    fizzbuzz: stripe(7).filter(x => x !== fzzbzz[x]),
    fizz: stripe(7).filter(isFizz),
    buzz: stripe(7).filter(isBuzz),
};

const noise = {
    fizzbuzz: stripe(musick.length).filter(isFizzBuzz),
    fizz: stripe(musick.length).filter(isFizz),
    buzz: stripe(musick.length).filter(isBuzz),
    keyboard: stripe(musick.length).filter(x => !(x % 13) || !(x % 5)),
};

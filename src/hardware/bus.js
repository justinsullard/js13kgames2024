import each from "../util/each.js";
const handlers = new Map();
function store(ev) {
    if (!handlers.has(ev)) { handlers.set(ev, new Set()); }
    return handlers.get(ev);
}
export const on = (ev, cb) => store(ev).add(cb);
export const off = (ev, cb) => store(ev).delete(cb);
export const once = (ev, cb) => {
    const f = (...args) => {
        off(ev, f);
        cb(...args);
    };
    on(ev, f);
};
export const emit = (e, ...x) => each(store(e), f => f(...x));
// const count = e => store(e).size;

// TODO: Remove this
// window.bus = {
//     on,
//     once,
//     off,
//     emit,
//     count,
// };

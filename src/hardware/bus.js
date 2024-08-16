const handlers = new Map();
function store(ev) {
    if (!handlers.has(ev)) { handlers.set(ev, new Set()); }
    return handlers.get(ev);
}
const bus = {
    on(ev, cb) {
        store(ev).add(cb);
        return bus;
    },
    once(ev, cb) {
        const f = (...args) => {
            store(ev).delete(f);
            cb(...args);
        };
        store(ev).add(f);
        return bus;
    },
    off(ev, cb) {
        store(ev).delete(cb);
        return bus;
    },
    emit(ev, ...args) {
        store(ev).forEach((f) => f(...args));
        return bus;
    },
    count(ev) {
        return store(ev).size;
    }
};
export default bus;

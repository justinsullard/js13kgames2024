const IDS = {};
export const ID = (x) => {
    const kind = x?.constructor?.name ?? "_";
    return IDS[kind] = (IDS[kind] ?? -1) + 1;
};

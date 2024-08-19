export const open = key => JSON.parse(localStorage.getItem(key) ?? "undefined");
export const save = (key, x) => localStorage.setItem(key, JSON.stringify(x));
export const burn = key => localStorage.removeItem(key);

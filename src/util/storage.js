const keyify = key => "codetastrophy-" + key;
export const open = key => JSON.parse(localStorage.getItem(keyify(key)) ?? "null");
export const save = (key, x) => localStorage.setItem(keyify(key), JSON.stringify(x));
export const burn = key => localStorage.removeItem(keyify(key));

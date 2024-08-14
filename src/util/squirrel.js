export const squirrel = (seed = 0, x = 0, y = 0, z = 0) => {
    let mangled = x + (198491317 * y) + (237375311 * z); // 777767777
    mangled *= 0xb5297a4d;
    mangled += seed;
    mangled ^= (mangled >> 8);
    mangled += 0x68e31da4;
    mangled ^= (mangled << 8);
    mangled *= 0x1b56c4e9;
    mangled ^= (mangled >> 8);
    return mangled / 0x7fffffff;
};
export default squirrel;
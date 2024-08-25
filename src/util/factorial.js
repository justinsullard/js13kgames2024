export const factorial = (x) => {
    let r = 1;
    let n = x;
    while(n) {
        r *= n--;
    }
    return r;
};
export default factorial;

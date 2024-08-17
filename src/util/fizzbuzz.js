export const fizzbuzz = (i) => (!i || i % 3 ? '' : 'fizz') + (!i || i % 5 ? '' : 'buzz') || i;
export default fizzbuzz;

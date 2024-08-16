export const merge = (a, b=[]) => [...new Set([...a,...b])];
export default merge;
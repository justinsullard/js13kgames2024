import uniq from "../util/uniq.js";
import tostring from "../util/tostring.js";
import stringify from "../util/stringify.js";
import map from "../util/map.js";
import join from "../util/join.js";
import filter from "../util/filter.js";
import isfunction from "../util/isfunction.js";
import flat from "../util/flat.js";
import Evil from "./evil.js";
export const Invocation = (name, mixins = [], props = []) => {
    const all = filter([
        ...flat(map(mixins, x => x.props)),
        ...props,
    ], x => x !== undefined);
    const final = map(uniq(map(all, x=>x[0])), x => filter(all, y => y[0] === x).pop());
    const names = map(final, x=>x[0]);
    return Evil(`class ${name} extends Array{
static mixins=${stringify(map(mixins, x => x.name))};
static names=${stringify(names)};
static props=[${
    join(map(final, ([n, x]) => `["${n}", ${
        isfunction(x) ? tostring(x) : stringify(x)
    }]`), ", ")
}];
static defaults=x=>map(${name}.props,([n,p])=>isfunction(p)?p(x):p);
constructor(...x){super();each(${name}.defaults(this),(d,i)=>this[i]=x[i]??d)}
*[Symbol.iterator](){for(const x of this){yield x}}
${join(map(names, (name, i) => `get ${name}(){return this[${i}]}
set ${name}(x){return this[${i}]=x}
`))}}`);
};
export default Invocation;
// типа lodash.get
export const get = (n, h) => n.split(".").reduce((o, i) => o ? o[i] : void(0), h);

const obj = { get };

export default obj;
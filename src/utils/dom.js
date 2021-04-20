// типа jQ
const $ = (q) => document.querySelector(q);
$.meta = (n) => ($('meta[name="' + n + '"') || {}).content;

export default $;
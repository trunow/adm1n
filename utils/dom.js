// 🚀 majQ.js (minimal another jQuery)
const $ = (s,p) => (p instanceof EventTarget ? p : document).querySelector(s);
$.win=$.W=window;$.doc=$.D=document;$.head=$.H=$.D.head;$.body=$.B=$.D.body;$.ET = EventTarget;
$._ = $.prototype = $.ET.prototype;
$.isET = is => is instanceof $.ET;
$.isETor = (is,or) => $.isET(is)?is:$.isETor(or,$.D);
$.all = $.$ = (s,p) => $.isETor(p).querySelectorAll(s);
$.create = tag => $.D.createElement(tag);
$._.on = addEventListener;
$._.off = removeEventListener;
$._.push = function(tag){let el=$.create(tag);this.appendChild(el);return el;}
$._.text = function(txt){if(!txt) return this.innerText;this.innerText=txt;return this;} // TODO textContent
$._.html = function(html){if(!html) return this.innerHTML;this.innerHTML=html;return this;}
$._.css = function (css) { if (!css) return this.style.cssText; this.style.cssText = css; return this; }
$.meta = (n) => ($('meta[name="' + n + '"') || {}).content;//(n) => $(`meta[name="${n}"]`)?.content;//?

window.$ = $;

export default $;
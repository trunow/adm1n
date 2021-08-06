// @DEV
const __ts = new Date().toISOString().slice(0, 19).replace("T", " ");

import _ from './utils'; // типа lodash
import $ from './utils/dom'; // типа jQ
import bus from "./utils/bus";
import http from "./utils/http"; // типа axios
import notice from "./utils/notice"; // форматирует сообщение в объект для $notify
import { noticeOptions } from "./utils/notice"; // нужны для сахара, типа $notify.danger()

import Adm1nNotifies from "./components/Adm1nNotifies.vue";

import { createApp } from "vue";
        
const adm1n = {
    install: (app, options) => {

        app.config.globalProperties.$bus = bus;


        // типа lodash                                      // TODO сделать переопределяемым в options.lodash ? ._ ?
        // this._ в Vue занят (это ссылка из компонента на себя самого). Поэтому займём this.$_
        app.config.globalProperties.$_ = _;

        // типа jQ                                          // TODO сделать переопределяемым в options.dom ? .$ ?
        // this.$ в Vue занят (это ссылка из компонента на себя самого). Поэтому займём this.$$
        app.config.globalProperties.$$ = $;


        app.config.globalProperties.$http = http; // TODO ? что делать с catch ?
        //alias ??
        app.config.globalProperties.$api = http; // TODO ?
        // app.config.globalProperties.$api = http.use({baseUrl: '', options: {}});

        // app.provide('i18n', options.i18n)
        //              ⬆ так можно было бы (см https://v3.vuejs.org/guide/component-provide-inject.html),
        //              но (*) нам нужна глобальная возможность [пере]установить язык из компонента - типа this.$i18n({..другой язык});
        app.config.globalProperties.$i18n = function(langObj) {
            this.i18n = langObj;
        };

        // локализация
        app.config.globalProperties.__ = function (key) {
            return (this.i18n ? this.i18n[key] : key ) || _.get(key, this.i18n) || key;
        }

        // сразу и установим язык для локализации, 
        // если он был передан в main.js :: app.use(adm1n, {..тут })
        // а если надо будет [пере]установить см  (*)
        if (options && options.i18n) app.config.globalProperties.$i18n(options.i18n);
        

        // app.component("adm1n-notifies", Adm1nNotifies);

        const anEl = document.createElement("div");
        document.body.appendChild(anEl);
        const anApp = createApp(Adm1nNotifies);
        // anApp.use(busPlugin); // adm1n/plugins/bus ???
        anApp.config.globalProperties.$bus = bus;
        anApp.mount(anEl);

        const $notify = function(options = null, level = null) {
            let ntc = new notice(options, level);
            if (ntc) bus.emit("notify", ntc);
        };
        noticeOptions.levels.forEach((l) => {
            $notify[l] = function(options = null) {
                return $notify.call(this, options, l);
            };
        });

        app.config.globalProperties.$notify = $notify;

        app.mixin({
            created() {
                // TODO @DEV
                if (this.$options.name && this.$options.debug) {
                    console.log(this.$options.name + " / " + __ts);
                }
            },
        });


    }
}

export default adm1n;
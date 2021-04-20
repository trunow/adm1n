// @DEV
const __ts = new Date().toISOString().slice(0, 19).replace("T", " ");

import _ from './utils'; // типа lodash
import $ from './utils/dom'; // типа jQ
import bus from "./utils/bus";
import http from "./utils/http"; // типа axios

import Adm1nNotify from "./components/Adm1nNotify.vue";

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
        app.config.globalProperties.$api = http; // TODO ? что делать с catch ?
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
        

        app.component("adm1n-notify", Adm1nNotify);

        const anEl = document.createElement("div");
        document.body.appendChild(anEl);
        const anApp = createApp(Adm1nNotify);
        // anApp.use(busPlugin); // adm1n/plugins/bus ???
        anApp.config.globalProperties.$bus = bus;
        anApp.mount(anEl);

        // console.warn(nbox, Adm1nNotify);

        app.config.globalProperties.$notify = function(message) {
            console.warn(message, this.$bus);
            bus.emit("message", message);
        };

        app.mixin({
            created() {
                if (this.$options.name && this.$options.debug) {
                    console.log(this.$options.name + " / " + __ts);
                }
            },
        });


    }
}

export default adm1n;
// class Bus {
//     constructor() {
//         this.events = {};
//     }
//     on(ev, fn) {
//         this.events[ev] = this.events[ev] || [];
//         this.events[ev].push(fn);
//     }
//     off(ev, fn) {
//         if (this.events[ev]) {
//             for (var i = 0; i < this.events[ev].length; i++) {
//                 if (this.events[ev][i] === fn) {
//                     this.events[ev].splice(i, 1);
//                     break;
//                 }
//             }
//         }
//     }
//     emit(ev, data) {
//         if (this.events[ev]) {
//             this.events[ev].forEach(function(fn) {
//                 fn(data);
//             });
//         }
//     }
// }
// export default new Bus();

// const Bus = function () {
//     this.events = {};
//     this.on = function(ev, fn) {
//         this.events[ev] = this.events[ev] || [];
//         this.events[ev].push(fn);
//     };
//     this.off = function(ev, fn) {
//         if (this.events[ev]) {
//             let evIx = this.events[ev].findIndex((_n) => _n === fn);
//             if (evIx > -1) this.events[ev].splice(evIx, 1);
//         }
//     };
//     this.emit = function(ev, data) {
//         if (this.events[ev]) {
//             this.events[ev].forEach(function(fn) {
//                 fn(data);
//             });
//         }
//     };
// };
// export default new Bus();

export default {
    events: {},
    on: function(ev, fn) {
        this.events[ev] = this.events[ev] || [];
        this.events[ev].push(fn);
    },
    off: function(ev, fn) {
        if (this.events[ev]) {
            let evIx = this.events[ev].findIndex(_n => _n === fn);
            if (evIx > -1) this.events[ev].splice(evIx, 1);
        }
    },
    emit: function(ev, data) {
        if (this.events[ev]) {
            this.events[ev].forEach(function(fn) {
                fn(data);
            });
        }
    },
};

<template>
    <adm1n-input
            ref="input"
            :class="iclass"
            :style="istyle"
            :id="id"
            :type="'text'"
            :name="name"
            :checked="checked"
            :required="required"
            :readonly="readonly"
            :disabled="disabled"
            :pattern="pattern"
            :title="title"
            :autofocus="autofocus"
            :autocomplete="autocomplete && autocomplete!=='off'?'on':'off'"
            :placeholder="placeholder"
            :value="value"
            @input="$emit('input', $event)"
            @focus="onFocus"
            @blur="onBlur"
            :dataError="dataError"
            :label="label"
            :lclass="lclass"
            :lstyle="lstyle"
    >
        <template #append>
            <div v-show="pickerIsOpen" class="adm1n-polyfill-picker" @dblclick="pickerIsOpen=false" style="position:absolute;">
                <p>TODO date-picker</p>
            </div>
        </template>
    </adm1n-input>

    <br>
    <br>
    <hr>
    <br>
    <br>

    <div>
        <input type="date">
        <h4 ref="calCall" @click="cal">Cal</h4>
        <div class="cal"></div>
    </div>

</template>

<script>
import Adm1nInput from './Adm1nInput.vue';

const ymd = function(y,m=0,d=0,f){
    const o = {
        V: v => v, // TODO validator & validate each of y,m,d, // ,f = is callback ??
        C: { J: 1000, S: 60, I: 60, H: 24, W: 7, L: 366 },
        fn: {
            fullYear: y => o.V(y)||(new Date).getFullYear(), // YYYY ?
            daysInMounth: (y,m=0) => (!m%2 ? (m<8 ? 31 : 30) : (m>7 ? 31 : (m>1 ? 30 : (o.fn.isLeap(y) ? 29 : 28)))),
            daysInYear: y => Math.round((new Date(o.fn.fullYear(y),12) - new Date(o.fn.fullYear(y),0))/(o.C.J*o.C.S*o.C.I*o.C.H)),
            isLeap: y => o.fn.daysInYear(y)===o.C.L,
            firstDayInYear: y => new Date(o.fn.fullYear(y),0,1).getDay(),
            ruFirstDayInYear: y => o.fn.firstDayInYear(y)||o.C.W,
            beforeCount: y => o.fn.ruFirstDayInYear(y)-1,
            beforeArray: y => [...Array(o.fn.beforeCount(y)).keys()].map(b=>b-o.fn.beforeCount(y)+1),
            lastDayInYear: y => new Date(o.fn.fullYear(y),11,31).getDay(),
            ruLastDayInYear: y => o.fn.lastDayInYear(y)||o.C.W,
            afterCount: y => o.C.W-o.fn.ruLastDayInYear(y),
            afterArray: y => [...Array(o.fn.afterCount(y)).keys()].map(a=>a+o.fn.daysInYear(y)+1),
            daysInYearArray: y => [...Array(o.fn.daysInYear(y)+1).keys()].slice(1),
            simpleCalendarArray: y => o.fn.beforeArray(y).concat(o.fn.daysInYearArray(y),o.fn.afterArray(y)),
            simpleCalendarObj: y => o.fn.simpleCalendarArray(y).map(n=>{
                return {
                    n,
                    d: new Date(o.fn.fullYear(y),0,n)
                }
            }),
        },
        aliases: {fullYear:'y', beforeArray:'ba', daysInYear:'in', simpleCalendarArray:'ca', simpleCalendarObj:'co'}
    }
    Object.keys(o.fn).forEach(k=>{
        if(typeof o.fn[k] === 'function') {
            o[k] = o.fn[k](y,m,d,f);
            if(o.aliases[k]) o[o.aliases[k]] = o[k];
        }
    });

    return o;
}

export default {

    name: "adm1n-input-date",

    props: {
        value: {
            type: [String, Boolean, Array, Object],
            default: '',
        },
        type: {
            type: String,
            default: 'date',
            validator: t => {
                return [
                    'date',
                    'datetime-local',
                    'time',
                    'week',
                ].indexOf(t) !== -1
            },
        },
        name: String,
        label: String,
        placeholder:  {
            type: [String, Boolean],
            default: false,
        },
        pattern: String,
        title: String,
        form: String,
        autofocus: Boolean,
        required: Boolean,
        readonly: Boolean,
        disabled: Boolean,
        autocomplete: {
            type: [String, Boolean],
            default: false,
        },
        checked: {
            type: [String, Boolean],
            default: false,
        },
        isCheck: {
            type: Boolean,
            default: false,
        },
        inline: {
            type: [String, Boolean],
            default: false,
        },
        id: {
            type: String,
            default () {
                return null;
            }
        },
        class: {
            type: String,
            default: ''
        },
        iclass: {
            type: String,
            default: 'adm1n-control-input'
        },
        lclass: {
            type: String,
            default: ''
        },
        istyle: {
            type: String,
            default: ''
        },
        lstyle: {
            type: String,
            default: ''
        },
        licon: {
            type: String,
            default: ''
        },
        dataError: {
            type: [Array, String],
            default: ''
        },
    },

    components: {
        Adm1nInput
    },

    data() {
        return {
            pickerIsOpen: false,
        }
    },

    methods: {
        // onInput(e) {
        //     console.log('onInput in ' + this.$options.name + ' > ' + e.target.name + ': ' + e.target.value + ' (' + typeof e.target.value + ')');
        //     // if(this.check) {
        //     //     e.target.value = !!(e.target.checked && e.target.checked !== "false") * 1;
        //     // }
        //     this.$emit('input', e);
        // },
        onFocus(e) {
            console.log('onFocus in ' + this.$options.name + ' > ' + e.target.name + ': ' + e.target.value + ' (' + typeof e.target.value + ')');

            this.pickerIsOpen = true;
            this.$emit('focus', e);
        },
        onBlur(e) {
            console.log('onBlur in ' + this.$options.name + ' > ' + e.target.name + ': ' + e.target.value + ' (' + typeof e.target.value + ')');

            // this.pickerIsOpen = false;
            this.$emit('blur', e);
        },

        cal(e){
            let html = "", cm = 0;

            ymd().co.forEach(x=>{
                let n = x.d.getDay(),
                    d = x.d.getDate(),
                    m = x.d.getMonth(),
                    y = x.d.getFullYear(),
                    t = new Intl.DateTimeFormat("ru", { weekday: "short", year: "2-digit", month: "long", day: "numeric"}).format(x.d);

                // if(x.n<0)

                //html += '<span data-cm="' + cm + '" data-month="' + m + '" title="' + t + '" onclick="alert(`' + t + '`);return false;">' + d + '</span>';

                html += `<span data-cm="${cm}" 
                               data-month="${m}" 
                               data-year="${y}" 
                               title="${t}" 
                               onclick="alert('${t}');return false;"
                            >${d}</span>`;

                if(!n) html += '<br>';
            });

            e.target.nextElementSibling.innerHTML = html;
        }
    },

    emits: ['input', 'focus', 'blur'],

    mounted() {
        this.$refs.calCall.click();

        // ???
        console.warn('INPUT DATE ?');
    }
}
</script>

<style>
/* TODO import vars */
.adm1n-polyfill-picker {
    position: absolute;
    top: 100%;
    padding: 1rem;
    background-color: white;
    z-index: 8999;
    box-shadow: var(--box-shadow);
    width: calc(100% - 2rem);
}

:root {
    --s: 24px;
    --f: 14px;
    --m: 1px;
}
.cal {
    background-color: rgba(224, 224, 224, 0.2);
    /* background-color: #fff; */
    width: calc(7 * (var(--s) + 2 * var(--m)) + 1px);
    height: calc(6 * (var(--s) + 2 * var(--m)));
    overflow-y: scroll;
}
.cal span {
    display: inline-flex;
    width: var(--s);
    height: var(--s);
    margin: var(--m);
    font-size: var(--f);
    background-color: #fff;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: center;
    align-items: center;
}
.cal span:hover {
    background-color: rgba(192, 224, 255, 0.8);
}

.cal::-webkit-scrollbar {
  width: 1px;
}
.cal::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0);
}
.cal::-webkit-scrollbar-thumb {
  background-color: rgba(192, 224, 255, 0.8);
  border: 0 none;
}
</style>

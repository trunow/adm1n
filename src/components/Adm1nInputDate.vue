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
            :placeholder="_placeholder"
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
                    <p>{{ JSON.stringify(calendar) }}</p>
                </div>
            </template>
        </adm1n-input>
</template>

<script>
import Adm1nInput from './Adm1nInput.vue';

class Calendar {
  constructor(date) {
    this.date = date;
  }

  log() {
    console.log(`Current date id ${this.date}`);
  }
}
const calendar = new Calendar('000');

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
            calendar: calendar,//(),
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
    },

    emits: ['input', 'focus', 'blur'],

    // mounted() {
    // }
}
</script>

<style scoped>
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
</style>

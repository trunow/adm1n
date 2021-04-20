<template>
    <div :class="_class" :data-error="dataError">
        <input
            ref="input"
            :class="iclass"
            :style="istyle"
            :id="id"
            :type="type"
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
            :data-id="dataId||id"
            :data-key="dataKey"
            :value="value"
            @input="$emit('input', $event)"
            @focus="$emit('focus', $event)"
            @blur="$emit('blur', $event)"
        >
        <label
            v-if="hasLabel"
            ref="label"
            class="adm1n-control-label"
            :class="lclass"
            :style="lstyle"
            :for="id"
        >
            <i v-if="licon" :class="'icon-'+licon"></i>
            <span v-else-if="label">{{ label }}</span>
        </label>
        <slot name="append"></slot>
    </div>
</template>

<script>
    import uniqueId from '../utils/uniqueId';

    export default {

        name: "adm1n-input",

        debug: true,

        props: {
            value: {
                type: [String, Number, Boolean, Array, Object],
                default: '',
            },
            type: {
                type: String,
                default: 'text',
                validator: t => {
                    return [
                        'button',
                        'checkbox',
                        'color',
                        'date',
                        'datetime-local',
                        'email',
                        'file',
                        'hidden',
                        'image',
                        'month',
                        'number',
                        'password',
                        'radio',
                        'range',
                        'reset',
                        'search',
                        'submit',
                        'tel',
                        'text',
                        'time',
                        'url',
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
                    return uniqueId('_adm1n_input_');
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
            dataId: {
                type: Number,
                default: null
            },
            dataKey: {
                type: Number,
                default: null
            },
        },

        computed: {
            inp() {
                return this.$refs.input;
            },
            lbl() {
                return this.$refs.label;
            },
            hasLabel(){
                return this.type!=='hidden' && (this.label||this.licon);//||this.dataError);
            },
            _placeholder(){
                return this.placeholder ? (typeof this.placeholder === 'boolean' ? this.label : this.placeholder) : null;
            },
            btn() {
                return ['submit', 'reset', 'button'].indexOf(this.type) !== -1
            },
            check() {
                return this.isCheck || (['checkbox', 'radio'].indexOf(this.type) !== -1)
            },
            _class() {
                let _classes = ['adm1n-control'],
                    _class = this.class,
                    _custom = '';
                if(this.inline) _classes.push('adm1n-control__inline');
                if(this.btn) _classes.push('adm1n-control__btn');
                if(this.check) _classes.push('adm1n-control__check');
                    //if(this.required) _classes.push('adm1n-control__required');
                    // if(this.dataError) _classes.push('adm1n-control__error');
                if(!this.hasLabel) _classes.push('adm1n-control__nolabel');
                switch (typeof _class) {
                    case 'string':
                        _custom = _class;
                        break;
                    case 'object':
                        _custom = Array.isArray(_class) ? _class.join(" ") : Object.keys(_class).filter(k => _class[k]).join(" ");
                        //_custom = _class.lenght ? _class.join(" ") : Object.keys(_class).filter(k => _class[k]).join(" ");
                        break;
                    default:
                        _custom = null;
                }
                if(_custom) _classes.push(_custom);

                return _classes.join(" ");
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
        },

        emits: ['input', 'focus', 'blur'],

        mounted() {

            if(this.inline) console.log(this.$options.name, this.value, typeof this.value);

            if(this.form) this.inp.setAttribute('form', this.form);
            if(this.inline && this.label && typeof this.inline === "string") this.lbl.style.width = this.inline;

            // if(this.check) {
            //     this.inp.checked = !!this.value; // TODO if typeof != boolean ?
            // }

        }
    }
</script>

<style scoped>
/* TODO import vars */

.adm1n-control {
    display: flex;
    margin-bottom: 1rem;
    flex-direction: column-reverse;
    color: var(--color);
    position: relative;
}
.adm1n-control-label {
    display: flex;
    color: var(--label-color);
    opacity: .8;
    font-size: .8rem;
    line-height: 1rem;
    margin-bottom: 0.5rem;
    position: relative;
    max-width: 100%;
}
.adm1n-control-label:hover {
    cursor: pointer;
    opacity: 1;
}
.adm1n-control-input {
    font-size: var(--font-size);
    line-height: var(--line-height);
}
.adm1n-control-input[type='text'],
.adm1n-control-input[type='password'],
.adm1n-control-input[type='email'],
.adm1n-control-input[type='tel'],
.adm1n-control-input[type='date'],
.adm1n-control-input[type='search'] {
    width: 100%;
    height: var(--input-height);
    padding: var(--input-padding);
    color: inherit;
    border: 1px solid var(--border-color);
    box-sizing: border-box;
    outline: none;
}
.adm1n-control-input[type='file'] {
    width: 100%;
    outline: none;
}
.adm1n-control-input[required] + label::after {
    content: "*";
    color:  var(--text-danger-color);
}
/* .adm1n-control__error {
    color:  var(--text-danger-color);
} */
.adm1n-control__check {
    flex-direction: row;
    align-items: flex-end;
}
.adm1n-control__check .adm1n-control-label {
    margin-bottom: 0;
    line-height: 1;
}
.adm1n-control__btn {
    flex-direction: initial;
}
.adm1n-control__inline {
    flex-direction: row-reverse !important;
    align-items: center;
    margin-bottom: 0;
}

.adm1n-control[data-error]:not([data-error=""]) .adm1n-control-input,
.adm1n-control[data-error]:not([data-error=""]) .adm1n-control-label {
    color:  var(--text-danger-color) !important;
}
.adm1n-control[data-error]:not([data-error=""]) .adm1n-control-input {
    border-color:  var(--text-danger-color) !important;
}
.adm1n-control[data-error]:not([data-error=""])::after {
    content: attr(data-error);
    color:  var(--text-danger-color) !important;
    display: inline-flex;
    font-size: 0.8em;
    line-height: 1rem;
    margin-left: auto;
    margin-bottom: -1rem;
}
.adm1n-control.adm1n-control__check[data-error]:not([data-error=""])::after {
    margin-bottom: 0;
    margin-left: 0.5rem;
}
.adm1n-control.adm1n-control__nolabel[data-error]:not([data-error=""])::after {
    margin-bottom: 0.5rem;
}
.adm1n-control.adm1n-control__check .adm1n-control-input:checked + .adm1n-control-label {
    font-weight: bold;
}

[disabled],
[readonly] {
    opacity: 0.5;
}
</style>

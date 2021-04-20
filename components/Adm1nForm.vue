<template>
    <form class="adm1n-form" :class="{'adm1n-form__inline': inline}" @input="formChange" @submit="formSubmit">
        <template v-for="(c, _i) in controls" :key="'control_' + _i">
            <component :is="groupComponent(c.group)" :class="{'adm1n-form-fieldset': c.group, 'adm1n-form-control': !c.group}">
                <!-- TODO legend -->
                <template v-for="(f,i) in c.fields" :key="'field_'+i">
                    <slot v-if="f.slot || f.type=='slot'" :name="f.slot||f.name" :field="f"></slot>
                    <adm1n-input v-else
                                :type="f.type"
                                :name="f.name"
                                :label="f.label"
                                :licon="f.licon"
                                :lstyle="f.lstyle"
                                :placeholder="f.placeholder"
                                :pattern="f.pattern"
                                :title="f.title"
                                :checked="c.checked===f.value||f.checked"
                                :id="f.id"
                                :class="f.class"
                                :iclass="f.iclass"
                                :istyle="f.istyle"
                                :autofocus="f.autofocus"
                                :required="f.required"
                                :readonly="f.readonly"
                                :disabled="f.disabled"
                                :inline="inline"
                                :dataError="f.dataError"
                                :value="f.value"
                                @input="onInput"
                                @focus="onFocus"
                    >
                    </adm1n-input>
                </template>
            </component>
        </template>
    </form>
</template>

<script>
    import Adm1nInput from './Adm1nInput.vue';

    export default {
        name: "adm1n-form",

        components: {
            Adm1nInput
        },

        props: {
            fields: {
                type: Array,
                default() {
                    return []
                },
                validator: f => {return !!f},
            },
            inline: {
                type: [Boolean, String],
                default: false,
            },
        }, //, 'method', 'action'], // inline // trans / t9n

        data() {
            return {
                controls: []
            }
        },

        methods: {

            prepareFields(fields) {

                fields.forEach(f => {

                    // TODO if(this.isArray(f)) 

                    let fc = this.controls.find(c => c.name===f.name);

                    if(fc) {
                        fc.group = true;
                        // TODO check isCheck ?
                        fc.checked = (!fc.checked && f.checked) ? f.value : f.checked;
                        fc.values.push(f.value);
                        fc.fields.push(f);
                    }
                    else {
                        let isCheck = this.isCheck(f.type);
                        this.controls.push({group: false, isCheck: isCheck, name: f.name, fields: [f], checked: (f.checked ? f.value : !isCheck), values: [f.value]});
                    }

                });

                // TODO @DEV
                // console.warn("prepareFields / controls:", this.controls);
            },

            groupComponent(isGroup) {
                return isGroup ? 'fieldset' : 'div';
            },

            isCheck(type) {
                return ['checkbox', 'radio'].indexOf(type) !== -1;
            },

            isArray(f) {
                return f instanceof Array;
            },

            onInput(e) {
                // TODO @DEV
                console.log('onInput in ' + this.$options.name + ' > ' + e.target.name + ': ' + e.target.value + ' (' + typeof e.target.value + ')');

                // let _f = this.fields.find(f => f.name === e.target.name)
                // // if(_f) _f.value = e.target.value; 
                // console.warn('find field', _f);

                // this.$emit('input', e);

            },

            onFocus(e) {
                // TODO @DEV
                console.log('onFocus in ' + this.$options.name + ' > ' + e.target.name + ': ' + e.target.value + ' (' + typeof e.target.value + ')');

                // let _f = this.fields.find(f => f.name === e.target.name)
                // // if(_f) _f.value = e.target.value; 
                // console.warn('find field', _f);

                // this.$emit('input', e);

            },

            formChange(e) {
                // TODO @DEV
                console.warn('formChange!!!!!!!!!', e);
                //this.$emit
            },

            formSubmit(e) {

                e.preventDefault();

                // TODO validator
                let formData = new FormData(e.target);// TODO helper Submitter // TODO optional ifChanged

                for(let [name, value] of formData) {

                    let cntr = this.controls.find(f=>f.name===name);

                    if(cntr) {
                        //cntr.value = value;

                        // TODO @DEV
                        // console.log('... [' + name + '] find in this.controls', cntr, name, value);
                        if(cntr.isCheck && cntr.group) {
                            // TODO @DEV
                            console.warn('isCheck && group !!! [' + name + '] find in this.controls', cntr, name, value);
                        }
                    }
                }

                // TODO @DEV
                // console.warn('formSubmit in ' + this.$options.name);
                // console.warn('formSubmit in ' + this.$options.name, e, e.target, this.fields, formData);

                // this.$emit('submit', formData);
            }
        },

        // emits: ['input', 'focus', 'blur', 'submit'],

        mounted() {
            this.prepareFields(this.fields);
        }

    }
</script>

<style scoped>
.adm1n-form__inline {
    display: flex;
    align-items: center;
}
.adm1n-form-fieldset {
    border: 0 none;
    margin: 0;
    padding: 0;
    display: flex; /* ? check inline */
    /* flex-direction: row; */
    position: relative;
}

.adm1n-form-fieldset .adm1n-control__check + .adm1n-control__check {
    margin-left: 1rem;
}
/* .adm1n-form-fieldset {
    border: 0 none;
    margin: 0;
    padding: 0;
} */

</style>

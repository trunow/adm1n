<template>
    <div class="file-upload" :class="cls">
        <input type="file" 
                ref="input" 
                :id="id" 
                :name="name" 
                accept="image/*" 
                @change="changeFile"
        />
        <label :for="id" 
                :data-placeholder="placeholder" 
                :data-label="label" 
                class="file-preview" 
                :class="{'file-preview__rounded':rounded}" 
                :style="'background-image:url(\''+src+'\');width:'+width+';height:'+height+';'"
        ></label>
    </div>
</template>

<script>
import uniqueId from '../utils/uniqueId';

export default {
    name: 'adm1n-file',

    props: {

        value: {
            type: [String, Boolean, Array, Object],
            default: '',
        },

        //accept
        name: String,
        label: String,
        placeholder: String,
        form: String,
        //autofocus: Boolean,//TODO зачем?
        required: Boolean,
        rounded: Boolean,
        preview: String,
        id: {
            type: String,
            default () {
                return uniqueId('_adm1n_file_');
            },
        },
        class: {
            type: String,
            default: ''
        },
        width: {
            type: String,
            default: '64px'
        },
        height: {
            type: String,
            default: '64px'
        },
        // dataError: String,
    },

    data() {
        return {
            src: this.preview || '',
            cls: this.class || ''
        }
    },

    methods: {
        changeFile(e) {
            // console.log('changeFile', e, e.srcElement.files);
            let vm = this,
                file = e.srcElement.files[0],
                reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function(_e) {
                    // console.log('readAsDataURL:', _e.target.result);
                    vm.src = _e.target.result;
                };
        }
    },

    mounted() {
        if(this.form) this.$refs.input.setAttribute('form', this.form);
    }
}
</script>

<style scoped>
input[type="file"] {
    visibility: hidden;
    display:none;
}
.file-upload {
    margin-bottom: 10px;
}
.file-preview {
    /* width: 64px;
    height: 64px; */
    /* overflow: hidden; */
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-color: lightgrey;
    position: relative;
    cursor: pointer;
}
.file-preview__rounded,
.file-preview__rounded::before{
    border-radius: 50%;
}
.file-preview[data-placeholder]::before{
    content: attr(data-placeholder);
    position: absolute;
    width: 100%;
    font-size: 12px;
    height: 100%;
    /* top: 100%; */
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #0008;
    color: white;
    opacity: 0;
    transform: scale(0);
    transition: all .4s;
}
.file-preview[data-placeholder]:hover::before{
    top: 0;
    transform: scale(1);
    opacity: 0.9;
}
.file-preview[data-label]::after {
    content: attr(data-label);
    position: absolute;
    width: 100%;
    font-size: 12px;
    top: 100%;
    margin-top: 10px;
    opacity: 0.8;
    transition: all .4s;
}
.file-preview[data-label]:hover::after{
    opacity: 1;
}
</style>
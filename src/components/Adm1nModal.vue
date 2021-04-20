<template>
    <transition name="modal">
        <div v-if="showModal" :class="_class" :style="mstyle" @click.self="closeModal">
            
            <div class="adm1n-modal-container" :class="cclass" :style="cstyle">
                <a v-if="showCloser" class="adm1n-modal-close" aria-hidden="true" @click="closeModal">✕</a>

                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: "adm1n-modal",

    props: {
        open: {
            type: Boolean,
            default: false
        },
        blur: {
            type: Boolean,
            default: false //true
        },
        closeable: {
            type: [Boolean, String],
            default: true
        },
        delay: {
            type: Number,
            default: 0
        },
        place: {
            type: String,
            default: ""
        },
        mclass: {
            type: String,
            default: ""
        },
        mstyle: {
            type: String,
            default: ""
        },
        cclass: {
            type: String,
            default: ""
        },
        cstyle: {
            type: String,
            default: ""
        },
    },

    data() {
        return {
            localOpen: !!this.open
        }
    },

    computed: {
        _class() {
            let _cls = ['adm1n-modal'];

            if(String(this.place).toLowerCase().indexOf('top') > -1) _cls.push('adm1n-modal__top');
            if(String(this.place).toLowerCase().indexOf('bottom') > -1) _cls.push('adm1n-modal__bottom');
            if(String(this.place).toLowerCase().indexOf('left') > -1) _cls.push('adm1n-modal__left');
            if(String(this.place).toLowerCase().indexOf('right') > -1) _cls.push('adm1n-modal__right');

            // TODO variants of transitions ?

            if(this.blur) _cls.push('adm1n-modal__blur');

            if(this.mclass) _cls.push(String(this.mclass).trim());

            return _cls.join(" ");
        },

        openIsBool() {
            return (typeof this.open === "boolean")
        },

        showModal() {
            // return this.openIsBool ? this.localOpen : this.open;
            return this.localOpen || this.open;
        },

        showCloser() {
            return this.closeable && (typeof this.closeable === "string")
        }
    },

    methods: {
        closeModal() {
            if(this.closeable) this.$emit('close');
            if(this.openIsBool) this.localOpen = false;
        }
    },

    emits: ['close'],

    watch: {

        open(n) {
            if(n && this.delay) {
                if(this.openIsBool) this.localOpen = true;
                // TODO stop timer on hover ?
                setTimeout(() => {
                    this.closeModal();
                }, this.delay * 1000);
            }
        },

    }
}
</script>

<style scoped>
/* .adm1n-modal { display: none; }
.adm1n-modal--show { display: flex; } */

.modal-enter-active, 
.modal-leave-active {
    transition: opacity 1.5s;
}
.modal-enter, 
.modal-leave-to {
    opacity: 0;
}

.adm1n-modal {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9001;
}

.adm1n-modal__blur {
    background: rgba(0, 0, 0, 0.3);
}
.adm1n-modal__top {
    align-items: flex-start;
}
.adm1n-modal__left {
    justify-content: flex-start;
}
.adm1n-modal__bottom {
    align-items: flex-end;
}
.adm1n-modal__right {
    justify-content: flex-end;
}

.adm1n-modal-container {
    position: relative;
    width: calc(100vw - 4rem);
    max-width: calc(800px - 4rem);
    max-height: calc(100vh - 4rem);
    overflow-y: auto;
    padding: 1rem;
    margin: 1rem;
    background: #fff;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.3);
}

.adm1n-modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    text-decoration: none;
    color: red;
    opacity: 0.5;
}
.adm1n-modal-close:hover {
    cursor: pointer;
    opacity: 1;
}
</style>

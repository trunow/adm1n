<template>
    <div class="dropdown" :class="dClass">

        <div class="dropdown-toggle" @click.prevent.stop="onClick">
            <slot></slot>
        </div>

        <div class="dropdown-box" v-if="hasDropdownSlot">
            <slot name="dropdown"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'adm1n-dropdown',

    props: ['on', 'class'], // TODO надо ли уметь закрывать какие-нибудь другие открытые (в родителе, по таргету) по открытию этого ?

    data() {
        return {
            open: false
        }
    },

    computed: {
        hasDropdownSlot() {
            return !!this.$slots.dropdown
        },
        dClass() {
            let _cls = {
                'dropdown__onclick': this.on==='click', 
                'dropdown__opened': this.open
            }
            if(this.class) {
                if(typeof this.class === "string") {
                    this.class.split(" ").forEach(c => {
                        _cls[c] = true;
                    });
                }
            }
            return _cls;
        }
    },

    methods: {
        onClick(e) {
            if(this.on === 'click') {
                console.log('onClick', e); // TODO @DEV
                this.open = !this.open;
            }
            this.$emit('click', e);
        }
    },

    emits: ['click'],

    mounted() {
        // console.log(this.$options.name); // TODO @DEV//, this.$slots)
    }


}
</script>

<style scoped>
.dropdown {
    position: relative;
}
.dropdown-box {
    display: none;
    position: absolute;
    margin-top: 4px;
    margin-right: -4px;
    background-color: white;
    box-shadow: 0 0 8px #2f2f2f55;
    z-index: 8001;
    right: 0;
}
.dropdown-box::before {
    content: "";
    display: block;
    border: 6px solid transparent;
    border-top-color: white;
    border-left-color: white;
    top: -6px;
    right: 12px;
    position: absolute;
    z-index: -1;
    box-shadow: -3px -3px 4px #2f2f2f25;
    transform: rotate(45deg);
    width: 0px;
    height: 0px;
}
.dropdown__onclick.dropdown__opened > .dropdown-box,
.dropdown:not(.dropdown__onclick):hover > .dropdown-box {
    display: block;
}
</style>
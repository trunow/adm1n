<template>
    <teleport :to="'body'">
        <div class="adm1n-notifies" v-if="notifies.length">
            <transition-group name="list" tag="div" class="adm1n-notifies-notify">
                <adm1n-notify v-for="notice in notifies" 
                              :notice="notice" 
                              :key="notice" 
                              @close="close" 
                              style="position:relative;"
                >
                </adm1n-notify>
            </transition-group>
        </div>
    </teleport>
</template>

<script>
import Adm1nNotify from './Adm1nNotify.vue';

export default {
    name: 'adm1n-notifies',

    data() {
        return {
            notifies: [],
        }
    },

    components: {
        Adm1nNotify
    },

    methods: {
        push(notice) {
            this.notifies.push(notice);
        },

        close(c) {
            let x = this.notifies.findIndex(n => c === n);
            this.notifies.splice(x, 1);
        }
    },

    created() {
        // sub
        this.$bus.on("notify", this.push);
    },
}
</script>

<style scoped>
.adm1n-notifies {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9990;
}
.adm1n-notifies > .adm1n-notifies-notify {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: flex-end;
}

.list-enter-active {
    opacity: 0;
}
.list-leave-active {
    transition: all 0.5s;
}
.list-enter-to {
    animation: itemEnter 0.8s;
}
.list-leave-to {
    opacity: 0;
    transform: translateX(150%);
}

@keyframes itemEnter {
    from {
        opacity: 0;
        transform: translateX(150%);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}
</style>

<template>
    <teleport to="body">
        <div v-if="message" class="adm1n-notify">
            <div>
            {{ message }}
            <button @click="close">
                x
            </button>
            </div>
        </div>
    </teleport>
</template>

<script>
export default {
    name: 'adm1n-notify',

    data() {
        return {
            message: null,
        };
    },

    methods: {
        open (message) {
            this.message = message;
        },
        close () {
            // this.$bus.off("message", this.open); // так это убивает
            this.message = null;
        }
    },

    created() {
        // sub
        this.$bus.on("message", this.open);
    }

}
</script>

<style scoped>
    .adm1n-notify {
        position: fixed;
        top: 0;
        right: 0;
        background: lightblue;
        padding: 1rem;
        margin: 1rem;
        z-index: 9001;
    }
</style>
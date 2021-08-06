<template>
    <div v-if="notice" 
        :class="[{'adm1n-notify_nobody': !notice.body, 'adm1n-notify_icon': !notice.icon}, notice.class, 'adm1n-notify_'+(notice.level||'info'), 'adm1n-notify']" 
        :style="notice.style"
    >
        <div v-if="notice.icon" class="adm1n-notify-icon">
            <template v-if="notice.iconAs==='img'">
                <img :src="notice.icon">
            </template>
            <template v-else-if="notice.iconAs==='css'">
                <i :class="notice.icon"></i>
            </template>
            <template v-else>
                {{ notice.icon }}
            </template>
        </div>

        <div class="adm1n-notify-text">
            <h3 v-if="notice.title" class="adm1n-notify-title">
                {{ notice.title }}
            </h3>
            <p class="adm1n-notify-body">
                {{ notice.body }}
            </p>
        </div>
        <div v-if="!notice.forever" class="adm1n-notify-closer" @click="$emit('close', notice)"></div>
    </div>
</template>

<script>
export default {
    name: 'adm1n-notify',

    props: {
        notice: {
            type: Object,
            default: null
        }
    },

    emits: ['close'],

    created() {
        if(this.notice && this.notice.delay) {
            setTimeout(()=>{
                this.$emit('close', this.notice);
            }, this.notice.delay*1000);
        }
    }

}
</script>

<style scoped>
.adm1n-notify {
    background-color: white;
    padding: 1rem 2rem 1rem 1rem;
    margin: 0.5rem 1rem;
    box-shadow: 0 0 4px #cccc;
    position: fixed;
    flex: 0 1 auto;
    display: inline-flex;
    min-width: 120px;
    z-index: 9991;
}
.adm1n-notify_success {
    color: var(--text-success-color);
    box-shadow: 0 0 4px var(--text-success-color);
}
.adm1n-notify_success:hover {
    color: var(--text-color);
}
.adm1n-notify_warning {
    background-color: var(--bg-warning);
    box-shadow: 0 0 4px var(--bg-warning);
}
.adm1n-notify_danger {
    color: white;
    background-color: var(--text-danger-color);
    box-shadow: 0 0 4px var(--text-danger-color);
}

.adm1n-notify-icon {
    margin-right: 0.5rem;
}
.adm1n-notify-icon img {
    max-width: 64px;
    max-height: 64px;
}

.adm1n-notify-closer {
    position: absolute;
    top: 0;
    right: .25rem;
    font-family: monospace;
    font-size: 2rem;
    line-height: 1;
    opacity: 0.5;
    color: var(--text-danger-color);
}
.adm1n-notify-closer:hover {
    cursor: pointer;
    opacity: 1;
}
.adm1n-notify_danger .adm1n-notify-closer {
    color: white;
}

.adm1n-notify-closer::after {
    content: "×"
}
/* .adm1n-notify.adm1n-notify_left {} */

.adm1n-notify-title {
    margin: 0;
}
.adm1n-notify-body {
    margin: 0;
}
.adm1n-notify-title + .adm1n-notify-body {
    margin-top: 0.5rem;
}
</style>
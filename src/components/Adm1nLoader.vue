<template>
    <div :class="[{'adm1n-loader-wrapper': (loading && wrapper)}, wrapperClass]">
        <div v-if="loading" class="adm1n-loader" :class="{'adm1n-loader_logo': logo}"></div>
        <slot v-if="!wait || !loading"></slot>
    </div>
</template>

<script>
export default {
    name: 'adm1n-loader',

    props: {
        wrapperClass: {
            type: [String],
            default: ''
        },
        loading: {
            type: [Boolean, String],
            default: true
        },
        wrapper: {
            type: Boolean,
            default: false
        },
        logo: {
            type: Boolean,
            default: false
        },
        wait: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped>
.adm1n-loader-wrapper {
    position: relative;
    min-height: calc(4 * 64px);
    opacity: 0.7;
}

.adm1n-loader-wrapper::before {
    content: "";
    display: flex;
    background-color: #fff5;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    z-index: 7001;
    left: 0;
}

.adm1n-loader {
    position: absolute;
    width: 64px;
    height: 64px;
    top: calc(50% - 32px);
    left: calc(50% - 32px);
    color: var(--bg-primary);
    border-radius: 50%;
    z-index: 7002;
}

.adm1n-loader_logo {
    position: absolute;
    transform: scale(0.5);
    background-color: #fff8;
    top: -16px;
    right: -16px;
}

.adm1n-loader::before,
.adm1n-loader::after {
    content: "";
    box-sizing: border-box;
    position: absolute;
    width: 100%;
    height: 100%;
}

.adm1n-loader::before,
.adm1n-loader::after {
    border: 4px solid transparent;
    border-radius: 50%;
    border-color: currentColor transparent transparent transparent;
    animation: loading 1.2s cubic-bezier(0.55, 0.25, 0.25, 0.55) infinite;
}

.adm1n-loader::after {
    animation-delay: 0.2s;
    border-color: transparent currentColor transparent transparent;
}
</style>
<template>
    <span v-if="$slots.default" class="adm1n-plank">
        <i v-if="$props.onClose" class="adm1n-plank-closer" @click="$emit('close', $event)"></i>
        <slot></slot>
    </span>
</template>

<script>
export default {
    name: 'adm1n-plank',

    props: {
        onClose: {
            type: Function,
            default: null
        }
    },
}
</script>

<style scoped>
/* TODO import vars */
.adm1n-plank {
    display: inline-flex;
    align-items: center;
    background-color: var(--bg-light-hover);/* TODO import vars */
    padding: 0.1rem 0.5rem;
    position: relative;
    white-space: nowrap;
    border-radius: 0.5rem;
}
.adm1n-plank .adm1n-plank-text {}
.adm1n-plank .adm1n-plank-closer {
    display: flex;
    order: 99;
    margin-left: 0.5rem;
    opacity: 0.8;
    transition: opacity 0.4s;
}
.adm1n-plank .adm1n-plank-closer:hover {
    cursor: pointer;
    opacity: 1;
}
.adm1n-plank .adm1n-plank-closer:after {
    content: "×";
    font-size: 1.6rem;
    line-height: 0;
    color: var(--bg-danger);
}
</style>
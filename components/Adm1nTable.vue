<template>

    <div class="table-container">
        <table v-if="data.length" class="table" :class="tclass">
            <thead>
                <tr>
                    <template v-for="(h,n) in cols" :key="'th_' + n">
                        <th :class="h.hclass||''" :style="h.hstyle||''">
                            <slot v-if="h.hslot" :name="h.hslot"></slot>
                            <span v-else>{{ h.label || h.name  }}</span>
                        </th>
                    </template>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(d, i) in data" :key="'tr_' + i" @click="trClick($event, d, i)">
                    <template v-for="(c, j) in cols" :key="'td_' + j">
                        <td :class="c.class||''" :style="c.style||''">
                            <slot v-if="c.slot" :name="c.slot" :tr="d"></slot>
                            <component v-else :is="c.tag||'span'">
                                {{ $_.get(c.name, d) || "?" }}
                            </component>
                        </td>
                    </template>
                </tr>
            </tbody>
        </table>
        <p v-else-if="noDataText" class="table-no-data-text">{{ noDataText }}</p>
    </div>

</template>

<script>
// TODO import utils/_.get
export default {
    name: 'adm1n-table',

    props: ['columns', 'fields', 'class', 'noDataText'],

    data() {
        return {
            tclass: this.class,
            cols: this.columns,
            data: this.fields
        }
    },

    methods: {
        trClick(e, d, i) {
            this.$emit('trClick', e, d, i);
        },
    },

    mounted() {
        // TODO @DEV
        console.log(this.$options.name);
    },
}
</script>

<style>
.table-container {
    max-width: 100vw;
}
.table {
    width: 100%;
    text-align: left;
}
.table th,
.table td {
    padding: .2rem;
}
.table th:last-child,
.table td:last-child {
    /* text-align: right; */
    display: flex;
    justify-content: center;
}

.table > tbody > tr:hover {
    background-color: #ddd5;
}
/* @media screen and (max-width: 1024px) { */
@media screen and (max-width: 800px) {
    .table-container {
        overflow: auto;
    }
    .table {
        max-width: 100%;
        /* display: block; */
    }
}
.table-no-data-text {
    text-align: center;
    opacity: 0.6;
}

.table.x {
    background-color: #ddd8;
}
</style>

<template>
    <div class="adm1n-select" :class="{'adm1n-select__nolabel': !label}" :data-error="dataError" @mouseleave="vsLeave">
        <label v-if="label" class="adm1n-select-label">{{ label }}</label>
        <ul class="adm1n-select-control">
            <li class="sid" v-for="c in checked" :key="c.id" :data-id="c.id">
                <adm1n-plank @close="unsl">{{ c.text }}</adm1n-plank>
            </li>
            <li class="sid sidi">
                <input type="text" 
                       class="adm1n-select-input"
                       :placeholder="placeholder||'...'" 
                       :value="q"
                       @focus="inpFocus" 
                       @blur="inpBlur" 
                       @input="inpInput" 
                       @keydown.up="keyUp" 
                       @keydown.down="keyDown" 
                       @keydown.enter="keyEnter" 
                       @keydown.backspace="keyBackspace" 
                       ref="inpt"
                />
            </li>
        </ul>
        <div style="position:absolute;bottom:0;width:100%;height:auto;">
            <ul class="adm1n-select-options" v-show="opened" @mouseleave="ulLeave">
                <li v-for="(v,ix) in _filtered" 
                    :key="v.id" 
                    class="ssd" 
                    :class="{'hovered': (hoverIx===ix)}" 
                    @mouseover="ulOver(ix)" 
                    @click="LiClick"
                >
                    <span>{{ v.text }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Adm1nPlank from './Adm1nPlank.vue';

export default {
    name: 'adm1n-select',
    
    props: {
        options: {
            type: [String, Array, Object],
            default: '' 
        }, 
        value: {
            type: [String, Array, Object],
            default: ''
        }, 
        label: {
            type: String,
            default:''
        }, 
        placeholder: {
            type: String,
            default:''
        },
        dataError: {
            type: [Array, String],
            default: ''
        },
    },

    components: {
        Adm1nPlank
    },

    data() {
        return {
            q: '',
            checked: [],
            values: [],
            hoverIx: null,
            opened: false,
        }
    },

    computed: {

        _filtered() {
            return [...this.values].filter(v => v.text.toUpperCase().indexOf(this.q.toUpperCase()) > -1);
        },

        _hovered() {
            return (this.hoverIx !== null);
        },

        _focused() {
            return (this.$refs.inpt === document.activeElement);
        },

        _opened() {
            // return this._focused || this._hovered;
            return this._hovered;
        }
    },

    methods: {

        ulOpen() {
                // TODO if values.length ? computed ?
            // this.focused = true;
            if(this.hoverIx === null && this._filtered.length) this.hoverIx = 0;
            this.opened = true;
        },

        ulClose() {
            // this.focused = false;
            this.hoverIx = null;
            this.opened = false;
        },

        ulOver(ix){
            this.hoverIx = ix;
            // TODO isOver/isLeave ????????
        },

        ulLeave(){
            // if(!this._focused) this.hoverIx = null;
            // this.hoverIx = null;
        },

        vsLeave(){
            // console.log('vsLeave', this._focused, this._hovered, this.hoverIx, this.$refs.inpt);
            // if(!this._focused) 
            this.hoverIx = null;
        },  

        inpFocus() {
                // TODO if values.length ? computed ?
            this.ulOpen();
        },

        inpBlur() {

            console.log('inpBlur', this._focused, this._hovered, this.hoverIx, this.$refs.inpt);

            if(this.hoverIx === null) this.ulClose();
        },

        inpInput(e) {
            this.q = e.target.value;
            if(this._filtered.length) this.hoverIx = 0;
        },

        keyUp() {
            // if(!this.focused) this.ulOpen();
            this.hoverIx = (this._filtered.length) ? (this.hoverIx ? this.hoverIx-1 : this.values.length-1) : null;
        },
        keyDown() {
            // if(!this.focused) this.ulOpen();
            this.hoverIx = (this._filtered.length) ? ((this.hoverIx!==null && this.hoverIx < this.values.length-1) ? this.hoverIx+1 : 0) : null;
        },
        keyEnter() {
            if(!this.focused) this.ulOpen();
            if(this.hoverIx !== null) this.slct();
        },
        keyBackspace() {
            if(!this.q && this.checked.length) {
                let last = this.checked.pop();
                this.push(this.values, last);
                this.values = this._sort(this.values, 'id');
            }
        },


        LiClick() {
            this.slct();

            // console.warn("LiClick", this.$refs.inpt);
            this.$refs.inpt.focus();
        },

        slct() {
            // let _hoverIx = (this.values.length) ? ((this.hoverIx!==null && this.hoverIx < this.values.length-1) ? this.hoverIx : 0) : null;
            // this._filtered
            let _hoverIx = (this.values.length && this.hoverIx!==null && this.hoverIx <= this.values.length-1) ? this.hoverIx : null;

            if(this._hovered) {
                let _value = this.values[_hoverIx];

                // if(this._filtered.length) 
                this.pull(this.values, _hoverIx);
                this.push(this.checked, _value);

                this.hoverIx = null;
            }

            this.q = "";
            // console.warn('slct', this.hoverIx);

            this.change(); // TODO or watch checked ???
            
        },

        unsl(e) {

            // console.warn("unsl", e);
            // return false;

            let el = e.target,
                id = el.parentElement.parentElement.dataset.id,
            ci = this.checked.findIndex(f => f.id == id);
    
            this.push(this.values, this.checked[ci]);
            this.pull(this.checked, ci);
            this.values = this._sort(this.values, 'id');
            this.hoverIx = null;

            // this.ulOpen();
            this.$refs.inpt.focus();

            this.change(); // TODO or watch checked ???
        },

        change() {
            //TODO emit or watch checked ???
            // console.warn('change!!!', this.checked);
            this.$emit('change', this.checked);
        },
        
        push(a, v) {
            a.push(v);
        },

        pull(a, i) {
            a.splice(i, 1);
            a = this._sort(a);
        },

        _uniq(a, r) {
            return r.length ? a.filter(el => !r.find(re => re.id == el.id)) : a;
        },

        _sort(arr, k = 'text') { //id // TODO params sortKey ???
            const byKey = (a, b) => {
                let ak = a[k],
                    bk = b[k];
                if(typeof ak == "string") ak = ak.toUpperCase();
                if(typeof bk == "string") bk = bk.toUpperCase();
                if (ak > bk) return 1;
                if (ak < bk) return -1;
                // a == b
                return 0;
            }
            return arr.slice().sort(byKey);
        },

        _setAsObj(something = null) { // сделать второй параметр, чтобы запоминать входной формат отдельно опций и выбранных - и отдавать в том же ??
            
            if(!something) something = isFinite(parseFloat(something)) ? [something] : [];
            if(typeof something !== 'object') something = isFinite(something) ? [something] : (something ? [something.toString()] :[]);

            if(!(something instanceof Array)) something = [something];

            // нам нужен Array в формате [{id,text}]
            // TODO validate ?
            return something.map((s,i) => {
                if (typeof s === 'object') {
                    return {id: (s.id || s.value || "_object_" + i), text: (s.text || s.label || s.name || s.value || s[Object.keys(s)[0]])};
                }
                else if(typeof s === 'string' || isFinite(s)) {
                    return {id: "_string_" + i, text: s};
                }
            });
            
        },
    },

    emits: ['change'],

    created() {

        let _value = this._setAsObj(this.value),
            _options = this._setAsObj(this.options);

        this.checked = _value;
        this.values = this._uniq(_options, _value);

        console.warn(this.options, _options, this.value, _value, this.values);
    },
}
</script>

<style scoped>
.adm1n-select {
    position: relative;
}
.adm1n-select-control {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    font-size: var(--font-size);
    line-height: var(--line-height);
    border: 1px solid  var(--border-color);
}
.adm1n-select-label {
    display: flex;
    color: var(--label-color);
    opacity: .8;
    font-size: .8rem;
    line-height: 1rem;
    margin-bottom: 0.5rem;
    position: relative;
    max-width: 100%;
}
.adm1n-select-control .sid {
    display: inline-flex;
    padding: 2px;
}

.adm1n-select-control .sidi {
    flex: auto;
    padding: 0;
}
.adm1n-select-control .sidi .adm1n-select-input {
    min-width: 200px;
    width: calc(100% - 2px);
    box-sizing: border-box;
    font-size: var(--font-size);
    line-height: var(--line-height);
    padding: var(--input-padding);
    height: var(--input-height);
    border: 0 none;
}
.adm1n-select-control .sidi .adm1n-select-input:focus {
    outline: none;
}

.adm1n-select[data-error]:not([data-error=""]) {
    margin-bottom: 1rem;
}
.adm1n-select[data-error]:not([data-error=""]),
.adm1n-select[data-error]:not([data-error=""]) .adm1n-select-label,
.adm1n-select[data-error]:not([data-error=""]) .adm1n-select-input {
    color:  var(--text-danger-color) !important;
}
.adm1n-select[data-error]:not([data-error=""]) .adm1n-select-control {
    border-color:  var(--text-danger-color) !important;
}
.adm1n-select[data-error]:not([data-error=""])::after {
    content: attr(data-error);
    color:  var(--text-danger-color) !important;
    position: absolute;
    font-size: 0.8em;
    line-height: 1rem;
    right: 0;
    top: 0;
}
.adm1n-select.adm1n-select__nolabel[data-error]:not([data-error=""])::after {
    top: auto;
}

.adm1n-select-options {
    position: absolute;
    display: block;
    list-style: none;
    font-size: 14px;
    border: 1px solid var(--border-color);
    box-sizing: border-box;
    border-top: none;
    width: 100%;
    padding: 0;
    z-index: 888;
    margin: 0;
    top: -1px;
    box-shadow: var(--box-shadow);
}
.adm1n-select-options .ssd {
    display: block;
}
.adm1n-select-options .ssd span {
    display: block;
    background-color: white;
    border-top: 1px solid  var(--border-color);
    padding: 4px 8px;
}
.adm1n-select-options .ssd.hovered span {
    cursor: pointer;
    background-color:  var(--bg-light);
}
/* .adm1n-select-options .ssd span:hover {
    cursor: pointer;
    background-color:  var(--border-color);
} */
.adm1n-select-options .ssd span:first-of-type span {
    border-top: 0 none;
}
</style>
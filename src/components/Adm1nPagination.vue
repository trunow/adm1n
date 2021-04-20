<template>
  <div class="adm1n-pagination">
    <nav class="adm1n-paginator" role="navigation" v-if="showLinks">
        <a v-for="(l, i) in visibleLinks" 
           :key="'link_'+i" 
           class="adm1n-paginate" 
           :class="{'adm1n-paginate_active': l.active, 'adm1n-paginate_dots': !l.url}" 
           :data-href="l.href"
           @click.prevent="onClick"
        >
          {{ l.label }}
        </a>
    </nav>
  </div>
</template>

<script>
export default {
  name: "adm1n-pagination",

  props: {
    meta: {
      type: Object,
      default: null,
    },
    hideone: {
      type: Boolean,
      default: true,
    },
    onChange: {
      type: Function,
      default: null,
    },
  },

  data() {
    return {
      page: 0
    };
  },

  computed: {

    hasMeta() {
      return (this.meta && Object.keys(this.meta).length);
    },

    links() {

      let links = [];

      if(this.hasMeta && this.meta.links?.length) {
        
        //this.meta.links.slice(1);
        links = this.meta.links.map(l => {
            
            let hasUrl = (l.url+"").search(/\?/g) != -1,
                oroutes = hasUrl ? l.url.split("?") : ["", ""];

            l.opath = oroutes[0];
            l.osearch = oroutes[1];
            l.oquery = l.osearch ? this.parseQuery(l.osearch) : {};
            l.query = Object.assign({...this.$route.query}, l.oquery);
            l.queryString = hasUrl ? "?" + (new URLSearchParams(l.query).toString()) : "";
            l.href = l.queryString;
            l.label = (!hasUrl && l.label !== "...") ? "" : this.parseLabel(l.label);

            // TODO надо ли делать это на бэке ?
            
            return l;
        });
      }

      return links;
    },

    visibleLinks() {
      return this.links.filter(l => l.label);
    },

    showLinks() {
      return this.visibleLinks.length > (this.hideone ? 1 : 0);
    },
  },

  methods: {
    
    onClick(e) {
      let _href = e.target.dataset.href,
          _link = this.links.find(l=>l.href===_href);
          
      if(_link) {

        _link.path = this.$route ? this.$route.path : window.location.pathname; // TODO

        if(this.$props.onChange) {
          this.$emit("change", _link);
        }
        else {
          this.$router.push({path: _link.path, query: _link.query});
          //TODO if(!router!hash) window.location.search = _href;
        }

      }

    },

    parseQuery(search){
      let _search = search ? search.replace(/^\?/, '').trim() : "",
          _query = {};

      if(_search) {
        _query = this.$router && this.$router.options && this.$router.options.parseQuery 
              ? this.$router.options.parseQuery(_search) 
              : JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
      }

      return _query;
   },

    parseLabel(l) {
      if(String(l).trim().search(/[^\d.]+/gi, "") > -1) {
        let nl = String(l).trim().toLowerCase().split(" ").map(w => w.replace(/&[\w]+;/gi, "")).filter(w=>w).join(".");
        if(nl) {
          l = nl;
          // l = this.__("pagination." + nl); // TODO ???
        }
      }
      return l;
    },

  },

  mounted() {
    // TODO @DEV
    // this.page = this.hasMeta ? this.meta.current_page : 0;
  },
};
</script>

<style scoped>
.adm1n-pagination {
    display: flex;
    justify-content: center;
    margin: 2rem 0;
}
.adm1n-paginator {
    display: flex;
    flex-wrap: wrap;
}
.adm1n-paginator .adm1n-paginate {
    font-size: 0.8rem;
    color: #2c2c35;
    text-decoration: none;
    background-color: #fec85b;
    padding: 6px 10px 4px;
    border-radius: 25px;
    line-height: 1rem;
    margin: 0 4px 0 0;
    min-width: 8px;
    text-align: center;
}
.adm1n-paginator .adm1n-paginate:hover {
    background-color: #ffbd37;
    cursor: ponter;
}
.adm1n-paginator .adm1n-paginate_active {
    background-color: #ffffff;
    border: 1px solid #2c2c35;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    font-weight: bold;
}
.adm1n-paginator .adm1n-paginate_active:hover {
    background-color: #ffffff;
}
.adm1n-paginator .adm1n-paginate_dots {
    margin: 0 8px 0 0;
    background-color: #ffffff;
    border: 0 none;
}
.adm1n-paginator .adm1n-paginate_dots:hover {
    background-color: #ffffff;
    cursor: default;
}
</style>
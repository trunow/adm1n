<template>
    <teleport :to="'body'">
        <div class="adm1n-notifies" v-show="notifies.length">
            <transition-group name="list" tag="div" class="xxxxx">
                <div v-for="(n,i) in notifies" 
                    class="adm1n-notify"
                    :class="[{'adm1n-notify_nobody': !n.body, 'adm1n-notify_icon': !n.icon}, n.class]" 
                    :style="[{order: 1}, n.style]"
                    :key="'notify_' + i" 
                >
                    <div v-if="n.icon" class="adm1n-notify-icon">
                    [{{ n.icon }}]
                    </div>
                    <div class="adm1n-notify-text">
                    <h3 class="adm1n-notify-title">
                        {{ n.title }}
                    </h3>
                    <p v-if="n.body" class="adm1n-notify-body">
                        {{ n.body }}
                    </p>
                    </div>
                    <div v-if="!n.forever" class="adm1n-notify-closer" @click="close(i)"></div>
                </div>
            </transition-group>
        </div>
    </teleport>
</template>

<script>
export default {
    name: 'adm1n-notifies',

    data() {
        return {
            notifies: [
                {title: "title1", body: "body1", icon: "", class: "", style: "", iconAs: false},
                {title: "title2", body: "body2", icon: "", class: "", style: {"alignSelf":"center"}, iconAs: false},
                {title: "title3", body: "body2", icon: "", class: "", style: "", iconAs: false},
                {title: "title4", body: "body2", icon: "", class: "", style: "", iconAs: false},
                {title: "title5", body: "body2", icon: "", class: "", style: "", iconAs: false},
                {title: "title6", body: "body2", icon: "", class: "", style: "", iconAs: false},
                {title: "long-title7", body: "body2", icon: "", class: "", style: "", iconAs: false},
                {title: "long-long-looong-loooooong-title8", body: "body2", icon: "", class: "", style: "", iconAs: false},
                {title: "title2", body: "body2", icon: "", class: "", style: "", iconAs: false},
                {title: "title2", body: "body2", icon: "", class: "", style: "", iconAs: false},
                {title: "title2", body: "body2", icon: "", class: "", style: "", iconAs: false},
                {title: "title2", body: "body2", icon: "", class: "", style: "", iconAs: false},
                {title: "title2", body: "body2", icon: "", class: "", style: "", iconAs: false},
            ]
        }
    },

    methods: {
        close(x) {
            this.notifies.splice(x, 1);
        }
    }	
}
</script>

<style scoped>
.adm1n-notifies {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    min-height: 100vh;
    background-color: #0003;
}
.adm1n-notifies > div {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: flex-end;
    width: 100%;
    height: 100%;
}
.adm1n-notifies .adm1n-notify {
    background-color: lightblue;
    padding: 1rem;
    margin: 1rem;
    box-shadow: 0 0 4px #cccc;
    background-color: lightblue;
    position: relative;
    flex: 0 1 auto;
    display: inline-flex;
    /* width: 30%; */
    order: 1;
    min-width: 120px;
}
/* .adm1n-notify {} */
.adm1n-notify-closer {
    position: absolute;
    top: .5rem;
    right: .5rem;
}
.adm1n-notify-closer::after {
    content: "×"
}
/* .adm1n-notify.adm1n-notify_left {
  
} */
.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(150%);
  /* height: 0; */
}
</style>

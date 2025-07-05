<template>
    <nav class="mij-header shadow-sm sticky-top navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div class="container">
            <img class="logo" src="/favicon.webp" @click="goto('')"/>
            <div class="d-flex" style="height: 40px;">
                <div class="menu-mobile-container" v-click-outside="closeMenu" :style="openMenu?'display: flex !important;':''">
                    <MenuItem :menus="menus"/>
                </div>
                <div class="mx-2" style="align-content: center;">
                    <!-- <i class="fa fa-cart-shopping"/> -->
                     <CartNav />
                </div>
                <div class="mx-2" style="align-content: center;">
                    <i class="fa fa-search"/>
                </div>
                <div>
                    <i class="fa fa-bars menu-mobile" @click.stop.prevent="toggleMenu()"/>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import module from "../constant/module.js";
import MenuItem from "./MenuItem.vue";
import CartNav from "./CartNav.vue";

export default{
    components: {
        MenuItem, CartNav
    },
    data(){
        return{
            menus: [],
            openMenu: false
        }
    },
    async created(){
        this.menus = await this.getAll()
    },
    methods:{
        ...mapActions(module.menu.name, ["getAll","create", "getById", "update"]),
        toggleMenu(){
            this.openMenu = true
        },
        closeMenu(){
            this.openMenu = false
        },
        goto(url, query) {
            var content = document.getElementById("mij-content");
            if (content) {
                content.scrollTo({ top: 0, behavior: "smooth" });
            }

            setTimeout(() => {
            this.$router.replace({ path: `/${url}`, query: query});
            }, 50);
        
        },
        
    }
}
</script>

<style>
/* .mij-header{
    height: 50px;
    background: white;
    position: fixed !important;
    top: 0;
    position: relative;
    padding: 4px 12px;
    display: flex;
    justify-content: space-between;
    z-index: 3;
    width: 100%;
    border-bottom: 1px solid #dedede;
    box-shadow: 0px 0px 30px 1px rgba(0,0,0,0.1);
} */
.logo{
    width:40px;
    height: 40px;
}
.menu-container{
    display: flex;
    gap: 16px;
    align-items: center;
}
.menu-label{
    font-size: 12px;
    font-family: PT Sans, Helvetica Arial;
    font-weight: 600;
    cursor: pointer;
    color: black;
}
.menu-label:hover{
    color: var(--gold);
}
.menu-mobile-container
{
    display: flex;
    gap: 12px;
    height: 100%;
}
.menu-mobile{
    display: none;
}
@media screen and (max-width: 800px) {
    .menu-mobile-container{
        position: absolute;
        width: 300px;
        max-width: 80%;
        background: white;
        display: none;
        flex-direction: column;
        top: 60px;
        right: 10px;
        height: unset;
        padding: 10px;
        border: 1px solid #dedede;
        border-radius: 8px;
    }
    .menu-mobile{
        display: block;
        cursor: pointer;
        height: 100%;
        align-content: center;
        width: 30px;
        text-align: center;
    }
}
</style>
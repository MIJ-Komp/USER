<template>
    <div v-for="menu in menus" class="menu-item-container" :class="isChild? 'menu-item-child-container':''" @mouseover="menu.open = true" @mouseleave="menu.open= false">
            <div @click.prevent="goto(menu)" :class="isChild? 'menu-child':'menu'">
                <div class="menu-label me-3">{{menu.name}}</div>
                <i v-if="menu.items && menu.items.length > 0" 
                    :class="!isChild ? (!menu.open ? 'fa fa-angle-down' : 'fa fa-angle-up'):
                (!menu.open ? 'fa fa-angle-right' : 'fa fa-angle-left')"/>
            </div>

            <div :class="!isChild ? 'menu-item' : 'menu-item-child'" v-if="menu.items && menu.items.length > 0 && menu.open">
                <NavMenu :menus="menu.items" :isChild="true"/>
            </div>
    </div>

    <div v-for="menu in menus" class="menu-item-mobile ps-2 pt-2">
            <div style="display: flex; justify-content: space-between;">
                <div class="menu-label me-3" @click.stop.prevent="goto(menu)">{{menu.name}}</div>
                <i @click="menu.open = !menu.open" v-if="menu.items && menu.items.length > 0" 
                :class="!menu.open ? 'fa fa-angle-right' : 'fa fa-angle-down'"/>
            </div>

            <div v-if="menu.items && menu.items.length > 0 && menu.open">
                <NavMenu class="ms-3" :menus="menu.items" :isChild="true"/>
            </div>
    </div>
</template>

<script>

export default{
    props:{
        isChild:{ default: false},
        menus:{
            default: ()=>[]
        }
    },
    methods:{
        goto(menu) {
         menu.open = false
         
            // this.$router.replace(`/${url}`);
            this.$router.replace({ path: `/${menu.path}` }).then(() => {
               window.location.reload();
            });
      },
    }
}
</script>

<style>
.menu-item-container{
    width: fit-content;
    position: relative;
    cursor: pointer;
    height: 100%;
}
.menu-item-container:hover{
    color: var(--gold);
}
.menu-item-child-container{
    width: 100%;
}
.menu-child{
    padding: 8px 0;
    border-bottom: 1px solid #dedede;
    padding-right: 10px;
    align-items: center;
    width: 100%;
    display: flex;
    height: 100%;
    justify-content: space-between;
}
.menu{
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: space-between;
}
.menu-item{
    width: 250px;
    min-width: 250px;
    background: white;
    padding: 12px;
    border-radius: 4px;
    position: absolute;
    border-top: 2px solid #ffce42;
    top: 40px;
    left: 0px;
}
.menu-item-child{
    width: 250px;
    min-width: 250px;
    background: white;
    padding: 12px;
    border-radius: 4px;
    position: absolute;
    border-top: 2px solid #ffce42;
    top: 0px;
    left: 220px;
}
.menu-item-mobile{
        display: none;
}
@media screen and (max-width: 800px) {
    .menu-item-container{
        display: none;
    }
    .menu-item-mobile{
        display: block;
    }
}
</style>
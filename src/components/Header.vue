<template>
<div class="mij-header">
    <img class="logo"/>
    <div class="menu-container">
        <div class="menu-label">HOME</div>
        <div v-for="menu in menus">
            <div class="menu-label">{{menu.name}}</div>
            <i v-if="menu.items && menu.items.length > 0" class="fa fa-angle-down"/>
        </div>
        <div class="menu-label">PORTOFOLIO</div>
        <div class="menu-label">CONTACT US</div>
        <i class="fa fa-cart"/>
        <i class="fa fa-search"/>
    </div>
</div>
</template>

<script>
export default{
    data(){
        return{
            menus:[
                {
                    name: "SPECIAL SERIES",
                    items: [

                    ]
                },
                {
                    name: "DESKTOP PC",
                    items: [

                    ]
                },
                {
                    name: "KOMPONEN PC",
                    items: [

                    ]
                },
                {
                    name: "MONITOR",
                }
            ]
        }
    }
}
</script>

<style>
.mij-header{
    height: 50px;
    background: white;
    position: fixed;
    top: 0;
    padding: 4px 12px;
    display: flex;
    justify-content: space-between;
    width: 98vw;
}
.logo{
    width:40px;
    height: 40px;
}
.menu-container{
    display: flex;
    gap: 22px;
    align-items: center;
}
.menu-label{
    font-size: 12px;
    font-family: PT Sans, Helvetica Arial;
    font-weight: 600;
}
</style>
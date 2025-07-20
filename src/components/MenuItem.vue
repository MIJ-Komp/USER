<template>
    <div v-for="menu in menus" :key="menu.name" class="menu-item-container" :class="{ 'menu-item-child-container': isChild }" @mouseover="menu.open = true" @mouseleave="menu.open = false">
        <div @click.prevent="goto(menu)" :class="['menu-base', isChild ? 'menu-child' : 'menu']">
            <div class="menu-label uppercase">{{ menu.name.toUpperCase() }}</div>
            <i v-if="menu.childs?.length" :class="getMenuIconClass(menu, isChild)" />
        </div>

        <Transition name="fade">
            <div :class="['menu-item-base', !isChild ? 'menu-item' : 'menu-item-child']" v-if="menu.childs?.length && menu.open">
                <MenuItem :menus="menu.childs" :isChild="true" />
            </div>
        </Transition>
    </div>

    <div v-for="menu in menus" :key="menu.name" class="menu-item-mobile">
        <div class="mobile-menu-header">
            <div class="menu-label uppercase" @click.stop.prevent="goto(menu)">{{ menu.name }}</div>
            <i v-if="menu.childs?.length" @click="menu.open = !menu.open" :class="getMobileMenuIconClass(menu)" />
        </div>

        <Transition name="slide">
            <div v-if="menu.childs?.length && menu.open" class="mobile-submenu">
                <MenuItem :menus="menu.childs" :isChild="true" />
            </div>
        </Transition>
    </div>
</template>

<script>
export default {
    name: 'MenuItem',
    props: {
        isChild: {
            type: Boolean,
            default: false
        },
        menus: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        goto(menu) {
            menu.open = false;
            const cleanPath = menu.path.startsWith('/') ? menu.path.slice(1) : menu.path;
            this.$router.replace({ path: `/product/${cleanPath}` })
                .then(() => window.location.reload());
        },
        getMenuIconClass(menu, isChild) {
            return !isChild
                ? (!menu.open ? 'fa fa-angle-down' : 'fa fa-angle-up')
                : (!menu.open ? 'fa fa-angle-right' : 'fa fa-angle-left');
        },
        getMobileMenuIconClass(menu) {
            return !menu.open ? 'fa fa-angle-right' : 'fa fa-angle-down';
        }
    }
};
</script>

<style scoped>
.menu-base {
    display: flex;
    width: 100%;
    height: fit-content;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    font-size: 0.9rem;
    font-weight: 600;
    color: #333;
    cursor: pointer;
    padding: 0.5rem 0.8rem;
    border-radius: 8px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    transition: all 0.3s ease;
}

.menu:hover {
    background: rgba(var(--gold-rgb), 0.1);
    color: var(--gold);
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.menu-child {
    padding: 8px 0;
    border-bottom: 1px solid #dedede;
    padding-right: 10px;
}

.menu-child:hover {
    background: rgba(var(--gold-rgb), 0.1);
    color: var(--gold);
}

.menu-item-container {
    width: fit-content;
    position: relative;
    cursor: pointer;
    height: 100%;
    font-weight: 600;
    align-content: center;
}

.menu-item-child-container {
    width: 100%;
}

.menu-item-base {
    background: white;
    padding: 12px;
    border-radius: 4px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    position: absolute;
    border: 1px solid #dedede;
    border-top: 2px solid var(--gold);
    width: 250px;
    min-width: 250px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.menu-item {
    top: 40px;
    left: 0;
}

.menu-item-child {
    top: 0;
    left: 220px;
}

.menu-label {
    height: 100%;
    align-content: center;
}

/* Mobile Styles */
.menu-item-mobile {
    display: none;
    padding: 0.5rem 1rem;
}

.mobile-menu-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
}

.mobile-submenu {
    margin-left: 1rem;
    border-left: 2px solid var(--gold);
    padding-left: 1rem;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s ease;
    max-height: 300px;
    overflow: hidden;
}

.slide-enter-from,
.slide-leave-to {
    max-height: 0;
    opacity: 0;
}

@media screen and (max-width: 1100px) {
    .menu-item-container {
        display: none;
    }
    .menu-item-mobile {
        display: block;
        width: 100%;
    }
}
</style>
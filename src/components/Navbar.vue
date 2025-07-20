<template>
    <nav class="navbar navbar-expand-lg fixed-top" :class="{ 'navbar-scrolled': hasScrolled }">
        <div class="container">
            <div class="navbar-brand" @click.stop.prevent="goto('')">
                <img class="logo" src="/favicon.webp" alt="MIJ Logo" />
            </div>

            <div class="nav-right-section">
                <div class="nav-links" :class="openMenu? 'show': ''">
                    <div class="nav-item" @click.stop.prevent="goto('')">
                        <i class="fas fa-home"></i>
                        <span>HOME</span>
                    </div>
                    
                    <div class="nav-item" @click.stop.prevent="goto('rakit-pc')">
                        <i class="fas fa-desktop"></i>
                        <span>RAKIT PC</span>
                    </div>
                    
                    <div class="nav-item" @click.stop.prevent="goto('order')">
                        <i class="fas fa-clipboard-list"></i>
                        <span>CEK PESANAN</span>
                    </div>

                    <div class="menu-mobile-container" >
                        <MenuItem :menus="menus"/>
                    </div>
                </div>

                <div class="nav-actions">
                    <CartNav class="cart-nav" />
                    <button class="menu-toggle" @click="toggleMenu()">
                        <i class="fas fa-bars"></i>
                    </button>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import { mapActions } from "vuex";
import module from "../constant/module.js";
import MenuItem from "./MenuItem.vue";
import CartNav from "./CartNav.vue";

export default {
    components: {
        MenuItem, CartNav
    },
    data() {
        return {
            menus: [],
            openMenu: false,
            hasScrolled: false
        }
    },
    async created() {
        this.menus = await this.getAll();
        window.addEventListener('scroll', this.handleScroll);
    },
    unmounted() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        ...mapActions(module.menu.name, ["getAll","create", "getById", "update"]),
        handleScroll() {
            this.hasScrolled = window.scrollY > 50;
        },
        toggleMenu() {
            this.openMenu = !this.openMenu;
        },
        closeMenu() {
            this.openMenu = false;
        },
        goto(url) {
            console.log(url)
            var content = document.getElementById("mij-content");
            if (content) {
                content.scrollTo({ top: 0, behavior: "smooth" });
            }
            setTimeout(() => {
                this.$router.replace({ path: `/${url}`});
            }, 50);
            this.closeMenu();
        }
    }
}
</script>

<style scoped>
.navbar {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    padding: 0.5rem 0;
    transition: all 0.3s ease;
    z-index: 1000;
    max-width: 100vw;
}

.navbar-scrolled {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 0.3rem 0;
}

.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.navbar-brand {
    cursor: pointer;
    transition: transform 0.3s ease;
}

.navbar-brand:hover {
    transform: scale(1.05);
}

.logo {
    width: 40px;
    height: 40px;
    object-fit: contain;
}

.nav-right-section {
    display: flex;
    align-items: center;
    /* gap: 2rem; */
}

.nav-links {
    display: flex;
    align-items: center;
    /* gap: 1.5rem; */
    white-space: nowrap;
}

.nav-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    font-weight: 600;
    color: #333;
    cursor: pointer;
    padding: 0.5rem 0.8rem;
    border-radius: 8px;
    transition: all 0.3s ease;
}

.nav-item i {
    font-size: 1rem;
    color: var(--gold);
}

.nav-item:hover {
    background: rgba(var(--gold-rgb), 0.1);
    color: var(--gold);
}

.nav-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.cart-nav {
    position: relative;
    padding: 0.5rem;
    border-radius: 50%;
    transition: all 0.3s ease;
}

.cart-nav:hover {
    background: rgba(var(--gold-rgb), 0.1);
}

.menu-toggle {
    display: none;
    background: none;
    border: none;
    font-size: 1.2rem;
    color: #333;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 8px;
    transition: all 0.3s ease;
}

.menu-toggle:hover {
    background: rgba(var(--gold-rgb), 0.1);
    color: var(--gold);
}
.menu-mobile-container {
    display: flex;
    height: 100%;
    /* gap: 12px; */
    height: 50px;
    align-content: center;
}
@media screen and (max-width: 1100px) {
    .nav-links {
        position: fixed;
        top: 60px;
        left: 0;
        right: 0;
        background: white;
        flex-direction: column;
        padding: 1rem;
        gap: 0.5rem;
        transform: translateY(-100%);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .nav-links.show {
        transform: translateY(0);
        opacity: 1 !important;
        visibility: visible !important;
    }

    .nav-item {
        width: 100%;
        padding: 0.8rem;
        border-radius: 8px;
    }

    .menu-toggle {
        display: block;
    }

    .menu-mobile-container {
        flex-direction: column;
        width: 100%;
        padding: 0;
        border: none;
        display: contents;
    }
}
</style>
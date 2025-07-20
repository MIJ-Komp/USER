<template>
    <div class="cart-nav-wrapper" @click="goto('cart')">
        <div class="cart-icon">
            <i class="fas fa-shopping-cart"></i>
            <div class="cart-badge" v-if="cartStore.items.length > 0">
                {{ cartStore.items.length }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { useCartStore } from '../store/cartStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const cartStore = useCartStore();
cartStore.initFromLocalStorage();

const goto = (path) => {
    router.push(`/${path}`);
};
</script>

<style scoped>
.cart-nav-wrapper {
    position: relative;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    transition: all 0.3s ease;
}

.cart-nav-wrapper:hover {
    background: rgba(var(--gold-rgb), 0.1);
}

.cart-icon {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.cart-icon i {
    font-size: 1.2rem;
    color: #333;
    transition: color 0.3s ease;
}

.cart-nav-wrapper:hover .cart-icon i {
    color: var(--gold);
}

.cart-badge {
    position: absolute;
    top: -8px;
    right: -8px;
    background: var(--gold);
    color: black;
    font-size: 0.7rem;
    font-weight: bold;
    min-width: 18px;
    height: 18px;
    border-radius: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 4px;
    animation: badge-pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes badge-pop {
    0% {
        transform: scale(0);
    }
    100% {
        transform: scale(1);
    }
}
</style>
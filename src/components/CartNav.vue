<template>
  <span class="position-relative">
    <i class="fa fa-cart-shopping"/> 
    <span class="position-absolute top-0 start-100 translate-middle bg-danger text-center rounded-circle fs-xm" style="height: 20px; width: 20px; line-height: 20px;">
      <span class="visually-hidden">Keranjang</span>
      {{ cartStore.items.length }}
    </span>
  </span>
</template>

<script setup>
  import { useCartStore } from '../store/cartStore';
  
  const cartStore = useCartStore()
  
</script>
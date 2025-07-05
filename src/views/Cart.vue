<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="d-flex">
          <h4>Keranjang ({{cartStore.items.length}})</h4>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8 mb-4">
        <div v-if="!cartStore.items.length" class="card mb-3 shadow-sm">
          <div class="card-body">Keranjang anda masih kosong</div>
        </div>
        <div v-else class="card mb-3 shadow-sm">
          
        </div>
      
      </div>
      
      <div class="col-md-4">
        <div class="card shadow-sm">
          <div class="card-body">
            <h5>Ringkasan Belanja</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useCartStore } from '../store/cartStore';
  
  const cartStore = useCartStore()
</script>
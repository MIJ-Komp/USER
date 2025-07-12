<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="d-flex">
          <h4>Keranjang ({{ cartStore.items.length }})</h4>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-8 mb-4">
        <div v-if="!cartStore.items.length" class="card mb-3 shadow-sm">
          <div class="card-body">Keranjang anda masih kosong</div>
        </div>
        <div v-else class="card mb-3 shadow-sm">
          <div v-for="cartItem in cartItems" class="border-bottom">
            <CartItem
              :key="cartItem.productId"
              :cartItem="cartItem"
              :changeQty="changeQty"
              :removeItem="removeItem"
            />
          </div>

        </div>
      </div>

      <div class="col-md-4">
        <div class="card shadow-sm" v-if="cartItems.length">
          <div class="card-body">
            <h5>Ringkasan Belanja</h5>
            <div class="d-flex justify-content-between mb-4">
              <span>Total</span>
              <span class="fw-semibold">{{ formatCurrency(totalPrice) }}</span>
            </div>
            <button @click="checkout" :disabled="!allowCheckout" class="btn btn-warning w-100 fw-semibold">Beli</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, ref, watch } from 'vue';
  import CartItem from '../components/CartItem.vue';
  import { useCartStore } from '../store/cartStore';
  import { useStore } from 'vuex';
  import module from '../constant/module.js';
import { useRouter } from 'vue-router';

  const store = useStore();
  const cartStore = useCartStore();
  const router = useRouter();

  const cartItems = ref([]);
  const totalPrice = ref(0);

  const allowCheckout = ref(true);

  async function getAllProducts() {
    if (!cartStore.items.length) {
      cartItems.value = [];
      totalPrice.value = 0;
      return;
    }

    const params = {
      ids: cartStore.items.map(x => x.productId).join(",")
    };

    try {
      const productRes = await store.dispatch(`${module.product.name}/getAll`, params);

      // Reset sebelum akumulasi ulang
      allowCheckout.value = true;
      totalPrice.value = 0;
      
      cartItems.value = cartStore.items.map(item => {
        const product = productRes.find(x => x.id == item.productId);
        const productSku = product?.productSkus.find(x => x.id == item.productSkuId);

        if (productSku) {
          totalPrice.value += productSku.price * item.qty;
        }

        if(productSku.stock < item.qty) {
          allowCheckout.value = false;
        }

        return {
          ...item,
          product
        };
      });

    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  }

  function formatCurrency(number) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(number);
  }

  function changeQty(productId, productSkuId, qty) {
    cartStore.changeQty(productId, productSkuId, qty);
  }

  function removeItem(productId, productSkuId) {
    cartStore.removeItem(productId, productSkuId);
  }

  function checkout() {
    router.push("/cart/checkout")
  }
  watch(() => 
    cartStore.items, 
    getAllProducts, 
    { deep: true, immediate: true }
  );
</script>


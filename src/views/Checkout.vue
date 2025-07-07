<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="d-flex">
          <h4>Checkout</h4>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-8 mb-4">
        <div class="row">
          <div class="col">
            <div class="card mb-3 shadow-sm">
              <div class="card-body">
                <p class="fw-semibold">
                  Informasi Pembeli
                </p>
                <TextBox />
              </div>
            </div>
            
            <div class="card mb-3 shadow-sm">
              <div class="card-body">
                <p class="fw-semibold">
                  Alamat Pengiriman
                </p>
              </div>
            </div>
            
            <p>Daftar Belanja</p>
            <div class="card mb-3 shadow-sm">
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
        </div>
      </div>

      <div class="col-md-4">
        <div class="card shadow-sm">
          <div class="card-body">
            <h5>Ringkasan Belanja</h5>
            <div class="d-flex justify-content-between mb-4">
              <span>Total</span>
              <span class="fw-semibold">{{ formatCurrency(totalPrice) }}</span>
            </div>
            <button class="btn btn-warning w-100 fw-semibold">Beli</button>
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
import TextBox from '../components/input/TextBox.vue';

  const store = useStore();
  const cartStore = useCartStore();

  const cartItems = ref([]);
  const totalPrice = ref(0);

  async function getAllProducts() {
    if (!cartStore.items.length) {
      cartItems.value = [];
      totalPrice.value = 0;
      return;
    }

    const params = {
      productIds: cartStore.items.map(x => x.productId).join(",")
    };

    try {
      const productRes = await store.dispatch(`${module.product.name}/getAll`, params);

      totalPrice.value = 0; // Reset sebelum akumulasi ulang
      cartItems.value = cartStore.items.map(item => {
        const product = productRes.find(x => x.id == item.productId);
        const productSku = product?.productSkus.find(x => x.id == item.productSkuId);

        if (productSku) {
          totalPrice.value += productSku.price * item.qty;
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

  watch(() => 
    cartStore.items, 
    getAllProducts, 
    { deep: true, immediate: true }
  );
</script>


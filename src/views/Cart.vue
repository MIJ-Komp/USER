<template>
  <div class="container py-4">
    <div class="cart-header mb-4">
      <h4 class="mb-0">Keranjang <span class="color-gold">({{ cartStore.items.length }})</span></h4>
      <div class="header-line"></div>
    </div>

    <div class="row g-4">
      <div :class="cartItems.length ?'col-lg-8':'col-lg-12'">
        <!-- Empty State -->
        <div v-if="!cartStore.items.length" class="empty-cart">
          <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
          <h5 class="text-muted">Keranjang Anda masih kosong</h5>
          <router-link to="/" class="btn btn-primary mt-3">
            <i class="fas fa-shopping-bag me-2"></i>Mulai Belanja
          </router-link>
        </div>

        <!-- Cart Items -->
        <div v-else class="cart-items-container">
          <TransitionGroup name="list" tag="div">
            <div v-for="cartItem in cartItems" :key="cartItem.productId" class="cart-item-wrapper mb-3">
              <CartItem
                :cartItem="cartItem"
                :changeQty="changeQty"
                :removeItem="removeItem"
              />
            </div>
          </TransitionGroup>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="col-lg-4" v-if="cartItems.length">
        <div class="card summary-card">
          <div class="card-body">
            <h5 class="card-title mb-4">Ringkasan Belanja</h5>
            <div class="summary-details">
              <div class="d-flex justify-content-between mb-3">
                <span>Total Item</span>
                <span class="fw-semibold">{{ cartStore.items.length }}</span>
              </div>
              <div class="d-flex justify-content-between h5">
                <span>Total Harga</span>
                <span class="fw-semibold color-gold">{{ formatCurrency(totalPrice) }}</span>
              </div>
            </div>
            <Button 
              @click="checkout" 
              :disabled="!allowCheckout" 
              class="checkout-btn btn btn-warning w-100 mt-4"
              faIcon="fas fa-shopping-cart"
              label="Checkout"
              />
            <div v-if="!allowCheckout" class="alert alert-warning mt-3 mb-0 py-2 small">
              <i class="fas fa-exclamation-triangle me-2"></i>
              Beberapa item tidak tersedia atau stoknya tidak mencukupi
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-header {
  position: relative;
}

.header-line {
  height: 2px;
  background: linear-gradient(90deg, var(--gold), transparent);
  margin-top: 12px;
  width: 100px;
}

.empty-cart {
  text-align: center;
  padding: 48px;
  background: #f8f9fa;
  border-radius: 12px;
  margin-top: 24px;
}

.cart-items-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cart-item-wrapper {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
}

.cart-item-wrapper:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.summary-card {
  position: sticky;
  top: 80px;
  border-radius: 12px;
  border: none;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.summary-details {
  padding: 16px 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}

.checkout-btn {
  padding: 12px;
  font-weight: 600;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.checkout-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.checkout-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* List Transitions */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

@media (max-width: 991px) {
  .summary-card {
    position: static;
    margin-top: 24px;
  }
}
</style>

<script setup>
  import { onMounted, ref, watch } from 'vue';
  import CartItem from '../components/CartItem.vue';
  import { useCartStore } from '../store/cartStore';
  import { useStore } from 'vuex';
  import module from '../constant/module.js';
import { useRouter } from 'vue-router';
import { getCurrentInstance } from 'vue'

const { proxy } = getCurrentInstance();
const $dialog = proxy.$dialog;

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

          if(productSku.stock < item.qty) {
            allowCheckout.value = false;
          }
        }
        else{
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

  async function removeItem(productId, productSkuId) {
    const confirm = await $dialog.Confirmation.confirm({ title: 'Konfirmasi', message: `Apakah Anda ingin menghapus produk ini dari keranjang?` })
    if (confirm) {
      cartStore.removeItem(productId, productSkuId);
    }
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


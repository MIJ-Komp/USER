<template>
  <div class="container py-4">
    <div class="row">
      <div class="col-12 mb-4">
        <div class="card shadow-sm border-0 p-4">
          <h5 class="mb-4"><i class="bi bi-search me-2"></i>Cari Pesanan</h5>
          <div>
            <b-form @submit="searchOrder" class="row align-items-center g-3">
              <div class="col-md-9 col-sm-12">
                <div class="input-group">
                  <span class="input-group-text bg-light border-end-0">
                    <i class="bi bi-hash"></i>
                  </span>
                  <b-form-input
                    class="border-start-0 ps-0"
                    required
                    v-model="searchQuery"
                    placeholder="Masukkan nomor pesanan"
                    data-aos="fade-right"
                  />
                </div>
              </div>
              <div class="col-md-3 col-sm-12">
                <Button
                  pill
                  variant="warning"
                  class="shadow-sm w-100 p-2 d-flex align-items-center justify-content-center"
                  @click="searchOrder"
                  label="Cari"
                  iconFa="bi bi-search"
                >
                </Button>
              </div>
            </b-form>
          </div>
        </div>
      </div>
      <div v-if="errMsg" class="col-12 mb-4">
        <div class="alert alert-danger d-flex align-items-center" role="alert">
          <i class="bi bi-exclamation-triangle-fill me-2"></i>
          {{errMsg}}
        </div>
      </div>
      <div v-if="order" class="col-md-8" data-aos="fade-up">
        <div class="d-flex align-items-center mb-3">
          <i class="bi bi-bag-check me-2"></i>
          <p class="fw-semibold mb-0">Pesanan Anda</p>
        </div>
        <div class="card shadow-sm border-0">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <div>
                <p class="fw-semibold mb-0">{{ order.code }}</p>
                <small class="text-muted">Dibuat pada {{order.createdByCustomerAt}}</small>
              </div>
              <div class="text-end">
                <span :class="{
                  'bg-warning-subtle text-warning': order.status.name === 'Pending',
                  'bg-success-subtle text-success': order.status.name === 'Completed',
                  'bg-info-subtle text-info': order.status.name === 'Processing'
                }" class="fs-sm fw-semibold px-3 py-1 rounded-pill">
                  {{ order.status.name }}
                </span>
              </div>
            </div>
            <div>
              <div class="d-flex align-items-center mb-3">
                <i class="bi bi-cart3 me-2"></i>
                <p class="mb-0">Daftar Belanja</p>
              </div>
              <div v-for="item in order.orderItems" class="card bg-light border-0 mb-2 hover-shadow transition-all">
                <div class="card-body">
                  <div class="d-flex justify-content-between align-items-center">
                    <div>
                      <p class="fw-medium mb-1">{{ item.product.name }}</p>
                      <span v-if="item.product.productSku.name" class="badge bg-secondary me-2">
                        {{ item.product.productSku.name }}
                      </span>
                      <span class="text-muted">{{ item.quantity }}x</span>
                    </div>
                    <div class="text-end">
                      <p class="fw-semibold mb-0">{{ formatCurrency(item.price * item.quantity) }}</p>
                      <small class="text-muted">@{{ formatCurrency(item.price) }}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="order" class="col-md-4" data-aos="fade-left">
        <div class="d-flex align-items-center mb-3">
          <i class="bi bi-receipt me-2"></i>
          <p class="fw-semibold mb-0">Ringkasan Belanja</p>
        </div>
        <div class="card shadow-sm border-0 sticky-md-top" style="top: 1rem">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <div>
                <p class="text-muted mb-1">Total Belanja</p>
                <p class="h5 text-success mb-0">
                  {{formatCurrency(order.orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0))}}
                </p>
              </div>
              <span :class="order.isPaid ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning'" 
                class="fs-sm fw-semibold px-3 py-1 rounded-pill">
                {{ order.isPaid ? "Sudah Bayar": "Belum Bayar" }}
              </span>
            </div>
            <a v-if="!order.isPaid" :href="order.paymentUrl" 
              class="btn btn-warning w-100 mb-4 d-flex align-items-center justify-content-center">
              <i class="bi bi-credit-card me-2"></i>Bayar Sekarang
            </a>
            <hr class="my-4">
            <div class="shipping-info">
              <div class="d-flex align-items-center mb-3">
                <i class="bi bi-truck me-2"></i>
                <p class="fw-semibold mb-0">Info Pengiriman</p>
              </div>
              <div class="bg-light rounded p-3 mb-3">
                <div class="mb-2">
                  <small class="text-muted">Penerima</small>
                  <p class="fw-medium mb-0">{{order.customerInfo.name}}</p>
                  <p class="text-muted mb-0">{{order.customerInfo.phoneNumber}}</p>
                </div>
                <div class="mb-2">
                  <small class="text-muted">Alamat Pengiriman</small>
                  <p class="mb-0">{{order.shippingInfo.address}}</p>
                </div>
              </div>
              <div class="shipping-details">
                <div class="d-flex justify-content-between mb-2">
                  <small class="text-muted">Kurir</small>
                  <span class="fw-medium">{{order.shippingInfo.shippingMethod ?? '-'}}</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <small class="text-muted">Nomor Resi</small>
                  <span class="fw-medium">{{order.shippingInfo.trackingNumber ?? '-'}}</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <small class="text-muted">Dikirim Pada</small>
                  <span class="fw-medium">{{order.shippingInfo.shippedAt ?? '-'}}</span>
                </div>
                <div class="d-flex justify-content-between mb-3">
                  <small class="text-muted">Estimasi Tiba</small>
                  <span class="fw-medium">{{order.shippingInfo.estimatedDeivery ?? '-'}}</span>
                </div>
                <div class="bg-light rounded p-2">
                  <small class="text-muted d-block mb-1">Catatan Pengiriman</small>
                  <p class="mb-0">{{ order.shippingInfo.notes || '-' }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, ref, watch } from 'vue';
  import { useStore } from 'vuex'
  import module from '../constant/module.js'
  import { useRouter, useRoute, RouterLink } from 'vue-router';

  const router = useRouter()
  const route = useRoute()
  const store = useStore()
  
  const searchQuery = ref(route.params.code)
  const order = ref(null)
  const errMsg = ref(null)

  async function searchOrder() {
    if(searchQuery.value){
      router.push(`/order/${searchQuery.value}`)
    } else {
      errMsg.value = "Masukkan nomor pesanan"
    }
  }

  function formatCurrency(number) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(number);
  }

  onMounted(async () => {
    if(searchQuery.value) {
      try {
        const result = await store.dispatch(`${module.order.name}/getByCode`, searchQuery.value)
        if (result) order.value = result
        errMsg.value = null
      } catch (err) {
        if(err.code === 404) {
          errMsg.value = "Pesanan dengan kode " + searchQuery.value + " tidak ditemukan"
        } else {
          errMsg.value = err.message[0]
        }
      }
    }
  })

</script>

<style scoped>
.hover-shadow:hover {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.transition-all {
  transition: all 0.2s ease-in-out;
}

.sticky-md-top {
  z-index: 1020;
}
</style>

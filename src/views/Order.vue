<template>
  <div class="container">
    <div class="row">
      <div class="col-12 mb-4">
        <div class="">
        <h5 class="">Cari Pesanan</h5>
        <div class="row">

          <div class="col-md-5 col-sm-12">
            
            <b-form @submit="searchOrder" class="d-flex align-items-center">
              <b-form-input class="me-2" required v-model="searchQuery" placeholder="Masukkan nomor pesanan" />
              <b-button pill variant="warning" class="shadow-sm" @click="searchOrder">Cari</b-button>
            </b-form>
          </div>
        </div>
        
        </div>
      </div>
      <div v-if="errMsg" class="text-danger">{{errMsg}}</div> 
      <div v-if="order" class="col-md-8">
        <p class="fw-semibold">Pesanan Anda</p>
        <div class="card shadow-sm ">
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <p class="fw-semibold">{{ order.code }}</p>
              <div class="">
                <div class="fw-semibold me-2">{{order.createdByCustomerAt}}</div>
                <div class="text-end"><span class="fs-sm fw-semibold px-2 rounded-pill border">{{ order.status.name }}</span></div>
              </div>
            </div>
            <div>
              <p class="mb-1">Daftar Belanja:</p>
              <div v-for="item in order.orderItems" class="card border mb-2">
                <div class="card-body">
                  <p class="mb-0">{{ item.product.name }}</p>
                  <span class="fs-sm me-2 mb-0 border px-1 rounded" v-if="item.product.productSku.name">{{ item.product.productSku.name }}</span>
                  <span>{{ item.quantity }} x {{ formatCurrency(item.price) }}</span>
                </div>
              </div>
              
            </div>
          </div>

        </div>
      </div>
      <div v-if="order" class="col-md-4">
        <p class="fw-semibold">Ringkasan Belanja</p>
        <div class="card">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center fw-semibold">
              <div>
                <p class="mb-0">Total Belanja</p>
                <p class="text-success">
                  {{formatCurrency(order.orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0))}}
                </p>
              </div>
              <span :class="order.isPaid ? 'border-success text-success' : 'border-warning text-warning'" class="border fs-sm fw-sm rounded-pill py-1 px-2">
                {{ order.isPaid ? "Sudah bayar": "Belum Bayar" }}
              </span>
            </div>
            <a v-if="!order.isPaid" :href="order.paymentUrl" class="btn btn-warning w-100 mb-4">Bayar Sekarang</a>
            <div class="border"></div>
            <p class="fw-semibold mb-0 mt-2">Info Pengiriman</p>
            <table class="fs-sm">
              <tbody>
                <tr><td>Nama Penerima</td><td class="ps-2 pe-1">:</td><td>{{order.customerInfo.name}} ({{order.customerInfo.phoneNumber}})</td></tr>
                <tr><td>Alamat</td><td class="ps-2 pe-1">:</td><td>{{order.shippingInfo.address}}</td></tr>
                <tr><td>Nomor Resi</td><td class="ps-2 pe-1">:</td><td>{{order.shippingInfo.trackingNumber ?? '-'}}</td></tr>
                <tr><td>Kurur</td><td class="ps-2 pe-1">:</td><td>{{order.shippingInfo.shippingMethod ?? '-'}}</td></tr>
                <tr><td>Dikirim Pada</td><td class="ps-2 pe-1">:</td><td>{{order.shippingInfo.shippedAt ?? '-'}}</td></tr>
                <tr><td>Estimasi Pengiriman</td><td class="ps-2 pe-1">:</td><td>{{order.shippingInfo.estimatedDeivery ?? '-'}}</td></tr>
              </tbody>
            </table>
            <div class="rounded bg-light border p-1 fs-sm">
              <span class="fw-semibold">Catatan Pengiriman</span> <br> 
              {{ order.shippingInfo.notes }}
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
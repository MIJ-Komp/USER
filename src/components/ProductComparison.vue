<template>
  <div v-if="compareProductStore.items.length">
    <div class="position-fixed bottom-0 start-0 end-0 bg-light border-top py-2 shadow">
      <div class="container">

        <div class="d-flex justify-content-between mb-2">
          <div class="w-full">
            Bandingkan Produk ({{ compareProductStore.items.length}}/4)
          </div>
          <span><i class="fa-solid fa-chevron-up"></i></span>
        </div>
      
        <div class="row">
          <div class="col-sm-12 col-md ps-2 pe-1 mb-2">
            <div v-if="compareProductStore.items.length >= 1" class="position-relative bg-gold-50 shadow-sm border-gold-200 rounded p-2">
              <span>{{compareProductStore.items[0].name}}</span>
              <div class="pt-1 pe-2 position-absolute top-0 end-0">
                <button class="btn p-0 px-1 link-secondary" @click="removeCompareProductItem(compareProductStore.items[0].id)">
                  <i class="fas fa-xmark"></i>
                </button>
              </div>
            </div>
            <div v-else class="border-secondary font-title border-dashed rounded p-2">
              Tambahkan produk lain 
            </div>
          </div>
          
          <div class="col-sm-12 col-md ps-2 pe-1 mb-2">
            <div v-if="compareProductStore.items.length >= 2" class="position-relative bg-gold-50 shadow-sm border-gold-200 rounded p-2">
              <span>{{compareProductStore.items[1].name}}</span>
              <div class="pt-1 pe-2 position-absolute top-0 end-0">
                <button class="btn p-0 px-1 link-secondary" @click="removeCompareProductItem(compareProductStore.items[1].id)">
                  <i class="fas fa-xmark"></i>
                </button>
              </div>
            </div>
            <div v-else class="border-secondary font-title border-dashed rounded p-2">
              Tambahkan produk lain 
            </div>
          </div>
          <div class="col-sm-12 col-md ps-2 pe-1 mb-2">
            <div v-if="compareProductStore.items.length >= 3" class="position-relative bg-gold-50 shadow-sm border-gold-200 rounded p-2">
              <span>{{compareProductStore.items[2].name}}</span>
              <div class="pt-1 pe-2 position-absolute top-0 end-0">
                <button class="btn p-0 px-1 link-secondary" @click="removeCompareProductItem(compareProductStore.items[2].id)">
                  <i class="fas fa-xmark"></i>
                </button>
              </div>
            </div>
            <div v-else class="border-secondary font-title border-dashed rounded p-2">
              Tambahkan produk lain 
            </div>
          </div>
          <div class="col-sm-12 col-md ps-2 pe-1 mb-2">
            <div v-if="compareProductStore.items.length >= 4" class="position-relative bg-gold-50 shadow-sm border-gold-200 rounded p-2">
              <span>{{compareProductStore.items[3].name}}</span>
              <div class="pt-1 pe-2 position-absolute top-0 end-0">
                <button class="btn p-0 px-1 link-secondary" @click="removeCompareProductItem(compareProductStore.items[3].id)">
                  <i class="fas fa-xmark"></i>
                </button>
              </div>
            </div>
            <div v-else class="border-secondary font-title border-dashed rounded p-2">
              Tambahkan produk lain 
            </div>
          </div>

          <div class="col-sm-12 col-md pe-0 ps-2 items-center">
            <div class="d-flex"></div>
            <button @click="clearCompareProductItems" class="btn btn-outline-danger  me-2">Hapus Semua</button>
            <button  class="btn btn-warning">Bandingkan</button>
          </div>          
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useCompareProductStore } from '../store/compareProductStore';
  const compareProductStore = useCompareProductStore()
  
  function clearCompareProductItems() {
    compareProductStore.clearItems();
  }
  
  function removeCompareProductItem(id) {
    compareProductStore.removeItem(id);
  }
</script>

<style scoped>
  .border-dashed {
    border-style: dashed;
  }
</style>
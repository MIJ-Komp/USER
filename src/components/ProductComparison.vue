<template>
  <div v-if="compareProductStore.items.length">
    <div id="layout" class="position-fixed bottom-0 start-0 end-0 bg-light border-top border-2 py-2 bg-white">
      <div id="detailLayout" tabindex="-1">
        <div class="container">

          <div class="row">
            <div class="d-flex justify-content-between mb-2">
              <div class="w-full">
                Bandingkan Produk ({{ compareProductStore.items.length}}/4)
              </div>
              
              <span class="border rounded text-center ms-2 cursor-pointer" style="width: 27px; height: 27px;"  @click="changeLayout('collapse')"><i id="btnCollapse" class="fa-solid fa-chevron-down" /></span>
              
            </div>
          </div>

          <div class="row" v-if="state == 3">
            <div class="col-12">
              <h4 class="text-center my-4">Temukan Yang Paling Cocok</h4>
              <div class="d-flex justify-content-center overflow-auto" id="compareDetail">
                <div class="me-4" v-for="product in compareProductStore.items">
                  <ProductComparisonDetail :product="product" />
                </div>
              </div>
            </div>
          </div>

          <div class="row" id="compareItems">
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
              <button @click="changeLayout('expand')" class="btn btn-warning">Bandingkan</button>
            </div>          
          </div>
      
        </div>
      </div>


     
      
    </div>
  </div>
</template>

<script setup>
  import { onMounted, onUnmounted, ref, watch } from 'vue';
  import { useCompareProductStore } from '../store/compareProductStore';
import ProductComparisonDetail from './ProductComparisonDetail.vue';
 
  const compareProductStore = useCompareProductStore()
  
  const state = ref(2)

  function clearCompareProductItems() {
    compareProductStore.clearItems();
    document.body.style.overflow = 'auto';
  }
  
  function removeCompareProductItem(id) {
    compareProductStore.removeItem(id);
    if (!compareProductStore.items.length) {
      document.body.style.overflow = 'auto';
    }
  }

  function changeLayout(action) {

    if(action == 'collapse') {
      if(state.value == 3) {
        state.value = 2;
      } 
      else if(state.value == 2){
        state.value = 1;
        document.getElementById('btnCollapse').classList.remove("fa-chevron-down")
        document.getElementById('btnCollapse').classList.add("fa-chevron-up") 
      }
      else if(state.value == 1) {
        state.value = 2;
        document.getElementById('btnCollapse').classList.add("fa-chevron-down")
        document.getElementById('btnCollapse').classList.remove("fa-chevron-up") 
      }
      document.getElementById('compareItems').classList.remove("d-none")
    } if(action == 'expand') {
      state.value = 3;
      document.getElementById('compareItems').classList.add("d-none")
    }

    const layoutElement = document.getElementById("layout");
    if (!layoutElement) return;
    
    switch (state.value) {
      case 1:
        layoutElement.style.height = '45px';
        layoutElement.style.transition = 'height 0.5s ease';
        document.body.style.overflow = 'auto';
        break;
        case 2:
        layoutElement.style.height = "100px";
        document.body.style.overflow = 'auto';
        break;
        case 3:
        document.body.style.overflow = 'hidden';
        layoutElement.style.height = '100vh';
        layoutElement.style.transition = 'height 0.5s ease';
        break;
    }
  }

  onUnmounted(() => {
    document.body.style.overflow = 'auto';
  })
</script>

<style scoped>
  .border-dashed {
    border-style: dashed;
  }
  
  #layout {
    z-index: 2000;
    height: 100px;
    transition: height 0.5s ease;
  }

</style>
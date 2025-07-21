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
              <h4 class="text-center my-4 d-none d-md-block">Temukan Yang Paling Cocok</h4>
              <h6 class="text-center my-3 d-block d-md-none">Bandingkan Produk</h6>
              <!-- Desktop: Horizontal scroll -->
              <div class="d-none d-md-flex justify-content-center overflow-auto" id="compareDetail">
                <div class="me-4 flex-shrink-0" v-for="product in compareProductStore.items" style="min-width: 300px;">
                  <ProductComparisonDetail :product="product" />
                </div>
              </div>
              <!-- Mobile: Vertical stack -->
              <div class="d-block d-md-none" id="compareDetailMobile">
                <div class="mb-3" v-for="product in compareProductStore.items">
                  <ProductComparisonDetail :product="product" />
                </div>
              </div>
            </div>
          </div>

          <div class="row" id="compareItems">
            <!-- Mobile: 2 columns layout -->
            <div class="d-block d-md-none">
              <div class="row">
                <div class="col-6 ps-2 pe-1 mb-2" v-for="(item, index) in 4" :key="index">
                  <div v-if="compareProductStore.items.length >= index + 1" class="position-relative bg-gold-50 shadow-sm border-gold-200 rounded p-2">
                    <span class="small">{{compareProductStore.items[index].name}}</span>
                    <div class="pt-1 pe-1 position-absolute top-0 end-0">
                      <button class="btn p-0 px-1 link-secondary" @click="removeCompareProductItem(compareProductStore.items[index].id)">
                        <i class="fas fa-xmark small"></i>
                      </button>
                    </div>
                  </div>
                  <div v-else class="border-secondary font-title border-dashed rounded p-2 small">
                    Tambahkan produk
                  </div>
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-12 text-center">
                  <button @click="clearCompareProductItems" class="btn btn-outline-danger btn-sm me-2">Hapus Semua</button>
                  <button @click="changeLayout('expand')" class="btn btn-warning btn-sm">Bandingkan</button>
                </div>
              </div>
            </div>
            
            <!-- Desktop: 4 columns layout -->
            <div class="d-none d-md-block">
              <div class="row">
                <div class="col-md ps-2 pe-1 mb-2">
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
                
                <div class="col-md ps-2 pe-1 mb-2">
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
                
                <div class="col-md ps-2 pe-1 mb-2">
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
                
                <div class="col-md ps-2 pe-1 mb-2">
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

                <div class="col-md pe-0 ps-2 d-flex align-items-center">
                  <button @click="clearCompareProductItems" class="btn btn-outline-danger me-2">Hapus Semua</button>
                  <button @click="changeLayout('expand')" class="btn btn-warning">Bandingkan</button>
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
  import { onMounted, onUnmounted, ref } from 'vue';
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
    
    // Check if mobile or desktop
    const isMobile = window.innerWidth < 768;
    
    switch (state.value) {
      case 1:
        layoutElement.style.height = isMobile ? '50px' : '45px';
        layoutElement.style.transition = 'height 0.5s ease';
        document.body.style.overflow = 'auto';
        break;
        case 2:
        layoutElement.style.height = isMobile ? "120px" : "100px";
        document.body.style.overflow = 'auto';
        break;
        case 3:
        document.body.style.overflow = 'hidden';
        layoutElement.style.height = '100vh';
        layoutElement.style.transition = 'height 0.5s ease';
        break;
    }
  }

  // Handle window resize for responsive layout
  function handleResize() {
    const layoutElement = document.getElementById("layout");
    if (!layoutElement) return;
    
    const isMobile = window.innerWidth < 768;
    
    // Update height based on current state and screen size
    switch (state.value) {
      case 1:
        layoutElement.style.height = isMobile ? '50px' : '45px';
        break;
      case 2:
        layoutElement.style.height = isMobile ? "120px" : "100px";
        break;
      case 3:
        layoutElement.style.height = '100vh';
        break;
    }
  }

  onMounted(() => {
    window.addEventListener('resize', handleResize);
  })

  onUnmounted(() => {
    document.body.style.overflow = 'auto';
    window.removeEventListener('resize', handleResize);
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

  /* Mobile optimizations */
  @media (max-width: 767.98px) {
    #layout {
      height: 120px; /* Slightly taller for mobile */
    }
    
    #layout.state-1 {
      height: 50px;
    }
    
    #layout.state-3 {
      height: 100vh;
      overflow-y: auto;
    }
    
    /* Ensure product names don't overflow */
    .position-relative span {
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding-right: 25px;
    }
    
    /* Mobile comparison detail styling */
    #compareDetailMobile {
      max-height: calc(100vh - 120px);
      overflow-y: auto;
      padding: 0 15px;
    }
  }
  
  /* Desktop optimizations */
  @media (min-width: 768px) {
    #compareDetail {
      padding: 0 15px;
    }
    
    #compareDetail::-webkit-scrollbar {
      height: 8px;
    }
    
    #compareDetail::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 4px;
    }
    
    #compareDetail::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 4px;
    }
    
    #compareDetail::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  }

</style>
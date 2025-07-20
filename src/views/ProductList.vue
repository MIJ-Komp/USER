<template>
  <div class="container py-4">
    <div class="d-flex gap-4">
      <!-- Sidebar -->
      <aside
        class="sidebar"
        :class="{
          'd-none': !isLargeScreen && !isSidebarVisible,
          'd-block': isLargeScreen || isSidebarVisible
        }"
      >
        <div class="card filter-container shadow-sm">
          <div style="background-color:var(--gold) !important; color: black !important;" class="text-black card-header bg-primary text-white d-flex justify-content-between align-items-center py-3">
            <div class="d-flex align-items-center">
              <i class="fa fa-filter me-2"/>
              <div class="fw-bold">Filter Produk</div>
            </div>
            <button 
              v-if="isSidebarVisible && !isLargeScreen"
              @click="toggleSidebar"
              class="btn btn-sm btn-light">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="card-body p-3">
            <div class="filter-product d-flex flex-column gap-3">
              <!-- Price Range -->
              <div class="filter-section">
                <h6 class="filter-title mb-2">Rentang Harga</h6>
                <PriceRange v-model="filter.priceRange" @update:modelValue="handleRangeUpdate" />
              </div>

              <!-- Sort -->
              <div class="filter-section">
                <h6 class="filter-title mb-2">Urutkan</h6>
                <Select 
                  v-model="filter.sort"
                  class="w-100" 
                  showClear 
                  size="small" 
                  :options="sortList" 
                  optionLabel="label" 
                  placeholder="Urutkan berdasarkan" 
                />
              </div>

              <!-- CPU Filter -->
              <div class="filter-section">
                <h6 class="filter-title mb-2">CPU</h6>
                <MultiSelect 
                  v-model="filter.cpu"
                  class="w-100" 
                  showClear 
                  size="small" 
                  :options="cpuList" 
                  optionLabel="label" 
                  placeholder="Pilih CPU" 
                />
              </div>

              <!-- VGA Filter -->
              <div class="filter-section">
                <h6 class="filter-title mb-2">VGA</h6>
                <MultiSelect 
                  v-model="filter.vga"
                  class="w-100" 
                  showClear 
                  size="small" 
                  :options="vgaList" 
                  optionLabel="label" 
                  placeholder="Pilih VGA" 
                />
              </div>

              <!-- RAM Type Filter -->
              <div class="filter-section">
                <h6 class="filter-title mb-2">Jenis RAM</h6>
                <MultiSelect
                  v-model="filter.ramType"
                  class="w-100"
                  showClear
                  size="small"
                  :options="ramTypeList"
                  optionLabel="label"
                  placeholder="Pilih Jenis RAM"
                />
              </div>

              <!-- Stock Status -->
              <div class="filter-section">
                <h6 class="filter-title mb-2">Status Stok</h6>
                <Select 
                  v-model="filter.stockStatus" 
                  class="w-100"
                  showClear 
                  size="small" 
                  :options="stockStatusList" 
                  :optionValue="'label'" 
                  optionLabel="label" 
                  placeholder="Pilih Status Stok" 
                />
              </div>

              <!-- On Sale -->
              <div class="filter-section">
                <div class="form-check">
                  <Checkbox 
                    v-model="filter.onSale"
                    :binary="true"
                    class="me-2"
                  />
                  <label class="form-check-label">Sedang Diskon!</label>
                </div>
              </div>

              <!-- Apply Filter Button -->
              <!-- <button @click="applyFilter" class="btn btn-primary w-100 mt-2">
                <i class="fas fa-search me-2"></i>Terapkan Filter
              </button> -->
            </div>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <div class="flex-grow-1">
        <!-- Mobile Filter Button -->
        <div class="d-lg-none mb-3">
          <button @click="toggleSidebar" class="btn btn-outline-primary text-black w-100 d-flex align-items-center justify-content-center gap-2">
            <i class="fa fa-filter" />
            <span>Tampilkan Filter</span>
          </button>
        </div>

        <!-- Header -->
        <div class="product-header mb-4">
          <div class="text-center mb-3">
            <h4 class="text-uppercase mb-0">{{ menu || 'Produk' }}</h4>
            <div class="header-divider">
              <div class="line"></div>
              <div class="dot"></div>
              <div class="line"></div>
            </div>
          </div>
        </div>

        <!-- Product Grid -->
        <div v-if="getProductFiltered.length > 0" class="product-list-container">
          <ProductCard 
            v-for="product in getProductFiltered" 
            :key="product.id" 
            :product="product"
          />
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-5">
          <i class="fas fa-search fa-3x text-muted mb-3"></i>
          <h5 class="text-muted">Produk tidak ditemukan</h5>
          <p class="text-muted">Coba ubah filter pencarian Anda</p>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- <script>
import { nextTick } from "vue";
import { mapActions, mapGetters } from "vuex";
import module from "../constant/module.js";
import ProductCard from "../components/ProductCard.vue";
import { Checkbox, MultiSelect, Select } from "primevue";
import { useRoute } from "vue-router";

function findMenuAndCollectCategoryIds(menus, targetName) {
  let result = {
    menu: null,
    categoryIds: []
  };

  function recursiveSearch(menu) {
    if (menu.path.toLowerCase() === `/${targetName.toLowerCase()}` || result.menu) {
      if(!result.menu)
        result.menu = menu;

      if (menu.menuItems && Array.isArray(menu.menuItems)) {
        for (const item of menu.menuItems) {
          if (!result.categoryIds.includes(item.productCategoryId)) {
            result.categoryIds.push(item.productCategoryId);
          }
        }
      }
      if (menu.childs && menu.childs.length > 0) {
        for (const child of menu.childs) {
          // lanjut cari child menu
          recursiveSearch(child);
        }
      }
    }
    else{
      if (menu.childs && menu.childs.length > 0) {
        for (const child of menu.childs) {
          // lanjut cari child menu
          if (!result.menu) recursiveSearch(child);
        }
      }
    }
  }

  for (const menu of menus) {
    recursiveSearch(menu);
    if (result.menu) break; // stop kalau sudah ketemu
  }

  return result;
}

export default {
  components: {
    ProductCard, Select, MultiSelect, Checkbox
  },
  computed: {
    ...mapGetters(module.menu.name, ["menus"]),
    getProductFiltered() {
      return this.products.filter(data => {
        const prices = data.productSkus.map(item => item.price)
        let priceValid = true
        let stockValid = true
        let cpuValid = true
        let vgaValid = true
        let sortValid = true
        let saleValid = true

        // Validasi harga
        if (prices.length) {
          priceValid = this.filter.priceRange[1] >= Math.min(...prices) &&
                      (this.filter.priceRange[0] <= Math.max(...prices) || 
                       this.filter.priceRange[0] <= Math.min(...prices))  
        }

        // Validasi stok
        stockValid = !this.filter.stockStatus || 
                    this.filter.stockStatus == this.stockStatusList[0].label ? true :
                    this.filter.stockStatus == this.stockStatusList[1].label ? 
                    data.productSkus.find(x => x.stock > 0) : 
                    data.productSkus.find(x => x.stock <= 0)

        // Validasi CPU
        cpuValid = !this.filter.cpu || 
                  this.filter.cpu.length === 0 || 
                  this.filter.cpu.some(cpu => 
                    data.name.toLowerCase().includes(cpu.label.toLowerCase()))

        // Validasi VGA
        vgaValid = !this.filter.vga || 
                  this.filter.vga.length === 0 || 
                  this.filter.vga.some(vga => 
                    data.name.toLowerCase().includes(vga.label.toLowerCase()))

        // Validasi diskon
        saleValid = !this.filter.onSale || 
                   data.productSkus.some(sku => sku.discount > 0)

        return priceValid && stockValid && cpuValid && vgaValid && saleValid
      }).sort((a, b) => {
        if (!this.filter.sort) return 0

        const priceA = Math.min(...a.productSkus.map(sku => sku.price))
        const priceB = Math.min(...b.productSkus.map(sku => sku.price))

        switch(this.filter.sort.label) {
          case 'Harga terendah':
            return priceA - priceB
          case 'Harga tertinggi':
            return priceB - priceA
          case 'Terbaru':
            return new Date(b.createdAt) - new Date(a.createdAt)
          case 'Nama A ke Z':
            return a.name.localeCompare(b.name)
          case 'Nama Z ke A':
            return b.name.localeCompare(a.name)
          default:
            return 0
        }
      })
    }
  },
  watch:{
    menu:{
      immediate: true,
      async handler(){
        if(this.menus){
          const { menu, categoryIds } = findMenuAndCollectCategoryIds(this.menus, this.route.params?.menu);
          this.menu = menu?.name.toUpperCase()
          this.products = await this.getAll({
            productCategoryIds: categoryIds.length <= 0 ? '-1' : categoryIds.join(',')
          })
          console.log(this.products)

        }
      }
    },
    menus:{
      immediate: true,
      deep: true,
      async handler(){
        if(this.menus){
          const { menu, categoryIds } = findMenuAndCollectCategoryIds(this.menus, this.route.params?.menu);
          this.menu = menu?.name.toUpperCase()
           this.products = await this.getAll({
            productCategoryIds: categoryIds.length <= 0 ? '-1' : categoryIds.join(',')
          })
          console.log(this.products)
        }
      }
    }
  },
  data() {
    return {
      route: useRoute(),
      isSidebarVisible: false,
      isLargeScreen: window.innerWidth >= 992, // 'lg' breakpoint
      cpuList:[
          {label:"INTEL CORE i7-14700K"},
          {label:"INTEL CORE i9-13900KS"}
      ],
      vgaList:[
          {label:"RTX 4070 Ti SUPER 16GB"}
      ],
      stockStatusList:[
          {label:"Semua"},
          {label:"Stok Tersedia"},
          {label:"Stok Habis"}
      ],
      sortList:[
          {label:"Default"},
          {label:"Harga terendah"},
          {label:"Harga tertinggi"},
          {label:"Terbaru"},
          // {label:"Populer"},
          // {label:"Acak"},
          {label:"Nama A ke Z"},
          {label:"Nama Z ke A"},
          // {label:"Rating Tertinggi"},
      ],
      filter:{
          priceRange:[0, 100000000],
          sort:null,
          cpu:null,
          vga:null,
          stockStatus:null,
          onSale:null
      },
      products:[],
      menu: null
    };
  },
  mounted() {
    this.filter.stockStatus = this.stockStatusList[0].label
    this.handleResize(); // initial state
    window.addEventListener("resize", this.handleResize);

    nextTick(async ()=>{
      
    })

  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
  async created(){
  },
  methods: {
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
    },
    handleResize() {
      const width = window.innerWidth;
      this.isLargeScreen = width >= 992;
      if (this.isLargeScreen) {
        this.isSidebarVisible = true;
      } else {
        this.isSidebarVisible = false;
      }
    },
    ...mapActions(module.product.name, ["getAll", "getById"]),
  }
};
</script> -->

<style scoped>
.filter-container {
  position: sticky;
  top: 64px;
  height: fit-content;
  z-index: 10;
  border: none;
  border-radius: 8px;
}

.filter-title {
  color: #2c3e50;
  font-weight: 600;
}

.filter-section {
  padding-bottom: 12px;
  border-bottom: 1px solid #eee;
}

.filter-section:last-child {
  border-bottom: none;
}

.product-list-container {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}

.sidebar {
  width: 300px;
  flex-shrink: 0;
  position: sticky;
  top: 64px;
  height: fit-content;
}

.header-divider {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
}

.header-divider .line {
  flex: 1;
  height: 1px;
  background-color: #2c3e50;
}

.header-divider .dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #2c3e50;
}

@media (max-width: 991px) {
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    max-width: 350px;
    background: white;
    box-shadow: 0 0 15px rgba(0,0,0,0.1);
    z-index: 1000;
    overflow-y: auto;
  }

  .product-list-container {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}

@media (max-width: 576px) {
  .product-list-container {
    grid-template-columns: 1fr;
  }
}
</style>

<script>
import { mapActions, mapGetters } from "vuex";
import constant from "../constant/constant.js";
import { nextTick } from "vue";
import module from "../constant/module.js";
import ProductCard from "../components/ProductCard.vue";
import { Checkbox, MultiSelect, Select } from "primevue";
import { useRoute } from "vue-router";


function findMenuAndCollectCategoryIds(menus, targetName) {
  let result = {
    menu: null,
    categoryIds: []
  };

  function recursiveSearch(menu) {
    if (menu.path.toLowerCase() === `/${targetName.toLowerCase()}` || result.menu) {
      if(!result.menu)
        result.menu = menu;

      if (menu.menuItems && Array.isArray(menu.menuItems)) {
        for (const item of menu.menuItems) {
          if (!result.categoryIds.includes(item.productCategoryId)) {
            result.categoryIds.push(item.productCategoryId);
          }
        }
      }
      if (menu.childs && menu.childs.length > 0) {
        for (const child of menu.childs) {
          // lanjut cari child menu
          recursiveSearch(child);
        }
      }
    }
    else{
      if (menu.childs && menu.childs.length > 0) {
        for (const child of menu.childs) {
          // lanjut cari child menu
          if (!result.menu) recursiveSearch(child);
        }
      }
    }
  }

  for (const menu of menus) {
    recursiveSearch(menu);
    if (result.menu) break; // stop kalau sudah ketemu
  }

  return result;
}

export default {
  components: {
    ProductCard, Select, MultiSelect, Checkbox
  },
  computed: {
    ...mapGetters(module.menu.name, ["menus"]),
    getProductFiltered() {
      return this.products.filter(data => {
        const prices = data.productSkus.map(item => item.price)
        let priceValid = true
        let stockValid = true
        let cpuValid = true
        let vgaValid = true
        let sortValid = true
        let saleValid = true

        // Validasi harga
        if (prices.length) {
          priceValid = this.filter.priceRange[1] >= Math.min(...prices) &&
                      (this.filter.priceRange[0] <= Math.max(...prices) || 
                       this.filter.priceRange[0] <= Math.min(...prices));
        }

        // Validasi stok
        stockValid = !this.filter.stockStatus || 
                    this.filter.stockStatus === this.stockStatusList[0].label ? true :
                    this.filter.stockStatus === this.stockStatusList[1].label ? 
                    data.productSkus.find(x => x.stock > 0) : 
                    data.productSkus.find(x => x.stock <= 0);

        // Validasi CPU dari component specs
        if (this.filter.cpu && this.filter.cpu.length > 0) {
          const cpuBrand = data.componentSpecs?.find(spec => 
            spec.specKey === 'processor_brand'
          )?.value;
          const cpuModel = data.componentSpecs?.find(spec => 
            spec.specKey === 'processor_model'
          )?.value;

          cpuValid = this.filter.cpu.some(cpu => 
            `${cpuBrand} ${cpuModel}` === cpu.label
          );
        }

        // Validasi VGA dari component specs
        if (this.filter.vga && this.filter.vga.length > 0) {
          const gpuModel = data.componentSpecs?.find(spec => 
            spec.specKey === 'gpu_model'
          )?.value;

          vgaValid = this.filter.vga.some(vga => 
            gpuModel === vga.label
          );
        }

        // Validasi RAM Type dari component specs
        if (this.filter.ramType && this.filter.ramType.length > 0) {
          const ramType = data.componentSpecs?.find(spec => 
            spec.specKey === 'ram_ram_type'
          )?.value;

          ramTypeValid = this.filter.ramType.some(type => 
            ramType?.includes(type.label)
          );
        }

        console.log(priceValid, saleValid, cpuValid, vgaValid, saleValid)
        return priceValid && stockValid && cpuValid && vgaValid && saleValid
      }).sort((a, b) => {
        if (!this.filter.sort) return 0

        const priceA = Math.min(...a.productSkus.map(sku => sku.price))
        const priceB = Math.min(...b.productSkus.map(sku => sku.price))

        switch(this.filter.sort.label) {
          case 'Harga terendah':
            return priceA - priceB
          case 'Harga tertinggi':
            return priceB - priceA
          case 'Terbaru':
            return new Date(b.createdAt) - new Date(a.createdAt)
          case 'Nama A ke Z':
            return a.name.localeCompare(b.name)
          case 'Nama Z ke A':
            return b.name.localeCompare(a.name)
          default:
            return 0
        }
      })
    }
  },
  watch:{
    menu:{
      immediate: true,
      async handler(){
        if(this.menus){
          await this.setFilterData()
        }
      }
    },
    menus:{
      immediate: true,
      deep: true,
      async handler(){
        if(this.menus){
          await this.setFilterData()
        }
      }
    }
  },
  data() {
    return {
      route: useRoute(),
      isSidebarVisible: false,
      isLargeScreen: window.innerWidth >= 992, // 'lg' breakpoint
      cpuList:[
          {label:"INTEL CORE i7-14700K"},
          {label:"INTEL CORE i9-13900KS"}
      ],
      vgaList:[
          {label:"RTX 4070 Ti SUPER 16GB"}
      ],
      stockStatusList:[
          {label:"Semua"},
          {label:"Stok Tersedia"},
          {label:"Stok Habis"}
      ],
      sortList:[
          {label:"Default"},
          {label:"Harga terendah"},
          {label:"Harga tertinggi"},
          {label:"Terbaru"},
          // {label:"Populer"},
          // {label:"Acak"},
          {label:"Nama A ke Z"},
          {label:"Nama Z ke A"},
          // {label:"Rating Tertinggi"},
      ],
      filter:{
          priceRange:[0, 100000000],
          sort:null,
          cpu:null,
          vga:null,
          stockStatus:null,
          onSale:null
      },
      products:[],
      menu: null
    };
  },
  mounted() {
    this.filter.stockStatus = this.stockStatusList[0].label
    this.handleResize(); // initial state
    window.addEventListener("resize", this.handleResize);

    nextTick(async ()=>{
      
    })

  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
  async created(){
  },
  methods: {
    async setFilterData(){
      const { menu, categoryIds } = findMenuAndCollectCategoryIds(this.menus, this.route.params?.menu);
      this.menu = menu?.name.toUpperCase()

      this.products = await this.getAll({
        brandIds: this.route.query?.brandIds,
        tag: this.route.query?.tag,
        query: this.route.query?.keyword,
        productCategoryIds: categoryIds.length <= 0 ? this.route.params?.menu.toLowerCase() == 'all' ? null : '-1' : categoryIds.join(',')
      })

      const cpuSet = new Set();
      const vgaSet = new Set();
      const ramSet = new Set();

      this.products.forEach(product => {
        product.productSkus.forEach(sku => {
          sku.componentSpecs?.forEach(spec => {
            const value = spec.value?.toUpperCase();
            if (!value) return;

            switch (spec.specKey) {
              case 'cpu_model':
                cpuSet.add(value);
                break;
              case 'gpu_model':
                vgaSet.add(value);
                break;
              case 'ram_ram_type':
                ramSet.add(value);
                break;
            }
          });
        });
      });

      this.cpuList = Array.from(cpuSet).sort().map(label => ({ label }));
      this.vgaList = Array.from(vgaSet).sort().map(label => ({ label }));
      this.ramList = Array.from(ramSet).sort().map(label => ({ label }));

      return;
    },
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
    },
    handleResize() {
      const width = window.innerWidth;
      this.isLargeScreen = width >= 992;
      if (this.isLargeScreen) {
        this.isSidebarVisible = true;
      } else {
        this.isSidebarVisible = false;
      }
    },
    ...mapActions(module.product.name, ["getAll", "getById"]),
  }
};
</script>


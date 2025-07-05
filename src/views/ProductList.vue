<template>
  <div class="container">
    <div class="d-flex">
      <!-- Sidebar -->
      <!-- <aside
        class="sidebar"
        :class="{
          'd-none': !isLargeScreen && !isSidebarVisible,
          'd-block': isLargeScreen || isSidebarVisible
        }"
      >
        <div class="card">
          <div class="card-header d-flex justify-content-between align-items-center">
              <div class="d-flex" style="align-items: center;">
                  <i class="fa fa-filter me-2"/>
                  <div>Filter Produk</div>
              </div>
              <div 
                  v-if="isSidebarVisible && !isLargeScreen"
                  @click="toggleSidebar"
                  style="cursor: pointer; border: 1px solid #dedede; padding: 4px 24px; border-radius: 8px;">
                  Close
              </div>
          </div>
          <div class="card-body">
              <div class="filter-product">
                  <div>
                      <div>
                          <div>Rentang Harga</div>
                      </div>
                      <PriceRange v-model="filter.priceRange" @update:modelValue="handleRangeUpdate" />
                  </div>
                  <div>
                      <div>
                          <div>Urutkan</div>
                      </div>
                      <Select showClear  size="small" name="sortList.label" :options="sortList" optionLabel="label" placeholder="Urutkan berdasarkan" fluid />
                  </div>
                  <div>
                      <div>
                          <div>CPU</div>
                      </div>
                      <MultiSelect showClear  style="width: 100%;" size="small" name="sortList.label" :options="cpuList" optionLabel="label" placeholder="Pilih CPU" fluid />
                  </div>
                  <div>
                      <div>
                          <div>VGA</div>
                      </div>
                      <MultiSelect showClear  size="small" name="sortList.label" :options="vgaList" optionLabel="label" placeholder="Pilih VGA" fluid />
                  </div>
                  <div>
                      <div>
                          <div>Stock Status</div>
                      </div>
                      <Select showClear  size="small" name="sortList.label" :options="stockStatusList" optionLabel="label" placeholder="Pilih Stock Status" fluid />
                  </div>
                  <div>
                      <div>On Sale</div>
                      <Checkbox label="" name="filterDiscount" class="me-2 ms-3"/>
                      <label for="filterDiscount" style="font-size: 12px;"> Sedang Diskon! </label>
                  </div>
              </div>
              <div class="button-apply-filer" @click="applyFilter()">Terapkan</div>
          </div>
        </div>
      </aside> -->

      <!-- Main Content -->
      <div class="flex-grow-1">
        <div class="container">
          <div class="row mb-2 pl-4">
            <div class="col">

              <div @click="toggleSidebar" v-if="!isSidebarVisible" class="btn btn-outline-primary d-flex align-items-center">
                <i class="fa fa-filter me-2" />
                <div>filter</div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col">
              <div class="header mb-2">
                <div class="text-center">PRODUK</div>
                <div class="d-flex justify-content-center mt-2 mb-2">
                  <!-- <div v-for="menu in currentMenu">{{ menu.label }}</div> -->
                  <div class="bg-dark rounded-circle mx-2" style="height: 5pt; width: 5pt;"></div>
                  <div class="bg-dark rounded-circle mx-2" style="height: 5pt; width: 5pt;"></div>
                </div>
                <div class="d-flex">
                  <div class="d-flex flex-grow-1 align-items-center">
                    <div class="flex-grow-1 border border-dark"></div>
                    <div class="bg-dark rounded-circle" style="height: 7pt; width: 7pt;"></div>
                  </div>
                  <div class="product-name fs-3 mx-5 fw-bold font-title">
                    {{ $route.meta.menu?.name }}
                  </div>
                  <div class="d-flex flex-grow-1 align-items-center">
                    <div class="bg-dark rounded-circle" style="height: 7pt; width: 7pt;"></div>
                    <div class="flex-grow-1 border border-dark"></div>
                  </div>
                </div>
              </div>

              <!-- List Produk -->

              <div class="row">
                <div class="col-md-3 col-sm-6 mb-4" v-for="product in products" :key="product" >
                  <ProductCard :product="product"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import module from "../constant/module.js";
import ProductCard from "../components/ProductCard.vue";
import { Checkbox, MultiSelect, Select } from "primevue";

export default {
  components: {
    ProductCard, Select, MultiSelect, Checkbox
  },
  data() {
    return {
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
          {label:"On Stock"},
          {label:"Out of Stock"}
      ],
      sortList:[
          {label:"Default"},
          {label:"Harga terendah"},
          {label:"Harga tertinggi"},
          {label:"Aerbaru"},
          {label:"Populer"},
          {label:"Acak"},
          {label:"Nama A ke Z"},
          {label:"Nama Z ke A"},
          {label:"Rating Tertinggi"},
      ],
      filter:{
          priceRange:[0, 100000000],
          sort:{
              label: 'Urutkan',
          },
          cpu:{
              label: 'CPU',
              module:'cpu',
              isMultipleSelect: true
          },
          vga:{
              label: 'VGA',
              module:'vga',
              isMultipleSelect: true
          },
          stockStatus:{
              label: 'Stock status',
              options:[
                  {label:'In Stock'},
                  {label:'Out of Stock'},
              ]
          },
          onSale:{
          }
      },
      products:[],
      menuName: null
    };
  },
  mounted() {
    console.log("sdflkjsdflkj")
    this.handleResize(); // initial state
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
  async created(){
    this.menuName = this.$route.params.menu
    this.products = await this.getAll()
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
</script>

<style scoped>
  .sidebar {
    min-width: 300px;
    max-width: 300px;
    }
  @media (max-width: 991.98px) {
    .sidebar {
      z-index: 1050;
    }
  }
</style>


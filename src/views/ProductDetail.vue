<template>
  <div class="container product-detail-container">
    <!-- Header dengan animasi -->
    <div class="product-header" data-aos="fade-down">
      <div class="product-title">
        <div class="title-line"></div>
        <h1 class="product-name">{{ product?.name }}</h1>
        <div class="title-line"></div>
      </div>
    </div>

    <!-- Content Section -->
    <div class="product-content" data-aos="fade-up" data-aos-delay="200">
      <!-- Image Gallery -->
      <div class="product-gallery">
        <div class="main-image-container">
          <img
            v-if="selectedImage"
            :src="selectedImage"
            @error="useFallback"
            class="main-image"
            :class="{ 'zoom-effect': isZoomed }"
            @mousemove="handleZoom"
            @mouseleave="isZoomed = false"
          />
        </div>
        
        <div v-if="product?.imageIds.length > 1" class="thumbnail-container">
          <div 
            v-for="image in product?.imageIds" 
            :key="image"
            class="thumbnail"
            :class="{ 'active': selectedImage === image }"
            @click="selectedImage = image"
          >
            <img :src="image" @error="useFallback" />
          </div>
        </div>
        <!-- <button 
          v-if="product?.videoUrl" 
          class="play-button"
          @click="showVideoModal = true"
        >
          <i class="fas fa-play"></i>
        </button> -->
        <iframe style="max-width: 500px;" class="mt-3" width="100%" height="auto" v-if="product?.videoUrl" :src="`https://www.youtube.com/embed/${product?.videoUrl}`" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>

      <!-- Product Info -->
      <div class="product-info">
        <div class="price-section">
          <div class="price" v-if="minPrice === maxPrice">
            {{ formatCurrency(minPrice) }}
          </div>
          <div class="price-range" v-else>
            {{ formatCurrency(minPrice) }} - {{ formatCurrency(maxPrice) }}
          </div>
        </div>

        <!-- SKU Selection -->
        <div class="sku-section">
          <h4 class="section-title">{{product?.productSkus.length > 1 ? 'Pilih' :''}} Variasi</h4>
          <b-row gap="2">
            <b-col
              cols="auto" 
              v-for="sku in product?.productSkus" 
              :key="sku.id"
              class="sku-option"
              :class="{ 'selected': sku.id === selectedSku?.id }"
              @click="selectedSku = sku"
            >
              <div class="sku-name">{{ getSkuName(sku) }} ( <small :class="getStockClass(sku.stock)">{{ sku.stock> 0? sku.stock: 'kosong' }}</small> )</div>
              <!-- <div class="sku-stock"> -->
                <!-- <span>Stock:</span> -->
                <!-- <span :class="getStockClass(sku.stock)">{{ sku.stock> 0? sku.stock: 'kosong' }}</span> -->
              <!-- </div> -->
            </b-col>
          </b-row>
        </div>

        <!-- Add to Cart Button -->
        <button 
          class="add-to-cart-btn text-black" 
          :disabled="selectedSku?.stock <= 0"
          @click="addToCart"
          v-if="!productId"
        >
          <i class="fas fa-shopping-cart"></i>
          <span>Tambah ke Keranjang</span>
        </button>

        <!-- Product Specifications -->
        <div v-if="selectedSku?.productGroupItems.length > 0" class="specs-section">
          <h4 class="section-title">{{ getSkuName(selectedSku) || 'Spesifikasi Produk' }}</h4>
          <div class="specs-table-container">
            <table class="specs-table">
              <thead>
                <tr>
                  <th>Qty</th>
                  <th>Produk</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in selectedSku.productGroupItems" :key="item.id">
                  <td>{{ item.qty }}</td>
                  <td>{{ item.product?.name }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Component Specifications -->
        <div  v-if="selectedSku?.componentSpecs.length > 0" class="specs-section">
          <h4 class="section-title">Spesifikasi {{ getSkuName(selectedSku) }}</h4>
          <div class="specs-table-container">
            <table class="specs-table">
              <thead>
                <tr>
                  <th>Spesifikasi</th>
                  <th>Nilai</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="spec in selectedSku.componentSpecs" :key="spec.id">
                  <td>{{ $getSpecName(spec.specKey) }}</td>
                  <td>{{ spec.specValue }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Tags and Brand -->
        <div class="meta-info">
          <div class="tags">
            <span class="label">Tags:</span>
            <div class="tag-list">
              <a 
                v-for="(tag, i) in tags" 
                :key="i"
                :href="`/product/all/?tag=${tag}`"
                class="tag"
              >{{ tag }}</a>
            </div>
          </div>
          <div class="brand">
            <span class="label">Brand:</span>
            <a :href="`/product/all?brandIds=${product?.brand?.id}`" class="brand-link">
              {{ product?.brand?.name }}
            </a>
          </div>
        </div>
      </div>

      <!-- Shipping Info -->
      <div class="shipping-info" v-if="!productId">
        <div class="info-card free-shipping">
          <img src="../assets/products/free-ongkir.png" alt="Free Shipping" />
          <h4>GRATIS ONGKIR</h4>
          <p>daerah Medan, Binjai, Deli Serdang dan sekitarnya</p>
          <img src="../assets/products/fast-delivery.png" alt="Fast Delivery" />
        </div>

        <div class="info-card payment-info">
          <img src="../assets/products/xendit_logo.svg" alt="Xendit" />
          <h4>Secure Online Payment and Bank Transfer</h4>
          <div class="bank-list">
            <img src="../assets/products/bni-bank.png" alt="BNI" />
            <img src="../assets/products/mandiri-bank.png" alt="Mandiri" />
            <img src="../assets/products/permata-bank.png" alt="Permata" />
            <img src="../assets/products/jcb-bank.png" alt="JCB" />
          </div>
        </div>
      </div>
    </div>

    <!-- Product Details Tabs -->
    <div class="product-tabs" data-aos="fade-up" data-aos-delay="400">
      <TabView>
        <TabPanel header="Deskripsi">
          <div class="tab-content description-content">
            <b-row>
              <b-col cols="12" md="6" v-for="(sku, i) in product?.productSkus" :key="i">
                <div v-if="sku.productGroupItems.length > 0">
                <h4>{{ getSkuName(sku) || `Paket ${i + 1}` }}</h4>
                <table class="specs-table">
                  <thead>
                    <tr>
                      <th>Qty</th>
                      <th>Produk</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in sku.productGroupItems" :key="item.id">
                      <td>{{ item.qty }}</td>
                      <td>{{ item.product?.name }}</td>
                    </tr>
                  </tbody>
                </table>
                </div>
              </b-col>
            </b-row>
            <div class="product-description" v-html="product?.description"></div>
          </div>
        </TabPanel>

        <TabPanel header="Spesifikasi">
          <div class="tab-content specs-content">
            <b-row>
              <b-col cols="12" md="6" v-for="(sku, i) in product?.productSkus" :key="i">
                <div v-if="sku.componentSpecs.length > 0">
                  <h5>{{ getSkuName(sku) }}</h5>
                  <table class="specs-table">
                    <thead>
                      <tr>
                        <th>Spesifikasi</th>
                        <th>Nilai</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="spec in sku.componentSpecs" :key="spec.id">
                        <td>{{ $getSpecName(spec.specKey) }}</td>
                        <td>{{ spec.specValue }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </b-col>
            </b-row>
          </div>
        </TabPanel>

        <TabPanel header="Info Pengiriman">
          <div class="tab-content shipping-content">
            <h4>Informasi Penting Pengiriman</h4>
            <div class="shipping-details">
              <div class="shipping-item">
                <i class="fas fa-truck"></i>
                <h5>Gratis Ongkir</h5>
                <p>Untuk area Medan, Binjai, Deli Serdang dan sekitarnya</p>
              </div>
              <div class="shipping-item">
                <i class="fas fa-box"></i>
                <h5>Packaging Aman</h5>
                <p>Dikemas dengan aman menggunakan bubble wrap dan box yang kokoh</p>
              </div>
              <div class="shipping-item">
                <i class="fas fa-clock"></i>
                <h5>Estimasi Pengiriman</h5>
                <p>1-3 hari kerja untuk area Medan dan sekitarnya</p>
              </div>
            </div>
          </div>
        </TabPanel>
      </TabView>
    </div>

    <!-- Related Products -->
    <div class="related-products" v-if="!productId" data-aos="fade-up" data-aos-delay="600">
      <h2>Produk Terkait</h2>
      <div class="products-grid">
        <div v-for="product in relatedProducts.value" :key="product.id" class="product-card-wrapper">
          <ProductCard :product="product" />
        </div>
      </div>
    </div>
<!-- 
     <Dialog
      v-model:visible="showVideoModal"
      modal
      :style="{ width: '80vw' }"
      :closable="true"
      @hide="showVideoModal = false"
    >
      <iframe
        :src="product?.videoUrl"
        width="100%"
        height="450"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </Dialog> -->
  </div>
</template>

<script setup>
import Dialog from 'primevue/dialog'
import { ref, watch, computed, onMounted, toRef } from 'vue'
import { useRoute } from 'vue-router'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import ProductCard from '../components/ProductCard.vue'
import { useStore } from 'vuex'
import module from '../constant/module.js'
import { useCartStore } from '../store/cartStore'
import { getCurrentInstance } from 'vue'

const { proxy } = getCurrentInstance();
const $showToast = proxy.$showToast;

const route = useRoute()
const store = useStore()

const product = ref(null)
const selectedSku = ref(null)
const minPrice = ref(0)
const maxPrice = ref(0)
const stock = ref(0)
const relatedProducts = ref([])
const fallbackUsed = ref(false)
const backendURL = import.meta.env.VITE_API_URL

const selectedImage = ref(null)

const defaultImage = '/images/image-dummy.png'

const cartStore = useCartStore()


const props = defineProps({
  productId: { default: null }
})
const productId = toRef(props, 'productId')


// const imageUrl = computed(() => {
//   const ids = product.value?.imageIds
//   return ids && ids.length ? `http://localhost:5000/api/files?id=${ids[0]}` : ''
// })

const tags = computed(() => {
  const tag = product.value?.tags
  return typeof tag === 'string' ? tag.split(',').map(t => t.trim()) : []
})

function formatCurrency(number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(number)
}

function addToCart() {
  const {id, productSkus} = product.value
  const newCartItem = {
    productId: id,
    productSkuId: selectedSku.value?.id,
    qty: 1
  }
  cartStore.addItem(newCartItem)
  $showToast.success(`Berhasil menambah ke keranjang`);
}

function useFallback(event) {
  if (!fallbackUsed.value) {
    fallbackUsed.value = true
    event.target.src = defaultImage
  }
}

watch(product, (newVal) => {
  if(newVal){
    if(!product.value?.imageIds || product.value?.imageIds.length <=0){
      product.value.imageIds = [null]
    }
    if (product.value?.imageIds) {
      product.value.imageIds = product.value.imageIds.map(id =>
        id ? `${backendURL}/files?id=${id}` : defaultImage
      )
    }

    selectedImage.value = product.value?.imageIds[0]
  }
  if (newVal && Array.isArray(newVal.productSkus) && newVal.productSkus.length > 0) {
    const prices = newVal.productSkus.map(item => item.price)
    minPrice.value = Math.min(...prices)
    maxPrice.value = Math.max(...prices)
    stock.value = newVal.productSkus.reduce((sum, sku) => sum + (sku.stock || 0), 0)
  }
}, { immediate: true })

watch(
  () => productId.value ?? Number(route.params.id), // pastikan number jika route.params.id string
  async (id, oldId) => {
    console.log('productId berubah:', oldId, '=>', id)

    if (!id) return

    const result = await store.dispatch(`${module.product.name}/getById`, id)
    if (result) product.value = result
  },
  { immediate: true }
)

onMounted(async () => {
  try {
    const id = props.productId ?? route.query.id
    const result = await store.dispatch(`${module.product.name}/getById`, id)
    if (result) {
      product.value = result
      selectedSku.value = product.value.productSkus[0]
    }
  } catch (err) {
    console.error('Gagal memuat produk:', err)
  }
})

// Add new reactive refs
const isZoomed = ref(false)

// Add new methods
const handleZoom = (event) => {
  const image = event.target
  const { left, top, width, height } = image.getBoundingClientRect()
  const x = (event.clientX - left) / width * 100
  const y = (event.clientY - top) / height * 100
  
  image.style.transformOrigin = `${x}% ${y}%`
  isZoomed.value = true
}
function getSkuName(sku){
    // console.log(product.value)
    // return sku.name
    const currentProduct = product.value

    if(!currentProduct?.productSkuVariants || currentProduct?.productSkuVariants.length <=0){
      return sku.name
    }
    return currentProduct?.productSkuVariants?.filter(data=> data.productSkuId == sku.id)
          .map(ps=> currentProduct.productVariantOptionValues.find(p=> p.id == ps.productVariantOptionValueId)?.name)
          .join('/')
}

const getStockClass = (stock) => {
  if (stock <= 0) return 'out-of-stock'
  if (stock <= 5) return 'low-stock'
  return 'in-stock'
}

</script>

<style scoped>

.main-image-container {
  position: relative;
  aspect-ratio: 1;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.7);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.play-button i {
  color: white;
  font-size: 24px;
}

.play-button:hover {
  background: var(--gold);
  transform: translate(-50%, -50%) scale(1.1);
}

.product-detail-container {
  padding: 2rem 12px;
}

/* Product Header */
.product-header {
  margin-bottom: 3rem;
}

.product-title {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.title-line {
  flex: 1;
  height: 2px;
  background: linear-gradient(to right, transparent, var(--gold), transparent);
}

.product-name {
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  color: #333;
  margin: 0;
  white-space: nowrap;
}

/* Product Content Layout */
.product-content {
  display: grid;
  grid-template-columns: 1fr 1.2fr 300px;
  gap: 2rem;
  margin-bottom: 3rem;
}

/* Image Gallery */
.product-gallery {
  position: sticky;
  top: 80px;
}

.main-image-container {
  aspect-ratio: 1;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.main-image.zoom-effect {
  transform: scale(1.5);
}

.thumbnail-container {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  overflow-x: auto;
  padding: 0.5rem;
}

.thumbnail {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.thumbnail.active {
  border-color: var(--gold);
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Product Info */
.product-info {
  padding: 1rem;
}

.price-section {
  margin-bottom: 2rem;
}

.price,
.price-range {
  font-size: 2rem;
  font-weight: 700;
  color: var(--gold);
}

/* SKU Selection */
.sku-section {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #333;
}

.sku-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.sku-option {
  margin: 4px;
  padding: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.sku-option:hover {
  border-color: var(--gold);
  transform: translateY(-2px);
}

.sku-option.selected {
  border-color: var(--gold);
  background: rgba(var(--gold-rgb), 0.1);
}

.sku-name {
  font-weight: 600;
  /* margin-bottom: 0.5rem; */
}

.sku-stock {
  font-size: 0.9rem;
  display: flex;
  gap: 12px;
  /* justify-content: space-between; */
}

.out-of-stock { color: #dc3545; }
.low-stock { color: #ffc107; }
.in-stock { color: #28a745; }

/* Add to Cart Button */
.add-to-cart-btn {
  width: 100%;
  padding: 1rem;
  background: var(--gold);
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 2rem 0;
}

.add-to-cart-btn:hover {
  background: var(--yellow-400);
  transform: translateY(-2px);
}

.add-to-cart-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

/* Specs Table */
.specs-table-container {
  margin: 1rem 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.specs-table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  font-size: 12px !important;
  background: white;
}

.specs-table th {
  background: var(--gold);
  color: #333;
  padding: 1rem;
  text-align: left;
  font-weight: 600;
}

.specs-table td {
  padding: 1rem;
  border-bottom: 1px solid #e0e0e0;
}

.specs-table tr:last-child td {
  border-bottom: none;
}
.specs-table tr:nth-child(odd) {
  background-color: #fffaf0; /* Light gold-ish striping */
}

.specs-table tr:hover {
  background-color: #fff2cc; /* soft highlight on hover */
}

/* Meta Info */
.meta-info {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e0e0e0;
}

.tags,
.brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.label {
  color: #666;
  font-weight: 500;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  padding: 0.25rem 0.75rem;
  background: #f5f5f5;
  border-radius: 20px;
  color: #666;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.tag:hover {
  background: var(--gold);
  color: white;
}

.brand-link {
  color: var(--gold);
  text-decoration: none;
  font-weight: 500;
}

/* Shipping Info Cards */
.shipping-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.info-card img {
  width: auto;
  height: 50px;
  margin-bottom: 1rem;
}

.info-card h4 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.info-card p {
  font-size: 0.9rem;
  color: #666;
}

.bank-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  margin-top: 1rem;
}

.bank-list img {
  width: 100%;
  height: auto;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 0.25rem;
}

/* Product Tabs */
.product-tabs {
  margin: 3rem 0;
}

.tab-content {
  padding: 2rem;
}

.shipping-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.shipping-item {
  text-align: center;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.shipping-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.shipping-item i {
  font-size: 2rem;
  color: var(--gold);
  margin-bottom: 1rem;
}

/* Related Products */
.related-products {
  margin-top: 4rem;
}

.related-products h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 2rem;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .product-content {
    grid-template-columns: 1fr 1fr;
  }

  .shipping-info {
    grid-column: span 2;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 991px) {
  .product-content {
    grid-template-columns: 1fr;
  }

  .product-gallery {
    position: static;
  }

  .shipping-info {
    grid-column: auto;
    grid-template-columns: 1fr;
  }

  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }
}

@media (max-width: 768px) {
  .product-title {
    flex-direction: column;
    gap: 1rem;
  }

  .title-line {
    height: 1px;
  }

  .product-name {
    font-size: 1.5rem;
  }

  .sku-grid {
    grid-template-columns: 1fr;
  }

  .shipping-details {
    grid-template-columns: 1fr;
  }
}
</style>
<template>
  <div
    class="product-container card border-0 shadow-sm position-relative h-100" 
    @click.prevent="detail(product)"
    @mouseover="product.hover = true"
    @mouseleave.prevent="product.hover = false"
  >
    <div class="card-body product-card p-3">
      <div class="product-image-container mb-3 position-relative">
        <img
          :class="[product.hover ? 'hover-effect' : '', 'product-image']"
          :src="imageUrl || constant.DEFAULT_PRODUCT_IMAGE"
          @error="useFallback"
        />
        <div class="stock-badge" v-if="product && product.productSkus && !product.productSkus.find(sku=> sku.stock > 0)">
          <span class="badge bg-danger">Stok Habis</span>
        </div>
      </div>
      
      <div class="product-info">
        <h5 class="product-name text-truncate mb-2" :title="product.name">{{ product.name }}</h5>
        <div class="price-container mb-3">
          <div class="fw-bold" v-if="minPrice.value === maxPrice.value">
            {{ formatCurrency(minPrice) }}
          </div>
          <div v-else class="fw-bold">
            {{ formatCurrency(minPrice.value) }} - {{ formatCurrency(maxPrice.value) }}
          </div>
        </div>
      </div>

      <div class="action-buttons d-flex gap-2 mt-auto">
        <button class="btn btn-outline-primary flex-grow-1 text-black" @click.stop.prevent="detail(product)">
          <i class="fas fa-eye me-1"></i> Detail
        </button>
        <button 
          :class="isAlreadyCompared ? 'btn-secondary' : 'btn-warning'" 
          class="btn" 
          @click.stop.prevent="compare" 
          :disabled="isAlreadyCompared"
          :title="isAlreadyCompared ? 'Sudah dibandingkan' : 'Bandingkan produk'"
        >
          <i class="fas fa-exchange-alt"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCompareProductStore } from '../store/compareProductStore'
import { toRefs } from 'vue'
import constant from '../constant/constant'


const props = defineProps({
  product: Object
})

const { product } = toRefs(props)

const router = useRouter()
const fallbackUsed = ref(false)

const compareProductStore = useCompareProductStore()

const minPrice = ref(0)
const maxPrice = ref(0)

watch(product, (newVal) => {
  if (newVal && Array.isArray(newVal.productSkus) && newVal.productSkus.length > 0) {
    const prices = newVal.productSkus.map(item => item.price)
    if(prices.length){
        minPrice.value = Math.min(...prices)
        maxPrice.value = Math.max(...prices)
    }
  }
}, { immediate: true })

const imageUrl = computed(() => {
    const ids = product.value?.imageIds
    if (!ids || !ids.length) return ''
    return `http://localhost:5000/api/files?id=${ids[0]}`
})

const isAlreadyCompared = computed(() =>
  compareProductStore.items?.some(p => p.id === product.value.id)
)

function formatCurrency(number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(number)
}

function compare() {
  compareProductStore.addItem(product.value)
}

function useFallback(event) {
  if (!fallbackUsed.value) {
    fallbackUsed.value = true
    event.target.src = constant.DEFAULT_PRODUCT_IMAGE
  }
}

function detail(product) {
  router.push(`/product-detail/${product.name.trim()}?id=${product.id}`)
}

</script><style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: all 0.3s ease;
  border: none;
}

.product-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.1) !important;
}

.product-image-container {
  position: relative;
  padding-top: 100%;
  overflow: hidden;
  border-radius: 8px;
}

.product-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.hover-effect {
  transform: scale(1.05);
}

.product-name {
  font-size: 1rem;
  line-height: 1.4;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.price-container {
  font-size: 1.1rem;
  color: var(--gold);
}

.stock-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2;
}

.action-buttons {
  margin-top: auto;
}

.action-buttons .btn {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.action-buttons .btn:hover {
  transform: translateY(-2px);
}
</style>

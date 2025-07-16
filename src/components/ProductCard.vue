<template>
  <div
    class="product-container card border-0 shadow-sm position-relative" 
    @click.prevent="detail(product)"
    @mouseover="product.hover = true"
    @mouseleave.prevent="product.hover = false"
  >
    <div class="card-body product-card p-1">
      <div>
        <img
          :class="product.hover ? 'blur' : ''"
          class="card-img-top"
          :src="imageUrl || constant.DEFAULT_PRODUCT_IMAGE"
          @error="useFallback"
        />
        <div class="fs-5 fw-semibold font-title">{{ product.name }}</div>
        <div class="fw-semibold" v-if="minPrice.value === maxPrice.value">
          {{ formatCurrency(minPrice) }}
        </div>
        <div v-else class="fw-semibold">
          {{ formatCurrency(minPrice.value) }} - {{ formatCurrency(maxPrice.value) }}
        </div>
        <div class="text-danger" v-if="product && product.productSkus && !product.productSkus.find(sku=> sku.stock > 0)">Out of Stock</div>
      </div>
      <div class="text-center mt-2">
          <button :class="isAlreadyCompared ? '' : 'btn-warning'" class="btn btn-sm px-4" @click.stop.prevent="compare" :disabled="isAlreadyCompared">
              <i class="fas fa-exchange-alt" />
              <span class="ms-2">{{ isAlreadyCompared ? 'Dibandingkan' : 'Bandingkan' }}</span>
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

</script>
<style>
.product-card{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #dedede;
  border-radius: 8px;
}
.product-container{
  cursor: pointer;
}
</style>
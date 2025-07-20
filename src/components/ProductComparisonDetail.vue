<template>
  <div class="card border text-center" style="min-width: 300px;">
    <div class="card-body">
      <div>
        <img
          :class="product.hover ? 'blur' : ''"
          width="200px"
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
          <button  class="btn btn-warning btn-sm px-4" @click="addToCart" :disabled="stock == 0">
            <i class="fas fa-shopping-cart" />
            <span class="ms-2">Masukkan ke keranjang</span>
          </button>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { toRefs } from 'vue'
import constant from '../constant/constant'


const props = defineProps({
  product: Object
})

const { product } = toRefs(props)

const router = useRouter()
const fallbackUsed = ref(false)

const minPrice = ref(0)
const maxPrice = ref(0)
const stock = ref(0)

const productSpec = ref(null)

watch(product, (newVal) => {
  if (newVal && Array.isArray(newVal.productSkus) && newVal.productSkus.length > 0) {
    const prices = newVal.productSkus.map(item => item.price)
    stock.value = newVal.productSkus.reduce((acc, val) => {
      acc += val.stock ?? 0
    }, 0)
    if(prices.length){
        minPrice.value = Math.min(...prices)
        maxPrice.value = Math.max(...prices)
    }

    if(newVal.productType?.code == "group") {
      console.log(newVal)
      var x = parseProductSpecs(newVal.productSkus);
      console.log(x)
    }
  }
}, { immediate: true })

function parseProductSpecs(variants) {
  // Semua harga untuk dijadikan rentang
  const allPrices = [];

  // Object penampung hasil akhir
  const result = {
    price: "",
    components: {},
    additionalComponents: []
  };

  // Untuk menampung components berdasarkan componentType
  const componentGroups = {};

  // Loop setiap product SKU (variant)
  variants.forEach(variant => {
    let totalPrice = 0;

    // 1. Hitung total harga dari productGroupItems
    variant.productGroupItems.forEach(item => {
      const price = item.product?.productSkus?.[0]?.price || 0;
      totalPrice += price;

      // 2. Komponen atau bukan?
      const compType = item.product?.componentType;
      const name = item.product?.name;

      if (compType && name) {
        // Group by component type (CPU, RAM, etc.)
        if (!componentGroups[compType]) {
          componentGroups[compType] = new Set();
        }
        componentGroups[compType].add(name);
      } else if (name) {
        // Additional components
        result.additionalComponents.push(name);
      }
    });

    allPrices.push(totalPrice);
  });

  // 3. Hitung range harga
  const uniquePrices = [...new Set(allPrices)];
  if (uniquePrices.length === 1) {
    result.price = uniquePrices[0].toLocaleString(); // misal: "5.000.000"
  } else {
    const min = Math.min(...uniquePrices);
    const max = Math.max(...uniquePrices);
    result.price = `${min.toLocaleString()} - ${max.toLocaleString()}`;
  }

  // 4. Siapkan components
  Object.entries(componentGroups).forEach(([type, names]) => {
    const nameArray = Array.from(names);
    result.components[type] = nameArray.length === 1 ? nameArray[0] : nameArray.join(" - ");
  });

  return result;
}


const imageUrl = computed(() => {
    const ids = product.value?.imageIds
    if (!ids || !ids.length) return ''
    return `http://localhost:5000/api/files?id=${ids[0]}`
})

function formatCurrency(number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(number)
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
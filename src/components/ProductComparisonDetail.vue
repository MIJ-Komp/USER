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
        <div class="text-danger" v-if="product && product.productType?.code !== 'group' && product.productSkus && !product.productSkus.find(sku=> sku.stock > 0)">Out of Stock</div>
      </div>
      <div class="text-center mt-2">
          <!-- Untuk produk group, tombol selalu aktif karena tidak bergantung pada stock individual -->
          <button v-if="product && product.productType?.code === 'group'" class="btn btn-warning btn-sm px-4" @click="addToCart">
            <i class="fas fa-shopping-cart" />
            <span class="ms-2">Masukkan ke keranjang</span>
          </button>
          <!-- Untuk produk single, cek stock seperti biasa -->
          <button v-else-if="product && stock > 0" class="btn btn-warning btn-sm px-4" @click="addToCart">
            <i class="fas fa-shopping-cart" />
            <span class="ms-2">Masukkan ke keranjang</span>
          </button>
          <button v-else class="btn btn-secondary btn-sm px-4" disabled>
            <i class="fas fa-shopping-cart" />
            <span class="ms-2">Stok Habis</span>
          </button>
        </div>
        
        <!-- Data Comparison untuk produk single -->
        <div v-if="product && product.productType?.code === 'single' && product.productSpec" class="mt-3 border-top pt-3">
          <h6 class="text-start mb-2">Spesifikasi:</h6>
          <div class="text-start">
            <!-- Jika productSpec adalah JSON string yang valid -->
            <div v-if="parsedProductSpec" v-for="(value, key) in parsedProductSpec" :key="key" class="row mb-1">
              <div class="col-5 text-muted small">{{ key }}:</div>
              <div class="col-7 small">{{ value }}</div>
            </div>
            <!-- Jika productSpec tidak dapat di-parse sebagai JSON, tampilkan sebagai plain text -->
            <div v-else class="small">
              {{ product.productSpec }}
            </div>
          </div>
        </div>
        
        <!-- Data Comparison untuk produk group -->
        <div v-if="product && product.productType?.code === 'group' && sortedGroupComparisonData" class="mt-3 border-top pt-3">
          <h6 class="text-start mb-2">Komponen Bundle:</h6>
          <div class="table-responsive">
            <table class="table table-sm table-bordered">
              <thead class="table-light">
                <tr>
                  <th class="small">Komponen</th>
                  <th class="small">Produk</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(items, componentType) in sortedGroupComparisonData" :key="componentType">
                  <td class="small text-muted">{{ componentType || 'Lainnya' }}</td>
                  <td class="small">{{ items.join(', ') }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { toRefs } from 'vue'
import constant from '../constant/constant'
import { useCartStore } from '../store/cartStore'


const props = defineProps({
  product: Object
})

const { product } = toRefs(props)

const router = useRouter()
const cartStore = useCartStore()
const fallbackUsed = ref(false)

const minPrice = ref(0)
const maxPrice = ref(0)
const stock = ref(0)

const productSpec = ref(null)

// Computed property untuk parsing productSpec JSON
const parsedProductSpec = computed(() => {
  if (!product.value?.productSpec) return null;
  
  try {
    // Coba parse productSpec sebagai JSON
    return JSON.parse(product.value.productSpec);
  } catch (error) {
    // Jika gagal parse, return null untuk menampilkan sebagai plain text
    return null;
  }
})

// Computed property untuk sorting group comparison data
const sortedGroupComparisonData = computed(() => {
  if (!groupComparisonData.value) return null;
  
  const sorted = Object.keys(groupComparisonData.value)
    .sort()
    .reduce((result, key) => {
      result[key] = groupComparisonData.value[key];
      return result;
    }, {});
  
  return sorted;
})

// Computed property untuk group comparison data
const groupComparisonData = computed(() => {
  if (!product.value || product.value.productType?.code !== 'group' || !product.value.productSkus) {
    console.log('Group comparison: Product tidak valid atau bukan tipe group');
    return null;
  }
  
  console.log('Group comparison: Processing product', product.value);
  const componentMap = {};
  
  // Iterasi semua productSkus
  product.value.productSkus.forEach(sku => {
    console.log('Processing SKU:', sku);
    if (sku.productGroupItems && Array.isArray(sku.productGroupItems)) {
      sku.productGroupItems.forEach(groupItem => {
        const productItem = groupItem.product;
        if (productItem) {
          // Ambil componentType name atau gunakan 'Lainnya' jika null
          const componentTypeName = productItem.componentType?.name || 'Lainnya';
          
          // Buat nama produk: product.name + productSkus[0].name (jika ada)
          let productName = productItem.name;
          if (productItem.productSkus && productItem.productSkus.length > 0 && productItem.productSkus[0].name) {
            productName += ` - ${productItem.productSkus[0].name}`;
          }
          
          console.log('Adding component:', componentTypeName, 'Product:', productName);
          
          // Inisialisasi array jika belum ada
          if (!componentMap[componentTypeName]) {
            componentMap[componentTypeName] = [];
          }
          
          // Tambahkan ke array jika belum ada (hindari duplikasi)
          if (!componentMap[componentTypeName].includes(productName)) {
            componentMap[componentTypeName].push(productName);
          }
        }
      });
    }
  });
  
  console.log('Final componentMap:', componentMap);
  return Object.keys(componentMap).length > 0 ? componentMap : null;
})

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
    return `${constant.BASE_URL_API}/files?id=${ids[0]}`
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

function addToCart() {
  try {
    if (!product.value) {
      console.error('Product tidak tersedia');
      return;
    }

    // Untuk produk group, selalu bisa masuk cart karena tidak bergantung pada stock individual
    if (product.value.productType?.code === 'group') {
      // Ambil SKU pertama untuk produk group
      const firstSku = product.value.productSkus?.[0];
      if (!firstSku) {
        console.error('SKU tidak tersedia untuk produk group');
        return;
      }

      const cartItem = {
        id: product.value.id,
        name: product.value.name,
        price: firstSku.price,
        qty: 1,
        skuId: firstSku.id,
        skuName: firstSku.name,
        imageIds: product.value.imageIds,
        productType: product.value.productType
      };

      cartStore.addItem(cartItem);
      console.log('Produk group berhasil ditambahkan ke cart:', cartItem);
      return;
    }

    // Untuk produk single, cek stock seperti biasa
    const availableSku = product.value.productSkus?.find(sku => sku.stock > 0);
    if (!availableSku) {
      console.error('Tidak ada SKU dengan stock tersedia');
      return;
    }

    const cartItem = {
      id: product.value.id,
      name: product.value.name,
      price: availableSku.price,
      qty: 1,
      skuId: availableSku.id,
      skuName: availableSku.name,
      imageIds: product.value.imageIds,
      productType: product.value.productType
    };

    cartStore.addItem(cartItem);
    console.log('Produk berhasil ditambahkan ke cart:', cartItem);
  } catch (error) {
    console.error('Error menambahkan produk ke cart:', error);
  }
}

</script>
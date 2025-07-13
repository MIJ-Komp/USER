<template>
  <div class="container">
    <!-- Header  -->
    <div class="row mb-4">
      <div class="col-12">
        <div class="text-center fw-semibold">PRODUK</div>
        <div class="d-flex justify-content-center my-2">
          <div class="bg-dark rounded-circle m-2" style="height: 7pt; width: 7pt;"></div>
          <div class="bg-dark rounded-circle m-2" style="height: 7pt; width: 7pt;"></div>
        </div>
        <div class="d-flex">
          <div class="d-flex flex-grow-1 align-items-center">
            <div class="flex-grow-1 border border-dark"></div>
            <div class="bg-dark rounded-circle" style="height: 7pt; width: 7pt;"></div>
          </div>
          <div class="product-name fs-1 mx-5 fw-bold font-title">
            {{ product?.name }}
          </div>
          <div class="d-flex flex-grow-1 align-items-center">
            <div class="bg-dark rounded-circle" style="height: 7pt; width: 7pt;"></div>
            <div class="flex-grow-1 border border-dark"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Body -->
    <div class="row mb-4">
      <div class="col-md-4">
        <img
          :class="product?.hover ? 'blur' : ''"
          class="card-img-top shadow-sm"
          :src="imageUrl.value || defaultImage"
          @error="useFallback"
        />
      </div>
      <div class="col-md-6">
        <div class="mb-4">
          <div class="mb-4">
            <div class="mb-2 fs-3">
              <div v-if="minPrice === maxPrice">
                {{ formatCurrency(minPrice) }}
              </div>
              <div v-else>
                {{ formatCurrency(minPrice) }} - {{ formatCurrency(maxPrice) }}
              </div>
            </div>
            <div class="mb-4">
              Stock : {{ product?.productSkus?.[0]?.stock ?? 'N/A' }}
            </div>
            <button class="btn btn-warning" @click="addToCart">
              <span class="fw-semibold">Tambah ke keranjang</span>
              <i class="fa fa-shopping-cart" />
            </button>

            <div v-if="selectedSku" class="mt-2">
              <div class="fs-5 fw-bold py-2" v-if="selectedSku.name">Variasi : {{ selectedSku.name }}</div>
              <table border="1" cellpadding="8" cellspacing="0" class="productSpec">
                <thead>
                  <tr>
                    <th>Spec</th>
                    <th>Spec Value</th>
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
          <div class="flex fs-sm mb-1">
            <span class="text-secondary">Tags : </span>
            <span v-for="(tag, i) in tags" :key="i">
              <a class="text-decoration-none text-info" :href="`/products?tag=${tag}`">{{ tag }}</a>{{ i === tags.length - 1 ? '' : ', ' }}
            </span>
          </div>
          <div class="flex fs-sm">
            <span class="text-secondary">Brand : </span>
            <a class="text-decoration-none text-info" :href="`/products?brandId=${product?.brand?.id}`">{{ product?.brand?.name }}</a>
          </div>
        </div>
      </div>
      <div class="col-md-2" v-if="!productId">
        <div class="card mb-4">
          <div class="card-body text-center">
            <img src="../assets/products/free-ongkir.png" width="50px" />
            <div class="fw-semibold fs-6">GRATIS ONGKIR</div>
            <span style="font-size: 12px;">daerah Medan, Binjai, Deli Serdang dan sekitarnya</span>
            <img src="../assets/products/fast-delivery.png" style="width: 50px;" />
          </div>
        </div>
        <div class="card" v-if="!productId">
          <div class="card-body text-center">
            <img src="../assets/products/xendit_logo.svg" width="100px" />
            <div class="fs-6 fw-semibold">Secure Online Payment and Bank Transfer</div>
            <div class="bank-list">
              <img class="border m-1 rounded p-1" height="25px" src="../assets/products/bni-bank.png" />
              <img class="border m-1 rounded p-1" height="25px" src="../assets/products/mandiri-bank.png" />
              <img class="border m-1 rounded p-1" height="25px" src="../assets/products/permata-bank.png" />
              <img class="border m-1 rounded p-1" height="25px" src="../assets/products/jcb-bank.png" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tab View  -->
    <div class="row mb-4">
      <TabView class="TabView">
        <TabPanel header="Deskripsi">
          <div v-html="product?.description"></div>
        </TabPanel>
        <TabPanel header="Spesifikasi">
          <!-- <div v-html="product?.productSpec"></div> -->
          <div v-for="(sku, i) in product?.productSkus">
            <div class="fs-5 fw-bold py-2">Variasi : {{ sku.name??i+1 }}</div>
            <table border="1" cellpadding="8" cellspacing="0" class="productSpec">
              <thead>
                <tr>
                  <th>Spec</th>
                  <th>Spec Value</th>
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
        </TabPanel>
        <TabPanel header="Penting! Baca Info Shipping">
          <p>Disini adalah informasi penting tentang Pengantaran Barang</p>
        </TabPanel>
      </TabView>
    </div>

    <!-- Related Product -->
    <div class="row" v-if="!productId">
      <p class="fw-semibold mb-2 fs-4">Related Products</p>
      <div v-for="product in relatedProducts.value" :key="product.id" class="col-md-3 col-lg-2">
        <ProductCard :product="product" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted, toRef } from 'vue'
import { useRoute } from 'vue-router'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import ProductCard from '../components/ProductCard.vue'
import { useStore } from 'vuex'
import module from '../constant/module.js'
import { useCartStore } from '../store/cartStore'

const route = useRoute()
const store = useStore()

const product = ref(null)
const selectedSku = ref(null)
const minPrice = ref(0)
const maxPrice = ref(0)
const stock = ref(0)
const relatedProducts = ref([])
const fallbackUsed = ref(false)

const defaultImage = '/images/image-dummy.png'

const cartStore = useCartStore()


const props = defineProps({
  productId: { default: null }
})
const productId = toRef(props, 'productId')


const imageUrl = computed(() => {
  const ids = product.value?.imageIds
  return ids && ids.length ? `http://localhost:5000/api/files?id=${ids[0]}` : ''
})

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
    productSkuId: productSkus[0].id,
    qty: 1
  }
  cartStore.addItem(newCartItem)
}

function useFallback(event) {
  if (!fallbackUsed.value) {
    fallbackUsed.value = true
    event.target.src = defaultImage
  }
}

watch(product, (newVal) => {
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
    const id = props.productId ?? route.params.id
    const result = await store.dispatch(`${module.product.name}/getById`, id)
    if (result) {
      product.value = result
      selectedSku.value = product.value.productSkus[0]
    }
  } catch (err) {
    console.error('Gagal memuat produk:', err)
  }
})
</script>

<style>
table.productSpec{
    border-radius: 8px !important;
}
  table.productSpec th,
  table.productSpec td {
    padding: 2px 4px;
    border: 1px solid #ddd;
  }
</style>
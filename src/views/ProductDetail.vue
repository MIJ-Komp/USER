<template>
  <div class="container">
    <!-- Header  -->
    <div class="row mb-4">
      <div class="col-12">
        <div class="text-center fw-semibold">PRODUK</div>
        <!-- <div class="d-flex justify-content-center my-2">
          <div class="bg-dark rounded-circle m-2" style="height: 7pt; width: 7pt;"></div>
          <div class="bg-dark rounded-circle m-2" style="height: 7pt; width: 7pt;"></div>
        </div> -->
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
          v-if="selectedImage"
          class="card-img-top shadow-sm"
          :src="selectedImage"
          @error="useFallback"
        />
        <b-row v-if="product?.imageIds.length > 1">
          <b-col cols="auto" class="mt-3" v-for="image in product?.imageIds">
            <img
              @click.stop.prevent="selectedImage = image"
              style="width: 100px; height: 100px; object-fit: contain; cursor: pointer;"
              :class="selectedImage != image ? 'blur' : ''"
              class="card-img-bottom shadow-sm"
              :src="image"
              @error="useFallback"
            />
          </b-col>
        </b-row>
      </div>
      <div class="col-md-6">
        <div class="mb-4">
          <div class="mb-4">
            <div class="mb-2 fs-2 fw-bold">
              <div v-if="minPrice === maxPrice">
                {{ formatCurrency(minPrice) }}
              </div>
              <div v-else>
                {{ formatCurrency(minPrice) }} - {{ formatCurrency(maxPrice) }}
              </div>
            </div>
            <!-- <div>
              Stock : {{ selectedSku?.stock ?? 'N/A' }}
            </div> -->
            <div class="mt-2 mb-2 fw-bold">{{product?.productSkus.length > 1 ? 'Pilih' :''}} Variasi :</div>
            <b-row class="ms-2">
              <b-col v-for="sku in product?.productSkus" :key="sku.id" cols="auto">
                <div @click.stop.prevent="selectedSku = sku" 
                :class="sku.id == selectedSku.id ? 'primary-sku': 'secondary-sku'"
                >
                  <div class="fw-bold">{{ sku.name }}</div>
                  <div>stock : <span class="fw-bold">{{ sku.stock }}</span></div>
                </div>
              </b-col>
            </b-row>
            

            <Button :disabled="selectedSku?.stock <= 0" class="p-2 mt-4" label="Tambah ke keranjang" iconFa="fa fa-shopping-cart" @click.stop.prevent="addToCart" v-if="!productId"/>

            <div class="border-bottom mt-4 mb-4 border-3"></div>
            <div v-if="selectedSku && selectedSku.productGroupItems.length > 0" class="mt-2">
              <div class="fs-5 fw-bold py-2" v-if="selectedSku.name"> {{ selectedSku.name }}</div>
              <table border="1" cellpadding="8" cellspacing="0" class="productSpec">
                <thead>
                  <tr>
                    <th>Qty</th>
                    <th>Produk</th>
                    <!-- <th>Garansi</th> -->
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="product in selectedSku.productGroupItems" :key="product.id">
                    <td>{{ product.qty }}</td>
                    <td>{{ product.product?.name }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div v-if="selectedSku && selectedSku.componentSpecs.length > 0" class="mt-2">
              <div class="fs-5 fw-bold py-2" v-if="selectedSku.name">Spec : {{ selectedSku.name }}</div>
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
          <div v-for="(sku, i) in product?.productSkus">
          <div v-if="sku.productGroupItems.length > 0" class="fs-5 fw-bold py-2">{{ sku.name??i+1 }}</div>
            <table v-if="sku.productGroupItems.length > 0" border="1" cellpadding="8" cellspacing="0" class="productSpec">
              <thead>
                  <tr>
                    <th>Qty</th>
                    <th>Produk</th>
                    <!-- <th>Garansi</th> -->
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="product in sku.productGroupItems" :key="product.id">
                    <td>{{ product.qty }}</td>
                    <td>{{ product.product?.name }}</td>
                  </tr>
                </tbody>
            </table>
            </div>
          <div v-html="product?.description"></div>
        </TabPanel>
        <TabPanel header="Spesifikasi">
          <!-- <div v-html="product?.productSpec"></div> -->
          <div v-for="(sku, i) in product?.productSkus">
            <div v-if="sku.componentSpecs.length > 0" class="fs-5 fw-bold py-2">{{ sku.name }}</div>
            <table v-if="sku.componentSpecs.length > 0" border="1" cellpadding="8" cellspacing="0" class="productSpec">
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
    console.log(product.value)
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
</script>

<style>
.primary-sku{
  cursor: pointer;
  border-radius: 8px;
  padding: 4px 24px;
  background: var(--yellow-100);
  border: 4px solid var(--gold) !important;
}
.secondary-sku{
  cursor: pointer;
  border-radius: 8px;
  padding: 4px 24px;
  border: 2px solid var(--grey-700) !important;
}
.secondary-sku:hover{
  border: 4px solid var(--yellow-300) !important;
}

.skuOption{
  cursor: pointer;
}
.skuOption:hover{
  border-color: var(--gold);
}

table.productSpec {
  width: 100%;
  border-collapse: collapse;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  font-size: 14px;
  background-color: white;
}

table.productSpec thead {
  background-color: var(--gold); /* Gold */
  color: #333;
}

table.productSpec th,
table.productSpec td {
  padding: 6px 12px;
  border: 1px solid #e0e0e0;
  text-align: left;
}

table.productSpec th {
  font-weight: 600;
}

table.productSpec tbody tr:nth-child(odd) {
  background-color: #fffaf0; /* Light gold-ish striping */
}

table.productSpec tbody tr:hover {
  background-color: #fff2cc; /* soft highlight on hover */
}

</style>
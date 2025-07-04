<template>
    <div class="container">
        <!-- Header  -->
        <div class="row mb-4">
            <div class="col-12">
                <div class="text-center fw-semibold">PRODUK</div>
                <div class="d-flex justify-content-center my-2">
                    <div class="bg-dark rounded-circle m-2" style="height: 7pt; width: 7pt;"></div>
                    <div v-for="menu in currentMenu">{{ menu.label }}</div>
                    <div class="bg-dark rounded-circle m-2" style="height: 7pt; width: 7pt;"></div>
                </div>
                <div class="d-flex">
                  <div class="d-flex flex-grow-1 align-items-center">
                    <div class="flex-grow-1 border border-dark"></div>
                    <div class="bg-dark rounded-circle" style="height: 7pt; width: 7pt;"></div>
                  </div>
                  <div class="product-name fs-1 mx-5 fw-bold font-title">
                    {{product?.name}}
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
                    :src="imageUrl || defaultImage"
                    @error="useFallback"
                />
            </div>
            <div class="col-md-6">
                <div class="mb-4">
                    <div class="mb-4">
                        <div class="mb-2 fs-3">
                            <div v-if="minPrice == maxPrice">{{ formatCurrency(minPrice) }}</div>
                            <div v-else>{{ formatCurrency(minPrice) }} - {{ formatCurrency(maxPrice) }}</div>
                        </div>
                        <div class="mb-4">
                            Stock : {{ product?.productSkus?.[0]?.stock ?? 'N/A' }}
                        </div>
                        <button class="btn btn-warning"><span class="fw-semibold">ADD TO CART</span> <i class="fa fa-shopping-cart"/></button>
                    </div>
                    <div class="flex fs-sm mb-1">
                        <span class="text-secondary">Tags : </span>
                        <span v-for="tag, i in tags" >
                            <a class="text-decoration-none text-info" :href="`/products?tag=${tag}`">{{ tag }}</a>{{ i == tags.length - 1 ? "" : ", " }}
                        </span>
                    </div>
                    <div class="flex fs-sm">
                        <span class="text-secondary">Brand : </span><a class="text-decoration-none text-info" :href="`/products?brandId=${product?.brand?.id}`">{{ product?.brand?.name }} </a>
                    </div>
                </div>
                
            </div>
            <div class="col-md-2">
                <div class="card mb-4">
                    <div class="card-body">
                        <img src="../assets/products/free-ongkir.png" width="50px"/>
                        <div class="fw-semibold fs-6">GRATIS ONGKIR</div>
                        <span style="font-size: 12px;">daerah Medan, Binjai, Deli Serdang dan sekitarnya</span>
                        <img src="../assets/products/fast-delivery.png" style="width: 50px;"/>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <div class="text-center">
                            <img src="../assets/products/xendit_logo.svg" width="100px">
                        </div>
                        <div class="fs-6 fw-semibold">Scure Online Payment and Bank Transfer</div>
                        <div class="bank-list">
                            <img class="border m-1 rounded p-1" height="25px" src="../assets/products/bni-bank.png">
                            <img class="border m-1 rounded p-1" height="25px" src="../assets/products/mandiri-bank.png">
                            <img class="border m-1 rounded p-1" height="25px" src="../assets/products/permata-bank.png">
                            <img class="border m-1 rounded p-1" height="25px" src="../assets/products/jcb-bank.png">
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
                    <div v-html="product?.productSpec"></div>
                </TabPanel>
                <TabPanel header="Penting! Baca Info Shipping">
                    <p>Disni adalah informasi penting tentang Pengantaran Barang</p>
                </TabPanel>
            </TabView>
        </div>

        <!-- Related Product -->
        <div class="row">
            <p class="fw-semibold mb-2 fs-4">Related Products</p>
            <div v-for="product in relatedProducts" class="col-md-3 col-lg-2">
                <ProductCard :product="product"/>
            </div>
        </div>
    </div>

</template>

<script>
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import ProductCard from '../components/ProductCard.vue';
import { mapActions } from "vuex";
import module from "../constant/module.js";
export default{
    components:{
        ProductCard, TabPanel, TabView
    },
    data(){
        return{
            product: null,
            minPrice: 0,
            maxPrice: 0,
            stock: 0,
            relatedProducts:[],
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
        }
    },
    watch: {
        product: {
            handler(newProduct) {
                if (newProduct && Array.isArray(newProduct.productSkus) && newProduct.productSkus.length > 0) {
                    // get prices
                    const prices = newProduct.productSkus.map(item => item.price);
                    this.minPrice = Math.min(...prices);
                    this.maxPrice = Math.max(...prices);

                    // get stock
                    this.stock = this.product.productSkus.reduce((sum, sku) => sum + (sku.stock || 0), 0);
                }
            },
            immediate: true,
            deep: false
        }
    },
    computed: {
        imageUrl() {
            const ids = this.product?.imageIds
            if (!ids || !ids.length) return ''
            return `http://localhost:5000/api/files?id=${ids[0]}`
        },
        defaultImage() {
            return '/images/image-dummy.png'
        },
        tags() {
        const tag = this.product?.tags;
        if (typeof tag === 'string') {
            return tag.split(',').map(t => t.trim());
        }
        return [];
        }
    },
    methods:{
        parseRupiah(rpString) {
            if(!rpString) return 0;
            return parseInt(rpString.replace(/[^\d]/g, '')) || 0
        },
        formatCurrency(number) {
            return new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0
            }).format(number);
        },
        ...mapActions(module.product.name, ["getAll", "getById"]),
    },
    async created(){
        try {
            const result = await this.getById(this.$route.params.id);
            if (result) this.product = result;
        } catch (err) {
            console.error("Gagal memuat produk:", err);
        }
    },
    mounted(){
        
    }
}
</script>
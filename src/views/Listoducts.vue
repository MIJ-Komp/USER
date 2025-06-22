<template>
    <div class="list-product-container">
        <div class="filter-product-container" :style="filterOpen? 'display: flex !important': ''">
            <div class="filter-product">
            <div class="pb-2 flex-row" style="justify-content: space-between; border-bottom: 1px solid #dedede;">
                <div class="flex-row" style="align-items: center;">
                  <i class="fa fa-filter me-2"/>
                  <div>Filter Produk</div>
                </div>
                <div 
                v-if="filterOpen == true"
                @click="toggleFilter()"
                style="cursor: pointer; border: 1px solid #dedede; padding: 4px 24px; border-radius: 8px;">Close</div>
            </div>
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
        
        <div class="list-product-content">
            <div @click="toggleFilter()" class="filter-product-mobile" style="align-items: center;">
                <i class="fa fa-filter me-2"/>
                <div>filter</div>
            </div>
        
            <div class="header">
            <div style="text-align: center; font-weight: 600; font-size: 18px;">PRODUK</div>
            <div class="flex-row mt-2 mb-2" style="justify-content: center; gap: 12px;">
                    <div class="dot"></div>
                    <div v-for="menu in currentMenu">{{ menu.label }}</div>
                    <div class="dot"></div>
            </div>
            <div class="flex-row" style="gap: 12px; width: 100%; justify-content: space-between;">
                <div class="line-container">
                    <div class="line"></div>
                    <div class="dot"></div>
                </div>
                <div class="product-name">
                    {{ $route.meta.menu?.name }}
                </div>
                <div class="line-container">
                    <div class="dot"></div>
                    <div class="line"></div>
                </div>
            </div>
        </div>

            <div class="products-container">
                <div class="products-items">
                    <Product v-for="product in products" :product="product"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import 'nouislider/dist/nouislider.css'
import Product from '../components/Product.vue';
import Select from 'primevue/select';
import MultiSelect from 'primevue/multiselect';
import Checkbox from 'primevue/checkbox';

export default{
    components:{
        Product, Select, MultiSelect, Checkbox
    },
    data(){
        return{
            filterOpen: false,
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
            products:[
                {
                    name: 'MIJ BASIC',
                    image: '/images/image-dummy.png',
                    id: 1,
                    priceStart: 6000000,
                    priceEnd: 7000000,
                }
            ]
        }
    },
    methods:{
        applyFilter(){
         this.toggleFilter();
        },
        toggleFilter(){
          this.filterOpen = !this.filterOpen
        },
        handleRangeUpdate(val) {
        }
    },
    mounted(){
        for(let index = 1; index < 100; index++) {
            this.products.push({
                    name: 'MIJ BASIC',
                    image: '/images/image-dummy.png',
                    id: index + 1,
                    priceStart: 6000000,
                    priceEnd: 7000000,
                })
        }
    }
}
</script>

<style>
.button-apply-filer{
    background: var(--gold);
    color: black;
    padding: 8px 0;
    font-weight: 600;
    width: 100%;
    border-radius: 8px;
    text-align: center;
}
.list-product-container{
    display: flex;
    justify-content: space-between;
    position: relative;
}
.filter-product{
    gap: 12px;
    z-index: 1;
    display: flex;
    flex-direction: column;
}
.filter-product-container{
    width: 280px;
    min-width: 280px;
    height: 90vh;
    padding: 12px;
    margin: 8px;
    border-radius: 8px;
    border: 1px solid #dedede;
    background: white;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.products-items{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(22%, 1fr));
    row-gap: 40px;
    column-gap: 20px;
    padding: 16px;
    justify-content: center; 
}
.list-product-content{
    height: calc(98vh - 50px);
    overflow: auto;
    width: 100%;
}

.filter-product-mobile{
    cursor: pointer;
    display: none;
    border: 1px solid #00000080;
    margin-top: 12px;
    width: fit-content;
    padding: 8px 24px;
    border-radius: 8px;
    background: white;
}

@media screen and (max-width: 800px) {
    .list-product-content{
        height: 80vh !important;
    }
    .products-container{
        height: 65vh;
        overflow: auto;
    }
    .filter-product-mobile{
        display: flex;
        justify-self: end;
        margin-right: 20px;
    }
    .filter-product-container{
        position: absolute;
        width: calc(100% - 20px);
        margin: 0;
        left: 10px;
        top: 10px;
        height: 93vh;
        display: none;
    }
    .products-items{
    grid-template-columns: repeat(auto-fit, minmax(45%, 1fr));
    }
}
</style>
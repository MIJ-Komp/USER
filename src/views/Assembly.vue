<template>
    <div class="container assembly-container px-3">
        <!-- Header section dengan animasi fade-in -->
        <div class="header-section" data-aos="fade-down">
            <div class="fs-4 py-3 border-bottom border-2 fw-bold">RAKIT PC</div>
            <div class="description my-4" style="font-size: 15px; text-align: justify;">
                Bangun PC impianmu dengan fitur Rakit PC. Pilih sendiri komponen seperti prosesor, RAM, VGA, motherboard, dan lainnya — kami bantu pastikan semuanya kompatibel dan cocok satu sama lain.
                Nggak perlu bingung atau takut salah beli!
            </div>
        </div>

        <b-row class="gx-4 gy-4 align-start show" v-if="hasLoaded">
            <!-- Kolom komponen dengan animasi fade-up bertahap -->
            <b-col cols="12" lg="8" md="8" style="flex: 2;" data-aos="fade-up" data-aos-delay="100">
                <AssemblyComponent :compatibleRules="compatibleRules" :allProducts="products" :componentCode="constant.componentTypeCode.processor" :selectedProduct="form" @toggleShow="toggleShow(1)" :show="menu==1" v-model="form.cpu" label="Processor (CPU)"/>
                <AssemblyComponent :compatibleRules="compatibleRules" :allProducts="products" :componentCode="constant.componentTypeCode.motherboard" :selectedProduct="form" @toggleShow="toggleShow(2)" :show="menu==2" v-model="form.motherboard" label="Motherboard"/>
                <AssemblyComponent :compatibleRules="compatibleRules" :allProducts="products" :componentCode="constant.componentTypeCode.ram" :selectedProduct="form" @toggleShow="toggleShow(3)" :show="menu==3" v-model="form.ram" label="RAM (Memory)"/>
                <AssemblyComponent :compatibleRules="compatibleRules" :allProducts="products" :componentCode="constant.componentTypeCode.gpu" :selectedProduct="form" @toggleShow="toggleShow(4)" :show="menu==4" v-model="form.gpu" label="VGA/GPU"/>
                <AssemblyComponent :compatibleRules="compatibleRules" :allProducts="products" :componentCode="constant.componentTypeCode.storage" :selectedProduct="form" @toggleShow="toggleShow(5)" :show="menu==5" v-model="form.storage" label="Penyimpanan (SSD/HDD)"/>
                <AssemblyComponent :compatibleRules="compatibleRules" :allProducts="products" :componentCode="constant.componentTypeCode.psu" :selectedProduct="form" @toggleShow="toggleShow(6)" :show="menu==6" v-model="form.psu" label="Power Supply (PSU)"/>
                <AssemblyComponent :compatibleRules="compatibleRules" :allProducts="products" :componentCode="constant.componentTypeCode.case" :selectedProduct="form" @toggleShow="toggleShow(7)" :show="menu==7" v-model="form.case" label="Casing (case)"/>
                <AssemblyComponent :compatibleRules="compatibleRules" :allProducts="products" :componentCode="constant.componentTypeCode.cpuCooler" :selectedProduct="form" @toggleShow="toggleShow(8)" :show="menu==8" v-model="form.cpuCooler" label="CPU Cooler"/>
                <AssemblyComponent :compatibleRules="compatibleRules" :allProducts="products" :componentCode="constant.componentTypeCode.caseFan" :selectedProduct="form" @toggleShow="toggleShow(9)" :show="menu==9" v-model="form.caseFan" label="Case Fan"/>
                <AssemblyComponent :compatibleRules="compatibleRules" :allProducts="products" :componentCode="constant.componentTypeCode.monitor" :selectedProduct="form" @toggleShow="toggleShow(10)" :show="menu==10" v-model="form.monitor" label="Monitor (Optional)"/>
                <!-- <AssemblyComponent :compatibleRules="compatibleRules" :allProducts="products" :componentCode="constant.componentTypeCode.processor" :selectedProduct="form" @toggleShow="toggleShow()" :show="menu==1" v-model="form.others" :multiple="false" label="Lainnya"/> -->
            </b-col>

            <!-- Cart section dengan efek sticky dan animasi -->
            <b-col cols="12" lg="4" md="4" class="cart-container" data-aos="fade-left" data-aos-delay="200">
                <div class="cart-summary border rounded shadow p-3">
                    <h4 class="mb-3 fw-bold">Ringkasan Rakitan</h4>
                    <div class="selected-items-container">
                        <table class="selected-product w-100">
                            <thead>
                                <tr style="background-color: var(--gold);">
                                    <td style="min-width: 30%; max-width: 30%; width: 30%;">Jenis</td>
                                    <td style="min-width: 55%; max-width: 55%; width: 55%;">Dipilih</td>
                                    <td style="min-width: 15%; max-width: 15%; width: 15%;">Qty</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Processor (CPU)</td>
                                    <td>
                                        <div>
                                            <div>{{ getProduct(form.cpu?.productId)?.name ?? '-' }}</div>
                                            <small class="ps-1" v-if="getProduct(form.cpu?.productId)?.productSkus?.length > 1">{{ getProduct(form.cpu?.productId)?.productSkus.find(data=> data.id == form.cpu?.productSkuId)?.name}}</small>
                                        </div>
                                    </td>
                                    <td>{{ !form.cpu? '-': 1}}</td>
                                </tr>
                                 <tr>
                                    <td>Motherboard</td>
                                    <td>
                                        <div>
                                            <div>{{ getProduct(form.motherboard?.productId)?.name ?? '-' }}</div>
                                            <small class="ps-1" v-if="getProduct(form.motherboard?.productId)?.productSkus?.length > 1">{{ getProduct(form.motherboard?.productId)?.productSkus.find(data=> data.id == form.cpu?.productSkuId)?.name}}</small>

                                        </div>
                                    </td>
                                    <td>{{ !form.motherboard? '-': 1 }}</td>
                                </tr>
                                 <tr>
                                    <td>RAM</td>
                                    <td>
                                        <div v-if="form.ram.length<=0">-</div>
                                        <div v-for="ram in form.ram">
                                            <div>{{ getProduct(ram?.productId)?.name ?? '-' }}</div>
                                            <small class="ps-1" v-if="getProduct(ram?.productId)?.productSkus?.length > 1">{{ getProduct(ram?.productId)?.productSkus.find(data=> data.id == form.cpu?.productSkuId)?.name}}</small>
                                        </div>
                                    </td>
                                    <td>
                                        <div v-if="form.ram.length<=0">-</div>
                                        <div v-for="ram in form.ram">
                                            <select v-model="ram.qty" style="width: 100%;" :disabled="!ram">
                                                <option :value="index" v-for="index in 4">{{ index}}</option>
                                            </select></div>
                                    </td>
                                </tr>
                                 <tr>
                                    <td>VGA/GPU</td>
                                    <td>
                                     <div>
                                            <div>{{ getProduct(form.gpu?.productId)?.name ?? '-' }}</div>
                                            <small class="ps-1" v-if="getProduct(form.gpu?.productId)?.productSkus?.length > 1">{{ getProduct(form.gpu?.productId)?.productSkus.find(data=> data.id == form.cpu?.productSkuId)?.name}}</small>

                                        </div>
                                    </td>
                                    <td>{{ !form.gpu? '-': 1 }}</td>
                                </tr>
                                <tr>
                                    <td>SSD/HDD</td>
                                    <td>
                                        <div v-if="form.storage.length<=0">-</div>
                                        <div v-for="storage in form.storage">
                                            <div>{{ getProduct(storage?.productId)?.name ?? '-' }}</div>
                                            <small class="ps-1" v-if="getProduct(storage?.productId)?.productSkus?.length > 1">{{ getProduct(storage?.productId)?.productSkus.find(data=> data.id == form.cpu?.productSkuId)?.name}}</small>

                                        </div>
                                    </td>
                                    <td>
                                        <div v-if="form.storage.length<=0">-</div>
                                        <div v-for="storage in form.storage">
                                            <select v-model="storage.quantity" style="width: 100%;">
                                                <option :value="index" v-for="index in 8">{{ index}}</option>
                                            </select></div>
                                    </td>
                                </tr>
                                 <tr>
                                    <td>Power Supply</td>
                                    <td>
                                        <div>
                                            <div>{{ getProduct(form.psu?.productId)?.name ?? '-' }}</div>
                                            <small class="ps-1" v-if="getProduct(form.psu?.productId)?.productSkus?.length > 1">{{ getProduct(form.psu?.productId)?.productSkus.find(data=> data.id == form.cpu?.productSkuId)?.name}}</small>

                                        </div>
                                    </td>
                                    <td>{{ !form.psu? '-': 1 }}</td>
                                </tr>
                                <tr>
                                    <td>Casing</td>
                                    <td>
                                        <div>
                                            <div>{{ getProduct(form.case?.productId)?.name ?? '-' }}</div>
                                            <small class="ps-1" v-if="getProduct(form.case?.productId)?.productSkus?.length > 1">{{ getProduct(form.case?.productId)?.productSkus.find(data=> data.id == form.cpu?.productSkuId)?.name}}</small>

                                        </div>
                                    </td>
                                    <td>{{ !form.case? '-': 1 }}</td>
                                </tr>
                                 <tr>
                                    <td>Cpu Cooler</td>
                                    <td>
                                     <div>
                                            <div>{{ getProduct(form.cpuCooler?.productId)?.name ?? '-' }}</div>
                                            <small class="ps-1" v-if="getProduct(form.cpuCooler?.productId)?.productSkus?.length > 1">{{ getProduct(form.cpuCooler?.productId)?.productSkus.find(data=> data.id == form.cpu?.productSkuId)?.name}}</small>

                                        </div>
                                    </td>
                                    <td>{{ !form.cpuCooler? '-': 1 }}</td>
                                </tr>
                                <tr>
                                    <td>Case Fan</td>
                                    <td>
                                        <div v-if="form.caseFan.length<=0">-</div>
                                        <div v-for="caseFan in form.caseFan">
                                            <div>{{ getProduct(caseFan?.productId)?.name ?? '-' }}</div>
                                            <small class="ps-1" v-if="getProduct(caseFan?.productId)?.productSkus?.length > 1">{{ getProduct(caseFan?.productId)?.productSkus.find(data=> data.id == form.cpu?.productSkuId)?.name}}</small>
                                        </div>
                                    </td>
                                    <td>
                                        <div v-if="form.caseFan.length<=0">-</div>
                                        <div v-for="caseFan in form.caseFan">
                                            <select v-model="caseFan.quantity" style="width: 100%;">
                                                <option :value="index" v-for="index in 4">{{ index}}</option>
                                            </select></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Monitor</td>
                                    <td>
                                        <div v-if="form.monitor.length<=0">-</div>
                                        <div v-for="monitor in form.monitor">
                                            <div>{{ getProduct(monitor?.productId)?.name ?? '-' }}</div>
                                            <small class="ps-1" v-if="getProduct(monitor?.productId)?.productSkus?.length > 1">{{ getProduct(monitor?.productId)?.productSkus.find(data=> data.id == form.cpu?.productSkuId)?.name}}</small>

                                        </div>
                                    </td>
                                    <td>
                                        <div v-if="form.monitor.length<=0">-</div>
                                        <div v-for="monitor in form.monitor">
                                            <select v-model="monitor.quantity" style="width: 100%;">
                                                <option :value="index" v-for="index in 4">{{ index}}</option>
                                            </select></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        
                         <!-- <b-row>
                            <b-col cols="12" lg="5" class="fw-semibold">Lainnya</b-col>
                            <b-col cols="12" lg="7">{{ getProduct(form.others) }}</b-col>
                        </b-row> -->

                    </div>
                </div>
                <TextBox 
                            :min="1" 
                            class="quantity-input" 
                            labelType="in" 
                            label="Jumlah Unit Rakitan" 
                            v-model="form.totalUnit" 
                            type="number"
                        />
                        <button 
                            @click.stop.prevent="addToCart"
                            class="add-to-cart-btn mt-1"
                        >
                            <i class="fas fa-shopping-cart me-2"></i>
                            Tambah ke Keranjang
                        </button>

            </b-col>
        </b-row>

        <!-- Loading skeleton -->
        <div v-else class="loading-skeleton">
            <div class="skeleton-animation"></div>
        </div>
    </div>
</template>
<script>
import constant from '../constant/constant';
import module from '../constant/module';
import { mapActions } from 'vuex';
import { useCartStore } from '../store/cartStore'


export default{
    data(){
      return{
        cartStore : useCartStore(),

        constant,
        menu: 1,
        form: {
            cpu: null,
            motherboard: null,
            ram: [],        // multiple sticks
            gpu: null, 
            storage: [],    // multiple drive types
            psu: null,
            case: null,
            cpuCooler: null,
            caseFan: [],
            monitor: [],    // kalau mau support multi-monitor
            others: [],
            totalUnit: 1
        },
        database :{
            products: [
                // Prosesor
                { id: 'p1', category: 'processor', name: 'Intel Core i5-13400F', price: 3400000, image: 'https://placehold.co/300x300/e2e8f0/334155?text=i5-13400F', specs: { socket: 'LGA1700' } },
                { id: 'p2', category: 'processor', name: 'Intel Core i7-13700K', price: 6500000, image: 'https://placehold.co/300x300/e2e8f0/334155?text=i7-13700K', specs: { socket: 'LGA1700' } },
                { id: 'p3', category: 'processor', name: 'AMD Ryzen 5 7600X', price: 3800000, image: 'https://placehold.co/300x300/e2e8f0/334155?text=R5-7600X', specs: { socket: 'AM5' } },
                { id: 'p4', category: 'processor', name: 'AMD Ryzen 9 7950X', price: 9200000, image: 'https://placehold.co/300x300/e2e8f0/334155?text=R9-7950X', specs: { socket: 'AM5' } },

                // Motherboard
                { id: 'm1', category: 'motherboard', name: 'ASUS PRIME B760M', price: 2100000, image: 'https://placehold.co/300x300/e2e8f0/334155?text=B760M', specs: { socket: 'LGA1700', ram_type: 'DDR5', ram_slots: 4 } },
                { id: 'm2', category: 'motherboard', name: 'MSI PRO H610M', price: 1300000, image: 'https://placehold.co/300x300/e2e8f0/334155?text=H610M', specs: { socket: 'LGA1700', ram_type: 'DDR4', ram_slots: 2 } },
                { id: 'm3', category: 'motherboard', name: 'ASRock A620M PRO RS', price: 1900000, image: 'https://placehold.co/300x300/e2e8f0/334155?text=A620M', specs: { socket: 'AM5', ram_type: 'DDR5', ram_slots: 4 } },
                { id: 'm4', category: 'motherboard', name: 'Gigabyte B650 AORUS', price: 3500000, image: 'https://placehold.co/300x300/e2e8f0/334155?text=B650', specs: { socket: 'AM5', ram_type: 'DDR5', ram_slots: 4 } },
                
                // RAM
                { id: 'r1', category: 'ram', name: 'Kingston Fury 16GB DDR5', price: 950000, image: 'https://placehold.co/300x300/e2e8f0/334155?text=DDR5', specs: { ram_type: 'DDR5' } },
                { id: 'r2', category: 'ram', name: 'Corsair Vengeance 16GB DDR4', price: 750000, image: 'https://placehold.co/300x300/e2e8f0/334155?text=DDR4', specs: { ram_type: 'DDR4' } },
                { id: 'r3', category: 'ram', name: 'Team T-Force 32GB DDR5', price: 1800000, image: 'https://placehold.co/300x300/e2e8f0/334155?text=DDR5', specs: { ram_type: 'DDR5' } },
            ]
        },

        currentSelection :{
            processor: null,
            motherboard: null,
            ram: null,
        },

        products:[],
        compatibleRules:[],
        hasLoaded: false,
      }
    },
    computed:{
        elements(){
            return{
               
            }
        }
    },
    watch:{
        form: {
         immediate: true,
         deep: true,
         handler(newVal) {
            if(this.hasLoaded)
            localStorage.setItem('assembly_items', JSON.stringify(this.form))
         }
        }
    },
    async mounted() {
        // this.init()
        var params= {
            productTypes: constant.productType.single
        }
        this.products = await this.getAll(params)
        this.compatibleRules = await this.getCompatibleRule()

        var savedItems = localStorage.getItem('assembly_items')
        if(savedItems){
            this.form = Object.assign(this.form, JSON.parse(savedItems))
        }

        this.hasLoaded = true
    },
    methods:{
        async addToCart() {
            // Validasi slot RAM
            if (this.form.motherboard && this.form.ram.length > 0) {
                const motherboardSpecs = this.products.find(p => p.id === this.form.motherboard.productId)?.componentSpecs;
                const ramSlots = motherboardSpecs?.find(spec => spec.specKey === 'motherboard_ram_slots')?.value;
                
                let totalRamSticks = this.form.ram.reduce((total, ram) => total + (ram.qty || 1), 0);
                
                if (ramSlots && totalRamSticks > parseInt(ramSlots)) {
                    this.$showToast.error(`Motherboard hanya mendukung ${ramSlots} slot RAM. Anda memilih ${totalRamSticks} RAM.`);
                    return;
                }
            }

            // Validasi komponen lainnya
            if(!this.form.cpu && !this.form.motherboard && this.form.ram.length <= 0 && !this.form.gpu && this.form.storage.length <= 0
                && !this.form.psu && !this.form.case && !this.form.cpuCooler && !this.form.caseFan){
                    this.$showToast.error("Anda belum memilih salah satu item"); 
                    return;
            }
            if(!this.form.cpu || !this.form.motherboard || this.form.ram.length <= 0 || !this.form.gpu || this.form.storage.length <= 0
                || !this.form.psu || !this.form.case || !this.form.cpuCooler || !this.form.caseFan
            ){
                const confirm = await this.$dialog.Confirmation.confirm({ title: 'Konfirmasi', message: `Item belum lengkap apakah Anda ingin menambahkannya ke dalam keranjang? tindakan ini akan menghapus item terpilih dan akan ditambahkan ke keranjang` })

                if (confirm) {
                    this.generateCartItem()
                    return
                }
                else{ return }
            }

            const confirm = await this.$dialog.Confirmation.confirm({ title: 'Konfirmasi', message: `Pastikan seluruh item sudah sesuai. tindakan ini akan menghapus item terpilih dan akan ditambahkan ke keranjang` })

            if (confirm) {
                this.generateCartItem()
            }
        },
        generateCartItem(){
             Object.keys(this.form).forEach(code => {
                if(code != 'totalUnit'){
                    if(Array.isArray(this.form[code])){
                        this.form[code].forEach(data => {
                            this.cartStore.addItem(data)
                        });
                    }
                    else if(this.form[code]){
                       this.cartStore.addItem(Object.assign(this.form[code], {qty : this.form.totalUnit}))
                    }
                }
            });
            this.form= {
                cpu: null,
                motherboard: null,
                ram: [],        // multiple sticks
                gpu: null, 
                storage: [],    // multiple drive types
                psu: null,
                case: null,
                cpuCooler: null,
                caseFan: [],
                monitor: [],    // kalau mau support multi-monitor
                others: [],
                totalUnit: 1
            },
            localStorage.removeItem('assembly_items')
            this.$router.replace({ path: `/cart`});
        },
        toggleShow(menu){
            if(this.menu == menu) {
                this.menu = null
                return
            }
            this.menu = menu
        },
        getProduct(id){
            return this.products.find(data=> data.id == id) 
        },
        formatCurrency(number) {
            return new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0
            }).format(number);
        },
        ...mapActions(module.product.name, ["getAll"]),
        ...mapActions(module.compatibleRule.name, {getCompatibleRule: "getAll"}),
    }
}
</script>
<style scoped>

table.selected-product {
  width: 100%;
  border-collapse: collapse;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  font-size: 12px !important;
  background-color: white;
}

table.selected-product thead {
  background-color: var(--gold); /* Gold */
  color: #333;
}

table.selected-product th,
table.selected-product td {
  padding: 6px 12px;
  border: 1px solid #e0e0e0;
  text-align: left;
}

table.selected-product th {
  font-weight: 600;
}

table.selected-product tbody tr:nth-child(odd) {
  background-color: #fffaf0; /* Light gold-ish striping */
}

table.selected-product tbody tr:hover {
  background-color: #fff2cc; /* soft highlight on hover */
}
.assembly-container {
    font-family: 'Inter', sans-serif;
    padding-top: 2rem;
    padding-bottom: 4rem;
}

.header-section {
    margin-bottom: 2rem;
}

.description {
    color: #666;
    line-height: 1.6;
}

.cart-summary {
    background: #fff;
    border-radius: 12px;
    transition: all 0.3s ease;
}

.cart-container {
    position: sticky;
    top: 80px;
    height: fit-content;
    z-index: 10;
}

.selected-items-container {
    max-height: 60vh;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: var(--gold) #f1f1f1;
}

.selected-items-container::-webkit-scrollbar {
    width: 6px;
}

.selected-items-container::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
}

.selected-items-container::-webkit-scrollbar-thumb {
    background: var(--gold);
    border-radius: 10px;
}

.quantity-input {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 0.5rem;
}

.add-to-cart-btn {
    background: var(--gold);
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    font-weight: 600;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border: 1px solid #dedede;
}

.add-to-cart-btn:hover {
    background: var(--yellow-400);
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.add-to-cart-btn:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
}

/* Loading Skeleton */
.loading-skeleton {
    padding: 20px;
    background: #f0f0f0;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
}

.skeleton-animation {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
}

@media (max-width: 991px) {
    .cart-container {
        position: static;
        margin-top: 2rem;
    }

    .selected-items-container {
        max-height: 40vh;
    }
}
</style>
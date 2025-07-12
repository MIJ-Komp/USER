<template>
    <div class="assembly-container px-3">
        <div class="fs-4 py-1 border-bottom border-2 fw-semibold">RAKIT PC</div>
        <div class="fw-light my-2" style="font-size: 14px; text-align: justify;">
            Bangun PC impianmu dengan fitur Rakit PC. Pilih sendiri komponen seperti prosesor, RAM, VGA, motherboard, dan lainnya — kami bantu pastikan semuanya kompatibel dan cocok satu sama lain.
            Nggak perlu bingung atau takut salah beli!
        </div>

        <b-row  class="gx-3 gy-3 align-start">
            <b-col cols="12" lg="8" md="8" style="flex: 2;">
                <AssemblyComponent  :allProducts="products" :componentCode="constant.componentTypeCode.processor" :selectedProduct="form" @toggleShow="toggleShow(1)" :show="menu==1" v-model="form.cpu" label="Processor (CPU)"/>
                <AssemblyComponent :allProducts="products" :componentCode="constant.componentTypeCode.motherboard" :selectedProduct="form" @toggleShow="toggleShow(2)" :show="menu==2" v-model="form.motherboard" label="Motherboard"/>
                <AssemblyComponent :allProducts="products" :componentCode="constant.componentTypeCode.ram" :selectedProduct="form" @toggleShow="toggleShow(3)" :show="menu==3" v-model="form.ram" label="RAM (Memory)"/>
                <AssemblyComponent :allProducts="products" :componentCode="constant.componentTypeCode.gpu" :selectedProduct="form" @toggleShow="toggleShow(4)" :show="menu==4" v-model="form.gpu" label="VGA/GPU"/>
                <AssemblyComponent :allProducts="products" :componentCode="constant.componentTypeCode.storage" :selectedProduct="form" @toggleShow="toggleShow(5)" :show="menu==5" v-model="form.storage" label="Penyimpanan (SSD/HDD)"/>
                <AssemblyComponent :allProducts="products" :componentCode="constant.componentTypeCode.psu" :selectedProduct="form" @toggleShow="toggleShow(6)" :show="menu==6" v-model="form.psu" label="Power Supply (PSU)"/>
                <AssemblyComponent :allProducts="products" :componentCode="constant.componentTypeCode.case" :selectedProduct="form" @toggleShow="toggleShow(7)" :show="menu==7" v-model="form.case" label="Casing (case)"/>
                <AssemblyComponent :allProducts="products" :componentCode="constant.componentTypeCode.cooler" :selectedProduct="form" @toggleShow="toggleShow(8)" :show="menu==8" v-model="form.cooler" label="Pendingin (Cooler, Fan)"/>
                <AssemblyComponent :allProducts="products" :componentCode="constant.componentTypeCode.monitor" :selectedProduct="form" @toggleShow="toggleShow(9)" :show="menu==9" v-model="form.monitor" label="Monitor (Optional)"/>
                <!-- <AssemblyComponent :allProducts="products" :componentCode="constant.componentTypeCode.processor" :selectedProduct="form" @toggleShow="toggleShow()" :show="menu==1" v-model="form.others" :multiple="false" label="Lainnya"/> -->
            </b-col>
            <b-col cols="12" lg="4" md="4" class="cart-container">
                <div class="border rounded shadow-sm p-1" style="font-size: 14px;">
                    <!-- <div style="background: var(--gold);" class="header-component fw-bold">Produk terpilih:</div> -->
                    <table style="width: 100%;" class="selected-product">
                        <thead>
                            <tr style="background-color: var(--gold);">
                                <td style="min-width: 30%; max-width: 30%;">Jenis</td>
                                <td style="min-width: 55%; max-width: 55%;">Dipilih</td>
                                <td style="min-width: 15%; max-width: 15%;">Qty</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Processor</td>
                                <td>{{ getProduct(form.cpu) }}</td>
                                <td>{{ !form.cpu? '-': form.totalUnit}}</td>
                            </tr>
                             <tr>
                                <td>Motherboard</td>
                                <td>{{ getProduct(form.motherboard) }}</td>
                                <td>{{ !form.motherboard? '-': form.totalUnit }}</td>
                            </tr>
                             <tr>
                                <td>RAM</td>
                                <td>
                                    <div v-if="form.ram.length<=0">-</div>
                                    <div v-for="ram in form.ram">{{ getProduct(ram.id) }}</div>
                                </td>
                                <td>
                                    <div v-if="form.ram.length<=0">-</div>
                                    <div v-for="ram in form.ram">
                                        <select v-model="ram.quantity" style="width: 100%;" :disabled="!ram">
                                            <option :value="index" v-for="index in 4">{{ index}}</option>
                                        </select></div>
                                </td>
                            </tr>
                             <tr>
                                <td>VGA/GPU</td>
                                <td>{{ getProduct(form.gpu) }}</td>
                                <td>{{ !form.gpu? '-': form.totalUnit }}</td>
                            </tr>
                            <tr>
                                <td>SSD/HDD</td>
                                <td>
                                    <div v-if="form.storage.length<=0">-</div>
                                    <div v-for="storage in form.storage">{{ getProduct(storage.id) }}</div>
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
                                <td>{{ getProduct(form.psu) }}</td>
                                <td>{{ !form.psu? '-': form.totalUnit }}</td>
                            </tr>
                             <tr>
                                <td>Casing</td>
                                <td>{{ getProduct(form.case) }}</td>
                                <td>{{ !form.case? '-': form.totalUnit }}</td>
                            </tr>
                             <tr>
                                <td>Cooler/Fan</td>
                                <td>{{ getProduct(form.cooler) }}</td>
                                <td>{{ !form.cooler? '-': form.totalUnit }}</td>
                            </tr>
                            <tr>
                                <td>Monitor</td>
                                <td>
                                    <div v-if="form.monitor.length<=0">-</div>
                                    <div v-for="monitor in form.monitor">{{ getProduct(monitor.id) }}</div>
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

                    <TextBox class="p-1 mt-2" labelType="in" label="Jumlah Unit Rakitan" v-model="form.totalUnit" type="number"/>
                    <button>Tambah ke keranjang</button>
                    </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import constant from '../constant/constant';
import module from '../constant/module';
import { mapActions } from 'vuex';

export default{
    data(){
      return{
        constant,
        menu: 1,
        form: {
            cpu: null,
            motherboard: null,
            ram: [],        // multiple sticks
            gpu: null,        // optional multiple
            storage: [],    // multiple drive types
            psu: null,
            case: null,
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

        products:[]
      }
    },
    computed:{
        elements(){
            return{
               
            }
        }
    },
    async mounted() {
        // this.init()
        var params= {
            productTypes: constant.productType.single
        }
        this.products = await this.getAll(params)
        console.log(this.products)
        localStorage.getItem("assemblyProducts")
    },
    methods:{
        toggleShow(menu){
            if(this.menu == menu) {
                this.menu = null
                return
            }
            this.menu = menu
        },
        getProduct(id){
            return this.products.find(data=> data.id == id)?.name || '-' 
        },
        formatCurrency(number) {
            return new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0
            }).format(number);
        },
        ...mapActions(module.product.name, ["getAll"]),
    }
}
</script>

<style>
table.selected-product{
    border-radius: 8px !important;
}
  table.selected-product th,
  table.selected-product td {
    padding: 4px;
    border: 1px solid #ddd;
  }
    .cart-container {
        position: sticky;
        top: 64px;
        height: fit-content;
        z-index: 10;
    }
        .assembly-container {
            font-family: 'Inter', sans-serif;
        }
        .assembly-container button{
            background: var(--gold);
            width: 100%;
            padding: 8px;
            border-radius: 8px;
            margin-top: 12px;
            font-weight: bold;
        }
        .assembly-container button:hover{
            background: var(--yellow-400);
        }
        .component-card {
            transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
        }
        .component-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
        }
        .component-card.selected {
            border-color: #4f46e5;
            box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.4);
            transform: translateY(-2px);
        }
        .component-section.disabled {
            opacity: 0.5;
            pointer-events: none;
        }

        .assembly-container h3{
            font-size: 18px !important;
        }
    @media (max-width: 991px) {
  .cart-container {
    position: static !important; /* biar gak sticky di mobile */
    margin-top: 20px;
  }
}
</style>
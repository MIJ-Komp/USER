<template>
    <div class="assembly-container px-3">
        <div class="fs-4 py-1 border-bottom border-2 fw-semibold">RAKIT PC</div>
        <div class="fw-light my-2" style="font-size: 14px; text-align: justify;">
            Bangun PC impianmu dengan fitur Rakit PC. Pilih sendiri komponen seperti prosesor, RAM, VGA, motherboard, dan lainnya — kami bantu pastikan semuanya kompatibel dan cocok satu sama lain.
            Nggak perlu bingung atau takut salah beli!
        </div>

        <b-row  class="gx-3 gy-3 align-start">
            <b-col cols="12" lg="8" md="8" style="flex: 2;">
                <AssemblyComponent @toggleShow="toggleShow(1)" :show="menu==1" v-model="form.cpu" label="Processor (CPU)"/>
                <AssemblyComponent @toggleShow="toggleShow(2)" :show="menu==2" v-model="form.motherboard" label="Motherboard"/>
                <AssemblyComponent @toggleShow="toggleShow(3)" :show="menu==3" v-model="form.ram" label="RAM (Memory)"/>
                <AssemblyComponent @toggleShow="toggleShow(4)" :show="menu==4" v-model="form.gpu" label="VGA/GPU"/>
                <AssemblyComponent @toggleShow="toggleShow(5)" :show="menu==5" v-model="form.storage" label="Penyimpanan (SSD/HDD)"/>
                <AssemblyComponent @toggleShow="toggleShow(6)" :show="menu==6" v-model="form.psu" label="Power Supply (PSU)"/>
                <AssemblyComponent @toggleShow="toggleShow(7)" :show="menu==7" v-model="form.case" label="Casing (case)"/>
                <AssemblyComponent @toggleShow="toggleShow(8)" :show="menu==8" v-model="form.cooler" label="Pendingin (Cooler, Fan)"/>
                <AssemblyComponent @toggleShow="toggleShow(9)" :show="menu==9" v-model="form.monitor" label="Monitor (Optional)"/>
                <!-- <AssemblyComponent @toggleShow="toggleShow()" :show="menu==1" v-model="form.others" :multiple="false" label="Lainnya"/> -->
            </b-col>
            <b-col cols="12" lg="4" md="4" class="cart-container">
                <div class="border rounded shadow-sm p-2" style="font-size: 14px;">
                    <div style="background: var(--gold);" class="header-component fw-bold">Produk terpilih:</div>
                    <b-row>
                        <b-col cols="12" lg="6" class="fw-semibold">Processor</b-col>
                        <b-col cols="12" lg="6">{{ getProduct(form.cpu) }}</b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="12" lg="6" class="fw-semibold">Motherboard</b-col>
                        <b-col cols="12" lg="6">{{ getProduct(form.motherboard) }}</b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="12" lg="6" class="fw-semibold">RAM</b-col>
                        <b-col cols="12" lg="6">{{ getProduct(form.ram) }}</b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="12" lg="6" class="fw-semibold">VGA/GPU</b-col>
                        <b-col cols="12" lg="6">{{ getProduct(form.gpu) }}</b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="12" lg="6" class="fw-semibold">Power Supply</b-col>
                        <b-col cols="12" lg="6">{{ getProduct(form.psu) }}</b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="12" lg="6" class="fw-semibold">Casing</b-col>
                        <b-col cols="12" lg="6">{{ getProduct(form.case) }}</b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="12" lg="6" class="fw-semibold">Cooler/Fan</b-col>
                        <b-col cols="12" lg="6">{{ getProduct(form.cooler) }}</b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="12" lg="6" class="fw-semibold">Monitor</b-col>
                        <b-col cols="12" lg="6">{{ getProduct(form.monitor) }}</b-col>
                    </b-row>
                     <!-- <b-row>
                        <b-col cols="12" lg="6" class="fw-semibold">Lainnya</b-col>
                        <b-col cols="12" lg="6">{{ getProduct(form.others) }}</b-col>
                    </b-row> -->
                </div>
            </b-col>
        </b-row>
    </div>

    <div v-if="false" class="assembly-container bg-gray-100 text-gray-800">
    <div v-if="false" class="container mx-auto p-4 sm:p-6 lg:p-8">
        <div class="flex flex-col lg:flex-row gap-8">
            <!-- Kolom Pilihan Komponen -->
            <main class="w-full lg:w-2/3">
                <div id="builder-steps">
                    <!-- Langkah 1: Prosesor -->
                    <div id="step-processor" class="component-section bg-white p-6 rounded-xl shadow-md mb-6">
                        <h2 class="font-semibold mb-4 border-b pb-3">Langkah 1: Pilih Prosesor</h2>
                        <div id="processor-list" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <!-- Kartu prosesor akan dimuat oleh JavaScript -->
                        </div>
                    </div>

                    <!-- Langkah 2: Motherboard -->
                    <div id="step-motherboard" class="component-section bg-white p-6 rounded-xl shadow-md mb-6 disabled">
                        <h2 class="font-semibold mb-4 border-b pb-3">Langkah 2: Pilih Motherboard</h2>
                        <div id="motherboard-list" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <p class="text-gray-500 col-span-full">Pilih prosesor terlebih dahulu untuk melihat motherboard yang kompatibel.</p>
                        </div>
                    </div>

                    <!-- Langkah 3: RAM -->
                    <div id="step-ram" class="component-section bg-white p-6 rounded-xl shadow-md disabled">
                        <h2 class="font-semibold mb-4 border-b pb-3">Langkah 3: Pilih RAM</h2>
                        <div id="ram-list" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                             <p class="text-gray-500 col-span-full">Pilih motherboard terlebih dahulu untuk melihat RAM yang kompatibel.</p>
                        </div>
                    </div>
                </div>
            </main>

            <!-- Kolom Ringkasan & Harga -->
            <aside class="w-full lg:w-1/3">
                <div class="bg-white p-6 rounded-xl shadow-md sticky top-8">
                    <h2 class="font-semibold mb-4 border-b pb-3">Ringkasan Rakitan Anda</h2>
                    <div id="summary-list" class="space-y-4 mb-6">
                        <div class="flex justify-between items-center">
                            <span class="font-small">Prosesor:</span>
                            <span id="summary-processor" class="text-gray-600">Belum dipilih</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="font-small">Motherboard:</span>
                            <span id="summary-motherboard" class="text-gray-600">Belum dipilih</span>
                        </div>
                         <div class="flex justify-between items-center">
                            <span class="font-small">RAM:</span>
                            <span id="summary-ram" class="text-gray-600">Belum dipilih</span>
                        </div>
                    </div>

                    <div class="border-t pt-4">
                        <div class="flex justify-between items-center font-bold text-gray-900">
                            <span>Total Harga:</span>
                            <span id="total-price">Rp 0</span>
                        </div>
                    </div>

                    <button @click="resetBuilder" id="reset-button" class="mt-6 w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                        Reset Pilihan
                    </button>
                </div>
            </aside>
        </div>

    </div>
</div>
</template>

<script>
import module from '../constant/module';
import { mapActions } from 'vuex';

export default{
    data(){
      return{
        menu: 1,
        form:{
            cpu:null,
            motherboard:null,
            ram:null,
            gpu:null,
            storage:null,
            psu:null,
            case:null,
            monitor:null,
            others:[],
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
        this.products = await this.getAll()
        console.log(this.products)
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
    .cart-container {
        position: sticky;
        top: 64px;
        height: fit-content;
        z-index: 10;
    }
        .assembly-container {
            font-family: 'Inter', sans-serif;
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
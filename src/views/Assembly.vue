<template>
    <div class="assembly-container bg-gray-100 text-gray-800">
    <div class="container mx-auto p-4 sm:p-6 lg:p-8">
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
export default{
    data(){
        return{
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
        }
    },
    computed:{
        elements(){
            return{
                steps: {
                    processor: document.getElementById('step-processor'),
                    motherboard: document.getElementById('step-motherboard'),
                    ram: document.getElementById('step-ram'),
                },
                lists: {
                    processor: document.getElementById('processor-list'),
                    motherboard: document.getElementById('motherboard-list'),
                    ram: document.getElementById('ram-list'),
                },
                summary: {
                    processor: document.getElementById('summary-processor'),
                    motherboard: document.getElementById('summary-motherboard'),
                    ram: document.getElementById('summary-ram'),
                },
                totalPrice: document.getElementById('total-price'),
                resetButton: document.getElementById('reset-button')
            }
        }
    },
    async mounted() {
        this.init()
    },
    methods:{
        formatCurrency(number) {
            return new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    minimumFractionDigits: 0
                }).format(number);
            },
        
        /**
         * Membuat kartu komponen HTML dari data produk.
         * @param {object} product - Objek produk dari database.
         * @returns {string} - String HTML untuk kartu komponen.
         */
        createComponentCard(product) {
            return `
                <div class="component-card border-2 border-gray-200 rounded-lg p-4 cursor-pointer bg-gray-50" data-id="${product.id}" data-category="${product.category}">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-32 object-cover rounded-md mb-3" onerror="this.onerror=null;this.src='https://placehold.co/300x300/e2e8f0/334155?text=Image+Not+Found';">
                    <h3 class="font-semibold text-base">${product.name}</h3>
                    <p class="font-bold text-indigo-600 text-lg mt-1">${this.formatCurrency(product.price)}</p>
                </div>
            `;
        },

        /**
         * Fungsi utama untuk merender (menampilkan) komponen ke halaman.
         * @param {string} category - Kategori komponen (processor, motherboard, ram).
         * @param {Array} productList - Array produk yang akan ditampilkan.
         */
        renderComponents(category, productList) {
            const listElement = this.elements.lists[category];
            listElement.innerHTML = ''; // Kosongkan list sebelum diisi ulang
            if (productList.length > 0) {
                productList.forEach(product => {
                    listElement.innerHTML += this.createComponentCard(product);
                });
            } else {
                listElement.innerHTML = `<p class="text-gray-500 col-span-full">Tidak ada komponen yang kompatibel ditemukan.</p>`;
            }
        },

        /**
         * Meng-handle logika saat sebuah komponen dipilih.
         * @param {string} category - Kategori komponen yang dipilih.
         * @param {string} productId - ID produk yang dipilih.
         */
        handleSelection(category, productId) {
            // Simpan produk yang dipilih ke state
            const selectedProduct = this.database.products.find(p => p.id === productId);
            this.currentSelection[category] = selectedProduct;

            // Reset pilihan di step-step berikutnya
            if (category === 'processor') {
                this.currentSelection.motherboard = null;
                this.currentSelection.ram = null;
            }
            if (category === 'motherboard') {
                this.currentSelection.ram = null;
            }

            this.updateUI();
        },

        /**
         * Fungsi utama untuk memperbarui seluruh User Interface (UI) berdasarkan state saat ini.
         */
        updateUI() {
            // --- LOGIKA FILTER KOMPATIBILITAS ---
            
            // 1. Filter Motherboard berdasarkan socket Prosesor
            let compatibleMotherboards = [];
            if (this.currentSelection.processor) {
                const selectedSocket = this.currentSelection.processor.specs.socket;
                compatibleMotherboards = this.database.products.filter(p => 
                    p.category === 'motherboard' && p.specs.socket === selectedSocket
                );
            }
            this.renderComponents('motherboard', compatibleMotherboards);

            // 2. Filter RAM berdasarkan tipe RAM Motherboard
            let compatibleRams = [];
            if (this.currentSelection.motherboard) {
                const selectedRamType = this.currentSelection.motherboard.specs.ram_type;
                compatibleRams = this.database.products.filter(p =>
                    p.category === 'ram' && p.specs.ram_type === selectedRamType
                );
            }
            this.renderComponents('ram', compatibleRams);

            // --- UPDATE TAMPILAN ---

            // Update status 'selected' pada kartu
            document.querySelectorAll('.component-card').forEach(card => card.classList.remove('selected'));
            Object.values(this.currentSelection).forEach(product => {
                if (product) {
                    document.querySelector(`.component-card[data-id="${product.id}"]`)?.classList.add('selected');
                }
            });

            // Update status 'disabled' pada setiap langkah
            this.elements.steps.motherboard.classList.toggle('disabled', !this.currentSelection.processor);
            this.elements.steps.ram.classList.toggle('disabled', !this.currentSelection.motherboard);
            
            // Update ringkasan (summary)
            this.elements.summary.processor.textContent =this. currentSelection.processor ? this.currentSelection.processor.name : 'Belum dipilih';
            this.elements.summary.motherboard.textContent = this.currentSelection.motherboard ? this.currentSelection.motherboard.name : 'Belum dipilih';
            this.elements.summary.ram.textContent = this.currentSelection.ram ? this.currentSelection.ram.name : 'Belum dipilih';
            
            // Hitung dan update total harga
            let totalPrice = 0;
            Object.values(this.currentSelection).forEach(product => {
                if (product) {
                    totalPrice += product.price;
                }
            });
            this.elements.totalPrice.textContent = this.formatCurrency(totalPrice);
        },

        /**
         * Fungsi untuk mereset semua pilihan dan mengembalikan ke keadaan awal.
         */
        resetBuilder() {
            this.currentSelection = { processor: null, motherboard: null, ram: null };
            this.init();
        },

        /**
         * Fungsi inisialisasi untuk memulai aplikasi.
         */
        init() {
            // Tampilkan semua prosesor di awal
            const allProcessors = this.database.products.filter(p => p.category === 'processor');
            this.renderComponents('processor', allProcessors);
            
            var self = this;
            // Tambahkan event listener ke parent container untuk efisiensi (event delegation)
            document.getElementById('builder-steps').addEventListener('click', function(e) {
                const card = e.target.closest('.component-card');
                if (card) {
                    const id = card.dataset.id;
                    const category = card.dataset.category;
                    self.handleSelection(category, id);
                }
            });

            // Perbarui UI ke state awal
            this.updateUI();
        }

    }
}
</script>

<style>
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
    </style>
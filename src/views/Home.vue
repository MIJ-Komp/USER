<template>
    <div class="home-container">
        <SlideShow/>
        
        <!-- Kenapa Kami Berbeda Section -->
        <section class="different-section py-5">
            <div class="container">
                <div class="section-title text-center mb-5" data-aos="fade-up">
                    <h2 class="fw-bold text-white">KENAPA KAMI <span class="color-gold">Berbeda</span></h2>
                </div>
                <div class="diff-items">
                    <div 
                        v-for="(item, index) in differentPoints" 
                        :key="index"
                        class="diff-item-container"
                        :data-aos="index % 2 === 0 ? 'fade-right' : 'fade-left'"
                        :data-aos-delay="index * 100"
                    >
                        <div class="diff-card h-100 p-4 d-flex flex-column align-items-center">
                            <img :src="item.icon" class="diff-icon mb-3" :alt="item.label"/>
                            <div class="diff-label">{{ item.label }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- PC Rakitan Section -->
        <section class="assembly-section py-5">
            <div class="container">
                <div class="section-title text-center mb-5" data-aos="fade-up">
                    <h2 class="fw-bold">RAKITAN PC <span class="color-gold">BERKUALITAS</span></h2>
                </div>
                <div class="assembly-items">
                    <div 
                        v-for="(pc, index) in pcSeries" 
                        :key="pc.title"
                        class="assembly-item-container"
                        :data-aos="'zoom-in'"
                        :data-aos-delay="index * 100"
                    >
                        <div class="assembly-card h-100">
                            <div class="title h5 text-center mb-3">{{ pc.title }}</div>
                            <div class="position-relative assembly-image-container mb-3">
                                <img :src="pc.image" class="assembly-icon" :alt="pc.title"/>
                                <div 
                                    class="find-more-overlay"
                                    @click="showProductInfo(pc.title)"
                                >
                                    <span>What's this?</span>
                                </div>
                            </div>
                            <button @click="goto(pc.path)" class="btn-shop-now w-100">
                                SHOP NOW <i class="fas fa-long-arrow-alt-right ms-2"/>
                            </button>
                        </div>
                    </div>
                </div>
                <div 
                    class="product-info-modal" 
                    v-if="selectedProduct"
                    @click="closeProductInfo"
                >
                    <div class="product-info-content" @click.stop>
                        <h3>{{ selectedProduct.name }}</h3>
                        <p>{{ selectedProduct.description }}</p>
                        <button class="btn-close" @click="closeProductInfo">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Special Series Section -->
        <section class="special-section py-5">
            <div class="container">
                <div class="section-title text-center mb-5" data-aos="fade-up">
                    <h2 class="fw-bold text-white">SPECIAL <span class="color-gold">SERIES</span></h2>
                </div>
                <div class="special-items">
                    <div 
                        v-for="(product, index) in products" 
                        :key="product.id"
                        :data-aos="'fade-up'"
                        :data-aos-delay="index * 100"
                    >
                        <ProductCard :product="product"/>
                    </div>
                </div>
            </div>
        </section>

        <!-- Feature Sections -->
        <section class="features-section py-5">
            <div class="container">
                <div class="feature-card mb-5" data-aos="fade-right">
                    <div class="row align-items-center">
                        <div class="col-lg-6 mb-4 mb-lg-0">
                            <div class="feature-content pe-lg-4">
                                <h3 class="mb-4">PC RAKITAN KHAS DARI KAMI</h3>
                                <p class="text-muted">Pilih dari koleksi PC rakitan siap pakai racikan MIJ KOMP! Setiap unit telah dirakit dengan teliti, diuji secara menyeluruh, dan siap dikirim. Tingkatkan pengalaman komputasi Anda dengan performa terbaik dari konfigurasi PC unggulan kami, dirancang untuk memenuhi berbagai kebutuhan Anda.</p>
                                <button @click="goto('product/desktop-pc')" class="btn-shop-now">SHOP NOW <i class="fas fa-long-arrow-alt-right ms-2"/></button>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <img src="/images/home-icon/rakitan-khas.jpg" class="img-fluid rounded-3" alt="PC Rakitan">
                        </div>
                    </div>
                </div>

                <div class="feature-card mb-5" data-aos="fade-left">
                    <div class="row align-items-center flex-row-reverse">
                        <div class="col-lg-6 mb-4 mb-lg-0">
                            <div class="feature-content ps-lg-4">
                                <h3 class="mb-4">KUNJUNGI MIJ KOMP</h3>
                                <p class="text-muted">MIJ KOMP adalah tempatnya. Dengan bantuan tim ahli kami, Anda bisa melihat dan membandingkan berbagai komponen secara langsung untuk membuat keputusan yang paling tepat. Datanglah ke MIJ KOMP dan lihat langsung bagaimana PC impian Anda dirakit.</p>
                                <button @click="goto('contact-us')" class="btn-shop-now">VISIT US <i class="fas fa-long-arrow-alt-right ms-2"/></button>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <img src="/images/home-icon/kunjungi-mij-komp.jpg" class="img-fluid rounded-3" alt="Kunjungi MIJ KOMP">
                        </div>
                    </div>
                </div>

                <div class="feature-card" data-aos="fade-right">
                    <div class="row align-items-center">
                        <div class="col-lg-6 mb-4 mb-lg-0">
                            <div class="feature-content pe-lg-4">
                                <h3 class="mb-4">KABEL RAPI, KINERJA MAKSIMAL</h3>
                                <p class="text-muted">MIJ KOMP menawarkan solusi kabel manajemen yang rapi dan profesional. Dengan pengalaman dan keahlian kami, kami siap membantu Anda mengorganisir kabel-kabel dengan cara yang paling efisien dan estetis.</p>
                                <button @click="goto('contact-us')" class="btn-shop-now">Contact Us <i class="fas fa-long-arrow-alt-right ms-2"/></button>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <img src="/images/home-icon/kinerja-maksimal.jpg" class="img-fluid rounded-3" alt="Kabel Management">
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import ProductCard from '../components/ProductCard.vue';
import SlideShow from '../components/SlideShow.vue'
import { onMounted } from 'vue'
import 'aos/dist/aos.css'
import AOS from 'aos'
import { mapActions, mapGetters } from 'vuex';
import module from '../constant/module';
export default {
    components: { ProductCard, SlideShow },
    data() {
        return {
            selectedProduct: null,
            productInfo: [
                { name: 'MIJ BASIC', description: 'Rakitan PC Gaming dan Desain dengan komponen modern harga kompetitif' },
                { name: 'MIJ PRIME', description: 'PC Rakitan untuk kebutuhan gaming dan desain dengan performa optimal' },
                { name: 'MIJ CORE', description: 'PC Rakitan Gaming Desain dengan thermal dan estetika optimal' },
                { name: 'MIJ VEIL', description: 'PC Gaming Desain dengan komponen premium dan desain elegan' },
                { name: 'MIJ ESSENCE', description: 'PC Gaming Desain dengan performa tinggi dan desain minimalis' },
                { name: 'MIJ CRUX', description: 'PC Gaming Desain dengan komponen high-end untuk performa maksimal' },
                { name: 'MIJ MIST', description: 'PC Gaming Desain dengan fokus pada pendinginan dan performa' },
                { name: 'MIJ SLEEK', description: 'PC Gaming Desain dengan desain ramping dan performa handal' }
            ],
            differentPoints: [
                {
                    icon: '/images/home-icon/guarantee.png',
                    label: '100% original & bergaransi resmi Indonesia'
                },
                {
                    icon: '/images/home-icon/bios.png',
                    label: 'Bios, Firmware & Drive terbaru'
                },
                {
                    icon: '/images/home-icon/free.png',
                    label: 'Free jasa rakit'
                },
                {
                    icon: '/images/home-icon/manajemen.png',
                    label: 'Manajemen kabel rapi & profesional'
                },
                {
                    icon: '/images/home-icon/pengujian.png',
                    label: 'Pengujian Intensif (System Stress Test) sebelum pengiriman barang'
                },
                {
                    icon: '/images/home-icon/free-pengantaran.png',
                    label: 'Free pengantaran untuk daerah Medan sekitarnya'
                },
                {
                    icon: '/images/home-icon/siap-kirim.png',
                    label: 'Siap kirim ke seluruh Indonesia'
                },
                {
                    icon: '/images/home-icon/layanan-purna.png',
                    label: 'Layanan purna jual yang sangat memuaskan'
                }
            ],
            pcSeries: [
                {
                    title: 'MIJ BASIC',
                    image: '/images/home-icon/mij-basic.webp',
                    path: 'product/mij-basic'
                },
                {
                    title: 'MIJ PRIME',
                    image: '/images/home-icon/mij-prime.webp',
                    path: 'product/mij-prime'
                },
                {
                    title: 'MIJ CORE',
                    image: '/images/home-icon/mij-core.webp',
                    path: 'product/mij-core'
                },
                {
                    title: 'MIJ VEIL',
                    image: '/images/home-icon/mij-veil.webp',
                    path: 'product/mij-veil'
                },
                {
                    title: 'MIJ ESSENCE',
                    image: '/images/home-icon/mij-essence.webp',
                    path: 'product/mij-essence'
                },
                {
                    title: 'MIJ CRUX',
                    image: '/images/home-icon/mij-crux.webp',
                    path: 'product/mij-crux'
                },
                {
                    title: 'MIJ MIST',
                    image: '/images/home-icon/mij-mist.webp',
                    path: 'product/mij-mist'
                },
                {
                    title: 'MIJ SLEEK',
                    image: '/images/home-icon/mij-sleek.webp',
                    path: 'product/mij-sleek'
                }
            ],
            products: [
                {
                    name: 'MIJ BASIC',
                    image: '/images/image-dummy.png',
                    id: 1,
                    priceStart: 6000000,
                    priceEnd: 7000000,
                }
            ],
            menu:null
        }
    },
    computed:{
      ...mapGetters(module.menu.name, ["menus"]),
    },
    methods: {
        ...mapActions(module.product.name, ["getAll"]),
        goto(url) {
            this.$router.replace({ path: `/${url}` });
        },
        showProductInfo(title) {
            this.selectedProduct = this.productInfo.find(p => p.name === title);
        },
        closeProductInfo() {
            this.selectedProduct = null;
        },
        findMenuAndCollectCategoryIds(menus, targetName) {
            let result = {
                menu: null,
                categoryIds: []
            };

            for (const menu of menus) {
                this.recursiveSearch(menu, targetName, result);
                if (result.menu) break; // stop kalau sudah ketemu
            }

            return result;
        },
        recursiveSearch(menu, targetName, result) {
            if (menu.path.toLowerCase() === `/${targetName.toLowerCase()}` || result.menu) {
            if(!result.menu)
                result.menu = menu;

            if (menu.menuItems && Array.isArray(menu.menuItems)) {
                for (const item of menu.menuItems) {
                if (!result.categoryIds.includes(item.productCategoryId)) {
                    result.categoryIds.push(item.productCategoryId);
                }
                }
            }
            if (menu.childs && menu.childs.length > 0) {
                for (const child of menu.childs) {
                // lanjut cari child menu
                this.recursiveSearch(child, targetName, result);
                }
            }
            }
            else{
            if (menu.childs && menu.childs.length > 0) {
                for (const child of menu.childs) {
                // lanjut cari child menu
                if (!result.menu) this.recursiveSearch(child, targetName, result);
                }
            }
            }
        }
    },
    async created(){
       
    },
    watch:{
      menus:{
        immediate: true,
        async handler(){
          if(this.menus){
            const { menu, categoryIds } = this.findMenuAndCollectCategoryIds(this.menus, 'special-series');
            this.menu = menu?.name.toUpperCase()
            console.log(categoryIds)
            this.products = await this.getAll({
              productCategoryIds: categoryIds.length <= 0 ? '-1' : categoryIds.join(',')
            })
            console.log(this.products)
          }
        }
      }
    },

    mounted() {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true
        });

        for(let index = 1; index < 8; index++) {
            this.products.push({
                name: 'MIJ BASIC',
                image: '/images/image-dummy.png',
                id: index + 1,
                price: 7000000,
            })
        }
    }
}
</script>

<style scoped>

.product-info-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.product-info-content {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    position: relative;
    max-width: 500px;
    width: 90%;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.product-info-content h3 {
    color: #14263f;
    margin-bottom: 1rem;
    font-family: 'Barlow Condensed', sans-serif;
}

.btn-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 1.25rem;
    color: #14263f;
    cursor: pointer;
    padding: 0.5rem;
    transition: transform 0.3s ease;
}

.btn-close:hover {
    transform: rotate(90deg);
}

.home-container {
    overflow-x: hidden;
}

.section-title h2 {
    font-size: 2.5rem;
    font-family: 'Barlow Condensed', sans-serif;
    text-transform: uppercase;
}

/* Different Section Styles */
.different-section {
    background: #14263f;
}

.diff-card {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    transition: transform 0.3s ease;
}

.diff-card:hover {
    transform: translateY(-5px);
}

.diff-icon {
    width: 64px;
    height: 64px;
    object-fit: contain;
}

.diff-label {
    color: white;
    font-size: 0.9rem;
    text-align: center;
    line-height: 1.4;
}

/* Assembly Section Styles */
.assembly-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.assembly-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.assembly-image-container {
    overflow: hidden;
    border-radius: 8px;
}

.assembly-icon {
    width: 100%;
    transition: transform 0.3s ease;
}

.find-more-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(249, 174, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    cursor: pointer;
    color: white;
    font-weight: 600;
}

.assembly-image-container:hover {
    .find-more-overlay {
        opacity: 1;
    }
    .assembly-icon {
        transform: scale(1.05);
    }
}

/* Special Section Styles */
.special-section {
    background: #14263f;
}

.special-items, .assembly-items {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
}

/* Feature Section Styles */
.feature-card {
    padding: 2rem;
    border-radius: 12px;
    background: white;
    transition: transform 0.3s ease;
}

.feature-card:hover {
    transform: translateY(-5px);
}

.feature-content h3 {
    font-size: 2rem;
    color: #14263f;
    font-family: 'Barlow Condensed', sans-serif;
}

.btn-shop-now {
    background: #14263e;
    color: #f9ae00;
    border: 2px solid #14263e;
    padding: 0.75rem 2rem;
    border-radius: 8px;
    font-weight: 600;
    transition: all 0.3s ease;
    text-transform: uppercase;
}

.btn-shop-now:hover {
    background: white;
    color: #14263e;
}
.diff-items {
    gap: 12px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}
@media (max-width: 991px) {
    .section-title h2 {
        font-size: 2rem;
    }

    .feature-content {
        text-align: center;
    }

    .special-items, .assembly-items {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
}

@media (max-width: 576px) {
    .section-title h2 {
        font-size: 1.75rem;
    }

    .feature-card {
        padding: 1rem;
    }

    .feature-content h3 {
        font-size: 1.5rem;
    }

    .diff-items {
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    }

    .special-items {
        grid-template-columns: 1fr;
    }
}

/* Animation Classes */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}

.bounce-enter-active {
    animation: bounce-in 0.5s;
}

.bounce-leave-active {
    animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
    0% {
        transform: scale(0);
    }
    50% {
        transform: scale(1.25);
    }
    100% {
        transform: scale(1);
    }
}

/* Hover Animations */
.assembly-card {
    transform-origin: center;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.assembly-card:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.diff-card {
    transform-origin: center;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.diff-card:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.1);
}

.btn-shop-now {
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
}

.btn-shop-now::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: -100%;
    background: linear-gradient(
        120deg,
        transparent,
        rgba(255, 255, 255, 0.2),
        transparent
    );
    transition: all 0.5s ease;
}

.btn-shop-now:hover::after {
    left: 100%;
}

/* Loading Skeleton Animation */
@keyframes shimmer {
    0% {
        background-position: -1000px 0;
    }
    100% {
        background-position: 1000px 0;
    }
}

.skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 1000px 100%;
    animation: shimmer 2s infinite;
}
</style>
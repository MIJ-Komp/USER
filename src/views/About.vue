<template>
  <div class="container py-5">
    <div class="about-content" data-aos="fade-up">
      <div class="header text-center mb-5">
        <div class="d-flex align-items-center justify-content-center gap-4">
          <div class="line"></div>
          <h1 class="display-5 mb-0 fw-bold font-title">ABOUT</h1>
          <div class="line"></div>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div class="intro-section mb-5" data-aos="fade-up" data-aos-delay="100">
            <p class="lead mb-4">Sebagai spesialis <strong>PC Rakitan</strong> (untuk kebutuhan Gaming, Desain, atau Perkantoran), MIJ Komp punya banyak keunggulan yang membuatnya berbeda dengan PC Builder lainnya, yakni:</p>
            <div class="features-grid">
              <div class="feature-card" v-for="(feature, index) in features" :key="index" data-aos="fade-up" :data-aos-delay="150 + (index * 50)">
                <i :class="feature.icon"></i>
                <span>{{ feature }}</span>
              </div>
            </div>
          </div>

          <div class="target-section mb-5" data-aos="fade-up" data-aos-delay="200">
            <h2 class="section-title">Cocok Untuk Siapa Sajakah PC Rakitan MIJ Komp Ini?</h2>
            <p class="mb-4">Produk PC Rakitan yang dikeluarkan sangat cocok untuk segmen personal ataupun instansi (perusahaan, sekolah, lembaga, dan semacamnya) untuk kebutuhan sebagai berikut:</p>
            <div class="target-grid">
              <div class="target-card" v-for="(target, index) in targets" :key="index" data-aos="fade-up" :data-aos-delay="250 + (index * 50)">
                <div class="target-icon">
                  <i :class="getTargetIcon(index)"></i>
                </div>
                <div class="target-content">
                  <h3 class="h5 mb-2">{{ target.title }}</h3>
                  <p class="mb-0 text-muted">{{ target.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="products-section mb-5" data-aos="fade-up" data-aos-delay="300">
            <h2 class="section-title">Variasi Produk PC Rakitan dari MIJ Komp</h2>
            <p class="mb-4"><strong>MIJ Komp</strong> memiliki variasi produk yang berkualitas:</p>
            <div class="product-cards">
              <div class="product-card" v-for="(product, index) in products" :key="index" data-aos="fade-up" :data-aos-delay="350 + (index * 50)">
                <div class="product-header">
                  <h3 class="h5 mb-0">{{ product.name }}</h3>
                </div>
                <div class="product-body">
                  <p class="mb-0">{{ product.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="shipping-section mb-5" data-aos="fade-up" data-aos-delay="400">
            <h2 class="section-title">Jasa Pengiriman</h2>
            <div class="shipping-logos mb-4">
              <img src="/images/shipping/sicepat.png" alt="SiCepat" class="img-fluid"/>
              <img src="/images/shipping/jne.png" alt="JNE" class="img-fluid"/>
              <img src="/images/shipping/anteraja.png" alt="AnterAja" class="img-fluid"/>
            </div>
            <div class="shipping-cards">
              <div class="shipping-card" v-for="(courier, index) in couriers" :key="index" data-aos="fade-up" :data-aos-delay="450 + (index * 50)">
                <h3 class="h5 mb-3">{{ courier.name }}</h3>
                <ul class="list-unstyled mb-0">
                  <li v-for="service in courier.services" :key="service" class="mb-2">
                    <i class="bi bi-check2-circle me-2 text-success"></i>{{ service }}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="contact-section" data-aos="fade-up" data-aos-delay="500">
            <h2 class="section-title">Hubungi Kami</h2>
            <div class="contact-cards">
              <div class="contact-card">
                <div class="contact-icon">
                  <i class="bi bi-geo-alt-fill"></i>
                </div>
                <div class="contact-content">
                  <h3 class="h6 mb-2">Alamat</h3>
                  <p class="mb-2">Jl. Pajang No. 8-B Medan 20214</p>
                  <p class="mb-0 text-muted">Kelurahan Sei Rengas Permata, Kecamatan Medan Area, Sumatera Utara, Indonesia</p>
                  <a href="https://goo.gl/maps/1HozbTotkCKgpFaj6" target="_blank" class="btn btn-sm btn-outline-primary mt-2">
                    <i class="bi bi-map me-2"></i>Lihat di Google Maps
                  </a>
                </div>
              </div>
              <div class="contact-card">
                <div class="contact-icon">
                  <i class="bi bi-headset"></i>
                </div>
                <div class="contact-content">
                  <h3 class="h6 mb-2">Kontak</h3>
                  <a href="https://wa.me/628116181628" target="_blank" class="d-block mb-2 text-decoration-none">
                    <i class="bi bi-whatsapp me-2"></i>08116181628
                  </a>
                  <a href="mailto:info@mijkomp.id" class="d-block text-decoration-none">
                    <i class="bi bi-envelope me-2"></i>info@mijkomp.id
                  </a>
                </div>
              </div>
              <div class="contact-card">
                <div class="contact-icon">
                  <i class="bi bi-share"></i>
                </div>
                <div class="contact-content">
                  <h3 class="h6 mb-2">Media Sosial</h3>
                  <div class="social-links">
                    <a href="https://www.instagram.com/mijkomp/" target="_blank" class="btn btn-sm btn-outline-danger">
                      <i class="bi bi-instagram"></i>
                    </a>
                    <a href="https://www.tiktok.com/@mijkomp" target="_blank" class="btn btn-sm btn-outline-dark">
                      <i class="bi bi-tiktok"></i>
                    </a>
                    <a href="https://www.youtube.com/@mijkomp8069" target="_blank" class="btn btn-sm btn-outline-danger">
                      <i class="bi bi-youtube"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="payment-section" data-aos="fade-up" data-aos-delay="600">
            <h2 class="section-title">Metode Pembayaran</h2>
            <div class="payment-cards">
              <div class="payment-card">
                <!-- <img src="/images/bank/gopay.png" alt="Gopay" class="payment-logo"/> -->
                <img src="" alt="Gopay" class="payment-logo"/>
                <span>Gopay</span>
              </div>
              <div class="payment-card">
                <div class="d-flex" style="gap: 12px;">
                    <img src="/images/bank/mandiri-bank.png" alt="Mandiri" class="payment-logo"/>
                    <img src="/images/bank/bni-bank.png" alt="Mandiri" class="payment-logo"/>
                    <img src="/images/bank/permata-bank.png" alt="Mandiri" class="payment-logo"/>
                </div>
                <span>Virtual Account</span>
              </div>
              <div class="payment-card">
                <div class="d-flex" style="gap: 12px;">
                    <img src="/images/bank/visa.png" alt="Credit Card" class="payment-logo"/>
                    <img src="/images/bank/jcb-bank.png" alt="Credit Card" class="payment-logo"/>
                </div>
                <span>Credit Card</span>
              </div>
              <div class="payment-card">
                <!-- <img src="/images/bank/bca.png" alt="BCA" class="payment-logo"/> -->
                <img src="" alt="BCA" class="payment-logo"/>
                <span>Transfer Bank BCA 1950918671 An. FEBRIYANTO</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const features = [
  'Semua Part/Komponen 100% Original, dan Bergaransi Resmi Indonesia',
  'Bios, Firmware, & Driver Terbaru',
  'Free Jasa Rakit',
  'Manajemen Kabel Rapi & Profesional',
  'Pengujian Intensif (System Stress Test) Sebelum Pengiriman Barang',
  'Free Pengantaran Untuk Daerah Medan Sekitarnya',
  'Siap Kirim ke Seluruh Indonesia'
]

const targets = [
  { title: 'PC Gaming', description: 'Mulai dari game ringan hingga game berklasifikasi AAA' },
  { title: 'PC Desain', description: 'Multimedia: Video & Photo Editing' },
  { title: 'PC Coding', description: 'Kebutuhan sederhana hingga kebutuhan Virtualisasi' },
  { title: 'PC Simulasi', description: '3D Modeling, Arsitektur, Animasi' },
  { title: 'PC Office', description: 'Kantor/Kampus/Sekolah' }
]

const products = [
  { name: 'MIJ REDUC', description: 'Rakitan PC Gaming Murah dengan CPU dan Chipset lawas yang masih mumpuni' },
  { name: 'MIJ ECO', description: 'Rakitan PC untuk Kantor dan Sekolah untuk kebutuhan dasar' },
  { name: 'MIJ BASIC', description: 'Rakitan PC Gaming dan Desain dengan komponen modern harga kompetitif' },
  { name: 'MIJ CORE', description: 'PC Rakitan Gaming Desain dengan thermal dan estetika optimal' },
  { name: 'MIJ ELITE', description: 'PC Gaming Desain dengan komponen terbaik di kelasnya' },
  { name: 'MIJ ULTIMATE', description: 'Best of the best, PC Rakitan Gaming Desain Sultan' },
  { name: 'MIJ WEE', description: 'PC Gaming Desain dengan Casing Mini namun maksimal' },
  { name: 'MIJ PYGMY', description: 'PC Gaming Desain Mini dengan komponen terbaik' }
]

const couriers = [
  {
    name: 'JNE',
    services: ['JNE REGULAR', 'JNE OKE', 'JNE YES', 'JNE TRUCKING']
  },
  {
    name: 'SiCepat',
    services: ['SiCepat REGULAR', 'SiCepat BEST', 'SiCepat SIUNT', 'SiCepat GOKIL', 'SiCepat SDS']
  },
  {
    name: 'Anteraja',
    services: ['Anteraja Regular', 'Anteraja Same Day', 'Anteraja Next Day', 'Anteraja Cargo']
  }
]

const getTargetIcon = (index) => {
  const icons = ['bi bi-controller', 'bi bi-palette', 'bi bi-code-slash', 'bi bi-boxes', 'bi bi-building']
  return icons[index]
}
</script>

<style scoped>
.about-content {
  max-width: 1200px;
  margin: 0 auto;
}

.header .line {
  height: 2px;
  width: 100px;
  background: var(--bs-dark);
}

.section-title {
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 1rem;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 3px;
  background: var(--bs-warning);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.feature-card {
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
}

.target-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.target-card {
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  display: flex;
  gap: 1rem;
  transition: all 0.3s ease;
}

.target-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
}

.target-icon {
  min-width: 32px;
  width: 32px;
  height: 32px;
  background: var(--bs-warning);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
}

.product-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.product-card {
  background: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  transition: all 0.3s ease;
}

.product-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
}

.product-header {
  background: var(--bs-dark);
  color: white;
  padding: 1rem;
}

.product-body {
  padding: 1rem;
}

.shipping-logos {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 2rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.shipping-logos img {
  height: 40px;
  object-fit: contain;
}

.shipping-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.shipping-card {
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.contact-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.contact-card {
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  display: flex;
  gap: 1rem;
}

.contact-icon {
  min-width: 32px;
  max--width: 32px;
  height: 32px;
  background: var(--bs-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
}

.social-links {
  display: flex;
  gap: 0.5rem;
}

.payment-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.payment-card {
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
}

.payment-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
}

.payment-logo {
  width: 70px;
  height: 30px;
  object-fit: contain;
}

@media (max-width: 768px) {
  .about-content {
    padding: 1rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .shipping-logos {
    flex-direction: column;
    padding: 1rem;
  }

  .shipping-logos img {
    height: 30px;
  }

  .contact-card {
    flex-direction: column;
    text-align: center;
  }

  .contact-icon {
    margin: 0 auto;
  }

  .social-links {
    justify-content: center;
  }
}
</style>

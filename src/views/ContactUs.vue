<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <!-- Header dengan animasi -->
        <div class="header text-center mb-5" data-aos="fade-down">
          <h1 class="display-4 fw-bold font-title mb-4">CONTACT US</h1>
          <div class="divider d-flex align-items-center justify-content-center">
            <div class="line"></div>
            <div class="dot"></div>
            <div class="line"></div>
          </div>
        </div>

        <!-- Contact Cards -->
        <div class="contact-cards">
          <!-- Address Card -->
          <div class="contact-card" data-aos="fade-up" data-aos-delay="100">
            <div class="icon-wrapper bg-primary">
              <i class="fa-solid fa-location-dot"></i>
            </div>
            <div class="content">
              <h3>Address</h3>
              <p>Jl. Pajang No. 8-B Medan, Sumatera Utara, Indonesia 20214</p>
            </div>
          </div>

          <!-- Phone Card -->
          <div class="contact-card" data-aos="fade-up" data-aos-delay="200">
            <div class="icon-wrapper bg-success">
              <i class="fa-solid fa-mobile-screen-button"></i>
            </div>
            <div class="content">
              <h3>Phone</h3>
              <a href="tel:+628116181628" class="contact-link">+62 81 1618 1628</a>
            </div>
          </div>

          <!-- Social Media Card -->
          <div class="contact-card" data-aos="fade-up" data-aos-delay="300">
            <div class="content">
              <h3 class="mb-4">Follow Us</h3>
              <div class="social-icons">
                <a href="https://www.instagram.com/mijkomp/" class="social-icon instagram" title="Follow on Instagram" target="_blank">
                  <i class="fa-brands fa-instagram"></i>
                </a>
                <a href="https://www.tiktok.com/@mijkomp" class="social-icon tiktok" title="Follow on TikTok" target="_blank">
                  <i class="fa-brands fa-tiktok"></i>
                </a>
                <a href="https://www.facebook.com/mijkomp" class="social-icon facebook" title="Follow on Facebook" target="_blank">
                  <i class="fa-brands fa-facebook"></i>
                </a>
                <a href="https://www.youtube.com/@mijkomp" class="social-icon youtube" title="Follow on YouTube" target="_blank">
                  <i class="fa-brands fa-youtube"></i>
                </a>
              </div>
            </div>
          </div>

          <!-- WhatsApp Card -->
          <div class="contact-card whatsapp-card" data-aos="fade-up" data-aos-delay="400">
            <a href="https://api.whatsapp.com/send?phone=628116181628&text=Halo MIJ KOMP... Saya ingin bertanya sesuatu. Saya dapat Nomor WA MIJ KOMP dari website ini: https://mijkomp.id/contact-us/" 
               class="whatsapp-button">
              <i class="fa-brands fa-whatsapp"></i>
              <div class="whatsapp-content">
                <span class="status">Customer Service <span class="badge">Online</span></span>
                <span class="text">Butuh Bantuan?</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.divider {
  gap: 1rem;
}

.line {
  height: 2px;
  background: #000;
  width: 100px;
}

.dot {
  width: 8px;
  height: 8px;
  background: #000;
  border-radius: 50%;
}

.contact-cards {
  display: grid;
  gap: 2rem;
}

.contact-card {
  padding: 2rem;
  border-radius: 1rem;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1.5rem;
  transition: transform 0.3s ease;
}

.contact-card:hover {
  transform: translateY(-5px);
}

.icon-wrapper {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
}

.content h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.content p {
  margin: 0;
  color: #666;
}

.contact-link {
  color: #0d6efd;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.contact-link:hover {
  color: #0a58ca;
}

.social-icons {
  display: flex;
  gap: 1rem;
}

.social-icon {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.25rem;
  transition: transform 0.3s ease;
}

.social-icon:hover {
  transform: scale(1.1);
}

.instagram { background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888); }
.tiktok { background: #000; }
.facebook { background: #3b5998; }
.youtube { background: #ff0000; }

.whatsapp-card {
  background: #25d366;
  padding: 0;
  overflow: hidden;
}

.whatsapp-button {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  color: white;
  text-decoration: none;
  width: 100%;
  transition: background-color 0.3s ease;
}

.whatsapp-button:hover {
  background: #128c7e;
}

.whatsapp-button i {
  font-size: 2.5rem;
}

.whatsapp-content {
  display: flex;
  flex-direction: column;
}

.status {
  font-size: 0.875rem;
}

.badge {
  background: #62c971;
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  font-size: 0.75rem;
}

.text {
  font-weight: 600;
  font-size: 1.125rem;
}

@media (max-width: 768px) {
  .contact-card {
    padding: 1.5rem;
    flex-direction: column;
    text-align: center;
  }

  .social-icons {
    justify-content: center;
  }

  .whatsapp-button {
    flex-direction: column;
    text-align: center;
    padding: 1rem;
  }
}
</style>
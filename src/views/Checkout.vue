<template>
  <div class="container py-4">
    <div class="checkout-header mb-4">
      <h4 class="text-center mb-2">Checkout</h4>
      <div class="checkout-steps d-flex justify-content-center align-items-center gap-3 mb-4">
        <div class="step active">1. Informasi</div>
        <i class="fas fa-chevron-right"></i>
        <div class="step">2. Pembayaran</div>
      </div>
    </div>

    <b-form ref="form" @submit.prevent="createOrder" @keydown.enter.prevent class="row g-4">
      <div class="col-lg-8">
        <!-- Informasi Pembeli -->
        <div class="checkout-card mb-4">
          <div class="card-body p-4">
            <div class="section-header d-flex align-items-center gap-2 mb-4">
              <i class="fas fa-user-circle fs-4 color-gold"></i>
              <h5 class="mb-0">Informasi Pembeli</h5>
            </div>

            <div class="row g-3">
              <div class="col-md-6">
                <b-form-group label="Nama Lengkap" label-for="txtCustomerName" label-class="required fw-semibold">
                  <b-form-input
                    id="txtCustomerName"
                    v-model="customerInfo.name"
                    type="text"
                    placeholder="Masukkan nama lengkap"
                    required
                    class="form-control-lg"
                  />
                </b-form-group>
              </div>
              <div class="col-md-6">
                <b-form-group label="No. WhatsApp" label-for="txtWhatsapp" label-class="required fw-semibold">
                  <b-form-input
                    id="txtWhatsapp"
                    v-model="customerInfo.phoneNumber"
                    type="tel"
                    placeholder="Contoh: 08123456789"
                    required
                    class="form-control-lg"
                  />
                </b-form-group>
              </div>
              <div class="col-12">
                <b-form-group label="Email" label-for="txtEmail" label-class="required fw-semibold">
                  <b-form-input
                    id="txtEmail"
                    v-model="customerInfo.email"
                    type="email"
                    placeholder="Contoh: nama@email.com"
                    required
                    class="form-control-lg"
                  />
                </b-form-group>
              </div>
            </div>
          </div>
        </div>

        <!-- Alamat Pengiriman -->
        <div class="checkout-card">
          <div class="card-body p-4">
            <div class="section-header d-flex align-items-center gap-2 mb-4">
              <i class="fas fa-shipping-fast fs-4 color-gold"></i>
              <h5 class="mb-0">Alamat Pengiriman</h5>
            </div>

            <div class="row g-3">
              <div class="col-12">
                <b-form-group label="Negara" label-for="txtCountry" label-class="fw-semibold">
                  <b-form-input
                    id="txtCountry"
                    :model-value="'Indonesia'"
                    disabled
                    class="form-control-lg bg-light"
                  />
                </b-form-group>
              </div>
              <div class="col-md-4">
                <b-form-group label="Provinsi" label-for="txtProvince" label-class="required fw-semibold">
                  <b-form-input
                    id="txtProvince"
                    v-model="shippingInfo.province"
                    type="text"
                    placeholder="Masukkan provinsi"
                    required
                    class="form-control-lg"
                  />
                </b-form-group>
              </div>
              <div class="col-md-4">
                <b-form-group label="Kabupaten/Kota" label-for="txtCity" label-class="required fw-semibold">
                  <b-form-input
                    id="txtCity"
                    v-model="shippingInfo.city"
                    type="text"
                    placeholder="Masukkan kabupaten/kota"
                    required
                    class="form-control-lg"
                  />
                </b-form-group>
              </div>
              <div class="col-md-4">
                <b-form-group label="Kecamatan" label-for="txtDistrict" label-class="required fw-semibold">
                  <b-form-input
                    id="txtDistrict"
                    v-model="shippingInfo.district"
                    type="text"
                    placeholder="Masukkan kecamatan"
                    required
                    class="form-control-lg"
                  />
                </b-form-group>
              </div>
              <div class="col-12">
                <b-form-group 
                  label="Detail Alamat" 
                  label-for="txtAddress" 
                  label-class="required fw-semibold"
                  description="Masukkan nama jalan, RT/RW, no. rumah, patokan, dll"
                >
                  <b-form-textarea
                    id="txtAddress"
                    v-model="shippingInfo.address"
                    placeholder="Contoh: Jl. Contoh No. 123, RT 01/RW 02, Dekat Masjid"
                    required
                    rows="3"
                    class="form-control-lg"
                  />
                </b-form-group>
              </div>
              <div class="col-12">
                <b-form-group label="Catatan Pengiriman" label-for="txtNotes" label-class="fw-semibold">
                  <b-form-textarea
                    id="txtNotes"
                    v-model="shippingInfo.notes"
                    placeholder="Contoh: Tolong kirim di jam kerja, hubungi WA sebelum kirim"
                    rows="2"
                    class="form-control-lg"
                  />
                </b-form-group>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Ringkasan Belanja -->
      <div class="col-lg-4">
        <div class="checkout-summary">
          <div class="card-body p-4">
            <h5 class="mb-4">Ringkasan Belanja</h5>
            
            <div class="order-items mb-4">
              <div v-for="item in cartItems" :key="item.productId" class="order-item mb-3 pb-3 border-bottom">
                <div class="d-flex gap-3">
                  <div class="item-image">
                    <img :src="item.product?.imageIds?.[0] ? `${constant.BASE_URL_API}/files?id=${item.product.imageIds[0]}` : '/images/image-dummy.png'" 
                         :alt="item.product?.name"
                         class="rounded">
                  </div>
                  <div class="flex-grow-1">
                    <h6 class="mb-0">{{ item.product?.name }}</h6>
                    <small class="mb-1 text-muted ps-2">{{ item.productSku.name }}</small>
                    <div class="text-muted small">{{ item.qty }} x {{ formatCurrency(item.totalPrice / item.qty) }}</div>
                  </div>
                  <div class="item-total fw-semibold">{{ formatCurrency(item.totalPrice) }}</div>
                </div>
              </div>
            </div>

            <div class="order-summary">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <span>Subtotal</span>
                <span class="fw-semibold">{{ formatCurrency(totalPrice) }}</span>
              </div>
              <div class="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom">
                <span>Pengiriman</span>
                <span class="text-muted">Ditentukan setelah checkout</span>
              </div>
              <div class="d-flex justify-content-between align-items-center mb-4">
                <span class="h5 mb-0">Total</span>
                <span class="h5 mb-0 color-gold">{{ formatCurrency(totalPrice) }}</span>
              </div>

              <button 
                type="submit" 
                style="border: 0 !important; background-color: var(--gold) !important; color: black !important;"
                class="btn btn-primary btn-lg w-100" 
                @click="validateAndSubmit"
                :disabled="!cartItems.length"
              >
                <i class="fas fa-lock me-2"></i>Lanjut ke Pembayaran
              </button>

              <div class="text-center mt-3 ">
                <router-link to="/cart" class="text-decoration-none ">
                  <i class="fas fa-arrow-left me-1"></i>Kembali ke Keranjang
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-form>
  </div>
</template>

<style scoped>
.checkout-header {
  border-bottom: 1px solid #eee;
}

.checkout-steps {
  font-size: 0.9rem;
}

.step {
  color: #6c757d;
  font-weight: 500;
}

.step.active {
  color: var(--gold);
  font-weight: 600;
}

.checkout-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
}

.checkout-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.section-header {
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.checkout-summary {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  position: sticky;
  top: 80px;
}

.order-item .item-image {
  width: 60px;
  height: 60px;
  flex-shrink: 0;
}

.order-item .item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.form-control-lg {
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #dee2e6;
}

.form-control-lg:focus {
  border-color: var(--bs-primary);
  box-shadow: 0 0 0 0.25rem rgba(var(--bs-primary-rgb), 0.25);
}

.required::after {
  content: " *";
  color: #dc3545;
}

@media (max-width: 991.98px) {
  .checkout-summary {
    position: static;
    margin-top: 2rem;
  }
}
</style>

<script setup>
  import { ref, watch, getCurrentInstance } from 'vue';
  import { useCartStore } from '../store/cartStore';
  import { useStore } from 'vuex';
  import module from '../constant/module.js';
  import { useRouter } from 'vue-router';
  import Toast from "primevue/toast";
  import createToast from "../components/toast.js";

  const { appContext } = getCurrentInstance();

  const toast = appContext.config.globalProperties.$toast;
  const showToast = createToast(toast);


  const store = useStore();
  const cartStore = useCartStore();
  const router = useRouter();

  const cartItems = ref([]);
  const totalPrice = ref(0);

  const customerInfo = ref({
    name: "",
    phoneNumber: "",
    email: ""
  })

  const shippingInfo = ref({
    address: "",
    city: "",
    notes: "",
    postalCode: "",
    province: "",
    recipientName: ""
  });

  async function getAllProducts() {

    if (!cartStore.items.length) {
      cartItems.value = [];
      totalPrice.value = 0;
      router.push("/cart")
    } 

    const params = {
      ids: cartStore.items.map(x => x.productId).join(",")
    };

    try {
      const productRes = await store.dispatch(`${module.product.name}/getAll`, params);

      totalPrice.value = 0; 
      cartItems.value = cartStore.items.map(item => {
        const product = productRes.find(x => x.id == item.productId);
        const productSku = product?.productSkus.find(x => x.id == item.productSkuId);

        if (productSku) {
          totalPrice.value += productSku.price * item.qty;
          item.totalPrice = productSku.price * item.qty
        }

        return {
          ...item,
          productSku,
          product
        };
      });

      console.log(cartItems)

    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  }

  function formatCurrency(number) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(number);
  }

  const validateAndSubmit = () => {
    const customer = customerInfo.value
    const shipping = shippingInfo.value

    const isValid =
      customer.name.trim() !== "" &&
      customer.phoneNumber.trim() !== "" &&
      customer.email.trim() !== "" &&

      shipping.address.trim() !== "" &&
      shipping.province.trim() !== "" 
      shipping.city.trim() !== "" &&
      shipping.district.trim() !== ""
      // shipping.postalCode.trim() !== ""

    if (!isValid) {
      console.log(showToast)
      showToast.error("Mohon melengkapi data yang dibutuhkan (bertanda *)") 
      return
    }

    createOrder()
  }

  async function createOrder() {
    const payload = {
      customerInfo: {
        name: customerInfo.value.name,
        email: customerInfo.value.email,
        phoneNumber: customerInfo.value.phoneNumber
      },
      notes: "string",
      orderItems: [],
      shippingInfo: {
        address: shippingInfo.value.address,
        district: shippingInfo.value.district,
        city: shippingInfo.value.city,
        province: shippingInfo.value.province,
        postalCode: shippingInfo.value.postalCode,
        notes: shippingInfo.value.notes,
      }
    }

    cartItems.value.forEach(item => {
      payload.orderItems.push(
        {
          productId: item.productId,
          productSkuId: item.productSkuId,
          quantity: item.qty
        })
    });

    try {
      const orderRes = await store.dispatch(`${module.order.name}/create`, payload);

      if(orderRes.paymentUrl){
        router.push("/order/" + orderRes.code)
        window.location.href = orderRes.paymentUrl
      }

      localStorage.removeItem("cart_items")

    } catch (err) {
      alert(err.message[0]);
    }
  }

  watch(() => 
    cartStore.items, 
    getAllProducts, 
    { deep: true, immediate: true }
  );
</script>


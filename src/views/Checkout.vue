<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="d-flex">
          <h4>Checkout</h4>
        </div>
      </div>
    </div>

    
      <b-form ref="form" @submit.prevent="createOrder" @keydown.enter.prevent class="row">
        <div class="col-md-8 mb-4">
          <div class="row">
            <div class="col">
              <div class="card mb-3 shadow-sm">
                <div class="card-body">
                  <p class="fw-semibold">Informasi Pembeli</p>
                  <b-form-group label="Nama Lengkap" label-for="txtCustomerName" label-class="required">
                    <b-form-input autocomplete="off" id="txtCustomerName" v-model="customerInfo.name" type="text" placeholder="Masukkan nama lengkap" required />
                  </b-form-group>
                  <b-form-group label="No. Whatsapp" label-for="txtWhatsapp" label-class="required">
                    <b-form-input autocomplete="off" id="txtWhatsapp" v-model="customerInfo.phoneNumber" type="text" placeholder="Masukkan no. whatsapp untuk notifikasi pembayaran" required />
                  </b-form-group>
                  <b-form-group label="Email" label-for="txtEmail" label-class="required">
                    <b-form-input autocomplete="off" id="txtEmail" v-model="customerInfo.email" type="email" placeholder="Masukkan email  " required />
                  </b-form-group>
                </div>
              </div>

              <div class="card shadow-sm">
                <div class="card-body">
                  <p class="fw-semibold">Alamat Pengiriman</p>

                  <b-form-group label="Negara" label-for="txtCountry" label-class="required">
                    <b-form-input autocomplete="off" id="txtCountry" :model-value="'Indonesia'" disabled type="text" />
                  </b-form-group>
                  <b-form-group label="Profinsi" label-for="txtProvince" label-class="required">
                    <b-form-input autocomplete="off" id="txtProvince" v-model="shippingInfo.province" type="text" placeholder="Masukkan provinsi" required />
                  </b-form-group>
                  <b-form-group label="Kabupaten/Kota" label-for="txtCity" label-class="required">
                    <b-form-input autocomplete="off" id="txtCity" v-model="shippingInfo.city" type="text" placeholder="Masukkan kabupaten/kota" required />
                  </b-form-group>
                  <b-form-group label="Kecamatan" label-for="txtDistrict" label-class="required">
                    <b-form-input autocomplete="off" id="txtDistrict" v-model="shippingInfo.district" type="text" placeholder="Masukkan kecamatan" required />
                  </b-form-group>
                  <b-form-group label="Detail Alamat" label-for="txtAddress" description="Masukkan nama jalan, RT/RW, no. rumah, patokan dll" label-class="required">
                    <b-form-textarea autocomplete="off" id="txtAddress" v-model="shippingInfo.address" placeholder="Masukkan detail alamat" required />
                  </b-form-group>
                  <b-form-group label="Catatan" label-for="txtNotes">
                    <b-form-textarea autocomplete="off" id="txtNotes" v-model="shippingInfo.notes" placeholder="Masukkan catatan" />
                  </b-form-group>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-4" 
            style="position: sticky;
            top: 64px;
            height: fit-content;
            z-index: 10;">
          <div class="card shadow-sm">
            <div class="card-body">
              <h5>Ringkasan Belanja</h5>
              <div v-for="item in cartItems" class="d-flex justify-content-between mb-2">
                <span>{{item.product?.name}}</span>
                <span class="fw-semibold">{{ formatCurrency(item?.totalPrice) }}</span>
              </div>
              <div class="border-top pt-4 d-flex justify-content-between mt-4 mb-4">
                <span>TOTAL</span>
                <span class="fw-semibold">{{ formatCurrency(totalPrice) }}</span>
              </div>
              <Button variant="warning" class="w-100" label="Payment" @click="validateAndSubmit"/>
            </div>
          </div>
        </div>
      </b-form>

    
  </div>
</template>

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


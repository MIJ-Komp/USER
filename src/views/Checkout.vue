<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="d-flex">
          <h4>Checkout</h4>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-8 mb-4">
        <div class="row">
          <div class="col">
            <div class="card mb-3 shadow-sm">
              <div class="card-body">
                <p class="fw-semibold">
                  Informasi Pembeli
                </p>
                <TextBox :required="false" class="mb-2" label="Nama Lengkap" v-model="customerInfo.name" />
                <TextBox :required="false" class="mb-2" label="No. Whatsapp" v-model="customerInfo.phoneNumber" />
                <TextBox :required="false" class="mb-2" label="Email" v-model="customerInfo.email"/>
              </div>
            </div>
            
            <div class="card shadow-sm">
              <div class="card-body">
                <p class="fw-semibold">
                  Alamat Pengiriman
                </p>
                
                <TextArea :required="false" class="mb-2" :rows="3" label="Alamat" v-model="shippingInfo.address" />
                <TextBox :required="false" class="mb-2" label="Kecamatan" v-model="shippingInfo.district" />
                <TextBox :required="false" class="mb-2" label="Kab./Kota" v-model="shippingInfo.city" />
                <TextBox :required="false" class="mb-2" label="Provinsi" v-model="shippingInfo.province"/>
                <TextBox :required="false" class="mb-2" label="Kode Pos" v-model="shippingInfo.postalCode" />
                <TextArea 
                  :required="false" 
                  class="mb-2" 
                  :rows="2"
                  label="Catatan untuk kurir"
                  v-model="shippingInfo.notes"
                  placeholder="Masukkan catatan untuk kurir"
                />
              </div>
            </div>
            
            <!-- <p>Daftar Belanja</p>
            <div class="card mb-3 shadow-sm">
              <div v-for="cartItem in cartItems" class="border-bottom">
                <CartItem
                  :key="cartItem.productId"
                  :cartItem="cartItem"
                  :changeQty="changeQty"
                  :removeItem="removeItem"
                />
              </div>
            </div> -->

          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card shadow-sm">
          <div class="card-body">
            <h5>Ringkasan Belanja</h5>
            <div class="d-flex justify-content-between mb-4">
              <span>Total</span>
              <span class="fw-semibold">{{ formatCurrency(totalPrice) }}</span>
            </div>
            <button @click="createOrder" class="btn btn-warning w-100 fw-semibold">Beli</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, ref, watch } from 'vue';
  import CartItem from '../components/CartItem.vue';
  import { useCartStore } from '../store/cartStore';
  import { useStore } from 'vuex';
  import module from '../constant/module.js';
  import TextBox from '../components/input/TextBox.vue';
  import TextArea from '../components/input/TextArea.vue';

  const store = useStore();
  const cartStore = useCartStore();

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
      return;
    }

    const params = {
      productIds: cartStore.items.map(x => x.productId).join(",")
    };

    try {
      const productRes = await store.dispatch(`${module.product.name}/getAll`, params);

      totalPrice.value = 0; // Reset sebelum akumulasi ulang
      cartItems.value = cartStore.items.map(item => {
        const product = productRes.find(x => x.id == item.productId);
        const productSku = product?.productSkus.find(x => x.id == item.productSkuId);

        if (productSku) {
          totalPrice.value += productSku.price * item.qty;
        }

        return {
          ...item,
          product
        };
      });

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
      console.log(module.order.name)
      const orderRes = await store.dispatch(`${module.order.name}/create`, payload);
      console.log(orderRes)

    } catch (err) {
      console.error("Failed to create order:", err);
    }
  }

  watch(() => 
    cartStore.items, 
    getAllProducts, 
    { deep: true, immediate: true }
  );
</script>


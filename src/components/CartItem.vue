<template>
  <div class="row g-0">
    <div class="col-3 col-md-2 p-2">
      <img 
        :src="imageUrl || constant.DEFAULT_PRODUCT_IMAGE" 
        class="img-fluid rounded" alt="..."
        @error="useFallback"
      >
    
    </div>
    <div class="col-9 col-md-10">
      <div class="card-body">
        <h5 class="card-title">{{ cartItem?.product?.name}}</h5>
        <p class="card-text">{{formatCurrency(productSku?.price || 0)}}</p>
        
        <div class="d-flex flex-column align-items-end">     
          <span class="fs-sm" :class="productSku?.stock && cartItem?.qty > productSku?.stock? 'text-warning' : ''" v-if="productSku?.stock && productSku?.stock > 0">Stok: {{productSku?.stock}}</span>
          <span class="fs-sm text-danger" v-else>Stok Habis</span>
          <div>
            <button @click="removeItem(cartItem.productId, cartItem.productSkuId)" type="button" class="btn btn-sm btn-outline-secondary me-2">
              <i class="fa fa-trash"></i>
            </button>

            <div class="btn-group" role="group" aria-label="Basic outlined example">
              <button @click="changeQty(cartItem.productId, cartItem.productSkuId, -1)" :disabled="cartItem?.qty == 1" type="button" class="btn btn-sm btn-outline-secondary"><i class="fa fa-minus"></i></button>
              <button type="button" class="btn btn-sm btn-outline-secondary disabled text-dark" style="color: black !important; border-color: #2e3235 !important;">
                {{cartItem?.qty}}
              </button>
              <button @click="changeQty(cartItem.productId, cartItem.productSkuId, 1)" :disabled="cartItem?.qty >= productSku?.stock" type="button" class="btn btn-sm btn-outline-secondary"><i class="fa fa-plus"></i></button>
            </div>
          </div>     
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, toRefs, watch } from 'vue';
import constant from '../constant/constant';

  const props = defineProps({
    cartItem: Object,
    changeQty: Function,
    removeItem: Function
  })

  const { cartItem } = toRefs(props)

  const productSku = ref()

  watch(cartItem, (newVal) => {
    if(newVal) {
      productSku.value = newVal.product.productSkus.find(productSku => productSku.id == newVal.productSkuId);
    }
  }, { immediate: true })

  function useFallback(event) {
    if (!fallbackUsed.value) {
      fallbackUsed.value = true
      event.target.src = constant.DEFAULT_PRODUCT_IMAGE
    }
  }

  function formatCurrency(number) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(number)
  }

  const imageUrl = computed(() => {
    const ids = cartItem.value?.product.imageIds
    if (!ids || !ids.length) return ''
    return `http://localhost:5000/api/files?id=${ids[0]}`
  })
</script>


<template>
    <Dialog class="dialog" v-model:visible="visible" modal header="Product Detail" :style="{ width: '70vw' }" 
     :breakpoints="{ '575px': '90vw' }">
      <ProductDetail :productId="productId"/>
  </Dialog>
</template>

<script>
import Dialog from 'primevue/dialog';
import ProductDetail from '../../views/ProductDetail.vue';

export default{
    components: {
        Dialog, ProductDetail
    },
    props:{
        productId: {default: null}
    },
    data(){
        return{
            visible: false
        }
    },
    methods:{
        show(){
            console.log('ok')
            this.visible = true
        }
    }
}
</script>

<template>
  <div>
    <Toast/>
    <Navbar/>
    <router-view :key="$route.fullPath" class="mb-4"/>
    <Footer/>
      <ProductComparison />
  </div>
</template>

<script>
import Footer from './components/Footer.vue'
import Navbar from './components/Navbar.vue';
import ProductComparison from './components/ProductComparison.vue';
import Toast from "primevue/toast";
import createToast from "./components/toast";
import { nextTick, provide, onMounted, ref, getCurrentInstance } from 'vue';

export default{
  components:{
    Navbar,
    Footer,
    ProductComparison,
    Toast
  },
  setup(){
    const { appContext } = getCurrentInstance();

    const toast = appContext.config.globalProperties.$toast;
    const showToast = createToast(toast);

    onMounted(()=>{
        //  provide("dialog", {
        //     Alert: alert.value,
        //     Confirmation: confirmation.value,
        //  })

         provide("showToast", showToast)
      })

      return{showToast}
  },
  mounted(){
    nextTick(()=>{
      // this.$registerGlobal("dialog", dialog);
      const showToast = createToast(this.$toast);
      this.$registerGlobal("showToast", showToast);

    })
  }
}
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

</style>


<template>
  <div>
    <Navbar/>
    <router-view :key="$route.fullPath" />
    <Footer/>

    
      <ProductComparison />
  </div>
</template>

<script>
import Footer from './components/Footer.vue'
import Navbar from './components/Navbar.vue';
import ProductComparison from './components/ProductComparison.vue';
export default{
  components:{
    Navbar,
    Footer,
    ProductComparison,
  },
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

import { createRouter, createWebHistory } from 'vue-router'
import constant from '../constant/constant'
import Home from '../views/Home.vue'
import Assembly from '../views/Assembly.vue'
// import ListProducts from '../views/ListProducts.vue'
import ProductDetail from '../views/ProductDetail.vue'
import Portofolio from '../views/Portofolio.vue'
import ContactUs from '../views/ContactUs.vue'
import ProductList from '../views/ProductList.vue'
import Cart from '../views/Cart.vue'
import Checkout from '../views/Checkout.vue'
import Order from '../views/Order.vue'
import About from '../views/About.vue'
import FAQ from '../views/FAQ.vue'
import TermsAndConditions from '../views/TermsAndConditions.vue'
import PolicyAndPrivacy from '../views/PolicyAndPrivacy.vue'


let routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About},
  { path: '/rakit-pc', name: 'Rakit PC', component: Assembly },
  { path: '/product/:menu', name: 'Produk', component: ProductList },
  { path: '/product-detail/:name', name: 'Detail Produk', component: ProductDetail },
  { path: '/cart', name: 'Keranjang', component: Cart },
  { path: '/cart/checkout', name: 'Checkout', component: Checkout },
  { path: '/order', name: 'Order', component: Order },
  { path: '/order/:code', name: 'Order Detail', component: Order },
  
  // static
  { path: '/portofolio', name: 'Portofolio', component: Portofolio},
  { path: '/contact-us', name: 'Contact Us', component: ContactUs },
  { path: '/faq', name: 'FAQ', component: FAQ},
  { path: '/terms-and-conditions', name: 'TermsAndConditions', component: TermsAndConditions},
  { path: '/policy-and-privacy', name: 'PolicyAndPrivacy', component: PolicyAndPrivacy},

]

// var menus = extractPaths(constant.menus)
// menus.forEach(menu => {
//   routes.push(
//     { 
//       path: menu.path.startsWith('/') ? menu.path : `/${menu.path}`, 
//       name: menu.name, 
//       component: ProductList, 
//       meta: {
//         menu: menu
//       }})
// });

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }; // ini otomatis scroll ke atas
  }
})


function extractPaths(data) {
  let paths = []

  data.forEach(item => {
    if (item.path) paths.push(item)
    if (item.items) {
      paths.push(...extractPaths(item.items))
    }
  })

  return paths
}

export default router

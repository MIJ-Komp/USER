<template>
    <div class="product-container card border-0 shadow-sm" @click.prevent="detail(product.id)" @mouseover="product.hover = true" @mouseleave.pre="product.hover = false">
        <img
            :class="product.hover ? 'blur' : ''"
            class="card-img-top"
            :src="imageUrl || defaultImage"
            @error="useFallback"
            />
        <div class="btn-add-cart" v-if="product.hover" @click.stop.prevent="addToCart" >+ Add to Cart</div>
        <div class="btn-detail" v-if="product.hover" @click.stop.prevent="detail(product.id)">View Detail</div>

        <div class="card-body">

            <div class="fs-5 fw-semibold font-title">{{ product.name }}</div>
            <div v-if="minPrice == maxPrice">{{ formatCurrency(minPrice) }}</div>
            <div v-else>{{ formatCurrency(minPrice) }} - {{ formatCurrency(maxPrice) }}</div>
             <button class="btn btn-warning btn-sm px-4" @click.stop.prevent="compare" :disabled="isAlreadyCompared">
                <i class="fas fa-exchange-alt"/>
                <span class="ms-2">{{ isAlreadyCompared ? 'Dibandingkan' : 'Bandingkan' }}</span>
            </button>
        </div>
    </div>
</template>

<script>
import { useCompareProductStore } from '../store/compareProductStore';
import { useCartStore } from '../store/cartStore';

export default{
    props:{
        product:{
            required: true,
            default: ()=>{}
        }
    },
    data() {
        return {
            fallbackUsed: false,
            minPrice: 0,
            maxPrice: 0,
            compareProductStore: null,
            cartStore: null,
        }
    },
    watch: {
        product: {
            handler(newProduct) {
                const prices = newProduct.productSkus.map(item => item.price);
                this.minPrice = Math.min(...prices);
                this.maxPrice = Math.max(...prices);
            },
            immediate: true,
            deep: false
        }
    },
    computed: {
        imageUrl() {
            const ids = this.product?.imageIds
            if (!ids || !ids.length) return ''
            return `http://localhost:5000/api/files?id=${ids[0]}`
        },
        defaultImage() {
            return '/images/image-dummy.png'
        },
        isAlreadyCompared() {
            return this.compareProductStore.items?.some(p => p.id === this.product.id)
        }
    },
    methods:{
        compare(){
            this.compareProductStore.addItem(this.product)
        },
        addToCart() {
            this.cartStore.addItem(this.product)
        },
        useFallback(event) {
            if (!this.fallbackUsed) {
                this.fallbackUsed = true;
                event.target.src = this.defaultImage;
            }
        },
        addCart(product){
            var currentCarts = localStorage.getItem("carts")
            if(currentCarts){
                currentCarts = JSON.parse(currentCarts)
            } 
            else{
                currentCarts = []
            }
            var isExist = currentCarts.find(data=> data.id == product.id)
            if(isExist){
                isExist.stock += 1 
            }else{
                product.stock = 1
                currentCarts.push(product)
            }
            localStorage.setItem("carts", JSON.stringify(currentCarts))
        },
        detail(id){
            this.$router.push(`/product/${id}`);
        },
        formatCurrency(number) {
            return new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    minimumFractionDigits: 0
                }).format(number);
            },
    },
    created() {
        this.compareProductStore = useCompareProductStore()
        this.cart = useCartStore()
    }
}
</script>
<style>
.product-container img{
    width: 100%;
}
.product-container{
    cursor: pointer;
    justify-items: center;
    text-align: center;
    position: relative;
    box-shadow: 0px 0px 30px 1px rgba(0,0,0,0.05);
    border-radius: 8px;
    position: relative;
}
.product-container:hover{
    box-shadow: 0px 0px 30px 1px#ffce4280;
}

.btn-compare{
    background: #cfa635;
    padding: 4px 16px;
    border-radius: 8px;
    margin-top: 8px;
    color: white;
}
.btn-compare:hover{
    background: #ffce42;
}
.product-container .image{

    position: relative;
}
.blur{
    filter: blur(5px); 
}

.product-container .btn-add-cart, .product-container .btn-detail{
    position: absolute;
    font-size: 12px;
    width: 150px;
    height: 30px;
    align-self: center;
    background: var(--gold);
    font-weight: 600;
    opacity: 80%;
    align-content: center;
    border-radius: 12px;
}

.product-container .btn-add-cart{
    top: calc(15% + 30px);
    left: calc(50% - 75px);
}
.product-container .btn-detail{
    top: calc(15% + 70px);
    left: calc(50% - 75px);
}
.product-container .btn-add-cart:hover, .product-container .btn-detail:hover{
    opacity: 100%;
}



</style>
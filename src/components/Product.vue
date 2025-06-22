<template>
    <div class="product-container" @click.prevent="detail(product.id)" @mouseover="product.hover = true" @mouseleave.pre="product.hover = false">
        <img :class="product.hover? 'blur':''" class="image mb-3" :src="product.image">
        </img>
        <div class="btn-add-cart" v-if="product.hover" @click.stop.prevent="addCart()" >+ Add to Cart</div>
        <div class="btn-detail" v-if="product.hover" @click.stop.prevent="detail(product.id)">View Detail</div>

        <div class="title">{{ product.name }}</div>
        <div v-if="product.price">{{ formatCurrency(product.price) }}</div>
        <div v-else>{{ formatCurrency(product.priceStart) }} - {{ formatCurrency(product.priceEnd) }}</div>
        <div class="btn-compare" @click.stop.prevent="compare()"><i class="fas fa-exchange-alt me-2" style="font-size: 12px;"/>Compare</div>
    </div>
</template>
<script>
export default{
    props:{
        product:{
            required: true,
            default: ()=>{}
        }
    },
    methods:{
        compare(){

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
                isExist.quantity += 1 
            }else{
                product.quantity = 1
                currentCarts.push(product)
            }
            localStorage.setItem("carts", JSON.stringify(currentCarts))
        },
        detail(id){
            setTimeout(() => {
                // this.$router.replace(`/${url}`);
                window.open(`/product/${id}`);
            }, 50);
        },
        formatCurrency(number) {
            return new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    minimumFractionDigits: 0
                }).format(number);
            },
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
    padding: 12px;
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
    max-width: 400px;
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
<template>
  <Carousel v-bind="carouselConfig" class="slide-show-container">
    <Slide v-for="slide in slides" :key="slide" :style="slide.path? `cursor: pointer;`:''"
    @click="goto(slide.path)">        
      <div class="carousel__item">
        <img :src="slide.img" class="img-normal"/>
        <img :src="slide.imgMini|| slide.img" class="img-mini"/>
        <div v-if="slide.description" class="img-normal slide-show-description">{{ slide.description }}</div>
    </div>
    </Slide>

    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>
<script>
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import slides from '../../public/images/slideshow/slideshow'

export default{
    components:{
        Carousel, Slide, Pagination, Navigation,
    },
    data(){
        return{
            slides,
            carouselConfig: {
                itemsToShow: 1,
                gap: 1,
                autoplay: 5000,
                wrapAround: true,
                pauseAutoplayOnHover: true,
            }
        }
    },
    methods:{
        goto(path){
            if(!path) return

            setTimeout(() => {
                window.open(path);
            }, 50);
        }
    },
    mounted(){
        // console.log(slides)
    }
}
</script>
<style>
.slide-show-container{
    height: 70%;
    z-index: 0;
}
.slide-show-container img{
    width: 100vw;
}
.img-mini{
    display: none;
}
.carousel__next, .carousel__prev{
    background: #dedede80;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    color: black;
    font-size: 24px;
}
.slide-show-description{
    background-color: #00000080;
    color: white;
    position: absolute;
    bottom: 0;
    padding: 12px;
    text-align: justify;
    font-size: 14px;
}

@media screen and (max-width: 800px) {
    .slide-show-container{
        height: 68%;
    }
    .img-mini{
        display: block;
    }
    .img-normal{
        display: none;
    }
}
</style>
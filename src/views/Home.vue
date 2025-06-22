<template>
    <div>
        <SlideShow/>
        <div>
            <div class="different-section">
                <div class="home-title">
                    <h3>KENAPA</h3>
                    <h3>KAMI</h3>
                    <h3 class="color-gold">Berbeda</h3>
                </div>
                <div class="diff-items">
                    <div class="diff-item-container">
                        <img class="diff-icon"/>
                        <div class="diff-label">10% original & bergaransi resmi Indonesia</div>
                    </div>
                    <div class="diff-item-container">
                        <img class="diff-icon" src="../assets//home-icon/bios.png"/>
                        <div class="diff-label">Bios, Firmware & Drive terbaru</div>
                    </div>
                    <div class="diff-item-container">
                        <img class="diff-icon" src="../assets//home-icon/free.png"/>
                        <div class="diff-label">Free jasa rakit</div>
                    </div>
                    <div class="diff-item-container">
                        <img class="diff-icon" src="../assets//home-icon/manajemen.png"/>
                        <div class="diff-label">Manajemen kabel rapi & profesional</div>
                    </div>
                    <div class="diff-item-container">
                        <img class="diff-icon" src="../assets//home-icon/pengujian.png"/>
                        <div class="diff-label">Pengujian Intensif (System Stress Test) sebelum pengiriman barang</div>
                    </div>
                    <div class="diff-item-container">
                        <img class="diff-icon" src="../assets//home-icon/free-pengantaran.png"/>
                        <div class="diff-label">Free pengantaran untuk daerah Medan sekitarnya</div>
                    </div>
                    <div class="diff-item-container">
                        <img class="diff-icon" src="../assets//home-icon/siap-kirim.png"/>
                        <div class="diff-label">Siap kitim ke seluruh Indonesia</div>
                    </div>
                    <div class="diff-item-container">
                        <img class="diff-icon" src="../assets//home-icon/layanan-purna.png"/>
                        <div class="diff-label">Layanan purna jual yang sanagat memuaskan</div>
                    </div>
                </div>
                <div>

                </div>
            </div>

            <div class="assembly-section">
                <div class="home-title">
                    <h3 class="color-black">rakitan </h3>
                    <h3 class="color-black">pc</h3>
                    <h3 class="color-gold">berkualitas</h3>
                </div>
                <div class="assembly-items">
                    <div class="assembly-item-container">
                        <div class="title">MIJ BASIC</div>
                        <img class="assembly-icon" src="../assets/home-icon/mij-basic.webp"/>
                        <div @click="goto('mij-basic')" class="assembly-shop-button">SHOP NOW <i class="fas fa-long-arrow-alt-right"/></div>
                        <div class="find-more">What this?</div>
                    </div>
                    <div class="assembly-item-container">
                        <div class="title">MIJ PRIME</div>
                        <img class="assembly-icon" src="../assets/home-icon/mij-prime.webp"/>
                        <div @click="goto('mij-prime')" class="assembly-shop-button">SHOP NOW <i class="fas fa-long-arrow-alt-right"/></div>
                        <div class="find-more">What this?</div>
                    </div>
                    <div class="assembly-item-container">
                        <div class="title">MIJ CORE</div>
                        <img class="assembly-icon" src="../assets/home-icon/mij-core.webp"/>
                        <div @click="goto('mij-core')" class="assembly-shop-button">SHOP NOW <i class="fas fa-long-arrow-alt-right"/></div>
                        <div class="find-more">What this?</div>
                    </div>
                    <div class="assembly-item-container">
                        <div class="title">MIJ VEIL</div>
                        <img class="assembly-icon" src="../assets/home-icon/mij-veil.webp"/>
                        <div @click="goto('mij-veil')" class="assembly-shop-button">SHOP NOW <i class="fas fa-long-arrow-alt-right"/></div>
                        <div class="find-more">What this?</div>
                    </div>
                    <div class="assembly-item-container">
                        <div class="title">MIJ ESSENCE</div>
                        <img class="assembly-icon" src="../assets/home-icon/mij-essence.webp"/>
                        <div @click="goto('mij-essence')" class="assembly-shop-button">SHOP NOW <i class="fas fa-long-arrow-alt-right"/></div>
                        <div class="find-more">What this?</div>
                    </div>
                    <div class="assembly-item-container">
                        <div class="title">MIJ CRUX</div>
                        <img class="assembly-icon" src="../assets/home-icon/mij-crux.webp"/>
                        <div @click="goto('mij-ccrux')" class="assembly-shop-button">SHOP NOW <i class="fas fa-long-arrow-alt-right"/></div>
                        <div class="find-more">What this?</div>
                    </div>
                    <div class="assembly-item-container">
                        <div class="title">MIJ MIST</div>
                        <img class="assembly-icon" src="../assets/home-icon/mij-mist.webp"/>
                        <div @click="goto('mij-mist')" class="assembly-shop-button">SHOP NOW <i class="fas fa-long-arrow-alt-right"/></div>
                        <div class="find-more">What this?</div>
                    </div>
                    <div class="assembly-item-container">
                        <div class="title">MIJ SLEEK</div>
                        <img class="assembly-icon" src="../assets/home-icon/mij-sleek.webp"/>
                        <div @click="goto('mij-sleek')" class="assembly-shop-button">SHOP NOW <i class="fas fa-long-arrow-alt-right"/></div>
                        <div class="find-more">What this?</div>
                    </div>
                </div>
            </div>
            <div class="special-section">
                <div class="home-title">
                    <h3>special </h3>
                    <h3 class="color-gold">series</h3>
                </div>
                <div class="assembly-items">
                    <Product style="color: white;" v-for="product in products" :product="product"/>
                </div>
            </div>

            <div style="margin-top: 64px;">
                <div class="image-right-container">
                    <div class="content">
                        <h3>PC RAKITAN KHAS DARI KAMU</h3>
                        <div>Pilih dari koleksi PC rakitan siap pakai racikan MIJ KOMP! Setiap unit telah dirakit dengan teliti, diuji secara menyeluruh, dan siap dikirim. Tingkatkan pengalaman komputasi Anda dengan performa terbaik dari konfigurasi PC unggulan kami, dirancang untuk memenuhi berbagai kebutuhan Anda.</div>
                        <button class="shop-now-button">SHOP NOW <i class="ms-2 fas fa-long-arrow-alt-right"/></button>
                    </div>
                    <img class="content" src="../assets/home-icon/rakitan-khas.jpg">
                </div>
                <div class="image-left-container">
                    <img class="content" src="../assets/home-icon/kunjungi-mij-komp.jpg">
                    <div class="content">
                        <h3>KUNJUNGI MIJ KOMP</h3>
                        <div>MIJ KOMP adalah tempatnya. Dengan bantuan tim ahli kami, Anda bisa melihat dan membandingkan berbagai komponen secara langsung untuk membuat keputusan yang paling tepat. Datanglah ke MIJ KOMP dan lihat langsung bagaimana PC impian Anda dirakit. Dengan transparansi dan keterampilan tinggi, kami pastikan Anda puas dengan setiap langkahnya.</div>
                        <button class="shop-now-button">VISIT US<i class="ms-2 fas fa-long-arrow-alt-right"/></button>
                    </div>
                </div>
                <div class="image-right-container">
                    <div class="content">
                        <h3>KABEL RAPI, KINERJA MAKSIMAL</h3>
                        <div>MIJ KOMP menawarkan solusi kabel manajemen yang rapi dan profesional. Dengan pengalaman dan keahlian kami, kami siap membantu Anda mengorganisir kabel-kabel dengan cara yang paling efisien dan estetis.</div>
                        <button class="shop-now-button">Contact Us <i class="fas fa-long-arrow-alt-right"/></button>
                    </div>
                    <img class="content" src="../assets/home-icon/kinerja-maksimal.jpg">
                </div>
            </div>

            <div class="portofolio">

            </div>
        </div>
    </div>
</template>

<script>
import SlideShow from '../components/SlideShow.vue'
export default{
    components:{SlideShow},
    data(){
        return{
            products:[
                {
                    name: 'MIJ BASIC',
                    image: '/images/image-dummy.png',
                    id: 1,
                    priceStart: 6000000,
                    priceEnd: 7000000,
                }
            ]
        }
    },
    methods:{
        goto(url){
            this.$router.replace({ path: `/${url}`});
        }
    },
     mounted(){
        for(let index = 1; index < 8; index++) {
            this.products.push({
                    name: 'MIJ BASIC',
                    image: '/images/image-dummy.png',
                    id: index + 1,
                    price: 7000000,
                })
        }
    }
}
</script>

<style>
.shop-now-button{
    border-radius: 8px;
    background: #14263e;
    color: #f9ae00!important;
    font-weight: 600;
    border: 2px solid #14263e;
    padding: 8px 26px;
    margin-top: 20px;
    align-self: center;
}
.shop-now-button:hover{
    background: white;
    color: #14263e !important;
}
.image-right-container, .image-left-container{
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
}
.image-right-container .content, .image-left-container .content{
    width: 48%;
    padding: 24px;
    text-align: justify;
}
.content h3{
    font-size: 34px !important;
    font-weight: 600 !important;
    color: #162B47 !important;
}
.home-title{
    text-transform: uppercase;
    color: #FFFFFF !important;
    text-align: center;
    display: flex;
    justify-content: center;
    margin: 47px;
    flex-wrap: wrap;
    gap: 12px;
}
h3{
    font-size: 47px !important;
    margin: 0px !important;
    font-family: 'Barlow Condensed', Helvetica, Arial, Lucida, sans-serif !important;
    font-weight: 600 !important;
}
.different-section, .special-section{
    background: #14263f!important;
    padding: 32px
}
.diff-icon{
    width: 80%;
}
.diff-items{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(22%, 1fr));
    row-gap: 40px;
    column-gap: 40px;
    padding: 16px;
    justify-content: center;
    place-items: center;
}
.diff-label{
    color: white;
    font-family: 'Titillium Web', Helvetica, Arial, Lucida, sans-serif;
    font-size: 13px;
    line-height: 1.2em;
    margin-top: 12px;
    text-align: center;
}
.assembly-item-container .title{
    color: #162B47 !important;
     font-family: 'Barlow Condensed', Helvetica, Arial, Lucida, sans-serif !important;
    font-weight: 600 !important;
    text-transform: uppercase !important;
    font-size: 30px !important;
}
.diff-item-container{
    justify-items: center;
    width: 50%;
    align-self: center;
}

.assembly-section{
    background: white !important;
    padding: 32px
}
.assembly-items{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(22%, 1fr));
    row-gap: 40px;
    column-gap: 20px;
    padding: 16px;
    justify-content: center; 
}
.assembly-icon{
    width: 100%;
}
.assembly-item-container{
    justify-items: center;
    text-align: center;
    position: relative;
    box-shadow: 0px 0px 30px 1px rgba(0,0,0,0.1);
    border-radius: 8px;
    padding: 12px;
}
.assembly-item-container .find-more{
    position: absolute;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: rgb(241 165 15 / 77%);
    cursor: zoom-in;
    display: flex;
    flex-direction: column;
    color: white;
    justify-content: center;
    font-weight: 500;
    top: calc(50% - 30px);
    left: calc(50% - 30px);
    box-shadow: 0px 0px 30px 5px rgba(0,0,0,0.27);
    border: 1px solid white
}
.assembly-item-container .find-more:hover{
    background-color: rgba(51,60,69,0.66);
    color: #f9ae00;
}

.assembly-shop-button{
    border-radius: 8px;
    color: #f9ae00;
    border: 1px solid #14263e;
    font-size: 16px;
    font-family: 'PT Sans', Helvetica, Arial, Lucida, sans-serif !important;
    font-weight: 700 !important;
    text-transform: uppercase !important;
    background-color: #14263e;
    width: 80%;
    padding: 12px;
    cursor: pointer;
}
.assembly-shop-button:hover{
    color: #14263e;
    background: white;
    border: 1px solid #14263e;
}

@media screen and (max-width: 800px) {
    .image-right-container{
        flex-direction: column-reverse;
    }
    .image-left-container{
        flex-direction: column;
    }
    .image-right-container .content, .image-left-container .content{
        width: 100%;
    }
    .assembly-section{
        padding: 16px 4px;
    }
    .assembly-items{
        grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
    }
    .diff-items{
        grid-template-columns: repeat(auto-fit, minmax(25%, 1fr));
        gap: 24px;
        padding: 8px;
    }
    .different-section{
        padding: 8px;
    }
    .diff-item-container{
        width: 80%;
    }
    .assembly-item-container{
        padding: 4px;
    }
    .assembly-item-container .title{
        font-size: 20px !important;
    }
    .assembly-shop-button, .find-more{
        padding: 8px !important;
        font-size: 12px;
    }
    .home-title{
        gap: 8px;
        margin: 24px;
    }
    h3{
        font-size: 32px;
    }
}
</style>
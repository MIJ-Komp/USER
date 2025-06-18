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
                        <div class="assembly-shop-button">SHOP NOW <i class="fas fa-long-arrow-alt-right"/></div>
                        <div class="find-more">What this?</div>
                    </div>
                    <div class="assembly-item-container">
                        <div class="title">MIJ PRIME</div>
                        <img class="assembly-icon" src="../assets/home-icon/mij-prime.webp"/>
                        <div class="assembly-shop-button">SHOP NOW <i class="fas fa-long-arrow-alt-right"/></div>
                        <div class="find-more">What this?</div>
                    </div>
                    <div class="assembly-item-container">
                        <div class="title">MIJ CORE</div>
                        <img class="assembly-icon" src="../assets/home-icon/mij-core.webp"/>
                        <div class="assembly-shop-button">SHOP NOW <i class="fas fa-long-arrow-alt-right"/></div>
                        <div class="find-more">What this?</div>
                    </div>
                    <div class="assembly-item-container">
                        <div class="title">MIJ VEIL</div>
                        <img class="assembly-icon" src="../assets/home-icon/mij-veil.webp"/>
                        <div class="assembly-shop-button">SHOP NOW <i class="fas fa-long-arrow-alt-right"/></div>
                        <div class="find-more">What this?</div>
                    </div>
                    <div class="assembly-item-container">
                        <div class="title">MIJ ESSENCE</div>
                        <img class="assembly-icon" src="../assets/home-icon/mij-essence.webp"/>
                        <div class="assembly-shop-button">SHOP NOW <i class="fas fa-long-arrow-alt-right"/></div>
                        <div class="find-more">What this?</div>
                    </div>
                    <div class="assembly-item-container">
                        <div class="title">MIJ CRUX</div>
                        <img class="assembly-icon" src="../assets/home-icon/mij-crux.webp"/>
                        <div class="assembly-shop-button">SHOP NOW <i class="fas fa-long-arrow-alt-right"/></div>
                        <div class="find-more">What this?</div>
                    </div>
                    <div class="assembly-item-container">
                        <div class="title">MIJ MIST</div>
                        <img class="assembly-icon" src="../assets/home-icon/mij-mist.webp"/>
                        <div class="assembly-shop-button">SHOP NOW <i class="fas fa-long-arrow-alt-right"/></div>
                        <div class="find-more">What this?</div>
                    </div>
                    <div class="assembly-item-container">
                        <div class="title">MIJ SLEEK</div>
                        <img class="assembly-icon" src="../assets/home-icon/mij-sleek.webp"/>
                        <div class="assembly-shop-button">SHOP NOW <i class="fas fa-long-arrow-alt-right"/></div>
                        <div class="find-more">What this?</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SlideShow from '../components/SlideShow.vue'
export default{
    components:{SlideShow}
}
</script>

<style>
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
    font-size: 47px;
    margin: 0px;
    font-family: 'Barlow Condensed', Helvetica, Arial, Lucida, sans-serif;
    font-weight: 600;
}
.different-section{
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
    column-gap: 20px;
    padding: 16px;
}
.diff-label{
    color: white;
    font-family: 'Titillium Web', Helvetica, Arial, Lucida, sans-serif;
    font-size: 13px;
    line-height: 1.2em;
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
}

.assembly-section{
    background: white !important;
    padding: 32px
}
.assembly-items{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(32%, 1fr));
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
</style>
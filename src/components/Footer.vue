<template>
<div class="container">
    <div class="footer-card">
        <b-row>
            <b-col lg="4" md="4" cols="12" class="mb-2">
                <div class="card-item">
                    <div>Metode Pengantaran</div>
                    <div class="">
                        <img src="/images/shipping/sicepat.png" height="25"/>
                        <img src="/images/shipping/jne.png" height="25"/>
                        <img src="/images/shipping/anteraja.png" height="25"/>
                    </div>
                </div>
            </b-col>
            <b-col lg="4" md="4" cols="12" class="mb-2">
                <div class="card-item">
                <b-row style="align-items: center;">
                    <b-col cols="4" class="p-0">
                        <img src="/images/bank/xendit_logo.svg"/>
                    </b-col>
                    <b-col cols="8">
                            <div>Secure Online Payments & Bank Transfer</div>
                            <div class="footer-bank-grid">
                                <img height="15" src="/images/bank/mandiri-bank.png"/>
                                <img height="15" src="/images/bank/bni-bank.png"/>
                                <img height="15" src="/images/bank/permata-bank.png"/>
                                <img height="15" src="/images/bank/visa.png"/>
                                <img height="15" src="/images/bank/jcb-bank.png"/>
                            </div>
                    </b-col>
                </b-row>
                </div>
            </b-col>
            <b-col lg="4" md="4" cols="12" class="mb-2">
                <div class="card-item">
                <b-row style="align-items: center;">
                    <b-col cols="3" class="pr-0">
                        <img src="/images/bank/free-ongkir.png" height="35"/>
                    </b-col>
                    <b-col cols="9">
                        <h3 class="m-0" style="font-size: 14px !important; font-weight: 600; color: #00000090;">GRATIS ONGKIR</h3>
                        <div style="line-height: 12px; font-weight: 400; font-size: 12px;">daerah Medan, Binjai, Deli Serdang sekitarnya</div>
                    </b-col>
                </b-row>
                </div>
            </b-col>
        </b-row>
    </div>
    <div>
        <b-row>
            <b-col lg="4" cols="12" class="mt-3">
                <img src="/images/logo-mij-komp-landscape.png"/>
                <div class="mt-3">Jl. Pajang No. 8-B</div>
                <div>Medan, Sumatera Utara, Indonesia 20214</div>
                <b-row class="mt-3">
                    <b-col cols="6">
                        <a style="text-decoration: none;" href="tel:+628116181628"><i class="fa fa-phone me-2" style="color: black !important;"/>+628 11618 1628</a>
                    </b-col>
                    <b-col cols="6">
                        <a style="text-decoration: none;" href="https://goo.gl/maps/1HozbTotkCKgpFaj6" target="_blank"> <i class="me-2 fa fa-map-marker" style="color: black !important;"/>Our Google Map</a>
                    </b-col>
                </b-row>
            </b-col>
            <b-col lg="2" cols="6" class="mt-3">
                <h5>Tentang Kami</h5>

                <div class="mt-3 nav-footer">
                    <a href="/about-us">Tentang Kami</a>
                    <a href="/about-us">Portofolio</a>
                    <a href="/about-us">Blog</a>
                    <a href="/about-us">Hubungi Kami</a>
                    <a href="/about-us">FAQ</a>
                </div>
            </b-col>
            <b-col lg="2" cols="6" class="mt-3">
                <h5>Katalog Produk</h5>
                <div class="mt-3 nav-footer">
                    <a href="/about-us">Semua Produk</a>
                    <a href="/about-us">Special Series</a>
                    <a href="/about-us">Desktop PC</a>
                    <a href="/about-us">Komponen PC</a>
                    <a href="/about-us">Laptop</a>
                </div>
            </b-col>
            <b-col lg="2" cols="6" class="mt-3">
                <h5>Bantuan Pelanggan</h5>
                <div class="mt-3 nav-footer">
                    <a href="/about-us">Cek Resi</a>
                    <a href="/about-us">Lacak Pesanan</a>
                    <a href="/about-us">Konfirmasi Pembayaran</a>
                    <a href="/about-us">Syarat dan Ketentuan</a>
                    <a href="/about-us">Kebijakan dan Privasi</a>
                </div>
            </b-col>
            <b-col lg="2" cols="6" class="mt-3">
                <h5>Info Pelanggan</h5>
                <div class="mt-3 nav-footer">
                    <!-- <a href="/about-us">Akun Saya</a> -->
                    <a href="/about-us">Pesanan Saya</a>
                    <a href="/about-us">Keranjang Belanja</a>
                    <a href="/about-us">Checkout</a>
                </div>
            </b-col>
        </b-row>
    </div>
    <div class="social-media-container">
        <div style="background: #ea2c59;">
            <a href="https://www.instagram.com/mijkomp/" title="Follow on Instagram" target="_blank"><i class="fa-brands fa-instagram"></i></a>
        </div>
        <div style="background: black;">
            <a href="https://www.tiktok.com/@mijkomp" title="Follow on Instagram" target="_blank"><i class="fa-brands fa-tiktok"></i></a>
        </div>
        <div style="background: #3b5998;">
            <a href="https://www.facebook.com/mijkomp" title="Follow on Instagram" target="_blank"><i class="fa-brands fa-facebook"></i></a>
        </div>
        <div style="background: red;">
            <a href="https://www.youtube.com/@mijkomp" title="Follow on Instagram" target="_blank"><i class="fa-brands fa-youtube"></i></a>
        </div>
    </div>
    <div class="pt-4 mt-4" style="font-size: 12px; border-top: 1px solid #dedede;">
        Copyright © {{ getYear() }} MIJ KOMP. All rights Reserved.
    </div>
</div>
</template>
<script>
    import moment from 'moment';

    export default{
        data(){
            return{
            }
        },
        methods:{
            getYear(){
                return moment().format("yyyy")
            }
        }
    }
</script>
<style>
.social-media-container{
    text-decoration: none;
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 30px;
    gap: 12px;
}
.social-media-container div{
    height: 30px;
    width: 30px;
    border-radius: 50%;
    align-content: center;
    text-align: center;
}
.social-media-container a{
    color: white;
    font-size: 18px;
}
.footer-info{
    padding: 60px 20px;
    background-image: linear-gradient(180deg, #f5f5f5 24%, #ffffff 59%) !important;
}
.footer-container{
    padding: 32px 12px;
}
.footer-card{
    border-top: 2px solid #afafaf;
    padding: 60px 12px;
    border-bottom: 1px solid #dedede;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 32px;
}

.card-item{
    border: 1px solid #dedede;
    border-left: 5px solid #afafaf;
    padding: 8px 24px;
    height: 100%;
    align-content: center;
}
.footer-shipping-grid{
    display: grid;
    gap: 12px;
    align-items: center;
    grid-template-columns: repeat(auto-fit, 60px);
}
.footer-bank-grid{
    display: grid;
    gap: 12px;
    align-items: center;
    grid-template-columns: repeat(auto-fit, minmax(14%, 1fr));
}
h5{
    font-size: 16px !important;
}
.nav-footer{
    display: flex;
    flex-direction: column;
    gap: 4px;
}
.nav-footer a{
    text-decoration: none;
    color: #00000090;
    font-weight: 500;
    font-size: 14px;
    width: fit-content;
}
.nav-footer a:hover{
    color: black;
}

</style>
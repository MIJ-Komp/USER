<template>
    <div class="product-detail-container">
        <div class="header">
            <div style="text-align: center; font-weight: 600; font-size: 18px;">PRODUK</div>
            <div class="flex-row mt-2 mb-2" style="justify-content: center; gap: 12px;">
                    <div class="dot"></div>
                    <div v-for="menu in currentMenu">{{ menu.label }}</div>
                    <div class="dot"></div>
            </div>
            <div class="flex-row" style="gap: 12px; width: 100%; justify-content: space-between;">
                <div class="line-container">
                    <div class="line"></div>
                    <div class="dot"></div>
                </div>
                <div class="product-name">
                    ASUS TUF BTF / i7-14700K / RTX 4070 Ti SUPER / PC GAMING DESAIN
                </div>
                <div class="line-container">
                    <div class="dot"></div>
                    <div class="line"></div>
                </div>
            </div>
        </div>
        <div>
            <div class="top-section">
                <div class="p-3 product-image-container">
                    <img class="product-image" src="/images/product-detail-dummy.png"/>
                </div>
                <div class="product-info" >
                    <div style="border-bottom: 1px solid #dedede;">
                        <div class="mb-4" v-if="product,price">Rp {{ parseRupiah(product.price.toString()) }}</div>
                        <table v-if="product?.items" style="width: 100%;">
                            <thead style="width: 100%;">
                                <tr style="width: 100%;">
                                    <td style="width: 50px;">Qty</td>
                                    <td>Item</td>
                                    <td style="width: 50px;">Guarantee</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in product.items">
                                    <td>{{ item.quantity }}</td>
                                    <td>{{ item.name }}</td>
                                    <td>{{ item.guarantee }}</td>
                                </tr>
                            </tbody>
                        </table>
                        <button class="add-cart-button">ADD TO CART <i class="fa fa-shopping-cart"/></button>
                    </div>
                    <div class="flex-row">
                        <div>Tags :</div>
                        <div class="flex-row ms-2">
                            <a style="color: #2ea3f2; text-decoration: none;" class="ms-2" v-for="tag in product.tags" :href="`/${tag}`">{{ tag }}, </a>
                        </div>
                    </div>
                    <div class="flex-row">
                        <div>Brands :</div>
                        <div class="flex-row ms-2">
                            <a style="color: #2ea3f2; text-decoration: none;" class="ms-2" v-for="brand in product.brands" :href="`/${brand}`">{{ brand }}, </a>
                        </div>
                    </div>
                </div>
                <div class="add-info">
                    <div class="section">
                        <img src="../assets/products/free-ongkir.png"/>
                        <div style="font-weight: 600;" class="mb-2">GRATIS ONGKIR</div>
                        <span style="font-size: 12px;">daerah Medan, Binjai, Deli Serdang dan sekitarnya</span>
                        <img src="../assets/products/fast-delivery.png" style="width: 50px;"/>
                    </div>
                    <div class="section">
                        <img src="../assets/products/xendit_logo.svg">
                        <div style="font-size: 14px; font-weight: 600;">Scure Online Payment and Bank Transfer</div>
                        <div class="bank-list">
                            <img src="../assets/products/bni-bank.png">
                            <img src="../assets/products/mandiri-bank.png">
                            <img src="../assets/products/permata-bank.png">
                            <img src="../assets/products/jcb-bank.png">
                        </div>
                    </div>
                </div>
            </div>
            <div class="down-section mt-4">
                <TabView class="TabView">
                    <TabPanel header="Deskripsi">
                        <div class="p-3" v-html="product.description" style="overflow: auto;"></div>
                    </TabPanel>
                    <TabPanel header="Spesifikasi">
                        <div class="p-3" style="overflow: auto;">
                            <table class="woocommerce-product-attributes shop_attributes" aria-label="Product Details">
			                <tbody>
                                <tr class="woocommerce-product-attributes-item woocommerce-product-attributes-item--weight">
                                        <th class="woocommerce-product-attributes-item__label" scope="row">Weight</th>
                                        <td class="woocommerce-product-attributes-item__value" data-o_content="16 kg">16 kg</td>
                                    </tr>
                                        <tr class="woocommerce-product-attributes-item woocommerce-product-attributes-item--attribute_pa_cpu">
                                        <th class="woocommerce-product-attributes-item__label" scope="row">CPU</th>
                                        <td class="woocommerce-product-attributes-item__value"><p><a href="https://mijkomp.id/cpu/amd-ryzen-3-4100/" rel="tag">AMD RYZEN 3 4100</a></p>
                            </td>
                                    </tr>
                                        <tr class="woocommerce-product-attributes-item woocommerce-product-attributes-item--attribute_pa_mb">
                                        <th class="woocommerce-product-attributes-item__label" scope="row">MB</th>
                                        <td class="woocommerce-product-attributes-item__value"><p><a href="https://mijkomp.id/mb/h610m/" rel="tag">H610M</a></p>
                            </td>
                                    </tr>
                                        <tr class="woocommerce-product-attributes-item woocommerce-product-attributes-item--attribute_pa_ram">
                                        <th class="woocommerce-product-attributes-item__label" scope="row">RAM Module</th>
                                        <td class="woocommerce-product-attributes-item__value"><p><a href="https://mijkomp.id/ram/ddr4/" rel="tag">DDR4</a></p>
                            </td>
                                    </tr>
                                        <tr class="woocommerce-product-attributes-item woocommerce-product-attributes-item--attribute_pa_vga">
                                        <th class="woocommerce-product-attributes-item__label" scope="row">VGA</th>
                                        <td class="woocommerce-product-attributes-item__value"><p><a href="https://mijkomp.id/vga/rtx-3050-6gb/" rel="tag">RTX 3050 6GB</a></p>
                            </td>
                                    </tr>
                                        <tr class="woocommerce-product-attributes-item woocommerce-product-attributes-item--attribute_pa_case">
                                        <th class="woocommerce-product-attributes-item__label" scope="row">CASE</th>
                                        <td class="woocommerce-product-attributes-item__value"><p><a href="https://mijkomp.id/case/micro-atx/" rel="tag">Micro-ATX</a></p>
                            </td>
                                    </tr>
                                        <tr class="woocommerce-product-attributes-item woocommerce-product-attributes-item--attribute_pa_storage">
                                        <th class="woocommerce-product-attributes-item__label" scope="row">Storage</th>
                                        <td class="woocommerce-product-attributes-item__value"><p><a href="https://mijkomp.id/storage/ssd-nvme/" rel="tag">SSD NVMe</a></p>
                            </td>
                                    </tr>
                                        <tr class="woocommerce-product-attributes-item woocommerce-product-attributes-item--attribute_pa_wireless">
                                        <th class="woocommerce-product-attributes-item__label" scope="row">Wireless</th>
                                        <td class="woocommerce-product-attributes-item__value"><p>N/A</p>
                            </td>
                                    </tr>
                                </tbody></table>
                        </div>
                    </TabPanel>
                    <TabPanel header="Penting! Baca Info Shipping">
                        <p>Disni adalah informasi penting tentang Pengantaran Barang</p>
                    </TabPanel>
                </TabView>
            </div>
            <div>

            </div>
            <div>
                <div class="mt-3 mb-3">Related Products</div>
                <div class="products-container">
                    <div class="related-products-items">
                        <Product v-for="product in relatedProducts" :product="product"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';

import noUiSlider from 'nouislider'
import Product from '../components/Product.vue';
export default{
    components:{
        Product, TabPanel, TabView
    },
    data(){
        return{
            product:{},
            relatedProducts:[],
            filter:{
                priceRange:[0, 100000000],
                sort:{
                    label: 'Urutkan',
                },
                cpu:{
                    label: 'CPU',
                    module:'cpu',
                    isMultipleSelect: true
                },
                vga:{
                    label: 'VGA',
                    module:'vga',
                    isMultipleSelect: true
                },
                stockStatus:{
                    label: 'Stock status',
                    options:[
                        {label:'In Stock'},
                        {label:'Out of Stock'},
                    ]
                },
                onSale:{
                }
            },
        }
    },
    methods:{
        parseRupiah(rpString) {
            if(!rpString) return 0;
            return parseInt(rpString.replace(/[^\d]/g, '')) || 0
        },
    },
    mounted(){
        if(this.$route.meta.product){
            this.product = JSON.parse(JSON.stringify(this.$route.meta.product))
        }
        else{
            this.product = {
                    name: 'MIJ BASIC',
                    image: '/images/image-dummy.png',
                    id: 1,
                    priceStart: 6000000,
                    priceEnd: 7000000,
                    price: 7000000,
                    items:[
                        {name: "CPU INTEL CORE i7-12700F BOX", quantity: 1, guarantee: "1THN"},
                        {name: "MB ASUS PRIME B660M-A WIFI D4", quantity: 1, guarantee: "1THN"},
                        {name: "Ini hanyalah data dummy", quantity: 1, guarantee: "2THN"},
                        {name: "Ini hanyalah data dummy", quantity: 1, guarantee: "Limited lifetime"},
                        {name: "Ini hanyalah data dummy", quantity: 1, guarantee: "5THN"},
                        {name: "Ini hanyalah data dummy", quantity: 1, guarantee: "2THN"},
                    ],
                    tags:['Intel Core', 'Nvdia GeForce', 'PC Desain', 'PC Editing', 'PC Gaming'],
                    brands:['INTEL'],
                    description:
                    `<div class="et_pb_tab_content">
						<h5>VARIAN HITAM</h5>
                        <table width="563">
                        <thead>
                            <tr>
                                <td width="36">QTY</td>
                                <td width="409">PRODUK</td>
                                <td width="118">GARANSI</td>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                        <td>1</td>
                        <td>CPU AMD Ryzen 3 4100 Box</td>
                        <td>3THN</td>
                        </tr>
                        <tr>
                        <td>1</td>
                        <td>MB ASROCK A520M-HVS</td>
                        <td>3THN</td>
                        </tr>
                        <tr>
                        <td>1</td>
                        <td>RAM Adata XPG Gammix D35 DDR4 16GB (2X8GB) 3200MHz Black</td>
                        <td>Limited Lifetime</td>
                        </tr>
                        <tr>
                        <td>1</td>
                        <td>VGA GALAX GeForce RTX 3050 6GB EX GDDR6</td>
                        <td>3THN</td>
                        </tr>
                        <tr>
                        <td>1</td>
                        <td>SSD M.2 NVMe ADATA LEGEND 710 512GB PCIe 3 x4 2280</td>
                        <td>3THN</td>
                        </tr>
                        <tr>
                        <td>1</td>
                        <td>PSU PCCOOLER KF550 550W 80 PLUS</td>
                        <td>3THN</td>
                        </tr>
                        <tr>
                        <td>1</td>
                        <td>CASE PCCOOLER C3-B310 Black MATX - INCLD 4 FAN</td>
                        <td>N/A</td>
                        </tr>
                        <tr>
                        <td>1</td>
                        <td>OS Windows 11 Pro Trial</td>
                        <td>N/A</td>
                        </tr>
                        </tbody>
                        </table>
                        <h5 class="mt-3">VARIAN PUTIH</h5>
                        <table width="563">
                        <thead>
                            <tr>
                                <td width="36">QTY</td>
                                <td width="409">PRODUK</td>
                                <td width="118">GARANSI</td>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                        <td>1</td>
                        <td>CPU AMD Ryzen 3 4100 Box</td>
                        <td>3THN</td>
                        </tr>
                        <tr>
                        <td>1</td>
                        <td>MB ASROCK A520M-HVS</td>
                        <td>3THN</td>
                        </tr>
                        <tr>
                        <td>1</td>
                        <td>RAM Adata XPG Gammix D35 DDR4 16GB (2X8GB) 3200MHz White</td>
                        <td>Limited Lifetime</td>
                        </tr>
                        <tr>
                        <td>1</td>
                        <td>VGA GALAX GeForce RTX 3050 6GB EX GDDR6</td>
                        <td>3THN</td>
                        </tr>
                        <tr>
                        <td>1</td>
                        <td>SSD M.2 NVMe ADATA LEGEND 710 512GB PCIe 3 x4 2280</td>
                        <td>3THN</td>
                        </tr>
                        <tr>
                        <td>1</td>
                        <td>PSU PCCOOLER KF550 550W 80 PLUS</td>
                        <td>3THN</td>
                        </tr>
                        <tr>
                        <td>1</td>
                        <td>CASE PCCOOLER C3-B310 White MATX - INCLD 4 FAN</td>
                        <td>N/A</td>
                        </tr>
                        <tr>
                        <td>1</td>
                        <td>OS Windows 11 Pro Trial</td>
                        <td>N/A</td>
                        </tr>
                        </tbody>
                        </table>
                        <ul class="mt-3 ms-4">
                        <li>Mohon hubungi admin untuk penambahan kapasitas RAM &amp; SSD/HDD</li>
                        <li>Semua Part/Komponen 100% Baru, Original, dan bergaransi Resmi</li>
                        <li>Garansi Toko 1 Tahun</li>
                        <li>Mohon tanyakan stok terlebih dahulu sebelum order</li>
                        <li>Spesifikasi produk dapat berubah sewaktu-waktu tetapi tidak mengurangi nilai dari produk tersebut</li>
                        <li>Siap kirim ke seluruh Indonesia</li>
                        <li>Harap konfirmasi jika barang sudah di terima</li>
                        <li>PC sudah dirakit dan tinggal pakai</li>
                        <li>VGA/Graphic Card akan kami lepas untuk pengiriman via Expedisi</li>
                        <li>Mohon simpan dus/kotak dan nota pembelian untuk keperluan garansi</li>
                        </ul>
					</div>`
            }
        }

        for(let index = 1; index < 20; index++) {
            this.relatedProducts.push({
                    name: 'MIJ BASIC',
                    image: '/images/image-dummy.png',
                    id: index + 1,
                    priceStart: 6000000,
                    priceEnd: 7000000,
                })
        }
    }
}
</script>

<style>
.list-product-container{
    display: flex;
    justify-content: space-between;
}

.list-product-content{
    height: calc(98vh - 50px);
    overflow: auto;
    width: 100%;
}

.product-image{
    width: 100%;
    height: auto;
}
.product-image-container{
    width: 35%;
}
.product-info{
    width: calc(56% - 115px);
}
.top-section{
    display: flex;
    justify-content: space-between;
}
.add-info{
    width: 115px;
    display: flex;
    flex-direction: column;
    gap: 16px;
}
.add-info .section{
    border: 2px solid #dedede;
    border-left: 4px solid var(--gold);
    padding: 12px;
    text-align: center;
    justify-items: center;
    gap: 16px;
}
.product-detail-container{
    padding: 40px;
}
.product-detail-container .header{
    margin-bottom: 20px;
}
.add-cart-button{
    padding: 12px;
    border-radius: 8px;
    background: var(--gold);
    font-weight: 600;
    margin: 20px 0;
    width: 100%;
}
.add-cart-button:hover{
    box-shadow: 0px 4px 5px 0px rgba(0,0,0,0.2);
}

table {
  border-collapse: collapse;
  min-width: 350px;
  max-width: 100%;
  width: fit-content;
}
thead tr td{
    background: #dedede;
}
th, td {
  border: 1px solid #ccc;
  padding: 4px;
  text-align: left;
}
ul {
  list-style-type: circle;
}

.TabView{
    border: 2px solid #dedede;
}

.related-products-items{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(22%, 1fr));
    row-gap: 40px;
    column-gap: 20px;
    justify-content: center; 
    height: 400px;
    overflow: auto;
}
.list-product-content{
    height: calc(98vh - 50px);
    overflow: auto;
    width: 100%;
}
.bank-list{
    margin-top: 12px;
    gap: 10px;
    display: grid;
    width: 100%;
    grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
}

.line-container{
    width: 20%;
    display: flex;
    align-items: center;
    position: relative;
}
.line{
    width: 100%;
    height: 2px;
    background: #00000070;
}
.dot{
    height: 8px;
    width: 8px;
    background: black;
    border-radius: 50%;
}
.product-name{
    width: 50%;
    text-align: center;
    font-weight: 700;
    font-size: 40px;
    line-height: 38px;
    color: #14263e!important;
    font-family: 'Barlow Condensed', Helvetica, Arial, Lucida, sans-serif;
}
@media (max-width: 600px) {
  th, td {
    white-space: nowrap;
  }
}

@media (max-width: 850px) {
    .bank-list{
        grid-template-columns: repeat(auto-fit, minmax(20%, 1fr));
    }
    .top-section{
        flex-direction: column;
        gap: 20px;
    }
    .product-image-container, .product-info, .add-info{
        width: 100%;
    }
    .product-detail-container{
        padding: 16px;
    }
    .add-info .section{
        display: flex;
        gap: 12px;
        flex-flow: wrap;
    }
    .add-info .section img{
        width: auto;
        max-height: 40px;
    }
    .related-products-items{
        grid-template-columns: repeat(auto-fit, minmax(45%, 1fr));
    }
    .line-container{
        width: 10%;
    }
    .product-name{
        width: 70%;
        font-size: 24px;
        line-height: 24px;
    }
}

</style>
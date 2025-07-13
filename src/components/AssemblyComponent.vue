<template>
    <div class="border-1 border p-2 mb-2 rounded shadow-sm">
        <div class="fs-5 fw-medium header-component" :class="(Array.isArray(modelValue)? modelValue.length > 0 : modelValue )?'filled': ''" @click="$emit('toggleShow')">
            <div>Pilih {{ label }} <i v-if="(Array.isArray(modelValue)? modelValue.length > 0 : modelValue )" class="fa-circle-check text-success fa-solid"/></div>
            <i class="fa" :class="show? 'fa-angle-up': 'fa-angle-down'"/>
        </div>
        <div class="body-component" :class="show? 'show': ''">
            <TextBox v-model="keyword" class="border rounded" placeholder="Cari komponen..." :required="false"/>
            <div v-if="compatibleComponent.length <=0" class="text-center w-100 my-3">Tidak ada produk yang tersedia</div>

            <div class="component-container my-3">
                 <div style="position: relative; height: fit-content;" v-for="component in compatibleComponent">
                 <div v-show="selectedComponent(component.id)" class="flag-selected">Dipilih</div>
                 <div @click="viewDetail(component.id)" class="see-detail">Detail</div>
                <div @click="selectComponent(component)" :class="selectedComponent(component.id)? 'selected': ''" class="component-item border shadow-sm rounded">
                   
                    <div>
                        <img
                            class="card-img-top"
                            :src="component.imageIds && component.imageIds.length> 0 ?
                            `http://localhost:5000/api/files?id=${component.imageIds[0]}`
                            : constant.DEFAULT_PRODUCT_IMAGE"
                            @error="useFallback"
                        />
                        <div class="fw-bold fs-6">{{ component.name }}</div>
                        <div class="fw-bold color-gold fs-5 stroke-green">{{ component.priceLabel }}</div>
                        <div class="">{{ component.brand?.name }}</div>
                        <div class="" v-html="component.description"></div>
                        <div class="" v-for="(spec, index) in component.productSkus[0]?.componentSpecs">
                                                            {{($getSpecName(spec.specKey))}} : <span class="fw-bold">{{ component.productSkus
                                                                .map(sku => sku.componentSpecs[index].specValue)
                                                                .filter(v => v !== undefined)
                                                                .join(', ') }}</span></div>
                                            
                    </div>
                </div>
            </div>
            </div>
        </div>
        <ProductDetailModal :productId="selectedProductId" ref="productDetailModal"/>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import module from '../constant/module';
import constant from '../constant/constant';
import helper from '../constant/helper'
import ProductDetailModal from './modal/ProductDetailModal.vue';
export default{
    props:{
        selectedProduct:{default: ()=>[]},
        componentCode:{default: ''},
        label:{default: ()=>[]},
        allProducts:{default: ()=>[]},
        compatibleRules:{default: ()=>[]},
        show:{default: false},
        modelValue: {
         type: [String, Number, Array],
         required: false,
         default: null,
        },
    },
    data(){
        return{
            constant,
            currentRules: null,
            hasLoaded: false,
            keyword: null,
            selectedProductId: null
        }
    },
    watch:{
    },
    mounted(){
            // const rules = this.compatibleRules.filter(data=>
            //     data.sourceComponentTypeCode.toLowerCase() == this.componentCode.toLowerCase() ||
            //     data.targetComponentTypeCode.toLowerCase() == this.componentCode.toLowerCase()
            // )
            // const grouped = {};

            // rules.forEach(rule => {
            //     const sourceKey = rule.sourceComponentTypeCode.toLowerCase();

            //     if (!grouped[sourceKey]) {
            //         grouped[sourceKey] = [];
            //     }

            //     grouped[sourceKey].push({
            //         id: rule.id,
            //         targetComponentTypeCode: rule.targetComponentTypeCode,
            //         sourceKey: rule.sourceKey,
            //         targetKey: rule.targetKey,
            //         condition: rule.condition
            //     });
            // });

            // this.currentRules = grouped
            this.hasLoaded = true
    },
    computed:{
        compatibleComponent(){
            if(!this.hasLoaded) return []

            var products = this.allProducts.filter(data=>
                data.componentType && data.componentType.code.toLowerCase() == this.componentCode.toLowerCase()
                && (!this.keyword || this.keyword.trim().length <= 0 || data.name.toLowerCase().includes(this.keyword.toLowerCase()))// && !this.selectedProduct[this.componentCode]
            )
            .map(data=> {
                if(!data.productSkus || data.productSkus.length <=0) return data

                const prices = data.productSkus.sort((a, b) => a.price - b.price);


                return Object.assign(data, {
                    specs: data.productSkus.flatMap(sku => sku.componentSpecs || []),
                    priceLabel: data.productSkus.length <= 1 ? 
                    `Rp ${helper.ConvertNumberFormat(data.productSkus[0].price, 0)}` :
                    `Rp ${helper.ConvertNumberFormat(prices[0].price, 0)} s/d  ${helper.ConvertNumberFormat(prices[prices.length - 1].price, 0)}`
                })
            })
            products = products.filter(data=> this.isCompatible(data, this.selectedProduct, this.componentCode.toLowerCase()))
            return products
        },
        
    },
    methods:{
        viewDetail(id){
            this.selectedProductId = id

            this.$refs['productDetailModal'].show();
        },
        selectedComponent(id){
            if(Array.isArray(this.modelValue)){
                return this.modelValue.findIndex(data=> data?.productId == id) >= 0
            }
            else{
                return this.modelValue?.productId == id
            }
        },
        getComponentFromForm(form, type) {
            if (!form || !type) return null;
            const value = form[type.toLowerCase()];
            if (Array.isArray(value)) return value[0]; // pakai yang pertama
            return value;
        },

        isCompatible(candidateComp, form, rules, componentType) {
            var compatible = true 
            var selectedComponents = []
            
            Object.keys(form).forEach(code => {
                if(code != componentType && code != 'totalUnit'){
                    if(Array.isArray(form[code])){
                        form[code].forEach(data => {
                            selectedComponents.push(
                                this.allProducts.find(p=> p.id == data.productId)
                            )
                        });
                    }
                    else if(form[code]){
                      selectedComponents.push(this.allProducts.find(p=> p.id == form[code]?.productId))  
                    }
                }
            });
            if(selectedComponents.length <= 0) return true

            selectedComponents.forEach(product => {
                const rules = this.compatibleRules.filter(data=>
                    (data.sourceComponentTypeCode.toLowerCase() == product?.componentType?.code.toLowerCase() && data.targetComponentTypeCode.toLowerCase() == this.componentCode.toLowerCase())
                 || (data.sourceComponentTypeCode.toLowerCase() == this.componentCode.toLowerCase() && data.targetComponentTypeCode.toLowerCase() == product?.componentType?.code.toLowerCase())
                )

                for (let index = 0; index < rules.length; index++) {
                    const rule = rules[index];

                    if(rule.sourceComponentTypeCode.toLowerCase() == this.componentCode.toLowerCase()){
                        compatible = this.evaluateRuleFromSource(rule, candidateComp, product)
                    }
                    else{
                        compatible = this.evaluateRuleFromSource(rule, product, candidateComp)
                    }
                }
            });
            // console.log(selectedComponents)
            // // rules[componentType].filter()

            // console.log(rules)
            // const relatedRules = rules[componentType] || [];
            // for (const rule of relatedRules) {
            //     const targetComp = this.getComponentFromForm(form, rule.targetComponentTypeCode);
            //     if (!targetComp) continue; // skip kalau belum dipilih
            //     const result = this.evaluateRuleFromSource(rule, candidateComp, targetComp);
            //     if (!result.fulfilled) return false;
            // }
            return compatible;
        },

        evaluateRuleFromSource(rule, sourceComp, targetComp) {
            const aVal = sourceComp?.productSkus.flatMap(sku => sku.componentSpecs || []).find(s=> s.specKey == rule.sourceKey)?.specValue;
            const bVal = targetComp?.productSkus.flatMap(sku => sku.componentSpecs || []).find(s=> s.specKey == rule.targetKey)?.specValue;
            let fulfilled = false;

            switch (rule.condition) {
                case 'equals':
                fulfilled = aVal === bVal;
                break;
                case 'min':
                fulfilled = typeof aVal === 'number' && typeof bVal === 'number' && bVal >= aVal;
                break;
                case 'max':
                fulfilled = typeof aVal === 'number' && typeof bVal === 'number' && bVal <= aVal;
                break;
                case 'includes':
                fulfilled = !aVal ? false : aVal.split(',').map(s => s.trim()).includes(bVal);
                break;
                case 'one_of':
                fulfilled = !bVal ? false : bVal.split(',').map(s => s.trim()).includes(aVal);
                break;
                default:
                fulfilled = false;
            }
            console.log(`hasil = ${fulfilled}, aVal = ${aVal}, bVal = ${bVal}, condition = ${rule.condition} , rule = ${JSON.stringify(rule)}\------------------`)

            return fulfilled;
        },

        selectComponent(component){
            const productSkuId = component.productSkus.length == 1 ? component.productSkus[0]?.id 
                                : null //panggil modal select variant

            var temp = JSON.parse(JSON.stringify(this.modelValue))

            if(Array.isArray(temp)){
                var exist = temp.findIndex(data=> data.id == component.id)
                if(exist >= 0){
                     temp.splice(exist, 1);
                }
                else{
                    temp.push({
                        productId: component.id,
                        productSkuId : productSkuId,
                        qty: 1
                    })
                }
                this.$emit("update:modelValue", temp);
            }
            else{
                this.$emit("update:modelValue", this.modelValue && component.id == this.modelValue?.productId ? null: {
                   productId: component.id,
                   productSkuId : productSkuId,
                });
            }
        },
        ...mapActions(module.product.name, ["getAll"]),

    }
}
</script>
<style>

.header-component{
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: center;
    margin: -8px;
    padding: 8px;
    margin-bottom: 8px;
    cursor: pointer;
    background: var(--yellow-100);
}
.header-component.filled{
    background: var(--gold);
}
.component-container{
    display: grid;
    gap: 12px;
    padding-top: 20px;
    grid-template-columns: repeat(auto-fit, calc(50% - 7px));
    max-height: 400px;
    overflow: auto;
}
.body-component{
    transform: scaleY(0);
    transform-origin: top;
    transition: all 0.3s ease;
    height: 0;
    opacity: 0;
}
.body-component.show {
  transform: scaleY(1);
  opacity: 1;
  height: auto;
}
.component-item{
    padding: 12px;
    cursor: pointer;
    position: relative;
    font-size: 12px;
    max-height: 240px;
    min-height: 240px;
    overflow: hidden;
    
    box-shadow: inset 0 -6px 7px -6px rgba(0, 0, 0, 0.5) !important
}
.component-item:hover{
    border-color: var(--gold) !important;
}

.flag-selected{
    background: var(--gold);
    text-align: center;
    font-size: 14px;
    align-content: center;
    border-radius: 12px;
    position: absolute;
    top: -11px;
    left: calc(50% - 40px);
    height: 22px;
    width: 80px;
    font-weight: bold;
    z-index: 1;
}
.see-detail{
    background: var(--gold);
    text-align: center;
    font-size: 14px;
    border-radius: 12px;
    position: absolute;
    bottom: 4px;
    right: 4px;
    height: 22px;
    align-content: center;
    width: 80px;
    z-index: 1;
    font-weight: bold;
    cursor: pointer;
}
.see-detail:hover{
    background: var(--yellow-300);
}
.component-container .selected{
    border-color: var(--gold) !important;
    border-width: 2px !important;
    /* box-shadow: 0px 0px 30px 1px rgba(0,0,0,0.1) !important; */
    /* box-shadow: inset 0 -6px 7px -6px rgba(0, 0, 0, 0.5) !important */
}
.component-item img{
    height: 140px;
    width: auto;
    float: left;
    margin-right: 8px;
    margin-bottom: 4px;
}

@media screen and (max-width: 1100px) {
    .component-container{
        /* padding: 4px; */
        grid-template-columns: repeat(auto-fit, 100%);
    }
    .component-item{
        padding: 4px;
    }
    .component-item img{
        height: 232px;
        width: auto;
    }
}
@media screen and (max-width: 800px) {
    .component-container{
        grid-template-columns: repeat(auto-fit, 100%);
    }
    .component-item img{
        width: 40%;
        height: auto;
    }
    .see-detail{
        bottom: 12px;
        right: 12px;
    }
}

</style>
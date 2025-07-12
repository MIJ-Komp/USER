<template>
    <div class="border-1 border p-2 mb-2 rounded shadow-sm">
        <div class="fs-5 fw-medium header-component" :class="(Array.isArray(modelValue)? modelValue.length > 0 : modelValue )?'filled': ''" @click="$emit('toggleShow')">
            <div>Pilih {{ label }} <i v-if="(Array.isArray(modelValue)? modelValue.length > 0 : modelValue )" class="fa-circle-check text-success fa-solid"/></div>
            <i class="fa" :class="show? 'fa-angle-up': 'fa-angle-down'"/>
        </div>
        <div class="body-component" :class="show? 'show': ''">
            <div v-if="compatibleComponent.length <=0" class="text-center w-100 my-3">Tidak ada produk yang tersedia</div>
            <TextBox v-else class="border rounded" placeholder="Cari komponen..." :required="false"/>
            <div class="component-container my-3">
                 <div style="position: relative; height: fit-content;" v-for="component in compatibleComponent">
                 <div v-show="selectedComponent(component.id)" class="flag-selected">Dipilih</div>
                    <div class="see-detail">Detail</div>
                <div @click="selectComponent(component.id)" :class="selectedComponent(component.id)? 'selected': ''" class="component-item border shadow-sm rounded">
                   
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
                        <div class="" v-for="(spec, index) in component.productSkus[0]?.componentSpecs">
                                                            {{(spec.specKey)}} : {{ component.productSkus
                                                                .map(sku => sku.componentSpecs[index].specValue)
                                                                .filter(v => v !== undefined)
                                                                .join(', ') }}</div>
                        <div class="" v-html="component.description"></div>
                                            
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import module from '../constant/module';
import constant from '../constant/constant';
import helper from '../constant/helper'
export default{
    props:{
        selectedProduct:{default: ()=>[]},
        componentCode:{default: ''},
        label:{default: ()=>[]},
        allProducts:{default: ()=>[]},
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
            // products:[],
        }
    },
    watch:{
    },
    async mounted(){
        // this.products = await this.getAll()
    },
    computed:{
        compatibleComponent(){
            console.log(this.componentCode)
            var products = this.allProducts.filter(data=>
                data.componentType && data.componentType.code.toLowerCase() == this.componentCode.toLowerCase()
                // && !this.selectedProduct[this.componentCode]
            )
            .map(data=> {
                if(!data.productSkus || data.productSkus.length <=0) return data

                const prices = data.productSkus.sort((a, b) => a.price - b.price);
                return Object.assign(data, {
                    priceLabel: data.productSkus.length <= 1 ? 
                    `Rp ${helper.ConvertNumberFormat(data.productSkus[0].price, 0)}` :
                    `Rp ${helper.ConvertNumberFormat(prices[0].price, 0)} s/d  ${helper.ConvertNumberFormat(prices[prices.length - 1].price, 0)}`
                })
            })
            return products
        },
        
    },
    methods:{
        selectedComponent(id){
            if(Array.isArray(this.modelValue)){
                return this.modelValue.findIndex(data=> data.id == id) >= 0
            }
            else{
                return this.modelValue == id
            }
        },
        evaluateRule(rule, compA, compB) {
            const aVal = compA?.specs?.[rule.specKey];
            const bVal = compB?.specs?.[rule.specKey];
            const customVal = rule.value;
            let fulfilled = false;

            const actual = bVal ?? customVal; // nilai B jika ada, atau gunakan default value
            const expected = aVal ?? customVal;

            switch (rule.condition) {
                case 'equals':
                fulfilled = aVal === actual;
                break;
                case 'min':
                fulfilled = actual >= expected;
                break;
                case 'max':
                fulfilled = actual <= expected;
                break;
                case 'includes':
                fulfilled = Array.isArray(expected) && expected.includes(actual);
                break;
                case 'one_of':
                fulfilled = Array.isArray(actual) && actual.includes(expected);
                break;
                default:
                fulfilled = false;
                break;
            }

            return {
                rule_id: rule.id || null,
                description: `${rule.componentType} → ${rule.componentTypeCode} : ${rule.specKey} ${rule.condition}`,
                fulfilled,
                expected,
                actual
            };
        },

        selectComponent(id){
            var temp = JSON.parse(JSON.stringify(this.modelValue))

            if(Array.isArray(temp)){
                var exist = temp.findIndex(data=> data.id == id)
                if(exist >= 0){
                     temp.splice(exist, 1);
                }
                else{
                    temp.push({
                        id: id,
                        quantity: 1
                    })
                }
                this.$emit("update:modelValue", temp);
            }
            else{
                this.$emit("update:modelValue", id == this.modelValue? null: id);
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
}
.component-container .selected{
    border-color: var(--gold) !important;
    border-width: 2px !important;
    box-shadow: 0px 0px 30px 1px rgba(0,0,0,0.1) !important;
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
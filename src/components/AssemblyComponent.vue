<template>
    <div class="component-section border p-3 mb-3 rounded shadow-sm" :class="{ 'expanded': show }">
        <div class="component-header" :class="{ 'selected': isSelected }" @click="$emit('toggleShow')">
            <div class="d-flex align-items-center gap-2">
                <span class="component-label">{{ label }}</span>
                <span v-if="isSelected" class="selected-badge">
                    <i class="fa-solid fa-check"></i>
                </span>
            </div>
            <i class="fa" :class="show ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
        </div>

        <div class="component-body" :class="{ 'show': show }">
            <div class="search-bar mb-3">
                <i class="fas fa-search search-icon"></i>
                <input 
                    v-model="keyword" 
                    type="text" 
                    class="search-input" 
                    placeholder="Cari komponen..."
                >
            </div>

            <div v-if="compatibleComponent.length <= 0" class="empty-state">
                <i class="fas fa-box-open mb-2"></i>
                <p>Tidak ada produk yang cocok atau tersedia</p>
            </div>

            <div class="component-grid" v-else>
                <div 
                    v-for="component in compatibleComponent" 
                    :key="component.id"
                    class="component-card"
                    :class="{ 'selected': selectedComponent(component.id) }"
                >
                    <div class="selected-indicator" v-if="selectedComponent(component.id)">
                        <i class="fas fa-check"></i>
                    </div>
                    
                    <div class="card-content">
                        <div class="image-container">
                            <img
                                :src="component.imageIds?.length > 0 
                                    ? `${constant.BASE_URL_API}/files?id=${component.imageIds[0]}` 
                                    : constant.DEFAULT_PRODUCT_IMAGE"
                                @error="useFallback"
                                alt="Product image"
                            >
                        </div>
                        
                        <div class="product-info">
                            <h5 class="product-name">{{ component.name }}</h5>
                            <div class="product-brand">{{ component.brand?.name }}</div>
                            <div class="product-price">{{ component.priceLabel }}</div>
                            <div class="product-description" v-html="component.description"></div>
                        </div>

                        <div class="card-actions">
                            <button class="action-btn select-btn" @click="selectComponent(component)">
                                {{ selectedComponent(component.id) ? 'Batal Pilih' : 'Pilih' }}
                            </button>
                            <button class="action-btn detail-btn" @click.stop="viewDetail(component.id)">
                                <i class="fas fa-info-circle"></i> Detail
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <ProductDetailModal :productId="selectedProductId" ref="productDetailModal"/>
        
    </div>
    <!-- Modal Pilih Varian -->
         <Dialog class="dialog" v-model:visible="showVariantModal" modal :header="`Pilih Varian ${selectedVariantProduct?.name}`" :style="{ width: '50vw' }" 
            :closable="true" :breakpoints="{ '1199px': '60vw', '575px': '90vw' }">
            <div @click.stop>
                    <div class="variant-list">
                        <div 
                            v-for="sku in selectedVariantProduct?.productSkus" 
                            :key="sku.id"
                            class="variant-item"
                            @click="selectVariant(sku)"
                        >
                            <div class="variant-info">
                                <h6 class="variant-name mb-1">{{ sku.name }}</h6>
                                <div class="variant-price">Rp {{ helper.ConvertNumberFormat(sku.price, 0) }}</div>
                            </div>
                            <div class="variant-stock" :class="{ 'out-of-stock': sku.stock <= 0 }">
                                {{ sku.stock > 0 ? 'Tersedia' : 'Stok Habis' }}
                            </div>
                        </div>
                </div>
            </div>
        </Dialog>
</template>
<script>
import { mapActions } from 'vuex';
import module from '../constant/module';
import constant from '../constant/constant';
import helper from '../constant/helper'
import ProductDetailModal from './modal/ProductDetailModal.vue';
import { Dialog } from 'primevue';

export default{
    components:{
        Dialog
    },
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
            helper,
            constant,
            currentRules: null,
            hasLoaded: false,
            keyword: null,
            selectedProductId: null,
            showVariantModal: false,
            selectedVariantProduct: null
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
                const minPrice = prices[0].price
                const maxPrice = prices[prices.length - 1].price


                return Object.assign(data, {
                    specs: data.productSkus.flatMap(sku => sku.componentSpecs || []),
                    priceLabel: minPrice == maxPrice ? 
                    `Rp ${helper.ConvertNumberFormat(minPrice, 0)}` :
                    `Rp ${helper.ConvertNumberFormat(minPrice, 0)} -  ${helper.ConvertNumberFormat(maxPrice, 0)}`
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
        selectComponent(component) {
            if (component.productSkus.length == 1 || this.selectedComponent(component.id)) {
                this.handleComponentSelection(component, component.productSkus[0].id)
            } else {
                this.selectedVariantProduct = component
                this.showVariantModal = true
            }
        },
        selectVariant(sku) {
            if (sku.stock <= 0) return
            this.handleComponentSelection(this.selectedVariantProduct, sku.id)
            this.closeVariantModal()
        },
        handleComponentSelection(component, skuId) {
            var temp = JSON.parse(JSON.stringify(this.modelValue))

            if (Array.isArray(temp)) {
                var exist = temp.findIndex(data => data.productId == component.id)
                if (exist >= 0) {
                    temp.splice(exist, 1)
                } else {
                    temp.push({
                        productId: component.id,
                        productSkuId: skuId,
                        qty: 1
                    })
                }
                this.$emit("update:modelValue", temp)
            } else {
                this.$emit("update:modelValue", this.modelValue && component.id == this.modelValue?.productId ? null : {
                    productId: component.id,
                    productSkuId: skuId,
                })
            }
        },
        closeVariantModal() {
            this.showVariantModal = false
            this.selectedVariantProduct = null
        },

        ...mapActions(module.product.name, ["getAll"]),

    }
}
</script>
<style scoped>
.variant-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.variant-modal-content {
    background: white;
    border-radius: 12px;
    width: 90%;
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
}

.variant-modal-header {
    padding: 1rem;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.variant-modal-body {
    padding: 1rem;
}

.variant-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.variant-item {
    padding: 1rem;
    border: 1px solid #eee;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s ease;
}

.variant-item:hover {
    border-color: var(--gold);
    background: #fff9e6;
}

.variant-name {
    font-weight: 600;
}

.variant-price {
    color: var(--gold);
    font-weight: 600;
}

.variant-stock {
    padding: 4px 12px;
    border-radius: 4px;
    background: #e8f5e9;
    color: #2e7d32;
    font-size: 0.9rem;
}

.variant-stock.out-of-stock {
    background: #ffebee;
    color: #c62828;
}

.btn-close {
    background: none;
    border: none;
    font-size: 1.25rem;
    color: #666;
    cursor: pointer;
    padding: 0.5rem;
    transition: transform 0.3s ease;
}

.btn-close:hover {
    transform: rotate(90deg);
    color: #333;
}

.component-section {
    background: #fff;
    transition: all 0.3s ease;
    height: 68px;
    overflow: hidden;
}

.component-section.expanded {
    height: fit-content;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.component-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    cursor: pointer;
    border-radius: 8px;
    background: var(--yellow-100);
    transition: all 0.3s ease;
}

.component-header:hover {
    background: var(--yellow-200);
}

.component-header.selected {
    background: var(--gold);
    color: #fff;
}

.component-label {
    font-size: 1.1rem;
    font-weight: 600;
}

.selected-badge {
    background: #fff;
    color: var(--gold);
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 0.8rem;
}

.search-bar {
    position: relative;
    margin-top: 1rem;
}

.search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #666;
}

.search-input {
    width: 100%;
    padding: 10px 10px 10px 35px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 0.9rem;
    transition: all 0.3s ease;
}

.search-input:focus {
    border-color: var(--gold);
    box-shadow: 0 0 0 2px rgba(var(--gold-rgb), 0.2);
}

.empty-state {
    text-align: center;
    padding: 2rem;
    color: #666;
}

.empty-state i {
    font-size: 2rem;
    color: #999;
}

.component-grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    margin-top: 1rem;
    max-height: 600px;
    overflow-y: auto;
    padding: 0.5rem;
}

.component-card {
    position: relative;
    border: 1px solid #ddd;
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.3s ease;
}

.component-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.component-card.selected {
    border-color: var(--gold);
    box-shadow: 0 0 0 2px rgba(var(--gold-rgb), 0.2);
}

.selected-indicator {
    position: absolute;
    top: 10px;
    right: 10px;
    background: var(--gold);
    color: white;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
}

.card-content {
    padding: 1rem;
}

.image-container {
    position: relative;
    padding-top: 75%;
    overflow: hidden;
    border-radius: 8px;
    background: #f8f9fa;
}

.image-container img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: transform 0.3s ease;
}

.component-card:hover .image-container img {
    transform: scale(1.05);
}

.product-info {
    margin-top: 1rem;
}

.product-name {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.product-brand {
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
}

.product-price {
    color: var(--gold);
    font-weight: 600;
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
}

.product-description {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 1rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.card-actions {
    display: flex;
    gap: 0.5rem;
}

.action-btn {
    flex: 1;
    padding: 8px 16px;
    border-radius: 6px;
    font-size: 0.9rem;
    font-weight: 500;
    transition: all 0.3s ease;
    border: 1px solid #dedede;
}

.select-btn {
    background: var(--gold);
    color: black;
}

.select-btn:hover {
    background: var(--yellow-400);
}

.detail-btn {
    background: #f8f9fa;
    color: #333;
}

.detail-btn:hover {
    background: #e9ecef;
}

@media (max-width: 768px) {
    .component-grid {
        grid-template-columns: 1fr;
    }

    .card-actions {
        flex-direction: column;
    }
}
</style>

.variant-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.variant-modal-content {
    background: white;
    border-radius: 12px;
    width: 90%;
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
}

.variant-modal-header {
    padding: 1rem;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.variant-modal-body {
    padding: 1rem;
}

.variant-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.variant-item {
    padding: 1rem;
    border: 1px solid #eee;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s ease;
}

.variant-item:hover {
    border-color: var(--gold);
    background: #fff9e6;
}

.variant-name {
    font-weight: 600;
}

.variant-price {
    color: var(--gold);
    font-weight: 600;
}

.variant-stock {
    padding: 4px 12px;
    border-radius: 4px;
    background: #e8f5e9;
    color: #2e7d32;
    font-size: 0.9rem;
}

.variant-stock.out-of-stock {
    background: #ffebee;
    color: #c62828;
}

.btn-close {
    background: none;
    border: none;
    font-size: 1.25rem;
    color: #666;
    cursor: pointer;
    padding: 0.5rem;
    transition: transform 0.3s ease;
}

.btn-close:hover {
    transform: rotate(90deg);
    color: #333;
}
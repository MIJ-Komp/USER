<template>
    <div class="border-1 border p-2 mb-2 rounded shadow-sm">
        <div class="fs-5 fw-medium header-component" :class="modelValue?'filled': ''" @click="$emit('toggleShow')">
            <div>Pilih {{ label }} <i v-if="modelValue" class="fa-circle-check text-success fa-solid"/></div>
            <i class="fa" :class="show? 'fa-angle-up': 'fa-angle-down'"/>
        </div>
        <div class="body-component" :class="show? 'show': ''">
            <TextBox class="border rounded" placeholder="Cari komponen..." :required="false"/>
            <div class="component-container my-3">
                <div @click="selectComponent(component.id)" :class="component.id == modelValue? 'selected': ''" class="component-item border shadow-sm rounded" v-for="component in compatibleComponent">
                    <div v-show="component.id == modelValue" class="flag-selected">Terpilih</div>
                    <div class="d-flex" style="gap: 4px;">
                        <img
                            class="card-img-top"
                            :src="component.imageIds && component.imageIds.length> 0 ?
                            `http://localhost:5000/api/files?id=${component.imageIds[0]}`
                            : constant.DEFAULT_PRODUCT_IMAGE"
                            @error="useFallback"
                        />
                        <div>
                            <div class="fw-bold">{{ component.name }}</div>
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
export default{
    props:{
        selectedComponent:{default: ()=>[]},
        label:{default: ()=>[]},
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
            products:[],
        }
    },
    watch:{
    },
    async mounted(){
        this.products = await this.getAll()
    },
    computed:{
        compatibleComponent(){
            return this.products.filter(data=>
                this.selectedComponent.length <=0
            )
        },
        
    },
    methods:{
        selectComponent(id){
            this.$emit("update:modelValue", id == this.modelValue? null: id);
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
    height: 400px;
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
}
.component-item:hover{
    border-color: var(--gold) !important;
}

.flag-selected{
    background: var(--gold);
    text-align: center;
    width: fit-content;
    font-size: 14px;
    border-radius: 12px;
    position: absolute;
    top: -11px;
    left: calc(50% - 40px);
    height: 22px;
    width: 80px;
    font-weight: bold;
}
.component-container .selected{
    border-color: var(--gold) !important;
    border-width: 2px !important;
    box-shadow: 0px 0px 30px 1px rgba(0,0,0,0.1) !important;
}
.component-item img{
    height: 80px;
    width: auto;
}
@media screen and (max-width: 800px) {
    .component-container{
        grid-template-columns: repeat(auto-fit, 100%);
    }
}
</style>
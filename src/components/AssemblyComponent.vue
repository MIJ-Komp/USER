<template>
    <div class="border-1 border p-2 mb-2 rounded shadow-sm">
        <div class="fs-5 fw-medium header-component">
            <div>Pilih {{ componentType }}</div>
            <i class="fa fa-angle-down"/>
        </div>
        <TextBox class="border rounded" placeholder="Cari komponen..." :required="false"/>
        <div class="component-container my-3">
            <div class="component-item border shadow-sm rounded" v-for="component in compatibleComponent">
                <img
                    class="card-img-top"
                    :src="component.imageIds && component.imageIds.length> 0 ?
                    `http://localhost:5000/api/files?id=${component.imageIds[0]}`
                    : constant.DEFAULT_PRODUCT_IMAGE"
                    @error="useFallback"
                />
                <div>{{ component.name }}</div>
                <div></div>
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
        componentType:{default: ()=>[]},
    },
    data(){
        return{
            constant,
            products:[]
        }
    },
    async mounted(){
        this.products = await this.getAll()
        console.log(this.product)
    },
    computed:{
        compatibleComponent(){
            return this.products.filter(data=>
                this.selectedComponent.length <=0
            )
        },
        
    },
    methods:{
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
    background: var(--gold);
    margin: -8px;
    padding: 8px;
    margin-bottom: 8px;
    cursor: pointer;
}
.component-container{
    display: grid;
    gap: 12px;
    grid-template-columns: repeat(auto-fit, 200px);
    height: 400px;
    overflow: auto;
}
.component-item{
    padding: 12px;
    cursor: pointer;
}
.component-item:hover{
    border-color: var(--gold) !important;
}
.component-item img{
    height: 140px;
    width: auto;
}
</style>
<template>
    <div class="basis">
        <p>搜索设置</p>
        <blankSeparator :blankColorStyle="blankSeparatorColorStyle" height="1px"/>
        <slider :valueCallback="itemCountChange" :range="countRange" :textWidth="200" :maxSliderWidth="350" :percentage="itemCountPercentage" text="最大显示搜索结果数量"/>
    </div>
</template>

<script>
import { useStore } from '@/store'
import { mapMutations } from 'vuex';
import blankSeparator from '@/components/basis/blankSeparator.vue'
import slider from '@/components/basis/SliderComponent.vue';
import { computed } from '@vue/reactivity';
export default{
    setup(){
        const store = useStore();
        return{
            pageState: computed(()=> store.state.isSettingPageShown),
            searchItemNumber: computed(()=> store.state.settings.searchItemCount)
        }
    },
    data(){
        return{
            blankSeparatorColorStyle:{
                backgroundColor:{
                    hex:"#000000",
                    alpha:1
                }
            },
            itemCountPercentage: this.searchItemNumber*100/8,
            countRange:{
                start: 1,
                end: 8,
                baseNum:this.searchItemNumber
            }
        }
    },
    methods:{
        ...mapMutations(['setSearchItemCount']),
        itemCountChange(newVal){
            this.setSearchItemCount(newVal)
            this.itemCountPercentage = newVal/8
        }
    },
    components:{
        blankSeparator,
        slider
    }
}
</script>

<style scoped>
.basis{
    background-color: transparent;
    margin: 0px;
    padding: 10px 30px 0px 30px;
    display: flex;
    flex-direction: column;
    max-height: 600px;
    min-height: 600px;
    width: 600px;
    overflow: hidden scroll;
}
</style>
<template>
    <!-- 用户界面，包括上传头像（点击头像上传）、修改用户名、登录密码、退出登录以及删除账号 -->
    <div>
        <modernButton :srcPath="userHeadImgPath" />
    </div>
</template>

<script>
import modernButton from '@/components/basis/modernButton.vue';
import { useStore } from '@/store'
import { EditPen } from '@element-plus/icons-vue';
import { computed } from '@vue/reactivity';
export default{
    data(){
        const store = useStore();
        return{
            userHeadImgPath: computed(()=>store.state.settings.avatar)
        }
    },
    components:{
        modernButton,
        EditPen
    }
}
</script>

<style>

</style>
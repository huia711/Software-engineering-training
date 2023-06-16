<template>
    <div class="basis">
        <p>请在登录后转至</p>
        <a :href="personalPageLink">个人页面</a>
    </div>
</template>

<script>
export default{
    props:{
        personalPageLink:{
            type:String,
            required:true
        }
    }
}
</script>

<style scoped>
.basis{
    background-color: transparent;
    margin: 0px;
    padding: 10px 30px 0px 30px;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: row;
    max-height: 600px;
    min-height: 600px;
    width: 600px;
    overflow: hidden scroll;
}
</style>
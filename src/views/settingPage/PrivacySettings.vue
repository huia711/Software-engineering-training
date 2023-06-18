<template>
    <div class="basis">
        <p>请在</p>
        <router-link to="/register" style="text-decoration: none;">
            <p>登录</p>
        </router-link>
        <p>后转至</p>
        <router-link to="/register" style="text-decoration: none;">
            <p>个人页面</p>
        </router-link>
    </div>
</template>

<script>
</script>

<style scoped>
.basis{
    background-color: transparent;
    margin: 0px;
    padding: 10px 30px 10px 30px;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: row;
    max-height: 600px;
    min-height: 600px;
    width: 600px;
    overflow: hidden;
}
</style>
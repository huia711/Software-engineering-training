<template>
    <div class="spinner"></div>
</template>

<script>
export default{
    props:{
        spinnerRadius:{
            type: String,
            default: "3rem"
        }
    }
}
</script>

<style scoped>
.spinner {
    /* Size */
    height: v-bind("spinnerRadius");
    width: v-bind("spinnerRadius");

    /* Create a curve at the top */
    border: 4px solid #d1d5db;
    border-top-color: #3b82f6;
    border-radius: 50%;

    animation: spinner 800ms linear infinite;
}

@keyframes spinner {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>
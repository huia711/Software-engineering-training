<template>
    <div class="imgBasis">
      <img class="imgStyle" :src="imageUrl" :alt="imageAlt" />
      <div class="imgDescription">
        <p style="font-size: large; word-spacing: 15px;">{{ imageDescription }}</p>
      </div>
    </div>
  </template>
  
<script>
export default {
props: {
    imageUrl: String,
    imageAlt: String,
    imageDescription: String
}
};
</script>

<style scoped>

.imgBasis{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 50px;
    border-radius: 15px;
    overflow: hidden;
    cursor: pointer;
}

.imgDescription{
    margin: 0px;
    padding: 0px;
    z-index: 1;
}

.imgStyle{
    width: 80px;
    height: 50px;
    margin: 0px;
    padding: 0px;
    display: flex;
    align-items: center;
    justify-content: center;

    transition: 0.3s linear;
}

.imgStyle:hover{
    transform: scale(1.25);
}

</style>
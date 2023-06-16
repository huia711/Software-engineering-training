<template>
    <div class="avatar">
        <button class="buttonStyle" @click="clicked" @mouseenter="buttonMouseOn" @mouseleave="buttonMouseLeave">
            <div>
                <img v-if="srcPath !== ''" class="avatar_img" :src="mouseOn === true ? onImgPath : srcPath" 
                @mouseenter="imgMouseOn(true)" 
                @mouseleave="imgMouseOn(false)"/>
            </div>
        {{ buttonText }}</button>
        
        <p v-if="textUnderButton !== ''" class="avatar_textUnderImage">{{ textUnderButton }}</p>
    </div>
    
</template>

<script>
export default{
    data(){
        return{
            mouseOn: false,
        }
    },
    methods:{
        clicked(){
            this.$emit("buttonClicked")
        },
        buttonMouseOn(){
            this.$emit("mouseOn")
        },
        buttonMouseLeave(){
            this.$emit("mouseLeave")
        },
        imgMouseOn(isMouseOn){
            if(this.onImgPath!=="")
                this.mouseOn = isMouseOn
        }
    },
    props:{
        srcPath:{
            type: String,
            default: ""
        },
        onImgPath:{
            type: String,
            default: ""
        },
        textUnderButton:{
            default: "",
            type: String
        },
        customButtonStyle: {
          type: Object,
          default: function () {
            return {
              backgroundColor: "transparent",
              width: "auto",
              height: "auto",
              borderColor: "black",
              borderRadius: "6px",
              cursor: "pointer",
              outlineColor: "transparent",
              fontSize: "12",
              wordSpacing: "10px",
              divHeight: "4rem"
            }
          }
        },
        buttonText:{
            type: String,
            default: ""
        }
    }
}
</script>

<style scoped>
.avatar {
    /* Rounded border */
    border-radius: 50%;

    /* Center the content */
    align-items: center;
    display: flex;
    justify-content: center;
    flex-direction: column;

    /* Size */
    height: v-bind("customButtonStyle.divHeight");
    width: auto;
}

.avatar_textUnderImage {
    margin: auto
}

.avatar_img {
    width: 100%;
    height: 100%;
    background-color: transparent;
}

.buttonStyle {
    background-color: v-bind("customButtonStyle.backgroundColor");
    width: v-bind("customButtonStyle.width");
    height: v-bind("customButtonStyle.height");
    border-color: v-bind("customButtonStyle.borderColor");
    border-radius: v-bind("customButtonStyle.borderRadius");
    cursor: v-bind("customButtonStyle.cursor");
    outline-color: v-bind("customButtonStyle.outlineColor");
    font-size: v-bind("customButtonStyle.fontSize");
    word-spacing: v-bind("customButtonStyle.wordSpacing");
    font-family: SmileySans,serif;
}
</style>
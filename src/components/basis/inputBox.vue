<template>
    <div :class="inputState === true ? 'focus' : 'notFocus'">
    <!-- Text input -->
        <input :type="passwordVisible === true ? 'text' : 'password'" 
        class="inputBox" :style="{width:finalWidth+'px'}" 
        @focusin="isInputEnable(true)" 
        @focusout="isInputEnable(false)" 
        v-model="inputData" />

        <!-- Toggle button sticks to the right -->
        <button v-if="visibleButton" class="toggle-password-visibility__toggle" 
        @mousedown="visibilityStateChanged(true)" 
        @mouseup="visibilityStateChanged(false)" 
        @mouseleave="visibilityStateChanged(false)"
        >...</button>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                inputState: false,
                inputData: this.defaultContent,
                passwordVisible: this.visibleButton !== true,
                finalWidth: this.widthExpand + (this.visibleButton===true?200:225)
            }
        },
        methods:{
            isInputEnable(state){
                this.inputState = state
            },
            visibilityStateChanged(nextState = false){
                this.passwordVisible = nextState
            }
        },
        watch:{
            inputData(newValue,oldValue){
                if(newValue !== oldValue)
                    this.$emit("dataChanged",newValue)
            },
            defaultContent(newValue,oldValue){
                this.inputData = newValue
            }
        },
        props:{
            visibleButton:{
                required: true,
                type: Boolean
            },
            widthExpand:{
                type: Number,
                default: 0
            },
            defaultContent:{
                type: String,
                default: ""
            }
        }
    }
</script>

<style scoped>

.focus {
    display: flex;
     /* Border */
    border: 1px solid #7cc1d4;
    box-shadow: 0px 0px 10px 0px #7cc1d4;
    border-radius: 0.25rem;
    padding: 0.25rem;
}

.notFocus {
    display: flex;
    /* Border */
    border: 1px solid #d1d5db;
    border-radius: 0.25rem;
    padding: 0.25rem;
}

.inputBox {
    font-size: 13px;
    border-color: transparent;
    /* Take available width */
    flex: 1;
    outline-color: transparent;
    background-color: transparent;
}

.inputBox:focus {
    outline: 0;
}

.toggle-password-visibility__toggle {
    /* Reset */
    background-color: transparent;
    border-color: transparent;

    /* Center the content */
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25px;
    cursor: pointer;
}
</style>
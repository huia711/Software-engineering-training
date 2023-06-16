<template>
    <div class="base">
        <p class="text">{{ texts }}</p>
        <label v-if="state === true" class="switch switchOn" @click="stateChange(false)">
            <input type="checkbox" class="switch__input" />
            <!-- Circle -->
            <div class="switch__circle"></div>
        </label>
        <label v-if="state === false" class="switch switchOff" @click="stateChange(true)">
            <input type="checkbox" class="switch__input" />
            <!-- Circle -->
            <div class="switch__circle"></div>
        </label>
    </div>
    
</template>

<script>
export default{
    data(){
        return{
            state: this.initialstate
        }
    },
    methods:{
        stateChange(state){
            this.state = state
            this.$emit("stateChange",state)
        }
    },
    watch:{
        initialstate(newVal,oldVal){
            this.state = newVal
        }
    },
    props:{
        initialstate:{
            type: Boolean,
            default: false
        },
        texts:{
            type:String,
            default: ""
        }
    }
}
</script>

<style scoped>

.base{
    display: flex;
    align-items: center;
    flex-direction: row;
    height: auto;
}

.text{
    width: 530px;
    height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    word-spacing: 10px;
    margin: 0px;
}

.switch {
    display: flex;

    /* Rounded border */
    border-radius: 9999px;

    /* Size */
    height: 1.5rem;
    width: 3rem;

    /* Demo */
    margin-bottom: 0.5rem;
}

.switch__input {
    /* Hide the input */
    display: none;
}

.switch__circle {
    /* Rounded border */
    border-radius: 50%;

    /* Size */
    width: 1.5rem;
    height: 1.5rem;

    background-color: #fff;
}

.switchOn {
    background-color: #357edd;
    border: 1px solid #357edd;

    /* Push the circle to the right */
    justify-content: flex-end;
}

/* OFF status */
.switchOff {
    background-color: #d1d5db;
    border: 1px solid #d1d5db;
}

</style>
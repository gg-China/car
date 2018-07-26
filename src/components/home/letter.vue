<template>
    <div class="letter" ref="lets" @touchstart="touchStart" @touchmove="touchMove" >
        <b>#</b>
        <span v-for="(item) in letterData" @click="moveLetter(item.letter)">{{item.letter}}</span>
    </div>  
</template>
        
        
<script> 
    export default {
        props:{
            letterData:{
                type:Array
            },
            moveLetter:{
                type:Function
            }
        },
        methods:{
            touchStart(){
                this.height = window.innerWidth / 750*100*0.4;
                this.top = this.$refs.lets.offsetTop/2-20;
                console.log(this.height,this.top)
            },
            touchMove(e){
                let touch = e.touches[0].pageY;
                let index = Math.ceil((touch-this.top)/this.height);
                if(index<0){
                    index = 0
                }else if(index>this.letterData.length-1){
                    index=this.letterData.length-1
                }
                this.moveLetter(this.letterData[index].letter)
            }
        }
    }

</script>
    
    
<style>

</style>
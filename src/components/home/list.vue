<template>
    <div>
        <div class="carType" :id="item.letter" v-for="(item) in letterData">
            <h2>{{item.letter}}</h2>
            <ul >
                <li v-for="(val) in item.carList" @click="clickCarType(val.MasterID)">
                    <img v-lazy="val.CoverPhoto" alt="">
                    <span>{{val.Name}}</span>
                </li>               
            </ul>
        </div>
    </div>
</template>
    
    
<script> 
    export default {
        name:"",
        props:{
            letterData:{
                type:Array
            },
            clickCarType:{
                type:Function,
                default: ()=>{}
            }
        }
    }

</script>
    
    
<style>

</style>
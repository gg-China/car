<template>
    <div ref="side" class="side" :class="sideCls"
        @touchmove.stop="touchMove"
        @touchstart.stop="touchStart"
        @touchend="touchEnd">
        <div v-for="(item,index) in carTypes">
            <h4>{{item.GroupName}}</h4>         
            <router-link :to="{path:'/detail',query:{id:val.SerialID}}" v-for="val in item.GroupList" :key="val.SerialID">
                <dt>
                    <img :src="val.Picture" alt="">
                </dt>
                <dd>
                    <p>{{val.AliasName}}</p>
                    <span>{{val.DealerPrice}}</span>
                </dd>
            </router-link>            
        </div>
        
    </div>

</template>
      
<script> 
    export default {
        props:{
            carTypes:{
                type:Array
            },
            goMove:{
                type:Function
            },
            sideCls:{
                type:String
            }
        },
        methods: {
            touchStart(e){
                this.startX = e.touches[0].pageX;
            },
            touchMove(e){
                let moveX = e.touches[0].pageX;
                this.chaX = moveX - this.startX             
                if (this.chaX>0){
                    this.$refs.side.style = `transform:translate3d(${this.chaX}px,0,0)`;
                } 
            },
            touchEnd(e){
                this.$refs.side.style = ``;
                if (this.chaX>100){
                    this.$store.commit("setSideCls",{sideCls:""})
                }
            }
        }
    }

</script>
    
    
<style>
    @import url("../../../static/css/side.css");
</style>
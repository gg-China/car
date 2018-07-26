<template>
    <div class="color">
        <p data-hover="hover">全部颜色</p>
    </div>
</template>
    
    
<script> 
    export default {
        name:"",
        data(){
            return{
                id:this.$route.query.id
            }
        },
        computed:{
            Color(){
                console.log(this.$store.state.index.Color)
                return this.$store.state.index.Color
            }
        },
        components:{
            
        },
        mounted(){     
            this.getClrData(this.id)
        },
        methods:{
            getClrData(id){
                this.$store.dispatch('getColor',{id:id})            
            }
        }
    }

</script>
    
    
<style>
    @import url("../../../../static/css/color.css");
</style>
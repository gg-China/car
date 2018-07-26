<template>
    <div class="wrap">
        <div class="wrap-lists" ref="wraps">
            <List :letterData="letterData" :clickCarType="clickCarType"/>
        </div>         
        <Letter :letterData="letterData" :moveLetter="moveLetter"/>
        <Sidebar :carTypes="carTypes" :sideCls="sideCls" />
    </div>

</template>


<script> 
    import Sidebar from "./home/sidebar.vue"
    import Letter from "./home/letter.vue"
    import List from "./home/list.vue"
    
    export default {
        name: '',
        computed:{
            carData(){
                console.log(carData)
                return this.$store.state.index.carData              
            },
            letterData(){
                return this.$store.state.index.letterData 
            },
            sideCls(){
                return this.$store.state.index.sideCls 
            },
            carTypes(){
                return this.$store.state.index.carTypes                 
            }
        },
        components:{
            List,
            Letter,
            Sidebar
        },
        mounted(){ 
            this.getData()
            this.clickCarType()           
        },
        methods:{
            moveLetter(letter){
                console.log(letter)
                let wrap = this.$refs.wraps;
                let child = wrap.children[0].querySelector(`#${letter}`);
                let height = child.offsetTop
                wrap.scrollTop = height
            },
            getData(){
                this.$store.dispatch('getData', {
                })
            },
            clickCarType(id){
                this.$store.dispatch('clickCarType', {id:id})
            }

        }
    }

</script>


<style>

</style>
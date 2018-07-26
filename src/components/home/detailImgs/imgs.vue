<template>
    <div class="imgs">
        <div class="headImg">
            <p @click="goColor(id)"><span>颜色</span></p>
            <p><span>分类</span></p>
        </div>
        <ul class="imgbox">
            <li  v-for="(item,index) in imgData" :key="index">
                <div v-for="(value,key) in item.List" :key="key" v-if="key==0" class="imgsbox" @click="clickImg(id,item.Id,Page)">
                    <div>
                        <p class="img_p">{{item.Name}}</p>
                        <p class="img_p">{{item.Count}} > </p>
                    </div>
                    <img v-lazy="value.Url.replace(/\{0\}/,3)" alt="">
                </div>
                <div v-else class="imgsbox" @click="clBan(id,item.Id,Page,key)">
                    <img v-lazy="value.Url.replace(/\{0\}/,3)" alt="">
                </div>
            </li>
        </ul>
        <div class="img-detail" v-show="flag" @scroll="scroll">
            <ul ref="ban">
                <li v-for="it in imgAll.List">
                    <img v-lazy="it.Url.replace(/\{0\}/,3)" alt="">
                </li>
            </ul>
        </div>
        
        <div class="img-ban swiper-container" v-show="flagBan" @click="clClose">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="it in imgAll.List">             
                    <p><img v-lazy="it.Url.replace(/\{0\}/,3)" alt=""></p>
                </div>
            </div>         
        </div>
        
        
    </div>
</template>
    
    
<script> 
    import Swiper from 'swiper'
    export default {
        name:"",
        data(){
            return{
                id:this.$route.query.id,
                Page:1,
                flag:false,
                flagBan:false,
                Im:''
            }
        },
        computed:{
            imgData(){
               return this.$store.state.index.imgData;
            },
            imgAll(){
               return this.$store.state.index.imgAll;
            }
        },
        components:{
            
        },
        mounted(){     
            this.getImgData(this.id)
        },
        methods:{
            getImgData(id){
                this.$store.dispatch('getImgData',{id:id})
            },
            clickImg(id,imgID,Page){
                this.Im=imgID         
                this.$store.dispatch('getImgAll',{id:id,imgID:imgID,Page:Page})
                this.flag = true
            },
            scroll(e){      
                let top = e.target.scrollTop-(this.$refs.ban.children.length/3*123-window.innerHeight)
                if(top >= 10){ 
                    this.Page++; 
                    this.clickImg(this.id,this.Im,this.Page)
                }
            },
            clBan(id,imgID,Page){
                this.$store.dispatch('getImgAll',{id:id,imgID:imgID,Page:Page})
                this.flagBan = !this.flagBan
                setTimeout(()=>{
                    this.mySwiper = new Swiper('.swiper-container');
                    this.mySwiper.slideTo(0, 1000, false)
                },500)               
            },
            clClose(){
                this.flagBan = !this.flagBan
            },
            goColor(id){
                this.$router.push({path:"/color",query:{id:id}})         
            }

        }
    }

</script>
    
    
<style>
    @import url("../../../../static/css/imgs.css");
    @import "swiper/dist/css/swiper.css";
</style>
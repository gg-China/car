<template>
    <div class="detail">
        <div class="img" @click="goImg">         
            <img :src="datalist.CoverPhoto" alt="">
            <span>{{datalist.pic_group_count}}张照片</span>          
        </div>
        <div class="info">
            <p>{{datalist.market_attribute&&datalist.market_attribute.dealer_price}}</p>
            <p>指导价 {{datalist.market_attribute&&datalist.market_attribute.official_refer_price}}</p>
            <div class="action" @click="priceCar(datalist.list[0].car_id)">
                <button>{{datalist.BottomEntranceTitle}}</button>
            </div>
        </div>
        <div class="list">
            <div class="c-type">
                <span v-for="(item,index) in year" @click="clickYear(item,index)" :class="{active:index==num}" >{{item}}</span>
            </div>
        
            <List :yearSort="yearSort" :priceCar="priceCar"></List>
        </div>
        
        <div class="bottom" @click="priceCar(datalist.list[0].car_id)">
            <h5>{{datalist.BottomEntranceTitle}}</h5>
            <p>{{datalist.BottomEntranceSubTitle}}</p>
        </div>
    </div>
</template>
    
    
<script> 
    import List from "./detailList.vue"
    export default {
        name:"",
        data(){
            return{
                id:this.$route.query.id,
                datalist:[],
                year:[],
                yearList:[],
                yearSort:null,
                num:0
            }
        },
        components:{
            List
        },
        mounted(){
            this.getDetailData(this.id);
            // this.priceCar()
        },
        methods:{
            getDetailData(){
                fetch('https://baojia.chelun.com/v2-car-getInfoAndListById.html?SerialID=' + this.id).then(res=>{
                    return res.json()
                }).then(res=>{
                    this.datalist = res.data
                    this.getDetailList(this.datalist);
                    this.clickYear("全部");
                }) 
            },
            getDetailList(datalist){
                this.year = ["全部"]
                datalist.list.map((val,ind)=>{
                    if(this.year.indexOf(val.market_attribute.year) == -1){
                        this.year.push(val.market_attribute.year)                      
                    }
                    this.yearList.push(val)
                })             
                let carSort = (arr)=>{
                    return arr.sort((a,b)=>{
                        if(a.exhaust < b.exhaust){
                            return -1
                        }else if(a.exhaust > b.exhaust){
                            return 1
                        }else{
                            if(a.max_power < b.max_power){
                                return -1
                            }else if(a.max_power < b.max_power){
                                return 1
                            }else {
                                return b.inhale_type - a.inhale_type
                            }
                        }
                    })
                }
               carSort(this.yearList)
            },
            clickYear(year,number){
                this.yearSort = this.yearList.filter((item)=>{
                    let years = item.market_attribute.year
                    if(year === "全部"){
                        return this.yearList
                    }
                    return years == year                  
                })
                this.num = number
            },
            goImg(){
                this.$router.push({path:"/imgs",query:{id:this.id}})
            },
            priceCar(id){
                this.$router.push({path:"/price",query:{id:id}})
            }
        }
    }

</script>
    
    
<style>
    @import url("../../../../static/css/detail.css");
</style>
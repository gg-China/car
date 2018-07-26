<template>
    <div class="price-box">
        <header>
            <span>可向多个商家咨询最低价，商家及时回复</span>
        </header>
        <div class="content">
            <div class="infop">
                <img :src="Price.details&&Price.details.serial.Picture" alt="">
                <div>
                    <p>{{Price.details&&Price.details.serial.AliasName}}</p>
                    <p>{{Price.details&&Price.details.market_attribute
                        .year}}款 {{Price.details&&Price.details.car_name}}</p>
                </div>               
            </div>
            <div class="self-info">
                <p class="tip">个人信息</p>
                <ul>
                    <li>
                        <span>姓名</span>
                        <input type="text" placeholder="输入你的真实中文姓名" maxlength="4">
                    </li>
                    <li>
                        <span>手机</span>
                        <input type="tel" placeholder="输入你的真实手机号码" maxlength="11">
                    </li>
                    <li>
                        <span>城市</span>
                        <span>北京</span>
                    </li>
                </ul>
                <div class="quotation">
                    <button data-hover="hover">询最低价</button>
                </div>
                <div class="dealer-info">
                    <p class="tip">选择报价经销商</p>
                    <ul>
                        <li v-for='(item,index) in Price.list'>
                            <p>
                                <span class="impt">{{item.dealerShortName}}</span>
                                <span>{{item.promotePrice.replace(/\{00}/,"万")}}</span>                               
                            </p>
                            <p>
                                <span>{{item.address}}</span>
                                <span>售{{item.saleRange}}</span>
                            </p>
                        </li>
                    </ul>
                </div>
            </div>        
        </div>
        <footer><button data-hover="hover">询最低价</button></footer>
    </div>
</template>
        
        
<script> 
    export default {
        name:"",
        data(){
            return {
                id:this.$route.query.id
            }
        },
        computed:{
            Price(){
            console.log(this.$store.state.index.Price)
               return this.$store.state.index.Price;
            }
        },
        mounted(){        
            this.PriceList(this.id)            
        },
        methods:{
            PriceList(id){              
                this.$store.dispatch('getPrice',{id:id})                         
            }
        }
    }

</script>
    
    
<style>
    @import url("../../../../static/css/price.css");
</style>
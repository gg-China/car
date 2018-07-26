<template>
    <div>
        <div v-for="item in yearSort" class="carlist">
            <p>{{item.exhaust_str}}/{{item.max_power_str}} {{item.inhale_type}}</p>
            <ul>
                <li>
                    <p>{{item.year}}款 {{item.car_name}}</p>
                    <p>{{item.horse_power}}马力{{item.gear_num}}档{{item.trans_type}}</p>
                    <p>
                        <span>指导价 {{item.market_attribute.official_refer_price}}</span>
                        <span>{{item.market_attribute.dealer_price_min}}起</span>
                    </p>
                    <button @click="priceCar(item.car_id)">询问底价</button>
                </li>
            </ul>
        </div>
    </div>
</template>
        
        
<script> 
    export default {
        name:"",
        props:{
            yearSort:{
                type:Array
            },
            priceCar:{
                type:Function
            }         
        }
    }

</script>
    
    
<style>
    @import url("../../../../static/css/detail.css");
</style>
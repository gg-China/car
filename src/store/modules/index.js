import { connect } from "tls";

const state = {
    carData : [],
    letterData : [],
    carTypes:[],
    sideCls: '',
    // year:[],
    // yearList:[]
    imgData:[],
    imgAll:[],
    obj:{
        List:[]
    },
    Price:[],
    Color:[]

}

const mutations = {
    getCarData:(state,{carData})=>{
        state.carData = carData
    },
    getLetterData:(state,{letterData})=>{
        state.letterData = letterData
    },
    setSideCls:(state,{sideCls})=>{
        state.sideCls = sideCls
    },
    getImgData:(state,{imgData})=>{
        state.imgData = imgData
    },
    getImgAll:(state,{imgAll})=>{
        state.imgAll = imgAll
    },
    getPri:(state,{Price})=>{
        state.Price = Price
    },
    getClr:(state,{Color})=>{
        state.Color = Color
    }
}

const actions = {
    getData(context,payload){
        fetch('https://baojia.chelun.com/v2-car-getMasterBrandList.html').then(res=>{
            return res.json()
        }).then(body=>{
            context.commit('getCarData',{carData:body.data})
            console.log(body.data);
            let func = (data)=>{
                let arr = []
                data.map((val,ind)=>{     
                    arr.push(val.Spelling.slice(0,1))          
                    return arr;
                })
                let arrLetter = []
                arr.map(res=>{
                    if(arrLetter.indexOf(res) == -1){
                        arrLetter.push(res)
                        return arrLetter
                    }
                })
                arrLetter.map((val,ind)=>{
                    let carType = {
                        id:ind,
                        letter:val,
                        carList:[]
                    }
                    data.map((v)=>{
                        if(v.Spelling.startsWith(val)){
                            carType.carList.push(v)
                        }
                    })                   
                    state.letterData.push(carType)
                })
            }
            func(body.data);
        })
    },
    clickCarType(context,payload){
        console.log(payload)
        state.letterData.map((item,index)=>{
            item.carList.map((val,ind)=>{
                if(payload.id == val.MasterID){
                    fetch('https://baojia.chelun.com/v2-car-getMakeListByMasterBrandId.html?MasterID=' + payload.id).then(res=>{
                        return res.json()
                    }).then(body=>{
                        state.carTypes = body.data
                        state.sideCls = "active"
                        // console.log(this.carTypes)
                    }) 
                }
            })                 
        })
    },
    getDetailData(context,payload){
        // fetch('https://baojia.chelun.com/v2-car-getInfoAndListById.html?SerialID=' + this.id).then(res=>{
        //     return res.json()
        // }).then(body=>{
        //     getDetailList(body.data);
        //     //this.clickYear("全部");
        // }) 
        // let getDetailList = (datalist)=>{
        //     console.log(datalist)
        //     state.year = ["全部"]
        //     datalist.list.map((val,ind)=>{
        //         if(state.year.indexOf(val.market_attribute.year) == -1){
        //             state.year.push(val.market_attribute.year)                      
        //         }
        //         state.yearList.push(val)
        //     })   
        // }
        // let carSort = (arr)=>{
        //     return arr.sort((a,b)=>{
        //         if(a.exhaust < b.exhaust){
        //             return -1
        //         }else if(a.exhaust > b.exhaust){
        //             return 1
        //         }else{
        //             if(a.max_power < b.max_power){
        //                 return -1
        //             }else if(a.max_power < b.max_power){
        //                 return 1
        //             }else {
        //                 return b.inhale_type - a.inhale_type
        //             }
        //         }
        //     })
        // }
        //carSort(state.yearList)
    },
    getImgData(context,payload){
        fetch('https://baojia.chelun.com/v2-car-getImageList.html?SerialID='+ payload.id).then(res=>{
            return res.json()
        }).then(body=>{
            context.commit("getImgData",{imgData:body.data})
        })      
    },
    getImgAll(context,payload){
        fetch('https://baojia.chelun.com/v2-car-getCategoryImageList.html?SerialID='+ payload.id + "&ImageID=" + payload.imgID + "&Page=" + payload.Page + "&PageSize=30" ).then(res=>{
            return res.json()
        }).then(body=>{
            context.commit("getImgAll",{imgAll:body.data})
            if(state.obj.List.length){
               let data =  state.obj.List.concat(state.imgAll.List) 
               state.obj.List = data        
            }else{
                state.obj.List=state.imgAll.List
            }
            context.commit("getImgAll",{imgAll:state.obj})  
        })  
    },
    getPrice(context,payload){
        fetch('https://baojia.chelun.com/v2-dealer-alllist.html?carId=' + payload.id + '&cityId=201&_1531392350857').then(res=>{
            return res.json()
        }).then(body=>{
            console.log()
            console.log(body.data)
            context.commit('getPri',{Price:body.data})
        })
    },
    getColor(context,payload){
        fetch('https://baojia.chelun.com/v2-car-getModelImageYearColor.html?SerialID=' + payload.id ).then(res=>{
            return res.json()
        }).then(body=>{
            console.log(body)
            context.commit('getClr',{Color:body.data})
        })
    }

}

export default {
    state,
    mutations,
    actions
}
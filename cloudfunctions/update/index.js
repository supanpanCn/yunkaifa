// 云函数入口文件
const cloud = require('wx-server-sdk')
// 必须在实例化db之前init
cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event) => {
  // db.collection(event.type.toUpperCase()).where({
  //   index:1
  // }).update({
  //   data:{
  //     collect:false
  //   }
  // }).then(res=>{
  //   console.log(res)
  // })
  // 更新收藏
  let update_col = async ()=>{
    return await db.collection(event.type.toUpperCase()).where({
      index:event.index
    }).update({
      data:{
        collect:event.col
      }
    })
  }
  // 重置
  let reset = ()=>{
    let arr = ["CSS","HTML","ES6","JQ","JS","REACT","VUE","WEIXIN"]
    arr.forEach(async v=>{
      await db.collection(v).where({
        collect:true
      }).update({
        data:{
          collect:false
        }
      })
    })
  }
  let res = ''
  if(event.reset){
    reset()
  }else{
    res = update_col()
  }
  return res.then(reslt=>{
    if(reslt.stats.updated){
      return true
    }else{
      return false
    }
  })
  // return true
  // if(res.stats.updated){
  //   return true
  // }else{
  //   return false
  // }
  
}
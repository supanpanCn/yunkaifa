// 云函数入口文件
const cloud = require('wx-server-sdk')
// 必须在实例化db之前init
cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event) => {
  // 更新收藏
  let update_col = ()=>{
    return await db.collection(event.type.toUpperCase()).where({
      collect:false
    }).update({
      data:{
        collect:true
      }
    })
  }
  // 重置
  let reset = ()=>{
    let arr = ["CSS","HTML","ES6","JQ","JS","REACT","VUE","WEIXIN"]
    arr.forEach(v=>{
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
  
  if(res.stats.updated){
    return true
  }else{
    return false
  }
  
}
// 云函数入口文件
const cloud = require('wx-server-sdk')
// 必须在实例化db之前init
cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event) => {
  
  let res = await db.collection(event.type.toUpperCase()).where({
    index:event.index
  }).update({
    data:{
      collect:event.col
    }
  })
  if(res.stats.updated){
    return true
  }else{
    return false
  }
  
}
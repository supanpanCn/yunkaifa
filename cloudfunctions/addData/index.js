// 云函数入口文件
const cloud = require('wx-server-sdk')
// 初始化
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(123)
  return {
    sum:event.a+event.b,
    k:123
  }
}
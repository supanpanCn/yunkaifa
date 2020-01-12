// 实例化数据库
const db = wx.cloud.database()
// 实例化表
const products = db.collection('todos')
// 实例化指令，这包含增删改查
const _ = db.command
/* 
  add：新增
    接收一个对象，data是新增的数据容器，success是成功后的回调，也可以使用then来获取
  doc+get：查询
    可通过doc方法查询数据库或表，用get获取返回值
    通过where方法进行按条件查询
        where参数对象的键值对为且关系
  update|set
    update:局部更新
    set:替换更新
    同时进行多条数据更新需要在云函数中操作
  remove：删除
*/
Page({
  // 增
  addData(){
    products.add({
      data:{
        name:'zl',
        age:26,
        skills:['vue','react']
      },
      success:res=>{
        console.log(res)
      }
    })
  },
  // 删
  delData(){
    products.doc('d68532785e19fae200e3a9b00afe76ba').remove()
    .then(res=>{
      console.log(res)
    })
  },
  // 改
  updateData(){
    products.doc('d68532785e19fae200e3a9b00afe76ba').update({
      data:{
        age:36
      }
    }).then(res=>{
      console.log(res)
    })
    /* 
      其他更新指令
        inc 自增
        mul 自乘
        push|pop|shift|unshift 数组
    */
   products.doc('d68532785e19fae200e3a9b00afe76ba').update({
     data:{
       age:_.inc(15)
     }
   }).then(res=>{
     console.log(res,'指令自增')
   })
  },
  // 查
  searchData(){
    // 单条数据查询
    products.doc('1acf1de95e19f90f00e3fc12145fcfcf').get().then(res=>{
      console.log(res)
    })
    // 按条件查询
    products.where({
      age:26
    }).get().then(res=>{
      console.log(res)
    })
    // 模糊查询
    /* 
      常用
        eq    =
        neq   !=
        lt    <
        lte   <=
        gt    >
        gte   >=
        in    字段在给定的数组中
        nin   字段不在给定的数组中
      地址：
        https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-sdk-api/database/Command.html
    */
    products.where({
      age:_.gt(15)
    }).get().then(res=>{
      console.log(res)
    })
    // 逻辑查询
    /* 
      常用
        and or(多条件时接收数组对象)
      地址
        https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-sdk-api/database/Command.html
    */
    products.where({
      age:_.gt(15).and(_.lt(25))
    }).get().then(res=>{
      console.log(res)
    })
  },
  // 调用云端-------------------
  useCloud(){
    wx.cloud.callFunction({
      // 云函数名称
      name:'addData',
      // 传给云函数的参数
      data:{
        a:10,
        b:20
      }
    }).then(res=>{
      console.log(res.result)
    })
  }
})
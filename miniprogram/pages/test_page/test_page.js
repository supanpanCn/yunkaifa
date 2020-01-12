const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    con:[],
    type:'',
    collect:[]
  },
  select_operate(e){
    let {index} = e.currentTarget.dataset,
        {type,collect} = this.data
    collect.forEach((v,i)=>{
      if(i==index){
        collect[i]= !v
      }
    })
    wx.cloud.callFunction({
      // 云函数名称
      name:'update',
      // 传给云函数的参数
      data:{
        index:index+1, //第几条数据
        type, //表名
        col:collect[index] //是否收藏
      }
    }).then(res=>{
      if(res.result){
        this.setData({
          collect
        })
        wx.showToast({
          title: '已添加收藏~',
          duration: 1000
        })
      }else{
        wx.showToast({
          title: '收藏失败',
          duration: 1500
        })
      }
      
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {type}=options,
         con=[],
         that=this,
         collect=[]

    db.collection(type.toUpperCase()).get().then(res=>{
      res.data.forEach(v=>{
        con.push(v.content)
        collect.push(v.collect)
      })
      that.setData({
        con,
        type,
        collect
      })
    })
  },
  

  
})
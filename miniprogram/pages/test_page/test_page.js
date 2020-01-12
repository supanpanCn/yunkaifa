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
  // 获取用户授权
  get_right(){
    wx.cloud.callFunction({
      name:"userInfo"
    }).then(res=>{
      wx.cloud.callFunction({
        name:"userInfo",
        data:{
          openid:res.result.openid
        }
      })
      wx.setStorageSync('openid',res.result.openid)
    })
  },
  // 修改数据库
  add_col(e){
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
          duration: 1000,
          mask:true
        })
      }else{
        wx.showToast({
          title: '收藏失败',
          duration: 1500,
          mask:true
        })
      }
    })
  },

  select_operate(e){
    // 提醒用户登录
    let isL = wx.getStorageSync('openid'),
        that=this
    if(!isL){
      wx.showModal({
        title: '提示',
        content: '请先获取授权',
        confirmText:"获取",
        cancelText:"拒绝",
        success (res) {
          if (res.confirm) {
            console.log('曲儿')
            // 获取授权
            that.get_right()
            that.add_col(e)
          } 
        }
      })
    }else{
      that.add_col(e)
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {type}=options,
         con=[],
         that=this,
         collect=[]
    if(type=="小程序"){
      type='weixin'
    }
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
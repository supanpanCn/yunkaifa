
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
      let db = wx.cloud.database()
      db.collection('USER_LIST').get().then(res=>{
        let uid = res.data[0].userID
        wx.cloud.callFunction({
          name:"userInfo"
        }).then(res=>{
          if(res.result.openid!==uid){
              wx.cloud.callFunction({
                // 云函数名称
                name:'update',
                // 传给云函数的参数
                data:{
                  reset:true
                }
              })
          }
        })
      })
      
    }

    this.globalData = {}
  }
})

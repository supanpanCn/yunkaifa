const db = wx.cloud.database()
Page({
  data: {
    isL: false,
    col_arr:[]
  },
  col_arr:[],
  // 用户是否已经登录
  get_user_info(e) {
    let is_deny = e.detail.errMsg.indexOf('deny') != -1 ? true : false
    if (is_deny) {
      this.setData({
        isL: false
      })
    } else {
      wx.cloud.callFunction({
        name: "userInfo"
      }).then(res => {
        wx.cloud.callFunction({
          name: "userInfo",
          data: {
            openid: res.result.openid
          }
        })
        wx.setStorageSync('openid', res.result.openid)
        this.setData({
          isL: true
        })
      })
    }
  },
  onShow: function (options) {
    let isL = wx.getStorageSync('openid') ? true : false
    this.setData({
      isL,
      col_arr:[]
    })
    if (isL) {
      let arr = ["CSS", "HTML", "ES6", "JQ", "JS", "REACT", "VUE", "WEIXIN"]
      let that = this
      arr.forEach(v => {
        db.collection(v).where({
          collect:true
        }).get().then(res=>{
          if(res.data.length){
            this.col_arr.push(...res.data)
            that.setData({
              col_arr:this.col_arr
            })
          }
        })
      })
    }
  }
})
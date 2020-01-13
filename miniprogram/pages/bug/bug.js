const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    ty: 'JAVASCRIPT',
    actions: [
      {
        name: 'CSS'
      },
      {
        name: 'HTML'
      },
      {
        name: 'JAVASCRIPT'
      },
      {
        name: 'JQUERY'
      },
      {
        name: 'VUE'
      },
      {
        name: 'REACT'
      },
      {
        name: '小程序'
      }
    ],
    value:{
      input:'',
      textarea:''
    }
    
  },
  bug_tit: '',
  login_status:false,
  // 弹出类型选择
  open_vas() {
    this.setData({
      show: true
    })
  },
  // 关闭类型选择
  close_vas() {
    this.setData({ show: false });
  },
  // 选择类型
  select_item(event) {
    this.setData({
      ty: event.detail.name,
      show: false
    })
  },
  // 提交
  submit(e) {
    let bug_con = e.detail.value.textarea
    if (this.bug_tit == '') {
      wx.showToast({
        title: '请输入bug标题',
        duration: 1500,
        mask: true
      })
      return
    }
    if (bug_con == '') {
      wx.showToast({
        title: '请输入bug内容',
        duration: 1500,
        mask: true
      })
      return
    }
    this.isL()
    if(this.login_status){
      let {ty} = this.data,
          that=this
      db.collection("BUG").add({
        data:{
          tag:ty.toLowerCase(),
          content:{
            con:bug_con,
            tit:that.bug_tit
          }
        }
      }).then(res=>{
        if(res.errMsg.indexOf('add:ok')!==-1){
          wx.showToast({
            title: '已提交~',
            duration: 1500,
            mask: true,
            success:()=>{
              that.setData({
                value:{
                  textarea:'',
                  input:''
                }
              })
            }
          });
            
        }
      })
    }
    // console.log(e.detail.value)
  },
  // 用户输入
  input_change(e) {
    this.bug_tit = e.detail.value
  },
  // 用户登录
  isL() {
    let isL = wx.getStorageSync('openid'),
      that = this
    if (!isL) {
      wx.showModal({
        title: '提示',
        content: '请先获取授权',
        confirmText: "获取",
        cancelText: "拒绝",
        success(res) {
          if (res.confirm) {
            // 获取授权
            that.get_right()
          }
        }
      })
    }else{
      this.login_status=true
    }
  },
  // 获取权限
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
      this.login_status=true
    })
  }
})
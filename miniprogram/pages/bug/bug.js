// pages/bug/bug.js
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
    ]
    
  },
  bug_tit: '',
  login_status:false,
  open_vas() {
    this.setData({
      show: true
    })
  },
  close_vas() {
    this.setData({ show: false });
  },
  select_item(event) {
    console.log(event.detail.name);
    this.setData({
      ty: event.detail.name,
      show: false
    })
  },
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
      console.log('send')
    }
    // console.log(e.detail.value)
  },
  input_change(e) {
    console.log(e.detail.value)
    this.bug_tit = e.detail.value
  },
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
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


})
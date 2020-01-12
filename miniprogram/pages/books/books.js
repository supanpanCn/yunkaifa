const db = wx.cloud.database()
const rec = db.collection('REC')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let that = this
    rec.get().then(res => {
      that.setData({
        books: res.data
      })
    })
  },


})
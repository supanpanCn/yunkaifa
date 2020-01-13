const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dateTime:'',
    qus:{},
    show_answer:false
  },

  look_answer(){
    this.setData({
      show_answer:true
    })
  },
  onLoad: function (options) {
    let that = this,
        date = new Date(),
        year = date.getFullYear(),
        mounth = date.getMonth()+1,
        day = date.getDate(),
        week = ["日", "一", "二", "三", "四", "五", "六"];
    week = week[date.getDay()]
    let dateTime = year+'年'+mounth+'月'+day+'日'+'     '+'星期'+week

    db.collection("DAY").get().then(res=>{
      that.setData({
        dateTime,
        qus:res.data[date.getDay()]
      })
    })
  }

 
})
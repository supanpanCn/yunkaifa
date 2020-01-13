//index.js
const app = getApp()

Page({
  data: {
    swiper_imgs:[
      {
        id:0,
        src:'https://ae01.alicdn.com/kf/U24c712cfbf824d12b558806960fb23b5N.png'
      },
      {
        id:1,
        src:'https://ae01.alicdn.com/kf/U5c8731e952484827826c59831765151bo.png'
      },
      {
        id:2,
        src:'https://ae01.alicdn.com/kf/U17ef8752a00a46039a990098731ac630w.png'
      }
    ],
    swiper_cons:[
      {
        id:0,
        tit:'基础',
        children:['html','css','js']
      },
      {
        id:1,
        tit:'进阶',
        children:['flex','es6','jq']
      },
      {
        id:2,
        tit:'框架',
        children:['vue','react','小程序']
      }
      // {
      //   id:3,
      //   tit:'综合',
      //   children:['测试(一)','测试(二)']
      // }
    ]
  },
  // 查看试题
  look_page(e){
    let {type} = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/test_page/test_page?type=${type}`
    })
  },
  every_tit(){
    wx.navigateTo({
      url:"/pages/every_day/every_day"
    })
  }
})

// pages/paid/paid.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIndex:0,
    title:['全部','待付款','待发货','待收货','待评价'],
    goodsDetail:{}
  },
  // 后退按钮
  gopersonPage(){
    wx.reLaunch({
		  url: '/pages/personPage/personPage'
    })
  },
  // 切换nav的回调
  toggleActive(e){
    let index = e.currentTarget.dataset.index
    this.setData({
      activeIndex:index
    })
    console.log(e.currentTarget.dataset.index);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let res = wx.getStorageSync('goodsDetail')
    this.setData({
      goodsDetail:res
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
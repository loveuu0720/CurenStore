// pages/paySuccess/paySuccess.js
let num = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [],
    loading: false
  },
  // 点击返回首页的回调
  goIndex() {
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  // 点击查看订单的回调
  goOrder() {
    wx.reLaunch({
      url: '/pages/paid/paid',
    })
  },

  // 猜你喜欢
  getLove(num = 6, page = 0) {
    this.setData({
      loading: true
    })
    wx.cloud.callFunction({
      name: "getGoods",
      data: {
        num,
        page,
      }
    }).then((res) => {
      // 数据拼接
      // 旧数据
      let oldData = this.data.goodsList
      // 新数据 
      let newData = oldData.concat(res.result.data)
      this.setData({
        goodsList: newData,
        loading: false
      })
      if (this.data.goodsList.length === 19) {
        this.setData({
          isData: true
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getLove()
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
    if (this.data.isData === true) return
    num += 6;
    this.getLove(6, num)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
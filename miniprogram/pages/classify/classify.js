// pages/classify/classify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shoesList: '',
    leftCategoty: '',
    activeIndex: 0,
    loading: true,
  },
  // 左侧一级分类切换的回调
  toggleActive(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      activeIndex: index
    });
    if (index == 0) {
      wx.cloud.callFunction({
        name: 'allCategory',
      }).then((res) => {
        this.setData({
          shoesList: res.result.data[0].item
        })
        console.log(res);
      })
    } else if (index == 1) {
      wx.cloud.callFunction({
        name: 'allCategory',
      }).then((res) => {
        this.setData({
          shoesList: res.result.data[2].item
        })
      })
    } else if (index == 2) {
      wx.cloud.callFunction({
        name: 'allCategory',
      }).then((res) => {
        this.setData({
          shoesList: res.result.data[3].item
        })
      })
    } else if (index == 3) {
      wx.cloud.callFunction({
        name: 'allCategory',
      }).then((res) => {
        this.setData({
          shoesList: res.result.data[4].item
        })
      })
    } else if (index == 4) {
      wx.cloud.callFunction({
        name: 'allCategory',
      }).then((res) => {
        this.setData({
          shoesList: res.result.data[5].item
        })
      })
    }

  },
  // 封装获取左右边数据
  getAll() {
    // categoryAll
    wx.cloud.callFunction({
      name: "catrgory_all"
    }).then((res) => {
      this.setData({
        leftCategoty: res.result.data[1].title,
        loading: false
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var idx = options.id
    wx.cloud.database().collection('allCategory')
      .where({
        id: idx
      })
      .get()
      .then(res => {
        console.log(res);
        this.setData({
          shoesList: res.data[0].item,
          activeIndex:Number(idx)
        })
      })
      .catch(err => {
        console.log(err);
      })
      this.getAll()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady(options) {

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
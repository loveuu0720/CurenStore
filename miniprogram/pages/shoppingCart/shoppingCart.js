import Dialog from '@vant/weapp/dialog/dialog';
let num = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasGoods: true,
    goodsList: [],
    loading: false,
    isData: false,
    loadingSKE: true,
    isLogin: true,
    goodsDetail: {},
    count:1,
    all_count:0,
    all_price:0,
    res:[]
  },
  // 点击去结算回调
  gopay(){
    wx.reLaunch({
      url: '/pages/pay/pay',
    })
    
  },
  // 选择一件商品的回调
  selectGoods(e){
    if(e.detail.value.length) {
      for(var i in this.data.goodsDetail){
        this.data.res.push(this.data.goodsDetail[i])
      }
      this.setData({
        all_price:this.data.res[2],
        all_count:this.data.res[6]
      })
    }else {
      this.setData({
        all_count:0,
        all_price:0,
      })
    }
  },
  // 切换单品数量的回调
  onChange_count(e){
    this.setData({
      count:e.detail
    })
    console.log(this.data.count);
  },
  // 滑动删除的回调
  onDelete() {
    Dialog.confirm({
        title: '删除',
        message: '您确认要删除这件商品吗~',
      })
      .then(() => {
        // 清除本地缓存
        let res = wx.removeStorageSync('goodsDetail')
        if (!res) {
          wx.showToast({
            title: '删除成功',
          })
        } else {
          wx.showToast({
            icon: "none",
            title: '删除失败!',
          })
        }
        this.onLoad()
      })
      .catch(() => {
        // on cancel
      });
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
    // 猜你喜欢
    this.getLove()
    this.setData({
      loadingSKE: false
    })
    //  获取本地存储的商品信息
    let res = wx.getStorageSync('goodsDetail')
    this.setData({
      goodsDetail: res
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
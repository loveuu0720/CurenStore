// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 购物车
    show:false,
    // 收货地址
    showAddress:false,
    love_icon:true,
    // 选择
    checked:false,
    size_vlaue:['S','M','L','XL','XXL'],
    color_value:['卡其色','灰色','咖啡色','黑色'],
    // 颜色
    value:'',
    // 尺寸
    value1:'',
    // 数量
    count:1,
    // 子组件传过来的商品信息
    goodsDetail:{},
    color:'卡其色',
    size:'S',
  },
  // 点击加入购物车的回调
  addCart(){
    wx.setStorageSync('goodsDetail', this.data.goodsDetail)
    wx.showToast({
      title: '添加购物车成功~',
    })
    this.setData({
      show:false
    })
  },
  // 尺寸选择
  onChange_size(e){
    this.setData({ value1: e.detail.value });
  },
  // 获取尺寸
  getSize(e){
    this.setData({
      size:e.currentTarget.dataset.item,
      goodsDetail:Object.assign(this.data.goodsDetail,{size:this.data.size})
    })
  },
  // 获取颜色
  getColor(e){
    this.setData({
      color:e.currentTarget.dataset.item,
      goodsDetail:Object.assign(this.data.goodsDetail,{color:this.data.color})
    })
  },
  // 颜色选择
  onChange_color(e){
    this,this.setData({
      value:e.detail.value
    })
  },
  // 购物车数量
  onChangeNum(e){
    this.setData({
      count:e.detail,
      goodsDetail:Object.assign(this.data.goodsDetail,{count:this.data.count})
    })
  },
  // 点击勾选
  onChange(e){
    this.setData({
      checked: e.detail,
    });
  },
  // 点击收藏
  love(){
    this.setData({
      love_icon:false
    })
    wx.showToast({
      title: '收藏成功',
      image:'../../images/images/heart.png',
      duration: 1000,
      mask:true
    })
  },
  // 点击购物车前往购物车
  goShop(){
    wx.reLaunch({
      url: '../shoppingCart/shoppingCart',
    })
  },
  // 点击加入购物车的回调
  addShopCart(){
    this.setData({
      show:true,
      goodsDetail:Object.assign(this.data.goodsDetail,{count:this.data.count}),
      goodsDetail:{...this.data.goodsDetail,color:this.data.color,size:this.data.size},
    })
  },
  // 点击选择收货地址的回调
  openAddress(){
    this.setData({
      showAddress:true
    })
  },

  // 点击Popup弹出框的关闭
  onClose(){
    this.setData({
      show:false
    })
  },
  // 点击收货地址关闭
  closeAddress(){
    this.setData({
      showAddress:false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
   let res =  wx.getStorageSync('goodsDetail')
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
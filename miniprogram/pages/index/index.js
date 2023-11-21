let num = 0;
const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    categoryList:'',
    hotList:'',
    goodsList:[],
    loading:false,
    isData:false,
    value:'',
    loadingSKE:true,
    // 用户名称
    username:''
  },
  // 点击商品跳转到商品详情
  goDetails(e){
    
    console.log(e);
  },
  // 猜你喜欢
  getLove(num=6,page=0){
    this.setData({
      loading:true
    })
    wx.cloud.callFunction({
      name:"getGoods",
      data:{
        num,
        page
      }
    }).then((res)=>{
      // 数据拼接
      // 旧数据
      let oldData = this.data.goodsList
      // 新数据 
      let newData = oldData.concat(res.result.data)
      this.setData({  
        goodsList:newData,
        loading:false
      })
      if(this.data.goodsList.length === 19) {
        this.setData({
          isData:true
        })
      }
      
    })
  },
  // 点击种类的回调
  get_id(e){
    console.log(e.currentTarget.dataset.id);
    wx.reLaunch({
      url: '/pages/classify/classify?id='+e.currentTarget.dataset.id,
    })
  },
  // 搜索值得change事件
    onChange(e){
      this.setData({
        value:e.detail
      })
    },
  // 点击搜索的回调
  onSearch(e){
    console.log('搜索' + this.data.value);
    db.collection('goodsItem').where({
      title: db.RegExp({
        regexp: this.data.value, // 搜索字段
        options: 'i', // 不区分大小写
      })
    })
    .get()
    .then(res=>{
      this.setData({
        goodsList:res.data
      })
      wx.pageScrollTo({
        scrollTop: 860,
        duration: 300
      })
    })
    .catch(err=>{
      console.log(err);
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      username:options.username
    })
    wx.setStorageSync("username",this.data.username)
    // category
    wx.cloud.callFunction({
      name:"getCategory",
    }).then((res)=>{
      this.setData({
        categoryList : res.result.data
      })
    })
    // hot
    wx.cloud.callFunction({
      name:"getHot"
    }).then((res)=>{
      this.setData({
        hotList:res.result.data
      })
    })
    // goods
    this.getLove()
   this.setData({
    loadingSKE:false
   })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
   wx.showToast({
     title: '加载中...',
     icon:'loading',
     duration:1000,
     mask:true
   })
   wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.isData === true) return
      num+=6;
      this.getLove(6,num)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})
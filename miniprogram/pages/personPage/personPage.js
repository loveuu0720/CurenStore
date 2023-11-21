import Dialog from '@vant/weapp/dialog/dialog';
let num=0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList:[],
    personList:'',
    loading:false,
    isData:false,
    // 骨架屏控制
    loadingSKE:true,
    avatar:'https://636c-cloud1-2g9ptapl30a0705b-1321158864.tcb.qcloud.la/details/%E5%88%98%E5%BE%B7%E5%8D%8E2.jpg?sign=b9e01aa123443fce74f761c758b332c0&t=1697718416',
    ussername:'',
    show:false
  },
  // 点击退出登录按钮的回调
  showPop(){
    Dialog.confirm({
      title: '退出',
      message: '您确认要退出登录吗~',
    })
      .then(() => {
        // 清除本地缓存
        wx.clearStorage()
        // on confirm
        wx.reLaunch({
          url: '/pages/login/login',
        })
      })
      .catch(() => {
        // on cancel
      });
    this.setData({
      show:true
    })
    
  },
  
  // 点击已付款的回调
  goPaid(){
    wx.navigateTo({
      url: '/pages/paid/paid',
    })
  },
  // 点击用户头像查看
  seeImg(){
    wx.previewImage({
      urls:[this.data.avatar],
    })
  },
  // 点击更新头像昵称
  updateAvat(res){
    this.setData({
      avatar:res.detail.avatarUrl,
    })
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
        page,
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let username = wx.getStorageSync("userInfo");
    let all = wx.getStorageSync('userInfo2')
    console.log(all);
    let avatar = all[0]
    if(all) {
      username = all[1]
    }
    this.setData({
      avatar:avatar,
      username:username
    })
    // icon
    wx.cloud.callFunction({
      name:"person_all"
    }).then((res)=>{
      this.setData({
        personList:res.result.data[0].pic,
      })
    });
    // 猜你喜欢
    this.getLove();
    // 关闭骨架屏
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
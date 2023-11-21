Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    password:'',
    rePassword:''
  },
  // 获取用户名
  getName(e){
    this.setData({
      username:e.detail.value
    })
  },
  // 获取用户密码
  getPwd(e){
    this.setData({
      password:e.detail.value
    })
  },
  // 获取用户再次确认的密码
  getRePwd(e){
    this.setData({
      rePassword:e.detail.value
    })
  },

  // 点击登录按钮得回调
  go_index(){
    let user = this.data.username;
    let pwd  = this.data.password;
    let rePwd = this.data.rePassword
    console.log(user,pwd);
    // 校验账号
    if(user.length<2) {
      wx.showToast({
        icon:'none',
        title: '用户名至少两位！',
      })
      return
    }
    // 校验密码
    if(pwd.length<1) {
      wx.showToast({
        icon:'none',
        title: '密码不能为空！',
      })
      return
    }
    if(pwd.length>1 && pwd.length<6) {
      wx.showToast({
        icon:'none',
        title: '密码至少6位',
      })
      return
    }
    if(pwd.length>16) {
      wx.showToast({
        icon:'none',
        title: '密码最多不超过16位',
      })
      return
    }
    // 校验再次输入的密码
    if(rePwd !== pwd) {
      wx.showToast({
        icon:'none',
        title: '两次输入密码不一致！',
      })
      return
    }
    // 登录功能的实现
    wx.cloud.database().collection('user')
    .add({
      data:{
        username:user,
        password:pwd
      },
    success(res){
      wx.showToast({
        title: '注册成功',
      })
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } 
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})
// pages/login/login.js
import Toast from '@vant/weapp/toast/toast';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    avatar: '',
    uname: '',
    isPhone_login: false,
    username: '',
    password: ''

  },
  // 点击账号登陆
  chang_login() {
    this.setData({
      isPhone_login: !this.data.isPhone_login
    })
  },
  // 点击模拟登录
  getPhoneNumer() {
    wx.getUserProfile({
      desc: '用于完善个人信息',
      success: (res) => {
        wx.showToast({
          title: '登录成功！',
          icon: 'success',
          duration: 1000,
        })
        this.setData({
          avatar: res.userInfo.avatarUrl,
          uname: res.userInfo.nickName,
        })
        wx.setStorageSync('userInfo2', [this.data.avatar, this.data.uname])
        wx.reLaunch({
          url: '../../pages/index/index',
        })
        console.log(res);
      },
      fail: (res) => {
        Toast.fail("登陆失败")
      },

    })
  },
  // 获取用户名
  getName(e) {
    this.setData({
      username: e.detail.value
    })
  },
  // 获取密码
  getPwd(e) {
    this.setData({
      password: e.detail.value
    })
  },
  // 点击登录按钮的回调
  go_index() {
    let username = this.data.username
    let password = this.data.password
    console.log(username, password);
    // 校验账号
    if (username.trim().length < 2) {
      wx.showToast({
        icon: 'none',
        title: '用户名至少两位！',
      })
      return
    }
    // 校验密码
    if (password.trim().length < 1) {
      wx.showToast({
        icon: 'none',
        title: '密码不能为空！',
      })
      return
    }
    if (password.trim().length > 1 && password.trim().length < 6) {
      wx.showToast({
        icon: 'none',
        title: '密码至少6位',
      })
      return
    }
    if (password.trim().length > 16) {
      wx.showToast({
        icon: 'none',
        title: '密码最多不超过16位',
      })
      return
    }
    // 登录
    wx.cloud.database().collection('user').where({
      username: username,
      password: password
    }).get({
      success(res) {
        console.log(res);
        let userInfo = res.data[0].username
        if (res.data.length !== 0) {
          let user = res.data[0]
          console.log(username);
          if (password == user.password) {
            wx.showToast({
              title: '登录成功！',
              duration: 1000,
              success(res) {
                wx.reLaunch({
                  url: '/pages/index/index',
                })
              }
            })
            wx.setStorageSync('userInfo', userInfo)

          } else {
            wx.showToast({
              icon: 'none',
              title: '账号或密码错误！',
            })
          }
        } else {
          wx.showToast({
            icon: "none",
            title: '账号或密码错误！',
          })
        }

      }
    })
  },
  // 前往注册
  go_phone_login() {
    wx.navigateTo({
      url: '/pages/phone_login/phone_login',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
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
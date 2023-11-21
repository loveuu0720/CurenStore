// components/orderArr/orderArr.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    goodsDetail:{
      type:Object,
      value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goDetails(){
      wx.reLaunch({
        url: '/pages/details/details',
      })
    },
  },
})
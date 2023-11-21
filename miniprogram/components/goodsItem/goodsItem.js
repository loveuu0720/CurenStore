// components/goodsItem/goodsItem.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    goodsList: {
      type: Object,
      value: ''
    },
    loading: {
      type: Boolean,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    goodsdetail: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goDetails(e) {
      console.log(e);
      this.setData({
        goodsdetail: e.currentTarget.dataset.goods
      })
      // 跳转到
      wx.navigateTo({
        url: '/pages/details/details',
      })
      wx.setStorageSync('goodsDetail', this.data.goodsdetail)
    }
  }
})
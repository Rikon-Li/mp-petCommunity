// miniprogram/pages/index/index.js
import requestForums from '../../store/index'
import PubSub from 'pubsub-js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 组件参数设置，传递到组件
     forums:getApp().store.getState().forums.sort(function(a,b){
       return a.support<b.support
     })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    // getApp().store.dispatchEvent("requestForums");
    // getApp().store.dispatch(requestForums)
    await PubSub.publish('requestForums');
    getApp().store.subscribe(()=>{
      this.setData({forums:getApp().store.getState().forums.sort(function(a,b){
        return a.support<b.support
      })});
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
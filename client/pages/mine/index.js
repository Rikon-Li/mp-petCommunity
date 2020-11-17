const app = getApp()
Page({
  data: {
    // 获取值
    isLogin: app.store.getState().isLogin,
    userInfo: {},
  },
  onLoad() {
    this.setData({
      isLogin: app.store.getState().isLogin
    });
    // 订阅store的变化，获取值
    app.store.subscribe(() => {
      this.setData({
        isLogin: app.store.getState().isLogin,
        userInfo: app.globalData.userInfo,
      });
    });
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
      })
    } else {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        console.log(this.data.userInfo);
      }
    }


  },
  onShow() {
    console.log(this.data.isLogin);
  },
  getUserInfoAction(info) {
    if (info.detail.errMsg === 'getUserInfo:ok') {

      // 将用户信息发送给后台
      wx.request({
        url: 'http://localhost:3000/api/user/set_userinfo',
        method: 'POST',
        data: {
          ...info.detail.userInfo,
          token: wx.getStorageSync('TOKEN')
        },
        success(res) {
          console.log(res);
          // 派发action，修改数据
          app.store.dispatch({
            type: 'login',
            value: true
          });

        },
        fail(error) {
          console.log(error);

        }
      })

    } else {
      //什么也不干
    }
  },
  logout() {
    app.store.dispatch({
      type: 'login',
      value: false
    })
  }
})
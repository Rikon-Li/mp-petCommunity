import store from './store/index'

App({
  onLaunch: function (options) {
    const that = this;
    // 获取系统信息
    const systemInfo = wx.getSystemInfoSync();
    // 胶囊按钮位置信息
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
    // 导航栏高度 = 状态栏到胶囊的间距（胶囊距上距离-状态栏高度） * 2 + 胶囊高度 + 状态栏高度
    that.globalData.navBarHeight = (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 + menuButtonInfo.height + systemInfo.statusBarHeight;
    that.globalData.menuRight = systemInfo.screenWidth - menuButtonInfo.right;
    that.globalData.menuBotton = menuButtonInfo.top - systemInfo.statusBarHeight;
    that.globalData.menuHeight = menuButtonInfo.height;

    // 检查是否登录
    this.checkLogin();

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log('app.js:', res.userInfo);

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

  },



  checkLogin() {
    // 检查登录了没有
    const token = wx.getStorageSync('TOKEN');
    if (token) {
      //登录了的话，过期了没有，过期了再执行登录
      wx.request({
        url: 'http://localhost:3000/api/auth/check_login',
        method: 'GET',
        data: {
          token
        },
        success: ({
          statusCode
        }) => {
          if (statusCode !== 200) {
            //登录过期了
            this.login();
          } else {
            // 已经登录过了，不做操作
            store.dispatch({
              type: 'login',
              value: true
            })
          }
        },
        fail: (error) => {
          this.login();
        }
      });
    } else {
      this.login();
    }
  },
  login() {
    //登录:第一步，获得code
    wx.login({
      success({
        code
      }) {
        console.log(code);
        // 登录第二步：将code发送给服务器
        wx.request({
          url: 'http://localhost:3000/api/auth/send_code',
          method: 'POST',
          data: {
            code
          },
          // 登录第六步：获得登录态
          success(res) {
            const token = res.data.token;

            // 登录第七步：保存登录态
            wx.setStorageSync('TOKEN', token);

          },
          fail(error) {
            console.log(error);
          }
        })
      }
    })
  },

  // 仓库数据
  store,

  // 数据都是根据当前机型进行计算，这样的方式兼容大部分机器
  globalData: {
    navBarHeight: 0, // 导航栏高度
    menuRight: 0, // 胶囊距右方间距（方保持左、右间距一致）
    menuBotton: 0, // 胶囊距底部间距（保持底部间距一致）
    menuHeight: 0, // 胶囊高度（自定义内容可与胶囊高度保证一致）
  },

})
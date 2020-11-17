Page({
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

        },
        fail(error) {
          console.log(error);

        }
      })

    } else {
      //什么也不干
    }



  }
})
// const Rx = require('./vendor/rxjs.umd');
const apiService = require('./services/api.service');
const storageService = require('./services/storage.service');

//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    });
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res);
              }
            }
          });
        }
      }
    });
  },
  globalData: {
    userInfo: null
  },
  // 提供 api 相关的服务
  apiService: apiService,
  // 提供 cookie 相关的服务
  storageService: storageService,
  // 包装 request 的 HTTP 服务，alias 'httpService'
  http: {
    request: function(
      options, // wx.request 接收的参数
      { doToggleWxLoading = true } = { doToggleWxLoading: true } // 自定义参数
    ) {
      // // 添加 token 到 header（起到 token.interceptor 的作用）
      // const token = storageService.getToken();
      // if (token) {
      //   options.header = Object.assign({}, options.header, {
      //     Authorization: `Token ${token}`
      //   });
      // }

      // 包装一下 callback 们
      const originalSuccessCb = options.success;
      options.success = res => {
        if (doToggleWxLoading) {
          wx.hideLoading();
        }
        originalSuccessCb(res); // 执行原来的（http 调用者定义的） callback
      };
      const originalFailCb = options.fail;
      options.fail = err => {
        if (doToggleWxLoading) {
          wx.hideLoading();
        }
        originalFailCb(err); // 执行原来的（http 调用者定义的） callback
      };

      if (doToggleWxLoading) {
        wx.showLoading();
      }
      return wx.request(options);
    }
    // TODO: cookie set/get & interceptor
    // TODO: 包装 get/post/patch/put..
  }
});

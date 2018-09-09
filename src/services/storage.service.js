const TOKEN_KEY = '---token---';

const StorageService = {
  // 元方法
  save(key, value) {
    console.log(`[test] #StorageService# save(${key}, ${value})`);
    // FIXME: 考虑 object 类型
    wx.setStorageSync(key, value);
  },
  get(key) {
    return wx.getStorageSync(key);
  },
  // token 便捷方法
  saveToken(token) {
    this.save(TOKEN_KEY, token);
  },
  getToken() {
    return this.get(TOKEN_KEY);
  }
};

module.exports = StorageService;

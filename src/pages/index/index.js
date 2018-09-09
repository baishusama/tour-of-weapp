//index.js
//获取应用实例
const app = getApp();

Page({
  data: {},
  goToHeroListPage() {
    wx.navigateTo({
      url: '../hero-list/hero-list'
    });
  },
  goToVillainListPage() {
    wx.navigateTo({
      url: '../villain-list/villain-list'
    });
  }
});

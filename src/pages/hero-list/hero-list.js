const UnlimitedListAbstractFactory = require('../unlimited-list.abstract');

const app = getApp();

const heroListPageConfig = UnlimitedListAbstractFactory({
  /**
   * To extends abstract one
   */
  dataListName: 'heroes',
  pageObj: {
    page: 1
  },
  generateUrlByParams(params) {
    const url =
      app.apiService.heroUrl +
      app.apiService.convertParamsToRESTfulUrlParamsStr(params);
    return url;
  },
  /**
   * Extra customization
   */
  extraConfig: {
    // /**
    //  * “公开”方法 @自定义
    //  */
    // bindHeroTap(e) {
    //   const id = e.currentTarget.dataset.id;
    //   // 路由到英雄详情页（传入 id 数据）
    //   wx.navigateTo({
    //     url: `../hero-detail/hero-detail?id=${id}`
    //   });
    // }
  }
});

console.log('[test] #HeroListPage# config :', heroListPageConfig);
Page(heroListPageConfig);

const UnlimitedListAbstractFactory = require('../unlimited-list.abstract');

const app = getApp();

const villainListPageConfig = UnlimitedListAbstractFactory({
  /**
   * To extends abstract one
   */
  dataListName: 'villains',
  pageObj: {
    page: 1
  },
  generateUrlByParams(params) {
    const url =
      app.apiService.villainUrl +
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
    //   // 路由到敌人详情页（传入 id 数据）
    //   wx.navigateTo({
    //     url: `../villain-detail/villain-detail?id=${id}`
    //   });
    // }
  }
});

console.log('[test] #VillainListPage# config :', villainListPageConfig);
Page(villainListPageConfig);

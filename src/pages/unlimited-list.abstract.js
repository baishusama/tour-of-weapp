const PaginationService = require('../services/pagination.service');
const util = require('../utils/util');

const app = getApp();

const DEFAULT_GET_RESULTS_FN = res => res.data.results;
const DEFAULT_GET_COUNT_FN = res => res.data.count;

const ERR_MSG = {
  DATA_LIST_NAME_NOT_ALLOWED_EMPTY:
    'dataListName string MUST be provided calling UnlimitedListAbstractFactory',
  GENERATE_URL_BY_PARAMS_NOT_ALLOWED_EMPTY:
    'generateUrlByParams function MUST be provided calling UnlimitedListAbstractFactory'
};

// FIXME: 虽然 ES6 的 class 由于方法不可枚举无法被小程序识别、extends 行不通，但是还是可以用 ES5 的 prototype 来共享方法的
const UnlimitedListAbstractFactory = function({
  dataListName = util.throwIfMissing(ERR_MSG.DATA_LIST_NAME_NOT_ALLOWED_EMPTY), // required
  paramObj = {},
  pageObj = {},
  generateUrlByParams = util.throwIfMissing(
    ERR_MSG.GENERATE_URL_BY_PARAMS_NOT_ALLOWED_EMPTY
  ), // required
  getResults = DEFAULT_GET_RESULTS_FN,
  getCount = DEFAULT_GET_COUNT_FN,
  extraData = {},
  extraConfig = {}
}) {
  const paginationService = new PaginationService(pageObj);

  const pageData = {
    count: null,
    [dataListName]: null,
    paramObj: paramObj,
    hasReachedEnd: false
  };

  const pageConfig = {
    /**
     * “公有”变量
     */
    data: Object.assign(pageData, extraData),

    /**
     * 生命周期函数
     */
    onLoad(params) {
      /**
       * ImoNote: 考虑带参数情况，使得可以分享为带参数小程序页面
       * TODO:FIXME: set params to paramObj then setData ???
       */
      this.doRefresh();
    },

    // 下拉刷新效果 https://developers.weixin.qq.com/miniprogram/dev/api/pulldown.html#pageonpulldownrefresh
    onPullDownRefresh() {
      // 刷新时，当前状态应该同步到搜索框
      this.setData({
        paramObj: this.data.paramObj
      });
      this.doRefresh();
    },

    // 刷新
    doRefresh() {
      const pageObj = paginationService.getResetPageObj();
      const params = Object.assign({}, this.data.paramObj, pageObj);
      const url = generateUrlByParams(params);

      app.http.request({
        method: 'GET',
        url,
        success: res => {
          const count = getCount(res);
          const results = getResults(res);
          paginationService.setCount(count);
          this.setData({
            count: count,
            [dataListName]: results,
            hasReachedEnd: false
          });
        }
      });
    },

    // 上拉无限加载 https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page.html#onreachbottom
    onReachBottom() {
      // 判断是否已经到达底部
      if (paginationService.checkReachedEnd()) {
        // 当变化时，才做 set，为了更好的性能
        if (!this.data.hasReachedEnd) {
          this.setData({
            hasReachedEnd: true
          });
        }
        return false;
      }

      const pageObj = paginationService.getNextPageObj();
      const params = Object.assign({}, this.data.paramObj, pageObj);
      const url = generateUrlByParams(params);

      app.http.request({
        method: 'GET',
        url,
        success: res => {
          const results = getResults(res);

          // this.appendItems(results);
          const dataList = this.data[dataListName].slice();
          dataList.push(...results);

          this.setData({
            [dataListName]: dataList
          });
        },
        fail: err => {
          // MAYBE add error toast..
          console.log('err :', err);
        }
      });
    }

    // // 添加数据
    // appendItems(items) {},
  };

  return Object.assign(pageConfig, extraConfig);
};

module.exports = UnlimitedListAbstractFactory;

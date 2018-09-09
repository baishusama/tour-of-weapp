// FIXME: 支持 limit 和 page 两种参数
class PaginationService {
  constructor(
    { count = null, limit = 10, offset = 0, page } = {
      count: null,
      limit: 10,
      offset: 0
    }
  ) {
    this.dataObj = {
      count
    };

    this.usePage = page !== undefined;
    if (!this.usePage) {
      this.pageObj = {
        limit,
        offset
      };
    } else {
      this.pageObj = {
        limit,
        page
      };
    }
  }

  // 计算是否已经到达底部
  checkReachedEnd() {
    const total = this.dataObj.count;
    const itemPerPage = this.pageObj.limit;
    const pageIndex = !this.usePage
      ? this.pageObj.offset / itemPerPage + 1
      : this.pageObj.page;
    const flag = pageIndex * itemPerPage >= total;

    // // Test Codes
    // console.log('[test] ----------');
    // console.log(`[test] checkReachedEnd, ${total} pageIndex :`, pageIndex);
    // console.log(`[test] checkReachedEnd, ${total} itemPerPage :`, itemPerPage);
    // console.log(
    //   `[test] checkReachedEnd, ${pageIndex * itemPerPage} =?= ${total}`
    // );
    // console.log(`[test] checkReachedEnd, ${total}: ${flag} :`);

    return flag;
  }

  /* 页面导航相关方法 */
  // 获取下一页 pageObj
  getNextPageObj() {
    this.nextPageObj();
    return this.getPageObj();
  }

  // 重置 pageObj
  getResetPageObj() {
    this.resetPageObj();
    return this.getPageObj();
  }

  // 将 pageObj
  getPageObj() {
    // return Object.assign({}, this.pageObj);
    return { ...this.pageObj };
  }

  // 获取下一页 pageObj
  nextPageObj() {
    if (!this.usePage) {
      this.pageObj.offset += this.pageObj.limit;
    } else {
      this.pageObj.page++;
    }
  }

  // 重置 pageObj
  resetPageObj() {
    if (!this.usePage) {
      this.pageObj.offset = 0;
    } else {
      this.pageObj.page = 1;
    }
  }

  // 设置 count
  setCount(count) {
    this.dataObj.count = count;
  }
}

module.exports = PaginationService;

# Tour of WeApp

## TODO:

### 命令行工具

#### 创建或者修改相关文件

- 命令行工具：e.g. `towa new item-list`
  - `app.js`: check for TODO:
  - `util/util.js`: check for `throwIfMissing`
  - `app.json`:
    - register `item-list` in `pages`
    - enable `"enablePullDownRefresh": true`
    - maybe set `"onReachBottomDistance": 250`
  - `pages/unlimited-list.abstract.js`
  - `hero-list`: generate files
    - `hero-list.json` content empty: `{}`
    - `hero-list.wxml` content empty: `<view>hero-list works!!</view>`
    - `hero-list.js` see template below

```
const UnlimitedListAbstractFactory = require('../unlimited-list.abstract');

const app = getApp();

const heroListPageConfig = UnlimitedListAbstractFactory({
  /**
   * To extends abstract one
   */
  dataListName: 'heroes',
  pageObj: {
    page: 1 // TODO:
  },
  generateUrlByParams(params) {
    // return request url here..
  },
  /**
   * Extra customization
   */
  extraData: {},
  extraConfig: {}
});

console.log('[test] #HeroListPage# config :', heroListPageConfig);
Page(heroListPageConfig);

```

#### 交互

- `xxx 文件创建/修改/更新成功/失败`
- `xxxxx, 是否 ...`: y/n
/**
 * ImoNote:
 * 因为在 routes.json 中设置 `"/:resource/\\?offset=:offset&limit=:limit": "/:resource?_page=:offset&_limit=:limit"`
 * 虽然能成功分页，但获取不到 `count`，所以这里写个中间件……
 */
const { NUMBER_OF_HERO, NUMBER_OF_VILLAIN } = require('../counts');

module.exports = (req, res, next) => {
  console.log(
    '[test] #pagination.js# keys of req :',
    Object.keys(req)
      .filter(key => key[0] != '_')
      .sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0))
  );
  console.log('[test] #pagination.js# req.url :', req.url);
  console.log('[test] #pagination.js# req.params :', req.params);
  console.log('[test] #pagination.js# req.query :', req.query);
  console.log('[test] ----------');
  const selfKeys = Object.keys(res);
  console.log(
    `[test] #pagination.js# res has ${selfKeys.length} keys:`,
    selfKeys
      .filter(key => key[0] != '_')
      .sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0))
  );
  const keys = [];
  const extraKeyObj = {};
  for (const key in res) {
    keys.push(key);
    extraKeyObj[key] = true;
  }
  for (const key of selfKeys) {
    delete extraKeyObj[key];
  }
  extraKeys = Object.keys(extraKeyObj);
  console.log(
    `[test] #pagination.js# res has ${extraKeys.length} keys extra:`,
    extraKeys
      .filter(key => key[0] != '_')
      .sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0))
  );

  console.log('[test] res.get :', res.get);
  console.log('[test] res.pipe :', res.pipe);
  console.log('[test] res.output :', res.output);
  console.log('[test] res.json :', res.json);
  console.log('[test] res.body :', res.body); // ImoNote: res.body 是 undefined……想偷懒使用 json server 提供的过滤特别是分页功能凉凉了，只能使用终极手段——自定义路由了。。
  console.log('[test] res.locals :', res.locals);
  console.log('[test] res.locals.data :', res.locals.data);
  res.on('send', function() {
    console.log('[test] on send, res.body :', res.body);
  });
  // 如果是一个分页请求
  // if(res.query && res.query._limit){
  //   res.
  // }
  next();
};

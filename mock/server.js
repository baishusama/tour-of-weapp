const CONFIG = require('./config');
const counts = require('./counts');
const db = require('./db');
const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router(db()); // FIXME:
const middlewares = jsonServer.defaults();

const port = CONFIG.PORT;

// 对分页请求做特殊处理
router.render = (req, res) => {
  let data = res.locals.data;

  // 如果是一个分页请求，那么在响应结果中添加总数字段（count）
  // TODO: indexOf 之外更优雅的写法。。
  if (req.url.indexOf('limit=') !== -1) {
    let count = null;
    if (/heroes/.test(req.url)) {
      count = counts.NUMBER_OF_HERO;
    } else if (/villains/.test(req.url)) {
      count = counts.NUMBER_OF_VILLAIN;
    }

    data = {
      count,
      results: data
    };
  }

  res.json(data);
};

server.use(middlewares);
server.use(jsonServer.bodyParser);
// 路由别名
server.use(
  // FIXME: need 不需要在乎参数顺序的写法：
  jsonServer.rewriter({
    '/api/*': '/$1',
    '/:resource/\\?offset=:offset&limit=:limit':
      '/:resource?_page=:offset&_limit=:limit',
    '/:resource/\\?limit=:limit&page=:page':
      '/:resource?_page=:page&_limit=:limit'
  })
);
server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running at port ${port} >v<`);
});

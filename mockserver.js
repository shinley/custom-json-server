const path = require('path')
const jsonServer = require('json-server')
const { render } = require('./render/render.js')
const { intercepter } = require('./intercepter/intercepter')
const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()
server.use(middlewares)
server.use(jsonServer.bodyParser)

// 配置前置拦截， 以及单独处理login接口
intercepter(server)

 // 配置响应, 设置固定格式的返回数据，以及分页设置
 render(router)

/**
 * 配置路由，每个都要配置
 */
server.use(jsonServer.rewriter({
  '/sys/profile': '/profile',
  '/user/feature': '/feature',
  '/user/chapter': '/chapter',
  '/user-manage/list': '/staff',
  "/user-manage/list\\?page=:page&size=:size": "/staff",
  '/user-manage/all-list': '/staff',
  '/user-manage/detail/:id': '/staff/:id',
  '/sys/student\\?page=:page&size=:size': '/student',
  '/sys/student': '/student',
  '/sys/student\\?id=:id': '/student/:id'
}))

server.use(router)

let port = 8000
server.listen(port, () => {
  console.log('JSON Server is running on ' + port)
})
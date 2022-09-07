const { RESP_JSON } = require('../constant')

exports.intercepter = (server) => {
    server.use((req, res, next) => {
        const pth = req.path
        // 在此处根据路径中是否包含 update 和 del 来修改请求方式
        console.log(pth)
        if (req.method === 'POST') { // add your authorization logic here
            // 如果路径中包含 update 改成put
            if (req.url.indexOf('update') != -1) {
                req.method = 'PUT'
            }
            // 如果路径中包含del, 表时是删除, 改成DELETE
            if (req.url.indexOf('del') != -1) {
                req.method = 'DELETE'
            }

            if (JSON.stringify(req.body) == '{}' && req.url.indexOf('/login') == -1) {
                RESP_JSON.message =  "post请求参数为空"
                res.status(400).json(RESP_JSON)
                return
            }
        } 
    
        // 如果是GET请求, 并且有分页参数。 在header中做标记， 并现响应方法中slice
        if (req.method === 'GET') {
        
            // 如果请求参数中传了分页参数 page
            if (req.query.page) {
                res.header('x-split-page', 'page')
                res.header('x-page', req.query.page)
                res.header('x-size', req.query.size)
            }
        }
        next() // continue to JSON Server router
    })
}
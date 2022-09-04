exports.intercepter = (server) => {
    server.use((req, res, next) => {
        const pth = req.path
        // 在此处根据路径中是否包含 update 和 del 来修改请求方式
        console.log(pth)
        if (req.method === 'POST') { // add your authorization logic here
        req.method = 'PATCH'
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
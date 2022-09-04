function render(router) {
    router.render = (req, res) => {
        if (req.method === 'POST' || req.method === 'PATCH' || req.method === 'PUT'||req.method === 'POST'||req.method === 'DELETE') {
        // 登录一般用post, 此处单独处理
        if (req.url.indexOf('/login') != -1) {      
            res.status(200).json({
            "code": 200,
            "data":{
                "token": "8fa22e88-f6ab-4a4b-930a-a5e62c4c74e8"
            },
            "message": "successs"
            })
        } else {
            res.jsonp({
            "code": 200,
            "success": true,
            "data": "",
            "message": "successs"
            }) 
        }
    
        }else {
        // 此处判断是否分页
        const splitPage = res.getHeaders()["x-split-page"]
        const currPage = parseInt(res.getHeaders()["x-page"])
        const pageSize = parseInt(res.getHeaders()["x-size"])
        // 如果分页
        if (splitPage) {
            dataArray = res.locals.data;
            let total  = dataArray.length;
    
            let  totalPage = parseInt(total % pageSize == 0 ? total/pageSize : total/pageSize + 1)
    
            let firstIndex = (currPage-1) * pageSize
            let lastIndex = currPage * pageSize;
    
            console.log('dataArray', dataArray)
            dataSlice = dataArray.slice(firstIndex, lastIndex)
            let data = {
                "currPage": currPage,
                "totalPage": totalPage,
                "pageSize": pageSize,
                "totalSize": total,
                "list": dataSlice
            }
    
            res.json({
            "code": 200,
            "success": true,
            "data": data,
            "message": "success"
            })
        } else {
            // 不分页
            res.json({
            "code": 200,
            "success": true,
            "data": res.locals.data,
            "message": "success"
            })
        }
        }
    }
}

module.exports = { render }
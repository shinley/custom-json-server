# 自定义JSON-SERVR

## 介绍
目前大部分后端提供的接口，都没有完全支持restful api, 如果直接使用json-server并不能满足实际工作中未使用restful标准的api接口。因此， 此项目使用json-server 定制满足非restful标准的api进行mock数据。目前添加支持的特性：
 - 定制请求响应的格式
 - 自定义分页查询

## 注意事项
由于 post 请求是添加数据， 如果使用过程中, 误把get请求，写成了post请求，就会把数据清空
# lookupdomain
机器获悉自身由DNS关联的域名

> client为需要知道自身域名机器的程序

> lookup为遍历已知域名的程序，并告知机器其域名

由于缺少机器，只能单机模拟：

1. 使用pm2启动多个client实例（等同于多台机器），用不同端口区分即可
2. 配置host（等同于DNS），多个域名指向同个ip即可
3. 运行lookup程序，client实例将会记录自身对应的域名
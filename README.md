# 端口远程访问服务器ipfs
 `ssh -L 5001:localhost:5001 -L 4001:localhost:4001 -L 8080:localhost:8080  ubuntu@49.234.194.80`

# 启动ipfs
 `ipfs daemon`

# 启动fisco bcos节点
`cd ~/fisco && bash nodes/127.0.0.1/start_all.sh`

# 安装依赖
`cd FoodSafety/frontend && yarn install`

# 前端启动
`cd FoodSafety/frontend && yarn start`

# 运行springboot project

# 已完成部分

## 前端
1. 申请入链界面
2. 信息上传界面
3. 项目介绍界面
4. 食品信息界面

## 后端
1. 合约1.0版本
2. ipfs实例
3. 合约调用实例
4. 部分前后端交互接口


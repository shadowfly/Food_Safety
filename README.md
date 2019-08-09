## 项目简介

由监管机构主导的食品溯源系统，避免大型零售企业监守自盗。

## 技术依赖

- Spring Boot
- Thymeleaf
- IPFS
- React
- Fisco Bcos

## 已完成部分

![image](http://github.com/RookieLinLucy666/Food_Safety/raw/master/image.png)

### 前端

1. 申请入链界面
2. 信息上传界面
3. 项目介绍界面
4. 食品信息界面

### 后端
1. 合约1.0版本
2. ipfs实例
3. 合约调用实例
4. 部分前后端交互接口

## 项目运行
### 端口远程访问服务器ipfs
 `ssh -L 5001:localhost:5001 -L 4001:localhost:4001 -L 8080:localhost:8080  ubuntu@49.234.194.80`

### 启动ipfs
 `ipfs daemon`

### 启动fisco bcos节点
`cd ~/fisco && bash nodes/127.0.0.1/start_all.sh`

### 安装依赖
`cd FoodSafety/frontend && yarn install`

### 前端启动
`cd FoodSafety/frontend && yarn start`

### 运行springboot project 端口远程访问服务器ipfs
 `ssh -L 5001:localhost:5001 -L 4001:localhost:4001 -L 8080:localhost:8080  ubuntu@49.234.194.80`

### 启动ipfs
 `ipfs daemon`

### 启动fisco bcos节点
`cd ~/fisco && bash nodes/127.0.0.1/start_all.sh`

### 安装依赖
`cd FoodSafety/frontend && yarn install`

### 前端启动
`cd FoodSafety/frontend && yarn start`

### 运行springboot project


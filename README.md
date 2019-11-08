## 项目简介

由监管机构主导的食品溯源系统，避免大型零售企业监守自盗。

## 技术依赖

- Spring Boot
- Thymeleaf
- IPFS
- React
- Fisco Bcos

## 已完成部分

完成下图展示界面的前后端交互。

### 前端

### 后端
1. 合约
2. ipfs调用
3. 合约调用
4. 与上述前端页面交互

## 项目运行

### 前端

访问React App http://localhost:3000

#### 安装依赖
`cd FoodSafety/frontend && yarn install`

#### 前端启动
`cd FoodSafety/frontend && yarn start`

### 后端

- 访问IPFS控制界面 http://localhost:5001/webui
- 访问Tomcat http://localhost:8080

#### 启动ipfs
 `ipfs daemon`

#### ipfs跨域

`ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "GET", "POST", "OPTIONS"]'`

`ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'`

`ipfs config --json API.HTTPHeaders.Access-Control-Allow-Credentials '["true"]'`

`ipfs config --json API.HTTPHeaders.Access-Control-Allow-Headers '["Authorization"]'`

`ipfs config --json API.HTTPHeaders.Access-Control-Expose-Headers '["Location"]'`

#### 启动fisco bcos节点
`cd ~/fisco && bash nodes/127.0.0.1/start_all.sh`

#### 运行springboot project


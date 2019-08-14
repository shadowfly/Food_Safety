- [项目简介](#----)
- [技术依赖](#----)
- [已完成部分](#-----)
  * [前端](#--)
  * [后端](#--)
- [待完成](#---)
- [项目运行](#----)
  * [前端](#---1)
    + [安装依赖](#----)
    + [前端启动](#----)
  * [后端](#---1)
    + [启动ipfs](#--ipfs)
    + [ipfs跨域](#ipfs--)
    + [启动fisco bcos节点](#--fisco-bcos--)
    + [运行springboot project](#--springboot-project)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>

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

![image](https://github.com/RookieLinLucy666/Food_Safety/raw/master/image.png)

### 前端

1. 项目介绍界面
2. 申请入链界面
3. 信息上传界面
4. 信息查询界面
5. 监督抽查界面

### 后端
1. 合约
2. ipfs调用
3. 合约调用
4. 与上述前端页面交互

## 待完成

1. 权限控制
2. 访问控制
3. 黑名单控制
4. 公告信息

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


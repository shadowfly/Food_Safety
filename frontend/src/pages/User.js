import React, { Component } from 'react';
import { Layout, Menu, Icon, AutoComplete, Carousel } from 'antd';
import ApplyToChain from '../roles/ApplyToChain';
import '../css/User.css';
import '../image/hotdog.png';
import '../image/slogan.png';

const { Header, Content, Footer, Sider } = Layout;

class UserPage extends Component {

    state = {
        collapsed:false,
    }

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({collapsed:collapsed})
    }

    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
            <Sider style={{ background: '#fff' }} collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
              <div className="logo" style={{height:160}}>
                <img src="hotdog.png" style={{width:100, height:AutoComplete}}/>
              </div>
              <Menu defaultSelectedKeys={['apply']} mode="inline">
                <Menu.Item key="apply">
                  <Icon type="safety-certificate" />
                  <span>申请入链</span>
                </Menu.Item>
                <Menu.Item key="addInfo">
                  <Icon type="appstore" />
                  <span>信息上传</span>
                </Menu.Item>
                <Menu.Item key="check">
                  <Icon type="medicine-box" />
                  <span>监督抽查</span>
                </Menu.Item>
                <Menu.Item key="warning">
                  <Icon type="bell" />
                  <span>监管警示</span>
                </Menu.Item>
                <Menu.Item key="black_list">
                  <Icon type="frown" />
                  <span>失格商家</span>
                </Menu.Item>
                <Menu.Item key="info">
                  <Icon type="calendar" />
                  <span>通知通告</span>
                </Menu.Item>
                <Menu.Item key="register">
                  <Icon type="user" />
                  <span>用户注册</span>
                </Menu.Item>
                <Menu.Item key="login">
                  <Icon type="idcard" />
                  <span>用户登录</span>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout>
              <Header style={{ background: '#fff', padding: 0,height:160}} >
                <Carousel autoplay>
                <div>
                  <h2>拒绝脏乱差</h2>
                </div>
                <div>
                  <h2>食品溯源系统</h2>
                </div>
                <div>
                  <h2>基于fisco bcos联盟链</h2>
                </div>
                <div>
                  <h2>结合IPFS进行分布式存储</h2>
                </div>
                </Carousel>
              </Header>
              <Content style={{background: '#fff' }}>
                <ApplyToChain />
              </Content>
              <Footer style={{ textAlign: 'center',background: '#fff',height:48,padding:15 }}>©Food Safety 2019</Footer>
            </Layout>
          </Layout>
        )
    }
}

export default UserPage;
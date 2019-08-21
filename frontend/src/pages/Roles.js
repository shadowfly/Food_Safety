import React, { Component } from 'react';
import { Layout, Menu, Icon, AutoComplete, Carousel } from 'antd';
import ApplyToChain from '../contents/ApplyToChain';
import AddFoodInfo from '../contents/AddFoodInfo';
import SuppAdd from '../contents/RolesAdd/SuppAdd';
import TransAdd from '../contents/RolesAdd/TransAdd';
import RetailAdd from '../contents/RolesAdd/RetailAdd';
import ThreePartyInsert from '../contents/RolesAdd/ThreePartyInsert';
import '../css/User.css';
import '../image/hotdog.png';
import '../image/slogan.png';
import Home from './Home';
import FoodInfo from '../contents/FoodInfo';
import Supervise from '../contents/Supervise';
//import NoAuthority from '../contents/NoAuthority';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class Roles extends Component {

    state = {
        collapsed:false,
        funcSelect:0,
        subContent:<Home />,   
    }

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({collapsed:collapsed})
    }

    menuClick = (selectedInfo) => {
      console.log(selectedInfo.key)
      switch(selectedInfo.key) {
        case "apply":
          this.setState({subContent:<ApplyToChain />})
          break;
        case "foodInfo":
          this.setState({subContent:<FoodInfo />})
          break;
        case "check":
          this.setState({subContent:<Supervise />})
          break;
        case "black_list":
          this.setState({subContent:<AddFoodInfo />})
          break;
        case "info":
          this.setState({subContent:<AddFoodInfo />})
          break;
        case 'suppAdd':
            this.setState({subContent:<SuppAdd />})
            break;
        case 'transAdd':
            this.setState({subContent:<TransAdd />})
            break;
        case 'retailAdd':
            this.setState({subContent:<RetailAdd />})
            break;
        case 'threePartyInsert':
            this.setState({subContent:<ThreePartyInsert/>})
            break;
        default:
          this.setState({subContent:<Home />})
          break;
      }
    }

    render() {
      const {subContent} = this.state
        return (
            <Layout style={{ minHeight: '100vh' }}>
            <Sider style={{ background: '#fff' }} collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
              <div className="logo" style={{height:160}}>
                <img src="hotdog.png" style={{width:100, height:AutoComplete}}/>
              </div>
              <Menu mode="inline" onClick={this.menuClick}>
                <Menu.Item key="apply">
                  <Icon type="safety-certificate" />
                  <span>申请入链</span>
                </Menu.Item>
                <SubMenu
                  key="addInfo"
                  style={{paddingLeft:20}}
                  onTitleClick={this.subMenuClick}
                  title={
                    <span>
                       <Icon type="appstore" />
                       <span>信息上传</span>
                    </span>
                  }>
                    <Menu.Item key="suppAdd">制造商</Menu.Item>
                    <Menu.Item key="transAdd">物流</Menu.Item>
                    <Menu.Item key="retailAdd">零售商</Menu.Item>
                    <Menu.Item key="threePartyInsert">监管机构</Menu.Item>
                </SubMenu>
                <Menu.Item key="foodInfo">
                  <Icon type="database" />
                  <span>信息查询</span>
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
              </Menu>
            </Sider>
            <Layout>
              <Header style={{ background: '#fff', padding: 0,height:160}} >
                <Carousel autoplay>
                <div>
                  <h2>拒绝脏乱差</h2>
                </div>
                <div>
                  <h2>食品供应链</h2>
                </div>
                <div>
                  <h2>基于区块链</h2>
                </div>
                <div>
                  <h2>结合IPFS进行分布式存储</h2>
                </div>
                </Carousel>
              </Header>
              <Content style={{background: '#fff' }}>
                {subContent}
              </Content>
              <Footer style={{ textAlign: 'center',background: '#fff',height:48,padding:15 }}>©Food Safety 2019</Footer>
            </Layout>
          </Layout>
        )
    }
}

export default Roles;
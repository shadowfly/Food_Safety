import React, {Component} from 'react';
import {Button} from 'antd';

class Supervise extends Component {

    state = {
        threePartyId:'无',
        threePartyName:'无',
        threePartyImage:'无',
    }

    handleSubmit = () => {
        this.setState({
            threePartyId:'id',
            threePartyName:'name',
            threePartyImage:'image'
        })
    }

    render() {
        const {threePartyId,threePartyName,threePartyImage} = this.state
        return (
            <div>
                <Button type="primary" 
                    htmlType="submit"
                    onClick={this.handleSubmit}
                    style={{marginTop:50,width:"30%",}}>
                    随机选择监管机构
                </Button>
                
                <p style={{marginTop:50}}>编号：{threePartyId}</p>
                <p>名称：{threePartyName}</p>
                <p>资质证书地址：{threePartyImage}</p>
            </div>
        )
    }
}

export default Supervise;
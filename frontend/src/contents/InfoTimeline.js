import React, {Component} from 'react';
import {Timeline, Tag, Modal} from 'antd';

class InfoTimeline extends Component {

    constructor(props) {
        super(props)
        this.state = {
            visible:this.props.visible,
            foodNum:'foodNum',
            suppId:'suppId',
            transId:'transId',
            retailId:'retailId',
            outDate:'outDate',
            ingredient:'ingredient',
            original:'original',
            temp:'temp',
            foodImg:'foodImg',
        }
        console.log(this.props.visible)
    }

    handleCancel = (e) => {
        this.props.handleModalCancel();
    }

    render() {
        const {foodNum,suppId,transId,retailId,
            outDate,ingredient,original,temp,foodImg} = this.state;
        return (
            <div style={{fontWeight:'bold'}} className="divForm">
            <Modal maskClosable visible={this.props.visible} footer={null} onCancel={this.handleCancel}>
                <p style={{textAlign:'center'}}>食品溯源信息</p>
            <Timeline mode="alternate">
                <Timeline.Item color={suppId !== "suppId"?"green":"red"}>
                    Supplier
                    <br/>食品编号：{foodNum}
                    <br/>供应商编号：{suppId}
                    <br/>出厂日期：{outDate}
                    <br/>配料：{ingredient}
                    <br/>产地：{original}
                    <br/>食品图片：{foodImg}
                </Timeline.Item>
                <Timeline.Item color={transId !== "transId"?"green":"red"}>
                    Transport
                    <br/>运输编号：{transId}
                    <br/>温度：{temp}
                </Timeline.Item>
                <Timeline.Item color={transId !== "transId"?"green":"red"}>
                    Retail
                    <br/>零售商编号：{retailId}
                </Timeline.Item>
                <Timeline.Item color={transId !== "transId"?"green":"red"}>Finish</Timeline.Item>
            </Timeline> 

            The status displaying <Tag color="green">green</Tag> means that the procedure has finished.
            <br/>
            While the <Tag color="red">red</Tag> means that the procedure is lack of information.
            </Modal>
        </div>
        )
    }
}

export default InfoTimeline;
import React, {Component} from 'react';
import {Form, Button, Input} from 'antd';
import '../../css/RolesAdd.css';

class TransAddForm extends Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="transForm">
                <Form hideRequiredMark>
                <Form.Item label={<span>食品编号</span>}>
                    {getFieldDecorator('foodNum', {
                        rules: [{ required: true, message: 'Please input foodum!' }],
                    })(<Input/>)}
                </Form.Item>
                <Form.Item label="物流编号">
                    {getFieldDecorator('transId', {
                        rules: [{ required: true, message: 'Please input transId!' }],
                    })(<Input/>)}
                </Form.Item>
                <Form.Item label="运输温度">
                    {getFieldDecorator('temp', {
                        rules: [{ required: true, message: 'Please input temp!' }],
                    })(<Input/>)}
                </Form.Item>
                </Form>
                <Button
                type="primary" 
                htmlType="submit"
                style={{marginTop:16,width:"100%",}}>
                    Start Upload
                </Button>
            </div>
        )
    }
}

const TransAdd = Form.create({ name: 'TransAdd' })(TransAddForm);
export default TransAdd;
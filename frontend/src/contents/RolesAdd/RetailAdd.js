import React, {Component} from 'react';
import {Form, Button, Input} from 'antd';

class RetailAddForm extends Component {
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
                <Form.Item label="零售编号">
                    {getFieldDecorator('retailId', {
                        rules: [{ required: true, message: 'Please input retailId!' }],
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

const RetailAdd = Form.create({ name: 'RetailAdd' })(RetailAddForm);
export default RetailAdd;
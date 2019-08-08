import React, { Component } from 'react';
import {Form, Button, Radio, Input, Icon} from 'antd';
import "../css/ApplyToChain.css";

class ApplyToChain_Form extends Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="divForm">
                <Form className="login-form" onSubmit={this.handleSubmit}>
                    <Form.Item>
                        {getFieldDecorator('roleid', {
                            rules: [{ required: true, message: 'Please input your roleid!' }],
                        })(
                            <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="RoleId"
                            />,
                        )}
                    </Form.Item>

                    <Form.Item>
                        {getFieldDecorator('rolename', {
                            rules: [{ required: true, message: 'Please input your rolename!' }],
                        })(
                            <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="RoleName"
                            />,
                        )}
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

const ApplyToChain = Form.create({ name: 'applytochain' })(ApplyToChain_Form);

export default ApplyToChain;
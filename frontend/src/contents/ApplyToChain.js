import React, { Component } from 'react';
import {Form, Upload, Button, message, Radio, Input, Icon, AutoComplete} from 'antd';
import reqwest from 'reqwest';
import "../css/ApplyToChain.css";

class ApplyToChain_Form extends Component {

    state = {
        fileList:[],
        uploading:false,
        roleId:'',
        roleName:'',
        role:0,
    }

    handleUpload = () => {
        const { fileList,role} = this.state;
        const formData = new FormData();
        fileList.forEach(file => {
          formData.append('files[]', file);
        });    
        this.setState({
          uploading: true,
        });    
        console.log(role)
        // You can use any AJAX library you like
        reqwest({
          url: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
          method: 'post',
          processData: false,
          data: formData,
          success: () => {
            this.setState({
              fileList: [],
              uploading: false,
            });
            message.success('upload successfully.');
          },
          error: () => {
            this.setState({
              uploading: false,
            });
            message.error('upload failed.');
          },
        });
      };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values.roleName);
            this.setState({
              roleId:values.roleId,
              roleName:values.roleName,
            })
          }
        });
    };

    handleChange = e => {
        console.log(e.target.value);
        this.setState({role:e.target.value})
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const {fileList, uploading} = this.state;
        const props = {
            onRemove: file => {
                this.setState(state => {
                  const index = state.fileList.indexOf(file);
                  const newFileList = state.fileList.slice();
                  newFileList.splice(index, 1);
                  return {
                    fileList: newFileList,
                  };
                });
              },
            beforeUpload:file => {
                this.setState(state => ({
                    fileList:[...state.fileList,file]
                }))
                return false;
            },
            fileList,
          };
        return (
            <div className="divForm">
                <Form className="login-form" onSubmit={this.handleSubmit}>
                    <Form.Item>
                        {getFieldDecorator('roleId', {
                            rules: [{ required: true, message: 'Please input your roleid!' }],
                        })(
                            <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="RoleId"
                            />,
                        )}
                    </Form.Item>

                    <Form.Item>
                        {getFieldDecorator('roleName', {
                            rules: [{ required: true, message: 'Please input your rolename!' }],
                        })(
                            <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="RoleName"
                            />,
                        )}
                    </Form.Item>

                    <Radio.Group onChange={this.handleChange} value={this.state.value}  buttonStyle="solid">
                    <Radio value={1}>供应商</Radio>
                    <Radio value={2}>物流公司</Radio>
                    <br />
                    <Radio value={3}>零售商</Radio>
                    <Radio value={4}>监管机构</Radio>
                    </Radio.Group>
                    <div style={{marginTop:16,}}>
                    <Upload {...props}>
                    <Button>
                        <Icon type="upload" />Select File
                    </Button>
                    </Upload>
                    </div>
                    <Button 
                    type="primary" 
                    htmlType="submit"
                    onClick={this.handleUpload}
                    disabled={fileList.length === 0}
                    loading={uploading}
                    style={{marginTop:16,width:"100%",}}>
                        {uploading?'Uploading':'Start Upload'}
                    </Button>
                </Form>
            </div>
        )
    }
}

const ApplyToChain = Form.create({ name: 'applytochain' })(ApplyToChain_Form);

export default ApplyToChain;
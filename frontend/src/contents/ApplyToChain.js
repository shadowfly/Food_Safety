import React, { Component } from 'react';
import {Form, Upload, Button, message, Radio, Input, Icon,} from 'antd';
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
        console.log(fileList[0])
        const formData = new FormData();
        formData.append('files', fileList[0]);
        this.setState({
          uploading: true,
        });    
        console.log(role)
        fetch('http://localhost:8080/roleInsert',{
          method:'PUT',
          mode:'cors',
          body:formData,
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))
        .then(res => {
          this.setState({
            uploading:false
          })
          this.props.form.resetFields()
          message.success("申请信息上传成功，正等待入链")
        })
      };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            this.handleUpload();
          }
        });
    };

    handleRadioChange = e => {
        console.log(e.target.value);
        this.setState({role:e.target.value})
    }

    onFileChange = (info) => {
        let fileList = [...info.fileList];
        fileList = fileList.slice(-1);//limit the number of uploaded files
        this.setState({ fileList });
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
                console.log(file)
                return false;
            },
            onChange:this.onFileChange,
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
                    
                    <Form.Item>
                        {getFieldDecorator('role',{
                          rules: [{ required: true, message: 'Please input your role!' }],
                        })(
                          <Radio.Group onChange={this.handleRadioChange}  buttonStyle="solid">
                          <Radio value="supp">供应商</Radio>
                          <Radio value="trans">物流公司</Radio>
                          <br />
                          <Radio value="retail">零售商</Radio>
                          <Radio value="superwise">监管机构</Radio>
                          </Radio.Group>,
                        )}
                    </Form.Item>

                    <div style={{marginTop:16,width:"100%",}}>
                    <Upload {...props} >
                    <Button>
                        <Icon type="upload" />Select File
                    </Button>
                    </Upload>
                    </div>
                    <Button 
                    type="primary" 
                    htmlType="submit"
                    onClick={this.handleSubmit}
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
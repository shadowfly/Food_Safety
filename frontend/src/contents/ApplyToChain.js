import React, { Component } from 'react';
import {Form, Upload, Button, message, Radio, Input, Icon,} from 'antd';
import "../css/ApplyToChain.css";
import formData2JSON from '../utils/formData2JSON';

class ApplyToChain_Form extends Component {

    state = {
        fileList:[],
        uploading:false,
        roleId:'',
        roleName:'',
        role:0,
    }

    handleUpload = (values) => {
        const { fileList} = this.state;
        const formData = new FormData();
        formData.append('file', fileList[0]);
        formData.append('roleName',values.roleName);
        formData.append('roleId',values.roleId);
        formData.append('role',values.role);
        this.setState({
          uploading: true,
        });    
        var formJSON = formData2JSON(formData)
        fetch('http://localhost:8080/roleInsert',{
          method:'POST',
          mode:'cors',
          body:formJSON,
        })
        .then(res => res.json())
        .catch(err => console.log(err))
        .then(res => {
          this.setState({
            uploading:false
          })
          console.log(res)
          this.props.form.resetFields()
          message.success("上传成功");
        })
      };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            this.handleUpload(values);
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
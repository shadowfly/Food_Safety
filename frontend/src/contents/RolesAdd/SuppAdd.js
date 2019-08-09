import React, {Component} from 'react';
import {Form, Input, Upload, Button, Icon} from 'antd';
import '../../css/RolesAdd.css';

class SuppAddForm extends Component {

    state = {
        fileList:[],
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const {fileList} = this.state;
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
            <div className="suppForm">
                <Form hideRequiredMark>
                    <Form.Item label={<span>&nbsp;&nbsp;&nbsp;食品编号</span>}>
                        {getFieldDecorator('foodNum', {
                            rules: [{ required: true, message: 'Please input foodum!' }],
                        })(<Input/>)}
                    </Form.Item>
                    <Form.Item label="供应商编号">
                        {getFieldDecorator('suppId', {
                            rules: [{ required: true, message: 'Please input suppId!' }],
                        })(<Input/>)}
                    </Form.Item>
                    <Form.Item label={<span>&nbsp;&nbsp;&nbsp;出厂日期</span>}>
                        {getFieldDecorator('outDate', {
                            rules: [{ required: true, message: 'Please input outDate!' }],
                        })(<Input/>)}
                    </Form.Item>
                    <Form.Item label={<span>&nbsp;&nbsp;&nbsp;生产配料</span>}>
                        {getFieldDecorator('ingredient', {
                            rules: [{ required: true, message: 'Please input ingredient!' }],
                        })(<Input/>)}
                    </Form.Item>
                    <Form.Item label={<span>&nbsp;&nbsp;&nbsp;生产产地</span>}>
                        {getFieldDecorator('origin', {
                            rules: [{ required: true, message: 'Please input origin!' }],
                        })(<Input/>)}
                    </Form.Item>
                    <div style={{marginTop:16,marginRight:50}}>
                    <Upload {...props}>
                    <Button>
                        <Icon type="upload" />Select File
                    </Button>
                    </Upload>
                    </div>
                    <Button 
                    type="primary" 
                    htmlType="submit"
                    style={{marginTop:16,width:"100%",}}>
                        Start Upload
                    </Button>
                </Form>
            </div>
        )
    }
}

const SuppAdd = Form.create({ name: 'SuppAdd' })(SuppAddForm);

export default SuppAdd;
import React, {Component} from 'react';
import {Form, Input, Upload, Button, Icon, message} from 'antd';
import '../../css/RolesAdd.css';
import formData2JSON from '../../utils/formData2JSON';

class SuppAddForm extends Component {

    state = {
        fileList:[],
        foodNum:'',
        suppId:'',
        outDate:'',
        ingredient:'',
        origin:'',
        uploading:false,
    }

    handleUpload = (values) => {
        const { fileList} = this.state;
        const formData = new FormData();
        formData.append('file', fileList[0]);
        formData.append('foodNum',values.foodNum);
        formData.append('suppId',values.suppId);
        formData.append('outDate',values.outDate);
        formData.append('ingredient',values.ingredient);
        formData.append('origin',values.origin);
        this.setState({
          uploading: true,
        });    
        var formJSON = formData2JSON(formData)
        fetch('http://localhost:8080/suppAdd',{
          method:'POST',
          mode:'cors',
          body:formJSON,
          headers: new Headers({
            'Content-Type': 'application/json',
          })
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

      onFileChange = (info) => {
        let fileList = [...info.fileList];
        fileList = fileList.slice(-1);//limit the number of uploaded files
        this.setState({ fileList });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const {fileList,uploading} = this.state;
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
            onChange:this.onFileChange,
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
                    style={{marginTop:16,width:"100%",}}
                    onClick={this.handleSubmit}
                    disabled={fileList.length === 0}>
                        {uploading?'Uploading':'Start Upload'}
                    </Button>
                </Form>
            </div>
        )
    }
}

const SuppAdd = Form.create({ name: 'SuppAdd' })(SuppAddForm);

export default SuppAdd;
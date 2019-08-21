import React, {Component} from 'react';
import {Form, Button, Input,message} from 'antd';
import formData2JSON from '../../utils/formData2JSON';

class RetailAddForm extends Component {

    state = {
        uploading:false
    }

    handleUpload = (values) => {
        const formData = new FormData();
        formData.append('foodNum',values.foodNum);
        formData.append('retailId',values.retailId);
        this.setState({
          uploading: true,
        });    
        var formJSON = formData2JSON(formData)
        fetch('http://localhost:8080/retailAdd',{
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

    render() {
        const { getFieldDecorator } = this.props.form;
        const {uploading} = this.state;
        return (
            <div className="transForm">
                <Form hideRequiredMark>
                <Form.Item label={<span>食品编号</span>}>
                    {getFieldDecorator('foodNum', {
                        rules: [{ required: true, message: 'Please input foodum!' }],
                    })(<Input/>)}
                </Form.Item>
                <Form.Item label="商家编号">
                    {getFieldDecorator('retailId', {
                        rules: [{ required: true, message: 'Please input retailId!' }],
                    })(<Input/>)}
                </Form.Item>
                </Form>
                <Button
                type="primary" 
                htmlType="submit"
                onClick={this.handleSubmit}
                style={{marginTop:16,width:"100%",}}>
                    {uploading?'Uploading':'Start Upload'}
                </Button>
            </div>
        )
    }
}

const RetailAdd = Form.create({ name: 'RetailAdd' })(RetailAddForm);
export default RetailAdd;
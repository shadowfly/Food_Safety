import React, {Component} from 'react';
import {Form, Button, Input,message} from 'antd';
import '../../css/RolesAdd.css';
import formData2JSON from '../../utils/formData2JSON';

class TransAddForm extends Component {

    state = {
        uploading:false
    }

    handleUpload = (values) => {
        const formData = new FormData();
        formData.append('foodNum',values.foodNum);
        formData.append('tranId',values.tranId);
        formData.append('temp',values.temp);
        this.setState({
          uploading: true,
        });    
        var formJSON = formData2JSON(formData)
        fetch('http://localhost:8080/transAdd',{
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
                onClick={this.handleSubmit}
                style={{marginTop:16,width:"100%",}}>
                    {uploading?'Uploading':'Start Upload'}
                </Button>
            </div>
        )
    }
}

const TransAdd = Form.create({ name: 'TransAdd' })(TransAddForm);
export default TransAdd;
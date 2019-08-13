import React, {Component} from 'react';
import {Timeline, Icon, Tag,Form,Radio,Input,Button} from 'antd';
import formData2JSON from '../utils/formData2JSON';

class FoodInfoForm extends Component {

    state = {
        value:'',
        role:0,
        roleId:'',
        roleName:'',
        roleImg:'',
    }

    handleInput = (e) => {
        this.setState({
            value:e.target.value
        })
    }

    handleRadio = (e) => {
        this.setState({role:e.target.value})
    }

    handleSelect = (values) => {
        const formData = new FormData();
        formData.append('value', values.num);
        formData.append('role',values.role);
        var formJSON = formData2JSON(formData)
        if (values.role !== "food") {
            fetch('http://localhost:8080/'+values.role+'Select',{
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
                //TODO
                this.setState({
                    roleId:res.roleId,
                    roleName:res.roleName,
                    roleImg:res.roleImg
                })
                this.props.form.resetFields()
              })
        } else {
          //TODO
            console.log("food")
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            this.handleSelect(values);
          }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const {roleId,roleName,roleImg} = this.state;
        return(
            <div className="divForm">
                <Form>
                    <Form.Item label="选择查询对象">
                        {getFieldDecorator('role',{
                          rules: [{ required: true, message: 'Please input your role!' }],
                        })(
                          <Radio.Group onChange={this.handleRadio}  buttonStyle="solid">
                          <Radio value="supp">供应商</Radio>
                          <Radio value="trans">物流公司</Radio>
                          <br />
                          <Radio value="retail">零售商</Radio>
                          <Radio value="supervise">监管机构</Radio>
                          <br />
                          <Radio value="food">食品溯源</Radio>
                          </Radio.Group>,
                        )}
                    </Form.Item>
                    <Form.Item label="输入对象编号">
                    {getFieldDecorator('num',{
                          rules: [{ required: true, message: 'Please input the number!' }],
                        })(
                          <Input allowClear onChange={this.handleInput}/>,
                        )}
                    </Form.Item>
                    <Button 
                    type="primary" 
                    htmlType="submit"
                    onClick={this.handleSubmit}
                    style={{marginTop:16,width:"100%",}}>
                            查询
                    </Button>
                    <p style={{marginTop:16}}>{roleId}</p>
                    <p>{roleName}</p>
                    <p>{roleImg}</p>
                </Form>
            </div>
            // <div style={{marginTop:80,fontWeight:'bold'}}>
            //     <Timeline mode="alternate">
            //         <Timeline.Item color="green">Producting</Timeline.Item>
            //         <Timeline.Item color="red">Supply</Timeline.Item>
            //         <Timeline.Item color="red">
            //         TransportTransportTransportTransportT
            //         ransportTransportTransportTransport
            //         TransportTransportTransportTransport
            //         TransportTransportTransportTransport
            //         TransportTransportTransportTransportTransport</Timeline.Item>
            //         <Timeline.Item color="red">Retail</Timeline.Item>
            //         <Timeline.Item color="red">Finish</Timeline.Item>
            //     </Timeline> 

            //     The status displaying <Tag color="green">green</Tag> means that the procedure has finished.
            //     <br/>
            //     While the <Tag color="red">red</Tag> means that the procedure is lack of information.
            // </div>
        )
    }
}

const FoodInfo = Form.create({ name: 'foodInfo' })(FoodInfoForm);

export default FoodInfo;
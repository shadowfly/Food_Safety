import React, {Component} from 'react';
import {Timeline, Icon, Tag,Form,Radio,Input,Button,message} from 'antd';
import formData2JSON from '../utils/formData2JSON';
import infoTimeline from './InfoTimeline';
import InfoTimeline from './InfoTimeline';

class FoodInfoForm extends Component {

    state = {
        value:'',
        role:0,
        roleId:'',
        roleName:'',
        roleImg:'',
        foodTip:0,
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
            if(values.role !== "food") {
              this.setState({
                roleId:res.roleId,
                roleName:res.roleName,
                roleImg:res.roleImg,
                foodTip:0
              })
            } else {
              this.setState({
                foodTip:1,
                roleId:'',
                roleName:'',
                roleImg:'',
              })
            }
            
            this.props.form.resetFields()
            message.success("查询成功")
          })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            this.handleSelect(values);
          }
        });
    }

    handleModalCancel = () => {
      this.setState({
        foodTip:0
      })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const {roleId,roleName,roleImg,foodTip} = this.state;
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
                    <InfoTimeline visible={foodTip == 1?true:false} handleModalCancel={this.handleModalCancel}/>
                </Form>
            </div>
           
        )
    }
}

const FoodInfo = Form.create({ name: 'foodInfo' })(FoodInfoForm);

export default FoodInfo;
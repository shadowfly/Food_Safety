import React, { Component } from 'react';
import SuppAdd from './RolesAdd/SuppAdd';
import TransAdd from './RolesAdd/RetailAdd';
import RetailAdd from './RolesAdd/RetailAdd';

class AddFoodInfo extends Component {

    constructor(props) {
        super(props)
        this.state = {
            roleAdd:''
        }
    }
   
    //TODO:interact with backend code.
    // componentDidMount = () => {
    //     fetch('/api/hello')
    //     .then(res => res.text())
    //     .then(message => this.setState({message:message}))
    // }

    render() {
        return(
            <div>
                hello add food AddFoodInfo
            </div>
        )
    }
}

export default AddFoodInfo;
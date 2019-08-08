import React, { Component } from 'react';
import {PageHeader} from 'antd';

class AddFoodInfo extends Component {
    render() {
        return(
            <div>
                <PageHeader 
                title="早上好，供应商"
                subTitle="请在下方输入食品信息"
                />
            </div>
        )
    }
}

export default AddFoodInfo;
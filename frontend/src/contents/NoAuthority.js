import React,{Component} from 'react';
import {Result} from 'antd';

class NoAuthority extends Component {

    render() {
        return (
            <Result 
                status="warning"
                title="没有操作权限"
            />
        )
    }

}

export default NoAuthority;
import React, {Component} from 'react';
import {Timeline, Icon, Tag,Form} from 'antd';

class FoodInfo extends Component {

    render() {
        return(
            <div>
                <Form>
                    <Form.Item></Form.Item>
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

export default FoodInfo;
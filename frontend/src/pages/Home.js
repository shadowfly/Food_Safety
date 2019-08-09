import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import Introduction from '../doc/introduction.md';

class Home extends Component {

    constructor(props) {
        super(props) 
        this.state = {
            term:null
        }
    }

    componentWillMount = () => {
        fetch(Introduction)
        .then(res=>res.text())
        .then(text=>this.setState({term:text}))
    }

    render() {
        return(
            <div style={{marginTop:20,marginLeft:20,marginRight:20,textAlign:"left"}}>
                <ReactMarkdown source={this.state.term} />
            </div>
        )
    }

}

export default Home;
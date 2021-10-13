import React, { Component } from 'react'
import { Spinner } from 'react-bootstrap';
export default class Loading extends Component {
    render() {
        return <Spinner animation="grow" style={{ margin: "0 auto" ,display:"block"}} />;
    }
}

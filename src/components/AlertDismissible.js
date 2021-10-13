import {Alert,Button} from "react-bootstrap"
import React, { Component } from 'react'

export default class AlertDismissible extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       show:true
    }
  }
  
  hide=()=>{
   this.setState({
     show:false
   })
  }
  render() {
    return (
      <>
        <Alert
          className="position-fixed w-100"
          show={this.state.show}
          variant={this.props.variant}
        >
          <Alert.Heading>{this.props.head}</Alert.Heading>
          <p>{this.props.info}</p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={this.hide} variant="outline-success">
              Close
            </Button>
          </div>
        </Alert>
      </>
    );
  }
}

AlertDismissible.defaultProps = {
  variant: "danger",
};
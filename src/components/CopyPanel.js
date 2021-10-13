import React, { Component, Fragment } from 'react'
import { Button, Form } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {} from "../css/style.css";

export default class CopyPanel extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
          copied:false   
        }
    }
    
    render() {
        return (
          <Fragment>
            <Form className="my-3 position-relative">
              <Form.Group className="mb-1" controlId="formBasicEmail">
                <CopyToClipboard
                  text={this.props.text}
                >
                  <Button variant="primary" className="copy-btn">
                    {this.state.copied === true ? "Copied" : "Copy"}
                  </Button>
                </CopyToClipboard>
                <Form.Control
                  as="textarea"
                  className="copy-textarea"
                  rows={5}
                  required
                  defaultValue={this.props.text}
                  readOnly
                />
              </Form.Group>
            </Form>
          </Fragment>
        );
    }
}

import React, { Component, Fragment } from "react";
import { Container, Button,Form} from "react-bootstrap";
import AlertDismissible from "./AlertDismissible";
import {} from "../css/style.css";
import Loading from "./Loading";
import axios from "axios";
import { capitalizeSentence } from "../Utility"
import CopyPanel from "./CopyPanel";

export default class AddNTF extends Component {
  constructor(props) {
    super(props);

    this.state = {
      netError: "",
      loadingStatus: false,
      privateKey: "",
      fileLocation: "",
      nft: "",
      signature:"",
      copied:false
    };
  }

  handleField = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  add = (event) => {
    event.preventDefault();
    this.setState({
      loadingStatus: true,
      netError:"",
      signature:""
    });
    axios({
      method: "post",
      url: `http://localhost:5000/api/add/nft`,
      data: {
        private_key: this.state.privateKey,
        nft: this.state.nft,
        file_location: this.state.fileLocation,
      },
    })
      .then((response) => {
        
           let message = capitalizeSentence(response.data.message);
        if (response.data.code === "201") {
          let data = response.data;
          this.setState({
            netError: (
              <AlertDismissible
              variant="success"
                head="Success"
                info={message}
              ></AlertDismissible>
            ),
            loadingStatus: false,
            copied: false,
            signature: data.data.signature,
          });
        }


         if (response.data.code[0] === "4") {
           this.setState({
             netError: (
               <AlertDismissible
                 head="Input Error"
                 info={message}
               ></AlertDismissible>
             ),
             loadingStatus: false,
             signature:""
           });
         }

      })
      .catch((err) => {
        this.setState({
          netError: (
            <AlertDismissible
              head="Network Error"
              info="Problem is in the network. Refreash the page and try again"
            ></AlertDismissible>
          ),
          loadingStatus:false,
          signature:""
        });
      });
  };

  render() {
    return (
      <Fragment>
        {this.state.netError}
        <Container className="mt-4">
          <h1 className="text-center">Add NFT</h1>
          {this.state.loadingStatus === true ? (
            <Loading className="my-3"></Loading>
          ) : (
            ""
          )}

          {this.state.loadingStatus === false ? (
            <Fragment>
              <Form className="px-1 py-1" onSubmit={this.add}>
                <Form.Group className="mb-3 row" controlId="formBasicEmail">
                  <Form.Label className="col-lg-2">NFT</Form.Label>
                  <Form.Control
                    className="col"
                    type="text"
                    placeholder="Enter NFT"
                    name="nft"
                    value={this.state.nft}
                    onChange={this.handleField}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3 row" controlId="formBasicEmail">
                  <Form.Label className="col-lg-2">Private Key</Form.Label>
                  <Form.Control
                    className="col"
                    as="textarea"
                    rows={5}
                    name="privateKey"
                    value={this.state.privateKey}
                    onChange={this.handleField}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3 row" controlId="formBasicEmail">
                  <Form.Label className="col-lg-2">URL</Form.Label>
                  <Form.Control
                    className="col"
                    type="url"
                    placeholder="Enter URL"
                    name="fileLocation"
                    value={this.state.fileLocation}
                    onChange={this.handleField}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Add
                </Button>
              </Form>
              {
                Boolean(this.state.signature)===true?(<CopyPanel text={this.state.signature}></CopyPanel>):("")
              }
             
            </Fragment>
          ) : (
            ""
          )}
        </Container>
      </Fragment>
    );
  }
}

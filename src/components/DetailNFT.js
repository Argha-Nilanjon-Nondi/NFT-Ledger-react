import React, { Component, Fragment } from "react";
import { Container, Button, Form } from "react-bootstrap";
import AlertDismissible from "./AlertDismissible";
import {} from "../css/style.css";
import Loading from "./Loading";
import axios from "axios";
import { capitalizeSentence } from "../Utility";

export default class DetailNTF extends Component {
  constructor(props) {
    super(props);

    this.state = {
      netError: "",
      loadingStatus: false,
      fileLocation: "",
      nft: "",
      signature: "",
      sellerPublicKey:"",
      buyerPublicKey:"",
      eventDate:"",
      copyPanel: false
    };
  }

  handleField = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  detail = (event) => {
    event.preventDefault();
    this.setState({
      loadingStatus: true,
      netError: "",
      copyPanel:false
    });
    axios({
      method: "post",
      url: `http://localhost:5000/api/detail/nft`,
      data: {
        nft: this.state.nft
      },
    })
      .then((response) => {
        let message = capitalizeSentence(response.data.message);
        if (response.data.code === "202") {
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
            copyPanel:true,
            signature: data.data.signature,
            sellerPublicKey:data.data.seller_public_key,
            buyerPublicKey:data.data.buyer_public_key,
            fileLocation:data.data.file_location,
            eventDate:data.data.event_date
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
            copyPanel:true
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
          loadingStatus: false,
          copyPanel:false
        });
      });
  };

  render() {
    return (
      <Fragment>
        {this.state.netError}
        <Container className="mt-4">
          <h1 className="text-center">Detail NFT</h1>
          {this.state.loadingStatus === true ? (
            <Loading className="my-3"></Loading>
          ) : (
            ""
          )}

          {this.state.loadingStatus === false ? (
            <Fragment>
              <Form className="px-1 py-1" onSubmit={this.detail}>
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
                <Button variant="primary" type="submit">
                  Info
                </Button>
              </Form>
              {this.state.copyPanel === true ? (
                <Form className="px-1 py-1 mt-4">
                  <Form.Group className="mb-3 row" controlId="formBasicEmail">
                    <Form.Label className="col-lg-2">NFT</Form.Label>
                    <Form.Control
                      className="col"
                      type="text"
                      value={this.state.nft}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 row" controlId="formBasicEmail">
                    <Form.Label className="col-lg-2">
                      Seller Public Key
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      className="col"
                      type="text"
                      value={this.state.sellerPublicKey}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 row" controlId="formBasicEmail">
                    <Form.Label className="col-lg-2">
                      Buyer Public Key
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      className="col"
                      type="text"
                      value={this.state.buyerPublicKey}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 row" controlId="formBasicEmail">
                    <Form.Label className="col-lg-2">URL</Form.Label>
                    <Form.Control
                      className="col"
                      type="url"
                      value={this.state.fileLocation}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 row" controlId="formBasicEmail">
                    <Form.Label className="col-lg-2">Date of Event</Form.Label>
                    <Form.Control
                      className="col"
                      type="datetime"
                      value={this.state.eventDate}
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3 row" controlId="formBasicEmail">
                    <Form.Label className="col-lg-2">
                      Signature
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      className="col"
                      type="text"
                      value={this.state.signature}
                    />
                  </Form.Group>
                </Form>
              ) : (
                ""
              )}
            </Fragment>
          ) : (
            ""
          )}
        </Container>
      </Fragment>
    );
  }
}

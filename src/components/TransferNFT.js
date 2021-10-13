import React, { Component, Fragment } from "react";
import { Container, Button, Form } from "react-bootstrap";
import AlertDismissible from "./AlertDismissible";
import {} from "../css/style.css";
import Loading from "./Loading";
import axios from "axios";
import { capitalizeSentence } from "../Utility";
import CopyPanel from "./CopyPanel";

export default class TransferNTF extends Component {
  constructor(props) {
    super(props);

    this.state = {
      netError: "",
      loadingStatus: false,
      sellerPrivateKey: "",
      buyerPublicKey:"",
      nft: "",
      signature: "",
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
      netError: "",
      signature:""
    });
    axios({
      method: "post",
      url: `http://localhost:5000/api/transfer/nft`,
      data: {
        seller_private_key: this.state.sellerPrivateKey,
        nft: this.state.nft,
        buyer_public_key:this.state.buyerPublicKey
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
            signature: data.data.signature,
          });
        }

        if (response.data.code[0] === "4") {
          this.setState({
            netError: (
              <AlertDismissible
                head="Error"
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
          loadingStatus: false,
          signature:""
        });
      });
  };

  render() {
    return (
      <Fragment>
        {this.state.netError}
        <Container className="mt-4">
          <h1 className="text-center">Transfer NFT</h1>
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
                  <Form.Label className="col-lg-2">
                    Seller Private Key
                  </Form.Label>
                  <Form.Control
                    className="col"
                    as="textarea"
                    rows={5}
                    name="sellerPrivateKey"
                    value={this.state.sellerPrivateKey}
                    onChange={this.handleField}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3 row" controlId="formBasicEmail">
                  <Form.Label className="col-lg-2">
                    Buyer Public Key
                  </Form.Label>
                  <Form.Control
                    className="col"
                    as="textarea"
                    rows={5}
                    name="buyerPublicKey"
                    value={this.state.buyerPublicKey}
                    onChange={this.handleField}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Transfer
                </Button>
              </Form>
              {Boolean(this.state.signature) === true ? (
                <CopyPanel text={this.state.signature}></CopyPanel>
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

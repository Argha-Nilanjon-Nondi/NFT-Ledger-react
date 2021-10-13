import React, { Component, Fragment } from "react";
import { Container, Button, Form, Badge } from "react-bootstrap";
import AlertDismissible from "./AlertDismissible";
import {} from "../css/style.css";
import Loading from "./Loading";
import axios from "axios";
import { capitalizeSentence } from "../Utility";

export default class VerifySignature extends Component {
  constructor(props) {
    super(props);

    this.state = {
      netError: "",
      loadingStatus: false,
      sellerPublicKey: "",
      signature: "",
      verifyStatus: "not_checked",
    };
  }

  handleField = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  verify = (event) => {
    event.preventDefault();
    this.setState({
      verifyStatus: "not_checked",
      loadingStatus: true,
      netError: "",
    });
    axios({
      method: "post",
      url: `http://localhost:5000/api/verify/signature`,
      data: {
        seller_public_key: this.state.sellerPublicKey,
        signature: this.state.signature,
      },
    })
      .then((response) => {
        let message = capitalizeSentence(response.data.message);
        if (response.data.code === "200") {
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
            verifyStatus: data.data.status,
          });
        }

        if (response.data.code[0] === "4") {
          this.setState({
            netError: (
              <AlertDismissible head="Error" info={message}></AlertDismissible>
            ),
            loadingStatus: false,
            verifyStatus: "not_checked",
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
          verifyStatus: "not_checked",
        });
      });
  };

  render() {
    return (
      <Fragment>
        {this.state.netError}
        <Container className="mt-4">
          <h1 className="text-center">Verify Signature</h1>
          {this.state.loadingStatus === true ? (
            <Loading className="my-3"></Loading>
          ) : (
            ""
          )}

          <div className="d-flex align-items-center justify-content-center my-1 mx-1">
            <h4 className="mx-1">Status:</h4>
            <div>
              {this.state.verifyStatus === "not_checked" ? (
                <Badge bg="warning" className="fs-5">
                  Not Checked
                </Badge>
              ) : (
                ""
              )}
              {this.state.verifyStatus === false ? (
                <Badge bg="danger" className="fs-5">
                  False
                </Badge>
              ) : (
                ""
              )}
              {this.state.verifyStatus === true ? (
                <Badge bg="success" className="fs-5">
                  True
                </Badge>
              ) : (
                ""
              )}
            </div>
          </div>

          {this.state.loadingStatus === false ? (
            <Fragment>
              <Form className="px-1 py-1" onSubmit={this.verify}>
                <Form.Group className="mb-3 row" controlId="formBasicEmail">
                  <Form.Label className="col-lg-2">
                    Seller Public Key
                  </Form.Label>
                  <Form.Control
                    className="col"
                    as="textarea"
                    rows={5}
                    name="sellerPublicKey"
                    value={this.state.sellerPublicKey}
                    onChange={this.handleField}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3 row" controlId="formBasicEmail">
                  <Form.Label className="col-lg-2">Signature</Form.Label>
                  <Form.Control
                    className="col"
                    as="textarea"
                    rows={5}
                    name="signature"
                    value={this.state.signature}
                    onChange={this.handleField}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Verify
                </Button>
              </Form>
            </Fragment>
          ) : (
            ""
          )}
        </Container>
      </Fragment>
    );
  }
}

import React, { Component, Fragment } from "react";
import { Container, Card, Button,Form } from "react-bootstrap";
import axios from "axios";
import { capitalizeSentence } from "../Utility";
import AlertDismissible from "./AlertDismissible";
import Loading from "./Loading";

export default class Own extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sellerPanelStatus: false,
      buyerPanelstatus: false,
      asSellerData: [],
      asBuyerData: [],
      loadingSeller: false,
      loadingBuyer: false,
    };
  }

  getSellerData = () => {
    this.setState({
      sellerPanelStatus: false,
      loadingSeller: true,
      asSellerData: [],
      netError:""
    });

    axios({
      method: "post",
      url: `http://localhost:5000/api/profile/seller`,
      data: {
        public_key:localStorage.getItem("public_key")
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
            asSellerData: data.data.as_seller,
            sellerPanelStatus: true,
            loadingSeller: false,
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
            asSellerData:[],
            sellerPanelStatus: false,
            loadingSeller: false,
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
          asSellerData: [],
          sellerPanelStatus: false,
          loadingSeller: false,
        });
      });
  };

  getBuyerData = () => {
    this.setState({
      buyerPanelStatus: false,
      loadingBuyer: true,
      asBuyerData: [],
      netError:""
    });

    axios({
      method: "post",
      url: `http://localhost:5000/api/profile/buyer`,
      data: {
        public_key: localStorage.getItem("public_key"),
      },
    })
      .then((response) => {
        let message = capitalizeSentence(response.data.message);
        if (response.data.code === "200") {
          let data = response.data;
          console.log(data);
          this.setState({
            netError: (
              <AlertDismissible
                variant="success"
                head="Success"
                info={message}
              ></AlertDismissible>
            ),
            asBuyerData: data.data.as_buyer,
            buyerPanelStatus: true,
            loadingBuyer: false,
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
            buyerPanelStatus: false,
            loadingBuyer: false,
            asBuyerData: [],
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
          asBuyerData: [],
          buyerPanelStatus: false,
          loadingBuyer: false,
        });
      });
  };

  getRandom = () => {
    let min = 1;
    let max = 9000000;
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  render() {
    return (
      <Fragment>
        {this.state.netError}
        <Container className="mt-4">
          <h1 className="text-center">Profile</h1>

          {/*Detail Seller*/}
          <div className="container-fluid mt-3">
            <h2 className="text-center fs-3">As Seller</h2>
            {this.state.loadingSeller === true ? (
              <Loading className="my-3"></Loading>
            ) : (
              ""
            )}
            {this.state.sellerPanelStatus === true ? (
              <div className="row justify-content-center">
                {this.state.asSellerData.map((obj) => (
                  <Fragment>
                    {/*Model start */}
                    <div
                      className="modal fade custom-modal"
                      id={`model${obj["no"]}-seller`}
                      key={`model${obj["no"]}-seller`}
                      tabIndex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog custom-modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header custom-modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                              {obj["nft"]}
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            <Form className="px-1 py-1 mt-4">
                              <Form.Group
                                className="mb-3 row"
                                controlId="formBasicEmail"
                              >
                                <Form.Label className="col-lg-2">
                                  Buyer Public Key
                                </Form.Label>
                                <Form.Control
                                  as="textarea"
                                  rows={5}
                                  className="col"
                                  type="text"
                                  defaultValue={obj["buyer_public_key"]}
                                />
                              </Form.Group>
                              <Form.Group
                                className="mb-3 row"
                                controlId="formBasicEmail"
                              >
                                <Form.Label className="col-lg-2">
                                  URL
                                </Form.Label>
                                <Form.Control
                                  className="col"
                                  type="url"
                                  defaultValue={obj["file_location"]}
                                />
                              </Form.Group>

                              <Form.Group
                                className="mb-3 row"
                                controlId="formBasicEmail"
                              >
                                <Form.Label className="col-lg-2">
                                  Date of Event
                                </Form.Label>
                                <Form.Control
                                  className="col"
                                  type="datetime"
                                  defaultValue={obj["event_date"]}
                                />
                              </Form.Group>

                              <Form.Group
                                className="mb-3 row"
                                controlId="formBasicEmail"
                              >
                                <Form.Label className="col-lg-2">
                                  Signature
                                </Form.Label>
                                <Form.Control
                                  as="textarea"
                                  rows={5}
                                  className="col"
                                  type="text"
                                  defaultValue={obj["signature"]}
                                />
                              </Form.Group>
                            </Form>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*Model end*/}

                    <Card
                      className="col-11 col-lg-3 mx-1 my-1"
                      key={`model${obj["no"]}-seller-card`}
                    >
                      <Card.Body>
                        <Card.Title>{obj["nft"]}</Card.Title>
                        <Button
                          variant="primary"
                          data-bs-toggle="modal"
                          data-bs-target={`#model${obj["no"]}-seller`}
                        >
                          Open
                        </Button>
                      </Card.Body>
                    </Card>
                  </Fragment>
                ))}
              </div>
            ) : (
              ""
            )}
            {this.state.loadingSeller === false ? (
              <Button
                variant="primary btn-center my-2"
                onClick={this.getSellerData}
              >
                Get Data
              </Button>
            ) : (
              ""
            )}
          </div>

          {/*Detail Buyer*/}
          <div className="container-fluid mt-3">
            <h2 className="text-center fs-3">As Buyer</h2>
            {this.state.loadingBuyer === true ? (
              <Loading className="my-3"></Loading>
            ) : (
              ""
            )}
            {this.state.buyerPanelStatus === true ? (
              <div className="row justify-content-center">
                {this.state.asBuyerData.map((obj) => (
                  <Fragment>
                    {/*Model start */}
                    <div
                      className="modal fade custom-modal"
                      id={`model${obj["no"]}-buyer`}
                      key={`model${obj["no"]}-buyer`}
                      tabIndex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog custom-modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header custom-modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                              {obj["nft"]}
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            <Form className="px-1 py-1 mt-4">
                              <Form.Group
                                className="mb-3 row"
                                controlId="formBasicEmail"
                              >
                                <Form.Label className="col-lg-2">
                                  Seller Public Key
                                </Form.Label>
                                <Form.Control
                                  as="textarea"
                                  rows={5}
                                  className="col"
                                  type="text"
                                  defaultValue={obj["seller_public_key"]}
                                />
                              </Form.Group>
                              <Form.Group
                                className="mb-3 row"
                                controlId="formBasicEmail"
                              >
                                <Form.Label className="col-lg-2">
                                  URL
                                </Form.Label>
                                <Form.Control
                                  className="col"
                                  type="url"
                                  defaultValue={obj["file_location"]}
                                />
                              </Form.Group>

                              <Form.Group
                                className="mb-3 row"
                                controlId="formBasicEmail"
                              >
                                <Form.Label className="col-lg-2">
                                  Date of Event
                                </Form.Label>
                                <Form.Control
                                  className="col"
                                  type="datetime"
                                  defaultValue={obj["event_date"]}
                                />
                              </Form.Group>

                              <Form.Group
                                className="mb-3 row"
                                controlId="formBasicEmail"
                              >
                                <Form.Label className="col-lg-2">
                                  Signature
                                </Form.Label>
                                <Form.Control
                                  as="textarea"
                                  rows={5}
                                  className="col"
                                  type="text"
                                  defaultValue={obj["signature"]}
                                />
                              </Form.Group>
                            </Form>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*Model end*/}

                    <Card
                      className="col-11 col-lg-3 mx-1 my-1"
                      key={`model${obj["no"]}-buyer-card`}
                    >
                      <Card.Body>
                        <Card.Title>{obj["nft"]}</Card.Title>
                        <Button
                          variant="primary"
                          data-bs-toggle="modal"
                          data-bs-target={`#model${obj["no"]}-buyer`}
                        >
                          Open
                        </Button>
                      </Card.Body>
                    </Card>
                  </Fragment>
                ))}
              </div>
            ) : (
              ""
            )}
            {this.state.loadingBuyer === false ? (
              <Button
                variant="primary btn-center my-2"
                onClick={this.getBuyerData}
              >
                Get Data
              </Button>
            ) : (
              ""
            )}
          </div>
        </Container>
      </Fragment>
    );
  }
}

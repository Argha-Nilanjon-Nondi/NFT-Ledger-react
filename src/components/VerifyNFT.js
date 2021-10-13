import React, { Component, Fragment } from "react";
import { Container, Button, Badge } from "react-bootstrap";
import AlertDismissible from "../components/AlertDismissible";
import {} from "../css/style.css";
import Loading from "./Loading";
import axios from "axios";

export default class VerifyNFT extends Component {
  constructor(props) {
    super(props);

    this.state = {
      verifyStatus: "not_checked",
      netError: false,
      loadingStatus: false,
    };
  }

  verify = () => {
    this.setState({
      loadingStatus: true,
      netError:""
    });
    axios({
      method: "get",
      url: `http://localhost:5000/api/verify/nft`,
    })
      .then((response) => {
        if (response.data.code === "200") {
          let status = response.data.data.status;
          this.setState({
            verifyStatus: status,
            loadingStatus: false,
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
          loadingStatus:false
        });
      });
  };
  render() {
    return (
      <Fragment>
        {this.state.netError}
        <Container className="mt-4">
          <h1 className="text-center">Verify NFT Chain</h1>
          {this.state.loadingStatus === true ? (
            <Loading className="my-3"></Loading>
          ) : (
            ""
          )}

          <div className="d-flex align-items-center justify-content-center mt-4 custom-flex">
            <div className="d-flex align-items-center justify-content-center mx-1">
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
              <Button variant="primary" className="mx-1 my-1" onClick={this.verify}>
                Verify
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

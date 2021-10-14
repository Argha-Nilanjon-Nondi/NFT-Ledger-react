import React, { Fragment,Component } from "react";
import { Nav, Navbar, NavDropdown, Container,Button,Form } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import VerifyNFT from "./components/VerifyNFT";
import VerifyUser from "./components/VerifyUser";
import VerifySignature from "./components/VerifySignature";
import AddNFT from "./components/AddNFT";
import DetailNFT from "./components/DetailNFT"
import TransferNTF from "./components/TransferNFT";
import Own from "./components/Own";
import {} from "./css/style.css"

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      publicKey: "",
    };
  }

  handleField = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <Fragment>
        <Router>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <Navbar.Brand>NFT-Ledger</Navbar.Brand>
              <Nav.Item>
                <Link
                  className="nav-link no-decoration"
                  to="/"
                  style={{ color: "white" }}
                >
                  Profile
                </Link>
              </Nav.Item>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <NavDropdown title="Verify" id="basic-nav-dropdown">
                    <NavDropdown.Item>
                      <Link className="no-decoration" to="/verify_user_chain">
                        {" "}
                        User Chain
                      </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Link className="no-decoration" to="/verify_nft_chain">
                        {" "}
                        NFT Chain
                      </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Link className="no-decoration" to="/verify_signature">
                        {" "}
                        Signature
                      </Link>
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="NFT" id="basic-nav-dropdown">
                    <NavDropdown.Item>
                      <Link className="no-decoration" to="/add_nft">
                        {" "}
                        Add NFT
                      </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Link className="no-decoration" to="/detail_nft">
                        {" "}
                        Detail NFT
                      </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Link className="no-decoration" to="/transfer_nft">
                        {" "}
                        Transfer NFT
                      </Link>
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
              <Button
                variant="primary"
                data-bs-toggle="modal"
                data-bs-target="#set-public-key"
              >
                Set Public Key
              </Button>
            </Container>
          </Navbar>

          {/*Model start */}
          <div
            className="modal fade custom-modal"
            id={`set-public-key`}
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog custom-modal-dialog">
              <div className="modal-content">
                <div className="modal-header custom-modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Set public key
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
                    <Form.Group className="mb-3 row" controlId="formBasicEmail">
                      <Form.Label className="col-lg-2">Public Key</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        className="col"
                        type="text"
                        value={this.state.publicKey}
                        name="publicKey"
                        onChange={this.handleField}
                      />
                    </Form.Group>
                  </Form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={()=>localStorage.setItem("public_key",this.state.publicKey)}
                  >
                    Set
                  </button>
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

          <Switch>
            <Route exact path="/">
              <Own></Own>
            </Route>
            <Route exact path="/verify_user_chain">
              <VerifyUser></VerifyUser>
            </Route>
            <Route exact path="/verify_nft_chain">
              <VerifyNFT></VerifyNFT>
            </Route>
            <Route exact path="/verify_signature">
              <VerifySignature></VerifySignature>
            </Route>
            <Route exact path="/add_nft">
              <AddNFT></AddNFT>
            </Route>
            <Route exact path="/detail_nft">
              <DetailNFT></DetailNFT>
            </Route>
            <Route exact path="/transfer_nft">
              <TransferNTF></TransferNTF>
            </Route>
          </Switch>
        </Router>
      </Fragment>
    );
  }
}

 


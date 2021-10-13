import React, { Fragment } from "react";
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import VerifyNFT from "./components/VerifyNFT";
import VerifyUser from "./components/VerifyUser";
import VerifySignature from "./components/VerifySignature";
import AddNFT from "./components/AddNFT";
import DetailNFT from "./components/DetailNFT"
import TransferNTF from "./components/TransferNFT";
import {} from "./css/style.css"

function App() {
  return (
    <Fragment>
      <Router>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand>NFT-Ledger</Navbar.Brand>
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
          </Container>
        </Navbar>

        <Switch>
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

export default App;

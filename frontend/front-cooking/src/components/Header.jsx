import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Navbar, Nav, Button, Form, Image, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginModal from "../pages/Login";
import "../css/Header.css";
import { CookContext } from "../context/CookContext"; // Import CookContext

function Header() {
  const { user, isAuthenticated, logout } = useContext(CookContext); // Lấy thông tin từ CookContext
  const [show, setShow] = useState(false);
  const [loginHover, setLoginHover] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  
  return (
    <>
      <Navbar bg="light" variant="light" expand="lg" className="header">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold text-uppercase">
            <img src="/avatar_small.png" alt="Logo" />
          </Navbar.Brand>

          <Form className="search-form">
            <div className="search-box">
              <i className="bi bi-search search-icon"></i>
              <input
                type="text"
                className="search-input"
                placeholder="What would you like to cook?"
              />
            </div>
          </Form>

          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/" className="me-3">
                What to Cook
              </Nav.Link>
              <Nav.Link as={Link} to="/recipes" className="me-3">
                Recipes
              </Nav.Link>
              <Nav.Link as={Link} to="/ingredients" className="me-3">
                Ingredients
              </Nav.Link>
              <Nav.Link as={Link} to="/occasions" className="me-3">
                Occasions
              </Nav.Link>
              <Nav.Link as={Link} to="/about-us" className="me-3">
                About Us
              </Nav.Link>

              {isAuthenticated && user ? (
                <div className="d-flex align-items-center">
                  <Button
                    type="button"
                    className="recipe-box-btn me-3"
                    style={{
                      backgroundColor: "#ffe6ff",
                      color: "#f54a85",
                      borderColor: "#ffe6ff",
                    }}
                  >
                    <img src="/check.png" alt="" /> Your Recipe Box
                  </Button>

                  {/* Dropdown Menu */}
                  <Dropdown align="end">
                    <Dropdown.Toggle
                      as={Image}
                      src={user.avatar || '/avatar.png'} // Hiển thị avatar từ thông tin người dùng
                      roundedCircle
                      width={40}
                      height={40}
                      className="user-avatar"
                      alt="User Avatar"
                      style={{ cursor: "pointer" }}
                    />
                    <Dropdown.Menu>
                      {/* <Dropdown.Item as={Link} to="/profile">
                        Profile
                      </Dropdown.Item> */}
                      <Dropdown.Item onClick={logout}>
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              ) : (
                <>
                  {/* Nút Login */}
                  <Button
                    type="button"
                    style={{
                      backgroundColor: loginHover ? "#f54a85" : "#ffe6ff",
                      borderColor: loginHover ? "#ffe6ff" : "#ffe6ff",
                      color: loginHover ? "white" : "#f54a85",
                      transition: "0.3s ease-in-out",
                    }}
                    className="me-3"
                    onMouseEnter={() => setLoginHover(true)}
                    onMouseLeave={() => setLoginHover(false)}
                    onClick={() => setShow(true)}
                  >
                    Login
                  </Button>

                  {/* Nút Subscribe */}
                  <Button
                    type="button"
                    style={{ backgroundColor: "#f54a85", borderColor: "#f54a85" }}
                    className={`btn-subscribe ${subscribed ? "subscribed" : ""}`}
                    onClick={() => setSubscribed(!subscribed)}
                  >
                    {subscribed ? "✓" : "Subscribe"}
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <LoginModal show={show} handleClose={() => setShow(false)} />
    </>
  );
}

export default Header;
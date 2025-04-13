import { Modal, Button, Form, Container, Row, Col } from "react-bootstrap";
import { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Login.css";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import { CookContext } from "../context/CookContext"; // Import CookContext

function LoginModal({ show, handleClose, onLoginSuccess }) {
  const { login, loginWithGoogle, loginWithFacebook, error, loading } = useContext(CookContext); // Sử dụng các hàm từ context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const userData = await login(email, password); // Gọi hàm login từ context
      onLoginSuccess(userData); // Truyền thông tin người dùng lên Header
      handleClose(); // Đóng modal
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Body className="p-0">
        <Container fluid>
          <Row>
            <Col md={5} className="d-none d-md-block p-0 m-0">
              <img
                src="/Image 72.png"
                alt="Login Illustration"
                className="img-fluid rounded-start"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Col>

            <Col md={7} className="p-4">
              <h3 className="fw-bold">Login</h3>
              <p>Enter your email to log in.</p>

              {error && <p className="text-danger">{error}</p>} {/* Hiển thị lỗi nếu có */}

              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Button
                  variant="danger"
                  className="w-100"
                  style={{ backgroundColor: "#f54a85" }}
                  onClick={handleLogin}
                  disabled={loading} // Vô hiệu hóa nút khi đang xử lý
                >
                  {loading ? "Logging in..." : "Continue"}
                </Button>
              </Form>

              <div className="divider">OR</div>
              <p className="terms-text">
                By continuing, you agree to the updated{" "}
                <a href="#">Terms of Sale</a>, <a href="#">Terms of Service</a>,
                and <a href="#">Privacy Policy</a>.
              </p>

              <Button
                className="social-btn google w-100 mb-2"
                onClick={loginWithGoogle}
              >
                <FaGoogle size={16} color="red" /> Continue with Google
              </Button>
              <Button
                className="social-btn facebook w-100"
                onClick={loginWithFacebook}
              >
                <FaFacebook size={16} color="blue" /> Continue with Facebook
              </Button>
              <Button
                className="social-btn apple w-100"
                onClick={loginWithFacebook}
              >
                <FaApple size={16} color="blacke" /> Continue with Apple
              </Button>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;
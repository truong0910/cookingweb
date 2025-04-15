import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Footer() {
  return (
    <footer className="bg-dark text-white py-5">
      <Container>
        <Row>
          {/* Cột 1: About Us */}
          <Col md={4} className="mb-4">
            <h5 className="mb-3">About Us</h5>
            <p>
              Welcome to our website, a wonderful place to explore and learn how to cook like a pro.
            </p>
            <Form className="d-flex">
              <Form.Control
                type="email"
                placeholder="Enter your email"
                className="me-2 rounded-pill"
                style={{ border: 'none' }}
              />
              <Button
                variant="primary"
                className="rounded-pill"
                style={{ backgroundColor: '#ec407a', borderColor: '#ec407a' }}
              >
                Send
              </Button>
            </Form>
          </Col>

          {/* Cột 2: Learn More */}
          <Col md={4} className="mb-4">
            <h5 className="mb-3">Learn More</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-decoration-none"  style={{ color: 'white' }}>Our Cooks</a>
              </li>
              <li>
                <a href="#" className="text-decoration-none"  style={{ color: 'white' }}>See Our Features</a>
              </li>
              <li>
                <a href="#" className="text-decoration-none"  style={{ color: 'white' }}>FAQ</a>
              </li>
              <li>
                <a href="#" className="text-decoration-none"  style={{ color: 'white' }}>Gift Subscription</a>
              </li>
              <li>
                <a href="#" className="text-decoration-none"  style={{ color: 'white' }}>Send Us Feedback</a>
              </li>
            </ul>
          </Col>

          {/* Cột 3: Recipes */}
          <Col md={4} className="mb-4">
            <h5 className="mb-3">Recipes</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-decoration-none"  style={{ color: 'white' }}>What to Cook This Week</a>
              </li>
              <li>
                <a href="#" className="text-decoration-none"  style={{ color: 'white' }}>Pasta</a>
              </li>
              <li>
                <a href="#" className="text-decoration-none"  style={{ color: 'white' }}>Dinner</a>
              </li>
              <li>
                <a href="#" className="text-decoration-none"  style={{ color: 'white' }}>Healthy</a>
              </li>
              <li>
                <a href="#" className="text-decoration-none"  style={{ color: 'white' }}>Vegetarian</a>
              </li>
              <li>
                <a href="#" className="text-decoration-none"  style={{ color: 'white' }}>Vegan</a>
              </li>
              <li>
                <a href="#" className="text-decoration-none"  style={{ color: 'white' }}>Christmas</a>
              </li>
            </ul>
          </Col>
        </Row>

        {/* Phần dưới cùng */}
        <Row className="mt-4 pt-4 border-top border-secondary">
          <Col className="d-flex align-items-center">
            <div className="d-flex align-items-center">
              <img
                src="/white_chefify.png"
                alt="Cheffy Logo"
              />
            </div>
          </Col>
          <Col className="text-center">
            <span>2023 Cheffy Company</span>
          </Col>
          <Col className="text-end">
            <a href="#" className="text-decoration-none me-2" style={{ color: 'white' }}>Term of Service</a> |
            <a href="#" className="text-decoration-none ms-2" style={{ color: 'white' }}>Privacy Policy</a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
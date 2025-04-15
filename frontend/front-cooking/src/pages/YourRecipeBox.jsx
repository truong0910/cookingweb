import React from 'react';
import { Container, Row, Col, Image, Button, Card, Nav, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { RiShareForwardLine } from "react-icons/ri"; 
import { CiBookmark } from "react-icons/ci";
import "bootstrap/dist/css/bootstrap.min.css";
const recipes = [
  { title: "Italian-style tomato salad", time: "14 minutes", image: "Italian-style tomato.png" },
  { title: "Vegetable and shrimp spaghetti", time: "15 minutes", image: "Vegetable and shrimp spaghetti.png" },
  { title: "Lotus delight salad", time: "20 minutes", image: "Lotus delight salad.png" },
  { title: "Snack cakes", time: "21 minutes", image: "Snack cakes.png" },
  { title: "Salad with cabbage and shrimp", time: "32 minutes", image: "Salad with cabbage.png" },
  { title: "Bean, shrimp, and potato salad", time: "32 minutes", image: "Bean, shrimp, and potato salad.png" },
  { title: "Sunny-side up fried eggs", time: "32 minutes", image: "Sunny-side up fried eggs.png" },
  { title: "Lotus delight salad", time: "32 minutes", image: "Lotus delight salad_01.png" }
];

const RecipeCard = ({ recipe }) => (
    <Card className="mb-4 shadow-sm recipe-card">
      <Card.Img variant="top" src={recipe.image} />
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <Card.Title className="fs-6 fw-bold mb-0">{recipe.title}</Card.Title>
          <div
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              backgroundColor: "white", // Màu nền vòng tròn
              border: "1px solid #f54a85", 
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CiBookmark
              style={{
                fontSize: "20px",
                color: "#f54a85",
                cursor: "pointer",
              }}
            />
          </div>
        </div>
        <div className="text-muted small">
        <span
          style={{
            backgroundColor: "#ffe6f0", // Màu nền hồng nhạt
            color: "#f54a85", // Màu chữ
            padding: "2px 8px", // Khoảng cách bên trong
            borderRadius: "8px", // Bo góc
            fontSize: "12px", // Kích thước chữ
          }}
        >
          {recipe.time}
        </span>
      </div>
      </Card.Body>
    </Card>
  );

const YourRecipeBox = () => {
  return (
    <Container className="py-5 mt-5 pt-5">
      <small className="text-muted">
        <Link to="/" className="text-muted text-decoration-none">Home</Link> <span className="mx-1">{'>'}</span>  <span style={{color: '#f54a85'}}>Your Recipe Box</span>
    </small>

      <Row className="align-items-center mb-4 mt-5 pt-5">
        <h3 className='fw-bold'>Emma Gonzalez's Recipe Box</h3>

        <Col xs={2}>
          <Image roundedCircle src="avatar.png" />
        </Col>
        <Col>
          <p className="text-muted">
          Emma Gonzalez is a deputy editor at Cheffly, bringing her expertise as a former cooking editor at The Los Angeles Times. She is also an accomplished author, contributing to numerous cookbooks and food publications. Originally from East Los Angeles, Emma now resides in New York City, where she explores a wide range of culinary delights.
          </p>
          <div className="d-flex align-items-center gap-3">
            <span className="fw-semibold" style={{color:'#f54a85'}}>6.5k Subscribes</span>
            <Button
                    type="button"
                    style={{ backgroundColor: "#f54a85", borderColor: "#f54a85" }}
                  >
                    Share <RiShareForwardLine className="me-1" />
                  </Button>
          </div>
        </Col>
      </Row>

      <Nav variant="tabs" defaultActiveKey="saved">
        <Nav.Item>
          <Nav.Link eventKey="saved">Saved Recipes</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="folders">Folders</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="genevieve">Recipes by Genevieve</Nav.Link>
        </Nav.Item>
      </Nav>

      <Row className="mt-4">
        {recipes.map((r, idx) => (
          <Col md={3} key={idx}>
            <RecipeCard recipe={r} />
          </Col>
        ))}
      </Row>

      <div className="d-flex justify-content-end mt-4">
  <Pagination>
    <Pagination.Prev />
    <Pagination.Item
      active
      className="custom-active"
    >
      {1}
    </Pagination.Item>
    <Pagination.Item>{2}</Pagination.Item>
    <Pagination.Item>{3}</Pagination.Item>
    <Pagination.Item>{4}</Pagination.Item>
    <Pagination.Ellipsis />
    <Pagination.Item>{10}</Pagination.Item>
    <Pagination.Item>{11}</Pagination.Item>
    <Pagination.Next />
  </Pagination>
</div>
    </Container>
  );
};

export default YourRecipeBox;

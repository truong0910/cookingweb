import { useState, useEffect } from "react";
import { Modal, Button, Carousel, Container, Card, Badge, Col, Row } from "react-bootstrap";
import "../css/Home.css";

const images = ["/Image 93.png", "/Image 93.png", "/Image 93.png"];

function Home() {
  const [show, setShow] = useState(false);
  const [index, setIndex] = useState(0); // Trạng thái ảnh đang hiển thị

  useEffect(() => {
    setShow(true);
  }, []);

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const recipes = [
    { title: "Italian-style tomato", time: "15 minutes", img: "/img1.jpg" },
    { title: "Spaghetti with vegetables and shrimp", time: "15 minutes", img: "/img2.jpg" },
    { title: "Lotus delight salad", time: "20 minutes", img: "/img3.jpg" },
    { title: "Snack cakes", time: "21 minutes", img: "/img4.jpg" },
  ];

  const videoRecipes = [
    { title: "Salad with cabbage and shrimp", time: "32 minutes", img: "/img5.jpg" },
    { title: "Salad of cove beans, shrimp and potatoes", time: "20 minutes", img: "/img6.jpg" },
    { title: "Sunny-side up fried egg", time: "15 minutes", img: "/img7.jpg" },
    { title: "Lotus delight salad", time: "20 minutes", img: "/img8.jpg" },
  ];

  return (
    <>
      {/* Background Section */}
      <Container fluid className="home-container">
        <div className="body">
          <img src="/Image 73.png" alt="Background" className="background-image" />

          {/* Recipe of the Day */}
          <Card
            className="recipe-box text-center p-4 pt-5"
            style={{ border: "2px dashed #f54a85", borderRadius: "10px" }}
          >
            <div className="recipe-badge">Recipe of the day</div>
            <Card.Title className="fs-4 fw-bold mt-3" style={{ color: "#f54a85" }}>
              Salad Caprese
            </Card.Title>
            <Card.Text className="text-secondary">
              Classic Italian Salad Caprese: ripe tomatoes, fresh mozzarella, herbs, olive oil, and balsamic vinegar
              create a refreshing dish for lunch or appetizer.
            </Card.Text>
            <div className="d-flex flex-column align-items-center">
              <img
                src="/avatar.png"
                alt="avatar"
                className="rounded-circle mb-2"
                width="40"
                height="40"
              />
              <div className="mb-3 text-muted">Salad Caprese</div>
            </div>
            <div className="d-flex justify-content-center">
              <Button
                style={{
                  backgroundColor: "#f54a85",
                  borderColor: "#f54a85",
                  width: 150,
                }}
              >
                View now →
              </Button>
            </div>
          </Card>
          </div>
          {/* This Summer Recipes Section */}
          <Container className="mt-5 pt-5 text-center">
            <h2 className="text-danger fw-bold">This Summer Recipes</h2>
            <p>We have all your Independence Day sweets covered.</p>
            <Row className="justify-content-center">
              {recipes.map((recipe, idx) => (
                <Col xs={6} md={3} className="my-3" key={idx}>
                  <Card className="h-100 shadow-sm">
                    <Card.Img variant="top" src={recipe.img} />
                    <div className="p-3 text-center">
                      <Card.Title className="fs-6 fw-bold">{recipe.title}</Card.Title>
                      <Badge bg="light" text="danger">
                        {recipe.time}
                      </Badge>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>

          {/* Recipes With Videos Section */}
          <Container className="mt-5 text-center">
            <h2 className="text-danger fw-bold">Recipes With Videos</h2>
            <p>Cooking Up Culinary Creations with Step-by-Step Videos</p>
            <Row className="justify-content-center">
              {videoRecipes.map((recipe, idx) => (
                <Col xs={6} md={3} className="my-3" key={idx}>
                  <Card className="h-100 shadow-sm">
                    <Card.Img variant="top" src={recipe.img} />
                    <div className="p-3 text-center">
                      <Card.Title className="fs-6 fw-bold">{recipe.title}</Card.Title>
                      <Badge bg="light" text="danger">
                        {recipe.time}
                      </Badge>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        
      </Container>

      {/* Modal Section */}
      <Modal size="lg" show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="text-center">
          <h2 style={{ fontWeight: "bold", color: "#FF007F" }}>Discover Chefify</h2>
          <p style={{ color: "#6c757d" }}>
            Easy and delicious cooking instructions right here. Start exploring now!
          </p>
          <div className="d-flex justify-content-center">
            <Carousel
              activeIndex={index}
              onSelect={setIndex}
              interval={3000}
              className="w-100"
            >
              {images.map((img, i) => (
                <Carousel.Item key={i}>
                  <img
                    className="d-block w-100 rounded"
                    src={img}
                    alt={`Slide ${i + 1}`}
                    style={{ borderRadius: "15px" }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <Button
              onClick={handleNext}
              style={{
                backgroundColor: "#FF007F",
                border: "none",
                padding: "5px 100px",
                borderRadius: "20px",
                fontSize: "18px",
              }}
            >
              Next
            </Button>
          </div>
          <div className="d-flex justify-content-center mt-2">
            <Button
              variant="link"
              onClick={() => setShow(false)}
              style={{
                color: "#FF007F",
                textDecoration: "none",
                borderRadius: "1px solid #FF007F",
                padding: "5px 100px",
                fontSize: "18px",
              }}
            >
              Skip
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Home;
import { useState, useEffect } from "react";
import { Modal, Button, Carousel, Container, Card, Col, Row } from "react-bootstrap";
import "../css/Home.css";
import { CiBookmark } from "react-icons/ci";
import axios from "axios"; // Import axios để gọi API
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  const [recipes, setRecipes] = useState([]); // State cho danh sách món ăn
  const [videoRecipes, setVideoRecipes] = useState([]); // State cho danh sách video món ăn
  const [show, setShow] = useState(false);
  const [index, setIndex] = useState(0); // Trạng thái ảnh đang hiển thị

  // Gọi API để lấy danh sách món ăn
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/recipes");
        setRecipes(response.data); // Lưu dữ liệu vào state
      } catch (err) {
        console.error("Error fetching recipes:", err);
      }
    };

    const fetchVideoRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/video-recipes");
        setVideoRecipes(response.data); // Lưu dữ liệu vào state
      } catch (err) {
        console.error("Error fetching video recipes:", err);
      }
    };

    fetchRecipes();
    fetchVideoRecipes();
  }, []);

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % 3); // Giả sử có 3 ảnh trong carousel
  };

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
              backgroundColor: "white",
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
        <div className="text-muted small text-start">
          <span
            style={{
              backgroundColor: "#ffe6f0",
              color: "#f54a85",
              padding: "2px 8px",
              borderRadius: "8px",
              fontSize: "12px",
            }}
          >
            {recipe.time}
          </span>
        </div>
      </Card.Body>
    </Card>
  );

  const VideoRecipesCard = ({ videoRecipes }) => (
    <Card className="mb-4 shadow-sm recipe-card">
      <Card.Img variant="top" src={videoRecipes.image} />
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <Card.Title className="fs-6 fw-bold mb-0">{videoRecipes.title}</Card.Title>
          <div
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              backgroundColor: "white",
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
        <div className="text-muted small text-start">
          <span
            style={{
              backgroundColor: "#ffe6f0",
              color: "#f54a85",
              padding: "2px 8px",
              borderRadius: "8px",
              fontSize: "12px",
            }}
          >
            {videoRecipes.time}
          </span>
        </div>
      </Card.Body>
    </Card>
  );


  return (
    <>
      {/* Background Section */}
      <Container fluid className="home-container pt-5 mt-4">
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
          <h2 className="fw-bold" style={{ color: "#f54a85", fontFamily: "Times New Roman, serif" }}>
            This Summer Recipes
          </h2>
          <p>We have all your Independence Day sweets covered.</p>
          <Row className="mt-4">
            {recipes.map((r, idx) => (
              <Col md={3} key={idx}>
                <RecipeCard recipe={r} />
              </Col>
            ))}
          </Row>
        </Container>

        {/* Recipes With Videos Section */}
        <Container className="mt-5 text-center">
          <h2 className="fw-bold" style={{ color: "#f54a85", fontFamily: "Times New Roman, serif" }}>
            Recipes With Videos
          </h2>
          <p>Cooking Up Culinary Creations with Step-by-Step Videos</p>
          <Row className="mt-4">
            {videoRecipes.map((r, idx) => (
              <Col md={3} key={idx}>
                <VideoRecipesCard videoRecipes={r} />
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
              {["/Image 93.png", "/Image 93.png", "/Image 93.png"].map((img, i) => (
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
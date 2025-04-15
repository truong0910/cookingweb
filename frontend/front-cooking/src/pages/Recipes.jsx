import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Form, Button, Collapse, Card, Pagination } from 'react-bootstrap';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import ReactSlider from 'react-slider';
import { CiBookmark } from 'react-icons/ci';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Recipes.css';
import { CookContext } from '../context/CookContext';

const rating = [
  { img: 'Rating 13.png' },
  { img: 'Rating 12.png' },
  { img: 'Rating 14.png' },
  { img: 'Rating 15.png' },
  { img: 'Rating 11.png' },
];

function Recipes() {
  const { searchQuery } = useContext(CookContext); // Lấy searchQuery từ CookContext
  const [allFood, setAllFood] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(true);
  const [open1, setOpen1] = useState(true);
  const [open2, setOpen2] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState([0, 120]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [tempSelectedTypes, setTempSelectedTypes] = useState([]);
  const [tempSelectedTimeRange, setTempSelectedTimeRange] = useState([0, 120]);
  const [tempSelectedRatings, setTempSelectedRatings] = useState([]);

  useEffect(() => {
    const fetchAllFood = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/allfood');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setAllFood(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAllFood();
  }, []);

  const handleTypeChange = (type) => {
    setTempSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleTimeChange = (value) => {
    setTempSelectedTimeRange(value);
  };

  const handleRatingChange = (rating) => {
    setTempSelectedRatings((prev) =>
      prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]
    );
  };

  // Lọc dữ liệu theo searchQuery, type, time, và rating
  const filteredFood = allFood.filter((food) => {
    // Lọc theo searchQuery
    const matchesSearch = !searchQuery || food.title.toLowerCase().includes(searchQuery.toLowerCase());

    // Lọc theo Type
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(food.type);

    // Lọc theo Time
    const matchesTime =
      parseInt(food.time) >= selectedTimeRange[0] && parseInt(food.time) <= selectedTimeRange[1];

    // Lọc theo Rating
    const matchesRating = selectedRatings.length === 0 || selectedRatings.includes(food.rating);

    return matchesSearch && matchesType && matchesTime && matchesRating;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFood.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredFood.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const AllFoodCard = ({ allFood }) => (
    <Card className="mb-4 shadow-sm recipe-card">
      <Card.Img variant="top" src={allFood.image} />
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <Card.Title className="fs-6 fw-bold mb-0">{allFood.title}</Card.Title>
          <div
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              backgroundColor: 'white',
              border: '1px solid #f54a85',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CiBookmark
              style={{
                fontSize: '20px',
                color: '#f54a85',
                cursor: 'pointer',
              }}
            />
          </div>
        </div>
        <div className="text-muted small text-start">
          <span
            style={{
              backgroundColor: '#ffe6f0',
              color: '#f54a85',
              padding: '2px 8px',
              borderRadius: '8px',
              fontSize: '12px',
            }}
          >
            {allFood.time}
          </span>
        </div>
      </Card.Body>
    </Card>
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Container className="mt-5 pt-5">
      <Row>
        <Col md={3} className="p-3 border-end">
          <h5>Filters</h5>
          <Form>
            <Form.Group className="form-group-bordered p-3">
              <div
                onClick={() => setOpen(!open)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <Form.Label className="mb-0">
                  <strong>Type</strong>
                </Form.Label>
                {open ? <FaChevronUp /> : <FaChevronDown />}
              </div>

              <Collapse in={open}>
                <div>
                  <Row className="pt-2">
                    <Col>
                      <Form.Check
                        type="checkbox"
                        label="Pan-fried"
                        onChange={() => handleTypeChange('Pan-fried')}
                      />
                      <Form.Check
                        type="checkbox"
                        label="Grilled"
                        onChange={() => handleTypeChange('Grilled')}
                      />
                      <Form.Check
                        type="checkbox"
                        label="Sauteed"
                        onChange={() => handleTypeChange('Sauteed')}
                      />
                      <Form.Check
                        type="checkbox"
                        label="Steamed"
                        onChange={() => handleTypeChange('Steamed')}
                      />
                    </Col>
                    <Col>
                      <Form.Check
                        type="checkbox"
                        label="Stir-fried"
                        onChange={() => handleTypeChange('Stir-fried')}
                      />
                      <Form.Check
                        type="checkbox"
                        label="Roasted"
                        onChange={() => handleTypeChange('Roasted')}
                      />
                      <Form.Check
                        type="checkbox"
                        label="Baked"
                        onChange={() => handleTypeChange('Baked')}
                      />
                      <Form.Check
                        type="checkbox"
                        label="Stewed"
                        onChange={() => handleTypeChange('Stewed')}
                      />
                    </Col>
                  </Row>
                </div>
              </Collapse>
            </Form.Group>

            <Form.Group className="form-group-bordered p-3">
              <div
                onClick={() => setOpen1(!open1)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <Form.Label className="mb-0">Time</Form.Label>
                {open1 ? <FaChevronUp /> : <FaChevronDown />}
              </div>

              <Collapse in={open1}>
                <div className="pt-3">
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '10px',
                    }}
                  >
                    <span>{tempSelectedTimeRange[0]} minutes</span>
                    <span>{tempSelectedTimeRange[1]} minutes</span>
                  </div>

                  <ReactSlider
                    className="custom-slider"
                    thumbClassName="custom-thumb"
                    trackClassName="custom-track"
                    min={0}
                    max={120}
                    step={5}
                    value={tempSelectedTimeRange}
                    onChange={handleTimeChange}
                    pearling
                    minDistance={5}
                  />
                </div>
              </Collapse>
            </Form.Group>

            <Form.Group className="form-group-bordered p-3">
              <div
                onClick={() => setOpen2(!open2)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <Form.Label className="mb-0">Rating</Form.Label>
                {open2 ? <FaChevronUp /> : <FaChevronDown />}
              </div>

              <Collapse in={open2}>
                <div className="pt-2">
                  <div className="d-flex flex-wrap">
                    {rating.map((rate, index) => (
                      <div key={index} className="d-flex align-items-center mx-2 mb-2">
                        <Form.Check
                          type="checkbox"
                          className="me-2"
                          onChange={() => handleRatingChange(5 - index)}
                        />
                        <img
                          src={rate.img}
                          alt={`${5 - index} Star`}
                          style={{ height: '20px' }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </Collapse>
            </Form.Group>

            <Form.Group className="form-group-bordered p-3">
              <Button
                variant="primary"
                className="w-100"
                style={{ backgroundColor: '#ec407a', borderColor: '#ec407a' }}
                onClick={() => {
                  setSelectedTypes(tempSelectedTypes);
                  setSelectedTimeRange(tempSelectedTimeRange);
                  setSelectedRatings(tempSelectedRatings);
                  setCurrentPage(1);
                }}
              >
                Apply
              </Button>
            </Form.Group>
          </Form>
        </Col>
        <Col md={9} className="p-3">
          <h5>Recipes</h5>
          <Row className="mt-4">
            {currentItems.map((r, idx) => (
              <Col md={4} key={idx} className="mb-4">
                <AllFoodCard allFood={r} />
              </Col>
            ))}
          </Row>

          <Pagination className="justify-content-center">
            {[...Array(totalPages).keys()].map((page) => (
              <Pagination.Item
                key={page + 1}
                active={page + 1 === currentPage}
                onClick={() => handlePageChange(page + 1)}
              >
                {page + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
}

export default Recipes;
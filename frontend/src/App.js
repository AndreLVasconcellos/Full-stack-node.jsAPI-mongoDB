import React, { useState, useEffect } from "react";
import { Container, Row, Col, Pagination } from "react-bootstrap";
import axios from "axios";
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    axios
      .get(`items/${currentPage}?search=${searchQuery}`)
      .then(res => {
        setItems(res.data.items);
        setPages(res.data.pages);
      })
      .catch(err => console.log(err));
  }, [currentPage, searchQuery]);

  return (
    <Container>
      <input
        type="text"
        value={searchQuery}
        name="busca"
        onChange={e => setSearchQuery(e.target.value)}
        placeholder="Search.."
      />
      <Row>
        {items.map(item => (
          <Col key={item._id}>{item.name}</Col>
        ))}
      </Row>
      <Row className="justify-content-center mt-3">
        <Pagination>
          {[...Array(pages)].map((_, i) => (
            <Pagination.Item
              key={i + 1}
              active={i + 1 === currentPage}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </Row>
    </Container>
  );
};

export default App;

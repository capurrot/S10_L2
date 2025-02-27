/* import { Component } from 'react' */
import SingleBook from "./SingleBook";
import { Col, Form, Row } from "react-bootstrap";
import CommentArea from "./CommentArea";
import { useState } from "react";

/* class BookList extends Component { */
const BookList = (props) => {
  /*   state = {
    searchQuery: '',
    selectedBook: null,
  } */
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  /* 
  changeSelectedBook = (asin) => {
    this.setState({
      selectedBook: asin,
    })
  } */

  /*   render() { */
  return (
    <>
      <Row>
        <Col md={8}>
          <Row className="justify-content-center mt-5">
            <Col xs={12} md={4} className="text-center">
              <Form.Group>
                <Form.Control
                  type="search"
                  placeholder="Cerca un libro"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="g-2 mt-3">
            {props.books
              .filter((b) => b.title.toLowerCase().includes(searchQuery))
              .map((b) => (
                <Col xs={12} md={4} key={b.asin}>
                  <SingleBook book={b} selectedBook={selectedBook} changeSelectedBook={() => setSelectedBook(b.asin)} />
                </Col>
              ))}
          </Row>
        </Col>
        <Col md={4}>
          <CommentArea asin={selectedBook} />
        </Col>
      </Row>
    </>
  );
};
/* } */

export default BookList;

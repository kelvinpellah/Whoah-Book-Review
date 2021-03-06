import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import Logo from "../images/logo.png";
import BookSearch from "./booksearch";
import Book from "../images/book.jpg";

// Generate Columns and Cards for book Display
function BookCol(props) {
  return (
    <Col>
      <Link
        to={{
          pathname: `/bookdetails/${props.title}`,
          bookTitle: props.title,
          author: props.author,
          yearPublished: props.year,
        }}
      >
        <Card className="book_card">
          <Card.Img variant="top" src={Book} />
          <Card.Body>
            <Card.Title>{props.title}</Card.Title>
            <footer className="blockquote-footer">
              by <cite title="Source Title">{props.author}</cite>
            </footer>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
}
class FeaturedBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: "",
      loading: false,
      message: "",
      logoutError:''
    };
  }

  // handle returned books from API

  handleBooks(books) {
    this.setState({
      books: books.map((book) => (
        <BookCol
          key={book.id}
          title={book.title}
          author={book.author}
          isbn={book.isbn}
          year={book.year}
        />
      )),
      loading: false,
      message: "",
      logoutError:''
    });
  }

  // Receive books
  bookList = async (token) => {
    try {
      let res = await axios({
        method: "get",
        url: "http://127.0.0.1:8000/api/books/",
        headers: {
          authorization: `Token ${token}`,
        },
      })
        .then((response) => {
          this.handleBooks(response.data);
        })
        .catch((error) => {
          this.setState({
            books: "",
            message: "Failed to fetch featured books. Check Network.",
            loading: false,
            logoutError:''
          });
        });
    } catch (error) {
      this.setState({
        books: "",
        message: "Something went wrong.",
        loading: false,
        logoutError:''
      });
    }
  };

  componentDidMount() {
    const token = this.props.token;
    if (token) {
      this.setState({
        loading: true,
        message: "",
        books: "",
        logoutError:''
      });
      this.bookList(token);
      this.props.removeToken();
    } else {
      return this.props.history.push("/");
    }
  }

  handleLogout = async () => {
    const stored_token = localStorage.getItem("token");
    const data = new FormData();
    data.append("token", stored_token);
    try {
      let response = await axios({
        url: "http://127.0.0.1:8000/api/logout/",
        method: "post",
        data: data,
      });
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      this.props.history.push("/home");
      this.props.isAuthenticated();
    } catch (error) {
      this.setState({logoutError:'Failed to logout.Try again later.'})
    }
  };

  render() {
    const { books,logoutError, loading, message } = this.state;
    return (
      <div>
        <Navbar className="book_nav">
          <Link to="/home">
            <Navbar.Brand>
              <img
                alt="Website Logo"
                src={Logo}
                width="250"
                height="118"
                className="d-inline-block align-top"
              />
            </Navbar.Brand>
          </Link>
          <Button
            onClick={this.handleLogout}
            variant="secondary"
            className="logout-btn"
            type="submit"
          >
            Logout
          </Button>
        </Navbar>
        <div className="book_search">
          <BookSearch />
        </div>
        <Container>
          <h3>Recommended books for you:</h3>
          <Spinner
            animation="border"
            variant="info"
            className={loading ? "spinner-show" : "spinner-hide"}
          />
          <p className="book-message">{message}</p>
          <div className="register_errors">{logoutError}</div>
          <Row>
            {books[0]}
            {books[1]}
            {books[2]}
            {books[3]}
          </Row>
          <Row>
            {books[4]}
            {books[5]}
            {books[6]}
            {books[7]}
          </Row>
          <Row>
            {books[8]}
            {books[9]}
            {books[10]}
            {books[11]}
          </Row>
        </Container>
      </div>
    );
  }
}

export default FeaturedBooks;

import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";

// Generate Card inputs for search results.
function BookSearchList(props) {
  return (
    <Link
      to={{
        pathname: `/bookdetails/${props.title}`,
        bookTitle: props.title,
        author: props.author,
        yearPublished: props.year,
      }}
    >
      <ListGroup.Item>
        {props.title} ({props.year})
        <footer className="blockquote-footer">
          by <cite title="Source Title">{props.author}</cite>
        </footer>
      </ListGroup.Item>
    </Link>
  );
}

class BookSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      results: "",
      message: "",
      loading: false,
    };
    this.cancel = "";
    this.handleChange = this.handleChange.bind(this);
    this.fetchSearchResults = this.fetchSearchResults.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    const query = event.target.value;
    this.setState({ query, results: "", message: "", loading: true }, () => {
      this.fetchSearchResults(query);
    });
  };

  // handle Search Results

  handleSearchResults = (results) => {
    results.length
      ? this.setState({
          results: results.map((result) => (
            <BookSearchList
              key={result.id}
              title={result.title}
              author={result.author}
              year={result.year}
            />
          )),
          message: "",
          loading: false,
        })
      : this.setState({
          results: "",
          message: "No results.",
          loading: false,
        });
  };

  fetchSearchResults = async (query) => {
    // Remove cancel token when we start
    if (this.cancel) {
      this.cancel.cancel();
    }
    this.cancel = axios.CancelToken.source();
    try {
      if (query.length) {
        let res = await axios
          .get(`http://127.0.0.1:8000/api/book/?search=${query}`, {
            cancelToken: this.cancel.token,
          })
          .then((response) => {
            this.handleSearchResults(response.data);
          })
          .catch((error) => {
            if (!axios.isCancel(error)) {
              this.setState({
                loading: false,
                message: "Failed to fetch books. Please check Network.",
              });
            }
          });
      } else {
        this.setState({
          results: "",
          message: "",
          loading: false,
        });
      }
    } catch (error) {
      console.log("the error is", error);
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.fetchSearchResults(this.state.query);
  };

  render() {
    const { results, message, loading, query } = this.state;
    return (
      <div>
        <Row>
          <Form inline onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Control
                type="input"
                value={query}
                onChange={this.handleChange}
                placeholder="Search by title, author etc"
              />
            </Form.Group>
            <Button className="ml-2 mr-4" type="submit">
              Search
            </Button>
          </Form>
        </Row>
        <Row>
          <Card className={results ? "book-search-card" : "book-search-hide"}>
            <ListGroup>{results}</ListGroup>
          </Card>
          <p className="book-message">{message}</p>
          <Spinner
            animation="border"
            variant="info"
            className={loading ? "spinner-show" : "spinner-hide"}
          />
        </Row>
      </div>
    );
  }
}

export default BookSearch;

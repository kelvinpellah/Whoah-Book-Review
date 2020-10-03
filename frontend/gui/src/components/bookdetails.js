import React from "react";
import { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import { useLocation, useHistory } from "react-router";
import { Link } from "react-router-dom";
import Logo from "../images/logo.png";
import axios from "axios";
import Book from "../images/book.jpg";

// Generate Card inputs for comment results.
function CommentList(props) {
  return (
    <Card className="comment_card">
      <Card.Body>
        <Card.Title>{props.commenter}</Card.Title>
        <Card.Text>{props.comment}</Card.Text>
      </Card.Body>
    </Card>
  );
}

function BookDetails(props) {
  // THE COMMENTED CODE WOULD BE USED TO QUERY A BOOK FROM GOODREADS.
  // DUE TO CORS ISSUES, I FAILED TO RESOLVE.
  // INSTEAD, WILL USE INFO STORED IN MY DATABASE FOR BOOK DETAILS COMPONENT.

  //const [book, setBook] = useState('');
  //const [message,setMessage] = useState('');
  //const [loading,setLoading]= useState(false);
  //
  //
  //// fetch book details from goodreads through API.
  //
  //async function fetchBook(bookTitle, author){
  //    try {
  //        let res = await axios.get('https://www.goodreads.com/book/title.json', {
  //            params: {
  //                key: KEY,
  //                title: bookTitle,
  //                author: author
  //            }
  //        }).then(response =>{
  //            handleBook(response.data);
  //        }).catch(error =>{
  //            setBook('');
  //            setLoading(false);
  //            setMessage('Something went Wrong')
  //            })
  //    } catch (error) {
  //            setBook('');
  //            setLoading(false);
  //            setMessage('Something went Wrong')
  //        }
  //    }
  //
  //
  //useEffect(() => {
  //    setBook('');
  //    setLoading(true);
  //    setMessage('');
  //    fetchBook(bookTitle, author);
  //})
  //
  //
  //
  //function handleBook(bookInfo) {
  //    if (bookInfo.length) {
  //
  //             setLoading(false);
  //        setMessage('');
  //            setBook(
  //                bookInfo.map((info) => (
  //                    <p key={info.id}>{info}</p>
  //                ))
  //            );
  //
  //
  //
  //
  //    }
  //    setBook('');
  //    setLoading(false);
  //    setMessage('Sorry,this book is missing.');
  //}

  const location = useLocation();
  const history = useHistory();
  const { bookTitle, author, yearPublished } = location;
  const [results, setResults] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [messageComment, setMessageComment] = useState("");
  const [comment, setComment] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentError, setCommentError] = useState("");
  // retrieve from session
  const [session_bookTitle, setTitle] = useState("");
  const [session_author, setAuthor] = useState("");
  const [session_yearPublished, setYear] = useState("");

  // handle comment Results

  function handleCommentResults(results) {
    if (results.length) {
      setResults(
        results.map((result) => (
          <CommentList
            key={result.id}
            commenter={result.commenter}
            comment={result.comment}
          />
        ))
      );
      setLoading(false);
      setMessage(false);
    } else {
      setResults("");
      setMessage("No comments yet.");
      setLoading(false);
    }
  }

  // FETCH COMMENTS AND DISPLAY
  async function fetchComments(title) {
    try {
      if (title.length) {
        let res = await axios
          .get(`http://127.0.0.1:8000/api/comment/?search=${title}`)
          .then((response) => {
            handleCommentResults(response.data);
          })
          .catch((error) => {
            setResults("");
            setMessage("Something went wrong.Check network.");
            setLoading(false);
          });
      }
    } catch (error) {
      setResults("");
      setMessage("Something went wrong.Check network.");
      setLoading(false);
    }
  }

  useEffect(() => {
    if (bookTitle) {
      const bookDetails = {
        title: bookTitle,
        author: author,
        year: yearPublished,
      };
      const bookSession = JSON.stringify(bookDetails);
      sessionStorage.setItem("bookDetails", bookSession);
      fetchComments(bookTitle);
      setLoading(true);
      setMessage("");
      setResults("");
    }
    try {
      const bookDetails = sessionStorage.getItem("bookDetails");
      const book = JSON.parse(bookDetails);
      const session_bookTitle = book.title;
      const session_author = book.author;
      const session_yearPublished = book.year;
      setTitle(session_bookTitle);
      setAuthor(session_author);
      setYear(session_yearPublished);
      fetchComments(session_bookTitle);
      setLoading(true);
      setMessage("");
      setResults("");
    } catch (error) {
      setMessage("Something went wrong.Redirecting to search.");
      setLoading(false);
      setResults("");
      setTimeout(() => {
        history.push("/");
      }, 3000);
    }
  }, [bookTitle]);

  // FOLLOWING LINES WILL BE USED TO SEND COMMENTS TO DB
  //const [comment,setComment] = useState('');
  //const [commentError,setCommentError] = useState('');
  //const [commentError,setCommentError1] = useState('');
  //
  //inputChange = (event) => {
  //    setComment(() => {
  //        event.target.value;
  //    })
  //}
  //
  //sendData = async () => {
  //
  //    const form = new FormData();
  //    form.append('comment', comment);
  //    form.append('commenter',);
  //    form.append('book', bookTitle);
  //    try {
  //        let res = await axios.post('http://127.0.0.1:8000/api/comment/',
  //    {
  //        data: form
  //    }).then(response => {
  //        handleResponse(response.data);
  //    }).catch(error => {
  //        console.log('error is',error);
  //    })
  //    } catch (error) {
  //        console.log('error is',error);
  //    }
  //
  //}
  //
  //validateForm = () => {
  //    let commentError = '';
  //    let commentError1 = '';
  //
  //    commentError = `${!comment ? 'Please write a comment.' : ''}`;
  //    commentError1 = `${comment.length < 4 ? "Comment is too short." : ""}`;
  //
  //    if(commentError || commentError1) {
  //        setCommentError(commentError);
  //        setCommentError1(commentError1);
  //        return false;
  //    }
  //
  //    return true;
  //
  //}
  //
  //handleSubmit = (event) => {
  //    event.preventDefault();
  //    const isValid = validateForm();
  //    if (isValid) {
  //        sendData();
  //        setComment('');
  //    }
  //}
  const sendData = async () =>{
    var form = new FormData();
    const local_username = localStorage.getItem('username');
    form.append("book",bookTitle ? bookTitle : session_bookTitle);
    form.append("comment",comment);
    form.append("commenter",props.username?props.username:local_username);
    try {
      let response = await axios({
        method: "post",
        url: "http://127.0.0.1:8000/api/comment/",
        data: form,
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessageComment("Thank your for your comment.");
      setCommentLoading(false);
      setTimeout(() => {
        setMessageComment('');
        setComment('');
      }, 3000);
    } catch (error) {
      console.log(error.response);
        setCommentError("Failed!Try again later.");
        setCommentLoading(false);
        setMessageComment('');
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let commentError = "";
    let commentError1 = "";
    let commentError2 = "";
    commentError1 = `${!comment.length ? "Please write a comment." : ""}`;
    commentError2 = `${comment.length < 4 ? "Comment is too short." : ""}`;
    commentError = `${commentError1 ? commentError1 : commentError2}`;
    if (commentError) {
      setCommentError(commentError);
    } else {
      setCommentLoading(true);
      sendData();
    }
  };
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
      </Navbar>
      <Container>
        <Card className="book_card">
          <Card.Img variant="top" src={Book} />
        </Card>

        <h4>
          Book Title:{" "}
          <span className="details">
            {bookTitle ? bookTitle : session_bookTitle}
          </span>
        </h4>
        <h4>
          Author:{" "}
          <span className="details">{author ? author : session_author}</span>
        </h4>
        <h4>
          Publication Year:{" "}
          <span className="details">
            {yearPublished ? yearPublished : session_yearPublished}
          </span>
        </h4>
        <hr />
        <div className="comment_display">
          <h4>Comments from readers:</h4>
          <Spinner
            animation="border"
            variant="info"
            className={loading ? "spinner-comment" : "spinner-hide"}
          />
          {message}
          {results}
        </div>
        <div className="comment-section">
          <Form onSubmit={handleSubmit}>
            <h4>Would you like to comment on this book?</h4>
            <div className="register_errors">{commentError}</div>
            <div className="success-register">
              {messageComment}
              <Spinner
                animation="border"
                variant="info"
                className={commentLoading? "spinner-show" : "spinner-hide"}
              />
            </div>
            <Form.Group ControlID="commentID">
              <Form.Control
                placeholder="Leave your comments here"
                type="textarea"
                name="comment"
                value={comment}
                onChange={(event) => {
                  setComment(event.target.value);
                  setCommentError("");
                }}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
}

export default BookDetails;

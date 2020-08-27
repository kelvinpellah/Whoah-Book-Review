import React from 'react';
import {Link} from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import axios from "axios";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Logo from '../images/logo.png';
import BookSearch from './booksearch';


// Generate Columns and Cards for book Display
function BookCol(props) {
    return(
        
        <Col>
            <Link to="">
                <Card className='book_card'>
                    <Card.Img variant="top" src="" />
                    <Card.Body>
                        <Card.Title>{props.title}</Card.Title>
                        <footer className="blockquote-footer" >by <cite title="Source Title">{props.author}</cite></footer>
                    </Card.Body>
                </Card>
            </Link>
        </Col>
        
    )
}   
class FeaturedBooks extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            'books':''}

    }

    // handle returned books from API

    handleBooks(books) {
        this.setState({
            'books': books.map((book) =>
            <BookCol key={book.id} title={book.title} author={book.author}/>
        )
        });
    
    }

    // Receive books 
    bookList = async () => {

        try {
            let res = await axios({
                method:'get',
                url:'http://127.0.0.1:8000/api/books/',
            }).then(response => {
                this.handleBooks(response.data);
                //console.log(response.data);
            })
            .catch(error => {
                console.log('Books Error,', error);
            })
        } catch (error) {
            console.log(error)
        }
        
    }

    componentDidMount(){
        this.bookList();
    }

    render() {
        return (
            <div>
                <Navbar className='book_nav'>
                    <Link to="/home">
                            <Navbar.Brand >
                            <img
                            alt="Website Logo"
                            src={Logo}
                            width="250"
                            height="118"
                            className="d-inline-block align-top"
                            />
                        </Navbar.Brand>
                    </Link>
                    <div className="ml-auto">
                        <BookSearch />
                    </div>
                </Navbar>
                <Container>
                    <h3>Recommended books for you:</h3>
                    <Row>
                        {this.state.books[0]} 
                        {this.state.books[1]} 
                        {this.state.books[2]} 
                        {this.state.books[3]} 
                    </Row>    
                    <Row>
                        {this.state.books[4]} 
                        {this.state.books[5]} 
                        {this.state.books[6]} 
                        {this.state.books[7]} 
                    </Row>
                    <Row>
                        {this.state.books[8]} 
                        {this.state.books[9]} 
                        {this.state.books[10]} 
                        {this.state.books[11]} 
                    </Row>
                </Container>
            </div>
        )
    }
}

export default FeaturedBooks;
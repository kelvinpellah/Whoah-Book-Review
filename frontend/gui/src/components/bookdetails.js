import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { useLocation } from 'react-router';
import {Link} from "react-router-dom";
import Logo from '../images/logo.png';

function BookDetails(props){
    const location = useLocation();
    const {bookTitle, author} = location;
        return(
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
                </Navbar>
                <Container>
                    <Card className='book_card'>
                        <Card.Img variant="top" src="" />
                    </Card>
                    <h3>Book Title: {bookTitle}</h3>
                    <h3>Author: {author}</h3>
                    <h3>Publication Year:</h3>
                    <hr/>
                </Container>
            </div>
        )
    }


export default BookDetails;
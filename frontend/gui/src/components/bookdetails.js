import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import {Link, useLocation} from "react-router-dom";
import Logo from '../images/logo.png';

function BookDetails(props){
        let location = useLocation;
        console.log(location);
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
                    <h3>Book Title:</h3>
                    <h3>Author:</h3>
                    <h3>Publication Year:</h3>
                    <hr/>
                </Container>
            </div>
        )
    }


export default BookDetails;
import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

class FeaturedBooks extends React.Component {
    render() {
        return (
            <div>
                <Navbar bg="dark" className='book_nav'>
                    <Form inline className="ml-auto">
                        <Form.Group controlId="bookSearch" >
                            <Form.Control type='input' placeholder="Search for a book.." />
                        </Form.Group>
                        <Button type='submit'>Search</Button>
                    </Form>
                </Navbar>
                <Container>
                <Row >
                    <Col>
                        <Card className='book_card'>
                            <Card.Img variant="top" src="" />
                            <Card.Body>
                               <Card.Title>Book Title</Card.Title>
                               <footer className="blockquote-footer" ><cite title="Source Title">Author</cite></footer>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                    <Card className='book_card'>
                            <Card.Img variant="top" src="" />
                            <Card.Body>
                               <Card.Title>Book Title</Card.Title>
                               <footer className="blockquote-footer" ><cite title="Source Title">Author</cite></footer>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                    <Card className='book_card'>
                            <Card.Img variant="top" src="" />
                            <Card.Body>
                               <Card.Title>Book Title</Card.Title>
                               <footer className="blockquote-footer" ><cite title="Source Title">Author</cite></footer>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                    <Card className='book_card'>
                            <Card.Img variant="top" src="" />
                            <Card.Body>
                               <Card.Title>Book Title</Card.Title>
                               <footer className="blockquote-footer" ><cite title="Source Title">Author</cite></footer>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row></Row>
                <Row></Row>
                </Container>
            </div>
        )
    }
}

export default FeaturedBooks;
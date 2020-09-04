import React, { useState, useEffect } from 'react';
//import { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import { useLocation } from 'react-router';
import {Link} from "react-router-dom";
import Logo from '../images/logo.png';
// import axios from 'axios';

function BookDetails(props){

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
            const {bookTitle, author, yearPublished} = location;
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
                        {/* <Spinner animation="border" variant="info" className={loading? 'spinner-show':'spinner-hide'}/> */}
                        <h4>Book Title: {bookTitle}</h4>
                        <h4>Author: {author}</h4>
                        <h4>Publication Year: {yearPublished}</h4>
                        <hr/>
                        <div>
                        <h4>Would you like to comment on this book?</h4>
                            <Form>
                                <Form.Group ControlID="commentID">
                                    <Form.Control placeholder="Leave your comments here" type="textarea"/>
                                </Form.Group>
                                <Button variant="primary" type="submit">Submit</Button>
                            </Form>
                        </div>    
                        </Container>
                </div>
            )  
      
            }

export default BookDetails;
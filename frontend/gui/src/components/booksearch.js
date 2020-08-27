import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';


// Generate Card inputs for search results.
function BookSearchList(props) {
    return(
        <ListGroup.Item>{props.value}</ListGroup.Item>    
    )
}

class BookSearch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            query:"",
            results: '',
            message:'',
            loading: false
        }
        this.cancel= "";
        this.handleChange = this.handleChange.bind(this);
        this.fetchSearchResults=this.fetchSearchResults.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange= (event) => {
        const query = event.target.value;
        this.setState({query, message:'', loading:true}, () => {
            this.fetchSearchResults(query);
        }
        );

    }

    // handle Search Results

    handleSearchResults = results => {
        const resultNotFound = !results.length? 'No results.' : '';
        this.setState({
            results: results.map(result => (
                <BookSearchList key={result.id} value={`${result.title} by ${result.author}, ${result.year}`}/>
            )),
            message:resultNotFound,
            loading:false
        })
    }

    fetchSearchResults = async (query) => {
        // Remove cancel token when we start
        if(this.cancel){
            this.cancel.cancel();
        }
        this.cancel = axios.CancelToken.source();
        try {
                let res= await axios.get(
                    `http://127.0.0.1:8000/api/book/?search=${query}`,
                    { cancelToken: this.cancel.token}
                ).then(response => {
                    this.handleSearchResults(response.data);
                }).catch(error => {
                        if (axios.isCancel(error) || error) {
                            this.setState({
                                loading:false,
                                message:'Failed to fetch books. Please check Network.'
                            })
                        }
                    })
            } catch (error) {
               // console.log(error.message)
            }

        }   
    
        handleSubmit = event => {
            event.preventDefault();
            this.fetchSearchResults(this.state.query);
            
        }

    render() {
        return(
            <div>
                <Row>
                <Form inline onSubmit={this.handleSubmit} >
                    <Form.Group  >
                        <Form.Control 
                            type='input' 
                            value={this.state.query} 
                            onChange={this.handleChange} 
                            placeholder="Search by title, author etc" />   
                    </Form.Group>
                    <Button className="ml-2" type='submit'>Submit</Button>
                </Form>
                </Row>
                <Row>
                <Card className='book-search-card'>
                    <ListGroup >
                        {this.state.results}
                    </ListGroup>
                </Card>
                </Row>
            </div>
        )
    }
}

export default BookSearch;
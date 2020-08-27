import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import axios from 'axios';



class BookSearch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            query:"",
            results: {},
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
                        console.log(response);
                    }).catch(error => {
                        console.log('The error is', error)
                    })
            } catch (error) {
                console.log(error.message)
            }

        }   
    
        handleSubmit = event => {
            event.preventDefault();
            this.fetchSearchResults(this.state.query);
            
        }

    render() {
        return(
            <div>
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
            </div>
        )
    }
}

export default BookSearch;
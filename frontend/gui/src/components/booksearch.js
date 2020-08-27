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
        
        this.handleChange = this.handleChange.bind(this);
        this.fetchSearchResults=this.fetchSearchResults.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange= (event) => {
        const query = event.target.value;
        this.setState({query, message:'', loading:true}
        );

    }

    fetchSearchResults = async () => {

        const query = this.state.query;
        try {
                let res= await axios({
                    method:'GET',
                    url:`http://127.0.0.1:8000/api/book/?search=${query}`,
                    headers: {'Content-Type': 'multipart/form-data'}
                }).then(response => {
                        console.log(response);
                    }).catch(error => {
                        console.log('The error is', error)
                    })
            } catch (error) {
                console.log(error.message)
            }

        }
        
    handleSubmit = (event) => {
        event.preventDefault();
        this.fetchSearchResults();

    }   
  

    render() {
        return(
            <div>
                <Form inline onSubmit={this.handleSubmit} >
                    <InputGroup  >
                        <Form.Control 
                            type='input' 
                            value={this.state.query} 
                            onChange={this.handleChange} 
                            placeholder="Search by title, author etc" />
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">search</InputGroup.Text>
                        </InputGroup.Prepend>    
                    </InputGroup>
                    <Button type='submit'>Submit</Button>
                </Form>
            </div>
        )
    }
}

export default BookSearch;
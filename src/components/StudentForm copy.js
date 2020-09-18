import React from 'react'

import toast from 'toasted-notes'
import 'toasted-notes/src/styles.css';

import {
    Button,
    Form,
    Row
} from 'react-bootstrap';

class StudentForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            mobile: '',
            gender: '',
            dob: ''
        };
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    onChangeGender = (event) => {
        this.setState({ gender: event.target.value });
    };

    handleDateChange = (date) => {
        //let dt = moment.utc(date, 'YYYY-MM-DD');
        this.setState({ dob: date.target.value });
    };

    handleSubmit = (event) => {
        //alert('A form was submitted: ' + this.state);

        fetch('http://ec2-52-66-251-205.ap-south-1.compute.amazonaws.com:5000/api/v1/student', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // We convert the React state to JSON and send it as the POST body
            body: JSON.stringify(this.state)
        }).then(function (response) {
            console.log(response)

            if (response.status === 200) {
                toast.notify('Student profile created')
                //alert('Inside Toast');
            }
            //alert('Data Submitted Successfully');
            return response.json();
        });

        event.preventDefault();
    }


    render() {
        return (
            <div>
                <div>
                    <Form onSubmit={this.handleSubmit}>
                        <Row>
                            <Form.Group controlId="formFirstName">
                                <Form.Label>First name</Form.Label>
                                <Form.Control type="text" placeholder="Enter first name" name="first_name" onChange={this.handleChange.bind(this)} />
                                {/*<Form.Text className="text-muted">
                                    Please enter your first name.
                </Form.Text> */}
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group controlId="formLastName">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control type="text" placeholder="Enter last name" name="last_name" onChange={this.handleChange.bind(this)} />
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group controlId="formGender">
                                <Form.Label>Gender</Form.Label>
                                <Form.Check inline type="radio" label="male" id="male" value="male" name="gender" onChange={value => this.onChangeGender(value)} />
                                <Form.Check inline type="radio" label="female" id="female" value="male" name="gender" onChange={value => this.onChangeGender(value)} />
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" name="email" onChange={this.handleChange.bind(this)} />
                                <Form.Text className="text-muted">
                                    Please enter your email.
                            </Form.Text>
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group controlId="formMobile">
                                <Form.Label>Mobile</Form.Label>
                                <Form.Control type="text" placeholder="Enter mobile" name="mobile" onChange={this.handleChange.bind(this)} />
                                <Form.Text className="text-muted">
                                    Please enter your mobile number.
                            </Form.Text>
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group controlId="formDateOfBirth">
                                <Form.Label>Date of Birth</Form.Label>
                                <Form.Control type="text" placeholder="Enter date of birth" name="dob" onChange={this.handleDateChange.bind(this)} />
                            </Form.Group>
                        </Row>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>

                </div>
            </div>
        )
    }
}

    export default StudentForm 

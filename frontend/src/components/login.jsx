import React, { useState } from 'react';
import { Form, FormControl, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };
    
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            username: username,
            password: password
        };

        axios.post('http://localhost:5000/api/login', data)
            .then(response => {
                console.log(response.data);
                setUsername('');
                setPassword('');
            })
            .catch(error => {
                console.error(error);
                setUsername('');
                setPassword('');
            })
    };
    
    return (
        <Container>
            <div className="login-container">
                <h2 className="login-heading">Login</h2>
                <Form onSubmit={handleSubmit}>

                    <Form.Group controlId="formUsername">
                        <FormControl
                            type="text"
                            value={username}
                            onChange={handleUsernameChange}
                            placeholder="Enter username"
                        />
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <FormControl
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="Enter password"
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="login-button">
                        Login
                    </Button>

                    <div className="login-options">
                        <p className="forgot-password">Lupa password?</p>
                        <p className="register-link">Not a member? Register</p>
                    </div>
                </Form>
            </div>
        </Container>
    );
}

export default Login;
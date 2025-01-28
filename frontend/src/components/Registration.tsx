import React from 'react';
import { Form, Button } from 'react-bootstrap';
import useFormValidation from '../hooks/useFormValidation.ts';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService.ts';

const Registration: React.FC = () => {
    const { values, validated, setValidated, handleChange, validateForm } = useFormValidation({
        name: '',
        email: '',
        passwd: '',
    });
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setValidated(true);
        if (!validateForm()) return;

        try {
            console.log("values",values)
            await registerUser(values);
            navigate('/signin');
        } catch (error) {
            console.error('Registration failed', error);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'black' }}>
            <Form noValidate validated={validated} onSubmit={handleSubmit} style={{ width: '300px' }}>
                <h1 className="text-center text-light">Register</h1>

                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label className="text-light">Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        required
                        isInvalid={validated && !values.email}
                    />
                    <Form.Control.Feedback type="invalid">Please provide a valid email address.</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label className="text-light">Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="passwd"
                        value={values.passwd}
                        onChange={handleChange}
                        required
                        minLength={6}
                        isInvalid={validated && values.passwd.length < 6}
                    />
                    <Form.Control.Feedback type="invalid">Password must be at least 6 characters long.</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGroupName">
                    <Form.Label className="text-light">Full Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your full name"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        required
                        isInvalid={validated && !values.name}
                    />
                    <Form.Control.Feedback type="invalid">Please provide a valid name.</Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                    Sign Up
                </Button>
            </Form>
        </div>
    );
};

export default Registration;

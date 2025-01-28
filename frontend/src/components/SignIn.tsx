import React from 'react';
import { Form, Button } from 'react-bootstrap';
import useFormValidation from '../hooks/useFormValidation.ts';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService.ts';
import { useAuth } from '../context/AuthContext.tsx';

const SignIn: React.FC = () => {
    const { values, validated, setValidated, handleChange, validateForm } = useFormValidation({
        email: '',
        passwd: '',
    });
    const navigate = useNavigate();
    const { setIsAuthenticated, setUser } = useAuth();


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setValidated(true);
        if (!validateForm()) return;

        try {
            console.log("sign in values", values)
            const user = await loginUser(values);
            setUser(user)
            setIsAuthenticated(true); 

            navigate('/home');
        } catch (error) {
            console.error('Sign-in failed', error);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'black' }}>
            <Form noValidate validated={validated} onSubmit={handleSubmit} style={{ width: "500px" }}>
                <h1 className="text-center text-light">Sign in</h1>

                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label className="text-light">Email address</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        isInvalid={validated && !values.email}
                    />
                    <Form.Control.Feedback type="invalid">Please provide a valid email address.</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label className="text-light">Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="passwd"
                        value={values.passwd}
                        onChange={handleChange}
                        isInvalid={validated && !values.passwd}
                    />
                    <Form.Control.Feedback type="invalid">Password is required.</Form.Control.Feedback>
                </Form.Group>

                <Button type="submit">Sign In</Button>
            </Form>
        </div>
    );
};

export default SignIn;

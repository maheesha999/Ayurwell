import React, { useState } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import UserLoginPageStyle from '../styles/UserLoginPageStyle.module.css'
import EmptyMenuBar from '../components/EmptyMenuBar';
import axios from 'axios';
import Button from '@mui/material/Button';
import toast from 'react-hot-toast';
import { auth, provider } from '../Config/FireBaseConfig.js';
import { signInWithPopup } from 'firebase/auth';

const UserLoginPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState("")
    const navigate = useNavigate();

    const submitHandler = () => {

        const loginDto = {
            email,
            password
        };
        console.log(loginDto);
        axios.post('http://localhost:8080/api/users/login', loginDto)
            .then(response => {
                console.log("Form submitted successfully!" + response);
                console.log(response);
                const userData = JSON.stringify(response.data);
                localStorage.setItem("UserInfo", userData);

                navigate("/");
            })
            .catch(error => {
                console.error("Error:", error.response.data);
                if (error.response.data == "Password Incorrect") {
                    toast.error("Password Incorrect", {
                        style: {
                            background: "green",
                        }
                    })
                }
                else if (error.response.data == "User not found") {
                    toast.error("You haven't sign up")
                }
            });
    }

    const googleSignUpClick = async () => {
        signInWithPopup(auth, provider).then((data) => {
            console.log(data.user.email);
            const gUser = {
                name: data.user.displayName,
                userName: data.user.email,
                email: data.user.email,
                profileImageUrl: data.user.photoURL
            };

            axios.post('http://localhost:8080/api/users/googleSignUp', gUser)
                .then(response => {
                    toast.success("Successfully Loged in.");
                    setIsLoading(false)
                    const userData = JSON.stringify(response.data);
                    localStorage.setItem("UserInfo", userData);
                    navigate("/");
                    
                })
                .catch(error => {
                    console.error("Error:", error);
                });
        })
    }

    return (
        <div className={UserLoginPageStyle.bodyDiv}>
            <EmptyMenuBar />
            <Container>
                <Row className={UserLoginPageStyle.rowDiv}>
                    <Col className={UserLoginPageStyle.leftDiv}>
                    </Col>
                    <Col className={UserLoginPageStyle.rightDiv}>
                        <center><h2 style={{ margin: "4% 0" }}>SIGN IN</h2></center>

                        <Row>
                            <Col>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </Form.Group>
                            </Col>
                        </Row>


                        <Row>
                            <Col>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="email" placeholder="john@123" value={password}
                                        onChange={(e) => setPassword(e.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>
                        {password == '' ? (<><Button variant="contained" fullWidth style={{ marginTop: '2%' }} onClick={submitHandler} disabled>Sign In</Button></>) : (<><Button variant="contained" fullWidth style={{ marginTop: '2%' }} onClick={submitHandler}>Sign Up</Button></>)}
                        <Row>
                            <Col>
                                <p style={{ marginTop: '2%' }}>I haven't an account <a href='/register' style={{ textDecoration: 'none', fontWeight: 'bold' }}>Sign In</a></p>
                            </Col>
                        </Row>
                        <Row>
                            <Col><hr /></Col>
                            <Col style={{ textAlign: 'center' }}><p style={{ fontStyle: 'italic' }}>Or Sign Up Using</p></Col>
                            <Col><hr /></Col>
                        </Row>
                        <Row>
                            <Col style={{ textAlign: 'center' }}>
                                <a onClick={googleSignUpClick} ><img src='/src/assets/images/googleLogo.png' width={45} style={{ cursor: 'pointer' }} /></a>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default UserLoginPage

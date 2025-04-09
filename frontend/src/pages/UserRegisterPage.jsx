import React, { useState, useRef } from 'react'
import { Row, Col, Container, Form } from 'react-bootstrap'
import UserRegisterPageStyle from '../styles/UserRegisterPageStyle.module.css'
import EmptyMenuBar from '../components/EmptyMenuBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import toast from 'react-hot-toast';
import CircularProgress from '@mui/material/CircularProgress';
import { storage } from "../Config/FireBaseConfig.js";
import { getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage";
import { v4 } from "uuid";
import { auth, provider } from '../Config/FireBaseConfig.js';
import { signInWithPopup } from 'firebase/auth';




const UserRegisterPage = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [profileImageURL, setProfileImageURL] = useState("");
    const [userType, setUserType] = useState("User");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowCPassword = () => setShowCPassword((show) => !show);

    const handleMouseDownCPassword = (event) => {
        event.preventDefault();
    };

    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];
        setImage(selectedImage);

        // Preview the selected image
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImagePreview(reader.result);
            }
        };
        reader.readAsDataURL(selectedImage);
    };

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        let month = today.getMonth() + 1; // Month is zero-indexed
        let day = today.getDate();

        // Ensure month and day are two digits
        month = month < 10 ? `0${month}` : month;
        day = day < 10 ? `0${day}` : day;

        return `${year}-${month}-${day}`;
    };
    const handleImageClick = () => {
        // Trigger the file input dialog when image is clicked
        document.getElementById('imageInput').click();
    };

    const uploadProfileImage = async () => {
        return new Promise((resolve, reject) => {
            if (image == null) {
                resolve(null); // Resolve with null if no image is provided
            } else {
                const ProfileImageRef = ref(
                    storage,
                    `${userName}/profileImages/${image.name + v4()}`
                );

                uploadBytes(ProfileImageRef, image)
                    .then(() => {
                        getDownloadURL(ProfileImageRef)
                            .then((downloadURL) => {
                                resolve(downloadURL);
                            })
                            .catch((error) => {
                                // Error getting download URL
                                reject(error);
                            });
                    })
                    .catch((error) => {
                        // Error uploading image
                        reject(error);
                    });
            }
        })
    }

    const removeFileByDownloadUrl = async (downloadUrl) => {

        // Get reference to the file using the download URL
        const storageRef = ref(
            storage,
            `${downloadUrl}`
        )
        deleteObject(storageRef).then(() => {
            console.log("Deleted!");
        }).catch((error) => {
            console.error("Error:", error);
        });
    };

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

    const submitHandler = async () => {

        setIsLoading(true)

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const profileImgDownURL = await uploadProfileImage();

        if (!emailPattern.test(email)) {
            toast.error("provide a valid email");
            setIsLoading(false)
            return
        }

        if ((firstName == '') || (lastName == '') || (userName === '') || (email === '') || (dob === null) || (gender === '')) {
            toast.error("Fill required fields");
            setIsLoading(false)
        }
        else {
            const user = {
                firstName: firstName,
                lastName: lastName,
                userName: userName,
                email: email,
                profilePicURL: profileImgDownURL,
                dob: dob,
                gender: gender,
                weight: weight,
                height: height,
                password: password,
                userType: userType,
            };
            console.log(user);
            axios.post('http://localhost:8080/api/users/register', user)
                .then(response => {
                    toast.success("Successfully Registered.");
                    setIsLoading(false)
                    navigate("/login");
                })
                .catch(error => {
                    console.error("Error:", error);
                    if (error.response.data == "Username already exists") {
                        removeFileByDownloadUrl(profileImgDownURL);
                        toast.error("User name already exist!");
                    }
                    if (error.response.data == "Email already exists") {
                        toast.error("Email already exists!");
                    }

                });
        }


    }
    return (
        <div className={UserRegisterPageStyle.bodyDiv}>
            <EmptyMenuBar />
            <Container>

                <Row className={UserRegisterPageStyle.rowDiv}>
                    <Col className={UserRegisterPageStyle.leftDiv}>

                    </Col>
                    <Col className={UserRegisterPageStyle.rightDiv}>
                        <center><h2>SIGN UP</h2></center>
                        {isLoading ? (<>
                            <Box sx={{ display: 'flex', margin: 'auto' }}>
                                <center><CircularProgress /></center>
                            </Box>
                        </>) : (<>
                            <Row>
                                <Col xs={8}>
                                    <Row>
                                        <Col>
                                            <Box
                                                component="form"
                                                noValidate
                                                autoComplete="off"
                                            >

                                                <TextField label="First Name" variant="outlined" margin="normal" size='small'
                                                    value={firstName} onChange={(e) => setFirstName(e.target.value)} fullWidth required />
                                            </Box>
                                        </Col>
                                        <Col>
                                            <Box
                                                component="form"
                                                noValidate
                                                autoComplete="off"
                                            >

                                                <TextField label="Last Name" variant="outlined" margin="normal" size='small'
                                                    value={lastName} onChange={(e) => setLastName(e.target.value)} fullWidth required />
                                            </Box>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Box
                                            component="form"
                                            noValidate
                                            autoComplete="off"
                                        >

                                            <TextField label="UserName" variant="outlined" margin="normal" size='small'
                                                value={userName} onChange={(e) => setUserName(e.target.value)} fullWidth required />
                                        </Box>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Box
                                                component="form"
                                                noValidate
                                                autoComplete="off"
                                            >
                                                <TextField label="Email" variant="outlined" margin="normal" size='small'
                                                    value={email} onChange={(e) => setEmail(e.target.value)} fullWidth required />
                                            </Box>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col style={{ textAlign: 'center', paddingTop: '6%' }}>
                                    <form>
                                        <label htmlFor="imageInput">
                                            <div style={{ maxWidth: '140px', textAlign: 'center', borderRadius: '50%', cursor: 'pointer' }}>
                                                {imagePreview ? (
                                                    <img src={imagePreview} alt="Preview" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
                                                ) : (
                                                    <img src={'/src/assets/images/user-avatars.png'} alt="Preview" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
                                                )}
                                            </div>
                                            <input id="imageInput" type="file" onChange={handleImageChange} style={{ display: 'none' }} />
                                        </label>
                                    </form>

                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <label>
                                        Date of Birth{" "}
                                        <span>*</span>:
                                    </label>
                                    <input
                                        type="date"
                                        value={dob}
                                        onChange={(e) => setDob(e.target.value)}
                                        style={{
                                            padding: "3%",
                                            border: "1px solid #bcbcbc",
                                            borderRadius: "5px",
                                        }}
                                        required
                                        max={getCurrentDate()}

                                    />
                                </Col>
                                <Col>
                                    <FormControl>

                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                            value={gender}
                                            onChange={(e) => setGender(e.target.value)}
                                            required
                                        >
                                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                                        </RadioGroup>
                                    </FormControl>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormControl variant="outlined" size='small' margin="normal" fullWidth>
                                        <InputLabel htmlFor="outlined-adornment-password">Weight</InputLabel>
                                        <OutlinedInput
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    kg
                                                </InputAdornment>
                                            }
                                            label="Weight"
                                            value={weight}
                                            onChange={(e) => setWeight(e.target.value)}
                                        />
                                    </FormControl>

                                </Col>

                                <Col>

                                    <FormControl variant="outlined" size='small' margin="normal" fullWidth>
                                        <InputLabel htmlFor="outlined-adornment-password">Height</InputLabel>
                                        <OutlinedInput
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    m
                                                </InputAdornment>
                                            }
                                            label="Height"
                                            value={height}
                                            onChange={(e) => setHeight(e.target.value)}
                                        />
                                    </FormControl>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormControl variant="outlined" size='small' margin="normal" fullWidth>
                                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            type={showPassword ? 'text' : 'password'}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </FormControl>
                                </Col>
                                <Col>
                                    <FormControl variant="outlined" size='small' margin="normal" fullWidth>
                                        <InputLabel htmlFor="outlined-adornment-cpassword">Confirm Password</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-cpassword"
                                            type={showCPassword ? 'text' : 'password'}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowCPassword}
                                                        onMouseDown={handleMouseDownCPassword}
                                                        edge="end"
                                                    >
                                                        {showCPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Confirm Password"
                                            value={cpassword}
                                            onChange={(e) => setCPassword(e.target.value)}
                                        />
                                    </FormControl>
                                </Col>
                            </Row>
                            {password != cpassword ? (
                                <>
                                    <Button variant="contained" fullWidth style={{ marginTop: '2%' }} disabled>Sign Up</Button>
                                </>) : (
                                <>
                                    <Button variant="contained" fullWidth style={{ marginTop: '2%' }} onClick={submitHandler} >Sign Up</Button>
                                </>)}

                            <Row>
                                <Col>
                                    <p style={{ marginTop: '2%' }}>I have an account <a href='/login' style={{ textDecoration: 'none', fontWeight: 'bold' }}>Sign In</a></p>
                                </Col>
                            </Row>
                            <Row>
                                <Col><hr /></Col>
                                <Col style={{ textAlign: 'center' }}><p style={{ fontStyle: 'italic' }}>Or Sign Up Using</p></Col>
                                <Col><hr /></Col>
                            </Row>
                            <Row>
                                <Col style={{ textAlign: 'center' }}>
                                    <a onClick={googleSignUpClick} ><img src='/src/assets/images/googleLogo.png' width={45} style={{cursor: 'pointer'}}/></a>
                                </Col>
                            </Row>
                        </>)}


                    </Col>
                </Row>
            </Container>
        </div >
    )
}

export default UserRegisterPage

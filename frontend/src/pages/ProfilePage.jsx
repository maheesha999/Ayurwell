import React from 'react'
import NavBar from '../components/NavBar'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { Box, TextField, Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CircularProgress from '@mui/material/CircularProgress';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import AllMealPlanPage from './AllMealPlanPage'
import StatusAllSingleUser from './StatusAllSingleUser.jsx'

import AllUserWorkoutPlans from '../components/AllUserWorkoutPlans';
import { storage } from "../Config/FireBaseConfig.js";
import { getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage";
import { v4 } from "uuid";
import toast from 'react-hot-toast'

const ProfilePage = () => {

    const userInfoString = localStorage.getItem('UserInfo');
    const storedUserInfo = JSON.parse(userInfoString);
    const [userData, setUserData] = useState('');
    const [updatedUserData, setUpdatedUserData] = useState('');
    const [value, setValue] = useState(0);
    const [open, setOpen] = useState(false);

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
    const [cEmail, setCEmail] = useState("");
    const [deleted, setDeleted] = useState("");
    const [statuAll, setStatusAll] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [updated, setUpdated] = useState("");
    const [profilepicLoading, setProfilepicLoading] = useState(false);

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
                                toast.success("Profile Picture Updated");
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

    const updateprileImage = async () => {
        setProfilepicLoading(true)
        const profileimgLink = await uploadProfileImage();

        const profilePicUrl = {
            profilePicLink: profileimgLink
        }
        try {
            const response = await axios.put(`http://localhost:8080/api/users/updateProfilePic/${storedUserInfo.id}`, profilePicUrl);
            setUpdated(response.data)
            setImage(profileimgLink)
            setImagePreview("");
            setProfilepicLoading(false)
        } catch (error) {
            console.log("error uploading image", error);
        }

    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowCPassword = () => setShowCPassword((show) => !show);

    const handleMouseDownCPassword = (event) => {
        event.preventDefault();
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [openDel, setOpenDel] = useState(false);

    const handleClickOpenDel = () => {
        setOpenDel(true);
    };

    const handleCloseDel = () => {
        setOpenDel(false);
    };

    const fetchData = async () => {
        setIsLoading(true)
        try {
            const response = await axios.get(`http://localhost:8080/api/users/getUserByEmail/${storedUserInfo.email}`); // Make request to backend API endpoint
            setUserData(response.data); // Update state with retrieved data
            setFirstName(response.data.firstName)
            setLastName(response.data.lastName)
            setUserName(response.data.userName)
            setEmail(response.data.email)
            setDob(response.data.dob)
            setGender(response.data.gender)
            setWeight(response.data.weight)
            setHeight(response.data.height)
            setPassword(response.data.password)
            setCPassword(response.data.password)
            setImage(response.data.profilePicURL)
            setIsLoading(false)
        } catch (error) {
            console.error('Error fetching data:', error);
        }

        try {
            const response = await axios.get(`http://localhost:8080/api/user/StatusTest/user/${storedUserInfo.userName}`); // Make request to backend API endpoint
            setStatusAll(response.data); // Update state with retrieved data

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    console.log(userData.id);
    const handleUpdate = async () => {
        handleClose();
        const updatedUser = {
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            email: email,
            dob: dob,
            profilePicURL: userData.profilePicURL,
            gender: gender,
            weight: weight,
            height: height,
            password: password,
            userType: userType,
        };
        try {
            const response = await axios.put(`http://localhost:8080/api/users/${storedUserInfo.id}`, updatedUser); // Make request to backend API endpoint
            setUpdatedUserData(response.data); // Update state with retrieved data
        } catch (error) {
            console.error('Error updating data:', error);
        }
    }

    const haldleDelete = async () => {

        handleCloseDel();
        try {
            const response = await axios.delete(`http://localhost:8080/api/users/${storedUserInfo.id}`); // Make request to backend API endpoint
            setDeleted(response.data);
            localStorage.removeItem("UserInfo");
            window.location.href = "/register";
        } catch (error) {
            console.error('Error updating data:', error);
        }
    }


    console.log(statuAll);
    useEffect(() => {
        fetchData();
    }, [updatedUserData, deleted, updated])

    return (

        <div style={{ background: 'linear-gradient(to right, rgb(252, 252, 252), rgb(114 102 201 / 62%))', paddingBottom: '2%', paddingTop:'1%' }}>
            <NavBar />
            <Container style={{ marginTop: '6%', width: '80%', padding: '2%', boxShadow: 'rgb(219, 219, 219) -7px 10px 20px 3px', backgroundColor: 'white' }}>
                {isLoading ? (<>
                    <Box>
                        <center><CircularProgress /></center>
                    </Box>
                </>) : (<>
                    <Row>

                        <Col xs={4} style={{ textAlign: 'center' }}>
                            <form>
                                <label htmlFor="imageInput">
                                    <div style={{ maxWidth: '150px', textAlign: 'center', borderRadius: '50%', cursor: 'pointer' }}>
                                        {profilepicLoading ? (<>
                                            <Box>
                                                <center><CircularProgress /></center>
                                            </Box>
                                        </>) : (<>
                                            {imagePreview ? (
                                                <img src={imagePreview} alt="Preview" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
                                            ) : (<>
                                                {image ? (<>
                                                    <img src={image} alt="Preview" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
                                                </>) : (<>
                                                    <img src={'/src/assets/images/user-avatars.png'} alt="Preview" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
                                                </>)}
                                            </>)}


                                        </>

                                        )}
                                    </div>
                                    <input id="imageInput" type="file" onChange={handleImageChange} style={{ display: 'none' }} />
                                </label>
                            </form>
                            {imagePreview && <>
                                <Button onClick={updateprileImage}>Save</Button>
                            </>}
                        </Col>
                        <Col style={{ backgroundColor: '#efe4ff', padding: '2%', borderRadius: '10px' }}>
                            <Row >
                                <Col>
                                    <p><span style={{ fontSize: 'xx-large', fontFamily: 'math}' }}>{userData.firstName} {userData.lastName}</span> <br />
                                        {userData.userName} <br />
                                        {userData.email} <br />
                                        {userData.gender} <br />
                                        {userData.weight &&
                                            <>
                                                <span style={{ fontWeight: 'bolder' }}>Weight </span>: {userData.weight}KG <span style={{ fontWeight: 'bolder' }}>Height </span>: {userData.height}m
                                            </>}
                                    </p>


                                </Col>
                                <Col>
                                    <Row>
                                        <Col>
                                            <Button style={{ backgroundColor: 'transparent', color: 'black' }} onClick={handleClickOpen}>Edit Profile</Button>
                                        </Col>
                                        <Col>
                                            <Button style={{ backgroundColor: 'red', color: 'white', border: '1px red solid' }} onClick={handleClickOpenDel}>Delete Profile</Button>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginTop: '10%' }}>
                                        <p style={{ fontSize: 'larger' }}>{userData.followers && userData.followers.length} <span style={{ fontWeight: 'bolder', marginRight: '10%' }}>Followers</span> {userData.following && userData.following.length} <span style={{ fontWeight: 'bolder' }}>Following</span></p>
                                    </Row>
                                </Col>
                            </Row>

                        </Col>
                    </Row>
                    <Row style={{ marginTop: '4%', overflowX: 'auto', whiteSpace: 'nowrap', height: '100px' }} >
                        <Col xs={2}>
                            <img src={"/src/assets/images/currentStatusIco.png"} alt="Workout Plans" width={30} style={{ width: '80px', margin: '2% 40%' }} />
                        </Col>
                        <Col>
                            <a href='/AddStatus'><img src={"/src/assets/images/addButton.png"} width={70} height={70} style={{ borderRadius: '50%', margin: '0 4%' }} /></a>
                            {statuAll && statuAll.map((row) => (
                                <a href=''><img src='/src/assets/images/currentStatusIco.png' width={70} height={70} style={{ borderRadius: '50%', margin: '0 4%' }} /></a>
                            ))}
                        </Col>

                    </Row>
                    <hr style={{ marginTop: '2%' }} />
                    <Row >
                        <TabContext value={value}>
                            <Row>
                                <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example">
                                    <Tab icon={<img src={"/src/assets/images/workoutPlanIco.png"} alt="Workout Plans" width={30} />} label="Workout Plans" value={0} />
                                    <Tab icon={<img src={"/src/assets/images/mealPlanIco.png"} alt="Meal Plans" width={30} />} label="Meal Plans" value={1} />
                                    <Tab icon={<img src={"/src/assets/images/mealPlanIco.png"} alt="Meal Plans" width={30} />} label="Status" value={2} />
                                </Tabs>
                            </Row>
                            <TabPanel value={0}>
                                <Link to={"/workoutPlanTemplate"}> <Box><Button><AddBoxRoundedIcon /></Button></Box></Link>
                                <AllUserWorkoutPlans userId={storedUserInfo.id} />
                            </TabPanel>
                            <TabPanel value={1}>
                                <Link to={"/mealplan"}> <Box><Button><AddBoxRoundedIcon /></Button></Box></Link>
                                <AllMealPlanPage userId={storedUserInfo.id} />
                            </TabPanel>
                            <TabPanel value={2}>
                                <Link to={"/AddStatus"}> <Box><Button><AddBoxRoundedIcon /></Button></Box></Link>
                                <StatusAllSingleUser />
                            </TabPanel>
                        </TabContext>
                    </Row>
                </>)}


                <React.Fragment>

                    <Dialog
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                            component: 'form',
                            onSubmit: (event) => {
                                event.preventDefault();
                                const formData = new FormData(event.currentTarget);
                                const formJson = Object.fromEntries(formData.entries());
                                const email = formJson.email;
                                console.log(email);
                                handleClose();
                            },
                        }}
                    >
                        <DialogTitle>Edit Your Profile</DialogTitle>
                        <DialogContent>

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
                                                value={userName} onChange={(e) => setUserName(e.target.value)} fullWidth required disabled />
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
                                                    value={email} onChange={(e) => setEmail(e.target.value)} fullWidth required disabled/>
                                            </Box>
                                        </Col>
                                    </Row>
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
                                            type='number'
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
                                            type='number'
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
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit" onClick={handleUpdate}>Save</Button>
                        </DialogActions>
                    </Dialog>
                </React.Fragment>


                <React.Fragment>
                    <Dialog
                        open={openDel}
                        onClose={handleCloseDel}
                        PaperProps={{
                            component: 'form',
                            onSubmit: (event) => {
                                event.preventDefault();
                                const formData = new FormData(event.currentTarget);
                                const formJson = Object.fromEntries(formData.entries());
                                const email = formJson.email;
                                console.log(email);
                                handleCloseDel();
                            },
                        }}
                    >
                        <DialogTitle>Delete your account</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Enter your email to delete the account
                            </DialogContentText>
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                id="name"
                                name="email"
                                label="Email Address"
                                type="email"
                                fullWidth
                                variant="standard"
                                value={cEmail}
                                onChange={(e) => setCEmail(e.target.value)}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDel}>Cancel</Button>
                            {cEmail == storedUserInfo.email ? (<><Button type="submit" color='red' onClick={haldleDelete}>Delete</Button>
                            </>) : (<>
                                <Button type="submit" color='red' disabled>Delete</Button>
                            </>)}

                        </DialogActions>
                    </Dialog>
                </React.Fragment>


            </Container>
        </div>
    )
}

export default ProfilePage

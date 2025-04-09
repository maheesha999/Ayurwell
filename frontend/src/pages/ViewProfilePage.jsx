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

import AllUserWorkoutPlans from '../components/AllUserWorkoutPlans'
import { useParams } from 'react-router-dom'

const ViewProfilePage = () => {
    const userInfoString = localStorage.getItem('UserInfo');
    const storedUserInfo = JSON.parse(userInfoString);
    const [userData, setUserData] = useState('');
    const [value, setValue] = useState(0);
    const emailParam = useParams();
    console.log(emailParam);
    const [followed, setFollowed] = useState('');
    const [isLoading, setIsLoading] = useState(false);



    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/users/getUserByEmail/${emailParam.id}`); // Make request to backend API endpoint
            setUserData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const followAUSer = async (followedUser) => {
        const loginDto = {
            user1: followedUser,
            user2: storedUserInfo.id
        }
        console.log(loginDto);
        try {
            const response = await axios.post(`http://localhost:8080/api/users/follow`, loginDto); // Make request to backend API endpoint
            setFollowed(response.data)// Update state with retrieved data

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const unfollowAUSer = async (followedUser) => {
        const loginDto = {
            user1: followedUser,
            user2: storedUserInfo.id
        }
        console.log(loginDto);
        try {
            const response = await axios.post(`http://localhost:8080/api/users/unfollow`, loginDto); // Make request to backend API endpoint
            setFollowed(response.data)// Update state with retrieved data

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    useEffect(() => {
        fetchData();
    }, [followed])

    return (
        <div style={{ background: 'linear-gradient(to right, rgb(252, 252, 252), rgb(114 102 201 / 62%))', paddingBottom: '2%' }}>
            <NavBar />
            <div>
                <Container style={{ marginTop: '12%', width: '80%', padding: '2%', boxShadow: 'rgb(219, 219, 219) -7px 10px 20px 3px', backgroundColor: 'white' }}>
                    <Row>
                        <Col xs={4} style={{ textAlign: 'center' }}>
                            <img src={userData.profilePicURL} style={{ width: '150px', height: '150px', borderRadius: '50%', margin: '1% 38%' }} />
                        </Col>
                        <Col style={{ backgroundColor: '#efe4ff', padding: '2%', borderRadius: '10px' }}>
                            <Row >
                                <Col>
                                    <p><span style={{ fontSize: 'xx-large', fontFamily: 'math}' }}>{userData.firstName} {userData.lastName}</span> <br />
                                        {userData.userName} <br />
                                        {userData.email} <br />
                                        {userData.gender} <br />
                                        <span style={{ fontWeight: 'bolder' }}>Weight </span>: {userData.weight}KG <span style={{ fontWeight: 'bolder' }}>Height </span>: {userData.height}m</p>

                                </Col>
                                <Col>
                                    <Row style={{ marginTop: '10%' }}>
                                        <p style={{ fontSize: 'larger' }}>{userData.followers && userData.followers.length} <span style={{ fontWeight: 'bolder', marginRight: '10%' }}>Followers</span> {userData.following && userData.following.length} <span style={{ fontWeight: 'bolder' }}>Following</span></p>
                                    </Row>
                                    <Row>
                                        {userData.followers && userData.followers.includes(storedUserInfo.id) ? (
                                            <Button onClick={() => unfollowAUSer(userData.id)} style={{ width: '100px' }}>Unfollow</Button>
                                        ) : (
                                            <Button onClick={() => followAUSer(userData.id)} style={{ width: '100px' }}>Follow</Button>
                                        )}
                                    </Row>
                                </Col>
                            </Row>

                        </Col>
                    </Row>
                    <Row style={{ marginTop: '4%', overflowX: 'auto', whiteSpace: 'nowrap', height: '100px' }} >
                        <Col xs={2}>
                            <img src={"/src/assets/images/currentStatusIco.png"} alt="Workout Plans" width={30} style={{ width: '80px', margin: '2% 40%' }} />
                        </Col>


                    </Row>
                    <hr style={{ marginTop: '2%' }} />
                    <Row >
                        <TabContext value={value}>
                            <Row>
                                <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example">
                                    <Tab icon={<img src={"/src/assets/images/workoutPlanIco.png"} alt="Workout Plans" width={30} />} label="Workout Plans" value={0} />
                                    <Tab icon={<img src={"/src/assets/images/mealPlanIco.png"} alt="Meal Plans" width={30} />} label="Meal Plans" value={1} />
                                </Tabs>
                            </Row>
                            <TabPanel value={0}>
                                <h2>Workout Plans Content</h2>
                                {storedUserInfo.id == userData &&
                                    <Link to={"/workoutPlanTemplate"}> <Box><Button><AddBoxRoundedIcon /></Button></Box></Link>}

                                <AllUserWorkoutPlans userId={emailParam.id2} />
                            </TabPanel>
                            <TabPanel value={1}>
                                <h2>Meal Plans Content</h2>
                                {storedUserInfo.id == userData && <Box><Button>Add Meal Plan</Button></Box>}
                                
                                <AllMealPlanPage userId={emailParam.id2} />
                            </TabPanel>
                        </TabContext>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default ViewProfilePage

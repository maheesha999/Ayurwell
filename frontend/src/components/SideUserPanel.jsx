import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const SideUserPanel = () => {
    const userInfoString = localStorage.getItem('UserInfo');
    const storedUserInfo = JSON.parse(userInfoString);
    const [user, setUser] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const loadData = async () => {
        setIsLoading(true)
        try {
            const response1 = await axios.get(`http://localhost:8080/api/users/getUserById/${storedUserInfo.id}`);
            setUser(response1.data)
            setIsLoading(false)
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        loadData()
    }, []);

    return (
        <div style={{ width: '20%', position: 'fixed', marginTop: '5%', left: 0, margin: '1%', boxShadow: 'rgb(210, 210, 210) 0px 0px 20px 0px', height: '-webkit-fill-available', backgroundColor: 'white', top: '10%' }}>
            <Row>
                <Col style={{ textAlign: 'center', padding: '10%' }}>
                    {isLoading ? (<>
                        <Box>
                            <center><CircularProgress /></center>
                        </Box>
                    </>) : (<>
                        <img src={user.profilePicURL} width={100} height={100} style={{ borderRadius: '50%' }} /><br />
                        <p style={{ fontFamily: 'cursive', fontWeight: 'bold', fontSize: 'x-large' }}>{user.firstName}<br />{user.lastName}</p>
                        <p>{user.userName}</p>
                        <p>{user.followers && user.followers.length} <span style={{ fontWeight: 'bolder' }}>Followers</span> {user.followers && user.following.length} <span style={{ fontWeight: 'bolder' }}>Following</span></p>
                    </>)}
                </Col>
            </Row>
        </div>
    )
}

export default SideUserPanel

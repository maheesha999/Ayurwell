import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';


const SideNotoficationPanel = () => {
    const userInfoString = localStorage.getItem('UserInfo');
    const storedUserInfo = JSON.parse(userInfoString);
    const [followersNames, setFollowersNames] = useState("");
    const [user, setUser] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const loadData = async () => {
        setIsLoading(true)
        try {
            const response1 = await axios.get(`http://localhost:8080/api/users/getUserById/${storedUserInfo.id}`);

            try {
                const response = await axios.post(`http://localhost:8080/api/users/getUsersNames`, response1.data.followers);
                setFollowersNames(response.data.reverse());
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        loadData()
    }, []);

    return (
        <div style={{ width: '20%', position: 'fixed', marginTop: '5%', right: 0, margin: '1%', boxShadow: 'rgb(210, 210, 210) 0px 0px 20px 0px', height: '-webkit-fill-available', backgroundColor: 'white',top: '10%' }}>
            <Row>
                <Col style={{ textAlign: 'center', padding: '10%' }}>
                    <h3 style={{ color: 'purple' }}>Notifications</h3>
                </Col>
            </Row>
            <Row >
                {isLoading ? (<>
                    <center>
                        <Box>
                            <CircularProgress />
                        </Box>
                    </center>
                </>) : (<>
                    <Col style={{ padding: "1% 15%" }}>

                        {followersNames && followersNames.map((row, index) => (
                            <>
                                <p key={index}><b>{row} </b><i> started to following you</i></p><hr />
                            </>
                        ))}
                    </Col>
                </>)}

            </Row>
        </div>
    )
}

export default SideNotoficationPanel

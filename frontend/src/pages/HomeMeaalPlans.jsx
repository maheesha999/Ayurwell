import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import { useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap';
import SideUserPanel from '../components/SideUserPanel';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SideNotoficationPanel from '../components/SideNotoficationPanel';
import { Link } from 'react-router-dom';

const HomeMealPage = () => {
  const userInfoString = localStorage.getItem('UserInfo');
  const storedUserInfo = JSON.parse(userInfoString);

  const [mealPlans, setMealPlans] = useState('');
  const [workoutPlans, setWorkoutPlans] = useState('');

  const [currentStatus, setCurrentStatus] = useState('');

  const [r, setR] = useState(['', '', '']);

  console.log(storedUserInfo.followers);

  const loadData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/user/mealplan`
      );
      console.log(response.data); // Make request to backend API endpoint
      setMealPlans(response.data); // Update state with retrieved data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    document.title = 'HOME | FitConnect';
    loadData();
    return () => {
      document.title = 'FitConnect';
    };
  }, []);

  return (
    <div
      style={{
        background:
          'linear-gradient(to right, rgb(252, 252, 252), rgb(114 102 201 / 62%))',
      }}
    >
      <NavBar />
      <Row>
        <Col xs={3}>
          <SideUserPanel />
        </Col>

        <Col xs={6}>
          <Container
            style={{
              marginTop: '2%',
              paddingRight: '20px',
            }}
          >
            {mealPlans &&
              mealPlans.map((row, index) => (
                <Card
                  sx={{ maxWidth: 600 }}
                  key={index}
                  style={{ marginBottom: '1%' }}
                >
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {row.title}
                      </Avatar>
                    }
                    title={row.title}
                    subheader={row.category + '  Meal plan'}
                  />
                  <CardMedia
                    component="img"
                    height="194"
                    image={row.mealsPicURL}
                    alt="Paella dish"
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                    ></Typography>
                  </CardContent>
                </Card>
              ))}
          </Container>
        </Col>
        <Col xs={3}>
          <SideNotoficationPanel />
        </Col>
      </Row>
    </div>
  );
};

export default HomeMealPage;

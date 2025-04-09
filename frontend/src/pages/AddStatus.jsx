import React, { useState } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { ReactTyped } from 'react-typed';
import NavBar from '../components/NavBar';

const AddStatus = () => {

  const userInfoString = localStorage.getItem('UserInfo');
  const storedUserInfo = JSON.parse(userInfoString);
  console.log("user Id",storedUserInfo);

  const [user, setUser] = useState('');
  const [description, setDescription] = useState('');
  const [distanceRan, setDistanceRan] = useState('');
  const [pushups, setPushups] = useState('');
  const [benchPress, setBenchPress] = useState('');
  const [comments, setComments] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/user/StatusTest', {
        user:storedUserInfo.userName,
        description,
        distanceRan: parseFloat(distanceRan),
        pushups: parseInt(pushups),
        benchPress: parseFloat(benchPress),
        comments: [comments]
      });
      alert('Status inserted successfully!');
      window.location.href = "/myprofile";
      setUser('');
      setDescription('');
      setDistanceRan('');
      setPushups('');
      setBenchPress('');
      setComments('');
    } catch (error) {
      console.error('Error inserting status: ', error);
      alert('Error inserting status!');
    }
  };

  const validateWorkoutMetrics = (value) => {
    // Regular expression for xxxx-xxxx format
    const regex = /^[0-9]{4}-[0-9]{4}$/;
    return regex.test(value);
  };

  return (
    <div style={{ backgroundImage: "url('../assets/Status.jpg')", backgroundSize: 'cover', minHeight: '100vh' }}>
      <NavBar/>
      <h2 style={{ paddingTop: '20px' }}><center><ReactTyped className="fw-bolder"  strings={['Share your workout progress to the world !']} typeSpeed={100} backSpeed={50} loop /></center></h2>


      <div className="container"  >
        <h4 className="fw-bolder">Create your Status here.</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label"><b>Workout Metrics</b> (workout-parameter)</label>
            <textarea className="form-control" placeholder='MarathonPace Run - 12KM'    value={description} onChange={(e) => setDescription(e.target.value)} required />
            {!validateWorkoutMetrics(description) && <small className="text-danger">Please enter the workout metrics in the format Workout-Parameter.</small>}
          </div>
          <div className="mb-3">
            <label className="form-label"><b>Max Distance Ran (KM)</b></label>
            <input type="number" step="0.01" className="form-control" value={distanceRan} onChange={(e) => setDistanceRan(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label"><b>Pushups</b></label>
            <input type="number" className="form-control" value={pushups} onChange={(e) => setPushups(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label"><b>Bench Press (KG)</b></label>
            <input type="number" step="0.01" className="form-control" value={benchPress} onChange={(e) => setBenchPress(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label"><b>Work to be done</b></label>
            <input type="text" className="form-control" value={comments} onChange={(e) => setComments(e.target.value)} required />
            {!validateWorkoutMetrics(description) && <small className="text-danger">Enter Something you want to achieve in your workout checklist in near future.</small>}
          </div>
          <button type="submit" className="btn btn-primary btn-block" style={{ width: '100%' }}>Add to your status !</button>
        </form>
      </div>
    </div>
  )
}

export default AddStatus;

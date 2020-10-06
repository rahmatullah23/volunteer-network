import React, { useContext, useState } from 'react';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import MomentUtils from '@date-io/moment';
import { Button } from '@material-ui/core';
import Volunteer from '../Volunteer/Volunteer';
// import Register from '../Register/Register';
import Registr from '../Register/Registr';
import Event from '../Event/Event';
import Login from '../Login/Login';
import { UserContext } from '../../App';
import { Link } from 'react-router-dom';

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [selectedDate, setSelectedDate] = useState({
        checkIn:new Date(),
        checkOut:new Date()
    });

  const handleCheckInDate = (date) => {
      const newDates = {...selectedDate}
      newDates.checkIn = date;
    setSelectedDate(newDates);
  };
  const handleCheckOutDate = (date) => {
      const newDates = {...selectedDate}
      newDates.checkOut = date;
    setSelectedDate(newDates);
  };
  const handleBooking = () => {
      const newBooking = { ...loggedInUser,...selectedDate}
      // const newBooking = { 'title':'child support', 'imgUrl':'https://ibb.co/stSMt7y'}
      
      fetch('http://localhost:4007/addvolun',{
          method : 'POST',
          headers: {'content-type': 'application/json'},
          body: JSON.stringify(newBooking)
      })
      .then(res => res.json())
      .then(data => {
          console.log(data);
      })

  }
  
    return (
        <div className="row">
          <Volunteer></Volunteer>
          <h1> Hello {loggedInUser.name}! Let's book </h1>
            <MuiPickersUtilsProvider utils={MomentUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Check In Date "
          value={selectedDate.checkIn}
          onChange={handleCheckInDate}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Check Out Date "
          format="dd/MM/yyyy"
          value={selectedDate.checkOut}
          onChange={handleCheckOutDate}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
      <Link to={"/event"}><input  type="submit" /> </Link>
      
      <Button onClick={handleBooking} variant="contained" color="primary">Book Now</Button>
    </MuiPickersUtilsProvider>
    
    {/* <Registr></Registr>
    <Event></Event>
    <Login></Login> */}
            
        </div>
    );
};

export default Home;
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';


const Event = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4007/events?email=' + loggedInUser.email, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => setEvents(data))
  }, [])

  function handleRemove(id) {
    fetch(`http://localhost:4007/delete/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(data => {
        if (data) {

          alert('deleted successfully');
        }
      })

  }

  return (
    <div className="row ">
      {
        events.map(event => <div className="col-md-6  " key={event._id} style={{marginTop:20}}>
          <div >
            <img src={event.imgUrl} alt="" /> 
          </div>
          <h5>{event.title}</h5>
          <p> {new Date(event.orderTime).toDateString('dd/MM/yy')}</p>
          
          <br />
          <button type="button" onClick={() => handleRemove(event._id)}>
            Cancel
          </button>
        </div>)
      }
    </div>
  );
};

export default Event;
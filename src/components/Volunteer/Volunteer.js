import { CardMedia } from '@material-ui/core';
import React from 'react';
import  { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Volunteer = () => {
    const [task, setTask] = useState([]);
    useEffect(()=> {
        fetch('https://damp-everglades-78096.herokuapp.com/volunteer')
        .then(res=>res.json())
        .then(data =>setTask(data))
    },[])
   
    
    return (
        <div className="row">
          {
              task.map(task => 
              <div className="col-md-3" key={task._id}> 
               <img src={task.imgUrl} alt="" />
                <h6><Link to={"/registr"}>{task.title}  </Link></h6>              
              </div>) 
          }
          
           
        </div>
    );
};


export default Volunteer;
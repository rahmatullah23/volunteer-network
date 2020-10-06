import React from 'react';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { Link, useParams } from 'react-router-dom';
import './register.css'
import logo from '../../images/logos/Group 1329.png'

const Register = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const onSubmit = data => {
      const orderDetails = {...loggedInUser, data,   orderTime: new Date()};

      fetch('https://damp-everglades-78096.herokuapp.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderDetails)
      })
      .then(res => res.json())
      .then(data => {
        if(data){
        //   processOrder();
          alert('your order placed successfully');
        }
      })

    };

//   console.log(watch("example")); // watch input value by passing the name of it
const {title} = useParams();
  return (
      <div className="row">
          <div className="col-md-6 offset-3" >
          <Link to={"/home"}> <img style={{height:80}} src={logo} alt="" /></Link>
          
    <form className="regi-form" onSubmit={handleSubmit(onSubmit)}>
      <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Your Name" />
      {errors.name && <span className="error">Name is required</span>}
     
      <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })}  placeholder="Your Email"/>
      {errors.email && <span className="error">Email is required</span>}
     
      <input name="date" ref={register({ required: true })}  placeholder="Date"/>
      {errors.email && <span className="error">Date is required</span>}
     
      <input name="description" ref={register({ required: true })}  placeholder="Description" />
      {errors.address && <span className="error">Description is required</span>}
     
      <input name="task" defaultValue={title}ref={register({ required: true })}  placeholder="Detail Task"/>
      {errors.phone && <span className="error">Detail Task is required</span>}

      <Link to="/event"><input  type="submit" /></Link>
      
    </form>
    </div>
    </div>
  );
};

export default Register;
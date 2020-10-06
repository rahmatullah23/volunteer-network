import { useForm } from 'react-hook-form';
import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';

const Register = () => {
    const { register, handleSubmit, watch, errors } = useForm();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  
    //   const handleBooking = () => {
    //     const newBooking = {...loggedInUser, ...selectedDate}
    //     fetch('http://localhost:4050/addBooking',{
    //         method : 'POST',
    //         headers: {'content-type': 'application/json'},
    //         body: JSON.stringify(newBooking)
    //     })
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log(data);
    //     })
  
    // }

     // const orderDetails = { shipment: data, title : 'Humanity', orderTime: new Date()};
      // fetch('http://localhost:4007/addOrder', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(orderDetails)
      // })
      // .then(res => res.json())
      // .then(data => {
      //   if(data){
          
      //     alert('your order placed successfully');
      //   }
      // }) 

    
    
 
  const onSubmit = data => {
    // const savedCart = getDatabaseCart();
      const orderDetails = {...loggedInUser,  shipment: data, orderTime: new Date()};

      fetch('http://localhost:4007/addOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderDetails)
      })
      .then(res => res.json())
      .then(data => {
        if(data){
          // processOrder();
          alert('your order placed successfully');
        }
      });

    
    return (
      <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
        <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Your Name" />
        {errors.name && <span className="error">Name is required</span>}
       
        <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })}  placeholder="Your Email"/>
        {errors.email && <span className="error">Email is required</span>}
       
        <input name="address" ref={register({ required: true })}  placeholder="Your Address" />
        {errors.address && <span className="error">Address is required</span>}
       
        <input name="phone" ref={register({ required: true })}  placeholder="Your Phone Number"/>
        {errors.phone && <span className="error">Phone Number is required</span>}
        
        <input type="submit" />
      </form>
    );


    // return (
    //     <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
    //   <input name="name" defaultValue ref={register({ required: true })} placeholder="Your Name" />
    //   {errors.name && <span className="error">Name is required</span>}
     
    //   <input name="email" defaultValue ref={register({ required: true })}  placeholder="Your Email"/>
    //   {errors.email && <span className="error">Email is required</span>}
     
    //   <input name="address" ref={register({ required: true })}  placeholder="Your Address" />
    //   {errors.address && <span className="error">Address is required</span>}
     
    //   <input name="phone" ref={register({ required: true })}  placeholder="Your Phone Number"/>
    //   {errors.phone && <span className="error">Phone Number is required</span>}
      
    //   <input type="submit" />
    // </form>
    // );
};

export default Register;
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import {API} from './../../utils/apiURL';
import {Link} from 'react-router-dom';

const Signup = ()=>{
  const [data, setData] = useState({
    fName:'',lName:'',email:'',phone:'',pwd:''
  });
  const [validity, setValidity] = useState({
    validInputs : [],
    isValid : false
  });
  
  const updateValidity = (name, isValid)=>{
    setValidity(prevState => ({
        validInputs : isValid ? (
            prevState.validInputs.includes(name) ? (
                [...prevState.validInputs]
              ) : (
                [...prevState.validInputs,name]
              )
          ) : (
            prevState.validInputs.includes(name) ? (
                prevState.validInputs.filter(val => val!=name)
              ) : (
                [...prevState.validInputs]
              )
          ),
        isValid : isValid ? (prevState.validInputs.length+1>=5 ? true : false) : false
      })
    )
    console.log(validity);
  }
  
  const updateData = (e)=>{
    setData({
      ...data,[e.target.name]:e.target.value
    });
    switch(e.target.name){
      case 'fName':
      case 'lName':
        if(e.target.value.trim().length<1 || e.target.value.trim().indexOf(' ')>=0)
          updateValidity(e.target.name,false);
        else
          updateValidity(e.target.name,true);
        break;
      case 'email':
        let email = e.target.value.trim();
        if(/^\S+@\S+\.\S+$/.test(email))
          updateValidity(e.target.name,true);
        else
          updateValidity(e.target.name,false);
        break;
      case 'phone':
        let number = e.target.value.trim();
        if(/^\d{10}$/.test(number))
          updateValidity(e.target.name,true);
        else
          updateValidity(e.target.name,false);
        break;
      case 'pwd':
        let pwd = e.target.value.trim();
        if(pwd.length>=8)
          updateValidity(e.target.name,true);
        else
          updateValidity(e.target.name,false);
        break;
    }
  }
  const signupUser = (e)=>{
    e.preventDefault();
    
    axios.post(`${API}signup`,data).then(res => {
      if(res.status===200) alert("Success");
    }).catch(err=>{
      alert(err.response.data.errMsg);
    })
  }
  return (
    <React.Fragment>
      <div className="container">
        <div className="innerContainer">
         <form>
          <label for="fName">First Name : </label>
          <input 
            type="text"
            name="fName"
            placeholder="First Name"
            onChange={updateData}
            value={data.fName}
            required
          />
          <br />
          <label for="lName">Last Name : </label>
          <input 
            type="text"
            name="lName"
            placeholder="Last Name"
            onChange={updateData}
            value={data.lName}
            required
          />
          <br />
          <label for="email">Email : </label>
          <input 
            type="text"
            name="email"
            placeholder="Email"
            onChange={updateData}
            value={data.email}
            required
          />
          <br />
          <label for="phone">Phone : </label>
          <input 
            type="text"
            name="phone"
            placeholder="1234567890"
            onChange={updateData}
            value={data.phone}
            required
          />
          <br />
          <label for="pwd">Password : </label>
          <input 
            type="text"
            name="pwd"
            placeholder="Password"
            onChange={updateData}
            value={data.pwd}
            required
          />
          <br />
          <input 
            type="submit"
            onClick={signupUser}
            disabled={!validity.isValid}
            value="Signup" 
          />
          </form>
        </div>
        <div>Already have an account? <Link to="/login">Login</Link></div>
      </div>
    </React.Fragment>
    )
}
export default Signup;
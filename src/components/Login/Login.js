import React from 'react';
import {useDispatch} from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {API} from './../../utils/apiURL';
import {Link} from 'react-router-dom';
import {setAuthenication} from './../../store/userSlice';

const Login = ()=>{
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    email:'',pwd:''
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
        isValid : isValid ? (prevState.validInputs.length+1>=2 ? true : false) : false
      })
    )
  }
  
  const updateData = (e)=>{
    setData({
      ...data,[e.target.name]:e.target.value
    });
    switch(e.target.name){
      case 'email':
        let email = e.target.value.trim();
        if(/^\S+@\S+\.\S+$/.test(email))
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
  const loginUser = (e)=>{
    e.preventDefault();
    
    axios.post(`/login`,data).
    then(res=>{
       if(res.status===200){
         alert("Logged In!");
         dispatch(setAuthenication({payload:true}));
         navigate('/',{replace:true});
       }
    }).
    catch(err=>{
      alert(err.response.data.errMsg);
    });
  }
  return (
    <React.Fragment>
      <div className="container">
        <div className="innerContainer">
         <form>
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
            onClick={loginUser}
            disabled={!validity.isValid}
            value="Login" 
          />
          </form>
        </div>
        <div>Don't have an account? <Link to="/signup">SignUp</Link></div>
      </div>
    </React.Fragment>
    )
}
export default Login;
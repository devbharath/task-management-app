import React, { useEffect, useState  } from "react";
import axios from "axios";
import style from "../Global CSS/style.css";
import ContactComp from "../Social-media/ContactComp";
import TopNavBar from "../Top-NavBar/TopNavBar";
import {Link,useNavigate} from 'react-router-dom'
import { UserDetails } from "../../App";

function Login() {

  const convalue = React.useContext(UserDetails);  
  const navigate=useNavigate()

    const [userInput,setUserInput]=useState({
      typedempid:'',
      typedpassword:'',
    })
    const [fetchedData,setFetchedData]=useState([])



  useEffect(() => {
    
  }, []);



  const check=()=>{
    axios.get('http://localhost:6006/user-details/fetchuser')
    .then((res)=>{
      setFetchedData(res.data)
      let testobj=res.data
      const currUser=testobj.filter((user)=>{
        return userInput.typedempid===user.empid && userInput.typedpassword===user.password
      })
      console.log(currUser.length)
      if (currUser.length==1) {
        alert("matched")
        convalue.dispatch({type:'CURRENT_USER',payload:currUser})
        console.log(currUser)
        navigate(currUser[0]._id+'/Dashboard')
      }
       else {
        alert("password doesnt match")
      }
    })
  }

  const validateloginn=(e)=>{
    e.preventDefault()
    if (userInput.typedempid!=="" && userInput.typedpassword!=="") {
      check()
    }else{
      alert("Fields are empty")
    }
  }





  return (
    <div className="login-sign-cont">
      <TopNavBar/>
      <ContactComp />
      <div className="quotes-cont">
        <div  className="company-info">IT Company Pvt Ltd</div>
        <div className="welcome-text">Welcome Back</div>
        {/* <div className="quote-text">"{quote}"</div> */}
        
      </div>
      <div className="login-cont">
        <form onSubmit={(e)=>validateloginn(e)}>
          <div className="login-sign-title">Login</div>
          <div className="input-cont">
            <input
              className="log-sign-input"
              value={userInput.typedempid}
              onChange={(e)=>setUserInput({...userInput,typedempid:e.target.value})}
              type="text"
              placeholder="Username"
            ></input>
          </div>
          <div>
            <input
              className="log-sign-input"
              value={userInput.typedpassword}
              onChange={(e)=>setUserInput({...userInput,typedpassword:e.target.value})}
              type="password"
              placeholder="Password"
            ></input>
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
          <div className="sm-white">Forgot Password?</div>
          <div className="sm-white">Dont have an account? <Link to='/SignUp'>Sign Up</Link></div>
        </form>
      </div>
    </div>
  );
}

export default Login;

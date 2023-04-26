import "./Login.css"
import Footer from '../../Layouts/Footer/Footer'
import Header from '../../Layouts/Header/Header'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import '../Global'

const Login = () => {
//user session
// const dispatch=useDispatch();
// const {GuserData} = bindActionCreators();

//end
useEffect(()=>{
  window.sessionStorage.clear();
 },[])
const navigateObject= new useNavigate();

const [username,setUsername]=useState("");
const [user,setUser] = useState({});

const getUserData=async(event)=>{
  event.preventDefault();
 
  let resp=await axios.get(`http://localhost:8080/customer/${username}`)
  .catch((err)=>{
        alert("Error");
  })
  console.log(resp);
  if(!resp.data){
    alert("invalid user");
    return ;
  }
  let uu=resp.data;
  setUser(resp.data);
 window.sessionStorage.clear();
  if(uu.role==="ADMIN"){
    window.sessionStorage.setItem("userid",uu.customerId);
    window.sessionStorage.setItem("role",uu.role);
    navigateObject(`/admindashboard/banks/${uu.customerId}`)
  }
  else if(uu.role==="USER"){
    window.sessionStorage.setItem("userid",uu.customerId);
    window.sessionStorage.setItem("role",uu.role);
    navigateObject(`/userdashboard/accounts/${uu.customerId}`)
  }else{
    console.log("not matched");
  }

}
  return (
    <>
      <Header ></Header>
      <div id="login-container">
        <form id="middle-container">
            <div >Login</div>
            <input type='text' placeholder='Enter Username' value={username} onChange={(e)=>setUsername(e.target.value)}/>
            <input type='text' value="password" placeholder='Enter Username' disabled/>
            <div id="btn-div">
                <button onClick={getUserData}>Login</button>
            </div>
            
      </form>
      {/* <div id="notification"> Wrong Username</div> */}
      </div>
      <Footer></Footer>
    </>
    
  )
}

export default Login

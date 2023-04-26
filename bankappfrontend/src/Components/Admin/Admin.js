import React, { useEffect, useState } from 'react'
import Header from '../../Layouts/Header/Header';
import Error from '../../Layouts/Error/Error';
import "./Admin.css"
import Footer from '../../Layouts/Footer/Footer';
import Bank from './Bank/Bank';
import Customer from './Customer/Customer';
import Accounts from './Accounts/Accounts';
import { useParams } from 'react-router-dom';
import User from '../User/User';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const params=useParams();
  const navigateObject= new useNavigate();
  useEffect(()=>{
    const ssu= window.sessionStorage.getItem("userid");
    const ssr= window.sessionStorage.getItem("role");
    if(!ssu){
      navigateObject(`/`);
    }
    if(ssr!="ADMIN"||ssu!==params.user){
      navigateObject(`/`);
    }
    
   },[])

  let inner=`<li className="nav-item active">
  <a className="nav-link" href="/admindashboard/banks/${params.user}">Banks <span className="sr-only"></span></a>
</li>
<li className="nav-item">
  <a className="nav-link" href="/admindashboard/users/${params.user}">Users</a>
</li>
<li className="nav-item">
  <a className="nav-link" href="/admindashboard/accounts/${params.user}">Accounts</a>
</li>
<li className="nav-item">
  <a className="nav-link" id="logout" href="/">Logout</a>
</li>`;

if(params.page=="accounts"){
  return (
    <div>
      <Header inner={inner}/>
      <div id="main-container">
          <div id="operation-container">
              <Accounts/>
          </div>
      </div>
      <Footer/>
    </div>
  )
}
if(params.page=="users"){
  return (
    <div>
      <Header inner={inner}/>
      <div id="main-container">
          <div id="operation-container">
              <Customer/>
          </div>
      </div>
      <Footer/>
    </div>
  )
  }
if(params.page=="banks"){
  return (
    <div>
      <Header inner={inner}/>
      <div id="main-container">
          <div id="operation-container">
              <Bank/>
          </div>
      </div>
      <Footer/>
    </div>
  )
}
else{
  return (
    <div>
      <Header inner={inner}/>
      <div id="main-container">
          <div id="operation-container">
              <Error/>
          </div>
      </div>
      <Footer/>
    </div>
  )
}
}

export default Admin

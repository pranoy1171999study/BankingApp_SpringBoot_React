import React, { useEffect, useState } from 'react'
import Header from '../../Layouts/Header/Header';
import Error from '../../Layouts/Error/Error';
import "./User.css"
import Footer from '../../Layouts/Footer/Footer';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import Accounts from './Accounts/Accounts';
import Passbook from './Passbook/Passbook';
import Transactions from './Transactions/Transactions';
import { useNavigate } from 'react-router-dom';

const User = () => {
  const params=useParams();
  const navigateObject= new useNavigate();
  useEffect(()=>{
    const ssu= window.sessionStorage.getItem("userid");
    const ssr= window.sessionStorage.getItem("role");
    if(!ssu){
      navigateObject(`/`);
    }
    if(ssr!="USER"||ssu!==params.user){
      navigateObject(`/`);
    }
    
   },[])
  
    
  
  
  
  let inner=`<li className="nav-item active">
  <a className="nav-link" href="/userdashboard/accounts/${params.user}">Accounts <span className="sr-only"></span></a>
</li>
<li className="nav-item">
  <a className="nav-link " id="logout" href="/">Logout</a>
</li>
`;
let trInner=
`<li className="nav-item active">
    <a className="nav-link" href="/userdashboard/accounts/${params.user}">Accounts <span className="sr-only"></span></a>
</li>
<li className="nav-item">
  <a className="nav-link " id="logout" href="/">Logout</a>
</li>
`;

if(params.page=="accounts"){
  if(params.acc){
    return (
      <div>
        <Header inner={inner}/>
        <div id="main-container">
            <div id="operation-container">
                <Passbook/>
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
                <Accounts/>
            </div>
        </div>
        <Footer/>
      </div>
    )
  }
}
// if(params.page=="passbook"){
//   return (
//     <div>
//       <Header inner={inner}/>
//       <div id="main-container">
//           <div id="operation-container">
              
//           </div>
//       </div>
//       <Footer/>
//     </div>
//   )
//   }
if(params.page=="transactions"){
  return (
    <div>
      <Header inner={trInner}/>
      <div id="main-container">
          <div id="operation-container">
              <Transactions/>
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

export default User

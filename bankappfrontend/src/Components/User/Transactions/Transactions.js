import React, { useState } from 'react'
import "./Transactions.css"
import { useParams } from 'react-router-dom'
import Deposite from "./Deposite/Deposite"
import Withdrawl from "./Withdrawl/Withdrawl"
import Sendmoney from "./Sendmoney/Sendmoney"
import axios from 'axios'
import { useEffect } from 'react'

const Transactions = () => {
  const params=useParams();
  const acc=params.acc;
  const depositeUrl=`/userdashboard/transactions/${params.user}/${params.acc}/deposite`;
  const withdrawlUrl=`/userdashboard/transactions/${params.user}/${params.acc}/withdrawl`;
  const sendUrl=`/userdashboard/transactions/${params.user}/${params.acc}/send`;

  const [abb,setAbb]= useState("");
  const [bal,setBal]= useState("");
  async function getAccountDetails(){
    let url=`http://localhost:8080/account/${acc}`;
    let resp=await axios.get(url)
    .catch((err)=>{
          alert("Error");
    })
    if(resp.status===200){
      let data=resp.data;
      setAbb(data.bank.abbrevieation);
      
      setBal(" ( "+data.balance+" ) ");
    }
    console.log(resp);
    console.log(acc);
      
  }
  useEffect(()=>{
    //run when the page rendered
    getAccountDetails();

  },[])
  if(params.trtype==="deposite"){
    return (
      <div id="tr-options">
        <div id="acc-details"><span className='red'>{abb} {acc} </span><span className='green'>  {bal}</span> </div>
          <div id="tr-options-inner">
              <a href={depositeUrl}>Deposite</a>
              <a href={withdrawlUrl}>Withdrawl</a>
              <a href={sendUrl}>Send Money</a>
        </div>
        <div id="tr-operation">
            <Deposite/>
        </div>
      </div>
    )
  }else if(params.trtype==="withdrawl"){
    return (
      <div id="tr-options">
          <div id="acc-details"><span className='red'>{abb} {acc} </span><span className='green'>  {bal}</span> </div>
          <div id="tr-options-inner">
              <a href={depositeUrl}>Deposite</a>
              <a href={withdrawlUrl}>Withdrawl</a>
              <a href={sendUrl}>Send Money</a>
        </div>
        <div id="tr-operation">
            <Withdrawl/>
        </div>
      </div>
    )
  }else if(params.trtype==="send"){
    return (
      <div id="tr-options">
        <div id="acc-details"><span className='red'>{abb} {acc} </span><span className='green'>  {bal}</span> </div>
          <div id="tr-options-inner">
              <a href={depositeUrl}>Deposite</a>
              <a href={withdrawlUrl}>Withdrawl</a>
              <a href={sendUrl}>Send Money</a>
        </div>
        <div id="tr-operation">
            <Sendmoney/>
        </div>
      </div>
    )
  }else{
    return (
      <div id="tr-options">
        <div id="acc-details"><span className='red'>{abb} {acc} </span><span className='green'>  {bal}</span> </div>
          <div id="tr-options-inner">
              <a href={depositeUrl}>Deposite</a>
              <a href={withdrawlUrl}>Withdrawl</a>
              <a href={sendUrl}>Send Money</a>
        </div>
        
      </div>
    )
  }
  
}

export default Transactions

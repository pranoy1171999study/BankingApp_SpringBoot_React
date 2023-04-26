import React, { useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';


const PassbookAccBal = () => {
  const params=useParams();
  const acc=params.acc;
  const [abb,setAbb]=useState("");
  const [accNo,setAccNo]=useState("");
  const [bal,setBal]=useState("");

  async function getAccountDetails(){
    let url=`http://localhost:8080/account/${acc}`;
    let resp=await axios.get(url)
    .catch((err)=>{
          alert("Error");
    })
    if(resp.status===200){
      let data=resp.data;
      setAbb(data.bank.abbrevieation);
      setAccNo(data.accNo);
      setBal(data.balance);
    }
    console.log(resp);
    console.log(acc);
      
  }
  useEffect(()=>{
    //run when the page rendered
    getAccountDetails();
    
  },[])
  return (
    <>
      <span className='red'>{abb}{accNo} </span>
      <span className=''> ( RS : {bal} )</span>
    </>
  )
}

export default PassbookAccBal

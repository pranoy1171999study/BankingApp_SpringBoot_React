import React from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import Loader from '../../../../Layouts/Loader/Loader';

const Withdrawl = () => {
  const [loader,setLoader]=useState(false);
  const params=useParams();
  const [amount,setAmount]=useState("");

  const withdrawl=async(event)=>{
    event.preventDefault();
    setLoader(true);
    if(amount<=0){
      alert("amount should be positive");
      setLoader(false);
      return;
    }
    let url=`http://localhost:8080/tranjuction/withdrawl?acc=${params.acc}&amount=${amount}`;
      let resp=await axios.put(url)
      .catch((err)=>{
            alert("Error");
            setLoader(false);
      })
      console.log(resp);
      if(resp.status===200){
        let accounts=resp.data;
        alert(resp.data);
        setAmount("");
      }
      setLoader(false);
  }
  return (
    <div id="tr-op-container">
      <Loader active={loader}/>
      <input type='number' placeholder='amount' value={amount} onChange={(e)=>setAmount(e.target.value)}/>
      <input type='number' placeholder='Password' disabled/>
      <button onClick={withdrawl}>Withdrawl</button>
    </div>
  )
}

export default Withdrawl

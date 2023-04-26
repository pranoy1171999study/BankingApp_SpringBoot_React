import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Loader from '../../../../Layouts/Loader/Loader';

const Sendmoney = () => {
  const [loader,setLoader]=useState(false);
  const params=useParams();
  const [raccount,setRAccount]=useState("");
  const [tramount,settrAmount]=useState("");
  const [abbr,setAbbr] = useState("");
  const [sname,setSname]=useState("");
  async function getAccountDetails(acc){
    setSname("");
    setAbbr("");
    setLoader(true);
    let url=`http://localhost:8080/account/${acc}`;
    let resp=await axios.get(url)
    .catch((err)=>{
          alert("Error");
          setLoader(false);
          return false;
    })
    if(resp.status===200&&resp.data){
      let data=resp.data;
      setAbbr("("+data.bank.abbrevieation+")");
      setSname(data.c_id.fName+" "+data.c_id.lName);
      return true;
    }
    console.log(resp);
    console.log(acc);
    setLoader(false);
    
  }
  const sendMoney=async(event)=>{
    // event.preventDefault();
    // if(getAccountDetails(raccount)){
    //   let url=`http://localhost:8080/tranjuction/transfer?sender=${params.acc}&reciever=${raccount}&tramount=${tramount}`;
    //   let resp=await axios.put(url)
    //   .catch((err)=>{
    //         console.log(err);
    //         alert("Error");
    //   })
    //   console.log(resp);
    //   if(resp.status===200&&resp.data){
    //       setAbbr("");
    //       settrAmount("");
    //       setRAccount("");
    //       setSname(resp.data);
    //   }

      
    // }
    setLoader(true);
    var config = {
      method: 'put',
      url: `http://localhost:8080/tranjuction/transfer?sender=${params.acc}&reciever=${raccount}&amount=${tramount}`,
      headers: { }
    };
    
    axios(config)
    .then(function (resp) {
      console.log(JSON.stringify(resp.data));
      setAbbr("");
      settrAmount("");
      setRAccount("");
      setSname("");
      alert(resp.data)
      setLoader(false);
    })
    .catch(function (error) {
      console.log(error);
      setLoader(false);
    });
  }
  const getRecieverDetails=(reciever)=>{
    setRAccount(reciever);
    getAccountDetails(reciever);
  }

  
  return (
    <div id="tr-op-container">
      <Loader active={loader}/>
      <div id="reciever-data">{sname} {abbr}</div>
      <input type='number' placeholder='Acc No' value={raccount} onChange={(e)=>getRecieverDetails(e.target.value)}/>
      <input type='number' placeholder='trAmount' value={tramount} onChange={(e)=>settrAmount(e.target.value)}/>
      <input type='number' placeholder='Password' disabled/>
      <button onClick={sendMoney}>Send</button>
    </div>
  )
}

export default Sendmoney

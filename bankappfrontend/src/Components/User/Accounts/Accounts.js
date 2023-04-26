import {React,useState,useEffect} from 'react'
import axios from 'axios';
import Pagination from '../../../Layouts/Pagination/Pagination';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../../Layouts/Loader/Loader';

const Accounts = () => {
  const [loader,setLoader]=useState(false);
  const navigateObject= new useNavigate();
  const params=useParams();


  const [accountsdata,setAccountsData]=useState("");
  const loadAccounts=async()=>{
      let url=`http://localhost:8080/account/customer/10000002`;
      let resp=await axios.get(url)
      .catch((err)=>{
            alert("Error");
      })
      console.log(resp);
      if(resp.status===200){
        let accounts=resp.data;
        setAccountsData(accounts.map((account,index)=>{
          return(
            <tr>
                    <td>{account.accNo}</td>
                    <td>{account.bank.abbrevieation}</td>
                    <td>{account.balance}</td>
                    <td className='passbook-outer'><div className='passbook' onClick={()=>showPassbook(account.accNo)}>Passbook</div></td>
                    <td className='tranjact-outer'><div className='tranjact' onClick={()=>doTransaction(account.accNo)}>Tranjact</div></td>
              </tr>
        )}));
        console.log(resp);
        
      }
  }
 
  useEffect(()=>{
    //run when the page rendered
    loadAccounts();

  },[])

 function showPassbook(accNo){
  navigateObject(`/userdashboard/accounts/${params.user}/${accNo}`)
 }
 function doTransaction(accNo){
  navigateObject(`/userdashboard/transactions/${params.user}/${accNo}`)
 }
  return (
    <>
        <div className="sub-container">
            <div className='t-upper'>
              <div className='info'>Accounts <Loader active={loader}/></div>
              <div className='pagination'>
                
              </div>
            </div>
            <div className="sub-container-inner">
                <table>
                  <tr>
                    <th>Acc No</th>
                    <th>Bank</th>
                    <th>Balance</th>
                    <th></th>
                    <th></th>
                  </tr>
                  {accountsdata}
                </table>
            </div>
        </div>
    </>
  )
}

export default Accounts

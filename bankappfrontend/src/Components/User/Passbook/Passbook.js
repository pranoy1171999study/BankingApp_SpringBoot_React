import {React,useState,useEffect} from 'react'
import axios from 'axios';
import Pagination from '../../../Layouts/Pagination/Pagination';
import { useParams } from 'react-router-dom';
import "./Passbook.css"
import PassbookAccBal from './PassbookAccBal/PassbookAccBal';
import PageSize from '../../../Layouts/PageSize/PageSize';
import Loader from '../../../Layouts/Loader/Loader';

const Passbook = () => {
  const params=useParams();
  const [loader,setLoader]=useState(false);
  let maxPage=1;
  let currentPage=0;
  let pageSize=5;
  const handlePageSize=(pagelimit)=>{
    pageSize=pagelimit;
    loadPassbooks();
  }
  const [pagination,setPagination]=useState({page:{
    current:0,
    total:0,
    fun:{
    }}})

const goLeft=()=>{
if(currentPage>0){
currentPage--;
loadPassbooks();
setPagination({page:{
current:currentPage,
total:maxPage,
fun:{
goLeft,
goRight
}}})
}

}
const goRight=()=>{
if(currentPage<maxPage-1){
currentPage++;
loadPassbooks();
setPagination({page:{
current:currentPage,
total:maxPage,
fun:{
goLeft,
goRight
}}})
}
}
  const [Passbookdata,setPassbookData]=useState("");

  const loadPassbooks=async()=>{
    if(!params.acc){
      return;
    }
    setLoader(true);
      let url=`http://localhost:8080/tranjuction/acc/${params.acc}/page?pageno=${currentPage}&size=${pageSize}`;
      let resp=await axios.get(url)
      .catch((err)=>{
            alert("Error");
            setLoader(false);
      })
      if(resp.status===200){
        maxPage=resp.data.totalPages;
        let Passbooks=resp.data.content;
        setPagination({page:{
          current:currentPage,
          total:maxPage,
          fun:{
            goLeft,
            goRight
          }}});
        setPassbookData(Passbooks.map((passbook,index)=>{
          return(
              <tr>
              <td>{passbook.trId}</td>
              <td>{passbook.amount}</td>
              <td>{detectSender(passbook.sender)}</td>
              <td>{detectReciever(passbook.reciever)}</td>
              {detectType(passbook.sender)}
              <td>{passbook.time}</td>
            </tr>
        )}));
        console.log(Passbookdata);
        setLoader(false);
      }
  }
  function detectSender(sender){
      if(sender===-1){
        return "Cash Deposit";
      }
      else{
        return sender;
      }
  }
  function detectReciever(reciever){
    if(reciever===-1){
      return "Cash Withdrawl";
    }
    else{
      return reciever;
    }
  }
  function detectType(sender){
      if(params.acc==sender){
        return(
          <td className='red'>Debited</td>
        )
      }
      else{
        return(
          <td className='green'>Credited</td>
        )
      }
  }
  useEffect(()=>{
    //run when the page rendered
    loadPassbooks();
    
  },[])
 
  
  return (
    <>
        <div className="sub-container">
            <div className='t-upper'>
              <div className='info'>Passbook</div>
              <div className='pagination'>
                <Pagination data={pagination}/>
                <PageSize pageHandleFun={handlePageSize}/>
                <Loader active={loader}/>
              </div>
              <div className='passbook-info-box'>
                <PassbookAccBal/>
              </div>
            </div>
            <div className="sub-container-inner">
                <table>
                  <tr>
                    <th>Tr Id</th>
                    <th>Amount</th>
                    <th>Sender</th>
                    <th>Reciever</th>
                    <th>Type</th>
                    <th>Time</th>
                  </tr>
                  {Passbookdata}
                  
                  
                </table>
            </div>
        </div>
    </>
  )
}

export default Passbook

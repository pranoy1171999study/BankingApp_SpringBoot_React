import {React,useState,useEffect} from 'react'
import axios from 'axios';
import Pagination from '../../../Layouts/Pagination/Pagination';
import PageSize from '../../../Layouts/PageSize/PageSize';
import Loader from '../../../Layouts/Loader/Loader';

const Bank = () => {
  const [loader,setLoader]=useState(false);
  let bankArr=[];
  let pageSize=5;
  const handlePageSize=(pagelimit)=>{
    pageSize=pagelimit;
    loadBanks();
  }
  let maxPage=1;
  let currentPage=0;
  const [pagination,setPagination]=useState({page:{
    current:0,
    total:0,
    fun:{
    }}})

const goLeft=()=>{
if(currentPage>0){
currentPage--;
loadBanks();
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
loadBanks();
setPagination({page:{
current:currentPage,
total:maxPage,
fun:{
goLeft,
goRight
}}})
}
}
  const [bankdata,setbankData]=useState("");

  const loadBanks=async()=>{
    setLoader(true);
      let url=`http://localhost:8080/bank/page?pageno=${currentPage}&size=${pageSize}`;
      let resp=await axios.get(url)
      .catch((err)=>{
            setLoader(false);
            alert("Error");
      })
      setLoader(false);
      if(resp.status===200){
        maxPage=resp.data.totalPages;
        let banks=resp.data.content;
        
        setPagination({page:{
          current:currentPage,
          total:maxPage,
          fun:{
            goLeft,
            goRight
          }}});
          console.log(banks);
          bankArr=banks;
          console.log(bankArr);
        setbankData(banks.map((bank,index)=>{
          return(
              <tr>
              <td>{bank.bankId}</td>
              <td>{bank.fullName}</td>
              <td>{bank.abbrevieation}</td>
              <td>10</td>
              <td className='update-outer'><div className='update' onClick={()=>_update(bank.bankId)}>Update</div></td>
              <td className='delete-outer'><div className='delete' onClick={()=>_delete(bank.bankId)}>Delete</div></td>
            </tr>
        )}));
        console.log(bankdata);
        setLoader(false);
      }
  }
  useEffect(()=>{
    //run when the page rendered
    loadBanks();
    
  },[])
  const [bankId,setBankid]=useState("");
  const [bankName,setbankname]=useState("");
  const [bankAbbr,setBankAbb]=useState("");

  const _update=async(id)=>{
    // alert("updated"+id);
    openAddContainerUpdate(id);
    
  }
  const _delete=async(id)=>{
    // alert("deleted"+id);
    setLoader(true);
    setBankid(id);
    var config = {
      method: 'delete',
      url: 'http://localhost:8080/bank/delete/'+id,
      headers: { }
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      alert("deleted");
      loadBanks();
      setLoader(false);
    })
    .catch(function (error) {
      console.log(error);
      setLoader(false);
    });
  }
  
  const _add=async()=>{
    setLoader(true);
    if(bankId!=""){
      var data = JSON.stringify({
        "bankId":bankId,
        "fullName": bankName,
        "abbrevieation": bankAbbr
      });
    }
    else{
      var data = JSON.stringify({
        "fullName": bankName,
        "abbrevieation": bankAbbr
      });
    }
    
    
    var config = {
      method: 'post',
      url: 'http://localhost:8080/bank/save',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      alert("successful");
      loadBanks();
      cancelAddContainer();
      setLoader(false);
    })
    .catch(function (error) {
      console.log(error);
      alert("Something Went Wrong");
      setLoader(false);
    });
  }
  

  const openAddContainer=()=>{
    document.getElementById("add-entity").classList="";
    setBankAbb("");
    setbankname("");
    setBankid("");
  }
  
  const openAddContainerUpdate=(id)=>{
    console.log(bankArr);
    let banko =null;
    bankArr.forEach((b)=>{
      if(b.bankId==id){
        banko=b;
      }
    })
    if(banko===null){
      alert("something went wrong");
      console.log(banko);
      console.log(id);
      return;
    }
    setBankAbb(banko.abbrevieation);
    setbankname(banko.fullName);
    setBankid(banko.bankId);
    document.getElementById("add-entity").classList="";
  }
  const cancelAddContainer=()=>{
    document.getElementById("add-entity").classList="hide";
  }
  const saveAddContainer=()=>{
    _add();
  }
  
  return (
    <>
        <div className="sub-container">
            <div className='t-upper'>
              <div className='info'>Banks</div>
              <button className='add' onClick={openAddContainer}>Add New bank</button>
              <div className='pagination'>
              <Pagination data={pagination}/>
              <PageSize pageHandleFun={handlePageSize}/>
              <Loader active={loader}/>
              </div>
            </div>
            <div className="sub-container-inner">
                <table>
                  <tr>
                    <th>Sr</th>
                    <th>Name</th>
                    <th>Abbr</th>
                    <th>Count of Accounts</th>
                    <th></th>
                    <th></th>
                  </tr>
                  {bankdata}
                  {/* <tr>
                    <td>1</td>
                    <td>State Bank of India</td>
                    <td>SBI</td>
                    <td>23</td>
                    <td className='update-outer'><div className='update'>Update</div></td>
                    <td className='delete-outer'>hii<div className='delete'>Delete</div></td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>State Bank of India</td>
                    <td>SBI</td>
                    <td>23</td>
                    <td className='update-outer'><div className='update'>Update</div></td>
                    <td className='delete-outer'>hii<div className='delete'>Delete</div></td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>State Bank of India</td>
                    <td>SBI</td>
                    <td>23</td>
                    <td className='update-outer'><div className='update'>Update</div></td>
                    <td className='delete-outer'>hii<div className='delete'>Delete</div></td>
                  </tr> */}
                  <tr id='add-entity'  className="hide">
                    <td></td>
                    <td><input type='text' value={bankName} onChange={(e)=>{setbankname(e.target.value)}}/></td>
                    <td><input type='text' value={bankAbbr} onChange={(e)=>{setBankAbb(e.target.value)}}/></td>
                    <td></td>
                    <td><div className='save'onClick={saveAddContainer}>Save</div></td>
                    <td><div className='cancel' onClick={cancelAddContainer}>Cancel</div></td>
                  </tr>
                </table>
            </div>
        </div>
    </>
  )
}

export default Bank

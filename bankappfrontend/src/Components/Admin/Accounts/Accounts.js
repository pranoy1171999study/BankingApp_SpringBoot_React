import {React,useState,useEffect} from 'react'
import axios from 'axios';
import Pagination from '../../../Layouts/Pagination/Pagination';
import PageSize from '../../../Layouts/PageSize/PageSize';
import Loader from '../../../Layouts/Loader/Loader';

const Accounts = () => {
  const [loader,setLoader]=useState(false);
  let accountsArr=[];
  let pageSize=5;
  const handlePageSize=(pagelimit)=>{
    pageSize=pagelimit;
    loadAccounts();
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
      loadAccounts();
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
      loadAccounts();
      setPagination({page:{
        current:currentPage,
        total:maxPage,
        fun:{
          goLeft,
          goRight
        }}})
    }
  }

  const [accountsdata,setAccountsData]=useState("");
  const loadAccounts=async()=>{
      setLoader(true);
      let url=`http://localhost:8080/account/page?pageno=${currentPage}&size=${pageSize}`;
      let resp=await axios.get(url)
      .catch((err)=>{
            alert("Error");
            setLoader(false);
      })
      if(resp.status===200){
        setLoader(false);
        maxPage=resp.data.totalPages;
        setPagination({page:{
          current:currentPage,
          total:maxPage,
          fun:{
            goLeft,
            goRight
          }}});
          console.log(pagination.page.fun);
        let accounts=resp.data.content;
        accountsArr=accounts;
        setAccountsData(accounts.map((account,index)=>{
          return(
            <tr>
                    <td>{account.accNo}</td>
                    <td>{account.c_id.customerId}</td>
                    <td>{account.bank.abbrevieation}</td>
                    <td>{account.balance}</td>
                    <td className='update-outer'><div className='update' onClick={()=>_update(account.accNo)}>Update</div></td>
                    <td className='delete-outer'><div className='delete' onClick={()=>_delete(account.accNo)}>Delete</div></td>
              </tr>
        )}));
        setLoader(false);
        //console.log(resp);
        
      }
  }
 
  useEffect(()=>{
    //run when the page rendered
    loadAccounts();
    getAllBanks();
  },[])
  //start
  const [allBanks,setAllBanks]=useState("");
  const [accId,setAccid]=useState("");
  const [customerId,setCustomerId]=useState("");
  const [bank,setBank]=useState("");
  const [bal,setbal]=useState("");

  const _update=async(id)=>{
    // alert("updated"+id);
    openAddContainerUpdate(id);
    
  }
  const getAllBanks=async()=>{
    setLoader(true);
    var config = {
      method: 'get',
      url: 'http://localhost:8080/bank',
      headers: { }
    };
    
    axios(config)
    .then(function (response) {
      let tbanks=response.data;
      setAllBanks(tbanks.map((key,val)=>{
          return(
            <option value={key.bankId} >{key.abbrevieation} {key.fullName}</option>
          )
      }))
      setLoader(false);
    })
    .catch(function (error) {
      console.log(error);
      setLoader(false);
    });
  }
  const _delete=async(id)=>{
    // alert("deleted"+id);
    setLoader(true);
    setAccid(id);
    var config = {
      method: 'delete',
      url: 'http://localhost:8080/account/delete/'+id,
      headers: { }
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      alert("deleted");
      loadAccounts();
      setLoader(false);
    })
    .catch(function (error) {
      console.log(error);
      setLoader(false);
    });
  }
  
  const _add=async()=>{
    setLoader(true);
    if(accId!=""){
      var config = {
        method: 'put',
        url: `http://localhost:8080/account/update/${accId}/${bal}/bank/${bank}/cid/${customerId}`,
        headers: { }
      };
    }
    else{
      var config = {
        method: 'post',
        url: `http://localhost:8080/account/set/${bal}/bank/${bank}/cid/${customerId}`,
        headers: { },
      };
    }
    
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      setLoader(false);
      alert(response.data);
      if(response.data==="Successful"){
        loadAccounts();
        cancelAddContainer();
      }
      
    })
    .catch(function (error) {
      console.log(error);
      alert("Something Went Wrong");
      setLoader(false);
    });
  }
  

  const openAddContainer=()=>{
    document.getElementById("add-entity").classList="";
   setAccid("");
   setBank("");
   setCustomerId("");
   setbal("");
  }
  
  const openAddContainerUpdate=(id)=>{
    console.log(accountsArr);
    let accounto =null;
    accountsArr.forEach((b)=>{
      if(b.accNo==id){
        accounto=b;
      }
    })
    if(accounto===null){
      alert("something went wrong");
      console.log(accounto);
      console.log(id);
      return;
    }
    
    setAccid(accounto.accNo);
    setBank(accounto.bank.bankId);
    setCustomerId(accounto.c_id.customerId);
    setbal(accounto.balance);
    document.getElementById("add-entity").classList="";
  }
  const cancelAddContainer=()=>{
    document.getElementById("add-entity").classList="hide";
  }
  const saveAddContainer=()=>{
    _add();
  }
  //end
  

  return (
    <>
        <div className="sub-container">
            <div className='t-upper'>
              <div className='info'>Accounts </div>
              <button className='add' onClick={openAddContainer}>Add New Account</button>
              <div className='pagination'>
                <Pagination data={pagination}/>
                <PageSize pageHandleFun={handlePageSize}/>
                <Loader active={loader}/>
              </div>
            </div>
            <div className="sub-container-inner">
                <table>
                  <tr>
                    <th>Acc No</th>
                    <th>Customer ID</th>
                    <th>Bank</th>
                    <th>Balance</th>
                    <th></th>
                    <th></th>
                  </tr>
                  {accountsdata}
                  {/* <tr>
                    <td>123244115</td>
                    <td>U32425</td>
                    <td>SBI</td>
                    <td>200000</td>
                    <td className='update-outer'><div className='update'>Update</div></td>
                    <td className='delete-outer'>hii<div className='delete'>Delete</div></td>
                  </tr>
                  <tr>
                    <td>123244115</td>
                    <td>U32425</td>
                    <td>SBI</td>
                    <td>200000</td>
                    <td className='update-outer'><div className='update'>Update</div></td>
                    <td className='delete-outer'>hii<div className='delete'>Delete</div></td>
                  </tr>
                  <tr>
                    <td>123244115</td>
                    <td>U32425</td>
                    <td>SBI</td>
                    <td>200000</td>
                    <td className='update-outer'><div className='update'>Update</div></td>
                    <td className='delete-outer'>hii<div className='delete'>Delete</div></td>
                  </tr>
                  <tr>
                    <td>123244115</td>
                    <td>U32425</td>
                    <td>SBI</td>
                    <td>200000</td>
                    <td className='update-outer'><div className='update'>Update</div></td>
                    <td className='delete-outer'>hii<div className='delete'>Delete</div></td>
                  </tr>
                  <tr>
                    <td>123244115</td>
                    <td>U32425</td>
                    <td>SBI</td>
                    <td>200000</td>
                    <td className='update-outer'><div className='update'>Update</div></td>
                    <td className='delete-outer'>hii<div className='delete'>Delete</div></td>
                  </tr>
                  <tr>
                    <td>123244115</td>
                    <td>U32425</td>
                    <td>SBI</td>
                    <td>200000</td>
                    <td className='update-outer'><div className='update'>Update</div></td>
                    <td className='delete-outer'>hii<div className='delete'>Delete</div></td>
                  </tr>
                  <tr>
                    <td>123244115</td>
                    <td>U32425</td>
                    <td>SBI</td>
                    <td>200000</td>
                    <td className='update-outer'><div className='update'>Update</div></td>
                    <td className='delete-outer'>hii<div className='delete'>Delete</div></td>
                  </tr> */}
                  
                  <tr id='add-entity' className="hide">
                    <td></td>
                    <td ><input type='text' value={customerId} onChange={(e)=>{setCustomerId(e.target.value)}} placeholder='customer ID'/></td>
                    <td><select className='al' value={bank} onChange={(e)=>{setBank(e.target.value)}} placeholder='bank id'>
                      {allBanks}
                    </select>
                    </td>
                    <td><input type='text' value={bal} onChange={(e)=>{setbal(e.target.value)}} placeholder='bal'/></td>
                    <td><div className='save'onClick={saveAddContainer}>Save</div></td>
                    <td><div className='cancel' onClick={cancelAddContainer}>Cancel</div></td>
                </tr>
                </table>
            </div>
        </div>
    </>
  )
}

export default Accounts

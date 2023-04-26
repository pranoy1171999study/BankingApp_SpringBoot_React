import {React,useState,useEffect} from 'react'
import axios from 'axios'
import Pagination from '../../../Layouts/Pagination/Pagination';
import PageSize from '../../../Layouts/PageSize/PageSize';
import Loader from '../../../Layouts/Loader/Loader';

const Customer = () => {
  const [loader,setLoader]=useState(false);
  let customerArr=[];
  let pageSize=5;
  const handlePageSize=(pagelimit)=>{
    pageSize=pagelimit;
    loadCustomers();
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
loadCustomers();
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
loadCustomers();
setPagination({page:{
current:currentPage,
total:maxPage,
fun:{
goLeft,
goRight
}}})
}
}
  const [customerdata,setCustomerData]=useState("");
  const loadCustomers=async()=>{
    setLoader(true);
      let url=`http://localhost:8080/customer/page?pageno=${currentPage}&size=${pageSize}`;
      let resp=await axios.get(url)
      .catch((err)=>{
            alert("Error");
            setLoader(false);
      })
      if(resp.status===200){
        maxPage=resp.data.totalPages;
        let customers=resp.data.content;
        customerArr=customers;
        setPagination({page:{
          current:currentPage,
          total:maxPage,
          fun:{
            goLeft,
            goRight
          }}});
        
        setCustomerData(customers.map((customer,index)=>{
          return(
            <tr>
            <td>{customer.customerId}</td>
            <td>{customer.fName + customer.lName}</td>
            <td>{customer.role}</td>
            <td>10</td>
            <td className='update-outer'><div className='update' onClick={()=>_update(customer.customerId)}>Update</div></td>
            <td className='delete-outer'><div className='delete' onClick={()=>_delete(customer.customerId)}>Delete</div></td>
          </tr>
        )}));
        setLoader(false);
        //console.log(resp);
        
      }
  }
  useEffect(()=>{
    //run when the page rendered
    loadCustomers();

  },[])
//start
  const [customerId,setCustomerId]=useState("");
  const [fName,setFname]=useState("");
  const [lName,setLname]=useState("");
  const [role,setRole]=useState("");

  const _update=async(id)=>{
    // alert("updated"+id);
    openAddContainerUpdate(id);
    
  }
  const _delete=async(id)=>{
    // alert("deleted"+id);
    setLoader(true);
    setCustomerId(id);
    var config = {
      method: 'delete',
      url: 'http://localhost:8080/customer/delete/'+id,
      headers: { }
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      alert("deleted");
      loadCustomers();
      setLoader(false);
    })
    .catch(function (error) {
      console.log(error);
      setLoader(false);
    });
  }
  
  const _add=async()=>{
    setLoader(true);
    if(customerId!=""){
      var data = JSON.stringify({
        "customerId": customerId,
        "fName": fName,
        "lName": lName,
        "role": role
      });
    }
    else{
      var data = JSON.stringify({
        "fName": fName,
        "lName": lName,
        "role": role
      });
    }
    
    
    var config = {
      method: 'post',
      url: 'http://localhost:8080/customer/save',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      alert("successful");
      loadCustomers();
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
    setFname("");
    setLname("");
    setRole("");
    setCustomerId("");
  }
  
  const openAddContainerUpdate=(id)=>{
    console.log(customerArr);
    let customero =null;
    customerArr.forEach((b)=>{
      if(b.customerId==id){
        customero=b;
      }
    })
    if(customero===null){
      alert("something went wrong");
      console.log(customero);
      console.log(id);
      return;
    }
    // set datas
    setFname(customero.fName);
    setLname(customero.lName);
    setRole(customero.role);
    setCustomerId(customero.customerId);
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
          <div className='info'>Customers</div>
          <button className='add' onClick={openAddContainer}>Add New Customer</button>
          <div className='pagination'>
          <Pagination data={pagination}/>
          <PageSize pageHandleFun={handlePageSize}/>
          <Loader active={loader}/>
          </div>
        </div>
        <div className="sub-container-inner">
            <table>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Role</th>
                <th>Count of Accounts</th>
                <th></th>
                <th></th>
              </tr>
              {customerdata}
              {/* <tr>
                <td>1</td>
                <td>Pranoy Patra</td>
                <td>User</td>
                <td>12</td>
                <td className='update-outer'><div className='update'>Update</div></td>
                <td className='delete-outer'>hii<div className='delete'>Delete</div></td>
              </tr>
              <tr>
                <td>1</td>
                <td>Pranoy Patra</td>
                <td>User</td>
                <td>12</td>
                <td className='update-outer'><div className='update'>Update</div></td>
                <td className='delete-outer'>hii<div className='delete'>Delete</div></td>
              </tr>
              <tr>
                <td>1</td>
                <td>Pranoy Patra</td>
                <td>User</td>
                <td>12</td>
                <td className='update-outer'><div className='update'>Update</div></td>
                <td className='delete-outer'>hii<div className='delete'>Delete</div></td>
              </tr>
              <tr>
                <td>1</td>
                <td>Pranoy Patra</td>
                <td>User</td>
                <td>12</td>
                <td className='update-outer'><div className='update'>Update</div></td>
                <td className='delete-outer'>hii<div className='delete'>Delete</div></td>
              </tr> */}
              <tr id='add-entity'  className="hide">
                <td></td>
                <td><input type='text' value={fName} onChange={(e)=>{setFname(e.target.value)}} placeholder='fname'/><input type='text' value={lName} onChange={(e)=>{setLname(e.target.value)}} placeholder='lname'/></td>
                <td><select value={role} onChange={(e)=>{setRole(e.target.value)}}>
                        <option value="ADMIN">Admin</option>
                        <option value="USER">User</option>
                    </select>
                </td>
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

export default Customer

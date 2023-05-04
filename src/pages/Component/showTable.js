import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../user/showTable.css";

import { Transaction } from "./transactiontable";

const months = [
  "January 2023",
  "February 2023",
  "March 2023",
  "April 2023",
  "May 2023",
  "June 2023",
  "July 2023",
  "August 2023",
  "September 2023",
  "October 2023",
  "November 2023",
  "December 2023",
];
const ShowTable = () => {
  const [data, setData] = useState([]);
  const [groupData, setGroupData] = useState([]);
  const [getData, setgetData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const login = JSON.parse(localStorage.getItem("login"));
    const items = login && login[0].email;
    let getData = JSON.parse(localStorage.getItem(items));
    setgetData(getData);
    setData(getData);
  }, []);


  function handleChange(e) {
    let storeResult = {};
    let array = [...getData];
    let value = e.target.value;
    array.forEach((item) => {
      let result = item[value];
   
      storeResult[result] = storeResult[result] ?? [];
      storeResult[result].push(item);
      
    });
    setGroupData(storeResult);
  }
  function handleLogout(){
    
    localStorage.removeItem("login");
    navigate('/login')
  }

  return (
    <>
    <div>
    
      <input type="button" onClick={handleLogout} value="Logout"/>
    </div>


    <>
    
    { getData ?
    <>
    <tr>
      <td>
        <label>Transaction Type</label>
      </td>
      <td>
        <select id="transactionType" name="transType" onChange={handleChange}>
          <option value="groupby">--Group By--</option>
          <option value="none">None</option>
          <option value="month">Month Year</option>
          <option value="transType">Transaction Type</option>
          <option value="frmAcc">From Account</option>
          <option value="toAcc">To Account</option>
        </select>
   
      </td>
      
      {/* eslint-disable-next-line */}
    </tr>         
        <Transaction  getData={getData} months = {months}></Transaction>

    {groupData.length !== 0 &&
      Object.keys(groupData).map(
        (data) =>
          data !== "undefined" && (
            <>
              <h2>{data}</h2>
           
              <>
              <Transaction getData={groupData[data]} months = {months}></Transaction>
              </>
           
            </>
          )
      )}  
    </>
           :<span>No data found</span>  } 
           
      </>

      <Link to={"create"} className="btn btn-secondary">
        Create Transaction
      </Link>
    </>
  );
};
export default ShowTable;

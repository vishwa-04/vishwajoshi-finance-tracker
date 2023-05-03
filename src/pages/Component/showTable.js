import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
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
  // const sortOrder = useRef("");
  // const [lastSortKey, setlastSortKey] = useState(null);
  const [data, setData] = useState([]);
  const [groupData, setGroupData] = useState([]);
  const [getData, setgetData] = useState([]);


  // const sorter = (a, b) => {
  //   return months.indexOf(a.month) - months.indexOf(b.month);
  // };
  // const sorterReverse = (a, b) => {
  //   return months.indexOf(b.month) - months.indexOf(a.month);
  // };
 

  useEffect(() => {
    let getData = JSON.parse(localStorage.getItem("items"));
    setgetData(getData);
    setData(getData);
  }, []);

  // function requestSort(currentKey, type) {
  //   if (sortOrder.current === "asc" && lastSortKey === currentKey) {
  //     sortOrder.current = "desc";
  //   } else if (sortOrder.current === "desc" && lastSortKey === currentKey) {
  //     sortOrder.current = "";
  //   } else {
  //     sortOrder.current = "asc";
  //     setlastSortKey(currentKey);
  //   }
  //   sortingCondition(currentKey, type);
  // }

  // function sortingCondition(currentKey, type) {
  //   if (sortOrder.current === "asc" && type === undefined) {
  //     let sort = [...getData].sort((a, b) =>
  //       a[currentKey].localeCompare(b[currentKey])
  //     );
  //     setgetData(sort);

  //     console.log(sort, sortOrder.current, "sort : sortOrder");
  //   } else if (sortOrder.current === "desc" && type === undefined) {
  //     let sort = [...getData].sort((a, b) =>
  //       b[currentKey].localeCompare(a[currentKey])
  //     );
  //     setgetData(sort);
  //   } else if (sortOrder.current === "" && type === undefined) {
  //     let sort = data;
  //     setgetData(sort);
  //   }

  //   if (sortOrder.current === "asc" && type === "number") {
  //     let sort = [...getData].sort(function (a, b) {
  //       return a[currentKey] - b[currentKey];
  //     });
  //     setgetData(sort);

  //     console.log("parseInt asc");
  //   } else if (sortOrder.current === "desc" && type === "number") {
  //     let sort = [...getData].sort(function (a, b) {
  //       return b[currentKey] - a[currentKey];
  //     });
  //     setgetData(sort);

  //     console.log("parseInt desc");
  //   }
  //   if (sortOrder.current === "" && type === "number") {
  //     let sort = data;
  //     setgetData(sort);

  //     console.log("parseInt normal");
  //   }
  //   if (sortOrder.current === "asc" && type === "month") {
  //     let sort = [...getData].sort(sorter);
  //     setgetData(sort);

  //     console.log(sort, "sort asc");
  //   } else if (sortOrder.current === "desc" && type === "month") {
  //     let sort = [...getData].sort(sorterReverse);
  //     setgetData(sort);

  //     console.log(sort, "sort desc");
  //   } else if (sortOrder.current === "" && type === "month") {
  //     let sort = data;
  //     setgetData(sort);

  //     console.log(sort, "sort normal");
  //   }
  // }
  // let finalArray = null
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

  return (
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
     
    
{/*      
             {filter.length !== 0 &&
                
                <Transaction requestSort={requestSort} getData={[filter]} months = {months}></Transaction>
             }
             {filter.length === 0 &&

                <Transaction requestSort={requestSort} getData={getData} months = {months}></Transaction>
             } */}
<>

          {/* {console.log(getData,"this is get data")} */}
          <Transaction  getData={getData} months = {months}></Transaction>

</>
                
         


    

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

      <Link to={"/"} className="btn btn-secondary">
        Create Transaction
      </Link>
    </>
  );
};
export default ShowTable;

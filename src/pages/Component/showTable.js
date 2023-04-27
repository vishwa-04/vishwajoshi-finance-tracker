import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../user/showTable.css";

const ShowTable = () => {
    const sortOrder = useRef('')
    const [lastSortKey,setlastSortKey] = useState(null);

  const [data, setData] = useState([]);
  const [getData, setgetData] = useState([]);

  const months = ["January 2023","February 2023","March 2023","April 2023","May 2023","June 2023","July 2023","August 2023","September 2023","October 2023","November 2023","December 2023"]
  const sorter = (a, b) => {
    return months.indexOf(a.month) - months.indexOf(b.month);
    };
  const sorterReverse = (a, b) => {
    return months.indexOf(b.month) - months.indexOf(a.month);
    };

  useEffect(() => {
    let getData = JSON.parse(localStorage.getItem("items"));
    setgetData(getData);
    setData(getData);
  }, []);




  function requestSort (currentKey,type){
    if(sortOrder.current === 'asc' && lastSortKey ===currentKey ){
        sortOrder.current = 'desc'
    }
    else if(sortOrder.current === 'desc' && lastSortKey ===currentKey ){
        sortOrder.current = ''
    }
    else{
         sortOrder.current = 'asc'
        setlastSortKey(currentKey)
    }
    sortingCondition(currentKey,type)
  }



  function sortingCondition(currentKey,type){
    if(sortOrder.current==='asc' && type === undefined){
        let sort = [...getData].sort((a, b) => a[currentKey].localeCompare(b[currentKey]));
        setgetData(sort);
        console.log(sort,sortOrder.current,"sort : sortOrder");
    }
    else if(sortOrder.current ==='desc' && type === undefined){
        let sort = [...getData].sort((a, b) => b[currentKey].localeCompare(a[currentKey]));
        setgetData(sort);
    }
    else if(sortOrder.current==='' && type === undefined){
        let sort = data;
        setgetData(sort);
    }


    if(sortOrder.current==='asc' && type === "number"){
        let sort = [...getData].sort(function (a, b) {return a[currentKey] - b[currentKey]; });
        setgetData(sort);
        console.log("parseInt asc");
    }
    else if(sortOrder.current==='desc' && type === "number"){
        let sort = [...getData].sort(function (a, b) {return b[currentKey] - a[currentKey]; });
        setgetData(sort);
        console.log("parseInt desc");

    }
    if(sortOrder.current==='' && type === "number"){
        let sort = data;
        setgetData(sort);
        console.log("parseInt normal");

    }
    if(sortOrder.current === "asc" && type==="month"){
        let sort =[...getData].sort(sorter)
        setgetData(sort);
        console.log(sort,"sort asc");
  
    }
    else if(sortOrder.current === "desc" && type==="month"){
        let sort =[...getData].sort(sorterReverse)
        setgetData(sort);
        console.log(sort,"sort desc");
        
    }
    else if(sortOrder.current === '' && type==="month"){
        let sort = data;
        setgetData(sort);
        console.log(sort,"sort normal");
        
    }

    


  }
//   const requestSort = (key, type) => {
  
   
//     if (sortOrder.current === "asc" && type === undefined ) {
//       let sort = [...getData].sort((a, b) => a[key].localeCompare(b[key]));
//       sortOrder.current = "desc";
//       setgetData(sort);
//       console.log(sort,sortOrder.current,"sorting for ascending");
      
//     } 

//     else if (sortOrder.current === "asc" && type === "number")
//      {
//       let sort = [...getData].sort(function (a, b) {return a[key] - b[key]; });
//       setgetData(sort);
//       sortOrder.current = "desc";
//     } 
    

//     else if (sortOrder.current === "desc" && type === "number") {
//       let sort = [...getData].sort(function (a, b) {return b[key] - a[key]; });
//       setgetData(sort);
//       sortOrder.current = "normal";
//     } 

//     else if (sortOrder.current === "normal" && type === "number") {
//       let sort = data;
//       setgetData(sort);
//       sortOrder.current = "asc";
//     }
    
    
//     else if (sortOrder.current === "desc" && type === undefined) {
//       let sort = [...getData].sort((a, b) => b[key].localeCompare(a[key]));
//       setgetData(sort);
//       sortOrder.current = "normal";
//       console.log(sort,sortOrder.current,"descinding");
//     }
    
//     else if (sortOrder.current === "normal" && type === undefined) {
//       let sort = data;
//       setgetData(sort);
//       sortOrder.current = "asc";

//       console.log(sort,sortOrder.current,"descinding");    }
//   };
  return (
    <>
      <table className="table table-secondary">
        <thead>
          <tr>
           
            <th onClick={() => requestSort("transDate")}style={{ cursor: "pointer" }}> Transaction Date</th>
            <th
              onClick={() => requestSort("month","month")}
              months={months}
              style={{ cursor: "pointer" }}
            >
              Month
            </th>
            <th
              onClick={() => requestSort("transType")}
              style={{ cursor: "pointer" }}
            >
              Transaction Type
            </th>
            <th
              onClick={() => requestSort("frmAcc")}
              style={{ cursor: "pointer" }}
            >
              From Account
            </th>
            <th
              onClick={() => requestSort("toAcc")}
              style={{ cursor: "pointer" }}
            >
              To Account
            </th>
            <th
              onClick={() => requestSort("amount", "number")}
              style={{ cursor: "pointer" }}
            >
              Amount
            </th>
            <th>Filename</th>
            <th
              onClick={() => requestSort("notes")}
              style={{ cursor: "pointer" }}
            >
              Notes
            </th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {getData.map((data, index) => {
            return (
              <tr key={index}>
                
                <td>{data.transDate}</td>
                <td>{data.month}</td>
                <td>{data.transType}</td>
                <td>{data.frmAcc}</td>
                <td>{data.toAcc}</td>
                <td>{Intl.NumberFormat("en-IN", {
        style: "currency",
currency: "INR",
minimumFractionDigits:0
}).format(data.amount)}</td>
                <td>
                  <img
                    src={data.filename}
                    alt="img"
                    height="50px"
                    width="50px"
                  ></img>
                </td>
                <td>{data.notes}</td>
                <td>
                  {" "}
                  <Link to={`/transaction/${index}`}>View</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Link to={"/"} className="btn btn-secondary">
        Create Transaction
      </Link>
    </>
  );
};
export default ShowTable;

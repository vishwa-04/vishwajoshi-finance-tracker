import { useState } from "react";
import { Link } from "react-router-dom";


export const Transaction  = (props) =>{
     

    const months = props.months;
    const getData = props.getData
    const [currentPage, setCurrentPage] = useState(1);
    let recordsPerPage = 3;
    let lastIndex = currentPage * recordsPerPage;
    let firstIndex = lastIndex - recordsPerPage;
    const records = getData.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(getData.length / recordsPerPage);
    const numbers = [...Array(totalPages + 1).keys()].slice(1);
  
    function prePage() {
      if (currentPage !== firstIndex) {
        setCurrentPage(currentPage - 1);
      }
    }
  
    function changeCurrentPage(id) {
      setCurrentPage(id);
    }
    function NextPage() {
      if (currentPage !== lastIndex) {
        setCurrentPage(currentPage + 1);
      }
    }
    const requestSort = props.requestSort
    // const records = props.records
    return(<>
      <table className="table table-secondary">
        <thead>
          <tr>
            <th
              onClick={() => requestSort("transDate")}
              style={{ cursor: "pointer" }}
            >
              {" "}
              Transaction Date
            </th>
            <th
              onClick={() => requestSort("month", "month")}
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
          {records.map((data, index) => {
            return (
              <tr key={index}>
                <td>{data.transDate}</td>
                <td>{data.month}</td>
                <td>{data.transType}</td>
                <td>{data.frmAcc}</td>
                <td>{data.toAcc}</td>
                <td>
                  {Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                    minimumFractionDigits: 0,
                  }).format(data.amount)}
                </td>
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
                  <Link  to={`/transaction/${index}`}>View</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <nav>
        <ul className="pagination">
          <li className="page-item">
            <span
              className="page-link"
              onClick={prePage}
              style={{ cursor: "pointer" }}
            >
              Prev
            </span>
          </li>
          {numbers.map((n, index) => (
            <li
              className={`page-item ${currentPage === n ? "active" : ""}`}
              key={index}
            >
              <span
                className="page-link"
                onClick={() => changeCurrentPage(n)}
                style={{ cursor: "pointer" }}
              >
                {n}
              </span>
            </li>
          ))}
          <li className="page-item">
            <span
              className="page-link"
              onClick={NextPage}
              style={{ cursor: "pointer" }}
            >
              Next
            </span>
          </li>
        </ul>
      </nav>
    </>)
}
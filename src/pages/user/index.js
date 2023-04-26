import {Link} from 'react-router-dom';
import React from "react";
import {useNavigate} from "react-router-dom"
import { useState } from "react";
import "./css/style.css";

function FinanceTracker() {
  const initialValues = {
    transDate: "",
    month: "",
    transType: "",
    frmAcc: "",
    toAcc: "",
    amount: "",
    filename: "",
    notes: "",
  };
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(initialValues);
  const [formError, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  // const fileExtension = [".jpg", ".png", ".jpeg"];

  function submitHandle(e) {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);

    if (Object.keys(formError).length === 0 && isSubmit === true) {
      if (localStorage.getItem("items") !== null) {
        let data = JSON.parse(localStorage.getItem("items"));
        console.log(data, "data");
        data.push(formValues);
        localStorage.setItem("items", JSON.stringify(data));
      } else {
        localStorage.setItem("items", JSON.stringify([formValues]));
      }
      navigate('/showTable')
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    if(e.target.type==="file"){
      if(e.target.files[0].size>"200000"){
        alert("too big")
      }else{
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        console.log(reader);
        reader.addEventListener('load',function(){
          let val = this.result
          console.log(val);
          setFormValues({ ...formValues, filename:val});
        })
      }
    }
    console.log(e.target.files,"file");
    setFormValues({ ...formValues, [name]: value });
  }

  function validate(values) {
    const errors = {};
    console.log(values);

    if (values.transDate === "") {
      errors.transDate = "Date is a required field !";
    }

    if (values.month === "" || values.month === "0") {
      errors.month = " Month is a required field !";
    }

    if (values.transType === "") {
      errors.transType = "Transaction Type is a required field !";
    }

    if (values.frmAcc === "") {
      errors.frmAcc = "From Account is a required field !";
    } else if (values.frmAcc === values.toAcc) {
      errors.frmAcc = "From Account and To Account cannot be same";
      errors.toAcc = "From Account and To Account cannot be same";
    }

    if (values.toAcc === "") {
      errors.toAcc = "To Account is a required field !";
    }

    if (values.amount === "") {
      errors.amount = "Please enter amount !";
    } else if (values.amount < 0) {
      errors.amount = "Amount cannot be less than 0 !";
    }


    // let newfileExtension = values.filename.slice(values.filename.length - 4);
    // if (!fileExtension.includes(newfileExtension)) {
    //   errors.filename = "only png,jpg,jpeg file supported !";
  
    // }
    if (values.filename === "") {
      errors.filename = "File is a required field !";
    }

    console.log(values.file);

    if (values.notes === "") {
      errors.notes = "Notes is a required field !";
    } else if (values.notes.length > 250) {
      errors.notes = "Notes too long !";
    }

    return errors;
  }

  // console.log(formError)

  const date = new Date();
  let year = date.getFullYear();

  return (
    <div className="App">
      <div className="container">
        <h1>Finance Tracker</h1>
        <form onSubmit={submitHandle}>
          <div className="container">
            <table>
              <tbody>
                <tr>
                  <td>
                    <label>Transaction Date :</label>
                  </td>
                  <td>
                    <input
                      type="date"
                      name="transDate"
                      // value={formValues.transDate}
                      onChange={handleChange}
                    ></input>
                    <tr>
                      <td>
                        <div className="errorStyle">{formError.transDate}</div>
                      </td>
                    </tr>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Month Year</label>
                  </td>
                  <td>
                    <select id="getmonth" name="month" onChange={handleChange}>
                      <option value="0">--Select Month--</option>
                      <option value={`Janaury ${year}`}>Janaury {year}</option>
                      <option value={`February ${year}`}>
                        February {year}
                      </option>
                      <option value={`March ${year}`}>March {year}</option>
                      <option value={`April ${year}`}>April {year}</option>
                      <option value={`May ${year}`}>May {year}</option>
                      <option value={`June ${year}`}>June {year}</option>
                      <option value={`July ${year}`}>July {year}</option>
                      <option value={`August ${year}`}>August {year}</option>
                      <option value={`September ${year}`}>
                        September {year}
                      </option>
                      <option value={`October ${year}`}>October {year}</option>
                      <option value={`November ${year}`}>
                        November {year}
                      </option>
                      <option value={`December ${year}`}>
                        December {year}
                      </option>
                    </select>
                    <div className="errorStyle">{formError.month}</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Transaction Type</label>
                  </td>
                  <td>
                    <select
                      id="transactionType"
                      name="transType"
                      onChange={handleChange}
                    >
                      <option value="">--Select Transaction-</option>
                      <option value="Home">Home</option>
                      <option value="Personal Expense">Personal Expense</option>
                      <option value="Income">Income</option>
                    </select>
                    <div className="errorStyle">{formError.transType}</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>From Account</label>
                  </td>
                  <td>
                    <select id="frmAcc" name="frmAcc" onChange={handleChange}>
                      <option value="">--Select From Account--</option>
                      <option value="Personal Account">Personal Account</option>
                      <option value="Real Living">Real Living</option>
                      <option value="My Dream House">My Dream House</option>
                      <option value="Full Circle">Full Circle</option>
                      <option value="Core Realtors">Core Realtors</option>
                      <option value="Big Block">Big Block</option>
                    </select>
                    <div className="errorStyle">{formError.frmAcc}</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>To Account</label>
                  </td>
                  <td>
                    <select id="toAcc" name="toAcc" onChange={handleChange}>
                      <option value="">--Select To Account--</option>
                      <option value="Personal Account">Personal Account</option>
                      <option value="Real Living">Real Living</option>
                      <option value="My Dream House">My Dream House</option>
                      <option value="Full Circle">Full Circle</option>
                      <option value="Core Realtors">Core Realtors</option>
                      <option value="Big Block">Big Block</option>
                    </select>
                    <div className="errorStyle">{formError.toAcc}</div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <label>Amount</label>
                  </td>
                  <td>
                    <input
                      type="number"
                      name="amount"
                      value={formValues.amount}
                      onChange={handleChange}
                    ></input>
                    <div className="errorStyle">{formError.amount}</div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <label>Receipt</label>
                  </td>
                  <td>
                    <input
                      type="file"
                      id="myFile"
                      name="filename"
                      onChange={handleChange}
                    ></input>
                    <div className="errorStyle">{formError.filename}</div>
                  </td>
                  <tr><td>
                    {/* <img src={formValues.filename} alt="alt"></img> */}
                    </td></tr>
                </tr>
                <tr>
                  <td>
                    <label>Notes</label>
                  </td>
                  <td>
                    <textarea
                      rows="5"
                      cols="20"
                      name="notes"
                      onChange={handleChange}
                    ></textarea>
                    <div className="errorStyle">{formError.notes}</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="submit" value="Submit" />
                  </td>
                </tr>
              </tbody>
            </table>
            <Link to={'/showTable'}>View Transaction</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FinanceTracker;

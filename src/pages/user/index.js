import { Link, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./css/style.css";

function FinanceTracker({ updateFormValue, isUpdate, index }) {
  // console.log(updateFormValue,"updateformValue");
  let initialValues;
  updateFormValue
    ? (initialValues = {
        transDate: updateFormValue.transDate,
        month: updateFormValue.month,
        transType: updateFormValue.transType,
        frmAcc: updateFormValue.frmAcc,
        toAcc: updateFormValue.toAcc,
        amount: updateFormValue.amount,
        filename: updateFormValue.filename,
        notes: updateFormValue.notes,
      })
    : (initialValues = {
        transDate: "",
        month: "",
        transType: "",
        frmAcc: "",
        toAcc: "",
        amount: "",
        filename: "",
        notes: "",
      });



      const navigate = useNavigate();
      const [formValues, setFormValues] = useState(initialValues);


      const [formError, setFormErrors] = useState({
    transDate: "",
    month: "",
    transType: "",
    frmAcc: "",
    toAcc: "",
    amount: "",
    filename: "",
    notes: "",
    checkaccounts: "",
  });

  const [isSubmit, setIsSubmit] = useState(false);


  function submitHandle(e) {
    e.preventDefault();
    //validation changes start
    const validateFormValues = { ...formValues };
    let sendError = { ...formError };

    Object.keys(validateFormValues).map((key, index) => {
      if (validateFormValues[key] === "") {
        sendError = { ...sendError, [key]: "required*" };
      } else if (validateFormValues["frmAcc"] === validateFormValues["toAcc"]) {
        sendError = {
          ...sendError,
          checkaccounts: "From account and to account can not be same",
        };

        sendError = {
          ...sendError,
          [key]: "",
        };
      } else {
        sendError = { ...sendError, [key]: "", checkaccounts: "" };
      }
      // e.preventDefault();
    });
    setFormErrors(sendError);
   
    setIsSubmit(true);
  }
  
  const { id } = useParams();
  useEffect(() => {
    console.log(isSubmit, "use-effect");
    console.log(Object.values(formError))
    const errorlength = Object.values(formError).filter(
      (items) => items !== ""
    );

    console.log("error length", errorlength.length);
    if(errorlength.length !==0)
    {
      setIsSubmit(false)
    }
    if (errorlength.length === 0 && isSubmit) {
      const login = JSON.parse(localStorage.getItem("login"));
      const items = login[0].email;
      if (localStorage.getItem(items) !== null) {
        const data = JSON.parse(localStorage.getItem(items));

        if (id) {
          for (const e in data) {
            if (parseInt(data[e].id) === parseInt(id)) {
              console.log(data[e].id, id, "e:id");
              formValues["id"] = parseInt(id);
              data[e] = formValues;
              // console.log(data[e],formValues,"data[e]   :::::::: formvalues");
            }
          }
        } else {
          let previousId = data[data.length - 1].id;
          formValues["id"] = previousId + 1;
          data.push(formValues);
        }

        localStorage.setItem(items, JSON.stringify(data));
      } else {
        formValues["id"] = 1;
        localStorage.setItem(items, JSON.stringify([formValues]));
      }
      navigate("/showTable");
    }
    //eslint-disable-next-line
  },[isSubmit]);

  const handelRemoveImage = () => {
    setFormValues({ ...formValues, filename: "" });
  };

  function handleChange(e) {
    //validation changes start here

    const storeFomValues = {
      ...formValues,
      [e.target.name]: e.target.value,
    };
    setFormValues(storeFomValues);
    switch (e.target.name) {
      case "transDate":
        //const trnsactionDate = e.target.value
        if (e.target.value) {
          setFormErrors({
            ...formError,
            transDate: "",
          });
        }
        setIsSubmit(false);

        break;
      case "month":
        //const monthYear = e.target.value

        if (e.target.value) {
          setFormErrors({
            ...formError,
            month: "",
          });
          setIsSubmit(false);
        }
        break;

      case "transType":
        if (e.target.value) {
          setFormErrors({
            ...formError,
            transType: "",
          });
          setIsSubmit(false);
        }
        break;

      case "frmAcc":
        if (e.target.value) {
          setFormErrors({
            ...formError,
            frmAcc: "",
          });
          setIsSubmit(false);
        }
        break;

      case "toAcc":
        if (e.target.value) {
          setFormErrors({
            ...formError,
            toAcc: "",
          });
          setIsSubmit(false);
        }

        break;

      case "amount":
        if (e.target.value < 0) {
          setFormErrors({
            ...formError,
            amount: "The Amount must be atleast greater then 0",
          });
        } else {
          setFormErrors({
            ...formError,
            amount: "",
          });
        }
        setIsSubmit(false);
        break;

      case "notes":
        if (e.target.value.length < 240) {
          setFormErrors({
            ...formError,
            notes: "",
          });
        } else {
          setFormErrors({
            ...formError,
            notes: "The length of your notes must be less then 240",
          });
        }
        setIsSubmit(false);

        break;
      case "filename":
        if (e.target.value) {
          setFormErrors({
            ...formError,
            filename: "",
          });
        }
        setIsSubmit(false);
        break;
      default:
        break;
    }

    // validation changes end here

    if (e.target.type === "file") {
      console.log("inside the file case");
      if (e.target.files[0]) {
        if (e.target.files[0].size > 200000) {
          alert("too big");
        } else {
          let reader = new FileReader();
          reader.readAsDataURL(e.target.files[0]);
          // console.log(reader);
          reader.addEventListener("load", function () {
            let val = this.result;
            // console.log(val);

            setFormValues({ ...formValues, filename: val });
            setFormErrors({ ...formError, filename: "" });
          });
        }
      }
    }
  }

  const date = new Date();
  let year = date.getFullYear();

  return (
    <div className="App">
      {/* {console.table(formValues)} */}
      <div className="container">
        <h1>Finance Tracker</h1>
        <form onSubmit={submitHandle} className="form-control">
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
                      value={formValues.transDate}
                      onChange={handleChange}
                 
                    ></input>
                    <tr>
                      <td>
                        <div>
                          {formError.transDate ? (
                            <label style={{ color: "red" }}>
                              Date is {formError.transDate}
                            </label>
                          ) : (
                            ""
                          )}
                        </div>
                      </td>
                    </tr>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Month Year</label>
                  </td>
                  <td>
                    <select
                      id="getmonth"
                      name="month"
                      onChange={handleChange}
                      value={formValues.month}
                    >
                      <option value="">--Select Month--</option>
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
                    <div>
                      {formError.month ? (
                        <label style={{ color: "red" }}>
                          Month is {formError.month}
                        </label>
                      ) : (
                        ""
                      )}
                    </div>
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
                      value={formValues.transType}
                    >
                     <option  hidden disabled  value="" selected >--Select Transaction Type--</option>
                      <option value="Home">Home</option>
                      <option value="Personal Expense">Personal Expense</option>
                      <option value="Income">Income</option>
                    </select>
                    <div>
                      {formError.transType ? (
                        <label style={{ color: "red" }}>
                          Transaction Type is {formError.transType}
                        </label>
                      ) : (
                        ""
                      )}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>From Account</label>
                  </td>
                  <td>
                    <select
                      id="frmAcc"
                      name="frmAcc"
                      onChange={handleChange}
                      value={formValues.frmAcc}
                    >
                      <option  hidden disabled  value="" selected >--Select From Account--</option>
                      <option value="Personal Account">Personal Account</option>
                      <option value="Real Living">Real Living</option>
                      <option value="My Dream House">My Dream House</option>
                      <option value="Full Circle">Full Circle</option>
                      <option value="Core Realtors">Core Realtors</option>
                      <option value="Big Block">Big Block</option>
                    </select>
                    <div>
                      {formError.frmAcc ? (
                        <label style={{ color: "red" }}>
                          From Account is {formError.frmAcc}
                        </label>
                      ) : (
                        ""
                      )}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>To Account</label>
                  </td>
                  <td>
                    <select
                      id="toAcc"
                      name="toAcc"
                      onChange={handleChange}
                      value={formValues.toAcc}
                    >
                        <option  hidden disabled  value="" selected >--Select To Account--</option>
                      <option value="Personal Account">Personal Account</option>
                      <option value="Real Living">Real Living</option>
                      <option value="My Dream House">My Dream House</option>
                      <option value="Full Circle">Full Circle</option>
                      <option value="Core Realtors">Core Realtors</option>
                      <option value="Big Block">Big Block</option>
                    </select>
                    <div>
                      {formError.toAcc ? (
                        <label style={{ color: "red" }}>
                          To Account is {formError.toAcc}
                        </label>
                      ) : (
                        ""
                      )}
                    </div>

                    {formError.checkaccounts ? (
                      <div className="sameAccountError">
                        <label style={{ color: "red" }}>
                          {formError.checkaccounts}
                        </label>
                      </div>
                    ) : (
                      ""
                    )}
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
                    <div>
                      {formError.amount ? (
                        <label style={{ color: "red" }}>
                         {formError.amount}
                        </label>
                      ) : (
                        ""
                      )}
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <label>Receipt</label>
                  </td>
                  <td>
                    {formValues.filename ? (
                      <>
                        <img
                          style={{ width: "200px" }}
                          alt="img"
                          src={formValues.filename}
                        />
                        <input
                          type="button"
                          value="remove"
                          onClick={() => handelRemoveImage()}
                        />
                      </>
                    ) : (
                      <input
                        type="file"
                        id="myFile"
                        onChange={handleChange}
                        value={formValues.filename}
                      />
                    )}
                  </td>
                  <div>
                    {formError.filename ? (
                      <label style={{ color: "red" }}>
                        Filename is {formError.filename}
                      </label>
                    ) : (
                      ""
                    )}
                  </div>
                  <td>
                    {/* {removeImage ? (
                  <>
                    <input
                      type="file"
                      name="Receipt"
                      value={formValues.filename}
                      onChange={(e) => {
                        handleChange(e.target.files);

                      }}
                    />
                    <span>{formError.filename}</span>
                  </>
                ) : (
                  <>
                    <img
                      style={{ width: "200px" }}
                      src={formValues.filename}
                      alt="..."
                    />

                    <input
                      type="button"
                      value="remove"
                      onClick={() => handelRemoveImage()}
                    />
                  </>
                )} */}
                  </td>
                  <tr>
                    <td>
                      {/* <img src={formValues.filename} alt="alt"></img> */}
                    </td>
                  </tr>
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
                      value={formValues.notes}
                      onChange={handleChange}
                    ></textarea>
                    <div>
                      {formError.notes ? (
                        <label style={{ color: "red" }}>
                           {formError.notes}
                        </label>
                      ) : (
                        ""
                      )}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      type="submit"
                      value="Submit"
                      className="btn btn-primary"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </form>
        <Link to={"/showTable"} className="btn btn-secondary">
          View Transaction
        </Link>
      </div>
    </div>
  );
}

export default FinanceTracker;

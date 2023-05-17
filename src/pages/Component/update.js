import React from 'react'
import { useParams } from 'react-router-dom';
import FinanceTracker from '../user';
import { useTransContext } from '../Contexts/formValuesContext';

export default function UpdateTransaction() {
  const {TransactionData}=useTransContext()
    const { id } = useParams();
    const login = JSON.parse(localStorage.getItem("login"));
    let data = TransactionData;
    const index = data.findIndex((ele) => ele.id == id);

  return (
    <div>
      {
        index<0 ?(<h1>no data found</h1>):(<FinanceTracker updateFormValue={data[index]} index={index} isUpdate={true}/>)
      }
      
    </div>
  );
}
import React from 'react'
import { useParams } from 'react-router-dom';
// import AddTransaction from '../AddTransaction/AddTransaction'
import FinanceTracker from '../user';

export default function UpdateTransaction() {
    const { id } = useParams();
    const data = JSON.parse(localStorage.getItem("items"));
    console.log(data);
    const index = data.findIndex((ele) => ele.id == id);
    console.log(index)
    console.table(data[index]);
  return (
    <div>
      {
        index<0 ?(<h1>no data found</h1>):(<FinanceTracker localFormValue={data[index]} index={index} isUpdate={true}/>)
      }
      
    </div>
  );
}
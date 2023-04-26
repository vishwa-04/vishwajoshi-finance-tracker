import {Link} from 'react-router-dom';
import '../user/showTable.css'
const ShowTable = () => {
    const getData = JSON.parse(localStorage.getItem("items"));
    return <>
        <table>
      <thead>
        <tr>
        <th>Transaction Date</th>
        <th>Month</th>
        <th>Transaction Type</th>
        <th>From Account</th>
        <th>To Account</th>
        <th>Amount</th>
        <th>Filename</th>
        <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        
         
            {getData.map((data,index) => {
                return (
                  
                    <tr key={index }>
                        <td>{data.transDate}</td>
                        <td>{data.month  }</td>
                        <td>{data.transType}</td>
                        <td>{data.frmAcc}</td>
                        <td>{data.toAcc}</td>
                        <td>{data.amount}</td>
                        <td><img src={data.filename} alt="img" height="50px" width="50px"></img></td>
                        <td>{data.notes}</td>
                        <td> <Link to={`/transaction/${index}`}>
                            View
                        </Link></td>
                    </tr>

                )
            })
        }
          </tbody>
    </table>
    <Link to={'/'}>Create Transaction</Link> 
    </>
}
export default ShowTable
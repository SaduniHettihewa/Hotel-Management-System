import React from 'react';
import Search from './Search/Search';
import ProgressBar from './progress/ProgressBar';
import Checkout from '../paymentGatway/Checkout';





function Bookings() {
 
 
  return (
    <div>
      <Search />
     <div style={{ marginTop: "150px" }}>
      <table>
        <tbody>
          <tr>
            <td  colSpan={2} style={{ width: "50%" , padding: "50px"}}>
              <ProgressBar />
            </td>
         
          </tr>
          
        </tbody>

      </table>
      </div>
    </div>

  )
}
export default Bookings;
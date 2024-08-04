import React from 'react'
import qr from "../images/qrCode.jpeg";
const Phone_num = () => {
  return (
    // <div className='pn'>
    //   <h3>Phone Number: </h3>
    //   <input type="number" />
    //   <button className="btn btn-primary mx-3">Get otp</button>
    // </div>
    <>
      <div className='qr'>
        <img src={qr} alt="#" />
      </div>
    </>
  )
}

export default Phone_num;

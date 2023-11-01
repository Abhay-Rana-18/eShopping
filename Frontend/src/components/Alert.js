import React from 'react';

const Alert = (props) => {
  const alertClassName = `alert text-${props.alert && (props.alert.type)}`;
  
  return (
    <>
    {(props.alert) && (<div >
      <p className={alertClassName}> <img src="https://imgs.search.brave.com/t_VU4Z0AXtagTHdNgmvAnNf7-T23R0xkRn9OFhST2ig/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1LzQ5LzM4Lzcz/LzM2MF9GXzU0OTM4/NzM4N19SQ2txVnRm/MnQ1UGJOWUdRZ1FF/SFpNcEZ1SGJwVHZK/ei5qcGc" alt="#" /> &nbsp;{props.alert.msg}</p>
    </div>)}
    </>
  );
}

export default Alert;

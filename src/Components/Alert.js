import React from 'react';

function Alert(props) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
      <div className="alert alert-light" role="alert" style={{alignText:"center",backgroundColor: '#7637A0', color: 'white', borderRadius: '100px', border: '1px solid black', width: '10%' }}>
        Status:
      </div>
      <div className="alert alert-light" role="alert" style={{ borderRadius: '20px', width: '50%', marginLeft: '20px' }}>
        {props.message}
      </div>
    </div>
  );
}

export default Alert;

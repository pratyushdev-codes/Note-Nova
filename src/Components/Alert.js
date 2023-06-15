import React from 'react';

function Alert(props) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
      <div className="alert alert-light" role="alert" style={{ borderRadius: '20px', width: '50%' }}>
        {props.message}
      </div>
    </div>
  );
}

export default Alert;

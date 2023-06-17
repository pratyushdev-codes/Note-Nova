import React from 'react';

function Alert(props) {
  const capitalize = (word) => {
    if (word === 'danger') {
      word = 'error';
    }
    let a = word.toLowerCase();
    return a.charAt(0).toUpperCase() + a.slice(1);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
        <div className="alert alert-light" role="alert" style={{ textAlign: "center", backgroundColor: '#7637A0', color: 'white', borderRadius: '100px', border: '1px solid black', width: '10%' }}>
          Status:
        </div>
        <div className="alert alert-light" role="alert" style={{ borderRadius: '20px', width: '60%', marginLeft: '20px' , height:"55px"}}>
          {props.alert && (
            <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
              <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg}
              {/* <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Alert;

import React from 'react';
import Notes from './Notes';
import AddNote from './AddNote';
import Banner from './Banner';


const Home = (props) => {
  const {showAlert}= props;
  return (
    <div>
    
      
     <AddNote/>
    </div>
  );
};

export default Home;

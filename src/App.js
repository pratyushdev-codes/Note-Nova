import './App.css';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import Home from './Components/Home';
import About from './Components/About';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NoteState from './context/notes/NoteState';
import Alert from './Components/Alert';

function App() {
  return (
    <>
    
   
      <NoteState>
      <Router>
        <Navbar />
        
        <Banner />
        <Alert message="Note Updated"/>
         <div className='container'>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
        </Routes>
        </div>
      </Router>
      
      </NoteState>
      
    
    </>
  );
}

export default App;

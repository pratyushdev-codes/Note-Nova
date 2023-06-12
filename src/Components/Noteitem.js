import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
const NoteItem = (props) => {
  const context=useContext(noteContext);

  const {deleteNote} = context;
  const { note , updateNote} = props;
  

  return (
    <div className="col-md-3">
      <div className="card-body my-3" style={{ border: '1px solid grey', borderRadius: '10px' }}>
        <h5 className="card-title"><i class="fa-regular fa-note-sticky mx-2"></i>{note.title}</h5>
        <p className="card-text">-  {note.description}</p>
        <i class="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id)}}></i>
        <i class="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
       
      </div>
    </div>
  );
};

export default NoteItem;

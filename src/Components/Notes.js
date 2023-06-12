import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes , editNote} = context;

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line 
  }, []);

  const [note, setNote] = useState({ id: "", edescription: '', etag: 'default' });
  const ref = useRef(null);
  const refClose = useRef(null);
  

  const handleSubmit = (e) => {
    console.log("Updating the Note", note)
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    // Add code to handle form submission here
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
 
  const updateNote = (currentNote) => {
    ref.current.click();
    // Add code to update the note here
    setNote({id: currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etage:currentNote.tag});
  };

  return (
    <div>
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form style={{ borderRadius: '20px', height: '380px', border: '1px solid grey', alignItems: 'left' }} onSubmit={handleSubmit}>
                <br />
                <div className="mb-3 my-3 mx-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    aria-describedby="emailHelp"
                    style={{ backgroundColor: 'lightblue', borderRadius: '20px', border: '1px solid grey' }}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3 mx-3">
                  <label htmlFor="desc" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                    style={{ backgroundColor: 'lightblue', borderRadius: '20px', border: '1px solid grey' }}
                  />
                </div>
                <div className="mb-3 mx-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                    style={{ backgroundColor: 'lightblue', borderRadius: '20px', border: '1px solid grey' }}
                  />
                </div>
                <button onClick={handleSubmit} type="submit" className="btn btn-primary">Update Note</button>
              </form>  
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <i className="fa-regular fa-file" style={{ marginRight: '10px' }}></i>
        <h2>Your Notes</h2>
      </div>
      <div className="row my-3">
      {notes.lenth===0 && 'No notes to Display'}
        {notes.map((note) => {
          return <Noteitem key={note._id} updateNote={updateNote} note={note} />;
        })}
      </div>
    </div>
  );
};

export default Notes;

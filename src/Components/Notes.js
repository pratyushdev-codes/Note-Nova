import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line 
  }, []);

  const [note, setNote] = useState({ id: "", etitle: '', edescription: '', etag: 'default' });
  const ref = useRef(null);
  const refClose = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag
    });
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
                  <label htmlFor="etitle" className="form-label">
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
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3 mx-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                    minLength={5}
                    required
                    style={{ backgroundColor: 'lightblue', borderRadius: '20px', border: '1px solid grey' }}
                  />
                </div>
                <div className="mb-3 mx-3">
                  <label htmlFor="etag" className="form-label">
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
                <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="submit" className="btn btn-primary">
                  Update Note
                </button>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <br />
        <br />
        <h2>Your Notes</h2>
      </div>
      <div className="row my-3" style={{ display: 'flex', flexWrap: 'wrap' }}>
        {notes.length === 0 && 'No notes to Display'}
        {notes.map((note) => (
          <Noteitem key={note._id} updateNote={updateNote} note={note} style={{flex: '0 0 auto', marginRight: '10px' }} />
        ))}
      </div>
    </div>
  );
};

export default Notes;

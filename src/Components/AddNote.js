import React, { useContext, useState } from 'react';
import Notes from './Notes';
import noteContext from '../context/notes/noteContext';

const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: '', description: '', tag: 'default' });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <br />
      <br />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <i className="fa-solid fa-plus" style={{ marginRight: '10px' }}></i>
        <h2>Add a Note</h2>
      </div>
      <form style={{ borderRadius: '20px', height: '320px', border: '1px solid grey', alignItems: 'left' }}>
        <br />
        <div className="mb-3 my-3 mx-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
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
            id="description"
            name="description"
            onChange={onChange}
            style={{ backgroundColor: 'lightblue', borderRadius: '20px', border: '1px solid grey' }}
          />
        </div>
        <button type="submit" className="btn btn-dark my-3 mx-3" onClick={handleClick}>
          Submit
        </button>
      </form>
      <br />
      <Notes />
    </div>
  );
};

export default AddNote;

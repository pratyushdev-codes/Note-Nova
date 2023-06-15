import React, { useContext, useState } from 'react';
import Notes from './Notes';
import noteContext from '../context/notes/noteContext';

const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: '', description: '', tag: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: '', description: '', tag: '' });
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <br />
      <br />
      <div style={{ display: 'flex', alignItems: 'left' }}>
        <i className="fa-solid fa-plus" style={{ marginRight: '10px' }}></i>
        <h2>Add a Note</h2>
      </div>
      <div className="row">
        <div className="col-md-6">
          <form
            style={{ borderRadius: '20px', height: '380px', width: '150%', border: '1px solid grey', alignItems: 'left', marginLeft: '0' }}
            onSubmit={handleSubmit}
          >
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
                style={{ backgroundColor: '#7637A0', borderRadius: '20px', border: '1px solid' }}
                onChange={onChange}
                value={note.title}
                minLength={5}
                required
              />
            </div>
            <div className="mb-3 mx-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={note.description}
                onChange={onChange}
                minLength={5}
                required
                style={{ backgroundColor: 'white', borderRadius: '20px', border: '1px solid grey' }}
              />
            </div>
            <div className="mb-3 mx-3">
              <label htmlFor="tag" className="form-label">
                Tag
              </label>
              <input
                type="text"
                className="form-control"
                id="tag"
                name="tag"
                onChange={onChange}
                value={note.tag}
                minLength={5}
                required
                style={{ backgroundColor: 'white', borderRadius: '20px', border: '1px solid grey' }}
              />
            </div>
            <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-dark my-3 mx-3">
              Add Note
            </button>
          </form>
        </div>
        <div className="col-md-6">
          <div
            style={{
              border: '1px solid black',
              borderRadius: '20px',
              height: '370px',
              width: '50%',
              marginRight: '0',
              marginTop: '5px',
              position: 'absolute',
              top: 0,
              right: 0,
            }}
          >
            <img src="./images/notes2.jpg" style={{
              border: '1px ',
              borderRadius: '20px',
              height: '370px',
              width: '100%',
            }} />
          </div>
        </div>
      </div>

      <div className="row my-3">
        <div className="container" style={{ height: '400px', overflowY: 'auto' }}>
          <Notes />
        </div>
      </div>
    </div>
  );
};

export default AddNote;

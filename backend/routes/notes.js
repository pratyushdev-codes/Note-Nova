const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

// Route1: Fetching all the notes, use API= GET:'/api/auth/fetchallnotes'. Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server error occurred!!');
    }
});

// Route2: Adding new notes using POST: '/api/auth/addnote'. Login required
router.post(
    '/addnote',
    fetchuser,
    [
        body('title', 'Enter a valid title.').isLength({ min: 3 }),
        body('description', 'Description must be at least five characters.').isLength({ min: 5 })
    ],
    async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Note({
                title,
                description,
                tag,
                user: req.user.id
            });

            const savedNote = await note.save();
            res.json(savedNote);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Internal Server error occurred!!');
        }
    }
);

// Route3: Update an existing note using PUT: '/api/auth/updatenote/:id'. Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    const newNote = {};
    if (title) {
        newNote.title = title;
    }
    if (description) {
        newNote.description = description;
    }
    if (tag) {
        newNote.tag = tag;
    }

    try {
        // Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send('Note not found');
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Not allowed');
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server error occurred!!');
    }
});

// Route3: Update an existing note using DELETE: '/api/auth/deletenote/:id'. Login required

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    
    try {
        // Find the note to be deleted and delete it
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send('Note not found');
        }
        //Allow deletion only if user owns this note

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Not allowed');
        }

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Your note has been successfully deleted", note: note });

    }


    catch (error) {


        console.error(error.message);
        res.status(500).send('Internal Server error occurred!!');
    }

});

module.exports = router;

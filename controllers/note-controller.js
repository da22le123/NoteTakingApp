const dbNotes = require("../db/notes.js");

async function getNoteById(req, res) {
    try {
        const note = await dbNotes.getNoteById(req.params.id);
        if (note) {
            res.status(200).json(note);
        } else {
            res.status(404).json({ error: 'Note not found' });
        }
    } catch (error) {
        console.error('Error fetching note:', error);
        res.status(500).json({ error: 'Failed to fetch note'});
    }
}

async function getNotesByUserId (req, res) {
    try {
        const notes = await dbNotes.getNotesByUserId(req.params.created_by_user_id, req.query.in_trash);
        if (notes) {
            res.status(200).json(notes);
        } else {
            res.status(404).json({ error: 'Notes not found' });
        }
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).json({ error: 'Failed to fetch notes' });
    }
}

async function createNote (req, res) {
    console.log("accessed endpoint post notes " + req.body)
    const results = await dbNotes.createNote(req.body);
    res.status(200).json({id: results[0]});
}

async function deleteNote (req, res) {
    await dbNotes.deleteNote(req.params.id);
    res.status(200).json({success: true});
}

async function updateNote(req, res) {
    try {
        const id = await dbNotes.updateNote(req.params.id, req.body);
        res.status(200).json({ id });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update note' });
    }
}

module.exports = {
    getNoteById,
    getNotesByUserId, 
    createNote,
    deleteNote,
    updateNote
}
const knex = require("./knex.js");

function createNote(note) {
    return knex("notes").insert(note);
}

function getAllNotes(note) {
    return knex("notes").select("*");
}

function getNoteById(id) {
    return knex("notes").where("id", id).select("*");
}

function getNoteByUserId(userId) {
    return knex("notes").where("created_by_user_id", userId).select("*");
}

function deleteNote(id) {
    return knex("notes").where("id", id).del();
}

function updateNote(id, note) {
    return knex("notes").where("id", id).update(note);
}

module.exports = {
    createNote,
    getAllNotes,
    deleteNote,
    updateNote,
    getNoteById,
    getNoteByUserId
};
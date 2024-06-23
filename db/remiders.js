const knex = require("./knex.js");

function createReminder(reminder) {
    return knex("reminders").insert(reminder).returning('id');
}

function getAllReminders() {
    return knex("reminders").select("*");
}

function getReminderById(id) {
    return knex("reminders").where("id", id).select("*");
}

function getRemindersByUserId(userId) {
    return knex("reminders")
    .where("created_by_user_id", userId)
    .select("*");
}

function deleteReminder(id) {
    return knex("reminders").where("id", id).del();
}

function updateReminder(id, reminder) {
    return knex("reminders").where("id", id).update(reminder);
}


module.exports = {
    createReminder,
    getAllReminders,
    deleteReminder,
    updateReminder,
    getReminderById,
    getRemindersByUserId
};
const knex = require("./knex.js");

function createUser(user) {
    return knex("users").insert(user);
}

function getAllUsers() {
    return knex("users").select("*");
}

function getUserById(id) {
    return knex("users").where("id", id).select("*");
}

function deleteUser(id) {
    return knex("users").where("id", id).del();
}

function updateUser(id, user) {
    return knex("users").where("id", id).update(user);
}

module.exports = {
    createUser,
    getAllUsers,
    deleteUser,
    updateUser,
    getUserById
};
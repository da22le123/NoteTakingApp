const dbUsers = require("../db/users.js");
const { get } = require("../routers/notes-router.js");

async function createUser(req, res) {
    const results = await dbUsers.createUser(req.body);
    res.status(201).json({id: results[0]});
}

async function getAllUsers(req, res) {
    const users = await dbUsers.getAllUsers();
    res.status(200).json({users});
}

async function getUserById(req, res) {
    try {
        const user = await dbUsers.getUserById(req.params.id);
        if (user) {
            res.status(200).json(user); // Return the user object directly
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
}

async function updateUser(req, res) {
    const id = await dbUsers.updateUser(req.params.id, req.body);
    res.status(200).json({id});
}

async function deleteUser(req, res) {
    await dbUsers.deleteUser(req.params.id);
    res.status(200).json({success: true});
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}
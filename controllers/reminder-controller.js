const dbReminders = require("../db/reminders.js");

async function createReminder(req, res) {
    console.log("accessed endpoint post reminders " + req.body)
    const results = await dbReminders.createReminder(req.body);
    res.status(200).json({id: results[0]});
}

async function getAllReminders(req, res) {
    try {
        const reminders = await dbReminders.getAllReminders();
        if (reminders) {
            res.status(200).json(reminders);
        } else {
            res.status(404).json({ error: 'Reminders not found' });
        }
    } catch (error) {
        console.error('Error fetching reminders:', error);
        res.status(500).json({ error: 'Failed to fetch reminders'});
    }
}

async function getReminderById(req, res) {
    try {
        const reminder = await dbReminders.getReminderById(req.params.id);
        if (reminder) {
            res.status(200).json(reminder);
        } else {
            res.status(404).json({ error: 'Reminder not found' });
        }
    } catch (error) {
        console.error('Error fetching reminder:', error);
        res.status(500).json({ error: 'Failed to fetch reminder'});
    }
}

async function getRemindersByUserId(req, res) {
    try {
        const reminders = await dbReminders.getRemindersByUserId(req.params.created_by_user_id);
        if (reminders) {
            res.status(200).json(reminders);
        } else {
            res.status(404).json({ error: 'Reminders not found' });
        }
    } catch (error) {
        console.error('Error fetching reminders:', error);
        res.status(500).json({ error: 'Failed to fetch reminders' });
    }
}

async function deleteReminder(req, res) {
    await dbReminders.deleteReminder(req.params.id);
    res.status(200).json({success: true});
}

async function updateReminder (req, res) {
    const id = req.params.id;

    if (!isValidId(id)) {
        res.status(422).json({error : 'Invalid id'});
    }

    try {
        const id = await dbReminders.updateReminder(req.params.id, req.body);
        res.status(200).json({ id });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update reminder' });
    }
}

function isValidId(id){
    return id != null && Number.isInteger(id) && id > 0;
}

module.exports = {
    createReminder,
    getAllReminders,
    getReminderById,
    getRemindersByUserId,
    deleteReminder,
    updateReminder
}
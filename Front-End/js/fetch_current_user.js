//This is used to display the name of the current user on the top bar whenever the page is reloaded
// Fetch the user's name from the backend
const serverUrl2 = 'http://localhost:3000';

async function fetchUserName() {
    const currentUserLabel = document.getElementById('current-user-label');
    const user = await getCurrentUser();
    currentUserLabel.textContent = user.name;
}

async function loadNotesUponUpdate(in_trash) {
    clearAllNotes();

    const user = await getCurrentUser();

    const notes = await getNotesByUserId(user.id, in_trash);

    notes.forEach(note => {
        addNote(note.id, note.header, note.content, in_trash);
    });
}

function clearAllNotes() {
    const notesContainer = document.getElementById('notes');
    notesContainer.innerHTML = ''; // Clear all child elements
}

async function loadRemindersUponUpdate() {
    clearAllReminders();

    const user = await getCurrentUser();

    const reminders = await getRemindersByUserId(user.id);

    reminders.forEach(reminder => {
        addReminder(reminder.id, reminder.header, reminder.content, reminder.remind_at);
    });
}


function clearAllReminders() {
    const remindersContainer = document.getElementById('reminders');
    remindersContainer.innerHTML = ''; // Clear all child elements
}


async function getRemindersByUserId(created_by_user_id) {
    console.log("getRemindersByUserId called");
    try {
        const response = await fetch(`${serverUrl3}/reminders/${created_by_user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Reminders not found');
            } else {
                throw new Error('Failed to fetch reminders');
            }
        }

        const reminders = await response.json();
        console.log('Fetched reminders:', reminders);
        return reminders;
    } catch (error) {
        console.error('Error fetching reminders:', error);
        throw error;
    }
}









async function getNotesByUserId(created_by_user_id, in_trash) {
    console.log("getNotesByUserId called");
    try {
        const response = await fetch(`${serverUrl2}/notes/${created_by_user_id}?in_trash=${in_trash}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Notes not found');
            } else {
                throw new Error('Failed to fetch notes');
            }
        }

        const notes = await response.json();
        console.log('Fetched notes:', notes);
        return notes;
    } catch (error) {
        console.error('Error fetching notes:', error);
        throw error;
    }
}


document.addEventListener("DOMContentLoaded", fetchUserName);
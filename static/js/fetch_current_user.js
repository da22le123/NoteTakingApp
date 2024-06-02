//This is used to display the name of the current user on the top bar whenever the page is reloaded
// Fetch the user's name from the backend
async function fetchUserName() {
    const currentUserLabel = document.getElementById('current-user-label');
    const user = await getCurrentUser()
    currentUserLabel.textContent = user.name;
}

async function loadNotesUponUpdate() {
    console.log("loadNotesUponUpdate called");

    clearAllNotes();

    const user = await getCurrentUser();

    const notes = await getNotesByUserId(user.id);

    notes.forEach(note => {
        addNote(note.id, note.header, note.content);
    });
}

function clearAllNotes() {
    const notesContainer = document.getElementById('notes');
    notesContainer.innerHTML = ''; // Clear all child elements
}

async function getNotesByUserId(created_by_user_id) {
    console.log("getNotesByUserId called");
    try {
        const response = await fetch(`/notes/${created_by_user_id}`, {
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
document.addEventListener("DOMContentLoaded", loadNotesUponUpdate);
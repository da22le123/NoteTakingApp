document.addEventListener('DOMContentLoaded', function() {
    const noteContent = document.getElementById('note-content');
    const noteHeader = document.querySelector('.note-header');
    const createButton = document.querySelector('.save-note-btn');

    let isCreatingNote = false;

    const createNote = async () => {
        if (isCreatingNote) return;  // Prevent multiple submissions
        isCreatingNote = true;

        if (noteContent.value.trim() !== '' && noteHeader.value.trim() !== '') {
            const header = noteHeader.value.trim();
            const content = noteContent.value.trim();
            const res = await postNewNote(content, header);
            const data = await res.json();
            const noteId = data.id;  // Assuming the response contains the note ID
            console.log("note posted with id: " + noteId);
            addNote(noteId, header, content);
        }
        noteHeader.classList.add('hidden');
        noteContent.style.width="200px";
        noteContent.style.height="auto";
        createButton.classList.remove("show-btn");
        
        isCreatingNote = false;
    };









    createButton.addEventListener('click', function(){
        setTimeout(createNote, 0);
    });


    noteContent.addEventListener('focus', function() {
        noteHeader.classList.remove('hidden');
        noteContent.style.width="300px";
        noteContent.style.height="90px";
        noteContent.style.textAlign="top-left";
        createButton.classList.add("show-btn");
    });

    noteContent.addEventListener('blur', function() {
        setTimeout(async function() {
            if (!noteHeader.contains(document.activeElement)) {
                await createNote();
            }
        }, 0);
    });

    noteHeader.addEventListener('blur', function() {
        // Use a short timeout to allow any click on noteContent to be registered
        setTimeout(async function() {
            if (!noteContent.contains(document.activeElement)) {
                await createNote();
            }
        }, 0);
    });
});


function addNote(noteId, header, content) {
    var noteClass = document.getElementById('notes');
    var noteContent = document.getElementById('note-content');
    var noteHeader = document.querySelector('.note-header');


    var noteContainer = document.createElement('div');
    noteContainer.className = 'note-container';
    noteContainer.dataset.noteId = noteId; // Store the note ID
    

    // Create note header
    var newNoteHeader = document.createElement('div');
    newNoteHeader.className = 'note-header1';
    var headerText = document.createElement('div');
    headerText.textContent = header;
    var pinIcon = document.createElement('span');
    pinIcon.className = 'pin';
    pinIcon.textContent = '📌';
    newNoteHeader.appendChild(headerText);
    newNoteHeader.appendChild(pinIcon);

    // Create note content
    var newNoteContent = document.createElement('div');
    newNoteContent.className = 'note-content1';
    newNoteContent.textContent =  truncateText(content, 30);

    // Create note footer
    var noteFooter = document.createElement('div');
    noteFooter.className = 'note-footer1';

    // Add buttons to note footer
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function () {
        // Functionality to delete the note
        var noteId = noteContainer.dataset.noteId;
        noteContainer.remove(); // Remove the entire note container
        deleteNote(noteId);
    };
    noteFooter.appendChild(deleteButton);

    // Append note header, content, and footer to note container
    noteContainer.appendChild(newNoteHeader);
    noteContainer.appendChild(newNoteContent);
    noteContainer.appendChild(noteFooter);

    

    // Append note container to "notes" class
    noteClass.appendChild(noteContainer);

    // Clear input fields
    noteHeader.value = '';
    noteContent.value = '';

}

function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
}

async function postNewNote(content, header) {
    const user  = await getCurrentUser();
    const created_by_user_id = user.id;
    const note = {
        "content": content,
        "created_by_user_id": created_by_user_id,
        "header": header
    }

    const res = await fetch('/notes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
    });


    if (!res.ok) {
        console.log("response was not ok")
    }

    return res;
}

async function deleteNote(id) {
    const response = await fetch(`/notes/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const result = await response.json();

    return result;
}
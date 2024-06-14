
let noteConteinerHidden = false;
let hiddenNote = null;

function addNote(noteId, header, content, in_trash) {
    var noteClass = document.getElementById('notes');


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
    newNoteContent.textContent = truncateText(content, 30);

    // Create note footer
    var noteFooter = document.createElement('div');
    noteFooter.className = 'note-footer1';

    // Add buttons to note footer
    var deleteButton = document.createElement('button');
    deleteButton.className = 'delete-btn';
    var img = document.createElement('img');
    img.className = 'img';

    // Step 3: Set the source of the image
    img.src = './resources/icons8-delete-192.png'; // Replace with the actual path to your image
    img.alt = 'Delete'; // Alt text for the image

    // Step 4: Create the text node

    // deleteButton.textContent = 'Delete';

    deleteButton.appendChild(img);



    deleteButton.onclick = function () {

        // Functionality to delete the note
        var noteId = noteContainer.dataset.noteId;
        noteContainer.remove(); // Remove the entire note container
        if (in_trash === 0) {
            moveNoteToTrash(noteId);
        } else if (in_trash === 1) {
            deleteNote(noteId);
        }
    };

    //when clicked on the header of the note
    newNoteHeader.addEventListener('click', () => {
        if (!noteConteinerHidden) {
            noteContainer.classList.add('hidden');
            hiddenNote = noteContainer;
            //fetching the note by id stored in the note container dataset
            //and then desplaying its contents with editing ability
            displayEditingWindow(getNoteById(noteContainer.dataset.noteId));
            noteConteinerHidden = true;
        }
    })

    //when clicked on the content of the note
    newNoteContent.addEventListener('click', () => {
        if (!noteConteinerHidden) {
            noteContainer.classList.add('hidden');
            hiddenNote = noteContainer;
            //fetching the note by id stored in the note container dataset
            //and then desplaying its contents with editing ability
            displayEditingWindow(getNoteById(noteContainer.dataset.noteId));
            noteConteinerHidden = true;
        }
    })

    document.addEventListener('click', (e) => {
        //hideEditingWindow(e);
        if (noteConteinerHidden) {
            const noteEditingWindow = document.querySelector('.note-editing-window');
            if (e.target === noteEditingWindow || e.target === noteEditingWindow.noteEditingWindowShow) {
                noteEditingWindow.classList.remove('show');
                hiddenNote.classList.remove('hidden');
                noteConteinerHidden = false;
            }
        }
    })

    noteFooter.appendChild(deleteButton);

    // Append note header, content, and footer to note container
    noteContainer.appendChild(newNoteHeader);
    noteContainer.appendChild(newNoteContent);
    noteContainer.appendChild(noteFooter);



    // Append note container to "notes" class
    noteClass.appendChild(noteContainer);

    // Clear input fields

}

function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
}

async function getNoteById(id) {
    const res = await fetch(`${serverUrl}/notes/id/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const note = await res.json();
    return note;
}


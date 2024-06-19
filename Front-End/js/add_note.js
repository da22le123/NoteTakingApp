
let noteContainerHidden = false;
let hiddenNote = null;
let hiddenNoteId = null;
const serverUrl3 = 'http://localhost:3000';

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
    newNoteHeader.appendChild(headerText);
    



    // Create note content
    var newNoteContent = document.createElement('div');
    newNoteContent.className = 'note-content1';
    newNoteContent.textContent = truncateText(content, 30);

    // Create note footer
    var noteFooter = document.createElement('div');
    noteFooter.className = 'note-footer1';

    var getBackFromTrashButton = document.createElement('span');
    getBackFromTrashButton.className = 'get-back-from-trash-button';
    getBackFromTrashButton.textContent = '🔙';

    //show the button if the note is in trash
    if (in_trash == 1) {
        getBackFromTrashButton.classList.add('show');
    }


    //getting the note back to the main list, when clicking on the button
    getBackFromTrashButton.addEventListener('click', () => {
        const changedField = {
            "id": noteId,
            "in_trash": 0
        }
        updateNote(changedField)
        .then(() => {console.log("changed the in_trash to 0")});
        location.reload();
    });

    noteFooter.appendChild(getBackFromTrashButton);

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
    newNoteHeader.addEventListener('click', async () => {
        if (!noteContainerHidden) {
            noteContainer.classList.add('hidden');
            hiddenNote = noteContainer;
            hiddenNoteId = noteContainer.dataset.noteId;
            //fetching the note by id stored in the note container dataset
            //and then desplaying its contents with editing ability
            const note = await getNoteById(noteContainer.dataset.noteId);
            displayEditingWindow(note[0]);
            noteContainerHidden = true;
        }
    })

    //when clicked on the content of the note
    newNoteContent.addEventListener('click', async () =>{
        if (!noteContainerHidden) {
            noteContainer.classList.add('hidden');
            hiddenNote = noteContainer;
            hiddenNoteId = noteContainer.dataset.noteId;
            //fetching the note by id stored in the note container dataset
            //and then desplaying its contents with editing ability
            const note = await getNoteById(noteContainer.dataset.noteId);
            displayEditingWindow(note[0]);
            noteContainerHidden = true;
        }
    })


    


    //when clicked outside of the popup, closes it
    document.addEventListener('click', (e) => {
        const noteEditingWindow = document.getElementById('note-editing-window');
        if (noteContainerHidden && e.target === noteEditingWindow ) {
            noteEditingWindow.classList.remove('show');
            hiddenNote.classList.remove('hidden');
            //fetch the note then update it
            getNoteById(hiddenNoteId)
                .then(note => {
                    updateNotesContent(note[0]);
                });
            noteContainerHidden = false;
            //refresh page
            loadNotesUponUpdate(0)
        }
    });
    

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
    const res = await fetch(`${serverUrl3}/notes/id/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const note = await res.json();
    return note;
}


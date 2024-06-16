const container = document.querySelector('.container');
const mainContentElement = document.getElementById('main-content')

//adding the noteEditingWindow to the html with all its inner elements
document.addEventListener('DOMContentLoaded', () => {
    var noteEditingWindow = document.createElement('div');
    noteEditingWindow.className = 'note-editing-window';
    noteEditingWindow.id = 'note-editing-window';

    var contentContainer = document.createElement('div');
    contentContainer.className = 'content-container';
    contentContainer.id = 'content-container';

    var headerDiv = document.createElement('div');
    headerDiv.className = 'note-editing-window-header';
    headerDiv.id = 'note-editing-window-header';

    var editableHeader = document.createElement('input');
    editableHeader.type = 'text';
    editableHeader.className = 'editable-header';
    editableHeader.id = 'editable-header';

    var contentDiv = document.createElement('div');
    contentDiv.className = 'note-editing-window-content';
    contentDiv.id = 'note-editing-window-content';

    var editableContent = document.createElement('textarea');
    editableContent.className = 'editable-content';
    editableContent.id = 'editable-content';

    contentDiv.appendChild(editableContent);
    headerDiv.appendChild(editableHeader);

    contentContainer.appendChild(headerDiv);
    contentContainer.appendChild(contentDiv);

    noteEditingWindow.appendChild(contentContainer);
    container.appendChild(noteEditingWindow);
});

function displayEditingWindow(note) {
    var noteEditingWindow = document.getElementById('note-editing-window');
    noteEditingWindow.classList.add('show');

    const header = document.getElementById('editable-header');
    const content = document.getElementById('editable-content');
    header.value = note.header;
    content.value = note.content;
}

function updateNotesContent(note) {
    const header = document.getElementById('editable-header');
    const content = document.getElementById('editable-content');

    const updatedNote = {
        "content": content.value,
        "created_by_user_id": note.created_by_user_id,
        "header": header.value,
        "id": note.id,
        "in_trash": note.in_trash
    }

    updateNote(updatedNote);
}

async function updateNote(note) {
    await fetch(`${serverUrl}/notes/${note.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
    });
}






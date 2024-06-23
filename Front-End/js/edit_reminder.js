const container = document.querySelector('.container');
const mainContentElement = document.getElementById('main-content')

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

    var footerDiv = document.createElement('div');
    footerDiv.className = 'note-editing-window-footer';
    footerDiv.id = 'note-editing-window-footer';

    var editableTime = document.createElement('input');
    editableTime.className = 'editable-time';
    editableTime.type = 'datetime-local';
    editableTime.value = setCalendarConstraints();
    editableTime.min = setCalendarConstraints();

    contentDiv.appendChild(editableContent);
    headerDiv.appendChild(editableHeader);
    footerDiv.appendChild(editableTime);

    contentContainer.appendChild(headerDiv);
    contentContainer.appendChild(contentDiv);
    contentContainer.appendChild(footerDiv);

    noteEditingWindow.appendChild(contentContainer);
    container.appendChild(noteEditingWindow);
});

function displayReminderEditingWindow(reminder) {
    var noteEditingWindow = document.getElementById('note-editing-window');
    noteEditingWindow.classList.add('show');

    const header = document.getElementById('editable-header');
    const content = document.getElementById('editable-content');
    //const 
    header.value = reminder.header;
    content.value = reminder.content;
}
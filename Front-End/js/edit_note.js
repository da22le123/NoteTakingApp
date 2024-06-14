const container = document.querySelector('.container');
const mainContentElement = document.getElementById('main-content')

//adding the noteEditingWindow to the html
document.addEventListener('DOMContentLoaded', () => {
    var noteEditingWindow = document.createElement('div');
    noteEditingWindow.className = 'note-editing-window';
    noteEditingWindow.id = 'note-editing-window';
    var contentContainer = document.createElement('div');
    contentContainer.className = 'content-container';
    noteEditingWindow.appendChild(contentContainer);
    container.appendChild(noteEditingWindow);
})

function displayEditingWindow(note) {
    var noteEditingWindow = document.getElementById('note-editing-window');
    noteEditingWindow.classList.add('show');
}






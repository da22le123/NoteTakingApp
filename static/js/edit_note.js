const container = document.querySelector('.container');
const mainContentElement = document.getElementById('main-content')


function displayEditingWindow(note) {
    var noteEditingWindow = document.createElement('div');
    noteEditingWindow.className = 'note-editing-window';
    noteEditingWindow.id = 'note-editing-window';
    highlightElement('main-content');
    removeHighlight('note-editing-window');
    noteEditingWindow.style.display = "block";
 //   mainContentElement.style.backgroundColor="rgba(0, 0, 0, 0.4)";
    




    container.appendChild(noteEditingWindow);
}

function hideEditingWindow() {

}



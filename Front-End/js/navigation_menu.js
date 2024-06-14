const menu = document.getElementById('menu-left');
const mainContent = document.getElementById('main-content');
const toggleMenuBtn = document.getElementById('toggle-menu-btn');
const notesBtn = document.getElementById('notes-btn');
const trashBtn = document.getElementById('trash-btn');

toggleMenuBtn.addEventListener('click', () => {
    // Toggle class to show/hide menu
    menu.classList.toggle('show-menu');
    mainContent.classList.toggle('move-content');

    // Adjust main content width when menu is toggled
    if (menu.classList.contains('show-menu')) {
        menu.style.left = '0'; // Adjust to show menu
        mainContent.style.marginLeft = calculateMargin(mainContent) + 125 + "px"; // Adjust to match menu width
    } else {
        menu.style.left = '-125px'; // Adjust to hide menu
        mainContent.style.marginLeft = 'auto'; // Center the main content
    }
});

console.log(trashBtn)
trashBtn.addEventListener('click', () => {
    window.location.href = './trash.html';
});

notesBtn.addEventListener('click', () => {
    window.location.href = './index.html';
});

function calculateMargin(element) {
    const computedStyle = window.getComputedStyle(element);
    return parseInt(computedStyle.marginLeft.replace('px', ''), 10);
}
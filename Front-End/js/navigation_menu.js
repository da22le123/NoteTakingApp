const menu = document.getElementById('menu-left');
const mainContent = document.getElementById('main-content');
const toggleMenuBtn = document.getElementById('toggle-menu-btn');
const notesBtn = document.getElementById('notes-btn');
const remindersBtn = document.getElementById('reminder-btn');
const trashBtn = document.getElementById('trash-btn');

toggleMenuBtn.addEventListener('click', () => {
    // Toggle class to show/hide menu
    menu.classList.toggle('show-menu');
    mainContent.classList.toggle('move-content');

    // Adjust main content width when menu is toggled
    if (menu.classList.contains('show-menu')) {
        menu.style.left = '0'; // Adjust to show menu
        mainContent.style.marginLeft = calculateMargin(mainContent) + 140 + "px"; // Adjust to match menu width
    } else {
        menu.style.left = '-140px'; // Adjust to hide menu
        mainContent.style.marginLeft = 'auto'; // Center the main content
    }
});

trashBtn.addEventListener('click', () => {
    window.location.href = './trash.html';
});

remindersBtn.addEventListener('click', () => {
    window.location.href = './reminders.html';
});

notesBtn.addEventListener('click', () => {
    window.location.href = './index.html';
});

function calculateMargin(element) {
    const computedStyle = window.getComputedStyle(element);
    return parseInt(computedStyle.marginLeft.replace('px', ''), 10);
}
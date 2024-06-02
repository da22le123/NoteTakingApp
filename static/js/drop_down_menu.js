const userSelectBtn = document.getElementById("user-select-btn");
const menuRight = document.getElementById('menu-right');
const currentUserLabel = document.getElementById('current-user-label');
let toggled = false;

userSelectBtn.addEventListener('click', function() {
    if (!toggled) {
        populateMenu();
    } else {
        clearMenu();
    }
    toggled = !toggled;
    console.log(toggled);
});


async function populateMenu() {
    let numberOfUsers = 0;
    const res = await fetch('/users', {
        method: 'GET'
    });

    const data = await res.json();
    numberOfUsers = data.users.length;

    const menuHeight = numberOfUsers * 40;
    menuRight.style.height = '${menuHeight}px';

    // Clear any existing menu items
    menuRight.innerHTML = '';

    let topPosition = 0;
    data.users.forEach((user) => {
        const menuItem = document.createElement('div');
        const button = document.createElement('button');
        menuItem.classList.add('menu-right-item');
        
        menuItem.style.top = `${topPosition}px`;
        menuItem.style.height = '40px'; // Ensure height is set consistently
        menuItem.style.minWidth = '160px'; // Ensure min-width is set consistently

        button.classList.add('menu-right-item-btn');
        button.style.top = `${topPosition}px`;
        button.style.height = '40px'; // Ensure height is set consistently
        button.style.width = '160px'; // Ensure width is set consistently

        button.addEventListener('click', async () => {
            setCurrentUser(user);
            await loadNotesUponUpdate();
        });

        const span = document.createElement('span');
        span.textContent = `${user.name}`;

        menuItem.appendChild(span);
        menuItem.appendChild(button);
        menuRight.appendChild(menuItem);


        topPosition += 40;
        
    });

    const menuItem = document.createElement('div');
    const button = document.createElement('button');
    menuItem.classList.add('menu-right-item');

    menuItem.style.top = `${topPosition}px`;
    menuItem.style.height = '40px'; // Ensure height is set consistently
    menuItem.style.minWidth = '160px'; // Ensure min-width is set consistently

    button.classList.add('menu-right-item-btn');
    button.style.top = `${topPosition}px`;
    button.style.height = '40px'; // Ensure height is set consistently
    button.style.width = '160px'; // Ensure width is set consistently

    button.addEventListener('click', () => 
        window.location.href = '../settings.html'
    );

    const span = document.createElement('span');
    span.textContent = 'Settings';
    span.style.padding = "0px";
    span.style.position = "absolute";
    span.style.right = "50px";

    const img = document.createElement('img');
    img.src = '../resources/setting.png';
    img.style.position = "absolute";
    img.style.right = "10px";
    img.style.width = "30px";
    img.style.height = "30px";

    menuItem.appendChild(span);
    menuItem.appendChild(button);
    menuItem.appendChild(img);
    menuRight.appendChild(menuItem);


    menuRight.style.height = `${numberOfUsers * 40 + 40}px`;
    menuRight.classList.add('show');
}


// Clear the menu items and reset the height
function clearMenu() {
    menuRight.innerHTML = '';
    menuRight.style.height = '0px';
    menuRight.classList.remove('show');
}

async function setCurrentUser(user) {
    currentUser = user;
    currentUserLabel.innerText = user.name;
    await fetch('/current-user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    console.log('Selected user:', currentUser);
}



async function getCurrentUser() {
    const res= await fetch('/current-user', {
        method: 'GET'
    });

    const data = await res.json();
    return data.currentUser; //returns the user
}
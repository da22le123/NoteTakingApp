let reminderContainerHidden = false;
let hiddenReminder = null;
let hiddenReminderId = null;
const serverUrl3 = 'http://localhost:3000';

function addReminder(reminderId, header, content, remind_at) {
    var reminderClass = document.getElementById('reminders');


    var reminderContainer = document.createElement('div');
    reminderContainer.className = 'reminder-container';
    reminderContainer.dataset.reminderId = reminderId; // Store the reminder ID


    // Create reminder header
    var newReminderHeader = document.createElement('div');
    newReminderHeader.className = 'reminder-header1';
    var headerText = document.createElement('div');
    headerText.textContent = header;
    newReminderHeader.appendChild(headerText);
    

    // Create reminder content
    var newReminderContent = document.createElement('div');
    newReminderContent.className = 'reminder-content1';
    newReminderContent.textContent = truncateText(content, 30);

    // Create reminder footer
    var reminderFooter = document.createElement('div');
    reminderFooter.className = 'reminder-footer1';

    var remindTime = document.createElement('label');
    remindTime.className = 'remind-time';
    remindTime.textContent = remind_at;

      reminderFooter.appendChild(remindTime);

    // Add buttons to reminder footer
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

    deleteButton.addEventListener('click', async () => {
        console.log('Delete button clicked');
        try {
            // Delete the reminder from the database first
            console.log('Deleting reminder with ID:', reminderId);
            const response = await deleteReminder(reminderId);
            console.log('Delete response:', response); // Log the response from the server
    
            // If deletion was successful, remove the reminder from the UI
            reminderContainer.remove();
        } catch (error) {
            console.error('Error deleting reminder:', error);
            // Handle error if necessary
        }
    });

    //when clicked on the header of the reminder
    newReminderHeader.addEventListener('click', async () => {
        if (!reminderContainerHidden) {
            reminderContainer.classList.add('hidden');
            hiddenReminder = reminderContainer;
            hiddenReminderId = reminderContainer.dataset.reminderId;
            //fetching the reminder by id stored in the reminder container dataset
            //and then desplaying its contents with editing ability
            const reminder = await getReminderById(reminderContainer.dataset.reminderId);
            displayReminderEditingWindow(reminder[0]);
            reminderContainerHidden = true;
        }
    })

    //when clicked on the content of the reminder
    newReminderContent.addEventListener('click', async () =>{
        if (!reminderContainerHidden) {
            reminderContainer.classList.add('hidden');
            hiddenReminder = reminderContainer;
            hiddenReminderId = reminderContainer.dataset.reminderId;
            //fetching the reminder by id stored in the reminder container dataset
            //and then desplaying its contents with editing ability
            const reminder = await getReminderById(reminderContainer.dataset.reminderId);
            displayReminderEditingWindow(reminder[0]);
            reminderContainerHidden = true;
        }
    })


    //when clicked outside of the popup, closes it
    document.addEventListener('click', (e) => {
        const reminderEditingWindow = document.getElementById('note-editing-window');
        if (reminderContainerHidden && e.target === reminderEditingWindow ) {
            reminderEditingWindow.classList.remove('show');
            hiddenReminder.classList.remove('hidden');
            //fetch the reminder then update it
            getReminderById(hiddenReminderId)
                .then(reminder => {
                    updateRemindersContent(reminder[0]);
                });
            reminderContainerHidden = false;
            //refresh page
            loadRemindersUponUpdate();
        }
    });
    

    reminderFooter.appendChild(deleteButton);

    // Append reminder header, content, and footer to reminder container
    reminderContainer.appendChild(newReminderHeader);
    reminderContainer.appendChild(newReminderContent);
    reminderContainer.appendChild(reminderFooter);



    // Append reminder container to "reminders" class
    reminderClass.appendChild(reminderContainer);
}

function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
}

async function getReminderById(id) {
    const res = await fetch(`${serverUrl3}/reminders/id/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const reminder = await res.json();
    return reminder;
}

async function updateReminder(reminder) {
    await fetch(`${serverUrl3}/reminders/${reminder.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reminder),
    });
}



async function deleteReminder(id) {
    const response = await fetch(`${serverUrl3}/reminders/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const result = await response.json();
    console.log("delete called");
    return result;
}

function updateRemindersContent(reminder) {
    const header = document.getElementById('editable-header');
    const content = document.getElementById('editable-content');
    const time = document.querySelector('.editable-time');

    const updatedReminder = {
        "content": content.value,
        "created_by_user_id": reminder.created_by_user_id,
        "header": header.value,
        "id": reminder.id,
        "remind_at": time.value
    }

    updateReminder(updatedReminder);
    location.reload();
}





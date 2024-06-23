const serverUrl = "http://localhost:3000";

const inputCalendar = document.getElementById('remind_time');
const reminderContent = document.getElementById('reminder-content');
const reminderHeader = document.querySelector('.reminder-header');
const createButton = document.querySelector(".save-reminder-btn");

function setCalendarConstraints() {
    
    //inputCalendar.min = 
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const date = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes() + 1).padStart(2, '0');

    const minDateTime = `${year}-${month}-${date}T${hours}:${minutes}`;


    return minDateTime;
}

document.addEventListener('DOMContentLoaded', function () {
    inputCalendar.min = setCalendarConstraints();
    inputCalendar.value = setCalendarConstraints();

    

    let isCreatingReminder = false;

    const createReminder = async () => {
        if (isCreatingReminder) return;  // Prevent multiple submissions
        isCreatingReminder = true;

        if (reminderContent.value.trim() !== '' && reminderHeader.value.trim() !== '') {
            const header = reminderHeader.value.trim();
            const content = reminderContent.value.trim();
            const remind_at = inputCalendar.value;
            const res = await postNewReminder(content, header, remind_at);
            const data = await res.json();
            const reminderId = data.id;  // Assuming the response contains the reminder ID
            console.log("reminder posted with id: " + reminderId);
            location.reload();
            // addReminder(reminderId, header, content, remind_at);

            reminderHeader.value = '';
            reminderContent.value = '';
        }
        reminderHeader.classList.add('hidden');
        reminderContent.style.width = "200px";
        reminderContent.style.height = "auto";
        createButton.style.display = "none";

        isCreatingReminder = false;
    };

    if (createButton) {
        createButton.addEventListener('click', function () {
            setTimeout(createReminder, 0);
        });
    }


    reminderContent.addEventListener('focus', function () {
        reminderHeader.classList.remove('hidden');
        reminderContent.style.width = "300px";
        reminderContent.style.height = "90px";
        reminderContent.style.textAlign = "top-left";
        createButton.style.display = "block";
    });

    reminderContent.addEventListener('blur', function () {
        setTimeout(async function () {
            if (!reminderHeader.contains(document.activeElement) && !inputCalendar.contains(document.activeElement)) {
                await createReminder();
            }
        }, 0);
    });

    reminderHeader.addEventListener('blur', function () {
        // Use a short timeout to allow any click on reminderContent to be registered
        setTimeout(async function () {
            if (!reminderContent.contains(document.activeElement) && !inputCalendar.contains(document.activeElement)) {
                await createReminder();
            }
        }, 0);
    });
});

async function postNewReminder(content, header, remind_at) {
    const user = await getCurrentUser();
    const created_by_user_id = user.id;
    const reminder = {
        "content": content,
        "created_by_user_id": created_by_user_id,
        "header": header,
        "remind_at": remind_at
    }

    const res = await fetch(`${serverUrl}/reminders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reminder),
    });


    if (!res.ok) {
        console.log("response was not ok")
    }

    return res;
}

document.addEventListener("DOMContentLoaded", () => { 
    loadRemindersUponUpdate(0);
    console.log("Called loadremindersUponUpdate(0)")
});

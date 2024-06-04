document.addEventListener('DOMContentLoaded', function () {
    const noteContent = document.getElementById('note-content');
    const noteHeader = document.querySelector('.note-header');
    const createButton = document.querySelector(".save-note-btn");

    let isCreatingNote = false;

    const createNote = async () => {
        if (isCreatingNote) return;  // Prevent multiple submissions
        isCreatingNote = true;

        if (noteContent.value.trim() !== '' && noteHeader.value.trim() !== '') {
            const header = noteHeader.value.trim();
            const content = noteContent.value.trim();
            const res = await postNewNote(content, header);
            const data = await res.json();
            const noteId = data.id;  // Assuming the response contains the note ID
            console.log("note posted with id: " + noteId);
            addNote(noteId, header, content, 0);

            noteHeader.value = '';
            noteContent.value = '';
        }
        noteHeader.classList.add('hidden');
        noteContent.style.width = "200px";
        noteContent.style.height = "auto";
        createButton.classList.remove("show-btn");

        isCreatingNote = false;
    };

    if (createButton) {
        createButton.addEventListener('click', function () {
            setTimeout(createNote, 0);
        });
    }


    noteContent.addEventListener('focus', function () {
        noteHeader.classList.remove('hidden');
        noteContent.style.width = "300px";
        noteContent.style.height = "90px";
        noteContent.style.textAlign = "top-left";
        createButton.classList.add("show-btn");
    });

    noteContent.addEventListener('blur', function () {
        setTimeout(async function () {
            if (!noteHeader.contains(document.activeElement)) {
                await createNote();
            }
        }, 0);
    });

    noteHeader.addEventListener('blur', function () {
        // Use a short timeout to allow any click on noteContent to be registered
        setTimeout(async function () {
            if (!noteContent.contains(document.activeElement)) {
                await createNote();
            }
        }, 0);
    });
});

async function postNewNote(content, header) {
    const user = await getCurrentUser();
    const created_by_user_id = user.id;
    const note = {
        "content": content,
        "created_by_user_id": created_by_user_id,
        "header": header,
        "in_trash": 0
    }

    const res = await fetch('/notes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
    });


    if (!res.ok) {
        console.log("response was not ok")
    }

    return res;
}

document.addEventListener("DOMContentLoaded", () => loadNotesUponUpdate(0));

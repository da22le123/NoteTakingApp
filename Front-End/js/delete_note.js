//todo test the function!!!

async function moveNoteToTrash(id) {
    const response = await fetch(`${serverUrl}/notes/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'in_trash': 1
        })
    });

    const data = await response.json();
    return data;
}

async function deleteNote(id) {
    const response = await fetch(`${serverUrl}/notes/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const result = await response.json();

    return result;
}
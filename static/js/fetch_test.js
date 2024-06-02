fetch("/users")
    .then(response => response.json())
    .then(users => console.log(users));
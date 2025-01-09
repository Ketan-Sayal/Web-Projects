const socket = io(`http://localhost:${window.PORT.port}`);
const toggleButton = document.querySelector('.toggle-users');
const closeButton = document.querySelector('.close-users');
const userList = document.querySelector('.user-list');
const form = document.getElementById("send-msg");
const messageBox = document.getElementById("message-box");
const chatBox = document.querySelector(".chat-messages");
const audio = document.getElementById('recive-message-sound');

//Toggle button
toggleButton.addEventListener('click', () => {
    userList.classList.add('active');
    toggleButton.classList.add('hidden');
});

closeButton.addEventListener('click', () => {
    userList.classList.remove('active');
    toggleButton.classList.remove('hidden');
});

function activeUsersAddition(name, avatar){
    const div = document.createElement('div');
    div.classList.add('user-item');
    div.innerHTML = `<div class="user-avatar">${avatar}</div>
                    <span>${name}</span>`;
    userList.appendChild(div);
}

// Joined user
socket.emit('user-joined',window.USER_DATA);

// console.log(window.USER_DATA);

// If a new user comes it will tell everyone
socket.on('new-user', (data) => {
    activeUsersAddition(data.name, data.avatar);
});

// Sends the users when user joined only to new user
socket.on('active-users', (users) => {
    users.map((user) => activeUsersAddition(user.name, user.avatar));
});


// If a user send message:

function appendMessage(position, message, sender){
    let div = document.createElement('div');
    div.classList.add('message-container');
    div.classList.add(`${position}`);
    div.innerHTML = `<div class="message-sender">${sender}</div>
                            <div class="message ${position}">
                                ${message}
                            </div>`;
    chatBox.appendChild(div);
}

messageBox.addEventListener("submit", (e)=>{
    e.preventDefault();
    let message = String(messageBox.message.value);
    appendMessage("sent", message, "You");
    socket.emit('send-message', message);
    messageBox.submit();
});

socket.on("recive-message", (data)=>{
    appendMessage("received", data.message, data.name);
    audio.play();
});



// If the person left changes are made delete its online status
socket.on('left', (users) => {
    userList.innerHTML = "";
    userList.innerHTML = `<div class="user-list-header">
                <h2>Active Users</h2>
                <button class="close-users">×</button>
                </div>`;
    const closeButton = document.querySelector('.close-users');
    closeButton.removeAttribute('fdprocessedid');

    // As the new button is made it cannot gt toggle properties like the previous button from global eventLisners so we use eventLisner here
    closeButton.addEventListener('click', () => {
        userList.classList.remove('active');
        toggleButton.classList.remove('hidden');
    });
    
    const activeUsersAddition = (name, avatar) => {
        const div = document.createElement('div');
        div.classList.add('user-item');
        div.innerHTML = `<div class="user-avatar">${avatar}</div>
                        <span>${name}</span>`;
        userList.appendChild(div);
    }
    users.forEach((user) => activeUsersAddition(user.name, user.avatar));
});
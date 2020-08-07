// Selectors
const chatForm = document.querySelector('#chat-form')
const chatMessages = document.querySelector('.chat-messages');
const msgInput = document.getElementById('msg');
const typingFeedback = document.getElementById('typing-feedback');
const usersList = document.querySelector('#users-list');
const socket = io();

const { username } = Qs.parse(location.search, {ignoreQueryPrefix: true});

socket.emit('user connected', { username });

socket.on('users', ({users}) => {
  updateUserList(users);
})

// Event listeners
chatForm.addEventListener('submit', function(event) {
  event.preventDefault();

  socket.emit('chatMessage', {
    username: username,
    message: event.target.elements.msg.value
  });


  // Clear input and focus on field
  event.target.elements.msg.value = '';
  event.target.elements.msg.focus();
});

msgInput.addEventListener('keypress', () => {
  socket.emit('typing', { username });
});


socket.on('message', message => {
  typingFeedback.innerHTML = '';

  displayMessage(message);

  chatMessages.scrollTop = chatMessages.scrollHeight;
});

socket.on('feedback', message => {
  displayFeedback(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

socket.on('typing', username => {
  typingFeedback.innerHTML = `<p>${username} is typing...</p>`
})

// Display messages on the DOM
function displayMessage(message) {
  const div = document.createElement('div');

  div.classList.add('message');
  div.innerHTML = `
    <p class="meta">${message.username} <span>${message.timestamp}</span></p>
    <p class="message-text">${message.text}</p>
  `;

  chatMessages.appendChild(div);
}

// Display feedback messages
function displayFeedback(text) {
  const div = document.createElement('div');

  div.classList.add('feedback');
  div.innerHTML = `<p>${text}</p>`;

  chatMessages.appendChild(div);
}

// Display user list to DOM
function updateUserList(users) {
  usersList.innerHTML = `
    ${users.map(user => `<li class='user'>${user.username}</li>`).join('')}
  `;
}
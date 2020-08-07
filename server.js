const path = require('path');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const formatMessage = require('./tools/messages');
const { users, newUser, userLeave} = require('./tools/users');

const AdminBot = 'AdminBot';

// Static folder
app.use(express.static(path.join(__dirname, 'src')));

// On user connection
io.on('connection', socket => {
  
  socket.on('user connected', ({ username }) => {
    const user = newUser(socket.id, username);

    // Broadcast when user joins chat
    socket.broadcast.emit('feedback', `${user.username} has joined the chat.`);

    // Welcome message to new user
    socket.emit('message', formatMessage(AdminBot, 'Welcome to the chat!'));

    // Emit users in chat
    io.emit('users', {
      users: users
    })
  });    
  
  // On user typing
  socket.on('typing', ({ username }) => {
    socket.broadcast.emit('typing', username);
  });

  // Chat message
  socket.on('chatMessage', (data) => {    
    io.emit('message', formatMessage(data.username, data.message));
  })

  //On user leave
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);
    
    if (user) {
      io.emit('feedback', `${user.username} has left the chat...`);      
    }

    // Update user list
    io.emit('users', {
      users: users
    });
  })
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
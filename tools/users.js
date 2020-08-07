const users = [];

function newUser(id, username) {
  const user = { id, username };

  users.push(user);
  
  return user;
}

function userLeave(id) {
  const index = users.findIndex(user => user.id === id);

  if(index !== -1) {
    return users.splice(index, 1)[0];
  }
}


module.exports = {
  users, 
  newUser,
  userLeave
}
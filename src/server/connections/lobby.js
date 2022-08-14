class Lobby {
  constructor(data) {
    this.mode = data.mode;
    this.users = {};
    this.length = 0;
  }

  addUser(user) {
    if (user.lobby) {
      console.log('[server.js] ERROR: User %s in lobby %s trying to join %s',
      user.id, user.lobby.mode, this.mode);
      return;
    }
    console.log('[server.js]: User %s added to %s lobby', user.id, this.mode);
    user.setLobby(this.mode);
    this.length++;
    this.users[user.id] = user;
  }

  removeUser(user) {
    console.log('[server.js]: Removing %s user from lobby %s', user.id, this.mode);
    user.lobby = null;
    this.length--;
    delete this.users[user.id];
  }

  shiftUser() {
    const user = Object.values(this.users).shift();
    this.removeUser(user);
    return user;
  }
}

module.exports = Lobby;

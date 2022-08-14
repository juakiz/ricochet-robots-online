class User {
  constructor(data) {
    this.id = data.id;
    this.socket = data.socket;
    this.unitData = data.unitData;
    this.lobby = null;
    this.room = null;
    this.rematch = false;
  }

  getId() {
    return this.id;
  }

  getUnitData() {   
    return this.unitData;
  }
  
  setLobby(name) {
    this.lobby = name;
  }

  setRoom(name) {
    this.room = name;
  }
}

module.exports = User;

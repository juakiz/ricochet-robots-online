// TODO: Restart battle logic (for rematch)
// User exit battle (for no rematch)
var BattleLogic = require('../battle-logic/main-logic.js');
var log = console.log.bind(console);
// var util = require('util');

const TICK_TIME_INTERVAL = 100;
class Room {
  constructor(data) {
    this.mode = data.mode;
    this.users = data.users;
    this.usersInRoom = 2;
    this.name = data.name;
    this.interval = null;
    this.rematch = {};

    this.users[0].room = this.users[1].room = this.name;
    // TODO: CHANGE THIS USING IDS PLZ, AND REVISE FOR REMATCH (Maybe not)
    this.sendTo(this.users[0], 'start-battle', 0);
    this.sendTo(this.users[1], 'start-battle', 1);

    this.startBattle();
  }

  sendToAll(message, data) {
    this.users.forEach(function (user) {
      this.sendTo(user, message, data);
    }, this);
  }

  sendTo(user, message, data) {
    if(!user) return;
    user.socket.emit(message, data);
  }

  sendToOther(user, message, data) {
    // const receiver = this.users[0].id === sender.id ? this.users[1] : this.users[0];
    this.sendTo(this.getOther(user), message, data);
  }

  getOther(user) {
    return this.users[1 - this.getUserIndex(user)];
  }

  getUserIndex(user) {
    return this.users.indexOf(user);
  }

  removeUser(user) {
    this.users.splice(this.getUserIndex(user), 1);
    this.usersInRoom--;
  }

  startBattle() {
    const unitData = [this.users[0].getUnitData(), this.users[1].getUnitData()];
    // console.log(util.inspect(usersData));

    this.battle = new BattleLogic(unitData);
    // log('Battle on %s initialized.', this.name);

    this.interval = setInterval(() => {
      this.lastTick = this.battle.update.call(this.battle);
      // this.lastTick.roomName = this.name;
      this.sendToAll('game-tick', this.lastTick);

      // stop sending ticks if someone won
      if (this.battle.status === 0 || this.battle.status === 1 || this.battle.status === 3) {
        this.stopBattle();
      }
    }, TICK_TIME_INTERVAL);

    log('[server.js]: Battle on %s started. ---------', this.name);
  }

  spawnUnit(unit, userID) {
    if (!this.battle) return;
    // log('UserID 0: %s, UserID 1: %s, userID received: %s',
    //   this.users[0].id, this.users[1].id, userID);

    log('User %s spawned unit index %d:',
      userID, unit);

    if (userID === this.users[0].id) {
      this.battle.spawn(unit, 0);
    } else if (userID === this.users[1].id) {
      this.battle.spawn(unit, 1);
    } else {
      log('[server.js] ALERT: Trying to spawn unit from unknown user ID: %s', userID);
    }
  }

  stopBattle() {
    log('[server.js]: Battle on %s stopped. xxxxxxxxx', this.name);
    clearInterval(this.interval);
    delete this.interval;
    delete this.battle;
  }

  rematchOffer(user) {
    const opponent = this.getOther(user);
    if (user.rematch || this.battle || !opponent) return;

    user.rematch = true;
    if (opponent.rematch) {
      log('[server.js]: Users %s and %s acepted a rematch in room %s',
        user.id, opponent.id, this.name);
      this.sendToAll('restart-battle');
      user.rematch = opponent.rematch = false;

      setTimeout(this.startBattle.bind(this), 900);
    } else {
      this.sendTo(opponent, 'confirm-rematch');
    }
  }

  userLeaves(user) {
    log('[server.js]: User %s left room %s', user.id, this.name);
    user.setRoom(null);
    user.rematch = false;
    if (this.usersInRoom < 1) {
      log('[server.js]: Dropping empty room %s', this.name);
      this.stopBattle();
      return true;
    } else {
      console.log('opponent-left');
      this.sendToOther(user, 'opponent-left');
    }
    this.removeUser(user);
  }
}

module.exports = Room;

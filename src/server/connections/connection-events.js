// TODO: Revise for possible error situations
// for example check what happen on reconnections
var User = require('./user.js');
var Lobby = require('./lobby.js');
var Room = require('./room.js');
var { GAMEMODES } = require('../../const.js');

var log = console.log.bind(console);

var users = {};

var lobbies = {
  solo: new Lobby({ mode: 'solo' }),
  invite: new Lobby({ mode: 'invite' }),
};

var lastRoomId = 0;
var rooms = {};

var MessageType = {

  AUTHENTICATION: 'user-auth',
  JOIN_LOBBY: 'join-lobby',
  LEAVE_LOBBY: 'leave-lobby',
  LEAVE_ROOM: 'leave-room',
  DISCONNECT: 'disconnect',
  SPAWN_UNIT: 'spawn-unit',
  REMATCH_OFFER: 'ask-rematch',

};

module.exports = function (socket) {
  log('[server.js]: A user connected.');

  var user = null;
  // var room = null;

  socket.on(MessageType.AUTHENTICATION, onAuth);
  socket.on(MessageType.JOIN_LOBBY, onJoinLobby);
  socket.on(MessageType.LEAVE_LOBBY, onLeaveLobby);
  socket.on(MessageType.LEAVE_ROOM, onLeaveRoom);
  socket.on(MessageType.DISCONNECT, onDisconnect);

  socket.on(MessageType.SPAWN_UNIT, onSpawnUnit);

  socket.on(MessageType.REMATCH_OFFER, onRematchOffer);

  function onAuth(authData) {
    user = new User({ id: authData.id, socket });
    users[authData.id] = user;
    log('[server.js]: User is identified as %s', user.id);
  }

  function onJoinLobby(joinData) {
    log('[server.js]: User %s is searching for "%d" type game...', user.id, joinData.mode);

    user.unitData = joinData.unitData;

    if (joinData.mode === GAMEMODES.SOLO) {
      if (lobbies.solo.length > 0) {
        var opponent = lobbies.solo.shiftUser();
        var roomName = ++lastRoomId + '_room';

        log('[server.js]: Users %s & %s are matched for a "%d" type game in room %s.',
          user.id, opponent.id, joinData.mode, roomName);
        rooms[roomName] = new Room({
          mode: GAMEMODES.SOLO,
          users: [user, opponent],
          name: roomName,
        });
      } else {
        // log('[server.js]: User %s joined "%d" lobby', user.id, joinData.mode);
        lobbies.solo.addUser(user);
      }
    } else {
      log('\nERROR: NOT VALID GAME MODE\n');
    }
  }

  function onLeaveLobby() {
    if (user.lobby === null) return;
    lobbies[user.lobby].removeUser(user);
  }

  function onSpawnUnit(unit, userID) {
    // console.log('Received spawn-unit event: unit %s, userID %s', unit, userID);
    rooms[user.room].spawnUnit(unit, userID);
  }

  function onRematchOffer() {
    rooms[user.room].rematchOffer(user);
  }

  function onDisconnect() {
    log('[server.js]: User disconnected.');

    if (user !== null) {
      onLeaveLobby();
      onLeaveRoom();
      delete users[user.id];
      user = null;
    } else {
      log('[server.js]: WARNING! A unauthenticated user just disconnect.');
    }
    // room = null;
  }

  function onLeaveRoom() {
    if (user.room === null) return;
    const room = rooms[user.room];
    const drop = room.userLeaves(user);
    if (drop) {
      delete rooms[room.roomName];
    }
  }
};

// ES6 style
// class Connections {
//   constructor(data) {
//     log('[server.js]: A user connected.');
//   }
// }
// module.exports = Connections;

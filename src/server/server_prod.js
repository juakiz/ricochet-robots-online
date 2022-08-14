// var express = require('express');
// var app = express();
// var http = require('http').createServer(app);
// var io = require('socket.io')(http);

// app.use(express.static(__dirname));

// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/index.html');
// });

// io.on('connection', function(socket){
//   console.log('a user connected');
// });

// http.listen(3000, function(){
//   console.log('listening on *:3000');
// });

// basic dependencies
// const path = require('path');
const express = require('express');
// const webpack = require('webpack');

// instantiate a webpack compiler
// const config = require("../../webpack/webpack.config.js");
// const compiler = webpack(config);

// // useful webpack dev tools
// const webpackDevMiddleware = require('webpack-dev-middleware');
// const webpackHotMiddleware = require('webpack-hot-middleware')/* (compiler, {
//   log: () => {},
//   heartbeat: 2000
// }) */;

// compiler.hooks.compilation.tap('html-webpack-plugin-after-emit', () => {  
//   webpackHotMiddleware.publish({  
//     action: 'reload'  
//   });  
// });

// run the server
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Socket.io's peer to peer middleware
// var p2p = require('socket.io-p2p-server').Server;
// io.use(p2p);

// encapsulate gameplay events into a imported function sent as a callback
var events = require('./connections/connection-events');
// var events = require('./connection-events');
// var events = require('./rooming');

// path constants
// const DIST_DIR = path.normalize(__dirname + './../../dist');
// const HTML_FILE = path.join(DIST_DIR, 'index.html');

// // handle files in memory
// app.use(webpackDevMiddleware(compiler, {
//   publicPath: config.output.publicPath
// }));

// // hot module replacement
// app.use(webpackHotMiddleware(compiler));

// // app.use(express.static(DIST_DIR));

// // serve files in memory as response for http request to root ('/'), this is good for more
// // comfortable dev
// app.get('/', (req, res) => {
//   const filename = path.join(DIST_DIR, "index.html");

//   compiler
//     .outputFileSystem
//     .readFile(filename, (err, result) => {
//       if (err) {
//         return next(err);
//       }
//       res.set('content-type', 'text/html');
//       res.send(result);
//       res.end();
//     });
// });

// this is the old way before hmr, keeping it for testing purposes
// app.use(express.static('dist'));
// app.get('/', function(req, res){
//   res.sendFile(HTML_FILE);
// });

const PORT = process.env.PORT || 3000;

io.on('connection', events);

http.listen(PORT, () => {
  console.log(`App listening to ${PORT}....`);
  console.log('Press Ctrl+C to quit.');
});

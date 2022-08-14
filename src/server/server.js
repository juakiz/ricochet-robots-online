// basic dependencies
const path = require('path');
const express = require('express');
const webpack = require('webpack');

// init the server
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// encapsulate gameplay events into a imported function sent as a callback
var events = require('./connections/connection-events');

if (process.env.NODE_ENV !== 'production') {
  // instantiate a webpack compiler
  const config = require('../../webpack/webpack.dev.js');
  const compiler = webpack(config);

  // useful webpack dev tools
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware')/* (compiler, {
    log: () => {},
    heartbeat: 2000
  }) */;

  // compiler.hooks.compilation.tap('html-webpack-plugin-after-emit', () => {  
  //   webpackHotMiddleware.publish({  
  //     action: 'reload'  
  //   });  
  // });

  // path constants
  const DIST_DIR = path.normalize(__dirname + './../../dist');
  const HTML_FILE = path.join(DIST_DIR, 'index.html');

  // handle files in memory
  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
  }));

  // hot module replacement
  app.use(webpackHotMiddleware(compiler));

  // serve files in memory as response for http request to root ('/'), this is good for more
  // comfortable dev
  app.get('/', (req, res) => {
    const filename = path.join(DIST_DIR, 'index.html');

    compiler
      .outputFileSystem
      .readFile(filename, (err, result) => {
        if (err) {
          return next(err);
        }
        res.set('content-type', 'text/html');
        res.send(result);
        res.end();
      });
  });
}
// else {
//   // this is to serve index.html and rest of static files through express
//   // (but are currently served by NGINX)
//   app.use(express.static('dist'));
//   app.get('/', function(req, res){
//     res.sendFile(HTML_FILE);
//   });
// }


const PORT = process.env.PORT || 3000;

io.on('connection', events);

http.listen(PORT, () => {
  console.log(`App listening to ${PORT}....`);
  console.log('Press Ctrl+C to quit.');
});

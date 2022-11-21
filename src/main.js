import Phaser from 'phaser';
import WebFontLoaderPlugin from './js/plugins/rexwebfontloaderplugin';
import InputTextPlugin from './js/plugins/rexinputtextplugin';

if (module.hot) module.hot.accept(); // accept Webpack's Hot Module Replacement

import Preloader from './js/scenes/preloader-scene';
import Menu from './js/scenes/menu-scene';

const gameHeight = 640;

const ratio = window.innerWidth / gameHeight;
// console.log(window.innerWidth, window.innerHeight);

const config = {
  backgroundColor: '#eeeeee',
  type: Phaser.AUTO,
  parent: 'phaser-example',
  // width: window.innerWidth,
  // height: window.innerHeight,
  autoresize: true,
  scale: {
    mode: Phaser.Scale.RESIZE,
    parent: 'phaser-example',
    // autoCenter: Phaser.Scale.CENTER_BOTH,
    // width: gameHeight,//window.innerWidth / ratio,//"100%",
    // height: 640,//"100%",
    // width: 1048,
    // height: 1048,
  },
  dom: {
    createContainer: true,
  },
  pixelArt: false,//true,
  scene: [
    Preloader,
    Menu,
    // Battle,
  ],
  plugins: {
    global: [
      {
        key: 'WebFontLoader',
        plugin: WebFontLoaderPlugin,
        start: true,
      },
      {
        key: 'rexInputTextPlugin',
        plugin: InputTextPlugin,
        start: true
      },
    ],
  },
};

const game = new Phaser.Game(config);

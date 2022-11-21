// import io from 'socket.io-client';

import CustomFonts from '../../css/fonts.css';

import boardBg from '../../assets/backgrounds/board_background.png';
import boardFull from '../../assets/backgrounds/board_full.png';

import bgAtlasImg from '../../assets/backgrounds/backgrounds.png';
import bgAtlasData from '../../assets/backgrounds/backgrounds.json';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('PreloaderScene');
  }

  preload() {
    // this.scale.on('resize', (gameSize, baseSize, displaySize, resolution) => { console.log(gameSize, baseSize, displaySize, resolution); });

    this.cameras.main.backgroundColor.setTo(30, 30, 30);
    this.progress = this.add.graphics();
    this.load.on('progress', this.progressBar, this);

    this.load.rexWebFont({
      google: {
        families: ['Press Start 2P'],
      },
      custom: {
        families: ['Mini Square', 'Pixel Square'],
        urls: CustomFonts,
      }
      // testString: undefined,
      // testInterval: 20,
    });

    this.load.atlas('bg_atlas', bgAtlasImg, bgAtlasData);

    this.load.image('board_background', boardBg);
    this.load.image('board_full', boardFull);

    // Connection to Server
    const authToken = '_' + Math.random().toString(36).substr(2, 9); // (random ID number atm)
    // const socket = io();

    // socket.on('connect', () => {
    //   socket.emit('user-auth', { id: authToken });
    // });

    // On Load Complete event
    const scene = this;

    this.load.on('complete', () => {
      const { width, height } = this.scale;
      const { progress } = this;

      const txt = scene.make.text({
        x: width / 2,
        y: height / 4,
        text: 'PUSH TO CONTINUE',
        style: {
          fontSize: '28px',
          fontFamily: '"Pixel Square"',
          color: '#FFFFFF',
          align: 'center',
        },
        add: true
      });

      txt.setOrigin(0.5);

      // this.add(txt);

      // this.scene.start('MenuScene', { socket });

      this.input.on('pointerdown', () => {
        progress.destroy();
        txt.destroy();
        // scene.scale.startFullscreen();
        this.scene.start('MenuScene'/* , { socket } */);
      });
    });

    this.registry.set('myID', authToken);
  }

  progressBar(value) {
    const { width, height } = this.scale;
    const { progress } = this;

    const barHeight = 20/* height * 0.05 */;
    const barWidth = width - 100;
    progress.clear();
    progress.fillStyle(0xffffff, 1);
    progress.fillRect(50, (height / 2) - (barHeight / 2), barWidth * value, barHeight);
    progress.lineStyle(4, 0x1989B8);
    progress.strokeRect(44, (height / 2) - (barHeight / 2) - 6, barWidth + 12, barHeight + 12);
  }
}

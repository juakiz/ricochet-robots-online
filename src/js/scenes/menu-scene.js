// TODO: Refactor all the DRY

// import MenuMain from './menu/menu-main';

import Utils from "../api/utils";
import Board from "./menu/board";

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  create(data) {
    // Init main class
    // this.menuMain = new MenuMain(this, { INNER_WIDTH: 2096, INNER_HEIGHT: 2096, socket: data.socket });
    this.boardContainer = new Board(this);

    const title = this.make.text({
      x:  this.boardContainer.boardImg.displayWidth + 40,
      y: 80,
      text: 'Ricochet\nRobots\nOnline',
      style: {
        fontSize: '64px',
        fontFamily: `"Imbalanced Cap"`,
        color: '#ffffff',
        align: 'left',
        lineSpacing: -15,
        padding: {
          left: 5,
          right: 5,
          top: 5,
          bottom: 5,
        },
      },
      add: true,
    });
    title.setOrigin(0, 0.5)
    this.boardContainer.add(title);

    title.setInteractive();
    title.on('pointerdown', this.gotTeSolution, this);

    this.infoButton = Utils.centeredText(this.boardContainer, {x: this.boardContainer.halfBoardWidth, y: this.boardContainer.halfBoardHeight, text: 'Start', size: '16px'});
    this.infoButton.setInteractive();
    this.infoButton.on('pointerdown', this.startSinglePlayerGame, this);

    // Responsive settings
    this.scale.on('resize', this.canvasResize, this);
    this.canvasResize(this.scale);
  }

  startSinglePlayerGame() {
    this.infoButton.visible = false;
    this.infoButton.text = 'Next';
    this.boardContainer.sandclock.start(60000, this.timeIsOut, this);
  }

  timeIsOut() {
    this.infoButton.visible = true;
    this.infoButton.text = 'Time\nis\nout!\n[Next]';
    this.boardContainer.sandclock.visible = false;
    console.log('TIME IS OUT');
  }

  gotTeSolution() {
    this.infoButton.visible = true;
    this.infoButton.text = 'Got\nthe\nsolution!\n[Next]';
    this.boardContainer.sandclock.stop();
    this.boardContainer.sandclock.visible = false;
    console.log('GOT THE SOLUTION');
  }

  canvasResize(gameSize, baseSize, displaySize, resolution) {
    this.cameras.resize(gameSize.width, gameSize.height);

    const scale = Math.min(gameSize.width / 1048, gameSize.height / 1048);
    this.boardContainer.setPosition(0, 0/* 1048 * 0.5 * scale, 1048 * 0.5 * scale */)
    this.boardContainer.setScale(scale);

    // this.menuMain.resize();
  }

  update() {
    // this.menuMain.update();
  }
}

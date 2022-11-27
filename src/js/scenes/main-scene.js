// TODO: Refactor all the DRY

// import MenuMain from './menu/menu-main';

import Utils from "../api/utils";
import Board from "./main/board";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
  }

  create(data) {
    // Init main class
    // this.menuMain = new MenuMain(this, { INNER_WIDTH: 2096, INNER_HEIGHT: 2096, socket: data.socket });
    this.boardContainer = new Board(this);

    this.startButton = Utils.centeredText(this.boardContainer, {x: this.boardContainer.halfBoardWidth, y: this.boardContainer.halfBoardHeight, text: 'Start', size: '14px'});
    this.startButton.setInteractive();
    this.startButton.on('pointerdown', this.startSinglePlayerGame, this);

    this.nextButton = Utils.centeredText(this.boardContainer, {x: this.boardContainer.halfBoardWidth, y: this.boardContainer.halfBoardHeight, text: 'Test', size: '14px'});
    this.nextButton.setInteractive();
    this.nextButton.on('pointerdown', this.nextRound, this);
    this.nextButton.visible = false;

    this.score = 0;

    this.movesCounter = 0;
    this.counterText = Utils.centeredText(this.boardContainer, {x: this.boardContainer.halfBoardWidth - 24, y: this.boardContainer.halfBoardHeight + 32, text: 0, size: '32px'});
    this.counterText.visible = false;

    this.events.on('movePiece', this.pieceMoved, this);

    // Responsive settings
    this.scale.on('resize', this.canvasResize, this);
    this.canvasResize(this.scale);
  }

  startSinglePlayerGame() {
    this.startButton.visible = false;
    this.counterText.visible = true;
    this.score = 0;
    this.movementCounter = 0;
    this.counterText.text = this.movementCounter;
    this.boardContainer.sandclock.start(60000, this.timeIsOut, this);
    this.boardContainer.showChip();
    this.boardContainer.unlockPieces();
  }

  timeIsOut() {
    this.counterText.visible = false;
    this.nextButton.visible = true;
    this.nextButton.text = 'Time\nis\nout!\n[Next]';
    this.boardContainer.sandclock.visible = false;
    this.boardContainer.chip.visible = false;
    this.boardContainer.lockPieces();
    console.log('TIME IS OUT');
  }

  pieceMoved(targetReached) {
    this.movementCounter++;
    this.counterText.text = this.movementCounter;
    if (targetReached)
      this.gotTeSolution();
  }

  gotTeSolution() {
    this.counterText.visible = false;
    this.nextButton.visible = true;
    this.score++;
    this.nextButton.text = 'You got the\nsolution!\n[Next]';
    this.boardContainer.sandclock.stop();
    this.boardContainer.sandclock.visible = false;
    this.boardContainer.chip.visible = false;
    this.boardContainer.lockPieces();
    console.log('GOT THE SOLUTION');
  }

  nextRound() {
    this.nextButton.visible = false;
    const chipsRemaining = this.boardContainer.showChip();
    if (chipsRemaining) {
      this.boardContainer.unlockPieces();
      this.boardContainer.sandclock.start(60000, this.timeIsOut, this);
      this.movementCounter = 0;
      this.counterText.text = this.movementCounter;
      this.counterText.visible = true;
    } else {
      this.startButton.visible = true;
      this.startButton.text = 'Game Over\nScore:\n' + this.score + '/17\n[Start]';
    }
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

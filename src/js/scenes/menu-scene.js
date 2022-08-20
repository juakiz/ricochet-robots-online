// import MenuMain from './menu/menu-main';

import { gameInfo } from "./system/game-info";

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  create(data) {
    // Init main class
    // this.menuMain = new MenuMain(this, { INNER_WIDTH: 2096, INNER_HEIGHT: 2096, socket: data.socket });
    this.boardContainer = new Board(this);

    // Responsive settings
    this.scale.on('resize', this.canvasResize, this);
    this.canvasResize(this.scale);
  }

  canvasResize(gameSize, baseSize, displaySize, resolution) {
    this.cameras.resize(gameSize.width, gameSize.height);

    const scale = Math.min(gameSize.width / 1048, gameSize.height / 1048);
    this.boardContainer.setPosition((1048 * 0.5 * scale), 1048 * 0.5 * scale)
    this.boardContainer.setScale(scale);

    // this.menuMain.resize();
  }

  update() {
    // this.menuMain.update();
  }
}

class Board extends Phaser.GameObjects.Container {
  constructor(scene, config) {
    super(scene);

    scene.add.existing(this);

    const boardImg = this.boardImg = this.scene.add.sprite(0, 0, 'board_background');
    boardImg.setOrigin(0.5, 0.5);
    boardImg.alpha = 0.5
    this.add(boardImg);

    const boardFull = this.boardFull = this.scene.add.sprite(0, 0, 'board_full');
    boardFull.setOrigin(0.5, 0.5);
    this.add(boardFull);

    const boardCenter = this.boardCenter = this.scene.add.sprite(0, 0, 'bg_atlas', 'board_center.png');
    boardCenter.setOrigin(0.5, 0.5);
    this.add(boardCenter);

    this.createTiles();

    this.placeRandomStuff();
  }

  createTiles() {
    const halfBoardWidth = this.boardImg.displayWidth * 0.5,
      halfBoardHeight = this.boardImg.displayHeight * 0.5,
      halfTileSize = gameInfo.TILE_SIZE * 0.5;
    let spr, row, col;
    gameInfo.BOARD_SETUP.forEach((el, i, arr) => {
      col = i % 16, row = Math.floor(i / 16);
      if (el === 1) {
        spr = this.scene.add.sprite(0, 0, 'bg_atlas', 'slices/tile.png');
        spr.setOrigin(0.5, 0.5);
        spr.x = gameInfo.BOARD_PADDING + col * gameInfo.TILE_SIZE - halfBoardWidth + halfTileSize;
        spr.y = gameInfo.BOARD_PADDING + row * gameInfo.TILE_SIZE - halfBoardHeight + halfTileSize;
        spr.flipX = (col % 2 === 0 && row % 2 === 0) || ((col + 1) % 2 === 0 && (row + 1) % 2 === 0);
        this.add(spr);
      }
    });
  }

  placeRandomStuff() {
    const halfBoardWidth = this.boardImg.displayWidth * 0.5,
      halfBoardHeight = this.boardImg.displayHeight * 0.5,
      halfTileSize = gameInfo.TILE_SIZE * 0.5;
    let spr, row, col, rot, color, form;
    gameInfo.GAME_EXAMPLE_POSITIONS.WALLS.forEach((el, i, arr) => {
      col = el[0], row = el[1], rot = el[2];

      spr = this.scene.add.sprite(0, 0, 'bg_atlas', 'slices/wall-l.png');
      spr.setOrigin(0.5, 0.5);
      spr.x = gameInfo.BOARD_PADDING + col * gameInfo.TILE_SIZE - halfBoardWidth + halfTileSize;
      spr.y = gameInfo.BOARD_PADDING + row * gameInfo.TILE_SIZE - halfBoardHeight + halfTileSize;
      spr.rotation = Math.PI * (rot / 2)
      this.add(spr);
    });

    gameInfo.GAME_EXAMPLE_POSITIONS.PIECES.forEach((el, i, arr) => {
      col = el[0], row = el[1], color = el[2];

      spr = this.scene.add.sprite(0, 0, 'bg_atlas', `slices/piece-${gameInfo.PIECE_DEFS[color]}.png`);
      spr.setOrigin(0.5, 0.5);
      spr.x = gameInfo.BOARD_PADDING + col * gameInfo.TILE_SIZE - halfBoardWidth + halfTileSize;
      spr.y = gameInfo.BOARD_PADDING + row * gameInfo.TILE_SIZE - halfBoardHeight + halfTileSize;
      this.add(spr);
    });

    gameInfo.GAME_EXAMPLE_POSITIONS.GEMS.forEach((el, i, arr) => {
      col = el[0], row = el[1], color = el[2], form = el[3];

      spr = this.scene.add.sprite(0, 0, 'bg_atlas', `slices/gem-${gameInfo.GEM_DEFS[form]}-${gameInfo.PIECE_DEFS[color]}.png`);
      spr.setOrigin(0.5, 0.5);
      spr.x = gameInfo.BOARD_PADDING + col * gameInfo.TILE_SIZE - halfBoardWidth + halfTileSize;
      spr.y = gameInfo.BOARD_PADDING + row * gameInfo.TILE_SIZE - halfBoardHeight + halfTileSize;
      this.add(spr);
    });
  }
}


// PIECES: [
//   [9, 4, 0],// BLUE
//   [5, 9, 1],// GREEN
//   [6, 14, 2],// YELLOW
//   [9, 15, 3],// RED
//   [13, 0, 3],// WHITE
// ],

// GEMS: [
//   [3, 6, 0, 0], // STAR, BLUE
//   [10, 12, 1, 0], // TRIANGLE, BLUE
//   [11, 10, 0, 1], // STAR, GREEN
// ]
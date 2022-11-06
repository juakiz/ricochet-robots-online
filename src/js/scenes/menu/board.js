import { displayInfo } from "../system/display-info";
import Sandclock from "./sandclock";

import boardRules from "../system/board-rules";
import Utils from "../../api/utils";
const {board, pieces} = boardRules;
// const binaryBoard = board.map(el=>parseInt(el.toString(2)))
console.log(board/* , binaryBoard */, pieces);

export default class Board extends Phaser.GameObjects.Container {
  constructor(scene, config) {
    super(scene);

    scene.add.existing(this);

    const boardImg = this.boardImg = this.scene.add.sprite(0, 0, 'board_background');
    boardImg.setOrigin(0, 0);
    boardImg.alpha = 0.5
    this.add(boardImg);

    this.halfBoardWidth = this.boardImg.displayWidth * 0.5,
    this.halfBoardHeight = this.boardImg.displayHeight * 0.5;

    const boardFull = this.boardFull = this.scene.add.sprite(displayInfo.BOARD_PADDING, displayInfo.BOARD_PADDING, 'board_full');
    boardFull.setOrigin(0, 0);
    this.add(boardFull);

    const boardCenter = this.boardCenter = this.scene.add.sprite(this.halfBoardWidth, this.halfBoardHeight, 'bg_atlas', 'board_center.png');
    boardCenter.setOrigin(0.5, 0.5);
    this.add(boardCenter);

    this.sandclock = new Sandclock(scene);
    this.sandclock.setScale(0.45);
    this.sandclock.setPosition(this.halfBoardWidth + 32, this.halfBoardHeight - 2);
    this.add(this.sandclock);

    this.createTiles();
    this.placeGems(board.gems);
    this.placeWalls(board.walls);

    this.placePieces();
  }

  createTiles() {
    let spr, row, col;
      for (let i = 0; i < 256; i++) {
      col = i % 16, row = Math.floor(i / 16);
      if ((col !== 7 && col !== 8) || (row !== 7 && row !== 8)) { // not the 4 center square
        spr = this.scene.add.sprite(0, 0, 'bg_atlas', 'slices/tile.png');
        spr.setOrigin(0.5, 0.5);
        spr.x = displayInfo.BOARD_PADDING + col * displayInfo.TILE_SIZE + displayInfo.TILE_SIZE * 0.5;
        spr.y = displayInfo.BOARD_PADDING + row * displayInfo.TILE_SIZE + displayInfo.TILE_SIZE * 0.5;
        spr.flipX = (col % 2 === 0 && row % 2 === 0) || ((col + 1) % 2 === 0 && (row + 1) % 2 === 0);
        this.add(spr);
      }
    }
  }

  placeWalls(wallsData) {
    let col, row, spr;
    for (let i = 0; i < wallsData.length; i++) {
      col = i % displayInfo.BOARD_DIMENSIONS.x, row = Math.floor(i / displayInfo.BOARD_DIMENSIONS.y);/* , rot = el[2]; */
      // console.log('>>index: ' + i + ' word: ' + wallsData[i].toString(2) + ' col: ' + col + ' row: ' + row);
      if (wallsData[i] != 0)
        for (let n = 0; n < 4; n++) {
          const isSet = Utils.bitTest(wallsData[i], 1 << n);
          // console.log('bit test: word=' + wallsData[i] + ' n=' + n + ' result:' + isSet);
          if (isSet) {
            // console.log(wallsData[i], 1 << n, displayInfo.BIT_ROT[n])
            spr = this.scene.add.sprite(0, 0, 'bg_atlas', 'slices/wall-i.png');
            spr.setOrigin(0.5, 0.5);
            spr.x = displayInfo.BOARD_PADDING + col * displayInfo.TILE_SIZE + displayInfo.TILE_SIZE * 0.5;
            spr.y = displayInfo.BOARD_PADDING + row * displayInfo.TILE_SIZE + displayInfo.TILE_SIZE * 0.5;
            spr.rotation = displayInfo.BIT_ROT[n];
            this.add(spr);
          }
        }
    }
  }

  placeGems(gemsData) {
    let el, col, row, color, form, spr;
    for (let i = 0; i < gemsData.length; i++) {
      el = gemsData[i];
      col = el[0], row = el[1], color = el[2], form = el[3];

      spr = this.scene.add.sprite(0, 0, 'bg_atlas', `slices/gem-${displayInfo.SHAPE_DEFS[form]}-${displayInfo.COLOR_DEFS[color]}.png`);
      spr.setOrigin(0.5, 0.5);
      spr.setScale(1.1)
      spr.x = displayInfo.BOARD_PADDING + col * displayInfo.TILE_SIZE + displayInfo.TILE_SIZE * 0.5;
      spr.y = displayInfo.BOARD_PADDING + row * displayInfo.TILE_SIZE + displayInfo.TILE_SIZE * 0.5;
      this.add(spr);
    }
  }

  isMiddleTile(col, row) {
    return (col === 7 || col === 8) && (row === 7 || row === 8);
  }

  isGemTile(col, row) {
    return board.gems.some(gemData => gemData[0] === col && gemData[1] === row);
  }

  isEmptyTile(col, row) {
    return !this.isMiddleTile(col, row) && !this.isGemTile(col, row);
  }

  placePieces() {
    let spr, coord, row, col;
    for (let i = 0; i < 5; i++) {
      coord = boardRules.getCoordinates(pieces[i]);
      row = coord[0];
      col = coord[1];

      spr = this.scene.add.sprite(0, 0, 'bg_atlas', `slices/piece-${displayInfo.COLOR_DEFS[i]}.png`).setInteractive();
      spr.setOrigin(0.5, 0.65);
      spr.x = displayInfo.BOARD_PADDING + col * displayInfo.TILE_SIZE + displayInfo.TILE_SIZE * 0.5;
      spr.y = displayInfo.BOARD_PADDING + row * displayInfo.TILE_SIZE + displayInfo.TILE_SIZE * 0.5;
      this.add(spr);

      spr.colorIndex = i;

      this.scene.input.setDraggable(spr);
      spr._dragStartPos = new Phaser.Math.Vector2();
    }

    this.scene.input.dragDistanceThreshold = 10;
    this.scene.input.on('dragstart', this.onDragStart, this);
    this.scene.input.on('drag', this.onDrag, this);
    this.scene.input.on('dragend', this.onDrageEnd, this);
  }

  onDragStart(pointer, gameObject) {
    gameObject.setScale(1.1)
    gameObject._dragStartPos.set(gameObject.x, gameObject.y);
  }

  onDrag(pointer, gameObject, dragX, dragY) {
    gameObject.x = dragX;
    gameObject.y = dragY;
  }

  onDrageEnd(pointer, gameObject) {
    gameObject.setScale(1);
    const targetSquare = this.getSquare(gameObject.x, gameObject.y);
    const targetIndex = this.getIndex(targetSquare.col, targetSquare.row);
    if (boardRules.isValidPosition(gameObject.colorIndex, targetIndex)) {
      boardRules.movePiece(gameObject.colorIndex, targetIndex)
      gameObject.x = displayInfo.BOARD_PADDING + targetSquare.col * displayInfo.TILE_SIZE + displayInfo.TILE_SIZE * 0.5;
      gameObject.y = displayInfo.BOARD_PADDING + targetSquare.row * displayInfo.TILE_SIZE + displayInfo.TILE_SIZE * 0.5;
    } else {
      gameObject.setPosition(gameObject._dragStartPos.x, gameObject._dragStartPos.y);
    }
  }

  getSquare(x, y) {
    return {
      col: Math.floor((x - displayInfo.BOARD_PADDING) / displayInfo.TILE_SIZE).clamp(0, 15),
      row: Math.floor((y - displayInfo.BOARD_PADDING) / displayInfo.TILE_SIZE).clamp(0, 15),
    }
  }

  getIndex(col, row) {
    return 16 * row + col;
  }
}

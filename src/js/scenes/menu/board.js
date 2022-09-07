import { displayInfo } from "../system/display-info";
import Sandclock from "./sandclock";

export default class Board extends Phaser.GameObjects.Container {
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

      this.sandclock = new Sandclock(scene);
      this.sandclock.setScale(0.45);
      this.sandclock.setPosition(32, -2);
      this.add(this.sandclock);
  
      this.createTiles();
      this.createBorders();
      this.placeExampleSetup();
    }
  
    createTiles() {
      const halfBoardWidth = this.boardImg.displayWidth * 0.5,
        halfBoardHeight = this.boardImg.displayHeight * 0.5,
        halfTileSize = displayInfo.TILE_SIZE * 0.5;
      let spr, row, col;
        for (let i = 0; i < 256; i++) {
        col = i % 16, row = Math.floor(i / 16);
        if ((col !== 7 && col !== 8) || (row !== 7 && row !== 8)) { // not the 4 center square
          spr = this.scene.add.sprite(0, 0, 'bg_atlas', 'slices/tile.png');
          spr.setOrigin(0.5, 0.5);
          spr.x = displayInfo.BOARD_PADDING + col * displayInfo.TILE_SIZE - halfBoardWidth + halfTileSize;
          spr.y = displayInfo.BOARD_PADDING + row * displayInfo.TILE_SIZE - halfBoardHeight + halfTileSize;
          spr.flipX = (col % 2 === 0 && row % 2 === 0) || ((col + 1) % 2 === 0 && (row + 1) % 2 === 0);
          this.add(spr);
        }
      }
    }
  
    createBorders() {
      const halfBoardWidth = this.boardImg.displayWidth * 0.5,
      halfBoardHeight = this.boardImg.displayHeight * 0.5,
      halfTileSize = displayInfo.TILE_SIZE * 0.5;
      let spr, row, col;
      for (let i = 0; i < 256; i++) {

        col = i % 16, row = Math.floor(i / 16);
        if (col === 0 || col === 15) {
          spr = this.scene.add.sprite(0, 0, 'bg_atlas', 'slices/wall-i.png');
          spr.setOrigin(0.5, 0.5);
          spr.x = displayInfo.BOARD_PADDING + col * displayInfo.TILE_SIZE - halfBoardWidth + halfTileSize;
          spr.y = displayInfo.BOARD_PADDING + row * displayInfo.TILE_SIZE - halfBoardHeight + halfTileSize;
          spr.rotation = col === 0 ? Math.PI : Math.PI * 2;
          this.add(spr);
        }
        if (row === 0 || row === 15) {
          spr = this.scene.add.sprite(0, 0, 'bg_atlas', 'slices/wall-i.png');
          spr.setOrigin(0.5, 0.5);
          spr.x = displayInfo.BOARD_PADDING + col * displayInfo.TILE_SIZE - halfBoardWidth + halfTileSize;
          spr.y = displayInfo.BOARD_PADDING + row * displayInfo.TILE_SIZE - halfBoardHeight + halfTileSize;
          spr.rotation = row === 0 ? Math.PI * 1.5 : Math.PI * 0.5;
          this.add(spr);
        }
      }
    }
  
    placeExampleSetup() {
      const halfBoardWidth = this.boardImg.displayWidth * 0.5,
        halfBoardHeight = this.boardImg.displayHeight * 0.5,
        halfTileSize = displayInfo.TILE_SIZE * 0.5;
      let spr, row, col, rot, color, form;
  
      displayInfo.GAME_EXAMPLE_POSITIONS.GEMS.forEach((el, i, arr) => {
        col = el[0], row = el[1], color = el[2], form = el[3];
  
        spr = this.scene.add.sprite(0, 0, 'bg_atlas', `slices/gem-${displayInfo.SHAPE_DEFS[form]}-${displayInfo.COLOR_DEFS[color]}.png`);
        spr.setOrigin(0.5, 0.5);
        spr.x = displayInfo.BOARD_PADDING + col * displayInfo.TILE_SIZE - halfBoardWidth + halfTileSize;
        spr.y = displayInfo.BOARD_PADDING + row * displayInfo.TILE_SIZE - halfBoardHeight + halfTileSize;
        this.add(spr);
      });
  
      displayInfo.GAME_EXAMPLE_POSITIONS.WALLS.forEach((el, i, arr) => {
        col = el[0], row = el[1], rot = el[2];
  
        spr = this.scene.add.sprite(0, 0, 'bg_atlas', 'slices/wall-l.png');
        spr.setOrigin(0.5, 0.5);
        spr.x = displayInfo.BOARD_PADDING + col * displayInfo.TILE_SIZE - halfBoardWidth + halfTileSize;
        spr.y = displayInfo.BOARD_PADDING + row * displayInfo.TILE_SIZE - halfBoardHeight + halfTileSize;
        spr.rotation = Math.PI * (rot / 2);
        this.add(spr);
      });
      
      displayInfo.GAME_EXAMPLE_POSITIONS.PIECES.forEach((el, i, arr) => {
        col = el[0], row = el[1], color = el[2];
  
        spr = this.scene.add.sprite(0, 0, 'bg_atlas', `slices/piece-${displayInfo.COLOR_DEFS[color]}.png`).setInteractive();
        spr.setOrigin(0.5, 0.5);
        spr.x = displayInfo.BOARD_PADDING + col * displayInfo.TILE_SIZE - halfBoardWidth + halfTileSize;
        spr.y = displayInfo.BOARD_PADDING + row * displayInfo.TILE_SIZE - halfBoardHeight + halfTileSize;
        this.add(spr);
  
        this.scene.input.setDraggable(spr);
        spr._dragStartPos = new Phaser.Math.Vector2();
      });
  
      this.scene.input.dragDistanceThreshold = 10;
      this.scene.input.on('dragstart', this.onDragStart, this);
      this.scene.input.on('drag', this.onDrag, this);
      this.scene.input.on('dragend', this.onDrageEnd, this);
    }
  
    onDragStart(pointer, gameObject) {
      gameObject._dragStartPos.set(gameObject.x, gameObject.y);
    }
  
    onDrag(pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    }
  
    onDrageEnd(pointer, gameObject) {
      gameObject.setPosition(gameObject._dragStartPos.x, gameObject._dragStartPos.y);
    }
  }
  
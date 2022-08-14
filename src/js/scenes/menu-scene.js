import MenuMain from './menu/menu-main';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  create(data) {
    // Init main class
    this.menuMain = new MenuMain(this, { INNER_WIDTH: 2048, socket: data.socket });

    // Responsive settings
    this.scale.on('resize', this.canvasResize, this);
  }

  canvasResize(gameSize, baseSize, displaySize, resolution) {
    var width = gameSize.width;
    var height = gameSize.height;

    this.cameras.resize(width, height);

    this.menuMain.resize();
  }

  update() {
    this.menuMain.update();
  }
}

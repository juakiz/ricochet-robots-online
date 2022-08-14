export default class MainContainer extends Phaser.GameObjects.Container {
  constructor(scene, config) {
    super(scene);

    config = config || {};

    this.name = config.name;

    // Layout config properties //
    this.INNER_WIDTH = config.INNER_WIDTH || 640;
    this.INNER_HEIGHT = config.INNER_HEIGHT || 640;
    this.REAL_WIDTH = 0;
    this.REAL_HEIGHT = 0;
    this.LEFT = 0;
    this.RIGHT = 0;
    this.TOP = 0;
    this.BOT = 0;
    this.SCALE = 1;
    this._main = this;
    this.socket = config.socket;

    scene.add.existing(this);

    this.resize();

    this.init();
  }

  init() {
    console.log('We have an empty main container.');
  }

  update() {
    this.list.forEach((value, index, array) => {
      if (value.update) value.update();
    });
  }

  refreshSizes() {
    this.REAL_WIDTH = window.innerWidth;
    this.REAL_HEIGHT = window.innerHeight;
    const scale = {
      x: this.REAL_WIDTH / this.INNER_WIDTH,
      y: this.REAL_HEIGHT / this.INNER_HEIGHT
    };

    this.SCALE = Math.min(scale.x, scale.y);
    this.INVS = 1 / this.SCALE;

    this.CENTER_X = this.INNER_WIDTH / 2;
    this.CENTER_Y = this.INNER_HEIGHT / 2;
    this.LEFT = -((this.REAL_WIDTH / 2) - this.CENTER_X * this.SCALE) * this.INVS;
    this.RIGHT = -this.LEFT + this.INNER_WIDTH;
    this.TOP = -((this.REAL_HEIGHT / 2) - this.CENTER_Y * this.SCALE) * this.INVS;
    this.BOT = -this.TOP + this.INNER_HEIGHT;
    this.TOTAL_WIDTH = this.RIGHT - this.LEFT;
    this.TOTAL_HEIGHT = this.BOT - this.TOP;
  }

  letterBox() {
    this.setScale(this.SCALE);
    this.x = (this.REAL_WIDTH / 2) - (this.CENTER_X * this.SCALE);
    this.y = (this.REAL_HEIGHT / 2) - (this.CENTER_Y * this.SCALE);
  }
}

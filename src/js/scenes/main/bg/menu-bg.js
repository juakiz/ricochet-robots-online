let _main = null;

export default class Background extends Phaser.GameObjects.Container {
  constructor(parent) {
    super(parent.scene);

    parent.add(this);
    _main = parent._main;

    this.init();
  }

  init() {
    const bg_base = this.bg_base = this.scene.add.tileSprite(_main.CENTER_X, _main.CENTER_Y, 0, 0, 'bg_atlas', 'dungeon_tile.jpg');
    bg_base.tileScaleX = 4;
    bg_base.tileScaleY = 4;
    this.add(bg_base);

    this.resize();
  }

  // Layout methods
  resize() {
    this.fitTileToScreen(this.bg_base);
  }

  fitTileToScreen(tile) {
    tile.width = _main.TOTAL_WIDTH;
    tile.height = _main.TOTAL_HEIGHT;
    tile.tilePositionX = -_main.TOTAL_WIDTH / (2 * 4);
    tile.tilePositionY = -_main.TOTAL_HEIGHT / (2 * 4);
  }

  vScroll(direction) {
    const sign = direction === -1 ? '-' : '+';
    this.scene.tweens.add({
      targets: this.bg_base,
      tilePositionY: `${sign}=${_main.V_GAP}`,
      duration: 200,
      // ease: 'Quad.easeInOut',
    });
    console.log(`${sign}=${_main.V_GAP}`);
    //this.bg_base.tilePositionY = this.V_GAP;//`${sign}=${this.V_GAP}`;
  }

  update() {
  }
}

import Utils from "../api/utils";

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  create(data) {
    const title = this.title = this.make.text({
        x: 0,
        y: 0,
        text: 'Ricochet\nRobots\nOnline',
        style: {
          fontSize: '64px',
          fontFamily: `"Imbalanced Cap"`,
          color: '#656565',
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

    // Responsive settings
    this.scale.on('resize', this.canvasResize, this);
    this.canvasResize(this.scale);
  }

  canvasResize(gameSize, baseSize, displaySize, resolution) {
    this.cameras.resize(gameSize.width, gameSize.height);
    
    const scale = Math.min(gameSize.width / 1048, gameSize.height / 1048);
    const bcSize = 1048 * scale;
    // TODO: Create once, then modify on resize
    this.createPanel(gameSize, bcSize);
    this.title.setPosition(bcSize + 30, 60);
    this.title.setScale(scale);
  }

  // TODO: Create once, then modify on resize
  createPanel(gameSize, bcSize) {
    const width = gameSize.width - bcSize;
    const height = gameSize.height;
    if (this.panel)
      this.panel.destroy();
    this.panel = Utils.ninePatchStretch(
        this,
        width,
        height,
        ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png', '9.png'],
        {atlas: 'bg_atlas'}
      );
    this.panel.x = bcSize + (gameSize.width - bcSize) * 0.5;
    this.panel.y = bcSize * 0.5;
    this.panel.setDepth(-1);
  }
}

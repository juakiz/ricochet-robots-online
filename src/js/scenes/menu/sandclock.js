export default class Sandclock extends Phaser.GameObjects.Container {
    constructor(scene, config) {
      super(scene);

      scene.add.existing(this);
  
      const glass = this.glass = this.scene.add.sprite(0, 0, 'bg_atlas', 'sandclock/glass.png');
      glass.setOrigin(0.5, 0.5);
      this.add(glass);

      const triangleTop = this.triangleTop = this.scene.add.sprite(0, 0, 'bg_atlas', 'sandclock/triangle.png');
      triangleTop.setOrigin(0.5, 0);
      triangleTop.setPosition(0, -10);
      triangleTop.rotation = Math.PI;
      this.add(triangleTop);

      const squareTop = this.squareTop = this.scene.add.sprite(-1, 0, 'bg_atlas', 'sandclock/square.png');
      squareTop.setOrigin(0.5, 1);
      this.add(squareTop);

      const ellipseTop = this.ellipseTop = this.scene.add.sprite(-1, 0, 'bg_atlas', 'sandclock/ellipse.png');
      ellipseTop.setOrigin(0.5, 0.5);
      this.add(ellipseTop);

      const line = this.line = this.scene.add.sprite(0, 0, 'bg_atlas', 'sandclock/line.png');
      line.setOrigin(0.5, 0);
      line.setPosition(0, -10);
      this.add(line);

      squareTop.setPosition(0, triangleTop.y - triangleTop.displayHeight + 6)
      ellipseTop.setPosition(0, squareTop.y - squareTop.displayHeight);

      this.start();
    }

    start() {
        const firstDuration = 8000;
        const secondDuration = 1000;
        const thirdDuration = 100;
        this.scene.tweens.add({
            targets: this.squareTop,
            scaleY: 0,
            ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: firstDuration,
            repeat: 0,            // -1: infinity
            yoyo: false
        });

        this.scene.tweens.add({
            targets: this.ellipseTop,
            y: { from: this.ellipseTop.y, to: this.ellipseTop.y + this.squareTop.displayHeight * 0.95 },
            ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: firstDuration,
            repeat: 0,            // -1: infinity
            yoyo: false
        });

        this.scene.tweens.add({
            targets: this.triangleTop,
            scale: 0,
            ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            delay: firstDuration,
            duration: secondDuration,
            repeat: 0,            // -1: infinity
            yoyo: false
        });

        this.scene.tweens.add({
            targets: this.ellipseTop,
            scale: 0,
            ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            delay: firstDuration,
            duration: secondDuration,
            repeat: 0,            // -1: infinity
            yoyo: false
        });

        this.scene.tweens.add({
            targets: this.ellipseTop,
            y: this.triangleTop.y,
            ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            delay: firstDuration,
            duration: secondDuration,
            repeat: 0,            // -1: infinity
            yoyo: false
        });

        this.scene.tweens.add({
            targets: this.line,
            y: this.line.displayHeight,
            ease: 'quadraticIn',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            delay: firstDuration + secondDuration,
            duration: thirdDuration,
            repeat: 0,            // -1: infinity
            yoyo: false
        });

        this.scene.tweens.add({
            targets: this.line,
            scaleY: 0,
            ease: 'quadraticIn',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            delay: firstDuration + secondDuration,
            duration: thirdDuration,
            repeat: 0,            // -1: infinity
            yoyo: false
        });
    }
}

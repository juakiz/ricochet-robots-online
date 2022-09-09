export default class Sandclock extends Phaser.GameObjects.Container {
    constructor(scene, config) {
        super(scene);

        scene.add.existing(this);

        const glass = this.glass = this.scene.add.sprite(0, 0, 'bg_atlas', 'sandclock/glass.png');
        glass.setOrigin(0.5, 0.5);
        this.add(glass);

        // TOP
        const triangleTop = this.triangleTop = this.scene.add.sprite(0, 0, 'bg_atlas', 'sandclock/triangle.png');
        triangleTop.setOrigin(0.5, 0);
        triangleTop.rotation = Math.PI;
        this.add(triangleTop);
        const squareTop = this.squareTop = this.scene.add.sprite(0, 0, 'bg_atlas', 'sandclock/square2.png');
        squareTop.setOrigin(0.5, 1);
        this.add(squareTop);
        const ellipseTop = this.ellipseTop = this.scene.add.sprite(0, 0, 'bg_atlas', 'sandclock/ellipse.png');
        ellipseTop.setOrigin(0.5, 0.5);
        this.add(ellipseTop);

        squareTop.setScale(0.95, 1);
        triangleTop.setPosition(0, -10);
        squareTop.setPosition(-1, triangleTop.y - triangleTop.displayHeight + 4);
        ellipseTop.setPosition(0, squareTop.y - squareTop.displayHeight);

        const line = this.line = this.scene.add.sprite(0, 0, 'bg_atlas', 'sandclock/line.png');
        line.setOrigin(0.5, 0);
        this.add(line);
        line.setPosition(0, -10);

        // BOTTOM
        const ellipseBottom = this.ellipseBottom = this.scene.add.sprite(0, 0, 'bg_atlas', 'sandclock/ellipse.png');
        ellipseBottom.setOrigin(0.5, 0.5);
        this.add(ellipseBottom);
        const squareBottom = this.squareBottom = this.scene.add.sprite(0, 0, 'bg_atlas', 'sandclock/square2.png');
        squareBottom.setOrigin(0.5, 1);
        this.add(squareBottom);
        const triangleBottom = this.triangleBottom = this.scene.add.sprite(0, 0, 'bg_atlas', 'sandclock/triangle.png');
        triangleBottom.setOrigin(0.5, 0.9);
        this.add(triangleBottom);

        squareBottom.setScale(0.95, 1);
        triangleBottom.setPosition(0, 105);
        squareBottom.setPosition(-1, 105);
        ellipseBottom.setPosition(0, 105);

        this.squareBottomHeight = this.squareBottom.displayHeight;
        squareBottom.setScale(1, 0);
        triangleBottom.setScale(0);
        ellipseBottom.setScale(0);

      this.start();
    }

    start() {
        const firstDuration = 60000;
        const secondDuration = firstDuration * 0.15;
        const thirdDuration = 200;
        const totalDuration = firstDuration + secondDuration;

        // TOP
        this.squareTop.scaleY = 1;
        this.triangleTop.setScale(1);
        this.ellipseTop.setScale(1);
        this.ellipseTop.y = this.squareTop.y - this.squareTop.displayHeight;
        this.line.scaleY = 1;
        this.line.y = -10;

        const topSquareTimeline = this.scene.tweens.createTimeline();
        const topEllipseTimeline = this.scene.tweens.createTimeline();
        const topTriangleTimeline = this.scene.tweens.createTimeline();
        topSquareTimeline.add({
            targets: this.squareTop,
            scaleY: 0,
            duration: firstDuration,
        });
        topEllipseTimeline.add({
            targets: this.ellipseTop,
            y: `+=${this.squareTop.displayHeight * 0.95}`,
            duration: firstDuration
        });
        topTriangleTimeline.add({
            targets: this.triangleTop,
            scale: 0,
            duration: secondDuration,
            delay: firstDuration
        });
        topEllipseTimeline.add({
            targets: this.ellipseTop,
            scale: 0,
            y: this.triangleTop.y,
            duration: secondDuration
        });
        topTriangleTimeline.add({
            targets: this.line,
            y: this.line.height,
            scaleY: 0,
            ease: 'quadraticIn',
            duration: thirdDuration,
        });
        topEllipseTimeline.play();
        topSquareTimeline.play();
        topTriangleTimeline.play();

        // BOTTOM
        this.squareBottom.setScale(1, 0);
        this.triangleBottom.setScale(0);
        this.ellipseBottom.setScale(0);
        this.triangleBottom.setPosition(0, 105);

        const bottomTriangleTimeline = this.scene.tweens.createTimeline();
        const bottomSquareTimeline = this.scene.tweens.createTimeline();
        bottomTriangleTimeline.add({
            targets: [this.triangleBottom, this.ellipseBottom],
            scale: 1,
            duration: totalDuration * 0.3,
        });
        bottomSquareTimeline.add({
            targets: this.squareBottom,
            scaleY: 1,
            duration: totalDuration * 0.7,
            delay: totalDuration * 0.3,
        });
        bottomTriangleTimeline.add({
            targets: this.triangleBottom,
            y: `-=${this.squareBottomHeight}`,
            duration: totalDuration * 0.7,
        });

        bottomTriangleTimeline.play();
        bottomSquareTimeline.play();

        var timer = this.scene.time.addEvent({
            delay: totalDuration * 1.1,
            callback: this.start,
            callbackScope: this,
            loop: true
        });
    }
}

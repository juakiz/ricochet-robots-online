// TODO:
// * Use audio class (Maybe global?)
import Utils from '../../api/utils';
import Main from '../../api/mainContainer';
import MenuBackground from './bg/menu-bg';

export default class MenuMain extends Main {
  constructor(scene, config) {
    super(scene, config);
  }

  init() {
    const { socket } = this;

    this.menuBg = new MenuBackground(this);

    const boardImg = this.boardImg = this.scene.add.sprite(this.CENTER_X, this.CENTER_Y, 'board_background');
    boardImg.setOrigin(0.5, 0.5)
    boardImg.setScale(0.5, 0.5);
    this.add(boardImg);

    const boardFull = this.boardFull = this.scene.add.sprite(this.CENTER_X, this.CENTER_Y, 'board_full');
    boardFull.setOrigin(0.5, 0.5);
    boardFull.setScale(0.5, 0.5);
    this.add(boardFull);

    const boardCenter = this.boardCenter = this.scene.add.sprite(this.CENTER_X, this.CENTER_Y, 'bg_atlas', 'board_center.png');
    boardCenter.setOrigin(0.5, 0.5);
    boardCenter.setScale(0.5, 0.5);
    this.add(boardCenter);

    this.scene.events.on('fight-button', (fightData) => {
      const { mode, roomName } = fightData;
      socket.emit('join-lobby', {
        unitData,
        mode,
        roomName,
      });

    });

    this.scene.events.on('cancel-button', (fightData) => {
        socket.emit('leave-lobby', {});
    });

    socket.on('start-battle', index => {

    }, this);

  }


  resize() {
    this.refreshSizes();
    this.letterBox(this);

    this.V_GAP = (this.TOTAL_HEIGHT / 2) + (this.INNER_HEIGHT / 2);
    this.H_GAP = (this.TOTAL_WIDTH / 2) + (this.INNER_WIDTH / 2);

    this.list.forEach((value, index, array) => {
      if (value.resize) value.resize();
    });
  }

  update() {
  }

  reset() {
  }
}

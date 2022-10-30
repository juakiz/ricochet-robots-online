class Utils {
  constructor() {
    throw new Error('AbstractClassError');
  }

  static partNameGen(prefix, ...numbers) {
    return numbers.map((val) => `${prefix}/kenney_ui_${Utils.pad(val, 3)}.png`);
  }

  static pad(num, size) {
    let s = `${num}`;
    while (s.length < size) s = `0${s}`;
    return s;
  }

  static ninePatchStretch(parent, width, height, parts, config) {
    const { scene } = parent;
    const grp = scene.add.container();
    parent.add(grp);

    const imgs = parts.map((el, i) => {
      const img = scene.add.image(0, 0, config.atlas || el, el);
      img.setScale(config.scale || 1);
      if (config.tint) img.tint = config.tint;
      grp.add(img);
      return img;
    });

    const stretchedWidth = width - imgs[0].displayWidth - imgs[2].displayWidth;
    const stretchedHeight = height - imgs[0].displayHeight - imgs[6].displayHeight;

    // if (stretchedWidth <= 0)
    //   console.warn(`Too small ninepatch width: 
    //     ${imgs[0].displayWidth} + ${imgs[0].displayWidth} >= ${width}`);
    // if (stretchedHeight <= 0)
    //   console.warn(`Too small ninepatch height: 
    //     ${imgs[0].displayHeight} + ${imgs[0].displayHeight} >= ${height}`);

    imgs[4].displayWidth = imgs[1].displayWidth = imgs[7].displayWidth = stretchedWidth;
    imgs[4].displayHeight = imgs[3].displayHeight = imgs[5].displayHeight = stretchedHeight;

    imgs[2].x = imgs[5].x = imgs[8].x = (stretchedWidth / 2) + (imgs[0].displayWidth / 2);
    imgs[0].x = imgs[3].x = imgs[6].x = -imgs[2].x;

    imgs[6].y = imgs[7].y = imgs[8].y = (imgs[1].displayHeight / 2) + (stretchedHeight / 2);
    imgs[0].y = imgs[1].y = imgs[2].y = -imgs[6].y;

    return grp;
  }

  static threePatchStretch(parent, size, parts, config) {
    const { scene } = parent;
    const grp = scene.add.container();
    parent.add(grp);

    const imgs = parts.map((el, i) => {
      const img = scene.add.image(0, 0, config.atlas || el, el);
      img.setScale(config.scale || 1);
      grp.add(img);
      return img;
    });

    if (!config.vertical) {
      imgs[1].displayWidth = size - imgs[0].displayWidth - imgs[2].displayWidth;
      imgs[2].x = (imgs[1].displayWidth / 2) + (imgs[0].displayWidth / 2);
      imgs[0].x = -imgs[2].x;
    } else {
      imgs[1].displayHeight = size - imgs[0].displayHeight - imgs[2].displayHeight;
      imgs[2].y = (imgs[1].displayHeight / 2) + (imgs[0].displayHeight / 2);
      imgs[0].y = -imgs[2].y;
    }

    return grp;
  }

  static createText(parent, x, y, text = 'Test', size = '64px', color = '#FFFFFF', shadow, stroke) {
    const txt = parent.scene.make.text({
      x,
      y,
      text,
      style: {
        fontSize: size,
        fontFamily: '"Press Start 2P"',
        color,
        align: 'center',
      },
      add: true
    });

    if (shadow) {
      txt.setShadow(shadow.x, shadow.y, shadow.color, true, false);
    }

    if (stroke) {
      txt.setStroke(stroke.color, stroke.size);
    }

    txt.setOrigin(0.5);

    parent.add(txt);
    return txt;
  }

  static centeredText(parent, config) {

    const cfg = {
      x: config.x || 0,
      y: config.y || 0,
      text: config.text || 'Test',
      size: config.size || '64px',
      color: config.color || '#FFFFFF',
      shadow: config.shadow,
      stroke: config.stroke,
      fontFamily: config.fontFamily || 'Press Start 2P',
    }

    const txt = parent.scene.make.text({
      x: cfg.x,
      y: cfg.y,
      text: cfg.text,
      style: {
        fontSize: cfg.size,
        fontFamily: `"${cfg.fontFamily}"`,
        color: cfg.color,
        align: 'center',
        // lineSpacing: 20,
        padding: {
          left: 5,
          right: 5,
          top: 5,
          bottom: 5,
        },
      },
      add: true,
    });

    if (cfg.shadow) {
      txt.setShadow(cfg.shadow.x, cfg.shadow.y, cfg.shadow.color, true, false);
    }

    if (cfg.stroke) {
      txt.setStroke(cfg.stroke.color, cfg.stroke.size);
    }

    txt.setOrigin(0.5);

    parent.add(txt);
    return txt;
  }

  static bitTest(word, mask){
    return (word & mask) != 0;
  }
  
  static bitSet(word, mask){
    return word |= mask;
  }
  
  static bitClear(word, mask){
    return word &= ~mask;
  }
  
  static bitToggle(word, mask){
    return word ^= mask;
  }
}

Utils.STATIC_CONSTANT = 1;

export default Utils;

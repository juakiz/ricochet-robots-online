const WEAPON_TYPES = require('./../../const').WEAPON_TYPES;

// TODO: (maybe improve)
// * Handle death (maybe implement pool of dead units)
// * Create tick class to send more encapsulated and customized objects
// * WIN/LOSE/DRAW and related events
// * Send match duration to the client (and maybe another initial data) or
//   have it stored based on gamemode, etc

const STATUS = {
  PLAYER0WON: 0,
  PLAYER1WON: 1,
  RUNNING: 2,
  DRAW: 3,
};

// const WEAPON_TYPES = {
//   MELEE: 0,
//   RANGED: 1,
// };

const FLOOR_SIZE = 1024;
const SIDE_FLOOR_SIZE = FLOOR_SIZE / 2;

const MATCH_TIME = 900;

class BattleLogic {
  constructor(unitsData) {

    this.unitsData = unitsData;
    ///// example of unit data format
    // [
    //  { name: 'knight_m', spd: 2, dmg: 5, hp: 20, rng: 60 },
    //  { name: 'wizzard_m', spd: 4, dmg: 4, hp: 15, rng: 45 },
    //  { name: 'elf_m', spd: 6, dmg: 2, hp: 10, rng: 30 },
    // ]

    this.rock = { angle: 0 };

    this.units = [
      [],
      [],
    ];
    this.unitsByUID = [];

    this.projectiles = [
      [],
      [],
    ];

    this.IDCount = 0;

    // this.projectilesByUID = [];
    // this.projectilesCount = 0;

    // start on -50 to countdown
    this.tickCount = -50;

    // this.lockDown = 30; // set lockdown to 30, ready for the 3 seconds countdown

    this.status = STATUS.RUNNING; // Game status
  }

  update() {
    if (this.status !== STATUS.RUNNING)
      return { tickCount: ++this.tickCount, units: this.units, rock: this.rock, status: this.status };

    // first decide what the unit will do
    let sideFlag;
    // first left side
    sideFlag = 1; // this is positive to have positive angles clockwise (negative pos = negative torque)

    // this.units.forEach((side, index) => {
    //   const enemyIndex = 1 - index;
    //   side.forEach((unit) => {

    for (let side = 0; side < 2; side++) {
      const enemyIndex = 1 - side;
      for (let i = this.units[side].length - 1; i >= 0; i--) {
        const unit = this.units[side][i];

        // check if unit is dead
        if (unit.hp <= 0) {
          // keep doing this for debug purposes, remove when not needed anymore
          unit.dead = true;
          this.units[side].splice(i, 1);
          delete this.unitsByUID[unit.uid];
        } else {
          // is in attacking state?
          if (unit.actions.attacking) {
            // continue attacking?
            const targetObj = this.unitsByUID[unit.target];
            // console.log(unit.name + ' from side: ' + side + 'have target: ' + targetObj);
            if (unit.target !== null && typeof targetObj !== 'undefined' && targetObj.hp > 0) {
              // yes, set anim to next step
              if (unit.atkAnim.curr === 0) {
                unit.atkAnim.curr = unit.atkAnim.count;
              } else {
                unit.atkAnim.curr--;
              }
            } else {
              // no, put unit in move state to check below if will walk or attack another unit
              unit.target = null;
              unit.actions.attacking = false;
              unit.actions.moving = true;
              unit.atkAnim.curr = -1; // !!
            }
          }

          if (!unit.actions.attacking) {
            // have enemy in range for attack?
            for (let i = 0, len = this.units[enemyIndex].length; i < len; i++) {
              const enemy = this.units[enemyIndex][i];

              // console.log(this.distance(unit, enemy), unit.rng);
              if (enemy.hp > 0 && BattleLogic.distance(unit, enemy) <= unit.rng) {
                // target found alive and in-range! set target uid and "actions flags" props
                unit.target = enemy.uid;
                // enemy.aggresors.push(unit.uid);
                unit.actions.attacking = true;
                unit.actions.moving = false;
                unit.atkAnim.curr = unit.atkAnim.count; // !!
                break; // get out from loop for immediately!
              }
            }
          }
        }
      }/* ); */

      // now right side
      sideFlag = -1; // this is negative to invert second side positions in array
    }/* ); */
    // console.log('Rock angle: %d.', this.rock.angle);

    // and now execute what the unit will do:
    sideFlag = 1; // this is positive to have positive angles clockwise (negative pos = negative torque)

    this.rock.torque = 0; // reset "force" applied by units to recalculate again after movements

    this.units.forEach((side, index) => {
      const enemyIndex = 1 - index;
      side.forEach((unit) => {

        // if dead, unit won't do anything
        if (unit.dead) {
          console.warn('Unexpected dead unit remaining')
        } else {
          // move the unit in case we need
          if (unit.actions.moving) {
            unit.pos += unit.spd;
            // change the angular force unit is appliying to the rock based on its weight and position
            unit.torqueN = unit.wght * (unit.pos / SIDE_FLOOR_SIZE);

            // Check for second win condition (unit reach end of the rock)
            if (unit.pos >= SIDE_FLOOR_SIZE) {
              this.status = 1 - enemyIndex; // my index = invert enemy index (x = 1 - x)
            }
          }
          this.rock.torque += sideFlag * unit.torqueN; // add unit torque to the global torque applied

          // do the attack
          if (unit.actions.attacking) {
            // console.log(unit.name + ' - ' + unit.atkAnim.curr);

            if (unit.atkAnim.curr === 0) { // means one attack "anim" just ends
              const targetObj = this.unitsByUID[unit.target];
              // melee ranged?
              if (unit.weapon.type.key === WEAPON_TYPES.MELEE) {
                // remove enemy HP
                targetObj.hp -= unit.dmg;
                // console.log('Atack done by %s. Did %d dmg, target hp: %d.', unit.name, unit.dmg, targetObj.hp);
              } else if (unit.weapon.type.key === WEAPON_TYPES.RANGED) {
                // console.log('[Debug] Ranged attack!, tick: ' + this.tickCount + ' side: ' + sideFlag);
                this.spawnProjectile(index, unit, targetObj);
              }
            }
          }
        }
      });
      sideFlag = -1; // this is negative to invert second side positions in array
    });

    // Now projectiles
    for (let side = 0; side < 2; side++) {
      for (let i = this.projectiles[side].length - 1; i >= 0; i--) {
        const projectile = this.projectiles[side][i];
        // console.log('Projectile Position: ' + projectile.pos + ', tick: ' + this.tickCount);
        // console.log(this.tickCount, projectile.start, projectile.end)

        if (this.tickCount >= projectile.end) {
          // projectile.dead = true;
          const target = this.unitsByUID[projectile.targetUID];
          if (target) {
            target.hp -= projectile.dmg;
          }/*  else {
            console.log('[Debug]: A PROJECTILE WITH NO TARGET!');
          } */

          this.projectiles[side].splice(i, 1);
        }
      }
    }

    // linear interpolate rock angle based in torque applied, to emulate physics with better performance
    this.rock.angle = BattleLogic.linear(this.rock.angle, this.rock.torque, 0.24);

    // win/lose?
    if (this.rock.angle >= 40) {
      // this.rock.angle = 40;
      this.status = STATUS.PLAYER0WON;
    } else if (this.rock.angle <= -40) {
      // this.rock.angle = -40;
      this.status = STATUS.PLAYER1WON;
    }

    if (this.tickCount > MATCH_TIME) {
      if (this.rock.angle === 0)
        this.status = STATUS.DRAW;
      else
        this.status = this.rock.angle > 0 ? STATUS.PLAYER0WON : STATUS.PLAYER1WON;
    }

    return { tickCount: ++this.tickCount, units: this.units, /* projectiles: this.projectiles,  */rock: this.rock, status: this.status };
  }

  static distance(unit1, unit2) {
    return Math.abs(unit1.pos + unit2.pos);
  }

  static linear(p0, p1, t) {
    return (p1 - p0) * t + p0;
  }

  spawn(unit, playerIndex) {
    // console.log(this.tickCount);
    if (this.tickCount < 0) return; // lock unit spawn during countdown

    const data = this.unitsData[playerIndex][unit];
    const uid = this.IDCount++;

    const initialPosition = -SIDE_FLOOR_SIZE;
    const instanceUnit = {
      playerIndex,
      uid,
      name: data.name,
      spd: data.spd,
      dmg: data.weapon.dmg || data.dmg,
      baseHp: data.hp,
      hp: data.hp,
      wght: data.wght,
      rng: data.weapon.rng || data.rng,
      weapon: data.weapon,
      pos: initialPosition,
      atkAnim: {
        curr: -1,
        count: data.weapon.ticks || 3,
        exeFrame: data.weapon.executionFrame || 0,
      },
      actions: { moving: true, attacking: false },
      target: null,
      torqueN: data.wght * (initialPosition / SIDE_FLOOR_SIZE),// set the angular force unit is appliying to the rock
      dead: false,
    };
    // console.log('[Debugger]: %s. spd: %d, dmg: %d, hp: %d, wght: %d, rng: %d',
    //   data.name, data.spd, data.dmg, data.hp, data.wght, data.rng);
    // console.log('Adding unit to player ' + playerIndex + ': ' + JSON.stringify(instanceUnit.name));
    this.units[playerIndex].push(instanceUnit);
    this.unitsByUID[uid] = instanceUnit;
  }

  spawnProjectile(playerIndex, unit, target) {
    const { weapon } = unit;
    // const uid = this.IDCount++;
    // console.log(`Pos: ${unit.pos}, target pos: ${unit.pos + BattleLogic.distance(unit, target)}`);
    // console.log(JSON.stringify(unit), JSON.stringify(weapon))

    const dist = BattleLogic.distance(unit, target);
    const speed = weapon.type.projectile.speed;
    const ticks = Math.round(dist / speed);

    const projectile = {
      // uid,
      type: weapon.type.projectile.key,
      dmg: unit.dmg,
      // pos: unit.pos - weapon.type.projectile.speed,
      // targetPos: unit.pos + BattleLogic.distance(unit, target),
      start: this.tickCount,
      end: this.tickCount + ticks,
      unitUID: unit.uid,
      targetUID: target.uid,
      // speed: weapon.type.projectile.speed,
      // dead: false,
    };
    this.projectiles[playerIndex].push(projectile);
  }
}

module.exports = BattleLogic;

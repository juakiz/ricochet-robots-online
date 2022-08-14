import { WEAPON_TYPES, PROJECTILE_TYPES } from "../../../const";

export const RaceInfo = [
  { name: 'men', units: ['knight_m', 'wizzard_m', 'elf_m'], color: '#5698CC' },
  { name: 'zombies', units: ['big_zombie', 'zombie', 'tiny_zombie'], color: '#775C55' },
  { name: 'women', units: ['knight_f', 'wizzard_f', 'elf_f'], color: '#F78697' },
  { name: 'orcs', units: ['ogre', 'orc_warrior', 'goblin'], color: '#3D734F' },
  { name: 'demons', units: ['big_demon', 'chort', 'imp'], color: '#DA4E38' },
  { name: 'awakened', units: ['necromancer', 'masked_orc', 'skelet'], color: '#5F2D56' },
  { name: 'kittens', units: ['brown_cat', 'white_cat', 'grey_cat'], color: '#505050' },
];

const WeaponInfo = {
  unarmed: {
    name: 'unarmed',
    type: {
      key: WEAPON_TYPES.MELEE,
    },
  },
  bow: {
    name: 'bow',
    rng: 500,//200,
    dmg: 10,
    ticks: 12,
    executionFrame: 0,
    type: {
      key: WEAPON_TYPES.RANGED,
      projectile: {
        key: PROJECTILE_TYPES.ARROW,
        speed: 60,
      },
    },
  },
};

export const UnitInfo = {
  // men: {
  knight_m: { spd: 3, dmg: 60, hp: 180, wght: 40, rng: 60, weapon: WeaponInfo.unarmed },
  wizzard_m: { spd: 4, dmg: 40, hp: 150, wght: 30, rng: 45, weapon: WeaponInfo.unarmed },
  elf_m: { spd: 5, dmg: 20, hp: 100, wght: 15, rng: 30, weapon: WeaponInfo.bow },
  // },
  // women: {
  knight_f: { spd: 2, dmg: 60, hp: 200, wght: 40, rng: 60 },
  wizzard_f: { spd: 4, dmg: 40, hp: 150, wght: 30, rng: 45 },
  elf_f: { spd: 6, dmg: 20, hp: 100, wght: 20, rng: 30 },
  // },
  // zombies: {
  big_zombie: { spd: 2, dmg: 80, hp: 200, wght: 40, rng: 60, weapon: WeaponInfo.unarmed  },
  zombie: { spd: 4, dmg: 40, hp: 150, wght: 30, rng: 45, weapon: WeaponInfo.unarmed  },
  tiny_zombie: { spd: 6, dmg: 20, hp: 100, wght: 20, rng: 30, weapon: WeaponInfo.unarmed  },
  // },
  // orcs: {
  ogre: { spd: 2, dmg: 50, hp: 200, wght: 40, rng: 60 },
  orc_warrior: { spd: 4, dmg: 40, hp: 150, wght: 30, rng: 45 },
  goblin: { spd: 6, dmg: 20, hp: 100, wght: 20, rng: 30 },
  // },
  // demons: {
  big_demon: { spd: 2, dmg: 50, hp: 200, wght: 40, rng: 60 },
  chort: { spd: 4, dmg: 40, hp: 150, wght: 30, rng: 45 },
  imp: { spd: 6, dmg: 20, hp: 100, wght: 20, rng: 30 },
  // },
  // awakened: {
  necromancer: { spd: 2, dmg: 50, hp: 200, wght: 40, rng: 60 },
  masked_orc: { spd: 4, dmg: 40, hp: 150, wght: 30, rng: 45 },
  skelet: { spd: 6, dmg: 20, hp: 100, wght: 20, rng: 30 },
  // },
  // cats: {
  brown_cat: { spd: 2, dmg: 50, hp: 200, wght: 40, rng: 60 },
  white_cat: { spd: 4, dmg: 40, hp: 150, wght: 30, rng: 45 },
  grey_cat: { spd: 6, dmg: 20, hp: 100, wght: 20, rng: 30 },
  // },
};

export const LockedContent = {
  races: {
    men: false,
    zombies: false,
    women: true,
    orcs: true,
    demons: true,
    awakened: true,
    kittens: true,
  },
  modes: {
    solo: false,
    invite: true,
    local: true,
  }
};

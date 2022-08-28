export const gameInfo = {
  BOARD_SETUP: [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
    1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 
    1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
  ],
  BOARD_PADDING: 12,
  TILE_SIZE: 64,

  COLOR_DEFS: [
    'blue',
    'green',
    'yellow',
    'red',
    'white',
    'rainbow',
  ],

  SHAPE_DEFS: [
    'star',
    'sun',
    'moon',
    'planet',
    'spiral',
  ],

  GAME_EXAMPLE_POSITIONS: {
    WALLS: [
      [7, 7, 3],
      [8, 7, 0],
      [7, 8, 2],
      [8, 8, 1],

      [1, 0, 0],
      [8, 0, 0],
      [4, 1, 0],
      [11, 1, 3],
      [15, 1, 1],
      [1, 3, 2],
      [14, 3, 0],
      [9, 4, 1],
      [0, 5, 2],
      [5, 5, 3],
      [3, 6, 1],
      [12, 6, 2],
      [2, 8, 0],
      [5, 9, 2],
      [1, 10, 1],
      [11, 10, 3],
      [13, 11, 2],
      [15, 11, 1],
      [0, 12, 2],
      [4, 12, 0],
      [10, 12, 0],
      [12, 13, 1],
      [6, 14, 3],
      [3, 15, 1],
      [9, 15, 1],
    ],

    PIECES: [
      [9, 4, 0],// BLUE
      [5, 9, 1],// GREEN
      [6, 14, 2],// YELLOW
      [9, 15, 3],// RED
      [13, 0, 4],// WHITE
    ],

    GEMS: [
      [4, 1, 1, 2], // GREEN, MOON
      [1, 3, 3, 1], // RED, SUN
      [5, 5, 2, 3], // YELLOW, PLANET
      [3, 6, 0, 0], // BLUE, STAR

      [11, 1, 3, 2], // RED, MOON
      [14, 3, 1, 1], // GREEN, SUN
      [9, 4, 0, 3], // BLUE, PLANET
      [12, 6, 2, 0], // YELLOW, STAR

      [2, 8, 5, 4], // RAINBOW, SPIRAL
      [5, 9, 1, 3], // GREEN, PLANET
      [1, 10, 0, 2], // BLUE, MOON
      [4, 12, 3, 0], // RED, STAR
      [6, 14, 2, 1], // YELLOW, SUN

      [10, 12, 0, 1], // BLUE, TRIANGLE
      [13, 11, 3, 3], // RED, PLANET
      [11, 10, 1, 0], // GREEN, STAR
      [12, 13, 2, 2], // YELLOW, MOON
    ]
  },
};

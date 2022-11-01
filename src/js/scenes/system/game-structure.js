import Utils from "../../api/utils";

const CHUNK_SIZE = 8;

export const BOARD_CHUNKS = {
  BLUE: [
    {
      WALLS: [
				0b1001, 0b1000, 0b1000, 0b1000, 0b1000, 0b1010, 0b1001, 0b1000,
				0b0001, 0b0000, 0b0000, 0b0100, 0b0000, 0b0000, 0b0000, 0b0000,
				0b0001, 0b0000, 0b0010, 0b1001, 0b0000, 0b0000, 0b0000, 0b0000,
				0b0101, 0b0000, 0b0100, 0b0000, 0b0010, 0b0101, 0b0000, 0b0000,
				0b1001, 0b0000, 0b1010, 0b0001, 0b0000, 0b1000, 0b0000, 0b0000,
				0b0001, 0b0000, 0b0000, 0b0000, 0b0110, 0b0001, 0b0000, 0b0000,
				0b0001, 0b0000, 0b0000, 0b0000, 0b1000, 0b0000, 0b0000, 0b0100,
				0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0010, 0b0000,
      ],
      GEMS: [
        [3, 2, 2, 2], // YELLOW, MOON
        [5, 3, 0, 1], // BLUE, TRIANGLE
        [2, 4, 3, 3], // RED, PLANET
        [4, 5, 1, 0], // GREEN, STAR
      ],
    },
    {
      WALLS: [
        0b1001, 0b1000, 0b1000, 0b1000, 0b1000, 0b1000, 0b1000, 0b1000,
        0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000,
        0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000,
        0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000,
        0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000,
        0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000,
        0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0100,
        0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0010, 0b0000,
      ],
      GEMS: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    },
    {
      WALLS: [
        0b1001, 0b1000, 0b1000, 0b1000, 0b1000, 0b1000, 0b1000, 0b1000,
        0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000,
        0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000,
        0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000,
        0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000,
        0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000,
        0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0100,
        0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0010, 0b0000,
      ],
      GEMS: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    },
  ],
	GREEN: [
    {
      WALLS: [
				0b1001, 0b1010, 0b1001, 0b1100, 0b1000, 0b1000, 0b1000, 0b1000,
				0b0001, 0b0000, 0b0010, 0b1001, 0b0000, 0b0000, 0b0000, 0b0000,
				0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000,
				0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0110, 0b0001,
				0b0011, 0b0101, 0b0000, 0b0000, 0b0000, 0b0000, 0b1000, 0b0000,
				0b0001, 0b1000, 0b0000, 0b0000, 0b0100, 0b0000, 0b0000, 0b0000,
				0b0101, 0b0000, 0b0000, 0b0000, 0b1010, 0b0001, 0b0000, 0b0100,
				0b1001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0010, 0b0000,
      ],
      GEMS: [
        [3, 1, 1, 1], // GREEN, SUN
        [6, 3, 2, 0], // YELLOW, STAR
        [1, 4, 3, 2], // RED, MOON
        [4, 6, 0, 3], // BLUE, PLANET
      ],
    },
    {
      WALLS: [
        0b1001, 0b1000, 0b1000, 0b1000, 0b1000, 0b1000, 0b1000, 0b1000,
        0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000,
        0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000,
        0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000,
        0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000,
        0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000,
        0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0100,
        0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0010, 0b0000,
      ],
      GEMS: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    },
    {
      WALLS: [
        0b1001, 0b1000, 0b1000, 0b1000, 0b1000, 0b1000, 0b1000, 0b1000,
        0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000,
        0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000,
        0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000,
        0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000,
        0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000,
        0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0100,
        0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0010, 0b0000,
      ],
      GEMS: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    },
  ],
	YELLOW: [
    {
      WALLS: [
				0b1001, 0b1000, 0b1010, 0b1001, 0b1000, 0b1000, 0b1000, 0b1000,
				0b0001, 0b0000, 0b0000, 0b0000, 0b0010, 0b0101, 0b0000, 0b0000,
				0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b1000, 0b0000, 0b0110,
				0b0101, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b1000,
				0b1001, 0b0000, 0b0000, 0b0110, 0b0001, 0b0000, 0b0000, 0b0000,
				0b0001, 0b0100, 0b0000, 0b1000, 0b0000, 0b0010, 0b1001, 0b0000,
				0b0001, 0b1010, 0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0100,
				0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0010, 0b0000,
      ],
      GEMS: [
        [5, 1, 0, 2], // BLUE, MOON
        [7, 2, 5, 4], // RAINBOW, SPIRAL
        [3, 4, 3, 0], // RED, STAR
        [6, 5, 1, 3], // GREEN, PLANET
        [1, 6, 2, 1], // YELLOW, SUN
      ],
    },
    {
      WALLS: [
        0b1001, 0b1000, 0b1000, 0b1000, 0b1000, 0b1000, 0b1000, 0b1000,
        0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000,
        0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000,
        0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000,
        0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000,
        0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000,
        0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0100,
        0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0010, 0b0000,
      ],
      GEMS: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    },
    {
      WALLS: [
        0b1001, 0b1000, 0b1000, 0b1000, 0b1000, 0b1000, 0b1000, 0b1000,
        0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000,
        0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000,
        0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000,
        0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000,
        0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000,
        0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0100,
        0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0010, 0b0000,
      ],
      GEMS: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    },
  ],
  RED: [
    {
      WALLS: [
				0b1001, 0b1010, 0b1001, 0b1000, 0b1100, 0b1000, 0b1000, 0b1000,
				0b0001, 0b0000, 0b0000, 0b0000, 0b1010, 0b0001, 0b0000, 0b0000,
				0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000,
				0b0011, 0b0101, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000,
				0b0001, 0b1000, 0b0000, 0b0000, 0b0000, 0b0100, 0b0000, 0b0000,
				0b0101, 0b0000, 0b0000, 0b0000, 0b0010, 0b1001, 0b0000, 0b0000,
				0b1001, 0b0000, 0b0000, 0b0110, 0b0001, 0b0000, 0b0000, 0b0100,
				0b0001, 0b0000, 0b0000, 0b1000, 0b0000, 0b0000, 0b0010, 0b0000,
      ],
      GEMS: [
        [4, 1, 1, 2], // GREEN, MOON
        [1, 3, 3, 1], // RED, SUN
        [5, 5, 2, 3], // YELLOW, PLANET
        [3, 6, 0, 0], // BLUE, STAR
      ],
    },
    {
      WALLS: [
        0b1001, 0b1000, 0b1000, 0b1000, 0b1000, 0b1000, 0b1000, 0b1000,
        0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000,
        0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000,
        0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000,
        0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000,
        0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000,
        0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0100,
        0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0010, 0b0000,
      ],
      GEMS: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    },
    {
      WALLS: [
        0b1001, 0b1000, 0b1000, 0b1000, 0b1000, 0b1000, 0b1000, 0b1000,
        0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000,
        0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000,
        0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000,
        0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000,
        0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000,
        0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0100,
        0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0010, 0b0000,
      ],
      GEMS: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    },
  ],
};

// EMPTY
// WALLS: [
//   0b1001, 0b1000, 0b1000, 0b1000, 0b1000, 0b1000, 0b1000, 0b1000,
//   0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000,
//   0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000,
//   0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000,
//   0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000,
//   0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000,
//   0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0100,
//   0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0010, 0b0000,
// ],
// GEMS: [
//   [0, 0, 0, 0],
//   [0, 0, 0, 0],
//   [0, 0, 0, 0],
//   [0, 0, 0, 0],
// ],
const ROTATE_WALLS_MAP = [
  // Clockwise
  {
    8: 0b0001, // 1000
    4: 0b0010, // 0100
    2: 0b1000, // 0010
    1: 0b0100, // 0001
  },
  {
    8: 0b0010, // 1000
    4: 0b0001, // 0100
    2: 0b0100, // 0010
    1: 0b1000, // 0001
  },
  // Counter clockwise
];

function rotateValue(x, y, clockwise = true) {
  const rotatedValues = new Phaser.Math.Vector2();
	if (clockwise) rotatedValues.set(CHUNK_SIZE - y - 1, x)
	else rotatedValues.set(y, CHUNK_SIZE - x - 1);
	return rotatedValues;
}
function rotateValues(values, clockwise = true) {
  return values.map((el) => {
    const rotatedValue = rotateValue(el[0], el[1], clockwise);
    el[0] = rotatedValue.x;
    el[1] = rotatedValue.y;
    return el;
  });
}
const TEMP_POINT = new Phaser.Math.Vector2();
function getXY(i) {
  return TEMP_POINT.set(i % 8, Math.floor(i / 8));
}
function getIndex(x, y) {
  return x + y * 8;
}

function rotateMatrix(matrix, clockwise = true) {
  const rotatedMatrix = [];
  const n = 8;
  for (let i = 0; i < 64; i++) {
      // rotate chunk
      const {x, y} = getXY(i);
      if (clockwise) {
        rotatedMatrix[i] = matrix[getIndex(y, n - x - 1)];
      } else {
        rotatedMatrix[i] = matrix[getIndex(n - y - 1, x)];
      }

      // rotate tile walls
      if (rotatedMatrix[i] != 0) {
        let newValue = 0;
        for (let n = 0; n < 4; n++) {
          const isSet = Utils.bitTest(rotatedMatrix[i], 1 << n);
          // console.log('bit test: word=' + rotatedMatrix[i] + ' n=' + n + ' result:' + isSet);
          if (isSet) {
            // newValue = Utils.bitSet(newValue, ROTATE_WALLS_MAP[clockwise ? 1 : 0][1 << n]);
            newValue |= ROTATE_WALLS_MAP[clockwise ? 1 : 0][1 << n];
          }
        }
        rotatedMatrix[i] = newValue;
      }
    }

  return rotatedMatrix;
}

function joinChunksHorizontally(chunk1, chunk2) {
	let chunk = [];
	for (let i = 0; i < chunk1.length; i += CHUNK_SIZE) {
    // Update joints with wall data
    if (Utils.bitTest(chunk1[i + CHUNK_SIZE - 1], 1 << 1))
      chunk2[i] |= 1 << 0;
    else if (Utils.bitTest(chunk2[i], 1 << 0))
      chunk1[i + CHUNK_SIZE - 1] |= 1 << 1;

    chunk = chunk.concat(chunk1.slice(i, i + CHUNK_SIZE), chunk2.slice(i, i + CHUNK_SIZE));
	}
	return chunk;
}

function joinChunksVertically(chunk1, chunk2) {
  const topChunk = chunk1.slice();
  const bottomChunk = chunk2.slice();
  // Update joints with wall data
  for (let i = 0; i < CHUNK_SIZE * 2; i++) {
    if (i === 7 || i === 8) continue;
    else if (Utils.bitTest(topChunk[topChunk.length - CHUNK_SIZE * 2 + i], 1 << 2))
      bottomChunk[i] |= 1 << 3;
    else if (Utils.bitTest(bottomChunk[i], 1 << 3))
      topChunk[topChunk.length - CHUNK_SIZE * 2 + i] |= 1 << 2;
  }
	return topChunk.concat(bottomChunk);
}

function joinGemData(upLeft, upRight, downLeft, downRight) {
  const topLeft = upLeft.slice();
  
  const topRight = upRight.slice();
  topRight.forEach((el, i) => topRight[i][0] += 8);
  
  const bottomLeft = downLeft.slice();
  bottomLeft.forEach((el, i) => bottomLeft[i][1] += 8);
  
  const bottomRight = downRight.slice();
  bottomRight.forEach((el, i) => bottomRight[i][0] += 8);
  bottomRight.forEach((el, i) => bottomRight[i][1] += 8);

  const top = topLeft.concat(topRight);
  const bottom = bottomLeft.concat(bottomRight);

  console.log(topLeft, topRight, bottomLeft, bottomRight)

  return top.concat(bottom);
}

export function getBoard(parts) {
  const upLeft = {walls: parts[0].WALLS.slice(), gems: parts[0].GEMS.slice()};
  const upRight = {walls: rotateMatrix(parts[1].WALLS), gems: rotateValues(parts[1].GEMS)};
  const downLeft = {walls: rotateMatrix(parts[2].WALLS, false), gems: rotateValues(parts[2].GEMS, false)};
  const downRight = {walls: rotateMatrix(rotateMatrix(parts[3].WALLS)), gems: rotateValues(rotateValues(parts[3].GEMS))};
  
  const topWall = joinChunksHorizontally(upLeft.walls, upRight.walls);
  const bottomWall = joinChunksHorizontally(downLeft.walls, downRight.walls);

  return {walls: joinChunksVertically(topWall, bottomWall), gems: joinGemData(upLeft.gems, upRight.gems, downLeft.gems, downRight.gems)};
}

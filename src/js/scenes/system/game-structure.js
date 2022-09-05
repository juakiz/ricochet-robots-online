const CHUNK_SIZE = 8;

function bitTest(word, mask){
  return (word & mask) != 0;
}

function bitSet(word, mask){
  word |= mask;
}

function bitClear(word, mask){
  word &= ~mask;
}

function bitToggle(word, mask){
   word ^= mask;
}

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
  ],
	GREEN: [
    {
      WALLS: [
				0b1001, 0b1010, 0b1001, 0b1100, 0b1000, 0b1000, 0b1000, 0b1000,
				0b0001, 0b0000, 0b0010, 0b1001, 0b0000, 0b0000, 0b0000, 0b0000,
				0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000,
				0b0001, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0110, 0b0001,
				0b0011, 0b0101, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000, 0b0000,
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
  ],
};

// EMPTY
// 1001, 1000, 1000, 1000, 1000, 1000, 1000, 1000,
// 0001, 0000, 0000, 0000, 0000, 0000, 0000, 0000,
// 0001, 0000, 0000, 0000, 0000, 0000, 0000, 0000,
// 0001, 0000, 0000, 0000, 0000, 0000, 0000, 0000,
// 0001, 0000, 0000, 0000, 0000, 0000, 0000, 0000,
// 0001, 0000, 0000, 0000, 0000, 0000, 0000, 0000,
// 0001, 0000, 0000, 0000, 0000, 0000, 0000, 0100,
// 0001, 0000, 0000, 0000, 0000, 0000, 0010, 0000,

function rotateValues(x, y, clockwise = true) {
  const rotatedValues = new Phaser.Math.Vector2();
	if (clockwise) rotatedValues.set(CHUNK_SIZE - y - 1, x)
	else rotatedValues.set(y, CHUNK_SIZE - x - 1);
	return rotatedValues;
}
const TEMP_POINT = new Phaser.Math.Vector2();
function getXY(i) {
  return TEMP_POINT.set(i % 8, Math.floor(i / 8));
}
function getIndex(x, y) {
  return x + y * 8;
}

function rotateMatrix(matrix, clockwise) {
  // const rotatedMatrix = [];
  // const n = matrix.length;
  // for (let i = 0; i < n; ++i) {
  //   rotatedMatrix[i] = [];
  //   for (let j = 0; j < n; ++j) {
  //     // Fix this because we use one dimensional arrays
  //     if (clockwise) rotatedMatrix[i][j] = matrix[n - j - 1][i];
  //     else rotatedMatrix[i][j] = matrix[j][n - i - 1];
  //   }
  // }
  const rotatedMatrix = [];
  const n = 8;
    for (let i = 0; i < 64; i++) {
      const {x, y} = getXY(i);
      if (clockwise) rotatedMatrix[i] = matrix[getIndex(n - y - 1, x)];
      else rotatedMatrix[i] = matrix[getIndex(y, n - x - 1)];
    }

  return rotatedMatrix;
}

function joinChunksHorizontally(chunk1, chunk2) {
	let chunk = [];
	for (let i = 0; i < chunk1.length; i += CHUNK_SIZE) {
    chunk = chunk.concat(chunk1.slice(i, i + CHUNK_SIZE), chunk2.slice(i, i + CHUNK_SIZE));
			// Update joints with wall data
      if (bitTest(chunk1[i + CHUNK_SIZE - 1], 1 << 2)) bitSet(chunk2[i], 1 << 3);
      else if (bitTest(chunk2[i], 1 << 3)) bitSet(chunk1[i + CHUNK_SIZE - 1], 1 << 2);
	}
	return chunk;
}

function joinChunksVertically(chunk1, chunk2) {
  const topChunk = chunk1.slice();
  const bottomChunk = chunk2.slice();
  // Update joints with wall data
  for (let i = 0; i < CHUNK_SIZE * 2; i++) {
    if (i === 7 || i === 8) continue;
    else if (bitTest(topChunk[topChunk.length - (CHUNK_SIZE * 2 + i)], 1 << 1)) bitSet(bottomChunk[i], 1 << 0);
    else if (bitTest(bottomChunk[i], 1 << 0)) bitSet(topChunk[topChunk.length - (CHUNK_SIZE * 2 + i)], 1 << 1);
  }
	return topChunk.concat(bottomChunk);
}

// TODO: 'join' gem data also

export function getBoard(parts) {
  const upLeft = parts[0].slice();
  const upRight = rotateMatrix(parts[1]);
  const downLeft = rotateMatrix(parts[2], false);
  const rotatedOnce = rotateMatrix(parts[3]);
  const downRight = rotateMatrix(rotatedOnce);
  
  const top = joinChunksHorizontally(upLeft, upRight);
  const bottom = joinChunksHorizontally(downLeft, downRight);
  const boardSetup = joinChunksVertically(top, bottom);

  return boardSetup;
}

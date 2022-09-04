export const BOARD_CHUNKS = {
  BLUE: [
    {
      WALLS: [
				1001, 1000, 1000, 1000, 1000, 1010, 1001, 1000,
				0001, 0000, 0000, 0100, 0000, 0000, 0000, 0000,
				0001, 0000, 0010, 1001, 0000, 0000, 0000, 0000,
				0101, 0000, 0100, 0000, 0010, 0101, 0000, 0000,
				1001, 0000, 1010, 0001, 0000, 1000, 0000, 0000,
				0001, 0000, 0000, 0000, 0110, 0001, 0000, 0000,
				0001, 0000, 0000, 0000, 1000, 0000, 0000, 0100,
				0001, 0000, 0000, 0000, 0000, 0000, 0010, 0000,
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
				1001, 1010, 1001, 1100, 1000, 1000, 1000, 1000,
				0001, 0000, 0010, 1001, 0000, 0000, 0000, 0000,
				0001, 0000, 0000, 0000, 0000, 0000, 0000, 0000,
				0001, 0000, 0000, 0000, 0000, 0000, 0110, 0001,
				0011, 0101, 0000, 0000, 0000, 0000, 0000, 0000,
				0001, 1000, 0000, 0000, 0100, 0000, 0000, 0000,
				0101, 0000, 0000, 0000, 1010, 0001, 0000, 0100,
				1001, 0000, 0000, 0000, 0000, 0000, 0010, 0000,
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
				1001, 1000, 1010, 1001, 1000, 1000, 1000, 1000,
				0001, 0000, 0000, 0000, 0010, 0101, 0000, 0000,
				0001, 0000, 0000, 0000, 0000, 1000, 0000, 0110,
				0101, 0000, 0000, 0000, 0000, 0000, 0000, 1000,
				1001, 0000, 0000, 0110, 0001, 0000, 0000, 0000,
				0001, 0100, 0000, 1000, 0000, 0010, 1001, 0000,
				0001, 1010, 0001, 0000, 0000, 0000, 0000, 0100,
				0001, 0000, 0000, 0000, 0000, 0000, 0010, 0000,
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
				1001, 1010, 1001, 1000, 1100, 1000, 1000, 1000,
				0001, 0000, 0000, 0000, 1010, 0001, 0000, 0000,
				0001, 0000, 0000, 0000, 0000, 0000, 0000, 0000,
				0011, 0101, 0000, 0000, 0000, 0000, 0000, 0000,
				0001, 1000, 0000, 0000, 0000, 0100, 0000, 0000,
				0101, 0000, 0000, 0000, 0010, 1001, 0000, 0000,
				1001, 0000, 0000, 0110, 0001, 0000, 0000, 0100,
				0001, 0000, 0000, 1000, 0000, 0000, 0010, 0000,
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

function rotateValues(x, y, length, clockwise = true) {
	const rotatedValues = {};
	if (clockwise) {
		rotatedValues.x = length - y - 1;
		rotatedValues.y = x;
	}	else {
		rotatedValues.x = y;
		rotatedValues.y = length - x - 1;
	}
	return rotatedValues;
}

function rotateMatrix(matrix, clockwise) {
  const rotatedMatrix = [];
  const n = matrix.length;
  for (let i = 0; i < n; ++i) {
    rotatedMatrix[i] = [];
    for (let j = 0; j < n; ++j) {
      if (clockwise) rotatedMatrix[i][j] = matrix[n - j - 1][i];
      else rotatedMatrix[i][j] = matrix[j][n - i - 1];
    }
  }
  return rotatedMatrix;
}

function joinChunksHorizontally(chunk1, chunk2, length) {
	const chunk = [];
	const length = 10;
	for (let i = 0; i < chunk1.length; i += length) {
			chunk.push(chunk1.slice(i, i + length), chunk2.slice(i, i + length));
			// TODO: Update joints with wall data
	}
	return chunk;
}

// TODO: join chunks vertically and update its joints with wall data
// TODO: 'join' gem data also

export function getBoard(parts) {
  const boardSetup = [];

  return boardSetup;
}

import Utils from "../../api/utils";
import { getBoard, BOARD_CHUNKS } from "./game-structure";

const MASK_MAP = {
    N: 0b1000,
    S: 0b0100,
    E: 0b0010,
    W: 0b0001,
    P: 0b10000,
};

class Rules {
    constructor() {
        this.board = getBoard([BOARD_CHUNKS.BLUE[0], BOARD_CHUNKS.GREEN[0], BOARD_CHUNKS.YELLOW[0], BOARD_CHUNKS.RED[0]]);
        this.chips = this.board.gems.slice();
        this.pieces = [
            0, // 'blue',
            17, // 'green',
            2, // 'yellow',
            3, // 'red',
            4, // 'silver',
        ];
        this.pieces.forEach(index => this.board.walls[index] |= MASK_MAP.P);

        this.randomizePiecesPosition();
    }

    randomizePiecesPosition() {
        this.pieces.length = 0;
        let index;
        for (let i = 0; i < 5; i++) {
            do {
                index = Math.floor(Math.random() * 256);
            } while (!this.isEmptyTile(index));
            if (this.pieces[i] != null)
                this.board.walls[this.pieces[i]]  &= ~MASK_MAP.P;
            this.pieces[i] = index;
            this.board.walls[index] |= MASK_MAP.P;
        }
    }

    isEmptyTile(index) {
        return !this.isMiddleTile(index) && !this.isPieceTile(index);
    }

    isMiddleTile(index) {
        return index === 119 || index === 120 || index === 135 || index === 136;
    }

    isPieceTile(index) {
        return Utils.bitTest(this.board.walls[index], MASK_MAP.P);
    }

    isValidPosition(pieceIndex, index) {
        return this.getValidPositions(pieceIndex).includes(index);
    }

    getValidPositions(pieceIndex) {
        const index = this.pieces[pieceIndex];
        const validPositions = [
            null, // up
            null, // down
            null, // right
            null, // left
        ];

        let count;
        count = 0;
        while (!this.isWallBlocking(index - 16 * count, MASK_MAP.N) && !this.isPieceTile(index - 16 * (count + 1)))
            validPositions[0] = index - 16 * ++count;
        count = 0;
        while (!this.isWallBlocking(index + 16 * count, MASK_MAP.S) && !this.isPieceTile(index + 16 * (count + 1)))
            validPositions[1] = index + 16 * ++count;
        count = 0;
        while (!this.isWallBlocking(index - count, MASK_MAP.W) && !this.isPieceTile(index - (count + 1)))
            validPositions[2] = index - ++count;
        count = 0;
        while (!this.isWallBlocking(index + count, MASK_MAP.E) && !this.isPieceTile(index + (count + 1)))
            validPositions[3] = index + ++count;

        return validPositions;
    }

    isWallBlocking(index, direction) {
        return Utils.bitTest(this.board.walls[index], direction);
    }

    getCoordinates(index) {
        return [Math.trunc(index / 16), index % 16];
    }

    movePiece(pieceIndex, to) {
        this.board.walls[this.pieces[pieceIndex]] &= ~MASK_MAP.P;
        this.board.walls[to] |= MASK_MAP.P;
        this.pieces[pieceIndex] = to;
    }
}

export default new Rules();

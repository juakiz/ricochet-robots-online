import { getBoard, BOARD_CHUNKS } from "./game-structure";

class Rules {
    constructor() {
        this.board = getBoard([BOARD_CHUNKS.BLUE[0], BOARD_CHUNKS.GREEN[0], BOARD_CHUNKS.YELLOW[0], BOARD_CHUNKS.RED[0]]);
        this.pieces = [];
        
        this.randomizePieces();
    }

    randomizePieces() {
        this.pieces.length = 0;
        let col, row;
        for (let i = 0; i < 5; i++) {
            do {
                col = Math.floor(Math.random() * 16), row = Math.floor(Math.random() * 16);
            } while (!this.isEmptyTile(col, row));
            this.pieces.push([col, row]);
        }
    }

    isEmptyTile(col, row) {
        return !this.isMiddleTile(col, row) && !this.isPieceTile(col, row);
    }

    isMiddleTile(col, row) {
        return (col === 7 || col === 8) && (row === 7 || row === 8);
    }

    isPieceTile(col, row) {
        return this.pieces.some(pieceData => pieceData[0] === col && pieceData[1] === row);
    }

    // isGemTile(col, row) {
    //     return this.board.gems.some(gemData => gemData[0] === col && gemData[1] === row);
    // }

    isValidPosition(pieceIndex, {col, row}) {
        // TODO: Check if landing in straight line, before a wall or another piece,
        // maybe add method to get all valid positions that can be used as hint
        return true;
    }
}

export default new Rules();

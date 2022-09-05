import { getBoard, BOARD_CHUNKS } from "./game-structure";

export const board = getBoard([BOARD_CHUNKS.BLUE[0].WALLS, BOARD_CHUNKS.GREEN[0].WALLS, BOARD_CHUNKS.YELLOW[0].WALLS, BOARD_CHUNKS.RED[0].WALLS]);

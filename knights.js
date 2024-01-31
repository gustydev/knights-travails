import { Node, Tree, sortArray } from "./node_modules/bst-gusty/bst.js";

function moves(coord) {
    let array = [coord]; // the knight staying in place is also a "move"
    array.push(
        [coord[0] - 2, coord[1] - 1],
        [coord[0] - 1, coord[1] - 2],
        [coord[0] - 2, coord[1] + 1],
        [coord[0] - 1, coord[1] + 2],
        [coord[0] + 2, coord[1] - 1],
        [coord[0] + 1, coord[1] - 2],
        [coord[0] + 2, coord[1] + 1],
        [coord[0] + 1, coord[1] + 2]
    )
    array.forEach((move) => {
        for (let i = 0; i < 2; i++) {
            if (move[i] < 0 || move[i] > 7) {
                array = array.filter(m => m != move);
            }
        }
    })
    return array.sort();
}

class Square {
    constructor(coord) {
        this.square = coord;
        this.moveArray = moves(this.square).filter(a => a !== coord);
    }
    length() {
        return this.moveArray.length;
    }
}

function knightMoves(startCoord, endCoord, paths = []) {
    const start = new Square(startCoord);
    // paths.push([start.square]);
    // for (let i = 0; i < start.length() - 1; i++) {
    //     let current = new Square(start[`move-${i+1}`])
    //     paths[i].push(current.square)
    // }
}

console.log(new Square([3,3]))
function getMoves(coord) {
    let array = [];
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
    // Removing moves that would go outside the board
    array.forEach((move) => {
        for (let i = 0; i < 2; i++) {
            if (move[i] < 0 || move[i] > 7) {
                array = array.filter(m => m != move);
            }
        }
    })
    return array;
}

class Square {
    constructor(coord, path) {
        this.square = coord;
        this.path = path;
        this.moves = getMoves(this.square)
    }
}

function knightTravails([x, y], [a, b]) {
    const start = new Square([x, y], [[x, y]]);
    let queue = [start];
    let current = queue.shift();
    while (current.square[0] !== a || current.square[1] !== b) {
        current.moves.forEach((move) => {
            let sq = new Square(move, current.path.concat([move]));
            queue.push(sq);
        })
        current = queue.shift();
    }
    console.log(`Shortest path from [${x}, ${y}] to [${a}, ${b}] (${current.path.length} moves):`)
    current.path.forEach((move) => {
        console.log(move)
    })
}
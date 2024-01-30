import { Node, Tree, sortArray } from "./node_modules/bst-gusty/bst.js";

function moves(coord) {
    let array = [coord]; // the knight staying in place is also a "move"
    array.push(
        [coord[0] + 2, coord[1] - 1],
        [coord[0] - 2, coord[1] -1],
        [coord[0] + 2, coord[1] + 1],
        [coord[0] - 2, coord[1] + 1]
    )
    array.forEach((move) => {
        let mirror = [...move].reverse();
        if (!JSON.stringify(array).includes(JSON.stringify(mirror))) {
            array.push(mirror)
        }
    })
    array.forEach((move) => {
        for (let i = 0; i < 2; i++) {
            if (move[i] < 0 || move[i] > 7) {
                array = array.filter(m => m != move);
            }
        }
    })
    return array;
}
console.log(moves([3,3]))
console.log(moves([7,7]))

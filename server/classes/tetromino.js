class Tetromino {
    constructor() {
        this.rotation = 0;
        this.shape = tetrominoes[Math.floor(Math.random() * tetrominoes.length)];
        this.posX = 4;
        this.posY = 0;
    }

    rotate() {
        this.rotation++;
        if (this.rotation >= this.shape.length) {
            this.rotation = 0;
        }
    }

    getShape() {
        return this.shape[this.rotation];
    }

    getX() {
        return this.posX;
    }

    getY() {
        return this.posY;
    }

    moveRight() {
        this.posX++;
    }

    moveLeft() {
        this.posX--;
    }

    moveDown() {
        this.posY++;
    }
}



const tl = [
    [
        [1],
        [1],
        [1],
        [1]],
    [
        [1, 1, 1, 1]]
];

const to = [
    [[2, 2],
    [2, 2]]
];

const ts = [
    [[0, 3, 3],
    [3, 3, 0]],
    [
        [3, 0],
        [3, 3],
        [0, 3]
    ]
];

const tz = [
    [
        [4, 4, 0],
        [0, 4, 4]],
    [
        [0, 4],
        [4, 4],
        [4, 0]]
];

const tt = [
    [
        [0, 5, 0],
        [5, 5, 5]],
    [
        [0, 5],
        [5, 5],
        [0, 5]
    ],
    [
        [5, 5, 5],
        [0, 5, 0]
    ],
    [
        [5, 0],
        [5, 5],
        [5, 0]
    ]
];

const tj = [
    [
        [6, 0, 0],
        [6, 6, 6],
    ],
    [
        [0, 6],
        [0, 6],
        [6, 6]
    ],
    [
        [6, 6, 6],
        [0, 0, 6]
    ],
    [
        [6, 6],
        [6, 0],
        [6, 0]
    ]
];

const tk = [
    [
        [0, 0, 7],
        [7, 7, 7]
    ],
    [
        [7, 7],
        [0, 7],
        [0, 7]
    ],
    [
        [7, 7, 7],
        [7, 0, 0]
    ],
    [
        [7, 0],
        [7, 0],
        [7, 7]
    ]
];

const tetrominoes = [tl, to, ts, tz, tt, tj, tk];

module.exports = Tetromino;
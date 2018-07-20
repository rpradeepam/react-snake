import React from 'react'
import { Cell } from './cell';

export class Board extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            snake: [[0, 3], [0, 2], [0, 1], [0, 0]]
        }
        this.BOARDSIZE = this.props.size;

        setInterval(() => {
            this.setState(previousState => {
                let newPos
                switch (this.props.direction) {
                    case 'u':
                        newPos = this.moveUp(previousState.snake[0])
                        break;
                    case 'd':
                        newPos = this.moveDown(previousState.snake[0])
                        break;
                    case 'l':
                        newPos = this.moveLeft(previousState.snake[0])
                        break;
                    case 'r':
                        newPos = this.moveRight(previousState.snake[0])
                        break;

                    default:
                        break;
                }
                let copy = previousState.snake.slice();
                copy.unshift(newPos);
                if (newPos[0] == this.props.rat[0] && newPos[1] == this.props.rat[1]) {
                    this.props.onEat();
                } else {
                    copy.pop();
                }

                return { snake: copy };
            });
        }, 100);


    }

    moveUp = ([x, y]) => [this.decrement(x), y];
    moveDown = ([x, y]) => [this.increment(x), y];
    moveLeft = ([x, y]) => [x, this.decrement(y)];
    moveRight = ([x, y]) => [x, this.increment(y)];

    increment = i => (i + 1) % this.BOARDSIZE;
    decrement = i => (i - 1 + this.BOARDSIZE) % this.BOARDSIZE;

    renderCell(cell, j) {
        return <Cell snake={cell} key={j} />;
    }


    render() {
        let board = []

        board = [...Array(this.BOARDSIZE)].map(() => Array(this.BOARDSIZE).fill(0))

        this.state.snake.forEach(cell => {
            board[cell[0]][cell[1]] = 1;
        });
        board[this.props.rat[0]][this.props.rat[1]] = 1;

        return (
            <div>
                {
                    board.map((row, i) =>
                        <div className="board-row" key={i}>
                            {row.map((cell, j) => this.renderCell(cell, j))}
                        </div>
                    )
                }
            </div>
        );
    }
}

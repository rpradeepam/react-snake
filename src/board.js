import React from 'react'
import { Cell } from './cell';

export class Board extends React.Component {
    constructor(props) {
        super(props)
        this.intervalId = null;
        this.reset = false;
        this.BOARDSIZE = this.props.size;


    }

    renderCell(cell, j) {
        return <Cell snake={cell} key={j} />;
    }

    getEmptyBoard() { return [...Array(this.BOARDSIZE)].map(() => Array(this.BOARDSIZE).fill(0)) }

    render() {
        let board = []

        board = this.getEmptyBoard()

        this.props.snake.forEach(cell => {
            board[cell[0]][cell[1]] = 1;
        });
        board[this.props.snake[0][0]][this.props.snake[0][1]] = 2;
        board[this.props.rat[0]][this.props.rat[1]] = 3;

        return (

            board.map((row, i) =>
                <div className="board-row" key={i}>
                    {row.map((cell, j) => this.renderCell(cell, j))}
                </div>
            )

        );
    }
}

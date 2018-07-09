import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Cell extends React.Component {
    render() {
        return (
            <div className={this.props.snake ? "cell snake" : 'cell'}>
                {/* TODO */}
            </div>
        );
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            snake: [[0, 1]]
        }
        this.BOARDSIZE = 10;

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

                return { snake: [newPos] };
            });
        }, 1000);


    }

    moveUp = ([x, y]) => [this.decrement(x), y];
    moveDown = ([x, y]) => [this.increment(x), y];
    moveLeft = ([x, y]) => [x, this.decrement(y)];
    moveRight = ([x, y]) => [x, this.increment(y)];

    increment = i => (i + 1) % this.BOARDSIZE;
    decrement = i => (i - 1 + this.BOARDSIZE) % this.BOARDSIZE;

    renderCell(cell) {
        return <Cell snake={cell} />;
    }


    render() {
        let board = []

        board = [...Array(this.BOARDSIZE)].map(() => Array(this.BOARDSIZE).fill(0))

        this.state.snake.forEach(cell => {
            board[cell[0]][cell[1]] = 1;
        });

        return (
            <div>
                {
                    board.map((row) =>
                        <div className="board-row">
                            {row.map((cell) => this.renderCell(cell))}
                        </div>
                    )
                }
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            direction: 'r'
        }
    }

    _handleKeyPress(event) {
        let dir;
        switch (event.keyCode) {
            case 37:
                dir = 'l'
                break;
            case 38:
                dir = 'u'
                break;
            case 39:
                dir = 'r'
                break;
            case 40:
                dir = 'd'
                break;
            default:
                break;
        }
        if (dir) {
            console.log(dir)
            this.setState({ direction: dir })
        }
    }
    componentDidMount() {
        document.addEventListener("keydown", this._handleKeyPress.bind(this), false);
    }



    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board direction={this.state.direction} />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}



ReactDOM.render(<Game />, document.getElementById('root'));

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Board } from './board';


class Game extends React.Component {
    constructor(props) {
        super(props)
        this.BOARDSIZE = 20
        this.tail = null
        this.state = {
            direction: 'r',
            snake: [[0, 3], [0, 2], [0, 1], [0, 0]],
            score: 0,
            gameOver: false,
            rat: this.placeRat()
        }
        this.handleEat = this.handleEat.bind(this)
        this.handleCollide = this.handleCollide.bind(this)
        this._handleReset = this._handleReset.bind(this)
        this._start = this._start.bind(this)

        this._start();
    }

    _start() {
        this.setState({
            direction: 'r',
            snake: [[0, 3], [0, 2], [0, 1], [0, 0]],
            rat: this.placeRat(),
            gameOver: false,
            score: 0
        })
        this.intervalId = setInterval(() => {
            this.step();
        }, 200);
    }

    componentDidUpdate(prevProps) {
        let collide = this.state.snake.find((cell, i) => i !== 0 && this.state.snake[0][0] === cell[0] && this.state.snake[0][1] === cell[1])
        if (collide && !this.state.gameOver) {
            this.handleCollide()
        }
        if (this.state.snake[0][0] === this.state.rat[0] && this.state.snake[0][1] === this.state.rat[1]) {
            this.handleEat()
        }
    }

    step() {
        this.setState(previousState => {
            let newPos
            switch (this.state.direction) {
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
            this.tail = copy.pop();

            return { snake: copy };
        });
    }

    moveUp = ([x, y]) => [this.decrement(x), y];
    moveDown = ([x, y]) => [this.increment(x), y];
    moveLeft = ([x, y]) => [x, this.decrement(y)];
    moveRight = ([x, y]) => [x, this.increment(y)];

    increment = i => (i + 1) % this.BOARDSIZE;
    decrement = i => (i - 1 + this.BOARDSIZE) % this.BOARDSIZE;

    placeRat() {
        let rnd = () => Math.floor(Math.random() * this.BOARDSIZE);
        return [rnd(), rnd()]
    }

    handleEat() {
        //  window.navigator.vibrate(100);
        this.setState(previousState => {
            let copy = previousState.snake.slice();
            copy.push(this.tail);
            return {
                score: ++previousState.score,
                rat: this.placeRat(),
                snake: copy
            }
        })
    }

    handleCollide() {

        console.log(this.intervalId)
        // window.navigator.vibrate(200);
        clearInterval(this.intervalId)
        this.setState({
            gameOver: true
        })
    }

    _handleReset() {
        this._start()
    }

    _handleKeyPress(event) {
        let dir;
        switch (event.keyCode) {
            case 37:
                if (this.state.direction !== 'r')
                    dir = 'l'
                break;
            case 38:
                if (this.state.direction !== 'd')
                    dir = 'u'
                break;
            case 39:
                if (this.state.direction !== 'l')
                    dir = 'r'
                break;
            case 40:
                if (this.state.direction !== 'u')
                    dir = 'd'
                break;
            default:
                break;
        }
        if (dir) {
            this.setState({ direction: dir })
        }
    }
    componentDidMount() {
        document.addEventListener("keydown", this._handleKeyPress.bind(this), false);
    }



    render() {
        let score = 'Score:' + this.state.score

        return (
            <div className="game">
                <div className="game-board">
                    <Board direction={this.state.direction}
                        size={this.BOARDSIZE}
                        snake={this.state.snake}
                        rat={this.state.rat}
                        gameOver={this.state.gameOver}
                        onEat={this.handleEat}
                        onCollide={this.handleCollide} />
                </div>
                <div className="game-info">
                    <div>{score}</div>
                    <div><button hidden={!this.state.gameOver} onClick={this._handleReset}>Reset</button></div>
                </div>
            </div>
        );
    }
}



ReactDOM.render(<Game />, document.getElementById('root'));

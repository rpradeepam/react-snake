import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Board } from './board';


class Game extends React.Component {
    constructor(props) {
        super(props)
        this.BOARDSIZE = 40
        this.state = {
            direction: 'r',
            score: 0,
            gameOver: false,
            rat: this.placeRat()
        }
        this.handleEat = this.handleEat.bind(this)
        this.handleCollide = this.handleCollide.bind(this)
        this._handleReset = this._handleReset.bind(this)
    }

    placeRat() {
        let rnd = () => Math.floor(Math.random() * this.BOARDSIZE);
        return [rnd(), rnd()]
    }

    handleEat() {
        window.navigator.vibrate(100);
        this.setState(previousState => {
            return {
                score: ++previousState.score,
                rat: this.placeRat()
            }
        })
    }

    handleCollide() {
        window.navigator.vibrate(200);
        this.setState(previousState => {
            return {
                gameOver: true
            }
        })
    }

    _handleReset() {
        this.setState(previousState => {
            return {
                gameOver: false,
                score: 0
            }
        })
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

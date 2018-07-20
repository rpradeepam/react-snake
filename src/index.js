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
            rat: this.placeRat()
        }

    }

    placeRat() {
        let rnd = () => Math.floor(Math.random() * this.BOARDSIZE);
        return [rnd(), rnd()]
    }

    handleEat() {
        this.setState({ rat: this.placeRat() })
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
                    <Board direction={this.state.direction} size={this.BOARDSIZE} rat={this.state.rat} onEat={this.handleEat.bind(this)} />
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

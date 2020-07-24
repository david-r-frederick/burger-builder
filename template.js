import React, { Component, Fragment } from 'react';

// const x = props => {

// }

// // class y extends Component {
// //     state = {

// //     }

// //     render() {
// //         return (
// //             <Fragment>

// //             </Fragment>
// //         )
// //     }
// // }

// export default x;
// // export default y;

class Square extends React.Component {
    render() {
        return (
            <button className="square" onClick={this.props.clicked}>
                {this.props.value}
            </button>
        );
    }
}
//////////////////////////////////////
class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                clicked={() => this.props.clicked(i)}
            />
        );
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}
/////////////////////////////////////
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPlayerX: true,
            squares: Array(9).fill(null),
            winner: null,
        };
    }

    handleClick(ind) {
        if (this.state.squares.every((el) => el !== null)) {
            return;
        }

        this.setState({
            squares: this.state.squares.map((el, index) => {
                if (index === ind) {
                    if (this.state.squares[ind] !== null) {
                        return el;
                    } else {
                        this.setState({
                            currentPlayerX: !this.state.currentPlayerX,
                        });
                        return this.state.currentPlayerX ? 'X' : 'O';
                    }
                } else {
                    return el;
                }
            }),
        });
        let xCount = 0;
        let oCount = 0;
        for (let i = 0; i < this.state.squares.length; i++) {
            if (this.state.squares[i] === 'X') {
                xCount++;
            }
            if (this.state.squares[i] === 'O') {
                oCount++;
            }
        }
        const wins = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        if (xCount >= 3) {
            const currentXValueIndexes = this.state.squares
                .map((el, i) => {
                    return el === 'X' ? i : 'O';
                })
                .filter((el) => {
                    return el !== 'O';
                });
            for (let i = 0; i < wins.length; i++) {
                if (
                    currentXValueIndexes.includes(wins[i][0]) &&
                    currentXValueIndexes.includes(wins[i][1]) &&
                    currentXValueIndexes.includes(wins[i][2])
                ) {
                    this.setState({ winner: 'X' });
                    console.log('the winner is X');
                }
            }
        }
        if (oCount >= 3) {
            const currentOValueIndexes = this.state.squares
                .map((el, i) => {
                    return el === 'O' ? i : 'X';
                })
                .filter((el) => {
                    return el !== 'X';
                });
            for (let i = 0; i < wins.length; i++) {
                if (
                    currentOValueIndexes.includes(wins[i][0]) &&
                    currentOValueIndexes.includes(wins[i][1]) &&
                    currentOValueIndexes.includes(wins[i][2])
                ) {
                    this.setState({ winner: 'O' });
                    console.log('the winner is O');
                }
            }
        }

        if (this.state.winner) {
            console.log('there is a winner');
        }
    }

    render() {
        let winStatement = <p>{this.state.winner}</p>;

        return (
            <div className="game">
                <div className="game-board">
                    {winStatement}
                    <Board
                        clicked={(ix) => this.handleClick(ix)}
                        squares={this.state.squares}
                    />
                </div>
                <div className="game-info">
                    <div>
                        The current player is{' '}
                        {this.state.currentPlayerX ? 'X' : 'O'}
                    </div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

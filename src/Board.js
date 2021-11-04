import React, { Component } from "react";
import Cell from "./Cell";
import './Board.css';

class Board extends Component {

  static defaultProps = {
    ncols: 5,
    nrows: 5,
    chanceOfLightsOn: 0.25
  }

  constructor(props) {
    super(props);
    this.state = {
      hasWon: false,
      board: this.createBoard()
    };
  }

  createBoard() {
    let board = [];
    for (let i = 0; i < this.props.nrows; i++) {
      let row = [];
      for (let j = 0; j < this.props.ncols; j++) {
        row.push(Math.random() < this.props.chanceOfLightsOn);
      }
      board.push(row);
    }
    return board
  }


  flipCellsAround(coord) {
    let { ncols, nrows } = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }
    // flip initial cell
    flipCell(y, x);
    // flip neighbour cells
    for (var i = y - 1; i <= y + 1 && i < 8; i++) {
      if (i < 0) continue;
      for (var j = x - 1; j <= x + 1 && j < 8; j++) {
        if (j < 0 || (i === y && j === x)) continue;
        flipCell(i, j);
      }
    }
    let hasWon = board.every(row => row.every(cell => !cell));

    this.setState({ board, hasWon: hasWon });
  }

  render() {
    if (this.state.hasWon) return (<div><h1><span className="neon-orange">YOU</span><span className="neon-blue"> Won!!!</span></h1></div>)
    let tblBoard = [];
    for (let i = 0; i < this.props.nrows; i++) {
      let row = [];
      for (let j = 0; j < this.props.ncols; j++) {
        let coord = `${i}-${j}`
        row.push(<Cell
          key={coord}
          isLit={this.state.board[i][j]}
          flipCellsAroundMe={() => {
            this.flipCellsAround(coord)
          }} />)
      }
      tblBoard.push(<tr>{row}</tr>)
    }
    return (
      <div>
        <h1><span className="neon-orange">Lights</span><span className="neon-blue">Out</span></h1>
        <table className="Board">
          <tbody>
            {tblBoard}
          </tbody>
        </table>
      </div>
    )
  }
}


export default Board;

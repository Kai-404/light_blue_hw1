import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

import "./Game.css";

class Game extends React.Component {
  /* required functions:
  board
  state:
    boardstate
    turnstate
  handleMoving
  copy of board state
  if a move made, return state
  set state of board
  set state of turn
  ifValidMove()
  determine winingState/winner
  */
  constructor(props) {
    super(props);
    this.state = {
      FIRST_SELECT: null,
      //board will be load from the back end as a list/array
      board: Array(100).fill(";)"),
      PlayerAStat: {
        Marshall: 1,
        General: 1,
        Colonels: 2,
        Majors: 3,
        Captains: 4,
        Lieutenants: 4,
        Sergeants: 4,
        Miners: 3,
        Scouts: 8,
        Spy: 1,
        Bombs: 6,
        Flag: 1
      },
      winner: null
    };
  }

  componentDidMount() {
    //get init game data from spring boot
    axios
      .get("http://localhost:8080/game/init")
      .then(res => this.setState({ board: res.data }));
  }

  //by clicking the play button, react will send back the finalized board to spring,
  //then user are able to start the game
  playGame = () => {};
  setupGame = () => {};
  surrender = () => {};

  //at most 2 buttons can be selected, and check if second is a valid move
  //if not, unclick 2nd
  //if valid, swap value according to index.
  swap(index) {
    if (this.state.FIRST_SELECT != null) {
      let A = this.state.board[index];
      this.state.board[index] = this.state.board[this.state.FIRST_SELECT];
      this.state.board[this.state.FIRST_SELECT] = A;
      this.setState({
        board: this.state.board,
        FIRST_SELECT: null
      });
    } else {
      this.setState({
        FIRST_SELECT: index,
        board: this.state.board
      });
    }
  }

  eat(index) {
    if (this.state.FIRST_SELECT != null && this.state.FIRST_SELECT != index) {
      this.state.board[index] = this.state.board[this.state.FIRST_SELECT];
      this.state.board[this.state.FIRST_SELECT] = null;
      this.setState({
        FIRST_SELECT: null,
        board: this.state.board
      });
    } else {
      this.setState({
        FIRST_SELECT: index,
        board: this.state.board
      });
    }
  }

  //display the pieces based on the state
  //if the piece haven't been explored, display:false
  //if piece explored(eat other piece), display:true

  //depending on the action determine swap or eat
  handleClick(index) {
    if (this.state.board[this.state.FIRST_SELECT]) this.eat(index);
    else {
      this.setState({
        FIRST_SELECT: index
      });
    }
  }

  render() {
    let board = this.state.board.map((cell, index) => {
      var classNames = require("classnames");
      var colorDep;
      let PlayerBStat;
      let cn = "square";
      let disable = false;
      let piece = cell;
      if (cell) {
        piece = cell.Type;
        if (cell.Player == 1) {
          cn = "squareA";
        } else if (cell.Player == 2) {
          cn = "squareB";
          colorDep = classNames("square", { backgroundColor: "#99cccc" });
        } else if (cell.Player == 0) {
          piece = null;
          cn = "squareR";
          disable = true;
        }
      }
      return (
        <button
          disabled={disable}
          onClick={() => this.handleClick(index)}
          className={cn}
        >
          {piece}
        </button>
      );
    });

    let playerA = Object.keys(this.state.PlayerAStat).map(function(key, index) {
      let piec = key + ": ";
      return (
        <p>
          {piec}
          <br />
        </p>
      );
    });
    return (
      //TODO:try to answer why do we use React.Fragment over div?
      <React.Fragment>
        <React.Fragment>
          <br />
          <button className="button" onClick={this.playGame}>
            Play
          </button>
          <button className="button" onClick={this.setupGame}>
            Setup
          </button>
          <button className="button" onClick={this.surrender}>
            Surrender
          </button>
          <br />
          <br />
        </React.Fragment>
        <div className="board">
          {board}
          <div className="resultBarRight">
            <header className="stat">Remaining Pieces</header>
            <p className="stat">{playerA}</p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Game);

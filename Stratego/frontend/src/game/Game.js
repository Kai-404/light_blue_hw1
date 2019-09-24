import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

import "../App.css";
import "./Game.css";
import SideBar from "../SideBar/SideBar";

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
      PLAYER_ONE: "R",
      PLAYER_TWO: "B",
      currentTurn: "R",
      FIRST_SELECT: null,
      //board will be load from the back end as a list/array
      board: Array(100).fill(";)"),
      winner: null
    };
  }

  componentDidMount() {
    //get init game data from spring boot
    axios
      .get("W/game/init")
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

  //depending on the action determine swap or eat
  handleClick(index) {
    this.eat(index);
  }

  render() {
    let board = this.state.board.map((cell, index) => {
      let cn = "square";
      let disable = false;
      let piece = cell;
      if (cell) {
        piece = cell.Type;
        if (cell.Player == 1) {
          cn = "squareA";
        } else if (cell.Player == 2) {
          cn = "squareB";
        } else if (cell.Player == 0) {
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
    return (
      //TODO:try to answer why do we use React.Fragment over div?
      <React.Fragment>
        <div className="resultBarLeft">Opp's SideBar</div>
        <div className="resultBarRight">Your SideBar</div>
        <React.Fragment>
          <br />
          <button className="submitButton" onClick={this.playGame}>
            Play
          </button>
          <button className="submitButton" onClick={this.setupGame}>
            Setup
          </button>
          <button className="submitButton" onClick={this.surrender}>
            Surrender
          </button>
          <br />
        </React.Fragment>
        <div className="board">{board}</div>
      </React.Fragment>
    );
  }
}

export default withRouter(Game);

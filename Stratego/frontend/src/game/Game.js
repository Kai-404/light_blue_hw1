import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "../App.css";
import "./Game.css" ;

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
  determine winingState/winner
  */
  constructor(props) {
    super(props);
    this.state = {
      PLAYER_ONE: "R",
      PLAYER_TWO: "B",
      currentTurn: "R",
      //board will be load from the back end as a list/array
      board: Array(100).fill(";)"),
      winner: null
    };
  }
  /**
  componentDidMount() {
    //get init game data from spring boot
    axios.get("/boardState").then(res => this.setState({ users: res.data }));
  }
  */
  playGame = () => {};
  setupGame = () => {};
  surrender = () => {};

  handleClick(index) {
    this.state.board[index] = "O";
    this.setState({
      board: this.state.board
    });
  }

  render() {
    //css doesn't work!!!!!!!!!!why
    let board = this.state.board.map((cell, index) => {
      return (
        <button onClick={() => this.handleClick(index)} className="square">
          {cell}
        </button>
      );
    });
    return (
      //TODO:try to answer why do we use React.Fragment over div?
      <React.Fragment>
        <React.Fragment>
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

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
      isStart: false,
      FIRST_SELECT: null,
      Player1: true,
      Player2: false,
      //board will be load from the back end as a list/array
      //board: Array(100).fill(null),
      board: [
        { Type: "5", Player: "2" },
        { Type: "2", Player: "2" },
        { Type: "2", Player: "2" },
        { Type: "2", Player: "2" },
        { Type: "10", Player: "2" },
        { Type: "2", Player: "2" },
        { Type: "8", Player: "2" },
        { Type: "7", Player: "2" },
        { Type: "6", Player: "2" },
        { Type: "B", Player: "2" },
        { Type: "B", Player: "2" },
        { Type: "4", Player: "2" },
        { Type: "6", Player: "2" },
        { Type: "7", Player: "2" },
        { Type: "2", Player: "2" },
        { Type: "9", Player: "2" },
        { Type: "8", Player: "2" },
        { Type: "2", Player: "2" },
        { Type: "B", Player: "2" },
        { Type: "F", Player: "2" },
        { Type: "3", Player: "2" },
        { Type: "2", Player: "2" },
        { Type: "7", Player: "2" },
        { Type: "5", Player: "2" },
        { Type: "3", Player: "2" },
        { Type: "5", Player: "2" },
        { Type: "5", Player: "2" },
        { Type: "6", Player: "2" },
        { Type: "6", Player: "2" },
        { Type: "B", Player: "2" },
        { Type: "3", Player: "2" },
        { Type: "B", Player: "2" },
        { Type: "4", Player: "2" },
        { Type: "3", Player: "2" },
        { Type: "4", Player: "2" },
        { Type: "2", Player: "2" },
        { Type: "4", Player: "2" },
        { Type: "B", Player: "2" },
        { Type: "3", Player: "2" },
        { Type: "1", Player: "2" },
        { Type: "E", Player: "0" },
        { Type: "E", Player: "0" },
        { Type: "R", Player: "0" },
        { Type: "R", Player: "0" },
        { Type: "E", Player: "0" },
        { Type: "E", Player: "0" },
        { Type: "R", Player: "0" },
        { Type: "R", Player: "0" },
        { Type: "E", Player: "0" },
        { Type: "E", Player: "0" },
        { Type: "E", Player: "0" },
        { Type: "E", Player: "0" },
        { Type: "R", Player: "0" },
        { Type: "R", Player: "0" },
        { Type: "E", Player: "0" },
        { Type: "E", Player: "0" },
        { Type: "R", Player: "0" },
        { Type: "R", Player: "0" },
        { Type: "E", Player: "0" },
        { Type: "E", Player: "0" },
        { Type: "10", Player: "1" },
        { Type: "5", Player: "1" },
        { Type: "5", Player: "1" },
        { Type: "2", Player: "1" },
        { Type: "2", Player: "1" },
        { Type: "2", Player: "1" },
        { Type: "8", Player: "1" },
        { Type: "B", Player: "1" },
        { Type: "B", Player: "1" },
        { Type: "3", Player: "1" },
        { Type: "4", Player: "1" },
        { Type: "3", Player: "1" },
        { Type: "2", Player: "1" },
        { Type: "3", Player: "1" },
        { Type: "6", Player: "1" },
        { Type: "5", Player: "1" },
        { Type: "4", Player: "1" },
        { Type: "B", Player: "1" },
        { Type: "5", Player: "1" },
        { Type: "9", Player: "1" },
        { Type: "3", Player: "1" },
        { Type: "7", Player: "1" },
        { Type: "2", Player: "1" },
        { Type: "2", Player: "1" },
        { Type: "4", Player: "1" },
        { Type: "7", Player: "1" },
        { Type: "B", Player: "1" },
        { Type: "F", Player: "1" },
        { Type: "B", Player: "1" },
        { Type: "6", Player: "1" },
        { Type: "7", Player: "1" },
        { Type: "2", Player: "1" },
        { Type: "8", Player: "1" },
        { Type: "2", Player: "1" },
        { Type: "1", Player: "1" },
        { Type: "4", Player: "1" },
        { Type: "6", Player: "1" },
        { Type: "B", Player: "1" },
        { Type: "3", Player: "1" },
        { Type: "6", Player: "1" }
      ],
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

  //by clicking the play button,
  //react will send back the finalized board to spring,
  //then user are able to start the game
  playGame = () => {
    alert("start to play game");
    this.setState({ isStart: !this.state.isStart });
    /*axios.post("http://localhost:8080/game/init").then(res => {
      if (res === true) this.setState({ isStart: !this.state.isStart });
    });
    */
  };
  setupGame = () => {
    console.log(this.state.isStart);
    if (this.state.isStart) {
      alert("New game started without saving the old one");
    } else {
      alert(
        "You can swap the pieces by by clicking them,\nwhen you finish setting up the board\nclick play game to start"
      );
    }
    axios
      .get("http://localhost:8080/game/init")
      .then(res => this.setState({ board: res.data }));
    this.setState({
      isStart: false,
      Player1: true,
      Player2: false,
      winner: null
    });
  };
  //end the game with AI as winner
  surrender = () => {
    this.setState({ winner: "AI" });
    alert(`game ended, winner is ${this.state.winner}`);
  };

  //validing the first index
  validPiece(index) {
    console.log(`first: ${this.state.FIRST_SELECT}, index: ${index}`);
    if (!this.state.FIRST_SELECT && this.state.board[index] !== null) {
      if (
        (this.state.board[index].Player === "2" && this.state.Player2) ||
        (this.state.board[index].Player === "1" && this.state.Player1)
      ) {
        this.setState({
          FIRST_SELECT: index
        });
      } else {
        this.setState({ FIRST_SELECT: null });
      }
    }
  }

  //at most 2 buttons can be selected, and check if second is a valid move
  //if not, unclick 2nd
  //if valid, swap value according to index.
  swap(index1, index2) {
    console.log(`try to swap ${index1} and ${index2}`);
    if (this.state.board[index2]) {
      console.log(this.state.board[index2]);
      if (this.state.board[index1].Player === this.state.board[index2].Player) {
        let A = this.state.board[index1];
        this.state.board[index1] = this.state.board[index2];
        this.state.board[index2] = A;
        this.setState({
          board: this.state.board,
          FIRST_SELECT: null,
          SECOND_SELECT: null
        });
      }
    }
  }

  eat(index1, index2) {
    console.log(`${index1} try to eat ${index2}`);
    if (index1 !== null && index1 !== index2) {
      if (
        this.state.board[index2] == null ||
        this.state.board[index2].Player !== this.state.board[index1].Player
      ) {
        this.state.board[index2] = this.state.board[index1];
        //TODO: generalize blank piece
        this.state.board[index1] = { Type: "E", Player: "0" };
        this.setState({
          FIRST_SELECT: null,
          SECOND_SELECT: null,
          board: this.state.board,
          Player1: !this.state.Player1,
          Player2: !this.state.Player2
        });
      }
    }
  }

  //display the pieces based on the state
  //if the piece haven't been explored, display:false
  //if piece explored(eat other piece), display:true

  //depending on the action determine swap or eat
  handleClick(index) {
    if (this.state.winner) {
      alert(`game ended, winner is ${this.state.winner}`);
    } else {
      if (!this.state.FIRST_SELECT) this.validPiece(index);
      else {
        if (!this.state.isStart) {
          this.swap(this.state.FIRST_SELECT, index);
        } else {
          this.eat(this.state.FIRST_SELECT, index);
        }
      }
    }
  }

  render() {
    let board = this.state.board.map((cell, index) => {
      var classNames = require("classnames");
      let cn = "square";
      let disable = false;
      let piece = cell.Type;
      if (cell.Player === "1") {
        cn = "squareA";
      } else if (cell.Player === "2") {
        cn = "squareB";
        //colorDep = classNames("square", { backgroundColor: "#99cccc" });
      } else if (cell.Type === "R") {
        cn = "squareR";
        piece = null;
        disable = true;
      } else {
        piece = null;
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
            Play Game
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

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

import "./Game.css";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isStart: false,
      FIRST_SELECT: null,
      Player1: true,
      Player2: false,
      //board will be load from the back end as a list/array
      board: Array(100).fill(":("),
      PlayerAStat: {
        Marshall: 0,
        General: 0,
        Colonels: 0,
        Majors: 0,
        Captains: 0,
        Lieutenants: 0,
        Sergeants: 0,
        Miners: 0,
        Scouts: 0,
        Spy: 0,
        Bombs: 0,
        Flag: 0
      },
      PlayerBStat: {
        Marshall: 0,
        General: 0,
        Colonels: 0,
        Majors: 0,
        Captains: 0,
        Lieutenants: 0,
        Sergeants: 0,
        Miners: 0,
        Scouts: 0,
        Spy: 0,
        Bombs: 0,
        Flag: 0
      },
      winner: null,
      mesg: ""
    };
  }

  componentDidMount() {
    //get init game data from spring boot
    axios
      .get("http://localhost:8080/game/init")
      .then(res => this.setState({ board: res.data }));
  }

  clearStat() {
    this.setState({
      PlayerAStat: {
        Marshall: 0,
        General: 0,
        Colonels: 0,
        Majors: 0,
        Captains: 0,
        Lieutenants: 0,
        Sergeants: 0,
        Miners: 0,
        Scouts: 0,
        Spy: 0,
        Bombs: 0,
        Flag: 0
      },
      PlayerBStat: {
        Marshall: 0,
        General: 0,
        Colonels: 0,
        Majors: 0,
        Captains: 0,
        Lieutenants: 0,
        Sergeants: 0,
        Miners: 0,
        Scouts: 0,
        Spy: 0,
        Bombs: 0,
        Flag: 0
      }
    });
  }

  /*by clicking the play button,
  react will send back the finalized board to spring,
  then user are able to start the game
  TODO: Backend: form a gameResult, start to record
  */
  playGame = () => {
    this.clearStat();
    this.state.board.map((cell, index) => {
      let piece = cell.Type;
      if (cell.Player === "1") {
        this.modefiyStat(cell.Type, this.state.PlayerAStat);
      } else if (cell.Player === "2") {
        this.modefiyStat(cell.Type, this.state.PlayerBStat);
      }
    });
    alert("start to play game");
    this.setState({
      isStart: true,
      Player1: true,
      Player2: false,
      winner: null,
      mesg: ""
    });

    console.log(this.state.PlayerAStat);
  };

  /*TODO: setup game will cause current game not saved,
          remove gameHis from datatbase
          - backend: trysomething like if game/init gets request
                      delete gameHis with gameid
  */
  setupGame = () => {
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
    this.clearStat();
    this.setState({
      isStart: false,
      Player1: true,
      Player2: false,
      winner: null,
      mesg: ""
    });
  };

  //end the game with AI as winner
  surrender = () => {
    this.clearStat();
    this.setState({ winner: "AI", mesg: "game ended, winner is AI" });
  };

  //validing the first index
  validPiece(index) {
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
        let data = JSON.stringify({
          index1,
          index2
        });
        axios
          .post("http://localhost:8080/game/swap", data, {
            headers: { "Content-Type": "application/json;charset=UTF-8" },
            params: { startIndex: index1, distIndex: index2 }
          })
          .then(res => {
            this.setState({ board: res.data });
            this.updateBoard();
          })
          .catch(error => this.setState({ moveMade: error }));
      }
    }
  }

  //update the remainding piece accordingly
  updatePieceStat() {
    axios
      .get("http://localhost:8080/game/getplayeronepiece")
      .then(res => this.setState({ PlayerAStat: res.data }));
    axios
      .get("http://localhost:8080/game/getplayertwopiece")
      .then(res => this.setState({ PlayerBStat: res.data }));
  }

  //used to update board when move made
  updateBoard() {
    console.log("update board, and update remainding piece stat");
    axios
      .get("http://localhost:8080/game/boardstatus")
      .then(res => this.setState({ board: res.data }), updatePieceStat());
    if (this.state.isStart) {
      this.setState({
        FIRST_SELECT: null,
        SECOND_SELECT: null,
        board: this.state.board,
        Player1: !this.state.Player1,
        Player2: !this.state.Player2
      });
      if (this.state.Player1) {
        this.setState({ mesg: "It's your turn, make a move" });
      } else {
        this.setState({ mesg: "AI's move" });
      }
    } else {
      this.setState({
        board: this.state.board,
        FIRST_SELECT: null,
        SECOND_SELECT: null
      });
    }
  }

  move(index1, index2) {
    if (index1 !== null && index1 !== index2) {
      if (
        this.state.board[index2] == null ||
        this.state.board[index2].Player !== this.state.board[index1].Player
      ) {
        console.log(
          `self: ${this.state.Player1}, now move ${index1}, ${index2}`
        );
        let data = JSON.stringify({
          index1,
          index2
        });
        axios
          .post("http://localhost:8080/game/move", data, {
            headers: { "Content-Type": "application/json;charset=UTF-8" },
            params: { startIndex: index1, distIndex: index2 }
          })
          .then(res => {
            if (res.data) this.updateBoard();
            else {
              this.setState({
                FIRST_SELECT: null,
                SECOND_SELECT: null
              });
            }
            this.getWinner();
            if (this.state.winner) {
              this.setState({
                mesg: `game ended, winner is ${this.state.winner}`
              });
            }
          })
          .catch(error => this.setState({ moveMade: error }));
      }
    }
  }

  getWinner() {
    axios
      .get("http://localhost:8080/game/termination")
      .then(res => this.setState({ winner: res.data }));
  }
  //display the pieces based on the state
  //if the piece haven't been explored, display:false
  //if piece explored(eat other piece), display:true

  //depending on the action determine swap or eat
  handleClick(index) {
    if (this.state.winner) {
      this.setState({ mesg: `game ended, winner is ${this.state.winner}` });
    } else {
      if (!this.state.FIRST_SELECT) this.validPiece(index);
      else {
        if (!this.state.isStart) {
          this.swap(this.state.FIRST_SELECT, index);
        } else {
          this.move(this.state.FIRST_SELECT, index);
        }
      }
    }
  }

  //modefiy the player remaining pieces according to the board
  //using switch statement
  modefiyStat = (pie, player) => {
    switch (pie) {
      case "10":
        player.Marshall = Number(player.Marshall) + 1;
        break;
      case "9":
        player.General = Number(player.General) + 1;
        break;
      case "8":
        player.Colonels = Number(player.Colonels) + 1;
        break;
      case "7":
        player.Majors = Number(player.Majors) + 1;
        break;
      case "6":
        player.Captains = Number(player.Captains) + 1;
        break;
      case "5":
        player.Lieutenants = Number(player.Lieutenants) + 1;
        break;
      case "4":
        player.Sergeants = Number(player.Sergeants) + 1;
        break;
      case "3":
        player.Miners = Number(player.Miners) + 1;
        break;
      case "2":
        player.Scouts = Number(player.Scouts) + 1;
        break;
      case "1":
        player.Spy = Number(player.Spy) + 1;
        break;
      case "F":
        player.Flag = Number(player.Flag) + 1;
        break;
      case "B":
        player.Bombs = Number(player.Bombs) + 1;
        break;
      default:
      // do nothing
    }
    return player;
  };

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
      if (cell.Display === "no") {
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

    let Stat = Object.keys(this.state.PlayerAStat).map(function(key, index) {
      let piec = key + ": ";
      return <p>{piec}</p>;
    });
    let Player1 = Object.values(this.state.PlayerAStat).map(function(val) {
      let piec = val + "--";
      return <p>{piec}</p>;
    });
    let Player2 = Object.values(this.state.PlayerBStat).map(function(val) {
      let piec = val;
      return <p>{piec}</p>;
    });
    return (
      //TODO:try to answer why do we use React.Fragment over div?
      <React.Fragment>
        <mes className="message">{this.state.mesg}</mes>
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
        <contain className="container">
          <b className="board">{board}</b>

          <bar className="resultBarRight">
            <header className="stat">Remaining: A--B</header>
            <p className="stat">{Stat}</p>
            <p className="stat">{Player1}</p>
            <p className="stat">{Player2}</p>
          </bar>
        </contain>
      </React.Fragment>
    );
  }
}

export default withRouter(Game);

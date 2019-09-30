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
      Player1: true, //self
      Player2: false, //AI
      isAutoPlay: false, //replace player1 as another AI
      //board will be load from the back end as a list/array
      board: Array(100).fill(":("),
      PlayerAStat: {},
      PlayerBStat: {},
      winner: null,
      mesg: "",
      history: []
    };
  }

  componentDidMount() {
    //get init game data from spring boot
    axios
      .get("/game/init")
      .then(res => this.setState({ board: res.data }));
  }

  clearStat() {
    let a = {};
    this.setState({
      PlayerAStat: a,
      PlayerBStat: a
    });
  }

  /*by clicking the play button,
  react will send back the finalized board to spring,
  then user are able to start the game
  TODO: Backend: form a gameResult, start to record
  */
  playGame = () => {
    if (this.state.winner) {
      this.setState({
        mesg: "Please click on setup before starting a new game"
      });
    } else {
      alert("start to play game");
      this.updatePieceStat();
      this.setState({
        isStart: true,
        Player1: true,
        Player2: false,
        mesg: ""
      });
    }

    console.log(this.state.PlayerAStat);
  };

  setupGame = () => {
    if (this.state.isStart) {
      alert("New game started without saving the old one");
    } else {
      alert(
        "You can swap the pieces by by clicking them,\nwhen you finish setting up the board\nclick play game to start"
      );
    }
    axios
      .get("/game/init")
      .then(res => this.setState({ board: res.data }));
    this.clearStat();
    this.setState({
      isAutoPlay: false,
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
    this.props.getHis(this.state.history);
    axios
        .post("/game/savehistory",
            {
                userId : this.props.User.id,
                history : JSON.stringify(this.state.history),
                isWon : false
        });
    this.setState({
      winner: "AI",
      mesg: "game ended, winner is AI",
      isStart: false,
      history: []
    });
  };

  //check if there's winner of this game
  getWinner() {
    axios
      .get("/game/termination")
      .then(res => this.setState({ winner: res.data }));
    if (this.state.winner) {
      console.log(this.state.winner);
      axios
          .post("/game/savehistory",
              {
                userId : this.props.User.id,
                history : JSON.stringify(this.state.history),
                isWon : (this.state.winner === 2)
              });
      this.props.getHis(this.state.history);
      console.log("winner!!!!!!!!!!!!!!");
      this.setState({
        mesg: `game ended, winner is ${this.state.winner}`,
        isStart: false,
        history: []
      });
    }
  }
  //validing the first index
  validPiece(index) {
    if (!this.state.FIRST_SELECT && this.state.board[index] !== null) {
      if (
        //  (this.state.board[index].Player === "2" && this.state.Player2) ||
        this.state.board[index].Player === "1" &&
        this.state.Player1
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
          .post("/game/swap", data, {
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
      .get("/game/getplayeronepiece")
      .then(res => this.setState({ PlayerAStat: res.data }));
    axios
      .get("/game/getplayertwopiece")
      .then(res => this.setState({ PlayerBStat: res.data }));
  }

  //used to update board when move made
  updateBoard() {
    console.log("update board, and update remainding piece stat");
    axios.get("/game/boardstatus").then(
      res =>
        this.setState({
          board: res.data,
          history: [...this.state.history, res.data]
        }),
      this.updatePieceStat()
    );
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
    this.getWinner(); //check if there's winner after one move made
  }

  /*
    send a AI move request, if return true, update board,
    if not do nothing and wait for AI to return true
    */
  async ai() {

    await axios.get("/game/AI",{
      headers: {"Content-Type": "application/json;charset=UTF-8"},
      params: {player:2}
    }).then(res => {
      //update the board accordingly
      if (res.data) this.updateBoard();
    });
  }

  /**
   * for testing purposes, add a button that lets the user quickly hurry through a game
   * such that moves are automatically chosen via the same AI logic that governs the AI player.
   * by clicking on the autoPlay button, user will be replaced by the AI
   */
  autoPlay = async () => {
    this.setState({ isAutoPlay: true });
    //while there's no winner of the game 2 AI will keep playing
    while (!this.state.winner) {
       await axios.get("/game/AI", {
        headers: {"Content-Type": "application/json;charset=UTF-8"},
        params: {player:1}
      }).then(res => {
        //update the board and call another AI to make next move
        if (res.data) {
          this.updateBoard();
          this.ai(); // request AI to make a move
        }
      });
    }
  };

  //two player take turns to make move
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
        /*
        send a player's move request with 2 index(2 piece on board) to backend,
          valid it, if a valid board:  update the board accordingly
                              update the state too
          -if not: unselect buttons, and do nothing.
        */
        axios
          .post("/game/move", data, {
            headers: { "Content-Type": "application/json;charset=UTF-8" },
            params: { startIndex: index1, distIndex: index2 }
          })
          .then(res => {
            //update the board accordingly
            if (res.data) {
              this.updateBoard();
              this.ai(); // request AI to make a move
            } else {
              this.setState({
                //clear buttons selected
                FIRST_SELECT: null,
                SECOND_SELECT: null
              });
            }
          })
          .catch(error => this.setState({ moveMade: error }));
      }
    }
  }

  //display the pieces based on the state
  //if the piece haven't been explored, display:false
  //if piece explored(eat other piece), display:true

  //depending on the action determine swap or eat
  handleClick(index) {
    if (this.state.winner) {
      this.setState({ mesg: `game ended, winner is ${this.state.winner}` });
    } else if (this.state.isAutoPlay) {
      this.setState({ mesg: "Game is in Quick Auto Play mode" });
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

  render() {
    let board = this.state.board.map((cell, index) => {
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

    let Stat = Object.keys(this.state.PlayerAStat).map(function(key) {
      let piec = key + ": ";
      return <p>{piec}</p>;
    });
    let Player1 = Object.values(this.state.PlayerAStat).map(function(val) {
      let piec = val + "\xa0";
      return <p>{piec}</p>;
    });
    let Player2 = Object.values(this.state.PlayerBStat).map(function(val) {
      let piec = "| " + val;
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
        <button className="button" onClick={this.autoPlay}>
          AutoPlay
        </button>
        <br />
        <br />
        <contain className="container">
          <b className="board">{board}</b>

          <bar className="resultBarRight">
            <header className="stat">Remaining: Your | AI</header>
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

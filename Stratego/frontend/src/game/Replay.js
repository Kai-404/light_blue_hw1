import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "../App.css";

class Replay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        //demo history data
      History: [
        [
          { Type: "B", Player: "2", Display: "no" },
          { Type: "3", Player: "2", Display: "no" },
          { Type: "3", Player: "2", Display: "no" },
          { Type: "B", Player: "2", Display: "no" },
          { Type: "F", Player: "2", Display: "no" },
          { Type: "B", Player: "2", Display: "no" },
          { Type: "6", Player: "2", Display: "no" },
          { Type: "6", Player: "2", Display: "no" },
          { Type: "2", Player: "2", Display: "no" },
          { Type: "2", Player: "2", Display: "no" },
          { Type: "1", Player: "2", Display: "no" },
          { Type: "4", Player: "2", Display: "no" },
          { Type: "8", Player: "2", Display: "no" },
          { Type: "7", Player: "2", Display: "no" },
          { Type: "B", Player: "2", Display: "no" },
          { Type: "4", Player: "2", Display: "no" },
          { Type: "B", Player: "2", Display: "no" },
          { Type: "7", Player: "2", Display: "no" },
          { Type: "5", Player: "2", Display: "no" },
          { Type: "2", Player: "2", Display: "no" },
          { Type: "7", Player: "2", Display: "no" },
          { Type: "5", Player: "2", Display: "no" },
          { Type: "6", Player: "2", Display: "no" },
          { Type: "10", Player: "2", Display: "no" },
          { Type: "8", Player: "2", Display: "no" },
          { Type: "2", Player: "2", Display: "no" },
          { Type: "4", Player: "2", Display: "no" },
          { Type: "3", Player: "2", Display: "no" },
          { Type: "4", Player: "2", Display: "no" },
          { Type: "3", Player: "2", Display: "no" },
          { Type: "9", Player: "2", Display: "no" },
          { Type: "2", Player: "2", Display: "no" },
          { Type: "3", Player: "2", Display: "no" },
          { Type: "6", Player: "2", Display: "no" },
          { Type: "2", Player: "2", Display: "no" },
          { Type: "2", Player: "2", Display: "no" },
          { Type: "B", Player: "2", Display: "no" },
          { Type: "5", Player: "2", Display: "no" },
          { Type: "2", Player: "2", Display: "no" },
          { Type: "5", Player: "2", Display: "no" },
          { Type: "E", Player: "0", Display: "yes" },
          { Type: "E", Player: "0", Display: "yes" },
          { Type: "R", Player: "0", Display: "yes" },
          { Type: "R", Player: "0", Display: "yes" },
          { Type: "E", Player: "0", Display: "yes" },
          { Type: "E", Player: "0", Display: "yes" },
          { Type: "R", Player: "0", Display: "yes" },
          { Type: "R", Player: "0", Display: "yes" },
          { Type: "E", Player: "0", Display: "yes" },
          { Type: "E", Player: "0", Display: "yes" },
          { Type: "E", Player: "0", Display: "yes" },
          { Type: "E", Player: "0", Display: "yes" },
          { Type: "R", Player: "0", Display: "yes" },
          { Type: "R", Player: "0", Display: "yes" },
          { Type: "E", Player: "0", Display: "yes" },
          { Type: "E", Player: "0", Display: "yes" },
          { Type: "R", Player: "0", Display: "yes" },
          { Type: "R", Player: "0", Display: "yes" },
          { Type: "E", Player: "0", Display: "yes" },
          { Type: "E", Player: "0", Display: "yes" },
          { Type: "4", Player: "1", Display: "yes" },
          { Type: "2", Player: "1", Display: "yes" },
          { Type: "4", Player: "1", Display: "yes" },
          { Type: "3", Player: "1", Display: "yes" },
          { Type: "10", Player: "1", Display: "yes" },
          { Type: "4", Player: "1", Display: "yes" },
          { Type: "6", Player: "1", Display: "yes" },
          { Type: "2", Player: "1", Display: "yes" },
          { Type: "8", Player: "1", Display: "yes" },
          { Type: "B", Player: "1", Display: "yes" },
          { Type: "5", Player: "1", Display: "yes" },
          { Type: "3", Player: "1", Display: "yes" },
          { Type: "7", Player: "1", Display: "yes" },
          { Type: "9", Player: "1", Display: "yes" },
          { Type: "B", Player: "1", Display: "yes" },
          { Type: "3", Player: "1", Display: "yes" },
          { Type: "1", Player: "1", Display: "yes" },
          { Type: "2", Player: "1", Display: "yes" },
          { Type: "B", Player: "1", Display: "yes" },
          { Type: "5", Player: "1", Display: "yes" },
          { Type: "6", Player: "1", Display: "yes" },
          { Type: "2", Player: "1", Display: "yes" },
          { Type: "5", Player: "1", Display: "yes" },
          { Type: "B", Player: "1", Display: "yes" },
          { Type: "F", Player: "1", Display: "yes" },
          { Type: "B", Player: "1", Display: "yes" },
          { Type: "5", Player: "1", Display: "yes" },
          { Type: "3", Player: "1", Display: "yes" },
          { Type: "7", Player: "1", Display: "yes" },
          { Type: "2", Player: "1", Display: "yes" },
          { Type: "3", Player: "1", Display: "yes" },
          { Type: "7", Player: "1", Display: "yes" },
          { Type: "2", Player: "1", Display: "yes" },
          { Type: "2", Player: "1", Display: "yes" },
          { Type: "B", Player: "1", Display: "yes" },
          { Type: "6", Player: "1", Display: "yes" },
          { Type: "4", Player: "1", Display: "yes" },
          { Type: "8", Player: "1", Display: "yes" },
          { Type: "6", Player: "1", Display: "yes" },
          { Type: "2", Player: "1", Display: "yes" }
        ],
        [
          { Type: "B", Player: "2", Display: "no" },
          { Type: "3", Player: "2", Display: "no" },
          { Type: "3", Player: "2", Display: "no" },
          { Type: "B", Player: "2", Display: "no" },
          { Type: "F", Player: "2", Display: "no" },
          { Type: "B", Player: "2", Display: "no" },
          { Type: "6", Player: "2", Display: "no" },
          { Type: "6", Player: "2", Display: "no" },
          { Type: "2", Player: "2", Display: "no" },
          { Type: "2", Player: "2", Display: "no" },
          { Type: "1", Player: "2", Display: "no" },
          { Type: "4", Player: "2", Display: "no" },
          { Type: "8", Player: "2", Display: "no" },
          { Type: "7", Player: "2", Display: "no" },
          { Type: "B", Player: "2", Display: "no" },
          { Type: "4", Player: "2", Display: "no" },
          { Type: "B", Player: "2", Display: "no" },
          { Type: "7", Player: "2", Display: "no" },
          { Type: "5", Player: "2", Display: "no" },
          { Type: "2", Player: "2", Display: "no" },
          { Type: "7", Player: "2", Display: "no" },
          { Type: "5", Player: "2", Display: "no" },
          { Type: "6", Player: "2", Display: "no" },
          { Type: "10", Player: "2", Display: "no" },
          { Type: "8", Player: "2", Display: "no" },
          { Type: "2", Player: "2", Display: "no" },
          { Type: "4", Player: "2", Display: "no" },
          { Type: "3", Player: "2", Display: "no" },
          { Type: "4", Player: "2", Display: "no" },
          { Type: "3", Player: "2", Display: "no" },
          { Type: "9", Player: "2", Display: "no" },
          { Type: "2", Player: "2", Display: "no" },
          { Type: "3", Player: "2", Display: "no" },
          { Type: "6", Player: "2", Display: "no" },
          { Type: "2", Player: "2", Display: "no" },
          { Type: "2", Player: "2", Display: "no" },
          { Type: "B", Player: "2", Display: "no" },
          { Type: "5", Player: "2", Display: "no" },
          { Type: "2", Player: "2", Display: "no" },
          { Type: "5", Player: "2", Display: "no" },
          { Type: "E", Player: "0", Display: "yes" },
          { Type: "E", Player: "0", Display: "yes" },
          { Type: "R", Player: "0", Display: "yes" },
          { Type: "R", Player: "0", Display: "yes" },
          { Type: "E", Player: "0", Display: "yes" },
          { Type: "E", Player: "0", Display: "yes" },
          { Type: "R", Player: "0", Display: "yes" },
          { Type: "R", Player: "0", Display: "yes" },
          { Type: "E", Player: "0", Display: "yes" },
          { Type: "E", Player: "0", Display: "yes" },
          { Type: "E", Player: "0", Display: "yes" },
          { Type: "E", Player: "0", Display: "yes" },
          { Type: "R", Player: "0", Display: "yes" },
          { Type: "R", Player: "0", Display: "yes" },
          { Type: "E", Player: "0", Display: "yes" },
          { Type: "E", Player: "0", Display: "yes" },
          { Type: "R", Player: "0", Display: "yes" },
          { Type: "R", Player: "0", Display: "yes" },
          { Type: "E", Player: "0", Display: "yes" },
          { Type: "10", Player: "1", Display: "yes" },
          { Type: "E", Player: "0", Display: "yes" },
          { Type: "4", Player: "1", Display: "yes" },
          { Type: "2", Player: "1", Display: "yes" },
          { Type: "4", Player: "1", Display: "yes" },
          { Type: "3", Player: "1", Display: "yes" },
          { Type: "4", Player: "1", Display: "yes" },
          { Type: "6", Player: "1", Display: "yes" },
          { Type: "2", Player: "1", Display: "yes" },
          { Type: "8", Player: "1", Display: "yes" },
          { Type: "B", Player: "1", Display: "yes" },
          { Type: "5", Player: "1", Display: "yes" },
          { Type: "3", Player: "1", Display: "yes" },
          { Type: "7", Player: "1", Display: "yes" },
          { Type: "9", Player: "1", Display: "yes" },
          { Type: "B", Player: "1", Display: "yes" },
          { Type: "3", Player: "1", Display: "yes" },
          { Type: "1", Player: "1", Display: "yes" },
          { Type: "2", Player: "1", Display: "yes" },
          { Type: "B", Player: "1", Display: "yes" },
          { Type: "5", Player: "1", Display: "yes" },
          { Type: "6", Player: "1", Display: "yes" },
          { Type: "2", Player: "1", Display: "yes" },
          { Type: "5", Player: "1", Display: "yes" },
          { Type: "B", Player: "1", Display: "yes" },
          { Type: "F", Player: "1", Display: "yes" },
          { Type: "B", Player: "1", Display: "yes" },
          { Type: "5", Player: "1", Display: "yes" },
          { Type: "3", Player: "1", Display: "yes" },
          { Type: "7", Player: "1", Display: "yes" },
          { Type: "2", Player: "1", Display: "yes" },
          { Type: "3", Player: "1", Display: "yes" },
          { Type: "7", Player: "1", Display: "yes" },
          { Type: "2", Player: "1", Display: "yes" },
          { Type: "2", Player: "1", Display: "yes" },
          { Type: "B", Player: "1", Display: "yes" },
          { Type: "6", Player: "1", Display: "yes" },
          { Type: "4", Player: "1", Display: "yes" },
          { Type: "8", Player: "1", Display: "yes" },
          { Type: "6", Player: "1", Display: "yes" },
          { Type: "2", Player: "1", Display: "yes" }
        ]
      ],
      currentBoard: [],
      isPause: true,
      seconds: 0,
      frameTime: 1000
    };
  }

  componentDidMount() {
    this.setState({
      currentBoard: this.state.History[0]
    });
    this.interval = setInterval(() => this.tick(), this.state.frameTime);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    let len = this.state.History.length;
    if (this.state.seconds < len && !this.state.isPause) {
      this.setState({
        currentBoard: this.state.History[this.state.seconds]
      });
      this.setState(prevState => ({
        seconds: prevState.seconds + 1
      }));
    }
  }

  faster = () => {
    this.setState({ frameTime: this.frameTime / 2 });
  };
  pause = () => {
    this.setState({ isPause: true });
  };
  start = () => {
    this.setState({ isPause: false });
  };

  //for each game result a component will be redered
  render() {
    let board = this.state.currentBoard.map((cell, index) => {
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
        <button disabled={disable} className={cn}>
          {piece}
        </button>
      );
    });
    return (
      <React.Fragment>
        <button className="submitButton" onClick={this.start}>
          Start
        </button>
        <button className="submitButton" onClick={this.pause}>
          Pause
        </button>
        <button className="submitButton" onClick={this.faster}>
          Faster
        </button>
        <div>(For testing purpose)Turns Taking: {this.state.seconds}</div>
        <b className="board">{board}</b>
      </React.Fragment>
    );
  }
}

export default withRouter(Replay);

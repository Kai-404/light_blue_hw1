import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "../App.css";

class Replay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      History: null,
      currentBoard: [],
      isPause: true,
      seconds: 0,
      frameTime: 500
    };
  }

  componentDidMount() {
    this.setState({
      History: this.props.gameHis
    });
    this.interval = setInterval(() => this.tick(), this.state.frameTime);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    if (this.state.History) {
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
  }

  faster = () => {
    this.setState({ frameTime: this.state.frameTime / 2 });
  };
  pause = () => {
    this.setState({ isPause: true });
  };
  start = () => {
    this.setState({ isPause: false });
  };

  //for each game result a component will be redered
  render() {
    let board = this.state.currentBoard.map(cell => {
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
        <div>(For testing purpose)Turns Taking: {this.state.seconds}</div>
        <b className="board">{board}</b>
      </React.Fragment>
    );
  }
}

export default withRouter(Replay);

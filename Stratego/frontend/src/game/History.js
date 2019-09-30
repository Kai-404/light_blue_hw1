import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import ReactTable from "react-table";
import "react-table/react-table.css";
import "../App.css";

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      History: [
        { Date: "12/10", Status: "Won" },
        { Date: "11/10", Status: "Lost" }
      ],
      gameId: null
    };
  }

  //for each game histroy a component will be redered
  componentDidMount() {
    let temp = [];
    axios
        .get("http://localhost:8080/game/gethistory", {params: {userid:this.props.User.id}})
        .then(res => {
            let i;
            for(i=0; i<res.data.length;i++) {
              temp.push({Date: res.data[i].date, Status:res.data[i].won ? "Won":"Lost"});
            }
          this.setState({History : temp});
          }
        );

  }

  //click on the replay button will redirect/pop up a window to autoplay the game
  routeChange = () => {
    //let path = `/replay/${this.state.gameId}`;
    let path = "/replay";
    this.props.history.push(path);
  };
  render() {
    const columns = [
      {
        Header: "Date",
        accessor: "Date"
      },
      {
        Header: "Status",
        accessor: "Status"
      },
      {
        Header: "Replay",
        Cell: row => (
          <button className="button" onClick={this.routeChange}>
            Replay
          </button>
        )
      }
    ];
    return (
      <React.Fragment>
        <header>Overall Game History</header>
        <ReactTable
          columns={columns}
          data={this.state.History}
          defaultPageSize={5}
        ></ReactTable>
      </React.Fragment>
    );
  }
}

export default withRouter(History);

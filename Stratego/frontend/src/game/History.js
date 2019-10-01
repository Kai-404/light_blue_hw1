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
      History: [],
      index: null //index of which game history is going to be replayed
    };
  }

  //for each game histroy a component will be redered
    componentDidMount() {
        let temp = [];
        axios
            .get("/game/gethistory", {params: {userid:this.props.User.id}})
            .then(res => {
                    let i;
                    for(i=0; i<res.data.length;i++) {
                        temp.push({Date: String(res.data[i].date).slice(0,10), Status:res.data[i].won ? "Won":"Lost", hist: res.data[i].history});
                    }
                    this.setState({History : temp});
                }
            );
    }

    onRowClick = (state, rowInfo, column, instance) => {
        return {
            onClick: e => {
                this.props.getHis(JSON.parse(rowInfo.original.hist));
            }
        }
    };

  //click on the replay button will redirect/pop up a window to autoplay the game
  routeChange = () => {
    //send the history data to app.js to be replayed
    //this.props.setReplay(this.state.History[this.state.index].board);
      this.props.getHis();

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
          getTrProps={this.onRowClick}
          defaultPageSize={5}
          getTdProps={(state, rowInfo, column, instance) => {
            return {
              onClick: (e, handleOriginal) => {
                console.log("row:", rowInfo.index);
                this.setState({ index: rowInfo.index });
              }
            };
          }}
        ></ReactTable>
      </React.Fragment>
    );
  }
}

export default withRouter(History);

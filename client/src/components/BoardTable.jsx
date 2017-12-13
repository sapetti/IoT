import React, { Component } from "react";
import { Cross } from "../images/icons";

import { BOARDS, UNREGISTER } from "../config";

const deleteButton = handler => (
  <a href="#unregister" onClick={handler} className="f6 dark-red">
    <Cross color="red">Delete</Cross>
  </a>
);

export class BoardsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: []
    };
  }

  unregister = id => () =>
    fetch(UNREGISTER + "/" + id, { method: "delete" })
      .then(response => response.json())
      .then(({ boards }) => this.setState({ boards }));

  componentDidMount() {
    fetch(BOARDS)
      .then(response => response.json())
      .then(({ boards }) => this.setState({ boards }));
  }

  render() {
    const { boards } = this.state;
    console.log("boards", boards);
    console.log("state", this.state);
    return (
      <div className="pa4">
        <table className="fl w-100 ba b--solid br1">
          <thead>
            <tr>
              <th>Name</th>
              <th>Place</th>
              <th>Services</th>
              <th>Status</th>
              <th>Unregister</th>
            </tr>
          </thead>
          <tbody>
            {boards.map(b => (
              <tr key={b.id}>
                <td>{b.name}</td>
                <td>{b.place}</td>
                <td>{b.services}</td>
                <td>?</td>
                <td>{deleteButton(this.unregister(b.id))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default BoardsTable;

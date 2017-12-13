import React, { Component } from "react";
import { Table, Panel, Glyphicon } from "react-bootstrap";

import { BOARDS, UNREGISTER } from "../config";

const centered = { style: { textAlign: "center" } };
const glyphRed = { style: { color: "red", fontSize: "20px" } };
const glyphGreen = { style: { color: "green", fontSize: "20px" } };
const glyphBlue = { style: { color: "blue", fontSize: "20px" } };

//TODO: move this components to ./component/commons.js

const DeleteLink = handler => (
  <a href="#unregister" onClick={handler} title="Unregister">
    <Glyphicon glyph="remove" {...glyphRed} />
  </a>
);

const EditLink = handler => (
  <a href="#edit" onClick={handler} title="Edit">
    <Glyphicon glyph="pencil" {...glyphBlue} />
  </a>
);

const StatusComponent = ({ status }) =>
  "UP" === status ? (
    <Glyphicon glyph="ok" {...glyphGreen} />
  ) : (
    <Glyphicon glyph="remove" {...glyphRed} />
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
      <Panel header="Boards">
        <Table striped condensed hover responsive>
          <thead>
            <tr>
              <th {...centered}>Name</th>
              <th {...centered}>Location</th>
              <th {...centered}>Services</th>
              <th {...centered}>Status</th>
              <th {...centered}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {boards.map(b => (
              <tr key={b.id}>
                <td>{b.name}</td>
                <td>{b.place}</td>
                <td>{b.services}</td>
                <td {...centered}>
                  <StatusComponent status="UP" />
                </td>
                <td {...centered}>
                  <span>{EditLink()}</span> {DeleteLink(this.unregister(b.id))}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Panel>
    );
  }
}

export default BoardsTable;

//imrc
import React, { Component } from "react";

const classLabel = "b dib mb2 mr2";
const classInput = "input-reset ba b--black-20 pa2 mb2 dib w-60";

//cc
export class BoardDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  //ss - setState
  //element.class
  render() {
    return (
      <div className="pa4">
        <label className={classLabel}>Name</label>
        <input id="name" type="text" className={classInput} />
        <br />
        <label className={classLabel}>Location</label>
        <input id="location" type="text" className={classInput} />
        <br />
        <label className={classLabel}>Location</label>
        <input id="location" type="text" className={classInput} />
        <br />
      </div>
    );
  }
}

export default BoardDetail;

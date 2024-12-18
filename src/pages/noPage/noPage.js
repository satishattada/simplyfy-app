
import React, { Component } from "react";
import './styles.css'; 

export class NoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div className="container">
        <h1>page not found</h1>
      </div>
    );
  }
}

export default NoPage;


import React, { Component } from "react";
import './styles.css';
import { withParamsAndNavigate } from "../../../routes/with-params-navigate";

class Dashboard extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
    }
  }


  render() {
    return (
      <div className="home-container container">
       dashboard
      </div>
    );
  }
}

export default (withParamsAndNavigate(Dashboard));


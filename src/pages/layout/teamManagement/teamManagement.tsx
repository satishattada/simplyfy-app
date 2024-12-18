
import { Component } from "react";
import './styles.css';
import { withParamsAndNavigate } from "../../../routes/with-params-navigate";

class TeamManagement extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div className="home-container container">
       TeamManagement
      </div>
    );
  }
}

export default (withParamsAndNavigate(TeamManagement));



import { Component } from "react";
import './styles.css';
import { withParamsAndNavigate } from "../../../routes/with-params-navigate";

class DemandManagement extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div className="home-container container">
       DemandManagement
      </div>
    );
  }
}

export default (withParamsAndNavigate(DemandManagement));


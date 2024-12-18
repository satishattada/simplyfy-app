
import { Component } from "react";
import './styles.css';
import { withParamsAndNavigate } from "../../../routes/with-params-navigate";

class FinanaceManagement extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div className="home-container container">
       FinanceManagement
      </div>
    );
  }
}

export default (withParamsAndNavigate(FinanaceManagement));


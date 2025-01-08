
import TeamViewComponent from '../../../components/teamView/teamViewComponent';
import './styles.css';
import { withParamsAndNavigate } from "../../../routes/with-params-navigate";
function TeamManagement() {
  return <><TeamViewComponent /></>;
}
export default (withParamsAndNavigate(TeamManagement))
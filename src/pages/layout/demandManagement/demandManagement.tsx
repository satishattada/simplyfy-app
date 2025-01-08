import { useAtomValue } from 'jotai';
import './styles.css';
import { configAtom } from '../../../providers/store';
import DemandView from "../../../components/demandView/demandView";
import { withParamsAndNavigate } from "../../../routes/with-params-navigate";
function DemandManagement() {
  const config = useAtomValue(configAtom);
  console.log(config)
  return <>
  <DemandView />;
</>;
}
export default (withParamsAndNavigate(DemandManagement))
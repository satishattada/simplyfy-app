import { useAtomValue } from 'jotai';
import './styles.css';
import { configAtom } from '../../../providers/store';
import DemandView from "../../../components/contractsView/contractsView";
import { withParamsAndNavigate } from "../../../routes/with-params-navigate";
function ContractsManagement() {
  const config = useAtomValue(configAtom);
  console.log(config)
  return <>
  <DemandView />;
</>;
}
export default (withParamsAndNavigate(ContractsManagement))

import { useAtomValue } from 'jotai';
import './styles.css';
import { configAtom } from '../../../providers/store';

export default function DemandManagement() {
  const config = useAtomValue(configAtom);
  console.log(config)
  return <div className="home-container container">DemandManagement</div>;
}

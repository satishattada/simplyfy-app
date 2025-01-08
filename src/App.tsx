import "./App.css";
import { Store } from "./providers";
import RoutesContainer from "./routes/routes";
import { TeamReq } from './atoms/teamAtoms';
interface Props {
  config: any;
  teamDataAtom: TeamReq;
  
}
function App({ config, teamDataAtom }: Props) {
  return (
    <Store
      data={{
        config,
        teamDataAtom,
      }}
    >
      <RoutesContainer />
    </Store>
  );
}

export default App;

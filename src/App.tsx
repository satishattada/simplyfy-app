import "./App.css";
import { Store } from "./providers";
import RoutesContainer from "./routes/routes";
import { TeamReq } from './atoms/teamAtoms';
import { PrimitiveAtom } from "jotai";
interface Props {
  config: any;
  
}
function App({ config }: Props) {
  return (
    <Store
      data={{
        config,
      }}
    >
      <RoutesContainer />
    </Store>
  );
}

export default App;

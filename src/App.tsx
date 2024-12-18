import "./App.css";
import { Store } from "./providers";
import RoutesContainer from "./routes/routes";

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

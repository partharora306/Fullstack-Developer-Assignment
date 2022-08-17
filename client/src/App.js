import ChooseCampaign from "./components/NewCampaign";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <ChooseCampaign />
    </Router>
  );
}

export default App;

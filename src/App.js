import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Leads from "./Components/Leads";
import Createlead from "./Components/Createlead";
import Edit from "./Components/Edit";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Leads />} />
        <Route path="/create" element={<Createlead />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </Router>
  );
}

export default App;

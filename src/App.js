import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home.js";
import CreateEvent from "./CreateEvent.js";

function App() {
  return (
    <Router>
      <div className="bg-dark">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/create-event">Create Event</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/create-event" element={<CreateEvent />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

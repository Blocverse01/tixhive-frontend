import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home.js";
import CreateEvent from "./CreateEvent.js";

function App() {
  return (
    <Router>
      <div className="bg-brand-black font-poppins">
        <div className="max-w-8xl mx-auto px-5 sm:px-6 lg:px-8">
          <nav className="lg:pt-[50px] lg:px-10">
            <div className="flex items-center text-white">
              <Link to="/">
                <h3 className="lg:mr-[79px] lg:font-[500] lg:text-[30px] lg:leading-[45px]">
                  Bloc-Tick
                </h3>
              </Link>
              <ul className="lg:flex appearance-none lg:font-[500] lg:text-[18.65px] lg:leading-[27.98px] lg:gap-[40.29px] items-center">
                <li>
                  <Link to="/my-tickets">My Tickets</Link>
                </li>
                <li>
                  <Link to="/manage-events">Manage Events</Link>
                </li>
                <li>
                  <Link to="/faqs">Need Help?</Link>
                </li>
              </ul>
            </div>
          </nav>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/create-event" element={<CreateEvent />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

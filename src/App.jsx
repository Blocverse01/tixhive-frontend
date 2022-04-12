import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import CreateEvent from "./CreateEvent";
import ConnectWallet from "components/ConnectWallet";
import Web3Boot from "components/Web3Boot";

function App() {
  return (
    <Router>
      <Web3Boot>
        <div className="bg-brand-black font-poppins">
          <div className="max-w-[1728px] mx-auto">
            <nav className="lg:pt-[50px] px-5 sm:px-6 lg:px-8">
              <div className="flex items-center lg:px-10 text-white">
                <Link to="/">
                  <h3 className="lg:mr-[79px] lg:font-[500] lg:text-[30px] lg:leading-[45px]">Bloc-Tick</h3>
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
                <div className="flex justify-end flex-1 z-10">
                  <ConnectWallet />
                </div>
              </div>
            </nav>
            <Routes>
              <Route exact path="/" element={<Home />}></Route>
              <Route exact path="/create-event" element={<CreateEvent />}></Route>
            </Routes>
          </div>
        </div>
      </Web3Boot>
    </Router>
  );
}

export default App;

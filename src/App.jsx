import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import CreateEvent from "./CreateEvent";
import ConnectWallet from "components/ConnectWallet";
import Web3Boot from "components/Web3Boot";
import ScrollToTop from "ScrollToTop";
import EventDisplay from "components/EventDisplay";
import ManageEvents from "./ManageEvents";
import MyTickets from "MyTickets";

function App() {
  return (
    <Router>
      <ScrollToTop>
        <Web3Boot>
          <div className="bg-brand-black font-poppins">
            <div className="max-w-[1728px] mx-auto">
              <nav className="pt-[25px] z-50 lg:pt-[45px] px-5 sm:px-10 lg:px-8">
                <div className="flex items-center text-white lg:px-10">
                  <Link to="/">
                    <h3 className="lg:mr-[79px] lg:font-[500] lg:text-[30px] lg:leading-[45px]">
                      Bloc-Ticks
                    </h3>
                  </Link>
                  <ul className="lg:flex hidden appearance-none lg:font-[500] lg:text-[18.65px] lg:leading-[27.98px] lg:gap-[40.29px] items-center">
                    <li>
                      <Link to="/my-tickets">My Tickets</Link>
                    </li>
                    <li>
                      <Link to="/my-events">Manage Events</Link>
                    </li>
                    <li>
                      <Link to="/faqs">Need Help?</Link>
                    </li>
                  </ul>
                  <div className="z-10 flex justify-end flex-1 lg:pr-4">
                    <ConnectWallet />
                  </div>
                </div>
              </nav>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/create-event" element={<CreateEvent />} />
                <Route element={<EventDisplay />} path="/events/:contract" />
                <Route element={<MyTickets />} path="/my-tickets" />
                <Route element={<ManageEvents />} path="/my-events" />
              </Routes>
            </div>
          </div>
        </Web3Boot>
      </ScrollToTop>
    </Router>
  );
}

export default App;

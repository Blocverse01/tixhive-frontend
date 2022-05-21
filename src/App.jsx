import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import CreateEvent from "./CreateEvent";
import ConnectWallet from "components/auth/moralis/ConnectWalletWithWeb3Auth";
import Web3Boot from "components/Web3Boot";
import ScrollToTop from "ScrollToTop";
import EventDisplay from "components/EventDisplay";
import ManageEvents from "./ManageEvents";
import MyTickets from "MyTickets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useState } from "react";
import TicketInfoPage from "./components/TicketInfoPage";
import blocTixLogo from "images/bloctix-b.png";

function App() {
  const [navOpen, setNavOpen] = useState(false);
  const navOpenClasses =
    "fixed text-[14px] leading-[21px] right-0 z-[9999] pt-[20.48px] top-0 h-[379px] backdrop-blur-2xl bg-brand-red w-[195px] px-[34px]";
  const navClasses =
    "flex transition ease-in-out flex-col lg:flex-row appearance-none lg:font-[500] lg:text-[14.65px] lg:leading-[27.98px] gap-[32px] lg:gap-[40.29px] lg:items-center";

  return (
    <Router>
      <ScrollToTop>
        <Web3Boot>
          <div className="relative bg-brand-black font-poppins">
            <div className="max-w-[1728px] mx-auto">
              <nav className="pt-[25px] z-50 lg:pt-[45px] px-5 sm:px-10 lg:px-8">
                <div className="flex items-center text-white lg:px-10">
                  <div className={"lg:hidden z-50"}>
                    <ConnectWallet />
                  </div>
                  <Link className={"z-50 hidden items-center lg:flex"} to="/">
                    <img
                      src={blocTixLogo}
                      className="mr-2 h-[45px] xl:h-[50px]"
                      alt="BlocTix Logo"
                    />
                    <h3 className="lg:mr-[79px] lg:font-[500] lg:text-[25px] xl:text-[30px] lg:leading-[45px]">
                      BlocTix
                    </h3>
                  </Link>
                  <ul
                    className={`${
                      navOpen ? navOpenClasses : "w-0 h-0 overflow-hidden"
                    } lg:w-auto lg:h-auto lg:overflow-auto ${navClasses}`}
                  >
                    <li
                      className={`lg:hidden ${
                        navOpen ? "" : "hidden"
                      } absolute right-[20.48px] top-[20.48px]`}
                    >
                      <button
                        onClick={() => setNavOpen(false)}
                        className={"lg:hidden bg-none"}
                      >
                        <FontAwesomeIcon
                          icon={solid("times")}
                          className={"text-2xl"}
                        />
                      </button>
                    </li>
                    <li
                      onClick={() => setNavOpen(false)}
                      className={"mt-[42.48px] lg:mt-0"}
                    >
                      <Link to="/">Home</Link>
                    </li>
                    <li onClick={() => setNavOpen(false)}>
                      <Link to="/my-tickets">My Tickets</Link>
                    </li>
                    <li onClick={() => setNavOpen(false)}>
                      <Link to="/my-events">Manage Events</Link>
                    </li>
                    <li onClick={() => setNavOpen(false)}>
                      <Link to="/faqs">Need Help?</Link>
                    </li>
                  </ul>
                  <div className="z-10 flex justify-end flex-1 lg:pr-4">
                    <div className={"hidden lg:block"}>
                      <ConnectWallet />
                    </div>
                    <button
                      onClick={() => setNavOpen(true)}
                      className={"lg:hidden z-50 btn"}
                    >
                      <FontAwesomeIcon icon={solid("bars")} />
                    </button>
                  </div>
                </div>
              </nav>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/create-event" element={<CreateEvent />} />
                <Route element={<EventDisplay />} path="/events/:contract" />
                <Route element={<MyTickets />} path="/my-tickets" />
                <Route element={<ManageEvents />} path="/my-events" />
                <Route
                  element={<TicketInfoPage />}
                  path={"/:contract/tickets/:purchase"}
                />
              </Routes>
            </div>
          </div>
        </Web3Boot>
      </ScrollToTop>
    </Router>
  );
}

export default App;

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
import blocTixLogo from "images/tixhive-logo.min.svg";
import { useRecoilValue } from "recoil";
import { walletCryptoBalanceState } from "recoil/atoms/wallet";
import { convertBalanceToEther } from "utils/web3-utils";
import { useMoralis } from "react-moralis";
import useNetworkStatus from "hooks/useNetworkStatus";
import Wallet from "components/Wallet";
import EventsPage from "EventsPage";

function App() {
  const [navOpen, setNavOpen] = useState(false);
  const { maticBalance } = useRecoilValue(walletCryptoBalanceState);
  const { isPolygon, switchToPolygon } = useNetworkStatus();
  const { user } = useMoralis();
  const navOpenClasses =
    "fixed text-[14px] leading-[21px] right-0 z-[9999] pt-[20.48px] top-0 h-[379px] backdrop-blur-2xl bg-brand-red w-[195px] px-[34px]";
  const navClasses =
    "flex transition ease-in-out flex-col lg:flex-row appearance-none lg:font-[500] lg:text-[14.65px] lg:leading-[22.13px] gap-[32px] lg:gap-[21.21px] lg:items-center";

  return (
    <Router>
      <ScrollToTop>
        <Web3Boot>
          <Wallet />
          <div className="relative text-white bg-brand-black">
            <div className="max-w-[1728px] mx-auto">
              <nav className="pt-[25px] z-50 lg:pt-[45px] px-5 sm:px-10 lg:px-8 font-poppins">
                <div className="flex items-center text-white lg:px-10">
                  <div className={"lg:hidden z-50"}>
                    <ConnectWallet />
                  </div>
                  <Link className={"z-50 hidden items-center lg:flex"} to="/">
                    <img
                      src={blocTixLogo}
                      className="mr-2 h-[45px] xl:h-[50px]"
                      alt="TixHive Logo"
                    />
                    <h3 className="lg:mr-[66.17px] lg:font-[500] lg:text-[22.71px] lg:leading-[28.62px]">
                      TixHive
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
                      <Link to="/">Create an Event</Link>
                    </li>
                    <li onClick={() => setNavOpen(false)}>
                      <Link to="/my-tickets">My Tickets</Link>
                    </li>
                    <li onClick={() => setNavOpen(false)}>
                      <Link to="/my-events">Manage Events</Link>
                    </li>
                    <li onClick={() => setNavOpen(false)}>
                      <Link to="/events">Buy Tickets</Link>
                    </li>
                    <li onClick={() => setNavOpen(false)}>
                      <Link to="/faqs">Need Help?</Link>
                    </li>
                  </ul>
                  <div className="z-10 flex items-center justify-end flex-1 lg:pr-4">
                    {user ? (
                      <div>
                        {isPolygon ? (
                          <div className="text-sm padded-btn sm:text-base bg-black-gradient">
                            <span className="">
                              {convertBalanceToEther(maticBalance)}
                            </span>
                            <span className=""> MATIC</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => switchToPolygon()}
                            className="py-3 text-xs padded-btn sm:text-base bg-black-gradient"
                          >
                            Switch to Polygon
                          </button>
                        )}
                      </div>
                    ) : (
                      ""
                    )}
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
                <Route exact path="/events" element={<EventsPage />} />
              </Routes>
            </div>
          </div>
        </Web3Boot>
      </ScrollToTop>
    </Router>
  );
}

export default App;

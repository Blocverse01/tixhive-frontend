import { Link } from "react-router-dom";
import blocTixLogo2 from "images/logo2.min.svg";
import twitter from "images/twitter.min.svg";
import linkedln from "images/linkedln.min.svg";
import instagram from "images/IG.min.svg";
import youtube from "images/youtube.svg";

import WatchVideo from "./WatchVideo";

function Footer() {
  return (
    <div className="relative z-1">
      <section className="justify-around px-5 py-20 md:py-32 padding md:flex margin bg-brand-red">
        <div className="h-96 md:w-[400px]">
          <p className="header2">Hassle-free event management for everyone.</p>
          <div className="xl:flex mx-auto md:w-[400px] mt-12 md:mt-10 text">
            <Link
              className="bg-brand-black text block w-fit padded-btn xl:mr-[13.81px] lighter-black"
              to="/create-event"
            >
              Create an Event
            </Link>
            <WatchVideo />
          </div>

          <div className="flex mt-10 md:mt-32">
            <img className="w-10 h-12" alt="" src={blocTixLogo2} />
            <p className="ml-5 font-sora header2">TixHive</p>
          </div>
        </div>
        <div className="md:h-96 md:w-[300px] ">
          <p className="header2">About</p>
          <p className="mt-2 text2 md:mt-5">
            TixHive is a product of BlocVerse, a Blockchain and Web3 Company
            leveraging the blockchain and its opportunities to bring value to
            the ecosystem.
          </p>

          <div className="">
            <p className="mt-16 header2 md:mt-40">Socials</p>
            <div className="flex justify-between mx-auto mt-5 xl:justify-start md:w-48 md:mx-0">
              <a href="https://mobile.twitter.com/TixHive" className="social-icons xl:mr-[14.86px]">
                <img
                  src={twitter}
                  alt="twitter"
                  className="w-8 h-8 md:h-8 md:w-8 xl:w-[22px] xl:h-[18px]"
                />
              </a>
              <a href="https://youtube.com/channel/UCSwXfu1DAfzrpSqeo4MYtyQ" className="social-icons xl:mr-[14.86px]">
                <img
                  src={youtube}
                  alt="youtube"
                  className="w-8 h-8 md:h-8 md:w-8 xl:w-[17.8px] xl:h-[20.5px]"
                />
              </a>
              <a href="https://www.linkedin.com/company/81568150/" className="social-icons xl:mr-[14.86px]">
                <img
                  src={linkedln}
                  alt="linkedin"
                  className="w-8 h-8 md:h-8 md:w-8 xl:w-[21px] xl:h-[21px]"
                />
              </a>
              <a href="https://www.instagram.com/p/CbgniZOquQV/?igshid=YmMyMTA2M2Y=" className="social-icons">
                <img
                  src={instagram}
                  alt="instagram"
                  className="w-8 h-8 md:h-8 md:w-8 xl:w-[21px] xl:h-[21px]"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="h-96 hidden w-[300px] justify-around xl:flex flex-col  ">
          <p className="header2">Links</p>

          <p className="text2">
            <Link to="/">Home</Link>
          </p>
          <p className="text2">
            <Link to="/create-event">Create an Event</Link>
          </p>
          <p className="text2">
            <Link to="/my-tickets">My Tickets</Link>
          </p>
          <p>
            <Link to="/my-events">Manage Events</Link>
          </p>
          <p>
            <Link to="/events">Buy Tickets</Link>
          </p>
          <p className="text2">
            <Link to="/faqs">Need Help?</Link>
          </p>
        </div>
      </section>
    </div>
  );
}

export default Footer;

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import tw from "images/tw.svg";
import metamask from "images/metamask.svg";
import sec from "images/confetti.png";
import Tilt from "react-parallax-tilt";
import ticket from "images/ticket-1.png";
import ticket2 from "images/analytics-chart.png";
import ticket3 from "images/ticket-3.png";
import coin98 from "images/coin98.svg";

function Home() {
  return (
    <div>
      <section className="relative margin xl:h-screen md:px-0 padding2">
        <img
          src={sec}
          className="z-0 absolute top-[4rem] lg:-top-28 md:top-2 xl:top-[3.7rem] xl:bottom-0 left-0 right-0 w-full"
          alt="background"
        />
        <div className="relative z-1">
          <h1 className="text-center text-bold header mx-auto md:w-[600px] xl:w-[708px]">
            The easiest way to earn forever on your events.
          </h1>
          <p className="mx-auto text-center mt-10 md:w-[400px] xl:w-[377.63px] text">
            Make your events come to life with NFT-based ticketing.
          </p>
          <div className="flex flex-col md:flex-row md:justify-between xl:justify-center md:mx-auto md:w-[400px] mt-12 md:mt-10 w-fit text">
            <Link
              className="bg-brand-red text padded-btn darker-red xl:mr-[18.29px]"
              to="/create-event"
            >
              Create an Event
            </Link>
            <Link
              to="/events"
              className="mt-5 border-btn bgblack-gradient md:mt-0 text padded-btn"
            >
              <FontAwesomeIcon className="mr-1" icon={solid("search")} />{" "}
              Explore Events
            </Link>
          </div>
        </div>
      </section>

      <section className=" margin xl:mt-0  xl:h-[600px] bg-brand-red py-32 padding md:justify-between  md:flex md:items-center">
        <div className=" px-5 md:px-0 md:w-[300px] xl:w-[500px]">
          <p className="header">Enjoy cross-platform ticket sales.</p>
          <p className="mt-5 text2">
            Earn more in royalties every time your ticket gets sold on NFT
            marketplaces like OpenSea and Rarible.
          </p>
        </div>
        <div className=" w-[300px] h-48 mx-auto md:mx-0 mt-10 md:mt-10 md:w-[300px] md:h-48   xl:w-[600px] xl:h-96  rounded-3xl  dummy-box">
          <Tilt
            glareMaxOpacity={0.9}
            glareColor="lightblue"
            glarePosition="all"
          >
            <img
              src={ticket}
              className="assets xl:-ml-12 xl:-mt-10 xl:h-[32rem]"
              alt="asset"
            />
          </Tilt>
        </div>
      </section>

      <section className="mt-10 xl:mt-32 xl:pb-[7rem] padding md:justify-between md:flex md:items-center">
        <div className="px-5 order-2  md:px-0 md:w-[300px] xl:w-[500px]">
          <p className="header">A 100% control on ticket sales.</p>
          <p className="mt-5 text2">
            Get instant payout on ticket sales, monitor sales analytics and
            enjoy transparent ticketing you can trust, powered by Smart
            Contracts.
          </p>
        </div>
        <div className=" w-[300px] h-48 mx-auto md:mx-0 mt-10 md:mt-10 md:w-[300px] md:h-48 xl:w-[600px] xl:h-96  rounded-3xl dummy-box">
          <Tilt
            glareMaxOpacity={0.9}
            glareColor="lightblue"
            glarePosition="all"
          >
            <img
              src={ticket2}
              className="assets h-[12rem] xl:h-[35rem] relative xl:-mt-[4rem] xl:-ml-7"
              alt="asset"
            />
          </Tilt>
        </div>
      </section>

      <div className="py-16 margin bg-brand-red">
        <section className="padding xl:pb-[4rem] xl:pt-[1.5rem] md:justify-between md:flex md:items-center">
          <div className="px-5 md:px-0 md:w-[300px] xl:w-[500px]">
            <p className="header">Follow-up and reward your attendees.</p>
            <p className="mt-5 text2">
              You get the chance to airdrop POAPs or tokens, and a lot of
              exclusive benefits for your attendees.
            </p>
          </div>
          <div className=" w-[300px] h-48 mx-auto md:mx-0 mt-10 md:mt-10 md:w-[300px] md:h-48 xl:w-[600px] xl:h-96  rounded-3xl  dummy-box">
            <Tilt
              glareMaxOpacity={0.9}
              glareColor="lightblue"
              glarePosition="all"
            >
              <img
                src={ticket3}
                className="assets xl:h-[36rem] relative xl:left-10  -top-10 xl:top-0 xl:-mt-28 xl:-ml-10 "
                alt="asset"
              />
            </Tilt>
          </div>
        </section>
      </div>

      <section className="margin padding md:justify-between md:flex md:items-center">
        <div className="px-5 md:px-0 md:w-[300px] xl:w-[500px]">
          <p className="header">Technologies Supported.</p>
          <p className="mt-5 text2">
            Our ticketing solution is built on the Polygon (MATIC) Blockchain,
            where it currently functions, although we are seeking to expand and
            make it completely cross chain. As a result, all transactions and
            fees will be paid in MATIC.
          </p>
        </div>
        <div className=" md:w-[300px] xl:w-[600px] px-5 md:px-0 mt-10">
          <p className="header">Recommended DApps on Mobile.</p>
          <div className=" flex mt-10 w-[300px] justify-around">
            <img className="" alt="" src={tw} />
            <img className="" alt="" src={metamask} />
            <img className="" alt="" src={coin98} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;

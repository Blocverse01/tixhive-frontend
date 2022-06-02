import { Link } from "react-router-dom";
import Footer from "./components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import tw from "images/tw.svg";
import metamask from "images/metamask.svg";
import sec from "images/bg-sec-1.png";
import Tilt from "react-parallax-tilt";

import ticket from "images/ticket-1.png";
import ticket2 from "images/ticket-2.png";
import ticket3 from "images/ticket-3.png";
import coin98 from "images/coin98.svg";

function Home() {
  return (
    <div>
      <section className='  relative bg-contain bg-bottom xl:bg-center bg-no-repeat  margin xl:h-screen md:px-0 padding2'>
        <img
          src={sec}
          className=' z-0 absolute top-[13rem] lg:-top-28 md:top-2 xl:top-0 left-0 right-0'
          alt='background'
        />
        <div className='z-1 relative auth-modal2 '>
          <h1 className='  text-center  text-bold header mx-auto md:w-[600px] xl:w-[1200px]'>
            Hassle-free event management for everyone.
          </h1>
          <p className='mx-auto md:text-center mt-10 md:w-[400px] xl:w-[410px] text2'>
            Create events, then create tickets for your event. Monitor sales,
            receive payments, verify tickets - all in one place.
          </p>
          <div className='md:flex justify-between mx-auto md:w-[400px] mt-12 md:mt-10  text'>
            <Link
              className='bg-brand-red text padded-btn darker-red  '
              to='/create-event'
            >
              Create an Event
            </Link>
            <button className='bgblack-gradient mt-10 md:mt-0 text padded-btn'>
              <FontAwesomeIcon className='mr-1' icon={regular("circle-play")} />{" "}
              Watch Video
            </button>
          </div>
        </div>
      </section>

      <section className=' margin xl:mt-0  xl:h-[600px] bg-brand-red py-32 padding md:justify-between  md:flex md:items-center'>
        <div className=' px-5 md:px-0 md:w-[300px] xl:w-[500px]'>
          <p className='header'>Create your dream event in minutes.</p>
          <p className=' mt-5 text2'>
            A simple step-by-step guided process where you set up your event
            name, date, time and venue. These details are editable, and take a
            few minutes.
          </p>
        </div>
        <div className=' w-[300px] h-48 mx-auto md:mx-0 mt-10 md:mt-10 md:w-[300px] md:h-48   xl:w-[600px] xl:h-96  rounded-3xl  dummy-box'>
          <Tilt
            glareMaxOpacity={0.9}
            glareColor='lightblue'
            glarePosition='all'
          >
            <img
              src={ticket}
              className='   assets xl:-ml-12 xl:-mt-10 xl:h-[32rem]  '
              alt='asset'
            />
          </Tilt>
        </div>
      </section>

      <section className=' mt-10 xl:mt-32 padding md:justify-between  md:flex md:items-center'>
        <div className='px-5 order-2  md:px-0 md:w-[300px] xl:w-[500px]'>
          <p className='header'>Track your ticket sales on the go.</p>
          <p className=' mt-5 text2'>
            Your event dashboard has all the details on the tickets sold, total
            revenue generated and more. As an added bonus, you get notified
            whenever you make a sale!
          </p>
        </div>
        <div className=' w-[300px] h-48 mx-auto md:mx-0 mt-10 md:mt-10 md:w-[300px] md:h-48 xl:w-[600px] xl:h-96  rounded-3xl  dummy-box'>
          <Tilt
            glareMaxOpacity={0.9}
            glareColor='lightblue'
            glarePosition='all'
          >
            <img
              src={ticket2}
              className='assets xl:h-[36rem] relative  -top-10 xl:top-0 xl:-mt-28 xl:-ml-10 '
              alt='asset'
            />
          </Tilt>
        </div>
      </section>

      <div className='py-16 margin bg-brand-red'>
        <section className=' padding md:justify-between  md:flex md:items-center'>
          <div className='px-5 md:px-0 md:w-[300px] xl:w-[500px]'>
            <p className='header'>Follow-up and reward your attendees.</p>
            <p className=' mt-5 text2'>
              You get the chance to airdrop POAPs or tokens, give discounts on
              your next event, and a lot of exclusive benefits for your
              attendees.
            </p>
          </div>
          <div className=' w-[300px] h-48 mx-auto md:mx-0 mt-10 md:mt-10 md:w-[300px] md:h-48 xl:w-[600px] xl:h-96  rounded-3xl  dummy-box'>
            <Tilt
              glareMaxOpacity={0.9}
              glareColor='lightblue'
              glarePosition='all'
            >
              <img
                src={ticket3}
                className='assets xl:h-[36rem] relative xl:left-10  -top-10 xl:top-0 xl:-mt-28 xl:-ml-10 '
                alt='asset'
              />
            </Tilt>
          </div>
        </section>
      </div>

      <section className='margin padding md:justify-between  md:flex md:items-center'>
        <div className='px-5 md:px-0 md:w-[300px] xl:w-[500px]'>
          <p className='header'>Technologies Supported.</p>
          <p className=' mt-5 text2'>
            Our ticketing solution is built on the Polygon (MATIC) Blockchain,
            where it currently functions, although we are seeking to expand and
            make it completely cross chain. As a result, all transactions and
            fees will be paid in MATIC.
          </p>
        </div>
        <div className=' md:w-[300px] xl:w-[600px] px-5 md:px-0 mt-10'>
          <p className='header'>Recommended DApps on Mobile.</p>
          <div className=' flex mt-10 w-[300px] justify-around'>
            <img className='' alt='' src={tw} />
            <img className='' alt='' src={metamask} />
            <img className='' alt='' src={coin98} />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;

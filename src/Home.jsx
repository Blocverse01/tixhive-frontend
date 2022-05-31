import { Link } from "react-router-dom";
import Footer from "./components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import tw from "images/tw.svg";
import metamask from "images/metamask.svg";
import sfp from "images/sfp.svg";

function Home() {
  return (
    <div>
      <section className='margin'>
        <h1 className=' text-center a text-bold header mx-auto w-[1200px]'>
          Hassle-free event management for everyone.
        </h1>
        <p className='mx-auto text-center mt-10 w-[410px] text2'>
          Create events, then create tickets for your event. Monitor sales,
          receive payments, verify tickets - all in one place.
        </p>
        <div className='md:flex justify-between mx-auto md:w-[400px] mt-10  text'>
          <Link
            className='bg-brand-red text padded-btn darker-red  '
            to='/create-event'
          >
            Create an Event
          </Link>
          <button className='bgblack-gradient text padded-btn'>
            <FontAwesomeIcon className='mr-1' icon={regular("circle-play")} />{" "}
            Watch Video
          </button>
        </div>
      </section>

      <section className='md:flex justify-around bg-brand-red h-96 w-full margin md:items-center padding'>
        <button>
          <div className='h-60 w-60  bg-black   box'></div>
          <p className='text-center mt-3 text'>Create</p>
        </button>
        <button>
          <div className='h-60 w-60 bg-black  box'></div>
          <p className='text-center mt-3 text'>Choose</p>
        </button>
        <button>
          <div className='h-60 w-60  bg-black box'></div>
          <p className='text-center mt-3 text'>Track</p>
        </button>
        <button>
          <div className='h-60 w-60 bg-black  box'></div>
          <p className='text-center mt-3 text'>Follow-up</p>
        </button>
      </section>

      <section className='margin padding md:justify-between  md:flex md:items-center'>
        <div className='w-[500px]'>
          <p className='header'>Create your dream event in minutes.</p>
          <p className=' mt-5 text2'>
            A simple step-by-step guided process where you set up your event
            name, date, time and venue. These details are editable, and take a
            few minutes.
          </p>
        </div>
        <div className='w-[600px] h-96 bg rounded-3xl  dummy-box'></div>
      </section>
      <section className='margin padding md:justify-between  md:flex md:items-center'>
        <div className='w-[500px]'>
          <p className='header'>Choose a ticketing type that fits you.</p>
          <p className=' mt-5 text2'>
            Whether you want your event tickets to be free, paid, donation based
            - or even a combination of all three, it’s all up to you.
          </p>
        </div>
        <div className='w-[600px] h-96 bg rounded-3xl  dummy-box'></div>
      </section>
      <section className='margin padding md:justify-between  md:flex md:items-center'>
        <div className='w-[500px]'>
          <p className='header'>Track your ticket sales on the go.</p>
          <p className=' mt-5 text2'>
            Your event dashboard has all the details on the tickets sold, total
            revenue generated and more. As an added bonus, you get notified
            whenever you make a sale!
          </p>
        </div>
        <div className='w-[600px] h-96 bg rounded-3xl  dummy-box'></div>
      </section>
      <div className='py-16 margin bg-brand-red'>
        <section className=' padding md:justify-between  md:flex md:items-center'>
          <div className='w-[500px]'>
            <p className='header'>Follow-up and reward your attendees.</p>
            <p className=' mt-5 text2'>
              You get the chance to airdrop POAPs or tokens, give discounts on
              your next event, and a lot of exclusive benefits for your
              attendees.
            </p>
          </div>
          <div className='w-[600px] h-96 bg rounded-3xl  dummy-box'></div>
        </section>
      </div>

      <section className='margin padding md:justify-between  md:flex md:items-center'>
        <div className='w-[500px]'>
          <p className='header'>Technologies Supported.</p>
          <p className=' mt-5 text2'>
            Our ticketing solution is built on the Polygon (MATIC) Blockchain,
            where it currently functions, although we are seeking to expand and
            make it completely cross chain. As a result, all transactions and
            fees will be paid in MATIC.
          </p>
        </div>
        <div className='w-[600px] '>
          <p className='header'>Recommended DApps on Mobile.</p>
          <div className=' flex mt-10 w-[300px] justify-around'>
            <img className='' alt='' src={tw} />
            <img className='' alt='' src={metamask} />
            <img className='' alt='' src={sfp} />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;

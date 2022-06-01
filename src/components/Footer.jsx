import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import blocTixLogo2 from "images/logo2.min.svg";
import twitter from "images/twitter.min.svg";
import linkedln from "images/linkedln.min.svg";
import instagram from "images/IG.min.svg";
import tiktok from "images/tictok.min.svg";

function Footer() {
  return (
    <div>
      <section className=' py-20 md:py-32  padding justify-around md:flex px-5  margin bg-brand-red '>
        <div className='h-96 md:w-[400px]  '>
          <p className='header2'>Hassle-free event management for everyone.</p>
          <div className='xl:flex justify-between mx-auto md:w-[400px] mt-12 md:mt-10  text'>
            <Link
              className='bg-brand-black text block w-fit padded-btn lighter-black  '
              to='/create-event'
            >
              Create an Event
            </Link>
            <button className='md:mt-5 bgblack-gradient block mt-10 lg:mt-0 text padded-btn border'>
              <FontAwesomeIcon className='mr-1' icon={regular("circle-play")} />{" "}
              Watch Video
            </button>
          </div>

          <div className='flex mt-10 md:mt-32'>
            <img className=' w-10 h-12' alt='' src={blocTixLogo2} />
            <p className='font-sora ml-5  header2'>TixHive</p>
          </div>
        </div>
        <div className='md:h-96 md:w-[300px] '>
          <p className='header2'>About</p>
          <p className='text2 mt-2 md:mt-5'>
            TixHive is a product of BlocVerse, a Blockchain and Web3 Company
            leveraging the blockchain and its opportunities to bring value to
            the ecosystem.
          </p>

          <div className=''>
            <p className='header2 mt-16 md:mt-40'>Socials</p>
            <div className=' flex mt-5 justify-around md:w-48 mx-auto md:mx-0'>
              <a href='/' className='social-icons'>
                <img
                  src={twitter}
                  alt='twitter'
                  className='w-12 h-12 md:h-8 md:w-8'
                />
              </a>
              <a href='/' className='social-icons'>
                <img
                  src={tiktok}
                  alt='twitter'
                  className='w-12 h-12 md:h-8 md:w-8'
                />
              </a>
              <a href='/' className='social-icons'>
                <img
                  src={linkedln}
                  alt='twitter'
                  className='w-12 h-12 md:h-8 md:w-8'
                />
              </a>
              <a href='/' className='social-icons'>
                <img
                  src={instagram}
                  alt='twitter'
                  className='w-12 h-12 md:h-8 md:w-8'
                />
              </a>
            </div>
          </div>
        </div>
        <div className='h-96 hidden w-[300px] justify-around xl:flex flex-col  '>
          <p className='header2'>Links</p>

          <p className='text2'>
            <Link to='/'>Home</Link>
          </p>
          <p className='text2'>
            <Link to='/my-tickets '>My Tickets</Link>
          </p>
          <p>
            <Link to='/my-events'>Manage Events</Link>
          </p>
          <p className='text2'>
            <Link to='/faqs'>Need Help?</Link>
          </p>
        </div>
      </section>
    </div>
  );
}

export default Footer;

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
      <section className='py-32 padding justify-around flex margin bg-brand-red '>
        <div className='h-96 w-[400px] '>
          <p className='header2'>Hassle-free event management for everyone.</p>
          <div className='md:flex justify-between  md:w-[340px] mt-10  text'>
            <Link
              className='bg-brand-black text2 padded-btn lighter-black'
              to='/create-event'
            >
              Create an Event
            </Link>
            <button className='bgblack-gradient text2 border padded-btn'>
              <FontAwesomeIcon className='mr-1' icon={regular("circle-play")} />{" "}
              Watch Video
            </button>
          </div>

          <div className='flex mt-32'>
            <img className=' w-10 h-12' alt='' src={blocTixLogo2} />
            <p className='font-sora ml-5  header2'>TixHive</p>
          </div>
        </div>
        <div className='h-96 w-[400px] '>
          <p className='header2'>About</p>
          <p className='text2 mt-5'>
            TixHive is a product of BlocVerse, a Blockchain and Web3 Company
            leveraging the blockchain and its opportunities to bring value to
            the ecosystem.
          </p>

          <div className=''>
            <p className='header2 mt-40'>Socials</p>
            <div className=' flex mt-5 justify-around w-32'>
              <a href='/' className='social-icons'>
                <img src={twitter} alt='twitter' className='' />
              </a>
              <a href='/' className='social-icons'>
                <img src={tiktok} alt='twitter' className='' />
              </a>
              <a href='/' className='social-icons'>
                <img src={linkedln} alt='twitter' className='' />
              </a>
              <a href='/' className='social-icons'>
                <img src={instagram} alt='twitter' className='' />
              </a>
            </div>
          </div>
        </div>
        <div className='h-96 w-[300px] justify-around flex flex-col  '>
          <p className='header2'>Links</p>

          <p className='text2'>
            <Link to='/'>Home</Link>
          </p>
          <p>
            <Link to='/my-tickets'>My Tickets</Link>
          </p>
          <p>
            <Link to='/my-events'>Manage Events</Link>
          </p>
          <p>
            <Link to='/faqs'>Need Help?</Link>
          </p>
        </div>
      </section>
    </div>
  );
}

export default Footer;

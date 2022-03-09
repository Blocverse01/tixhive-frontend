import eventCover from "images/unsplash_nwLTVwb7DbU.png";
import eventCover2 from "images/pexels-teddy-yang-2263436.jpg";
import eventCover3 from "images/pexels-caio-59884.jpg";
import eventCover4 from "images/pexels-jonas-von-werne-2897462.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular, solid } from "@fortawesome/fontawesome-svg-core/import.macro";

function Events() {
  return (
    <section className="pb-12 pt-28 px-5 sm:px-6 lg:px-8">
      <div className="lg:px-10">
        <div className="relative text-white focus-within:text-gray-200">
          <span className="absolute inset-y-0 left-[20px] flex items-center pl-2">
            <button
              type="submit"
              className="p-1 focus:outline-none focus:shadow-outline"
            >
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="w-5 h-5"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </span>
          <input
            type="search"
            name="q"
            className="w-full bg-input-gradient btn-border h-[45px] placeholder-white text-sm text-white pl-[70px] pr-2 focus:outline-none focus:bg-gray-900 focus:text-white"
            placeholder="Search Events"
            autoComplete="off"
          />
        </div>

        <div className="flex mt-6 justify-start flex-wrap gap-2">
          <button className="h-[45px] shadow-sm px-5 flex items-center justify-center bg-brand-red text-white lg:text-[18px] lg:leading-[37.5px]">
            For You
          </button>
          <button className="h-[45px] shadow-sm px-5 bg-brand-black2 flex items-center justify-center text-white lg:text-[18px] lg:leading-[37.5px]">
            Tech
          </button>
          <button className="h-[45px] shadow-sm px-5 bg-brand-black2 flex items-center justify-center text-white lg:text-[18px] lg:leading-[37.5px]">
            Music
          </button>
          <button className="h-[45px] shadow-sm px-5 bg-brand-black2 flex items-center justify-center text-white lg:text-[18px] lg:leading-[37.5px]">
            Virtual
          </button>
        </div>

        <section className="xl:grid-cols-4 mt-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[31px]">
          <div>
            <div className="relative">
              <img
                src={eventCover}
                alt="cover"
                class="w-full h-[220px] sm:h-[195px] object-cover"
              />
              <div className="absolute bg-black bg-opacity-30 py-1 px-2 top-[17px] right-[17px]">
                <FontAwesomeIcon
                  icon={regular("heart")}
                  className="text-white text-2xl cursor-pointer"
                />
              </div>
            </div>
            <div className="bg-event-gradient text-white py-[24px] px-[20px]">
              <div className="flex justify-end">
                <div className="bg-brand-black z-10 text-[19px] leading-[28.92px] py-1 h-[36.81px] px-3 text-white -mr-[3px] -mt-[44px]">
                  $23
                </div>
              </div>
              <h3 className="text-[18px] leading-[28.92px] font-[500]">
                Abakaliki BlocSummit
              </h3>
              <p className="text-[14px] leading-[23.66px] font-[500]">
                Tues, Mar. 12; 10:00AM EST Agon Place, Mile 50, Abakaliki
              </p>
              <h3 className="text-[14px] leading-[23.66px] font-[500]">
                Host: BlocVerse
              </h3>
            </div>
          </div>

          <div>
            <div className="relative">
              <img
                src={eventCover2}
                alt="cover"
                class="w-full h-[220px] sm:h-[195px] object-cover"
              />
              <div className="absolute bg-black bg-opacity-30 py-1 px-2 top-[17px] right-[17px]">
                <FontAwesomeIcon
                  icon={regular("heart")}
                  className="text-white text-2xl cursor-pointer"
                />
              </div>
            </div>
            <div className="bg-event-gradient text-white py-[24px] px-[20px]">
              <div className="flex justify-end">
                <div className="bg-brand-black z-10 text-[19px] leading-[28.92px] py-1 h-[36.81px] px-3 text-white -mr-[3px] -mt-[44px]">
                  $500
                </div>
              </div>
              <h3 className="text-[18px] leading-[28.92px] font-[500]">
                Get Cavvy 2.0
              </h3>
              <p className="text-[14px] leading-[23.66px] font-[500]">
                Mon, Apr. 14; 11:00AM EST Agon Place, Mile 50, Enugu
              </p>
              <h3 className="text-[14px] leading-[23.66px] font-[500]">
                Host: Cavemen
              </h3>
            </div>
          </div>

          <div>
            <div className="relative">
              <img
                src={eventCover3}
                alt="cover"
                class="w-full h-[220px] sm:h-[195px] object-cover"
              />
              <div className="absolute bg-black bg-opacity-30 py-1 px-2 top-[17px] right-[17px]">
                <FontAwesomeIcon
                  icon={regular("heart")}
                  className="text-white text-2xl cursor-pointer"
                />
              </div>
            </div>
            <div className="bg-event-gradient text-white py-[24px] px-[20px]">
              <div className="flex justify-end">
                <div className="bg-brand-black z-10 text-[19px] leading-[28.92px] py-1 h-[36.81px] px-3 text-white -mr-[3px] -mt-[44px]">
                  $900
                </div>
              </div>
              <h3 className="text-[18px] line-clamp-1 truncate leading-[28.92px] font-[500]">
                Bored Ape Yatch Club Hangout
              </h3>
              <p className="text-[14px] leading-[23.66px] font-[500]">
                Mon, Apr. 14; 11:00AM EST Virtual, Metaverse
              </p>
              <h3 className="text-[14px] leading-[23.66px] font-[500]">
                Host: BAYC
              </h3>
            </div>
          </div>

          <div>
            <div className="relative">
              <img
                src={eventCover4}
                alt="cover"
                class="w-full h-[220px] sm:h-[195px] object-cover"
              />
              <div className="absolute bg-black bg-opacity-30 py-1 px-2 top-[17px] right-[17px]">
                <FontAwesomeIcon
                  icon={regular("heart")}
                  className="text-white text-2xl cursor-pointer"
                />
              </div>
            </div>
            <div className="bg-event-gradient text-white py-[24px] px-[20px]">
              <div className="flex justify-end">
                <div className="bg-brand-black z-10 text-[19px] leading-[28.92px] py-1 h-[36.81px] px-3 text-white -mr-[3px] -mt-[44px]">
                  $1000
                </div>
              </div>
              <h3 className="text-[18px] line-clamp-1 truncate leading-[28.92px] font-[500]">
                Night of Colours
              </h3>
              <p className="text-[14px] leading-[23.66px] font-[500]">
                Fri, Apr. 17; 12:00AM EST Virtual, ColourVerse
              </p>
              <h3 className="text-[14px] leading-[23.66px] font-[500]">
                Host: ColourVerse Inc.
              </h3>
            </div>
          </div>
        </section>
        <div className="flex pt-[98px] pb-[40px] justify-center">
          <button className="see-more-btn px-[35px] lg:text-[22px] lg:leading-[37.5px] font-[400] h-[65px] flex items-center justify-center text-white">
            <span>
              See More
              <FontAwesomeIcon
                icon={solid("chevron-right")}
                className="ml-[22px]"
              />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
export default Events;

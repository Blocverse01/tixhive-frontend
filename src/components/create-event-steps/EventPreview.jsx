import React, { useState } from "react";
import { default as Ticket } from "components/DefaultTicketDesign";
import QRCode from "react-qr-code";
import moment from "moment";
import { useRecoilValue } from "recoil";
import { newEventState } from "recoil/atoms/newEvent";
import { leastTicketPriceState } from "recoil/atoms/newTickets";
import EventPublisher from "components/EventPublisher";

export default function EventPreview({ handleChange }) {
  const lowestTicketCost = useRecoilValue(leastTicketPriceState);
  const event = useRecoilValue(newEventState);
  const dateGenerated = moment(event.start_date + " " + event.start_time);
  const [QrCode, setQrCode] = useState("");
  const localDateGenerated =
    dateGenerated.local().format("hA") +
    " " +
    String(dateGenerated.local()._d).split(" ")[5];
  const getImageFromQRCode = (event) => {
    const svg = document.getElementById("QRCode");
    const svgData = new XMLSerializer().serializeToString(svg);
    setQrCode(`data:image/svg+xml;base64,${btoa(svgData)}`);
  };
  React.useEffect(() => {
    getImageFromQRCode();
  });
  return (
    <section className='relative'>
      <div>
        <div className='hidden'>
          <QRCode id='QRCode' value={event.name + " - Ticket Preview"} />
        </div>
        <Ticket
          eventHost={event.host}
          eventName={event.name}
          qrCode={QrCode}
          eventCategory={event.category.toUpperCase()}
          ticketStartsAt={lowestTicketCost + " MATIC"}
          eventTime={localDateGenerated}
          eventDate={moment(event.start_date).format("DD-MM-YYYY")}
        />
      </div>
      <div className='active-title rounded-lg text-white another-gradient p-[26px] mt-[50.17px]'>
        <h3 className='visibility-header lg:text-[25px] lg:leading-[38px] mb-[15px]'>
          Who can see your event?
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-[34px]'>
          <div className='bg-visibility-selector rounded-lg md:col-span-2 p-[23px]'>
            <div className='flex gap-2'>
              <div
                onClick={() =>
                  handleChange({
                    target: { name: "visibility", value: 1 },
                  })
                }
                className={`${
                  event.visibility === 1 ? "bg-brand-red" : "bg-[#BEBEBE]"
                } h-[14px] w-[14px] rounded-full cursor-pointer`}
              ></div>
              <h3 className='-mt-1'>
                <span className='font-medium'>Public</span>
                <br />
                <span className='text-[14px]'>
                  Anyone can search on BlocTicks and find your event.
                </span>
              </h3>
            </div>
            <div className='flex mt-[6px] gap-2'>
              <div
                onClick={() =>
                  handleChange({
                    target: { name: "visibility", value: 0 },
                  })
                }
                className={`${
                  event.visibility === 0 ? "bg-brand-red" : "bg-[#BEBEBE]"
                } h-[14px] w-[14px] rounded-full cursor-pointer`}
              ></div>
              <h3 className='-mt-1'>
                <span className='font-medium'>Private</span>
                <br />
                <span className='text-[14px]'>
                  Only people with the event link.
                </span>
              </h3>
            </div>
          </div>
          <div className='flex flex-col gap-[17px]'>
            <div>
              <button></button>
            </div>
            <div>
              <EventPublisher />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

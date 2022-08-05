export default function EventSummary() {
  return (
    <div className="padding margin">
      <div className=" px-12">
        <h2 className="text-[38.61px] font-[500]">Event Summary</h2>
        <div className="mt-4">
          <p className="text-[27.87px] font-[500]">The Turn Up Fest</p>
          <p className="text-[21.18px] font-[500]">Mar 15; 9:00PM</p>
        </div>
      </div>
      <div className="  overflow-x-auto flex justify-between  p-12">
        <table className=" z-50  w-full">
          <thead>
            <tr className="">
              <th className="py-3 text-[12px] md:text-[14px] lg:text-[16px] xl:text-[22.23px] font-[500]">
                Ticket Name
              </th>
              <th className="py-3 text-[12px] md:text-[14px] lg:text-[16px] xl:text-[22.23px] font-[500]">
                Price
              </th>
              <th className="py-3 text-[12px] md:text-[14px] lg:text-[16px] xl:text-[22.23px] font-[500]">
                Tickets Sold
              </th>
              <th className="py-3 text-[12px] md:text-[14px] lg:text-[16px] xl:text-[22.23px] font-[500]">
                Checked In
              </th>
              <th className="py-3 text-[12px] md:text-[14px] lg:text-[16px] xl:text-[22.23px] font-[500]">
                Ticket Revenue
              </th>
            </tr>
          </thead>
          <tbody className="text-center  ">
            <tr className="  event ">
              <th className="py-6 md:py-10 text-[10px] md:text-[12px]  xl:text-[20.45px] font-[500]  px-6">
                {" "}
                General Admission
              </th>
              <th className="py-6 md:py-10 text-[10px] md:text-[12px]  xl:text-[20.45px] font-[500]  px-6">
                <span>23</span>MATIC
              </th>
              <th className="py-6 md:py-10  text-[10px] md:text-[12px]  xl:text-[20.45px] font-[500] px-6">
                <span>78</span>/<span>100</span>
              </th>
              <th className="py-6 md:py-10 text-[10px] md:text-[12px]  xl:text-[20.45px] font-[500]  px-6">
                {" "}
                <span>59</span>/<span>178</span>
              </th>

              <th className="py-6 md:py-10  text-[10px] md:text-[12px]  xl:text-[20.45px] font-[500]  px-6">
                <span>42</span> MATIC
              </th>
            </tr>
            <tr className="   event ">
              <th className="py-6 md:py-10 text-[10px] md:text-[12px]  xl:text-[20.45px] font-[500]  px-6">
                VIP Tickets
              </th>
              <th className="py-6 md:py-10 text-[10px] md:text-[12px]  xl:text-[20.45px] font-[500]  px-6">
                {" "}
                <span>23</span>MATIC
              </th>
              <th className="py-6 md:py-10  text-[10px] md:text-[12px]  xl:text-[20.45px] font-[500] px-6">
                <span>78</span>/<span>100</span>
              </th>
              <th className="py-6 md:py-10 text-[10px] md:text-[12px]  xl:text-[20.45px] font-[500]  px-6">
                {" "}
                <span>59</span>/<span>178</span>
              </th>
              <th className="py-6 md:py-10 text-[10px] md:text-[12px]  xl:text-[20.45px] font-[500]   px-6">
                <span>42</span> MATIC
              </th>
            </tr>
            <tr className=" relative top-2    bg-brand-red">
              <th className="py-6 md:py-10 text-[10px] md:text-[12px]  xl:text-[20.45px] font-[500]  px-6">
                Total
              </th>
              <th className="py-6 md:py-10 text-[10px] md:text-[12px]  xl:text-[20.45px] font-[500]  px-6"></th>
              <th className="py-6 md:py-10  text-[10px] md:text-[12px]  xl:text-[20.45px] font-[500] px-6">
                <span>78</span>/<span>100</span>
              </th>
              <th className="py-6 md:py-10 text-[10px] md:text-[12px]  xl:text-[20.45px] font-[500]  px-6">
                <span>59</span>/<span>178</span>
              </th>
              <th className="py-6 md:py-10 text-[10px] md:text-[12px]  xl:text-[20.45px] font-[500]   px-6">
                <span>42</span> MATIC
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

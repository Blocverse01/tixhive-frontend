function StepTwo({ event, handleChange, setStep }) {
  return (
    <div className="grid grid-cols-1 lg:px-[30px] gap-[27px]">
      <div>
        <h3 className="text-[34.41px] text-white font-[500] leading-[51.62px]">
          Add Your Main Event Image
        </h3>
        <h4 className="text-[17.21px] text-white font-[500] leading-[25.81px]">
          This is the first image attendees will see at the top of your listing.
          Use a high quality image : 2033px by 20393px (2:1)
        </h4>
        <div className="mt-[17.63px] py-[24px] create-event-gradient">
                  <div className="flex justify-center">
                  </div>
        </div>
      </div>
    </div>
  );
}

export default StepTwo;

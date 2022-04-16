import vector from "svgs/Vector-4.png";
import vectorMobile from "svgs/Vector-4-mobile.png";
import React, { useState, useEffect } from "react";
import { StepZero, StepOne, StepTwo, StepThree, EventPreview } from "components/create-event-steps";
import moment from "moment";
import { useRecoilState } from "recoil";
import { newEventState } from "recoil/atoms/newEvent";

function CreateEvent() {
  const [currentStep, setCurrentStep] = useState(0);
  const [event, setNewEventState] = useRecoilState(newEventState);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEventState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  const steps = [
    {
      title: "Create Your Event",
      subtitle: "Teresa will insert some cool text here, ipsum dolor sit amet lorem.",
      content: <StepZero setStep={setCurrentStep} handleChange={handleChange} />,
    },
    {
      title: "Event Info",
      subtitle: "Teresa will insert some cool text here, ipsum dolor sit amet lorem.",
      content: <StepOne setStep={setCurrentStep} handleChange={handleChange} />,
    },
    {
      title: "Details",
      content: <StepTwo setStep={setCurrentStep} handleChange={handleChange} />,
    },
    {
      title: "Tickets",
      content: <StepThree setStep={setCurrentStep} />,
    },
    {
      title: "Publish",
      content: <EventPreview handleChange={handleChange} />,
    },
  ];

  const titleList = steps.map((step, index) => {
    if (index < 1) {
      return "";
    }
    return (
      <h3
        className={`cursor-pointer flex py-2 items-center ${
          currentStep === index
            ? "active-title"
            : index < steps.length - 1
            ? "py-2 lg:py-3"
            : currentStep === steps.length - 2 && index === steps.length - 1
            ? "py-2 lg:py-3"
            : "lg:py-0"
        } ${index < currentStep ? "bg-brand-red lg:bg-transparent" : ""}`}
        onClick={() => setCurrentStep(index)}
        key={index}
      >
        <span
          className={`rounded-full hidden lg:flex mr-[15.5px] h-[32.22px] items-center justify-center w-[32.22px] text-[16px] ${
            index < currentStep ? "bg-brand-red" : "bg-[#393F4A]"
          }`}
        >
          {index}
        </span>
        <span className="text-[13px] leading-[24px] sm:text-[18px] sm:leading-[34px] md:text-[25.43px] px-3 lg:px-0 md:leading-[38.15px]">
          {step.title}
        </span>
      </h3>
    );
  });

  return (
    <div className="relative h-screen z-0">
      <div className={`grid grid-cols-1  ${currentStep > 1 ? "lg:grid-cols-6" : "lg:grid-cols-5"}`}>
        <div className={`px-5 sm:px-10 lg:px-8 lg:col-span-2`}>
          <div className="lg:pl-10 mt-[60px] text-white">
            {currentStep < 2 ? (
              <div>
                <h3 className="font-[600] max-w-[171px] sm:max-w-none text-[28.23px] leading-[42.34px] sm:text-4xl lg:text-[56px] lg:leading-[75px] xl:text-[70px] xl:leading-[105px]">
                  {steps[currentStep].title}
                </h3>
                <div className="mt-[10px] max-w-[209.7px] sm:max-w-none font-[400] lg:max-w-[520px] text-[10.08px] sm:text-xl leading-[15.12px] lg:text-[25px] lg:leading-[37.5px] text-white">
                  {steps[currentStep].subtitle}
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-[18.49px] leading-[27.73px] sm:text-3xl sm:leading-[40px] lg:text-[40px] font-[500] lg:leading-[60px]">
                  {event.name}
                </h3>
                <h3 className="lg:text-[20px] text-[12px] sm:text-[18px] sm:leading-[28px] lg:leading-[30px] font-[500]">
                  {moment(event.start_date + " " + event.start_time).format("ddd, MMM DD YYYY, h:mm A")}
                </h3>
                <div className="mt-[18.86px] flex flex-wrap gap-2.5 lg:gap-0 lg:flex-col">{titleList}</div>
              </div>
            )}
          </div>
        </div>
        <div
          className={`mt-[60px] px-5 sm:px-10 lg:px-0 lg:mx-[70px] h-full ${
            currentStep > 1 ? "lg:col-span-4" : "lg:col-span-3"
          }`}
        >
          <img src={vector} alt="vector" className="fixed hidden lg:block bottom-0 h-full top-0 z-[-1] right-0" />
          <img src={vectorMobile} alt="vector" className="fixed lg:hidden inset-0 h-full z-[-1] w-full" />
          <div
            className={`${
              currentStep < 4
                ? "z-50 create-event-section px-[21px] lg:px-[40px] pt-[32px] pb-[28px] lg:pt-[56px] sm:pb-[30px]"
                : ""
            }`}
          >
            {steps[currentStep].content}
          </div>
        </div>
      </div>
    </div>
  );
}
export default CreateEvent;

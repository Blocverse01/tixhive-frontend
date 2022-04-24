import { useRecoilValue } from "recoil";
import { newEventState } from "recoil/atoms/newEvent";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import { replaceItemAtIndex } from "utils/arrays";

export default function EventPublishingProgressTracker({ state }) {
  const event = useRecoilValue(newEventState);
  const [processes, updateProcesses] = useState([
    { title: "Uploading Cover Photo", width: 0 },
    { title: "Creating NFT Contract", width: 0 },
    { title: `Saving ${event.name}`, width: 0 },
  ]);
  useEffect(() => {
    if (state >= 0 && state < processes.length) {
      let width = 0;
      setInterval(() => {
        width = width + 2;
        const newProcesses = replaceItemAtIndex(processes, state, {
          ...processes[state],
          width: width <= 100 ? width : width,
        });
        updateProcesses(newProcesses);
      }, 1200);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);
  return (
    <section className="p-5 create-event-section absolute inset-0">
      <h3 className="text-white text-xl md:text-2xl mb-5 font-semibold">Publishing {event.name}</h3>
      {processes.map((process, index) => (
        <div key={index} className="mb-5">
          <h3 className="text-white text-xl md:text-">{process.title}</h3>
          <div className="flex items-center">
            {state > index ? (
              <FontAwesomeIcon icon={solid("check-circle")} className="text-green-400 mr-4 text-xl" />
            ) : (
              <FontAwesomeIcon icon={regular("check-circle")} className="text-gray-100 mr-4 text-xl" />
            )}{" "}
            <div className="w-full h-4 mt-1 bg-gray-100 rounded-full">
              <div
                className="h-4 bg-green-400 rounded-full"
                style={{ width: state > index ? "100%" : `${process.width}%`, maxWidth: "100%" }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

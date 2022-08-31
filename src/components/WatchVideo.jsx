import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular, solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useState } from "react";

export default function WatchVideo() {
  const [modal, setModal] = useState(false);
  return (
    <div>
      <button
        onClick={() => setModal(true)}
        className="block mt-10 bordered-btn md:mt-5 bgblack-gradient lg:mt-0 text padded-btn"
      >
        <FontAwesomeIcon className="mr-1" icon={regular("circle-play")} /> Watch Video
      </button>
      {modal && (
        <div className="mint-modal">
          <div className="mint-modal-content">
            <div className="justify-end border-none mint-modal-header">
              <button onClick={() => setModal(false)} className={"text-brand-red"}>
                <FontAwesomeIcon icon={solid("times")} className={"text-2xl md:text-4xl"} />
              </button>
            </div>
            <div className="flex justify-center">
              <iframe
                className="lg:h-[580px] w-full md:h-[315px] h-[220px]"
                src="https://www.youtube.com/embed/84Y2-mZXBqs"
                title="TixHive - YouTube"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

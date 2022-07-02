import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

export default function ViewTicket({ image }) {
  if (image) {
    return <img src={image} alt={"ticket_image"} />;
  }
  return (
    <div className={"text-lg"}>
      <FontAwesomeIcon icon={solid("spinner")} spin /> Loading
    </div>
  );
}

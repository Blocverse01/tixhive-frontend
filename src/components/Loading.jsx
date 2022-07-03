import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

export default function Loading() {
  return (
    <div className="loading">
      <div className="loading-wrapper">
        <div className="loading-icon">
          <FontAwesomeIcon icon={solid("spinner")} spin />
        </div>
        <div className="loading-text">Loading...</div>
      </div>
    </div>
  );
}

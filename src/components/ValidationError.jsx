import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const ValidationError = ({ message }) => {
  return (
    <div className="mt-1 text-red-300">
      <FontAwesomeIcon icon={solid("exclamation-triangle")} /> {message}
    </div>
  );
};

export default ValidationError;

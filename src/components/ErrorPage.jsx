import { Link } from "react-router-dom";
import error from "images/404.png";

function ErrorPage() {
  return (
    <div className=" flex flex-col-reverse md:flex-row  md:items-center mt-32   md:mt-0 md:h-[80vh] md:px-12 px-5 md:justify-between  ">
      <div className=" mt-10 md:w-96">
        <h1 className="header">Oops!</h1>
        <p className="text-2xl mt-5">
          It seems something went wrong, but don’t worry, we’ll fix it. There’s
          no rest for the ticket.
        </p>

        <div className="mt-10">
          <Link
            className="bg-brand-red 2xl padded-btn darker-red xl:mr-[18.29px]"
            to="/"
          >
            Return to Homepage
          </Link>
        </div>
      </div>

      <div>
        <img
          src={error}
          className="w-auto  h-auto md:w-[320px] md:h-52 lg:w-[430px] lg:h-52 xl:w-auto xl:h-auto "
          alt={error.message}
        />
      </div>
    </div>
  );
}

export default ErrorPage;

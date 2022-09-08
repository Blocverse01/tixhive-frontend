import React from "react";

export default function DefaultTicketDesign({
  eventName,
  eventHost,
  eventTime,
  eventDate,
  qrCode,
  ticketStartsAt,
  eventCategory,
}) {
  const splitString = eventName
    .replaceAll(/[&/\\#,+()$~%.'":*?<>{}]/g, "")
    .split(" ");
  const ticker = splitString.map((word) => {
    if (!isNaN(parseInt(word))) {
      return "-" + word;
    }
    return word[0];
  });
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="100%"
      height="100%"
      fill="none"
      viewBox="0 0 1092 430"
    >
      <g filter="url(#filter0_b_61_153)">
        <g>
          <rect
            width="834.804"
            height="429.662"
            y="0.17"
            fill="url(#paint0_linear_61_153)"
            rx="31.094"
          ></rect>
          <rect
            width="833.609"
            height="428.466"
            x="0.598"
            y="0.768"
            stroke="#fff"
            strokeOpacity="0.6"
            strokeWidth="1.196"
            rx="30.496"
          ></rect>
        </g>
        <rect
          width="257.123"
          height="429.336"
          x="834.877"
          y="0.17"
          fill="#FF1A87"
          rx="31.094"
          style={{
            whiteSpace: "pre",
          }}
        ></rect>
        <text
          fill="#fff"
          xmlSpace="preserve"
          style={{
            whiteSpace: "pre",
          }}
          fontFamily="Poppins"
          fontSize="21.6"
          fontWeight="600"
          letterSpacing="0em"
        >
          <tspan x="56.208" y="149.783">
            {eventName.trim()}
          </tspan>
        </text>
        <text
          fill="#fff"
          fontFamily="Poppins"
          fontSize="30"
          fontWeight="600"
          letterSpacing="0em"
          transform="rotate(90 498.463 556.037)"
          xmlSpace="preserve"
          style={{ whiteSpace: "pre" }}
        >
          <tspan x="0" y="36.032">
            #{ticker}
          </tspan>
        </text>
        <text
          fill="#fff"
          fontFamily="Poppins"
          fontSize="18"
          fontWeight="500"
          letterSpacing="0em"
          transform="rotate(90 457.607 515.182)"
          xmlSpace="preserve"
          style={{ whiteSpace: "pre" }}
        >
          <tspan x="0" y="32.964">
            {eventDate}
          </tspan>
        </text>
        <text
          fill="#fff"
          xmlSpace="preserve"
          style={{ whiteSpace: "pre" }}
          fontFamily="Poppins"
          fontSize="30.85"
          fontWeight="500"
          letterSpacing="0em"
        >
          <tspan x="53.816" y="359.069">
            {ticketStartsAt}
          </tspan>
        </text>
        <text
          fill="#fff"
          xmlSpace="preserve"
          style={{ whiteSpace: "pre" }}
          fontFamily="Poppins"
          fontSize="15"
          fontWeight="500"
          letterSpacing=".08em"
        >
          <tspan x="56.208" y="95.905">
            {eventHost} PRESENTS
          </tspan>
        </text>
        <text
          fill="#fff"
          xmlSpace="preserve"
          style={{ whiteSpace: "pre" }}
          fontFamily="Poppins"
          fontSize="15"
          fontWeight="500"
          letterSpacing=".08em"
        >
          <tspan x="56.208" y="193.971">
            {eventCategory}
          </tspan>
        </text>
        <text
          fill="#fff"
          fontFamily="Poppins"
          fontSize="11.773"
          fontWeight="500"
          letterSpacing=".08em"
          transform="rotate(90 474.168 531.742)"
          xmlSpace="preserve"
          style={{ whiteSpace: "pre" }}
        >
          <tspan x="0" y="18.265">
            {eventCategory}
          </tspan>
        </text>
        <text
          fill="#fff"
          fontFamily="Poppins"
          fontSize="11.773"
          fontWeight="500"
          letterSpacing=".08em"
          transform="rotate(90 434.49 492.065)"
          xmlSpace="preserve"
          style={{ whiteSpace: "pre" }}
        >
          <tspan x="0" y="18.265">
            {eventTime}
          </tspan>
        </text>
        <text
          fill="#fff"
          xmlSpace="preserve"
          style={{ whiteSpace: "pre" }}
          fontFamily="Poppins"
          fontSize="14.43"
          fontWeight="500"
          letterSpacing=".08em"
        >
          <tspan x="53.816" y="303.995">
            TICKET STARTS AT
          </tspan>
        </text>
        <g clipPath="url(#clip0_61_153)">
          <path
            stroke="#00B2FF"
            strokeWidth="3.459"
            d="M691.241-16.605C878.028-15.223 353.64 447.25 801.93 477.342"
          ></path>
          <path
            stroke="#00B2FF"
            strokeWidth="3.459"
            d="M634.85-67.997c186.788 1.383-337.6 463.855 110.689 493.948"
          ></path>
          <path
            fill="url(#pattern0)"
            d="M680.005 274.037H788.834V382.866H680.005z"
          ></path>
        </g>
      </g>
      <defs>
        <filter
          id="filter0_b_61_153"
          width="1106.87"
          height="444.535"
          x="-7.437"
          y="-7.267"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feGaussianBlur
            in="BackgroundImage"
            stdDeviation="3.719"
          ></feGaussianBlur>
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_61_153"
          ></feComposite>
          <feBlend
            in="SourceGraphic"
            in2="effect1_backgroundBlur_61_153"
            result="shape"
          ></feBlend>
        </filter>
        <pattern
          id="pattern0"
          width="1"
          height="1"
          patternContentUnits="objectBoundingBox"
        >
          <use transform="scale(.00444)" xlinkHref="#image0_61_153"></use>
        </pattern>
        <linearGradient
          id="paint0_linear_61_153"
          x1="-3.006"
          x2="788.158"
          y1="3"
          y2="504.884"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopOpacity="0.8"></stop>
          <stop offset="1" stopColor="#616161" stopOpacity="0.2"></stop>
        </linearGradient>
        <clipPath id="clip0_61_153">
          <path
            fill="#fff"
            d="M0 0H397.046V429.336H0z"
            transform="translate(388.675 .17)"
          ></path>
        </clipPath>
        <image
          id="image0_61_153"
          width="225"
          height="225"
          data-name="image.png"
          xlinkHref={qrCode}
        ></image>
      </defs>
    </svg>
  );
}

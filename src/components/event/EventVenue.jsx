import GoogleMapIframe from "components/GoogleMapIframe";
const customData = {
  "0x7481B9dE7CAd690D9Fffdb318B6574dDB6061186":
    "!1m18!1m12!1m3!1d3964.7370764980396!2d3.4666013142765255!3d6.427815126052796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf5a5611e8a6f%3A0x551f035f8326d09a!2s3%20New%20Creation%20St%2C%20Lekki%20Phase%20I%20106104%2C%20Lagos!5e0!3m2!1sen!2sng!4v1652520973811!5m2!1sen!2sng",
  "0x244CD6E678e2b2D957A2195b20cF36f997E8918A":
    "!1m18!1m12!1m3!1d3963.7641685132235!2d3.3746513141679984!3d6.551430795261575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8d73a658782b%3A0x7a1de11d89cccc84!2sZone%20Tech%20Park!5e0!3m2!1sen!2sng!4v1656889339504!5m2!1sen!2sng",
};
export default function EventVenueMap({ eventContract }) {
  if (!customData[eventContract]) {
    return "";
  }
  return <GoogleMapIframe embedCode={customData[eventContract]} />;
}

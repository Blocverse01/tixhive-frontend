export default function GoogleMapIframe({ embedCode }) {
  return (
    <iframe
      title={"map"}
      className="w-full mt-5"
      src={`https://www.google.com/maps/embed?pb=${embedCode}`}
      width="100%"
      height="600"
      style={{ border: "0px" }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  );
}

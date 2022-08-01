import {
  twitterIcon,
  faceBookIcon,
  whatsappIcon,
  telegramIcon,
  instagramIcon,
} from "svgs/social-icons";

export default function SocialShare({ media, shareLink, customIcon }) {
  const socialIcons = {
    facebook: faceBookIcon,
    instagram: instagramIcon,
    twitter: twitterIcon,
    whatsapp: whatsappIcon,
    telegram: telegramIcon,
  };
  return (
    <a
      href={shareLink}
      target="__blank"
      rel="noreferrer"
      title={`share on ${media}`}
    >
      {customIcon || (
        <img
          src={socialIcons[media]}
          className="social-icon"
          alt={`share on ${media}`}
        />
      )}
    </a>
  );
}

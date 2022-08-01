import {
  twitterIcon,
  faceBookIcon,
  whatsappIcon,
  telegramIcon,
  instagramIcon,
} from "svgs/social-icons";

export default function SocialShare({ media, shareLink }) {
  const socialIcons = {
    facebook: faceBookIcon,
    instagram: instagramIcon,
    twitter: twitterIcon,
    whatsapp: whatsappIcon,
    telegram: telegramIcon,
  };
  return (
    <a href={shareLink} title={`share on ${media}`}>
      <img
        src={socialIcons[media]}
        className="social-icon"
        alt={`share on ${media}`}
      />
    </a>
  );
}

import { useState, useEffect } from "react";
import Rainbow from "components/auth/WalletIcons/rainbow.svg";
import TrustWallet from "components/auth/WalletIcons/trustwallet.svg";
import Metamask from "components/auth/WalletIcons/metamask.svg";
import WalletConnect from "components/auth/WalletIcons/walletconnect.svg";

export default function LoopingImages() {
  const images = [WalletConnect, Rainbow, TrustWallet, Metamask];
  const [image, setImage] = useState(images[0]);
  const [hidden, setHidden] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const lastImageIndex = images.length - 1;
    const interval = setInterval(() => {
      setHidden("hidden");
      setIndex((prevIndex) =>
        prevIndex >= lastImageIndex ? 0 : prevIndex + 1
      );
      setHidden("");
    }, 1200);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setImage(images[index]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);
  return (
    <img
      src={image}
      className={`h-[40px] transition ${hidden} ease-in-out duration-500`}
      alt={`wallet`}
    />
  );
}

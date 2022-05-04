import EVENT from "contract-abis/Event.json";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { enableContract } from "utils/web3-utils";

export default function ViewTicket({ sale, event }) {
  const [src, setSrc] = useState(null);
  const { user, isAuthenticated, web3 } = useMoralis();
  useEffect(() => {
    async function loadTicket() {
      if (!isAuthenticated) return;
      const eventContract = await enableContract(
        event.contractAddress,
        EVENT,
        web3
      );
      const tokenURI = await eventContract.tokenURI(sale.tokenId.toNumber());
      const response = await fetch(tokenURI);
      setSrc((await response.json()).image);
    }
    loadTicket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user, web3]);
  return <img src={src} alt={sale.ticketId} />;
}

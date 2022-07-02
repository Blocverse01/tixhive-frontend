import ViewTicket from "components/ViewTicket";
import useReadNFTImage from "hooks/data/useReadNFTImage";

export default function DisplayTicketImage({ contractAddress, token_id }) {
  const image = useReadNFTImage(contractAddress, token_id);
  return <ViewTicket image={image} />;
}

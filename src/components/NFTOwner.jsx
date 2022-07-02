import useReadNFTData from "hooks/data/useReadNFTData";
import truncateEthAddress from "truncate-eth-address";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

export default function NFTOwner({ contract, token_id }) {
  const { data: nftData, isLoading: nftLoading } = useReadNFTData(
    contract,
    token_id
  );
  return (
    <div>
      {nftLoading ? (
        <div>
          <SkeletonTheme baseColor="#1A1D25" highlightColor="#374151">
            <Skeleton count={1} width={"100%"} />
          </SkeletonTheme>
        </div>
      ) : (
        <div>
          Owner: {"  "}
          <span className={"underline text-brand-red"}>
            <FontAwesomeIcon icon={solid("up-right-from-square")} />{" "}
            <a
              target={"_blank"}
              rel={"noreferrer"}
              href={`https://polygonscan.com/address/${nftData?.owner_of}`}
            >
              {truncateEthAddress(nftData?.owner_of)}
            </a>
          </span>
        </div>
      )}
    </div>
  );
}

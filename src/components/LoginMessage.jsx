import ConnectWallet from "components/auth/moralis/ConnectWalletWithWeb3Auth";

export default function LoginMessage({ authAction }) {
  return (
    <div className="min-h-[400px] flex justify-center items-center">
      <div>
        <p className="mb-8 text-xl text-center text-white md:text-3xl">
          You must be logged in to {authAction}
        </p>
        <div className="flex justify-center">
          <ConnectWallet />
        </div>
      </div>
    </div>
  );
}

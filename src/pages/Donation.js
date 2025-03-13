import { useState } from "react";
import Navbar from "../components/Navbar";

function Donation() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {    
    alert("connect wallet");
  };

  const handleDonate = () => {
    alert("donation function");
  };

  return (
    <div>
      <Navbar />
      <div className="py-12 bg-gray-100 min-h-screen">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Donate to support our cause
          </h1>
          <p className="text-lg mb-8">        
            Interface ta3 donation ida habina ndiroha m3a hadi l idea
          </p>
          <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
            <button
              onClick={connectWallet}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-red-700 mb-4"
            >
              {walletConnected ? `Connected: ${account.slice(0, 6)}...` : "Connect Wallet"}
            </button>
            <p className="text-lg mb-4">
              Please connect your wallet to proceed with your donation.
            </p>
            <button
              onClick={handleDonate}
              className="w-full bg-secondary text-primary py-3 rounded-lg font-semibold hover:bg-yellow-400">
              Donate Now
            </button>
          </div>
          <p className="mt-4 text-sm text-gray-600">
            nadamnolk transparent donations
          </p>
        </div>
      </div>
    </div>
  );
}

export default Donation;
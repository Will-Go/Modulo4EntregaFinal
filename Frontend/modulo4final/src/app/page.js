"use client";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useReadContract,
} from "wagmi";

import { CONTRACT_ABI } from "./abi";

//COMPONENTS
import WriteContract from "./WriteContract";

function App() {
  const CONTRACT_ADDRESS = "0x1A6497397D9c0ac0557bfB396a937343a76750D8";
  const MY_ADDRESS = "0x0e827765391CEeABa34354747248dCA859E3c1Eb";

  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();

  const result = useReadContract({
    abi: CONTRACT_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "balances",
    args: [account.address],
  });


  return (
    <div >
      <div >
        <h1>Stacker</h1>
        <h2>Account</h2>
        {account.isConnected && (
          <p>My balance: {Number(result.data) / 10 ** 18}</p>
        )}

        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        {account.isConnected && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}

        <h2>
        Staking Section
        </h2>
        <div className=" mt-6">

        {account.isConnected && <WriteContract/>}

        </div>

      </div>
        
      
      <div>
        <h2>Connect</h2>
        {connectors.slice(0, 1).map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>
    </div>
  );
}

export default App;

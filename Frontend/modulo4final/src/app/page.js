"use client";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useReadContract,
  useEnsName,
  useBalance,
} from "wagmi";

import { CONTRACT_ABI } from "./abi";

function App() {
  const CONTRACT_ADDRESS = "0x1A6497397D9c0ac0557bfB396a937343a76750D8";
  const MY_ADDRESS = "0x0e827765391CEeABa34354747248dCA859E3c1Eb";

  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();

  const result = useReadContract({
    abi:CONTRACT_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "balances",
    args:[account.address]

  });

  console.log(result)

  return (
    <>
      <div>
        <h1>Stacker</h1>
      {result?.data  &&  <p>My balance: {Number(result.data)/10**18 }</p>}
        <h2>Account</h2>

        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        {account.status === "connected" && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
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
    </>
  );
}

export default App;

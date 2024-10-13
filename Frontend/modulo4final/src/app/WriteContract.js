"use client";

import { useState } from "react";

import { useWriteContract } from 'wagmi'
import { CONTRACT_ABI } from './abi'
import { parseEther } from "viem";


function WriteContract() {
  const { data: hash, writeContract, isPending, error } = useWriteContract()
  const [amountToStake, setamountToStake] = useState(0);

  async function submit(e) {
    console.log(amountToStake)
    const CONTRACT_ADDRESS = "0x1A6497397D9c0ac0557bfB396a937343a76750D8";
    e.preventDefault();

    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'stake',
      value:parseEther(amountToStake)
    
    })
    console.log("errors", error)
  }

  return (
    <form onSubmit={submit}>
        
      <input

        name="amount"
        onChange={(e) =>
          setamountToStake(e.target.value)
        }
        placeholder="(wei)"
        disabled={isPending}
        required
      />
      <button type="submit"> {isPending ? 'Confirming...' : 'Stake'}</button>
      {hash && <div>Transaction Hash: {hash}</div>}
    </form>
  );
}

export default WriteContract;

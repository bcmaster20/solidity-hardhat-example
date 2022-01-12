import { ethers, providers } from "ethers";
import { useEffect, useState } from "react";
import Greeter from '../artifacts/contracts/Greeter.sol/Greeter.json';

const localAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
const ropstenAddress = "0xAf0eDf79D9bb4cC0481ddC0e157c906Fc5384FB8"

const contractAddress = (networkName: string) => {
  return networkName === "ropsten" ? ropstenAddress : localAddress
}

type Props = {
  web3: providers.Web3Provider | undefined
}

function useGreeter({ web3 }: Props) {
  const [address, setAddress] = useState<string>(localAddress)

  useEffect(() => {
    web3?.detectNetwork().then((network) => {
      const address_ = contractAddress(network.name)
      setAddress(address_)
    })
  }, [web3])

  const fetchGreeting = async () => {
    if (typeof web3 === "undefined") return

    const contract = new ethers.Contract(address, Greeter.abi, web3)

    try {
      const data = await contract.greet()
      console.log("data: ", data)
      return data
    } catch (err) {
      console.log("Error: ", err)
      throw err
    }
  }

  const setGreeting = async (greet: string) => {
    if (typeof web3 === "undefined") return
    if (!greet) throw new Error("Greet Empty")

    const signer = web3.getSigner()
    const contract = new ethers.Contract(address, Greeter.abi, signer)
    const transaction = await contract.setGreeting(greet)
    await transaction.wait()
  }

  return [fetchGreeting, setGreeting] as const
}

export default useGreeter

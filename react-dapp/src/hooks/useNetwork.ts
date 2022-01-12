import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers } from "ethers";
import { useState } from "react";
import Web3Modal from "web3modal";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: process.env.REACT_APP_INFURA_ID,
    }
  }
}

const web3Modal = new Web3Modal({
  // network: "ropsten",
  cacheProvider: false,
  providerOptions
})

function useNetwork() {
  const [provider, setProvider] = useState<any>()
  const [web3, setWeb3] = useState<providers.Web3Provider>()

  const connect = async () => {
    const provider_ = await web3Modal.connect()
    setProvider(provider_)

    const web3_ = new providers.Web3Provider(provider_)
    setWeb3(web3_)
  }

  const disconnect = async () => {
    // explicitly close when wallet connect is used
    if (provider && provider.close) {
      await provider.close()
    }
    web3Modal.clearCachedProvider()

    setProvider(undefined)
    setWeb3(undefined)
  }

  const handleNetwork = async () => {
    if (typeof web3 === "undefined") {
      await connect()
    } else {
      await disconnect()
    }
  }

  return [{ web3 }, handleNetwork] as const
}

export default useNetwork

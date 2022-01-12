import { providers } from 'ethers';
import React, { useEffect, useRef, useState } from 'react';
import useGreeter from './hooks/useGreeter';
import useNetwork from './hooks/useNetwork';

function App() {
  const [network, setNetwork] = useState<providers.Network>()
  const [account, setAccount] = useState<string>()
  const [greet, setGreet] = useState<string>()
  const [appMsg, setAppMsg] = useState<string>()
  const inputElm = useRef<HTMLInputElement>(document.createElement("input"))

  const [{ web3 }, handleNetwork] = useNetwork()
  const [fetchGreeting, setGreeting] = useGreeter({ web3 })

  useEffect(() => {
    if (typeof web3 === "undefined") {
      initFields()
    } else {
      const setNetworkAccount = async () => {
        web3.detectNetwork().then(setNetwork)
          .catch(showAppMsg)
        web3.listAccounts().then(accounts => {
          setAccount(accounts[0])
        }).catch(showAppMsg)
      }
      setNetworkAccount()
    }
  }, [web3])

  const initFields = () => {
    setNetwork(undefined)
    setAccount(undefined)
    setGreet(undefined)
  }

  const showAppMsg = (err: any) => {
    console.log(err)
    setAppMsg(err.message || `${err}`)
    setTimeout(() => setAppMsg(undefined), 7000)
  }

  const handleConnect = async () => {
    handleNetwork().catch(showAppMsg)
  }

  const handleFetch = async () => {
    fetchGreeting().then(setGreet).catch(showAppMsg)
  }

  const handleSet = () => {
    setGreeting(inputElm.current.value)
      .then(() => {
        inputElm.current.value = ""
        handleFetch()
      })
      .catch(showAppMsg)
  }

  return (
    <>
      <h5>Hardhat Ethers Greeter Dapp Demo</h5>
      <button onClick={handleConnect}>{web3 ? "Disconnect" : "Connect"}</button><br />
      <button onClick={handleFetch}>Fetch Greeting</button><br />
      <button onClick={handleSet}>Set Greeting</button>
      <input ref={inputElm} placeholder="Set greeting" /><br />
      <hr />
      Network: {network?.chainId} {network?.name}<br />
      Account: {account}<br />
      Greet: {greet}<br />
      StatusMessage: {appMsg}<br />
      <hr />
      <i>Note: Please try Ropsten testnet by MetaMask.</i>
    </>
  )
}

export default App;

# Solidity Hardhat Ethers Dapp Example

* Hardhat + Ethers + React + Web3Modal sample Dapp
* instead of Truffle + Web3
* using Solidity and TypeScript
* works with both injected (MetaMask) and WalletConnect (TrustWallet)
* sample Greeter contract has been deployed on Ropsten

## Setup Hardhat Project

* https://hardhat.org/getting-started/

```bash
cd hardhat-proj/
npm init -y

npx hardhat --version
# 2.3.0

# create a sample project
npx hardhat

# it will suggest install these
npm install --save-dev \
    hardhat \
    @nomiclabs/hardhat-waffle \
    ethereum-waffle \
    chai \
    @nomiclabs/hardhat-ethers \
    ethers

# rename script
mv scripts/sample-script.js scripts/deploy.js

# test calling task in hardhat.config.js
npx hardhat accounts
```

## Using TypeScript

* https://hardhat.org/guides/typescript.html

```bash
npm install --save-dev ts-node typescript

# use typescript in test
npm install --save-dev \
    @types/node \
    @types/mocha \
    @types/chai

mv hardhat.config.js hardhat.config.ts
npx hardhat accounts

# Note: need to add @nomiclabs/hardhat-ethers in hardhat.config.ts
# https://github.com/nomiclabs/hardhat/tree/master/packages/hardhat-ethers

mv test/sample-test.js test/sample-test.ts
npx hardhat test

mv scripts/deploy.js scripts/deploy.ts
```

## Test and Deploy Smart Contract

```bash
# use solidity 0.8.3 in hardhat.config.js Greeter.sol
npx hardhat compile
npx hardhat test

# start local node http://127.0.0.1:8545/
npx hardhat node

# deploy to local node
npx hardhat run --network localhost scripts/deploy.ts
# CONTRACT_ADDRESS="0x5FbDB2315678afecb367f032d93F642f64180aa3"

# interacting from console
npx hardhat console --network localhost
> const Greeter = await ethers.getContractFactory("Greeter")
> const greeter = await Greeter.attach($CONTRACT_ADDRESS)
> await greeter.greet()
# 'Hello, Hardhat!'
> await greeter.setGreeting("Foo")
# {hash: '...',...}

# add ropsten to networks in hardhat.config.ts
# and deploy to ropsten
export REACT_APP_INFURA_ID=xxxxx
export ROPSTEN_PRIVATE_KEY=xxxxx
npx hardhat run --network ropsten scripts/deploy.ts
```

## Setup React Dapp

```bash
npx create-react-app react-dapp --template typescript --use-npm
cd react-dapp/

npm install ethers
npm install web3modal @walletconnect/web3-provider

BROWSER=none npm start
open http://127.0.0.1:3000/

npm test

export REACT_APP_INFURA_ID=xxxxx
# or create .env.local
# echo REACT_APP_INFURA_ID=xxxxx > .env.local
```

## Troubleshooting

### `Nonce too high.`

* need to reset account after restarted `npx hardhat node`
* MetaMask > select test account > Settings > Advanced > Reset Account

```
Nonce too high. Expected nonce to be 2 but got 8.
Note that transactions can't be queued when automining.
```

* https://dev.to/dabit3/comment/1db87
* https://stackoverflow.com/questions/45585735

## Reference

* The Complete Guide to Full Stack Ethereum Development
  - https://dev.to/dabit3/the-complete-guide-to-full-stack-ethereum-development-3j13
* The New Solidity Dev Stack: Hardhat + Ethers + Waffle + Typescript
  - https://rahulsethuram.medium.com/the-new-solidity-dev-stack-buidler-ethers-waffle-typescript-tutorial-f07917de48ae
* Deploying and interacting with smart contracts
  - https://docs.openzeppelin.com/learn/deploying-and-interacting

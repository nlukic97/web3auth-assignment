<script lang="ts" setup>
// type imports
import { ADAPTER_EVENTS, CHAIN_NAMESPACES, OPENLOGIN_NETWORK, WALLET_ADAPTERS, type CONNECTED_EVENT_DATA, type IProvider } from "@web3auth/base";

// prime imports
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter"

// web3 import
import Web3 from 'web3';

// import smart contract abi
import smartContractAbi from "../abi/abi.json"

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x13881",
  displayName: "Polygon Mumbai Testnet",
  blockExplorer: "https://mumbai.polygonscan.com/",
  ticker: "MATIC",
  tickerName: "Matic",
  rpcTarget: "https://rpc.ankr.com/polygon_mumbai",
}

// TODO - use propper client if, this might be incorrect. Also update different details
const web3auth = new Web3AuthNoModal({
  clientId: "BJMqszGep6igSBAkmfrIoDt3o9MEXgR4B-L46I19PBX-XRzQgfWliV7E6e3SnwG-XppP91r-ZkIJkbBmkz801Ug", // web3Auth client id
  web3AuthNetwork: OPENLOGIN_NETWORK.SAPPHIRE_DEVNET,
  chainConfig
});

// private key provider
const privateKeyProvider = new EthereumPrivateKeyProvider({ config: { chainConfig } });

// open login adapter
const openloginAdapter = new OpenloginAdapter({
  adapterSettings: {
    uxMode: "popup",
    loginConfig: {
      jwt: {
        name: "Web3Auth-Auth0-JWT",
        verifier: "web3auth-auth0",
        typeOfLogin: "jwt",
        // clientId: 'eeeaea', //JWT client ID -- TODO
      },
    },
  },
  privateKeyProvider,
});

web3auth.configureAdapter(openloginAdapter);

try {
  await web3auth.init();
  console.log('init done')

  /* await web3auth.logout()
  console.log('logged out') */
  if (!web3auth.connected) {
    console.log(`Web3Auth instance is connected. Connecting...`)

    await web3auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
      loginProvider: "apple",
    });
  } else {
    console.log('Already connected.')
    // console.log('web3authprovider: ', web3authProvider)
  }

  // console.log(await web3auth.authenticateUser())

  console.log('Logged in. Is connected:' + web3auth.connected)
  // console.log(await web3auth.getUserInfo());

  const Iprovider = web3auth.provider
  const web3 = new Web3(Iprovider as IProvider)

  // getting connected account
  const accounts = await web3.eth.getAccounts()
  const userAccount = accounts[0]
  console.log(userAccount)

  // getting balance
  console.log(await web3.eth.getBalance(userAccount))
  console.log(await web3.eth.getBalance('0x0B3233FE361955D0Fb9796d89EeADc834c21f3FC')) // for a dev account of mine, shows correct balance

  // getting PK
  console.log(await web3.provider?.request({
    method: 'eth_private_key'
  }))

  // smart contract instantiation
  const smartContract = new web3.eth.Contract(smartContractAbi, '0x6168C156825d4BCD7Ccb6d25e844F661B28b8DFa')


  // smart contract interaction - read method
  const response = await smartContract.methods.name().call({ from: userAccount })
  console.log('Token Name - ' + response)
  
  // smart contract interaction - read method - balance of tokens
  const response2 = await smartContract.methods.balanceOf(userAccount).call({ from: userAccount })
  console.log(response2)

  // smart contract interaction - write method - mint yourself 1 token
  /* await smartContract.methods.mint(userAccount, '1000000000000000000').send({ from: userAccount })
    .on('receipt', (data) => console.log(data))
    .on('error', (err) => console.log(err)) */





} catch (e) {
  console.error(e)
}

</script>

<template>
  <div>
    <Nav></Nav>
    <slot />
  </div>
</template>

<style scoped></style>

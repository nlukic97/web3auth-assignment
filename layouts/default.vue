<script lang="ts" setup>
import { CHAIN_NAMESPACES, OPENLOGIN_NETWORK, WALLET_ADAPTERS } from "@web3auth/base";
import { Web3AuthNoModal } from "@web3auth/no-modal";

import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";

import { OpenloginAdapter } from "@web3auth/openlogin-adapter"

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
        // clientId: clientId, //JWT client ID
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

    const web3authProvider = await web3auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
      loginProvider: "apple",
    });
  } else {
    console.log('Already connected.')
  }

  console.log('Loged in. Is connected:' + web3auth.connected)
  console.log(await web3auth.getUserInfo())

} catch (e) {
  console.log(e)
}

</script>

<template>
  <div>
    <Nav></Nav>
    <slot />
  </div>
</template>

<style scoped></style>

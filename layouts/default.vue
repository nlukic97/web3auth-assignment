<script lang="ts" setup>
import { ADAPTER_EVENTS, CHAIN_NAMESPACES, OPENLOGIN_NETWORK, WALLET_ADAPTERS, type CONNECTED_EVENT_DATA } from "@web3auth/base";
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

/* const subscribeAuthEvents = (web3auth: any) => {
  web3auth.on(ADAPTER_EVENTS.CONNECTED, (data: CONNECTED_EVENT_DATA) => {
    console.log("connected to wallet", data);
    // web3auth.provider will be available here after user is connected
  });
  web3auth.on(ADAPTER_EVENTS.CONNECTING, () => {
    console.log("connecting");
  });
  web3auth.on(ADAPTER_EVENTS.DISCONNECTED, () => {
    console.log("disconnected");
  });
  web3auth.on(ADAPTER_EVENTS.ERRORED, (error: any) => {
    console.log("error", error);
  });
  web3auth.on(ADAPTER_EVENTS.ERRORED, (error: any) => {
    console.log("error", error);
  });
}; */

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
    console.log('web3authprovider: ')
    console.log(web3authProvider)
  } else {
    console.log('Already connected.')
  }
  
  console.log(await web3auth.authenticateUser())

  console.log('Loged in. Is connected:' + web3auth.connected)
  console.log(await web3auth.getUserInfo());

  const Iprovider = web3auth.provider // should I continue from here?
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

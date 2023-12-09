<script lang="ts" setup>
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { Web3AuthNoModal } from "@web3auth/no-modal";

// TODO - use propper client if, this might be incorrect. Also update different details
const web3auth = new Web3AuthNoModal({
  clientId: "BJMqszGep6igSBAkmfrIoDt3o9MEXgR4B-L46I19PBX-XRzQgfWliV7E6e3SnwG-XppP91r-ZkIJkbBmkz801Ug", // Get your Client ID from the Web3Auth Dashboard
  chainConfig: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x1",
    displayName: "Ethereum Mainnet",
    blockExplorer: "https://etherscan.io",
    ticker: "ETH",
    tickerName: "Ethereum",
    rpcTarget: "https://rpc.ankr.com/eth", // This is the mainnet RPC we have added, please pass on your own endpoint while creating an app
  },
  web3AuthNetwork: "sapphire_mainnet",
});

console.log(web3auth)

</script>

<template>
  <div>
    <Nav></Nav>
    <slot />
  </div>
</template>

<style scoped></style>

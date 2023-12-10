import {
  CHAIN_NAMESPACES,
  OPENLOGIN_NETWORK,
} from "@web3auth/base";

// prime imports
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";

export default async function getWeb3AuthIProvider() {
  // chain config - Polygon
  const chainConfig = {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x13881",
    displayName: "Polygon Mumbai Testnet",
    blockExplorer: "https://mumbai.polygonscan.com/",
    ticker: "MATIC",
    tickerName: "Matic",
    rpcTarget: "https://rpc.ankr.com/polygon_mumbai",
  }

  // Web3AuthNoModal config
  const web3auth = new Web3AuthNoModal({
    clientId: "BJMqszGep6igSBAkmfrIoDt3o9MEXgR4B-L46I19PBX-XRzQgfWliV7E6e3SnwG-XppP91r-ZkIJkbBmkz801Ug", // web3Auth client id
    web3AuthNetwork: OPENLOGIN_NETWORK.SAPPHIRE_DEVNET,
    chainConfig
  });

  // Privat key provider
  const privateKeyProvider = new EthereumPrivateKeyProvider({ config: { chainConfig } });

  // Open Login Adapter
  const openloginAdapter = new OpenloginAdapter({
    adapterSettings: {
      uxMode: "popup",
      loginConfig: {
        jwt: {
          name: "Web3Auth-Auth0-JWT",
          verifier: "web3auth-auth0",
          typeOfLogin: "jwt",
        },
      },
    },
    privateKeyProvider,
  });


  web3auth.configureAdapter(openloginAdapter);

  // Init Web3Auth
  try {
    await web3auth.init();
    return web3auth
  } catch (e) {
    console.error(e)
  }
}

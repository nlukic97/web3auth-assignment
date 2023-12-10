<script lang="ts" setup>
// type imports
import { WALLET_ADAPTERS, type IProvider } from "@web3auth/base";

// module imports
import Web3Auth from "../helpers/web3Auth"
import Web3 from 'web3';


// import smart contract abi
import smartContractAbi from "../abi/abi.json"

const web3Auth = await Web3Auth();

/* State */
const isLoggedIn = useState(() => web3Auth.connected)
const balance = useState(() => 0)
const erc20Balance = useState(() => 0)

// getting balance
async function showMaticBalance() {
  const web3 = new Web3(web3Auth?.provider as IProvider)
  const userAccounts = await web3.eth.getAccounts()
  const tokenBalance = await web3.eth.getBalance(userAccounts[0])
  balance.value = tokenBalance;
}

async function showERC20Balance() {
  const web3 = new Web3(web3Auth?.provider as IProvider)
  const userAccounts = await web3.eth.getAccounts()
  const userAccount = userAccounts[0]
  const ERC20Contract = new web3.eth.Contract(smartContractAbi, '0x6168C156825d4BCD7Ccb6d25e844F661B28b8DFa')
  const tokenBalance = await ERC20Contract.methods.balanceOf(userAccount).call({ from: userAccount })
  console.log(tokenBalance)
  erc20Balance.value = tokenBalance;
}

async function mintERC20() {
  const web3 = new Web3(web3Auth?.provider as IProvider)
  const userAccounts = await web3.eth.getAccounts()
  const userAccount = userAccounts[0]
  const ERC20Contract = new web3.eth.Contract(smartContractAbi, '0x6168C156825d4BCD7Ccb6d25e844F661B28b8DFa')
  await ERC20Contract.methods.mint(userAccount, '1000000000000000000').send({ from: userAccount })
    .on('receipt', (data) => console.log(data))
    .on('error', (err) => console.log(err))

  showERC20Balance()
}

async function login() {
  try {
    await web3Auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
      loginProvider: "apple",
    });

    isLoggedIn.value = true
  } catch (e) {
    console.error(e)
  }
}

async function logout() {
  await web3Auth.logout();
  isLoggedIn.value = false
}

</script>

<template>
  <div>
    <Nav></Nav>
    <div v-if="isLoggedIn">
      <button @click="showMaticBalance">Get MATIC Balance</button>
      <div>MATIC: {{ balance }}</div>
      <br />
      <br />
      <button @click="showERC20Balance">Get MyToken Balance</button>
      <div>MATIC: {{ erc20Balance }}</div>
      <br />
      <button @click="mintERC20">Mint ERC20 tokens</button>
    </div>
    <br />

    <button v-if="!isLoggedIn" @click="login">Log in</button>
    <button v-if="isLoggedIn" @click="logout">Logout</button>
    <slot />
  </div>
</template>

<style scoped></style>

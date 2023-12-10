<script lang="ts" setup>
import { WALLET_ADAPTERS, type IProvider } from "@web3auth/base";
import type { Web3AuthNoModal } from "@web3auth/no-modal";

import Web3Auth from "../helpers/web3Auth"
import Web3 from 'web3';

import smartContractAbi from "../abi/abi.json"


const web3Auth: Web3AuthNoModal = await Web3Auth() as Web3AuthNoModal;

/* State */
const isLoggedIn = useState(() => web3Auth.connected)
const balance = useState(() => BigInt(0))
const erc20Balance = useState(() => BigInt(0))
const myAddress = useState(() => '')

async function getMyAddress(){
  const web3 = new Web3(web3Auth?.provider as IProvider)
  const userAccounts = await web3.eth.getAccounts()
  const addr = userAccounts[0]
  myAddress.value = addr
}

/* Method - Get MATIC balance */
async function showMaticBalance() {
  const web3 = new Web3(web3Auth?.provider as IProvider)
  const userAccounts = await web3.eth.getAccounts()
  balance.value = await web3.eth.getBalance(userAccounts[0])
}

/* Method - Get ERC20 balance */
async function showERC20Balance() {
  const web3 = new Web3(web3Auth?.provider as IProvider)
  const userAccounts = await web3.eth.getAccounts()
  const userAccount = userAccounts[0]

  const ERC20Contract = new web3.eth.Contract(smartContractAbi, '0x6168C156825d4BCD7Ccb6d25e844F661B28b8DFa')

  erc20Balance.value = await ERC20Contract.methods.balanceOf(userAccount).call({ from: userAccount })
}

/* Method - Mint 1000000000000000000 ERC20 tokens, and update balance */
async function mintERC20() {
  const web3 = new Web3(web3Auth?.provider as IProvider)
  const userAccounts = await web3.eth.getAccounts()
  const userAccount = userAccounts[0]

  const ERC20Contract = new web3.eth.Contract(smartContractAbi, '0x6168C156825d4BCD7Ccb6d25e844F661B28b8DFa')

  await ERC20Contract.methods.mint(userAccount, '1000000000000000000').send({ from: userAccount })
    .on('receipt', (data) => console.log(data))
    .on('error', (err) => console.log(err))

  showMaticBalance()
  showERC20Balance()
}

/* Log in the user */
async function login() {
  await web3Auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
    loginProvider: "apple",
  });

  isLoggedIn.value = true
  await getMyAddress()
}

/* Logout the user */
async function logout() {
  await web3Auth.logout();
  isLoggedIn.value = false
}

</script>

<template>
  <div>
    <h1>Web3auth No Modal App example</h1>

    <!-- Show these options only if logged in -->
    <div v-if="isLoggedIn">
      <div class="box">
        <button @click="getMyAddress">Show Address</button>
        {{ myAddress }}
      </div>
      <div class="box">
        <button @click="showMaticBalance">Get MATIC Balance</button>
        <span>{{ balance }} MATIC</span>
      </div>
      <div class="box">
        <button @click="showERC20Balance">Get ERC20 Balance</button>
        <span>{{ erc20Balance }} MATIC</span>
      </div>
      <div class="box">
        <button @click="mintERC20">Mint ERC20 token</button>
      </div>
    </div>

    <button v-if="!isLoggedIn" @click="login">Log in</button>
    <button v-if="isLoggedIn" @click="logout">Log out</button>
  </div>
</template>

<style scoped>
.box {
  margin: 10px 0;
}

.box span {
  padding-left: 5px;
}
</style>

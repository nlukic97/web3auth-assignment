<script lang="ts" setup>
// type imports
import type { IProvider } from "@web3auth/base";

// module imports
import getWeb3AuthIProvider from "../helpers/web3Auth"
import walletInterface from "../helpers/Wallet"


// import smart contract abi
import smartContractAbi from "../abi/abi.json"

const Iprovider = await getWeb3AuthIProvider();
const wallet = await walletInterface(Iprovider as IProvider, smartContractAbi, '0x6168C156825d4BCD7Ccb6d25e844F661B28b8DFa')

// getting connected account
const userAccount = await wallet.getAccount()
console.log(userAccount)

// getting balance
console.log(await wallet.getBalance(userAccount))

// getting PK
console.log(await wallet.getPrivateKey())

// smart contract interaction - read method - balance of tokens
const response = await wallet.contract.methods.balanceOf(userAccount).call({ from: userAccount })
console.log(response)

// smart contract interaction - write method - mint yourself 1 token
if(!true){
  console.log('Minting 1000000000000000000 tokens.')
  await wallet.contract.methods.mint(userAccount, '1000000000000000000').send({ from: userAccount })
  .on('receipt', (data) => console.log(data))
  .on('error', (err) => console.log(err))
}

</script>

<template>
  <div>
    <Nav></Nav>
    <slot />
  </div>
</template>

<style scoped></style>

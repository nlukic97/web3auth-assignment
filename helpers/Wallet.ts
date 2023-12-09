import type { IProvider } from '@web3auth/base';
import Web3 from 'web3';

export default async function walletInterface(web3Auth: any, abi: any, address: string) {
    try {
        const Iprovider = web3Auth.provider
        const web3 = new Web3(Iprovider as IProvider)
        const smartContract = new web3.eth.Contract(abi, address)

        return {
            web3,
            contract: smartContract,
            getAccount: async function () {
                const accounts = await web3.eth.getAccounts()
                return accounts[0]
            },
            getBalance: async function (address: string) {
                return await web3.eth.getBalance(address)
            },
            getPrivateKey: async function () {
                return await web3.provider?.request({
                    method: 'eth_private_key'
                })
            },
            logout:async function(){
                await web3Auth.logout();
                alert('logged out!')
            }
        }
    } catch (e: any | unknown) {
        throw new Error(e)
    }
}
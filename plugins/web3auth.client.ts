import { Web3AuthNoModal } from "@web3auth/no-modal";

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.provide("web3auth", Web3AuthNoModal);
    // nuxtApp.provide("provider", provider); // this one is a ref btw
  })
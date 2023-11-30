import { Wallet, getDefaultProvider } from "ethers";

// Use Ethers DefaultProvider for the Sepolia Testnet
const provider = getDefaultProvider("sepolia");

function createWallet() {
  // Create a new random wallet.
  const walletRandom = Wallet.createRandom();
  logWallet(walletRandom, "From Random");

  // Create a new wallet using the Mnemonic from the first wallet.
  // This simulates doing a wallet restore function
  const walletPhrase = Wallet.fromPhrase(walletRandom.mnemonic.phrase);
  logWallet(walletPhrase, "From Mnemonic");

  // Create a new wallet using the Private Key from the first wallet.
  // This can also be used to restore a wallet. Notice though you don't
  // get a Mnemonic Phrase when creating from a Private Key
  const walletPrivate = new Wallet(walletRandom.privateKey);
  logWallet(walletPrivate, "From Private");
}

function logWallet(wallet, msg) {
console.log(`*** ${msg} ***`);
console.log(`Address: ${wallet.address}`);
console.log(`  Private Key: ${wallet.privateKey}`);
if( wallet.mnemonic ) {
  console.log(`  Mnemonic: ${wallet.mnemonic.phrase}`);
}
console.log();
}

createWallet();

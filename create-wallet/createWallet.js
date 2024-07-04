import { Wallet, getDefaultProvider } from "ethers";
import fs from "fs";

// Use Ethers DefaultProvider for the Ethereum Sepolia Testnet
const provider = getDefaultProvider("sepolia");

function createWallet(_numAccounts) {
  for (let count=1; count <= _numAccounts; count++ ) {
    // Create a new random Ethereum account.
    const walletRandom = Wallet.createRandom();
    console.log(`[ACCOUNT_${count}]`);
    saveAccount(walletRandom, `[ACCOUNT_${count}]`);
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
}

function saveAccount(_wallet, _header) {
  const content = _header + "\n" +
  "ADDRESS='" + _wallet.address + "'\n" +
  "  PRIVATE_KEY='" + _wallet.privateKey + "'\n" +
  "  MNEMONIC='" + _wallet.mnemonic.phrase + "'\n\n";

  fs.writeFile('./create-wallet/Accounts.txt', content, { flag: 'a'}, err => {
    if(err) {
      console.log(err);
    }
  });
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

createWallet(3);

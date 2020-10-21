# Dai.js
Dai.js is a JavaScript library that makes it easy to build applications on top of MakerDAO's platform of smart contracts. You can use Maker's contracts to open Vaults (formerly known as CDPs), deposit collateral and generate Dai, trade tokens on decentralized exchanges, and more. 

The library features a pluggable, service-based architecture, which allows users to easily integrate Maker functionality into their own apps. It also includes convenient configuration presets for out-of-the-box usability and support for both front-end and back-end applications, plus plugins for integrating with Maker governance, hardware wallets, and both Single-Collateral and Multi-Collateral Dai.

# Usage

Clone this repository and install its dependencies:

git clone https://github.com/amrshaban2005/dai-js.git
cd dai-js
npm install

# Read Vault
node ReadVault.js #VaultID

# Create New Vault
node CreateNewVault.js #EthAmount #DaiAmount

# Manage Vault
- Deposit the specified amount of collateral.
node VaultManager.js lockCollateral #VaultID #EthAmount

- Generate the specified amount of Dai.
node VaultManager.js drawDai #VaultID #DaiAmount  

- Deposit some collateral and generate some Dai in a single transaction.
node VaultManager.js lockAndDraw #VaultID #EthAmount #DaiAmount 

- Pay back the specified amount of Dai. 
node VaultManager.js wipeDai #VaultID #DaiAmount 

- Pay back all debt. This method ensures that dust amounts do not remain.
node VaultManager.js wipeAll #VaultID 

- Withdraw the specified amount of collateral.
node VaultManager.js freeCollateral #VaultID #EthAmount 

- Pay back some debt and withdraw some collateral in a single transaction.
node VaultManager.js wipeAndFree #VaultID #DaiAmount #EthAmount 

- Pay back all debt, ensuring dust amounts do not remain, and withdraw a specified amount of collateral in a single transaction.
node VaultManager.js wipeAllAndFree #VaultID #EthAmount 
 

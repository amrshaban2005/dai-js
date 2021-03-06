# Dai.js
Dai.js is a JavaScript library that makes it easy to build applications on top of MakerDAO's platform of smart contracts. You can use Maker's contracts to open Vaults (formerly known as CDPs), deposit collateral and generate Dai, trade tokens on decentralized exchanges, and more. 

The library features a pluggable, service-based architecture, which allows users to easily integrate Maker functionality into their own apps. It also includes convenient configuration presets for out-of-the-box usability and support for both front-end and back-end applications, plus plugins for integrating with Maker governance, hardware wallets, and both Single-Collateral and Multi-Collateral Dai as described in [Getting-Started](https://docs.makerdao.com/dai.js/getting-started)..


# Usage

Clone this repository and install its dependencies:

```
 git clone https://github.com/amrshaban2005/dai-js.git
 cd dai-js
 npm install
```
then create .env file

# Read Vault

Read vault that was created in the Oasis Borrow UI. 

```
node ReadVault.js #VaultID
```
# Create New Vault

Opens a new Vault, locks ETH into it, and draws out Dai. 

```
node CreateNewVault.js #EthAmount #DaiAmount
```

# Manage Vault

- lockCollateral:
Deposit the specified amount of collateral.
```
node VaultManager.js lockCollateral #VaultID #EthAmount
```
- drawDai:
Generate the specified amount of Dai.
```
node VaultManager.js drawDai #VaultID #DaiAmount  
```
- lockAndDraw:
Deposit some collateral and generate some Dai in a single transaction.
```
node VaultManager.js lockAndDraw #VaultID #EthAmount #DaiAmount 
```
- wipeDai:
Pay back the specified amount of Dai. 
```
node VaultManager.js wipeDai #VaultID #DaiAmount 
```
- wipeAll:
Pay back all debt. This method ensures that dust amounts do not remain.
```
node VaultManager.js wipeAll #VaultID 
```
- freeCollateral:
Withdraw the specified amount of collateral.
```
node VaultManager.js freeCollateral #VaultID #EthAmount 
```
- wipeAndFree:
Pay back some debt and withdraw some collateral in a single transaction.
```
node VaultManager.js wipeAndFree #VaultID #DaiAmount #EthAmount 
```
- wipeAllAndFree:
Pay back all debt, ensuring dust amounts do not remain, and withdraw a specified amount of collateral in a single transaction.
```
node VaultManager.js wipeAllAndFree #VaultID #EthAmount 
```

const Maker = require("@makerdao/dai");
const { McdPlugin, ETH, DAI } = require("@makerdao/dai-plugin-mcd");
const { infuraKey, myPrivateKey } = require("./config");
var maker = null;
var manager = null;
var txtMgr = null;

main();

async function main() {
  await setup();

  let action = process.argv[2];
  if (action == "lockCollateral") {
    console.log("Lock Collateral....");
    lockCollateral(Number(process.argv[3]), Number(process.argv[4]));
  } else if (action == "drawDai") {
    console.log("Draw Dai....");
    drawDai(Number(process.argv[3]), Number(process.argv[4]));
  } else if (action == "lockAndDraw") {
    console.log("Lock And Draw....");
    lockAndDraw(
      Number(process.argv[3]),
      Number(process.argv[4]),
      Number(process.argv[5])
    );
  } else if (action == "wipeDai") {
    console.log("Wipe Dai....");
    wipeDai(Number(process.argv[3]), Number(process.argv[4]));
  } else if (action == "wipeDai") {
    console.log("Wipe Dai....");
    wipeDai(Number(process.argv[3]), Number(process.argv[4]));
  } else if (action == "wipeAll") {
    console.log("Wipe All Dai....");
    wipeAll(Number(process.argv[3]));
  } else if (action == "freeCollateral") {
    console.log("Free Specific Collateral....");
    freeCollateral(Number(process.argv[3]), Number(process.argv[4]));
  } else if (action == "wipeAndFree") {
    console.log("wipe Dai And Free Specific Collateral....");
    wipeAndFree(
      Number(process.argv[3]),
      Number(process.argv[4]),
      Number(process.argv[5])
    );
  } else if (action == "wipeAllAndFree") {
    console.log("wipe All Dai And Free Specific Collateral....");
    wipeAllAndFree(Number(process.argv[3]), Number(process.argv[4]));
  }
}

// set up connection to vault
async function setup() {
  try {
    maker = await Maker.create("http", {
      plugins: [McdPlugin],
      url: `https://kovan.infura.io/v3/${infuraKey}`,
      privateKey: myPrivateKey,
    });

    await maker.service("proxy").ensureProxy();
    txMgr = maker.service("transactionManager");
    manager = await maker.service("mcd:cdpManager");
  } catch (err) {
    console.log(err);
  }
}

async function refreshVault(vault) {
  vault.reset();
  await vault.prefetch();
}

// Deposit the specified amount of collateral.
async function lockCollateral(vaultId, amount) {
  try {
    vault = await manager.getCdp(vaultId);

    const lock = vault.lockCollateral(ETH(amount));
    txMgr.listen(lock, {
      pending: (tx) => {
        console.log("tx pending: " + tx.hash);
      },
      mined: (tx) => {
        // do something when tx is mined
      },
      confirmed: (tx) => {
        // do something when tx is confirmed
        console.log("tx confirmed: " + tx.hash);
      },
      error: (tx) => {
        // do someting when tx fails
      },
    });
    await txMgr.confirm(lock, 3);
    await refreshVault(vault);
    console.log(
      [
        vault.collateralAmount, // amount of collateral tokens
        vault.debtValue, // amount of Dai debt
        vault.collateralizationRatio, // collateralValue / debt
        vault.isSafe, //Whether the Vault is currently safe or not.
      ].map((x) => x.toString())
    );
  } catch (err) {
    console.log(err);
  }
}

// Generate the specified amount of Dai.
async function drawDai(vaultId, amount) {
  try {
    vault = await manager.getCdp(vaultId);

    const draw = vault.drawDai(DAI(amount));
    txMgr.listen(draw, {
      pending: (tx) => {
        console.log("tx pending: " + tx.hash);
      },
      mined: (tx) => {
        // do something when tx is mined
      },
      confirmed: (tx) => {
        // do something when tx is confirmed
        console.log("tx confirmed: " + tx.hash);
      },
      error: (tx) => {
        // do someting when tx fails
      },
    });
    await txMgr.confirm(draw, 3);
    await refreshVault(vault);
    console.log(
      [
        vault.collateralAmount, // amount of collateral tokens
        vault.debtValue, // amount of Dai debt
        vault.collateralizationRatio, // collateralValue / debt
        vault.isSafe, //Whether the Vault is currently safe or not.
      ].map((x) => x.toString())
    );
  } catch (err) {
    console.log(err);
  }
}

// Deposit some collateral and generate some Dai in a single transaction.
async function lockAndDraw(vaultId, ethAmount, daiAmount) {
  try {
    vault = await manager.getCdp(vaultId);

    const lockdraw = vault.lockAndDraw(ETH(ethAmount), DAI(daiAmount));
    txMgr.listen(lockdraw, {
      pending: (tx) => {
        console.log("tx pending: " + tx.hash);
      },
      mined: (tx) => {
        // do something when tx is mined
      },
      confirmed: (tx) => {
        // do something when tx is confirmed
        console.log("tx confirmed: " + tx.hash);
      },
      error: (tx) => {
        // do someting when tx fails
      },
    });
    await txMgr.confirm(lockdraw, 3);
    await refreshVault(vault);
    console.log(
      [
        vault.collateralAmount, // amount of collateral tokens
        vault.debtValue, // amount of Dai debt
        vault.collateralizationRatio, // collateralValue / debt
        vault.isSafe, //Whether the Vault is currently safe or not.
      ].map((x) => x.toString())
    );
  } catch (err) {
    console.log(err);
  }
}

//Pay back the specified amount of Dai.
async function wipeDai(vaultId, amount) {
  try {
    vault = await manager.getCdp(vaultId);

    const wipe = vault.wipeDai(DAI(amount));
    txMgr.listen(wipe, {
      pending: (tx) => {
        console.log("tx pending: " + tx.hash);
      },
      mined: (tx) => {
        // do something when tx is mined
      },
      confirmed: (tx) => {
        // do something when tx is confirmed
        console.log("tx confirmed: " + tx.hash);
      },
      error: (tx) => {
        // do someting when tx fails
      },
    });
    await txMgr.confirm(wipe, 3);
    await refreshVault(vault);
    console.log(
      [
        vault.collateralAmount, // amount of collateral tokens
        vault.debtValue, // amount of Dai debt
        vault.collateralizationRatio, // collateralValue / debt
        vault.isSafe, //Whether the Vault is currently safe or not.
      ].map((x) => x.toString())
    );
  } catch (err) {
    console.log(err);
  }
}

// Pay back all debt. This method ensures that dust amounts do not remain.
async function wipeAll(vaultId) {
  try {
    vault = await manager.getCdp(vaultId);

    const wipeAll = vault.wipeAll();
    txMgr.listen(wipeAll, {
      pending: (tx) => {
        console.log("tx pending: " + tx.hash);
      },
      mined: (tx) => {
        // do something when tx is mined
      },
      confirmed: (tx) => {
        // do something when tx is confirmed
        console.log("tx confirmed: " + tx.hash);
      },
      error: (tx) => {
        // do someting when tx fails
      },
    });
    await txMgr.confirm(wipeAll, 3);
    await refreshVault(vault);
    console.log(
      [
        vault.collateralAmount, // amount of collateral tokens
        vault.debtValue, // amount of Dai debt
        vault.collateralizationRatio, // collateralValue / debt
        vault.isSafe, //Whether the Vault is currently safe or not.
      ].map((x) => x.toString())
    );
  } catch (err) {
    console.log(err);
  }
}

// Withdraw the specified amount of collateral.
async function freeCollateral(vaultId, amount) {
  try {
    vault = await manager.getCdp(vaultId);

    const free = vault.freeCollateral(ETH(amount));
    txMgr.listen(free, {
      pending: (tx) => {
        console.log("tx pending: " + tx.hash);
      },
      mined: (tx) => {
        // do something when tx is mined
      },
      confirmed: (tx) => {
        // do something when tx is confirmed
        console.log("tx confirmed: " + tx.hash);
      },
      error: (tx) => {
        // do someting when tx fails
      },
    });
    await txMgr.confirm(free, 3);
    await refreshVault(vault);
    console.log(
      [
        vault.collateralAmount, // amount of collateral tokens
        vault.debtValue, // amount of Dai debt
        vault.collateralizationRatio, // collateralValue / debt
        vault.isSafe, //Whether the Vault is currently safe or not.
      ].map((x) => x.toString())
    );
  } catch (err) {
    console.log(err);
  }
}

// Pay back some debt and withdraw some collateral in a single transaction.
async function wipeAndFree(vaultId, wipeAmount, freeAmount) {
  try {
    vault = await manager.getCdp(vaultId);

    const wipeFree = vault.wipeAndFree(DAI(wipeAmount), ETH(freeAmount));
    txMgr.listen(wipeFree, {
      pending: (tx) => {
        console.log("tx pending: " + tx.hash);
      },
      mined: (tx) => {
        // do something when tx is mined
      },
      confirmed: (tx) => {
        // do something when tx is confirmed
        console.log("tx confirmed: " + tx.hash);
      },
      error: (tx) => {
        // do someting when tx fails
      },
    });
    await txMgr.confirm(wipeFree, 3);
    await refreshVault(vault);
    console.log(
      [
        vault.collateralAmount, // amount of collateral tokens
        vault.debtValue, // amount of Dai debt
        vault.collateralizationRatio, // collateralValue / debt
        vault.isSafe, //Whether the Vault is currently safe or not.
      ].map((x) => x.toString())
    );
  } catch (err) {
    console.log(err);
  }
}

// Pay back all debt, ensuring dust amounts do not remain,
// and withdraw a specified amount of collateral in a single transaction.
async function wipeAllAndFree(vaultId, freeAmount) {
  try {
    vault = await manager.getCdp(vaultId);

    const wipeAllFree = vault.wipeAllAndFree(ETH(freeAmount));
    txMgr.listen(wipeAllFree, {
      pending: (tx) => {
        console.log("tx pending: " + tx.hash);
      },
      mined: (tx) => {
        // do something when tx is mined
      },
      confirmed: (tx) => {
        // do something when tx is confirmed
        console.log("tx confirmed: " + tx.hash);
      },
      error: (tx) => {
        // do someting when tx fails
      },
    });
    await txMgr.confirm(wipeAllFree, 3);
    await refreshVault(vault);
    console.log(
      [
        vault.collateralAmount, // amount of collateral tokens
        vault.debtValue, // amount of Dai debt
        vault.collateralizationRatio, // collateralValue / debt
        vault.isSafe, //Whether the Vault is currently safe or not.
      ].map((x) => x.toString())
    );
  } catch (err) {
    console.log(err);
  }
}

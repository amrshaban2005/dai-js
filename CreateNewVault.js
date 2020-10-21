const Maker = require("@makerdao/dai");
const { McdPlugin, ETH, DAI } = require("@makerdao/dai-plugin-mcd");
const { infuraKey, myPrivateKey } = require("./config");

main();

async function main() {
  try {
   
    const maker = await Maker.create("http", {
      plugins: [McdPlugin],
      url: `https://kovan.infura.io/v3/${infuraKey}`,
      privateKey: myPrivateKey,
    });

    // verify that the private key was read correctly
    console.log(maker.currentAddress());

    // make sure the current account owns a proxy contract;
    // create it if needed. the proxy contract is used to
    // perform multiple operations in a single transaction
    await maker.service("proxy").ensureProxy();

    // use the "vault manager" service to work with vaults
    const manager = await maker.service("mcd:cdpManager");

    // ETH-A is the name of the collateral type; in the future,
    // there could be multiple collateral types for a token with
    // different risk parameters
    const vault = await manager.openLockAndDraw(
      "ETH-A",
      ETH(Number(process.argv[2])),
      DAI(Number(process.argv[3]))
    );

    console.log(vault.id);
    console.log(vault.debtValue); // '150.00 DAI'
  } catch (err) {
    console.log(err);
  }
}

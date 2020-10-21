const Maker = require("@makerdao/dai");
const { McdPlugin } = require("@makerdao/dai-plugin-mcd");
const { infuraKey, ownerAddress } = require("./config");

main();

async function main() {
  try {
    const maker = await Maker.create("http", {
      plugins: [McdPlugin],
      url: `https://kovan.infura.io/v3/${infuraKey}`,
    });
    // console.log(maker);

    const manager = maker.service("mcd:cdpManager");

    const proxyAddress = await maker
      .service("proxy")
      .getProxyAddress(ownerAddress);
    console.log(proxyAddress);

    //const data = await manager.getCdpIds(proxyAddress); // returns list of { id, ilk } objects

    //data.forEach((element) => console.log(element));

    //const vault = await manager.getCdp(data[0].id);
    const vault = await manager.getCdp(Number(process.argv[2]));
    console.log(
      [
        vault.collateralAmount, // amount of collateral tokens
        vault.collateralValue, // value in USD, using current price feed values
        vault.debtValue, // amount of Dai debt
        vault.collateralizationRatio, // collateralValue / debt
        vault.liquidationPrice, // vault becomes unsafe at this price
      ].map((x) => x.toString())
    );
  } catch (err) {
    console.log(err);
  }
}

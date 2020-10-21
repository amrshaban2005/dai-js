// config.js
const dotenv = require("dotenv");
dotenv.config();


module.exports = {
  infuraKey: process.env.INFURA_KEY,
  ownerAddress: process.env.OWNER_ADDRESS,
  myPrivateKey: process.env.PRIVATE_KET,
};

const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/evm-utils");
Moralis.start({
  apiKey: process.env.moralis_key,
});

class Projects {
  constructor(contractAddress) {
    this.contractAddress = contractAddress;
  }

  getContractDetails = async (chainId, contractType = "nft") => {
    if (contractType.toLowerCase() === "nft") {
      const result = (
        await Moralis.EvmApi.nft.getNFTContractMetadata({
          address: this.contractAddress,
        })
      ).toJSON();
      return {
        name: result.name,
        symbol: result.symbol,
        contract: this.contractAddress,
        logo: result.logo,
        thumbnail: result.thumbnail,
        chainId: result.chain,
        contractType: result.contractType,
      };
    } else {
      const result = await Moralis.EvmApi.token.getTokenMetadata({
        addresses: [this.contractAddress],
        chain: chainId,
      });
      const [data] = result.toJSON();
      return {
        name: data.token.name,
        symbol: data.token.symbol,
        contract: this.contractAddress,
        logo: data.token.logo,
        thumbnail: data.token.thumbnail,
        chainId: data.token.chain,
        // contractType: "ERC20",
      };
    }
  };
}

// const test = new Projects("0xd42debE4eDc92Bd5a3FBb4243e1ecCf6d63A4A5d");
// test.getContractDetails("0x1", "token").then(console.log.bind(this));
module.exports = Projects;

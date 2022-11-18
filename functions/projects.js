const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/evm-utils");
const Web3 = require("web3");
const owner = require("../abi/owner");
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

  editProjectData = async (message = {}) => {
    const { contract, signature, chainId } = message;

    delete message.signature;
    delete message.chainId;

    const data = JSON.stringify(message);

    // get signer address
    const web3 = new Web3();
    const address = web3.eth.accounts.recover(data, signature);

    //validate with owner of contract
    const owner = (
      await Moralis.EvmApi.utils.runContractFunction({
        address: contract,
        abi: owner,
        functionName: "owner",
        chain: chainId,
      })
    ).toJSON();

    if (address.toLowerCase() !== owner.toLowerCase())
      throw {
        message: "You cannot edit any content of this Project",
      };

    //proceed with updating project
  };
}

module.exports = Projects;

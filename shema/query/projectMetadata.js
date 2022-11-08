const { GraphQLNonNull, GraphQLString } = require("graphql");
const Projects = require("../../functions/projects");
const projectMetadataType = require("../types/projectMetadata");

const projectMetadata = {
  type: projectMetadataType,
  args: {
    contract: { type: new GraphQLNonNull(GraphQLString) },
    contractType: { type: new GraphQLNonNull(GraphQLString) },
    chainId: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: (parent, args) => {
    return new Projects(args.contract).getContractDetails(
      args.chainId,
      args.contractType
    );
  },
};

module.exports = {
  projectMetadata,
};

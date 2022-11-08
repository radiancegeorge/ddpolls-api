const { GraphQLObjectType, GraphQLString } = require("graphql");

const projectMetadataType = new GraphQLObjectType({
  name: "projectMetadata",
  fields: {
    name: {
      type: GraphQLString,
    },
    symbol: {
      type: GraphQLString,
    },
    logo: {
      type: GraphQLString,
    },
    thumbnail: {
      type: GraphQLString,
    },
    contractType: {
      type: GraphQLString,
    },
    chainId: {
      type: GraphQLString,
    },
    contract: {
      type: GraphQLString,
    },
  },
});

module.exports = projectMetadataType;

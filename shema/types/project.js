const { GraphQLObjectType, GraphQLString, GraphQLInt } = require("graphql");
const projectType = new GraphQLObjectType({
  name: "project",
  fields: () => ({
    id: {
      type: GraphQLInt,
    },
    name: {
      type: GraphQLString,
    },
    symbol: {
      type: GraphQLString,
    },
    contract: {
      type: GraphQLString,
    },
    contractType: {
      type: GraphQLString,
    },
    chainId: {
      type: GraphQLString,
    },
    discord: {
      type: GraphQLString,
    },
    telegram: {
      type: GraphQLString,
    },
    slack: {
      type: GraphQLString,
    },
    twitter: {
      type: GraphQLString,
    },
    reddit: {
      type: GraphQLString,
    },
    avatar: {
      type: GraphQLString,
    },
  }),
});

module.exports = projectType;

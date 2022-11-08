const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const project = require("./query/project");
const projectMutation = require("./mutation/project");
const projectMetadata = require("./query/projectMetadata");

const Query = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    ...project,
    ...projectMetadata,
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...projectMutation,
  },
});

const schema = new GraphQLSchema({
  mutation: Mutation,
  query: Query,
});

module.exports = schema;

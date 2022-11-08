const { GraphQLString, GraphQLNonNull } = require("graphql");
const Projects = require("../../functions/projects");
const db = require("../../models");
const projectType = require("../types/project");

const createProject = {
  type: projectType,
  args: {
    contractAddress: { type: new GraphQLNonNull(GraphQLString) },
    contractType: { type: new GraphQLNonNull(GraphQLString) },
    chainId: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (parent, args) => {
    const project = await new Projects(args.contractAddress).getContractDetails(
      args.chainId,
      args.contractType
    );
    console.log(project);
    return db.projects.create({
      ...project,
      avatar: project.logo || project.thumbnail,
    });
  },
};

module.exports = {
  createProject,
};

const projectType = require("../types/project");
const db = require("../../models");
const {
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");
const { Op } = require("sequelize");

const projects = {
  type: new GraphQLList(projectType),
  args: {
    input: { type: GraphQLString },
    limit: { type: GraphQLInt },
    page: { type: GraphQLInt },
  },
  resolve: (parent, args) => {
    const limit = args.limit || 10;
    const page = args.page || 1;
    const offset = (page - 1) * limit;

    return db.projects.findAll({
      where: {
        [Op.or]: [
          {
            contract: {
              [Op.like]: `%${args.input}%`,
            },
          },
          {
            name: {
              [Op.like]: `%${args.input}%`,
            },
          },
          {
            symbol: {
              [Op.like]: `%${args.input}%`,
            },
          },
        ],
      },
      limit,
      offset,
    });
  },
};

const project = {
  type: projectType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
  },
  resolve: (parent, args) => {
    return db.projects.findOne({
      where: {
        id: args.id,
      },
    });
  },
};

module.exports = {
  projects,
  project,
};

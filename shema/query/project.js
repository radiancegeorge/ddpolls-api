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
    input: { type: GraphQLString, defaultValue: "" },
    limit: { type: GraphQLInt, defaultValue: 10 },
    page: { type: GraphQLInt, defaultValue: 1 },
  },
  resolve: (parent, args) => {
    const offset = (args.page - 1) * args.limit;
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
      limit: args.limit,
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

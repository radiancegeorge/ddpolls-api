const projects = (sequelize, dataTypes) => {
  const projects = sequelize.define("projects", {
    name: {
      allowNull: false,
      type: dataTypes.STRING,
    },
    symbol: {
      allowNull: false,
      type: dataTypes.STRING,
    },
    contract: {
      allowNull: false,
      type: dataTypes.STRING,
      unique: "contract",
    },
    contractType: {
      type: dataTypes.STRING,
    },
    chainId: {
      allowNull: false,
      type: dataTypes.STRING,
    },
    discord: {
      type: dataTypes.STRING,
      validate: {
        isUrl: true,
      },
    },
    telegram: {
      type: dataTypes.STRING,
      validate: {
        isUrl: true,
      },
    },
    slack: {
      type: dataTypes.STRING,
      validate: {
        isUrl: true,
      },
    },
    twitter: {
      type: dataTypes.STRING,
      validate: {
        isUrl: true,
      },
    },
    reddit: {
      type: dataTypes.STRING,
      validate: {
        isUrl: true,
      },
    },
    avatar: {
      allowNull: false,
      type: dataTypes.STRING,
      defaultValue: "avatar.png",
      validate: {
        isUrl: true,
      },
    },
  });

  return projects;
};
module.exports = projects;

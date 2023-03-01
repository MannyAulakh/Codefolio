const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Profile extends Model {}

Profile.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    occupation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    education: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    experience: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    portfolio_website: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    project1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    project2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    project3: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // date_created: {
    //   type: DataTypes.DATE,
    //   allowNull: false,
    //   defaultValue: DataTypes.NOW,
    // },
    user_id: {
      type: DataTypes.INTEGER,
      unique: true,
      references: {
        model: 'user',
        key: 'id',
      },
  },
},
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'profile',
  }
);

module.exports = Profile;

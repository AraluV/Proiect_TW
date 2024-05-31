// models/GroupFriend.js
const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Friend = require('./Friend');
const Food = require('./Food');

const GroupFriend = sequelize.define('GroupFriend', {
  label: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

Friend.belongsToMany(Food, { through: GroupFriend });
Food.belongsToMany(Friend, { through: GroupFriend });

module.exports = GroupFriend;

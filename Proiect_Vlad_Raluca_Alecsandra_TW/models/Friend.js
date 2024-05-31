// models/Friend.js
const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Food = require('./Food');
const GroupFriend = require('./GroupFriend');

const Friend = sequelize.define('Friend', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
  }
});

Friend.hasMany(Food);
Food.belongsTo(Friend);

Friend.belongsTo(GroupFriend);
GroupFriend.hasMany(Friend);

module.exports = Friend;

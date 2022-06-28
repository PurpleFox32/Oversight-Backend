'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      this.belongsTo(models.User);
    }
  }
  Post.init(
    {
      post_id: {
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      post: DataTypes.STRING,
      gameId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Post',
    }
  );
  return Post;
};

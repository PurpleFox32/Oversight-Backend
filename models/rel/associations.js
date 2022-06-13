module.exports = function (models) {
    models.actor.belongsToMany(models.posts, {
        through: models.posts,
        foreignKey: 'user_id'
    });
}
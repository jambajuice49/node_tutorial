module.exports = function(sequelize, DataTypes){
    var Hello = sequelize.define(
        'Hello',
        {
            name: DataTypes.STRING
        }
    );
    return Hello;
}
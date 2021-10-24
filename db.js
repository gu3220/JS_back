const {Sequelize, Model, DataTypes} = require('sequelize')

const sequelize = new Sequelize('pg_node', 'postgres', 'student', {
    dialect: 'postgres',
  });

class ToDo extends Model {}

ToDo.init({
  id: {
        type: DataTypes.INTEGER, 
        primaryKey:true,
        autoIncrement: true,
        allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
  }
}, {
  sequelize, 
  modelName: 'ToDo' 
}),
sequelize.sync().then(result=>{
    console.log(result);
  })
  .catch(err=> console.log(err));
module.exports = {
    ToDo
}
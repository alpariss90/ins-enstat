const {Sequelize, DataTypes, QueryTypes}=require('sequelize')
const config=require('./config/config')


const sequelize=new Sequelize('postgres://'+config.db.user+':'+config.db.password+'@'+config.db.host+':'+config.db.port+'/'+config.db.database)

module.exports={
sequelize, DataTypes, QueryTypes
}
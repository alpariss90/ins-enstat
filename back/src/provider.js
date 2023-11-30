const {Sequelize, DataTypes, QueryTypes, QueryInterface}=require('sequelize')
const config=require('./config/config')


const sequelize=new Sequelize('postgres://'+config.db.user+':'+config.db.password+'@'+config.db.host+':'+config.db.port+'/'+config.db.database)
const transact=sequelize.transaction()
module.exports={
sequelize, DataTypes, QueryTypes, QueryInterface, transact
}
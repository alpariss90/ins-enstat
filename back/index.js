const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const morgan=require('morgan')
const config=require('./src/config/config')
const { sequelize } = require('./src/provider')



const app=express()


app.use(bodyParser.json())
app.use(morgan('combined'))
app.use(cors())


require('./src/route')(app)


//sequelize.sync({force: true});


app.listen(config.app_port, (err)=>{
    console.log("App is runnig on "+config.app_port);
}) 
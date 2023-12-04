const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const morgan=require('morgan')
const config=require('./src/config/config')
const { sequelize } = require('./src/provider')
const cookieParser = require('cookie-parser')
const session = require('express-session')



const app=express()


app.use(bodyParser.json())
//app.use(morgan('combined'))
app.use(cors())
app.use(cookieParser());
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


  const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767klll",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));



require('./src/route')(app)
   
  
//sequelize.sync({alter: true});

  
app.listen(config.app_port, (err)=>{
    console.log("App is runnig on "+config.app_port);
}) 